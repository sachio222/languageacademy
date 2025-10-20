import { useState, useEffect, useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";

export const useSupabaseProgress = () => {
  const {
    supabaseUser,
    supabaseClient,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [moduleProgress, setModuleProgress] = useState({});
  const [unitProgress, setUnitProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial progress data
  useEffect(() => {
    // Don't load anything until auth is completely ready
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !supabaseUser) {
      setLoading(false);
      return;
    }

    const loadProgressData = async () => {
      try {
        setLoading(true);

        // Load exercise completions
        const { data: exerciseData, error: exerciseError } =
          await supabaseClient
            .from(TABLES.EXERCISE_COMPLETIONS)
            .select("exercise_id")
            .eq("user_id", supabaseUser.id)
            .eq("is_correct", true);

        if (exerciseError) throw exerciseError;

        // Load module progress
        const { data: moduleData, error: moduleError } = await supabaseClient
          .from(TABLES.MODULE_PROGRESS)
          .select("*")
          .eq("user_id", supabaseUser.id);

        if (moduleError) throw moduleError;

        // Load unit progress
        const { data: unitData, error: unitError } = await supabaseClient
          .from(TABLES.UNIT_PROGRESS)
          .select("*")
          .eq("user_id", supabaseUser.id);

        if (unitError) throw unitError;

        // Process exercise completions
        const completedSet = new Set(exerciseData.map((e) => e.exercise_id));
        setCompletedExercises(completedSet);

        // Process module progress
        const moduleMap = {};
        moduleData.forEach((module) => {
          moduleMap[module.module_id] = module;
        });
        setModuleProgress(moduleMap);

        // Process unit progress
        const unitMap = {};
        unitData.forEach((unit) => {
          unitMap[unit.unit_id] = unit;
        });
        setUnitProgress(unitMap);

        setError(null);
      } catch (err) {
        console.error("Error loading progress data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [isAuthenticated, supabaseUser, supabaseClient, authLoading]);

  // Real-time subscriptions for progress updates
  useEffect(() => {
    if (authLoading || !isAuthenticated || !supabaseUser) return;

    const exerciseSubscription = supabaseClient
      .channel("exercise_completions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLES.EXERCISE_COMPLETIONS,
          filter: `user_id=eq.${supabaseUser.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new.is_correct) {
            setCompletedExercises(
              (prev) => new Set([...prev, payload.new.exercise_id])
            );
          }
        }
      )
      .subscribe();

    const moduleSubscription = supabaseClient
      .channel("module_progress")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLES.MODULE_PROGRESS,
          filter: `user_id=eq.${supabaseUser.id}`,
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            setModuleProgress((prev) => ({
              ...prev,
              [payload.new.module_id]: payload.new,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      exerciseSubscription.unsubscribe();
      moduleSubscription.unsubscribe();
    };
  }, [isAuthenticated, supabaseUser, supabaseClient, authLoading]);

  // Complete an exercise
  // exerciseId is now moduleKey-based (e.g., "2024-01-08-connectors.1") for stability
  const completeExercise = useCallback(
    async (
      exerciseId,
      moduleId,
      unitId,
      userAnswer,
      correctAnswer,
      timeSpent = 0,
      hintUsed = false,
      isCorrect = null
    ) => {
      if (!supabaseUser) return;

      try {
        // Optimistic update
        setCompletedExercises((prev) => new Set([...prev, exerciseId]));

        // Check if this exercise was attempted before
        const { data: existingAttempts, error: fetchError } =
          await supabaseClient
            .from(TABLES.EXERCISE_COMPLETIONS)
            .select("attempt_number")
            .eq("user_id", supabaseUser.id)
            .eq("exercise_id", exerciseId)
            .order("attempt_number", { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const attemptNumber =
          existingAttempts.length > 0
            ? existingAttempts[0].attempt_number + 1
            : 1;

        // Use the passed isCorrect result from test runner, or fallback to strict comparison
        const correct =
          isCorrect !== null
            ? isCorrect
            : userAnswer.trim().toLowerCase() ===
              correctAnswer.trim().toLowerCase();

        // Insert exercise completion
        const { error: insertError } = await supabaseClient
          .from(TABLES.EXERCISE_COMPLETIONS)
          .insert({
            user_id: supabaseUser.id,
            exercise_id: exerciseId,
            module_id: moduleId,
            unit_id: unitId,
            attempt_number: attemptNumber,
            is_correct: correct,
            user_answer: userAnswer,
            correct_answer: correctAnswer,
            time_spent_seconds: timeSpent,
            hint_used: hintUsed,
          });

        if (insertError) throw insertError;

        // If incorrect, revert optimistic update
        if (!correct) {
          setCompletedExercises((prev) => {
            const newSet = new Set(prev);
            newSet.delete(exerciseId);
            return newSet;
          });
        }

        return correct;
      } catch (err) {
        console.error("Error completing exercise:", err);
        // Revert optimistic update on error
        setCompletedExercises((prev) => {
          const newSet = new Set(prev);
          newSet.delete(exerciseId);
          return newSet;
        });
        throw err;
      }
    },
    [supabaseUser, supabaseClient]
  );

  // Update module progress
  const updateModuleProgress = useCallback(
    async (
      moduleId,
      unitId,
      totalExercises,
      completedCount,
      studyCompleted = false,
      examScore = null,
      timeSpent = 0
    ) => {
      if (!supabaseUser) return;

      try {
        const isCompleted =
          completedCount >= totalExercises &&
          studyCompleted &&
          examScore !== null;

        const { data, error } = await supabaseClient
          .from(TABLES.MODULE_PROGRESS)
          .upsert(
            {
              user_id: supabaseUser.id,
              module_id: moduleId,
              unit_id: unitId,
              total_exercises: totalExercises,
              completed_exercises: completedCount,
              study_mode_completed: studyCompleted,
              exam_score: examScore,
              time_spent_seconds: timeSpent,
              completed_at: isCompleted ? new Date().toISOString() : null,
            },
            {
              onConflict: "user_id,module_id",
            }
          )
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setModuleProgress((prev) => ({
          ...prev,
          [moduleId]: data,
        }));

        return data;
      } catch (err) {
        console.error("Error updating module progress:", err);
        throw err;
      }
    },
    [supabaseUser, supabaseClient]
  );

  // Update unit progress
  const updateUnitProgress = useCallback(
    async (
      unitId,
      unitName,
      totalModules,
      completedCount,
      examScore = null,
      timeSpent = 0
    ) => {
      if (!supabaseUser) return;

      try {
        const isCompleted =
          completedCount >= totalModules && examScore !== null;

        const { data, error } = await supabaseClient
          .from(TABLES.UNIT_PROGRESS)
          .upsert(
            {
              user_id: supabaseUser.id,
              unit_id: unitId,
              unit_name: unitName,
              total_modules: totalModules,
              completed_modules: completedCount,
              unit_exam_score: examScore,
              time_spent_seconds: timeSpent,
              completed_at: isCompleted ? new Date().toISOString() : null,
            },
            {
              onConflict: "user_id,unit_id",
            }
          )
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setUnitProgress((prev) => ({
          ...prev,
          [unitId]: data,
        }));

        return data;
      } catch (err) {
        console.error("Error updating unit progress:", err);
        throw err;
      }
    },
    [supabaseUser, supabaseClient]
  );

  // Mark concept as understood
  const updateConceptUnderstanding = useCallback(
    async (moduleId, conceptIndex, conceptTerm, understood = true) => {
      if (!supabaseUser) return;

      try {
        if (understood) {
          const { error } = await supabaseClient
            .from(TABLES.CONCEPT_UNDERSTANDING)
            .upsert({
              user_id: supabaseUser.id,
              module_id: moduleId,
              concept_index: conceptIndex,
              concept_term: conceptTerm,
            })
            .select();

          if (error) throw error;
        } else {
          const { error } = await supabaseClient
            .from(TABLES.CONCEPT_UNDERSTANDING)
            .delete()
            .eq("user_id", supabaseUser.id)
            .eq("module_id", moduleId)
            .eq("concept_index", conceptIndex)
            .select();

          if (error) throw error;
        }
      } catch (err) {
        console.error("Error updating concept understanding:", err);
        throw err;
      }
    },
    [supabaseUser, supabaseClient]
  );

  // Record exam attempt
  const recordExamAttempt = useCallback(
    async (
      examType,
      examId,
      totalQuestions,
      correctAnswers,
      scorePercentage,
      timeSpent,
      answers,
      passed
    ) => {
      if (!supabaseUser) return;

      try {
        // Get attempt number
        const { data: existingAttempts, error: fetchError } =
          await supabaseClient
            .from(TABLES.EXAM_ATTEMPTS)
            .select("attempt_number")
            .eq("user_id", supabaseUser.id)
            .eq("exam_type", examType)
            .eq("exam_id", examId)
            .order("attempt_number", { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const attemptNumber =
          existingAttempts.length > 0
            ? existingAttempts[0].attempt_number + 1
            : 1;

        const { data, error } = await supabaseClient
          .from(TABLES.EXAM_ATTEMPTS)
          .insert({
            user_id: supabaseUser.id,
            exam_type: examType,
            exam_id: examId,
            attempt_number: attemptNumber,
            completed_at: new Date().toISOString(),
            total_questions: totalQuestions,
            correct_answers: correctAnswers,
            score_percentage: scorePercentage,
            time_spent_seconds: timeSpent,
            answers: answers,
            passed: passed,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Error recording exam attempt:", err);
        throw err;
      }
    },
    [supabaseUser, supabaseClient]
  );

  // Mark welcome page as seen
  const markWelcomeAsSeen = useCallback(async () => {
    if (!isAuthenticated || !supabaseUser) return false;

    try {
      const { error } = await supabaseClient
        .from("user_profiles")
        .update({ has_seen_welcome: true })
        .eq("clerk_user_id", supabaseUser.clerk_user_id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error marking welcome as seen:", err);
      return false;
    }
  }, [isAuthenticated, supabaseUser, supabaseClient]);

  return {
    // State
    completedExercises,
    moduleProgress,
    unitProgress,
    loading,
    error,

    // Actions
    completeExercise,
    updateModuleProgress,
    updateUnitProgress,
    updateConceptUnderstanding,
    recordExamAttempt,
    markWelcomeAsSeen,

    // Computed values
    isAuthenticated,
    supabaseClient,
    supabaseUser,
  };
};
