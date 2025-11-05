#!/usr/bin/env node

/**
 * Final Cambridge Dictionary Migration
 * Use upsert to handle conflicts properly
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

async function finalMigration() {
  console.log('🚀 Final Cambridge Dictionary Migration with Upsert...\n');

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

  // Transform all entries
  const allEntries = Array.from(allCambridge.values()).map(transformEntry);
  
  // Use upsert (insert with ON CONFLICT DO NOTHING)
  const batchSize = 50; // Smaller batches for upsert
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < allEntries.length; i += batchSize) {
    const batch = allEntries.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(allEntries.length / batchSize);
    
    console.log(`🔄 Batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);
    
    const { data, error } = await supabase
      .from('dictionary_words')
      .upsert(batch, { onConflict: 'id', ignoreDuplicates: true })
      .select('id');
    
    if (error) {
      console.error(`❌ Batch ${batchNum} failed:`, error.message);
    } else {
      const actualInserted = data?.length || 0;
      inserted += actualInserted;
      skipped += (batch.length - actualInserted);
      console.log(`✅ Batch ${batchNum}: ${actualInserted} inserted, ${batch.length - actualInserted} skipped`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  // Final count
  const { count: finalCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  console.log('\n📈 FINAL RESULTS:');
  console.log(`Cambridge entries: ${allCambridge.size}`);
  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped (already existed): ${skipped}`);
  console.log(`Final database count: ${finalCount}`);

  if (finalCount >= allCambridge.size) {
    console.log('\n🎉 MIGRATION COMPLETE! All Cambridge entries in database.');
  } else {
    console.log(`\n⚠️  Still missing: ${allCambridge.size - finalCount} entries`);
  }
}

finalMigration().catch(console.error);
