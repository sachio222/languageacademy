#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
  // Check dépêchaient (the one showing in the screenshot)
  const { data, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('id', 'dépêchaient-fr')
    .single();
  
  console.log('dépêchaient-fr:');
  console.log(`  Relationships: ${data?.relationships?.length || 0} items`);
  if (data?.relationships) {
    console.log(JSON.stringify(data.relationships, null, 2));
  }
}

check().catch(console.error);

