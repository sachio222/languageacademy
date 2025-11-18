# n8n: Module Completion Email Workflow

## Complete workflow using the new Edge Functions for module data and user stats.

---

## 🔄 **Workflow Overview**

```
┌─────────────────┐
│ Webhook Trigger │  Module completion from app
└────────┬────────┘
         │
┌────────▼────────┐
│ Get Module Data │  Call get-module-email-data
└────────┬────────┘
         │
┌────────▼────────┐
│ Get User Stats  │  Call get-user-email-stats
└────────┬────────┘
         │
┌────────▼────────┐
│ Combine Data    │  Merge module + user data
└────────┬────────┘
         │
┌────────▼────────┐
│ Check Prefs     │  Only if opted in
└────────┬────────┘
         │
┌────────▼────────┐
│ Send Email      │  Module completion email
└────────┬────────┘
         │
┌────────▼────────┐
│ Check High      │  If utility score ≥ 8
│ Utility         │
└────────┬────────┘
         │
┌────────▼────────┐
│ Send App Proof  │  Application proof email
│ (Optional)      │
└─────────────────┘
```

---

## 📥 **Node 1: Webhook Trigger**

**Type:** Webhook  
**Method:** POST  
**Expected Payload:**

```json
{
  "user_id": "uuid-string",
  "module_id": 3,
  "score": 92,
  "timestamp": "2025-11-17T10:30:00Z"
}
```

**Webhook URL:** `https://your-n8n-instance.com/webhook/module-completion`

---

## 📚 **Node 2: Get Module Data**

**Type:** HTTP Request  
**Method:** GET  
**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/get-module-email-data?module_id={{$json.module_id}}`

**Headers:**

```json
{
  "Authorization": "Bearer {{$env.SUPABASE_ANON_KEY}}",
  "Content-Type": "application/json"
}
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "module": {
      "id": 3,
      "title": "Essential Verb - être (to be)",
      "capabilities": [
        "Say 'I am', 'you are', 'he/she is' in French",
        "Introduce yourself and describe others",
        "Form your first complete French sentences"
      ],
      "realWorldUse": "introduce yourself and describe people",
      "milestone": "First real sentences",
      "utilityScore": 4,
      "isUnitCompletion": false,
      "nextModuleTeaser": "Add avoir (to have) to express possession",
      "unitNumber": 1
    },
    "nextModule": {
      "id": 4,
      "title": "Essential Verb - avoir (to have)",
      "realWorldUse": "express what you have and what you need"
    }
  }
}
```

---

## 👤 **Node 3: Get User Stats**

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/get-user-email-stats`

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
  "user_id": "{{$json.user_id}}",
  "module_id": "{{$json.module_id}}"
}
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "email": "user@example.com",
    "first_name": "Marie",
    "patterns_mastered": 3,
    "top_100_coverage": 18,
    "possible_combinations": 128,
    "current_module": 4,
    "current_unit": 1,
    "progress_percentage": 35,
    "last_score": 92,
    "days_streak": 7,
    "retention_rate": 89,
    "first_try_accuracy": 82
  }
}
```

---

## 🔄 **Node 4: Combine Data**

**Type:** Code  
**JavaScript:**

```javascript
const moduleData = $("Get Module Data").item.json.data.module;
const nextModuleData = $("Get Module Data").item.json.data.nextModule;
const userStats = $("Get User Stats").item.json.data;
const webhookData = $("Webhook").item.json;

