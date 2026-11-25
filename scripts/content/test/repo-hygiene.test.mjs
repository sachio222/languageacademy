// Repository settings the content scripts rely on (final review M7, M8).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT } from '../load.mjs';

const scripts = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8')).scripts;

test('node_modules is ignored as a folder or as a symlink to one', () => {
  // A worktree links node_modules to another checkout's; `node_modules/` alone matches folders only.
  const r = spawnSync('git', ['check-ignore', '-q', '--no-index', 'node_modules'], { cwd: REPO_ROOT });
  assert.equal(r.status, 0, 'git does not ignore node_modules');
});

test('content:validate prints no Node warning about module types', () => {
  // The checker imports src/lessons/testRunner.js, which has no "type"; the warning is noise in every build log.
  assert.match(scripts['content:validate'], /--disable-warning=MODULE_TYPELESS_PACKAGE_JSON/);
  const r = spawnSync(scripts['content:validate'], { cwd: REPO_ROOT, shell: true, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.doesNotMatch(r.stderr, /MODULE_TYPELESS_PACKAGE_JSON/);
});
