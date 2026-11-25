// Task 6: today's lessons, practice sets and unit exams converted to module files (spec 5.4, 5.5, 5.8, 6, 8.1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../vite-shim.mjs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { convertModule } from '../migrate/module.mjs';
import { makeItemId } from '../item-ids.mjs';
import { proposeWordId } from '../word-ids.mjs';
import { validateModule } from '../schema/module.mjs';
import { unmark } from '../migrate/mark-french.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const { buildExercises } = await import(pathToFileURL(path.join(repo, 'src/lessons/moduleBuilder.js')).href);

const U1 = { unitKey: 'unit1', unitIndex: 1 };
const U9 = { unitKey: 'unit9', unitIndex: 9 };
const base = (over) => ({
  moduleKey: '2024-01-02-test',
  title: 'Test Lesson',
  description: 'A lesson for the tests.',
  concepts: [],
  vocabularyReference: [{ french: 'je suis', english: 'I am', note: '' }],
  ...over,
});
const lines = (report, kind) => report.filter((l) => l.kind === kind);

test('custom items', () => {
  const old = base({
    exerciseConfig: {
      type: 'custom',
      items: [{ instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis', wrongAnswers: [{ answer: 'je es', feedback: '…' }] }],
    },
  });
  const { mod } = convertModule(old, U1);
  const [item] = mod.items;
  assert.equal(item.type, 'translate');
  assert.equal(item.prompt, 'I am');
  assert.equal(item.answer, 'je suis');
  assert.deepEqual(item.mistakes, [{ answer: 'je es', feedback: '…' }]);
  assert.equal(item.id, 'i-je-suis');
  assert.deepEqual(validateModule(mod, { unitIndex: 1 }), []);
});

test('conjugation expands to literal items', () => {
  const conjugations = {
    je: { pronoun: 'je', conjugation: 'suis', combined: 'je suis', english: 'I am', englishFull: 'I am' },
    tu: { pronoun: 'tu', conjugation: 'es', combined: 'tu es', english: 'you are (informal)', englishFull: 'you are (informal)' },
    il: { pronoun: 'il', conjugation: 'est', combined: 'il est', english: 'he is', englishFull: 'he is' },
  };
  const exerciseConfig = {
    type: 'conjugation',
    verb: 'être',
    conjugations,
    items: [{ key: 'je', context: 'Introduce yourself' }, { key: 'tu' }, { key: 'il', customWrongAnswers: [{ answer: 'il es', feedback: 'Il takes est.' }] }],
  };
  const built = buildExercises(0, exerciseConfig);
  const { mod } = convertModule(base({ exerciseConfig }), U1);
  assert.equal(mod.items.length, built.length);
  mod.items.forEach((item, i) => {
    assert.equal(item.type, 'transform');
    // Native text gets its French marked with braces; a learner sees it without them.
    assert.equal(unmark(item.instruction), built[i].instruction);
    assert.equal(unmark(item.hint), built[i].hint);
    assert.equal(item.answer, built[i].expectedAnswer);
    assert.deepEqual(item.mistakes.map((m) => ({ ...m, feedback: unmark(m.feedback) })), built[i].wrongAnswers);
    assert.equal(item.shown, 'être');
  });
  assert.equal(mod.tables.length, 1);
  assert.deepEqual(mod.tables[0].rows, Object.values(conjugations).map((c) => ({ fr: c.combined, en: c.english })));
  assert.deepEqual(validateModule(mod, { unitIndex: 1 }), []);
});

test('unit9 fillblank', () => {
  const old = base({
    exercises: [{ type: 'fillblank', prompt: 'Je ne viens pas ___ je suis malade.', answer: 'parce que' }],
    fillInBlanksSentences: ['Je ne viens pas ___ je suis malade. (I am not coming because I am sick)'],
  });
  const { mod, report } = convertModule(old, U9);
  const [item] = mod.items;
  assert.equal(item.type, 'gapfill');
  assert.equal(item.text, 'Je ne viens pas ___ je suis malade.');
  assert.deepEqual(item.blanks, [{ answer: 'parce que' }]);
  assert.ok(!('fillInBlanksSentences' in mod) && !('fill_in_blanks_sentences' in mod));
  assert.ok(lines(report, 'dropped_field').some((l) => l.path === 'fillInBlanksSentences'), JSON.stringify(report));
});

test('unit9 fillblank: prompt parts and two blanks', () => {
  const old = base({
    exercises: [
      { type: 'fillblank', prompt: "Complete: Hier, j'___ français (Yesterday, I spoke French) - Use 'parler'", answer: 'ai parlé' },
      { type: 'fillblank', prompt: "Complete: Je n'___ pas ___ le film (I didn't like the movie) - Use 'aimer'", answer: 'ai pas aimé' },
    ],
  });
  const { mod } = convertModule(old, U9);
  assert.equal(mod.items[0].text, "Hier, j'___ français");
  assert.equal(mod.items[0].gloss, 'Yesterday, I spoke French');
  assert.match(mod.items[0].hint, /^Use '.*parler.*'$/);
  assert.deepEqual(mod.items[1].blanks, [{ answer: 'ai' }, { answer: 'aimé' }]);
  assert.deepEqual(validateModule(mod, { unitIndex: 9 }), []);
});

test('practice blanks by position', () => {
  const old = {
    moduleKey: '2024-01-10-test-practice',
    title: 'Practice',
    description: 'Practice set.',
    isFillInTheBlank: true,
    skipStudyMode: true,
    concepts: [],
    vocabularyReference: [],
    exercises: [],
    sentences: [
      { text: 'Je  fatigué.', instruction: "Complete: 'I am tired'", blanks: [{ position: 3, answer: 'suis', hint: 'être for je' }] },
      { text: 'Tu as un chat.', instruction: "Complete: 'You have a cat'", blanks: [{ position: 4, answer: 'as', hint: 'avoir for tu' }] },
    ],
  };
  const { mod, report } = convertModule(old, U1);
  assert.equal(mod.kind, 'practice');
  assert.equal(mod.items[0].type, 'gapfill');
  assert.equal(mod.items[0].text, 'Je ___ fatigué.');
  assert.deepEqual(mod.items[0].blanks, [{ answer: 'suis' }]);
  assert.equal(mod.items[0].gloss, 'I am tired');
  assert.equal(mod.items[0].hint, 'être for je');
  // Position 4 is the "s" of "as": a word cut in two. Reported, and placed where the checker puts it.
  const mis = lines(report, 'blank_misplaced');
  assert.equal(mis.length, 1);
  assert.match(mis[0].path, /^items\[1\]/);
  assert.equal(mod.items[1].text.split('___').length - 1, 1);
  assert.deepEqual(mod.tests, { constructions: [] });
  assert.deepEqual(validateModule(mod, { unitIndex: 1 }), []);
});

test('skipStudyMode', () => {
  const { mod } = convertModule(base({ skipStudyMode: true, exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis' }] } }), U1);
  assert.deepEqual(mod.options, { study_mode: false });
});

test('emailMetadata', () => {
  const old = base({
    emailMetadata: {
      capabilities: ['Say who you are'],
      realWorldUse: 'introduce yourself',
      nextModuleTeaser: 'Next: avoir',
      isUnitCompletion: true,
      milestone: 'First sentences',
      utilityScore: 9,
    },
    exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis' }] },
  });
  const { mod, report } = convertModule(old, U1);
  assert.deepEqual(mod.can_do, ['Say who you are']);
  const dropped = lines(report, 'dropped_field').map((l) => l.path);
  for (const f of ['nextModuleTeaser', 'isUnitCompletion', 'milestone', 'utilityScore'])
    assert.ok(dropped.includes(`emailMetadata.${f}`), `${f} reported: ${dropped}`);
});

test('vocabulary', () => {
  const seen = new Map();
  const dictionary = new Map([['le', 'le-fr']]);
  const first = convertModule(
    base({ vocabularyReference: [{ french: 'je suis', english: 'I am', note: '' }, { french: 'le', english: 'the (masculine)', note: 'definite article' }], exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis' }] } }),
    { ...U1, seenBySpelling: seen, dictionary },
  );
  assert.deepEqual(first.mod.vocabulary[0], { word_id: 'je-suis-fr', fr: 'je suis', gloss: 'I am' });
  assert.equal(first.mod.vocabulary[1].word_id, 'le-fr');
  const second = convertModule(
    base({ moduleKey: '2024-02-06-object-pronouns', vocabularyReference: [{ french: 'le', english: 'him, it', note: 'direct object pronoun' }], exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'I see him', expectedAnswer: 'je le vois' }] } }),
    { unitKey: 'unit3', unitIndex: 3, seenBySpelling: seen, dictionary },
  );
  assert.equal(second.mod.vocabulary[0].word_id, 'le-fr.object-pronoun');
  assert.equal(lines(second.report, 'word_sense').length, 1);
});

test('proposeWordId keeps one meaning met again', () => {
  const seen = new Map();
  assert.equal(proposeWordId({ french: 'ça', english: 'that/it (informal)', module_key: 'a' }, seen, new Map()).word_id, 'ca-fr');
  const again = proposeWordId({ french: 'ça', english: 'that/it', module_key: 'b' }, seen, new Map());
  assert.equal(again.word_id, 'ca-fr');
  assert.ok(again.review);
});

test('proposeWordId: two spellings that fold alike get two ids', () => {
  const seen = new Map();
  const a = proposeWordId({ french: 'a', english: 'has', module_key: 'x' }, seen, new Map());
  const b = proposeWordId({ french: 'à', english: 'to / at', module_key: 'y' }, seen, new Map());
  assert.equal(a.word_id, 'a-fr');
  assert.notEqual(b.word_id, 'a-fr');
  assert.match(b.word_id, /^a-fr\.[a-z0-9-]+$/);
});

test('makeItemId', () => {
  const taken = new Set();
  assert.equal(makeItemId({ answer: 'Je suis fatigué, très fatigué' }, taken), 'i-je-suis-fatigue-tres');
  assert.equal(makeItemId({ answer: 'je suis fatigué très' }, taken), 'i-je-suis-fatigue-tres-2');
  assert.equal(makeItemId({ id: 'kept-1', answer: 'x' }, taken), 'kept-1');
  assert.equal(makeItemId({ type: 'gapfill', blanks: [{ answer: "j'ai" }] }, taken), 'i-j-ai');
});

test('position words reported', () => {
  const old = base({
    concepts: [{ term: 'Review of M2-M3', definition: 'Pronouns and être together.', example: 'je suis' }],
    exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis' }] },
  });
  const { mod, report } = convertModule(old, U1);
  assert.equal(mod.concepts[0].term, 'Review of M2-M3');
  const pw = lines(report, 'position_word');
  assert.equal(pw.length, 1);
  assert.equal(pw[0].path, 'concepts[0].term');
});

test('a bare English sentence is translate; a framed one is respond (Jake, 2026-11-25)', () => {
  const old = base({
    exerciseConfig: {
      type: 'custom',
      items: [
        { instruction: 'Translate to French', prompt: 'I have this book', expectedAnswer: "j'ai ce livre" },
        { instruction: "Say 'you would do it' (informal)", prompt: 'you would do it (informal)', expectedAnswer: 'tu le ferais' },
        { instruction: 'Translate to French', prompt: 'I know Marie (person)', expectedAnswer: 'je connais Marie' },
        { instruction: 'Ask your friend for the cat politely', prompt: "I'd like the cat, please", expectedAnswer: "je voudrais le chat, s'il te plaît" },
      ],
    },
  });
  const { mod, report } = convertModule(old, { unitKey: 'unit4', unitIndex: 4 });
  assert.deepEqual(mod.items.map((i) => i.type), ['translate', 'respond', 'respond', 'respond']);
  assert.equal(mod.items[0].prompt, 'I have this book');
  // The whole frame is the situation.
  assert.equal(unmark(mod.items[1].situation), "Say 'you would do it' (informal)");
  assert.equal(mod.items[1].cue, 'you would do it (informal)');
  assert.equal(mod.items[2].situation, 'I know Marie (person)');
  assert.equal(lines(report, 'framed_respond').length, 3);
  // Outside Unit 1 the bare sentence is a warning, never a load failure.
  const ps = validateModule(mod, { unitIndex: 4 });
  assert.deepEqual(ps.map((p) => [p.code, p.severity]), [['translate_outside_unit1', 'warning']]);
});

test('explanation becomes the hint only where there is none', () => {
  const old = base({
    exerciseConfig: {
      type: 'custom',
      items: [
        { instruction: 'Translate:', prompt: 'I am', expectedAnswer: 'je suis', explanation: 'être for je' },
        { instruction: 'Translate:', prompt: 'you are', hint: 'tu...', expectedAnswer: 'tu es', explanation: 'être for tu' },
      ],
    },
  });
  const { mod, report } = convertModule(old, U1);
  assert.equal(mod.items[0].hint, 'être for je');
  assert.equal(unmark(mod.items[1].hint), 'tu...');
  assert.deepEqual(lines(report, 'dropped_field').map((l) => l.path).filter((p) => p.endsWith('.explanation')), ['exerciseConfig.items[1].explanation']);
});

test('unit exam: no title, no teaching, tests declared', () => {
  const old = {
    moduleKey: '2024-01-11-test-exam',
    title: 'Unit 1 Final Exam - Foundation',
    description: 'Test everything.',
    isUnitExam: true,
    unitNumber: 1,
    skipStudyMode: true,
    concepts: [{ term: 'Done', definition: 'You know it all.', example: 'je suis' }],
    vocabularyReference: [],
    exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate to French', prompt: 'I am', hint: 'je...', expectedAnswer: 'je suis' }] },
  };
  const { mod, report } = convertModule(old, U1);
  assert.equal(mod.kind, 'unit_exam');
  assert.equal(mod.title, undefined);
  assert.equal(mod.concepts, undefined);
  assert.deepEqual(mod.tests, { constructions: [] });
  assert.equal(mod.items[0].type, 'translate');
  const dropped = lines(report, 'dropped_field').map((l) => l.path);
  for (const p of ['title', 'unitNumber', 'concepts[0]']) assert.ok(dropped.includes(p), `${p} in ${dropped}`);
  assert.deepEqual(validateModule(mod, { unitIndex: 1 }), []);
});

test('an unknown source field is an error, never silently dropped', () => {
  assert.throws(() => convertModule(base({ somethingNew: 1, exerciseConfig: { type: 'custom', items: [] } }), U1), /somethingNew/);
});

test('a question card and its statement are two cards; only an identical card is merged', () => {
  const old = base({
    vocabularyReference: [
      { french: 'tu comprends', english: 'you understand', note: '' },
      { french: 'Tu comprends?', english: 'Do you understand?', note: 'question' },
      { french: 'après', english: 'after', note: 'time' },
      { french: 'après', english: 'after', note: 'connector' },
    ],
    exerciseConfig: { type: 'custom', items: [{ instruction: 'Translate:', prompt: 'you understand', expectedAnswer: 'tu comprends' }] },
  });
  const { mod } = convertModule(old, U1);
  assert.deepEqual(mod.vocabulary.map((w) => [w.word_id, w.fr]), [['tu-comprends-fr', 'tu comprends'], ['tu-comprends-fr.question', 'Tu comprends?'], ['apres-fr', 'après']]);
  assert.equal(mod.vocabulary[2].note, 'time; connector');
});

test('learner-visible prompts stay: a conjugation prompt the instruction lacks, a meaning question', () => {
  const conjugations = { je: { pronoun: 'je', conjugation: 'vois', combined: 'je vois', english: 'I see', englishFull: 'I see / I am seeing' } };
  const { mod } = convertModule(base({ exerciseConfig: { type: 'conjugation', verb: 'voir', conjugations, items: [{ key: 'je' }] } }), U1);
  assert.equal(unmark(mod.items[0].instruction), 'Say "I see" in French: I see / I am seeing');
  const exam = {
    moduleKey: '2024-05-10-test-exam',
    description: 'Exam.',
    isUnitExam: true,
    vocabularyReference: [],
    concepts: [],
    exerciseConfig: { type: 'custom', items: [{ instruction: "What does 'quoi' mean at the end of a sentence?", prompt: 'quoi (at end)', hint: 'Filler', expectedAnswer: 'you know' }] },
  };
  const m2 = convertModule(exam, { unitKey: 'unit7', unitIndex: 7 }).mod;
  assert.equal(m2.items[0].type, 'meaning');
  assert.equal(unmark(m2.items[0].instruction), "What does 'quoi' mean at the end of a sentence?");
  assert.deepEqual(validateModule(m2, { unitIndex: 7 }), []);
});
