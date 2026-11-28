// Concept cards and Reference sections hold their examples as a list, examples: [{ fr, en?, note? }], with an optional
// layout ("list" or "forms"). The old example string is accepted only while a unit waits for its migration.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateModule, moduleTexts } from '../schema/module.mjs';
import { inlineListRuns, isFormula, formsProblems, readExampleString } from '../concept-examples.mjs';
import { miniModule, MINI_KEYS } from './mini-fixture.mjs';
import fr from '../../graph/fr/language.mjs';

const PERSONS = fr.persons;
const codes = (mod, ctx = {}) => validateModule(mod, { file: 'm.json', unitIndex: 1, persons: PERSONS, ...ctx }).map((p) => p.code);
const lessonWith = (card) => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.concepts = [{ id: 'c-card', term: '{vouloir} = to want', definition: 'The verb for wanting something.', ...card }];
  return mod;
};
const LIST = [
  { fr: 'Je veux ça.', en: 'I want that.' },
  { fr: 'Tu veux un café ?', en: 'Do you want a coffee?' },
];
const FORMS = ['je veux', 'tu veux', 'il veut', 'nous voulons', 'vous voulez', 'ils veulent'].map((x) => ({ fr: x }));

/* ---------- the shape ---------- */

test('a card with a list of examples validates clean', () => {
  assert.deepEqual(codes(lessonWith({ examples: LIST })), []);
  assert.deepEqual(codes(lessonWith({ examples: LIST, layout: 'list' })), []);
  assert.deepEqual(codes(lessonWith({ examples: [{ fr: 'Je veux ça.', en: 'I want that.', note: 'said of a thing you point at' }] })), []);
});

test('the old example string is still accepted while a unit waits for its migration', () => {
  assert.deepEqual(codes(lessonWith({ example: '{Je veux ça} (I want that), {Tu veux ?} (do you want?)' })), []);
});

test('a card holds either the old string or the list, never both', () => {
  assert.deepEqual(codes(lessonWith({ example: '{Je veux ça}', examples: LIST })), ['concept_example_both']);
});

test('a card with neither the string nor the list is flagged as a warning until the cut-over', () => {
  const ps = validateModule(lessonWith({}), { file: 'm.json', unitIndex: 1, persons: PERSONS });
  assert.deepEqual(ps.map((p) => [p.code, p.severity]), [['concept_examples_size', 'warning']]);
});

test('examples: one to six (concept_examples_size)', () => {
  assert.deepEqual(codes(lessonWith({ examples: [] })), ['concept_examples_size']);
  const seven = Array.from({ length: 7 }, (_, i) => ({ fr: `J'ai ${i + 2} chats.`, en: `I have ${i + 2} cats.` }));
  assert.deepEqual(codes(lessonWith({ examples: seven })), ['concept_examples_size']);
  assert.deepEqual(codes(lessonWith({ examples: seven.slice(0, 6) })), []);
});

test('an example is an object with fr; fields are fr, en and note only', () => {
  assert.ok(codes(lessonWith({ examples: ['Je veux ça.'] })).includes('field_type'));
  assert.ok(codes(lessonWith({ examples: [{ en: 'I want that.' }] })).includes('field_missing'));
  assert.ok(codes(lessonWith({ examples: [{ fr: 'Je veux ça.', en: 'I want that.', say: 'x' }] })).includes('field_unknown'));
});

test('layout is list or forms, and only with examples', () => {
  assert.ok(codes(lessonWith({ examples: LIST, layout: 'grid' })).includes('field_type'));
  assert.deepEqual(codes(lessonWith({ example: '{je veux}, {tu veux}, {il veut}', layout: 'forms' })), ['concept_layout_without_examples']);
});

test('example French is plain French: no braces, its English plain English', () => {
  assert.deepEqual(codes(lessonWith({ examples: [{ fr: '{Je veux ça.}', en: 'I want that.' }] })), ['span_in_plain_field']);
  assert.deepEqual(codes(lessonWith({ examples: [{ fr: 'Je veux ça.', en: 'I want {ça}.' }] })), ['span_in_plain_field']);
  // a note is English that may quote French
  assert.deepEqual(codes(lessonWith({ examples: [{ fr: 'Je veux ça.', en: 'I want that.', note: 'with {ça} for a thing' }] })), []);
});

