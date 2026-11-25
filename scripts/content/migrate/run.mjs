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
//   node scripts/content/migrate/run.mjs [modules|course-map|lessons|guides|readings|reference ...] [--root <content dir>] [--graph <dir>] [--check] [--live-ref <commit>] [--tmp <dir>] [--force]
//     content/fr/modules/<key>.json for every module in the outline: lessons, practice sets and unit exams (module.mjs),
//     guides (guide.mjs), readings (reading.mjs) and Reference pages (reference.mjs), in one course-order walk so word
//     ids are minted where a word is first taught, units first and the shelf after them. No command, or `modules`,
//     means every kind; kind words limit which module files are written or checked, while legacy/live-ids.json,
//     legacy/migration-sources.json (each part's source and last output), legacy/hand-fixes.json and
//     migration-report.md always cover the whole course. Three-way merge (spec 8.2): a part the file holds as the
//     converter last wrote it takes the new output; a part edited by hand stays. Live ids come from lessonData.js on
//     --live-ref (default: the main commit last merged here, `git merge-base HEAD origin/main`), read from a temporary
//     worktree. --check exits 1 if a file would change. --force converts from the source alone, then applies
//     legacy/hand-fixes.json again. Guides and readings read prototype L's data from legacy/l-sources.json.
//     The course map (<graph>/languages/fr/course-map.json, --graph default curriculum-graph/) is split on the same walk
//     (course-map.mjs): each module's teaches and tests are parts of its file, merged like any other, and
//     <graph>/languages/fr/course-map.corrections.json gets the checker's corrections, keyed by module key and item id.
//     `course-map` is the same walk as `modules` (every kind holds a declaration). A course map that holds no
//     teaching field is split already: the walk keeps each file's teaches and tests and writes no corrections file.
//   node scripts/content/migrate/run.mjs golden [--check]
//     scripts/content/test/fixtures/golden-lessons.json: today's lessons[] as this checkout's lessonData.js builds
//     them, for the golden test (scripts/content/test/golden.test.mjs). Rewritten whenever it differs; --check exits
//     1 if it would change.
//   node scripts/content/migrate/run.mjs l-sources [--l <prototype L folder>] [--check]
//     content/fr/legacy/l-sources.json: L's GUIDES (j-guides.js) and LA_STORIES (stories-data.js), evaluated in a vm
//     with a stub window. Default folder: $LA_L_DIR, else the vault's prototypes/l/. --check exits 1 if it would change.
import '../vite-shim.mjs'; // lets Node import src/ files written for Vite
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT, CONTENT_ROOT } from '../load.mjs';
import { writeFileAtomic } from '../atomic-write.mjs';
import { ContentError, problem } from '../problems.mjs';
import { outlineFromUnitConfigs, checkOutline, mergeOutline } from './outline.mjs';
import { frozenPositions, checkAgainstLessons } from './positions.mjs';
import { convertModule, kindOf } from './module.mjs';
import { convertGuide } from './guide.mjs';
import { readingFrom } from './reading.mjs';
import { referenceFrom } from './reference.mjs';
import { readLFolder, L_DIR, L_SOURCES_FILE } from './l-sources.mjs';
import { todaysModules, readLSources, liaisonJsx, frenchPhonics, dictionaryForms, addGlosses, imageCredit } from './sources.mjs';
import { liveIdMatch } from './live-ids.mjs';
import { declarationsOf, correctionsOf, isSplit, resplitProblem } from './course-map.mjs';
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
  writeFileAtomic(file, text);
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

// Object keys sorted at every depth, as curriculum-graph's other files are written (scripts/graph/write-json.mjs).
const sortDeep = (v) =>
  Array.isArray(v) ? v.map(sortDeep) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortDeep(v[k])])) : v;

// Dictionary id -> the first English translation (src/data/dictionary/words/cambridge), for preTeach rows.
async function dictionaryGlosses() {
  const d = await importFrom(REPO_ROOT, 'src/data/dictionary/words/cambridge/index.js');
  const map = new Map();
  for (const words of Object.values(d))
    for (const [id, w] of words) {
      const en = (w?.translations || []).find((t) => t?.lang === 'en' && typeof t.text === 'string' && t.text.trim());
      if (en && !map.has(id)) map.set(id, en.text.trim());
    }
  return map;
}

