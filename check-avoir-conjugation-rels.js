#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
  // Check a conjugation of avoir
  const { data: ai, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'ai-fr')
    .single();
  
  console.log('ai-fr relationships:');
  console.log(`  Count: ${ai?.relationships?.length || 0}`);
  console.log(JSON.stringify(ai?.relationships, null, 2));
  
  // Check another one
  const { data: avais, error: e2 } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'avais-fr')
    .single();
  
  console.log('\navais-fr relationships:');
  console.log(`  Count: ${avais?.relationships?.length || 0}`);
  console.log(JSON.stringify(avais?.relationships, null, 2));
}

check().catch(console.error);

