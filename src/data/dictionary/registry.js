/**
 * Dictionary registry using cambridge index file
 * Dynamically derives dictionary names from object keys
 */

import * as CambridgeDictionaries from './words/cambridge';

/**
 * Load all dictionaries synchronously
 * Dynamically creates dictionary entries from CambridgeDictionaries object
 */
export const loadAllDictionaries = () => {
  return Object.entries(CambridgeDictionaries)
    .map(([key, data]) => {
      // Convert camelCase to kebab-case for dictionary names
      const name = key.replace(/([A-Z])/g, '-$1').toLowerCase().replace('cambridge-', '');
      return { name, data };
    })
    .filter(({ data }) => data); // Filter out any undefined data
};
