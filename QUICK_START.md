# 🚀 Quick Start: Stripe Integration

**5-minute setup guide for Language Academy payment system**

---

## ✅ **PRE-FLIGHT CHECKLIST**

- [ ] Supabase CLI installed (`npm install -g supabase`)
- [ ] Logged into Supabase (`supabase login`)
- [ ] Stripe account created
- [ ] Project linked to Supabase

---

## 🎯 **SETUP (3 STEPS)**

### **STEP 1: Database** (2 minutes)

1. Go to: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/editor
2. Click **SQL Editor** → **New Query**
3. Copy & paste this SQL:

```sql
-- Add subscription columns
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_started_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ;

-- Create conversion tracking
CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  shown_at TIMESTAMPTZ DEFAULT NOW(),
  dismissed BOOLEAN DEFAULT FALSE,
  dismissed_at TIMESTAMPTZ,
  converted BOOLEAN DEFAULT FALSE,
  selected_plan TEXT,
  converted_at TIMESTAMPTZ,
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_conversion_events_user ON conversion_events(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_type ON conversion_events(event_type);

-- RLS
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own events" ON conversion_events 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create own events" ON conversion_events 
FOR INSERT WITH CHECK (auth.uid() = user_id);
```

4. Click **RUN**

---

### **STEP 2: Edge Functions** (1 minute)

```bash
# In terminal, from project root:
cd /Users/jupiter/dev/woodshed/languageacademy

# Set secrets (replace with your actual keys)
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
supabase secrets set BASE_URL=http://localhost:5173

# Deploy functions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy stripe-portal

# Verify
supabase functions list
```

**Expected output:**
```
✓ stripe-checkout
✓ stripe-webhook
✓ stripe-portal
```

---

### **STEP 3: Frontend Config** (1 minute)

1. Create `.env.local` file in project root:

```bash
VITE_SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

2. Get your keys:
   - **Anon Key**: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/settings/api
   - **Stripe Key**: https://dashboard.stripe.com/test/apikeys

3. Restart dev server:
```bash
npm run dev
```

---

## 🧪 **TEST IT** (1 minute)

1. Open: http://localhost:5173
2. Sign in as test user
3. Click **Unit 2** (locked)
4. Click **Choose Annual** ($150)
5. Use test card: `4242 4242 4242 4242`
6. Complete checkout
7. Return to app → Unit 2 should be unlocked! ✅

---

## 🎉 **DONE!**

Your payment system is live!

**Check it worked:**
```sql
-- In Supabase SQL Editor
SELECT subscription_tier FROM user_profiles WHERE email = 'your_test_email';
-- Should show: 'annual' or 'monthly' etc.
```

---

## 🐛 **TROUBLESHOOTING**

**Units still locked?**
- Check: `user_profiles.subscription_tier` in Supabase
- Verify Edge Function logs: `supabase functions logs stripe-webhook`

**Checkout fails?**
- Verify: `STRIPE_SECRET_KEY` is set correctly
- Check: User is logged in (has Supabase session)

**Webhook not working?**
- Run locally: `stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook`
- Copy webhook secret: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 📚 **NEXT STEPS**

- [ ] Test all 4 pricing plans (weekly, monthly, annual, lifetime)
- [ ] Complete Unit 1 (lesson 11) → see upgrade prompt
- [ ] Configure Stripe webhook for production
- [ ] Switch to live Stripe keys for launch

**Full docs:** See `STRIPE_SETUP_GUIDE.md`

---

**Questions?** Check Stripe dashboard logs or Supabase function logs.
