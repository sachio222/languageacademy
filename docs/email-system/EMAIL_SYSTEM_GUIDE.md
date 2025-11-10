# Email System - Complete Usage Guide

## 🎯 System Overview

**Resend:** Dynamic, personalized emails (WOTD, weekly summaries, congrats)  
**MailerLite:** Static marketing campaigns to segments  
**Your App:** Triggers emails on user events  
**n8n:** Complex scheduled workflows  

---

## 📁 File Organization

```
docs/email-system/
├── EMAIL_SYSTEM_GUIDE.md          ← This file (main guide)
├── email-system-final.sql         ← Database setup
├── cleanup-email-bloat.sql        ← Clean old tables
└── [other email docs]

src/
├── components/
│   ├── CommunicationAdmin.jsx      ← Admin dashboard (view logs)
│   └── NotificationSettings.jsx   ← User preferences
├── hooks/
│   └── useNotificationPreferences.js
├── utils/
│   └── emailTemplates.js          ← Email templates
└── hooks/
    ├── useAuth.js                  ← Syncs to MailerLite on signup
    └── useSupabaseProgress.js      ← Sends congrats emails

supabase/functions/
├── send-resend-email/              ← Sends dynamic emails
└── sync-to-mailerlite/             ← Syncs users to segments
```

---

## 🚀 Quick Start

### 1. Database Setup (One Time)
```sql
-- In Supabase SQL Editor:
-- Run these in order:
1. cleanup-email-bloat.sql (if you have old tables)
2. email-system-final.sql (creates clean schema)
```

### 2. Verify Edge Functions
```bash
supabase functions list
# Should show: send-resend-email, sync-to-mailerlite
```

### 3. Test Email Connectivity
1. Go to your app → Click 📧 button
2. Click "Test Resend Email"
3. Check brainpowerux@gmail.com

---

## 📧 Email Types & How They Work

### Automatic (Triggered by App Events)

#### 1. Welcome Email (MailerLite Automation)
**Trigger:** User signs up  
**Flow:** `useAuth.js` → `sync-to-mailerlite` → Adds to "All Users" group → MailerLite automation sends welcome  
**Setup:** Create "All Users" group + automation in MailerLite dashboard  

#### 2. Lesson Complete (Resend)
**Trigger:** User completes module  
**Flow:** `useSupabaseProgress.js` → `send-resend-email` → Instant congrats email  
**Template:** `emailTemplates.lessonComplete()`  
**Setup:** Already working! ✅  

### Scheduled (n8n Workflows)

#### 3. Word of the Day (Resend via n8n)
**Trigger:** Daily at 5am per timezone  
**Flow:** n8n → LLM generates word → `send-resend-email` → Quiz email to all users  
**Template:** `emailTemplates.wordOfTheDay()`  
**Setup:** See n8n section below  

#### 4. Weekly Summary (Resend via n8n)
**Trigger:** Weekly (Monday 9am)  
**Flow:** n8n → Query user's learned words → `send-resend-email` → Personal summary  
**Template:** `emailTemplates.weeklySummary()`  
**Setup:** See n8n section below  

### Manual (MailerLite Dashboard)

#### 5. Marketing Campaigns
**Trigger:** You send manually  
**Flow:** MailerLite dashboard → Select segment → Send campaign  
**Examples:** "Come back to French!" to dormant users  

---

## 🤖 n8n Integration Guide

### Word of the Day Workflow

#### Trigger Node
- **Type:** Schedule Trigger
- **Cron:** `0 * * * *` (every hour)
- **Purpose:** Process different timezones each hour

