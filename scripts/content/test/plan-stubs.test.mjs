// Task 17: the course plan's modules for Units 12 to 29 as planned stubs (status planned) in the outline, so writers
// fill them in unit by unit while nothing planned publishes or teaches.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadCourse, readContent, CONTENT_ROOT, REPO_ROOT } from '../load.mjs';
import { assembleCourse } from '../assemble.mjs';
import { defaultCheckAnswer } from '../passable.mjs';
import { validateModule, hasPositionWord } from '../schema/module.mjs';
import { buildBundleWithReport } from '../bundle.mjs';
import { loadBundleSources } from '../bundle-sources.mjs';
import { planToStubs, applyStubs, isPlanStub, planGraph, DEFAULT_PLAN_FILE, SHORT_KEY } from '../plan-stubs.mjs';
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
            { kind: 'reading', title: 'Reading 2 - Le Chat', words: [{ id: 'fr:lex:chat', lemma: 'chat' }], reading: { draft: 'reading-2-draft.js' } },
            { kind: 'practice', title: 'Unit 2 Practice - Cats in context' },
            { kind: 'exam', title: 'Unit 2 Exam - All about cats' },
          ],
        },
        {
          unit: 3,
          title: 'Joining sentences',
          modules: [
            { kind: 'lesson', title: 'qui after a noun (la fille qui parle)', adds: ['fr:cx:relative.qui'], words: [] },
            { kind: 'help', title: 'Guide: Which relative? (qui, que)', words: [] },
            {
              kind: 'lesson',
              title: 'Getting things done: emergencies',
              words: [{ id: 'fr:lex:urgence', lemma: 'urgence' }],
              alreadyKnown: ['feu'],
              newHeadwords: ['pompier', 'gyrophare'],
              phrases: ['Au secours !', 'Il y a le feu !'],
            },
            { kind: 'lesson', title: 'Pets (A1)', words: [{ id: 'fr:lex:chien', lemma: 'chien' }] },
            { kind: 'lesson', title: 'Pets (A1)', words: [{ id: 'fr:lex:nope', lemma: 'nope' }], adds: ['fr:cx:nope'] },
            { kind: 'reading', title: 'Reading 3', words: [], reading: { theme: 'A long pitch.', mustUse: ['fr:cx:relative.qui'] } },
            { kind: 'practice', title: 'Unit 3 Practice' },
            { kind: 'exam', title: 'Unit 3 Exam' },
          ],
        },
      ],
    },
    {
      version: 2,
      title: 'V2',
      units: [{ unit: 4, title: 'Course completion: French B1', completion: true, modules: [{ kind: 'practice', title: 'Review 1: the words by theme' }, { kind: 'exam', title: 'Final exam against the B1 core' }] }],
    },
    { version: 3, title: 'B2 outline (proposal)', proposal: true, grammar: [] },
  ],
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
  registry: new Set(['2024-01-01-hello', '2024-01-02-cats', 'pets-a1', 'unit3-exam']),
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

const small = planToStubs(PLAN, COURSE, { graph: GRAPH });
const byTitle = (r, plan) => r.modules[r.report.modules.findIndex((m) => m.plan_title === plan)];

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

test('small plan: keys are short slugs from the title (the unit key when the title is only the unit name), unique against the registry and each other', () => {
  const keys = small.modules.map((m) => m.module_key);
  assert.deepEqual(keys, [
    'reading-le-chat',
    'cats-in-context-practice',
    'unit2-exam',
    'qui-after-a-noun',
    'which-relative-guide',
    'getting-things-done-emergencies',
    'pets-a1-2',
    'pets-a1-3',
    'unit3-reading',
    'unit3-practice',
    'unit3-exam-2',
    'review-the-words-by-theme',
    'unit4-exam',
  ]);
  for (const k of keys) assert.match(k, SHORT_KEY);
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
      ['getting-things-done-emergencies', 'newHeadwords', 'gyrophare'],
      ['pets-a1-3', 'words', 'fr:lex:nope'],
      ['pets-a1-3', 'adds', 'fr:cx:nope'],
    ],
  );
});

test('small plan: the unit the course has gains its ending; later units take the next unused keys', () => {
  assert.deepEqual(
    small.units.map((u) => [u.unit_key, u.name, u.existing, u.entries.length]),
    [
      ['unit2', 'Second', true, 3],
      ['unit3', 'Joining sentences', false, 8],
      ['unit4', 'Course completion: French B1', false, 2],
    ],
  );
  const outline = applyStubs(OUTLINE, small.units, new Set());
  assert.deepEqual(outline.units[1].entries, ['2024-01-02-cats', 'reading-le-chat', 'cats-in-context-practice', 'unit2-exam']);
  assert.deepEqual(Object.keys(outline.units[2]), ['unit_key', 'name', 'entries']);
  assert.deepEqual(outline.units.map((u) => u.unit_key), ['unit1', 'unit2', 'unit3', 'unit4']);
});

