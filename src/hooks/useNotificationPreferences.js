import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { logger } from '../utils/logger';

export const useNotificationPreferences = () => {
  const { supabaseUser, isAuthenticated, supabaseClient } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load user preferences
  const loadPreferences = useCallback(async () => {
    if (!isAuthenticated || !supabaseUser || !supabaseClient) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabaseClient
        .from('notification_preferences')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (fetchError) {
        // If no preferences exist, create default ones
        if (fetchError.code === 'PGRST116') {
          const { data: newPrefs, error: insertError } = await supabaseClient
            .from('notification_preferences')
            .insert({
              user_id: supabaseUser.id,
              email_enabled: true,
              welcome_email: true,
              review_reminders: true,
              module_nudges: true,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
            })
            .select()
            .single();

          if (insertError) throw insertError;
          setPreferences(newPrefs);
        } else {
          throw fetchError;
        }
      } else {
        setPreferences(data);
      }
      setError(null);
    } catch (err) {
      logger.error('Error loading notification preferences:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, supabaseUser, supabaseClient]);

  // Load preferences on mount and when user changes
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  // Update preferences
  const updatePreferences = async (updates) => {
    if (!supabaseUser || !supabaseClient) {
      throw new Error('Not authenticated');
    }

    try {
      setSaving(true);
      const { data, error: updateError } = await supabaseClient
        .from('notification_preferences')
        .update(updates)
        .eq('user_id', supabaseUser.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setPreferences(data);
      setError(null);
      return { success: true, data };
    } catch (err) {
      logger.error('Error updating notification preferences:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  };

  // Toggle a specific preference
  const togglePreference = async (key) => {
    if (!preferences) return;

    const newValue = !preferences[key];
    return await updatePreferences({ [key]: newValue });
  };

  // Update timezone
  const updateTimezone = async (timezone) => {
    return await updatePreferences({ timezone });
  };

  // Master toggle for all emails
  const toggleAllEmails = async (enabled) => {
    return await updatePreferences({ email_enabled: enabled });
  };

  return {
    preferences,
    loading,
    error,
    saving,
    updatePreferences,
    togglePreference,
    updateTimezone,
    toggleAllEmails,
    refresh: loadPreferences,
  };
};

