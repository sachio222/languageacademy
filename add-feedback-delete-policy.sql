-- Add DELETE policy for admin to delete feedback
CREATE POLICY "Admin can delete feedback" ON feedback
  FOR DELETE
  USING (auth.jwt() ->> 'sub' = 'user_35l6XLlv1lfGmaWOdzxlFPNAA0q');
