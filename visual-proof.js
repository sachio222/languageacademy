#!/usr/bin/env node

/**
 * Visual proof of the migration process
 * Shows the complete object before and after migration
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
    return entries;
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

// Function to format entry for display
function formatEntryForDisplay(entry) {
  if (!entry) return null;

  return {
    id: entry[0],
    word: entry[1].word,
    partOfSpeech: entry[1].partOfSpeech,
    translations: entry[1].translations,
    gender: entry[1].gender,
    frequency: entry[1].frequency,
    difficulty: entry[1].difficulty,
    cefr_level: entry[1].cefr_level,
    source: entry[1].source,
    created_at: entry[1].created_at,
    updated_at: entry[1].updated_at,
    verified: entry[1].verified,
  };
}

console.log("=== VISUAL PROOF OF MIGRATION ===");
console.log("Target word: 'avoir'");
console.log("Source: nouns.js");
console.log("Destination: verbs.js");
console.log("Action: Move and update partOfSpeech to 'verb'\n");

// Step 1: Parse nouns.js
console.log("STEP 1: Parsing nouns.js...");
const nounsPath = path.join(__dirname, "src/data/dictionary/words/nouns.js");
const nounsEntries = parseDictionaryFile(nounsPath);

if (!nounsEntries) {
  console.log("❌ Failed to parse nouns.js");
  process.exit(1);
}

console.log(`✅ Parsed nouns.js - Found ${nounsEntries.length} entries`);

// Step 2: Find the target word
console.log("\nSTEP 2: Finding 'avoir' in nouns.js...");
const avoirEntry = findWordInEntries(nounsEntries, "avoir");

if (!avoirEntry) {
  console.log("❌ 'avoir' not found in nouns.js");
  process.exit(1);
}

console.log("✅ Found 'avoir' in nouns.js");

// Step 3: Show the original entry
console.log("\nSTEP 3: ORIGINAL ENTRY IN NOUNS.JS");
console.log("=".repeat(80));
console.log("ID:", avoirEntry[0]);
console.log("Word:", avoirEntry[1].word);
console.log("Current partOfSpeech:", avoirEntry[1].partOfSpeech);
console.log("Source:", avoirEntry[1].source);
console.log("\nCOMPLETE ORIGINAL ENTRY:");
console.log(JSON.stringify(formatEntryForDisplay(avoirEntry), null, 2));
console.log("=".repeat(80));

// Step 4: Update the entry for migration
console.log("\nSTEP 4: UPDATING ENTRY FOR MIGRATION...");
const originalPartOfSpeech = avoirEntry[1].partOfSpeech;
avoirEntry[1].partOfSpeech = "verb";
avoirEntry[1].updated_at = new Date().toISOString();

console.log(`✅ Updated partOfSpeech from "${originalPartOfSpeech}" to "verb"`);
console.log(`✅ Updated timestamp to: ${avoirEntry[1].updated_at}`);

// Step 5: Show the updated entry
console.log("\nSTEP 5: UPDATED ENTRY READY FOR MIGRATION");
console.log("=".repeat(80));
console.log("ID:", avoirEntry[0]);
console.log("Word:", avoirEntry[1].word);
console.log("New partOfSpeech:", avoirEntry[1].partOfSpeech);
console.log("Source:", avoirEntry[1].source);
console.log("Updated at:", avoirEntry[1].updated_at);
console.log("\nCOMPLETE UPDATED ENTRY:");
console.log(JSON.stringify(formatEntryForDisplay(avoirEntry), null, 2));
console.log("=".repeat(80));

// Step 6: Parse verbs.js to show where it would go
console.log("\nSTEP 6: PARSING VERBS.JS (DESTINATION)...");
const verbsPath = path.join(__dirname, "src/data/dictionary/words/verbs.js");
const verbsEntries = parseDictionaryFile(verbsPath);

if (!verbsEntries) {
  console.log("❌ Failed to parse verbs.js");
  process.exit(1);
}

console.log(`✅ Parsed verbs.js - Found ${verbsEntries.length} entries`);

// Step 7: Show what the entry would look like in verbs.js
console.log("\nSTEP 7: ENTRY AS IT WOULD APPEAR IN VERBS.JS");
console.log("=".repeat(80));
console.log("This is how the entry would look when added to verbs.js:");
console.log("\nRaw format for insertion:");
console.log(`  ["${avoirEntry[0]}", {`);
console.log(`    "id": "${avoirEntry[1].id}",`);
console.log(`    "language": "${avoirEntry[1].language}",`);
console.log(`    "word": "${avoirEntry[1].word}",`);
console.log(`    "partOfSpeech": "${avoirEntry[1].partOfSpeech}",`);
console.log(`    "translations": [`);
console.log(`      {`);
console.log(`        "language": "en",`);
console.log(`        "text": "${avoirEntry[1].translations[0].text}",`);
console.log(
  `        "definition": "${avoirEntry[1].translations[0].definition}",`
);
console.log(`        "context": "${avoirEntry[1].translations[0].context}",`);
console.log(
  `        "confidence": ${avoirEntry[1].translations[0].confidence}`
);
console.log(`      }`);
console.log(`    ],`);
console.log(`    "gender": "${avoirEntry[1].gender}",`);
console.log(`    "variants": [],`);
console.log(`    "frequency": {`);
console.log(`      "rank": ${avoirEntry[1].frequency.rank},`);
console.log(`      "score": ${avoirEntry[1].frequency.score},`);
console.log(`      "corpus": "${avoirEntry[1].frequency.corpus}",`);
console.log(`      "perMillion": ${avoirEntry[1].frequency.perMillion},`);
console.log(`      "percentile": ${avoirEntry[1].frequency.percentile}`);
console.log(`    },`);
console.log(`    "difficulty": ${avoirEntry[1].difficulty},`);
console.log(`    "cefr_level": "${avoirEntry[1].cefr_level}",`);
console.log(`    "examples": [],`);
console.log(`    "relationships": [],`);
console.log(`    "tags": ["${avoirEntry[1].tags[0]}"],`);
console.log(`    "semantic_field": "${avoirEntry[1].semantic_field}",`);
console.log(`    "created_at": "${avoirEntry[1].created_at}",`);
console.log(`    "updated_at": "${avoirEntry[1].updated_at}",`);
console.log(`    "source": "${avoirEntry[1].source}",`);
console.log(`    "verified": ${avoirEntry[1].verified}`);
console.log(`  }],`);
console.log("=".repeat(80));

console.log("\n✅ VISUAL PROOF COMPLETE");
console.log("The entry has been successfully:");
console.log("1. ✅ Found in nouns.js");
console.log("2. ✅ Updated partOfSpeech to 'verb'");
console.log("3. ✅ Updated timestamp");
console.log("4. ✅ Formatted for insertion into verbs.js");
console.log("5. ✅ Ready for migration");
