// Every file a content script writes goes through a temporary file and a rename (spec 9.1, final review M5), so an
// interrupted run leaves the old file or the new one, never half of one. Each test makes the temporary file's path
// unwritable (a folder stands there): a script that writes in place still overwrites the file; one that writes
// through the temporary file fails and leaves the file as it was.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_ROOT } from '../load.mjs';
import { writeFileAtomic } from '../atomic-write.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const tempDir = (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'la-atomic-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
};

test('writeFileAtomic writes the whole file, or nothing', (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'a.json');
  writeFileAtomic(file, 'new\n');
  assert.equal(readFileSync(file, 'utf8'), 'new\n');
  assert.equal(existsSync(`${file}.tmp`), false, 'no temporary file left behind');
  mkdirSync(`${file}.tmp`);
  assert.throws(() => writeFileAtomic(file, 'newer\n'));
  assert.equal(readFileSync(file, 'utf8'), 'new\n');
});

test('content:bundle writes the bundle through a temporary file', (t) => {
  const dir = tempDir(t);
  const out = join(dir, 'bundle.json');
  writeFileSync(out, 'OLD\n');
  mkdirSync(`${out}.tmp`);
  const r = spawnSync('node', ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', CLI, 'bundle', '--units', 'unit1', '--out', out], { encoding: 'utf8' });
  assert.notEqual(r.status, 0, 'the write cannot have succeeded');
  assert.equal(readFileSync(out, 'utf8'), 'OLD\n', 'the old bundle is untouched');
});

test('plan-stubs --write writes course.json through a temporary file', async (t) => {
  const { main } = await import('../plan-stubs.mjs');
  const root = tempDir(t);
  cpSync(CONTENT_ROOT, root, { recursive: true });
  // The course loses its last planned stub (file and listing), so --write must write course.json again.
  const file = join(root, 'course.json');
  const outline = JSON.parse(readFileSync(file, 'utf8'));
  rmSync(join(root, 'modules', `${outline.units.at(-1).entries.pop()}.json`));
  const before = JSON.stringify(outline, null, 2) + '\n';
  writeFileSync(file, before);
  mkdirSync(`${file}.tmp`);
  t.mock.method(console, 'log', () => {});
  t.mock.method(console, 'error', () => {});
  let failed = false;
  try {
    failed = main(['--write', '--root', root]) !== 0;
  } catch {
    failed = true;
  }
  assert.ok(failed, 'the write cannot have succeeded');
  assert.equal(readFileSync(file, 'utf8'), before, 'course.json is untouched');
});
