import { useState, useEffect, useCallback } from 'react';
import { TABLES } from '../lib/supabase';
import { useAdmin } from './useAdmin';
import { useSupabaseClient } from './useSupabaseClient';
import { logger } from '../utils/logger';

/**
 * Hook for fetching all students data (admin only)
 * Provides paginated student list with summary stats
 * 
 * @returns {object} Students data with pagination
 */
export const useAllStudentsData = () => {
  const { isAdmin } = useAdmin();
  const supabaseClient = useSupabaseClient();
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 50,
    total: 0
  });
  
  // Fetch students with summary stats
  const fetchStudents = useCallback(async (page = 1) => {
    if (!isAdmin || !supabaseClient) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Calculate pagination
      const from = (page - 1) * pagination.perPage;
      const to = from + pagination.perPage - 1;
      
      // Fetch total count separately to ensure we get the full count
      const { count, error: countError } = await supabaseClient
        .from(TABLES.USER_PROFILES)
        .select('*', { count: 'exact', head: true });
      
      if (countError) throw countError;
      
      // Fetch user profiles for current page
      const { data: profiles, error: profilesError } = await supabaseClient
        .from(TABLES.USER_PROFILES)
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (profilesError) throw profilesError;
      
      // Fetch summary stats for each student
      const studentsWithStats = await Promise.all(
        profiles.map(async (profile) => {
          return fetchStudentSummary(profile);
        })
      );
      
      setStudents(studentsWithStats);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        total: count || 0
      }));
      
    } catch (err) {
      logger.error('Error fetching students data:', err);
      setError(err.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [isAdmin, supabaseClient, pagination.perPage]);
  
  // Fetch summary stats for a single student
  const fetchStudentSummary = async (profile) => {
    try {
      // Fetch counts in parallel
      const [modulesResult, exercisesResult, unitsResult] = await Promise.all([
        supabaseClient
          .from(TABLES.MODULE_PROGRESS)
          .select('completed_at', { count: 'exact' })
          .eq('user_id', profile.id)
          .not('completed_at', 'is', null),
        
        supabaseClient
          .from(TABLES.EXERCISE_COMPLETIONS)
          .select('is_correct', { count: 'exact' })
          .eq('user_id', profile.id),
        
        supabaseClient
          .from("module_progress") // Calculate unit progress from module_progress instead
          .select('*')
          .eq('user_id', profile.id)
      ]);
      
      const modulesCompleted = modulesResult.count || 0;
      const exercisesData = exercisesResult.data || [];
      const unitsData = unitsResult.data || [];
      
      // Calculate accuracy
      const correct = exercisesData.filter(e => e.is_correct).length;
      const total = exercisesData.length;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      
      // Calculate engagement status
      const engagementStatus = calculateEngagementStatus(profile.last_active_at);
      
      return {
        ...profile,
        stats: {
          modulesCompleted,
          accuracy,
          unitsCompleted: unitsData.filter(u => u.completed_at).length,
          totalExercises: total,
          engagementStatus
        }
      };
      
    } catch (err) {
      logger.error(`Error fetching summary for student ${profile.id}:`, err);
      return {
        ...profile,
        stats: {
          modulesCompleted: 0,
          accuracy: 0,
          unitsCompleted: 0,
          totalExercises: 0,
          engagementStatus: 'unknown'
        }
      };
    }
  };
  
  // Calculate engagement status based on last active date
  const calculateEngagementStatus = (lastActiveAt) => {
    if (!lastActiveAt) return 'inactive';
    
    const now = new Date();
    const lastActive = new Date(lastActiveAt);
    const hoursSinceActive = (now - lastActive) / (1000 * 60 * 60);
    
    if (hoursSinceActive < 24) return 'active';
    if (hoursSinceActive < 24 * 3) return 'recent';
    if (hoursSinceActive < 24 * 7) return 'at-risk';
    return 'inactive';
  };
  
  // Load initial page
  useEffect(() => {
    fetchStudents(1);
  }, [isAdmin, supabaseClient]);
  
  // Real-time subscription for last_active_at updates
  useEffect(() => {
    if (!isAdmin || !supabaseClient) return;
    
    const subscription = supabaseClient
      .channel('user_profiles_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLES.USER_PROFILES
        },
        (payload) => {
          // Update student in list
          setStudents(prev => prev.map(student => 
            student.id === payload.new.id
              ? {
                  ...student,
                  ...payload.new,
                  stats: {
                    ...student.stats,
                    engagementStatus: calculateEngagementStatus(payload.new.last_active_at)
                  }
                }
              : student
          ));
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin, supabaseClient]);
  
  // Pagination controls
  const goToPage = useCallback((page) => {
    fetchStudents(page);
  }, [fetchStudents]);
  
  const nextPage = useCallback(() => {
    const totalPages = Math.ceil(pagination.total / pagination.perPage);
    if (pagination.currentPage < totalPages) {
      goToPage(pagination.currentPage + 1);
    }
  }, [pagination, goToPage]);
  
  const prevPage = useCallback(() => {
    if (pagination.currentPage > 1) {
      goToPage(pagination.currentPage - 1);
    }
  }, [pagination, goToPage]);
  
  return {
    students,
    loading,
    error,
    pagination: {
      ...pagination,
      totalPages: Math.ceil(pagination.total / pagination.perPage),
      hasNext: pagination.currentPage < Math.ceil(pagination.total / pagination.perPage),
      hasPrev: pagination.currentPage > 1
    },
    refetch: () => fetchStudents(pagination.currentPage),
    goToPage,
    nextPage,
    prevPage
  };
};

