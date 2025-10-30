import { useState, useEffect, useCallback, useRef } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { logger } from "../utils/logger";

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
  const isCalculatingStreak = useRef(false);

  // Fallback: Calculate streak client-side if database function doesn't exist
  const calculateStreakClientSide = useCallback(async () => {
    const oneYearAgo = new Date(
      Date.now() - 365 * 24 * 60 * 60 * 1000
    ).toISOString();
    const { data: sessions, error: fetchError } = await supabaseClient
      .from(TABLES.USER_SESSIONS)
      .select("session_start")
      .eq("user_id", supabaseUser.id)
      .gte("session_start", oneYearAgo)
      .order("session_start", { ascending: false })
      .limit(5000); // Explicit limit

    if (fetchError) throw fetchError;

    const getLocalDateString = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const sessionDates = sessions.map((s) =>
      getLocalDateString(s.session_start)
    );
    const uniqueDates = [...new Set(sessionDates)];

    logger.analytics("Streak calculation (client-side fallback):", {
      totalSessions: sessions.length,
      uniqueDatesCount: uniqueDates.length,
      uniqueDates: uniqueDates.slice(0, 10),
      now: new Date().toISOString(),
    });

    let streak = 0;
    // Grace period: Start from yesterday if user hasn't studied today yet
    let startDay = 0;
    const today = getLocalDateString(new Date());
    if (!uniqueDates.includes(today)) {
      startDay = 1;
    }

    for (let i = startDay; i < 365; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const expectedDate = getLocalDateString(checkDate);
      if (uniqueDates.includes(expectedDate)) {
        streak++;
      } else {
        break;
      }
    }

    logger.analytics("Streak calculated:", streak);

    await supabaseClient
      .from("user_profiles")
      .update({ streak_days: streak })
      .eq("id", supabaseUser.id);

    return streak;
  }, [supabaseUser, supabaseClient]);

  // Calculate and update streak
  const updateStreak = useCallback(async () => {
    if (!supabaseUser || isCalculatingStreak.current) return;

    isCalculatingStreak.current = true;

    try {
      // Use RPC call to calculate unique session dates in the database
      // This is much more efficient than fetching all sessions
      const { data: dateData, error: dateError } = await supabaseClient.rpc(
        "get_session_dates",
        {
          p_user_id: supabaseUser.id,
        }
      );

      if (dateError) {
        logger.analytics(
          "RPC not available, falling back to client-side calculation"
        );
        // Fallback to client-side calculation if RPC doesn't exist yet
        return await calculateStreakClientSide();
      }

      // dateData should be array of date strings like ["2025-10-17", "2025-10-16", ...]
      const uniqueDates = dateData.map((row) => row.session_date);

      logger.analytics("Streak calculation (database):", {
        uniqueDatesCount: uniqueDates.length,
        uniqueDates: uniqueDates.slice(0, 10), // Show first 10
        now: new Date().toISOString(),
      });

      let streak = 0;
      const getLocalDateString = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      // Check consecutive days going backwards from today
      // Grace period: Start from yesterday if user hasn't studied today yet
      // This prevents streak from resetting at midnight
      let startDay = 0;
      const today = getLocalDateString(new Date());
      if (!uniqueDates.includes(today)) {
        // User hasn't studied today yet, check if they studied yesterday
        startDay = 1;
      }

      for (let i = startDay; i < 365; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        const expectedDate = getLocalDateString(checkDate);

        if (uniqueDates.includes(expectedDate)) {
          streak++;
        } else {
          break;
        }
      }

      logger.analytics("Streak calculated:", streak);

      // Update user profile with new streak
      const { error: updateError } = await supabaseClient
        .from("user_profiles")
        .update({ streak_days: streak })
        .eq("id", supabaseUser.id);

      if (updateError) throw updateError;

      return streak;
    } catch (err) {
      logger.error("Error updating streak:", err);
      return 0;
    } finally {
      isCalculatingStreak.current = false;
    }
  }, [supabaseUser, supabaseClient, calculateStreakClientSide]);

  // Start a new session when user logs in
  useEffect(() => {
    if (authLoading || !isAuthenticated || !supabaseUser) return;

    // Prevent duplicate session creation
    if (sessionRef.current) return;

    const startSession = async () => {
      try {
        // Check if there's a recent session (within last hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { data: recentSessions, error: fetchError } = await supabaseClient
          .from(TABLES.USER_SESSIONS)
          .select("id, session_start")
          .eq("user_id", supabaseUser.id)
          .gte("session_start", oneHourAgo)
          .order("session_start", { ascending: false })
          .limit(1);

        if (fetchError) throw fetchError;

        // If there's a session within the last hour, reuse it
        if (recentSessions && recentSessions.length > 0) {
          logger.analytics(
            "Reusing existing session from",
            recentSessions[0].session_start
          );
          setCurrentSession(recentSessions[0]);
          sessionRef.current = recentSessions[0];

          // Still update streak (but it should be cached now)
          setTimeout(() => {
            updateStreak();
          }, 500);
          return;
        }

        // Otherwise create a new session
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

        logger.analytics("Created new session");
        setCurrentSession(data);
        sessionRef.current = data;

        // Wait a bit to ensure session is committed, then update streak
        setTimeout(() => {
          updateStreak();
        }, 500);
      } catch (err) {
        logger.error("Error starting session:", err);
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
        logger.error("Error updating activity:", err);
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
  }, [
    authLoading,
    isAuthenticated,
    supabaseUser,
    supabaseClient,
    updateStreak,
  ]);

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
      logger.error("Error ending session:", err);
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
        logger.error("Error tracking module visit:", err);
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
        logger.error("Error tracking exercise attempt:", err);
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
        logger.error("Error updating study time:", err);
      }
    },
    [supabaseUser, supabaseClient]
  );

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
      logger.error("Error getting analytics summary:", err);
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
