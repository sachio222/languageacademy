import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KINDS, STEPS_BY_KIND, validateModule, defaultSteps } from '../schema/module.mjs';
import { assembleCourse } from '../assemble.mjs';
import { miniModule, miniOutline, miniFiles, MINI_KEYS, OUTLINE_FILE } from './mini-fixture.mjs';

const unitOf = { lesson: 1, reading: 1, guide: 2, practice: 2, unit_exam: 3, reference: null };
const codes = (mod, unitIndex = 1) => validateModule(mod, { file: 'm.json', unitIndex }).map((p) => p.code);

test('six kinds', () => {
  assert.deepEqual(KINDS, ['lesson', 'guide', 'reading', 'practice', 'unit_exam', 'reference']);
});

test('steps by kind use L section ids', () => {
  assert.deepEqual(STEPS_BY_KIND, {
    lesson: ['vocabulary-intro', 'pronunciation', 'flash-cards', 'speed-match', 'writing', 'conversation', 'lesson-exam'],
    guide: ['interactive-help'],
    reading: ['reading-passage'],
    practice: ['practice-exercises'],
    unit_exam: ['exam-questions'],
    reference: [],
  });
});

for (const kind of ['lesson', 'guide', 'reading', 'practice', 'unit_exam', 'reference']) {
  test(`fixture ${kind} validates clean`, () => {
    const mod = miniModule(MINI_KEYS[kind]);
    assert.equal(mod.kind, kind);
    assert.deepEqual(validateModule(mod, { file: `${MINI_KEYS[kind]}.json`, unitIndex: unitOf[kind] }), []);
  });
}

test('guide needs three checks', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.checks = mod.checks.slice(0, 2);
  const ps = validateModule(mod, { file: 'g.json', unitIndex: 2 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['guide_checks_count', 'checks']]);
});

test('guide check needs exactly one right option', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.checks[0].options[1].right = true;
  assert.deepEqual(codes(mod, 2), ['options_invalid']);
});

test('guide block must be one of L example blocks', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.parts[0].block = { carousel: [] };
  assert.deepEqual(codes(mod, 2), ['block_invalid']);
});

test('vocabulary on an exam', () => {
  const mod = miniModule(MINI_KEYS.unit_exam);
  mod.vocabulary = [{ word_id: 'gare-fr', fr: 'la gare', gloss: 'the station' }];
  const ps = validateModule(mod, { file: 'e.json', unitIndex: 3 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['teaches_in_test', 'vocabulary']]);
});

test('constructions taught by a practice set', () => {
  const mod = miniModule(MINI_KEYS.practice);
  mod.teaches = { constructions: ['fr:cx:etre.present'] };
  assert.deepEqual(codes(mod, 2), ['teaches_in_test']);
});

test('position word in title', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.title = 'Module 14: être';
  const ps = validateModule(mod, { file: 'l.json', unitIndex: 1 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['position_word', 'title']]);
});

test('position words anywhere a learner reads', () => {
  const cases = [
    (m) => { m.description = 'As you saw in M12, {je suis} means I am.'; },
    (m) => { m.concepts[0].definition = 'Review Unit 3 first.'; },
    (m) => { m.items[1].hint = 'Like in Reading 7.'; },
  ];
  for (const change of cases) {
    const mod = miniModule(MINI_KEYS.lesson);
    change(mod);
    assert.deepEqual(codes(mod), ['position_word']);
  }
});

test('lesson items default to steps', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  const withMistakes = mod.items.find((i) => i.id === 'i-je-suis');
  const without = mod.items.find((i) => i.id === 'i-paul');
  assert.deepEqual(defaultSteps(withMistakes, 'lesson'), ['writing', 'lesson-exam']);
  assert.deepEqual(defaultSteps(without, 'lesson'), ['lesson-exam']);

  // Applied in assembleCourse's Module objects; the source JSON keeps no steps.
  const course = assembleCourse(miniOutline(), miniFiles(), { outlineFile: OUTLINE_FILE });
  const items = course.modules.get(MINI_KEYS.lesson).items;
  assert.deepEqual(items.find((i) => i.id === 'i-je-suis').steps, ['writing', 'lesson-exam']);
  assert.deepEqual(items.find((i) => i.id === 'i-paul').steps, ['lesson-exam']);
  assert.deepEqual(items.find((i) => i.id === 'i-plural').steps, ['writing', 'lesson-exam']);
  assert.equal(withMistakes.steps, undefined);
});

