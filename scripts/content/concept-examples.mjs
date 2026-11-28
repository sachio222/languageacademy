// The examples on a concept card or a Reference section: a list of { fr, en?, note? } with an optional layout
// ("list": one example per row; "forms": a verb's person forms in two columns). Pure: no file access, so Vite can
// import it. The language comes in as data: `persons` is the language pack's list of persons (scripts/graph/<code>/
// language.mjs), each [singular pronouns, plural pronouns], in the order the columns pair them.
//
// Also the reader of the old one-string examples ("{Je veux ça} (I want that), ..."), for the migration
// (scripts/content/concept-cards.mjs): readExampleString turns a string into a list when it can read every piece.
import { parseSpans } from './spans.mjs';

export const EXAMPLES_MIN = 1;
export const EXAMPLES_MAX = 6;
export const LAYOUTS = ['list', 'forms', 'plain'];

// A formula, not a sentence: a plus sign, an equals sign, -> or any arrow character (U+2190 to U+21FF).
const FORMULA = /[+=←-⇿]|->/;
export const isFormula = (fr) => FORMULA.test(String(fr));

/* ---------- concept_inline_list ---------- */

// Sentences of native text, cut at . ! ? followed by a space (outside French spans), so a French span's own end mark
// never cuts the sentence.
function sentences(text) {
  const out = [];
  let cur = [];
  for (const part of parseSpans(text)) {
    if (part.lang === 'fr') {
      cur.push(part);
      continue;
    }
    const pieces = part.text.split(/(?<=[.!?])\s+/);
    pieces.forEach((p, i) => {
      if (i > 0) {
        out.push(cur);
        cur = [];
      }
      if (p) cur.push({ lang: 'native', text: p });
    });
  }
  out.push(cur);
  return out;
}

// The text between two French spans joins them into a list when it is short (at most GAP characters) and holds a
// comma, a semicolon or a slash ("{ce}, {cet}", "{vingt} (20), {trente}", "{je}/{tu}", "{veux}, then il/elle use
// {veut}"), or is only "and" or "or" ("{cette} and {ces}").
const GAP = 40;
const joinsList = (between) => between.length <= GAP && (/[,;/]/.test(between) || /^\s*(and|or)\s*$/i.test(between));

/**
 * The runs of three or more French spans that a sentence strings together as a list (concept_inline_list), each run
 * as the list of its spans' French. Prose that names one or two French words in a sentence has none.
 */
export function inlineListRuns(text) {
  const runs = [];
  for (const sentence of sentences(String(text ?? ''))) {
    let run = [];
    let between = null; // native text since the last French span, or null before the first
    for (const part of sentence) {
      if (part.lang === 'native') {
        if (between !== null) between += part.text;
        continue;
      }
      if (between !== null && !joinsList(between)) {
        if (run.length >= 3) runs.push(run);
        run = [];
      }
      run.push(part.text.trim());
      between = '';
    }
    if (run.length >= 3) runs.push(run);
  }
  return runs;
}

/* ---------- concept_forms_pair ---------- */

