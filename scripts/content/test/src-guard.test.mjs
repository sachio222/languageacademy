// On this branch the live app's lessons (src/lessons/modules) mirror main; new course content is written in content/fr/.
// CI fails when src/lessons/modules differs from the merge-base with main outside the files this branch already
// changed (final review I6).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const GUARD = fileURLToPath(new URL('../src-guard.mjs', import.meta.url));

test('only the files this branch already changed may differ from main', async () => {
  const { BRANCH_FILES, strayChanges } = await import('../src-guard.mjs');
  assert.deepEqual(strayChanges(BRANCH_FILES), []);
  assert.deepEqual(strayChanges([...BRANCH_FILES, 'src/lessons/modules/unit1/etre.js']), ['src/lessons/modules/unit1/etre.js']);
  // Outside src/lessons/modules nothing is guarded.
  assert.deepEqual(strayChanges(['src/components/LessonView.jsx']), []);
});

test('the guard passes on this checkout', () => {
  const r = spawnSync(process.execPath, [GUARD], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /src\/lessons\/modules matches main/);
});
