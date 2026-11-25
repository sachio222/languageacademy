// Course plan stubs (plan Task 17): every module the course plan lists for versions 1 and 2 (plan.json `versions[0..1]`,
// Units 12 to 29) becomes a planned module file (status planned, spec 5.2) in content/fr/modules/, listed in the outline:
// Unit 12 gains its reading, practice set and exam, and units unit13 onward hold the rest. A planned module holds only
// what the plan settles: kind, a title with no position word, and plan { words, constructions, source[, draft] }, all
// graph ids. It teaches nothing (the checker skips it) and never publishes (the bundle stops before its unit).
//
//   node scripts/content/plan-stubs.mjs [--plan <plan.json>] [--write | --check]
//
// With no flag it prints what it would write. --write writes the stub files and course.json; --check writes nothing
// and exits 1 if a stub file or the outline differs from what --write would write. A rerun replaces only the stubs it
// wrote (status planned, plan.source plan.json). Once a writer has turned a stub into a written module, a rerun would
// add that plan module again under a new key, so the script then refuses and the stubs are edited by hand.
// The plan is $LA_COURSE_PLAN, else the vault's research/course-plan/plan.json.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { loadCourse, CONTENT_ROOT, GRAPH_LANG_DIR } from './load.mjs';
import { ContentError } from './problems.mjs';
import { MODULE_SCHEMA, hasPositionWord } from './schema/module.mjs';

export const PLAN_SOURCE = 'plan.json';
// The plan's folder, relative to the vault's curriculum folder; a draft the plan names is recorded under it.
export const PLAN_DIR = 'research/course-plan/';
export const DEFAULT_PLAN_FILE =
  process.env.LA_COURSE_PLAN ?? join(homedir(), 'dev/agent_workspaces/language_academy/projects/product/curriculum', PLAN_DIR, PLAN_SOURCE);
// A new module key: a short slug, never dated (MODULE_KEY_PATTERN without its date).
export const SHORT_KEY = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
// The plan's kinds, as the schema names them.
export const KIND_OF = { lesson: 'lesson', guide: 'guide', help: 'guide', reading: 'reading', practice: 'practice', exam: 'unit_exam' };
// Versions 1 (French A2 with B1 grammar) and 2 (B1 extension); version 3 is a proposal with no modules.
const VERSIONS = 2;
const SLUG_MAX = 52;

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const unique = (list) => [...new Set(list)];

/** A stub this script wrote and may rewrite: planned, from plan.json. */
export const isPlanStub = (m) => isObj(m) && m.status === 'planned' && m.plan?.source === PLAN_SOURCE;

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

/* ---------- titles and keys ---------- */

const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// A plan title with its position words taken out (spec 5.2, position_word): [title, fromUnit]. title is null for a
// unit exam, whose title the loader derives from its unit (spec 5.8); fromUnit says the title is only its unit's name.
// Only the forms below change; any other title is kept as the plan wrote it, and one that still names a position
// stops the run.
function stubTitle(kind, planTitle, unitName) {
  if (kind === 'unit_exam') return [null, true];
  let m;
  if (kind === 'reading' && (m = /^Reading\s+\d+\s*(?:-\s*(.+))?$/.exec(planTitle)))
    return m[1] ? [`Reading · {${m[1].trim()}}`, false] : [`Reading · ${unitName}`, true];
  if (kind === 'practice' && (m = /^Unit\s+\d+\s+Practice\s*(?:-\s*(.+))?$/.exec(planTitle)))
    return m[1] ? [`Practice · ${m[1].trim()}`, false] : [`Practice · ${unitName}`, true];
  // "Review 1: …" counts the reviews; the unnumbered "Review: …" takes the same form so the three read alike.
  if (kind === 'practice' && (m = /^Review(?:\s+\d+)?:\s*(.+)$/.exec(planTitle))) return [`Review · ${capital(m[1].trim())}`, false];
  return [planTitle, false];
}

// Lowercase ASCII words joined by hyphens, at most SLUG_MAX characters, cut at a word.
function slug(text) {
  let s = text
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[{}]/g, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[-0-9]+|-+$/g, '');
  if (s.length > SLUG_MAX) {
    s = s.slice(0, s.lastIndexOf('-', SLUG_MAX) > 0 ? s.lastIndexOf('-', SLUG_MAX) : SLUG_MAX);
    // A cut slug never ends on a joining word ("…-breaks-at", "…-linking-and").
    while (/-(?:a|and|at|of|the|to|with|in|on|for)$/.test(s)) s = s.replace(/-[a-z]+$/, '');
  }
  return s;
}

