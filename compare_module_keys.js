/**
 * Compare database module_keys with actual module definitions
 * This will show us ALL the fucking mismatches
 */

import { lessons } from './src/lessons/lessonData.js';

// Database module_keys (from your query result)
const databaseKeys = [
  "2024-01-01-famous-words",
  "2024-01-01-pronouns", 
  "2024-01-02-etre",
  "2024-01-04-avoir",
  "2024-01-05-articles",
  "2024-01-06-basic-nouns",
  "2024-01-06-cognates-help",
  "2024-01-07-liaison-help",
  "2024-01-07-plurals",
  "2024-01-08-connectors",
  "2024-01-09-reading1",
  "2024-01-10-unit1-practice",
  "2024-01-11-unit1-exam",
  "2024-01-12-demonstratives",
  "2024-01-13-ca-survival",
  "2024-01-14-determiners-nouns",
  "2024-01-14-vouloir",
  "2024-01-16-voir",
  "2024-01-17-questions",
  "2024-01-18-questions-help",
  "2024-01-18-stressed-pronouns",
  "2024-01-19-prepositions",
  "2024-01-20-adjectives",
  "2024-01-21-reading2",
  "2024-01-22-unit2-practice",
  "2024-01-23-unit2-exam",
  "2024-01-24-contractions",
  "2024-01-25-venir",
  "2024-01-26-aller",
  "2024-01-27-verb-pattern-help",
  "2024-01-28-partir",
  "2024-01-31-combining",
  "2024-02-01-reading3",
  "2024-02-02-unit3-practice",
  "2024-02-03-unit3-exam",
  "2024-02-04-survival-phrases",
  "2024-03-27-unit7-practice",
  "2024-03-28-negation",
  "2024-03-30-reading-4",
  "2024-04-01-alphabet",
  "2024-04-02-numbers",
  "2024-04-03-days-months",
  "2024-04-03-unit-4-practice",
  "2024-04-04-holidays",
  "2024-04-07-language-stats",
  "2024-04-13-reading-5",
  "2024-04-14-unit-5-exam",
  "2024-04-15-unit-5-practice",
  "2024-05-04-emotion-phrases",
  "2024-05-06-past-regret-phrases"
];

// Get actual module keys from lesson definitions
const actualKeys = lessons.map(lesson => lesson.moduleKey).filter(Boolean);

console.log('=== COMPARISON RESULTS ===\n');

// Find database keys that don't exist in actual lessons
const missingInLessons = databaseKeys.filter(dbKey => !actualKeys.includes(dbKey));
console.log('🔴 DATABASE KEYS NOT FOUND IN LESSONS:');
missingInLessons.forEach(key => {
  console.log(`  ❌ ${key}`);
});

// Find actual lesson keys that don't exist in database
const missingInDatabase = actualKeys.filter(actualKey => !databaseKeys.includes(actualKey));
console.log('\n🔴 LESSON KEYS NOT FOUND IN DATABASE:');
missingInDatabase.forEach(key => {
  console.log(`  ❌ ${key}`);
});

// Find exact matches
const matches = databaseKeys.filter(dbKey => actualKeys.includes(dbKey));
console.log('\n🟢 PERFECT MATCHES:');
matches.forEach(key => {
  console.log(`  ✅ ${key}`);
});

console.log('\n=== SUMMARY ===');
console.log(`Database keys: ${databaseKeys.length}`);
console.log(`Actual lesson keys: ${actualKeys.length}`);
console.log(`Perfect matches: ${matches.length}`);
console.log(`Database keys missing from lessons: ${missingInLessons.length}`);
console.log(`Lesson keys missing from database: ${missingInDatabase.length}`);

// Show some examples of what the actual lessons have
console.log('\n=== SAMPLE ACTUAL LESSON KEYS ===');
actualKeys.slice(0, 20).forEach((key, index) => {
  const lesson = lessons.find(l => l.moduleKey === key);
  console.log(`${index + 1}. ${key} → "${lesson?.title}"`);
});

export { databaseKeys, actualKeys, missingInLessons, missingInDatabase, matches };
