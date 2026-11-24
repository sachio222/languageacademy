import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { makeModule, makeCtx } from './helpers.mjs';
import { ruleTranslation } from '../rules/translation.mjs';
import { ruleClaims } from '../rules/claims.mjs';
import { ruleDuplicates } from '../rules/duplicates.mjs';
import { ruleLevels } from '../rules/levels.mjs';
import { ruleUnread } from '../rules/unread.mjs';
import { ruleShapes } from '../rules/shapes.mjs';
import { ruleBlanks } from '../rules/blanks.mjs';
import { ruleCourseMapItems } from '../rules/course-map.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const base = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');

const withMap = (courseMap) => ({ ...base, courseMap });
const ctxOf = (course, courseMap = {}) => makeCtx({ graph: withMap(courseMap), course });
const item = (ref, extra = {}) => ({
  ref, source: 'x', french: ['Je parle'], lenient: [], englishPrompt: 'I speak', instruction: '', ...extra,
});

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(base), []);
});

// translation
test('English prompt in Unit 2 gives translate-item', () => {
  const ctx = ctxOf([makeModule({ position: 1, unitId: 2, items: [item('m1#1')] })]);
  const issues = ruleTranslation(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'translate-item');
  assert.equal(issues[0].severity, 'error');
  assert.equal(issues[0].itemRef, 'm1#1');
  assert.equal(issues[0].fix.kind, 'convert-item');
});

test('same item in Unit 1 gives nothing', () => {
  const ctx = ctxOf([makeModule({ position: 1, unitId: 1, items: [item('m1#1')] })]);
  assert.deepEqual(ruleTranslation(ctx), []);
});

test('itemKinds override to situation gives nothing; no prompt is not translate', () => {
  const course = [makeModule({ position: 1, unitId: 2, items: [item('m1#1'), item('m1#2', { englishPrompt: '' })] })];
  const ctx = ctxOf(course, { m1: { itemKinds: { 'm1#1': 'situation' } } });
  assert.deepEqual(ruleTranslation(ctx), []);
});

test('itemKinds can force translate', () => {
  const course = [makeModule({ position: 1, unitId: 3, items: [item('m1#1', { englishPrompt: '' })] })];
  const ctx = ctxOf(course, { m1: { itemKinds: { 'm1#1': 'translate' } } });
  assert.equal(ruleTranslation(ctx).length, 1);
});

// claims
test('exam testing a concept taught later gives claim-untaught', () => {
  const course = Array.from({ length: 12 }, (_, i) => makeModule({
    position: i + 1,
    kind: i + 1 === 10 ? 'exam' : 'lesson',
  }));
  const ctx = ctxOf(course, {
    m10: { tests: ['fr:cx:pqp'] },
    m12: { teachesConstructions: ['fr:cx:pqp'] },
  });
  const issues = ruleClaims(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'claim-untaught');
  assert.equal(issues[0].severity, 'error');
  assert.equal(issues[0].nodeId, 'fr:cx:pqp');
  assert.equal(issues[0].moduleKey, 'm10');
  assert.equal(issues[0].fix.kind, 'add-module');
});

test('taught claim passes; exam with conceptTerms and no tests warns claims-unmapped', () => {
  const course = [
    makeModule({ position: 1 }),
    makeModule({ position: 2, kind: 'exam', conceptTerms: ['passé composé'] }),
    makeModule({ position: 3, kind: 'practice' }),
  ];
  const ctx = ctxOf(course, { m1: { teachesConstructions: ['fr:cx:pqp'] }, m3: { tests: ['fr:cx:pqp'] } });
  const issues = ruleClaims(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'claims-unmapped');
  assert.equal(issues[0].severity, 'warning');
  assert.equal(issues[0].moduleKey, 'm2');
  assert.equal(issues[0].fix.kind, 'map-claim');
});

// duplicates
test('lexeme taught in two lessons gives taught-twice on the later one', () => {
  const course = Array.from({ length: 9 }, (_, i) => makeModule({ position: i + 1 }));
  const ctx = ctxOf(course, {
    m5: { teachesWords: ['fr:lex:donner'] },
    m9: { teachesWordsManual: ['fr:lex:donner'] },
  });
  const issues = ruleDuplicates(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'taught-twice');
  assert.equal(issues[0].severity, 'warning');
  assert.equal(issues[0].nodeId, 'fr:lex:donner');
  assert.equal(issues[0].moduleKey, 'm9');
  assert.equal(issues[0].position, 9);
  assert.match(issues[0].message, /5/);
  assert.match(issues[0].message, /9/);
  assert.deepEqual(issues[0].fix, { kind: 'merge-duplicate', moduleKey: 'm5' });
});

test('forms and non-lesson modules do not count as duplicates', () => {
  const course = [
    makeModule({ position: 1 }),
    makeModule({ position: 2 }),
    makeModule({ position: 3, kind: 'help' }),
  ];
  const ctx = ctxOf(course, {
    m1: { teachesWords: ['fr:form:donne'] },
    m2: { teachesWords: ['fr:form:donne'] },
    m3: { teachesWords: ['fr:lex:donner'] },
  });
  assert.deepEqual(ruleDuplicates(ctx), []);
});

