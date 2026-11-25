// Task 9: curriculum-graph/languages/fr/course-map.json, split in two (spec 5.2; graph design note of 2026-11-24).
// What a module teaches and tests moves into its module file; the course map keeps only the checker's corrections.
// Pure: takes the parsed course map, the modules and live-ids.json, and returns data and report lines.
//
// Each course-map field goes to one place:
//   teachesConstructions        lesson or guide `teaches.constructions`
//   teachesWordsManual          lesson or guide `teaches.words`: graph ids the vocabulary table does not show the checker
//   teachesWords                nowhere: the checker extracts it from the module's own vocabulary table (spec 5.2)
//   tests                       practice set or unit exam `tests.constructions` (every one declares it, empty or not)
//   preTeach                    reading `vocabulary` rows for words in its passage; any other word is a report line
//   screen                      nowhere, with a report line: a guide's screen comes from its kind
//   excludeWords, contentNotes  corrections, under the module key, as they are
//   overrides, itemKinds        corrections, under the module key, each keyed by ids instead of live positions
//
// A correction key names what the correction is about by ids, in the shape of a text key (spec 5.3):
//   <module_key>#<item_id>                         an item
//   <module_key>#<item_id>/hint                    text inside an item (hint, mistakes/<n>/feedback)
//   <module_key>#concepts/<concept_id>/<field>     a concept card's term, definition or example
//   <module_key>#vocabulary/<word_id>/note         a vocabulary card's note
//   <module_key>#parts/<part_id>/<path>            a guide part's heading, text/0, or blocks/<b>/lines/<j>/0
//   <module_key>#<field>                           a module field (title, description)
// A live position is found through content/fr/legacy/live-ids.json (item `<module_key>.<N>` for the Nth live
// exercise, concept card by index). A place the live app has no id for (a practice set's sentences[], a vocabulary
// card, a guide section) is found through the migration record (legacy/migration-sources.json), which names what
// each source place was converted into. A correction about text no module file holds (an exam's concept cards) needs
// no key (text_dropped); any other correction with no id is a report line (no_item_id, no_target). Neither is kept.
import { normText } from './items.mjs';
import { tokenize } from '../../graph/fr/tokenize.mjs';

export const TEACHING_FIELDS = ['teachesConstructions', 'teachesWords', 'teachesWordsManual', 'tests', 'preTeach'];
const MODULE_CORRECTIONS = ['contentNotes', 'excludeWords'];
const KEYED_CORRECTIONS = ['itemKinds', 'overrides'];
const KNOWN_FIELDS = new Set([...TEACHING_FIELDS, ...MODULE_CORRECTIONS, ...KEYED_CORRECTIONS, 'screen']);
const TEACHING_KINDS = ['lesson', 'guide'];
const TEST_KINDS = ['practice', 'unit_exam'];
// Today's arrays of exercises, each a live exercise in order (lessonData.js numbers them <module_key>.<index + 1>).
const EXERCISE_LISTS = ['exerciseConfig.items', 'exercises', 'sentences'];
const MODULE_FIELDS = ['title', 'description'];

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const line = (module_key, path, detail) => ({ module_key, path, kind: 'course_map', detail });

// True when the course map declares no teaching and names no screen: it is the corrections file already, so there is
// nothing to split (after Task 10 renames course-map.corrections.json over course-map.json). teachesWords does not
// count: it is derived from the vocabulary tables, never written to a module, and `pnpm graph:extract` and
// scripts/graph/fr/build/course-map.mjs write it into every course map, split or not.
const SPLIT_FIELDS = [...TEACHING_FIELDS.filter((f) => f !== 'teachesWords'), 'screen'];
export function isSplit(courseMap) {
  return Object.values(courseMap ?? {}).every((e) => !isObj(e) || !SPLIT_FIELDS.some((f) => f in e));
}

/**
 * Before a split: refuses to split again when module files already declare teaches or tests and the course map has
 * neither teachesConstructions nor tests of its own. Splitting such a map would treat its silence as "teaches nothing"
 * and empty every declaration. Returns the problem's message, or null when the split may go ahead.
 * @param {object} courseMap  the parsed course map
 * @param {Iterable<object | null>} written  the module files as they are on disk
 * @returns {string | null}
 */
