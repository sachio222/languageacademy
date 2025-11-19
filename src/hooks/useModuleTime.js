import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useSupabaseClient } from './useSupabaseClient';
import { logger } from '../utils/logger';
import { TABLES } from '../lib/supabase';

/**
 * Module-specific time tracking hook
 * Based on the working usePageTime system but tracks time per module/unit
 * Features: idle detection, activity monitoring, cumulative tracking
 */
export const useModuleTime = (moduleId, unitId, isActive = true) => {
  const [totalTime, setTotalTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  
  const { supabaseUser } = useAuth();
  const supabaseClient = useSupabaseClient();

  // Idle detection (same as usePageTime)
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

  // Update module time in database
  const updateModuleTime = useCallback(async (additionalSeconds) => {
    if (!supabaseUser || !moduleId || additionalSeconds <= 0) return;

    try {
      // Get current module progress
      const { data: currentProgress, error: fetchError } = await supabaseClient
        .from(TABLES.MODULE_PROGRESS)
        .select('time_spent_seconds')
        .eq('user_id', supabaseUser.id)
        .eq('module_key', moduleId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
        throw fetchError;
      }

      const currentTime = currentProgress?.time_spent_seconds || 0;
      const newTotalTime = currentTime + additionalSeconds;

      // Upsert with cumulative time
      const { error: updateError } = await supabaseClient
        .from(TABLES.MODULE_PROGRESS)
        .upsert({
          user_id: supabaseUser.id,
          module_key: moduleId,
          unit_id: unitId,
          time_spent_seconds: newTotalTime,
          // Don't overwrite other fields if they exist
        }, {
          onConflict: 'user_id,module_key',
          ignoreDuplicates: false
        });

      if (updateError) throw updateError;

      logger.analytics(`Updated module ${moduleId} time: +${additionalSeconds}s (total: ${newTotalTime}s)`);
    } catch (err) {
      logger.error('Error updating module time:', err);
    }
  }, [supabaseUser, supabaseClient, moduleId, unitId]);

  // Update unit time in database
  const updateUnitTime = useCallback(async (additionalSeconds) => {
    if (!supabaseUser || !unitId || additionalSeconds <= 0) return;

    try {
      // Get current unit progress
      const { data: currentProgress, error: fetchError } = await supabaseClient
        .from(TABLES.UNIT_PROGRESS)
        .select('time_spent_seconds')
        .eq('user_id', supabaseUser.id)
        .eq('unit_id', unitId)
        .single();

      // If no progress exists yet, skip - it will be created by updateUnitProgress later
      if (fetchError && fetchError.code === 'PGRST116') {
        logger.analytics(`Unit ${unitId} progress doesn't exist yet, skipping time update`);
        return;
      }

      if (fetchError) throw fetchError;

      const currentTime = currentProgress?.time_spent_seconds || 0;
      const newTotalTime = currentTime + additionalSeconds;

      // UPDATE only (don't insert new rows without unit_name)
      const { error: updateError } = await supabaseClient
        .from(TABLES.UNIT_PROGRESS)
        .update({
          time_spent_seconds: newTotalTime,
        })
        .eq('user_id', supabaseUser.id)
        .eq('unit_id', unitId);

      if (updateError) throw updateError;

      logger.analytics(`Updated unit ${unitId} time: +${additionalSeconds}s (total: ${newTotalTime}s)`);
    } catch (err) {
      logger.error('Error updating unit time:', err);
    }
  }, [supabaseUser, supabaseClient, unitId]);

  // Start tracking time
  const startTracking = useCallback(() => {
    if (isTracking) return;
    
    startTimeRef.current = Date.now();
    setIsTracking(true);
    lastActivityRef.current = Date.now();
    
    logger.analytics(`Started tracking module time for: ${moduleId}`);
  }, [isTracking, moduleId]);

  // Stop tracking time
  const stopTracking = useCallback(() => {
    if (!isTracking || !startTimeRef.current) return;
    
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    
    // Only count time if user wasn't idle
    if (!isIdle() && timeSpent > 0) {
      setTotalTime(prev => prev + timeSpent);
      
      // Update both module and unit time in database
      updateModuleTime(timeSpent);
      updateUnitTime(timeSpent);
      
      logger.analytics(`Stopped tracking module time for: ${moduleId}, time: ${timeSpent}s`);
    }
    
    setIsTracking(false);
    startTimeRef.current = null;
  }, [isTracking, isIdle, moduleId, updateModuleTime, updateUnitTime]);

  // Handle page visibility changes (same as usePageTime)
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

  // Handle user activity (same as usePageTime)
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
    if (isActive) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isActive, startTracking, stopTracking]);

  // Periodic check for idle state (same as usePageTime)
  useEffect(() => {
    if (!isTracking) return;

    intervalRef.current = setInterval(() => {
      if (isIdle()) {
        // User is idle, pause tracking
        if (startTimeRef.current) {
          const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
          if (timeSpent > 0) {
            setTotalTime(prev => prev + timeSpent);
            updateModuleTime(timeSpent);
            updateUnitTime(timeSpent);
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
  }, [isTracking, isIdle, updateModuleTime, updateUnitTime]);

  return {
    totalTime,
    isTracking,
    startTracking,
    stopTracking,
  };
};
