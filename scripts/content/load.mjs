// loadCourse (Node): reads course.json and modules/*.json under a content root, then assembleCourse.
// The only reader of module files; the checker, the bundle builder and the tests all come through here.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleCourse, withoutPlanned } from './assemble.mjs';
import { problem, ContentError } from './problems.mjs';
import { defaultLanguage, language } from '../graph/language.mjs';
import { expandConjugation, conjugationGraph, personGlosses } from './conjugation.mjs';

export const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url));
// A language's course folder, content/<code>; the default course is the one core/settings.json defaultLanguage names.
export const contentRoot = (code = defaultLanguage()) => join(REPO_ROOT, 'content', code);
export const CONTENT_ROOT = contentRoot();

// Problem file names are relative to the repository root, with forward slashes.
const rel = (p) => relative(REPO_ROOT, p).split(sep).join('/');

export function readContent(root = CONTENT_ROOT) {
  const outlinePath = join(root, 'course.json');
  const modulesDir = join(root, 'modules');
  const files = existsSync(modulesDir)
    ? readdirSync(modulesDir)
        .filter((n) => n.endsWith('.json'))
        .sort()
        .map((n) => ({ file: rel(join(modulesDir, n)), text: readFileSync(join(modulesDir, n), 'utf8') }))
    : [];
  return { outlineFile: rel(outlinePath), outlineText: existsSync(outlinePath) ? readFileSync(outlinePath, 'utf8') : null, files };
}

export const GRAPH_LANG_DIR = join(REPO_ROOT, 'curriculum-graph', 'languages', defaultLanguage());

// The graph ids teaches and tests may name: constructions (constructions.json, and the regular patterns in
// paradigms.json, which share the fr:cx: ids and which the course map lists among taught constructions, such as
// fr:cx:noun.plural) and words (headwords.json and forms.json). Read once per folder.
const graphIdCache = new Map();
export function graphIds(dir = GRAPH_LANG_DIR) {
  if (!graphIdCache.has(dir)) {
    const ids = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8')).map((n) => n.id);
    graphIdCache.set(dir, {
      constructions: new Set([...ids('constructions.json'), ...ids('paradigms.json')]),
      words: new Set([...ids('headwords.json'), ...ids('forms.json')]),
    });
  }
  return graphIdCache.get(dir);
}

/**
 * assembleCourse's conjugationOf for one course: a lesson's conjugation built from the course language's graph
 * (language.conjugation) and the pair's English for each person (scripts/content/conjugation.mjs).
 */
export function conjugationBuilder({ code = defaultLanguage(), native = 'en', graphDir = join(REPO_ROOT, 'curriculum-graph', 'languages', code), languageModule } = {}) {
  const lang = language(code, languageModule);
  return (spec, earlier) =>
    expandConjugation(spec, {
      generate: lang.conjugation ? (s) => lang.conjugation(conjugationGraph(graphDir), s) : null,
      glosses: personGlosses(join(graphDir, '..', '..'), native, code),
      earlier,
    });
}

// graphDir: the graph language folder whose ids teaches and tests are checked against; null checks only their shape.
// Left out, it is curriculum-graph/languages/<course.json language>. checkAnswer: the pass decision for one typed
// answer; left out, the course language's (language.mjs checkAnswer). languageModule: the file of that language's
// module, for a test language kept outside scripts/graph.
// planned: false loads the written course only (assemble.mjs withoutPlanned), for checks of what the stubs hide.
// replace: module file (repo-relative, as problems name it) -> text to read in its place, so a checker can stand a
// module that does not load in for a planned stub and still read the rest of the course.
export function loadCourse({ root = CONTENT_ROOT, checkAnswer, graphDir, planned = true, languageModule, replace = null } = {}) {
  const read = readContent(root);
  const { outlineFile, outlineText } = read;
  const files = replace ? read.files.map((f) => (replace.has(f.file) ? { ...f, text: replace.get(f.file) } : f)) : read.files;
  if (outlineText === null) throw new ContentError([problem(outlineFile, '', 'file_missing', 'course.json does not exist')]);
  let outline;
  try {
    outline = JSON.parse(outlineText);
  } catch (e) {
    // Without an outline nothing can be placed; still report every unreadable file in one run.
    const ps = [problem(outlineFile, '', 'json_invalid', `not valid JSON: ${e.message}`)];
    for (const f of files) {
      try {
        JSON.parse(f.text);
      } catch (e2) {
        ps.push(problem(f.file, '', 'json_invalid', `not valid JSON: ${e2.message}`));
      }
    }
    throw new ContentError(ps);
  }
  const code = typeof outline?.language === 'string' && outline.language ? outline.language : defaultLanguage();
  const lang = language(code, languageModule);
  checkAnswer ??= lang.checkAnswer;
  if (graphDir === undefined) graphDir = join(REPO_ROOT, 'curriculum-graph', 'languages', code);
  const content = planned ? { outline, files } : withoutPlanned(outline, files);
  const native = typeof outline?.native === 'string' && outline.native ? outline.native : 'en';
  const conjugationOf = conjugationBuilder({ code, native, graphDir: graphDir ?? undefined, languageModule });
  return assembleCourse(content.outline, content.files, { outlineFile, checkAnswer, graphIds: graphDir === null ? null : graphIds(graphDir), conjugationOf, persons: lang.persons ?? null, isNativeText: lang.isNativeExample ?? null });
}
