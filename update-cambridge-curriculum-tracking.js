#!/usr/bin/env node

/**
 * Cambridge Curriculum Tracking Updater
 * 
 * This script:
 * 1. Extracts individual words from unit vocabulary (handling contractions)
 * 2. Creates Cambridge dictionary entries for words that don't exist
 * 3. Updates Cambridge entries with unit/module/lesson tracking
 * 4. Reports unmatched words for later processing
 * 
 * Now uses the Cambridge dictionary structure exclusively.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import all unit vocabulary
import { allUnitsVocabulary } from './src/vocabulary/all_units_vocabulary.js';

// Import Cambridge dictionaries
import { adjectivesCambridge } from './src/data/dictionary/words/cambridge/adjectives.js';
import { adverbsCambridge } from './src/data/dictionary/words/cambridge/adverbs.js';
import { articlesCambridge } from './src/data/dictionary/words/cambridge/articles.js';
import { conjunctionsCambridge } from './src/data/dictionary/words/cambridge/conjunctions.js';
import { expressionsCambridge } from './src/data/dictionary/words/cambridge/expressions.js';
import { interjectionsCambridge } from './src/data/dictionary/words/cambridge/interjections.js';
import { interrogativesCambridge } from './src/data/dictionary/words/cambridge/interrogatives.js';
import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';
import { prepositionsCambridge } from './src/data/dictionary/words/cambridge/prepositions.js';
import { pronounsCambridge } from './src/data/dictionary/words/cambridge/pronouns.js';
import { verbsCambridge } from './src/data/dictionary/words/cambridge/verbs.js';
import { alphabetCambridge } from './src/data/dictionary/words/cambridge/alphabet.js';

// Import dictionary generator
import { DefinitionGenerator } from './src/data/dictionary/utils/generate-definitions.js';

// Combine all Cambridge dictionaries
const allDictionaries = {
  adjectives: adjectivesCambridge,
  adverbs: adverbsCambridge,
  articles: articlesCambridge,
  conjunctions: conjunctionsCambridge,
  expressions: expressionsCambridge,
  interjections: interjectionsCambridge,
  interrogatives: interrogativesCambridge,
  nouns: nounsCambridge,
  prepositions: prepositionsCambridge,
  pronouns: pronounsCambridge,
  verbs: verbsCambridge,
  alphabet: alphabetCambridge,
};

// French contraction patterns
const CONTRACTION_PATTERNS = [
  // Common contractions
  { pattern: /^j'(.+)$/, parts: ['j\'', '$1'] },
  { pattern: /^c'(.+)$/, parts: ['c\'', '$1'] },
  { pattern: /^qu'(.+)$/, parts: ['qu\'', '$1'] },
  { pattern: /^n'(.+)$/, parts: ['n\'', '$1'] },
  { pattern: /^s'(.+)$/, parts: ['s\'', '$1'] },
  { pattern: /^d'(.+)$/, parts: ['d\'', '$1'] },
  { pattern: /^l'(.+)$/, parts: ['l\'', '$1'] },
  { pattern: /^m'(.+)$/, parts: ['m\'', '$1'] },
  { pattern: /^t'(.+)$/, parts: ['t\'', '$1'] },
  
  // Complex contractions
  { pattern: /^qu'est-ce que (.+)$/, parts: ['qu\'', 'est', 'ce', 'que', '$1'] },
  { pattern: /^qu'est-ce qui (.+)$/, parts: ['qu\'', 'est', 'ce', 'qui', '$1'] },
  { pattern: /^est-ce que (.+)$/, parts: ['est', 'ce', 'que', '$1'] },
  { pattern: /^est-ce qui (.+)$/, parts: ['est', 'ce', 'qui', '$1'] },
  { pattern: /^n'est-ce pas$/, parts: ['n\'', 'est', 'ce', 'pas'] },
  { pattern: /^n'est-ce pas (.+)$/, parts: ['n\'', 'est', 'ce', 'pas', '$1'] },
  
  // Negation patterns
  { pattern: /^ne (.+) pas$/, parts: ['ne', '$1', 'pas'] },
  { pattern: /^ne (.+) jamais$/, parts: ['ne', '$1', 'jamais'] },
  { pattern: /^ne (.+) plus$/, parts: ['ne', '$1', 'plus'] },
  { pattern: /^ne (.+) rien$/, parts: ['ne', '$1', 'rien'] },
  { pattern: /^ne (.+) guère$/, parts: ['ne', '$1', 'guère'] },
  
  // Compound contractions
  { pattern: /^du (.+)$/, parts: ['de', 'le', '$1'] },
  { pattern: /^au (.+)$/, parts: ['à', 'le', '$1'] },
  { pattern: /^aux (.+)$/, parts: ['à', 'les', '$1'] },
  { pattern: /^des (.+)$/, parts: ['de', 'les', '$1'] },
];

/**
 * Split a French phrase into individual words, handling contractions
 */
