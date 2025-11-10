-- Clean Up Email System Bloat
-- Run this in Supabase SQL Editor

-- Drop bloat tables
DROP TABLE IF EXISTS email_queue CASCADE;
DROP TABLE IF EXISTS email_templates CASCADE;

-- Drop the welcome email trigger
DROP TRIGGER IF EXISTS trigger_queue_welcome_email ON user_profiles;
DROP FUNCTION IF EXISTS queue_welcome_email() CASCADE;

-- Drop helper functions we don't need
DROP FUNCTION IF EXISTS is_first_module_completion(UUID) CASCADE;
DROP FUNCTION IF EXISTS get_module_progress_percent(UUID, TEXT) CASCADE;

-- Update email_logs to add provider column if missing
ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'resend';

-- Verify cleanup
SELECT 'Cleanup complete! Check tables below:' as status;

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE '%email%'
ORDER BY table_name;

-- Should only show: email_logs

