# Clerk + Supabase Setup - Final Steps

## ✅ Code is Ready! Now Configure Services

### Step 1: Create Clerk JWT Template (2 minutes)

1. Go to **Clerk Dashboard**: https://dashboard.clerk.com/apps
2. Select your app: `solid-wombat-53`
3. Go to **Configure** → **JWT Templates**
4. Click **New template** (+ button)
5. Fill in:
   - **Name**: `supabase` (MUST be exactly this)
   - **Token lifetime**: 3600
   - **Claims**: Add these JSON claims:
   ```json
   {
     "aud": "authenticated",
     "role": "authenticated"
   }
   ```
6. **Save**

### Step 2: Run Schema in Supabase (1 minute)

1. Open SQL Editor: https://supabase.com/dashboard/project/feewuhbtaowgpasszyjp/sql/new
2. Copy the contents of `schema-with-clerk-rls.sql`
3. Paste and click **Run**
4. Wait for success message

### Step 3: Turn OFF Dev Mode (30 seconds)

Edit your `.env` file:

```bash
# Change this line:
VITE_DEV_MODE=false  # <-- Set to false
```

### Step 4: Restart and Test (1 minute)

```bash
npm run dev
```

You should now see:

- ✅ Clerk login screen
- ✅ Sign up with Google/Facebook/Email
- ✅ Progress saves to Supabase with RLS
- ✅ Real-time sync across devices

## What Happens Next

1. **User signs up with Clerk** → Clerk creates account
2. **Our app gets Clerk JWT** → Includes user ID
3. **JWT sent to Supabase** → RLS checks `auth.jwt() ->> 'sub'`
4. **User profile created** → Stored in `user_profiles` table
5. **Progress tracked** → All data tied to that user with RLS

## Troubleshooting

### "JWT invalid" or RLS blocking writes?

- Make sure JWT template is named exactly "supabase"
- Check that claims include `aud: "authenticated"` and `role: "authenticated"`
- Verify schema ran successfully in Supabase

### Sign in not working?

- Make sure `VITE_DEV_MODE=false`
- Check Clerk publishable key in `.env`
- Verify Clerk app has Google/Facebook enabled

### Progress not saving?

- Check browser console for errors
- Verify RLS policies exist in Supabase (Table Editor → click table → Policies tab)
- Test that Clerk user ID matches `clerk_user_id` in user_profiles

You're almost there! Just these 3 config steps and you're done!
