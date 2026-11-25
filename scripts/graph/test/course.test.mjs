import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readCourse, readModule, isEnglish, stripPassage } from '../course.mjs';
import { loadGraph } from '../load.mjs';
import { buildFormIndex } from '../fr/forms.mjs';
import { frenchWordTest } from '../french-text.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const course = await readCourse(repoRoot);
const frenchOf = (m) => m.items.flatMap((i) => i.french);

test('course has 161 modules at positions 1..161', () => {
  assert.equal(course.length, 161);
  assert.deepEqual(course.map((m) => m.position), Array.from({ length: 161 }, (_, i) => i + 1));
});

test('position 31 is the aller lesson and teaches je vais', () => {
  const m = course[30];
  assert.equal(m.moduleKey, '2024-01-27-aller');
  assert.equal(m.kind, 'lesson');
  assert.ok(m.items.some((i) => i.french.includes('je vais')));
});

test('no module is titled Les Nombres', () => {
  assert.equal(course.filter((m) => m.title === 'Les Nombres').length, 0);
});

test('verb-pattern-help appears once, at position 32', () => {
  const hits = course.filter((m) => m.moduleKey === '2024-01-28-verb-pattern-help');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].position, 32);
  assert.equal(hits[0].kind, 'help');
});

test('passe-compose-er has the filled fillblank sentence', () => {
  const m = course.find((x) => x.moduleKey === '2024-05-30-passe-compose-er');
  const filled = m.items.find((i) => i.french[0]?.includes("Hier, j'ai parlé français"));
  assert.ok(filled);
  assert.equal(filled.gapFill, true); // a fillblank exercise, so never an English-to-French translation
  assert.ok(m.shapes.includes('exercises'));
  assert.ok(m.shapes.includes('fib'));
});

test('Unit 2 reading has a clean passage item', () => {
  const m = course.find((x) => x.moduleKey === '2024-01-22-reading2');
  assert.equal(m.kind, 'reading');
  const p = m.items.find((i) => i.source === 'passage');
  assert.ok(p);
  assert.deepEqual(p.french, []);
  const text = p.shown.join('\n');
  assert.ok(text.length > 50);
  assert.ok(!text.includes('**'));
  assert.ok(!text.includes('!['));
});

test('every module is read fully: no unreadShapes anywhere', () => {
  const unread = course.flatMap((m) => m.unreadShapes.map((u) => `${m.moduleKey}: ${u}`));
  assert.deepEqual(unread, []);
});

test('kinds and unit fields are set', () => {
  assert.equal(course.filter((m) => m.kind === 'exam').length, 11);
  assert.equal(course.filter((m) => m.kind === 'practice').length, 11);
  assert.equal(course.filter((m) => m.kind === 'reading').length, 11);
  assert.equal(course.filter((m) => m.kind === 'help').length, 5);
  assert.equal(course[0].unitId, 1);
  assert.match(course[0].unitTitle, /^Unit 1/);
  assert.ok(course[0].vocab.includes('bonjour'));
  assert.ok(course[0].conceptTerms.length > 0);
});

test('conjugation items resolve through the conjugation table', () => {
  const m = course.find((x) => x.moduleKey === '2024-01-02-etre');
  assert.ok(frenchOf(m).includes('je suis'));
});

test('sentences insert blanks at their positions', () => {
  const mod = {
    moduleKey: 'x', title: 'x', isFillInTheBlank: true,
    sentences: [{ text: ' suis un homme.', instruction: "Complete: 'I am a man'", blanks: [{ position: 0, answer: 'je' }] },
      { text: 'Tu  un chat.', blanks: [{ position: 3, answer: 'as' }] }],
  };
  const r = readModule(mod, 1, 1);
  assert.deepEqual(r.items.map((i) => i.french[0]), ['je suis un homme.', 'Tu as un chat.']);
  assert.equal(r.items[0].source, 'sentences');
  assert.deepEqual(r.unreadShapes, []);
});

test('two blanks at one position keep their order', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', sentences: [
    { text: 'Il  la maison.', blanks: [{ position: 3, answer: 'peut' }, { position: 3, answer: 'voir' }] },
  ] }, 1, 1);
  assert.equal(r.items[0].french[0], 'Il peut voir la maison.');
  assert.deepEqual(r.blankProblems, []);
});

