#!/usr/bin/env node

/**
 * Safe Delete Corrupted Entries
 * Object manipulation with validation before each deletion
 */

import fs from 'fs';
import path from 'path';

// Import all Cambridge dictionaries
import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';
import { adjectivesCambridge } from './src/data/dictionary/words/cambridge/adjectives.js';
import { adverbsCambridge } from './src/data/dictionary/words/cambridge/adverbs.js';
import { pronounsCambridge } from './src/data/dictionary/words/cambridge/pronouns.js';
import { articlesCambridge } from './src/data/dictionary/words/cambridge/articles.js';
import { prepositionsCambridge } from './src/data/dictionary/words/cambridge/prepositions.js';
import { conjunctionsCambridge } from './src/data/dictionary/words/cambridge/conjunctions.js';
import { interjectionsCambridge } from './src/data/dictionary/words/cambridge/interjections.js';
import { interrogativesCambridge } from './src/data/dictionary/words/cambridge/interrogatives.js';
import { alphabetCambridge } from './src/data/dictionary/words/cambridge/alphabet.js';
import { expressionsCambridge } from './src/data/dictionary/words/cambridge/expressions.js';

// File mapping
const fileMapping = {
  'nouns.js': { map: nounsCambridge, entries: ['f-vrier-fr', 'ao-t-fr', 'd-cembre-fr', 'p-ques-fr', 'no-l-fr', 'halloween-fr', 'f-minin-fr', 'z-ro-fr', 'paris-fr', 'bordeaux-fr', 'r-ve-fr', 'cath-drale-fr', 'march--fr', 'r-alit--fr', 'soir-e-fr', 'syst-me-fr', 'mati-res-fr', 'litt-rature-fr', 'plan-te-fr', '-conomie-fr', 'm-tro-fr', 'r-gion-fr', 'beaut--fr', 'g-n-ration-fr', 'd-chets-fr', '-nergie-fr', 'si-cle-fr', 'r-le-fr', 'sc-ne-fr', 'm-diterran-e-fr', '-tait-fr', 'pens-es-fr', 'r-vision-fr', 'r-ponses-fr', 'id-e-fr', 'm-thode-fr', 'journ-e-fr', 'pierre-fr', 'marie-fr', 'caf--fr', 'pens-e-fr', 'r-ponse-fr', '-t--fr', 'universit--fr'] },
  'verbs.js': { map: verbsCambridge, entries: ['conna-tre-fr', '-tudier-fr', 'r-viser-fr', '-voluer-fr', 'd-pend-fr', '-conomiser-fr', 'pars--fr', 'va--fr', 'faites--fr', 'prot-ger-fr'] },
  'adjectives.js': { map: adjectivesCambridge, entries: ['-ducatif-fr', 'fonc--fr', 'p-le-fr', 'dor--fr', 'argent--fr', 'm-me-fr', 'g-nial-fr', 'fran-ais-fr', 'd-licieux-fr', 'fatigu--fr'] },
  'adverbs.js': { map: adverbsCambridge, entries: ['s-rieusement-fr', 'compl-tement-fr', 'r-guli-rement-fr'] },
  'pronouns.js': { map: pronounsCambridge, entries: ['-a-fr'] },
  'prepositions.js': { map: prepositionsCambridge, entries: ['derri-re-fr', 'apr-s-fr'] },
  'interrogatives.js': { map: interrogativesCambridge, entries: ['o--fr'] }
};

function generateCorrectId(word) {
  // Handle proper nouns (capitalized)
  if (word[0] === word[0].toUpperCase() && word.length > 1) {
    return word + '-fr';
  }
  return word.toLowerCase() + '-fr';
}

