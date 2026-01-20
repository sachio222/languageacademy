# 🚀 Stripe Integration Setup Guide

Complete guide to deploying and configuring the Stripe payment system for Language Academy.

---

## 📋 **PREREQUISITES**

1. ✅ Stripe account created
2. ✅ Supabase project set up
3. ✅ Supabase CLI installed (`npm install -g supabase`)
4. ✅ Stripe CLI installed (for webhook testing)

---

## 🔑 **STEP 1: Get Your Stripe Keys**

### **1.1 Get API Keys**

1. Go to: https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)

### **1.2 Get Webhook Secret (for production)**

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

---

## 🗄️ **STEP 2: Database Setup**

Run this SQL in your Supabase SQL Editor:

```sql
-- Add subscription columns to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_started_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ;

-- Create conversion tracking table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_conversion_events_user 
ON conversion_events(user_id);

CREATE INDEX IF NOT EXISTS idx_conversion_events_type 
ON conversion_events(event_type);

CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription 
ON user_profiles(subscription_tier);

CREATE INDEX IF NOT EXISTS idx_user_profiles_stripe_customer 
ON user_profiles(stripe_customer_id);

-- Enable RLS
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own conversion events"
ON conversion_events FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversion events"
ON conversion_events FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all conversion events"
ON conversion_events FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM user_profiles 
    WHERE role IN ('super_admin', 'admin')
  )
);
```

---

## ☁️ **STEP 3: Deploy Supabase Edge Functions**

### **3.1 Login to Supabase**

```bash
supabase login
```

### **3.2 Link to Your Project**

```bash
cd /Users/jupiter/dev/woodshed/languageacademy
supabase link --project-ref feewuhbtaowgpasszyjp
```

### **3.3 Set Environment Variables**

```bash
# Set Stripe secret key (use your actual key from Stripe dashboard)
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE

# Set Stripe webhook secret (get this after creating webhook endpoint)
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Set base URL (your app URL - use localhost for testing)
supabase secrets set BASE_URL=http://localhost:5173

# For production, update to:
# supabase secrets set BASE_URL=https://languageacademy.io

# Verify secrets are set
supabase secrets list
```

**Note:** Your frontend `.env.local` should have:

```bash
VITE_SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

### **3.4 Deploy Functions**

```bash
# Deploy all three functions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy stripe-portal
```

### **3.5 Verify Deployment**

```bash
# Check function status
supabase functions list
```

You should see:
- ✅ stripe-checkout
- ✅ stripe-webhook  
- ✅ stripe-portal

---

## 🧪 **STEP 4: Testing (Development)**

### **4.1 Test Locally with Stripe CLI**

```bash
# Terminal 1: Start Stripe webhook forwarding
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# Copy the webhook secret (whsec_...) and set it
export STRIPE_WEBHOOK_SECRET=whsec_...

# Terminal 2: Start Supabase functions
supabase functions serve --env-file .env.local

# Terminal 3: Test checkout
curl -X POST http://localhost:54321/functions/v1/stripe-checkout \
  -H "Authorization: Bearer YOUR_SUPABASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_1SrOsHL8WdA5h9THCCzIiwu8","touchpoint":"test"}'
```

### **4.2 Test Webhook Events**

```bash
# Trigger a test checkout.session.completed event
stripe trigger checkout.session.completed
```

### **4.3 Test in Browser**

1. Make sure your `.env.local` has the correct values:
   ```bash
   VITE_SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   ```

2. Run your dev server: `npm run dev`
3. Sign in as a test user
4. Click a locked unit → See pricing modal
5. Click a plan → Should redirect to Stripe Checkout
6. Complete test payment with card: `4242 4242 4242 4242`
7. Check Supabase: `user_profiles.subscription_tier` should update

---

## 🚀 **STEP 5: Production Deployment**

### **5.1 Update Environment Variables**

```bash
# Switch to production Stripe keys
supabase secrets set STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY

# Update webhook secret to production endpoint secret
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_PROD_SECRET

# Update base URL to production
supabase secrets set BASE_URL=https://languageacademy.com
```

### **5.2 Redeploy Functions**

```bash
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy stripe-portal
```

### **5.3 Configure Stripe Webhook (Production)**

1. Go to: https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/stripe-webhook`
3. Select same events as before
4. Copy webhook secret and update: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 🎨 **STEP 6: Frontend Configuration**

### **6.1 Create/Update `.env.local`**

