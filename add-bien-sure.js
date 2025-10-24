const {
  DefinitionGenerator,
} = require("./src/data/dictionary/utils/generate-definitions");

async function addBienSure() {
  const generator = new DefinitionGenerator();

  // bien sûr - French expression
  const bienSureDefinition = {
    word: "bien sûr",
    translation: "of course",
    partOfSpeech: "expression",
    examples: [
      {
        text: "Bien sûr, je viens",
        trans: "Of course, I'm coming",
        lang: "en",
      },
      { text: "Bien sûr que oui", trans: "Of course yes", lang: "en" },
      {
        text: "Bien sûr, c'est possible",
        trans: "Of course, it's possible",
        lang: "en",
      },
    ],
  };

  console.log("🚀 Adding 'bien sûr' expression...\n");

  try {
    await generator.generateDefinitions([bienSureDefinition], {
      autoScrape: true,
      saveToFiles: true,
    });

    console.log("\n✅ 'bien sûr' expression added successfully!");
    console.log("\n📊 Summary:");
    console.log("• bien sûr (expression) - 'of course'");
    console.log(
      "• Examples: Bien sûr, je viens; Bien sûr que oui; Bien sûr, c'est possible"
    );
  } catch (error) {
    console.error("❌ Error adding bien sûr expression:", error);
  }
}

addBienSure();
