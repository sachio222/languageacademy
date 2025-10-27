#!/usr/bin/env node

/**
 * Compare Reading Words with Cambridge Dictionary
 *
 * This script compares words from reading passages against Cambridge dictionary
 * definitions to identify which words lack definitions.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import Cambridge dictionary Maps
import { nounsCambridge } from "./src/data/dictionary/words/cambridge/nouns.js";
import { verbsCambridge } from "./src/data/dictionary/words/cambridge/verbs.js";
import { adjectivesCambridge } from "./src/data/dictionary/words/cambridge/adjectives.js";
import { adverbsCambridge } from "./src/data/dictionary/words/cambridge/adverbs.js";
import { articlesCambridge } from "./src/data/dictionary/words/cambridge/articles.js";
import { conjunctionsCambridge } from "./src/data/dictionary/words/cambridge/conjunctions.js";
import { expressionsCambridge } from "./src/data/dictionary/words/cambridge/expressions.js";
import { interjectionsCambridge } from "./src/data/dictionary/words/cambridge/interjections.js";
import { interrogativesCambridge } from "./src/data/dictionary/words/cambridge/interrogatives.js";
import { prepositionsCambridge } from "./src/data/dictionary/words/cambridge/prepositions.js";
import { pronounsCambridge } from "./src/data/dictionary/words/cambridge/pronouns.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load all Cambridge dictionary Maps
const allCambridgeWords = new Set();

console.log("🔍 Loading Cambridge dictionary Maps...");

// Array of all Cambridge Maps
const cambridgeMaps = [
  { name: "nouns", map: nounsCambridge },
  { name: "verbs", map: verbsCambridge },
  { name: "adjectives", map: adjectivesCambridge },
  { name: "adverbs", map: adverbsCambridge },
  { name: "articles", map: articlesCambridge },
  { name: "conjunctions", map: conjunctionsCambridge },
  { name: "expressions", map: expressionsCambridge },
  { name: "interjections", map: interjectionsCambridge },
  { name: "interrogatives", map: interrogativesCambridge },
  { name: "prepositions", map: prepositionsCambridge },
  { name: "pronouns", map: pronounsCambridge },
];

// Process each Cambridge Map
for (const { name, map } of cambridgeMaps) {
  try {
    console.log(`\n📖 Processing ${name}...`);

    let wordCount = 0;
    for (const [id, entry] of map) {
      if (entry.word) {
        allCambridgeWords.add(entry.word.toLowerCase());
        wordCount++;
      }
    }

    console.log(`  ✅ Extracted ${wordCount} words`);

    // Show sample words from this map
    const sampleWords = Array.from(map.values())
      .slice(0, 5)
      .map((entry) => entry.word);
    console.log(`  🔤 Sample words: ${sampleWords.join(", ")}`);
  } catch (error) {
    console.error(`  ❌ Error processing ${name}:`, error.message);
  }
}

console.log(`\n📊 Cambridge Dictionary Summary:`);
console.log(`  📚 Maps processed: ${cambridgeMaps.length}`);
console.log(`  🔤 Total Cambridge words: ${allCambridgeWords.size}`);

// Load reading words
console.log(`\n📖 Loading reading words from all-reading-words.txt...`);

const readingWordsFile = path.join(__dirname, "all-reading-words.txt");
const readingWordsContent = fs.readFileSync(readingWordsFile, "utf8");

// Extract words from the file (skip header lines starting with #)
const readingWords = readingWordsContent
  .split("\n")
  .filter((line) => line.trim() && !line.startsWith("#"))
  .map((word) => word.trim().toLowerCase())
  .filter((word) => word.length > 0);

console.log(`  📝 Reading words loaded: ${readingWords.length}`);

// Compare and find unmet words
console.log(`\n🔍 Comparing reading words with Cambridge definitions...`);

const unmetWords = [];
const metWords = [];

for (const word of readingWords) {
  if (allCambridgeWords.has(word)) {
    metWords.push(word);
  } else {
    unmetWords.push(word);
  }
}

// Sort unmet words alphabetically
unmetWords.sort();

console.log(`\n📊 COMPARISON RESULTS:`);
console.log(`  ✅ Words with Cambridge definitions: ${metWords.length}`);
console.log(`  ❌ Words without Cambridge definitions: ${unmetWords.length}`);
console.log(
  `  📈 Coverage: ${((metWords.length / readingWords.length) * 100).toFixed(
    1
  )}%`
);

// Show some examples of unmet words
console.log(`\n🔤 Sample unmet words (first 20):`);
const sampleUnmet = unmetWords.slice(0, 20);
console.log(
  `  ${sampleUnmet.join(", ")}${unmetWords.length > 20 ? "..." : ""}`
);

// Show some examples of met words
console.log(`\n🔤 Sample met words (first 20):`);
const sampleMet = metWords.slice(0, 20);
console.log(`  ${sampleMet.join(", ")}${metWords.length > 20 ? "..." : ""}`);

// Output unmet words to file
const outputFile = path.join(__dirname, "all-reading-words-unmet.txt");
const outputContent = [
  `# Reading Words Without Cambridge Definitions`,
  `# Generated: ${new Date().toISOString()}`,
  `# Total reading words: ${readingWords.length}`,
  `# Words with definitions: ${metWords.length}`,
  `# Words without definitions: ${unmetWords.length}`,
  `# Coverage: ${((metWords.length / readingWords.length) * 100).toFixed(1)}%`,
  ``,
  `# Unmet Words List:`,
  ...unmetWords,
].join("\n");

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log(`\n✅ SUCCESS!`);
console.log(`  📄 Output file: ${outputFile}`);
console.log(`  📊 Unmet words: ${unmetWords.length}`);
console.log(
  `  📝 File size: ${(fs.statSync(outputFile).size / 1024).toFixed(1)} KB`
);

// Show statistics about unmet words
if (unmetWords.length > 0) {
  const wordLengths = unmetWords.map((word) => word.length);
  const avgLength = wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length;
  const longestUnmet = unmetWords.reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );
  const shortUnmet = unmetWords.filter((word) => word.length <= 3);

  console.log(`\n📊 Unmet Words Statistics:`);
  console.log(`  📏 Average length: ${avgLength.toFixed(1)} characters`);
  console.log(
    `  📏 Longest unmet word: "${longestUnmet}" (${longestUnmet.length} characters)`
  );
  console.log(`  📏 Short unmet words (≤3 chars): ${shortUnmet.length} words`);

  // Show first and last few unmet words
  console.log(`\n🔤 First 10 unmet words:`);
  console.log(`  ${unmetWords.slice(0, 10).join(", ")}`);

  console.log(`\n🔤 Last 10 unmet words:`);
  console.log(`  ${unmetWords.slice(-10).join(", ")}`);
}
