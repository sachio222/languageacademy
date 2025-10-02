/**
 * Core vocabulary data - Easy to maintain and extend
 * Each entry defines a word/phrase with common wrong answers
 */

// Pronouns
export const pronouns = {
  je: {
    french: "je",
    english: "I",
    englishFull: "I", // no ambiguity
    type: "singular",
    person: "first",
  },
  tu: {
    french: "tu",
    english: "you (informal)",
    englishFull: "you (informal - friends/family)",
    type: "singular",
    person: "second",
    note: "Use with friends/family",
  },
  il: {
    french: "il",
    english: "he",
    englishFull: "he", // no ambiguity
    type: "singular",
    person: "third",
    gender: "masculine",
  },
  elle: {
    french: "elle",
    english: "she",
    englishFull: "she", // no ambiguity
    type: "singular",
    person: "third",
    gender: "feminine",
  },
  nous: {
    french: "nous",
    english: "we",
    englishFull: "we", // no ambiguity
    type: "plural",
    person: "first",
  },
  vous: {
    french: "vous",
    english: "you (formal/plural)",
    englishFull: "you (formal or plural - strangers/groups)",
    type: "plural",
    person: "second",
    note: "Use with strangers/bosses",
  },
  ils: {
    french: "ils",
    english: "they (masculine)",
    englishFull: "they (masculine or mixed group)",
    type: "plural",
    person: "third",
    gender: "masculine",
    note: "masculine or mixed group",
  },
  elles: {
    french: "elles",
    english: "they (feminine)",
    englishFull: "they (all feminine group)",
    type: "plural",
    person: "third",
    gender: "feminine",
    note: "all feminine group",
  },
};

// Verb être (to be) conjugations
export const etreConjugations = {
  je: {
    pronoun: "je",
    conjugation: "suis",
    combined: "je suis",
    english: "I am",
    englishFull: "I am", // no ambiguity
  },
  tu: {
    pronoun: "tu",
    conjugation: "es",
    combined: "tu es",
    english: "you are (informal)",
    englishFull: "you are (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "est",
    combined: "il est",
    english: "he is",
    englishFull: "he is", // no ambiguity
  },
  elle: {
    pronoun: "elle",
    conjugation: "est",
    combined: "elle est",
    english: "she is",
    englishFull: "she is", // no ambiguity
  },
  nous: {
    pronoun: "nous",
    conjugation: "sommes",
    combined: "nous sommes",
    english: "we are",
    englishFull: "we are", // no ambiguity
  },
  vous: {
    pronoun: "vous",
    conjugation: "êtes",
    combined: "vous êtes",
    english: "you are (formal/plural)",
    englishFull: "you are (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "sont",
    combined: "ils sont",
    english: "they are (masculine)",
    englishFull: "they are (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "sont",
    combined: "elles sont",
    english: "they are (feminine)",
    englishFull: "they are (all feminine)",
  },
};

// Verb avoir (to have) conjugations
export const avoirConjugations = {
  je: {
    pronoun: "je",
    conjugation: "ai",
    combined: "j'ai",
    english: "I have",
    englishFull: "I have", // no ambiguity
    note: "j' before vowel",
  },
  tu: {
    pronoun: "tu",
    conjugation: "as",
    combined: "tu as",
    english: "you have (informal)",
    englishFull: "you have (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "a",
    combined: "il a",
    english: "he has",
    englishFull: "he has", // no ambiguity
  },
  elle: {
    pronoun: "elle",
    conjugation: "a",
    combined: "elle a",
    english: "she has",
    englishFull: "she has", // no ambiguity
  },
  nous: {
    pronoun: "nous",
    conjugation: "avons",
    combined: "nous avons",
    english: "we have",
    englishFull: "we have", // no ambiguity
  },
  vous: {
    pronoun: "vous",
    conjugation: "avez",
    combined: "vous avez",
    english: "you have (formal/plural)",
    englishFull: "you have (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "ont",
    combined: "ils ont",
    english: "they have (masculine)",
    englishFull: "they have (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "ont",
    combined: "elles ont",
    english: "they have (feminine)",
    englishFull: "they have (all feminine)",
  },
};

// Verb vouloir (to want) conjugations
export const vouloirConjugations = {
  je: {
    pronoun: "je",
    conjugation: "veux",
    combined: "je veux",
    english: "I want",
    englishFull: "I want",
  },
  tu: {
    pronoun: "tu",
    conjugation: "veux",
    combined: "tu veux",
    english: "you want (informal)",
    englishFull: "you want (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "veut",
    combined: "il veut",
    english: "he wants",
    englishFull: "he wants",
  },
  elle: {
    pronoun: "elle",
    conjugation: "veut",
    combined: "elle veut",
    english: "she wants",
    englishFull: "she wants",
  },
  nous: {
    pronoun: "nous",
    conjugation: "voulons",
    combined: "nous voulons",
    english: "we want",
    englishFull: "we want",
  },
  vous: {
    pronoun: "vous",
    conjugation: "voulez",
    combined: "vous voulez",
    english: "you want (formal/plural)",
    englishFull: "you want (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "veulent",
    combined: "ils veulent",
    english: "they want (masculine)",
    englishFull: "they want (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "veulent",
    combined: "elles veulent",
    english: "they want (feminine)",
    englishFull: "they want (all feminine)",
  },
};

