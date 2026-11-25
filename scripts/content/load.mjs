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

export function loadCourse({ root = CONTENT_ROOT, checkAnswer = defaultCheckAnswer } = {}) {
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
  return assembleCourse(outline, files, { outlineFile, checkAnswer });
}
