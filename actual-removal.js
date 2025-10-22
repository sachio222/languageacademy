#!/usr/bin/env node

/**
 * ACTUAL removal of 'avoir' from nouns.js
 * This will modify the file and show the proof
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Function to remove word and generate new content
function removeWordAndGenerateContent(originalContent, mapMatch, targetWord) {
  // Parse entries
  const mapContent = `[${mapMatch[1]}]`;
  const entries = eval(mapContent);

  // Remove target word
  const filteredEntries = entries.filter(
    (entry) => entry[1].word !== targetWord
  );

  console.log(`Removed ${entries.length - filteredEntries.length} entries`);

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

console.log("=== ACTUAL REMOVAL OF 'AVOIR' FROM NOUNS.JS ===");

// Step 1: Parse nouns.js
console.log("STEP 1: Parsing nouns.js...");
const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");
const parseResult = parseDictionaryFile(nounsPath);

if (!parseResult) {
  console.log("❌ Failed to parse nouns.js");
  process.exit(1);
}

const { entries, originalContent, mapMatch } = parseResult;
console.log(`✅ Parsed nouns.js - Found ${entries.length} entries`);

// Check if avoir exists
const avoirExists = entries.some((entry) => entry[1].word === "avoir");
console.log(`'avoir' exists: ${avoirExists ? "YES" : "NO"}`);

if (!avoirExists) {
  console.log("❌ 'avoir' not found in nouns.js");
  process.exit(1);
}

// Step 2: Generate new content without avoir
console.log("\nSTEP 2: Generating new content without 'avoir'...");
const newContent = removeWordAndGenerateContent(
  originalContent,
  mapMatch,
  "avoir"
);

console.log(`✅ New content generated`);
console.log(`  Original size: ${originalContent.length} characters`);
console.log(`  New size: ${newContent.length} characters`);

// Step 3: Validate new content
console.log("\nSTEP 3: Validating new content...");
try {
  const newMapMatch = newContent.match(
    /export const \w+ = new Map\(\[([\s\S]*?)\]\);/
  );
  if (newMapMatch) {
    const newMapContent = `[${newMapMatch[1]}]`;
    const newEntries = eval(newMapContent);
    console.log(`✅ New content is valid JavaScript`);
    console.log(
      `✅ New entries: ${newEntries.length} (down from ${entries.length})`
    );

    const avoirInNew = newEntries.some((entry) => entry[1].word === "avoir");
    console.log(`✅ 'avoir' removed: ${!avoirInNew ? "YES" : "NO"}`);
  }
} catch (error) {
  console.log(`❌ Validation failed: ${error.message}`);
  process.exit(1);
}

// Step 4: Create backup
console.log("\nSTEP 4: Creating backup...");
const backupPath = path.join(__dirname, "nouns-backup.js");
fs.writeFileSync(backupPath, originalContent);
console.log(`✅ Backup created: ${backupPath}`);

// Step 5: Write new content to file
console.log("\nSTEP 5: Writing new content to nouns.js...");
fs.writeFileSync(nounsPath, newContent);
console.log(`✅ nouns.js updated successfully`);

// Step 6: Verify the change
console.log("\nSTEP 6: Verifying the change...");
const verifyResult = parseDictionaryFile(nounsPath);
if (verifyResult) {
  const verifyEntries = verifyResult.entries;
  const avoirStillExists = verifyEntries.some(
    (entry) => entry[1].word === "avoir"
  );

  console.log(`✅ Verification complete:`);
  console.log(`  Entries before: ${entries.length}`);
  console.log(`  Entries after: ${verifyEntries.length}`);
  console.log(`  'avoir' still exists: ${avoirStillExists ? "YES" : "NO"}`);

  if (!avoirStillExists) {
    console.log("\n🎉 SUCCESS: 'avoir' has been removed from nouns.js!");
  } else {
    console.log("\n❌ FAILED: 'avoir' still exists in nouns.js");
  }
}

console.log("\n=== ACTUAL REMOVAL COMPLETE ===");
