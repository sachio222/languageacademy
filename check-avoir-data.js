#!/usr/bin/env node

/**
 * Check how avoir and its conjugations store their data
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkAvoir() {
  console.log('🔍 Checking avoir and its conjugations...\n');
  
  // Get base avoir entry
  const { data: avoir, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'avoir-fr')
    .single();
  
  if (avoir) {
    console.log('avoir-fr:');
    console.log(`  Tense: ${avoir.tense}`);
    console.log(`  Mood: ${avoir.mood}`);
    console.log(`  Person: ${avoir.person}`);
    console.log(`  Conjugation JSONB:`, avoir.conjugation ? 'YES' : 'NO');
    console.log(`  Relationships:`, JSON.stringify(avoir.relationships?.slice(0, 3), null, 2));
    console.log('');
  }
  
  // Get a conjugation like "ai"
  const { data: ai, error: aiError } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'ai-fr')
    .single();
  
  if (ai) {
    console.log('ai-fr:');
    console.log(`  Word: ${ai.word}`);
    console.log(`  Infinitive: ${ai.infinitive}`);
    console.log(`  Tense: ${ai.tense}`);
    console.log(`  Mood: ${ai.mood}`);
    console.log(`  Person: ${ai.person}`);
    console.log(`  Base word: ${ai.base_word}`);
    console.log(`  Redirect to: ${ai.redirect_to}`);
    console.log(`  Relationships:`, JSON.stringify(ai.relationships, null, 2));
    console.log('');
  }
  
  // Now check dépêcher for comparison
  const { data: depecherConj, error: depError } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'dépêchais-fr')
    .single();
  
  if (depecherConj) {
    console.log('dépêchais-fr:');
    console.log(`  Word: ${depecherConj.word}`);
    console.log(`  Infinitive: ${depecherConj.infinitive}`);
    console.log(`  Tense: ${depecherConj.tense}`);
    console.log(`  Mood: ${depecherConj.mood}`);
    console.log(`  Person: ${depecherConj.person}`);
    console.log(`  Base word: ${depecherConj.base_word}`);
    console.log(`  Redirect to: ${depecherConj.redirect_to}`);
    console.log(`  Relationships:`, JSON.stringify(depecherConj.relationships, null, 2));
    console.log('');
  }
  
  // Check how many avoir-related words have relationships
  const { data: avoirRelated, error: relError } = await supabase
    .from('dictionary_words')
    .select('id, word, tense, mood, person, relationships')
    .eq('infinitive', 'avoir')
    .limit(5);
  
  console.log('Sample avoir conjugations:');
  avoirRelated?.forEach(entry => {
    const hasRelationships = entry.relationships && entry.relationships.length > 0;
    console.log(`  ${entry.word}: tense=${entry.tense}, mood=${entry.mood}, person=${entry.person}, relationships=${hasRelationships ? entry.relationships.length : 0}`);
  });
}

checkAvoir().catch(console.error);

