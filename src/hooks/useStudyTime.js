import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { logger } from "../utils/logger";

export const useStudyTime = () => {
  const { supabaseUser, supabaseClient } = useAuth();

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

  return {
    updateStudyTime,
  };
};
