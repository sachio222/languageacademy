/**
 * Module 128: Pour que... - So That Phrases
 * Unit 10 - Explaining purpose and goals
 */

export const soThatPhrasesModule = {
  moduleKey: "2024-02-03-so-that-phrases", // Permanent identifier - never changes
  title: "Pour que... - So That Phrases",
  description:
    "Explain your purpose! 'Pour que tu comprennes' (So that you understand), 'Je t'explique pour que tu saches' (I'm explaining so you know). Goal-oriented communication!",
  unit: 10,

  concepts: [
    {
      term: "Pour que... - So That Someone Can...",
      definition: "Express your PURPOSE or GOAL for someone else",
      example:
        "Pour que tu comprennes (So that you understand), Pour qu'elle sache (So that she knows)",
    },
    {
      term: "Explaining Why You're Doing Something",
      definition: "Super useful for explaining your intentions!",
      example:
        "Je parle lentement pour que tu comprennes (I speak slowly so you understand)",
    },
  ],

  vocabularyReference: [
    {
      french: "pour que tu comprennes",
      english: "so that you understand",
      note: "⭐ explaining purpose!",
    },
    {
      french: "pour qu'elle sache",
      english: "so that she knows",
      note: "sharing information",
    },
    {
      french: "pour qu'on puisse",
      english: "so that we can",
      note: "group goal",
    },
    {
      french: "pour que tu sois content",
      english: "so that you're happy",
      note: "pleasing someone",
    },
    {
      french: "pour qu'il vienne",
      english: "so that he comes",
      note: "invitation purpose",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Explain your purpose: 'so that you understand'",
        prompt: "so that you understand",
        hint: "pour que + tu + comprennes",
        expectedAnswer: "pour que tu comprennes",
        wrongAnswers: [
          {
            answer: "pour que tu comprends",
            feedback:
              "After 'pour que', use 'comprennes': pour que tu comprennes",
          },
        ],
      },
      {
        instruction: "Express goal: 'so that she knows'",
        prompt: "so that she knows",
        hint: "pour qu' + elle + sache",
        expectedAnswer: "pour qu'elle sache",
        wrongAnswers: [
          {
            answer: "pour qu'elle sait",
            feedback: "After 'pour que', use 'sache': pour qu'elle sache",
          },
        ],
      },
      {
        instruction: "Group goal: 'so that we can' (ability)",
        prompt: "so that we can",
        hint: "pour qu' + on + puisse",
        expectedAnswer: "pour qu'on puisse",
        wrongAnswers: [],
      },
      {
        instruction: "Express intention: 'so that you're happy'",
        prompt: "so that you're happy",
        hint: "pour que + tu + sois content",
        expectedAnswer: "pour que tu sois content",
        wrongAnswers: [],
      },
      {
        instruction: "Invitation purpose: 'so that he comes'",
        prompt: "so that he comes",
        hint: "pour qu' + il + vienne",
        expectedAnswer: "pour qu'il vienne",
        wrongAnswers: [
          {
            answer: "pour qu'il vient",
            feedback: "After 'pour que', use 'vienne': pour qu'il vienne",
          },
        ],
      },
    ],
  },
};
