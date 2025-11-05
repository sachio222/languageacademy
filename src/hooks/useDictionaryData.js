import { useMemo, useState, useEffect } from 'react';
import { loadDictionaryData, generateFilterOptions } from '../utils/dictionaryUtils';
import { generateAllRelationships, createWordMaps } from '../utils/relationshipUtils';
import { supabase } from '../lib/supabase';
import { useSupabaseClient } from './useSupabaseClient';

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
 * Transform database entry to word object format
 * Creates the same structure as mergeWords() does for file-based entries
 */
const transformDbEntry = (dbEntry) => {
  const partOfSpeech = dbEntry.part_of_speech || 'unknown';
  const translations = dbEntry.translations || [];
  const examples = dbEntry.examples || [];
  
  return {
    id: dbEntry.id,
    lang: dbEntry.lang,
    language: dbEntry.lang,
    word: dbEntry.word,
    partOfSpeech: partOfSpeech,
    translations: translations,
    relationships: dbEntry.relationships || [],
    examples: examples,
    tags: dbEntry.tags || [],
    phonetic: dbEntry.phonetic || '',
    gender: dbEntry.gender,
    cefr_level: dbEntry.cefr_level,
    cefrLevel: dbEntry.cefr_level,
    unit: dbEntry.unit,
    module: dbEntry.module,
    lesson: dbEntry.lesson,
    etymology: dbEntry.etymology || '',
    usage_notes: dbEntry.usage_notes || '',
    register: dbEntry.register || [],
    regional_variants: dbEntry.regional_variants || [],
    sources: dbEntry.sources || [],
    verified: dbEntry.verified || false,
    cambridge_data: dbEntry.cambridge_data || null,
    definition: dbEntry.definition || '',
    infinitive: dbEntry.infinitive,
    conjugation_group: dbEntry.conjugation_group,
    adjective_position: dbEntry.adjective_position,
    difficulty: dbEntry.difficulty,
    verb_phrases: dbEntry.verb_phrases || [],
    conjugation: dbEntry.conjugation,
    noun_phrases: dbEntry.noun_phrases || [],
    noun_articles: dbEntry.noun_articles,
    adjective_phrases: dbEntry.adjective_phrases || [],
    adjective_forms: dbEntry.adjective_forms,
    frequency: dbEntry.frequency,
    redirect_to: dbEntry.redirect_to,
    redirect_type: dbEntry.redirect_type,
    base_word: dbEntry.base_word,
    source: 'cambridge', // All entries are from Cambridge
    
    // Create merged structures that DictionaryModal expects
    // This matches what mergeWords() does for file-based entries
    allPartsOfSpeech: [partOfSpeech],
    allTranslations: {
      [partOfSpeech]: translations
    },
    allExamples: {
      [partOfSpeech]: examples
    },
    allSources: dbEntry.sources || ['cambridge']
  };
};

/**
 * Load dictionary data from Supabase database
 */
const loadDictionaryDataFromDb = async (supabaseClient = null) => {
  if (dictionaryCache) {
    return dictionaryCache;
  }
  
  if (dictionaryLoadPromise) {
    return dictionaryLoadPromise;
  }
  
  dictionaryLoadPromise = (async () => {
    try {
      // Use provided client or default to anonymous client
      const client = supabaseClient || supabase;
      
      // Load all entries with pagination (Supabase has 1000 row limit)
      let allEntries = [];
      let from = 0;
      const pageSize = 1000;
      
      while (true) {
        const { data, error } = await client
          .from('dictionary_words')
          .select('*')
          .range(from, from + pageSize - 1)
          .order('id');
        
        if (error) {
          console.error('Error loading dictionary from database:', error);
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          // If RLS error, fallback to files immediately
          if (error.code === '42501' || error.message?.includes('permission denied') || error.message?.includes('row-level security')) {
            console.warn('RLS policy blocking access, falling back to files');
            throw new Error('RLS_POLICY_BLOCKED');
          }
          
          throw error;
        }
        
        if (!data || data.length === 0) {
          break;
        }
        
        allEntries = allEntries.concat(data);
        
        if (data.length < pageSize) {
          break;
        }
        
        from += pageSize;
      }
      
      console.log(`Loaded ${allEntries.length} entries from database`);
      
      if (allEntries.length === 0) {
        console.warn('No entries found in database, falling back to files');
        throw new Error('No dictionary entries found in database');
      }
      
      // Transform database entries to word objects
      let words = allEntries.map(transformDbEntry);
      
      // Merge words with same text but different parts of speech (like file-based system)
      // This ensures words with multiple meanings are properly merged
      // mergeWords() groups by word text (lowercase), so "a" (alphabet) and "a" (verb) will merge
      const { mergeWords } = await import('../utils/dictionaryUtils');
      words = mergeWords(words);
      
      console.log(`After merging: ${words.length} unique words (from ${allEntries.length} entries)`);
      
      // Create word maps for relationship generation
      const wordMaps = createWordMaps(words);
      
      // Generate relationships for each word
      const allWords = words.map(word => ({
        ...word,
        relationships: generateAllRelationships(word, wordMaps)
      }));
      
      dictionaryCache = allWords;
      return allWords;
    } catch (error) {
      console.error('Failed to load dictionary from database:', error);
      console.warn('Falling back to file-based loading...');
      
      // Fallback to file-based loading if database fails
      try {
        const { loadAllDictionaries } = await import('../data/dictionary/registry');
        const dictionaries = loadAllDictionaries();
        const mergedWords = loadDictionaryData(dictionaries);
        const wordMaps = createWordMaps(mergedWords);
        
        const allWords = mergedWords.map(word => ({
          ...word,
          relationships: generateAllRelationships(word, wordMaps)
        }));
        
        dictionaryCache = allWords;
        console.log(`Loaded ${allWords.length} entries from files (fallback)`);
        return allWords;
      } catch (fallbackError) {
        console.error('Fallback to files also failed:', fallbackError);
        throw fallbackError;
      }
    }
  })();
  
  return dictionaryLoadPromise;
};

/**
 * Lazy load dictionary data from files (legacy fallback)
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
 * Now loads from Supabase database with graceful fallback to files
 */
export const useDictionaryData = () => {
  const [allWords, setAllWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    let cancelled = false;
    
    // Load from database (with fallback to files)
    // Use authenticated client if available (may bypass RLS)
    loadDictionaryDataFromDb(supabaseClient).then(words => {
      if (!cancelled) {
        setAllWords(words);
        setIsLoading(false);
      }
    });
    
    return () => {
      cancelled = true;
    };
  }, [supabaseClient]);

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
