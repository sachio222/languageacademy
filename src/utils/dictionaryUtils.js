/**
 * Dictionary utility functions for data processing and normalization
 */

import { applyWordNormalizationRules } from './wordNormalizationRules';

/**
 * Normalize text for search (remove accents)
 */
export const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
};

/**
 * Merge words with the same text but different parts of speech
 */
export const mergeWords = (words) => {
  const mergedWords = [];
  const wordMap = new Map();

  words.forEach((word) => {
    const wordText = word.word.toLowerCase();
    if (!wordMap.has(wordText)) {
      // First occurrence - create the base entry
      const mergedEntry = {
        ...word,
        allPartsOfSpeech: [word.partOfSpeech],
        allTranslations: {
          [word.partOfSpeech]: word.translations || [],
        },
        allExamples: {
          [word.partOfSpeech]: word.examples || [],
        },
        allSources: [word.source],
      };
      wordMap.set(wordText, mergedEntry);
      mergedWords.push(mergedEntry);
    } else {
      // Merge with existing entry
      const existing = wordMap.get(wordText);

      if (!existing.allPartsOfSpeech.includes(word.partOfSpeech)) {
        existing.allPartsOfSpeech.push(word.partOfSpeech);
      }

      if (!existing.allTranslations[word.partOfSpeech]) {
        existing.allTranslations[word.partOfSpeech] = word.translations || [];
      }

      // Only add unique examples
      if (!existing.allExamples[word.partOfSpeech]) {
        const newExamples = word.examples || [];
        const existingExamples = Object.values(existing.allExamples).flat();

        // Filter out duplicates based on text content
        const uniqueExamples = newExamples.filter((newEx) => {
          const newText = typeof newEx === "string" ? newEx : newEx.text;
          return !existingExamples.some((existingEx) => {
            const existingText =
              typeof existingEx === "string" ? existingEx : existingEx.text;
            return existingText === newText;
          });
        });

        existing.allExamples[word.partOfSpeech] = uniqueExamples;
      }

      // Add source if not already present
      if (!existing.allSources.includes(word.source)) {
        existing.allSources.push(word.source);
      }

      // Preserve relationships from the entry with the most relationships
      if (
        word.relationships &&
        word.relationships.length > (existing.relationships?.length || 0)
      ) {
        existing.relationships = word.relationships;
      }

      if (
        word.examples &&
        word.examples.length > (existing.examples?.length || 0)
      ) {
        existing.examples = word.examples;
      }
      if (
        word.translations &&
        word.translations.length > (existing.translations?.length || 0)
      ) {
        existing.translations = word.translations;
      }
    }
  });

  return mergedWords;
};

/**
 * Apply word-specific normalization rules
 * Now uses configurable rules instead of hardcoded logic
 */
export const applyWordNormalization = (word) => {
  return applyWordNormalizationRules(word);
};

/**
 * Load and merge all dictionary data
 */
export const loadDictionaryData = (dictionaries) => {
  const words = [];
  dictionaries.forEach(({ name, data }) => {
    if (data instanceof Map) {
      data.forEach((entry, id) => {
        words.push({
          id,
          ...entry,
          language: entry.lang || entry.language,
          source: name,
        });
      });
    } else if (Array.isArray(data)) {
      data.forEach(([id, entry]) => {
        words.push({
          id,
          ...entry,
          language: entry.lang || entry.language,
          source: name,
        });
      });
    }
  });

  // Merge words with the same text but different parts of speech
  const mergedWords = mergeWords(words);

  // Apply normalization after merging
  mergedWords.forEach((word) => {
    applyWordNormalization(word);
  });

  return mergedWords;
};

/**
 * Generate unique options for filters
 */
export const generateFilterOptions = (allWords) => {
  const partOfSpeechOptions = [...new Set(allWords.map((word) => word.partOfSpeech))];
  const cefrLevelOptions = [
    ...new Set(
      allWords
        .map((word) => word.cefr_level || word.cefrLevel)
        .filter(Boolean)
    ),
  ];
  const difficultyOptions = [
    ...new Set(allWords.map((word) => word.difficulty).filter(Boolean)),
  ];

  return {
    partOfSpeechOptions: ["all", ...partOfSpeechOptions.sort()],
    cefrLevelOptions: ["all", ...cefrLevelOptions.sort()],
    difficultyOptions: ["all", ...difficultyOptions.sort()],
  };
};
