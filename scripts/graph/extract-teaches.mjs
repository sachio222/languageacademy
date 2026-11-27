import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadGraph } from './load.mjs';
import { defaultLanguage, languageOf, languageOfIndex } from './language.mjs';

const RANK = { irregular: 0, generated: 1, lemma: 2 };
// A reading teaches the words of its own vocabulary table, at its own position (Jake's ruling, spec 5.7).
const TEACHING_KINDS = new Set(['lesson', 'help', 'reading']);

// The readings extraction credits for each token of one vocabulary entry: exact accents first, folded match
// only as a fallback, and of those only the best kind (irregular form, then generated form, then lemma).
// Returns [{ token, readings }]; readings is [] for a token the graph does not know.
// exclude: IDs the module does not teach (its excludeWords). A reading of an excluded headword is dropped before the
// best kind is chosen, so "la cuisine" with fr:lex:cuisiner excluded credits the noun cuisine, not a form of
// cuisiner. An excluded form ID is only left out of the result (extractTeaches), so its headword still counts.
// pos: the entry's part_of_speech when the card names one. Among a token's readings, those of that part of speech win
// when there are any, so the noun card "le marché" reads as marché, never as a form of marcher; the other tokens of
// the entry ("le") keep their readings.
// After an article or determiner, a token that can be a noun is read as the noun: "la neige" is the noun neige, never
// a form of neiger, whatever the rank of the form.
const DETERMINER_POS = new Set(['article', 'determiner']);

export function entryReadings(text, index, isWord, exclude = null, pos = null) {
  const { tokenize, lookupToken, lookupTokenStrict } = languageOfIndex(index);
  let afterDeterminer = false;
  return tokenize(text, { isWord }).map((token) => {
    const keep = (rs) => (exclude ? rs.filter((r) => !exclude.has(r.headwordId)) : rs);
    let readings = keep(lookupTokenStrict(index, token));
    if (!readings.length) readings = keep(lookupToken(index, token));
    const wasAfter = afterDeterminer;
    afterDeterminer = readings.some((r) => DETERMINER_POS.has(r.pos));
    if (!readings.length) return { token, readings };
    const want = pos ?? (wasAfter ? 'noun' : null);
    if (want && readings.some((r) => r.pos === want) && readings.some((r) => r.pos !== want)) readings = readings.filter((r) => r.pos === want);
    const best = Math.min(...readings.map((r) => RANK[r.via]));
    return { token, readings: readings.filter((x) => RANK[x.via] === best) };
  });
}

// Words each lesson, help module or reading teaches, read from its vocabulary table.
// excludeWords lists over-taught homograph IDs to drop from the result.
// Only teachesWords is rewritten; every other course-map field is kept.
// Headwords of several words that work as one word, which the tokenizer reads word by word (en fait, du coup, tandis
// que), as [id, folded words with spaces between]. A reflexive verb (se souvenir) is read whole already; a compound
// noun (pomme de terre) is taught and used through its head noun, as before; a phrase the graph also holds as a
// fixed-phrase pattern (chunk.en-fait) is taught and reused as that pattern, so it is not counted twice.
export function multiWordHeadwords(graph) {
  const chunks = new Set((graph.constructions ?? []).map((c) => c.id));
  return (graph.headwords ?? [])
    .filter((h) => / /.test(h.lemma) && !/^se /.test(h.lemma) && h.pos !== 'noun')
    .filter((h) => !chunks.has(h.id.replace(':lex:', ':cx:chunk.')))
    .map((h) => [h.id, languageOf(graph).fold(h.lemma).split(/\s+/).join(' ')]);
}
// fold: the course language's fold (languageOf(graph).fold).
export const wordsOf = (text, fold) => ` ${fold(text).replace(/[^\p{L}\p{N}'-]+/gu, ' ').trim()} `;

export function extractTeaches(graph, course, index) {
  const { lookupToken } = languageOfIndex(index);
  const isWord = (f) => index.has(f);
  const multi = multiWordHeadwords(graph);
  const courseMap = { ...(graph.courseMap ?? {}) };
  const unknown = [];
  for (const mod of course) {
    if (!TEACHING_KINDS.has(mod.kind)) continue;
    const ids = new Set();
    const missing = new Set();
    const exclude = new Set(courseMap[mod.moduleKey]?.excludeWords ?? []);
    (mod.vocab ?? []).forEach((text, i) => {
      for (const { token, readings } of entryReadings(text, index, isWord, exclude, mod.vocabPos?.[i] ?? null)) {
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
    });
    // A headword of several words is taught where an entry holds its words in order (the card "en fait").
    for (const text of mod.vocab ?? []) {
      const words = wordsOf(text);
      for (const [id, lemma] of multi) if (words.includes(` ${lemma} `) && !exclude.has(id)) ids.add(id);
    }
    // A lesson's conjugation table teaches the forms it shows (the recipe: "its forms need no cards"), never the
    // headwords or the pronouns around them, which are taught where their cards are.
    for (const text of mod.tableForms ?? []) {
      for (const { readings } of entryReadings(text, index, isWord, exclude)) {
        for (const r of readings) if (r.via !== 'lemma') ids.add(r.nodeId);
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
  // extract-teaches.mjs [repo root] [--lang <code>] (core/settings.json defaultLanguage when left out)
  const args = process.argv.slice(2);
  const at = args.indexOf('--lang');
  const lang = at >= 0 ? args.splice(at, 2)[1] : defaultLanguage();
  const repoRoot = resolve(args[0] ?? join(dirname(fileURLToPath(import.meta.url)), '../..'));
  const { loadCourse } = await import('../content/load.mjs');
  const { readCourseFromContent } = await import('./content-course.mjs');
  const graph = loadGraph(join(repoRoot, 'curriculum-graph'), lang);
  const course = readCourseFromContent(loadCourse({ root: join(repoRoot, 'content', lang) }));
  const { courseMap, unknown } = extractTeaches(graph, course, languageOf(graph).buildFormIndex(graph));
  for (const m of course) {
    const words = courseMap[m.moduleKey]?.teachesWords;
    if (words?.length) console.log(`${m.moduleKey}\t${[...words].sort().join(' ')}`);
  }
  for (const u of unknown) console.log(`unknown\t${u.moduleKey}\t${u.surface}`);
  console.log(`extract-teaches: ${course.filter((m) => courseMap[m.moduleKey]?.teachesWords?.length).length} modules teach words, ${unknown.length} unknown vocab tokens`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
