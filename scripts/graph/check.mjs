import { join } from 'node:path';
import { loadGraph } from './load.mjs';
import { validateGraph } from './validate.mjs';
import { readCourse, readReferenceModules } from './course.mjs';
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
import { tokenize } from './fr/tokenize.mjs';
import { lookupToken, lookupTokenStrict } from './fr/forms.mjs';

const RULES = [
  ruleTaughtBefore, ruleReuse, ruleTranslation, ruleClaims,
  ruleDuplicates, ruleLevels, ruleUnread, ruleShapes, ruleBlanks, ruleCourseMapKeys, ruleCourseMapItems,
  ruleFunctionExponents, ruleFunctionUnreachable,
];

// Headwords and forms the Reference unit's vocabulary tables list, read the way lesson vocabulary is. The report
// names them where a function needs one that no lesson teaches (functionReport referenceOnly).
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

// Parts of speech whose headwords and forms the Reference unit opens: a learner looks up a number, a color or a
// letter. A headword of any other part of speech opens too, as its lemma, except grammar words.
const OPEN_ANY_READING = new Set(['noun', 'adjective', 'number', 'alphabet']);
const NEVER_OPEN = new Set(['pronoun', 'determiner', 'article', 'preposition', 'conjunction', 'interrogative']);
const RANK = { irregular: 0, generated: 1, lemma: 2 };

// True when the Reference unit may open this reading: any noun, adjective, number or letter reading, and the lemma
// of a headword that is not a grammar word. A verb form or a pronoun never opens, so vive opens vif and not a
// subjunctive of vivre.
function opens(reading) {
  if (OPEN_ANY_READING.has(reading.pos)) return true;
  return reading.via === 'lemma' && !NEVER_OPEN.has(reading.pos);
}

// The nodes the Reference unit opens from settings.reference.openFrom on: for each token of each entry, the readings
// that may open (opens), exact accents first and a folded match only as a fallback, and of those the best kind
// (irregular form, then generated form, then lemma). Filtering before ranking lets l'été read as the season when the
// past participle of être would otherwise win.
export function referenceOpenNodes(index, vocab) {
  const isWord = (f) => index.has(f);
  const out = new Set();
  for (const text of vocab) {
    for (const token of tokenize(text, { isWord })) {
      let readings = lookupTokenStrict(index, token).filter(opens);
      if (!readings.length) readings = lookupToken(index, token).filter(opens);
      if (!readings.length) continue;
      const best = Math.min(...readings.map((r) => RANK[r.via]));
      for (const r of readings.filter((x) => RANK[x.via] === best)) {
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
  const referenceModules = await readReferenceModules(repoRoot);
  const reference = referenceNodes(index, referenceModules.flatMap((m) => m.vocab));
  // Only the modules settings.reference.modules lists open their words; the others are read for the report only.
  const openKeys = new Set(graph.settings?.reference?.modules ?? []);
  const open = referenceOpenNodes(index, referenceModules.filter((m) => openKeys.has(m.moduleKey)).flatMap((m) => m.vocab));
  const timeline = buildTimeline(graph, course, { reference: open, openFrom: graph.settings?.reference?.openFrom ?? null });
  // referenceOpenTitles: the titles of the Reference pages that open, for the fix list.
  const referenceOpenTitles = referenceModules.filter((m) => openKeys.has(m.moduleKey)).map((m) => m.title);
  const ctx = { graph, course, index, timeline, reference, referenceOpenTitles };
  const issues = [
    ...validateGraph(graph, { course, repoRoot, referenceModules: referenceModules.map((m) => m.moduleKey) }),
    ...timeline.issues,
    ...RULES.flatMap((rule) => rule(ctx)),
  ];
  const stats = { native: graph.native, cognatesAllowed: cognatesAllowed(ctx), ...reportStats(levelReport(ctx), functionReport(ctx)) };
  return { ctx, issues, stats };
}
