/**
 * One-time migration script to convert all existing exercise IDs to moduleKey format
 * This eliminates the need for ongoing mapping and makes the system truly future-proof
 */

import { createClient } from "@supabase/supabase-js";
import { completeModuleIdToKeyMapping } from "./complete-mapping.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// You'll need to set these environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key for admin operations

// Debug: Show what we found
console.log("🔍 Environment check:");
console.log(`   VITE_SUPABASE_URL: ${supabaseUrl ? '✅ Found' : '❌ Missing'}`);
console.log(`   SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ Found' : '❌ Missing'}`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("\n❌ Missing Supabase credentials.");
  console.error("Make sure your .env file contains:");
  console.error("   VITE_SUPABASE_URL=your-supabase-url");
  console.error("   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateExerciseIds() {
  console.log("🚀 Starting exercise ID migration...\n");

  try {
    // Get all exercise completions with old numeric IDs
    const { data: completions, error: fetchError } = await supabase
      .from("exercise_completions")
      .select("id, exercise_id, module_id, user_id")
      .like("exercise_id", "%.%") // All exercise IDs contain a dot
      .order("completed_at", { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch completions: ${fetchError.message}`);
    }

    console.log(`📊 Found ${completions.length} exercise completions to check`);

    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const completion of completions) {
      const { id, exercise_id, user_id } = completion;

      // Check if this is an old numeric format (e.g., "8.1")
      const isOldFormat = /^\d+\.\d+$/.test(exercise_id);

      if (!isOldFormat) {
        skippedCount++;
        continue; // Already in new format
      }

      // Convert old ID to new moduleKey format
      const [moduleIdStr, exerciseIndex] = exercise_id.split(".");
      const moduleId = parseInt(moduleIdStr);
        const moduleKey = completeModuleIdToKeyMapping[moduleId];

      if (!moduleKey) {
        console.warn(
          `⚠️  No mapping found for module ID ${moduleId} (exercise ${exercise_id})`
        );
        errorCount++;
        continue;
      }

      const newExerciseId = `${moduleKey}.${exerciseIndex}`;

      // Update the exercise completion record
      const { error: updateError } = await supabase
        .from("exercise_completions")
        .update({ exercise_id: newExerciseId })
        .eq("id", id);

      if (updateError) {
        console.error(
          `❌ Failed to update completion ${id}: ${updateError.message}`
        );
        errorCount++;
      } else {
        migratedCount++;
        if (migratedCount % 10 === 0) {
          console.log(`   ✅ Migrated ${migratedCount} records...`);
        }
      }
    }

    console.log("\n🎉 Migration complete!");
    console.log(`   ✅ Migrated: ${migratedCount} records`);
    console.log(`   ⏭️  Skipped: ${skippedCount} records (already new format)`);
    console.log(`   ❌ Errors: ${errorCount} records`);

    if (errorCount === 0) {
      console.log(
        "\n🚀 All exercise IDs successfully migrated to moduleKey format!"
      );
      console.log("   • Future modules will work seamlessly");
      console.log("   • No more mapping table needed");
      console.log("   • System is now truly future-proof");
    } else {
      console.log(
        `\n⚠️  Migration completed with ${errorCount} errors. Check logs above.`
      );
    }
  } catch (error) {
    console.error("💥 Migration failed:", error.message);
    process.exit(1);
  }
}

// Run migration
migrateExerciseIds();
