// Task 8, spec 8.2 "Proof the live screens see the same lessons": every lesson today's lessonData.js builds
// (fixtures/golden-lessons.json, written by `node scripts/content/migrate/run.mjs golden`) is compared, field by field,
// with toLegacyLesson of its converted file. A difference passes only when fixtures/golden-allowed.json puts it in a
// class whose basis is a migration-report line of Tasks 6 and 7 (or a ledger ruling), and each class holds exactly the
// count it records, so a new difference fails until someone reads it and names its reason.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadCourse, CONTENT_ROOT } from '../load.mjs';
import { frenchSpans } from '../spans.mjs';
import { toLegacyLesson } from '../legacy/to-legacy-lesson.mjs';
import { compareLesson, classify, parseReport, describe, liveIdChecks } from '../legacy/golden.mjs';

const here = new URL('./fixtures/', import.meta.url);
const readJson = (u) => JSON.parse(readFileSync(u, 'utf8'));
const snapshot = readJson(new URL('golden-lessons.json', here));
const allowed = readJson(new URL('golden-allowed.json', here));
const liveIds = readJson(join(CONTENT_ROOT, 'legacy', 'live-ids.json'));
const report = parseReport(readFileSync(join(CONTENT_ROOT, 'migration-report.md'), 'utf8'));
const course = loadCourse();

// Every span text in a module: today's quotes around one are dropped before comparing (golden.mjs sameText).
function spansOf(mod) {
  const out = new Set();
  const walk = (v) => {
    if (typeof v === 'string') for (const s of frenchSpans(v)) out.add(s.trim());
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(mod);
  return out;
}

function run() {
  const diffs = [];
  const stats = { lessons: 0, fields: 0 };
  const seen = new Set();
  for (const live of snapshot) {
    const mod = course.modules.get(live.moduleKey);
    if (!mod) {
      diffs.push({ module_key: live.moduleKey, kind: null, path: '(lesson)', live: live.id, converted: undefined });
      continue;
    }
    if (mod.status === 'planned') continue;
    // A guide listed twice today (in its unit and again on the Reference shelf) is one lesson now, at its unit place.
    if (seen.has(live.moduleKey)) {
      diffs.push({ module_key: live.moduleKey, kind: mod.kind, path: '(shelf copy)', live: live.id, converted: undefined });
      continue;
    }
    seen.add(live.moduleKey);
    const conv = JSON.parse(JSON.stringify(toLegacyLesson(mod, { liveIds, course })));
    stats.lessons += 1;
    for (const d of compareLesson(live, conv, { spans: spansOf(mod), stats })) diffs.push({ module_key: live.moduleKey, kind: mod.kind, ...d });
  }
  for (const [key, mod] of course.modules)
    if (mod.status !== 'planned' && !seen.has(key)) diffs.push({ module_key: key, kind: mod.kind, path: '(lesson)', live: undefined, converted: key });
  return { diffs, stats, ...classify(diffs, allowed.classes, report, liveIdChecks(liveIds)) };
}

const result = run();

test('adapter shows the same lessons as today', () => {
  const { unexplained, stats } = result;
  console.log(`golden: ${stats.lessons} lessons, ${stats.fields} values compared, ${result.diffs.length} differences, ${unexplained.length} unexplained`);
  assert.equal(stats.lessons, 171, 'every converted module is compared with its live lesson');
  assert.deepEqual(unexplained.map(describe).slice(0, 50), [], `${unexplained.length} differences with no report line or ruling behind them`);
});

test('every allowed class holds exactly the differences it records', () => {
  const counts = Object.fromEntries([...result.byClass].map(([c, ds]) => [c, ds.length]));
  const recorded = Object.fromEntries(allowed.classes.map((c) => [c.class, c.count]));
  assert.deepEqual(counts, recorded);
});

test('every allowed class names its path pattern and its basis', () => {
  for (const c of allowed.classes) {
    assert.ok(c.paths?.length && c.paths.every((p) => typeof p === 'string' && p.startsWith('^')), `${c.class}: anchored path patterns`);
    // A whole field (^title$) is allowed only through a line pinned to it or tied to the value.
    assert.ok(c.paths.every((p) => !/^\^[a-zA-Z.]+\$$/.test(p.replace(/\\/g, '')) || c.basis.relation || c.basis.path || c.basis.data), `${c.class}: a whole field needs a relation to its report line`);
    assert.ok(typeof c.reason === 'string' && c.reason.length > 20, `${c.class}: reason`);
    assert.ok(c.basis.report || c.basis.ruling || c.basis.data, `${c.class}: a report line kind, a ledger ruling or a live-ids check`);
    if (c.basis.ruling) assert.ok(Array.isArray(c.basis.modules) && c.basis.modules.length, `${c.class}: a ruling names its modules`);
  }
});

test('a planted loss is caught', () => {
  // Drop one wrong answer and change one prompt in a lesson that compares clean: both must come out unexplained.
  const live = snapshot.find((l) => l.moduleKey === '2024-01-02-etre');
  const mod = course.modules.get(live.moduleKey);
  const conv = JSON.parse(JSON.stringify(toLegacyLesson(mod, { liveIds, course })));
  conv.exercises[0].wrongAnswers.pop();
  conv.exercises[1].prompt = 'something else';
  const diffs = compareLesson(live, conv, { spans: spansOf(mod) }).map((d) => ({ module_key: live.moduleKey, kind: mod.kind, ...d }));
  const { unexplained } = classify(diffs, allowed.classes, report, liveIdChecks(liveIds));
  assert.deepEqual(unexplained.map((d) => d.path).sort(), ['exercises[0].wrongAnswers[1]', 'exercises[1].prompt']);
});
