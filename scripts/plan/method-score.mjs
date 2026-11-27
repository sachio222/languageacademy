// The plan and the written course measured against the teaching method itself, not only its surface rules.
//
// The method (research note "The Language Academy method as a graph any language can use"): each lesson adds the
// piece that opens the most new sentences given what the learner already knows, and fills its exercises with
// earlier pieces. This file measures that, for any language:
//
//   roles(graph, table)        each pattern's role (chunk, guide-covered, paradigm, kernel, wrapper, operator, frame)
//                              and the word classes its slot accepts; each word's role (kernel, frame, filler)
//   scoreShape(...)            per module of the whole course, written and planned: patterns known on arrival, the
//                              reach each new word arrives with (known patterns whose slot accepts it), the words each
//                              new pattern takes at once, known words a new pattern gives a new job (reuses-as), and
//                              how long a pattern waited after its needs were met
//   scoreWriting(...)          per written module: the share of new words among the words its exercises use, how
//                              each new word is first met, whether it then carries a later new word, and whether
//                              the next modules lean on it
//
// The role and slot table is the language's own file, curriculum-graph/languages/<lang>/method-roles.json. Nothing
// here names a language.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const readRoles = (repoRoot, lang) => JSON.parse(readFileSync(join(repoRoot, 'curriculum-graph', 'languages', lang, 'method-roles.json'), 'utf8'));

const shortId = (id) => id.replace(/^[a-z]{2,3}:(cx|lex|form):/, '');
const family = (id) => shortId(id).split('.')[0];
const median = (xs) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const quantile = (xs, q) => (xs.length ? [...xs].sort((a, b) => a - b)[Math.min(xs.length - 1, Math.floor(q * xs.length))] : null);

/** Roles and slots of every pattern and word of a graph, by the language's table. */
export function roles(graph, table) {
  const cxAll = [...(graph.paradigms ?? []).map((p) => ({ ...p, paradigm: true })), ...(graph.constructions ?? [])];
  const cxById = new Map(cxAll.map((c) => [c.id, c]));
  const hw = new Map(graph.headwords.map((h) => [h.id, h]));
  const neededBy = new Map();
  const lexNeeds = new Map();
  for (const c of cxAll) for (const n of c.needs ?? []) {
    if (cxById.has(n)) neededBy.set(n, (neededBy.get(n) ?? 0) + 1);
    else if (hw.has(n)) lexNeeds.set(n, (lexNeeds.get(n) ?? 0) + 1);
  }
  const guideCovered = (c) => {
    const s = shortId(c.id);
    const gc = table.guideCovered ?? {};
    if ((gc.ids ?? []).some((x) => s === x || s.startsWith(`${x}.`))) return true;
    return (gc.prefixes ?? []).some((p) => s.startsWith(p)) && (gc.levels ?? []).includes(c.cefr);
  };
  const cxRole = (c) => {
    const s = shortId(c.id);
    const f = family(c.id);
    if ((table.chunkFamilies ?? []).includes(f)) return 'chunk';
    if (guideCovered(c)) return 'guide-covered';
    if (c.paradigm) return 'paradigm';
    if (!(c.needs ?? []).length && (neededBy.get(c.id) ?? 0) >= table.kernelNeededBy) return 'kernel';
    if ((table.wrapperIds ?? []).includes(s) || (table.wrapperFamilies ?? []).includes(f)) return 'wrapper';
    if ((table.operatorFamilies ?? []).includes(f)) return 'operator';
    return 'frame';
  };
  const slots = (c) => (c.paradigm ? null : new Set(table.slotExact?.[shortId(c.id)] ?? table.slotFamily?.[family(c.id)] ?? table.slotDefault ?? []));
  // Carrier words: headwords a pattern's detector names, or that a pattern lists in its needs.
  const carriersOf = new Map();
  const carrierWords = new Set();
  for (const c of cxAll) {
    const heads = new Set((c.needs ?? []).filter((n) => hw.has(n)));
    const alts = !c.detect ? [] : Array.isArray(c.detect[0]) ? c.detect : [c.detect];
    for (const steps of alts) for (const st of steps) {
      if (st.optional) continue;
      for (const o of st.any ?? [st]) if (o.headword && hw.has(o.headword)) heads.add(o.headword);
    }
    carriersOf.set(c.id, [...heads]);
    for (const h of heads) carrierWords.add(h);
  }
  const patterns = new Map(cxAll.map((c) => [c.id, { id: c.id, role: cxRole(c), slots: slots(c), paradigm: !!c.paradigm, needs: (c.needs ?? []).filter((n) => cxById.has(n)), carriers: carriersOf.get(c.id), cefr: c.cefr ?? null, label: c.label ?? '' }]));
  const cls = (h) => table.wordClass?.[h.pos] ?? 'F';
  const wordRole = (id) => {
    const h = hw.get(id);
    if (!h) return null;
    if (h.pos === 'verb' && (lexNeeds.get(id) ?? 0) >= table.kernelVerbNeeds) return 'kernel';
    return carrierWords.has(id) ? 'frame' : 'filler';
  };
  const accepts = (p, h) => (p.paradigm ? (h.paradigms ?? []).includes(p.id) : p.slots.has(cls(h)));
  return { patterns, hw, cls, wordRole, accepts };
}

