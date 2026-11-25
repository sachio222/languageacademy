// log.mjs: the append-only, hash-chained event logs under pipeline/fr/events/ (design §3.4, §3.5, §4.9). Each line is
// one la-pipeline-event@1 whose sha256 covers its canonical JSON without sha256 and whose prev_sha256 names the line
// before it. A crash can tear only the last line, which is set aside; a bad line anywhere earlier is an edit and halts.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import * as fs from 'node:fs';
import { appendFileSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalJson } from '../../content/bundle.mjs';
import { ContractError } from '../contracts/index.mjs';
import { canonicalSha256, sha256Hex } from '../hash.mjs';
import { appendEvent, eventSha256, LogCorruptError, readLog, repairTorn, verifyChain, ZERO_SHA256 } from '../log.mjs';

const FIXTURE = fileURLToPath(new URL('./fixtures/contracts/la-pipeline-event@1.module-transition.json', import.meta.url));

function tempDir(t) {
  const dir = mkdtempSync(join(tmpdir(), 'la-log-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

/** The core's context: an injected clock that ticks one second per reading, and counting random bytes. */
function context(overrides = {}) {
  let ms = Date.parse('2026-11-26T14:02:10.114Z');
  let n = 0;
  return {
    tenant: 'fr-en',
    run_id: 'run-20261126-1402',
    lock_epoch: 7,
    actor: { kind: 'core', id: 'pipeline@0.1.0' },
    now: () => new Date((ms += 1000)).toISOString(),
    random: () => Buffer.alloc(10, n++),
    ...overrides,
  };
}
const transition = (module_key, from, to) => ({
  type: 'module.transition',
  subject: { unit_key: 'unit13', module_key },
  from,
  to,
  round: 1,
  reason: null,
  refs: [],
  data: {},
});

/** A log of `n` appended events. */
function logOf(t, n) {
  const file = join(tempDir(t), 'events', 'unit13.jsonl');
  const ctx = context();
  const events = [];
  for (let i = 0; i < n; i++) events.push(appendEvent(file, transition(`module-${i}`, 'planned', 'briefed'), ctx));
  return { file, ctx, events };
}
const lines = (file) => readFileSync(file, 'utf8').split('\n').slice(0, -1);
/** Rewrite line `i` (0-based) with `edit` applied to its event, optionally resealing its own sha256. */
function rewriteLine(file, i, edit, { reseal = false } = {}) {
  const all = lines(file);
  const event = JSON.parse(all[i]);
  edit(event);
  if (reseal) event.sha256 = eventSha256(event);
  all[i] = canonicalJson(event);
  writeFileSync(file, `${all.join('\n')}\n`);
}

test('appended events chain and read back', (t) => {
  const { file, events } = logOf(t, 3);
  assert.deepEqual(events.map((e) => e.seq), [1, 2, 3]);
  assert.equal(events[0].prev_sha256, ZERO_SHA256);
  assert.equal(ZERO_SHA256, '0'.repeat(64));
  assert.equal(events[1].prev_sha256, events[0].sha256);
  assert.equal(events[2].prev_sha256, events[1].sha256);
  for (const e of events) {
    assert.equal(e.schema, 'la-pipeline-event@1');
    assert.match(e.event_id, /^[0-9A-HJKMNP-TV-Z]{26}$/);
    const { sha256, ...rest } = e;
    assert.equal(sha256, canonicalSha256(rest));
    assert.equal(e.tenant, 'fr-en');
    assert.equal(e.lock_epoch, 7);
  }
  // Times come from the injected clock, and event ids sort with them.
  assert.deepEqual(events.map((e) => e.ts), ['2026-11-26T14:02:11.114Z', '2026-11-26T14:02:12.114Z', '2026-11-26T14:02:13.114Z']);
  assert.deepEqual(events.map((e) => e.event_id), [...events.map((e) => e.event_id)].sort());
  // One canonical JSON line per event, each ending in a newline.
  const text = readFileSync(file, 'utf8');
  assert.equal(text, events.map((e) => `${canonicalJson(e)}\n`).join(''));
  assert.deepEqual(readLog(file), { events, torn: null });
  assert.doesNotThrow(() => verifyChain(events));
});

test('a missing log reads as empty, and its first event starts the chain', (t) => {
  const file = join(tempDir(t), 'events', 'course.jsonl');
  assert.deepEqual(readLog(file), { events: [], torn: null });
  const first = appendEvent(file, { type: 'run.started', subject: {}, data: { engine: 'fake' } }, context());
  assert.equal(first.seq, 1);
  assert.equal(first.prev_sha256, ZERO_SHA256);
  assert.deepEqual(readLog(file).events, [first]);
});

test('the design example event fixture is sealed the way the log seals events', () => {
  const event = JSON.parse(readFileSync(FIXTURE, 'utf8'));
  assert.equal(eventSha256(event), event.sha256);
});

test('a torn final line is reported, set aside, and the log reads clean', (t) => {
  const { file, ctx, events } = logOf(t, 2);
  const clean = readFileSync(file, 'utf8');
  const half = canonicalJson(transition('module-9', 'planned', 'briefed')).slice(0, 40);
  appendFileSync(file, half);

  const read = readLog(file);
  assert.deepEqual(read, { events, torn: half });

  const tornDir = join(tempDir(t), 'torn');
  const saved = repairTorn(file, tornDir);
  assert.equal(saved, join(tornDir, `${basename(file)}.3.${sha256Hex(half)}.txt`));
  assert.equal(readFileSync(saved, 'utf8'), half);
  assert.equal(readFileSync(file, 'utf8'), clean, 'the log is back to its last whole line, byte for byte');
  assert.deepEqual(readLog(file), { events, torn: null });
  // Nothing torn: nothing to do.
  assert.equal(repairTorn(file, tornDir), null);
  assert.deepEqual(readdirSync(tornDir), [basename(saved)]);
  // The chain continues from the last whole event.
  const next = appendEvent(file, transition('module-9', 'planned', 'briefed'), ctx);
  assert.equal(next.seq, 3);
  assert.equal(next.prev_sha256, events[1].sha256);
});

test('a final line with its newline but bad JSON or a bad sha256 is torn too', (t) => {
  for (const tail of [
    (line) => `${line.slice(0, 30)}\n`, // bad JSON, newline written
    (line) => `${line.replace('"briefed"', '"drafting"')}\n`, // whole JSON, sha256 no longer matches
    () => '\u0000'.repeat(12), // a block of zeros some filesystems leave after a crash
  ]) {
    const { file, events } = logOf(t, 2);
    const third = JSON.parse(lines(file)[1]);
    third.seq = 3;
    third.prev_sha256 = events[1].sha256;
    third.sha256 = eventSha256(third);
    const text = tail(canonicalJson(third));
    appendFileSync(file, text);
    const read = readLog(file);
    assert.deepEqual(read.events, events);
    assert.equal(read.torn, text.endsWith('\n') ? text.slice(0, -1) : text);
    repairTorn(file, join(tempDir(t), 'torn'));
    assert.deepEqual(readLog(file), { events, torn: null });
  }
});

test('a whole final line without its newline is torn: the append that wrote it never finished', (t) => {
  const { file, events } = logOf(t, 3);
  const text = readFileSync(file, 'utf8');
  writeFileSync(file, text.slice(0, -1));
  assert.deepEqual(readLog(file), { events: events.slice(0, 2), torn: canonicalJson(events[2]) });
});

test('an edited earlier line halts with LogCorruptError', (t) => {
  const { file } = logOf(t, 3);
  rewriteLine(file, 0, (e) => {
    e.data.note = 'edited by hand';
  });
  assert.throws(() => readLog(file), (e) => e instanceof LogCorruptError && e.file === file && e.seq === 1 && /sha256/.test(e.message));
  // Resealing the edited line's own hash breaks the next line's link instead.
  const { file: f2 } = logOf(t, 3);
  rewriteLine(f2, 0, (e) => {
    e.to = 'approved';
  }, { reseal: true });
  assert.throws(() => readLog(f2), (e) => e instanceof LogCorruptError && e.seq === 2 && /prev_sha256/.test(e.message));
  // repairTorn and appendEvent halt the same way: an edit is never repaired.
  assert.throws(() => repairTorn(file, join(tempDir(t), 'torn')), LogCorruptError);
  assert.throws(() => appendEvent(file, transition('x', 'planned', 'briefed'), context()), LogCorruptError);
});

test('a whole, sealed final line that breaks the chain is an edit, not a tear', (t) => {
  const { file } = logOf(t, 3);
  rewriteLine(file, 2, (e) => {
    e.prev_sha256 = 'f'.repeat(64);
  }, { reseal: true });
  assert.throws(() => readLog(file), (e) => e instanceof LogCorruptError && e.seq === 3);
});

test('a seq gap is LogCorruptError', (t) => {
  const { file } = logOf(t, 3);
  // Line 2 claims seq 3, sealed and linked as the log would have written it.
  rewriteLine(file, 1, (e) => {
    e.seq = 3;
  }, { reseal: true });
  const all = lines(file);
  const third = JSON.parse(all[2]);
  third.prev_sha256 = JSON.parse(all[1]).sha256;
  third.seq = 4;
  third.sha256 = eventSha256(third);
  writeFileSync(file, `${[all[0], all[1], canonicalJson(third)].join('\n')}\n`);
  assert.throws(() => readLog(file), (e) => e instanceof LogCorruptError && e.file === file && e.seq === 2 && /seq/.test(e.message));
});

test('a line its schema refuses, or a blank line, before the last is LogCorruptError', (t) => {
  const { file } = logOf(t, 3);
  rewriteLine(file, 0, (e) => {
    e.actor.kind = 'engine';
  }, { reseal: true });
  // Relink line 2 to the resealed line 1, so only the schema can object.
  rewriteLine(file, 1, (e) => {
    e.prev_sha256 = JSON.parse(lines(file)[0]).sha256;
  }, { reseal: true });
  rewriteLine(file, 2, (e) => {
    e.prev_sha256 = JSON.parse(lines(file)[1]).sha256;
  }, { reseal: true });
  assert.throws(() => readLog(file), (e) => e instanceof LogCorruptError && e.seq === 1 && /actor\/kind/.test(e.message));

  const { file: f2 } = logOf(t, 2);
  const [a, b] = lines(f2);
  writeFileSync(f2, `${a}\n\n${b}\n`);
  assert.throws(() => readLog(f2), (e) => e instanceof LogCorruptError && e.seq === 2);
});

test('appendEvent refuses an event its schema refuses', (t) => {
  const { file, ctx, events } = logOf(t, 1);
  const before = readFileSync(file, 'utf8');
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), colour: 'blue' }, ctx), (e) => e instanceof ContractError && e.errors.includes('/colour: not allowed'));
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), round: 'one' }, ctx), ContractError);
  assert.throws(() => appendEvent(file, { type: 'module.transition', subject: {} }, ctx), (e) => e instanceof ContractError && e.errors.includes(': missing data'));
  assert.throws(() => appendEvent(file, transition('m', 'planned', 'briefed'), { ...ctx, lock_epoch: 0 }), ContractError);
  assert.throws(() => appendEvent(file, transition('m', 'planned', 'briefed'), { ...ctx, now: () => '2026-11-26T14:02:10Z' }), ContractError);
  assert.equal(readFileSync(file, 'utf8'), before, 'nothing was written');
  assert.deepEqual(readLog(file).events, events);
});

