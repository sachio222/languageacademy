#!/usr/bin/env node

/**
 * Add sibling relationships to conjugations
 * So when viewing dépêchera, it shows all other conjugations with proper notes
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function addSiblingRelationships() {
  console.log('🔧 Adding sibling relationships to conjugations...\n');
  
  // Get all verbs
  const { data: allVerbs, error } = await supabase
    .from('dictionary_words')
    .select('*')
    .eq('part_of_speech', 'verb');
  
  if (error) {
    console.error('Error loading verbs:', error);
    return;
  }
  
  console.log(`Loaded ${allVerbs.length} verbs\n`);
  
  // Group by infinitive
  const byInfinitive = new Map();
  
  allVerbs.forEach(verb => {
    const infinitive = verb.infinitive || verb.word;
    if (!byInfinitive.has(infinitive)) {
      byInfinitive.set(infinitive, {
        base: null,
        conjugations: []
      });
    }
    
    const data = byInfinitive.get(infinitive);
    
    // Is this the base infinitive?
    if (verb.word === infinitive && (!verb.infinitive || verb.infinitive === infinitive)) {
      data.base = verb;
    } else {
      data.conjugations.push(verb);
    }
  });
  
  console.log(`Found ${byInfinitive.size} infinitive groups\n`);
  
  let updated = 0;
  let errors = 0;
  
  // For each conjugation, add relationships to all siblings
  for (const [infinitive, data] of byInfinitive) {
    const { base, conjugations } = data;
    
    if (!base || conjugations.length === 0) continue;
    
    // Get the base verb's relationships (which have the proper notes)
    const baseRelationships = base.relationships || [];
    
    // For each conjugation
    for (const conjugation of conjugations) {
      // Start with relationship back to infinitive
      const newRelationships = [{
        type: 'conjugation_pair',
        targetId: base.id,
        targetWord: base.word,
        note: 'infinitive form'
      }];
      
      // Add all siblings from base verb's relationships
      // (excluding the conjugation itself and the infinitive)
      baseRelationships.forEach(rel => {
        if (rel.targetId !== conjugation.id && rel.targetId !== base.id) {
          newRelationships.push(rel);
        }
      });
      
      // Update in database
      const { error: updateError } = await supabase
        .from('dictionary_words')
        .update({
          relationships: newRelationships,
          updated_at: new Date().toISOString()
        })
        .eq('id', conjugation.id);
      
      if (updateError) {
        errors++;
        if (errors <= 5) {
          console.error(`❌ Failed to update ${conjugation.word}: ${updateError.message}`);
        }
      } else {
        updated++;
        if (updated % 100 === 0) {
          console.log(`  Updated ${updated} conjugations...`);
        }
      }
    }
  }
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Updated:  ${updated}`);
  console.log(`   Errors:   ${errors}`);
  console.log('');
}

addSiblingRelationships().catch(console.error);

