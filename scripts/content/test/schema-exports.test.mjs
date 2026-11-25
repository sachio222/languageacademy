import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  KINDS, KIND_SCHEMAS, COMMON_FIELDS, PLANNED_FIELDS, REQUIRED_WRITTEN, TEACHING_FIELDS, TEST_KINDS, SHORT_TITLE_MAX, GUIDE_CHECKS, SPEED_MATCH_WORDS,
} from '../schema/module.mjs';
import { ITEM_TYPES, SHAPES, FIELD_ROLES, COMMON, PART_FIELDS } from '../schema/item.mjs';

test('the schema tables are exported and match the kinds', () => {
  assert.deepEqual(Object.keys(KIND_SCHEMAS), KINDS);
  assert.deepEqual(Object.keys(SHAPES), ITEM_TYPES);
  assert.deepEqual(Object.keys(FIELD_ROLES), ITEM_TYPES);
  for (const k of KINDS) assert.ok(Array.isArray(KIND_SCHEMAS[k].required), `${k} has a required list`);
  assert.ok(COMMON_FIELDS && FIELD_ROLES && Array.isArray(COMMON));
  assert.ok(Array.isArray(REQUIRED_WRITTEN.default), 'REQUIRED_WRITTEN.default is a list');
  for (const f of ['plan', 'teaches']) assert.ok(Object.hasOwn(PLANNED_FIELDS, f), `PLANNED_FIELDS has ${f}`);
});

// The pipeline's JSON Schemas (scripts/pipeline/contracts/module-schema.mjs) read these too.
test('the rules beside the tables are exported: teaching fields, test kinds, the fields of a mistake, blank and option', () => {
  assert.deepEqual(TEACHING_FIELDS, ['vocabulary', 'concepts', 'tables']);
  assert.deepEqual(TEST_KINDS, ['practice', 'unit_exam']);
  assert.deepEqual(PART_FIELDS, { mistake: ['answer', 'feedback'], blank: ['answer', 'accept'], option: ['text', 'fr', 'right'] });
});

test('the exported tables are frozen all the way down, and the limits the code checks are exported', () => {
  const tables = { KIND_SCHEMAS, COMMON_FIELDS, PLANNED_FIELDS, REQUIRED_WRITTEN, TEACHING_FIELDS, TEST_KINDS, SHAPES, FIELD_ROLES, COMMON, PART_FIELDS };
  const open = [];
  const walk = (v, at) => {
    if (v === null || typeof v !== 'object' || v instanceof RegExp) return;
    if (!Object.isFrozen(v)) open.push(at);
    for (const [k, x] of Object.entries(v)) walk(x, `${at}.${k}`);
  };
  for (const [name, t] of Object.entries(tables)) walk(t, name);
  assert.deepEqual(open, []);
  assert.deepEqual([SHORT_TITLE_MAX, GUIDE_CHECKS, SPEED_MATCH_WORDS], [40, 3, 6]);
});
