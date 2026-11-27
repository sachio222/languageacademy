// Module validation per kind (spec 5.2 and 5.5 to 5.9). Pure: no file access, so Vite can import it.
// One schema table per kind declares every field, its shape and its text role; the same walk validates a
// module and lists its learner-facing text (moduleTexts) for the span and position-word rules.
import { problem } from '../problems.mjs';
import { spanProblems } from '../spans.mjs';
import { validateItem, itemTexts, checkOptions, ITEM_TYPES, ID_PATTERN, BRACE, plainFieldMessage } from './item.mjs';

export const KINDS = ['lesson', 'guide', 'reading', 'practice', 'unit_exam', 'reference'];

// L's stored section ids (L build spec, domains/curriculum.md, step registry).
export const STEPS_BY_KIND = {
  lesson: ['vocabulary-intro', 'pronunciation', 'flash-cards', 'speed-match', 'writing', 'conversation', 'lesson-exam'],
  guide: ['interactive-help'],
  reading: ['reading-passage'],
  practice: ['practice-exercises'],
  unit_exam: ['exam-questions'],
  reference: [],
};

// L's verb step (Verb forms): a lesson whose module has a conjugation runs it right after vocabulary-intro. No item is
// placed in it; its body is the conjugation (bundle.mjs verbFormsBody).
export const VERB_STEP = 'verb-forms';
/** A module's steps in order: its kind's steps, with the verb step after vocabulary-intro in a lesson that has a conjugation. */
export function moduleSteps(mod) {
  const steps = [...(STEPS_BY_KIND[mod?.kind] || [])];
  if (mod?.kind === 'lesson' && mod.conjugation && typeof mod.conjugation === 'object') steps.splice(steps.indexOf('vocabulary-intro') + 1, 0, VERB_STEP);
  return steps;
}

// Spec 5.4, "Steps it may appear in". choice: "any scored step" that holds authored items.
export const TYPE_STEPS = {
  translate: ['writing', 'lesson-exam', 'exam-questions'], // a unit exam asks translations too; outside Unit 1 each is a warning
  respond: ['writing', 'lesson-exam', 'exam-questions'],
  transform: ['writing', 'lesson-exam', 'practice-exercises', 'exam-questions'],
  gapfill: ['writing', 'lesson-exam', 'practice-exercises', 'exam-questions'],
  meaning: ['lesson-exam', 'exam-questions'],
  choice: ['writing', 'lesson-exam', 'reading-passage', 'practice-exercises', 'exam-questions'],
  comprehension: ['reading-passage'],
};

// Item types a kind may hold: those that can appear in one of its steps. A reading holds comprehension
// items only (spec 5.7), although the 5.4 table would also let a choice item into reading-passage.
export const ITEM_TYPES_BY_KIND = Object.fromEntries(
  KINDS.map((kind) => [kind, ITEM_TYPES.filter((t) => TYPE_STEPS[t].some((s) => STEPS_BY_KIND[kind].includes(s)))]),
);
ITEM_TYPES_BY_KIND.reading = ['comprehension'];

