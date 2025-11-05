#!/usr/bin/env node

/**
 * Verify Migration Accuracy
 * Check if the 1,200 database entries match exactly with Cambridge dictionary entries
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Import all Cambridge dictionaries
import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';
import { adjectivesCambridge } from './src/data/dictionary/words/cambridge/adjectives.js';
import { adverbsCambridge } from './src/data/dictionary/words/cambridge/adverbs.js';
import { pronounsCambridge } from './src/data/dictionary/words/cambridge/pronouns.js';
import { articlesCambridge } from './src/data/dictionary/words/cambridge/articles.js';
import { prepositionsCambridge } from './src/data/dictionary/words/cambridge/prepositions.js';
import { conjunctionsCambridge } from './src/data/dictionary/words/cambridge/conjunctions.js';
import { interjectionsCambridge } from './src/data/dictionary/words/cambridge/interjections.js';
import { interrogativesCambridge } from './src/data/dictionary/words/cambridge/interrogatives.js';
import { alphabetCambridge } from './src/data/dictionary/words/cambridge/alphabet.js';
import { expressionsCambridge } from './src/data/dictionary/words/cambridge/expressions.js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function verifyMigrationAccuracy() {
  console.log('🔍 Verifying migration accuracy...\n');

  // Combine all Cambridge dictionaries
  const allCambridge = new Map([
    ...nounsCambridge,
    ...verbsCambridge,
    ...adjectivesCambridge,
    ...adverbsCambridge,
    ...pronounsCambridge,
    ...articlesCambridge,
    ...prepositionsCambridge,
    ...conjunctionsCambridge,
    ...interjectionsCambridge,
    ...interrogativesCambridge,
    ...alphabetCambridge,
    ...expressionsCambridge,
  ]);

  console.log(`📊 Total Cambridge entries: ${allCambridge.size}`);

  // Get all database entry IDs
  const { data: dbEntries, error } = await supabase
    .from('dictionary_words')
    .select('id');

  if (error) {
    console.error('❌ Error getting database entries:', error.message);
    return;
  }

  const dbIds = new Set(dbEntries.map(entry => entry.id));
  console.log(`📊 Total database entries: ${dbIds.size}`);

  // Check which Cambridge entries are in database
  const inDatabase = [];
  const notInDatabase = [];

  for (const [id, entry] of allCambridge) {
    if (dbIds.has(id)) {
      inDatabase.push(id);
    } else {
      notInDatabase.push(id);
    }
  }

  console.log(`\n✅ Cambridge entries IN database: ${inDatabase.length}`);
  console.log(`❌ Cambridge entries NOT in database: ${notInDatabase.length}`);

  // Check which database entries are NOT in Cambridge
  const dbNotInCambridge = [];
  for (const dbId of dbIds) {
    if (!allCambridge.has(dbId)) {
      dbNotInCambridge.push(dbId);
    }
  }

  console.log(`🚨 Database entries NOT in Cambridge: ${dbNotInCambridge.length}`);

  if (dbNotInCambridge.length > 0) {
    console.log('\n🚨 SUSPICIOUS: Database has entries not in Cambridge dictionary:');
    dbNotInCambridge.slice(0, 10).forEach(id => {
      console.log(`  ${id}`);
    });
    if (dbNotInCambridge.length > 10) {
      console.log(`  ... and ${dbNotInCambridge.length - 10} more`);
    }
  }

  // Show samples of what's missing
  console.log('\n❌ Sample Cambridge entries NOT in database:');
  notInDatabase.slice(0, 10).forEach(id => {
    const entry = allCambridge.get(id);
    console.log(`  ${id}: "${entry.word}" (${entry.partOfSpeech})`);
  });

  // Show samples of what's in database
  console.log('\n✅ Sample Cambridge entries IN database:');
  inDatabase.slice(0, 10).forEach(id => {
    const entry = allCambridge.get(id);
    console.log(`  ${id}: "${entry.word}" (${entry.partOfSpeech})`);
  });

  // Summary
  console.log('\n📋 VERIFICATION SUMMARY:');
  console.log(`Cambridge dictionary: ${allCambridge.size} entries`);
  console.log(`Database: ${dbIds.size} entries`);
  console.log(`Overlap: ${inDatabase.length} entries`);
  console.log(`Missing from DB: ${notInDatabase.length} entries`);
  console.log(`Extra in DB: ${dbNotInCambridge.length} entries`);

  const isAccurate = dbNotInCambridge.length === 0 && (inDatabase.length + notInDatabase.length === allCambridge.size);
  console.log(`\n🎯 Migration accuracy: ${isAccurate ? '✅ ACCURATE' : '❌ INACCURATE'}`);

  if (!isAccurate) {
    console.log('\n🚨 PROBLEMS DETECTED:');
    if (dbNotInCambridge.length > 0) {
      console.log(`  - Database has ${dbNotInCambridge.length} entries not in Cambridge dictionary`);
    }
    if (inDatabase.length + notInDatabase.length !== allCambridge.size) {
      console.log(`  - Math doesn't add up: ${inDatabase.length} + ${notInDatabase.length} ≠ ${allCambridge.size}`);
    }
  }
}

verifyMigrationAccuracy().catch(console.error);
