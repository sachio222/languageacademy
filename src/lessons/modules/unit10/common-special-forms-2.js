/**
 * Module: Dynamic ID (auto-assigned)6: Common Special Forms Part 2
 * Unit 10 - More essential verb forms for phrases
 * Just vocabulary - these appear in top French phrases!
 */

export const commonSpecialForms2Module = {
  moduleKey: "2024-01-24-common-special-forms-2", // Permanent identifier - never changes
  title: "More Forms for 'il faut que' and 'je veux que' Phrases",
  description:
    "More verb forms that appear after 'il faut que...' and 'je veux que...' phrases. vienne (come), parte (leave), puisse (can), sache (know), comprenne (understand). Essential for wishes and commands!",
  unit: 10,

  concepts: [
    {
      term: "More Verbs That Change After 'que'",
      definition:
        "Like the previous special forms module, these verbs change ONLY after phrases with 'que' (il faut que, je veux que, je suis content que, etc.)",
      example:
        "Normal: tu viens (you come) → After 'je veux que': tu viennes. Normal: tu peux (you can) → After 'il faut que': tu puisses",
    },
    {
      term: "When To Use vs When NOT To Use",
      definition:
        "USE: After 'que' in wish/need/emotion phrases. DON'T USE: For normal statements or questions.",
      example:
        "✓ Je veux que tu viennes (I want you to come). ✗ Tu viennes ici? (Wrong! Say: Tu viens ici?)",
    },
    {
      term: "The Trigger: Look for 'que'",
      definition:
        "If you see 'il faut/je veux/je suis content + QUE + person', use these forms. No 'que' = normal forms.",
      example:
        "Il faut partir (leave - normal). Il faut QUE tu partes (you leave - changed form!)",
    },
  ],

  vocabularyReference: [
    {
      french: "tu viennes",
      english: "you come",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle vienne",
      english: "he/she come",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "tu partes",
      english: "you leave",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle parte",
      english: "he/she leave",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "tu puisses",
      english: "you can",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle puisse",
      english: "he/she can",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "tu saches",
      english: "you know",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle sache",
      english: "he/she know",
      note: "used after 'il faut que' / 'je veux que'",
    },
    {
      french: "tu comprennes",
      english: "you understand",
      note: "⭐ used after 'il faut que' / 'je veux que'",
    },
    {
      french: "il/elle comprenne",
      english: "he/she understand",
      note: "used after 'il faut que' / 'je veux que'",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Translate the special form: tu viennes (venir)",
        prompt: "you come",
        hint: "special form of venir for 'tu'",
        expectedAnswer: "tu viennes",
        wrongAnswers: [
          {
            answer: "tu viens",
            feedback: "That's the normal form! The special form is: tu viennes",
          },
        ],
      },
      {
        instruction: "Translate the special form: il vienne (venir)",
        prompt: "he come",
        hint: "special form of venir for 'il'",
        expectedAnswer: "il vienne",
        wrongAnswers: [
          {
            answer: "il vient",
            feedback: "That's the normal form! The special form is: il vienne",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu partes (partir)",
        prompt: "you leave",
        hint: "special form of partir for 'tu'",
        expectedAnswer: "tu partes",
        wrongAnswers: [
          {
            answer: "tu pars",
            feedback: "That's the normal form! The special form is: tu partes",
          },
        ],
      },
      {
        instruction: "Translate the special form: il parte (partir)",
        prompt: "he leave",
        hint: "special form of partir for 'il'",
        expectedAnswer: "il parte",
        wrongAnswers: [
          {
            answer: "il part",
            feedback: "That's the normal form! The special form is: il parte",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu puisses (pouvoir)",
        prompt: "you can",
        hint: "special form of pouvoir for 'tu'",
        expectedAnswer: "tu puisses",
        wrongAnswers: [
          {
            answer: "tu peux",
            feedback: "That's the normal form! The special form is: tu puisses",
          },
        ],
      },
      {
        instruction: "Translate the special form: il puisse (pouvoir)",
        prompt: "he can",
        hint: "special form of pouvoir for 'il'",
        expectedAnswer: "il puisse",
        wrongAnswers: [
          {
            answer: "il peut",
            feedback: "That's the normal form! The special form is: il puisse",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu saches (savoir)",
        prompt: "you know",
        hint: "special form of savoir for 'tu'",
        expectedAnswer: "tu saches",
        wrongAnswers: [
          {
            answer: "tu sais",
            feedback: "That's the normal form! The special form is: tu saches",
          },
        ],
      },
      {
        instruction: "Translate the special form: elle sache (savoir)",
        prompt: "she know",
        hint: "special form of savoir for 'elle'",
        expectedAnswer: "elle sache",
        wrongAnswers: [
          {
            answer: "elle sait",
            feedback: "That's the normal form! The special form is: elle sache",
          },
        ],
      },
      {
        instruction: "Translate the special form: tu comprennes (comprendre)",
        prompt: "you understand",
        hint: "special form of comprendre for 'tu'",
        expectedAnswer: "tu comprennes",
        wrongAnswers: [
          {
            answer: "tu comprends",
            feedback:
              "That's the normal form! The special form is: tu comprennes",
          },
        ],
      },
      {
        instruction: "Translate the special form: il comprenne (comprendre)",
        prompt: "he understand",
        hint: "special form of comprendre for 'il'",
        expectedAnswer: "il comprenne",
        wrongAnswers: [
          {
            answer: "il comprend",
            feedback:
              "That's the normal form! The special form is: il comprenne",
          },
        ],
      },
    ],
  },
};
