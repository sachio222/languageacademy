/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Capitalized article phrases extracted for review
 */

// MASCULINE NOUNS - Phrases starting with "le " or "un " (capitalized)
const masculineNouns = [
  "le Congo", // Congo (DRC) (noun)
  "le Liban", // Lebanon (noun)
  "le Louvre", // The Louvre (world's largest art museum) (noun)
  "le Maroc", // Morocco (noun)
  "le Nouvel An", // New Year's Day (noun)
  "le Poisson d'Avril", // April Fools' Day (noun)
  "le Québec", // Quebec (noun)
  "le Réveillon", // Christmas/New Year's Eve dinner (noun)
  "le Sénégal", // Senegal (noun)
];

// FEMININE NOUNS - Phrases starting with "la " or "une " (capitalized)
const feminineNouns = [
  "la Belgique", // Belgium (noun)
  "la Chandeleur", // Candlemas / Crêpe Day (noun)
  "la Côte d'Ivoire", // Ivory Coast (noun)
  "la Fête de la Musique", // Music Festival Day (noun)
  "la Fête du Travail", // Labor Day (noun)
  "la Fête Nationale", // Bastille Day / National Day (noun)
  "la France", // France (noun)
  "la Francophonie", // the French-speaking world (noun)
  "la Galette des Rois", // King Cake (noun)
  "la Saint-Valentin", // Valentine's Day (noun)
  "la Seine", // The Seine (river flowing through Paris) (noun)
  "la Sorbonne", // the Sorbonne (famous Paris university) (noun)
  "la Suisse", // Switzerland (noun)
  "la Tour Eiffel", // Eiffel Tower (noun)
  "la Toussaint", // All Saints' Day (noun)
];

// PLURAL NOUNS - Phrases starting with "les " (capitalized)
const pluralNouns = [
  "les Caraïbes", // the Caribbean (noun)
];

// CONTRACTED NOUNS - Phrases starting with "l'" (capitalized, need manual gender determination)
const contractedNouns = [
  "l'Académie française", // the French Academy (noun)
  "l'Afrique", // Africa (noun)
  "l'Amérique du Nord", // North America (noun)
  "l'Europe", // Europe (noun)
];

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
  // All migrated - array cleared
];

// EXPRESSIONS - Common French expressions and idiomatic phrases
const expressions = [
  // All migrated - array cleared
];

// GREETINGS - Greetings, farewells, and social interactions
const greetings = [
  // All migrated - array cleared
];

// PREPOSITIONAL PHRASES - Phrases starting with prepositions
const prepositionalPhrases = [
  // All migrated - array cleared
];

// VERB PHRASES - Verb conjugations and verb combinations
const verbPhrases = [
  // All migrated - array cleared
];

// ADJECTIVE PHRASES - Adjective combinations and comparative forms
const adjectivePhrases = [
  // All migrated - array cleared
];

// ARTICLE PHRASES - Article combinations
const articlePhrases = [
  // All migrated - array cleared
];

// PRONOUN PHRASES - Pronoun combinations (these are actually verb phrases)
const pronounPhrases = [
  // These are actually verb phrases with pronouns, not separate pronoun phrases
];

// Export the arrays
export {
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
};

// Summary statistics
export const summary = {
  totalPhrases: 29, // Capitalized article phrases extracted for review
  breakdown: {
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
  },
  status: "Capitalized article phrases extracted for manual review and classification",
};
