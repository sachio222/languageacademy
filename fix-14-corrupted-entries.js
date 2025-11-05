#!/usr/bin/env node

/**
 * Fix 14 Corrupted Dictionary Entries
 * Identify corrupted IDs, fix them, and migrate the corrected entries
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

// The 14 corrupted entries that need fixing
const corruptedEntries = [
  { corrupted: 'march--fr', fixed: 'marché-fr' },
  { corrupted: 'r-alit--fr', fixed: 'réalité-fr' },
  { corrupted: 'beaut--fr', fixed: 'beauté-fr' },
  { corrupted: 'caf--fr', fixed: 'café-fr' },
  { corrupted: '-t--fr', fixed: 'été-fr' },
  { corrupted: 'universit--fr', fixed: 'université-fr' },
  { corrupted: 'pars--fr', fixed: 'pars-fr' }, // imperative "Go!"
  { corrupted: 'va--fr', fixed: 'va-fr' }, // imperative "Go!"
  { corrupted: 'faites--fr', fixed: 'faites-fr' }, // imperative "Do!"
  { corrupted: 'fonc--fr', fixed: 'foncé-fr' },
  { corrupted: 'dor--fr', fixed: 'doré-fr' },
  { corrupted: 'argent--fr', fixed: 'argenté-fr' },
  { corrupted: 'fatigu--fr', fixed: 'fatigué-fr' },
  { corrupted: 'o--fr', fixed: 'où-fr' }
];

function transformEntry(entry, newId) {
  return {
    id: newId, // Use the fixed ID
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

async function fix14CorruptedEntries() {
  console.log('🔧 Fixing 14 corrupted dictionary entries...\n');

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

  let fixed = 0;
  let failed = 0;
  const results = [];

  for (const { corrupted, fixed: fixedId } of corruptedEntries) {
    console.log(`🔍 Processing: ${corrupted} → ${fixedId}`);

    // Check if corrupted entry exists in Cambridge
    if (!allCambridge.has(corrupted)) {
      console.log(`  ❌ Corrupted entry ${corrupted} not found in Cambridge dictionary`);
      failed++;
      continue;
    }

    // Get the corrupted entry
    const corruptedEntry = allCambridge.get(corrupted);
    console.log(`  📝 Word: "${corruptedEntry.word}" (${corruptedEntry.partOfSpeech})`);

    // Check if fixed version already exists in database
    const { data: existingFixed } = await supabase
      .from('dictionary_words')
      .select('id')
      .eq('id', fixedId);

    if (existingFixed && existingFixed.length > 0) {
      console.log(`  ⚠️  Fixed version ${fixedId} already exists in database - skipping`);
      continue;
    }

    // Transform entry with fixed ID
    const fixedEntry = transformEntry(corruptedEntry, fixedId);

    // Insert fixed entry into database
    try {
      const { data, error } = await supabase
        .from('dictionary_words')
        .insert([fixedEntry])
        .select('id');

      if (error) {
        console.log(`  ❌ Failed to insert ${fixedId}: ${error.message}`);
        failed++;
        results.push({ corrupted, fixed: fixedId, status: 'failed', error: error.message });
      } else {
        console.log(`  ✅ Successfully inserted ${fixedId}`);
        fixed++;
        results.push({ corrupted, fixed: fixedId, status: 'success', word: corruptedEntry.word });
      }
    } catch (err) {
      console.log(`  ❌ Exception inserting ${fixedId}: ${err.message}`);
      failed++;
      results.push({ corrupted, fixed: fixedId, status: 'exception', error: err.message });
    }

    console.log('');
  }

  // Final verification
  const { count: finalCount } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true });

  console.log('📈 RESULTS:');
  console.log(`Successfully fixed: ${fixed}/14`);
  console.log(`Failed: ${failed}/14`);
  console.log(`Final database count: ${finalCount}`);

  if (fixed === 14) {
    console.log('\n🎉 ALL 14 CORRUPTED ENTRIES FIXED!');
    console.log('✅ Dictionary migration is now 100% complete');
    console.log(`✅ Total entries: ${finalCount} (should be 2364)`);
  } else {
    console.log('\n⚠️  Some entries still need fixing:');
    results.filter(r => r.status !== 'success').forEach(r => {
      console.log(`  ${r.corrupted} → ${r.fixed}: ${r.status} (${r.error || ''})`);
    });
  }

  // Show successful fixes
  console.log('\n✅ Successfully fixed entries:');
  results.filter(r => r.status === 'success').forEach(r => {
    console.log(`  ${r.corrupted} → ${r.fixed}: "${r.word}"`);
  });

  // Save detailed report
  import('fs').then(fs => {
    const report = {
      timestamp: new Date().toISOString(),
      totalAttempted: 14,
      successful: fixed,
      failed: failed,
      finalDatabaseCount: finalCount,
      results
    };

    fs.writeFileSync('fix-14-entries-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Detailed report saved to fix-14-entries-report.json');
  });

  return { fixed, failed, finalCount };
}

fix14CorruptedEntries().catch(console.error);
