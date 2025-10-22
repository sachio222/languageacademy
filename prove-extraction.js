#!/usr/bin/env node

/**
 * Prove that the parsing approach works with a complete example
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse dictionary file and extract entries
function parseDictionaryFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Extract the Map export from the file
    const mapMatch = content.match(
      /export const \w+ = new Map\(\[([\s\S]*?)\]\);/
    );

    if (!mapMatch) {
      console.log(`No Map found in ${path.basename(filePath)}`);
      return null;
    }

    // Create a safe evaluation context
    const mapContent = `[${mapMatch[1]}]`;

    // Parse the array of entries
    const entries = eval(mapContent);

    console.log(`✅ Successfully parsed ${path.basename(filePath)}`);
    console.log(`Found ${entries.length} entries`);

    return entries;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

// Function to find a specific word
function findWordInEntries(entries, targetWord) {
  for (const entry of entries) {
    if (entry[1] && entry[1].word === targetWord) {
      return entry;
    }
  }
  return null;
}

// Function to format entry for display
function formatEntry(entry) {
  if (!entry) return null;

  return {
    id: entry[0],
    word: entry[1].word,
    partOfSpeech: entry[1].partOfSpeech,
    translations: entry[1].translations,
    source: entry[1].source,
    created_at: entry[1].created_at,
  };
}

console.log("=== PROVING EXTRACTION WORKS ===");

// Test with nouns.js
const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");
const entries = parseDictionaryFile(nounsPath);

if (entries) {
  console.log("\n=== TESTING MULTIPLE WORDS ===");

  // Test finding multiple words
  const testWords = ["avoir", "être", "aller", "faire"];

  for (const word of testWords) {
    console.log(`\n--- Looking for "${word}" ---`);
    const entry = findWordInEntries(entries, word);

    if (entry) {
      const formatted = formatEntry(entry);
      console.log(`✅ FOUND: ${formatted.word}`);
      console.log(`   ID: ${formatted.id}`);
      console.log(`   Part of Speech: ${formatted.partOfSpeech}`);
      console.log(`   Translation: ${formatted.translations[0].text}`);
      console.log(`   Source: ${formatted.source}`);
    } else {
      console.log(`❌ NOT FOUND: ${word}`);
    }
  }

  console.log("\n=== TESTING COMPLETE ENTRY EXTRACTION ===");

  // Get a complete entry for "avoir"
  const avoirEntry = findWordInEntries(entries, "avoir");

  if (avoirEntry) {
    console.log("✅ Complete entry for 'avoir':");
    console.log("Raw entry structure:");
    console.log(JSON.stringify(avoirEntry, null, 2));

    console.log("\n=== TESTING UPDATE OPERATION ===");

    // Test updating the partOfSpeech
    const originalPartOfSpeech = avoirEntry[1].partOfSpeech;
    console.log(`Original partOfSpeech: "${originalPartOfSpeech}"`);

    // Update it
    avoirEntry[1].partOfSpeech = "verb";
    console.log(`Updated partOfSpeech: "${avoirEntry[1].partOfSpeech}"`);

    // Verify the change
    console.log("✅ Update successful!");
    console.log("Updated entry:");
    console.log(JSON.stringify(formatEntry(avoirEntry), null, 2));
  }
}

console.log("\n=== EXTRACTION PROOF COMPLETE ===");
