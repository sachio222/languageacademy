#!/usr/bin/env node

/**
 * Alphabetizes vocabulary in readingVocabulary.js
 * Usage: node scripts/alphabetize-vocabulary.js
 */

const fs = require("fs");
const path = require("path");

const VOCAB_FILE = path.join(
  __dirname,
  "../src/components/readingVocabulary.js"
);

console.log("📖 Reading vocabulary file...");

// Read the file
const content = fs.readFileSync(VOCAB_FILE, "utf8");

// Extract the vocabulary object using require
// First, create a temporary file that exports the object
const tempFile = path.join(__dirname, "../src/components/.temp-vocab.js");
fs.writeFileSync(tempFile, content.replace("export const", "module.exports."));

// Clear require cache and load
delete require.cache[tempFile];
const { readingVocabulary } = require(tempFile);

// Clean up temp file
fs.unlinkSync(tempFile);

console.log(
  `📊 Found ${Object.keys(readingVocabulary).length} vocabulary entries`
);

// Sort alphabetically using French locale
const sortedEntries = Object.entries(readingVocabulary).sort(([a], [b]) => {
  return a.localeCompare(b, "fr", { sensitivity: "base" });
});

console.log("🔤 Sorting alphabetically...");

// Check if already sorted
let outOfOrder = 0;
const originalEntries = Object.entries(readingVocabulary);
for (let i = 0; i < originalEntries.length; i++) {
  if (originalEntries[i][0] !== sortedEntries[i][0]) {
    outOfOrder++;
  }
}

if (outOfOrder === 0) {
  console.log("✅ Vocabulary is already alphabetized!");
  process.exit(0);
}

console.log(`⚠️  Found ${outOfOrder} entries out of alphabetical order`);

// Build the new file content
const lines = [
  "/**",
  " * Reading Passage Vocabulary",
  " * Word translations for interactive reading tooltips",
  " * Extracted and deduplicated from ReadingPassage.jsx",
  " * Contains " + sortedEntries.length + " unique translations",
  " * ALPHABETICALLY SORTED",
  " */",
  "",
  "export const readingVocabulary = {",
];

// Add each entry
sortedEntries.forEach(([key, value], index) => {
  // Escape single quotes and backslashes in key and value
  const escapedKey = key.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  const escapedValue = value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

  const comma = index < sortedEntries.length - 1 ? "," : "";
  lines.push(`  '${escapedKey}': '${escapedValue}'${comma}`);
});

lines.push("};");
lines.push("");

// Write back to file
const newContent = lines.join("\n");
fs.writeFileSync(VOCAB_FILE, newContent, "utf8");

console.log("✅ Vocabulary alphabetized successfully!");
console.log(`📝 Updated ${VOCAB_FILE}`);
console.log(`📊 Total entries: ${sortedEntries.length}`);

// Show first few entries as example
console.log("\n📋 First 10 entries:");
sortedEntries.slice(0, 10).forEach(([key, value]) => {
  console.log(`   '${key}': '${value}'`);
});