#### Filter by Timezone Node
```javascript
// Code Node - Filter for current hour's timezone
const currentHour = new Date().getUTCHours();

// Map UTC hours to timezones that should get WOTD at 5am local time
const timezoneMap = {
  5: ['UTC'],
  9: ['America/New_York', 'America/Toronto'], // 9 UTC = 5am EST
  10: ['America/Chicago'], // 10 UTC = 5am CST
  11: ['America/Denver'], // 11 UTC = 5am MST
  12: ['America/Los_Angeles'], // 12 UTC = 5am PST
  13: ['Europe/London'], // 13 UTC = 5am GMT (summer)
  14: ['Europe/Paris', 'Europe/Berlin'], // 14 UTC = 5am CET (summer)
  // Add more as needed
};

const targetTimezones = timezoneMap[currentHour] || [];

return {
  json: {
    timezones: targetTimezones,
    currentHour: currentHour,
    shouldProcess: targetTimezones.length > 0
  }
};
```

#### Stop if No Timezones Node
- **Type:** IF Node
- **Condition:** `{{ $json.shouldProcess }} === true`
- **Purpose:** Skip execution if no timezones to process

#### Generate Word with LLM Node
```javascript
// HTTP Request Node to your LLM (OpenAI, Claude, etc.)
// POST to your LLM API
{
  "prompt": "Generate a French word quiz. Return JSON with: word (French), translation (English), pronunciation (IPA), correct_answer, wrong_option_1, wrong_option_2, wrong_option_3. Make wrong options plausible but clearly incorrect. Difficulty: beginner.",
  "response_format": "json"
}

// Expected response:
{
  "word": "bonjour",
  "translation": "hello",
  "pronunciation": "bon-ZHOOR",
  "correct_answer": "hello",
  "wrong_option_1": "goodbye",
  "wrong_option_2": "thank you", 
  "wrong_option_3": "excuse me"
}
```

#### Save Word to Database Node
```javascript
// Supabase Node - Insert Row
// Table: word_of_the_day
{
  "word": "{{ $node['Generate Word'].json.word }}",
  "translation": "{{ $node['Generate Word'].json.translation }}",
  "pronunciation": "{{ $node['Generate Word'].json.pronunciation }}",
  "difficulty": "beginner",
  "correct_answer": "{{ $node['Generate Word'].json.correct_answer }}",
  "wrong_option_1": "{{ $node['Generate Word'].json.wrong_option_1 }}",
  "wrong_option_2": "{{ $node['Generate Word'].json.wrong_option_2 }}",
  "wrong_option_3": "{{ $node['Generate Word'].json.wrong_option_3 }}",
  "date": "{{ $today }}"
}
```

#### Get Opted-In Users Node
```javascript
// Supabase Node - Select Rows
// Table: notification_preferences
// Join with: user_profiles
// Filters:
// - email_enabled = true
// - word_of_day = true  
// - timezone IN {{ $json.timezones }}
// Select: user_profiles.id, user_profiles.email, user_profiles.preferred_name, user_profiles.first_name
```

#### Loop Through Users Node
- **Type:** Loop Over Items
- **Input:** Users from previous node

#### Send WOTD Email Node
```javascript
// HTTP Request Node
// Method: POST
// URL: https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email
// Headers:
{
  "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY",
  "Content-Type": "application/json"
}

// Body:
{
  "to": "{{ $json.email }}",
  "subject": "Votre mot du jour: \"{{ $node['Generate Word'].json.word }}\" 🇫🇷",
  "html": "<!-- Use emailTemplates.wordOfTheDay() format -->",
  "email_type": "word_of_day",
  "user_id": "{{ $json.id }}",
  "metadata": {
    "word": "{{ $node['Generate Word'].json.word }}",
    "date": "{{ $today }}"
  }
}
```

