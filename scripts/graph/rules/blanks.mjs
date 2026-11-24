import { issue } from '../issues.mjs';

// Gap-fill blanks the reader found in the wrong place (see fillSentence in course.mjs). The app shows each blank
// in place of the character at its position, so a blank on a letter cuts a word, a blank on a mark drops the
// mark, and a blank past the end sits after the full stop.
export function ruleBlanks(ctx) {
  const issues = [];
  for (const m of ctx.course) {
    for (const p of m.blankProblems ?? []) {
      let where = 'sits after the end of the sentence, so learners see it after the full stop';
      let fix = 'move it to where the answer belongs';
      if (p.word) where = `sits inside the word "${p.word}", so learners see the word cut in two`;
      else if (p.mark) {
        where = `sits on the mark "${p.mark}", so the app drops it`;
        fix = 'put the blank on a space and keep the mark';
      }
      issues.push(issue({
        rule: 'blank-misplaced',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        itemRef: p.ref,
        message: `${p.ref}: the blank for "${p.answer}" ${where}; ${fix}`,
        fix: { kind: 'move-blank' },
      }));
    }
  }
  return issues;
}
