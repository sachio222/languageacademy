import { analyzeItems } from './taught-before.mjs';
import { parseId } from '../ids.mjs';
import { issue } from '../issues.mjs';

const memo = new WeakMap();

// Map<headwordId | constructionId, sorted unique positions>: where each taught node is used again.
// An untaught reading never counts; a generated reading also counts as a use of its paradigm.
export function usesByNode(ctx) {
  const cached = memo.get(ctx);
  if (cached) return cached;
  const analysis = analyzeItems(ctx);
  const sets = new Map();
  const note = (id, position) => {
    if (!sets.has(id)) sets.set(id, new Set());
    sets.get(id).add(position);
  };
  for (const m of ctx.course) {
    for (const it of m.items) {
      for (const a of analysis.get(it.ref) ?? []) {
        for (const readings of a.readings) {
          for (const r of readings) {
            if (!ctx.timeline.isReadingAvailable(r, m.position)) continue;
            note(r.headwordId, m.position);
            if (r.via === 'generated' && r.paradigmId != null) note(r.paradigmId, m.position);
          }
        }
        for (const id of a.constructions) note(id, m.position);
      }
    }
  }
  const out = new Map([...sets].map(([id, s]) => [id, [...s].sort((x, y) => x - y)]));
  memo.set(ctx, out);
  return out;
}

// Reuse windows count written modules, the ones a learner meets: a course plan stub is not read (content-course.mjs),
// holds no use and keeps only its place. A module's step is its place among the written modules; with no stub before
// the last written module (today's course) it is its position. Counting steps keeps the issues the same with stubs
// loaded or left out (loadCourse planned: false numbers the written modules alone).
function stepsOf(ctx) {
  const positions = ctx.course.map((m) => m.position).sort((a, b) => a - b);
  const byPosition = new Map(positions.map((p, i) => [p, i + 1]));
  const before = (p) => positions.filter((x) => x < p).length;
  return {
    // A written module's step; for a stub's position, the step the stub takes once written.
    step: (p) => byPosition.get(p) ?? before(p) + 1,
    written: (p) => byPosition.has(p),
    position: (s) => positions[s - 1] ?? (positions.at(-1) ?? 0) + (s - positions.length),
    last: positions.length,
  };
}

const windowsOf = (ctx) => {
  const { immediateWindow, windows } = ctx.graph.settings.reuse;
  return [immediateWindow, ...windows];
};

// Nodes subject to reuse: taught lex and cx nodes (paradigms are cx).
function reusableNodes(ctx) {
  const out = [];
  for (const [id, at] of ctx.timeline.taughtAt) {
    const { kind } = parseId(id);
    if (kind === 'lex' || kind === 'cx') out.push([id, at]);
  }
  return out;
}

// Walks the windows over uses before `limit`. A use inside a window starts the next window. A window with no use
// is a miss: the next use after it, however late, stands in for that window and the schedule goes on from there.
// Returns { firstMissEnd, pendingEnd, lastUse }: firstMissEnd is the end of the first missed window (null when
// none; an open window that reaches past the course counts too, so callers compare it with the last position),
// pendingEnd the end of the window still open at `limit` (null once every window is met), and lastUse the
// last use before `limit`.
function walk(windows, taught, uses, limit) {
  const before = uses.filter((x) => x > taught && x < limit);
  const lastUse = before.at(-1) ?? null;
  let s = taught;
  let firstMissEnd = null;
  for (const w of windows) {
    const end = s + w;
    let u = before.find((x) => x > s && x <= end);
    if (u === undefined) {
      u = before.find((x) => x > end);
      if (u === undefined) return { firstMissEnd: firstMissEnd ?? end, pendingEnd: end, lastUse };
      firstMissEnd ??= end;
    }
    s = u;
  }
  return { firstMissEnd, pendingEnd: null, lastUse };
}

// Course plan stubs (status planned) by position, for graph:due; with no content layer (a test course) there are none.
function plannedAt(ctx) {
  const out = new Map();
  for (const u of ctx.content?.units ?? []) for (const m of u.modules ?? []) if (m.status === 'planned') out.set(m.position, m);
  return out;
}

