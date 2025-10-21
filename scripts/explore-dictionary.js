#!/usr/bin/env node

/**
 * Dictionary Explorer
 * Interactive tool to explore the vocabulary dictionary
 */

import {
  DictionaryLookup,
  VocabularyStats,
  PhraseLookup,
} from "../src/data/dictionary/index.js";

console.log("🔍 Vocabulary Dictionary Explorer\n");

// Show overall statistics
console.log("📊 Dictionary Statistics:");
const stats = {
  totalWords: VocabularyStats.getTotalWords(),
  byPartOfSpeech: VocabularyStats.getWordCountByPartOfSpeech(),
  byLanguage: VocabularyStats.getWordCountByLanguage(),
};

console.log(`Total words: ${stats.totalWords}`);
console.log("By part of speech:");
Object.entries(stats.byPartOfSpeech).forEach(([pos, count]) => {
  console.log(`  ${pos}: ${count}`);
});

// Explore specific words
console.log("\n🔍 Word Exploration:");

const testWords = ["livre-fr", "chat-fr", "bon-fr", "je-fr"];
testWords.forEach((wordId) => {
  const word = DictionaryLookup.getWord(wordId);
  if (word) {
    console.log(`\n📝 ${word.word} (${word.partOfSpeech}):`);
    console.log(`   Gender: ${word.gender}`);
    console.log(`   Translation: ${word.translations[0]?.text || "N/A"}`);
    console.log(`   Definition: ${word.translations[0]?.definition || "N/A"}`);
    console.log(`   Frequency: ${word.frequency?.rank || "N/A"}`);
  } else {
    console.log(`❌ ${wordId}: Not found`);
  }
});

// Search functionality
console.log("\n🔎 Search Examples:");
const searchResults = DictionaryLookup.searchWords("ch", "fr", 5);
console.log(`Search for 'ch': ${searchResults.map((w) => w.word).join(", ")}`);

const searchResults2 = DictionaryLookup.searchWords("ma", "fr", 3);
console.log(`Search for 'ma': ${searchResults2.map((w) => w.word).join(", ")}`);

// Part of speech filtering
console.log("\n📚 Part of Speech Filtering:");
const nouns = DictionaryLookup.getWordsByPartOfSpeech("noun");
console.log(
  `Found ${nouns.size} nouns: ${Array.from(nouns.keys())
    .slice(0, 5)
    .join(", ")}...`
);

const pronouns = DictionaryLookup.getWordsByPartOfSpeech("pronoun");
console.log(
  `Found ${pronouns.size} pronouns: ${Array.from(pronouns.keys())
    .slice(0, 5)
    .join(", ")}...`
);

// Phrase exploration
console.log("\n💬 Phrase Exploration:");
const phrases = PhraseLookup.getPhrasesByType("expression");
console.log(`Found ${phrases.length} expressions`);

// Show some phrases
const phraseEntries = Array.from(phrases).slice(0, 3);
phraseEntries.forEach((phraseId) => {
  const phrase = PhraseLookup.getPhrase(phraseId);
  if (phrase) {
    console.log(
      `\n📝 "${phrase.word}": ${phrase.translations[0]?.text || "N/A"}`
    );
  }
});

console.log("\n✅ Dictionary exploration complete!");
console.log("\n💡 Usage Tips:");
console.log("- Use DictionaryLookup.getWord(id) for O(1) word lookup");
console.log(
  "- Use DictionaryLookup.searchWords(query, language, limit) for autocomplete"
);
console.log("- Use DictionaryLookup.getWordsByPartOfSpeech(pos) for filtering");
console.log("- Use PhraseLookup.getPhrase(id) for phrase analysis");
console.log("- All lookups are O(1) performance optimized!");
