-- Add has_seen_beta_welcome field to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS has_seen_beta_welcome BOOLEAN DEFAULT false;

-- Update existing users who have completed exercises to have seen beta welcome
-- (since they're already using the app, they're not new users)
UPDATE public.user_profiles 
SET has_seen_beta_welcome = true 
WHERE EXISTS (
  SELECT 1 
  FROM exercise_completions 
  WHERE exercise_completions.user_id = user_profiles.id
);


