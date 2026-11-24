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

export function ruleReuse(ctx) {
  const windows = windowsOf(ctx);
  const uses = usesByNode(ctx);
  const last = lastPosition(ctx);
  const moduleAt = new Map(ctx.course.map((m) => [m.position, m]));
  const issues = [];
  for (const [nodeId, taught] of reusableNodes(ctx)) {
    // One warning per node, for its first missed window.
    const { firstMissEnd, lastUse } = walk(windows, taught, uses.get(nodeId) ?? [], Infinity);
    if (firstMissEnd === null || firstMissEnd > last) continue;
    const m = moduleAt.get(taught);
    issues.push(issue({
      rule: 'reuse-missed',
      severity: 'warning',
      moduleKey: m?.moduleKey,
      position: taught,
      nodeId,
      message: `${nodeId} (taught at position ${taught}) expected by position ${firstMissEnd}; `
        + (lastUse === null ? 'never used again' : `last use at position ${lastUse}`),
    }));
  }
  return issues;
}

// What the lesson at `position` should reuse: nodes with no use yet inside their current window, when that window
// ends by position + 1 (or has already ended).
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