return {
  json: {
    // User info
    user_id: userStats.user_id,
    email: userStats.email,
    first_name: userStats.first_name,

    // Module info
    module_id: moduleData.id,
    module_name: moduleData.title,
    module_number: moduleData.id,
    unit_number: moduleData.unitNumber,
    capability_1: moduleData.capabilities[0],
    capability_2: moduleData.capabilities[1],
    capability_3: moduleData.capabilities[2],
    real_world_use: moduleData.realWorldUse,
    milestone: moduleData.milestone,

    // Next module
    next_module_id: nextModuleData?.id || moduleData.id + 1,
    next_module_name: nextModuleData?.title || "Continue Learning",
    next_module_capability:
      nextModuleData?.realWorldUse || "expand your French skills",

    // User stats for email
    patterns_mastered: userStats.patterns_mastered,
    top_100_coverage: userStats.top_100_coverage,
    possible_combinations: userStats.possible_combinations,

    // Review questions (can be generated or static)
    review_question_1: `How do you use the main concept from ${moduleData.title}?`,
    review_question_2: `What's a key phrase from this module?`,
    review_question_3: `Apply ${moduleData.title} in a sentence`,

    // Trigger flags
    is_high_utility: (moduleData.utilityScore || 0) >= 8,
    is_unit_completion: moduleData.isUnitCompletion || false,

    // Original webhook data
    score: webhookData.score,
    timestamp: webhookData.timestamp,
  },
};
```

---

## ✅ **Node 5: Check User Preferences**

**Type:** IF (Condition)  
**Condition:**

```javascript
{{$json.email}} != null
```

**Continue if:** `true`

---

## 📧 **Node 6: Send Module Completion Email**

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email`

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
  "subject": "🇫🇷 You completed {{$json.module_name}}!",
  "html": "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><title>Module Complete!</title></head><body style=\"margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color: #ffffff;\"><tr><td align=\"center\" style=\"padding: 48px 24px;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"max-width: 600px;\"><tr><td style=\"padding: 0 0 40px 0; text-align: center;\"><img src=\"https://languageacademy.io/img/TLA_CoreMark_Blue_tm_v1.1.1.png\" alt=\"Language Academy\" height=\"38\" width=\"auto\" style=\"height: 38px; width: auto; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto;\" /><div style=\"font-size: 13px; font-weight: 500; letter-spacing: 0.5px; color: #999999; text-transform: uppercase; margin-bottom: 16px;\">Module Complete</div><div style=\"font-size: 32px; margin-bottom: 8px;\">🎉</div></td></tr><tr><td style=\"padding: 0 0 40px 0; text-align: center; border-bottom: 1px solid #f0f0f0;\"><h1 style=\"margin: 0 0 8px 0; font-size: 36px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a;\">{{$json.module_name}}</h1><div style=\"font-size: 16px; color: #999999;\">Module {{$json.module_number}} • Unit {{$json.unit_number}}</div></td></tr><tr><td style=\"padding: 48px 0 0 0;\"><h2 style=\"margin: 0 0 24px 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; text-align: center;\">You can now:</h2></td></tr><tr><td style=\"padding: 0 0 40px 0;\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-bottom: 12px;\"><div style=\"padding: 16px; background: #fafbfc; border-radius: 12px;\"><div style=\"font-size: 15px; color: #1a1a1a; line-height: 1.6;\">✓ {{$json.capability_1}}</div></div></td></tr><tr><td style=\"padding-bottom: 12px;\"><div style=\"padding: 16px; background: #fafbfc; border-radius: 12px;\"><div style=\"font-size: 15px; color: #1a1a1a; line-height: 1.6;\">✓ {{$json.capability_2}}</div></div></td></tr><tr><td style=\"padding-bottom: 0;\"><div style=\"padding: 16px; background: #fafbfc; border-radius: 12px;\"><div style=\"font-size: 15px; color: #1a1a1a; line-height: 1.6;\">✓ {{$json.capability_3}}</div></div></td></tr></table></td></tr><tr><td style=\"padding: 40px 0 48px 0; border-bottom: 1px solid #f0f0f0;\"><h3 style=\"margin: 0 0 32px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; text-align: center;\">Your French Building Blocks</h3><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"text-align: center; padding: 0 12px; vertical-align: top;\"><div style=\"font-size: 40px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a; margin-bottom: 8px;\">{{$json.patterns_mastered}}</div><div style=\"font-size: 13px; color: #665665;\">Patterns<br />Mastered</div></td><td style=\"text-align: center; padding: 0 12px; vertical-align: top;\"><div style=\"font-size: 40px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a; margin-bottom: 8px;\">{{$json.top_100_coverage}}%</div><div style=\"font-size: 13px; color: #665665;\">Top 100<br />Coverage</div></td><td style=\"text-align: center; padding: 0 12px; vertical-align: top;\"><div style=\"font-size: 40px; font-weight: 300; letter-spacing: -0.03em; color: #1a1a1a; margin-bottom: 8px;\">{{$json.possible_combinations}}</div><div style=\"font-size: 13px; color: #665665;\">Unique<br />Combinations</div></td></tr></table></td></tr><tr><td style=\"padding: 48px 0 32px 0;\"><h3 style=\"margin: 0 0 8px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; text-align: center;\">Quick Review</h3><p style=\"margin: 0 0 32px 0; font-size: 14px; color: #665665; text-align: center; line-height: 1.6;\">30 seconds to lock it in</p><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?review=true&module={{$json.module_id}}&item=1\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 15px; font-weight: 500; text-align: center;\">{{$json.review_question_1}}</a></td></tr><tr><td style=\"padding-bottom: 12px;\"><a href=\"https://languageacademy.io?review=true&module={{$json.module_id}}&item=2\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 15px; font-weight: 500; text-align: center;\">{{$json.review_question_2}}</a></td></tr><tr><td style=\"padding-bottom: 0;\"><a href=\"https://languageacademy.io?review=true&module={{$json.module_id}}&item=3\" style=\"display: block; padding: 18px 24px; background: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; text-decoration: none; color: #1a1a1a; font-size: 15px; font-weight: 500; text-align: center;\">{{$json.review_question_3}}</a></td></tr></table></td></tr><tr><td style=\"padding: 40px 0 48px 0; text-align: center; border-top: 1px solid #f0f0f0;\"><h3 style=\"margin: 0 0 16px 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a;\">Coming Next</h3><p style=\"margin: 0 0 24px 0; font-size: 15px; color: #665665; line-height: 1.6;\">{{$json.next_module_name}}</p><div style=\"margin-bottom: 16px;\"><div style=\"font-size: 14px; color: #999999; margin-bottom: 8px;\">You'll learn to:</div><div style=\"font-size: 15px; color: #1a1a1a; font-weight: 500;\">{{$json.next_module_capability}}</div></div><a href=\"https://languageacademy.io?module={{$json.next_module_id}}\" style=\"display: inline-block; margin-top: 24px; padding: 16px 32px; background: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 600; letter-spacing: -0.01em;\">Continue Learning</a></td></tr><tr><td style=\"padding: 48px 0 0 0; border-top: 1px solid #f0f0f0; text-align: center;\"><div style=\"padding: 24px 0 16px 0;\"><img src=\"https://languageacademy.io/img/TLA_CoreMark_Blue_tm_v1.1.1.png\" alt=\"Language Academy\" height=38 width=\"auto\" style=\"height: 38px; width: auto; margin-bottom: 12px;\" /><div style=\"font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #1a1a1a; margin-bottom: 4px;\">Language Academy</div><div style=\"font-size: 13px; color: #999999;\">Learn French through cognitive science</div></div><div style=\"padding: 16px 0;\"><a href=\"https://languageacademy.io\" style=\"color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 12px;\">Visit App</a><span style=\"color: #e0e0e0;\">|</span><a href=\"https://languageacademy.io?settings&section=notifications\" style=\"color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;\">Preferences</a><span style=\"color: #e0e0e0;\">|</span><a href=\"https://languageacademy.io?unsubscribe&type=progress\" style=\"color: #999999; text-decoration: none; font-size: 14px; margin: 0 12px;\">Unsubscribe</a></div><div style=\"padding: 16px 0 0 0; font-size: 12px; color: #cccccc;\">© 2025 Language Academy. All rights reserved.</div></td></tr></table></td></tr></table></body></html>",
  "email_type": "module_completion",
  "user_id": "{{$json.user_id}}",
  "metadata": {
    "module_id": "{{$json.module_id}}",
    "module_name": "{{$json.module_name}}",
    "score": "{{$json.score}}",
    "timestamp": "{{$json.timestamp}}",
    "source": "n8n_module_completion"
  }
}
```

---

## 🎯 **Node 7: Check High Utility (Optional)**

**Type:** IF (Condition)  
**Condition:** `{{$json.is_high_utility}} = true`

**Continue if:** `true`

---

## 💬 **Node 8: Send Application Proof Email (Optional)**

**Type:** HTTP Request  
**Method:** POST  
**URL:** `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/send-resend-email`

**Body:**

```json
{
  "to": "{{$json.email}}",
  "subject": "🇫🇷 You can now {{$json.real_world_use}} in French",
  "html": "<!DOCTYPE html>...APPLICATION PROOF TEMPLATE...",
  "email_type": "application_proof",
  "user_id": "{{$json.user_id}}",
  "metadata": {
    "module_id": "{{$json.module_id}}",
    "utility_score": "{{$('Get Module Data').item.json.data.module.utilityScore}}",
    "milestone": "{{$json.milestone}}",
    "source": "n8n_application_proof"
  }
}
```

---

## 🧪 **Testing the Workflow**

### **Test Webhook Payload:**

```bash
curl -X POST https://your-n8n-webhook-url/module-completion \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "your-test-user-id",
    "module_id": 3,
    "score": 92,
    "timestamp": "2025-11-17T10:30:00Z"
  }'
