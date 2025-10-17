-- Create function to get unique session dates for a user
-- This is much more efficient than fetching all sessions and parsing dates in JavaScript
CREATE OR REPLACE FUNCTION get_session_dates(p_user_id UUID)
RETURNS TABLE (session_date TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT 
    TO_CHAR(session_start AT TIME ZONE 'America/Los_Angeles', 'YYYY-MM-DD') as session_date
  FROM user_sessions
  WHERE user_id = p_user_id
    AND session_start >= NOW() - INTERVAL '365 days'
  ORDER BY session_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_session_dates(UUID) TO authenticated;

