// convertModule: one of today's lesson, practice or unit exam objects (src/lessons/modules/) as a module file
// (spec 5.2, 5.5, 5.8, 6). Pure apart from today's builder and checker, which it reads.
//
// Reruns (spec 8.2). The caller passes the written file (`existing`) and the record of what the last run read
// (`record`: a hash of each source part). A part whose source is unchanged keeps what the file holds, so hand
// fixes (types, ids, word ids, text) survive; a changed part is converted again, keeping its ids, and reported.
// With no record the written file wins wherever it has the part.
import '../vite-shim.mjs';
import { createHash } from 'node:crypto';
import { readModule } from '../../graph/course.mjs';
import { convertTyped, convertFillblank, convertSentence, normText } from './items.mjs';
import { markFrench, unmark } from './mark-french.mjs';
import { makeItemId, makeConceptId, makeTableId } from '../item-ids.mjs';
import { proposeWordId, rememberWord } from '../word-ids.mjs';
import { MODULE_SCHEMA, hasPositionWord, moduleTexts } from '../schema/module.mjs';
import { HOLDS, REWRITES } from './holds.mjs';

const { buildExercises } = await import(new URL('../../../src/lessons/moduleBuilder.js', import.meta.url).href);

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const hashOf = (v) => createHash('sha1').update(JSON.stringify(v ?? null)).digest('hex').slice(0, 12);

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

// Leaf differences between two values, text compared as a learner sees it (braces removed).
function diffs(a, b, path, out) {
  if (typeof a === 'string' && typeof b === 'string') {
    if (unmark(a) !== unmark(b)) out.push({ path, from: unmark(b), to: unmark(a) });
    return out;
  }
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    a.forEach((x, i) => diffs(x, b[i], `${path}[${i}]`, out));
    return out;
  }
  if (isObj(a) && isObj(b)) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffs(a[k], b[k], path ? `${path}.${k}` : k, out);
    return out;
  }
  if (!same(a, b)) out.push({ path, from: b === undefined ? '(none)' : unmark(JSON.stringify(b)), to: a === undefined ? '(removed)' : unmark(JSON.stringify(a)) });
  return out;
}

