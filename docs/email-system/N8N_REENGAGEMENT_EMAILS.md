# n8n: Reengagement Email System

Complete guide for all automated reengagement emails based on user behavior and cognitive science principles.

---

## 📧 Email Types & Triggers

| Email Type | Trigger | Timing | Goal |
|------------|---------|--------|------|
| **Module Completion** | Exam passed (≥80%) | Immediate | Celebrate + reinforce |
| **24h Consolidation** | 24h after module | Next day, same time | Test sleep encoding |
| **3-Day Stalled** | No activity 3 days | Day 3, 9am local | Prevent forgetting |
| **7-Day Decay Check** | 7 days post-module | Day 7, 9am local | Combat decay |
| **Unit Completion** | Unit exam passed | Immediate | Major milestone |
| **Application Proof** | High-utility module (4,10,11) | Immediate | Show real value |
| **Pace Reassurance** | Monthly check-in | 1st of month | Prevent comparison dropout |

---

## Workflow Architecture

### Master Schedule Workflow

```
┌──────────────────┐
│ Daily Cron 9am   │
└────────┬─────────┘
         │
         ├──→ Check 3-Day Stalled Users
         ├──→ Check 7-Day Decay Users
         ├──→ Check 24h Consolidation Users
         └──→ Check Monthly Pace Reassurance
```

### Event-Based Workflow

```
┌──────────────────┐
│ Webhook from App │
└────────┬─────────┘
         │
         ├──→ Module Completion
         ├──→ Unit Completion
         └──→ Application Proof (modules 4,10,11)
```

---

## 1️⃣ 24-Hour Consolidation Email

### Purpose
Test what brain retained overnight (sleep consolidation science).

### Trigger: Daily Scan (9am local time)

**Type:** Schedule (Cron)  
**Expression:** `0 9 * * *`

### Node 1: Get Users (24h Post-Module)

**SQL Query:**

```sql
SELECT 
  up.user_id,
  up.module_id,
  up.completed_at,
  u.email,
  u.first_name,
  u.timezone,
  m.module_name
FROM user_progress up
JOIN user_profiles u ON u.id = up.user_id
JOIN modules m ON m.id = up.module_id
LEFT JOIN notification_preferences np ON np.user_id = u.id
WHERE up.completed = true
  AND up.completed_at >= NOW() - INTERVAL '25 hours'
  AND up.completed_at <= NOW() - INTERVAL '23 hours'
  AND (np.email_enabled IS NULL OR np.email_enabled = true)
  AND (np.progress_emails IS NULL OR np.progress_emails = true)
  AND NOT EXISTS (
    SELECT 1 FROM email_logs 
    WHERE user_id = up.user_id 
    AND email_type = 'consolidation_24h'
    AND module_id = up.module_id
  );
```

### Node 2: Generate Quiz Questions (Code)

```javascript
const users = $input.all();

return users.map(user => {
  const moduleId = user.json.module_id;
  
  // Fetch or generate 3 quiz questions from module
  // This should query your exercises table
  const questions = [
    "How do you say 'I am' in French?",
    "What is the verb être?",
    "Translate: 'You are happy'"
  ];
  
  return {
    json: {
      ...user.json,
      quiz_question_1: questions[0],
      quiz_question_2: questions[1],
      quiz_question_3: questions[2]
    }
  };
});
```

### Node 3: Send Email

**Template:** `consolidation-24h.html`  
**Subject:** `🇫🇷 Your brain worked on French while you slept`

---

## 2️⃣ 3-Day Stalled Progress Email

### Purpose
Gentle nudge when user hasn't returned (prevent forgetting curve).

### Trigger: Daily Scan (9am local time)

### Node 1: Get Inactive Users

**SQL Query:**

```sql
SELECT 
  u.id as user_id,
  u.email,
  u.first_name,
  up.progress_percentage,
  up.current_unit,
  up.current_module,
  up.capabilities_count,
  up.last_score,
  up.last_activity_at,
  next_m.id as next_module_id,
  next_m.module_name as next_milestone
FROM user_profiles u
JOIN user_progress_summary up ON up.user_id = u.id
JOIN modules next_m ON next_m.id = up.current_module + 1
LEFT JOIN notification_preferences np ON np.user_id = u.id
WHERE up.last_activity_at <= NOW() - INTERVAL '3 days'
  AND up.last_activity_at >= NOW() - INTERVAL '4 days'
  AND (np.email_enabled IS NULL OR np.email_enabled = true)
  AND (np.progress_emails IS NULL OR np.progress_emails = true)
  AND NOT EXISTS (
    SELECT 1 FROM email_logs 
    WHERE user_id = u.id 
    AND email_type = 'stalled_3d'
    AND sent_at >= NOW() - INTERVAL '7 days'
  );
```