test('appendEvent fills the core fields itself and refuses a partial that sets them', (t) => {
  const { file, ctx } = logOf(t, 1);
  for (const field of ['schema', 'event_id', 'seq', 'prev_sha256', 'sha256', 'ts', 'tenant', 'run_id', 'lock_epoch', 'actor'])
    assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), [field]: 'x' }, ctx), new RegExp(field), field);
  // undefined, NaN and functions have no JSON form: refused rather than dropped from the hash.
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), data: { n: Number.NaN } }, ctx), TypeError);
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), data: { u: undefined } }, ctx), TypeError);
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), data: { when: new Date(0) } }, ctx), TypeError);
  assert.equal(readLog(file).events.length, 1);
});

test('appendEvent calls fence before it writes, and a fence that throws writes nothing', (t) => {
  const { file, ctx } = logOf(t, 1);
  const calls = [];
  const e = appendEvent(file, transition('m', 'planned', 'briefed'), {
    ...ctx,
    fence: () => calls.push(lines(file).length),
  });
  assert.deepEqual(calls, [1], 'fence ran once, while the log still held one line');
  assert.equal(e.seq, 2);
  const before = readFileSync(file, 'utf8');
  const stale = new Error('lock epoch 7 is stale; the lock is now at 8');
  assert.throws(() => appendEvent(file, transition('m', 'briefed', 'drafting'), { ...ctx, fence: () => { throw stale; } }), (err) => err === stale);
  assert.equal(readFileSync(file, 'utf8'), before);
});

