import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { FIELDS, levelOf } from '../fields.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const { unitConfigs } = await import(pathToFileURL(join(repoRoot, 'src/lessons/unitConfigLoader.js')).href);

test('every registry entry is read or ignored, with a reason', () => {
  for (const [level, fields] of Object.entries(FIELDS)) {
    for (const [name, f] of Object.entries(fields)) {
      assert.ok(['read', 'ignored'].includes(f.status), `${level}.${name}`);
      assert.ok(typeof f.reason === 'string' && f.reason.trim() && !f.reason.includes('\n'), `${level}.${name}`);
    }
  }
});

// Walks every module on the learner's path (the Reference unit is not on it, as in readCourse) and names each field
// by its level. A field the registry does not list fails here, so French cannot sit in a field nobody reads.
test('the real course has no field outside the registry', () => {
  const missing = new Set();
  const walk = (value, level) => {
    if (Array.isArray(value)) { value.forEach((v) => walk(v, level)); return; }
    if (!value || typeof value !== 'object') return;
    for (const [name, child] of Object.entries(value)) {
      if (!FIELDS[level]?.[name]) { missing.add(`${level}.${name}`); continue; }
      const next = levelOf(level, name);
      if (next) walk(child, next);
    }
  };
  for (const unit of unitConfigs) {
    if (String(unit.metadata.title).startsWith('Reference')) continue;
    for (const mod of unit.modules) walk(mod, 'module');
  }
  assert.deepEqual([...missing].sort(), []);
});
