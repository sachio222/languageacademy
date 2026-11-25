// The pipeline's event logs (design §3.4, §3.5, §4.9): append-only JSON Lines files under pipeline/fr/events/, one
// la-pipeline-event@1 per line in canonical JSON. Each event's sha256 is the canonical SHA-256 of the event without
// its sha256 field; its prev_sha256 is the sha256 of the line before it, 64 zeros for the first; its seq is its line
// number, from 1, with no gaps. So the log is a hash chain: an edit to any line breaks it.
//
// - readLog(file) -> { events, torn }. A crash can only tear the last line, so the last line is `torn` (and left out
//   of events) when it has no newline, is not JSON, is not exactly canonicalJson(event), or its sha256 does not
//   match. Every other problem, on any line, is an edit and throws LogCorruptError { file, seq }: one of those before
//   the last line, a broken prev_sha256 link, a seq gap, or a line the schema refuses. Recovery halts on it with a
//   log_corrupt alert.
// - repairTorn(file, tornDir) saves the torn text to <tornDir>/<basename>.<seq>.<sha256 of the text>.txt, rewrites
//   the log without it (durably), and returns the saved path; null when nothing is torn. The caller records
//   log.repaired.
// - appendEvent(file, partial, ctx) fills schema, event_id (a ULID from ctx.now and ctx.random), seq, prev_sha256,
//   ts, tenant, run_id, lock_epoch and actor, seals the event, validates it, calls ctx.fence() (the lock's epoch
//   check, Task 28), then appends one line durably. It refuses to append after a torn line: recovery repairs first.
//   It throws LogCorruptError when the log no longer holds the event this process last appended to it (truncated or
//   rewritten), and when another writer's line raced its own so that its event is not a valid link at its seq.
// - verifyChain(events, file?) applies the same per-event rules to a list that starts at seq 1.
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { canonicalJson } from '../content/bundle.mjs';
import { ContractError, assertContract, validateContract } from './contracts/index.mjs';
import { appendLineDurable, createFsio, writeDurable } from './fsio.mjs';
import { assertJsonValue, canonicalSha256, sha256Hex, ulid } from './hash.mjs';

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
  /** The line's event, or why the line itself is bad: not JSON, not the event's canonical JSON, or a bad seal. */
  const parse = ([s, e]) => {
    const text = bytes.toString('utf8', s, e);
    let event;
    try {
      event = JSON.parse(text);
    } catch (err) {
      return { problem: `not JSON (${err.message})` };
    }
    // The log writes canonicalJson(event); extra spaces, reordered or repeated keys, or a CR are not its writing.
    if (canonicalJson(event) !== text) return { event, problem: 'the line is not the canonical JSON of its event' };
    return { event, problem: sealProblem(event) };
  };

  // With no torn tail, the last whole line is still torn when it is not JSON, not canonical, or its seal is bad: the
  // write that produced it did not finish as written (a block of zeros, a partial sector).
  if (torn === null && whole.length > 0) {
    const last = whole[whole.length - 1];
    const { problem } = parse(last);
    if (problem) {
      torn = last;
      keep = last[0];
      whole.pop();
    }
  }

  const events = [];
  let prev = ZERO_SHA256;
  whole.forEach((range, i) => {
    const { event, problem: lineProblem } = parse(range);
    const problem = lineProblem ?? chainProblem(event, i + 1, prev);
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

/**
 * The tail each log had after this process last appended to it, with the file's stat at that moment, so an append
 * need not reread the whole file. The stat is kept only when the file grew by exactly this process's line; when the
 * file has changed since, the full read must still hold the cached event at its seq, or the log shrank or was
 * rewritten under this process and appending would fork the chain.
 */
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
  const cached = tails.get(file);
  const shrank = () => new LogCorruptError(file, cached.seq, `the log shrank or was rewritten since this process appended event ${cached.seq}`);
  if (st === null) {
    if (cached) throw shrank();
    return { seq: 0, sha256: ZERO_SHA256, st: null };
  }
  if (cached && sameFile(cached.st, st)) return cached;
  const { events, torn, bytes } = scan(file);
  if (cached && events[cached.seq - 1]?.sha256 !== cached.sha256) throw shrank();
  if (torn !== null) throw new Error(`appendEvent: ${file} ends in a torn line; recovery sets it aside with repairTorn before anything is appended`);
  const last = events[events.length - 1];
  // The size is what was read, so a line another writer adds between the stat and the read still shows as a change.
  const tail = { seq: last?.seq ?? 0, sha256: last?.sha256 ?? ZERO_SHA256, st: { ...st, size: bytes.length } };
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

/**
 * @param {string} file the log, e.g. pipeline/fr/events/unit13.jsonl
 * @param {{ type: string, subject: object, data: object, from?: string|null, to?: string|null, round?: number|null,
 *   reason?: string|null, refs?: string[] }} partial
 * @param {{ tenant: string, run_id: string, lock_epoch: number, actor: { kind: 'core'|'human', id: string },
 *   now: () => string, fence?: () => void, random?: (n: number) => Uint8Array, io?: typeof import('node:fs') }} ctx
 *   `io` is the fsio seam for the append itself (node:fs by default), for tests.
 * @returns {object} the event as written
 */
export function appendEvent(file, partial, ctx) {
  if (!isPlainObject(partial)) throw new TypeError('appendEvent: the event must be an object');
  for (const field of CORE_FIELDS)
    if (Object.hasOwn(partial, field)) throw new TypeError(`appendEvent: ${field} is set by the core, not by the caller`);
  const { tenant, run_id, lock_epoch, actor, now, fence, random = randomBytes, io } = ctx ?? {};
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
  assertJsonValue(event, 'appendEvent');
  event.sha256 = canonicalSha256(event);
  assertContract(SCHEMA, event);

  fence?.();
  const line = canonicalJson(event);
  const written = (io ? createFsio(io).appendLineDurable : appendLineDurable)(file, line);
  const after = statOf(file);
  const grewByThisLine = after !== null && after.size === (tail.st?.size ?? 0) + written && (tail.st === null || after.ino === tail.st.ino);
  if (grewByThisLine) {
    tails.set(file, { seq: event.seq, sha256: event.sha256, st: after });
  } else {
    // Another writer changed the log while this append was in flight. Report success only if this event stands as a
    // valid link at the seq it was written for; a forked chain throws here (or in the read) instead.
    tails.delete(file);
    const raced = (why) => new LogCorruptError(file, event.seq, `another writer appended at the same time, so this event is not a valid link at its seq (${why})`);
    let events;
    try {
      ({ events } = scan(file));
    } catch (e) {
      if (e instanceof LogCorruptError) throw raced(`line ${e.seq}: ${e.reason}`);
      throw e;
    }
    if (events[event.seq - 1]?.sha256 !== event.sha256) throw raced(`line ${event.seq} holds another event`);
  }
  return JSON.parse(line);
}
