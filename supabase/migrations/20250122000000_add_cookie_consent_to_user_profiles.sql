-- Add cookie_consent field to user_profiles table
-- Values: 'accepted', 'rejected', or NULL (not set)
ALTER TABLE public.user_profiles 
ADD COLUMN cookie_consent TEXT CHECK (cookie_consent IN ('accepted', 'rejected'));

-- Add timestamp for when consent was given/revoked
ALTER TABLE public.user_profiles 
ADD COLUMN cookie_consent_updated_at TIMESTAMP WITH TIME ZONE;

