// Glosses (Jake, 2026-11-25; L c3da2c0 BundleContent.glosses): a form of a word the learner already knows gets a
// tap-to-see gloss instead of a card. The checker counts a token a gloss row of its module covers as allowed: neither
// untaught nor taught. A gloss covers only the French L glosses: in a lesson or guide, the French the learner reads
// (prompts, shown French, concept cards, tables, vocabulary examples, guide parts), never an answer or a choice; in a
// reading, the passage. A gloss may cover only a form of a word taught at or before its module; one that covers a word
// not taught yet is gloss_of_untaught, so a gloss never skips the teaching. In a reading the glossary rules stay as
// they were: a gloss over an untaught word raises no gloss_of_untaught and leaves the word's untaught-word issue.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { miniCourse, checkMini, ofRule } from './content-helpers.mjs';

const LESSON = '2024-01-02-etre';
const READING = 'reading-cafe';

// The mini course with a concept card whose definition quotes `french`, and `glosses` on the lesson.
function lessonWith({ french, glosses, edit = () => {} }) {
  return miniCourse((mods) => {
    const m = mods.get(LESSON);
    if (french) m.concepts.push({ id: 'c-probe', term: 'Other forms', definition: `Read ${french.map((f) => `{${f}}`).join(' and ')}.` });
    if (glosses) m.glosses = glosses;
    edit(m, mods);
  });
}
const untaught = (issues, surface) => ofRule(issues, 'untaught-word').filter((i) => i.surface === surface);

test('a gloss of a form of a taught word: the form is allowed in the French L glosses, and is not taught', async () => {
  const bare = await checkMini(lessonWith({ french: ["j'étais", 'tu seras'] }));
  assert.equal(untaught(bare.issues, 'étais')[0]?.reason, 'form');
  assert.equal(untaught(bare.issues, 'seras')[0]?.reason, 'form');
  const { ctx, issues } = await checkMini(lessonWith({
    french: ["j'étais", 'tu seras'],
    glosses: [{ fr: 'étais', en: 'was', note: 'past of {être}' }, { fr: 'tu seras', en: 'you will be' }],
  }));
  assert.deepEqual(untaught(issues, 'étais'), []);
  assert.deepEqual(untaught(issues, 'seras'), []);
  assert.deepEqual(ofRule(issues, 'gloss_of_untaught'), []);
  // Allowed, not taught: the timeline credits no form, and j' (not glossed) keeps its issue.
  assert.deepEqual([...ctx.timeline.taughtAt.keys()].filter((id) => /etre\.(imparfait|futur)/.test(id)), []);
  assert.deepEqual([...ctx.timeline.taughtAt].sort(), [...bare.ctx.timeline.taughtAt].sort());
  assert.equal(untaught(issues, "j'").length, 1);
});

test('a gloss matches as L does: whole words, any case, any apostrophe', async () => {
  const { issues } = await checkMini(lessonWith({ french: ['Tu SERAS là'], glosses: [{ fr: 'seras', en: 'will be' }] }));
  assert.deepEqual(untaught(issues, 'SERAS'), []);
  const part = await checkMini(lessonWith({ french: ['tu seras'], glosses: [{ fr: 'sera', en: 'will be' }] }));
  assert.equal(untaught(part.issues, 'seras').length, 1, 'sera does not cover seras');
});

test('gloss_of_untaught: a gloss that covers a word not taught at or before its module', async () => {
  // avoir is never taught in the mini course; café is taught by the reading after the lesson.
  const { issues } = await checkMini(lessonWith({
    french: ['nous avons', 'des cafés'],
    glosses: [{ fr: 'avons', en: 'have' }, { fr: 'cafés', en: 'coffees' }],
  }));
  const found = ofRule(issues, 'gloss_of_untaught');
  assert.deepEqual(found.map((i) => [i.moduleKey, i.surface, i.severity, i.lemma]).sort(), [
    [LESSON, 'avons', 'error', 'avoir'],
    [LESSON, 'cafés', 'error', 'café'],
  ]);
  assert.match(found.find((i) => i.surface === 'cafés').message, /taught later/);
  // One issue per gloss row: the word is not also an untaught-word issue there.
  assert.deepEqual(untaught(issues, 'avons'), []);
});

test('a gloss never covers the answer side: typed French and choices keep their issues', async () => {
  const items = (m) => {
    m.items.push(
      { id: 'i-etais', type: 'respond', situation: 'Say you were Paul.', answer: "j'étais Paul" },
      { id: 'i-pick', type: 'choice', question: 'Which one is a past form?', options: [{ text: 'tu étais', fr: true, right: true }, { text: 'tu es', fr: true }] },
    );
  };
  const { issues } = await checkMini(lessonWith({ glosses: [{ fr: 'étais', en: 'was' }], edit: items }));
  const left = untaught(issues, 'étais').map((i) => i.itemRef).sort();
  assert.ok(left.length >= 1, 'the typed or picked étais is still untaught');
  assert.ok(left.every((r) => /#i-(etais|pick)$/.test(r)), left.join(', '));
});

test("a gap-fill's shown words are glossed, its blanks are not", async () => {
  const gap = (answer) => (m) => m.items.push({ id: 'i-gap', type: 'gapfill', text: answer ? 'Tu ___ Paul.' : 'Tu seras ___.', blanks: [{ answer: answer ?? 'Paul' }] });
  const shown = await checkMini(lessonWith({ glosses: [{ fr: 'seras', en: 'will be' }], edit: gap(null) }));
  assert.deepEqual(untaught(shown.issues, 'seras'), []);
  const typed = await checkMini(lessonWith({ glosses: [{ fr: 'seras', en: 'will be' }], edit: gap('seras') }));
  assert.equal(untaught(typed.issues, 'seras').length, 1);
});

test("a gloss covers only its own module's French", async () => {
  const { issues } = await checkMini(miniCourse((mods) => {
    mods.get(LESSON).glosses = [{ fr: 'seras', en: 'will be' }];
    mods.get(READING).passage.push({ id: 'b4', fr: 'Tu seras au café.', en: 'You will be at the café.' });
  }));
  assert.equal(untaught(issues, 'seras').filter((i) => i.moduleKey === READING).length, 1);
});

test('in a reading a gloss covers the passage; over an untaught word it raises no gloss_of_untaught', async () => {
  const course = (glosses) => miniCourse((mods) => {
    const r = mods.get(READING);
    r.passage.push({ id: 'b4', fr: 'Tu seras au café. Nous avons un chat.', en: 'You will be at the café. We have a cat.' });
    if (glosses) r.glosses = glosses;
  });
  const bare = await checkMini(course());
  const { issues } = await checkMini(course([{ fr: 'seras', en: 'will be' }, { fr: 'avons', en: 'have' }]));
  assert.deepEqual(untaught(issues, 'seras'), []);
  assert.deepEqual(ofRule(issues, 'gloss_of_untaught'), []);
  assert.deepEqual(untaught(issues, 'avons').map((i) => i.reason), untaught(bare.issues, 'avons').map((i) => i.reason));
  assert.equal(untaught(issues, 'avons').length, 1);
  // A gloss is a pop-up in L, so the passage word has one.
  const noPopup = (list) => ofRule(list, 'reading_word_no_popup').map((i) => i.surface);
  assert.ok(noPopup(bare.issues).includes('seras'));
  assert.ok(!noPopup(issues).includes('seras'));
});
