# Pronunciation Assessment Edge Function

Supabase Edge Function that securely handles Azure Speech Service API calls.

## Setup

### 1. Add Environment Variables to Supabase

Go to your Supabase project dashboard:

- **Settings** → **Edge Functions** → **Secrets**
- Add these secrets:

```
AZURE_SPEECH_KEY=your_azure_key_here
AZURE_SPEECH_REGION=eastus
```

### 2. Deploy the Function

```bash
# Deploy to Supabase
supabase functions deploy pronunciation-assessment

# Or deploy all functions
supabase functions deploy
```

### 3. Test Locally (Optional)

```bash
# Serve locally with Supabase CLI
supabase functions serve pronunciation-assessment --env-file .env.local

# In another terminal, test it:
curl -i --location --request POST 'http://localhost:54321/functions/v1/pronunciation-assessment' \
  --header 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"audioData":"base64_audio_here","referenceText":"bonjour"}'
```

## How It Works

1. Client sends audio (base64) + reference text to Supabase Edge Function
2. Edge Function calls Azure Speech Service with secret key
3. Azure returns pronunciation assessment
4. Edge Function returns results to client

**Result:** Azure key never exposed to browser!

## Authentication

Currently allows any authenticated Supabase user. You can add rate limiting:

```typescript
// Check user from JWT
const authHeader = req.headers.get("Authorization");
const token = authHeader?.replace("Bearer ", "");
const {
  data: { user },
} = await supabaseAdmin.auth.getUser(token);

if (!user) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
}

// Add rate limiting per user_id here
```

## Cost Control

Azure charges per request. Consider:

- Rate limiting per user (e.g., 100 requests/day)
- Usage tracking in Supabase
- Free tier: 5 hours/month (~2,250 requests)

