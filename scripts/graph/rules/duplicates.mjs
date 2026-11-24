import { issue } from '../issues.mjs';
import { taughtNodeIds } from './teaches.mjs';

export function ruleDuplicates(ctx) {
  const where = new Map(); // nodeId -> modules in course order
  for (const m of ctx.course) {
    if (m.kind !== 'lesson') continue;
    for (const id of taughtNodeIds(ctx.graph.courseMap?.[m.moduleKey])) {
      if (!where.has(id)) where.set(id, []);
      where.get(id).push(m);
    }
  }
  const issues = [];
  for (const [id, mods] of where) {
    if (mods.length < 2) continue;
    const [first, second] = mods;
    issues.push(issue({
      rule: 'taught-twice',
      severity: 'warning',
      moduleKey: second.moduleKey,
      position: second.position,
      nodeId: id,
      message: `${id} is taught at positions ${mods.map((x) => x.position).join(', ')}`,
      fix: { kind: 'merge-duplicate', moduleKey: first.moduleKey },
    }));
  }
  return issues;
}
