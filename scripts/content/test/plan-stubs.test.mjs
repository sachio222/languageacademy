// Task 17: the course plan's modules for Units 12 to 29 as planned stubs (status planned) in the outline, so writers
// fill them in unit by unit while nothing planned publishes or teaches. Keys come from content/fr/plan-keys.json.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCourse, CONTENT_ROOT, REPO_ROOT } from '../load.mjs';
import { validateModule, hasPositionWord } from '../schema/module.mjs';
import { buildBundleWithReport } from '../bundle.mjs';
import { loadBundleSources } from '../bundle-sources.mjs';
import { planToStubs, applyStubs, isPlanStub, planGraph, readPlanKeys, planKeyList, main, DEFAULT_PLAN_FILE, SHORT_KEY, COUNTER_END } from '../plan-stubs.mjs';
import { runCheck } from '../../graph/check.mjs';
import { summarize } from '../../graph/report.mjs';

/* ---------- planToStubs on a small plan ---------- */

const PLAN = {
  versions: [
    {
      version: 1,
      title: 'V1',
      units: [
        {
          unit: 2,
          title: 'Second (completion)',
          modules: [
            { n: 1, kind: 'reading', title: 'Reading 2 - Le Chat', words: [{ id: 'fr:lex:chat', lemma: 'chat' }], reading: { draft: 'reading-2-draft.js' } },
            { n: 2, kind: 'practice', title: 'Unit 2 Practice - Cats in context' },
            { n: 3, kind: 'exam', title: 'Unit 2 Exam - All about cats' },
          ],
        },
        {
          unit: 3,
          title: 'Joining sentences',
          modules: [
            { n: 4, kind: 'lesson', title: 'qui after a noun (la fille qui parle)', adds: ['fr:cx:relative.qui'], words: [] },
            { n: 5, kind: 'help', title: 'Guide: Which relative? (qui, que)', words: [] },
            {
              n: 6,
              kind: 'lesson',
              title: 'Getting things done: emergencies',
              words: [{ id: 'fr:lex:urgence', lemma: 'urgence' }],
              alreadyKnown: ['feu'],
              newHeadwords: ['pompier', 'gyrophare'],
              phrases: ['Au secours !', 'Il y a le feu !'],
            },
            { n: 7, kind: 'lesson', title: 'Pets (A1)', themeIds: ['pets'], words: [{ id: 'fr:lex:chien', lemma: 'chien' }] },
            { n: 8, kind: 'lesson', title: 'Pets (A1)', themeIds: ['pets'], words: [{ id: 'fr:lex:nope', lemma: 'nope' }], adds: ['fr:cx:nope'] },
            { n: 9, kind: 'reading', title: 'Reading 3', words: [], reading: { theme: 'A long pitch.', mustUse: ['fr:cx:relative.qui'] } },
            { n: 10, kind: 'practice', title: 'Unit 3 Practice' },
            { n: 11, kind: 'exam', title: 'Unit 3 Exam' },
          ],
        },
      ],
    },
    {
      version: 2,
      title: 'V2',
      units: [{ unit: 4, title: 'Course completion: French B1', completion: true, modules: [{ n: 12, kind: 'practice', title: 'Review 1: the words by theme' }, { n: 13, kind: 'exam', title: 'Final exam against the B1 core' }] }],
    },
    { version: 3, title: 'B2 outline (proposal)', proposal: true, grammar: [] },
  ],
};
const KEYS = {
  source: 'plan.json',
  versions: {
    1: { 1: 'reading-le-chat', 2: 'unit2-practice', 3: 'unit2-exam', 4: 'qui-after-a-noun', 5: 'which-relative-guide', 6: 'emergencies', 7: 'pets-chien', 8: 'pets-nope', 9: 'unit3-reading', 10: 'unit3-practice', 11: 'unit3-exam' },
    2: { 12: 'review-words-b1', 13: 'unit4-exam' },
  },
};
const GRAPH = {
  constructions: new Set(['fr:cx:relative.qui', 'fr:cx:chunk.au-secours']),
  words: new Set(['fr:lex:chat', 'fr:lex:urgence', 'fr:lex:pompier', 'fr:lex:chien', 'fr:lex:feu']),
  lemmas: new Map([['pompier', ['fr:lex:pompier']], ['feu', ['fr:lex:feu']]]),
  chunks: [{ id: 'fr:cx:chunk.au-secours', examples: ['Au secours !', 'Au secours, aidez-moi !'] }],
};
const COURSE = {
  units: [
    { unit_key: 'unit1', name: 'Essentials', modules: [{ module_key: '2024-01-01-hello', status: 'written' }] },
    { unit_key: 'unit2', name: 'Second', modules: [{ module_key: '2024-01-02-cats', status: 'written' }] },
  ],
  retired: [{ module_key: 'old-cats', reason: 'merged', replaced_by: '2024-01-02-cats' }],
};
const OUTLINE = {
  schema: 'la-course@1',
  language: 'fr',
  native: 'en',
  units: [
    { unit_key: 'unit1', name: 'Essentials', entries: ['2024-01-01-hello'] },
    { unit_key: 'unit2', name: 'Second', entries: ['2024-01-02-cats'] },
  ],
  shelf: { pages: [], opens_words: [] },
  retired: [],
};