test('appendEvent refuses to write after a torn line until it is repaired', (t) => {
  const { file, ctx } = logOf(t, 2);
  appendFileSync(file, '{"schema":"la-pipel');
  assert.throws(() => appendEvent(file, transition('m', 'planned', 'briefed'), ctx), /torn/);
  repairTorn(file, join(tempDir(t), 'torn'));
  assert.equal(appendEvent(file, transition('m', 'planned', 'briefed'), ctx).seq, 3);
  assert.equal(readLog(file).events.length, 3);
});

test('appendEvent halts on a log that lost the event this process last appended', (t) => {
  const { file, ctx, events } = logOf(t, 5);
  // Another process (or a hand) truncates the log to two whole lines between two appends.
  const kept = `${events.slice(0, 2).map((e) => canonicalJson(e)).join('\n')}\n`;
  writeFileSync(file, kept);
  assert.throws(
    () => appendEvent(file, transition('m', 'planned', 'briefed'), ctx),
    (e) => e instanceof LogCorruptError && e.file === file && e.seq === 5 && /shrank or was rewritten/.test(e.message),
  );
  assert.equal(readFileSync(file, 'utf8'), kept, 'nothing was appended');
  // Rewritten in place to a different fifth event: the same halt.
  const { file: f2, ctx: c2, events: e2 } = logOf(t, 5);
  rewriteLine(f2, 4, (e) => {
    e.data.note = 'replaced';
  }, { reseal: true });
  assert.ok(readLog(f2).events[4].sha256 !== e2[4].sha256, 'the rewritten log is itself a valid chain');
  assert.throws(() => appendEvent(f2, transition('m', 'planned', 'briefed'), c2), (e) => e instanceof LogCorruptError && e.seq === 5);
});

