// A lesson names its verb; the Verb forms step's data is built from the graph (fr/conjugation.mjs through the language
// module, glossed by scripts/content/conjugation.mjs). The two verbs first written by hand are the proof: what is built
// equals what was written, less the IPA sound labels, which no spelling rule can build and the step no longer shows.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { language } from '../language.mjs';
import { expandConjugation, conjugationGraph, personGlosses } from '../../content/conjugation.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..', '..');
const hand = JSON.parse(readFileSync(join(here, 'fixtures', 'conjugation-hand-written.json'), 'utf8'));
const graph = conjugationGraph(join(root, 'curriculum-graph', 'languages', 'fr'));
const glosses = personGlosses(join(root, 'curriculum-graph'), 'en', 'fr');
const fr = language('fr');
const build = (spec, earlier = new Map()) => expandConjugation(spec, { generate: (s) => fr.conjugation(graph, s), glosses, earlier });
const lessSound = (c) => ({ ...c, groups: c.groups.map((g) => ({ id: g.id })) });
const lessContrast = ({ contrast, ...c }) => c;

test('vouloir is built as it was written by hand', () => {
  const c = build({ verb: 'vouloir', en: 'to want', note: hand.vouloir.note });
  assert.deepEqual(lessContrast(c), lessSound(hand.vouloir));
});

test('partir is built as it was written by hand', () => {
  const c = build({ verb: 'partir', en: 'to leave', aspect: 'progressive', note: hand.partir.note });
  assert.deepEqual(lessContrast(c), lessSound(hand.partir));
});

test('what to listen for between il and ils comes from the forms', () => {
  const v = build({ verb: 'vouloir', en: 'to want' }).contrast;
  assert.equal(v.same, false);
  assert.deepEqual([v.one, v.many], ['il veut', 'ils veulent']);
  assert.equal(v.listen, '{veut} ends on a vowel sound. {veulent} ends with an l sound. The -ent itself is never said.');
  const p = build({ verb: 'parler', en: 'to speak' }).contrast;
  assert.equal(p.same, true);
  assert.match(p.listen, /sound the same: the -ent is never said/);
  assert.equal(p.liaison, undefined);
  const a = build({ verb: 'aimer', en: 'to like' }).contrast;
  assert.equal(a.same, true);
  assert.deepEqual([a.liaison.one, a.liaison.many], ['il aime', 'ils aiment']);
});

test('a verb shaped like one taught earlier names it as its model', () => {
  const earlier = new Map();
  assert.equal(build({ verb: 'vouloir', en: 'to want' }, earlier).pattern, 'irregular');
  const pouvoir = build({ verb: 'pouvoir', en: 'to be able to', gloss: 'can' }, earlier);
  assert.deepEqual([pouvoir.pattern, pouvoir.model], ['like', 'vouloir']);
  assert.equal(build({ verb: 'parler', en: 'to speak' }, earlier).pattern, 'irregular');
  const aimer = build({ verb: 'aimer', en: 'to like' }, earlier);
  assert.deepEqual([aimer.pattern, aimer.model, aimer.rows[0].person], ['er', 'parler', "j'"]);
});

test('English for each person follows the verb', () => {
  const be = build({ verb: 'être', en: 'to be' });
  assert.deepEqual(be.rows.map((r) => r.en).slice(0, 3), ['I am', 'you are (to one person you know well)', 'he is, she is, we are (on)']);
  const go = build({ verb: 'aller', en: 'to go' });
  assert.equal(go.rows[2].en, 'he goes, she goes, we go (on)');
});

test('a verb the graph does not hold is refused by name', () => {
  assert.throws(() => build({ verb: 'zzzer', en: 'to zzz' }), /zzzer is not a verb of the graph/);
});
