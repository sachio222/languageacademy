// The pipeline's contracts (design §4): one JSON Schema per document that crosses the seam between the core and its
// engines, checked by the in-repo validator. Every §4 example is a fixture; each must validate, and each must fail
// when a required field goes, an unknown field arrives, or the schema id is wrong.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createValidator } from '../contracts/json-schema.mjs';
import { assertContract, ContractError, SCHEMA_DIR, validateContract } from '../contracts/index.mjs';

const FIXTURES = fileURLToPath(new URL('./fixtures/contracts/', import.meta.url));
const CONFIG = fileURLToPath(new URL('../../../pipeline/fr/config.json', import.meta.url));
const IDS = [
  'la-pipeline-common@1', 'la-brief@1', 'la-draft@1', 'la-check-result@1', 'la-review-request@1', 'la-review-verdict@1',
  'la-repair@1', 'la-approval@1', 'la-release-notice@1', 'la-release-ack@1', 'la-pipeline-event@1', 'la-unit-header@1',
  'la-engine-task@1', 'la-pipeline-config@1', 'la-prompts-lock@1',
];
const DOCUMENT_IDS = IDS.filter((id) => id !== 'la-pipeline-common@1');

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const clone = (v) => structuredClone(v);
const fixtures = () =>
  readdirSync(FIXTURES)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((file) => ({ file, id: file.slice(0, file.indexOf('.')), doc: readJson(join(FIXTURES, file)) }));
const fixture = (file) => readJson(join(FIXTURES, file));

