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
│ Filter Users    │  (Optional) For testing - skip first N or filter by range
│ (Code Node)     │  Toggle on/off or modify filter logic
└────────┬────────┘
         │
┌────────▼────────┐
│ Split In Batches│  Process 50 at a time
└────────┬────────┘
         │
┌────────▼────────┐
│ Send Email      │  ⚠️ Enable "Continue on Fail"
│ (HTTP Request)  │     Loop continues even if one fails
└────────┬────────┘
         │
┌────────▼────────┐
│ Handle Errors   │  Format data & determine status
│ (Code Node)     │  (Optional but recommended)
└────────┬────────┘
         │
┌────────▼────────┐
│ Log to Database │  Insert into email_logs table
│ (HTTP Request)  │  ⚠️ Enable "Continue on Fail"
└─────────────────┘
```

**Key Point:** With "Continue on Fail" enabled, if email #5 fails, the workflow will still process emails #6, #7, #8, etc.

---

## Node 1: Shuffle Quiz Options (Code)

**Type:** Code  
**Run Once for All Items:** Yes

**JavaScript:**

```javascript
// Get word data from previous node
const word = $json.data || $json;

// Parse wrong_options if it's a string (JSONB from Supabase)
const wrongOptions =
  typeof word.wrong_options === "string"
    ? JSON.parse(word.wrong_options)
    : word.wrong_options;

// Create array of all 4 options
const allOptions = [word.correct_answer, ...wrongOptions];

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

// Find which letter is the correct answer
const correctLetter = allOptions.indexOf(word.correct_answer);
const correctKey = ["A", "B", "C", "D"][correctLetter];

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
    correctKey: correctKey, // Which letter is correct
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

## Node 3: Filter Users (Optional - For Testing)

**Type:** Code  
**Run Once for All Items:** Yes

**Purpose:** Filter users for testing (skip first N, specific range, or specific users)

**⚠️ To disable filtering:** Either delete this node OR set `ENABLE_FILTER = false` in the code below.

**JavaScript (Skip first N users - e.g., skip first 11):**

```javascript
// Configuration - Easy to modify for testing
const ENABLE_FILTER = true; // Set to false to disable filtering
const SKIP_FIRST_N = 11; // Skip first 11 users (process users 12+)

// Get all users from previous node
const allUsers = $input.all();

if (!ENABLE_FILTER) {
  // No filtering - return all users
  console.log(`No filter: Processing all ${allUsers.length} users`);
  return allUsers.map((user) => ({ json: user.json }));
}

// Filter: Skip first N users
const filteredUsers = allUsers.slice(SKIP_FIRST_N);

console.log(
  `Filtered: Processing ${filteredUsers.length} users (skipped first ${SKIP_FIRST_N} of ${allUsers.length})`
);

// Return filtered users
return filteredUsers.map((user) => ({ json: user.json }));
```

**JavaScript (Process range AND/OR specific user IDs - combined):**

```javascript
// Configuration - Easy to modify for testing
const ENABLE_FILTER = true;

// Option 1: Process specific range (set to null to disable)
const START_INDEX = 11; // Start at index 11 (12th user, 0-indexed)
const END_INDEX = 20; // End at index 20 (21st user)
// Set both to null to disable range filtering

// Option 2: Filter by specific user IDs (set to [] to disable)
const TEST_USER_IDS = [
  "uuid-1-here",
  "uuid-2-here",
  "uuid-3-here",
  // Add more test user IDs as needed
  // Set to [] to disable ID filtering
];

// Get all users from previous node
const allUsers = $input.all();

if (!ENABLE_FILTER) {
  console.log(`No filter: Processing all ${allUsers.length} users`);
  return allUsers.map((user) => ({ json: user.json }));
}

let filteredUsers = allUsers;

// Apply range filter if configured
if (START_INDEX !== null && END_INDEX !== null) {
  filteredUsers = filteredUsers.slice(START_INDEX, END_INDEX + 1);
  console.log(
    `Range filter: Processing users ${START_INDEX + 1}-${END_INDEX + 1} (${
      filteredUsers.length
    } users)`
  );
}

// Apply user ID filter if configured (filters from already filtered list)
if (TEST_USER_IDS && TEST_USER_IDS.length > 0) {
  const beforeIdFilter = filteredUsers.length;
  filteredUsers = filteredUsers.filter((user) =>
    TEST_USER_IDS.includes(user.json.user_id)
  );
  console.log(
    `ID filter: Processing ${filteredUsers.length} test users (of ${TEST_USER_IDS.length} specified, from ${beforeIdFilter} users)`
  );
}

// If both filters are active, show combined result
if (
  START_INDEX !== null &&
  END_INDEX !== null &&
  TEST_USER_IDS &&
  TEST_USER_IDS.length > 0
) {
  console.log(
    `Combined filter: Processing ${filteredUsers.length} users (range ${
      START_INDEX + 1
    }-${END_INDEX + 1} AND matching ${TEST_USER_IDS.length} IDs)`
  );
}

return filteredUsers.map((user) => ({ json: user.json }));
```

