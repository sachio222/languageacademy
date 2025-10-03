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

// Verb faire (to do/make) conjugations
export const faireConjugations = {
  je: {
    pronoun: "je",
    conjugation: "fais",
    combined: "je fais",
    english: "I do/make",
    englishFull: "I do / I make / I am doing",
  },
  tu: {
    pronoun: "tu",
    conjugation: "fais",
    combined: "tu fais",
    english: "you do/make (informal)",
    englishFull: "you do / you make (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "fait",
    combined: "il fait",
    english: "he does/makes",
    englishFull: "he does / he makes",
  },
  elle: {
    pronoun: "elle",
    conjugation: "fait",
    combined: "elle fait",
    english: "she does/makes",
    englishFull: "she does / she makes",
  },
  nous: {
    pronoun: "nous",
    conjugation: "faisons",
    combined: "nous faisons",
    english: "we do/make",
    englishFull: "we do / we make",
  },
  vous: {
    pronoun: "vous",
    conjugation: "faites",
    combined: "vous faites",
    english: "you do/make (formal/plural)",
    englishFull: "you do / you make (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "font",
    combined: "ils font",
    english: "they do/make (masculine)",
    englishFull: "they do / they make (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "font",
    combined: "elles font",
    english: "they do/make (feminine)",
    englishFull: "they do / they make (all feminine)",
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

// Verb aller (to go) conjugations
export const allerConjugations = {
  je: {
    pronoun: "je",
    conjugation: "vais",
    combined: "je vais",
    english: "I go",
    englishFull: "I go / I am going",
  },
  tu: {
    pronoun: "tu",
    conjugation: "vas",
    combined: "tu vas",
    english: "you go (informal)",
    englishFull: "you go / you are going (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "va",
    combined: "il va",
    english: "he goes",
    englishFull: "he goes / he is going",
  },
  elle: {
    pronoun: "elle",
    conjugation: "va",
    combined: "elle va",
    english: "she goes",
    englishFull: "she goes / she is going",
  },
  nous: {
    pronoun: "nous",
    conjugation: "allons",
    combined: "nous allons",
    english: "we go",
    englishFull: "we go / we are going",
  },
  vous: {
    pronoun: "vous",
    conjugation: "allez",
    combined: "vous allez",
    english: "you go (formal/plural)",
    englishFull: "you go / you are going (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "vont",
    combined: "ils vont",
    english: "they go (masculine)",
    englishFull: "they go / they are going (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "vont",
    combined: "elles vont",
    english: "they go (feminine)",
    englishFull: "they go / they are going (all feminine)",
  },
};

// Verb venir (to come) conjugations
export const venirConjugations = {
  je: {
    pronoun: "je",
    conjugation: "viens",
    combined: "je viens",
    english: "I come",
    englishFull: "I come / I am coming",
  },
  tu: {
    pronoun: "tu",
    conjugation: "viens",
    combined: "tu viens",
    english: "you come (informal)",
    englishFull: "you come / you are coming (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "vient",
    combined: "il vient",
    english: "he comes",
    englishFull: "he comes / he is coming",
  },
  elle: {
    pronoun: "elle",
    conjugation: "vient",
    combined: "elle vient",
    english: "she comes",
    englishFull: "she comes / she is coming",
  },
  nous: {
    pronoun: "nous",
    conjugation: "venons",
    combined: "nous venons",
    english: "we come",
    englishFull: "we come / we are coming",
  },
  vous: {
    pronoun: "vous",
    conjugation: "venez",
    combined: "vous venez",
    english: "you come (formal/plural)",
    englishFull: "you come / you are coming (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "viennent",
    combined: "ils viennent",
    english: "they come (masculine)",
    englishFull: "they come / they are coming (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "viennent",
    combined: "elles viennent",
    english: "they come (feminine)",
    englishFull: "they come / they are coming (all feminine)",
  },
};

// Verb partir (to leave) conjugations
export const partirConjugations = {
  je: {
    pronoun: "je",
    conjugation: "pars",
    combined: "je pars",
    english: "I leave",
    englishFull: "I leave / I am leaving",
  },
  tu: {
    pronoun: "tu",
    conjugation: "pars",
    combined: "tu pars",
    english: "you leave (informal)",
    englishFull: "you leave / you are leaving (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "part",
    combined: "il part",
    english: "he leaves",
    englishFull: "he leaves / he is leaving",
  },
  elle: {
    pronoun: "elle",
    conjugation: "part",
    combined: "elle part",
    english: "she leaves",
    englishFull: "she leaves / she is leaving",
  },
  nous: {
    pronoun: "nous",
    conjugation: "partons",
    combined: "nous partons",
    english: "we leave",
    englishFull: "we leave / we are leaving",
  },
  vous: {
    pronoun: "vous",
    conjugation: "partez",
    combined: "vous partez",
    english: "you leave (formal/plural)",
    englishFull: "you leave / you are leaving (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "partent",
    combined: "ils partent",
    english: "they leave (masculine)",
    englishFull: "they leave / they are leaving (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "partent",
    combined: "elles partent",
    english: "they leave (feminine)",
    englishFull: "they leave / they are leaving (all feminine)",
  },
};

// Verb arriver (to arrive) conjugations
export const arriverConjugations = {
  je: {
    pronoun: "je",
    conjugation: "arrive",
    combined: "j'arrive",
    english: "I arrive",
    englishFull: "I arrive / I am arriving",
    note: "j' before vowel",
  },
  tu: {
    pronoun: "tu",
    conjugation: "arrives",
    combined: "tu arrives",
    english: "you arrive (informal)",
    englishFull: "you arrive / you are arriving (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "arrive",
    combined: "il arrive",
    english: "he arrives",
    englishFull: "he arrives / he is arriving",
  },
  elle: {
    pronoun: "elle",
    conjugation: "arrive",
    combined: "elle arrive",
    english: "she arrives",
    englishFull: "she arrives / she is arriving",
  },
  nous: {
    pronoun: "nous",
    conjugation: "arrivons",
    combined: "nous arrivons",
    english: "we arrive",
    englishFull: "we arrive / we are arriving",
  },
  vous: {
    pronoun: "vous",
    conjugation: "arrivez",
    combined: "vous arrivez",
    english: "you arrive (formal/plural)",
    englishFull: "you arrive / you are arriving (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "arrivent",
    combined: "ils arrivent",
    english: "they arrive (masculine)",
    englishFull: "they arrive / they are arriving (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "arrivent",
    combined: "elles arrivent",
    english: "they arrive (feminine)",
    englishFull: "they arrive / they are arriving (all feminine)",
  },
};

// Verb rester (to stay) conjugations
export const resterConjugations = {
  je: {
    pronoun: "je",
    conjugation: "reste",
    combined: "je reste",
    english: "I stay",
    englishFull: "I stay / I am staying",
  },
  tu: {
    pronoun: "tu",
    conjugation: "restes",
    combined: "tu restes",
    english: "you stay (informal)",
    englishFull: "you stay / you are staying (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "reste",
    combined: "il reste",
    english: "he stays",
    englishFull: "he stays / he is staying",
  },
  elle: {
    pronoun: "elle",
    conjugation: "reste",
    combined: "elle reste",
    english: "she stays",
    englishFull: "she stays / she is staying",
  },
  nous: {
    pronoun: "nous",
    conjugation: "restons",
    combined: "nous restons",
    english: "we stay",
    englishFull: "we stay / we are staying",
  },
  vous: {
    pronoun: "vous",
    conjugation: "restez",
    combined: "vous restez",
    english: "you stay (formal/plural)",
    englishFull: "you stay / you are staying (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "restent",
    combined: "ils restent",
    english: "they stay (masculine)",
    englishFull: "they stay / they are staying (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "restent",
    combined: "elles restent",
    english: "they stay (feminine)",
    englishFull: "they stay / they are staying (all feminine)",
  },
};

// Verb voir (to see) conjugations
export const voirConjugations = {
  je: {
    pronoun: "je",
    conjugation: "vois",
    combined: "je vois",
    english: "I see",
    englishFull: "I see / I am seeing",
  },
  tu: {
    pronoun: "tu",
    conjugation: "vois",
    combined: "tu vois",
    english: "you see (informal)",
    englishFull: "you see / you are seeing (informal)",
  },
  il: {
    pronoun: "il",
    conjugation: "voit",
    combined: "il voit",
    english: "he sees",
    englishFull: "he sees / he is seeing",
  },
  elle: {
    pronoun: "elle",
    conjugation: "voit",
    combined: "elle voit",
    english: "she sees",
    englishFull: "she sees / she is seeing",
  },
  nous: {
    pronoun: "nous",
    conjugation: "voyons",
    combined: "nous voyons",
    english: "we see",
    englishFull: "we see / we are seeing",
  },
  vous: {
    pronoun: "vous",
    conjugation: "voyez",
    combined: "vous voyez",
    english: "you see (formal/plural)",
    englishFull: "you see / you are seeing (formal or plural)",
  },
  ils: {
    pronoun: "ils",
    conjugation: "voient",
    combined: "ils voient",
    english: "they see (masculine)",
    englishFull: "they see / they are seeing (masculine or mixed)",
  },
  elles: {
    pronoun: "elles",
    conjugation: "voient",
    combined: "elles voient",
    english: "they see (feminine)",
    englishFull: "they see / they are seeing (all feminine)",
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

// Common Adjectives - Essential descriptive words from top 100
export const commonAdjectives = {
  bon: {
    french: "bon",
    englishMasc: "good (masculine)",
    englishFem: "good (feminine)",
    femForm: "bonne",
    example: "un bon livre / une bonne maison",
    note: "very common, doubles n in feminine",
  },
  grand: {
    french: "grand",
    englishMasc: "big/tall (masculine)",
    englishFem: "big/tall (feminine)",
    femForm: "grande",
    example: "un grand homme / une grande femme",
    note: "can mean big or tall",
  },
  petit: {
    french: "petit",
    englishMasc: "small (masculine)",
    englishFem: "small (feminine)",
    femForm: "petite",
    example: "un petit chat / une petite maison",
    note: "very common",
  },
  nouveau: {
    french: "nouveau",
    englishMasc: "new (masculine)",
    englishFem: "new (feminine)",
    femForm: "nouvelle",
    example: "un nouveau livre / une nouvelle voiture",
    note: "irregular feminine form",
  },
  vieux: {
    french: "vieux",
    englishMasc: "old (masculine)",
    englishFem: "old (feminine)",
    femForm: "vieille",
    example: "un vieux chat / une vieille maison",
    note: "irregular feminine form",
  },
  jeune: {
    french: "jeune",
    englishMasc: "young",
    englishFem: "young",
    femForm: "jeune",
    example: "un jeune homme / une jeune femme",
    note: "same form both genders",
  },
  beau: {
    french: "beau",
    englishMasc: "beautiful (masculine)",
    englishFem: "beautiful (feminine)",
    femForm: "belle",
    example: "un beau livre / une belle maison",
    note: "irregular feminine form",
  },
  autre: {
    french: "autre",
    englishMasc: "other",
    englishFem: "other",
    femForm: "autre",
    example: "un autre livre / une autre maison",
    note: "same form both genders",
  },
};

// Connectors and Simple Modifiers - "and, but, or, also, very"
export const connectors = {
  et: {
    french: "et",
    english: "and",
    englishFull: "and",
    type: "connector",
    category: "conjunction",
    example: "un chat et un chien",
    note: "most common connector",
  },
  mais: {
    french: "mais",
    english: "but",
    englishFull: "but",
    type: "connector",
    category: "conjunction",
    example: "je veux un chat, mais j'ai un chien",
    note: "shows contrast",
  },
  ou: {
    french: "ou",
    english: "or",
    englishFull: "or",
    type: "connector",
    category: "conjunction",
    example: "un chat ou un chien?",
    note: "presents a choice",
  },
  aussi: {
    french: "aussi",
    english: "also/too",
    englishFull: "also / too",
    type: "adverb",
    category: "addition",
    example: "j'ai un chat aussi",
    note: "rank 92 - very common!",
  },
  très: {
    french: "très",
    english: "very",
    englishFull: "very",
    type: "adverb",
    category: "intensity",
    example: "très bon",
    note: "rank 88 - super simple modifier",
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
