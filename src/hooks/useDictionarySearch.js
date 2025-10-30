import { useState, useMemo, useEffect } from 'react';
import { processWords } from '../utils/searchUtils';

// Constants for default filter values
const DEFAULT_FILTERS = {
  searchTerm: "",
  selectedPartOfSpeech: "all",
  selectedCefrLevel: "all",
  selectedDifficulty: "all",
  sortBy: "word",
  sortOrder: "asc",
};

/**
 * Hook for dictionary search and filtering functionality
 * Simplified with consolidated state management
 */
export const useDictionarySearch = (allWords) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedWord, setSelectedWord] = useState(null);

  // Filter and sort words
  const filteredWords = useMemo(() => {
    return processWords(allWords, filters, filters.sortBy, filters.sortOrder);
  }, [allWords, filters]);

  // Auto-select first word when filters change
  useEffect(() => {
    if (filteredWords.length > 0) {
      setSelectedWord(filteredWords[0]);
    } else {
      setSelectedWord(null);
    }
  }, [filteredWords]);

  // Helper function to update individual filters
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    // Consolidated state
    filters,
    selectedWord,
    
    // State management
    setFilters,
    setSelectedWord,
    updateFilter,
    
    // Computed values
    filteredWords,
  };
};
