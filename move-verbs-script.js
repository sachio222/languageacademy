#!/usr/bin/env node

/**
 * Script to move misplaced verbs from other dictionary files to verbs.js
 * Processes one verb at a time from target-list.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the verbs list from target-list.js
import { verbs } from "./target-list.js";

// Get the first verb to process
const firstVerb = verbs[0];
console.log(`Processing first verb: "${firstVerb}"`);

// Dictionary files to check (excluding verbs.js since we're moving TO it)
const dictionaryFiles = [
  "nouns.js",
  "adjectives.js",
  "articles.js",
  "adverbs.js",
  "conjunctions.js",
  "prepositions.js",
  "pronouns.js",
];

// Function to find and extract a word from a dictionary file
function findAndExtractWord(filePath, targetWord) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Look for the word in the file content
    const wordRegex = new RegExp(`"word":\\s*"${targetWord}"`, "g");
    const matches = content.match(wordRegex);

    if (!matches || matches.length === 0) {
      console.log(
        `Word "${targetWord}" not found in ${path.basename(filePath)}`
      );
      return null;
    }

    console.log(`Found "${targetWord}" in ${path.basename(filePath)}`);

    // Extract the full entry using regex
    // This is a simplified approach - in practice we'd need more robust parsing
    const entryRegex = new RegExp(
      `\\[\\s*"([^"]*${targetWord}[^"]*)"\\s*,\\s*\\{[\\s\\S]*?\\}\\s*\\]`,
      "g"
    );

    const entryMatch = content.match(entryRegex);
    if (entryMatch) {
      console.log(`Found entry for "${targetWord}"`);
      return {
        found: true,
        entry: entryMatch[0],
        content: content,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Function to update partOfSpeech to "verb"
function updatePartOfSpeech(entry) {
  // Replace partOfSpeech field with "verb"
  return entry.replace(/"partOfSpeech":\s*"[^"]*"/, '"partOfSpeech": "verb"');
}

// Function to add entry to verbs.js
function addToVerbsFile(entry) {
  const verbsPath = path.join(__dirname, "src/data/dictionary/words/verbs.js");

  try {
    let content = fs.readFileSync(verbsPath, "utf8");

    // Find the end of the Map entries (before the closing bracket)
    const mapEndRegex = /(\s*\]\s*\)\s*;)/;
    const match = content.match(mapEndRegex);

    if (match) {
      // Insert the new entry before the closing bracket
      const newContent = content.replace(
        mapEndRegex,
        `,\n  ${entry}\n${match[1]}`
      );

      // Update the total entries count
      const countMatch = content.match(/Total entries: (\d+)/);
      if (countMatch) {
        const newCount = parseInt(countMatch[1]) + 1;
        const updatedContent = newContent.replace(
          /Total entries: \d+/,
          `Total entries: ${newCount}`
        );

        fs.writeFileSync(verbsPath, updatedContent);
        console.log(`Added "${firstVerb}" to verbs.js`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error updating verbs.js:`, error.message);
    return false;
  }
}

// Function to remove entry from source file
function removeFromSourceFile(filePath, targetWord) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Remove the entire entry
    const entryRegex = new RegExp(
      `\\[\\s*"([^"]*${targetWord}[^"]*)"\\s*,\\s*\\{[\\s\\S]*?\\}\\s*\\],?\\s*`,
      "g"
    );

    const newContent = content.replace(entryRegex, "");

    // Update the total entries count
    const countMatch = content.match(/Total entries: (\d+)/);
    if (countMatch) {
      const newCount = parseInt(countMatch[1]) - 1;
      const updatedContent = newContent.replace(
        /Total entries: \d+/,
        `Total entries: ${newCount}`
      );

      fs.writeFileSync(filePath, updatedContent);
      console.log(`Removed "${targetWord}" from ${path.basename(filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main processing logic
console.log("=== VERB MIGRATION SCRIPT ===");
console.log(`Target verb: "${firstVerb}"`);
console.log("Checking dictionary files...\n");

let found = false;
let sourceFile = null;

// Check each dictionary file
for (const fileName of dictionaryFiles) {
  const filePath = path.join(__dirname, "src/data/dictionary/words", fileName);

  if (fs.existsSync(filePath)) {
    const result = findAndExtractWord(filePath, firstVerb);

    if (result && result.found) {
      console.log(`✓ Found "${firstVerb}" in ${fileName}`);
      found = true;
      sourceFile = filePath;

      // Update partOfSpeech to "verb"
      const updatedEntry = updatePartOfSpeech(result.entry);
      console.log("Updated partOfSpeech to 'verb'");

      // Add to verbs.js
      if (addToVerbsFile(updatedEntry)) {
        console.log("✓ Added to verbs.js");

        // Remove from source file
        if (removeFromSourceFile(sourceFile, firstVerb)) {
          console.log("✓ Removed from source file");

          // Remove from target list (this would be done in a separate step)
          console.log("✓ Should remove from target list");
        }
      }

      break; // Found and processed, exit loop
    }
  }
}

if (!found) {
  console.log(`✗ Word "${firstVerb}" not found in any dictionary file`);
}

console.log("\n=== PROCESSING COMPLETE ===");
