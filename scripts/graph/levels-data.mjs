// CEFR levels of graph nodes and the frozen core lists (curriculum-graph/core/levels/<lang>-<level>.json).
// Headwords, constructions and paradigms store their level in `cefr`, with `cefrSource` saying how it was decided.
// A form's level is never stored: it is the higher of its headword's level and the level of the construction that
// builds its cell (CELL_CONSTRUCTIONS). Present-tense, past-participle and agreement cells add nothing, so those
// forms take the headword's level.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseId } from './ids.mjs';
import { LEVELS } from './functions.mjs';

// How a level was decided. Every level is our own grading; the sources only inform it.
//   frequency + Eaquals: frequency rank in Lexique 3.83 and the vocabulary themes and functions the Eaquals
//     inventory lists for each level, with FLELex as a cross-check.
//   Eaquals grammar: the level where the Eaquals inventory lists the grammar point as key.
//   judgment: no source settles it (fixed phrases, course-specific patterns, words a source places oddly).
export const CEFR_SOURCES = ['agent: frequency + Eaquals', 'agent: Eaquals grammar', 'agent: judgment'];

// Levels with a frozen core list.
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

const rank = (level) => LEVELS.indexOf(level);
const higher = (a, b) => (rank(a) >= rank(b) ? a : b);

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

const storedLevel = (node) => (rank(node?.cefr) >= 0 ? node.cefr : null);

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
  const headword = storedLevel(graph.nodes.get(parts.headwordId));
  const cxId = cellConstruction(parts.cell);
  if (!cxId) return headword;
  const cx = storedLevel(graph.nodes.get(cxId));
  return headword && cx ? higher(headword, cx) : null;
}

// The frozen core lists of a language that exist, in CORE_LEVELS order:
// [{ level, lang, frozen, words: [fr:lex:...], constructions: [fr:cx:...] }].
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
