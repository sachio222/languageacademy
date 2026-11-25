// Task 7: readings converted to module files (spec 5.7, 6): the passage from L's story, the table and questions from
// the module, word ids in course order, the sentences that changed, readings with no story, words with no pop-up.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readingFrom, changedSentences, wordsWithoutPopup } from '../migrate/reading.mjs';
import { todaysModules, readLSources } from '../migrate/sources.mjs';
import { proposeWordId } from '../word-ids.mjs';
import { validateModule } from '../schema/module.mjs';

const L = readLSources();
const { configs } = await todaysModules();
const clone = (v) => JSON.parse(JSON.stringify(v));
const storyOf = (unit) => L.stories.find((s) => s.unit === unit);
const errors = (mod, unitIndex) => validateModule(mod, { unitIndex }).filter((p) => p.severity !== 'warning');
const cards = (vocabularyReference) => {
  const out = [];
  for (const v of vocabularyReference) if (!out.some((x) => x[0] === v.french.trim() && x[1] === v.english.trim())) out.push([v.french.trim(), v.english.trim()]);
  return out;
};

test('reading passage from story', () => {
  const old = configs.get('2024-01-09-reading1');
  const r = readingFrom(old, storyOf(1), { unitIndex: 1 });
  assert.equal(r.mod.kind, 'reading');
  assert.equal(r.mod.story_id, 'reading1');
  assert.equal(r.mod.passage[0].fr, "Bonjour ! Je suis Paul. Je suis un homme. J'ai un chat et un chien aussi.");
  assert.equal(r.mod.passage[0].en, 'Hello! I am Paul. I am a man. I have a cat and a dog too.');
  assert.deepEqual(r.mod.vocabulary.map((w) => [w.fr, w.gloss]), cards(old.vocabularyReference));
  assert.equal(r.mod.items.length, old.exerciseConfig.items.length);
  assert.ok(r.mod.items.every((i) => i.type === 'comprehension'));
  const img = r.mod.passage[1];
  assert.deepEqual(img.img, { src: 'img/reading1/paul', w: 1600, h: 1067, alt: storyOf(1).blocks[1].alt });
  assert.equal(img.fr, 'Paul, un chat et un chien.');
  assert.deepEqual(errors(r.mod, 1), []);
});

test('a reading’s vocabulary table is its words, with word ids in course order', () => {
  const old = configs.get('2024-03-30-reading-4');
  const seen = new Map();
  const minted = new Set();
  const r = readingFrom(old, storyOf(4), { unitIndex: 4, seenBySpelling: seen, minted });
  assert.deepEqual(r.mod.vocabulary.map((w) => [w.fr, w.gloss]), cards(old.vocabularyReference));
  const manger = r.mod.vocabulary.find((w) => w.fr === 'manger');
  assert.equal(manger.word_id, 'manger-fr');
  assert.ok(minted.has('manger-fr'), 'first taught here, so the reading mints its id');
  // A later lesson teaching the same meaning keeps the reading's id.
  assert.equal(proposeWordId({ french: 'manger', english: 'to eat' }, seen).word_id, 'manger-fr');
  // Its description says "Unit 4 mastery!": a position word, reported and fixed by hand in the written file.
  assert.deepEqual(errors(r.mod, 4).map((p) => p.code), ['position_word']);
  assert.ok(r.report.some((l) => l.kind === 'position_word' && l.path === 'description'));
});

test('speakers, scenes and the closing line', () => {
  const r = readingFrom(configs.get('2024-03-30-reading-4'), storyOf(4), { unitIndex: 4 });
  const first = r.mod.passage[0];
  assert.equal(first.speaker, 'Paul');
  assert.equal(first.fr, 'Marie ! Tu veux aller au Jardin du Luxembourg avec moi ?');
  assert.equal(first.en, 'Marie! Do you want to go to Jardin du Luxembourg with me?');
  assert.deepEqual(r.mod.passage.filter((b) => b.layout).map((b) => [b.layout, b.fr]), [['scene', 'Ce soir au café'], ['end', 'Fin!']]);
  // "La femme" in the French, "The woman" in the English: the French label is kept, and the report says so.
  assert.ok(r.report.some((l) => l.kind === 'text_changed' && /"La femme".*"The woman"/.test(l.detail)));
  const r6 = readingFrom(configs.get('2024-04-24-reading-6'), storyOf(6), { unitIndex: 6 });
  assert.ok(r6.mod.passage.some((b) => b.speaker === 'Le père'));
  const r3 = readingFrom(configs.get('2024-02-03-reading3'), storyOf(3), { unitIndex: 3 });
  assert.deepEqual([r3.mod.passage[0].layout, r3.mod.passage[0].fr], ['dateline', 'Paris, 1871, Belle Époque']);
});