// Verb pouvoir (can) conjugations
export const pouvoirConjugations = {
  je: {
    pronoun: "je",
    conjugation: "peux",
    combined: "je peux",
    english: "I can",
    englishFull: "I can",
  },
  tu: {
    pronoun: "tu",
    conjugation: "peux",
    combined: "tu peux",
    english: "you can (informal)",
    englishFull: "you can (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "peut",
    combined: "il peut",
    english: "he can",
    englishFull: "he can",
  },
  elle: {
    pronoun: "elle",
    conjugation: "peut",
    combined: "elle peut",
    english: "she can",
    englishFull: "she can",
  },
  nous: {
    pronoun: "nous",
    conjugation: "pouvons",
    combined: "nous pouvons",
    english: "we can",
    englishFull: "we can",
  },
  vous: {
    pronoun: "vous",
    conjugation: "pouvez",
    combined: "vous pouvez",
    english: "you can (formal/plural)",
    englishFull: "you can (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "peuvent",
    combined: "ils peuvent",
    english: "they can (masculine)",
    englishFull: "they can (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "peuvent",
    combined: "elles peuvent",
    english: "they can (feminine)",
    englishFull: "they can (all feminine)",
  },
};

// Question words and common phrases
export const questionWords = {
  que: { french: "que", english: "what", variant: "quoi" },
  qui: { french: "qui", english: "who" },
  ou: { french: "où", english: "where", note: "with accent" },
  quand: { french: "quand", english: "when" },
  comment: { french: "comment", english: "how" },
  pourquoi: { french: "pourquoi", english: "why" },
};

export const commonPhrases = {
  questCeQueCest: {
    french: "qu'est-ce que c'est",
    english: "what is it",
    simplified: "quest-ce que cest",
  },
  commentCaVa: {
    french: "comment ça va",
    english: "how are you / how's it going",
    simplified: "comment ca va",
  },
  ouEstCe: {
    french: "où est-ce",
    english: "where is it",
    simplified: "ou est-ce",
  },
};

/**
 * Helper to generate wrong answer feedback
 */
// Demonstratives - "it, that, this, these, those"
export const demonstratives = {
  ce: {
    french: "ce",
    english: "this/that (masc + consonant)",
    englishFull: "this/that (masculine, before consonant sound)",
    type: "demonstrative",
    gender: "masculine",
    note: "before consonant sounds: b, c, d, f, g, k, etc.",
  },
  cet: {
    french: "cet",
    english: "this/that (masc + vowel)",
    englishFull: "this/that (masculine, before vowel sound)",
    type: "demonstrative",
    gender: "masculine",
    note: "before vowel sounds: a, e, i, o, u, silent h",
  },
  cette: {
    french: "cette",
    english: "this/that (feminine)",
    englishFull: "this/that (feminine)",
    type: "demonstrative",
    gender: "feminine",
    note: "feminine nouns",
  },
  ces: {
    french: "ces",
    english: "these/those",
    englishFull: "these/those (plural)",
    type: "demonstrative",
    gender: "plural",
    note: "plural",
  },
  ca: {
    french: "ça",
    english: "that/it (informal)",
    englishFull: "that/it (informal - most common!)",
    type: "demonstrative",
    note: "informal, very common",
  },
  ceci: {
    french: "ceci",
    english: "this (formal)",
    englishFull: "this (formal)",
    type: "demonstrative",
    note: "formal",
  },
  cela: {
    french: "cela",
    english: "that (formal)",
    englishFull: "that (formal)",
    type: "demonstrative",
    note: "formal",
  },
};

// Object pronouns - "me, you, him, her, it, us, them"
export const objectPronouns = {
  me: {
    french: "me",
    english: "me",
    englishFull: "me", // no ambiguity
    type: "object",
    person: "first",
    number: "singular",
  },
  te: {
    french: "te",
    english: "you (informal)",
    englishFull: "you (informal)",
    type: "object",
    person: "second",
    number: "singular",
  },
  le: {
    french: "le",
    english: "him/it (masculine)",
    englishFull: "him/it (masculine)",
    type: "object",
    person: "third",
    number: "singular",
    gender: "masculine",
  },
  la: {
    french: "la",
    english: "her/it (feminine)",
    englishFull: "her/it (feminine)",
    type: "object",
    person: "third",
    number: "singular",
    gender: "feminine",
  },
  nous_obj: {
    french: "nous",
    english: "us",
    englishFull: "us", // no ambiguity
    type: "object",
    person: "first",
    number: "plural",
  },
  vous_obj: {
    french: "vous",
    english: "you (formal/plural)",
    englishFull: "you (formal or plural)",
    type: "object",
    person: "second",
    number: "plural",
  },
  les: {
    french: "les",
    english: "them",
    englishFull: "them", // no ambiguity
    type: "object",
    person: "third",
    number: "plural",
  },
};

