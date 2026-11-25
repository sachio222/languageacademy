// The main-merge path (final review I2): main changes a lesson in src/lessons/modules, the branch merges main, and
// one `pnpm content:migrate` brings the module files, the record, the report and the golden snapshot up to date, so
// `content:migrate --check` and the golden test pass at once. Run in a temporary clone of this checkout (its
// uncommitted changes copied in), with a commit standing in for main.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('../../../', import.meta.url));
const git = (cwd, ...a) => execFileSync('git', a, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const liveBase = (() => {
  for (const ref of ['origin/main', 'main']) {
    try {
      git(REPO, 'rev-parse', '--verify', '--quiet', `${ref}^{commit}`);
      return git(REPO, 'merge-base', 'HEAD', ref);
    } catch {
      // next
    }
  }
  return null;
})();

const LESSON = 'src/lessons/modules/unit1/connectors.js';
const OLD_HINT = "hint: \"Show contrast with 'mais'\"";
const NEW_HINT = "hint: \"Show the contrast with 'mais'\"";

// A clone of this checkout with its uncommitted work committed; returns { tmp, repo, run, branch }.
function cloneHere(t) {
  const tmp = mkdtempSync(join(tmpdir(), 'la-main-merge-'));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));
  const repo = join(tmp, 'repo');
  git(tmp, 'clone', '--quiet', '--shared', REPO, repo);
  // This checkout's commit, whatever its HEAD is (a CI pull request checks out a detached merge commit).
  git(repo, 'checkout', '--quiet', '--detach', git(REPO, 'rev-parse', 'HEAD'));
  const run = (...a) => git(repo, ...a);
  run('config', 'user.email', 'test@example.com');
  run('config', 'user.name', 'test');
  // This checkout's uncommitted work, so the clone runs the scripts as they are here.
  const changed = git(REPO, 'ls-files', '-m', '-o', '--exclude-standard', '-z').split('\0').filter((f) => f && !f.startsWith('public/historical-css/') && f !== 'node_modules');
  for (const f of changed) if (existsSync(join(REPO, f))) cpSync(join(REPO, f), join(repo, f), { recursive: true });
  if (changed.length) {
    run('add', '-A');
    run('commit', '--quiet', '-m', 'work in progress');
  }
  if (existsSync(join(REPO, 'node_modules'))) symlinkSync(join(REPO, 'node_modules'), join(repo, 'node_modules'));
  return { tmp, repo, run };
}

// main changes one hint in a lesson's source; the branch (its HEAD now) merges main. Returns main's commit.
function mergeMainHintChange({ repo, run }) {
  const branch = run('rev-parse', 'HEAD');
  run('checkout', '--quiet', '--detach', liveBase);
  const file = join(repo, LESSON);
  const src = readFileSync(file, 'utf8');
  assert.ok(src.includes(OLD_HINT), `${LESSON} no longer holds ${OLD_HINT}`);
  writeFileSync(file, src.replace(OLD_HINT, NEW_HINT));
  run('commit', '--quiet', '-am', 'main: a hint reworded');
  const main = run('rev-parse', 'HEAD');
  run('checkout', '--quiet', '--detach', branch);
  run('merge', '--quiet', '--no-edit', main);
  return main;
}
const migrateIn = ({ repo, tmp }, live) => (...a) =>
  spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', 'scripts/content/migrate/run.mjs', ...a, '--live-ref', live, '--tmp', tmp], { cwd: repo, encoding: 'utf8' });
// The golden test, run in the clone as its own test run (without NODE_TEST_CONTEXT, node --test inside a test skips
// every file and exits 0).
const goldenIn = ({ repo }) => {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', '--test', 'scripts/content/test/golden.test.mjs'], { cwd: repo, encoding: 'utf8', env });
};
const failures = (r) => r.stdout.split('\n').filter((l) => /^✖|not ok|AssertionError|\+ |- |unexplained/.test(l)).slice(0, 40).join('\n') || r.stderr;
const ran = (r) => /^ℹ pass [1-9]/m.test(r.stdout);
const wouldChange = (r) => r.stdout.split('\n').filter((l) => /^would change/.test(l)).join('\n') + r.stderr;
const MODULE = 'content/fr/modules/2024-01-08-connectors.json';

test('merge main, run content:migrate once: --check, --force --check and the golden test pass', { skip: !liveBase && 'no main in this checkout', timeout: 300000 }, (t) => {
  const c = cloneHere(t);
  const { repo } = c;
  const main = mergeMainHintChange(c);
  const migrate = migrateIn(c, main);
  const first = migrate();
  assert.equal(first.status, 0, first.stdout.slice(-2000) + first.stderr);
  // What changed since the last run is printed, never written into the report.
  assert.match(first.stdout, /converted again from the changed source/);
  const report = readFileSync(join(repo, 'content/fr/migration-report.md'), 'utf8');
  assert.doesNotMatch(report, /since the last run/);
  const connectors = JSON.parse(readFileSync(join(repo, MODULE), 'utf8'));
  assert.ok(connectors.items.some((i) => /Show the contrast/.test(i.hint ?? '')), 'the new hint reached the module file');

  assert.equal(migrate('--check').status, 0, wouldChange(migrate('--check')));
  const forced = migrate('--force', '--check');
  assert.equal(forced.status, 0, wouldChange(forced));
  const golden = goldenIn(c);
  assert.ok(ran(golden), 'the golden test ran');
  assert.equal(golden.status, 0, failures(golden));
});

test('a main change under a hand edit stops the run until it is settled or accepted (final review M3)', { skip: !liveBase && 'no main in this checkout', timeout: 300000 }, (t) => {
  const c = cloneHere(t);
  const { repo, run } = c;
  // A writer rewords the same hint in the module file; a run records it as a hand fix.
  const file = join(repo, MODULE);
  const mod = JSON.parse(readFileSync(file, 'utf8'));
  const item = mod.items.find((i) => /contrast/.test(i.hint ?? ''));
  item.hint = 'Contrast two ideas with {mais}.';
  writeFileSync(file, JSON.stringify(mod, null, 2) + '\n');
  const recorded = migrateIn(c, liveBase)();
  assert.equal(recorded.status, 0, recorded.stderr);
  run('commit', '--quiet', '-am', 'a hand edit');

  const main = mergeMainHintChange(c);
  const migrate = migrateIn(c, main);
  const first = migrate();
  assert.equal(first.status, 1, 'the run exits 1 while a main change sits under a hand edit');
  assert.match(first.stderr, new RegExp(`conflict 2024-01-08-connectors items\\[\\d+\\]: hand edit kept; the source changed under it \\(items/${item.id}\\)`));
  assert.equal(JSON.parse(readFileSync(file, 'utf8')).items.find((i) => i.id === item.id).hint, item.hint, 'the hand edit is kept');
  assert.equal(migrate('--check').status, 1, 'CI fails on an unsettled conflict');
  assert.equal(migrate('--force', '--check').status, 1, '--force reports the same conflict');

  const accepted = migrate('--accept-conflicts');
  assert.equal(accepted.status, 0, accepted.stderr);
  assert.match(accepted.stdout, new RegExp(`accepted: hand edit kept over the new output.*items/${item.id}`));
  assert.equal(migrate('--check').status, 0, wouldChange(migrate('--check')));
  const forced = migrate('--force', '--check');
  assert.equal(forced.status, 0, wouldChange(forced));
  // The live app now shows main's hint, L the writer's: a recorded hand fix, which the golden test allows.
  const golden = goldenIn(c);
  assert.ok(ran(golden), 'the golden test ran');
  assert.equal(golden.status, 0, failures(golden));
});
