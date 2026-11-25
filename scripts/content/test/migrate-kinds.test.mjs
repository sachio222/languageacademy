// Task 7: a run limited to some kinds leaves the modules it does not write exactly as they were, merge base
// included, so a later full run still takes a source change to them (and never freezes stale text as a hand fix).
// It reads live ids from main through a git worktree, so it needs main's history (CI: fetch-depth 0).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../../../', import.meta.url));
const RUN = join(REPO, 'scripts/content/migrate/run.mjs');
const hasMain = ['origin/main', 'main'].some((ref) => {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], { cwd: REPO, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});
const KEY = '2024-10-21-cognates-help';

test('a limited run carries the other modules’ records and hand fixes forward', { skip: !hasMain && 'no main in this checkout' }, (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-kinds-'));
  const work = mkdtempSync(join(tmpdir(), 'la-kinds-wt-'));
  t.after(() => {
    rmSync(root, { recursive: true, force: true });
    rmSync(work, { recursive: true, force: true });
  });
  cpSync(join(REPO, 'content/fr'), root, { recursive: true });
  const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
  const run = (...words) => {
    const r = spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, ...words, '--root', root, '--tmp', work], { cwd: REPO, encoding: 'utf8' });
    assert.equal(r.status, 0, r.stdout + r.stderr);
    return r;
  };

  // L rewrites a note in the Cognates guide.
  const l = read('legacy/l-sources.json');
  l.guides[0].parts[1].note = 'L rewrote this note.';
  writeFileSync(join(root, 'legacy/l-sources.json'), JSON.stringify(l, null, 2) + '\n');
  const before = { file: readFileSync(join(root, `modules/${KEY}.json`), 'utf8'), record: read('legacy/migration-sources.json')[KEY], fixes: read('legacy/hand-fixes.json')[KEY] };

  // A lessons-only run writes no guide, and leaves the guide's record and hand fixes as they were.
  run('lessons');
  assert.equal(readFileSync(join(root, `modules/${KEY}.json`), 'utf8'), before.file);
  assert.deepEqual(read('legacy/migration-sources.json')[KEY], before.record);
  assert.deepEqual(read('legacy/hand-fixes.json')[KEY], before.fixes);

  // The full run that follows takes L's change, as a source change, not a hand fix: the guide's hand fixes (one
  // part, since C4) stay exactly as they were.
  run();
  const guide = read(`modules/${KEY}.json`);
  assert.equal(guide.parts[1].note, 'L rewrote this note.');
  assert.deepEqual(read('legacy/hand-fixes.json')[KEY], before.fixes);
});
