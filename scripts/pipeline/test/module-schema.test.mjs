// la-module@1 as JSON Schema, one per kind a drafter writes (design §17 item 4). The schemas are generated from the
// content validator's tables (scripts/content/schema/), and must agree with validateModule:
//   - every written module in the course (and in the loader's mini fixture) passes its kind's schema;
//   - on every fault mutation, the schema refuses whenever validateModule reports a shape code (SHAPE_CODES), and it
//     refuses only when validateModule reports a structural code (STRUCTURAL_CODES), so it is never stricter;
//   - rules JSON Schema cannot state (one right option, block cell shapes, unique ids, spans, position words, steps)
//     stay the content validator's alone. C2 runs the full validator on every draft.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateModule, ITEM_TYPES_BY_KIND, KIND_SCHEMAS, REQUIRED_WRITTEN, TEACHING_FIELDS, TEST_KINDS, BLOCK_TYPES } from '../../content/schema/module.mjs';
import { ITEM_TYPES } from '../../content/schema/item.mjs';
import { SCHEMA_DIR, validateContract } from '../contracts/index.mjs';
import { DRAFT_KINDS, checkModuleSchemas, moduleJsonSchema, moduleSchemaFile, moduleSchemaId, moduleSchemaText } from '../contracts/module-schema.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const CLI = join(ROOT, 'scripts/pipeline/cli.mjs');

// The shape codes (controller's ruling, 2026-11-25): validateModule reports one of these exactly when the schema must
// refuse. Structural codes are the ones a JSON Schema may also refuse on, since it states those shapes too: an item
// that is no object or of no known type, a block without exactly one block type, an options list that is no list of
// at least two { text, fr?, right? }.
const SHAPE_CODES = new Set([
  'field_type', 'field_unknown', 'field_missing', 'schema_invalid', 'module_key_invalid', 'status_invalid', 'kind_invalid',
  'id_invalid', 'item_type_not_allowed', 'teaches_in_test',
]);
const STRUCTURAL_CODES = new Set([...SHAPE_CODES, 'item_invalid', 'item_type_invalid', 'block_invalid', 'options_invalid']);

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

/** A valid item of each type, from the course, without the steps its own module chose. */
const TEMPLATE = {};
for (const { mod } of WRITTEN)
  for (const item of mod.items ?? [])
    if (!TEMPLATE[item.type]) {
      const { steps, ...rest } = item;
      TEMPLATE[item.type] = rest;
    }

/** Both verdicts on one module. The schema is the module's own kind's, or `kind`'s when its kind is no draft kind. */
function judge(mod, kind) {
  const schemaKind = DRAFT_KINDS.includes(mod?.kind) ? mod.kind : kind;
  const json = validateContract(moduleSchemaId(schemaKind), mod);
  const js = validateModule(mod).filter((p) => p.severity !== 'warning');
  return { json, js, shape: js.some((p) => SHAPE_CODES.has(p.code)), structural: js.some((p) => STRUCTURAL_CODES.has(p.code)) };
}

/** Records a disagreement in `out`; returns the verdicts. */
function agree(label, mod, kind, out, stats) {
  let v;
  try {
    v = judge(mod, kind);
  } catch (e) {
    out.push(`${label}: a validator throws: ${e.message}`);
    return { json: [], js: [], shape: false, structural: false };
  }
  const refused = v.json.length > 0;
  const codes = [...new Set(v.js.map((p) => p.code))].join(', ') || 'nothing';
  if (v.shape && !refused) out.push(`${label}: validateModule reports ${codes}, the schema accepts`);
  if (refused && !v.structural) out.push(`${label}: the schema refuses (${v.json[0]}), validateModule reports ${codes}`);
  if (stats) {
    stats.cases++;
    if (refused) stats.refused++;
    if (refused && !v.shape) for (const c of new Set(v.js.map((p) => p.code))) stats.refusedOutsideShape[c] = (stats.refusedOutsideShape[c] ?? 0) + 1;
    if (!refused && v.js.length > 0) for (const c of new Set(v.js.map((p) => p.code))) stats.leftToJs[c] = (stats.leftToJs[c] ?? 0) + 1;
  }
  return v;
}
const newStats = () => ({ cases: 0, refused: 0, refusedOutsideShape: {}, leftToJs: {} });