test('a blank on either space of a gap stays a separate word, and elisions and hyphens stay attached', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', sentences: [
    { text: 'Je vais  café.', blanks: [{ position: 7, answer: 'au' }] },
    { text: "J'ai  une baguette hier.", blanks: [{ position: 4, answer: 'mangé' }] },
    { text: "J'  faim.", blanks: [{ position: 2, answer: 'avais' }] },
    { text: "Nous  avons  l'argent.", blanks: [{ position: 5, answer: "n'" }, { position: 12, answer: 'pas' }] },
    { text: 'Où -vous?', blanks: [{ position: 3, answer: 'travaillez' }] },
    { text: 'Tu ?', blanks: [{ position: 3, answer: 'comprends' }] },
    { text: "Qu'est-ce que c'est ? 'est un livre.", blanks: [{ position: 21, answer: 'c' }] },
  ] }, 1, 1);
  assert.deepEqual(r.items.map((i) => i.french[0]), [
    'Je vais au café.', "J'ai mangé une baguette hier.", "J'avais faim.", "Nous n'avons pas l'argent.",
    'Où travaillez-vous?', 'Tu comprends?', "Qu'est-ce que c'est ? c'est un livre.",
  ]);
  // The app shows a blank in place of the character at its position, so a blank on a mark drops the mark.
  assert.deepEqual(r.blankProblems, [
    { ref: 'x#sentences[4]', answer: 'travaillez', word: null, mark: '-' },
    { ref: 'x#sentences[5]', answer: 'comprends', word: null, mark: '?' },
  ]);
});

test('a blank inside a word is reported and filled at the nearest free gap', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', sentences: [
    { text: 'Nous  aller  restaurant.', blanks: [{ position: 5, answer: 'devrions' }, { position: 15, answer: 'au' }] },
    { text: "Je m'appelle Marie,  trente ans, et je  à Lyon où je  comme professeur.",
      blanks: [{ position: 20, answer: "j'ai" }, { position: 42, answer: 'vis' }, { position: 57, answer: 'travaille' }] },
  ] }, 1, 1);
  assert.equal(r.items[0].french[0], 'Nous devrions aller au restaurant.');
  assert.equal(r.items[1].french[0], "Je m'appelle Marie, j'ai trente ans, et je vis à Lyon où je travaille comme professeur.");
  assert.deepEqual(r.blankProblems, [
    { ref: 'x#sentences[0]', answer: 'au', word: 'restaurant' },
    { ref: 'x#sentences[1]', answer: 'vis', word: 'Lyon' },
    { ref: 'x#sentences[1]', answer: 'travaille', word: 'comme' },
  ]);
});

test('a blank after the end of the sentence is reported and filled before the full stop', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', sentences: [
    { text: 'Tu as vu ça .', blanks: [{ position: 13, answer: 'hier' }] },
    { text: 'Nous  français  .', blanks: [{ position: 5, answer: 'parlons' }, { position: 22, answer: 'ici' }] },
  ] }, 1, 1);
  assert.equal(r.items[0].french[0], 'Tu as vu ça hier.');
  assert.equal(r.items[1].french[0], 'Nous parlons français ici.');
  assert.deepEqual(r.blankProblems, [
    { ref: 'x#sentences[0]', answer: 'hier', word: null },
    { ref: 'x#sentences[1]', answer: 'ici', word: null },
  ]);
});

test('course sentences read as the app shows them, with misplaced blanks reported', () => {
  const at = (key, i) => course.find((m) => m.moduleKey === key).items.find((it) => it.ref === `${key}#sentences[${i}]`).french[0];
  assert.equal(at('2024-01-23-unit2-practice', 13), 'Il peut voir la maison.');
  assert.equal(at('2024-02-04-unit3-practice', 0), 'Je vais au café.');
  assert.equal(at('2024-04-15-unit-5-practice', 31), 'Nous devrions aller au restaurant.');
  const problems = course.flatMap((m) => m.blankProblems);
  assert.ok(problems.some((p) => p.ref === '2024-02-16-unit-11-practice#sentences[19]' && p.answer === 'vis'));
  assert.ok(!problems.some((p) => p.ref === '2024-01-23-unit2-practice#sentences[13]'));
});

