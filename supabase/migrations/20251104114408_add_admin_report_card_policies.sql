-- Migration: Add admin RLS policies for report card system
-- Allows admin user to view all student data for report card and analytics

-- Admin user ID (from useAdmin.js)
-- Clerk ID: user_35l6XLlv1lfGmaWOdzxlFPNAA0q

-- Admin can view all user profiles
CREATE POLICY "Admin can view all profiles" ON user_profiles
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Admin can view all exercise completions
CREATE POLICY "Admin can view all exercise completions" ON exercise_completions
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Admin can view all module progress
CREATE POLICY "Admin can view all module progress" ON module_progress
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Admin can view all unit progress
CREATE POLICY "Admin can view all unit progress" ON unit_progress
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Admin can view all exam attempts
CREATE POLICY "Admin can view all exam attempts" ON exam_attempts
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Admin can view all user sessions
CREATE POLICY "Admin can view all user sessions" ON user_sessions
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Admin can view all concept understanding
CREATE POLICY "Admin can view all concept understanding" ON concept_understanding
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

