#!/usr/bin/env node

/**
 * Check all entries with "live" or "reside" in translations
 * to find any incorrectly assigned translations
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

async function checkAllLiveReside() {
  console.log('🔍 Checking all entries with "live" or "reside" translations...\n');
  
  // Load all entries in batches
  const allEntries = [];
  let from = 0;
  const pageSize = 1000;
  
  while (true) {
    const { data, error } = await supabase
      .from('dictionary_words')
      .select('id, word, translations, base_word, infinitive, part_of_speech')
      .range(from, from + pageSize - 1);
    
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      throw error;
    }
    
    if (!data || data.length === 0) break;
    
    // Filter entries with "live" or "reside" in translations
    const entriesWithLiveReside = data.filter(entry => {
      if (!entry.translations || !Array.isArray(entry.translations)) return false;
      return entry.translations.some(t => {
        const text = (t.text || '').toLowerCase();
        return text.includes('live') || text.includes('reside');
      });
    });
    
    allEntries.push(...entriesWithLiveReside);
    
    if (data.length < pageSize) break;
    from += pageSize;
  }
  
  console.log(`Found ${allEntries.length} entries with "live" or "reside" in translations\n`);
  
  // Group by base_word/infinitive to see which verbs they belong to
  const byBaseWord = new Map();
  
  allEntries.forEach(entry => {
    const baseWord = entry.base_word || entry.infinitive || entry.word;
    if (!byBaseWord.has(baseWord)) {
      byBaseWord.set(baseWord, []);
    }
    byBaseWord.get(baseWord).push(entry);
  });
  
  console.log(`These entries belong to ${byBaseWord.size} different base verbs:\n`);
  
  // Check which ones are correct (should be habiter or similar)
  const correctVerbs = new Set(['habiter', 'vivre', 'demeurer', 'résider']);
  const suspicious = [];
  const correct = [];
  
  byBaseWord.forEach((entries, baseWord) => {
    const isCorrect = correctVerbs.has(baseWord.toLowerCase());
    const entry = entries[0];
    const translation = entry.translations?.find(t => 
      (t.text || '').toLowerCase().includes('live') || 
      (t.text || '').toLowerCase().includes('reside')
    );
    
    if (isCorrect) {
      correct.push({ baseWord, count: entries.length, translation: translation?.text });
    } else {
      suspicious.push({ baseWord, count: entries.length, translation: translation?.text, entries });
    }
  });
  
  console.log('✅ Correct verbs (should have live/reside):');
  correct.forEach(({ baseWord, count, translation }) => {
    console.log(`   ${baseWord}: ${count} entries - "${translation}"`);
  });
  
  console.log(`\n⚠️  Suspicious entries (may be incorrectly assigned):`);
  if (suspicious.length === 0) {
    console.log('   None found!');
  } else {
    suspicious.forEach(({ baseWord, count, translation, entries }) => {
      console.log(`\n   ${baseWord}: ${count} entries - "${translation}"`);
      console.log(`   Examples:`);
      entries.slice(0, 5).forEach(e => {
        console.log(`     - ${e.word} (${e.id})`);
      });
      if (entries.length > 5) {
        console.log(`     ... and ${entries.length - 5} more`);
      }
    });
  }
  
  console.log('\n');
  
  // Summary
  console.log('📊 SUMMARY:');
  console.log(`   Total entries with live/reside: ${allEntries.length}`);
  console.log(`   Correct verbs: ${correct.length} (${correct.reduce((sum, v) => sum + v.count, 0)} entries)`);
  console.log(`   Suspicious entries: ${suspicious.length} (${suspicious.reduce((sum, v) => sum + v.count, 0)} entries)`);
  
  if (suspicious.length > 0) {
    console.log('\n❌ Found potentially incorrect translations!');
    return false;
  } else {
    console.log('\n✅ All "live/reside" translations appear to be correctly assigned!');
    return true;
  }
}

checkAllLiveReside()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

