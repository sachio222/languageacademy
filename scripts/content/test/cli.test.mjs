import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { MINI_ROOT } from './mini-fixture.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });

test('validate the fixture', () => {
  const r = run('validate', '--root', MINI_ROOT);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'ok 6 modules');
});

test('a missing content folder is an empty course', () => {
  const r = run('validate', '--root', MINI_ROOT + 'does-not-exist');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'ok 0 modules');
});

test('unknown command', () => {
  const r = run('frobnicate');
  assert.equal(r.status, 2);
});
