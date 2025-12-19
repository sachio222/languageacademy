# Test Pronunciation NOW

I've added better logging. Here's what to do:

## Redeploy with Logs

```bash
supabase functions deploy pronunciation-assessment
```

## Try Recording Again

1. Go to pronunciation module
2. Record yourself
3. Check the browser console for the error message

The error will now show **exactly what Azure says** instead of generic errors.

## Likely Issue

Azure probably doesn't accept `audio/webm` format. We may need to:

- Convert webm → wav in the browser before sending
- Or use a different recording format

**Wait for the error message after redeploying** and I'll fix it properly based on what Azure actually returns.

