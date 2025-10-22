#!/usr/bin/env node

/**
 * Restore 'avoir-fr' back to nouns.js
 * This will add it back without corrupting the file
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

// The avoir entry to restore
const avoirEntry = [
  "avoir-fr",
  {
    id: "avoir-fr",
    language: "fr",
    word: "avoir",
    partOfSpeech: "verb",
    translations: [
      {
        language: "en",
        text: "to have",
        definition: "infinitive form",
        context: "general",
        confidence: 0.95,
      },
    ],
    gender: "none",
    variants: [],
    frequency: {
      rank: 1000,
      score: 0.5,
      corpus: "lesson",
      perMillion: 100,
      percentile: 50,
    },
    difficulty: 2,
    cefr_level: "A1",
    examples: [],
    relationships: [],
    tags: ["lesson"],
    semantic_field: "general",
    created_at: "2025-10-21T18:56:09.740Z",
    updated_at: "2025-10-22T02:28:18.176Z",
    source:
      "/Users/jupiter/dev/woodshed/languageacademy/src/lessons/modules/unit1/avoir.js",
    verified: true,
  },
];

// Function to add entry and generate new content
function addEntryAndGenerateContent(originalContent, mapMatch, newEntry) {
  // Parse existing entries
  const mapContent = `[${mapMatch[1]}]`;
  const entries = eval(mapContent);

  // Add new entry
  const updatedEntries = [...entries, newEntry];

  console.log(`Added 1 entry (${entries.length} → ${updatedEntries.length})`);

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
  const entriesString = updatedEntries
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
    `Total entries: ${updatedEntries.length}`
  );

  // Combine everything
  const newContent = `${updatedHeader}export const ${varName} = new Map([\n${entriesString}\n]);\n${footer}`;

  return newContent;
}

console.log("=== RESTORING 'AVOIR-FR' TO NOUNS.JS ===");

// Step 1: Parse current nouns.js
console.log("STEP 1: Parsing current nouns.js...");
const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");
const parseResult = parseDictionaryFile(nounsPath);

if (!parseResult) {
  console.log("❌ Failed to parse nouns.js");
  process.exit(1);
}

const { entries, originalContent, mapMatch } = parseResult;
console.log(`✅ Parsed nouns.js - Found ${entries.length} entries`);

// Check if avoir already exists
const avoirExists = entries.some((entry) => entry[1].word === "avoir");
console.log(`'avoir' already exists: ${avoirExists ? "YES" : "NO"}`);

if (avoirExists) {
  console.log("❌ 'avoir' already exists in nouns.js");
  process.exit(1);
}

// Step 2: Generate new content with avoir
console.log("\nSTEP 2: Generating new content with 'avoir'...");
const newContent = addEntryAndGenerateContent(
  originalContent,
  mapMatch,
  avoirEntry
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
      `✅ New entries: ${newEntries.length} (up from ${entries.length})`
    );

    const avoirInNew = newEntries.some((entry) => entry[1].word === "avoir");
    console.log(`✅ 'avoir' added: ${avoirInNew ? "YES" : "NO"}`);
  }
} catch (error) {
  console.log(`❌ Validation failed: ${error.message}`);
  process.exit(1);
}

// Step 4: Create backup
console.log("\nSTEP 4: Creating backup...");
const backupPath = path.join(__dirname, "nouns-before-restore.js");
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
  const avoirNowExists = verifyEntries.some(
    (entry) => entry[1].word === "avoir"
  );

  console.log(`✅ Verification complete:`);
  console.log(`  Entries before: ${entries.length}`);
  console.log(`  Entries after: ${verifyEntries.length}`);
  console.log(`  'avoir' now exists: ${avoirNowExists ? "YES" : "NO"}`);

  if (avoirNowExists) {
    const avoirEntry = verifyEntries.find((entry) => entry[1].word === "avoir");
    console.log(`  'avoir' ID: ${avoirEntry[0]}`);
    console.log(`  'avoir' partOfSpeech: ${avoirEntry[1].partOfSpeech}`);
    console.log(`  'avoir' translation: ${avoirEntry[1].translations[0].text}`);

    console.log("\n🎉 SUCCESS: 'avoir' has been restored to nouns.js!");
  } else {
    console.log("\n❌ FAILED: 'avoir' not found in nouns.js");
  }
}

console.log("\n=== RESTORATION COMPLETE ===");