test('small plan: a rerun over its own stubs gives the same keys and outline', () => {
  const outline = applyStubs(OUTLINE, small.units, new Set());
  const stubs = new Map(small.modules.map((m) => [m.module_key, m]));
  const course = {
    units: outline.units.map((u) => ({ unit_key: u.unit_key, name: u.name, modules: u.entries.map((k) => stubs.get(k) ?? { module_key: k, status: 'written' }) })),
    registry: new Set([...COURSE.registry, ...stubs.keys()]),
  };
  const again = planToStubs(PLAN, course, { graph: GRAPH });
  assert.deepEqual(again.modules, small.modules);
  assert.deepEqual(again.report.new_on_rerun, []);
  assert.deepEqual(applyStubs(outline, again.units, new Set(stubs.keys())), outline);
  // Once a writer has written a stub, a rerun would bring its plan module back under a new key: that is reported.
  const written = { ...stubs.get('unit3-reading'), status: 'written' };
  const after = { ...course, units: course.units.map((u) => ({ ...u, modules: u.modules.map((m) => (m.module_key === 'unit3-reading' ? written : m)) })) };
  assert.deepEqual(planToStubs(PLAN, after, { graph: GRAPH }).report.new_on_rerun, ['unit3-reading-2']);
});

/* ---------- the committed course ---------- */

const course = loadCourse();
const planned = [...course.modules.values()].filter((m) => m.status === 'planned');
const hasPlan = existsSync(DEFAULT_PLAN_FILE);

test('stubs for every planned module', { skip: !hasPlan && `the course plan is not on this machine (${DEFAULT_PLAN_FILE})` }, () => {
  const plan = JSON.parse(readFileSync(DEFAULT_PLAN_FILE, 'utf8'));
  const want = plan.versions.slice(0, 2).reduce((n, v) => n + v.units.reduce((k, u) => k + u.modules.length, 0), 0);
  assert.equal(want, 194);
  assert.equal(planned.length, want);
  // The committed stubs and outline are exactly what the script writes from the plan.
  const r = planToStubs(plan, course, { graph: planGraph() });
  assert.deepEqual(planned.map((m) => m.module_key), r.modules.map((m) => m.module_key));
  for (const m of r.modules) assert.deepEqual(JSON.parse(readFileSync(join(CONTENT_ROOT, 'modules', `${m.module_key}.json`), 'utf8')), m);
  const outline = JSON.parse(readFileSync(join(CONTENT_ROOT, 'course.json'), 'utf8'));
  assert.deepEqual(applyStubs(outline, r.units, new Set(planned.map((m) => m.module_key))), outline);
  assert.deepEqual(r.report.unresolved, []);
});

test('slugs unique and dateless', () => {
  assert.ok(planned.length > 0, 'the outline holds planned stubs');
  const keys = planned.map((m) => m.module_key);
  assert.equal(new Set(keys).size, keys.length);
  for (const k of keys) assert.match(k, SHORT_KEY);
  // Unique against every key the course had before the stubs, retired keys included.
  const written = new Set([...course.modules.values()].filter((m) => m.status !== 'planned').map((m) => m.module_key));
  for (const r of course.retired) written.add(r.module_key);
  for (const k of keys) assert.equal(written.has(k), false, k);
  for (const m of planned) {
    assert.ok(isPlanStub(m), m.module_key);
    if (m.title !== undefined) assert.equal(hasPositionWord(m.title), false, m.title);
    else assert.equal(m.kind, 'unit_exam', `${m.module_key} has no title`);
  }
});

test('Unit 12 gains its planned ending, and Units 13 to 29 follow it', () => {
  const keys = course.units.map((u) => u.unit_key);
  assert.deepEqual(keys.slice(11), Array.from({ length: 18 }, (_, i) => `unit${12 + i}`));
  const u12 = course.units[11].modules;
  assert.deepEqual(u12.slice(-3).map((m) => [m.kind, m.status]), [['reading', 'planned'], ['practice', 'planned'], ['unit_exam', 'planned']]);
  assert.equal(u12.filter((m) => m.status === 'planned').length, 3);
  assert.equal(u12[u12.length - 3].plan.draft, 'research/course-plan/reading-12-draft.js');
  assert.equal(u12[u12.length - 3].title, "Reading · {Les Questions d'Amélie}");
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
});

test('checker ignores planned', async () => {
  assert.ok(planned.length > 0, 'the outline holds planned stubs');
  // The same course with every planned module taken out of the files and the outline (and units left empty dropped).
  const { outlineText, files } = readContent(CONTENT_ROOT);
  const outline = JSON.parse(outlineText);
  const stubKeys = new Set(planned.map((m) => m.module_key));
  outline.units = outline.units.map((u) => ({ ...u, entries: u.entries.filter((k) => !stubKeys.has(k)) })).filter((u) => u.entries.length);
  const without = assembleCourse(outline, files.filter((f) => !stubKeys.has(f.file.replace(/^.*\//, '').replace(/\.json$/, ''))), { checkAnswer: defaultCheckAnswer });
  const a = await runCheck({ repoRoot: REPO_ROOT, lang: 'fr', content: course });
  const b = await runCheck({ repoRoot: REPO_ROOT, lang: 'fr', content: without });
  const sa = summarize(a.issues, a.stats);
  const sb = summarize(b.issues, b.stats);
  assert.deepEqual(sa.byRule, sb.byRule);
  assert.deepEqual([sa.errors, sa.warnings, sa.modulesWithErrors], [sb.errors, sb.warnings, sb.modulesWithErrors]);
  assert.deepEqual(a.stats, b.stats);
});
