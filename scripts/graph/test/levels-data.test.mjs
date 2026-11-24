import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { LEVELS } from '../functions.mjs';
import { nodeLevel, cellConstruction, CELL_CONSTRUCTIONS, CEFR_SOURCES, CORE_LEVELS, readCoreLists } from '../levels-data.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const graphDir = join(repoRoot, 'curriculum-graph');

// A tiny graph: an A1 verb with an irregular present and subjunctive, a B1 verb, a regular -er verb, and the
// constructions that build the tense cells.
function miniGraph() {
  const nodes = new Map();
  const add = (n) => nodes.set(n.id, n);
  add({ id: 'fr:lex:etre', lemma: 'être', pos: 'verb', paradigms: [], cefr: 'A1', cefrSource: 'agent: judgment' });
  add({ id: 'fr:lex:parler', lemma: 'parler', pos: 'verb', paradigms: ['fr:cx:verb.er.present'], cefr: 'A1', cefrSource: 'agent: judgment' });
  add({ id: 'fr:lex:soutenir', lemma: 'soutenir', pos: 'verb', paradigms: [], cefr: 'B1', cefrSource: 'agent: judgment' });
  add({ id: 'fr:lex:savoir.verb', lemma: 'savoir', pos: 'verb', paradigms: [], cefr: 'A1', cefrSource: 'agent: judgment' });
  add({ id: 'fr:lex:sans-niveau', lemma: 'sans', pos: 'preposition', paradigms: [], cefr: null, cefrSource: null });
  add({ id: 'fr:form:etre.prs.1sg', of: 'fr:lex:etre', cell: 'prs.1sg', surface: 'suis' });
  add({ id: 'fr:form:etre.sbjv.1sg', of: 'fr:lex:etre', cell: 'sbjv.1sg', surface: 'sois' });
  add({ id: 'fr:form:etre.ptcp', of: 'fr:lex:etre', cell: 'ptcp', surface: 'été' });
  add({ id: 'fr:form:soutenir.sbjv.1sg', of: 'fr:lex:soutenir', cell: 'sbjv.1sg', surface: 'soutienne' });
  add({ id: 'fr:form:etre.cond.1sg', of: 'fr:lex:etre', cell: 'cond.1sg', surface: 'serais' });
  add({ id: 'fr:cx:verb.er.present', label: 'Present of -er verbs', rules: [], cefr: 'A1', cefrSource: 'agent: Eaquals grammar' });
  add({ id: 'fr:cx:subj.il-faut-que', label: 'il faut que', cefr: 'A2', cefrSource: 'agent: Eaquals grammar' });
  add({ id: 'fr:cx:imparfait', label: 'Imparfait', cefr: 'A2', cefrSource: 'agent: Eaquals grammar' });
  add({ id: 'fr:cx:futur-simple', label: 'Futur simple', cefr: 'A2', cefrSource: 'agent: Eaquals grammar' });
  add({ id: 'fr:cx:conditionnel-present', label: 'Conditionnel', cefr: null, cefrSource: null });
  add({ id: 'fr:cx:gerondif', label: 'Gérondif', cefr: 'B1', cefrSource: 'agent: Eaquals grammar' });
  add({ id: 'fr:name:paris', surface: 'Paris' });
  add({ id: 'fn:greet', group: 'socialising', label: 'Greet', canDo: 'Can greet.', cefr: 'A1' });
  return { lang: 'fr', nodes };
}

test('nodeLevel of a headword is its stored level', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:lex:etre'), 'A1');
  assert.equal(nodeLevel(g, 'fr:lex:soutenir'), 'B1');
  assert.equal(nodeLevel(g, 'fr:lex:sans-niveau'), null);
});

test('nodeLevel of a construction is its stored level', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:cx:subj.il-faut-que'), 'A2');
  assert.equal(nodeLevel(g, 'fr:cx:verb.er.present'), 'A1');
  assert.equal(nodeLevel(g, 'fr:cx:conditionnel-present'), null);
});

test('a present or participle form takes its headword level', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:form:etre.prs.1sg'), 'A1');
  assert.equal(nodeLevel(g, 'fr:form:etre.ptcp'), 'A1');
});

