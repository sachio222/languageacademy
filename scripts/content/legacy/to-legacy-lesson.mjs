// toLegacyLesson: a converted module as the lesson object today's src/lessons/lessonData.js puts in `lessons[]`
// (moduleBuilder.js buildLesson plus lessonData's id, title prefix and exercise ids). It exists for the golden test
// (scripts/content/test/golden.test.mjs), which proves the conversion kept everything a learner sees; the live app
// never reads it (Jake 2026-11-25: new content goes to L only). Pure: no fs, no app imports.
//
// Text comes back without span braces (spans.mjs). What the module files no longer hold (dropped fields, joined
// prompts, rewritten items) is not invented: the golden test allows each such difference by its migration-report line.
import { toLegacyExercise } from './to-legacy-exercise.mjs';
import { parseSpans } from '../spans.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
// Native text as a learner reads it: span braces removed, an escaped brace literal.
export const plain = (t) => (typeof t === 'string' ? parseSpans(t).map((p) => p.text).join('') : t);

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];

// The four guides the live app draws with their own React components (LessonView.jsx picks them by module key);
// every other guide is a data guide that GuideScreen draws from `guide.sections`.
const COMPONENT_GUIDES = /(liaison-help|cognates-help|questions-help|verb-pattern-help)$/;

/** Live position and title prefix: unit modules in course order, then the Reference shelf (Reference I, II, …). */
function placeOf(mod, course) {
  if (mod.position) return { id: mod.position, prefix: `Module ${mod.position}: ` };
  const last = course.units.reduce((n, u) => n + u.modules.length, 0);
  const at = course.shelf.pages.findIndex((p) => p.module_key === mod.module_key);
  if (at === -1) throw new Error(`toLegacyLesson: ${mod.module_key} is neither in a unit nor on the shelf`);
  return { id: last + at + 1, prefix: `Reference ${ROMAN[at]}: ` };
}

// A conjugation table row this transform item asks for: the builder generated it from the table
// (moduleBuilder.js buildExercises, type conjugation or mixed), so its prompt is the row's English.
function tableRowOf(item, mod) {
  if (item.type !== 'transform') return null;
  for (const t of mod.tables || []) {
    if (plain(t.title) !== item.shown) continue;
    const row = t.rows.find((r) => r.fr === item.answer);
    if (row) return row;
  }
  return null;
}

/** One item as the exercise the live screens read. */
function exerciseOf(item, mod, id, displayNumber) {
  const base = toLegacyExercise(item, { liveId: id });
  const ex = { id, instruction: undefined, prompt: undefined, hint: plain(base.hint), expectedAnswer: base.expectedAnswer, acceptableAnswers: base.acceptableAnswers, tense: null, verb: null };
  switch (item.type) {
    case 'translate':
      ex.prompt = plain(item.prompt);
      break;
    case 'respond':
      if (isStr(item.cue)) {
        ex.instruction = plain(item.situation);
        ex.prompt = plain(item.cue);
      } else ex.prompt = plain(item.situation);
      break;
    case 'transform': {
      ex.instruction = plain(item.instruction);
      const row = tableRowOf(item, mod);
      if (row) {
        // The builder's prompt is the row's English; the conversion joined a fuller one onto the instruction.
        const joined = new RegExp(`^(.*): (.+)$`).exec(ex.instruction);
        if (joined && joined[2] !== row.en && joined[1].includes(`"${row.en}"`)) {
          ex.instruction = joined[1];
          ex.prompt = joined[2];
        } else ex.prompt = row.en;
        ex.tense = 'present';
        ex.verb = item.shown;
        delete ex.acceptableAnswers; // the builder writes none for generated exercises
      } else ex.prompt = item.shown;
      break;
    }
    case 'meaning':
      ex.instruction = plain(item.instruction);
      ex.prompt = item.shown;
      break;
    case 'gapfill': {
      // A Unit 9 fill-blank exercise: the sentence with its blanks, the gloss after it, the blanks' answers joined.
      ex.type = 'fillblank';
      ex.prompt = `${item.text}${isStr(item.gloss) ? ` (${plain(item.gloss)})` : ''}`;
      // The answer typed today: the blanks' words joined with one space ("As trouvé" for "___-tu ___"); the text
      // between the blanks stays in the sentence (ledger ruling 2026-11-25 Task 8, as L's item-level mistakes join).
      ex.answer = item.blanks.map((b) => b.answer).join(' ');
      ex.expectedAnswer = ex.answer;
      ex.acceptableAnswers = [];
      break;
    }
    case 'comprehension':
      ex.instruction = plain(item.question);
      ex.prompt = plain(item.cue);
      break;
    case 'choice': {
      ex.prompt = plain(item.question);
      ex.expectedAnswer = plain((item.options || []).find((o) => o.right)?.text);
      ex.acceptableAnswers = [];
      break;
    }
    default:
      throw new Error(`toLegacyLesson: ${mod.module_key} item ${item.id} has type ${item.type}`);
  }
  // A wrong answer written today as a bare string shows the checker's own words (migrate/items.mjs mistakesOf).
  ex.wrongAnswers = base.wrongAnswers.map((w) =>
    plain(w.feedback) === `Expected: "${ex.expectedAnswer}"` ? w.answer : { answer: w.answer, feedback: plain(w.feedback) },
  );
  ex.displayNumber = displayNumber;
  return ex;
}

