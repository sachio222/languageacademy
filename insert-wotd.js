#!/usr/bin/env node
// Insert Word of the Day Entry
// Usage: node insert-wotd.js data.json
//    or: cat data.json | node insert-wotd.js

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('   Need: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get JSON from file argument or stdin
let jsonInput;
const filename = process.argv[2];

if (filename) {
  // Read from file
  try {
    jsonInput = readFileSync(filename, 'utf-8');
    console.log(`📄 Reading from: ${filename}\n`);
  } catch (err) {
    console.error(`❌ Could not read file: ${filename}`);
    console.error(`   ${err.message}\n`);
    process.exit(1);
  }
} else {
  console.error('❌ Usage: node insert-wotd.js <json-file>');
  console.error('   Example: node insert-wotd.js tenir.json\n');
  process.exit(1);
}

// Parse JSON
let wordData;
try {
  wordData = JSON.parse(jsonInput);
} catch (err) {
  console.error('❌ Invalid JSON format');
  console.error(`   ${err.message}\n`);
  process.exit(1);
}

// Validate required fields
const required = ['date', 'word_id', 'word', 'phonetic', 'part_of_speech', 
                  'translation', 'definitions', 'examples', 'correct_answer', 'wrong_options'];

const missing = required.filter(field => !wordData[field]);
if (missing.length > 0) {
  console.error('❌ Missing required fields:', missing.join(', '));
  console.error('');
  process.exit(1);
}

// Validate wrong_options count
if (!Array.isArray(wordData.wrong_options) || wordData.wrong_options.length !== 3) {
  console.error('❌ wrong_options must be an array of exactly 3 items');
  console.error(`   Found: ${wordData.wrong_options?.length || 0} items\n`);
  process.exit(1);
}

// Display summary
console.log('📝 Word Summary:');
console.log('   Date:', wordData.date);
console.log('   Word:', wordData.word);
console.log('   Translation:', wordData.translation);
console.log('   Part of Speech:', wordData.part_of_speech);
console.log('   Definitions:', wordData.definitions.length);
console.log('   Examples:', wordData.examples.length);
console.log('   Idioms:', wordData.idioms?.length || 0);
console.log('   Grammar notes:', wordData.grammar?.length || 0);
console.log('   Collocations:', wordData.collocations?.length || 0);
console.log('');

// Insert via edge function
console.log('🚀 Inserting into database...\n');

try {
  const { data, error } = await supabase.functions.invoke('create-wotd', {
    body: wordData
  });

  if (error) {
    console.error('❌ Edge function error:', error);
    console.error('   Details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  if (!data.success) {
    console.error('❌ Failed to create WOTD:', data.error);
    console.error('');
    process.exit(1);
  }

  console.log('✅ Word of the Day created successfully!');
  console.log('');
  console.log('📊 Database entry:');
  console.log('   ID:', data.data.id);
  console.log('   Date:', data.data.date);
  console.log('   Word:', data.data.word);
  console.log('   Created:', data.data.created_at);
  console.log('');
  console.log('🔗 View in app:');
  console.log(`   http://localhost:5173/?wotd=true&date=${wordData.date}`);
  console.log('');
  console.log('✨ Ready to send in daily email!\n');

} catch (err) {
  console.error('❌ Unexpected error:', err.message);
  console.error('   Stack:', err.stack);
  process.exit(1);
}

