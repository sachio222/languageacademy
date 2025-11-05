-- Language Academy Database Schema - NO RLS for Clerk
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles
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

-- Exercise Completions
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
  UNIQUE(user_id, exercise_id, attempt_number)
);

-- Concept Understanding
CREATE TABLE concept_understanding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  concept_index INTEGER NOT NULL,
  concept_term TEXT NOT NULL,
  understood_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id, concept_index)
);

-- Module Progress
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_exercises INTEGER DEFAULT 0,
  completed_exercises INTEGER DEFAULT 0,
  study_mode_completed BOOLEAN DEFAULT FALSE,
  exam_score INTEGER,
  time_spent_seconds INTEGER DEFAULT 0,
  attempts_count INTEGER DEFAULT 1,
  UNIQUE(user_id, module_id)
);

-- Unit Progress
CREATE TABLE unit_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  unit_id TEXT NOT NULL,
  unit_name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_modules INTEGER NOT NULL,
  completed_modules INTEGER DEFAULT 0,
  unit_exam_score INTEGER,
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(user_id, unit_id)
);

-- User Sessions
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  modules_visited TEXT[],
  exercises_attempted INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  user_agent TEXT,
  ip_address INET
);

-- Exam Attempts
CREATE TABLE exam_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0,
  score_percentage INTEGER,
  time_spent_seconds INTEGER DEFAULT 0,
  answers JSONB,
  passed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, exam_type, exam_id, attempt_number)
);

-- Indexes
CREATE INDEX idx_exercise_completions_user_module ON exercise_completions(user_id, module_id);
CREATE INDEX idx_exercise_completions_exercise ON exercise_completions(exercise_id);
CREATE INDEX idx_module_progress_user ON module_progress(user_id);
CREATE INDEX idx_module_progress_unit ON module_progress(unit_id);
CREATE INDEX idx_unit_progress_user ON unit_progress(user_id);
CREATE INDEX idx_user_sessions_user_start ON user_sessions(user_id, session_start);
CREATE INDEX idx_exam_attempts_user_exam ON exam_attempts(user_id, exam_type, exam_id);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at 
BEFORE UPDATE ON user_profiles 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