// A preTeach id (a graph headword or form) -> { fr, gloss }: the headword's lemma or the form's spelling, and the
// headword's first sense, else its dictionary entry's English (a form gets its headword's English).
function wordLookup(graph, glosses) {
  return (id) => {
    const node = graph.nodes.get(id);
    if (!node) return null;
    const form = typeof node.surface === 'string' ? node : null;
    const head = form ? graph.nodes.get(form.of) : node;
    if (!form && typeof node.lemma !== 'string') return null;
    const gloss = head?.senses?.[0]?.gloss ?? (head?.dictionaryId ? glosses.get(head.dictionaryId) : null) ?? null;
    return { fr: form ? form.surface : node.lemma, gloss };
  };
}

// Module kinds by the source's own flags; a Reference page is whatever the outline puts on the shelf.
function sourceKind(old, onShelf) {
  if (onShelf) return 'reference';
  if (old.isHelpModule || old.guide) return 'guide';
  if (old.isReadingComprehension) return 'reading';
  return kindOf(old);
}
// Kind words on the command line choose which module files are written (or checked); the walk, the word ids and the
// shared files (records, hand fixes, live ids, report) always cover the whole course.
const KIND_WORDS = { modules: null, 'course-map': null, lessons: ['lesson', 'practice', 'unit_exam'], guides: ['guide'], readings: ['reading'], reference: ['reference'] };

