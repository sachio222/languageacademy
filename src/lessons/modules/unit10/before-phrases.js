/**
 * Module 127: Avant que... - Before Phrases
 * Unit 10 - Timing and sequence phrases
 */

export const beforePhrasesModule = {
  title: "Avant que... - Before Phrases",
  description:
    "Talk about timing! 'Avant que tu partes' (Before you leave), 'Appelle-moi avant qu'il arrive' (Call me before he arrives). Sequence your actions!",
  unit: 10,

  concepts: [
    {
      term: "Avant que... - Before Someone Does Something",
      definition: "Use to talk about timing relative to someone else's action",
      example:
        "Avant que tu partes (Before you leave), Avant qu'il arrive (Before he arrives)",
    },
    {
      term: "Common in Daily Life",
      definition: "Coordinating actions, giving warnings, setting deadlines",
      example: "Finis avant que papa rentre! (Finish before dad gets home!)",
    },
  ],

  vocabularyReference: [
    {
      french: "avant que tu partes",
      english: "before you leave",
      note: "⭐ very common!",
    },
    {
      french: "avant qu'il arrive",
      english: "before he arrives",
      note: "timing coordination",
    },
    {
      french: "avant qu'elle vienne",
      english: "before she comes",
      note: "expecting someone",
    },
    {
      french: "avant qu'on parte",
      english: "before we leave",
      note: "group departure",
    },
    {
      french: "avant qu'il soit trop tard",
      english: "before it's too late",
      note: "urgency!",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'before you leave' (timing)",
        prompt: "before you leave",
        hint: "avant que + tu + partes",
        expectedAnswer: "avant que tu partes",
        wrongAnswers: [
          {
            answer: "avant que tu pars",
            feedback: "After 'avant que', use 'partes': avant que tu partes",
          },
        ],
      },
      {
        instruction: "Say 'before he arrives' (waiting for someone)",
        prompt: "before he arrives",
        hint: "avant qu' + il + arrive",
        expectedAnswer: "avant qu'il arrive",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'before she comes' (expecting someone)",
        prompt: "before she comes",
        hint: "avant qu' + elle + vienne",
        expectedAnswer: "avant qu'elle vienne",
        wrongAnswers: [
          {
            answer: "avant qu'elle vient",
            feedback: "After 'avant que', use 'vienne': avant qu'elle vienne",
          },
        ],
      },
      {
        instruction: "Say 'before we leave' (group timing)",
        prompt: "before we leave",
        hint: "avant qu' + on + parte",
        expectedAnswer: "avant qu'on parte",
        wrongAnswers: [],
      },
      {
        instruction: "Express urgency: 'before it's too late'",
        prompt: "before it's too late",
        hint: "avant qu' + il + soit trop tard",
        expectedAnswer: "avant qu'il soit trop tard",
        wrongAnswers: [
          {
            answer: "avant qu'il est trop tard",
            feedback:
              "After 'avant que', use 'soit': avant qu'il soit trop tard",
          },
        ],
      },
    ],
  },
};
