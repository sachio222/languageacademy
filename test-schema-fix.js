#!/usr/bin/env node

/**
 * Test Schema Fix - Simple validation test
 */

import { nounsCambridge } from './src/data/dictionary/words/cambridge/nouns.js';

// Simple validation function
function testEntry(entry) {
  const required = ['id', 'lang', 'word', 'partOfSpeech'];
  const missing = required.filter(field => !entry[field]);
  
  if (missing.length > 0) {
    return { valid: false, errors: [`Missing required fields: ${missing.join(', ')}`] };
  }
  
  // Check if lesson field causes issues (should allow null now)
  if (entry.lesson === null) {
    return { valid: true, note: 'lesson is null (should be OK now)' };
  }
  
  return { valid: true };
}

console.log('🔍 Testing schema fix with sample entries...\n');

// Test a few entries
const testEntries = Array.from(nounsCambridge.entries()).slice(0, 5);

for (const [id, entry] of testEntries) {
  const result = testEntry(entry);
  console.log(`${id}: ${result.valid ? '✅ Valid' : '❌ Invalid'}`);
  if (result.note) console.log(`  Note: ${result.note}`);
  if (result.errors) console.log(`  Errors: ${result.errors.join(', ')}`);
  console.log(`  lesson field: ${entry.lesson} (${typeof entry.lesson})`);
  console.log('');
}

console.log('✅ Schema fix test completed!');
