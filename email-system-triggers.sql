-- Email System Database Triggers
-- Run this script AFTER email-system-schema.sql
-- These triggers auto-queue emails based on user actions

-- =====================================================
-- TRIGGER: Auto-queue welcome email on user signup
-- =====================================================

CREATE OR REPLACE FUNCTION queue_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
  prefs notification_preferences;
BEGIN
  -- Check if user has preferences (they should from default creation)
  SELECT * INTO prefs 
  FROM notification_preferences 
  WHERE user_id = NEW.id;
  
  -- If no preferences yet, create them with defaults
  IF NOT FOUND THEN
    INSERT INTO notification_preferences (user_id)
    VALUES (NEW.id)
    RETURNING * INTO prefs;
  END IF;
  
  -- Queue welcome email if enabled
  IF prefs.email_enabled AND prefs.welcome_email THEN
    INSERT INTO email_queue (user_id, email_type, scheduled_for, metadata)
    VALUES (
      NEW.id,
      'welcome',
      NOW(),
      jsonb_build_object(
        'user_name', COALESCE(NEW.preferred_name, NEW.first_name, 'there'),
        'first_lesson_url', 'https://languageacademy.app/lessons'
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS trigger_queue_welcome_email ON user_profiles;

CREATE TRIGGER trigger_queue_welcome_email
  AFTER INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION queue_welcome_email();

-- =====================================================
-- HELPER: Function to check if this is first module
-- =====================================================

CREATE OR REPLACE FUNCTION is_first_module_completion(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  completion_count INTEGER;
BEGIN
  SELECT COUNT(DISTINCT module_id)
  INTO completion_count
  FROM module_progress
  WHERE user_id = p_user_id
    AND completed_at IS NOT NULL;
  
  RETURN completion_count = 1;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- HELPER: Function to calculate module progress percent
-- =====================================================

CREATE OR REPLACE FUNCTION get_module_progress_percent(p_user_id UUID, p_module_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  progress_data module_progress;
  percent INTEGER;
BEGIN
  SELECT * INTO progress_data
  FROM module_progress
  WHERE user_id = p_user_id AND module_id = p_module_id;
  
  IF NOT FOUND OR progress_data.total_exercises = 0 THEN
    RETURN 0;
  END IF;
  
  percent := ROUND((progress_data.completed_exercises::NUMERIC / progress_data.total_exercises::NUMERIC) * 100);
  RETURN percent;
END;
$$ LANGUAGE plpgsql;

-- Script complete!
-- Triggers are now active and will auto-queue welcome emails for new signups

