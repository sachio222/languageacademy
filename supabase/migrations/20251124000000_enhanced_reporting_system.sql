-- Enhanced Reporting System: Materialized View and Triggers
-- This migration creates optimized views and functions for student report cards

-- ============================================================================
-- PART 1: Aggregate Function for Module Time from Sections
-- ============================================================================

-- Function to automatically sync module time from section progress
CREATE OR REPLACE FUNCTION update_module_time_from_sections()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate total time from all sections for this module
  WITH section_totals AS (
    SELECT 
      user_id,
      module_key,
      COALESCE(SUM(time_spent_seconds), 0) as total_section_time
    FROM section_progress
    WHERE user_id = NEW.user_id 
      AND module_key = NEW.module_key
    GROUP BY user_id, module_key
  )
  UPDATE module_progress mp
  SET 
    time_spent_seconds = st.total_section_time
  FROM section_totals st
  WHERE mp.user_id = st.user_id 
    AND mp.module_key = st.module_key;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to sync module time whenever section progress updates
DROP TRIGGER IF EXISTS sync_module_time_trigger ON section_progress;
CREATE TRIGGER sync_module_time_trigger
  AFTER INSERT OR UPDATE OF time_spent_seconds ON section_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_module_time_from_sections();

-- ============================================================================
-- PART 2: Materialized View for Report Card Data
-- ============================================================================

-- Drop existing view if it exists
DROP MATERIALIZED VIEW IF EXISTS mv_student_progress_summary CASCADE;

-- Create optimized materialized view for report card queries
CREATE MATERIALIZED VIEW mv_student_progress_summary AS
WITH 
-- Aggregate section progress by module
section_summaries AS (
  SELECT 
    user_id,
    module_key,
    COUNT(*) as total_sections_started,
    COUNT(*) FILTER (WHERE completed_at IS NOT NULL) as sections_completed,
    SUM(time_spent_seconds) as total_section_time,
    jsonb_object_agg(
      section_id,
      jsonb_build_object(
        'completed_at', completed_at,
        'time_spent', time_spent_seconds,
        'progress_data', progress_data
      )
    ) as sections_detail
  FROM section_progress
  GROUP BY user_id, module_key
),
-- Module progress with section data
module_summaries AS (
  SELECT 
    mp.user_id,
    mp.module_key,
    mp.unit_id,
    mp.started_at,
    mp.completed_at,
    mp.total_exercises,
    mp.completed_exercises,
    mp.study_mode_completed,
    mp.exam_score,
    mp.time_spent_seconds as module_time,
    ss.total_sections_started,
    ss.sections_completed,
    ss.total_section_time,
    ss.sections_detail,
    -- Calculate completion percentage
    CASE 
      WHEN mp.total_exercises > 0 
      THEN ROUND((mp.completed_exercises::numeric / mp.total_exercises) * 100)
      ELSE 0 
    END as completion_percentage
  FROM module_progress mp
  LEFT JOIN section_summaries ss 
    ON mp.user_id = ss.user_id 
    AND mp.module_key = ss.module_key
),
-- Unit-level aggregations
unit_summaries AS (
  SELECT 
    user_id,
    unit_id,
    COUNT(*) as total_modules,
    COUNT(*) FILTER (WHERE completed_at IS NOT NULL) as completed_modules,
    SUM(module_time) as unit_time_spent,
    SUM(total_section_time) as unit_section_time,
    AVG(completion_percentage) as avg_completion_percentage,
    -- Section type analytics
    jsonb_build_object(
      'total_sections', SUM(total_sections_started),
      'completed_sections', SUM(sections_completed)
    ) as unit_section_stats
  FROM module_summaries
  GROUP BY user_id, unit_id
)
-- Final combined view
SELECT 
  ms.user_id,
  ms.module_key,
  ms.unit_id,
  ms.started_at,
  ms.completed_at,
  ms.total_exercises,
  ms.completed_exercises,
  ms.study_mode_completed,
  ms.exam_score,
  ms.module_time,
  ms.completion_percentage,
  ms.total_sections_started,
  ms.sections_completed,
  ms.sections_detail,
  -- Include unit-level stats for easy access
  us.total_modules as unit_total_modules,
  us.completed_modules as unit_completed_modules,
  us.unit_time_spent,
  us.avg_completion_percentage as unit_avg_completion
FROM module_summaries ms
LEFT JOIN unit_summaries us 
  ON ms.user_id = us.user_id 
  AND ms.unit_id = us.unit_id;

-- Create indexes for fast queries
CREATE UNIQUE INDEX idx_mv_progress_user_module 
  ON mv_student_progress_summary(user_id, module_key);

CREATE INDEX idx_mv_progress_user 
  ON mv_student_progress_summary(user_id);

CREATE INDEX idx_mv_progress_unit 
  ON mv_student_progress_summary(user_id, unit_id);