/** The headword a taught id stands for: itself, or the headword of a form. */
function headOf(id, hw, formOf) {
  if (hw.has(id)) return id;
  return formOf.get(id) ?? null;
}

/**
 * The shape of the course: what each module adds, by the method's own measure.
 * course: modules in order ({ position, moduleKey, unitKey, kind }); taughtAt: Map<id, position>.
 * Returns { modules: [...], units: [...], never: [...] }.
 */
export function scoreShape({ graph, table, course, taughtAt }) {
  const r = roles(graph, table);
  const formOf = new Map((graph.forms ?? []).map((f) => [f.id, f.of]));
  const wordAt = new Map();
  for (const [id, p] of taughtAt) {
    const h = headOf(id, r.hw, formOf);
    if (h && (!wordAt.has(h) || p < wordAt.get(h))) wordAt.set(h, p);
  }
  const patAt = new Map([...taughtAt].filter(([id]) => r.patterns.has(id)));
  const counted = (p) => p.role !== 'chunk' && !p.paradigm; // patterns counted as "known": no fixed phrases, no form tables
  // The position at which each pattern's needs were all taught (it could have been taught from then on).
  const readyAt = (p) => (p.needs.every((n) => patAt.has(n)) ? Math.max(0, ...p.needs.map((n) => patAt.get(n))) : null);
  const ordered = [...course].sort((a, b) => a.position - b.position);
  const wordsByPos = new Map();
  for (const [h, p] of wordAt) { if (!wordsByPos.has(p)) wordsByPos.set(p, []); wordsByPos.get(p).push(h); }
  const patsByPos = new Map();
  for (const [id, p] of patAt) { if (!patsByPos.has(p)) patsByPos.set(p, []); patsByPos.get(p).push(id); }
  const known = []; // patterns known so far
  const knownWords = [];
  const modules = [];
  for (const m of ordered) {
    const newPats = (patsByPos.get(m.position) ?? []).map((id) => r.patterns.get(id));
    const newWords = (wordsByPos.get(m.position) ?? []).map((id) => r.hw.get(id));
    const patterns = newPats.map((p) => {
      const takes = p.role === 'chunk' ? 0 : knownWords.filter((h) => r.accepts(p, h)).length;
      const ready = readyAt(p);
      const jobs = p.carriers.filter((h) => wordAt.has(h) && wordAt.get(h) < m.position);
      return { id: p.id, role: p.role, takes, waited: ready === null ? null : m.position - ready, reuses: jobs };
    });
    known.push(...newPats);
    const words = newWords.map((h) => ({
      id: h.id, lemma: h.lemma, pos: h.pos, role: r.wordRole(h.id),
      reach: known.filter((p) => p.role !== 'chunk' && r.accepts(p, h)).length,
    }));
    knownWords.push(...newWords);
    // a list of fillers with nothing new to carry them: six or more new words, no new verb, frame word or pattern
    const noCarrier = words.length >= 6 && !words.some((w) => w.pos === 'verb' || w.role !== 'filler') && !patterns.some((x) => x.role !== 'paradigm');
    modules.push({
      no_carrier: noCarrier,
      position: m.position, module_key: m.moduleKey, unit_key: m.unitKey, kind: m.kind,
      patterns_known: known.filter(counted).length, patterns, words,
      // pairs of (word, pattern) this module makes sayable: each new word in every known pattern that takes it,
      // and each new pattern with every earlier word it takes
      opened: words.reduce((s, w) => s + w.reach, 0) + patterns.reduce((s, p) => s + p.takes, 0),
    });
  }
  const last = ordered.length ? ordered[ordered.length - 1].position : 0;
  const never = [...r.patterns.values()].filter((p) => !patAt.has(p.id) && p.role !== 'chunk' && !p.paradigm)
    .map((p) => {
      const ready = readyAt(p);
      return { id: p.id, role: p.role, cefr: p.cefr, label: p.label, ready_at: ready, missing_needs: p.needs.filter((n) => !patAt.has(n)),
        takes: knownWords.filter((h) => r.accepts(p, h)).length, carriers_known: p.carriers.filter((h) => wordAt.has(h)).length, carriers: p.carriers.length };
    });
  const units = [];
  for (const m of modules) {
    let u = units[units.length - 1];
    if (!u || u.unit_key !== m.unit_key) { u = { unit_key: m.unit_key, modules: 0, teaching: 0, words: 0, patterns: 0, opened: 0, reach: [], by_role: {}, word_roles: {}, by_class: {}, no_carrier: 0 }; units.push(u); }
    u.modules += 1;
    if (m.words.length || m.patterns.length) u.teaching += 1;
    u.words += m.words.length;
    u.patterns += m.patterns.filter((p) => p.role !== 'paradigm').length;
    u.opened += m.opened;
    if (m.no_carrier) u.no_carrier += 1;
    u.patterns_known = m.patterns_known;
    for (const w of m.words) { u.reach.push(w.reach); u.word_roles[w.role] = (u.word_roles[w.role] ?? 0) + 1; u.by_class[w.pos] = (u.by_class[w.pos] ?? 0) + 1; }
    for (const p of m.patterns) u.by_role[p.role] = (u.by_role[p.role] ?? 0) + 1;
  }
  for (const u of units) { u.median_reach = median(u.reach); delete u.reach; u.opened_per_teaching = u.teaching ? Math.round(u.opened / u.teaching) : 0; }
  return { modules, units, never, last };
}

