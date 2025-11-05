#!/usr/bin/env node

/**
 * Sync tense/person/mood data from verbs.js to database
 * This is needed for dynamic conjugation relationship generation
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function syncVerbData() {
  console.log('🔄 Syncing verb tense/person/mood data to database...\n');
  
  const entriesToSync = [];
  
  verbsCambridge.forEach((entry, id) => {
    // Only sync verbs that have tense/person/mood data
    if (entry.tense || entry.person || entry.mood) {
      entriesToSync.push({ id, entry });
    }
  });
  
  console.log(`Found ${entriesToSync.length} verb entries with conjugation data...\n`);
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  const errorDetails = [];
  
  for (const { id, entry } of entriesToSync) {
    try {
      // Check if entry exists in database
      const { data: existing, error: fetchError } = await supabase
        .from('dictionary_words')
        .select('id, tense, mood, person')
        .eq('id', id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        errors++;
        errorDetails.push({ id, word: entry.word, error: fetchError.message });
        continue;
      }
      
      if (!existing) {
        skipped++;
        continue;
      }
      
      // Check if needs updating
      const needsUpdate = 
        (entry.tense && existing.tense !== entry.tense) ||
        (entry.mood && existing.mood !== entry.mood) ||
        (entry.person && existing.person !== entry.person);
      
      if (!needsUpdate) {
        skipped++;
        continue;
      }
      
      // Update
      const updateData = {};
      if (entry.tense) updateData.tense = entry.tense;
      if (entry.mood) updateData.mood = entry.mood;
      if (entry.person) updateData.person = entry.person;
      updateData.updated_at = new Date().toISOString();
      
      const { error: updateError } = await supabase
        .from('dictionary_words')
        .update(updateData)
        .eq('id', id);
      
      if (updateError) {
        errors++;
        errorDetails.push({ id, word: entry.word, error: updateError.message });
        console.error(`❌ Failed to update ${entry.word} (${id}): ${updateError.message}`);
      } else {
        updated++;
        if (updated % 50 === 0) {
          console.log(`  Updated ${updated} entries...`);
        }
      }
    } catch (err) {
      errors++;
      errorDetails.push({ id, word: entry.word, error: err.message });
      console.error(`❌ Error processing ${entry.word} (${id}): ${err.message}`);
    }
  }
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Updated:  ${updated}`);
  console.log(`   Skipped:  ${skipped} (already in sync or not in database)`);
  console.log(`   Errors:   ${errors}`);
  
  if (errorDetails.length > 0) {
    console.log(`\n❌ ERROR DETAILS:`);
    errorDetails.slice(0, 10).forEach(({ id, word, error }) => {
      console.log(`   ${word} (${id}): ${error}`);
    });
    if (errorDetails.length > 10) {
      console.log(`   ... and ${errorDetails.length - 10} more`);
    }
  }
  
  console.log('');
}

syncVerbData().catch(console.error);

