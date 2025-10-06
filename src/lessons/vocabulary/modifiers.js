/**
 * Modifiers - Negation patterns and comparison words
 */

// Negation Patterns
export const negationPatterns = {
  nePas: {
    french: "ne...pas",
    english: "not",
    englishFull: "not (negation)",
    type: "negation",
    example: "je ne veux pas",
    note: "basic negation, surrounds verb",
  },
  neJamais: {
    french: "ne...jamais",
    english: "never",
    englishFull: "never (negation)",
    type: "negation",
    example: "je ne vais jamais là-bas",
    note: "replaces 'pas' with 'jamais'",
  },
  nePlus: {
    french: "ne...plus",
    english: "no more/no longer",
    englishFull: "no more / no longer",
    type: "negation",
    example: "je ne veux plus",
    note: "cessation of action",
  },
};

// Comparison Words & Intensity
export const comparisonWords = {
  plus: {
    french: "plus",
    english: "more",
    type: "comparison",
    example: "plus grand (bigger)",
    note: "used with adjectives for comparisons",
  },
  moins: {
    french: "moins",
    english: "less",
    type: "comparison",
    example: "moins cher (less expensive)",
    note: "opposite of 'plus'",
  },
  meilleur: {
    french: "meilleur",
    english: "better (masculine)",
    femForm: "meilleure",
    type: "comparison",
    example: "un meilleur livre / une meilleure maison",
    note: "adjective - agrees with gender",
  },
  leMeilleur: {
    french: "le meilleur",
    english: "the best (masculine)",
    femForm: "la meilleure",
    type: "superlative",
    example: "le meilleur livre / la meilleure maison",
    note: "superlative with article",
  },
  pire: {
    french: "pire",
    english: "worse",
    type: "comparison",
    example: "c'est pire (it's worse)",
    note: "same form both genders",
  },
  laPire: {
    french: "le/la pire",
    english: "the worst",
    type: "superlative",
    example: "la pire chose (the worst thing)",
    note: "superlative with article",
  },
  trop: {
    french: "trop",
    english: "too much / too",
    type: "intensity",
    example: "c'est trop cher (it's too expensive)",
    note: "intensity modifier",
  },
  tout: {
    french: "tout",
    english: "all / everything",
    femForm: "toute",
    pluralMasc: "tous",
    pluralFem: "toutes",
    type: "quantifier",
    example: "tout le monde (everyone), je veux tout (I want everything)",
    note: "agrees with noun",
  },
  meme: {
    french: "même",
    english: "same / even",
    type: "comparison",
    example: "le même livre (the same book), même toi (even you)",
    note: "comparison and emphasis",
  },
  mal: {
    french: "mal",
    english: "badly / bad",
    type: "adverb",
    example: "il parle mal (he speaks badly)",
    note: "opposite of 'bien'",
  },
};

