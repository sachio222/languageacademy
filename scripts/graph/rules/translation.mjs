import { issue } from '../issues.mjs';
import { classifyItem } from './item-kinds.mjs';

// The item's kind: the course map's itemKinds entry when there is one, else the classifier's answer.
export function itemKind(ctx, m, it) {
  return ctx.graph.courseMap?.[m.moduleKey]?.itemKinds?.[it.ref] ?? classifyItem(m, it)[0];
}

export function ruleTranslation(ctx) {
  const allowed = ctx.graph.settings.translateAllowedThroughUnit;
  const issues = [];
  for (const m of ctx.course) {
    if (m.unitId <= allowed) continue;
    for (const it of m.items) {
      if (itemKind(ctx, m, it) !== 'translate') continue;
      issues.push(issue({
        rule: 'translate-item',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        itemRef: it.ref,
        message: `${it.ref} is an English-prompt translation in unit ${m.unitId}; translation prompts are allowed through unit ${allowed}`,
        fix: { kind: 'convert-item' },
      }));
    }
  }
  return issues;
}
