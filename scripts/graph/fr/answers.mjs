// The French pass decision for one typed answer: the live app's own checker, so that content:validate accepts exactly
// what a learner's answer would be marked right for (see scripts/content/passable.mjs for how a gap-fill is submitted).
import { runTests, isExerciseComplete } from '../../../src/lessons/testRunner.js';
import { toLegacyExercise } from '../../content/legacy/to-legacy-exercise.mjs';

/**
 * The live pass decision for one typed string. Plain node can import testRunner.js, so no Vite shim.
 * `meaning` items take the same path: lintFrench and checkAnswer accept English text ("I am", "I'm")
 * and fold case, punctuation and accents the same way, so the one checker serves their native answers.
 * @param ctx  { blank?: number } for a gapfill, which blank the string is typed into
 */
export function checkAnswer(item, typed, ctx = {}) {
  const ex = toLegacyExercise(item, ctx);
  // runTests().passed is a count; isExerciseComplete is the app's boolean.
  return isExerciseComplete(runTests(ex, typed));
}