test('a meaning question checks the quoted French term, not the English answer', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', isUnitExam: true, exerciseConfig: { items: [
    { instruction: "What does 'on' mean?", prompt: 'on', expectedAnswer: 'we', acceptableAnswers: ['one', 'people'] },
    { instruction: "When do you use 'savoir'?", prompt: 'savoir is for...', expectedAnswer: 'facts', acceptableAnswers: ['skills'] },
  ] } }, 1, 1);
  assert.deepEqual(r.items.map((i) => [i.french, i.shown, i.lenient, i.englishPrompt]),
    [[[], ['on'], [], null], [[], ['savoir'], [], null]]);
});

test('multi-blank fillblank answers fill the whole span', () => {
  const mod = { moduleKey: 'x', title: 'x', exercises: [
    { type: 'fillblank', prompt: "Complete: Je n'___ pas ___ le film (I didn't like the movie) - Use 'aimer'", answer: 'ai pas aimé' },
    { type: 'fillblank', prompt: 'Complete: ___ tu ___ le livre? (Did you find the book?)', answer: 'As trouvé' },
  ] };
  const r = readModule(mod, 1, 1);
  assert.equal(r.items[0].french[0], "Je n'ai pas aimé le film");
  assert.equal(r.items[1].french[0], 'As tu trouvé le livre?');
});

test('exam items drop English answers', () => {
  const mod = { moduleKey: 'x', title: 'x', isUnitExam: true, exerciseConfig: { type: 'custom', items: [
    { instruction: 'Translate', prompt: 'en train de', expectedAnswer: 'in the process of', acceptableAnswers: ['in the act of'] },
    { instruction: 'Translate', prompt: 'I am', expectedAnswer: 'je suis', acceptableAnswers: ['moi je suis'] },
  ] } };
  const r = readModule(mod, 1, 1);
  assert.deepEqual(r.items[0].french, []);
  assert.deepEqual(r.items[0].shown, ['en train de']);
  assert.equal(r.items[0].englishPrompt, null);
  assert.deepEqual(r.items[1].french, ['je suis']);
  assert.deepEqual(r.items[1].lenient, ['moi je suis']);
  assert.equal(r.items[1].englishPrompt, 'I am');
  assert.equal(r.kind, 'exam');
});

test('unknown exercise type is reported, not dropped', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', exercises: [{ type: 'matching' }] }, 1, 1);
  assert.deepEqual(r.unreadShapes, ['exercises[0]:type=matching']);
});

test('an unknown top-level exercise array is reported', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', quizItems: [{ a: 1 }] }, 1, 1);
  assert.deepEqual(r.unreadShapes, ['quizItems']);
});

test('isEnglish', () => {
  assert.equal(isEnglish('in the process of'), true);
  assert.equal(isEnglish('je suis un homme'), false);
  assert.equal(isEnglish('Il a été à la maison and the'), false);
  assert.equal(isEnglish('the'), false);
});

test('stripPassage removes labels, images and emphasis', () => {
  const out = stripPassage('**Marie:** Bonjour !\n\n![img/a.png|maxWidth:65%]\n\n*Le Comte* est là.');
  assert.ok(!out.includes('**') && !out.includes('![') && !out.includes('*'));
  assert.ok(out.includes('Bonjour !'));
  assert.ok(out.includes('Le Comte est là.'));
  assert.ok(!out.includes('Marie'));
});

test('mixed-type items carry their own conjugation table', () => {
  const m = course.find((x) => x.moduleKey === '2024-01-17-voir');
  assert.ok(frenchOf(m).includes('je vois'));
});

test('real Fr-to-En exam item shows its French prompt; the learner types English', () => {
  const m = course.find((x) => x.moduleKey === '2024-04-26-unit-6-exam');
  const it = m.items.find((i) => i.shown.includes('en train de'));
  assert.deepEqual(it.french, []);
  assert.ok(it);
  assert.equal(it.englishPrompt, null);
});

test('item refs are unique across the course and start with the module key', () => {
  const all = course.flatMap((m) => m.items.map((i) => ({ m, ref: i.ref })));
  assert.equal(new Set(all.map((x) => x.ref)).size, all.length);
  for (const { m, ref } of all) assert.ok(ref.startsWith(`${m.moduleKey}#`), `${ref} in ${m.moduleKey}`);
});

