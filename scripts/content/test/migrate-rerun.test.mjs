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
  assert.deepEqual(second.record, first.record);
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
