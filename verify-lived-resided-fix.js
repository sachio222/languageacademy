#!/usr/bin/env node

/**
 * Verify that all "lived/resided" translations have been fixed
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

async function verifyFix() {
  console.log('🔍 Verifying fix...\n');
  
  // Check for any remaining "lived/resided" entries
  const allEntries = [];
  let from = 0;
  const pageSize = 1000;
  
  while (true) {
    const { data, error } = await supabase
      .from('dictionary_words')
      .select('id, word, translations, base_word, infinitive')
      .range(from, from + pageSize - 1);
    
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      throw error;
    }
    
    if (!data || data.length === 0) break;
    
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
  
  if (allEntries.length > 0) {
    console.log(`❌ Found ${allEntries.length} entries still with "lived/resided":\n`);
    allEntries.slice(0, 20).forEach(entry => {
      const translation = entry.translations?.find(t => t.text?.includes('lived/resided'));
      console.log(`   ${entry.word} (${entry.id}): "${translation?.text}"`);
      console.log(`      base_word: ${entry.base_word || entry.infinitive || 'none'}`);
    });
    if (allEntries.length > 20) {
      console.log(`   ... and ${allEntries.length - 20} more`);
    }
    return false;
  }
  
  console.log('✅ No entries found with "lived/resided" translation\n');
  
  // Verify dépêcher conjugations
  console.log('🔍 Checking dépêcher conjugations...\n');
  
  const { data: depêcherEntries, error: depError } = await supabase
    .from('dictionary_words')
    .select('id, word, translations, base_word, infinitive')
    .eq('base_word', 'dépêcher')
    .limit(20);
  
  if (depError) {
    console.error(`❌ Error checking dépêcher: ${depError.message}`);
    return false;
  }
  
  if (!depêcherEntries || depêcherEntries.length === 0) {
    console.log('⚠️  No dépêcher conjugations found');
    return false;
  }
  
  console.log(`Found ${depêcherEntries.length} dépêcher conjugations:\n`);
  
  let allCorrect = true;
  depêcherEntries.forEach(entry => {
    const translation = entry.translations?.[0];
    const isCorrect = translation?.text?.toLowerCase().includes('hurry');
    const status = isCorrect ? '✅' : '❌';
    
    console.log(`${status} ${entry.word} (${entry.id}): "${translation?.text || 'no translation'}"`);
    
    if (!isCorrect) {
      allCorrect = false;
    }
  });
  
  console.log('');
  
  if (allCorrect) {
    console.log('✅ All dépêcher conjugations have correct translations!\n');
  } else {
    console.log('❌ Some dépêcher conjugations still have incorrect translations\n');
  }
  
  // Spot check a few other verbs
  console.log('🔍 Spot checking other verbs...\n');
  
  const testVerbs = ['acheter', 'chercher', 'acheter'];
  for (const baseVerb of testVerbs) {
    const { data: verbEntries, error: verbError } = await supabase
      .from('dictionary_words')
      .select('id, word, translations, base_word')
      .eq('base_word', baseVerb)
      .limit(3);
    
    if (!verbError && verbEntries && verbEntries.length > 0) {
      console.log(`${baseVerb} conjugations:`);
      verbEntries.forEach(entry => {
        const translation = entry.translations?.[0];
        const hasIssue = translation?.text?.toLowerCase().includes('lived/resided');
        const status = hasIssue ? '❌' : '✅';
        console.log(`  ${status} ${entry.word}: "${translation?.text || 'no translation'}"`);
      });
      console.log('');
    }
  }
  
  return allCorrect && allEntries.length === 0;
}

verifyFix()
  .then(success => {
    if (success) {
      console.log('✅ All verifications passed!');
      process.exit(0);
    } else {
      console.log('❌ Some issues found');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Error during verification:', err);
    process.exit(1);
  });

