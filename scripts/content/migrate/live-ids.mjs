// The live app's ids for what the converted files hold (spec 8.3). The live app keys stored answers by exercise
// id (`<moduleKey>.<N>`, by position) and concept ticks by card index. content/fr/legacy/live-ids.json maps each
// to the new item or concept id, matched by content, so it never depends on where an item now sits.
// Pure: takes the live lessons (lessonData.js `lessons` on main) and the converted modules.
import { normText } from './items.mjs';
import { unmark } from './mark-french.mjs';
import { makeConceptId } from '../item-ids.mjs';
import { sectionId } from './reference.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';

function shownText(item) {
  return ['prompt', 'situation', 'cue', 'instruction', 'shown', 'text', 'gloss', 'question']
    .map((f) => item[f])
    .filter(isStr)
    // A blank reads as a space on both sides (promptsMatch drops it from the live prompt too).
    .map((s) => normText(unmark(s).replace(/_{2,}/g, ' ')))
    .join(' | ');
}

const words = (s) => normText(s).split(' ').filter(Boolean);

// Does this converted item ask the live exercise? Same answer, and the live prompt inside what the item shows.
function answersMatch(item, ex) {
  // A choice item written in place of a typed exercise (holds.mjs REWRITES): its right option holds the old answer.
  if (item.type === 'choice') {
    const right = new Set(words(unmark((item.options || []).find((o) => o.right)?.text ?? '')));
    const live = words(ex.expectedAnswer);
    return live.length > 0 && live.every((w) => right.has(w));
  }
  if (item.type === 'gapfill') {
    const live = new Set(words(ex.expectedAnswer));
    return (item.blanks || []).every((b) => words(b.answer).every((w) => live.has(w)));
  }
  return normText(item.answer) === normText(ex.expectedAnswer);
}
function promptsMatch(item, ex) {
  const prompt = normText(String(ex.prompt ?? '').replace(/_{2,}/g, ' '));
  if (!prompt) return true;
  if (item.type === 'gapfill') return prompt.includes(normText(String(item.text).replace(/___/g, ' ')));
  return shownText(item).includes(prompt);
}

/**
 * @param mainLessons  lessons[] as lessonData.js builds them on main: { moduleKey, exercises: [{ id, prompt,
 *                     expectedAnswer }], concepts: [{ term }] }
 * @param converted    Map<module_key, module>
 * @returns { map: { [moduleKey]: { items: { [liveId]: itemId }, concepts: { [index]: conceptId } } },
 *            unmatched: [{ module_key, live_id, what, detail }] }
 */
export function liveIdMatch(mainLessons, converted) {
  const map = {};
  const unmatched = [];
  for (const lesson of mainLessons) {
    const mod = converted.get(lesson.moduleKey);
    if (!mod) continue;
    const entry = { items: {}, concepts: {} };
    // Candidates in id order, so the map never depends on the order of the items array.
    const items = [...(mod.items || [])].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    const used = new Set();
    for (const ex of lesson.exercises || []) {
      const free = items.filter((it) => !used.has(it.id));
      let hit = free.find((it) => answersMatch(it, ex) && promptsMatch(it, ex));
      if (!hit) {
        const byAnswer = free.filter((it) => answersMatch(it, ex));
        if (byAnswer.length === 1) hit = byAnswer[0];
      }
      if (hit) {
        used.add(hit.id);
        entry.items[ex.id] = hit.id;
      } else unmatched.push({ module_key: lesson.moduleKey, live_id: ex.id, what: 'exercise', detail: `"${ex.prompt}" → "${ex.expectedAnswer}"` });
    }
    // A Reference page's sections are today's concept cards (reference.mjs): heading, text and example.
    const cards = mod.concepts || (mod.sections || []).map((x) => ({ id: x.id, term: x.heading, definition: x.text, example: x.example }));
    const concepts = [...cards].sort((a, b) => (a.id < b.id ? -1 : 1));
    const usedC = new Set();
    // A concept matches by term, else by definition or example when the term was rewritten (a position word
    // fixed by hand), else by the id the converter minted from the live term (item-ids.mjs makeConceptId), which a
    // card keeps when its term, definition and examples are all rewritten on this branch.
    // A Reference page's sections take the section id the converter mints from the live term (reference.mjs).
    const minted = new Set();
    const isPage = !mod.concepts && Array.isArray(mod.sections);
    const mintedIds = (lesson.concepts || []).map((c) => (isPage ? sectionId(c.term, minted) : makeConceptId(c, minted)));
    (lesson.concepts || []).forEach((c, i) => {
      const free = concepts.filter((k) => !usedC.has(k.id));
      const hit =
        free.find((k) => normText(unmark(k.term)) === normText(c.term)) ??
        free.find((k) => normText(unmark(k.definition)) === normText(c.definition)) ??
        free.find((k) => c.example && normText(unmark(k.example)) === normText(c.example)) ??
        free.find((k) => k.id === mintedIds[i]);
      if (hit) {
        usedC.add(hit.id);
        entry.concepts[String(i)] = hit.id;
      } else unmatched.push({ module_key: lesson.moduleKey, live_id: String(i), what: 'concept', detail: `"${c.term}"` });
    });
    map[lesson.moduleKey] = entry;
  }
  return { map, unmatched };
}

export function liveIdMap(mainLessons, converted) {
  return liveIdMatch(mainLessons, converted).map;
}