test('the checker reads example French as French the learner reads, and its English as native text', () => {
  const texts = moduleTexts(lessonWith({ examples: [{ fr: 'Je veux ça.', en: 'I want that.', note: 'with {ça}' }] }));
  const at = (p) => texts.find((t) => t.path === p);
  assert.deepEqual(at('concepts[0].examples[0].fr'), { path: 'concepts[0].examples[0].fr', role: 'fr', text: 'Je veux ça.' });
  assert.equal(at('concepts[0].examples[0].en').role, 'native');
  assert.equal(at('concepts[0].examples[0].note').role, 'native_fr');
});

/* ---------- concept_example_meaning ---------- */

test('in a list card every example has its English (concept_example_meaning)', () => {
  assert.deepEqual(codes(lessonWith({ examples: [LIST[0], { fr: 'Tu veux un café ?' }] })), ['concept_example_meaning']);
  assert.deepEqual(codes(lessonWith({ layout: 'list', examples: [{ fr: 'Je veux ça.' }] })), ['concept_example_meaning']);
});

test('a forms card may leave the English out', () => {
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: FORMS })), []);
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: FORMS.map((x) => ({ ...x, en: 'want' })) })), []);
});

/* ---------- concept_forms_pair ---------- */

test('a forms card lists the singular persons, then the matching plurals in the same order (concept_forms_pair)', () => {
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: FORMS.slice(0, 2).concat(FORMS.slice(3, 5)) })), []);
  // j' is je
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: [{ fr: "j'ai" }, { fr: 'nous avons' }] })), []);
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: [{ fr: 'j’ai' }, { fr: 'nous avons' }] })), []);
  // elle pairs with elles, on with nous? No: on is third person singular, so it pairs with ils or elles.
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: [{ fr: 'elle veut' }, { fr: 'elles veulent' }] })), []);
  // odd count
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: FORMS.slice(0, 5) })), ['concept_forms_pair']);
  // plural first
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: [FORMS[3], FORMS[0]] })), ['concept_forms_pair']);
  // persons that do not match: je with vous
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: [FORMS[0], FORMS[1], FORMS[4], FORMS[3]] })), ['concept_forms_pair']);
  // not a person form
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: [{ fr: 'mon livre' }, { fr: 'mes livres' }] })), ['concept_forms_pair']);
});

test('formsProblems names what is wrong, from the language pack persons', () => {
  assert.deepEqual(formsProblems(FORMS, PERSONS), []);
  assert.match(formsProblems(FORMS.slice(0, 5), PERSONS)[0], /even/);
  assert.match(formsProblems([{ fr: 'mon livre' }, { fr: 'nous avons' }], PERSONS)[0], /mon livre/);
});

test('without the language persons, a forms card is checked for an even count only', () => {
  const mod = lessonWith({ layout: 'forms', examples: [{ fr: 'mon livre' }, { fr: 'mes livres' }] });
  assert.deepEqual(codes(mod, { persons: undefined }), []);
  assert.deepEqual(codes(lessonWith({ layout: 'forms', examples: FORMS.slice(0, 3) }), { persons: undefined }), ['concept_forms_pair']);
});

/* ---------- concept_example_formula ---------- */

test('example French is a sentence, never a formula with plus signs, arrows or equals (concept_example_formula)', () => {
  for (const fr of ['je veux + ça', 'chat → chats', 'ce(livre) = ce livre', 'Tu as un chat ? ↗', 'venir -> revenir'])
    assert.deepEqual(codes(lessonWith({ examples: [{ fr, en: 'x' }] })), ['concept_example_formula'], fr);
  assert.equal(isFormula('Je veux ça.'), false);
  assert.equal(isFormula('Quatre-vingt-dix.'), false);
});

/* ---------- concept_inline_list ---------- */

test('a term or definition that runs three or more French items together fails (concept_inline_list)', () => {
  const lists = [
    'Learn the standalone forms: {ce}, {cet}, {cette}, {ces}.',
    'Notice the pattern: je/tu both use {veux}, then il/elle use {veut}, nous uses {voulons}, and ils/elles use {veulent}!',
    '{vingt} (20), {trente} (30), {quarante} (40)',
    'With {mon}; {ma}; {mes}.',
    '{je}/{tu}/{il}',
  ];
  for (const definition of lists) assert.deepEqual(codes(lessonWith({ definition, examples: LIST })), ['concept_inline_list'], definition);
  assert.deepEqual(codes(lessonWith({ term: '{ce}, {cet}, {cette}', examples: LIST })), ['concept_inline_list']);
});

test('prose that names one or two French words passes concept_inline_list', () => {
  const prose = [
    'Say {je suis} for I am and {tu es} for you are.',
    '{On} means we when friends talk. It takes the same verb form as {il} and {elle}.',
    'Put {et} between the ten and {un}. Before a feminine noun, {un} becomes {une}.',
    'The verb has three stems; each form below shows its stem.',
  ];
  for (const definition of prose) assert.deepEqual(codes(lessonWith({ definition, examples: LIST })), [], definition);
});