**Usage Examples:**

1. **Range only (users 12-20):**

   ```javascript
   const START_INDEX = 11;
   const END_INDEX = 20;
   const TEST_USER_IDS = []; // Empty array = disabled
   ```

2. **Specific IDs only:**

   ```javascript
   const START_INDEX = null; // Disabled
   const END_INDEX = null; // Disabled
   const TEST_USER_IDS = ["uuid-1", "uuid-2", "uuid-3"];
   ```

3. **Both (range AND IDs - users 12-20 that also match the IDs):**

   ```javascript
   const START_INDEX = 11;
   const END_INDEX = 20;
   const TEST_USER_IDS = ["uuid-1", "uuid-2"];
   ```

4. **Disable all filtering:**
   ```javascript
   const ENABLE_FILTER = false;
   ```

**JavaScript (Filter by email domain - for testing):**

```javascript
// Configuration - Easy to modify for testing
const ENABLE_FILTER = true;
const TEST_EMAIL_DOMAIN = "@your-test-domain.com"; // Change to your test domain

// Get all users from previous node
const allUsers = $input.all();

if (!ENABLE_FILTER) {
  console.log(`No filter: Processing all ${allUsers.length} users`);
  return allUsers.map((user) => ({ json: user.json }));
}

// Filter: Only users with specific email domain
const filteredUsers = allUsers.filter(
  (user) => user.json.email && user.json.email.includes(TEST_EMAIL_DOMAIN)
);

console.log(
  `Filtered: Processing ${filteredUsers.length} users with domain ${TEST_EMAIL_DOMAIN}`
);

return filteredUsers.map((user) => ({ json: user.json }));
```

**JavaScript (Process only first N users - quick test):**

```javascript
// Configuration - Easy to modify for testing
const ENABLE_FILTER = true;
const PROCESS_FIRST_N = 3; // Only process first 3 users

// Get all users from previous node
const allUsers = $input.all();

if (!ENABLE_FILTER) {
  console.log(`No filter: Processing all ${allUsers.length} users`);
  return allUsers.map((user) => ({ json: user.json }));
}

// Filter: Only first N users
const filteredUsers = allUsers.slice(0, PROCESS_FIRST_N);

console.log(
  `Filtered: Processing only first ${PROCESS_FIRST_N} users (of ${allUsers.length} total)`
);

return filteredUsers.map((user) => ({ json: user.json }));
```

**Quick Toggle Options:**

1. **Disable filtering:** Set `ENABLE_FILTER = false` at the top
2. **Skip first 11:** Use the first example with `SKIP_FIRST_N = 11`
3. **Process range AND/OR specific IDs:** Use the combined example above - supports both range and ID filtering
4. **Range only (users 12-20):** Set `START_INDEX = 11`, `END_INDEX = 20`, `TEST_USER_IDS = []`
5. **Specific IDs only:** Set `START_INDEX = null`, `END_INDEX = null`, add UUIDs to `TEST_USER_IDS`
6. **Both filters (range AND IDs):** Set both range and `TEST_USER_IDS` - processes users in range that also match IDs
7. **Email domain:** Use the email domain example
8. **Quick test (first 3):** Use the last example with `PROCESS_FIRST_N = 3`

**Note:** For production, either delete this node or set `ENABLE_FILTER = false`.

---

## Node 4: Loop Over Users

**Type:** Split In Batches  
**Batch Size:** 50 (to avoid rate limits)

---

## Node 4: Send Email

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://YOUR_PROJECT_URL/functions/v1/send-resend-email`

**⚠️ IMPORTANT: Error Handling Settings**

**CRITICAL:** You MUST set this for the workflow to continue on errors!

In the node settings, under **"On Error"** dropdown, select:

