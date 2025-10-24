const {
  DefinitionGenerator,
} = require("./src/data/dictionary/utils/generate-definitions");

async function addPrendreConjugations() {
  const generator = new DefinitionGenerator();

  // prendre and all its conjugations
  const prendreConjugations = [
    // Main entry - infinitive
    {
      word: "prendre",
      translation: "to take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      examples: [
        { text: "Je vais prendre", trans: "I'm going to take", lang: "en" },
        { text: "Il faut prendre", trans: "We must take", lang: "en" },
      ],
    },

    // Present tense conjugations
    {
      word: "prends",
      translation: "take/takes",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "first_second",
      number: "singular",
      tense: "present",
      examples: [
        { text: "Je prends", trans: "I take", lang: "en" },
        { text: "Tu prends", trans: "You take", lang: "en" },
      ],
    },
    {
      word: "prend",
      translation: "takes",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "third",
      number: "singular",
      tense: "present",
      examples: [{ text: "Il prend", trans: "He takes", lang: "en" }],
    },
    {
      word: "prenons",
      translation: "take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "first",
      number: "plural",
      tense: "present",
      examples: [{ text: "Nous prenons", trans: "We take", lang: "en" }],
    },
    {
      word: "prenez",
      translation: "take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "second",
      number: "plural",
      tense: "present",
      examples: [{ text: "Vous prenez", trans: "You take", lang: "en" }],
    },
    {
      word: "prennent",
      translation: "take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "third",
      number: "plural",
      tense: "present",
      examples: [{ text: "Ils prennent", trans: "They take", lang: "en" }],
    },

    // Past tense (passé composé)
    {
      word: "ai pris",
      translation: "took/have taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "first",
      number: "singular",
      tense: "past",
      examples: [
        { text: "J'ai pris", trans: "I took/I have taken", lang: "en" },
      ],
    },
    {
      word: "as pris",
      translation: "took/have taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "second",
      number: "singular",
      tense: "past",
      examples: [
        { text: "Tu as pris", trans: "You took/You have taken", lang: "en" },
      ],
    },
    {
      word: "a pris",
      translation: "took/has taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "third",
      number: "singular",
      tense: "past",
      examples: [
        { text: "Il a pris", trans: "He took/He has taken", lang: "en" },
      ],
    },
    {
      word: "avons pris",
      translation: "took/have taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "first",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Nous avons pris", trans: "We took/We have taken", lang: "en" },
      ],
    },
    {
      word: "avez pris",
      translation: "took/have taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "second",
      number: "plural",
      tense: "past",
      examples: [
        {
          text: "Vous avez pris",
          trans: "You took/You have taken",
          lang: "en",
        },
      ],
    },
    {
      word: "ont pris",
      translation: "took/have taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "third",
      number: "plural",
      tense: "past",
      examples: [
        {
          text: "Ils ont pris",
          trans: "They took/They have taken",
          lang: "en",
        },
      ],
    },

    // Future tense
    {
      word: "prendrai",
      translation: "will take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "first",
      number: "singular",
      tense: "future",
      examples: [{ text: "Je prendrai", trans: "I will take", lang: "en" }],
    },
    {
      word: "prendras",
      translation: "will take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "second",
      number: "singular",
      tense: "future",
      examples: [{ text: "Tu prendras", trans: "You will take", lang: "en" }],
    },
    {
      word: "prendra",
      translation: "will take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "third",
      number: "singular",
      tense: "future",
      examples: [{ text: "Il prendra", trans: "He will take", lang: "en" }],
    },
    {
      word: "prendrons",
      translation: "will take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "first",
      number: "plural",
      tense: "future",
      examples: [{ text: "Nous prendrons", trans: "We will take", lang: "en" }],
    },
    {
      word: "prendrez",
      translation: "will take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "second",
      number: "plural",
      tense: "future",
      examples: [{ text: "Vous prendrez", trans: "You will take", lang: "en" }],
    },
    {
      word: "prendront",
      translation: "will take",
      partOfSpeech: "verb",
      infinitive: "prendre",
      person: "third",
      number: "plural",
      tense: "future",
      examples: [
        { text: "Ils prendront", trans: "They will take", lang: "en" },
      ],
    },

    // Past participle
    {
      word: "pris",
      translation: "taken",
      partOfSpeech: "verb",
      infinitive: "prendre",
      tense: "past_participle",
      examples: [
        { text: "J'ai pris", trans: "I took/I have taken", lang: "en" },
        { text: "Il a pris", trans: "He took/He has taken", lang: "en" },
      ],
    },
  ];

  console.log("🚀 Adding 'prendre' and all conjugations...\n");

  try {
    await generator.generateDefinitions(prendreConjugations, {
      autoScrape: true,
      saveToFiles: true,
    });

    console.log("\n✅ 'prendre' conjugations added successfully!");
    console.log("\n📊 Summary:");
    console.log("• prendre (infinitive) - 'to take'");
    console.log("• prends, prend, prenons, prenez, prennent (present)");
    console.log(
      "• ai pris, as pris, a pris, avons pris, avez pris, ont pris (past)"
    );
    console.log(
      "• prendrai, prendras, prendra, prendrons, prendrez, prendront (future)"
    );
    console.log("• pris (past participle)");
  } catch (error) {
    console.error("❌ Error adding prendre conjugations:", error);
  }
}

addPrendreConjugations();
