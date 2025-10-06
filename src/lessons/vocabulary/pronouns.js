/**
 * Pronouns - Subject, Object, and Stressed pronouns
 */

// Subject Pronouns
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
  on: {
    french: "on",
    english: "we / one / people",
    englishFull: "we (informal) / one (impersonal) / people (general)",
    type: "singular",
    person: "third",
    note: "⭐ Uses il/elle verb forms! More common than 'nous'!",
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

// Stressed Pronouns - Used after prepositions
export const stressedPronouns = {
  moi: {
    french: "moi",
    english: "me",
    englishFull: "me (stressed)",
    type: "stressed pronoun",
    person: "first singular",
    example: "avec moi, pour moi",
    note: "use after prepositions",
  },
  toi: {
    french: "toi",
    english: "you",
    englishFull: "you (stressed)",
    type: "stressed pronoun",
    person: "second singular",
    example: "avec toi, pour toi",
    note: "informal",
  },
  lui: {
    french: "lui",
    english: "him",
    englishFull: "him (stressed)",
    type: "stressed pronoun",
    person: "third singular",
    gender: "masculine",
    example: "avec lui, pour lui",
    note: "masculine",
  },
  elle: {
    french: "elle",
    english: "her",
    englishFull: "her (stressed)",
    type: "stressed pronoun",
    person: "third singular",
    gender: "feminine",
    example: "avec elle, pour elle",
    note: "feminine",
  },
  nous: {
    french: "nous",
    english: "us",
    englishFull: "us (stressed)",
    type: "stressed pronoun",
    person: "first plural",
    example: "avec nous, pour nous",
    note: "same as subject pronoun",
  },
  vous: {
    french: "vous",
    english: "you",
    englishFull: "you (stressed)",
    type: "stressed pronoun",
    person: "second plural",
    example: "avec vous, pour vous",
    note: "formal/plural",
  },
  eux: {
    french: "eux",
    english: "them",
    englishFull: "them (stressed masculine)",
    type: "stressed pronoun",
    person: "third plural",
    gender: "masculine",
    example: "avec eux, pour eux",
    note: "masculine or mixed",
  },
  elles: {
    french: "elles",
    english: "them",
    englishFull: "them (stressed feminine)",
    type: "stressed pronoun",
    person: "third plural",
    gender: "feminine",
    example: "avec elles, pour elles",
    note: "all feminine",
  },
};

