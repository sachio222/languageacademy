// Task 9, fix round 2: since Task 10 renamed course-map.corrections.json over course-map.json, teaching lives only in
// the module files. Before Task 10, `pnpm graph:extract` wrote teachesWords into the course map; a map that still holds
// them stays split, and neither a normal migration run nor --force may empty a teaches or tests, or touch a correction
// key.
// It reads live ids from main through a git worktree, so it needs main's history (CI: fetch-depth 0).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../../../', import.meta.url));
const RUN = join(REPO, 'scripts/content/migrate/run.mjs');
const hasMain = ['origin/main', 'main'].some((ref) => {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], { cwd: REPO, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});
const skip = !hasMain && 'no main in this checkout';
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

let root;
let graph;
let work;
let declared; // module_key -> { teaches, tests } as committed
let courseMapText;
const FR = () => join(graph, 'languages', 'fr');
const run = (...args) => {
  const r = spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, ...args, '--root', root, '--graph', graph, '--tmp', work], { cwd: REPO, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  return r;
};
const declarations = () =>
  Object.fromEntries(
    readdirSync(join(root, 'modules'))
      .sort()
      .map((f) => readJson(join(root, 'modules', f)))
      .map((m) => [m.module_key, { teaches: m.teaches, tests: m.tests }]),
  );

before(() => {
  if (skip) return;
  root = mkdtempSync(join(tmpdir(), 'la-split-'));
  graph = mkdtempSync(join(tmpdir(), 'la-split-graph-'));
  work = mkdtempSync(join(tmpdir(), 'la-split-wt-'));
  cpSync(join(REPO, 'content/fr'), root, { recursive: true });
  cpSync(join(REPO, 'curriculum-graph'), graph, { recursive: true });
  declared = declarations();
  // The committed (renamed) map, plus what `pnpm graph:extract` wrote before Task 10: teachesWords for each module.
  const original = readJson(join(REPO, 'scripts/content/test/fixtures/course-map-before-split.json'));
  const map = readJson(join(FR(), 'course-map.json'));
  for (const [key, e] of Object.entries(original)) if (e.teachesWords) map[key] = { ...(map[key] ?? {}), teachesWords: e.teachesWords };
  courseMapText = JSON.stringify(map, null, 2) + '\n';
  writeFileSync(join(FR(), 'course-map.json'), courseMapText);
});
after(() => {
  for (const d of [root, graph, work]) if (d) rmSync(d, { recursive: true, force: true });
});

test('after the rename and graph:extract, a normal run keeps every teaches, tests and correction key', { skip }, () => {
  const r = run();
  assert.match(r.stdout, /course map: split already/);
  assert.deepEqual(declarations(), declared);
  assert.ok(Object.values(declared).filter((d) => d.teaches).length === 102 && Object.values(declared).filter((d) => d.tests).length === 22);
  // The corrections stay where the rename put them, keys and all; no second corrections file appears.
  assert.equal(readFileSync(join(FR(), 'course-map.json'), 'utf8'), courseMapText);
  assert.ok(!existsSync(join(FR(), 'course-map.corrections.json')));
});

test('after the rename, --force keeps every teaches and tests', { skip }, () => {
  run('--force');
  assert.deepEqual(declarations(), declared);
  assert.equal(readFileSync(join(FR(), 'course-map.json'), 'utf8'), courseMapText);
});

test('a split map that gains a screen again is refused, not split over the declarations', { skip }, () => {
  const map = JSON.parse(courseMapText);
  map['2024-01-19-questions-help'] = { ...(map['2024-01-19-questions-help'] ?? {}), screen: 'src/components/QuestionsHelp.jsx' };
  writeFileSync(join(FR(), 'course-map.json'), JSON.stringify(map, null, 2) + '\n');
  try {
    const r = spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, '--root', root, '--graph', graph, '--tmp', work], { cwd: REPO, encoding: 'utf8' });
    assert.equal(r.status, 1, r.stdout + r.stderr);
    assert.match(r.stderr, /course_map_resplit .*no teachesConstructions or tests, while 124 module files already declare/);
    assert.deepEqual(declarations(), declared);
  } finally {
    writeFileSync(join(FR(), 'course-map.json'), courseMapText);
  }
});
