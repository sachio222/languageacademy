// Today's exercises as content items (spec 5.4, 6). Each source exercise becomes one item of a declared type:
// - exerciseConfig items (custom) and untyped exercises[]: type from today's classifier
//   (scripts/graph/rules/item-kinds.mjs), mapped so every string the live screen shows keeps a field;
// - conjugation and mixed configs: the builder's generated exercises (moduleBuilder.js buildExercises), written out
//   as literal `transform` items;
// - Unit 9 `fillblank` exercises and practice `sentences[]`: `gapfill` items with one `___` per blank.
// Native text gets its French marked with braces (mark-french.mjs). Pure apart from the classifier and checker
// it reads; report lines go to the caller.
import { classifyItem } from '../../graph/rules/item-kinds.mjs';
import { isEnglish, ENGLISH_ONLY } from '../../graph/french-text.mjs';
import { markFrench } from './mark-french.mjs';
import { tokenize } from '../../graph/fr/tokenize.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const tidy = (s) => String(s).replace(/\s+/g, ' ').trim();
const LETTER = /\p{L}/u;
const SPACE = /\s/;

// For comparing what a person sees: lowercase, straight quotes, no braces or punctuation, single spaces.
export function normText(s) {
  return String(s ?? '')
    .replace(/\\\{/g, '{')
    .replace(/[{}]/g, '')
    .toLowerCase()
    .replace(/[’ʼ‘`]/g, "'")
    .replace(/[“”«»"]/g, ' ')
    .normalize('NFC')
    .replace(/[.,!?;:()[\]…→=+/*-]+/g, ' ')
    .replace(/(^|\s)'+|'+(\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const stripParens = (s) => String(s).replace(/\([^)]*\)/g, ' ');
// A word only English uses, as the checker lists them: "your office → ___ bureau" is not French text.
function hasEnglishWord(s) {
  return String(s)
    .toLowerCase()
    .split(/[^a-z']+/)
    .some((w) => w && ENGLISH_ONLY.has(w));
}
const MEANING_QUESTION = /^(?:What does|When do you use) ['"‘“]([^'"’”]+)['"’”]/;

// An instruction that says only "translate this prompt": "Translate to French", "Translate:", Say "I am" for the
// prompt "I am". The type says it, so it has no field (report: dropped_field, generic).
export function isGenericInstruction(instruction, prompt) {
  if (!isStr(instruction)) return true;
  const ins = instruction.trim();
  if (/^translate(?: (?:this|it))?(?: (?:to|into) french)?\s*[:.]?$/i.test(ins)) return true;
  const m = /^(?:translate|say|ask)\s*:?\s*(?:to french\s*:?\s*)?(["'‘“])(.+)(["'’”])\s*[.!?]?$/i.exec(ins);
  if (!m) return false;
  const quoted = normText(m[2]);
  return quoted !== '' && (quoted === normText(prompt) || quoted === normText(stripParens(prompt)));
}

// "Complete: Hier, j'___ français (Yesterday, I spoke French) - Use 'parler'" -> text, gloss and the hint after it.
export function splitFillPrompt(prompt) {
  let rest = String(prompt).replace(/^Complete[^:]*:\s*/, '');
  let gloss = null;
  let suffix = null;
  const paren = rest.indexOf(' (');
  if (paren >= 0) {
    const close = rest.indexOf(')', paren);
    gloss = rest.slice(paren + 2, close >= 0 ? close : undefined).trim() || null;
    suffix = close >= 0 ? rest.slice(close + 1).replace(/^\s*-\s*/, '').trim() || null : null;
    rest = rest.slice(0, paren);
  } else {
    const m = /\s+-\s+(.*)$/.exec(rest);
    if (m) {
      suffix = m[1].trim() || null;
      rest = rest.slice(0, m.index);
    }
  }
  return { text: rest.trim(), gloss, suffix };
}

// Connectors that end a two-blank answer such as "ai fait ensuite" (as scripts/graph/course.mjs reads them).
const TAIL_CONNECTOR = /^(.+?)\s+(parce que|pendant que|ensuite|donc|puis|car|mais|quand|alors)$/i;

// One answer per blank: "ai pas aimé" for "n'___ pas ___" is ["ai", "aimé"]. Null when it cannot be split.
export function splitBlankAnswer(text, answer) {
  const segs = text.split('___');
  const k = segs.length - 1;
  if (k <= 1) return [answer.trim()];
  const middle = segs.slice(1, -1).map((s) => s.trim());
  if (middle.every((s) => s)) {
    let restA = answer.trim();
    const out = [];
    let ok = true;
    for (const mid of middle) {
      const i = restA.toLowerCase().indexOf(mid.toLowerCase());
      if (i <= 0) {
        ok = false;
        break;
      }
      out.push(restA.slice(0, i).trim());
      restA = restA.slice(i + mid.length).trim();
    }
    if (ok && restA) return [...out, restA];
  }
  const tokens = answer.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === k) return tokens;
  if (k === 2) {
    const m = TAIL_CONNECTOR.exec(answer.trim());
    if (m) return [m[1], m[2]];
  }
  return null;
}

const wordAt = (text, p) => {
  let a = p;
  let b = p;
  while (a > 0 && LETTER.test(text[a - 1])) a -= 1;
  while (b < text.length && LETTER.test(text[b])) b += 1;
  return text.slice(a, b);
};

// The practice screen shows each blank in place of the character at its position. A blank on a space is where
// the author meant; one on a letter cuts a word, one on a mark drops the mark, one past the end sits after the full
// stop. Those are placed where the language-graph checker places them (fillSentence in scripts/graph/course.mjs):
// the nearest free double space, else before the final mark, else the start of the word. Returns the text with
// `___` markers and the misplaced blanks.
export function placeBlanks(text, blanks) {
  const runs = [...text.matchAll(/\s{2,}/g)].map((m) => ({ start: m.index, end: m.index + m[0].length, used: false }));
  const placed = [];
  const misplaced = [];
  const problems = [];
  for (const b of [...blanks].sort((x, y) => x.position - y.position)) {
    const p = b.position;
    if (p < text.length && !LETTER.test(text[p])) {
      const run = runs.find((r) => p >= r.start && p < r.end);
      if (run) run.used = true;
      if (!SPACE.test(text[p])) problems.push({ blank: b, word: null, mark: text[p] });
      placed.push({ b, at: p, skip: SPACE.test(text[p]) });
    } else misplaced.push(b);
  }
  for (const b of misplaced) {
    const p = b.position;
    problems.push({ blank: b, word: p < text.length ? wordAt(text, p) : null, mark: null });
    const dist = (r) => (p < r.start ? r.start - p : Math.max(0, p - r.end + 1));
    const free = runs.filter((r) => !r.used).sort((x, y) => dist(x) - dist(y))[0];
    if (free) {
      free.used = true;
      placed.push({ b, at: free.start, skip: true });
    } else if (p >= text.length) {
      placed.push({ b, at: /[.!?…]*\s*$/.exec(text).index, skip: false });
    } else {
      let a = p;
      while (a > 0 && LETTER.test(text[a - 1])) a -= 1;
      placed.push({ b, at: a, skip: false });
    }
  }
  placed.sort((x, y) => x.at - y.at);
  let out = '';
  let last = 0;
  const order = [];
  for (const { b, at, skip } of placed) {
    out += text.slice(last, Math.max(last, at));
    const lead = out === '' || /['’]$/.test(out) ? '' : ' ';
    last = Math.max(last, at + (skip ? 1 : 0));
    const trail = /['’]$/.test(b.answer) || /^[-.,!?;:)'’]/.test(text[last] ?? '') ? '' : ' ';
    out += lead + '___' + trail;
    order.push(b);
  }
  out += text.slice(last);
  return { text: tidy(out).replace(/\s+([.,])/g, '$1'), blanks: order, problems };
}

// A wrong answer as a mistake. A bare string shows the live screen's own words, `Expected: "<answer>"`.
function mistakesOf(wrongAnswers, expected, mark) {
  const out = [];
  for (const w of Array.isArray(wrongAnswers) ? wrongAnswers : []) {
    const answer = typeof w === 'string' ? w : w?.answer;
    if (!isStr(answer)) continue;
    const feedbackRaw = typeof w === 'string' || !isStr(w?.feedback) ? `Expected: "${expected}"` : w.feedback;
    const own = new Set(tokenize(answer).map((t) => t.fold));
    out.push({ answer: answer.trim(), feedback: mark(feedbackRaw, 'quoted', own) });
  }
  return out;
}

function acceptOf(list, answer) {
  const out = [];
  for (const a of Array.isArray(list) ? list : []) if (isStr(a) && !out.includes(a.trim())) out.push(a.trim());
  return out.filter((a) => a !== answer);
}

/**
 * One typed exercise (exerciseConfig custom item, untyped exercises[] entry, or a builder-generated conjugation
 * exercise) as an item. `src` = { ref, live: { instruction, prompt, hint, expectedAnswer, acceptableAnswers,
 * wrongAnswers }, explanation?, conjugation?: { verb } }; `nm` is readModule's module and `it` its item for this ref.
 * ctx = { unitIndex, kind, isWord }. Returns { item, lines } (lines without module_key) or { held: reason }.
 */
export function convertTyped(src, nm, it, ctx) {
  const lines = [];
  const add = (path, kind, detail) => lines.push({ path, kind, detail });
  const mark = (text, mode, own = null) => markFrench(text, mode, { isWord: ctx.isWord ?? null, own });
  const { instruction, prompt, hint, expectedAnswer } = src.live;
  const answer = String(expectedAnswer ?? '').trim();
  if (!answer) return { held: 'the exercise has no expected answer, so no learner can pass it' };
  const accept = acceptOf(src.live.acceptableAnswers, answer);
  const extra = {};
  if (isStr(hint)) extra.hint = mark(hint.trim(), 'quoted');
  const mistakes = mistakesOf(src.live.wrongAnswers, answer, mark);
  const finish = (item) => {
    const { answer: _, ...fields } = item;
    const out = { ...fields, answer, ...(accept.length ? { accept } : {}), ...extra };
    if (mistakes.length) out.mistakes = mistakes;
    return { item: out, lines };
  };

  if (src.conjugation) {
    return finish({ type: 'transform', instruction: mark(instruction, 'quoted'), shown: src.conjugation.verb, answer });
  }

  // English answers: "What does 'on' mean?" A question about use ("When do you use 'savoir'?") is no meaning item.
  const meaningQ = MEANING_QUESTION.exec(instruction ?? '');
  if (isEnglish(answer) || (meaningQ && hasEnglishWord(answer))) {
    if (/^When do you use/i.test(instruction ?? '')) return { held: 'asks when to use a word, with an English answer; no item type fits (rewrite as a choice item?)' };
    const shown = isStr(prompt) && !hasEnglishWord(prompt) ? prompt.trim() : meaningQ ? meaningQ[1] : String(prompt ?? '').trim();
    if (!isGenericMeaningInstruction(instruction, shown)) add(`${src.ref}.instruction`, 'dropped_field', `instruction "${instruction}" (a meaning item shows only the French)`);
    else add(`${src.ref}.instruction`, 'dropped_field', `generic instruction "${instruction}"`);
    return finish({ type: 'meaning', shown, answer });
  }

  const [cls, why] = classifyItem(nm, it);
  const guess = (detail) => add(src.ref, 'type_guess', `classifier: ${cls} (${why}); ${detail}`);
  if (why === 'English prompt with a French answer') guess('written as respond, the instruction as the situation');
  const scene = () => {
    const out = { type: 'respond', situation: isStr(instruction) ? mark(instruction.trim(), 'quoted') : mark(String(prompt).trim(), 'spans') };
    if (isStr(instruction) && isStr(prompt)) out.cue = mark(prompt.trim(), 'spans');
    return out;
  };

  if (cls === 'other') {
    const french = isStr(prompt) && !hasEnglishWord(stripParens(prompt));
    if (french && isStr(instruction)) return finish({ type: 'transform', instruction: mark(instruction.trim(), 'quoted'), shown: prompt.trim(), answer });
    if (!isStr(prompt)) return { held: `no prompt and a French answer "${answer}"; nothing tells the learner what to write` };
    guess(french ? 'French prompt with no instruction, written as respond' : 'English or mixed prompt, written as respond (instruction as situation, prompt as cue)');
    return finish(scene());
  }
  if (cls === 'situation') return finish(scene());

  // translate
  const generic = isGenericInstruction(instruction, prompt);
  if (!isStr(prompt)) return finish(scene());
  if (generic && ctx.unitIndex === 1 && ctx.kind === 'lesson') {
    if (isStr(instruction)) add(`${src.ref}.instruction`, 'dropped_field', `generic instruction "${instruction}"`);
    return finish({ type: 'translate', prompt: mark(prompt.trim(), 'spans') });
  }
  const where = ctx.kind === 'unit_exam' ? 'unit exams have no translate step' : ctx.unitIndex === 1 ? 'the instruction holds context a translate item has no field for' : 'translate is Unit 1 only';
  if (generic) {
    if (isStr(instruction)) add(`${src.ref}.instruction`, 'dropped_field', `generic instruction "${instruction}"`);
    add(src.ref, 'translate_to_respond', `${where}: the English prompt "${prompt}" is the situation`);
    return finish({ type: 'respond', situation: mark(prompt.trim(), 'spans') });
  }
  add(src.ref, 'translate_to_respond', `${where}: instruction as situation, prompt "${prompt}" as cue`);
  return finish(scene());
}

function isGenericMeaningInstruction(instruction, shown) {
  if (!isStr(instruction)) return true;
  if (/^translate(?: (?:this|it))?(?: (?:to|into) english)?\s*[:.]?$/i.test(instruction.trim())) return true;
  const m = /^What does ['"‘“]([^'"’”]+)['"’”] mean\?$/.exec(instruction.trim());
  return !!m && normText(m[1]) === normText(shown);
}

/** A Unit 9 `fillblank` exercise as a gapfill. Returns { item, lines } or { held }. */
export function convertFillblank(src, ctx) {
  const lines = [];
  const mark = (text, mode, own = null) => markFrench(text, mode, { isWord: ctx.isWord ?? null, own });
  const { text, gloss, suffix } = splitFillPrompt(src.raw.prompt);
  const answer = String(src.raw.answer ?? '').trim();
  if (!text.includes('___')) return { held: `the prompt "${src.raw.prompt}" has no ___ blank` };
  const parts = splitBlankAnswer(text, answer);
  if (!parts) return { held: `the answer "${answer}" cannot be split across the ${text.split('___').length - 1} blanks of "${text}"` };
  const item = { type: 'gapfill', text, blanks: parts.map((a) => ({ answer: a })) };
  if (gloss) item.gloss = mark(gloss, 'spans');
  if (/^Complete[^:]*:/.test(src.raw.prompt)) lines.push({ path: `${src.ref}.prompt`, kind: 'text_changed', detail: `"${/^Complete[^:]*:/.exec(src.raw.prompt)[0]}" prefix dropped; the sentence is the text` });
  const hint = src.raw.hint ?? suffix;
  if (isStr(hint)) item.hint = mark(hint.trim(), 'quoted');
  if (isStr(src.raw.hint) && suffix) lines.push({ path: `${src.ref}.prompt`, kind: 'dropped_field', detail: `"${suffix}" after the sentence (the exercise has its own hint)` });
  const mistakes = mistakesOf(src.raw.wrongAnswers, answer, mark);
  if (mistakes.length) item.mistakes = mistakes;
  return { item, lines };
}

/** A practice `sentences[]` entry as a gapfill. Returns { item, lines }. */
export function convertSentence(src, ctx) {
  const lines = [];
  const mark = (text, mode) => markFrench(text, mode, { isWord: ctx.isWord ?? null });
  const s = src.raw;
  const { text, blanks, problems } = placeBlanks(s.text, s.blanks);
  for (const p of problems) {
    const where = p.word ? `sits inside the word "${p.word}"` : p.mark ? `sits on the mark "${p.mark}", which the app drops` : 'sits after the end of the sentence';
    lines.push({ path: src.ref, kind: 'blank_misplaced', detail: `the blank for "${p.blank.answer}" at position ${p.blank.position} ${where}; placed as the checker reads it: "${text}"` });
  }
  const item = { type: 'gapfill', text, blanks: blanks.map((b) => ({ answer: String(b.answer).trim() })) };
  if (isStr(s.instruction)) {
    let g = s.instruction.trim().replace(/^Complete[^:]*:\s*/, '');
    const whole = /^(["'‘“])(.*)(["'’”])$/.exec(g);
    if (whole && !/['‘"“]/.test(whole[2].replace(/(?<=\p{L})['’](?=\p{L})/gu, ''))) g = whole[2];
    if (g !== s.instruction.trim()) lines.push({ path: `${src.ref}.instruction`, kind: 'text_changed', detail: `"${s.instruction}" written as the gloss "${g}"` });
    if (g) item.gloss = mark(g, 'spans');
  }
  const hints = blanks.map((b) => b.hint).filter(isStr).map((h) => h.trim());
  if (hints.length === 1) item.hint = mark(hints[0], 'quoted');
  else if (hints.length > 1) {
    item.hint = mark(hints.join(' / '), 'quoted');
    lines.push({ path: `${src.ref}.blanks`, kind: 'text_changed', detail: `${hints.length} blank hints joined into one hint` });
  }
  return { item, lines };
}
