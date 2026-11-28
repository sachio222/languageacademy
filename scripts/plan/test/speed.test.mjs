// The speed test on a made-up language: every order teaches the same items once and in a teachable order, every
// order pays the same time for the same lesson, and the measures count what a learner can build.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  fitCost, frequencyOrder, pack, randomOrder, ruleOrder, simulate, summarize, textbookOrder, universe, valueAt, violations,
} from '../speed.mjs';

const table = {
  kernelNeededBy: 2, kernelVerbNeeds: 2, chunkFamilies: ['chunk'],
  guideCovered: { prefixes: [], levels: [], ids: [] },
  wrapperFamilies: ['relative'], wrapperIds: [], operatorFamilies: ['past'],
  slotExact: {}, slotFamily: { article: ['N'], chunk: [] }, slotDefault: ['V'],
  wordClass: { noun: 'N', verb: 'V' },
};
const graph = {
  headwords: [
    { id: 'zz:lex:mi', lemma: 'mi', pos: 'pronoun', cefr: 'A1' },
    { id: 'zz:lex:esti', lemma: 'esti', pos: 'verb', cefr: 'A1', paradigms: ['zz:cx:verb.present'] },
    { id: 'zz:lex:voli', lemma: 'voli', pos: 'verb', cefr: 'A1', paradigms: ['zz:cx:verb.present'] },
    { id: 'zz:lex:domo', lemma: 'domo', pos: 'noun', cefr: 'A1' },
    { id: 'zz:lex:kato', lemma: 'kato', pos: 'noun', cefr: 'A2' },
    { id: 'zz:lex:kuri', lemma: 'kuri', pos: 'verb', cefr: 'A2', paradigms: ['zz:cx:verb.present'] },
    { id: 'zz:lex:arbo', lemma: 'arbo', pos: 'noun', cefr: 'B1' },
    { id: 'zz:lex:saluton', lemma: 'saluton', pos: 'interjection', cefr: 'A1' },
  ],
  forms: [{ id: 'zz:form:esti.prs', of: 'zz:lex:esti', surface: 'estas' }],
  paradigms: [{ id: 'zz:cx:verb.present', label: 'present', needs: [], cefr: 'A1' }],
  constructions: [
    { id: 'zz:cx:pronoun.subject', label: 'subject', needs: [], cefr: 'A1' },
    { id: 'zz:cx:article.definite', label: 'the', needs: ['zz:cx:pronoun.subject'], cefr: 'A1' },
    { id: 'zz:cx:frame.voli-infinitive', label: 'want to', needs: ['zz:cx:pronoun.subject', 'zz:cx:verb.present'], cefr: 'A1', detect: [{ headword: 'zz:lex:voli' }, { pos: 'verb' }] },
    { id: 'zz:cx:past.esti', label: 'past', needs: ['zz:cx:pronoun.subject', 'zz:lex:esti'], cefr: 'A2', detect: [{ headword: 'zz:lex:esti' }, { pos: 'verb' }] },
    { id: 'zz:cx:relative.kiu', label: 'who', needs: ['zz:cx:article.definite'], cefr: 'B1' },
    { id: 'zz:cx:chunk.bonvolu', label: 'please', needs: [], cefr: 'A1' },
  ],
};
const ids = [...graph.headwords.map((h) => h.id), ...graph.paradigms.map((p) => p.id), ...graph.constructions.map((c) => c.id)];
const taughtAt = new Map(ids.map((id, i) => [id, i + 1]));
taughtAt.set('zz:form:esti.prs', 3);
const ranks = new Map([['mi', 1], ['esti', 2], ['voli', 5], ['domo', 9], ['kato', 30], ['kuri', 12], ['arbo', 400]]);
const core = { A1: { words: ['zz:lex:mi', 'zz:lex:esti', 'zz:lex:domo'], constructions: ['zz:cx:pronoun.subject'] } };
const U = universe({ graph, table, taughtAt, free: new Set(['zz:lex:saluton']), ranks, core });

const items = (lessons) => lessons.flatMap((l) => [...l.words, ...l.patterns]).sort();
const everyItem = [...U.words.keys(), ...U.patterns.keys()].sort();

test('universe: the taught items, free words left off the path, needs and pieces read from the graph', () => {
  assert.equal(U.words.size, 7);
  assert.ok(!U.words.has('zz:lex:saluton'));
  assert.equal(U.patterns.size, 7);
  const past = U.patterns.get('zz:cx:past.esti');
  assert.deepEqual(past.needs, ['zz:cx:pronoun.subject']);
  assert.deepEqual(past.requires, ['zz:lex:esti']);
  assert.equal(U.patterns.get('zz:cx:chunk.bonvolu').counted, false);
  assert.equal(U.patterns.get('zz:cx:verb.present').counted, false);
  assert.ok(U.words.get('zz:lex:mi').z > U.words.get('zz:lex:arbo').z);
});

