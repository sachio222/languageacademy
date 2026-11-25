import { test } from 'node:test';
import assert from 'node:assert/strict';
import './vite-shim.mjs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { checkItemPassable, defaultCheckAnswer } from '../passable.mjs';
import { toLegacyExercise } from '../legacy/to-legacy-exercise.mjs';
import { validateItem } from '../schema/item.mjs';
import { assembleCourse } from '../assemble.mjs';
import { loadCourse } from '../load.mjs';
import { ContentError } from '../problems.mjs';
import { miniOutline, miniFiles, MINI_ROOT } from './mini-fixture.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const { runTests, isExerciseComplete } = await import(pathToFileURL(path.join(repo, 'src/lessons/testRunner.js')).href);

const ctx = { file: 'm.json', path: 'items[0]' };
const run = (item) => checkItemPassable(item, defaultCheckAnswer, ctx);
const live = (expectedAnswer, typed) => isExerciseComplete(runTests({ expectedAnswer }, typed));

test('answer passes', () => {
  const item = { id: 'a', type: 'respond', situation: 'You are tired. Say so.', answer: 'je suis fatigué' };
  assert.deepEqual(run(item), []);
});

test('accept that the checker rejects', () => {
  // The live checker drops punctuation and ignores accents, so "!!" is folded away and the answer alone passes it.
  assert.equal(live('je suis fatigué', 'je suis fatigue!!'), true);
  assert.deepEqual(run({ id: 'a', type: 'respond', situation: 's', answer: 'je suis fatigué', accept: ['je suis fatigue!!'] }), []);
  // The app grades an accept against the answer AND the accept list, so a declared accept always matches
  // itself: with the live checker only a checker that refuses it (here a stub) makes an accept unpassable.
  const refuse = (item, typed) => typed !== 'je suis fatigue!!';
  const ps = checkItemPassable({ id: 'a', type: 'respond', situation: 's', answer: 'je suis fatigué', accept: ['je suis fatigue!!'] }, refuse, ctx);
  assert.deepEqual(ps.map((p) => [p.code, p.path, p.file]), [['item_unpassable', 'items[0].accept[0]', 'm.json']]);
});

test('accept with a curly apostrophe', () => {
  // The live checker strips the straight apostrophe only, so the answer alone rejects a curly one ...
  assert.equal(live("j'ai", 'j’ai'), false);
  // ... but the accept list is part of what the app grades against, so the declared accept passes.
  assert.deepEqual(run({ id: 'a', type: 'respond', situation: 's', answer: "j'ai", accept: ['j’ai'] }), []);
  // A curly mistake therefore is not accepted unless it is also an accept, and a straight one is.
  const ps = run({ id: 'a', type: 'respond', situation: 's', answer: "j'ai", mistakes: [{ answer: "j'ai", feedback: 'x' }, { answer: 'j’ai', feedback: 'y' }] });
  assert.deepEqual(ps.map((p) => p.path), ['items[0].mistakes[0].answer']);
});

test('an answer the checker rejects is reported at answer', () => {
  const ps = checkItemPassable({ id: 'a', type: 'respond', situation: 's', answer: 'je suis' }, () => false, ctx);
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['item_unpassable', 'items[0].answer']]);
});

test('mistake that passes', () => {
  const item = { id: 'a', type: 'respond', situation: 's', answer: 'je suis fatigué', mistakes: [{ answer: 'je suis fatigue', feedback: 'Add the accent.' }, { answer: 'je suis fatiguée', feedback: 'x' }] };
  const ps = run(item);
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['mistake_accepted', 'items[0].mistakes[0].answer']]);
});

test('meaning items are checked on the native answer', () => {
  assert.deepEqual(run({ id: 'a', type: 'meaning', shown: 'je suis', answer: 'I am', accept: ["I'm"] }), []);
  // The checker folds case and punctuation on English too, so a mistake that differs only there passes.
  const ps = run({ id: 'a', type: 'meaning', shown: 'je suis', answer: 'I am', mistakes: [{ answer: 'i am!', feedback: 'x' }, { answer: 'I was', feedback: 'y' }] });
  assert.deepEqual(ps.map((p) => p.path), ['items[0].mistakes[0].answer']);
});

test('choice and option comprehension are not typed, so not checked', () => {
  const never = () => assert.fail('checker must not run');
  assert.deepEqual(checkItemPassable({ id: 'a', type: 'choice', question: 'q', options: [{ text: 'a', right: true }, { text: 'b' }] }, never, ctx), []);
  assert.deepEqual(checkItemPassable({ id: 'a', type: 'comprehension', question: 'q', options: [{ text: 'a', right: true }, { text: 'b' }] }, never, ctx), []);
});

