import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { ruleLevels, levelReport } from '../rules/levels.mjs';
import { writeReportData, reportStats, percent } from '../report-data.mjs';
import { referenceNodes, referenceOpenNodes } from '../check.mjs';
import { readReferenceVocab, readReferenceModules } from '../course.mjs';
import { buildFormIndex } from '../fr/forms.mjs';
import { summarize, checkSummaryLines, renderFixList } from '../report.mjs';
import { functionReport } from '../functions.mjs';
import { makeModule, makeCtx } from './helpers.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');

// Fixture levels: most words A1; aller, hier and q.inversion A2; manger, travailler and avoir B1.
const CEFR = {
  'fr:lex:je': 'A1', 'fr:lex:tu': 'A1', 'fr:lex:il': 'A1', 'fr:lex:nous': 'A1', 'fr:lex:vous': 'A1',
  'fr:lex:parler': 'A1', 'fr:lex:bonjour': 'A1', 'fr:lex:cafe': 'A1', 'fr:lex:etre': 'A1', 'fr:lex:parc': 'A2',
  'fr:lex:aller': 'A2', 'fr:lex:hier': 'A2', 'fr:lex:manger': 'B1', 'fr:lex:travailler': 'B1', 'fr:lex:avoir': 'B1',
  'fr:cx:subject-pronouns': 'A1', 'fr:cx:verb.er.present': 'A1', 'fr:cx:q.inversion': 'A2',
};

const CORE = [
  { level: 'A1', lang: 'fr', status: 'draft', frozen: null, words: ['fr:lex:bonjour', 'fr:lex:cafe', 'fr:lex:je', 'fr:lex:parler'], constructions: ['fr:cx:subject-pronouns'] },
  { level: 'A2', lang: 'fr', status: 'draft', frozen: null, words: ['fr:lex:aller', 'fr:lex:hier'], constructions: ['fr:cx:q.inversion'] },
  { level: 'B1', lang: 'fr', status: 'draft', frozen: null, words: ['fr:lex:avoir', 'fr:lex:manger', 'fr:lex:travailler'], constructions: [] },
];

function levelGraph(extra = {}) {
  const nodes = new Map(base.nodes);
  for (const [id, cefr] of Object.entries(CEFR)) nodes.set(id, { ...nodes.get(id), id, cefr, cefrSource: 'agent: judgment' });
  const fresh = (list) => list.map((n) => nodes.get(n.id));
  return {
    ...base,
    nodes,
    headwords: fresh(base.headwords),
    constructions: fresh(base.constructions),
    paradigms: fresh(base.paradigms),
    settings: { ...base.settings, levelThreshold: 0.75 },
    coreLists: CORE,
    readingLimits: [],
    ...extra,
  };
}

// Unit 1: Hello (A1 words), Food (teaches the B1 word manger before any level is reached).
// Unit 2: a practice set, Going places (completes A2 and teaches the B1 travailler), Having (B1 avoir once A2 is reached).
const COURSE = [
  makeModule({ position: 1, title: 'Hello', unitId: 1, unitTitle: 'Unit 1: Basics' }),
  makeModule({ position: 2, title: 'Food', unitId: 1, unitTitle: 'Unit 1: Basics' }),
  makeModule({ position: 3, title: 'Practice', kind: 'practice', unitId: 2, unitTitle: 'Unit 2: A2 Moving' }),
  makeModule({ position: 4, title: 'Going places', unitId: 2, unitTitle: 'Unit 2: A2 Moving' }),
  makeModule({ position: 5, title: 'Having', unitId: 2, unitTitle: 'Unit 2: A2 Moving' }),
];
const COURSE_MAP = {
  m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'], teachesConstructions: ['fr:cx:subject-pronouns'] },
  m2: { teachesWords: ['fr:lex:cafe', 'fr:lex:manger'] },
  m4: { teachesWords: ['fr:lex:aller', 'fr:lex:hier', 'fr:lex:travailler'], teachesConstructions: ['fr:cx:q.inversion'] },
  m5: { teachesWords: ['fr:lex:avoir'] },
};

function ctxOf(extra = {}, course = COURSE, courseMap = COURSE_MAP) {
  return makeCtx({ graph: levelGraph({ courseMap, ...extra }), course });
}

test('module level is the highest level among the words, forms and constructions it teaches; unit level the highest module level', () => {
  const r = levelReport(ctxOf());
  assert.deepEqual(r.modules.map((m) => [m.position, m.moduleKey, m.unitId, m.title, m.computed]), [
    [1, 'm1', 1, 'Hello', 'A1'],
    [2, 'm2', 1, 'Food', 'B1'],
    [3, 'm3', 2, 'Practice', null],
    [4, 'm4', 2, 'Going places', 'B1'],
    [5, 'm5', 2, 'Having', 'B1'],
  ]);
  // computedCount: how many distinct nodes the unit teaches at its own level (manger; travailler and avoir).
  assert.deepEqual(r.units, [
    { unitId: 1, title: 'Unit 1: Basics', label: null, computed: 'B1', computedCount: 1, firstPosition: 1, lastPosition: 2 },
    { unitId: 2, title: 'Unit 2: A2 Moving', label: 'A2', computed: 'B1', computedCount: 2, firstPosition: 3, lastPosition: 5 },
  ]);
  // A form counts: the present of aller takes aller's level, A2.
  const formOnly = levelReport(ctxOf({}, [makeModule({ position: 1 })], { m1: { teachesWords: ['fr:form:aller.prs.1sg'] } }));
  assert.equal(formOnly.modules[0].computed, 'A2');
});

