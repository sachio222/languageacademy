#!/usr/bin/env node

/**
 * Update missing redirect data in database from Cambridge entries
 * Only updates DATA, assumes columns exist (run add-redirect-columns.sql first)
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
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

// Get all Cambridge entries
const allCambridge = new Map([
  ...nounsCambridge, ...verbsCambridge, ...adjectivesCambridge, ...adverbsCambridge,
  ...pronounsCambridge, ...articlesCambridge, ...prepositionsCambridge, ...conjunctionsCambridge,
  ...interjectionsCambridge, ...interrogativesCambridge, ...alphabetCambridge, ...expressionsCambridge,
]);

async function updateMissingRedirectData() {
  console.log('🔧 Updating missing redirect data from Cambridge...\n');
  
  // Find entries with redirect info
  const entriesWithRedirects = [];
  allCambridge.forEach((entry, id) => {
    if (entry.redirect_to || entry.base_word || entry.redirect_type) {
      entriesWithRedirects.push({ id, entry });
    }
  });
  
  console.log(`Found ${entriesWithRedirects.length} entries with redirect info in Cambridge\n`);
  
  // Load all database entries to match by word text (since IDs might have changed)
  console.log('Loading all database entries...');
  let allDbEntries = [];
  let from = 0;
  const pageSize = 1000;
  
  while (true) {
    const { data } = await supabase
      .from('dictionary_words')
      .select('id, word, part_of_speech, redirect_to, base_word, redirect_type')
      .range(from, from + pageSize - 1);
    
    if (!data || data.length === 0) break;
    allDbEntries = allDbEntries.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  
  console.log(`Loaded ${allDbEntries.length} database entries\n`);
  
  // Create map by word text + part of speech for matching
  const dbMap = new Map();
  allDbEntries.forEach(dbEntry => {
    const key = `${dbEntry.word.toLowerCase()}|${dbEntry.part_of_speech}`;
    if (!dbMap.has(key)) {
      dbMap.set(key, []);
    }
    dbMap.get(key).push(dbEntry);
  });
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  let notFound = 0;
  
  // Process entries
  for (const { id, entry } of entriesWithRedirects) {
    // Match by word text and part of speech
    const key = `${entry.word.toLowerCase()}|${entry.partOfSpeech || 'unknown'}`;
    const dbMatches = dbMap.get(key) || [];
    
    if (dbMatches.length === 0) {
      notFound++;
      continue;
    }
    
    // Find best match (prefer exact ID match, then any match)
    let dbEntry = dbMatches.find(e => e.id === id) || dbMatches[0];
    
    // Check if needs update
    const needsUpdate = 
      (entry.redirect_to && dbEntry.redirect_to !== entry.redirect_to) ||
      (entry.base_word && dbEntry.base_word !== entry.base_word) ||
      (entry.redirect_type && dbEntry.redirect_type !== entry.redirect_type);
    
    if (!needsUpdate) {
      skipped++;
      continue;
    }
    
    // Update
    const updateData = {};
    if (entry.redirect_to) updateData.redirect_to = entry.redirect_to;
    if (entry.base_word) updateData.base_word = entry.base_word;
    if (entry.redirect_type) updateData.redirect_type = entry.redirect_type;
    
    const { error } = await supabase
      .from('dictionary_words')
      .update(updateData)
      .eq('id', dbEntry.id);
    
    if (error) {
      console.error(`❌ ${dbEntry.id}: ${error.message}`);
      errors++;
    } else {
      updated++;
      if (updated % 50 === 0) {
        console.log(`  Updated ${updated} entries...`);
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped} (already had correct data)`);
  console.log(`  Not found: ${notFound} (word not in database)`);
  console.log(`  Errors: ${errors}`);
}

updateMissingRedirectData().catch(console.error);
