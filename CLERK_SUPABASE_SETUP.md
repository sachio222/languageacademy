# Clerk + Supabase RLS Integration Setup

## Current Status

- ✅ Clerk is configured
- ✅ Supabase tables created (without RLS)
- ⏳ Need to enable Clerk + Supabase integration

## Step-by-Step Setup

### 1. Enable Supabase Integration in Clerk

1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to **Configure** → **Integrations**
4. Find **Supabase** and click it
5. Enable the integration
6. Copy the **JWT Template** name (usually "supabase")

### 2. Configure Supabase to Accept Clerk JWTs

**Option A: Using Supabase Dashboard**

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Scroll down to find Third-party auth providers
3. Add your Clerk issuer URL: `https://solid-wombat-53.clerk.accounts.dev`

**Option B: Using SQL (If UI not available)**
Run this in Supabase SQL Editor:

```sql
-- This allows Clerk JWTs to be validated
-- (Supabase automatically validates JWTs from configured issuers)
```

### 3. Create JWT Template in Clerk

1. In Clerk Dashboard → **Configure** → **JWT Templates**
2. Click **New template**
3. Name it: `supabase`
4. Set these claims:

```json
{
  "aud": "authenticated",
  "role": "authenticated"
}
```

5. Save

### 4. Run the Schema with RLS

Now run `schema-with-clerk-rls.sql` in Supabase SQL Editor.

The RLS policies check `auth.uid()` which will be populated from Clerk's JWT.

### 5. Test It

1. Restart your app
2. Sign in with Clerk
3. Complete an exercise
4. Check Supabase → **Authentication** → **Users** to see your Clerk user
5. Check **Table Editor** to see data being saved

## Troubleshooting

### "JWT invalid" errors

- Make sure the JWT template in Clerk is named "supabase"
- Verify Clerk issuer is added to Supabase auth providers

### RLS blocks writes

- Check that `auth.uid()` returns your Clerk user ID
- Run in SQL Editor: `SELECT auth.uid();` while authenticated

### No data showing up

- Check browser console for errors
- Verify Clerk session is active: Check `useUser()` hook
