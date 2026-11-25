// Course plan stubs (plan Task 17): every module the course plan lists for versions 1 and 2 (plan.json `versions[0..1]`,
// Units 12 to 29) becomes a planned module file (status planned, spec 5.2) in content/fr/modules/, listed in the outline:
// Unit 12 gains its reading, practice set and exam, and unit13 to unit29 hold the rest. A planned module holds only
// what the plan settles: kind, a title with no position word, and plan { words, constructions, source[, draft][, note] },
// its ids graph ids. It teaches nothing (the checker skips it) and never publishes (the bundle stops before its unit).
//
//   node scripts/content/plan-stubs.mjs [--plan <plan.json>] [--root <content dir>] [--write [--force] | --check]
//
// Keys come only from content/fr/plan-keys.json (plan version and module n -> module_key), never from a title: a key is
// permanent. A plan module whose mapped key is already a written module is skipped, so writing a stub never brings it
// back. With no flag the script prints what it would write. --write writes missing stubs and the outline, and refuses
// when a stub on disk differs from what it would write (a writer's hand edit), unless --force. --check writes nothing
// and exits 1 if a stub or the outline differs. The plan is $LA_COURSE_PLAN, else the vault's
// research/course-plan/plan.json.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { loadCourse, CONTENT_ROOT, GRAPH_LANG_DIR, REPO_ROOT } from './load.mjs';
import { ContentError } from './problems.mjs';
import { MODULE_SCHEMA, hasPositionWord } from './schema/module.mjs';

export const PLAN_SOURCE = 'plan.json';
// The plan's folder, relative to the vault's curriculum folder (projects/product/curriculum/); a draft the plan names
// is recorded under it.
export const PLAN_DIR = 'research/course-plan/';
export const DEFAULT_PLAN_FILE =
  process.env.LA_COURSE_PLAN ?? join(homedir(), 'dev/agent_workspaces/language_academy/projects/product/curriculum', PLAN_DIR, PLAN_SOURCE);
export const KEYS_FILE = 'plan-keys.json'; // in the content folder
// A new module key: a short slug, never dated (MODULE_KEY_PATTERN without its date), never ending in a counter.
export const SHORT_KEY = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
export const COUNTER_END = /-\d+$/;
// The plan's kinds, as the schema names them.
export const KIND_OF = { lesson: 'lesson', guide: 'guide', help: 'guide', reading: 'reading', practice: 'practice', exam: 'unit_exam' };
// Versions 1 (French A2 with B1 grammar) and 2 (B1 extension); version 3 is a proposal with no modules.
const VERSIONS = 2;

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const unique = (list) => [...new Set(list)];

/** A stub this script wrote: planned, from plan.json. */
export const isPlanStub = (m) => isObj(m) && m.status === 'planned' && m.plan?.source === PLAN_SOURCE;

/** content/<lang>/plan-keys.json, parsed. */
export const readPlanKeys = (root = CONTENT_ROOT) => JSON.parse(readFileSync(join(root, KEYS_FILE), 'utf8'));

/** Every module_key the key map holds, in plan order. */
export const planKeyList = (keys) => Object.values(keys.versions).flatMap((v) => Object.values(v));

/**
 * The graph ids a stub may name, read from the graph's language folder: constructions (constructions.json and the
 * regular patterns in paradigms.json), words (headwords.json and forms.json), headword ids by lemma, and the fixed
 * phrases (fr:cx:chunk.*) with the example sentences the graph lists for each.
 */
export function planGraph(dir = GRAPH_LANG_DIR) {
  const read = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const constructions = read('constructions.json');
  const headwords = read('headwords.json');
  const lemmas = new Map();
  for (const h of headwords) lemmas.set(h.lemma, [...(lemmas.get(h.lemma) ?? []), h.id]);
  return {
    constructions: new Set([...constructions.map((c) => c.id), ...read('paradigms.json').map((p) => p.id)]),
    words: new Set([...headwords.map((h) => h.id), ...read('forms.json').map((f) => f.id)]),
    lemmas,
    chunks: constructions.filter((c) => c.id.startsWith('fr:cx:chunk.')).map((c) => ({ id: c.id, examples: c.examples?.match ?? [] })),
  };
}

/* ---------- titles and notes ---------- */

