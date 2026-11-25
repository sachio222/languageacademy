// The pipeline's event logs (design §3.4, §3.5, §4.9): append-only JSON Lines files under pipeline/fr/events/, one
// la-pipeline-event@1 per line in canonical JSON. Each event's sha256 is the canonical SHA-256 of the event without
// its sha256 field; its prev_sha256 is the sha256 of the line before it, 64 zeros for the first; its seq is its line
// number, from 1, with no gaps. So the log is a hash chain: an edit to any line breaks it.
//
// - readLog(file) -> { events, torn }. A crash can only tear the last line, so the last line is `torn` (and left out
//   of events) when it has no newline, is not JSON, or its sha256 does not match. Every other problem, on any line,
//   is an edit and throws LogCorruptError { file, seq }: a bad sha256 before the last line, a broken prev_sha256 link,
//   a seq gap, or a line the schema refuses. Recovery halts on it with a log_corrupt alert.
// - repairTorn(file, tornDir) saves the torn text to <tornDir>/<basename>.<seq>.<sha256 of the text>.txt, rewrites
//   the log without it (durably), and returns the saved path; null when nothing is torn. The caller records
//   log.repaired.
// - appendEvent(file, partial, ctx) fills schema, event_id (a ULID from ctx.now and ctx.random), seq, prev_sha256,
//   ts, tenant, run_id, lock_epoch and actor, seals the event, validates it, calls ctx.fence() (the lock's epoch
//   check, Task 28), then appends one line durably. It refuses to append after a torn line: recovery repairs first.
// - verifyChain(events, file?) applies the same per-event rules to a list that starts at seq 1.
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { canonicalJson } from '../content/bundle.mjs';
import { ContractError, assertContract, validateContract } from './contracts/index.mjs';
import { appendLineDurable, writeDurable } from './fsio.mjs';
import { canonicalSha256, sha256Hex, ulid } from './hash.mjs';

export const ZERO_SHA256 = '0'.repeat(64);
const SCHEMA = 'la-pipeline-event@1';
/** Fields the core sets on every event; a caller's partial may not set them. */
const CORE_FIELDS = ['schema', 'event_id', 'seq', 'prev_sha256', 'sha256', 'ts', 'tenant', 'run_id', 'lock_epoch', 'actor'];
const NEWLINE = 0x0a;

export class LogCorruptError extends Error {
  /** @param {string|null} file @param {number} seq the line, counted from 1 @param {string} reason */
  constructor(file, seq, reason) {
    super(`${file ?? 'event list'}: event ${seq}: ${reason}. An edit, not a crash: the pipeline halts (log_corrupt)`);
    this.name = 'LogCorruptError';
    this.code = 'log_corrupt';
    this.file = file;
    this.seq = seq;
    this.reason = reason;
  }
}

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v) && [Object.prototype, null].includes(Object.getPrototypeOf(v));

/** The seal: canonical SHA-256 of the event without its sha256 field. */
export function eventSha256(event) {
  const { sha256, ...rest } = event;
  return canonicalSha256(rest);
}

/** Why the event's own seal is bad, or null. A torn last line fails here. */
function sealProblem(event) {
  if (!isPlainObject(event)) return 'not a JSON object';
  if (typeof event.sha256 !== 'string') return 'no sha256';
  const actual = eventSha256(event);
  return actual === event.sha256 ? null : `sha256 is ${event.sha256} but the event hashes to ${actual}`;
}

/** Why a sealed event cannot stand at line `seq` after an event sealed `prevSha`, or null. */
function chainProblem(event, seq, prevSha) {
  const errors = validateContract(SCHEMA, event);
  if (errors.length > 0) return `the schema refuses it: ${errors.slice(0, 3).join('; ')}`;
  if (event.seq !== seq) return `seq is ${event.seq} at line ${seq}`;
  if (event.prev_sha256 !== prevSha) return `prev_sha256 is ${event.prev_sha256}, not the previous event's sha256 ${prevSha}`;
  return null;
}

/** Throws LogCorruptError unless `events` is a sealed, linked chain from seq 1. */
export function verifyChain(events, file = null) {
  let prev = ZERO_SHA256;
  events.forEach((event, i) => {
    const problem = sealProblem(event) ?? chainProblem(event, i + 1, prev);
    if (problem) throw new LogCorruptError(file, i + 1, problem);
    prev = event.sha256;
  });
}

/**
 * Reads a log down to its bytes: the events, the torn tail if any, and where the whole lines end.
 * @returns {{ events: object[], torn: string|null, tornBytes: Buffer|null, keep: number, bytes: Buffer }}
 */
function scan(file) {
  const bytes = existsSync(file) ? readFileSync(file) : Buffer.alloc(0);
  /** [start, end) of each line that ends in a newline, the newline excluded. */
  const whole = [];
  let start = 0;
  for (let nl = bytes.indexOf(NEWLINE, start); nl !== -1; nl = bytes.indexOf(NEWLINE, start)) {
    whole.push([start, nl]);
    start = nl + 1;
  }
  let torn = start < bytes.length ? [start, bytes.length] : null;
  let keep = start;
  const parse = ([s, e]) => {
    try {
      return { event: JSON.parse(bytes.toString('utf8', s, e)) };
    } catch (err) {
      return { problem: `not JSON (${err.message})` };
    }
  };

  // With no torn tail, the last whole line is still torn when it is not JSON or its seal is bad: the write that
  // produced it did not finish as written (a block of zeros, a partial sector).
  if (torn === null && whole.length > 0) {
    const last = whole[whole.length - 1];
    const { event, problem } = parse(last);
    if (problem || sealProblem(event)) {
      torn = last;
      keep = last[0];
      whole.pop();
    }
  }

  const events = [];
  let prev = ZERO_SHA256;
  whole.forEach((range, i) => {
    const { event, problem: parseProblem } = parse(range);
    const problem = parseProblem ?? sealProblem(event) ?? chainProblem(event, i + 1, prev);
    if (problem) throw new LogCorruptError(file, i + 1, problem);
    events.push(event);
    prev = event.sha256;
  });
  const tornBytes = torn ? bytes.subarray(torn[0], torn[1]) : null;
  return { events, torn: tornBytes ? tornBytes.toString('utf8') : null, tornBytes, keep, bytes };
}

