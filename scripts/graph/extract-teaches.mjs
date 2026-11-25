import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadGraph } from './load.mjs';
import { tokenize } from './fr/tokenize.mjs';
import { buildFormIndex, lookupToken, lookupTokenStrict } from './fr/forms.mjs';

const RANK = { irregular: 0, generated: 1, lemma: 2 };
// A reading teaches the words of its own vocabulary table, at its own position (Jake's ruling, spec 5.7).
const TEACHING_KINDS = new Set(['lesson', 'help', 'reading']);

// The readings extraction credits for each token of one vocabulary entry: exact accents first, folded match
// only as a fallback, and of those only the best kind (irregular form, then generated form, then lemma).
// Returns [{ token, readings }]; readings is [] for a token the graph does not know.
// exclude: IDs the module does not teach (its excludeWords). A reading of an excluded headword is dropped before the
// best kind is chosen, so "la cuisine" with fr:lex:cuisiner excluded credits the noun cuisine, not a form of
// cuisiner. An excluded form ID is only left out of the result (extractTeaches), so its headword still counts.
export function entryReadings(text, index, isWord, exclude = null) {
  return tokenize(text, { isWord }).map((token) => {
    const keep = (rs) => (exclude ? rs.filter((r) => !exclude.has(r.headwordId)) : rs);
    let readings = keep(lookupTokenStrict(index, token));
    if (!readings.length) readings = keep(lookupToken(index, token));
    if (!readings.length) return { token, readings };
    const best = Math.min(...readings.map((r) => RANK[r.via]));
    return { token, readings: readings.filter((x) => RANK[x.via] === best) };
  });
}

// Words each lesson, help module or reading teaches, read from its vocabulary table.
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
    const exclude = new Set(courseMap[mod.moduleKey]?.excludeWords ?? []);
    for (const text of mod.vocab ?? []) {
      for (const { token, readings } of entryReadings(text, index, isWord, exclude)) {
        if (!readings.length) {
          // a token whose only readings are excluded is known, so it is not reported
          if (!graph.names?.has(token.fold) && !lookupToken(index, token).length) missing.add(token.surface);
          continue;
        }
        for (const r of readings) {
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

// Prints the words each module teaches, as the checker derives them, and the vocabulary tokens the graph does not
// know. It writes nothing: course-map.json holds checker corrections only, and the checker derives these words on
// every run (content-course.mjs courseMapFromContent).
async function main() {
  const repoRoot = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '../..'));
  const { loadCourse } = await import('../content/load.mjs');
  const { readCourseFromContent } = await import('./content-course.mjs');
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
  const course = readCourseFromContent(loadCourse({ root: join(repoRoot, 'content', 'fr') }));
  const { courseMap, unknown } = extractTeaches(graph, course, buildFormIndex(graph));
  for (const m of course) {
    const words = courseMap[m.moduleKey]?.teachesWords;
    if (words?.length) console.log(`${m.moduleKey}\t${[...words].sort().join(' ')}`);
  }
  for (const u of unknown) console.log(`unknown\t${u.moduleKey}\t${u.surface}`);
  console.log(`extract-teaches: ${course.filter((m) => courseMap[m.moduleKey]?.teachesWords?.length).length} modules teach words, ${unknown.length} unknown vocab tokens`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