test('config item refs are module key, #, then the config path', () => {
  const m = readModule({
    moduleKey: 'k1', title: 'T',
    exerciseConfig: { items: [{ expectedAnswer: 'je suis' }] },
    readingPassage: { text: 'Bonjour.' },
  }, 1, 'u');
  assert.deepEqual(m.items.map((i) => i.ref), ['k1#exerciseConfig.items[0]', 'k1#readingPassage']);
});

test('a French-to-English item shows its French prompt and has nothing to type in French', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', exerciseConfig: { items: [
    { instruction: 'Translate', prompt: 'ils sont', expectedAnswer: 'they are' },
  ] } }, 1, 1);
  assert.deepEqual(r.items[0].shown, ['ils sont']);
  assert.deepEqual(r.items[0].french, []);
});

test('a fill-in sentence keeps the filled sentence in french and lists what goes in each blank', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', sentences: [
    { text: ' suis un homme.', blanks: [{ position: 0, answer: 'je' }] },
    { text: 'Nous  avons  argent.', blanks: [{ position: 5, answer: "n'" }, { position: 12, answer: 'pas' }] },
  ], exercises: [
    { type: 'fillblank', prompt: "Complete: Hier, j'___ français (Yesterday, I spoke French) - Use 'parler'", answer: 'ai parlé' },
  ] }, 1, 1);
  const at = (ref) => r.items.find((i) => i.ref === `x#${ref}`);
  assert.deepEqual(at('sentences[0]').french, ['je suis un homme.']);
  assert.deepEqual(at('sentences[0]').blankAnswers, ['je']);
  assert.deepEqual(at('sentences[1]').blankAnswers, ["n'", 'pas']);
  assert.deepEqual(at('exercises[0]').french, ["Hier, j'ai parlé français"]);
  assert.deepEqual(at('exercises[0]').blankAnswers, ['ai parlé']);
});

test('a concept card shows the French segments of its example and the quoted French of its definition', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', concepts: [
    { term: 'Être', definition: "The verb 'être' means to be", example: 'je suis (I am), tu es (you are)' },
  ] }, 1, 1);
  const at = (ref) => r.items.find((i) => i.ref === `x#${ref}`);
  assert.deepEqual(at('concepts[0].example').shown, ['je suis', 'tu es']);
  assert.deepEqual(at('concepts[0].definition').shown, ['être']);
  assert.equal(at('concepts[0].example').source, 'concept');
  assert.deepEqual(at('concepts[0].example').french, []);
});

test('a hint shows only its quoted French, unless the whole hint is French', () => {
  const item = (hint) => ({ instruction: 'Translate', prompt: 'have a good trip', expectedAnswer: 'bon voyage', hint });
  const r = readModule({ moduleKey: 'x', title: 'x', exerciseConfig: { items: [
    item("Used in 'bon voyage', 'bon appétit'"),
    item('Cognate - spelled almost the same, just add accent!'),
    item("The word aujourd'hui means today"),
    item("Say 'aujourd'hui'"),
    item('je suis + ça'),
  ] } }, 1, 1);
  const hints = r.items.filter((i) => i.source === 'hint').map((i) => [i.ref, i.shown]);
  assert.deepEqual(hints, [
    ['x#exerciseConfig.items[0].hint', ['bon voyage', 'bon appétit']],
    ['x#exerciseConfig.items[3].hint', ["aujourd'hui"]],
    ['x#exerciseConfig.items[4].hint', ['je suis + ça']],
  ]);
});

test('instructions, vocabulary notes, blank hints and wrong-answer feedback show their French', () => {
  const r = readModule({ moduleKey: 'x', title: 'x',
    vocabularyReference: [{ french: 'bon', english: 'good', note: "masculine - feminine is 'bonne'" }, { french: 'oui', english: 'yes', note: 'answer' }],
    exerciseConfig: { items: [{ instruction: "Negate this sentence: 'je suis'", prompt: 'I am not', expectedAnswer: 'je ne suis pas',
      wrongAnswers: [{ answer: 'je pas suis', feedback: "Put 'ne' before the verb and 'pas' after: not 'je pas suis'" }] }] },
    sentences: [{ text: ' suis.', instruction: "Complete: 'I am'", blanks: [{ position: 0, answer: 'je', hint: "pronoun for 'I', like 'moi'" }] }],
  }, 1, 1);
  const shown = Object.fromEntries(r.items.filter((i) => i.shown.length).map((i) => [i.ref.slice(2), [i.source, i.shown]]));
  assert.deepEqual(shown, {
    'vocabularyReference[0].note': ['vocab-note', ['bonne']],
    'exerciseConfig.items[0].instruction': ['instruction', ['je suis']],
    // feedback appears after the learner types the wrong answer; words from that answer are the learner's own
    'exerciseConfig.items[0].wrongAnswers[0].feedback': ['feedback', ['ne']],
    'sentences[0].blanks[0].hint': ['hint', ['moi']],
  });
});

