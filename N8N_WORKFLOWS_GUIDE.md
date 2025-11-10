# n8n Workflows for Email System (Future Enhancement)

This guide documents how to set up n8n workflows for advanced email features like Word of the Day. The core email system works without n8n, but n8n enables complex scheduled workflows.

## Why n8n?

For simple event-driven emails (welcome, module completion, review reminders), the system uses Supabase Edge Functions to send directly via MailerLite.

For complex workflows that need to:
- Pull data from multiple sources
- Generate dynamic content
- Run on custom schedules
- Transform data before sending

...use n8n! It provides a visual workflow builder perfect for multi-step email campaigns.

## Architecture

The system supports **two sending paths**:

### Path 1: Direct (Current Implementation)
```
User Action → DB Trigger → email_queue → Edge Function → MailerLite
```

### Path 2: n8n (Future)
```
Schedule → n8n → Query Data → Transform → MailerLite → Log to DB
```

## Example: Word of the Day Workflow

### Requirements
- Send at 5am user's local timezone
- Random French word from dictionary
- Include pronunciation, example sentence, image
- Only to users who opted in

### n8n Workflow Setup

#### Step 1: Create Schedule Trigger

1. Add "Schedule Trigger" node
2. Set to run every hour: `0 * * * *`
3. This allows us to process different timezones each hour

#### Step 2: Filter for Current Hour's Timezone

```javascript
// Code node to filter users
const currentHour = new Date().getUTCHours();

// Map UTC hours to timezones that should receive at 5am
const timezoneMap = {
  5: ['UTC'], // 5 UTC = 5am UTC
  10: ['America/New_York', 'America/Toronto'], // 10 UTC = 5am EST
  11: ['America/Chicago'], // 11 UTC = 5am CST
  // ... add more timezones
};

const targetTimezones = timezoneMap[currentHour] || [];

return {
  json: {
    timezones: targetTimezones,
    currentHour: currentHour
  }
};
```

#### Step 3: Query Supabase for Opted-In Users

