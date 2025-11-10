import { useState, useEffect, useCallback } from 'react';
import { useSupabaseClient } from './useSupabaseClient';
import { logger } from '../utils/logger';

export const useEmailTemplates = () => {
  const supabaseClient = useSupabaseClient();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all active templates
  const loadTemplates = useCallback(async () => {
    if (!supabaseClient) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabaseClient
        .from('email_templates')
        .select('*')
        .eq('active', true)
        .order('template_type');

      if (fetchError) throw fetchError;

      setTemplates(data || []);
      setError(null);
    } catch (err) {
      logger.error('Error loading email templates:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [supabaseClient]);

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  return {
    templates,
    loading,
    error,
    refresh: loadTemplates,
  };
};

// Hook for admin operations (requires service role - used in Edge Functions)
export const useEmailQueue = () => {
  const supabaseClient = useSupabaseClient();
  const [queueItems, setQueueItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadQueue = useCallback(async (filters = {}) => {
    if (!supabaseClient) return;

    try {
      setLoading(true);
      let query = supabaseClient
        .from('email_queue')
        .select('*, user_profiles(email, first_name, last_name)')
        .order('scheduled_for', { ascending: false })
        .limit(100);

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.email_type) {
        query = query.eq('email_type', filters.email_type);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setQueueItems(data || []);
    } catch (err) {
      logger.error('Error loading email queue:', err);
    } finally {
      setLoading(false);
    }
  }, [supabaseClient]);

  const queueEmail = async (userId, emailType, metadata = {}, scheduledFor = null) => {
    if (!supabaseClient) throw new Error('Not authenticated');

    try {
      const { data, error } = await supabaseClient
        .from('email_queue')
        .insert({
          user_id: userId,
          email_type: emailType,
          scheduled_for: scheduledFor || new Date().toISOString(),
          metadata,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (err) {
      logger.error('Error queuing email:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    queueItems,
    loading,
    loadQueue,
    queueEmail,
  };
};