// Today's word-list exercises on a Reference page, built from its words (moduleBuilder.js buildVocabularyExercises).
function wordListExercises(mod) {
  return (mod.vocabulary || []).map((w, i) => ({
    id: `${mod.module_key}.${i + 1}`,
    instruction: `Translate "${w.gloss}" to French`,
    prompt: w.gloss,
    hint: plain(w.note) || `The French word/phrase for "${w.gloss}"`,
    expectedAnswer: w.fr,
    article: null,
    tense: null,
    verb: null,
    vocabulary: w.fr,
    wrongAnswers: [],
    displayNumber: i + 1,
  }));
}

const vocabularyOf = (mod) =>
  (mod.vocabulary || []).map((w) => {
    const v = { french: w.fr, english: w.gloss };
    if (w.note !== undefined) v.note = plain(w.note);
    if (w.example_fr !== undefined) v.example = w.example_fr;
    // A reading card's info card is today's `wikipedia` tooltip card (its credit is new: today's card has none).
    if (w.info_card) {
      const { image_credit, ...card } = w.info_card;
      v.wikipedia = Object.fromEntries(Object.entries(card).filter(([, x]) => x !== null));
    }
    return v;
  });

const conceptOf = (c) => {
  const out = { id: c.id, term: plain(c.term), definition: plain(c.definition) };
  if (c.example !== undefined) out.example = plain(c.example);
  return out;
};

// The spelling patterns page: its sections are today's frenchPhonics.js sounds, each with spelling rows.
const isPhonicsPage = (mod) => mod.kind === 'reference' && !mod.screen && (mod.sections || []).some((s) => Array.isArray(s.rows));

// Passage blocks back in today's markup: paragraphs separated by a blank line, a speaker as "**Name:** ", a scene
// heading as "## ", a picture as ![src] with its caption after it. The translation keeps an empty paragraph where a picture stands.
function passageOf(mod) {
  const text = [];
  const translation = [];
  for (const b of mod.passage || []) {
    const speaker = isStr(b.speaker) ? `**${b.speaker}:** ` : '';
    if (b.img) {
      text.push(`![${b.img.src}]`);
      translation.push('');
    }
    const head = b.layout === 'scene' ? '## ' : '';
    if (isStr(b.fr)) text.push(`${head}${speaker}${b.fr}`);
    if (isStr(b.en)) translation.push(`${head}${speaker}${b.en}`);
  }
  return { text: text.join('\n\n'), translation: translation.join('\n\n') };
}

