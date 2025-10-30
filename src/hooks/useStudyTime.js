import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";

export const useStudyTime = () => {
  const { supabaseUser, profile } = useAuth();
  const supabaseClient = useSupabaseClient();

  // Update user study time
  const updateStudyTime = useCallback(
    async (additionalSeconds) => {
      if (!supabaseUser) return;

      try {
        // Use profile data from useAuth instead of fetching
        if (!profile) return;

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
    [supabaseUser, supabaseClient, profile]
  );

  return {
    updateStudyTime,
  };
};
