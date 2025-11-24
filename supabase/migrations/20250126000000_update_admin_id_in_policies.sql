-- Migration: Update admin ID in all RLS policies
-- Updates all admin policies to use the new admin Clerk ID: user_35l6XLlv1lfGmaWOdzxlFPNAA0q
-- Also supports development keys by checking Supabase user ID: 35e33bec-de10-4d70-86a3-c992fc7655dc

-- Drop and recreate admin policies for user_profiles
DROP POLICY IF EXISTS "Admin can view all profiles" ON user_profiles;
CREATE POLICY "Admin can view all profiles" ON user_profiles
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q' 
    OR id = '35e33bec-de10-4d70-86a3-c992fc7655dc'
  );

-- Drop and recreate admin policies for exercise_completions
DROP POLICY IF EXISTS "Admin can view all exercise completions" ON exercise_completions;
CREATE POLICY "Admin can view all exercise completions" ON exercise_completions
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

-- Drop and recreate admin policies for module_progress
DROP POLICY IF EXISTS "Admin can view all module progress" ON module_progress;
CREATE POLICY "Admin can view all module progress" ON module_progress
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

-- Drop and recreate admin policies for unit_progress
DROP POLICY IF EXISTS "Admin can view all unit progress" ON unit_progress;
CREATE POLICY "Admin can view all unit progress" ON unit_progress
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

-- Drop and recreate admin policies for exam_attempts
DROP POLICY IF EXISTS "Admin can view all exam attempts" ON exam_attempts;
CREATE POLICY "Admin can view all exam attempts" ON exam_attempts
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

-- Drop and recreate admin policies for user_sessions
DROP POLICY IF EXISTS "Admin can view all user sessions" ON user_sessions;
CREATE POLICY "Admin can view all user sessions" ON user_sessions
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

-- Drop and recreate admin policies for concept_understanding
DROP POLICY IF EXISTS "Admin can view all concept understanding" ON concept_understanding;
CREATE POLICY "Admin can view all concept understanding" ON concept_understanding
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

-- Drop and recreate admin policies for feedback
DROP POLICY IF EXISTS "Admin can view all feedback" ON feedback;
CREATE POLICY "Admin can view all feedback" ON feedback
  FOR SELECT
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

DROP POLICY IF EXISTS "Admin can update feedback" ON feedback;
CREATE POLICY "Admin can update feedback" ON feedback
  FOR UPDATE
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  )
  WITH CHECK (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

DROP POLICY IF EXISTS "Admin can delete feedback" ON feedback;
CREATE POLICY "Admin can delete feedback" ON feedback
  FOR DELETE
  USING (
    auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q'
    OR EXISTS (SELECT 1 FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub' AND id = '35e33bec-de10-4d70-86a3-c992fc7655dc')
  );

