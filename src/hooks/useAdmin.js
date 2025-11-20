import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useSupabaseClient } from './useSupabaseClient';
import { logger } from '../utils/logger';

export const useAdmin = () => {
  const { user, supabaseUser } = useAuth();
  const supabaseClient = useSupabaseClient();
  const [newFeedbackCount, setNewFeedbackCount] = useState(0);

  // Admin access control - only allow specific user
  const ADMIN_CLERK_USER_ID = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q';
  const ADMIN_SUPABASE_USER_ID = '35e33bec-de10-4d70-86a3-c992fc7655dc';

  const isAdmin = user?.id === ADMIN_CLERK_USER_ID || supabaseUser?.id === ADMIN_SUPABASE_USER_ID;

  // Refresh feedback count
  const refreshFeedbackCount = useCallback(async () => {
    if (!isAdmin || !supabaseClient) return;

    try {
      const { count, error } = await supabaseClient
        .from('feedback')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      if (!error) {
        setNewFeedbackCount(count || 0);
      }
    } catch (error) {
      logger.error('Error fetching feedback count:', error);
    }
  }, [isAdmin, supabaseClient]);

  // Fetch new feedback count for admin badge
  useEffect(() => {
    if (!isAdmin || !supabaseClient) return;
    let cancelled = false;

    const fetchNewFeedbackCount = async () => {
      try {
        const { count, error } = await supabaseClient
          .from('feedback')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');

        if (!cancelled && !error) {
          setNewFeedbackCount(count || 0);
        }
      } catch (error) {
        if (!cancelled) {
          logger.error('Error fetching feedback count:', error);
        }
      }
    };

    fetchNewFeedbackCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchNewFeedbackCount, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isAdmin, supabaseClient]);

  return {
    isAdmin,
    newFeedbackCount,
    refreshFeedbackCount
  };
};
