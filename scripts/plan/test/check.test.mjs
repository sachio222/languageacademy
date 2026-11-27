// checkPlan's rules, each on a small plan built here: no language's files are read.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPlan } from '../check.mjs';
import { schemaProblems } from '../plan.mjs';

const LIMITS = { lesson_words: 3, table_words: 2, minutes: 35, exam_items: 35, exam_minutes: 25, guides: 1 };
const lesson = (key, words = [], constructions = [], more = {}) => ({ module_key: key, kind: 'lesson', title: key, teaches: { words, constructions }, minutes: 20, ...more });
const exam = (key, items = 20, minutes = 20) => ({ module_key: key, kind: 'unit_exam', title: 'Unit exam', teaches: { words: [], constructions: [] }, minutes, exam: { items, minutes } });
const reading = (key, words = [], must_use = []) => ({
  module_key: key, kind: 'reading', title: key, teaches: { words, constructions: [] }, minutes: 20,
  reading: { parts: [{ kind: 'story', type: 'a-mystery', title: 't', title_native: 't' }], premise: 'p', must_use },
});
const unit = (key, modules) => ({ unit_key: key, title: key, can_do: 'You can.', setting: { cast: ['A'] }, modules });
const planOf = (units, more = {}) => ({ schema: 'la-course-plan@1', language: 'xx', native: 'en', units, ...more });

const head = (id) => [id, { id, lemma: id.split(':').at(-1) }];
const LOOKUPS = {
  headwords: new Map(['xx:lex:a', 'xx:lex:b', 'xx:lex:c', 'xx:lex:d', 'xx:lex:e', 'xx:lex:old'].map(head)),
  forms: new Map(),
  constructions: new Map([['xx:cx:one', { id: 'xx:cx:one', needs: [] }], ['xx:cx:two', { id: 'xx:cx:two', needs: ['xx:cx:one'] }]]),
};

/** Runs the check with positions in plan order after `after`, and a timeline that knows what the plan has taught so far. */
function run(plan, { taught = new Map(), reached = {}, previous = null, written = new Set() } = {}) {
  const position = new Map();
  const at = new Map(taught);
  let p = 100;
  for (const u of plan.units) for (const m of u.modules) {
    if (written.has(m.module_key)) continue;
    position.set(m.module_key, ++p);
    for (const id of [...(m.kind === 'reading' ? [] : m.teaches.constructions), ...m.teaches.words]) if (!at.has(id)) at.set(id, p);
  }
  return checkPlan({ plan, readingTypes: READING_TYPES, limits: LIMITS, lookups: LOOKUPS, taughtAt: taught, isAvailable: (id, pos) => at.has(id) && at.get(id) <= pos, position, written, reached, previous });
}
const READING_TYPES = new Set(['a-mystery', 'a-debate']);
const codes = (result) => result.problems.map((p) => p.code);

test('a plan that keeps every rule has no problems and reports what it holds', () => {
  const plan = planOf([unit('u1', [lesson('l1', ['xx:lex:a'], ['xx:cx:one']), lesson('l2', ['xx:lex:b'], ['xx:cx:two']), reading('r1', ['xx:lex:c'], ['xx:cx:two']), exam('e1')])]);
  assert.deepEqual(schemaProblems(plan), []);
  const { problems, report } = run(plan);
  assert.deepEqual(problems, []);
  assert.equal(report.words, 3);
  assert.equal(report.modules, 4);
  assert.deepEqual(report.by_kind, { lesson: 2, guide: 0, reading: 1, practice: 0, unit_exam: 1 });
  assert.equal(report.first_position, 101);
  assert.equal(report.last_position, 104);
});

test('a schema problem stops the check and is reported', () => {
  const plan = planOf([unit('u1', [{ ...lesson('l1'), surprise: 1 }])]);
  const { problems, report } = run(plan);
  assert.equal(report, null);
  assert.ok(problems.every((p) => p.code === 'schema'));
  assert.match(problems[0].message, /surprise/);
});

test('the schema asks a reading for its reading block and an exam for its exam block', () => {
  const bare = (kind) => ({ module_key: 'm', kind, title: 't', teaches: { words: [], constructions: [] }, minutes: 5 });
  assert.ok(schemaProblems(planOf([unit('u1', [bare('reading')])])).length > 0);
  assert.ok(schemaProblems(planOf([unit('u1', [bare('unit_exam')])])).length > 0);
  assert.ok(schemaProblems(planOf([unit('u1', [{ ...bare('lesson'), exam: { items: 1, minutes: 1 } }])])).length > 0);
  assert.ok(schemaProblems(planOf([unit('u1', [{ ...bare('lesson'), kind: 'quiz' }])])).length > 0);
});

