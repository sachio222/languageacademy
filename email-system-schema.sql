-- Email Communication System - Database Schema
-- Run this script manually in your Supabase SQL Editor
-- This creates all necessary tables, RLS policies, and indexes

-- =====================================================
-- TABLES
-- =====================================================

-- Notification Preferences (user email settings)
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  email_enabled BOOLEAN DEFAULT true,
  welcome_email BOOLEAN DEFAULT true,
  review_reminders BOOLEAN DEFAULT true,
  module_nudges BOOLEAN DEFAULT true,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Email Templates (admin-editable templates)
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_type TEXT NOT NULL UNIQUE, -- 'welcome', 'review_reminder', 'module_nudge', custom types
  template_name TEXT NOT NULL, -- Friendly display name
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  text_body TEXT,
  available_variables JSONB DEFAULT '[]'::jsonb, -- ['user_name', 'module_title', etc.]
  active BOOLEAN DEFAULT true,
  trigger_type TEXT DEFAULT 'manual', -- 'manual', 'automatic', 'scheduled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Queue (pending emails to be sent)
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb, -- module_id, module_title, etc.
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'cancelled'
  send_via TEXT DEFAULT 'direct', -- 'direct' or 'n8n' (for future extensibility)
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Email Logs (history of all sent emails)
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  email_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  mailerlite_response JSONB,
  status TEXT NOT NULL, -- 'delivered', 'bounced', 'failed'
  metadata JSONB DEFAULT '{}'::jsonb,
  queue_id UUID REFERENCES email_queue(id) ON DELETE SET NULL
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_status_scheduled ON email_queue(status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_email_queue_user_id ON email_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_email_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON email_templates(active);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Notification Preferences Policies
-- Users can view and manage their own preferences
CREATE POLICY "Users can view own notification preferences" ON notification_preferences
  FOR SELECT 
  USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can update own notification preferences" ON notification_preferences
  FOR UPDATE 
  USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
  WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can insert own notification preferences" ON notification_preferences
  FOR INSERT 
  WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Email Templates Policies
-- All authenticated users can view active templates
CREATE POLICY "Authenticated users can view active templates" ON email_templates
  FOR SELECT 
  USING (auth.jwt() ->> 'sub' IS NOT NULL AND active = true);

-- Only service role can modify templates (via Edge Functions or admin)
-- Admin modifications will be done via Edge Functions with service role

-- Email Queue Policies
-- Users can view their own queued emails
CREATE POLICY "Users can view own email queue" ON email_queue
  FOR SELECT 
  USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Email Logs Policies
-- Users can view their own email logs
CREATE POLICY "Users can view own email logs" ON email_logs
  FOR SELECT 
  USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_notification_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_notification_preferences_timestamp
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_preferences_updated_at();

CREATE TRIGGER update_email_templates_timestamp
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_notification_preferences_updated_at();

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default email templates
INSERT INTO email_templates (template_type, template_name, subject, html_body, text_body, available_variables, trigger_type)
VALUES 
  (
    'welcome',
    'Welcome Email',
    'Welcome to Language Academy - Start Your French Journey! 🇫🇷',
    '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Bienvenue, {{user_name}}! 👋</h1>
      <p style="font-size: 16px; line-height: 1.6;">Welcome to Language Academy! We''re thrilled to have you start your journey to French fluency.</p>
      <p style="font-size: 16px; line-height: 1.6;">Our unique approach combines:</p>
      <ul style="font-size: 16px; line-height: 1.8;">
        <li>🎯 Structured lessons building from basics to advanced</li>
        <li>🧠 Spaced repetition for long-term retention</li>
        <li>📚 Real French context and practical examples</li>
        <li>✨ Interactive exercises that make learning fun</li>
      </ul>
      <p style="font-size: 16px; line-height: 1.6;">Ready to start? Your first lesson is waiting!</p>
      <a href="{{first_lesson_url}}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Start Learning →</a>
      <p style="font-size: 14px; color: #666; margin-top: 30px;">Bonne chance!<br>The Language Academy Team</p>
    </body></html>',
    'Welcome to Language Academy!

Welcome, {{user_name}}!

We''re thrilled to have you start your journey to French fluency. Our unique approach combines structured lessons, spaced repetition, real context, and interactive exercises.

Ready to start? Visit your first lesson: {{first_lesson_url}}

Bonne chance!
The Language Academy Team',
    '["user_name", "first_lesson_url"]'::jsonb,
    'automatic'
  ),
  (
    'review_reminder',
    'Review Reminder',
    'Quick Review: {{module_title}} 🧠',
    '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Time for a Quick Review! 📚</h1>
      <p style="font-size: 16px; line-height: 1.6;">Hi {{user_name}},</p>
      <p style="font-size: 16px; line-height: 1.6;">You completed <strong>{{module_title}}</strong> two days ago. Research shows that reviewing material at spaced intervals dramatically improves long-term retention.</p>
      <p style="font-size: 16px; line-height: 1.6;">Take just 5 minutes to review what you learned - it will make a huge difference!</p>
      <a href="{{module_url}}" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Review Now →</a>
      <p style="font-size: 14px; color: #666; margin-top: 30px;">Keep up the great work!<br>The Language Academy Team</p>
    </body></html>',
    'Time for a Quick Review!

Hi {{user_name}},

You completed {{module_title}} two days ago. Research shows that reviewing material at spaced intervals dramatically improves long-term retention.

Take just 5 minutes to review: {{module_url}}

Keep up the great work!
The Language Academy Team',
    '["user_name", "module_title", "module_url"]'::jsonb,
    'automatic'
  ),
  (
    'module_nudge',
    'Almost Finished Nudge',
    'You''re so close! Finish {{module_title}} 🎯',
    '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">You''re Almost There! 🌟</h1>
      <p style="font-size: 16px; line-height: 1.6;">Hi {{user_name}},</p>
      <p style="font-size: 16px; line-height: 1.6;">You''re <strong>{{progress_percent}}%</strong> through <strong>{{module_title}}</strong> - so close to completing it!</p>
      <p style="font-size: 16px; line-height: 1.6;">Don''t let your hard work go to waste. Finish strong and add another module to your achievements!</p>
      <a href="{{module_url}}" style="display: inline-block; background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Finish Module →</a>
      <p style="font-size: 14px; color: #666; margin-top: 30px;">You can do it!<br>The Language Academy Team</p>
    </body></html>',
    'You''re Almost There!

Hi {{user_name}},

You''re {{progress_percent}}% through {{module_title}} - so close to completing it!

Don''t let your hard work go to waste. Finish strong: {{module_url}}

You can do it!
The Language Academy Team',
    '["user_name", "module_title", "module_url", "progress_percent"]'::jsonb,
    'automatic'
  )
ON CONFLICT (template_type) DO NOTHING;

-- Script complete!
-- Next step: Run email-system-default-prefs.sql to set default preferences for existing users

