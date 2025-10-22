#!/usr/bin/env node

/**
 * Deduplicate Frequency Arrays Script
 * Removes duplicate entries from frequency arrays while preserving order
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

// Function to deduplicate frequency array
function deduplicateFrequencyArray(frequencyArray) {
  const seen = new Set();
  const deduplicated = [];

  for (const item of frequencyArray) {
    if (!seen.has(item)) {
      seen.add(item);
      deduplicated.push(item);
    }
  }

  return deduplicated;
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

console.log("=== DEDUPLICATING FREQUENCY ARRAYS ===");
console.log("Removing duplicate entries from frequency arrays...\n");

let totalProcessed = 0;
let totalUpdated = 0;
let totalDuplicatesRemoved = 0;

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

  const { entries, originalContent } = parseResult;

  // Extract current frequency array
  const varName = path.basename(filePath, ".js");
  const frequencyMatch = originalContent.match(
    new RegExp(`export const ${varName}ByFrequency = \\[([\\s\\S]*?)\\];`)
  );

  if (!frequencyMatch) {
    console.log(`⚠️  No frequency array found in ${fileName}`);
    continue;
  }

  // Parse current frequency array
  const currentFrequencyString = `[${frequencyMatch[1]}]`;
  const currentFrequencyArray = eval(currentFrequencyString);

  console.log(
    `Original frequency array length: ${currentFrequencyArray.length}`
  );

  // Deduplicate
  const deduplicatedArray = deduplicateFrequencyArray(currentFrequencyArray);
  const duplicatesRemoved =
    currentFrequencyArray.length - deduplicatedArray.length;

  console.log(
    `Deduplicated frequency array length: ${deduplicatedArray.length}`
  );
  console.log(`Duplicates removed: ${duplicatesRemoved}`);

  // Update the frequency array in the file
  if (updateFrequencyArray(filePath, deduplicatedArray)) {
    console.log(`✅ Updated frequency array in ${fileName}`);
    totalUpdated++;
    totalDuplicatesRemoved += duplicatesRemoved;
  } else {
    console.log(`❌ Failed to update frequency array in ${fileName}`);
  }

  totalProcessed++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files processed: ${totalProcessed}`);
console.log(`Files updated: ${totalUpdated}`);
console.log(`Total duplicates removed: ${totalDuplicatesRemoved}`);

console.log(`\n=== FREQUENCY ARRAYS DEDUPLICATED ===`);
console.log("All frequency arrays now contain unique entries!");