test('each word is taught once: not twice in the plan, and not again after the written course', () => {
  const twice = run(planOf([unit('u1', [lesson('l1', ['xx:lex:a']), lesson('l2', ['xx:lex:a'])])]));
  assert.deepEqual(codes(twice), ['word_twice']);
  assert.match(twice.problems[0].message, /already taught by l1/);
  const again = run(planOf([unit('u1', [lesson('l1', ['xx:lex:old'])])]), { taught: new Map([['xx:lex:old', 7]]) });
  assert.deepEqual(codes(again), ['word_already_taught']);
});

test('a word must be in the graph or in words_to_add, placed in the module that teaches it', () => {
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', ['xx:lex:new'])])]))), ['word_unknown']);
  const add = (module_key, id = 'xx:lex:new') => [{ id, lemma: 'new', pos: 'noun', level: 'A1', gloss: 'new', module_key }];
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', ['xx:lex:new'])])], { words_to_add: add('l1') }))), []);
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', ['xx:lex:new']), lesson('l2')])], { words_to_add: add('l2') }))), ['word_to_add_unplaced']);
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', ['xx:lex:a'])])], { words_to_add: add('l1', 'xx:lex:a') }))), ['word_to_add_exists']);
});

test('a pattern is taught, practised or required only when what it needs is known', () => {
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', [], ['xx:cx:two'])])]))), ['construction_order']);
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', [], ['xx:cx:one', 'xx:cx:two'])])]))), []);
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', [], [], { practises: ['xx:cx:one'] }), lesson('l2', [], ['xx:cx:one'])])]))), ['construction_order']);
  assert.deepEqual(codes(run(planOf([unit('u1', [reading('r1', [], ['xx:cx:one'])])]))), ['construction_order']);
  assert.deepEqual(codes(run(planOf([unit('u1', [lesson('l1', [], ['xx:cx:nine'])])]))), ['construction_unknown']);
});

test('a practice set and an exam teach nothing, and a reading teaches words only', () => {
  const e = { ...exam('e1'), teaches: { words: ['xx:lex:a'], constructions: [] } };
  assert.ok(codes(run(planOf([unit('u1', [e])]))).includes('teaches_in_test'));
  const r = { ...reading('r1'), teaches: { words: [], constructions: ['xx:cx:one'] } };
  assert.ok(codes(run(planOf([unit('u1', [r])]))).includes('teaches_in_test'));
});

test('sizes: lesson words, table words, minutes, exam items and minutes, guides in a unit', () => {
  const guide = (key) => ({ ...lesson(key), kind: 'guide' });
  const big = planOf([unit('u1', [
    lesson('l1', ['xx:lex:a', 'xx:lex:b', 'xx:lex:c', 'xx:lex:d']), reading('r1', ['xx:lex:e', 'xx:lex:old', 'xx:lex:z']),
    lesson('l2', [], [], { minutes: 36 }), exam('e1', 36, 26), guide('g1'), guide('g2'),
  ])], { words_to_add: [{ id: 'xx:lex:z', lemma: 'z', pos: 'noun', level: 'A1', gloss: 'z', module_key: 'r1' }] });
  assert.deepEqual(codes(run(big)).sort(), ['exam_items_over', 'exam_minutes_over', 'guides_over', 'lesson_words_over', 'minutes_over', 'table_words_over']);
});

test('a level must be reached by the unit the plan names', () => {
  const plan = planOf([unit('u1', [lesson('l1', ['xx:lex:a'])]), unit('u2', [lesson('l2', ['xx:lex:b'])])], { levels: { A1: 'u1' } });
  assert.deepEqual(codes(run(plan, { reached: { A1: 101 } })), []);
  assert.deepEqual(run(plan, { reached: { A1: 101 } }).report.levels.A1, { reached: true, position: 101, unit_key: 'u1', module_key: 'l1', in_written_course: false, teaching_module: 1, of: 1 });
  assert.deepEqual(codes(run(plan, { reached: { A1: 102 } })), ['level_late']);
  assert.deepEqual(codes(run(plan, { reached: { A1: null } })), ['level_late']);
  assert.deepEqual(codes(run(plan, { reached: { A1: 40 } })), [], 'reached in the written course, before the plan starts');
});

