// Where the real bundle stops (spec 7; final review I7): before the first unit that holds a planned module or a reading
// whose story has no art yet, so a written reading waiting for its story never fails CI and never publishes. The
// written course, checked beside it, reports that reading's story_missing as a warning.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCourse, CONTENT_ROOT } from '../load.mjs';
import { buildBundleWithReport } from '../bundle.mjs';
import { releaseProblems } from '../release-checks.mjs';
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

test('a written reading with no story art: the real bundle stops before its unit, and --check passes', async (t) => {
  const root = copy(t);
  writeUnit12(root, { story: false });
  const course = loadCourse({ root });
  const { bundle, report } = buildBundleWithReport(course, await loadBundleSources({ root }));
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
