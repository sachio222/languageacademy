#!/usr/bin/env node

/**
 * Fix incorrect "lived/resided" translations in dictionary database
 * 
 * This script finds all entries with "lived/resided" as their translation
 * and updates them with the correct translation from their base verb.
 * 
 * Usage:
 *   node fix-lived-resided-translations.js
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration');
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Find all entries with "lived/resided" translation
 */
async function findEntriesWithLivedResided() {
  console.log('🔍 Searching for entries with "lived/resided" translation...\n');
  
  // Load all entries in batches
  const allEntries = [];
  let from = 0;
  const pageSize = 1000;
  
  while (true) {
    const { data, error } = await supabase
      .from('dictionary_words')
      .select('id, word, part_of_speech, translations, base_word, infinitive, redirect_to')
      .range(from, from + pageSize - 1);
    
    if (error) {
      console.error(`❌ Error loading entries: ${error.message}`);
      throw error;
    }
    
    if (!data || data.length === 0) break;
    
    // Filter entries with "lived/resided" in translations
    const entriesWithIssue = data.filter(entry => {
      if (!entry.translations || !Array.isArray(entry.translations)) return false;
      return entry.translations.some(t => 
        t.text && t.text.toLowerCase().includes('lived/resided')
      );
    });
    
    allEntries.push(...entriesWithIssue);
    
    if (data.length < pageSize) break;
    from += pageSize;
  }
  
  console.log(`Found ${allEntries.length} entries with "lived/resided" translation\n`);
  return allEntries;
}

/**
 * Get base verb translation
 */
async function getBaseVerbTranslation(baseWord) {
  if (!baseWord) return null;
  
  // Try to find by base_word directly
  const { data, error } = await supabase
    .from('dictionary_words')
    .select('id, word, translations')
    .eq('word', baseWord)
    .eq('part_of_speech', 'verb')
    .limit(1)
    .single();
  
  if (error || !data) {
    // Try with ID format
    const id = `${baseWord}-fr`;
    const { data: dataById, error: errorById } = await supabase
      .from('dictionary_words')
      .select('id, word, translations')
      .eq('id', id)
      .limit(1)
      .single();
    
    if (errorById || !dataById) {
      return null;
    }
    
    if (dataById.translations && Array.isArray(dataById.translations) && dataById.translations.length > 0) {
      return dataById.translations[0];
    }
  }
  
  if (data && data.translations && Array.isArray(data.translations) && data.translations.length > 0) {
    return data.translations[0];
  }
  
  return null;
}

/**
 * Fix translations for all affected entries
 */
async function fixTranslations() {
  const entriesWithIssue = await findEntriesWithLivedResided();
  
  if (entriesWithIssue.length === 0) {
    console.log('✅ No entries found with "lived/resided" translation. All good!');
    return;
  }
  
  console.log('📝 Processing entries...\n');
  
  let fixed = 0;
  let skipped = 0;
  let errors = 0;
  const errorDetails = [];
  
  // Load all base verbs to build a lookup map
  console.log('Loading base verb translations...');
  const baseVerbMap = new Map();
  
  for (const entry of entriesWithIssue) {
    const baseWord = entry.base_word || entry.infinitive;
    if (!baseWord) {
      skipped++;
      console.log(`⚠️  Skipped ${entry.word} (${entry.id}): No base_word or infinitive`);
      continue;
    }
    
    if (!baseVerbMap.has(baseWord)) {
      const baseTranslation = await getBaseVerbTranslation(baseWord);
      if (baseTranslation) {
        baseVerbMap.set(baseWord, baseTranslation);
      }
    }
  }
  
  console.log(`\n📚 Found ${baseVerbMap.size} unique base verbs\n`);
  
  // Update each entry
  for (const entry of entriesWithIssue) {
    const baseWord = entry.base_word || entry.infinitive;
    
    if (!baseWord) {
      skipped++;
      continue;
    }
    
    const correctTranslation = baseVerbMap.get(baseWord);
    
    if (!correctTranslation) {
      skipped++;
      console.log(`⚠️  Skipped ${entry.word} (${entry.id}): Could not find base verb "${baseWord}"`);
      continue;
    }
    
    // Update translations array
    const updatedTranslations = entry.translations.map(t => {
      if (t.text && t.text.toLowerCase().includes('lived/resided')) {
        return {
          ...t,
          text: correctTranslation.text,
          source: correctTranslation.source || t.source,
          confidence: correctTranslation.confidence || t.confidence
        };
      }
      return t;
    });
    
    // Update entry in database
    const { error } = await supabase
      .from('dictionary_words')
      .update({ 
        translations: updatedTranslations,
        updated_at: new Date().toISOString()
      })
      .eq('id', entry.id);
    
    if (error) {
      errors++;
      errorDetails.push({ id: entry.id, word: entry.word, error: error.message });
      console.error(`❌ Failed to update ${entry.word} (${entry.id}): ${error.message}`);
    } else {
      fixed++;
      if (fixed % 10 === 0) {
        console.log(`  Fixed ${fixed} entries...`);
      }
    }
  }
  
  // Summary
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Fixed:    ${fixed}`);
  console.log(`   Skipped:  ${skipped} (no base verb found)`);
  console.log(`   Errors:   ${errors}`);
  
  if (errorDetails.length > 0) {
    console.log(`\n❌ ERROR DETAILS:`);
    errorDetails.forEach(({ id, word, error }) => {
      console.log(`   ${word} (${id}): ${error}`);
    });
  }
  
  console.log('');
}

// Run the fix
fixTranslations().catch(console.error);

