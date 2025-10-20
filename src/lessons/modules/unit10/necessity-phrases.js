/**
 * Module: Dynamic ID (auto-assigned)7: Il faut que... - Necessity Phrases
 * Unit 10 - Top practical phrases for saying what's necessary
 */

export const necessityPhrasesModule = {
  moduleKey: "2024-01-28-necessity-phrases", // Permanent identifier - never changes
  title: "Il faut que... - Saying What's Necessary",
  description:
    "Learn to tell people what needs to happen! Essential phrases for parents, friends, work. 'Il faut que tu manges' (You need to eat), 'Il faut qu'on parte' (We need to leave).",
  unit: 10,

  concepts: [
    {
      term: "Il faut que... - Directed Necessity",
      definition:
        "Tell SOMEONE SPECIFIC what needs to happen. More direct than 'il faut + verb'",
      example:
        "Il faut manger (general: someone should eat) → Il faut que tu manges (YOU specifically need to eat)",
    },
    {
      term: "Parent/Friend Language",
      definition: "These phrases are used constantly in daily life!",
      example:
        "Parent to kid: 'Il faut que tu finisses tes devoirs' (You need to finish homework)",
    },
  ],

  vocabularyReference: [
    {
      french: "il faut que tu manges",
      english: "you need to eat",
      note: "⭐ parent to kid",
    },
    {
      french: "il faut que tu partes",
      english: "you need to leave",
      note: "telling someone to go",
    },
    {
      french: "il faut que j'aille",
      english: "I need to go",
      note: "saying you must leave",
    },
    {
      french: "il faut qu'on parte",
      english: "we need to leave",
      note: "group decision",
    },
    {
      french: "il faut que tu sois sage",
      english: "you need to be good",
      note: "parent to child",
    },
    {
      french: "il faut que tu fasses attention",
      english: "you need to pay attention",
      note: "be careful!",
    },
    {
      french: "il faut qu'elle vienne",
      english: "she needs to come",
      note: "expecting someone",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Tell your kid they need to eat (lunch is ready!)",
        prompt: "You need to eat",
        hint: "il faut que + tu + manges",
        expectedAnswer: "il faut que tu manges",
        wrongAnswers: [
          {
            answer: "il faut manger",
            feedback:
              "That's general! To tell SOMEONE specific, use: il faut que tu manges",
          },
        ],
      },
      {
        instruction: "Tell your friend they need to leave now",
        prompt: "You need to leave",
        hint: "il faut que + tu + partes",
        expectedAnswer: "il faut que tu partes",
        wrongAnswers: [],
      },
      {
        instruction: "Tell your group 'I need to go' (have to leave early)",
        prompt: "I need to go",
        hint: "il faut que + je + aille",
        expectedAnswer: "il faut que j'aille",
        wrongAnswers: [
          {
            answer: "il faut que je vais",
            feedback: "Use 'aille' not 'vais' after il faut que: j'aille",
          },
        ],
      },
      {
        instruction: "Tell your friends 'we need to leave' (time to go!)",
        prompt: "We need to leave",
        hint: "il faut que + on + parte",
        expectedAnswer: "il faut qu'on parte",
        wrongAnswers: [],
      },
      {
        instruction: "Tell a child they need to be good (parent language!)",
        prompt: "You need to be good",
        hint: "il faut que + tu + sois sage",
        expectedAnswer: "il faut que tu sois sage",
        wrongAnswers: [
          {
            answer: "il faut que tu es sage",
            feedback: "Use 'sois' not 'es' after il faut que: tu sois sage",
          },
        ],
      },
      {
        instruction: "Tell someone they need to pay attention (be careful!)",
        prompt: "You need to pay attention",
        hint: "il faut que + tu + fasses attention",
        expectedAnswer: "il faut que tu fasses attention",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she needs to come' (expecting someone to arrive)",
        prompt: "She needs to come",
        hint: "il faut que + elle + vienne",
        expectedAnswer: "il faut qu'elle vienne",
        wrongAnswers: [
          {
            answer: "il faut qu'elle vient",
            feedback: "Use 'vienne' not 'vient' after il faut que: elle vienne",
          },
        ],
      },
    ],
  },
};
