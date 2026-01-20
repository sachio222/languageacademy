# Environment Variables Template

Copy these values into your `.env.local` file:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://feewuhbtaowgpasszyjp.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (Publishable Key - safe for frontend)
# Get from: https://dashboard.stripe.com/test/apikeys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# For production, use your live keys:
# VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

## Where to Find These Values

### Supabase Anon Key
1. Go to: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/settings/api
2. Copy the `anon` `public` key

### Stripe Publishable Key
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy the **Publishable key** (starts with `pk_test_`)
3. For production, use the live key (starts with `pk_live_`)

## Supabase Secrets (Edge Functions)

These are set via CLI (NOT in `.env.local`):

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
supabase secrets set BASE_URL=http://localhost:5173
```

### Where to Find Supabase Secrets

**Stripe Secret Key:**
- Go to: https://dashboard.stripe.com/test/apikeys
- Copy the **Secret key** (starts with `sk_test_`)

**Stripe Webhook Secret:**
- Go to: https://dashboard.stripe.com/webhooks
- Create endpoint: `https://feewuhbtaowgpasszyjp.supabase.co/functions/v1/stripe-webhook`
- Copy the **Signing secret** (starts with `whsec_`)