### Node 2: Calculate Milestone Distance

```javascript
const users = $input.all();

return users.map(user => {
  const nextMilestoneModule = Math.ceil(user.json.current_module / 5) * 5;
  const modulesUntilMilestone = nextMilestoneModule - user.json.current_module;
  
  return {
    json: {
      ...user.json,
      modules_until_milestone: modulesUntilMilestone,
      next_milestone: `Unit ${Math.ceil(nextMilestoneModule / 10)} Complete`
    }
  };
});
```

### Node 3: Send Email

**Template:** `stalled-progress-3d.html`  
**Subject:** `🇫🇷 Your French hasn't forgotten you`

---

## 3️⃣ 7-Day Decay Prevention Email

### Purpose
Combat forgetting curve with targeted review.

### Trigger: Daily Scan (9am local time)

### Node 1: Get Modules Completed 7 Days Ago

**SQL Query:**

```sql
SELECT 
  up.user_id,
  up.module_id,
  u.email,
  u.first_name,
  m.module_name,
  m.next_module_id
FROM user_progress up
JOIN user_profiles u ON u.id = up.user_id
JOIN modules m ON m.id = up.module_id
LEFT JOIN notification_preferences np ON np.user_id = u.id
WHERE up.completed = true
  AND up.completed_at >= NOW() - INTERVAL '7 days 1 hour'
  AND up.completed_at <= NOW() - INTERVAL '6 days 23 hours'
  AND (np.email_enabled IS NULL OR np.email_enabled = true)
  AND (np.progress_emails IS NULL OR np.progress_emails = true)
  AND NOT EXISTS (
    SELECT 1 FROM email_logs 
    WHERE user_id = up.user_id 
    AND email_type = 'decay_7d'
    AND module_id = up.module_id
  );
```

### Node 2: Get Review Items (5 key items from module)

```javascript
// Query module vocabulary/exercises for 5 key review items
const users = $input.all();

return users.map(user => {
  // Fetch from your database or use predefined items
  return {
    json: {
      ...user.json,
      review_item_1_question: "How do you say 'to be'?",
      review_item_2_question: "What is 'je suis'?",
      review_item_3_question: "Conjugate être for 'you' (informal)",
      review_item_4_question: "What's the difference between être and avoir?",
      review_item_5_question: "Use être in a sentence"
    }
  };
});
```

### Node 3: Send Email

**Template:** `decay-prevention-7d.html`  
**Subject:** `🇫🇷 Quick! Before your brain prunes this`

---

## 4️⃣ Unit Completion Email

### Purpose
Major milestone celebration (dopamine hit!).

### Trigger: Webhook from App (Unit Exam Success)

### Node 1: Get Unit Stats

**SQL Function:**

```sql
CREATE OR REPLACE FUNCTION get_unit_completion_stats(
  p_user_id UUID,
  p_unit_id INT
)
RETURNS TABLE (
  fluency_milestone TEXT,
  unit_name TEXT,
  impact_1 TEXT,
  impact_2 TEXT,
  impact_3 TEXT,
  patterns_mastered INT,
  vocab_count INT,
  days_streak INT,
  comprehension INT,
  possible_combinations INT,
  next_unit_id INT,
  next_unit_name TEXT
) AS $$
BEGIN
  -- Return comprehensive unit completion stats
  -- This is project-specific, customize based on your schema
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Node 2: Send Email

**Template:** `unit-completion.html`  
**Subject:** `🇫🇷 You just achieved {{fluency_milestone}}`

---

## 5️⃣ Application Proof Email

### Purpose
Show real-world value after high-utility modules (4, 10, 11).

### Trigger: Webhook from App (Specific Module Completion)

### Node 1: Filter High-Utility Modules

**IF Node:**

```
{{$json.module_id}} = 4 OR 
{{$json.module_id}} = 10 OR 
{{$json.module_id}} = 11
```

### Node 2: Get Module Application Data

```javascript
const moduleId = $json.module_id;

// Define real-world applications per module
const applications = {
  4: {
    capability: "greet someone and ask how they're doing",
    dialog_line_1: "Bonjour!",
    dialog_line_2: "Ça va?",
    dialog_line_3: "Oui, ça va bien, et toi?",
    dialog_line_4: "Ça va, merci!",
    challenge_prompt: "Go to a French café and order using only French",
    media_title_1: "Easy French #1: Basic Greetings",
    media_link_1: "https://youtube.com/..."
  },
  10: {
    capability: "express what you want and need",
    // ... etc
  },
  11: {
    capability: "ask questions about location and direction",
    // ... etc
  }
};

