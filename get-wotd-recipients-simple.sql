-- Simple version: Get all users with emails (until notification_preferences is set up)
CREATE OR REPLACE FUNCTION get_wotd_recipients()
RETURNS TABLE (
  user_id UUID,
  email TEXT,
  first_name TEXT,
  timezone TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    up.email,
    up.first_name,
    COALESCE(up.timezone, 'UTC') as timezone
  FROM user_profiles up
  WHERE up.email IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

