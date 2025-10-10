-- Create text entries table for detailed tracking of user text input
CREATE TABLE IF NOT EXISTS text_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  attempt_number INTEGER NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('typing', 'paste', 'delete', 'submit', 'focus', 'blur')),
  text_content TEXT NOT NULL,
  cursor_position INTEGER DEFAULT 0,
  selection_start INTEGER DEFAULT 0,
  selection_end INTEGER DEFAULT 0,
  timestamp_ms BIGINT NOT NULL, -- millisecond precision for detailed timing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Index for efficient queries
  INDEX idx_text_entries_user_exercise (user_id, exercise_id, attempt_number),
  INDEX idx_text_entries_timestamp (timestamp_ms)
);

-- Enable RLS (Row Level Security)
ALTER TABLE text_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own text entries
CREATE POLICY "Users can insert text entries" ON text_entries
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Policy: Users can view their own text entries
CREATE POLICY "Users can view own text entries" ON text_entries
  FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Policy: Users can update their own text entries (for corrections)
CREATE POLICY "Users can update own text entries" ON text_entries
  FOR UPDATE USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
