/**
 * Extract Non-Verb/Non-Noun Phrases
 * Extract phrases that are NOT classified as verb or noun for manual review
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to phrases.js
const phrasesPath = path.join(__dirname, "src/data/dictionary/phrases.js");

console.log("🔍 Extracting non-verb/non-noun phrases from phrases.js...");

try {
  // Read the phrases file
  const content = fs.readFileSync(phrasesPath, "utf8");

  // Extract the Map content using regex
  const mapMatch = content.match(
    /export const phrases = new Map\(\[([\s\S]*?)\]\);/m
  );

  if (!mapMatch) {
    console.log("❌ Could not find phrases Map in file");
    process.exit(1);
  }

  // Parse the Map content
  const mapContent = `[${mapMatch[1]}]`;
  const entries = eval(mapContent);

  console.log(`📊 Found ${entries.length} total phrases`);

  // Filter out verb and noun phrases
  const nonVerbNounPhrases = entries.filter(([id, entry]) => {
    const partOfSpeech = entry.partOfSpeech;
    return partOfSpeech !== "verb" && partOfSpeech !== "noun";
  });

  console.log(
    `📊 Found ${nonVerbNounPhrases.length} non-verb/non-noun phrases`
  );

  // Extract word information
  const phrasesList = nonVerbNounPhrases.map(([id, entry]) => ({
    id: entry.id,
    word: entry.word,
    translation: entry.translations[0]?.text || "No translation",
    definition: entry.translations[0]?.definition || "",
    partOfSpeech: entry.partOfSpeech,
    gender: entry.gender,
    cefr_level: entry.cefr_level,
    difficulty: entry.difficulty,
    source: entry.source,
    tags: entry.tags || [],
  }));

  // Sort by part of speech, then by word
  phrasesList.sort((a, b) => {
    if (a.partOfSpeech !== b.partOfSpeech) {
      return a.partOfSpeech.localeCompare(b.partOfSpeech);
    }
    return a.word.localeCompare(b.word);
  });

  // Create output content
  let output = `/**
 * Non-Verb/Non-Noun Phrases for Manual Classification
 * Extracted from phrases.js
 * Total entries: ${phrasesList.length}
 * Generated: ${new Date().toISOString()}
 */

// Phrases to be manually classified and moved to appropriate phrase categories
export const nonVerbNounPhrases = [
`;

  // Add each phrase as a comment with details
  phrasesList.forEach((phrase, index) => {
    const translation = phrase.translation.replace(/"/g, '\\"');
    const definition = phrase.definition.replace(/"/g, '\\"');

    output += `  // ${index + 1}. ${phrase.word} - "${translation}" (${
      phrase.partOfSpeech
    }, ${phrase.cefr_level}, difficulty: ${phrase.difficulty})\n`;
  });

  output += `];

// Summary by current part of speech
export const currentClassification = {
`;

  // Group by current part of speech
  const byCurrentPartOfSpeech = {};
  phrasesList.forEach((phrase) => {
    if (!byCurrentPartOfSpeech[phrase.partOfSpeech]) {
      byCurrentPartOfSpeech[phrase.partOfSpeech] = [];
    }
    byCurrentPartOfSpeech[phrase.partOfSpeech].push(phrase.word);
  });

  Object.keys(byCurrentPartOfSpeech).forEach((pos) => {
    output += `  ${pos}: ${
      byCurrentPartOfSpeech[pos].length
    }, // ${byCurrentPartOfSpeech[pos].slice(0, 5).join(", ")}${
      byCurrentPartOfSpeech[pos].length > 5 ? "..." : ""
    }\n`;
  });

  output += `};

// All phrases as simple array for easy review
export const allNonVerbNounPhrases = [
`;

  phrasesList.forEach((phrase) => {
    output += `  "${phrase.word}",\n`;
  });

  output += `];

export default nonVerbNounPhrases;
`;

  // Write the output file
  fs.writeFileSync("non-verb-noun-phrases.js", output);

  console.log("✅ Created non-verb-noun-phrases.js");
  console.log(`📊 Total non-verb/non-noun phrases: ${phrasesList.length}`);
  console.log(`📁 Output file: non-verb-noun-phrases.js`);

  // Show some statistics
  console.log("\n📈 CURRENT CLASSIFICATION BREAKDOWN:");
  Object.keys(byCurrentPartOfSpeech).forEach((pos) => {
    console.log(`  ${pos}: ${byCurrentPartOfSpeech[pos].length}`);
  });

  // Show some examples
  console.log("\n🔍 SAMPLE PHRASES BY CATEGORY:");
  Object.keys(byCurrentPartOfSpeech).forEach((pos) => {
    console.log(`\n${pos.toUpperCase()}:`);
    byCurrentPartOfSpeech[pos].slice(0, 5).forEach((phrase) => {
      const phraseData = phrasesList.find((p) => p.word === phrase);
      console.log(`  - "${phrase}" - "${phraseData.translation}"`);
    });
    if (byCurrentPartOfSpeech[pos].length > 5) {
      console.log(`  ... and ${byCurrentPartOfSpeech[pos].length - 5} more`);
    }
  });
} catch (error) {
  console.error("❌ Error extracting phrases:", error.message);
  process.exit(1);
}
