/**
 * Dictionary Index - Unified export and graph query functions
 * High-performance vocabulary lookup system with O(1) access
 */

// Import all word categories
import { nouns, nounsByFrequency, nounsByGender } from './words/nouns.js';
import { verbs, verbsByFrequency, verbsByConjugation } from './words/verbs.js';
import { adjectives, adjectivesByFrequency } from './words/adjectives.js';
import { adverbs, adverbsByFrequency } from './words/adverbs.js';
import { pronouns } from './words/pronouns.js';
import { articles } from './words/articles.js';
import { prepositions, prepositionsByFrequency } from './words/prepositions.js';
import { conjunctions, conjunctionsByFrequency } from './words/conjunctions.js';
import { expressions } from './words/expressions.js';

// Import phrases and relationships
import { phrases, phrasesByType, phraseComponents } from './phrases.js';
import { relationships, relationshipsByType } from './relationships.js';

/**
 * Master word dictionary - combines all word categories
 */
export const dictionary = new Map([
  ...nouns,
  ...verbs,
  ...adjectives,
  ...adverbs,
  ...pronouns,
  ...articles,
  ...prepositions,
  ...conjunctions,
  ...expressions
]);

/**
 * Pre-computed lookup indices for O(1) performance
 */
export const indices = {
  // By part of speech
  byPartOfSpeech: {
    noun: nouns,
    verb: verbs,
    adjective: adjectives,
    adverb: adverbs,
    pronoun: pronouns,
    article: articles,
    preposition: prepositions,
    conjunction: conjunctions,
    expression: expressions
  },
  
  // By language
  byLanguage: new Map([
    ['fr', new Map()], // Will be populated during build
    ['en', new Map()],
    ['es', new Map()]
  ]),
  
  // By frequency (for priority loading)
  byFrequency: [
    ...nounsByFrequency,
    ...verbsByFrequency,
    ...adjectivesByFrequency,
    ...adverbsByFrequency,
    ...prepositionsByFrequency,
    ...conjunctionsByFrequency
  ],
  
  // Specialized indices
  nounsByGender,
  verbsByConjugation,
  phrasesByType
};

/**
 * High-performance word lookup functions
 */
export class DictionaryLookup {
  /**
   * Get word by ID - O(1) lookup
   */
  static getWord(id) {
    return dictionary.get(id);
  }
  
  /**
   * Get words by part of speech - O(1) lookup
   */
  static getWordsByPartOfSpeech(partOfSpeech) {
    // Handle plural forms (nouns -> noun)
    const singularForm = partOfSpeech.replace(/s$/, '');
    return indices.byPartOfSpeech[partOfSpeech] || indices.byPartOfSpeech[singularForm] || new Map();
  }
  
  /**
   * Get words by language - O(1) lookup
   */
  static getWordsByLanguage(language) {
    return indices.byLanguage.get(language) || new Map();
  }
  
  /**
   * Search words by text - optimized for autocomplete
   */
  static searchWords(query, language = 'fr', limit = 10) {
    const results = [];
    const queryLower = query.toLowerCase();
    
    for (const [id, word] of dictionary) {
      if (word.language === language && word.word.toLowerCase().startsWith(queryLower)) {
        results.push(word);
        if (results.length >= limit) break;
      }
    }
    
    return results;
  }
  
  /**
   * Get related words - follows relationship graph
   */
  static getRelatedWords(wordId, relationshipType = null) {
    const word = dictionary.get(wordId);
    if (!word) return [];
    
    const related = [];
    for (const rel of word.relationships || []) {
      if (!relationshipType || rel.type === relationshipType) {
        const relatedWord = dictionary.get(rel.targetId);
        if (relatedWord) {
          related.push({
            word: relatedWord,
            relationship: rel
          });
        }
      }
    }
    
    return related;
  }
  
  /**
   * Get word translations
   */
  static getTranslations(wordId, targetLanguage) {
    const word = dictionary.get(wordId);
    if (!word) return [];
    
    return word.translations?.filter(t => t.language === targetLanguage) || [];
  }
  
