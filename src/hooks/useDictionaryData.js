import { useMemo, useState, useEffect } from 'react';
import { loadDictionaryData, generateFilterOptions } from '../utils/dictionaryUtils';
import { generateAllRelationships, createWordMaps } from '../utils/relationshipUtils';

// Constants for default filter options
const DEFAULT_FILTER_OPTIONS = {
  partOfSpeechOptions: ['all'],
  cefrLevelOptions: ['all'],
  difficultyOptions: ['all'],
};

// Cache for loaded dictionaries
let dictionaryCache = null;
let dictionaryLoadPromise = null;

/**
 * Lazy load dictionary data - only loads when first accessed
 */
const loadDictionaryDataLazy = async () => {
  if (dictionaryCache) {
    return dictionaryCache;
  }
  
  if (dictionaryLoadPromise) {
    return dictionaryLoadPromise;
  }
  
  dictionaryLoadPromise = (async () => {
    // Dynamic import - this will be code-split by Vite
    const { loadAllDictionaries } = await import('../data/dictionary/registry');
    const dictionaries = loadAllDictionaries();
    const mergedWords = loadDictionaryData(dictionaries);
    const wordMaps = createWordMaps(mergedWords);
    
    const allWords = mergedWords.map(word => ({
      ...word,
      relationships: generateAllRelationships(word, wordMaps)
    }));
    
    dictionaryCache = allWords;
    return allWords;
  })();
  
  return dictionaryLoadPromise;
};

/**
 * Hook for loading and processing dictionary data
 * Now uses lazy loading to split dictionary data from main bundle
 */
export const useDictionaryData = () => {
  const [allWords, setAllWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    loadDictionaryDataLazy().then(words => {
      if (!cancelled) {
        setAllWords(words);
        setIsLoading(false);
      }
    });
    
    return () => {
      cancelled = true;
    };
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
    isLoading,
    ...filterOptions,
  };
};
