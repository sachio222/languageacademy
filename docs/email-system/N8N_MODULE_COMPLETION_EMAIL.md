# n8n: Send Module Completion Email

## Workflow: Trigger After Module Exam Success

```
┌─────────────────┐
│ Webhook Trigger │  When user passes module exam
└────────┬────────┘
         │
┌────────▼────────┐
│ Get User Data   │  Fetch progress stats
└────────┬────────┘
         │
┌────────▼────────┐
│ Calculate Stats │  Compute building blocks metrics
└────────┬────────┘
         │
┌────────▼────────┐
│ Get Module Info │  Fetch module details & next module
└────────┬────────┘
         │
┌────────▼────────┐
│ Get Review Items│  Select 3 key items for quick review
└────────┬────────┘
         │
┌────────▼────────┐
│ Send Email      │  Call send-resend-email
└─────────────────┘
```

---

## Trigger Options

### Option 1: Webhook from App (Recommended)

**In your app code (after exam success):**

```javascript
// After user passes module exam
if (examScore >= 80) {
  await fetch('https://YOUR_N8N_WEBHOOK_URL/module-completion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: user.id,
      module_id: moduleId,
      score: examScore,
      timestamp: new Date().toISOString()
    })
  });
}
```

### Option 2: Database Trigger (Poll every 5 minutes)

Monitor `user_progress` table for new completions.

---

## Node 1: Get User Progress Data

**Type:** Supabase (HTTP Request)  
**Method:** POST  
**URL:** `https://YOUR_PROJECT_URL/rest/v1/rpc/get_user_module_stats`

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
{
  "p_user_id": "{{$json.user_id}}"
}
```

**Required SQL Function:**

```sql
CREATE OR REPLACE FUNCTION get_user_module_stats(p_user_id UUID)
RETURNS TABLE (
  patterns_mastered INT,
  top_100_coverage INT,
  possible_combinations INT,
  current_module INT,
  current_unit INT,
  email TEXT,
  first_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT up.module_id)::INT as patterns_mastered,
    -- Calculate top 100 coverage based on modules completed
    (COUNT(DISTINCT up.module_id) * 2)::INT as top_100_coverage,
    -- Estimate combinations (exponential growth)
    POWER(COUNT(DISTINCT up.module_id), 2)::INT as possible_combinations,
    MAX(up.module_id)::INT as current_module,
    MAX(up.unit_id)::INT as current_unit,
    u.email,
    u.first_name
  FROM user_progress up
  JOIN user_profiles u ON u.id = up.user_id
  WHERE up.user_id = p_user_id
    AND up.completed = true
  GROUP BY u.email, u.first_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Node 2: Get Module Details

**Type:** Supabase  
**Resource:** Select Rows  
**Table:** `modules` (or your module metadata table)

**Filter:**

```
id = {{$json.module_id}}
```

**Returns:**

- `module_name`
- `module_number`
- `unit_number`
- `capabilities` (JSONB array)
- `next_module_id`
- `next_module_name`
- `next_module_capability`

---

## Node 3: Prepare Review Questions (Code)

**Type:** Code  
**Run Once for All Items:** Yes

**JavaScript:**

```javascript
// Get module exercises for review
const moduleId = $('Webhook').item.json.module_id;
const userId = $('Webhook').item.json.user_id;
const userStats = $('Get User Progress Data').item.json;
const moduleInfo = $('Get Module Details').item.json;

// Parse capabilities from module
const capabilities = Array.isArray(moduleInfo.capabilities) 
  ? moduleInfo.capabilities 
  : JSON.parse(moduleInfo.capabilities || '[]');

// Get 3 capabilities or default messages
const capability1 = capabilities[0] || "Use this vocabulary in conversation";
const capability2 = capabilities[1] || "Understand when natives use these words";
const capability3 = capabilities[2] || "Compose sentences with this pattern";

// Prepare review questions (you'll fetch these from exercises or create them)
const reviewQuestions = [
  `How do you say "${moduleInfo.key_phrase_1}"?`,
  `What does "${moduleInfo.key_word_1}" mean?`,
  `Translate: "${moduleInfo.key_sentence_1}"`
];

return {
  json: {
    user_id: userId,
    email: userStats.email,
    first_name: userStats.first_name,
    module_id: moduleId,
    module_name: moduleInfo.module_name,
    module_number: moduleInfo.module_number,
    unit_number: moduleInfo.unit_number,
    capability_1: capability1,
    capability_2: capability2,
    capability_3: capability3,
    patterns_mastered: userStats.patterns_mastered,
    top_100_coverage: userStats.top_100_coverage,
    possible_combinations: userStats.possible_combinations,
    review_question_1: reviewQuestions[0],
    review_question_2: reviewQuestions[1],
    review_question_3: reviewQuestions[2],
    next_module_id: moduleInfo.next_module_id,
    next_module_name: moduleInfo.next_module_name,
    next_module_capability: moduleInfo.next_module_capability
  }
};
```

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

**Body Template:**

See `templates/module-completion.html` for full HTML.

**Body (n8n):**

```javascript
{
  "to": "{{ $json.email }}",
  "subject": "🇫🇷 You completed {{$json.module_name}}!",
  "html": "<!-- Paste the module-completion.html template here, replacing {{variables}} -->",
  "email_type": "module_completion",
  "user_id": "{{ $json.user_id }}",
  "metadata": {
    "module_id": "{{ $json.module_id }}",
    "module_name": "{{ $json.module_name }}",
    "timestamp": "{{ new Date().toISOString() }}",
    "source": "n8n_module_completion"
  }
}
```

---

## Testing

### Test Payload (Set Node):

```json
{
  "user_id": "YOUR_TEST_USER_ID",
  "module_id": 2,
  "score": 90,
  "timestamp": "2025-11-17T12:00:00Z"
}
```

### Expected Result:

Email with:
- Module name and number
- 3 capabilities unlocked
- Progress stats (patterns, coverage, combinations)
- 3 quick review questions
- Next module preview
- CTA to continue learning

---

## Notification Preference Check

Add this filter node before sending:

**Type:** Filter (IF node)  
**Condition:**

```
{{$json.email_enabled}} = true
AND {{$json.progress_emails}} = true
```

---

## Complete Workflow Summary

1. **Webhook/Trigger** → Receives module completion event
2. **Get User Stats** → Calculates progress metrics
3. **Get Module Info** → Fetches module details & next module
4. **Prepare Email Data** → Formats all variables
5. **Check Preferences** → Only if opted in
6. **Send Email** → Beautiful module completion email
7. **Log Success** → Record in email_logs table

---

## Tips

- **Timing**: Send immediately after completion (dopamine hit!)
- **Personalization**: Use first name, actual stats
- **Mobile**: Template is fully responsive
- **Testing**: Use `?preview=module_completion` to see email in app

Done! This celebrates the win and keeps them engaged.

