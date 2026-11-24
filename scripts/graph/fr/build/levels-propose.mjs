// One-off helper that proposed a CEFR level for every French headword, for a person (or agent) to decide from.
// It is NOT part of the reproducible build: the committed levels in headwords.json are decisions, not this
// script's output, and nothing here reads or writes the committed data.
//
// It reads three downloads kept outside the repository, in the git-excluded workspace folder (default
// .superpowers/sdd/2026-11-24-language-graph-levels/sources/):
//   Lexique383.tsv          Lexique 3.83 (lexique.org, CC BY-SA 4.0): lemma frequency in films and books
//   FleLex_TT_Beacco.tsv    FLELex/Beacco (cental.uclouvain.be/cefrlex, CC BY-NC-SA 4.0): frequency per level in
//                           textbooks, plus a level derived against the Beacco reference books
//   FleLex_TT.csv           FLELex-TT, same frequencies without the derived level (optional)
// and writes a tab-separated proposal table to the same workspace folder (default levels-proposal.tsv):
//   id, lemma, pos, lexiqueRank, flelexFirst (first level with a frequency above zero), flelexBeacco,
//   functionLevel (lowest level of a function whose French exponent uses the word), proposed.
// FLELex is non-commercial and Lexique is share-alike, so neither their values nor this table may be committed.
//
// Proposal rule: a frequency band from the Lexique rank (A1 to 1,000, A2 to 2,000, B1 to 4,000, B2 to 8,000,
// C1 beyond), pulled down to the function level when an A1 or A2 function needs the word and the band is at
// most one level higher; letters of the alphabet are A1. Every proposal was then reviewed by hand against the
// Eaquals vocabulary themes.
// Usage: node scripts/graph/fr/build/levels-propose.mjs [--sources <dir>] [--out <file>]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { loadGraph } from '../../load.mjs';
import { LEVELS } from '../../functions.mjs';
import { REPO } from './lib.mjs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
};
const WORKSPACE = join(REPO, '.superpowers/sdd/2026-11-24-language-graph-levels');
const SOURCES = arg('--sources', join(WORKSPACE, 'sources'));
const OUT = resolve(arg('--out', join(WORKSPACE, 'levels-proposal.tsv')));
const inside = (dir) => OUT.startsWith(resolve(dir) + sep);
if (!inside(WORKSPACE) && !inside(tmpdir())) {
  throw new Error(`levels-propose: write the proposal into ${WORKSPACE} or ${tmpdir()}, not to ${OUT}`);
}

const graph = loadGraph(join(REPO, 'curriculum-graph'), 'fr');

