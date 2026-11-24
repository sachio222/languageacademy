import { issue } from './issues.mjs';

// The six function groups of the Threshold Level (van Ek and Trim 1990): imparting and seeking factual
// information, expressing and finding out attitudes, getting things done (suasion), socialising, structuring
// discourse and communication repair.
export const GROUPS = ['information', 'attitudes', 'suasion', 'socialising', 'discourse', 'repair'];

// CEFR levels a function may carry.
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// The nodes a learner needs for one exponent, in its order: an irregular form also needs its headword, as a reading
// of it does (timeline.isReadingAvailable). Names need no teaching and are left out.
function neededNodes(graph, exponent) {
  const out = [];
  for (const id of (exponent.nodes ?? []).flatMap((n) => [n, graph.nodes.get(n)?.of].filter(Boolean))) {
    if (id.split(':')[1] !== 'name' && !out.includes(id)) out.push(id);
  }
  return out;
}

// A function (core/functions.json) is something a learner does with the language, such as asking the time. An
// exponent (languages/<lang>/exponents.json) is one set of nodes that together perform it; several exponents of
// one function are alternatives. A function is available at the earliest position where every node of one of its
// exponents is available. An irregular form counts once both it and its headword are taught. Names need no
// teaching, so they never delay an exponent.
//
// Returns Map<fnId, { position, exponent }> in functions.json order: position is that course position or null,
// exponent the index in graph.exponents of the exponent that gets there first (the first in file order on a tie),
// or null.
export function functionAvailability(graph, timeline) {
  const best = new Map(graph.functions.map((f) => [f.id, { position: null, exponent: null }]));
  (graph.exponents ?? []).forEach((e, index) => {
    const current = best.get(e.function);
    if (!current) return;
    let position = 1;
    for (const id of neededNodes(graph, e)) {
      const at = timeline.taughtAt.get(id);
      if (at === undefined) { position = null; break; }
      position = Math.max(position, at);
    }
    if (position !== null && (current.position === null || position < current.position)) {
      best.set(e.function, { position, exponent: index });
    }
  });
  return best;
}

// Warning for each function this language has no exponent for: the course has no way to teach it yet.
export function ruleFunctionExponents(ctx) {
  const covered = new Set((ctx.graph.exponents ?? []).map((e) => e.function));
  return ctx.graph.functions.filter((f) => !covered.has(f.id)).map((f) => issue({
    rule: 'function-no-exponent',
    severity: 'warning',
    nodeId: f.id,
    message: `${f.id} (${f.cefr}, "${f.label}"): languages/${ctx.graph.lang}/exponents.json gives no way to do this, so no lesson can teach it yet`,
  }));
}

const rankOf = (level) => LEVELS.indexOf(level);

// Report data for every function, sorted by level, then group (GROUPS order), then ID:
// { functions: [{ id, group, cefr, label, position, exponentCount, missing, referenceOnly }] }.
// position: where the function becomes possible, or null. missing: for a function that never becomes possible, the
// nodes its closest exponent (fewest untaught nodes, first in file order on a tie) still needs; [] otherwise.
// referenceOnly: the missing nodes that only the Reference unit shows (ctx.reference, a Set of node IDs), which has
// no course position and so never teaches them.
export function functionReport(ctx) {
  const { graph, timeline } = ctx;
  const reference = ctx.reference ?? new Set();
  const availability = functionAvailability(graph, timeline);
  const byFunction = new Map();
  for (const e of graph.exponents ?? []) {
    if (!byFunction.has(e.function)) byFunction.set(e.function, []);
    byFunction.get(e.function).push(e);
  }
  const functions = graph.functions.map((f) => {
    const position = availability.get(f.id)?.position ?? null;
    const exponents = byFunction.get(f.id) ?? [];
    let missing = [];
    if (position === null && exponents.length) {
      let best = null;
      for (const e of exponents) {
        const lacking = neededNodes(graph, e).filter((id) => !timeline.taughtAt.has(id));
        if (best === null || lacking.length < best.length) best = lacking;
      }
      missing = best;
    }
    return {
      id: f.id, group: f.group, cefr: f.cefr, label: f.label, position,
      exponentCount: exponents.length, missing, referenceOnly: missing.filter((id) => reference.has(id)),
    };
  });
  functions.sort((a, b) => rankOf(a.cefr) - rankOf(b.cefr) || GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group)
    || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return { functions };
}

// Warning for each A1 or A2 function that no exponent makes possible by the end of the course. A function with no
// exponent at all is left to function-no-exponent.
export function ruleFunctionUnreachable(ctx) {
  return functionReport(ctx).functions
    .filter((f) => ['A1', 'A2'].includes(f.cefr) && f.position === null && f.exponentCount > 0)
    .map((f) => {
      const ref = new Set(f.referenceOnly);
      const needs = f.missing.map((id) => (ref.has(id) ? `${id} (shown only in the Reference unit)` : id)).join(', ');
      return issue({
        rule: 'function-unreachable',
        severity: 'warning',
        nodeId: f.id,
        message: `${f.id} (${f.cefr}, "${f.label}") never becomes possible in the course: its closest French exponent still needs ${needs}`,
      });
    });
}
