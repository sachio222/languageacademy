/**
 * ONE-TIME FIX: Recalculate Streaks for All Users
 * 
 * This script fixes the frozen streak issue caused by commit abfaff5.
 * Run this once after deploying the code fix.
 * 
 * Usage:
 *   node fix-all-streaks.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Recalculate streak for a single user using the existing RPC function
 */
async function recalculateUserStreak(userId, userEmail) {
  try {
    // The get_session_dates RPC already exists and uses the fixed timezone logic
    const { data: dateData, error: dateError } = await supabase.rpc(
      'get_session_dates',
      { p_user_id: userId }
    );

    if (dateError) {
      console.error(`  ❌ Error getting dates for ${userEmail}:`, dateError.message);
      return { success: false, error: dateError };
    }

    // Calculate streak using the same logic as useStreak.js
    const uniqueDates = dateData.map((row) => row.session_date);
    
    const getLocalDateString = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    let streak = 0;
    const today = getLocalDateString(new Date());
    let startDay = 0;

    // Grace period: if user hasn't studied today, check from yesterday
    if (!uniqueDates.includes(today)) {
      startDay = 1;
    }

    for (let i = startDay; i < 365; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const expectedDate = getLocalDateString(checkDate);

      if (uniqueDates.includes(expectedDate)) {
        streak++;
      } else {
        break;
      }
    }

    // Update user's streak
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ streak_days: streak })
      .eq('id', userId);

    if (updateError) {
      console.error(`  ❌ Error updating ${userEmail}:`, updateError.message);
      return { success: false, error: updateError };
    }

    return { success: true, streak };
  } catch (err) {
    console.error(`  ❌ Error processing ${userEmail}:`, err.message);
    return { success: false, error: err };
  }
}

/**
 * Main function to recalculate all users' streaks
 */
async function fixAllStreaks() {
  console.log('🔧 Starting streak recalculation for all users...\n');

  // Get all users
  const { data: users, error: fetchError } = await supabase
    .from('user_profiles')
    .select('id, email, first_name, streak_days');

  if (fetchError) {
    console.error('❌ Error fetching users:', fetchError);
    process.exit(1);
  }

  console.log(`Found ${users.length} users\n`);

  let successCount = 0;
  let errorCount = 0;
  let unchangedCount = 0;
  const changes = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const displayName = user.email || user.first_name || `User ${i + 1}`;
    const oldStreak = user.streak_days || 0;

    process.stdout.write(`[${i + 1}/${users.length}] ${displayName}... `);

    const result = await recalculateUserStreak(user.id, displayName);

    if (result.success) {
      const newStreak = result.streak;
      if (oldStreak !== newStreak) {
        console.log(`✅ ${oldStreak} → ${newStreak} days`);
        successCount++;
        changes.push({
          user: displayName,
          old: oldStreak,
          new: newStreak,
          change: newStreak - oldStreak
        });
      } else {
        console.log(`✓ unchanged (${oldStreak} days)`);
        unchangedCount++;
      }
    } else {
      console.log(`❌ failed`);
      errorCount++;
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTS:');
  console.log('='.repeat(50));
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`✓  Unchanged: ${unchangedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📈 Total processed: ${users.length}`);

  if (changes.length > 0) {
    console.log('\n📋 CHANGES SUMMARY:');
    console.log('='.repeat(50));
    
    // Sort by biggest change
    changes.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
    
    changes.slice(0, 10).forEach(c => {
      const changeStr = c.change > 0 ? `+${c.change}` : c.change;
      console.log(`  ${c.user}: ${c.old} → ${c.new} (${changeStr})`);
    });

    if (changes.length > 10) {
      console.log(`  ... and ${changes.length - 10} more`);
    }
  }

  console.log('\n✅ Done! All streaks have been recalculated.\n');
}

// Run the fix
fixAllStreaks().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

