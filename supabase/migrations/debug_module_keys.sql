-- Debug: Find where "2024-01-03-avoir" is coming from
-- Check the exact source of these module_key values

-- 1. Check module_progress table directly
SELECT 
  'module_progress' as source_table,
  module_key,
  unit_id,
  started_at,
  completed_at,
  time_spent_seconds
FROM module_progress
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'
  AND module_key IN ('2024-01-03-avoir', '2024-01-05-basic-nouns', '2024-01-02-etre')
ORDER BY module_key;

-- 2. Check if these values exist in other tables
SELECT 
  'exercise_completions' as source_table,
  module_id as module_key,
  COUNT(*) as count
FROM exercise_completions
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'
  AND module_id IN ('2024-01-03-avoir', '2024-01-05-basic-nouns', '2024-01-02-etre')
GROUP BY module_id
ORDER BY module_id;

-- 3. Check section_progress table
SELECT 
  'section_progress' as source_table,
  module_key,
  COUNT(*) as count
FROM section_progress
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'
  AND module_key IN ('2024-01-03-avoir', '2024-01-05-basic-nouns', '2024-01-02-etre')
GROUP BY module_key
ORDER BY module_key;

-- 4. Check ALL module_key values in module_progress for this user
SELECT 
  module_key,
  unit_id,
  started_at,
  time_spent_seconds
FROM module_progress
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'
ORDER BY started_at;
