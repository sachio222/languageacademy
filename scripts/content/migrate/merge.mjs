// The rerun machinery every converter shares (spec 8.2): a three-way merge per part, content-first pairing, and the
// vocabulary merge with course-order word ids. module.mjs (lessons, practice sets, unit exams) and guide.mjs,
// reading.mjs and reference.mjs all merge through here, so a hand edit survives a rerun in every kind.
//
// Each part (a module field, one vocabulary card, one element of an id-keyed list) has a base in the record: the hash
// of its source (`src`) and of what the converter wrote for it last time (`out`). A part the file holds as the
// converter wrote it takes the new output; a part the file holds differently is a hand edit and stays, with a
// `merge_conflict` line when the new output differs from the base too. With no record the written file wins
// wherever it has the part. With no written file (--force) the hand fixes (legacy/hand-fixes.json) are applied again.
import { createHash } from 'node:crypto';
import { normText } from './items.mjs';
import { unmark } from './mark-french.mjs';
import { slugify } from '../item-ids.mjs';
import { proposeWordId, rememberWord } from '../word-ids.mjs';

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
export const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
export const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
export const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const hashOf = (v) => createHash('sha1').update(JSON.stringify(v ?? null)).digest('hex').slice(0, 12);
export const sortKeys = (o) => Object.fromEntries(Object.keys(o).sort().map((x) => [x, o[x]]));
const baseOf = (e) => (typeof e === 'string' ? { src: e } : isObj(e) ? e : null);

