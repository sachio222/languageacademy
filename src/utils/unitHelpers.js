import { unitStructure } from '../lessons/lessonData';

/**
 * Get unit ID for a given lesson ID
 * @param {number} lessonId - The lesson ID
 * @returns {string} Unit ID (e.g., 'unit1', 'unit2', etc.)
 */
export const getUnitIdForLesson = (lessonId) => {
  if (!lessonId) return 'unknown';
  
  const lessonIdNum = parseInt(lessonId, 10);
  
  for (const unit of unitStructure) {
    const [start, end] = unit.lessonRange;
    if (lessonIdNum >= start && lessonIdNum <= end) {
      return unit.id;
    }
  }
  
  return 'unknown';
};

/**
 * Get unit information for a given lesson ID
 * @param {number} lessonId - The lesson ID
 * @returns {object|null} Unit object or null if not found
 */
export const getUnitForLesson = (lessonId) => {
  if (!lessonId) return null;
  
  const lessonIdNum = parseInt(lessonId, 10);
  
  for (const unit of unitStructure) {
    const [start, end] = unit.lessonRange;
    if (lessonIdNum >= start && lessonIdNum <= end) {
      return unit;
    }
  }
  
  return null;
};
