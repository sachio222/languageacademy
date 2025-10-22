/**
 * Sort Phrases by Starting Words
 * Sort the allPhrases list in phrases-word-list.js by starting words from most to least frequent
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Sorting phrases by starting words frequency...");

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

  console.log(`📊 Found ${currentPhrases.length} phrases to sort`);

  // Count starting words
  const startingWordCounts = new Map();

  for (const phrase of currentPhrases) {
    const firstWord = phrase.split(" ")[0].toLowerCase();
    startingWordCounts.set(
      firstWord,
      (startingWordCounts.get(firstWord) || 0) + 1
    );
  }

  // Convert to array and sort by frequency (most to least)
  const sortedStartingWords = Array.from(startingWordCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  console.log("\n📈 STARTING WORDS FREQUENCY (Top 20):");
  sortedStartingWords.slice(0, 20).forEach(([word, count], index) => {
    console.log(`  ${index + 1}. "${word}" - ${count} phrases`);
  });

  // Sort phrases by starting word frequency
  const sortedPhrases = currentPhrases.sort((a, b) => {
    const aFirstWord = a.split(" ")[0].toLowerCase();
    const bFirstWord = b.split(" ")[0].toLowerCase();

    const aCount = startingWordCounts.get(aFirstWord) || 0;
    const bCount = startingWordCounts.get(bFirstWord) || 0;

    // Sort by frequency (most to least)
    if (bCount !== aCount) {
      return bCount - aCount;
    }

    // If same frequency, sort alphabetically
    return a.localeCompare(b);
  });

  // Generate the updated content
  const updatedWordListContent = wordListContent.replace(
    /export const allPhrases = \[[\s\S]*?\];/,
    `export const allPhrases = [\n${sortedPhrases
      .map((phrase) => `  "${phrase}",`)
      .join("\n")}\n];`
  );

  // Write back to file
  fs.writeFileSync("phrases-word-list.js", updatedWordListContent);

  console.log("\n✅ Updated phrases-word-list.js with sorted phrases");

  // Show some examples of the sorting
  console.log("\n🔍 SAMPLE SORTED PHRASES (by starting word frequency):");

  // Group by starting word to show examples
  const groupedPhrases = new Map();
  for (const phrase of sortedPhrases) {
    const firstWord = phrase.split(" ")[0].toLowerCase();
    if (!groupedPhrases.has(firstWord)) {
      groupedPhrases.set(firstWord, []);
    }
    groupedPhrases.get(firstWord).push(phrase);
  }

  // Show examples from the most frequent starting words
  let shownCount = 0;
  for (const [word, count] of sortedStartingWords) {
    if (shownCount >= 10) break; // Show top 10 starting words

    const phrases = groupedPhrases.get(word);
    console.log(`\n📝 "${word}" (${count} phrases):`);
    phrases.slice(0, 5).forEach((phrase, index) => {
      console.log(`  ${index + 1}. "${phrase}"`);
    });
    if (phrases.length > 5) {
      console.log(`  ... and ${phrases.length - 5} more`);
    }

    shownCount++;
  }

  // Summary statistics
  console.log("\n📊 SORTING SUMMARY:");
  console.log(`✅ Total phrases sorted: ${sortedPhrases.length}`);
  console.log(`📈 Unique starting words: ${startingWordCounts.size}`);
  console.log(
    `🏆 Most frequent starting word: "${sortedStartingWords[0][0]}" (${sortedStartingWords[0][1]} phrases)`
  );

  // Show distribution
  const frequencyRanges = {
    "1 phrase": 0,
    "2-5 phrases": 0,
    "6-10 phrases": 0,
    "11-20 phrases": 0,
    "21+ phrases": 0,
  };

  for (const [word, count] of startingWordCounts) {
    if (count === 1) frequencyRanges["1 phrase"]++;
    else if (count <= 5) frequencyRanges["2-5 phrases"]++;
    else if (count <= 10) frequencyRanges["6-10 phrases"]++;
    else if (count <= 20) frequencyRanges["11-20 phrases"]++;
    else frequencyRanges["21+ phrases"]++;
  }

  console.log("\n📊 FREQUENCY DISTRIBUTION:");
  for (const [range, count] of Object.entries(frequencyRanges)) {
    console.log(`  ${range}: ${count} starting words`);
  }
} catch (error) {
  console.error("❌ Error sorting phrases:", error.message);
  process.exit(1);
}
