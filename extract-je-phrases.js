/**
 * Extract "je" Phrases
 * Extract all phrases starting with "je" from phrases-word-list.js
 */

import fs from "fs";

console.log("🔍 Extracting 'je' phrases...");

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

  // Filter phrases starting with "je"
  const jePhrases = currentPhrases.filter((phrase) =>
    phrase.toLowerCase().startsWith("je ")
  );

  console.log(`📊 Found ${jePhrases.length} phrases starting with "je"`);

  // Display all "je" phrases for manual categorization
  console.log("\n📝 ALL 'JE' PHRASES:");
  jePhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });
} catch (error) {
  console.error("❌ Error extracting 'je' phrases:", error.message);
  process.exit(1);
}
