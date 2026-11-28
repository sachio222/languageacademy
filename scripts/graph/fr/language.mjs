// The French language module (see ../language.mjs for what each member means).
import { fold, norm, tokenize, restoreElisions } from './tokenize.mjs';
import { buildFormIndex, lookupKey, strictKey, lookupToken, lookupTokenStrict } from './forms.mjs';
import { isEnglish, isFrenchText, frenchIn, frenchWordTest } from './text.mjs';
import { checkAnswer } from './answers.mjs';
import { conjugation } from './conjugation.mjs';

// The full form an elided word is a pop-up for: l' opens le.
const ELIDED = { "j'": 'je', "l'": 'le', "d'": 'de', "n'": 'ne', "s'": 'se', "c'": 'ce', "qu'": 'que', "m'": 'me', "t'": 'te', "jusqu'": 'jusque', "lorsqu'": 'lorsque', "puisqu'": 'puisque' };

// A reading pop-up is looked up by the folded spelling; a clitic after a hyphen (est-ce, excusez-moi, va-t-il) is the
// word itself: ce, moi, il.
function popupKeys(t) {
  const f = fold(t.surface.replace(/[’ʼ‘]/g, "'").replace(/^-(?:t-)?/, ''));
  return [f, ELIDED[f] ?? f];
}

// The live app dictionary's French spellings and forms (src/data/dictionary/words/cambridge).
async function dictionaryForms() {
  return (await import('../../content/migrate/sources.mjs')).dictionaryForms();
}

// The persons a verb form starts with, each [singular pronouns, plural pronouns], in the order a forms card's two
// columns pair them (scripts/content/concept-examples.mjs): je with nous, tu with vous, il, elle and on with ils and elles.
const PERSONS = [
  [['je', "j'"], ['nous']],
  [['tu'], ['vous']],
  [['il', 'elle', 'on'], ['ils', 'elles']],
];

export default {
  code: 'fr',
  locale: 'fr',
  exampleWord: 'livre',
  fold, norm, tokenize, lenient: restoreElisions,
  buildFormIndex, lookupKey, strictKey, lookupToken, lookupTokenStrict,
  isNativeText: isEnglish, targetIn: frenchIn, targetWordTest: frenchWordTest,
  checkAnswer, dictionaryForms, popupKeys,
  conjugation,
  persons: PERSONS,
  // A concept card's example in the learner's language, not French: English that L would draw with a French play
  // button (concept_example_not_target). Any English-only word, or isEnglish, marks it.
  isNativeExample: (text) => !isFrenchText(text, null, { as: 'quoted' }),
};