test('against an earlier plan, a word no module teaches now is dropped', () => {
  const before = planOf([unit('u1', [lesson('l1', ['xx:lex:a', 'xx:lex:b'])])]);
  const now = planOf([unit('u1', [lesson('l1', ['xx:lex:a'])])]);
  assert.deepEqual(codes(run(now, { previous: before })), ['word_dropped']);
  assert.deepEqual(codes(run(now, { previous: before, taught: new Map([['xx:lex:b', 3]]) })), [], 'a word the written course now teaches is not dropped');
});

test('a repeated key is reported, and a written module is skipped', () => {
  assert.ok(codes(run(planOf([unit('u1', [lesson('l1')]), unit('u1', [lesson('l1')])]))).includes('key_repeated'));
  assert.ok(codes(run(planOf([unit('u1', [lesson('l1')]), unit('u1', [lesson('l2')])]))).includes('unit_repeated'));
  const plan = planOf([unit('u1', [lesson('l1', ['xx:lex:old']), lesson('l2', ['xx:lex:a'])])]);
  const { problems, report } = run(plan, { written: new Set(['l1']), taught: new Map([['xx:lex:old', 9]]) });
  assert.deepEqual(problems, []);
  assert.equal(report.modules, 1);
});

test('every part of a reading names its type, and the type is one of the shared catalog', () => {
  const withType = (type) => planOf([unit('u1', [{ ...reading('r1'), reading: { parts: [{ kind: 'article', type, title: 't', title_native: 't' }], premise: 'p', must_use: [] } }])]);
  const untyped = planOf([unit('u1', [{ ...reading('r1'), reading: { parts: [{ kind: 'story', title: 't', title_native: 't' }], premise: 'p', must_use: [] } }])]);
  assert.ok(schemaProblems(untyped).some((m) => /type/.test(m)), 'a part with no type is a schema problem');
  assert.deepEqual(codes(run(withType('a-debate'))), []);
  const unknown = run(withType('a-viking-saga'));
  assert.deepEqual(codes(unknown), ['reading_type_unknown']);
  assert.match(unknown.problems[0].message, /a-viking-saga/);
});

test('a reading may say in one line why it picked its type, and the check never asks for the type another plan used', () => {
  const noted = planOf([unit('u1', [{ ...reading('r1'), reading: { parts: [{ kind: 'story', type: 'a-debate', title: 't', title_native: 't' }], type_note: 'a debate fits this town better than a mystery', premise: 'p', must_use: [] } }])]);
  assert.deepEqual(schemaProblems(noted), []);
  assert.deepEqual(codes(run(noted)), []);
});

test('the report counts where each reading type is used', () => {
  const plan = planOf([unit('u1', [reading('r1'), exam('e1')]), unit('u2', [reading('r2'), exam('e2')])]);
  const { report } = run(plan);
  assert.deepEqual(report.reading_types, { 'a-mystery': ['u1', 'u2'] });
});

// ---- the teaching method's own rules (structure never stops, carriers, markers, guides)
const POS = { 'xx:lex:a': 'noun', 'xx:lex:b': 'noun', 'xx:lex:c': 'noun', 'xx:lex:d': 'verb', 'xx:lex:e': 'adverb', 'xx:lex:old': 'verb' };
const METHOD_LOOKUPS = {
  ...LOOKUPS,
  headwords: new Map([...LOOKUPS.headwords].map(([id, h]) => [id, { ...h, pos: POS[id] }])),
  constructions: new Map([...LOOKUPS.constructions, ['xx:cx:three', { id: 'xx:cx:three', needs: [] }], ['xx:cx:chunk.hi', { id: 'xx:cx:chunk.hi', needs: [] }]]),
};
const METHOD = {
  filler_list: 3,
  counts: (id) => !id.includes(':cx:chunk.'),
  markers: new Map([['xx:lex:e', ['xx:cx:three']]]),
  frameWords: new Set(),
};
function runMethod(plan, { taught = new Map() } = {}) {
  const position = new Map();
  const at = new Map(taught);
  let p = 100;
  for (const u of plan.units) for (const m of u.modules) {
    position.set(m.module_key, ++p);
    for (const id of [...(m.kind === 'reading' ? [] : m.teaches.constructions), ...m.teaches.words]) if (!at.has(id)) at.set(id, p);
  }
  return checkPlan({ plan, readingTypes: READING_TYPES, limits: { ...LIMITS, lesson_words: 12 }, lookups: METHOD_LOOKUPS, taughtAt: taught, isAvailable: (id, pos) => at.has(id) && at.get(id) <= pos, position, method: METHOD });
}