#### Email Template for n8n
```javascript
// In the Send Email node body, use this HTML:
const wordData = $node['Generate Word'].json;
const userData = $json; // Current user in loop

const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #2563eb; margin-bottom: 8px;">Mot du Jour</h1>
  <h2 style="color: #1a1a1a; margin: 0;">"${wordData.word}"</h2>
  <p style="color: #665665; margin-top: 4px;">/${wordData.pronunciation}/</p>
  
  <div style="margin: 32px 0;">
    <p style="font-size: 18px; font-weight: 500;">What does "${wordData.word}" mean?</p>
    
    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
      <a href="https://languageacademy.app/wotd?word=${wordData.word}&answer=A" 
         style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
        A) ${wordData.wrong_option_1}
      </a>
      <a href="https://languageacademy.app/wotd?word=${wordData.word}&answer=B" 
         style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
        B) ${wordData.correct_answer}
      </a>
      <a href="https://languageacademy.app/wotd?word=${wordData.word}&answer=C" 
         style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
        C) ${wordData.wrong_option_2}
      </a>
      <a href="https://languageacademy.app/wotd?word=${wordData.word}&answer=D" 
         style="display: block; padding: 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: #1a1a1a;">
        D) ${wordData.wrong_option_3}
      </a>
      <a href="https://languageacademy.app/wotd?word=${wordData.word}&answer=X" 
         style="display: block; padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; text-decoration: none; color: #1e40af; text-align: center;">
        I don't know
      </a>
    </div>
  </div>
  
  <p style="color: #665665; font-size: 14px;">Bonne chance!<br>Language Academy</p>
</div>
`;

// Use this html variable in your n8n HTTP request body
```

---

## 🔧 API Reference

### send-resend-email Edge Function

**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email`

**Headers:**
```javascript
{
  "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY",
  "Content-Type": "application/json"
}
```

**Body:**
```javascript
{
  "to": "user@email.com",           // Required: recipient email
  "subject": "Your Subject",        // Required: email subject
  "html": "<h1>Your HTML</h1>",     // Required: email content
  "email_type": "word_of_day",      // Required: for logging/preferences
  "user_id": "uuid",                // Optional: for logging/preferences
  "metadata": { "key": "value" }    // Optional: extra data for logs
}
```

**Response:**
```javascript
// Success:
{ "success": true, "email_id": "resend-email-id" }

// Failure:
{ "success": false, "reason": "resend_not_configured" }
{ "success": false, "reason": "user_opted_out" }
{ "success": false, "reason": "resend_api_error" }
```

### sync-to-mailerlite Edge Function

**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/sync-to-mailerlite`

**Body:**
```javascript
{
  "event": "signup",                // Event type
  "user_id": "uuid",               // Your user ID
  "email": "user@email.com",       // User's email
  "name": "User Name",             // User's name
  "metadata": {
    "group": "All Users",          // MailerLite group to add to
    "modules_completed": 5,        // Custom fields
    "current_unit": 2
  }
}
```

---

## 🗄️ Database Tables

### notification_preferences
```sql
user_id UUID          -- Links to user_profiles
email_enabled BOOLEAN -- Master on/off switch
welcome_email BOOLEAN -- MailerLite automation toggle
lesson_complete BOOLEAN -- Resend congrats toggle
module_nudge BOOLEAN  -- Resend nudge toggle  
word_of_day BOOLEAN   -- n8n WOTD toggle
weekly_summary BOOLEAN -- n8n summary toggle
timezone TEXT         -- For n8n scheduling
```

### email_logs
```sql
user_id UUID          -- Who got the email
email_type TEXT       -- 'word_of_day', 'lesson_complete', etc.
recipient_email TEXT  -- Where it was sent
subject TEXT          -- Email subject
sent_at TIMESTAMP     -- When sent
status TEXT           -- 'delivered', 'failed', 'skipped'
provider TEXT         -- 'resend' or 'mailerlite'
failure_reason TEXT   -- Why it failed (if it did)
metadata JSONB        -- Extra data
```

### word_of_the_day (for n8n)
```sql
word TEXT             -- French word
translation TEXT      -- English translation
pronunciation TEXT    -- IPA pronunciation
correct_answer TEXT   -- Right answer
wrong_option_1 TEXT   -- Wrong choice 1
wrong_option_2 TEXT   -- Wrong choice 2  
wrong_option_3 TEXT   -- Wrong choice 3
date DATE             -- Which day (unique)
```

### wotd_attempts (for tracking)
```sql
user_id UUID          -- Who answered
word_id UUID          -- Which word
selected_answer TEXT  -- A, B, C, D, or X
is_correct BOOLEAN    -- Got it right?
attempted_at TIMESTAMP -- When they answered
```

---

## 🎨 Email Templates

### Location: `src/utils/emailTemplates.js`

### Available Templates:

#### lessonComplete(userName, moduleTitle, moduleId)
**Used by:** useSupabaseProgress.js when module completes  
**Sent via:** Resend (instant)  

#### moduleNudge(userName, moduleTitle, moduleId, modulesRemaining)
**Used by:** Future nudge system  
**Sent via:** Resend (scheduled)  

#### wordOfTheDay(word, pronunciation, optionA, optionB, optionC, optionD, wordId)
**Used by:** n8n WOTD workflow  
**Sent via:** Resend (n8n calls the API)  

#### weeklySummary(userName, wordsLearned, totalWords, weekStart, weekEnd)
**Used by:** n8n weekly workflow  
**Sent via:** Resend (n8n calls the API)  

### Customizing Templates
```javascript
// Edit src/utils/emailTemplates.js
export const emailTemplates = {
  lessonComplete: (userName, moduleTitle, moduleId) => ({
    subject: `Your custom subject here`,
    html: `Your custom HTML here with ${userName}`
  })
};
```

---

## 🔧 n8n Workflow Examples

### Daily Word of the Day (Complete Workflow)

```
[Schedule Trigger: 0 * * * *]
  ↓
