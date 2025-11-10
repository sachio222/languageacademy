-- Set Default Email Preferences for Existing Users
-- Run this script AFTER email-system-schema.sql
-- This ensures all existing users have email preferences

INSERT INTO notification_preferences (user_id, email_enabled, welcome_email, review_reminders, module_nudges, timezone)
SELECT 
  id,
  true, -- email_enabled
  true, -- welcome_email  
  true, -- review_reminders
  true, -- module_nudges
  COALESCE(timezone, 'UTC') -- use existing timezone or default to UTC
FROM user_profiles
WHERE id NOT IN (SELECT user_id FROM notification_preferences)
ON CONFLICT (user_id) DO NOTHING;

-- Confirmation message
SELECT 
  COUNT(*) as users_with_preferences,
  (SELECT COUNT(*) FROM user_profiles) as total_users
FROM notification_preferences;