// The key a stub would take before uniqueness: built from its title, with the kind marked the way the course's new
// keys are (`-guide`, `-practice`, `reading-`). A reading, practice set or exam whose title is only its unit's name
// takes the unit's key instead (unit13-exam), as today's unit-10-practice and unit-9-exam do: the plan's unit names
// run to 85 characters, and a slug of one would be cut mid-phrase and would change whenever the unit is renamed.
function baseKey(kind, title, unitKey, fromUnit) {
  if (fromUnit) return `${unitKey}-${kind === 'unit_exam' ? 'exam' : kind}`;
  if (kind === 'guide') return `${slug(title.replace(/^Guide:\s*/, ''))}-guide`;
  if (kind === 'reading') {
    const rest = slug(title.replace(/^Reading ·\s*/, ''));
    return /(^|-)reading(-|$)/.test(rest) ? rest : `reading-${rest}`;
  }
  if (kind === 'practice') {
    if (title.startsWith('Review · ')) return `review-${slug(title.slice('Review · '.length))}`;
    return `${slug(title.replace(/^Practice ·\s*/, ''))}-practice`;
  }
  const level = /\((A1|A2|B1|B2)\)\s*$/.exec(title);
  return slug(title) + (level ? `-${level[1].toLowerCase()}` : '');
}

/* ---------- plan to stubs ---------- */

/**
 * @param plan    plan.json, parsed
 * @param course  loadCourse() output (units[].{ unit_key, name, modules }, registry); stubs from an earlier run are
 *                set aside, so a rerun gives the same keys
 * @param opts    { graph: planGraph() output }
 * @returns { units, modules, report }
 *   units    [{ unit_key, name, existing, entries }] in plan order: an existing unit gains `entries` at its end;
 *            a new unit takes the next unused key
 *   modules  the stub objects, in plan order
 *   report   { modules, titles_changed, unresolved, phrases, not_retaught, unit_names, new_on_rerun }
 */
export function planToStubs(plan, course, { graph = planGraph() } = {}) {
  const earlier = new Set(course.units.flatMap((u) => u.modules.filter(isPlanStub).map((m) => m.module_key)));
  const taken = new Set([...course.registry].filter((k) => !earlier.has(k)));
  const written = course.units.filter((u) => u.modules.some((m) => !isPlanStub(m)));
  const byKey = new Map(written.map((u) => [u.unit_key, u]));
  let next = Math.max(0, ...written.map((u) => Number(u.unit_key.replace(/^unit/, '')))) + 1;

  const units = [];
  const modules = [];
  const report = { modules: [], titles_changed: [], unresolved: [], phrases: [], not_retaught: [], unit_names: [] };

  for (const version of plan.versions.slice(0, VERSIONS))
    for (const pu of version.units) {
      const have = byKey.get(`unit${pu.unit}`);
      const unit = have
        ? { unit_key: have.unit_key, name: have.name, existing: true, entries: [] }
        : { unit_key: `unit${next++}`, name: pu.title, existing: false, entries: [] };
      if (have && !pu.title.startsWith(have.name)) report.unit_names.push({ unit_key: have.unit_key, course: have.name, plan: pu.title });
      units.push(unit);

      for (const pm of pu.modules) {
        const kind = KIND_OF[pm.kind];
        if (!kind) throw new Error(`plan unit ${pu.unit}: "${pm.title}" has kind ${pm.kind}, which no module kind matches`);
        const [title, fromUnit] = stubTitle(kind, pm.title, unit.name);
        if (title !== null && hasPositionWord(title)) throw new Error(`plan unit ${pu.unit}: "${pm.title}" still names a position as "${title}"`);

        const base = baseKey(kind, title, unit.unit_key, fromUnit);
        let key = base;
        for (let n = 2; taken.has(key); n++) key = `${base}-${n}`;
        if (!SHORT_KEY.test(key)) throw new Error(`plan unit ${pu.unit}: "${pm.title}" gives the key ${key}, which is not a short slug`);
        taken.add(key);

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
          const chunk = graph.chunks.find((c) => c.examples.some((e) => e.replace(/’/g, "'").trim() === phrase.replace(/’/g, "'").trim()));
          report.phrases.push({ module_key: key, phrase, construction: chunk?.id ?? null });
          if (chunk) constructions.push(chunk.id);
        }
        if (pm.alreadyKnown?.length) report.not_retaught.push({ module_key: key, lemmas: [...pm.alreadyKnown] });

        const stub = { schema: MODULE_SCHEMA, module_key: key, kind, status: 'planned' };
        if (title !== null) stub.title = title;
        stub.plan = { words: unique(words), constructions: unique(constructions), source: PLAN_SOURCE };
        if (pm.reading?.draft) stub.plan.draft = `${PLAN_DIR}${pm.reading.draft}`;

        modules.push(stub);
        unit.entries.push(key);
        report.modules.push({ module_key: key, unit_key: unit.unit_key, kind, plan_title: pm.title, title });
        if (title !== pm.title) report.titles_changed.push({ module_key: key, from: pm.title, to: title });
      }
    }
  // On a rerun every key should be an earlier stub's. A new one means a stub was written (or removed) since, and the
  // plan module behind it would come back as a second stub under a new key; main() refuses to write that.
  report.new_on_rerun = earlier.size ? modules.map((m) => m.module_key).filter((k) => !earlier.has(k)) : [];
  return { units, modules, report };
}