test('the old shape waits for its migration: its definition is not checked for lists yet', () => {
  assert.deepEqual(codes(lessonWith({ definition: 'Learn {ce}, {cet}, {cette}, {ces}.', example: '{ce livre}' })), []);
});

test('inlineListRuns finds each run of three or more items in a sentence', () => {
  assert.deepEqual(inlineListRuns('Say {je suis} for I am.'), []);
  assert.deepEqual(inlineListRuns('Forms: {ce}, {cet}, {cette} and {ces}. Then {ça}.'), [['ce', 'cet', 'cette', 'ces']]);
});

/* ---------- Reference sections ---------- */

test('a Reference section may hold examples in the same shape, and keeps its old string while it waits', () => {
  const mod = miniModule(MINI_KEYS.reference);
  assert.deepEqual(codes(mod, { unitIndex: null }), []);
  mod.sections[0].examples = [{ fr: 'été', en: 'summer' }, { fr: 'café', en: 'coffee' }];
  assert.deepEqual(codes(mod, { unitIndex: null }), []);
  mod.sections[0].example = '{été}';
  assert.deepEqual(codes(mod, { unitIndex: null }), ['concept_example_both']);
  delete mod.sections[0].example;
  mod.sections[0].examples = [{ fr: 'été' }];
  assert.deepEqual(codes(mod, { unitIndex: null }), ['concept_example_meaning']);
  // a section needs no examples at all
  delete mod.sections[0].examples;
  assert.deepEqual(codes(mod, { unitIndex: null }), []);
});

/* ---------- reading the old strings (the migration) ---------- */

test('readExampleString converts pairs written either way', () => {
  assert.deepEqual(readExampleString('{Je suis heureux} (I am happy), {Il est heureux} (he is happy)', PERSONS), {
    status: 'converted',
    examples: [{ fr: 'Je suis heureux', en: 'I am happy' }, { fr: 'Il est heureux', en: 'he is happy' }],
  });
  assert.deepEqual(readExampleString("'I want that' ({Je veux ça}), 'Do you want a book?' ({Veux-tu un livre ?})", PERSONS), {
    status: 'converted',
    examples: [{ fr: 'Je veux ça', en: 'I want that' }, { fr: 'Veux-tu un livre ?', en: 'Do you want a book?' }],
  });
  assert.deepEqual(readExampleString('{un chat et un chien} (a cat and a dog)', PERSONS), {
    status: 'converted',
    examples: [{ fr: 'un chat et un chien', en: 'a cat and a dog' }],
  });
});

test('readExampleString reads person forms as a forms card, singular first', () => {
  assert.deepEqual(readExampleString('{je veux}, {tu veux}, {il veut}, {nous voulons}, {vous voulez}, {ils veulent}', PERSONS), {
    status: 'converted',
    layout: 'forms',
    examples: FORMS,
  });
});

test('readExampleString leaves French with no English as needing its meaning', () => {
  assert.deepEqual(readExampleString('{un bel enfant}, {un nouvel ami}, {un vieil homme}', PERSONS), {
    status: 'needs_meaning',
    examples: [{ fr: 'un bel enfant' }, { fr: 'un nouvel ami' }, { fr: 'un vieil homme' }],
  });
});

test('readExampleString refuses prose, formulas and labels', () => {
  for (const s of [
    'Use to say what you have, your age, or physical sensations',
    '{je veux + ça, nous voulons + être}',
    '{chat} → {chats}, {livre} → {livres}',
    'Foundation for: {je le vois}, {je la vois}',
    'J\'ai vingt ans. Paul a trente et un ans.',
  ]) assert.equal(readExampleString(s, PERSONS).status, 'unconvertible', s);
});

/* ---------- the language pack's persons reach the checker ---------- */

test('loadCourse checks a forms card against the course language’s persons', async () => {
  const { loadCourse, REPO_ROOT } = await import('../load.mjs');
  const { MINI_ROOT } = await import('./mini-fixture.mjs');
  const { relative, join } = await import('node:path');
  const file = relative(REPO_ROOT, join(MINI_ROOT, 'modules', `${MINI_KEYS.lesson}.json`)).split('\\').join('/');
  const mod = lessonWith({ layout: 'forms', examples: [FORMS[0], FORMS[1], FORMS[4], FORMS[3]] });
  assert.throws(
    () => loadCourse({ root: MINI_ROOT, replace: new Map([[file, JSON.stringify(mod)]]) }),
    (e) => e.problems.some((p) => p.code === 'concept_forms_pair' && p.path === 'concepts[0].examples'),
  );
  mod.concepts[0].examples = FORMS;
  assert.doesNotThrow(() => loadCourse({ root: MINI_ROOT, replace: new Map([[file, JSON.stringify(mod)]]) }));
});

