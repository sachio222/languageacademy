// Rules that read the content layer (ctx.content, loadCourse() output): unit exam items copied from a lesson,
// and passage words with no pop-up. A guide's teaching counts like a lesson's (Jake, 2026-11-27): a guide explains,
// often for the first time, what lessons cannot explain well, so no rule asks for a lesson to teach it first.
import { issue } from '../issues.mjs';
import { wordsWithoutPopup } from '../../content/migrate/reading.mjs';

// Case, spacing and the final punctuation do not make an item new ("Allons-y !" and "allons-y").
const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase().replace(/[\s.!?…;:,]+$/u, '');

// What a learner is asked and what they answer, by item type: two items with the same signature are the same
// question word for word, up to case and final punctuation. Hints, accepted answers and mistakes are left out.
function signature(item) {
  const blanks = (item.blanks ?? []).map((b) => b.answer);
  const options = (item.options ?? []).map((o) => `${o.right ? '*' : ''}${o.text}`);
  const parts = [item.type, item.prompt, item.situation, item.cue, item.instruction, item.shown, item.text, item.question, item.answer, ...blanks, ...options];
  return parts.map(norm).join('\u0001');
}

// exam_item_copied (warning): a unit exam item that repeats a lesson item word for word (spec 5.4). Exam items are the
// exam's own, so copies are rewritten as exams are revised.
export function ruleExamItemCopied(ctx) {
  if (!ctx.content) return [];
  const lessonItems = new Map();
  for (const m of ctx.course) {
    if (m.kind !== 'lesson') continue;
    for (const item of ctx.content.modules.get(m.moduleKey)?.items ?? []) {
      const sig = signature(item);
      if (!lessonItems.has(sig)) lessonItems.set(sig, `${m.moduleKey}#${item.id}`);
    }
  }
  const issues = [];
  for (const m of ctx.course) {
    if (m.kind !== 'exam') continue;
    for (const item of ctx.content.modules.get(m.moduleKey)?.items ?? []) {
      const from = lessonItems.get(signature(item));
      if (!from) continue;
      issues.push(issue({
        rule: 'exam_item_copied',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        itemRef: `${m.moduleKey}#${item.id}`,
        message: `${m.moduleKey}#${item.id} repeats the lesson item ${from} word for word; write the exam its own item`,
        fix: { kind: 'convert-item' },
      }));
    }
  }
  return issues;
}

// reading_word_no_popup (error): a distinct passage word with no dictionary entry (ctx.dictionaryForms, folded
// spellings), no row in the reading's glossary or vocabulary table, and not a name (spec 5.7). Every word a learner
// taps must open a pop-up.
export function ruleReadingWordNoPopup(ctx) {
  if (!ctx.content || !ctx.dictionaryForms) return [];
  const issues = [];
  for (const m of ctx.course) {
    if (m.kind !== 'reading') continue;
    const mod = ctx.content.modules.get(m.moduleKey);
    for (const surface of wordsWithoutPopup(mod, { dictionaryForms: ctx.dictionaryForms, names: ctx.graph.names })) {
      issues.push(issue({
        rule: 'reading_word_no_popup',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        surface,
        message: `"${surface}" in the passage of ${m.moduleKey} has no pop-up: add it to the dictionary or the reading's glossary`,
        fix: { kind: 'add-to-graph' },
      }));
    }
  }
  return issues;
}
