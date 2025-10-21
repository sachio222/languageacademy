#!/usr/bin/env node

/**
 * Improved Vocabulary Extraction Script
 * Handles both vocabularyReference arrays and object exports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Import existing vocabulary files directly
async function importVocabularyFiles() {
  const words = new Map();
  const phrases = new Map();
  
  try {
    // Import vocabulary files
    const vocabPath = path.join(projectRoot, 'src/lessons/vocabulary');
    
    // Import nouns
    const nounsModule = await import(`${vocabPath}/nouns.js`);
    processVocabularyObject(nounsModule.commonNouns, 'noun', words, 'vocabulary/nouns.js');
    processVocabularyObject(nounsModule.foodNouns, 'noun', words, 'vocabulary/nouns.js');
    processVocabularyObject(nounsModule.bodyPartsNouns, 'noun', words, 'vocabulary/nouns.js');
    processVocabularyObject(nounsModule.clothingNouns, 'noun', words, 'vocabulary/nouns.js');
    processVocabularyObject(nounsModule.placeNouns, 'noun', words, 'vocabulary/nouns.js');
    processVocabularyObject(nounsModule.timeNouns, 'noun', words, 'vocabulary/nouns.js');
    
    // Import pronouns
    const pronounsModule = await import(`${vocabPath}/pronouns.js`);
    processVocabularyObject(pronounsModule.pronouns, 'pronoun', words, 'vocabulary/pronouns.js');
    processVocabularyObject(pronounsModule.objectPronouns, 'pronoun', words, 'vocabulary/pronouns.js');
    processVocabularyObject(pronounsModule.stressedPronouns, 'pronoun', words, 'vocabulary/pronouns.js');
    
    // Import adjectives
    const adjectivesModule = await import(`${vocabPath}/adjectives.js`);
    processVocabularyObject(adjectivesModule.commonAdjectives, 'adjective', words, 'vocabulary/adjectives.js');
    
    // Import other parts of speech
    const demonstrativesModule = await import(`${vocabPath}/demonstratives.js`);
    processVocabularyObject(demonstrativesModule.demonstratives, 'pronoun', words, 'vocabulary/demonstratives.js');
    
    const possessivesModule = await import(`${vocabPath}/possessives.js`);
    processVocabularyObject(possessivesModule.possessiveAdjectives, 'adjective', words, 'vocabulary/possessives.js');
    
    const connectorsModule = await import(`${vocabPath}/connectors.js`);
    processVocabularyObject(connectorsModule.basicConnectors, 'conjunction', words, 'vocabulary/connectors.js');
    processVocabularyObject(connectorsModule.prepositions, 'preposition', words, 'vocabulary/connectors.js');
    
    const questionsModule = await import(`${vocabPath}/questions.js`);
    processVocabularyObject(questionsModule.questionWords, 'pronoun', words, 'vocabulary/questions.js');
    
    const phrasesModule = await import(`${vocabPath}/phrases.js`);
    processVocabularyObject(phrasesModule.commonPhrases, 'expression', phrases, 'vocabulary/phrases.js');
    processVocabularyObject(phrasesModule.survivalPhrases, 'expression', phrases, 'vocabulary/phrases.js');
    
    console.log(`✅ Imported ${words.size} words and ${phrases.size} phrases from vocabulary files`);
    
  } catch (error) {
    console.error('Error importing vocabulary files:', error.message);
  }
  
  return { words, phrases };
}

/**
 * Process vocabulary object (like commonNouns, pronouns, etc.)
 */
