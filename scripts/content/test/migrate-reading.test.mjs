// Task 7: readings converted to module files (spec 5.7, 6): the passage from L's story, the table and questions from
// the module, word ids in course order, the sentences that changed, readings with no story, words with no pop-up.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readingFrom, changedSentences, wordsWithoutPopup, comprehensionFrom } from '../migrate/reading.mjs';
import { todaysModules, readLSources } from '../migrate/sources.mjs';
import { proposeWordId } from '../word-ids.mjs';
import { validateModule, hasPositionWord } from '../schema/module.mjs';

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
  assert.equal(r.mod.items.length, old.exerciseConfig.items.length);
  assert.ok(r.mod.items.every((i) => i.type === 'comprehension'));
  const img = r.mod.passage[1];
  assert.deepEqual(img.img, { src: 'img/reading1/paul', w: 1600, h: 1067, alt: storyOf(1).blocks[1].alt });
  assert.equal(img.fr, 'Paul, un chat et un chien.');
  assert.deepEqual(errors(r.mod, 1), []);
  // Reading 1 teaches no table; reading 8's has rows, each one a card.
  const old8 = configs.get('2024-05-20-reading-8');
  const r8 = readingFrom(old8, storyOf(8), { unitIndex: 8 });
  assert.ok(old8.vocabularyReference.length > 0);
  assert.deepEqual(r8.mod.vocabulary.map((w) => [w.fr, w.gloss]), cards(old8.vocabularyReference));
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
  // Its title says "Reading Comprehension 4" and its description "Unit 4 mastery!": position words, reported and fixed
  // by hand in the written file.
  assert.deepEqual(errors(r.mod, 4).map((p) => [p.code, p.path]), [['position_word', 'title'], ['position_word', 'description']]);
  assert.ok(r.report.some((l) => l.kind === 'position_word' && l.path === 'title'));
  assert.ok(hasPositionWord('Reading Comprehension 6 - Un Voyage en Famille') && !hasPositionWord('Reading Comprehension - First Paragraph!'));
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
  // A second line that repeats the question is dropped for that reason.
  const lines = [];
  const item = comprehensionFrom({ instruction: 'Where is Sophie?', prompt: 'Where is Sophie?', expectedAnswer: 'Caen' }, { add: (path, kind, detail) => lines.push({ path, kind, detail }), ref: 'x' });
  assert.equal(item.cue, undefined);
  assert.deepEqual(lines.map((l) => l.detail), ['"Where is Sophie?" (repeats the question)']);
});

