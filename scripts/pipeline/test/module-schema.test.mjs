// la-module@1 as JSON Schema, one per kind a drafter writes (design §17 item 4). The schemas are generated from the
// content validator's tables (scripts/content/schema/), and must agree with validateModule:
//   - every problem code the content validator can report (found by scanning its source) is classified: the schema
//     states it, or it is left to the validator. An unclassified code fails;
//   - every written module in the course and in the loader's mini fixture, and one module per kind with every
//     optional field filled, passes its kind's schema;
//   - on every fault mutation, the schema refuses exactly when validateModule reports a problem the schema states;
//   - every code left to the validator is pinned by a case the schema accepts and the validator refuses. These are
//     rules this JSON Schema subset has no keyword for (one right option, unique ids, a repeated step), rules that
//     compare values or read text (blank counts, speed_match words, spans, position words, graph ids), and the cells
//     of a guide block. C2 runs the full validator on every draft.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateModule, BLOCK_TYPES, COMMON_FIELDS, ITEM_TYPES_BY_KIND, KIND_SCHEMAS, MODULE_SCHEMA, REQUIRED_WRITTEN, STEPS_BY_KIND, TEACHING_FIELDS,
  TEST_KINDS, TYPE_STEPS,
} from '../../content/schema/module.mjs';
import { ITEM_TYPES, SHAPES } from '../../content/schema/item.mjs';
import { SCHEMA_DIR, validateContract } from '../contracts/index.mjs';
import { DRAFT_KINDS, checkModuleSchemas, moduleJsonSchema, moduleSchemaFile, moduleSchemaId, moduleSchemaText } from '../contracts/module-schema.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const CLI = join(ROOT, 'scripts/pipeline/cli.mjs');
const VALIDATOR_SOURCES = ['scripts/content/schema/module.mjs', 'scripts/content/schema/item.mjs', 'scripts/content/spans.mjs'];

/* ---------- every code the content validator reports, classified ---------- */

// The schema states these: validateModule reports one exactly when the schema refuses. The first ten are the shape
// codes of the controller's ruling (2026-11-25); the rest are structural rules JSON Schema states too.
const SCHEMA_CODES = new Set([
  'field_type', 'field_unknown', 'field_missing', 'schema_invalid', 'module_key_invalid', 'status_invalid', 'kind_invalid',
  'id_invalid', 'item_type_not_allowed', 'teaches_in_test',
  'item_invalid', 'item_type_invalid', 'guide_checks_count', 'short_title_long', 'mistakes_not_allowed',
]);
// Codes with a half the schema states and a half left to the validator, told apart by path or message.
const SPLIT_CODES = {
  // At the block itself (no block type, two, or a value that is no list or object); at block.<type>, the cells.
  block_invalid: (p) => (/\]$/.test(p.path) ? 'schema' : 'validator'),
  options_invalid: (p) => (/exactly one right/.test(p.message) ? 'validator' : 'schema'),
  steps_invalid: (p) => (/at least one step/.test(p.message) ? 'schema' : 'validator'),
  speed_match_invalid: (p) => (/lists six word_ids$/.test(p.message) ? 'schema' : 'validator'),
};
const VALIDATOR_CODES = new Set([
  'id_duplicate', 'step_not_allowed', 'step_empty', 'blank_count', 'blank_marker_invalid', 'preview_block_unknown', 'position_word',
  'span_nested', 'span_empty', 'span_unclosed', 'span_in_plain_field', 'construction_unknown', 'word_unknown',
]);
const WARNING_CODES = new Set(['translate_outside_unit1']);

/** 'schema' when the schema states the problem, 'validator' when it is left to the validator. */
function classify(p) {
  if (SCHEMA_CODES.has(p.code)) return 'schema';
  if (Object.hasOwn(SPLIT_CODES, p.code)) return SPLIT_CODES[p.code](p);
  if (VALIDATOR_CODES.has(p.code)) return 'validator';
  if (WARNING_CODES.has(p.code)) return 'warning';
  throw new Error(`problem code ${p.code} is not classified in module-schema.test.mjs`);
}

/** The problem codes in the validator's source: a code literal followed by a message (a literal or a
 * call), a span code, a graph code. */
