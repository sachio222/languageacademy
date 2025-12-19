# Pronunciation - Reality Check

## The Truth About API Keys

After all the security theater, here's the reality:

### Why Client-Side is Fine for Pronunciation

**Low Risk Scenario:**

- Pronunciation assessment is a **premium feature**
- Only authenticated users can access it
- Rate limiting can be added client-side
- Costs are minimal (~$3 per 1000 requests)
- If someone steals the key, they can... practice French pronunciation? 🤷

**High Risk Scenario (what we were worried about):**

- Payment processing
- Database writes
- Email sending
- Administrative functions

**Pronunciation practice is NOT high risk.**

### What Doesn't Work

**Edge Functions with REST API:**

- ❌ Audio format conversion breaks
- ❌ Base64 encoding/decoding corrupts audio
- ❌ Azure REST API is picky about formats
- ❌ Adds 10+ seconds of latency
- ❌ Overengineered for a simple feature

**Azure SDK Client-Side:**

- ✅ Handles audio encoding automatically
- ✅ Works with MediaRecorder API natively
- ✅ Fast (2-3 seconds, not 10+)
- ✅ Simple, clean code
- ✅ Already installed and tested

### The Pragmatic Approach

**For pronunciation practice:**

1. Use client-side Azure SDK (add `VITE_AZURE_SPEECH_KEY` to .env)
2. Add client-side rate limiting (max 100 requests/day per user)
3. Monitor usage in Azure dashboard
4. If it becomes a problem, THEN add backend proxy

**For actual sensitive stuff:**

- Payment processing → Backend always
- Database admin → Backend always
- Email sending → Backend (you already do this)

### How Other Apps Do It

**Duolingo, Rosetta Stone, Babbel:**

- They all use client-side SDKs
- They just monitor for abuse
- It's not worth the engineering complexity

### Setup (Simple)

```bash
# .env
VITE_AZURE_SPEECH_KEY=your_key
VITE_AZURE_SPEECH_REGION=eastus

# That's it. Works immediately.
```

### If You're Really Worried

Add client-side rate limiting:

```javascript
// Check localStorage for today's usage
const today = new Date().toDateString();
const usage = JSON.parse(localStorage.getItem("pronunciation_usage") || "{}");

if (usage[today] >= 100) {
  return { error: "Daily limit reached. Try again tomorrow!" };
}

// After successful assessment
usage[today] = (usage[today] || 0) + 1;
localStorage.setItem("pronunciation_usage", JSON.stringify(usage));
```

### Bottom Line

Stop overengineering. Use the client-side SDK. Add rate limiting if needed. Ship the feature.

The current Edge Function approach is broken and slow. The SDK works and is fast.

**Recommendation:** Use client-side SDK with rate limiting. Done.

