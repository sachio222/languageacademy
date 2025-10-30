import { useState, useEffect, useCallback, useRef } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { logger } from "../utils/logger";

export const useSession = () => {
  const {
    supabaseUser,
    supabaseClient,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  
  const [currentSession, setCurrentSession] = useState(null);
  const sessionRef = useRef(null);
  const activityTimerRef = useRef(null);

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
  }, [authLoading, isAuthenticated, supabaseUser, supabaseClient, endSession]);

  return {
    currentSession,
    endSession,
    sessionRef,
  };
};
