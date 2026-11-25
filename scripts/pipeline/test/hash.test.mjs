// hash.mjs: the hashes and ids every pipeline record carries (design §4.1). Hashes are lowercase hex SHA-256 over
// canonical JSON; a task id is the first 24 hex of one; event ids are ULIDs; drafts are NFC-normalized on ingest.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { canonicalJson } from '../../content/bundle.mjs';
import { canonicalSha256, normalizeNfc, sha256Hex, taskIdFor, ulid } from '../hash.mjs';

const HEX = (n) => new RegExp(`^[0-9a-f]{${n}}$`);
const sha = (c) => c.repeat(64);
const BASE = {
  subject: 'qui-and-que-after-a-noun',
  role: 'draft',
  lens: null,
  round: 1,
  input_sha256: sha('a'),
  prompt_sha256: sha('b'),
  engine_config_sha256: sha('c'),
  reviewer_source: null,
};

test('sha256Hex hashes strings as UTF-8 and buffers as bytes', () => {
  assert.equal(sha256Hex(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  assert.equal(sha256Hex('é'), createHash('sha256').update(Buffer.from('é', 'utf8')).digest('hex'));
  assert.equal(sha256Hex(Buffer.from([0, 255])), createHash('sha256').update(Buffer.from([0, 255])).digest('hex'));
  assert.throws(() => sha256Hex(42), TypeError);
  assert.throws(() => sha256Hex({}), TypeError);
});

test('canonicalSha256 ignores key order', () => {
  const a = { b: 1, a: { d: [3, { y: 1, x: 2 }], c: 'é' } };
  const b = { a: { c: 'é', d: [3, { x: 2, y: 1 }] }, b: 1 };
  assert.equal(canonicalSha256(a), canonicalSha256(b));
  assert.equal(canonicalSha256(a), sha256Hex(canonicalJson(a)));
  assert.match(canonicalSha256(a), HEX(64));
  // Arrays keep their order.
  assert.notEqual(canonicalSha256([1, 2]), canonicalSha256([2, 1]));
});

test('canonicalSha256 does not normalize: NFD and NFC text hash differently', () => {
  assert.notEqual(canonicalSha256({ fr: 'e\u0301te\u0301' }), canonicalSha256({ fr: '\u00e9t\u00e9' }));
  assert.throws(() => canonicalSha256(undefined), TypeError);
});

test('normalizeNfc turns e + U+0301 into é everywhere in a nested value', () => {
  const nfd = 'e\u0301';
  const input = {
    title: `l${nfd}t${nfd}`,
    items: [{ answer: `caf${nfd}`, accept: [`th${nfd}`, 'plain'], n: 3, ok: true, none: null }],
    [`cl${nfd}`]: { deep: [[`${nfd}`]] },
  };
  const out = normalizeNfc(input);
  assert.deepEqual(out, {
    title: 'lété',
    items: [{ answer: 'café', accept: ['thé', 'plain'], n: 3, ok: true, none: null }],
    clé: { deep: [['é']] },
  });
  assert.ok(!JSON.stringify(out).includes('\u0301'), 'no combining accent left anywhere');
  // A deep copy: the input is untouched and shares no object with the output.
  assert.equal(input.items[0].answer, `caf${nfd}`);
  assert.notEqual(out.items, input.items);
  assert.equal(normalizeNfc(`${nfd}`), 'é');
  assert.equal(normalizeNfc(7), 7);
  assert.equal(normalizeNfc(null), null);
});

test('normalizeNfc keeps a __proto__ key as data and refuses keys that collide after normalization', () => {
  const parsed = JSON.parse('{"__proto__": {"x": "e\u0301"}, "a": 1}');
  const out = normalizeNfc(parsed);
  assert.equal(Object.getPrototypeOf(out), Object.prototype);
  assert.deepEqual(Object.keys(out), ['__proto__', 'a']);
  assert.equal(out.__proto__.x, 'é'); // eslint-disable-line no-proto
  assert.throws(() => normalizeNfc({ 'e\u0301': 1, '\u00e9': 2 }), /collide/);
  assert.throws(() => normalizeNfc({ when: new Date(0) }), TypeError);
  assert.throws(() => normalizeNfc({ f: () => 1 }), TypeError);
});

test('taskIdFor differs by lens and by reviewer_source, and is 24 hex', () => {
  const id = taskIdFor(BASE);
  assert.match(id, HEX(24));
  assert.equal(id, canonicalSha256({ ...BASE, lens: 'none', reviewer_source: 'none' }).slice(0, 24));
  assert.equal(taskIdFor({ ...BASE, lens: undefined, reviewer_source: undefined }), id, 'null and missing both mean none');

  const review = { ...BASE, role: 'review' };
  const primary = taskIdFor({ ...review, lens: 'primary' });
  const french = taskIdFor({ ...review, lens: 'french' });
  assert.notEqual(primary, french);
  assert.notEqual(primary, taskIdFor(review));

  const repair = { ...BASE, role: 'repair', round: 2 };
  const fromChecks = taskIdFor({ ...repair, reviewer_source: 'checks' });
  const fromJake = taskIdFor({ ...repair, reviewer_source: 'jake' });
  assert.notEqual(fromChecks, fromJake);

  for (const [k, v] of [['subject', 'other-module'], ['round', 2], ['input_sha256', sha('d')], ['prompt_sha256', sha('d')], ['engine_config_sha256', sha('d')], ['role', 'header']])
    assert.notEqual(taskIdFor({ ...BASE, [k]: v }), id, `${k} is part of the id`);
});

test('taskIdFor refuses inputs that would hash to a silent collision', () => {
  assert.throws(() => taskIdFor({ ...BASE, subject: '' }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, role: 'drafter' }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, lens: 'pedantic' }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, round: 0 }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, round: 1.5 }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, input_sha256: 'abc' }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, prompt_sha256: undefined }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, engine_config_sha256: sha('A') }), TypeError);
  assert.throws(() => taskIdFor({ ...BASE, reviewer_source: 'reviewer' }), TypeError);
});

