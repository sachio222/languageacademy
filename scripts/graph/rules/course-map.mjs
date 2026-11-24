import { issue } from '../issues.mjs';

// course-map.json entries for modules that are not in the course.
export function ruleCourseMapKeys(ctx) {
  const known = new Set(ctx.course.map((m) => m.moduleKey));
  return Object.keys(ctx.graph.courseMap ?? {})
    .filter((key) => !known.has(key))
    .map((key) => issue({
      rule: 'course-map-unknown-module',
      severity: 'warning',
      moduleKey: key,
      message: `course-map.json has an entry for ${key}, which is not a module in the course`,
    }));
}

// itemKinds and overrides keys that name no item of their module: the item moved or was renumbered, so the
// entry no longer applies.
export function ruleCourseMapItems(ctx) {
  const issues = [];
  for (const m of ctx.course) {
    const entry = ctx.graph.courseMap?.[m.moduleKey];
    if (!entry) continue;
    const refs = new Set(m.items.map((it) => it.ref));
    for (const field of ['itemKinds', 'overrides']) {
      for (const ref of Object.keys(entry[field] ?? {})) {
        if (refs.has(ref)) continue;
        issues.push(issue({
          rule: 'course-map-unknown-item',
          severity: 'warning',
          moduleKey: m.moduleKey,
          position: m.position,
          itemRef: ref,
          message: `course-map.json ${field} names ${ref}, which is not an item of ${m.moduleKey}`,
        }));
      }
    }
  }
  return issues;
}