test('a regular present form, which is not a stored node, takes its headword level', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:form:parler.prs.1pl'), 'A1');
  assert.equal(nodeLevel(g, 'fr:form:savoir.verb.prs.1sg'), 'A1');
});

test('a subjunctive form takes the higher of its headword and the subjunctive construction', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:form:etre.sbjv.1sg'), 'A2');
  assert.equal(nodeLevel(g, 'fr:form:soutenir.sbjv.1sg'), 'B1');
  assert.equal(nodeLevel(g, 'fr:form:parler.sbjv.3pl'), 'A2');
});

test('other tense cells take their construction', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:form:parler.impf.1sg'), 'A2');
  assert.equal(nodeLevel(g, 'fr:form:parler.fut.1sg'), 'A2');
  assert.equal(nodeLevel(g, 'fr:form:parler.prsptcp'), 'B1');
  // The construction has no level yet, so the form has none.
  assert.equal(nodeLevel(g, 'fr:form:etre.cond.1sg'), null);
});

test('cellConstruction maps tense cells and leaves the rest to the headword', () => {
  assert.equal(cellConstruction('sbjv.2pl'), 'fr:cx:subj.il-faut-que');
  assert.equal(cellConstruction('cond.1sg'), 'fr:cx:conditionnel-present');
  assert.equal(cellConstruction('fut.3pl'), 'fr:cx:futur-simple');
  assert.equal(cellConstruction('impf.3sg'), 'fr:cx:imparfait');
  assert.equal(cellConstruction('prsptcp'), 'fr:cx:gerondif');
  for (const cell of ['prs.1sg', 'ptcp', 'ptcp.f', 'ptcp.fpl', 'f', 'pl', 'fpl', 'mv', 'elided']) assert.equal(cellConstruction(cell), null, cell);
});

test('nodeLevel is null for names, unknown IDs and forms of unknown headwords; functions keep their level', () => {
  const g = miniGraph();
  assert.equal(nodeLevel(g, 'fr:name:paris'), null);
  assert.equal(nodeLevel(g, 'fr:lex:absent'), null);
  assert.equal(nodeLevel(g, 'fr:form:absent.prs.1sg'), null);
  assert.equal(nodeLevel(g, 'fn:greet'), 'A1');
});

// The committed French graph.

const graph = loadGraph(graphDir, 'fr');

test('every French headword, construction and paradigm has a level and a source', () => {
  const bad = [...graph.headwords, ...graph.constructions, ...graph.paradigms]
    .filter((n) => !LEVELS.includes(n.cefr) || !CEFR_SOURCES.includes(n.cefrSource))
    .map((n) => `${n.id} ${n.cefr} ${n.cefrSource}`);
  assert.deepEqual(bad, []);
});

test('every construction the cell map names is in the French graph, and every irregular form has a level', () => {
  for (const id of Object.values(CELL_CONSTRUCTIONS)) assert.ok(graph.nodes.has(id), id);
  const bad = graph.forms.filter((f) => !LEVELS.includes(nodeLevel(graph, f.id))).map((f) => f.id);
  assert.deepEqual(bad, []);
});

test('the French core lists exist, name graph nodes of the right kind, and match their level', () => {
  const lists = readCoreLists(graphDir, 'fr');
  assert.deepEqual(lists.map((l) => l.level), CORE_LEVELS);
  const seen = new Set();
  for (const list of lists) {
    assert.equal(list.lang, 'fr');
    assert.match(list.frozen, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(list.words.length > 0 && list.constructions.length > 0, list.level);
    assert.deepEqual(list.words, [...list.words].sort(), `${list.level} words sorted`);
    assert.deepEqual(list.constructions, [...list.constructions].sort(), `${list.level} constructions sorted`);
    for (const [field, prefix] of [['words', 'fr:lex:'], ['constructions', 'fr:cx:']]) {
      for (const id of list[field]) {
        assert.ok(id.startsWith(prefix), `${list.level} ${field}: ${id}`);
        assert.ok(graph.nodes.has(id), `${list.level}: ${id} is not in the graph`);
        assert.equal(graph.nodes.get(id).cefr, list.level, `${list.level}: ${id} is ${graph.nodes.get(id).cefr}`);
        assert.ok(!seen.has(id), `${id} is in two lists`);
        seen.add(id);
      }
    }
  }
});