/**
 * How written modules teach. course: written modules in order with items ({ ref, source, type });
 * analysis: Map<ref, [{ text, readings }]> from the checker; taughtAt as above.
 * Exercise text is what the learner works on: items, and each vocabulary card's example sentence.
 */
export function scoreWriting({ graph, course, analysis, taughtAt, lean = 3 }) {
  const hw = new Map(graph.headwords.map((h) => [h.id, h]));
  const formOf = new Map((graph.forms ?? []).map((f) => [f.id, f.of]));
  const wordAt = new Map();
  for (const [id, p] of taughtAt) {
    const h = headOf(id, hw, formOf);
    if (h && (!wordAt.has(h) || p < wordAt.get(h))) wordAt.set(h, p);
  }
  const ordered = [...course].sort((a, b) => a.position - b.position);
  // Per module: its sentences in order, each as the set of headwords read without doubt.
  const sentencesOf = (m, sources) => {
    const out = [];
    for (const it of m.items) {
      if (!sources.includes(it.source)) continue;
      for (const a of analysis.get(it.ref) ?? []) {
        const heads = new Set();
        for (const rs of a.readings) if (rs.length && rs.every((x) => x.headwordId === rs[0].headwordId) && hw.has(rs[0].headwordId)) heads.add(rs[0].headwordId);
        if (heads.size) out.push({ text: a.text, heads, source: it.source, type: it.type, tokens: a.tokens?.length ?? heads.size });
      }
    }
    return out;
  };
  // For each module, the sentence in which each of its new words is first met.
  const firstMeet = new Map();
  for (const m of ordered) {
    const work = sentencesOf(m, ['vocab-example', 'items', 'passage']);
    const seen = new Map();
    for (const s of work) for (const h of s.heads) if (wordAt.get(h) === m.position && !seen.has(h)) seen.set(h, s.heads);
    firstMeet.set(m.position, seen);
  }
  const usedIn = new Map(ordered.map((m) => [m.position, new Set(sentencesOf(m, ['items', 'passage', 'vocab-example', 'guide', 'check', 'phrase']).flatMap((s) => [...s.heads]))]));
  const rows = [];
  for (const m of ordered) {
    const work = sentencesOf(m, ['vocab-example', 'items', 'passage']);
    const items = work.filter((s) => s.source === 'items');
    const used = new Set(items.flatMap((s) => [...s.heads]));
    const isNew = (h) => wordAt.get(h) === m.position;
    const fresh = [...used].filter(isNew);
    const untaught = [...used].filter((h) => !wordAt.has(h) || wordAt.get(h) > m.position);
    const types = {};
    for (const it of m.items) if (it.source === 'items') types[it.type ?? 'other'] = (types[it.type ?? 'other'] ?? 0) + 1;
    const newHere = [...wordAt].filter(([, p]) => p === m.position).map(([h]) => h);
    const firstIndex = new Map();
    work.forEach((s, i) => { for (const h of s.heads) if (isNew(h) && !firstIndex.has(h)) firstIndex.set(h, i); });
    const laterModules = ordered.filter((x) => x.position > m.position);
    const words = newHere.map((h) => {
      const i = firstIndex.get(h);
      const first = i === undefined ? null : work[i];
      // other new words met for the first time in the same sentence: the word is not met through owned material alone
      const strangers = first ? [...first.heads].filter((x) => x !== h && isNew(x) && firstIndex.get(x) === i).length : null;
      // later sentences where this word, already met, stands beside a new word being met for the first time
      const carried = i === undefined ? [] : [...new Set(work.slice(i + 1).flatMap((s, k) => (s.heads.has(h) ? [...s.heads].filter((x) => x !== h && isNew(x) && firstIndex.get(x) === i + 1 + k) : [])))];
      const uses = work.filter((s) => s.heads.has(h)).length;
      // sentences where it works beside another of this module's new words, met already or not
      const together = work.filter((s) => s.heads.has(h) && [...s.heads].some((x) => x !== h && isNew(x))).length;
      // new words of the next modules that are first met in a sentence built on this word
      const supports = laterModules.slice(0, lean).reduce((n, x) => n + [...firstMeet.get(x.position)].filter(([, heads]) => heads.has(h)).length, 0);
      const next = laterModules.slice(0, lean).filter((x) => usedIn.get(x.position).has(h)).length;
      const after = laterModules.filter((x) => usedIn.get(x.position).has(h)).length;
      return { id: h, lemma: hw.get(h).lemma, pos: hw.get(h).pos, first: first?.text ?? null, alone: first ? first.heads.size <= 1 : null, strangers, carried: carried.map((x) => hw.get(x).lemma), uses, together, supports, next, after, later_available: laterModules.length };
    });
    rows.push({
      position: m.position, module_key: m.moduleKey, unit_key: m.unitKey, kind: m.kind,
      items: items.length, used: used.size, fresh: fresh.length, untaught: untaught.length,
      new_share: used.size ? fresh.length / used.size : null, types, new_words: newHere.length, words,
    });
  }
  return rows;
}

