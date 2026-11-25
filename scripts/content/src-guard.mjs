// `node scripts/content/src-guard.mjs [--base <commit>]`: exits 1 when src/lessons/modules differs from its merge-base
// with main (default: `git merge-base HEAD origin/main`, else main) outside BRANCH_FILES. On the content-layer branch
// the live app's lessons mirror main: course content for the new version is written in content/fr/ (its README), and a
// lesson change for the live app lands on main first, then reaches this branch with a merge.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// The repository root, found without load.mjs (which loads the app's answer checker).
const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url));

export const GUARDED = 'src/lessons/modules/';
// The files under src/lessons/modules this branch changed before the content layer (the course-guides work: the
// numbers lesson, the adjectives card, the negation guide), and the guide's pointer to content/fr/.
export const BRANCH_FILES = [
  'src/lessons/modules/MODULE_SYSTEM_GUIDE.md',
  'src/lessons/modules/unit2/adjectives.js',
  'src/lessons/modules/unit2/index.js',
  'src/lessons/modules/unit2/negation-guide.js',
  'src/lessons/modules/unit2/numbers.js',
  'src/lessons/modules/unit2/unit-config.js',
];

/** The changed paths under src/lessons/modules that BRANCH_FILES does not list. */
export const strayChanges = (changed) => changed.filter((f) => f.startsWith(GUARDED) && !BRANCH_FILES.includes(f));

const git = (...a) => execFileSync('git', a, { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

function mergeBase(args) {
  const i = args.indexOf('--base');
  if (i !== -1) return git('rev-parse', '--verify', `${args[i + 1]}^{commit}`);
  for (const ref of ['origin/main', 'main']) {
    try {
      git('rev-parse', '--verify', '--quiet', `${ref}^{commit}`);
      return git('merge-base', 'HEAD', ref);
    } catch {
      // the next ref
    }
  }
  throw new Error('no origin/main or main to compare with; fetch main (CI: actions/checkout with fetch-depth: 0) or pass --base <commit>');
}

export function main(args) {
  const base = mergeBase(args);
  // Committed changes and the working tree's, against main's commit.
  const changed = git('diff', '--name-only', base, '--', GUARDED).split('\n').filter(Boolean);
  const stray = strayChanges(changed);
  if (stray.length) {
    for (const f of stray) console.error(`${f} differs from main (${base.slice(0, 7)})`);
    console.error(
      `${stray.length} file${stray.length === 1 ? '' : 's'} under ${GUARDED} changed on this branch. The live app's lessons follow main: ` +
        'write course content in content/fr/ (see content/fr/README.md), or make the live change on main and merge it here.',
    );
    return 1;
  }
  console.log(`ok ${GUARDED.replace(/\/$/, '')} matches main (${base.slice(0, 7)}) outside the ${BRANCH_FILES.length} files this branch changed`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exitCode = main(process.argv.slice(2));