test('pack: lessons keep the order and never pass the word and pattern caps', () => {
  const seq = ['zz:lex:mi', 'zz:cx:pronoun.subject', 'zz:lex:esti', 'zz:cx:verb.present', 'zz:cx:article.definite', 'zz:lex:domo'];
  const lessons = pack(seq, U, { words: 2, patterns: 2 });
  assert.deepEqual(lessons.map((l) => [l.words.length, l.patterns.length]), [[2, 2], [1, 1]]);
  assert.deepEqual(lessons.flatMap((l) => l.order), seq);
});

for (const [name, make] of [
  ['textbook', () => textbookOrder(U)],
  ['frequency', () => frequencyOrder(U)],
  ['frequency without pace', () => frequencyOrder(U, { pace: false })],
  ['rule', () => ruleOrder(U)],
  ['random', () => randomOrder(U, 7)],
]) {
  test(`${name} order: every item once, each pattern after its needs and pieces`, () => {
    const lessons = pack(make(), U, { words: 3, patterns: 1 });
    assert.deepEqual(items(lessons), everyItem);
    assert.deepEqual(violations(lessons, U), []);
  });
}

test('textbook order: lower levels first', () => {
  const seq = textbookOrder(U).filter((id) => U.words.has(id));
  assert.equal(seq.at(-1), 'zz:lex:arbo');
  assert.ok(seq.indexOf('zz:lex:kato') > seq.indexOf('zz:lex:domo'));
});

test('frequency order: words most common first; with pace it never holds more patterns than the textbook at equal words', () => {
  const seq = frequencyOrder(U).filter((id) => U.words.has(id));
  assert.deepEqual(seq.slice(0, 3), ['zz:lex:mi', 'zz:lex:esti', 'zz:lex:voli']);
  const cost = { c0: 1, cw: 1, cp: 1, unit: 0, every: 100 };
  const f = simulate(pack(frequencyOrder(U), U, { words: 1, patterns: 1 }), U, cost);
  const t = simulate(pack(textbookOrder(U), U, { words: 1, patterns: 1 }), U, cost);
  for (const s of f) assert.ok(s.patterns <= valueAt(t, 'words', s.words, 'patterns'));
});

test('simulate: reach is every known word in every known pattern that takes it, counted fresh each lesson', () => {
  const lessons = pack(ruleOrder(U), U, { words: 2, patterns: 1 });
  const samples = simulate(lessons, U, { c0: 2, cw: 1, cp: 3, unit: 10, every: 3 });
  let words = [...U.free];
  const pats = [];
  lessons.forEach((l, i) => {
    words = [...words, ...l.words];
    pats.push(...l.patterns);
    const brute = pats.filter((p) => U.patterns.get(p).counted).reduce((s, p) => s + words.filter((w) => U.accepts.get(p).has(w)).length, 0);
    assert.equal(samples[i].reach, brute);
  });
  assert.equal(samples.at(-1).core.A1, 1);
});

test('same lessons in another order cost the same time', () => {
  const lessons = pack(textbookOrder(U), U, { words: 2, patterns: 1 });
  const cost = { c0: 2, cw: 1, cp: 3, unit: 10, every: 3 };
  const a = simulate(lessons, U, cost).at(-1).minutes;
  const b = simulate([...lessons].reverse(), U, cost).at(-1).minutes;
  assert.equal(a, b);
});

test('fitCost: recovers a lesson cost made of a base, minutes per word and minutes per pattern', () => {
  const rows = [[0, 1], [4, 0], [8, 1], [12, 2], [6, 1], [2, 0]].map(([w, p]) => ({ words: w, patterns: p, minutes: 5 + 1.5 * w + 4 * p }));
  const c = fitCost(rows);
  assert.ok(Math.abs(c.c0 - 5) < 1e-6 && Math.abs(c.cw - 1.5) < 1e-6 && Math.abs(c.cp - 4) < 1e-6);
});

test('summarize: values at study hours and at word counts, with no frequency value in the output', () => {
  const samples = simulate(pack(ruleOrder(U), U, { words: 2, patterns: 1 }), U, { c0: 60, cw: 30, cp: 60, unit: 0, every: 100 });
  const out = summarize({ rule: samples }, { hours: [1, 5], words: [2, 7] });
  assert.equal(out.rule.hours.length, 2);
  assert.ok(JSON.stringify(out).match(/"z"/) === null);
  assert.equal(out.rule.words.at(-1).words, 7);
});
