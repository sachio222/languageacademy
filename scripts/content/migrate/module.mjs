// convertModule: one of today's lesson, practice or unit exam objects (src/lessons/modules/) as a module file
// (spec 5.2, 5.5, 5.8, 6). Pure apart from today's builder and checker, which it reads.
//
// Reruns (spec 8.2): a three-way merge. The caller passes the written file (`existing`) and the record of the last
// run (`record`: per part, the hash of its source and of what the converter wrote). A part the file holds as the
// converter last wrote it takes the new output, so converter fixes and source changes reach it; a part edited by
// hand stays, with a merge_conflict line when the new output differs too. `handFixes` (legacy/hand-fixes.json)
// is applied again when nothing is written (--force). With no record the written file wins wherever it has the part.
import '../vite-shim.mjs';
import { createHash } from 'node:crypto';
import { readModule } from '../../graph/course.mjs';
import { convertTyped, convertFillblank, convertSentence, normText } from './items.mjs';
import { markFrench, unmark } from './mark-french.mjs';
import { makeItemId, makeConceptId, makeTableId, slugify } from '../item-ids.mjs';
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

  /* ---------- merge with what is written (three-way) ---------- */
  // Each part (a module field, one vocabulary card, one item) has a base in the record: the hash of its source
  // (`src`) and of what the converter wrote for it last time (`out`). A part the file holds as the converter
  // wrote it takes the new output (a converter fix or a source change reaches it); a part the file holds
  // differently is a hand edit and stays, with a `merge_conflict` line when the new output differs from the base
  // too. A base with no `out` (a record from before this rule) or no record keeps the file, as before.
  const ex = isObj(existing) ? existing : null;
  const rec = isObj(record) ? record : null;
  const fixes = isObj(opts.handFixes) ? opts.handFixes : {};
  const handEdits = [];
  const outFixes = {};
  const outRecord = { fields: {}, vocabulary: [], items: {} };
  const baseOf = (e) => (typeof e === 'string' ? { src: e } : isObj(e) ? e : null);
  const mod = { schema: MODULE_SCHEMA, module_key: key, kind, status: 'written' };
  const put = (f, v) => {
    if (v !== undefined) mod[f] = v;
  };
  const conflict = (path, detail) => add(path, 'merge_conflict', `hand edit kept; ${detail}`);

  // One part. fileHas/fileVal: what the file holds; freshVal: the new output; base: the record entry.
  // Returns { value, out } with out the base to record.
  function mergePart(partKey, path, fileHas, fileVal, freshVal, base, srcHash) {
    const freshOut = hashOf(freshVal);
    if (!ex) {
      // --force: the hand fixes (content/fr/legacy/hand-fixes.json) are applied again; null is a removal.
      if (partKey in fixes) return { value: fixes[partKey] === null ? undefined : clone(fixes[partKey]), out: freshOut };
      return { value: freshVal, out: freshOut };
    }
    if (!base || base.out === undefined) return { value: fileHas ? clone(fileVal) : freshVal, out: freshOut };
    if (hashOf(fileHas ? fileVal : undefined) === base.out) {
      if (base.src !== undefined && base.src !== srcHash && ex) add(path, 'source_changed', 'converted again from the changed source');
      return { value: freshVal, out: freshOut };
    }
    if (freshOut !== base.out) conflict(path, base.src !== srcHash ? 'the source changed under it' : 'the converter now writes it differently');
    return { value: fileHas ? clone(fileVal) : undefined, out: base.out, src: base.src };
  }
  const noteFix = (partKey, value, freshVal) => {
    if (!same(value, freshVal)) outFixes[partKey] = value === undefined ? null : clone(value);
  };

  // Ids written before stay with their term or title when a concept or table list is converted again.
  const keepIds = (f, list) => {
    if (!Array.isArray(list)) return list;
    const written = new Map((ex?.[f] || []).map((c) => [normText(f === 'concepts' ? c.term : c.title), c.id]));
    return list.map((c) => ({ ...c, id: written.get(normText(f === 'concepts' ? c.term : c.title)) ?? c.id }));
  };
  const fieldPart = (f, freshVal) => {
    const srcHash = hashOf(sources[f]);
    const r = mergePart(f, f, ex ? f in ex : false, ex?.[f], freshVal, baseOf(rec?.fields?.[f]), srcHash);
    outRecord.fields[f] = { src: r.src ?? srcHash, out: r.out };
    put(f, r.value);
    if (r.value !== undefined || freshVal !== undefined) diffs(r.value, freshVal, f, handEdits);
    noteFix(f, r.value, freshVal);
  };

  for (const f of ['title', 'description', 'can_do']) fieldPart(f, fresh[f]);
  if (ex?.teaches !== undefined) put('teaches', clone(ex.teaches));

  // Vocabulary: one part per source card. Word ids are frozen once written: a card the file holds keeps its id
  // whatever the converter proposes; a new card takes the proposal. Ids are proposed in course order, and each
  // written card joins the walk as written.
  if (teaches) {
    const src = old.vocabularyReference || [];
    const fileVocab = Array.isArray(ex?.vocabulary) ? ex.vocabulary : [];
    const baseVocab = Array.isArray(rec?.vocabulary) ? rec.vocabulary : null;
    const NULL = hashOf(null);
    const freshCards = []; // per source card: the card, or null when it repeats an earlier card exactly
    const strip = (w) => (w ? Object.fromEntries(Object.entries(w).filter(([k]) => k !== 'word_id')) : null);
    for (const [i, v] of src.entries()) {
      const w = { word_id: null, fr: String(v.french).trim(), gloss: String(v.english).trim() };
      const notes = [v.note, v.usage, v.agreement].filter(isStr).map((s) => s.trim());
      if (notes.length) w.note = notes.join('; ');
      if (isStr(v.example)) w.example_fr = v.example.trim();
      for (const f of ['usage', 'agreement']) if (isStr(v[f])) add(`vocabularyReference[${i}].${f}`, 'text_changed', `"${v[f]}" added to the note`);
      if (isStr(v.example)) add(`vocabularyReference[${i}].example`, 'text_changed', `"${v.example}" is example_fr`);
      if (isStr(v.ttsText)) add(`vocabularyReference[${i}].ttsText`, 'dropped_field', `"${v.ttsText}" (speech override; no field)`);
      // The same card twice (same French, same gloss) is one card, its notes joined.
      const twin = freshCards.find((x) => x && x.fr === w.fr && x.gloss === w.gloss);
      if (twin) {
        if (w.note && w.note !== twin.note) twin.note = twin.note ? `${twin.note}; ${w.note}` : w.note;
        if (w.example_fr && !twin.example_fr) twin.example_fr = w.example_fr;
        add(`vocabularyReference[${i}]`, 'text_changed', `"${w.fr}" ("${w.gloss}") is listed twice; one card, notes joined`);
        freshCards.push(null);
      } else freshCards.push(w);
    }
    // Which written card belongs to which source card: the record's layout (cards it wrote, in order), or for an
    // older record the fresh layout.
    // An older record has no layout: a written card belongs to the source card with its French and gloss.
    let fileCard;
    let extra;
    if (baseVocab) {
      let k = 0;
      fileCard = src.map((_, i) => (baseOf(baseVocab[i])?.out !== undefined && baseOf(baseVocab[i]).out !== NULL ? fileVocab[k++] : undefined));
      extra = fileVocab.slice(k);
    } else {
      const usedCards = new Set();
      fileCard = src.map((v) => {
        const j = fileVocab.findIndex((w, n) => !usedCards.has(n) && w.fr === String(v.french).trim() && w.gloss === String(v.english).trim());
        if (j === -1) return undefined;
        usedCards.add(j);
        return fileVocab[j];
      });
      extra = fileVocab.filter((_, n) => !usedCards.has(n));
    }
    // extra: cards written by hand, with no source card
    const vocab = [];
    const usedIds = new Set();
    for (const [i, card] of freshCards.entries()) {
      const fileW = fileCard[i];
      const v = src[i];
      let freshW = null;
      let proposed = null;
      if (card) {
        const { word_id, review } = proposeWordId({ french: v.french, english: v.english, note: v.note, module_key: key }, new Map(seenBySpelling), dictionary);
        let id = fileW?.word_id ?? word_id;
        // A proposal another card of this table already has: the second card is another meaning.
        if (!fileW?.word_id && usedIds.has(id)) {
          const stem = id.replace(/\..*$/, '');
          const suffix = /\?\s*$/.test(String(v.french)) ? 'question' : slugify(alternatives0(v.english), { words: 3 }) || 'sense';
          let candidate = `${stem}.${suffix}`;
          for (let n = 2; usedIds.has(candidate); n++) candidate = `${stem}.${suffix}-${n}`;
          id = candidate;
        }
        freshW = { ...card, word_id: id };
        // The converter's own id for this card: the one it gave when it first wrote the card (recorded), else
        // this run's choice for a new card, else its proposal.
        const recorded = baseVocab ? baseOf(baseVocab[i])?.word_id : undefined;
        proposed = { ...card, word_id: recorded ?? (fileW?.word_id === undefined ? id : word_id) };
        if (review) add(`vocabulary[${vocab.length}]`, 'word_sense', `"${card.fr}": ${review}${id !== word_id ? ` (written: ${id})` : ''}`);
      }
      const srcHash = hashOf(v);
      const base = baseVocab ? baseOf(baseVocab[i]) : rec ? { src: undefined } : null;
      // Compared without the word id, which is frozen apart from this merge.
      let value;
      if (!ex && `vocabulary/${i}` in fixes) {
        value = fixes[`vocabulary/${i}`] === null ? null : clone(fixes[`vocabulary/${i}`]);
        outRecord.vocabulary[i] = { src: srcHash, out: hashOf(strip(freshW)), ...(proposed ? { word_id: proposed.word_id } : {}) };
      } else {
        const r = mergePart(`vocabulary/${i}`, `vocabulary[${vocab.length}]`, fileW !== undefined, strip(fileW) ?? undefined, strip(freshW), base, srcHash);
        outRecord.vocabulary[i] = { src: r.src ?? srcHash, out: r.out, ...(proposed ? { word_id: proposed.word_id } : {}) };
        value = r.value ? { word_id: fileW?.word_id ?? freshW?.word_id, ...r.value } : null;
      }
      // Key order as the converter writes it.
      const ordered = value ? { word_id: value.word_id, fr: value.fr, gloss: value.gloss, ...value } : null;
      if (ordered) {
        diffs(ordered, proposed ?? undefined, `vocabulary[${vocab.length}]`, handEdits);
        vocab.push(ordered);
        usedIds.add(ordered.word_id);
        rememberWord(ordered, key, seenBySpelling);
      } else if (proposed) diffs(undefined, proposed, `vocabulary/${i}`, handEdits);
      // A written id that differs from the proposal is kept against the converter, so it is a hand fix too.
      noteFix(`vocabulary/${i}`, ordered ?? undefined, proposed ?? undefined);
    }
    for (const w of extra) {
      vocab.push(clone(w));
      rememberWord(w, key, seenBySpelling);
    }
    put('vocabulary', vocab);
  }

  fieldPart('concepts', keepIds('concepts', fresh.concepts));
  fieldPart('tables', keepIds('tables', fresh.tables));

  // Items: a source exercise finds its written item by the record (same source hash, else the same source place),
  // else by content.
  const exItems = Array.isArray(ex?.items) ? ex.items : [];
  const exIndex = new Map(exItems.map((it, i) => [it.id, i]));
  const recItems = Object.fromEntries(Object.entries(rec?.items ?? {}).map(([id, e]) => [id, baseOf(e)]));
  const freshHashes = new Set(freshItems.map((f) => f.hash));
  const used = new Set();
  const taken = new Set([...exItems.map((i) => i.id), ...Object.keys(recItems)]);
  const entries = []; // { f, id, item, sort, state }
  const claim = (f, id) => {
    used.add(id);
    f.id = id;
  };
  for (const f of freshItems) {
    const ids = Object.keys(recItems).filter((i) => !used.has(i) && recItems[i].src === f.hash);
    const id = ids.find((i) => recItems[i].ref === f.src.ref) ?? ids[0];
    if (id !== undefined) claim(f, id);
  }
  for (const f of freshItems.filter((x) => !x.id)) {
    const id = Object.keys(recItems).find((i) => !used.has(i) && recItems[i].ref === f.src.ref && !freshHashes.has(recItems[i].src));
    if (id !== undefined) claim(f, id);
  }
  for (const f of freshItems.filter((x) => !x.id)) {
    const k2 = contentKey(f.item);
    const e = exItems.find((it) => !used.has(it.id) && !(it.id in recItems && freshHashes.has(recItems[it.id].src)) && contentKey(it) === k2);
    if (e) claim(f, e.id);
  }
  for (const f of freshItems) {
    const freshItem = f.id ? { id: f.id, ...withoutId(f.item) } : null;
    if (!f.id) {
      const id = makeItemId(f.item, taken);
      f.id = id;
      const value = `items/${id}` in fixes && !ex ? clone(fixes[`items/${id}`]) : { id, ...withoutId(f.item) };
      outRecord.items[id] = { src: f.hash, out: hashOf({ id, ...withoutId(f.item) }), ref: f.src.ref };
      if (value) entries.push({ f, id, item: value, sort: null, state: ex ? 'added' : 'new', freshItem: { id, ...withoutId(f.item) } });
      continue;
    }
    const base = recItems[f.id] ?? null;
    const fileHas = exIndex.has(f.id);
    const r = mergePart(`items/${f.id}`, `items[${exIndex.get(f.id) ?? '?'}]`, fileHas, exItems[exIndex.get(f.id)], freshItem, base, f.hash);
    outRecord.items[f.id] = { src: r.src ?? f.hash, out: r.out, ref: f.src.ref };
    // An item removed by hand stays removed; the record keeps its id.
    if (r.value) entries.push({ f, id: f.id, item: r.value, sort: exIndex.get(f.id) ?? null, state: 'merged', freshItem });
    else if (!fileHas && base?.out !== undefined) noteFix(`items/${f.id}`, undefined, freshItem);
  }
  // Items written by hand (never made by a run) stay; items whose source exercise is gone go.
  for (const it of exItems) {
    if (used.has(it.id)) continue;
    if (!(it.id in recItems)) entries.push({ f: null, id: it.id, item: clone(it), sort: exIndex.get(it.id), state: 'hand' });
    else add(`items[${exIndex.get(it.id)}]`, 'source_removed', `${it.id}: its source exercise is gone, so the item is removed`);
  }

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
    if (e.state === 'added') add(at, 'source_added', `${e.id}: new source exercise ${e.f.src.ref}`);
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
  if (ex?.tests !== undefined) put('tests', clone(ex.tests));
  else put('tests', fresh.tests);

  // Position words in what the source says (spec 5.2): reported, written as they are, fixed by hand.
  const freshMod = { ...mod, ...fresh, items: freshItems.map((f) => f.item) };
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

// The first meaning of a gloss: "that/it (informal)" -> "that".
function alternatives0(gloss) {
  return String(gloss).replace(/\([^)]*\)/g, ' ').split(/\/|,|;|\bor\b/)[0] ?? '';
}
