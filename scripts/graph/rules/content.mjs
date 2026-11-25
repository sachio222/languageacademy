// Rules that read the content layer (ctx.content, loadCourse() output): unit exam items copied from a lesson,
// passage words with no pop-up, and teaching that only a guide gives.
import { issue } from '../issues.mjs';
import { buildTimeline } from '../timeline.mjs';
import { OUTSIDE } from '../content-course.mjs';
import { analyzeItems, suppressions } from './taught-before.mjs';
import { lookupKey } from '../fr/forms.mjs';
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

const timelines = new WeakMap();

// The timeline with every guide left out, so it shows what lessons, readings and the Reference teach on their own.
function withoutGuides(ctx) {
  if (!timelines.has(ctx)) {
    const course = ctx.course.filter((m) => m.kind !== 'help');
    timelines.set(ctx, buildTimeline(ctx.graph, course, { reference: ctx.referenceOpen ?? null, openFrom: ctx.timeline.openFrom }));
  }
  return timelines.get(ctx);
}

// guide_only_teaching (error): a module other than a guide uses a word or pattern that, at its position, only a guide
// has taught. A guide is never a prerequisite (spec 5.6): a learner may skip it, so a lesson teaches it first. One
// issue per word or pattern per module; hints, feedback, instructions and titles are left out as for taught-before.
export function ruleGuideOnlyTeaching(ctx) {
  if (!ctx.course.some((m) => m.kind === 'help')) return [];
  const own = withoutGuides(ctx);
  const full = ctx.timeline;
  const analysis = analyzeItems(ctx);
  const issues = [];
  for (const m of ctx.course) {
    if (m.kind === 'help') continue;
    const seen = new Set();
    const report = (it, nodeId, what, text) => {
      if (seen.has(nodeId)) return;
      seen.add(nodeId);
      issues.push(issue({
        rule: 'guide_only_teaching',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        itemRef: it.ref,
        nodeId,
        text,
        message: `${it.ref} uses ${what}, which only a guide teaches by position ${m.position}; teach it in a lesson first (${text})`,
        fix: { kind: 'teach-earlier', moduleKey: m.moduleKey },
      }));
    };
    for (const it of m.items) {
      if (OUTSIDE.has(it.source)) continue;
      const ignore = suppressions(ctx, m.moduleKey, it.ref);
      for (const a of analysis.get(it.ref) ?? []) {
        a.tokens.forEach((t, i) => {
          const rs = a.readings[i];
          if (!rs.length || ctx.graph.names.has(t.fold)) return;
          if (ignore.has(lookupKey(t)) || ignore.has(t.fold) || rs.some((r) => ignore.has(r.headwordId) || ignore.has(r.nodeId))) return;
          if (!full.isTokenAvailable(rs, m.position) || own.isTokenAvailable(rs, m.position)) return;
          const licensed = (tl) => (a.licenses ?? []).some((l) => l.at.has(i) && tl.isAvailable(l.id, m.position) && rs.some((r) => l.heads.has(r.headwordId)));
          if (licensed(own)) return;
          const head = rs.find((r) => full.isTaught(r.headwordId, m.position))?.headwordId ?? rs[0].headwordId;
          report(it, head, `"${t.surface}"`, a.text);
        });
        for (const id of a.constructions) {
          if (ignore.has(id) || !full.isAvailable(id, m.position) || own.isAvailable(id, m.position)) continue;
          report(it, id, id, a.text);
        }
      }
    }
  }
  return issues;
}