export function resplitProblem(courseMap, written) {
  const mapDeclares = Object.values(courseMap ?? {}).some((e) => isObj(e) && ('teachesConstructions' in e || 'tests' in e));
  if (mapDeclares) return null;
  const declaring = [...written].filter((m) => isObj(m) && (m.teaches !== undefined || m.tests !== undefined)).map((m) => m.module_key);
  if (!declaring.length) return null;
  const fields = [...new Set(Object.values(courseMap ?? {}).flatMap((e) => (isObj(e) ? Object.keys(e).filter((f) => SPLIT_FIELDS.includes(f)) : [])))];
  return (
    `the course map lists ${fields.join(', ')} but no teachesConstructions or tests, while ${declaring.length} module files already declare ` +
    `teaches or tests (${declaring.slice(0, 3).join(', ')}${declaring.length > 3 ? ', …' : ''}). Splitting it again would empty those declarations. ` +
    'Teaching now lives in the module files: remove these fields from the course map, or declare the teaching there.'
  );
}

function checkFields(key, entry) {
  if (!isObj(entry)) throw new Error(`course-map.json ${key}: an entry is an object`);
  const unknown = Object.keys(entry).filter((f) => !KNOWN_FIELDS.has(f));
  if (unknown.length) throw new Error(`course-map.json ${key}: fields the split does not know: ${unknown.join(', ')}`);
}

/**
 * What each module declares, from the course map and each module's kind.
 * @param {object} courseMap  the parsed course map
 * @param {Map<string, string>} kinds  module_key -> kind, in course order
 * @returns {{ declarations: Object<string, { teaches?: object, tests?: object, pre_teach?: string[] }>, report: object[] }}
 */
export function declarationsOf(courseMap, kinds) {
  const declarations = {};
  const report = [];
  let derived = 0;
  for (const [key, kind] of kinds) {
    const entry = courseMap[key] ?? {};
    checkFields(key, entry);
    const d = {};
    const misplaced = (f, where) => report.push(line(key, f, `misplaced: ${f} ${JSON.stringify(entry[f])} on a ${kind}, which ${where}; not written`));
    if (Array.isArray(entry.teachesWords) && entry.teachesWords.length) derived++;
    if (TEACHING_KINDS.includes(kind)) {
      if (entry.teachesConstructions !== undefined || entry.teachesWordsManual !== undefined)
        d.teaches = { constructions: [...(entry.teachesConstructions ?? [])], ...(entry.teachesWordsManual?.length ? { words: [...entry.teachesWordsManual] } : {}) };
      if (entry.tests !== undefined) misplaced('tests', 'teaches; tests belong to practice sets and exams');
      if (entry.preTeach !== undefined) misplaced('preTeach', 'is no reading');
    } else {
      for (const f of ['teachesConstructions', 'teachesWordsManual'])
        if (entry[f] !== undefined) misplaced(f, kind === 'reading' ? 'teaches its own vocabulary table' : 'teaches nothing');
      if (TEST_KINDS.includes(kind)) d.tests = { constructions: [...(entry.tests ?? [])] };
      else if (entry.tests !== undefined) misplaced('tests', 'is no practice set or exam');
      if (kind === 'reading' && entry.preTeach?.length) d.pre_teach = [...entry.preTeach];
      else if (kind !== 'reading' && entry.preTeach !== undefined) misplaced('preTeach', 'is no reading');
    }
    if (typeof entry.screen === 'string')
      report.push(line(key, 'screen', `screen_dropped: ${entry.screen}; a ${kind}'s screen comes from its kind`));
    if (Object.keys(d).length) declarations[key] = d;
  }
  for (const key of Object.keys(courseMap)) if (!kinds.has(key)) report.push(line(key, key, 'module_unknown: no module has this key; the entry is not split'));
  if (derived)
    report.push(line(null, 'teachesWords', `teaches_words_derived: ${derived} modules list extracted words, which are their vocabulary tables, so they are not written`));
  return { declarations, report };
}

/**
 * Reading `vocabulary` rows for a reading's preTeach ids. A word already in the table needs no row
 * (already_in_table); a word missing from the passage is a line (pre_teach_not_in_passage).
 * @param {string} key  the reading's module_key
 * @param {string[]} ids  the course map's preTeach graph ids
 * @param {{ passage?: Array<{ fr?: string }>, vocabulary?: Array<{ fr: string }> }} mod  the reading
 * @param {{ wordOf: (id: string) => ({ fr: string, gloss: string | null } | null) }} opts
 * @returns {{ rows: Array<{ fr: string, gloss: string, node_id: string }>, report: object[] }}
 */