// Leaf differences between two values, text compared as a learner sees it (braces removed).
export function diffs(a, b, path, out) {
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
 * The merge state of one module. `add(path, kind, detail)` takes report lines.
 * Returns { ex, rec, fixes, handEdits, outFixes, mergePart, noteFix }.
 */
export function createMerger({ existing = null, record = null, handFixes = null, add }) {
  const ex = isObj(existing) ? existing : null;
  const rec = isObj(record) ? record : null;
  const fixes = isObj(handFixes) ? handFixes : {};
  const handEdits = [];
  const outFixes = {};
  const conflict = (path, detail) => add(path, 'merge_conflict', `hand edit kept; ${detail}`);

  // One part. fileHas/fileVal: what the file holds; freshVal: the new output; base: the record entry.
  // Returns { value, out, src? } with out the base to record.
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
  return { ex, rec, fixes, handEdits, outFixes, mergePart, noteFix };
}

/**
 * One module field as a part. Puts the merged value into `mod` and the base into `outFields`.
 */
export function mergeField(m, f, freshVal, sourceVal, { mod, outFields }) {
  const srcHash = hashOf(sourceVal);
  const r = m.mergePart(f, f, m.ex ? f in m.ex : false, m.ex?.[f], freshVal, baseOf(m.rec?.fields?.[f]), srcHash);
  outFields[f] = { src: r.src ?? srcHash, out: r.out };
  if (r.value !== undefined) mod[f] = r.value;
  if (r.value !== undefined || freshVal !== undefined) diffs(r.value, freshVal, f, m.handEdits);
  m.noteFix(f, r.value, freshVal);
}

/**
 * A list whose elements carry their own `id` (guide parts, passage blocks, comprehension items, Reference sections and
 * tables), merged element by element. A source element finds its written element by content (the record's source
 * hash, then its content key), then by place when it was edited in place between unchanged neighbours and
 * `samePlace` holds, so its id stays (spec 8.1). An element nothing pairs with gets a new id from `makeId`; a recorded
 * element whose source is gone is removed and reported; an element written by hand (never made by a run) stays.
 *
 * @param fresh  [{ value (without id), src (the source it came from, hashed) }] in source order
 * @param opts   { keyOf(value) -> string, makeId(value, taken, freshEntry) -> id, samePlace?(new, recorded), add }
 * @returns { list, record: [{ id, src, key, out, at }] }
 */
export function mergeList(m, name, fresh, { keyOf, makeId, samePlace = () => true, add }) {
  const fileList = Array.isArray(m.ex?.[name]) ? m.ex[name] : [];
  const fileIndex = new Map(fileList.map((e, i) => [e?.id, i]));
  const recList = Array.isArray(m.rec?.lists?.[name]) ? m.rec.lists[name] : [];
  const recIds = new Set(recList.map((r) => r.id));
  const srcInfo = fresh.map((f, at) => ({ at, src: hashOf(f.src), key: keyOf(f.value), f }));
  const pairs = m.rec
    ? pairByContent(srcInfo, recList, [(s, r) => r.src === s.src, (s, r) => r.key === s.key], { samePlace })
    : new Map();
  const taken = new Set([...fileList.map((e) => e?.id), ...recIds].filter(Boolean));
  const used = new Set();
  const entries = []; // { id, value, sort, fresh? }
  const outRecord = [];
  const prefix = `${name}/`;

  for (const s of srcInfo) {
    const r = pairs.get(s.at) ?? null;
    let id = r?.id ?? null;
    // With no record (or an element the record never had), a written element with the same content.
    if (!id && m.ex) {
      const e = fileList.find((x) => isObj(x) && !used.has(x.id) && !recIds.has(x.id) && keyOf(x) === s.key);
      if (e) id = e.id;
    }
    if (!id) id = makeId(s.f.value, taken, s.f);
    taken.add(id);
    used.add(id);
    const freshVal = { id, ...s.f.value };
    const fileHas = fileIndex.has(id);
    const base = r ? { src: r.src, out: r.out } : m.rec ? { src: undefined } : null;
    const res = m.mergePart(`${prefix}${id}`, `${name}[${fileIndex.get(id) ?? '?'}]`, fileHas, fileList[fileIndex.get(id)], freshVal, base, s.src);
    outRecord.push({ id, src: res.src ?? s.src, key: s.key, out: res.out, at: s.at });
    if (res.value) entries.push({ id, value: res.value, sort: fileIndex.get(id) ?? null, freshVal });
    else m.noteFix(`${prefix}${id}`, undefined, freshVal); // removed by hand: stays removed
  }
  // Recorded elements no source element pairs with: their source is gone, so they go too.
  for (const r of recList) {
    if (used.has(r.id)) continue;
    if (fileIndex.has(r.id)) add(`${name}[${fileIndex.get(r.id)}]`, 'source_removed', `${r.id}: its source is gone, so it is removed`);
    used.add(r.id);
  }
  // Elements written by hand stay where they are written.
  for (const [i, e] of fileList.entries()) {
    if (!isObj(e) || used.has(e.id)) continue;
    entries.push({ id: e.id, value: clone(e), sort: i, freshVal: undefined });
    used.add(e.id);
  }
  // --force: hand-added elements come back from the hand fixes.
  if (!m.ex)
    for (const [k, v] of Object.entries(m.fixes))
      if (k.startsWith(prefix) && v !== null && !used.has(k.slice(prefix.length))) entries.push({ id: k.slice(prefix.length), value: clone(v), sort: Infinity, freshVal: undefined });

  // Order: written order; a new element follows the element made from the source element before it.
  let prev = -1;
  let step = 0;
  for (const e of entries) {
    if (e.freshVal === undefined) continue;
    if (e.sort === null) e.sort = prev + 0.001 * ++step;
    else {
      prev = e.sort;
      step = 0;
    }
  }
  const ordered = m.ex ? [...entries].sort((a, b) => a.sort - b.sort) : entries;
  ordered.forEach((e, i) => {
    diffs(e.value, e.freshVal, `${name}[${i}]`, m.handEdits);
    m.noteFix(`${prefix}${e.id}`, e.value, e.freshVal);
  });
  return { list: ordered.map((e) => e.value), record: outRecord };
}

// The first meaning of a gloss: "that/it (informal)" -> "that".
function alternatives0(gloss) {
  return String(gloss).replace(/\([^)]*\)/g, ' ').split(/\/|,|;|\bor\b/)[0] ?? '';
}

/**
 * A module's vocabulary table (lessons, readings, Reference pages), from today's `vocabularyReference`: one part per
 * source card. A source card finds its written card by content (the record's source hash, then French and gloss, then
 * French alone when it is unique), and by place only for a spelling fix of the same word (same folded French) between
 * unchanged neighbours; a different word in a card's place is a new card, and the old one is reported removed. Word
 * ids are frozen once written: a written card keeps its id whatever the converter proposes; a new card takes the
 * proposal. Ids are proposed in course order (`seenBySpelling`, kept across modules), and each written card joins the
 * walk as written.
 *
 * @returns { vocab, record } with record the per-card bases for migration-sources.json
 */
