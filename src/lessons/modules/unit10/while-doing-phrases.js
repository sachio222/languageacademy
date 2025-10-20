/**
 * Module: Dynamic ID (auto-assigned)5: En mangeant... - While Doing Phrases
 * Unit 10 - Describe doing two things at once
 */

export const whileDoingPhrasesModule = {
  moduleKey: "2024-02-06-while-doing-phrases", // Permanent identifier - never changes
  title: "En mangeant... - While Doing Phrases",
  description:
    "Describe multitasking! 'En mangeant, je regarde la télé' (While eating, I watch TV), 'On apprend en pratiquant' (We learn by practicing). Natural speech patterns!",
  unit: 10,

  concepts: [
    {
      term: "En + -ant = While Doing",
      definition:
        "Describe two actions happening at the same time, or the METHOD you use",
      example:
        "En mangeant (while eating), en parlant (while speaking), en travaillant (while working)",
    },
    {
      term: "Common Uses",
      definition: "Multitasking, explaining method, simultaneous actions",
      example:
        "Je travaille en écoutant de la musique (I work while listening to music)",
    },
  ],

  vocabularyReference: [
    {
      french: "en mangeant",
      english: "while eating",
      note: "⭐ very common!",
    },
    {
      french: "en parlant",
      english: "while speaking",
      note: "during conversation",
    },
    {
      french: "en travaillant",
      english: "while working / by working",
      note: "can mean method or simultaneous",
    },
    {
      french: "en écoutant",
      english: "while listening",
      note: "multitasking",
    },
    {
      french: "en marchant",
      english: "while walking",
      note: "walking and talking",
    },
    {
      french: "en pratiquant",
      english: "by practicing",
      note: "method of learning",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'while eating' (during a meal)",
        prompt: "while eating",
        hint: "en + mangeant",
        expectedAnswer: "en mangeant",
        wrongAnswers: [
          {
            answer: "mangeant",
            feedback: "Need 'en' before! It's: en mangeant",
          },
        ],
      },
      {
        instruction: "Say 'while speaking' (during conversation)",
        prompt: "while speaking",
        hint: "en + parlant",
        expectedAnswer: "en parlant",
        wrongAnswers: [],
      },
      {
        instruction:
          "Say 'while working' or 'by working' (method/simultaneous)",
        prompt: "while working",
        hint: "en + travaillant",
        expectedAnswer: "en travaillant",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'while listening' (multitasking)",
        prompt: "while listening",
        hint: "en + écoutant",
        expectedAnswer: "en écoutant",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'while walking' (walking and doing something else)",
        prompt: "while walking",
        hint: "en + marchant",
        expectedAnswer: "en marchant",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'by practicing' (the method of learning)",
        prompt: "by practicing",
        hint: "en + pratiquant",
        expectedAnswer: "en pratiquant",
        wrongAnswers: [],
      },
    ],
  },
};
