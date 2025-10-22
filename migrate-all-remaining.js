#!/usr/bin/env node

/**
 * Complete migration script for ALL remaining target-list arrays
 * Migrates: adjectives, adverbs, interjections, pronouns, prepositions, conjunctions, interrogativeWords, alphabet
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import all arrays from target-list.js
import {
  adjectives,
  adverbs,
  interjections,
  pronouns,
  prepositions,
  conjunctions,
  interrogativeWords,
  alphabet,
} from "./target-list.js";

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

// Function to add entry to target file
function addEntryToFile(entry, targetFile, partOfSpeech) {
  const targetPath = path.join(
    __dirname,
    "src/data/dictionary/words",
    targetFile
  );

  try {
    const parseResult = parseDictionaryFile(targetPath);
    if (!parseResult) {
      console.log(`❌ Failed to parse ${targetFile}`);
      return false;
    }

    const { entries, originalContent, mapMatch } = parseResult;

    // Update partOfSpeech
    entry[1].partOfSpeech = partOfSpeech;
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
    const varName = varMatch ? varMatch[1] : targetFile.replace(".js", "");

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
    fs.writeFileSync(targetPath, newContent);
    return true;
  } catch (error) {
    console.error(`Error adding to ${targetFile}:`, error.message);
    return false;
  }
}

// Function to create new file for alphabet
function createAlphabetFile(entries) {
  const alphabetPath = path.join(
    __dirname,
    "src/data/dictionary/words/alphabet.js"
  );

  const header = `/**
 * Alphabet Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${entries.length}
 */

export const alphabet = new Map([`;

  const footer = `]);

// Frequency-ordered array for priority loading
export const alphabetByFrequency = [${entries
    .map((entry) => `"${entry[0]}"`)
    .join(", ")}];

export default alphabet;`;

  const entriesString = entries
    .map((entry) => {
      const [id, data] = entry;
      return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
        /^/gm,
        "    "
      )}\n  ]`;
    })
    .join(",\n");

  const content = `${header}\n${entriesString}\n${footer}`;
  fs.writeFileSync(alphabetPath, content);
  return true;
}

// Function to create new file for interrogatives
function createInterrogativesFile(entries) {
  const interrogativesPath = path.join(
    __dirname,
    "src/data/dictionary/words/interrogatives.js"
  );

  const header = `/**
 * Interrogatives Dictionary
 * Auto-generated from vocabulary extraction
 * Total entries: ${entries.length}
 */

export const interrogatives = new Map([`;

  const footer = `]);

// Frequency-ordered array for priority loading
export const interrogativesByFrequency = [${entries
    .map((entry) => `"${entry[0]}"`)
    .join(", ")}];

export default interrogatives;`;

  const entriesString = entries
    .map((entry) => {
      const [id, data] = entry;
      return `  [\n    "${id}",\n    ${JSON.stringify(data, null, 4).replace(
        /^/gm,
        "    "
      )}\n  ]`;
    })
    .join(",\n");

  const content = `${header}\n${entriesString}\n${footer}`;
  fs.writeFileSync(interrogativesPath, content);
  return true;
}

