#!/usr/bin/env node

/**
 * Remove 71 Corrupted Entries from Cambridge Dictionary Files
 * Uses actual JavaScript Map objects - no pattern matching
 */

import fs from 'fs';
import path from 'path';

// Import all Cambridge dictionaries
import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';
import { adjectivesCambridge } from './src/data/dictionary/words/cambridge/adjectives.js';
import { adverbsCambridge } from './src/data/dictionary/words/cambridge/adverbs.js';
import { pronounsCambridge } from './src/data/dictionary/words/cambridge/pronouns.js';
import { prepositionsCambridge } from './src/data/dictionary/words/cambridge/prepositions.js';
import { interrogativesCambridge } from './src/data/dictionary/words/cambridge/interrogatives.js';

// The 71 corrupted IDs to remove
const corruptedIds = [
  // nouns.js (44 entries)
  'f-vrier-fr', 'ao-t-fr', 'd-cembre-fr', 'p-ques-fr', 'no-l-fr', 'halloween-fr', 'f-minin-fr', 'z-ro-fr', 'paris-fr', 'bordeaux-fr',
  'r-ve-fr', 'cath-drale-fr', 'march--fr', 'r-alit--fr', 'soir-e-fr', 'syst-me-fr', 'mati-res-fr', 'litt-rature-fr', 'plan-te-fr', '-conomie-fr',
  'm-tro-fr', 'r-gion-fr', 'beaut--fr', 'g-n-ration-fr', 'd-chets-fr', '-nergie-fr', 'si-cle-fr', 'r-le-fr', 'sc-ne-fr', 'm-diterran-e-fr',
  '-tait-fr', 'pens-es-fr', 'r-vision-fr', 'r-ponses-fr', 'id-e-fr', 'm-thode-fr', 'journ-e-fr', 'pierre-fr', 'marie-fr', 'caf--fr',
  'pens-e-fr', 'r-ponse-fr', '-t--fr', 'universit--fr',
  
  // verbs.js (10 entries)
  'conna-tre-fr', '-tudier-fr', 'r-viser-fr', '-voluer-fr', 'd-pend-fr', '-conomiser-fr', 'pars--fr', 'va--fr', 'faites--fr', 'prot-ger-fr',
  
  // adjectives.js (10 entries)
  '-ducatif-fr', 'fonc--fr', 'p-le-fr', 'dor--fr', 'argent--fr', 'm-me-fr', 'g-nial-fr', 'fran-ais-fr', 'd-licieux-fr', 'fatigu--fr',
  
  // adverbs.js (3 entries)
  's-rieusement-fr', 'compl-tement-fr', 'r-guli-rement-fr',
  
  // pronouns.js (1 entry)
  '-a-fr',
  
  // prepositions.js (2 entries)
  'derri-re-fr', 'apr-s-fr',
  
  // interrogatives.js (1 entry)
  'o--fr'
];

// File mapping
const fileMapping = {
  'nouns.js': { map: nounsCambridge, varName: 'nounsCambridge', corruptedIds: ['f-vrier-fr', 'ao-t-fr', 'd-cembre-fr', 'p-ques-fr', 'no-l-fr', 'halloween-fr', 'f-minin-fr', 'z-ro-fr', 'paris-fr', 'bordeaux-fr', 'r-ve-fr', 'cath-drale-fr', 'march--fr', 'r-alit--fr', 'soir-e-fr', 'syst-me-fr', 'mati-res-fr', 'litt-rature-fr', 'plan-te-fr', '-conomie-fr', 'm-tro-fr', 'r-gion-fr', 'beaut--fr', 'g-n-ration-fr', 'd-chets-fr', '-nergie-fr', 'si-cle-fr', 'r-le-fr', 'sc-ne-fr', 'm-diterran-e-fr', '-tait-fr', 'pens-es-fr', 'r-vision-fr', 'r-ponses-fr', 'id-e-fr', 'm-thode-fr', 'journ-e-fr', 'pierre-fr', 'marie-fr', 'caf--fr', 'pens-e-fr', 'r-ponse-fr', '-t--fr', 'universit--fr'] },
  'verbs.js': { map: verbsCambridge, varName: 'verbsCambridge', corruptedIds: ['conna-tre-fr', '-tudier-fr', 'r-viser-fr', '-voluer-fr', 'd-pend-fr', '-conomiser-fr', 'pars--fr', 'va--fr', 'faites--fr', 'prot-ger-fr'] },
  'adjectives.js': { map: adjectivesCambridge, varName: 'adjectivesCambridge', corruptedIds: ['-ducatif-fr', 'fonc--fr', 'p-le-fr', 'dor--fr', 'argent--fr', 'm-me-fr', 'g-nial-fr', 'fran-ais-fr', 'd-licieux-fr', 'fatigu--fr'] },
  'adverbs.js': { map: adverbsCambridge, varName: 'adverbsCambridge', corruptedIds: ['s-rieusement-fr', 'compl-tement-fr', 'r-guli-rement-fr'] },
  'pronouns.js': { map: pronounsCambridge, varName: 'pronounsCambridge', corruptedIds: ['-a-fr'] },
  'prepositions.js': { map: prepositionsCambridge, varName: 'prepositionsCambridge', corruptedIds: ['derri-re-fr', 'apr-s-fr'] },
  'interrogatives.js': { map: interrogativesCambridge, varName: 'interrogativesCambridge', corruptedIds: ['o--fr'] }
};