function splitFrenchWords(phrase) {
  if (!phrase || typeof phrase !== 'string') {
    return [];
  }
  
  // First split by spaces
  let words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
  let result = [];
  
  for (let word of words) {
    // Try each contraction pattern
    let matched = false;
    for (let { pattern, parts } of CONTRACTION_PATTERNS) {
      const match = word.match(pattern);
      if (match) {
        // Replace $1, $2, etc. with captured groups
        const expandedParts = parts.map(part => {
          if (part.startsWith('$')) {
            const groupIndex = parseInt(part.substring(1)) - 1;
            return match[groupIndex + 1] || '';
          }
          return part;
        }).filter(part => part.length > 0);
        
        result.push(...expandedParts);
        matched = true;
        break;
      }
    }
    
    // If no contraction pattern matched, add the word as-is
    if (!matched) {
      result.push(word);
    }
  }
  
  return result;
}

/**
 * Find a word in Cambridge dictionaries
 */
function findWordInCambridge(word) {
  const results = [];
  const lowerWord = word.toLowerCase();
  
  for (const [dictName, dictionary] of Object.entries(allDictionaries)) {
    // Search through all entries looking for word field match
    for (const [key, entry] of dictionary.entries()) {
      if (!entry) continue;
      
      const entryWord = entry.word || entry.french;
      if (!entryWord) continue;
      
      // Direct case-sensitive match
      if (entryWord === word) {
        results.push({
          dictionary: dictName,
          entry: entry,
          matchType: 'direct',
          key: key
        });
      }
      // Case-insensitive match
      else if (entryWord.toLowerCase() === lowerWord) {
        results.push({
          dictionary: dictName,
          entry: entry,
          matchType: 'case_insensitive',
          key: key,
          originalWord: entryWord
        });
      }
    }
  }
  
  return results;
}

/**
 * Update Cambridge entry with curriculum tracking
 */
function updateCambridgeEntry(entry, unitInfo) {
  const updated = { ...entry };
  
  // Add curriculum tracking
  updated.unit = unitInfo.unit;
  updated.module = unitInfo.module;
  updated.lesson = unitInfo.lesson;
  
  // Add to tags if not already present
  if (!updated.tags) {
    updated.tags = [];
  }
  
  const newTags = [unitInfo.unit, unitInfo.module];
  if (unitInfo.lesson) {
    newTags.push(unitInfo.lesson);
  }
  
  for (const tag of newTags) {
    if (!updated.tags.includes(tag)) {
      updated.tags.push(tag);
    }
  }
  
  // Update timestamp
  updated.updated_at = new Date().toISOString();
  
  return updated;
}

/**
 * Save updated Cambridge dictionary
 */
