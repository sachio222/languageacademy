-- Fix for module 170: Reference X - French Flow (Liaison Help)
-- This is the liaison help reference module

DO $$
DECLARE
  merged_count INTEGER := 0;
BEGIN
  -- Check if duplicate exists and merge if needed
  IF EXISTS (
    SELECT 1 FROM module_progress 
    WHERE user_id IN (
      SELECT user_id FROM module_progress WHERE module_key = '170'
    ) AND module_key = '2024-01-07-liaison-help'
  ) THEN
    -- Merge the data
    WITH old_data AS (
      SELECT * FROM module_progress WHERE module_key = '170'
    )
    UPDATE module_progress mp_new
    SET
      started_at = LEAST(mp_new.started_at, old.started_at),
      completed_at = GREATEST(mp_new.completed_at, old.completed_at),
      time_spent_seconds = COALESCE(mp_new.time_spent_seconds, 0) + COALESCE(old.time_spent_seconds, 0),
      total_exercises = GREATEST(COALESCE(mp_new.total_exercises, 0), COALESCE(old.total_exercises, 0)),
      completed_exercises = GREATEST(COALESCE(mp_new.completed_exercises, 0), COALESCE(old.completed_exercises, 0)),
      study_mode_completed = COALESCE(mp_new.study_mode_completed, false) OR COALESCE(old.study_mode_completed, false),
      exam_score = GREATEST(mp_new.exam_score, old.exam_score),
      attempts_count = COALESCE(mp_new.attempts_count, 0) + COALESCE(old.attempts_count, 0)
    FROM old_data old
    WHERE mp_new.user_id = old.user_id
      AND mp_new.module_key = '2024-01-07-liaison-help';
    
    -- Delete old row
    DELETE FROM module_progress WHERE module_key = '170';
    
    GET DIAGNOSTICS merged_count = ROW_COUNT;
    RAISE NOTICE 'Merged % duplicate liaison-help entries', merged_count;
  ELSE
    -- No duplicate, simple update
    UPDATE module_progress 
    SET module_key = '2024-01-07-liaison-help'
    WHERE module_key = '170';
    
    GET DIAGNOSTICS merged_count = ROW_COUNT;
    RAISE NOTICE 'Updated % liaison-help entries', merged_count;
  END IF;
END $$;

-- Verify the update
DO $$
DECLARE
  remaining_numeric INTEGER;
BEGIN
  SELECT COUNT(*) INTO remaining_numeric
  FROM module_progress
  WHERE module_key ~ '^\d+$';
  
  IF remaining_numeric > 0 THEN
    RAISE WARNING 'Still have % numeric module_key values remaining', remaining_numeric;
  ELSE
    RAISE NOTICE 'SUCCESS: All numeric module_key values have been converted!';
  END IF;
END $$;

-- Refresh the materialized view to pick up the change
REFRESH MATERIALIZED VIEW mv_student_progress_summary;


