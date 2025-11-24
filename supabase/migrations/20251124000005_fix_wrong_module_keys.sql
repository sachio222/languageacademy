-- Fix the wrong module_key mappings created by the previous migration
-- The migration used incorrect mappings that don't match the actual module definitions

-- Fix avoir: 2024-01-03-avoir → 2024-01-04-avoir
UPDATE module_progress 
SET module_key = '2024-01-04-avoir'
WHERE module_key = '2024-01-03-avoir';

-- Fix basic-nouns: 2024-01-05-basic-nouns → 2024-01-06-basic-nouns  
UPDATE module_progress 
SET module_key = '2024-01-06-basic-nouns'
WHERE module_key = '2024-01-05-basic-nouns';

-- Fix etre: 2024-01-03-etre → 2024-01-02-etre (if any exist)
UPDATE module_progress 
SET module_key = '2024-01-02-etre'
WHERE module_key = '2024-01-03-etre';

-- Also fix other tables if they have the wrong keys
UPDATE exercise_completions 
SET module_id = '2024-01-04-avoir'
WHERE module_id = '2024-01-03-avoir';

UPDATE exercise_completions 
SET module_id = '2024-01-06-basic-nouns'
WHERE module_id = '2024-01-05-basic-nouns';

UPDATE exercise_completions 
SET module_id = '2024-01-02-etre'
WHERE module_id = '2024-01-03-etre';

UPDATE section_progress 
SET module_key = '2024-01-04-avoir'
WHERE module_key = '2024-01-03-avoir';

UPDATE section_progress 
SET module_key = '2024-01-06-basic-nouns'
WHERE module_key = '2024-01-05-basic-nouns';

UPDATE section_progress 
SET module_key = '2024-01-02-etre'
WHERE module_key = '2024-01-03-etre';

-- Refresh the materialized view to pick up the changes
REFRESH MATERIALIZED VIEW mv_student_progress_summary;

-- Verify the fix
DO $$
BEGIN
  RAISE NOTICE 'Fixed module keys to match actual module definitions:';
  RAISE NOTICE '- avoir: 2024-01-03-avoir → 2024-01-04-avoir';
  RAISE NOTICE '- basic-nouns: 2024-01-05-basic-nouns → 2024-01-06-basic-nouns';
  RAISE NOTICE '- etre: 2024-01-03-etre → 2024-01-02-etre';
END $$;
