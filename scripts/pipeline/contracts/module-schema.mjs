// la-module@1 as JSON Schema, one file per kind a drafter writes (design §17 item 4): pipeline/schemas/
// la-module@1.<kind>.json, $id la-module@1/<kind>. Drafters write to it and C1 checks a draft's shape with it; C2 still
// runs the content validator, which stays the authority.
//
// Generated from the content validator's own tables (scripts/content/schema/module.mjs and item.mjs), never written
// by hand: `pnpm pipeline module-schemas --write` writes the files and `--check` fails when a committed file differs.
// The walk turns each schema node (the `t:` types) into JSON Schema. The rules the validator keeps in code beside its
// tables are stated here too, each next to the code it mirrors:
//   - a practice set or unit exam has no teaching field and teaches nothing (module.mjs kindRules, teaches_in_test);
//   - a reading's passage block has fr or img, and en beside fr (kindRules);
//   - a guide has exactly GUIDE_CHECKS checks and a short_title of at most SHORT_TITLE_MAX characters, a lesson's
//     speed_match exactly SPEED_MATCH_WORDS word ids (kindRules);
//   - an item's common fields, a mistake, a blank, an option, a non-empty steps list (item.mjs validateItem, checkOptions);
//   - a choice item and a picked comprehension item have no mistakes; a comprehension item has answer (and maybe
//     accept) or options, never both (validateItem).
// The agreement test (scripts/pipeline/test/module-schema.test.mjs) classifies every problem the content validator
// can report and proves: the schema refuses a module exactly when validateModule reports a problem the schema states.
// The rest stays the validator's alone:
//   - what this JSON Schema subset has no keyword for (no contains, no uniqueItems): exactly one right option, unique
//     ids, a step named twice;
//   - which steps a type may use in a kind: the validator checks that only on a list without repeats, so a schema
//     enum would refuse a list the validator reports only as a repeat;
//   - the cells inside a guide block (the brief's ruling: the value is a list or an object, its cells L's business);
//   - rules that compare one value with another or read the text: blank counts and markers, speed_match words from
//     the vocabulary, preview blocks naming passage blocks, a step with no item, spans, braces, position words, graph ids.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BLOCK_TYPES, COMMON_FIELDS, GUIDE_CHECKS, ITEM_TYPES_BY_KIND, KIND_SCHEMAS, MODULE_KEY_PATTERN, MODULE_SCHEMA, REQUIRED_WRITTEN, SHORT_TITLE_MAX,
  SPEED_MATCH_WORDS, TEACHING_FIELDS, TEST_KINDS,
} from '../../content/schema/module.mjs';
import { COMMON, FIELD_ROLES, ID_PATTERN, PART_FIELDS, SHAPES } from '../../content/schema/item.mjs';
import { writeDurable } from '../fsio.mjs';

const DRAFT_2020_12 = 'https://json-schema.org/draft/2020-12/schema';
/** The kinds a drafter writes. A reference module is never drafted. */
export const DRAFT_KINDS = ['lesson', 'guide', 'reading', 'practice', 'unit_exam'];
export const moduleSchemaId = (kind) => `${MODULE_SCHEMA}/${kind}`;
export const moduleSchemaFile = (kind) => `${MODULE_SCHEMA}.${kind}.json`;

// A non-empty string with a character that is not white space: the validator's isStr (trim() !== '').
const STR = () => ({ type: 'string', minLength: 1, pattern: '\\S' });
const LIST_OF_STR = () => ({ type: 'array', items: STR() });

function pattern(re) {
  if (re.flags !== '') throw new Error(`pattern ${re} has flags, which a JSON Schema pattern cannot carry`);
  return re.source;
}

/** A closed object: the validator reports field_unknown for any key not listed. */
function closed(properties, required = [], extra = {}) {
  return { type: 'object', ...(required.length ? { required } : {}), properties, additionalProperties: false, ...extra };
}

/* ---------- items (item.mjs) ---------- */

// The fields of a mistake, a blank and an option, by PART_FIELDS: [schema, required].
const PART_NODES = {
  mistake: { answer: [STR, true], feedback: [STR, true] },
  blank: { answer: [STR, true], accept: [LIST_OF_STR, false] },
  option: { text: [STR, true], fr: [() => ({ type: 'boolean' }), false], right: [() => ({ type: 'boolean' }), false] },
};
function part(name) {
  const fields = PART_FIELDS[name];
  const nodes = PART_NODES[name];
  if (fields.length !== Object.keys(nodes).length || !fields.every((f) => f in nodes))
    throw new Error(`PART_FIELDS.${name} lists ${fields.join(', ')}; module-schema.mjs knows ${Object.keys(nodes).join(', ')}`);
  return closed(Object.fromEntries(fields.map((f) => [f, nodes[f][0]()])), fields.filter((f) => nodes[f][1]));
}

