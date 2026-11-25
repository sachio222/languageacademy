// Content migration (spec 8.2). Each command writes files under content/fr/ through a temporary file and a
// rename, and prints `unchanged`, `wrote` or `would change` per file.
//
//   node scripts/content/migrate/run.mjs outline [--root <content dir>] [--check] [--force]
//     content/fr/course.json from this checkout's unit configs. An existing course.json is kept: only config
//     keys (or whole config units) it lacks are inserted, next to their config neighbours, and reported; hand
//     edits (new guides, unit13 onward) stay. --check writes nothing and exits 1 if a config key is missing,
//     listed twice, or in a different unit from its config. --force regenerates the file from the configs alone.
//   node scripts/content/migrate/run.mjs positions --ref <commit> [--tmp <dir>] [--check] [--force]
//     content/fr/legacy/positions-<sha7>.json: the live positions on <commit>, read from a temporary
//     `git worktree add` of that commit under <dir> (default: the system temp folder), removed afterwards.
//     The table is frozen: a file that differs is kept unless --force; --check exits 1 if it would change.
import '../vite-shim.mjs'; // lets Node import src/ files written for Vite
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, CONTENT_ROOT } from '../load.mjs';
import { outlineFromUnitConfigs, checkOutline, mergeOutline } from './outline.mjs';
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
  const { outline: generated, report } = outlineFromUnitConfigs(unitConfigs, { opensWords: settings.reference.modules });
  const rootArg = option(args, '--root');
  const root = rootArg === undefined ? CONTENT_ROOT : resolve(rootArg);
  const file = join(root, 'course.json');
  const summary = (o) => {
    const entries = o.units.reduce((n, u) => n + (u.entries || []).length, 0);
    return `${o.units.length} units, ${entries} unit entries, ${(o.shelf?.pages || []).length} shelf pages`;
  };

  if (!existsSync(file) || (flags.force && !flags.check)) {
    for (const line of report) console.log(`  ${line}`);
    console.log(`outline from today's configs: ${summary(generated)}`);
    if (flags.check) {
      console.log(`missing ${rel(file)}`);
      return 1;
    }
    return writeFile(file, json(generated), { force: true });
  }

  let existing;
  try {
    existing = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`${rel(file)}: not valid JSON (${e.message}); fix it, or rerun with --force to regenerate it`);
    return 1;
  }
  const printProblems = (ps) => {
    for (const p of ps) console.error(`${rel(file)} ${p.code} ${p.detail}`);
    return ps.length ? 1 : 0;
  };
  if (flags.check) {
    const status = printProblems(checkOutline(existing, generated));
    if (status === 0) console.log(`ok ${rel(file)}: every key in today's configs is listed once, in its unit (${summary(existing)})`);
    return status;
  }
  const { outline: merged, report: added } = mergeOutline(existing, generated);
  for (const line of added) console.log(`  ${line}`);
  const status = writeFile(file, json(merged), { force: true });
  // What a merge cannot settle without dropping a hand edit: keys moved to another unit or listed twice.
  return printProblems(checkOutline(merged, generated)) || status;
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