// Possessive adjectives - "my, your, his, her, our, their"
export const possessiveAdjectives = {
  mon: {
    french: "mon",
    english: "my (masculine)",
    englishFull: "my (masculine, like 'mon livre')",
    type: "possessive",
    owner: "je",
    gender: "masculine",
    number: "singular",
  },
  ma: {
    french: "ma",
    english: "my (feminine)",
    englishFull: "my (feminine, like 'ma maison')",
    type: "possessive",
    owner: "je",
    gender: "feminine",
    number: "singular",
  },
  mes: {
    french: "mes",
    english: "my (plural)",
    englishFull: "my (plural, like 'mes livres')",
    type: "possessive",
    owner: "je",
    number: "plural",
  },
  ton: {
    french: "ton",
    english: "your (masc, informal)",
    englishFull: "your (informal, masculine like 'ton chat')",
    type: "possessive",
    owner: "tu",
    gender: "masculine",
    number: "singular",
  },
  ta: {
    french: "ta",
    english: "your (fem, informal)",
    englishFull: "your (informal, feminine like 'ta voiture')",
    type: "possessive",
    owner: "tu",
    gender: "feminine",
    number: "singular",
  },
  tes: {
    french: "tes",
    english: "your (plural, informal)",
    englishFull: "your (informal, plural like 'tes amis')",
    type: "possessive",
    owner: "tu",
    number: "plural",
  },
  son: {
    french: "son",
    english: "his/her (masculine)",
    englishFull: "his/her (masculine, like 'son livre')",
    type: "possessive",
    owner: "il/elle",
    gender: "masculine",
    number: "singular",
  },
  sa: {
    french: "sa",
    english: "his/her (feminine)",
    englishFull: "his/her (feminine, like 'sa maison')",
    type: "possessive",
    owner: "il/elle",
    gender: "feminine",
    number: "singular",
  },
  ses: {
    french: "ses",
    english: "his/her (plural)",
    englishFull: "his/her (plural, like 'ses chats')",
    type: "possessive",
    owner: "il/elle",
    number: "plural",
  },
  notre: {
    french: "notre",
    english: "our (singular)",
    englishFull: "our (singular, like 'notre maison')",
    type: "possessive",
    owner: "nous",
    number: "singular",
  },
  nos: {
    french: "nos",
    english: "our (plural)",
    englishFull: "our (plural, like 'nos chats')",
    type: "possessive",
    owner: "nous",
    number: "plural",
  },
  votre: {
    french: "votre",
    english: "your (formal, singular)",
    englishFull: "your (formal, singular like 'votre livre')",
    type: "possessive",
    owner: "vous",
    number: "singular",
  },
  vos: {
    french: "vos",
    english: "your (formal, plural)",
    englishFull: "your (formal, plural like 'vos livres')",
    type: "possessive",
    owner: "vous",
    number: "plural",
  },
  leur: {
    french: "leur",
    english: "their (singular)",
    englishFull: "their (singular, like 'leur chat')",
    type: "possessive",
    owner: "ils/elles",
    number: "singular",
  },
  leurs: {
    french: "leurs",
    english: "their (plural)",
    englishFull: "their (plural, like 'leurs chats')",
    type: "possessive",
    owner: "ils/elles",
    number: "plural",
  },
};