// checkOptions: a list of at least two options. Exactly one right is left to the validator.
const OPTIONS = () => ({ type: 'array', minItems: 2, items: part('option') });

// validateItem's checks of the fields every item type may carry (COMMON). id and type are set per type.
const COMMON_NODES = {
  id: null,
  type: null,
  hint: STR,
  mistakes: () => ({ type: 'array', items: part('mistake') }),
  word_ids: LIST_OF_STR,
  // steps_invalid: at least one step (a repeated step is left to the validator).
  steps: () => ({ ...LIST_OF_STR(), minItems: 1 }),
};

function itemField(type, field) {
  if (FIELD_ROLES[type][field]) return field === 'accept' ? LIST_OF_STR() : STR();
  if (field === 'blanks') return { type: 'array', minItems: 1, items: part('blank') };
  if (field === 'options') return { $ref: '#/$defs/options' };
  throw new Error(`${type}.${field} has no role in FIELD_ROLES and no rule in module-schema.mjs`);
}

function itemSchema(type) {
  const shape = SHAPES[type];
  const properties = {};
  for (const f of COMMON) {
    if (!Object.hasOwn(COMMON_NODES, f)) throw new Error(`item field ${f} (COMMON) has no rule in module-schema.mjs`);
    properties[f] = f === 'id' ? { type: 'string', pattern: pattern(ID_PATTERN) } : f === 'type' ? { const: type } : COMMON_NODES[f]();
  }
  for (const f of [...shape.req, ...shape.opt]) properties[f] = itemField(type, f);
  const required = ['id', 'type', ...shape.req]; // validateItem: an item with no id is id_invalid
  const without = (keys) => Object.fromEntries(Object.entries(properties).filter(([k]) => !keys.includes(k)));
  // validateItem: a pick-one item is chosen, not typed, so it has no mistakes (mistakes_not_allowed).
  if (type === 'choice') return closed(without(['mistakes']), required);
  if (type === 'comprehension') {
    for (const f of ['answer', 'accept', 'options', 'mistakes']) if (!Object.hasOwn(properties, f)) throw new Error(`comprehension has no ${f} field`);
    // validateItem: answer or options (field_missing), never both, and accept only beside answer (options_invalid).
    // A picked question has no mistakes (mistakes_not_allowed).
    return {
      oneOf: [
        closed(without(['options']), [...required, 'answer']),
        closed(without(['answer', 'accept', 'mistakes']), [...required, 'options']),
      ],
    };
  }
  return closed(properties, required);
}

/* ---------- modules (module.mjs) ---------- */

function node(n, defs) {
  switch (n.t) {
    case 'str':
      return n.max ? { ...STR(), maxLength: n.max } : STR();
    case 'key':
      return STR();
    case 'id':
      return { type: 'string', pattern: pattern(ID_PATTERN) };
    case 'match':
      return { type: 'string', pattern: pattern(n.re), ...(n.max ? { maxLength: n.max } : {}) };
    case 'int':
      return { type: 'integer', minimum: n.min };
    case 'bool':
      return { type: 'boolean' };
    case 'enum':
      return { enum: [...n.values] };
    case 'nullable':
      return { anyOf: [{ type: 'null' }, node(n.of, defs)] };
    case 'list':
      return { type: 'array', ...(n.nonEmpty ? { minItems: 1 } : {}), items: node(n.of, defs) };
    case 'obj':
      return obj(n.fields, n.required, defs);
    case 'options':
      defs.options = OPTIONS();
      return { $ref: '#/$defs/options' };
    case 'block':
      // One block type key with L's value, and an optional heading. The value's shape is the validator's job.
      // The value is a list or an object (block_invalid at the block); the cells inside it are the validator's job,
      // so the value is left open on purpose.
      const value = { type: ['array', 'object'], additionalProperties: true };
      defs.block = { oneOf: BLOCK_TYPES.map((b) => closed({ [b]: value, heading: STR() }, [b])) };
      return { $ref: '#/$defs/block' };
    case 'items':
      return { $ref: '#/$defs/items' };
    default:
      throw new Error(`unknown schema node ${n.t}`);
  }
}

