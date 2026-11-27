// A made-up test language, zz, with the smallest module the interface allows (scripts/graph/language.mjs): words split on
// spaces and punctuation, the shared form index, a plain answer check and no dictionary. It imports nothing French.
import { fold, norm } from '../../../fold.mjs';
import { makeForms } from '../../../forms.mjs';

const RUN = /\p{L}+/gu;

function tokenize(text) {
  const tokens = [];
  let sentence = 0;
  let prev = 0;
  const source = String(text).normalize('NFC');
  for (const m of source.matchAll(RUN)) {
    if (tokens.length && /[.!?\n]/.test(source.slice(prev, m.index))) sentence += 1;
    prev = m.index + m[0].length;
    tokens.push({ surface: m[0], norm: norm(m[0]), fold: fold(m[0]), clitic: false, sentence });
  }
  return tokens;
}

const ENGLISH = /\b(the|is|are|a|an|i|you|hello|cat|cats)\b/i;
const isNativeText = (s) => ENGLISH.test(String(s)) && !/\b(ka|kota|sela)\b/i.test(String(s));

// The zz pieces of a mixed string: the whole string when it holds a zz word, else nothing.
const targetIn = (text, _mode, isWord) => (tokenize(text).some((t) => isWord?.(t.fold)) ? [String(text).trim()] : []);

const plain = (s) => String(s).trim().toLowerCase().replace(/[\s.!?]+$/, '');
function checkAnswer(item, typed, ctx = {}) {
  const right = ctx.blank != null ? item.blanks?.[ctx.blank] : item;
  return [right?.answer, ...(right?.accept ?? [])].filter(Boolean).some((a) => plain(a) === plain(typed));
}

export default {
  code: 'zz',
  locale: 'en',
  exampleWord: 'kota',
  fold, norm, tokenize, lenient: (t) => String(t),
  ...makeForms({ fold, norm }),
  isNativeText, targetIn,
  targetWordTest: (graph, index) => (key) => graph.names.has(key) || index.has(key),
  checkAnswer,
  dictionaryForms: async () => new Set(),
  popupKeys: (t) => [t.fold, t.fold],
};
