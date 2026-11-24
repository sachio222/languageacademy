import { issue } from '../issues.mjs';

const STANDARD = new Set(['items', 'passage']);

export function ruleShapes(ctx) {
  const issues = [];
  for (const m of ctx.course) {
    const odd = (m.shapes ?? []).filter((s) => !STANDARD.has(s));
    if (odd.length === 0) continue;
    issues.push(issue({
      rule: 'nonstandard-shape',
      severity: 'warning',
      moduleKey: m.moduleKey,
      position: m.position,
      message: `${m.moduleKey} uses nonstandard exercise shapes: ${odd.join(', ')}`,
      fix: { kind: 'convert-item', note: odd.join(', ') },
    }));
  }
  return issues;
}
