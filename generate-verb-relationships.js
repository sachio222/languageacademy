#!/usr/bin/env node

/**
 * Generate proper relationships for all verbs (like avoir)
 * Updates both files and database
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';
import fs from 'fs';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function generateRelationships() {
  console.log('🔧 Generating verb relationships...\n');
  
  // Build map of infinitives to conjugations
  const infinitiveMap = new Map();
  const allEntries = new Map(verbsCambridge);
  
  allEntries.forEach((entry, id) => {
    if (entry.partOfSpeech === 'verb') {
      const infinitive = entry.infinitive || entry.word;
      
      if (!infinitiveMap.has(infinitive)) {
        infinitiveMap.set(infinitive, {
          baseEntry: null,
          conjugations: []
        });
      }
      
      const data = infinitiveMap.get(infinitive);
      
      // If this is the infinitive form itself
      if (entry.word === infinitive && (entry.tense === 'infinitive' || entry.mood === 'infinitive' || !entry.tense)) {
        data.baseEntry = { id, entry };
      } else if (entry.infinitive === infinitive) {
        // This is a conjugation
        data.conjugations.push({ id, entry });
      }
    }
  });
  
  console.log(`Found ${infinitiveMap.size} infinitive verbs\n`);
  
  let updatedInfinitives = 0;
  let updatedConjugations = 0;
  
  // Generate relationships for each verb
  infinitiveMap.forEach((data, infinitive) => {
    const { baseEntry, conjugations } = data;
    
    if (!baseEntry) {
      console.log(`⚠️  No base entry found for ${infinitive}`);
      return;
    }
    
    // Generate relationships from base to conjugations
    const baseRelationships = conjugations.map(({ id, entry }) => {
      // Build note from tense/mood/person
      let note = 'conjugated form';
      
      if (entry.tense && entry.person) {
        note = `${entry.tense} - ${entry.person}`;
      } else if (entry.tense) {
        note = entry.tense;
      } else if (entry.mood && entry.mood !== 'indicative') {
        note = entry.mood;
      }
      
      return {
        type: 'conjugation_pair',
        targetId: id,
        targetWord: entry.word,
        note: note
      };
    });
    
    // Add self-reference for infinitive
    baseRelationships.unshift({
      type: 'conjugation_pair',
      targetId: baseEntry.id,
      targetWord: baseEntry.entry.word,
      note: 'infinitive form'
    });
    
    // Update base entry
    baseEntry.entry.relationships = baseRelationships;
    allEntries.set(baseEntry.id, baseEntry.entry);
    updatedInfinitives++;
    
    // Update each conjugation to point back to infinitive
    conjugations.forEach(({ id, entry }) => {
      entry.relationships = [{
        type: 'conjugation_pair',
        targetId: baseEntry.id,
        targetWord: baseEntry.entry.word,
        note: 'infinitive form'
      }];
      allEntries.set(id, entry);
      updatedConjugations++;
    });
  });
  
  console.log(`✅ Generated relationships for ${updatedInfinitives} infinitives`);
  console.log(`✅ Updated ${updatedConjugations} conjugations\n`);
  
  return allEntries;
}

async function updateFile(allEntries) {
  console.log('📝 Writing updated verbs.js file...\n');
  
  const filePath = 'src/data/dictionary/words/cambridge/verbs.js';
  
  // Convert Map to array for export
  const entriesArray = Array.from(allEntries.entries());
  
  const fileContent = `// Auto-generated verb dictionary with relationships
// Last updated: ${new Date().toISOString()}

export const verbsCambridge = new Map(${JSON.stringify(entriesArray, null, 2)});
`;
  
  fs.writeFileSync(filePath, fileContent);
  console.log('✅ File updated\n');
}

async function updateDatabase(allEntries) {
  console.log('💾 Updating database...\n');
  
  let updated = 0;
  let errors = 0;
  const errorDetails = [];
  
  const entries = Array.from(allEntries.values());
  
  for (const entry of entries) {
    try {
      const { error } = await supabase
        .from('dictionary_words')
        .update({
          relationships: entry.relationships || [],
          updated_at: new Date().toISOString()
        })
        .eq('id', entry.id);
      
      if (error) {
        errors++;
        errorDetails.push({ id: entry.id, word: entry.word, error: error.message });
      } else {
        updated++;
        if (updated % 100 === 0) {
          console.log(`  Updated ${updated} entries...`);
        }
      }
    } catch (err) {
      errors++;
      errorDetails.push({ id: entry.id, word: entry.word, error: err.message });
    }
  }
  
  console.log(`\n📊 DATABASE UPDATE SUMMARY:`);
  console.log(`   Updated:  ${updated}`);
  console.log(`   Errors:   ${errors}`);
  
  if (errorDetails.length > 0) {
    console.log(`\n❌ ERROR DETAILS:`);
    errorDetails.slice(0, 10).forEach(({ id, word, error }) => {
      console.log(`   ${word} (${id}): ${error}`);
    });
    if (errorDetails.length > 10) {
      console.log(`   ... and ${errorDetails.length - 10} more`);
    }
  }
  
  console.log('');
}

async function main() {
  const updatedEntries = generateRelationships();
  await updateFile(updatedEntries);
  await updateDatabase(updatedEntries);
  
  console.log('✅ Complete! All verb relationships generated and synced.\n');
}

main().catch(console.error);

