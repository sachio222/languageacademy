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
//   node scripts/content/migrate/run.mjs modules [--root <content dir>] [--check] [--live-ref <commit>] [--tmp <dir>] [--force]
//     content/fr/modules/<key>.json for every lesson, practice set and unit exam in the outline, plus
//     legacy/live-ids.json, legacy/migration-sources.json (each part's source and last output), legacy/hand-fixes.json
//     and migration-report.md. Three-way merge (spec 8.2): a part the file holds as the converter last wrote it takes
//     the new output; a part edited by hand stays. Live ids come from lessonData.js on --live-ref (default: the main commit last merged
//     here, `git merge-base HEAD origin/main`), read from a temporary worktree. --check exits 1 if a file would change.
//     --force converts from the source alone, then applies legacy/hand-fixes.json again.
import '../vite-shim.mjs'; // lets Node import src/ files written for Vite
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, CONTENT_ROOT } from '../load.mjs';
import { ContentError, problem } from '../problems.mjs';
import { outlineFromUnitConfigs, checkOutline, mergeOutline } from './outline.mjs';
import { frozenPositions, checkAgainstLessons } from './positions.mjs';
import { convertModule, kindOf } from './module.mjs';
import { liveIdMatch } from './live-ids.mjs';
import { renderReport } from './report.mjs';
import { proposeWordId } from '../word-ids.mjs';
import { checkItemPassable, defaultCheckAnswer } from '../passable.mjs';
import { loadGraph } from '../../graph/load.mjs';
import { buildFormIndex } from '../../graph/fr/forms.mjs';
import { frenchWordTest } from '../../graph/french-text.mjs';

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

const git = (...a) => execFileSync('git', a, { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

// Runs fn(dir) on a temporary `git worktree add` of ref under --tmp (default: the system temp folder), then removes
// the worktree. Returns fn's status, or 1 when the worktree cannot be removed.
async function inWorktree(ref, args, label, fn) {
  const sha = git('rev-parse', '--verify', '--short=7', `${ref}^{commit}`);
  const parent = resolve(option(args, '--tmp') ?? tmpdir());
  if (!existsSync(parent)) throw new UsageError(`--tmp ${parent}: no such folder`);
  const dir = join(parent, `la-${label}-${sha}`);
  if (existsSync(dir)) throw new UsageError(`${dir} already exists; remove it first (git worktree remove)`);
  console.log(`worktree: ${dir} (${ref} = ${sha})`);
  git('worktree', 'add', '--detach', dir, sha);
  let status;
  try {
    status = await fn(dir, sha);
  } finally {
    try {
      git('worktree', 'remove', '--force', dir);
      console.log(`removed worktree: ${dir}`);
    } catch (e) {
      console.error(`could not remove worktree ${dir}: ${String(e.stderr || e.message).trim()}`);
      status = 1;
    }
  }
  return status;
}

// Today's builder logs [DEBUG] lines through console.log while it builds; they are not this command's output.
async function quietly(fn) {
  const log = console.log;
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.log = log;
  }
}

// A file that exists but is not JSON stops the run with a ContentError naming it.
function readJson(file) {
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    throw new ContentError([problem(rel(file), '', 'json_invalid', `not valid JSON: ${e.message}`)]);
  }
}

// The main commit last merged into this branch. A checkout without origin/main (a shallow CI clone) falls back to
// a local main, and stops with a message when it has neither.
function defaultLiveRef() {
  for (const ref of ['origin/main', 'main']) {
    try {
      git('rev-parse', '--verify', '--quiet', `${ref}^{commit}`);
      return git('merge-base', 'HEAD', ref);
    } catch {
      // try the next ref
    }
  }
  throw new UsageError('no origin/main or main to read live ids from; fetch main (CI: actions/checkout with fetch-depth: 0) or pass --live-ref <commit>');
}

// Spelling -> live dictionary id (src/data/dictionary/words/cambridge), for word ids (spec 8.1).
async function dictionaryMap() {
  const d = await importFrom(REPO_ROOT, 'src/data/dictionary/words/cambridge/index.js');
  const map = new Map();
  for (const words of Object.values(d))
    for (const [id, w] of words) if (w?.lang === 'fr' && typeof w.word === 'string' && !map.has(w.word)) map.set(w.word, id);
  return map;
}

// The checker's word test, so French spans are marked where today's checker reads French.
function wordTest() {
  const graph = loadGraph(join(REPO_ROOT, 'curriculum-graph'), 'fr');
  return frenchWordTest(graph, buildFormIndex(graph));
}

