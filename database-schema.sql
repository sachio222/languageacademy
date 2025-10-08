-- Language Academy Supabase Database Schema
-- This file contains the complete database schema for progress tracking and analytics

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles (extends Clerk user data)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  preferred_name TEXT,
  timezone TEXT DEFAULT 'UTC',
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  streak_days INTEGER DEFAULT 0,
  total_study_time_seconds INTEGER DEFAULT 0
);

-- Exercise Completions (granular tracking of each exercise attempt)
CREATE TABLE exercise_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  is_correct BOOLEAN NOT NULL,
  user_answer TEXT,
  correct_answer TEXT,
  time_spent_seconds INTEGER DEFAULT 0,
  hint_used BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Composite index for efficient queries
  UNIQUE(user_id, exercise_id, attempt_number)
);

-- Concept Understanding (track which concepts users mark as understood)
CREATE TABLE concept_understanding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  concept_index INTEGER NOT NULL,
  concept_term TEXT NOT NULL,
  understood_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate entries
  UNIQUE(user_id, module_id, concept_index)
);

-- Module Progress (overall module completion and scores)
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_exercises INTEGER NOT NULL,
  completed_exercises INTEGER DEFAULT 0,
  study_mode_completed BOOLEAN DEFAULT FALSE,
  exam_score INTEGER, -- percentage score on final exam
  time_spent_seconds INTEGER DEFAULT 0,
  attempts_count INTEGER DEFAULT 1,
  
  -- Prevent duplicate entries
  UNIQUE(user_id, module_id)
);

-- Unit Progress (unit-level completion and exam scores)
CREATE TABLE unit_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  unit_id TEXT NOT NULL,
  unit_name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_modules INTEGER NOT NULL,
  completed_modules INTEGER DEFAULT 0,
  unit_exam_score INTEGER, -- percentage score on unit exam
  time_spent_seconds INTEGER DEFAULT 0,
  
  -- Prevent duplicate entries
  UNIQUE(user_id, unit_id)
);

-- User Sessions (for analytics and engagement tracking)
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  modules_visited TEXT[], -- array of module IDs visited
  exercises_attempted INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  user_agent TEXT,
  ip_address INET
);

-- Exam Attempts (detailed exam attempt data)
CREATE TABLE exam_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL, -- 'module' or 'unit'
  exam_id TEXT NOT NULL, -- module_id or unit_id
  attempt_number INTEGER DEFAULT 1,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0,
  score_percentage INTEGER,
  time_spent_seconds INTEGER DEFAULT 0,
  answers JSONB, -- stores all question answers and metadata
  passed BOOLEAN DEFAULT FALSE,
  
  -- Composite index for efficient queries
  UNIQUE(user_id, exam_type, exam_id, attempt_number)
);

-- Indexes for performance
CREATE INDEX idx_exercise_completions_user_module ON exercise_completions(user_id, module_id);
CREATE INDEX idx_exercise_completions_exercise ON exercise_completions(exercise_id);
CREATE INDEX idx_module_progress_user ON module_progress(user_id);
CREATE INDEX idx_module_progress_unit ON module_progress(unit_id);
CREATE INDEX idx_unit_progress_user ON unit_progress(user_id);
CREATE INDEX idx_user_sessions_user_start ON user_sessions(user_id, session_start);
CREATE INDEX idx_exam_attempts_user_exam ON exam_attempts(user_id, exam_type, exam_id);

-- Row Level Security (RLS) Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_understanding ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE unit_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can view own exercise completions" ON exercise_completions FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own exercise completions" ON exercise_completions FOR INSERT WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own concept understanding" ON concept_understanding FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can manage own concept understanding" ON concept_understanding FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own module progress" ON module_progress FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can manage own module progress" ON module_progress FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own unit progress" ON unit_progress FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can manage own unit progress" ON unit_progress FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own sessions" ON user_sessions FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own sessions" ON user_sessions FOR INSERT WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own exam attempts" ON exam_attempts FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can manage own exam attempts" ON exam_attempts FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
