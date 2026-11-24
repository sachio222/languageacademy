// Reads every lesson module of the course into one normalized shape.
// Every exercise shape the course uses is turned into Items with a `french` list;
// anything the reader does not understand lands in `unreadShapes` (never dropped).
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fold } from './fold.mjs';

const ENGLISH_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'i', 'you', 'he', 'she', 'we', 'they', 'to', 'of',
  'and', 'in', 'it', 'do', 'does', 'did', 'not', 'was', 'were',
]);
const FRENCH_DIACRITICS = /[àâäçéèêëîïôöùûüÿœæ]/i;
const ARRAYS_NOT_EXERCISES = new Set(['concepts', 'vocabularyReference', 'exercises', 'sentences', 'fillInBlanksSentences']);
// Connectors that end a two-blank answer such as "ai fait ensuite".
const TAIL_CONNECTOR = /^(.+?)\s+(parce que|pendant que|ensuite|donc|puis|car|mais|quand|alors)$/i;

export function isEnglish(text) {
  const tokens = String(text).toLowerCase().match(/[a-z']+/g) ?? [];
  const hits = tokens.filter((t) => ENGLISH_WORDS.has(t)).length;
  return hits >= 2 && !FRENCH_DIACRITICS.test(text);
}

export function stripPassage(markdown) {
  return String(markdown)
    .replace(/!\[[^\]]*\]/g, '')
    .replace(/\*\*[^*\n]+?:\s*\*\*\s*/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const tidy = (s) => s.replace(/\s+/g, ' ').trim();

// Fill the ___ blanks of `text` with `answer`. One blank: plain replace. Several blanks:
// the answer may span the words between blanks ("ai pas aimé" for "n'___ pas ___"),
// may hold one word per blank, or may end in a connector for the last blank.
function fillBlanks(text, answer) {
  const segs = text.split('___');
  const k = segs.length - 1;
  if (k === 0) return tidy(text);
  if (k === 1) return tidy(segs[0] + answer + segs[1]);
  const lower = answer.toLowerCase();
  const middle = segs.slice(1, -1).map((s) => s.trim());
  if (middle.every((s) => s && lower.includes(s.toLowerCase()))) {
    return tidy(segs[0] + answer + segs[segs.length - 1]);
  }
  let chunks = null;
  const tokens = answer.split(/\s+/).filter(Boolean);
  if (tokens.length === k) chunks = tokens;
  else if (k === 2) {
    const m = TAIL_CONNECTOR.exec(answer.trim());
    if (m) chunks = [m[1], m[2]];
  }
  if (!chunks) chunks = [answer, ...Array(k - 1).fill('')];
  let out = segs[0];
  for (let i = 0; i < k; i++) out += chunks[i] + segs[i + 1];
  return tidy(out);
}

function splitPrompt(prompt) {
  // "Complete: Hier, j'___ français (Yesterday, I spoke French) - Use 'parler'"
  let rest = String(prompt).replace(/^Complete[^:]*:\s*/, '');
  let english = null;
  const paren = rest.indexOf(' (');
  if (paren >= 0) {
    const close = rest.indexOf(')', paren);
    english = rest.slice(paren + 2, close >= 0 ? close : undefined).trim() || null;
    rest = rest.slice(0, paren);
  } else {
    rest = rest.replace(/\s+-\s+Use\b.*$/, '');
  }
  return { text: rest.trim(), english };
}

function quoted(instruction) {
  const m = /['"‘“]([^'"’”]+)['"’”]/.exec(instruction ?? '');
  return m ? m[1] : null;
}

function answerItem(ref, source, it) {
  const lenientIn = Array.isArray(it.acceptableAnswers) ? it.acceptableAnswers : [];
  const french = [it.expectedAnswer].filter((s) => !isEnglish(s));
  // French-to-English item: the answer is English, so the French prompt is the French the learner sees.
  const frenchPrompt = !french.length && typeof it.prompt === 'string' && it.prompt.trim() && !isEnglish(it.prompt);
  if (frenchPrompt) french.push(it.prompt.trim());
  const lenient = lenientIn.filter((s) => typeof s === 'string' && !isEnglish(s));
  return {
    ref,
    source,
    french,
    lenient,
    englishPrompt: !frenchPrompt && french.length && typeof it.prompt === 'string' ? it.prompt : null,
    instruction: typeof it.instruction === 'string' ? it.instruction : null,
  };
}

function readConfigItems(cfg, key, unread, items) {
  if (!Array.isArray(cfg.items)) {
    unread.push(`${key}.items`);
    return;
  }
  cfg.items.forEach((it, i) => {
    const ref = `${key}.items[${i}]`;
    if (it && typeof it.expectedAnswer === 'string') {
      items.push(answerItem(ref, 'items', it));
    } else if (it && typeof it.key === 'string' && (it.conjugations ?? cfg.conjugations)?.[it.key]?.combined) {
      // the conjugation table sits on the config (type conjugation) or on each item (type mixed)
      const c = (it.conjugations ?? cfg.conjugations)[it.key];
      items.push({
        ref, source: 'items', french: [c.combined], lenient: [],
        englishPrompt: c.englishFull ?? c.english ?? null,
        instruction: typeof it.context === 'string' ? it.context : null,
      });
    } else {
      unread.push(`${ref}:unreadable`);
    }
  });
}

function readExercises(list, key, unread, items, fills) {
  list.forEach((ex, i) => {
    const ref = `${key}.exercises[${i}]`;
    if (ex?.type === 'fillblank' && typeof ex.prompt === 'string' && typeof ex.answer === 'string') {
      const { text, english } = splitPrompt(ex.prompt);
      fills.set(fold(text), ex.answer);
      items.push({
        ref, source: 'exercises', french: [fillBlanks(text, ex.answer)], lenient: [],
        englishPrompt: english, instruction: null,
      });
    } else if (ex && !ex.type && typeof ex.expectedAnswer === 'string') {
      items.push(answerItem(ref, 'exercises', ex));
    } else {
      unread.push(`exercises[${i}]:type=${ex?.type}`);
    }
  });
}

function readSentences(list, key, unread, items) {
  list.forEach((s, i) => {
    if (typeof s?.text !== 'string' || !Array.isArray(s.blanks)) {
      unread.push(`sentences[${i}]:unreadable`);
      return;
    }
    let out = s.text;
    [...s.blanks].sort((a, b) => b.position - a.position).forEach((b) => {
      out = out.slice(0, b.position) + b.answer + out.slice(b.position);
    });
    items.push({
      ref: `${key}.sentences[${i}]`, source: 'sentences', french: [tidy(out)], lenient: [],
      englishPrompt: quoted(s.instruction),
      instruction: typeof s.instruction === 'string' ? s.instruction : null,
    });
  });
}

// fillInBlanksSentences are bare "…___… (English)" strings. The answer is the one from the
// fillblank exercise with the same text; with no such exercise the blank is left out.
function readFib(list, key, unread, items, fills) {
  list.forEach((s, i) => {
    if (typeof s !== 'string') {
      unread.push(`fillInBlanksSentences[${i}]:unreadable`);
      return;
    }
    const { text, english } = splitPrompt(s);
    const answer = fills.get(fold(text)) ?? '';
    items.push({
      ref: `${key}.fillInBlanksSentences[${i}]`, source: 'fib', french: [fillBlanks(text, answer)],
      lenient: [], englishPrompt: english, instruction: null,
    });
  });
}

export function readModule(mod, position, unitId, unitTitle = null) {
  const key = mod.moduleKey;
  const items = [];
  const unread = [];
  const shapes = new Set();
  const fills = new Map();

  if (mod.exerciseConfig) {
    const before = items.length;
    readConfigItems(mod.exerciseConfig, 'exerciseConfig', unread, items);
    if (items.length > before) shapes.add('items');
  }
  if (Array.isArray(mod.exercises) && mod.exercises.length) {
    shapes.add('exercises');
    readExercises(mod.exercises, key, unread, items, fills);
  }
  if (Array.isArray(mod.sentences) && mod.sentences.length) {
    shapes.add('sentences');
    readSentences(mod.sentences, key, unread, items);
  }
  if (Array.isArray(mod.fillInBlanksSentences) && mod.fillInBlanksSentences.length) {
    shapes.add('fib');
    readFib(mod.fillInBlanksSentences, key, unread, items, fills);
  }
  if (typeof mod.readingPassage?.text === 'string') {
    shapes.add('passage');
    items.push({
      ref: `${key}.readingPassage`, source: 'passage', french: [stripPassage(mod.readingPassage.text)],
      lenient: [], englishPrompt: null, instruction: null,
    });
  }
  for (const [k, v] of Object.entries(mod)) {
    if (Array.isArray(v) && v.length && !ARRAYS_NOT_EXERCISES.has(k)) unread.push(k);
  }

  let kind = 'lesson';
  if (mod.isUnitExam) kind = 'exam';
  else if (mod.isFillInTheBlank) kind = 'practice';
  else if (mod.isReadingComprehension) kind = 'reading';
  else if (mod.isHelpModule) kind = 'help';

  return {
    position,
    moduleKey: key,
    title: mod.title,
    unitId,
    unitTitle,
    kind,
    vocab: (mod.vocabularyReference ?? []).map((v) => v.french).filter((f) => typeof f === 'string'),
    conceptTerms: (mod.concepts ?? []).map((c) => c.term).filter((t) => typeof t === 'string'),
    items,
    shapes: [...shapes],
    unreadShapes: unread,
  };
}

export async function readCourse(repoRoot) {
  const file = path.join(repoRoot, 'src/lessons/unitConfigLoader.js');
  const { unitConfigs } = await import(pathToFileURL(file).href);
  const out = [];
  const seen = new Set();
  for (const unit of unitConfigs) {
    if (String(unit.metadata.title).startsWith('Reference')) continue;
    for (const mod of unit.modules) {
      if (seen.has(mod.moduleKey)) continue;
      seen.add(mod.moduleKey);
      out.push(readModule(mod, out.length + 1, unit.metadata.id, unit.metadata.title));
    }
  }
  return out;
}
