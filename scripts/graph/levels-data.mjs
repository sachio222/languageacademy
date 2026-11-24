// CEFR levels of graph nodes and the frozen core lists (curriculum-graph/core/levels/<lang>-<level>.json).
// Headwords, constructions and paradigms store their level in `cefr`, with `cefrSource` saying how it was decided.
// A form's level is never stored: it is the higher of its headword's level and the level of the construction that
// builds its cell (CELL_CONSTRUCTIONS). Present-tense, past-participle and agreement cells add nothing, so those
// forms take the headword's level. A form spelled like another cell of the same headword takes the lowest level
// among those cells (donne is a present form before it is a subjunctive one), and the polite conditionals of
// POLITE_CONDITIONALS take the level of the je voudrais phrase.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseId } from './ids.mjs';
import { buildFormIndex } from './fr/forms.mjs';

// CEFR levels in order, A1 lowest. Every level list in the checker comes from here.
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// How a level was decided. Every level is our own grading; the sources only inform it.
//   frequency + Eaquals: frequency rank in Lexique 3.83 and the vocabulary themes and functions the Eaquals
//     inventory lists for each level, with FLELex as a cross-check.
//   Eaquals grammar: the level where the Eaquals inventory lists the grammar point as key.
//   judgment: no source settles it (fixed phrases, course-specific patterns, words a source places oddly).
export const CEFR_SOURCES = ['agent: frequency + Eaquals', 'agent: Eaquals grammar', 'agent: judgment'];

// Levels with a core list.
export const CORE_LEVELS = ['A1', 'A2', 'B1'];

// Tense prefix of a form cell -> the construction that builds that tense. The subjunctive enters with il faut que,
// the first subjunctive trigger a learner meets; the present participle with the gérondif (en parlant).
export const CELL_CONSTRUCTIONS = {
  sbjv: 'fr:cx:subj.il-faut-que',
  cond: 'fr:cx:conditionnel-present',
  fut: 'fr:cx:futur-simple',
  impf: 'fr:cx:imparfait',
  prsptcp: 'fr:cx:gerondif',
};

// Conditional cells a learner meets as polite requests before the conditional tense: je voudrais, tu voudrais,
// vous voudriez, j'aimerais, tu aimerais, pourriez-vous, on pourrait. They take the level of this construction.
export const POLITE_CONSTRUCTION = 'fr:cx:chunk.je-voudrais';
export const POLITE_CONDITIONALS = {
  'fr:lex:vouloir': ['cond.1sg', 'cond.2sg', 'cond.2pl'],
  'fr:lex:aimer': ['cond.1sg', 'cond.2sg'],
  'fr:lex:pouvoir': ['cond.2pl', 'cond.3sg'],
};

const rank = (level) => LEVELS.indexOf(level);
const higher = (a, b) => (rank(a) >= rank(b) ? a : b);
const lower = (a, b) => (rank(a) <= rank(b) ? a : b);

// The construction that builds a form cell such as "sbjv.1sg", or null when the cell takes the headword's level.
export function cellConstruction(cell) {
  return CELL_CONSTRUCTIONS[String(cell).split('.')[0]] ?? null;
}

// An irregular form is a node with `of` and `cell`. A regular form has an ID (fr:form:<headword key>.<cell>) but
// no node, so split the key at the dot where the headword part names a headword: fr:form:savoir.verb.prs.1sg.
function formParts(graph, id, key) {
  const node = graph.nodes.get(id);
  if (node?.of) return { headwordId: node.of, cell: node.cell };
  const parts = key.split('.');
  for (let i = parts.length - 1; i >= 1; i--) {
    const headwordId = `${parseId(id).lang}:lex:${parts.slice(0, i).join('.')}`;
    if (graph.nodes.has(headwordId)) return { headwordId, cell: parts.slice(i).join('.') };
  }
  return null;
}

// { headwordId, cell } of a form ID, regular or irregular, or null for any other ID.
export function formOf(graph, id) {
  try {
    const parsed = parseId(id);
    return parsed.kind === 'form' ? formParts(graph, id, parsed.key) : null;
  } catch {
    return null;
  }
}

const storedLevel = (node) => (rank(node?.cefr) >= 0 ? node.cefr : null);

// headwordId -> Map(cell -> written surface), from the same form index the checker reads with; built once per graph.
const SURFACES = new WeakMap();
function cellSurfaces(graph) {
  let byHeadword = SURFACES.get(graph);
  if (byHeadword) return byHeadword;
  const nodes = [...graph.nodes.values()];
  const index = buildFormIndex({
    ...graph,
    headwords: graph.headwords ?? nodes.filter((n) => n.lemma !== undefined && n.pos !== undefined),
    forms: graph.forms ?? nodes.filter((n) => n.of),
  });
  byHeadword = new Map();
  for (const readings of index.values()) {
    for (const r of readings) {
      if (!r.cell) continue;
      if (!byHeadword.has(r.headwordId)) byHeadword.set(r.headwordId, new Map());
      byHeadword.get(r.headwordId).set(r.cell, r.surface);
    }
  }
  SURFACES.set(graph, byHeadword);
  return byHeadword;
}

// Level of one cell of a headword, ignoring homographs.
function cellLevel(graph, headwordId, cell) {
  const headword = storedLevel(graph.nodes.get(headwordId));
  const cxId = POLITE_CONDITIONALS[headwordId]?.includes(cell) ? POLITE_CONSTRUCTION : cellConstruction(cell);
  if (!cxId) return headword;
  const cx = storedLevel(graph.nodes.get(cxId));
  return headword && cx ? higher(headword, cx) : null;
}

// Level of any node ID, or null when it has none: names never have one, and a form has none while its headword
// or its cell's construction lacks one.
export function nodeLevel(graph, id) {
  let parsed;
  try {
    parsed = parseId(id);
  } catch {
    return null;
  }
  if (parsed.kind !== 'form') return parsed.kind === 'name' ? null : storedLevel(graph.nodes.get(id));
  const parts = formParts(graph, id, parsed.key);
  if (!parts) return null;
  const own = cellLevel(graph, parts.headwordId, parts.cell);
  const surfaces = cellSurfaces(graph).get(parts.headwordId);
  const surface = surfaces?.get(parts.cell);
  if (!surface) return own;
  let best = own;
  for (const [cell, s] of surfaces) {
    if (cell === parts.cell || s !== surface) continue;
    const level = cellLevel(graph, parts.headwordId, cell);
    if (level) best = best ? lower(best, level) : level;
  }
  return best;
}

// The core lists of a language that exist, in CORE_LEVELS order:
// [{ level, lang, status, frozen, words: [fr:lex:...], constructions: [fr:cx:...] }]; status is draft and frozen null
// until the team approves a list.
export function readCoreLists(graphDir, lang) {
  const out = [];
  for (const level of CORE_LEVELS) {
    const path = join(graphDir, 'core', 'levels', `${lang}-${level}.json`);
    if (!existsSync(path)) continue;
    try {
      out.push(JSON.parse(readFileSync(path, 'utf8')));
    } catch (err) {
      throw new Error(`Core list is not valid JSON: ${path} (${err.message})`);
    }
  }
  return out;
}
