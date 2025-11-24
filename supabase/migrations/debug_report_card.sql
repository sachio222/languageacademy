-- Debug: Check what's actually in the materialized view
-- Run this to see what data exists

-- 1. Check if materialized view has any data
SELECT COUNT(*) as total_rows
FROM mv_student_progress_summary;

-- 2. Check your specific user's data
SELECT 
  user_id,
  module_key,
  unit_id,
  started_at,
  completed_at,
  module_time,
  completion_percentage
FROM mv_student_progress_summary
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'  -- Your user ID from earlier
ORDER BY unit_id, started_at;

-- 3. Check what's in the base module_progress table
SELECT 
  module_key,
  unit_id,
  started_at,
  completed_at,
  time_spent_seconds
FROM module_progress
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'
ORDER BY unit_id, started_at
LIMIT 20;

-- 4. Check if unit_id values match what we're querying
SELECT DISTINCT unit_id 
FROM module_progress
WHERE user_id = '0d2c015e-886b-4a52-b54b-256280bd20f2'
ORDER BY unit_id;