export function preTeachRows(key, ids, mod, { wordOf }) {
  const rows = [];
  const report = [];
  const inTable = new Set((mod.vocabulary ?? []).map((w) => normText(w.fr)));
  const blocks = (mod.passage ?? []).filter((b) => typeof b.fr === 'string').map((b) => tokenize(b.fr).map((t) => t.fold));
  const inPassage = (fr) => {
    const want = tokenize(fr).map((t) => t.fold);
    return want.length > 0 && blocks.some((toks) => toks.some((_, i) => want.every((w, j) => toks[i + j] === w)));
  };
  for (const id of ids) {
    const w = wordOf(id);
    const at = `preTeach ${id}`;
    if (!w) report.push(line(key, at, `pre_teach_unknown: ${id} is no headword or form in the graph`));
    else if (inTable.has(normText(w.fr))) report.push(line(key, at, `already_in_table: "${w.fr}" (${id}) is in the reading's table, which it teaches`));
    else if (!inPassage(w.fr)) report.push(line(key, at, `pre_teach_not_in_passage: "${w.fr}" (${id}) is not in the passage, so it gets no row`));
    else if (!w.gloss) report.push(line(key, at, `pre_teach_no_gloss: "${w.fr}" (${id}) has no English in the graph or the dictionary, so it gets no row`));
    else {
      rows.push({ fr: w.fr, gloss: w.gloss, node_id: id });
      inTable.add(normText(w.fr));
      report.push(line(key, at, `pre_teach_row: "${w.fr}" ("${w.gloss}", ${id}) joins the reading's table`));
    }
  }
  return { rows, report };
}

// A key part in the id shape: an item id with an optional path under it, or a concepts/, vocabulary/ or parts/ path.
// Every old place has a bracketed index or a dotted field path (readingPassage.title), which no id shape has.
const isIdKey = (path) =>
  !path.includes('[') && (/^(concepts|vocabulary|parts)\/[^/\s]+\/[^\s]+$/.test(path) || /^[a-z0-9][a-z0-9-]*(\/[a-z0-9-]+)*$/.test(path));

