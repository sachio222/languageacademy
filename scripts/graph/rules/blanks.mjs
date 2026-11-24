import { issue } from '../issues.mjs';

// Gap-fill blanks the reader found in the wrong place (see fillSentence in course.mjs).
export function ruleBlanks(ctx) {
  const issues = [];
  for (const m of ctx.course) {
    for (const p of m.blankProblems ?? []) {
      const where = p.word
        ? `sits inside the word "${p.word}", so learners see the word cut in two`
        : 'sits after the end of the sentence, so learners see it after the full stop';
      issues.push(issue({
        rule: 'blank-misplaced',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        itemRef: p.ref,
        message: `${p.ref}: the blank for "${p.answer}" ${where}; move it to where the answer belongs`,
        fix: { kind: 'move-blank' },
      }));
    }
  }
  return issues;
}