test('coverage counts core words and constructions taught by the end, and the position where each level is reached', () => {
  const r = levelReport(ctxOf());
  assert.deepEqual(Object.keys(r.levels), ['A1', 'A2', 'B1']);
  const { cumulative, ...a1 } = r.levels.A1;
  assert.deepEqual(a1, {
    coreWords: 4, coreConstructions: 1, taughtWords: 3, taughtConstructions: 1, reachedAt: 2,
    referenceWords: 0, cognateWords: 0, availableWords: 3, untaughtWords: ['fr:lex:parler'], untaughtReferenceWords: [], untaughtConstructions: [],
  });
  assert.deepEqual(cumulative, {
    coreWords: 4, coreConstructions: 1, taughtWords: 3, taughtConstructions: 1, reachedAt: 2, referenceWords: 0, cognateWords: 0, availableWords: 3,
  });
  assert.equal(r.levels.A2.reachedAt, 4);
  assert.equal(r.levels.A2.taughtWords, 2);
  assert.equal(r.levels.B1.taughtWords, 3);
  assert.equal(r.levels.B1.reachedAt, 5);
  // B1 without avoir: two of three core words (0.67) is below the 0.75 threshold of this fixture.
  const noAvoir = levelReport(ctxOf({}, COURSE, { ...COURSE_MAP, m5: {} }));
  assert.equal(noAvoir.levels.B1.taughtWords, 2);
  assert.equal(noAvoir.levels.B1.reachedAt, null);
  assert.deepEqual(noAvoir.levels.B1.untaughtWords, ['fr:lex:avoir']);
});

test('cumulative coverage counts each level together with the levels below it', () => {
  const r = levelReport(ctxOf());
  // Through A2: A1 and A2 lists, 6 words (5 taught, 4 of them by position 4) and 2 constructions.
  assert.deepEqual(r.levels.A2.cumulative, {
    coreWords: 6, coreConstructions: 2, taughtWords: 5, taughtConstructions: 2, reachedAt: 4, referenceWords: 0, cognateWords: 0, availableWords: 5,
  });
  assert.deepEqual(r.levels.B1.cumulative, {
    coreWords: 9, coreConstructions: 2, taughtWords: 8, taughtConstructions: 2, reachedAt: 4, referenceWords: 0, cognateWords: 0, availableWords: 8,
  });
  // Per-level fields are unchanged by the cumulative block.
  assert.equal(r.levels.A2.coreWords, 2);
});

test('percentages round to the nearest whole percent, and 100% shows only for a complete list', () => {
  assert.equal(percent(86, 681), 13);
  assert.equal(percent(369, 733), 50);
  assert.equal(percent(1999, 2000), 99);
  assert.equal(percent(4, 4), 100);
  assert.equal(percent(0, 0), 100);
});

test('a level needs every core construction as well as the share of core words', () => {
  const r = levelReport(ctxOf({}, COURSE, { ...COURSE_MAP, m4: { teachesWords: ['fr:lex:aller', 'fr:lex:hier'] } }));
  assert.equal(r.levels.A2.taughtWords, 2);
  assert.equal(r.levels.A2.reachedAt, null);
  assert.deepEqual(r.levels.A2.untaughtConstructions, ['fr:cx:q.inversion']);
});

test('the curve counts core words and constructions taught at each position', () => {
  const r = levelReport(ctxOf());
  const taught = (words, constructions) => ({ words, constructions, referenceWords: 0, cognateWords: 0, availableWords: words });
  assert.deepEqual(r.curve.map((c) => [c.position, c.A1, c.A2, c.B1]), [
    [1, taught(2, 1), taught(0, 0), taught(0, 0)],
    [2, taught(3, 1), taught(0, 0), taught(1, 0)],
    [3, taught(3, 1), taught(0, 0), taught(1, 0)],
    [4, taught(3, 1), taught(2, 1), taught(2, 0)],
    [5, taught(3, 1), taught(2, 1), taught(3, 0)],
  ]);
});