test('appendEvent accepts a log another writer extended correctly since its last append', (t) => {
  const { file, ctx, events } = logOf(t, 2);
  // The other writer is another process: it appends a correctly sealed and linked seq 3 straight to the file.
  const other = { ...events[1], event_id: '01JDQ7Y3M2C8K4Z6T9V0B1N2P3', seq: 3, prev_sha256: events[1].sha256, run_id: 'run-other', to: 'drafting' };
  other.sha256 = eventSha256(other);
  appendFileSync(file, `${canonicalJson(other)}\n`);
  // This process's cache still names seq 2; the log now holds seq 2 unchanged and a valid seq 3.
  const next = appendEvent(file, transition('m', 'drafting', 'drafted'), ctx);
  assert.equal(next.seq, 4);
  assert.equal(next.prev_sha256, other.sha256);
  assert.equal(readLog(file).events[1].sha256, events[1].sha256);
});

test('a line another writer adds between the tail read and the write makes appendEvent throw, not report success', (t) => {
  const { file, ctx, events } = logOf(t, 2);
  // The fence runs after the tail is read and before the line is written: the exact window a second writer races in.
  const rival = { ...events[1], event_id: '01JDQ7Y3M2C8K4Z6T9V0B1N2P3', seq: 3, prev_sha256: events[1].sha256, run_id: 'run-rival' };
  rival.sha256 = eventSha256(rival);
  const race = () => appendFileSync(file, `${canonicalJson(rival)}\n`);
  assert.throws(
    () => appendEvent(file, transition('m', 'planned', 'briefed'), { ...ctx, fence: race }),
    (e) => e instanceof LogCorruptError && e.file === file && e.seq === 3 && /another writer/.test(e.message),
  );
  // The log now holds two seq 3 lines; the reader halts on the second, so the fork is never folded.
  assert.throws(() => readLog(file), (e) => e instanceof LogCorruptError && e.seq === 4);
  // The cache was dropped: the next append rereads and halts too.
  assert.throws(() => appendEvent(file, transition('m', 'briefed', 'drafting'), ctx), LogCorruptError);
});