const get = (m, path) => path.reduce((n, k) => n[k], m);
function set(m, path, value) {
  get(m, path.slice(0, -1))[path[path.length - 1]] = value;
}

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
      yield [gen, '+zz', (m) => { get(m, path).zz = 'x'; }];
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

/* ---------- the course passes ---------- */

test('every written module in content/fr passes its kind schema', () => {
  assert.ok(WRITTEN.length > 150, `${WRITTEN.length} written modules`);
  for (const kind of DRAFT_KINDS) assert.ok(WRITTEN.some(({ mod }) => mod.kind === kind), `the course has a written ${kind}`);
  for (const { file, mod } of WRITTEN) {
    assert.deepEqual(validateModule(mod).filter((p) => p.severity !== 'warning'), [], `${file} is valid content`);
    assert.deepEqual(validateContract(moduleSchemaId(mod.kind), mod), [], file);
  }
});

/* ---------- agreement on shape ---------- */

test('agreement on shape codes: every module x every fault mutation', (t) => {
  for (const type of ITEM_TYPES) assert.ok(TEMPLATE[type], `the course has a ${type} item to copy`);
  const out = [];
  const stats = newStats();
  for (const { file, mod } of WRITTEN) {
    const kind = mod.kind;
    // Drop each required field, add an unknown one, a wrong type on each top-level field.
    for (const f of topRequired(kind)) {
      const m = clone(mod);
      delete m[f];
      const v = agree(`${file} without ${f}`, m, kind, out, stats);
      if (v.json.length === 0) out.push(`${file} without ${f}: the schema accepts`);
    }
    const zz = { ...clone(mod), zz: 'x' };
    if (agree(`${file} +zz`, zz, kind, out, stats).json.length === 0) out.push(`${file} +zz: the schema accepts`);
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
  // per kind (so every node of every kind's schema that the course uses is hit, without 170 copies of each).
  const seen = new Map();
  for (const { file, mod } of WRITTEN)
    for (const [gen, label, apply] of faults(mod)) {
      const key = `${mod.kind}|${gen}|${label}`;
      const n = seen.get(key) ?? 0;
      if (n >= 2) continue;
      seen.set(key, n + 1);
      const m = clone(mod);
      apply(m);
      agree(`${file} ${gen || '(top)'} ${label}`, m, mod.kind, out, stats);
    }
  // Not a module at all.
  for (const v of [null, [], 'x', 7]) agree(`a module that is ${JSON.stringify(v)}`, v, 'lesson', out, stats);
  t.diagnostic(`${stats.cases} cases, ${stats.refused} refused by the schema`);
  t.diagnostic(`refused by the schema, no shape code from validateModule: ${JSON.stringify(stats.refusedOutsideShape)}`);
  t.diagnostic(`refused by validateModule only (rules left to it): ${JSON.stringify(stats.leftToJs)}`);
  assert.ok(stats.cases > 10000, `ran ${stats.cases} cases`);
  assert.deepEqual(out.slice(0, 25), [], `${out.length} disagreements`);
});

test('the six named faults: both validators refuse, and validateModule names the expected code', () => {
  const lesson = firstOf('lesson');
  const guide = firstOf('guide');
  const reading = firstOf('reading');
  const practice = firstOf('practice');
  const exam = firstOf('unit_exam');
  const withChoice = WRITTEN.map(({ mod }) => mod).find((m) => m.kind !== 'reading' && (m.items ?? []).some((i) => i.type === 'choice'));
  const ci = withChoice.items.findIndex((i) => i.type === 'choice');
  const edit = (mod, fn) => {
    const m = clone(mod);
    fn(m);
    return m;
  };
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
    // an unknown field
    ['zz at the top', { ...clone(lesson), zz: 1 }, 'field_unknown'],
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
    ['steps as a string', edit(lesson, (m) => { m.items[0].steps = 'x'; }), 'field_type'],
    ['a mistake without feedback', edit(lesson, (m) => { m.items[0].mistakes = [{ answer: 'x' }]; }), 'field_type'],
    // a wrong enum or const
    ['passage layout zz', edit(reading, (m) => { m.passage[0].layout = 'zz'; }), 'field_type'],
    ['status reviewed', edit(lesson, (m) => { m.status = 'reviewed'; }), 'status_invalid'],
    ['kind zz', edit(lesson, (m) => { m.kind = 'zz'; }), 'kind_invalid'],
    ['schema la-module@2', edit(lesson, (m) => { m.schema = 'la-module@2'; }), 'schema_invalid'],
    ['module_key with a capital', edit(lesson, (m) => { m.module_key = 'Bad-Key'; }), 'module_key_invalid'],
    ['a table id with a space', edit(lesson, (m) => { m.tables = [{ id: 'a b', title: 'x', rows: [{ fr: 'a', en: 'b' }] }]; }), 'id_invalid'],
    // a bad option shape, on an item and on a guide check
    ['an option without text', edit(withChoice, (m) => { delete m.items[ci].options[0].text; }), 'options_invalid'],
    ['an option with zz', edit(withChoice, (m) => { m.items[ci].options[0].zz = 1; }), 'field_unknown'],
    ['an option right yes', edit(withChoice, (m) => { m.items[ci].options[0].right = 'yes'; }), 'options_invalid'],
    ['a single option', edit(withChoice, (m) => { m.items[ci].options = m.items[ci].options.slice(0, 1); }), 'options_invalid'],
    ['options as a string', edit(withChoice, (m) => { m.items[ci].options = 'x'; }), 'options_invalid'],
    ['a guide check option with zz', edit(guide, (m) => { m.checks[0].options[0].zz = 1; }), 'field_unknown'],
    ['a guide check option without text', edit(guide, (m) => { delete m.checks[0].options[0].text; }), 'options_invalid'],
    ['a guide block of no known type', edit(guide, (m) => { m.parts.find((p) => p.blocks).blocks[0] = { zz: [] }; }), 'block_invalid'],
    ['a blank with zz', edit(WRITTEN.map((x) => x.mod).find((m) => (m.items ?? []).some((i) => i.type === 'gapfill')), (m) => { m.items.find((i) => i.type === 'gapfill').blanks[0].zz = 1; }), 'field_unknown'],
  ];
  for (const [label, mod, code] of cases) {
    const v = judge(mod, 'lesson');
    assert.ok(v.json.length > 0, `${label}: the schema accepts`);
    assert.ok(v.js.some((p) => p.code === code), `${label}: validateModule reports ${v.js.map((p) => p.code).join(', ') || 'nothing'}, not ${code}`);
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
    // An empty teaches is allowed in both.
    assert.deepEqual(judge({ ...clone(mod), teaches: { constructions: [] } }, mod.kind).json, [], `${file} with an empty teaches`);
  }
});