const small = planToStubs(PLAN, COURSE, { graph: GRAPH, keys: KEYS });
const byTitle = (r, plan) => r.modules[r.report.modules.findIndex((m) => m.plan_title === plan)];
const withKeys = (edit) => {
  const k = structuredClone(KEYS);
  edit(k.versions);
  return k;
};
// The course after a run: the outline with the stubs listed, the stubs as its modules (or as written modules).
const courseAfter = (result, outline, status = () => 'planned') => {
  const stubs = new Map(result.modules.map((m) => [m.module_key, m]));
  return {
    units: outline.units.map((u) => ({
      unit_key: u.unit_key,
      name: u.name,
      modules: u.entries.map((k) => (stubs.has(k) ? { ...stubs.get(k), status: status(k) } : { module_key: k, status: 'written' })),
    })),
    retired: COURSE.retired,
  };
};

test('small plan: one stub per module of versions 1 and 2, none of the proposal', () => {
  assert.equal(small.modules.length, 13);
  for (const m of small.modules) {
    assert.equal(m.schema, 'la-module@1');
    assert.equal(m.status, 'planned');
    assert.equal(m.plan.source, 'plan.json');
    assert.deepEqual(validateModule(m, { file: `${m.module_key}.json`, unitIndex: 3, graphIds: GRAPH }), [], m.module_key);
  }
  assert.deepEqual(
    small.modules.map((m) => m.kind),
    ['reading', 'practice', 'unit_exam', 'lesson', 'guide', 'lesson', 'lesson', 'lesson', 'reading', 'practice', 'unit_exam', 'practice', 'unit_exam'],
  );
});

test('small plan: keys come only from the key map, and a bad map stops the run', () => {
  assert.deepEqual(small.modules.map((m) => m.module_key), planKeyList(KEYS));
  const run = (keys) => () => planToStubs(PLAN, COURSE, { graph: GRAPH, keys });
  assert.throws(run(withKeys((v) => delete v[1][4])), /module 4 .* has no key/);
  assert.throws(run(withKeys((v) => (v[1][8] = 'pets-chien'))), /given to two plan modules/);
  assert.throws(run(withKeys((v) => (v[1][8] = 'pets-a1-2'))), /without a counter/);
  assert.throws(run(withKeys((v) => (v[1][8] = 'Pets'))), /not a short slug/);
  assert.throws(run(withKeys((v) => (v[1][8] = 'old-cats'))), /retired key/);
  assert.throws(run(withKeys((v) => (v[2][99] = 'nothing-here'))), /keys for no plan module: nothing-here/);
  assert.throws(() => planToStubs(PLAN, COURSE, { graph: GRAPH }), /needs the key map/);
});

