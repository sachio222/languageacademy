// French inflection rules for the word builder (scripts/graph/add-words.mjs): which paradigms a new word takes, and
// the spellings those paradigms do not build. inflect(entry, rulesOf) returns { paradigms, cells }, cells being
// [cell, spelling] pairs; the builder drops any cell the paradigms already build.
//
// Verbs: a verb in -er is regular unless the entry says otherwise. class "ir" is a regular -ir verb like finir,
// class "re" a regular -re verb like attendre, class "double" an -eter or -eler verb that doubles its consonant before
// a silent e (projette, renouvelle). Any other verb needs "like" (the builder copies the model) or its own
// "paradigms" and "forms".
// Nouns: -eau, -au and -eu take x; -al takes -aux; a noun in s, x or z has no plural form; a noun whose entry gives
// its own plural (forms.pl) takes no paradigm.
// Adjectives: the paradigm follows the ending (-e, -al, -eux, -if, -er, -s, -el, -en, -on, -et), else the regular one.
const ER = ['fr:cx:verb.er.present', 'fr:cx:ptcp.er', 'fr:cx:verb.er.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.er.subjunctive', 'fr:cx:prsptcp.er'];
const IR = ['fr:cx:verb.ir.present', 'fr:cx:ptcp.ir', 'fr:cx:verb.ir.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.ir.subjunctive', 'fr:cx:prsptcp.ir'];
const RE = ['fr:cx:verb.re.present', 'fr:cx:ptcp.re', 'fr:cx:verb.re.impf', 'fr:cx:verb.future',
  'fr:cx:verb.conditional', 'fr:cx:verb.re.subjunctive', 'fr:cx:prsptcp.re'];
export const CLASSES = ['ir', 're', 'double'];

function verbParadigms(e) {
  if (e.class === 'ir') return IR;
  if (e.class === 're') return RE;
  if (e.lemma.endsWith('er')) return ER;
  throw new Error(`fr/inflect: the verb ${e.lemma} needs a class (${CLASSES.join(', ')}), a like, or its own paradigms and forms`);
}

function nounParadigms(e) {
  const { lemma } = e;
  if (e.forms?.pl || /[sxz]$/.test(lemma)) return [];
  if (/(eau|au|eu)$/.test(lemma)) return ['fr:cx:noun.plural.x'];
  if (/al$/.test(lemma)) return ['fr:cx:noun.plural.al'];
  return ['fr:cx:noun.plural'];
}

function adjectiveParadigms({ lemma }) {
  if (/e$/.test(lemma)) return ['fr:cx:adj.e'];
  if (/al$/.test(lemma)) return ['fr:cx:adj.al'];
  if (/eux$/.test(lemma)) return ['fr:cx:adj.eux'];
  if (/[iï]f$/.test(lemma)) return ['fr:cx:adj.if'];
  if (/er$/.test(lemma)) return ['fr:cx:adj.er'];
  if (/s$/.test(lemma)) return ['fr:cx:adj.s'];
  if (/(el|en|on|et)$/.test(lemma)) return ['fr:cx:adj.double'];
  return ['fr:cx:adj.regular'];
}

// Spelling changes the plain -er patterns miss: -ger verbs keep a soft g before a and o (corrigeons, mélangeait) and
// -cer verbs write ç there; -yer verbs write i before a silent e (tutoie, tutoiera); a "double" verb doubles its
// consonant there (projette); other e + consonant + er verbs take è there (pèse, pèsera); é + consonants + er verbs
// take è in the singular and third plural of the present and subjunctive (sèche). x is left out of the consonants,
// since e before x takes no accent (je vexe).
const SILENT_E = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$|^(fut|cond)\./;
const SILENT_E_PRESENT = /^(prs|sbjv)\.(1sg|2sg|3sg|3pl)$/;
function spell(e, cell, regular) {
  let base = e.lemma.slice(0, -2);
  const ending = regular.slice(base.length);
  if (/^[ao]/.test(ending) && base.endsWith('g')) base += 'e';
  else if (/^[ao]/.test(ending) && base.endsWith('c')) base = `${base.slice(0, -1)}ç`;
  if (SILENT_E.test(cell)) {
    if (base.endsWith('y')) base = `${base.slice(0, -1)}i`;
    else if (e.class === 'double') base += base.at(-1);
    else if (/e[bcdfghjklmnpqrstvwz]$/.test(base)) base = base.replace(/e([bcdfghjklmnpqrstvwz])$/, 'è$1');
  }
  if (SILENT_E_PRESENT.test(cell) && /é[^aeiouyàâäéèêëîïôöùûü]+u?$/.test(base)) base = base.replace(/é([^aeiouyàâäéèêëîïôöùûü]+u?)$/, 'è$1');
  return base + ending;
}

export function inflect(e, rulesOf) {
  if (e.class !== undefined && !CLASSES.includes(e.class)) throw new Error(`fr/inflect: ${e.lemma} has class ${e.class}, which is not one of ${CLASSES.join(', ')}`);
  if (e.pos === 'noun') return { paradigms: nounParadigms(e), cells: [] };
  if (e.pos === 'adjective') return { paradigms: adjectiveParadigms(e), cells: [] };
  if (e.pos !== 'verb') return { paradigms: [], cells: [] };
  if (e.paradigms) return { paradigms: e.paradigms, cells: [] }; // the entry gives its own paradigms and forms
  const paradigms = verbParadigms(e);
  const cells = [];
  if (paradigms === ER) {
    const seen = new Set();
    for (const pid of paradigms) {
      for (const rule of rulesOf.get(pid) ?? []) {
        // the first rule of a cell that fits the lemma is the one the paradigm uses
        if (seen.has(rule.cell) || !e.lemma.endsWith(rule.strip)) continue;
        seen.add(rule.cell);
        const regular = e.lemma.slice(0, e.lemma.length - rule.strip.length) + rule.add;
        const surface = spell(e, rule.cell, regular);
        if (surface !== regular) cells.push([rule.cell, surface]);
      }
    }
  }
  return { paradigms, cells };
}
