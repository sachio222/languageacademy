// Tasks 6 and 7: `--check` (every kind: lessons, practice sets, unit exams, guides, readings, Reference pages) exits 0 on the committed content and 1 when a rerun would change a file, writing nothing.
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

test('--check: exit 0 as committed, 1 when a file would change', { skip: !hasMain && 'no main in this checkout' }, (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-check-'));
  const work = mkdtempSync(join(tmpdir(), 'la-check-wt-'));
  t.after(() => {
    rmSync(root, { recursive: true, force: true });
    rmSync(work, { recursive: true, force: true });
  });
  cpSync(join(REPO, 'content/fr'), root, { recursive: true });
  const check = () => spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, '--check', '--root', root, '--tmp', work], { cwd: REPO, encoding: 'utf8' });
  const ok = check();
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  for (const key of ['2024-10-21-cognates-help', '2026-11-24-negation-guide', '2024-01-09-reading1', '2024-04-01-alphabet'])
    assert.match(ok.stdout, new RegExp(`unchanged .*modules/${key}\\.json`), `--check covers ${key}`);

  // A title edited by hand is kept, but the report and hand-fixes.json would record it: a change.
  const file = join(root, 'modules', '2024-01-02-etre.json');
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  mod.title = 'Edited by hand';
  const text = JSON.stringify(mod, null, 2) + '\n';
  writeFileSync(file, text);
  const changed = check();
  assert.equal(changed.status, 1, changed.stdout + changed.stderr);
  assert.match(changed.stdout, /would change .*hand-fixes\.json/);
  assert.equal(readFileSync(file, 'utf8'), text, '--check writes nothing');
});

test('--force gives back every committed file: ids, hand fixes and record bases stay (final review I3)', { skip: !hasMain && 'no main in this checkout' }, (t) => {
  const root = mkdtempSync(join(tmpdir(), 'la-force-'));
  const work = mkdtempSync(join(tmpdir(), 'la-force-wt-'));
  t.after(() => {
    rmSync(root, { recursive: true, force: true });
    rmSync(work, { recursive: true, force: true });
  });
  cpSync(join(REPO, 'content/fr'), root, { recursive: true });
  const r = spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', RUN, '--force', '--check', '--root', root, '--tmp', work], { cwd: REPO, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout.split('\n').filter((l) => l.startsWith('would change')).join('\n') + r.stderr);
});
