#!/usr/bin/env node

/**
 * Check how many entries have unpopulated tense/mood/person/number fields
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkUnpopulated() {
  console.log('🔍 Checking unpopulated fields in database...\n');
  
  // Count total verbs
  const { count: totalVerbs, error: verbError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .eq('part_of_speech', 'verb');
  
  console.log(`Total verbs: ${totalVerbs}`);
  
  // Count verbs with infinitive field
  const { count: verbsWithInfinitive, error: infError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .eq('part_of_speech', 'verb')
    .not('infinitive', 'is', null);
  
  console.log(`Verbs with infinitive: ${verbsWithInfinitive}`);
  
  // Count verbs with tense field
  const { count: verbsWithTense, error: tenseError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .eq('part_of_speech', 'verb')
    .not('tense', 'is', null);
  
  console.log(`Verbs with tense: ${verbsWithTense}`);
  console.log(`Verbs MISSING tense: ${totalVerbs - verbsWithTense}`);
  
  // Count verbs with mood field
  const { count: verbsWithMood, error: moodError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .eq('part_of_speech', 'verb')
    .not('mood', 'is', null);
  
  console.log(`Verbs with mood: ${verbsWithMood}`);
  console.log(`Verbs MISSING mood: ${totalVerbs - verbsWithMood}`);
  
  // Count verbs with person field
  const { count: verbsWithPerson, error: personError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .eq('part_of_speech', 'verb')
    .not('person', 'is', null);
  
  console.log(`Verbs with person: ${verbsWithPerson}`);
  console.log(`Verbs MISSING person: ${totalVerbs - verbsWithPerson}`);
  
  console.log('\n');
  
  // Check redirect entries
  const { count: redirectEntries, error: redError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .not('redirect_to', 'is', null);
  
  console.log(`Total redirect entries: ${redirectEntries}`);
  
  // Check all entries with base_word
  const { count: baseWordEntries, error: baseError } = await supabase
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .not('base_word', 'is', null);
  
  console.log(`Entries with base_word: ${baseWordEntries}`);
  
  console.log('\n📊 SUMMARY:');
  console.log(`Missing tense/mood/person data affects ${totalVerbs - verbsWithTense} verb entries`);
  console.log(`This breaks dynamic conjugation relationship generation in the UI`);
}

checkUnpopulated().catch(console.error);

