import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGraph } from '../load.mjs';
import { buildFormIndex } from '../fr/forms.mjs';
import { frenchIn, frenchWordTest, ENGLISH_ONLY } from '../french-text.mjs';
import { readModule } from '../course.mjs';
import { makeCtx } from './helpers.mjs';
import { ruleTaughtBefore } from '../rules/taught-before.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const graph = loadGraph(join(repoRoot, 'curriculum-graph'), 'fr');
const index = buildFormIndex(graph);
const isWord = frenchWordTest(graph, index);

test('with the real word list, quoted French stays French even when the list lacks a word', () => {
  assert.deepEqual(frenchIn("Used in 'bon voyage', 'bon appétit'", 'quoted', isWord), ['bon voyage', 'bon appétit']);
  assert.deepEqual(frenchIn("Future rule: 'elle est avocate' (she is a lawyer).", 'example', isWord), ['elle est avocate']);
});

test('with the real word list, French in a concept example stays French', () => {
  assert.deepEqual(frenchIn('Aie confiance! (Have confidence!), Ayez patience! (Have patience!)', 'example', isWord),
    ['Aie confiance!', 'Ayez patience!']);
  assert.deepEqual(frenchIn('se coucher (je me couche, tu te couches, il se couche)', 'example', isWord),
    ['se coucher', 'je me couche', 'tu te couches', 'il se couche']);
  assert.deepEqual(frenchIn('Reading Comprehension 3 - La Première Page', 'segments', isWord), ['La Première Page']);
});

test('with the real word list, English labels and glosses are not French', () => {
  assert.deepEqual(frenchIn('Rising Tone', 'segments', isWord), []);
  assert.deepEqual(frenchIn("Famous greeting - literally 'good day'", 'quoted', isWord), []);
  assert.deepEqual(frenchIn("Say 'a butterfly'", 'quoted', isWord), []);
  assert.deepEqual(frenchIn("That's 'yours', not 'hers'", 'quoted', isWord), []);
});

test('a French word the word list lacks is reported as unknown, not dropped', () => {
  const mod = readModule({ moduleKey: 'x', title: 'x', exerciseConfig: { items: [
    { instruction: 'Translate', prompt: 'enjoy your meal', expectedAnswer: 'bon appétit', hint: "Used in 'bon voyage', 'bon appétit'" },
  ] } }, 1, 1, null, { isWord });
  const ctx = makeCtx({ graph: { ...graph, courseMap: {} }, course: [{ ...mod, vocab: [], conceptTerms: [] }] });
  const unknown = ruleTaughtBefore(ctx).filter((i) => i.rule === 'unknown-word').map((i) => [i.surface, i.itemRef]);
  assert.deepEqual(unknown, [['appétit', 'x#exerciseConfig.items[0]']]);
  // the hint is read too: with the typed answer removed, the hint alone reports the word
  const hintOnly = readModule({ moduleKey: 'x', title: 'x', vocabularyReference: [{ french: 'bon', english: 'good', note: "as in 'bon appétit'" }] },
    1, 1, null, { isWord });
  const ctx2 = makeCtx({ graph: { ...graph, courseMap: {} }, course: [hintOnly] });
  assert.deepEqual(ruleTaughtBefore(ctx2).filter((i) => i.rule === 'unknown-word').map((i) => [i.surface, i.itemRef]),
    [['appétit', 'x#vocabularyReference[0].note']]);
});

test('respellings, word parts and forms quoted as wrong are not read as French', () => {
  assert.deepEqual(frenchIn("irregular - sounds like 'dee'", 'quoted'), []);
  assert.deepEqual(frenchIn("pronounced 'kom-pruh-non'", 'quoted'), []);
  assert.deepEqual(frenchIn("Uses 'boi-' for singular, 'buv-' for plural forms", 'quoted'), []);
  assert.deepEqual(frenchIn("Irregular past participle - NOT 'buvé'!", 'quoted'), []);
  assert.deepEqual(frenchIn("singular has single 't', plural has double 'tt'", 'quoted'), []);
});

test('no English-only word is a word in the course word list', () => {
  const clash = [...ENGLISH_ONLY].filter((w) => graph.names.has(w)
    || (index.get(w) ?? []).some((r) => r.pos !== 'alphabet' && r.surface === w));
  assert.deepEqual(clash, []);
});

test('a quoted gloss after meaning, means or a word class with for is English', () => {
  assert.deepEqual(frenchIn("noun meaning 'car'", 'quoted', isWord), []);
  assert.deepEqual(frenchIn("stressed pronoun for 'me'", 'quoted', isWord), []);
  assert.deepEqual(frenchIn("Which pronoun means 'me'?", 'quoted', isWord), []);
  assert.deepEqual(frenchIn("Both mean 'me'", 'quoted', isWord), []);
  // for after anything else, or a subject pronoun naming the person, quotes French
  assert.deepEqual(frenchIn("Possessive pronoun for 'tu', masculine thing", 'quoted', isWord), ['tu']);
  assert.deepEqual(frenchIn("Look for 'que'", 'quoted', isWord), ['que']);
  assert.deepEqual(frenchIn("Choose correct tense for 'faire'", 'quoted', isWord), ['faire']);
});

test("an elided article keeps its apostrophe before the closing quote", () => {
  assert.deepEqual(frenchIn("Before vowels, use 'de l'' not 'du'", 'quoted', isWord), ["de l'"]);
});

test('an unquoted word part and a module code are not words', () => {
  assert.deepEqual(frenchIn('⭐ -t- liaison: va + elle', 'quoted', isWord).map((s) => s.replace(/\s+/g, ' ')), ['⭐ liaison: va + elle']);
  assert.deepEqual(frenchIn('va-t-elle', 'quoted', isWord), ['va-t-elle']);
  assert.deepEqual(frenchIn('Combine venir (M17) + avec (M14) + moi', 'quoted', isWord).map((s) => s.replace(/\s+/g, ' ')),
    ['Combine venir + avec + moi']);
});

test('a concept example that lists short words or phrases between commas is read one entry at a time', () => {
  assert.deepEqual(frenchIn('eu, été, fait, vu - practice these until automatic', 'example', isWord), ['eu', 'été', 'fait', 'vu']);
  assert.deepEqual(frenchIn('parler → nous parlons, faire → nous faisons, aller → nous allons', 'example', isWord),
    ['parler', 'nous parlons', 'faire', 'nous faisons', 'aller', 'nous allons']);
  assert.deepEqual(frenchIn('action verbs (faire, devoir, parler)', 'example', isWord), ['faire', 'devoir', 'parler']);
  // a piece longer than three words is a sentence: the example stays whole
  assert.deepEqual(frenchIn("Bonjour, je m'appelle Marie", 'example', isWord), ["Bonjour, je m'appelle Marie"]);
});

test('a French word list keeps an entry the word list lacks, so it is reported as unknown', () => {
  const out = frenchIn('école, université, professeur, mathématiques, histoire', 'example', isWord);
  assert.ok(out.includes('mathématiques'), out.join(' | '));
});