test('taskIdFor refuses a lens on a role that has none', () => {
  for (const role of ['draft', 'repair', 'header'])
    for (const lens of ['primary', 'french', 'method'])
      assert.throws(() => taskIdFor({ ...BASE, role, lens }), /lens/, `${role} with lens ${lens}`);
  // 'none', null and a missing lens all mean no lens, and pass.
  for (const lens of ['none', null, undefined]) assert.doesNotThrow(() => taskIdFor({ ...BASE, role: 'repair', lens }));
  assert.doesNotThrow(() => taskIdFor({ ...BASE, role: 'review', lens: 'french' }));
});

test('ulid sorts by time', () => {
  const r = Buffer.alloc(10, 0xff);
  const ids = [0, 1, 999, 1000, 1469918176385, 1764165002551, 2 ** 48 - 1].map((ms) => ulid(ms, r));
  for (const id of ids) assert.match(id, /^[0-9A-HJKMNP-TV-Z]{26}$/);
  assert.deepEqual([...ids].sort(), ids);
  // Same millisecond: the random part orders them.
  assert.ok(ulid(5, Buffer.alloc(10, 0)) < ulid(5, Buffer.alloc(10, 1)));
  // A later time sorts after an earlier one whatever the random part.
  assert.ok(ulid(6, Buffer.alloc(10, 0)) > ulid(5, Buffer.alloc(10, 0xff)));
});

test('ulid encodes the spec vector and refuses bad input', () => {
  // The ULID spec's example timestamp 1469918176385 encodes as 01ARYZ6S41.
  assert.equal(ulid(1469918176385, Buffer.alloc(10, 0)), '01ARYZ6S41' + '0'.repeat(16));
  assert.equal(ulid(0, Buffer.alloc(10, 0xff)), '0'.repeat(10) + 'Z'.repeat(16));
  assert.equal(ulid(2 ** 48 - 1, Buffer.alloc(10, 0)), '7ZZZZZZZZZ' + '0'.repeat(16));
  assert.throws(() => ulid(-1, Buffer.alloc(10)), TypeError);
  assert.throws(() => ulid(2 ** 48, Buffer.alloc(10)), TypeError);
  assert.throws(() => ulid(1.5, Buffer.alloc(10)), TypeError);
  assert.throws(() => ulid(1, Buffer.alloc(9)), TypeError);
  assert.throws(() => ulid(1, 'random'), TypeError);
});

test('this file writes every combining mark as a \\u escape, so an editor cannot recompose an NFD string unseen', () => {
  const source = readFileSync(fileURLToPath(import.meta.url), 'utf8');
  const raw = [...source.matchAll(/\p{M}/gu)].map((m) => `U+${m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0')} at offset ${m.index}`);
  assert.deepEqual(raw, []);
});
