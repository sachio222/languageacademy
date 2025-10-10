import { useCallback, useRef } from "react";
import { useAuth } from "./useAuth";

/**
 * Hook for tracking detailed text entry patterns
 * Captures typing, pasting, deleting, and other text input events
 */
export const useTextTracking = () => {
  const {
    supabaseUser,
    supabaseClient,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  const trackingState = useRef({
    isTracking: false,
    exerciseId: null,
    moduleId: null,
    unitId: null,
    attemptNumber: 1,
    lastEntry: null,
  });

  // Start tracking text entries for an exercise
  const startTracking = useCallback(
    (exerciseId, moduleId, unitId, attemptNumber = 1) => {
      if (authLoading || !isAuthenticated || !supabaseUser) return;

      trackingState.current = {
        isTracking: true,
        exerciseId,
        moduleId,
        unitId,
        attemptNumber,
        lastEntry: null,
      };
    },
    [authLoading, isAuthenticated, supabaseUser]
  );

  // Stop tracking text entries
  const stopTracking = useCallback(() => {
    trackingState.current.isTracking = false;
  }, []);

  // Track a text entry event
  const trackTextEntry = useCallback(
    async (
      entryType,
      textContent,
      cursorPosition = 0,
      selectionStart = 0,
      selectionEnd = 0
    ) => {
      if (
        authLoading ||
        !trackingState.current.isTracking ||
        !supabaseUser ||
        !supabaseClient
      ) {
        return;
      }

      const { exerciseId, moduleId, unitId, attemptNumber } =
        trackingState.current;
      const timestamp = Date.now();

      try {
        await supabaseClient.from("text_entries").insert({
          user_id: supabaseUser.id,
          exercise_id: exerciseId,
          module_id: moduleId,
          unit_id: unitId,
          attempt_number: attemptNumber,
          entry_type: entryType,
          text_content: textContent,
          cursor_position: cursorPosition,
          selection_start: selectionStart,
          selection_end: selectionEnd,
          timestamp_ms: timestamp,
        });

        // Update last entry for comparison
        trackingState.current.lastEntry = {
          textContent,
          cursorPosition,
          timestamp,
        };
      } catch (error) {
        console.error("Error tracking text entry:", error);
      }
    },
    [authLoading, supabaseUser, supabaseClient]
  );

  // Track typing events (with debouncing)
  const trackTyping = useCallback(
    async (textContent, cursorPosition) => {
      await trackTextEntry("typing", textContent, cursorPosition);
    },
    [trackTextEntry]
  );

  // Track paste events
  const trackPaste = useCallback(
    async (textContent, cursorPosition) => {
      await trackTextEntry("paste", textContent, cursorPosition);
    },
    [trackTextEntry]
  );

  // Track delete events
  const trackDelete = useCallback(
    async (textContent, cursorPosition) => {
      await trackTextEntry("delete", textContent, cursorPosition);
    },
    [trackTextEntry]
  );

  // Track focus events
  const trackFocus = useCallback(
    async (textContent, cursorPosition) => {
      await trackTextEntry("focus", textContent, cursorPosition);
    },
    [trackTextEntry]
  );

  // Track blur events
  const trackBlur = useCallback(
    async (textContent, cursorPosition) => {
      await trackTextEntry("blur", textContent, cursorPosition);
    },
    [trackTextEntry]
  );

  // Track submit events
  const trackSubmit = useCallback(
    async (textContent) => {
      await trackTextEntry("submit", textContent, textContent.length);
    },
    [trackTextEntry]
  );

  // Get text entry analytics for an exercise
  const getTextEntryAnalytics = useCallback(
    async (exerciseId, attemptNumber = null) => {
      if (!supabaseUser || !supabaseClient) return null;

      try {
        let query = supabaseClient
          .from("text_entries")
          .select("*")
          .eq("user_id", supabaseUser.id)
          .eq("exercise_id", exerciseId)
          .order("timestamp_ms", { ascending: true });

        if (attemptNumber !== null) {
          query = query.eq("attempt_number", attemptNumber);
        }

        const { data, error } = await query;
        if (error) throw error;

        return data;
      } catch (error) {
        console.error("Error fetching text entry analytics:", error);
        return null;
      }
    },
    [supabaseUser, supabaseClient]
  );

  return {
    startTracking,
    stopTracking,
    trackTyping,
    trackPaste,
    trackDelete,
    trackFocus,
    trackBlur,
    trackSubmit,
    getTextEntryAnalytics,
  };
};