test('rules JSON Schema cannot state stay the content validator\'s: the schema accepts, validateModule refuses', () => {
  const lesson = firstOf('lesson');
  const guide = firstOf('guide');
  const withChoice = WRITTEN.map(({ mod }) => mod).find((m) => m.kind !== 'reading' && (m.items ?? []).some((i) => i.type === 'choice'));
  const ci = withChoice.items.findIndex((i) => i.type === 'choice');
  const pi = guide.parts.findIndex((p) => p.blocks);
  const cases = [
    ['two right options', (m) => { m.items[ci].options.forEach((o) => { o.right = true; }); }, withChoice, 'options_invalid'],
    ['a duplicate item id', (m) => { m.items[1].id = m.items[0].id; }, lesson, 'id_duplicate'],
    ['a block whose value L cannot draw', (m) => { const b = m.parts[pi].blocks[0]; const k = Object.keys(b).find((x) => x !== 'heading'); b[k] = [['x']]; }, guide, 'block_invalid'],
    ['a position word in a title', (m) => { m.title = 'Module 14'; }, lesson, 'position_word'],
    ['an empty steps list', (m) => { m.items[0].steps = []; }, lesson, 'steps_invalid'],
    ['a guide with two checks', (m) => { m.checks = m.checks.slice(0, 2); }, guide, 'guide_checks_count'],
  ];
  for (const [label, fn, mod, code] of cases) {
    const m = clone(mod);
    fn(m);
    const v = judge(m, mod.kind);
    assert.deepEqual(v.json, [], `${label}: the schema refuses`);
    assert.ok(v.js.some((p) => p.code === code), `${label}: validateModule reports ${v.js.map((p) => p.code).join(', ') || 'nothing'}`);
    assert.ok(!v.shape, `${label}: no shape code`);
  }
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
      for (const kw of ['items', 'additionalProperties', 'if', 'then']) walk(n[kw], `${at}/${kw}`);
    };
    walk(s, '');
    assert.deepEqual(open, [], `${kind}: every object is closed`);
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