- **"Continue"** ✅ - Pass error message as item in regular output (REQUIRED)
  - This allows the loop to continue even if one email fails
  - The error response will be passed to the next node as regular output
  - Your Handle Errors node can then check `success: false` and format accordingly
  - **The function now returns HTTP 200 even on failures** (with `success: false`), so n8n won't stop

**Alternative Options:**

- **"Continue (using error output)"** - Creates a separate error output port
  - Use this if you want to route errors differently
  - Not recommended for this workflow since Handle Errors handles both success and failure
- **"Stop Workflow"** ❌ - Don't use this! It will stop the entire loop if one email fails

**Note:** The function has been updated to return HTTP 200 even when Resend API fails (with `success: false` in the JSON). This ensures n8n continues processing even if "Continue" isn't set, but you should still set it for best results.

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
  "html": "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Word of the Day</title></head><body style=\"margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color: #ffffff;\"><tr><td align=\"center\" style=\"padding: 48px 24px;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"max-width: 600px;\"><tr><td style=\"padding: 0 0 40px 0; text-align: center;\"><div style=\"font-size: 13px; font-weight: 500; letter-spacing: 0.5px; color: #999999; text-transform: uppercase; margin-bottom: 16px;\">Word of the Day</div><div style=\"font-size: 14px; color: #665665;\">🇫🇷</div></td></tr><tr><td style=\"padding: 0 0 48px 0; text-align: center; border-bottom: 1px solid #f0f0f0;\"><h1 style=\"margin: 0 0 12px 0; font-size: 42px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a;\">{{ $('Shuffle Quiz Options').first().json.word }}</h1><div style=\"font-size: 16px; color: #999999; margin-bottom: 8px;\">/{{ $('Shuffle Quiz Options').first().json.phonetic }}/</div><div style=\"display: inline-block; padding: 4px 12px; background: #fafbfc; border-radius: 12px; font-size: 13px; color: #665665; margin-top: 8px;\">{{ $('Shuffle Quiz Options').first().json.part_of_speech }}</div></td></tr><tr><td style=\"padding: 48px 0 32px 0; text-align: center;\"><h2 style=\"margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a;\">What does this mean?</h2></td></tr><tr><td style=\"padding: 0 0 24px 0;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=A&correct={{ $('Shuffle Quiz Options').first().json.correctKey }}&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionA }}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=B&correct={{ $('Shuffle Quiz Options').first().json.correctKey }}&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionB }}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=C&correct={{ $('Shuffle Quiz Options').first().json.correctKey }}&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionC }}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=D&correct={{ $('Shuffle Quiz Options').first().json.correctKey }}&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 16px; font-weight: 500; text-align: center;\">{{ $('Shuffle Quiz Options').first().json.optionD }}</a></td></tr></table></td></tr><tr><td style=\"padding: 0 0 48px 0; text-align: center;\"><a href=\"https://languageacademy.io?wotd=true&word={{ $('Shuffle Quiz Options').first().json.word_id }}&answer=X&correct={{ $('Shuffle Quiz Options').first().json.correctKey }}&date={{ $('Shuffle Quiz Options').first().json.date }}\" style=\"display: inline-block; padding: 0; background: none; border: none; text-decoration: underline; color: #999999; font-size: 15px;\">I don't know</a></td></tr><tr><td style=\"padding: 48px 0 0 0; border-top: 1px solid #f0f0f0; text-align: center;\"><div style=\"padding: 24px 0 16px 0;\"><img src=\"https://languageacademy.io/img/TLA_CoreMark_Blue_tm_v1.1.1.png\" height=\"38\" width=\"auto\" alt=\"Language Academy\" style=\"height: 38px; width: auto; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto;\" /><div style=\"font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; margin-bottom: 4px;\">Language Academy</div><div style=\"font-size: 13px; color: #999999;\">Learn French, one word at a time</div></div><div style=\"padding: 16px 0;\"><a href=\"https://languageacademy.io\" style=\"color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 12px;\">Visit App</a><span style=\"color: #e0e0e0;\">|</span><a href=\"https://languageacademy.io?settings&section=notifications\" style=\"color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;\">Preferences</a><span style=\"color: #e0e0e0;\">|</span><a href=\"https://languageacademy.io?unsubscribe&type=wotd\" style=\"color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;\">Unsubscribe</a></div><div style=\"padding: 16px 0 0 0; font-size: 12px; color: #cccccc;\">Language Academy<br>11766 Casa Lago Ln, Westchase, FL 33626<br>© 2025 Language Academy. All rights reserved.</div></td></tr></table></td></tr></table></body></html>",
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