// A practice gap-fill as today's sentence: each ___ back to a one-character blank at its position (FillInTheBlank.jsx
// draws the blank in place of the character at `position`).
function sentenceOf(item) {
  let text = '';
  const blanks = [];
  const parts = String(item.text).split('___');
  parts.forEach((part, i) => {
    if (i === 0) {
      text += part;
      return;
    }
    const b = item.blanks[i - 1];
    // The blank stands on a space: the one after ___ ("Tu ___ un chat." was "Tu  un chat."), or, before a mark, the
    // one before it ("chiens ___." was "chiens .").
    if (!part.startsWith(' ') && text.endsWith(' ')) text = text.slice(0, -1);
    blanks.push({ position: text.length, answer: b.answer, ...(isStr(item.hint) && item.blanks.length === 1 ? { hint: plain(item.hint) } : {}) });
    text += ' ';
    text += part.startsWith(' ') ? part.slice(1) : part;
  });
  // Several blank hints were joined with " / " (migrate/items.mjs convertSentence); split back when that is unambiguous.
  if (item.blanks.length > 1 && isStr(item.hint)) {
    const hints = plain(item.hint).split(' / ');
    if (hints.length === item.blanks.length) blanks.forEach((b, i) => (b.hint = hints[i]));
    else blanks[0].hint = plain(item.hint);
  }
  const out = { text, blanks };
  if (isStr(item.gloss)) out.instruction = plain(item.gloss);
  return out;
}

// A data guide's parts back as today's guide.sections: the text is the rule, the first block the rows, a second
// lines block the examples (guide.mjs guideFromSections). A part's note (today's row notes, joined) comes back as
// the section's note, so the test sees it.
function guideOf(mod) {
  const sections = (mod.parts || []).map((p) => {
    const s = { heading: plain(p.heading), rule: (p.text || []).map(plain).join('\n\n') };
    if (isStr(p.note)) s.note = plain(p.note);
    const [first, second] = p.blocks || [];
    const rowsOf = (b) => (b ? (b.pairs ?? b.lines ?? []).map(([fr, en]) => ({ french: fr, english: en })) : []);
    if (first) s.rows = rowsOf(first);
    if (second) s.examples = rowsOf(second);
    return s;
  });
  return { sections };
}

/**
 * @param mod   a module from loadCourse() (course.modules), status written
 * @param opts  { liveIds: content/fr/legacy/live-ids.json, course: loadCourse() }
 * @returns the object lessonData.js builds for this module today
 */
export function toLegacyLesson(mod, { liveIds, course }) {
  if (mod.status !== 'written') throw new Error(`toLegacyLesson: ${mod.module_key} is ${mod.status}; the caller skips planned modules`);
  const { id, prefix } = placeOf(mod, course);
  const ids = liveIds?.[mod.module_key] ?? { items: {}, concepts: {} };
  const liveOf = new Map(Object.entries(ids.items || {}).map(([live, item]) => [item, live]));
  const kind = mod.kind;

  let exercises = [];
  let sentences = null;
  if (kind === 'practice') sentences = (mod.items || []).map(sentenceOf);
  else if (kind === 'reference') exercises = mod.screen ? [] : wordListExercises(mod);
  else if (kind !== 'guide') exercises = (mod.items || []).map((item, i) => exerciseOf(item, mod, liveOf.get(item.id) ?? `${mod.module_key}.${item.id}`, i + 1));

  let concepts = [];
  if (kind === 'lesson') concepts = (mod.concepts || []).map(conceptOf);
  else if (kind === 'reference' && !isPhonicsPage(mod))
    concepts = (mod.sections || []).map((s) => conceptOf({ id: s.id, term: s.heading, definition: s.text, example: s.example }));

  return {
    moduleKey: mod.module_key,
    title: `${prefix}${plain(mod.title)}`,
    description: plain(mod.description),
    concepts,
    vocabularyReference: vocabularyOf(mod),
    exercises,
    skipStudyMode: mod.options?.study_mode === false,
    isReadingComprehension: kind === 'reading',
    readingPassage: kind === 'reading' ? passageOf(mod) : null,
    isUnitExam: kind === 'unit_exam',
    unitNumber: kind === 'unit_exam' ? mod.unit_index : null,
    isFillInTheBlank: kind === 'practice',
    sentences,
    isPhonicsReference: isPhonicsPage(mod),
    isHelpModule: kind === 'guide',
    guide: kind === 'guide' && !COMPONENT_GUIDES.test(mod.module_key) ? guideOf(mod) : null,
    id,
  };
}
