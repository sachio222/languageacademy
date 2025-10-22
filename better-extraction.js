#!/usr/bin/env node

/**
 * Better approach: Parse the JavaScript Map structure properly
 * Instead of regex, we'll evaluate the JavaScript code to get the actual Map
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to safely evaluate a dictionary file and extract the Map
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

// Function to find a specific word in the parsed entries
function findWordInEntries(entries, targetWord) {
  for (const entry of entries) {
    if (entry[1] && entry[1].word === targetWord) {
      console.log(`✅ Found "${targetWord}" in entries`);
      console.log(`Current partOfSpeech: "${entry[1].partOfSpeech}"`);
      return entry;
    }
  }
  return null;
}

// Function to update partOfSpeech
function updatePartOfSpeech(entry) {
  if (entry && entry[1]) {
    entry[1].partOfSpeech = "verb";
    console.log(`✅ Updated partOfSpeech to "verb"`);
    return entry;
  }
  return null;
}

// Test with nouns.js
console.log("=== TESTING PROPER PARSING ===");

const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");
const entries = parseDictionaryFile(nounsPath);

if (entries) {
  // Look for "avoir"
  const avoirEntry = findWordInEntries(entries, "avoir");

  if (avoirEntry) {
    console.log("\n=== FOUND ENTRY ===");
    console.log("ID:", avoirEntry[0]);
    console.log("Word:", avoirEntry[1].word);
    console.log("Current partOfSpeech:", avoirEntry[1].partOfSpeech);
    console.log("Source:", avoirEntry[1].source);

    // Update it
    const updatedEntry = updatePartOfSpeech(avoirEntry);

    if (updatedEntry) {
      console.log("\n=== UPDATED ENTRY ===");
      console.log("New partOfSpeech:", updatedEntry[1].partOfSpeech);

      // Show the complete entry structure
      console.log("\n=== COMPLETE ENTRY STRUCTURE ===");
      console.log(JSON.stringify(updatedEntry, null, 2));
    }
  } else {
    console.log("❌ Word 'avoir' not found in entries");
  }
}

console.log("\n=== PARSING TEST COMPLETE ===");
