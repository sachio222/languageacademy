import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { validateGraph } from '../validate.mjs';
import { buildFormIndex, lookupToken, lookupTokenStrict, strictKey } from '../fr/forms.mjs';
import { tokenize } from '../fr/tokenize.mjs';
import { fold } from '../fold.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const graph = loadGraph(join(here, 'fixtures', 'graph-mini'), 'fr');
const index = buildFormIndex(graph);
const lookup = (s) => index.get(s) ?? [];

test('fixture still validates', () => {
  assert.deepEqual(validateGraph(graph), []);
});

test('parlons resolves to exactly one generated reading', () => {
  assert.deepEqual(lookup('parlons'), [{
    nodeId: 'fr:form:parler.prs.1pl',
    headwordId: 'fr:lex:parler',
    cell: 'prs.1pl',
    via: 'generated',
    paradigmId: 'fr:cx:verb.er.present',
    surface: 'parlons',
    pos: 'verb',
  }]);
});

test('irregular forms win over generation', () => {
  assert.equal(lookup('vais')[0].via, 'irregular');
  assert.equal(lookup('allons').length, 1);
  assert.equal(lookup('allons')[0].via, 'irregular');
});

test('lemma readings are indexed by folded lemma', () => {
  assert.ok(lookup('parler').some((r) => r.via === 'lemma' && r.headwordId === 'fr:lex:parler'));
  assert.ok(lookup('cafe').some((r) => r.via === 'lemma' && r.headwordId === 'fr:lex:cafe'));
});

test('est keeps both the irregular form of etre and the noun lemma', () => {
  const ids = lookup('est').map((r) => r.nodeId);
  assert.ok(ids.includes('fr:form:etre.prs.3sg'));
  assert.ok(ids.includes('fr:lex:est'));
});

test('clitic token resolves through its leading hyphen', () => {
  const r = lookupToken(index, { fold: '-tu', clitic: true });
  assert.ok(r.some((x) => x.headwordId === 'fr:lex:tu'));
  const t = lookupToken(index, { fold: '-t-il', clitic: true });
  assert.ok(t.some((x) => x.headwordId === 'fr:lex:il'));
});

test('reflexive lemma generates on the verb part', () => {
  assert.ok(lookup('lavons').some((r) => r.headwordId === 'fr:lex:se-laver' && r.cell === 'prs.1pl'));
  assert.ok(lookup('laver').some((r) => r.headwordId === 'fr:lex:se-laver' && r.via === 'lemma'));
  assert.ok(lookup('se laver').some((r) => r.headwordId === 'fr:lex:se-laver' && r.via === 'lemma'));
});

test('elided j resolves to je', () => {
  const [tok] = tokenize("j'ai");
  assert.ok(lookupToken(index, tok).some((r) => r.headwordId === 'fr:lex:je'));
});

test('names are not indexed and unknown tokens are empty', () => {
  assert.deepEqual(lookup('marie'), []);
  assert.deepEqual(lookupToken(index, { fold: 'zzz', clitic: false }), []);
});

const tokenOf = (s) => tokenize(s)[0];

test('lookupTokenStrict is accent-sensitive, lookupToken is not', () => {
  const t = tokenOf('où');
  assert.deepEqual(lookupTokenStrict(index, t), []);
  assert.ok(lookupToken(index, t).some((r) => r.headwordId === 'fr:lex:ou'));
  assert.ok(lookupTokenStrict(index, tokenOf('ou')).some((r) => r.headwordId === 'fr:lex:ou'));
  assert.ok(lookupTokenStrict(index, tokenOf('Café')).some((r) => r.headwordId === 'fr:lex:cafe'));
  assert.deepEqual(lookupTokenStrict(index, tokenOf('cafe')), []);
});

test('every reading carries the norm of its source text as surface', () => {
  assert.equal(lookup('vais')[0].surface, 'vais');
  assert.equal(lookup('allons')[0].surface, 'allons');
  assert.equal(lookup('lavons').find((r) => r.cell === 'prs.1pl').surface, 'lavons');
  assert.equal(lookup('cafe')[0].surface, 'café');
  assert.equal(lookup('laver').find((r) => r.via === 'lemma').surface, 'laver');
  assert.equal(lookup('se laver').find((r) => r.via === 'lemma').surface, 'se laver');
});

test('strictKey strips a leading hyphen and t- from norm', () => {
  assert.equal(strictKey(tokenOf('-tu')), 'tu');
  const [, t] = tokenize('va-t-il');
  assert.equal(strictKey(t), 'il');
  assert.equal(strictKey(tokenOf('Où')), 'où');
});

test('clitic -tu still resolves strictly to tu', () => {
  const toks = tokenize('vas-tu');
  assert.ok(lookupTokenStrict(index, toks[1]).some((r) => r.headwordId === 'fr:lex:tu'));
});

// The committed French graph: verbs added for the core lists spell their forms like manger, commencer, appeler and
// lever, through irregular forms that override the plain -er patterns.
const fr = loadGraph(join(here, '../../../curriculum-graph'), 'fr');
const frIndex = buildFormIndex(fr);
const strictReadings = (surface, headwordId) => (frIndex.get(fold(surface)) ?? [])
  .filter((r) => r.surface === surface && r.headwordId === headwordId).map((r) => r.cell).sort();

test('new -ger, -cer, -eter, -eler, e and é verbs spell their stem changes', () => {
  assert.deepEqual(strictReadings('rangeons', 'fr:lex:ranger'), ['prs.1pl']);
  assert.deepEqual(strictReadings('rangeait', 'fr:lex:ranger'), ['impf.3sg']);
  assert.deepEqual(strictReadings('rangons', 'fr:lex:ranger'), []);
  assert.deepEqual(strictReadings('avançons', 'fr:lex:avancer'), ['prs.1pl']);
  assert.deepEqual(strictReadings('jette', 'fr:lex:jeter'), ['prs.1sg', 'prs.3sg', 'sbjv.1sg', 'sbjv.3sg']);
  assert.deepEqual(strictReadings('jetons', 'fr:lex:jeter'), ['prs.1pl']);
  assert.deepEqual(strictReadings('rappellera', 'fr:lex:rappeler'), ['fut.3sg']);
  assert.deepEqual(strictReadings('mène', 'fr:lex:mener'), ['prs.1sg', 'prs.3sg', 'sbjv.1sg', 'sbjv.3sg']);
  assert.deepEqual(strictReadings('espère', 'fr:lex:esperer'), ['prs.1sg', 'prs.3sg', 'sbjv.1sg', 'sbjv.3sg']);
  assert.deepEqual(strictReadings('espérerai', 'fr:lex:esperer'), ['fut.1sg']);
  assert.deepEqual(strictReadings('neigeait', 'fr:lex:neiger'), ['impf.3sg']);
});