test('small plan: position words leave the titles, and every change is reported', () => {
  assert.equal(byTitle(small, 'Reading 2 - Le Chat').title, 'Reading · {Le Chat}');
  assert.equal(byTitle(small, 'Unit 2 Practice - Cats in context').title, 'Practice · Cats in context');
  assert.equal('title' in byTitle(small, 'Unit 2 Exam - All about cats'), false);
  assert.equal(byTitle(small, 'Reading 3').title, 'Reading · Joining sentences');
  assert.equal(byTitle(small, 'Unit 3 Practice').title, 'Practice · Joining sentences');
  assert.equal(byTitle(small, 'Review 1: the words by theme').title, 'Review · The words by theme');
  assert.equal('title' in byTitle(small, 'Final exam against the B1 core'), false);
  assert.equal(byTitle(small, 'qui after a noun (la fille qui parle)').title, 'qui after a noun (la fille qui parle)');
  for (const m of small.modules) if (m.title) assert.equal(hasPositionWord(m.title), false, m.title);
  assert.deepEqual(
    small.report.titles_changed.map((c) => [c.from, c.to]),
    [
      ['Reading 2 - Le Chat', 'Reading · {Le Chat}'],
      ['Unit 2 Practice - Cats in context', 'Practice · Cats in context'],
      ['Unit 2 Exam - All about cats', null],
      ['Reading 3', 'Reading · Joining sentences'],
      ['Unit 3 Practice', 'Practice · Joining sentences'],
      ['Unit 3 Exam', null],
      ['Review 1: the words by theme', 'Review · The words by theme'],
      ['Final exam against the B1 core', null],
    ],
  );
});

test("small plan: a unit exam's dropped subtitle and a reading's theme brief go into plan.note", () => {
  assert.equal(byTitle(small, 'Unit 2 Exam - All about cats').plan.note, 'All about cats');
  assert.equal(byTitle(small, 'Final exam against the B1 core').plan.note, 'Final exam against the B1 core');
  assert.equal(byTitle(small, 'Reading 3').plan.note, 'A long pitch.');
  for (const t of ['Unit 3 Exam', 'Reading 2 - Le Chat', 'Unit 3 Practice', 'Pets (A1)']) assert.equal('note' in byTitle(small, t).plan, false, t);
});

test("small plan: words and constructions are the plan's graph ids; an id that does not resolve is reported, not written", () => {
  assert.deepEqual(byTitle(small, 'Reading 2 - Le Chat').plan, { words: ['fr:lex:chat'], constructions: [], source: 'plan.json', draft: 'research/course-plan/reading-2-draft.js' });
  assert.deepEqual(byTitle(small, 'qui after a noun (la fille qui parle)').plan.constructions, ['fr:cx:relative.qui']);
  assert.deepEqual(byTitle(small, 'Reading 3').plan.constructions, ['fr:cx:relative.qui']);
  // Getting things done: new headwords by lemma, phrases the graph holds as fixed phrases; known words are not retaught.
  const gtd = byTitle(small, 'Getting things done: emergencies');
  assert.deepEqual(gtd.plan.words, ['fr:lex:urgence', 'fr:lex:pompier']);
  assert.deepEqual(gtd.plan.constructions, ['fr:cx:chunk.au-secours']);
  const pets = small.modules.filter((m) => m.module_key.startsWith('pets-'));
  assert.deepEqual(pets.map((m) => m.plan.words), [['fr:lex:chien'], []]);
  assert.deepEqual(pets[1].plan.constructions, []);
  assert.deepEqual(
    small.report.unresolved.map((u) => [u.module_key, u.field, u.value]),
    [
      ['emergencies', 'newHeadwords', 'gyrophare'],
      ['pets-nope', 'words', 'fr:lex:nope'],
      ['pets-nope', 'adds', 'fr:cx:nope'],
    ],
  );
});