/** One distribution line: median and quartiles of the new-word share over the lessons that use any word. */
export function shareSummary(rows) {
  const xs = rows.filter((x) => x.kind === 'lesson' && x.used > 0).map((x) => x.new_share);
  return { lessons: xs.length, median: median(xs), q1: quantile(xs, 0.25), q3: quantile(xs, 0.75), max: xs.length ? Math.max(...xs) : null };
}

/** Foundation counts over the new words of a set of written rows. */
export function foundationSummary(rows) {
  const ws = rows.flatMap((x) => x.words);
  const met = ws.filter((w) => w.first !== null);
  return {
    new_words: ws.length,
    never_in_a_sentence: ws.length - met.length,
    met_alone: met.filter((w) => w.alone).length,
    met_beside_another_new_word: met.filter((w) => w.strangers > 0).length,
    carried_a_later_new_word: met.filter((w) => w.carried.length > 0).length,
    never_beside_another_new_word: met.filter((w) => w.together === 0).length,
    supports_a_new_word_in_the_next_modules: ws.filter((w) => w.later_available > 0 && w.supports > 0).length,
    used_once_only: met.filter((w) => w.uses === 1).length,
    leaned_on_next: ws.filter((w) => w.later_available > 0 && w.next > 0).length,
    with_later_modules: ws.filter((w) => w.later_available > 0).length,
    never_used_again: ws.filter((w) => w.later_available >= 5 && w.after === 0).length,
  };
}

export { median, quantile, shortId };
