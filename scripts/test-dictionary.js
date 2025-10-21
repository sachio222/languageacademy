#!/usr/bin/env node

/**
 * Dictionary Test Script
 * Tests the dictionary system and compatibility layer
 */

import { dictionary, DictionaryLookup, LessonCompatibility, VocabularyStats } from '../src/data/dictionary/index.js';

console.log('🧪 Testing Dictionary System...\n');

// Test 1: Basic dictionary functionality
console.log('📚 Dictionary Stats:');
console.log(`Total words: ${VocabularyStats.getTotalWords()}`);
console.log(`Words by part of speech:`, VocabularyStats.getWordCountByPartOfSpeech());
console.log(`Words by language:`, VocabularyStats.getWordCountByLanguage());

// Test 2: Word lookup
console.log('\n🔍 Word Lookup Tests:');
const testWords = ['livre-fr', 'chat-fr', 'être-fr', 'bon-fr'];
testWords.forEach(wordId => {
  const word = DictionaryLookup.getWord(wordId);
  if (word) {
    console.log(`✅ ${wordId}: ${word.word} (${word.partOfSpeech})`);
  } else {
    console.log(`❌ ${wordId}: Not found`);
  }
});

// Test 3: Search functionality
console.log('\n🔎 Search Tests:');
const searchResults = DictionaryLookup.searchWords('ch', 'fr', 5);
console.log(`Search for 'ch':`, searchResults.map(w => w.word));

// Test 4: Part of speech filtering
console.log('\n📝 Part of Speech Tests:');
const nouns = DictionaryLookup.getWordsByPartOfSpeech('noun');
console.log(`Found ${nouns.size} nouns`);

const verbs = DictionaryLookup.getWordsByPartOfSpeech('verb');
console.log(`Found ${verbs.size} verbs`);

// Test 5: Compatibility layer
console.log('\n🔄 Compatibility Layer Tests:');
const sampleVocab = [
  { french: 'livre', english: 'book' },
  { french: 'chat', english: 'cat' },
  { french: 'unknown-word', english: 'unknown' }
];

const converted = LessonCompatibility.convertVocabularyReference(sampleVocab);
converted.forEach(vocab => {
  const status = vocab.dictionaryEntry ? '✅' : '❌';
  console.log(`${status} ${vocab.french}: ${vocab.dictionaryEntry ? 'Found in dictionary' : 'Not in dictionary'}`);
});

console.log('\n✅ Dictionary system test complete!');