test("small plan: the unit the course has gains its ending; a new unit's key is unit<plan unit>", () => {
  assert.deepEqual(
    small.units.map((u) => [u.unit_key, u.name, u.existing, u.entries.length]),
    [
      ['unit2', 'Second', true, 3],
      ['unit3', 'Joining sentences', false, 8],
      ['unit4', 'Course completion: French B1', false, 2],
    ],
  );
  const outline = applyStubs(OUTLINE, small.units);
  assert.deepEqual(outline.units[1].entries, ['2024-01-02-cats', 'reading-le-chat', 'unit2-practice', 'unit2-exam']);
  assert.deepEqual(Object.keys(outline.units[2]), ['unit_key', 'name', 'entries']);
  assert.deepEqual(outline.units.map((u) => u.unit_key), ['unit1', 'unit2', 'unit3', 'unit4']);
});

test('small plan: a rerun over its own stubs gives the same stubs and outline', () => {
  const outline = applyStubs(OUTLINE, small.units);
  const again = planToStubs(PLAN, courseAfter(small, outline), { graph: GRAPH, keys: KEYS });
  assert.deepEqual(again.modules, small.modules);
  assert.deepEqual(applyStubs(outline, again.units), outline);
});

test('small plan: a written stub is skipped, never duplicated; once every stub is written a run adds nothing', () => {
  const outline = applyStubs(OUTLINE, small.units);
  const one = planToStubs(PLAN, courseAfter(small, outline, (k) => (k === 'unit3-reading' ? 'written' : 'planned')), { graph: GRAPH, keys: KEYS });
  assert.deepEqual(one.report.written, ['unit3-reading']);
  assert.equal(one.modules.some((m) => m.module_key === 'unit3-reading'), false);
  assert.equal(one.modules.length, 12);
  assert.deepEqual(applyStubs(outline, one.units), outline);
  const all = planToStubs(PLAN, courseAfter(small, outline, () => 'written'), { graph: GRAPH, keys: KEYS });
  assert.deepEqual(all.modules, []);
  assert.equal(all.report.written.length, 13);
  assert.deepEqual(applyStubs(outline, all.units), outline);
  // A written module a writer moved to another unit stays there.
  const moved = structuredClone(outline);
  moved.units[2].entries = moved.units[2].entries.filter((k) => k !== 'pets-chien');
  moved.units[3].entries.push('pets-chien');
  assert.deepEqual(applyStubs(moved, all.units), moved);
});

test('small plan: a stub whose key the map no longer holds is taken out of the outline', () => {
  const outline = applyStubs(OUTLINE, small.units);
  const renamed = withKeys((v) => (v[1][7] = 'pets-dog'));
  const r = planToStubs(PLAN, courseAfter(small, outline), { graph: GRAPH, keys: renamed });
  const next = applyStubs(outline, r.units, new Set(['pets-chien']));
  assert.deepEqual(next.units[2].entries.slice(3, 5), ['pets-dog', 'pets-nope']);
  assert.equal(next.units.some((u) => u.entries.includes('pets-chien')), false);
});

test('small plan: a mapped key that is a Reference shelf page counts as written and gets no stub', () => {
  const shelf = { module_key: 'pets-chien', kind: 'reference', status: 'written' };
  const modules = new Map([...COURSE.units.flatMap((u) => u.modules.map((m) => [m.module_key, m])), ['pets-chien', shelf]]);
  const r = planToStubs(PLAN, { ...COURSE, modules }, { graph: GRAPH, keys: KEYS });
  assert.deepEqual(r.report.written, ['pets-chien']);
  assert.equal(r.modules.some((m) => m.module_key === 'pets-chien'), false);
});

/* ---------- the committed key map and course ---------- */

const course = loadCourse();
const planned = [...course.modules.values()].filter((m) => m.status === 'planned');
const keys = readPlanKeys();
const hasPlan = existsSync(DEFAULT_PLAN_FILE);
const needsPlan = { skip: !hasPlan && `the course plan is not on this machine (${DEFAULT_PLAN_FILE})` };

