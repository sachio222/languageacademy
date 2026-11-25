// Every declared answer must pass the app's own checker (spec 5.4, 9.1): item_unpassable and mistake_accepted.
// This is the rule that would have stopped the Unit 9 lessons, whose 195 gap-fills could never be marked correct.
//
// How the live app submits a gap-fill (read for this task, src/ untouched):
//  - src/components/FillInTheBlank.jsx (sentence-style modules) types one input per blank and grades each
//    blank on its own with frenchLinter's checkAnswer(typed, blank.answer); it never joins blanks.
//  - The Unit 9 gap-fills are ordinary exercises (type "fillblank"): moduleBuilder.normalizeExercise maps
//    `answer` onto expectedAnswer, the exercise screen types the blank's words only ("suis allé", not the
//    sentence), and the pass decision is isExerciseComplete(runTests(exercise, typed)).
// So a gap-fill is checked blank by blank: the typed string is one blank's answer (or accept), graded by
// the same runTests/isExerciseComplete pair every other typed item uses.
import { runTests, isExerciseComplete } from '../../src/lessons/testRunner.js';
import { problem } from './problems.mjs';
import { toLegacyExercise } from './legacy/to-legacy-exercise.mjs';

/**
 * The live pass decision for one typed string. Plain node can import testRunner.js, so no Vite shim.
 * `meaning` items take the same path: lintFrench and checkAnswer accept English text ("I am", "I'm")
 * and fold case, punctuation and accents the same way, so the one checker serves their native answers.
 * @param ctx  { blank?: number } for a gapfill, which blank the string is typed into
 */
export function defaultCheckAnswer(item, typed, ctx = {}) {
  const ex = toLegacyExercise(item, ctx);
  // runTests().passed is a count; isExerciseComplete is the app's boolean.
  return isExerciseComplete(runTests(ex, typed));
}

// Pick-one items are chosen on screen, not typed.
const isPickOne = (item) => item.type === 'choice' || (item.type === 'comprehension' && item.options !== undefined);

/**
 * @param item         a valid content item (validateItem found nothing)
 * @param checkAnswer  (item, typed, { blank? }) => boolean
 * @param where        { file, path } with path the item's path, e.g. "items[3]"
 * @returns Problem[]  item_unpassable (answer or accept fails), mistake_accepted (a mistake passes)
 */
export function checkItemPassable(item, checkAnswer, { file, path }) {
  if (isPickOne(item)) return [];
  const ps = [];
  const bad = (sub, code, msg) => ps.push(problem(file, `${path}.${sub}`, code, msg));
  const passes = (typed, ctx) => checkAnswer(item, typed, ctx) === true;

  if (item.type === 'gapfill') {
    item.blanks.forEach((b, i) => {
      const ctx = { blank: i };
      if (!passes(b.answer, ctx)) bad(`blanks[${i}].answer`, 'item_unpassable', `the checker rejects the blank's own answer "${b.answer}"`);
      (b.accept || []).forEach((a, j) => {
        if (!passes(a, ctx)) bad(`blanks[${i}].accept[${j}]`, 'item_unpassable', `the checker rejects the accepted answer "${a}"`);
      });
    });
    // A mistake belongs to no one blank, so it is a problem only when it passes every blank.
    (item.mistakes || []).forEach((m, i) => {
      if (item.blanks.every((_, k) => passes(m.answer, { blank: k })))
        bad(`mistakes[${i}].answer`, 'mistake_accepted', `the checker accepts the mistake "${m.answer}"`);
    });
    return ps;
  }

  if (!passes(item.answer)) bad('answer', 'item_unpassable', `the checker rejects the item's own answer "${item.answer}"`);
  (item.accept || []).forEach((a, i) => {
    if (!passes(a)) bad(`accept[${i}]`, 'item_unpassable', `the checker rejects the accepted answer "${a}"`);
  });
  (item.mistakes || []).forEach((m, i) => {
    if (passes(m.answer)) bad(`mistakes[${i}].answer`, 'mistake_accepted', `the checker accepts the mistake "${m.answer}"`);
  });
  return ps;
}
