-- Fix the RPC function to work with numeric unit_ids (no format change needed)

CREATE OR REPLACE FUNCTION get_unit_modules_detail(
  p_user_id UUID,
  p_unit_id TEXT
)
RETURNS TABLE (
  module_key text,
  started_at timestamptz,
  completed_at timestamptz,
  completion_percentage numeric,
  time_spent bigint,
  sections_completed bigint,
  total_sections bigint,
  sections_detail jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mvs.module_key,
    mvs.started_at,
    mvs.completed_at,
    mvs.completion_percentage,
    mvs.module_time,
    mvs.sections_completed,
    mvs.total_sections_started,
    mvs.sections_detail
  FROM mv_student_progress_summary mvs
  WHERE mvs.user_id = p_user_id
    AND mvs.unit_id = p_unit_id
  ORDER BY mvs.started_at DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql STABLE;


