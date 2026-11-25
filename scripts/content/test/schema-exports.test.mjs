import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KINDS, KIND_SCHEMAS, COMMON_FIELDS, PLANNED_FIELDS, REQUIRED_WRITTEN } from '../schema/module.mjs';
import { ITEM_TYPES, SHAPES, FIELD_ROLES, COMMON } from '../schema/item.mjs';

test('the schema tables are exported and match the kinds', () => {
  assert.deepEqual(Object.keys(KIND_SCHEMAS), KINDS);
  assert.deepEqual(Object.keys(SHAPES), ITEM_TYPES);
  for (const k of KINDS) assert.ok(Array.isArray(KIND_SCHEMAS[k].required), `${k} has a required list`);
  assert.ok(COMMON_FIELDS && PLANNED_FIELDS && REQUIRED_WRITTEN && FIELD_ROLES && Array.isArray(COMMON));
});
