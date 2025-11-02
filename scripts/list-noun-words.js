#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const nounsPath = path.join(projectRoot, "src", "data", "dictionary", "words", "nouns.js");
const nounsContent = fs.readFileSync(nounsPath, "utf8");

// Extract all word fields
const wordPattern = /word:\s*"([^"]+)"/g;
const wordMatches = [...nounsContent.matchAll(wordPattern)];

console.log(`📝 All ${wordMatches.length} words in nouns.js:\n`);

// Sort alphabetically and list
const words = wordMatches.map(match => match[1]).sort();

words.forEach((word, index) => {
  console.log(`${(index + 1).toString().padStart(3, ' ')}. ${word}`);
});

console.log(`\n📊 Total: ${words.length} words`);
