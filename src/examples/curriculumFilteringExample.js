/**
 * Curriculum Filtering Examples
 * Demonstrates how to use the Word Data API to filter by curriculum structure
 */

import * as wordDataApi from '../api/wordDataApi';

// Example 1: Get all words from Unit 1
export const getUnit1Words = async () => {
  try {
    const results = await wordDataApi.getWordsByUnit('unit1', { limit: 20 });
    console.log(`Unit 1 has ${results.total} words:`, results.words);
    return results;
  } catch (error) {
    console.error('Failed to get Unit 1 words:', error);
  }
};

// Example 2: Get all verbs from Unit 2
export const getUnit2Verbs = async () => {
  try {
    const results = await wordDataApi.searchWords('', {
      unit: 'unit2',
      partOfSpeech: 'verb',
      limit: 50
    });
    console.log(`Unit 2 has ${results.total} verbs:`, results.words);
    return results;
  } catch (error) {
    console.error('Failed to get Unit 2 verbs:', error);
  }
};

// Example 3: Get words from a specific module
export const getPronounsModuleWords = async () => {
  try {
    const results = await wordDataApi.getWordsByModule('2024-01-01-pronouns');
    console.log(`Pronouns module has ${results.total} words:`, results.words);
    return results;
  } catch (error) {
    console.error('Failed to get pronouns module words:', error);
  }
};

// Example 4: Get all available units with word counts
export const getAllUnits = async () => {
  try {
    const units = await wordDataApi.getAvailableUnits();
    console.log('Available units:', units);
    return units;
  } catch (error) {
    console.error('Failed to get available units:', error);
  }
};

// Example 5: Get all available modules with word counts
export const getAllModules = async () => {
  try {
    const modules = await wordDataApi.getAvailableModules();
    console.log('Available modules:', modules);
    return modules;
  } catch (error) {
    console.error('Failed to get available modules:', error);
  }
};

// Example 6: Complex filtering - Unit 3 verbs with A1 level
export const getUnit3A1Verbs = async () => {
  try {
    const results = await wordDataApi.searchWords('', {
      unit: 'unit3',
      partOfSpeech: 'verb',
      cefrLevel: 'A1',
      limit: 30
    });
    console.log(`Unit 3 A1 verbs: ${results.total} found`, results.words);
    return results;
  } catch (error) {
    console.error('Failed to get Unit 3 A1 verbs:', error);
  }
};

// Example 7: Search within a specific unit
export const searchInUnit1 = async (searchTerm) => {
  try {
    const results = await wordDataApi.searchWords(searchTerm, {
      unit: 'unit1',
      limit: 10
    });
    console.log(`Search "${searchTerm}" in Unit 1: ${results.total} found`, results.words);
    return results;
  } catch (error) {
    console.error(`Failed to search "${searchTerm}" in Unit 1:`, error);
  }
};

// Example 8: Get curriculum statistics
export const getCurriculumStats = async () => {
  try {
    const [units, modules, lessons] = await Promise.all([
      wordDataApi.getAvailableUnits(),
      wordDataApi.getAvailableModules(),
      wordDataApi.getAvailableLessons()
    ]);

    const stats = {
      totalUnits: units.length,
      totalModules: modules.length,
      totalLessons: lessons.length,
      totalWords: units.reduce((sum, unit) => sum + unit.count, 0),
      unitsByWordCount: units.sort((a, b) => b.count - a.count),
      modulesByWordCount: modules.sort((a, b) => b.count - a.count)
    };

    console.log('Curriculum Statistics:', stats);
    return stats;
  } catch (error) {
    console.error('Failed to get curriculum stats:', error);
  }
};

// Example 9: Get words by multiple criteria
export const getAdvancedFilteredWords = async () => {
  try {
    const results = await wordDataApi.searchWords('', {
      unit: 'unit4',
      partOfSpeech: 'noun',
      cefrLevel: 'A1',
      difficulty: '1',
      limit: 25
    });
    console.log('Advanced filtered words:', results);
    return results;
  } catch (error) {
    console.error('Failed to get advanced filtered words:', error);
  }
};

// Example 10: Get words from multiple units
export const getWordsFromMultipleUnits = async (unitIds) => {
  try {
    const allResults = await Promise.all(
      unitIds.map(unitId => 
        wordDataApi.getWordsByUnit(unitId, { limit: 100 })
      )
    );

    const combinedWords = allResults.reduce((acc, result) => {
      return [...acc, ...result.words];
    }, []);

    console.log(`Words from units ${unitIds.join(', ')}:`, combinedWords);
    return combinedWords;
  } catch (error) {
    console.error('Failed to get words from multiple units:', error);
  }
};

// Usage examples:
export const runExamples = async () => {
  console.log('=== Curriculum Filtering Examples ===\n');

  // Get basic unit data
  await getUnit1Words();
  await getUnit2Verbs();
  await getPronounsModuleWords();

  // Get curriculum structure
  await getAllUnits();
  await getAllModules();

  // Advanced filtering
  await getUnit3A1Verbs();
  await searchInUnit1('être');
  await getAdvancedFilteredWords();

  // Statistics
  await getCurriculumStats();

  // Multiple units
  await getWordsFromMultipleUnits(['unit1', 'unit2']);
};
