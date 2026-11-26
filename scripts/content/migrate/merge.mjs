// The rerun machinery every converter shares (spec 8.2): a three-way merge per part, content-first pairing, and the
// vocabulary merge with course-order word ids. module.mjs (lessons, practice sets, unit exams) and guide.mjs,
// reading.mjs and reference.mjs all merge through here, so a hand edit survives a rerun in every kind.
//
// Each part (a module field, one vocabulary card, one element of an id-keyed list) has a base in the record: the hash
// of its source (`src`) and of what the converter wrote for it last time (`out`). A part the file holds as the
// converter wrote it takes the new output; a part the file holds differently is a hand edit and stays, with a
// `merge_conflict` line when the new output differs from the base too. With no record the written file wins
// wherever it has the part. With no written file (--force) the hand fixes (legacy/hand-fixes.json) are applied again.
//
// Ids are another matter: --force merges nothing from the file, but still pairs each source element with the written
// file and the record by content for its id (createMerger idExisting, idRecord), so an id never moves to another item
// and a hand fix, keyed by id, stays on its item (spec 8.1).
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
// The same value whatever the order of its keys, for telling whether two parts say the same thing.
const canonical = (v) => (Array.isArray(v) ? v.map(canonical) : isObj(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canonical(v[k])])) : v);
const sameContent = (a, b) => JSON.stringify(canonical(a ?? null)) === JSON.stringify(canonical(b ?? null));
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
 * idExisting, idRecord: the written file and its record, read for ids only. A normal run passes neither (existing and
 * record serve); --force passes them with no existing or record, so values come from the source and the hand fixes
 * while ids still come from what is written.
 * acceptConflicts: a hand edit the source or converter changed under is kept and its base moves to the new output, so
 * it is an ordinary hand edit from then on (a conflict_accepted line, which the run prints); without it each such part
 * is a merge_conflict line, on every run, until a person settles it or accepts it (final review M3).
 * Returns { ex, rec, idEx, idRec, fixes, handEdits, outFixes, mergePart, noteFix }.
 */
export function createMerger({ existing = null, record = null, handFixes = null, idExisting = null, idRecord = null, acceptConflicts = false, add }) {
  const ex = isObj(existing) ? existing : null;
  const rec = isObj(record) ? record : null;
  const idEx = ex ?? (isObj(idExisting) ? idExisting : null);
  const idRec = rec ?? (isObj(idRecord) ? idRecord : null);
  const fixes = isObj(handFixes) ? handFixes : {};
  const handEdits = [];
  const outFixes = {};
  // A hand edit kept against a changed output: reported (or accepted), with the part's key so the run can name the
  // item, card or field. Returns the base to record.
  const conflict = (partKey, path, base, srcHash, kept) => {
    const why = base.src !== undefined && base.src !== srcHash ? 'the source changed under it' : 'the converter now writes it differently';
    if (!acceptConflicts) {
      add(path, 'merge_conflict', `hand edit kept; ${why} (${partKey})`);
      return { value: kept, out: base.out, src: base.src };
    }
    add(path, 'conflict_accepted', `hand edit kept over the new output, as accepted; ${why} (${partKey})`);
    return { accepted: true };
  };

  // One part. fileHas/fileVal: what the file holds; freshVal: the new output; base: the record entry.
  // Returns { value, out, src? } with out the base to record.
  function mergePart(partKey, path, fileHas, fileVal, freshVal, base, srcHash) {
    const freshOut = hashOf(freshVal);
    if (!ex) {
      // --force: the hand fixes (content/fr/legacy/hand-fixes.json) are applied again; null is a removal. A fix the new
      // output differs from, where the output moved from its base, is the conflict a normal run finds, so --force and a
      // normal run report the same.
      if (partKey in fixes) {
        const value = fixes[partKey] === null ? undefined : clone(fixes[partKey]);
        if (base?.out !== undefined && freshOut !== base.out && !sameContent(value, freshVal)) {
          const r = conflict(partKey, path, base, srcHash, value);
          return r.accepted ? { value, out: freshOut } : r;
        }
        return { value, out: freshOut };
      }
      return { value: freshVal, out: freshOut };
    }
    if (!base || base.out === undefined) return { value: fileHas ? clone(fileVal) : freshVal, out: freshOut };
    if (hashOf(fileHas ? fileVal : undefined) === base.out) {
      if (base.src !== undefined && base.src !== srcHash && ex) add(path, 'source_changed', 'converted again from the changed source');
      return { value: freshVal, out: freshOut };
    }
    // A hand edit the converter now writes the same way: the two agree, so the new output is the base again and the
    // part is no longer a hand fix.
    if (sameContent(fileHas ? fileVal : undefined, freshVal)) return { value: freshVal, out: freshOut };
    const kept = fileHas ? clone(fileVal) : undefined;
    if (freshOut !== base.out) {
      const r = conflict(partKey, path, base, srcHash, kept);
      return r.accepted ? { value: kept, out: freshOut, src: srcHash } : r;
    }
    return { value: kept, out: base.out, src: base.src };
  }
  const noteFix = (partKey, value, freshVal) => {
    if (!same(value, freshVal)) outFixes[partKey] = value === undefined ? null : clone(value);
  };
  return { ex, rec, idEx, idRec, fixes, handEdits, outFixes, mergePart, noteFix };
}

