/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: All remaining verb phrases migrated to verb-phrases.js, arrays cleared
 */

// JE PHRASES - Phrases starting with "je " or "j'"
const jePhrases = [
  // All migrated - array cleared
];

// TU PHRASES - Phrases starting with "tu "
const tuPhrases = [
  // All migrated - array cleared
];

// IL/ELLE PHRASES - Phrases starting with "il " or "elle "
const ilEllePhrases = [
  // All migrated - array cleared
];

// ILS/ELLES PHRASES - Phrases starting with "ils " or "elles "
const ilsEllesPhrases = [
  // All migrated - array cleared
];

// NOUS PHRASES - Phrases starting with "nous "
const nousPhrases = [
  // All migrated - array cleared
];

// VOUS PHRASES - Phrases starting with "vous "
const vousPhrases = [
  // All migrated - array cleared
];

// ON PHRASES - Phrases starting with "on "
const onPhrases = [
  // All migrated - array cleared
];

// IL/ELLE COMBINED PHRASES - Phrases starting with "il/elle "
const ilElleCombinedPhrases = [
  // All migrated - array cleared
];

// ILS/ELLES COMBINED PHRASES - Phrases starting with "ils/elles "
const ilsEllesCombinedPhrases = [
  // All migrated - array cleared
];

// MASCULINE NOUNS - Phrases starting with "le " or "un " (capitalized)
const masculineNouns = [
  // All migrated - array cleared
];

// FEMININE NOUNS - Phrases starting with "la " or "une " (capitalized)
const feminineNouns = [
  // All migrated - array cleared
];

// PLURAL NOUNS - Phrases starting with "les " (capitalized)
const pluralNouns = [
  // All migrated - array cleared
];

// CONTRACTED NOUNS - Phrases starting with "l'" (capitalized, need manual gender determination)
const contractedNouns = [
  // All migrated - array cleared
];

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
  "Je me demande comment ça marche",
  "Je me demande pourquoi c'est comme ça",
  "Je ne comprends pas",
  "Je ne sais pas",
  "Je ne sais pas comment on fait ça",
  "Pourquoi les nuages sont-ils blancs?",
  "On ne comprend pas comment ça marche",
];

// EXPRESSIONS - Common French expressions and idiomatic phrases
const expressions = [
  "en fait",
  "En fait, je ne sais pas",
  "en ligne",
  "Je pense, donc je suis",
];

// GREETINGS - Greetings, farewells, and social interactions
const greetings = ["Joyeuses Pâques!", "Joyeux Noël!"];

// PREPOSITIONAL PHRASES - Phrases starting with prepositions
const prepositionalPhrases = ["le long de"];

// VERB PHRASES - Verb conjugations and verb combinations
const verbPhrases = [
  "en écoutant",
  "en mangeant",
  "en marchant",
  "en parlant",
  "en pratiquant",
  "en train de",
  "en travaillant",
  "je crois",
  "je la vois",
  "je ne le veux pas",
  "je ne le vois pas",
  "je sais",
  "je te demande",
  "je te dis",
  "si j'avais",
  "si j'avais de l'argent",
  "si j'avais étudié",
  "si j'avais fait ça",
  "si j'avais pu",
  "si j'avais su",
  "si j'étais",
  "si j'étais riche",
  "si j'étais toi",
  "si on avait le temps",
  "si tu étais ici",
  "le café était",
  "le cinéma était",
  "le faites",
  "le film était excellent",
  "le soleil brille",
  "le train arrive",
  "le vent souffle",
  "Ne le fais pas!",
  "Ne me regarde pas!",
  "Marie a dû partir",
  "Dépêche-toi!",
  "Donne-le-moi!",
  "Écoute bien!",
  "Écoute-le!",
  "Fais attention!",
  "Regarde-moi!",
  "Sois gentil!",
  "Vas-y!",
];

// ADJECTIVE PHRASES - Adjective combinations and comparative forms
const adjectivePhrases = [
  "si beau",
  "le meilleur / la meilleure",
  "le même problème",
];

// ARTICLE PHRASES - Article combinations
const articlePhrases = [
  // All migrated - array cleared
];

// PRONOUN PHRASES - Pronoun combinations (these are actually verb phrases)
const pronounPhrases = [
  // These are actually verb phrases with pronouns, not separate pronoun phrases
];

// TIME EXPRESSIONS - Time-related phrases
const timeExpressions = [
  "en ce moment",
  "en mille neuf cent quatre-vingt-quinze",
];

// LOCATION PHRASES - Location and place-related phrases
const locationPhrases = ["en face de", "en face du parc", "en voiture"];

// PROPER NOUNS - Proper nouns and names
const properNouns = [
  "Le Procope",
  "Arc de Triomphe",
  "Auguste Renoir",
  "Café de Flore",
  "Champs-Élysées",
  "Claude Monet",
  "Jardin du Luxembourg",
  "Moulin Rouge",
  "Notre-Dame",
  "Tour Eiffel",
  "Vincent van Gogh",
];

// CONJUNCTION PHRASES - Conjunction combinations
const conjunctionPhrases = [
  // All migrated - array cleared
];

// Export the arrays
export {
  jePhrases,
  tuPhrases,
  ilEllePhrases,
  ilsEllesPhrases,
  nousPhrases,
  vousPhrases,
  onPhrases,
  ilElleCombinedPhrases,
  ilsEllesCombinedPhrases,
  masculineNouns,
  feminineNouns,
  pluralNouns,
  contractedNouns,
  questions,
  expressions,
  greetings,
  prepositionalPhrases,
  verbPhrases,
  adjectivePhrases,
  articlePhrases,
  pronounPhrases,
  timeExpressions,
  locationPhrases,
  properNouns,
  conjunctionPhrases,
};

// Summary statistics
export const summary = {
  totalPhrases: 85, // All phrases manually classified for review
  breakdown: {
    jePhrases: jePhrases.length,
    tuPhrases: tuPhrases.length,
    ilEllePhrases: ilEllePhrases.length,
    ilsEllesPhrases: ilsEllesPhrases.length,
    nousPhrases: nousPhrases.length,
    vousPhrases: vousPhrases.length,
    onPhrases: onPhrases.length,
    ilElleCombinedPhrases: ilElleCombinedPhrases.length,
    ilsEllesCombinedPhrases: ilsEllesCombinedPhrases.length,
    masculineNouns: masculineNouns.length,
    feminineNouns: feminineNouns.length,
    pluralNouns: pluralNouns.length,
    contractedNouns: contractedNouns.length,
    questions: questions.length,
    expressions: expressions.length,
    greetings: greetings.length,
    prepositionalPhrases: prepositionalPhrases.length,
    verbPhrases: verbPhrases.length,
    adjectivePhrases: adjectivePhrases.length,
    articlePhrases: articlePhrases.length,
    pronounPhrases: pronounPhrases.length,
    timeExpressions: timeExpressions.length,
    locationPhrases: locationPhrases.length,
    properNouns: properNouns.length,
    conjunctionPhrases: conjunctionPhrases.length,
  },
  status: "85 phrases manually classified for review and migration",
};
