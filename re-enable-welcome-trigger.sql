-- Re-Enable Welcome Email Auto-Queue
-- Run this when you're ready to start sending welcome emails automatically

-- Recreate the trigger
CREATE TRIGGER trigger_queue_welcome_email
  AFTER INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION queue_welcome_email();

-- Verify it's enabled
SELECT 
  'TRIGGER STATUS' as check,
  COUNT(*) as trigger_count
FROM pg_trigger 
WHERE tgname = 'trigger_queue_welcome_email';

-- Should return 1 if successfully enabled

SELECT 'Welcome email trigger ENABLED - new signups will queue welcome emails!' as message;

