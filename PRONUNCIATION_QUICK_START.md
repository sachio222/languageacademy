# Pronunciation - Quick Start (Secure)

## ✅ NOW USING SECURE BACKEND

The app is now configured to use the **secure serverless backend** that keeps your API key hidden.

---

## 🚀 Setup for Local Testing

### Option 1: Test with Vercel Dev (Secure)

1. **Add environment variables to Vercel**:

   - Go to https://vercel.com/your-project/settings/environment-variables
   - Add: `AZURE_SPEECH_KEY` = your*key_here (NO VITE* PREFIX!)
   - Add: `AZURE_SPEECH_REGION` = eastus
   - Select all environments (Production, Preview, Development)

2. **Pull environment variables locally**:

   ```bash
   vercel env pull
   ```

3. **Run with Vercel dev**:

   ```bash
   npx vercel dev
   ```

4. **Test the pronunciation feature!**

---

## 🔐 Where Your Keys Go

**❌ DO NOT add to `.env` with VITE\_ prefix** - that exposes them publicly!

**✅ Add to Vercel dashboard** - keeps them server-side only

The serverless function at `/api/pronunciation-assessment.js` will handle Azure API calls securely.

---

## 📝 Quick Summary

- ✅ Switched to secure backend proxy
- ✅ API key stays server-side
- ✅ Use `vercel dev` for local testing
- ✅ Deploy to Vercel for production

Your Azure credentials are now **never exposed to the client**. 🔒