// Function to update target-list.js to remove processed words
function updateTargetList(processedWords, category) {
  const targetListPath = path.join(__dirname, "target-list.js");

  try {
    const content = fs.readFileSync(targetListPath, "utf8");

    // Remove processed words from the specific array
    const remainingWords = eval(category).filter(
      (word) => !processedWords.includes(word)
    );

    // Update the specific array in the file
    const arrayRegex = new RegExp(`const ${category} = \\[[\\s\\S]*?\\];`, "g");
    const updatedContent = content.replace(
      arrayRegex,
      `const ${category} = [\n  ${remainingWords
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

// Main migration function
function migrateCategory(words, targetFile, partOfSpeech, categoryName) {
  console.log(`\n=== MIGRATING ${categoryName.toUpperCase()} ===`);
  console.log(`Processing ${words.length} ${categoryName}...`);

  const processedWords = [];
  const migrationLog = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    console.log(
      `\n--- Processing ${categoryName} ${i + 1}/${words.length}: "${word}" ---`
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

            // Add to target file
            if (addEntryToFile(entry, targetFile, partOfSpeech)) {
              console.log(`✅ Added "${word}" to ${targetFile}`);

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
  if (updateTargetList(processedWords, categoryName)) {
    console.log(
      `✅ Removed ${processedWords.length} processed ${categoryName} from target-list.js`
    );
  }

  // Summary
  console.log(`\n=== ${categoryName.toUpperCase()} MIGRATION SUMMARY ===`);
  console.log(`Total ${categoryName} processed: ${words.length}`);
  console.log(`Successfully migrated: ${processedWords.length}`);
  console.log(`Not found: ${words.length - processedWords.length}`);

  return { processedWords, migrationLog };
}

console.log("=== COMPLETE REMAINING MIGRATION SCRIPT ===");
console.log("Processing ALL remaining target-list arrays...\n");

// Migrate each category
const results = {};

// 1. Adjectives
results.adjectives = migrateCategory(
  adjectives,
  "adjectives.js",
  "adjective",
  "adjectives"
);

// 2. Adverbs
results.adverbs = migrateCategory(adverbs, "adverbs.js", "adverb", "adverbs");

// 3. Interjections
results.interjections = migrateCategory(
  interjections,
  "interjections.js",
  "interjection",
  "interjections"
);

// 4. Pronouns
results.pronouns = migrateCategory(
  pronouns,
  "pronouns.js",
  "pronoun",
  "pronouns"
);

// 5. Prepositions
results.prepositions = migrateCategory(
  prepositions,
  "prepositions.js",
  "preposition",
  "prepositions"
);

// 6. Conjunctions
results.conjunctions = migrateCategory(
  conjunctions,
  "conjunctions.js",
  "conjunction",
  "conjunctions"
);

// 7. Interrogative Words (create new file)
console.log("\n=== MIGRATING INTERROGATIVE WORDS ===");
console.log(`Processing ${interrogativeWords.length} interrogative words...`);

const interrogativeEntries = [];
for (const word of interrogativeWords) {
  // Find the word in dictionary files
  let found = false;
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

          // Update partOfSpeech
          entry[1].partOfSpeech = "interrogative";
          entry[1].updated_at = new Date().toISOString();

          interrogativeEntries.push(entry);

          // Remove from source file
          const newContent = removeWordAndGenerateContent(
            parseResult.originalContent,
            parseResult.mapMatch,
            word
          );

          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Removed "${word}" from ${fileName}`);

          break;
        }
      }
    }
  }

  if (!found) {
    console.log(`❌ "${word}" not found in any dictionary file`);
  }
}

// Create interrogatives.js file
if (interrogativeEntries.length > 0) {
  createInterrogativesFile(interrogativeEntries);
  console.log(
    `✅ Created interrogatives.js with ${interrogativeEntries.length} entries`
  );
}

// 8. Alphabet (create new file)
console.log("\n=== MIGRATING ALPHABET ===");
console.log(`Processing ${alphabet.length} alphabet letters...`);

const alphabetEntries = [];
for (const letter of alphabet) {
  // Find the letter in dictionary files
  let found = false;
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
        const entry = findWordInEntries(entries, letter);

        if (entry) {
          console.log(`✅ Found "${letter}" in ${fileName}`);
          found = true;

          // Update partOfSpeech
          entry[1].partOfSpeech = "alphabet";
          entry[1].updated_at = new Date().toISOString();

          alphabetEntries.push(entry);

          // Remove from source file
          const newContent = removeWordAndGenerateContent(
            parseResult.originalContent,
            parseResult.mapMatch,
            letter
          );

          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Removed "${letter}" from ${fileName}`);

          break;
        }
      }
    }
  }

  if (!found) {
    console.log(`❌ "${letter}" not found in any dictionary file`);
  }
}

// Create alphabet.js file
if (alphabetEntries.length > 0) {
  createAlphabetFile(alphabetEntries);
  console.log(`✅ Created alphabet.js with ${alphabetEntries.length} entries`);
}

console.log("\n=== COMPLETE MIGRATION SUMMARY ===");
console.log("All target-list arrays have been processed!");
console.log("Files created/updated:");
console.log("- adjectives.js (updated)");
console.log("- adverbs.js (updated)");
console.log("- interjections.js (updated)");
console.log("- pronouns.js (updated)");
console.log("- prepositions.js (updated)");
console.log("- conjunctions.js (updated)");
console.log("- interrogatives.js (created)");
console.log("- alphabet.js (created)");
console.log("- target-list.js (updated)");

console.log("\n=== MIGRATION COMPLETE ===");