test('the key map: 194 short keys, unique, with no counter, each a planned stub or a written module, none retired', () => {
  const list = planKeyList(keys);
  assert.equal(list.length, 194);
  assert.equal(new Set(list).size, list.length);
  for (const k of list) {
    assert.match(k, SHORT_KEY);
    assert.doesNotMatch(k, COUNTER_END, k);
    assert.ok(course.modules.has(k), `${k} has no module file`);
  }
  const retired = new Set(course.retired.map((r) => r.module_key));
  for (const k of list) assert.equal(retired.has(k), false, k);
  // Nor is any key a Reference shelf page, and every key is short.
  const shelf = new Set(course.shelf.pages.map((m) => m.module_key));
  assert.ok(shelf.size > 0);
  for (const k of list) assert.equal(shelf.has(k), false, k);
  for (const k of list) assert.ok(k.length <= 30, `${k} is ${k.length} characters`);
  // Every planned stub is in the map: none was named any other way.
  for (const m of planned) assert.ok(list.includes(m.module_key), m.module_key);
});

test('stubs for every planned module', needsPlan, () => {
  const plan = JSON.parse(readFileSync(DEFAULT_PLAN_FILE, 'utf8'));
  const want = plan.versions.slice(0, 2).reduce((n, v) => n + v.units.reduce((k, u) => k + u.modules.length, 0), 0);
  assert.equal(want, 194);
  assert.equal(planned.length, want);
  // The committed stubs and outline are exactly what the script writes from the plan and the key map.
  const r = planToStubs(plan, course, { graph: planGraph(), keys });
  assert.deepEqual(planned.map((m) => m.module_key), r.modules.map((m) => m.module_key));
  for (const m of r.modules) assert.deepEqual(JSON.parse(readFileSync(join(CONTENT_ROOT, 'modules', `${m.module_key}.json`), 'utf8')), m);
  const outline = JSON.parse(readFileSync(join(CONTENT_ROOT, 'course.json'), 'utf8'));
  assert.deepEqual(applyStubs(outline, r.units), outline);
  assert.deepEqual(r.report.unresolved, []);
  // Every unit key is unit<plan unit>, and each unit lists its plan modules in plan order.
  assert.deepEqual(r.units.map((u) => u.unit_key), plan.versions.slice(0, 2).flatMap((v) => v.units.map((u) => `unit${u.unit}`)));
  for (const u of r.units) assert.deepEqual(course.units.find((x) => x.unit_key === u.unit_key).modules.map((m) => m.module_key).filter((k) => u.entries.includes(k)), u.entries, u.unit_key);
});

test("a vocabulary lesson's key names its first theme, its second theme when it has one, then its first word", needsPlan, () => {
  const plan = JSON.parse(readFileSync(DEFAULT_PLAN_FILE, 'utf8'));
  const fold = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  let multi = 0;
  for (const v of plan.versions.slice(0, 2))
    for (const u of v.units)
      for (const m of u.modules) {
        if (m.kind !== 'lesson' || !m.themeIds?.length || m.adds?.length || m.title.startsWith('Verbs:') || m.themeIds[0] === 'gtd') continue;
        const key = keys.versions[v.version][m.n];
        if (m.themeIds.length > 1) multi += 1;
        assert.equal(key, [...m.themeIds.slice(0, 2), fold(m.words[0].lemma)].join('-'), m.title);
      }
  assert.equal(multi, 20);
});

test('once every stub is written, a run adds nothing', needsPlan, () => {
  const plan = JSON.parse(readFileSync(DEFAULT_PLAN_FILE, 'utf8'));
  const written = (m) => ({ ...m, status: 'written' });
  const allWritten = {
    ...course,
    units: course.units.map((u) => ({ ...u, modules: u.modules.map(written) })),
    modules: new Map([...course.modules].map(([k, m]) => [k, written(m)])),
  };
  const r = planToStubs(plan, allWritten, { graph: planGraph(), keys });
  assert.deepEqual(r.modules, []);
  assert.equal(r.report.written.length, 194);
  const outline = JSON.parse(readFileSync(join(CONTENT_ROOT, 'course.json'), 'utf8'));
  assert.deepEqual(applyStubs(outline, r.units), outline);
});

