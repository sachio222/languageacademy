import { join } from 'node:path';
import { loadGraph } from './load.mjs';
import { issue } from './issues.mjs';
import { validateGraph } from './validate.mjs';
import { readCourseFromContent, referenceModulesFromContent, courseMapFromContent } from './content-course.mjs';
import { loadCourse } from '../content/load.mjs';
import { languageOf, languageOfIndex } from './language.mjs';
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
import { ruleExamItemCopied, ruleReadingWordNoPopup, ruleGuideOnlyTeaching } from './rules/content.mjs';
import { ruleFunctionExponents, ruleFunctionUnreachable, functionReport } from './functions.mjs';
import { reportStats } from './report-data.mjs';
import { entryReadings } from './extract-teaches.mjs';

const RULES = [
  ruleTaughtBefore, ruleReuse, ruleTranslation, ruleClaims,
  ruleDuplicates, ruleLevels, ruleUnread, ruleShapes, ruleBlanks, ruleCourseMapKeys, ruleCourseMapItems,
  ruleFunctionExponents, ruleFunctionUnreachable,
  ruleExamItemCopied, ruleReadingWordNoPopup, ruleGuideOnlyTeaching,
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

// Parts of speech the Reference unit opens, with their forms: a learner looks up a number, a color or a letter.
// Verbs (infinitives included), adverbs and grammar words never open.
const OPENS = new Set(['noun', 'adjective', 'number', 'alphabet']);
const RANK = { irregular: 0, generated: 1, lemma: 2 };

// True when the Reference unit may open this reading: a noun, adjective, number or letter, or one of their forms.
// So vive opens the feminine of vif and not a subjunctive of vivre.
const opens = (reading) => OPENS.has(reading.pos);

// The nodes the Reference unit opens from settings.reference.openFrom on: for each token of each entry, the readings
// that may open (opens), exact accents first and a folded match only as a fallback, and of those the best kind
// (irregular form, then generated form, then lemma). Filtering before ranking lets l'été read as the season when the
// past participle of être would otherwise win.
export function referenceOpenNodes(index, vocab) {
  const { tokenize, lookupToken, lookupTokenStrict } = languageOfIndex(index);
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
// The course is the content layer: loadCourse() over content/<lang> (or opts.content, an already loaded Course), read
// by readCourseFromContent. opts.corrections replaces the committed course-map corrections and opts.dictionaryForms
// the dictionary's folded spellings (src/data/dictionary), for tests. opts.languageModule: the language module's file
// (language.mjs), for a language kept outside scripts/graph such as a test fixture.
export async function runCheck({ repoRoot, lang, native, content, corrections, dictionaryForms, languageModule }) {
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), lang, { native, languageModule });
  if (corrections) {
    graph.corrections = corrections;
    graph.courseMapProblems = [];
  }
  const reader = languageOf(graph);
  const index = reader.buildFormIndex(graph);
  const loaded = content ?? loadCourse({ root: join(repoRoot, 'content', lang), graphDir: join(repoRoot, 'curriculum-graph', 'languages', lang), languageModule });
  const course = readCourseFromContent(loaded, { isWord: reader.targetWordTest(graph, index) });
  // What each module teaches and tests comes from its own file; the course map adds the corrections.
  graph.courseMap = courseMapFromContent(course, graph.corrections, { graph, index });
  const referenceModules = referenceModulesFromContent(loaded);
  const reference = referenceNodes(index, referenceModules.flatMap((m) => m.vocab));
  // Only the shelf pages the outline lists in opens_words open their words; the others are read for the report only.
  const openKeys = new Set(loaded.shelf.opens_words ?? []);
  const open = referenceOpenNodes(index, referenceModules.filter((m) => openKeys.has(m.moduleKey)).flatMap((m) => m.vocab));
  const timeline = buildTimeline(graph, course, { reference: open, openFrom: graph.settings?.reference?.openFrom ?? null });
  // referenceOpenTitles: the titles of the Reference pages that open, for the fix list.
  const referenceOpenTitles = referenceModules.filter((m) => openKeys.has(m.moduleKey)).map((m) => m.title);
  const forms = dictionaryForms ?? await reader.dictionaryForms();
  const ctx = { graph, course, index, timeline, reference, referenceOpen: open, referenceOpenTitles, content: loaded, dictionaryForms: forms };
  // settings.reference.modules and the outline's shelf.opens_words name the same pages; the checker opens the shelf's.
  const listed = [...(graph.settings?.reference?.modules ?? [])].sort();
  const shelf = [...openKeys].sort();
  const sameShelf = !graph.settings?.reference || (listed.length === shelf.length && listed.every((k, i) => k === shelf[i]));
  const issues = [
    ...(sameShelf ? [] : [issue({
      rule: 'reference-modules-differ', nodeId: 'settings:reference.modules',
      message: `settings.reference.modules (${listed.join(', ')}) differs from the outline's shelf.opens_words (${shelf.join(', ')}); the checker opens the shelf's pages`,
    })]),
    ...(graph.courseMapProblems ?? []).map((p) => issue({ rule: 'course-map-field', severity: 'error', moduleKey: p.moduleKey, message: p.message })),
    ...validateGraph(graph, { course, repoRoot, referenceModules: referenceModules.map((m) => m.moduleKey) }),
    ...timeline.issues,
    ...RULES.flatMap((rule) => rule(ctx)),
  ];
  const stats = { native: graph.native, cognatesAllowed: cognatesAllowed(ctx), ...reportStats(levelReport(ctx), functionReport(ctx)) };
  return { ctx, issues, stats };
}
