/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): ça - The Most Useful Word!
 * Learn the single most versatile word in French + survival phrases
 */

export const caSurvival = {
  moduleKey: "2024-01-13-ca-survival", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "ça - Survival Phrases",
  description:
    "Learn 'ça' (that/it) and build your first real conversations! Most useful word in French!",

  concepts: [
    {
      term: "ça = that/it",
      definition: "Informal, versatile, used constantly in conversation",
      example: "You'll use this word in almost every sentence!",
    },
    {
      term: "c'est ça",
      definition: "That's it / That's right - super common phrase",
      example: "Used to confirm, agree, or point to something",
    },
    {
      term: "ça va?",
      definition: "How's it going? / Are you OK? - most common greeting!",
      example: "The first thing you say when meeting someone",
    },
    {
      term: "Building Blocks",
      definition: "Combine with être and avoir from previous modules",
      example: "c'est + ça, j'ai + ça - real useful phrases!",
    },
  ],

  vocabularyReference: [
    { french: "ça", english: "that/it", note: "most common word!" },
    { french: "c'est ça", english: "that's it/right", note: "être + ça" },
    { french: "ça va", english: "it goes/OK", note: "ça + va (être)" },
    { french: "ça va?", english: "how's it going?", note: "greeting!" },
    { french: "j'ai ça", english: "I have that", note: "avoir + ça" },
    {
      french: "tu as ça",
      english: "you have that",
      note: "combining practice",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "Point to something. Use the most versatile word for 'that/it'",
        prompt: "that/it (informal)",
        hint: "The most common demonstrative - 2 letters!",
        expectedAnswer: "ça",
        wrongAnswers: [
          {
            answer: "ce",
            feedback: "That's for 'this' before masculine nouns",
          },
          { answer: "cela", feedback: "That's formal - use ça instead" },
        ],
      },
      {
        instruction:
          "Someone shows you what they meant. Confirm by saying 'that's it'",
        prompt: "that's it / that's right",
        hint: "Combine: it is + that (using être from M3)",
        expectedAnswer: "c'est ça",
        wrongAnswers: [
          { answer: "ça c'est", feedback: "Wrong order - use: c'est ça" },
        ],
      },
      {
        instruction: "Greet a friend casually. Ask how they're doing",
        prompt: "How's it going? / Are you OK?",
        hint: "Literally 'that goes?' - super common greeting!",
        expectedAnswer: "ça va",
        wrongAnswers: [
          {
            answer: "comment ça va",
            feedback: "Good! But simpler: just 'ça va' works",
          },
        ],
      },
      {
        instruction:
          "Someone offers you something. Accept by saying you have/want it",
        prompt: "I have that",
        hint: "Combine avoir + ça (both from previous modules)",
        expectedAnswer: "j'ai ça",
        wrongAnswers: [
          { answer: "je ai ça", feedback: "Use j'ai with apostrophe" },
        ],
      },
      {
        instruction:
          "Tell your friend they have something. Say 'you have that'",
        prompt: "you have that (informal)",
        hint: "Combine avoir + ça",
        expectedAnswer: "tu as ça",
        wrongAnswers: [
          { answer: "tu a ça", feedback: "Wrong conjugation: tu AS not tu a" },
        ],
      },
      {
        instruction: "Confirm someone possesses something. Say 'he has that'",
        prompt: "he has that",
        hint: "Combine avoir + ça",
        expectedAnswer: "il a ça",
        wrongAnswers: [
          { answer: "il as ça", feedback: "Wrong conjugation: il A not il as" },
        ],
      },
    ],
  },
};
