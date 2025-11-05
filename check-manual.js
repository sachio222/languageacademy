#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
  // Check habitants
  const { data: habitants, error: e1 } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'habitants-fr')
    .single();
  
  console.log('habitants-fr:');
  console.log(JSON.stringify(habitants, null, 2));
  console.log('\n');
  
  // Check vies
  const { data: vies, error: e2 } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'vies-fr')
    .single();
  
  console.log('vies-fr:');
  console.log(JSON.stringify(vies, null, 2));
}

check().catch(console.error);

