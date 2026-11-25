// convertModule: one of today's lesson, practice or unit exam objects (src/lessons/modules/) as a module file
// (spec 5.2, 5.5, 5.8, 6). Pure apart from today's builder and checker, which it reads.
//
// Reruns (spec 8.2): a three-way merge. The caller passes the written file (`existing`) and the record of the last
// run (`record`: per part, the hash of its source and of what the converter wrote). A part the file holds as the
// converter last wrote it takes the new output, so converter fixes and source changes reach it; a part edited by
// hand stays, with a merge_conflict line when the new output differs too. `handFixes` (legacy/hand-fixes.json)
// is applied again when nothing is written (--force). With no record the written file wins wherever it has the part.
import '../vite-shim.mjs';
import { readModule } from '../../graph/course.mjs';
import { convertTyped, convertFillblank, convertSentence, normText } from './items.mjs';
import { markFrench, unmark } from './mark-french.mjs';
import { makeItemId, makeConceptId, makeTableId, acceptedAnswers, acceptsAnOldAnswer } from '../item-ids.mjs';
import { createMerger, mergeVocabulary, mergeDeclared, diffs, hashOf, clone, pairByContent, sourceCards } from './merge.mjs';
import { MODULE_SCHEMA, hasPositionWord, moduleTexts } from '../schema/module.mjs';
import { HOLDS, REWRITES } from './holds.mjs';

const { buildExercises } = await import(new URL('../../../src/lessons/moduleBuilder.js', import.meta.url).href);

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
export { hashOf, pairByContent };

// Every field today's objects use, by kind. Anything else stops the conversion, so nothing is dropped unseen.
const KNOWN = {
  common: ['moduleKey', 'title', 'description', 'concepts', 'vocabularyReference', 'emailMetadata', 'skipStudyMode'],
  lesson: ['exerciseConfig', 'exercises', 'fillInBlanksSentences', 'unit'],
  practice: ['isFillInTheBlank', 'sentences', 'exercises'],
  unit_exam: ['isUnitExam', 'unitNumber', 'exerciseConfig'],
};
const KNOWN_PARTS = {
  emailMetadata: ['capabilities', 'realWorldUse', 'milestone', 'nextModuleTeaser', 'isUnitCompletion', 'utilityScore'],
  vocabularyReference: ['french', 'english', 'note', 'example', 'usage', 'agreement', 'ttsText'],
  concepts: ['term', 'definition', 'example'],
  exerciseConfig: ['type', 'items', 'verb', 'conjugations'],
  custom: ['instruction', 'prompt', 'hint', 'expectedAnswer', 'acceptableAnswers', 'wrongAnswers', 'explanation', 'ttsText'],
  exercises: ['id', 'type', 'instruction', 'prompt', 'hint', 'expectedAnswer', 'answer', 'acceptableAnswers', 'wrongAnswers'],
  conjugation: ['key', 'context', 'customWrongAnswers'],
  mixed: ['key', 'context', 'conjugations', 'verb'],
  sentences: ['text', 'instruction', 'blanks'],
  blanks: ['position', 'answer', 'hint'],
};
function unknownKeys(obj, known, where, out) {
  if (!isObj(obj)) return;
  for (const k of Object.keys(obj)) if (!known.includes(k)) out.push(`${where}.${k}`);
}

export function kindOf(old) {
  if (old.isUnitExam) return 'unit_exam';
  if (old.isFillInTheBlank) return 'practice';
  if (old.isHelpModule || old.isReadingComprehension || old.isPhonicsReference || old.guide) return null;
  return 'lesson';
}