function validateAndDelete() {
  console.log('🔍 SAFE DELETION WITH OBJECT MANIPULATION\n');

  // Combine all maps for duplicate checking
  const allCambridge = new Map([
    ...nounsCambridge, ...verbsCambridge, ...adjectivesCambridge, ...adverbsCambridge,
    ...pronounsCambridge, ...articlesCambridge, ...prepositionsCambridge, ...conjunctionsCambridge,
    ...interjectionsCambridge, ...interrogativesCambridge, ...alphabetCambridge, ...expressionsCambridge,
  ]);

  let totalDeleted = 0;
  let totalSkipped = 0;
  const deletionLog = [];

  // Process each file
  Object.entries(fileMapping).forEach(([fileName, { map, entries }]) => {
    console.log(`📁 Processing ${fileName}:`);
    console.log(`  Original size: ${map.size}`);

    let fileDeleted = 0;
    let fileSkipped = 0;

    entries.forEach(corruptedId => {
      // 1. Check if corrupted entry exists in this map
      if (!map.has(corruptedId)) {
        console.log(`  ⚠️  ${corruptedId} not found in ${fileName} - skipping`);
        fileSkipped++;
        return;
      }

      // 2. Get the corrupted entry and examine it
      const corruptedEntry = map.get(corruptedId);
      const word = corruptedEntry.word;
      const correctId = generateCorrectId(word);

      console.log(`  🔍 Examining: ${corruptedId} ("${word}")`);
      console.log(`    Expected correct ID: ${correctId}`);

      // 3. Check if correct duplicate exists in Cambridge
      const hasCorrectDuplicate = allCambridge.has(correctId);
      
      if (hasCorrectDuplicate) {
        const correctEntry = allCambridge.get(correctId);
        const sameWord = corruptedEntry.word === correctEntry.word;
        
        console.log(`    ✅ Correct duplicate found: ${correctId} ("${correctEntry.word}")`);
        console.log(`    ✅ Same word: ${sameWord}`);
        
        if (sameWord) {
          // 4. SAFE TO DELETE - remove from map
          map.delete(corruptedId);
          console.log(`    🗑️  DELETED: ${corruptedId}`);
          fileDeleted++;
          totalDeleted++;
          
          deletionLog.push({
            file: fileName,
            deleted: corruptedId,
            word: word,
            correctDuplicate: correctId,
            status: 'deleted'
          });
        } else {
          console.log(`    ❌ WORDS DON'T MATCH - NOT SAFE TO DELETE`);
          fileSkipped++;
          totalSkipped++;
        }
      } else {
        console.log(`    ❌ NO CORRECT DUPLICATE FOUND - NOT SAFE TO DELETE`);
        fileSkipped++;
        totalSkipped++;
        
        deletionLog.push({
          file: fileName,
          skipped: corruptedId,
          word: word,
          reason: 'no_duplicate_found',
          status: 'skipped'
        });
      }
      console.log('');
    });

    console.log(`  📊 ${fileName} results: ${fileDeleted} deleted, ${fileSkipped} skipped`);
    console.log(`  📊 New size: ${map.size}`);
    console.log('');
  });

  console.log('🎯 DELETION SUMMARY:');
  console.log(`Total deleted: ${totalDeleted}/71`);
  console.log(`Total skipped: ${totalSkipped}/71`);

  // Show final sizes
  console.log('\\n📊 FINAL MAP SIZES:');
  Object.entries(fileMapping).forEach(([fileName, { map }]) => {
    console.log(`  ${fileName}: ${map.size} entries`);
  });

  const finalTotal = Object.values(fileMapping).reduce((sum, { map }) => sum + map.size, 0);
  console.log(`  TOTAL: ${finalTotal} entries`);

  // Save deletion log
  fs.writeFileSync('deletion-log.json', JSON.stringify(deletionLog, null, 2));
  console.log('\\n💾 Deletion log saved to deletion-log.json');

  return {
    totalDeleted,
    totalSkipped,
    finalTotal,
    deletionLog
  };
}

// Function to write cleaned maps back to files
function writeCleanedFiles() {
  console.log('\\n📝 Writing cleaned files...');

  Object.entries(fileMapping).forEach(([fileName, { map }]) => {
    const filePath = `./src/data/dictionary/words/cambridge/${fileName}`;
    
    // Create backup
    const backupPath = filePath + '.pre-cleanup-backup';
    fs.copyFileSync(filePath, backupPath);
    
    // Generate new file content
    const exportName = fileName.replace('.js', 'Cambridge');
    const entries = Array.from(map.entries()).map(([id, entry]) => {
      return `  [\\n    "${id}",\\n        ${JSON.stringify(entry, null, 8)}\\n  ]`;
    }).join(',\\n');
    
    const newContent = `/**\\n * Cambridge Dictionary Scraped ${fileName.replace('.js', '').charAt(0).toUpperCase() + fileName.replace('.js', '').slice(1)}\\n * Cleaned: ${new Date().toISOString()}\\n * Corrupted duplicates removed: ${fileMapping[fileName].entries.length}\\n */\\n\\nexport const ${exportName} = new Map([\\n${entries}\\n]);\\n`;
    
    fs.writeFileSync(filePath, newContent);
    console.log(`  ✅ ${fileName}: ${map.size} entries (backup: ${path.basename(backupPath)})`);
  });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const results = validateAndDelete();
  
  if (results.totalDeleted > 0) {
    console.log('\\n🤔 Write cleaned files? (You can review the maps first)');
    console.log('   To write files: uncomment the writeCleanedFiles() call');
    // writeCleanedFiles();
  }
}
