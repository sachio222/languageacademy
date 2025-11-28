/**
 * Progress Service - Centralized data fetching for student progress
 * Provides clean separation between data layer and UI components
 *
 * Following SOLID principles:
 * - Single Responsibility: Each method fetches one type of data
 * - Dependency Injection: Accepts supabaseClient as dependency
 * - Interface Segregation: Small, focused methods
 */

import { logger } from "../utils/logger";
import { lessons } from "../lessons/lessonData";
import { generateDynamicUnitStructure } from "../lessons/unitStructureGenerator";
import { isSectionComplete } from "../utils/moduleCompletion";

export class ProgressService {
  constructor(supabaseClient) {
    this.client = supabaseClient;
  }

  /**
   * Get hero stats (total time, streak, accuracy, words learned)
   * @param {string} userId - User UUID
   * @returns {Promise<Object>} Hero stats object
   */
  async getHeroStats(userId) {
    try {
      // Query tables directly - no RPC needed
      // Use section_progress as single source of truth for study time
      const [profileResult, exercisesResult, modulesResult, sectionsResult] =
        await Promise.all([
          this.client
            .from("user_profiles")
            .select("streak_days")
            .eq("id", userId)
            .single(),

          this.client
            .from("exercise_completions")
            .select("is_correct")
            .eq("user_id", userId),

          this.client
            .from("module_progress")
            .select("module_key, time_spent_seconds, completed_at")
            .eq("user_id", userId)
            .not("completed_at", "is", null),

          // Calculate total study time from section_progress (single source of truth)
          // For migrated data, fall back to module_progress.time_spent_seconds
          this.client
            .from("section_progress")
            .select("time_spent_seconds, module_key")
            .eq("user_id", userId),
        ]);

      const profile = profileResult.data;
      const exercises = exercisesResult.data || [];
      const completedModules = modulesResult.data || [];
      const sections = sectionsResult.data || [];

      // Calculate total study time - use section time if available, otherwise module time
      const sectionTimeByModule = {};
      sections.forEach((section) => {
        if (!sectionTimeByModule[section.module_key]) {
          sectionTimeByModule[section.module_key] = 0;
        }
        sectionTimeByModule[section.module_key] +=
          section.time_spent_seconds || 0;
      });

      // For each completed module, use section time if > 0, otherwise fall back to module time
      let totalStudyTime = 0;
      completedModules.forEach((module) => {
        const sectionTime = sectionTimeByModule[module.module_key] || 0;
        const moduleTime = module.time_spent_seconds || 0;
        totalStudyTime += sectionTime > 0 ? sectionTime : moduleTime;
      });

      // Calculate accuracy
      const correctCount = exercises.filter((e) => e.is_correct).length;
      const accuracy =
        exercises.length > 0
          ? Math.round((correctCount / exercises.length) * 100)
          : 0;

      const stats = {
        total_study_time: totalStudyTime, // Section-based calculation (single source of truth)
        streak_days: profile?.streak_days || 0,
        accuracy,
        words_learned: completedModules.length * 10, // Approximate
        modules_completed: completedModules.length,
        exercises_completed: exercises.length,
      };

      logger.log("[ProgressService] Fetched hero stats", { userId, stats });
      return stats;
    } catch (error) {
      logger.error("[ProgressService] Error fetching hero stats:", error);
      throw error;
    }
  }

