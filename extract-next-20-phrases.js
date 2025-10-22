/**
 * Extract Next 20 Phrases
 * Extract the next 20 phrases from phrases-word-list.js for manual classification
 */

import fs from "fs";

console.log("🔍 Extracting next 20 phrases...");

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

  console.log(`📊 Found ${currentPhrases.length} total phrases remaining`);

  // Get the next 20 phrases
  const next20Phrases = currentPhrases.slice(0, 20);

  console.log(`📊 Extracting next 20 phrases for classification`);

  // Display all next 20 phrases
  console.log("\n📝 NEXT 20 PHRASES FOR CLASSIFICATION:");
  next20Phrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });

  // Group by starting word for analysis
  const firstWordGroups = new Map();
  next20Phrases.forEach((phrase) => {
    const firstWord = phrase.split(" ")[0];
    if (!firstWordGroups.has(firstWord)) {
      firstWordGroups.set(firstWord, []);
    }
    firstWordGroups.get(firstWord).push(phrase);
  });

  console.log("\n📊 GROUPED BY FIRST WORD:");
  for (const [firstWord, phrases] of firstWordGroups) {
    console.log(`\n"${firstWord}" (${phrases.length} phrases):`);
    phrases.forEach((phrase) => {
      console.log(`  - "${phrase}"`);
    });
  }
} catch (error) {
  console.error("❌ Error extracting next 20 phrases:", error.message);
  process.exit(1);
}
