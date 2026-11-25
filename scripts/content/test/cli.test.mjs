import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { MINI_ROOT } from './mini-fixture.mjs';
import { CONTENT_ROOT } from '../load.mjs';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });

test('validate the fixture', () => {
  const r = run('validate', '--root', MINI_ROOT);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'ok 6 modules');
});

test('a missing default content folder is an empty course', { skip: existsSync(CONTENT_ROOT) && 'content/fr exists' }, () => {
  const r = run('validate');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'ok 0 modules');
});

test('an explicit root that is missing is an error', () => {
  const r = run('validate', '--root', MINI_ROOT + 'does-not-exist');
  assert.equal(r.status, 1);
  assert.equal(r.stdout, '');
  assert.match(r.stderr, /does-not-exist/);
});

test('--root needs a value', () => {
  for (const args of [['validate', '--root'], ['validate', '--root', '--other']]) {
    const r = run(...args);
    assert.equal(r.status, 2, args.join(' '));
    assert.equal(r.stdout, '');
  }
});

test('unknown command', () => {
  const r = run('frobnicate');
  assert.equal(r.status, 2);
});
