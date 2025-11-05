import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixBrokenRedirects() {
  console.log('🔧 Fixing broken redirects...\n');

  // Get all redirect entries
  const { data: redirectEntries } = await supabase
    .from('dictionary_words')
    .select('id, word, redirect_to, redirect_type, part_of_speech')
    .not('redirect_to', 'is', null);

  if (!redirectEntries || redirectEntries.length === 0) {
    console.log('No redirect entries found');
    return;
  }

  console.log(`Checking ${redirectEntries.length} redirect entries...\n`);

  let broken = [];
  let fixed = [];

  for (const entry of redirectEntries) {
    if (!entry.redirect_to) continue;

    // Check if target exists
    const { data: target } = await supabase
      .from('dictionary_words')
      .select('id')
      .eq('id', entry.redirect_to)
      .single();

    if (!target) {
      // Target doesn't exist - check if target word exists with new ID format
      // Extract word from redirect_to (handle formats like "word-fr" or just "word")
      let targetWord = entry.redirect_to.replace('-fr', '');
      
      const { data: altTargets } = await supabase
        .from('dictionary_words')
        .select('id, word, part_of_speech')
        .eq('word', targetWord);

      if (altTargets && altTargets.length > 0) {
        // Find the best match based on redirect_type
        let bestMatch = null;

        if (entry.redirect_type === 'feminine_form' || entry.redirect_type === 'feminine_plural') {
          // For feminine forms, prefer adjective
          bestMatch = altTargets.find(t => t.part_of_speech === 'adjective') || altTargets[0];
        } else if (entry.redirect_type === 'masculine_form' || entry.redirect_type === 'masculine_plural') {
          bestMatch = altTargets.find(t => t.part_of_speech === 'adjective') || altTargets[0];
        } else if (entry.redirect_type === 'conjugation' || entry.redirect_type === 'conjugated_form') {
          // For conjugations, prefer verb
          bestMatch = altTargets.find(t => t.part_of_speech === 'verb') || altTargets[0];
        } else {
          bestMatch = altTargets[0];
        }

        if (bestMatch) {
          broken.push({
            id: entry.id,
            old_target: entry.redirect_to,
            new_target: bestMatch.id,
            redirect_type: entry.redirect_type,
          });
        }
      }
    } else {
      fixed.push(entry.id);
    }
  }

  console.log(`Found ${broken.length} broken redirects to fix:\n`);
  broken.forEach((b) => {
    console.log(`  ${b.id} → ${b.old_target} (broken) → ${b.new_target} (fix)`);
  });

  if (broken.length === 0) {
    console.log('\n✅ All redirects are correct!');
    return;
  }

  console.log(`\n📝 Updating ${broken.length} redirects...\n`);

  let updated = 0;
  let errors = 0;

  for (const b of broken) {
    const { error } = await supabase
      .from('dictionary_words')
      .update({ redirect_to: b.new_target })
      .eq('id', b.id);

    if (error) {
      console.error(`❌ ${b.id}: ${error.message}`);
      errors++;
    } else {
      updated++;
      console.log(`✅ ${b.id} → ${b.new_target}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Already correct: ${fixed.length}`);
}

fixBrokenRedirects().catch(console.error);

