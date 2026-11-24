import { issue } from '../issues.mjs';

const CLAIMING = new Set(['exam', 'practice']);

export function ruleClaims(ctx) {
  const issues = [];
  for (const m of ctx.course) {
    if (!CLAIMING.has(m.kind)) continue;
    const tests = ctx.graph.courseMap?.[m.moduleKey]?.tests ?? [];
    for (const id of tests) {
      if (ctx.timeline.isAvailable(id, m.position)) continue;
      issues.push(issue({
        rule: 'claim-untaught',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        nodeId: id,
        message: `${m.kind} ${m.moduleKey} (position ${m.position}) tests ${id}, which is not taught by then`,
        fix: { kind: 'add-module' },
      }));
    }
    if ((m.conceptTerms ?? []).length > 0 && tests.length === 0) {
      issues.push(issue({
        rule: 'claims-unmapped',
        severity: 'warning',
        moduleKey: m.moduleKey,
        position: m.position,
        message: `${m.kind} ${m.moduleKey} (position ${m.position}) claims ${m.conceptTerms.join(', ')} but maps no tested IDs`,
        fix: { kind: 'map-claim' },
      }));
    }
  }
  return issues;
}
