# Email System Setup Guide

## Overview

This guide walks you through setting up the complete email communication system for Language Academy.

## Prerequisites

- Supabase project with database access
- MailerLite account with API key
- Admin access to Supabase dashboard

## Step 1: Database Setup

### 1.1 Run SQL Scripts

In your Supabase SQL Editor, run these scripts **in order**:

1. **`email-system-schema.sql`** - Creates tables, indexes, RLS policies, and initial templates
2. **`email-system-default-prefs.sql`** - Sets default preferences for existing users
3. **`email-system-triggers.sql`** - Creates triggers for auto-queuing welcome emails

### 1.2 Verify Tables Created

Run this query to confirm all tables exist:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'notification_preferences',
    'email_templates',
    'email_queue',
    'email_logs'
  );
```

You should see all 4 tables.

## Step 2: Deploy Edge Functions

### 2.1 Set Environment Variables

In Supabase Dashboard → Edge Functions → Secrets, add:

```
MAILERLITE_API_KEY=your_mailerlite_api_key_here
APP_URL=https://languageacademy.io
FROM_EMAIL=noreply@languageacademy.io
FROM_NAME=Language Academy
```

### 2.2 Deploy Functions

Deploy each Edge Function using Supabase CLI or dashboard:

```bash
# Install Supabase CLI if not already
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy send-email
supabase functions deploy process-email-queue
supabase functions deploy check-review-reminders
supabase functions deploy check-module-nudges
```

Or upload manually via Supabase Dashboard → Edge Functions

### 2.3 Test send-email Function

Test the send-email function manually:

```bash
curl -i --location --request POST 'https://your-project-ref.supabase.co/functions/v1/send-email' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"email_type":"welcome","user_id":"your-user-id","metadata":{}}'
```

## Step 3: Set Up Scheduled Functions (pg_cron)

### 3.1 Enable pg_cron Extension

In Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;
```

### 3.2 Schedule process-email-queue (Every 10 Minutes)

```sql
SELECT cron.schedule(
  'process-email-queue',
  '*/10 * * * *', -- Every 10 minutes
  $$
  SELECT
    net.http_post(
      url:='https://your-project-ref.supabase.co/functions/v1/process-email-queue',
      headers:='{
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"
      }'::jsonb
    ) as request_id;
  $$
);
```

**Replace** `your-project-ref` and `YOUR_SERVICE_ROLE_KEY` with your actual values.

### 3.3 Schedule check-review-reminders (Daily at 9 AM UTC)

```sql
SELECT cron.schedule(
  'check-review-reminders',
  '0 9 * * *', -- Daily at 9 AM UTC
  $$
  SELECT
    net.http_post(
      url:='https://your-project-ref.supabase.co/functions/v1/check-review-reminders',
      headers:='{
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"
      }'::jsonb
    ) as request_id;
  $$
);
```

### 3.4 Schedule check-module-nudges (Daily at 10 AM UTC)

```sql
SELECT cron.schedule(
  'check-module-nudges',
  '0 10 * * *', -- Daily at 10 AM UTC
  $$
  SELECT
    net.http_post(
      url:='https://your-project-ref.supabase.co/functions/v1/check-module-nudges',
      headers:='{
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"
      }'::jsonb
    ) as request_id;
  $$
);
```

### 3.5 Verify Scheduled Jobs

Check that jobs are scheduled:

```sql
SELECT * FROM cron.job;
```

You should see 3 jobs: `process-email-queue`, `check-review-reminders`, `check-module-nudges`

### 3.6 View Job Execution History

```sql
SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
```

## Step 4: MailerLite Setup

### 4.1 Create API Key

1. Log in to MailerLite
2. Go to Settings → Integrations → MailerLite API
3. Create new API key
4. Copy the key and add it to Supabase Edge Function secrets

### 4.2 Configure Sender Email

1. In MailerLite, verify your sender domain (languageacademy.io)
2. Set up DKIM/SPF records for deliverability
3. Use verified email as FROM_EMAIL in environment variables

## Step 5: Deploy Frontend Components

The frontend components are already created in:

- `src/components/CommunicationAdmin.jsx` - Admin dashboard
- `src/components/NotificationSettings.jsx` - User preferences
- `src/hooks/useNotificationPreferences.js` - Preferences management

Deploy your Next.js/React app as usual. The components will automatically connect to the database.

## Step 6: Testing

### 6.1 Test Welcome Email

Create a new user account - they should receive a welcome email within 10 minutes (when process-email-queue runs).

### 6.2 Check Email Queue

```sql
SELECT * FROM email_queue ORDER BY created_at DESC LIMIT 10;
```

### 6.3 Check Email Logs

```sql
SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 10;
```

### 6.4 Test Admin Dashboard

1. Log in as admin
2. Navigate to Communication Admin
3. Try sending a manual email
4. Check email logs

### 6.5 Test User Preferences

1. Log in as regular user
2. Go to notification settings
3. Toggle email preferences
4. Verify changes saved

## Troubleshooting

### Emails Not Sending

1. Check email_queue table - are emails being queued?
2. Check cron job status: `SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 5;`
3. Check Edge Function logs in Supabase dashboard
4. Verify MAILERLITE_API_KEY is correct
5. Check MailerLite dashboard for failed sends

### Cron Jobs Not Running

1. Verify pg_cron extension is enabled: `SELECT * FROM pg_extension WHERE extname = 'pg_cron';`
2. Check job is scheduled: `SELECT * FROM cron.job;`
3. Verify service role key is correct in cron job
4. Check Supabase project is on a plan that supports pg_cron

### Template Variables Not Replacing

1. Verify template uses {{variable}} syntax (double curly braces)
2. Check metadata includes all required variables
3. Check send-email function logs for errors

## Manual Operations

### Manually Trigger Queue Processing

```sql
SELECT
  net.http_post(
    url:='https://your-project-ref.supabase.co/functions/v1/process-email-queue',
    headers:='{
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"
    }'::jsonb
  ) as request_id;
```

### Manually Queue an Email

```sql
INSERT INTO email_queue (user_id, email_type, scheduled_for, metadata)
VALUES (
  'user-id-here',
  'welcome',
  NOW(),
  '{"user_name": "Test User", "first_lesson_url": "https://languageacademy.io/lessons"}'::jsonb
);
```

### View All Active Templates

```sql
SELECT template_type, template_name, active FROM email_templates;
```

### Disable a Template

```sql
UPDATE email_templates SET active = false WHERE template_type = 'module_nudge';
```

## Future: Adding n8n Integration

The system is designed to support n8n workflows. When ready:

1. Add `send_via='n8n'` when queueing emails for n8n processing
2. Modify `process-email-queue` to call n8n webhook for n8n emails
3. n8n can handle complex flows like Word of the Day

## Security Notes

- **Service Role Key**: Never expose in client code - only use in Edge Functions or SQL
- **RLS Policies**: Users can only see their own preferences and logs
- **Template Editing**: Admins use Edge Functions with service role to modify templates
- **Email Sending**: Always goes through Edge Functions, never directly from client

## Monitoring

Set up monitoring for:

- Email delivery rates (from MailerLite)
- Failed emails in email_logs
- Queue backlog in email_queue
- Cron job execution history

## Support

If you encounter issues:

1. Check Supabase Edge Function logs
2. Check email_logs for error details
3. Verify all environment variables are set
4. Test MailerLite API key separately