## Node 5: Handle Errors (Optional but Recommended)

**Type:** Code  
**Run Once for All Items:** No (runs for each item)

**Purpose:** Format data and determine status for logging

**⚠️ IMPORTANT:** This node runs inside the loop, so accessing data from nodes before Split In Batches requires special handling.

**JavaScript (Simplified - Recommended):**

```javascript
// Get Send Email result (current item)
const sendEmailResult = $input.item.json;

// Get user data - The user item flows through the loop
// Since Send Email outputs API response, we need to get user data from before Send Email
// BEST APPROACH: Access from the item that was input to Send Email
// In n8n loops, we can reference the node that feeds into Send Email
let userData;

// Method 1: Try to get from Split In Batches (the node before Send Email in the loop)
try {
  // Access all items from Split In Batches and get current one
  // n8n preserves item order in loops, so we can match by position
  const batchItems = $("Split In Batches").all();
  const currentItem = $input.item;

  // Find matching item by checking email or user_id if available in Send Email result
  if (batchItems && batchItems.length > 0) {
    // Try to match by email from Send Email request metadata
    const targetEmail =
      sendEmailResult.metadata?.word?.email ||
      sendEmailResult.to ||
      sendEmailResult.recipient_email;

    if (targetEmail) {
      userData = batchItems.find(
        (item) => item.json.email === targetEmail
      )?.json;
    }

    // If not found by email, try by index (less reliable but works if order is preserved)
    if (!userData) {
      // Get index from current item context
      const itemIndex = currentItem.index !== undefined ? currentItem.index : 0;
      if (batchItems[itemIndex]) {
        userData = batchItems[itemIndex].json;
      }
    }
  }
} catch (e) {
  console.log("Method 1 failed:", e.message);
}

// Method 2: Fallback - Extract from Send Email metadata/response
if (!userData || (!userData.email && !userData.user_id)) {
  userData = {
    email:
      sendEmailResult.metadata?.word?.email ||
      sendEmailResult.to ||
      sendEmailResult.recipient_email ||
      sendEmailResult.email ||
      "unknown@email.com",
    user_id:
      sendEmailResult.metadata?.user_id || sendEmailResult.user_id || null,
  };
  console.log("Using fallback user data from Send Email result");
}

// Get word data from Shuffle Quiz Options (before the loop)
// Use .first() since there's only one word data item
// NOTE: This works because Shuffle Quiz Options is BEFORE Split In Batches
let wordData;
try {
  wordData = $("Shuffle Quiz Options").first().json;
} catch (e) {
  console.log("Could not get word data from Shuffle Quiz Options:", e.message);
  // Fallback: get from Send Email metadata (it was included in the request)
  wordData = sendEmailResult.metadata || {
    word: sendEmailResult.metadata?.word || "unknown",
    word_id: sendEmailResult.metadata?.word_id || null,
    date:
      sendEmailResult.metadata?.date || new Date().toISOString().split("T")[0],
  };
}

// Determine status based on send result
let status = "failed";
let failureReason = null;

if (sendEmailResult.success === true) {
  status = "delivered";
} else if (sendEmailResult.reason === "user_opted_out") {
  status = "skipped";
  failureReason = "user_opted_out";
} else if (sendEmailResult.reason === "resend_not_configured") {
  status = "skipped";
  failureReason = "resend_not_configured";
} else {
  status = "failed";
  failureReason =
    sendEmailResult.reason || sendEmailResult.error || "unknown_error";
}

// Log errors to console
if (status !== "delivered") {
  console.log(`❌ Email ${status} for ${userData.email}:`, {
    reason: failureReason,
    error: sendEmailResult.error,
  });
}

// Return formatted data for Log to Database node
return {
  json: {
    user_id: userData.user_id || null,
    email_type: "word_of_day",
    recipient_email: userData.email,
    subject: `🇫🇷 Your French Word: ${wordData.word}`,
    sent_at: new Date().toISOString(),
    status: status,
    provider: "resend",
    metadata: {
      word: wordData.word,
      word_id: wordData.word_id,
      date: wordData.date,
      source: "n8n_daily_wotd",
      email_id: sendEmailResult.email_id || null,
      send_success: sendEmailResult.success === true,
      send_reason: sendEmailResult.reason || null,
      send_error: sendEmailResult.error || null,
      failure_reason: failureReason || null,
    },
  },
};
```

