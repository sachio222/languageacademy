#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
  // Check base dépêcher
  const { data: base, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'dépêcher-fr')
    .single();
  
  console.log('dépêcher-fr (base):');
  console.log(`  Relationships: ${base?.relationships?.length || 0} items`);
  if (base?.relationships?.length > 0) {
    console.log(JSON.stringify(base.relationships.slice(0, 5), null, 2));
  }
}

check().catch(console.error);

