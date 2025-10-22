/**
 * Phrases Dictionary Index
 * Main index for all phrase categories
 */

// Import all phrase categories
import { expressions, expressionsByFrequency } from "./expressions.js";
import {
  prepositionalPhrases,
  prepositionalPhrasesByFrequency,
} from "./prepositional-phrases.js";
import { verbPhrases, verbPhrasesByFrequency } from "./verb-phrases.js";
import {
  timeExpressions,
  timeExpressionsByFrequency,
} from "./time-expressions.js";
import {
  locationPhrases,
  locationPhrasesByFrequency,
} from "./location-phrases.js";
import { greetings, greetingsByFrequency } from "./greetings.js";
import { questions, questionsByFrequency } from "./questions.js";
import { idioms, idiomsByFrequency } from "./idioms.js";
import { conjunctions, conjunctionsByFrequency } from "./conjunctions.js";
import { numbers, numbersByFrequency } from "./numbers.js";
import {
  adjectivePhrases,
  adjectivePhrasesByFrequency,
} from "./adjective-phrases.js";
import {
  articlePhrases,
  articlePhrasesByFrequency,
} from "./article-phrases.js";

// Master phrases dictionary combining all categories
export const phrases = new Map([
  ...expressions,
  ...prepositionalPhrases,
  ...verbPhrases,
  ...timeExpressions,
  ...locationPhrases,
  ...greetings,
  ...questions,
  ...idioms,
  ...conjunctions,
  ...numbers,
  ...adjectivePhrases,
  ...articlePhrases,
]);

// Index by phrase type
export const byPhraseType = {
  expressions,
  prepositionalPhrases,
  verbPhrases,
  timeExpressions,
  locationPhrases,
  greetings,
  questions,
  idioms,
  conjunctions,
  numbers,
  adjectivePhrases,
  articlePhrases,
};

// Combined frequency array for priority loading
export const byFrequency = [
  ...expressionsByFrequency,
  ...prepositionalPhrasesByFrequency,
  ...verbPhrasesByFrequency,
  ...timeExpressionsByFrequency,
  ...locationPhrasesByFrequency,
  ...greetingsByFrequency,
  ...questionsByFrequency,
  ...idiomsByFrequency,
  ...conjunctionsByFrequency,
  ...numbersByFrequency,
  ...adjectivePhrasesByFrequency,
  ...articlePhrasesByFrequency,
];

// Utility functions
export class PhrasesLookup {
  /**
   * Get phrase by ID
   */
  static getPhrase(phraseId) {
    return phrases.get(phraseId);
  }

  /**
   * Get all phrases of a specific type
   */
  static getPhrasesByType(type) {
    return byPhraseType[type] || new Map();
  }

  /**
   * Search phrases by word content
   */
  static searchPhrases(searchTerm) {
    const results = [];
    for (const [id, phrase] of phrases) {
      if (phrase.word.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(phrase);
      }
    }
    return results;
  }

  /**
   * Get phrase category for a given phrase ID
   */
  static getPhraseCategory(phraseId) {
    const phrase = phrases.get(phraseId);
    if (!phrase) return "Unknown";

    const categoryMap = {
      expressions: "Expressions",
      prepositionalPhrases: "Prepositional Phrases",
      verbPhrases: "Verb Phrases",
      timeExpressions: "Time Expressions",
      locationPhrases: "Location Phrases",
      greetings: "Greetings",
      questions: "Questions",
      idioms: "Idioms",
      conjunctions: "Conjunctions",
      numbers: "Numbers",
      adjectivePhrases: "Adjective Phrases",
      articlePhrases: "Article Phrases",
    };

    // Determine category based on which Map contains the phrase
    for (const [category, phraseMap] of Object.entries(byPhraseType)) {
      if (phraseMap.has(phraseId)) {
        return categoryMap[category] || "Other";
      }
    }

    return "Other";
  }

  /**
   * Get statistics for all phrase categories
   */
  static getStatistics() {
    const stats = {};
    for (const [category, phraseMap] of Object.entries(byPhraseType)) {
      stats[category] = phraseMap.size;
    }
    return stats;
  }
}

export default phrases;
