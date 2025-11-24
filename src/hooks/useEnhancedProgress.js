/**
 * Enhanced Progress Hooks - Separated concerns with proper caching
 * Each hook handles one aspect of progress tracking
 * 
 * Uses patterns from React Query / TanStack Query for optimal performance
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { createProgressService } from '../services/progressService';
import { logger } from '../utils/logger';

// Cache configuration
const CACHE_CONFIG = {
  HERO_STATS: 5 * 60 * 1000, // 5 minutes
  UNIT_PROGRESS: 2 * 60 * 1000, // 2 minutes
  MODULE_DETAILS: 60 * 1000, // 1 minute
  SECTION_DETAILS: 30 * 1000, // 30 seconds
};

/**
 * Hook for hero stats (total time, streak, accuracy, words learned)
 * @param {string} userId - Optional user ID (defaults to current user)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useHeroStats = (userId = null) => {
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async (force = false) => {
    if (!isAuthenticated || !targetUserId) {
      setLoading(false);
      return;
    }

    // Check cache
    const now = Date.now();
    if (!force && lastFetch && now - lastFetch < CACHE_CONFIG.HERO_STATS) {
      logger.log('[useHeroStats] Using cached data');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const stats = await progressService.getHeroStats(targetUserId);
      setData(stats);
      setLastFetch(now);

      logger.log('[useHeroStats] Fetched hero stats', stats);
    } catch (err) {
      logger.error('[useHeroStats] Error fetching hero stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, isAuthenticated, progressService, lastFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
  };
};

/**
 * Hook for unit-level progress summary
 * @param {string} userId - Optional user ID
 * @returns {Object} { data, loading, error, refetch }
 */
export const useUnitProgress = (userId = null) => {
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async (force = false) => {
    if (!isAuthenticated || !targetUserId) {
      setLoading(false);
      return;
    }

    const now = Date.now();
    if (!force && lastFetch && now - lastFetch < CACHE_CONFIG.UNIT_PROGRESS) {
      logger.log('[useUnitProgress] Using cached data');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const units = await progressService.getUnitProgress(targetUserId);
      setData(units);
      setLastFetch(now);

      logger.log('[useUnitProgress] Fetched unit progress', { 
        count: units.length 
      });
    } catch (err) {
      logger.error('[useUnitProgress] Error fetching unit progress:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, isAuthenticated, progressService, lastFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
  };
};

/**
 * Hook for detailed module data within a unit (lazy-loaded)
 * @param {string} userId - Optional user ID
 * @param {string} unitId - Unit identifier
 * @param {Object} options - { enabled: boolean }
 * @returns {Object} { data, loading, error, refetch }
 */
export const useUnitModules = (userId = null, unitId, options = {}) => {
  const { enabled = false } = options;
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async (force = false) => {
    if (!isAuthenticated || !targetUserId || !unitId || !enabled) {
      setLoading(false);
      return;
    }

    const now = Date.now();
    if (!force && lastFetch && now - lastFetch < CACHE_CONFIG.MODULE_DETAILS) {
      logger.log('[useUnitModules] Using cached data');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const modules = await progressService.getUnitModules(targetUserId, unitId);
      setData(modules);
      setLastFetch(now);

      logger.log('[useUnitModules] Fetched unit modules', { 
        unitId, 
        count: modules.length 
      });
    } catch (err) {
      logger.error('[useUnitModules] Error fetching unit modules:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, unitId, enabled, isAuthenticated, progressService, lastFetch]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
  };
};

/**
 * Hook for section-level details of a specific module (lazy-loaded)
 * @param {string} userId - Optional user ID
 * @param {string} moduleKey - Module key
 * @param {Object} options - { enabled: boolean }
 * @returns {Object} { data, loading, error, refetch }
 */
export const useModuleSections = (userId = null, moduleKey, options = {}) => {
  const { enabled = false } = options;
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async (force = false) => {
    if (!isAuthenticated || !targetUserId || !moduleKey || !enabled) {
      setLoading(false);
      return;
    }

    const now = Date.now();
    if (!force && lastFetch && now - lastFetch < CACHE_CONFIG.SECTION_DETAILS) {
      logger.log('[useModuleSections] Using cached data');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const sections = await progressService.getModuleSections(targetUserId, moduleKey);
      setData(sections);
      setLastFetch(now);

      logger.log('[useModuleSections] Fetched module sections', { 
        moduleKey, 
        sectionCount: Object.keys(sections).length 
      });
    } catch (err) {
      logger.error('[useModuleSections] Error fetching module sections:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, moduleKey, enabled, isAuthenticated, progressService, lastFetch]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
  };
};

/**
 * Hook for section analytics across all modules
 * @param {string} userId - Optional user ID
 * @param {Object} options - { enabled: boolean }
 * @returns {Object} { data, loading, error, refetch }
 */
export const useSectionAnalytics = (userId = null, options = {}) => {
  const { enabled = true } = options;
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !targetUserId || !enabled) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const analytics = await progressService.getSectionAnalytics(targetUserId);
      setData(analytics);

      logger.log('[useSectionAnalytics] Fetched section analytics', { 
        count: analytics.length 
      });
    } catch (err) {
      logger.error('[useSectionAnalytics] Error fetching section analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, enabled, isAuthenticated, progressService]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

/**
 * Hook for recent activity (modules and exams)
 * @param {string} userId - Optional user ID
 * @param {number} limit - Number of items to return
 * @returns {Object} { data, loading, error, refetch }
 */
export const useRecentActivity = (userId = null, limit = 20) => {
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState({ modules: [], exams: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !targetUserId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const activity = await progressService.getRecentActivity(targetUserId, limit);
      setData(activity);

      logger.log('[useRecentActivity] Fetched recent activity', { 
        modules: activity.modules.length,
        exams: activity.exams.length
      });
    } catch (err) {
      logger.error('[useRecentActivity] Error fetching recent activity:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, limit, isAuthenticated, progressService]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

/**
 * Hook for user profile data
 * @param {string} userId - Optional user ID
 * @returns {Object} { data, loading, error, refetch }
 */
export const useUserProfile = (userId = null) => {
  const { supabaseUser, supabaseClient, isAuthenticated } = useSupabaseProgress();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetUserId = userId || supabaseUser?.id;
  const progressService = useMemo(
    () => createProgressService(supabaseClient),
    [supabaseClient]
  );

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !targetUserId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const profile = await progressService.getUserProfile(targetUserId);
      setData(profile);

      logger.log('[useUserProfile] Fetched user profile');
    } catch (err) {
      logger.error('[useUserProfile] Error fetching user profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [targetUserId, isAuthenticated, progressService]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

