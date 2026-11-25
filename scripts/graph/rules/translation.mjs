import { issue } from '../issues.mjs';
import { classifyItem } from './item-kinds.mjs';

// The item's kind: the course map's itemKinds entry when there is one; else, for an item read from the content layer,
// its type (only a translate item is a translation, Jake's option 3: a framed prompt is respond); else, for a module
// in today's shape, the classifier's answer. A content text that is not an item (type null) is never a translation.
export function itemKind(ctx, m, it) {
  const set = ctx.graph.courseMap?.[m.moduleKey]?.itemKinds?.[it.ref];
  if (set) return set;
  if ('type' in it) return it.type === 'translate' ? 'translate' : 'other';
  return classifyItem(m, it)[0];
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
        message: `${it.ref} is a bare English sentence to translate in unit ${m.unitId}; translation prompts are allowed through unit ${allowed}`,
        fix: { kind: 'convert-item' },
      }));
    }
  }
  return issues;
}
