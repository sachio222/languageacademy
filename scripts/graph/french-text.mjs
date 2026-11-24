// Finds the French inside text that mixes English and French: concept cards, hints, instructions, vocabulary
// notes, feedback and help screens. Used by course.mjs (lesson fields) and screens.mjs (help screen components).
import { fold } from './fold.mjs';
import { tokenize } from './fr/tokenize.mjs';
import { lookupKey } from './fr/forms.mjs';

const ENGLISH_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'i', 'you', 'he', 'she', 'we', 'they', 'to', 'of',
  'and', 'in', 'it', 'do', 'does', 'did', 'not', 'was', 'were',
]);
const FRENCH_DIACRITICS = /[àâäçéèêëîïôöùûüÿœæ]/i;

// The course's first English test: two common English words and no French accent. It decides which answers are
// English, so it stays as it is; mixed text needs the stricter isFrenchText below.
export function isEnglish(text) {
  const tokens = String(text).toLowerCase().match(/[a-z']+/g) ?? [];
  const hits = tokens.filter((t) => ENGLISH_WORDS.has(t)).length;
  return hits >= 2 && !FRENCH_DIACRITICS.test(text);
}

// English words that are not French words, compared with accents kept (the is English, thé is French). One of them
// marks a text as English: "I am" or "good day" passes isEnglish (fewer than two of its words), but no French text
// contains "am" or "good". The list holds the English words that course text quotes or mixes with French.
// french-text.test.mjs fails when a listed word is in the course word list, since French text with it would be
// dropped. A word French spells only rarely (note, but, vs) stays listed until the word list has it.
export const ENGLISH_ONLY = new Set(`
  i i'm i've i'll i'd you're you've you'll he's she's it's we're they're that's there's what's let's don't doesn't
  didn't can't won't isn't aren't wasn't weren't haven't hasn't wouldn't shouldn't couldn't
  the is are am was were be been being have has had having do does did done doing will would shall should can could
  may might must you he she we they it its my your his her our their them him us this that these those
  mine yours hers ours theirs myself yourself himself herself ourselves yourselves themselves everyone
  of to and in with for from by at about into over under after before between through during without within
  behind above below among around along near upstairs downstairs surrounding up back again
  what which who whom whose where when why how there here not no yes or but if so than then also just only
  very too much many more most some any all each every other another such own same both either neither
  good bad well new old big small first last little great high right left next better worse bigger smaller less
  hello hi bye goodbye please thanks thank sorry okay ok
  one two three four five seven eight nine ten second third
  say says said use uses used using mean means meant meaning like likes ask asks tell tells know knows
  word words sentence sentences paragraph section divider verb verbs noun nouns adjective adjectives adverb
  pronoun pronouns article articles answer form forms ending endings tense present past future
  singular plural masculine feminine formal informal literally literal translation translate french english
  people person thing things way time day days year years week night morning evening today tomorrow yesterday
  now still already almost maybe probably definitely surely seriously finally forever once rarely somewhere
  nowhere everywhere
  go goes going went come comes coming came get gets got make makes made want wants see sees look looks
  eat eats ate eaten drink drinks drank drunk speak speaks talk talks give gives giving take takes put puts
  find finds think thinks grow grows understand understands love listen pay careful
  sound sounds spelled spelling silent letter letters vowel vowels consonant consonants
  remember note notice example examples always never sometimes often usually
  my name friend friends family house home school work food water coffee bread book money language languages
  man daughter story world whole bird birds turtle squirrel rabbit butterfly bee plant plants blue yellow
  shop famous expensive tired sick wild dangerous crazy weird slang positive west african
  why because when while until since though although however anything something nothing everything
  practice review drop mark number city duration native special different polite vs etc rule
  subject object objects infinitive infinitives preposition prepositions possessive demonstrative partitive
  superlative connector connectors comma negate negation negative affirmative imperative conditional
  progressive impersonal embedded reflexive reciprocal conjugated location frequency activity topics
  regular irregular conjugate conjugation conjugations contract contracts contraction pattern patterns
  preserves occasionally cognate cognates wakes separate starts need needs try wrong add remove invert
  completed homework specific repeated state order event events scene setting describe
  beginner friendly method softer advice directed directing necessity wishes
  cat cats dog dogs problem problems fact facts elision sequence stem command commands statement presence
  pretty sure infinite causative
`.split(/\s+/).filter(Boolean));

// French words that only French text uses. Text with one of them is French even when some of its words are missing
// from the course word list ("elle est avocate", "La Première Page").
const FRENCH_FUNCTION = new Set(`
  le la les l' un une des du de d' au aux à en et ou où je j' tu il elle nous vous ils elles te se m' t' s' c' ce
  ça qu' que qui ne n' pas mon ma mes ton ta tes sa ses notre nos votre vos leur leurs dans sur avec pour est
  sont suis es êtes sommes ai avons avez ont
`.split(/\s+/).filter(Boolean));

const DIACRITIC = /[àâäçéèêëîïôöùûüÿœæ]/i;

// Whether a text is French, at one of three levels (`as`):
// - 'quoted' (a quoted span, 'bon appétit'): French unless it is English by isEnglish or holds an English-only word.
//   A French word the course word list lacks must reach the checker and be reported as unknown, never be dropped.
// - 'example' (an unquoted part of a concept example, which is French apart from its English glosses): also at least
//   one word the word list knows and half its words known or accented, so "Ayez patience!" is French.
// - 'label' (other unquoted text: whole hints and notes, titles, terms, help screens), where English labels such as
//   "Rising Tone" or "Service Phrases" have no English-only word either: every word known or accented, or a French
//   function word and two in three words known or accented ("elle est avocate", "La Première Page").
// Without isWord (frenchWordTest), every level is the 'quoted' test.
export function isFrenchText(text, isWord = null, { as = 'label' } = {}) {
  if (isEnglish(text)) return false;
  const tokens = tokenize(text, { isWord: isWord ?? undefined });
  if (!tokens.length) return false;
  // A single letter ('s', 'z') is spelled out, not a word.
  if (tokens.length === 1 && [...tokens[0].fold].length === 1) return false;
  if (tokens.some((t) => ENGLISH_ONLY.has(t.norm))) return false;
  if (as === 'quoted' || !isWord) return true;
  const inList = tokens.filter((t) => isWord(lookupKey(t))).length;
  const known = tokens.filter((t) => isWord(lookupKey(t)) || DIACRITIC.test(t.surface)).length;
  if (as === 'example') return inList > 0 && known * 2 >= tokens.length;
  if (known === tokens.length) return true;
  return tokens.some((t) => FRENCH_FUNCTION.has(t.norm)) && known * 3 >= tokens.length * 2;
}

// Strips the punctuation and quote marks around a span. A closing single quote is stripped when the span opened
// with a quote or the mark follows no letter; after a letter it may be an elision (de l').
function trimSpan(s) {
  const quotedOpen = /^\s*['‘]/.test(s);
  let t = s.replace(/^[\s,.;:!?…)(\]["“”«»'‘’-]+/u, '').replace(/[\s,;:)(\][“”«»"-]+$/u, '');
  if (/['’]$/.test(t) && (quotedOpen || !/\p{L}['’]$/u.test(t))) t = t.slice(0, -1);
  return t.replace(/[\s,;:)(\][“”«»"-]+$/u, '').trim();
}

// Quoted spans: '…', "…", ‘…’, “…”, «…», each as { at, raw, text }. A single quote between two letters is an
// apostrophe (j'ai, aujourd'hui) and neither opens nor closes a span.
function spansAt(text) {
  const t = String(text);
  const out = [];
  const pairs = [/"([^"\n]+)"/g, /“([^”\n]+)”/g, /«([^»\n]+)»/g];
  for (const re of pairs) for (const m of t.matchAll(re)) out.push({ at: m.index, raw: m[1] });
  const single = /(?<!\p{L})['‘]((?:[^'‘’\n]|(?<=\p{L})['’](?=\p{L}))+?)['’](?!\p{L})/gu;
  for (const m of t.matchAll(single)) out.push({ at: m.index, raw: m[1] });
  return out.sort((a, b) => a.at - b.at).map((s) => ({ ...s, text: trimSpan(s.raw) })).filter((s) => s.text);
}

export function quotedSpans(text) {
  return spansAt(text).map((s) => s.text);
}

// A span quotes something other than French words when it follows a pronunciation cue (sounds like 'krwa',
// pronounced 'kom-pruh-non'), when it is a word part ('re-', 'buv-', 'tt'), or when it is quoted as wrong
// (NOT 'buvé', never 'je ai'), like the wrong answers the checker never reads.
// The cue and the span sit in one clause: "The 's' sound in 'ils sont'" and "Notice the 'z' sound? ... 'les'" quote French.
const PRONUNCIATION_CUE = /\b(?:sounds? like|pronounced|rhymes? with|sound \()[^.!?;]*$/i;
const WRONG_CUE = /\b(?:not|never)\s*$/i;
const VOWEL = /[aeiouyàâäéèêëîïôöùûüÿœæ]/i;

function quotesWords(text, s) {
  const before = text.slice(0, s.at);
  if (PRONUNCIATION_CUE.test(before) || WRONG_CUE.test(before)) return false;
  return !/^\s*-|-\s*$/.test(s.raw) && VOWEL.test(s.text);
}

// Unquoted example text splits into segments between parentheses (usually an English gloss), →, =, " - ",
// " or ", |, ;, /, : and newlines.
const SEGMENT_BREAK = /[()\n→=|;/:]|\s[-–—]\s|,?\sor\s/g;

const uniq = (list) => [...new Set(list)];

// The French in a mixed text, in order, without repeats.
// - 'segments' (concept terms, titles, help screens): each segment that is French ('label' level), else the French
//   quoted spans inside it. A segment that holds a quoted span is read through its spans only.
// - 'example' (concept examples): the same, with segments judged at the 'example' level.
// - 'quoted' (hints, instructions, notes, definitions): the whole text when it is French and quotes nothing, else
//   its French quoted spans.
// - 'spans': French quoted spans only.
export function frenchIn(text, mode, isWord = null) {
  if (typeof text !== 'string' || !text.trim()) return [];
  const all = spansAt(text).filter((s) => quotesWords(text, s));
  const spans = (from, to) => all.filter((s) => s.at >= from && s.at < to && isFrenchText(s.text, isWord, { as: 'quoted' }))
    .map((s) => s.text);
  const quotes = (from, to) => spansAt(text.slice(from, to)).length > 0;
  if (mode === 'segments' || mode === 'example') {
    const as = mode === 'example' ? 'example' : 'label';
    const out = [];
    let from = 0;
    for (const m of [...text.matchAll(SEGMENT_BREAK), { index: text.length, 0: '' }]) {
      const to = m.index;
      const seg = trimSpan(text.slice(from, to));
      if (seg) out.push(...(!quotes(from, to) && isFrenchText(seg, isWord, { as }) ? [seg] : spans(from, to)));
      from = to + m[0].length;
    }
    return uniq(out);
  }
  if (mode === 'quoted' && !quotes(0, text.length) && isFrenchText(text, isWord)) return [text.trim()];
  return uniq(spans(0, text.length));
}

// The isWord test for isFrenchText from the graph: a headword, form or name. A letter of the alphabet does not count,
// so "I" or "a" alone is not French.
export function frenchWordTest(graph, index) {
  return (key) => graph.names.has(key) || (index.get(key) ?? []).some((r) => r.pos !== 'alphabet');
}
