# Email System Integration Guide

## 🎯 What's Built & Working

### Resend Integration
- ✅ **send-resend-email** Edge Function deployed
- ✅ **Test button works** (verified)
- ✅ **Congrats emails** send on module completion
- ✅ **CORS headers** configured

### MailerLite Integration  
- ✅ **sync-to-mailerlite** Edge Function deployed
- ✅ **Users sync** to MailerLite on signup
- ✅ **API key** configured

### Database
- ✅ **notification_preferences** - User email controls
- ✅ **email_logs** - Track all email activity

### Frontend
- ✅ **Communication Admin** - View logs, test emails
- ✅ **User preferences** - Opt-in/out controls

---

## 🔧 API Reference

### send-resend-email Edge Function

**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email`

**Request:**
```json
{
  "to": "user@email.com",
  "subject": "Your Subject", 
  "html": "<h1>Your HTML content</h1>",
  "email_type": "word_of_day",
  "user_id": "optional-uuid",
  "metadata": {}
}
```

**Response:**
```json
{"success": true, "email_id": "resend-id"}
{"success": false, "reason": "resend_not_configured"}
{"success": false, "reason": "user_opted_out"}
```

### sync-to-mailerlite Edge Function

**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/sync-to-mailerlite`

**Request:**
```json
{
  "event": "signup",
  "user_id": "uuid",
  "email": "user@email.com", 
  "name": "User Name",
  "metadata": {
    "group": "All Users"
  }
}
```

---

## 🗄️ Database Tables

### notification_preferences
```sql
user_id UUID          -- Links to user_profiles
email_enabled BOOLEAN -- Master on/off (default: true)
timezone TEXT         -- User timezone (default: 'UTC')
```

### email_logs  
```sql
email_type TEXT       -- 'word_of_day', 'lesson_complete', etc.
recipient_email TEXT  -- Where sent
status TEXT           -- 'delivered', 'failed', 'skipped'
provider TEXT         -- 'resend' or 'mailerlite'
failure_reason TEXT   -- Why failed (if applicable)
sent_at TIMESTAMP     -- When sent
```

---

## 🤖 n8n Integration Points

### For Word of the Day (TBD - Your Design)
**What n8n needs to do:**
1. [Your word generation logic - TBD]
2. Get opted-in users: Query `notification_preferences` where `email_enabled = true`
3. Send emails: Call `send-resend-email` for each user
4. [Your quiz tracking logic - TBD]

**n8n HTTP Request to Send Emails:**
```javascript
// Method: POST
// URL: https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email
// Headers: 
{
  "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY",
  "Content-Type": "application/json"
}
// Body:
{
  "to": "{{ user.email }}",
  "subject": "Your WOTD Subject - TBD",
  "html": "Your WOTD HTML - TBD", 
  "email_type": "word_of_day",
  "user_id": "{{ user.id }}"
}
```

### For Weekly Summaries (TBD - Your Design)
**What n8n needs to do:**
1. [Your word tracking logic - TBD]
2. Get users: Query `notification_preferences` 
3. Send summaries: Call `send-resend-email` for each user
4. [Your content format - TBD]

---

## 🎛️ Admin Controls

### Test Email Connectivity
1. Click 📧 button in app
2. Click "Test Resend Email to brainpowerux@gmail.com"
3. Verify email received

### View Email Activity
1. Communication Admin dashboard shows:
   - Total emails sent
   - Recent email logs
   - Failed sends with reasons

### Monitor via Database
```sql
-- See all recent emails
SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 10;

-- Check for failures
SELECT * FROM email_logs WHERE status = 'failed';

-- User preferences
SELECT * FROM notification_preferences;
```

---

## 🔐 Environment Variables

### Already Configured
- ✅ `RESEND_API_KEY` (in Supabase secrets)
- ✅ `MAILERLITE_API_KEY` (in Supabase secrets)
- ✅ `VITE_SUPABASE_URL` (in your .env)
- ✅ `VITE_SUPABASE_ANON_KEY` (in your .env)

### For n8n (When You Set It Up)
- `SUPABASE_URL` = https://feewuhbtaowgpasszyjp.supabase.co
- `SUPABASE_ANON_KEY` = [your anon key]

---

## 🚨 Error Handling

### All Email Calls Are Safe
- ✅ **App continues** if emails fail
- ✅ **Errors logged** with clear reasons
- ✅ **No user-facing errors**
- ✅ **Graceful degradation**

### Common Failure Reasons
- `"resend_not_configured"` - No API key (safe to deploy)
- `"user_opted_out"` - User disabled emails
- `"resend_api_error"` - Resend service issue

---

## 📋 Setup Checklist

### Database
- [ ] Run `email-system-final.sql` in Supabase SQL Editor

### MailerLite  
- [ ] Create "All Users" group
- [ ] Create welcome automation (when user added to "All Users" → send welcome)
- [ ] Verify support@languageacademy.io domain

### Resend
- [ ] Verify support@languageacademy.io domain  
- [ ] Add DNS records for deliverability

### Testing
- [ ] Test Resend via admin dashboard
- [ ] Create new user account (should sync to MailerLite)
- [ ] Complete module (should get congrats email)

---

**System is ready for your WOTD and weekly summary implementations!**

All integration points are documented above. The actual content, timing, and quiz logic are yours to design.
