# n8n: Send WOTD Email

## Workflow: After Creating/Validating WOTD

```
┌─────────────────┐
│ Get WOTD Data   │  (you're here)
└────────┬────────┘
         │
┌────────▼────────┐
│ Shuffle Options │  Randomize quiz answers
└────────┬────────┘
         │
┌────────▼────────┐
│ Get Opt-In Users│  Query notification_preferences
└────────┬────────┘
         │
┌────────▼────────┐
│ Send Email Loop │  Call send-resend-email for each user
└─────────────────┘
```

---

## Node 1: Shuffle Quiz Options (Code)

**Type:** Code  
**Run Once for All Items:** Yes

**JavaScript:**

```javascript
// Get word data from previous node
const word = $json.data || $json;

// Create array of all 4 options
const allOptions = [word.correct_answer, ...word.wrong_options];

// Shuffle using Fisher-Yates algorithm
for (let i = allOptions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
}

// Assign to A, B, C, D
const optionA = allOptions[0];
const optionB = allOptions[1];
const optionC = allOptions[2];
const optionD = allOptions[3];

// Return everything for email
return {
  json: {
    word_id: word.word_id,
    word: word.word,
    phonetic: word.phonetic,
    part_of_speech: word.part_of_speech,
    difficulty_label: word.difficulty_label,
    date: word.date,
    optionA: optionA,
    optionB: optionB,
    optionC: optionC,
    optionD: optionD,
    social_hook: word.social_hook || `Today's French word: ${word.word}`,
  },
};
```

---

## Node 2: Get Opted-In Users

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://YOUR_PROJECT_URL/rest/v1/rpc/get_wotd_recipients`

**Headers:**

```json
{
  "Authorization": "Bearer {{$env.SUPABASE_ANON_KEY}}",
  "Content-Type": "application/json",
  "apikey": "{{$env.SUPABASE_ANON_KEY}}"
}
```

**Body:**

```json
{}
```

**Note:** You'll need to create this function. See below for SQL.

---

## Node 3: Loop Over Users

**Type:** Split In Batches  
**Batch Size:** 50 (to avoid rate limits)

---

## Node 4: Send Email

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

```javascript
{
  "to": "{{ $json.email }}",
  "subject": "🇫🇷 Your French Word: {{ $('Shuffle Quiz Options').first().json.word }}",
  "html": "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Word of the Day</title></head><body style=\"margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color: #ffffff;\"><tr><td align=\"center\" style=\"padding: 48px 24px;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"max-width: 600px;\"><tr><td style=\"padding: 0 0 40px 0; text-align: center;\"><div style=\"font-size: 13px; font-weight: 500; letter-spacing: 0.5px; color: #999999; text-transform: uppercase; margin-bottom: 16px;\">Word of the Day</div><div style=\"font-size: 14px; color: #665665;\">🇫🇷</div></td></tr><tr><td style=\"padding: 0 0 48px 0; text-align: center; border-bottom: 1px solid #f0f0f0;\"><h1 style=\"margin: 0 0 12px 0; font-size: 42px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a;\">{{ $('Shuffle Quiz Options').first().json.word }}</h1><div style=\"font-size: 16px; color: #999999; margin-bottom: 8px;\">/{{ $('Shuffle Quiz Options').first().json.phonetic }}/</div><div style=\"display: inline-block; padding: 4px 12px; background: #fafbfc; border-radius: 12px; font-size: 13px; color: #665665; margin-top: 8px;\">{{ $('Shuffle Quiz Options').first().json.part_of_speech }}</div></td></tr><tr><td style=\"padding: 48px 0 32px 0; text-align: center;\"><h2 style=\"margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a;\">What does this mean?</h2></td></tr><tr><td style=\"padding: 0 0 24px 0;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=A&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionA }}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=B&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionB }}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=C&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionC }}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=D&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionD }}</a></td></tr></table></td></tr><tr><td style=\"padding: 0 0 48px 0; text-align: center;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=X&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: inline-block; padding: 0; background: none; border: none; text-decoration: underline; color: #999999; font-size: 15px;\">I don't know</a></td></tr><tr><td style=\"padding: 48px 0 0 0; border-top: 1px solid #f0f0f0; text-align: center;\"><div style=\"padding: 24px 0 16px 0;\"><img src=\"https://languageacademy.io/img/TLA_CoreMark_Blue_tm_v1.1.1.svg\" alt=\"Language Academy\" style=\"height: 32px; width: auto; margin-bottom: 12px;\" /><div style=\"font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; margin-bottom: 4px;\">Language Academy</div><div style=\"font-size: 13px; color: #999999;\">Learn French, one word at a time</div></div><div style=\"padding: 16px 0;\"><a href=\"https://languageacademy.io\" style=\"color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 12px;\">Visit App</a><span style=\"color: #e0e0e0;\">|</span><a href=\"https://languageacademy.io/settings?section=notifications\" style=\"color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;\">Preferences</a><span style=\"color: #e0e0e0;\">|</span><a href=\"https://languageacademy.io/unsubscribe?type=wotd\" style=\"color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;\">Unsubscribe</a></div><div style=\"padding: 16px 0 0 0; font-size: 12px; color: #cccccc;\">© 2025 Language Academy. All rights reserved.</div></td></tr></table></td></tr></table></body></html>",
  "email_type": "word_of_day",
  "user_id": "{{ $json.user_id }}",
  "metadata": {
    "word": "{{ $('Shuffle Quiz Options').first().json.word }}",
    "word_id": "{{ $('Shuffle Quiz Options').first().json.word_id }}",
    "date": "{{ $('Shuffle Quiz Options').first().json.date }}",
    "source": "n8n_daily_wotd"
  }
}
```

