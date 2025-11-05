#!/usr/bin/env node

/**
 * Investigate Missing Entries
 * Find out exactly why 71 entries failed to migrate
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

async function investigateMissing() {
  console.log('🔍 Investigating the 71 missing entries...\n');

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

  // Get all database IDs
  const { data: dbEntries } = await supabase
    .from('dictionary_words')
    .select('id');

  const dbIds = new Set(dbEntries.map(e => e.id));

  // Find missing entries
  const missing = [];
  for (const [id, entry] of allCambridge) {
    if (!dbIds.has(id)) {
      missing.push({ id, entry });
    }
  }

  console.log(`📊 Missing entries: ${missing.length}`);
  console.log(`📊 Cambridge total: ${allCambridge.size}`);
  console.log(`📊 Database total: ${dbIds.size}`);

  // Test each missing entry individually
  console.log('\n🔍 Testing individual missing entries...\n');

  for (let i = 0; i < Math.min(missing.length, 10); i++) {
    const { id, entry } = missing[i];
    console.log(`Testing ${i + 1}/10: ${id} (${entry.word})`);

    try {
      const transformed = transformEntry(entry);
      
      // Try to insert this single entry
      const { data, error } = await supabase
        .from('dictionary_words')
        .insert([transformed])
        .select('id');

      if (error) {
        console.log(`  ❌ FAILED: ${error.message}`);
        console.log(`  📋 Entry data:`, JSON.stringify(transformed, null, 2).substring(0, 200) + '...');
      } else {
        console.log(`  ✅ SUCCESS: Inserted ${data[0].id}`);
      }
    } catch (err) {
      console.log(`  ❌ EXCEPTION: ${err.message}`);
    }
    
    console.log('');
  }

  // Check for common issues in missing entries
  console.log('🔍 Analyzing missing entry patterns...\n');

  const issues = {
    longIds: [],
    specialChars: [],
    nullFields: [],
    invalidData: []
  };

  missing.forEach(({ id, entry }) => {
    if (id.length > 50) issues.longIds.push(id);
    if (/[^\w\-àâäéèêëïîôöùûüÿç]/i.test(id)) issues.specialChars.push(id);
    if (!entry.word || !entry.partOfSpeech) issues.nullFields.push(id);
    
    try {
      transformEntry(entry);
    } catch (e) {
      issues.invalidData.push({ id, error: e.message });
    }
  });

  console.log(`Long IDs (>50 chars): ${issues.longIds.length}`);
  if (issues.longIds.length > 0) {
    issues.longIds.slice(0, 3).forEach(id => console.log(`  ${id}`));
  }

  console.log(`Special characters in ID: ${issues.specialChars.length}`);
  if (issues.specialChars.length > 0) {
    issues.specialChars.slice(0, 3).forEach(id => console.log(`  ${id}`));
  }

  console.log(`Null required fields: ${issues.nullFields.length}`);
  if (issues.nullFields.length > 0) {
    issues.nullFields.slice(0, 3).forEach(id => console.log(`  ${id}`));
  }

  console.log(`Invalid data transformation: ${issues.invalidData.length}`);
  if (issues.invalidData.length > 0) {
    issues.invalidData.slice(0, 3).forEach(({ id, error }) => console.log(`  ${id}: ${error}`));
  }
}

investigateMissing().catch(console.error);
