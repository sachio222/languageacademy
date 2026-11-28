import { test } from 'node:test';
import assert from 'node:assert/strict';
import { KINDS, STEPS_BY_KIND, validateModule, defaultSteps, moduleTexts } from '../schema/module.mjs';
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

test('a guide may carry a short title of 1 to 40 characters', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.short_title = 'Questions';
  assert.deepEqual(codes(mod, 2), []);
  assert.deepEqual(moduleTexts(mod).find((t) => t.path === 'short_title'), { path: 'short_title', role: 'native', text: 'Questions' });
  mod.short_title = 'x'.repeat(41);
  assert.deepEqual(codes(mod, 2), ['short_title_long']);
  mod.short_title = '';
  assert.equal(codes(mod, 2).length, 1);
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.short_title = 'Être';
  assert.deepEqual(codes(lesson, 1), ['field_unknown']);
});

test("a guide may end with one Read more link, { label, url }, on L's GuideBody.more limits", () => {
  const mod = miniModule(MINI_KEYS.guide);
  const link = { label: 'Why some French letters are written but not said', url: 'https://example.org/sons-et-lettres/23/' };
  mod.more = { ...link };
  assert.deepEqual(codes(mod, 2), []);
  assert.deepEqual(moduleTexts(mod).find((t) => t.path === 'more.label'), { path: 'more.label', role: 'native', text: link.label });
  const withMore = (more) => codes({ ...mod, more }, 2);
  assert.deepEqual(withMore({ ...link, url: 'http://example.org/a' }), ['field_type'], 'http is refused');
  assert.deepEqual(withMore({ ...link, url: 'https://example.org/a b' }), ['field_type'], 'a space in the url is refused');
  assert.deepEqual(withMore({ ...link, url: `https://example.org/${'a'.repeat(481)}` }), ['field_type'], 'a url over 500 characters is refused');
  assert.deepEqual(withMore({ ...link, url: `https://example.org/${'a'.repeat(480)}` }), [], 'a url of 500 characters is fine');
  assert.deepEqual(withMore({ ...link, label: 'x'.repeat(81) }), ['field_type'], 'a label over 80 characters is refused');
  assert.deepEqual(withMore({ ...link, label: '😀'.repeat(80) }), [], 'the label counts characters');
  assert.deepEqual(withMore({ ...link, label: '' }), ['field_type']);
  assert.deepEqual(withMore({ ...link, label: 'Read about {ils}' }), ['span_in_plain_field'], 'the label is plain English');
  assert.deepEqual(withMore({ url: link.url }), ['field_missing']);
  assert.deepEqual(withMore({ ...link, zz: 1 }), ['field_unknown']);
  assert.deepEqual(withMore(null), ['field_type'], 'null is refused; leave the field out for no link');
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.more = { ...link };
  assert.deepEqual(codes(lesson, 1), ['field_unknown'], 'only a guide has more');
});

test('guide check needs exactly one right option', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.checks[0].options[1].right = true;
  assert.deepEqual(codes(mod, 2), ['options_invalid']);
});

test('guide block must be one of L example blocks', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.parts[0].blocks = [{ carousel: [] }];
  const ps = validateModule(mod, { file: 'g.json', unitIndex: 2 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['block_invalid', 'parts[0].blocks[0]']]);
});

test('a guide part keeps several blocks in order, a block may have a heading', () => {
  const mod = miniModule(MINI_KEYS.guide);
  const part = mod.parts[1];
  assert.deepEqual(part.blocks.map((b) => Object.keys(b).filter((k) => k !== 'heading')[0]), ['build', 'lines']);
  assert.equal(part.blocks[1].heading, 'With a question word in front');
  assert.deepEqual(codes(mod, 2), []);
  const heading = moduleTexts(mod).find((t) => t.path === 'parts[1].blocks[1].heading');
  assert.deepEqual(heading, { path: 'parts[1].blocks[1].heading', role: 'native_fr', text: 'With a question word in front' });
});

test('two block types in one block', () => {
  const mod = miniModule(MINI_KEYS.guide);
  const [build, lines] = mod.parts[1].blocks;
  mod.parts[1].blocks = [{ ...build, ...lines }];
  const ps = validateModule(mod, { file: 'g.json', unitIndex: 2 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['block_invalid', 'parts[1].blocks[0]']]);
});

