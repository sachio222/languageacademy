import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { buildFormIndex, lookupToken } from '../fr/forms.mjs';
import { tokenize } from '../fr/tokenize.mjs';
import { matchPattern, matchSpans, detectConstructions } from '../fr/detect.mjs';

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
  // fixture token "va": aller prs.3sg and vouloir sbjv.3sg (two readings)
  const A = 'fr:lex:aller';
  const B = 'fr:lex:vouloir';
  assert.equal(run([{ headword: A, cell: 'prs.3sg' }], 'va'), true);
  assert.equal(run([{ headword: B, cell: 'sbjv.3sg' }], 'va'), true);
  assert.equal(run([{ headword: A, cell: 'sbjv.3sg' }], 'va'), false);
  assert.equal(run([{ headword: B, cell: 'prs.3sg' }], 'va'), false);
});

test('cell glob matches any one of several readings', () => {
  assert.equal(run([{ cell: '*bj*.3sg' }], 'va'), true);
  assert.equal(run([{ cell: 'p*3sg' }], 'va'), true);
  assert.equal(run([{ cell: '*ptcp*' }], 'va'), false);
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

test('a list of alternative patterns matches when any one matches', () => {
  const reflexive = [
    [{ surface: '^je$' }, { surface: '^me$' }],
    [{ surface: '^tu$' }, { surface: '^te$' }],
  ];
  assert.equal(run(reflexive, 'tu te lèves'), true);
  assert.equal(run(reflexive, 'je me lève'), true);
  assert.equal(run(reflexive, 'il se lève'), false);
});

test('start anchors a step to the first token', () => {
  assert.equal(run([{ start: true, pos: 'verb', cell: 'imp.2sg' }], 'Parle !'), true);
  assert.equal(run([{ start: true, surface: '^parle$' }], 'Je parle'), false);
  assert.equal(run([{ start: true, surface: '^je$' }], 'Je parle'), true);
});

test('pos and via steps bind to the same reading', () => {
  const futurProche = [{ headword: 'fr:lex:aller', cell: 'prs.*' }, { pos: 'verb', via: 'lemma' }];
  assert.equal(run(futurProche, 'je vais parler'), true);
  assert.equal(run(futurProche, 'je vais au parc'), false);
  assert.equal(run([{ pos: 'verb', via: 'lemma' }], 'je parle'), false);
  assert.equal(run([{ pos: 'noun', via: 'lemma' }], 'un café'), true);
  // pos and cell must hold on one reading: "est" is a noun (no cell) and also a form of être
  assert.equal(run([{ pos: 'noun', cell: 'prs.3sg' }], 'il est'), false);
});

test('any matches a token against alternative sub-steps', () => {
  const p = [{ any: [{ surface: '^ou$' }, { surface: '^quand$' }] }];
  assert.equal(run(p, 'quand veux-tu'), true);
  assert.equal(run(p, 'où vas-tu'), true);
  assert.equal(run(p, 'je parle'), false);
  const grouped = [{ any: [{ headword: 'fr:lex:aller', cell: 'prs.1sg' }, { pos: 'noun', via: 'lemma' }] }, { surface: '^au$' }];
  assert.equal(run(grouped, 'je vais au parc'), true);
});

test('detectConstructions accepts list and single-pattern detects', () => {
  const cs = [
    { id: 'a', detect: [[{ surface: '^je$' }], [{ surface: '^tu$' }]] },
    { id: 'b', detect: [{ surface: '^il$' }] },
    { id: 'c', detect: null },
  ];
  const { tokens, readings } = prep('tu parles');
  assert.deepEqual(detectConstructions(tokens, readings, cs), ['a']);
});

test('a name step matches a token whose folded surface is in the names list', () => {
  const p = [{ name: true }, { surface: 'qui' }];
  const { tokens, readings } = prep('Le café Flore qui est en face');
  assert.equal(matchPattern(tokens, readings, p, new Set(['flore'])), true);
  assert.equal(matchPattern(tokens, readings, p, new Set(['marie'])), false);
  // no names list: a name step never matches
  assert.equal(matchPattern(tokens, readings, p), false);
  // capitalization alone does not make a name
  const other = prep('Le Café qui est en face');
  assert.equal(matchPattern(other.tokens, other.readings, p, new Set(['flore'])), false);
});

test('detectConstructions passes the names list to the detectors', () => {
  const cx = [{ id: 'fr:cx:x', detect: [{ name: true }, { surface: 'qui' }] }];
  const { tokens, readings } = prep('Marie qui parle');
  assert.deepEqual(detectConstructions(tokens, readings, cx, graph.names), ['fr:cx:x']);
  assert.deepEqual(detectConstructions(tokens, readings, cx), []);
});

test('matchSpans returns the token indices of every match, one per start', () => {
  const { tokens, readings } = prep("Je ne parle pas. Tu ne vas pas.");
  assert.deepEqual(matchSpans(tokens, readings, negation), [[1, 3], [5, 7]]);
  assert.deepEqual(matchSpans(tokens, readings, [{ surface: 'jamais' }]), []);
  // an optional step that matches nothing adds no index
  const p = [{ surface: 'je' }, { surface: 'ne', optional: true }, { surface: 'parle' }];
  assert.deepEqual(matchSpans(prep('Je parle.').tokens, prep('Je parle.').readings, p), [[0, 1]]);
});
