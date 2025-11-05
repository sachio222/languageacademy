#!/usr/bin/env node

/**
 * Validate Duplicate Entries
 * Check if database entries actually match Cambridge dictionary data
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function validateDuplicates() {
  console.log('🔍 Validating "duplicate" entries...\n');

  // Sample IDs from the error report
  const sampleIds = [
    'lundi-fr', 'mardi-fr', 'chat-fr', 'être-fr', 'premier-fr'
  ];

  for (const id of sampleIds) {
    console.log(`📋 Checking: ${id}`);
    
    // Get from database
    const { data: dbEntry, error } = await supabase
      .from('dictionary_words')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.log(`  ❌ Not found in database: ${error.message}`);
      continue;
    }

    // Get from Cambridge dictionary
    let cambridgeEntry = null;
    if (nounsCambridge.has(id)) {
      cambridgeEntry = nounsCambridge.get(id);
    } else if (verbsCambridge.has(id)) {
      cambridgeEntry = verbsCambridge.get(id);
    }

    if (!cambridgeEntry) {
      console.log(`  ❌ Not found in Cambridge dictionary`);
      continue;
    }

    // Compare key fields
    const matches = {
      word: dbEntry.word === cambridgeEntry.word,
      partOfSpeech: dbEntry.part_of_speech === cambridgeEntry.partOfSpeech,
      lang: dbEntry.lang === cambridgeEntry.lang,
      translationsCount: (dbEntry.translations?.length || 0) === (cambridgeEntry.translations?.length || 0)
    };

    console.log(`  ✅ Database entry exists:`);
    console.log(`    Word: "${dbEntry.word}" (matches: ${matches.word})`);
    console.log(`    Part of speech: "${dbEntry.part_of_speech}" (matches: ${matches.partOfSpeech})`);
    console.log(`    Language: "${dbEntry.lang}" (matches: ${matches.lang})`);
    console.log(`    Translations: ${dbEntry.translations?.length || 0} vs ${cambridgeEntry.translations?.length || 0} (matches: ${matches.translationsCount})`);
    
    if (dbEntry.translations?.length > 0) {
      console.log(`    Sample translation: "${dbEntry.translations[0].text}"`);
    }
    
    const allMatch = Object.values(matches).every(m => m);
    console.log(`  🎯 Overall match: ${allMatch ? '✅ TRUE DUPLICATE' : '❌ DIFFERENT DATA'}`);
    console.log('');
  }

  // Check total counts
  const { count: dbCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  const cambridgeCount = nounsCambridge.size + verbsCambridge.size;
  
  console.log(`📊 Count comparison:`);
  console.log(`  Database entries: ${dbCount}`);
  console.log(`  Cambridge entries (nouns + verbs only): ${cambridgeCount}`);
  console.log(`  Total Cambridge entries: 2,396`);
}

validateDuplicates().catch(console.error);