/** A temp folder of schema files, for load-time failures. */
function schemaDir(t, files) {
  const dir = mkdtempSync(join(tmpdir(), 'la-schemas-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const [name, schema] of Object.entries(files)) writeFileSync(join(dir, name), JSON.stringify(schema));
  return dir;
}

/* ---------- a walk that pairs a fixture with its schema, to find every place a mutation must be refused ---------- */

const SCHEMAS = new Map(readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.json')).map((f) => {
  const s = readJson(join(SCHEMA_DIR, f));
  return [s.$id, s];
}));
const esc = (k) => String(k).replace(/~/g, '~0').replace(/\//g, '~1');
function deref(node, root) {
  while (node && typeof node === 'object' && node.$ref) {
    const [id, frag = ''] = node.$ref.split('#');
    root = id ? SCHEMAS.get(id) : root;
    node = frag.split('/').filter(Boolean).reduce((n, p) => n[p.replace(/~1/g, '/').replace(/~0/g, '~')], root);
  }
  return [node, root];
}
/** Every { pointer, key } of a required field present in the doc, and every pointer of a closed object. */
function mutationSites(schema, doc) {
  const required = [];
  const closed = [];
  const walk = (s0, v, at, root0) => {
    const [s, root] = deref(s0, root0);
    if (!s || typeof s !== 'object') return;
    if (Array.isArray(v)) {
      if (s.items) v.forEach((x, i) => walk(s.items, x, `${at}/${i}`, root));
      return;
    }
    if (!v || typeof v !== 'object') return;
    for (const k of s.required || []) if (k in v) required.push({ at, key: k });
    if (s.additionalProperties === false) closed.push(at);
    for (const [k, x] of Object.entries(v)) {
      if (s.properties && k in s.properties) walk(s.properties[k], x, `${at}/${esc(k)}`, root);
      else if (s.additionalProperties && typeof s.additionalProperties === 'object') walk(s.additionalProperties, x, `${at}/${esc(k)}`, root);
    }
  };
  walk(schema, doc, '', schema);
  return { required, closed };
}
const at = (doc, pointer) => pointer.split('/').slice(1).reduce((n, p) => n[p.replace(/~1/g, '/').replace(/~0/g, '~')], doc);

/* ---------- the schemas load ---------- */

test('every schema loads and every $ref resolves', () => {
  const v = createValidator([SCHEMA_DIR]);
  const ids = v.ids();
  for (const id of IDS) assert.ok(ids.includes(id), `${id} is registered`);
  assert.deepEqual([...ids].sort(), ids, 'ids() is sorted');
  // A schema file per id, named after it.
  for (const id of IDS) assert.equal(readJson(join(SCHEMA_DIR, `${id}.json`)).$id, id);
});

test('every fixture validates against its schema', () => {
  const all = fixtures();
  assert.ok(all.length >= DOCUMENT_IDS.length);
  for (const id of DOCUMENT_IDS) assert.ok(all.some((f) => f.id === id), `${id} has a fixture`);
  for (const { file, id, doc } of all) assert.deepEqual(validateContract(id, doc), [], file);
});

test('no fixture keeps an abridged value from the design', () => {
  for (const { file } of fixtures()) assert.ok(!readFileSync(join(FIXTURES, file), 'utf8').includes('…'), file);
});

test('pipeline/fr/config.json is a valid la-pipeline-config@1 with no managed units yet', () => {
  const config = readJson(CONFIG);
  assert.deepEqual(validateContract('la-pipeline-config@1', config), []);
  assert.deepEqual(config.managed_units, []);
  assert.equal(config.branch, 'pipeline/fr');
  assert.deepEqual(config.pilot_units, ['unit13']);
  assert.deepEqual(config.plan_source, { file: 'plan.json', sha256: 'b956ae7ce27036563556aca89e1385831ac3e492692ef17b354ec1ea4c7c2a3c' });
  assert.deepEqual(config.l_target, { adapter: 'prototype', autoload: false, root: null });
});

test('each schema refuses a fixture with one required field removed, one unknown field added, or a wrong schema id', () => {
  let cases = 0;
  for (const { file, id, doc } of fixtures()) {
    const { required, closed } = mutationSites(SCHEMAS.get(id), doc);
    assert.ok(required.some((r) => r.at === '' && r.key === 'schema'), `${file}: schema is required`);
    assert.ok(closed.includes(''), `${file}: the top level is closed`);
    for (const { at: p, key } of required) {
      const m = clone(doc);
      delete at(m, p)[key];
      const errors = validateContract(id, m);
      assert.ok(errors.includes(`${p}: missing ${key}`), `${file}: without ${p}/${key}: ${errors.join('; ')}`);
      cases++;
    }
    for (const p of closed) {
      const m = clone(doc);
      at(m, p).zz_unknown = 1;
      const errors = validateContract(id, m);
      assert.ok(errors.includes(`${p}/zz_unknown: not allowed`), `${file}: unknown field at '${p}': ${errors.join('; ')}`);
      cases++;
    }
    const wrong = { ...clone(doc), schema: 'la-not-this@1' };
    const errors = validateContract(id, wrong);
    assert.ok(errors.some((e) => e.startsWith('/schema: ')), `${file}: wrong schema id: ${errors.join('; ')}`);
    // Validated as another contract, the document is refused at its schema field too.
    const other = id === 'la-brief@1' ? 'la-draft@1' : 'la-brief@1';
    assert.ok(validateContract(other, doc).some((e) => e.startsWith('/schema: ')), `${file} as ${other}`);
    cases++;
  }
  assert.ok(cases > 200, `ran ${cases} mutation cases`);
});

test('la-draft@1: outcome module requires module, cannot_satisfy requires cannot_satisfy', () => {
  const draft = fixture('la-draft@1.qui-and-que-after-a-noun.json');
  const refusal = fixture('la-draft@1.cannot-satisfy.json');
  assert.equal(draft.outcome, 'module');
  assert.equal(refusal.outcome, 'cannot_satisfy');

  const { module, ...noModule } = draft;
  assert.deepEqual(validateContract('la-draft@1', noModule), [': missing module']);
  const { cannot_satisfy, ...noReason } = refusal;
  assert.deepEqual(validateContract('la-draft@1', noReason), [': missing cannot_satisfy']);
  // The other branch's field is not demanded.
  assert.equal(refusal.module, undefined);
  assert.equal(draft.cannot_satisfy, undefined);
  // An unknown outcome is refused at its own pointer.
  assert.ok(validateContract('la-draft@1', { ...draft, outcome: 'maybe' }).some((e) => e.startsWith('/outcome: ')));
  // A reason code outside the list is refused.
  const badCode = clone(refusal);
  badCode.cannot_satisfy.reason_code = 'too_hard';
  assert.ok(validateContract('la-draft@1', badCode).some((e) => e.startsWith('/cannot_satisfy/reason_code: ')));
  // drafter_notes is capped at 4000 characters, counted as code points.
  assert.deepEqual(validateContract('la-draft@1', { ...draft, drafter_notes: 'é'.repeat(4000) }), []);
  assert.ok(validateContract('la-draft@1', { ...draft, drafter_notes: 'é'.repeat(4001) }).some((e) => e.startsWith('/drafter_notes: ')));
});

test('date-time format refuses a time without milliseconds or zone', () => {
  const check = (ts) => validateContract('la-pipeline-common@1#/$defs/time', ts);
  assert.deepEqual(check('2026-11-26T14:02:10.114Z'), []);
  for (const bad of [
    '2026-11-26T14:02:10Z', // no milliseconds
    '2026-11-26T14:02:10.114', // no zone
    '2026-11-26T14:02:10.114+01:00', // not UTC
    '2026-11-26T14:02:10.11Z', // two digits
    '2026-11-26 14:02:10.114Z', // space
    '2026-02-30T14:02:10.114Z', // no such day
    '2026-11-26T24:00:00.000Z',
    '2026-11-26t14:02:10.114z',
    '',
  ])
    assert.ok(check(bad).length > 0, bad);
  assert.ok(check(1764165730114).some((e) => e.includes('expected string')));
});

test('errors name the JSON pointer, escaped, under an optional base pointer', () => {
  const verdict = fixture('la-review-verdict@1.primary.json');
  const bad = clone(verdict);
  bad.findings[1].severity = 'fatal';
  bad.scores['R/1~'] = 9;
  const errors = validateContract('la-review-verdict@1', bad);
  assert.ok(errors.some((e) => e.startsWith('/findings/1/severity: ')), errors.join('; '));
  assert.ok(errors.some((e) => e.startsWith('/scores/R~11~0: ')), errors.join('; '));
  const v = createValidator([SCHEMA_DIR]);
  assert.ok(v.validate('la-review-verdict@1', bad, '/result').some((e) => e.startsWith('/result/findings/1/severity: ')));
  assert.deepEqual(v.validate('la-pipeline-common@1#/$defs/sha256', 'a'.repeat(64)), []);
  assert.throws(() => v.validate('la-nothing@1', {}), /unknown schema/);
  assert.throws(() => v.validate('la-pipeline-common@1#/$defs/nothing', {}), /unresolved/);
});

test('validator keywords: types, combinators and conditionals', (t) => {
  const dir = schemaDir(t, {
    'k.json': {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: 'la-k@1',
      type: 'object',
      properties: {
        n: { type: ['integer', 'null'], minimum: 1, maximum: 3 },
        num: { type: 'number' },
        s: { type: 'string', minLength: 2, maxLength: 3, pattern: '^[a-z]+$' },
        list: { type: 'array', minItems: 1, maxItems: 2, items: { $ref: '#/$defs/small' } },
        one: { oneOf: [{ type: 'integer' }, { type: 'number', minimum: 0 }] },
        any: { anyOf: [{ const: 'a' }, { enum: [{ x: [1, 2] }] }] },
        all: { allOf: [{ type: 'string' }, { minLength: 2 }] },
        map: { type: 'object', propertyNames: { pattern: '^R[0-9]+$' }, additionalProperties: { type: 'boolean' } },
        cond: { if: { type: 'string' }, then: { minLength: 2 }, else: { type: 'integer' } },
        any_value: true,
        never: false,
      },
      $defs: { small: { type: 'integer', maximum: 9 } },
    },
  });
  const v = createValidator([dir]);
  const ok = (doc) => assert.deepEqual(v.validate('la-k@1', doc), [], JSON.stringify(doc));
  const bad = (doc, prefix) => {
    const errors = v.validate('la-k@1', doc);
    assert.ok(errors.some((e) => e.startsWith(prefix)), `${JSON.stringify(doc)} → ${errors.join('; ')}`);
  };
  ok({ n: null, num: 1, s: 'ab', list: [9], one: 1.5, any: { x: [1, 2] }, all: 'ab', map: { R1: true }, cond: 'ab', any_value: [{}] });
  ok({ n: 2, cond: 4, any: 'a' });
  bad({ n: 1.5 }, '/n: expected integer|null');
  bad({ n: 0 }, '/n: ');
  bad({ n: 4 }, '/n: ');
  bad({ num: '1' }, '/num: ');
  bad({ s: 'a' }, '/s: ');
  bad({ s: 'abcd' }, '/s: ');
  bad({ s: 'AB' }, '/s: ');
  bad({ list: [] }, '/list: ');
  bad({ list: [1, 2, 3] }, '/list: ');
  bad({ list: [10] }, '/list/0: ');
  bad({ one: 1 }, '/one: oneOf matched 2'); // an integer is a number too
  bad({ one: -1.5 }, '/one: oneOf matched 0');
  bad({ any: { x: [2, 1] } }, '/any: anyOf matched 0');
  bad({ all: 'a' }, '/all: ');
  bad({ map: { X1: true } }, '/map/X1: ');
  bad({ map: { R1: 'yes' } }, '/map/R1: ');
  bad({ cond: 'a' }, '/cond: ');
  bad({ cond: 1.5 }, '/cond: ');
  bad({ never: 1 }, '/never: not allowed');
  bad([], ': expected object');
  // const and enum compare objects by value, whatever the key order.
  ok({ any: JSON.parse('{"x":[1,2]}') });
});

test('a schema with an unknown keyword fails to load', (t) => {
  const base = { $schema: 'https://json-schema.org/draft/2020-12/schema', $id: 'la-t@1' };
  assert.throws(() => createValidator([schemaDir(t, { 't.json': { ...base, type: 'object', requird: ['a'] } })]), /requird/);
  // Also deep inside: in properties, items, $defs and combinators.
  assert.throws(() => createValidator([schemaDir(t, { 't.json': { ...base, properties: { a: { type: 'string', minlength: 1 } } } })]), /minlength/);
  assert.throws(() => createValidator([schemaDir(t, { 't.json': { ...base, items: { maxitems: 1 } } })]), /maxitems/);
  assert.throws(() => createValidator([schemaDir(t, { 't.json': { ...base, $defs: { d: { patern: 'x' } } } })]), /patern/);
  assert.throws(() => createValidator([schemaDir(t, { 't.json': { ...base, anyOf: [{ uniqueItems: true }] } })]), /uniqueItems/);
  // A property *named* like a keyword typo is data, not a keyword.
  assert.doesNotThrow(() => createValidator([schemaDir(t, { 't.json': { ...base, properties: { requird: { type: 'string' } } } })]));
  // Annotations pass.
  assert.doesNotThrow(() => createValidator([schemaDir(t, { 't.json': { ...base, title: 'T', description: 'd', examples: [1], type: 'integer' } })]));
});

test('a schema with a bad value, a dangling $ref or a duplicate $id fails to load', (t) => {
  const base = { $schema: 'https://json-schema.org/draft/2020-12/schema', $id: 'la-t@1' };
  const load = (files) => () => createValidator([schemaDir(t, files)]);
  assert.throws(load({ 't.json': { ...base, type: 'text' } }), /type/);
  assert.throws(load({ 't.json': { ...base, format: 'date' } }), /format/);
  assert.throws(load({ 't.json': { ...base, pattern: '([' } }), /pattern/);
  assert.throws(load({ 't.json': { ...base, minLength: -1 } }), /minLength/);
  assert.throws(load({ 't.json': { ...base, required: 'a' } }), /required/);
  assert.throws(load({ 't.json': { ...base, enum: 'a' } }), /enum/);
  assert.throws(load({ 't.json': { ...base, $ref: 'la-missing@1#/$defs/x' } }), /la-missing@1/);
  assert.throws(load({ 't.json': { ...base, $ref: '#/$defs/nothing' } }), /nothing/);
  assert.throws(load({ 't.json': base, 'u.json': base }), /duplicate/);
  assert.throws(load({ 't.json': { type: 'object' } }), /\$id/);
  assert.throws(load({ 't.json': { ...base, $schema: 'http://json-schema.org/draft-07/schema#' } }), /\$schema/);
  assert.throws(load({ 't.json': { ...base, properties: { a: { $id: 'la-inner@1' } } } }), /\$id/);
  // A $ref across files resolves.
  assert.doesNotThrow(load({ 't.json': { ...base, $ref: 'la-u@1#/$defs/x' }, 'u.json': { ...base, $id: 'la-u@1', $defs: { x: { type: 'string' } } } }));
});

test('assertContract throws a ContractError carrying the id and every error', () => {
  const ack = fixture('la-release-ack@1.prototype.json');
  assert.doesNotThrow(() => assertContract('la-release-ack@1', ack));
  const bad = { ...ack, loaded_at: 'yesterday', by: 7 };
  assert.throws(
    () => assertContract('la-release-ack@1', bad),
    (e) => e instanceof ContractError && e.id === 'la-release-ack@1' && e.errors.length === 2 && /la-release-ack@1/.test(e.message),
  );
});

test('the engine task ties lens, header phase and output schema to its role', () => {
  const task = fixture('la-engine-task@1.draft.json');
  const review = fixture('la-engine-task@1.review.json');
  assert.ok(validateContract('la-engine-task@1', { ...task, lens: 'primary' }).some((e) => e.startsWith('/lens: ')));
  assert.ok(validateContract('la-engine-task@1', { ...review, lens: null }).some((e) => e.startsWith('/lens: ')));
  assert.ok(validateContract('la-engine-task@1', { ...task, output_schema: 'la-review-verdict@1' }).some((e) => e.startsWith('/output_schema: ')));
  assert.ok(validateContract('la-engine-task@1', { ...task, header_phase: 'final' }).some((e) => e.startsWith('/header_phase: ')));
  const header = { ...task, role: 'header', module_key: 'header:unit13:final', header_phase: 'final', output_schema: 'la-unit-header@1' };
  assert.deepEqual(validateContract('la-engine-task@1', header), []);
  assert.ok(validateContract('la-engine-task@1', { ...header, header_phase: null }).some((e) => e.startsWith('/header_phase: ')));
  assert.ok(validateContract('la-engine-task@1', { ...task, module_key: '../course' }).some((e) => e.startsWith('/module_key: ')));
});

test('a review request holds a brief, and the brief has no place for drafter notes', () => {
  const request = fixture('la-review-request@1.primary.json');
  const withNotes = clone(request);
  withNotes.brief.drafter_notes = 'I used arbre twice.';
  assert.deepEqual(validateContract('la-review-request@1', withNotes), ['/brief/drafter_notes: not allowed']);
  const withTopNotes = { ...clone(request), drafter_notes: 'x' };
  assert.deepEqual(validateContract('la-review-request@1', withTopNotes), ['/drafter_notes: not allowed']);
  assert.deepEqual(validateContract('la-review-request@1', { ...request, check_metrics: { C6: 2 } }).length, 1);
});