test('a meaning item is never defaulted into writing', () => {
  // Spec 5.4: meaning items appear in lesson-exam and exam-questions only.
  assert.deepEqual(defaultSteps({ id: 'm', type: 'meaning', mistakes: [{ answer: 'x', feedback: 'y' }] }, 'lesson'), ['lesson-exam']);
});

test('steps outside the kind or type', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.items[0].steps = ['reading-passage'];
  mod.items[3].steps = ['writing']; // a meaning item
  assert.deepEqual(codes(mod), ['step_not_allowed', 'step_not_allowed']);
});

test('reading item types', () => {
  const mod = miniModule(MINI_KEYS.reading);
  mod.items.push({ id: 'q-say', type: 'respond', situation: 'Say hello to Paul.', answer: 'bonjour Paul' });
  const ps = validateModule(mod, { file: 'r.json', unitIndex: 1 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['item_type_not_allowed', 'items[2].type']]);
});

test('translate items stay in unit 1', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  assert.deepEqual(codes(mod, 2), ['translate_outside_unit1']);
  // Not placed by the outline yet: the outline reports it, and the unit rule waits.
  assert.deepEqual(codes(mod, null), []);
});

test('unknown fields fail at every level', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.access = 'free';
  mod.vocabulary[0].wikipedia = 'x';
  mod.tables[0].rows[0].colour = 'red';
  const ps = validateModule(mod, { file: 'l.json', unitIndex: 1 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [
    ['field_unknown', 'access'],
    ['field_unknown', 'vocabulary[0].wikipedia'],
    ['field_unknown', 'tables[0].rows[0].colour'],
  ]);
});

test('duplicate ids inside a module', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.items[1].id = mod.items[0].id;
  const ps = validateModule(mod, { file: 'l.json', unitIndex: 1 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['id_duplicate', 'items[1].id']]);
});

test('speed match lists six of the lesson words', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.speed_match = mod.speed_match.slice(0, 5).concat(['chat-fr']);
  assert.deepEqual(codes(mod), ['speed_match_invalid']);
});

test('reading preview blocks name passage blocks', () => {
  const mod = miniModule(MINI_KEYS.reading);
  mod.preview_blocks = ['b1', 'b9'];
  assert.deepEqual(codes(mod), ['preview_block_unknown']);
});

test('module key pattern accepts old dated keys and new slugs', () => {
  for (const key of ['2024-01-02-etre', 'questions-help', 'liaison']) {
    const mod = miniModule(MINI_KEYS.guide);
    mod.module_key = key;
    assert.deepEqual(codes(mod, 2), [], key);
  }
  for (const key of ['Etre', '2024-1-2-etre', 'questions_help', '-help']) {
    const mod = miniModule(MINI_KEYS.guide);
    mod.module_key = key;
    assert.deepEqual(codes(mod, 2), ['module_key_invalid'], key);
  }
});

test('a planned module holds only what the plan settles', () => {
  const stub = { schema: 'la-module@1', module_key: 'weather', kind: 'lesson', status: 'planned', title: 'The weather', teaches: { constructions: [] }, plan: { words: ['fr:lex:pluie'], constructions: [], source: 'plan.json' } };
  assert.deepEqual(codes(stub, 13), []);
  assert.deepEqual(codes({ ...stub, vocabulary: [] }, 13), ['field_unknown']);
  assert.deepEqual(codes({ ...stub, plan: undefined }, 13), ['field_missing']);
  assert.deepEqual(codes({ ...stub, status: 'drafted' }, 13), ['status_invalid']);
});

test('written modules may not carry a plan', () => {
  const mod = miniModule(MINI_KEYS.practice);
  mod.plan = { words: [], constructions: [], source: 'plan.json' };
  assert.deepEqual(codes(mod, 2), ['field_unknown']);
});

test('bad French span in a module field', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.parts[1].text[0] = 'Put {est-ce que in front.';
  const ps = validateModule(mod, { file: 'g.json', unitIndex: 2 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['span_unclosed', 'parts[1].text[0]']]);
});
