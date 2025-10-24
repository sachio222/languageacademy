const {
  DefinitionGenerator,
} = require("./src/data/dictionary/utils/generate-definitions");

async function addFaireConjugations() {
  const generator = new DefinitionGenerator();

  // faire and all its conjugations
  const faireConjugations = [
    // Main entry - infinitive
    {
      word: "faire",
      translation: "to do/make",
      partOfSpeech: "verb",
      infinitive: "faire",
      examples: [
        { text: "Je vais faire", trans: "I'm going to do", lang: "en" },
        { text: "Il faut faire", trans: "We must do", lang: "en" },
      ],
    },

    // Present tense conjugations
    {
      word: "fais",
      translation: "do/does",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "first_second",
      number: "singular",
      tense: "present",
      examples: [
        { text: "Je fais", trans: "I do", lang: "en" },
        { text: "Tu fais", trans: "You do", lang: "en" },
      ],
    },
    {
      word: "fait",
      translation: "does",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "third",
      number: "singular",
      tense: "present",
      examples: [{ text: "Il fait", trans: "He does", lang: "en" }],
    },
    {
      word: "faisons",
      translation: "do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "first",
      number: "plural",
      tense: "present",
      examples: [{ text: "Nous faisons", trans: "We do", lang: "en" }],
    },
    {
      word: "faites",
      translation: "do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "second",
      number: "plural",
      tense: "present",
      examples: [{ text: "Vous faites", trans: "You do", lang: "en" }],
    },
    {
      word: "font",
      translation: "do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "third",
      number: "plural",
      tense: "present",
      examples: [{ text: "Ils font", trans: "They do", lang: "en" }],
    },

    // Past tense (passé composé)
    {
      word: "ai fait",
      translation: "did/have done",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "first",
      number: "singular",
      tense: "past",
      examples: [{ text: "J'ai fait", trans: "I did/I have done", lang: "en" }],
    },
    {
      word: "as fait",
      translation: "did/have done",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "second",
      number: "singular",
      tense: "past",
      examples: [
        { text: "Tu as fait", trans: "You did/You have done", lang: "en" },
      ],
    },
    {
      word: "a fait",
      translation: "did/has done",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "third",
      number: "singular",
      tense: "past",
      examples: [
        { text: "Il a fait", trans: "He did/He has done", lang: "en" },
      ],
    },
    {
      word: "avons fait",
      translation: "did/have done",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "first",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Nous avons fait", trans: "We did/We have done", lang: "en" },
      ],
    },
    {
      word: "avez fait",
      translation: "did/have done",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "second",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Vous avez fait", trans: "You did/You have done", lang: "en" },
      ],
    },
    {
      word: "ont fait",
      translation: "did/have done",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "third",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Ils ont fait", trans: "They did/They have done", lang: "en" },
      ],
    },

    // Future tense
    {
      word: "ferai",
      translation: "will do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "first",
      number: "singular",
      tense: "future",
      examples: [{ text: "Je ferai", trans: "I will do", lang: "en" }],
    },
    {
      word: "feras",
      translation: "will do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "second",
      number: "singular",
      tense: "future",
      examples: [{ text: "Tu feras", trans: "You will do", lang: "en" }],
    },
    {
      word: "fera",
      translation: "will do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "third",
      number: "singular",
      tense: "future",
      examples: [{ text: "Il fera", trans: "He will do", lang: "en" }],
    },
    {
      word: "ferons",
      translation: "will do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "first",
      number: "plural",
      tense: "future",
      examples: [{ text: "Nous ferons", trans: "We will do", lang: "en" }],
    },
    {
      word: "ferez",
      translation: "will do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "second",
      number: "plural",
      tense: "future",
      examples: [{ text: "Vous ferez", trans: "You will do", lang: "en" }],
    },
    {
      word: "feront",
      translation: "will do",
      partOfSpeech: "verb",
      infinitive: "faire",
      person: "third",
      number: "plural",
      tense: "future",
      examples: [{ text: "Ils feront", trans: "They will do", lang: "en" }],
    },

    // Past participle
    {
      word: "fait",
      translation: "done",
      partOfSpeech: "verb",
      infinitive: "faire",
      tense: "past_participle",
      examples: [
        { text: "J'ai fait", trans: "I did/I have done", lang: "en" },
        { text: "Il a fait", trans: "He did/He has done", lang: "en" },
      ],
    },
  ];

  console.log("🚀 Adding 'faire' and all conjugations...\n");

  try {
    await generator.generateDefinitions(faireConjugations, {
      autoScrape: true,
      saveToFiles: true,
    });

    console.log("\n✅ 'faire' conjugations added successfully!");
    console.log("\n📊 Summary:");
    console.log("• faire (infinitive) - 'to do/make'");
    console.log("• fais, fait, faisons, faites, font (present)");
    console.log(
      "• ai fait, as fait, a fait, avons fait, avez fait, ont fait (past)"
    );
    console.log("• ferai, feras, fera, ferons, ferez, feront (future)");
    console.log("• fait (past participle)");
  } catch (error) {
    console.error("❌ Error adding faire conjugations:", error);
  }
}

addFaireConjugations();
