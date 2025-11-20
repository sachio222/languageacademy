#!/usr/bin/env node

/**
 * Test n8n Webhook Connection
 * Run this to test your webhook setup before using it in the app
 */

//test

// Load environment variables from .env file
import { config } from "dotenv";
config();

const webhookUrl = process.env.VITE_N8N_MODULE_COMPLETION_WEBHOOK;

console.log("🧪 Testing n8n Webhook Connection");
console.log("=====================================");

if (!webhookUrl) {
  console.error("❌ VITE_N8N_MODULE_COMPLETION_WEBHOOK not set in .env file");
  console.log("\nAdd this to your .env file:");
  console.log(
    "VITE_N8N_MODULE_COMPLETION_WEBHOOK=https://your-n8n-instance.com/webhook/module-completion"
  );
  process.exit(1);
}

console.log(`🔗 Webhook URL: ${webhookUrl}`);

// Test payload
const testPayload = {
  user_id: "test-user-123",
  email: "jake.krajewski@gmail.com",
  name: "Test User",
  module_id: 1,
  exam_score: 92,
  completed_at: new Date().toISOString(),
  modules_completed: 5,
};

console.log("📤 Sending test payload...");
console.log(JSON.stringify(testPayload, null, 2));

try {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testPayload),
  });

  console.log(`\n📥 Response: ${response.status} ${response.statusText}`);

  if (response.ok) {
    console.log("✅ Webhook test successful!");
    const responseText = await response.text();
    if (responseText) {
      console.log("Response body:", responseText);
    }
  } else {
    console.log("❌ Webhook test failed");
    const errorText = await response
      .text()
      .catch(() => "Unable to read error response");
    console.log("Error details:", errorText);
  }
} catch (error) {
  console.log("\n❌ Webhook test failed with error:");

  if (error.message.includes("Failed to fetch")) {
    console.log("🔍 Network Error - Possible causes:");
    console.log("   • Webhook URL is incorrect");
    console.log("   • n8n instance is not running");
    console.log("   • CORS issues (if testing from browser)");
    console.log("   • Firewall blocking the request");
  } else if (error.name === "AbortError") {
    console.log("⏰ Timeout Error - n8n instance may be slow or unreachable");
  } else {
    console.log("🐛 Unexpected Error:", error.message);
  }

  console.log("\n🔧 Troubleshooting steps:");
  console.log("1. Check that your n8n instance is running");
  console.log("2. Verify the webhook URL is correct");
  console.log("3. Test the webhook URL in a browser or Postman");
  console.log("4. Check n8n logs for any errors");
}
