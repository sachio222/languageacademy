// loadCourse (Node): reads course.json and modules/*.json under a content root, then assembleCourse.
// The only reader of module files; the checker, the bundle builder and the tests all come through here.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleCourse } from './assemble.mjs';
import { problem, ContentError } from './problems.mjs';
import { defaultCheckAnswer } from './passable.mjs';

export const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const CONTENT_ROOT = join(REPO_ROOT, 'content', 'fr');

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

export const GRAPH_LANG_DIR = join(REPO_ROOT, 'curriculum-graph', 'languages', 'fr');

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

// graphDir: the graph language folder whose ids teaches and tests are checked against; null checks only their shape.
export function loadCourse({ root = CONTENT_ROOT, checkAnswer = defaultCheckAnswer, graphDir = GRAPH_LANG_DIR } = {}) {
  const { outlineFile, outlineText, files } = readContent(root);
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
  return assembleCourse(outline, files, { outlineFile, checkAnswer, graphIds: graphDir === null ? null : graphIds(graphDir) });
}
