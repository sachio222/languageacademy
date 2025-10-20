/**
 * Module 130: Il est possible que... - Possibility Phrases
 * Unit 10 - Expressing possibilities and maybes
 */

export const possibilityPhrasesModule = {
  title: "Il est possible que... - Possibility Phrases",
  description:
    "Express possibilities and uncertainties! 'Il est possible qu'il vienne' (It's possible he'll come), 'Peut-être qu'il viendra' (Maybe he'll come). Useful for planning!",
  unit: 10,

  concepts: [
    {
      term: "Il est possible que... - It's Possible That...",
      definition: "Express something that MIGHT happen (not certain!)",
      example:
        "Il est possible qu'il vienne (It's possible he'll come - not sure!)",
    },
    {
      term: "Peut-être - Maybe",
      definition: "Quick way to express uncertainty",
      example:
        "Peut-être qu'il viendra (Maybe he'll come), Peut-être demain (Maybe tomorrow)",
    },
    {
      term: "Planning and Hedging",
      definition: "Essential for making flexible plans!",
      example: "Il est possible qu'on parte demain (We might leave tomorrow)",
    },
  ],

  vocabularyReference: [
    {
      french: "il est possible qu'il vienne",
      english: "it's possible he'll come",
      note: "⭐ uncertain plan",
    },
    {
      french: "peut-être qu'il viendra",
      english: "maybe he'll come",
      note: "simple maybe",
    },
    {
      french: "il se peut que",
      english: "it may be that",
      note: "formal possibility",
    },
    {
      french: "il est possible qu'on parte",
      english: "it's possible we'll leave",
      note: "group planning",
    },
    {
      french: "peut-être demain",
      english: "maybe tomorrow",
      note: "quick hedge",
    },
    {
      french: "peut-être pas",
      english: "maybe not",
      note: "uncertainty",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Express possibility: 'It's possible he'll come'",
        prompt: "It's possible he'll come",
        hint: "il est possible qu' + il + vienne",
        expectedAnswer: "il est possible qu'il vienne",
        wrongAnswers: [
          {
            answer: "il est possible qu'il vient",
            feedback:
              "After 'il est possible que', use 'vienne': il est possible qu'il vienne",
          },
        ],
      },
      {
        instruction: "Simple maybe: 'Maybe he'll come'",
        prompt: "Maybe he'll come",
        hint: "peut-être qu' + il + viendra",
        expectedAnswer: "peut-être qu'il viendra",
        wrongAnswers: [],
      },
      {
        instruction: "Formal possibility: 'It may be that...' (formal)",
        prompt: "it may be that",
        hint: "il se peut que",
        expectedAnswer: "il se peut que",
        wrongAnswers: [],
      },
      {
        instruction: "Group planning: 'It's possible we'll leave'",
        prompt: "It's possible we'll leave",
        hint: "il est possible qu' + on + parte",
        expectedAnswer: "il est possible qu'on parte",
        wrongAnswers: [],
      },
      {
        instruction: "Quick hedge: 'maybe tomorrow'",
        prompt: "maybe tomorrow",
        hint: "peut-être + demain",
        expectedAnswer: "peut-être demain",
        wrongAnswers: [],
      },
      {
        instruction: "Express uncertainty: 'maybe not'",
        prompt: "maybe not",
        hint: "peut-être + pas",
        expectedAnswer: "peut-être pas",
        wrongAnswers: [],
      },
    ],
  },
};
