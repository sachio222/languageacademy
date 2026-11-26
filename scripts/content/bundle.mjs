// buildBundle: Course -> la-bundle@1, the document L's curriculum_create_catalog_release takes as `bundle`
// (L build spec, contracts/curriculum.bundle.schema.json; content-layer spec section 7). No file access: the caller
// passes the dictionary, L's story records and the frozen position table (bundle-sources.mjs reads them).
//
// The bundle leaves out what curriculum computes (minutes, word counts, display numbers, position keys, content
// revisions). Steps sit inside entries. Items are keyed by item_id alone and placed in steps by item_ids, so an item
// asked in Writing and again in the lesson exam keeps one id and one answer key. Output is deterministic apart from
// build.built_at: canonicalJson sorts every key, and arrays follow the outline.
import { createHash } from 'node:crypto';
import { FREE_UNIT_KEY } from './assemble.mjs';
import { STEPS_BY_KIND } from './schema/module.mjs';
import { BLANK_MARKER, blankCount } from './schema/item.mjs';

export const FORMAT = 'la-bundle@1';
export const REFERENCE_PART = 'reference-content';
export const FREE_STEP_OUTSIDE_UNIT1 = 'vocabulary-intro';
// la-bundle@1 gives steps an access tier, never a Reference page's text (domains/curriculum.md, Reference shelf).
const REFERENCE_HAS_NO_TIER = null;

// L's step registry (domains/curriculum.md section 2) with prototype L's STEP_DEFS names. A guide's estimate is its
// own `minutes`.
export const STEP_DEFS = {
  'vocabulary-intro': { name: 'Vocabulary Intro', short_name: 'Vocabulary', estimate: 2, scored: false },
  pronunciation: { name: 'Pronunciation', short_name: 'Pronunciation', estimate: 3, scored: true },
  'flash-cards': { name: 'Flash Cards', short_name: 'Flash Cards', estimate: 2, scored: true },
  'speed-match': { name: 'Speed Match', short_name: 'Speed Match', estimate: 1, scored: true },
  writing: { name: 'Writing', short_name: 'Writing', estimate: 2, scored: true },
  conversation: { name: 'Conversation', short_name: 'Conversation', estimate: 4, scored: false, soon: true },
  'lesson-exam': { name: 'Lesson exam', short_name: 'Exam', estimate: 3, scored: true, pass_pct: 80 },
  'reading-passage': { name: 'Reading', short_name: 'Reading', estimate: 10, scored: true },
  'practice-exercises': { name: 'Practice', short_name: 'Practice', estimate: 5, scored: true },
  'exam-questions': { name: 'Unit exam', short_name: 'Unit exam', estimate: 12, scored: true, pass_pct: 80 },
  'interactive-help': { name: 'Guide', short_name: 'Guide', estimate: null, scored: false },
};

// Unit 1 is free; elsewhere only Vocabulary Intro is (L rule LRN-4). Never written in a file.
export const accessTier = (unitKey, sectionId) => (unitKey === FREE_UNIT_KEY || sectionId === FREE_STEP_OUTSIDE_UNIT1 ? 'free' : 'premium');

// L's own named-miss sentence (prototype L, j-bundle.js MISS) for typed items.
const MISS_TYPED = { text: 'You wrote {answer}. It’s {expected}.' };
const SPEED_MATCH_ID = 'speed-match';
const SPEED_MATCH_SIZE = 6;

/* ---------- canonical JSON and the hash ---------- */

const sortKeys = (v) =>
  Array.isArray(v) ? v.map(sortKeys) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])])) : v;

/** Every object's keys sorted; arrays keep their order. `indent` as JSON.stringify takes it. */
export const canonicalJson = (value, indent = 0) => JSON.stringify(sortKeys(value), null, indent || undefined);

/** SHA-256 hex of the canonical JSON without `build`: the hash names the content, whatever commit or time built it. */
export function bundleHash(bundle) {
  const { build, ...content } = bundle;
  return createHash('sha256').update(canonicalJson(content)).digest('hex');
}