```

### **Expected Results:**

1. **Module completion email sent** with:

   - Subject: "🇫🇷 You completed Essential Verb - être (to be)!"
   - 3 capabilities listed
   - User stats (patterns, coverage, combinations)
   - Review questions
   - Next module preview

2. **No application proof email** (utility score 4 < 8)

### **Test High-Utility Module (Module 15: ça Survival):**

```json
{
  "user_id": "test-user-id",
  "module_id": 15,
  "score": 88
}
```

**Expected:** Both module completion AND application proof emails sent!

---

## 🔧 **Deployment Steps**

### **1. Deploy Edge Functions**

```bash
# Deploy module data function
supabase functions deploy get-module-email-data

# Deploy user stats function
supabase functions deploy get-user-email-stats

# Test both functions
curl "https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/get-module-email-data?module_id=3"
```

### **2. Create n8n Workflow**

1. **Import workflow** (or create manually)
2. **Set environment variables** (SUPABASE_ANON_KEY)
3. **Test with webhook trigger**
4. **Verify emails send correctly**

### **3. Add Webhook to App**

```javascript
// In your app, after module exam success
if (examScore >= 80) {
  try {
    await fetch("https://your-n8n-instance.com/webhook/module-completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        module_id: moduleId,
        score: examScore,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to trigger completion email:", error);
    // Don't block user progress if email fails
  }
}
```

---

## 📊 **Monitoring & Analytics**

### **Track in email_logs:**

- Email type: 'module_completion' or 'application_proof'
- Module ID and name
- User engagement (opens, clicks)
- Success/failure rates

### **Key Metrics:**

- **Open rate by module** (which modules get most engagement?)
- **Click-through to app** (do emails bring users back?)
- **High-utility email performance** (do application proof emails work?)

---

## 🎯 **Next Steps**

1. **Deploy both Edge Functions**
2. **Create n8n workflow**
3. **Test with your own account**
4. **Add webhook to app**
5. **Monitor first sends**
6. **Add other email types** (unit completion, stalled, etc.)

---

**Status:** Ready to Deploy  
**Dependencies:** get-module-email-data + get-user-email-stats Edge Functions  
**Testing:** Use modules 3, 15 for testing (good data)

Your module completion emails are ready to launch! 🚀
