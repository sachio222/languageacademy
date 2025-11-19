import { useState, useEffect, useCallback } from "react";
import { TABLES } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { logger } from "../utils/logger";
import { trackClarityEvent, setClarityTag, upgradeClaritySession } from "../utils/clarity";

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
          moduleMap[module.module_key] = module;
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
        logger.error("Error loading progress data:", err);
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
              [payload.new.module_key]: payload.new,
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
            module_key: moduleId,
            unit_id: unitId,
            attempt_number: attemptNumber,
            is_correct: correct,
            user_answer: userAnswer,
            correct_answer: correctAnswer,
            time_spent_seconds: timeSpent,
            hint_used: hintUsed,
          });

        if (insertError) throw insertError;

        // Track in Clarity
        if (correct) {
          trackClarityEvent('exerciseCompleted');
          setClarityTag('lastExerciseUnit', unitId);
          setClarityTag('usedHint', hintUsed ? 'yes' : 'no');
          
          // Upgrade session for first-time completions
          if (attemptNumber === 1) {
            upgradeClaritySession('first exercise completion');
          }
        } else {
          trackClarityEvent('exerciseFailed');
          setClarityTag('struggledWithExercise', exerciseId);
        }

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
        logger.error("Error completing exercise:", err);
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

        // Build update object without time_spent_seconds (managed by useModuleTime)
        const updateData = {
          user_id: supabaseUser.id,
                module_key: moduleId,
          unit_id: unitId,
          total_exercises: totalExercises,
          completed_exercises: completedCount,
          study_mode_completed: studyCompleted,
          exam_score: examScore,
          completed_at: isCompleted ? new Date().toISOString() : null,
        };

        // Only include time_spent_seconds if it's provided (for backward compatibility)
        // The new useModuleTime hook manages time separately
        if (timeSpent > 0) {
          logger.warn(`updateModuleProgress called with timeSpent=${timeSpent}. Time should be managed by useModuleTime hook.`);
          // Don't include time_spent_seconds - let useModuleTime handle it
        }

        const { data, error } = await supabaseClient
          .from(TABLES.MODULE_PROGRESS)
          .upsert(updateData, {
            onConflict: "user_id,module_key",
          })
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setModuleProgress((prev) => ({
          ...prev,
          [moduleId]: data,
        }));

        // Handle module completion (sync + send email)
        if (data.completed_at) {
          try {
            const { data: userProfile } = await supabaseClient
              .from('user_profiles')
              .select('email, preferred_name, first_name')
              .eq('id', supabaseUser.id)
              .single();

            if (userProfile) {
              // Sync to MailerLite for segment management
              try {
                await supabaseClient.functions.invoke('sync-to-mailerlite', {
                  body: {
                    event: 'module_completed',
                    user_id: supabaseUser.id,
                    email: userProfile.email,
                    name: userProfile.preferred_name || userProfile.first_name,
                    metadata: {
                      group: 'Module Completers',
                      module_key: moduleId,
                      modules_completed: Object.keys(moduleProgress).filter(id => moduleProgress[id]?.completed_at).length + 1
                    }
                  }
                });
              } catch (syncError) {
                logger.error('Error syncing to MailerLite:', syncError);
                // Continue even if sync fails
              }

              // Send congrats email via Resend
              try {
                const { emailTemplates } = await import('../utils/emailTemplates.js');
                const template = emailTemplates.lessonComplete(
                  userProfile.preferred_name || userProfile.first_name || 'there',
                  `Module ${moduleId}`, // Could fetch actual title
                  moduleId
                );

                await supabaseClient.functions.invoke('send-resend-email', {
                  body: {
                    to: userProfile.email,
                    subject: template.subject,
                    html: template.html,
                    email_type: 'lesson_complete',
                    user_id: supabaseUser.id,
                    metadata: { module_key: moduleId }
                  }
                });
              } catch (emailError) {
                logger.error('Error sending completion email:', emailError);
                // Continue even if email fails
              }

              // Trigger n8n reengagement email workflow
              try {
                const webhookUrl = import.meta.env.VITE_N8N_MODULE_COMPLETION_WEBHOOK;
                
                if (!webhookUrl) {
                  logger.warn('VITE_N8N_MODULE_COMPLETION_WEBHOOK environment variable not set - skipping webhook');
                  return; // Skip webhook if not configured
                }

                logger.log('Triggering n8n webhook for module completion', { 
                  moduleId, 
                  userId: supabaseUser.id,
                  webhookUrl: webhookUrl.substring(0, 50) + '...' 
                });

                // Get unit number from frontend source of truth (same as navigation)
                // This ensures we use the same dynamic unit structure as the UI
                let unitNumber = null;
                let numericModuleId = null;
                try {
                  const { getModuleId } = await import('../lessons/moduleIdResolver.js');
                  const { getUnitForLesson } = await import('../utils/unitHelpers.js');
                  numericModuleId = getModuleId(moduleId);
                  
                  if (numericModuleId !== 'UNKNOWN') {
                    const unit = getUnitForLesson(numericModuleId);
                    if (unit && unit.id) {
                      // unit.id is the numeric unit number (1, 2, 3, etc.) from metadata.id
                      // generateUnitStructure spreads unitConfig.metadata properties directly
                      unitNumber = unit.id;
                      logger.log('Calculated unit number from frontend', { moduleId, numericModuleId, unitNumber, unitTitle: unit.title });
                    }
                  }
                } catch (unitError) {
                  logger.warn('Failed to calculate unit number, continuing without it', unitError);
                }

                // Fetch email metadata from edge function
                let emailMetadata = null;
                try {
                  // Use numericModuleId already calculated above
                  if (numericModuleId && numericModuleId !== 'UNKNOWN') {
                    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
                    const metadataUrl = `${supabaseUrl}/functions/v1/get-module-email-data?module_id=${numericModuleId}`;
                    
                    const metadataResponse = await fetch(metadataUrl, {
                      headers: {
                        'Authorization': `Bearer ${supabaseAnonKey}`,
                        'Content-Type': 'application/json',
                      },
                    });

                    if (metadataResponse.ok) {
                      const metadataData = await metadataResponse.json();
                      if (metadataData.success && metadataData.data) {
                        emailMetadata = metadataData.data;
                        logger.log('Fetched email metadata for module', { moduleId, numericModuleId });
                      }
                    }
                  }
                } catch (metadataError) {
                  logger.warn('Failed to fetch email metadata, continuing without it', metadataError);
                  // Continue without metadata - don't fail the webhook
                }

                const webhookPayload = {
                  user_id: supabaseUser.id,
                  email: userProfile.email,
                  name: userProfile.preferred_name || userProfile.first_name || 'Student',
                  module_key: moduleId,
                  module_id: numericModuleId && numericModuleId !== 'UNKNOWN' ? numericModuleId : null, // Add numeric module ID for email template
                  exam_score: examScore,
                  completed_at: data.completed_at,
                  modules_completed: Object.keys(moduleProgress).filter(id => moduleProgress[id]?.completed_at).length + 1,
                  // Add email metadata if available
                  // Use frontend-calculated unitNumber (from same source as navigation) instead of edge function
                  ...(emailMetadata && {
                    module_metadata: {
                      title: emailMetadata.module?.title,
                      capabilities: emailMetadata.module?.capabilities,
                      realWorldUse: emailMetadata.module?.realWorldUse,
                      milestone: emailMetadata.module?.milestone,
                      utilityScore: emailMetadata.module?.utilityScore,
                      isUnitCompletion: emailMetadata.module?.isUnitCompletion,
                      nextModuleTeaser: emailMetadata.module?.nextModuleTeaser,
                      unitNumber: unitNumber || emailMetadata.module?.unitNumber, // Prefer frontend-calculated unit number
                    },
                    next_module_metadata: emailMetadata.nextModule ? {
                      title: emailMetadata.nextModule.title,
                      realWorldUse: emailMetadata.nextModule.realWorldUse,
                      capabilities: emailMetadata.nextModule.capabilities,
                    } : null,
                  }),
                };

                const response = await fetch(webhookUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(webhookPayload),
                  // Add timeout to prevent hanging
                  signal: AbortSignal.timeout(10000) // 10 second timeout
                });

                if (!response.ok) {
                  const errorText = await response.text().catch(() => 'Unable to read error response');
                  throw new Error(`Webhook failed: ${response.status} ${response.statusText} - ${errorText}`);
                }

                logger.log('Successfully triggered n8n module completion workflow', { 
                  moduleId, 
                  userId: supabaseUser.id,
                  status: response.status 
                });

              } catch (webhookError) {
                // More detailed error logging
                if (webhookError.name === 'AbortError') {
                  logger.error('n8n webhook timeout (10s) - check webhook URL and n8n instance', { moduleId });
                } else if (webhookError.message?.includes('Failed to fetch')) {
                  logger.error('n8n webhook network error - check URL and CORS settings', { 
                    moduleId, 
                    error: webhookError.message,
                    webhookUrl: import.meta.env.VITE_N8N_MODULE_COMPLETION_WEBHOOK?.substring(0, 50) + '...'
                  });
                } else {
                  logger.error('n8n webhook error:', webhookError);
                }
                // Continue - don't let webhook errors break progress tracking
              }
            }
          } catch (error) {
            logger.error('Error handling module completion:', error);
            // Continue - don't let email errors break progress tracking
          }
        }

        return data;
      } catch (err) {
        logger.error("Error updating module progress:", err);
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

        // Build update object without time_spent_seconds (managed by useModuleTime)
        const updateData = {
          user_id: supabaseUser.id,
          unit_id: unitId,
          unit_name: unitName,
          total_modules: totalModules,
          completed_modules: completedCount,
          unit_exam_score: examScore,
          completed_at: isCompleted ? new Date().toISOString() : null,
        };

        // Only include time_spent_seconds if it's provided (for backward compatibility)
        // The new useModuleTime hook manages unit time separately
        if (timeSpent > 0) {
          logger.warn(`updateUnitProgress called with timeSpent=${timeSpent}. Time should be managed by useModuleTime hook.`);
          // Don't include time_spent_seconds - let useModuleTime handle it
        }

        const { data, error } = await supabaseClient
          .from(TABLES.UNIT_PROGRESS)
          .upsert(updateData, {
            onConflict: "user_id,unit_id",
          })
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
        logger.error("Error updating unit progress:", err);
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
            .upsert(
              {
                user_id: supabaseUser.id,
                module_key: moduleId,
                concept_index: conceptIndex,
                concept_term: conceptTerm,
              },
              {
                onConflict: "user_id,module_key,concept_index",
              }
            )
            .select();

          if (error) throw error;
        } else {
          const { error } = await supabaseClient
            .from(TABLES.CONCEPT_UNDERSTANDING)
            .delete()
            .eq("user_id", supabaseUser.id)
            .eq("module_key", moduleId)
            .eq("concept_index", conceptIndex)
            .select();

          if (error) throw error;
        }
      } catch (err) {
        logger.error("Error updating concept understanding:", err);
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
        logger.error("Error recording exam attempt:", err);
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
      logger.error("Error marking welcome as seen:", err);
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
