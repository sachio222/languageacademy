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

const lastPosition = (ctx) => ctx.course.reduce((max, m) => Math.max(max, m.position), 0);

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

// Walks the windows over uses before `limit`. Returns { pendingEnd, lastUse }:
// pendingEnd is the end of the first unsatisfied window, or null when all are satisfied.
function walk(windows, taught, uses, limit) {
  let s = taught;
  let lastUse = null;
  for (const w of windows) {
    const u = uses.find((x) => x > s && x <= s + w && x < limit);
    if (u === undefined) return { pendingEnd: s + w, lastUse: lastUseBefore(uses, limit, taught) };
    s = u;
    lastUse = u;
  }
  return { pendingEnd: null, lastUse };
}

function lastUseBefore(uses, limit, taught) {
  let last = null;
  for (const u of uses) if (u > taught && u < limit) last = u;
  return last;
}

export function ruleReuse(ctx) {
  const windows = windowsOf(ctx);
  const uses = usesByNode(ctx);
  const last = lastPosition(ctx);
  const moduleAt = new Map(ctx.course.map((m) => [m.position, m]));
  const issues = [];
  for (const [nodeId, taught] of reusableNodes(ctx)) {
    const { pendingEnd, lastUse } = walk(windows, taught, uses.get(nodeId) ?? [], Infinity);
    if (pendingEnd === null || pendingEnd > last) continue;
    const m = moduleAt.get(taught);
    issues.push(issue({
      rule: 'reuse-missed',
      severity: 'warning',
      moduleKey: m?.moduleKey,
      position: taught,
      nodeId,
      message: `${nodeId} (taught at position ${taught}) expected by position ${pendingEnd}; `
        + (lastUse === null ? 'never used again' : `last use at position ${lastUse}`),
    }));
  }
  return issues;
}

// What the lesson at `position` should reuse: nodes still owed a use whose window ends by position + 1.
export function dueAt(ctx, position) {
  const windows = windowsOf(ctx);
  const uses = usesByNode(ctx);
  const due = [];
  for (const [nodeId, taught] of reusableNodes(ctx)) {
    if (taught >= position) continue;
    const { pendingEnd, lastUse } = walk(windows, taught, uses.get(nodeId) ?? [], position);
    if (pendingEnd === null || pendingEnd > position + 1) continue;
    due.push({ nodeId, taughtAt: taught, lastUse, windowEnd: pendingEnd });
  }
  return due.sort((a, b) => a.windowEnd - b.windowEnd || (a.nodeId < b.nodeId ? -1 : a.nodeId > b.nodeId ? 1 : 0));
}
