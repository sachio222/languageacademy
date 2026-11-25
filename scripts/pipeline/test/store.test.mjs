// store.mjs: the content-addressed blob store under .pipeline/store (design §3.4, §3.5 step 1). A blob's name is the
// SHA-256 of its bytes, so the same text is stored once and a blob that no longer matches its name is caught on read.
// fsio.mjs: the durable write and the durable append the store and the event log rest on.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { appendLineDurable, writeDurable } from '../fsio.mjs';
import { canonicalSha256, sha256Hex } from '../hash.mjs';
import { createStore, StoreCorruptError } from '../store.mjs';
import { recordingIo } from './helpers/recording-io.mjs';

function tempDir(t) {
  const dir = mkdtempSync(join(tmpdir(), 'la-store-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}
/** Every file under `dir`, as paths relative to it. */
const filesUnder = (dir) => readdirSync(dir, { recursive: true, withFileTypes: true }).filter((d) => d.isFile()).map((d) => join(d.parentPath, d.name).slice(dir.length + 1));

test('store put/get round-trips and is content-addressed', (t) => {
  const dir = tempDir(t);
  const store = createStore(dir);
  const text = 'Le livre qui est sur la table.\n';
  const sha = store.put(text);
  assert.equal(sha, sha256Hex(text));
  assert.equal(store.path(sha), join(dir, 'sha256', sha.slice(0, 2), sha));
  assert.equal(readFileSync(store.path(sha), 'utf8'), text);
  assert.equal(store.get(sha), text);
  assert.ok(store.has(sha));
  // The same text again: the same name, one file.
  assert.equal(store.put(text), sha);
  assert.deepEqual(filesUnder(dir), [join('sha256', sha.slice(0, 2), sha)]);
  // A different text: a different name.
  assert.notEqual(store.put(`${text} `), sha);
  assert.equal(filesUnder(dir).length, 2);
});

test('store put of an object stores its canonical JSON, whatever the key order', (t) => {
  const store = createStore(tempDir(t));
  const a = store.put({ b: [2, 1], a: { d: 'été', c: null } });
  const b = store.put({ a: { c: null, d: 'été' }, b: [2, 1] });
  assert.equal(a, b);
  assert.equal(a, canonicalSha256({ a: { c: null, d: 'été' }, b: [2, 1] }));
  assert.equal(store.get(a), '{"a":{"c":null,"d":"été"},"b":[2,1]}');
  assert.deepEqual(store.getJson(a), { a: { c: null, d: 'été' }, b: [2, 1] });
  // The canonical text and the object name one blob.
  assert.equal(store.put('{"a":{"c":null,"d":"été"},"b":[2,1]}'), a);
  // A value JSON cannot hold is refused, not stored as "undefined".
  assert.throws(() => store.put(undefined), TypeError);
  assert.throws(() => store.put(42), TypeError);
});

test('store get and has on a missing blob: null and false; a bad name throws', (t) => {
  const store = createStore(tempDir(t));
  const missing = 'a'.repeat(64);
  assert.equal(store.get(missing), null);
  assert.equal(store.getJson(missing), null);
  assert.equal(store.has(missing), false);
  for (const bad of ['', 'abc', 'A'.repeat(64), '../'.repeat(21) + 'a', 'a'.repeat(65)]) {
    assert.throws(() => store.get(bad), TypeError, bad);
    assert.throws(() => store.path(bad), TypeError, bad);
    assert.throws(() => store.has(bad), TypeError, bad);
  }
});

test('a blob edited on disk is refused on read, and put repairs it', (t) => {
  const store = createStore(tempDir(t));
  const sha = store.put('original');
  writeFileSync(store.path(sha), 'edited');
  assert.throws(() => store.get(sha), (e) => e instanceof StoreCorruptError && e.sha256 === sha && e.file === store.path(sha));
  // put of the true content rewrites the file, since its name says what it must hold.
  assert.equal(store.put('original'), sha);
  assert.equal(store.get(sha), 'original');
});

test('store put refuses a value canonical JSON would change, and writes nothing', (t) => {
  const dir = tempDir(t);
  const store = createStore(dir);
  for (const bad of [
    { a: undefined },
    { n: Number.NaN },
    [Number.NEGATIVE_INFINITY],
    { when: new Date(0) },
    { f: () => 1 },
    { s: 'half \uD83D pair' },
    { ['k\uDC00']: 1 },
    'lone \uDC00 surrogate in a text blob',
  ])
    assert.throws(() => store.put(bad), TypeError, JSON.stringify(bad));
  assert.equal(existsSync(join(dir, 'sha256')), false);
  // A whole surrogate pair is fine.
  assert.equal(store.get(store.put('\u{1F600}')), '\u{1F600}');
});

test('store has verifies the blob: a missing one is false, an edited one throws', (t) => {
  const store = createStore(tempDir(t));
  const sha = store.put('original');
  assert.equal(store.has(sha), true);
  writeFileSync(store.path(sha), 'edited');
  assert.throws(() => store.has(sha), (e) => e instanceof StoreCorruptError && e.sha256 === sha);
  assert.equal(store.has('b'.repeat(64)), false);
});

test('store put makes each folder it creates durable, through the io seam', (t) => {
  const dir = realpathSync(tempDir(t));
  const { io, calls } = recordingIo();
  const store = createStore(dir, { io });
  const sha = store.put('Le chat qui dort.');
  const synced = calls.filter((c) => c.op === 'fsync').map((c) => c.path);
  for (const d of [join(dir, 'sha256', sha.slice(0, 2)), join(dir, 'sha256'), dir]) assert.ok(synced.includes(d), `${d} fsynced: ${synced.join(', ')}`);
  assert.equal(calls.filter((c) => c.op === 'rename').length, 1);
});

test('store leaves no temporary file behind', (t) => {
  const dir = tempDir(t);
  const store = createStore(dir);
  for (let i = 0; i < 5; i++) store.put(`blob ${i}`);
  assert.deepEqual(filesUnder(dir).filter((f) => f.endsWith('.tmp')), []);
  assert.equal(filesUnder(dir).length, 5);
});

test('writeDurable replaces a file whole and creates its folder', (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'a', 'b', 'x.json');
  writeDurable(file, 'one');
  writeDurable(file, 'two');
  assert.equal(readFileSync(file, 'utf8'), 'two');
  assert.deepEqual(readdirSync(join(dir, 'a', 'b')), ['x.json']);
});

test('appendLineDurable adds one line with its newline, creates the file, and refuses a line holding a newline', (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'events', 'course.jsonl');
  appendLineDurable(file, '{"a":1}');
  appendLineDurable(file, '{"b":"é"}');
  assert.equal(readFileSync(file, 'utf8'), '{"a":1}\n{"b":"é"}\n');
  for (const bad of ['two\nlines', 'trailing\n', '\n'])
    assert.throws(() => appendLineDurable(file, bad), /newline/, JSON.stringify(bad));
  assert.throws(() => appendLineDurable(file, 7), TypeError);
  assert.equal(readFileSync(file, 'utf8'), '{"a":1}\n{"b":"é"}\n', 'a refused line writes nothing');
  assert.ok(existsSync(file));
});
