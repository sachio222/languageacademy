#!/usr/bin/env node

/**
 * Verify the suspicious entries to see if they're actually correct
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

async function verifySuspicious() {
  console.log('🔍 Verifying suspicious entries...\n');
  
  const entriesToCheck = ['habitants-fr', 'vies-fr'];
  
  for (const entryId of entriesToCheck) {
    const { data, error } = await supabase
      .from('dictionary_words')
      .select('*')
      .eq('id', entryId)
      .single();
    
    if (error) {
      console.error(`❌ Error fetching ${entryId}: ${error.message}`);
      continue;
    }
    
    if (!data) {
      console.log(`⚠️  ${entryId}: Not found`);
      continue;
    }
    
    console.log(`Entry: ${data.word} (${data.id})`);
    console.log(`  Part of speech: ${data.part_of_speech}`);
    console.log(`  Translations:`, data.translations);
    console.log(`  Base word: ${data.base_word || 'none'}`);
    console.log(`  Gender: ${data.gender || 'none'}`);
    console.log(`  Number: ${data.number || 'none'}`);
    
    // Check if translation makes sense
    const translation = data.translations?.[0]?.text || '';
    
    if (data.word === 'habitants' && translation.toLowerCase().includes('inhabitants')) {
      console.log(`  ✅ CORRECT: "habitants" = "inhabitants/residents" (noun)`);
    } else if (data.word === 'habitants' && translation.toLowerCase().includes('residents')) {
      console.log(`  ✅ CORRECT: "habitants" = "inhabitants/residents" (noun)`);
    } else if (data.word === 'vies' && translation.toLowerCase().includes('lives')) {
      console.log(`  ✅ CORRECT: "vies" = "lives" (plural of "vie" = "life")`);
    } else {
      console.log(`  ⚠️  UNEXPECTED: Translation "${translation}" for word "${data.word}"`);
    }
    
    console.log('');
  }
}

verifySuspicious().catch(console.error);

