-- Temporarily Disable Welcome Email Auto-Queue
-- Run this in Supabase SQL Editor BEFORE deploying Edge Functions

-- Disable the trigger that auto-queues welcome emails on new signups
DROP TRIGGER IF EXISTS trigger_queue_welcome_email ON user_profiles;

-- Verify it's disabled
SELECT 
  'TRIGGER STATUS' as check,
  COUNT(*) as trigger_count
FROM pg_trigger 
WHERE tgname = 'trigger_queue_welcome_email';

-- Should return 0 if successfully disabled

SELECT 'Welcome email trigger DISABLED - safe to deploy!' as message;

