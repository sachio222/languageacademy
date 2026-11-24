import { issue } from '../issues.mjs';

export function itemKind(ctx, moduleKey, it) {
  const set = ctx.graph.courseMap?.[moduleKey]?.itemKinds?.[it.ref];
  if (set) return set;
  return it.englishPrompt && (it.french ?? []).length > 0 ? 'translate' : 'other';
}

export function ruleTranslation(ctx) {
  const allowed = ctx.graph.settings.translateAllowedThroughUnit;
  const issues = [];
  for (const m of ctx.course) {
    if (m.unitId <= allowed) continue;
    for (const it of m.items) {
      if (itemKind(ctx, m.moduleKey, it) !== 'translate') continue;
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
