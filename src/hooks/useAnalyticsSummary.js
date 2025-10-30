import { useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";

export const useAnalyticsSummary = () => {
  const { supabaseUser, profile } = useAuth();
  const supabaseClient = useSupabaseClient();

  // Get user analytics summary
  const getAnalyticsSummary = useCallback(async () => {
    if (!supabaseUser) return null;

    try {
      // Use profile data from useAuth instead of fetching
      if (!profile) return null;

      // Get session count and total time
      const { data: sessionStats, error: sessionError } = await supabaseClient
        .from(TABLES.USER_SESSIONS)
        .select("duration_seconds, exercises_completed, exercises_attempted")
        .eq("user_id", supabaseUser.id);

      if (sessionError) throw sessionError;

      // Get completed exercises count
      const { data: exerciseStats, error: exerciseError } = await supabaseClient
        .from(TABLES.EXERCISE_COMPLETIONS)
        .select("id", { count: "exact" })
        .eq("user_id", supabaseUser.id)
        .eq("is_correct", true);

      if (exerciseError) throw exerciseError;

      // Get completed modules count
      const { data: moduleStats, error: moduleError } = await supabaseClient
        .from(TABLES.MODULE_PROGRESS)
        .select("id", { count: "exact" })
        .eq("user_id", supabaseUser.id)
        .not("completed_at", "is", null);

      if (moduleError) throw moduleError;

      const totalSessionTime = sessionStats.reduce(
        (sum, session) => sum + (session.duration_seconds || 0),
        0
      );
      const totalExercisesCompleted = sessionStats.reduce(
        (sum, session) => sum + (session.exercises_completed || 0),
        0
      );
      const totalExercisesAttempted = sessionStats.reduce(
        (sum, session) => sum + (session.exercises_attempted || 0),
        0
      );

      return {
        profile,
        stats: {
          totalSessions: sessionStats.length,
          totalStudyTimeSeconds: profile.total_study_time_seconds || 0,
          totalSessionTimeSeconds: totalSessionTime,
          streakDays: profile.streak_days || 0,
          exercisesCompleted: exerciseStats.count || 0,
          exercisesAttempted: totalExercisesAttempted,
          modulesCompleted: moduleStats.count || 0,
          averageAccuracy:
            totalExercisesAttempted > 0
              ? Math.round(
                  (totalExercisesCompleted / totalExercisesAttempted) * 100
                )
              : 0,
        },
      };
    } catch (err) {
      logger.error("Error getting analytics summary:", err);
      return null;
    }
  }, [supabaseUser, supabaseClient, profile]);

  return {
    getAnalyticsSummary,
  };
};
