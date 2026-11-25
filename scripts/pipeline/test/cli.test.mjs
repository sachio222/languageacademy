// `pnpm pipeline <command>`: the dispatcher. Task 5 gives it `help` only; later tasks add commands to its table.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CLI = fileURLToPath(new URL('../cli.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', CLI, ...args], { encoding: 'utf8' });

test('help, --help and no command print the usage and exit 0', () => {
  for (const args of [['help'], ['--help'], ['-h'], []]) {
    const r = run(...args);
    assert.equal(r.status, 0, args.join(' '));
    assert.match(r.stdout, /^usage: pnpm pipeline <command>/);
    assert.match(r.stdout, /\n {2}help {2,}/);
    assert.equal(r.stderr, '');
  }
});

test('an unknown command exits 2 with the usage on stderr', () => {
  const r = run('stepp');
  assert.equal(r.status, 2);
  assert.equal(r.stdout, '');
  assert.match(r.stderr, /^stepp: not a pipeline command\nusage: pnpm pipeline <command>/);
});