test('a log replaced between the write and the check, losing this event, makes appendEvent throw', (t) => {
  const { file, ctx, events } = logOf(t, 3);
  // Another writer renames a valid two-event log over this one just after this process's line lands.
  const replacement = join(tempDir(t), 'older.jsonl');
  writeFileSync(replacement, `${events.slice(0, 2).map((e) => canonicalJson(e)).join('\n')}\n`);
  let logFd = null;
  const io = {
    ...fs,
    openSync: (path, flags, mode) => {
      const fd = fs.openSync(path, flags, mode);
      if (path === file && flags === 'a') logFd = fd;
      return fd;
    },
    closeSync: (fd) => {
      fs.closeSync(fd);
      if (fd === logFd) fs.renameSync(replacement, file);
    },
  };
  assert.throws(
    () => appendEvent(file, transition('m', 'planned', 'briefed'), { ...ctx, io }),
    (e) => e instanceof LogCorruptError && e.seq === 4 && /another writer/.test(e.message) && /line 4 holds another event/.test(e.message),
  );
  assert.deepEqual(readLog(file).events, events.slice(0, 2));
});

/** The longest prefix of the log's lines that is a valid chain, as the reader's rules would accept it. */
function validPrefix(file) {
  const out = [];
  for (const line of readFileSync(file, 'utf8').split('\n').slice(0, -1)) {
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      break;
    }
    const prev = out.length === 0 ? ZERO_SHA256 : out.at(-1).sha256;
    if (canonicalJson(event) !== line || eventSha256(event) !== event.sha256 || event.seq !== out.length + 1 || event.prev_sha256 !== prev) break;
    out.push(event);
  }
  return out;
}

test('two writers with no lock: every append reported as done is a valid link of the chain', async (t) => {
  const child = fileURLToPath(new URL('./helpers/append-child.mjs', import.meta.url));
  for (let round = 0; round < 3; round++) {
    const file = join(tempDir(t), 'events', 'course.jsonl');
    const kids = ['A', 'B'].map((id) => fork(child, [file, id, '150'], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] }));
    await Promise.all(kids.map((k) => new Promise((res) => k.once('message', res))));
    const results = Promise.all(kids.map((k) => new Promise((res) => k.once('message', res))));
    for (const k of kids) k.send('go');
    const reports = await results;
    await Promise.all(kids.map((k) => (k.exitCode === null ? new Promise((res) => k.once('exit', res)) : null)));
    const prefix = validPrefix(file);
    for (const { id, ok } of reports)
      for (const { seq, sha256 } of ok) assert.equal(prefix[seq - 1]?.sha256, sha256, `round ${round}: writer ${id} was told seq ${seq} succeeded, but it is not in the valid chain (${prefix.length} valid of ${lines(file).length} lines)`);
    // When nobody was told of a failure, the whole log is a clean chain of every append.
    if (reports.every((r) => r.failed === 0)) assert.deepEqual(readLog(file).events.length, 300, `round ${round}`);
  }
});

