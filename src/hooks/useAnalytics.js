import { useState, useEffect, useCallback, useRef } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";

export const useAnalytics = () => {
  const {
    supabaseUser,
    supabaseClient,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  const [currentSession, setCurrentSession] = useState(null);
  const sessionRef = useRef(null);
  const activityTimerRef = useRef(null);

  // Start a new session when user logs in
  useEffect(() => {
    if (authLoading || !isAuthenticated || !supabaseUser) return;

    const startSession = async () => {
      try {
        const { data, error } = await supabaseClient
          .from(TABLES.USER_SESSIONS)
          .insert({
            user_id: supabaseUser.id,
            session_start: new Date().toISOString(),
            user_agent: navigator.userAgent,
          })
          .select()
          .single();

        if (error) throw error;

        setCurrentSession(data);
        sessionRef.current = data;
      } catch (err) {
        console.error("Error starting session:", err);
      }
    };

    startSession();

    // Update last_active_at periodically
    const updateActivity = async () => {
      try {
        await supabaseClient
          .from("user_profiles")
          .update({ last_active_at: new Date().toISOString() })
          .eq("id", supabaseUser.id);
      } catch (err) {
        console.error("Error updating activity:", err);
      }
    };

    // Update activity every 30 seconds
    activityTimerRef.current = setInterval(updateActivity, 30000);

    // Cleanup function
    return () => {
      if (activityTimerRef.current) {
        clearInterval(activityTimerRef.current);
      }
      endSession();
    };
  }, [authLoading, isAuthenticated, supabaseUser, supabaseClient]);

  // End session when component unmounts or user logs out
  const endSession = useCallback(async () => {
    if (!sessionRef.current) return;

    try {
      const sessionEnd = new Date().toISOString();
      const sessionStart = new Date(sessionRef.current.session_start);
      const duration = Math.round((new Date(sessionEnd) - sessionStart) / 1000);

      await supabaseClient
        .from(TABLES.USER_SESSIONS)
        .update({
          session_end: sessionEnd,
          duration_seconds: duration,
        })
        .eq("id", sessionRef.current.id);

      sessionRef.current = null;
      setCurrentSession(null);
    } catch (err) {
      console.error("Error ending session:", err);
    }
  }, [supabaseClient]);

  // Track module visit
  const trackModuleVisit = useCallback(
    async (moduleId) => {
      if (!sessionRef.current) return;

      try {
        // Get current modules visited
        const { data: session, error: fetchError } = await supabaseClient
          .from(TABLES.USER_SESSIONS)
          .select("modules_visited")
          .eq("id", sessionRef.current.id)
          .single();

        if (fetchError) throw fetchError;

        const modulesVisited = session.modules_visited || [];
        if (!modulesVisited.includes(moduleId)) {
          const { error: updateError } = await supabaseClient
            .from(TABLES.USER_SESSIONS)
            .update({
              modules_visited: [...modulesVisited, moduleId],
            })
            .eq("id", sessionRef.current.id);

          if (updateError) throw updateError;
        }
      } catch (err) {
        console.error("Error tracking module visit:", err);
      }
    },
    [supabaseClient]
  );

  // Track exercise attempt
  const trackExerciseAttempt = useCallback(
    async (exerciseId, correct = false) => {
      if (!sessionRef.current) return;

      try {
        const { data: session, error: fetchError } = await supabaseClient
          .from(TABLES.USER_SESSIONS)
          .select("exercises_attempted, exercises_completed")
          .eq("id", sessionRef.current.id)
          .single();

        if (fetchError) throw fetchError;

        const updates = {
          exercises_attempted: (session.exercises_attempted || 0) + 1,
        };

        if (correct) {
          updates.exercises_completed = (session.exercises_completed || 0) + 1;
        }

        const { error: updateError } = await supabaseClient
          .from(TABLES.USER_SESSIONS)
          .update(updates)
          .eq("id", sessionRef.current.id);

        if (updateError) throw updateError;
      } catch (err) {
        console.error("Error tracking exercise attempt:", err);
      }
    },
    [supabaseClient]
  );

  // Update user study time
  const updateStudyTime = useCallback(
    async (additionalSeconds) => {
      if (!supabaseUser) return;

      try {
        const { data: profile, error: fetchError } = await supabaseClient
          .from("user_profiles")
          .select("total_study_time_seconds")
          .eq("id", supabaseUser.id)
          .single();

        if (fetchError) throw fetchError;

        const newTotalTime =
          (profile.total_study_time_seconds || 0) + additionalSeconds;

        const { error: updateError } = await supabaseClient
          .from("user_profiles")
          .update({
            total_study_time_seconds: newTotalTime,
            last_active_at: new Date().toISOString(),
          })
          .eq("id", supabaseUser.id);

        if (updateError) throw updateError;
      } catch (err) {
        console.error("Error updating study time:", err);
      }
    },
    [supabaseUser, supabaseClient]
  );

  // Calculate and update streak
  const updateStreak = useCallback(async () => {
    if (!supabaseUser) return;

    try {
      // Get user's session history to calculate streak
      const { data: sessions, error: fetchError } = await supabaseClient
        .from(TABLES.USER_SESSIONS)
        .select("session_start")
        .eq("user_id", supabaseUser.id)
        .order("session_start", { ascending: false });

      if (fetchError) throw fetchError;

      // Calculate streak days
      const sessionDates = sessions.map((s) =>
        new Date(s.session_start).toDateString()
      );
      const uniqueDates = [...new Set(sessionDates)];

      let streak = 0;
      const today = new Date().toDateString();

      for (let i = 0; i < uniqueDates.length; i++) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        const expectedDate = currentDate.toDateString();

        if (uniqueDates.includes(expectedDate)) {
          streak++;
        } else {
          break;
        }
      }

      // Update user profile with new streak
      const { error: updateError } = await supabaseClient
        .from("user_profiles")
        .update({ streak_days: streak })
        .eq("id", supabaseUser.id);

      if (updateError) throw updateError;

      return streak;
    } catch (err) {
      console.error("Error updating streak:", err);
      return 0;
    }
  }, [supabaseUser, supabaseClient]);

  // Get user analytics summary
  const getAnalyticsSummary = useCallback(async () => {
    if (!supabaseUser) return null;

    try {
      // Get user profile data
      const { data: profile, error: profileError } = await supabaseClient
        .from("user_profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (profileError) throw profileError;

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
      console.error("Error getting analytics summary:", err);
      return null;
    }
  }, [supabaseUser, supabaseClient]);

  return {
    currentSession,
    trackModuleVisit,
    trackExerciseAttempt,
    updateStudyTime,
    updateStreak,
    getAnalyticsSummary,
    endSession,
  };
};
