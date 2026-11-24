import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { ruleLevels, levelReport } from '../rules/levels.mjs';
import { writeReportData, reportStats } from '../report-data.mjs';
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
  assert.deepEqual(r.units, [
    { unitId: 1, title: 'Unit 1: Basics', label: null, computed: 'B1', firstPosition: 1, lastPosition: 2 },
    { unitId: 2, title: 'Unit 2: A2 Moving', label: 'A2', computed: 'B1', firstPosition: 3, lastPosition: 5 },
  ]);
  // A form counts: the present of aller takes aller's level, A2.
  const formOnly = levelReport(ctxOf({}, [makeModule({ position: 1 })], { m1: { teachesWords: ['fr:form:aller.prs.1sg'] } }));
  assert.equal(formOnly.modules[0].computed, 'A2');
});

test('coverage counts core words and constructions taught by the end, and the position where each level is reached', () => {
  const r = levelReport(ctxOf());
  assert.deepEqual(Object.keys(r.levels), ['A1', 'A2', 'B1']);
  assert.deepEqual(r.levels.A1, {
    coreWords: 4, coreConstructions: 1, taughtWords: 3, taughtConstructions: 1, reachedAt: 2,
    untaughtWords: ['fr:lex:parler'], untaughtConstructions: [],
  });
  assert.equal(r.levels.A2.reachedAt, 4);
  assert.equal(r.levels.A2.taughtWords, 2);
  // B1: two of three core words (0.67) is below the 0.75 threshold of this fixture.
  assert.equal(r.levels.B1.taughtWords, 3);
  assert.equal(r.levels.B1.reachedAt, 5);
  const noAvoir = levelReport(ctxOf({}, COURSE, { ...COURSE_MAP, m5: {} }));
  assert.equal(noAvoir.levels.B1.taughtWords, 2);
  assert.equal(noAvoir.levels.B1.reachedAt, null);
  assert.deepEqual(noAvoir.levels.B1.untaughtWords, ['fr:lex:avoir']);
});

test('a level needs every core construction as well as the share of core words', () => {
  const r = levelReport(ctxOf({}, COURSE, { ...COURSE_MAP, m4: { teachesWords: ['fr:lex:aller', 'fr:lex:hier'] } }));
  assert.equal(r.levels.A2.taughtWords, 2);
  assert.equal(r.levels.A2.reachedAt, null);
  assert.deepEqual(r.levels.A2.untaughtConstructions, ['fr:cx:q.inversion']);
});

test('the curve counts core words and constructions taught at each position', () => {
  const r = levelReport(ctxOf());
  assert.deepEqual(r.curve.map((c) => [c.position, c.A1, c.A2, c.B1]), [
    [1, { words: 2, constructions: 1 }, { words: 0, constructions: 0 }, { words: 0, constructions: 0 }],
    [2, { words: 3, constructions: 1 }, { words: 0, constructions: 0 }, { words: 1, constructions: 0 }],
    [3, { words: 3, constructions: 1 }, { words: 0, constructions: 0 }, { words: 1, constructions: 0 }],
    [4, { words: 3, constructions: 1 }, { words: 2, constructions: 1 }, { words: 2, constructions: 0 }],
    [5, { words: 3, constructions: 1 }, { words: 2, constructions: 1 }, { words: 3, constructions: 0 }],
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
  assert.ok(lines.includes('A1: 75% of core words (3 of 4), 1 of 1 core constructions, reached at position 2'), lines.join('\n'));
  assert.ok(lines.includes('B1: 100% of core words (3 of 3), 0 of 0 core constructions, reached at position 5'), lines.join('\n'));
  assert.ok(lines.some((l) => /^functions possible by the end: A1 \d+ of \d+/.test(l)), lines.join('\n'));
});

test('the fix list shows level coverage, where each level is reached and the out-of-order modules', () => {
  const ctx = ctxOf();
  const issues = ruleLevels(ctx);
  const md = renderFixList(issues, ctx.course, ctx.graph.courseMap, { levels: levelReport(ctx), functions: functionReport(ctx) });
  const section = md.slice(md.indexOf('# 6. Levels'), md.indexOf('# 7. What a learner can do'));
  assert.ok(section.length > 0);
  assert.match(section, /A1: 75%, A2: 100%, B1: 100%/);
  assert.match(section, /\| A1 \| 75% \(3 of 4\) \| 1 of 1 \| 2\. Food \|/);
  assert.match(section, /fr:lex:travailler \(B1\)/);
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
  assert.match(labels[0].message, /labelled B2 but teaches nothing, and by this position the course has reached B1/);
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
