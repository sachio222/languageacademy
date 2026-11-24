import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, fold } from '../fr/tokenize.mjs';

const folds = (text, opts) => tokenize(text, opts).map((t) => t.fold);

test('elision splits and keeps the apostrophe', () => {
  assert.deepEqual(folds("J'ai mangé."), ["j'", 'ai', 'mange']);
});

test('est-ce splits into a clitic', () => {
  assert.deepEqual(folds('Qu\'est-ce que tu veux ?'), ["qu'", 'est', '-ce', 'que', 'tu', 'veux']);
});

test('inversion clitic is flagged', () => {
  const t = tokenize('Veux-tu venir ?');
  assert.deepEqual(t.map((x) => x.fold), ['veux', '-tu', 'venir']);
  assert.equal(t[1].clitic, true);
  assert.equal(t[0].clitic, false);
});

test('t-il clitic stays together', () => {
  assert.deepEqual(folds('A-t-il fini ?'), ['a', '-t-il', 'fini']);
});

test('aujourd\'hui and quelqu\'un stay whole', () => {
  assert.deepEqual(folds("aujourd'hui"), ["aujourd'hui"]);
  assert.deepEqual(folds("quelqu'un quelqu'une"), ["quelqu'un", "quelqu'une"]);
});

test('hyphenated word kept whole when isWord says so', () => {
  assert.deepEqual(folds('C’est là-bas', { isWord: (f) => f === 'la-bas' }), ["c'", 'est', 'la-bas']);
});

test('hyphenated non-word splits into parts', () => {
  assert.deepEqual(folds('vingt-deux', { isWord: () => false }), ['vingt', 'deux']);
});

test('punctuation, digits and blanks are dropped', () => {
  assert.deepEqual(folds('Tu viens ? Oui !'), ['tu', 'viens', 'oui']);
  assert.deepEqual(folds('« Bonjour » — il a 12 ans… ___'), ['bonjour', 'il', 'a', 'ans']);
});

test('non-breaking spaces separate tokens', () => {
  assert.deepEqual(folds('Tu viens ? Oui !'), ['tu', 'viens', 'oui']);
});

test('curly and straight apostrophes tokenize the same', () => {
  assert.deepEqual(tokenize('Je l’aime').map((t) => [t.norm, t.fold]), tokenize("Je l'aime").map((t) => [t.norm, t.fold]));
});

test('elision is case-insensitive and surface keeps the original', () => {
  const t = tokenize('Qu’il J’ai');
  assert.deepEqual(t.map((x) => x.surface), ['Qu’', 'il', 'J’', 'ai']);
  assert.deepEqual(t.map((x) => x.norm), ["qu'", 'il', "j'", 'ai']);
});

test('norm keeps diacritics, fold strips them', () => {
  const [t] = tokenize('Été');
  assert.equal(t.norm, 'été');
  assert.equal(t.fold, 'ete');
  assert.equal(fold('Été'), 'ete');
});

test('stacked clitics split off one by one', () => {
  assert.deepEqual(folds('dis-le-moi'), ['dis', '-le', '-moi']);
});

test('decomposed (NFD) input tokenizes like composed input', () => {
  const t = tokenize('cafés mangé'.normalize('NFD'));
  assert.deepEqual(t.map((x) => x.fold), ['cafes', 'mange']);
  assert.equal(t[0].surface, 'cafés');
});

test('a bare elision prefix stays an elided token', () => {
  assert.deepEqual(folds("l'"), ["l'"]);
  assert.deepEqual(folds('de l\''), ['de', "l'"]);
  assert.deepEqual(folds('à l’'), ['a', "l'"]);
  assert.deepEqual(folds("L'"), ["l'"]);
  assert.deepEqual(folds("jusqu'"), ["jusqu'"]);
  assert.deepEqual(folds("J'ai mangé."), ["j'", 'ai', 'mange']);
});