return {
  json: {
    ...$json,
    ...applications[moduleId]
  }
};
```

### Node 3: Send Email

**Template:** `application-proof.html`  
**Subject:** `🇫🇷 You can now {{real_world_capability}} in French`

---

## 6️⃣ Pace Reassurance Email

### Purpose
Monthly reminder that quality > speed.

### Trigger: Monthly Cron (1st of month, 10am)

**Expression:** `0 10 1 * *`

### Node 1: Get All Active Learners

**SQL Query:**

```sql
SELECT 
  u.id as user_id,
  u.email,
  u.first_name,
  up.current_module,
  up.retention_rate,
  up.first_try_accuracy,
  (up.retention_rate - avg_stats.avg_retention) as retention_vs_avg,
  (up.first_try_accuracy - avg_stats.avg_accuracy) as accuracy_vs_avg
FROM user_profiles u
JOIN user_progress_summary up ON up.user_id = u.id
CROSS JOIN (
  SELECT 
    AVG(retention_rate) as avg_retention,
    AVG(first_try_accuracy) as avg_accuracy
  FROM user_progress_summary
) avg_stats
LEFT JOIN notification_preferences np ON np.user_id = u.id
WHERE up.last_activity_at >= NOW() - INTERVAL '60 days'
  AND (np.email_enabled IS NULL OR np.email_enabled = true)
  AND (np.progress_emails IS NULL OR np.progress_emails = true);
```

### Node 2: Calculate Trend

```javascript
const users = $input.all();

return users.map(user => {
  const trend = user.json.retention_vs_avg > 0 ? "Improving" : "Steady";
  const trendColor = user.json.retention_vs_avg > 0 ? "#22c55e" : "#3b82f6";
  const trendIcon = user.json.retention_vs_avg > 0 ? "📈" : "➡️";
  
  return {
    json: {
      ...user.json,
      comparison_low: Math.max(1, user.json.current_module - 10),
      comparison_high: user.json.current_module + 15,
      trend_direction: trend,
      trend_color: trendColor,
      trend_icon: trendIcon,
      average_retention: Math.round(user.json.avg_retention || 75),
      average_accuracy: Math.round(user.json.avg_accuracy || 70)
    }
  };
});
```

### Node 3: Send Email

**Template:** `pace-reassurance.html`  
**Subject:** `🇫🇷 Why your pace is actually perfect`

---

## Email Preference Schema

Add to `notification_preferences` table:

```sql
ALTER TABLE notification_preferences
ADD COLUMN IF NOT EXISTS progress_emails BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS consolidation_emails BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS reengagement_emails BOOLEAN DEFAULT true;
```

---

## Testing All Workflows

### Create Test User:

```sql
INSERT INTO user_profiles (id, email, first_name)
VALUES (
  'test-user-id',
  'your-test-email@example.com',
  'Test'
);
```

### Simulate Module Completion:

```sql
INSERT INTO user_progress (user_id, module_id, completed, completed_at, score)
VALUES (
  'test-user-id',
  2,
  true,
  NOW() - INTERVAL '24 hours',
  90
);
```

### Test Each Workflow Individually

Use "Execute Workflow" in n8n with manual trigger.

---

## Analytics & Tracking

### Add to email_logs:

```sql
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  email_type TEXT NOT NULL,
  module_id INT,
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  metadata JSONB
);
```

### Track Opens (Add pixel to emails):

```html
<img src="https://your-domain.com/track/open?email_id={{email_log_id}}" width="1" height="1" />
```

---

## Best Practices

1. **Timing**: Respect user timezones (use `u.timezone` column)
2. **Frequency Capping**: Max 1 email per day per user
3. **Unsubscribe**: Honor unsubscribe preferences instantly
4. **Mobile-First**: All templates are responsive
5. **A/B Testing**: Test subject lines, send times
6. **Monitoring**: Track open rates, click rates, conversions

---

## Quick Start Checklist

- [ ] Create all 7 email templates
- [ ] Set up Supabase functions (get_user_module_stats, etc.)
- [ ] Create n8n workflows (1 for events, 1 for scheduled)
- [ ] Add webhooks to app (module completion, unit completion)
- [ ] Create notification_preferences table
- [ ] Test each email type with test user
- [ ] Set up email_logs table for tracking
- [ ] Configure timezone handling
- [ ] Add unsubscribe links
- [ ] Monitor first week of sends

---

**Status:** Ready for implementation  
**Estimated Setup Time:** 4-6 hours  
**Maintenance:** Minimal (automated)

Let's reengage those learners! 🚀

