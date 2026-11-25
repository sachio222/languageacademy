// fsio.mjs through its io seam: the calls durability rests on (design §3.5), counted on a recording stand-in for
// node:fs. An append is one write of the whole line, fsynced before close; a whole-file write is fsynced before its
// rename and its folder after; every folder a call creates is fsynced, and so is the existing folder above it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createFsio } from '../fsio.mjs';
import { recordingIo } from './helpers/recording-io.mjs';

function tempDir(t) {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'la-fsio-')));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}
const fsyncedPaths = (calls) => calls.filter((c) => c.op === 'fsync').map((c) => c.path);

test('appendLineDurable writes the line and its newline in one write, then fsyncs, then closes', (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'unit13.jsonl');
  const { io, calls, ops } = recordingIo();
  const { appendLineDurable } = createFsio(io);
  appendLineDurable(file, '{"a":1}');
  const before = calls.length;
  appendLineDurable(file, '{"b":"é"}');
  const second = calls.slice(before);
  assert.deepEqual(second.filter((c) => c.path === file).map((c) => c.op), ['open:a', 'write', 'fsync', 'close']);
  assert.deepEqual(second.filter((c) => c.op === 'write').map((c) => c.bytes), ['{"b":"é"}\n']);
  // The folder is fsynced only when the call created the file.
  assert.deepEqual(fsyncedPaths(second), [file]);
  assert.deepEqual(ops(file).filter((o) => o === 'write').length, 2);
  assert.equal(readFileSync(file, 'utf8'), '{"a":1}\n{"b":"é"}\n');
});

test('appendLineDurable fsyncs the folder after creating the file, and each folder it had to create', (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'pipeline', 'fr', 'events', 'course.jsonl');
  const { io, calls } = recordingIo();
  createFsio(io).appendLineDurable(file, 'x');
  const synced = fsyncedPaths(calls);
  // The file, its new folder, its two new parents and the existing folder that now holds `pipeline`; last, the
  // folder again, now that it holds the new file.
  assert.ok(synced.includes(file));
  assert.equal(synced.at(-1), join(dir, 'pipeline', 'fr', 'events'));
  for (const d of [join(dir, 'pipeline', 'fr', 'events'), join(dir, 'pipeline', 'fr'), join(dir, 'pipeline'), dir])
    assert.ok(synced.includes(d), `fsynced ${d}: ${synced.join(', ')}`);
  // The new folders are made durable before the file is opened in them.
  const firstOpen = calls.findIndex((c) => c.op === 'open:a');
  assert.ok(calls.findIndex((c) => c.op === 'fsync' && c.path === join(dir, 'pipeline')) < firstOpen);
});

test('writeDurable writes a temporary file, fsyncs it, renames it over the target, then fsyncs the folder', (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'config.json');
  const { io, calls } = recordingIo();
  const { writeDurable } = createFsio(io);
  writeDurable(file, 'first');
  const before = calls.length;
  writeDurable(file, 'second');
  const seq = calls.slice(before);
  const rename = seq.find((c) => c.op === 'rename');
  const tmp = rename.from;
  assert.equal(rename.path, file);
  assert.equal(dirname(tmp), dir, 'the temporary file sits beside the target');
  assert.deepEqual(seq.filter((c) => c.path === tmp).map((c) => c.op), ['open:wx', 'write', 'fsync', 'close']);
  const at = (pred) => seq.findIndex(pred);
  assert.ok(at((c) => c.op === 'fsync' && c.path === tmp) < at((c) => c.op === 'rename'), 'fsync before rename');
  assert.ok(at((c) => c.op === 'rename') < at((c) => c.op === 'fsync' && c.path === dir), 'folder fsync after rename');
  assert.equal(readFileSync(file, 'utf8'), 'second');
  assert.deepEqual(readdirSync(dir), ['config.json']);
});

test('writeDurable fsyncs every folder it creates and the existing folder above them', (t) => {
  const dir = tempDir(t);
  mkdirSync(join(dir, 'store'));
  const file = join(dir, 'store', 'sha256', 'ab', 'abc');
  const { io, calls } = recordingIo();
  createFsio(io).writeDurable(file, 'blob');
  const synced = fsyncedPaths(calls);
  for (const d of [join(dir, 'store', 'sha256', 'ab'), join(dir, 'store', 'sha256'), join(dir, 'store')]) assert.ok(synced.includes(d), d);
  assert.ok(!synced.includes(dir), 'nothing above the first existing folder');
  // A second write into the same folders creates nothing, so only the file and its folder are fsynced.
  const before = calls.length;
  createFsio(io).writeDurable(join(dir, 'store', 'sha256', 'ab', 'abd'), 'blob 2');
  const again = fsyncedPaths(calls.slice(before));
  assert.equal(again.length, 2);
  assert.equal(again[1], join(dir, 'store', 'sha256', 'ab'));
});

test('a short write from the io is reported as an error, not a success', (t) => {
  const dir = tempDir(t);
  const { io } = recordingIo();
  const short = { ...io, writeSync: (fd, data) => io.writeSync(fd, data.subarray(0, data.length - 1)) };
  assert.throws(() => createFsio(short).appendLineDurable(join(dir, 'l.jsonl'), 'abc'), /wrote 3 of 4 bytes/);
});
