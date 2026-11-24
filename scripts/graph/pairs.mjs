// Language pairs: what a learner's native language lets them read in the target language before a lesson teaches
// it. A pair lives in curriculum-graph/pairs/<native>-<target>/; today it holds one file, cognates.json:
//   lesson        the moduleKey of the lesson that introduces cognates, or null (no lesson, so no allowance)
//   words         { id, native, kind }: a target headword, its native word, and how the two spellings relate
//   falseFriends  { id, native, means }: a headword that looks like a native word but means something else
// No pair file means no cognates: every cognate is an ordinary untaught word.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// exact: same spelling. accent: differs only by accents. ending: a regular ending swap (-ie/-y, -ique/-ic, -eur/-or,
// -iste/-ist, -ité/-ity, -el/-al, -aire/-ary, -eux/-ous, -isme/-ism, -er/-e on verbs). close: recognizable but
// irregular (musée/museum, idée/idea).
export const COGNATE_KINDS = ['exact', 'accent', 'ending', 'close'];

// Where a cognate may appear before it is taught: only in French the learner reads or hears, or also in French the
// learner types.
export const ALLOW_IN = ['shown', 'all'];

// Language names for report text. A code without a name is printed as the code.
const LANGUAGE_NAMES = { en: 'English', es: 'Spanish', fr: 'French', ja: 'Japanese', de: 'German', it: 'Italian', pt: 'Portuguese' };
export const languageName = (code) => LANGUAGE_NAMES[code] ?? code;

export const pairFile = (graphDir, native, target) => join(graphDir, 'pairs', `${native}-${target}`, 'cognates.json');

const text = (v) => typeof v === 'string' && v.trim() !== '';

// Every problem with the shape of a cognates file, as plain sentences. [] when it is well formed.
export function checkPairShape(data) {
  const problems = [];
  if (!data || typeof data !== 'object' || Array.isArray(data)) return ['the file must hold one object'];
  if (data.lesson !== null && !text(data.lesson)) problems.push('lesson must be a moduleKey or null');
  const list = (field, extra) => {
    if (!Array.isArray(data[field])) {
      problems.push(`${field} must be a list`);
      return;
    }
    const seen = new Set();
    data[field].forEach((w, i) => {
      if (!w || typeof w !== 'object') {
        problems.push(`${field}[${i}] must be an object`);
        return;
      }
      if (!text(w.id)) problems.push(`${field}[${i}] needs an id`);
      else if (seen.has(w.id)) problems.push(`${field} lists ${w.id} twice`);
      else seen.add(w.id);
      if (!text(w.native)) problems.push(`${field}[${i}] needs its native word`);
      extra(w, i);
    });
  };
  list('words', (w, i) => {
    if (!COGNATE_KINDS.includes(w.kind)) problems.push(`words[${i}] has kind ${JSON.stringify(w.kind)}; use one of ${COGNATE_KINDS.join(', ')}`);
  });
  list('falseFriends', (w, i) => {
    if (!text(w.means)) problems.push(`falseFriends[${i}] needs means, what the word means in the target language`);
  });
  return problems;
}

// The pair for a native and a target language. Throws, naming the file, when the file is unreadable or malformed.
export function loadPair(graphDir, native, target) {
  const file = pairFile(graphDir, native, target);
  if (!existsSync(file)) return { native, target, file: null, lesson: null, words: [], falseFriends: [] };
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`Pair file is not valid JSON: ${file} (${err.message})`);
  }
  const problems = checkPairShape(data);
  if (problems.length) throw new Error(`Pair file is malformed: ${file}: ${problems.join('; ')}`);
  return { native, target, file, lesson: data.lesson, words: data.words, falseFriends: data.falseFriends };
}
