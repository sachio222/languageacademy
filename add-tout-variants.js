const {
  DefinitionGenerator,
} = require("./src/data/dictionary/utils/generate-definitions");

async function addToutVariants() {
  const generator = new DefinitionGenerator();

  // tout and all its variants
  const toutVariants = [
    // Main entry - masculine singular
    {
      word: "tout",
      translation: "all/every/whole",
      partOfSpeech: "adjective",
      gender: "masculine",
      number: "singular",
      examples: [
        { text: "Tout le monde", trans: "Everyone", lang: "en" },
        { text: "Tout le temps", trans: "All the time", lang: "en" },
      ],
    },

    // Feminine singular
    {
      word: "toute",
      translation: "all/every/whole",
      partOfSpeech: "adjective",
      gender: "feminine",
      number: "singular",
      examples: [
        { text: "Toute la journée", trans: "All day", lang: "en" },
        { text: "Toute la famille", trans: "The whole family", lang: "en" },
      ],
    },

    // Masculine plural
    {
      word: "tous",
      translation: "all/every",
      partOfSpeech: "adjective",
      gender: "masculine",
      number: "plural",
      examples: [
        { text: "Tous les jours", trans: "Every day", lang: "en" },
        { text: "Tous les enfants", trans: "All the children", lang: "en" },
      ],
    },

    // Feminine plural
    {
      word: "toutes",
      translation: "all/every",
      partOfSpeech: "adjective",
      gender: "feminine",
      number: "plural",
      examples: [
        { text: "Toutes les femmes", trans: "All the women", lang: "en" },
        { text: "Toutes les voitures", trans: "All the cars", lang: "en" },
      ],
    },

    // As pronoun - masculine singular
    {
      word: "tout",
      translation: "everything/all",
      partOfSpeech: "pronoun",
      gender: "masculine",
      number: "singular",
      examples: [
        { text: "Tout va bien", trans: "Everything is fine", lang: "en" },
        { text: "Je sais tout", trans: "I know everything", lang: "en" },
      ],
    },

    // As pronoun - masculine plural
    {
      word: "tous",
      translation: "everyone/all",
      partOfSpeech: "pronoun",
      gender: "masculine",
      number: "plural",
      examples: [
        { text: "Ils sont tous là", trans: "They are all there", lang: "en" },
        {
          text: "Nous sommes tous contents",
          trans: "We are all happy",
          lang: "en",
        },
      ],
    },

    // As pronoun - feminine plural
    {
      word: "toutes",
      translation: "everyone/all",
      partOfSpeech: "pronoun",
      gender: "feminine",
      number: "plural",
      examples: [
        {
          text: "Elles sont toutes là",
          trans: "They are all there",
          lang: "en",
        },
        {
          text: "Nous sommes toutes contentes",
          trans: "We are all happy",
          lang: "en",
        },
      ],
    },

    // As adverb
    {
      word: "tout",
      translation: "quite/very/all",
      partOfSpeech: "adverb",
      examples: [
        { text: "Tout près", trans: "Very close", lang: "en" },
        { text: "Tout à fait", trans: "Quite/absolutely", lang: "en" },
        { text: "Tout de suite", trans: "Right away", lang: "en" },
      ],
    },
  ];

  console.log("🚀 Adding 'tout' and all variants...\n");

  try {
    await generator.generateDefinitions(toutVariants, {
      autoScrape: true,
      saveToFiles: true,
    });

    console.log("\n✅ 'tout' variants added successfully!");
    console.log("\n📊 Summary:");
    console.log("• tout (masculine singular adjective) - 'all/every/whole'");
    console.log("• toute (feminine singular adjective)");
    console.log("• tous (masculine plural adjective)");
    console.log("• toutes (feminine plural adjective)");
    console.log("• tout (masculine singular pronoun) - 'everything/all'");
    console.log("• tous (masculine plural pronoun) - 'everyone/all'");
    console.log("• toutes (feminine plural pronoun) - 'everyone/all'");
    console.log("• tout (adverb) - 'quite/very/all'");
  } catch (error) {
    console.error("❌ Error adding tout variants:", error);
  }
}

addToutVariants();
