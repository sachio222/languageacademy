#!/usr/bin/env node

/**
 * Add Words to Dictionary Database
 * Modern workflow: Add vocabulary directly to Supabase database
 *
 * Usage:
 *   node add-words-to-database.js --file lesson-words.json
 *   node add-words-to-database.js --word "chat" --translation "cat" --pos "noun" --gender "masculine"
 *   node add-words-to-database.js --json '[{"word":"chat","translation":"cat"}]'
 */

import 'dotenv/config';
import fs from 'fs';
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
 * Transform input word to database format
 */
function transformWordToDbFormat(word) {
  const id = `${word.word}-fr`;
  const timestamp = new Date().toISOString();

  return {
    // Core fields
    id,
    lang: 'fr',
    word: word.word,
    part_of_speech: word.partOfSpeech || word.pos,
    
    // Direct fields
    gender: word.gender || null,
    phonetic: word.phonetic || null,
    definition: word.definition || null,
    
    // Curriculum tracking
    unit: word.unit || null,
    module: word.module || null,
    lesson: word.lesson || null,
    cefr_level: word.cefr_level || word.cefr || null,
    difficulty: word.difficulty || null,
    
    // Verb-specific
    infinitive: word.infinitive || null,
    conjugation_group: word.conjugationGroup || word.conjugation_group || null,
    
    // Adjective-specific
    adjective_position: word.adjective_position || word.position || null,
    
    // JSONB fields - Translations
    translations: word.translations || (word.translation ? [{
      lang: 'en',
      text: word.translation,
      confidence: 0.9,
      source: 'manual'
    }] : []),
    
    // JSONB fields - Arrays
    relationships: word.relationships || [],
    examples: word.examples || [],
    tags: word.tags || ['lesson'],
    
    // Part-of-speech specific JSONB
    verb_phrases: word.verb_phrases || [],
    conjugation: word.conjugation || null,
    noun_phrases: word.noun_phrases || [],
    noun_articles: word.noun_articles || null,
    adjective_phrases: word.adjective_phrases || [],
    adjective_forms: word.adjective_forms || null,
    
    // Additional metadata
    etymology: word.etymology || null,
    usage_notes: word.usage_notes || null,
    register: word.register || [],
    regional_variants: word.regional_variants || [],
    
    // Frequency
    frequency: word.frequency || null,
    
    // Cambridge data (for compatibility)
    cambridge_data: word.cambridge_data || null,
    
    // Source and verification
    sources: word.sources || ['language_academy'],
    verified: word.verified || false,
    
    // Timestamps
    created_at: timestamp,
    updated_at: timestamp
  };
}

/**
 * Insert words into database
 */
async function insertWords(words, options = {}) {
  const { upsert = false } = options;
  
  console.log(`\n📝 Processing ${words.length} word(s)...\n`);
  
  const transformed = words.map(transformWordToDbFormat);
  const results = {
    inserted: 0,
    updated: 0,
    failed: 0,
    errors: []
  };
  
  for (const word of transformed) {
    try {
      if (upsert) {
        const { data, error } = await supabase
          .from('dictionary_words')
          .upsert([word], { onConflict: 'id' })
          .select('id');
        
        if (error) throw error;
        results.updated++;
        console.log(`✅ Upserted: ${word.word} (${word.id})`);
      } else {
        // Check if exists first
        const { data: existing } = await supabase
          .from('dictionary_words')
          .select('id')
          .eq('id', word.id)
          .single();
        
        if (existing) {
          console.log(`⚠️  Skipped (exists): ${word.word} (${word.id})`);
          continue;
        }
        
        const { data, error } = await supabase
          .from('dictionary_words')
          .insert([word])
          .select('id');
        
        if (error) throw error;
        results.inserted++;
        console.log(`✅ Inserted: ${word.word} (${word.id})`);
      }
    } catch (err) {
      results.failed++;
      results.errors.push({ word: word.word, error: err.message });
      console.error(`❌ Failed: ${word.word} - ${err.message}`);
    }
  }
  
  return results;
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    file: null,
    word: null,
    translation: null,
    pos: null,
    gender: null,
    json: null,
    upsert: false,
    help: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    
    switch (arg) {
      case '--file':
        options.file = nextArg;
        i++;
        break;
      case '--word':
        options.word = nextArg;
        i++;
        break;
      case '--translation':
        options.translation = nextArg;
        i++;
        break;
      case '--pos':
      case '--partOfSpeech':
        options.pos = nextArg;
        i++;
        break;
      case '--gender':
        options.gender = nextArg;
        i++;
        break;
      case '--json':
        options.json = nextArg;
        i++;
        break;
      case '--upsert':
        options.upsert = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }
  
  return options;
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
📚 Add Words to Dictionary Database

USAGE:
  node add-words-to-database.js [options]

OPTIONS:
  --file <path>           Path to JSON file with words
  --word <word>           Single word to add
  --translation <trans>   Translation for single word
  --pos <pos>             Part of speech (noun, verb, adjective, etc.)
  --gender <gender>       Gender (masculine, feminine)
  --json <json>           JSON array of words
  --upsert                Update if exists (default: skip duplicates)
  --help, -h              Show this help

EXAMPLES:
  # Add from file
  node add-words-to-database.js --file lesson-words.json
  
  # Add single word
  node add-words-to-database.js --word "chat" --translation "cat" --pos "noun" --gender "masculine"
  
  # Add from JSON string
  node add-words-to-database.js --json '[{"word":"chat","translation":"cat","pos":"noun"}]'
  
  # Update existing entries
  node add-words-to-database.js --file words.json --upsert

FILE FORMAT (JSON):
  [
    {
      "word": "chat",
      "translation": "cat",
      "partOfSpeech": "noun",
      "gender": "masculine",
      "noun_articles": {
        "definite": "le",
        "indefinite": "un",
        "plural": "les"
      },
      "noun_phrases": [
        {
          "phrase": "le chat",
          "type": "definite_article",
          "frequency": "common"
        }
      ]
    }
  ]

See DICTIONARY_GENERATOR_GUIDE.md for complete documentation.
`);
}

/**
 * Main execution
 */
async function main() {
  const options = parseArgs();
  
  if (options.help) {
    showHelp();
    return;
  }
  
  let words = [];
  
  // Load from file
  if (options.file) {
    if (!fs.existsSync(options.file)) {
      console.error(`❌ File not found: ${options.file}`);
      process.exit(1);
    }
    const content = fs.readFileSync(options.file, 'utf-8');
    words = JSON.parse(content);
  }
  // Load from JSON string
  else if (options.json) {
    words = JSON.parse(options.json);
  }
  // Single word from command line
  else if (options.word && options.translation) {
    words = [{
      word: options.word,
      translation: options.translation,
      partOfSpeech: options.pos || 'noun',
      gender: options.gender
    }];
  }
  else {
    console.error('❌ Must provide --file, --json, or --word + --translation');
    console.log('Run with --help for usage information');
    process.exit(1);
  }
  
  // Ensure array
  if (!Array.isArray(words)) {
    words = [words];
  }
  
  // Insert words
  const results = await insertWords(words, { upsert: options.upsert });
  
  // Summary
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Inserted: ${results.inserted}`);
  console.log(`   Updated:  ${results.updated}`);
  console.log(`   Failed:   ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log(`\n❌ ERRORS:`);
    results.errors.forEach(({ word, error }) => {
      console.log(`   ${word}: ${error}`);
    });
  }
  
  console.log('');
}

main().catch(console.error);



