// Where the real bundle stops (spec 7; final review I7): before the first unit that holds a planned module or a reading
// whose story L does not have yet, so a written reading waiting for its story never fails CI and never publishes. The
// written course, checked beside it, reports that reading's story_missing as a warning. A story with text and no art
// (cover null, L d8714f1) is a story: it publishes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCourse, CONTENT_ROOT } from '../load.mjs';
import { buildBundleWithReport } from '../bundle.mjs';
import { diffBundles, releaseProblems } from '../release-checks.mjs';
import { loadBundleSources } from '../bundle-sources.mjs';
import { writeUnit12 } from './written-unit12.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const copy = (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-stop-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  return root;
};
const bundleCheck = (root) => spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', CLI, 'bundle', '--root', root, '--check'], { encoding: 'utf8', maxBuffer: 64 << 20 });

// The stop is one of two: a unit holding a stub (planned), or a fully written unit whose reading has no story in L yet
// (story_missing). The pipeline approves a unit before L's story exists, so no unit could reach approved if the test
// demanded the first.
const assertValidStop = (course, report) => {
  const unit = course.units.find((u) => u.unit_key === report.units_stopped_at);
  assert.ok(unit, `stopped at a unit of the course: ${report.units_stopped_at}`);
  assert.ok(report.stopped_because, 'the bundle stopped');
  assert.ok(['planned', 'story_missing'].includes(report.stopped_because.code), report.stopped_because.code);
  if (report.stopped_because.code === 'story_missing') assert.ok(unit.modules.every((m) => m.status === 'written'), 'story_missing stops only a fully written unit');
};

test('the real bundle stops at a unit holding a stub, or at a fully written unit whose reading has no story', async () => {
  const course = loadCourse();
  const { bundle, report } = buildBundleWithReport(course, await loadBundleSources());
  assertValidStop(course, report);
  // Today (L cf55739): Reading 12's story is in L as text only, so Units 1 to 12 publish and the stop is Unit 13's stubs.
  assert.deepEqual(bundle.units.map((u) => u.unit_key), Array.from({ length: 12 }, (_, i) => `unit${i + 1}`));
  assert.equal(report.units_stopped_at, 'unit13');
  assert.equal(report.stopped_because.code, 'planned');
  assert.deepEqual(bundle.stories.find((s) => s.story_id === 'reading12')?.cover, null, 'a text-only story has cover null');
});

test('a written reading with no story in L: the real bundle stops before its unit, and --check passes', async (t) => {
  const root = copy(t);
  writeUnit12(root, { story: false });
  const course = loadCourse({ root });
  const { bundle, report } = buildBundleWithReport(course, await loadBundleSources({ root }));
  assertValidStop(course, report);
  assert.equal(report.units_stopped_at, 'unit12');
  assert.deepEqual(report.stopped_because, { code: 'story_missing', module_key: 'unit12-reading', story_id: 'reading12' });
  assert.equal(bundle.entries.some((e) => e.unit_key === 'unit12'), false);
  const r = bundleCheck(root);
  assert.equal(r.status, 0, r.stdout.slice(-1500) + r.stderr.slice(-1500));
  assert.match(r.stdout, /stopped before unit12: unit12-reading names story reading12, which has no record in legacy\/l-sources\.json/);
  assert.match(r.stderr, /written course: warning story_missing unit12-reading/);
});

test('with its story added, the reading publishes and the bundle stops at the next unready unit', async (t) => {
  const root = copy(t);
  writeUnit12(root, { story: true });
  const course = loadCourse({ root });
  const { bundle, report } = buildBundleWithReport(course, await loadBundleSources({ root }));
  const firstPlanned = course.units.find((u) => u.modules.some((m) => m.status === 'planned'));
  assert.equal(report.units_stopped_at, firstPlanned.unit_key);
  assert.equal(report.stopped_because.code, 'planned');
  assert.ok(bundle.entries.some((e) => e.module_key === 'unit12-reading'));
  assert.deepEqual(releaseProblems(bundle, null), []);
  const r = bundleCheck(root);
  assert.equal(r.status, 0, r.stdout.slice(-1500) + r.stderr.slice(-1500));
});

test('story_missing is a warning only in units the real bundle does not reach', async (t) => {
  const root = copy(t);
  writeUnit12(root, { story: false });
  const written = buildBundleWithReport(loadCourse({ root, planned: false }), { ...(await loadBundleSources({ root })), stopAtUnready: false }).bundle;
  const as = (warnUnits) => releaseProblems(written, null, { warnUnits }).filter((p) => p.code === 'story_missing').map((p) => [p.module_key, p.severity]);
  assert.deepEqual(as(new Set()), [['unit12-reading', 'error']]);
  assert.deepEqual(as(new Set(['unit12'])), [['unit12-reading', 'warning']]);
});

test('bundle --check compares with the last release (legacy/last-release.json): an item id that changed its answer fails', async (t) => {
  const root = copy(t);
  // The keys that already differ from the last release (a recorded hand fix, a merged live fix): the edit below adds
  // its own module to them and nothing else.
  const previous = JSON.parse(readFileSync(join(root, 'legacy', 'last-release.json'), 'utf8'));
  const before = diffBundles(buildBundleWithReport(loadCourse({ root }), { ...(await loadBundleSources({ root })), previous }).bundle, previous).changed;
  // A writer reuses an item id for another question (C-ID-4: a changed meaning needs a new id).
  const file = join(root, 'modules', '2024-01-02-etre.json');
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  const item = mod.items.find((i) => typeof i.answer === 'string');
  item.answer = 'nous sommes ici';
  delete item.accept;
  delete item.mistakes;
  writeFileSync(file, JSON.stringify(mod, null, 2) + '\n');
  const r = bundleCheck(root);
  assert.equal(r.status, 1, 'a reused item id passed');
  assert.match(r.stderr, new RegExp(`error item_id_reused 2024-01-02-etre ${item.id} keeps its id`));
  const listed = /^changed (\d+)(?:: (.*))?$/m.exec(r.stdout);
  assert.ok(listed, 'the changed keys against the last release are listed');
  const keys = listed[2] ? listed[2].split(', ') : [];
  assert.equal(Number(listed[1]), keys.length);
  assert.deepEqual([...keys].sort(), [...new Set([...before, '2024-01-02-etre'])].sort());
});

test('the committed last release is a la-bundle@1 bundle the current content matches', async () => {
  const last = JSON.parse(readFileSync(join(CONTENT_ROOT, 'legacy', 'last-release.json'), 'utf8'));
  const { bundleHash } = await import('../bundle.mjs');
  assert.equal(last.schema, 'la-bundle@1');
  const { bundle } = buildBundleWithReport(loadCourse(), await loadBundleSources());
  assert.deepEqual(releaseProblems(bundle, last), []);
  // The hash the release notes name (content:bundle prints it).
  assert.match(bundleHash(last), /^[0-9a-f]{64}$/);
});
