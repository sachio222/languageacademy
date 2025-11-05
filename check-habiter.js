#!/usr/bin/env node

/**
 * Check habiter (to live/reside) translations
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

async function checkHabiter() {
  console.log('🔍 Checking habiter (to live/reside)...\n');
  
  // Check the base verb
  const { data: baseEntry, error: baseError } = await supabase
    .from('dictionary_words')
    .select('id, word, translations, part_of_speech')
    .eq('word', 'habiter')
    .eq('part_of_speech', 'verb')
    .limit(1)
    .single();
  
  if (baseError || !baseEntry) {
    console.log('❌ Base habiter entry not found');
    console.log(`Error: ${baseError?.message || 'Not found'}`);
  } else {
    console.log('Base verb entry:');
    console.log(`  ID: ${baseEntry.id}`);
    console.log(`  Word: ${baseEntry.word}`);
    console.log(`  Translations:`, baseEntry.translations);
    console.log('');
  }
  
  // Check all habiter conjugations
  const { data: conjugations, error: conjError } = await supabase
    .from('dictionary_words')
    .select('id, word, translations, base_word, infinitive')
    .or('base_word.eq.habiter,infinitive.eq.habiter')
    .limit(50);
  
  if (conjError) {
    console.error(`❌ Error: ${conjError.message}`);
    return;
  }
  
  if (!conjugations || conjugations.length === 0) {
    console.log('⚠️  No habiter conjugations found');
    return;
  }
  
  console.log(`Found ${conjugations.length} habiter-related entries:\n`);
  
  conjugations.forEach(entry => {
    const translation = entry.translations?.[0];
    const text = translation?.text || 'no translation';
    const isCorrect = text.toLowerCase().includes('live') || text.toLowerCase().includes('reside');
    const status = isCorrect ? '✅' : '❌';
    
    console.log(`${status} ${entry.word} (${entry.id}): "${text}"`);
  });
  
  console.log('');
  
  // Check if any have wrong translations
  const wrong = conjugations.filter(entry => {
    const translation = entry.translations?.[0];
    const text = translation?.text?.toLowerCase() || '';
    return !text.includes('live') && !text.includes('reside');
  });
  
  if (wrong.length > 0) {
    console.log(`❌ Found ${wrong.length} entries with incorrect translations:`);
    wrong.forEach(entry => {
      console.log(`   ${entry.word}: "${entry.translations?.[0]?.text}"`);
    });
  } else {
    console.log('✅ All habiter entries have correct "live/reside" translations!');
  }
}

checkHabiter().catch(console.error);

