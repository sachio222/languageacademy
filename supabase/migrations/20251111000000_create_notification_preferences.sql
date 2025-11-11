-- Email notification preferences table
-- This controls what emails users receive

CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  
  -- Master toggle
  email_enabled BOOLEAN DEFAULT true,
  
  -- Individual email types
  word_of_day BOOLEAN DEFAULT true,
  review_reminders BOOLEAN DEFAULT true,
  module_nudges BOOLEAN DEFAULT true,
  
  -- User timezone for scheduled emails
  timezone TEXT DEFAULT 'UTC',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX idx_notification_preferences_user_id ON notification_preferences(user_id);

-- Enable RLS
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read their own preferences
CREATE POLICY "Users can read own notification preferences"
  ON notification_preferences
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

-- Users can update their own preferences
CREATE POLICY "Users can update own notification preferences"
  ON notification_preferences
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

-- Users can insert their own preferences
CREATE POLICY "Users can insert own notification preferences"
  ON notification_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

-- Create default preferences for existing users
INSERT INTO notification_preferences (user_id, email_enabled, word_of_day, review_reminders, module_nudges, timezone)
SELECT 
  id, 
  true, 
  true, 
  true, 
  true, 
  COALESCE(timezone, 'UTC')
FROM user_profiles
WHERE id NOT IN (SELECT user_id FROM notification_preferences)
ON CONFLICT (user_id) DO NOTHING;

