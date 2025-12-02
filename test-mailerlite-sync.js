#!/usr/bin/env node

/**
 * Test MailerLite Sync Edge Function
 * Run this to test the sync-to-mailerlite Edge Function
 */

// Load environment variables from .env file
import { config } from "dotenv";
config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const MAILERLITE_GROUP_ID = process.env.VITE_MAILERLITE_ALL_USERS_GROUP;

console.log("🧪 Testing MailerLite Sync Edge Function");
console.log("==========================================");

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing Supabase environment variables");
  console.log("\nRequired in .env file:");
  console.log("VITE_SUPABASE_URL=your_supabase_url");
  console.log("VITE_SUPABASE_ANON_KEY=your_anon_key");
  process.exit(1);
}

if (!MAILERLITE_GROUP_ID) {
  console.warn("⚠️  VITE_MAILERLITE_ALL_USERS_GROUP not set - test will run without group assignment");
}

const edgeFunctionUrl = `${SUPABASE_URL}/functions/v1/sync-to-mailerlite`;

console.log(`🔗 Edge Function URL: ${edgeFunctionUrl}`);
if (MAILERLITE_GROUP_ID) {
  console.log(`📋 MailerLite Group ID: ${MAILERLITE_GROUP_ID}`);
}

// Test payload - simulating a new user signup
const testPayload = {
  event: "signup",
  user_id: "test-user-" + Date.now(), // Unique test user ID
  email: "campcycle@yahoo.com",
  name: "Test User",
  metadata: {
    group_id: MAILERLITE_GROUP_ID ? Number(MAILERLITE_GROUP_ID) : undefined
  }
};

console.log("\n📤 Sending test payload...");
console.log(JSON.stringify(testPayload, null, 2));

try {
  const response = await fetch(edgeFunctionUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testPayload),
  });

  console.log(`\n📥 Response: ${response.status} ${response.statusText}`);

  const result = await response.json();
  console.log("\nResponse body:");
  console.log(JSON.stringify(result, null, 2));

  if (response.ok && result.success) {
    console.log("\n✅ MailerLite sync test successful!");
    console.log(`📧 Email ${testPayload.email} should be added to MailerLite`);
    console.log("\nNext steps:");
    console.log("1. Check MailerLite dashboard for the new subscriber");
    console.log("2. Verify the subscriber is in the 'All Users' group");
    console.log("3. Check if welcome email automation triggered (if configured)");
  } else if (result.skipped && result.reason === "mailerlite_not_configured") {
    console.log("\n⚠️  MailerLite API key not configured");
    console.log("\nTo fix:");
    console.log("1. Go to Supabase Dashboard → Edge Functions → Secrets");
    console.log("2. Add: MAILERLITE_API_KEY=your_mailerlite_api_key");
    console.log("3. Redeploy the Edge Function if needed");
  } else {
    console.log("\n❌ MailerLite sync test failed");
    if (result.error) {
      console.log("Error details:", result.error);
    }
  }
} catch (error) {
  console.log("\n❌ Test failed with error:");

  if (error.message.includes("Failed to fetch")) {
    console.log("🔍 Network Error - Possible causes:");
    console.log("   • Edge Function not deployed");
    console.log("   • Supabase URL is incorrect");
    console.log("   • CORS issues");
    console.log("   • Firewall blocking the request");
  } else if (error.name === "AbortError") {
    console.log("⏰ Timeout Error - Edge Function may be slow or unreachable");
  } else {
    console.log("🐛 Unexpected Error:", error.message);
  }

  console.log("\n🔧 Troubleshooting steps:");
  console.log("1. Verify Edge Function is deployed:");
  console.log("   supabase functions deploy sync-to-mailerlite");
  console.log("2. Check Supabase Dashboard → Edge Functions → Logs");
  console.log("3. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
  console.log("4. Test the Edge Function URL in a browser or Postman");
}