test('--write refuses to overwrite a stub edited by hand, and --force overwrites it', needsPlan, (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-stubs-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(CONTENT_ROOT, root, { recursive: true });
  const file = join(root, 'modules', 'home-repairs.json');
  const original = readFileSync(file, 'utf8');
  const quiet = t.mock.method(console, 'log', () => {});
  t.mock.method(console, 'error', () => {});
  assert.equal(main(['--write', '--root', root]), 0, 'an untouched copy writes cleanly');
  assert.equal(readFileSync(file, 'utf8'), original);
  assert.ok(quiet.mock.calls.some((c) => c.arguments[0] === 'wrote 0 files'));
  const edited = JSON.stringify({ ...JSON.parse(original), title: 'Getting things done: when the boiler breaks' }, null, 2) + '\n';
  writeFileSync(file, edited);
  assert.equal(main(['--write', '--root', root]), 1);
  assert.equal(readFileSync(file, 'utf8'), edited, 'the hand edit is kept');
  assert.equal(main(['--check', '--root', root]), 1);
  assert.equal(main(['--write', '--force', '--root', root]), 0);
  assert.equal(readFileSync(file, 'utf8'), original);
  // A key that leaves the map: an untouched stub under the old key is removed by --write; a stale stub edited by hand
  // is kept unless --force.
  const keyFile = join(root, 'plan-keys.json');
  const map = JSON.parse(readFileSync(keyFile, 'utf8'));
  const rename = (from, to) => {
    for (const v of Object.values(map.versions)) for (const [n, k] of Object.entries(v)) if (k === from) v[n] = to;
    writeFileSync(keyFile, JSON.stringify(map, null, 2) + '\n');
  };
  const moved = join(root, 'modules', 'home-repairs-at-home.json');
  rename('home-repairs', 'home-repairs-at-home');
  writeFileSync(file, edited);
  assert.equal(main(['--write', '--root', root]), 1, 'an edited stale stub stops the run');
  assert.equal(readFileSync(file, 'utf8'), edited);
  assert.equal(existsSync(moved), false, 'nothing written');
  writeFileSync(file, original);
  assert.equal(main(['--write', '--root', root]), 0, 'an untouched stale stub is removed');
  assert.equal(existsSync(file), false);
  assert.equal(JSON.parse(readFileSync(moved, 'utf8')).title, JSON.parse(original).title);
  rename('home-repairs-at-home', 'home-repairs-new');
  writeFileSync(moved, edited.replace('"home-repairs"', '"home-repairs-at-home"'));
  assert.equal(main(['--write', '--root', root]), 1, 'an edited stale stub stops the run again');
  assert.equal(main(['--write', '--force', '--root', root]), 0, '--force removes an edited stale stub');
  assert.equal(existsSync(moved), false);
});

test('slugs unique and dateless', () => {
  assert.ok(planned.length > 0, 'the outline holds planned stubs');
  const list = planned.map((m) => m.module_key);
  assert.equal(new Set(list).size, list.length);
  for (const k of list) assert.match(k, SHORT_KEY);
  // Unique against every key the course had before the stubs, retired keys included.
  const written = new Set([...course.modules.values()].filter((m) => m.status !== 'planned').map((m) => m.module_key));
  for (const r of course.retired) written.add(r.module_key);
  for (const k of list) assert.equal(written.has(k), false, k);
  for (const m of planned) {
    assert.ok(isPlanStub(m), m.module_key);
    if (m.title !== undefined) assert.equal(hasPositionWord(m.title), false, m.title);
    else assert.equal(m.kind, 'unit_exam', `${m.module_key} has no title`);
  }
});

