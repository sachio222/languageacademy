/**
 * Extract Next Chunk of Phrases
 * Extract the next 20 phrases after the already classified ones
 */

import fs from "fs";

console.log("🔍 Extracting next chunk of phrases...");

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

  // Skip the first 60 phrases (already classified) and get the next 20
  const nextChunkPhrases = currentPhrases.slice(60, 80);

  console.log(`📊 Extracting next 20 phrases (61-80) for classification`);

  // Display all next chunk phrases
  console.log("\n📝 NEXT CHUNK PHRASES FOR CLASSIFICATION:");
  nextChunkPhrases.forEach((phrase, index) => {
    console.log(`  ${index + 61}. "${phrase}"`);
  });

  // Group by starting word for analysis
  const firstWordGroups = new Map();
  nextChunkPhrases.forEach((phrase) => {
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
  console.error("❌ Error extracting next chunk:", error.message);
  process.exit(1);
}
