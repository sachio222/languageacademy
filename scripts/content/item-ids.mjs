// Ids made once, when a module file is first written, and never changed after (spec 8.1, L rule C-ID-4).
// Pure: no file access.
import { ID_PATTERN } from './schema/item.mjs';

// "Je suis fatigué !" -> "je-suis-fatigue": accents folded, œ and æ written out, anything else a hyphen.
export function slugify(text, { words = Infinity } = {}) {
  const folded = String(text)
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
  const parts = folded.split(/[^a-z0-9]+/).filter(Boolean);
  return parts.slice(0, words).join('-');
}

// The first free id from `base`: base, base-2, base-3, … Adds it to `taken`.
export function freeId(base, taken) {
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  taken.add(id);
  return id;
}

// The text an item's id is made from: its answer, a gap-fill's blank answers, or a question.
function answerText(item) {
  if (typeof item.answer === 'string') return item.answer;
  if (Array.isArray(item.blanks)) return item.blanks.map((b) => b?.answer ?? '').join(' ');
  if (Array.isArray(item.options)) return item.options.find((o) => o?.right)?.text ?? '';
  return item.question ?? '';
}

// An authored id written for today's app ("on-people.1") in the id pattern: lowercase, anything else a hyphen.
export function authoredId(id) {
  return String(id)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * makeItemId(item, taken): keeps an authored `id` (in the id pattern); else `i-` and the first four words of the
 * answer, accents folded, with -2, -3 on a clash. Adds the id to `taken`.
 */
export function makeItemId(item, taken) {
  if (typeof item.id === 'string' && item.id.trim()) {
    const own = authoredId(item.id);
    if (ID_PATTERN.test(own) && !taken.has(own)) {
      taken.add(own);
      return own;
    }
  }
  const slug = slugify(answerText(item), { words: 4 });
  return freeId(slug ? `i-${slug}` : 'i-item', taken);
}

// Concept ids: `c-` and the first four words of the term. Table ids: `t-` and the title.
export function makeConceptId(concept, taken) {
  const slug = slugify(String(concept.term ?? '').replace(/[{}]/g, ''), { words: 4 });
  return freeId(slug ? `c-${slug}` : 'c-concept', taken);
}

export function makeTableId(title, taken) {
  const slug = slugify(String(title).replace(/[{}]/g, ''), { words: 4 });
  return freeId(slug ? `t-${slug}` : 't-table', taken);
}
