import { useEffect } from "react";
import { useSession } from "./useSession";
import { useStreak } from "./useStreak";
import { useStudyTime } from "./useStudyTime";
import { useAnalyticsTracking } from "./useAnalyticsTracking";
import { useAnalyticsSummary } from "./useAnalyticsSummary";
import { useAuth } from "./useAuth";

export const useAnalytics = () => {
  const { supabaseUser, isAuthenticated, loading: authLoading } = useAuth();

  // Initialize all the smaller hooks
  const { currentSession, endSession, sessionRef } = useSession();
  const { updateStreak } = useStreak();
  const { updateStudyTime } = useStudyTime();
  const { trackModuleVisit, trackExerciseAttempt } =
    useAnalyticsTracking(sessionRef);
  const { getAnalyticsSummary } = useAnalyticsSummary();

  // Update streak when session starts
  useEffect(() => {
    if (currentSession && isAuthenticated) {
      // Delay to ensure session is committed to database
      setTimeout(() => {
        updateStreak();
      }, 500);
    }
  }, [currentSession, isAuthenticated, updateStreak]);

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
