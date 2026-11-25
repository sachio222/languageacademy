// word_id proposals (spec 8.1; L rule DATA-7 and contracts/curriculum.sql `words`). One id per taught meaning:
// - the first meaning taught takes the live dictionary id (`aller-fr`); a phrase with none gets `<slug>-fr`
//   (`je-suis-fr`). Ids follow L's pattern, so accents, spaces and apostrophes are folded: `être-fr` is `etre-fr`.
// - a later new meaning of the same spelling takes a sense suffix (`le-fr.object-pronoun`);
// - the same meaning met again keeps its id.
// Every spelling met twice returns a `review` line, since only a person can settle "same meaning" or "new meaning".
// Pure: the caller passes the dictionary and keeps `seenBySpelling` across modules, in course order.
import { slugify } from './item-ids.mjs';

export const WORD_ID_PATTERN = /^[a-z0-9][a-z0-9-]*-fr(\.[a-z0-9-]+)?$/;
const MAX = 100;

// One spelling whatever its end mark: "ça va?" and "ça va", "Pense!" and "pense".
const spellingOf = (fr) =>
  String(fr)
    .trim()
    .toLowerCase()
    .replace(/[’ʼ‘]/g, "'")
    .normalize('NFC')
    .replace(/^[¿¡\s]+|[\s?!.…]+$/g, '');

// A grammar role that separates two meanings with one spelling, read from the gloss's brackets and the note:
// `nous` "we" and `nous` "us (stressed)"; `vous` "you (formal/plural)" with the note "object, formal or groups".
// The module key is not read: a lesson about discourse markers also teaches "maybe" in its first meaning.
// A "-self" gloss is reflexive too ("myself"). Discourse use counts only when the gloss says it in brackets
// ("well / so (discourse use)"); a note such as "now discourse use" on "alors" (so / then) is the same meaning.
const SELF = /\b(?:myself|yourself|himself|herself|itself|oneself|ourselves|yourselves|themselves)\b/;
const ROLES = [
  ['reflexive', /\breflexive\b/, 'reflexive', 'note'],
  ['stressed', /\bstressed\b/, 'stressed', 'note'],
  ['object', /\bobject\b/, 'object-pronoun', 'note'],
  ['discourse', /\bdiscourse\b/, 'discourse', 'brackets'],
];
function roleOf(e) {
  const brackets = (String(e.english).match(/\(([^)]*)\)/g) || []).join(' ').toLowerCase();
  const withNote = `${brackets} ${e.note ?? ''}`.toLowerCase();
  // Only a lone pronoun ("nous" = "ourselves") splits on it; "tu te lèves" is one verb however it is glossed.
  if (!/\s/.test(String(e.french).trim()) && SELF.test(String(e.english).toLowerCase())) return 'reflexive';
  return ROLES.find(([, re, , where]) => re.test(where === 'note' ? withNote : brackets))?.[0] ?? null;
}

// "that/it (informal)" -> ["that", "it"]; "excuse me / sorry" -> ["excuse me", "sorry"].
function alternatives(gloss) {
  return String(gloss)
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .split(/\/|,|;|\bor\b/)
    .map((s) => s.replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

// A card written as a question ("Tu comprends?") is another sense of the statement ("tu comprends"): both
// are taught as cards, so they need two ids.
const isQuestion = (e) => /\?\s*$/.test(String(e.french));

function sameMeaning(a, b) {
  if (roleOf(a) !== roleOf(b) || isQuestion(a) !== isQuestion(b)) return false;
  const xs = alternatives(a.english);
  const ys = alternatives(b.english);
  const within = (s, t) => ` ${t} `.includes(` ${s} `);
  return xs.some((x) => ys.some((y) => x === y || within(x, y) || within(y, x)));
}

function suffixFor(entry) {
  const role = roleOf(entry);
  if (role) return ROLES.find(([r]) => r === role)[2];
  if (isQuestion(entry)) return 'question';
  return slugify(alternatives(entry.english)[0] ?? entry.english, { words: 3 }) || 'sense';
}

function fit(id) {
  return id.length <= MAX ? id : id.slice(0, MAX);
}

function idsTaken(seenBySpelling) {
  const owner = new Map();
  for (const [spelling, list] of seenBySpelling) for (const e of list) owner.set(e.word_id, spelling);
  return owner;
}

/**
 * @param entry          { french, english, note?, module_key? }
 * @param seenBySpelling Map<spelling, Array<{ word_id, french, english, note, module_key }>>, kept across calls
 * @param dictionary     Map<spelling, live dictionary id> (`être` -> `être-fr`)
 * @returns { word_id, review: string|null }; the entry is added to seenBySpelling
 */
export function proposeWordId(entry, seenBySpelling, dictionary = new Map()) {
  const spelling = spellingOf(entry.french);
  const dictId = dictionary.get(spelling) ?? dictionary.get(String(entry.french).trim());
  const stem = slugify(dictId ? dictId.replace(/-fr$/, '') : spelling) || 'word';
  const base = fit(`${stem}-fr`).replace(/-fr$/, '') + '-fr';
  const prior = seenBySpelling.get(spelling) ?? [];
  const owner = idsTaken(seenBySpelling);
  const free = (id) => !owner.has(id) || owner.get(id) === spelling;
  let word_id;
  let review = null;

  const same = prior.find((p) => sameMeaning(p, entry));
  if (same) {
    word_id = same.word_id;
    review = `same meaning as "${same.english}" in ${same.module_key}: kept ${word_id}`;
  } else {
    const takenHere = new Set(prior.map((p) => p.word_id));
    if (prior.length === 0 && free(base)) word_id = base;
    else {
      const suffix = suffixFor(entry);
      let candidate = fit(`${base}.${suffix}`);
      for (let n = 2; takenHere.has(candidate) || !free(candidate); n++) candidate = fit(`${base}.${suffix}-${n}`);
      word_id = candidate;
    }
    if (prior.length) {
      const was = prior.map((p) => `"${p.english}" (${p.word_id}, ${p.module_key})`).join('; ');
      review = `new meaning "${entry.english}": ${word_id}; met before as ${was}`;
    } else if (word_id !== base) {
      review = `${base} already names "${owner.get(base)}", a different spelling: ${word_id}`;
    }
  }
  seenBySpelling.set(spelling, [...prior, { word_id, french: entry.french, english: entry.english, note: entry.note ?? '', module_key: entry.module_key ?? null }]);
  return { word_id, review };
}

// A word that a written file already holds, added to seenBySpelling so later proposals see it.
export function rememberWord(word, moduleKey, seenBySpelling) {
  const spelling = spellingOf(word.fr);
  const prior = seenBySpelling.get(spelling) ?? [];
  seenBySpelling.set(spelling, [...prior, { word_id: word.word_id, french: word.fr, english: word.gloss, note: word.note ?? '', module_key: moduleKey }]);
}
