import { join } from 'node:path';
import { loadGraph } from './load.mjs';
import { validateGraph } from './validate.mjs';
import { readCourse, readReferenceVocab } from './course.mjs';
import { buildFormIndex } from './fr/forms.mjs';
import { frenchWordTest } from './french-text.mjs';
import { buildTimeline } from './timeline.mjs';
import { ruleTaughtBefore, cognatesAllowed } from './rules/taught-before.mjs';
import { ruleReuse } from './rules/reuse.mjs';
import { ruleTranslation } from './rules/translation.mjs';
import { ruleClaims } from './rules/claims.mjs';
import { ruleDuplicates } from './rules/duplicates.mjs';
import { ruleLevels, levelReport } from './rules/levels.mjs';
import { ruleUnread } from './rules/unread.mjs';
import { ruleShapes } from './rules/shapes.mjs';
import { ruleBlanks } from './rules/blanks.mjs';
import { ruleCourseMapKeys, ruleCourseMapItems } from './rules/course-map.mjs';
import { ruleFunctionExponents, ruleFunctionUnreachable, functionReport } from './functions.mjs';
import { reportStats } from './report-data.mjs';
import { entryReadings } from './extract-teaches.mjs';

const RULES = [
  ruleTaughtBefore, ruleReuse, ruleTranslation, ruleClaims,
  ruleDuplicates, ruleLevels, ruleUnread, ruleShapes, ruleBlanks, ruleCourseMapKeys, ruleCourseMapItems,
  ruleFunctionExponents, ruleFunctionUnreachable,
];

// Headwords and forms the Reference unit's vocabulary tables list. The unit has no position and learners can open it
// at any time, so the timeline counts these nodes as available from settings.reference.openFrom on.
export function referenceNodes(index, vocab) {
  const isWord = (f) => index.has(f);
  const out = new Set();
  for (const text of vocab) {
    for (const { readings } of entryReadings(text, index, isWord)) {
      for (const r of readings) {
        out.add(r.headwordId);
        if (r.via !== 'lemma') out.add(r.nodeId);
      }
    }
  }
  return out;
}

// native: the learner's native language, which picks the language pair; settings.defaultNative when left out.
export async function runCheck({ repoRoot, lang, native }) {
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), lang, { native });
  const index = buildFormIndex(graph);
  const course = await readCourse(repoRoot, { courseMap: graph.courseMap, isWord: frenchWordTest(graph, index) });
  const reference = referenceNodes(index, await readReferenceVocab(repoRoot));
  const timeline = buildTimeline(graph, course, { reference, openFrom: graph.settings?.reference?.openFrom ?? null });
  const ctx = { graph, course, index, timeline, reference };
  const issues = [
    ...validateGraph(graph, { course, repoRoot }),
    ...timeline.issues,
    ...RULES.flatMap((rule) => rule(ctx)),
  ];
  const stats = { native: graph.native, cognatesAllowed: cognatesAllowed(ctx), ...reportStats(levelReport(ctx), functionReport(ctx)) };
  return { ctx, issues, stats };
}
