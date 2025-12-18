# Admin Dashboard Materialized View Refresh

The admin dashboard uses a materialized view (`admin_student_dashboard`) for fast, scalable queries.

## Manual Refresh

To manually refresh the dashboard data:

```sql
SELECT refresh_admin_dashboard();
```

Run this in the Supabase SQL Editor whenever you need updated data.

## Automatic Refresh Options

### Option 1: pg_cron (Recommended if available)

Check if pg_cron is enabled:

```sql
SELECT * FROM pg_available_extensions WHERE name = 'pg_cron';
```

If available, enable and schedule:

```sql
-- Enable pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule refresh every 5 minutes
SELECT cron.schedule(
  'refresh-admin-dashboard',
  '*/5 * * * *',
  'SELECT refresh_admin_dashboard()'
);

-- View scheduled jobs
SELECT * FROM cron.job;

-- Unschedule if needed
SELECT cron.unschedule('refresh-admin-dashboard');
```

### Option 2: Supabase Edge Function + External Cron

1. Create edge function `refresh-admin-dashboard`:

```typescript
// supabase/functions/refresh-admin-dashboard/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { error } = await supabaseClient.rpc("refresh_admin_dashboard");

  if (error) throw error;

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

2. Deploy: `supabase functions deploy refresh-admin-dashboard`

3. Set up cron job (crontab, GitHub Actions, etc.) to call:

```bash
curl -X POST 'https://your-project.supabase.co/functions/v1/refresh-admin-dashboard' \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Option 3: On-Demand Refresh (Simple)

For low-traffic scenarios, add a "Refresh" button in admin UI:

```javascript
const refreshDashboard = async () => {
  await supabaseClient.rpc("refresh_admin_dashboard");
  // Then refetch students
};
```

## Monitoring

Check last refresh time:

```sql
SELECT schemaname, matviewname, last_refresh
FROM pg_matviews
WHERE matviewname = 'admin_student_dashboard';
```

## Performance Notes

- Initial refresh takes ~1-5 seconds for 1,000 students
- Concurrent refresh (used in function) allows queries during refresh
- With proper indexes, queries are <100ms for 10,000+ students
- 5-minute staleness is acceptable for admin dashboards