  /**
   * Get words by frequency range
   */
  static getWordsByFrequency(minRank = 1, maxRank = 100) {
    return indices.byFrequency
      .slice(minRank - 1, maxRank)
      .map(id => dictionary.get(id))
      .filter(Boolean);
  }
  
  /**
   * Get words by CEFR level
   */
  static getWordsByLevel(level) {
    const results = [];
    for (const [id, word] of dictionary) {
      if (word.cefr_level === level) {
        results.push(word);
      }
    }
    return results;
  }
}

/**
 * Phrase lookup functions
 */
export class PhraseLookup {
  /**
   * Get phrase by ID
   */
  static getPhrase(id) {
    return phrases.get(id);
  }
  
  /**
   * Get phrases by type
   */
  static getPhrasesByType(type) {
    return phrasesByType.get(type) || [];
  }
  
  /**
   * Get phrases containing a word
   */
  static getPhrasesContaining(wordId) {
    const results = [];
    for (const [id, phrase] of phrases) {
      if (phrase.components?.some(comp => comp.wordId === wordId)) {
        results.push(phrase);
      }
    }
    return results;
  }
  
  /**
   * Decompose phrase into components
   */
  static decomposePhrase(phraseId) {
    const phrase = phrases.get(phraseId);
    if (!phrase) return [];
    
    return phrase.components?.map(comp => ({
      component: comp,
      word: dictionary.get(comp.wordId)
    })) || [];
  }
}

/**
 * Vocabulary statistics and analytics
 */
export class VocabularyStats {
  /**
   * Get total word count
   */
  static getTotalWords() {
    return dictionary.size;
  }
  
  /**
   * Get word count by part of speech
   */
  static getWordCountByPartOfSpeech() {
    const counts = {};
    for (const [pos, words] of Object.entries(indices.byPartOfSpeech)) {
      counts[pos] = words.size;
    }
    return counts;
  }
  
  /**
   * Get word count by language
   */
  static getWordCountByLanguage() {
    const counts = {};
    for (const [id, word] of dictionary) {
      counts[word.language] = (counts[word.language] || 0) + 1;
    }
    return counts;
  }
  
  /**
   * Get coverage statistics for a lesson
   */
  static getLessonCoverage(lessonVocabulary) {
    const covered = lessonVocabulary.filter(vocab => 
      dictionary.has(vocab.id || vocab.french)
    );
    
    return {
      total: lessonVocabulary.length,
      covered: covered.length,
      percentage: (covered.length / lessonVocabulary.length) * 100,
      missing: lessonVocabulary.filter(vocab => 
        !dictionary.has(vocab.id || vocab.french)
      )
    };
  }
}

/**
 * Compatibility layer for existing lesson format
 */
export class LessonCompatibility {
  /**
   * Convert old vocabulary format to dictionary lookup
   */
  static convertVocabularyReference(vocabularyReference) {
    return vocabularyReference.map(vocab => {
      const wordId = vocab.id || `${vocab.french}-fr`;
      const dictionaryWord = dictionary.get(wordId);
      
      if (dictionaryWord) {
        return {
          ...vocab,
          id: wordId,
          dictionaryEntry: dictionaryWord
        };
      }
      
      // Fallback for words not yet in dictionary
      return vocab;
    });
  }
  
  /**
   * Get categorization for VocabularyDashboard (replaces runtime categorization)
   */
  static getWordCategory(wordId) {
    const word = dictionary.get(wordId);
    if (!word) return 'Unknown';
    
    const partOfSpeechMap = {
      noun: 'Nouns',
      verb: 'Verbs',
      adjective: 'Adjectives',
      adverb: 'Adverbs',
      pronoun: 'Pronouns',
      article: 'Articles',
      preposition: 'Prepositions',
      conjunction: 'Conjunctions',
      expression: 'Expressions'
    };
    
    return partOfSpeechMap[word.partOfSpeech] || 'Other';
  }
}

// Export everything
export {
  phrases,
  phrasesByType,
  phraseComponents,
  relationships,
  relationshipsByType
};

export default {
  dictionary,
  indices,
  DictionaryLookup,
  PhraseLookup,
  VocabularyStats,
  LessonCompatibility
};
