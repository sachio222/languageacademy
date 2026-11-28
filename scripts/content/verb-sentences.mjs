// The sentences a lesson holds for each form of its verb: an item's French that says the person and the form
// (je pars avec toi for je pars), with the form taken out and the item's English beside it. The Verb forms step
// brings every form back in review inside one of these, so a form is recalled in a sentence, never alone.
// Pure: no fs. Sentences come from a gapfill item with a gloss (its text with the blanks filled) and from a respond
// item with a cue (its answer); other items give no English for their French.
import { BLANK_MARKER } from './schema/item.mjs';

const straight = (s) => String(s).replace(/[’ʼ‘]/g, "'");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const isStr = (v) => typeof v === 'string' && v.trim() !== '';

/** The persons a row stands for: il/elle/on gives il, elle, on. */
export const personsOf = (row) => String(row.person).split('/').map((p) => p.trim()).filter(Boolean);

/** An item's French sentence and its English, or null when the item has no such pair. */
export function sentenceOf(item) {
  if (!item || typeof item !== 'object') return null;
  if (item.type === 'gapfill' && isStr(item.text) && isStr(item.gloss) && Array.isArray(item.blanks)) {
    let i = 0;
    const fr = item.text.replace(BLANK_MARKER, () => item.blanks[i++]?.answer ?? '___');
    return { fr, en: item.gloss };
  }
  if (item.type === 'respond' && isStr(item.answer) && isStr(item.cue)) return { fr: item.answer, en: item.cue };
  return null;
}

/**
 * One row's sentences among a lesson's items, in item order.
 * @returns Array<{ fr (the sentence with ___ for the form), en, answer (the form), person, item_id }>
 */
export function rowSentences(row, items) {
  const out = [];
  if (!row || !isStr(row.form) || !isStr(row.person)) return out;
  for (const item of items ?? []) {
    const s = sentenceOf(item);
    if (!s) continue;
    const fr = straight(s.fr);
    for (const p of personsOf(row)) {
      const said = p.endsWith("'") ? `${p}${row.form}` : `${p} ${row.form}`;
      const re = new RegExp(`(^|[\\s'-])(${escapeRe(p)}${p.endsWith("'") ? '' : ' '})${escapeRe(row.form)}(?=$|[\\s.,!?;:])`, 'giu');
      const hits = [...fr.matchAll(re)];
      // The sentence says more than the person and the form, and says the form once, so the blank has one answer.
      if (hits.length !== 1 || fr.replace(/[.!?\s]+$/u, '').trim().toLowerCase() === said.toLowerCase()) continue;
      const m = hits[0], at = m.index + m[1].length + m[2].length;
      out.push({ fr: `${fr.slice(0, at)}___${fr.slice(at + row.form.length)}`, en: s.en, answer: row.form, person: p, item_id: item.id });
      break;
    }
  }
  return out;
}
