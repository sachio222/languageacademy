#!/usr/bin/env node

/**
 * Extract All Words from Reading Passages
 *
 * This script finds all reading modules and extracts every word from their
 * readingPassage.text content, outputting them to a single file.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all reading modules
const modulesDir = path.join(__dirname, "src", "lessons", "modules");
const allWords = new Set();
const readingModules = [];

console.log("🔍 Scanning for reading modules...");

// Recursively find all reading-*.js files
function findReadingModules(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findReadingModules(fullPath);
    } else if (item.startsWith("reading-") && item.endsWith(".js")) {
      readingModules.push(fullPath);
    }
  }
}

findReadingModules(modulesDir);

console.log(`📚 Found ${readingModules.length} reading modules:`);
readingModules.forEach((module) => {
  console.log(`  - ${path.relative(modulesDir, module)}`);
});

// Process each reading module
for (const modulePath of readingModules) {
  try {
    console.log(`\n📖 Processing ${path.relative(modulesDir, modulePath)}...`);

    // Read the module file
    const moduleContent = fs.readFileSync(modulePath, "utf8");

    // Extract the module export (this is a simple approach)
    // Look for readingPassage: { text: `...` }
    const textMatch = moduleContent.match(
      /readingPassage:\s*\{\s*[^}]*text:\s*`([^`]+)`/s
    );

    if (textMatch) {
      const text = textMatch[1];
      console.log(
        `  ✅ Found reading passage text (${text.length} characters)`
      );

      // Extract words from the text
      const words = extractWords(text);
      console.log(`  📝 Extracted ${words.length} words`);

      // Add to our set (automatically deduplicates)
      words.forEach((word) => allWords.add(word));

      // Show a sample of words from this reading
      const sampleWords = words.slice(0, 10);
      console.log(
        `  🔤 Sample words: ${sampleWords.join(", ")}${
          words.length > 10 ? "..." : ""
        }`
      );
    } else {
      console.log(`  ⚠️  No readingPassage.text found in this module`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${modulePath}:`, error.message);
  }
}

/**
 * Extract words from text content
 * Handles French text with accents, punctuation, and special characters
 */
function extractWords(text) {
  // Remove markdown images and formatting
  let cleanText = text
    .replace(/!\[[^\]]*\]/g, "") // Remove ![img/...]
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove **bold** formatting
    .replace(/\*([^*]+)\*/g, "$1") // Remove *italic* formatting
    .replace(/`([^`]+)`/g, "$1") // Remove `code` formatting
    .replace(/\|maxWidth:[^|]*\|/g, "") // Remove |maxWidth:...| attributes
    .replace(/\n/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Extract words using regex that handles French characters
  const words =
    cleanText.match(/[a-zA-ZàâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]+/g) || [];

  // Filter out very short words (1-2 characters) and convert to lowercase
  return words
    .filter((word) => word.length >= 2)
    .map((word) => word.toLowerCase())
    .filter((word) => word.length > 0);
}

// Convert Set to sorted array
const sortedWords = Array.from(allWords).sort();

console.log(`\n📊 SUMMARY:`);
console.log(`  📚 Reading modules processed: ${readingModules.length}`);
console.log(`  🔤 Total unique words found: ${sortedWords.length}`);

// Show some statistics
const wordLengths = sortedWords.map((word) => word.length);
const avgLength = wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length;
const longestWord = sortedWords.reduce(
  (a, b) => (a.length > b.length ? a : b),
  ""
);
const shortestWords = sortedWords.filter((word) => word.length <= 3);

console.log(`  📏 Average word length: ${avgLength.toFixed(1)} characters`);
console.log(
  `  📏 Longest word: "${longestWord}" (${longestWord.length} characters)`
);
console.log(`  📏 Short words (≤3 chars): ${shortestWords.length} words`);

// Output to file
const outputFile = path.join(__dirname, "all-reading-words.txt");
const outputContent = [
  `# All Words from Reading Passages`,
  `# Generated: ${new Date().toISOString()}`,
  `# Total unique words: ${sortedWords.length}`,
  `# Reading modules processed: ${readingModules.length}`,
  ``,
  `# Word List:`,
  ...sortedWords,
].join("\n");

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log(`\n✅ SUCCESS!`);
console.log(`  📄 Output file: ${outputFile}`);
console.log(`  📊 Total words: ${sortedWords.length}`);
console.log(
  `  📝 File size: ${(fs.statSync(outputFile).size / 1024).toFixed(1)} KB`
);

// Show first and last few words as preview
console.log(`\n🔤 Preview (first 20 words):`);
console.log(`  ${sortedWords.slice(0, 20).join(", ")}`);

console.log(`\n🔤 Preview (last 20 words):`);
console.log(`  ${sortedWords.slice(-20).join(", ")}`);