test('gapfill checks each blank and its accepts', () => {
  const item = { id: 'g', type: 'gapfill', text: 'Je ___ au ___.', blanks: [{ answer: 'suis', accept: ['suis '] }, { answer: 'café', accept: ['cafe', 'bar bar'] }] };
  assert.deepEqual(run(item), []);
  // The stub sees the blank it is asked about and refuses one string on blank 1 only.
  const seen = [];
  const refuse = (it, typed, c) => (seen.push([c.blank, typed]), !(c.blank === 1 && typed === 'bar bar'));
  assert.deepEqual(checkItemPassable(item, refuse, ctx).map((p) => [p.code, p.path]), [['item_unpassable', 'items[0].blanks[1].accept[1]']]);
  assert.deepEqual(seen, [[0, 'suis'], [0, 'suis '], [1, 'café'], [1, 'cafe'], [1, 'bar bar']]);
});

test('a gapfill mistake that passes a blank is reported', () => {
  const item = { id: 'g', type: 'gapfill', text: 'Je ___ ici.', blanks: [{ answer: 'suis' }], mistakes: [{ answer: 'suis', feedback: 'x' }] };
  assert.deepEqual(run(item).map((p) => p.code), ['mistake_accepted']);
});

test('toLegacyExercise gives the shape testRunner grades', () => {
  const ex = toLegacyExercise({ id: 'a', type: 'respond', situation: 'Say it.', cue: 'Use être.', answer: 'je suis', accept: ['moi je suis'], hint: 'h', mistakes: [{ answer: 'j’ai', feedback: 'f' }] }, { liveId: 'x-1' });
  assert.equal(ex.id, 'x-1');
  assert.equal(ex.expectedAnswer, 'je suis');
  assert.deepEqual(ex.acceptableAnswers, ['moi je suis']);
  assert.deepEqual(ex.wrongAnswers, [{ answer: 'j’ai', feedback: 'f' }]);
  assert.equal(ex.hint, 'h');
  assert.ok(ex.prompt.includes('Say it.'));
  const g = toLegacyExercise({ id: 'g', type: 'gapfill', text: 'Je ___ au ___.', blanks: [{ answer: 'suis' }, { answer: 'café' }] });
  assert.equal(g.expectedAnswer, 'Je suis au café.');
});

test('mistakes are not allowed on choice or option comprehension', () => {
  const m = [{ answer: 'b', feedback: 'no' }];
  const opts = [{ text: 'a', right: true }, { text: 'b' }];
  const base = { file: 'm.json', path: 'items[0]', kind: 'lesson', unitIndex: 1, stepsAllowed: ['writing', 'lesson-exam', 'reading-passage'] };
  const codes = (item) => validateItem(item, base).map((p) => p.code);
  assert.deepEqual(codes({ id: 'a', type: 'choice', question: 'q', options: opts, mistakes: m }), ['mistakes_not_allowed']);
  assert.deepEqual(codes({ id: 'a', type: 'comprehension', question: 'q', options: opts, mistakes: m }), ['mistakes_not_allowed']);
  assert.deepEqual(codes({ id: 'a', type: 'comprehension', question: 'q', answer: 'a', mistakes: m }), []);
});

test('assembleCourse runs the check on every item when checkAnswer is given', () => {
  const files = miniFiles().map((f) => ({ file: f.file, json: JSON.parse(f.text) }));
  const lesson = files.find((f) => f.json.kind === 'lesson');
  const first = lesson.json.items.find((i) => typeof i.answer === 'string');
  assert.ok(first);
  assert.doesNotThrow(() => assembleCourse(miniOutline(), files, { checkAnswer: defaultCheckAnswer }));
  const seen = [];
  assert.throws(
    () => assembleCourse(miniOutline(), files, { checkAnswer: (item, typed) => (seen.push(typed), false) }),
    (e) => e instanceof ContentError && e.problems.some((p) => p.code === 'item_unpassable' && p.file === lesson.file && /^items\[\d+\]\.(answer|blanks)/.test(p.path)),
  );
  assert.ok(seen.includes(first.answer));
  // Without checkAnswer nothing is checked.
  assert.doesNotThrow(() => assembleCourse(miniOutline(), files));
});

test('loadCourse defaults to the live checker', () => {
  assert.doesNotThrow(() => loadCourse({ root: MINI_ROOT }));
});

test('unit9 gap-fills pass with their authored answers', async () => {
  const { unitConfigs } = await import(pathToFileURL(path.join(repo, 'src/lessons/unitConfigLoader.js')).href);
  const items = [];
  for (const u of unitConfigs)
    for (const m of u.modules)
      for (const e of m.exercises ?? [])
        if (e.type === 'fillblank') items.push({ id: `u9-${items.length + 1}`, type: 'gapfill', text: e.prompt, blanks: [{ answer: e.answer }] });
  assert.equal(items.length, 195);
  const problems = items.flatMap((item, i) => checkItemPassable(item, defaultCheckAnswer, { file: 'unit9.json', path: `items[${i}]` }));
  assert.deepEqual(problems, []);
});
