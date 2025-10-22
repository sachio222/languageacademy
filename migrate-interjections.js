#!/usr/bin/env node

/**
 * Targeted migration script for interjections
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import interjections from target-list.js
import { interjections } from "./target-list.js";

// All dictionary files to check
const dictionaryFiles = [
  "nouns.js",
  "adjectives.js",
  "articles.js",
  "adverbs.js",
  "conjunctions.js",
  "prepositions.js",
  "pronouns.js",
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

// Function to find a word in entries
function findWordInEntries(entries, targetWord) {
  for (const entry of entries) {
    if (entry[1] && entry[1].word === targetWord) {
      return entry;
    }
  }
  return null;
}

// Function to remove word and generate new content
function removeWordAndGenerateContent(originalContent, mapMatch, targetWord) {
  const mapContent = `[${mapMatch[1]}]`;
  const entries = eval(mapContent);

  const filteredEntries = entries.filter(
    (entry) => entry[1].word !== targetWord
  );

  // Extract header and footer
  const headerMatch = originalContent.match(
    /^([\s\S]*?)export const \w+ = new Map\(/
  );
  const header = headerMatch ? headerMatch[1] : "";

  const footerMatch = originalContent.match(
    /export const \w+ = new Map\(\[[\s\S]*?\]\);\s*([\s\S]*)$/
  );
  const footer = footerMatch ? footerMatch[1] : "";

  const varMatch = originalContent.match(/export const (\w+) = new Map/);
  const varName = varMatch ? varMatch[1] : "nouns";

  // Generate new entries
  const entriesString = filteredEntries
    .map((entry) => {
      const [id, data] = entry;
      return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
        /^/gm,
        "    "
      )}\n  ]`;
    })
    .join(",\n");

  // Update total entries count in header
  const updatedHeader = header.replace(
    /Total entries: \d+/,
    `Total entries: ${filteredEntries.length}`
  );

  // Combine everything
  const newContent = `${updatedHeader}export const ${varName} = new Map([\n${entriesString}\n]);\n${footer}`;

  return newContent;
}

// Function to add entry to interjections.js
function addEntryToInterjections(entry) {
  const interjectionsPath = path.join(
    __dirname,
    "src/data/dictionary/words/interjections.js"
  );

  try {
    const parseResult = parseDictionaryFile(interjectionsPath);
    if (!parseResult) {
      console.log(`❌ Failed to parse interjections.js`);
      return false;
    }

    const { entries, originalContent, mapMatch } = parseResult;

    // Update partOfSpeech
    entry[1].partOfSpeech = "interjection";
    entry[1].updated_at = new Date().toISOString();

    // Add to entries
    const updatedEntries = [...entries, entry];

    // Generate new content
    const headerMatch = originalContent.match(
      /^([\s\S]*?)export const \w+ = new Map\(/
    );
    const header = headerMatch ? headerMatch[1] : "";

    const footerMatch = originalContent.match(
      /export const \w+ = new Map\(\[[\s\S]*?\]\);\s*([\s\S]*)$/
    );
    const footer = footerMatch ? footerMatch[1] : "";

    const varMatch = originalContent.match(/export const (\w+) = new Map/);
    const varName = varMatch ? varMatch[1] : "interjections";

    const entriesString = updatedEntries
      .map((entry) => {
        const [id, data] = entry;
        return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
          /^/gm,
          "    "
        )}\n  ]`;
      })
      .join(",\n");

    const updatedHeader = header.replace(
      /Total entries: \d+/,
      `Total entries: ${updatedEntries.length}`
    );
    const newContent = `${updatedHeader}export const ${varName} = new Map([\n${entriesString}\n]);\n${footer}`;

    // Write to file
    fs.writeFileSync(interjectionsPath, newContent);
    return true;
  } catch (error) {
    console.error(`Error adding to interjections.js:`, error.message);
    return false;
  }
}

// Function to update target-list.js to remove processed words
function updateTargetList(processedWords) {
  const targetListPath = path.join(__dirname, "target-list.js");

  try {
    const content = fs.readFileSync(targetListPath, "utf8");

    // Remove processed words from the interjections array
    const remainingWords = interjections.filter(
      (word) => !processedWords.includes(word)
    );

    // Update the interjections array in the file
    const arrayRegex = /const interjections = \[[\s\S]*?\];/g;
    const updatedContent = content.replace(
      arrayRegex,
      `const interjections = [\n  ${remainingWords
        .map((w) => `"${w}"`)
        .join(",\n  ")}\n];`
    );

    fs.writeFileSync(targetListPath, updatedContent);
    return true;
  } catch (error) {
    console.error(`Error updating target-list.js:`, error.message);
    return false;
  }
}

console.log("=== MIGRATING INTERJECTIONS ===");
console.log(`Processing ${interjections.length} interjections...\n`);

const processedWords = [];
const migrationLog = [];

for (let i = 0; i < interjections.length; i++) {
  const word = interjections[i];
  console.log(
    `\n--- Processing interjection ${i + 1}/${
      interjections.length
    }: "${word}" ---`
  );

  let found = false;
  let sourceFile = null;

  // Search in each dictionary file
  for (const fileName of dictionaryFiles) {
    const filePath = path.join(
      __dirname,
      "src/data/dictionary/words",
      fileName
    );

    if (fs.existsSync(filePath)) {
      const parseResult = parseDictionaryFile(filePath);

      if (parseResult) {
        const { entries } = parseResult;
        const entry = findWordInEntries(entries, word);

        if (entry) {
          console.log(`✅ Found "${word}" in ${fileName}`);
          found = true;
          sourceFile = filePath;

          // Add to interjections.js
          if (addEntryToInterjections(entry)) {
            console.log(`✅ Added "${word}" to interjections.js`);

            // Remove from source file
            const newContent = removeWordAndGenerateContent(
              parseResult.originalContent,
              parseResult.mapMatch,
              word
            );

            fs.writeFileSync(sourceFile, newContent);
            console.log(`✅ Removed "${word}" from ${fileName}`);

            // Log the migration
            migrationLog.push({
              word,
              sourceFile: fileName,
              status: "migrated",
            });

            processedWords.push(word);
          }

          break; // Found and processed, move to next word
        }
      }
    }
  }

  if (!found) {
    console.log(`❌ "${word}" not found in any dictionary file`);
    migrationLog.push({
      word,
      sourceFile: "none",
      status: "not_found",
    });
  }
}

// Update target-list.js
if (updateTargetList(processedWords)) {
  console.log(
    `✅ Removed ${processedWords.length} processed interjections from target-list.js`
  );
}

// Summary
console.log(`\n=== INTERJECTIONS MIGRATION SUMMARY ===`);
console.log(`Total interjections processed: ${interjections.length}`);
console.log(`Successfully migrated: ${processedWords.length}`);
console.log(`Not found: ${interjections.length - processedWords.length}`);

console.log(`\n=== MIGRATED INTERJECTIONS ===`);
migrationLog
  .filter((log) => log.status === "migrated")
  .forEach((log, index) => {
    console.log(`${index + 1}. ${log.word}`);
  });

console.log(`\n=== MIGRATION COMPLETE ===`);