test('repairTorn saves the evidence before it cuts the log: a failed save leaves the log untouched', (t) => {
  const { file } = logOf(t, 2);
  appendFileSync(file, '{"schema":"la-pipel');
  const before = readFileSync(file);
  const notAFolder = join(tempDir(t), 'torn');
  writeFileSync(notAFolder, 'a file where the torn folder should be');
  assert.throws(() => repairTorn(file, notAFolder));
  assert.deepEqual(readFileSync(file), before, 'the torn line is still in the log');
  assert.equal(readLog(file).torn, '{"schema":"la-pipel');
});

/** Ways to write an event's line that parse to the same event but are not its canonical JSON. */
const NON_CANONICAL = {
  'extra spaces': (line) => line.replace('{"actor":', '{ "actor": '),
  'reordered keys': (line) => {
    const { schema, ...rest } = JSON.parse(line);
    return JSON.stringify({ ...JSON.parse(canonicalJson(rest)), schema });
  },
  CRLF: (line) => `${line}\r`,
  'duplicate keys': (line) => line.replace('{', '{"type":"forged",'),
};

test('a line that is not its canonical JSON, before the last, is LogCorruptError', (t) => {
  for (const [name, rewrite] of Object.entries(NON_CANONICAL)) {
    const { file } = logOf(t, 3);
    const all = lines(file);
    all[1] = rewrite(all[1]);
    assert.deepEqual(JSON.parse(all[1]).seq, 2, `${name}: still parses to the same event`);
    writeFileSync(file, `${all.join('\n')}\n`);
    assert.throws(() => readLog(file), (e) => e instanceof LogCorruptError && e.seq === 2 && /canonical/.test(e.message), name);
  }
});

test('a last line that is not its canonical JSON is torn', (t) => {
  for (const [name, rewrite] of Object.entries(NON_CANONICAL)) {
    const { file, events } = logOf(t, 3);
    const all = lines(file);
    all[2] = rewrite(all[2]);
    writeFileSync(file, `${all.join('\n')}\n`);
    const read = readLog(file);
    assert.deepEqual(read.events, events.slice(0, 2), name);
    assert.equal(read.torn, all[2], name);
  }
});

test('appendEvent refuses a lone surrogate anywhere in the event', (t) => {
  const { file, ctx } = logOf(t, 1);
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), data: { text: 'caf\uD800' } }, ctx), TypeError);
  assert.throws(() => appendEvent(file, { ...transition('m', 'planned', 'briefed'), data: { ['\uDC00']: 1 } }, ctx), TypeError);
  assert.equal(readLog(file).events.length, 1);
});

test('verifyChain refuses a broken link, a bad seal and a seq that does not start at 1', (t) => {
  const { events } = logOf(t, 3);
  assert.doesNotThrow(() => verifyChain([]));
  const relinked = structuredClone(events);
  relinked[2].prev_sha256 = relinked[0].sha256;
  assert.throws(() => verifyChain(relinked), (e) => e instanceof LogCorruptError && e.seq === 3 && e.file === null);
  const edited = structuredClone(events);
  edited[1].data.x = 1;
  assert.throws(() => verifyChain(edited), (e) => e instanceof LogCorruptError && e.seq === 2);
  assert.throws(() => verifyChain(events.slice(1)), (e) => e instanceof LogCorruptError && /seq/.test(e.message));
});

test('repairTorn on a missing log does nothing', (t) => {
  const dir = tempDir(t);
  assert.equal(repairTorn(join(dir, 'none.jsonl'), join(dir, 'torn')), null);
  assert.equal(existsSync(join(dir, 'torn')), false);
});
