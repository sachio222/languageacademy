#!/usr/bin/env node

/**
 * Find Cross-File Duplicates
 * Identifies words that appear in multiple different dictionary files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Finding cross-file duplicates...");

// Read the raw data file
const dataPath = path.join(__dirname, "all-words-raw-data.json");
const rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

console.log(
  `📊 Analyzing ${rawData.words.length} words from ${rawData.file_statistics.length} files`
);

// Group words by the actual word text (case-insensitive)
const wordGroups = {};

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

// Find words that appear in multiple files
const crossFileDuplicates = [];

Object.entries(wordGroups).forEach(([word, entries]) => {
  if (entries.length > 1) {
    // Get unique files for this word
    const uniqueFiles = [...new Set(entries.map((e) => e.file))];

    // Only include if it appears in multiple files
    if (uniqueFiles.length > 1) {
      crossFileDuplicates.push({
        word: word,
        fileCount: uniqueFiles.length,
        totalInstances: entries.length,
        files: uniqueFiles,
        entries: entries,
      });
    }
  }
});

// Sort by number of files (most cross-file duplicates first)
crossFileDuplicates.sort((a, b) => b.fileCount - a.fileCount);

console.log(`\n📊 CROSS-FILE DUPLICATE ANALYSIS`);
console.log("=".repeat(60));
console.log(
  `🔍 Found ${crossFileDuplicates.length} words with cross-file duplicates`
);
console.log(
  `📈 Total cross-file duplicate instances: ${crossFileDuplicates.reduce(
    (sum, dup) => sum + dup.totalInstances,
    0
  )}`
);

// Show all cross-file duplicates
console.log(`\n🔄 ALL CROSS-FILE DUPLICATES:`);
console.log("-".repeat(60));

crossFileDuplicates.forEach((dup, index) => {
  console.log(
    `${index + 1}. "${dup.word}" - appears in ${dup.fileCount} files (${
      dup.totalInstances
    } total instances)`
  );
  console.log(`   Files: ${dup.files.join(", ")}`);

  // Group entries by file
  const entriesByFile = {};
  dup.entries.forEach((entry) => {
    if (!entriesByFile[entry.file]) {
      entriesByFile[entry.file] = [];
    }
    entriesByFile[entry.file].push(entry);
  });

  // Show details for each file
  Object.entries(entriesByFile).forEach(([file, fileEntries]) => {
    console.log(`   📁 ${file} (${fileEntries.length} instances):`);
    fileEntries.forEach((entry, i) => {
      console.log(
        `      ${i + 1}. ${entry.partOfSpeech} - "${entry.translation}"`
      );
    });
  });
  console.log("");
});

// Create detailed cross-file duplicate report
const crossFileReport = {
  metadata: {
    analyzed_at: new Date().toISOString(),
    total_words: rawData.words.length,
    cross_file_duplicates: crossFileDuplicates.length,
    total_cross_file_instances: crossFileDuplicates.reduce(
      (sum, dup) => sum + dup.totalInstances,
      0
    ),
  },
  cross_file_duplicates: crossFileDuplicates,
};

// Write cross-file duplicate report
const reportPath = path.join(__dirname, "cross-file-duplicates-report.json");
fs.writeFileSync(reportPath, JSON.stringify(crossFileReport, null, 2));

// Create simple cross-file duplicate list
const crossFileListPath = path.join(
  __dirname,
  "cross-file-duplicates-list.txt"
);
const crossFileList = crossFileDuplicates
  .map(
    (dup) =>
      `${dup.word} (${dup.fileCount} files, ${
        dup.totalInstances
      } instances): ${dup.files.join(", ")}`
  )
  .join("\n");

fs.writeFileSync(crossFileListPath, crossFileList);

console.log(`\n💾 REPORTS CREATED:`);
console.log(`📄 Detailed report: ${reportPath}`);
console.log(`📝 Simple list: ${crossFileListPath}`);

// Show summary by file pair
console.log(`\n📊 CROSS-FILE DUPLICATES BY FILE COMBINATIONS:`);
console.log("-".repeat(50));

const filePairCounts = {};
crossFileDuplicates.forEach((dup) => {
  // Create all possible file pairs for this word
  for (let i = 0; i < dup.files.length; i++) {
    for (let j = i + 1; j < dup.files.length; j++) {
      const pair = `${dup.files[i]} ↔ ${dup.files[j]}`;
      if (!filePairCounts[pair]) {
        filePairCounts[pair] = 0;
      }
      filePairCounts[pair]++;
    }
  }
});

Object.entries(filePairCounts)
  .sort(([, a], [, b]) => b - a)
  .forEach(([pair, count]) => {
    console.log(`${pair}: ${count} words`);
  });

console.log(`\n🎉 CROSS-FILE DUPLICATE ANALYSIS COMPLETE!`);
console.log(
  `📊 Found ${crossFileDuplicates.length} words with cross-file duplicates`
);
console.log(
  `📈 Total cross-file duplicate instances: ${crossFileDuplicates.reduce(
    (sum, dup) => sum + dup.totalInstances,
    0
  )}`
);
