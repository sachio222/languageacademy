# Streak Calculation Fix

## Problems Fixed

1. **Session spam**: Was creating 1000+ sessions per day (one on every page refresh)
2. **Streak calculation bug**: Only seeing 1 unique date despite having multiple days of sessions
3. **Performance**: Inefficient date parsing in JavaScript

## Changes Made

### 1. Session Management (`src/hooks/useAnalytics.js`)

- Now checks for existing sessions within the last hour before creating new ones
- Reuses existing sessions on page refresh
- Added `sessionRef.current` check to prevent duplicate session creation
- You'll now see console logs: "Reusing existing session" or "Created new session"

### 2. Streak Calculation

- Added database function for efficient date calculation
- Added client-side fallback with explicit 5000-row limit
- Better logging to debug issues
- Fixed race condition with 500ms delay

## How to Apply

### Step 1: Run the Database Migration

Go to your Supabase SQL Editor and run:

```sql
-- Create function to get unique session dates for a user
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

GRANT EXECUTE ON FUNCTION get_session_dates(UUID) TO authenticated;
```

Or run the migration file:

```bash
# If using Supabase CLI
supabase db push
```

### Step 2: Test It

1. Refresh your app
2. Check the browser console - you should see:
   - "Reusing existing session from..." (on subsequent refreshes)
   - "Streak calculation (database):" or "Streak calculation (client-side fallback):"
   - Your actual streak count
3. Your streak should now show **4 days** (Oct 17, 16, 15, 14)

### Step 3: (Optional) Clean Up Old Sessions

If you want to clean up the spam sessions, run:

```sql
-- This will delete duplicate sessions, keeping only the first session of each hour
WITH sessions_to_keep AS (
  SELECT DISTINCT ON (user_id, DATE_TRUNC('hour', session_start))
    id
  FROM user_sessions
  WHERE user_id = '35e33bec-de10-4d70-86a3-c992fc7655dc'
  ORDER BY user_id, DATE_TRUNC('hour', session_start), session_start ASC
)
DELETE FROM user_sessions
WHERE user_id = '35e33bec-de10-4d70-86a3-c992fc7655dc'
  AND id NOT IN (SELECT id FROM sessions_to_keep);
```

This will reduce your ~3500 sessions down to a reasonable number while keeping accurate streak data.

## Expected Behavior Going Forward

- **New sessions created**: Only when you visit after 1+ hour gap
- **Page refreshes**: Will reuse existing session
- **Streak updates**: Once per session start
- **Console logs**: Clear indication of what's happening

## Timezone Note

The function uses `America/Los_Angeles` timezone. If you're in a different timezone, update the migration SQL to use your timezone (e.g., `America/New_York`, `UTC`, etc.).