function sourceCodes() {
  const found = new Set();
  for (const file of VALIDATOR_SOURCES) {
    const text = readFileSync(join(ROOT, file), 'utf8');
    for (const re of [/'([a-z]+(?:_[a-z0-9]+)+)',\s*(?:`|'[^'\n]*\s|[A-Za-z]+\()/g, /codes\.push\('([a-z]+(?:_[a-z0-9]+)+)'\)/g, /'([a-z]+(?:_[a-z0-9]+)+)', '[a-z]+'\)/g])
      for (const m of text.matchAll(re)) found.add(m[1]);
  }
  return found;
}

test('every problem code the content validator can report is classified, and no classified code is stale', () => {
  const found = sourceCodes();
  for (const known of ['field_type', 'teaches_in_test', 'construction_unknown', 'word_unknown', 'span_nested', 'short_title_long', 'translate_outside_unit1'])
    assert.ok(found.has(known), `the scan finds ${known}`);
  const classified = new Set([...SCHEMA_CODES, ...Object.keys(SPLIT_CODES), ...VALIDATOR_CODES, ...WARNING_CODES]);
  assert.deepEqual([...found].filter((c) => !classified.has(c)).sort(), [], 'codes in the source with no class');
  assert.deepEqual([...classified].filter((c) => !found.has(c)).sort(), [], 'classified codes the source no longer reports');
});

/* ---------- inputs: the course, the mini fixture, one full module per kind ---------- */

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const typeOf = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v);
const clone = (v) => structuredClone(v);
const readModules = (dir, prefix) =>
  readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({ file: `${prefix}${f}`, mod: JSON.parse(readFileSync(join(dir, f), 'utf8')) }));
const ALL = [...readModules(join(ROOT, 'content/fr/modules'), ''), ...readModules(join(ROOT, 'scripts/content/test/fixtures/mini/modules'), 'mini/')];
const WRITTEN = ALL.filter(({ mod }) => mod.status === 'written' && DRAFT_KINDS.includes(mod.kind));
const firstOf = (kind) => WRITTEN.find(({ mod }) => mod.kind === kind).mod;
const findMod = (fn) => WRITTEN.map(({ mod }) => mod).find(fn);

/** A valid item of each type, from the course, without the steps its own module chose. */
const TEMPLATE = {};
for (const { mod } of WRITTEN)
  for (const item of mod.items ?? [])
    if (!TEMPLATE[item.type]) {
      const { steps, ...rest } = item;
      TEMPLATE[item.type] = rest;
    }

// One module per kind with every optional field the tables declare filled, so the sweep also mutates fields the
// course leaves empty (word_ids, steps, review rows, phrases, options.study_mode, part_of_speech, info cards, ...).
const OPTIONS = () => [{ text: 'oui', fr: true, right: true }, { text: 'non', fr: false, right: false }];
const MATCH_SAMPLES = ['/img/a.jpg', 'https://example.org/a'];
function sample(n) {
  switch (n.t) {
    case 'str': return 'mot';
    case 'key': return 'k';
    case 'id': return 'a';
    case 'int': return n.min;
    case 'bool': return true;
    case 'enum': return n.values[0];
    case 'nullable': return sample(n.of);
    case 'list': return [sample(n.of)];
    case 'obj': return Object.fromEntries(Object.entries(n.fields).map(([k, f]) => [k, sample(f)]));
    case 'options': return OPTIONS();
    case 'match': {
      const v = MATCH_SAMPLES.find((x) => n.re.test(x));
      if (!v) throw new Error(`no sample string for ${n.re}`);
      return v;
    }
    case 'block':
    case 'items':
      return null; // filled per kind below
    default:
      throw new Error(`no sample for node ${n.t}`);
  }
}
function fullItems(type, kind) {
  const steps = TYPE_STEPS[type].filter((s) => STEPS_BY_KIND[kind].includes(s));
  const base = { id: `${type}-full`, type, hint: 'mot', word_ids: ['k'], steps };
  const fields = {};
  for (const f of [...SHAPES[type].req, ...SHAPES[type].opt])
    fields[f] = f === 'accept' ? ['mots'] : f === 'blanks' ? [{ answer: 'suis', accept: ['suis'] }] : f === 'options' ? OPTIONS() : 'mot';
  if (type === 'gapfill') fields.text = 'Je ___ ici.';
  const mistakes = [{ answer: 'mots', feedback: 'mot' }];
  if (type === 'choice') return [{ ...base, ...fields }];
  if (type === 'comprehension') {
    const { options, ...typed } = fields;
    const { answer, accept, ...picked } = fields;
    return [{ ...base, ...typed, mistakes }, { ...base, id: 'comprehension-picked', ...picked }];
  }
  return [{ ...base, ...fields, mistakes }];
}
const COURSE_BLOCKS = BLOCK_TYPES.map((b) => WRITTEN.flatMap(({ mod }) => (mod.parts ?? []).flatMap((p) => p.blocks ?? [])).find((x) => b in x)).filter(Boolean);
function fullModule(kind) {
  const ks = KIND_SCHEMAS[kind];
  const m = { schema: MODULE_SCHEMA, module_key: `full-${kind.replace('_', '-')}`, kind, status: 'written', ...sample({ t: 'obj', fields: { ...COMMON_FIELDS, ...ks.fields } }) };
  if (TEST_KINDS.includes(kind)) m.teaches = { constructions: [], words: [] };
  if (kind === 'lesson') {
    m.vocabulary = Array.from({ length: 6 }, (_, i) => ({ ...m.vocabulary[0], word_id: `w${i}` }));
    m.speed_match = m.vocabulary.map((w) => w.word_id);
  }
  if (kind === 'guide') {
    m.parts[0].blocks = clone(COURSE_BLOCKS).map((b) => ({ ...b, heading: 'mot' }));
    m.checks = ['a', 'b', 'c'].map((id) => ({ ...m.checks[0], id }));
  }
  if (kind === 'reading') m.preview_blocks = [m.passage[0].id];
  if (ks.fields.items) m.items = ITEM_TYPES_BY_KIND[kind].flatMap((t) => fullItems(t, kind));
  return m;
}
const FULL = DRAFT_KINDS.map((kind) => ({ file: `full ${kind}`, mod: fullModule(kind) }));

/* ---------- the two verdicts ---------- */

/** Both verdicts. The schema is the module's own kind's, or `kind`'s when its kind is no draft kind. */
function judge(mod, kind, ctx = {}) {
  const schemaKind = DRAFT_KINDS.includes(mod?.kind) ? mod.kind : kind;
  const json = validateContract(moduleSchemaId(schemaKind), mod);
  const all = validateModule(mod, ctx);
  const js = all.filter((p) => p.severity !== 'warning');
  return { json, js, all, stated: js.filter((p) => classify(p) === 'schema'), left: js.filter((p) => classify(p) === 'validator') };
}

/** Records a disagreement in `out`; returns the verdicts. */
function agree(label, mod, kind, out, stats) {
  let v;
  try {
    v = judge(mod, kind);
  } catch (e) {
    out.push(`${label}: throws: ${e.message}`);
    return { json: [], js: [], stated: [], left: [] };
  }
  const refused = v.json.length > 0;
  const codes = [...new Set(v.js.map((p) => p.code))].join(', ') || 'nothing';
  if (v.stated.length > 0 && !refused) out.push(`${label}: validateModule reports ${codes}, the schema accepts`);
  if (refused && v.stated.length === 0) out.push(`${label}: the schema refuses (${v.json[0]}), validateModule reports ${codes}`);
  if (stats) {
    stats.cases++;
    if (refused) stats.refused++;
    for (const c of new Set(v.left.map((p) => p.code))) if (!refused) stats.leftToJs[c] = (stats.leftToJs[c] ?? 0) + 1;
  }
  return v;
}

const get = (m, path) => path.reduce((n, k) => n[k], m);
function set(m, path, value) {
  get(m, path.slice(0, -1))[path[path.length - 1]] = value;
}
/** An own key, also for __proto__ (an assignment to __proto__ would set the prototype instead). */
const own = (o, k, value) => Object.defineProperty(o, k, { value, enumerable: true, writable: true, configurable: true });

// A value of each JSON type replaced by values of the wrong type, or of the right type but out of bounds: an empty or
// blank string, a string no pattern or enum takes, zero and a fraction for whole numbers, an empty list or object.
const WRONG = {
  string: [7, null, '', ' ', 'Zz bad!'],
  integer: ['7', 0, 1.5],
  number: ['7', 0],
  boolean: ['yes', 0],
  array: ['x', [], {}],
  object: ['x', [], {}],
  null: ['x', 7],
};
// Unknown keys: one plain, and two that name Object.prototype members.
const UNKNOWN_KEYS = ['zz', 'constructor', '__proto__'];

/** Every fault site in a module, deep: [generalized path, label, apply]. List elements generalize to [] or [<item type>]. */
function* faults(mod) {
  function* walk(v, path, gen) {
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        const p = [...path, i];
        const g = `${gen}[${isObj(v[i]) && typeof v[i].type === 'string' ? v[i].type : ''}]`;
        for (const w of WRONG[typeOf(v[i])]) yield [g, `= ${JSON.stringify(w)}`, (m) => set(m, p, w)];
        yield* walk(v[i], p, g);
      }
    } else if (isObj(v)) {
      for (const k of UNKNOWN_KEYS) yield [gen, `+${k}`, (m) => { own(get(m, path), k, 'x'); }];
      for (const k of Object.keys(v)) {
        const p = [...path, k];
        const g = `${gen}.${k}`;
        yield [g, 'drop', (m) => { delete get(m, path)[k]; }];
        for (const w of WRONG[typeOf(v[k])]) yield [g, `= ${JSON.stringify(w)}`, (m) => set(m, p, w)];
        yield* walk(v[k], p, g);
      }
    }
  }
  yield* walk(mod, [], '');
}

const topRequired = (kind) => ['schema', 'module_key', 'kind', 'status', ...(REQUIRED_WRITTEN[kind] || REQUIRED_WRITTEN.default), ...KIND_SCHEMAS[kind].required];
const edit = (mod, fn) => {
  const m = clone(mod);
  fn(m);
  return m;
};

/* ---------- the course passes ---------- */

test('every written module in content/fr passes its kind schema, and so does a full module of each kind', () => {
  assert.ok(WRITTEN.length > 150, `${WRITTEN.length} written modules`);
  for (const kind of DRAFT_KINDS) assert.ok(WRITTEN.some(({ mod }) => mod.kind === kind), `the course has a written ${kind}`);
  assert.ok(COURSE_BLOCKS.length >= 5, `the full guide carries ${COURSE_BLOCKS.length} block types from the course`);
  for (const { file, mod } of [...FULL, ...WRITTEN]) {
    assert.deepEqual(validateModule(mod).filter((p) => p.severity !== 'warning'), [], `${file} is valid content`);
    assert.deepEqual(validateContract(moduleSchemaId(mod.kind), mod), [], file);
  }
  // The full modules fill what the course leaves empty.
  const lesson = FULL[0].mod;
  assert.ok(lesson.vocabulary[0].review === true && lesson.vocabulary[0].part_of_speech && lesson.phrases.length && lesson.options.study_mode === true);
  assert.ok(lesson.items.every((i) => i.word_ids && i.steps.length && i.hint));
});

/* ---------- agreement ---------- */

test('agreement: every module x every fault mutation, the schema refuses exactly when validateModule reports a problem it states', (t) => {
  for (const type of ITEM_TYPES) assert.ok(TEMPLATE[type], `the course has a ${type} item to copy`);
  const out = [];
  const stats = { cases: 0, refused: 0, leftToJs: {} };
  const inputs = [...FULL, ...WRITTEN];
  for (const { file, mod } of inputs) {
    const kind = mod.kind;
    // Drop each required field, add unknown ones, a wrong type on each top-level field.
    for (const f of topRequired(kind)) {
      const m = clone(mod);
      delete m[f];
      if (agree(`${file} without ${f}`, m, kind, out, stats).json.length === 0) out.push(`${file} without ${f}: the schema accepts`);
    }
    for (const k of UNKNOWN_KEYS)
      if (agree(`${file} +${k}`, own(clone(mod), k, 'x'), kind, out, stats).json.length === 0) out.push(`${file} +${k}: the schema accepts`);
    for (const k of Object.keys(mod))
      for (const w of WRONG[typeOf(mod[k])]) agree(`${file} ${k} = ${JSON.stringify(w)}`, { ...clone(mod), [k]: w }, kind, out, stats);
    // An item of each type the kind refuses.
    if (Array.isArray(mod.items))
      for (const type of ITEM_TYPES.filter((x) => !ITEM_TYPES_BY_KIND[kind].includes(x))) {
        const m = clone(mod);
        m.items.push({ ...clone(TEMPLATE[type]), id: 'zz-refused' });
        const v = agree(`${file} + a ${type} item`, m, kind, out, stats);
        if (!v.js.some((p) => p.code === 'item_type_not_allowed') || v.json.length === 0) out.push(`${file} + a ${type} item: not refused by both`);
      }
  }
  // Deep: every fault at every field of every object and list element, the first two sites of each generalized path
  // per kind. The full modules come first, so every field the tables declare is hit.
  const seen = new Map();
  for (const { file, mod } of inputs)
    for (const [gen, label, apply] of faults(mod)) {
      const key = `${mod.kind}|${gen}|${label}`;
      const n = seen.get(key) ?? 0;
      if (n >= 2) continue;
      seen.set(key, n + 1);
      const m = clone(mod);
      apply(m);
      agree(`${file} ${gen || '(top)'} ${label}`, m, mod.kind, out, stats);
    }
  for (const v of [null, [], 'x', 7]) agree(`a module that is ${JSON.stringify(v)}`, v, 'lesson', out, stats);
  t.diagnostic(`${stats.cases} cases, ${stats.refused} refused by the schema`);
  t.diagnostic(`refused by validateModule only, on rules left to it: ${JSON.stringify(stats.leftToJs)}`);
  assert.ok(stats.cases > 10000, `ran ${stats.cases} cases`);
  assert.deepEqual(out.slice(0, 25), [], `${out.length} disagreements`);
});

const lessonWithChoice = () => findMod((m) => m.kind !== 'reading' && (m.items ?? []).some((i) => i.type === 'choice'));

test('faults the schema states: both validators refuse, and validateModule names the expected code', () => {
  const lesson = firstOf('lesson');
  const guide = firstOf('guide');
  const reading = firstOf('reading');
  const practice = firstOf('practice');
  const exam = firstOf('unit_exam');
  const full = Object.fromEntries(FULL.map(({ mod }) => [mod.kind, mod]));
  const withChoice = lessonWithChoice();
  const ci = withChoice.items.findIndex((i) => i.type === 'choice');
  const compIndex = (m, picked) => m.items.findIndex((i) => i.type === 'comprehension' && (i.options !== undefined) === picked);
  const blockPart = (m) => m.parts.find((p) => p.blocks);
  const cases = [
    // a missing required field
    ['lesson without vocabulary', edit(lesson, (m) => delete m.vocabulary), 'field_missing'],
    ['guide without parts', edit(guide, (m) => delete m.parts), 'field_missing'],
    ['reading without passage', edit(reading, (m) => delete m.passage), 'field_missing'],
    ['practice without tests', edit(practice, (m) => delete m.tests), 'field_missing'],
    ['unit exam without description', edit(exam, (m) => delete m.description), 'field_missing'],
    ['vocabulary row without gloss', edit(lesson, (m) => delete m.vocabulary[0].gloss), 'field_missing'],
    ['item without its id', edit(lesson, (m) => delete m.items[0].id), 'id_invalid'],
    ['passage block with fr and no en', edit(reading, (m) => { const b = m.passage.find((x) => x.fr !== undefined); delete b.en; }), 'field_missing'],
    ['comprehension with neither answer nor options', edit(reading, (m) => { const i = m.items[0]; delete i.answer; delete i.options; delete i.accept; }), 'field_missing'],
    // an unknown field, plain or named like an Object.prototype member
    ['zz at the top', { ...clone(lesson), zz: 1 }, 'field_unknown'],
    ['constructor at the top', own(clone(lesson), 'constructor', 'x'), 'field_unknown'],
    ['__proto__ on a vocabulary row', edit(lesson, (m) => { own(m.vocabulary[0], '__proto__', 'x'); }), 'field_unknown'],
    ['toString in teaches', edit(lesson, (m) => { own(m.teaches, 'toString', 'x'); }), 'field_unknown'],
    ['valueOf on a passage block', edit(reading, (m) => { own(m.passage[0], 'valueOf', 'x'); }), 'field_unknown'],
    ['hasOwnProperty on a guide part', edit(guide, (m) => { own(m.parts[0], 'hasOwnProperty', 'x'); }), 'field_unknown'],
    ['zz on a vocabulary row', edit(lesson, (m) => { m.vocabulary[0].zz = 1; }), 'field_unknown'],
    ['zz on an item', edit(practice, (m) => { m.items[0].zz = 1; }), 'field_unknown'],
    ['plan on a written module', edit(lesson, (m) => { m.plan = { words: [], constructions: [], source: 'plan.json' }; }), 'field_unknown'],
    // a wrong type
    ['guide minutes as a string', edit(guide, (m) => { m.minutes = '5'; }), 'field_type'],
    ['items as a string', edit(lesson, (m) => { m.items = 'x'; }), 'field_type'],
    ['an empty items list', edit(exam, (m) => { m.items = []; }), 'field_type'],
    ['a vocabulary fr as a number', edit(lesson, (m) => { m.vocabulary[0].fr = 7; }), 'field_type'],
    ['a blank title', edit(lesson, (m) => { m.title = '   '; }), 'field_type'],
    ['hint as a list', edit(lesson, (m) => { m.items[0].hint = ['x']; }), 'field_type'],
    ['word_ids as a string', edit(lesson, (m) => { m.items[0].word_ids = 'x'; }), 'field_type'],
    ['word_ids holding a number (planted fault)', edit(full.lesson, (m) => { m.items[0].word_ids = [7]; }), 'field_type'],
    ['a review row with review "yes" (planted fault)', edit(full.lesson, (m) => { m.vocabulary[0].review = 'yes'; }), 'field_type'],
    ['steps as a string', edit(lesson, (m) => { m.items[0].steps = 'x'; }), 'field_type'],
    ['a mistake without feedback', edit(lesson, (m) => { m.items[0].mistakes = [{ answer: 'x' }]; }), 'field_type'],
    // a wrong enum or const
    ['passage layout zz', edit(reading, (m) => { m.passage[0].layout = 'zz'; }), 'field_type'],
    ['status reviewed', edit(lesson, (m) => { m.status = 'reviewed'; }), 'status_invalid'],
    ['kind zz', edit(lesson, (m) => { m.kind = 'zz'; }), 'kind_invalid'],
    ['schema la-module@2', edit(lesson, (m) => { m.schema = 'la-module@2'; }), 'schema_invalid'],
    ['module_key with a capital', edit(lesson, (m) => { m.module_key = 'Bad-Key'; }), 'module_key_invalid'],
    ['a table id with a space', edit(lesson, (m) => { m.tables = [{ id: 'a b', title: 'x', rows: [{ fr: 'a', en: 'b' }] }]; }), 'id_invalid'],
    // items: no object, no type (planted fault), a type the kind refuses
    ['an item that is a string', edit(lesson, (m) => { m.items[0] = 'x'; }), 'item_invalid'],
    ['an item with no type (planted fault)', edit(lesson, (m) => { delete m.items[0].type; }), 'item_type_invalid'],
    ['an item of type zz', edit(lesson, (m) => { m.items[0].type = 'zz'; }), 'item_type_invalid'],
    ['vocabulary on a practice set', { ...clone(practice), vocabulary: clone(lesson.vocabulary) }, 'teaches_in_test'],
    ['a comprehension item in a lesson', edit(lesson, (m) => { m.items.push({ ...clone(TEMPLATE.comprehension), id: 'zz' }); }), 'item_type_not_allowed'],
    // a bad option shape, on an item and on a guide check
    ['an option without text', edit(withChoice, (m) => { delete m.items[ci].options[0].text; }), 'options_invalid'],
    ['an option with zz', edit(withChoice, (m) => { m.items[ci].options[0].zz = 1; }), 'field_unknown'],
    ['an option right yes', edit(withChoice, (m) => { m.items[ci].options[0].right = 'yes'; }), 'options_invalid'],
    ['a single option', edit(withChoice, (m) => { m.items[ci].options = m.items[ci].options.slice(0, 1); }), 'options_invalid'],
    ['options as a string', edit(withChoice, (m) => { m.items[ci].options = 'x'; }), 'options_invalid'],
    ['a guide check option with zz', edit(guide, (m) => { m.checks[0].options[0].zz = 1; }), 'field_unknown'],
    ['a guide check option without text', edit(guide, (m) => { delete m.checks[0].options[0].text; }), 'options_invalid'],
    ['a comprehension item with answer and options', edit(full.reading, (m) => { m.items[compIndex(m, false)].options = OPTIONS(); }), 'options_invalid'],
    ['a picked comprehension item with accept', edit(full.reading, (m) => { m.items[compIndex(m, true)].accept = ['x']; }), 'options_invalid'],
    // blocks
    ['a guide block of no known type', edit(guide, (m) => { blockPart(m).blocks[0] = { zz: [] }; }), 'block_invalid'],
    ['a guide block with two types', edit(guide, (m) => { blockPart(m).blocks[0] = { pairs: [['a', 'b']], list: ['a'] }; }), 'block_invalid'],
    ['a guide block whose value is a string', edit(guide, (m) => { blockPart(m).blocks[0] = { list: 'a' }; }), 'block_invalid'],
    ['a bad heading on a block L cannot draw', edit(guide, (m) => { blockPart(m).blocks[0] = { pairs: [['a']], heading: 5 }; }), 'field_type'],
    ['a blank with zz', edit(findMod((m) => (m.items ?? []).some((i) => i.type === 'gapfill')), (m) => { m.items.find((i) => i.type === 'gapfill').blanks[0].zz = 1; }), 'field_unknown'],
    // rules beside the tables, which the schema states too
    ['a guide with two checks', edit(guide, (m) => { m.checks = m.checks.slice(0, 2); }), 'guide_checks_count'],
    ['a guide with four checks', edit(guide, (m) => { m.checks.push({ ...clone(m.checks[0]), id: 'zz' }); }), 'guide_checks_count'],
    ['a short title of 41 characters', edit(guide, (m) => { m.short_title = 'x'.repeat(41); }), 'short_title_long'],
    ['a short title of 41 emoji', edit(guide, (m) => { m.short_title = '😀'.repeat(41); }), 'short_title_long'],
    ['an empty steps list', edit(lesson, (m) => { m.items[0].steps = []; }), 'steps_invalid'],
    ['speed_match of five words', edit(full.lesson, (m) => { m.speed_match = m.speed_match.slice(0, 5); }), 'speed_match_invalid'],
    ['a choice item with mistakes', edit(withChoice, (m) => { m.items[ci].mistakes = [{ answer: 'x', feedback: 'y' }]; }), 'mistakes_not_allowed'],
    ['a picked comprehension item with mistakes', edit(full.reading, (m) => { m.items[compIndex(m, true)].mistakes = [{ answer: 'x', feedback: 'y' }]; }), 'mistakes_not_allowed'],
  ];
  const covered = new Set();
  for (const [label, mod, code] of cases) {
    const v = judge(mod, 'lesson');
    assert.ok(v.json.length > 0, `${label}: the schema accepts`);
    const hit = v.stated.filter((p) => p.code === code);
    assert.ok(hit.length > 0, `${label}: validateModule reports ${v.js.map((p) => p.code).join(', ') || 'nothing'}, not a stated ${code}`);
    covered.add(code);
  }
  const stated = new Set([...SCHEMA_CODES, ...Object.keys(SPLIT_CODES)]);
  assert.deepEqual([...stated].filter((c) => !covered.has(c)).sort(), [], 'every code the schema states has a case');
  // The other side of the planted faults: the values the schema must take.
  for (const [label, m] of [
    ['review false', edit(full.lesson, (x) => { x.vocabulary[0].review = false; })],
    ['word_ids of strings', edit(full.lesson, (x) => { x.items[0].word_ids = ['a', 'b']; })],
    ['a short title of 40 emoji', edit(guide, (x) => { x.short_title = '😀'.repeat(40); })],
  ]) {
    const v = judge(m, m.kind);
    assert.deepEqual([v.json, v.js], [[], []], label);
  }
});

test('practice sets and unit exams refuse every teaching field, in both validators', () => {
  const lesson = firstOf('lesson');
  const tests = WRITTEN.filter(({ mod }) => TEST_KINDS.includes(mod.kind));
  assert.ok(tests.some(({ mod }) => mod.kind === 'practice') && tests.some(({ mod }) => mod.kind === 'unit_exam'));
  const teaching = {
    vocabulary: clone(lesson.vocabulary),
    concepts: [{ id: 'c', term: 'x', definition: 'y' }],
    tables: [{ id: 't', title: 'x', rows: [{ fr: 'a', en: 'b' }] }],
  };
  assert.deepEqual(Object.keys(teaching), TEACHING_FIELDS);
  for (const { file, mod } of tests) {
    const faultsOf = [
      ...TEACHING_FIELDS.map((f) => [f, { ...clone(mod), [f]: clone(teaching[f]) }, f]),
      ['teaches.constructions', { ...clone(mod), teaches: { constructions: ['x'] } }, 'teaches.constructions'],
      ['teaches.words', { ...clone(mod), teaches: { constructions: [], words: ['x'] } }, 'teaches.words'],
    ];
    for (const [label, m, path] of faultsOf) {
      const v = judge(m, mod.kind);
      assert.ok(v.json.length > 0, `${file} with ${label}: the schema accepts`);
      assert.deepEqual(v.js.map((p) => [p.path, p.code]), [[path, 'teaches_in_test']], `${file} with ${label}`);
    }
    assert.deepEqual(judge({ ...clone(mod), teaches: { constructions: [] } }, mod.kind).json, [], `${file} with an empty teaches`);
  }
});

test('every code left to the content validator is pinned: the schema accepts, validateModule refuses', () => {
  const lesson = firstOf('lesson');
  const guide = firstOf('guide');
  const reading = firstOf('reading');
  const full = Object.fromEntries(FULL.map(({ mod }) => [mod.kind, mod]));
  const withChoice = lessonWithChoice();
  const ci = withChoice.items.findIndex((i) => i.type === 'choice');
  const pi = guide.parts.findIndex((p) => p.blocks);
  const gapfill = full.lesson.items.findIndex((i) => i.type === 'gapfill');
  const translate = full.lesson.items.findIndex((i) => i.type === 'translate');
  const graph = { graphIds: { constructions: new Set(), words: new Set() } };
  const cases = [
    ['two right options', edit(withChoice, (m) => { m.items[ci].options.forEach((o) => { o.right = true; }); }), 'options_invalid'],
    ['a duplicate item id', edit(lesson, (m) => { m.items[1].id = m.items[0].id; }), 'id_duplicate'],
    ['a block whose cells L cannot draw', edit(guide, (m) => { const b = m.parts[pi].blocks[0]; const k = Object.keys(b).find((x) => x !== 'heading'); b[k] = [['x']]; }), 'block_invalid'],
    ['a step named twice', edit(full.lesson, (m) => { m.items[0].steps = ['lesson-exam', 'lesson-exam']; }), 'steps_invalid'],
    ['a step the type cannot use here', edit(full.lesson, (m) => { m.items[0].steps = ['lesson-exam', 'practice-exercises']; }), 'step_not_allowed'],
    ['no item asked in lesson-exam', edit(full.lesson, (m) => { for (const i of m.items) i.steps = ['writing']; }), 'step_empty'],
    ['speed_match naming a word from elsewhere', edit(full.lesson, (m) => { m.speed_match[0] = 'zz'; }), 'speed_match_invalid'],
    ['two markers for one blank', edit(full.lesson, (m) => { m.items[gapfill].text = 'Je ___ ___.'; }), 'blank_count'],
    ['a marker of four underscores', edit(full.lesson, (m) => { m.items[gapfill].text = 'Je ____ ici.'; }), 'blank_marker_invalid'],
    ['a preview block that is no passage block', edit(reading, (m) => { m.preview_blocks = ['zz']; }), 'preview_block_unknown'],
    ['a position word in a title', edit(lesson, (m) => { m.title = 'Module 14'; }), 'position_word'],
    ['a nested span', edit(lesson, (m) => { m.items[0].hint = 'Try {a {b}}.'; }), 'span_nested'],
    ['an empty span', edit(lesson, (m) => { m.items[0].hint = 'Try {}.'; }), 'span_empty'],
    ['an unclosed span', edit(lesson, (m) => { m.items[0].hint = 'Try {a.'; }), 'span_unclosed'],
    ['a brace in a French field', edit(full.lesson, (m) => { m.items[translate].answer = 'je {suis}'; }), 'span_in_plain_field'],
    ['a construction the graph lacks', edit(lesson, (m) => { m.teaches = { constructions: ['zz-none'] }; }), 'construction_unknown', graph],
    ['a word the graph lacks', edit(lesson, (m) => { m.teaches = { constructions: [], words: ['zz-none'] }; }), 'word_unknown', graph],
    ['a translation outside Unit 1 (a warning)', clone(full.lesson), 'translate_outside_unit1', { unitIndex: 2 }],
  ];
  const pinned = new Set();
  for (const [label, mod, code, ctx] of cases) {
    const v = judge(mod, mod.kind, ctx);
    assert.deepEqual(v.json, [], `${label}: the schema refuses`);
    const hit = v.all.filter((p) => p.code === code);
    assert.ok(hit.length > 0, `${label}: validateModule reports ${v.all.map((p) => p.code).join(', ') || 'nothing'}, not ${code}`);
    assert.ok(hit.every((p) => classify(p) !== 'schema'), `${label}: ${code} here is a problem the schema states`);
    assert.deepEqual(v.stated, [], `${label}: no problem the schema states`);
    pinned.add(code);
  }
  const left = new Set([...VALIDATOR_CODES, ...WARNING_CODES, ...Object.keys(SPLIT_CODES)]);
  assert.deepEqual([...left].filter((c) => !pinned.has(c)).sort(), [], 'every code left to the validator has a case');
  // A planned stub is valid content but no draft: the draft schemas take status written only.
  const planned = ALL.find(({ mod }) => mod.status === 'planned' && mod.kind === 'lesson').mod;
  assert.deepEqual(validateModule(planned), []);
  assert.ok(validateContract(moduleSchemaId('lesson'), planned).some((e) => e.startsWith('/status: ')));
});

/* ---------- the generated files ---------- */

test('each kind schema: its $id, status written, no plan, closed objects, one oneOf branch per allowed item type', () => {
  assert.deepEqual(DRAFT_KINDS, ['lesson', 'guide', 'reading', 'practice', 'unit_exam']);
  for (const kind of DRAFT_KINDS) {
    const s = moduleJsonSchema(kind);
    assert.equal(s.$id, `la-module@1/${kind}`);
    assert.deepEqual(s.properties.status, { const: 'written' });
    assert.deepEqual(s.properties.kind, { const: kind });
    assert.ok(!('plan' in s.properties), `${kind} has no plan`);
    assert.equal(s.additionalProperties, false);
    const open = [];
    const walk = (n, at) => {
      if (!n || typeof n !== 'object') return;
      if ((n.properties || [].concat(n.type ?? []).includes('object')) && n.additionalProperties !== false) open.push(at);
      for (const kw of ['properties', '$defs']) for (const [k, sub] of Object.entries(n[kw] ?? {})) walk(sub, `${at}/${kw}/${k}`);
      for (const kw of ['allOf', 'anyOf', 'oneOf']) (n[kw] ?? []).forEach((sub, i) => walk(sub, `${at}/${kw}/${i}`));
      for (const kw of ['items', 'if', 'then']) walk(n[kw], `${at}/${kw}`);
    };
    walk(s, '');
    // A block's value is a list or an object of any content: its type list names object without closing it.
    assert.deepEqual(open.filter((p) => !/^\/\$defs\/block\/oneOf\/\d+\/properties\/[a-z]+$/.test(p)), [], `${kind}: every object is closed`);
    if (s.$defs?.items) assert.equal(s.$defs.items.items.oneOf.length, ITEM_TYPES_BY_KIND[kind].length, `${kind} items`);
    if (s.$defs?.block) assert.deepEqual(s.$defs.block.oneOf.map((b) => b.required[0]), BLOCK_TYPES);
    if (TEST_KINDS.includes(kind)) for (const f of TEACHING_FIELDS) assert.ok(!(f in s.properties), `${kind} has no ${f}`);
  }
  assert.throws(() => moduleJsonSchema('reference'), /not a kind a drafter writes/);
});

test('committed schemas equal a fresh generation', () => {
  for (const kind of DRAFT_KINDS) assert.equal(readFileSync(join(SCHEMA_DIR, moduleSchemaFile(kind)), 'utf8'), moduleSchemaText(kind), kind);
  assert.deepEqual(checkModuleSchemas(SCHEMA_DIR), []);
});

test('pnpm pipeline module-schemas: --check passes on the repo and fails on a changed copy, --write repairs it', (t) => {
  const run = (...args) => spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', CLI, 'module-schemas', ...args], { encoding: 'utf8' });
  const repo = run('--check');
  assert.equal(repo.status, 0, repo.stderr);
  const dir = mkdtempSync(join(tmpdir(), 'la-module-schemas-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const kind of DRAFT_KINDS) copyFileSync(join(SCHEMA_DIR, moduleSchemaFile(kind)), join(dir, moduleSchemaFile(kind)));
  writeFileSync(join(dir, moduleSchemaFile('guide')), '{}\n');
  rmSync(join(dir, moduleSchemaFile('practice')));
  const stale = run('--check', '--dir', dir);
  assert.equal(stale.status, 1);
  assert.match(stale.stderr, /la-module@1\.guide\.json/);
  assert.match(stale.stderr, /la-module@1\.practice\.json/);
  assert.doesNotMatch(stale.stderr, /la-module@1\.lesson\.json/);
  assert.equal(run('--write', '--dir', dir).status, 0);
  assert.equal(run('--check', '--dir', dir).status, 0);
  for (const kind of DRAFT_KINDS) assert.equal(readFileSync(join(dir, moduleSchemaFile(kind)), 'utf8'), moduleSchemaText(kind));
  for (const bad of [[], ['--write', '--check'], ['--dir'], ['--zz']]) assert.equal(run(...bad).status, 2, bad.join(' '));
});
