#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkRelationships() {
  console.log('🔍 Checking dépêcher relationships in database...\n');
  
  // Get the base verb
  const { data: baseVerb, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'dépêcher-fr')
    .single();
  
  if (error || !baseVerb) {
    console.log('❌ Base verb not found:', error?.message);
    return;
  }
  
  console.log(`Base verb: ${baseVerb.word}`);
  console.log(`Relationships:`, JSON.stringify(baseVerb.relationships, null, 2));
  console.log('');
  
  // Get a conjugation
  const { data: conj, error: conjError } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'dépêchais-fr')
    .single();
  
  if (conjError || !conj) {
    console.log('❌ Conjugation not found:', conjError?.message);
    return;
  }
  
  console.log(`Conjugation: ${conj.word}`);
  console.log(`Tense: ${conj.tense}, Person: ${conj.person}, Mood: ${conj.mood}`);
  console.log(`Infinitive: ${conj.infinitive}`);
  console.log(`Relationships:`, JSON.stringify(conj.relationships, null, 2));
}

checkRelationships().catch(console.error);