Create a `.env.local` file in your project root with these values:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (Publishable Key - safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# For production, use your live keys:
# VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

**Where to find these keys:**

- **Supabase URL**: Already correct (`feewuhbtaowgpasszyjp.supabase.co`)
- **Supabase Anon Key**: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/settings/api
- **Stripe Publishable Key**: https://dashboard.stripe.com/test/apikeys (use test key first!)

### **6.2 Verify Frontend Can Access Keys**

In your browser console (after running `npm run dev`):

```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
// Should show: https://feewuhbtaowgpasszyjp.supabase.co

console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)  
// Should show: pk_test_...
```

If these are `undefined`, restart your dev server!

---

## ✅ **STEP 7: Verification Checklist**

Test the complete flow:

- [ ] User can sign up/login
- [ ] Unit 1 is accessible (free)
- [ ] Units 2-10 show locks
- [ ] Clicking locked unit shows pricing modal
- [ ] Selecting plan redirects to Stripe Checkout
- [ ] Test payment with `4242 4242 4242 4242`
- [ ] After payment, user redirected back to app
- [ ] `user_profiles.subscription_tier` updated
- [ ] Units 2-10 unlock automatically
- [ ] Completing Unit 1 (lesson 11) shows upgrade prompt
- [ ] Vocabulary dashboard locked for free users
- [ ] "Manage Subscription" button works (paid users)

---

## 🔍 **STEP 8: Monitoring & Debugging**

### **View Edge Function Logs**

```bash
# Real-time logs for checkout
supabase functions logs stripe-checkout

# Real-time logs for webhook
supabase functions logs stripe-webhook

# Real-time logs for portal
supabase functions logs stripe-portal
```

### **Check Stripe Dashboard**

1. **Customers**: https://dashboard.stripe.com/customers
2. **Subscriptions**: https://dashboard.stripe.com/subscriptions
3. **Webhooks**: https://dashboard.stripe.com/webhooks
4. **Logs**: https://dashboard.stripe.com/logs

### **Check Supabase Database**

```sql
-- View all subscriptions
SELECT 
  id, 
  email, 
  subscription_tier, 
  subscription_status,
  subscription_started_at
FROM user_profiles
WHERE subscription_tier != 'free';

-- View conversion events
SELECT 
  event_type, 
  COUNT(*) as count,
  COUNT(CASE WHEN converted THEN 1 END) as converted_count,
  COUNT(CASE WHEN dismissed THEN 1 END) as dismissed_count
FROM conversion_events
GROUP BY event_type;

-- View conversion rates by touchpoint
SELECT 
  event_type,
  COUNT(*) as total_impressions,
  COUNT(CASE WHEN converted THEN 1 END) as conversions,
  ROUND(COUNT(CASE WHEN converted THEN 1 END)::numeric / COUNT(*)::numeric * 100, 2) as conversion_rate
FROM conversion_events
GROUP BY event_type
ORDER BY conversion_rate DESC;
```

---

## 🐛 **COMMON ISSUES & FIXES**

### **Issue: "No authorization header"**

**Fix**: Make sure user is logged in and Supabase session is active.

```javascript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  // Redirect to login
}
```

### **Issue: Edge Function not found**

**Fix**: Verify the function URL is correct:

```
https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/stripe-checkout
```

Check function is deployed:
```bash
supabase functions list
```

### **Issue: "STRIPE_SECRET_KEY not configured"**

**Fix**: Set the secret properly:

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_KEY
```

### **Issue: Webhook not receiving events**

**Fix**: 
1. Check webhook endpoint URL is correct
2. Verify webhook secret matches
3. Check Stripe dashboard webhook logs
4. Ensure Edge Function is deployed

### **Issue: "customer.subscription.created" not firing**

**Fix**: This event may not fire immediately for checkout.session. The `checkout.session.completed` handler already creates the subscription entry.

### **Issue: Payment succeeds but tier not updating**

**Fix**: Check webhook logs:

```bash
supabase functions logs stripe-webhook --tail
```

Look for errors in database updates.

---

## 💰 **STEP 9: Stripe Customer Portal Configuration**

Enable customers to manage their subscriptions:

1. Go to: https://dashboard.stripe.com/settings/billing/portal
2. Configure:
   - ✅ Allow customers to cancel subscriptions
   - ✅ Allow customers to update payment methods
   - ✅ Show pricing table
   - ✅ Allow invoice history
3. Set branding (logo, colors)
4. Save settings

---

## 📊 **STEP 10: Analytics Setup**

Track conversion metrics in Supabase:

```sql
-- Create materialized view for analytics
CREATE MATERIALIZED VIEW conversion_analytics AS
SELECT 
  event_type,
  DATE(shown_at) as date,
  COUNT(*) as impressions,
  COUNT(CASE WHEN converted THEN 1 END) as conversions,
  COUNT(CASE WHEN dismissed THEN 1 END) as dismissals,
  ROUND(COUNT(CASE WHEN converted THEN 1 END)::numeric / COUNT(*)::numeric * 100, 2) as conversion_rate
FROM conversion_events
GROUP BY event_type, DATE(shown_at);

-- Refresh daily
CREATE INDEX idx_conversion_analytics_date ON conversion_analytics(date);
```

---

## 🎯 **SUCCESS METRICS**

Once live, monitor these KPIs:

- **Free → Paid Conversion Rate**: Target 15-25%
- **Unit 1 Complete → Upgrade**: Target 20-30% (highest intent)
- **7-Day Streak → Lifetime**: Target 5-10%
- **Weekly → Annual Upgrade**: Target 30-40% (after 2 weeks)
- **Churn Rate**: Target < 5%/month
- **LTV**: Target > $150 (10x CAC)

---

## 📞 **SUPPORT**

If issues persist:

1. Check Stripe logs: https://dashboard.stripe.com/logs
2. Check Supabase logs: `supabase functions logs`
3. Review webhook events in Stripe dashboard
4. Test with Stripe CLI: `stripe trigger checkout.session.completed`

---

## ✅ **DEPLOYMENT COMPLETE!**

Your conversion system is now live! 🎉

Next steps:
1. Monitor conversion rates
2. A/B test pricing copy
3. Optimize touchpoint timing
4. Add more upgrade prompts (streak, pronunciation limit)

---

**Need help?** Check Stripe docs or Supabase Edge Function docs for more info.
