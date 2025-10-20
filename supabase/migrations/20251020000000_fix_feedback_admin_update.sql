-- Fix the broken SELECT policy that's causing UUID comparison error
-- when admin tries to UPDATE feedback
DROP POLICY IF EXISTS "Users can view own feedback" ON feedback;

-- Add UPDATE policy for admin
DROP POLICY IF EXISTS "Admin can update feedback" ON feedback;

CREATE POLICY "Admin can update feedback" ON feedback
  FOR UPDATE
  USING (auth.jwt() ->> 'sub' = 'user_33nSyBPwjQvGcy5w9GJgCyK5KY0')
  WITH CHECK (auth.jwt() ->> 'sub' = 'user_33nSyBPwjQvGcy5w9GJgCyK5KY0');

