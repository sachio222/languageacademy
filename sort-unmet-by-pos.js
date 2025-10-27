#!/usr/bin/env node

/**
 * Sort Unmet Words by Part of Speech
 *
 * This script reads the unmet words list with POS annotations and
 * sorts them by part of speech for better organization.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the unmet words file with POS
const unmetWordsFile = path.join(
  __dirname,
  "all-reading-words-unmet-with-pos.txt"
);
const content = fs.readFileSync(unmetWordsFile, "utf8");

// Parse the content
const lines = content.split("\n");
const headerLines = [];
const wordEntries = [];

for (const line of lines) {
  if (line.startsWith("#") || line.trim() === "") {
    headerLines.push(line);
  } else {
    // Parse word (pos) format
    const match = line.match(/^(.+?)\s+\((.+?)\)$/);
    if (match) {
      const word = match[1];
      const pos = match[2];
      wordEntries.push({ word, pos });
    }
  }
}

// Sort by part of speech, then alphabetically within each POS
const posOrder = [
  "noun",
  "proper_noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "conjunction",
  "interjection",
  "pronoun",
  "unknown",
];

wordEntries.sort((a, b) => {
  const posA = posOrder.indexOf(a.pos);
  const posB = posOrder.indexOf(b.pos);

  if (posA !== posB) {
    return posA - posB;
  }

  return a.word.localeCompare(b.word);
});

// Group by part of speech for statistics
const posGroups = {};
for (const entry of wordEntries) {
  if (!posGroups[entry.pos]) {
    posGroups[entry.pos] = [];
  }
  posGroups[entry.pos].push(entry.word);
}

// Create output content
const outputLines = [...headerLines, "", "# Sorted by Part of Speech:", ""];

// Add each part of speech section
for (const pos of posOrder) {
  if (posGroups[pos] && posGroups[pos].length > 0) {
    outputLines.push(
      `## ${pos.toUpperCase()} (${posGroups[pos].length} words)`
    );
    outputLines.push("");

    for (const word of posGroups[pos]) {
      outputLines.push(`${word} (${pos})`);
    }

    outputLines.push("");
  }
}

// Add summary statistics
outputLines.push("## SUMMARY STATISTICS");
outputLines.push("");

for (const pos of posOrder) {
  if (posGroups[pos] && posGroups[pos].length > 0) {
    outputLines.push(`- **${pos}**: ${posGroups[pos].length} words`);
  }
}

const totalWords = wordEntries.length;
outputLines.push("");
outputLines.push(`**Total words**: ${totalWords}`);

// Write the sorted file
const outputFile = path.join(
  __dirname,
  "all-reading-words-unmet-sorted-by-pos.txt"
);
fs.writeFileSync(outputFile, outputLines.join("\n"), "utf8");

console.log("✅ SUCCESS!");
console.log(`📄 Sorted file: ${outputFile}`);
console.log(`📊 Total words: ${totalWords}`);

console.log("\n📊 Part of Speech Distribution:");
for (const pos of posOrder) {
  if (posGroups[pos] && posGroups[pos].length > 0) {
    console.log(`  ${pos}: ${posGroups[pos].length} words`);
  }
}
