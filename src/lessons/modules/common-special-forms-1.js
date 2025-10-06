/**
 * Module 115: Common Special Forms Part 1
 * Unit 10 - Essential verb forms for Unit 10 phrases
 * Just vocabulary - these appear in top French phrases!
 */

export const commonSpecialForms1Module = {
  title: "Forms Used After 'il faut que' and 'je veux que'",
  description:
    "Learn verb forms that appear after 'il faut que...' and 'je veux que...' phrases. sois (be), ait (have), aille (go), fasse (do). Essential for telling people what you want them to do!",
  unit: 10,

  concepts: [
    {
      term: "Why These Forms Exist",
      definition:
        "French uses different verb forms after phrases like 'il faut que' (someone needs to), 'je veux que' (I want someone to), 'je suis content que' (I'm happy that someone...). These express wishes, needs, or emotions about OTHER PEOPLE's actions.",
      example:
        "Normal statement: Tu es sage (You are good). Wish about you: Il faut que tu sois sage (You need to be good - different form!)",
    },
    {
      term: "Where You CAN Use These Forms",
      definition:
        "ONLY after certain phrases: il faut que, je veux que, je suis content que, j'ai peur que, avant que, pour que, bien que, etc.",
      example:
        "✓ Il faut que tu sois sage (You need to be good), ✓ Je veux qu'il aille (I want him to go)",
    },
    {
      term: "Where You CANNOT Use These Forms",
      definition:
        "DON'T use these for normal statements, questions, or with just il faut/je veux (no 'que')",
      example:
        "✗ Tu sois content? (Wrong! Say: Tu es content?). ✗ Il faut aller (Correct - no 'que' = normal form)",
    },
    {
      term: "The Trigger: Look for 'que'",
      definition:
        "If you see 'que' + a person after these starter phrases, use these forms!",
      example:
        "il faut QUE tu → use sois/aies/ailles/fasses, je veux QUE tu → use sois/aies/ailles/fasses",
    },
  ],

  vocabularyReference: [
    {
      french: "tu sois",
      english: "you be",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle soit",
      english: "he/she be",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "je sois",
      english: "I be",
      note: "used after 'il faut que'",
    },
    {
      french: "tu aies",
      english: "you have",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle ait",
      english: "he/she have",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "tu ailles",
      english: "you go",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle aille",
      english: "he/she go",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "tu fasses",
      english: "you do/make",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle fasse",
      english: "he/she do/make",
      note: "used after 'il faut que' / 'je veux que'",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Translate the special form: tu sois (être)",
        prompt: "you be",
        hint: "special form of être for 'tu'",
        expectedAnswer: "tu sois",
        wrongAnswers: [
          {
            answer: "tu es",
            feedback: "That's the normal form! The special form is: tu sois",
          },
        ],
      },
      {
        instruction: "Translate the special form: il soit (être)",
        prompt: "he be",
        hint: "special form of être for 'il'",
        expectedAnswer: "il soit",
        wrongAnswers: [
          {
            answer: "il est",
            feedback: "That's the normal form! The special form is: il soit",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu aies (avoir)",
        prompt: "you have",
        hint: "special form of avoir for 'tu'",
        expectedAnswer: "tu aies",
        wrongAnswers: [
          {
            answer: "tu as",
            feedback: "That's the normal form! The special form is: tu aies",
          },
        ],
      },
      {
        instruction: "Translate the special form: il ait (avoir)",
        prompt: "he have",
        hint: "special form of avoir for 'il'",
        expectedAnswer: "il ait",
        wrongAnswers: [
          {
            answer: "il a",
            feedback: "That's the normal form! The special form is: il ait",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu ailles (aller)",
        prompt: "you go",
        hint: "special form of aller for 'tu'",
        expectedAnswer: "tu ailles",
        wrongAnswers: [
          {
            answer: "tu vas",
            feedback: "That's the normal form! The special form is: tu ailles",
          },
        ],
      },
      {
        instruction: "Translate the special form: il aille (aller)",
        prompt: "he go",
        hint: "special form of aller for 'il'",
        expectedAnswer: "il aille",
        wrongAnswers: [
          {
            answer: "il va",
            feedback: "That's the normal form! The special form is: il aille",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu fasses (faire)",
        prompt: "you do/make",
        hint: "special form of faire for 'tu'",
        expectedAnswer: "tu fasses",
        wrongAnswers: [
          {
            answer: "tu fais",
            feedback: "That's the normal form! The special form is: tu fasses",
          },
        ],
      },
      {
        instruction: "Translate the special form: il fasse (faire)",
        prompt: "he do/make",
        hint: "special form of faire for 'il'",
        expectedAnswer: "il fasse",
        wrongAnswers: [
          {
            answer: "il fait",
            feedback: "That's the normal form! The special form is: il fasse",
          },
        ],
      },
    ],
  },
};