const APOSTROPHES = /[’‘ʼ`]/g;

/** The person an example's French starts with: { number: 'singular' | 'plural', rank } or null. */
export function personOf(fr, persons) {
  const text = String(fr).trim().toLowerCase().replace(APOSTROPHES, "'");
  for (const [rank, [singular, plural]] of persons.entries()) {
    for (const [number, list] of [['singular', singular], ['plural', plural]]) {
      for (const p of list) {
        const elided = p.endsWith("'");
        if (elided ? text.startsWith(p) && text.length > p.length : text === p || text.startsWith(p + ' ')) return { number, rank };
      }
    }
  }
  return null;
}

/**
 * What keeps a forms card from drawing as two columns, as messages: an odd count, an example that does not start with
 * a person, or a pair whose persons do not match. The first half are the singular forms and the second half their
 * plurals in the same order (je with nous, tu with vous, il, elle or on with ils or elles). Without persons, only the
 * count is checked.
 */
export function formsProblems(examples, persons) {
  const list = Array.isArray(examples) ? examples : [];
  if (list.length % 2 !== 0) return [`a forms card has an even number of examples, singular forms then their plurals; found ${list.length}`];
  if (!Array.isArray(persons) || persons.length === 0) return [];
  const out = [];
  const half = list.length / 2;
  const who = list.map((x) => personOf(x?.fr ?? '', persons));
  list.forEach((x, i) => {
    if (!who[i]) out.push(`${JSON.stringify(x?.fr ?? '')} does not start with a person`);
  });
  if (out.length) return out;
  for (let k = 0; k < half; k++) {
    const one = who[k];
    const many = who[k + half];
    if (one.number !== 'singular' || many.number !== 'plural' || one.rank !== many.rank)
      out.push(`${JSON.stringify(list[k].fr)} and ${JSON.stringify(list[k + half].fr)} are not a singular and its plural; list the singular forms first, then their plurals in the same order`);
  }
  return out;
}

/* ---------- reading an old example string (the migration) ---------- */

// Split at top-level ", " and "; " (outside braces and brackets), as L's reader does (prototypes/l/j-steps.js splitTop).
export function splitTop(s) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let k = 0; k < s.length; k++) {
    const ch = s[k];
    if (ch === '(' || ch === '{') depth++;
    if (ch === ')' || ch === '}') depth = Math.max(0, depth - 1);
    if ((ch === ',' || ch === ';') && depth === 0 && s[k + 1] === ' ') {
      out.push(cur.trim());
      cur = '';
      k++;
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// "{fr} (en)" or "'en' ({fr})": one example with its meaning.
function pairOf(seg) {
  let m = /^\{([^{}]+)\}\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)$/.exec(seg);
  if (m) return { fr: m[1].trim(), en: m[2].trim() };
  m = /^'(.+?)'\s*\(\{([^{}]+)\}\)$/.exec(seg);
  if (m) return { fr: m[2].trim(), en: m[1].trim() };
  return null;
}

// "{fr}" alone: French with no meaning.
function frenchOnly(seg) {
  const m = /^\{([^{}]+)\}$/.exec(seg);
  return m ? { fr: m[1].trim() } : null;
}

/**
 * An old example string as a list, when every piece reads as an example (lang: the language pack, for plainItems):
 *   { status: 'converted', examples, layout? }   every piece has its meaning, or every piece is a person form
 *                                                that pairs up (layout 'forms')
 *   { status: 'converted', layout: 'plain', examples: [{ text }], dropped? }   a run of short items in the learner's
 *                                                language, with no French marks
 *   { status: 'needs_meaning', examples }        French pieces with no meaning, not person forms
 *   { status: 'unconvertible', reason }          prose, a label, a formula (+, →, =), more than six examples, English
 *                                                that carries French marks, or a piece it cannot read
 */
// A run of three or more short items with no French marks ("Hello, thank you, yes, no, please, goodbye - universal
// communication"): a list in the learner's language, which is a plain card, never French rows with a play button. A
// closing remark after " - " is left out and named. lang.isNativeExample, when given, must call the run the learner's
// language. Returns null when the text is not such a run.
const PLAIN_ITEM_WORDS = 4;
export function plainItems(text, lang) {
  const s = String(text ?? '').trim();
  if (!s || /[{}]/.test(s)) return null;
  const tail = /^(.*?)\s+-\s+([^-]+)$/.exec(s);
  const head = tail ? tail[1] : s;
  const segs = splitTop(head);
  if (segs.length < 3) return null;
  // An item that opens with and, or or but continues a sentence ("Used to confirm, agree, or point to something").
  if (segs.some((x) => !x || x.split(/\s+/).length > PLAIN_ITEM_WORDS || /[.?!:;()]/.test(x) || /^(and|or|but)\b/i.test(x))) return null;
  if (typeof lang?.isNativeExample === 'function' && !lang.isNativeExample(head)) return null;
  const examples = segs.map((x) => ({ text: x.charAt(0).toUpperCase() + x.slice(1) }));
  return tail ? { examples, dropped: tail[2].trim() } : { examples };
}

export function readExampleString(text, persons, lang) {
  const s = String(text ?? '').trim();
  if (!s) return { status: 'unconvertible', reason: 'empty' };
  if (/^[^{]*:\s/.test(s)) return { status: 'unconvertible', reason: 'a label before the examples' };
  // A run of French items all inside one pair of braces ("{je veux, tu veux}") reads as its items.
  const whole = /^\{([^{}]+)\}$/.exec(s);
  const segs = whole && splitTop(whole[1]).length > 1 ? splitTop(whole[1]).map((x) => `{${x}}`) : splitTop(s);
  const pairs = segs.map(pairOf);
  const tooMany = { status: 'unconvertible', reason: 'more than six examples: two cards or a table' };
  if (pairs.every(Boolean)) {
    if (pairs.some((p) => isFormula(p.fr))) return { status: 'unconvertible', reason: 'a formula, not a sentence' };
    if (pairs.some((p) => /[{}]/.test(p.en))) return { status: 'unconvertible', reason: 'English with French marks in it' };
    if (pairs.length > EXAMPLES_MAX) return tooMany;
    return { status: 'converted', examples: pairs };
  }
  const bare = segs.map(frenchOnly);
  if (bare.every(Boolean)) {
    if (bare.some((p) => isFormula(p.fr))) return { status: 'unconvertible', reason: 'a formula, not a sentence' };
    if (bare.length > EXAMPLES_MAX) return tooMany;
    if (bare.length >= 2 && formsProblems(bare, persons).length === 0 && Array.isArray(persons) && persons.length) {
      return { status: 'converted', layout: 'forms', examples: bare };
    }
    // Person forms written singular and plural mixed (je, tu, il, nous, ...) pair up once the plurals move after.
    const who = bare.map((x) => (Array.isArray(persons) ? personOf(x.fr, persons) : null));
    if (bare.length >= 2 && who.every(Boolean)) {
      const ordered = [...bare.filter((_, i) => who[i].number === 'singular'), ...bare.filter((_, i) => who[i].number === 'plural')];
      if (formsProblems(ordered, persons).length === 0) return { status: 'converted', layout: 'forms', examples: ordered };
    }
    return { status: 'needs_meaning', examples: bare };
  }
  const plain = plainItems(s, lang);
  if (plain) return { status: 'converted', layout: 'plain', ...plain };
  if (!/\{/.test(s)) return { status: 'unconvertible', reason: 'prose with no French examples' };
  return { status: 'unconvertible', reason: 'pieces it cannot read as examples' };
}