// Function to serialize Map to exact file format
function serializeMap(map, varName, fileName) {
  const entries = Array.from(map.entries());
  const entryStrings = entries.map(([id, entry]) => {
    const entryStr = JSON.stringify(entry, null, 8);
    // Format matches original: [id, { ... }]
    return `  [\n    "${id}",\n        ${entryStr}\n  ]`;
  });
  
  const partOfSpeech = fileName.replace('.js', '').replace(/^./, c => c.toUpperCase());
  const header = `/**\n * Cambridge Dictionary Scraped ${partOfSpeech}\n * Generated: 2025-11-04T15:41:22.746Z\n * Cleaned: ${new Date().toISOString()}\n * Successfully scraped: ${entries.length}/${entries.length}\n */\n\n`;
  
  return `${header}export const ${varName} = new Map([\n${entryStrings.join(',\n')}\n]);\n`;
}

function removeCorruptedEntries() {
  console.log('🔧 Removing 71 corrupted entries from Cambridge files...\n');
  
  // Combine all maps to check for duplicates
  const allCambridge = new Map([
    ...nounsCambridge, ...verbsCambridge, ...adjectivesCambridge, ...adverbsCambridge,
    ...pronounsCambridge, ...prepositionsCambridge, ...interrogativesCambridge,
  ]);
  
  let totalDeleted = 0;
  
  // Process each file
  Object.entries(fileMapping).forEach(([fileName, { map, varName, corruptedIds }]) => {
    const filePath = `./src/data/dictionary/words/cambridge/${fileName}`;
    const originalSize = map.size;
    
    console.log(`📁 Processing ${fileName}:`);
    console.log(`  Original size: ${originalSize}`);
    
    let fileDeleted = 0;
    
    // Delete corrupted entries from Map
    corruptedIds.forEach(id => {
      if (map.has(id)) {
        // Verify duplicate exists before deleting
        const entry = map.get(id);
        const word = entry.word;
        const correctId = word[0] === word[0].toUpperCase() && word.length > 1 
          ? word + '-fr' 
          : word.toLowerCase() + '-fr';
        
        if (allCambridge.has(correctId)) {
          map.delete(id);
          fileDeleted++;
          totalDeleted++;
        } else {
          console.log(`  ⚠️  ${id} - no duplicate found, skipping`);
        }
      }
    });
    
    console.log(`  Deleted: ${fileDeleted}`);
    console.log(`  New size: ${map.size}`);
    
    // Create backup
    const backupPath = filePath + '.pre-removal-backup';
    fs.copyFileSync(filePath, backupPath);
    
    // Serialize and write cleaned file
    const cleanedContent = serializeMap(map, varName, fileName);
    fs.writeFileSync(filePath, cleanedContent);
    
    console.log(`  ✅ Written to ${fileName} (backup: ${path.basename(backupPath)})\n`);
  });
  
  console.log(`🎯 Summary: ${totalDeleted} corrupted entries removed`);
}

removeCorruptedEntries();
