#!/usr/bin/env node

/**
 * Complete Cambridge Dictionary Migration
 * Only insert entries that don't already exist in database
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

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function transformEntry(entry) {
  return {
    id: entry.id,
    lang: entry.lang || 'fr',
    word: entry.word,
    part_of_speech: entry.partOfSpeech,
    gender: entry.gender || null,
    phonetic: entry.phonetic || null,
    definition: entry.definition || null,
    unit: entry.unit || null,
    module: entry.module || null,
    lesson: entry.lesson || null,
    cefr_level: entry.cefr_level || null,
    difficulty: entry.difficulty || null,
    infinitive: entry.infinitive || null,
    conjugation_group: entry.conjugationGroup || null,
    adjective_position: entry.position || null,
    translations: entry.translations || [],
    relationships: entry.relationships || [],
    examples: entry.examples || [],
    tags: entry.tags || [],
    verb_phrases: entry.verb_phrases || [],
    conjugation: entry.conjugation || null,
    noun_phrases: entry.noun_phrases || [],
    noun_articles: entry.noun_articles || null,
    adjective_phrases: entry.adjective_phrases || [],
    adjective_forms: entry.adjective_forms || null,
    etymology: entry.etymology || null,
    usage_notes: entry.usage_notes || null,
    register: entry.register || [],
    regional_variants: entry.regional_variants || [],
    frequency: entry.frequency || null,
    cambridge_data: entry.cambridge_data || null,
    sources: entry.sources || ['cambridge'],
    verified: entry.verified || false,
    created_at: entry.created_at || new Date().toISOString(),
    updated_at: entry.updated_at || new Date().toISOString()
  };
}

async function completeMigration() {
  console.log('🚀 Completing Cambridge Dictionary Migration...\n');

  // Combine all Cambridge dictionaries
  const allCambridge = new Map([
    ...nounsCambridge,
    ...verbsCambridge,
    ...adjectivesCambridge,
    ...adverbsCambridge,
    ...pronounsCambridge,
    ...articlesCambridge,
    ...prepositionsCambridge,
    ...conjunctionsCambridge,
    ...interjectionsCambridge,
    ...interrogativesCambridge,
    ...alphabetCambridge,
    ...expressionsCambridge,
  ]);

  console.log(`📊 Total Cambridge entries: ${allCambridge.size}`);

  // Get existing database IDs
  console.log('🔍 Checking existing database entries...');
  const { data: existingEntries } = await supabase
    .from('dictionary_words')
    .select('id');

  const existingIds = new Set(existingEntries?.map(e => e.id) || []);
  console.log(`📊 Existing database entries: ${existingIds.size}`);

  // Find entries that need to be inserted
  const toInsert = [];
  for (const [id, entry] of allCambridge) {
    if (!existingIds.has(id)) {
      toInsert.push(transformEntry(entry));
    }
  }

  console.log(`📦 Entries to insert: ${toInsert.length}`);
  console.log(`✅ Entries already exist: ${allCambridge.size - toInsert.length}`);

  if (toInsert.length === 0) {
    console.log('🎉 All Cambridge entries already in database!');
    return;
  }

  // Insert in batches
  const batchSize = 100;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < toInsert.length; i += batchSize) {
    const batch = toInsert.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(toInsert.length / batchSize);
    
    console.log(`🔄 Batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);
    
    const { data, error } = await supabase
      .from('dictionary_words')
      .insert(batch)
      .select('id');
    
    if (error) {
      console.error(`❌ Batch ${batchNum} failed:`, error.message);
      errors += batch.length;
    } else {
      inserted += data.length;
      console.log(`✅ Batch ${batchNum} completed: ${data.length} entries inserted`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Final verification
  const { count: finalCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  console.log('\n📈 COMPLETION RESULTS:');
  console.log(`Entries to insert: ${toInsert.length}`);
  console.log(`Successfully inserted: ${inserted}`);
  console.log(`Errors: ${errors}`);
  console.log(`Final database count: ${finalCount}`);
  console.log(`Cambridge total: ${allCambridge.size}`);

  if (finalCount === allCambridge.size) {
    console.log('\n🎉 MIGRATION COMPLETE! All Cambridge entries now in database.');
  } else {
    console.log(`\n⚠️  Migration incomplete. Missing: ${allCambridge.size - finalCount} entries`);
  }
}

completeMigration().catch(console.error);
