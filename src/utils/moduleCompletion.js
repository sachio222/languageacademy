/**
 * Unified Module Completion Service
 * Single source of truth for determining module completion status
 * 
 * Checks section_progress first (primary system), with fallback to
 * module_progress.completed_at for migrated/legacy data.
 */

import { getActiveSections, isSectionAvailable } from '../config/sectionRegistry';
import { lessons } from '../lessons/lessonData';
import { extractModuleId } from './progressSync';

// Passing score threshold (80%)
export const PASSING_SCORE = 80;

// Sections that require passing scores to be considered complete
export const SECTIONS_WITH_SCORES = [
  "speed-match",
  "practice-exercises",
  "exam-questions",
  "module-exam",
];

/**
 * Check if a section is truly complete:
 * - For sections with scores: Must have completed_at AND score >= 80%
 * - For other sections: Just needs completed_at
 * 
 * @param {string} sectionId - Section ID (e.g., 'speed-match', 'vocabulary-intro')
 * @param {Object} sectionData - Section data from section_progress table
 * @returns {boolean} True if section is complete
 */
export const isSectionComplete = (sectionId, sectionData) => {
  if (!sectionData?.completed_at) return false;

  // Check if this section type requires a passing score
  if (SECTIONS_WITH_SCORES.includes(sectionId)) {
    // Extract score/accuracy from progress_data JSONB field
    let percentage = 0;
    if (sectionData.progress_data) {
      const progressData =
        typeof sectionData.progress_data === "string"
          ? JSON.parse(sectionData.progress_data)
          : sectionData.progress_data;
      // Speed Match uses 'accuracy', exams might use 'score' or 'percentage'
      percentage =
        progressData?.accuracy ||
        progressData?.percentage ||
        progressData?.score ||
        0;
    }
    return percentage >= PASSING_SCORE;
  }

  // Non-scored sections just need completed_at
  return true;
};

/**
 * Get module completion status using unified logic
 * 
 * @param {Object} lesson - Lesson object
 * @param {Object} sectionProgress - Section progress data (module_key -> section_id -> data)
 * @param {Object} moduleProgress - Module progress data (module_key -> data)
 * @returns {Object} { isComplete: boolean, percentage: number, completedCount: number, totalCount: number }
 */
export const getModuleCompletionStatus = (lesson, sectionProgress, moduleProgress) => {
  if (!lesson) {
    return { isComplete: false, percentage: 0, completedCount: 0, totalCount: 0 };
  }

  const moduleId = extractModuleId(lesson);
  const moduleSectionProgress = sectionProgress?.[moduleId] || {};
  const modProgress = moduleProgress?.[moduleId];

  // Get all sections available for this lesson
  const allSections = getActiveSections();
  const availableSections = allSections.filter(section => 
    isSectionAvailable(section.id, lesson) && 
    !section.isSpecial && 
    !section.comingSoon
  );

  // If no sections available, fall back to module_progress.completed_at
  if (availableSections.length === 0) {
    const isComplete = modProgress?.completed_at !== null;
    return {
      isComplete,
      percentage: isComplete ? 100 : 0,
      completedCount: isComplete ? 1 : 0,
      totalCount: 1,
      source: 'module_progress'
    };
  }

  // Check section-based completion (primary system)
  let completedSections = 0;
  let totalSections = 0;

  for (const section of availableSections) {
    totalSections++;
    const sectionData = moduleSectionProgress[section.id];
    
    if (isSectionComplete(section.id, sectionData)) {
      completedSections++;
    }
  }

  // If all sections are complete, module is complete
  const isComplete = totalSections > 0 && completedSections === totalSections;

  // If not complete via sections, check fallback to module_progress.completed_at
  // (for migrated data where sections might not be tracked)
  if (!isComplete && modProgress?.completed_at) {
    return {
      isComplete: true,
      percentage: 100,
      completedCount: totalSections,
      totalCount: totalSections,
      source: 'module_progress_fallback'
    };
  }

  return {
    isComplete,
    percentage: totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0,
    completedCount: completedSections,
    totalCount: totalSections,
    source: 'section_progress'
  };
};

/**
 * Get completion percentage for a lesson (0-100)
 * Convenience wrapper around getModuleCompletionStatus
 */
export const getModuleCompletionPercentage = (lesson, sectionProgress, moduleProgress) => {
  return getModuleCompletionStatus(lesson, sectionProgress, moduleProgress).percentage;
};

/**
 * Check if a module is complete
 * Convenience wrapper around getModuleCompletionStatus
 */
export const isModuleComplete = (lesson, sectionProgress, moduleProgress) => {
  return getModuleCompletionStatus(lesson, sectionProgress, moduleProgress).isComplete;
};

/**
 * Get exercise count for different module types
 * Used for display purposes (not for completion determination)
 */
export const getExerciseCount = (lesson) => {
  if (lesson.isFillInTheBlank && lesson.sentences) {
    return lesson.sentences.length;
  }
  if (lesson.isUnitExam && lesson.exerciseConfig?.items) {
    return lesson.exerciseConfig.items.length;
  }
  if (lesson.isHelpModule) {
    // Help modules are considered "1 exercise" for completion purposes
    return 1;
  }
  return lesson.exercises?.length || 0;
};

/**
 * Parse sections_detail JSONB field (handles both string and object formats)
 * 
 * @param {string|Object} sectionsDetail - Sections detail from database
 * @returns {Object} Parsed sections object { sectionId: { data } }
 */
export const parseSectionsDetail = (sectionsDetail) => {
  if (!sectionsDetail) return {};
  
  if (typeof sectionsDetail === 'string') {
    try {
      return JSON.parse(sectionsDetail);
    } catch (error) {
      console.warn('Failed to parse sections_detail:', error);
      return {};
    }
  }
  
  return sectionsDetail;
};

/**
 * Get module completion status from sections_detail (for report card components)
 * This is a convenience function for components that receive sections_detail from ProgressService
 * 
 * @param {Object} module - Module object with sections_detail field
 * @param {Object} lesson - Lesson object (optional, for determining available sections)
 * @returns {Object} { isComplete: boolean, percentage: number, completedCount: number, totalCount: number, lastCompletedDate: Date|null }
 */
export const getModuleCompletionFromSectionsDetail = (module, lesson = null) => {
  if (!module?.sections_detail) {
    return { 
      isComplete: false, 
      percentage: 0, 
      completedCount: 0, 
      totalCount: 0, 
      lastCompletedDate: null 
    };
  }
  
  const sections = parseSectionsDetail(module.sections_detail);
  const sectionEntries = Object.entries(sections);
  
  if (sectionEntries.length === 0) {
    return { 
      isComplete: false, 
      percentage: 0, 
      completedCount: 0, 
      totalCount: 0, 
      lastCompletedDate: null 
    };
  }
  
  // Count only sections that meet completion criteria (including passing scores)
  const completedSections = sectionEntries.filter(([sectionId, data]) => 
    isSectionComplete(sectionId, data)
  );
  
  const percentage = Math.round((completedSections.length / sectionEntries.length) * 100);
  const isComplete = percentage === 100;
  
  // Get most recent completion date from truly completed sections
  const lastCompletedDate = completedSections.length > 0
    ? completedSections.reduce((latest, [_, data]) => {
        const sectionDate = new Date(data.completed_at);
        return sectionDate > latest ? sectionDate : latest;
      }, new Date(0))
    : null;
  
  return {
    isComplete,
    percentage,
    completedCount: completedSections.length,
    totalCount: sectionEntries.length,
    lastCompletedDate
  };
};

