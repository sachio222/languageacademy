# Simple Email System - Final Architecture

## The Solution: Two Tools for Two Jobs

### Resend (Auto Transactional Emails)
**For:** Welcome, review reminders, module nudges  
**Why:** Dead simple API, event-driven, $0 for 3k emails/month  
**How:** One Edge Function, called from your app when events happen

### MailerLite (Manual Campaigns + n8n)
**For:** "Hello" to segments (active/dormant), Word of the Day  
**Why:** You already have it, great for bulk, segment management  
**How:** You use dashboard to send campaigns, n8n for scheduled stuff

---

## What We Kept (Minimal)

### Database (2 Tables)
1. **notification_preferences** - User opt-in/out settings
2. **email_logs** - Track all sent emails

### Edge Functions (2)
1. **send-resend-email** - Sends via Resend (auto emails)
2. **sync-to-mailerlite** - Syncs users to MailerLite (for your campaigns)

### Frontend (Simplified)
1. **NotificationSettings.jsx** - User preferences modal
2. **Simple email logs view** in admin

---

## Setup Steps

### 1. Get Resend API Key
- Sign up at resend.com (free)
- Generate API key
- Add to Supabase: `supabase secrets set RESEND_API_KEY=re_xxx`

### 2. Verify Domain
- Add support@languageacademy.io in Resend dashboard
- Add DNS records they provide

### 3. Run Simple SQL
```bash
# In Supabase SQL Editor:
email-system-simple.sql
```

### 4. Deploy Edge Functions
```bash
supabase functions deploy send-resend-email
supabase functions deploy sync-to-mailerlite
```

### 5. Update 2 Hooks
- useAuth.js - Call send-resend-email on signup
- useSupabaseProgress.js - Call send-resend-email on events

---

## How It Works

### Auto Emails (Resend)
```
User signs up
  ↓
useAuth calls send-resend-email
  ↓
Resend sends welcome email
  ↓
Logged in email_logs
```

### Manual Campaigns (MailerLite)
```
You want to email "dormant" users
  ↓
Go to MailerLite dashboard
  ↓
Select "dormant" segment
  ↓
Send campaign
```

### Word of the Day (n8n + MailerLite)
```
n8n scheduled trigger (5am)
  ↓
Generate word/quiz
  ↓
Send via MailerLite to opted-in users
```

---

## Code You'll Write

### Welcome Email (in useAuth.js)
```javascript
await supabaseClient.functions.invoke('send-resend-email', {
  body: {
    to: user.email,
    subject: 'Welcome!',
    html: emailTemplates.welcome(user.name),
    email_type: 'welcome',
    user_id: user.id
  }
});
```

**That's it. One function call.**

---

## What We Deleted

❌ email_queue table  
❌ email_templates table  
❌ Complex CommunicationAdmin  
❌ test-email function  
❌ All the bloat

---

## Total Complexity

**Database:** 2 tables  
**Edge Functions:** 2 functions  
**Frontend:** 1 preference modal + simple logs view  
**External:** Resend (auto) + MailerLite (manual)  

**Clean. Simple. Maintainable.**

