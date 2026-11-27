import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, fold, restoreElisions } from '../fr/tokenize.mjs';

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

test('fold writes the oe and ae ligatures out, norm keeps them', () => {
  assert.equal(fold('Sœur'), 'soeur');
  assert.equal(fold('cœur'), fold('coeur'));
  assert.equal(fold('Lætitia'), 'laetitia');
  const [t] = tokenize('œuvre');
  assert.equal(t.norm, 'œuvre');
  assert.equal(t.fold, 'oeuvre');
});

test('restoreElisions puts back the apostrophe of a lone elided letter before a vowel or h', () => {
  assert.equal(restoreElisions('j ai des espèces'), "j'ai des espèces");
  assert.equal(restoreElisions('je veux de l eau'), "je veux de l'eau");
  assert.equal(restoreElisions('qu est-ce que tu manges'), "qu'est-ce que tu manges");
  assert.equal(restoreElisions('il dit qu il vient, c est ça, n y va pas'), "il dit qu'il vient, c'est ça, n'y va pas");
  assert.equal(restoreElisions("l homme"), "l'homme");
  assert.equal(restoreElisions('à 7h, je pars'), 'à 7h, je pars');
  assert.equal(restoreElisions('t es là? d accord'), "t'es là? d'accord");
  assert.equal(restoreElisions('je suis là'), 'je suis là');
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

test('hour notation (7h, 7h30, 18h) is a time, not the letter h', () => {
  const surfaces = (s) => tokenize(s).map((t) => t.surface);
  assert.deepEqual(surfaces('tu te réveilles à 7h'), ['tu', 'te', 'réveilles', 'à']);
  assert.deepEqual(surfaces('Je pars à 7h30, il arrive à 18h.'), ['Je', 'pars', 'à', 'il', 'arrive', 'à']);
  // a word written after a number is still a word
  assert.deepEqual(surfaces('à 8 heures'), ['à', 'heures']);
  assert.deepEqual(surfaces('8heures'), ['heures']);
});

test('quoted speech after a colon starts a new sentence', () => {
  const sentences = (text) => tokenize(text).map((t) => t.sentence);
  assert.deepEqual(sentences('Marc a dit: "Si on avait le temps, on resterait."'), [0, 0, 0, 1, 1, 1, 1, 1, 1, 1]);
  assert.deepEqual(sentences('Elle a dit : « Viens ! »'), [0, 0, 0, 1]);
  // a colon before a list or an explanation does not end the sentence
  assert.deepEqual(sentences('Il a un rêve: être artiste.'), [0, 0, 0, 0, 0, 0]);
});