test('headword and construction counts by level, taught by the end and taught by the end of each unit', () => {
  const r = levelReport(ctxOf());
  assert.equal(r.headwordsByLevel.A1, 9);
  assert.equal(r.headwordsByLevel.B1, 3);
  assert.equal(r.headwordsByLevel.C2, 0);
  assert.deepEqual(r.constructionsByLevel, { A1: 2, A2: 1, B1: 0, B2: 0, C1: 0, C2: 0 });
  assert.deepEqual(r.taughtByLevel.headwords, { A1: 3, A2: 2, B1: 3, B2: 0, C1: 0, C2: 0 });
  assert.deepEqual(r.taughtByLevel.constructions, { A1: 1, A2: 1, B1: 0, B2: 0, C1: 0, C2: 0 });
  assert.deepEqual(r.taughtCumulative, [
    { unitId: 1, position: 2, A1: 3, A2: 0, B1: 1, B2: 0, C1: 0, C2: 0 },
    { unitId: 2, position: 5, A1: 3, A2: 2, B1: 3, B2: 0, C1: 0, C2: 0 },
  ]);
});

test('reading limits stay in the denominator but are listed apart from the untaught words', () => {
  const r = levelReport(ctxOf({ readingLimits: [{ id: 'fr:lex:parler', cells: ['prs', 'ptcp', 'sbjv'] }] }));
  assert.equal(r.levels.A1.coreWords, 4);
  assert.deepEqual(r.levels.A1.untaughtWords, []);
  assert.deepEqual(r.readingLimits, [{ id: 'fr:lex:parler', cefr: 'A1', cells: ['prs', 'ptcp', 'sbjv'], taughtAt: null }]);
});

test('level-order: one warning per module that teaches a node two or more levels above the highest level reached before it', () => {
  const issues = ruleLevels(ctxOf()).filter((i) => i.rule === 'level-order');
  // m2: manger (B1) before any level is reached, counted from A1. m4: travailler (B1) while only A1 is reached;
  // A2 is reached at m4 itself, which does not count. m5: avoir (B1) once A2 is reached is one level up.
  assert.deepEqual(issues.map((i) => [i.moduleKey, i.position, i.severity]), [['m2', 2, 'warning'], ['m4', 4, 'warning']]);
  assert.match(issues[0].message, /fr:lex:manger \(B1\)/);
  assert.match(issues[1].message, /fr:lex:travailler \(B1\)/);
  assert.doesNotMatch(issues[1].message, /fr:lex:aller/);
  assert.deepEqual(issues[0].nodes, ['fr:lex:manger']);
});

test('level-label still fires for a unit labelled above what its modules teach, and reads the unit description', () => {
  const course = [
    makeModule({ position: 1, unitTitle: 'Unit 1', unitDescription: 'B2 Level Phrases! Learn the subjunctive.' }),
  ];
  const labels = ruleLevels(ctxOf({}, course, { m1: { teachesWords: ['fr:lex:aller'] } })).filter((i) => i.rule === 'level-label');
  assert.equal(labels.length, 1);
  assert.match(labels[0].message, /labelled B2 but its modules teach at most A2/);
  // A module label names the module by position and title, and keeps the + of the claim.
  const mod = ruleLevels(ctxOf({}, [makeModule({ position: 1, title: 'B1+ Phrases' })], { m1: { teachesWords: ['fr:lex:aller'] } }))
    .filter((i) => i.rule === 'level-label');
  assert.match(mod[0].message, /^1\. B1\+ Phrases is labelled B1\+ but teaches at most A2$/);
  assert.equal(levelReport(ctxOf({}, course, { m1: { teachesWords: ['fr:lex:aller'] } })).units[0].label, 'B2');
});

test('validate: a core list node of another level is core-level-mismatch, a missing one dangling-ref', () => {
  const lists = [
    { ...CORE[0], words: [...CORE[0].words, 'fr:lex:manger', 'fr:lex:nope'] },
    CORE[1], CORE[2],
  ];
  const issues = validateGraph(levelGraph({ coreLists: lists }));
  const mismatch = issues.filter((i) => i.rule === 'core-level-mismatch');
  assert.deepEqual(mismatch.map((i) => [i.nodeId, i.severity]), [['fr:lex:manger', 'error']]);
  assert.match(mismatch[0].message, /A1 core list.*B1/);
  const dangling = issues.filter((i) => i.rule === 'dangling-ref');
  assert.equal(dangling.length, 1);
  assert.match(dangling[0].message, /fr:lex:nope/);
  assert.deepEqual(validateGraph(levelGraph()).filter((i) => i.rule === 'core-level-mismatch'), []);
});

test('validate: a level source must start agent: or team: and carry text after the prefix', () => {
  const graph = levelGraph();
  const set = (id, cefrSource) => graph.nodes.set(id, { ...graph.nodes.get(id), cefrSource });
  set('fr:lex:parler', 'team: Jake, 2026-12');
  set('fr:lex:aller', 'FLELex');
  set('fr:lex:hier', 'team:');
  set('fr:cx:q.inversion', null);
  graph.headwords = graph.headwords.map((h) => graph.nodes.get(h.id));
  graph.constructions = graph.constructions.map((c) => graph.nodes.get(c.id));
  const bad = validateGraph(graph).filter((i) => i.rule === 'cefr-source-bad');
  assert.deepEqual(bad.map((i) => [i.nodeId, i.severity]).sort(), [['fr:cx:q.inversion', 'error'], ['fr:lex:aller', 'error'], ['fr:lex:hier', 'error']]);
  assert.match(bad.find((i) => i.nodeId === 'fr:lex:aller').message, /"FLELex".*agent: .*team: /);
  // A node with neither a level nor a source is left to level-data-missing.
  assert.deepEqual(validateGraph(levelGraph()).filter((i) => i.rule === 'cefr-source-bad'), []);
});

