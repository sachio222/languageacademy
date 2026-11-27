// How fast a course order lets a learner build French, against other orders of the same items, at equal study
// time and at equal words. Nothing here names a language: the graph, the language's role table
// (method-roles.json) and its local frequency ranks are passed in.
//
// The items are what the course teaches through its last planned unit: every headword (a form counts toward its
// headword) and every pattern (construction, form table, fixed phrase). Words the Reference pages or the cognates
// open count as known from the start in every order and cost nothing. Every order teaches the same items once, and
// a pattern only after its needs and its pieces:
//   needs      the patterns its graph needs list
//   requires   the words its graph needs list
//   anyOf      the words that can carry it (detector headwords, frame verbs): at least one must be known
//
// Orders (sequences of item ids; pack() groups them into lessons under the same caps):
//   textbookOrder   level by level (A1, A2, B1, ...): inside a level, words by frequency with the level's patterns
//                   spread evenly among them
//   frequencyOrder  words by frequency; a pattern once its pieces are known, never more patterns at a given word
//                   count than the textbook order holds at that count (opts.pace: false lifts that limit)
//   ruleOrder       the teaching method's rule: each lesson teaches the pattern with the largest gain in sentences,
//                   weighted by frequency, among patterns whose needs are known, then fills with the most useful words
//   randomOrder     items in a seeded random order, each pattern pulled back behind what it needs
//
// Measures, after every lesson (simulate):
//   minutes    study time so far: each lesson costs cost.c0 + cost.cw per new word + cost.cp per new pattern, unless
//              it carries its own minutes; cost.unit more after every cost.every lessons (reading, practice, exam).
//              A lesson marked extra (a reading's word table) costs only its items and counts toward no unit
//   patterns   patterns known (fixed phrases and form tables left out)
//   reach      sentence shapes: every known word in every known pattern whose slot takes it
//   core       share of each level list (words and patterns) known
// No frequency value leaves this file: z is used for ordering and never written to a result.
import { roles } from './method-score.mjs';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const levelIndex = (l) => { const i = LEVELS.indexOf(l); return i < 0 ? 3 : i; };

/** A word's weight from its frequency rank (1 = most common): about 7 for the most common, 1 for unknown. */
export const weightOfRank = (rank) => (rank ? Math.max(1, 7 - Math.log10(rank)) : 1);

/**
 * The items a course teaches, as the orders and measures read them.
 * taughtAt: Map<id, position>; free: Set<headword id> known from the start; ranks: Map<lemma, rank> | null;
 * core: { [level]: { words: [id], constructions: [id] } }.
 */
export function universe({ graph, table, taughtAt, free = new Set(), ranks = null, core = {} }) {
  const r = roles(graph, table);
  const formOf = new Map((graph.forms ?? []).map((f) => [f.id, f.of]));
  const wordAt = new Map();
  for (const [id, p] of taughtAt) {
    const h = r.hw.has(id) ? id : formOf.get(id);
    if (!h || !r.hw.has(h) || free.has(h)) continue;
    if (!wordAt.has(h) || p < wordAt.get(h)) wordAt.set(h, p);
  }
  const words = new Map();
  for (const [id, at] of wordAt) {
    const h = r.hw.get(id);
    const rank = ranks ? (ranks.get(h.lemma) ?? ranks.get(String(h.lemma).toLowerCase())) : undefined;
    words.set(id, { id, lemma: h.lemma, cls: r.cls(h), level: levelIndex(h.cefr), z: weightOfRank(rank), at });
  }
  const freeWords = [...free].filter((id) => r.hw.has(id));
  const patterns = new Map();
  for (const [id, at] of taughtAt) {
    const p = r.patterns.get(id);
    if (!p) continue;
    const graphNeeds = [...(graph.constructions ?? []), ...(graph.paradigms ?? [])].find((c) => c.id === id)?.needs ?? [];
    const requires = graphNeeds.filter((n) => words.has(n));
    const carriers = (p.carriers ?? []).filter((h) => !requires.includes(h));
    const anyOf = carriers.some((h) => free.has(h)) ? [] : carriers.filter((h) => words.has(h));
    patterns.set(id, { id, role: p.role, counted: p.role !== 'chunk' && !p.paradigm, needs: p.needs.filter((n) => taughtAt.has(n) && r.patterns.has(n)), requires, anyOf, level: levelIndex(p.cefr), at });
  }
  const accepts = new Map();
  const pool = [...words.keys(), ...freeWords];
  for (const [id] of patterns) {
    const p = r.patterns.get(id);
    accepts.set(id, new Set(pool.filter((w) => r.accepts(p, r.hw.get(w)))));
  }
  const coreSets = Object.fromEntries(Object.entries(core).map(([lv, c]) => [lv, { words: new Set(c.words ?? []), constructions: new Set(c.constructions ?? []) }]));
  return { words, patterns, free: new Set(freeWords), accepts, core: coreSets };
}

