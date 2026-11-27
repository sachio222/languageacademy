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
import { problem } from './problems.mjs';

// The pass decision itself belongs to the course's language: languageOf(...).checkAnswer (scripts/graph/<lang>/
// language.mjs). French grades with the live app's checker (scripts/graph/fr/answers.mjs).

// Spelling as a learner types it, accents kept: lowercase, straight apostrophes, single spaces, no end mark.
const plain = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFC')
    .replace(/[’ʼ‘`]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[\s.!?…]+$/, '')
    .trim();
const unaccented = (s) => plain(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// A mistake that differs from a right answer only by accents ("ou" for "où"). The live checker folds accents and
// passes it with a warning; the new version (L) grades it apart and shows the mistake's feedback, so it teaches.
export function accentOnly(mistake, rights) {
  // The same spelling as a right answer is a mistake the checker accepts, accents or not.
  if (rights.some((r) => plain(mistake) === plain(r))) return false;
  return rights.some((r) => plain(mistake) !== plain(r) && unaccented(mistake) === unaccented(r));
}

// Pick-one items are chosen on screen, not typed.
const isPickOne = (item) => item.type === 'choice' || (item.type === 'comprehension' && item.options !== undefined);

/**
 * @param item         a valid content item (validateItem found nothing)
 * @param checkAnswer  (item, typed, { blank? }) => boolean
 * @param where        { file, path } with path the item's path, e.g. "items[3]"
 * @returns Problem[]  item_unpassable (answer or accept fails), mistake_accepted (a mistake passes; one that
 *                     differs from a right answer only by accents is skipped, see accentOnly)
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
    const rights = item.blanks.flatMap((b) => [b.answer, ...(b.accept || [])]);
    (item.mistakes || []).forEach((m, i) => {
      if (accentOnly(m.answer, rights)) return;
      if (item.blanks.every((_, k) => passes(m.answer, { blank: k })))
        bad(`mistakes[${i}].answer`, 'mistake_accepted', `the checker accepts the mistake "${m.answer}"`);
    });
    return ps;
  }

  if (!passes(item.answer)) bad('answer', 'item_unpassable', `the checker rejects the item's own answer "${item.answer}"`);
  (item.accept || []).forEach((a, i) => {
    if (!passes(a)) bad(`accept[${i}]`, 'item_unpassable', `the checker rejects the accepted answer "${a}"`);
  });
  const rights = [item.answer, ...(item.accept || [])];
  (item.mistakes || []).forEach((m, i) => {
    if (accentOnly(m.answer, rights)) return;
    if (passes(m.answer)) bad(`mistakes[${i}].answer`, 'mistake_accepted', `the checker accepts the mistake "${m.answer}"`);
  });
  return ps;
}