test('a block heading is native text with French spans', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.parts[1].blocks[1].heading = 'With {où in front';
  const ps = validateModule(mod, { file: 'g.json', unitIndex: 2 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['span_unclosed', 'parts[1].blocks[1].heading']]);
  mod.parts[1].blocks[1].heading = '';
  assert.deepEqual(codes(mod, 2), ['field_type']);
});

test('a heading alone is not a block, and blocks is a non-empty list', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.parts[0].blocks = [{ heading: 'Three ways' }];
  assert.deepEqual(codes(mod, 2), ['block_invalid']);
  mod.parts[0].blocks = [];
  assert.deepEqual(codes(mod, 2), ['field_type']);
  delete mod.parts[0].blocks;
  mod.parts[0].block = { ways: [] };
  assert.deepEqual(codes(mod, 2), ['field_unknown']);
});

test('guide checks may show French', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.checks[1].show = 'Tu viens ce soir ?';
  assert.deepEqual(codes(mod, 2), []);
  const show = moduleTexts(mod).find((t) => t.path === 'checks[1].show');
  assert.deepEqual(show, { path: 'checks[1].show', role: 'fr', text: 'Tu viens ce soir ?' });
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

// Task 9: teaches and tests name graph ids. With the graph's ids given, an id the graph lacks is an error.
const GRAPH_IDS = { constructions: new Set(['fr:cx:elision', 'fr:cx:q.est-ce-que']), words: new Set(['fr:lex:ne', 'fr:form:ne.elided']) };
const graphCodes = (mod, unitIndex) => validateModule(mod, { file: 'm.json', unitIndex, graphIds: GRAPH_IDS }).map((p) => [p.code, p.path]);

test('teaches and tests name constructions and words the graph has', () => {
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.teaches = { constructions: ['fr:cx:elision', 'fr:cx:nope'], words: ['fr:lex:ne', 'fr:form:ne.elided', 'fr:lex:nope'] };
  assert.deepEqual(graphCodes(lesson, 1), [
    ['construction_unknown', 'teaches.constructions[1]'],
    ['word_unknown', 'teaches.words[2]'],
  ]);
  const practice = miniModule(MINI_KEYS.practice);
  practice.tests = { constructions: ['fr:cx:q.est-ce-que', 'fr:lex:ne'] };
  assert.deepEqual(graphCodes(practice, 2), [['construction_unknown', 'tests.constructions[1]']]);
  // Without the graph's ids (Vite, or a caller that opts out) only the shape is checked.
  assert.deepEqual(codes(lesson, 1), []);
});

test('teaches.words is a list of ids, and a practice set teaches no words', () => {
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.teaches = { constructions: [], words: 'fr:lex:ne' };
  assert.deepEqual(codes(lesson, 1), ['field_type']);
  const practice = miniModule(MINI_KEYS.practice);
  practice.teaches = { constructions: [], words: ['fr:lex:ne'] };
  assert.deepEqual(codes(practice, 2), ['teaches_in_test']);
});

test('the content loader checks graph ids', () => {
  const files = miniFiles();
  const etre = files.find((f) => f.file.endsWith('2024-01-02-etre.json'));
  const mod = JSON.parse(etre.text ?? JSON.stringify(etre.json));
  mod.teaches = { constructions: ['fr:cx:nope'] };
  const swapped = files.map((f) => (f === etre ? { file: f.file, json: mod } : f));
  assert.throws(() => assembleCourse(miniOutline(), swapped, { outlineFile: OUTLINE_FILE, graphIds: GRAPH_IDS }), (e) =>
    e.problems.some((p) => p.code === 'construction_unknown' && p.path === 'teaches.constructions[0]'));
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
  // The mini lesson also holds bare drills, which a later unit flags too (drill_without_situation).
  assert.deepEqual(codes(mod, 2).filter((c) => c !== 'drill_without_situation'), ['translate_outside_unit1']);
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

test('a planned unit exam takes its title from the outline; every other planned module needs one', () => {
  const plan = { words: [], constructions: [], source: 'plan.json' };
  const exam = { schema: 'la-module@1', module_key: 'weather-exam', kind: 'unit_exam', status: 'planned', plan };
  assert.deepEqual(codes(exam, 13), []);
  assert.deepEqual(codes({ ...exam, kind: 'lesson' }, 13), ['field_missing']);
  assert.deepEqual(codes({ ...exam, title: 'Unit 13 Exam' }, 13), ['position_word']);
});

test('a planned module may name the draft it will be written from', () => {
  const stub = { schema: 'la-module@1', module_key: 'reading-weather', kind: 'reading', status: 'planned', title: 'Reading · The weather' };
  const plan = { words: [], constructions: [], source: 'plan.json', draft: 'research/course-plan/reading-12-draft.js' };
  assert.deepEqual(codes({ ...stub, plan }, 13), []);
  assert.deepEqual(codes({ ...stub, plan: { ...plan, draft: '' } }, 13), ['field_type']);
  assert.deepEqual(codes({ ...stub, plan: { ...plan, theme: 'rain' } }, 13), ['field_unknown']);
  // A note for the writer is native text: a unit exam's subtitle or a reading's theme brief, with no position word.
  assert.deepEqual(codes({ ...stub, plan: { ...plan, note: 'A neighbourhood guide written by a teenager.' } }, 13), []);
  assert.deepEqual(codes({ ...stub, plan: { ...plan, note: 'Like Reading 7, but longer.' } }, 13), ['position_word']);
});

test("a plan's words and constructions are graph ids", () => {
  const stub = { schema: 'la-module@1', module_key: 'weather', kind: 'lesson', status: 'planned', title: 'The weather' };
  const plan = { words: ['fr:lex:ne', 'fr:lex:pluie'], constructions: ['fr:cx:elision', 'fr:cx:nope'], source: 'plan.json' };
  assert.deepEqual(graphCodes({ ...stub, plan }, 13), [
    ['construction_unknown', 'plan.constructions[1]'],
    ['word_unknown', 'plan.words[1]'],
  ]);
});

test('written modules may not carry a plan', () => {
  const mod = miniModule(MINI_KEYS.practice);
  mod.plan = { words: [], constructions: [], source: 'plan.json' };
  assert.deepEqual(codes(mod, 2), ['field_unknown']);
});

test('guide parts and Reference sections need their text', () => {
  // Spec 5.6: parts[] { id, heading, text, … }; spec 5.9: sections[] { id, heading, text, rows? }.
  const guide = miniModule(MINI_KEYS.guide);
  delete guide.parts[0].text;
  assert.deepEqual(validateModule(guide, { file: 'g.json', unitIndex: 2 }).map((p) => [p.code, p.path]), [['field_missing', 'parts[0].text']]);
  const page = miniModule(MINI_KEYS.reference);
  delete page.sections[0].text;
  assert.deepEqual(validateModule(page, { file: 'r.json', unitIndex: null }).map((p) => [p.code, p.path]), [['field_missing', 'sections[0].text']]);
});

test('bad French span in a module field', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.parts[1].text[0] = 'Put {est-ce que in front.';
  const ps = validateModule(mod, { file: 'g.json', unitIndex: 2 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [['span_unclosed', 'parts[1].text[0]']]);
});

/* ---------- final review: empty steps, empty vocabulary, braces in plain module fields ---------- */

test('a scored step with no item is step_empty', () => {
  const lesson = miniModule(MINI_KEYS.lesson);
  // Every item moved to Writing (a meaning item is asked only in the lesson exam, so it goes).
  lesson.items = lesson.items.filter((it) => it.type !== 'meaning');
  for (const it of lesson.items) it.steps = ['writing'];
  assert.deepEqual(validateModule(lesson, { file: 'l.json', unitIndex: 1 }).map((p) => [p.code, p.path]), [['step_empty', 'items']]);
});

test('a lesson needs at least one word', () => {
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.vocabulary = [];
  delete lesson.speed_match;
  assert.deepEqual(validateModule(lesson, { file: 'l.json', unitIndex: 1 }).map((p) => [p.code, p.path]), [['field_type', 'vocabulary']]);
});

test('a brace in a French or plain native module field is span_in_plain_field', () => {
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.vocabulary[0].fr = '{' + lesson.vocabulary[0].fr + '}';
  lesson.vocabulary[0].gloss = 'to {be}';
  assert.deepEqual(validateModule(lesson, { file: 'l.json', unitIndex: 1 }).map((p) => [p.code, p.path]), [
    ['span_in_plain_field', 'vocabulary[0].fr'],
    ['span_in_plain_field', 'vocabulary[0].gloss'],
  ]);
  const reading = miniModule(MINI_KEYS.reading);
  const b = reading.passage.find((x) => x.fr);
  b.en = `${b.en} {x}`;
  assert.deepEqual(codes(reading, 1), ['span_in_plain_field']);
});

// A review row (design §1, §17 item 11) shows a lesson's learner a word taught earlier, as an example; it teaches
// nothing, and it counts toward the lesson's non-empty vocabulary table.
test('a lesson of review rows only is valid', () => {
  const m = miniModule(MINI_KEYS.lesson);
  m.vocabulary = m.vocabulary.map((w) => ({ ...w, review: true }));
  assert.deepEqual(validateModule(m).filter((p) => p.severity !== 'warning'), []);
});

test('review is not a field on reading rows', () => {
  const m = miniModule(MINI_KEYS.reading);
  m.vocabulary[0].review = true;
  assert.ok(validateModule(m).some((p) => p.code === 'field_unknown' && /vocabulary\[0\]\.review/.test(p.path)));
});

test('review is not a field on reference rows, and a lesson row takes it as true or false only', () => {
  const ref = miniModule(MINI_KEYS.reference);
  ref.vocabulary[0].review = true;
  assert.deepEqual(validateModule(ref).map((p) => [p.code, p.path]), [['field_unknown', 'vocabulary[0].review']]);
  const lesson = miniModule(MINI_KEYS.lesson);
  lesson.vocabulary[0].review = 'yes';
  assert.deepEqual(validateModule(lesson).filter((p) => p.path === 'vocabulary[0].review').map((p) => p.code), ['field_type']);
  lesson.vocabulary[0].review = false;
  assert.deepEqual(validateModule(lesson, { file: 'l.json', unitIndex: 1 }), []);
});

// Fix round 1 of the la-module@1 schema agreement (pipeline Task 6B review).
test('a key named like an Object.prototype member is field_unknown, at every closed object', () => {
  const own = (o, k) => Object.defineProperty(o, k, { value: 'x', enumerable: true, writable: true, configurable: true });
  for (const k of ['constructor', 'toString', 'hasOwnProperty', 'valueOf', '__proto__']) {
    const lesson = miniModule(MINI_KEYS.lesson);
    own(lesson, k);
    own(lesson.vocabulary[0], k);
    lesson.teaches = own({ constructions: [] }, k);
    const ps = validateModule(lesson, { file: 'l.json', unitIndex: 1 }).map((p) => [p.code, p.path]);
    assert.deepEqual(ps, [['field_unknown', k], ['field_unknown', `teaches.${k}`], ['field_unknown', `vocabulary[0].${k}`]], k);
  }
});

test('a short title is measured in characters (code points), as L\'s bundle schema measures it', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.short_title = '😀'.repeat(40); // 80 UTF-16 code units, 40 characters
  assert.deepEqual(codes(mod, 2), []);
  mod.short_title = '😀'.repeat(41);
  assert.deepEqual(codes(mod, 2), ['short_title_long']);
});

test('speed match: a wrong count and a word from elsewhere are told apart', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  const messages = (m) => validateModule(m, { file: 'l.json', unitIndex: 1 }).filter((p) => p.code === 'speed_match_invalid').map((p) => p.message);
  const five = { ...mod, speed_match: mod.speed_match.slice(0, 5) };
  const stranger = { ...mod, speed_match: mod.speed_match.slice(0, 5).concat(['chat-fr']) };
  assert.deepEqual(messages(five), ['speed_match lists six word_ids']);
  assert.deepEqual(messages(stranger), ['speed_match lists only word_ids from this lesson’s vocabulary']);
});

test('a block heading is checked even when the block value has a shape L cannot draw', () => {
  const mod = miniModule(MINI_KEYS.guide);
  const part = mod.parts.find((p) => p.blocks) ?? Object.assign(mod.parts[0], { blocks: [] });
  part.blocks[0] = { pairs: [['x']], heading: 5 };
  const ps = codes(mod, 2);
  assert.ok(ps.includes('block_invalid') && ps.includes('field_type'), ps.join(', '));
});

test("a lesson, reading or guide may carry glosses { fr, en, note? } on L's BundleContent.glosses limits", () => {
  const gloss = { fr: 'nous sommes allés', en: 'we went', note: 'past of {aller}' };
  for (const [kind, unit] of [['lesson', 1], ['reading', 1], ['guide', 2]]) {
    const mod = miniModule(MINI_KEYS[kind]);
    mod.glosses = [{ ...gloss }];
    assert.deepEqual(codes(mod, unit), [], kind);
    assert.deepEqual(moduleTexts(mod).filter((t) => t.path.startsWith('glosses')), [
      { path: 'glosses[0].fr', role: 'fr', text: gloss.fr },
      { path: 'glosses[0].en', role: 'native', text: gloss.en },
      { path: 'glosses[0].note', role: 'native_fr', text: gloss.note },
    ]);
  }
  const mod = miniModule(MINI_KEYS.lesson);
  const withGlosses = (glosses) => codes({ ...mod, glosses }, 1);
  assert.deepEqual(withGlosses([]), []);
  assert.deepEqual(withGlosses([{ fr: 'allés', en: 'went' }]), [], 'note is optional');
  assert.deepEqual(withGlosses([{ fr: 'x'.repeat(101), en: 'went' }]), ['field_type'], 'fr is at most 100 characters');
  assert.deepEqual(withGlosses([{ fr: 'x'.repeat(100), en: 'y'.repeat(200), note: 'z'.repeat(200) }]), []);
  assert.deepEqual(withGlosses([{ fr: 'allés', en: 'y'.repeat(201) }]), ['field_type'], 'en is at most 200 characters');
  assert.deepEqual(withGlosses([{ fr: 'allés', en: 'went', note: 'z'.repeat(201) }]), ['field_type'], 'note is at most 200 characters');
  assert.deepEqual(withGlosses([{ fr: 'allés' }]), ['field_missing']);
  assert.deepEqual(withGlosses([{ fr: 'allés', en: 'went', zz: 1 }]), ['field_unknown']);
  assert.deepEqual(withGlosses([{ fr: 'allés', en: '{went}' }]), ['span_in_plain_field'], 'en is plain English');
  assert.deepEqual(withGlosses([{ fr: '{allés}', en: 'went' }]), ['span_in_plain_field'], 'fr is French with no braces');
  assert.deepEqual(withGlosses([{ fr: 'allés', en: 'went' }, { fr: 'allés', en: 'gone' }]), ['id_duplicate'], 'a form is glossed once');
  for (const kind of ['practice', 'unit_exam', 'reference']) {
    const m = miniModule(MINI_KEYS[kind]);
    m.glosses = [{ ...gloss }];
    assert.ok(codes(m, unitOf[kind] ?? 1).includes('field_unknown'), `a ${kind} takes no glosses`);
  }
});

test("gloss_is_card: a gloss that spells one of the module's word cards, compared as L's gloss_taught compares", () => {
  const mod = miniModule(MINI_KEYS.lesson);
  const card = mod.vocabulary[0].fr; // je suis
  for (const fr of [card, card.toUpperCase(), `  ${card.replace(' ', '   ')} `])
    assert.deepEqual(validateModule({ ...mod, glosses: [{ fr, en: 'I am' }] }, { file: 'm.json', unitIndex: 1 }).map((p) => [p.code, p.path]), [['gloss_is_card', 'glosses[0].fr']], JSON.stringify(fr));
  const apostrophe = { ...mod, vocabulary: [...mod.vocabulary, { word_id: 'j-ai-fr', fr: 'j’ai', gloss: 'I have' }] };
  assert.deepEqual(codes({ ...apostrophe, glosses: [{ fr: "J'ai", en: 'I have' }] }), ['gloss_is_card'], 'every apostrophe reads as one');
  const review = { ...mod, vocabulary: mod.vocabulary.map((w, i) => (i === 1 ? { ...w, review: true } : w)) };
  assert.deepEqual(codes({ ...review, glosses: [{ fr: 'tu es', en: 'you are' }] }), ['gloss_is_card'], 'a review card is a card too');
  assert.deepEqual(codes({ ...mod, glosses: [{ fr: 'je suis allé', en: 'I went' }] }), [], 'a longer form is not the card');
  const reading = miniModule(MINI_KEYS.reading);
  assert.ok(reading.vocabulary.length > 0);
  assert.deepEqual(codes({ ...reading, glosses: [{ fr: reading.vocabulary[0].fr, en: 'x' }] }), ['gloss_is_card']);
});

// A lesson's conjugation: the verb step's data (one row per person, grouped by sound, stem and silent letters marked).
const VOULOIR = () => ({
  verb: 'vouloir',
  en: 'to want',
  pattern: 'irregular',
  note: '{vouloir} has three stems and four spoken forms.',
  groups: [
    { id: 'veu', sound: '/vø/' },
    { id: 'veul', sound: '/vœl/' },
    { id: 'voulons', sound: '/vu.lɔ̃/' },
    { id: 'voulez', sound: '/vu.le/' },
  ],
  rows: [
    { person: 'je', form: 'veux', en: 'I want', group: 'veu', stem: 'veu', silent: 'x' },
    { person: 'tu', form: 'veux', en: 'you want', group: 'veu', stem: 'veu', silent: 'x' },
    { person: 'il/elle/on', form: 'veut', en: 'he, she, one wants', group: 'veu', stem: 'veu', silent: 't' },
    { person: 'vous', form: 'voulez', en: 'you want (polite or plural)', group: 'voulez', stem: 'voul' },
    { person: 'ils/elles', form: 'veulent', en: 'they want', group: 'veul', stem: 'veul', silent: 'ent' },
    { person: 'nous', form: 'voulons', en: 'we want', group: 'voulons', stem: 'voul' },
  ],
});

// A lesson with a sentence for every person of vouloir: each form comes back in review inside one.
const verbLesson = () => {
  const mod = miniModule(MINI_KEYS.lesson);
  const said = [['je', 'veux'], ['tu', 'veux'], ['il', 'veut'], ['vous', 'voulez'], ['ils', 'veulent'], ['nous', 'voulons']];
  mod.items = [...mod.items, ...said.map(([p, f]) => ({ id: `i-verb-${p}`, type: 'respond', situation: 'Say who wants it', cue: `${p} want it`, answer: `${p} ${f} ça` }))];
  return mod;
};

test('every form of a conjugation has a sentence among the lesson\'s items', () => {
  const mod = verbLesson();
  mod.conjugation = VOULOIR();
  mod.items = mod.items.filter((i) => i.id !== 'i-verb-vous');
  assert.deepEqual(validateModule(mod, { file: 'l.json', unitIndex: 1 }).map((x) => [x.code, x.path]), [['conjugation_row_no_sentence', 'conjugation.rows[3]']]);
  // The person and the form alone are not a sentence.
  mod.items.push({ id: 'i-verb-vous', type: 'respond', situation: 'Say it', cue: 'you want', answer: 'vous voulez' });
  assert.deepEqual(validateModule(mod, { file: 'l.json', unitIndex: 1 }).map((x) => x.code), ['conjugation_row_no_sentence']);
});

test('a lesson may carry a conjugation for its verb step', () => {
  const mod = verbLesson();
  mod.conjugation = VOULOIR();
  assert.deepEqual(validateModule(mod, { file: 'l.json', unitIndex: 1 }), []);
});

test('a conjugation row names a sound group the conjugation has', () => {
  const mod = verbLesson();
  mod.conjugation = VOULOIR();
  mod.conjugation.rows[0].group = 'vo';
  assert.deepEqual(codes(mod), ['conjugation_group_unknown']);
});

test('a conjugation row splits its form: the stem starts it, the silent letters end it', () => {
  const mod = verbLesson();
  mod.conjugation = VOULOIR();
  mod.conjugation.rows[0].stem = 'vou';
  mod.conjugation.rows[2].silent = 'x';
  const ps = validateModule(mod, { file: 'l.json', unitIndex: 1 });
  assert.deepEqual(ps.map((p) => [p.code, p.path]), [
    ['conjugation_split_invalid', 'conjugation.rows[0].stem'],
    ['conjugation_split_invalid', 'conjugation.rows[2].silent'],
  ]);
});

test('every sound group of a conjugation has a row, and each person comes once', () => {
  const mod = verbLesson();
  mod.conjugation = VOULOIR();
  mod.conjugation.groups.push({ id: 'spare', sound: '/x/' });
  mod.conjugation.rows[1].person = 'je';
  assert.deepEqual(codes(mod).sort(), ['conjugation_group_empty', 'id_duplicate'].sort());
});

test('a verb that follows a pattern names its model verb', () => {
  const mod = verbLesson();
  mod.conjugation = { ...VOULOIR(), pattern: 'er' };
  assert.deepEqual(codes(mod), ['conjugation_model_missing']);
  mod.conjugation.model = 'parler';
  assert.deepEqual(codes(mod), []);
});

test('a conjugation belongs to a lesson only', () => {
  const mod = miniModule(MINI_KEYS.guide);
  mod.conjugation = VOULOIR();
  assert.deepEqual(codes(mod, 2), ['field_unknown']);
});

test('a lesson with a conjugation adds the verb step right after vocabulary-intro', async () => {
  const { moduleSteps } = await import('../schema/module.mjs');
  const mod = miniModule(MINI_KEYS.lesson);
  assert.deepEqual(moduleSteps(mod), STEPS_BY_KIND.lesson);
  mod.conjugation = VOULOIR();
  assert.deepEqual(moduleSteps(mod), ['vocabulary-intro', 'verb-forms', ...STEPS_BY_KIND.lesson.slice(1)]);
  assert.deepEqual(moduleSteps(miniModule(MINI_KEYS.guide)), STEPS_BY_KIND.guide);
});