test('questions keep their second line as the cue, and authored ids', () => {
  const r2 = readingFrom(configs.get('2024-01-22-reading2'), storyOf(2), { unitIndex: 2 });
  assert.equal(r2.mod.items[0].question, 'Where is Sophie in the story?');
  assert.equal(r2.mod.items[0].cue, 'Sophie is in ___');
  const r1 = readingFrom(configs.get('2024-01-09-reading1'), storyOf(1), { unitIndex: 1 });
  assert.equal(r1.mod.items[1].cue, undefined, '"Find the answer in the passage above" says nothing more');
  assert.ok(r1.report.some((l) => l.kind === 'dropped_field' && /Find the answer/.test(l.detail)));
  const r7 = readingFrom(configs.get('2024-05-07-reading-7'), storyOf(7), { unitIndex: 7 });
  assert.equal(r7.mod.items[0].id, 'reading-7-1');
});

test('text_changed lists each sentence where the story differs from today’s text', () => {
  const live = '**Paul:** Bonjour ! Je suis Paul.\n\n![img/x.png]\n\nJ’ai un chat.';
  const passage = [{ speaker: 'Paul', fr: 'Bonjour ! Je suis Marc.' }, { fr: "J'ai un chat. J'ai un chien." }];
  assert.deepEqual(changedSentences(live, passage), [{ from: 'Je suis Paul.', to: 'Je suis Marc.' }, { from: null, to: "J'ai un chien." }]);
  const old = configs.get('2024-01-09-reading1');
  const r = readingFrom(old, storyOf(1), { unitIndex: 1 });
  // L's story adds a caption under each picture: sentences the live text never had.
  assert.ok(r.report.some((l) => l.kind === 'text_changed' && l.detail === 'story text: added: "Paul, un chat et un chien."'), JSON.stringify(r.report.filter((l) => l.kind === 'text_changed')));
});

test('story_missing: a reading with no story takes its passage from the module', () => {
  const old = configs.get('2024-01-09-reading1');
  const r = readingFrom(old, null, { unitIndex: 1 });
  assert.ok(r.report.some((l) => l.kind === 'story_missing'));
  assert.equal(r.mod.passage[0].fr, "Bonjour ! Je suis Paul. Je suis un homme. J'ai un chat et un chien aussi.");
  assert.equal(r.mod.passage[0].en, 'Hello! I am Paul. I am a man. I have a cat and a dog too.');
  assert.ok(r.report.some((l) => l.kind === 'dropped_field' && /img\/reading1a\.png/.test(l.detail)));
  assert.deepEqual(errors(r.mod, 1), []);
});

test('passage words with no pop-up', () => {
  const mod = { passage: [{ fr: "Bonjour ! Je suis Paul. J'ai un *chat*." }], vocabulary: [{ fr: 'un chat' }], glossary: [] };
  const forms = new Set(['bonjour', 'je', 'suis', 'ai']);
  assert.deepEqual(wordsWithoutPopup(mod, { dictionaryForms: forms }), ['Paul']);
  assert.deepEqual(wordsWithoutPopup(mod, { dictionaryForms: forms, names: new Set(['paul']) }), []);
  // A clitic after a hyphen is looked up as its word: est-ce is est + ce.
  assert.deepEqual(wordsWithoutPopup({ passage: [{ fr: 'Est-ce que tu viens ? Excusez-moi.' }] }, { dictionaryForms: new Set(['est', 'ce', 'que', 'tu', 'viens', 'excusez', 'moi']) }), []);
  const r = readingFrom(configs.get('2024-01-09-reading1'), storyOf(1), { unitIndex: 1, dictionaryForms: forms, names: new Set(['paul', 'marie']) });
  const missing = r.report.filter((l) => l.kind === 'reading_word_no_popup').map((l) => l.detail);
  // The story's glossary covers most words ("une maison"); "ont" has no row, no dictionary form here, and is no name.
  assert.ok(missing.includes('ont') && !missing.includes('maison') && !missing.includes('Bonjour') && !missing.includes('Paul'), missing.join(' '));
});

test('rerun keeps hand edits to a passage block and an item', () => {
  const old = configs.get('2024-01-22-reading2');
  const opts = { unitIndex: 2 };
  const first = readingFrom(old, storyOf(2), opts);
  const edited = clone(first.mod);
  edited.passage[0].en = 'Edited by hand.';
  edited.items[2].hint = 'Hand hint';
  const second = readingFrom(old, storyOf(2), { ...opts, existing: edited, record: first.record });
  assert.deepEqual(second.mod, edited);
  assert.ok(second.handFixes[`passage/${edited.passage[0].id}`]);
  assert.ok(second.handFixes[`items/${edited.items[2].id}`]);
  const third = readingFrom(old, storyOf(2), { ...opts, existing: second.mod, record: second.record });
  assert.deepEqual(third.mod, edited);
  assert.deepEqual(third.record, second.record);
  const forced = readingFrom(old, storyOf(2), { ...opts, handFixes: second.handFixes });
  assert.deepEqual(forced.mod, edited);
});
