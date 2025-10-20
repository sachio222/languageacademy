/**
 * Module 127: Si j'étais... - Hypothetical Phrases (Daydreams)
 * Unit 10 - Fantasy and "what if" scenarios
 */

export const hypotheticalPhrasesModule = {
  moduleKey: "2024-01-27-hypothetical-phrases", // Permanent identifier - never changes
  title: "Si j'étais... - Daydreaming & Hypotheticals",
  description:
    "Talk about fantasies and what-ifs! 'Si j'étais riche, j'achèterais...' (If I were rich, I'd buy...), 'Si j'avais le temps, je voyagerais' (If I had time, I'd travel). Everyone loves daydreaming!",
  unit: 10,

  concepts: [
    {
      term: "Daydreaming in French",
      definition:
        "Use 'si + past form' to talk about fantasies and hypotheticals",
      example:
        "Si j'étais riche... (If I were rich...), Si j'avais de l'argent... (If I had money...)",
    },
    {
      term: "Giving Advice: Si j'étais toi",
      definition: "'If I were you...' - super common for giving advice!",
      example: "Si j'étais toi, je ferais ça (If I were you, I'd do that)",
    },
  ],

  vocabularyReference: [
    {
      french: "si j'étais riche",
      english: "if I were rich",
      note: "⭐ daydreaming!",
    },
    {
      french: "si j'avais de l'argent",
      english: "if I had money",
      note: "fantasy scenario",
    },
    {
      french: "si j'étais toi",
      english: "if I were you",
      note: "giving advice",
    },
    {
      french: "si tu étais ici",
      english: "if you were here",
      note: "wishing someone was present",
    },
    {
      french: "si on avait le temps",
      english: "if we had time",
      note: "hypothetical plan",
    },
    {
      french: "je voyagerais le monde",
      english: "I'd travel the world",
      note: "result of fantasy",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Start a daydream: 'If I were rich...'",
        prompt: "If I were rich",
        hint: "si + j'étais riche",
        expectedAnswer: "si j'étais riche",
        wrongAnswers: [
          {
            answer: "si je suis riche",
            feedback:
              "For fantasy (you're NOT rich), use past: si j'étais riche",
          },
        ],
      },
      {
        instruction: "Start a fantasy: 'If I had money...'",
        prompt: "If I had money",
        hint: "si + j'avais de l'argent",
        expectedAnswer: "si j'avais de l'argent",
        acceptableAnswers: ["si j'avais l'argent"],
        wrongAnswers: [],
      },
      {
        instruction: "Give advice starting with 'If I were you...'",
        prompt: "If I were you",
        hint: "si + j'étais toi",
        expectedAnswer: "si j'étais toi",
        wrongAnswers: [],
      },
      {
        instruction: "Express wishing someone were present",
        prompt: "If you were here",
        hint: "si + tu étais ici",
        expectedAnswer: "si tu étais ici",
        wrongAnswers: [],
      },
      {
        instruction: "Suggest hypothetical plan 'if we had time'",
        prompt: "If we had time",
        hint: "si + on avait le temps",
        expectedAnswer: "si on avait le temps",
        wrongAnswers: [],
      },
      {
        instruction: "Say what you'd do in fantasy: 'I'd travel the world'",
        prompt: "I'd travel the world",
        hint: "je + voyagerais le monde",
        expectedAnswer: "je voyagerais le monde",
        wrongAnswers: [
          {
            answer: "je voyage le monde",
            feedback: "That's present! For 'would', use: je voyagerais",
          },
        ],
      },
    ],
  },
};