**Note:** This node formats the data and determines the status. The next node (Log to Database) will use this formatted output.

**Troubleshooting "Paired item data unavailable" error:**

If you get an error about "Filter users (FOR TESTING)" or "Get Opted-In Users" being unavailable:

- This happens because those nodes are BEFORE the loop (Split In Batches)
- The code above uses `$("Split In Batches").all()` to get user data, which works inside the loop
- Make sure you're NOT referencing `$("Filter Users")` or `$("Get Opted-In Users").item.json` directly
- Use `$("Split In Batches").all()` instead, which has access to the filtered user items

**Alternative: Skip This Node**

If you prefer to format the data directly in the Log to Database HTTP Request body, you can skip this node and use the inline expressions shown in Node 6.

---

## Node 6: Log to Database

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://YOUR_PROJECT_URL/functions/v1/log-email`

**⚠️ IMPORTANT: Error Handling Settings**

In the node settings, under **"On Error"** dropdown, select:

- **"Continue"** ✅ - Pass error message as item in regular output (recommended)
  - This allows the loop to continue even if logging fails
  - The error response will be passed to the next node as regular output

**Alternative Options:**

- **"Continue (using error output)"** - Creates a separate error output port
  - Use this if you want to route logging errors differently
- **"Stop Workflow"** ❌ - Don't use this! It will stop the entire loop if logging fails

**Headers:**

```json
{
  "Authorization": "Bearer {{$env.SUPABASE_ANON_KEY}}",
  "Content-Type": "application/json"
}
```

**Body (if using Handle Errors node - recommended):**

```javascript
{
  {
    $json;
  }
}
```

**Note:** This passes through the entire formatted object from the Handle Errors node.

**Body (if skipping Handle Errors node - inline expressions):**

```javascript
{
  "user_id": "{{ $('Get Opted-In Users').item.json.user_id }}",
  "email_type": "word_of_day",
  "recipient_email": "{{ $('Get Opted-In Users').item.json.email }}",
  "subject": "🇫🇷 Your French Word: {{ $('Shuffle Quiz Options').first().json.word }}",
  "sent_at": "{{ $now.toISO() }}",
  "status": "{{ $('Send Email').item.json.success === true ? 'delivered' : ($('Send Email').item.json.reason === 'user_opted_out' || $('Send Email').item.json.reason === 'resend_not_configured' ? 'skipped' : 'failed') }}",
  "provider": "resend",
  "metadata": {
    "word": "{{ $('Shuffle Quiz Options').first().json.word }}",
    "word_id": "{{ $('Shuffle Quiz Options').first().json.word_id }}",
    "date": "{{ $('Shuffle Quiz Options').first().json.date }}",
    "source": "n8n_daily_wotd",
    "email_id": "{{ $('Send Email').item.json.email_id || '' }}",
    "send_success": {{ $('Send Email').item.json.success === true ? 'true' : 'false' }},
    "send_reason": "{{ $('Send Email').item.json.reason || '' }}",
    "send_error": "{{ $('Send Email').item.json.error || '' }}"
  }
}
```

**Note:** The `status` field will be:

- `"delivered"` if email sent successfully
- `"skipped"` if user opted out or Resend not configured
- `"failed"` for any other error

**Note:** This logs every email attempt, whether it succeeded or failed. The `status` field reflects the result from the Send Email node.

**Recommended:** Use the Handle Errors node (Node 5) before this one to format the data cleanly. Then use `{{ $json }}` as the body to pass through the formatted data.

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
// Parse JSONB fields from Supabase
const wrongOptions =
  typeof word.wrong_options === "string"
    ? JSON.parse(word.wrong_options)
    : word.wrong_options;
const allOptions = [word.correct_answer, ...wrongOptions];
for (let i = allOptions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
}
const correctLetter = allOptions.indexOf(word.correct_answer);
const correctKey = ["A", "B", "C", "D"][correctLetter];
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
    correctKey: correctKey,
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

---

## 🔧 Troubleshooting: Error Handling

### Problem: Workflow stops when one email fails

**Solution:**

1. **Set "On Error" to "Continue"** in the Send Email node:

   - Click on the **Send Email** HTTP Request node
   - Open the **Settings** panel (usually at the bottom or in a sidebar)
   - Find **"On Error"** dropdown
   - Select **"Continue"** ✅
   - This passes error messages as regular output items
   - The Handle Errors node can then check `success: false` and format accordingly
   - The loop continues processing remaining emails

