// What a plan is checked against: the course as written, and the same course with the plan counted as if written.
//
// planContext({ repoRoot, lang, plan }) -> { base, projected, stubs, position, lookups }
//   base       the checker context of the written course only (planned module files are left out), from runCheck
//   stubs      the plan's modules as the projection reads them, placed after the last written module, in plan order.
//              A plan module whose key is already a written module is done and is left out
//   projected  base with each stub counted as written from its plan (scripts/graph/projection.mjs)
//   position   Map<module_key, position> for the plan's modules
//   lookups    { headwords, forms, constructions }: Map<id, node> of the language's graph
// Nothing here is specific to a language: the graph and the content loader are given the language code.
import { join } from 'node:path';
import { loadCourse } from '../content/load.mjs';
import { runCheck } from '../graph/check.mjs';
import { projectContext } from '../graph/projection.mjs';
import { levelReport } from '../graph/rules/levels.mjs';
import { planPaths, plain, TEACHES } from './plan.mjs';

/** The plan's modules as projection stubs, placed after `after` (the last written position). */
export function planStubs(plan, { after, unitIndexAfter, written = new Set() }) {
  const stubs = [];
  let position = after;
  plan.units.forEach((unit, u) => {
    for (const module of unit.modules) {
      if (written.has(module.module_key)) continue;
      position += 1;
      const teaches = TEACHES[module.kind];
      stubs.push({
        module_key: module.module_key, kind: module.kind, title: plain(module.title), position,
        unit_key: unit.unit_key, unit_index: unitIndexAfter + u + 1, unit_name: plain(unit.title),
        plan: {
          words: teaches.includes('words') ? [...module.teaches.words] : [],
          constructions: teaches.includes('constructions') ? [...module.teaches.constructions] : [],
        },
      });
    }
  });
  return stubs;
}

export async function planContext({ repoRoot, lang, plan, dictionaryForms }) {
  const paths = planPaths(repoRoot, lang);
  const content = loadCourse({ root: paths.content, graphDir: paths.graphLang, planned: false });
  const { ctx: base } = await runCheck({ repoRoot, lang, content, dictionaryForms });
  const written = new Set(base.course.map((m) => m.moduleKey));
  const after = Math.max(0, ...base.course.map((m) => m.position));
  // A plan unit that already holds written modules keeps its place; the others follow the last written unit.
  const unitIndexAfter = Math.max(0, ...base.course.map((m) => m.unitId).filter(Number.isInteger));
  const stubs = planStubs(plan, { after, unitIndexAfter, written });
  const projected = projectContext(base, stubs);
  const g = projected.graph;
  const lookups = {
    headwords: new Map(g.headwords.map((h) => [h.id, h])),
    forms: new Map(g.forms.map((f) => [f.id, f])),
    constructions: new Map([...(g.constructions ?? []), ...(g.paradigms ?? [])].map((c) => [c.id, c])),
  };
  return { base, projected, stubs, written, position: new Map(stubs.map((s) => [s.module_key, s.position])), lookups };
}

/** Where the course, with the plan counted, reaches each level: { A1: position | null, ... } (through that level). */
export function levelsReached(projected) {
  const report = levelReport(projected);
  return Object.fromEntries(Object.entries(report.levels).map(([level, l]) => [level, l.cumulative.reachedAt]));
}
