import { useState, useEffect, useRef, useCallback } from 'react';
import { useStudyTime } from './useStudyTime';
import { logger } from '../utils/logger';

export const usePageTime = (pageId, isActive = true) => {
  const [totalTime, setTotalTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const { updateStudyTime } = useStudyTime();

  // Idle detection
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

  // Start tracking time
  const startTracking = useCallback(() => {
    if (isTracking) return;
    
    startTimeRef.current = Date.now();
    setIsTracking(true);
    lastActivityRef.current = Date.now();
    
    logger.analytics(`Started tracking page time for: ${pageId}`);
  }, [isTracking, pageId]);

  // Stop tracking time
  const stopTracking = useCallback(() => {
    if (!isTracking || !startTimeRef.current) return;
    
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    
    // Only count time if user wasn't idle
    if (!isIdle() && timeSpent > 0) {
      setTotalTime(prev => prev + timeSpent);
      
      // Update study time in database
      updateStudyTime(timeSpent);
      
      logger.analytics(`Stopped tracking page time for: ${pageId}, time: ${timeSpent}s`);
    }
    
    setIsTracking(false);
    startTimeRef.current = null;
  }, [isTracking, isIdle, pageId, updateStudyTime]);

  // Handle page visibility changes
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

  // Handle user activity
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

  // Periodic check for idle state
  useEffect(() => {
    if (!isTracking) return;

    intervalRef.current = setInterval(() => {
      if (isIdle()) {
        // User is idle, pause tracking
        if (startTimeRef.current) {
          const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
          if (timeSpent > 0) {
            setTotalTime(prev => prev + timeSpent);
            updateStudyTime(timeSpent);
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
  }, [isTracking, isIdle, updateStudyTime]);

  return {
    totalTime,
    isTracking,
    startTracking,
    stopTracking,
  };
};