async function modules(args, flags, kindWords = ['modules']) {
  const rootArg = option(args, '--root');
  const ROOT = rootArg === undefined ? CONTENT_ROOT : resolve(rootArg);
  const outline = readJson(join(ROOT, 'course.json'));
  if (!outline) throw new UsageError('content/fr/course.json is missing; run `outline` first');
  const wanted = kindWords.some((w) => KIND_WORDS[w] === null) ? null : new Set(kindWords.flatMap((w) => KIND_WORDS[w]));
  const { unitConfigs, configs } = await todaysModules();
  const dictionary = await dictionaryMap();
  const graphArg = option(args, '--graph');
  const graphDir = graphArg === undefined ? join(REPO_ROOT, 'curriculum-graph') : resolve(graphArg);
  const graph = loadGraph(graphDir, 'fr');
  const isWord = frenchWordTest(graph, buildFormIndex(graph));
  // The course map split (course-map.mjs): declarations go to the converters, corrections are written after the walk.
  const courseMap = graph.courseMap ?? {};
  const splitting = !isSplit(courseMap);
  const kindsBefore = new Map();
  for (const unit of outline.units) for (const key of unit.entries) if (configs.has(key)) kindsBefore.set(key, sourceKind(configs.get(key), false));
  for (const key of outline.shelf?.pages || []) if (configs.has(key)) kindsBefore.set(key, 'reference');
  // A map with no teaching of its own must not be split over files that already declare it (course-map.mjs).
  if (splitting) {
    const why = resplitProblem(courseMap, [...kindsBefore.keys()].map((key) => readJson(join(ROOT, 'modules', `${key}.json`))));
    if (why) throw new ContentError([problem(rel(join(graphDir, 'languages/fr/course-map.json')), '', 'course_map_resplit', why)]);
  }
  const declared = splitting ? declarationsOf(courseMap, kindsBefore) : null;
  const wordOf = wordLookup(graph, await dictionaryGlosses());
  const lSources = readLSources(ROOT);
  const phonics = await frenchPhonics();
  const forms = await dictionaryForms();
  const jsx = liaisonJsx();
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
  const kinds = new Map();
  const newRecords = {};
  let itemCount = 0;
  let heldCount = 0;
  const byUnit = [];
  const minted = new Set();
  // The English of every word taught so far, in course order, for the Liaison guide's phrases (guide.mjs meaningOf).
  const glosses = new Map();
  const needL = () => {
    if (!lSources) throw new UsageError(`${rel(join(ROOT, L_SOURCES_FILE))} is missing; run \`pnpm content:migrate l-sources\` first`);
    return lSources;
  };

  const convert = (key, old, kind, unitInfo) => {
    // --force converts from the source alone, as if nothing were written, then applies hand-fixes.json again.
    // `written`: the file as it is on disk, read even under --force, for what only the file holds once the course
    // map is split (teaches and tests; merge.mjs mergeDeclared).
    const written = readJson(join(ROOT, 'modules', `${key}.json`));
    const existing = flags.force ? null : written;
    const record = flags.force ? null : records[key] ?? null;
    const declaration = declared ? declared.declarations[key] ?? {} : undefined;
    // idRecord: the record, read for ids only, so --force pairs each source part with its written id (spec 8.1).
    const common = { existing, record, idRecord: records[key] ?? null, handFixes: allFixes[key] ?? {}, isWord, unitIndex: unitInfo?.index ?? null, declaration, wordOf, written };
    if (kind === 'guide') return convertGuide(old, { ...common, lGuides: needL().guides, liaisonJsx: jsx, meanings: new Map(glosses) });
    if (kind === 'reading') {
      const story = needL().stories.find((s) => s.unit === unitInfo.index) ?? null;
      return readingFrom(old, story, { ...common, dictionary, seenBySpelling, dictionaryForms: forms, names: graph.names, minted, imageCredit });
    }
    if (kind === 'reference') return referenceFrom(old, { ...common, phonics, dictionary, seenBySpelling });
    return convertModule(old, { ...common, unitKey: unitInfo.key, dictionary, seenBySpelling });
  };
  const take = (key, kind, r, counts) => {
    // A module of a kind this run does not write keeps its file, its merge base and its hand fixes exactly as they
    // are, so a later full run still sees a source change to it as a source change (never as a hand edit).
    const excluded = wanted && !wanted.has(kind);
    const kept = excluded ? readJson(join(ROOT, 'modules', `${key}.json`)) : null;
    const mod = kept ?? r.mod;
    if (excluded) {
      if (records[key] !== undefined) newRecords[key] = records[key];
      if (allFixes[key] !== undefined) newFixes[key] = allFixes[key];
    } else {
      if (Object.keys(r.handFixes).length) newFixes[key] = r.handFixes;
      newRecords[key] = r.record;
    }
    addGlosses(glosses, mod);
    lines.push(...r.report);
    (mod.items || []).forEach((item, i) => {
      for (const p of checkItemPassable(item, defaultCheckAnswer, { file: key, path: `items[${i}]` }))
        lines.push({ module_key: key, path: p.path, kind: 'answer_fails', detail: `${item.id}: ${p.message}` });
    });
    converted.set(key, mod);
    kinds.set(key, kind);
    if (counts) {
      const framed = new Set(r.report.filter((l) => l.kind === 'framed_respond').map((l) => l.path));
      (mod.items || []).forEach((item, i) => {
        if (item.type === 'translate') counts.translate += 1;
        else if (item.type === 'respond' && framed.has(`items[${i}]`)) counts.respond += 1;
      });
    }
    itemCount += (mod.items || []).length;
    heldCount += (r.held || []).length;
  };

  for (const [ui, unit] of outline.units.entries()) {
    const counts = { unit: `${unit.unit_key} ${unit.name}`, translate: 0, respond: 0 };
    // Only units with a module converted from today's source get a row; a unit of planned stubs has no prompts yet.
    if (unit.entries.some((k) => configs.has(k))) byUnit.push(counts);
    for (const key of unit.entries) {
      const old = configs.get(key);
      if (!old) continue; // written in content/ only, with no source in src/lessons/modules/
      const kind = sourceKind(old, false);
      take(key, kind, convert(key, old, kind, { key: unit.unit_key, index: ui + 1 }), counts);
    }
  }
  // The shelf sits outside the numbered units, so its pages take word ids after every unit.
  for (const key of outline.shelf?.pages || []) {
    const old = configs.get(key);
    if (!old) continue;
    take(key, 'reference', convert(key, old, 'reference', null), null);
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
  // Why a live id has no converted item: a Reference page's word-list exercises (a Reference page has no items), a
  // concept card of a module that holds none (practice sets, unit exams, readings), or a real miss.
  const NO_CONCEPTS = ['practice', 'unit_exam', 'reading', 'guide'];
  const reasonOf = (u) =>
    kinds.get(u.module_key) === 'reference' && u.what === 'exercise' ? 'reference_words' : u.what === 'concept' && NO_CONCEPTS.includes(kinds.get(u.module_key)) ? 'no_concepts' : 'miss';
  for (const u of unmatched)
    lines.push({ module_key: u.module_key, path: u.what === 'concept' ? `concepts[${u.live_id}]` : u.live_id, kind: 'live_unmatched', reason: reasonOf(u), detail: `${u.what} ${u.detail}` });

  // The course map's corrections, re-keyed through the live ids just matched; report lines in course order.
  const correctionsFile = join(graphDir, 'languages', 'fr', 'course-map.corrections.json');
  let corrected = null;
  if (splitting) {
    corrected = correctionsOf(courseMap, converted, { liveIds: map, sources: configs, records: newRecords });
    const order = new Map([...converted.keys()].map((k, i) => [k, i]));
    const at = (l) => (l.module_key === null ? -1 : order.get(l.module_key) ?? Infinity);
    lines.push(...[...declared.report, ...corrected.report].map((l, i) => ({ l, i })).sort((a, b) => at(a.l) - at(b.l) || a.i - b.i).map(({ l }) => l));
  }

  const settings = readJson(join(REPO_ROOT, 'curriculum-graph/core/settings.json'));
  for (const line of outlineFromUnitConfigs(unitConfigs, { opensWords: settings.reference.modules }).report)
    lines.push({ module_key: null, path: 'course.json', kind: 'outline', detail: line });

  const sorted = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
  const always = { ...flags, force: true }; // these files are rebuilt from what is written, so a rerun keeps edits
  const byKind = (k) => [...kinds.values()].filter((x) => x === k).length;
  const kindsOf = (l) => kinds.get(l.module_key);
  const count = (kind, test = () => true) => lines.filter((l) => l.kind === kind && test(l)).length;
  const summary = {
    modules: converted.size,
    items: itemCount,
    held: heldCount,
    byUnit,
    kinds: { lesson: byKind('lesson'), practice: byKind('practice'), unit_exam: byKind('unit_exam'), guide: byKind('guide'), reading: byKind('reading'), reference: byKind('reference') },
    readingMinted: minted.size,
  };
  let status = 0;
  for (const [key, mod] of converted) if (!wanted || wanted.has(kinds.get(key))) status |= writeFile(join(ROOT, 'modules', `${key}.json`), json(mod), always);
  status |= writeFile(join(ROOT, 'legacy', 'live-ids.json'), json(sorted(map)), always);
  status |= writeFile(recordFile, json(sorted(newRecords)), always);
  status |= writeFile(fixesFile, json(sorted(newFixes)), always);
  status |= writeFile(join(ROOT, 'migration-report.md'), renderReport(lines, summary), always);
  if (corrected) status |= writeFile(correctionsFile, json(sortDeep(corrected.corrections)), always);
  const lineKinds = new Map();
  for (const l of lines) lineKinds.set(l.kind, (lineKinds.get(l.kind) || 0) + 1);
  const fixCount = Object.values(newFixes).reduce((n, f) => n + Object.keys(f).length, 0);
  const k = summary.kinds;
  console.log(`modules: ${converted.size} files (${k.lesson} lessons, ${k.practice} practice sets, ${k.unit_exam} unit exams, ${k.guide} guides, ${k.reading} readings, ${k.reference} Reference pages), ${itemCount} items, ${heldCount} held out, ${fixCount} hand-fixed parts`);
  const readingStory = (l) => kindsOf(l) === 'reading' && /^story text:/.test(l.detail);
  const fixedPositions = (l) => ['guide', 'reading', 'reference'].includes(kindsOf(l)) && /\(fixed by hand\)$/.test(l.detail);
  console.log(
    `guides, readings, Reference pages: ${count('text_changed', readingStory)} story sentences changed, ${count('story_missing')} story_missing, ` +
      `${count('reading_word_no_popup')} passage words with no pop-up, ${count('position_word', fixedPositions)} position words fixed by hand, ${minted.size} word ids first minted in reading tables`,
  );
  if (corrected) {
    const mapLines = lines.filter((l) => l.kind === 'course_map');
    const code = (c) => mapLines.filter((l) => l.detail.startsWith(`${c}:`)).length;
    const mods = [...converted.values()];
    console.log(
      `course map: ${mods.filter((m) => m.teaches).length} modules declare teaches, ${mods.filter((m) => m.tests).length} declare tests, ` +
        `${code('pre_teach_row')} preTeach rows, ${code('already_in_table')} already_in_table, ${code('screen_dropped')} screens dropped, ` +
        `${corrected.counts.rekeyed} corrections re-keyed, ${corrected.counts.kept} already keyed by id, ${corrected.counts.textDropped} about text no module holds, ${corrected.counts.dropped} with no item id or target (${rel(correctionsFile)})`,
    );
  } else console.log(`course map: split already (no teaching field in ${rel(join(graphDir, 'languages/fr/course-map.json'))}); teaches and tests kept as written`);
  console.log(`report: ${[...lineKinds].map(([kind, n]) => `${kind} ${n}`).join(', ')}`);
  return status;
}

// content/fr/legacy/l-sources.json from prototype L's folder (LA_L_DIR or --l <dir>): its guides and stories, frozen.
async function lSourcesCommand(args, flags) {
  const rootArg = option(args, '--root');
  const ROOT = rootArg === undefined ? CONTENT_ROOT : resolve(rootArg);
  const data = readLFolder(option(args, '--l') ?? L_DIR);
  console.log(`L: ${data.guides.length} guides, ${data.stories.length} stories`);
  return writeFile(join(ROOT, L_SOURCES_FILE), json(data), { check: flags.check, force: true });
}

// The golden snapshot: lessons[] from this checkout's lessonData.js, as JSON (undefined fields drop out, as they do
// when the app stores or sends a lesson).
const GOLDEN_FILE = join(REPO_ROOT, 'scripts/content/test/fixtures/golden-lessons.json');
async function golden(args, flags) {
  const { lessons } = await quietly(() => importFrom(REPO_ROOT, 'src/lessons/lessonData.js'));
  console.log(`golden: ${lessons.length} lessons from src/lessons/lessonData.js`);
  return writeFile(GOLDEN_FILE, json(lessons), { check: flags.check, force: true });
}

const COMMANDS = { outline, positions, 'l-sources': lSourcesCommand, golden };
const USAGE =
  'usage: node scripts/content/migrate/run.mjs [outline|positions|l-sources|golden|modules|lessons|guides|readings|reference ...] [--ref <commit>] [--live-ref <commit>] [--l <dir>] [--tmp <dir>] [--check] [--force]';

const argv = process.argv.slice(2);
// No command means `modules`: every kind. Kind words (modules, lessons, guides, readings, reference) may be combined.
const words = [];
while (argv.length && !argv[0].startsWith('--')) words.push(argv.shift());
const args = argv;
try {
  const flags = { check: args.includes('--check'), force: args.includes('--force') };
  if (words.length === 1 && COMMANDS[words[0]]) process.exitCode = await COMMANDS[words[0]](args, flags);
  else if (words.every((w) => w in KIND_WORDS)) process.exitCode = await modules(args, flags, words.length ? words : ['modules']);
  else throw new UsageError(USAGE);
} catch (e) {
  if (e instanceof ContentError) {
    for (const p of e.problems) console.error(`${p.file}:${p.path} ${p.code} ${p.message}`);
    process.exitCode = 1;
  } else if (e instanceof UsageError) {
    console.error(e.message);
    process.exitCode = 2;
  } else throw e;
}