test('validate: a core list is draft with frozen null or approved with an approval date', () => {
  const run = (a1) => validateGraph(levelGraph({ coreLists: [a1, CORE[1], CORE[2]] })).filter((i) => i.rule === 'core-list-status');
  assert.deepEqual(run(CORE[0]), []);
  assert.deepEqual(run({ ...CORE[0], status: 'approved', frozen: '2026-12-01' }), []);
  for (const bad of [{ status: 'approved', frozen: null }, { status: 'draft', frozen: '2026-12-01' }, { status: 'frozen', frozen: '2026-12-01' }]) {
    const issues = run({ ...CORE[0], ...bad });
    assert.deepEqual(issues.map((i) => [i.nodeId, i.severity]), [['core:fr-A1', 'error']], JSON.stringify(bad));
  }
});

test('a level counts as reached for the level warnings only once the levels below it are reached too', () => {
  // m1 teaches the whole B1 list, so B1 alone is reached at position 1, while A1 and A2 are not reached at all.
  const course = [
    makeModule({ position: 1, title: 'B1 words' }),
    makeModule({ position: 2, title: 'More B1 words' }),
    makeModule({ position: 3, title: 'B1 Review', kind: 'practice' }),
  ];
  const courseMap = {
    m1: { teachesWords: ['fr:lex:avoir', 'fr:lex:manger', 'fr:lex:travailler'] },
    m2: { teachesWords: ['fr:lex:avoir'] },
  };
  const ctx = ctxOf({}, course, courseMap);
  assert.equal(levelReport(ctx).levels.B1.reachedAt, 1);
  assert.equal(levelReport(ctx).levels.B1.cumulative.reachedAt, null);
  const issues = ruleLevels(ctx);
  // Counted from A1, avoir at m2 is still two levels up, and the B1 review claims a level the course has not reached.
  assert.deepEqual(issues.filter((i) => i.rule === 'level-order').map((i) => i.moduleKey), ['m1', 'm2']);
  const label = issues.filter((i) => i.rule === 'level-label');
  assert.deepEqual(label.map((i) => i.moduleKey), ['m3']);
  assert.match(label[0].message, /reached no level yet/);
});

test('graph:check prints level-data-missing even at zero', () => {
  const lines = checkSummaryLines(summarize([]));
  assert.ok(lines.includes('level-data-missing: 0'), lines.join('\n'));
  assert.ok(lines.includes('dangling-ref: 0'), lines.join('\n'));
});

test('validate: a reading limit must name a headword in the graph', () => {
  const issues = validateGraph(levelGraph({
    readingLimits: [{ id: 'fr:lex:parler', cells: ['prs'] }, { id: 'fr:lex:nope', cells: ['prs'] }, { id: 'fr:cx:q.inversion', cells: ['prs'] }],
  }));
  assert.deepEqual(issues.filter((i) => i.rule === 'dangling-ref').map((i) => i.nodeId), ['readingLimits']);
  assert.deepEqual(issues.filter((i) => i.rule === 'reading-limit-not-headword').map((i) => [i.nodeId, i.severity]), [['fr:cx:q.inversion', 'error']]);
});

