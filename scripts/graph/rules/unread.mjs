import { issue } from '../issues.mjs';

export function ruleUnread(ctx) {
  const issues = [];
  for (const m of ctx.course) {
    for (const shape of m.unreadShapes ?? []) {
      issues.push(issue({
        rule: 'unread-items',
        severity: 'error',
        moduleKey: m.moduleKey,
        position: m.position,
        message: `${m.moduleKey} has content the reader could not read: ${shape}`,
      }));
    }
  }
  return issues;
}