/* ---------- small helpers ---------- */

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const dedupe = (xs) => [...new Set(xs)];
/** Only the fields that have a value; a prompt or block leaves the rest out. */
const defined = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null));
/** "you are (formal/plural)" -> "you are": a phrase's own meaning on the Pronunciation screen. */
export const withoutParentheses = (s) => s.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim() || s;

/* ---------- items ---------- */

const mistakesOf = (item) => (item.mistakes || []).map((m) => ({ answer: m.answer, feedback: m.feedback }));

// Words as a joined gap-fill answer is compared: lowercase, straight apostrophes, punctuation as spaces.
const wordsOf = (s) => String(s).toLowerCase().normalize('NFC').replace(/[’ʼ‘`]/g, "'").split(/[\s,.!?;:…]+/).filter(Boolean);

/**
 * A gap-fill's item-level mistakes (L ff1bc35: BlanksAnswerKey.mistakes, matched against every blank's answer joined
 * with one space). A mistake can match only when it has a word for every blank and none of its words is fixed text of
 * the sentence outside the blanks: "a fait donc" can be typed into "il ___ beau ___", but "ai pas aimer" never can be
 * typed into "Je n'___ pas ___", because "pas" is not a blank. Returns { matchable, unmatchable }; each unmatchable
 * mistake carries `why`, for the writers.
 */
export function splitBlankMistakes(item) {
  const fixed = new Set(wordsOf(item.text.replace(BLANK_MARKER, ' ')));
  const inBlanks = new Set(item.blanks.flatMap((b) => [b.answer, ...(b.accept || [])]).flatMap(wordsOf));
  const right = wordsOf(item.blanks.map((b) => b.answer).join(' ')).join(' ');
  const matchable = [];
  const unmatchable = [];
  for (const m of mistakesOf(item)) {
    const ws = wordsOf(m.answer);
    const outside = ws.filter((w) => fixed.has(w) && !inBlanks.has(w));
    if (outside.length) unmatchable.push({ ...m, why: `${outside.map((w) => `"${w}"`).join(', ')} is fixed text, not a blank` });
    else if (ws.length < item.blanks.length) unmatchable.push({ ...m, why: `fewer words than the ${item.blanks.length} blanks` });
    else if (ws.join(' ') === right) unmatchable.push({ ...m, why: 'it is the right answer' });
    else matchable.push(m);
  }
  return { matchable, unmatchable };
}
function typedKey(item, language = 'fr') {
  const key = { language, accept: dedupe([item.answer, ...(item.accept || [])]) };
  const mistakes = mistakesOf(item);
  if (mistakes.length) key.mistakes = mistakes;
  return key;
}
const frChoice = (o) => (o.fr === true ? `{${o.text}}` : o.text);
function choicesOf(itemId, options) {
  const choices = options.map((o, j) => ({ choice_id: `${itemId}.c${j + 1}`, text: frChoice(o) }));
  return { choices, answer_key: { correct_choice_id: choices[options.findIndex((o) => o.right === true)].choice_id } };
}

/**
 * One content item as a BundleItem. `note(kind, detail)` records what the mapping could not carry.
 * translate, respond, transform, gapfill and meaning are typed; choice is choice; comprehension is story_question.
 */
function bundleItem(item, note) {
  const base = { item_id: item.id, word_ids: [...(item.word_ids || [])] };
  const hint = item.hint;
  switch (item.type) {
    case 'translate':
      return { ...base, kind: 'typed', prompt: defined({ text: item.prompt, hint }), answer_key: typedKey(item), miss_text: MISS_TYPED };
    case 'respond':
      // The cue is the English the learner says in French ("hello / good day"): ItemPrompt.en, not a scene line.
      return { ...base, kind: 'typed', prompt: defined({ text: item.situation, en: item.cue, hint }), answer_key: typedKey(item), miss_text: MISS_TYPED };
    case 'transform':
      return { ...base, kind: 'typed', prompt: defined({ text: item.instruction, shown_fr: item.shown, hint }), answer_key: typedKey(item), miss_text: MISS_TYPED };
    case 'meaning':
      return {
        ...base,
        kind: 'typed',
        prompt: defined({ text: item.instruction ?? `What does {${item.shown}} mean?`, shown_fr: item.shown, hint }),
        answer_key: typedKey(item, 'en'),
        miss_text: MISS_TYPED,
      };
    case 'gapfill': {
      const blanks = item.blanks.map((b) => ({ accept: dedupe([b.answer, ...(b.accept || [])]) }));
      const key = { language: 'fr', blanks };
      const mistakes = mistakesOf(item);
      // A source mistake belongs to the item. With one blank it is that blank's; with several it is the item's, matched
      // against the blanks joined, when it can ever match (splitBlankMistakes).
      if (mistakes.length && blanks.length === 1) blanks[0].mistakes = mistakes;
      else if (mistakes.length) {
        const { matchable, unmatchable } = splitBlankMistakes(item);
        if (matchable.length) key.mistakes = matchable;
        for (const m of unmatchable)
          note('mistake_needs_rewrite', `${item.id}: "${m.answer}" can never match the ${blanks.length} blanks of "${item.text}" (${m.why})`);
      }
      const text = `{${item.text}}`;
      const markers = blankCount(text);
      if (markers !== blanks.length) note('blank_markers', `${item.id}: ${markers} ___ marker(s) for ${blanks.length} blank(s)`);
      return { ...base, kind: 'typed', prompt: defined({ text, en: item.gloss, hint }), answer_key: key, miss_text: MISS_TYPED };
    }
    case 'choice': {
      const { choices, answer_key } = choicesOf(item.id, item.options);
      return { ...base, kind: 'choice', prompt: defined({ text: item.question, hint }), choices, answer_key, miss_text: null };
    }
    case 'comprehension': {
      const prompt = defined({ text: item.question, sub: item.cue, hint });
      if (item.options) {
        // A picked story question: L's story_question takes typed keys only, so it travels as a choice item.
        note('comprehension_choice', `${item.id}: a picked story question is a choice item`);
        return { ...base, kind: 'choice', prompt, ...choicesOf(item.id, item.options), miss_text: null };
      }
      return { ...base, kind: 'story_question', prompt, answer_key: typedKey(item), miss_text: null };
    }
    default:
      throw new Error(`no bundle mapping for item type ${item.type}`);
  }
}

/** A guide check (spec 5.6) as a guide_check item: ask, why, say, show and sound in L's ItemPrompt fields. */
function guideCheckItem(c) {
  const { choices, answer_key } = choicesOf(c.id, c.options);
  return {
    item_id: c.id,
    kind: 'guide_check',
    prompt: defined({ text: c.ask, explain: c.why, audio_text: c.say, shown_fr: c.show, sound: c.sound }),
    choices,
    answer_key,
    miss_text: null,
    word_ids: [],
  };
}

/** Speed Match: one pair item from `speed_match` (six word_ids) or, by default, the lesson's first six words. */
function speedMatchItem(m, words, taken) {
  const ids = Array.isArray(m.speed_match) ? m.speed_match : words.slice(0, SPEED_MATCH_SIZE).map((w) => w.word_id);
  const cards = ids.map((id) => words.find((w) => w.word_id === id)).filter(Boolean);
  if (!cards.length) return null;
  if (taken.has(SPEED_MATCH_ID)) throw new Error(`${m.module_key}: item id ${SPEED_MATCH_ID} is taken, so Speed Match has no id`);
  const card = (side, k) => `${SPEED_MATCH_ID}.${side}${k + 1}`;
  return {
    item_id: SPEED_MATCH_ID,
    kind: 'pair',
    prompt: { text: 'Match each French word to its meaning.', left_label: 'French', right_label: 'English' },
    choices: [...cards.map((w, k) => ({ choice_id: card('l', k), text: w.text })), ...cards.map((w, k) => ({ choice_id: card('r', k), text: w.meaning_en }))],
    answer_key: { pairs: cards.map((_, k) => ({ left_id: card('l', k), right_id: card('r', k) })) },
    miss_text: null,
    word_ids: cards.map((w) => w.word_id),
  };
}

/* ---------- words and phrases ---------- */

const NO_DICTIONARY = { byId: new Map(), bySpelling: new Map() };
/** A word's live dictionary entry: by its word_id, else by its spelling (dictionary ids keep accents: être-fr). */
const dictionaryEntry = (dictionary, w) => dictionary.byId.get(w.word_id) ?? dictionary.bySpelling.get(String(w.fr).trim().toLowerCase()) ?? null;

// Each word keeps its dictionary entry out of band (a non-enumerable field), for the bundle's words and the phrases.
function lessonWords(m, dictionary) {
  return (m.vocabulary || []).map((w, k) => {
    const entry = dictionaryEntry(dictionary, w);
    const word = {
      word_id: w.word_id,
      text: w.fr,
      meaning_en: w.gloss,
      ordinal: k + 1,
      example_fr: w.example_fr ?? null,
      example_en: w.example_en ?? null,
      note: w.note ?? null,
      part_of_speech: w.part_of_speech ?? entry?.part_of_speech ?? null,
    };
    // A review row shows a word taught earlier (L's LessonWord.review, default false): emitted only when the row has it.
    if (w.review === true) word.review = true;
    Object.defineProperty(word, 'info_card', { value: w.info_card ?? null, enumerable: false });
    return Object.defineProperty(word, 'dictionary', { value: entry, enumerable: false });
  });
}

// The sound a French spelling can start with, by its first letter (accents folded, a silent h skipped): IPA that
// starts elsewhere belongs to another word, as aller's "ale" on va, "dəmilivʀ" (demi-livre) on livres.
const FIRST_SOUNDS = {
  a: 'aɑɛeoɔ', b: 'b', c: 'ksʃ', d: 'd', e: 'eɛəøœaɑo', f: 'f', g: 'gʒɲ', i: 'iɛj', j: 'ʒd', k: 'k', l: 'l', m: 'm', n: 'n',
  o: 'oɔwuɛ', p: 'pf', q: 'k', r: 'ʀrʁ', s: 'szʃ', t: 't', u: 'yœɥu', v: 'v', w: 'wv', x: 'kgsz', y: 'ji', z: 'z',
};
const foldFr = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae');
const headword = (s) => foldFr(s).replace(/[’ʼ‘`]/g, "'").replace(/[^a-z0-9' -]+/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Why an entry's IPA cannot be this phrase's, or null when it can: the entry's headword is not the phrase's French
 * (the IPA of "chat" is not that of "le chat"), or the IPA cannot start the phrase's first letter.
 */
export function ipaMismatch(text, entry) {
  if (!entry?.ipa) return null;
  if (headword(entry.word ?? '') !== headword(text)) return `the dictionary entry is "${entry.word}", not "${text}"`;
  let letters = foldFr(text).replace(/^[^a-z]+/, '');
  if (letters[0] === 'h') letters = letters.slice(1);
  const allowed = FIRST_SOUNDS[letters[0]];
  const first = entry.ipa.replace(/^[^\p{L}]+/u, '')[0];
  if (allowed && !allowed.includes(first)) return `"${entry.ipa}" cannot start "${text}"`;
  return null;
}

/** Pronunciation phrases: `phrases[]` when written, else one per word; IPA from the dictionary, no reviewed tips. */
function phrasesOf(m, words, note) {
  const byId = new Map(words.map((w) => [w.word_id, w]));
  const one = (suffix, text, wordId) => {
    const w = wordId ? byId.get(wordId) : null;
    const entry = w?.dictionary;
    const why = ipaMismatch(text, entry);
    if (why) note('ipa_suspect', `${m.module_key}.${suffix}: ${why}; no IPA emitted (${entry.source.file}:${entry.source.line() ?? '?'})`);
    return {
      phrase_id: `${m.module_key}.${suffix}`,
      text,
      reference_text: text,
      word_id: wordId ?? null,
      sounds: why ? null : (entry?.ipa ?? null),
      parts: [],
      general_tip: null,
      audio_path: null,
      ...(w ? { meaning_en: withoutParentheses(w.meaning_en) } : {}),
    };
  };
  if (Array.isArray(m.phrases)) return m.phrases.map((p) => one(p.phrase_id_suffix, p.fr, p.word_id));
  return words.map((w) => one(w.word_id, w.text, w.word_id));
}

/* ---------- step bodies ---------- */

const rowsOf = (rows) => rows.map((r) => defined({ fr: r.fr, en: r.en, note: r.note }));
const tableBlock = (t) => ({ type: 'table', block_id: t.id, title: t.title, rows: rowsOf(t.rows) });

function vocabularyIntroBody(m) {
  return {
    blocks: [
      ...(m.concepts || []).map((c) => ({ type: 'concept', block_id: c.id, term: c.term, definition: c.definition, example: c.example ?? null })),
      ...(m.tables || []).map(tableBlock),
    ],
  };
}

// A section's example is its second paragraph (spec 5.9); L's ReferenceSectionBlock text is a list.
function referenceBody(m) {
  return {
    blocks: [
      ...(m.sections || []).map((s) => ({
        type: 'section',
        block_id: s.id,
        heading: s.heading,
        text: [s.text, ...(isStr(s.example) ? [s.example] : [])],
        ...(s.rows ? { rows: rowsOf(s.rows) } : {}),
      })),
      ...(m.tables || []).map(tableBlock),
    ],
  };
}

const guidePart = (p) => defined({ id: p.id, heading: p.heading, text: [...p.text], note: p.note, blocks: p.blocks ? structuredClone(p.blocks) : undefined });

/** A picture path in the source ("img/reading1/paul") as the full-size file under /stories/ ("/stories/img/reading1/paul.webp"). */
function storyImage(src, story) {
  if (src.startsWith('/')) return src;
  return `/stories/${src}${/\.[a-z0-9]+$/i.test(src) ? '' : `.${story?.ext || 'webp'}`}`;
}
function passageBlock(b, story) {
  return defined({
    id: b.id,
    fr: b.fr,
    en: b.en,
    speaker: b.speaker,
    layout: b.layout,
    img: b.img ? { src: storyImage(b.img.src, story), w: b.img.w, h: b.img.h, alt: b.img.alt } : undefined,
  });
}
/** L's default free preview of a reading: its first picture and its first two text blocks (j-bundle.js previewIds). */
export function defaultPreviewBlocks(passage) {
  const pic = passage.find((b) => b.img);
  const lines = passage.filter((b) => !b.img && b.layout !== 'scene' && b.fr).slice(0, 2);
  return [...(pic ? [pic.id] : []), ...lines.map((b) => b.id)];
}
function readingBody(m, story) {
  const passage = m.passage.map((b) => passageBlock(b, story));
  return defined({
    story_id: m.story_id,
    passage,
    glossary: m.glossary?.length ? m.glossary.map((g) => ({ fr: g.fr, en: g.en })) : undefined,
    preview_blocks: m.preview_blocks ? [...m.preview_blocks] : defaultPreviewBlocks(passage),
  });
}

/* ---------- entries and content ---------- */

function entrySteps(m, unitKey) {
  return STEPS_BY_KIND[m.kind].map((sid, i) => {
    const d = STEP_DEFS[sid];
    return {
      section_id: sid,
      ordinal: i + 1,
      name: d.name,
      short_name: d.short_name,
      counted: !d.soon,
      soon: !!d.soon,
      estimate_minutes: sid === 'interactive-help' ? m.minutes : d.estimate,
      access_tier: accessTier(unitKey, sid),
      scored: d.scored,
      pass_pct: d.pass_pct ?? null,
    };
  });
}

/**
 * The free preview a Premium step carries: a guide's first part; a reading's preview blocks. Null for a free step and
 * for a Reference page's text, which has no tier in the bundle (`tier` null; curriculum's access manifest rules it).
 */
function previewOf(sectionId, tier, body) {
  if (tier !== 'premium') return null;
  if (sectionId === 'interactive-help') return body.parts[0];
  if (sectionId === 'reading-passage') {
    const ids = new Set(body.preview_blocks);
    return { story_id: body.story_id, passage: body.passage.filter((b) => ids.has(b.id)) };
  }
  return null;
}

function contentOf(m, unitKey, { dictionary, storyOf, note }) {
  const words = lessonWords(m, dictionary);
  const items = [];
  const placed = {};
  const place = (sid, id) => (placed[sid] ||= []).push(id);
  const bodies = {};
  const noteFor = (code, detail) => note(code, `${m.module_key}: ${detail}`);

  if (m.kind === 'guide') {
    for (const c of m.checks) {
      items.push(guideCheckItem(c));
      place('interactive-help', c.id);
    }
    // GuideBody.more, the Read more link, only when the guide has one.
    bodies['interactive-help'] = { line: m.line, parts: m.parts.map(guidePart), ...(m.more ? { more: { label: m.more.label, url: m.more.url } } : {}) };
  } else if (m.kind !== 'reference') {
    for (const item of m.items || []) {
      items.push(bundleItem(item, noteFor));
      for (const sid of item.steps) place(sid, item.id);
    }
  }
  if (m.kind === 'lesson') {
    bodies['vocabulary-intro'] = vocabularyIntroBody(m);
    const pair = speedMatchItem(m, words, new Set(items.map((i) => i.item_id)));
    if (pair) {
      items.push(pair);
      place('speed-match', pair.item_id);
    }
  }
  if (m.kind === 'reading') bodies['reading-passage'] = readingBody(m, storyOf(m.story_id));

  const sections = m.kind === 'reference' ? [REFERENCE_PART] : STEPS_BY_KIND[m.kind];
  const steps = sections.map((sid) => {
    const body = m.kind === 'reference' ? referenceBody(m) : (bodies[sid] ?? null);
    // The bundle carries no access tier for a Reference page's text, so it gets no preview either.
    const tier = m.kind === 'reference' ? REFERENCE_HAS_NO_TIER : accessTier(unitKey, sid);
    return { section_id: sid, body, preview: body ? previewOf(sid, tier, body) : null, item_ids: placed[sid] || [] };
  });
  return {
    module_key: m.module_key,
    kind: m.kind,
    words,
    phrases: m.kind === 'lesson' ? phrasesOf(m, words, note) : [],
    // BundleContent.glosses (L c3da2c0), only when the module has one: a module without glosses bundles as before.
    ...(m.glosses?.length ? { glosses: m.glosses.map((g) => defined({ fr: g.fr, en: g.en, note: g.note })) } : {}),
    items,
    steps,
  };
}

const unitText = (u) => ({
  unit_key: u.unit_key,
  ordinal: u.ordinal,
  name: u.name,
  description: u.description,
  after_text: `After this unit you can ${String(u.can_do).replace(/[.\s]+$/, '')}.`,
  can_do_short: u.can_do_short,
  can_do_example_fr: u.can_do_example_fr,
});

/**
 * @param course  loadCourse() / assembleCourse() output
 * @param opts    { dictionary: { byId, bySpelling } (bundle-sources.mjs loadDictionary), stories: L story records (l-sources.json),
 *                  legacyPositions: { "<live position>": module_key }, previous: an earlier bundle or null,
 *                  units: unit_keys to include (null: every unit up to the first that is not ready),
 *                  stopAtUnready: true stops before the first unit holding a planned module or a reading whose story has no
 *                  record in `stories` (story art still to come); false builds every unit (the written-course check),
 *                  build: { source_commit, built_at } or null }
 * @returns { bundle, report }  report lists what the builder defaulted or could not carry, for the CLI and the task report
 */
export function buildBundleWithReport(course, opts = {}) {
  const { dictionary = NO_DICTIONARY, stories = [], legacyPositions = {}, previous = null, units: onlyUnits = null, build = null, stopAtUnready = true } = opts;
  const report = { topic_defaulted: [], units_stopped_at: null, stopped_because: null, stories_missing: [], notes: [] };
  const note = (code, detail) => report.notes.push({ code, detail });
  const storyRecord = (id) => stories.find((s) => `reading${s.n}` === id) ?? null;
  const ctx = { dictionary, storyOf: storyRecord, note };

  // Units in outline order, up to the first that is not ready (spec 7): one that still holds a planned module, or a
  // reading whose story art L does not have yet (a story_missing L would refuse; final review I7).
  const units = [];
  for (const u of course.units) {
    const planned = u.modules.find((m) => m.status === 'planned');
    const storyless = u.modules.find((m) => m.kind === 'reading' && !storyRecord(m.story_id));
    if (stopAtUnready && (planned || storyless)) {
      report.units_stopped_at = u.unit_key;
      report.stopped_because = planned
        ? { code: 'planned', module_key: planned.module_key }
        : { code: 'story_missing', module_key: storyless.module_key, story_id: storyless.story_id ?? null };
      break;
    }
    if (!onlyUnits || onlyUnits.includes(u.unit_key)) units.push(u);
  }

  const entries = [];
  const content = [];
  const storyRows = [];
  for (const u of units)
    u.modules.forEach((m, j) => {
      let topic = m.topic;
      if (!isStr(topic)) {
        topic = u.name;
        report.topic_defaulted.push({ module_key: m.module_key, topic });
      }
      entries.push({
        module_key: m.module_key,
        unit_key: u.unit_key,
        position: m.unit_position,
        kind: m.kind,
        title: m.title,
        ...(isStr(m.short_title) ? { short_title: m.short_title } : {}),
        topic,
        description: m.description,
        can_do: [...(m.can_do || [])],
        guide_after_module_key: m.kind === 'guide' && j > 0 ? u.modules[j - 1].module_key : null,
        story_id: m.kind === 'reading' ? m.story_id : null,
        steps: entrySteps(m, u.unit_key),
      });
      content.push(contentOf(m, u.unit_key, ctx));
      if (m.kind === 'reading') {
        const s = storyRecord(m.story_id);
        if (!s) report.stories_missing.push(m.module_key);
        else if (!storyRows.some((r) => r.story_id === m.story_id))
          storyRows.push({ story_id: m.story_id, title: s.title, title_en: s.titleEn, cover: `/stories/${s.cover}`, credit: s.credit ?? null });
      }
    });

  const pages = course.shelf.pages.map((m, i) => ({ module_key: m.module_key, ordinal: i + 1, title: m.title, description: m.description, screen: m.screen ?? null }));
  for (const m of course.shelf.pages) content.push(contentOf(m, null, ctx));

  // Every word taught or shown, once, in course order; the first card of a word_id names it. A reading card's info
  // card (a place or a person the word names; L 20991bf BundleWord.info_card) goes on the word, so it shows wherever
  // the word appears.
  const words = new Map();
  for (const c of content)
    for (const w of c.words) {
      if (w.info_card && words.has(w.word_id) && !words.get(w.word_id).info_card) words.get(w.word_id).info_card = structuredClone(w.info_card);
      if (!words.has(w.word_id))
        words.set(w.word_id, {
          word_id: w.word_id,
          text: w.text,
          meaning_en: w.meaning_en,
          part_of_speech: w.part_of_speech,
          dictionary_ref: w.dictionary?.id ?? null,
          sense_note: null,
          ...(w.info_card ? { info_card: structuredClone(w.info_card) } : {}),
        });
    }

  // Every key ever retired: the outline's, then any the previous bundle retired that the outline no longer lists.
  const retired = course.retired.map((r) => ({ module_key: r.module_key, reason: r.reason, replaced_by: r.replaced_by ?? null }));
  for (const r of previous?.retired || []) if (!retired.some((x) => x.module_key === r.module_key)) retired.push({ ...r, replaced_by: r.replaced_by ?? null });

  const bundle = {
    schema: FORMAT,
    language: course.language,
    native: course.native,
    units: units.map(unitText),
    entries,
    shelf: { pages },
    words: [...words.values()],
    stories: storyRows,
    content,
    placement_form: null,
    retired,
    aliases: { legacy_position: { ...legacyPositions } },
    ...(build ? { build: { source_commit: build.source_commit, built_at: build.built_at } } : {}),
  };
  return { bundle, report };
}

export const buildBundle = (course, opts) => buildBundleWithReport(course, opts).bundle;
