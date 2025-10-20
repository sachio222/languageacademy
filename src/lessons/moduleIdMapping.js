/**
 * Module ID to ModuleKey Mapping
 * Maps old numeric module IDs to their permanent moduleKeys
 * Used for migrating existing exercise completion data
 */

export const moduleIdToKeyMapping = {
  // Unit 1: Essential Grammar (before liaison-help insertion)
  1: "2024-01-01-famous-words",
  2: "2024-01-02-pronouns",
  3: "2024-01-03-etre",
  4: "2024-01-04-avoir",
  5: "2024-01-05-articles",
  6: "2024-01-06-basic-nouns",
  7: "2024-01-07-plurals",
  8: "2024-01-08-connectors", // This was shifted by liaison-help insertion
  9: "2024-01-09-reading1",
  10: "2024-01-10-unit1-practice",
  11: "2024-01-11-unit1-exam",

  // Unit 2: Asking & Describing
  12: "2024-01-12-demonstratives",
  13: "2024-01-13-ca-survival",
  14: "2024-01-14-determiners-nouns",
  15: "2024-01-15-vouloir",
  16: "2024-01-16-pouvoir",
  17: "2024-01-17-voir",
  18: "2024-01-18-questions",
  19: "2024-01-19-stressed-pronouns",
  20: "2024-01-20-prepositions",
  21: "2024-01-21-adjectives",
  22: "2024-01-22-reading2",
  23: "2024-01-23-unit2-practice",
  24: "2024-01-24-unit2-exam",

  // Unit 3: Movement & Possession
  25: "2024-01-25-contractions",
  26: "2024-01-26-venir",
  27: "2024-01-27-aller",
  28: "2024-01-28-verb-pattern-help",
  29: "2024-01-29-partir",
  30: "2024-01-30-object-pronouns",
  31: "2024-01-31-possessive-adjectives",
  32: "2024-02-01-possessive-pronouns",
  33: "2024-02-02-combining",
  34: "2024-02-03-reading3",
  35: "2024-02-04-unit3-practice",
  36: "2024-02-05-unit3-exam",

  // Add more mappings as needed for other units
  // This covers the critical modules that would be affected by the shift
};

/**
 * Get moduleKey from old numeric module ID
 * @param {number} moduleId - Old numeric module ID
 * @returns {string|null} moduleKey or null if not found
 */
export const getModuleKeyFromId = (moduleId) => {
  return moduleIdToKeyMapping[moduleId] || null;
};

/**
 * Convert old exercise ID to new moduleKey-based ID
 * @param {string} oldExerciseId - Old format: "8.1"
 * @returns {string|null} New format: "2024-01-08-connectors.1" or null if mapping not found
 */
export const convertExerciseId = (oldExerciseId) => {
  const [moduleIdStr, exerciseIndex] = oldExerciseId.split(".");
  const moduleId = parseInt(moduleIdStr);
  const moduleKey = getModuleKeyFromId(moduleId);

  if (!moduleKey || !exerciseIndex) {
    return null;
  }

  return `${moduleKey}.${exerciseIndex}`;
};

/**
 * Check if an exercise ID is in the old numeric format
 * @param {string} exerciseId - Exercise ID to check
 * @returns {boolean} True if old format (e.g., "8.1"), false if new format
 */
export const isOldFormatExerciseId = (exerciseId) => {
  return /^\d+\.\d+$/.test(exerciseId);
};
