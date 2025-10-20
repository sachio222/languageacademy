/**
 * Module: manger (to eat)
 * Unit 5 - Essential daily verb, regular -ER conjugation
 * High frequency verb (rank 52) - eating is universal!
 */

export const mangerModule = {
  moduleKey: "2024-04-12-manger", // Permanent identifier - never changes
  title: "manger - To Eat (Present & Past)",
  description:
    "Express what you eat: je mange du pain (I eat bread), j'ai mangé (I ate/have eaten)",

  concepts: [
    {
      term: "manger = to eat",
      definition: "Essential daily verb - talk about meals and food!",
      example:
        "je mange du pain (I eat bread), nous mangeons ensemble (we eat together)",
    },
    {
      term: "Regular -ER verb",
      definition: "Follows same pattern as parler and aimer",
      example:
        "je mange, tu manges, il mange, nous mangeons, vous mangez, ils mangent",
    },
    {
      term: "Passé Composé (Past Tense)",
      definition: "Use avoir + mangé to say 'ate' or 'have eaten'",
      example:
        "j'ai mangé (I ate/have eaten), tu as mangé (you ate), il a mangé (he ate)",
    },
    {
      term: "Past Participle: mangé",
      definition: "For -ER verbs, past participle is -é",
      example: "manger → mangé, parler → parlé, aimer → aimé",
    },
    {
      term: "With food nouns",
      definition:
        "Use partitive (du/de la/des) for some, or article for specific items",
      example:
        "je mange du pain (I eat some bread), je mange une pomme (I eat an apple)",
    },
  ],

  vocabularyReference: [
    {
      french: "manger",
      english: "to eat",
      note: "infinitive form - regular -ER verb",
    },
    // Present tense
    {
      french: "je mange",
      english: "I eat",
      note: "present tense",
    },
    {
      french: "tu manges",
      english: "you eat (informal)",
      note: "present tense",
    },
    {
      french: "il/elle mange",
      english: "he/she eats",
      note: "present tense",
    },
    {
      french: "nous mangeons",
      english: "we eat",
      note: "note: mangeons (not mangons)",
    },
    {
      french: "vous mangez",
      english: "you eat (formal/plural)",
      note: "present tense",
    },
    {
      french: "ils/elles mangent",
      english: "they eat",
      note: "present tense",
    },
    // Passé composé (past tense)
    {
      french: "j'ai mangé",
      english: "I ate / I have eaten",
      note: "passé composé - avoir + mangé",
    },
    {
      french: "tu as mangé",
      english: "you ate (informal)",
      note: "passé composé",
    },
    {
      french: "il/elle a mangé",
      english: "he/she ate",
      note: "passé composé",
    },
    {
      french: "nous avons mangé",
      english: "we ate",
      note: "passé composé",
    },
    {
      french: "vous avez mangé",
      english: "you ate (formal/plural)",
      note: "passé composé",
    },
    {
      french: "ils/elles ont mangé",
      english: "they ate",
      note: "passé composé",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I eat bread"',
        prompt: "I eat bread",
        hint: "je mange + du pain",
        expectedAnswer: "je mange du pain",
        wrongAnswers: [
          {
            answer: "je manger du pain",
            feedback: "Use conjugated form 'mange' not infinitive 'manger'",
          },
        ],
      },
      {
        instruction: 'Say "I eat a baguette"',
        prompt: "I eat a baguette",
        hint: "je mange + une baguette",
        expectedAnswer: "je mange une baguette",
        wrongAnswers: [
          {
            answer: "je mange un baguette",
            feedback: "baguette is feminine, use 'une' not 'un'",
          },
        ],
      },
      {
        instruction: 'Say "you eat pizza" (informal)',
        prompt: "you eat pizza",
        hint: "tu manges + de la pizza",
        expectedAnswer: "tu manges de la pizza",
        acceptableAnswers: ["tu manges la pizza", "tu manges une pizza"],
        wrongAnswers: [
          {
            answer: "tu mange de la pizza",
            feedback: "Add -s for tu: tu manges",
          },
        ],
      },
      {
        instruction: 'Say "you eat a croissant" (informal)',
        prompt: "you eat a croissant",
        hint: "tu manges + un croissant",
        expectedAnswer: "tu manges un croissant",
        wrongAnswers: [
          {
            answer: "tu mange un croissant",
            feedback: "Add -s for tu: tu manges",
          },
        ],
      },
      {
        instruction: 'Say "he eats meat"',
        prompt: "he eats meat",
        hint: "il mange + de la viande",
        expectedAnswer: "il mange de la viande",
        acceptableAnswers: ["il mange la viande"],
        wrongAnswers: [
          {
            answer: "il manges de la viande",
            feedback: "Don't add -s for il: il mange",
          },
        ],
      },
      {
        instruction: 'Say "she eats fish"',
        prompt: "she eats fish",
        hint: "elle mange + du poisson",
        expectedAnswer: "elle mange du poisson",
        acceptableAnswers: ["elle mange le poisson"],
        wrongAnswers: [
          {
            answer: "elle manges du poisson",
            feedback: "Don't add -s for elle: elle mange",
          },
        ],
      },
      {
        instruction: 'Say "we eat together"',
        prompt: "we eat together",
        hint: "nous mangeons + ensemble",
        expectedAnswer: "nous mangeons ensemble",
        wrongAnswers: [
          {
            answer: "nous mangons ensemble",
            feedback: "Use 'mangeons' for nous, not 'mangons'",
          },
          {
            answer: "nous mange ensemble",
            feedback: "Use 'mangeons' for nous: nous mangeons",
          },
        ],
      },
      {
        instruction: 'Say "we eat vegetables"',
        prompt: "we eat vegetables",
        hint: "nous mangeons + des légumes",
        expectedAnswer: "nous mangeons des légumes",
        acceptableAnswers: ["nous mangeons les légumes"],
        wrongAnswers: [
          {
            answer: "nous mangons des légumes",
            feedback: "Use 'mangeons' for nous, not 'mangons'",
          },
        ],
      },
      {
        instruction: 'Say "you eat well" (formal)',
        prompt: "you eat well (formal)",
        hint: "vous mangez + bien",
        expectedAnswer: "vous mangez bien",
        wrongAnswers: [
          {
            answer: "vous mange bien",
            feedback: "Use 'mangez' for vous: vous mangez",
          },
        ],
      },
      {
        instruction: 'Say "you eat a salad" (formal)',
        prompt: "you eat a salad (formal)",
        hint: "vous mangez + une salade",
        expectedAnswer: "vous mangez une salade",
        wrongAnswers: [
          {
            answer: "vous mangeons une salade",
            feedback: "Use 'mangez' for vous, not 'mangeons'",
          },
        ],
      },
      {
        instruction: 'Say "they eat chicken"',
        prompt: "they eat chicken",
        hint: "ils mangent + du poulet",
        expectedAnswer: "ils mangent du poulet",
        acceptableAnswers: ["elles mangent du poulet", "ils mangent le poulet"],
        wrongAnswers: [
          {
            answer: "ils mange du poulet",
            feedback: "Add -nt for ils: ils mangent",
          },
        ],
      },
      {
        instruction: 'Say "they eat fries"',
        prompt: "they eat fries",
        hint: "ils mangent + des frites",
        expectedAnswer: "ils mangent des frites",
        acceptableAnswers: [
          "elles mangent des frites",
          "ils mangent les frites",
        ],
        wrongAnswers: [
          {
            answer: "ils manges des frites",
            feedback: "Use 'mangent' for ils, not 'manges'",
          },
        ],
      },
      {
        instruction: 'Say "I do not eat meat"',
        prompt: "I don't eat meat",
        hint: "je ne mange pas + de viande (use 'de' after negation!)",
        expectedAnswer: "je ne mange pas de viande",
        wrongAnswers: [
          {
            answer: "je ne mange pas la viande",
            feedback: "After negation, use 'de' not 'la': pas de viande",
          },
          {
            answer: "je mange ne pas de viande",
            feedback: "Put 'ne' before verb: je ne mange pas",
          },
        ],
      },
      {
        instruction: 'Say "you do not eat fish" (informal)',
        prompt: "you don't eat fish",
        hint: "tu ne manges pas + de poisson",
        expectedAnswer: "tu ne manges pas de poisson",
        wrongAnswers: [
          {
            answer: "tu ne manges pas du poisson",
            feedback: "After negation, use 'de' not 'du': pas de poisson",
          },
        ],
      },
      {
        instruction: 'Say "we do not eat pizza"',
        prompt: "we don't eat pizza",
        hint: "nous ne mangeons pas + de pizza",
        expectedAnswer: "nous ne mangeons pas de pizza",
        wrongAnswers: [
          {
            answer: "nous ne mangons pas de pizza",
            feedback: "Use 'mangeons' for nous, not 'mangons'",
          },
        ],
      },
      {
        instruction: 'Say "I like to eat"',
        prompt: "I like to eat",
        hint: "j'aime + manger (infinitive!)",
        expectedAnswer: "j'aime manger",
        acceptableAnswers: ["j aime manger"],
        wrongAnswers: [
          {
            answer: "j'aime mange",
            feedback: "Use infinitive 'manger' after 'aimer', not 'mange'",
          },
        ],
      },
      {
        instruction: 'Say "I want to eat"',
        prompt: "I want to eat",
        hint: "je veux + manger",
        expectedAnswer: "je veux manger",
        wrongAnswers: [
          {
            answer: "je veux mange",
            feedback: "Use infinitive 'manger' after 'veux', not 'mange'",
          },
        ],
      },
      {
        instruction: 'Say "what do you eat?" (informal)',
        prompt: "what do you eat?",
        hint: "qu'est-ce que + tu manges?",
        expectedAnswer: "qu'est-ce que tu manges",
        acceptableAnswers: [
          "qu est-ce que tu manges",
          "quest-ce que tu manges",
        ],
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu mange",
            feedback: "Add -s for tu: tu manges",
          },
        ],
      },

      // PASSÉ COMPOSÉ - Past tense
      {
        instruction: 'Say "I ate" or "I have eaten"',
        prompt: "I ate",
        hint: "j'ai + mangé (past participle)",
        expectedAnswer: "j'ai mangé",
        acceptableAnswers: ["j ai mangé", "j'ai mange"],
        wrongAnswers: [
          {
            answer: "je mange",
            feedback: "That's present 'I eat' - use 'j'ai mangé' for past",
          },
          {
            answer: "j'avais mangé",
            feedback: "That's pluperfect - use 'j'ai mangé' for simple past",
          },
        ],
      },
      {
        instruction: 'Say "I ate bread"',
        prompt: "I ate bread",
        hint: "j'ai mangé + du pain",
        expectedAnswer: "j'ai mangé du pain",
        acceptableAnswers: ["j ai mangé du pain", "j'ai mange du pain"],
        wrongAnswers: [
          {
            answer: "je mange du pain",
            feedback: "That's present - use 'j'ai mangé' for past",
          },
        ],
      },
      {
        instruction: 'Say "you ate pizza" (informal)',
        prompt: "you ate pizza",
        hint: "tu as + mangé + une pizza",
        expectedAnswer: "tu as mangé une pizza",
        acceptableAnswers: ["tu as mange une pizza"],
        wrongAnswers: [
          {
            answer: "tu manges une pizza",
            feedback: "That's present - use 'tu as mangé' for past",
          },
        ],
      },
      {
        instruction: 'Say "he ate fish"',
        prompt: "he ate fish",
        hint: "il a + mangé + du poisson",
        expectedAnswer: "il a mangé du poisson",
        acceptableAnswers: ["il a mange du poisson"],
        wrongAnswers: [
          {
            answer: "il mange du poisson",
            feedback: "That's present - use 'il a mangé' for past",
          },
        ],
      },
      {
        instruction: 'Say "we ate together"',
        prompt: "we ate together",
        hint: "nous avons + mangé + ensemble",
        expectedAnswer: "nous avons mangé ensemble",
        acceptableAnswers: ["nous avons mange ensemble"],
        wrongAnswers: [
          {
            answer: "nous mangeons ensemble",
            feedback: "That's present - use 'nous avons mangé' for past",
          },
        ],
      },
      {
        instruction: 'Say "you ate well" (formal)',
        prompt: "you ate well (formal)",
        hint: "vous avez + mangé + bien",
        expectedAnswer: "vous avez mangé bien",
        acceptableAnswers: ["vous avez mange bien"],
        wrongAnswers: [
          {
            answer: "vous mangez bien",
            feedback: "That's present - use 'vous avez mangé' for past",
          },
        ],
      },
      {
        instruction: 'Say "they ate chicken"',
        prompt: "they ate chicken",
        hint: "ils ont + mangé + du poulet",
        expectedAnswer: "ils ont mangé du poulet",
        acceptableAnswers: [
          "elles ont mangé du poulet",
          "ils ont mange du poulet",
        ],
        wrongAnswers: [
          {
            answer: "ils mangent du poulet",
            feedback: "That's present - use 'ils ont mangé' for past",
          },
        ],
      },
      {
        instruction: 'Say "I did not eat"',
        prompt: "I didn't eat",
        hint: "je n'ai pas + mangé",
        expectedAnswer: "je n'ai pas mangé",
        acceptableAnswers: ["je n ai pas mangé", "je n'ai pas mange"],
        wrongAnswers: [
          {
            answer: "je ne mange pas",
            feedback: "That's present - use 'je n'ai pas mangé' for past",
          },
        ],
      },
    ],
  },
};