// The new key for one correction, or { reason } when it has none.
function rekey(key, ref, mod, { liveIds, sources, records }) {
  if (!ref.startsWith(`${key}#`)) return { reason: `no_item_id: ${ref} names another module` };
  const path = ref.slice(key.length + 1);
  // Already keyed by ids (a course map split before), in one of the shapes above: the key stays as it is. title and
  // description read the same in both shapes.
  if (isIdKey(path)) return { ref, kept: true };
  const live = liveIds[key] ?? { items: {}, concepts: {} };
  const ex = new RegExp(`^(${EXERCISE_LISTS.map((l) => l.replace('.', '\\.')).join('|')})\\[(\\d+)\\](.*)$`).exec(path);
  if (ex) {
    const [, list, n, rest] = ex;
    const old = sources?.get(key);
    let id = live.items?.[`${key}.${Number(n) + 1}`];
    if (id) {
      // The live numbering follows the source array only when the builder shows that array: a module with
      // exerciseConfig items never shows its exercises[], and the migration record names the source of each item.
      if (list === 'exercises' && Array.isArray(old?.exerciseConfig?.items))
        return { reason: `no_item_id: today's builder shows exerciseConfig, not exercises[], so ${list}[${n}] has no live exercise` };
      const madeFrom = records?.[key]?.items?.[id]?.ref;
      if (madeFrom !== undefined && madeFrom !== `${list}[${n}]`)
        return { reason: `no_target: live exercise ${key}.${Number(n) + 1} is ${id}, made from ${madeFrom}, not ${list}[${n}]` };
    } else {
      // No live exercise (a practice set's sentences[]): the migration record names the item made from that place.
      const made = Object.entries(records?.[key]?.items ?? {}).filter(([, b]) => b?.ref === `${list}[${n}]`);
      if (made.length !== 1) return { reason: `no_item_id: neither live-ids.json nor the migration record names an item for ${list}[${n}]` };
      id = made[0][0];
    }
    const item = (mod?.items ?? []).find((it) => it.id === id);
    if (!item) return { reason: `no_target: ${id}, made from ${list}[${n}], is not in ${key}` };
    if (rest === '') return { ref: `${key}#${id}` };
    if (rest === '.hint') return item.hint === undefined ? { reason: `no_target: ${id} has no hint` } : { ref: `${key}#${id}/hint` };
    const wrong = /^\.(wrongAnswers|customWrongAnswers)\[(\d+)\]\.feedback$/.exec(rest);
    if (wrong) {
      const w = sourceExercise(old, list, Number(n))?.[wrong[1]]?.[Number(wrong[2])];
      const answer = typeof w === 'string' ? w : w?.answer;
      const k = (item.mistakes ?? []).findIndex((m) => answer !== undefined && normText(m.answer) === normText(answer));
      if (k === -1) return { reason: `no_target: ${id} has no mistake for ${list}[${n}]${rest.replace(/\.feedback$/, '')}` };
      return { ref: `${key}#${id}/mistakes/${k}/feedback` };
    }
    return { reason: `no_target: ${rest.slice(1)} of ${id} has no field in the module file` };
  }
  const concept = /^concepts\[(\d+)\]\.(term|definition|example)$/.exec(path);
  if (concept) {
    // Practice sets, unit exams, readings and guides hold no concept cards: the text this correction was about is
    // not in the module file, so no checker reads it and the correction needs no key.
    if (mod && !['lesson', 'reference'].includes(mod.kind))
      return { reason: `text_dropped: a ${mod.kind} holds no concept cards, so concepts[${concept[1]}].${concept[2]} is in no module file`, dropped: true };
    const id = live.concepts?.[concept[1]];
    if (!id) return { reason: `no_item_id: live-ids.json has no concept for concepts[${concept[1]}]` };
    const c = (mod?.concepts ?? []).find((x) => x.id === id);
    if (!c || c[concept[2]] === undefined) return { reason: `no_target: concept ${id} has no ${concept[2]}` };
    return { ref: `${key}#concepts/${id}/${concept[2]}` };
  }
  // A vocabulary card's note: the migration record names the card made from that source card.
  const vocab = /^vocabularyReference\[(\d+)\]\.(note)$/.exec(path);
  if (vocab) {
    const made = (records?.[key]?.vocabulary ?? []).filter((v) => v?.at === Number(vocab[1]) && v.id);
    if (made.length !== 1) return { reason: `no_item_id: the migration record names no card for vocabularyReference[${vocab[1]}]` };
    const card = (mod?.vocabulary ?? []).find((w) => w.word_id === made[0].id);
    if (!card || card[vocab[2]] === undefined) return { reason: `no_target: card ${made[0].id} has no ${vocab[2]}` };
    return { ref: `${key}#vocabulary/${card.word_id}/${vocab[2]}` };
  }
  // A section of a guide written in today's guide.sections[] (guide.mjs guideFromSections): the record names the part;
  // its heading is the part's heading, its rule the part's text, an example a cell of a lines block.
  const section = /^guide\.sections\[(\d+)\]\.(heading|rule|examples\[(\d+)\]\.french)$/.exec(path);
  if (section) {
    const made = (records?.[key]?.lists?.parts ?? []).filter((p) => p?.at === Number(section[1]));
    const part = made.length === 1 ? (mod?.parts ?? []).find((x) => x.id === made[0].id) : null;
    if (!part) return { reason: `no_item_id: the migration record names no part for guide.sections[${section[1]}]` };
    const at = `${key}#parts/${part.id}`;
    if (section[2] === 'heading') return { ref: `${at}/heading` };
    if (section[2] === 'rule') return part.text?.length ? { ref: `${at}/text/0` } : { reason: `no_target: part ${part.id} has no text` };
    const french = sources?.get(key)?.guide?.sections?.[Number(section[1])]?.examples?.[Number(section[3])]?.french;
    for (const [b, block] of (part.blocks ?? []).entries())
      for (const [j, row] of (block.lines ?? []).entries())
        if (french !== undefined && normText(row[0]) === normText(french)) return { ref: `${at}/blocks/${b}/lines/${j}/0` };
    return { reason: `no_target: part ${part.id} has no line for guide.sections[${section[1]}].examples[${section[3]}]` };
  }
  if (MODULE_FIELDS.includes(path)) return mod?.[path] === undefined ? { reason: `no_target: ${key} has no ${path}` } : { ref: `${key}#${path}` };
  return { reason: `no_item_id: live-ids.json gives no id for ${path}` };
}

function sourceExercise(old, list, n) {
  if (!old) return null;
  if (list === 'exerciseConfig.items') return old.exerciseConfig?.items?.[n] ?? null;
  return old[list]?.[n] ?? null;
}

