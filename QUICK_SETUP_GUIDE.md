# Quick Setup Guide - Get Your App Running in 10 Minutes

## 🚀 Step 1: Create Supabase Project (5 minutes)

1. **Go to [supabase.com](https://supabase.com) and sign up/login**

2. **Click "New Project"**

   - Organization: Choose or create one
   - Name: `language-academy` (or your preferred name)
   - Database Password: Generate a secure password
   - Region: Choose closest to you
   - Click "Create new project"

3. **Wait for project to initialize** (2-3 minutes)

4. **Get your credentials:**

   - Go to Settings → API
   - Copy the **Project URL** and **anon public key**

5. **Set up the database:**
   - Go to SQL Editor
   - Copy and paste the entire contents of `database-schema.sql`
   - Click "Run" to create all tables and security policies

## 🔐 Step 2: Create Clerk Project (3 minutes)

1. **Go to [clerk.com](https://clerk.com) and sign up/login**

2. **Click "Add application"**

   - Name: `Language Academy`
   - Choose authentication methods:
     - ✅ Email/Password
     - ✅ Google (recommended)
     - ✅ Facebook (optional)
   - Click "Create application"

3. **Get your publishable key:**
   - In the dashboard, go to API Keys
   - Copy the **Publishable key** (starts with `pk_`)

## ⚙️ Step 3: Update Environment Variables (1 minute)

1. **Open the `.env` file in your project root**

2. **Replace the placeholder values:**

   ```bash
   # Replace with your actual Supabase values
   VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here

   # Replace with your actual Clerk value
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-actual-publishable-key
   ```

3. **Save the file**

## 🎯 Step 4: Test the App (1 minute)

1. **Restart your development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser** - the app should now load without errors

3. **Test authentication:**
   - You should see a sign-up/sign-in form
   - Create a test account
   - Verify you can access the lesson content

## ✅ You're Done!

Your app now has:

- ✅ User authentication (Clerk)
- ✅ Progress tracking (Supabase)
- ✅ Real-time sync across devices
- ✅ Offline support
- ✅ Analytics tracking

## 🐛 Troubleshooting

### Still getting environment variable errors?

- Make sure `.env` is in your project root (same level as `package.json`)
- Check that variable names are exactly correct (including `VITE_` prefix)
- Restart your dev server after changing `.env`

### Supabase connection issues?

- Verify your project URL and anon key are correct
- Make sure you ran the `database-schema.sql` script
- Check Supabase project status (should be "Active")

### Clerk authentication not working?

- Verify your publishable key is correct
- Check that you enabled the authentication methods you want
- Look at browser console for specific error messages

## 🎓 What Happens Next?

Once this is working, users will:

1. **Sign up/Login** → Creates account in both Clerk and Supabase
2. **Complete exercises** → Progress saved to database in real-time
3. **Go offline** → Progress queued and synced when back online
4. **Switch devices** → Progress syncs automatically
5. **View analytics** → Track learning streaks, time spent, accuracy

Need help? The complete implementation is ready - you just need to configure these two services!
