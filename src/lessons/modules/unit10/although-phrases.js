/**
 * Module 129: Bien que... - Although Phrases
 * Unit 10 - Expressing contrasts and concessions
 */

export const althoughPhrasesModule = {
  moduleKey: "2024-01-20-although-phrases", // Permanent identifier - never changes
  title: "Bien que... - Although Phrases",
  description:
    "Express contrasts! 'Bien que je sois fatigué' (Although I'm tired), 'Bien qu'il fasse froid' (Even though it's cold). Sophisticated expression!",
  unit: 10,

  concepts: [
    {
      term: "Bien que... - Although / Even Though",
      definition: "Express doing something DESPITE another condition",
      example:
        "Bien que je sois fatigué, je travaille (Although I'm tired, I'm working)",
    },
    {
      term: "Showing Determination",
      definition: "Doing something despite obstacles - shows perseverance!",
      example:
        "Bien qu'il fasse froid, on sort (Even though it's cold, we're going out)",
    },
  ],

  vocabularyReference: [
    {
      french: "bien que je sois fatigué",
      english: "although I'm tired",
      note: "⭐ working despite tiredness",
    },
    {
      french: "bien qu'il fasse froid",
      english: "even though it's cold",
      note: "weather doesn't stop you",
    },
    {
      french: "bien que tu sois occupé",
      english: "although you're busy",
      note: "despite being busy",
    },
    {
      french: "bien qu'elle soit malade",
      english: "although she's sick",
      note: "persevering despite illness",
    },
    {
      french: "bien qu'on ait peu de temps",
      english: "although we have little time",
      note: "time pressure",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'although I'm tired' (working despite tiredness)",
        prompt: "although I'm tired",
        hint: "bien que + je + sois fatigué",
        expectedAnswer: "bien que je sois fatigué",
        wrongAnswers: [
          {
            answer: "bien que je suis fatigué",
            feedback: "After 'bien que', use 'sois': bien que je sois fatigué",
          },
        ],
      },
      {
        instruction: "Say 'even though it's cold' (going out anyway)",
        prompt: "even though it's cold",
        hint: "bien qu' + il + fasse froid",
        expectedAnswer: "bien qu'il fasse froid",
        wrongAnswers: [
          {
            answer: "bien qu'il fait froid",
            feedback: "After 'bien que', use 'fasse': bien qu'il fasse froid",
          },
        ],
      },
      {
        instruction: "Say 'although you're busy' (asking favor despite)",
        prompt: "although you're busy",
        hint: "bien que + tu + sois occupé",
        expectedAnswer: "bien que tu sois occupé",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'although she's sick' (persevering despite illness)",
        prompt: "although she's sick",
        hint: "bien qu' + elle + soit malade",
        expectedAnswer: "bien qu'elle soit malade",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'although we have little time' (time pressure)",
        prompt: "although we have little time",
        hint: "bien qu' + on + ait peu de temps",
        expectedAnswer: "bien qu'on ait peu de temps",
        wrongAnswers: [
          {
            answer: "bien qu'on a peu de temps",
            feedback:
              "After 'bien que', use 'ait': bien qu'on ait peu de temps",
          },
        ],
      },
    ],
  },
};
