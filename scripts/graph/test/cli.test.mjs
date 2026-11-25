// graph:check and graph:due as a writer meets them: content that does not load is listed problem by problem (as
// content:validate lists it), and graph:due names what a module should reuse, a course plan stub too.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_ROOT } from '../../content/load.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', CLI, ...args], { encoding: 'utf8', maxBuffer: 64 << 20 });
const copy = (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-graph-cli-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  return root;
};

test('graph:check on content that does not load lists each problem and a count, with no stack and no warnings dump', (t) => {
  const root = copy(t);
  const file = join(root, 'modules', '2024-01-02-etre.json');
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  delete mod.items[0].answer;
  writeFileSync(file, JSON.stringify(mod, null, 2) + '\n');
  const r = run('check', 'fr', '--content', root, '--budget');
  assert.equal(r.status, 1);
  const err = r.stderr.trim().split('\n');
  assert.match(err[0], /2024-01-02-etre\.json:items\[0\]\S* field_missing /, r.stderr.slice(0, 600));
  assert.ok(err.some((l) => /^\d+ problems?: /.test(l)), 'a count by code');
  assert.ok(err.some((l) => /pnpm content:validate/.test(l)), 'points to content:validate');
  assert.doesNotMatch(r.stderr, /^\s+at /m, 'no stack');
  assert.doesNotMatch(r.stdout + r.stderr, /^warning /m, 'no warnings dump');
  assert.doesNotMatch(r.stdout + r.stderr, /ContentError/);
});

test('graph:check --content checks the given folder, and graph:due names what a planned module should reuse', (t) => {
  const root = copy(t);
  const ok = run('check', 'fr', '--content', root);
  assert.match(ok.stdout, /^reuse-missed: \d+$/m);
  // unit12-reading is a stub today: due still finds it, by key, at its place in the course.
  const due = run('due', 'fr', 'unit12-reading', '--content', root);
  assert.equal(due.status, 0, due.stderr);
  assert.match(due.stdout, /^fr:cx:q\.qui-est-ce-qui\ttaught at \d+\tlast use \S+\twindow end \d+$/m);
  // Only windows the reading can still meet; the ones that closed earlier are a count.
  const ends = [...due.stdout.matchAll(/window end (\d+)$/gm)].map((x) => Number(x[1]));
  assert.ok(ends.length > 0 && ends.length < 20, `${ends.length} due`);
  assert.match(due.stdout, /^\d+ more closed before position \d+, so no use here meets them/m);
  assert.equal(run('due', 'fr', 'no-such-module', '--content', root).status, 2);
});