/**
 * @param old   today's module object (evaluated export of src/lessons/modules/…)
 * @param opts  { unitKey, unitIndex, existing?, record?, dictionary?: Map, seenBySpelling?: Map, isWord? }
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
    freshItems.push({ src, hash: hashOf(src.hashPart), item, lines: itemLines });
  }

  /* ---------- merge with what is written ---------- */
  const ex = isObj(existing) ? existing : null;
  const rec = isObj(record) ? record : null;
  const fieldHashes = Object.fromEntries(Object.entries(sources).map(([f, v]) => [f, hashOf(v)]));
  const keepField = (f) => ex && (rec ? rec.fields?.[f] === fieldHashes[f] : f in ex || f === 'vocabulary');
  const handEdits = [];
  const mod = { schema: MODULE_SCHEMA, module_key: key, kind, status: 'written' };
  const put = (f, v) => {
    if (v !== undefined) mod[f] = v;
  };

  for (const f of ['title', 'description', 'can_do']) {
    if (keepField(f)) {
      put(f, clone(ex[f]));
      diffs(ex[f], fresh[f], f, handEdits);
    } else {
      put(f, fresh[f]);
      if (ex && rec?.fields?.[f] !== undefined) add(f, 'source_changed', 'converted again from the changed source');
    }
  }
  if (ex?.teaches !== undefined) put('teaches', clone(ex.teaches));

  // Vocabulary: word ids proposed in course order, so the seen map always grows; a kept table feeds it as written.
  sources.vocabulary = teaches ? old.vocabularyReference ?? [] : null;
  fieldHashes.vocabulary = hashOf(sources.vocabulary);
  if (teaches) {
    const freshVocab = [];
    const proposals = [];
    const local = new Map(seenBySpelling); // proposals for the fresh table, without touching the real map yet
    for (const [i, v] of (old.vocabularyReference || []).entries()) {
      const { word_id, review } = proposeWordId({ french: v.french, english: v.english, note: v.note, module_key: key }, local, dictionary);
      const w = { word_id, fr: String(v.french).trim(), gloss: String(v.english).trim() };
      const notes = [v.note, v.usage, v.agreement].filter(isStr).map((s) => s.trim());
      if (notes.length) w.note = notes.join('; ');
      if (isStr(v.example)) w.example_fr = v.example.trim();
      // One meaning listed twice in one table is one word: its notes join the first entry.
      const twin = freshVocab.find((x) => x.word_id === word_id);
      if (twin) {
        if (w.note && w.note !== twin.note) twin.note = twin.note ? `${twin.note}; ${w.note}` : w.note;
        if (w.example_fr && !twin.example_fr) twin.example_fr = w.example_fr;
        lines.push({ module_key: key, path: `vocabularyReference[${i}]`, kind: 'text_changed', detail: `"${w.fr}" ("${w.gloss}") is listed twice with one meaning; one word, notes joined` });
        continue;
      }
      freshVocab.push(w);
      proposals.push({ i: freshVocab.length - 1, review });
      for (const f of ['usage', 'agreement']) if (isStr(v[f])) lines.push({ module_key: key, path: `vocabularyReference[${i}].${f}`, kind: 'text_changed', detail: `"${v[f]}" added to the note` });
      if (isStr(v.example)) lines.push({ module_key: key, path: `vocabularyReference[${i}].example`, kind: 'text_changed', detail: `"${v.example}" is example_fr` });
      if (isStr(v.ttsText)) lines.push({ module_key: key, path: `vocabularyReference[${i}].ttsText`, kind: 'dropped_field', detail: `"${v.ttsText}" (speech override; no field)` });
    }
    if (keepField('vocabulary') && Array.isArray(ex.vocabulary)) {
      put('vocabulary', clone(ex.vocabulary));
      for (const w of ex.vocabulary) rememberWord(w, key, seenBySpelling);
      diffs(ex.vocabulary, freshVocab, 'vocabulary', handEdits);
    } else {
      // Ids written before stay with their spelling and meaning.
      const writtenIds = new Map((ex?.vocabulary || []).map((w) => [`${w.fr}|${w.gloss}`, w.word_id]));
      const vocab = freshVocab.map((w) => ({ ...w, word_id: writtenIds.get(`${w.fr}|${w.gloss}`) ?? w.word_id }));
      for (const w of vocab) rememberWord(w, key, seenBySpelling);
      put('vocabulary', vocab);
      if (ex && rec?.fields?.vocabulary !== undefined) add('vocabulary', 'source_changed', 'converted again from the changed source');
    }
    for (const { i, review } of proposals) if (review) add(`vocabulary[${i}]`, 'word_sense', `"${freshVocab[i].fr}": ${review}`);
  }

  for (const f of ['concepts', 'tables']) {
    if (keepField(f)) {
      put(f, clone(ex[f]));
      diffs(ex[f], fresh[f], f, handEdits);
    } else if (fresh[f] !== undefined) {
      // Ids written before stay with their term or title.
      const written = new Map((ex?.[f] || []).map((c) => [normText(f === 'concepts' ? c.term : c.title), c.id]));
      put(f, fresh[f].map((c) => ({ ...c, id: written.get(normText(f === 'concepts' ? c.term : c.title)) ?? c.id })));
      if (ex && rec?.fields?.[f] !== undefined) add(f, 'source_changed', 'converted again from the changed source');
    }
  }

  // Items.
  const exItems = Array.isArray(ex?.items) ? ex.items : [];
  const exIndex = new Map(exItems.map((it, i) => [it.id, i]));
  const recItems = rec?.items ?? {};
  const freshHashes = new Set(freshItems.map((f) => f.hash));
  const used = new Set();
  const taken = new Set([...exItems.map((i) => i.id), ...Object.keys(recItems)]);
  const entries = []; // { f, id, item, sort, state }
  const outRecord = {};
  // 1. the record: this source exercise was written before as id
  for (const f of freshItems) {
    const id = Object.keys(recItems).find((i) => recItems[i] === f.hash && !used.has(i));
    if (id === undefined) continue;
    used.add(id);
    outRecord[id] = f.hash;
    f.done = true;
    if (exIndex.has(id)) entries.push({ f, id, item: clone(exItems[exIndex.get(id)]), sort: exIndex.get(id), state: 'kept' });
    // else removed by hand: it stays removed, and the record keeps its id
  }
  // 2. a written item with the same content (no record, or a record from before this item existed)
  const orphans = exItems.filter((it) => !used.has(it.id) && (!(it.id in recItems) || !freshHashes.has(recItems[it.id])));
  for (const f of freshItems.filter((x) => !x.done)) {
    const k = contentKey(f.item);
    const e = orphans.find((it) => !used.has(it.id) && contentKey(it) === k);
    if (!e) continue;
    used.add(e.id);
    f.done = true;
    outRecord[e.id] = f.hash;
    const changed = rec && e.id in recItems;
    entries.push({ f, id: e.id, item: changed ? { id: e.id, ...withoutId(f.item) } : clone(e), sort: exIndex.get(e.id), state: changed ? 'changed' : 'kept' });
  }
  // 3. a changed source exercise takes the place of the written item its old source made, in order
  const recOrphans = orphans.filter((it) => !used.has(it.id) && it.id in recItems);
  for (const f of freshItems.filter((x) => !x.done)) {
    const e = recOrphans.find((it) => !used.has(it.id));
    if (!e) break;
    used.add(e.id);
    f.done = true;
    outRecord[e.id] = f.hash;
    entries.push({ f, id: e.id, item: { id: e.id, ...withoutId(f.item) }, sort: exIndex.get(e.id), state: 'changed' });
  }
  // 4. new
  for (const f of freshItems.filter((x) => !x.done)) {
    const id = makeItemId(f.item, taken);
    outRecord[id] = f.hash;
    entries.push({ f, id, item: { id, ...withoutId(f.item) }, sort: null, state: ex ? 'added' : 'new' });
  }
  // Items written by hand (never made by a run) stay.
  for (const it of exItems) if (!used.has(it.id) && !(it.id in recItems)) entries.push({ f: null, id: it.id, item: clone(it), sort: exIndex.get(it.id), state: 'hand' });
  for (const it of exItems)
    if (!used.has(it.id) && it.id in recItems && !freshHashes.has(recItems[it.id])) add(`items[${exIndex.get(it.id)}]`, 'source_removed', `${it.id}: its source exercise is gone, so the item is removed`);

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
    if (e.state === 'changed') add(at, 'source_changed', `${e.id}: converted again from the changed source exercise ${e.f.src.ref}`);
    if (e.state === 'added') add(at, 'source_added', `${e.id}: new source exercise ${e.f.src.ref}`);
    if (e.state === 'kept') diffs(e.item, { id: e.id, ...withoutId(e.f.item) }, at, handEdits);
  });
  for (const h of held) add(h.ref, 'held_out', `"${h.prompt ?? ''}" → "${h.answer ?? ''}": ${h.reason}`);

  for (const f of ['options', 'tests']) {
    if (f === 'tests' && ex?.tests !== undefined) put(f, clone(ex.tests));
    else if (keepField(f)) {
      put(f, clone(ex[f]));
      diffs(ex[f], fresh[f], f, handEdits);
    } else put(f, fresh[f]);
  }

  // Position words in what the source says (spec 5.2): reported, written as they are, fixed by hand.
  const freshMod = { ...mod, ...fresh, items: freshItems.map((f) => f.item) };
  for (const t of moduleTexts(freshMod, { unitIndex })) if (hasPositionWord(unmark(t.text))) add(t.path, 'position_word', `"${unmark(t.text)}"`);

  for (const d of handEdits) add(d.path, 'hand_edit', `"${d.from}" → "${d.to}"`);
  // A finding a hand edit has dealt with says so.
  const related = (a, b) => a === b || a.startsWith(`${b}.`) || a.startsWith(`${b}[`) || b.startsWith(`${a}.`) || b.startsWith(`${a}[`);
  for (const l of lines)
    if (['position_word', 'blank_misplaced', 'word_sense', 'type_guess'].includes(l.kind) && handEdits.some((d) => related(d.path, l.path)))
      l.detail += ' (fixed by hand)';

  const outRecordSorted = Object.fromEntries(Object.keys(outRecord).sort().map((k) => [k, outRecord[k]]));
  return {
    mod,
    report: lines,
    record: { fields: Object.fromEntries(Object.keys(fieldHashes).sort().map((k) => [k, fieldHashes[k]])), items: outRecordSorted },
    held,
  };
}

function withoutId(item) {
  const { id, ...rest } = item;
  return rest;
}
