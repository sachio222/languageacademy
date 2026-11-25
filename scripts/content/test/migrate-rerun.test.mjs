// Task 6, spec 8.2: a rerun reads what is written first and keeps it, so hand fixes survive.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../vite-shim.mjs';
import { convertModule, hashOf } from '../migrate/module.mjs';

const old = {
  moduleKey: '2024-01-02-test',
  title: 'Test Lesson',
  description: 'A lesson for the tests.',
  concepts: [{ term: 'être = to be', definition: 'The verb of states.', example: 'je suis' }],
  vocabularyReference: [
    { french: 'je suis', english: 'I am', note: 'être' },
    { french: 'tu es', english: 'you are', note: 'être' },
  ],
  exerciseConfig: {
    type: 'custom',
    items: [
      { instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis', wrongAnswers: [{ answer: 'je es', feedback: 'Je takes suis.' }] },
      { instruction: 'Translate:', prompt: 'you are', expectedAnswer: 'tu es' },
      { instruction: 'Translate:', prompt: 'he is', expectedAnswer: 'il est' },
    ],
  },
};
const ctx = { unitKey: 'unit1', unitIndex: 1 };
const clone = (v) => JSON.parse(JSON.stringify(v));

test('rerun keeps hand edits', () => {
  const first = convertModule(old, ctx);
  const edited = clone(first.mod);
  // A reviewer retypes one item and renames one word.
  const it = edited.items[1];
  edited.items[1] = { id: it.id, type: 'respond', situation: it.prompt, answer: it.answer };
  edited.vocabulary[0].word_id = 'je-suis-fr.hand';
  const second = convertModule(old, { ...ctx, existing: edited, record: first.record });
  assert.deepEqual(second.mod, edited);
  assert.deepEqual(second.mod.items.map((i) => i.id), first.mod.items.map((i) => i.id));
  // The record keeps the hand-set word id as written; a further rerun changes nothing.
  const third = convertModule(old, { ...ctx, existing: second.mod, record: second.record });
  assert.deepEqual(third.mod, edited);
  assert.deepEqual(third.record, second.record);
  // Without a record the written file still wins.
  assert.deepEqual(convertModule(old, { ...ctx, existing: edited }).mod, edited);
});

test('rerun with no edits changes nothing', () => {
  const first = convertModule(old, ctx);
  const second = convertModule(old, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(second.mod, first.mod);
});

test('a source change reaches the file, ids kept', () => {
  const first = convertModule(old, ctx);
  const changed = clone(old);
  changed.exerciseConfig.items[2].expectedAnswer = 'il est là';
  changed.exerciseConfig.items.push({ instruction: 'Translate:', prompt: 'she is', expectedAnswer: 'elle est' });
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.equal(second.mod.items.length, 4);
  assert.deepEqual(second.mod.items.slice(0, 3).map((i) => i.id), first.mod.items.map((i) => i.id));
  assert.equal(second.mod.items[2].answer, 'il est là');
  assert.equal(second.mod.items[3].id, 'i-elle-est');
  assert.ok(second.report.some((l) => l.kind === 'source_changed' && l.path === 'items[2]'), JSON.stringify(second.report));
});

test('an item removed by hand stays removed', () => {
  const first = convertModule(old, ctx);
  const edited = clone(first.mod);
  edited.items.splice(2, 1);
  const second = convertModule(old, { ...ctx, existing: edited, record: first.record });
  assert.deepEqual(second.mod, edited);
  assert.deepEqual(second.record, first.record);
});

test('a hand edit on one item survives a source change on another', () => {
  const first = convertModule(old, ctx);
  const edited = clone(first.mod);
  edited.items[0].hint = 'Hand hint';
  const changed = clone(old);
  changed.exerciseConfig.items[1].expectedAnswer = 'tu es là';
  const second = convertModule(changed, { ...ctx, existing: edited, record: first.record });
  assert.equal(second.mod.items[0].hint, 'Hand hint');
  assert.equal(second.mod.items[1].answer, 'tu es là');
  assert.equal(second.mod.items[1].id, first.mod.items[1].id);
  assert.ok(!second.report.some((l) => l.kind === 'merge_conflict'), JSON.stringify(second.report.filter((l) => l.kind === 'merge_conflict')));
});

test('a hand-fixed type survives a change to its own source, with a merge_conflict line', () => {
  const first = convertModule(old, ctx);
  const edited = clone(first.mod);
  const it = edited.items[1];
  edited.items[1] = { id: it.id, type: 'respond', situation: it.prompt, answer: it.answer };
  const changed = clone(old);
  changed.exerciseConfig.items[1].prompt = 'you are (informal)';
  const second = convertModule(changed, { ...ctx, existing: edited, record: first.record });
  assert.deepEqual(second.mod.items[1], edited.items[1]);
  assert.ok(second.report.some((l) => l.kind === 'merge_conflict' && l.path === 'items[1]'), JSON.stringify(second.report));
  // The conflict stays on every rerun until a person settles it.
  const third = convertModule(changed, { ...ctx, existing: second.mod, record: second.record });
  assert.deepEqual(third.mod, second.mod);
  assert.ok(third.report.some((l) => l.kind === 'merge_conflict'));
});

test('three-way merge: a converter fix reaches a part nobody edited, and only that part', () => {
  const first = convertModule(old, ctx);
  // As if an older converter had written item 0's hint and the description differently, and a person had then
  // fixed item 1 by hand.
  const file = clone(first.mod);
  const record = clone(first.record);
  file.items[0].hint = 'old converter hint';
  record.items[file.items[0].id].out = hashOf(file.items[0]);
  file.description = 'Old converter description.';
  record.fields.description.out = hashOf(file.description);
  file.items[1].hint = 'Hand hint';
  const second = convertModule(old, { ...ctx, existing: file, record });
  assert.equal(second.mod.items[0].hint, undefined); // the converter writes no hint for it now
  assert.equal(second.mod.description, first.mod.description);
  assert.equal(second.mod.items[1].hint, 'Hand hint');
  assert.deepEqual(Object.keys(second.handFixes), [`items/${first.mod.items[1].id}`]);
});

test('--force reapplies the hand fixes', () => {
  const first = convertModule(old, ctx);
  const edited = clone(first.mod);
  edited.items[1].hint = 'Hand hint';
  edited.vocabulary[0].word_id = 'je-suis-fr.hand';
  const second = convertModule(old, { ...ctx, existing: edited, record: first.record });
  const forced = convertModule(old, { ...ctx, handFixes: second.handFixes });
  assert.deepEqual(forced.mod, edited);
});

// Word ids stay on their words when the source table changes (review fix round 2).
const words = (m) => m.vocabulary.map((w) => `${w.word_id}=${w.fr}=${w.gloss}`);
const three = {
  ...old,
  vocabularyReference: [
    { french: 'je suis', english: 'I am', note: '' },
    { french: 'tu es', english: 'you are', note: '' },
    { french: 'il est', english: 'he is', note: '' },
  ],
};

test('a source card removed at the front: the other cards keep their ids', () => {
  const first = convertModule(three, ctx);
  const changed = clone(three);
  changed.vocabularyReference.splice(0, 1);
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(words(second.mod), ['tu-es-fr=tu es=you are', 'il-est-fr=il est=he is']);
  assert.ok(second.report.some((l) => l.kind === 'source_removed' && /je-suis-fr/.test(l.detail)));
});

test('a source card added at the front takes a new id; the others keep theirs', () => {
  const first = convertModule(three, ctx);
  const changed = clone(three);
  changed.vocabularyReference.unshift({ french: 'nous sommes', english: 'we are', note: '' });
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(words(second.mod), ['nous-sommes-fr=nous sommes=we are', 'je-suis-fr=je suis=I am', 'tu-es-fr=tu es=you are', 'il-est-fr=il est=he is']);
});

test('a source card edited in place keeps its id and takes the new text', () => {
  const first = convertModule(three, ctx);
  const changed = clone(three);
  changed.vocabularyReference[1] = { french: 'tu es', english: 'you are (informal)', note: 'singular' };
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(words(second.mod), ['je-suis-fr=je suis=I am', 'tu-es-fr=tu es=you are (informal)', 'il-est-fr=il est=he is']);
  assert.equal(second.mod.vocabulary[1].note, 'singular');
  // A rerun of the same source changes nothing.
  const third = convertModule(changed, { ...ctx, existing: second.mod, record: second.record });
  assert.deepEqual(third.mod, second.mod);
  assert.deepEqual(third.record, second.record);
});

test('an exercise removed before an edited one: the edited one keeps its own id (review step3)', () => {
  const first = convertModule(old, ctx);
  const edited = clone(first.mod);
  edited.items[1] = { id: edited.items[1].id, type: 'respond', situation: 'Talk to a friend', cue: 'you are', answer: 'tu es' };
  const changed = clone(old);
  changed.exerciseConfig.items.splice(0, 1);
  changed.exerciseConfig.items[0].prompt = 'you are (informal)';
  const second = convertModule(changed, { ...ctx, existing: edited, record: first.record });
  assert.deepEqual(second.mod.items.map((i) => i.id), [first.mod.items[1].id, first.mod.items[2].id]);
  assert.deepEqual(second.mod.items[0], edited.items[1]); // the hand-fixed type stays
  assert.ok(second.report.some((l) => l.kind === 'source_removed' && /i-je-suis/.test(l.detail)));
  assert.ok(second.report.some((l) => l.kind === 'merge_conflict'));
});

test('an exercise nothing pairs with gets a new id, never a removed one', () => {
  const first = convertModule(old, ctx);
  const changed = clone(old);
  changed.exerciseConfig.items.splice(0, 1);
  changed.exerciseConfig.items[0] = { instruction: 'Translate:', prompt: 'we are', expectedAnswer: 'nous sommes' };
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  const ids = second.mod.items.map((i) => i.id);
  assert.ok(!ids.includes('i-je-suis') && !ids.includes('i-tu-es'), ids.join(' '));
  assert.deepEqual(ids, ['i-nous-sommes', 'i-il-est']);
});

test('a card replaced in place by another word takes a new id; the old one is removed', () => {
  const first = convertModule(three, ctx);
  const changed = clone(three);
  changed.vocabularyReference[1] = { french: 'nous sommes', english: 'we are', note: '' };
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(words(second.mod), ['je-suis-fr=je suis=I am', 'nous-sommes-fr=nous sommes=we are', 'il-est-fr=il est=he is']);
  assert.ok(second.report.some((l) => l.kind === 'source_removed' && /tu-es-fr/.test(l.detail)), JSON.stringify(second.report));
  // A spelling fix of the same word in its place keeps the id.
  const fixed = clone(three);
  fixed.vocabularyReference[1] = { french: 'tu és', english: 'you are, informal', note: '' };
  const third = convertModule(fixed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.equal(third.mod.vocabulary[1].word_id, 'tu-es-fr');
  assert.equal(third.mod.vocabulary[1].fr, 'tu és');
});

test('an exercise replaced in place by a different question takes a new id; the old one is removed', () => {
  const first = convertModule(old, ctx);
  const changed = clone(old);
  changed.exerciseConfig.items[1] = { instruction: 'Translate:', prompt: 'she is', expectedAnswer: 'elle est' };
  const second = convertModule(changed, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(second.mod.items.map((i) => `${i.id}=${i.answer}`), ['i-je-suis=je suis', 'i-elle-est=elle est', 'i-il-est=il est']);
  assert.ok(second.report.some((l) => l.kind === 'source_removed' && /i-tu-es/.test(l.detail)));
  // Same prompt, corrected answer: an edit, so the id stays (spec 8.1).
  const edited = clone(old);
  edited.exerciseConfig.items[1] = { instruction: 'Translate:', prompt: 'you are', expectedAnswer: 'vous êtes' };
  const third = convertModule(edited, { ...ctx, existing: clone(first.mod), record: first.record });
  assert.deepEqual(third.mod.items.map((i) => `${i.id}=${i.answer}`), ['i-je-suis=je suis', 'i-tu-es=vous êtes', 'i-il-est=il est']);
});
