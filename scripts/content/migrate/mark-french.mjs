// Marks the French inside native text with braces (spec 5.3), using the language-graph checker's own reading of
// mixed text (scripts/graph/fr/text.mjs frenchIn), so the content checker sees the French today's checker sees.
// Quote marks stay outside the braces ("Use '{être}'"), so the live text, with braces removed, is unchanged.
// Pure apart from the word test passed in.
import { frenchIn } from '../../graph/fr/text.mjs';
import { tokenize } from '../../graph/fr/tokenize.mjs';

const escape = (s) => s.replace(/\{/g, '\\{');
const QUOTE_BEFORE = /['‘"“«]\s*$/;
const LETTER = /\p{L}/u;

// Positions of `needle` in `text` at word edges, from `from` on.
function occurrences(text, needle, from) {
  const out = [];
  for (let i = text.indexOf(needle, from); i !== -1; i = text.indexOf(needle, i + 1)) {
    const before = text[i - 1];
    const after = text[i + needle.length];
    const edgeL = i === 0 || !LETTER.test(before) || !LETTER.test(needle[0]);
    const edgeR = after === undefined || !LETTER.test(after) || !LETTER.test(needle.at(-1));
    if (edgeL && edgeR) out.push(i);
  }
  return out;
}

/**
 * @param text    native text (English with French)
 * @param mode    frenchIn's mode for this field: 'segments' | 'example' | 'quoted' | 'spans'
 * @param opts    { isWord?: frenchWordTest, own?: Set<string> } own: folded tokens of a wrong answer the learner typed
 *                (feedback), left unmarked as today's checker leaves them unread
 * @returns the text with `{…}` around each French piece, literal braces escaped
 */
export function markFrench(text, mode, { isWord = null, own = null } = {}) {
  if (typeof text !== 'string' || text === '') return text;
  if (/[{}]/.test(text)) return escape(text); // already marked by hand, or literal braces: leave the reading to a person
  let pieces = frenchIn(text, mode, isWord);
  if (own) pieces = pieces.filter((s) => !tokenize(s).every((t) => own.has(t.fold)));
  if (!pieces.length) return text;
  // Each piece at its first free place after the last one, preferring a quoted place.
  const spans = [];
  let cursor = 0;
  for (const piece of pieces) {
    const at = occurrences(text, piece, cursor).filter((i) => !spans.some((s) => i < s.end && i + piece.length > s.start));
    if (!at.length) continue;
    const pick = at.find((i) => QUOTE_BEFORE.test(text.slice(0, i))) ?? at[0];
    spans.push({ start: pick, end: pick + piece.length });
    cursor = pick + piece.length;
  }
  spans.sort((a, b) => a.start - b.start);
  let out = '';
  let last = 0;
  for (const s of spans) {
    if (s.start < last) continue;
    out += escape(text.slice(last, s.start)) + '{' + text.slice(s.start, s.end).replace(/\{/g, '') + '}';
    last = s.end;
  }
  return out + escape(text.slice(last));
}

// The text a learner sees: braces removed, escaped braces literal.
export function unmark(text) {
  return typeof text === 'string' ? text.replace(/\\\{/g, '\u0000').replace(/[{}]/g, '').replace(/\u0000/g, '{') : text;
}
