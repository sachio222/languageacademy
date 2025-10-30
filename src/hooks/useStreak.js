import { useCallback, useRef } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { logger } from "../utils/logger";

export const useStreak = () => {
  const { supabaseUser, supabaseClient } = useAuth();
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

  return {
    updateStreak,
  };
};
