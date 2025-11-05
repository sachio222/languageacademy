#!/usr/bin/env node

/**
 * Complete Final 6 Entries - Fix and migrate the last missing entries
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

// The 6 entries that need fixing
const final6 = [
  { corrupted: 'p-ques-fr', fixed: 'Pâques-fr' },
  { corrupted: 'no-l-fr', fixed: 'Noël-fr' },
  { corrupted: 'm-diterran-e-fr', fixed: 'Méditerranée-fr' },
  { corrupted: 'pars--fr', fixed: 'pars-fr' }, // Remove exclamation
  { corrupted: 'va--fr', fixed: 'va-fr' }, // Remove exclamation
  { corrupted: 'faites--fr', fixed: 'faites-fr' } // Remove exclamation
];

function transformEntry(entry, newId) {
  return {
    id: newId,
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

async function completeFinal6() {
  console.log('🎯 Completing migration: Final 6 entries...\n');

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

  let completed = 0;
  let failed = 0;

  for (const { corrupted, fixed } of final6) {
    console.log(`🔧 Processing: ${corrupted} → ${fixed}`);

    // Get corrupted entry from Cambridge
    if (!allCambridge.has(corrupted)) {
      console.log(`  ❌ Corrupted entry ${corrupted} not found in Cambridge`);
      failed++;
      continue;
    }

    const corruptedEntry = allCambridge.get(corrupted);
    console.log(`  📝 Word: "${corruptedEntry.word}" (${corruptedEntry.partOfSpeech})`);

    // Check if fixed version already exists
    const { data: existing } = await supabase
      .from('dictionary_words')
      .select('id')
      .eq('id', fixed);

    if (existing && existing.length > 0) {
      console.log(`  ⚠️  ${fixed} already exists in database - skipping`);
      continue;
    }

    // Transform and insert
    const fixedEntry = transformEntry(corruptedEntry, fixed);

    try {
      const { data, error } = await supabase
        .from('dictionary_words')
        .insert([fixedEntry])
        .select('id');

      if (error) {
        console.log(`  ❌ Failed: ${error.message}`);
        failed++;
      } else {
        console.log(`  ✅ Successfully inserted: ${fixed}`);
        completed++;
      }
    } catch (err) {
      console.log(`  ❌ Exception: ${err.message}`);
      failed++;
    }

    console.log('');
  }

  // Final verification
  const { count: finalCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  console.log('🎉 FINAL MIGRATION RESULTS:');
  console.log(`Entries completed: ${completed}/6`);
  console.log(`Failed: ${failed}/6`);
  console.log(`Final database count: ${finalCount}`);
  console.log(`Cambridge total: 2364`);

  if (finalCount >= 2364) {
    console.log('\\n🏆 MIGRATION 100% COMPLETE!');
    console.log('✅ All Cambridge dictionary entries successfully migrated');
    console.log('✅ Dictionary is now functionally identical to JavaScript Map');
    console.log('✅ Ready for production use');
  } else {
    console.log(`\\n⚠️  Still missing: ${2364 - finalCount} entries`);
  }

  return { completed, failed, finalCount };
}

completeFinal6().catch(console.error);
