-- Email System Status Check
-- Run this in Supabase SQL Editor to verify nothing will send

-- 1. Check if any emails are queued
SELECT 
  'QUEUED EMAILS' as check_type,
  COUNT(*) as count,
  status,
  email_type
FROM email_queue
GROUP BY status, email_type;

-- 2. Check templates (should be 3)
SELECT 
  'TEMPLATES' as check_type,
  template_type,
  template_name,
  active
FROM email_templates
ORDER BY template_type;

-- 3. Check user count
SELECT 
  'USER COUNT' as check_type,
  COUNT(*) as total_users
FROM user_profiles;

-- 4. Check if any users have notification preferences
SELECT 
  'PREFERENCES' as check_type,
  COUNT(*) as users_with_prefs,
  COUNT(CASE WHEN email_enabled = true THEN 1 END) as emails_enabled_count
FROM notification_preferences;

-- 5. Summary
SELECT 
  'SUMMARY' as info,
  'If queued email count = 0, you are safe to deploy!' as message;

