// Near-cognate families, plan additions and cognate guides in the check, and the recognised-words measure: each on
// small data built here.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { familyMembers, stemsMatch } from '../cognates.mjs';
import { checkPlan } from '../check.mjs';
import { simulate, universe, withGuides } from '../speed.mjs';

const FAMILIES = [
  { id: 'tion', fr: 'tion$', en: 'tion$', pos: ['noun'] },
  { id: 'eux-ous', fr: 'eux$', en: 'ous$', pos: ['adjective'] },
  { id: 'er-verbs', fr: 'er$', en: '^to [a-z]+$', pos: ['verb'] },
];
const HW = [
  { id: 'x:lex:nation', lemma: 'nation', pos: 'noun', senses: [{ gloss: 'nation' }] },
  { id: 'x:lex:decision', lemma: 'décision', pos: 'noun', senses: [{ gloss: 'decision' }] },
  { id: 'x:lex:dangereux', lemma: 'dangereux', pos: 'adjective', senses: [{ gloss: 'dangerous' }] },
  { id: 'x:lex:heureux', lemma: 'heureux', pos: 'adjective', senses: [{ gloss: 'happy' }] },
  { id: 'x:lex:organiser', lemma: 'organiser', pos: 'verb', senses: [{ gloss: 'to organise' }] },
  { id: 'x:lex:manger', lemma: 'manger', pos: 'verb', senses: [{ gloss: 'to eat' }] },
  { id: 'x:lex:rester', lemma: 'rester', pos: 'verb', senses: [{ gloss: 'to rest' }] },
  { id: 'x:lex:station', lemma: 'station', pos: 'verb', senses: [{ gloss: 'station' }] },
];

test('a member has the endings on both sides, a matching stem and the right part of speech', () => {
  const m = familyMembers({ families: FAMILIES, headwords: HW, falseFriends: [] });
  assert.deepEqual(m.get('tion'), ['x:lex:nation']);
  assert.deepEqual(m.get('eux-ous'), ['x:lex:dangereux']);
  assert.ok(m.get('er-verbs').includes('x:lex:organiser'));
  assert.ok(!m.get('er-verbs').includes('x:lex:manger'));
});

test('a false friend never counts, though it matches', () => {
  const m = familyMembers({ families: FAMILIES, headwords: HW, falseFriends: [{ lemma: 'rester' }] });
  assert.ok(!m.get('er-verbs').includes('x:lex:rester'));
});

test('stems match on their first letters once accents are folded, or within one letter in five', () => {
  assert.ok(stemsMatch('organis', 'organiz'));
  assert.ok(stemsMatch('électr', 'electr'));
  assert.ok(!stemsMatch('mang', 'eat'));
});

const LIMITS = { lesson_words: 12, table_words: 10, minutes: 35, exam_items: 35, exam_minutes: 25, guides: 2 };
const LOOKUPS = {
  headwords: new Map(['xx:lex:a', 'xx:lex:b', 'xx:lex:nation'].map((id) => [id, { id, lemma: id.split(':').at(-1) }])),
  forms: new Map(),
  constructions: new Map([['xx:cx:one', { id: 'xx:cx:one', needs: [] }]]),
};
const base = (more) => ({ schema: 'la-course-plan@1', language: 'xx', native: 'en', units: [{ unit_key: 'unit2', title: 'u', can_do: 'You can.', setting: { cast: ['A'] }, modules: [{ module_key: 'later', kind: 'lesson', title: 'l', teaches: { words: ['xx:lex:b'], constructions: [] }, minutes: 20 }] }], ...more });
const runCheck = (plan, at) => checkPlan({
  plan, limits: LIMITS, lookups: LOOKUPS, readingTypes: new Set(), taughtAt: new Map([['xx:lex:old', 1]]),
  isAvailable: (id, p) => (at.get(id) ?? Infinity) <= p, position: new Map([['later', 50]]),
  written: new Set(['2024-01-01-first']), writtenAt: new Map([['2024-01-01-first', 10]]),
  families: new Map([['tion', ['xx:lex:nation']]]),
});
const codes = (r) => r.problems.map((p) => p.code);

test('an addition is taught once: a plan module that still teaches it is a word taught twice', () => {
  const plan = base({ additions: { '2024-01-01-first': [{ id: 'xx:lex:b', carrier: 'xx:cx:one', met_through: ['xx:cx:one'] }] } });
  assert.ok(codes(runCheck(plan, new Map([['xx:cx:one', 5]]))).includes('word_twice'));
});

test('an addition sits in a written module and is carried by something the learner owns there', () => {
  const ok = base({ additions: { '2024-01-01-first': [{ id: 'xx:lex:a', carrier: 'xx:cx:one', met_through: ['xx:cx:one'] }] } });
  assert.deepEqual(codes(runCheck(ok, new Map([['xx:cx:one', 5]]))), []);
  assert.ok(codes(runCheck(ok, new Map([['xx:cx:one', 20]]))).includes('addition_carrier_unknown'));
  const nowhere = base({ additions: { 'not-written': [{ id: 'xx:lex:a', carrier: 'xx:cx:one', met_through: [] }] } });
  assert.ok(codes(runCheck(nowhere, new Map([['xx:cx:one', 5]]))).includes('addition_module_unknown'));
});

test('a cognate guide names a family of the pair and comes once the learner owns an example', () => {
  const g = (after, families) => base({ cognate_guides: [{ key: 'cognates-tion', title: 't', families, after }] });
  assert.deepEqual(codes(runCheck(g('2024-01-01-first', ['tion']), new Map([['xx:lex:nation', 8]]))), []);
  assert.ok(codes(runCheck(g('2024-01-01-first', ['tion']), new Map([['xx:lex:nation', 30]]))).includes('cognate_guide_no_example'));
  assert.ok(codes(runCheck(g('2024-01-01-first', ['nope']), new Map())).includes('cognate_family_unknown'));
  assert.ok(codes(runCheck(g('nowhere', ['tion']), new Map())).includes('cognate_guide_place'));
});

test('recognised words: a guide adds its families, and an order given the same guides at the same hours gains them', () => {
  const graph = { headwords: [{ id: 'xx:lex:a', lemma: 'a', pos: 'noun' }, { id: 'xx:lex:nation', lemma: 'nation', pos: 'noun' }, { id: 'xx:lex:action', lemma: 'action', pos: 'noun' }], forms: [], constructions: [], paradigms: [] };
  const table = { slotExact: {}, slotFamily: {}, slotDefault: ['V'], wordClass: { noun: 'N' }, guideCovered: { prefixes: [], levels: [], ids: [] }, chunkFamilies: [], wrapperFamilies: [], wrapperIds: [], operatorFamilies: [] };
  const U = universe({ graph, table, taughtAt: new Map([['xx:lex:a', 1]]), families: new Map([['tion', ['xx:lex:nation', 'xx:lex:action']]]) });
  const cost = { c0: 10, cw: 1, cp: 1 };
  const lessons = [{ words: ['xx:lex:a'], patterns: [], order: ['xx:lex:a'] }];
  assert.equal(simulate(lessons, U, cost).at(-1).recognised, 1);
  const guided = withGuides(lessons, U, cost, [{ at: 0, minutes: 5, families: ['tion'] }]);
  assert.equal(simulate(guided, U, cost).at(-1).recognised, 3);
  assert.equal(simulate(guided, U, cost).at(-1).words, 1);
});