/**
 * One module field as a part. Puts the merged value into `mod` and the base into `outFields`.
 * `prior` ({ value }): what the converter wrote for the field before the record kept a base for it. A record
 * without the field then takes that as its base, so a file still holding the old output takes the new one, and a
 * file edited by hand keeps the edit (Task 9: `teaches` and `tests`, which earlier runs wrote unrecorded).
 */
export function mergeField(m, f, freshVal, sourceVal, { mod, outFields, prior }) {
  const srcHash = hashOf(sourceVal);
  const r = m.mergePart(f, f, m.ex ? f in m.ex : false, m.ex?.[f], freshVal, baseOf(m.idRec?.fields?.[f]) ?? priorBase(m, prior), srcHash);
  outFields[f] = { src: r.src ?? srcHash, out: r.out };
  if (r.value !== undefined) mod[f] = r.value;
  if (r.value !== undefined || freshVal !== undefined) diffs(r.value, freshVal, f, m.handEdits);
  m.noteFix(f, r.value, freshVal);
}
export const priorBase = (m, prior) => (m.rec && prior ? { out: hashOf(prior.value) } : null);

/**
 * Whether an authored field with no source (glosses) is a part of this module: the file holds it, a hand fix records
 * it, or the record has a base for it. A module that never had the field keeps a record without it, so adding the
 * field to the converter changes no other module's record.
 */
export const authoredPart = (m, f) => Boolean((m.ex && f in m.ex) || f in m.fixes || m.idRec?.fields?.[f] !== undefined);

/**
 * `teaches` or `tests` (spec 5.2).
 *
 * While the course map still declares teaching (`decl` is an object, course-map.mjs declarationsOf), the field is a
 * part: the declaration is the new output, and a hand edit to the file stays.
 *
 * Once the course map is split (`decl` undefined), no source gives these fields: they are authored content, and the
 * run writes the module file's value. That holds under --force too: --force converts every other part from its
 * source alone, but keeps the file's teaches and tests, since no source could give them back. `written` is the
 * module file as it is on disk, read even under --force. Without it (a caller with no file at hand) the merge's own
 * copy of the file is used, and with no file at all a hand fix of the field.
 *
 * `testsBefore`: what earlier runs wrote for tests without a base ({ constructions: [] } on practice sets and unit
 * exams, nothing elsewhere). A practice set or exam with no tests anywhere gets it, since the schema needs one.
 */
