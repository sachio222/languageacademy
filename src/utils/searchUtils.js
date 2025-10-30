/**
 * Search and filtering utilities for dictionary words
 */

import { normalizeText } from './dictionaryUtils';

/**
 * Check if a word matches the part of speech filter
 */
export const matchesPartOfSpeech = (word, selectedPartOfSpeech) => {
  return selectedPartOfSpeech === "all" ||
    word.partOfSpeech === selectedPartOfSpeech ||
    (word.allPartsOfSpeech && word.allPartsOfSpeech.includes(selectedPartOfSpeech));
};

/**
 * Check if a word matches the CEFR level filter
 */
export const matchesCefrLevel = (word, selectedCefrLevel) => {
  return selectedCefrLevel === "all" ||
    (word.cefr_level || word.cefrLevel) === selectedCefrLevel;
};

/**
 * Check if a word matches the difficulty filter
 */
export const matchesDifficulty = (word, selectedDifficulty) => {
  return selectedDifficulty === "all" || word.difficulty === selectedDifficulty;
};

/**
 * Check if a word matches the search term
 */
export const matchesSearch = (word, searchTerm) => {
  if (!searchTerm) return true;

  // Normalize search term and word for accent-insensitive matching
  const normalizedSearchTerm = normalizeText(searchTerm);
  const normalizedWord = normalizeText(word.word);
  const normalizedTranslation = word.translations?.[0]?.text
    ? normalizeText(word.translations[0].text)
    : "";

  return normalizedWord.includes(normalizedSearchTerm) ||
    normalizedTranslation.includes(normalizedSearchTerm);
};

/**
 * Filter words based on all criteria
 */
export const filterWords = (words, filters) => {
  const { searchTerm, selectedPartOfSpeech, selectedCefrLevel, selectedDifficulty } = filters;
  
  return words.filter((word) => {
    return (
      matchesSearch(word, searchTerm) &&
      matchesPartOfSpeech(word, selectedPartOfSpeech) &&
      matchesCefrLevel(word, selectedCefrLevel) &&
      matchesDifficulty(word, selectedDifficulty)
    );
  });
};

/**
 * Sort search results to prioritize exact matches
 */
export const sortSearchResults = (words, searchTerm) => {
  if (!searchTerm) return words;

  const normalizedSearchTerm = normalizeText(searchTerm);

  return words.sort((a, b) => {
    const aNormalized = normalizeText(a.word);
    const bNormalized = normalizeText(b.word);

    // Exact matches first
    const aExactMatch = aNormalized === normalizedSearchTerm;
    const bExactMatch = bNormalized === normalizedSearchTerm;

    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    // Then starts-with matches
    const aStartsWith = aNormalized.startsWith(normalizedSearchTerm);
    const bStartsWith = bNormalized.startsWith(normalizedSearchTerm);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    // Finally, regular alphabetical order
    return a.word.localeCompare(b.word, "fr-FR", {
      sensitivity: "base",
      numeric: true,
      caseFirst: "lower",
    });
  });
};

/**
 * Sort words by the specified criteria
 */
export const sortWords = (words, sortBy, sortOrder) => {
  return words.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "word":
        // Sort with proper French collation - base letters first, then accents as secondary sort
        comparison = a.word.localeCompare(b.word, "fr-FR", {
          sensitivity: "base",
          numeric: true,
          caseFirst: "lower",
        });
        break;
      case "partOfSpeech":
        comparison = a.partOfSpeech.localeCompare(b.partOfSpeech, "fr-FR");
        break;
      case "cefrLevel":
        const aLevel = a.cefr_level || a.cefrLevel || "";
        const bLevel = b.cefr_level || b.cefrLevel || "";
        comparison = aLevel.localeCompare(bLevel, "fr-FR");
        break;
      case "difficulty":
        comparison = (a.difficulty || "").localeCompare(
          b.difficulty || "",
          "fr-FR"
        );
        break;
      default:
        comparison = a.word.localeCompare(b.word, "fr-FR", {
          sensitivity: "base",
          numeric: true,
          caseFirst: "lower",
        });
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
};

/**
 * Apply filtering and sorting to words
 */
export const processWords = (words, filters, sortBy, sortOrder) => {
  let filtered = filterWords(words, filters);

  // Sort search results to prioritize exact matches
  if (filters.searchTerm) {
    filtered = sortSearchResults(filtered, filters.searchTerm);
  } else {
    // Apply general sorting only if not searching
    filtered = sortWords(filtered, sortBy, sortOrder);
  }

  return filtered;
};
