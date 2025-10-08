-- Fix RLS Policies for Clerk - ADD WITH CHECK for INSERTs
-- Drop broken policies
DROP POLICY IF EXISTS "Users can manage own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can manage own exercise completions" ON exercise_completions;
DROP POLICY IF EXISTS "Users can manage own concept understanding" ON concept_understanding;
DROP POLICY IF EXISTS "Users can manage own module progress" ON module_progress;
DROP POLICY IF EXISTS "Users can manage own unit progress" ON unit_progress;
DROP POLICY IF EXISTS "Users can manage own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Users can manage own exam attempts" ON exam_attempts;

-- CORRECT policies with both USING and WITH CHECK
CREATE POLICY "Users can manage own profile" ON user_profiles
FOR ALL 
USING (clerk_user_id = auth.jwt() ->> 'sub')
WITH CHECK (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can manage own exercise completions" ON exercise_completions
FOR ALL 
USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can manage own concept understanding" ON concept_understanding
FOR ALL 
USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can manage own module progress" ON module_progress
FOR ALL 
USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can manage own unit progress" ON unit_progress
FOR ALL 
USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can manage own sessions" ON user_sessions
FOR ALL 
USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can manage own exam attempts" ON exam_attempts
FOR ALL 
USING (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'))
WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE clerk_user_id = auth.jwt() ->> 'sub'));

