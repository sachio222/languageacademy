// The shared catalog of reading types (reading-types.json): one list for every language.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readReadingTypes } from '../plan.mjs';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const catalog = readReadingTypes();

test('every reading type has a unique id, a name, a situation, what it practises, a level range and two or three examples', () => {
  const ids = catalog.types.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, 'ids are unique');
  for (const t of catalog.types) {
    assert.match(t.id, /^[a-z][a-z-]*$/, t.id);
    for (const field of ['name', 'situation', 'practises']) assert.ok(typeof t[field] === 'string' && t[field].length > 5, `${t.id}.${field}`);
    assert.equal(t.levels.length, 2, `${t.id}.levels`);
    const [from, to] = t.levels.map((l) => LEVELS.indexOf(l));
    assert.ok(from >= 0 && to >= from, `${t.id}: levels run from low to high`);
    assert.ok(t.examples.length >= 2 && t.examples.length <= 3, `${t.id}: two or three examples`);
  }
});

test('the catalog names no language: the written readings it records are keyed by language code', () => {
  assert.ok(catalog.byId instanceof Map && catalog.byId.size === catalog.types.length);
  for (const [lang, readings] of Object.entries(catalog.written).filter(([k]) => k !== 'about')) {
    assert.match(lang, /^[a-z]{2,3}$/);
    for (const [key, type] of Object.entries(readings)) assert.ok(catalog.byId.has(type), `${lang} ${key}: ${type} is a catalog type`);
  }
});