function obj(fields, required, defs) {
  const properties = {};
  for (const [k, n] of Object.entries(fields)) properties[k] = node(n, defs);
  return closed(properties, required);
}

/** The JSON Schema of a written la-module@1 document of `kind`, the one a draft's module must match. */
export function moduleJsonSchema(kind) {
  if (!DRAFT_KINDS.includes(kind)) throw new Error(`${kind} is not a kind a drafter writes (${DRAFT_KINDS.join(', ')})`);
  const ks = KIND_SCHEMAS[kind];
  const defs = {};
  const properties = {
    schema: { const: MODULE_SCHEMA },
    module_key: { type: 'string', pattern: pattern(MODULE_KEY_PATTERN) },
    kind: { const: kind },
    status: { const: 'written' },
  };
  for (const [k, n] of Object.entries({ ...COMMON_FIELDS, ...ks.fields })) properties[k] = node(n, defs);

  if (TEST_KINDS.includes(kind)) {
    // kindRules: a practice set or unit exam has no teaching field, and its teaches lists nothing (teaches_in_test).
    for (const f of TEACHING_FIELDS) delete properties[f];
    const teaches = properties.teaches.properties;
    for (const f of ['constructions', 'words']) {
      if (teaches[f]?.type !== 'array') throw new Error(`teaches.${f} is no list in COMMON_FIELDS`);
      teaches[f].maxItems = 0;
    }
  }
  if (kind === 'guide') {
    // kindRules: exactly GUIDE_CHECKS checks (guide_checks_count), a short_title of at most SHORT_TITLE_MAX
    // characters (short_title_long).
    Object.assign(properties.checks, { minItems: GUIDE_CHECKS, maxItems: GUIDE_CHECKS });
    properties.short_title.maxLength = SHORT_TITLE_MAX;
  }
  if (kind === 'lesson') {
    // kindRules: speed_match lists exactly SPEED_MATCH_WORDS word ids (speed_match_invalid). That they are this
    // lesson's words is the validator's job.
    Object.assign(properties.speed_match, { minItems: SPEED_MATCH_WORDS, maxItems: SPEED_MATCH_WORDS });
  }
  if (kind === 'reading') {
    // kindRules: a passage block has fr text or an img, and fr text needs its en translation (field_missing).
    const block = properties.passage.items;
    for (const f of ['fr', 'en', 'img']) if (!(f in block.properties)) throw new Error(`a passage block has no ${f} field`);
    Object.assign(block, { anyOf: [{ required: ['fr'] }, { required: ['img'] }], if: { required: ['fr'] }, then: { required: ['en'] } });
  }
  if (ks.fields.items) {
    const types = ITEM_TYPES_BY_KIND[kind];
    defs.items = { type: 'array', minItems: 1, items: types.length ? { oneOf: types.map((t) => ({ $ref: `#/$defs/item_${t}` })) } : false };
    for (const t of types) defs[`item_${t}`] = itemSchema(t);
    if (types.some((t) => [...SHAPES[t].req, ...SHAPES[t].opt].includes('options'))) defs.options = OPTIONS();
  }

  const required = ['schema', 'module_key', 'kind', 'status', ...(REQUIRED_WRITTEN[kind] || REQUIRED_WRITTEN.default), ...ks.required];
  return {
    $schema: DRAFT_2020_12,
    $id: moduleSchemaId(kind),
    description: `A written ${kind} module (${MODULE_SCHEMA}), status written and no plan. Generated from scripts/content/schema/ by pnpm pipeline module-schemas --write; do not edit.`,
    ...closed(properties, required),
    $defs: Object.fromEntries(Object.keys(defs).sort().map((k) => [k, defs[k]])),
  };
}

/** The committed file's text for `kind`. */
export const moduleSchemaText = (kind) => `${JSON.stringify(moduleJsonSchema(kind), null, 2)}\n`;

/** The files in `dir` that are missing or differ from a fresh generation. */
export function checkModuleSchemas(dir) {
  const stale = [];
  for (const kind of DRAFT_KINDS) {
    const file = join(dir, moduleSchemaFile(kind));
    let text = null;
    try {
      text = readFileSync(file, 'utf8');
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
    if (text !== moduleSchemaText(kind)) stale.push(file);
  }
  return stale;
}

/** Writes every kind's file into `dir`; returns the files written. */
export function writeModuleSchemas(dir) {
  return DRAFT_KINDS.map((kind) => {
    const file = join(dir, moduleSchemaFile(kind));
    writeDurable(file, moduleSchemaText(kind));
    return file;
  });
}
