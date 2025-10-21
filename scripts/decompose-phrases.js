#!/usr/bin/env node

/**
 * Phrase Decomposition Script
 * Analyzes phrases and creates word-to-phrase mappings with component references
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Load the generated dictionary
const dictionaryPath = path.join(projectRoot, 'src/data/dictionary');

/**
 * Load phrases from the generated phrases.js file
 */
function loadPhrases() {
  const phrasesPath = path.join(dictionaryPath, 'phrases.js');
  if (!fs.existsSync(phrasesPath)) {
    console.log('No phrases.js file found');
    return new Map();
  }
  
  const content = fs.readFileSync(phrasesPath, 'utf8');
  
  // Extract the phrases Map from the file
  const mapMatch = content.match(/export const phrases = new Map\(\[([\s\S]*?)\]\);/);
  if (!mapMatch) {
    console.log('Could not parse phrases from file');
    return new Map();
  }
  
  // Parse the phrases (simplified parsing)
  const phrases = new Map();
  const entries = mapMatch[1].split(/\],\s*\["/);
  
  for (const entry of entries) {
    try {
      const [id, ...jsonParts] = entry.split('", ');
      const jsonStr = jsonParts.join('", ').replace(/\]$/, '');
      const phrase = JSON.parse(jsonStr);
      phrases.set(id.replace(/^"/, ''), phrase);
    } catch (error) {
      // Skip malformed entries
    }
  }
  
  return phrases;
}

/**
 * Load words from dictionary files
 */
function loadWords() {
  const wordsDir = path.join(dictionaryPath, 'words');
  const words = new Map();
  
  const files = fs.readdirSync(wordsDir).filter(f => f.endsWith('.js'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(wordsDir, file), 'utf8');
    
    // Extract the Map from each file
    const mapMatch = content.match(/export const \w+ = new Map\(\[([\s\S]*?)\]\);/);
    if (mapMatch) {
      const entries = mapMatch[1].split(/\],\s*\["/);
      
      for (const entry of entries) {
        try {
          const [id, ...jsonParts] = entry.split('", ');
          const jsonStr = jsonParts.join('", ').replace(/\]$/, '');
          const word = JSON.parse(jsonStr);
          words.set(id.replace(/^"/, ''), word);
        } catch (error) {
          // Skip malformed entries
        }
      }
    }
  }
  
  return words;
}

/**
 * Decompose a phrase into component words
 */
function decomposePhrase(phrase, words) {
  const text = phrase.word || phrase.phrase;
  if (!text) return [];
  
  // Split phrase into potential words
  const tokens = text.toLowerCase()
    .replace(/['']/g, "'") // Normalize apostrophes
    .split(/[\s\-]+/) // Split on spaces and hyphens
    .filter(token => token.length > 0);
  
  const components = [];
  
  tokens.forEach((token, index) => {
    // Try to find exact match first
    let wordId = `${token}-fr`;
    let word = words.get(wordId);
    
    if (!word) {
      // Try variations for contractions
      const variations = generateTokenVariations(token);
      for (const variation of variations) {
        wordId = `${variation}-fr`;
        word = words.get(wordId);
        if (word) break;
      }
    }
    
    if (word) {
      components.push({
        wordId,
        position: index,
        text: token,
        role: determineGrammaticalRole(token, index, tokens, word)
      });
    } else {
      // Create placeholder for unknown words
      components.push({
        wordId: null,
        position: index,
        text: token,
        role: 'unknown'
      });
    }
  });
  
  return components;
}

/**
 * Generate variations of a token to handle contractions
 */
function generateTokenVariations(token) {
  const variations = [token];
  
  // Handle common French contractions
  if (token === "j'") variations.push('je');
  if (token === "l'") variations.push('le', 'la');
  if (token === "d'") variations.push('de');
  if (token === "n'") variations.push('ne');
  if (token === "s'") variations.push('se');
  if (token === "c'") variations.push('ce');
  if (token === "qu'") variations.push('que');
  if (token === "m'") variations.push('me');
  if (token === "t'") variations.push('te');
  
  // Handle elision
  if (token.endsWith("'")) {
    variations.push(token.slice(0, -1));
  }
  
  return variations;
}

/**
 * Determine grammatical role of a word in context
 */
function determineGrammaticalRole(token, position, tokens, word) {
  const partOfSpeech = word.partOfSpeech;
  
  // Basic role assignment based on part of speech and position
  switch (partOfSpeech) {
    case 'article':
      return 'article';
    case 'pronoun':
      return position === 0 ? 'subject' : 'object';
    case 'verb':
      return 'verb';
    case 'noun':
      return 'noun';
    case 'adjective':
      return 'adjective';
    case 'adverb':
      return 'adverb';
    case 'preposition':
      return 'preposition';
    case 'conjunction':
      return 'conjunction';
    default:
      return 'other';
  }
}

/**
 * Analyze phrase variants (formal/informal/slang)
 */
function analyzeVariants(phrase) {
  const text = phrase.word || phrase.phrase;
  const variants = [];
  
  // Common French phrase variants
  const variantPatterns = {
    'je ne sais pas': [
      { type: 'informal', text: "j'sais pas", note: "dropped 'ne', contracted 'je'" },
      { type: 'colloquial', text: 'chais pas', note: "extreme contraction of 'je ne sais'" }
    ],
    'je ne peux pas': [
      { type: 'informal', text: "j'peux pas", note: "dropped 'ne', contracted 'je'" },
      { type: 'colloquial', text: 'chui pas', note: "very informal contraction" }
    ],
    'il y a': [
      { type: 'informal', text: "y'a", note: "contracted form" }
    ],
    'est-ce que': [
      { type: 'informal', text: 'eske', note: "phonetic spelling" }
    ]
  };
  
  if (variantPatterns[text]) {
    variants.push(...variantPatterns[text]);
  }
  
  return variants;
}

/**
 * Main decomposition function
 */
function main() {
  console.log('🔍 Starting phrase decomposition...');
  
  const phrases = loadPhrases();
  const words = loadWords();
  
  console.log(`📝 Loaded ${phrases.size} phrases`);
  console.log(`📚 Loaded ${words.size} words`);
  
  const decomposedPhrases = new Map();
  const stats = {
    totalPhrases: phrases.size,
    decomposed: 0,
    fullyMatched: 0,
    partiallyMatched: 0,
    unmatched: 0
  };
  
  for (const [id, phrase] of phrases) {
    const components = decomposePhrase(phrase, words);
    const variants = analyzeVariants(phrase);
    
    // Update phrase with decomposition
    const updatedPhrase = {
      ...phrase,
      components,
      variants: [...(phrase.variants || []), ...variants]
    };
    
    decomposedPhrases.set(id, updatedPhrase);
    
    // Update statistics
    stats.decomposed++;
    const matchedComponents = components.filter(c => c.wordId !== null);
    if (matchedComponents.length === components.length) {
      stats.fullyMatched++;
    } else if (matchedComponents.length > 0) {
      stats.partiallyMatched++;
    } else {
      stats.unmatched++;
    }
  }
  
  // Generate updated phrases.js file
  generateUpdatedPhrasesFile(decomposedPhrases);
  
  // Print statistics
  console.log('\n📊 Decomposition Statistics:');
  console.log(`Total phrases: ${stats.totalPhrases}`);
  console.log(`Fully matched: ${stats.fullyMatched}`);
  console.log(`Partially matched: ${stats.partiallyMatched}`);
  console.log(`Unmatched: ${stats.unmatched}`);
  console.log(`Success rate: ${((stats.fullyMatched / stats.totalPhrases) * 100).toFixed(1)}%`);
  
  console.log('\n✅ Phrase decomposition complete!');
}

/**
 * Generate updated phrases.js file with decomposition
 */
function generateUpdatedPhrasesFile(phrases) {
  const mapEntries = Array.from(phrases.entries()).map(([id, phrase]) => 
    `  ["${id}", ${JSON.stringify(phrase, null, 4).replace(/\n/g, '\n  ')}]`
  ).join(',\n');
  
  const content = `/**
 * Phrases Dictionary with Decomposition
 * Auto-generated with phrase-to-word mappings
 * Total entries: ${phrases.size}
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

// Initialize indices
for (const [id, phrase] of phrases) {
  // Group by type
  const type = phrase.type || 'general';
  if (!phrasesByType.has(type)) {
    phrasesByType.set(type, []);
  }
  phrasesByType.get(type).push(id);
  
  // Index components
  if (phrase.components) {
    phraseComponents.set(id, phrase.components);
    
    // Build reverse index (word -> phrases containing it)
    phrase.components.forEach(component => {
      if (component.wordId) {
        if (!wordToPhrases.has(component.wordId)) {
          wordToPhrases.set(component.wordId, []);
        }
        wordToPhrases.get(component.wordId).push(id);
      }
    });
  }
}

export default phrases;
`;
  
  const phrasesPath = path.join(projectRoot, 'src/data/dictionary/phrases.js');
  fs.writeFileSync(phrasesPath, content, 'utf8');
  console.log(`Updated phrases.js with decomposition data`);
}

// Run the decomposition
main().catch(console.error);