test('a fillblank prompt shows the quoted French after the sentence', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', exercises: [
    { type: 'fillblank', prompt: "Complete: Hier, j'___ français (Yesterday, I spoke French) - Use 'parler'", answer: 'ai parlé' },
  ] }, 1, 1);
  const p = r.items.find((i) => i.ref === 'x#exercises[0].prompt');
  assert.deepEqual([p.source, p.shown], ['instruction', ['parler']]);
});

test('an exam shows no instructions, so its instructions are not read', () => {
  const r = readModule({ moduleKey: 'x', title: 'x', isUnitExam: true, exerciseConfig: { items: [
    { instruction: "Negate this sentence: 'je suis'", prompt: 'I am not', expectedAnswer: 'je ne suis pas' },
  ] } }, 1, 1);
  assert.deepEqual(r.items.filter((i) => i.source === 'instruction'), []);
});

test('module title and description, and the passage title and subtitle, show their French', () => {
  const r = readModule({ moduleKey: 'x', title: 'Essential Verb - voir (to see)', description: "Learn 'voir' and 'regarder'",
    isReadingComprehension: true,
    readingPassage: { title: 'Les Amis (The Friends)', subtitle: 'La ville de Paris.', text: 'Bonjour.', translation: 'Hello.' },
  }, 1, 1);
  const shown = Object.fromEntries(r.items.map((i) => [i.ref.slice(2), i.shown]));
  assert.deepEqual(shown, {
    readingPassage: ['Bonjour.'],
    title: ['voir'],
    description: ['voir', 'regarder'],
    'readingPassage.title': ['Les Amis'],
    'readingPassage.subtitle': ['La ville de Paris.'],
  });
});

test('with the graph, English words the graph does not know are not French', () => {
  const graph = loadGraph(path.join(repoRoot, 'curriculum-graph'), 'fr');
  const isWord = frenchWordTest(graph, buildFormIndex(graph));
  const r = readModule({ moduleKey: 'x', title: 'x', exerciseConfig: { items: [
    { instruction: 'Translate', prompt: 'hello', expectedAnswer: 'bonjour', hint: "Famous greeting - literally 'good day', like 'salut'" },
    { instruction: 'Translate', prompt: 'irregular', expectedAnswer: 'x', hint: 'Rising Tone' },
  ] } }, 1, 1, null, { isWord });
  assert.deepEqual(r.items.filter((i) => i.source === 'hint').map((i) => i.shown), [['salut']]);
});

test('readCourse reads each help screen named in the course map', async () => {
  const graph = loadGraph(path.join(repoRoot, 'curriculum-graph'), 'fr');
  const isWord = frenchWordTest(graph, buildFormIndex(graph));
  const full = await readCourse(repoRoot, { courseMap: graph.courseMap, isWord });
  const help = full.filter((m) => m.kind === 'help' && !m.guide);
  assert.equal(help.length, 4);
  for (const m of help) assert.ok(m.items.some((i) => i.source === 'screen'), m.moduleKey);
  // a guide is read from its data, not from a screen component
  const guides = full.filter((m) => m.kind === 'help' && m.guide);
  assert.deepEqual(guides.map((m) => m.moduleKey), ['2026-11-24-negation-guide']);
  assert.ok(guides[0].items.some((i) => i.source === 'guide' && i.shown.includes("Je n'ai pas de chat.")));
  assert.ok(guides[0].items.every((i) => i.source !== 'screen'));
  const cognates = full.find((m) => m.moduleKey === '2024-10-21-cognates-help');
  const screen = cognates.items.filter((i) => i.source === 'screen');
  assert.equal(screen[0].ref, '2024-10-21-cognates-help#screen[0]');
  assert.ok(screen.some((i) => i.shown.includes('un restaurant')));
  assert.ok(screen.every((i) => i.french.length === 0));
});
