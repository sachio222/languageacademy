/**
 * Dictionary registry - DEPRECATED
 * Cambridge dictionaries moved to Supabase database
 */

// DEPRECATED: No longer importing cambridge files
// import * as CambridgeDictionaries from './words/cambridge';

/**
 * Load all dictionaries - DEPRECATED (returns empty array)
 * All dictionary data now loaded from Supabase database via useDictionary hook
 */
export const loadAllDictionaries = () => {
  return []; // Empty - using database instead
};
