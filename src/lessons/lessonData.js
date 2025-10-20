/**
 * Lesson Data - Main entry point
 * Import modules and build lessons automatically
 *
 * TO ADD A NEW MODULE:
 * 1. Create a new file in /modules/moduleX-name.js
 * 2. Import it here
 * 3. Add to moduleConfigs array
 * That's it!
 */

import { buildLesson } from "./moduleBuilder.js";

// Import unit-based configuration system
import { getModuleConfigs, generateUnitStructure } from "./unitConfigLoader.js";

// Auto-assemble module configurations from unit configs
// This maintains pedagogical order but from distributed unit files
// Auto-assembled from unit configs - no more massive array to maintain!
const moduleConfigs = getModuleConfigs();

// Build all lessons from configs
// IDs and module numbers are assigned dynamically based on array position (1-indexed)
const allLessons = moduleConfigs.map((config, index) => {
  const moduleId = index + 1;
  const lesson = buildLesson(config, moduleId); // Pass module number

  // Determine if this is a reference module by checking which unit it belongs to
  const unitStructureTemp = generateUnitStructure();
  const referenceUnit = unitStructureTemp.find((u) => u.isReference);
  const isReferenceModule =
    referenceUnit &&
    moduleId >= referenceUnit.lessonRange[0] &&
    moduleId <= referenceUnit.lessonRange[1];

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  let finalTitle = lesson.title;

  if (isReferenceModule && referenceUnit) {
    // Reference modules use Roman numerals
    const romanIndex = moduleId - referenceUnit.lessonRange[0];
    finalTitle = `Reference ${romanNumerals[romanIndex]}: ${config.title}`;
  } else {
    // Regular modules get "Module ##:" prefix
    finalTitle = `Module ${moduleId}: ${lesson.title}`;
  }

  // Set dynamic ID and update exercise IDs to match
  return {
    ...lesson,
    id: moduleId,
    title: finalTitle,
    exercises: lesson.exercises.map((ex, exIdx) => ({
      ...ex,
      id: `${config.moduleKey}.${exIdx + 1}`, // Use stable moduleKey instead of shifting moduleId
      displayNumber: exIdx + 1, // User-friendly exercise number (1, 2, 3, etc.)
    })),
  };
});

// Dynamic unit structure - automatically calculated from unit configs
// No more manual range maintenance! Adding/removing modules updates ranges automatically
export const unitStructure = generateUnitStructure();

// Export flat list of lessons for backward compatibility
export const lessons = allLessons;

// Helper functions
export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getExerciseById(lessonId, exerciseId) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return null;
  return lesson.exercises.find((ex) => ex.id === exerciseId);
}
