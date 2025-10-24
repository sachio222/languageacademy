const {
  DefinitionGenerator,
} = require("./src/data/dictionary/utils/generate-definitions");

async function addDireConjugations() {
  const generator = new DefinitionGenerator();

  // dire and all its conjugations
  const direConjugations = [
    // Main entry - infinitive
    {
      word: "dire",
      translation: "to say/tell",
      partOfSpeech: "verb",
      infinitive: "dire",
      examples: [
        { text: "Je dois dire", trans: "I must say", lang: "en" },
        { text: "Il faut dire", trans: "We must say", lang: "en" },
      ],
    },

    // Present tense conjugations
    {
      word: "dis",
      translation: "say/says",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "first_third",
      number: "singular",
      tense: "present",
      examples: [
        { text: "Je dis", trans: "I say", lang: "en" },
        { text: "Il dit", trans: "He says", lang: "en" },
      ],
    },
    {
      word: "dit",
      translation: "says",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "third",
      number: "singular",
      tense: "present",
      examples: [{ text: "Il dit", trans: "He says", lang: "en" }],
    },
    {
      word: "disons",
      translation: "say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "first",
      number: "plural",
      tense: "present",
      examples: [{ text: "Nous disons", trans: "We say", lang: "en" }],
    },
    {
      word: "dites",
      translation: "say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "second",
      number: "plural",
      tense: "present",
      examples: [{ text: "Vous dites", trans: "You say", lang: "en" }],
    },
    {
      word: "disent",
      translation: "say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "third",
      number: "plural",
      tense: "present",
      examples: [{ text: "Ils disent", trans: "They say", lang: "en" }],
    },

    // Past tense (passé composé)
    {
      word: "ai dit",
      translation: "said/have said",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "first",
      number: "singular",
      tense: "past",
      examples: [{ text: "J'ai dit", trans: "I said/I have said", lang: "en" }],
    },
    {
      word: "as dit",
      translation: "said/have said",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "second",
      number: "singular",
      tense: "past",
      examples: [
        { text: "Tu as dit", trans: "You said/You have said", lang: "en" },
      ],
    },
    {
      word: "a dit",
      translation: "said/has said",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "third",
      number: "singular",
      tense: "past",
      examples: [
        { text: "Il a dit", trans: "He said/He has said", lang: "en" },
      ],
    },
    {
      word: "avons dit",
      translation: "said/have said",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "first",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Nous avons dit", trans: "We said/We have said", lang: "en" },
      ],
    },
    {
      word: "avez dit",
      translation: "said/have said",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "second",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Vous avez dit", trans: "You said/You have said", lang: "en" },
      ],
    },
    {
      word: "ont dit",
      translation: "said/have said",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "third",
      number: "plural",
      tense: "past",
      examples: [
        { text: "Ils ont dit", trans: "They said/They have said", lang: "en" },
      ],
    },

    // Future tense
    {
      word: "dirai",
      translation: "will say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "first",
      number: "singular",
      tense: "future",
      examples: [{ text: "Je dirai", trans: "I will say", lang: "en" }],
    },
    {
      word: "diras",
      translation: "will say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "second",
      number: "singular",
      tense: "future",
      examples: [{ text: "Tu diras", trans: "You will say", lang: "en" }],
    },
    {
      word: "dira",
      translation: "will say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "third",
      number: "singular",
      tense: "future",
      examples: [{ text: "Il dira", trans: "He will say", lang: "en" }],
    },
    {
      word: "dirons",
      translation: "will say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "first",
      number: "plural",
      tense: "future",
      examples: [{ text: "Nous dirons", trans: "We will say", lang: "en" }],
    },
    {
      word: "direz",
      translation: "will say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "second",
      number: "plural",
      tense: "future",
      examples: [{ text: "Vous direz", trans: "You will say", lang: "en" }],
    },
    {
      word: "diront",
      translation: "will say",
      partOfSpeech: "verb",
      infinitive: "dire",
      person: "third",
      number: "plural",
      tense: "future",
      examples: [{ text: "Ils diront", trans: "They will say", lang: "en" }],
    },

    // Past participle
    {
      word: "dit",
      translation: "said",
      partOfSpeech: "verb",
      infinitive: "dire",
      tense: "past_participle",
      examples: [
        { text: "J'ai dit", trans: "I said/I have said", lang: "en" },
        { text: "Il a dit", trans: "He said/He has said", lang: "en" },
      ],
    },
  ];

  console.log("🚀 Adding 'dire' and all conjugations...\n");

  try {
    await generator.generateDefinitions(direConjugations, {
      autoScrape: true,
      saveToFiles: true,
    });

    console.log("\n✅ 'dire' conjugations added successfully!");
    console.log("\n📊 Summary:");
    console.log("• dire (infinitive) - 'to say/tell'");
    console.log("• dis, dit, disons, dites, disent (present)");
    console.log("• ai dit, as dit, a dit, avons dit, avez dit, ont dit (past)");
    console.log("• dirai, diras, dira, dirons, direz, diront (future)");
    console.log("• dit (past participle)");
  } catch (error) {
    console.error("❌ Error adding dire conjugations:", error);
  }
}

addDireConjugations();
