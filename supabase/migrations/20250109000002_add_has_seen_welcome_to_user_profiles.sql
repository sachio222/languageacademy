-- Add has_seen_welcome field to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN has_seen_welcome boolean DEFAULT false;

-- Update existing users to have seen welcome (since they're already using the app)
UPDATE public.user_profiles 
SET has_seen_welcome = true 
WHERE has_seen_welcome IS NULL;
