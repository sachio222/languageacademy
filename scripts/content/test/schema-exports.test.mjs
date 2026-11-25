import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KINDS, KIND_SCHEMAS, COMMON_FIELDS, PLANNED_FIELDS, REQUIRED_WRITTEN, TEACHING_FIELDS, TEST_KINDS } from '../schema/module.mjs';
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