async function modules(args, flags) {
  const rootArg = option(args, '--root');
  const ROOT = rootArg === undefined ? CONTENT_ROOT : resolve(rootArg);
  const outline = readJson(join(ROOT, 'course.json'));
  if (!outline) throw new UsageError('content/fr/course.json is missing; run `outline` first');
  const { unitConfigs } = await quietly(() => importFrom(REPO_ROOT, 'src/lessons/unitConfigLoader.js'));
  const configs = new Map(unitConfigs.flatMap((u) => u.modules).map((m) => [m.moduleKey, m]));
  const dictionary = await dictionaryMap();
  const isWord = wordTest();
  const recordFile = join(ROOT, 'legacy', 'migration-sources.json');
  const records = readJson(recordFile) ?? {};
  // Every part the module files hold differently from the converter's output, as data, so --force can apply
  // them again and nothing a person fixed lives only in the module files.
  const fixesFile = join(ROOT, 'legacy', 'hand-fixes.json');
  const allFixes = readJson(fixesFile) ?? {};
  const newFixes = {};
  const seenBySpelling = new Map();
  const lines = [];
  const converted = new Map();
  const newRecords = {};
  let itemCount = 0;
  let heldCount = 0;
  const byUnit = [];

  for (const [ui, unit] of outline.units.entries()) {
    const counts = { unit: `${unit.unit_key} ${unit.name}`, translate: 0, respond: 0 };
    byUnit.push(counts);
    for (const key of unit.entries) {
      const old = configs.get(key);
      if (!old) continue; // written in content/ only, with no source in src/lessons/modules/
      const kind = kindOf(old);
      if (!kind) {
        // A reading teaches the words in its own table, so its spellings join the course-order walk and a later
        // lesson's proposals know them. Task 7 writes the reading files with the same walk.
        if (old.isReadingComprehension)
          for (const v of old.vocabularyReference || [])
            proposeWordId({ french: v.french, english: v.english, note: v.note, module_key: key }, seenBySpelling, dictionary);
        continue;
      }
      // --force converts from the source alone, as if nothing were written, then applies hand-fixes.json again.
      const existing = flags.force ? null : readJson(join(ROOT, 'modules', `${key}.json`));
      const record = flags.force ? null : records[key] ?? null;
      const r = convertModule(old, { unitKey: unit.unit_key, unitIndex: ui + 1, existing, record, dictionary, seenBySpelling, isWord, handFixes: allFixes[key] ?? {} });
      if (Object.keys(r.handFixes).length) newFixes[key] = r.handFixes;
      lines.push(...r.report);
      r.mod.items.forEach((item, i) => {
        for (const p of checkItemPassable(item, defaultCheckAnswer, { file: key, path: `items[${i}]` }))
          lines.push({ module_key: key, path: p.path, kind: 'answer_fails', detail: `${item.id}: ${p.message}` });
      });
      converted.set(key, r.mod);
      const framed = new Set(r.report.filter((l) => l.kind === 'framed_respond').map((l) => l.path));
      r.mod.items.forEach((item, i) => {
        if (item.type === 'translate') counts.translate += 1;
        else if (item.type === 'respond' && framed.has(`items[${i}]`)) counts.respond += 1;
      });
      newRecords[key] = r.record;
      itemCount += r.mod.items.length;
      heldCount += r.held.length;
    }
  }

  const liveRef = option(args, '--live-ref') ?? defaultLiveRef();
  let live = null;
  const wt = await inWorktree(liveRef, args, 'live-ids', async (dir) => {
    const { lessons } = await quietly(() => importFrom(dir, 'src/lessons/lessonData.js'));
    live = lessons.map((l) => ({
      moduleKey: l.moduleKey,
      concepts: l.concepts,
      exercises: l.exercises.map((e) => ({ id: e.id, prompt: e.prompt, expectedAnswer: e.expectedAnswer })),
    }));
    return 0;
  });
  if (wt !== 0) return wt;
  const { map, unmatched } = liveIdMatch(live, converted);
  for (const u of unmatched)
    lines.push({ module_key: u.module_key, path: u.what === 'concept' ? `concepts[${u.live_id}]` : u.live_id, kind: 'live_unmatched', detail: `${u.what} ${u.detail}` });

  const settings = readJson(join(REPO_ROOT, 'curriculum-graph/core/settings.json'));
  for (const line of outlineFromUnitConfigs(unitConfigs, { opensWords: settings.reference.modules }).report)
    lines.push({ module_key: null, path: 'course.json', kind: 'outline', detail: line });

  const sorted = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
  const always = { ...flags, force: true }; // these files are rebuilt from what is written, so a rerun keeps edits
  let status = 0;
  for (const [key, mod] of converted) status |= writeFile(join(ROOT, 'modules', `${key}.json`), json(mod), always);
  status |= writeFile(join(ROOT, 'legacy', 'live-ids.json'), json(sorted(map)), always);
  status |= writeFile(recordFile, json(sorted(newRecords)), always);
  status |= writeFile(fixesFile, json(sorted(newFixes)), always);
  status |= writeFile(join(ROOT, 'migration-report.md'), renderReport(lines, { modules: converted.size, items: itemCount, held: heldCount, byUnit }), always);
  const byKind = new Map();
  for (const l of lines) byKind.set(l.kind, (byKind.get(l.kind) || 0) + 1);
  const fixCount = Object.values(newFixes).reduce((n, f) => n + Object.keys(f).length, 0);
  console.log(`modules: ${converted.size} files, ${itemCount} items, ${heldCount} held out, ${fixCount} hand-fixed parts`);
  console.log(`report: ${[...byKind].map(([k, n]) => `${k} ${n}`).join(', ')}`);
  return status;
}

const COMMANDS = { outline, positions, modules };
const USAGE = 'usage: node scripts/content/migrate/run.mjs outline|positions|modules [--ref <commit>] [--live-ref <commit>] [--tmp <dir>] [--check] [--force]';

const [command, ...args] = process.argv.slice(2);
try {
  if (!COMMANDS[command]) throw new UsageError(USAGE);
  const flags = { check: args.includes('--check'), force: args.includes('--force') };
  process.exitCode = await COMMANDS[command](args, flags);
} catch (e) {
  if (e instanceof ContentError) {
    for (const p of e.problems) console.error(`${p.file}:${p.path} ${p.code} ${p.message}`);
    process.exitCode = 1;
  } else if (e instanceof UsageError) {
    console.error(e.message);
    process.exitCode = 2;
  } else throw e;
}
