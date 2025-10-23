#!/usr/bin/env node

/**
 * Find Duplicate Words
 * Analyzes the extracted word data to find duplicates across files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Finding duplicate words in extracted data...");

// Read the raw data file
const dataPath = path.join(__dirname, "all-words-raw-data.json");
const rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

console.log(
  `📊 Analyzing ${rawData.words.length} words from ${rawData.file_statistics.length} files`
);

// Group words by the actual word text (case-insensitive)
const wordGroups = {};
const duplicates = [];

rawData.words.forEach((wordEntry, index) => {
  const word = wordEntry.word.toLowerCase();

  if (!wordGroups[word]) {
    wordGroups[word] = [];
  }

  wordGroups[word].push({
    ...wordEntry,
    originalIndex: index,
  });
});

// Find words that appear multiple times
Object.entries(wordGroups).forEach(([word, entries]) => {
  if (entries.length > 1) {
    duplicates.push({
      word: word,
      count: entries.length,
      entries: entries,
    });
  }
});

// Sort by count (most duplicates first)
duplicates.sort((a, b) => b.count - a.count);

console.log(`\n📊 DUPLICATE ANALYSIS`);
console.log("=".repeat(60));
console.log(`🔍 Found ${duplicates.length} words with duplicates`);
console.log(
  `📈 Total duplicate instances: ${duplicates.reduce(
    (sum, dup) => sum + dup.count,
    0
  )}`
);

// Show top 20 most duplicated words
console.log(`\n🏆 TOP 20 MOST DUPLICATED WORDS:`);
console.log("-".repeat(60));

duplicates.slice(0, 20).forEach((dup, index) => {
  console.log(`${index + 1}. "${dup.word}" - appears ${dup.count} times`);
  dup.entries.forEach((entry, i) => {
    console.log(
      `   ${i + 1}. ${entry.file} (${entry.partOfSpeech}) - "${
        entry.translation
      }"`
    );
  });
  console.log("");
});

// Create detailed duplicate report
const duplicateReport = {
  metadata: {
    analyzed_at: new Date().toISOString(),
    total_words: rawData.words.length,
    unique_words: Object.keys(wordGroups).length,
    duplicate_words: duplicates.length,
    total_duplicate_instances: duplicates.reduce(
      (sum, dup) => sum + dup.count,
      0
    ),
  },
  duplicates: duplicates,
};

// Write duplicate report
const reportPath = path.join(__dirname, "duplicate-words-report.json");
fs.writeFileSync(reportPath, JSON.stringify(duplicateReport, null, 2));

// Create simple duplicate list
const duplicateListPath = path.join(__dirname, "duplicate-words-list.txt");
const duplicateList = duplicates
  .map(
    (dup) =>
      `${dup.word} (${dup.count} times): ${dup.entries
        .map((e) => e.file)
        .join(", ")}`
  )
  .join("\n");

fs.writeFileSync(duplicateListPath, duplicateList);

console.log(`\n💾 REPORTS CREATED:`);
console.log(`📄 Detailed report: ${reportPath}`);
console.log(`📝 Simple list: ${duplicateListPath}`);

// Show summary by file
console.log(`\n📊 DUPLICATES BY FILE:`);
console.log("-".repeat(40));

const fileDuplicateCounts = {};
duplicates.forEach((dup) => {
  dup.entries.forEach((entry) => {
    if (!fileDuplicateCounts[entry.file]) {
      fileDuplicateCounts[entry.file] = 0;
    }
    fileDuplicateCounts[entry.file]++;
  });
});

Object.entries(fileDuplicateCounts)
  .sort(([, a], [, b]) => b - a)
  .forEach(([file, count]) => {
    console.log(`${file}: ${count} duplicate instances`);
  });

console.log(`\n🎉 DUPLICATE ANALYSIS COMPLETE!`);
console.log(`📊 Found ${duplicates.length} words with duplicates`);
console.log(
  `📈 Total duplicate instances: ${duplicates.reduce(
    (sum, dup) => sum + dup.count,
    0
  )}`
);