export function mergeVocabulary(m, src, { key, seenBySpelling, dictionary, add, minted = null }) {
  const { ex, rec, fixes, mergePart, noteFix, handEdits } = m;
  const fileVocab = Array.isArray(ex?.vocabulary) ? ex.vocabulary : [];
  const strip = (w) => (w ? Object.fromEntries(Object.entries(w).filter(([k]) => k !== 'word_id')) : null);
  const cardKey = (fr, gloss) => `${normText(fr)}|${normText(gloss)}`;
  const freshCards = []; // per source card: the card, or null when it repeats an earlier card exactly
  for (const [i, v] of src.entries()) {
    const w = { word_id: null, fr: String(v.french).trim(), gloss: String(v.english).trim() };
    const notes = [v.note, v.usage, v.agreement].filter(isStr).map((s) => s.trim());
    if (notes.length) w.note = notes.join('; ');
    if (isStr(v.example)) w.example_fr = v.example.trim();
    for (const f of ['usage', 'agreement']) if (isStr(v[f])) add(`vocabularyReference[${i}].${f}`, 'text_changed', `"${v[f]}" added to the note`);
    if (isStr(v.example)) add(`vocabularyReference[${i}].example`, 'text_changed', `"${v.example}" is example_fr`);
    if (isStr(v.ttsText)) add(`vocabularyReference[${i}].ttsText`, 'dropped_field', `"${v.ttsText}" (speech override; no field)`);
    if (isStr(v.wikipedia)) add(`vocabularyReference[${i}].wikipedia`, 'dropped_field', `"${v.wikipedia}" (kept in the dictionary only)`);
    // The same card twice (same French, same gloss) is one card, its notes joined.
    const twin = freshCards.find((x) => x && x.fr === w.fr && x.gloss === w.gloss);
    if (twin) {
      if (w.note && w.note !== twin.note) twin.note = twin.note ? `${twin.note}; ${w.note}` : w.note;
      if (w.example_fr && !twin.example_fr) twin.example_fr = w.example_fr;
      add(`vocabularyReference[${i}]`, 'text_changed', `"${w.fr}" ("${w.gloss}") is listed twice; one card, notes joined`);
      freshCards.push(null);
    } else freshCards.push(w);
  }
  const srcInfo = src.map((v, i) => ({ src: hashOf(v), key: cardKey(v.french, v.english), fr: normText(v.french), at: i, card: freshCards[i] }));

  // The record's cards: keyed format { src, key, at, word_id, id, out }, or the positional format of earlier runs
  // (an array by source index, sources unchanged since).
  let recCards = [];
  if (Array.isArray(rec?.vocabulary) && rec.vocabulary.length && !('key' in (baseOf(rec.vocabulary[0]) ?? {}))) {
    // Earlier positional record: entry i belongs to source card i; its written card is the next file card.
    let k = 0;
    recCards = rec.vocabulary.map((e, i) => {
      const b = baseOf(e) ?? {};
      const written = b.out !== undefined && b.out !== hashOf(null) ? fileVocab[k++] : undefined;
      return { ...b, key: srcInfo[i]?.key, fr: srcInfo[i]?.fr, at: i, id: written?.word_id ?? null, legacyCard: written };
    });
  } else if (Array.isArray(rec?.vocabulary)) recCards = rec.vocabulary.map((e) => ({ ...baseOf(e), fr: String(baseOf(e)?.key ?? '').split('|')[0] }));
  const pairs = pairByContent(
    srcInfo,
    recCards,
    [(s, r) => r.src === s.src, (s, r) => r.key === s.key, { unique: (s, r) => r.fr === s.fr }],
    // By place only a spelling fix of the same word (same folded French); another word there is a new card.
    { samePlace: (s, r) => slugify(r.fr ?? '') !== '' && slugify(r.fr) === slugify(s.fr) },
  );
  const fileById = new Map(fileVocab.map((w) => [w.word_id, w]));
  const usedFile = new Set();
  const findWritten = (r) => {
    if (!r) return undefined;
    if (r.legacyCard) return r.legacyCard;
    let w = r.id ? fileById.get(r.id) : undefined;
    if (!w) w = fileVocab.find((x) => !usedFile.has(x) && cardKey(x.fr, x.gloss) === r.key);
    return w;
  };
  // With no record, a written card belongs to the source card with its French and gloss.
  const noRecordCard = (s) => fileVocab.find((x) => !usedFile.has(x) && cardKey(x.fr, x.gloss) === s.key);

  const vocab = [];
  const outRecord = [];
  const usedIds = new Set();
  const NULL = hashOf(null);
  for (const s of srcInfo) {
    const r = pairs.get(s.at) ?? null;
    const fileW = rec ? findWritten(r) : noRecordCard(s);
    if (fileW) usedFile.add(fileW);
    const v = src[s.at];
    let freshW = null;
    let proposed = null;
    if (s.card) {
      // `minted`: a proposal that is the spelling's first id in the course (nothing seen before it).
      const firstHere = !seenBySpelling.has(spellingKey(v.french));
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
      freshW = { ...s.card, word_id: id };
      // The converter's own id for this card: the one it gave when it first wrote the card (recorded), else this
      // run's choice for a new card, else its proposal.
      proposed = { ...s.card, word_id: r?.word_id ?? (fileW?.word_id === undefined ? id : word_id) };
      if (review) add(`vocabulary[${vocab.length}]`, 'word_sense', `"${s.card.fr}": ${review}${id !== word_id ? ` (written: ${id})` : ''}`);
      if (minted && firstHere) minted.add(proposed.word_id);
    }
    const fixKey = `vocabulary/${proposed?.word_id ?? r?.word_id ?? s.key}`;
    let value;
    let out;
    let srcRec = s.src;
    if (!ex && fixKey in fixes) {
      value = fixes[fixKey] === null ? null : clone(fixes[fixKey]);
      out = hashOf(strip(freshW));
    } else {
      const base = r ? { src: r.src, out: r.out } : rec ? { src: undefined } : null;
      const mp = mergePart(fixKey, `vocabulary[${vocab.length}]`, fileW !== undefined, strip(fileW) ?? undefined, strip(freshW), base, s.src);
      out = mp.out;
      if (mp.src !== undefined) srcRec = mp.src;
      value = mp.value ? { word_id: fileW?.word_id ?? freshW?.word_id, ...mp.value } : null;
    }
    const ordered = value ? { word_id: value.word_id, fr: value.fr, gloss: value.gloss, ...value } : null;
    if (ordered) {
      diffs(ordered, proposed ?? undefined, `vocabulary[${vocab.length}]`, handEdits);
      vocab.push(ordered);
      usedIds.add(ordered.word_id);
      rememberWord(ordered, key, seenBySpelling);
    } else if (proposed) diffs(undefined, proposed, `vocabulary/${proposed.word_id}`, handEdits);
    // A written id that differs from the converter's is kept against the converter, so it is a hand fix too.
    if (s.card || ordered) noteFix(fixKey, ordered ?? undefined, proposed ?? undefined);
    if (s.card || out !== NULL)
      outRecord.push({ src: srcRec, key: s.key, at: s.at, word_id: proposed?.word_id ?? r?.word_id ?? null, id: ordered?.word_id ?? fileW?.word_id ?? r?.id ?? null, out });
  }
  // A recorded card no source card pairs with: its source card is gone, so the written card goes too.
  for (const r of recCards) {
    if ([...pairs.values()].includes(r)) continue;
    const w = findWritten(r);
    if (w && !usedFile.has(w)) {
      usedFile.add(w);
      add(`vocabulary/${w.word_id}`, 'source_removed', `"${w.fr}" (${w.word_id}): its source card is gone, so the card is removed`);
    }
  }
  // Cards written by hand, with no source card, stay.
  for (const w of fileVocab) {
    if (usedFile.has(w)) continue;
    vocab.push(clone(w));
    rememberWord(w, key, seenBySpelling);
  }
  return { vocab, record: outRecord };
}

