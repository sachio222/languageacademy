#!/usr/bin/env node

/**
 * Check Learning Status Script
 * Shows how to determine if words are learned or not
 */

import { DictionaryLookup } from "../src/data/dictionary/index.js";

// Mock user progress data (in real app, this would come from database)
const userProgress = new Map([
  [
    "livre-fr",
    {
      mastery: 85,
      encounters: 15,
      correct: 12,
      lastSeen: "2025-01-21T10:30:00Z",
    },
  ],
  [
    "chat-fr",
    {
      mastery: 95,
      encounters: 20,
      correct: 19,
      lastSeen: "2025-01-21T11:00:00Z",
    },
  ],
  [
    "bon-fr",
    {
      mastery: 45,
      encounters: 8,
      correct: 4,
      lastSeen: "2025-01-20T15:30:00Z",
    },
  ],
  [
    "je-fr",
    {
      mastery: 100,
      encounters: 50,
      correct: 50,
      lastSeen: "2025-01-21T12:00:00Z",
    },
  ],
]);

/**
 * Check if a word is learned based on mastery score
 */
function isLearned(wordId, masteryThreshold = 80) {
  const progress = userProgress.get(wordId);
  if (!progress) return false;
  return progress.mastery >= masteryThreshold;
}

/**
 * Get learning status for a word
 */
function getLearningStatus(wordId) {
  const progress = userProgress.get(wordId);
  if (!progress) {
    return { status: "not_started", mastery: 0, encounters: 0 };
  }

  if (progress.mastery >= 90) return { status: "mastered", ...progress };
  if (progress.mastery >= 70) return { status: "learning", ...progress };
  if (progress.mastery >= 40) return { status: "struggling", ...progress };
  return { status: "new", ...progress };
}

console.log("🔍 Learning Status Checker\n");

// Test words
const testWords = ["livre-fr", "chat-fr", "bon-fr", "je-fr", "unknown-fr"];

testWords.forEach((wordId) => {
  const word = DictionaryLookup.getWord(wordId);
  const status = getLearningStatus(wordId);
  const learned = isLearned(wordId);

  if (word) {
    console.log(`📝 ${word.word} (${word.partOfSpeech}):`);
    console.log(`   Status: ${status.status} (${status.mastery}% mastery)`);
    console.log(`   Learned: ${learned ? "✅ Yes" : "❌ No"}`);
    console.log(`   Encounters: ${status.encounters}`);
    console.log(`   Last seen: ${status.lastSeen || "Never"}`);
  } else {
    console.log(`❌ ${wordId}: Word not found in dictionary`);
  }
  console.log("");
});

// Show learning statistics
const totalWords = userProgress.size;
const learnedWords = Array.from(userProgress.values()).filter(
  (p) => p.mastery >= 80
).length;
const learningWords = Array.from(userProgress.values()).filter(
  (p) => p.mastery >= 40 && p.mastery < 80
).length;
const newWords = Array.from(userProgress.values()).filter(
  (p) => p.mastery < 40
).length;

console.log("📊 Learning Statistics:");
console.log(`Total words in progress: ${totalWords}`);
console.log(`✅ Learned (80%+): ${learnedWords}`);
console.log(`🔄 Learning (40-79%): ${learningWords}`);
console.log(`🆕 New (<40%): ${newWords}`);
console.log(
  `📈 Progress: ${Math.round((learnedWords / totalWords) * 100)}% complete`
);

console.log("\n💡 Usage in your app:");
console.log("- Use isLearned(wordId) to check if word is mastered");
console.log("- Use getLearningStatus(wordId) for detailed progress");
console.log("- Track encounters and mistakes for spaced repetition");
console.log("- Use mastery scores for adaptive learning paths");