const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// A plan title with its position words taken out (spec 5.2, position_word), or null for a unit exam, whose title the
// loader derives from its unit (spec 5.8). Only the forms below change; any other title is kept as the plan wrote it,
// and one that still names a position stops the run.
function stubTitle(kind, planTitle, unitName) {
  if (kind === 'unit_exam') return null;
  let m;
  if (kind === 'reading' && (m = /^Reading\s+\d+\s*(?:-\s*(.+))?$/.exec(planTitle))) return m[1] ? `Reading · {${m[1].trim()}}` : `Reading · ${unitName}`;
  if (kind === 'practice' && (m = /^Unit\s+\d+\s+Practice\s*(?:-\s*(.+))?$/.exec(planTitle))) return `Practice · ${m[1] ? m[1].trim() : unitName}`;
  // "Review 1: …" counts the reviews; the unnumbered "Review: …" takes the same form so the three read alike.
  if (kind === 'practice' && (m = /^Review(?:\s+\d+)?:\s*(.+)$/.exec(planTitle))) return `Review · ${capital(m[1].trim())}`;
  return planTitle;
}

// What the plan says about a module that no other stub field holds: a unit exam's subtitle, which its derived title
// drops, and a reading's theme brief. null when the plan says nothing more.
function stubNote(kind, pm) {
  if (kind === 'unit_exam') {
    const m = /^Unit\s+\d+\s+Exam\s*(?:-\s*(.+))?$/.exec(pm.title);
    return m ? m[1]?.trim() ?? null : pm.title;
  }
  if (kind === 'reading') return pm.reading?.theme ?? null;
  return null;
}

/* ---------- plan to stubs ---------- */

/**
 * @param plan    plan.json, parsed
 * @param course  loadCourse() output (units[].{ unit_key, name, modules }, retired)
 * @param opts    { graph: planGraph() output, keys: plan-keys.json, parsed }
 * @returns { units, modules, report }
 *   units    [{ unit_key, name, existing, entries }] in plan order, unit_key unit<plan unit>; entries are the mapped keys
 *            of the unit's plan modules in plan order, written ones included
 *   modules  the stub objects for every plan module not yet written, in plan order
 *   report   { modules, titles_changed, unresolved, phrases, not_retaught, unit_names, written }
 */
