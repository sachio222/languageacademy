import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readCourse, readModule, isEnglish, stripPassage } from '../course.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const course = await readCourse(repoRoot);
const frenchOf = (m) => m.items.flatMap((i) => i.french);

test('course has 160 modules at positions 1..160', () => {
  assert.equal(course.length, 160);
  assert.deepEqual(course.map((m) => m.position), Array.from({ length: 160 }, (_, i) => i + 1));
});

test('position 30 is the aller lesson and teaches je vais', () => {
  const m = course[29];
  assert.equal(m.moduleKey, '2024-01-27-aller');
  assert.equal(m.kind, 'lesson');
  assert.ok(m.items.some((i) => i.french.includes('je vais')));
});

test('no module is titled Les Nombres', () => {
  assert.equal(course.filter((m) => m.title === 'Les Nombres').length, 0);
});

test('verb-pattern-help appears once, at position 31', () => {
  const hits = course.filter((m) => m.moduleKey === '2024-01-28-verb-pattern-help');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].position, 31);
  assert.equal(hits[0].kind, 'help');
});

test('passe-compose-er has the filled fillblank sentence', () => {
  const m = course.find((x) => x.moduleKey === '2024-05-30-passe-compose-er');
  assert.ok(m.items.some((i) => i.french[0]?.includes("Hier, j'ai parlé français")));
  assert.ok(m.shapes.includes('exercises'));
  assert.ok(m.shapes.includes('fib'));
});

test('Unit 2 reading has a clean passage item', () => {
  const m = course.find((x) => x.moduleKey === '2024-01-22-reading2');
  assert.equal(m.kind, 'reading');
  const p = m.items.find((i) => i.source === 'passage');
  assert.ok(p);
  const text = p.french.join('\n');
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
  assert.equal(course.filter((m) => m.kind === 'help').length, 4);
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
