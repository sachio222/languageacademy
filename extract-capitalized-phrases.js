/**
 * Extract Capitalized Phrases
 * Extract all phrases that start with capital letters from phrases-word-list.js
 */

import fs from "fs";

console.log("🔍 Extracting capitalized phrases...");

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

  // Filter phrases that start with capital letters
  const capitalizedPhrases = currentPhrases.filter((phrase) => {
    const firstChar = phrase.charAt(0);
    return (
      firstChar === firstChar.toUpperCase() &&
      firstChar !== firstChar.toLowerCase()
    );
  });

  console.log(
    `📊 Found ${capitalizedPhrases.length} phrases starting with capital letters`
  );

  // Display all capitalized phrases for manual categorization
  console.log("\n📝 ALL CAPITALIZED PHRASES:");
  capitalizedPhrases.forEach((phrase, index) => {
    console.log(`  ${index + 1}. "${phrase}"`);
  });

  // Group by first word for analysis
  const firstWordGroups = new Map();
  capitalizedPhrases.forEach((phrase) => {
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
  console.error("❌ Error extracting capitalized phrases:", error.message);
  process.exit(1);
}
