#!/usr/bin/env node

/**
 * Complete verb migration script
 * Processes ALL verbs from target-list.js across ALL dictionary files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the verbs list from target-list.js
import { verbs } from "./target-list.js";

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

// Function to add entry to verbs.js
function addEntryToVerbs(entry) {
  const verbsPath = path.join(__dirname, "src/data/dictionary/words/verbs.js");

  try {
    const parseResult = parseDictionaryFile(verbsPath);
    if (!parseResult) {
      console.log("❌ Failed to parse verbs.js");
      return false;
    }

    const { entries, originalContent, mapMatch } = parseResult;

    // Update partOfSpeech to "verb"
    entry[1].partOfSpeech = "verb";
    entry[1].updated_at = new Date().toISOString();

    // Add to entries
    const updatedEntries = [...entries, entry];

    // Generate new content
    const mapContent = `[${mapMatch[1]}]`;
    const originalEntries = eval(mapContent);

    const headerMatch = originalContent.match(
      /^([\s\S]*?)export const \w+ = new Map\(/
    );
    const header = headerMatch ? headerMatch[1] : "";

    const footerMatch = originalContent.match(
      /export const \w+ = new Map\(\[[\s\S]*?\]\);\s*([\s\S]*)$/
    );
    const footer = footerMatch ? footerMatch[1] : "";

    const varMatch = originalContent.match(/export const (\w+) = new Map/);
    const varName = varMatch ? varMatch[1] : "verbs";

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
    fs.writeFileSync(verbsPath, newContent);
    return true;
  } catch (error) {
    console.error(`Error adding to verbs.js:`, error.message);
    return false;
  }
}

// Function to update target-list.js to remove processed verbs
function updateTargetList(processedVerbs) {
  const targetListPath = path.join(__dirname, "target-list.js");

  try {
    const content = fs.readFileSync(targetListPath, "utf8");

    // Remove processed verbs from the verbs array
    const remainingVerbs = verbs.filter(
      (verb) => !processedVerbs.includes(verb)
    );

    // Update the verbs array in the file
    const updatedContent = content.replace(
      /const verbs = \[[\s\S]*?\];/,
      `const verbs = [\n  ${remainingVerbs
        .map((v) => `"${v}"`)
        .join(",\n  ")}\n];`
    );

    // Update summary statistics
    const newTotalMisclassified = 245 - processedVerbs.length; // Adjust based on your current total
    const newTotalWords = 550 - processedVerbs.length;
    const newMisclassificationRate = (
      (newTotalMisclassified / newTotalWords) *
      100
    ).toFixed(1);

    const finalContent = updatedContent
      .replace(
        /totalMisclassified: \d+/,
        `totalMisclassified: ${newTotalMisclassified}`
      )
      .replace(/totalWords: \d+/, `totalWords: ${newTotalWords}`)
      .replace(
        /misclassificationRate: [\d.]+/,
        `misclassificationRate: ${newMisclassificationRate}`
      );

    fs.writeFileSync(targetListPath, finalContent);
    return true;
  } catch (error) {
    console.error(`Error updating target-list.js:`, error.message);
    return false;
  }
}

console.log("=== COMPLETE VERB MIGRATION SCRIPT ===");
console.log(`Processing ${verbs.length} verbs from target-list.js`);
console.log(`Searching in ${dictionaryFiles.length} dictionary files\n`);

const processedVerbs = [];
const migrationLog = [];

// Process each verb
for (let i = 0; i < verbs.length; i++) {
  const verb = verbs[i];
  console.log(`\n--- Processing verb ${i + 1}/${verbs.length}: "${verb}" ---`);

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
        const entry = findWordInEntries(entries, verb);

        if (entry) {
          console.log(`✅ Found "${verb}" in ${fileName}`);
          found = true;
          sourceFile = filePath;

          // Update partOfSpeech to "verb"
          entry[1].partOfSpeech = "verb";
          entry[1].updated_at = new Date().toISOString();

          // Add to verbs.js
          if (addEntryToVerbs(entry)) {
            console.log(`✅ Added "${verb}" to verbs.js`);

            // Remove from source file
            const newContent = removeWordAndGenerateContent(
              parseResult.originalContent,
              parseResult.mapMatch,
              verb
            );

            fs.writeFileSync(sourceFile, newContent);
            console.log(`✅ Removed "${verb}" from ${fileName}`);

            // Log the migration
            migrationLog.push({
              verb,
              sourceFile: fileName,
              status: "migrated",
            });

            processedVerbs.push(verb);
          }

          break; // Found and processed, move to next verb
        }
      }
    }
  }

  if (!found) {
    console.log(`❌ "${verb}" not found in any dictionary file`);
    migrationLog.push({
      verb,
      sourceFile: "none",
      status: "not_found",
    });
  }
}

// Update target-list.js
console.log(`\n=== UPDATING TARGET LIST ===`);
if (updateTargetList(processedVerbs)) {
  console.log(
    `✅ Removed ${processedVerbs.length} processed verbs from target-list.js`
  );
} else {
  console.log(`❌ Failed to update target-list.js`);
}

// Summary
console.log(`\n=== MIGRATION SUMMARY ===`);
console.log(`Total verbs processed: ${verbs.length}`);
console.log(`Successfully migrated: ${processedVerbs.length}`);
console.log(`Not found: ${verbs.length - processedVerbs.length}`);

console.log(`\n=== MIGRATED VERBS ===`);
processedVerbs.forEach((verb, index) => {
  console.log(`${index + 1}. ${verb}`);
});

console.log(`\n=== MIGRATION LOG ===`);
migrationLog.forEach((log, index) => {
  console.log(`${index + 1}. ${log.verb} - ${log.sourceFile} - ${log.status}`);
});

console.log(`\n=== MIGRATION COMPLETE ===`);