  /**
   * Get unit-level progress summary
   * @param {string} userId - User UUID
   * @returns {Promise<Array>} Array of unit progress objects
   */
  async getUnitProgress(userId) {
    try {
      // Query module_progress directly and aggregate by unit_id
      const { data: modules, error } = await this.client
        .from("module_progress")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      // Pre-check which modules have section activity to avoid creating empty units
      const moduleKeys = (modules || []).map((m) => m.module_key);
      let sectionsData = [];

      if (moduleKeys.length > 0) {
        const { data: sections, error: sectionsError } = await this.client
          .from("section_progress")
          .select("module_key, time_spent_seconds")
          .eq("user_id", userId)
          .in("module_key", moduleKeys);

        if (sectionsError) throw sectionsError;
        sectionsData = sections || [];
      }

      // Calculate which modules have section activity
      const modulesSectionTime = {};
      sectionsData.forEach((section) => {
        if (!modulesSectionTime[section.module_key]) {
          modulesSectionTime[section.module_key] = 0;
        }
        modulesSectionTime[section.module_key] +=
          section.time_spent_seconds || 0;
      });

      // Include modules with section activity OR completed modules (for migrated data)
      const modulesWithActivity = (modules || []).filter((module) => {
        const hasSectionTime = modulesSectionTime[module.module_key] > 0;
        const isCompleted = module.completed_at !== null;
        return hasSectionTime || isCompleted;
      });

      // Also fetch section progress to calculate section-based completion
      const { data: allSections, error: allSectionsError } = await this.client
        .from("section_progress")
        .select("module_key, section_id, completed_at, progress_data")
        .eq("user_id", userId);

      if (allSectionsError) throw allSectionsError;

      // Group sections by module_key for completion calculations
      const sectionsByModuleKey = {};
      (allSections || []).forEach((section) => {
        if (!sectionsByModuleKey[section.module_key]) {
          sectionsByModuleKey[section.module_key] = [];
        }
        sectionsByModuleKey[section.module_key].push(section);
      });

      // Group by unit_id and aggregate (only modules with section activity)
      const unitMap = {};
      const unitStructure = generateDynamicUnitStructure(lessons);

      // Process user's module progress and initialize units as needed
      modulesWithActivity.forEach((module) => {
        const unitId = module.unit_id;

        // Initialize unit if not already done (only for units with activity)
        if (!unitMap[unitId]) {
          const unitInfo = unitStructure.find(
            (u) => u.id.toString() === unitId
          );
          if (!unitInfo) {
            logger.warn("[ProgressService] Module with unknown unit_id:", {
              module_key: module.module_key,
              unit_id: unitId,
            });
            return;
          }

          const [startLesson, endLesson] = unitInfo.lessonRange;
          const totalModulesInUnit = endLesson - startLesson + 1;

          unitMap[unitId] = {
            unit_id: unitId,
            total_modules: totalModulesInUnit, // Actual total from lesson structure
            completed_modules: 0,
            total_time_spent: 0,
            section_stats: { total_sections: 0, completed_sections: 0 },
          };
        }

        const moduleSections = sectionsByModuleKey[module.module_key] || [];

        // Count only sections that meet completion criteria (including passing scores)
        const completedSections = moduleSections.filter((s) =>
          isSectionComplete(s.section_id, s)
        );

        // Module is "completed" if ALL its sections are completed (100%) with passing scores
        const moduleIsComplete =
          moduleSections.length > 0 &&
          completedSections.length === moduleSections.length;

        // Only increment completed_modules count, total_modules already set from structure
        if (moduleIsComplete) {
          unitMap[unitId].completed_modules += 1;
        }
        // Sum time for unit totals - use section time if available, otherwise module time (for migrated data)
        const moduleSectionTime = modulesSectionTime[module.module_key] || 0;
        const timeToAdd =
          moduleSectionTime > 0
            ? moduleSectionTime
            : module.time_spent_seconds || 0;
        unitMap[unitId].total_time_spent += timeToAdd;
      });

      // Return units with calculated section-based time
      const units = Object.values(unitMap)
        .map((unit) => ({
          ...unit,
          completion_percentage:
            unit.total_modules > 0
              ? Math.round((unit.completed_modules / unit.total_modules) * 100)
              : 0,
        }))
        .filter((unit) => {
          // Only show units that have modules (after filtering for section activity)
          return unit.total_modules > 0;
        });

      logger.log("[ProgressService] Fetched unit progress", {
        userId,
        unitCount: units.length,
      });

      return units;
    } catch (error) {
      logger.error("[ProgressService] Error fetching unit progress:", error);
      throw error;
    }
  }

