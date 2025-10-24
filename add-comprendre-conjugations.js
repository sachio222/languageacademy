const {
  DefinitionGenerator,
} = require("./src/data/dictionary/utils/generate-definitions");

async function addComprendreConjugations() {
  const generator = new DefinitionGenerator();

  // comprendre and all its conjugations
  const comprendreConjugations = [
    // Main entry - infinitive
    {
      word: "comprendre",
      translation: "to understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      examples: [
        {
          text: "Je vais comprendre",
          trans: "I'm going to understand",
          lang: "en",
        },
        { text: "Il faut comprendre", trans: "We must understand", lang: "en" },
      ],
    },

    // Present tense conjugations
    {
      word: "comprends",
      translation: "understand/understands",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "first_second",
      number: "singular",
      tense: "present",
      examples: [
        { text: "Je comprends", trans: "I understand", lang: "en" },
        { text: "Tu comprends", trans: "You understand", lang: "en" },
      ],
    },
    {
      word: "comprend",
      translation: "understands",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "third",
      number: "singular",
      tense: "present",
      examples: [{ text: "Il comprend", trans: "He understands", lang: "en" }],
    },
    {
      word: "comprenons",
      translation: "understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "first",
      number: "plural",
      tense: "present",
      examples: [
        { text: "Nous comprenons", trans: "We understand", lang: "en" },
      ],
    },
    {
      word: "comprenez",
      translation: "understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "second",
      number: "plural",
      tense: "present",
      examples: [
        { text: "Vous comprenez", trans: "You understand", lang: "en" },
      ],
    },
    {
      word: "comprennent",
      translation: "understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "third",
      number: "plural",
      tense: "present",
      examples: [
        { text: "Ils comprennent", trans: "They understand", lang: "en" },
      ],
    },

    // Past tense (passé composé)
    {
      word: "ai compris",
      translation: "understood/have understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "first",
      number: "singular",
      tense: "past",
      examples: [
        {
          text: "J'ai compris",
          trans: "I understood/I have understood",
          lang: "en",
        },
      ],
    },
    {
      word: "as compris",
      translation: "understood/have understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "second",
      number: "singular",
      tense: "past",
      examples: [
        {
          text: "Tu as compris",
          trans: "You understood/You have understood",
          lang: "en",
        },
      ],
    },
    {
      word: "a compris",
      translation: "understood/has understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "third",
      number: "singular",
      tense: "past",
      examples: [
        {
          text: "Il a compris",
          trans: "He understood/He has understood",
          lang: "en",
        },
      ],
    },
    {
      word: "avons compris",
      translation: "understood/have understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "first",
      number: "plural",
      tense: "past",
      examples: [
        {
          text: "Nous avons compris",
          trans: "We understood/We have understood",
          lang: "en",
        },
      ],
    },
    {
      word: "avez compris",
      translation: "understood/have understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "second",
      number: "plural",
      tense: "past",
      examples: [
        {
          text: "Vous avez compris",
          trans: "You understood/You have understood",
          lang: "en",
        },
      ],
    },
    {
      word: "ont compris",
      translation: "understood/have understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "third",
      number: "plural",
      tense: "past",
      examples: [
        {
          text: "Ils ont compris",
          trans: "They understood/They have understood",
          lang: "en",
        },
      ],
    },

    // Future tense
    {
      word: "comprendrai",
      translation: "will understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "first",
      number: "singular",
      tense: "future",
      examples: [
        { text: "Je comprendrai", trans: "I will understand", lang: "en" },
      ],
    },
    {
      word: "comprendras",
      translation: "will understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "second",
      number: "singular",
      tense: "future",
      examples: [
        { text: "Tu comprendras", trans: "You will understand", lang: "en" },
      ],
    },
    {
      word: "comprendra",
      translation: "will understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "third",
      number: "singular",
      tense: "future",
      examples: [
        { text: "Il comprendra", trans: "He will understand", lang: "en" },
      ],
    },
    {
      word: "comprendrons",
      translation: "will understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "first",
      number: "plural",
      tense: "future",
      examples: [
        { text: "Nous comprendrons", trans: "We will understand", lang: "en" },
      ],
    },
    {
      word: "comprendrez",
      translation: "will understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "second",
      number: "plural",
      tense: "future",
      examples: [
        { text: "Vous comprendrez", trans: "You will understand", lang: "en" },
      ],
    },
    {
      word: "comprendront",
      translation: "will understand",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      person: "third",
      number: "plural",
      tense: "future",
      examples: [
        { text: "Ils comprendront", trans: "They will understand", lang: "en" },
      ],
    },

    // Past participle
    {
      word: "compris",
      translation: "understood",
      partOfSpeech: "verb",
      infinitive: "comprendre",
      tense: "past_participle",
      examples: [
        {
          text: "J'ai compris",
          trans: "I understood/I have understood",
          lang: "en",
        },
        {
          text: "Il a compris",
          trans: "He understood/He has understood",
          lang: "en",
        },
      ],
    },
  ];

  console.log("🚀 Adding 'comprendre' and all conjugations...\n");

  try {
    await generator.generateDefinitions(comprendreConjugations, {
      autoScrape: true,
      saveToFiles: true,
    });

    console.log("\n✅ 'comprendre' conjugations added successfully!");
    console.log("\n📊 Summary:");
    console.log("• comprendre (infinitive) - 'to understand'");
    console.log(
      "• comprends, comprend, comprenons, comprenez, comprennent (present)"
    );
    console.log(
      "• ai compris, as compris, a compris, avons compris, avez compris, ont compris (past)"
    );
    console.log(
      "• comprendrai, comprendras, comprendra, comprendrons, comprendrez, comprendront (future)"
    );
    console.log("• compris (past participle)");
  } catch (error) {
    console.error("❌ Error adding comprendre conjugations:", error);
  }
}

addComprendreConjugations();