[Code: Filter Timezones]
  ↓
[IF: Should Process?]
  ↓
[HTTP: Generate Word with LLM]
  ↓
[Supabase: Save to word_of_the_day]
  ↓
[Supabase: Get Opted-In Users]
  ↓
[Loop: For Each User]
  ↓
[HTTP: Send Email via send-resend-email]
  ↓
[End]
```

#### Key n8n Nodes:

**1. Get Users Query:**
```sql
SELECT up.id, up.email, up.preferred_name, up.first_name
FROM user_profiles up
JOIN notification_preferences np ON up.id = np.user_id
WHERE np.email_enabled = true 
  AND np.word_of_day = true
  AND np.timezone = ANY({{ $json.timezones }})
```

**2. Send Email HTTP Request:**
- **URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email`
- **Method:** POST
- **Headers:** `Authorization: Bearer YOUR_SUPABASE_ANON_KEY`
- **Body:** Use the template format above

### Weekly Summary Workflow

```
[Schedule Trigger: 0 9 * * 1] (Monday 9am)
  ↓
[Supabase: Get All Users with Preferences]
  ↓
[Loop: For Each User]
  ↓
[Supabase: Get User's Words from Last 7 Days]
  ↓
[Code: Format Word List]
  ↓
[HTTP: Send Summary via send-resend-email]
  ↓
[End]
```

---

## 🎛️ Admin Controls

### Communication Admin Dashboard
**Access:** Click 📧 button when logged in as admin

**Features:**
- View email stats (sent today/week)
- See all email logs with filters
- Test Resend connectivity
- Monitor failures

### User Notification Settings
**Access:** Users can access via settings (you need to add link)

**Features:**
- Master email toggle
- Individual email type toggles
- Timezone selection

---

## 🧪 Testing

### Test Resend Connection
1. Go to Communication Admin (📧 button)
2. Click "Test Resend Email"
3. Check brainpowerux@gmail.com

### Test User Signup Flow
1. Create new user account
2. Check email_logs table: `SELECT * FROM email_logs ORDER BY sent_at DESC;`
3. Check MailerLite dashboard for new subscriber

### Test Module Completion
1. Complete a module
2. Should get instant congrats email
3. Check email_logs for the send

### Test n8n Workflow
1. Run workflow manually in n8n
2. Check word_of_the_day table for new word
3. Check email_logs for WOTD sends

---

## 🚨 Troubleshooting