export function planToStubs(plan, course, { graph = planGraph(), keys } = {}) {
  if (!keys) throw new Error('planToStubs needs the key map (plan-keys.json)');
  const byKey = new Map(course.units.flatMap((u) => u.modules.map((m) => [m.module_key, m])));
  const retired = new Set((course.retired ?? []).map((r) => r.module_key));
  const unitByKey = new Map(course.units.map((u) => [u.unit_key, u]));
  const seen = new Set();

  const units = [];
  const modules = [];
  const report = { modules: [], titles_changed: [], unresolved: [], phrases: [], not_retaught: [], unit_names: [], written: [] };

  for (const version of plan.versions.slice(0, VERSIONS))
    for (const pu of version.units) {
      const unitKey = `unit${pu.unit}`;
      const have = unitByKey.get(unitKey);
      // A unit the course already had before the plan (Unit 12) keeps its name; so does a plan unit a writer renamed.
      const unit = { unit_key: unitKey, name: have ? have.name : pu.title, existing: Boolean(have), entries: [] };
      // A unit that holds modules from before the plan should be the plan's unit of that name.
      if (have && have.modules.some((m) => !keysOf(keys).has(m.module_key)) && !pu.title.startsWith(have.name))
        report.unit_names.push({ unit_key: unitKey, course: have.name, plan: pu.title });
      units.push(unit);

      for (const pm of pu.modules) {
        const kind = KIND_OF[pm.kind];
        if (!kind) throw new Error(`plan unit ${pu.unit}: "${pm.title}" has kind ${pm.kind}, which no module kind matches`);
        const key = keys.versions[String(version.version)]?.[String(pm.n)];
        if (!key) throw new Error(`plan version ${version.version} module ${pm.n} ("${pm.title}") has no key in ${KEYS_FILE}; add one by hand`);
        if (!SHORT_KEY.test(key) || COUNTER_END.test(key)) throw new Error(`${KEYS_FILE}: ${key} is not a short slug without a counter`);
        if (seen.has(key)) throw new Error(`${KEYS_FILE}: ${key} is given to two plan modules`);
        if (retired.has(key)) throw new Error(`${KEYS_FILE}: ${key} is a retired key`);
        seen.add(key);
        unit.entries.push(key);
        const existing = byKey.get(key);
        if (existing && !isPlanStub(existing)) {
          report.written.push(key);
          continue;
        }

        const title = stubTitle(kind, pm.title, unit.name);
        if (title !== null && hasPositionWord(title)) throw new Error(`plan unit ${pu.unit}: "${pm.title}" still names a position as "${title}"`);
        const unresolved = (field, value) => report.unresolved.push({ module_key: key, field, value });
        const words = [];
        for (const w of pm.words ?? []) (graph.words.has(w.id) ? words.push(w.id) : unresolved('words', w.id));
        for (const lemma of pm.newHeadwords ?? []) {
          const ids = graph.lemmas.get(lemma) ?? [];
          if (ids.length === 1 && graph.words.has(ids[0])) words.push(ids[0]);
          else unresolved('newHeadwords', lemma);
        }
        const constructions = [];
        for (const id of pm.adds ?? []) (graph.constructions.has(id) ? constructions.push(id) : unresolved('adds', id));
        for (const id of pm.reading?.mustUse ?? []) (graph.constructions.has(id) ? constructions.push(id) : unresolved('reading.mustUse', id));
        // A phrase the graph lists as an example of a fixed phrase is that construction (au secours, pharmacie de
        // garde); the other phrases are sentences built from patterns taught earlier.
        for (const phrase of pm.phrases ?? []) {
          const same = (e) => e.replace(/’/g, "'").trim() === phrase.replace(/’/g, "'").trim();
          const chunk = graph.chunks.find((c) => c.examples.some(same));
          report.phrases.push({ module_key: key, phrase, construction: chunk?.id ?? null });
          if (chunk) constructions.push(chunk.id);
        }
        if (pm.alreadyKnown?.length) report.not_retaught.push({ module_key: key, lemmas: [...pm.alreadyKnown] });

        const stub = { schema: MODULE_SCHEMA, module_key: key, kind, status: 'planned' };
        if (title !== null) stub.title = title;
        stub.plan = { words: unique(words), constructions: unique(constructions), source: PLAN_SOURCE };
        if (pm.reading?.draft) stub.plan.draft = `${PLAN_DIR}${pm.reading.draft}`;
        const note = stubNote(kind, pm);
        if (note) stub.plan.note = note;

        modules.push(stub);
        report.modules.push({ module_key: key, unit_key: unitKey, kind, plan_title: pm.title, title });
        if (title !== pm.title) report.titles_changed.push({ module_key: key, from: pm.title, to: title });
      }
    }
  const missing = planKeyList(keys).filter((k) => !seen.has(k));
  if (missing.length) throw new Error(`${KEYS_FILE} holds keys for no plan module: ${missing.join(', ')}`);
  return { units, modules, report };
}

const keysOfCache = new WeakMap();
function keysOf(keys) {
  if (!keysOfCache.has(keys)) keysOfCache.set(keys, new Set(planKeyList(keys)));
  return keysOfCache.get(keys);
}

/**
 * The outline with every plan module listed. Stale stubs (staleKeys: stubs whose keys the map no longer holds) are
 * taken out. A key the outline already lists stays where it is, so a writer's reordering or move is kept; a missing one
 * goes into its plan unit after the nearest earlier plan key there (else before the nearest later one, else last). A
 * new unit is added after the others with only its key, name and entries (outline.mjs: a unit of planned modules needs
 * no more). Units left empty are dropped.
 */
export function applyStubs(outline, units, staleKeys = new Set()) {
  const out = structuredClone(outline);
  out.units = out.units.map((u) => ({ ...u, entries: u.entries.filter((k) => !staleKeys.has(k)) }));
  const listed = new Set(out.units.flatMap((u) => u.entries));
  for (const u of units) {
    let have = out.units.find((x) => x.unit_key === u.unit_key);
    if (!have) out.units.push((have = { unit_key: u.unit_key, name: u.name, entries: [] }));
    const list = have.entries;
    u.entries.forEach((k, i) => {
      if (listed.has(k)) return;
      const before = u.entries.slice(0, i).reverse().find((x) => list.includes(x));
      const after = u.entries.slice(i + 1).find((x) => list.includes(x));
      list.splice(before !== undefined ? list.indexOf(before) + 1 : after !== undefined ? list.indexOf(after) : list.length, 0, k);
      listed.add(k);
    });
  }
  out.units = out.units.filter((u) => u.entries.length > 0);
  return out;
}

/* ---------- CLI ---------- */

