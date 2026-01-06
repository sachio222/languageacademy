# Pronunciation Feature - Security Guide

## ⚠️ Security Issue: Client-Side API Keys

**You identified a critical security issue!** Using `VITE_` prefix exposes your Azure API key in the client-side bundle, making it publicly accessible.

## 🔐 Secure Solution: Backend Proxy

I've created a **serverless function** that keeps your Azure key secure on the server.

### Files Created:

1. **`api/pronunciation-assessment.js`** - Serverless backend proxy
2. **`src/services/pronunciationService.secure.js`** - Secure client service

---

## 🚀 Setup for Vercel (Recommended)

### Step 1: Add Environment Variables to Vercel

**DO NOT use VITE\_ prefix in Vercel!**

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
AZURE_SPEECH_KEY=your_azure_key_here
AZURE_SPEECH_REGION=eastus
```

**Important:**

- No `VITE_` prefix (keeps them server-side only)
- Add for all environments (Production, Preview, Development)

### Step 2: Update Your Local .env for Testing

For **local testing only**, you can still use client-side (insecure):

```bash
# .env - FOR LOCAL TESTING ONLY
VITE_AZURE_SPEECH_KEY=your_key_here
VITE_AZURE_SPEECH_REGION=eastus
```

**⚠️ Never commit this file to git!**

### Step 3: Choose Your Service

**Option A: Use Secure Backend (Production)**

Update `PronunciationMode.jsx`:

```javascript
// Change this line:
import { assessPronunciation, ... } from '../services/pronunciationService';

// To this:
import { assessPronunciation, ... } from '../services/pronunciationService.secure';
```

**Option B: Use Client-Side (Local Testing Only)**

Keep the current import - but **only for local testing**!

```javascript
// Current (INSECURE - testing only):
import { assessPronunciation, ... } from '../services/pronunciationService';
```

---

## 📋 Quick Test Setup

### For Immediate Testing (Insecure - Local Only):

1. Add to `.env` (will be ignored by git):

   ```bash
   VITE_AZURE_SPEECH_KEY=your_key_here
   VITE_AZURE_SPEECH_REGION=eastus
   ```

2. Restart dev server:

   ```bash
   npm run dev
   ```

3. Test the pronunciation module!

4. **Before deploying to production**: Switch to secure backend service

---

## 🔒 Why This Matters

### Client-Side Exposure (VITE\_):

- ❌ API key visible in browser DevTools
- ❌ Anyone can copy your key from the JavaScript bundle
- ❌ Risk of unauthorized usage and charges
- ❌ Rate limiting can't be enforced

### Server-Side Proxy:

- ✅ API key never sent to client
- ✅ Secure environment variables
- ✅ Can add rate limiting
- ✅ Can add authentication checks
- ✅ Full control over API usage

---

## 🎯 Production Deployment Checklist

- [ ] Add `AZURE_SPEECH_KEY` to Vercel environment variables (no VITE\_ prefix)
- [ ] Add `AZURE_SPEECH_REGION` to Vercel environment variables
- [ ] Update import in `PronunciationMode.jsx` to use `.secure` version
- [ ] Remove `VITE_AZURE_SPEECH_KEY` from `.env` (if exists)
- [ ] Test the API endpoint: `/api/pronunciation-assessment`
- [ ] Deploy to Vercel
- [ ] Verify pronunciation works in production

---

## 🧪 Testing

### Test the Secure Backend Locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally with serverless functions
vercel dev
```

Then test the pronunciation feature - it will use the secure backend!

---

## 💰 Cost Control

Add rate limiting to the serverless function:

```javascript
// api/pronunciation-assessment.js

// Add at top
const rateLimit = {}; // Simple in-memory rate limiting

export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Rate limit: 10 requests per minute per IP
  const now = Date.now();
  if (!rateLimit[ip]) rateLimit[ip] = [];

  // Clean old entries
  rateLimit[ip] = rateLimit[ip].filter((time) => now - time < 60000);

  if (rateLimit[ip].length >= 10) {
    return res.status(429).json({
      error: "Too many requests. Please wait a moment.",
    });
  }

  rateLimit[ip].push(now);

  // ... rest of code
}
```

---

## Summary

1. **For testing now**: Use client-side with `VITE_` (insecure but works)
2. **For production**: Use serverless backend (secure)
3. **Premium flag**: I've disabled it so you can test immediately!

The pronunciation feature is now **ready to test** - just add your key to `.env` and restart the dev server!