/** A sequence that holds `id` and everything it needs before it (needs, required words, one carrier). */
function emitter(U) {
  const done = new Set();
  const seq = [];
  const best = (ids) => [...ids].sort((a, b) => U.words.get(b).z - U.words.get(a).z || (a < b ? -1 : 1))[0];
  const emit = (id, guard = new Set()) => {
    if (done.has(id) || guard.has(id)) return;
    guard.add(id);
    const p = U.patterns.get(id);
    if (p) {
      for (const n of p.needs) emit(n, guard);
      for (const w of p.requires) emit(w, guard);
      if (p.anyOf.length && !p.anyOf.some((w) => done.has(w))) emit(best(p.anyOf), guard);
    }
    done.add(id);
    seq.push(id);
  };
  return { emit, done, seq };
}

/** seq with the extra items placed evenly through it, each after what it needs. */
function spreadExtras(base, U, extras) {
  const { emit, seq } = emitter(U);
  const due = extras.map((id, i) => [Math.round(((i + 1) * base.length) / (extras.length + 1)), id]);
  base.forEach((id, j) => {
    for (const [t, x] of due) if (t <= j) emit(x);
    emit(id);
  });
  for (const [, x] of due) emit(x);
  return seq;
}

const byWordFrequency = (U) => [...U.words.values()].sort((a, b) => b.z - a.z || (a.id < b.id ? -1 : 1)).map((w) => w.id);

export function textbookOrder(U) {
  const { emit, seq } = emitter(U);
  const top = Math.max(0, ...[...U.words.values()].map((w) => w.level), ...[...U.patterns.values()].map((p) => p.level));
  for (let lv = 0; lv <= top; lv += 1) {
    const ws = [...U.words.values()].filter((w) => w.level === lv).sort((a, b) => b.z - a.z || (a.id < b.id ? -1 : 1)).map((w) => w.id);
    const ps = [...U.patterns.values()].filter((p) => p.level === lv).sort((a, b) => a.at - b.at).map((p) => p.id);
    // spread the level's patterns evenly among its words
    const every = ps.length ? Math.max(1, Math.floor(ws.length / (ps.length + 1))) : Infinity;
    let pi = 0;
    ws.forEach((w, i) => {
      if (pi < ps.length && i > 0 && i % every === 0) emit(ps[pi++]);
      emit(w);
    });
    while (pi < ps.length) emit(ps[pi++]);
  }
  return seq;
}

/** Counted patterns the textbook order holds before its (n+1)-th word, for every n. */
function textbookPace(U) {
  const pace = [0];
  let pats = 0;
  for (const id of textbookOrder(U)) {
    if (U.words.has(id)) pace.push(pats);
    else if (U.patterns.get(id).counted) pats += 1;
  }
  pace.push(pats);
  return pace; // pace[n]: patterns allowed with n words known (pace[last] = all)
}

export function frequencyOrder(U, { pace = true } = {}) {
  const { emit, done, seq } = emitter(U);
  const cap = pace ? textbookPace(U) : null;
  const tb = new Map(textbookOrder(U).map((id, i) => [id, i]));
  const waiting = [...U.patterns.values()].sort((a, b) => tb.get(a.id) - tb.get(b.id));
  let words = 0;
  let counted = 0;
  // A need that is a form table or fixed phrase is taught with the pattern that needs it (emit pulls it in).
  const pullable = (id, seen = new Set()) => {
    if (done.has(id)) return true;
    const q = U.patterns.get(id);
    if (!q || q.counted || seen.has(id)) return false;
    seen.add(id);
    return q.needs.every((n) => pullable(n, seen)) && q.requires.every((w) => done.has(w));
  };
  const ready = (p) => p.needs.every((n) => pullable(n)) && p.requires.every((w) => done.has(w)) && (!p.anyOf.length || p.anyOf.some((w) => done.has(w)));
  const release = (final) => {
    let moved = true;
    while (moved) {
      moved = false;
      for (const p of waiting) {
        if (done.has(p.id) || !p.counted || !ready(p)) continue;
        if (p.counted && cap && !final && counted >= cap[Math.min(words, cap.length - 1)]) continue;
        emit(p.id);
        if (p.counted) counted += 1;
        moved = true;
      }
    }
  };
  for (const w of byWordFrequency(U)) {
    if (!done.has(w)) { emit(w); words += 1; }
    release(false);
  }
  release(true);
  for (const p of waiting) if (p.counted && !done.has(p.id)) emit(p.id);
  // fixed phrases and form tables nothing pulled in: spread evenly, as every generated order does
  return spreadExtras([...seq], U, waiting.filter((p) => !done.has(p.id)).map((p) => p.id));
}

