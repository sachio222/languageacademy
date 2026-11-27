// The method score on a made-up language: roles, reach on arrival, patterns that waited or were never taught, and
// how written modules introduce and reuse their new words.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { foundationSummary, roles, scoreShape, scoreWriting, shareSummary } from '../method-score.mjs';

const table = {
  kernelNeededBy: 2, kernelVerbNeeds: 2, chunkFamilies: ['chunk'],
  guideCovered: { prefixes: ['neg.'], levels: ['A1'], ids: [] },
  wrapperFamilies: ['relative'], wrapperIds: [], operatorFamilies: ['past'],
  slotExact: {}, slotFamily: { article: ['N'], chunk: [] }, slotDefault: ['V'],
  wordClass: { noun: 'N', verb: 'V' },
};
const graph = {
  headwords: [
    { id: 'zz:lex:mi', lemma: 'mi', pos: 'pronoun' },
    { id: 'zz:lex:esti', lemma: 'esti', pos: 'verb', paradigms: ['zz:cx:verb.present'] },
    { id: 'zz:lex:voli', lemma: 'voli', pos: 'verb', paradigms: ['zz:cx:verb.present'] },
    { id: 'zz:lex:domo', lemma: 'domo', pos: 'noun' },
    { id: 'zz:lex:kato', lemma: 'kato', pos: 'noun' },
    { id: 'zz:lex:kuri', lemma: 'kuri', pos: 'verb', paradigms: ['zz:cx:verb.present'] },
  ],
  forms: [{ id: 'zz:form:esti.prs', of: 'zz:lex:esti', surface: 'estas' }],
  paradigms: [{ id: 'zz:cx:verb.present', label: 'present', needs: [] }],
  constructions: [
    { id: 'zz:cx:pronoun.subject', label: 'subject', needs: [] },
    { id: 'zz:cx:article.definite', label: 'the', needs: ['zz:cx:pronoun.subject'] },
    { id: 'zz:cx:frame.voli-infinitive', label: 'want to', needs: ['zz:cx:pronoun.subject'], detect: [{ headword: 'zz:lex:voli' }, { pos: 'verb' }] },
    { id: 'zz:cx:past.esti', label: 'past', needs: ['zz:cx:pronoun.subject', 'zz:lex:esti'], detect: [{ headword: 'zz:lex:esti' }, { pos: 'verb' }] },
    { id: 'zz:cx:relative.kiu', label: 'who', needs: ['zz:cx:article.definite'] },
    { id: 'zz:cx:chunk.saluton', label: 'hello', needs: [] },
    { id: 'zz:cx:neg.ne', label: 'not', cefr: 'A1', needs: [] },
  ],
};

test('roles: each pattern and word gets its role from the language table', () => {
  const r = roles(graph, table);
  const role = (id) => r.patterns.get(`zz:cx:${id}`).role;
  assert.equal(role('pronoun.subject'), 'kernel'); // no needs, three patterns need it
  assert.equal(role('verb.present'), 'paradigm');
  assert.equal(role('chunk.saluton'), 'chunk');
  assert.equal(role('neg.ne'), 'guide-covered');
  assert.equal(role('relative.kiu'), 'wrapper');
  assert.equal(role('past.esti'), 'operator');
  assert.equal(role('frame.voli-infinitive'), 'frame');
  assert.equal(r.wordRole('zz:lex:voli'), 'frame'); // a pattern's detector names it
  assert.equal(r.wordRole('zz:lex:domo'), 'filler');
  assert.deepEqual(r.patterns.get('zz:cx:past.esti').carriers, ['zz:lex:esti']);
});

const course = [1, 2, 3, 4, 5].map((position) => ({ position, moduleKey: `m${position}`, unitKey: position < 4 ? 'u1' : 'u2', kind: 'lesson' }));
const taughtAt = new Map([
  ['zz:cx:pronoun.subject', 1], ['zz:lex:mi', 1], ['zz:form:esti.prs', 1], ['zz:cx:verb.present', 1],
  ['zz:lex:domo', 2], ['zz:lex:kato', 2],
  ['zz:cx:article.definite', 3],
  ['zz:lex:voli', 4], ['zz:cx:frame.voli-infinitive', 4],
  ['zz:cx:past.esti', 5], ['zz:lex:kuri', 5],
]);

