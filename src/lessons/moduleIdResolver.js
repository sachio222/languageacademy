/**
 * Module ID Resolver - Dynamic module numbering system
 * Uses permanent moduleKey to find current lesson IDs
 * No more hardcoded module numbers!
 */

import { lessons } from "./lessonData.js";

/**
 * Get current lesson ID for a module by its permanent moduleKey
 * @param {string} moduleKey - Permanent module identifier (e.g., '2024-01-15-pronouns')
 * @returns {number|string} Current lesson ID or 'UNKNOWN'
 */
export const getModuleId = (moduleKey) => {
  const lesson = lessons.find((l) => l.moduleKey === moduleKey);
  return lesson?.id || "UNKNOWN";
};

/**
 * Get module reference string with current ID
 * @param {string} moduleKey - Permanent module identifier
 * @returns {string} "Module 123" or "Module UNKNOWN"
 */
export const getModuleRef = (moduleKey) => {
  const id = getModuleId(moduleKey);
  return `Module ${id}`;
};

/**
 * Generate human-readable module key
 * Format: YYYY-MM-DD-descriptive-name
 * @param {string} date - Creation date (YYYY-MM-DD)
 * @param {string} name - Descriptive name (kebab-case)
 * @returns {string} Module key
 */
export const createModuleKey = (date, name) => {
  return `${date}-${name}`;
};

// Example usage in modules:
// import { getModuleRef } from '../../moduleIdResolver.js';
// `You learned this in ${getModuleRef('2024-01-15-pronouns')}`