### No Emails Sending
```sql
-- Check user preferences
SELECT * FROM notification_preferences WHERE user_id = 'your-user-id';

-- Check email logs for failures
SELECT * FROM email_logs WHERE status = 'failed' ORDER BY sent_at DESC;
```

### Edge Function Errors
- Check Supabase Dashboard → Edge Functions → Logs
- Look for error messages and stack traces

### n8n Issues
- Check n8n execution logs
- Verify Supabase connection credentials
- Test HTTP requests manually

### MailerLite Issues
- Check MailerLite dashboard for bounces
- Verify domain authentication
- Check group membership

---

## 📈 Monitoring

### Daily Checks
```sql
-- Emails sent today
SELECT COUNT(*) FROM email_logs WHERE sent_at::date = CURRENT_DATE;

-- Failed emails today  
SELECT * FROM email_logs WHERE status = 'failed' AND sent_at::date = CURRENT_DATE;

-- WOTD quiz participation
SELECT COUNT(*) FROM wotd_attempts WHERE attempted_at::date = CURRENT_DATE;
```

### Weekly Reports
```sql
-- Email volume by type
SELECT email_type, COUNT(*), provider 
FROM email_logs 
WHERE sent_at >= NOW() - INTERVAL '7 days'
GROUP BY email_type, provider;

-- User engagement with WOTD
SELECT 
  COUNT(*) as total_attempts,
  COUNT(*) FILTER (WHERE is_correct = true) as correct_answers,
  ROUND(COUNT(*) FILTER (WHERE is_correct = true) * 100.0 / COUNT(*), 1) as accuracy_percent
FROM wotd_attempts 
WHERE attempted_at >= NOW() - INTERVAL '7 days';
```

---

## 🔐 Security & Privacy

### User Data Protection
- Users can opt out of any email type
- All email logs are user-scoped (RLS)
- No email content stored (just metadata)

### API Key Security
- Resend key stored in Supabase secrets (not frontend)
- MailerLite key stored in Supabase secrets
- n8n accesses via environment variables

### Email Deliverability
- Verify support@languageacademy.io in both Resend and MailerLite
- Set up SPF/DKIM records
- Monitor bounce rates

---

## 🚀 Scaling Considerations

### Email Volume
- **Resend free tier:** 3,000 emails/month
- **MailerLite free tier:** 1,000 subscribers
- **n8n:** Consider execution limits

### Database Performance
- email_logs table will grow - consider archiving old logs
- Index on sent_at for fast date queries
- Monitor query performance

### Rate Limiting
- Resend: 10 emails/second
- MailerLite: 120 requests/minute
- Add delays in n8n if needed

---

## 📚 Quick Reference

### Environment Variables Needed
```bash
# In Supabase Edge Function secrets:
RESEND_API_KEY=re_your_key_here
MAILERLITE_API_KEY=your_mailerlite_key

# In n8n:
SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

### Common n8n Queries
```sql
-- Get opted-in users for WOTD
SELECT up.id, up.email, up.preferred_name 
FROM user_profiles up
JOIN notification_preferences np ON up.id = np.user_id
WHERE np.email_enabled = true AND np.word_of_day = true;

-- Get user's learned words this week
SELECT DISTINCT word_french, word_english
FROM exercise_completions ec
JOIN module_progress mp ON ec.module_id = mp.module_id
WHERE ec.user_id = 'user-id' 
  AND ec.completed_at >= NOW() - INTERVAL '7 days'
  AND ec.is_correct = true;
```

### Email Template Variables
```javascript
// Available in all templates:
${userName}     // User's preferred name
${APP_URL}      // https://languageacademy.app

// WOTD specific:
${word}         // French word
${pronunciation} // IPA pronunciation  
${optionA}      // Quiz option A
${wordId}       // Word ID for URL

// Weekly summary:
${wordsLearned} // Array of {french, english}
${totalWords}   // Total vocabulary count
```

---

**System is ready! Start with the database setup, then build your n8n workflows using this guide.** 🚀
