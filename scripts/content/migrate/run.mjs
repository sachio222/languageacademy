// Content migration (spec 8.2). Each command writes generated files under content/fr/ through a temporary file
// and a rename, prints `unchanged`, `wrote` or `would change` per file, and refuses to overwrite a file that
// differs from what it would write unless given --force (a hand-edited outline or a frozen table is kept).
//
//   node scripts/content/migrate/run.mjs outline [--check] [--force]
//     content/fr/course.json from this checkout's unit configs.
//   node scripts/content/migrate/run.mjs positions --ref <commit> [--tmp <dir>] [--check] [--force]
//     content/fr/legacy/positions-<sha7>.json: the live positions on <commit>, read from a temporary
//     `git worktree add` of that commit under <dir> (default: the system temp folder), removed afterwards.
//
// --check writes nothing and exits 1 if any file would change.
import '../test/vite-shim.mjs'; // lets Node import src/ files written for Vite
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, CONTENT_ROOT } from '../load.mjs';
import { outlineFromUnitConfigs } from './outline.mjs';
import { frozenPositions, checkAgainstLessons } from './positions.mjs';

const rel = (p) => relative(REPO_ROOT, p) || '.';
const json = (v) => JSON.stringify(v, null, 2) + '\n';
const importFrom = (root, p) => import(pathToFileURL(join(root, p)).href);

function option(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const v = args[i + 1];
  if (v === undefined || v.startsWith('--')) throw new UsageError(`${name} needs a value`);
  return v;
}
class UsageError extends Error {}

// 0 when the file holds `text` (or now does), 1 when --check finds a change or the file differs without --force.
function writeFile(file, text, { check, force }) {
  const existing = existsSync(file) ? readFileSync(file, 'utf8') : null;
  if (existing === text) {
    console.log(`unchanged ${rel(file)}`);
    return 0;
  }
  if (check) {
    console.log(`would change ${rel(file)}`);
    return 1;
  }
  if (existing !== null && !force) {
    console.error(`${rel(file)} differs from what this command writes; it is kept. Rerun with --force to overwrite it.`);
    return 1;
  }
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, text);
  renameSync(tmp, file);
  console.log(`wrote ${rel(file)}`);
  return 0;
}

async function outline(args, flags) {
  const { unitConfigs } = await importFrom(REPO_ROOT, 'src/lessons/unitConfigLoader.js');
  const settings = JSON.parse(readFileSync(join(REPO_ROOT, 'curriculum-graph/core/settings.json'), 'utf8'));
  const { outline: o, report } = outlineFromUnitConfigs(unitConfigs, { opensWords: settings.reference.modules });
  for (const line of report) console.log(`  ${line}`);
  const entries = o.units.reduce((n, u) => n + u.entries.length, 0);
  console.log(`outline: ${o.units.length} units, ${entries} unit entries, ${o.shelf.pages.length} shelf pages`);
  return writeFile(join(CONTENT_ROOT, 'course.json'), json(o), flags);
}

async function positions(args, flags) {
  const ref = option(args, '--ref');
  if (!ref) throw new UsageError('positions needs --ref <commit>');
  const git = (...a) => execFileSync('git', a, { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const sha = git('rev-parse', '--verify', '--short=7', `${ref}^{commit}`);
  const parent = resolve(option(args, '--tmp') ?? tmpdir());
  if (!existsSync(parent)) throw new UsageError(`--tmp ${parent}: no such folder`);
  const dir = join(parent, `la-positions-${sha}`);
  if (existsSync(dir)) throw new UsageError(`${dir} already exists; remove it first (git worktree remove)`);

  console.log(`worktree: ${dir} (${ref} = ${sha})`);
  git('worktree', 'add', '--detach', dir, sha);
  let status;
  try {
    const { unitConfigs } = await importFrom(dir, 'src/lessons/unitConfigLoader.js');
    const { lessons } = await importFrom(dir, 'src/lessons/lessonData.js');
    const table = frozenPositions(unitConfigs);
    checkAgainstLessons(table, lessons);
    console.log(`positions: ${Object.keys(table).length} on ${sha}; 14 is ${table['14']}`);
    status = writeFile(join(CONTENT_ROOT, 'legacy', `positions-${sha}.json`), json(table), flags);
  } finally {
    try {
      git('worktree', 'remove', dir);
      console.log(`removed worktree: ${dir}`);
    } catch (e) {
      console.error(`could not remove worktree ${dir}: ${String(e.stderr || e.message).trim()}`);
      status = 1;
    }
  }
  return status;
}

const COMMANDS = { outline, positions };
const USAGE = 'usage: node scripts/content/migrate/run.mjs outline|positions [--ref <commit>] [--tmp <dir>] [--check] [--force]';

const [command, ...args] = process.argv.slice(2);
try {
  if (!COMMANDS[command]) throw new UsageError(USAGE);
  const flags = { check: args.includes('--check'), force: args.includes('--force') };
  process.exitCode = await COMMANDS[command](args, flags);
} catch (e) {
  if (!(e instanceof UsageError)) throw e;
  console.error(e.message);
  process.exitCode = 2;
}
