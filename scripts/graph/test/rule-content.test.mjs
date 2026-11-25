// Rules that need the content layer: exam items copied from lessons, passage words with no pop-up, teaching only a
// guide gives, and the issue budget.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { miniCourse, checkMini, ofRule } from './content-helpers.mjs';
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

test('guide only teaching', async () => {
  // The guide (position 3) teaches est-ce que; the practice set after it (position 4) uses it, and no lesson teaches
  // it, so learners who skip the guide meet it untaught.
  const course = miniCourse((modules) => {
    modules.get('practice-etre').items.push({ id: 'p-question', type: 'gapfill', text: 'Est-ce que tu ___ Paul ?', blanks: [{ answer: 'es' }] });
  });
  const { issues } = await checkMini(course);
  const only = ofRule(issues, 'guide_only_teaching');
  assert.ok(only.some((i) => i.nodeId === 'fr:cx:q.est-ce-que' && i.itemRef === 'practice-etre#p-question'), JSON.stringify(only));
  assert.ok(only.every((i) => i.severity === 'error'));
  // The guide itself may use what it teaches.
  assert.ok(!only.some((i) => i.moduleKey === 'questions-help'));
  // A lesson teaching it too clears the issue.
  const taught = miniCourse((modules) => {
    modules.get('practice-etre').items.push({ id: 'p-question', type: 'gapfill', text: 'Est-ce que tu ___ Paul ?', blanks: [{ answer: 'es' }] });
    modules.get('2024-01-02-etre').teaches.constructions.push('fr:cx:q.est-ce-que');
  });
  assert.deepEqual(ofRule((await checkMini(taught)).issues, 'guide_only_teaching').filter((i) => i.nodeId === 'fr:cx:q.est-ce-que'), []);
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
