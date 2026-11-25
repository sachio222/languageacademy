import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateItem, itemTexts, ITEM_TYPES } from '../schema/item.mjs';

const ctx = { file: 'm.json', path: 'items[0]', kind: 'lesson', unitIndex: 1, stepsAllowed: ['writing', 'lesson-exam'] };
const codes = (item, over = {}) => validateItem(item, { ...ctx, ...over }).map((p) => p.code);

test('seven item types', () => {
  assert.deepEqual([...ITEM_TYPES].sort(), ['choice', 'comprehension', 'gapfill', 'meaning', 'respond', 'transform', 'translate']);
});

test('a valid item of each type passes', () => {
  const ok = [
    { id: 'a', type: 'translate', prompt: 'I am', answer: 'je suis' },
    { id: 'a', type: 'respond', situation: 'You are tired. Say so.', cue: 'Use {être}.', answer: 'je suis fatigué', accept: ['Je suis fatigué'], hint: 'Try {je suis}.' },
    { id: 'a', type: 'transform', instruction: 'Make it plural.', shown: 'il est', answer: 'ils sont' },
    { id: 'a', type: 'gapfill', gloss: 'I am', text: 'Je ___ ici.', blanks: [{ answer: 'suis', accept: [] }] },
    { id: 'a', type: 'meaning', shown: 'je suis', answer: 'I am', accept: ["I'm"] },
    { id: 'a', type: 'choice', question: 'Pick one', options: [{ text: 'suis', fr: true, right: true }, { text: 'es', fr: true }] },
    { id: 'a', type: 'comprehension', question: 'Who?', answer: 'Anna' },
    { id: 'a', type: 'comprehension', question: 'Who?', options: [{ text: 'Anna', right: true }, { text: 'Bo' }] },
  ];
  for (const item of ok) assert.deepEqual(codes(item, { unitIndex: 1, stepsAllowed: ['writing', 'reading-passage'] }), [], item.type);
});

test('gapfill blank count', () => {
  const item = { id: 'g', type: 'gapfill', text: 'Je ___ ___.', blanks: [{ answer: 'suis' }] };
  assert.deepEqual(codes(item), ['blank_count']);
});

test('translate outside unit 1', () => {
  const item = { id: 'i-a', type: 'translate', prompt: 'I am', answer: 'je suis' };
  assert.deepEqual(codes(item, { unitIndex: 2 }), ['translate_outside_unit1']);
  // A checker finding (spec 5.4), so a warning: it never stops a load.
  assert.deepEqual(validateItem(item, { ...ctx, unitIndex: 2 }).map((p) => p.severity), ['warning']);
  assert.deepEqual(codes(item, { unitIndex: 1 }), []);
});


test('unknown item field', () => {
  const ps = validateItem({ id: 'a', type: 'translate', prompt: 'x', answer: 'y', expectedAnswer: 'z' }, ctx);
  assert.equal(ps.length, 1);
  assert.equal(ps[0].code, 'field_unknown');
  assert.equal(ps[0].path, 'items[0].expectedAnswer');
});

test('item id pattern', () => {
  assert.deepEqual(codes({ id: 'I 1', type: 'translate', prompt: 'x', answer: 'y' }), ['id_invalid']);
  assert.deepEqual(codes({ id: 'a-b-2', type: 'translate', prompt: 'x', answer: 'y' }), []);
});

test('missing field, bad type, bad steps', () => {
  assert.deepEqual(codes({ id: 'a', type: 'respond', answer: 'x' }), ['field_missing']);
  assert.deepEqual(codes({ id: 'a', type: 'quiz' }), ['item_type_invalid']);
  assert.deepEqual(codes({ id: 'a', type: 'translate', prompt: 'x', answer: 'y', steps: ['writing', 'practice-exercises'] }), ['step_not_allowed']);
});

test('choice needs exactly one right; comprehension needs answer or options', () => {
  assert.deepEqual(codes({ id: 'a', type: 'choice', question: 'q', options: [{ text: 'a', right: true }, { text: 'b', right: true }] }), ['options_invalid']);
  assert.deepEqual(codes({ id: 'a', type: 'comprehension', question: 'q' }), ['field_missing']);
});

test('span problems are reported on native_fr fields', () => {
  assert.deepEqual(codes({ id: 'a', type: 'respond', situation: 'Use {être', answer: 'x' }), ['span_unclosed']);
});

test('itemTexts roles: respond', () => {
  const t = itemTexts({ id: 'a', type: 'respond', situation: 's', cue: 'c', answer: 'a1', accept: ['a2', 'a3'], hint: 'h', mistakes: [{ answer: 'm', feedback: 'f' }] });
  const by = Object.fromEntries(t.map((x) => [x.path, x]));
  assert.equal(by.situation.role, 'native_fr');
  assert.equal(by.cue.role, 'native_fr');
  assert.deepEqual([by.answer.role, by.answer.typed], ['fr', true]);
  assert.deepEqual([by['accept[1]'].role, by['accept[1]'].typed, by['accept[1]'].text], ['fr', true, 'a3']);
  assert.equal(by.hint.role, 'native_fr');
  assert.deepEqual([by['mistakes[0].answer'].role, by['mistakes[0].answer'].typed], ['fr', true]);
  assert.equal(by['mistakes[0].feedback'].role, 'native_fr');
});

test('itemTexts roles: meaning', () => {
  const t = itemTexts({ id: 'a', type: 'meaning', shown: 'je suis', answer: 'I am', accept: ["I'm"] });
  const by = Object.fromEntries(t.map((x) => [x.path, x]));
  assert.deepEqual([by.shown.role, by.shown.typed], ['fr', false]);
  assert.deepEqual([by.answer.role, by.answer.typed], ['native', true]);
  assert.deepEqual([by['accept[0]'].role, by['accept[0]'].typed], ['native', true]);
});

test('itemTexts roles: gapfill and choice', () => {
  const g = itemTexts({ id: 'a', type: 'gapfill', gloss: 'g', text: 'Je ___.', blanks: [{ answer: 'suis', accept: ['es'] }] });
  const gb = Object.fromEntries(g.map((x) => [x.path, x]));
  assert.equal(gb.gloss.role, 'native_fr');
  assert.deepEqual([gb.text.role, gb.text.typed], ['fr', false]);
  assert.deepEqual([gb['blanks[0].answer'].role, gb['blanks[0].answer'].typed], ['fr', true]);
  assert.equal(gb['blanks[0].accept[0]'].text, 'es');
  const c = itemTexts({ id: 'a', type: 'choice', question: 'q', options: [{ text: 'suis', fr: true, right: true }, { text: 'am' }] });
  const cb = Object.fromEntries(c.map((x) => [x.path, x]));
  assert.equal(cb['options[0].text'].role, 'fr');
  assert.equal(cb['options[1].text'].role, 'native');
  assert.equal(cb['options[0].text'].typed, false);
});

test('itemTexts roles: comprehension', () => {
  const t = itemTexts({ id: 'a', type: 'comprehension', question: 'How do they travel?', answer: 'prendre le train', accept: ['le train'] });
  const by = Object.fromEntries(t.map((x) => [x.path, x]));
  assert.equal(by.question.role, 'native_fr');
  assert.deepEqual([by.answer.role, by.answer.typed], ['fr', true]);
  assert.deepEqual([by['accept[0]'].role, by['accept[0]'].typed], ['fr', true]);
  const o = itemTexts({ id: 'a', type: 'comprehension', question: 'q', options: [{ text: 'le train', fr: true, right: true }, { text: 'by car' }] });
  assert.equal(o[1].role, 'fr');
  assert.equal(o[2].role, 'native');
});
