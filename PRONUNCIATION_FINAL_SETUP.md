# Pronunciation Feature - Final Setup Guide

## ✅ What's Built

1. **UI Component** - Rosetta Stone-style phoneme feedback
2. **Supabase Edge Function** - Secure API proxy
3. **Client Service** - Handles recording and API calls

## 🚀 Setup Steps

### Step 1: Get Azure Credentials

1. Go to https://portal.azure.com
2. Create a **Speech Service** resource
3. Copy **KEY 1** and **Region**

### Step 2: Add Secrets to Supabase

1. Go to your Supabase dashboard
2. Navigate to **Edge Functions** → **Secrets**
3. Add:
   ```
   AZURE_SPEECH_KEY=your_key_here
   AZURE_SPEECH_REGION=eastus
   ```

### Step 3: Deploy the Edge Function

```bash
# Make sure you have Supabase CLI installed
# If not: npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (if not already)
supabase link --project-ref your-project-ref

# Deploy the function
supabase functions deploy pronunciation-assessment
```

### Step 4: Test It!

1. Run your app: `npm run dev`
2. Navigate to: Reference → Pronunciation Test
3. Click Pronunciation section
4. Record yourself saying a French word
5. See the Rosetta Stone-style feedback!

## 🔐 How It's Secure

**Before (BAD):**

- Azure key in `VITE_` variable → exposed in browser bundle
- Anyone can steal your key → charges to your account

**After (GOOD):**

- Azure key in Supabase secrets → server-side only
- Client calls Supabase Edge Function
- Edge Function calls Azure with secret key
- Results returned to client
- **Key never touches the browser**

## 🎯 Architecture

```
Browser
  ↓ (sends audio + text)
Supabase Edge Function
  ↓ (calls with secret key)
Azure Speech Service
  ↓ (returns assessment)
Supabase Edge Function
  ↓ (forwards results)
Browser (shows phoneme bubbles)
```

## 💰 Cost

- **Azure:** ~$0.003 per 8-second recording
- **Supabase Edge Functions:** Free tier covers testing
- **Free tier:** 5 hours/month = ~2,250 recordings

## 🐛 Troubleshooting

### "Azure Speech Service not configured"

- Check Supabase dashboard → Edge Functions → Secrets
- Make sure `AZURE_SPEECH_KEY` is set

### Function not found

- Deploy it: `supabase functions deploy pronunciation-assessment`
- Check deployment status in Supabase dashboard

### Still getting errors

- Check function logs: `supabase functions logs pronunciation-assessment`
- Verify Azure credentials are correct in Supabase dashboard

## ✅ Why This is Better

- ✓ Works with your existing `npm run dev` workflow
- ✓ Uses infrastructure you already have (Supabase)
- ✓ Same pattern as your email functions
- ✓ Can add auth/rate limiting easily
- ✓ Keys secured in Supabase (not Vercel, not .env files)

**No need for `vercel dev` or exposing keys!**