// Possessive pronouns - "mine, yours, his, hers, ours, theirs"
export const possessivePronouns = {
  le_mien: {
    french: "le mien",
    english: "mine (masculine)",
    englishFull: "mine (masculine thing)",
    type: "possessive_pronoun",
    owner: "je",
    gender: "masculine",
  },
  la_mienne: {
    french: "la mienne",
    english: "mine (feminine)",
    englishFull: "mine (feminine thing)",
    type: "possessive_pronoun",
    owner: "je",
    gender: "feminine",
  },
  le_tien: {
    french: "le tien",
    english: "yours (masc, informal)",
    englishFull: "yours (informal, masculine thing)",
    type: "possessive_pronoun",
    owner: "tu",
    gender: "masculine",
  },
  la_tienne: {
    french: "la tienne",
    english: "yours (fem, informal)",
    englishFull: "yours (informal, feminine thing)",
    type: "possessive_pronoun",
    owner: "tu",
    gender: "feminine",
  },
  le_sien: {
    french: "le sien",
    english: "his/hers (masculine)",
    englishFull: "his/hers (masculine thing)",
    type: "possessive_pronoun",
    owner: "il/elle",
    gender: "masculine",
  },
  la_sienne: {
    french: "la sienne",
    english: "his/hers (feminine)",
    englishFull: "his/hers (feminine thing)",
    type: "possessive_pronoun",
    owner: "il/elle",
    gender: "feminine",
  },
  le_notre: {
    french: "le nôtre",
    english: "ours (masculine)",
    englishFull: "ours (masculine thing)",
    type: "possessive_pronoun",
    owner: "nous",
    gender: "masculine",
  },
  la_notre: {
    french: "la nôtre",
    english: "ours (feminine)",
    englishFull: "ours (feminine thing)",
    type: "possessive_pronoun",
    owner: "nous",
    gender: "feminine",
  },
  le_votre: {
    french: "le vôtre",
    english: "yours (formal, masculine)",
    englishFull: "yours (formal, masculine thing)",
    type: "possessive_pronoun",
    owner: "vous",
    gender: "masculine",
  },
  la_votre: {
    french: "la vôtre",
    english: "yours (formal, feminine)",
    englishFull: "yours (formal, feminine thing)",
    type: "possessive_pronoun",
    owner: "vous",
    gender: "feminine",
  },
  le_leur: {
    french: "le leur",
    english: "theirs (masculine)",
    englishFull: "theirs (masculine thing)",
    type: "possessive_pronoun",
    owner: "ils/elles",
    gender: "masculine",
  },
  la_leur: {
    french: "la leur",
    english: "theirs (feminine)",
    englishFull: "theirs (feminine thing)",
    type: "possessive_pronoun",
    owner: "ils/elles",
    gender: "feminine",
  },
};

// Common Nouns - Essential vocabulary from top 100 words
export const commonNouns = {
  livre: {
    french: "livre",
    english: "book",
    englishFull: "book",
    gender: "masculine",
    article: "un livre / le livre",
  },
  chat: {
    french: "chat",
    english: "cat (masculine)",
    englishFull: "cat (male)",
    gender: "masculine",
    article: "un chat / le chat",
  },
  chatte: {
    french: "chatte",
    english: "cat (feminine)",
    englishFull: "cat (female)",
    gender: "feminine",
    article: "une chatte / la chatte",
  },
  chien: {
    french: "chien",
    english: "dog (masculine)",
    englishFull: "dog (male)",
    gender: "masculine",
    article: "un chien / le chien",
  },
  chienne: {
    french: "chienne",
    english: "dog (feminine)",
    englishFull: "dog (female)",
    gender: "feminine",
    article: "une chienne / la chienne",
  },
  maison: {
    french: "maison",
    english: "house",
    englishFull: "house",
    gender: "feminine",
    article: "une maison / la maison",
  },
  voiture: {
    french: "voiture",
    english: "car",
    englishFull: "car",
    gender: "feminine",
    article: "une voiture / la voiture",
  },
  ami: {
    french: "ami",
    english: "friend (masculine)",
    englishFull: "friend (masculine)",
    gender: "masculine",
    article: "un ami / l'ami",
  },
  amie: {
    french: "amie",
    english: "friend (feminine)",
    englishFull: "friend (feminine)",
    gender: "feminine",
    article: "une amie / l'amie",
  },
  homme: {
    french: "homme",
    english: "man",
    englishFull: "man",
    gender: "masculine",
    article: "un homme / l'homme",
    note: "silent h",
  },
  femme: {
    french: "femme",
    english: "woman",
    englishFull: "woman",
    gender: "feminine",
    article: "une femme / la femme",
  },
  enfant: {
    french: "enfant",
    english: "child",
    englishFull: "child",
    gender: "masculine/feminine",
    article: "un enfant / une enfant",
    note: "same word both genders",
  },
  chose: {
    french: "chose",
    english: "thing",
    englishFull: "thing",
    gender: "feminine",
    article: "une chose / la chose",
  },
  jour: {
    french: "jour",
    english: "day",
    englishFull: "day",
    gender: "masculine",
    article: "un jour / le jour",
  },
};

export function getWrongAnswerHint(correctAnswer, userAnswer, category) {
  // For pronouns
  if (category === "pronoun" && pronouns[userAnswer]) {
    const wrongPronoun = pronouns[userAnswer];
    return `That's "${wrongPronoun.english}", not "${pronouns[correctAnswer]?.english}"`;
  }

  // For conjugations
  if (category === "conjugation") {
    return `Check your conjugation - the answer should be "${correctAnswer}"`;
  }

  return `Incorrect - expected "${correctAnswer}"`;
}