/** The cards a source table gives before any merge (no word ids), for the position-word scan of what the source says. */
// A card listed twice is one card, as mergeVocabulary writes it, so paths match the written table.
export function sourceCards(src) {
  const out = [];
  for (const v of src || []) {
    const notes = [v.note, v.usage, v.agreement].filter(isStr).map((s) => s.trim());
    const card = { word_id: 'w-fr', fr: String(v.french).trim(), gloss: String(v.english).trim(), ...(notes.length ? { note: notes.join('; ') } : {}) };
    if (!out.some((x) => x.fr === card.fr && x.gloss === card.gloss)) out.push(card);
  }
  return out;
}

// word-ids.mjs's spelling key, for telling whether a spelling was seen before.
const spellingKey = (fr) =>
  String(fr)
    .trim()
    .toLowerCase()
    .replace(/[’ʼ‘]/g, "'")
    .normalize('NFC')
    .replace(/^[¿¡\s]+|[\s?!.…]+$/g, '');

/**
 * Pairs each new entry with at most one recorded entry, by content first. `tests` run in order; a test written
 * { unique: fn } pairs only when exactly one unpaired new and one unpaired recorded entry match each other. Last,
 * an entry edited in place pairs by place: its nearest paired neighbours bound exactly one unpaired recorded
 * entry, at the same distance from the neighbour before it (or after it, at the start of the list), and
 * `samePlace(new, recorded)` holds: an entry replaced in place by a different one is new, and the old one is gone. Entries carry `at` (their
 * place in their list); recorded entries carry the `at` they had, and `list` when places belong to several lists.
 * Returns Map<new at, recorded entry>.
 */
