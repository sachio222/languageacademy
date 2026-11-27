// plan:stubs: the plan's modules as planned module files, and the outline that lists them, so the content loader, the
// checker and graph:due see every unit the plan holds.
//
//   node scripts/plan/cli.mjs stubs <lang> [--write | --check]
//
// A planned module file holds only what the plan settles (la-module@1, status planned): its kind, its title and
// plan { words, constructions, source }. It teaches nothing until it is written and never publishes. The plan
// file stays the one place that says what a module teaches and why (goals, notes, the reading's premise): a stub is always this command's output, never edited by
// hand, and a module that has been written is never touched.
//
//   planToStubs(plan, { graphIds, written })   -> { stubs, pending }
//     stubs    the module files for every plan module that is not written, in plan order
//     pending  [{ module_key, id }]: plan words the graph does not hold yet (words_to_add). A stub cannot name them
//              (the loader refuses an id the graph lacks), so run the command again once they are headwords
//   planOutline(outline, plan, { stale })      -> the outline with each plan unit listing its modules in plan order
//     A written module the plan does not list keeps its place at the head of its unit. A plan unit new to the outline
//     gets its key and name; one that holds no written module takes the plan's title as its name. Units left empty
//     are dropped. stale: keys of planned files the plan no longer holds.
// With no flag the command prints what it would do. --check exits 1 when a file differs. --write writes the stubs,
// then the outline, then removes stale planned files.
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { writeFileAtomic } from '../content/atomic-write.mjs';
import { graphIds as readGraphIds } from '../content/load.mjs';
import { MODULE_SCHEMA, hasPositionWord } from '../content/schema/module.mjs';
import { PLAN_FILE, PlanError, plain, planPaths, readPlan, schemaProblems } from './plan.mjs';

const json = (v) => JSON.stringify(v, null, 2) + '\n';
const unique = (list) => [...new Set(list)];

export function planToStubs(plan, { graphIds, written = new Set() }) {
  const stubs = [];
  const pending = [];
  for (const unit of plan.units) {
    for (const m of unit.modules) {
      if (written.has(m.module_key)) continue;
      const words = [];
      for (const id of m.teaches.words) (graphIds.words.has(id) ? words.push(id) : pending.push({ module_key: m.module_key, id }));
      // A reading's plan names the patterns its text must use, as a drafter needs them; it teaches words only.
      const constructions = m.kind === 'reading' ? m.reading.must_use : m.teaches.constructions;
      const stub = { schema: MODULE_SCHEMA, module_key: m.module_key, kind: m.kind, status: 'planned' };
      // A unit exam's title comes from its unit.
      if (m.kind !== 'unit_exam') {
        if (hasPositionWord(plain(m.title))) throw new PlanError(`${m.module_key}: the title "${m.title}" names a position; name the subject instead`);
        stub.title = m.title;
      }
      stub.plan = { words: unique(words), constructions: unique(constructions), source: PLAN_FILE };
      stubs.push(stub);
    }
  }
  return { stubs, pending };
}

// A plan unit's outline fields for course.json: description, can_do_short and can_do_example_fr as the plan writes
// them, and can_do from the unit's can_do ("You can show a newcomer round." -> "show a newcomer round"). Only when the
// plan holds an outline.
export function outlineFields(unit) {
  if (!unit.outline) return {};
  const canDo = String(unit.can_do ?? '').replace(/^you can\s+/i, '').replace(/[.\s]+$/, '');
  return { ...unit.outline.description && { description: unit.outline.description }, ...canDo && { can_do: canDo },
    ...unit.outline.can_do_short && { can_do_short: unit.outline.can_do_short }, ...unit.outline.can_do_example_fr && { can_do_example_fr: unit.outline.can_do_example_fr } };
}

