# MailerLite Simple Email System

## 🎯 The Simple Approach

Instead of complex Edge Functions, we use **MailerLite's built-in automations** + **one simple webhook**.

## What We Keep (Still Useful)

✅ **Database tables** - Track what emails are sent
✅ **Admin dashboard** - See email activity
✅ **User preferences** - Let users opt-in/opt-out
✅ **Email templates in database** - Store your content

## What Changed (Much Simpler)

❌ No more 4 Edge Functions
❌ No more pg_cron scheduling
✅ MailerLite handles everything
✅ Edit automations in MailerLite's visual UI

---

## Setup Steps

### 1. Create Groups in MailerLite

In MailerLite Dashboard → Subscribers → Groups, create:

- **All Users** - Everyone who signs up
- **Module Completers** - Users who completed a module
- **Almost Done** - Users with >80% complete modules
- **Review Needed** - Users who need spaced repetition

### 2. Set Up Custom Fields in MailerLite

In MailerLite Dashboard → Subscribers → Fields, create:

- `user_id` (text) - Your Supabase user ID
- `current_unit` (number) - Which unit they're on
- `modules_completed` (number) - Total completed
- `last_active` (date) - Last activity date
- `timezone` (text) - User's timezone

### 3. Create Automations in MailerLite

#### Automation 1: Welcome Email
**Trigger**: Subscriber joins "All Users" group
**Actions**:
1. Wait 0 minutes
2. Send "Welcome Email"

**That's it!** No code needed.

#### Automation 2: Review Reminder (Spaced Repetition)
**Trigger**: Subscriber joins "Module Completers" group
**Actions**:
1. Wait 2 days
2. Send "Review Reminder Email"

#### Automation 3: Module Nudge (Almost Done)
**Trigger**: Subscriber joins "Almost Done" group
**Actions**:
1. Wait 2 days
2. Send "Module Nudge Email"

### 4. One Simple Edge Function (Sync Users)

Create just ONE Edge Function to sync users to MailerLite:

**File**: `supabase/functions/sync-to-mailerlite/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERLITE_API_KEY = Deno.env.get("MAILERLITE_API_KEY");

serve(async (req) => {
  const { event, user_id, email, name, metadata } = await req.json();
  
  // Add/update subscriber in MailerLite
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      fields: {
        user_id: user_id,
        name: name,
        ...metadata
      },
      groups: [metadata.group] // "All Users", "Module Completers", etc.
    })
  });
  
  return new Response(JSON.stringify({ success: true }));
});
```

**That's the ONLY function you need!**

### 5. Call It From Your App

Update `useAuth.js` when user signs up:

```javascript
// After user creates account
await fetch('https://your-project.supabase.co/functions/v1/sync-to-mailerlite', {
  method: 'POST',
  body: JSON.stringify({
    event: 'signup',
    user_id: user.id,
    email: user.email,
    name: user.name,
    metadata: {
      group: 'All Users'
    }
  })
});
```

Update `useSupabaseProgress.js` when module completes:

```javascript
// After module completion
await fetch('https://your-project.supabase.co/functions/v1/sync-to-mailerlite', {
  method: 'POST',
  body: JSON.stringify({
    event: 'module_complete',
    user_id: user.id,
    email: user.email,
    metadata: {
      group: 'Module Completers',
      modules_completed: totalCompleted,
      current_unit: unitId
    }
  })
});
```

---

## How It Works

### User Signs Up
```
1. User creates account
2. Your app calls sync-to-mailerlite function
3. User added to MailerLite "All Users" group
4. MailerLite automation triggers → Welcome email sent
```

### User Completes Module
```
1. User finishes module
2. Your app calls sync-to-mailerlite function
3. User added to "Module Completers" group
4. MailerLite waits 2 days → Review reminder sent
```

### User Abandons Module
```
1. You check for inactive users (manually or simple cron)
2. Add them to "Almost Done" group via API
3. MailerLite waits 2 days → Nudge email sent
```

---

## Advantages

✅ **Much simpler** - One function instead of four
✅ **Visual editing** - Change automations in MailerLite UI
✅ **No pg_cron** - MailerLite handles timing
✅ **Built-in analytics** - MailerLite shows opens, clicks
✅ **Easy testing** - Test in MailerLite dashboard
✅ **Less code to maintain** - MailerLite does the heavy lifting

## What You Control

**In Your App:**
- When to call sync-to-mailerlite
- Which group to add user to
- User preferences (opt-in/opt-out)

**In MailerLite:**
- Email templates/design
- Automation timing
- Which emails send when
- A/B testing
- Analytics

## Admin Dashboard Still Works!

Your Communication Admin dashboard can still:
- Show sync activity
- Let you manually add users to groups
- Display email preferences
- Show logs (via MailerLite API)

---

## Next Steps

1. **Set up MailerLite** (groups, fields, automations)
2. **Create one Edge Function** (sync-to-mailerlite)
3. **Update 2 hooks** (useAuth, useSupabaseProgress)
4. **Test** with your own email
5. **Done!**

---

## Cost

- MailerLite Free: Up to 1,000 subscribers
- MailerLite Paid: $9-39/month for more subscribers
- Supabase Edge Functions: ~$0 (very few calls)

**Much cheaper than maintaining complex infrastructure!**

---

## Migration Note

Since we deleted the Edge Functions, you don't need to:
- Set up pg_cron
- Manage email queue processing
- Debug complex scheduling
- Maintain TypeScript functions

MailerLite handles all that for you! 🎉