export function pairByContent(news, recs, tests, { samePlace = () => true } = {}) {
  const pairs = new Map();
  const usedR = new Set();
  const freeN = () => news.filter((n) => !pairs.has(n.at));
  const freeR = () => recs.filter((r) => !usedR.has(r));
  for (const t of tests) {
    if (typeof t === 'function') {
      for (const n of freeN()) {
        const r = freeR().find((x) => t(n, x));
        if (r) {
          pairs.set(n.at, r);
          usedR.add(r);
        }
      }
    } else {
      for (const n of freeN()) {
        const rs = freeR().filter((x) => t.unique(n, x));
        if (rs.length !== 1) continue;
        if (freeN().filter((m) => t.unique(m, rs[0])).length !== 1) continue;
        pairs.set(n.at, rs[0]);
        usedR.add(rs[0]);
      }
    }
  }
  // Edited in place: the nearest paired neighbours (unchanged entries) bound one unpaired recorded entry, and this
  // entry sits as far from the neighbour before it as that recorded entry did.
  const sameList = (a, b) => (a?.list ?? null) === (b?.list ?? null);
  const ordered = [...news].sort((a, b) => a.at - b.at);
  ordered.forEach((n, i) => {
    if (pairs.has(n.at)) return;
    const prev = ordered.slice(0, i).reverse().find((m) => pairs.has(m.at));
    const next = ordered.slice(i + 1).find((m) => pairs.has(m.at));
    const lo = prev ? pairs.get(prev.at).at : -1;
    const hi = next ? pairs.get(next.at).at : Infinity;
    if (lo >= hi) return;
    const between = freeR().filter((r) => sameList(r, n) && r.at > lo && r.at < hi);
    // A place pairs only an edit of the same thing (samePlace): a different word or question there is new.
    if (between.length !== 1 || !samePlace(n, between[0])) return;
    const fromPrev = n.at - (prev ? prev.at : -1) === between[0].at - lo;
    const fromNext = !prev && next && next.at - n.at === hi - between[0].at;
    if (!fromPrev && !fromNext) return;
    pairs.set(n.at, between[0]);
    usedR.add(between[0]);
  });
  return pairs;
}

/**
 * What every converter adds after merging: position words in what the source says (reported, written as they are,
 * fixed by hand), hand-edit lines, and "(fixed by hand)" on findings a hand edit dealt with.
 */
export function finishReport(m, lines, add, positionTexts, hasPositionWord) {
  for (const t of positionTexts) if (hasPositionWord(unmark(t.text))) add(t.path, 'position_word', `"${unmark(t.text)}"`);
  for (const d of m.handEdits) add(d.path, 'hand_edit', `"${d.from}" → "${d.to}"`);
  const related = (a, b) => a === b || a.startsWith(`${b}.`) || a.startsWith(`${b}[`) || b.startsWith(`${a}.`) || b.startsWith(`${a}[`);
  for (const l of lines)
    if (['position_word', 'blank_misplaced', 'word_sense', 'type_guess'].includes(l.kind) && m.handEdits.some((d) => related(d.path, l.path)))
      l.detail += ' (fixed by hand)';
}