const json = (v) => JSON.stringify(v, null, 2) + '\n';
const USAGE = 'usage: node scripts/content/plan-stubs.mjs [--plan <plan.json>] [--root <content dir>] [--write [--force] | --check]';

export function main(args) {
  const opts = { '--plan': DEFAULT_PLAN_FILE, '--root': CONTENT_ROOT };
  const flags = new Set();
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--plan' || args[i] === '--root') {
      if (!args[i + 1] || args[i + 1].startsWith('--')) return (console.error(USAGE), 2);
      opts[args[i]] = resolve(args[++i]);
    } else if (['--write', '--check', '--force'].includes(args[i])) flags.add(args[i]);
    else return (console.error(USAGE), 2);
  }
  const write = flags.has('--write');
  const check = flags.has('--check');
  if ((write && check) || (flags.has('--force') && !write)) return (console.error(USAGE), 2);
  const planFile = opts['--plan'];
  const root = opts['--root'];
  if (!existsSync(planFile)) {
    console.error(`${planFile}: no course plan here; set LA_COURSE_PLAN or pass --plan`);
    return 1;
  }
  const plan = JSON.parse(readFileSync(planFile, 'utf8'));
  const keys = readPlanKeys(root);
  let course;
  try {
    course = loadCourse({ root });
  } catch (e) {
    if (!(e instanceof ContentError)) throw e;
    for (const p of e.problems) console.error(`${p.file} ${p.path} ${p.code} ${p.message}`);
    return 1;
  }
  const { units, modules, report } = planToStubs(plan, course, { graph: planGraph(), keys });

  const mapped = keysOf(keys);
  const stale = [...course.modules.values()].filter((m) => isPlanStub(m) && !mapped.has(m.module_key)).map((m) => m.module_key);
  const outlineFile = join(root, 'course.json');
  const outline = JSON.parse(readFileSync(outlineFile, 'utf8'));
  const stubFile = (k) => join(root, 'modules', `${k}.json`);
  const files = new Map(modules.map((m) => [stubFile(m.module_key), json(m)]));
  files.set(outlineFile, json(applyStubs(outline, units, new Set(stale))));
  const changed = [...files].filter(([f, text]) => !existsSync(f) || readFileSync(f, 'utf8') !== text).map(([f]) => f);
  // A stub already on disk that differs from what the plan gives was edited by hand (or the plan changed).
  const edited = changed.filter((f) => f !== outlineFile && existsSync(f));

  for (const u of units) console.log(`${u.unit_key} ${u.existing ? '(in the course) ' : ''}${u.entries.length} ${u.name}`);
  console.log(`stubs ${modules.length}, written already ${report.written.length}`);
  for (const c of report.titles_changed) console.log(`title ${c.module_key}: ${JSON.stringify(c.from)} -> ${c.to === null ? '(from the unit)' : JSON.stringify(c.to)}`);
  for (const p of report.phrases.filter((x) => x.construction)) console.log(`phrase ${p.module_key}: ${JSON.stringify(p.phrase)} -> ${p.construction}`);
  for (const u of report.unit_names) console.log(`unit name ${u.unit_key}: course "${u.course}", plan "${u.plan}"`);
  for (const u of report.unresolved) console.log(`unresolved ${u.module_key} ${u.field} ${u.value}`);

  const rel = (f) => relative(REPO_ROOT, f) || f;
  if (check) {
    for (const f of changed) console.error(`${rel(f)} differs from what --write writes`);
    for (const k of stale) console.error(`${rel(stubFile(k))} is a stub whose key ${KEYS_FILE} no longer holds`);
    return changed.length || stale.length ? 1 : 0;
  }
  if (!write) {
    console.log(`would write ${changed.length} files${stale.length ? `, remove ${stale.length} stale stubs` : ''}; rerun with --write`);
    return 0;
  }
  if (edited.length && !flags.has('--force')) {
    for (const f of edited) console.error(`${rel(f)} differs from what the plan gives (edited by hand?); it is kept`);
    console.error('nothing written; rerun with --force to overwrite these stubs');
    return 1;
  }
  for (const f of changed) writeFileSync(f, files.get(f));
  for (const k of stale) rmSync(stubFile(k));
  console.log(`wrote ${changed.length} files${stale.length ? `, removed ${stale.length} stale stubs: ${stale.join(', ')}` : ''}`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exitCode = main(process.argv.slice(2));
