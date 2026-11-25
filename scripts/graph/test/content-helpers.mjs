// The mini content course (scripts/content/test/fixtures/mini), assembled in memory so a test can change it, and the
// checker run over it with the real French graph.
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleCourse } from '../../content/assemble.mjs';
import { graphIds } from '../../content/load.mjs';
import { miniOutline, miniFiles } from '../../content/test/mini-fixture.mjs';
import { runCheck } from '../check.mjs';

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

// edit(modules, outline): change the parsed module files (Map<module_key, module>) and the outline in place.
export function miniCourse(edit = () => {}) {
  const outline = miniOutline();
  const modules = new Map(miniFiles().map((f) => [f.file.replace(/^.*\//, '').replace(/\.json$/, ''), JSON.parse(f.text)]));
  edit(modules, outline);
  const files = [...modules].map(([key, json]) => ({ file: `mini/modules/${key}.json`, json }));
  return assembleCourse(outline, files, { outlineFile: 'mini/course.json', graphIds: graphIds() });
}

// opts.corrections: the course-map corrections to use instead of the committed file ({} by default).
// opts.dictionaryForms: the folded dictionary spellings (an empty Set by default, so no word has a dictionary entry).
export function checkMini(course, opts = {}) {
  return runCheck({
    repoRoot, lang: 'fr', content: course,
    corrections: opts.corrections ?? {},
    dictionaryForms: opts.dictionaryForms ?? new Set(),
  });
}

export const ofRule = (issues, rule) => issues.filter((i) => i.rule === rule);
