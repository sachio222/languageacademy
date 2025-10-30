import { useMemo } from 'react';
import { loadAllDictionaries } from '../data/dictionary/registry';
import { loadDictionaryData, generateFilterOptions } from '../utils/dictionaryUtils';
import { generateAllRelationships, createWordMaps } from '../utils/relationshipUtils';

// Constants for default filter options
const DEFAULT_FILTER_OPTIONS = {
  partOfSpeechOptions: ['all'],
  cefrLevelOptions: ['all'],
  difficultyOptions: ['all'],
};

/**
 * Hook for loading and processing dictionary data
 * Simplified to use synchronous loading without unnecessary async patterns
 */
export const useDictionaryData = () => {
  // Load and process dictionary data synchronously
  const allWords = useMemo(() => {
    const dictionaries = loadAllDictionaries();
    const mergedWords = loadDictionaryData(dictionaries);
    const wordMaps = createWordMaps(mergedWords);
    
    return mergedWords.map(word => ({
      ...word,
      relationships: generateAllRelationships(word, wordMaps)
    }));
  }, []);

  // Generate filter options
  const filterOptions = useMemo(() => {
    if (allWords.length === 0) {
      return DEFAULT_FILTER_OPTIONS;
    }
    return generateFilterOptions(allWords);
  }, [allWords]);

  return {
    allWords,
    ...filterOptions,
  };
};