function processVocabularyObject(vocabObj, defaultPartOfSpeech, targetMap, source) {
  if (!vocabObj) return;
  
  for (const [key, vocab] of Object.entries(vocabObj)) {
    if (!vocab.french) continue;
    
    const id = generateWordId(vocab.french);
    const partOfSpeech = categorizeWord(vocab) || defaultPartOfSpeech;
    
    const entry = {
      id,
      language: 'fr',
      word: vocab.french,
      partOfSpeech,
      
      translations: [{
        language: 'en',
        text: vocab.english || vocab.englishFull || '',
        definition: vocab.note || '',
        context: 'general',
        confidence: 0.95
      }],
      
      gender: vocab.gender || 'none',
      variants: [],
      relationships: [],
      
      frequency: {
        rank: 1000,
        score: 0.5,
        corpus: 'lesson',
        perMillion: 100,
        percentile: 50
      },
      difficulty: 2,
      cefr_level: 'A1',
      
      examples: vocab.example ? [{
        text: vocab.example,
        translation: '',
        context: 'general'
      }] : [],
      
      tags: ['lesson'],
      semantic_field: 'general',
      
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source,
      verified: true
    };
    
    // Handle variants
    if (vocab.femForm) {
      entry.variants.push({
        type: 'feminine',
        text: vocab.femForm,
        note: 'feminine form'
      });
    }
    
    // Handle conjugation groups for verbs
    if (partOfSpeech === 'verb') {
      if (vocab.french.endsWith('er')) entry.conjugationGroup = 'er';
      else if (vocab.french.endsWith('ir')) entry.conjugationGroup = 'ir';
      else if (vocab.french.endsWith('re')) entry.conjugationGroup = 're';
      else entry.conjugationGroup = 'irregular';
    }
    
    targetMap.set(id, entry);
  }
}

/**
 * Generate unique ID for a word
 */
function generateWordId(word, language = 'fr') {
  return `${word.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${language}`;
}

/**
 * Categorize word by part of speech
 */
function categorizeWord(vocab) {
  const french = vocab.french?.toLowerCase().trim() || '';
  const note = vocab.note?.toLowerCase() || '';
  
  // Check note field first
  if (note.includes('verb') || note.includes('conjugat')) return 'verb';
  if (note.includes('adjective')) return 'adjective';
  if (note.includes('adverb')) return 'adverb';
  if (note.includes('preposition')) return 'preposition';
  if (note.includes('pronoun')) return 'pronoun';
  if (note.includes('article')) return 'article';
  if (note.includes('conjunction')) return 'conjunction';
  
  // Check specific word lists
  const articles = ['un', 'une', 'le', 'la', 'les', "l'", 'du', 'de la', 'des', 'au', 'aux'];
  if (articles.includes(french)) return 'article';
  
  const pronouns = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'me', 'te', 'se', 'lui', 'leur', 'y', 'en', 'on'];
  if (pronouns.includes(french)) return 'pronoun';
  
  const prepositions = ['à', 'de', 'dans', 'sur', 'sous', 'avec', 'sans', 'pour', 'par', 'vers', 'chez', 'entre', 'pendant'];
  if (prepositions.includes(french)) return 'preposition';
  
  const conjunctions = ['et', 'ou', 'mais', 'donc', 'car', 'ni', 'or', 'que', 'si', 'comme', 'quand', 'lorsque'];
  if (conjunctions.includes(french)) return 'conjunction';
  
  return null; // Let the caller decide the default
}

/**
 * Generate dictionary files
 */
function generateDictionaryFiles(words, phrases) {
  const dictionaryDir = path.join(projectRoot, 'src/data/dictionary/words');
  
  // Ensure directory exists
  if (!fs.existsSync(dictionaryDir)) {
    fs.mkdirSync(dictionaryDir, { recursive: true });
  }
  
  // Group words by part of speech
  const wordsByPOS = {};
  for (const [id, word] of words) {
    const pos = word.partOfSpeech;
    if (!wordsByPOS[pos]) wordsByPOS[pos] = [];
    wordsByPOS[pos].push([id, word]);
  }
  
  // Generate files for each part of speech
  for (const [pos, wordsArray] of Object.entries(wordsByPOS)) {
    const filename = `${pos}s.js`;
    const filePath = path.join(dictionaryDir, filename);
    
    const content = generatePartOfSpeechFile(pos, wordsArray);
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`Generated ${filename} with ${wordsArray.length} entries`);
  }
  
  // Generate phrases file
  if (phrases.size > 0) {
    const phrasesPath = path.join(projectRoot, 'src/data/dictionary/phrases.js');
    const phrasesContent = generatePhrasesFile(Array.from(phrases.entries()));
    fs.writeFileSync(phrasesPath, phrasesContent, 'utf8');
    console.log(`Generated phrases.js with ${phrases.size} entries`);
  }
}