function readTsv(file) {
  const path = join(SOURCES, file);
  if (!existsSync(path)) {
    console.warn(`levels-propose: ${path} is missing, its column stays empty`);
    return [];
  }
  const [head, ...rows] = readFileSync(path, 'utf8').split(/\r?\n/).filter(Boolean).map((l) => l.split('\t'));
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

// Lexique cgram and FLELex tags for each of our parts of speech.
const LEXIQUE_POS = {
  noun: ['NOM'], verb: ['VER', 'AUX'], adjective: ['ADJ', 'ADJ:num', 'ADJ:ind', 'ADJ:pos', 'ADJ:dem', 'ADJ:int'],
  adverb: ['ADV'], preposition: ['PRE'], conjunction: ['CON'], article: ['ART:def', 'ART:ind'],
  pronoun: ['PRO:per', 'PRO:ind', 'PRO:pos', 'PRO:rel', 'PRO:int', 'PRO:dem'],
  determiner: ['ADJ:pos', 'ADJ:dem', 'ADJ:ind', 'ADJ:int', 'ADJ:num', 'ART:def', 'ART:ind'],
  interjection: ['ONO'], interrogative: ['ADV', 'PRO:int', 'ADJ:int'],
};
const FLELEX_POS = {
  noun: ['NOM'], verb: ['VER'], adjective: ['ADJ'], adverb: ['ADV'], preposition: ['PRP', 'PRP:det'],
  conjunction: ['KON'], article: ['DET:ART'], pronoun: ['PRO'], determiner: ['DET:POS', 'DET:ART', 'ADJ', 'PRO'],
  interjection: ['INT'], interrogative: ['ADV', 'PRO', 'ADJ'],
};

// Lexique writes the œ ligature as oe; FLELex keeps it.
const lemmaOf = (h) => h.lemma.replace(/^(?:se |s['’])/, '').toLowerCase();
const lexiqueKey = (h) => lemmaOf(h).replace(/œ/g, 'oe');

// Lexique: lemma frequency (mean of films and books, per million) for each lemma and cgram; rank by lemma total.
const lexFreq = new Map(); // lemma -> Map(cgram -> freq)
const lemmaOfForm = new Map(); // written form -> lemma, for headwords such as amie or vacances that Lexique files under ami, vacance
for (const r of readTsv('Lexique383.tsv')) {
  if (!lemmaOfForm.has(r.ortho)) lemmaOfForm.set(r.ortho, r.lemme);
  const f = (Number(r.freqlemfilms2) + Number(r.freqlemlivres)) / 2;
  const byCat = lexFreq.get(r.lemme) ?? new Map();
  byCat.set(r.cgram, Math.max(byCat.get(r.cgram) ?? 0, f));
  lexFreq.set(r.lemme, byCat);
}
const totals = [...lexFreq.values()].map((m) => [...m.values()].reduce((a, b) => a + b, 0)).sort((a, b) => b - a);
const rankOf = (freq) => {
  let lo = 0;
  let hi = totals.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (totals[mid] > freq) lo = mid + 1;
    else hi = mid;
  }
  return lo + 1;
};
function lexiqueRank(h) {
  const byCat = lexFreq.get(lexiqueKey(h)) ?? lexFreq.get(lemmaOfForm.get(lexiqueKey(h)));
  if (!byCat) return null;
  const cats = LEXIQUE_POS[h.pos] ?? [];
  const own = cats.reduce((sum, c) => sum + (byCat.get(c) ?? 0), 0);
  const freq = own > 0 ? own : [...byCat.values()].reduce((a, b) => a + b, 0);
  return freq > 0 ? rankOf(freq) : null;
}

// FLELex: first level with a frequency above zero, and the Beacco-derived level.
const FREQ_COLS = ['freq_A1', 'freq_A2', 'freq_B1', 'freq_B2', 'freq_C1', 'freq_C2'];
const flelex = new Map(); // lemma -> [{ tag, first, beacco }]
for (const [file, hasLevel] of [['FleLex_TT_Beacco.tsv', true], ['FleLex_TT.csv', false]]) {
  for (const r of readTsv(file)) {
    const list = flelex.get(r.word) ?? [];
    let entry = list.find((e) => e.tag === r.tag);
    if (!entry) list.push((entry = { tag: r.tag, first: null, beacco: null }));
    const i = FREQ_COLS.findIndex((c) => Number(r[c]) > 0);
    entry.first ??= i >= 0 ? LEVELS[i] : null;
    if (hasLevel) entry.beacco = r.level || null;
    flelex.set(r.word, list);
  }
}
function flelexFor(h) {
  const list = flelex.get(lemmaOf(h)) ?? [];
  const tags = FLELEX_POS[h.pos] ?? [];
  return list.find((e) => tags.includes(e.tag)) ?? list[0] ?? { first: null, beacco: null };
}

// Lowest level of a function whose exponent names the headword.
const fnLevel = new Map(graph.functions.map((f) => [f.id, f.cefr]));
const usedAt = new Map();
for (const e of graph.exponents) {
  for (const id of e.nodes) {
    const l = fnLevel.get(e.function);
    if (!usedAt.has(id) || LEVELS.indexOf(l) < LEVELS.indexOf(usedAt.get(id))) usedAt.set(id, l);
  }
}

const band = (rank) => (rank === null ? null : rank <= 1000 ? 'A1' : rank <= 2000 ? 'A2' : rank <= 4000 ? 'B1' : rank <= 8000 ? 'B2' : 'C1');
function propose(h, rank) {
  if (h.pos === 'alphabet') return 'A1';
  const b = band(rank);
  const f = usedAt.get(h.id);
  if (!b) return f ?? null;
  if (f && LEVELS.indexOf(b) - LEVELS.indexOf(f) === 1) return f;
  return b;
}

const rows = [['id', 'lemma', 'pos', 'lexiqueRank', 'flelexFirst', 'flelexBeacco', 'functionLevel', 'proposed']];
for (const h of graph.headwords) {
  const rank = lexiqueRank(h);
  const fl = flelexFor(h);
  rows.push([h.id, h.lemma, h.pos, rank ?? '', fl.first ?? '', fl.beacco ?? '', usedAt.get(h.id) ?? '', propose(h, rank) ?? '']);
}
writeFileSync(OUT, rows.map((r) => r.join('\t')).join('\n') + '\n');
const counts = {};
for (const r of rows.slice(1)) counts[r[7] || 'none'] = (counts[r[7] || 'none'] ?? 0) + 1;
console.log(`levels-propose: ${rows.length - 1} headwords written to ${OUT}`, counts);
