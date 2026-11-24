import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { buildFormIndex, lookupToken } from '../fr/forms.mjs';
import { tokenize } from '../fr/tokenize.mjs';
import { matchPattern, detectConstructions } from '../fr/detect.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const graph = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');
const index = buildFormIndex(graph);
const prep = (text) => {
  const tokens = tokenize(text, { isWord: (f) => index.has(f) });
  return { tokens, readings: tokens.map((t) => lookupToken(index, t)) };
};
const run = (pattern, text) => {
  const { tokens, readings } = prep(text);
  return matchPattern(tokens, readings, pattern);
};

const inversion = graph.constructions.find((c) => c.id === 'fr:cx:q.inversion').detect;
const negation = [{ surface: "^(ne|n')$" }, { skip: 3, surface: '^pas$' }];
const passeCompose = [
  { headword: 'fr:lex:avoir', cell: 'prs.*' },
  { skip: 2, cell: 'ptcp' },
];

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(graph), []);
});

test('inversion matches Veux-tu, not Tu veux', () => {
  assert.equal(run(inversion, 'Veux-tu du café ?'), true);
  assert.equal(run(inversion, 'Tu veux du café ?'), false);
});

test('negation with skip', () => {
  assert.equal(run(negation, 'Je ne veux pas'), true);
  assert.equal(run(negation, "Je n'ai pas mangé"), true);
  assert.equal(run(negation, 'Je veux'), false);
});

test('passé composé with avoir', () => {
  assert.equal(run(passeCompose, "J'ai mangé"), true);
  assert.equal(run(passeCompose, "Je n'ai pas mangé"), true);
  assert.equal(run(passeCompose, "J'ai un chat"), false);
});

test('skip allows 0..n tokens but not more', () => {
  const p = [{ surface: '^je$' }, { skip: 1, surface: '^pas$' }];
  assert.equal(run(p, 'je pas'), true);
  assert.equal(run(p, 'je ne pas'), true);
  assert.equal(run(p, 'je ne veux pas'), false);
});

test('without skip a step must be adjacent', () => {
  const p = [{ surface: '^je$' }, { surface: '^pas$' }];
  assert.equal(run(p, 'je ne pas'), false);
});

test('optional step may match nothing', () => {
  const p = [{ surface: '^je$' }, { optional: true, surface: '^ne$' }, { surface: '^veux$' }];
  assert.equal(run(p, 'je veux'), true);
  assert.equal(run(p, 'je ne veux'), true);
  assert.equal(run(p, 'je pas veux'), false);
});

test('headword and cell must hold for the same reading', () => {
  // mange: manger prs.1sg and ptcp; ai: avoir prs.1sg
  assert.equal(run([{ headword: 'fr:lex:manger', cell: 'ptcp' }], 'mangé'), true);
  assert.equal(run([{ headword: 'fr:lex:avoir', cell: 'ptcp' }], 'ai'), false);
});

test('tokens without readings never match reading constraints', () => {
  assert.equal(run([{ headword: null }], 'chat'), false);
  assert.equal(run([{ cell: null }], 'chat'), false);
  assert.equal(run([{ headword: null }], 'je'), true);
});

test('clitic flag is checked', () => {
  assert.equal(run([{ clitic: true }], 'veux-tu'), true);
  assert.equal(run([{ clitic: true }], 'veux tu'), false);
});

test('detectConstructions skips null detect and returns matching ids', () => {
  const { tokens, readings } = prep('Veux-tu du café ?');
  assert.deepEqual(detectConstructions(tokens, readings, graph.constructions), ['fr:cx:q.inversion']);
  const none = prep('Tu veux du café ?');
  assert.deepEqual(detectConstructions(none.tokens, none.readings, graph.constructions), []);
});