export function ruleOrder(U, { beta = 0.1, words: perLesson = 12 } = {}) {
  const { emit, done, seq } = emitter(U);
  const known = () => new Set([...U.free, ...[...U.words.keys()].filter((w) => done.has(w))]);
  // A pattern is eligible when its needs are known, or are form tables or fixed phrases its lesson can teach first.
  const pullable = (id, seen = new Set()) => {
    if (done.has(id)) return true;
    const q = U.patterns.get(id);
    if (!q || q.counted || seen.has(id)) return false;
    seen.add(id);
    return q.needs.every((n) => pullable(n, seen));
  };
  const eligible = () => [...U.patterns.values()].filter((p) => !done.has(p.id) && p.counted && p.needs.every((n) => pullable(n)));
  const neededBy = new Map();
  for (const p of U.patterns.values()) for (const n of p.needs) { if (!neededBy.has(n)) neededBy.set(n, []); neededBy.get(n).push(p); }
  const present = (id, have) => [...U.accepts.get(id)].reduce((s, w) => s + (have.has(w) ? (U.words.get(w)?.z ?? 1) : 0), 0);
  const gain = (p, have) => {
    let g = present(p.id, have);
    g += beta * [...U.accepts.get(p.id)].reduce((s, w) => s + (have.has(w) ? 0 : (U.words.get(w)?.z ?? 1)), 0);
    for (const q of neededBy.get(p.id) ?? []) {
      if (done.has(q.id)) continue;
      const missing = q.needs.filter((n) => !done.has(n)).length;
      if (missing) g += present(q.id, have) / missing;
    }
    return g;
  };
  const value = (w, knownPats) => U.words.get(w).z * (1 + knownPats.filter((p) => U.accepts.get(p).has(w)).length);
  while (seq.length < U.words.size + U.patterns.size) {
    const have = known();
    const before = seq.length;
    const cands = eligible();
    if (cands.length) {
      const pick = cands.map((p) => [p, gain(p, have)]).sort((a, b) => b[1] - a[1] || a[0].level - b[0].level || (a[0].id < b[0].id ? -1 : 1))[0][0];
      emit(pick.id);
    }
    const brought = seq.slice(before).filter((id) => U.words.has(id)).length;
    const knownPats = [...U.patterns.values()].filter((p) => p.counted && done.has(p.id)).map((p) => p.id);
    const fill = [...U.words.keys()].filter((w) => !done.has(w)).sort((a, b) => value(b, knownPats) - value(a, knownPats) || (a < b ? -1 : 1));
    for (const w of fill.slice(0, Math.max(0, perLesson - brought))) emit(w);
    if (!cands.length && !fill.length) break;
  }
  for (const p of U.patterns.values()) if (p.counted && !done.has(p.id)) emit(p.id);
  return spreadExtras([...seq], U, [...U.patterns.values()].filter((p) => !done.has(p.id)).map((p) => p.id));
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomOrder(U, seed) {
  const rnd = mulberry32(seed);
  const all = [...U.words.keys(), ...U.patterns.keys()].sort();
  for (let i = all.length - 1; i > 0; i -= 1) { const j = Math.floor(rnd() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  const { emit, seq } = emitter(U);
  for (const id of all) emit(id);
  return seq;
}

/** Lessons of at most caps.words new words and caps.patterns new patterns, in sequence order. */
export function pack(seq, U, caps = { words: 12, patterns: 2 }) {
  const lessons = [];
  let cur = null;
  for (const id of seq) {
    const isWord = U.words.has(id);
    if (!isWord && !U.patterns.has(id)) continue;
    if (!cur || (isWord ? cur.words.length >= caps.words : cur.patterns.length >= caps.patterns)) {
      cur = { words: [], patterns: [], order: [] };
      lessons.push(cur);
    }
    (isWord ? cur.words : cur.patterns).push(id);
    cur.order.push(id);
  }
  return lessons;
}

/** Items taught before what they need: [] for a teachable order. */
export function violations(lessons, U) {
  const at = new Map();
  lessons.flatMap((l) => l.order).forEach((id, i) => at.set(id, i));
  const out = [];
  for (const [id, i] of at) {
    const p = U.patterns.get(id);
    if (!p) continue;
    const late = [...p.needs, ...p.requires].filter((n) => !(at.get(n) < i));
    if (p.anyOf.length && !p.anyOf.some((w) => at.get(w) < i)) late.push(`one of ${p.anyOf.join('|')}`);
    if (late.length) out.push(`${id} before ${late.join(', ')}`);
  }
  return out;
}

/** The measures after every lesson. */
export function simulate(lessons, U, cost) {
  const words = new Set(U.free);
  const pats = [];
  let minutes = 0;
  let reach = 0;
  let taught = 0;
  const levels = Object.keys(U.core);
  const coreTotal = Object.fromEntries(levels.map((lv) => [lv, U.core[lv].words.size + U.core[lv].constructions.size]));
  const coreHave = Object.fromEntries(levels.map((lv) => [lv, [...U.core[lv].words].filter((w) => words.has(w)).length]));
  const out = [];
  let teaching = 0;
  lessons.forEach((l, i) => {
    minutes += l.minutes ?? ((l.extra ? 0 : cost.c0) + cost.cw * l.words.length + cost.cp * l.patterns.length);
    if (!l.extra) teaching += 1;
    for (const id of l.order) {
      if (U.words.has(id)) {
        if (words.has(id)) continue;
        words.add(id);
        taught += 1;
        reach += pats.filter((p) => U.accepts.get(p).has(id)).length;
        for (const lv of levels) if (U.core[lv].words.has(id)) coreHave[lv] += 1;
      } else {
        const p = U.patterns.get(id);
        if (p.counted) {
          pats.push(id);
          for (const w of U.accepts.get(id)) if (words.has(w)) reach += 1;
        }
        for (const lv of levels) if (U.core[lv].constructions.has(id)) coreHave[lv] += 1;
      }
    }
    if (l.minutes === undefined && !l.extra && cost.unit && cost.every && teaching % cost.every === 0) minutes += cost.unit;
    out.push({
      lesson: i + 1, minutes: Math.round(minutes * 10) / 10, words: taught, patterns: pats.length, reach,
      core: Object.fromEntries(levels.map((lv) => [lv, coreTotal[lv] ? Math.round((coreHave[lv] / coreTotal[lv]) * 1000) / 1000 : 0])),
    });
  });
  return out;
}

/** Least squares fit of minutes = c0 + cw * words + cp * patterns over rows. */
export function fitCost(rows) {
  const X = rows.map((r) => [1, r.words, r.patterns]);
  const y = rows.map((r) => r.minutes);
  const A = [0, 1, 2].map((i) => [0, 1, 2].map((j) => X.reduce((s, x) => s + x[i] * x[j], 0)));
  const b = [0, 1, 2].map((i) => X.reduce((s, x, k) => s + x[i] * y[k], 0));
  // Gaussian elimination on the 3 x 3 normal equations
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < 3; c += 1) {
    let piv = c;
    for (let r = c + 1; r < 3; r += 1) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    [M[c], M[piv]] = [M[piv], M[c]];
    for (let r = 0; r < 3; r += 1) {
      if (r === c || !M[c][c]) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k < 4; k += 1) M[r][k] -= f * M[c][k];
    }
  }
  const [c0, cw, cp] = [0, 1, 2].map((i) => (M[i][i] ? M[i][3] / M[i][i] : 0));
  const mean = y.reduce((s, v) => s + v, 0) / (y.length || 1);
  const ssTot = y.reduce((s, v) => s + (v - mean) ** 2, 0);
  const ssRes = rows.reduce((s, r) => s + (r.minutes - (c0 + cw * r.words + cp * r.patterns)) ** 2, 0);
  return { c0, cw, cp, r2: ssTot ? 1 - ssRes / ssTot : 1 };
}

/** The value of `field` at the last sample whose `axis` is at most x (0 before the first). */
export function valueAt(samples, axis, x, field) {
  let v = 0;
  for (const s of samples) { if (s[axis] <= x) v = s[field]; else break; }
  return v;
}

const pick = (s) => ({ minutes: s.minutes, words: s.words, patterns: s.patterns, reach: s.reach, core: s.core });

/** Each order's measures at the given study hours and word counts (null where an order never gets that far). */
export function summarize(series, { hours = [10, 25, 50, 100, 200], words = [100, 300, 600, 1000] } = {}) {
  const out = {};
  for (const [name, samples] of Object.entries(series)) {
    const last = samples.at(-1);
    out[name] = {
      total: { hours: Math.round((last.minutes / 60) * 10) / 10, words: last.words, patterns: last.patterns, reach: last.reach },
      hours: hours.map((h) => {
        const s = [...samples].reverse().find((x) => x.minutes <= h * 60);
        return { hours: h, ...(s ? pick(s) : { minutes: 0, words: 0, patterns: 0, reach: 0, core: {} }) };
      }),
      words: words.map((w) => {
        const s = [...samples].reverse().find((x) => x.words <= w);
        if (!s || last.words < w) return { words: w, hours: null };
        return { ...pick(s), words: w, hours: Math.round((s.minutes / 60) * 10) / 10 };
      }),
    };
  }
  return out;
}
