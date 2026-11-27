// Reading pop-ups (content spec 5.7): the distinct passage words a learner can tap and get nothing. A word has a pop-up
// when the app dictionary has it (dictionaryForms, folded spellings and forms), the reading's glossary, glosses or
// vocabulary table holds it, or names.json lists it (capitalised words count as names only when listed). The
// language says how a token is looked up (popupKeys: its key, and its base when elided, French l' for le).
export function wordsWithoutPopup(mod, { lang, dictionaryForms = new Set(), names = new Set() }) {
  const isStr = (v) => typeof v === 'string' && v.trim() !== '';
  const covered = new Set();
  // A gloss (a form of a known word, L c3da2c0) opens the same pop-up as a glossary row.
  for (const row of [...(mod.glossary || []), ...(mod.glosses || []), ...(mod.vocabulary || [])]) {
    for (const t of lang.tokenize(row.fr)) covered.add(lang.popupKeys(t)[0]);
  }
  const missing = new Map();
  for (const b of mod.passage || []) {
    if (!isStr(b.fr)) continue;
    for (const t of lang.tokenize(b.fr.replace(/\*/g, ''))) {
      const [f, base] = lang.popupKeys(t);
      if (covered.has(f) || dictionaryForms.has(f) || dictionaryForms.has(base) || names.has(f)) continue;
      if (!missing.has(f)) missing.set(f, t.surface);
    }
  }
  return [...missing.values()];
}
