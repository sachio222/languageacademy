// Rules that need the content layer: exam items copied from lessons, passage words with no pop-up, teaching only a
// guide gives, a Reference page that opens nothing, and the issue budget.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { miniCourse, checkMini, ofRule, repoRoot } from './content-helpers.mjs';
import { compareBudget } from '../budget.mjs';

test('exam copy', async () => {
  const course = miniCourse((modules) => {
    const exam = modules.get('exam-places');
    // word for word the lesson's i-paul (answer and situation), and a near copy with another answer
    exam.items.push({ id: 'e-paul', type: 'respond', situation: 'Someone asks your name. Say you are Paul.', answer: 'je suis Paul' });
    exam.items.push({ id: 'e-paul-2', type: 'respond', situation: 'Someone asks your name. Say you are Paul.', answer: 'je suis Pierre' });
    // the same item with another case and final punctuation is still a copy
    exam.items.push({ id: 'e-paul-3', type: 'respond', situation: 'someone asks your name. Say you are Paul', answer: 'Je suis Paul !' });
  });
  const { issues } = await checkMini(course);
  const copied = ofRule(issues, 'exam_item_copied');
  assert.deepEqual(copied.map((i) => i.itemRef), ['exam-places#e-paul', 'exam-places#e-paul-3']);
  assert.equal(copied[0].severity, 'warning');
  assert.match(copied[0].message, /2024-01-02-etre#i-paul/);
});

test('no popup', async () => {
  const course = miniCourse((modules) => {
    const r = modules.get('reading-cafe');
    r.passage.push({ id: 'b4', fr: 'Marie prend une boisson au café.', en: 'Marie has a drink at the café.' });
  });
  // The dictionary knows every word of the passage but boisson; Marie is a name; au is a glossary row; café is in
  // the reading's table.
  const dictionaryForms = new Set(['bonjour', 'je', 'suis', 'paul', 'prend', 'prendre', 'une', 'un']);
  const { issues } = await checkMini(course, { dictionaryForms });
  const none = ofRule(issues, 'reading_word_no_popup');
  assert.deepEqual(none.map((i) => i.surface), ['boisson']);
  assert.equal(none[0].severity, 'error');
  assert.equal(none[0].moduleKey, 'reading-cafe');
});

test("a guide's teaching counts like a lesson's (Jake, 2026-11-27)", async () => {
  // The guide (position 3) teaches est-ce que; the practice set after it (position 4) uses it, and no lesson teaches
  // it. A guide explains, often for the first time, what lessons cannot explain well, and what it teaches counts as
  // taught from its position, so the practice set raises nothing.
  const course = miniCourse((modules) => {
    modules.get('practice-etre').items.push({ id: 'p-question', type: 'gapfill', text: 'Est-ce que tu ___ Paul ?', blanks: [{ answer: 'es' }] });
  });
  const { issues } = await checkMini(course);
  assert.deepEqual(ofRule(issues, 'guide_only_teaching'), []);
  assert.deepEqual(issues.filter((i) => i.nodeId === 'fr:cx:q.est-ce-que' && i.itemRef === 'practice-etre#p-question'), []);
});

test('phrasebook opens nothing', async () => {
  // The course's phrasebook page sits on the shelf (shelf.pages) but not in shelf.opens_words, so a phrase it lists is
  // still untaught on the lesson path: quelque chose in a Unit 2 lesson before any lesson teaches it.
  const phrasebook = JSON.parse(readFileSync(join(repoRoot, 'content/fr/modules/phrasebook.json'), 'utf8'));
  assert.equal(phrasebook.kind, 'reference');
  // In the real course it is on the shelf and opens no words.
  const { shelf } = JSON.parse(readFileSync(join(repoRoot, 'content/fr/course.json'), 'utf8'));
  assert.ok(shelf.pages.includes('phrasebook'));
  assert.ok(!shelf.opens_words.includes('phrasebook'));
  const withPhrasebook = (open) => miniCourse((modules, outline) => {
    modules.set('phrasebook', phrasebook);
    outline.shelf.pages.push('phrasebook');
    if (open) outline.shelf.opens_words.push('phrasebook');
    modules.set('lesson-chose', {
      schema: 'la-module@1', module_key: 'lesson-chose', kind: 'lesson', status: 'written',
      title: 'Something', description: 'Say something.',
      vocabulary: [{ word_id: 'chose-tu-es-fr', fr: 'tu es', gloss: 'you are' }],
      items: [{ id: 'i-chose', type: 'choice', question: 'Which one means something?', options: [{ text: 'quelque chose', fr: true, right: true }, { text: 'tu es', fr: true }] }],
    });
    outline.units[1].entries.unshift('lesson-chose');
  });
  const untaughtChose = async (course) => ofRule((await checkMini(course)).issues, 'untaught-word')
    .filter((i) => i.moduleKey === 'lesson-chose' && /quelque|chose/.test(i.surface));
  const closed = await untaughtChose(withPhrasebook(false));
  assert.ok(closed.length > 0, 'quelque chose is untaught in the Unit 2 lesson');
  assert.ok(closed.every((i) => i.itemRef === 'lesson-chose#i-chose'));
  // The phrasebook does hold the phrase: listing it in opens_words would open it from the first lesson.
  assert.deepEqual(await untaughtChose(withPhrasebook(true)), []);
});

test('the budget fails only when a count rises', () => {
  const budget = { 'untaught-word': 10, 'translate-item': 5, 'reuse-missed': 3 };
  assert.deepEqual(compareBudget({ 'untaught-word': 10, 'translate-item': 4 }, budget), {
    over: [], under: [{ rule: 'reuse-missed', count: 0, budget: 3 }, { rule: 'translate-item', count: 4, budget: 5 }],
  });
  assert.deepEqual(compareBudget({ 'untaught-word': 11, 'new-rule': 1 }, budget).over, [
    { rule: 'new-rule', count: 1, budget: 0 }, { rule: 'untaught-word', count: 11, budget: 10 },
  ]);
});