function saveCambridgeDictionary(dictionary, filePath) {
  const content = `/**
 * Cambridge Dictionary Scraped ${path.basename(filePath, '.js').charAt(0).toUpperCase() + path.basename(filePath, '.js').slice(1)}
 * Generated: ${new Date().toISOString()}
 * Updated with curriculum tracking information
 */

export const ${path.basename(filePath, '.js')}Cambridge = new Map([
${Array.from(dictionary.entries()).map(([key, value]) => `  ["${key}", ${JSON.stringify(value, null, 4)}]`).join(',\n')}
]);
`;
  
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Main processing function
 */
async function processUnitVocabulary() {
  console.log('🚀 Starting Cambridge curriculum tracking update...\n');
  
  const allWords = new Map(); // word -> { unitInfo, occurrences }
  const notFound = [];
  const matches = [];
  const updates = new Map(); // dictionary -> Map of updates
  
  // Initialize updates map
  for (const dictName of Object.keys(allDictionaries)) {
    updates.set(dictName, new Map());
  }
  
  // Extract words from all units
  console.log('📚 Extracting words from unit vocabulary...');
  
  for (const [unitKey, unitData] of Object.entries(allUnitsVocabulary.units)) {
    if (!unitData.allVocabulary) continue;
    
    const unitNumber = unitData.metadata.unitNumber;
    const unitTitle = unitData.metadata.title;
    
    console.log(`  Processing ${unitTitle} (${unitData.allVocabulary.length} vocabulary items)`);
    
    for (const vocabItem of unitData.allVocabulary) {
      const french = vocabItem.french;
      const moduleKey = vocabItem.moduleKey;
      const moduleTitle = vocabItem.moduleTitle;
      
      // Split into individual words
      const words = splitFrenchWords(french);
      
      for (const word of words) {
        if (word.length === 0) continue;
        
        const unitInfo = {
          unit: `unit${unitNumber}`,
          module: moduleKey,
          lesson: null, // Could be added later if needed
          originalPhrase: french,
          moduleTitle: moduleTitle
        };
        
        if (allWords.has(word)) {
          allWords.get(word).occurrences.push(unitInfo);
        } else {
          allWords.set(word, {
            occurrences: [unitInfo]
          });
        }
      }
    }
  }
  
  console.log(`\n📝 Extracted ${allWords.size} unique words\n`);
  
  // Match words to Cambridge dictionaries
  console.log('🔍 Matching words to dictionaries...');
  
  let processed = 0;
  for (const [word, wordData] of allWords.entries()) {
    processed++;
    if (processed % 100 === 0) {
      console.log(`  Processed ${processed}/${allWords.size} words...`);
    }
    
    const cambridgeMatches = findWordInCambridge(word);
    
    if (cambridgeMatches.length === 0) {
      notFound.push({
        word: word,
        occurrences: wordData.occurrences
      });
    } else {
      matches.push({
        word: word,
        matches: cambridgeMatches,
        occurrences: wordData.occurrences
      });
      
      // Update Cambridge entries
      for (const match of cambridgeMatches) {
        const { dictionary, entry } = match;
        
        // Use the first occurrence for now (could be enhanced to merge multiple units)
        const unitInfo = wordData.occurrences[0];
        
        const updatedEntry = updateCambridgeEntry(entry, unitInfo);
        updates.get(dictionary).set(entry.id, updatedEntry);
      }
    }
  }
  
  console.log(`\n✅ Found ${matches.length} matches`);
  console.log(`❌ ${notFound.length} words not found in Cambridge dictionaries\n`);
  
  // Save updated Cambridge dictionaries
  console.log('💾 Saving updated Cambridge dictionaries...');
  
  const dictionaryPaths = {
    adjectives: './src/data/dictionary/words/cambridge/adjectives.js',
    adverbs: './src/data/dictionary/words/cambridge/adverbs.js',
    articles: './src/data/dictionary/words/cambridge/articles.js',
    conjunctions: './src/data/dictionary/words/cambridge/conjunctions.js',
    expressions: './src/data/dictionary/words/cambridge/expressions.js',
    interjections: './src/data/dictionary/words/cambridge/interjections.js',
    interrogatives: './src/data/dictionary/words/cambridge/interrogatives.js',
    nouns: './src/data/dictionary/words/cambridge/nouns.js',
    prepositions: './src/data/dictionary/words/cambridge/prepositions.js',
    pronouns: './src/data/dictionary/words/cambridge/pronouns.js',
    verbs: './src/data/dictionary/words/cambridge/verbs.js',
    alphabet: './src/data/dictionary/words/cambridge/alphabet.js',
  };
  
  for (const [dictName, dictPath] of Object.entries(dictionaryPaths)) {
    const originalDict = allDictionaries[dictName];
    const updatesForDict = updates.get(dictName);
    
    if (updatesForDict.size > 0) {
      console.log(`  Updating ${dictName} (${updatesForDict.size} entries)`);
      
      // Merge updates with original dictionary
      const updatedDict = new Map(originalDict);
      for (const [id, updatedEntry] of updatesForDict.entries()) {
        updatedDict.set(id, updatedEntry);
      }
      
      saveCambridgeDictionary(updatedDict, dictPath);
    }
  }
  
  // Generate reports
  console.log('\n📊 Generating reports...');
  
  // Save not found words
  const notFoundPath = './cambridge-not-found-words.json';
  fs.writeFileSync(notFoundPath, JSON.stringify(notFound, null, 2), 'utf8');
  console.log(`  Not found words saved to: ${notFoundPath}`);
  
  // Save matches report
  const matchesPath = './cambridge-matches-report.json';
  fs.writeFileSync(matchesPath, JSON.stringify(matches, null, 2), 'utf8');
  console.log(`  Matches report saved to: ${matchesPath}`);
  
  // Summary
  console.log('\n🎉 Cambridge curriculum tracking update complete!');
  console.log(`\n📈 Summary:`);
  console.log(`  • Total unique words processed: ${allWords.size}`);
  console.log(`  • Words matched in Cambridge: ${matches.length}`);
  console.log(`  • Words not found: ${notFound.length}`);
  console.log(`  • Cambridge dictionaries updated: ${Object.values(dictionaryPaths).filter((_, i) => updates.get(Object.keys(dictionaryPaths)[i]).size > 0).length}`);
  
  if (notFound.length > 0) {
    console.log(`\n⚠️  ${notFound.length} words were not found in Cambridge dictionaries:`);
    notFound.slice(0, 10).forEach(item => {
      console.log(`    • "${item.word}" (appears in ${item.occurrences.length} unit(s))`);
    });
    if (notFound.length > 10) {
      console.log(`    ... and ${notFound.length - 10} more (see ${notFoundPath})`);
    }
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  processUnitVocabulary().catch(console.error);
}

export { processUnitVocabulary, splitFrenchWords, findWordInCambridge };