test('structure never stops: a unit whose lessons teach no pattern fails while a ready pattern remains', () => {
  const stops = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:d'], ['xx:cx:one'])]), unit('u2', [lesson('l2', ['xx:lex:a'])])]));
  assert.deepEqual(codes(stops), ['structure_stops']);
  assert.match(stops.problems[0].message, /xx:cx:three/);
  // a pattern whose needs are not met is not ready, a fixed phrase is not structure, and a held pattern is set aside
  const held = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:d'], ['xx:cx:one'])]), unit('u2', [lesson('l2', ['xx:lex:a'], ['xx:cx:chunk.hi'])])],
    { held_patterns: [{ id: 'xx:cx:three', why: 'kept for the next level' }, { id: 'xx:cx:two', why: 'kept for the next level' }] }));
  assert.deepEqual(codes(held), []);
  // a unit with no lesson (a review unit) is not asked for a pattern
  const review = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:d'], ['xx:cx:one', 'xx:cx:two'])]), unit('u2', [exam('e2')])]));
  assert.deepEqual(codes(review), []);
});

test('a list of fillers needs a carrier: a new verb, a frame word or a pattern', () => {
  const all = { held_patterns: [{ id: 'xx:cx:two', why: 'x' }, { id: 'xx:cx:three', why: 'x' }] };
  const flat = runMethod(planOf([unit('u1', [lesson('l0', [], ['xx:cx:one']), lesson('l1', ['xx:lex:a', 'xx:lex:b', 'xx:lex:c'])])], all));
  assert.deepEqual(codes(flat), ['no_carrier']);
  const verb = runMethod(planOf([unit('u1', [lesson('l0', [], ['xx:cx:one']), lesson('l1', ['xx:lex:d', 'xx:lex:a', 'xx:lex:b', 'xx:lex:c'])])], all));
  assert.deepEqual(codes(verb), []);
  const pattern = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:a', 'xx:lex:b', 'xx:lex:c'], ['xx:cx:one'])])], all));
  assert.deepEqual(codes(pattern), []);
});

test('a marker word is taught in or after the module that teaches its pattern', () => {
  const all = { held_patterns: [{ id: 'xx:cx:two', why: 'x' }] };
  const early = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:e'], ['xx:cx:one']), lesson('l2', [], ['xx:cx:three'])])], all));
  assert.deepEqual(codes(early), ['marker_without_pattern']);
  const together = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:e'], ['xx:cx:one', 'xx:cx:three'])])], all));
  assert.deepEqual(codes(together), []);
});

test('a guide gathers only patterns a lesson has taught before it', () => {
  const guide = (key, gathers) => ({ module_key: key, kind: 'guide', title: key, teaches: { words: [], constructions: [] }, minutes: 5, gathers });
  const all = { held_patterns: [{ id: 'xx:cx:two', why: 'x' }, { id: 'xx:cx:three', why: 'x' }] };
  const early = runMethod(planOf([unit('u1', [guide('g1', ['xx:cx:one']), lesson('l1', ['xx:lex:d'], ['xx:cx:one'])])], all));
  assert.deepEqual(codes(early), ['guide_gathers_untaught']);
  const after = runMethod(planOf([unit('u1', [lesson('l1', ['xx:lex:d'], ['xx:cx:one']), guide('g1', ['xx:cx:one'])])], all));
  assert.deepEqual(codes(after), []);
});

test('a carrier is something the module teaches or the learner owns, and each word is met through owned material', () => {
  const all = { held_patterns: [{ id: 'xx:cx:two', why: 'x' }, { id: 'xx:cx:three', why: 'x' }] };
  const good = lesson('l1', ['xx:lex:d', 'xx:lex:a'], ['xx:cx:one'], { carrier: 'xx:cx:one', met_through: { 'xx:lex:d': ['xx:cx:one'], 'xx:lex:a': ['xx:lex:d'] } });
  assert.deepEqual(schemaProblems(planOf([unit('u1', [good])], all)), []);
  assert.deepEqual(codes(runMethod(planOf([unit('u1', [good])], all))), []);
  const strangerCarrier = lesson('l1', ['xx:lex:d'], ['xx:cx:one'], { carrier: 'xx:lex:b' });
  assert.deepEqual(codes(runMethod(planOf([unit('u1', [strangerCarrier])], all))), ['carrier_unknown']);
  // a word met through a word that comes after it in the lesson, and a word with no entry
  const backwards = lesson('l1', ['xx:lex:d', 'xx:lex:a'], ['xx:cx:one'], { carrier: 'xx:cx:one', met_through: { 'xx:lex:d': ['xx:lex:a'] } });
  assert.deepEqual(codes(runMethod(planOf([unit('u1', [backwards])], all))).sort(), ['met_through_missing', 'met_through_unknown']);
});