test('report data files are byte-identical on a rerun and do not depend on course-map key order', () => {
  const dir = mkdtempSync(join(tmpdir(), 'graph-report-'));
  try {
    const read = () => ['fr-levels.json', 'fr-functions.json'].map((f) => readFileSync(join(dir, f), 'utf8'));
    writeReportData(dir, 'fr', ctxOf());
    const first = read();
    writeReportData(dir, 'fr', ctxOf());
    assert.deepEqual(read(), first);
    const reversed = Object.fromEntries(Object.entries(COURSE_MAP).reverse());
    writeReportData(dir, 'fr', ctxOf({}, COURSE, reversed));
    assert.deepEqual(read(), first);
    const levels = JSON.parse(first[0]);
    assert.deepEqual(Object.keys(levels), [...Object.keys(levels)].sort());
    assert.ok(Array.isArray(JSON.parse(first[1]).functions));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('graph:check prints coverage per level and functions possible per level', () => {
  const ctx = ctxOf();
  const stats = reportStats(levelReport(ctx), functionReport(ctx));
  const lines = checkSummaryLines(summarize([], stats));
  assert.ok(lines.includes('A1: 75% of A1 core words (3 of 4), 1 of 1 A1 core constructions, reached at position 2'), lines.join('\n'));
  assert.ok(lines.includes('B1: 100% of B1 core words (3 of 3), 0 of 0 B1 core constructions, reached at position 5; '
    + 'through B1: 89% of core words (8 of 9), 2 of 2 core constructions, reached at position 4'), lines.join('\n'));
  assert.ok(lines.some((l) => /^functions possible by the end: A1 \d+ of \d+/.test(l)), lines.join('\n'));
});

test('the fix list shows level coverage, where each level is reached and the out-of-order modules', () => {
  const ctx = ctxOf();
  const issues = ruleLevels(ctx);
  const md = renderFixList(issues, ctx.course, ctx.graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx) });
  const section = md.slice(md.indexOf('# 6. Levels'), md.indexOf('# 7. What a learner can do'));
  assert.ok(section.length > 0);
  assert.match(section, /Each core list holds only the words and grammar patterns new at its level/);
  assert.match(section, /Core words of each level alone taught by the end of the course: A1 75%, A2 100%, B1 100%\./);
  assert.match(section, /Counting each level together with the levels below it: through A1 75%, through A2 83%, through B1 89%\./);
  assert.match(section, /^\| Level \| Core words taught \| Open in the Reference unit \| Cognates \| Core words available \| Core constructions taught \| Reached at \|$/m);
  assert.match(section, /\| A1 \| 75% \(3 of 4\) \| 0 \| 0 \| 75% \(3 of 4\) \| 1 of 1 \| 2\. Food \|/);
  assert.match(section, /\| Through A2 \| 83% \(5 of 6\) \| 0 \| 0 \| 83% \(5 of 6\) \| 2 of 2 \| 4\. Going places \|/);
  assert.match(section, /percentages are rounded to the nearest whole number/i);
  assert.match(section, /fr:lex:travailler \(B1\)/);
  assert.match(section, /^\| Unit \| Positions \| Level label \| Highest level taught \| Taught at that level \|$/m);
  assert.match(section, /^\| Unit 2: A2 Moving \| 3 to 5 \| A2 \| B1 \| 2 \|$/m);
  assert.match(section, /single word or grammar pattern is enough to set a unit's highest level/);
  assert.match(md, /# 10\. Other problems/);
  assert.ok(!/[–—]/.test(md), 'no en or em dashes');
});

test('a module that teaches nothing is checked against the highest level the course has reached by its position', () => {
  const course = [
    ...COURSE,
    makeModule({ position: 6, title: 'Reading - Bravo', kind: 'reading', unitId: 2, conceptTerms: ['B2+ Level Achievement'] }),
    makeModule({ position: 7, title: 'A2 Review', kind: 'practice', unitId: 2 }),
  ];
  const labels = ruleLevels(ctxOf({}, course)).filter((i) => i.rule === 'level-label');
  // B1 is the highest level reached by position 6, so the B2 claim fires and the A2 label does not.
  assert.deepEqual(labels.map((i) => i.moduleKey), ['m6']);
  assert.match(labels[0].message, /^6\. Reading - Bravo is labelled B2\+ but teaches nothing, and by this position the course has reached B1$/);
  const early = ruleLevels(ctxOf({}, [makeModule({ position: 1, kind: 'exam', title: 'A1 Exam' })], {}))
    .filter((i) => i.rule === 'level-label');
  assert.match(early[0].message, /has reached no level yet/);
});

test('level-order leaves out forms whose headword or tense pattern the same module already lists', () => {
  const nodes = { 'fr:lex:soutenir': 'B1' };
  const graph = levelGraph();
  for (const [id, cefr] of Object.entries(nodes)) {
    graph.nodes.set(id, { id, lemma: 'soutenir', pos: 'verb', paradigms: [], cefr, cefrSource: 'agent: judgment' });
  }
  graph.nodes.set('fr:form:soutenir.prs.1sg', { id: 'fr:form:soutenir.prs.1sg', of: 'fr:lex:soutenir', cell: 'prs.1sg', surface: 'soutiens' });
  graph.headwords = [...graph.headwords, graph.nodes.get('fr:lex:soutenir')];
  graph.courseMap = { m1: { teachesWords: ['fr:lex:soutenir', 'fr:form:soutenir.prs.1sg'] } };
  const issues = ruleLevels(makeCtx({ graph, course: [makeModule({ position: 1 })] })).filter((i) => i.rule === 'level-order');
  assert.deepEqual(issues[0].nodes, ['fr:lex:soutenir']);
});

test('level-order leaves out a form whose tense pattern the same module lists, and keeps it otherwise', () => {
  // je parlais is a B1 form here only because the imparfait is B1; the headword parler is A1.
  const graph = levelGraph();
  graph.nodes.set('fr:cx:imparfait', { id: 'fr:cx:imparfait', label: 'Imparfait', cefr: 'B1', cefrSource: 'agent: judgment' });
  graph.nodes.set('fr:form:parler.impf.1sg', { id: 'fr:form:parler.impf.1sg', of: 'fr:lex:parler', cell: 'impf.1sg', surface: 'parlais' });
  const run = (teaches) => {
    graph.courseMap = { m1: teaches };
    return ruleLevels(makeCtx({ graph, course: [makeModule({ position: 1 })] })).filter((i) => i.rule === 'level-order');
  };
  assert.deepEqual(run({ teachesWords: ['fr:form:parler.impf.1sg'], teachesConstructions: ['fr:cx:imparfait'] })[0].nodes, ['fr:cx:imparfait']);
  assert.deepEqual(run({ teachesWords: ['fr:form:parler.impf.1sg'] })[0].nodes, ['fr:form:parler.impf.1sg']);
});

test('referenceNodes maps vocabulary entries to headwords and forms; the real Reference unit lists numbers and days', async () => {
  const set = referenceNodes(buildFormIndex(base), ['bonjour', 'je vais']);
  for (const id of ['fr:lex:bonjour', 'fr:lex:je', 'fr:lex:aller', 'fr:form:aller.prs.1sg']) assert.ok(set.has(id), id);
  const repoRoot = join(here, '../../..');
  const vocab = await readReferenceVocab(repoRoot);
  assert.ok(vocab.includes('deux') && vocab.includes('lundi'), 'Reference vocabulary has deux and lundi');
});

test('the fix list counts reading-limit verbs beside the untaught words and prints construction labels without checker notes', () => {
  const graph = levelGraph({ readingLimits: [{ id: 'fr:lex:parler', cells: ['prs', 'ptcp', 'sbjv'] }], courseMap: { ...COURSE_MAP, m4: { teachesWords: ['fr:lex:aller', 'fr:lex:hier'] } } });
  graph.nodes.set('fr:cx:q.inversion', { ...graph.nodes.get('fr:cx:q.inversion'), label: 'Inversion questions (parlez-vous ?); est-ce que is not counted' });
  const ctx = makeCtx({ graph, course: COURSE });
  const md = renderFixList(ruleLevels(ctx), ctx.course, graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx), graph });
  assert.match(md, /^- A1, 0 words \(plus 1 listed under Verbs the checker cannot read yet\)$/m);
  assert.match(md, /^- A2: Inversion questions \(parlez-vous \?\) \(fr:cx:q\.inversion\)$/m);
  assert.doesNotMatch(md, /is not counted/);
});

test('Section 7 names the functions that rely on the Reference unit, which is always open', () => {
  const courseMap = { m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'] }, m2: { teachesConstructions: ['fr:cx:q.inversion'] } };
  const ctx = makeCtx({ graph: levelGraph({ courseMap }), course: COURSE, reference: new Set(['fr:lex:vous']) });
  const md = renderFixList([], ctx.course, ctx.graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx), graph: ctx.graph });
  const section = md.slice(md.indexOf('# 7. What a learner can do'), md.indexOf('# 8.'));
  assert.match(section, /Some functions rely on words that no lesson teaches by then but the Reference unit lists \(vous\)\. The Reference unit is always open/);
  assert.match(section, /^- 2\. Food: Ask a yes or no question \(relies on the Reference unit\)$/m);
  assert.match(section, /is taught, open in the Reference unit or a cognate\./);
  assert.doesNotMatch(section, /only the Reference unit lists|never become possible/);
  assert.doesNotMatch(section, /fr:lex:vous/);
});

