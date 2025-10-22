/**
 * Extract "le" Phrases
 * Extract all phrases starting with "le" from phrases-word-list.js
 */

import fs from "fs";

console.log("🔍 Extracting 'le' phrases...");

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

  // Filter phrases starting with "le"
  const lePhrases = currentPhrases.filter((phrase) =>
    phrase.toLowerCase().startsWith("le ")
  );

  console.log(`📊 Found ${lePhrases.length} phrases starting with "le"`);

  // Display all "le" phrases for manual categorization
  console.log("\n📝 ALL 'LE' PHRASES:");
  lePhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });
} catch (error) {
  console.error("❌ Error extracting 'le' phrases:", error.message);
  process.exit(1);
}
