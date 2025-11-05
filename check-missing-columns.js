#!/usr/bin/env node

/**
 * Check what columns are missing in the database compared to the schema
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkColumns() {
  console.log('🔍 Checking database columns...\n');
  
  // Get a sample entry to see what columns exist
  const { data, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .limit(1)
    .single();
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  console.log('Columns in database:');
  console.log(Object.keys(data).sort().join(', '));
  console.log('\n');
  
  // Expected columns from word schema
  const expectedColumns = [
    'id', 'lang', 'word', 'part_of_speech',
    'gender', 'phonetic', 'definition',
    'unit', 'module', 'lesson', 'cefr_level', 'difficulty',
    'infinitive', 'conjugation_group',
    'adjective_position',
    'translations', 'relationships', 'examples', 'tags',
    'verb_phrases', 'conjugation',
    'noun_phrases', 'noun_articles',
    'adjective_phrases', 'adjective_forms',
    'etymology', 'usage_notes', 'register', 'regional_variants',
    'frequency', 'cambridge_data',
    'sources', 'verified',
    'created_at', 'updated_at',
    // Verb conjugation fields
    'tense', 'mood', 'person',
    // Redirect fields  
    'redirect_to', 'redirect_type', 'base_word',
    // Number field
    'number'
  ];
  
  const actualColumns = Object.keys(data);
  const missing = expectedColumns.filter(col => !actualColumns.includes(col));
  
  if (missing.length > 0) {
    console.log('❌ Missing columns:');
    missing.forEach(col => console.log(`   - ${col}`));
  } else {
    console.log('✅ All expected columns present');
  }
  
  console.log('\n');
  
  // Check if redirect columns exist
  const redirectCols = ['redirect_to', 'redirect_type', 'base_word'];
  const hasRedirect = redirectCols.every(col => actualColumns.includes(col));
  console.log(hasRedirect ? '✅ Redirect columns exist' : '❌ Redirect columns missing');
  
  // Check if verb conjugation columns exist
  const verbCols = ['tense', 'mood', 'person'];
  const hasVerbCols = verbCols.every(col => actualColumns.includes(col));
  console.log(hasVerbCols ? '✅ Verb conjugation columns exist' : '❌ Verb conjugation columns missing');
}

checkColumns().catch(console.error);