test('Unit 12 gains its planned ending, and Units 13 to 29 follow it', () => {
  assert.deepEqual(course.units.map((u) => u.unit_key).slice(11), Array.from({ length: 18 }, (_, i) => `unit${12 + i}`));
  const u12 = course.units[11].modules;
  assert.deepEqual(u12.slice(-3).map((m) => [m.module_key, m.kind, m.status]), [
    ['unit12-reading', 'reading', 'planned'],
    ['unit12-practice', 'practice', 'planned'],
    ['unit12-exam', 'unit_exam', 'planned'],
  ]);
  assert.equal(u12.filter((m) => m.status === 'planned').length, 3);
  assert.equal(u12.at(-3).plan.draft, 'research/course-plan/reading-12-draft.js');
  assert.equal(u12.at(-3).title, "Reading · {Les Questions d'Amélie}");
  assert.equal(u12.at(-1).plan.note, 'Ask about anything');
  assert.match(course.modules.get('unit17-reading').plan.note, /plumber/);
  for (const u of course.units.slice(12)) assert.ok(u.modules.every((m) => m.status === 'planned'), u.unit_key);
});

const sources = await loadBundleSources();

test('bundle stops at first incomplete unit', () => {
  const { bundle, report } = buildBundleWithReport(course, sources);
  assert.equal(report.units_stopped_at, 'unit12');
  assert.equal(bundle.units.at(-1).unit_key, 'unit11');
  const later = new Set(course.units.slice(11).map((u) => u.unit_key));
  assert.deepEqual(bundle.entries.filter((e) => later.has(e.unit_key)).map((e) => e.module_key), []);
  assert.equal(bundle.entries.some((e) => course.modules.get(e.module_key).status === 'planned'), false);
  assert.equal(bundle.entries.length, 157);
  // The Unit 1 sample is unchanged.
  const unit1 = buildBundleWithReport(course, { ...sources, units: ['unit1'] }).bundle;
  assert.equal(unit1.entries.length, 13);
  // The written course alone holds Unit 12's written modules (bundle.test.mjs runs the bundle tests on it).
  const written = buildBundleWithReport(loadCourse({ planned: false }), sources).bundle;
  assert.equal(written.entries.length, 169);
  assert.equal(written.units.at(-1).unit_key, 'unit12');
});

test('checker ignores planned', async () => {
  assert.ok(planned.length > 0, 'the outline holds planned stubs');
  const without = loadCourse({ planned: false });
  assert.equal(without.modules.size, course.modules.size - planned.length);
  const a = await runCheck({ repoRoot: REPO_ROOT, lang: 'fr', content: course });
  const b = await runCheck({ repoRoot: REPO_ROOT, lang: 'fr', content: without });
  const sa = summarize(a.issues, a.stats);
  const sb = summarize(b.issues, b.stats);
  assert.deepEqual(sa.byRule, sb.byRule);
  assert.deepEqual([sa.errors, sa.warnings, sa.modulesWithErrors], [sb.errors, sb.warnings, sb.modulesWithErrors]);
  assert.deepEqual(a.stats, b.stats);
});

test("a unit's own reading, practice set and exam are keyed <unit_key>-<kind> (spec 8.1)", () => {
  // Final readings and reviews that cover the whole course keep their own names; a unit's ordinary one does not.
  const own = { reading: /^Reading · /, practice: /^Practice · / };
  let n = 0;
  for (const u of course.units)
    for (const m of u.modules) {
      if (!planKeyList(keys).includes(m.module_key)) continue;
      const ordinary = m.kind === 'unit_exam' || (own[m.kind] && own[m.kind].test(m.title ?? ''));
      if (!ordinary) continue;
      n += 1;
      assert.equal(m.module_key, `${u.unit_key}-${m.kind === 'unit_exam' ? 'exam' : m.kind}`, `${m.module_key} (${m.title ?? 'exam'})`);
    }
  assert.ok(n > 40, `${n} unit readings, practice sets and exams`);
});
