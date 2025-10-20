/**
 * Module 120: Opinion Phrases - Je pense que vs Je ne pense pas que
 * Unit 10 - Expressing opinions and doubt diplomatically
 */

export const opinionPhrasesModule = {
  moduleKey: "2024-01-29-opinion-phrases", // Permanent identifier - never changes
  title: "Je pense que... - Opinion Phrases",
  description:
    "Express opinions diplomatically! 'Je pense qu'il vient' (I think he's coming - belief), 'Je ne pense pas qu'il vienne' (I don't think he's coming - doubt). Sound sophisticated!",
  unit: 10,

  concepts: [
    {
      term: "Positive Opinion = Belief",
      definition: "'Je pense que...' expresses what you believe is true",
      example: "Je pense qu'il vient (I think he's coming - I believe it)",
    },
    {
      term: "Negative Opinion = Doubt",
      definition:
        "'Je ne pense pas que...' expresses uncertainty - more diplomatic!",
      example:
        "Je ne pense pas qu'il vienne (I don't think he's coming - diplomatic disagreement)",
    },
    {
      term: "Diplomatic Communication",
      definition: "'Je ne pense pas que...' sounds gentler than saying 'Non!'",
      example:
        "Instead of 'That's wrong!', say 'Je ne pense pas que ce soit vrai' (I don't think that's true)",
    },
  ],

  vocabularyReference: [
    {
      french: "je pense qu'il vient",
      english: "I think he's coming",
      note: "⭐ expressing belief",
    },
    {
      french: "je ne pense pas qu'il vienne",
      english: "I don't think he's coming",
      note: "diplomatic doubt",
    },
    {
      french: "je doute qu'elle sache",
      english: "I doubt she knows",
      note: "expressing uncertainty",
    },
    {
      french: "je ne crois pas qu'il ait raison",
      english: "I don't think he's right",
      note: "polite disagreement",
    },
    {
      french: "je ne pense pas que ce soit vrai",
      english: "I don't think that's true",
      note: "diplomatic correction",
    },
    {
      french: "je doute que ce soit possible",
      english: "I doubt that's possible",
      note: "expressing skepticism",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Express belief that someone is coming",
        prompt: "I think he's coming",
        hint: "je pense qu' + il + vient",
        expectedAnswer: "je pense qu'il vient",
        wrongAnswers: [],
      },
      {
        instruction: "Diplomatically express doubt someone is coming",
        prompt: "I don't think he's coming",
        hint: "je ne pense pas qu' + il + vienne",
        expectedAnswer: "je ne pense pas qu'il vienne",
        wrongAnswers: [
          {
            answer: "je ne pense pas qu'il vient",
            feedback:
              "After negative opinion, use 'vienne': je ne pense pas qu'il vienne",
          },
        ],
      },
      {
        instruction: "Express doubt that someone knows something",
        prompt: "I doubt she knows",
        hint: "je doute que + elle + sache",
        expectedAnswer: "je doute qu'elle sache",
        wrongAnswers: [
          {
            answer: "je doute qu'elle sait",
            feedback: "After 'douter', use 'sache': je doute qu'elle sache",
          },
        ],
      },
      {
        instruction: "Politely disagree that someone is right",
        prompt: "I don't think he's right",
        hint: "je ne crois pas qu' + il + ait raison",
        expectedAnswer: "je ne crois pas qu'il ait raison",
        wrongAnswers: [],
      },
      {
        instruction: "Diplomatically say you don't think something is true",
        prompt: "I don't think that's true",
        hint: "je ne pense pas que + ce + soit vrai",
        expectedAnswer: "je ne pense pas que ce soit vrai",
        wrongAnswers: [
          {
            answer: "je ne pense pas que c'est vrai",
            feedback:
              "After negative opinion, use 'soit': je ne pense pas que ce soit vrai",
          },
        ],
      },
      {
        instruction: "Express skepticism that something is possible",
        prompt: "I doubt that's possible",
        hint: "je doute que + ce + soit possible",
        expectedAnswer: "je doute que ce soit possible",
        wrongAnswers: [],
      },
    ],
  },
};
