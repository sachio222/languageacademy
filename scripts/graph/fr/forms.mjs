// French reading of forms: the shared form index (../forms.mjs) with the French lemma and token rules.
import { fold, norm } from './tokenize.mjs';
import { makeForms } from '../forms.mjs';

// Reflexive lemmas ("se lever", "s'appeler"): paradigms apply to the verb part.
const REFLEXIVE_RE = /^(?:se |s['’])(.+)$/i;

// Strip a leading hyphen and a euphonic "t-" (-t-il).
function stripClitic(f) {
  if (f.startsWith('-')) {
    f = f.slice(1);
    if (f.startsWith('t-')) f = f.slice(2);
  }
  return f;
}

export const { buildFormIndex, lookupKey, strictKey, lookupToken, lookupTokenStrict } = makeForms({
  fold, norm, lemmaBase: (lemma) => REFLEXIVE_RE.exec(lemma)?.[1] ?? null, cutKey: stripClitic,
});
