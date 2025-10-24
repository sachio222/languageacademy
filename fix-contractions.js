import generator from "./src/data/dictionary/utils/generate-definitions.js";

console.log(
  "🔧 Fixing contractions - removing unit 1 and adding to correct files...\n"
);

// Remove unit 1 from verb contractions
const verbContractionsToFix = ["c'est", "ce sont", "c'était", "il y a"];

// Add interrogatives to correct file
const interrogativeContractions = [
  {
    word: "qu'est-ce que",
    translation: "what (for objects)",
    partOfSpeech: "interrogative",
    tags: ["contraction", "question"],
  },
  {
    word: "qu'est-ce qui",
    translation: "what (for subjects)",
    partOfSpeech: "interrogative",
    tags: ["contraction", "question"],
  },
];

console.log("📝 Removing unit 1 from verb contractions...");
for (const word of verbContractionsToFix) {
  try {
    const targetFile = generator.getTargetFileName("verb");
    const targetPath = `./src/data/dictionary/words/cambridge/${targetFile}`;

    const fileData = generator.parseDictionaryFile(targetPath);
    const wordEntry = fileData.entries.find(
      ([id, entry]) => entry.word === word && entry.partOfSpeech === "verb"
    );

    if (wordEntry) {
      const [id, entry] = wordEntry;
      console.log(`📝 Found ${word}, removing unit 1...`);

      if (entry.unit === "unit1") {
        delete entry.unit;
        console.log(`✅ Removed unit from ${word}`);
      }

      if (entry.tags && entry.tags.includes("unit1")) {
        entry.tags = entry.tags.filter((tag) => tag !== "unit1");
        console.log(`✅ Removed unit1 tag from ${word}`);
      }

      await generator.updateEntryInFile(entry);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${word}:`, error.message);
  }
}

console.log("\n📝 Adding interrogative contractions to interrogatives.js...");
try {
  const result = await generator.generateDefinitions(
    interrogativeContractions,
    {
      autoScrape: false,
      verbose: true,
    }
  );
  console.log(`✅ Added ${result.results.length} interrogative contractions`);
} catch (error) {
  console.error("❌ Error adding interrogative contractions:", error.message);
}

console.log("\n🎉 Contractions fixed!");
