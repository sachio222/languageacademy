-- Word of the Day Tables
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main word_of_the_day table
CREATE TABLE word_of_the_day (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Date (unique - one word per day)
  date DATE NOT NULL UNIQUE,
  
  -- Core word data (for fast queries)
  word_id TEXT NOT NULL, -- e.g., "aller-fr"
  word TEXT NOT NULL,
  phonetic TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  translation TEXT NOT NULL, -- Primary English translation
  
  -- Learning metadata (indexed for filtering)
  difficulty_level TEXT NOT NULL, -- A1, A2, B1, B2, C1, C2
  difficulty_label TEXT, -- e.g., "A1-C2 · Essential"
  frequency_rank TEXT, -- e.g., "#8"
  frequency_note TEXT,
  
  -- Quiz data (for email generation)
  correct_answer TEXT NOT NULL,
  wrong_options JSONB NOT NULL, -- Array of 3 wrong answers
  
  -- Comprehensive word data (JSONB for flexibility)
  definitions JSONB NOT NULL, -- Array of definition objects
  examples JSONB NOT NULL, -- Array of example objects
  grammar JSONB, -- Array of grammar note strings
  collocations JSONB, -- Array of collocation strings
  idioms JSONB, -- Array of idiom objects
  etymology JSONB, -- Etymology object
  related_words JSONB, -- Array of related word objects
  
  -- Usage and notes
  usage_notes TEXT,
  social_hook TEXT, -- For social media posts
  
  -- Generation metadata
  generated_by TEXT DEFAULT 'llm', -- llm, manual, hybrid
  llm_model TEXT, -- e.g., "gpt-4", "claude-3"
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_wotd_date ON word_of_the_day(date DESC);
CREATE INDEX idx_wotd_difficulty ON word_of_the_day(difficulty_level);
CREATE INDEX idx_wotd_word ON word_of_the_day(word);
CREATE INDEX idx_wotd_reviewed ON word_of_the_day(reviewed);

-- JSONB indexes for nested queries
CREATE INDEX idx_wotd_definitions ON word_of_the_day USING GIN(definitions);
CREATE INDEX idx_wotd_examples ON word_of_the_day USING GIN(examples);

-- User attempts table
CREATE TABLE wotd_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User reference
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Word reference
  wotd_id UUID REFERENCES word_of_the_day(id) ON DELETE CASCADE,
  word_date DATE NOT NULL, -- Denormalized for fast queries
  word TEXT NOT NULL, -- Denormalized for display
  
  -- Answer data
  selected_answer TEXT, -- The answer they chose, or NULL for "don't know"
  is_correct BOOLEAN NOT NULL,
  answer_key TEXT, -- A, B, C, D, or X (don't know)
  
  -- Context
  source TEXT DEFAULT 'web', -- email, web, app
  utm_source TEXT,
  utm_medium TEXT,
  
  -- Timing
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: one attempt per user per word
  UNIQUE(user_id, wotd_id)
);

-- Indexes for wotd_attempts
CREATE INDEX idx_wotd_attempts_user ON wotd_attempts(user_id, attempted_at DESC);
CREATE INDEX idx_wotd_attempts_date ON wotd_attempts(word_date DESC);
CREATE INDEX idx_wotd_attempts_correct ON wotd_attempts(is_correct);

-- Row Level Security (RLS) for wotd_attempts
ALTER TABLE wotd_attempts ENABLE ROW LEVEL SECURITY;

-- Users can read their own attempts
CREATE POLICY "Users can read own attempts"
  ON wotd_attempts
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

-- Users can insert their own attempts
CREATE POLICY "Users can insert own attempts"
  ON wotd_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'sub' = (
      SELECT clerk_user_id FROM user_profiles WHERE id = user_id
    )
  );