test('with the Reference unit closed, Section 7 still names the words only it lists', () => {
  const ctx = makeCtx({ graph: levelGraph({ courseMap: { m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'] } } }), course: COURSE,
    reference: new Set(['fr:lex:vous']), openFrom: null });
  const md = renderFixList([], ctx.course, ctx.graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx), graph: ctx.graph });
  const section = md.slice(md.indexOf('# 7. What a learner can do'), md.indexOf('# 8.'));
  assert.match(section, /Some functions need words that no lesson teaches and only the Reference unit lists \(vous\)/);
  assert.match(section, /still needs Question by inversion, vous \(Reference unit\)$/m);
});

test('core words the Reference unit lists count as available, apart from what lessons teach, and set where a level is reached', () => {
  // parler (A1) is taught by no lesson; hier (A2) is taught at 4. Both are open from position 1.
  const ctx = makeCtx({ graph: levelGraph({ courseMap: COURSE_MAP }), course: COURSE, reference: new Set(['fr:lex:parler', 'fr:lex:hier']) });
  const r = levelReport(ctx);
  const pick = (l) => [l.taughtWords, l.referenceWords, l.availableWords, l.reachedAt];
  // A1 alone: 3 taught + parler; 3 of 4 available at position 1 reaches the 0.75 threshold there, not at 2.
  assert.deepEqual(pick(r.levels.A1), [3, 1, 4, 1]);
  assert.deepEqual(r.levels.A1.untaughtWords, ['fr:lex:parler']);
  assert.deepEqual(r.levels.A1.untaughtReferenceWords, ['fr:lex:parler']);
  // hier is taught by the end, so it is not a Reference word there.
  assert.deepEqual(pick(r.levels.A2), [2, 0, 2, 4]);
  assert.deepEqual(pick(r.levels.A2.cumulative), [5, 1, 6, 4]);
  assert.deepEqual(pick(r.levels.B1.cumulative), [8, 1, 9, 4]);
  // At position 1 hier is open only through the Reference.
  assert.deepEqual(r.curve[0].A2, { words: 0, constructions: 0, referenceWords: 1, cognateWords: 0, availableWords: 1 });
  assert.deepEqual(r.curve[3].A2, { words: 2, constructions: 1, referenceWords: 0, cognateWords: 0, availableWords: 2 });
  const stats = reportStats(r, functionReport(ctx));
  assert.equal(stats.coverage.A1.referenceWords, 1);
  assert.equal(stats.coverage.A1.availableWords, 4);
  assert.equal(stats.coverage.A2.cumulative.availableWords, 6);
  const lines = checkSummaryLines(summarize([], stats));
  assert.ok(lines.includes('A1: 75% of A1 core words (3 of 4), 1 more open in the Reference unit, 1 of 1 A1 core constructions, reached at position 1'), lines.join('\n'));
  const md = renderFixList([], ctx.course, ctx.graph.courseMap, { levels: r, functions: functionReport(ctx), graph: ctx.graph });
  const section = md.slice(md.indexOf('# 6. Levels'), md.indexOf('# 7. What a learner can do'));
  assert.match(section, /\| A1 \| 75% \(3 of 4\) \| 1 \| 0 \| 100% \(4 of 4\) \| 1 of 1 \| 1\. Hello \|/);
  assert.match(section, /^- A1, 1 word: parler \(open in the Reference unit\)$/m);
});

test('Section 7 says possible is a floor and puts each level\'s function count beside its core word coverage', () => {
  const ctx = ctxOf();
  const md = renderFixList([], ctx.course, ctx.graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx), graph: ctx.graph });
  const section = md.slice(md.indexOf('# 7. What a learner can do'), md.indexOf('# 8.'));
  assert.match(section, /"Possible" is a floor: the course has taught at least one short way to do the function, often a single phrase/);
  assert.match(section, /not proof that a learner can do it at that level/);
  assert.match(section, /^\| Level \| Functions possible by the end \| Core words of that level taught \|$/m);
  assert.match(section, /^\| A1 \| \d+ of \d+ \| 75% \(3 of 4\) \|$/m);
  assert.doesNotMatch(section, /Functions possible by the end of the course: A1/);
});

