/**
 * Module: Would Forms
 * Unit 5 - Express hypotheticals and polite desires
 * Conditional forms: vouloir (would like), aller (would go), faire (would do)
 */

export const wouldConditionals = {
  moduleKey: "2024-04-16-would-conditionals", // Permanent identifier - never changes
  title: "Would Forms - Hypotheticals and Desires",
  description:
    "Express hypothetical actions: je voudrais (I would like), j'irais (I would go), je ferais (I would do)",

  concepts: [
    {
      term: "Would like = voudrais (conditional of vouloir)",
      definition:
        "Express polite desires - more polite than 'je veux' (I want)",
      example:
        "je voudrais un café (I would like a coffee), nous voudrions partir (we would like to leave)",
    },
    {
      term: "Would go = irais (conditional of aller)",
      definition: "Express hypothetical movement or future possibility",
      example:
        "j'irais à Paris (I would go to Paris), ils iraient avec toi (they would go with you)",
    },
    {
      term: "Would do = ferais (conditional of faire)",
      definition: "Express hypothetical actions",
      example:
        "je ferais ça (I would do that), vous feriez quoi? (what would you do?)",
    },
    {
      term: "Negation with Would",
      definition: "Use ne...pas around the conditional verb",
      example:
        "je ne voudrais pas (I would not like), il n'irait pas (he would not go)",
    },
  ],

  vocabularyReference: [
    {
      french: "je voudrais",
      english: "I would like",
      note: "conditional of vouloir (review!)",
    },
    {
      french: "tu voudrais",
      english: "you would like (informal)",
      note: "conditional of vouloir",
    },
    {
      french: "il/elle voudrait",
      english: "he/she would like",
      note: "conditional of vouloir",
    },
    {
      french: "nous voudrions",
      english: "we would like",
      note: "conditional of vouloir",
    },
    {
      french: "vous voudriez",
      english: "you would like (formal/plural)",
      note: "conditional of vouloir",
    },
    {
      french: "ils/elles voudraient",
      english: "they would like",
      note: "conditional of vouloir",
    },
    {
      french: "j'irais",
      english: "I would go",
      note: "conditional of aller",
    },
    {
      french: "tu irais",
      english: "you would go (informal)",
      note: "conditional of aller",
    },
    {
      french: "il/elle irait",
      english: "he/she would go",
      note: "conditional of aller",
    },
    {
      french: "nous irions",
      english: "we would go",
      note: "conditional of aller",
    },
    {
      french: "vous iriez",
      english: "you would go (formal/plural)",
      note: "conditional of aller",
    },
    {
      french: "ils/elles iraient",
      english: "they would go",
      note: "conditional of aller",
    },
    {
      french: "je ferais",
      english: "I would do",
      note: "conditional of faire",
    },
    {
      french: "tu ferais",
      english: "you would do (informal)",
      note: "conditional of faire",
    },
    {
      french: "il/elle ferait",
      english: "he/she would do",
      note: "conditional of faire",
    },
    {
      french: "nous ferions",
      english: "we would do",
      note: "conditional of faire",
    },
    {
      french: "vous feriez",
      english: "you would do (formal/plural)",
      note: "conditional of faire",
    },
    {
      french: "ils/elles feraient",
      english: "they would do",
      note: "conditional of faire",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // WOULD LIKE - all persons
      {
        instruction: 'Say "I would like water" (polite request - review!)',
        prompt: "I would like water",
        hint: "je + voudrais + de l'eau",
        expectedAnswer: "je voudrais de l'eau",
        acceptableAnswers: ["je voudrais l'eau", "je voudrais de l eau"],
        wrongAnswers: [
          {
            answer: "je veux de l'eau",
            feedback: "That works but 'je voudrais' is more polite",
          },
        ],
      },
      {
        instruction: 'Say "you would like coffee" (informal)',
        prompt: "you would like coffee",
        hint: "tu + voudrais + du café",
        expectedAnswer: "tu voudrais du café",
        wrongAnswers: [
          {
            answer: "tu veux du café",
            feedback: "Use 'voudrais' (would like) for more politeness",
          },
        ],
      },
      {
        instruction: 'Say "she would like that"',
        prompt: "she would like that",
        hint: "elle + voudrait + ça",
        expectedAnswer: "elle voudrait ça",
        wrongAnswers: [
          {
            answer: "elle voudrais ça",
            feedback: "Third person uses 'voudrait' not 'voudrais'",
          },
        ],
      },
      {
        instruction: 'Say "we would like water"',
        prompt: "we would like water",
        hint: "nous + voudrions + de l'eau",
        expectedAnswer: "nous voudrions de l'eau",
        acceptableAnswers: ["nous voudrions de l eau", "nous voudrions l'eau"],
        wrongAnswers: [
          {
            answer: "nous voulons de l'eau",
            feedback: "Use 'voudrions' (would like) for more politeness",
          },
        ],
      },
      {
        instruction: 'Say "you would like coffee" (formal)',
        prompt: "you would like coffee (formal)",
        hint: "vous + voudriez + du café",
        expectedAnswer: "vous voudriez du café",
        wrongAnswers: [
          {
            answer: "vous voulez du café",
            feedback: "Use 'voudriez' (would like) for more politeness",
          },
        ],
      },
      {
        instruction: 'Say "they would like that"',
        prompt: "they would like that",
        hint: "ils/elles + voudraient + ça",
        expectedAnswer: "ils voudraient ça",
        acceptableAnswers: ["elles voudraient ça"],
        wrongAnswers: [
          {
            answer: "ils veulent ça",
            feedback: "Use 'voudraient' (would like) for conditional",
          },
        ],
      },

      // WOULD GO - all persons
      {
        instruction: 'Say "I would go to Paris"',
        prompt: "I would go to Paris",
        hint: "j'irais + à Paris",
        expectedAnswer: "j'irais à Paris",
        acceptableAnswers: ["j irais à Paris"],
        wrongAnswers: [
          {
            answer: "je vais à Paris",
            feedback: "That's 'I go/am going' - use 'j'irais' for 'would go'",
          },
        ],
      },
      {
        instruction: 'Say "you would go there" (informal)',
        prompt: "you would go there",
        hint: "tu + irais + là",
        expectedAnswer: "tu irais là",
        wrongAnswers: [
          {
            answer: "tu vas là",
            feedback: "That's 'you go/are going' - use 'irais' for 'would go'",
          },
        ],
      },
      {
        instruction: 'Say "he would go"',
        prompt: "he would go",
        hint: "il + irait",
        expectedAnswer: "il irait",
        wrongAnswers: [
          {
            answer: "il irais",
            feedback: "Third person uses 'irait' not 'irais'",
          },
        ],
      },
      {
        instruction: 'Say "we would go to Paris"',
        prompt: "we would go to Paris",
        hint: "nous + irions + à Paris",
        expectedAnswer: "nous irions à Paris",
        wrongAnswers: [
          {
            answer: "nous allons à Paris",
            feedback: "That's 'we go/are going' - use 'irions' for 'would go'",
          },
        ],
      },
      {
        instruction: 'Say "you would go there" (formal)',
        prompt: "you would go there (formal)",
        hint: "vous + iriez + là",
        expectedAnswer: "vous iriez là",
        wrongAnswers: [
          {
            answer: "vous allez là",
            feedback: "That's 'you go/are going' - use 'iriez' for 'would go'",
          },
        ],
      },
      {
        instruction: 'Say "they would go"',
        prompt: "they would go",
        hint: "ils/elles + iraient",
        expectedAnswer: "ils iraient",
        acceptableAnswers: ["elles iraient"],
        wrongAnswers: [
          {
            answer: "ils vont",
            feedback:
              "That's 'they go/are going' - use 'iraient' for 'would go'",
          },
        ],
      },

      // WOULD DO - all persons
      {
        instruction: 'Say "I would do that"',
        prompt: "I would do that",
        hint: "je ferais + ça",
        expectedAnswer: "je ferais ça",
        wrongAnswers: [
          {
            answer: "je fais ça",
            feedback: "That's 'I do that' - use 'ferais' for 'would do'",
          },
        ],
      },
      {
        instruction: 'Say "you would do it" (informal)',
        prompt: "you would do it",
        hint: "tu + ferais + ça",
        expectedAnswer: "tu ferais ça",
        wrongAnswers: [
          {
            answer: "tu fais ça",
            feedback: "That's 'you do it' - use 'ferais' for 'would do'",
          },
        ],
      },
      {
        instruction: 'Say "she would do that"',
        prompt: "she would do that",
        hint: "elle + ferait + ça",
        expectedAnswer: "elle ferait ça",
        wrongAnswers: [
          {
            answer: "elle ferais ça",
            feedback: "Third person uses 'ferait' not 'ferais'",
          },
        ],
      },
      {
        instruction: 'Say "we would do that"',
        prompt: "we would do that",
        hint: "nous + ferions + ça",
        expectedAnswer: "nous ferions ça",
        wrongAnswers: [
          {
            answer: "nous faisons ça",
            feedback: "That's 'we do that' - use 'ferions' for 'would do'",
          },
        ],
      },
      {
        instruction: 'Say "you would do it" (formal)',
        prompt: "you would do it (formal)",
        hint: "vous + feriez + ça",
        expectedAnswer: "vous feriez ça",
        wrongAnswers: [
          {
            answer: "vous faites ça",
            feedback: "That's 'you do it' - use 'feriez' for 'would do'",
          },
        ],
      },
      {
        instruction: 'Say "they would do that"',
        prompt: "they would do that",
        hint: "ils/elles + feraient + ça",
        expectedAnswer: "ils feraient ça",
        acceptableAnswers: ["elles feraient ça"],
        wrongAnswers: [
          {
            answer: "ils font ça",
            feedback: "That's 'they do that' - use 'feraient' for 'would do'",
          },
        ],
      },

      // NEGATIONS
      {
        instruction: 'Say "I would not like that"',
        prompt: "I would not like that",
        hint: "je ne voudrais pas + ça",
        expectedAnswer: "je ne voudrais pas ça",
        wrongAnswers: [
          {
            answer: "je ne veux pas ça",
            feedback: "Use conditional 'voudrais' for 'would not like'",
          },
        ],
      },
      {
        instruction: 'Say "I would not go"',
        prompt: "I would not go",
        hint: "je n'irais pas",
        expectedAnswer: "je n'irais pas",
        acceptableAnswers: ["je n irais pas"],
        wrongAnswers: [
          {
            answer: "je ne vais pas",
            feedback: "Use conditional 'irais' for 'would not go'",
          },
        ],
      },
      {
        instruction: 'Say "we would not do that"',
        prompt: "we would not do that",
        hint: "nous ne ferions pas + ça",
        expectedAnswer: "nous ne ferions pas ça",
        wrongAnswers: [
          {
            answer: "nous ne faisons pas ça",
            feedback: "Use conditional 'ferions' for 'would not do'",
          },
        ],
      },
    ],
  },
};
