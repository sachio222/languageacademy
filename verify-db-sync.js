#!/usr/bin/env node

/**
 * Verify database is in sync with file fixes
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function verifySync() {
  console.log('🔍 Verifying database sync...\n');
  
  // Check dépêcher conjugations
  const { data: depêcherEntries, error } = await supabase
    .from('dictionary_words')
    .select('id, word, translations, base_word')
    .eq('base_word', 'dépêcher')
    .limit(5);
  
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  
  console.log('Checking dépêcher conjugations:');
  let allCorrect = true;
  
  depêcherEntries.forEach(entry => {
    const translation = entry.translations?.[0];
    const isCorrect = translation?.text?.toLowerCase().includes('hurry');
    const status = isCorrect ? '✅' : '❌';
    console.log(`  ${status} ${entry.word}: "${translation?.text || 'no translation'}"`);
    if (!isCorrect) allCorrect = false;
  });
  
  console.log('');
  
  // Check if any "lived/resided" still exist
  const { data: allEntries, error: searchError } = await supabase
    .from('dictionary_words')
    .select('id, word, translations')
    .limit(1000);
  
  if (!searchError && allEntries) {
    const withIssue = allEntries.filter(e => {
      return e.translations?.some(t => 
        t.text?.toLowerCase().includes('lived/resided')
      );
    });
    
    if (withIssue.length > 0) {
      console.log(`❌ Found ${withIssue.length} entries still with "lived/resided":`);
      withIssue.slice(0, 5).forEach(e => {
        console.log(`   ${e.word} (${e.id})`);
      });
      allCorrect = false;
    } else {
      console.log('✅ No "lived/resided" translations found in database');
    }
  }
  
  console.log('');
  
  if (allCorrect) {
    console.log('✅ Database is in sync with file fixes!');
  } else {
    console.log('❌ Some issues found');
  }
}

verifySync().catch(console.error);

