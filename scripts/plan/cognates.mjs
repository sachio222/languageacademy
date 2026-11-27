// Near-cognate families: a target-language ending that regularly answers a native-language one, so a short guide lets
// a learner recognise every word of the family. Nothing here names a language: the families, the glosses and the
// false friends come from the pair folder (curriculum-graph/pairs/<native>-<lang>/near-cognates.json).
//
//   familyMembers({ families, headwords, glosses, falseFriends }) -> Map<family id, [headword id]>
//     A headword is a member when its lemma has the family's target ending, its part of speech is one the family
//     lists, it is no false friend, and one of its native glosses has the family's native ending on a stem that
//     matches the target stem (stemsMatch).
//   stemsMatch(a, b): the stems share their first min(4, shorter length) letters once accents are folded, or differ
//     by at most one letter in five.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ç/g, 'c');

function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j += 1) d[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  }
  return d[a.length][b.length];
}

export function stemsMatch(a, b) {
  const x = fold(a);
  const y = fold(b);
  if (!x || !y) return false;
  if (x === y) return true;
  const n = Math.min(4, x.length, y.length);
  if (n >= 3 && x.slice(0, n) === y.slice(0, n)) return true;
  const longest = Math.max(x.length, y.length);
  return longest >= 3 && editDistance(x, y) <= Math.floor(longest / 5);
}

/** Every native gloss of a headword: its senses, then the pair's gloss file, split on / , ; and parentheses dropped. */
export function glossesOf(h, pairGlosses = {}) {
  const raw = [...(h.senses ?? []).map((s) => s.gloss).filter(Boolean), pairGlosses[h.id]].filter(Boolean);
  return raw.flatMap((g) => String(g).replace(/\([^)]*\)/g, ' ').split(/[/,;]| or /)).map((g) => g.trim().toLowerCase()).filter(Boolean);
}

/** The stem of a word once an ending regex is cut off, or null when the ending is absent. */
const cut = (word, re) => { const m = new RegExp(re).exec(word); return m ? word.slice(0, m.index) : null; };

export function familyMembers({ families, headwords, glosses = {}, falseFriends = [] }) {
  const ff = new Set(falseFriends.map((f) => fold(f.lemma ?? f.id?.split(':').pop() ?? '')));
  const out = new Map(families.map((f) => [f.id, []]));
  for (const h of headwords) {
    const lemma = String(h.lemma);
    if (/\s/.test(lemma) || ff.has(fold(lemma))) continue;
    for (const f of families) {
      if (f.pos && !f.pos.includes(h.pos)) continue;
      const frStem = cut(fold(lemma), fold(f.fr));
      if (frStem === null || frStem.length < 2) continue;
      const hit = glossesOf(h, glosses).some((g) => {
        if (f.id === 'er-verbs') {
          const m = /^to ([a-z]+)$/.exec(g);
          if (!m) return false;
          const en = m[1].replace(/e$/, '');
          return stemsMatch(frStem.replace(/e$/, ''), en) && Math.abs(frStem.length - en.length) <= 3;
        }
        return g.split(/\s+/).some((w) => { const s = cut(w, f.en); return s !== null && s.length >= 2 && stemsMatch(frStem, s); });
      });
      if (hit) { out.get(f.id).push(h.id); break; }
    }
  }
  return out;
}

/** The pair's near-cognate data, with members computed from the graph, or null when the pair has none. */
export function readFamilies(repoRoot, native, lang, graph) {
  const dir = join(repoRoot, 'curriculum-graph', 'pairs', `${native}-${lang}`);
  const file = join(dir, 'near-cognates.json');
  if (!existsSync(file)) return null;
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const gl = existsSync(join(dir, 'glosses.json')) ? JSON.parse(readFileSync(join(dir, 'glosses.json'), 'utf8')).glosses ?? {} : {};
  const cog = existsSync(join(dir, 'cognates.json')) ? JSON.parse(readFileSync(join(dir, 'cognates.json'), 'utf8')) : {};
  const falseFriends = [...data.falseFriends, ...(cog.falseFriends ?? []).map((w) => ({ lemma: graph.headwords.find((h) => h.id === w.id)?.lemma ?? w.id.split(':').pop() }))];
  const members = familyMembers({ families: data.families, headwords: graph.headwords, glosses: gl, falseFriends });
  return { families: data.families, falseFriends: data.falseFriends, members };
}

/**
 * How many words beyond the graph a family plausibly covers, as a marked estimate: lemmas of the language's local
 * frequency list within its `top` most common that have the family's ending and are not headwords, times the share of
 * the graph's headwords with that ending that the family covers. Returns counts only, never a frequency value.
 */
export function estimateBeyond({ families, members, headwords, ranks, top = 20000 }) {
  if (!ranks) return null;
  const inGraph = new Set(headwords.map((h) => fold(h.lemma)));
  const out = {};
  for (const f of families) {
    const re = new RegExp(fold(f.fr));
    const withEnding = headwords.filter((h) => !/\s/.test(h.lemma) && re.test(fold(h.lemma))).length;
    const share = withEnding ? (members.get(f.id)?.length ?? 0) / withEnding : 0;
    let candidates = 0;
    for (const [lemma, rank] of ranks) if (rank <= top && !/\s/.test(lemma) && re.test(fold(lemma)) && !inGraph.has(fold(lemma))) candidates += 1;
    out[f.id] = { in_graph: members.get(f.id)?.length ?? 0, beyond_estimate: Math.round(candidates * share) };
  }
  return out;
}