// levels
function levelCtx(cefrByNode, course, courseMap) {
  const nodes = new Map(base.nodes);
  for (const [id, cefr] of Object.entries(cefrByNode)) nodes.set(id, { ...nodes.get(id), id, cefr });
  return makeCtx({ graph: { ...base, nodes, courseMap }, course });
}

test('module titled B2 whose nodes reach A2 gives level-label', () => {
  const course = [makeModule({ position: 1, title: 'B2 Level Phrases' })];
  const ctx = levelCtx({ 'fr:lex:parler': 'A1', 'fr:lex:aller': 'A2' }, course,
    { m1: { teachesWords: ['fr:lex:parler', 'fr:lex:aller'] } });
  const issues = ruleLevels(ctx).filter((i) => i.rule === 'level-label');
  assert.equal(issues.length, 1);
  assert.equal(issues[0].severity, 'warning');
  assert.equal(issues[0].moduleKey, 'm1');
});

test('conceptTerms and unit labels are checked; B2+ counts as B2; equal level is fine', () => {
  const course = [
    makeModule({ position: 1, unitTitle: 'C1 Unit', conceptTerms: ['B2+ idioms'] }),
    makeModule({ position: 2, unitTitle: 'C1 Unit', title: 'A2 basics' }),
  ];
  const ctx = levelCtx({ 'fr:lex:parler': 'B2', 'fr:lex:aller': 'A2' }, course, {
    m1: { teachesWords: ['fr:lex:parler'] },
    m2: { teachesWords: ['fr:lex:aller'] },
  });
  const labels = ruleLevels(ctx).filter((i) => i.rule === 'level-label');
  // module 1 label B2+ vs B2: fine. Unit label C1 above max computed B2: one issue.
  assert.equal(labels.length, 1);
  assert.match(labels[0].message, /C1/);
});

test('level-data-missing is one summary warning with the count, only when > 0', () => {
  const course = [makeModule({ position: 1, title: 'B2 Phrases' })];
  const ctx = ctxOf(course, { m1: { teachesWords: ['fr:lex:parler', 'fr:lex:aller'] } });
  const issues = ruleLevels(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'level-data-missing');
  assert.match(issues[0].message, /2/);
  assert.deepEqual(ruleLevels(ctxOf([makeModule({ position: 1 })], {})), []);
});

// unread
test('unreadShapes entry gives unread-items', () => {
  const ctx = ctxOf([makeModule({ position: 1, unreadShapes: ['x'] })]);
  const issues = ruleUnread(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'unread-items');
  assert.equal(issues[0].severity, 'error');
  assert.equal(issues[0].moduleKey, 'm1');
  assert.match(issues[0].message, /x/);
  assert.deepEqual(ruleUnread(ctxOf([makeModule({ position: 1 })])), []);
});

// shapes
test('nonstandard shapes give one warning per module; items and passage give nothing', () => {
  const ctx = ctxOf([
    makeModule({ position: 1, shapes: ['exercises', 'fib', 'items'] }),
    makeModule({ position: 2, shapes: ['items', 'passage'] }),
  ]);
  const issues = ruleShapes(ctx);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].rule, 'nonstandard-shape');
  assert.equal(issues[0].severity, 'warning');
  assert.equal(issues[0].moduleKey, 'm1');
  assert.deepEqual(issues[0].fix, { kind: 'convert-item', note: 'exercises, fib' });
});

// blanks
test('a misplaced blank gives blank-misplaced naming the answer and where it sits', () => {
  const ctx = ctxOf([
    makeModule({ position: 1, blankProblems: [
      { ref: 'm1#sentences[2]', answer: 'au', word: 'restaurant' },
      { ref: 'm1#sentences[4]', answer: 'hier', word: null },
    ] }),
    makeModule({ position: 2 }),
  ]);
  const issues = ruleBlanks(ctx);
  assert.deepEqual(issues.map((i) => [i.rule, i.severity, i.moduleKey, i.itemRef]), [
    ['blank-misplaced', 'error', 'm1', 'm1#sentences[2]'],
    ['blank-misplaced', 'error', 'm1', 'm1#sentences[4]'],
  ]);
  assert.match(issues[0].message, /"au".*inside the word "restaurant"/);
  assert.match(issues[1].message, /"hier".*after the end of the sentence/);
});

// course-map item keys
test('itemKinds and overrides keys that match no item give course-map-unknown-item', () => {
  const course = [makeModule({ position: 1, items: [item('m1#items[0]')] })];
  const issues = ruleCourseMapItems(ctxOf(course, {
    m1: {
      itemKinds: { 'm1#items[0]': 'situation', 'm1#items[9]': 'other' },
      overrides: { 'm1#items[0]': { ignore: ['parle'] }, 'm1#gone': { ignore: ['x'] } },
    },
    elsewhere: { itemKinds: { 'elsewhere#items[0]': 'other' } }, // unknown modules are course-map-unknown-module
  }));
  assert.deepEqual(issues.map((i) => [i.rule, i.severity, i.moduleKey, i.itemRef]), [
    ['course-map-unknown-item', 'warning', 'm1', 'm1#items[9]'],
    ['course-map-unknown-item', 'warning', 'm1', 'm1#gone'],
  ]);
  assert.match(issues[0].message, /itemKinds/);
  assert.match(issues[1].message, /overrides/);
});
