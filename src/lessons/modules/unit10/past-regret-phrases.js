/**
 * Module: Dynamic ID (auto-assigned)2: Si j'avais su... - Past Regret Phrases
 * Unit 10 - Expressing regrets about the past
 */

export const pastRegretPhrasesModule = {
  moduleKey: "2024-01-30-past-regret-phrases", // Permanent identifier - never changes
  title: "Si j'avais su... - Past Regret Phrases",
  description:
    "Express regrets about the past! 'Si j'avais su, je serais venu' (If I'd known, I'd have come), 'Si j'avais étudié...' (If I'd studied...). Universal human experience!",
  unit: 10,

  concepts: [
    {
      term: "Expressing Regret",
      definition:
        "Use 'si j'avais...' to talk about things you wish you'd done differently",
      example:
        "Si j'avais su... (If I'd known...), Si j'avais fait ça... (If I'd done that...)",
    },
    {
      term: "Common Regret Phrases",
      definition:
        "Everyone regrets not knowing, not studying, not coming, etc.",
      example:
        "Si j'avais su, je serais venu (If I'd known, I would have come)",
    },
  ],

  vocabularyReference: [
    {
      french: "si j'avais su",
      english: "if I had known",
      note: "⭐ most common regret!",
    },
    {
      french: "si j'avais étudié",
      english: "if I had studied",
      note: "student regret",
    },
    {
      french: "si j'avais fait ça",
      english: "if I had done that",
      note: "general regret",
    },
    {
      french: "je serais venu",
      english: "I would have come",
      note: "result of regret",
    },
    {
      french: "j'aurais réussi",
      english: "I would have succeeded",
      note: "missed opportunity",
    },
    {
      french: "si j'avais pu",
      english: "if I could have",
      note: "inability regret",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Express regret: 'If I had known...'",
        prompt: "If I had known",
        hint: "si + j'avais su",
        expectedAnswer: "si j'avais su",
        wrongAnswers: [
          {
            answer: "si je savais",
            feedback:
              "That's not past enough! For regret, use: si j'avais su (had known)",
          },
        ],
      },
      {
        instruction: "Express student regret: 'If I had studied...'",
        prompt: "If I had studied",
        hint: "si + j'avais étudié",
        expectedAnswer: "si j'avais étudié",
        wrongAnswers: [],
      },
      {
        instruction: "General regret: 'If I had done that...'",
        prompt: "If I had done that",
        hint: "si + j'avais fait ça",
        expectedAnswer: "si j'avais fait ça",
        wrongAnswers: [],
      },
      {
        instruction: "Say what you would have done: 'I would have come'",
        prompt: "I would have come",
        hint: "je + serais venu",
        expectedAnswer: "je serais venu",
        wrongAnswers: [
          {
            answer: "je viendrais",
            feedback:
              "That's not past! For 'would have come', use: je serais venu",
          },
        ],
      },
      {
        instruction: "Express missed opportunity: 'I would have succeeded'",
        prompt: "I would have succeeded",
        hint: "j'aurais réussi",
        expectedAnswer: "j'aurais réussi",
        wrongAnswers: [],
      },
      {
        instruction: "Express inability regret: 'If I could have...'",
        prompt: "If I could have",
        hint: "si + j'avais pu",
        expectedAnswer: "si j'avais pu",
        wrongAnswers: [],
      },
    ],
  },
};
