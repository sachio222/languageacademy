-- Add word_of_day column to notification_preferences (if table exists)
-- Run this in Supabase SQL Editor

-- Option 1: If notification_preferences table exists, add column
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'notification_preferences'
  ) THEN
    ALTER TABLE notification_preferences 
    ADD COLUMN IF NOT EXISTS word_of_day BOOLEAN DEFAULT true;
  END IF;
END $$;

-- Option 2: Create notification_preferences table if it doesn't exist
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  email_enabled BOOLEAN DEFAULT true,
  word_of_day BOOLEAN DEFAULT true,
  weekly_summary BOOLEAN DEFAULT true,
  lesson_complete BOOLEAN DEFAULT true,
  module_nudge BOOLEAN DEFAULT true,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_notification_prefs_user ON notification_preferences(user_id);

-- RLS
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "Users can read own preferences" ON notification_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON notification_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON notification_preferences;

CREATE POLICY "Users can read own preferences"
  ON notification_preferences
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

CREATE POLICY "Users can update own preferences"
  ON notification_preferences
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

CREATE POLICY "Users can insert own preferences"
  ON notification_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

