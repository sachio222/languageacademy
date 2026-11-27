// Shared loading for the French data builders in this folder: the graph, the form index, the course as the
// checker reads it, and the raw module objects. analyze() reads a text exactly the way the checker does.
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadGraph } from '../../load.mjs';
import { readCourse } from '../../course.mjs';
import { frenchWordTest } from '../text.mjs';
import { buildFormIndex, lookupToken, lookupTokenStrict } from '../forms.mjs';
import { tokenize, restoreElisions } from '../tokenize.mjs';
import { matchPattern } from '../detect.mjs';

export const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
export const FR_DIR = join(REPO, 'curriculum-graph/languages/fr');

export async function load() {
  const graph = loadGraph(join(REPO, 'curriculum-graph'), 'fr');
  const index = buildFormIndex(graph);
  const course = await readCourse(REPO, { courseMap: graph.courseMap, isWord: frenchWordTest(graph, index) });
  const { unitConfigs } = await import(pathToFileURL(join(REPO, 'src/lessons/unitConfigLoader.js')).href);
  const raw = new Map();
  for (const u of unitConfigs) for (const m of u.modules) if (!raw.has(m.moduleKey)) raw.set(m.moduleKey, m);
  const isWord = (f) => index.has(f) || graph.names.has(f);
  const analyze = (text, strict = true) => {
    const tokens = tokenize(strict ? text : restoreElisions(text), { isWord }); // as the checker reads it
    const readings = tokens.map((t) => (strict ? lookupTokenStrict(index, t) : lookupToken(index, t)));
    return { tokens, readings };
  };
  const detects = (text, c, strict = true) => {
    if (!c.detect) return false;
    const { tokens, readings } = analyze(text, strict);
    return matchPattern(tokens, readings, c.detect, graph.names);
  };
  return { graph, index, course, raw, analyze, detects, isWord };
}