function checkKnown(old, kind) {
  const bad = [];
  unknownKeys(old, [...KNOWN.common, ...KNOWN[kind]], 'module', bad);
  unknownKeys(old.emailMetadata, KNOWN_PARTS.emailMetadata, 'emailMetadata', bad);
  (old.vocabularyReference || []).forEach((v, i) => unknownKeys(v, KNOWN_PARTS.vocabularyReference, `vocabularyReference[${i}]`, bad));
  (old.concepts || []).forEach((c, i) => unknownKeys(c, KNOWN_PARTS.concepts, `concepts[${i}]`, bad));
  const cfg = old.exerciseConfig;
  if (cfg) {
    unknownKeys(cfg, KNOWN_PARTS.exerciseConfig, 'exerciseConfig', bad);
    if (!['custom', 'conjugation', 'mixed'].includes(cfg.type)) bad.push(`exerciseConfig.type=${cfg.type}`);
    (cfg.items || []).forEach((it, i) => unknownKeys(it, KNOWN_PARTS[cfg.type] || [], `exerciseConfig.items[${i}]`, bad));
  }
  (old.exercises || []).forEach((e, i) => {
    unknownKeys(e, KNOWN_PARTS.exercises, `exercises[${i}]`, bad);
    if (e.type !== undefined && e.type !== 'fillblank') bad.push(`exercises[${i}].type=${e.type}`);
  });
  (old.sentences || []).forEach((s, i) => {
    unknownKeys(s, KNOWN_PARTS.sentences, `sentences[${i}]`, bad);
    (s.blanks || []).forEach((b, j) => unknownKeys(b, KNOWN_PARTS.blanks, `sentences[${i}].blanks[${j}]`, bad));
  });
  if (bad.length) throw new Error(`${old.moduleKey}: fields the conversion does not know: ${bad.join(', ')}`);
}

// The exercises a learner meets today, in order, with what the live screen shows (`live`) and the source extras.
function sourceExercises(old, kind) {
  const out = [];
  if (kind === 'practice') {
    (old.sentences || []).forEach((s, i) => out.push({ ref: `sentences[${i}]`, shape: 'sentence', raw: s, hashPart: s }));
    return out;
  }
  const cfg = old.exerciseConfig;
  if (cfg) {
    if (cfg.type === 'custom') {
      cfg.items.forEach((it, i) => {
        const live = { instruction: it.instruction, prompt: it.prompt, hint: it.hint, expectedAnswer: it.expectedAnswer, acceptableAnswers: it.acceptableAnswers || [], wrongAnswers: it.wrongAnswers || [] };
        out.push({ ref: `exerciseConfig.items[${i}]`, shape: 'typed', raw: it, live, explanation: it.explanation, ttsText: it.ttsText, hashPart: it });
      });
    } else {
      const built = buildExercises(0, cfg);
      built.forEach((ex, i) => {
        const raw = cfg.items[i];
        const live = { instruction: ex.instruction, prompt: ex.prompt, hint: ex.hint, expectedAnswer: ex.expectedAnswer, acceptableAnswers: ex.acceptableAnswers || [], wrongAnswers: ex.wrongAnswers || [] };
        out.push({ ref: `exerciseConfig.items[${i}]`, shape: 'typed', raw, live, conjugation: { verb: ex.verb }, hashPart: { raw, live } });
      });
    }
    return out;
  }
  (old.exercises || []).forEach((e, i) => {
    if (e.type === 'fillblank') out.push({ ref: `exercises[${i}]`, shape: 'fillblank', raw: e, authoredId: e.id, hashPart: e });
    else {
      const live = { instruction: e.instruction, prompt: e.prompt, hint: e.hint, expectedAnswer: e.expectedAnswer ?? e.answer, acceptableAnswers: e.acceptableAnswers || [], wrongAnswers: e.wrongAnswers || [] };
      out.push({ ref: `exercises[${i}]`, shape: 'typed', raw: e, live, authoredId: e.id, hashPart: e });
    }
  });
  return out;
}

// What a person sees of an item, for matching a written item to its source when the record cannot.
export function contentKey(item) {
  const answer = item.type === 'gapfill' ? (item.blanks || []).map((b) => b.answer).join(' ') : item.answer ?? item.question ?? '';
  const shown = ['prompt', 'situation', 'cue', 'instruction', 'shown', 'text', 'gloss', 'question'].map((f) => item[f]).filter(isStr).map(normText).sort();
  return `${normText(answer)}|${shown.join('|')}`;
}

