// Every file a content script writes goes through a temporary file and a rename (spec 9.1, final review M5), so an
// interrupted run leaves the old file or the new one, never half of one. Each fault test makes the target's folder
// read-only: a script that writes in place still overwrites the file; one that writes through a temporary file
// cannot create it, fails, and leaves the file as it was.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { chmodSync, cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_ROOT } from '../load.mjs';
import { tempNameFor, writeFileAtomic } from '../atomic-write.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const MODULE = fileURLToPath(new URL('../atomic-write.mjs', import.meta.url));
// Root ignores folder permissions, so the read-only fault cannot be injected.
const skipRoot = process.getuid?.() === 0 ? 'root ignores folder permissions' : false;
const tempDir = (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'la-atomic-'));
  t.after(() => {
    try { chmodSync(dir, 0o755); } catch { /* already gone */ }
    rmSync(dir, { recursive: true, force: true });
  });
  return dir;
};

test('writeFileAtomic writes the whole file, or nothing', { skip: skipRoot }, (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'a.json');
  writeFileAtomic(file, 'new\n');
  assert.equal(readFileSync(file, 'utf8'), 'new\n');
  assert.deepEqual(readdirSync(dir), ['a.json'], 'no temporary file left behind');
  chmodSync(dir, 0o555);
  assert.throws(() => writeFileAtomic(file, 'newer\n'));
  chmodSync(dir, 0o755);
  assert.equal(readFileSync(file, 'utf8'), 'new\n');
});

test('content:bundle writes the bundle through a temporary file', { skip: skipRoot }, (t) => {
  const dir = tempDir(t);
  const out = join(dir, 'bundle.json');
  writeFileSync(out, 'OLD\n');
  chmodSync(dir, 0o555);
  const r = spawnSync('node', ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', CLI, 'bundle', '--units', 'unit1', '--out', out], { encoding: 'utf8' });
  chmodSync(dir, 0o755);
  assert.notEqual(r.status, 0, 'the write cannot have succeeded');
  assert.equal(readFileSync(out, 'utf8'), 'OLD\n', 'the old bundle is untouched');
});

test('plan-stubs --write writes course.json through a temporary file', { skip: skipRoot }, async (t) => {
  const { main } = await import('../plan-stubs.mjs');
  const root = tempDir(t);
  cpSync(CONTENT_ROOT, root, { recursive: true });
  // The course loses its last planned stub (file and listing), so --write must write course.json again.
  const file = join(root, 'course.json');
  const outline = JSON.parse(readFileSync(file, 'utf8'));
  rmSync(join(root, 'modules', `${outline.units.at(-1).entries.pop()}.json`));
  const before = JSON.stringify(outline, null, 2) + '\n';
  writeFileSync(file, before);
  chmodSync(root, 0o555);
  t.mock.method(console, 'log', () => {});
  t.mock.method(console, 'error', () => {});
  let failed = false;
  try {
    failed = main(['--write', '--root', root]) !== 0;
  } catch {
    failed = true;
  }
  chmodSync(root, 0o755);
  assert.ok(failed, 'the write cannot have succeeded');
  assert.equal(readFileSync(file, 'utf8'), before, 'course.json is untouched');
});

test('two writers to one file never collide and never leave half a file', async (t) => {
  const dir = tempDir(t);
  const file = join(dir, 'shared.txt');
  const child = (letter) => new Promise((resolve) => {
    const code = [
      `import { writeFileAtomic } from ${JSON.stringify(MODULE)};`,
      `for (let i = 0; i < 200; i++) writeFileAtomic(${JSON.stringify(file)}, ${JSON.stringify(letter)}.repeat(1e5) + '\\n');`,
    ].join('\n');
    const p = spawn('node', ['--input-type=module', '-e', code], { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => { err += d; });
    p.on('close', (status) => resolve({ status, err }));
  });
  const results = await Promise.all([child('a'), child('b')]);
  for (const r of results) assert.equal(r.status, 0, r.err);
  assert.equal(statSync(file).size, 100001);
  assert.match(readFileSync(file, 'utf8'), /^(a{100000}|b{100000})\n$/);
  assert.deepEqual(readdirSync(dir).filter((n) => n.endsWith('.tmp')), []);
});

test('temp names are unique per call', () => {
  assert.notEqual(tempNameFor('/x/a.json'), tempNameFor('/x/a.json'));
  assert.match(tempNameFor('/x/a.json'), /^\/x\/\.a\.json\.\d+\.[0-9a-f]{12}\.tmp$/);
});
