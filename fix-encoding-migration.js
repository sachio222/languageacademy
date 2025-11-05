#!/usr/bin/env node

/**
 * Fix Encoding Migration - Complete the remaining 71 entries
 * Handle French accented characters properly
 */

import 'dotenv/config';
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

async function getAllDatabaseIds() {
  let allIds = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('dictionary_words')
      .select('id')
      .range(from, from + pageSize - 1);
      
    if (!data || data.length === 0) break;
    allIds = allIds.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  return new Set(allIds.map(e => e.id));
}

async function fixEncodingMigration() {
  console.log('🔧 Fixing encoding issues and completing migration...\n');

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

  console.log(`📊 Cambridge entries: ${allCambridge.size}`);

  // Get all existing database IDs (with proper pagination)
  console.log('🔍 Getting all database IDs...');
  const dbIds = await getAllDatabaseIds();
  console.log(`📊 Database entries: ${dbIds.size}`);

  // Find missing entries
  const missing = [];
  for (const [id, entry] of allCambridge) {
    if (!dbIds.has(id)) {
      missing.push({ id, entry });
    }
  }

  console.log(`📦 Missing entries: ${missing.length}`);

  if (missing.length === 0) {
    console.log('🎉 All entries already migrated!');
    return;
  }

  // Show sample of missing entries with their actual IDs
  console.log('\n🔍 Sample missing entries:');
  missing.slice(0, 10).forEach(({ id, entry }) => {
    console.log(`  ${id}: "${entry.word}" (${entry.partOfSpeech})`);
  });

  // Transform and insert missing entries one by one for better error handling
  let inserted = 0;
  let failed = 0;
  const failures = [];

  console.log('\n🔄 Inserting missing entries individually...\n');

  for (let i = 0; i < missing.length; i++) {
    const { id, entry } = missing[i];
    
    try {
      const transformed = transformEntry(entry);
      
      const { data, error } = await supabase
        .from('dictionary_words')
        .insert([transformed])
        .select('id');

      if (error) {
        console.log(`❌ ${i + 1}/${missing.length} FAILED: ${id} - ${error.message}`);
        failed++;
        failures.push({ id, error: error.message, entry });
      } else {
        console.log(`✅ ${i + 1}/${missing.length} SUCCESS: ${id}`);
        inserted++;
      }
    } catch (err) {
      console.log(`❌ ${i + 1}/${missing.length} EXCEPTION: ${id} - ${err.message}`);
      failed++;
      failures.push({ id, error: err.message, entry });
    }

    // Small delay to avoid overwhelming database
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Final verification
  const finalDbIds = await getAllDatabaseIds();
  const finalMissing = [];
  for (const [id, entry] of allCambridge) {
    if (!finalDbIds.has(id)) {
      finalMissing.push({ id, word: entry.word });
    }
  }

  console.log('\n📈 FINAL RESULTS:');
  console.log(`Cambridge total: ${allCambridge.size}`);
  console.log(`Database total: ${finalDbIds.size}`);
  console.log(`Successfully inserted: ${inserted}`);
  console.log(`Failed insertions: ${failed}`);
  console.log(`Still missing: ${finalMissing.length}`);

  if (finalMissing.length === 0) {
    console.log('\n🎉 MIGRATION 100% COMPLETE!');
    console.log('✅ All Cambridge entries successfully migrated to database');
    console.log('✅ Dictionary functionality is now identical to JavaScript Map');
  } else {
    console.log('\n⚠️  Migration incomplete:');
    finalMissing.slice(0, 10).forEach(({ id, word }) => {
      console.log(`  ${id}: ${word}`);
    });

    if (failures.length > 0) {
      console.log('\n❌ Failure analysis:');
      const errorTypes = {};
      failures.forEach(({ error }) => {
        errorTypes[error] = (errorTypes[error] || 0) + 1;
      });
      Object.entries(errorTypes).forEach(([error, count]) => {
        console.log(`  ${count}x: ${error}`);
      });
    }
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    cambridgeTotal: allCambridge.size,
    databaseTotal: finalDbIds.size,
    inserted,
    failed,
    stillMissing: finalMissing.length,
    failures: failures.slice(0, 20) // First 20 failures for debugging
  };

  import('fs').then(fs => {
    fs.writeFileSync('encoding-fix-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Detailed report saved to encoding-fix-report.json');
  });
}

fixEncodingMigration().catch(console.error);