export const MODULE_SCHEMA = 'la-module@1';
// BundleEntry.short_title maxLength (L contracts/curriculum.bundle.schema.json), counted in characters (code points) as
// JSON Schema counts them.
export const SHORT_TITLE_MAX = 40;
// A guide asks exactly this many checks; a lesson's speed_match lists exactly this many of its word_ids.
export const GUIDE_CHECKS = 3;
export const SPEED_MATCH_WORDS = 6;
export const MODULE_KEY_PATTERN = /^([0-9]{4}-[0-9]{2}-[0-9]{2}-)?[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
export const STATUSES = ['written', 'planned'];

// L's guide example blocks (prototypes/l/j-guides.js). A part's blocks are an ordered list; each block is
// { <type>: <L's value>, heading?: native_fr } with exactly one type key (L's linesH becomes a heading).
export const BLOCK_TYPES = ['pairs', 'ties', 'cmp', 'build', 'rise', 'flip', 'ways', 'verbs', 'table', 'list', 'lines'];

// Each block type's value, in the shape L draws it (prototypes/l/j-guides.js partBody). A block in any other shape
// is block_invalid, since L cannot draw it. Each check returns a message, or null when the value fits.
const str = (v) => typeof v === 'string' && v.trim() !== '';
const strOrEmpty = (v) => typeof v === 'string';
const isPair = (p) => Array.isArray(p) && p.length === 2 && p.every(str);
const only = (o, keys) => isObj(o) && Object.keys(o).every((k) => keys.includes(k));
const listOf = (v, test, what) => (Array.isArray(v) && v.length > 0 && v.every(test) ? null : `a non-empty list of ${what}`);
const BLOCK_SHAPES = {
  // A pair may carry a third cell, the sound respelled for English readers (L dfec513), drawn under the French.
  pairs: (v) => listOf(v, (p) => isPair(p) || (Array.isArray(p) && p.length === 3 && p.every(str)), '[French, English] or [French, English, sound]'),
  lines: (v) => listOf(v, isPair, '[French, English] pairs'),
  list: (v) => listOf(v, str, 'strings'),
  ties: (v) => listOf(v, (t) => only(t, ['fr', 'a', 'b', 'link', 'sound', 'en']) && ['fr', 'a', 'b', 'link', 'sound', 'en'].every((k) => str(t[k])), '{ fr, a, b, link, sound, en }'),
  cmp: (v) => {
    const cell = (c) => only(c, ['fr', 'say', 'en', 'sub']) && str(c.fr) && ['say', 'en', 'sub'].every((k) => c[k] === undefined || str(c[k]));
    return only(v, ['left', 'right', 'rows']) && str(v.left) && str(v.right) && listOf(v.rows, (r) => Array.isArray(r) && r.length === 2 && r.every(cell), '') === null
      ? null
      : '{ left, right, rows: [[cell, cell]] } with cells { fr, say?, en?, sub? }';
  },
  build: (v) => listOf(v, (b) => only(b, ['k', 'fr', 'en']) && str(b.k) && str(b.fr) && str(b.en), '{ k, fr, en }'),
  rise: (v) => listOf(v, (r) => only(r, ['fr', 'en', 'tone']) && str(r.fr) && str(r.en) && ['flat', 'up'].includes(r.tone), '{ fr, en, tone: flat | up }'),
  flip: (v) =>
    listOf(
      v,
      (f) => only(f, ['fr', 'en', 'parts']) && str(f.fr) && str(f.en) && Array.isArray(f.parts) && f.parts.length > 0 && f.parts.every((p) => Array.isArray(p) && p.length === 2 && str(p[0]) && ['', 's', 'v', 'h'].includes(p[1])),
      '{ fr, en, parts: [[text, "" | s | v | h]] }',
    ),
  ways: (v) => listOf(v, (w) => only(w, ['n', 'fr', 't', 'd']) && Number.isInteger(w.n) && strOrEmpty(w.fr) && str(w.t) && str(w.d), '{ n, fr, t, d }'),
  verbs: (v) => listOf(v, (x) => only(x, ['v', 'en', 'f']) && str(x.v) && str(x.en) && listOf(x.f, isPair, '') === null, '{ v, en, f: [[pronoun, form]] }'),
  table: (v) =>
    only(v, ['cols', 'rows']) &&
    Array.isArray(v.cols) && v.cols.length === 2 && v.cols.every(str) &&
    listOf(v.rows, (r) => Array.isArray(r) && (r.length === 3 || (r.length === 4 && r[3] === 'odd')) && str(r[0]) && isPair(r[1]) && isPair(r[2]), '') === null
      ? null
      : '{ cols: [two headings], rows: [[label, [fr, en], [fr, en], "odd"?]] }',
};

// "Module 14", "M12", "Unit 3", "Reading 7", "Reading Comprehension 6" (and "Lesson 5", French "Unité 2", "Leçon 4").
const POSITION_WORDS = /\b(?:modules?|units?|unité|readings?(?:\s+comprehension)?|lessons?|leçon)\s+\d+/i;
const POSITION_SHORT = /\bM\d+\b/;
export function hasPositionWord(text) {
  return POSITION_WORDS.test(text) || POSITION_SHORT.test(text);
}

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const join = (path, key) => (path ? `${path}.${key}` : key);

/* ---------- schema nodes ---------- */
// max: at most this many characters (code points), the way L's contract counts maxLength.
const S = (role, max) => ({ t: 'str', role, ...(max ? { max } : {}) }); // learner-facing text with a role: fr, native, native_fr
const KEY = { t: 'key' }; // a non-empty string that no learner reads (word ids, graph ids, paths)
const ID = { t: 'id' };
const INT = (min) => ({ t: 'int', min });
const BOOL = { t: 'bool' };
const ENUM = (values) => ({ t: 'enum', values });
const LIST = (of, opts = {}) => ({ t: 'list', of, ...opts }); // opts: nonEmpty, unique (field name)
const OBJ = (fields, required = []) => ({ t: 'obj', fields, required });
const BLOCK = { t: 'block' };
const OPTIONS = { t: 'options' };
const ITEMS = { t: 'items' };
const NULLABLE = (of) => ({ t: 'nullable', of }); // the value or null
const MATCH = (re, max) => ({ t: 'match', re, ...(max ? { max } : {}) }); // a string no learner reads (a path, a link) matching re

// teaches: the constructions a module teaches (graph ids), and the words it teaches that its vocabulary table does not
// show the checker (graph headword or form ids: a guide's words, a homograph the table's spelling misreads). Taught
// words are otherwise the module's own vocabulary (spec 5.2). tests: the constructions a practice set or exam checks.
const CONSTRUCTIONS = OBJ({ constructions: LIST(KEY) }, ['constructions']);
const TEACHES = OBJ({ constructions: LIST(KEY), words: LIST(KEY) }, ['constructions']);
export const COMMON_FIELDS = {
  title: S('native_fr'),
  topic: S('native_fr'),
  description: S('native_fr'),
  can_do: LIST(S('native_fr')),
  teaches: TEACHES,
  tests: CONSTRUCTIONS,
};
const WORD = OBJ(
  { word_id: KEY, fr: S('fr'), gloss: S('native'), note: S('native_fr'), example_fr: S('fr'), example_en: S('native'), part_of_speech: KEY },
  ['word_id', 'fr', 'gloss'],
);
const VOCABULARY = LIST(WORD, { unique: 'word_id' });
// A lesson's row may be a review row (review: true): it shows a word taught earlier, as an example, and teaches nothing
// (design §1, §17 item 11). It counts toward the lesson's non-empty table; reading and reference rows take no review.
const LESSON_WORD = OBJ({ ...WORD.fields, review: BOOL }, WORD.required);
// A reading's word card may carry an info card: the short card about a place or person the word names, which today's
// reading shows from vocabularyReference `wikipedia` (L 20991bf BundleWord.info_card). image is a site path and
// image_credit the picture's author and licence; either may be null (a picture with no credit in the source).
const INFO_CARD = OBJ(
  {
    name: S('native'),
    description: S('native'),
    image: NULLABLE(MATCH(/^\/img\/[A-Za-z0-9._%/-]+\.(jpg|jpeg|png|webp)$/)),
    image_credit: NULLABLE(S('native')),
    url: MATCH(/^https:\/\//),
  },
  ['name', 'description', 'image', 'image_credit', 'url'],
);
const READING_VOCABULARY = LIST(OBJ({ ...WORD.fields, info_card: INFO_CARD }, WORD.required), { unique: 'word_id' });
const ROW = OBJ({ fr: S('fr'), en: S('native'), note: S('native_fr') }, ['fr', 'en']);
const TABLES = LIST(OBJ({ id: ID, title: S('native_fr'), rows: LIST(ROW, { nonEmpty: true }) }, ['id', 'title', 'rows']), { unique: 'id' });
const CONCEPTS = LIST(
  OBJ({ id: ID, term: S('native_fr'), definition: S('native_fr'), example: S('native_fr') }, ['id', 'term', 'definition']),
  { unique: 'id' },
);
const PHRASES = LIST(OBJ({ phrase_id_suffix: ID, fr: S('fr'), word_id: KEY }, ['phrase_id_suffix', 'fr']), { unique: 'phrase_id_suffix' });
// A guide's one outside link, drawn by L as a Read more card at the end of the guide page (GuideBody.more): a plain
// English label of 1 to 80 characters and an https link of at most 500. Leave the field out when there is none.
const MORE = OBJ({ label: S('native', 80), url: MATCH(/^https:\/\/[^\s"'<>]+$/, 500) }, ['label', 'url']);
const PART = OBJ({ id: ID, heading: S('native_fr'), text: LIST(S('native_fr')), note: S('native_fr'), blocks: LIST(BLOCK, { nonEmpty: true }) }, ['id', 'heading', 'text']);
const CHECK = OBJ(
  { id: ID, ask: S('native_fr'), say: S('fr'), sound: S('native'), show: S('fr'), options: OPTIONS, why: S('native_fr') },
  ['id', 'ask', 'options', 'why'],
);
const IMG = OBJ({ src: KEY, w: INT(1), h: INT(1), alt: S('native') }, ['src', 'w', 'h', 'alt']);
// layout: the story's dateline, scene heading or closing line (stories/readingN.html), drawn apart from the text.
// speaker: the label shown beside the French (Paul, Le père), so French the learner reads.
const PASSAGE_BLOCK = OBJ({ id: ID, fr: S('fr'), en: S('native'), speaker: S('fr'), img: IMG, layout: ENUM(['dateline', 'scene', 'end']) }, ['id']);
// example: a section made from a concept card keeps the card's example line.
const SECTION = OBJ({ id: ID, heading: S('native_fr'), text: S('native_fr'), example: S('native_fr'), rows: LIST(ROW) }, ['id', 'heading', 'text']);
// A planned module's plan (Task 17): the graph ids it will teach or use, where the plan lives (source, "plan.json") and,
// optionally, the draft it will be written from and a note for its writer (a unit exam's subtitle, a reading's theme
// brief). source and draft are paths relative to the vault's curriculum folder, projects/product/curriculum/
// (plan.json sits at research/course-plan/plan.json there; draft names research/course-plan/<file>).
// Forms of words the learner already knows (L c3da2c0, BundleContent.glosses): bons after bon, ils comprennent after
// comprendre. L shows each one's meaning on tap in the module's French and never studies, reviews, counts or tests it.
// fr is the form as the French spells it (1 to 100 characters), en its meaning (1 to 200), note how it relates to the
// word the learner knows, French in braces (at most 200). A form the module teaches as a card is gloss_is_card.
const GLOSSES = LIST(OBJ({ fr: S('fr', 100), en: S('native', 200), note: S('native_fr', 200) }, ['fr', 'en']), { unique: 'fr' });
// A lesson's conjugation: the data of L's verb step (Verb forms). verb and en name the verb; pattern says how it is
// taught: irregular (the full step), er (a regular -er verb, a short check once its model verb had the full step), or
// like (a verb that shares a model's shape). groups are the forms that sound alike, each with its sound in slashes.
// rows go in order of use in speech; each names its group, its stem (the start of the form, coloured) and its silent
// letters (the end of the form, greyed). person is written as the learner reads it: je, j', il/elle/on, ils/elles.
const CONJUGATION_ROW = OBJ(
  // stem and silent are pieces of the form, not French to read on their own, so the checker reads only person and form.
  { person: S('fr'), form: S('fr'), en: S('native'), group: KEY, stem: MATCH(/^\S+$/, 60), silent: MATCH(/^\S+$/, 20) },
  ['person', 'form', 'en', 'group', 'stem'],
);
const CONJUGATION = OBJ(
  {
    verb: S('fr'),
    en: S('native'),
    pattern: ENUM(['irregular', 'er', 'like']),
    model: S('fr'),
    note: S('native_fr'),
    groups: LIST(OBJ({ id: ID, sound: MATCH(/^\/[^/\s][^/]*\/$/, 40) }, ['id', 'sound']), { nonEmpty: true, unique: 'id' }),
    rows: LIST(CONJUGATION_ROW, { nonEmpty: true, unique: 'person' }),
  },
  ['verb', 'en', 'pattern', 'groups', 'rows'],
);
const PLAN = OBJ({ words: LIST(KEY), constructions: LIST(KEY), source: KEY, draft: KEY, note: S('native') }, ['words', 'constructions', 'source']);

export const KIND_SCHEMAS = {
  lesson: {
    // A lesson teaches at least one word: Flash Cards, Speed Match and Pronunciation are made from its vocabulary.
    fields: { vocabulary: LIST(LESSON_WORD, { unique: 'word_id', nonEmpty: true }), concepts: CONCEPTS, tables: TABLES, phrases: PHRASES, speed_match: LIST(KEY), items: ITEMS, options: OBJ({ study_mode: BOOL }), glosses: GLOSSES, conjugation: CONJUGATION },
    required: ['vocabulary', 'items'],
  },
  guide: {
    // short_title: the name on L's unit rows, Home card and La Référence (BundleEntry.short_title, 1 to 40 characters).
    // more: the optional Read more link (MORE).
    fields: {
      short_title: S('native'), minutes: INT(1), line: S('native_fr'), parts: LIST(PART, { nonEmpty: true, unique: 'id' }), checks: LIST(CHECK, { unique: 'id' }),
      more: MORE,
      glosses: GLOSSES,
    },
    required: ['minutes', 'line', 'parts', 'checks'],
  },
  reading: {
    fields: {
      story_id: KEY,
      vocabulary: READING_VOCABULARY,
      passage: LIST(PASSAGE_BLOCK, { nonEmpty: true, unique: 'id' }),
      glossary: LIST(OBJ({ fr: S('fr'), en: S('native') }, ['fr', 'en'])),
      items: ITEMS,
      preview_blocks: LIST(KEY),
      glosses: GLOSSES,
    },
    required: ['story_id', 'vocabulary', 'passage', 'items'],
  },
  practice: { fields: { items: ITEMS }, required: ['items', 'tests'] },
  unit_exam: { fields: { items: ITEMS }, required: ['items', 'tests'] },
  reference: {
    fields: { vocabulary: VOCABULARY, tables: TABLES, sections: LIST(SECTION, { unique: 'id' }), screen: ENUM(['pronunciation-test']) },
    required: [],
  },
};
// A unit exam's title comes from the outline when the file has none (spec 5.8).
export const REQUIRED_WRITTEN = { default: ['title', 'description'], unit_exam: ['description'] };
// Practice sets and exams teach nothing (spec 5.8): these fields on them are teaches_in_test, not field_unknown.
export const TEACHING_FIELDS = ['vocabulary', 'concepts', 'tables'];
export const TEST_KINDS = ['practice', 'unit_exam'];
// A planned module holds only what the course plan settles (plan Task 17).
export const PLANNED_FIELDS = { schema: null, module_key: null, kind: null, status: null, title: S('native_fr'), teaches: TEACHES, plan: PLAN };

// The pipeline generates its JSON Schemas from these tables, so nothing may change them at run time.
function deepFreeze(v) {
  if (v !== null && typeof v === 'object' && !(v instanceof RegExp) && !Object.isFrozen(v)) {
    Object.freeze(v);
    for (const x of Object.values(v)) deepFreeze(x);
  }
  return v;
}
for (const table of [COMMON_FIELDS, KIND_SCHEMAS, REQUIRED_WRITTEN, TEACHING_FIELDS, TEST_KINDS, PLANNED_FIELDS]) deepFreeze(table);

/* ---------- the walk ---------- */
function walk(node, v, path, cx, parent) {
  const bad = cx.bad;
  switch (node.t) {
    case 'str':
      if (!isStr(v)) return bad(path, 'field_type', `${path} must be a non-empty string`);
      if (node.max && [...v].length > node.max) bad(path, 'field_type', `${path} must be at most ${node.max} characters`);
      cx.texts.push({ path, role: typeof node.role === 'function' ? node.role(parent) : node.role, text: v });
      return;
    case 'key':
      if (!isStr(v)) bad(path, 'field_type', `${path} must be a non-empty string`);
      return;
    case 'id':
      if (typeof v !== 'string' || !ID_PATTERN.test(v)) bad(path, 'id_invalid', `${path} must match ${ID_PATTERN}`);
      return;
    case 'nullable':
      if (v === null) return;
      return walk(node.of, v, path, cx, parent);
    case 'match':
      if (typeof v !== 'string' || !node.re.test(v)) bad(path, 'field_type', `${path} must match ${node.re}`);
      else if (node.max && [...v].length > node.max) bad(path, 'field_type', `${path} must be at most ${node.max} characters`);
      return;
    case 'int':
      if (!Number.isInteger(v) || v < node.min) bad(path, 'field_type', `${path} must be a whole number of at least ${node.min}`);
      return;
    case 'bool':
      if (typeof v !== 'boolean') bad(path, 'field_type', `${path} must be true or false`);
      return;
    case 'enum':
      if (!node.values.includes(v)) bad(path, 'field_type', `${path} must be one of ${node.values.join(', ')}`);
      return;
    case 'list': {
      if (!Array.isArray(v)) return bad(path, 'field_type', `${path} must be a list`);
      if (node.nonEmpty && v.length === 0) return bad(path, 'field_type', `${path} must not be empty`);
      const seen = new Set();
      v.forEach((el, i) => {
        const p = `${path}[${i}]`;
        walk(node.of, el, p, cx, v);
        if (node.unique && isObj(el) && typeof el[node.unique] === 'string') {
          if (seen.has(el[node.unique])) bad(`${p}.${node.unique}`, 'id_duplicate', `${node.unique} ${el[node.unique]} is used twice in ${path}`);
          seen.add(el[node.unique]);
        }
      });
      return;
    }
    case 'obj':
      if (!isObj(v)) return bad(path, 'field_type', `${path} must be an object`);
      return walkFields(node.fields, node.required, v, path, cx);
    case 'block': {
      const keys = isObj(v) ? Object.keys(v) : [];
      const types = keys.filter((k) => k !== 'heading');
      const type = types[0];
      if (types.length !== 1 || !BLOCK_TYPES.includes(type) || !(Array.isArray(v[type]) || isObj(v[type])))
        return bad(path, 'block_invalid', `${path} must be one example block: { ${BLOCK_TYPES.join(' | ')}: …, heading? }`);
      const shape = BLOCK_SHAPES[type](v[type]);
      if (shape) bad(join(path, type), 'block_invalid', `${join(path, type)} must be ${shape}, the shape L draws`);
      // The heading is checked whatever the value's shape, so a bad value never hides a bad heading.
      if (v.heading !== undefined) walk(S('native_fr'), v.heading, join(path, 'heading'), cx, v);
      if (!shape) collectStrings(v[type], join(path, type), cx.texts);
      return;
    }
    case 'options':
      // Same shape as a choice item's options (spec 5.6): at least two, exactly one right.
      checkOptions({ options: v }, (sub, code, msg) => bad(sub.replace(/^options/, path), code, msg));
      if (Array.isArray(v))
        v.forEach((o, i) => {
          if (isObj(o) && isStr(o.text)) cx.texts.push({ path: `${path}[${i}].text`, role: o.fr === true ? 'fr' : 'native', text: o.text });
        });
      return;
    case 'items':
      return walkItems(v, path, cx);
    default:
      throw new Error(`unknown schema node ${node.t}`);
  }
}

function walkFields(fields, required, v, path, cx) {
  // Own keys only: `k in fields` would let constructor, toString or __proto__ through as known fields.
  for (const k of Object.keys(v)) if (!Object.hasOwn(fields, k)) cx.bad(join(path, k), 'field_unknown', `${k} is not a field here`);
  for (const k of required) if (v[k] === undefined) cx.bad(join(path, k), 'field_missing', `${join(path, k)} is required`);
  for (const [k, node] of Object.entries(fields)) if (node && v[k] !== undefined) walk(node, v[k], join(path, k), cx, v);
}

// Guide block cells: L's blocks mix French and English by position, so the walk reads every string as
// learner-facing text of role 'block' (position words only). The checker reads the cells by block type.
function collectStrings(v, path, texts) {
  if (typeof v === 'string') {
    if (v !== '') texts.push({ path, role: 'block', text: v });
  } else if (Array.isArray(v)) v.forEach((x, i) => collectStrings(x, `${path}[${i}]`, texts));
  else if (isObj(v)) for (const [k, x] of Object.entries(v)) collectStrings(x, join(path, k), texts);
}

const UNIT_RULES = new Set(['translate_outside_unit1', 'translation_framed', 'drill_without_situation']);

function walkItems(items, path, cx) {
  if (!Array.isArray(items)) return cx.bad(path, 'field_type', `${path} must be a list`);
  if (items.length === 0) return cx.bad(path, 'field_type', `${path} must not be empty`);
  const { kind, file, unitIndex } = cx;
  const seen = new Set();
  items.forEach((item, i) => {
    const p = `${path}[${i}]`;
    const known = isObj(item) && ITEM_TYPES.includes(item.type);
    if (known && !ITEM_TYPES_BY_KIND[kind].includes(item.type))
      cx.bad(`${p}.type`, 'item_type_not_allowed', `a ${kind} module cannot hold ${item.type} items`);
    const stepsAllowed = known ? TYPE_STEPS[item.type].filter((s) => STEPS_BY_KIND[kind].includes(s)) : STEPS_BY_KIND[kind];
    // A module the outline does not place (unitIndex null) has no unit yet: the outline check reports
    // that, so the rules that depend on the unit (translation, framed translation, bare drills) wait until it is placed.
    const itemProblems = validateItem(item, { file, path: p, kind, unitIndex, stepsAllowed });
    cx.problems.push(...(unitIndex == null ? itemProblems.filter((q) => !UNIT_RULES.has(q.code)) : itemProblems));
    if (isObj(item) && typeof item.id === 'string') {
      if (seen.has(item.id)) cx.bad(`${p}.id`, 'id_duplicate', `item id ${item.id} is used twice in this module`);
      seen.add(item.id);
    }
    // validateItem already reports bad spans in item text; these texts feed position words only.
    if (known) for (const t of itemTexts(item)) cx.texts.push({ path: `${p}.${t.path}`, role: t.role, text: t.text, inItem: true });
  });
}

/* ---------- per-module rules the tables cannot express ---------- */
function kindRules(mod, cx) {
  const { kind, bad } = cx;
  if (TEST_KINDS.includes(kind)) {
    for (const f of TEACHING_FIELDS) if (mod[f] !== undefined) bad(f, 'teaches_in_test', `a ${kind} teaches nothing, so it has no ${f}`);
    if (isObj(mod.teaches) && Array.isArray(mod.teaches.constructions) && mod.teaches.constructions.length > 0)
      bad('teaches.constructions', 'teaches_in_test', `a ${kind} teaches nothing; list what it checks in tests.constructions`);
    if (isObj(mod.teaches) && Array.isArray(mod.teaches.words) && mod.teaches.words.length > 0)
      bad('teaches.words', 'teaches_in_test', `a ${kind} teaches nothing, so it teaches no words`);
  }
  const titleLength = typeof mod.short_title === 'string' ? [...mod.short_title].length : 0;
  if (kind === 'guide' && titleLength > SHORT_TITLE_MAX)
    bad('short_title', 'short_title_long', `short_title has ${titleLength} characters; L shows at most ${SHORT_TITLE_MAX}`);
  if (kind === 'guide' && Array.isArray(mod.checks) && mod.checks.length !== GUIDE_CHECKS)
    bad('checks', 'guide_checks_count', `a guide has exactly three checks, found ${mod.checks.length}`);
  stepRules(mod, cx);
  glossRules(mod, cx);
  if (kind === 'lesson' && Array.isArray(mod.speed_match)) {
    const words = new Set((Array.isArray(mod.vocabulary) ? mod.vocabulary : []).map((w) => isObj(w) && w.word_id));
    if (mod.speed_match.length !== SPEED_MATCH_WORDS) bad('speed_match', 'speed_match_invalid', 'speed_match lists six word_ids');
    else if (!mod.speed_match.every((w) => words.has(w)))
      bad('speed_match', 'speed_match_invalid', 'speed_match lists only word_ids from this lesson’s vocabulary');
  }
  if (kind === 'lesson' && isObj(mod.conjugation)) conjugationRules(mod.conjugation, cx);
  if (kind === 'reading' && Array.isArray(mod.passage)) {
    mod.passage.forEach((b, i) => {
      if (!isObj(b)) return;
      if (b.fr === undefined && b.img === undefined) bad(`passage[${i}].fr`, 'field_missing', 'a passage block needs fr text or an img');
      if (b.fr !== undefined && b.en === undefined) bad(`passage[${i}].en`, 'field_missing', 'a passage block with fr text needs its en translation');
    });
    if (Array.isArray(mod.preview_blocks)) {
      const ids = new Set(mod.passage.map((b) => isObj(b) && b.id));
      mod.preview_blocks.forEach((id, i) => {
        if (isStr(id) && !ids.has(id)) bad(`preview_blocks[${i}]`, 'preview_block_unknown', `${id} is not a passage block`);
      });
    }
  }
}

// The verb step's data holds together: each row's group exists and every group has a row; the stem starts the form
// and the silent letters end it, without overlapping; a verb taught by a pattern names its model verb.
function conjugationRules(c, cx) {
  const { bad } = cx;
  const groups = Array.isArray(c.groups) ? c.groups.filter(isObj) : [];
  const rows = Array.isArray(c.rows) ? c.rows : [];
  const ids = new Set(groups.map((g) => g.id));
  const used = new Set();
  rows.forEach((r, i) => {
    if (!isObj(r)) return;
    if (isStr(r.group)) {
      used.add(r.group);
      if (!ids.has(r.group)) bad(`conjugation.rows[${i}].group`, 'conjugation_group_unknown', `${r.group} is not one of the conjugation's sound groups`);
    }
    if (!isStr(r.form)) return;
    const stemOk = !isStr(r.stem) || r.form.startsWith(r.stem);
    const silentOk = r.silent === undefined || (isStr(r.silent) && r.form.endsWith(r.silent));
    if (!stemOk) bad(`conjugation.rows[${i}].stem`, 'conjugation_split_invalid', `the stem ${r.stem} does not start the form ${r.form}`);
    if (!silentOk) bad(`conjugation.rows[${i}].silent`, 'conjugation_split_invalid', `the silent letters ${r.silent} do not end the form ${r.form}`);
    if (stemOk && silentOk && isStr(r.stem) && isStr(r.silent) && r.stem.length + r.silent.length > r.form.length)
      bad(`conjugation.rows[${i}].silent`, 'conjugation_split_invalid', `the stem and the silent letters overlap in ${r.form}`);
  });
  groups.forEach((g, i) => {
    if (isStr(g.id) && !used.has(g.id)) bad(`conjugation.groups[${i}]`, 'conjugation_group_empty', `no row sounds like group ${g.id}`);
  });
  if ((c.pattern === 'er' || c.pattern === 'like') && !isStr(c.model))
    bad('conjugation.model', 'conjugation_model_missing', `a verb taught as ${c.pattern} names its model verb`);
}

// A gloss and a word card are the same form when they match after this: lower case, every apostrophe as ', and each
// run of spaces as one space. It is L's same_form (check/check_bundle.py, gloss_taught), so the content check refuses
// exactly the glosses L's checker would.
export const sameForm = (text) => String(text).toLowerCase().replace(/[\u2019\u2018\u02bc`]/g, "'").replace(/\s+/g, ' ').trim();

// A word new to the learner is taught as a card; a gloss is a form the learner already knows. A form that is both
// would be taught and glossed in the same module (L's gloss_taught), so it is gloss_is_card.
function glossRules(mod, cx) {
  if (!Array.isArray(mod.glosses)) return;
  const cards = new Map();
  for (const [k, w] of (Array.isArray(mod.vocabulary) ? mod.vocabulary : []).entries())
    if (isObj(w) && isStr(w.fr) && !cards.has(sameForm(w.fr))) cards.set(sameForm(w.fr), k);
  mod.glosses.forEach((g, i) => {
    if (!isObj(g) || !isStr(g.fr) || !cards.has(sameForm(g.fr))) return;
    const k = cards.get(sameForm(g.fr));
    cx.bad(`glosses[${i}].fr`, 'gloss_is_card', `the gloss ${g.fr} is the word card vocabulary[${k}] (${mod.vocabulary[k].fr}); a word the module teaches as a card is never also glossed, so drop the gloss`);
  });
}

// The scored steps made from a module's items. Each step its kind runs must ask at least one item, or L would open an
// empty step (step_empty). An item's `steps` can move it out of a step, so the defaults alone do not settle it.
const ITEM_STEPS = ['lesson-exam', 'exam-questions', 'practice-exercises', 'reading-passage'];
function stepRules(mod, cx) {
  const { kind, bad } = cx;
  if (!Array.isArray(mod.items) || mod.items.length === 0) return; // walkItems reports an empty list
  const asked = new Set();
  for (const item of mod.items)
    if (isObj(item) && ITEM_TYPES.includes(item.type) && (item.steps === undefined || (Array.isArray(item.steps) && item.steps.every(isStr))))
      for (const s of defaultSteps(item, kind)) asked.add(s);
  for (const s of STEPS_BY_KIND[kind] || [])
    if (ITEM_STEPS.includes(s) && !asked.has(s)) bad('items', 'step_empty', `no item is asked in ${s}, so the step would be empty; leave ${s} in at least one item's steps`);
}

// Graph ids in teaches and tests. ctx.graphIds ({ constructions: Set, words: Set }) comes from
// curriculum-graph/languages/<lang>; loadCourse passes it. Without it only the shape is checked, so a caller with no
// graph at hand (Vite) still validates.
function graphRules(mod, cx) {
  const ids = cx.graphIds;
  if (!ids || !isObj(mod)) return;
  const check = (path, list, known, code, what) => {
    if (!Array.isArray(list)) return;
    list.forEach((id, i) => {
      if (isStr(id) && !known.has(id)) cx.bad(`${path}[${i}]`, code, `${id} is not a ${what} in the graph`);
    });
  };
  if (isObj(mod.teaches)) {
    check('teaches.constructions', mod.teaches.constructions, ids.constructions, 'construction_unknown', 'construction');
    check('teaches.words', mod.teaches.words, ids.words, 'word_unknown', 'headword or form');
  }
  if (isObj(mod.tests)) check('tests.constructions', mod.tests.constructions, ids.constructions, 'construction_unknown', 'construction');
  // A planned module's plan names graph ids too, so a stub never points at a word or pattern the graph lacks.
  if (mod.status === 'planned' && isObj(mod.plan)) {
    check('plan.constructions', mod.plan.constructions, ids.constructions, 'construction_unknown', 'construction');
    check('plan.words', mod.plan.words, ids.words, 'word_unknown', 'headword or form');
  }
}

function textRules(cx) {
  for (const t of cx.texts) {
    if (t.role === 'native_fr' && !t.inItem) for (const code of spanProblems(t.text)) cx.bad(t.path, code, `bad French span in ${t.path}`);
    // validateItem reports braces in item text; guide block cells mix French and English and are read by type.
    if ((t.role === 'fr' || t.role === 'native') && !t.inItem && BRACE.test(t.text)) cx.bad(t.path, 'span_in_plain_field', plainFieldMessage(t));
    if (hasPositionWord(t.text)) cx.bad(t.path, 'position_word', `${t.path} names a position ("${t.text}"); name the subject instead`);
  }
}

function inspect(mod, { file, unitIndex = null, graphIds = null } = {}) {
  const problems = [];
  const cx = { file, unitIndex, graphIds, kind: null, texts: [], problems, bad: (path, code, msg) => problems.push(problem(file, path, code, msg)) };
  if (!isObj(mod)) {
    cx.bad('', 'field_type', 'a module file holds one JSON object');
    return cx;
  }
  if (mod.schema !== MODULE_SCHEMA) cx.bad('schema', 'schema_invalid', `schema must be ${MODULE_SCHEMA}`);
  if (typeof mod.module_key !== 'string' || !MODULE_KEY_PATTERN.test(mod.module_key))
    cx.bad('module_key', 'module_key_invalid', `module_key must match ${MODULE_KEY_PATTERN}`);
  if (!STATUSES.includes(mod.status)) cx.bad('status', 'status_invalid', `status must be ${STATUSES.join(' or ')}`);
  const kindOk = KINDS.includes(mod.kind);
  if (!kindOk) cx.bad('kind', 'kind_invalid', `kind must be one of ${KINDS.join(', ')}`);
  cx.kind = mod.kind;

  if (mod.status === 'planned') {
    // A planned unit exam, like a written one, takes its title from the outline (spec 5.8).
    walkFields(PLANNED_FIELDS, mod.kind === 'unit_exam' ? ['plan'] : ['title', 'plan'], mod, '', cx);
  } else if (!kindOk || !STATUSES.includes(mod.status)) {
    // Without a kind or a status the module's shape is unknown; check only the common fields.
    for (const [k, node] of Object.entries(COMMON_FIELDS)) if (mod[k] !== undefined) walk(node, mod[k], k, cx, mod);
  } else {
    const ks = KIND_SCHEMAS[mod.kind];
    const fields = { schema: null, module_key: null, kind: null, status: null, ...COMMON_FIELDS, ...ks.fields };
    if (TEST_KINDS.includes(mod.kind)) for (const f of TEACHING_FIELDS) fields[f] = null; // reported by kindRules
    const required = [...(REQUIRED_WRITTEN[mod.kind] || REQUIRED_WRITTEN.default), ...ks.required];
    walkFields(fields, required, mod, '', cx);
    kindRules(mod, cx);
  }
  graphRules(mod, cx);
  textRules(cx);
  return cx;
}

export function validateModule(mod, ctx = {}) {
  return inspect(mod, ctx).problems;
}

// Every learner-facing string in a module, with its path and role (fr, native, native_fr, or 'block' for
// guide block cells), items included.
export function moduleTexts(mod, ctx = {}) {
  return inspect(mod, ctx).texts.map(({ path, role, text }) => ({ path, role, text }));
}

// The steps an item is asked in (spec 5.4). A lesson item goes to lesson-exam, and also to writing when it
// has at least one mistakes entry; an item in a one-step kind goes to that step. Steps the item's type
// cannot appear in are left out. An authored `steps` list wins.
export function defaultSteps(item, kind) {
  if (Array.isArray(item.steps)) return [...item.steps];
  const own = TYPE_STEPS[item.type] || [];
  if (kind === 'lesson') {
    const want = Array.isArray(item.mistakes) && item.mistakes.length > 0 ? ['writing', 'lesson-exam'] : ['lesson-exam'];
    return want.filter((s) => own.includes(s));
  }
  return (STEPS_BY_KIND[kind] || []).filter((s) => own.includes(s));
}
