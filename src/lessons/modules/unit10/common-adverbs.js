/**
 * Module: Dynamic ID (auto-assigned)4: Common Adverbs - vraiment, sérieusement, etc.
 * Unit 10 - Top adverbs to add nuance
 */

export const commonAdverbsModule = {
  moduleKey: "2024-01-22-common-adverbs", // Permanent identifier - never changes
  title: "vraiment, sérieusement... - Common Adverbs",
  description:
    "Add nuance to EVERYTHING you say! 'vraiment' (really), 'sérieusement' (seriously), 'lentement' (slowly), 'rapidement' (quickly). Make your French sound sophisticated!",
  unit: 10,

  concepts: [
    {
      term: "Add Nuance to Any Verb",
      definition: "Adverbs describe HOW you do something",
      example:
        "parler (speak) → parler lentement (speak slowly), parler rapidement (speak quickly)",
    },
    {
      term: "Most Common Adverbs",
      definition: "Learn the top ones - you'll use these constantly!",
      example:
        "vraiment bon (really good), sérieusement fatigué (seriously tired)",
    },
  ],

  vocabularyReference: [
    {
      french: "vraiment",
      english: "really, truly",
      note: "⭐ most common!",
    },
    {
      french: "sérieusement",
      english: "seriously",
      note: "emphasis",
    },
    {
      french: "lentement",
      english: "slowly",
      note: "parler lentement",
    },
    {
      french: "rapidement",
      english: "quickly",
      note: "courir rapidement",
    },
    {
      french: "facilement",
      english: "easily",
      note: "comprendre facilement",
    },
    {
      french: "complètement",
      english: "completely",
      note: "complètement fini",
    },
    {
      french: "probablement",
      english: "probably",
      note: "expressing likelihood",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Emphasize something is 'really good'",
        prompt: "really good",
        hint: "vraiment + bon",
        expectedAnswer: "vraiment bon",
        wrongAnswers: [],
      },
      {
        instruction: "Say you're 'seriously tired' (emphasis!)",
        prompt: "seriously tired",
        hint: "sérieusement + fatigué",
        expectedAnswer: "sérieusement fatigué",
        wrongAnswers: [],
      },
      {
        instruction: "Ask someone to speak slowly",
        prompt: "speak slowly",
        hint: "parler + lentement",
        expectedAnswer: "parler lentement",
        acceptableAnswers: ["parle lentement"],
        wrongAnswers: [],
      },
      {
        instruction: "Say someone runs quickly",
        prompt: "run quickly",
        hint: "courir + rapidement",
        expectedAnswer: "courir rapidement",
        acceptableAnswers: ["court rapidement"],
        wrongAnswers: [],
      },
      {
        instruction: "Say you understand easily",
        prompt: "understand easily",
        hint: "comprendre + facilement",
        expectedAnswer: "comprendre facilement",
        acceptableAnswers: ["je comprends facilement"],
        wrongAnswers: [],
      },
      {
        instruction: "Say something is completely finished",
        prompt: "completely finished",
        hint: "complètement + fini",
        expectedAnswer: "complètement fini",
        wrongAnswers: [],
      },
      {
        instruction: "Say something will probably happen",
        prompt: "probably",
        hint: "one word!",
        expectedAnswer: "probablement",
        wrongAnswers: [],
      },
    ],
  },
};
