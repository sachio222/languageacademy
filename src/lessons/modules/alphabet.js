/**
 * ALPHABET MODULE
 * French alphabet with pronunciation
 */

export const alphabetModule = {
  id: "alphabet",
  title: "L'Alphabet",
  description:
    "The French alphabet with pronunciation guide - 26 letters with unique French sounds",

  concepts: [
    {
      term: "The French Alphabet",
      definition:
        "French uses the same 26 letters as English, but pronunciation is very different!",
      example:
        "A (ah), B (bay), C (say), D (day), E (euh), F (eff), G (zhay), H (ash), I (ee), J (zhee), K (kah), L (ell), M (emm), N (enn), O (oh), P (pay), Q (koo), R (air), S (ess), T (tay), U (oo), V (vay), W (doo-bluh-vay), X (eex), Y (ee-grek), Z (zed)",
    },
    {
      term: "Accent Aigu (é)",
      definition:
        "The acute accent - appears only on 'e' and makes it sound like 'ay'",
      example: "café, été (summer), déjà",
    },
    {
      term: "Accent Grave (è, à, ù)",
      definition:
        "The grave accent - on 'e' makes it sound like 'eh', on 'a' and 'u' it distinguishes meaning",
      example: "très, où (where), là (there)",
    },
    {
      term: "Accent Circonflexe (â, ê, î, ô, û)",
      definition:
        "The circumflex - can appear on any vowel, often indicates a historical 's' was dropped",
      example: "être (to be), hôtel, pâtes (pasta), île (island)",
    },
    {
      term: "Tréma (ë, ï, ü, ÿ)",
      definition:
        "The diaeresis - indicates two vowels are pronounced separately",
      example: "Noël (Christmas), naïve, maïs (corn)",
    },
    {
      term: "Cédille (ç)",
      definition: "The cedilla - makes 'c' sound like 's' before a, o, u",
      example: "ça, français, garçon (boy)",
    },
    {
      term: "Ligatures (œ, æ)",
      definition: "Two letters merged together - œ is common, æ is rare",
      example: "cœur (heart), sœur (sister), curriculum vitæ",
    },
  ],

  vocabularyReference: [
    { french: "a", english: "A (letter)", note: "pronounced 'ah'" },
    { french: "b", english: "B (letter)", note: "pronounced 'bay'" },
    { french: "c", english: "C (letter)", note: "pronounced 'say'" },
    { french: "d", english: "D (letter)", note: "pronounced 'day'" },
    { french: "e", english: "E (letter)", note: "pronounced 'euh'" },
    { french: "f", english: "F (letter)", note: "pronounced 'eff'" },
    { french: "g", english: "G (letter)", note: "pronounced 'zhay'" },
    { french: "h", english: "H (letter)", note: "pronounced 'ash'" },
    { french: "i", english: "I (letter)", note: "pronounced 'ee'" },
    { french: "j", english: "J (letter)", note: "pronounced 'zhee'" },
    { french: "k", english: "K (letter)", note: "pronounced 'kah'" },
    { french: "l", english: "L (letter)", note: "pronounced 'ell'" },
    { french: "m", english: "M (letter)", note: "pronounced 'emm'" },
    { french: "n", english: "N (letter)", note: "pronounced 'enn'" },
    { french: "o", english: "O (letter)", note: "pronounced 'oh'" },
    { french: "p", english: "P (letter)", note: "pronounced 'pay'" },
    { french: "q", english: "Q (letter)", note: "pronounced 'koo'" },
    { french: "r", english: "R (letter)", note: "pronounced 'air'" },
    { french: "s", english: "S (letter)", note: "pronounced 'ess'" },
    { french: "t", english: "T (letter)", note: "pronounced 'tay'" },
    { french: "u", english: "U (letter)", note: "pronounced 'oo'" },
    { french: "v", english: "V (letter)", note: "pronounced 'vay'" },
    { french: "w", english: "W (letter)", note: "pronounced 'doo-bluh-vay'" },
    { french: "x", english: "X (letter)", note: "pronounced 'eex'" },
    { french: "y", english: "Y (letter)", note: "pronounced 'ee-grek'" },
    { french: "z", english: "Z (letter)", note: "pronounced 'zed'" },
    { french: "l'alphabet", english: "the alphabet", note: "masculine" },
    { french: "une lettre", english: "a letter", note: "feminine" },
    { french: "un accent", english: "an accent", note: "masculine" },
    {
      french: "une voyelle",
      english: "a vowel",
      note: "feminine - a, e, i, o, u, y",
    },
    {
      french: "une consonne",
      english: "a consonant",
      note: "feminine - all other letters",
    },
    { french: "épeler", english: "to spell", note: "verb" },
    {
      french: "Comment ça s'écrit?",
      english: "How do you write that?",
      note: "useful phrase",
    },
  ],

  exercises: [],
};
