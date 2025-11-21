-- Drop ALL existing policies on feedback table
DROP POLICY IF EXISTS "Users can insert feedback" ON feedback;
DROP POLICY IF EXISTS "Users can view own feedback" ON feedback;
DROP POLICY IF EXISTS "Authenticated users can view all feedback" ON feedback;
DROP POLICY IF EXISTS "Admin can view all feedback" ON feedback;
DROP POLICY IF EXISTS "Admin can update feedback" ON feedback;

-- Allow anyone to INSERT feedback (anonymous feedback submission)
CREATE POLICY "Users can insert feedback" ON feedback
  FOR INSERT
  WITH CHECK (true);

-- Allow admin to SELECT all feedback
CREATE POLICY "Admin can view all feedback" ON feedback
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');

-- Allow admin to UPDATE feedback
CREATE POLICY "Admin can update feedback" ON feedback
  FOR UPDATE
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q')
  WITH CHECK (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');
