#!/usr/bin/env node

/**
 * Fix the "est" verb entry that got corrupted with noun translations
 */

import fs from "fs";
import path from "path";

const verbsFile = "./src/data/dictionary/words/cambridge/verbs.js";

// Read the file
let content = fs.readFileSync(verbsFile, "utf8");

// Find and replace the corrupted "est-fr" entry
const estEntryStart = content.indexOf('"est-fr",');
if (estEntryStart === -1) {
  console.log("❌ Could not find est-fr entry");
  process.exit(1);
}

// Find the end of this entry (next entry or end of array)
const nextEntryStart = content.indexOf('  ],\n  [', estEntryStart + 1);
const entryEnd = nextEntryStart !== -1 ? nextEntryStart + 4 : content.indexOf(']);', estEntryStart);

if (entryEnd === -1) {
  console.log("❌ Could not find end of est-fr entry");
  process.exit(1);
}

// Extract the corrupted entry
const corruptedEntry = content.substring(estEntryStart, entryEnd);
console.log("🔍 Found corrupted entry:");
console.log(corruptedEntry.substring(0, 200) + "...");

// Create the correct entry
const correctEntry = `"est-fr",
        {
        "id": "est-fr",
        "lang": "fr",
        "word": "est",
        "translations": [
            {
                "lang": "en",
                "text": "is",
                "source": "language_academy",
                "confidence": 0.95
            }
        ],
        "relationships": [
            {
                "type": "conjugation_pair",
                "targetId": "être-fr",
                "targetWord": "être",
                "note": "infinitive form"
            }
        ],
        "etymology": "",
        "register": [],
        "usage_notes": "",
        "regional_variants": [],
        "examples": [],
        "phonetic": "",
        "cefr_level": "A1",
        "tags": [
            "lesson"
        ],
        "created_at": "${new Date().toISOString()}",
        "updated_at": "${new Date().toISOString()}",
        "sources": [
            "language_academy"
        ],
        "verified": false,
        "partOfSpeech": "verb",
        "infinitive": "être"
    }`;

// Replace the corrupted entry with the correct one
const newContent = content.substring(0, estEntryStart) + correctEntry + content.substring(entryEnd);

// Write the file back
fs.writeFileSync(verbsFile, newContent);

console.log("✅ Fixed est-fr verb entry");
console.log("📝 Removed noun translations and kept only verb translation");
