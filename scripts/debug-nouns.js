#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const nounsPath = path.join(projectRoot, "src", "data", "dictionary", "words", "nouns.js");
const nounsContent = fs.readFileSync(nounsPath, "utf8");

console.log("File size:", nounsContent.length);
console.log("First 500 characters:");
console.log(nounsContent.substring(0, 500));

// Try different regex patterns
console.log("\n=== Testing regex patterns ===");

const pattern1 = /word:\s*"([^"]+)"/g;
const matches1 = [...nounsContent.matchAll(pattern1)];
console.log(`Pattern 1 matches: ${matches1.length}`);
if (matches1.length > 0) {
  console.log("First 5 matches:", matches1.slice(0, 5).map(m => m[1]));
}

const pattern2 = /"text":\s*"([^"]+)"/g;
const matches2 = [...nounsContent.matchAll(pattern2)];
console.log(`Pattern 2 matches: ${matches2.length}`);

const pattern3 = /"definition":\s*"([^"]*)"/g;
const matches3 = [...nounsContent.matchAll(pattern3)];
console.log(`Pattern 3 matches: ${matches3.length}`);
