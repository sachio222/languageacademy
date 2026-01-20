-- Temporarily set your user to 'free' tier to test paywall
-- Replace YOUR_EMAIL with your actual email

UPDATE public.profiles
SET 
  subscription_tier = 'free',
  subscription_status = NULL,
  stripe_customer_id = NULL,
  stripe_subscription_id = NULL
WHERE email = 'YOUR_EMAIL';

-- Verify the change
SELECT 
  email,
  subscription_tier,
  subscription_status
FROM public.profiles
WHERE email = 'YOUR_EMAIL';
