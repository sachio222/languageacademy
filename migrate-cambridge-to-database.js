#!/usr/bin/env node

/**
 * Migrate Cambridge Dictionary to PostgreSQL Database
 * Loads all 2,396 Cambridge dictionary entries into Supabase
 */

import 'dotenv/config';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Import all Cambridge dictionaries
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

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role for admin operations

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Transform Cambridge entry to database format
 */
function transformEntry(entry) {
  return {
    // Core fields
    id: entry.id,
    lang: entry.lang || 'fr',
    word: entry.word,
    part_of_speech: entry.partOfSpeech,
    
    // Direct fields for fast queries
    gender: entry.gender || null,
    phonetic: entry.phonetic || null,
    definition: entry.definition || null,
    
    // Curriculum tracking
    unit: entry.unit || null,
    module: entry.module || null,
    lesson: entry.lesson || null,
    cefr_level: entry.cefr_level || null,
    difficulty: entry.difficulty || null,
    
    // Verb-specific
    infinitive: entry.infinitive || null,
    conjugation_group: entry.conjugationGroup || null,
    
    // Adjective-specific
    adjective_position: entry.position || null,
    
    // JSONB fields
    translations: entry.translations || [],
    relationships: entry.relationships || [],
    examples: entry.examples || [],
    tags: entry.tags || [],
    
    // Part-of-speech specific JSONB
    verb_phrases: entry.verb_phrases || [],
    conjugation: entry.conjugation || null,
    noun_phrases: entry.noun_phrases || [],
    noun_articles: entry.noun_articles || null,
    adjective_phrases: entry.adjective_phrases || [],
    adjective_forms: entry.adjective_forms || null,
    
    // Additional metadata
    etymology: entry.etymology || null,
    usage_notes: entry.usage_notes || null,
    register: entry.register || [],
    regional_variants: entry.regional_variants || [],
    
    // Frequency data
    frequency: entry.frequency || null,
    
    // Cambridge data
    cambridge_data: entry.cambridge_data || null,
    
    // Source and verification
    sources: entry.sources || ['cambridge'],
    verified: entry.verified || false,
    
    // Timestamps
    created_at: entry.created_at || new Date().toISOString(),
    updated_at: entry.updated_at || new Date().toISOString()
  };
}

/**
 * Batch insert entries with error handling
 */
async function batchInsert(entries, batchSize = 100) {
  const results = {
    total: entries.length,
    inserted: 0,
    errors: []
  };

  console.log(`📦 Processing ${entries.length} entries in batches of ${batchSize}...`);

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(entries.length / batchSize);
    
    console.log(`🔄 Batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);
    
    try {
      const { data, error } = await supabase
        .from('dictionary_words')
        .insert(batch)
        .select('id');
      
      if (error) {
        console.error(`❌ Batch ${batchNum} failed:`, error.message);
        results.errors.push({
          batch: batchNum,
          error: error.message,
          entries: batch.map(e => e.id)
        });
      } else {
        results.inserted += data.length;
        console.log(`✅ Batch ${batchNum} completed: ${data.length} entries inserted`);
      }
    } catch (err) {
      console.error(`❌ Batch ${batchNum} exception:`, err.message);
      results.errors.push({
        batch: batchNum,
        error: err.message,
        entries: batch.map(e => e.id)
      });
    }
    
    // Small delay to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}

/**
 * Main migration function
 */
async function migrateCambridgeDictionary() {
  console.log('🚀 Starting Cambridge Dictionary Migration to PostgreSQL...\n');

  // Combine all Cambridge dictionaries
  const allDictionaries = [
    { name: 'nouns', map: nounsCambridge },
    { name: 'verbs', map: verbsCambridge },
    { name: 'adjectives', map: adjectivesCambridge },
    { name: 'adverbs', map: adverbsCambridge },
    { name: 'pronouns', map: pronounsCambridge },
    { name: 'articles', map: articlesCambridge },
    { name: 'prepositions', map: prepositionsCambridge },
    { name: 'conjunctions', map: conjunctionsCambridge },
    { name: 'interjections', map: interjectionsCambridge },
    { name: 'interrogatives', map: interrogativesCambridge },
    { name: 'alphabet', map: alphabetCambridge },
    { name: 'expressions', map: expressionsCambridge }
  ];

  // Collect all entries
  const allEntries = [];
  let totalCount = 0;

  console.log('📊 Collecting entries from Cambridge dictionaries:\n');

  for (const { name, map } of allDictionaries) {
    const count = map.size;
    totalCount += count;
    console.log(`📁 ${name}.js: ${count} entries`);
    
    for (const [id, entry] of map) {
      try {
        const transformed = transformEntry(entry);
        allEntries.push(transformed);
      } catch (error) {
        console.error(`❌ Failed to transform ${id}:`, error.message);
      }
    }
  }

  console.log(`\n🎯 Total entries to migrate: ${totalCount}`);
  console.log(`✅ Successfully transformed: ${allEntries.length}`);

  // Check database connection
  console.log('\n🔌 Testing database connection...');
  const { data: testData, error: testError } = await supabase
    .from('dictionary_words')
    .select('id')
    .limit(1);

  if (testError) {
    console.error('❌ Database connection failed:', testError.message);
    return;
  }

  console.log('✅ Database connection successful');

  // Check if table exists and is empty
  const { count: existingCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  if (existingCount > 0) {
    console.log(`⚠️  Warning: dictionary_words table already contains ${existingCount} entries`);
    console.log('This migration will add new entries (duplicates may occur if IDs conflict)');
  }

  // Perform migration
  console.log('\n🔄 Starting batch insertion...');
  const results = await batchInsert(allEntries);

  // Report results
  console.log('\n📈 MIGRATION RESULTS:');
  console.log(`Total entries processed: ${results.total}`);
  console.log(`Successfully inserted: ${results.inserted}`);
  console.log(`Failed batches: ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    results.errors.forEach(({ batch, error, entries }) => {
      console.log(`  Batch ${batch}: ${error}`);
      console.log(`    Affected entries: ${entries.slice(0, 3).join(', ')}${entries.length > 3 ? '...' : ''}`);
    });
  }

  // Verify final count
  const { count: finalCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  console.log(`\n🎯 Final database count: ${finalCount} entries`);

  // Save migration report
  const report = {
    timestamp: new Date().toISOString(),
    totalProcessed: results.total,
    successfullyInserted: results.inserted,
    errors: results.errors,
    finalDatabaseCount: finalCount
  };

  fs.writeFileSync('cambridge-migration-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Migration report saved to cambridge-migration-report.json');

  if (results.inserted === results.total) {
    console.log('\n🎉 Migration completed successfully!');
  } else {
    console.log('\n⚠️  Migration completed with some errors. Check the report for details.');
  }
}

// Run migration
migrateCambridgeDictionary().catch(console.error);

