/**
 * Send WOTD Announcement Email to ALL Users
 * This is a ONE-TIME mass mailing to announce the WOTD feature
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Supabase configuration
const SUPABASE_URL = "https://feewuhbtaowgpasszyjp.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "❌ Error: SUPABASE_SERVICE_ROLE_KEY not found in environment variables"
  );
  console.log("\nFor admin operations, you need the service role key:");
  console.log("Add to your .env file: SUPABASE_SERVICE_ROLE_KEY=your_key\n");
  console.log(
    "Get it from: Supabase Dashboard > Settings > API > service_role key\n"
  );
  process.exit(1);
}

if (!SUPABASE_ANON_KEY) {
  console.error(
    "❌ Error: SUPABASE_ANON_KEY not found in environment variables"
  );
  console.log("\nPlease set VITE_SUPABASE_ANON_KEY in your .env file\n");
  process.exit(1);
}

// Use service role key for admin operations (bypasses RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Add delay between emails to avoid rate limits
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendAnnouncementToAllUsers() {
  try {
    console.log("📧 WOTD Announcement - Mass Email Campaign\n");
    console.log(
      "⚠️  WARNING: This will send emails to ALL users with email addresses"
    );
    console.log("⚠️  Make sure you want to proceed!\n");

    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      "docs/email-system/templates/wotd-announcement.html"
    );
    const htmlContent = fs.readFileSync(templatePath, "utf8");

    // Get all users with email addresses
    console.log("📊 Fetching all users with email addresses...\n");
    const { data: users, error: fetchError } = await supabase
      .from("user_profiles")
      .select("id, email, first_name")
      .not("email", "is", null);

    if (fetchError) {
      console.error("❌ Error fetching users:", fetchError);
      process.exit(1);
    }

    if (!users || users.length === 0) {
      console.log("⚠️  No users found with email addresses");
      process.exit(0);
    }

    console.log(`✅ Found ${users.length} users with email addresses\n`);
    console.log("Users to email:");
    users.forEach((user, i) => {
      console.log(
        `  ${i + 1}. ${user.email}${
          user.first_name ? ` (${user.first_name})` : ""
        }`
      );
    });

    console.log("\n⏸️  Pausing for 5 seconds... Press Ctrl+C to cancel\n");
    await delay(5000);

    // Send emails
    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    console.log("🚀 Starting email campaign...\n");

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const progress = `[${i + 1}/${users.length}]`;

      try {
        console.log(`${progress} Sending to ${user.email}...`);

        const response = await fetch(
          `${SUPABASE_URL}/functions/v1/send-resend-email`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`, // Edge function uses anon key
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: user.email,
              subject: "🇫🇷 Introducing: Your Daily French Word",
              html: htmlContent,
              email_type: "announcement",
              user_id: user.id,
              metadata: {
                campaign: "wotd_launch_announcement",
                first_name: user.first_name,
                date: new Date().toISOString(),
              },
            }),
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          console.log(`${progress} ✅ Sent successfully`);
          successCount++;
        } else {
          console.log(
            `${progress} ❌ Failed: ${
              result.reason || result.error || "Unknown error"
            }`
          );
          failureCount++;
          failures.push({
            email: user.email,
            error: result.reason || result.error,
          });
        }

        // Wait 100ms between emails to avoid rate limits
        if (i < users.length - 1) {
          await delay(100);
        }
      } catch (error) {
        console.log(`${progress} ❌ Error: ${error.message}`);
        failureCount++;
        failures.push({ email: user.email, error: error.message });
      }
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 CAMPAIGN SUMMARY");
    console.log("=".repeat(50));
    console.log(`Total users:      ${users.length}`);
    console.log(`✅ Successful:     ${successCount}`);
    console.log(`❌ Failed:         ${failureCount}`);
    console.log("=".repeat(50));

    if (failures.length > 0) {
      console.log("\n❌ Failed emails:");
      failures.forEach(({ email, error }) => {
        console.log(`  - ${email}: ${error}`);
      });
    }

    console.log("\n✨ Campaign complete!\n");
  } catch (error) {
    console.error("❌ Unexpected error:", error.message);
    console.error("   Stack:", error.stack);
    process.exit(1);
  }
}

// Run the campaign
sendAnnouncementToAllUsers();