  /**
   * Get detailed module progress for a specific unit
   * @param {string} userId - User UUID
   * @param {string} unitId - Unit identifier (e.g., '1', '3', 'unit1')
   * @returns {Promise<Array>} Array of module objects with section details
   */
  async getUnitModules(userId, unitId) {
    try {
      // Normalize unit_id - handle both "1" and "unit1" formats
      const normalizedUnitId = unitId.toString().replace("unit", "");

      // Query module_progress directly
      const { data: modules, error: modulesError } = await this.client
        .from("module_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("unit_id", normalizedUnitId);

      if (modulesError) throw modulesError;

      // Fetch section progress for these modules
      const moduleKeys = (modules || []).map((m) => m.module_key);

      let sectionsData = [];
      if (moduleKeys.length > 0) {
        const { data: sections, error: sectionsError } = await this.client
          .from("section_progress")
          .select("*")
          .eq("user_id", userId)
          .in("module_key", moduleKeys);

        if (sectionsError) throw sectionsError;
        sectionsData = sections || [];
      }

      // Aggregate sections by module_key
      const sectionsByModule = {};
      sectionsData.forEach((section) => {
        if (!sectionsByModule[section.module_key]) {
          sectionsByModule[section.module_key] = {};
        }
        sectionsByModule[section.module_key][section.section_id] = {
          completed_at: section.completed_at,
          time_spent: section.time_spent_seconds,
          progress_data: section.progress_data,
        };
      });

      // Enrich modules with section data and hierarchical time calculation
      const enrichedModules = (modules || [])
        .map((module) => {
          const moduleSections = sectionsByModule[module.module_key] || {};
          const sectionTimes = Object.values(moduleSections);

          // Calculate total section time
          const totalSectionTime = sectionTimes.reduce(
            (sum, section) => sum + (section.time_spent || 0),
            0
          );

          // Migration support: Fall back to module time when section times are all 0
          // This indicates migrated data where section-level time is N/A
          const hasSectionTimeData = totalSectionTime > 0;
          const displayTime = hasSectionTimeData
            ? totalSectionTime
            : module.time_spent_seconds || 0;

          return {
            ...module,
            sections_detail: moduleSections,
            sections_completed: sectionTimes.filter((s) => s.completed_at)
              .length,
            total_sections: sectionTimes.length,
            // Use section time if available, otherwise fall back to module time
            time_spent_seconds: displayTime,
            // Keep original module time for debugging/comparison (LEGACY)
            module_time_original: module.time_spent_seconds,
            // Indicate time source for display
            time_source: hasSectionTimeData ? "sections" : "module",
            // LEGACY FIELDS BELOW - Not used in Enhanced Report Card
            // Kept for backward compatibility with old components
            _legacy_completion_percentage:
              module.total_exercises > 0
                ? Math.round(
                    (module.completed_exercises / module.total_exercises) * 100
                  )
                : 0,
            _legacy_completed_at: module.completed_at,
          };
        })
        .filter((module) => {
          // Show modules with either section activity OR module completion (for migrated data)
          return module.time_spent_seconds > 0 || module.completed_at !== null;
        })
        .sort((a, b) => {
          // Sort by lesson order (same as nav)
          const lessonA = lessons.find((l) => l.moduleKey === a.module_key);
          const lessonB = lessons.find((l) => l.moduleKey === b.module_key);

          // If both lessons found, sort by their id (which represents pedagogical order)
          if (lessonA && lessonB) {
            return lessonA.id - lessonB.id;
          }

          // If only one lesson found, put the found one first
          if (lessonA) return -1;
          if (lessonB) return 1;

          // If neither found, sort by module_key as fallback
          return a.module_key.localeCompare(b.module_key);
        });

      logger.log("[ProgressService] Fetched unit modules", {
        userId,
        unitId,
        moduleCount: enrichedModules.length,
      });

      return enrichedModules;
    } catch (error) {
      logger.error("[ProgressService] Error fetching unit modules:", error);
      throw error;
    }
  }

  /**
   * Get recent activity
   * @param {string} userId - User UUID
   * @param {number} limit - Number of recent items
   * @returns {Promise<Object>} Recent activity data
   */
  async getRecentActivity(userId, limit = 20) {
    try {
      const { data: modules, error } = await this.client
        .from("module_progress")
        .select("*")
        .eq("user_id", userId)
        .not("completed_at", "is", null)
        .order("completed_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Enrich modules with section-based time (single source of truth)
      const moduleKeys = (modules || []).map((m) => m.module_key);
      let sectionsData = [];

      if (moduleKeys.length > 0) {
        const { data: sections, error: sectionsError } = await this.client
          .from("section_progress")
          .select("module_key, time_spent_seconds")
          .eq("user_id", userId)
          .in("module_key", moduleKeys);

        if (sectionsError) throw sectionsError;
        sectionsData = sections || [];
      }

      // Calculate section time per module
      const moduleSectionTime = {};
      sectionsData.forEach((section) => {
        if (!moduleSectionTime[section.module_key]) {
          moduleSectionTime[section.module_key] = 0;
        }
        moduleSectionTime[section.module_key] +=
          section.time_spent_seconds || 0;
      });

      // Enrich modules with section-based time (single source of truth)
      const enrichedModules = (modules || []).map((module) => ({
        ...module,
        // Use section-based time if available, otherwise fall back to module time (for migrated data)
        time_spent_seconds:
          moduleSectionTime[module.module_key] > 0
            ? moduleSectionTime[module.module_key]
            : module.time_spent_seconds || 0,
      }));

      const activity = {
        modules: enrichedModules,
      };

      logger.log("[ProgressService] Fetched recent activity", {
        userId,
        moduleCount: activity.modules.length,
      });

      return activity;
    } catch (error) {
      logger.error("[ProgressService] Error fetching recent activity:", error);
      throw error;
    }
  }

  /**
   * Get user profile
   * @param {string} userId - User UUID
   * @returns {Promise<Object>} User profile data
   */
  async getUserProfile(userId) {
    try {
      const { data: profile, error } = await this.client
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      logger.log("[ProgressService] Fetched user profile", { userId });

      return profile;
    } catch (error) {
      logger.error("[ProgressService] Error fetching user profile:", error);
      throw error;
    }
  }
}

/**
 * Factory function to create ProgressService instance
 * @param {Object} supabaseClient - Supabase client instance
 * @returns {ProgressService} New ProgressService instance
 */
export const createProgressService = (supabaseClient) => {
  return new ProgressService(supabaseClient);
};
