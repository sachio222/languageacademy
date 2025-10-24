import generator from "./src/data/dictionary/utils/generate-definitions.js";

console.log("🏷️  Removing unit 1 from advanced être tenses...\n");

// List of être conjugations that should NOT have unit 1 (advanced tenses)
const advancedEtreWords = [
  "étais",
  "était",
  "étions",
  "étiez",
  "étaient",
  "serai",
  "seras",
  "sera",
  "serons",
  "serez",
  "seront",
  "serais",
  "serait",
  "serions",
  "seriez",
  "seraient",
  "sois",
  "soit",
  "soyons",
  "soyez",
  "soient",
  "été",
];

for (const word of advancedEtreWords) {
  console.log(`\n🏷️  Processing: ${word}`);

  try {
    const targetFile = generator.getTargetFileName("verb");
    const targetPath = `./src/data/dictionary/words/cambridge/${targetFile}`;

    // Parse the file to find the word
    const fileData = generator.parseDictionaryFile(targetPath);

    if (!fileData || !fileData.entries) {
      console.log(`❌ Could not parse dictionary file`);
      continue;
    }

    // Find the word entry
    const wordEntry = fileData.entries.find(
      ([id, entry]) => entry.word === word && entry.partOfSpeech === "verb"
    );

    if (!wordEntry) {
      console.log(`❌ Word "${word}" not found in dictionary`);
      continue;
    }

    const [id, entry] = wordEntry;
    console.log(`📝 Found entry: ${id}`);

    // Remove unit 1 field
    if (entry.unit === "unit1") {
      delete entry.unit;
      console.log(`✅ Removed unit: unit1`);
    } else {
      console.log(`ℹ️  Unit not set to unit1: ${entry.unit || "none"}`);
    }

    // Update the entry in the file
    await generator.updateEntryInFile(entry);

    console.log(`✅ Updated ${word} - removed unit 1`);
  } catch (error) {
    console.error(`❌ Error updating ${word}:`, error.message);
  }
}

console.log("\n🎉 Unit 1 removed from advanced être tenses!");
