# WOTD Announcement Email

## Purpose

One-time announcement to existing customers about the new Word of the Day feature and opt-out options.

---

## Template File

**Location:** `wotd-announcement.html` (in this directory)

---

## Email Configuration

**Subject:** 🇫🇷 Introducing: Your Daily French Word

**From:** Language Academy <noreply@languageacademy.io>

**Type:** announcement

---

## Plain Text Version

```
INTRODUCING: YOUR DAILY FRENCH WORD

We're excited to launch a new way to build your French vocabulary—one word at a time.

DAILY WORD OF THE DAY

Each morning, you'll receive a carefully selected French word with a quick quiz to test your knowledge. It's a simple, fun way to expand your vocabulary without any pressure.

HOW IT WORKS:

📧 Daily email - Receive one French word every morning
❓ Quick quiz - Test yourself with four answer choices
📊 Track progress - See your streak and history in the app

OPT-OUT OPTIONS

You're automatically enrolled, but you can opt out anytime if this isn't for you.

Manage your email preferences:
https://languageacademy.io?settings&section=notifications

Unsubscribe from Word of the Day:
https://languageacademy.io?unsubscribe&type=wotd

We hope this helps you on your French learning journey! 🎉

---
Language Academy
https://languageacademy.io

© 2025 Language Academy. All rights reserved.
```

---

## n8n Implementation

### Get All Users

**Type:** Supabase / HTTP Request  
**Query:**

```sql
SELECT id as user_id, email, first_name
FROM user_profiles
WHERE email IS NOT NULL
```

### Send Email Node

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://YOUR_PROJECT_URL/functions/v1/send-resend-email`

**Headers:**

```json
{
  "Authorization": "Bearer {{$env.SUPABASE_ANON_KEY}}",
  "Content-Type": "application/json"
}
```

**Body:**

```json
{
  "to": "{{$json.email}}",
  "subject": "🇫🇷 Introducing: Your Daily French Word",
  "html": "[paste contents of wotd-announcement.html]",
  "email_type": "announcement",
  "user_id": "{{$json.user_id}}",
  "metadata": {
    "campaign": "wotd_launch_announcement",
    "date": "{{$now}}"
  }
}
```

**Note:** Send in batches of 50 to avoid rate limits using Split In Batches node.

---

## Testing

1. Open `wotd-announcement.html` in a browser to preview
2. Send test email to yourself before bulk sending
3. Verify all links work correctly
4. Check mobile rendering

