import { useState, useEffect, useCallback } from 'react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { logger } from '../utils/logger';

/**
 * Section Progress Hook
 * Manages section-level completion and progress data
 * Integrates with time tracking and flexible section system
 */
export const useSectionProgress = () => {
  const [sectionProgress, setSectionProgress] = useState({});
  const [loading, setLoading] = useState(true);
  
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();

  // Load section progress with smart migration from legacy module_progress data
  const loadSectionProgress = useCallback(async () => {
    if (!isAuthenticated || !supabaseUser) {
      setLoading(false);
      return;
    }

    try {
      // Load both section_progress and module_progress for migration
      const [sectionResult, moduleResult] = await Promise.all([
        supabaseClient
          .from('section_progress')
          .select('*')
          .eq('user_id', supabaseUser.id),
        
        supabaseClient
          .from('module_progress')
          .select('module_key, study_mode_completed, completed_exercises, total_exercises, completed_at')
          .eq('user_id', supabaseUser.id)
      ]);

      if (sectionResult.error) throw sectionResult.error;
      if (moduleResult.error) throw moduleResult.error;

      const sectionData = sectionResult.data || [];
      const moduleData = moduleResult.data || [];

      // Organize existing section progress by module_key -> section_id
      const progressByModule = {};
      sectionData.forEach(item => {
        if (!progressByModule[item.module_key]) {
          progressByModule[item.module_key] = {};
        }
        progressByModule[item.module_key][item.section_id] = item;
      });

      // No migration needed - users will naturally complete sections with new tracking

      setSectionProgress(progressByModule);
      logger.log('Loaded section progress for', Object.keys(progressByModule).length, 'modules');
      
    } catch (error) {
      logger.error('Error loading section progress:', error);
    } finally {
      setLoading(false);
    }
  }, [supabaseUser, supabaseClient]);

  // Update section progress
  const updateSectionProgress = useCallback(async (
    moduleId, 
    sectionId, 
    progressData = {}, 
    isCompleted = false
  ) => {
    if (!isAuthenticated || !supabaseUser) return null;

    try {
      const updateData = {
        user_id: supabaseUser.id,
        module_key: moduleId,
        section_id: sectionId,
        progress_data: progressData,
        last_activity_at: new Date().toISOString(),
      };

      // Set completion timestamp if completed
      if (isCompleted) {
        updateData.completed_at = new Date().toISOString();
      }

      logger.log('useSectionProgress: Updating section progress', {
        moduleId,
        sectionId,
        updateData,
        isCompleted,
        supabaseUserId: supabaseUser.id,
        supabaseUserType: typeof supabaseUser.id,
        supabaseUserFull: supabaseUser
      });

      const { data, error } = await supabaseClient
        .from('section_progress')
        .upsert(updateData, { 
          onConflict: 'user_id,module_key,section_id' 
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setSectionProgress(prev => ({
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          [sectionId]: data
        }
      }));

      logger.log(`useSectionProgress: Updated section progress successfully: ${moduleId}/${sectionId}`, { 
        progressData, 
        isCompleted,
        data
      });
      return data;
      
    } catch (error) {
      logger.error('Error updating section progress:', error);
      throw error;
    }
  }, [supabaseUser, supabaseClient]);

  // Mark section as completed
  const completeSectionProgress = useCallback(async (
    moduleId, 
    sectionId, 
    completionData = {}
  ) => {
    return updateSectionProgress(moduleId, sectionId, completionData, true);
  }, [updateSectionProgress]);

  // Get section progress for a specific module
  const getModuleSectionProgress = useCallback((moduleId) => {
    return sectionProgress[moduleId] || {};
  }, [sectionProgress]);

  // Get specific section progress
  const getSectionProgressData = useCallback((moduleId, sectionId) => {
    return sectionProgress[moduleId]?.[sectionId] || null;
  }, [sectionProgress]);

  // Check if section is completed
  const isSectionCompleted = useCallback((moduleId, sectionId) => {
    const sectionData = getSectionProgressData(moduleId, sectionId);
    return !!sectionData?.completed_at;
  }, [getSectionProgressData]);

  // Get section time spent
  const getSectionTimeSpent = useCallback((moduleId, sectionId) => {
    const sectionData = getSectionProgressData(moduleId, sectionId);
    return sectionData?.time_spent_seconds || 0;
  }, [getSectionProgressData]);

  // Load progress on mount and user change
  useEffect(() => {
    loadSectionProgress();
  }, [loadSectionProgress]);

  // Real-time subscription for section progress updates
  useEffect(() => {
    if (!isAuthenticated || !supabaseUser) return;

    const subscription = supabaseClient
      .channel('section_progress_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'section_progress',
          filter: `user_id=eq.${supabaseUser.id}`,
        },
        (payload) => {
          logger.log('Section progress real-time update:', payload);
          
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const { module_key, section_id } = payload.new;
            
            // Update local state immediately
            setSectionProgress(prev => ({
              ...prev,
              [module_key]: {
                ...prev[module_key],
                [section_id]: payload.new
              }
            }));
          } else if (payload.eventType === 'DELETE') {
            const { module_key, section_id } = payload.old;
            
            // Remove from local state
            setSectionProgress(prev => {
              const newState = { ...prev };
              if (newState[module_key]) {
                const { [section_id]: removed, ...rest } = newState[module_key];
                newState[module_key] = rest;
              }
              return newState;
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [isAuthenticated, supabaseUser, supabaseClient]);

  return {
    sectionProgress,
    loading,
    updateSectionProgress,
    completeSectionProgress,
    getModuleSectionProgress,
    getSectionProgressData,
    isSectionCompleted,
    getSectionTimeSpent,
    loadSectionProgress,
  };
};
