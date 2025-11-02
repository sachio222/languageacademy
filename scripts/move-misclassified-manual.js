#!/usr/bin/env node

/**
 * Move Misclassified Words - Manual Parsing Approach
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Load the misclassification results
const resultsPath = path.join(projectRoot, "misclassified-nouns.json");
const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

console.log("🔄 Moving misclassified words to correct dictionary files...\n");

// Create lookup map for misclassified words
const misclassifiedLookup = {};
Object.entries(results.nonNouns).forEach(([category, words]) => {
  words.forEach(({ word }) => {
    misclassifiedLookup[word] = category;
  });
});

console.log(`Found ${Object.keys(misclassifiedLookup).length} words to move`);

// Load nouns file
const nounsPath = path.join(
  projectRoot,
  "src",
  "data",
  "dictionary",
  "words",
  "nouns.js"
);
const nounsContent = fs.readFileSync(nounsPath, "utf8");

// Find the start and end of the Map entries
const mapStartMatch = nounsContent.match(/export const nouns = new Map\(\[\s*/);
if (!mapStartMatch) {
  console.error("Could not find Map start");
  process.exit(1);
}

const mapStart = mapStartMatch.index + mapStartMatch[0].length;
const mapEndMatch = nounsContent.match(/\s*\]\);\s*$/);
if (!mapEndMatch) {
  console.error("Could not find Map end");
  process.exit(1);
}

const mapEnd = mapEndMatch.index;
const entriesText = nounsContent.substring(mapStart, mapEnd);

console.log(`Extracted entries section (${entriesText.length} chars)`);

// Now manually parse entries by finding each [ ... ], pattern
let entries = [];
let currentEntry = "";
let bracketDepth = 0;
let inEntry = false;
let i = 0;

while (i < entriesText.length) {
  const char = entriesText[i];

  if (char === "[" && !inEntry) {
    // Starting a new entry
    inEntry = true;
    bracketDepth = 1;
    currentEntry = char;
  } else if (inEntry) {
    currentEntry += char;

    if (char === "[") {
      bracketDepth++;
    } else if (char === "]") {
      bracketDepth--;

      if (bracketDepth === 0) {
        // Entry is complete
        entries.push(currentEntry.trim());
        currentEntry = "";
        inEntry = false;

        // Skip any following comma and whitespace
        while (i + 1 < entriesText.length && /[,\s]/.test(entriesText[i + 1])) {
          i++;
        }
      }
    }
  }

  i++;
}

console.log(`Found ${entries.length} entries`);

// Process each entry
let correctNouns = [];
let entriesToMove = {
  articles: [],
  pronouns: [],
  verbs: [],
  adjectives: [],
  adverbs: [],
  prepositions: [],
  conjunctions: [],
  expressions: [],
};

entries.forEach((entry, index) => {
  // Extract word from the entry
  const wordMatch = entry.match(/word:\s*"([^"]+)"/);
  if (!wordMatch) {
    console.log(`Could not extract word from entry ${index + 1}`);
    correctNouns.push(entry);
    return;
  }

  const word = wordMatch[1];
  const category = misclassifiedLookup[word];

  if (category) {
    // This word should be moved
    let targetCategory = category;

    // Map some categories to expressions
    if (targetCategory === "commands" || targetCategory === "phrases") {
      targetCategory = "expressions";
    }

    // Update the partOfSpeech field in the entry
    const updatedEntry = entry.replace(
      /partOfSpeech:\s*"noun"/,
      `partOfSpeech: "${
        targetCategory === "expressions"
          ? "expression"
          : targetCategory.slice(0, -1)
      }"`
    );

    entriesToMove[targetCategory].push(updatedEntry);
    console.log(`Moving "${word}" to ${targetCategory}`);
  } else {
    correctNouns.push(entry);
  }
});

console.log(`\n📊 Movement Summary:`);
console.log(`✅ Keeping ${correctNouns.length} correct nouns`);

let totalMoved = 0;
Object.entries(entriesToMove).forEach(([category, entries]) => {
  if (entries.length > 0) {
    console.log(`🔄 Moving ${entries.length} entries to ${category}`);
    totalMoved += entries.length;
  }
});

// Reconstruct nouns file
const header = nounsContent.substring(0, mapStart);
const footer = nounsContent.substring(mapEnd);
const newNounsContent = header + correctNouns.join(",\n") + footer;

// Update entry count
const finalContent = newNounsContent.replace(
  /Total entries: \d+/,
  `Total entries: ${correctNouns.length}`
);

fs.writeFileSync(nounsPath, finalContent, "utf8");
console.log(`\n✅ Updated nouns.js (${correctNouns.length} entries)`);

// Now update the target dictionary files
const dictionaryDir = path.join(
  projectRoot,
  "src",
  "data",
  "dictionary",
  "words"
);
const filePaths = {
  articles: path.join(dictionaryDir, "articles.js"),
  pronouns: path.join(dictionaryDir, "pronouns.js"),
  verbs: path.join(dictionaryDir, "verbs.js"),
  adjectives: path.join(dictionaryDir, "adjectives.js"),
  adverbs: path.join(dictionaryDir, "adverbs.js"),
  prepositions: path.join(dictionaryDir, "prepositions.js"),
  conjunctions: path.join(dictionaryDir, "conjunctions.js"),
  expressions: path.join(dictionaryDir, "expressions.js"),
};

Object.entries(entriesToMove).forEach(([category, entries]) => {
  if (entries.length === 0) return;

  const filePath = filePaths[category];
  if (!filePath || !fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${category}.js`);
    return;
  }

  // Load existing content
  const existingContent = fs.readFileSync(filePath, "utf8");

  // Find the insertion point (before the closing ]);)
  const insertionPoint = existingContent.lastIndexOf("]);");
  if (insertionPoint === -1) {
    console.log(`⚠️  Could not find insertion point in ${category}.js`);
    return;
  }

  // Insert new entries
  const beforeInsertion = existingContent.substring(0, insertionPoint);
  const afterInsertion = existingContent.substring(insertionPoint);

  // Add comma if there are existing entries
  const needsComma = beforeInsertion.includes("word:");
  const separator = needsComma ? ",\n" : "\n";

  const newEntries = entries.join(",\n");
  const newContent =
    beforeInsertion + separator + newEntries + "\n" + afterInsertion;

  // Update entry count in header
  const totalEntries = (newContent.match(/word:/g) || []).length;
  const updatedContent = newContent.replace(
    /Total entries: \d+/,
    `Total entries: ${totalEntries}`
  );

  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log(
    `✅ Updated ${category}.js (${totalEntries} total entries, +${entries.length} new)`
  );
});

console.log(`\n🎉 Successfully moved ${totalMoved} misclassified words!`);