/**
 * The corrections: per module, excludeWords and contentNotes as they are, overrides and itemKinds keyed by ids.
 * @param {object} courseMap  the parsed course map
 * @param {Map<string, object>} modules  module_key -> converted module, in course order
 * @param {{ liveIds?: object, sources?: Map<string, object> | null, records?: object | null }} [opts]
 *   liveIds: live-ids.json. sources: today's modules (for mistakes and guide examples). records:
 *   legacy/migration-sources.json, which names what each source place became (items, cards, guide parts).
 * @returns {{ corrections: object, report: object[], counts: { rekeyed: number, kept: number, dropped: number, textDropped: number } }}
 */
export function correctionsOf(courseMap, modules, { liveIds = {}, sources = null, records = null } = {}) {
  const corrections = {};
  const report = [];
  const counts = { rekeyed: 0, kept: 0, dropped: 0, textDropped: 0 };
  // A course-map key that names no module is reported by declarationsOf (module_unknown); it has no corrections.
  for (const key of modules.keys()) {
    const entry = courseMap[key];
    if (entry === undefined) continue;
    checkFields(key, entry);
    const out = {};
    for (const f of MODULE_CORRECTIONS) if (entry[f] !== undefined) out[f] = structuredClone(entry[f]);
    for (const f of KEYED_CORRECTIONS) {
      const keyed = {};
      for (const [ref, value] of Object.entries(entry[f] ?? {})) {
        const r = rekey(key, ref, modules.get(key), { liveIds, sources, records });
        if (r.reason) {
          if (r.dropped) counts.textDropped++;
          else counts.dropped++;
          report.push(line(key, ref, `${r.reason}; the ${f === 'overrides' ? 'override' : 'item kind'} ${JSON.stringify(value)} is kept nowhere`));
          continue;
        }
        const moved = r.kept ? `kept: ${f} already keyed by id` : `rekeyed: ${f} now under ${r.ref}`;
        if (keyed[r.ref] === undefined) {
          keyed[r.ref] = structuredClone(value);
        } else if (f === 'overrides') {
          // Two old places that are one place now (an item and its copy): one override with every field of both,
          // and the union of their ignore lists.
          keyed[r.ref] = { ...keyed[r.ref], ...structuredClone(value), ignore: [...new Set([...(keyed[r.ref].ignore ?? []), ...(value.ignore ?? [])])] };
          if (r.kept) counts.kept++;
          else counts.rekeyed++;
          report.push(line(key, ref, `${moved}, merged with the override already there`));
          continue;
        } else if (keyed[r.ref] !== value) {
          counts.dropped++;
          report.push(line(key, ref, `item_kind_clash: ${r.ref} is already ${JSON.stringify(keyed[r.ref])}; ${JSON.stringify(value)} is kept nowhere`));
          continue;
        }
        if (r.kept) counts.kept++;
        else counts.rekeyed++;
        if (!r.kept) report.push(line(key, ref, moved));
      }
      if (Object.keys(keyed).length) out[f] = keyed;
    }
    if (Object.keys(out).length) corrections[key] = out;
  }
  return { corrections, report, counts };
}

/**
 * The whole split. `course` is loadCourse() output or a Map<module_key, module>.
 * opts: { liveIds, sources?, records?, wordOf?(id) -> { fr, gloss } | null }. A reading's preTeach words become `vocabulary`
 * rows judged against the module as given.
 * @param {object} courseMap  the parsed course map
 * @param {Map<string, object> | { modules: Map<string, object> }} course
 * @param {{ liveIds?: object, sources?: Map<string, object>, records?: object, wordOf?: Function }} [opts]
 * @returns {{ declarations: Object<string, { teaches?: object, tests?: object, vocabulary?: object[] }>, corrections: object, report: object[] }}
 */
export function splitCourseMap(courseMap, course, opts = {}) {
  const modules = course instanceof Map ? course : course.modules;
  const kinds = new Map([...modules].map(([k, m]) => [k, m.kind]));
  const d = declarationsOf(courseMap, kinds);
  const report = [...d.report];
  for (const [key, decl] of Object.entries(d.declarations)) {
    if (!decl.pre_teach) continue;
    const { rows, report: lines } = preTeachRows(key, decl.pre_teach, modules.get(key), { wordOf: opts.wordOf ?? (() => null) });
    report.push(...lines);
    delete decl.pre_teach;
    if (rows.length) decl.vocabulary = rows;
    if (!Object.keys(decl).length) delete d.declarations[key];
  }
  const c = correctionsOf(courseMap, modules, opts);
  report.push(...c.report);
  return { declarations: d.declarations, corrections: c.corrections, report };
}