/**
 * @param old   today's module object (evaluated export of src/lessons/modules/…)
 * @param opts  { unitKey, unitIndex, existing?, record?, dictionary?: Map, seenBySpelling?: Map, isWord?, declaration? }
 *              declaration: { teaches?, tests? } from the course map (course-map.mjs declarationsOf); undefined keeps
 *              what the file declares
 * @returns { mod, report: ReportLine[], record, held: [{ ref, reason, answer }] }
 *          ReportLine = { module_key, path, kind, detail }
 */
export function convertModule(old, opts = {}) {
  const { unitIndex = null, existing = null, record = null, dictionary = new Map(), isWord = null } = opts;
  const seenBySpelling = opts.seenBySpelling ?? new Map();
  const kind = kindOf(old);
  if (!kind) throw new Error(`${old.moduleKey}: a guide, reading or Reference page; Task 7 converts it`);
  checkKnown(old, kind);
  const key = old.moduleKey;
  const lines = [];
  const add = (path, k, detail) => lines.push({ module_key: key, path, kind: k, detail });
  const mark = (text, mode) => markFrench(text, mode, { isWord });
  const teaches = kind === 'lesson';

  /* ---------- module fields, converted fresh ---------- */
  const fresh = {};
  const sources = {};
  sources.title = kind === 'unit_exam' ? null : old.title;
  if (kind === 'unit_exam') {
    if (isStr(old.title)) add('title', 'dropped_field', `"${old.title}": a unit exam's title comes from the outline ("Unit exam · <unit name>")`);
  } else fresh.title = mark(old.title.trim(), 'segments');
  sources.description = old.description;
  fresh.description = mark(String(old.description ?? '').trim(), 'quoted');
  const caps = old.emailMetadata?.capabilities;
  sources.can_do = caps ?? null;
  if (Array.isArray(caps) && caps.length) fresh.can_do = caps.filter(isStr).map((c) => mark(c.trim(), 'quoted'));
  for (const f of KNOWN_PARTS.emailMetadata.slice(1))
    if (old.emailMetadata?.[f] !== undefined) add(`emailMetadata.${f}`, 'dropped_field', `${JSON.stringify(old.emailMetadata[f])} (no field; the next-module teaser is computed from the outline)`);

  sources.concepts = teaches ? old.concepts ?? [] : null;
  if (teaches && (old.concepts || []).length) {
    const taken = new Set();
    fresh.concepts = old.concepts.map((c) => {
      const out = { id: makeConceptId(c, taken), term: mark(String(c.term).trim(), 'segments'), definition: mark(String(c.definition).trim(), 'quoted') };
      if (isStr(c.example)) out.example = mark(c.example.trim(), 'example');
      return out;
    });
  } else if (!teaches) {
    (old.concepts || []).forEach((c, i) => add(`concepts[${i}]`, 'dropped_field', `concept "${c.term}": a ${kind === 'practice' ? 'practice set' : 'unit exam'} teaches nothing`));
  }
  if (!teaches) (old.vocabularyReference || []).forEach((v, i) => add(`vocabularyReference[${i}]`, 'dropped_field', `word "${v.french}": a ${kind} teaches nothing`));

  const cfg = old.exerciseConfig;
  sources.tables = null;
  if (cfg && (cfg.type === 'conjugation' || cfg.type === 'mixed')) {
    const byVerb = new Map();
    if (cfg.type === 'conjugation') byVerb.set(cfg.verb, cfg.conjugations);
    else for (const it of cfg.items) if (!byVerb.has(it.verb)) byVerb.set(it.verb, it.conjugations);
    sources.tables = [...byVerb];
    const taken = new Set();
    fresh.tables = [...byVerb].map(([verb, conj]) => ({
      id: makeTableId(verb, taken),
      title: `{${verb}}`,
      rows: Object.values(conj).map((c) => ({ fr: c.combined, en: c.english })),
    }));
  }
  sources.options = kind === 'lesson' ? old.skipStudyMode === true : null;
  if (kind === 'lesson' && old.skipStudyMode === true) fresh.options = { study_mode: false };
  if (kind !== 'lesson' && old.skipStudyMode !== undefined) add('skipStudyMode', 'dropped_field', `${old.skipStudyMode} (Study Mode belongs to lessons only)`);
  if (kind !== 'lesson') fresh.tests = { constructions: [] };
  sources.tests = null;
  if (old.unit !== undefined) add('unit', 'dropped_field', `${old.unit} (the outline places the module)`);
  if (old.unitNumber !== undefined) add('unitNumber', 'dropped_field', `${old.unitNumber} (the outline places the exam)`);
  if (old.fillInBlanksSentences !== undefined)
    add('fillInBlanksSentences', 'dropped_field', `${old.fillInBlanksSentences.length} strings, never shown (the exercises hold the same sentences)`);
  if (cfg && Array.isArray(old.exercises) && old.exercises.length)
    add('exercises', 'dropped_field', `${old.exercises.length} exercises the builder never shows (it uses exerciseConfig)`);

  /* ---------- items, converted fresh ---------- */
  const nm = readModule(old, 0, unitIndex);
  const its = new Map(nm.items.map((it) => [it.ref.slice(it.ref.indexOf('#') + 1), it]));
  const ctx = { unitIndex, kind, isWord };
  const held = [];
  const freshItems = [];
  for (const src of sourceExercises(old, kind)) {
    const hold = HOLDS.find((h) => h.module_key === key && h.ref === src.ref);
    const answerOf = src.live?.expectedAnswer ?? src.raw?.answer ?? null;
    if (hold) {
      if (hold.answer !== answerOf) throw new Error(`holds.mjs: ${key} ${src.ref} now has the answer "${answerOf}", not "${hold.answer}"; update the hold`);
      held.push({ ref: src.ref, reason: hold.reason, answer: answerOf, prompt: src.live?.prompt ?? src.raw?.prompt ?? src.raw?.text });
      continue;
    }
    const rewrite = REWRITES.find((w) => w.module_key === key && w.ref === src.ref);
    if (rewrite && rewrite.answer !== answerOf)
      throw new Error(`holds.mjs: ${key} ${src.ref} now has the answer "${answerOf}", not "${rewrite.answer}"; update the rewrite`);
    const r = rewrite
      ? { item: clone(rewrite.item), lines: [{ path: src.ref, kind: 'rewritten', detail: rewrite.ruling }] }
      : src.shape === 'sentence' ? convertSentence(src, ctx) : src.shape === 'fillblank' ? convertFillblank(src, ctx) : convertTyped(src, nm, its.get(src.ref), ctx);
    if (r.held) {
      held.push({ ref: src.ref, reason: r.held, answer: answerOf, prompt: src.live?.prompt ?? src.raw?.prompt });
      continue;
    }
    const item = r.item;
    const itemLines = r.lines.map((l) => ({ ...l }));
    if (isStr(src.explanation)) {
      if (item.hint === undefined) item.hint = mark(src.explanation.trim(), 'quoted');
      else itemLines.push({ path: `${src.ref}.explanation`, kind: 'dropped_field', detail: `"${src.explanation}" (the item has a hint)` });
    }
    if (isStr(src.ttsText)) itemLines.push({ path: `${src.ref}.ttsText`, kind: 'dropped_field', detail: `"${src.ttsText}" (speech override; no field)` });
    if (src.authoredId !== undefined) item.id = src.authoredId; // makeItemId keeps it
    // What the exercise asks and expects, for pairing it with its written item when its source changes.
    const asked = src.shape === 'sentence' ? src.raw.text : src.live?.prompt ?? src.raw?.prompt ?? '';
    const expected = src.shape === 'sentence' ? (src.raw.blanks || []).map((b) => b.answer).join(' ') : answerOf ?? '';
    freshItems.push({ src, hash: hashOf(src.hashPart), item, lines: itemLines, key: `${normText(asked)}|${normText(expected)}`, answer: normText(expected) });
  }

  /* ---------- merge with what is written (three-way) ---------- */
  // Each part (a module field, one vocabulary card, one item) has a base in the record: the hash of its source
  // (`src`) and of what the converter wrote for it last time (`out`). A part the file holds as the converter
  // wrote it takes the new output (a converter fix or a source change reaches it); a part the file holds
  // differently is a hand edit and stays, with a `merge_conflict` line when the new output differs from the base
  // too. A base with no `out` (a record from before this rule) or no record keeps the file, as before.
  const merger = createMerger({ existing, record, handFixes: opts.handFixes, idExisting: opts.written, idRecord: opts.idRecord, acceptConflicts: opts.acceptConflicts, add });
  const { ex, rec, fixes, handEdits, outFixes, mergePart, noteFix } = merger;
  const outRecord = { fields: {}, vocabulary: [], items: {} };
  const baseOf = (e) => (typeof e === 'string' ? { src: e } : isObj(e) ? e : null);
  const mod = { schema: MODULE_SCHEMA, module_key: key, kind, status: 'written' };
  const put = (f, v) => {
    if (v !== undefined) mod[f] = v;
  };

  // Ids written before stay with their term or title when a concept or table list is converted again.
  const keepIds = (f, list) => {
    if (!Array.isArray(list)) return list;
    const written = new Map((ex?.[f] || []).map((c) => [normText(f === 'concepts' ? c.term : c.title), c.id]));
    return list.map((c) => ({ ...c, id: written.get(normText(f === 'concepts' ? c.term : c.title)) ?? c.id }));
  };
  const fieldPart = (f, freshVal) => {
    const srcHash = hashOf(sources[f]);
    const r = mergePart(f, f, ex ? f in ex : false, ex?.[f], freshVal, baseOf(merger.idRec?.fields?.[f]), srcHash);
    outRecord.fields[f] = { src: r.src ?? srcHash, out: r.out };
    put(f, r.value);
    if (r.value !== undefined || freshVal !== undefined) diffs(r.value, freshVal, f, handEdits);
    noteFix(f, r.value, freshVal);
  };

  for (const f of ['title', 'description', 'can_do']) fieldPart(f, fresh[f]);
  mergeDeclared(merger, opts.declaration, 'teaches', { mod, outFields: outRecord.fields, written: opts.written });

  // Vocabulary: one part per source card, word ids in course order (merge.mjs mergeVocabulary).
  if (teaches) {
    const v = mergeVocabulary(merger, old.vocabularyReference || [], { key, seenBySpelling, dictionary, add, markNote: (t) => mark(t, 'quoted') });
    outRecord.vocabulary = v.record;
    put('vocabulary', v.vocab);
  }

  fieldPart('concepts', keepIds('concepts', fresh.concepts));
  fieldPart('tables', keepIds('tables', fresh.tables));

  // Items: a source exercise finds its written item by content first (the record's source hash, then its prompt
  // and answer, then its answer when that is unique). By place only when it was edited in place between unchanged
  // neighbours and kept its prompt or its answer: an exercise that changed both asks something else, so it is new
  // (spec 8.1: a changed meaning needs a new id). An exercise nothing pairs with gets a new id, never a removed one's,
  // and the removed one is reported.
  const exItems = Array.isArray(ex?.items) ? ex.items : [];
  const exIndex = new Map(exItems.map((it, i) => [it.id, i]));
  // Where each item sits: the file's order, and under --force the written file's (read for ids), so --force gives the
  // file back in its written order, hand-added items in their places.
  const sortIndex = ex ? exIndex : new Map((Array.isArray(merger.idEx?.items) ? merger.idEx.items : []).map((it, i) => [it.id, i]));
  const recItems = Object.fromEntries(Object.entries(rec?.items ?? {}).map(([id, e]) => [id, baseOf(e)]));
  // Ids come from the written file and its record under --force too (merge.mjs createMerger idExisting, idRecord).
  const idItems = Array.isArray(merger.idEx?.items) ? merger.idEx.items : [];
  const idRecItems = Object.fromEntries(Object.entries(merger.idRec?.items ?? {}).map(([id, e]) => [id, baseOf(e)]));
  const used = new Set();
  const taken = new Set([...idItems.map((i) => i.id), ...Object.keys(idRecItems)]);
  const entries = []; // { f, id, item, sort, state }
  const refAt = (ref) => {
    const m = /^(.*)\[(\d+)\]$/.exec(String(ref ?? ''));
    return m ? { list: m[1], at: +m[2] } : { list: null, at: -1 };
  };
  const recList = Object.entries(idRecItems).map(([id, b]) => ({ ...b, id, ...refAt(b.ref) }));
  const srcList = freshItems.map((f) => ({ f, src: f.hash, key: f.key, answer: f.answer, ...refAt(f.src.ref) }));
  if (merger.idRec) {
    const promptOf = (k) => String(k ?? '').split('|')[0];
    const pairs = pairByContent(
      srcList,
      recList,
      [
        (s, r) => r.src === s.src,
        (s, r) => r.key !== undefined && r.key === s.key,
        { unique: (s, r) => r.answer !== undefined && r.answer === s.answer },
        // An answer corrected under the same prompt is the same question (spec 8.1 keeps its id); unique, so a prompt
        // two exercises share pairs neither.
        { unique: (s, r) => r.key !== undefined && promptOf(r.key) !== '' && promptOf(r.key) === promptOf(s.key) },
      ],
      { samePlace: (s, r) => r.key !== undefined && (promptOf(r.key) === promptOf(s.key) || r.answer === s.answer) },
    );
    // A changed answer keeps the id only while it still accepts an answer the written item accepted (content:bundle
    // --check's item_id_reused). One that accepts none asks another question: it takes a new id, and the run says so.
    const writtenById = new Map(idItems.map((it) => [it.id, it]));
    // Was the item edited or removed by hand? A normal run compares the file with the converter's last output (an item
    // the converter wrote and the file lacks was removed); --force, which reads no file, goes by hand-fixes.json.
    const handEdited = (id) => {
      if (!ex) return `items/${id}` in fixes;
      const at = exIndex.get(id);
      const out = idRecItems[id]?.out;
      return out !== undefined && (at === undefined || hashOf(exItems[at]) !== out);
    };
    for (const s of srcList) {
      const r = pairs.get(s.at);
      if (!r) continue;
      if (r.answer !== s.answer) {
        const before = writtenById.get(r.id) ?? { answer: r.answer };
        const now = writtenById.has(r.id) ? s.f.item : { answer: s.answer };
        if (!acceptsAnOldAnswer(now, before)) {
          const replaces = { id: r.id, answers: acceptedAnswers(before).flat().filter(isStr) };
          // A hand edit on the replaced item has no place on the new one: a conflict until a person settles it (undo
          // the edit, or move it to the new item after --accept-conflicts), never a silent loss.
          if (handEdited(r.id) && !opts.acceptConflicts) {
            used.add(r.id);
            s.f.id = r.id;
            s.f.held = { ...replaces, newId: makeItemId(s.f.item, new Set(taken)) };
            continue;
          }
          if (handEdited(r.id)) s.f.dropsEdit = true;
          s.f.replaces = replaces;
          continue;
        }
      }
      used.add(r.id);
      s.f.id = r.id;
    }
  }
  const replaced = new Set(freshItems.filter((f) => f.replaces).map((f) => f.replaces.id));
  // With no record (or an item the record never had), a written item with the same content.
  for (const f of freshItems.filter((x) => !x.id)) {
    const k2 = contentKey(f.item);
    const e = idItems.find((it) => !used.has(it.id) && !(it.id in idRecItems) && contentKey(it) === k2);
    if (e) {
      used.add(e.id);
      f.id = e.id;
    }
  }
  for (const f of freshItems) {
    const freshItem = f.id ? { id: f.id, ...withoutId(f.item) } : null;
    if (!f.id) {
      const id = makeItemId(f.item, taken);
      f.id = id;
      const value = `items/${id}` in fixes && !ex ? clone(fixes[`items/${id}`]) : { id, ...withoutId(f.item) };
      outRecord.items[id] = { src: f.hash, key: f.key, answer: f.answer, out: hashOf({ id, ...withoutId(f.item) }), ref: f.src.ref };
      // A replacement takes the place of the item it replaces.
      const sort = f.replaces && sortIndex.has(f.replaces.id) ? sortIndex.get(f.replaces.id) : null;
      if (f.replaces) {
        const shown = (xs) => xs.map((x) => `"${x}"`).join(', ');
        const at = sort === null ? f.src.ref : `items[${sort}]`;
        add(at, 'id_new_answer',
          `${id}: replaces ${f.replaces.id}, since the corrected answer ${shown(acceptedAnswers(f.item).flat().filter(isStr))} accepts none of its answers (${shown(f.replaces.answers)}); a changed meaning takes a new id`);
        if (f.dropsEdit) add(at, 'conflict_accepted', `hand edit on ${f.replaces.id} (or its removal) dropped, as accepted: main's corrected answer gave the item a new id, ${id}; copy the edit to ${id}, or remove ${id}, if it still applies (items/${f.replaces.id})`);
      }
      if (value) entries.push({ f, id, item: value, sort, state: ex ? 'added' : 'new', freshItem: { id, ...withoutId(f.item) } });
      continue;
    }
    // A hand-edited item main gave a new id (above): kept as written, its record and hand fix unchanged, so the
    // conflict stands on every run until it is settled.
    if (f.held) {
      // An item removed by hand (absent from the file, or null in the hand fixes) stays removed.
      const kept = (ex ? exItems[exIndex.get(f.id)] : fixes[`items/${f.id}`]) ?? null;
      const shown = (xs) => xs.map((x) => `"${x}"`).join(', ');
      const answer = shown(acceptedAnswers(f.item).flat().filter(isStr));
      add(sortIndex.has(f.id) ? `items[${sortIndex.get(f.id)}]` : f.src.ref, 'merge_conflict', kept
        ? `hand edit kept; main corrected the answer to ${answer}, which accepts none of ${shown(f.held.answers)}, so the item takes a new id, ${f.held.newId}, and the edit on ${f.id} has no place on it. Undo the edit, or rerun with --accept-conflicts and copy the edit to ${f.held.newId} (items/${f.id})`
        : `hand removal kept; main corrected the answer of ${f.id}, removed here, to ${answer}, which accepts none of ${shown(f.held.answers)}, so the item would come back as ${f.held.newId}. Rerun with --accept-conflicts to take it, then remove ${f.held.newId} if it should stay out (items/${f.id})`);
      outRecord.items[f.id] = clone(merger.idRec.items[f.id]);
      if (kept) entries.push({ f, id: f.id, item: clone(kept), sort: sortIndex.get(f.id) ?? null, state: 'held' });
      noteFix(`items/${f.id}`, kept ?? undefined, kept ? undefined : { id: f.id, ...withoutId(f.item) });
      continue;
    }
    // The record's base (under --force too, where it only tells a conflict).
    const base = idRecItems[f.id] ?? null;
    const fileHas = exIndex.has(f.id);
    const r = mergePart(`items/${f.id}`, `items[${exIndex.get(f.id) ?? '?'}]`, fileHas, exItems[exIndex.get(f.id)], freshItem, base, f.hash);
    outRecord.items[f.id] = { src: r.src ?? f.hash, key: f.key, answer: f.answer, out: r.out, ref: f.src.ref };
    // An item removed by hand stays removed; the record keeps its id.
    if (r.value) entries.push({ f, id: f.id, item: r.value, sort: sortIndex.get(f.id) ?? null, state: 'merged', freshItem });
    else if (!fileHas && base?.out !== undefined) noteFix(`items/${f.id}`, undefined, freshItem);
  }
  // Items written by hand (never made by a run) stay; items whose source exercise is gone go.
  for (const it of exItems) {
    if (used.has(it.id)) continue;
    if (!(it.id in recItems)) entries.push({ f: null, id: it.id, item: clone(it), sort: exIndex.get(it.id), state: 'hand' });
    else if (!replaced.has(it.id)) add(`items[${exIndex.get(it.id)}]`, 'source_removed', `${it.id}: its source exercise is gone, so the item is removed`);
  }
  // --force: items added by hand come back from the hand fixes, in their written places.
  if (!ex) {
    const have = new Set(entries.map((e) => e.id));
    for (const [k, v] of Object.entries(fixes)) {
      const id = k.startsWith('items/') ? k.slice('items/'.length) : null;
      if (!id || v === null || have.has(id) || id in idRecItems) continue;
      entries.push({ f: null, id, item: clone(v), sort: sortIndex.get(id) ?? Infinity, state: 'hand' });
    }
  }
  // An item added by hand is a hand fix too (hand-fixes.json, under its id), so --force gives it back and the golden
  // test can tell a recorded addition from a stray one.
  for (const e of entries) if (e.state === 'hand') noteFix(`items/${e.id}`, e.item, undefined);

  // Order: written order; a new item follows the item made from the source exercise before it.
  const bySource = new Map(entries.filter((e) => e.f).map((e) => [e.f, e]));
  let prev = -1;
  let step = 0;
  for (const f of freshItems) {
    const e = bySource.get(f);
    if (!e) continue;
    if (e.sort === null || e.sort === undefined) e.sort = prev + 0.001 * ++step;
    else {
      prev = e.sort;
      step = 0;
    }
  }
  entries.sort((a, b) => a.sort - b.sort);
  mod.items = entries.map((e) => e.item);
  entries.forEach((e, i) => {
    if (!e.f) return;
    const at = `items[${i}]`;
    for (const l of e.f.lines) lines.push({ module_key: key, path: l.kind === 'dropped_field' ? l.path : l.path.replace(e.f.src.ref, at), kind: l.kind, detail: `${e.id}: ${l.detail}` });
    if (e.state === 'added' && !e.f.replaces) add(at, 'source_added', `${e.id}: new source exercise ${e.f.src.ref}`);
    if (e.state === 'held') return; // recorded above; its merge_conflict line says what differs
    diffs(e.item, e.freshItem, at, handEdits);
    noteFix(`items/${e.id}`, e.item, e.freshItem);
  });
  // Lines mergePart wrote with a file position point at the item's place now.
  for (const l of lines) {
    const m = /^items\[(\d+|\?)\]$/.exec(l.path);
    if (m && (l.kind === 'source_changed' || l.kind === 'merge_conflict')) {
      const id = m[1] === '?' ? null : exItems[+m[1]]?.id;
      const at = entries.findIndex((e) => e.id === id);
      if (at !== -1) l.path = `items[${at}]`;
    }
  }
  for (const h of held) add(h.ref, 'held_out', `"${h.prompt ?? ''}" → "${h.answer ?? ''}": ${h.reason}`);

  fieldPart('options', fresh.options);
  mergeDeclared(merger, opts.declaration, 'tests', { mod, outFields: outRecord.fields, testsBefore: fresh.tests, written: opts.written });

  // Position words in what the source says (spec 5.2): reported, written as they are, fixed by hand.
  // The vocabulary as the source gives it, so a note fixed by hand is still listed, marked "(fixed by hand)".
  const freshMod = { ...mod, ...fresh, ...(teaches ? { vocabulary: sourceCards(old.vocabularyReference) } : {}), items: freshItems.map((f) => f.item) };
  for (const t of moduleTexts(freshMod, { unitIndex })) if (hasPositionWord(unmark(t.text))) add(t.path, 'position_word', `"${unmark(t.text)}"`);

  for (const d of handEdits) add(d.path, 'hand_edit', `"${d.from}" → "${d.to}"`);
  // A finding a hand edit has dealt with says so.
  const related = (a, b) => a === b || a.startsWith(`${b}.`) || a.startsWith(`${b}[`) || b.startsWith(`${a}.`) || b.startsWith(`${a}[`);
  for (const l of lines)
    if (['position_word', 'blank_misplaced', 'word_sense', 'type_guess'].includes(l.kind) && handEdits.some((d) => related(d.path, l.path)))
      l.detail += ' (fixed by hand)';

  const sortKeys = (o) => Object.fromEntries(Object.keys(o).sort().map((x) => [x, o[x]]));
  return {
    mod,
    report: lines,
    record: { fields: sortKeys(outRecord.fields), ...(teaches ? { vocabulary: outRecord.vocabulary } : {}), items: sortKeys(outRecord.items) },
    handFixes: sortKeys(outFixes),
    held,
  };
}

function withoutId(item) {
  const { id, ...rest } = item;
  return rest;
}
