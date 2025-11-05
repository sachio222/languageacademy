-- Fix RLS policy to allow anonymous read access to dictionary
-- Dictionary is a public resource that should be readable by everyone

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Dictionary is readable by all authenticated users" ON dictionary_words;

-- Create new policy that allows both authenticated and anonymous users to read
CREATE POLICY "Dictionary is readable by everyone" 
  ON dictionary_words FOR SELECT 
  TO public  -- This includes both authenticated and anonymous users
  USING (true);

-- Verify the policy
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual 
FROM pg_policies 
WHERE tablename = 'dictionary_words';
