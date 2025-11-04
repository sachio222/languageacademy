import { useState, useEffect, useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";
import { lessons } from "../lessons/lessonData";

/**
 * Enhanced analytics hook for report card system
 * Extends useAnalyticsSummary with comprehensive data fetching and time range support
 *
 * @param {string} userId - Optional user ID (if null, uses current user)
 * @param {object} options - Configuration options
 * @param {boolean} options.includeDetailedProgress - Include detailed progress data
 * @param {string} options.timeRange - Time range filter ('all', '7days', '30days', '90days')
 * @returns {object} Report card data with loading and error states
 */
export const useReportCardData = (userId = null, options = {}) => {
  const { includeDetailedProgress = true, timeRange = "all" } = options;
  const { supabaseUser, profile } = useAuth();
  const supabaseClient = useSupabaseClient();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetUserId = userId || supabaseUser?.id;

  // Calculate time range filter
  const getTimeFilter = useCallback(() => {
    if (timeRange === "all") return null;

    const now = new Date();
    const days =
      {
        "7days": 7,
        "30days": 30,
        "90days": 90,
      }[timeRange] || 0;

    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return startDate.toISOString();
  }, [timeRange]);

  // Fetch all data in parallel
  const fetchReportCardData = useCallback(async () => {
    if (!targetUserId || !supabaseClient) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const timeFilter = getTimeFilter();

      // Fetch all data sources in parallel for performance
      // Note: For progress calculation, we always fetch ALL modules/units regardless of time filter
      // The time filter only affects recent activity display
      const [
        profileData,
        sessionsData,
        exercisesData,
        allModulesData,
        modulesDataForActivity,
        allUnitsData,
        unitsDataForActivity,
        examsData,
        conceptsData,
      ] = await Promise.all([
        fetchProfile(targetUserId),
        fetchSessions(targetUserId, timeFilter),
        fetchExercises(targetUserId, timeFilter),
        fetchModules(targetUserId, null), // All modules for progress calculation
        fetchModules(targetUserId, timeFilter), // Filtered modules for recent activity
        fetchUnits(targetUserId, null), // All units for progress calculation
        fetchUnits(targetUserId, timeFilter), // Filtered units for recent activity
        fetchExams(targetUserId, timeFilter),
        fetchConcepts(targetUserId, timeFilter),
      ]);

      // Aggregate and calculate derived metrics
      // Use allModulesData for progress calculation, but modulesDataForActivity for recent activity
      const aggregatedData = aggregateData({
        profile: profileData,
        sessions: sessionsData,
        exercises: exercisesData,
        modules: allModulesData, // Use all modules for progress calculation
        modulesForActivity: modulesDataForActivity, // Filtered modules for recent activity
        units: allUnitsData, // Use all units for progress calculation
        unitsForActivity: unitsDataForActivity, // Filtered units for recent activity
        exams: examsData,
        concepts: conceptsData,
        timeRange,
      });

      setData(aggregatedData);
    } catch (err) {
      logger.error("Error fetching report card data:", err);
      setError(err.message || "Failed to load report card data");
    } finally {
      setLoading(false);
    }
  }, [targetUserId, supabaseClient, timeRange, getTimeFilter]);

  // Fetch profile data
  const fetchProfile = async (userId) => {
    if (userId === supabaseUser?.id && profile) {
      return profile;
    }

    const { data, error } = await supabaseClient
      .from(TABLES.USER_PROFILES)
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  };

  // Fetch user sessions
  const fetchSessions = async (userId, timeFilter) => {
    let query = supabaseClient
      .from(TABLES.USER_SESSIONS)
      .select("*")
      .eq("user_id", userId);

    if (timeFilter) {
      query = query.gte("session_start", timeFilter);
    }

    const { data, error } = await query.order("session_start", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  };

  // Fetch exercise completions
  const fetchExercises = async (userId, timeFilter) => {
    let query = supabaseClient
      .from(TABLES.EXERCISE_COMPLETIONS)
      .select("*")
      .eq("user_id", userId);

    if (timeFilter) {
      query = query.gte("completed_at", timeFilter);
    }

    const { data, error } = await query.order("completed_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  };

  // Fetch module progress
  const fetchModules = async (userId, timeFilter) => {
    let query = supabaseClient
      .from(TABLES.MODULE_PROGRESS)
      .select("*")
      .eq("user_id", userId);

    if (timeFilter) {
      query = query.gte("started_at", timeFilter);
    }

    const { data, error } = await query.order("started_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  };

  // Fetch unit progress
  const fetchUnits = async (userId, timeFilter) => {
    let query = supabaseClient
      .from(TABLES.UNIT_PROGRESS)
      .select("*")
      .eq("user_id", userId);

    if (timeFilter) {
      query = query.gte("started_at", timeFilter);
    }

    const { data, error } = await query.order("started_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  };

  // Fetch exam attempts
  const fetchExams = async (userId, timeFilter) => {
    let query = supabaseClient
      .from(TABLES.EXAM_ATTEMPTS)
      .select("*")
      .eq("user_id", userId);

    if (timeFilter) {
      query = query.gte("started_at", timeFilter);
    }

    const { data, error } = await query.order("started_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  };

  // Fetch concept understanding
  const fetchConcepts = async (userId, timeFilter) => {
    let query = supabaseClient
      .from(TABLES.CONCEPT_UNDERSTANDING)
      .select("*")
      .eq("user_id", userId);

    if (timeFilter) {
      query = query.gte("understood_at", timeFilter);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  };

  // Aggregate all data into report card format
  const aggregateData = ({
    profile,
    sessions,
    exercises,
    modules, // All modules for progress calculation
    modulesForActivity = modules, // Filtered modules for recent activity (defaults to all if not provided)
    units, // All units for progress calculation
    unitsForActivity = units, // Filtered units for recent activity (defaults to all if not provided)
    exams,
    concepts,
    timeRange,
  }) => {
    // Hero stats
    const totalStudyTime = profile?.total_study_time_seconds || 0;
    const streakDays = profile?.streak_days || 0;

    // Calculate accuracy
    const correctExercises = exercises.filter((e) => e.is_correct).length;
    const totalExercises = exercises.length;
    const accuracy =
      totalExercises > 0
        ? Math.round((correctExercises / totalExercises) * 100)
        : 0;

    // Count unique words learned from completed modules
    const completedModules = modules.filter((m) => m.completed_at);
    const wordsLearned = countWordsLearned(completedModules);

    // Progress overview by unit
    const unitProgress = calculateUnitProgress(modules, units);

    // Recent activity (use filtered data)
    const recentModules = modulesForActivity;
    const recentExams = exams;
    const recentSessions = sessions;

    // Vocabulary breakdown
    const vocabularyByUnit = groupVocabularyByUnit(completedModules);

    // Strengths and weaknesses
    const performanceByUnit = calculatePerformanceByUnit(exercises, modules);

    return {
      // Profile info
      profile: {
        id: profile?.id,
        clerk_user_id: profile?.clerk_user_id,
        email: profile?.email,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        preferred_name: profile?.preferred_name,
        created_at: profile?.created_at,
        last_active_at: profile?.last_active_at,
      },

      // Hero stats
      heroStats: {
        totalStudyTime,
        streakDays,
        accuracy,
        wordsLearned,
      },

      // Progress
      progress: {
        unitProgress,
        completedModulesCount: completedModules.length,
        totalModulesCount: lessons.length,
        completedUnitsCount: units.filter((u) => u.completed_at).length,
      },

      // Recent activity
      recentActivity: {
        modules: recentModules,
        exams: recentExams,
        sessions: recentSessions,
      },

      // Vocabulary
      vocabulary: {
        byUnit: vocabularyByUnit,
        totalWords: wordsLearned,
        conceptsUnderstood: concepts.length,
      },

      // Performance
      performance: {
        byUnit: performanceByUnit,
        strengths: performanceByUnit.filter((p) => p.accuracy >= 85),
        weaknesses: performanceByUnit.filter(
          (p) => p.accuracy < 70 && p.attempts > 0
        ),
      },

      // Raw data for detailed views
      raw: {
        sessions,
        exercises,
        modules,
        units,
        exams,
        concepts,
      },

      // Metadata
      metadata: {
        timeRange,
        generatedAt: new Date().toISOString(),
      },
    };
  };

  // Helper function to find lesson by module_id
  // Handles both numeric IDs (like '63') and moduleKey strings (like '2024-01-01-pronouns')
  const findLessonByModuleId = (moduleId) => {
    if (!moduleId) return null;

    const moduleIdStr = String(moduleId);
    const isNumeric = /^\d+$/.test(moduleIdStr);

    if (isNumeric) {
      // Match by numeric ID
      const moduleIdNum = parseInt(moduleIdStr, 10);
      return lessons.find((l) => l.id === moduleIdNum);
    } else {
      // Match by moduleKey
      return lessons.find((l) => l.moduleKey === moduleId);
    }
  };

  // Count unique words learned from completed modules
  const countWordsLearned = (completedModules) => {
    const uniqueWords = new Set();

    completedModules.forEach((module) => {
      // Find the lesson by module_id
      const lesson = findLessonByModuleId(module.module_id);

      if (lesson?.vocabularyReference) {
        lesson.vocabularyReference.forEach((vocab) => {
          uniqueWords.add(vocab.french);
        });
      }
    });

    return uniqueWords.size;
  };

  // Calculate progress for each unit
  const calculateUnitProgress = (modules, units) => {
    // Defensive check: ensure modules is an array
    if (!Array.isArray(modules)) {
      logger.error(
        "[ReportCard] calculateUnitProgress: modules is not an array",
        modules
      );
      modules = [];
    }

    if (!Array.isArray(units)) {
      logger.error(
        "[ReportCard] calculateUnitProgress: units is not an array",
        units
      );
      units = [];
    }

    // Debug: log module data
    logger.log(
      `[ReportCard] calculateUnitProgress: ${modules.length} modules, ${units.length} units`
    );
    if (modules.length > 0) {
      logger.log(`[ReportCard] Sample module:`, {
        module_id: modules[0].module_id,
        completed_at: modules[0].completed_at,
      });
    }

    const unitStructure = [
      { id: "unit1", title: "Unit 1", lessonRange: [1, 11], icon: "🧩" },
      { id: "unit2", title: "Unit 2", lessonRange: [12, 24], icon: "✍️" },
      { id: "unit3", title: "Unit 3", lessonRange: [25, 39], icon: "🏃" },
      { id: "unit4", title: "Unit 4", lessonRange: [40, 52], icon: "💬" },
      { id: "unit5", title: "Unit 5", lessonRange: [53, 64], icon: "⌚" },
      { id: "unit6", title: "Unit 6", lessonRange: [65, 78], icon: "👌" },
      { id: "unit7", title: "Unit 7", lessonRange: [79, 92], icon: "📖" },
      { id: "unit8", title: "Unit 8", lessonRange: [93, 107], icon: "💡" },
      { id: "unit9", title: "Unit 9", lessonRange: [108, 123], icon: "⏳" },
      { id: "unit10", title: "Unit 10", lessonRange: [124, 138], icon: "🏆" },
    ];

    return unitStructure.map((unit) => {
      const [start, end] = unit.lessonRange;

      // Find all lessons that belong to this unit
      const unitLessons = lessons.filter((l) => l.id >= start && l.id <= end);
      const totalCount = unitLessons.length;

      // Find modules that belong to this unit
      const unitModules = modules.filter((m) => {
        if (!m || !m.module_id) return false;

        const lesson = findLessonByModuleId(m.module_id);
        if (!lesson) {
          return false;
        }

        return lesson.id >= start && lesson.id <= end;
      });

      // Count completed modules (completed_at is truthy if module is completed)
      const completedCount = unitModules.filter(
        (m) => m.completed_at != null && m.completed_at !== ""
      ).length;

      // Calculate total study time for this unit from unitModules
      const studyTime = unitModules.reduce(
        (sum, m) => sum + (m.time_spent_seconds || 0),
        0
      );

      // Debug logging for first unit
      if (unit.id === "unit1") {
        logger.log(`[ReportCard] Unit ${unit.id}:`, {
          totalModules: modules.length,
          unitModules: unitModules.length,
          completedCount,
          totalCount,
          studyTime,
          sampleModules: unitModules.slice(0, 3).map((m) => ({
            module_id: m.module_id,
            completed_at: m.completed_at,
          })),
        });
      }

      const unitData = units.find((u) => u.unit_id === unit.id);

      return {
        ...unit,
        completed: completedCount,
        total: totalCount,
        percentage:
          totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
        studyTime: studyTime,
        examScore: unitData?.unit_exam_score,
        completedAt: unitData?.completed_at,
      };
    });
  };

  // Group vocabulary by unit
  const groupVocabularyByUnit = (completedModules) => {
    const byUnit = {};

    completedModules.forEach((module) => {
      const lesson = findLessonByModuleId(module.module_id);

      if (lesson?.vocabularyReference) {
        // Determine which unit this lesson belongs to
        const unitId = getUnitForLesson(lesson.id);

        if (!byUnit[unitId]) {
          byUnit[unitId] = new Set();
        }

        lesson.vocabularyReference.forEach((vocab) => {
          byUnit[unitId].add(vocab.french);
        });
      }
    });

    // Convert Sets to arrays
    const result = {};
    Object.keys(byUnit).forEach((unitId) => {
      result[unitId] = Array.from(byUnit[unitId]);
    });

    return result;
  };

  // Calculate performance by unit
  const calculatePerformanceByUnit = (exercises, modules) => {
    const unitStructure = [
      { id: "unit1", title: "Unit 1", lessonRange: [1, 11], icon: "🧩" },
      { id: "unit2", title: "Unit 2", lessonRange: [12, 24], icon: "✍️" },
      { id: "unit3", title: "Unit 3", lessonRange: [25, 39], icon: "🏃" },
      { id: "unit4", title: "Unit 4", lessonRange: [40, 52], icon: "💬" },
      { id: "unit5", title: "Unit 5", lessonRange: [53, 64], icon: "⌚" },
      { id: "unit6", title: "Unit 6", lessonRange: [65, 78], icon: "👌" },
      { id: "unit7", title: "Unit 7", lessonRange: [79, 92], icon: "📖" },
      { id: "unit8", title: "Unit 8", lessonRange: [93, 107], icon: "💡" },
      { id: "unit9", title: "Unit 9", lessonRange: [108, 123], icon: "⏳" },
      { id: "unit10", title: "Unit 10", lessonRange: [124, 138], icon: "🏆" },
    ];

    return unitStructure.map((unit) => {
      const [start, end] = unit.lessonRange;

      // Get modules for this unit
      const unitModuleIds = modules
        .filter((m) => {
          const lesson = findLessonByModuleId(m.module_id);
          if (!lesson) return false;

          return lesson.id >= start && lesson.id <= end;
        })
        .map((m) => m.module_id);

      // Get exercises for these modules
      const unitExercises = exercises.filter((e) =>
        unitModuleIds.includes(e.module_id)
      );

      const correct = unitExercises.filter((e) => e.is_correct).length;
      const total = unitExercises.length;

      return {
        unitId: unit.id,
        title: unit.title,
        icon: unit.icon,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        correct,
        attempts: total,
      };
    });
  };

  // Get unit ID for a lesson number
  const getUnitForLesson = (lessonId) => {
    if (lessonId >= 1 && lessonId <= 11) return "unit1";
    if (lessonId >= 12 && lessonId <= 24) return "unit2";
    if (lessonId >= 25 && lessonId <= 39) return "unit3";
    if (lessonId >= 40 && lessonId <= 52) return "unit4";
    if (lessonId >= 53 && lessonId <= 64) return "unit5";
    if (lessonId >= 65 && lessonId <= 78) return "unit6";
    if (lessonId >= 79 && lessonId <= 92) return "unit7";
    if (lessonId >= 93 && lessonId <= 107) return "unit8";
    if (lessonId >= 108 && lessonId <= 123) return "unit9";
    if (lessonId >= 124 && lessonId <= 138) return "unit10";
    return "unknown";
  };

  // Load data on mount and when dependencies change
  useEffect(() => {
    fetchReportCardData();
  }, [fetchReportCardData]);

  return {
    data,
    loading,
    error,
    refetch: fetchReportCardData,
  };
};
