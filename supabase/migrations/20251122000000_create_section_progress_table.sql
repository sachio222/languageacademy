-- Create section_progress table for tracking completion of vocabulary-intro and other sections
-- This supports flexible section-based progress tracking within modules

CREATE TABLE IF NOT EXISTS section_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL,
  section_id TEXT NOT NULL,
  progress_data JSONB DEFAULT '{}'::jsonb,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint for user + module + section
  UNIQUE(user_id, module_key, section_id)
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_section_progress_user_module 
  ON section_progress(user_id, module_key);

CREATE INDEX IF NOT EXISTS idx_section_progress_user_completed 
  ON section_progress(user_id, completed_at) 
  WHERE completed_at IS NOT NULL;

-- Enable RLS
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only view their own section progress
CREATE POLICY "Users can view their own section progress"
  ON section_progress
  FOR SELECT
  USING (user_id = (
    SELECT id FROM user_profiles 
    WHERE clerk_user_id = (auth.jwt()->>'sub')::text
    LIMIT 1
  ));

-- Users can insert their own section progress
CREATE POLICY "Users can insert their own section progress"
  ON section_progress
  FOR INSERT
  WITH CHECK (user_id = (
    SELECT id FROM user_profiles 
    WHERE clerk_user_id = (auth.jwt()->>'sub')::text
    LIMIT 1
  ));

-- Users can update their own section progress
CREATE POLICY "Users can update their own section progress"
  ON section_progress
  FOR UPDATE
  USING (user_id = (
    SELECT id FROM user_profiles 
    WHERE clerk_user_id = (auth.jwt()->>'sub')::text
    LIMIT 1
  ))
  WITH CHECK (user_id = (
    SELECT id FROM user_profiles 
    WHERE clerk_user_id = (auth.jwt()->>'sub')::text
    LIMIT 1
  ));

-- Users can delete their own section progress
CREATE POLICY "Users can delete their own section progress"
  ON section_progress
  FOR DELETE
  USING (user_id = (
    SELECT id FROM user_profiles 
    WHERE clerk_user_id = (auth.jwt()->>'sub')::text
    LIMIT 1
  ));

-- Add helpful comment
COMMENT ON TABLE section_progress IS 'Tracks user progress through module sections like vocabulary-intro, study-mode, practice, etc.';

