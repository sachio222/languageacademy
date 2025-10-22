/**
 * Extract "en" Phrases
 * Extract all phrases starting with "en" from phrases-word-list.js
 */

import fs from "fs";

console.log("🔍 Extracting 'en' phrases...");

try {
  // Read the phrases-word-list.js file
  const wordListContent = fs.readFileSync("phrases-word-list.js", "utf8");

  // Extract the allPhrases array
  const allPhrasesMatch = wordListContent.match(
    /export const allPhrases = \[([\s\S]*?)\];/
  );

  if (!allPhrasesMatch) {
    console.log("❌ Could not find allPhrases array in file");
    process.exit(1);
  }

  // Parse the current phrases
  const currentPhrases = allPhrasesMatch[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line.startsWith('"'))
    .map((line) => line.replace(/^"|",?$/g, ""));

  // Filter phrases starting with "en"
  const enPhrases = currentPhrases.filter((phrase) =>
    phrase.toLowerCase().startsWith("en ")
  );

  console.log(`📊 Found ${enPhrases.length} phrases starting with "en"`);

  // Display all "en" phrases for manual categorization
  console.log("\n📝 ALL 'EN' PHRASES:");
  enPhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });
} catch (error) {
  console.error("❌ Error extracting 'en' phrases:", error.message);
  process.exit(1);
}