---

## Required: Create get_wotd_recipients Function

Run this in Supabase SQL Editor:

```sql
-- Get users opted in to WOTD emails
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
    up.timezone
  FROM user_profiles up
  LEFT JOIN notification_preferences np ON up.id = np.user_id
  WHERE up.email IS NOT NULL
    AND (np.email_enabled IS NULL OR np.email_enabled = true)
    AND (np.word_of_day IS NULL OR np.word_of_day = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Simplified Alternative: Direct Query

Instead of Node 2 (Get Opted-In Users), use **Supabase node** in n8n:

**Type:** Supabase  
**Resource:** Select Rows  
**Table:** `user_profiles`  
**Return All:** Yes  
**Filters:**

- `email` is not null

Then filter in code node:

```javascript
// Filter for opted-in users
const users = $input.all();
return users.filter((user) => {
  // Add your opt-in logic here
  return user.json.email; // Simple: has email
});
```

---

## Complete Workflow Example

### **Schedule Trigger** (Daily at 5am)

```
Cron: 0 5 * * *
Timezone: America/New_York
```

### **Get Today's WOTD**

```
GET /functions/v1/get-wotd
Headers: Authorization: Bearer {{$env.SUPABASE_ANON_KEY}}
```

### **Shuffle Options** (Code)

```javascript
// Shuffle code from above
```

### **Get Recipients**

```
POST /rest/v1/rpc/get_wotd_recipients
Headers: Authorization: Bearer {{$env.SUPABASE_ANON_KEY}}
```

### **Loop Each User**

```
Split in Batches: 50
```

### **Send Email**

```
POST /functions/v1/send-resend-email
Body: {
  to: "{{$json.email}}",
  subject: "🇫🇷 Your French Word: {{$node['Shuffle Quiz Options'].json.word}}",
  html: "...full HTML from above...",
  email_type: "word_of_day",
  user_id: "{{$json.user_id}}"
}
```

---

## Testing in n8n

### Test with Single User:

1. Skip "Get Recipients" node
2. Add **Set** node with test data:

```json
{
  "email": "brainpowerux@gmail.com",
  "user_id": "test-user-id",
  "first_name": "Test"
}
```

3. Execute "Send Email" node

### Expected Result:

Email arrives at brainpowerux@gmail.com with:

- Word displayed large
- 4 shuffled quiz options
- Links back to app with tracking
- Logo in footer

---

## 🎯 Quick Copy-Paste n8n Config

**Shuffle Options Node:**

```javascript
const word = $json.data || $json;
const allOptions = [word.correct_answer, ...word.wrong_options];
for (let i = allOptions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
}
return {
  json: {
    word_id: word.word_id,
    word: word.word,
    phonetic: word.phonetic,
    part_of_speech: word.part_of_speech,
    difficulty_label: word.difficulty_label,
    date: word.date,
    optionA: allOptions[0],
    optionB: allOptions[1],
    optionC: allOptions[2],
    optionD: allOptions[3],
  },
};
```

**Send Email URL:**

```
https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email
```

**Headers:**

```
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json
```

Done! Your email will look exactly like the test you sent earlier.
