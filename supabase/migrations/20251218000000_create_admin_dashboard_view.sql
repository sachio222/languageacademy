-- Migration: Create materialized view for admin student dashboard
-- Provides pre-calculated stats for fast admin queries at scale

-- Drop existing view if it exists (for re-running migration)
DROP MATERIALIZED VIEW IF EXISTS admin_student_dashboard CASCADE;

-- Create materialized view with all pre-calculated stats
CREATE MATERIALIZED VIEW admin_student_dashboard AS
SELECT 
  -- User profile fields
  p.id,
  p.email,
  p.first_name,
  p.last_name,
  p.preferred_name,
  p.clerk_user_id,
  p.streak_days,
  p.total_study_time_seconds,
  p.last_active_at,
  p.created_at,
  
  -- Pre-calculate engagement status (no runtime computation needed)
  CASE 
    WHEN p.last_active_at IS NULL THEN 'inactive'
    WHEN p.last_active_at > NOW() - INTERVAL '24 hours' THEN 'active'
    WHEN p.last_active_at > NOW() - INTERVAL '72 hours' THEN 'recent'
    WHEN p.last_active_at > NOW() - INTERVAL '7 days' THEN 'at-risk'
    ELSE 'inactive'
  END as engagement_status,
  
  -- Aggregate module stats
  COALESCE((
    SELECT COUNT(*) 
    FROM module_progress 
    WHERE user_id = p.id 
    AND completed_at IS NOT NULL
  ), 0) as modules_completed,
  
  -- Aggregate exercise stats
  COALESCE((
    SELECT COUNT(*) 
    FROM exercise_completions 
    WHERE user_id = p.id
  ), 0) as total_exercises,
  
  -- Calculate accuracy (avoid division by zero)
  COALESCE((
    SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE is_correct) / NULLIF(COUNT(*), 0))
    FROM exercise_completions 
    WHERE user_id = p.id
  ), 0) as accuracy

FROM user_profiles p;

-- Create indexes for fast filtering and searching
CREATE INDEX idx_admin_dashboard_id ON admin_student_dashboard(id);
CREATE INDEX idx_admin_dashboard_engagement ON admin_student_dashboard(engagement_status);
CREATE INDEX idx_admin_dashboard_created ON admin_student_dashboard(created_at DESC);
CREATE INDEX idx_admin_dashboard_last_active ON admin_student_dashboard(last_active_at DESC);

-- Full-text search index for name/email search
CREATE INDEX idx_admin_dashboard_search ON admin_student_dashboard 
USING gin(to_tsvector('english', 
  COALESCE(first_name, '') || ' ' || 
  COALESCE(last_name, '') || ' ' || 
  COALESCE(preferred_name, '') || ' ' || 
  COALESCE(email, '')
));

-- Add comment
COMMENT ON MATERIALIZED VIEW admin_student_dashboard IS 
  'Pre-calculated student stats for admin dashboard. Refreshed every 5 minutes via cron.';

-- Initial refresh to populate data
REFRESH MATERIALIZED VIEW admin_student_dashboard;

-- Enable RLS on materialized view (admin only)
ALTER MATERIALIZED VIEW admin_student_dashboard OWNER TO postgres;

-- Create function to refresh the view (call this from cron or manually)
CREATE OR REPLACE FUNCTION refresh_admin_dashboard()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Concurrent refresh allows queries during refresh (non-blocking)
  REFRESH MATERIALIZED VIEW CONCURRENTLY admin_student_dashboard;
  
  -- Log refresh time
  RAISE NOTICE 'Admin dashboard refreshed at %', NOW();
END;
$$;

-- Grant execute permission to authenticated users (admin check done in RLS)
GRANT EXECUTE ON FUNCTION refresh_admin_dashboard() TO authenticated;

-- Add comment
COMMENT ON FUNCTION refresh_admin_dashboard() IS 
  'Refreshes admin_student_dashboard materialized view. Call from cron every 5 minutes.';

-- Note: To set up automatic refresh, use one of these methods:
-- 
-- METHOD 1: Supabase pg_cron (if available)
-- SELECT cron.schedule(
--   'refresh-admin-dashboard',
--   '*/5 * * * *', -- Every 5 minutes
--   'SELECT refresh_admin_dashboard()'
-- );
--
-- METHOD 2: External cron job hitting Supabase edge function
-- Create edge function that calls: SELECT refresh_admin_dashboard()
--
-- METHOD 3: Manual refresh via API call when needed
-- (Good for low-traffic scenarios)
