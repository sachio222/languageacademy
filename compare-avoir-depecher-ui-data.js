#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { generateAllRelationships, createWordMaps } from './src/utils/relationshipUtils.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function compareUIData() {
  console.log('🔍 Comparing how UI processes avoir vs dépêcher...\n');
  
  // Get both avoir and depecher entries
  const { data: allWords, error } = await supabase
    .from('dictionary_words')
    .select('*');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  const avoirBase = allWords.find(w => w.id === 'avoir-fr');
  const depecherBase = allWords.find(w => w.id === 'dépêcher-fr');
  const depechaient = allWords.find(w => w.id === 'dépêchaient-fr');
  
  console.log('=== AVOIR (base) ===');
  console.log('Stored relationships:', avoirBase.relationships?.length || 0);
  console.log('First 3:', JSON.stringify(avoirBase.relationships?.slice(0, 3), null, 2));
  
  // Generate relationships dynamically like the UI does
  const wordMaps = createWordMaps(allWords);
  const generatedAvoirRels = generateAllRelationships(avoirBase, wordMaps);
  console.log('\nGenerated relationships:', generatedAvoirRels.length);
  console.log('First 3:', JSON.stringify(generatedAvoirRels.slice(0, 3), null, 2));
  
  console.log('\n=== DÉPÊCHER (base) ===');
  console.log('Stored relationships:', depecherBase.relationships?.length || 0);
  console.log('First 3:', JSON.stringify(depecherBase.relationships?.slice(0, 3), null, 2));
  
  const generatedDepecherRels = generateAllRelationships(depecherBase, wordMaps);
  console.log('\nGenerated relationships:', generatedDepecherRels.length);
  console.log('First 3:', JSON.stringify(generatedDepecherRels.slice(0, 3), null, 2));
  
  console.log('\n=== DÉPÊCHAIENT (conjugation) ===');
  console.log('Stored relationships:', depechaient.relationships?.length || 0);
  console.log(JSON.stringify(depechaient.relationships, null, 2));
  
  const generatedDepechaientRels = generateAllRelationships(depechaient, wordMaps);
  console.log('\nGenerated relationships:', generatedDepechaientRels.length);
  console.log(JSON.stringify(generatedDepechaientRels, null, 2));
}

compareUIData().catch(console.error);

