#!/usr/bin/env node

/**
 * Check if habiler exists in the database
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkHabiler() {
  console.log('🔍 Checking for habiler...\n');
  
  // Check for habiler (exact match)
  const { data: exact, error: exactError } = await supabase
    .from('dictionary_words')
    .select('id, word, translations, part_of_speech')
    .ilike('word', 'habiler')
    .limit(10);
  
  if (exactError) {
    console.error(`❌ Error: ${exactError.message}`);
    return;
  }
  
  if (exact && exact.length > 0) {
    console.log(`Found ${exact.length} habiler entry(ies):\n`);
    exact.forEach(entry => {
      console.log(`  ${entry.word} (${entry.id}):`);
      console.log(`    Translations:`, entry.translations);
    });
  } else {
    console.log('⚠️  No "habiler" found in database');
    console.log('   (Did you mean "habiter" - to live/reside?)\n');
  }
  
  // Also check for similar words
  const { data: similar, error: similarError } = await supabase
    .from('dictionary_words')
    .select('id, word, translations, part_of_speech')
    .ilike('word', 'habil%')
    .limit(20);
  
  if (!similarError && similar && similar.length > 0) {
    console.log(`Found ${similar.length} similar words (starting with "habil"):\n`);
    similar.forEach(entry => {
      console.log(`  ${entry.word} (${entry.id}): ${entry.translations?.[0]?.text || 'no translation'}`);
    });
  }
}

checkHabiler().catch(console.error);

