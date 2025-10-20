/**
 * Module 123: J'avais déjà... - "Had Already" Phrases
 * Unit 10 - Telling stories with "had already done"
 */

export const hadAlreadyPhrasesModule = {
  moduleKey: "2024-01-26-had-already-phrases", // Permanent identifier - never changes
  title: "J'avais déjà... - Had Already Done Phrases",
  description:
    "Add depth to stories! 'J'avais déjà mangé' (I had already eaten), 'J'étais déjà parti' (I had already left). Show what happened FIRST in a story.",
  unit: 10,

  concepts: [
    {
      term: "What Happened FIRST",
      definition:
        "Use 'j'avais déjà...' to show something happened BEFORE another past event",
      example:
        "Quand il est arrivé (when he arrived), j'avais déjà mangé (I had already eaten) - I ate FIRST, he arrived SECOND",
    },
    {
      term: "'Déjà' = Already",
      definition: "Often used with these phrases to emphasize 'already done'",
      example: "J'avais déjà fini (I had already finished)",
    },
  ],

  vocabularyReference: [
    {
      french: "j'avais déjà mangé",
      english: "I had already eaten",
      note: "⭐ very common!",
    },
    {
      french: "j'étais déjà parti",
      english: "I had already left",
      note: "explaining absence",
    },
    {
      french: "elle était déjà partie",
      english: "she had already left",
      note: "she left first",
    },
    {
      french: "j'avais déjà vu ce film",
      english: "I had already seen this movie",
      note: "previous experience",
    },
    {
      french: "il avait déjà commencé",
      english: "he had already started",
      note: "something began earlier",
    },
    {
      french: "nous avions déjà fini",
      english: "we had already finished",
      note: "completed before",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say you had already eaten (when someone arrived)",
        prompt: "I had already eaten",
        hint: "j'avais déjà mangé",
        expectedAnswer: "j'avais déjà mangé",
        wrongAnswers: [
          {
            answer: "j'ai déjà mangé",
            feedback:
              "That's just 'I ate'! For 'had eaten' (earlier in past), use: j'avais déjà mangé",
          },
        ],
      },
      {
        instruction: "Explain you had already left (why you weren't there)",
        prompt: "I had already left",
        hint: "j'étais déjà parti",
        expectedAnswer: "j'étais déjà parti",
        wrongAnswers: [],
      },
      {
        instruction: "Say she had already left (she left first)",
        prompt: "She had already left",
        hint: "elle était déjà partie",
        expectedAnswer: "elle était déjà partie",
        wrongAnswers: [],
      },
      {
        instruction:
          "Say you had already seen a movie (don't need to watch again)",
        prompt: "I had already seen this movie",
        hint: "j'avais déjà vu ce film",
        expectedAnswer: "j'avais déjà vu ce film",
        wrongAnswers: [],
      },
      {
        instruction: "Say he had already started (when you arrived)",
        prompt: "He had already started",
        hint: "il avait déjà commencé",
        expectedAnswer: "il avait déjà commencé",
        wrongAnswers: [],
      },
      {
        instruction:
          "Say you all had already finished (group completed earlier)",
        prompt: "We had already finished",
        hint: "nous avions déjà fini",
        expectedAnswer: "nous avions déjà fini",
        wrongAnswers: [],
      },
    ],
  },
};