-- Public read access to word_of_the_day (no auth required)
ALTER TABLE word_of_the_day ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read WOTD"
  ON word_of_the_day
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated admins can insert/update WOTD
CREATE POLICY "Only admins can modify WOTD"
  ON word_of_the_day
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE clerk_user_id = auth.jwt() ->> 'sub'
      AND email = 'brainpowerux@gmail.com' -- Your admin email
    )
  );

-- Helper function: Get today's word
CREATE OR REPLACE FUNCTION get_todays_word()
RETURNS TABLE (
  id UUID,
  date DATE,
  word_id TEXT,
  word TEXT,
  phonetic TEXT,
  part_of_speech TEXT,
  translation TEXT,
  definitions JSONB,
  examples JSONB,
  grammar JSONB,
  collocations JSONB,
  idioms JSONB,
  etymology JSONB,
  related_words JSONB,
  difficulty_level TEXT,
  difficulty_label TEXT,
  frequency_rank TEXT,
  frequency_note TEXT,
  usage_notes TEXT,
  correct_answer TEXT,
  wrong_options JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.id, w.date, w.word_id, w.word, w.phonetic, w.part_of_speech,
    w.translation, w.definitions, w.examples, w.grammar, w.collocations,
    w.idioms, w.etymology, w.related_words, w.difficulty_level,
    w.difficulty_label, w.frequency_rank, w.frequency_note,
    w.usage_notes, w.correct_answer, w.wrong_options
  FROM word_of_the_day w
  WHERE w.date = CURRENT_DATE
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Get word by date
CREATE OR REPLACE FUNCTION get_word_by_date(target_date DATE)
RETURNS TABLE (
  id UUID,
  date DATE,
  word_id TEXT,
  word TEXT,
  phonetic TEXT,
  part_of_speech TEXT,
  translation TEXT,
  definitions JSONB,
  examples JSONB,
  grammar JSONB,
  collocations JSONB,
  idioms JSONB,
  etymology JSONB,
  related_words JSONB,
  difficulty_level TEXT,
  difficulty_label TEXT,
  frequency_rank TEXT,
  frequency_note TEXT,
  usage_notes TEXT,
  correct_answer TEXT,
  wrong_options JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.id, w.date, w.word_id, w.word, w.phonetic, w.part_of_speech,
    w.translation, w.definitions, w.examples, w.grammar, w.collocations,
    w.idioms, w.etymology, w.related_words, w.difficulty_level,
    w.difficulty_label, w.frequency_rank, w.frequency_note,
    w.usage_notes, w.correct_answer, w.wrong_options
  FROM word_of_the_day w
  WHERE w.date = target_date
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Get user's WOTD streak
CREATE OR REPLACE FUNCTION get_user_wotd_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  streak_count INTEGER := 0;
  check_date DATE := CURRENT_DATE;
BEGIN
  -- Count consecutive days backwards from today
  LOOP
    IF EXISTS (
      SELECT 1 FROM wotd_attempts
      WHERE user_id = p_user_id
      AND word_date = check_date
    ) THEN
      streak_count := streak_count + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  RETURN streak_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_wotd_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wotd_timestamp
  BEFORE UPDATE ON word_of_the_day
  FOR EACH ROW
  EXECUTE FUNCTION update_wotd_timestamp();

-- Comments for documentation
COMMENT ON TABLE word_of_the_day IS 'Daily French word entries with comprehensive linguistic data';
COMMENT ON TABLE wotd_attempts IS 'User quiz attempts for Word of the Day';
COMMENT ON COLUMN word_of_the_day.definitions IS 'Array of definition objects with sense, text, register, example';
COMMENT ON COLUMN word_of_the_day.examples IS 'Array of contextual examples with french, english, context, note';
COMMENT ON COLUMN word_of_the_day.idioms IS 'Array of idiomatic expressions with expression, meaning, level';
COMMENT ON COLUMN word_of_the_day.etymology IS 'Etymology object with origin, period, evolution, note';
COMMENT ON COLUMN word_of_the_day.wrong_options IS 'Array of exactly 3 wrong answers for quiz';

