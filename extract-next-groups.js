/**
 * Extract Next Groups of Phrases
 * Extract "qu'est-ce" and "se" phrases from phrases-word-list.js
 */

import fs from "fs";

console.log("🔍 Extracting next groups of phrases...");

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

  // Filter phrases starting with "qu'est-ce"
  const questcePhrases = currentPhrases.filter((phrase) =>
    phrase.toLowerCase().startsWith("qu'est-ce")
  );

  // Filter phrases starting with "se"
  const sePhrases = currentPhrases.filter((phrase) =>
    phrase.toLowerCase().startsWith("se ")
  );

  console.log(
    `📊 Found ${questcePhrases.length} phrases starting with "qu'est-ce"`
  );
  console.log(`📊 Found ${sePhrases.length} phrases starting with "se"`);

  // Display all "qu'est-ce" phrases
  console.log("\n📝 ALL 'QU'EST-CE' PHRASES:");
  questcePhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });

  // Display all "se" phrases
  console.log("\n📝 ALL 'SE' PHRASES:");
  sePhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });
} catch (error) {
  console.error("❌ Error extracting next groups:", error.message);
  process.exit(1);
}
