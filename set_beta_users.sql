-- Set all existing users (60 beta testers) to 'beta' tier with full access
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/editor

UPDATE user_profiles 
SET subscription_tier = 'beta',
    subscription_status = 'active'
WHERE subscription_tier IS NULL;

-- Verify the update
SELECT 
  subscription_tier,
  subscription_status,
  COUNT(*) as user_count
FROM user_profiles
GROUP BY subscription_tier, subscription_status
ORDER BY subscription_tier;

-- Expected result:
-- beta     | active | 60
-- (any new free users will show as 'free' | null)
