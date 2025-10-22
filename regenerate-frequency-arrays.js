#!/usr/bin/env node

/**
 * Regenerate Frequency Arrays Script
 * Updates all *ByFrequency arrays to match current dictionary file contents
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All dictionary files to process
const dictionaryFiles = [
  "nouns.js",
  "verbs.js",
  "adjectives.js",
  "adverbs.js",
  "pronouns.js",
  "articles.js",
  "prepositions.js",
  "conjunctions.js",
  "interjections.js",
  "interrogatives.js",
  "alphabet.js",
  "expressions.js",
];

// Function to parse dictionary file
function parseDictionaryFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const mapMatch = content.match(
      /export const \w+ = new Map\(\[([\s\S]*?)\]\);/
    );

    if (!mapMatch) {
      return null;
    }

    const mapContent = `[${mapMatch[1]}]`;
    const entries = eval(mapContent);
    return { entries, originalContent: content, mapMatch };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

// Function to update frequency array in file
function updateFrequencyArray(filePath, newFrequencyArray) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const varName = path.basename(filePath, ".js");

    // Find the frequency array pattern
    const frequencyRegex = new RegExp(
      `export const ${varName}ByFrequency = \\[[\\s\\S]*?\\];`
    );

    // Generate new frequency array string
    const newFrequencyString = `export const ${varName}ByFrequency = [${newFrequencyArray
      .map((id) => `"${id}"`)
      .join(", ")}];`;

    // Replace the frequency array
    const updatedContent = content.replace(frequencyRegex, newFrequencyString);

    // Write back to file
    fs.writeFileSync(filePath, updatedContent);
    return true;
  } catch (error) {
    console.error(
      `Error updating frequency array in ${filePath}:`,
      error.message
    );
    return false;
  }
}

// Function to sort entries by frequency (if available) or by creation date
function sortEntriesByFrequency(entries) {
  return entries.sort((a, b) => {
    const entryA = a[1];
    const entryB = b[1];

    // First sort by frequency rank (lower is more frequent)
    if (entryA.frequency?.rank && entryB.frequency?.rank) {
      return entryA.frequency.rank - entryB.frequency.rank;
    }

    // Then by frequency score (higher is more frequent)
    if (entryA.frequency?.score && entryB.frequency?.score) {
      return entryB.frequency.score - entryA.frequency.score;
    }

    // Then by CEFR level (A1 first, then A2, B1, B2, C1, C2)
    const cefrOrder = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
    const levelA = cefrOrder[entryA.cefr_level] || 7;
    const levelB = cefrOrder[entryB.cefr_level] || 7;
    if (levelA !== levelB) {
      return levelA - levelB;
    }

    // Finally by creation date (older first)
    if (entryA.created_at && entryB.created_at) {
      return new Date(entryA.created_at) - new Date(entryB.created_at);
    }

    // Last resort: alphabetical by word
    return entryA.word.localeCompare(entryB.word);
  });
}

console.log("=== REGENERATING FREQUENCY ARRAYS ===");
console.log(
  "Updating all *ByFrequency arrays to match current dictionary contents...\n"
);

let totalProcessed = 0;
let totalUpdated = 0;

for (const fileName of dictionaryFiles) {
  const filePath = path.join(__dirname, "src/data/dictionary/words", fileName);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${fileName}`);
    continue;
  }

  console.log(`\n--- Processing ${fileName} ---`);

  const parseResult = parseDictionaryFile(filePath);
  if (!parseResult) {
    console.log(`❌ Failed to parse ${fileName}`);
    continue;
  }

  const { entries } = parseResult;
  console.log(`Found ${entries.length} entries`);

  if (entries.length === 0) {
    console.log(`⚠️  No entries found in ${fileName}`);
    continue;
  }

  // Sort entries by frequency/importance
  const sortedEntries = sortEntriesByFrequency(entries);

  // Extract IDs in frequency order
  const frequencyArray = sortedEntries.map((entry) => entry[0]);

  // Update the frequency array in the file
  if (updateFrequencyArray(filePath, frequencyArray)) {
    console.log(
      `✅ Updated frequency array with ${frequencyArray.length} entries`
    );
    totalUpdated++;
  } else {
    console.log(`❌ Failed to update frequency array`);
  }

  totalProcessed++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files processed: ${totalProcessed}`);
console.log(`Files updated: ${totalUpdated}`);
console.log(`Files failed: ${totalProcessed - totalUpdated}`);

console.log(`\n=== FREQUENCY ARRAYS REGENERATED ===`);
console.log("All *ByFrequency arrays now match current dictionary contents!");
