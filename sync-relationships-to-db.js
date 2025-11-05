#!/usr/bin/env node

/**
 * Sync relationships from verbs.js to database
 * This makes all verbs work like avoir with proper relationship notes
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

async function syncRelationships() {
  console.log('🔄 Syncing relationships from verbs.js to database...\n');
  
  const entriesToSync = [];
  
  verbsCambridge.forEach((entry, id) => {
    // Only sync entries that have relationships
    if (entry.relationships && entry.relationships.length > 0) {
      entriesToSync.push({ id, entry });
    }
  });
  
  console.log(`Found ${entriesToSync.length} verb entries with relationships...\n`);
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  const errorDetails = [];
  
  for (const { id, entry } of entriesToSync) {
    try {
      // Check if entry exists in database
      const { data: existing, error: fetchError } = await supabase
        .from('dictionary_words')
        .select('id, relationships')
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
      
      // Check if relationships need updating
      const fileRelationships = JSON.stringify(entry.relationships || []);
      const dbRelationships = JSON.stringify(existing.relationships || []);
      
      if (fileRelationships !== dbRelationships) {
        // Update relationships
        const { error: updateError } = await supabase
          .from('dictionary_words')
          .update({
            relationships: entry.relationships,
            updated_at: new Date().toISOString()
          })
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
      } else {
        skipped++;
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

syncRelationships().catch(console.error);