/** @returns {{ events: object[], torn: string|null }} */
export function readLog(file) {
  const { events, torn } = scan(file);
  return { events, torn };
}

/** The tail each log had after this process last appended to it, so an append need not reread the whole file. */
const tails = new Map();
const statOf = (file) => {
  try {
    const s = statSync(file);
    return { ino: s.ino, size: s.size, mtimeMs: s.mtimeMs };
  } catch (e) {
    if (e.code === 'ENOENT') return null;
    throw e;
  }
};
const sameFile = (a, b) => a !== null && b !== null && a.ino === b.ino && a.size === b.size && a.mtimeMs === b.mtimeMs;

/** The last event's seq and sha256: from the cache when the file is as this process left it, else from a full read. */
function tailOf(file) {
  const st = statOf(file);
  if (st === null) return { seq: 0, sha256: ZERO_SHA256 };
  const cached = tails.get(file);
  if (cached && sameFile(cached.st, st)) return cached;
  const { events, torn } = scan(file);
  if (torn !== null) throw new Error(`appendEvent: ${file} ends in a torn line; recovery sets it aside with repairTorn before anything is appended`);
  const last = events[events.length - 1];
  const tail = last ? { seq: last.seq, sha256: last.sha256, st } : { seq: 0, sha256: ZERO_SHA256, st };
  tails.set(file, tail);
  return tail;
}

/** @returns {string|null} the saved torn text's path, or null when the log has no torn line */
export function repairTorn(file, tornDir) {
  if (!existsSync(file)) return null;
  const { events, torn, tornBytes, keep, bytes } = scan(file);
  if (torn === null) return null;
  const saved = join(tornDir, `${basename(file)}.${events.length + 1}.${sha256Hex(tornBytes)}.txt`);
  // Keep the evidence first; then cut the log back to its last whole line.
  writeDurable(saved, tornBytes);
  writeDurable(file, bytes.subarray(0, keep));
  tails.delete(file);
  return saved;
}

/** Refuses what JSON cannot hold exactly, so nothing drops out of the canonical JSON the seal covers. */
function assertJsonValue(value, at) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError(`appendEvent: ${value} at '${at}' has no JSON form`);
    return;
  }
  if (Array.isArray(value)) return value.forEach((x, i) => assertJsonValue(x, `${at}/${i}`));
  if (isPlainObject(value)) {
    for (const [k, x] of Object.entries(value)) assertJsonValue(x, `${at}/${k}`);
    return;
  }
  const what = value === undefined ? 'undefined' : typeof value === 'object' ? value.constructor?.name ?? 'object' : typeof value;
  throw new TypeError(`appendEvent: ${what} at '${at}' has no JSON form`);
}

/**
 * @param {string} file the log, e.g. pipeline/fr/events/unit13.jsonl
 * @param {{ type: string, subject: object, data: object, from?: string|null, to?: string|null, round?: number|null,
 *   reason?: string|null, refs?: string[] }} partial
 * @param {{ tenant: string, run_id: string, lock_epoch: number, actor: { kind: 'core'|'human', id: string },
 *   now: () => string, fence?: () => void, random?: (n: number) => Uint8Array }} ctx
 * @returns {object} the event as written
 */
export function appendEvent(file, partial, ctx) {
  if (!isPlainObject(partial)) throw new TypeError('appendEvent: the event must be an object');
  for (const field of CORE_FIELDS)
    if (Object.hasOwn(partial, field)) throw new TypeError(`appendEvent: ${field} is set by the core, not by the caller`);
  const { tenant, run_id, lock_epoch, actor, now, fence, random = randomBytes } = ctx ?? {};
  if (typeof now !== 'function') throw new TypeError('appendEvent: ctx.now must be the core clock, a function returning an ISO time');

  const tail = tailOf(file);
  const ts = now();
  const tsErrors = validateContract('la-pipeline-common@1#/$defs/time', ts);
  if (tsErrors.length > 0) throw new ContractError(SCHEMA, tsErrors.map((e) => `/ts${e}`));
  const event = {
    schema: SCHEMA,
    event_id: ulid(Date.parse(ts), random(10)),
    seq: tail.seq + 1,
    prev_sha256: tail.sha256,
    ts,
    tenant,
    run_id,
    lock_epoch,
    actor,
    ...partial,
  };
  assertJsonValue(event, '');
  event.sha256 = canonicalSha256(event);
  assertContract(SCHEMA, event);

  fence?.();
  const line = canonicalJson(event);
  appendLineDurable(file, line);
  tails.set(file, { seq: event.seq, sha256: event.sha256, st: statOf(file) });
  return JSON.parse(line);
}