export function mergeDeclared(m, decl, field, { mod, outFields, testsBefore, written }) {
  if (decl === undefined) {
    const file = isObj(written) ? written : m.ex;
    let value;
    if (file && file[field] !== undefined) value = file[field];
    else if (!file && m.fixes[field] !== undefined && m.fixes[field] !== null) value = m.fixes[field];
    else if (field === 'tests') value = testsBefore;
    if (value !== undefined) mod[field] = clone(value);
    // The record's base carries forward, so a later run that declares again still tells a hand edit from its output.
    if (m.idRec?.fields?.[field] !== undefined) outFields[field] = clone(m.idRec.fields[field]);
    return;
  }
  const prior = { value: field === 'tests' ? testsBefore : undefined };
  mergeField(m, field, decl[field], decl[field] ?? null, { mod, outFields, prior });
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
  // For ids (under --force too): what is written and recorded.
  const idList = Array.isArray(m.idEx?.[name]) ? m.idEx[name] : [];
  const idRecList = Array.isArray(m.idRec?.lists?.[name]) ? m.idRec.lists[name] : [];
  const recIds = new Set(idRecList.map((r) => r.id));
  const srcInfo = fresh.map((f, at) => ({ at, src: hashOf(f.src), key: keyOf(f.value), f }));
  const pairs = m.idRec
    ? pairByContent(srcInfo, idRecList, [(s, r) => r.src === s.src, (s, r) => r.key === s.key], { samePlace })
    : new Map();
  const taken = new Set([...idList.map((e) => e?.id), ...recIds].filter(Boolean));
  const used = new Set();
  const entries = []; // { id, value, sort, fresh? }
  const outRecord = [];
  const prefix = `${name}/`;

  for (const s of srcInfo) {
    const r = pairs.get(s.at) ?? null;
    let id = r?.id ?? null;
    // With no record (or an element the record never had), a written element with the same content.
    if (!id && m.idEx) {
      const e = idList.find((x) => isObj(x) && !used.has(x.id) && !recIds.has(x.id) && keyOf(x) === s.key);
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
  for (const r of idRecList) {
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
 * infoCards: for a reading, a function (image path -> { credit, stated }, sources.mjs imageCredit). Each card keeps today's `wikipedia`
 * object as `info_card` ({ name, description, image, image_credit, url }; L 20991bf, ledger ruling 2026-11-25
 * Task 8). The credit comes from legacy/image-credits.json (author and licence), never invented; a picture
 * with no entry gets null and a note line (image_without_credit).
 *
 * @returns { vocab, record } with record the per-card bases for migration-sources.json
 */
// markNote: marks the French in one note with braces (mark-french.mjs markFrench, 'quoted'); a note is native text
// with French spans (native_fr), as a table row's note is. Without it the note is copied as written.
export function mergeVocabulary(m, src, { key, seenBySpelling, dictionary, add, minted = null, infoCards = null, markNote = (t) => t }) {
  const { ex, rec, mergePart, noteFix, handEdits } = m;
  const fileVocab = Array.isArray(ex?.vocabulary) ? ex.vocabulary : [];
  // For word ids (under --force too): the written table and its record.
  const idVocab = Array.isArray(m.idEx?.vocabulary) ? m.idEx.vocabulary : [];
  const idRec = m.idRec;
  const strip = (w) => (w ? Object.fromEntries(Object.entries(w).filter(([k]) => k !== 'word_id')) : null);
  const cardKey = (fr, gloss) => `${normText(fr)}|${normText(gloss)}`;
  const freshCards = []; // per source card: the card, or null when it repeats an earlier card exactly
  for (const [i, v] of src.entries()) {
    const w = { word_id: null, fr: String(v.french).trim(), gloss: String(v.english).trim() };
    const notes = [v.note, v.usage, v.agreement].filter(isStr).map((s) => markNote(s.trim()));
    if (notes.length) w.note = notes.join('; ');
    if (isStr(v.example)) w.example_fr = v.example.trim();
    for (const f of ['usage', 'agreement']) if (isStr(v[f])) add(`vocabularyReference[${i}].${f}`, 'text_changed', `"${v[f]}" added to the note`);
    if (isStr(v.example)) add(`vocabularyReference[${i}].example`, 'text_changed', `"${v.example}" is example_fr`);
    if (isStr(v.ttsText)) add(`vocabularyReference[${i}].ttsText`, 'dropped_field', `"${v.ttsText}" (speech override; no field)`);
    if (isStr(v.wikipedia)) add(`vocabularyReference[${i}].wikipedia`, 'dropped_field', `"${v.wikipedia}" (kept in the dictionary only)`);
    else if (v.wikipedia !== undefined && !(infoCards && isObj(v.wikipedia)))
      add(`vocabularyReference[${i}].wikipedia`, 'dropped_field', `${JSON.stringify(v.wikipedia)} (kept in the dictionary only)`);
    if (infoCards && isObj(v.wikipedia)) {
      const wk = v.wikipedia;
      const bad = Object.keys(wk).filter((k) => !['name', 'description', 'image', 'url'].includes(k));
      if (bad.length) throw new Error(`${key} vocabularyReference[${i}].wikipedia: fields the conversion does not know: ${bad.join(', ')}`);
      const image = isStr(wk.image) ? wk.image.trim() : null;
      const credit = image ? infoCards(image) : { credit: null, stated: null };
      // A missing name, description or url stays missing, so validation names it (never the string "undefined").
      const text = (x) => (isStr(x) ? x.trim() : undefined);
      w.info_card = { name: text(wk.name), description: text(wk.description), image, image_credit: credit.credit, url: text(wk.url) };
      if (image && credit.credit === null)
        add(
          `vocabularyReference[${i}].wikipedia.image`,
          'note',
          `image_without_credit: ${image} ("${w.info_card.name}"): no entry in legacy/image-credits.json; the picture's file ${credit.stated ? `states only ${credit.stated}` : 'states no author or licence'}`,
        );
    }
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
  if (Array.isArray(idRec?.vocabulary) && idRec.vocabulary.length && !('key' in (baseOf(idRec.vocabulary[0]) ?? {}))) {
    // Earlier positional record: entry i belongs to source card i; its written card is the next file card.
    let k = 0;
    recCards = idRec.vocabulary.map((e, i) => {
      const b = baseOf(e) ?? {};
      const written = b.out !== undefined && b.out !== hashOf(null) ? idVocab[k++] : undefined;
      return { ...b, key: srcInfo[i]?.key, fr: srcInfo[i]?.fr, at: i, id: written?.word_id ?? null, legacyCard: written };
    });
  } else if (Array.isArray(idRec?.vocabulary)) recCards = idRec.vocabulary.map((e) => ({ ...baseOf(e), fr: String(baseOf(e)?.key ?? '').split('|')[0] }));
  const glossOf = (k) => String(k ?? '').split('|').slice(1).join('|');
  const pairs = pairByContent(
    srcInfo,
    recCards,
    [
      (s, r) => r.src === s.src,
      (s, r) => r.key === s.key,
      { unique: (s, r) => r.fr === s.fr },
      // A spelling fixed by a letter or two, same gloss: the same card (a typo fix keeps its word id).
      { unique: (s, r) => glossOf(r.key) !== '' && glossOf(r.key) === glossOf(s.key) && editDistance(r.fr ?? '', s.fr, 2) <= 2 },
    ],
    // By place only a spelling fix of the same word (same folded French); another word there is a new card.
    { samePlace: (s, r) => slugify(r.fr ?? '') !== '' && slugify(r.fr) === slugify(s.fr) },
  );
  const fileById = new Map(idVocab.map((w) => [w.word_id, w]));
  const usedFile = new Set();
  const findWritten = (r) => {
    if (!r) return undefined;
    if (r.legacyCard) return r.legacyCard;
    let w = r.id ? fileById.get(r.id) : undefined;
    if (!w) w = idVocab.find((x) => !usedFile.has(x) && cardKey(x.fr, x.gloss) === r.key);
    return w;
  };
  // With no record, a written card belongs to the source card with its French and gloss.
  const noRecordCard = (s) => idVocab.find((x) => !usedFile.has(x) && cardKey(x.fr, x.gloss) === s.key);

  const vocab = [];
  const outRecord = [];
  const usedIds = new Set();
  const NULL = hashOf(null);
  for (const s of srcInfo) {
    const r = pairs.get(s.at) ?? null;
    const fileW = idRec ? findWritten(r) : noRecordCard(s);
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
    {
      // Under --force, mergePart applies the card's hand fix (word_id included) and reports a conflict as a normal run does.
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
  // Cards written by hand, with no source card, stay (a normal run; --force brings them back from the hand fixes). Each
  // is a hand fix under its word id, so --force gives it back and the golden test can tell a recorded addition.
  const handCards = fileVocab.filter((w) => !usedFile.has(w));
  if (!ex) {
    const have = new Set(vocab.map((w) => w.word_id));
    const recorded = new Set((idRec?.vocabulary ?? []).map((r) => r.id).filter(Boolean));
    for (const [k, v] of Object.entries(m.fixes))
      if (k.startsWith('vocabulary/') && isObj(v) && isStr(v.word_id) && k === `vocabulary/${v.word_id}` && !have.has(v.word_id) && !recorded.has(v.word_id)) handCards.push(v);
  }
  // Each keeps its written place: after the card written before it (the written table: the file, or under --force the
  // file read for ids), as items do.
  const written = ex ? fileVocab : idVocab;
  const placeOf = new Map(written.map((w, i) => [w.word_id, i]));
  handCards.sort((a, b) => (placeOf.get(a.word_id) ?? Infinity) - (placeOf.get(b.word_id) ?? Infinity));
  for (const w of handCards) {
    const at = placeOf.get(w.word_id);
    let to = vocab.length;
    if (at !== undefined) {
      to = 0;
      for (let k = at - 1; k >= 0; k--) {
        const j = vocab.findIndex((x) => x.word_id === written[k].word_id);
        if (j !== -1) {
          to = j + 1;
          break;
        }
      }
    }
    vocab.splice(to, 0, clone(w));
    rememberWord(w, key, seenBySpelling);
    noteFix(`vocabulary/${w.word_id}`, w, undefined);
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
    const twin = out.find((x) => x.fr === card.fr && x.gloss === card.gloss);
    if (!twin) out.push(card);
    else if (card.note && card.note !== twin.note) twin.note = twin.note ? `${twin.note}; ${card.note}` : card.note;
  }
  return out;
}

/** Levenshtein distance of two strings, stopping early once it passes `max` (then max + 1). */
export function editDistance(a, b, max = Infinity) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
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
