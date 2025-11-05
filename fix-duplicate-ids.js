#!/usr/bin/env node

/**
 * Fix duplicate IDs in database - add part of speech suffix to make them unique
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// All duplicate IDs that need fixing
const duplicates = [
  { id: 'demande-fr', conflicts: ['noun', 'verb'] },
  { id: 'jeunes-fr', conflicts: ['noun', 'adjective'] },
  { id: 'voyage-fr', conflicts: ['noun', 'verb'] },
  { id: 'fait-fr', conflicts: ['noun', 'verb'] },
  { id: 'leur-fr', conflicts: ['noun', 'pronoun'] },
  { id: 'meilleur-fr', conflicts: ['noun', 'adjective'] },
  { id: 'même-fr', conflicts: ['noun', 'adjective'] },
  { id: 'savoir-fr', conflicts: ['noun', 'verb'] },
  { id: 'carte de crédit-fr', conflicts: ['noun', 'expression'] },
  { id: 'est-fr', conflicts: ['noun', 'verb'] },
  { id: 'orange-fr', conflicts: ['noun', 'adjective'] },
  { id: 'abord-fr', conflicts: ['noun', 'adverb'] },
  { id: 'était-fr', conflicts: ['noun', 'verb'] },
  { id: 'été-fr', conflicts: ['noun', 'verb'] },
  { id: 'rêve-fr', conflicts: ['noun', 'verb'] },
  { id: 'marché-fr', conflicts: ['noun', 'verb'] },
  { id: 'a-fr', conflicts: ['verb', 'alphabet'] },
  { id: 'belle-fr', conflicts: ['adjective', 'unknown'] },
  { id: 'tout-fr', conflicts: ['adjective', 'adverb', 'pronoun'] },
  { id: 'toutes-fr', conflicts: ['adjective', 'pronoun'] },
  { id: 'beaux-fr', conflicts: ['adjective', 'unknown'] },
  { id: 'belles-fr', conflicts: ['adjective', 'unknown'] },
  { id: 'tous-fr', conflicts: ['adjective', 'pronoun'] },
  { id: 'plusieurs-fr', conflicts: ['adjective', 'adverb'] },
  { id: 'y-fr', conflicts: ['pronoun', 'alphabet'] },
  { id: 'qu\'on-fr', conflicts: ['pronoun', 'conjunction', 'expression'] },
];

async function fixDuplicates() {
  console.log(`🔧 Fixing ${duplicates.length} duplicate ID cases...\n`);
  
  let fixed = 0;
  let errors = 0;
  
  for (const { id, conflicts } of duplicates) {
    // Skip 'a-fr' - already fixed
    if (id === 'a-fr') {
      console.log(`⏭️  ${id}: Already fixed (skipping)`);
      continue;
    }
    
    console.log(`\n📝 Fixing ${id}:`);
    
    // Get all entries with this ID
    const { data: entries, error: fetchError } = await supabase
      .from('dictionary_words')
      .select('*')
      .eq('id', id);
    
    if (fetchError) {
      console.log(`  ❌ Error fetching: ${fetchError.message}`);
      errors++;
      continue;
    }
    
    if (!entries || entries.length === 0) {
      console.log(`  ⚠️  No entries found for ${id}`);
      continue;
    }
    
    if (entries.length === 1) {
      console.log(`  ℹ️  Only one entry found (may have been fixed already)`);
      continue;
    }
    
    console.log(`  Found ${entries.length} entries`);
    
    // Update each entry with unique ID based on part of speech
    for (const entry of entries) {
      const pos = entry.part_of_speech || 'unknown';
      const newId = `${id.replace('-fr', '')}-${pos}-fr`;
      
      // Skip if already has the correct ID format
      if (entry.id === newId) {
        console.log(`  ✓ ${entry.id} already has correct ID`);
        continue;
      }
      
      // Check if new ID already exists
      const { data: existing } = await supabase
        .from('dictionary_words')
        .select('id')
        .eq('id', newId)
        .single();
      
      if (existing) {
        console.log(`  ⚠️  ${newId} already exists, skipping`);
        continue;
      }
      
      // Update the entry with new ID
      const { error: updateError } = await supabase
        .from('dictionary_words')
        .update({ id: newId })
        .eq('id', id)
        .eq('part_of_speech', pos);
      
      if (updateError) {
        console.log(`  ❌ Error updating ${entry.id} → ${newId}: ${updateError.message}`);
        errors++;
      } else {
        console.log(`  ✅ ${entry.id} → ${newId} (${pos})`);
        fixed++;
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Fixed: ${fixed}`);
  console.log(`  Errors: ${errors}`);
}

fixDuplicates().catch(console.error);