CREATE INDEX idx_mv_progress_completed 
  ON mv_student_progress_summary(user_id, completed_at) 
  WHERE completed_at IS NOT NULL;

-- ============================================================================
-- PART 3: Refresh Function (Called Periodically or on Demand)
-- ============================================================================

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_progress_summary()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_student_progress_summary;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 4: RPC Functions for Report Card Queries
-- ============================================================================

-- Get hero stats for a user
CREATE OR REPLACE FUNCTION get_hero_stats(p_user_id UUID)
RETURNS jsonb AS $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_study_time', COALESCE(up.total_study_time_seconds, 0),
    'streak_days', COALESCE(up.streak_days, 0),
    'accuracy', COALESCE(
      CASE 
        WHEN COUNT(ec.id) > 0 
        THEN ROUND((COUNT(*) FILTER (WHERE ec.is_correct = true)::numeric / COUNT(ec.id)) * 100)
        ELSE 0 
      END, 0
    ),
    'words_learned', COALESCE(
      (SELECT COUNT(DISTINCT module_key) 
       FROM mv_student_progress_summary 
       WHERE user_id = p_user_id AND completed_at IS NOT NULL) * 10, -- Approximate
      0
    ),
    'modules_completed', COALESCE(
      (SELECT COUNT(*) 
       FROM mv_student_progress_summary 
       WHERE user_id = p_user_id AND completed_at IS NOT NULL),
      0
    ),
    'exercises_completed', COALESCE(
      (SELECT SUM(completed_exercises) 
       FROM module_progress 
       WHERE user_id = p_user_id),
      0
    )
  ) INTO v_result
  FROM user_profiles up
  LEFT JOIN exercise_completions ec ON ec.user_id = up.id
  WHERE up.id = p_user_id
  GROUP BY up.id, up.total_study_time_seconds, up.streak_days;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE;

-- Get unit progress summary
CREATE OR REPLACE FUNCTION get_unit_progress_summary(p_user_id UUID)
RETURNS TABLE (
  unit_id text,
  total_modules bigint,
  completed_modules bigint,
  completion_percentage numeric,
  total_time_spent bigint,
  section_stats jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mvs.unit_id,
    mvs.unit_total_modules,
    mvs.unit_completed_modules,
    ROUND((mvs.unit_completed_modules::numeric / NULLIF(mvs.unit_total_modules, 0)) * 100, 0),
    mvs.unit_time_spent,
    jsonb_build_object(
      'total_sections', SUM(mvs.total_sections_started),
      'completed_sections', SUM(mvs.sections_completed)
    )
  FROM mv_student_progress_summary mvs
  WHERE mvs.user_id = p_user_id
  GROUP BY 
    mvs.unit_id, 
    mvs.unit_total_modules, 
    mvs.unit_completed_modules, 
    mvs.unit_time_spent
  ORDER BY mvs.unit_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- Get detailed module progress for a unit
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

-- Get section-level analytics across all modules
CREATE OR REPLACE FUNCTION get_section_analytics(p_user_id UUID)
RETURNS TABLE (
  section_id text,
  total_modules_with_section bigint,
  completed_count bigint,
  avg_time_spent numeric,
  completion_rate numeric
) AS $$
BEGIN
  RETURN QUERY
  WITH section_stats AS (
    SELECT 
      key as section_id,
      COUNT(*) as total_count,
      COUNT(*) FILTER (WHERE (value->>'completed_at') IS NOT NULL) as completed,
      AVG((value->>'time_spent')::numeric) as avg_time
    FROM mv_student_progress_summary,
         jsonb_each(sections_detail)
    WHERE user_id = p_user_id
      AND sections_detail IS NOT NULL
    GROUP BY key
  )
  SELECT 
    ss.section_id,
    ss.total_count,
    ss.completed,
    ROUND(ss.avg_time, 0),
    ROUND((ss.completed::numeric / NULLIF(ss.total_count, 0)) * 100, 1)
  FROM section_stats ss
  ORDER BY ss.section_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- PART 5: Automatic Refresh Schedule (Optional - requires pg_cron extension)
-- ============================================================================

-- Note: Uncomment if pg_cron is available and you want automatic refreshes
-- SELECT cron.schedule(
--   'refresh-progress-summary',
--   '*/5 * * * *', -- Every 5 minutes
--   'SELECT refresh_progress_summary();'
-- );

-- ============================================================================
-- PART 6: Initial Data Population
-- ============================================================================

-- Populate the materialized view with existing data
REFRESH MATERIALIZED VIEW mv_student_progress_summary;

-- Add a comment for documentation
COMMENT ON MATERIALIZED VIEW mv_student_progress_summary IS 
  'Optimized view for student progress reports with section-level details. 
   Refresh periodically or on-demand using refresh_progress_summary() function.';

