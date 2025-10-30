import { useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { useSupabaseClient } from "./useSupabaseClient";
import { logger } from "../utils/logger";

export const useAnalyticsTracking = (sessionRef) => {
  const supabaseClient = useSupabaseClient();

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
    [supabaseClient, sessionRef]
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
    [supabaseClient, sessionRef]
  );

  return {
    trackModuleVisit,
    trackExerciseAttempt,
  };
};