test('Section 7 names a Reference form by its spelling, not its ID', () => {
  const exponents = [{ function: 'fn:greet', nodes: ['fr:form:aller.prs.1sg'], note: 'Je vais.' }];
  const ctx = makeCtx({ graph: levelGraph({ courseMap: {}, exponents }), course: COURSE, reference: new Set(['fr:lex:aller', 'fr:form:aller.prs.1sg']) });
  const md = renderFixList([], ctx.course, ctx.graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx), graph: ctx.graph });
  const section = md.slice(md.indexOf('# 7. What a learner can do'), md.indexOf('# 8.'));
  assert.match(section, /the Reference unit lists \(aller, vais\)\./);
  assert.doesNotMatch(section, /fr:form:/);
});

const realGraph = loadGraph(join(here, '../../../curriculum-graph'), 'fr');
const realIndex = buildFormIndex(realGraph);

test('the Reference opens only nouns, adjectives, numbers and letters with their forms, never a verb or a grammar word', () => {
  const open = referenceOpenNodes(realIndex, ["l'été", 'vif', 'vive', 'le printemps', 'je suis', 'parler français', 'cette semaine', 'Bonnes fêtes',
    'dans', 'et', 'épeler', 'être dans le rouge', 'voir la vie en rose', 'rire', 'aujourd\'hui', 'Comment ça s\'écrit ?', 'b']);
  // été reads as the season, not the past participle of être; vive as the feminine of vif, not a subjunctive of vivre.
  for (const id of ['fr:lex:ete', 'fr:lex:printemps', 'fr:lex:vif', 'fr:form:vif.f', 'fr:lex:francais', 'fr:lex:semaine',
    'fr:lex:bon', 'fr:form:bon.fpl', 'fr:lex:fete', 'fr:form:fete.pl', 'fr:lex:rouge', 'fr:lex:vie', 'fr:lex:rose', 'fr:lex:b']) {
    assert.ok(open.has(id), id);
  }
  for (const id of ['fr:form:etre.ptcp', 'fr:form:vivre.sbjv.1sg', 'fr:form:vivre.sbjv.3sg', 'fr:lex:vivre', 'fr:lex:le', 'fr:lex:je',
    'fr:form:etre.prs.1sg', 'fr:lex:etre', 'fr:form:le.elided', 'fr:form:ce.f', 'fr:lex:ce', 'fr:lex:dans', 'fr:lex:et',
    'fr:lex:parler', 'fr:lex:epeler', 'fr:lex:voir', 'fr:lex:rire', 'fr:lex:aujourd-hui', 'fr:lex:comment', 'fr:lex:en']) {
    assert.ok(!open.has(id), id);
  }
});

