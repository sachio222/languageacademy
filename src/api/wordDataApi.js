/**
 * Word Data API
 * Provides endpoints to access dictionary data
 * 
 * PERFORMANCE OPTIMIZED VERSION
 * - Index-based lookups instead of linear search
 * - Pre-normalized text for faster searching
 * - Selective filtering based on most restrictive criteria
 * - Cached indexes for O(1) lookups
 */

import { loadAllDictionaries } from '../data/dictionary/registry';
import { loadDictionaryData, generateFilterOptions } from '../utils/dictionaryUtils';
import { generateAllRelationships, createWordMaps } from '../utils/relationshipUtils';

// Enhanced cache with multiple indexes
let cache = {
  words: null,
  indexes: null,
  timestamp: null,
  normalizedTexts: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Create optimized indexes for fast lookups
 */
const createIndexes = (words) => {
  const indexes = {
    byId: new Map(),
    byWordText: new Map(),
    byPartOfSpeech: new Map(),
    byCefrLevel: new Map(),
    byDifficulty: new Map(),
    byUnit: new Map(),
    byModule: new Map(),
    byLesson: new Map(),
    searchIndex: new Map(), // Pre-normalized search index
    byInfinitive: new Map(),
    byBaseWord: new Map()
  };

  // Pre-normalize all text for search
  const normalizedTexts = new Map();

  words.forEach(word => {
    // Basic indexes
    indexes.byId.set(word.id, word);
    indexes.byWordText.set(word.word.toLowerCase(), word);

    // Part of speech index
    if (word.partOfSpeech) {
      if (!indexes.byPartOfSpeech.has(word.partOfSpeech)) {
        indexes.byPartOfSpeech.set(word.partOfSpeech, []);
      }
      indexes.byPartOfSpeech.get(word.partOfSpeech).push(word);
    }

    // CEFR level index
    const cefrLevel = word.cefr_level || word.cefrLevel;
    if (cefrLevel) {
      if (!indexes.byCefrLevel.has(cefrLevel)) {
        indexes.byCefrLevel.set(cefrLevel, []);
      }
      indexes.byCefrLevel.get(cefrLevel).push(word);
    }

    // Difficulty index
    if (word.difficulty) {
      if (!indexes.byDifficulty.has(word.difficulty)) {
        indexes.byDifficulty.set(word.difficulty, []);
      }
      indexes.byDifficulty.get(word.difficulty).push(word);
    }

    // Unit index
    if (word.unit) {
      if (!indexes.byUnit.has(word.unit)) {
        indexes.byUnit.set(word.unit, []);
      }
      indexes.byUnit.get(word.unit).push(word);
    }

    // Module index
    if (word.module) {
      if (!indexes.byModule.has(word.module)) {
        indexes.byModule.set(word.module, []);
      }
      indexes.byModule.get(word.module).push(word);
    }

    // Lesson index
    if (word.lesson) {
      if (!indexes.byLesson.has(word.lesson)) {
        indexes.byLesson.set(word.lesson, []);
      }
      indexes.byLesson.get(word.lesson).push(word);
    }

    // Search index (pre-normalized)
    const normalizedWord = word.word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedTranslation = word.translations?.[0]?.text
      ? word.translations[0].text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      : "";

    normalizedTexts.set(word.id, { word: normalizedWord, translation: normalizedTranslation });

    // Add to search index
    if (!indexes.searchIndex.has(normalizedWord)) {
      indexes.searchIndex.set(normalizedWord, []);
    }
    indexes.searchIndex.get(normalizedWord).push(word);

    if (normalizedTranslation && !indexes.searchIndex.has(normalizedTranslation)) {
      indexes.searchIndex.set(normalizedTranslation, []);
    }
    if (normalizedTranslation) {
      indexes.searchIndex.get(normalizedTranslation).push(word);
    }

    // Relationship indexes
    if (word.infinitive) {
      const key = word.infinitive.toLowerCase();
      if (!indexes.byInfinitive.has(key)) {
        indexes.byInfinitive.set(key, []);
      }
      indexes.byInfinitive.get(key).push(word);
    }

    if (word.base_word) {
      const key = word.base_word.toLowerCase();
      if (!indexes.byBaseWord.has(key)) {
        indexes.byBaseWord.set(key, []);
      }
      indexes.byBaseWord.get(key).push(word);
    }
  });

  return { indexes, normalizedTexts };
};

/**
 * Get all processed dictionary words with optimized caching
 */
export const getAllWords = async () => {
  // Check cache
  if (cache.words && cache.timestamp && (Date.now() - cache.timestamp) < CACHE_DURATION) {
    return cache.words;
  }

  // Load and process data
  const dictionaries = loadAllDictionaries();
  const mergedWords = loadDictionaryData(dictionaries);
  const wordMaps = createWordMaps(mergedWords);
  
  const processedWords = mergedWords.map(word => ({
    ...word,
    relationships: generateAllRelationships(word, wordMaps)
  }));

  // Create indexes
  const { indexes, normalizedTexts } = createIndexes(processedWords);

  // Cache everything
  cache.words = processedWords;
  cache.indexes = indexes;
  cache.normalizedTexts = normalizedTexts;
  cache.timestamp = Date.now();

  return processedWords;
};

/**
 * Get indexes (cached)
 */
const getIndexes = async () => {
  if (!cache.indexes) {
    await getAllWords();
  }
  return cache.indexes;
};

/**
 * Optimized search with index-based filtering
 */
export const searchWords = async (searchTerm, options = {}) => {
  const {
    partOfSpeech = 'all',
    cefrLevel = 'all',
    difficulty = 'all',
    unit = 'all',
    module = 'all',
    lesson = 'all',
    limit = 50,
    offset = 0
  } = options;

  const indexes = await getIndexes();
  let candidateWords = null;

  // Start with the most selective filter
  if (unit !== 'all' && indexes.byUnit.has(unit)) {
    candidateWords = indexes.byUnit.get(unit);
  } else if (module !== 'all' && indexes.byModule.has(module)) {
    candidateWords = indexes.byModule.get(module);
  } else if (partOfSpeech !== 'all' && indexes.byPartOfSpeech.has(partOfSpeech)) {
    candidateWords = indexes.byPartOfSpeech.get(partOfSpeech);
  } else if (cefrLevel !== 'all' && indexes.byCefrLevel.has(cefrLevel)) {
    candidateWords = indexes.byCefrLevel.get(cefrLevel);
  } else if (difficulty !== 'all' && indexes.byDifficulty.has(difficulty)) {
    candidateWords = indexes.byDifficulty.get(difficulty);
  } else {
    // No selective filter, use all words
    candidateWords = cache.words;
  }

  // Apply additional filters in order of selectivity
  let filteredWords = candidateWords;

  // Apply search term filter (most expensive, so do it last)
  if (searchTerm) {
    const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    filteredWords = filteredWords.filter(word => {
      const normalized = cache.normalizedTexts.get(word.id);
      return normalized.word.includes(normalizedSearchTerm) ||
             normalized.translation.includes(normalizedSearchTerm);
    });
  }

  // Apply remaining filters
  if (partOfSpeech !== 'all' && unit === 'all' && module === 'all') {
    filteredWords = filteredWords.filter(word => 
      word.partOfSpeech === partOfSpeech ||
      (word.allPartsOfSpeech && word.allPartsOfSpeech.includes(partOfSpeech))
    );
  }

  if (cefrLevel !== 'all' && unit === 'all' && module === 'all') {
    filteredWords = filteredWords.filter(word => 
      (word.cefr_level || word.cefrLevel) === cefrLevel
    );
  }

  if (difficulty !== 'all' && unit === 'all' && module === 'all') {
    filteredWords = filteredWords.filter(word => 
      word.difficulty === difficulty
    );
  }

  if (unit !== 'all' && !indexes.byUnit.has(unit)) {
    filteredWords = filteredWords.filter(word => word.unit === unit);
  }

  if (module !== 'all' && !indexes.byModule.has(module)) {
    filteredWords = filteredWords.filter(word => word.module === module);
  }

  if (lesson !== 'all') {
    filteredWords = filteredWords.filter(word => word.lesson === lesson);
  }

  // Apply pagination
  const total = filteredWords.length;
  const paginatedWords = filteredWords.slice(offset, offset + limit);

  return {
    words: paginatedWords,
    total,
    limit,
    offset,
    hasMore: offset + limit < total
  };
};

/**
 * Optimized word lookup by ID
 */
export const getWordById = async (wordId) => {
  const indexes = await getIndexes();
  return indexes.byId.get(wordId);
};

/**
 * Optimized word lookup by text
 */
export const getWordByText = async (wordText) => {
  const indexes = await getIndexes();
  return indexes.byWordText.get(wordText.toLowerCase());
};

/**
 * Get words by part of speech
 */
export const getWordsByPartOfSpeech = async (partOfSpeech, limit = 50) => {
  return searchWords('', { partOfSpeech, limit });
};

/**
 * Optimized curriculum-based lookups
 */
export const getWordsByUnit = async (unit, options = {}) => {
  const indexes = await getIndexes();
  const unitWords = indexes.byUnit.get(unit) || [];
  
  const { limit = 50, offset = 0 } = options;
  const paginatedWords = unitWords.slice(offset, offset + limit);
  
  return {
    words: paginatedWords,
    total: unitWords.length,
    limit,
    offset,
    hasMore: offset + limit < unitWords.length
  };
};

export const getWordsByModule = async (module, options = {}) => {
  const indexes = await getIndexes();
  const moduleWords = indexes.byModule.get(module) || [];
  
  const { limit = 50, offset = 0 } = options;
  const paginatedWords = moduleWords.slice(offset, offset + limit);
  
  return {
    words: paginatedWords,
    total: moduleWords.length,
    limit,
    offset,
    hasMore: offset + limit < moduleWords.length
  };
};

export const getWordsByLesson = async (lesson, options = {}) => {
  const indexes = await getIndexes();
  const lessonWords = indexes.byLesson.get(lesson) || [];
  
  const { limit = 50, offset = 0 } = options;
  const paginatedWords = lessonWords.slice(offset, offset + limit);
  
  return {
    words: paginatedWords,
    total: lessonWords.length,
    limit,
    offset,
    hasMore: offset + limit < lessonWords.length
  };
};

/**
 * Get filter options
 */
export const getFilterOptions = async () => {
  const allWords = await getAllWords();
  return generateFilterOptions(allWords);
};

/**
 * Optimized curriculum data generation
 */
export const getAvailableUnits = async () => {
  const indexes = await getIndexes();
  const units = Array.from(indexes.byUnit.keys()).sort();
  
  return units.map(unit => ({
    value: unit,
    label: unit.replace('unit', 'Unit '),
    count: indexes.byUnit.get(unit).length
  }));
};

export const getAvailableModules = async () => {
  const indexes = await getIndexes();
  const modules = Array.from(indexes.byModule.keys()).sort();
  
  return modules.map(module => ({
    value: module,
    label: module,
    count: indexes.byModule.get(module).length
  }));
};

export const getAvailableLessons = async () => {
  const indexes = await getIndexes();
  const lessons = Array.from(indexes.byLesson.keys()).sort();
  
  return lessons.map(lesson => ({
    value: lesson,
    label: lesson,
    count: indexes.byLesson.get(lesson).length
  }));
};

/**
 * Get word relationships
 */
export const getWordRelationships = async (wordId) => {
  const word = await getWordById(wordId);
  if (!word) return null;
  
  return word.relationships || [];
};

/**
 * Optimized relationship lookups
 */
export const getWordRelationships = async (wordId) => {
  const word = await getWordById(wordId);
  if (!word) return null;
  
  return word.relationships || [];
};

export const getRelatedWords = async (wordId, relationshipType = null) => {
  const allWords = await getAllWords();
  const word = allWords.find(w => w.id === wordId);
  
  if (!word || !word.relationships) return [];

  let relationships = word.relationships;
  
  if (relationshipType) {
    relationships = relationships.filter(rel => rel.type === relationshipType);
  }

  // Use index for faster lookups
  const indexes = await getIndexes();
  const relatedWords = relationships.map(rel => {
    const relatedWord = indexes.byId.get(rel.targetId);
    return relatedWord ? {
      ...relatedWord,
      relationshipType: rel.type,
      relationshipNote: rel.note
    } : null;
  }).filter(Boolean);

  return relatedWords;
};

/**
 * Performance monitoring utilities
 */
export const getPerformanceStats = () => {
  if (!cache.words) return null;
  
  return {
    totalWords: cache.words.length,
    cacheAge: cache.timestamp ? Date.now() - cache.timestamp : 0,
    indexSizes: {
      byId: cache.indexes?.byId.size || 0,
      byPartOfSpeech: cache.indexes?.byPartOfSpeech.size || 0,
      byUnit: cache.indexes?.byUnit.size || 0,
      byModule: cache.indexes?.byModule.size || 0,
      searchIndex: cache.indexes?.searchIndex.size || 0
    }
  };
};

/**
 * Clear cache (for testing or memory management)
 */
export const clearCache = () => {
  cache = {
    words: null,
    indexes: null,
    timestamp: null,
    normalizedTexts: null
  };
};
