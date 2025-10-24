import { useState, useMemo, useEffect } from "react";
import { alphabet } from "../data/dictionary/words/alphabet";
import { adjectivesCambridge } from "../data/dictionary/words/cambridge/adjectives";
import { adverbsCambridge } from "../data/dictionary/words/cambridge/adverbs";
import { articlesCambridge } from "../data/dictionary/words/cambridge/articles";
import { conjunctionsCambridge } from "../data/dictionary/words/cambridge/conjunctions";
import { expressionsCambridge } from "../data/dictionary/words/cambridge/expressions";
import { interjectionsCambridge } from "../data/dictionary/words/cambridge/interjections";
import { interrogativesCambridge } from "../data/dictionary/words/cambridge/interrogatives";
import { nounsCambridge } from "../data/dictionary/words/cambridge/nouns";
import { prepositionsCambridge } from "../data/dictionary/words/cambridge/prepositions";
import { pronounsCambridge } from "../data/dictionary/words/cambridge/pronouns";
import { verbsCambridge } from "../data/dictionary/words/cambridge/verbs";

export const useDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState("all");
  const [selectedCefrLevel, setSelectedCefrLevel] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("word");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedWord, setSelectedWord] = useState(null);

  // Load and merge all dictionary data
  const allWords = useMemo(() => {
    console.log("DictionaryModal: allWords useMemo is running");
    const dictionaries = [
      { name: "alphabet", data: alphabet },
      { name: "adjectives", data: adjectivesCambridge },
      { name: "adverbs", data: adverbsCambridge },
      { name: "articles", data: articlesCambridge },
      { name: "conjunctions", data: conjunctionsCambridge },
      { name: "expressions", data: expressionsCambridge },
      { name: "interjections", data: interjectionsCambridge },
      { name: "interrogatives", data: interrogativesCambridge },
      { name: "nouns", data: nounsCambridge },
      { name: "prepositions", data: prepositionsCambridge },
      { name: "pronouns", data: pronounsCambridge },
      { name: "verbs", data: verbsCambridge },
    ];

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

        console.log(
          `Merging ${word.word}: existing=${existing.allPartsOfSpeech}, new=${word.partOfSpeech}`
        );

        if (!existing.allPartsOfSpeech.includes(word.partOfSpeech)) {
          existing.allPartsOfSpeech.push(word.partOfSpeech);
          console.log(
            `Added part of speech ${word.partOfSpeech} to ${word.word}`
          );
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

    // Apply normalization after merging
    mergedWords.forEach((word) => {
      if (word.allPartsOfSpeech) {
        if (word.word === "leur") {
          word.allPartsOfSpeech = word.allPartsOfSpeech.map((pos, index) => {
            const source = word.allSources[index];
            if (source === "pronouns" && pos === "noun") {
              return "pronoun";
            }
            return pos;
          });
        } else if (["meilleur", "même", "orange"].includes(word.word)) {
          word.allPartsOfSpeech = word.allPartsOfSpeech.map((pos, index) => {
            const source = word.allSources[index];
            if (source === "adjectives" && pos === "noun") {
              return "adjective";
            }
            return pos;
          });
        } else if (word.word === "savoir") {
          word.allPartsOfSpeech = word.allPartsOfSpeech.map((pos, index) => {
            const source = word.allSources[index];
            if (source === "verbs" && pos === "noun") {
              return "verb";
            }
            return pos;
          });
        }
        word.partOfSpeech = word.allPartsOfSpeech[0];
      }
    });

    // Debug merged words
    const leurEntry = mergedWords.find((w) => w.word === "leur");
    if (leurEntry) {
      console.log("Leur entry after merging and normalization:", {
        word: leurEntry.word,
        partOfSpeech: leurEntry.partOfSpeech,
        allPartsOfSpeech: leurEntry.allPartsOfSpeech,
        allTranslations: leurEntry.allTranslations,
        allExamples: leurEntry.allExamples,
      });
    }

    return mergedWords;
  }, []);

  // Generate unique options for filters
  const partOfSpeechOptions = useMemo(() => {
    const uniqueParts = [...new Set(allWords.map((word) => word.partOfSpeech))];
    return ["all", ...uniqueParts.sort()];
  }, [allWords]);

  const cefrLevelOptions = useMemo(() => {
    const uniqueLevels = [
      ...new Set(
        allWords
          .map((word) => word.cefr_level || word.cefrLevel)
          .filter(Boolean)
      ),
    ];
    return ["all", ...uniqueLevels.sort()];
  }, [allWords]);

  const difficultyOptions = useMemo(() => {
    const uniqueDifficulties = [
      ...new Set(allWords.map((word) => word.difficulty).filter(Boolean)),
    ];
    return ["all", ...uniqueDifficulties.sort()];
  }, [allWords]);

  // Helper function to normalize text for search (remove accents)
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
  };

  // Filter and sort words
  const filteredWords = useMemo(() => {
    let filtered = allWords.filter((word) => {
      if (searchTerm === "") {
        const matchesPartOfSpeech =
          selectedPartOfSpeech === "all" ||
          word.partOfSpeech === selectedPartOfSpeech ||
          (word.allPartsOfSpeech &&
            word.allPartsOfSpeech.includes(selectedPartOfSpeech));

        const matchesCefrLevel =
          selectedCefrLevel === "all" ||
          (word.cefr_level || word.cefrLevel) === selectedCefrLevel;

        const matchesDifficulty =
          selectedDifficulty === "all" ||
          word.difficulty === selectedDifficulty;

        return matchesPartOfSpeech && matchesCefrLevel && matchesDifficulty;
      }

      // Normalize search term and word for accent-insensitive matching
      const normalizedSearchTerm = normalizeText(searchTerm);
      const normalizedWord = normalizeText(word.word);
      const normalizedTranslation = word.translations?.[0]?.text
        ? normalizeText(word.translations[0].text)
        : "";

      const matchesSearch =
        normalizedWord.includes(normalizedSearchTerm) ||
        normalizedTranslation.includes(normalizedSearchTerm);

      const matchesPartOfSpeech =
        selectedPartOfSpeech === "all" ||
        word.partOfSpeech === selectedPartOfSpeech ||
        (word.allPartsOfSpeech &&
          word.allPartsOfSpeech.includes(selectedPartOfSpeech));

      const matchesCefrLevel =
        selectedCefrLevel === "all" ||
        (word.cefr_level || word.cefrLevel) === selectedCefrLevel;

      const matchesDifficulty =
        selectedDifficulty === "all" || word.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesPartOfSpeech &&
        matchesCefrLevel &&
        matchesDifficulty
      );
    });

    // Sort search results to prioritize exact matches
    if (searchTerm) {
      const normalizedSearchTerm = normalizeText(searchTerm);

      filtered.sort((a, b) => {
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
    }

    // Apply general sorting only if not searching (search results are already sorted)
    if (!searchTerm) {
      filtered.sort((a, b) => {
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
    }

    return filtered;
  }, [
    allWords,
    searchTerm,
    selectedPartOfSpeech,
    selectedCefrLevel,
    selectedDifficulty,
    sortBy,
    sortOrder,
  ]);

  // Auto-select first word when filters change or modal opens
  useEffect(() => {
    if (filteredWords.length > 0) {
      setSelectedWord(filteredWords[0]);
    } else {
      setSelectedWord(null);
    }
  }, [filteredWords]);

  return {
    // State
    searchTerm,
    selectedPartOfSpeech,
    selectedCefrLevel,
    selectedDifficulty,
    sortBy,
    sortOrder,
    selectedWord,

    // Setters
    setSearchTerm,
    setSelectedPartOfSpeech,
    setSelectedCefrLevel,
    setSelectedDifficulty,
    setSortBy,
    setSortOrder,
    setSelectedWord,

    // Computed values
    allWords,
    filteredWords,
    partOfSpeechOptions,
    cefrLevelOptions,
    difficultyOptions,
  };
};
