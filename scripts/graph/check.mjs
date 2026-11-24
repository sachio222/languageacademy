import { join } from 'node:path';
import { loadGraph } from './load.mjs';
import { validateGraph } from './validate.mjs';
import { readCourse } from './course.mjs';
import { buildFormIndex } from './fr/forms.mjs';
import { frenchWordTest } from './french-text.mjs';
import { buildTimeline } from './timeline.mjs';
import { ruleTaughtBefore, cognatesAllowed } from './rules/taught-before.mjs';
import { ruleReuse } from './rules/reuse.mjs';
import { ruleTranslation } from './rules/translation.mjs';
import { ruleClaims } from './rules/claims.mjs';
import { ruleDuplicates } from './rules/duplicates.mjs';
import { ruleLevels } from './rules/levels.mjs';
import { ruleUnread } from './rules/unread.mjs';
import { ruleShapes } from './rules/shapes.mjs';
import { ruleBlanks } from './rules/blanks.mjs';
import { ruleCourseMapKeys, ruleCourseMapItems } from './rules/course-map.mjs';
import { ruleFunctionExponents } from './functions.mjs';

const RULES = [
  ruleTaughtBefore, ruleReuse, ruleTranslation, ruleClaims,
  ruleDuplicates, ruleLevels, ruleUnread, ruleShapes, ruleBlanks, ruleCourseMapKeys, ruleCourseMapItems,
  ruleFunctionExponents,
];

// native: the learner's native language, which picks the language pair; settings.defaultNative when left out.
export async function runCheck({ repoRoot, lang, native }) {
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), lang, { native });
  const index = buildFormIndex(graph);
  const course = await readCourse(repoRoot, { courseMap: graph.courseMap, isWord: frenchWordTest(graph, index) });
  const timeline = buildTimeline(graph, course);
  const ctx = { graph, course, index, timeline };
  const issues = [
    ...validateGraph(graph, { course, repoRoot }),
    ...timeline.issues,
    ...RULES.flatMap((rule) => rule(ctx)),
  ];
  return { ctx, issues, stats: { native: graph.native, cognatesAllowed: cognatesAllowed(ctx) } };
}