export function planOutline(outline, plan, { stale = new Set(), writtenIn = () => false } = {}) {
  const planKeys = new Set(plan.units.flatMap((u) => u.modules.map((m) => m.module_key)));
  const planUnits = new Set(plan.units.map((u) => u.unit_key));
  const out = structuredClone(outline);
  const have = new Map(out.units.map((u) => [u.unit_key, u]));
  // Every unit loses the keys the plan places and the stale ones; what stays was there before the plan.
  for (const u of out.units) u.entries = u.entries.filter((k) => !planKeys.has(k) && !stale.has(k));
  const planned = plan.units.map((pu) => {
    const unit = have.get(pu.unit_key) ?? { unit_key: pu.unit_key, name: pu.title, entries: [] };
    if (!unit.entries.some(writtenIn)) unit.name = pu.title;
    Object.assign(unit, outlineFields(pu));
    unit.entries = [...unit.entries, ...pu.modules.map((m) => m.module_key)];
    // entries stay last, as in the rest of the outline
    const { entries } = unit;
    delete unit.entries;
    unit.entries = entries;
    return unit;
  });
  out.units = [...out.units.filter((u) => !planUnits.has(u.unit_key)), ...planned].filter((u) => u.entries.length > 0);
  return out;
}

export async function stubsCommand({ repoRoot, lang, write = false, check = false }) {
  if (write && check) throw new PlanError('--write and --check do not go together');
  const paths = planPaths(repoRoot, lang);
  const plan = readPlan(repoRoot, lang);
  const bad = schemaProblems(plan);
  if (bad.length) throw new PlanError(bad.map((m) => `${PLAN_FILE}: ${m}`).join('\n'));
  const dir = join(paths.content, 'modules');
  const onDisk = new Map(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => {
    const text = readFileSync(join(dir, f), 'utf8');
    return [f.slice(0, -5), { text, status: JSON.parse(text).status }];
  }));
  const written = new Set([...onDisk].filter(([, m]) => m.status !== 'planned').map(([k]) => k));
  const { stubs, pending } = planToStubs(plan, { graphIds: readGraphIds(paths.graphLang), written });
  const keep = new Set(stubs.map((s) => s.module_key));
  const stale = [...onDisk].filter(([k, m]) => m.status === 'planned' && !keep.has(k)).map(([k]) => k).sort();

  const outlineFile = join(paths.content, 'course.json');
  const stubFile = (k) => join(dir, `${k}.json`);
  const files = new Map(stubs.map((s) => [stubFile(s.module_key), json(s)]));
  files.set(outlineFile, json(planOutline(JSON.parse(readFileSync(outlineFile, 'utf8')), plan, { stale: new Set(stale), writtenIn: (k) => written.has(k) })));
  const changed = [...files].filter(([f, text]) => !existsSync(f) || readFileSync(f, 'utf8') !== text).map(([f]) => f);
  const rel = (f) => relative(repoRoot, f);

  console.log(`${plan.units.length} units, ${stubs.length} planned modules, ${plan.units.flatMap((u) => u.modules).length - stubs.length} written already`);
  if (pending.length) console.log(`${pending.length} plan words are not in the graph yet and are left out of their stubs: ${pending.map((p) => p.id).join(', ')}`);
  if (check) {
    for (const f of changed) console.error(`${rel(f)} differs from what --write writes`);
    for (const k of stale) console.error(`${rel(stubFile(k))} is a planned module the plan no longer holds`);
    return changed.length || stale.length ? 1 : 0;
  }
  if (!write) {
    console.log(`would write ${changed.length} files and remove ${stale.length} planned modules the plan no longer holds; rerun with --write`);
    return 0;
  }
  // Stubs first, the outline last, removals after it: an interrupted run leaves every file whole and listed.
  for (const f of changed.filter((x) => x !== outlineFile)) writeFileAtomic(f, files.get(f));
  if (changed.includes(outlineFile)) writeFileAtomic(outlineFile, files.get(outlineFile));
  for (const k of stale) rmSync(stubFile(k));
  console.log(`wrote ${changed.length} files, removed ${stale.length} planned modules the plan no longer holds`);
  return 0;
}
