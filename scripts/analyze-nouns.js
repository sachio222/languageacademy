#!/usr/bin/env node

/**
 * Analyze Nouns Dictionary for Misclassifications
 * Identifies words that should be moved to other part-of-speech categories
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Load the nouns dictionary
const nounsPath = path.join(projectRoot, "src", "data", "dictionary", "words", "nouns.js");
const nounsContent = fs.readFileSync(nounsPath, "utf8");

// Extract all word entries using simpler regex
const wordMatches = [...nounsContent.matchAll(/"word":\s*"([^"]+)"[\s\S]*?"text":\s*"([^"]+)"[\s\S]*?"definition":\s*"([^"]*)"/g)];

if (!wordMatches || wordMatches.length === 0) {
  console.log("No entries found in nouns file");
  process.exit(1);
}

console.log(`Found ${wordMatches.length} noun entries to analyze\n`);

// Categories for misclassified words
const misclassified = {
  articles: [],
  pronouns: [],
  verbs: [],
  adjectives: [],
  prepositions: [],
  conjunctions: [],
  adverbs: [],
  expressions: []
};

// Classification rules
const classifyWord = (word, english, definition) => {
  const w = word.toLowerCase();
  const eng = english.toLowerCase();
  const def = definition.toLowerCase();
  
  // Articles
  if (['le', 'la', 'les', 'un', 'une', 'des', "l'", 'l'].includes(w)) {
    return 'articles';
  }
  
  // Pronouns
  if (['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on', 'me', 'te', 'se', 'leur', 'lui', 'y', 'en', 'moi', 'toi', 'soi'].includes(w)) {
    return 'pronouns';
  }
  
  // Conjunctions
  if (['et', 'mais', 'ou', 'donc', 'car', 'ni', 'or'].includes(w)) {
    return 'conjunctions';
  }
  
  // Prepositions
  if (['à', 'de', 'dans', 'sur', 'avec', 'pour', 'par', 'sans', 'sous', 'vers', 'chez', 'entre', 'contre', 'depuis'].includes(w)) {
    return 'prepositions';
  }
  
  // Adverbs
  if (['très', 'aussi', 'bien', 'mal', 'plus', 'moins', 'beaucoup', 'peu', 'trop', 'assez', 'toujours', 'jamais', 'souvent', 'parfois', 'ici', 'là', 'maintenant', 'aujourd', 'hier', 'demain'].includes(w)) {
    return 'adverbs';
  }
  
  // Verbs (check English translations)
  if (eng.includes(' am') || eng.includes(' are') || eng.includes(' is') || 
      eng.includes(' have') || eng.includes(' has') || eng.includes(' go') ||
      eng.includes(' can') || eng.includes(' want') || eng.includes(' come') ||
      eng.includes(' see') || eng.includes(' do') || eng.includes(' make') ||
      eng.includes(' take') || eng.includes(' give') || eng.includes(' put') ||
      eng.includes(' say') || eng.includes(' tell') || eng.includes(' know') ||
      eng.includes(' think') || eng.includes(' believe') || eng.includes(' understand') ||
      def.includes('conjugat') || def.includes('infinitive') ||
      eng.startsWith('to ')) {
    return 'verbs';
  }
  
  // Adjectives (check English translations)
  if (eng.includes('good') || eng.includes('bad') || eng.includes('big') || eng.includes('small') ||
      eng.includes('new') || eng.includes('old') || eng.includes('young') || eng.includes('beautiful') ||
      eng.includes('ugly') || eng.includes('happy') || eng.includes('sad') || eng.includes('hot') ||
      eng.includes('cold') || eng.includes('fast') || eng.includes('slow') || eng.includes('easy') ||
      eng.includes('difficult') || eng.includes('important') || eng.includes('interesting') ||
      eng.includes('other') || eng.includes('same') || eng.includes('different') ||
      def.includes('masculine') && def.includes('feminine') && def.includes('agreement')) {
    return 'adjectives';
  }
  
  // Multi-word expressions/phrases
  if (word.includes(' ') && !word.startsWith('un ') && !word.startsWith('une ') && 
      !word.startsWith('le ') && !word.startsWith('la ') && !word.startsWith('les ') && 
      !word.startsWith("l'")) {
    return 'expressions';
  }
  
  return null; // Correctly classified as noun
};

// Analyze each entry
let correctNouns = 0;
let totalMisclassified = 0;

wordMatches.forEach(match => {
  try {
    const word = match[1];
    const english = match[2];
    const definition = match[3];
    
    const correctCategory = classifyWord(word, english, definition);
    
    if (correctCategory) {
      misclassified[correctCategory].push({
        word,
        english,
        definition
      });
      totalMisclassified++;
    } else {
      correctNouns++;
    }
  } catch (error) {
    console.error('Error processing entry:', error.message);
  }
});

// Report results
console.log('📊 ANALYSIS RESULTS\n');
console.log(`✅ Correctly classified nouns: ${correctNouns}`);
console.log(`❌ Misclassified entries: ${totalMisclassified}\n`);

// Show misclassified words by category
Object.entries(misclassified).forEach(([category, words]) => {
  if (words.length > 0) {
    console.log(`🔄 Should be moved to ${category.toUpperCase()} (${words.length} entries):`);
    words.forEach(({ word, english }) => {
      console.log(`   "${word}" → "${english}"`);
    });
    console.log();
  }
});

// Save detailed results to file
const resultsPath = path.join(projectRoot, 'noun-analysis-results.json');
fs.writeFileSync(resultsPath, JSON.stringify({
  summary: {
    correctNouns,
    totalMisclassified,
    totalAnalyzed: wordMatches.length
  },
  misclassified
}, null, 2));

console.log(`📁 Detailed results saved to: ${resultsPath}`);
