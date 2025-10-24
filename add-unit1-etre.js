import generator from "./src/data/dictionary/utils/generate-definitions.js";

console.log("🏷️  Adding unit 1 tags to être conjugations...\n");

// List of être conjugations
const etreWords = [
  "suis",
  "es",
  "est",
  "sommes",
  "êtes",
  "sont",
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
  "être",
];

for (const word of etreWords) {
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

    // Add unit 1 field
    if (!entry.unit) {
      entry.unit = "unit1";
      console.log(`✅ Added unit: unit1`);
    } else {
      console.log(`ℹ️  Unit already set: ${entry.unit}`);
    }

    // Update the entry in the file
    await generator.updateEntryInFile(entry);

    console.log(`✅ Updated ${word} with unit 1`);
  } catch (error) {
    console.error(`❌ Error updating ${word}:`, error.message);
  }
}

console.log("\n🎉 Unit 1 tags added to all être words!");
