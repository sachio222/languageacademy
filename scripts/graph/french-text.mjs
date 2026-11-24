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
// contains "am" or "good".
const ENGLISH_ONLY = new Set(`
  i i'm i've i'll i'd you're you've you'll he's she's it's we're they're that's there's what's let's don't doesn't
  didn't can't won't isn't aren't wasn't weren't haven't hasn't wouldn't shouldn't couldn't
  the is are am was were be been being have has had having do does did done doing will would shall should can could
  may might must you he she we they it its my your his her our their them him us this that these those
  of to and in with for from by at about into over under after before between through during without within
  what which who whom whose where when why how there here not no yes or but if so than then also just only
  very too much many more most some any all each every other another such own same both either neither
  good bad well new old big small first last little great high right left next
  hello hi bye goodbye please thanks thank sorry okay ok
  one two three four five seven eight nine ten
  say says said use uses used using mean means meant meaning like likes say ask asks tell tells know knows
  word words sentence sentences verb verbs noun nouns adjective adjectives pronoun pronouns
  article articles answer form forms ending endings tense present past future
  singular plural masculine feminine formal informal literally literal translation translate
  people person thing things way time day days year years week night morning evening today tomorrow yesterday
  go goes going went come comes coming came get gets got make makes made want wants see sees look looks
  eat eats drink drinks speak speaks talk talks give gives take takes put puts find finds think thinks
  sound sounds like spelled spelling silent letter letters vowel vowels consonant consonants
  remember note notice example examples only always never sometimes often usually
  my name friend friends family house home school work food water coffee bread
  why because when while until since though although however anything something nothing everything
  practice review drop mark number city duration native special different polite vs etc
  subject object infinitive infinitives preposition prepositions possessive connector connectors comma
  negate negation negative affirmative imperative conditional progressive impersonal embedded reflexive
  regular irregular conjugate conjugation conjugations contract contracts contraction pattern patterns
  preserves occasionally
`.split(/\s+/).filter(Boolean));

// isWord(key) answers whether a token's lookup key is a French word the graph knows (headword, form or name).
// Without it, text is French when it has no English word. With it, every word of a one- or two-word text must be
// French, and four in five words of a longer one (a French sentence may hold a word the graph lacks).
export function isFrenchText(text, isWord = null) {
  if (isEnglish(text)) return false;
  const tokens = tokenize(text, { isWord: isWord ?? undefined });
  if (!tokens.length) return false;
  // A single letter ('s', 'z') is spelled out, not a word.
  if (tokens.length === 1 && [...tokens[0].fold].length === 1) return false;
  if (tokens.some((t) => ENGLISH_ONLY.has(t.norm))) return false;
  if (!isWord) return true;
  const known = tokens.filter((t) => isWord(lookupKey(t))).length;
  return tokens.length <= 2 ? known === tokens.length : known >= 0.8 * tokens.length;
}

// Strips the punctuation and quote marks around a span. A closing single quote is stripped when the span opened
// with a quote or the mark follows no letter; after a letter it may be an elision (de l').
function trimSpan(s) {
  const quotedOpen = /^\s*['‘]/.test(s);
  let t = s.replace(/^[\s,.;:!?…)(\]["“”«»'‘’-]+/u, '').replace(/[\s,;:)(\][“”«»"-]+$/u, '');
  if (/['’]$/.test(t) && (quotedOpen || !/\p{L}['’]$/u.test(t))) t = t.slice(0, -1);
  return t.replace(/[\s,;:)(\][“”«»"-]+$/u, '').trim();
}

// Quoted spans: '…', "…", ‘…’, “…”, «…». A single quote between two letters is an apostrophe (j'ai,
// aujourd'hui) and neither opens nor closes a span.
export function quotedSpans(text) {
  const t = String(text);
  const out = [];
  const pairs = [/"([^"\n]+)"/g, /“([^”\n]+)”/g, /«([^»\n]+)»/g];
  for (const re of pairs) for (const m of t.matchAll(re)) out.push({ at: m.index, text: m[1] });
  const single = /(?<!\p{L})['‘]((?:[^'‘’\n]|(?<=\p{L})['’](?=\p{L}))+?)['’](?!\p{L})/gu;
  for (const m of t.matchAll(single)) out.push({ at: m.index, text: m[1] });
  return out.sort((a, b) => a.at - b.at).map((s) => trimSpan(s.text)).filter(Boolean);
}

// Unquoted example text splits into segments between parentheses (usually an English gloss), →, =, " - ",
// " or ", |, ;, /, : and newlines.
const SEGMENT_BREAK = /[()\n→=|;/:]|\s[-–—]\s|,?\sor\s/;

const uniq = (list) => [...new Set(list)];

// The French in a mixed text, in order, without repeats.
// - 'segments' (concept examples, titles, help screens): each segment that is French, else the French quoted spans
//   inside it.
// - 'quoted' (hints, instructions, notes, definitions): the whole text when it is French, else its French quoted
//   spans.
// - 'spans': French quoted spans only.
export function frenchIn(text, mode, isWord = null) {
  if (typeof text !== 'string' || !text.trim()) return [];
  const spans = (t) => quotedSpans(t).filter((x) => isFrenchText(x, isWord));
  if (mode === 'segments') {
    return uniq(String(text).split(SEGMENT_BREAK).flatMap((raw) => {
      const seg = trimSpan(raw);
      if (!seg) return [];
      return isFrenchText(seg, isWord) ? [seg] : spans(raw);
    }));
  }
  if (mode === 'quoted' && isFrenchText(text, isWord)) return [text.trim()];
  return uniq(spans(text));
}

// The isWord test for isFrenchText from the graph: a headword, form or name. A letter of the alphabet does not count,
// so "I" or "a" alone is not French.
export function frenchWordTest(graph, index) {
  return (key) => graph.names.has(key) || (index.get(key) ?? []).some((r) => r.pos !== 'alphabet');
}
