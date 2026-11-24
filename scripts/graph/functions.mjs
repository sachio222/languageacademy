import { issue } from './issues.mjs';

// The six function groups of the Threshold Level (van Ek and Trim 1990): imparting and seeking factual
// information, expressing and finding out attitudes, getting things done (suasion), socialising, structuring
// discourse and communication repair.
export const GROUPS = ['information', 'attitudes', 'suasion', 'socialising', 'discourse', 'repair'];

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
    // An irregular form also needs its headword, as a reading of it does (timeline.isReadingAvailable).
    const needed = (e.nodes ?? []).flatMap((id) => [id, graph.nodes.get(id)?.of].filter(Boolean));
    let position = 1;
    for (const id of needed) {
      if (id.split(':')[1] === 'name') continue;
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
