// Time estimates (unit-prep design §7.1, §7.2): every step's first-pass minutes from its contents, review minutes,
// and the five-day size rule, all from content/fr/recipes/time.json.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadRecipes } from '../prep/recipes.mjs';
import { fiveDayMinutes, itemSeconds, moduleMinutes, reviewMinutes, stepMinutes } from '../prep/time.mjs';

const { time } = loadRecipes();

const item = (type, n, { mistakes = false, blanks = 1 } = {}) =>
  Array.from({ length: n }, (_, i) => ({
    id: `${type}-${i}${mistakes ? '-m' : ''}`,
    type,
    ...(type === 'gapfill' ? { blanks: Array.from({ length: blanks }, () => ({ answer: 'x' })) } : {}),
    steps: mistakes ? ['writing', 'lesson-exam'] : ['lesson-exam'],
  }));

// The design §7.1 example: 12 new words, 2 constructions with 3 concept cards, 10 table rows, 12 phrases, 20 items
// (6 respond, 6 transform, 4 gapfill, 2 meaning, 2 choice), 10 of them (3, 3, 2, 1, 1) with mistakes.
export const EXAMPLE_LESSON = {
  module_key: 'example', kind: 'lesson', status: 'written',
  vocabulary: Array.from({ length: 12 }, (_, i) => ({ word_id: `w${i}-fr`, fr: `w${i}`, gloss: 'x' })),
  concepts: Array.from({ length: 3 }, (_, i) => ({ id: `c${i}` })),
  tables: [{ id: 't1', rows: Array.from({ length: 10 }, () => ({ fr: 'x', en: 'x' })) }],
  phrases: Array.from({ length: 12 }, (_, i) => ({ phrase_id_suffix: `p${i}`, fr: 'x' })),
  teaches: { constructions: ['fr:cx:a.one', 'fr:cx:b.two'] },
  items: [
    ...item('respond', 3, { mistakes: true }), ...item('respond', 3),
    ...item('transform', 3, { mistakes: true }), ...item('transform', 3),
    ...item('gapfill', 2, { mistakes: true }), ...item('gapfill', 2),
    ...item('meaning', 1, { mistakes: true }), ...item('meaning', 1),
    ...item('choice', 1, { mistakes: true }), ...item('choice', 1),
  ],
};

test('fiveDayMinutes is 35 with smallest_daily_minutes 10 and review 3', () => {
  assert.equal(time.smallest_daily_minutes.value, 10);
  assert.equal(time.review_minutes_per_session.value, 3);
  assert.equal(fiveDayMinutes(time), 35);
});

test('the design §7.1 example lesson is 33 first-pass minutes and 9 review minutes', () => {
  const m = moduleMinutes(EXAMPLE_LESSON, time);
  assert.deepEqual(m.steps, { 'vocabulary-intro': 7, pronunciation: 4, 'flash-cards': 3, 'speed-match': 1, writing: 6, 'lesson-exam': 12 });
  assert.equal(m.first_pass, 33);
  assert.equal(m.review, 9);
  assert.equal(reviewMinutes(EXAMPLE_LESSON, time), 9);
});

test('the same lesson with 15 new words and 24 items, 12 in Writing, comes to 40 and does not fit', () => {
  const big = structuredClone(EXAMPLE_LESSON);
  big.vocabulary = Array.from({ length: 15 }, (_, i) => ({ word_id: `w${i}-fr`, fr: `w${i}`, gloss: 'x' }));
  big.phrases = Array.from({ length: 15 }, (_, i) => ({ phrase_id_suffix: `p${i}`, fr: 'x' }));
  big.items.push(...item('respond', 1, { mistakes: true }), ...item('transform', 1, { mistakes: true }), ...item('respond', 1), ...item('transform', 1));
  const m = moduleMinutes(big, time);
  assert.ok(m.first_pass > fiveDayMinutes(time), `${m.first_pass} should exceed 35`);
});

test('a gapfill with three blanks costs 50 seconds', () => {
  assert.equal(itemSeconds({ type: 'gapfill', blanks: [{}, {}, {}] }, time), 50);
  assert.equal(itemSeconds({ type: 'gapfill', blanks: [{}] }, time), 30);
});

test("a guide step is the guide's own minutes", () => {
  const guide = { module_key: 'g', kind: 'guide', minutes: 6, checks: [{}, {}, {}], parts: [] };
  assert.equal(stepMinutes(guide, 'interactive-help', time), 6);
  assert.deepEqual(moduleMinutes(guide, time), { steps: { 'interactive-help': 6 }, first_pass: 6, review: 0 });
});

test('a step rounds to the nearest minute, at least 1; a unit exam adds no review minutes', () => {
  const exam = { module_key: 'e', kind: 'unit_exam', items: [{ id: 'a', type: 'choice', steps: ['exam-questions'] }] };
  assert.equal(stepMinutes(exam, 'exam-questions', time), 1);
  assert.equal(moduleMinutes(exam, time).review, 0);
});

test('a reading counts passage words, pop-ups and questions', () => {
  const reading = {
    module_key: 'r', kind: 'reading',
    passage: [{ id: 'b1', fr: Array.from({ length: 100 }, () => 'mot').join(' ') }],
    vocabulary: Array.from({ length: 6 }, (_, i) => ({ word_id: `w${i}`, fr: 'x' })),
    items: Array.from({ length: 10 }, (_, i) => ({ id: `q${i}`, type: 'comprehension', steps: ['reading-passage'] })),
  };
  // 100 words at 50 a minute = 120 s, 6 pop-ups = 60 s, 10 questions = 300 s: 480 s = 8 minutes
  assert.equal(stepMinutes(reading, 'reading-passage', time), 8);
});

test('a stub counts its plan words and the recipe’s typical items', () => {
  const stub = { module_key: 's', kind: 'lesson', status: 'planned', plan: { words: ['fr:lex:a', 'fr:lex:b'], constructions: ['fr:cx:x.y'] } };
  const m = moduleMinutes(stub, time, { recipe: loadRecipes().byKind.get('lesson') });
  assert.ok(m.steps['lesson-exam'] >= 10, 'twenty typical items take about 12 minutes');
  assert.equal(m.review, Math.round((2 * 4 * 6 + 1 * 3 * 40) / 60));
});

test('the verb step: about 4 minutes for a new verb, 90 seconds for one shaped like its model, 20 for a regular -er verb', () => {
  const rows = [{ person: 'je', form: 'veux', en: 'I want', group: 'a', stem: 'veu' }];
  const withVerb = (c) => ({ ...structuredClone(EXAMPLE_LESSON), conjugation: { verb: 'x', en: 'x', groups: [{ id: 'a', sound: '/a/' }], rows, ...c } });
  assert.equal(moduleMinutes(withVerb({ pattern: 'irregular' }), time).steps['verb-forms'], 4);
  assert.equal(moduleMinutes(withVerb({ pattern: 'like', model: 'vouloir' }), time).steps['verb-forms'], 2);
  assert.equal(moduleMinutes(withVerb({ pattern: 'er', model: 'parler' }), time).steps['verb-forms'], 1);
  // The model verb itself gets the full step.
  assert.equal(moduleMinutes(withVerb({ pattern: 'er', model: 'parler', verb: 'parler' }), time).steps['verb-forms'], 4);
  assert.equal(moduleMinutes(EXAMPLE_LESSON, time).steps['verb-forms'], undefined);
});