1. Add "Supabase" node
2. Operation: "Select Rows"
3. Table: `notification_preferences`
4. Filters:
   - `email_enabled = true`
   - `word_of_day = true` (you'll add this column)
   - `timezone IN {{$json.timezones}}`
5. Join with `user_profiles` to get email addresses

#### Step 4: Get Random Word from Dictionary

Option A: Query your dictionary database
```sql
SELECT word, translation, pronunciation, example_sentence, image_url
FROM french_dictionary
WHERE difficulty_level = 'beginner'  -- or based on user level
ORDER BY RANDOM()
LIMIT 1;
```

Option B: Use Cambridge API (if available)

Option C: Curated word list you manage

#### Step 5: Loop Through Users

1. Add "Loop Over Items" node
2. Process each user individually

#### Step 6: Render Email Template

```javascript
// Code node to personalize email
const user = $json.user_profiles;
const word = $node["Get Random Word"].json;

const emailHtml = `
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #2563eb;">Mot du Jour 📚</h1>
  <p>Bonjour ${user.preferred_name || user.first_name}!</p>
  
  <div style="background: #f9fafb; padding: 24px; border-radius: 12px; margin: 20px 0;">
    <h2 style="margin: 0 0 8px 0; color: #111827;">${word.word}</h2>
    <p style="color: #6b7280; margin: 0 0 16px 0;">/${word.pronunciation}/</p>
    <p style="font-size: 18px; color: #374151;"><strong>Translation:</strong> ${word.translation}</p>
    <p style="font-style: italic; color: #6b7280;">"${word.example_sentence}"</p>
  </div>
  
  <p>Keep up the great work!</p>
  <p>Bonne journée!<br>Language Academy</p>
</body>
</html>
`;

return {
  json: {
    to: user.email,
    subject: `Votre mot du jour: ${word.word} 🇫🇷`,
    html: emailHtml,
    user_id: user.id,
    word: word.word
  }
};
```

#### Step 7: Send via MailerLite

1. Add "HTTP Request" node
2. Method: POST
3. URL: `https://connect.mailerlite.com/api/emails`
4. Headers:
   ```json
   {
     "Authorization": "Bearer {{$credentials.mailerlite_api_key}}",
     "Content-Type": "application/json"
   }
   ```
5. Body:
   ```json
   {
     "to": "{{$json.to}}",
     "from": {
       "email": "noreply@languageacademy.app",
       "name": "Language Academy"
     },
     "subject": "{{$json.subject}}",
     "html": "{{$json.html}}"
   }
   ```

#### Step 8: Log to Database

1. Add "Supabase" node
2. Operation: "Insert Row"
3. Table: `email_logs`
4. Data:
   ```json
   {
     "user_id": "{{$json.user_id}}",
     "email_type": "word_of_day",
     "recipient_email": "{{$json.to}}",
     "subject": "{{$json.subject}}",
     "sent_at": "{{$now}}",
     "mailerlite_response": "{{$node[\"Send Email\"].json}}",
     "status": "delivered",
     "metadata": {
       "word": "{{$json.word}}"
     }
   }
   ```

### Full Workflow Visual

```
[Schedule: Every Hour]
  ↓
[Filter Timezones for Current Hour]
  ↓
[Query Supabase: Get Opted-In Users]
  ↓
[Get Random French Word]
  ↓
[Loop: For Each User]
  ↓
[Render Personalized Email]
  ↓
[Send via MailerLite]
  ↓
[Log to email_logs Table]
  ↓
[End]
```

## Adding "send_via" Support to Email Queue

To integrate n8n with the existing queue system:

### 1. Add Column to email_queue

```sql
ALTER TABLE email_queue ADD COLUMN send_via TEXT DEFAULT 'direct';
```

Options: `'direct'` or `'n8n'`

### 2. Modify process-email-queue Edge Function

```typescript
// In process-email-queue/index.ts
if (email.send_via === 'n8n') {
  // Call n8n webhook instead of send-email
  const n8nResponse = await fetch(
    Deno.env.get("N8N_WEBHOOK_URL") ?? "",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        queue_id: email.id,
        user_id: email.user_id,
        email_type: email.email_type,
        metadata: email.metadata,
      }),
    }
  );
  // ... handle response
} else {
  // Use direct send-email function (current implementation)
}
```

### 3. Create n8n Webhook Workflow

This webhook receives queued emails and processes them:

1. Webhook Trigger
2. Fetch user data from Supabase
3. Fetch template from Supabase
4. Render template with metadata
5. Send via MailerLite
6. Log to email_logs
7. Return success/failure to Supabase

## Other n8n Workflow Ideas

### Weekly Digest

- Schedule: Every Monday 9am
- Content: User's progress summary, upcoming modules, personalized tips
- Pull data from module_progress, unit_progress tables

### Streak Notifications

- Schedule: Daily at user's preferred time
- Check: Users on 3, 7, 30, 100 day streaks
- Content: Celebration and encouragement

### Abandoned Cart Recovery (for paid features)

- Trigger: User starts checkout but doesn't complete
- Wait 1 hour
- Send reminder email with discount code

### Birthday Emails

- Schedule: Daily at 8am
- Query: Users with birthday today
- Send: Personalized birthday greeting with bonus lesson

### Content Updates

- Trigger: Admin flags new content
- Filter: Users who completed prerequisite modules
- Send: Notification about new available content

## n8n Setup Checklist

- [ ] Install n8n (self-hosted or n8n.cloud)
- [ ] Connect to Supabase (credentials)
- [ ] Connect to MailerLite (API key)
- [ ] Set up timezone mapping logic
- [ ] Create Word of Day workflow
- [ ] Test with small group first
- [ ] Add send_via column to database
- [ ] Modify process-email-queue function
- [ ] Create webhook workflow
- [ ] Monitor logs and delivery rates
- [ ] Set up error alerts
- [ ] Document custom workflows

## Testing n8n Workflows

1. **Manual Execution**: Run workflow manually with test data
2. **Single User Test**: Filter for your own email only
3. **Dry Run**: Log what would be sent without actually sending
4. **Small Group**: Test with 5-10 beta users
5. **Monitor**: Watch logs for errors before scaling up

## n8n Best Practices

1. **Always Log**: Every email sent should be logged to email_logs
2. **Respect Preferences**: Always check notification_preferences before sending
3. **Rate Limiting**: Don't send more than X emails per minute to avoid spam filters
4. **Error Handling**: Catch failures and log them for debugging
5. **Idempotency**: Use queue IDs to prevent duplicate sends
6. **Testing**: Test in staging environment first

## Cost Considerations

- n8n.cloud: $20-50/month for small scale
- Self-hosted: Server costs only
- MailerLite: Free tier covers small lists, paid plans for growth
- Supabase: Edge Function invocations count toward quota

## Support and Resources

- n8n Documentation: https://docs.n8n.io
- n8n Community: https://community.n8n.io
- MailerLite API: https://developers.mailerlite.com
- Example Workflows: Export n8n workflows as JSON for backup/sharing

