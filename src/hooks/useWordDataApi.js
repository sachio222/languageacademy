import { useState, useEffect, useCallback } from 'react';
import * as wordDataApi from '../api/wordDataApi';
import { logger } from "../utils/logger";

/**
 * Hook for accessing word data via API
 */
export const useWordDataApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiCall = useCallback(async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    
    // API methods
    searchWords: useCallback((searchTerm, options) => 
      handleApiCall(wordDataApi.searchWords, searchTerm, options), [handleApiCall]),
    
    getWordById: useCallback((wordId) => 
      handleApiCall(wordDataApi.getWordById, wordId), [handleApiCall]),
    
    getWordByText: useCallback((wordText) => 
      handleApiCall(wordDataApi.getWordByText, wordText), [handleApiCall]),
    
    getWordsByPartOfSpeech: useCallback((partOfSpeech, limit) => 
      handleApiCall(wordDataApi.getWordsByPartOfSpeech, partOfSpeech, limit), [handleApiCall]),
    
    getWordsByUnit: useCallback((unit, options) => 
      handleApiCall(wordDataApi.getWordsByUnit, unit, options), [handleApiCall]),
    
    getWordsByModule: useCallback((module, options) => 
      handleApiCall(wordDataApi.getWordsByModule, module, options), [handleApiCall]),
    
    getWordsByLesson: useCallback((lesson, options) => 
      handleApiCall(wordDataApi.getWordsByLesson, lesson, options), [handleApiCall]),
    
    getFilterOptions: useCallback(() => 
      handleApiCall(wordDataApi.getFilterOptions), [handleApiCall]),
    
    getAvailableUnits: useCallback(() => 
      handleApiCall(wordDataApi.getAvailableUnits), [handleApiCall]),
    
    getAvailableModules: useCallback(() => 
      handleApiCall(wordDataApi.getAvailableModules), [handleApiCall]),
    
    getAvailableLessons: useCallback(() => 
      handleApiCall(wordDataApi.getAvailableLessons), [handleApiCall]),
    
    getWordRelationships: useCallback((wordId) => 
      handleApiCall(wordDataApi.getWordRelationships, wordId), [handleApiCall]),
    
    getRelatedWords: useCallback((wordId, relationshipType) => 
      handleApiCall(wordDataApi.getRelatedWords, wordId, relationshipType), [handleApiCall]),
  };
};

/**
 * Hook for searching words with state management
 */
export const useWordSearch = (initialSearchTerm = '', initialOptions = {}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [options, setOptions] = useState(initialOptions);
  const [results, setResults] = useState(null);
  const { searchWords, loading, error } = useWordDataApi();

  const performSearch = useCallback(async () => {
    try {
      const searchResults = await searchWords(searchTerm, options);
      setResults(searchResults);
    } catch (err) {
      logger.error('Search failed:', err);
    }
  }, [searchTerm, options, searchWords]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const updateSearchTerm = useCallback((newTerm) => {
    setSearchTerm(newTerm);
  }, []);

  const updateOptions = useCallback((newOptions) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchTerm('');
    setOptions(initialOptions);
  }, [initialOptions]);

  return {
    searchTerm,
    options,
    results,
    loading,
    error,
    updateSearchTerm,
    updateOptions,
    resetSearch,
    performSearch
  };
};
