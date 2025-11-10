-- Email System - Final Clean Version
-- Run this in Supabase SQL Editor after running cleanup-email-bloat.sql

-- =====================================================
-- CORE TABLES
-- =====================================================

-- User notification preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  email_enabled BOOLEAN DEFAULT true,
  
  -- Individual email type toggles
  welcome_email BOOLEAN DEFAULT true,
  lesson_complete BOOLEAN DEFAULT true,
  module_nudge BOOLEAN DEFAULT true,
  word_of_day BOOLEAN DEFAULT true,
  weekly_summary BOOLEAN DEFAULT true,
  
  -- Settings
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Email activity log
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  email_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL, -- 'delivered', 'failed', 'skipped'
  provider TEXT DEFAULT 'resend', -- 'resend' or 'mailerlite'
  provider_response JSONB,
  failure_reason TEXT, -- 'not_configured', 'user_opted_out', 'api_error', etc.
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Word of the Day tracking
CREATE TABLE IF NOT EXISTS word_of_the_day (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  pronunciation TEXT,
  difficulty TEXT,
  correct_answer TEXT NOT NULL,
  wrong_option_1 TEXT NOT NULL,
  wrong_option_2 TEXT NOT NULL,
  wrong_option_3 TEXT NOT NULL,
  example_sentence TEXT,
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User WOTD quiz attempts
CREATE TABLE IF NOT EXISTS wotd_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  word_id UUID REFERENCES word_of_the_day(id) ON DELETE CASCADE,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, word_id)
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_wotd_date ON word_of_the_day(date DESC);
CREATE INDEX IF NOT EXISTS idx_wotd_attempts_user ON wotd_attempts(user_id);

-- =====================================================
-- RLS POLICIES
-- =====================================================

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_of_the_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE wotd_attempts ENABLE ROW LEVEL SECURITY;

-- Users can manage their own preferences
CREATE POLICY "Users can view own preferences" ON notification_preferences
  FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can update own preferences" ON notification_preferences
  FOR UPDATE USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
  WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can insert own preferences" ON notification_preferences
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Users can view their own email logs
CREATE POLICY "Users can view own logs" ON email_logs
  FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Everyone can view word of the day
CREATE POLICY "Anyone can view WOTD" ON word_of_the_day
  FOR SELECT USING (true);

-- Users can view/insert their own attempts
CREATE POLICY "Users can view own attempts" ON wotd_attempts
  FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can insert own attempts" ON wotd_attempts
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- =====================================================
-- HELPER FUNCTION
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- DEFAULT PREFERENCES FOR EXISTING USERS
-- =====================================================

INSERT INTO notification_preferences (
  user_id, 
  email_enabled, 
  welcome_email, 
  lesson_complete, 
  module_nudge, 
  word_of_day, 
  weekly_summary,
  timezone
)
SELECT 
  id,
  true,
  true,
  true,
  true,
  true,
  true,
  COALESCE(timezone, 'UTC')
FROM user_profiles
WHERE id NOT IN (SELECT user_id FROM notification_preferences)
ON CONFLICT (user_id) DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================

SELECT 'Email system setup complete!' as status;

SELECT 
  COUNT(*) as users_with_preferences,
  (SELECT COUNT(*) FROM user_profiles) as total_users
FROM notification_preferences;

