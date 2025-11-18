/**
 * Module: Should & Could
 * Unit 5 - Express advice and possibility
 * Conditional forms: devoir (should) and pouvoir (could)
 */

export const conditionals = {
  moduleKey: "2024-04-09-conditionals", // Permanent identifier - never changes
  title: "Should & Could - Advice and Possibility",
  description:
    "Give advice and express possibility: je devrais (I should), je pourrais (I could)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Give advice with 'should' (tu devrais partir)",
      "Express possibility with 'could' (je pourrais venir)",
      "Make suggestions and polite requests"
    ],
    realWorldUse: "give advice and express possibilities",
    nextModuleTeaser: "Add 'would' for even more polite requests"
  },

  concepts: [
    {
      term: "Should = devrais (conditional of devoir)",
      definition: "Give advice, suggestions, or express obligation softly",
      example:
        "tu devrais partir (you should leave), nous devrions parler (we should talk)",
    },
    {
      term: "Could = pourrais (conditional of pouvoir)",
      definition: "Express possibility or make polite requests",
      example:
        "je pourrais venir (I could come), vous pourriez m'aider (you could help me)",
    },
    {
      term: "Pattern: Alternating Should & Could",
      definition: "Practice both forms together - they work the same way!",
      example:
        "je devrais / je pourrais, tu devrais / tu pourrais, il devrait / il pourrait",
    },
    {
      term: "Negation",
      definition: "Use ne...pas around the conditional verb",
      example:
        "je ne devrais pas (I should not), tu ne pourrais pas (you could not)",
    },
  ],

  vocabularyReference: [
    {
      french: "je devrais",
      english: "I should",
      note: "conditional of devoir",
    },
    {
      french: "tu devrais",
      english: "you should (informal)",
      note: "conditional of devoir",
    },
    {
      french: "il/elle devrait",
      english: "he/she should",
      note: "conditional of devoir",
    },
    {
      french: "nous devrions",
      english: "we should",
      note: "conditional of devoir",
    },
    {
      french: "vous devriez",
      english: "you should (formal/plural)",
      note: "conditional of devoir",
    },
    {
      french: "ils/elles devraient",
      english: "they should",
      note: "conditional of devoir",
    },
    {
      french: "je pourrais",
      english: "I could",
      note: "conditional of pouvoir",
    },
    {
      french: "tu pourrais",
      english: "you could (informal)",
      note: "conditional of pouvoir",
    },
    {
      french: "il/elle pourrait",
      english: "he/she could",
      note: "conditional of pouvoir",
    },
    {
      french: "nous pourrions",
      english: "we could",
      note: "conditional of pouvoir",
    },
    {
      french: "vous pourriez",
      english: "you could (formal/plural)",
      note: "conditional of pouvoir",
    },
    {
      french: "ils/elles pourraient",
      english: "they could",
      note: "conditional of pouvoir",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // COUPLET 1: je devrais / je pourrais
      {
        instruction: 'Say "I should go"',
        prompt: "I should go",
        hint: "je + devrais + partir",
        expectedAnswer: "je devrais partir",
        wrongAnswers: [
          {
            answer: "je dois partir",
            feedback:
              "That's 'I must go' - use conditional 'devrais' for 'should'",
          },
        ],
      },
      {
        instruction: 'Say "I could come"',
        prompt: "I could come",
        hint: "je + pourrais + venir",
        expectedAnswer: "je pourrais venir",
        wrongAnswers: [
          {
            answer: "je peux venir",
            feedback:
              "That's 'I can come' - use conditional 'pourrais' for 'could'",
          },
        ],
      },

      // COUPLET 2: tu devrais / tu pourrais
      {
        instruction: 'Say "you should speak" (informal)',
        prompt: "you should speak",
        hint: "tu + devrais + parler",
        expectedAnswer: "tu devrais parler",
        wrongAnswers: [
          {
            answer: "tu dois parler",
            feedback: "That's 'you must speak' - use 'devrais' for 'should'",
          },
        ],
      },
      {
        instruction: 'Say "you could see" (informal)',
        prompt: "you could see",
        hint: "tu + pourrais + voir",
        expectedAnswer: "tu pourrais voir",
        wrongAnswers: [
          {
            answer: "tu peux voir",
            feedback: "That's 'you can see' - use 'pourrais' for 'could'",
          },
        ],
      },

      // COUPLET 3: il/elle devrait / il/elle pourrait
      {
        instruction: 'Say "he should work"',
        prompt: "he should work",
        hint: "il + devrait + travailler",
        expectedAnswer: "il devrait travailler",
        wrongAnswers: [
          {
            answer: "il devrais travailler",
            feedback: "Third person uses 'devrait' not 'devrais'",
          },
        ],
      },
      {
        instruction: 'Say "she could do it"',
        prompt: "she could do it",
        hint: "elle + pourrait + le faire",
        expectedAnswer: "elle pourrait le faire",
        wrongAnswers: [
          {
            answer: "elle pourrais le faire",
            feedback: "Third person uses 'pourrait' not 'pourrais'",
          },
        ],
      },

      // COUPLET 4: nous devrions / nous pourrions
      {
        instruction: 'Say "we should leave"',
        prompt: "we should leave",
        hint: "nous + devrions + partir",
        expectedAnswer: "nous devrions partir",
        wrongAnswers: [
          {
            answer: "nous devons partir",
            feedback: "That's 'we must leave' - use 'devrions' for 'should'",
          },
        ],
      },
      {
        instruction: 'Say "we could go"',
        prompt: "we could go",
        hint: "nous + pourrions + aller",
        expectedAnswer: "nous pourrions aller",
        wrongAnswers: [
          {
            answer: "nous pouvons aller",
            feedback: "That's 'we can go' - use 'pourrions' for 'could'",
          },
        ],
      },

      // COUPLET 5: vous devriez / vous pourriez
      {
        instruction: 'Say "you should come" (formal or plural)',
        prompt: "you should come (formal)",
        hint: "vous + devriez + venir",
        expectedAnswer: "vous devriez venir",
        wrongAnswers: [
          {
            answer: "vous devez venir",
            feedback: "That's 'you must come' - use 'devriez' for 'should'",
          },
        ],
      },
      {
        instruction: 'Say "you could see" (formal or plural)',
        prompt: "you could see (formal)",
        hint: "vous + pourriez + voir",
        expectedAnswer: "vous pourriez voir",
        wrongAnswers: [
          {
            answer: "vous pouvez voir",
            feedback: "That's 'you can see' - use 'pourriez' for 'could'",
          },
        ],
      },

      // COUPLET 6: ils/elles devraient / ils/elles pourraient
      {
        instruction: 'Say "they should work"',
        prompt: "they should work",
        hint: "ils/elles + devraient + travailler",
        expectedAnswer: "ils devraient travailler",
        acceptableAnswers: ["elles devraient travailler"],
        wrongAnswers: [
          {
            answer: "ils doivent travailler",
            feedback: "That's 'they must work' - use 'devraient' for 'should'",
          },
        ],
      },
      {
        instruction: 'Say "they could come"',
        prompt: "they could come",
        hint: "ils/elles + pourraient + venir",
        expectedAnswer: "ils pourraient venir",
        acceptableAnswers: ["elles pourraient venir"],
        wrongAnswers: [
          {
            answer: "ils peuvent venir",
            feedback: "That's 'they can come' - use 'pourraient' for 'could'",
          },
        ],
      },

      // NEGATION COUPLETS
      {
        instruction: 'Say "I should not go"',
        prompt: "I should not go",
        hint: "je ne devrais pas + partir",
        expectedAnswer: "je ne devrais pas partir",
        wrongAnswers: [
          {
            answer: "je ne dois pas partir",
            feedback: "Use conditional 'devrais' for 'should not'",
          },
        ],
      },
      {
        instruction: 'Say "I could not see"',
        prompt: "I could not see",
        hint: "je ne pourrais pas + voir",
        expectedAnswer: "je ne pourrais pas voir",
        wrongAnswers: [
          {
            answer: "je ne peux pas voir",
            feedback: "Use conditional 'pourrais' for 'could not'",
          },
        ],
      },

      {
        instruction: 'Say "you should not speak" (informal)',
        prompt: "you should not speak",
        hint: "tu ne devrais pas + parler",
        expectedAnswer: "tu ne devrais pas parler",
        wrongAnswers: [
          {
            answer: "tu devrais pas parler",
            feedback: "Need both 'ne' and 'pas': tu ne devrais pas",
          },
        ],
      },
      {
        instruction: 'Say "you could not do that" (informal)',
        prompt: "you could not do that",
        hint: "tu ne pourrais pas + faire ça",
        expectedAnswer: "tu ne pourrais pas faire ça",
        wrongAnswers: [
          {
            answer: "tu ne peux pas faire ça",
            feedback: "Use conditional 'pourrais' for 'could not'",
          },
        ],
      },

      {
        instruction: 'Say "we should not go"',
        prompt: "we should not go",
        hint: "nous ne devrions pas + partir",
        expectedAnswer: "nous ne devrions pas partir",
        wrongAnswers: [
          {
            answer: "nous ne devons pas partir",
            feedback: "Use conditional 'devrions' for 'should not'",
          },
        ],
      },
      {
        instruction: 'Say "they could not come"',
        prompt: "they could not come",
        hint: "ils ne pourraient pas + venir",
        expectedAnswer: "ils ne pourraient pas venir",
        acceptableAnswers: ["elles ne pourraient pas venir"],
        wrongAnswers: [
          {
            answer: "ils ne peuvent pas venir",
            feedback: "Use conditional 'pourraient' for 'could not'",
          },
        ],
      },

      // QUESTIONS
      {
        instruction: 'Say "should I go?"',
        prompt: "should I go?",
        hint: "est-ce que + je devrais + partir?",
        expectedAnswer: "est-ce que je devrais partir",
        wrongAnswers: [
          {
            answer: "est-ce que je dois partir",
            feedback: "Use conditional 'devrais' for 'should'",
          },
        ],
      },
      {
        instruction: 'Say "could you help me?" (informal - polite request)',
        prompt: "could you help me?",
        hint: "est-ce que tu pourrais + m'aider?",
        expectedAnswer: "est-ce que tu pourrais m'aider",
        acceptableAnswers: ["est-ce que tu pourrais m aider"],
        wrongAnswers: [
          {
            answer: "est-ce que tu peux m'aider",
            feedback:
              "Use 'pourrais' (could) for more polite request than 'peux' (can)",
          },
        ],
      },
    ],
  },
};