export function ruleReuse(ctx) {
  const windows = windowsOf(ctx);
  const uses = usesByNode(ctx);
  const steps = stepsOf(ctx);
  const moduleAt = new Map(ctx.course.map((m) => [m.position, m]));
  const issues = [];
  for (const [nodeId, taught] of reusableNodes(ctx)) {
    // One warning per node, for its first missed window.
    const walked = walk(windows, steps.step(taught), (uses.get(nodeId) ?? []).map(steps.step), Infinity);
    if (walked.firstMissEnd === null || walked.firstMissEnd > steps.last) continue;
    const firstMissEnd = steps.position(walked.firstMissEnd);
    const lastUse = walked.lastUse === null ? null : steps.position(walked.lastUse);
    const closing = moduleAt.get(firstMissEnd);
    const m = moduleAt.get(taught);
    issues.push(issue({
      rule: 'reuse-missed',
      severity: 'warning',
      moduleKey: m?.moduleKey,
      // The budget counts the miss where its window closes (budget.mjs countByPart): writing that module meets it, so
      // a word taught in Unit 12 and missed in Unit 13 is Unit 13's, never the legacy units'.
      budgetModuleKey: closing.moduleKey,
      position: taught,
      nodeId,
      message: `${nodeId} (taught at position ${taught}) expected by position ${firstMissEnd}; `
        + (lastUse === null ? 'never used again' : `last use at position ${lastUse}`),
    }));
  }
  return issues;
}

/**
 * What a module named by key or position can still meet, written or a course plan stub (a stub keeps its place in the
 * course): { position, due, ended }, or null when nothing matches. due holds the dueAt entries whose window is still
 * open at the module (it ends there or one module later); ended counts those whose window closed before it, which no
 * use in this module meets (graph:check lists them as reuse-missed).
 */
export function dueFor(ctx, arg) {
  const byPosition = /^\d+$/.test(String(arg));
  const match = (m) => (byPosition ? m.position === Number(arg) : m.moduleKey === arg);
  const m = ctx.course.find(match) ?? [...plannedAt(ctx).values()].map((p) => ({ position: p.position, moduleKey: p.module_key })).find(match);
  if (!m) return null;
  const all = dueSteps(ctx, m.position);
  const due = all.filter((d) => d.endStep >= d.atStep).map(({ endStep, atStep, ...d }) => d); // eslint-disable-line no-unused-vars
  return { position: m.position, due, ended: all.length - due.length };
}

// What the lesson at `position` should reuse: nodes with no use yet inside their current window, when that window
// ends by position + 1 (or has already ended).
export function dueAt(ctx, position) {
  return dueSteps(ctx, position).map(({ endStep, atStep, ...d }) => d); // eslint-disable-line no-unused-vars
}

// dueAt, counted in steps (stepsOf), with each entry's window end and the module's own step.
function dueSteps(ctx, position) {
  const windows = windowsOf(ctx);
  const uses = usesByNode(ctx);
  const steps = stepsOf(ctx);
  const at = steps.step(position);
  // A window end as a position: from a stub, or past the last written module, counted on from this module.
  const endAt = (end) => ((!steps.written(position) && end >= at) || end > steps.last ? position + (end - at) : steps.position(end));
  const due = [];
  for (const [nodeId, taught] of reusableNodes(ctx)) {
    const t = steps.step(taught);
    if (t >= at) continue;
    const { pendingEnd, lastUse } = walk(windows, t, (uses.get(nodeId) ?? []).map(steps.step), at);
    if (pendingEnd === null || pendingEnd > at + 1) continue;
    due.push({ nodeId, taughtAt: taught, lastUse: lastUse === null ? null : steps.position(lastUse), windowEnd: endAt(pendingEnd), endStep: pendingEnd, atStep: at });
  }
  return due.sort((a, b) => a.endStep - b.endStep || (a.nodeId < b.nodeId ? -1 : a.nodeId > b.nodeId ? 1 : 0));
}
