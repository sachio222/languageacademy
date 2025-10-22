/**
 * Target List - Misclassified Words from Nouns.js
 * Organized by Part of Speech for Reclassification
 *
 * Total misclassified words: 223 out of 407 (54.8%)
 */

// VERBS - 100+ words (various tenses, conjugations, imperatives)
const verbs = [];

// ADJECTIVES - 60+ words (colors, descriptive words, comparative forms)
const adjectives = [];

// ADVERBS - 30+ words (time, manner, degree, place)
const adverbs = [];

// INTERJECTIONS - 10+ words (exclamations, responses, expressions)
const interjections = [];

// PRONOUNS - 5+ words (personal, demonstrative, interrogative)
const pronouns = [];

// PREPOSITIONS - 5+ words (spatial and temporal relations)
const prepositions = [];

// CONJUNCTIONS - 2+ words (connecting words)
const conjunctions = [];

// INTERROGATIVE WORDS - 6+ words (question words from pronouns.js)
const interrogativeWords = [];

// ALPHABET - 26 letters (should be removed from pronouns.js)
const alphabet = [];

// Export the arrays
export {
  verbs,
  adjectives,
  adverbs,
  interjections,
  pronouns,
  prepositions,
  conjunctions,
  interrogativeWords,
  alphabet,
};

// Summary statistics
export const summary = {
  totalMisclassified: 0, // All words have been successfully migrated
  totalWords: 0, // All target words have been processed
  misclassificationRate: 0, // No misclassified words remain
  breakdown: {
    verbs: verbs.length,
    adjectives: adjectives.length,
    adverbs: adverbs.length,
    interjections: interjections.length,
    pronouns: pronouns.length,
    prepositions: prepositions.length,
    conjunctions: conjunctions.length,
    interrogativeWords: interrogativeWords.length,
    alphabet: alphabet.length,
  },
};
