import { useDictionaryData } from './useDictionaryData';
import { useDictionarySearch } from './useDictionarySearch';

/**
 * Main dictionary hook that combines data loading and search functionality
 * This is now a clean, modular hook that delegates to specialized hooks
 */
export const useDictionary = () => {
  // Load dictionary data
  const dictionaryData = useDictionaryData();
  
  // Handle search and filtering
  const searchData = useDictionarySearch(dictionaryData.allWords);

  // Backward compatibility: provide individual setters
  const setSearchTerm = (value) => searchData.updateFilter('searchTerm', value);
  const setSelectedPartOfSpeech = (value) => searchData.updateFilter('selectedPartOfSpeech', value);
  const setSelectedCefrLevel = (value) => searchData.updateFilter('selectedCefrLevel', value);
  const setSelectedDifficulty = (value) => searchData.updateFilter('selectedDifficulty', value);
  const setSortBy = (value) => searchData.updateFilter('sortBy', value);
  const setSortOrder = (value) => searchData.updateFilter('sortOrder', value);

  return {
    // Data
    allWords: dictionaryData.allWords,
    filteredWords: searchData.filteredWords,
    isLoading: dictionaryData.isLoading,
    
    // Filter options
    partOfSpeechOptions: dictionaryData.partOfSpeechOptions,
    cefrLevelOptions: dictionaryData.cefrLevelOptions,
    difficultyOptions: dictionaryData.difficultyOptions,
    
    // Search state (backward compatibility)
    searchTerm: searchData.filters.searchTerm,
    selectedPartOfSpeech: searchData.filters.selectedPartOfSpeech,
    selectedCefrLevel: searchData.filters.selectedCefrLevel,
    selectedDifficulty: searchData.filters.selectedDifficulty,
    sortBy: searchData.filters.sortBy,
    sortOrder: searchData.filters.sortOrder,
    selectedWord: searchData.selectedWord,
    
    // Search actions (backward compatibility)
    setSearchTerm,
    setSelectedPartOfSpeech,
    setSelectedCefrLevel,
    setSelectedDifficulty,
    setSortBy,
    setSortOrder,
    setSelectedWord: searchData.setSelectedWord,
    
    // New consolidated API
    filters: searchData.filters,
    setFilters: searchData.setFilters,
    updateFilter: searchData.updateFilter,
  };
};
