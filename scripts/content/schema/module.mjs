// Module validation per kind (spec 5.2 and 5.5 to 5.9). Pure: no file access, so Vite can import it.
// One schema table per kind declares every field, its shape and its text role; the same walk validates a
// module and lists its learner-facing text (moduleTexts) for the span and position-word rules.
import { problem } from '../problems.mjs';
import { spanProblems } from '../spans.mjs';
import { validateItem, itemTexts, checkOptions, ITEM_TYPES, ID_PATTERN } from './item.mjs';

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

// Spec 5.4, "Steps it may appear in". choice: "any scored step" that holds authored items.
export const TYPE_STEPS = {
  translate: ['writing', 'lesson-exam'],
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
export const MODULE_KEY_PATTERN = /^([0-9]{4}-[0-9]{2}-[0-9]{2}-)?[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
export const STATUSES = ['written', 'planned'];

// L's guide example blocks (prototypes/l/j-guides.js). A part's block is { <type>: <L's value> }.
export const BLOCK_TYPES = ['pairs', 'ties', 'cmp', 'build', 'rise', 'flip', 'ways', 'verbs', 'table', 'list', 'lines'];

// "Module 14", "M12", "Unit 3", "Reading 7" (and "Lesson 5", French "Unité 2", "Leçon 4").
const POSITION_WORDS = /\b(?:modules?|units?|unité|readings?|lessons?|leçon)\s+\d+/i;
const POSITION_SHORT = /\bM\d+\b/;
export function hasPositionWord(text) {
  return POSITION_WORDS.test(text) || POSITION_SHORT.test(text);
}

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const join = (path, key) => (path ? `${path}.${key}` : key);

/* ---------- schema nodes ---------- */
const S = (role) => ({ t: 'str', role }); // learner-facing text with a role: fr, native, native_fr
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

const CONSTRUCTIONS = OBJ({ constructions: LIST(KEY) }, ['constructions']);
const COMMON_FIELDS = {
  title: S('native_fr'),
  topic: S('native_fr'),
  description: S('native_fr'),
  can_do: LIST(S('native_fr')),
  teaches: CONSTRUCTIONS,
  tests: CONSTRUCTIONS,
};
const WORD = OBJ(
  { word_id: KEY, fr: S('fr'), gloss: S('native'), note: S('native'), example_fr: S('fr'), example_en: S('native'), part_of_speech: KEY },
  ['word_id', 'fr', 'gloss'],
);
const VOCABULARY = LIST(WORD, { unique: 'word_id' });
const ROW = OBJ({ fr: S('fr'), en: S('native'), note: S('native_fr') }, ['fr', 'en']);
const TABLES = LIST(OBJ({ id: ID, title: S('native_fr'), rows: LIST(ROW, { nonEmpty: true }) }, ['id', 'title', 'rows']), { unique: 'id' });
const CONCEPTS = LIST(
  OBJ({ id: ID, term: S('native_fr'), definition: S('native_fr'), example: S('native_fr') }, ['id', 'term', 'definition']),
  { unique: 'id' },
);
const PHRASES = LIST(OBJ({ phrase_id_suffix: ID, fr: S('fr'), word_id: KEY }, ['phrase_id_suffix', 'fr']), { unique: 'phrase_id_suffix' });
const PART = OBJ({ id: ID, heading: S('native_fr'), text: LIST(S('native_fr')), note: S('native_fr'), block: BLOCK }, ['id', 'heading']);
const CHECK = OBJ(
  { id: ID, ask: S('native_fr'), say: S('fr'), sound: S('native'), show: S('fr'), options: OPTIONS, why: S('native_fr') },
  ['id', 'ask', 'options', 'why'],
);
const IMG = OBJ({ src: KEY, w: INT(1), h: INT(1), alt: S('native') }, ['src', 'w', 'h', 'alt']);
const PASSAGE_BLOCK = OBJ({ id: ID, fr: S('fr'), en: S('native'), speaker: S('native'), img: IMG }, ['id']);
const SECTION = OBJ({ id: ID, heading: S('native_fr'), text: S('native_fr'), rows: LIST(ROW) }, ['id', 'heading']);
const PLAN = OBJ({ words: LIST(KEY), constructions: LIST(KEY), source: KEY }, ['words', 'constructions', 'source']);

const KIND_SCHEMAS = {
  lesson: {
    fields: { vocabulary: VOCABULARY, concepts: CONCEPTS, tables: TABLES, phrases: PHRASES, speed_match: LIST(KEY), items: ITEMS, options: OBJ({ study_mode: BOOL }) },
    required: ['vocabulary', 'items'],
  },
  guide: {
    fields: { minutes: INT(1), line: S('native_fr'), parts: LIST(PART, { nonEmpty: true, unique: 'id' }), checks: LIST(CHECK, { unique: 'id' }) },
    required: ['minutes', 'line', 'parts', 'checks'],
  },
  reading: {
    fields: {
      story_id: KEY,
      vocabulary: VOCABULARY,
      passage: LIST(PASSAGE_BLOCK, { nonEmpty: true, unique: 'id' }),
      glossary: LIST(OBJ({ fr: S('fr'), en: S('native') }, ['fr', 'en'])),
      items: ITEMS,
      preview_blocks: LIST(KEY),
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
const REQUIRED_WRITTEN = { default: ['title', 'description'], unit_exam: ['description'] };
// Practice sets and exams teach nothing (spec 5.8): these fields on them are teaches_in_test, not field_unknown.
const TEACHING_FIELDS = ['vocabulary', 'concepts', 'tables'];
const TEST_KINDS = ['practice', 'unit_exam'];
// A planned module holds only what the course plan settles (plan Task 17).
const PLANNED_FIELDS = { schema: null, module_key: null, kind: null, status: null, title: S('native_fr'), teaches: CONSTRUCTIONS, plan: PLAN };

/* ---------- the walk ---------- */
function walk(node, v, path, cx, parent) {
  const bad = cx.bad;
  switch (node.t) {
    case 'str':
      if (!isStr(v)) return bad(path, 'field_type', `${path} must be a non-empty string`);
      cx.texts.push({ path, role: typeof node.role === 'function' ? node.role(parent) : node.role, text: v });
      return;
    case 'key':
      if (!isStr(v)) bad(path, 'field_type', `${path} must be a non-empty string`);
      return;
    case 'id':
      if (typeof v !== 'string' || !ID_PATTERN.test(v)) bad(path, 'id_invalid', `${path} must match ${ID_PATTERN}`);
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
      if (keys.length !== 1 || !BLOCK_TYPES.includes(keys[0]) || !(Array.isArray(v[keys[0]]) || isObj(v[keys[0]])))
        return bad(path, 'block_invalid', `${path} must be one example block: { ${BLOCK_TYPES.join(' | ')}: … }`);
      collectStrings(v[keys[0]], join(path, keys[0]), cx.texts);
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
  for (const k of Object.keys(v)) if (!(k in fields)) cx.bad(join(path, k), 'field_unknown', `${k} is not a field here`);
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
    // that, so the Unit 1 translation rule waits until the module is placed.
    const itemProblems = validateItem(item, { file, path: p, kind, unitIndex, stepsAllowed });
    cx.problems.push(...(unitIndex == null ? itemProblems.filter((q) => q.code !== 'translate_outside_unit1') : itemProblems));
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
  }
  if (kind === 'guide' && Array.isArray(mod.checks) && mod.checks.length !== 3)
    bad('checks', 'guide_checks_count', `a guide has exactly three checks, found ${mod.checks.length}`);
  if (kind === 'lesson' && Array.isArray(mod.speed_match)) {
    const words = new Set((Array.isArray(mod.vocabulary) ? mod.vocabulary : []).map((w) => isObj(w) && w.word_id));
    if (mod.speed_match.length !== 6 || !mod.speed_match.every((w) => words.has(w)))
      bad('speed_match', 'speed_match_invalid', 'speed_match lists six word_ids from this lesson’s vocabulary');
  }
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

function textRules(cx) {
  for (const t of cx.texts) {
    if (t.role === 'native_fr' && !t.inItem) for (const code of spanProblems(t.text)) cx.bad(t.path, code, `bad French span in ${t.path}`);
    if (hasPositionWord(t.text)) cx.bad(t.path, 'position_word', `${t.path} names a position ("${t.text}"); name the subject instead`);
  }
}

function inspect(mod, { file, unitIndex = null } = {}) {
  const problems = [];
  const cx = { file, unitIndex, kind: null, texts: [], problems, bad: (path, code, msg) => problems.push(problem(file, path, code, msg)) };
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
    walkFields(PLANNED_FIELDS, ['title', 'plan'], mod, '', cx);
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
