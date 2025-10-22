/**
 * Extract "c'est" Phrases
 * Extract all phrases starting with "c'est" from phrases-word-list.js
 */

import fs from "fs";

console.log("🔍 Extracting 'c'est' phrases...");

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

  // Filter phrases starting with "c'est"
  const cestPhrases = currentPhrases.filter((phrase) =>
    phrase.toLowerCase().startsWith("c'est ")
  );

  console.log(`📊 Found ${cestPhrases.length} phrases starting with "c'est"`);

  // Display all "c'est" phrases for manual categorization
  console.log("\n📝 ALL 'C'EST' PHRASES:");
  cestPhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });
} catch (error) {
  console.error("❌ Error extracting 'c'est' phrases:", error.message);
  process.exit(1);
}