test('shape: reach on arrival, what a new pattern takes, new jobs, waits and patterns never taught', () => {
  const s = scoreShape({ graph, table, course, taughtAt });
  const m = (p) => s.modules.find((x) => x.position === p);
  // esti is taught by its form; at lesson 1 the form table and the subject pattern take a verb
  assert.deepEqual(m(1).words.map((w) => [w.lemma, w.reach]).sort(), [['esti', 2], ['mi', 0]]);
  // nouns arrive before the pattern that takes them: nothing to plug into
  assert.deepEqual(m(2).words.map((w) => w.reach), [0, 0]);
  // the article then takes both nouns at once
  assert.equal(m(3).patterns[0].takes, 2);
  assert.equal(m(3).opened, 2);
  // a verb at lesson 5 fits the form table, the subject pattern, the frame and the past
  assert.equal(m(5).words.find((w) => w.lemma === 'kuri').reach, 4);
  // the past gives esti, taught at lesson 1, a new job, after waiting four lessons
  assert.deepEqual(m(5).patterns[0].reuses, ['zz:lex:esti']);
  assert.equal(m(5).patterns[0].waited, 4);
  assert.equal(m(5).patterns_known, 4); // subject, article, frame, past: no table, no chunk
  assert.equal(m(2).no_carrier, false); // two words only
  const never = s.never.map((n) => [n.id, n.ready_at]);
  assert.deepEqual(never, [['zz:cx:relative.kiu', 3], ['zz:cx:neg.ne', 0]]);
  assert.deepEqual(s.units.map((u) => [u.unit_key, u.words, u.patterns]), [['u1', 4, 2], ['u2', 2, 2]]);
});

test('shape: a list of six fillers with no new verb or pattern is flagged', () => {
  const g = { ...graph, headwords: [...graph.headwords, ...[1, 2, 3, 4, 5, 6].map((i) => ({ id: `zz:lex:n${i}`, lemma: `n${i}`, pos: 'noun' }))] };
  const t = new Map([...taughtAt, ...[1, 2, 3, 4, 5, 6].map((i) => [`zz:lex:n${i}`, 6])]);
  const s = scoreShape({ graph: g, table, course: [...course, { position: 6, moduleKey: 'm6', unitKey: 'u2', kind: 'lesson' }], taughtAt: t });
  assert.equal(s.modules.at(-1).no_carrier, true);
  assert.equal(s.units.at(-1).no_carrier, 1);
});

const read = (...ids) => ids.map((id) => [{ headwordId: `zz:lex:${id}` }]);
const sentence = (text, ...ids) => [{ text, readings: read(...ids), tokens: ids.map(() => ({})) }];
const written = [
  { position: 1, moduleKey: 'm1', unitKey: 'u1', kind: 'lesson', items: [{ ref: 'a', source: 'items', type: 'respond' }] },
  { position: 2, moduleKey: 'm2', unitKey: 'u1', kind: 'lesson', items: [
    { ref: 'b', source: 'vocab-example' }, { ref: 'c', source: 'items', type: 'transform' }, { ref: 'd', source: 'items', type: 'gapfill' }, { ref: 'h', source: 'hint' },
  ] },
  { position: 3, moduleKey: 'm3', unitKey: 'u2', kind: 'lesson', items: [{ ref: 'e', source: 'items', type: 'respond' }] },
];
const analysis = new Map([
  ['a', sentence('mi estas', 'mi', 'esti')],
  ['b', sentence('mi estas domo', 'mi', 'esti', 'domo')], // domo met through owned words
  ['c', sentence('domo kato', 'domo', 'kato')],            // domo, already met, carries kato
  ['d', sentence('mi estas kato', 'mi', 'esti', 'kato')],
  ['h', sentence('kuri', 'kuri')],                          // a hint is not exercise text
  ['e', sentence('mi volas domo', 'mi', 'voli', 'domo')],   // the next module meets voli in a sentence built on domo
]);
const wTaught = new Map([['zz:lex:mi', 1], ['zz:lex:esti', 1], ['zz:lex:domo', 2], ['zz:lex:kato', 2], ['zz:lex:voli', 3]]);

test('writing: the share of new words, how each is first met, what it carries and what leans on it', () => {
  const rows = scoreWriting({ graph, course: written, analysis, taughtAt: wTaught });
  const m2 = rows.find((r) => r.module_key === 'm2');
  assert.equal(m2.items, 2);
  assert.equal(m2.used, 4);          // domo, kato, mi, esti in the two items
  assert.equal(m2.fresh, 2);
  assert.equal(m2.new_share, 0.5);
  assert.deepEqual(m2.types, { transform: 1, gapfill: 1 });
  const domo = m2.words.find((w) => w.lemma === 'domo');
  assert.equal(domo.first, 'mi estas domo');
  assert.equal(domo.strangers, 0);
  assert.deepEqual(domo.carried, ['kato']);
  assert.equal(domo.together, 1);
  assert.equal(domo.supports, 1);    // voli is first met beside it in m3
  assert.equal(domo.next, 1);
  const kato = m2.words.find((w) => w.lemma === 'kato');
  assert.deepEqual(kato.carried, []);
  assert.equal(kato.after, 0);
  assert.deepEqual(shareSummary(rows), { lessons: 3, median: 0.5, q1: 1 / 3, q3: 1, max: 1 });
  const f = foundationSummary(rows.filter((r) => r.module_key === 'm2'));
  assert.equal(f.new_words, 2);
  assert.equal(f.carried_a_later_new_word, 1);
  assert.equal(f.supports_a_new_word_in_the_next_modules, 1);
});