/**
 * The outline with the stubs listed: entries from an earlier run (previousKeys) are taken out first and a unit left
 * empty by that is dropped, then each existing unit gains its entries at its end and each new unit is added after the
 * others with only its key, name and entries (outline.mjs: a unit of planned modules needs no more).
 */
export function applyStubs(outline, units, previousKeys) {
  const out = structuredClone(outline);
  out.units = out.units.map((u) => ({ ...u, entries: u.entries.filter((k) => !previousKeys.has(k)) })).filter((u) => u.entries.length > 0);
  for (const u of units) {
    const have = out.units.find((x) => x.unit_key === u.unit_key);
    if (have) have.entries.push(...u.entries);
    else out.units.push({ unit_key: u.unit_key, name: u.name, entries: [...u.entries] });
  }
  return out;
}

/* ---------- CLI ---------- */

const json = (v) => JSON.stringify(v, null, 2) + '\n';

function main(args) {
  const at = args.indexOf('--plan');
  const planFile = at >= 0 ? args[at + 1] : DEFAULT_PLAN_FILE;
  const write = args.includes('--write');
  const check = args.includes('--check');
  if ((at >= 0 && !planFile) || (write && check) || args.some((a, i) => a.startsWith('--') && !['--plan', '--write', '--check'].includes(a) && args[i - 1] !== '--plan')) {
    console.error('usage: node scripts/content/plan-stubs.mjs [--plan <plan.json>] [--write | --check]');
    return 2;
  }
  if (!existsSync(planFile)) {
    console.error(`${planFile}: no course plan here; set LA_COURSE_PLAN or pass --plan`);
    return 1;
  }
  const plan = JSON.parse(readFileSync(planFile, 'utf8'));
  let course;
  try {
    course = loadCourse();
  } catch (e) {
    if (!(e instanceof ContentError)) throw e;
    for (const p of e.problems) console.error(`${p.file} ${p.path} ${p.code} ${p.message}`);
    return 1;
  }
  const previous = new Set([...course.modules.values()].filter(isPlanStub).map((m) => m.module_key));
  const { units, modules, report } = planToStubs(plan, course, { graph: planGraph() });

  const outlineFile = join(CONTENT_ROOT, 'course.json');
  const outline = JSON.parse(readFileSync(outlineFile, 'utf8'));
  const files = new Map(modules.map((m) => [join(CONTENT_ROOT, 'modules', `${m.module_key}.json`), json(m)]));
  files.set(outlineFile, json(applyStubs(outline, units, previous)));
  const stale = [...previous].filter((k) => !modules.some((m) => m.module_key === k)).map((k) => join(CONTENT_ROOT, 'modules', `${k}.json`));
  const changed = [...files].filter(([f, text]) => !existsSync(f) || readFileSync(f, 'utf8') !== text).map(([f]) => f);

  for (const u of units) console.log(`${u.unit_key} ${u.existing ? '+' : ''}${u.entries.length} ${u.name}`);
  console.log(`stubs ${modules.length} (${units.filter((u) => !u.existing).length} new units)`);
  for (const c of report.titles_changed) console.log(`title ${c.module_key}: ${JSON.stringify(c.from)} -> ${c.to === null ? '(from the unit)' : JSON.stringify(c.to)}`);
  for (const p of report.phrases.filter((x) => x.construction)) console.log(`phrase ${p.module_key}: ${JSON.stringify(p.phrase)} -> ${p.construction}`);
  for (const u of report.unit_names) console.log(`unit name ${u.unit_key}: course "${u.course}", plan "${u.plan}"`);
  for (const u of report.unresolved) console.log(`unresolved ${u.module_key} ${u.field} ${u.value}`);

  const rel = (f) => f.replace(fileURLToPath(new URL('../../', import.meta.url)), '');
  if (report.new_on_rerun.length && !check) {
    console.error(
      `${report.new_on_rerun.join(', ')}: not stubs of the last run. A stub has been written or removed since, so the plan ` +
        'would add its module again under a new key. Edit the remaining stubs by hand; nothing written.',
    );
    return 1;
  }
  if (check) {
    for (const f of [...changed, ...stale]) console.error(`${rel(f)} differs from what --write writes`);
    return changed.length || stale.length ? 1 : 0;
  }
  if (!write) {
    console.log(`would write ${changed.length} files${stale.length ? `, remove ${stale.length}` : ''}; rerun with --write`);
    return 0;
  }
  for (const f of changed) writeFileSync(f, files.get(f));
  for (const f of stale) rmSync(f);
  console.log(`wrote ${changed.length} files${stale.length ? `, removed ${stale.map(rel).join(', ')}` : ''}`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exitCode = main(process.argv.slice(2));