2. **The function has been updated** to return HTTP 200 even on failures (with `success: false`), so n8n won't treat it as an error. But you should still set "Continue" for best results.

**If you still get errors stopping the workflow:**

- Make sure "On Error" is set to "Continue" (not "Stop Workflow")
- Check that the function is deployed: `supabase functions deploy send-resend-email`
- The function now returns 200 status even when Resend fails, so n8n should continue

### Problem: Getting HTML error pages instead of JSON

**Symptoms:** Error like `"Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"`

**Solution:**

- The function has been updated to always return JSON
- Redeploy: `supabase functions deploy send-resend-email`
- Check that your URL is correct: `https://YOUR_PROJECT_URL/functions/v1/send-resend-email`

### Problem: Want to log errors but continue processing

**Solution:**

- Add the **Handle Errors** Code node (Node 5) after Send Email to format data and log errors
- Add the **Log to Database** node (Node 6) to record all attempts in `email_logs` table
- Set **"On Error"** to **"Continue"** in both HTTP Request nodes (Send Email and Log to Database)
- Code nodes don't need error handling settings - they always continue unless they throw an error

### Problem: Log to Database node fails

**Symptoms:** Log-email function returns errors

**Solution:**

- Check that the function is deployed: `supabase functions deploy log-email`
- Verify required fields are present: `email_type`, `recipient_email`, `status`
- Check that **"On Error"** is set to **"Continue"** so logging failures don't stop the workflow
- The function will still log even if the email send failed - this is expected behavior

### Problem: Rate limiting from Resend API

**Solution:**

- Use **Split In Batches** node with batch size 50
- Add a **Wait** node between batches if needed
- Check Resend API limits (usually 100 emails/minute on free tier)

### Problem: Some emails succeed, some fail

**This is normal!** Common reasons:

- Invalid email addresses → Returns `success: false, reason: "resend_api_error"`
- User opted out → Returns `success: false, reason: "user_opted_out"`
- Resend API temporary issues → Returns `success: false, reason: "resend_api_error"`

**With "Continue on Fail" enabled:** The workflow will process all users, and you can check the execution log to see which ones failed.

---

## 📊 Monitoring Success/Failure Rates

After running the workflow, check the execution:

1. **View Execution Log:** Click on the workflow execution
2. **Check Send Email Node:** See how many items succeeded/failed
3. **Check Handle Errors Node:** (if added) See detailed error messages

**Expected:** Most emails should succeed. A few failures are normal (invalid emails, opt-outs, etc.).

---

## 📝 API Reference: log-email Edge Function

**URL:** `https://YOUR_PROJECT_URL/functions/v1/log-email`

**Method:** POST

**Headers:**

```json
{
  "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "user_id": "uuid-optional",
  "email_type": "word_of_day",
  "recipient_email": "user@example.com",
  "subject": "Email subject",
  "sent_at": "2025-11-18T12:00:00Z",
  "status": "delivered",
  "provider": "resend",
  "metadata": {},
  "queue_id": "uuid-optional"
}
```

**Required Fields:**

- `email_type` - Type of email (e.g., "word_of_day")
- `recipient_email` - Email address
- `status` - "delivered", "failed", or "skipped"

**Response:**

```json
{
  "success": true,
  "id": "uuid-of-log-entry",
  "message": "Email logged successfully"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error message",
  "reason": "database_error"
}
```

---

## 🎯 Quick Copy-Paste: Log Email Node Config

**URL:**

```
https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/log-email
```

**Headers:**

```
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json
```

**Body (simplified version):**

```json
{
  "user_id": "{{ $('Get Opted-In Users').item.json.user_id }}",
  "email_type": "word_of_day",
  "recipient_email": "{{ $('Get Opted-In Users').item.json.email }}",
  "subject": "🇫🇷 Your French Word: {{ $('Shuffle Quiz Options').first().json.word }}",
  "status": "{{ $('Send Email').item.json.success === true ? 'delivered' : 'failed' }}",
  "provider": "resend",
  "metadata": {
    "word": "{{ $('Shuffle Quiz Options').first().json.word }}",
    "word_id": "{{ $('Shuffle Quiz Options').first().json.word_id }}",
    "date": "{{ $('Shuffle Quiz Options').first().json.date }}"
  }
}
```

**Remember:** Enable "Continue on Fail" in the node settings!
