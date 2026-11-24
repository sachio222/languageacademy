import { join } from 'node:path';
import { loadGraph } from './load.mjs';
import { validateGraph } from './validate.mjs';
import { readCourse } from './course.mjs';
import { buildFormIndex } from './fr/forms.mjs';
import { buildTimeline } from './timeline.mjs';
import { ruleTaughtBefore } from './rules/taught-before.mjs';
import { ruleReuse } from './rules/reuse.mjs';
import { ruleTranslation } from './rules/translation.mjs';
import { ruleClaims } from './rules/claims.mjs';
import { ruleDuplicates } from './rules/duplicates.mjs';
import { ruleLevels } from './rules/levels.mjs';
import { ruleUnread } from './rules/unread.mjs';
import { ruleShapes } from './rules/shapes.mjs';
import { ruleBlanks } from './rules/blanks.mjs';
import { ruleCourseMapKeys, ruleCourseMapItems } from './rules/course-map.mjs';

const RULES = [
  ruleTaughtBefore, ruleReuse, ruleTranslation, ruleClaims,
  ruleDuplicates, ruleLevels, ruleUnread, ruleShapes, ruleBlanks, ruleCourseMapKeys, ruleCourseMapItems,
];

export async function runCheck({ repoRoot, lang }) {
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), lang);
  const course = await readCourse(repoRoot);
  const index = buildFormIndex(graph);
  const timeline = buildTimeline(graph, course);
  const ctx = { graph, course, index, timeline };
  const issues = [
    ...validateGraph(graph),
    ...timeline.issues,
    ...RULES.flatMap((rule) => rule(ctx)),
  ];
  return { ctx, issues };
}
