/**
 * Module 118: Je veux que... - Wish Phrases
 * Unit 10 - Expressing what you want others to do
 */

export const wishPhrasesModule = {
  moduleKey: "2024-02-07-wish-phrases", // Permanent identifier - never changes
  title: "Je veux que... - Expressing Wishes",
  description:
    "Say what you want OTHERS to do! 'Je veux que tu viennes' (I want you to come), 'Je veux qu'il parte' (I want him to leave). Essential for relationships and work.",
  unit: 10,

  concepts: [
    {
      term: "Je veux que... - Directing Wishes",
      definition: "Express what you want SOMEONE ELSE to do (not yourself!)",
      example:
        "Je veux manger (I want to eat - me) → Je veux que tu manges (I want YOU to eat - you)",
    },
    {
      term: "Softer Version: J'aimerais que...",
      definition: "More polite way to express wishes",
      example: "J'aimerais que tu viennes (I'd like you to come)",
    },
  ],

  vocabularyReference: [
    {
      french: "je veux que tu viennes",
      english: "I want you to come",
      note: "⭐ inviting someone",
    },
    {
      french: "je veux qu'il parte",
      english: "I want him to leave",
      note: "wanting someone to go",
    },
    {
      french: "je veux que tu comprennes",
      english: "I want you to understand",
      note: "explaining something important",
    },
    {
      french: "j'aimerais que tu sois là",
      english: "I'd like you to be there",
      note: "polite wish",
    },
    {
      french: "je veux qu'on aille ensemble",
      english: "I want us to go together",
      note: "group plan",
    },
    {
      french: "je veux qu'elle sache",
      english: "I want her to know",
      note: "sharing information",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Tell your friend you want them to come to the party",
        prompt: "I want you to come",
        hint: "je veux que + tu + viennes",
        expectedAnswer: "je veux que tu viennes",
        wrongAnswers: [
          {
            answer: "je veux venir",
            feedback:
              "That's YOU coming! For THEM coming, use: je veux que tu viennes",
          },
        ],
      },
      {
        instruction: "Say you want someone annoying to leave",
        prompt: "I want him to leave",
        hint: "je veux que + il + parte",
        expectedAnswer: "je veux qu'il parte",
        wrongAnswers: [],
      },
      {
        instruction:
          "Tell someone you want them to understand something important",
        prompt: "I want you to understand",
        hint: "je veux que + tu + comprennes",
        expectedAnswer: "je veux que tu comprennes",
        wrongAnswers: [],
      },
      {
        instruction: "Politely say you'd like someone to be there (softer!)",
        prompt: "I'd like you to be there",
        hint: "j'aimerais que + tu + sois là",
        expectedAnswer: "j'aimerais que tu sois là",
        wrongAnswers: [
          {
            answer: "j'aimerais que tu es là",
            feedback: "Use 'sois' not 'es': j'aimerais que tu sois là",
          },
        ],
      },
      {
        instruction: "Suggest going together to your friend",
        prompt: "I want us to go together",
        hint: "je veux que + on + aille ensemble",
        expectedAnswer: "je veux qu'on aille ensemble",
        wrongAnswers: [],
      },
      {
        instruction: "Say you want her to know something (sharing info)",
        prompt: "I want her to know",
        hint: "je veux que + elle + sache",
        expectedAnswer: "je veux qu'elle sache",
        wrongAnswers: [
          {
            answer: "je veux qu'elle sait",
            feedback: "Use 'sache' not 'sait': je veux qu'elle sache",
          },
        ],
      },
    ],
  },
};
