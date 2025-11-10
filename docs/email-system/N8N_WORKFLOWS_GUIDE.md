# n8n Workflows - Integration Points Only

## 🎯 What n8n Does in Your System

**n8n handles scheduled, complex workflows:**

- Word of the Day (daily, with LLM generation)
- Weekly vocabulary summaries (personalized per user)
- Any other scheduled email campaigns

**n8n calls your existing APIs - no new infrastructure needed.**

---

## 🔧 Integration Points

### Send Emails via Resend

**n8n calls your Edge Function:**

**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email`

**HTTP Request Node:**

- Method: POST
- Headers: `Authorization: Bearer YOUR_SUPABASE_ANON_KEY`
- Body:

```json
{
  "to": "user@email.com",
  "subject": "Your Subject",
  "html": "<h1>Your HTML</h1>",
  "email_type": "word_of_day",
  "user_id": "user-uuid",
  "metadata": {}
}
```

### Get Opted-In Users

**n8n queries your database:**

**Supabase Node:**

- Table: `notification_preferences`
- Join: `user_profiles`
- Query:

```sql
SELECT up.id, up.email, up.preferred_name, up.first_name
FROM user_profiles up
JOIN notification_preferences np ON up.id = np.user_id
WHERE np.email_enabled = true
  AND np.timezone = 'America/New_York'  -- Filter by timezone
```

### Save Generated Content

**n8n saves to your database:**

**Supabase Node (Insert):**

- Table: `word_of_the_day` (when you add it)
- Data: Whatever structure you decide

---

## 📅 Timezone Handling

### For 5am Local Time Delivery

**Schedule every hour, filter by timezone:**

```javascript
// n8n Code Node
const currentHour = new Date().getUTCHours();

const timezoneMap = {
  5: ["UTC"],
  9: ["America/New_York"], // 9 UTC = 5am EST
  10: ["America/Chicago"], // 10 UTC = 5am CST
  12: ["America/Los_Angeles"], // 12 UTC = 5am PST
  // Add more as needed
};

const targetTimezones = timezoneMap[currentHour] || [];

return {
  json: {
    timezones: targetTimezones,
    shouldProcess: targetTimezones.length > 0,
  },
};
```

---

## 🎨 Email Templates

### Word of the Day (TBD - Your Design)

**What n8n needs to generate:**

- Subject line
- HTML content with quiz format
- Links back to your WOTD page

**Template location:** You decide (n8n code, database, external file)

### Weekly Summary (TBD - Your Design)

**What n8n needs to generate:**

- User's learned words from past week
- Progress stats
- Personalized content

---

## 🔄 Workflow Examples (Skeleton Only)

### Daily Word of the Day

```
[Schedule: Every Hour]
  ↓
[Code: Filter Timezones]
  ↓
[IF: Should Process?]
  ↓
[Your Word Generation Logic - TBD]
  ↓
[Supabase: Get Opted-In Users]
  ↓
[Loop: For Each User]
  ↓
[Code: Build Email HTML - TBD]
  ↓
[HTTP: Call send-resend-email]
  ↓
[End]
```

### Weekly Summary

```
[Schedule: Monday 9am]
  ↓
[Supabase: Get All Users]
  ↓
[Loop: For Each User]
  ↓
[Supabase: Get User's Words This Week]
  ↓
[Code: Format Summary - TBD]
  ↓
[HTTP: Call send-resend-email]
  ↓
[End]
```

---

## 🧪 Testing n8n Workflows

### Start Small

1. **Manual execution** - Run workflow manually first
2. **Single user** - Filter for your email only
3. **Test data** - Use dummy content before real generation
4. **Check logs** - Monitor email_logs table

### Debugging

- Check n8n execution logs
- Check Supabase Edge Function logs
- Check email_logs table for results
- Verify user preferences

---

## 📋 n8n Setup Requirements

### Credentials Needed

- **Supabase URL:** `https://feewuhbtaowgpasszyjp.supabase.co`
- **Supabase Anon Key:** [from your .env]
- **LLM API Key:** [for word generation - your choice]

### Nodes You'll Use

- Schedule Trigger (timing)
- Supabase (database queries)
- HTTP Request (call your APIs)
- Code (data transformation)
- IF (conditional logic)
- Loop Over Items (process users)

---

## ⚠️ Important Notes

### What's NOT Covered Here

- **Word generation logic** - Your design decision
- **Quiz format** - Your UX decision
- **WOTD page implementation** - Your frontend work
- **Content strategy** - Your editorial decisions

### What IS Covered

- **How to call your APIs** from n8n
- **How to query your database** from n8n
- **How to handle timezones** in scheduling
- **How to loop through users** for bulk sending

---

**This guide covers the integration mechanics only. The creative and content decisions are yours to make.**