test('quoted French in a question is a span, as L marks it', () => {
  const r1 = readingFrom(configs.get('2024-01-09-reading1'), storyOf(1), { unitIndex: 1 });
  assert.equal(r1.mod.items[0].cue, 'Who is {je}?');
  assert.equal(r1.mod.items[2].question, 'Who is {tu} (you)?');
  assert.equal(r1.mod.items[0].hint, 'Second sentence - {je suis ___}');
  const quoted = /['‘"“]\{|\}['’"”]/;
  const texts = r1.mod.items.flatMap((it) => [it.question, it.cue, it.hint, ...(it.mistakes || []).map((m) => m.feedback)].filter(Boolean));
  assert.deepEqual(texts.filter((t) => quoted.test(t)), [], 'no quotes around a span');
});

test('inline italic markup is removed from the passage, and reported', () => {
  const r3 = readingFrom(configs.get('2024-02-03-reading3'), storyOf(3), { unitIndex: 3 });
  const marc = r3.mod.passage.find((b) => /Monte-Cristo/.test(b.fr ?? ''));
  assert.equal(marc.fr, "Oui ! Je vais au café avec toi. Tu as Le Comte de Monte-Cristo ? C'est le livre rouge et jaune.");
  assert.ok(r3.mod.passage.every((b) => !String(b.fr ?? '').includes('*') && !String(b.en ?? '').includes('*')));
  const italics = r3.report.filter((l) => l.kind === 'text_changed' && /italic/.test(l.detail));
  assert.deepEqual(italics.map((l) => l.detail), ['italic markup removed: *Le Comte de Monte-Cristo*', 'italic markup removed: *Vingt mille lieues sous les mers*']);
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

// Task 8 (ledger ruling 2026-11-25, L 20991bf): Reading 10's place cards are kept as info_card, with a credit only
// where the picture's own file states author and licence.
test('reading word cards keep their info card, credited only from the picture file', async () => {
  const { imageCredit } = await import('../migrate/sources.mjs');
  assert.deepEqual(imageCredit('/img/external/sacre-coeur-montmartre.jpg'), { credit: 'Gio Terra (Terragio67, WikiCommons), CC BY-SA 4.0', stated: null });
  // A licence with no author, or an author with no licence, is not a credit.
  assert.equal(imageCredit('/img/external/Louvre_Museum_Wikimedia_Commons-1851e9.jpg').credit, null);
  assert.equal(imageCredit('/img/external/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques__Paris_ao_t_2014__2_-085432.jpg').credit, null);
  assert.deepEqual(imageCredit('/img/wikipedia/CollineDuChateau_NiceFrance2022-b921bd.png'), { credit: null, stated: null });

  const old = configs.get('2024-02-01-reading-10');
  const story = L.stories.find((s) => s.n === 10) ?? null;
  const { mod, report } = readingFrom(old, story, { unitIndex: 10, imageCredit });
  const cards = mod.vocabulary.filter((w) => w.info_card);
  assert.equal(cards.length, 8);
  assert.deepEqual(Object.keys(cards[0].info_card), ['name', 'description', 'image', 'image_credit', 'url']);
  assert.equal(report.filter((l) => l.kind === 'note' && /^image_without_credit:/.test(l.detail)).length, 7);
  assert.ok(!report.some((l) => /wikipedia/.test(l.path) && l.kind === 'dropped_field'));
});

test('an info card needs an https link and a site image path, or null', () => {
  const card = (over) => ({ name: 'Paris', description: 'Capital of France', image: '/img/wikipedia/paris.jpg', image_credit: null, url: 'https://en.wikipedia.org/wiki/Paris', ...over });
  const withCard = (c) => {
    const m = clone(JSON.parse(JSON.stringify({ schema: 'la-module@1', module_key: 'r', kind: 'reading', status: 'written', title: 'R', description: 'D', story_id: 'reading1', passage: [{ id: 'b-1', fr: 'Paris.', en: 'Paris.' }], items: [] })));
    m.vocabulary = [{ word_id: 'paris-fr', fr: 'Paris', gloss: 'Paris', info_card: c }];
    return validateModule(m, { file: 'r.json', unitIndex: 1 }).filter((p) => /info_card/.test(p.path)).map((p) => p.path);
  };
  assert.deepEqual(withCard(card({})), []);
  assert.deepEqual(withCard(card({ image: null, image_credit: null })), []);
  assert.deepEqual(withCard(card({ url: 'http://example.org' })), ['vocabulary[0].info_card.url']);
  assert.deepEqual(withCard(card({ image: 'img/paris.gif' })), ['vocabulary[0].info_card.image']);
  assert.deepEqual(withCard({ name: 'Paris', description: 'x', url: 'https://x' }), ['vocabulary[0].info_card.image', 'vocabulary[0].info_card.image_credit']);
});

test('an info card with no name is a validation error, never the text "undefined"', async () => {
  const { imageCredit } = await import('../migrate/sources.mjs');
  const old = clone(configs.get('2024-02-01-reading-10'));
  delete old.vocabularyReference[0].wikipedia.name;
  const story = L.stories.find((s) => s.n === 10) ?? null;
  const { mod } = readingFrom(old, story, { unitIndex: 10, imageCredit });
  const card = JSON.parse(JSON.stringify(mod.vocabulary[0].info_card));
  assert.ok(!('name' in card));
  const problems = validateModule(JSON.parse(JSON.stringify(mod)), { file: 'r.json', unitIndex: 10 }).filter((p) => /info_card/.test(p.path));
  assert.deepEqual(problems.map((p) => [p.path, p.code]), [['vocabulary[0].info_card.name', 'field_missing']]);
});

test("a reading's story is the one its file names, else the frozen map's; never the unit's place (final review I4)", async () => {
  const { storyFor } = await import('../migrate/reading.mjs');
  const stories = [{ n: 2, unit: 2 }, { n: 3, unit: 3 }];
  const map = { '2024-01-22-reading2': 'reading2' };
  assert.equal(storyFor('2024-01-22-reading2', { story_id: 'reading3' }, stories, map).n, 3, 'the written story_id wins');
  assert.equal(storyFor('2024-01-22-reading2', null, stories, map).n, 2, 'no file: the frozen map');
  assert.equal(storyFor('new-reading', null, stories, map), null, 'neither: no story (story_missing)');
  assert.equal(storyFor('new-reading', { story_id: 'reading9' }, stories, map), null, 'a story L does not have');
});
