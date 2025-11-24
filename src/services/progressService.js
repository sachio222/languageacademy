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
      const [profileResult, exercisesResult, modulesResult] = await Promise.all(
        [
          this.client
            .from("user_profiles")
            .select("total_study_time_seconds, streak_days")
            .eq("id", userId)
            .single(),

          this.client
            .from("exercise_completions")
            .select("is_correct")
            .eq("user_id", userId),

          this.client
            .from("module_progress")
            .select("module_key")
            .eq("user_id", userId)
            .not("completed_at", "is", null),
        ]
      );

      const profile = profileResult.data;
      const exercises = exercisesResult.data || [];
      const completedModules = modulesResult.data || [];

      // Calculate accuracy
      const correctCount = exercises.filter((e) => e.is_correct).length;
      const accuracy =
        exercises.length > 0
          ? Math.round((correctCount / exercises.length) * 100)
          : 0;

      const stats = {
        total_study_time: profile?.total_study_time_seconds || 0,
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

      // Group by unit_id and aggregate
      const unitMap = {};
      (modules || []).forEach((module) => {
        const unitId = module.unit_id;
        if (!unitMap[unitId]) {
          unitMap[unitId] = {
            unit_id: unitId,
            total_modules: 0,
            completed_modules: 0,
            total_time_spent: 0,
            section_stats: { total_sections: 0, completed_sections: 0 },
          };
        }

        unitMap[unitId].total_modules += 1;
        if (module.completed_at) {
          unitMap[unitId].completed_modules += 1;
        }
        unitMap[unitId].total_time_spent += module.time_spent_seconds || 0;
      });

      // Convert to array and calculate percentages
      const units = Object.values(unitMap).map((unit) => ({
        ...unit,
        completion_percentage:
          unit.total_modules > 0
            ? Math.round((unit.completed_modules / unit.total_modules) * 100)
            : 0,
      }));

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

          // Enhanced report card: Use ONLY section time sums
          // No module time fallback - pure section-based time tracking
          const displayTime = totalSectionTime;

          return {
            ...module,
            sections_detail: moduleSections,
            sections_completed: sectionTimes.filter((s) => s.completed_at)
              .length,
            total_sections: sectionTimes.length,
            // Use pure section time for enhanced report card
            time_spent_seconds: displayTime,
            // Keep original module time for debugging/comparison
            module_time_original: module.time_spent_seconds,
            // Always section-based now
            time_source: "sections",
            completion_percentage:
              module.total_exercises > 0
                ? Math.round(
                    (module.completed_exercises / module.total_exercises) * 100
                  )
                : 0,
          };
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

      const activity = {
        modules: modules || [],
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
