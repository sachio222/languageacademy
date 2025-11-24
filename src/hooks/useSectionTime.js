import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useSupabaseClient } from './useSupabaseClient';
import { logger } from '../utils/logger';

/**
 * Section-specific time tracking hook
 * Integrates with existing time tracking principles (idle detection, activity monitoring)
 * Tracks time per section within a module
 */
export const useSectionTime = (moduleId, sectionId, isActive = true) => {
  const [totalTime, setTotalTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  
  const { supabaseUser } = useAuth();
  const supabaseClient = useSupabaseClient();

  // Idle detection (same as existing hooks)
  const IDLE_THRESHOLD = 30000; // 30 seconds
  const lastActivityRef = useRef(Date.now());

  // Update last activity timestamp
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Check if user is idle
  const isIdle = useCallback(() => {
    return Date.now() - lastActivityRef.current > IDLE_THRESHOLD;
  }, []);

  // Update section time in database
  const updateSectionTime = useCallback(async (additionalSeconds) => {
    if (!supabaseUser || !moduleId || !sectionId || additionalSeconds <= 0) return;

    try {
      // Get current section progress
      const { data: currentProgress, error: fetchError } = await supabaseClient
        .from('section_progress')
        .select('time_spent_seconds')
        .eq('user_id', supabaseUser.id)
        .eq('module_key', moduleId)
        .eq('section_id', sectionId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
        throw fetchError;
      }

      const currentTime = currentProgress?.time_spent_seconds || 0;
      const newTotalTime = currentTime + additionalSeconds;

      // Upsert section progress with updated time
      const { error: upsertError } = await supabaseClient
        .from('section_progress')
        .upsert({
          user_id: supabaseUser.id,
          module_key: moduleId,
          section_id: sectionId,
          time_spent_seconds: newTotalTime,
          last_activity_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,module_key,section_id'
        });

      if (upsertError) throw upsertError;

      logger.analytics(`Updated section time: ${moduleId}/${sectionId} +${additionalSeconds}s (total: ${newTotalTime}s)`);
      
    } catch (error) {
      logger.error('Error updating section time:', error);
    }
  }, [supabaseUser, supabaseClient, moduleId, sectionId]);

  // Start tracking time
  const startTracking = useCallback(() => {
    if (isTracking || !moduleId || !sectionId) return;
    
    startTimeRef.current = Date.now();
    setIsTracking(true);
    lastActivityRef.current = Date.now();
    
    logger.analytics(`Started tracking section time for: ${moduleId}/${sectionId}`);
  }, [isTracking, moduleId, sectionId]);

  // Stop tracking time
  const stopTracking = useCallback(() => {
    if (!isTracking || !startTimeRef.current) return;
    
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    
    // Only count time if user wasn't idle
    if (!isIdle() && timeSpent > 0) {
      setTotalTime(prev => prev + timeSpent);
      
      // Update section time in database
      updateSectionTime(timeSpent);
      
      logger.analytics(`Stopped tracking section time for: ${moduleId}/${sectionId}, time: ${timeSpent}s`);
    }
    
    setIsTracking(false);
    startTimeRef.current = null;
  }, [isTracking, isIdle, moduleId, sectionId, updateSectionTime]);

  // Handle page visibility changes (same as existing hooks)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTracking();
      } else if (isActive) {
        startTracking();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, startTracking, stopTracking]);

  // Handle user activity (same as existing hooks)
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [updateActivity]);

  // Start/stop tracking based on isActive
  useEffect(() => {
    if (isActive && moduleId && sectionId) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isActive, moduleId, sectionId, startTracking, stopTracking]);

  // Periodic check for idle state (same as existing hooks)
  useEffect(() => {
    if (!isTracking) return;

    intervalRef.current = setInterval(() => {
      if (isIdle()) {
        // User is idle, pause tracking
        if (startTimeRef.current) {
          const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
          if (timeSpent > 0) {
            setTotalTime(prev => prev + timeSpent);
            updateSectionTime(timeSpent);
          }
          startTimeRef.current = null; // Reset timer
        }
      } else if (!startTimeRef.current) {
        // User became active again, resume tracking
        startTimeRef.current = Date.now();
      }
    }, 5000); // Check every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTracking, isIdle, updateSectionTime]);

  return {
    totalTime,
    isTracking,
    startTracking,
    stopTracking
  };
};