/**
 * Generate content for a part-of-speech file
 */
function generatePartOfSpeechFile(partOfSpeech, words) {
  const mapEntries = words.map(([id, word]) => 
    `  ["${id}", ${JSON.stringify(word, null, 4).replace(/\n/g, '\n  ')}]`
  ).join(',\n');
  
  const frequencyArray = words
    .sort((a, b) => a[1].frequency.rank - b[1].frequency.rank)
    .map(([id]) => `"${id}"`)
    .join(', ');
  
  let specialIndices = '';
  
  // Add gender index for nouns and adjectives
  if (partOfSpeech === 'noun' || partOfSpeech === 'adjective') {
    const masculine = words.filter(([, word]) => word.gender === 'masculine').map(([id]) => `"${id}"`);
    const feminine = words.filter(([, word]) => word.gender === 'feminine').map(([id]) => `"${id}"`);
    
    specialIndices = `
// Gender-based indices
export const ${partOfSpeech}sByGender = {
  masculine: new Set([${masculine.join(', ')}]),
  feminine: new Set([${feminine.join(', ')}])
};`;
  }
  
  // Add conjugation index for verbs
  if (partOfSpeech === 'verb') {
    const byConjugation = {};
    words.forEach(([id, word]) => {
      const group = word.conjugationGroup || 'irregular';
      if (!byConjugation[group]) byConjugation[group] = [];
      byConjugation[group].push(`"${id}"`);
    });
    
    const conjugationEntries = Object.entries(byConjugation)
      .map(([group, ids]) => `  ${group}: new Set([${ids.join(', ')}])`)
      .join(',\n');
    
    specialIndices = `
// Conjugation-based indices
export const ${partOfSpeech}sByConjugation = {
${conjugationEntries}
};`;
  }
  
  return `/**
 * ${partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}s Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${words.length}
 */

export const ${partOfSpeech}s = new Map([
${mapEntries}
]);

// Frequency-ordered array for priority loading
export const ${partOfSpeech}sByFrequency = [${frequencyArray}];
${specialIndices}

export default ${partOfSpeech}s;
`;
}

/**
 * Generate phrases file
 */
function generatePhrasesFile(phrases) {
  const mapEntries = phrases.map(([id, phrase]) => 
    `  ["${id}", ${JSON.stringify(phrase, null, 4).replace(/\n/g, '\n  ')}]`
  ).join(',\n');
  
  return `/**
 * Phrases Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${phrases.length}
 */

export const phrases = new Map([
${mapEntries}
]);

// Phrases by type
export const phrasesByType = new Map();

// Phrase components (for decomposition)
export const phraseComponents = new Map();

// Word-to-phrases index (reverse lookup)
export const wordToPhrases = new Map();

export default phrases;
`;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting improved vocabulary extraction...');
  
  const { words, phrases } = await importVocabularyFiles();
  
  console.log(`📊 Extracted ${words.size} words and ${phrases.size} phrases`);
  
  // Generate dictionary files
  generateDictionaryFiles(words, phrases);
  
  // Print statistics
  const wordsByPOS = {};
  for (const [, word] of words) {
    wordsByPOS[word.partOfSpeech] = (wordsByPOS[word.partOfSpeech] || 0) + 1;
  }
  
  console.log('\n📊 By Part of Speech:');
  for (const [pos, count] of Object.entries(wordsByPOS)) {
    console.log(`  ${pos}: ${count}`);
  }
  
  console.log('\n✅ Improved dictionary generation complete!');
}

// Run the extraction
main().catch(console.error);

