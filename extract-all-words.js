#!/usr/bin/env node

/**
 * Extract All Words from Dictionary
 * Reads every word field from all files in /dictionary/words/ directory
 * and writes them to a comprehensive raw data file
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to dictionary words directory
const wordsDir = path.join(__dirname, "src/data/dictionary/words");

console.log("🔍 Extracting all words from dictionary files...");
console.log(`📁 Scanning directory: ${wordsDir}`);

// Get all .js files in the words directory
const files = fs
  .readdirSync(wordsDir)
  .filter((file) => file.endsWith(".js"))
  .sort();

console.log(`📊 Found ${files.length} dictionary files:`);
files.forEach((file, index) => {
  console.log(`  ${index + 1}. ${file}`);
});

console.log("\n🚀 Processing files...\n");

// Store all extracted words
const allWords = [];
const fileStats = [];

// Process each file
for (const file of files) {
  const filePath = path.join(wordsDir, file);
  const fileName = path.basename(file, ".js");

  console.log(`📖 Processing ${file}...`);

  try {
    // Read the file content
    const content = fs.readFileSync(filePath, "utf8");

    // Extract the Map content using regex
    const mapMatch = content.match(
      /export const \w+ = new Map\(\[([\s\S]*?)\]\);/m
    );

    if (!mapMatch) {
      console.log(`  ⚠️  No Map found in ${file}`);
      fileStats.push({
        file: file,
        words: 0,
        status: "no-map",
      });
      continue;
    }

    // Parse the Map content safely
    const mapContent = `[${mapMatch[1]}]`;
    const entries = eval(mapContent);

    console.log(`  📊 Found ${entries.length} entries`);

    // Extract words from entries
    const fileWords = [];
    entries.forEach(([id, entry]) => {
      if (entry && entry.word) {
        fileWords.push({
          id: id,
          word: entry.word,
          partOfSpeech: entry.partOfSpeech || "unknown",
          translation: entry.translations?.[0]?.text || "no translation",
          gender: entry.gender || "none",
          cefr_level: entry.cefr_level || "unknown",
          difficulty: entry.difficulty || 0,
          source: entry.source || "unknown",
          file: fileName,
        });
      }
    });

    console.log(`  ✅ Extracted ${fileWords.length} words`);

    // Add to master list
    allWords.push(...fileWords);

    fileStats.push({
      file: file,
      words: fileWords.length,
      status: "success",
    });
  } catch (error) {
    console.log(`  ❌ Error processing ${file}: ${error.message}`);
    fileStats.push({
      file: file,
      words: 0,
      status: "error",
      error: error.message,
    });
  }
}

console.log("\n📊 EXTRACTION SUMMARY");
console.log("=".repeat(50));

// Display file statistics
fileStats.forEach((stat) => {
  const status =
    stat.status === "success" ? "✅" : stat.status === "error" ? "❌" : "⚠️";
  console.log(`${status} ${stat.file}: ${stat.words} words`);
  if (stat.error) {
    console.log(`    Error: ${stat.error}`);
  }
});

// Calculate totals
const totalWords = allWords.length;
const successfulFiles = fileStats.filter((s) => s.status === "success").length;
const errorFiles = fileStats.filter((s) => s.status === "error").length;

console.log("\n📈 TOTALS");
console.log(`✅ Successfully processed: ${successfulFiles} files`);
console.log(`❌ Failed files: ${errorFiles} files`);
console.log(`📚 Total words extracted: ${totalWords} words`);

// Sort words alphabetically
allWords.sort((a, b) => a.word.localeCompare(b.word));

// Create raw data file
const outputPath = path.join(__dirname, "all-words-raw-data.json");
const outputContent = {
  metadata: {
    extracted_at: new Date().toISOString(),
    total_words: totalWords,
    files_processed: successfulFiles,
    files_failed: errorFiles,
    source_directory: wordsDir,
  },
  file_statistics: fileStats,
  words: allWords,
};

console.log(`\n💾 Writing to ${outputPath}...`);

try {
  fs.writeFileSync(outputPath, JSON.stringify(outputContent, null, 2));
  console.log(`✅ Successfully wrote ${totalWords} words to ${outputPath}`);
} catch (error) {
  console.log(`❌ Error writing file: ${error.message}`);
  process.exit(1);
}

// Create a simple word list file as well
const wordListPath = path.join(__dirname, "all-words-list.txt");
const wordList = allWords.map((w) => w.word).join("\n");

try {
  fs.writeFileSync(wordListPath, wordList);
  console.log(`✅ Also created simple word list: ${wordListPath}`);
} catch (error) {
  console.log(`⚠️  Could not create word list: ${error.message}`);
}

console.log("\n🎉 EXTRACTION COMPLETE!");
console.log(`📁 Raw data file: ${outputPath}`);
console.log(`📝 Word list file: ${wordListPath}`);
console.log(`📊 Total words: ${totalWords}`);
