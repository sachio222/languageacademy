/**
 * Module Key Mapper
 * Maps between module_key (permanent ID) and lesson id (changes with reordering)
 * 
 * Architecture:
 * - Database stores: module_key (permanent, like "2024-01-02-etre")
 * - Lessons have: id (changes when modules move) and moduleKey (permanent)
 * - This mapper provides lookup in both directions
 */

import { lessons } from '../lessons/lessonData';

/**
 * Get lesson ID from module_key
 * @param {string} moduleKey - Permanent module identifier (e.g., '2024-01-02-etre')
 * @returns {number|null} Current lesson ID or null
 */
export const getModuleIdFromKey = (moduleKey) => {
  const lesson = lessons.find(l => l.moduleKey === moduleKey);
  return lesson?.id || null;
};

/**
 * Get module_key from lesson ID
 * @param {number} lessonId - Current lesson ID
 * @returns {string|null} Permanent module_key or null
 */
export const getModuleKeyFromId = (lessonId) => {
  const lesson = lessons.find(l => l.id === lessonId);
  return lesson?.moduleKey || null;
};

/**
 * Get full lesson object from module_key
 * @param {string} moduleKey - Permanent module identifier
 * @returns {Object|null} Lesson object or null
 */
export const getLessonByModuleKey = (moduleKey) => {
  return lessons.find(l => l.moduleKey === moduleKey) || null;
};

/**
 * Get unit_id for a module_key
 * Determines which unit a module belongs to based on lesson ranges
 * @param {string} moduleKey - Permanent module identifier
 * @returns {string} Unit ID like "unit1", "unit3", etc.
 */
export const getUnitIdForModule = (moduleKey) => {
  const lesson = getLessonByModuleKey(moduleKey);
  if (!lesson) return null;
  
  const lessonId = lesson.id;
  
  // Import dynamically to avoid circular dependency
  const { generateDynamicUnitStructure } = require('../lessons/unitStructureGenerator');
  const unitStructure = generateDynamicUnitStructure(lessons);
  
  // Find which unit this lesson belongs to
  for (const unit of unitStructure) {
    const [start, end] = unit.lessonRange;
    if (lessonId >= start && lessonId <= end) {
      return `unit${unit.id}`;
    }
  }
  
  return null;
};

/**
 * Batch get module metadata from keys
 * @param {string[]} moduleKeys - Array of module_keys
 * @returns {Object[]} Array of {moduleKey, lessonId, title, unit_id}
 */
export const getModuleMetadataBatch = (moduleKeys) => {
  return moduleKeys.map(moduleKey => {
    const lesson = getLessonByModuleKey(moduleKey);
    return {
      module_key: moduleKey,
      lesson_id: lesson?.id || null,
      title: lesson?.title || 'Unknown Module',
      unit_id: getUnitIdForModule(moduleKey),
    };
  }).filter(m => m.lesson_id !== null);
};

/**
 * Create a mapping index for fast lookups
 * Use this for performance when mapping many modules
 */
export const createModuleKeyIndex = () => {
  const keyToId = {};
  const idToKey = {};
  
  lessons.forEach(lesson => {
    if (lesson.moduleKey && lesson.id) {
      keyToId[lesson.moduleKey] = lesson.id;
      idToKey[lesson.id] = lesson.moduleKey;
    }
  });
  
  return {
    keyToId,
    idToKey,
    getIdFromKey: (key) => keyToId[key] || null,
    getKeyFromId: (id) => idToKey[id] || null,
  };
};