test('the days, months and seasons in the Reference unit all read as nouns', async () => {
  const modules = await readReferenceModules(join(here, '../../..'));
  const days = modules.find((m) => m.moduleKey === '2024-04-03-days-months');
  const open = referenceOpenNodes(realIndex, days.vocab);
  const want = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'janvier', 'fevrier', 'mars', 'avril', 'mai',
    'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre', 'printemps', 'ete', 'automne', 'hiver'].map((k) => `fr:lex:${k}`);
  for (const id of want) {
    assert.ok(open.has(id), id);
    assert.equal(realGraph.nodes.get(id).pos, 'noun', id);
  }
  assert.ok(![...open].some((id) => id.startsWith('fr:form:etre')), 'no form of être');
});

test('readReferenceModules lists every Reference module with its vocabulary; only the lookup modules are open in settings', async () => {
  const modules = await readReferenceModules(join(here, '../../..'));
  const keys = modules.map((m) => m.moduleKey);
  for (const k of ['2024-04-01-alphabet', '2024-04-07-language-stats', '2024-12-18-pronunciation-test']) assert.ok(keys.includes(k), k);
  assert.ok(modules.find((m) => m.moduleKey === '2024-04-02-numbers').vocab.includes('huit'));
  assert.deepEqual(realGraph.settings.reference, {
    openFrom: 1,
    modules: ['2024-04-01-alphabet', '2024-04-02-numbers', '2024-04-03-days-months', '2024-04-04-holidays', '2024-04-05-colors',
      '2024-04-06-french-countries'],
  });
});

test('with the Reference unit open, Section 7 says a missing word is one the Reference unit lists without opening it', () => {
  const ctx = makeCtx({ graph: levelGraph({ courseMap: { m1: { teachesWords: ['fr:lex:je', 'fr:lex:bonjour'] } } }), course: COURSE,
    reference: new Set(), openFrom: 1 });
  ctx.reference = new Set(['fr:lex:vous']);
  const md = renderFixList([], ctx.course, ctx.graph.courseMap, {
    levels: levelReport(ctx), functions: functionReport(ctx), graph: ctx.graph, referenceOpenFrom: 1,
  });
  const section = md.slice(md.indexOf('# 7. What a learner can do'), md.indexOf('# 8.'));
  assert.match(section, /Some functions need words that no lesson teaches and that the Reference unit lists without opening them \(vous\)\. It opens only the nouns, adjectives, numbers and letters on its lookup pages, so those functions never become possible\./);
  assert.doesNotMatch(section, /teaches nothing/);
});

// Cognates in the level counts. The fixture pair lists café and parc as cognates, with m3 as the cognates lesson.
function cognateCtx(allowIn) {
  const courseMap = { ...COURSE_MAP, m2: { teachesWords: ['fr:lex:manger'] } };
  const graph = levelGraph({ courseMap, settings: { ...base.settings, levelThreshold: 0.75, cognates: { allowIn } } });
  return makeCtx({ graph, course: COURSE });
}

test('with cognates allowed in all French, core cognates no lesson teaches count as available from the cognates lesson on', () => {
  const r = levelReport(cognateCtx('all'));
  const pick = (l) => [l.taughtWords, l.referenceWords, l.cognateWords, l.availableWords, l.reachedAt];
  // A1: je and bonjour taught at 1; café is a cognate from position 3, so 3 of 4 reach the 0.75 threshold there.
  assert.deepEqual(pick(r.levels.A1), [2, 0, 1, 3, 3]);
  assert.deepEqual(pick(r.levels.A2.cumulative), [4, 0, 1, 5, 4]);
  assert.deepEqual(r.curve[1].A1, { words: 2, constructions: 1, referenceWords: 0, cognateWords: 0, availableWords: 2 });
  assert.deepEqual(r.curve[2].A1, { words: 2, constructions: 1, referenceWords: 0, cognateWords: 1, availableWords: 3 });
  // café stays an untaught word: cognates count as available, not as taught.
  assert.deepEqual(r.levels.A1.untaughtWords, ['fr:lex:cafe', 'fr:lex:parler']);
  const stats = reportStats(r, functionReport(cognateCtx('all')));
  assert.equal(stats.coverage.A1.cognateWords, 1);
  const lines = checkSummaryLines(summarize([], stats));
  assert.ok(lines.includes('A1: 50% of A1 core words (2 of 4), 1 more as cognates, 1 of 1 A1 core constructions, reached at position 3'), lines.join('\n'));
  const md = renderFixList([], COURSE, {}, { levels: r, functions: functionReport(cognateCtx('all')) });
  const section = md.slice(md.indexOf('# 6. Levels'), md.indexOf('# 7. What a learner can do'));
  assert.match(section, /\| A1 \| 50% \(2 of 4\) \| 0 \| 1 \| 75% \(3 of 4\) \| 1 of 1 \| 3\. Practice \|/);
  assert.match(section, /Core words available are the words lessons teach, plus the core words no lesson teaches that the Reference unit lists or that are cognates from the cognates lesson on\./);
});

test('with cognates allowed only in shown French, cognates do not count as available', () => {
  const r = levelReport(cognateCtx('shown'));
  assert.deepEqual([r.levels.A1.cognateWords, r.levels.A1.availableWords, r.levels.A1.reachedAt], [0, 2, null]);
});
