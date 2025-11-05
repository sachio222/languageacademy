#!/usr/bin/env node

/**
 * Check and fix RLS policy for dictionary_words table
 * This allows anonymous users to read the dictionary
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAndFixRLS() {
  console.log('🔍 Checking RLS policies for dictionary_words...\n');
  
  // Check current policies
  const { data: policies, error: policiesError } = await supabase.rpc('exec_sql', {
    sql: `
      SELECT 
        schemaname,
        tablename,
        policyname,
        permissive,
        roles,
        cmd,
        qual
      FROM pg_policies 
      WHERE tablename = 'dictionary_words';
    `
  }).catch(() => ({ data: null, error: null }));
  
  if (policiesError) {
    // Try direct query
    const { data: directPolicies } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'dictionary_words');
    
    console.log('Current policies:', directPolicies || 'Could not query policies');
  } else {
    console.log('Current policies:', policies);
  }
  
  // Test anonymous access
  const anonClient = createClient(supabaseUrl, process.env.VITE_SUPABASE_ANON_KEY);
  const { data: anonData, error: anonError, count: anonCount } = await anonClient
    .from('dictionary_words')
    .select('*', { count: 'exact', head: true })
    .limit(1);
  
  console.log('\n📊 Anonymous access test:');
  console.log('  Count:', anonCount);
  console.log('  Error:', anonError?.message || 'None');
  
  if (anonCount === 0 && !anonError) {
    console.log('\n❌ RLS is blocking anonymous access (returns 0 rows)');
    console.log('\n🔧 To fix, run this SQL in Supabase SQL Editor:');
    console.log(`
-- Allow anonymous users to read dictionary
DROP POLICY IF EXISTS "Dictionary is readable by all authenticated users" ON dictionary_words;

CREATE POLICY "Dictionary is readable by everyone" 
  ON dictionary_words FOR SELECT 
  TO public
  USING (true);
    `);
  } else if (anonError) {
    console.log('\n❌ RLS error:', anonError.message);
    console.log('\n🔧 To fix, run the SQL above');
  } else {
    console.log('\n✅ Anonymous access is working!');
  }
}

checkAndFixRLS().catch(console.error);
