-- Add module_completion column to notification_preferences
-- This allows users to opt in/out of module completion celebration emails

-- Add column if it doesn't exist
ALTER TABLE notification_preferences 
ADD COLUMN IF NOT EXISTS module_completion BOOLEAN DEFAULT true;

-- Update existing users to have module_completion enabled by default
UPDATE notification_preferences 
SET module_completion = true 
WHERE module_completion IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN notification_preferences.module_completion IS 'User preference for receiving module completion celebration emails';


