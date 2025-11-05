#!/usr/bin/env node

/**
 * Check Database Contents
 * See what's actually in the database vs Cambridge dictionary
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkDatabaseContents() {
  console.log('🔍 Checking database contents...\n');

  // Get sample entries from database
  const { data: sampleEntries, error } = await supabase
    .from('dictionary_words')
    .select('id, word, part_of_speech, lang, created_at')
    .limit(10);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('📋 Sample database entries:');
  sampleEntries.forEach(entry => {
    console.log(`  ${entry.id}: "${entry.word}" (${entry.part_of_speech}) - ${entry.created_at}`);
  });

  // Check for être specifically (it had an error)
  console.log('\n🔍 Checking for être entries...');
  const { data: etreEntries } = await supabase
    .from('dictionary_words')
    .select('id, word, part_of_speech')
    .ilike('word', 'être');

  console.log(`Found ${etreEntries?.length || 0} être entries:`);
  etreEntries?.forEach(entry => {
    console.log(`  ${entry.id}: "${entry.word}" (${entry.part_of_speech})`);
  });

  // Check part of speech distribution
  console.log('\n📊 Part of speech distribution:');
  const { data: posData } = await supabase
    .from('dictionary_words')
    .select('part_of_speech')
    .not('part_of_speech', 'is', null);

  const posCounts = {};
  posData?.forEach(entry => {
    posCounts[entry.part_of_speech] = (posCounts[entry.part_of_speech] || 0) + 1;
  });

  Object.entries(posCounts).sort(([,a], [,b]) => b - a).forEach(([pos, count]) => {
    console.log(`  ${pos}: ${count}`);
  });

  // Check if entries have sources
  console.log('\n🔍 Checking sources...');
  const { data: sourceSample } = await supabase
    .from('dictionary_words')
    .select('id, sources, cambridge_data')
    .limit(3);

  sourceSample?.forEach(entry => {
    console.log(`  ${entry.id}:`);
    console.log(`    Sources: ${JSON.stringify(entry.sources)}`);
    console.log(`    Has Cambridge data: ${!!entry.cambridge_data}`);
  });
}

checkDatabaseContents().catch(console.error);