test('a word card’s note that runs three or more French items together is flagged as a warning until the cut-over', () => {
  const mod = miniModule(MINI_KEYS.lesson);
  mod.vocabulary[0].note = 'Its forms: {je suis}, {tu es}, {il est}.';
  const ps = validateModule(mod, { file: 'm.json', unitIndex: 1, persons: PERSONS });
  assert.deepEqual(ps.map((p) => [p.code, p.path, p.severity]), [['concept_inline_list', 'vocabulary[0].note', 'warning']]);
  mod.vocabulary[0].note = 'Say it to anyone, as in {je suis Paul}.';
  assert.deepEqual(codes(mod), []);
});

test('readExampleString leaves a list of more than six, or English that carries French marks, to a writer', () => {
  const eight = '{je suis}, {tu es}, {il est}, {elle est}, {nous sommes}, {vous êtes}, {ils sont}, {elles sont}';
  assert.deepEqual(readExampleString(eight, PERSONS), { status: 'unconvertible', reason: 'more than six examples: two cards or a table' });
  assert.deepEqual(readExampleString('{avec moi} (with me), {Moi?} ({Me?})', PERSONS), { status: 'unconvertible', reason: 'English with French marks in it' });
});

/* ---------- the plain layout: a list that is not examples of the taught language ---------- */

const plainCodes = (card) => validateModule(lessonWith(card), { file: 'm.json', unitIndex: 1, persons: PERSONS, isNativeText: fr.isNativeExample }).map((p) => p.code);

test('a plain card lists points in the learner’s language as { text } items', () => {
  assert.deepEqual(plainCodes({ layout: 'plain', examples: [{ text: 'Hello' }, { text: 'Thank you' }, { text: 'Goodbye' }] }), []);
  const texts = moduleTexts(lessonWith({ layout: 'plain', examples: [{ text: 'Hello' }] }));
  assert.deepEqual(texts.find((t) => t.path === 'concepts[0].examples[0].text'), { path: 'concepts[0].examples[0].text', role: 'native', text: 'Hello' });
});

test('a plain item holds text only; a list or forms item holds fr and no text (concept_plain_item)', () => {
  assert.deepEqual(plainCodes({ layout: 'plain', examples: [{ text: 'Hello', fr: 'Bonjour' }] }), ['concept_plain_item']);
  assert.deepEqual(plainCodes({ layout: 'plain', examples: [{ en: 'Hello' }] }), ['concept_plain_item']);
  assert.deepEqual(plainCodes({ examples: [{ fr: 'Je veux ça.', en: 'I want that.', text: 'x' }] }), ['concept_plain_item']);
  assert.deepEqual(plainCodes({ examples: [{ en: 'I want that.' }] }), ['field_missing']);
  // plain text is plain: no French marks in it
  assert.deepEqual(plainCodes({ layout: 'plain', examples: [{ text: 'Say {bonjour}' }] }), ['span_in_plain_field']);
});

test('the French of a list or forms card is French, never English with a play button (concept_example_not_target)', () => {
  assert.deepEqual(plainCodes({ examples: [{ fr: 'Hello, thank you, please', en: 'Hello, thank you, please' }] }), ['concept_example_not_target']);
  assert.deepEqual(plainCodes({ examples: [{ fr: 'Merci, au revoir !', en: 'Thank you, goodbye!' }] }), []);
});

test('readExampleString reads a run of short English items with no French marks as a plain list', () => {
  assert.deepEqual(readExampleString('Hello, thank you, yes, no, please, goodbye - universal communication', PERSONS, fr), {
    status: 'converted',
    layout: 'plain',
    examples: ['Hello', 'Thank you', 'Yes', 'No', 'Please', 'Goodbye'].map((text) => ({ text })),
    dropped: 'universal communication',
  });
  // prose stays for a writer
  assert.equal(readExampleString('I/you/he/she are singular, we/you all/they are plural', PERSONS, fr).status, 'unconvertible');
  assert.equal(readExampleString('Use to say what you have, your age, or physical sensations', PERSONS, fr).status, 'unconvertible');
  assert.equal(readExampleString('Used to confirm, agree, or point to something', PERSONS, fr).status, 'unconvertible');
});
