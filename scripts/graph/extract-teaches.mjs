import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadGraph } from './load.mjs';
import { readCourse } from './course.mjs';
import { tokenize } from './fr/tokenize.mjs';
import { buildFormIndex, lookupToken, lookupTokenStrict } from './fr/forms.mjs';
import { writeSortedJson } from './write-json.mjs';

const RANK = { irregular: 0, generated: 1, lemma: 2 };
const TEACHING_KINDS = new Set(['lesson', 'help']);

// Words each lesson or help module teaches, read from its vocabulary table.
// excludeWords lists over-taught homograph IDs to drop from the result.
// Only teachesWords is rewritten; every other course-map field is kept.
export function extractTeaches(graph, course, index) {
  const isWord = (f) => index.has(f);
  const courseMap = { ...(graph.courseMap ?? {}) };
  const unknown = [];
  for (const mod of course) {
    if (!TEACHING_KINDS.has(mod.kind)) continue;
    const ids = new Set();
    const missing = new Set();
    for (const text of mod.vocab ?? []) {
      for (const token of tokenize(text, { isWord })) {
        // Vocab tables are authored French: exact accents first, folded match only as a fallback.
        let readings = lookupTokenStrict(index, token);
        if (!readings.length) readings = lookupToken(index, token);
        if (!readings.length) {
          if (!graph.names?.has(token.fold)) missing.add(token.surface);
          continue;
        }
        const best = Math.min(...readings.map((r) => RANK[r.via]));
        for (const r of readings.filter((x) => RANK[x.via] === best)) {
          ids.add(r.headwordId);
          if (r.via !== 'lemma') ids.add(r.nodeId);
        }
      }
    }
    for (const surface of missing) unknown.push({ moduleKey: mod.moduleKey, surface });
    for (const id of courseMap[mod.moduleKey]?.excludeWords ?? []) ids.delete(id);
    if (ids.size || courseMap[mod.moduleKey]) {
      courseMap[mod.moduleKey] = { ...courseMap[mod.moduleKey], teachesWords: [...ids] };
    }
  }
  return { courseMap, unknown };
}

async function main() {
  const repoRoot = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '../..'));
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
  const course = await readCourse(repoRoot);
  const { courseMap, unknown } = extractTeaches(graph, course, buildFormIndex(graph));
  writeSortedJson(join(repoRoot, 'curriculum-graph/languages/fr/course-map.json'), courseMap);
  for (const u of unknown) console.log(`${u.moduleKey}\t${u.surface}`);
  console.log(`extract-teaches: ${Object.keys(courseMap).length} modules, ${unknown.length} unknown vocab tokens`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
