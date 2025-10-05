/**
 * Module: avoir besoin de (to need)
 * Unit 6 - Essential expression for expressing needs
 * Uses avoir + besoin + de (noun/infinitive)
 */

export const besoinModule = {
  title: "avoir besoin de - To Need",
  description:
    "Express what you need: j'ai besoin de (I need), avoir besoin d'aide (to need help), avoir besoin de manger (to need to eat)",

  concepts: [
    {
      term: "avoir besoin de = to need",
      definition:
        "Literally 'to have need of' - use avoir + besoin + de + noun/verb",
      example:
        "j'ai besoin de café (I need coffee), tu as besoin d'aide (you need help)",
    },
    {
      term: "Structure: avoir + besoin + de",
      definition:
        "Always use this three-part structure - conjugate avoir, besoin stays the same",
      example:
        "j'ai besoin, tu as besoin, il a besoin, nous avons besoin, vous avez besoin, ils ont besoin",
    },
    {
      term: "With nouns - de + noun",
      definition: "After besoin, use 'de' (or d' before vowel) before the noun",
      example:
        "j'ai besoin de temps (I need time), j'ai besoin d'argent (I need money)",
    },
    {
      term: "With verbs - de + infinitive",
      definition: "To say you need TO DO something, use de + infinitive verb",
      example:
        "j'ai besoin de manger (I need to eat), tu as besoin de partir (you need to leave)",
    },
    {
      term: "Negative form",
      definition: "Put ne...pas around avoir: je n'ai pas besoin de...",
      example:
        "je n'ai pas besoin d'aide (I don't need help), tu n'as pas besoin de ça (you don't need that)",
    },
  ],

  vocabularyReference: [
    {
      french: "besoin",
      english: "need",
      note: "noun (masculine) - le besoin",
    },
    {
      french: "avoir besoin de",
      english: "to need / to have need of",
      note: "essential expression",
    },
    {
      french: "j'ai besoin de",
      english: "I need",
      note: "j'ai (I have) + besoin + de",
    },
    {
      french: "tu as besoin de",
      english: "you need (informal)",
      note: "conjugate avoir",
    },
    {
      french: "il/elle a besoin de",
      english: "he/she needs",
      note: "il/elle a + besoin + de",
    },
    {
      french: "nous avons besoin de",
      english: "we need",
      note: "nous avons + besoin + de",
    },
    {
      french: "vous avez besoin de",
      english: "you need (formal/plural)",
      note: "vous avez + besoin + de",
    },
    {
      french: "ils/elles ont besoin de",
      english: "they need",
      note: "ils/elles ont + besoin + de",
    },
    {
      french: "j'ai besoin d'aide",
      english: "I need help",
      note: "de → d' before vowel",
    },
    {
      french: "j'ai besoin d'argent",
      english: "I need money",
      note: "very common phrase",
    },
    {
      french: "j'ai besoin de temps",
      english: "I need time",
      note: "common phrase",
    },
    {
      french: "je n'ai pas besoin de",
      english: "I don't need",
      note: "negative - ne...pas around avoir",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic structure with nouns
      {
        instruction: 'Say "I need help"',
        prompt: "I need help",
        hint: "j'ai besoin d'aide",
        expectedAnswer: "j'ai besoin d'aide",
        acceptableAnswers: ["j ai besoin d'aide", "j'ai besoin d aide"],
        wrongAnswers: [
          "je besoin d'aide",
          "j'ai besoin de aide",
          "je nécessite d'aide",
        ],
        explanation: "j'ai besoin d'aide - de → d' before vowel (aide)",
      },
      {
        instruction: 'Say "you need money"',
        prompt: "you need money",
        hint: "tu as besoin d'argent",
        expectedAnswer: "tu as besoin d'argent",
        acceptableAnswers: ["tu as besoin d'argent", "tu as besoin d argent"],
        wrongAnswers: [
          "tu besoin d'argent",
          "tu as besoin de argent",
          "tu nécessites d'argent",
        ],
        explanation: "tu as besoin d'argent (you need money) - d' before vowel",
      },
      {
        instruction: 'Say "I need time"',
        prompt: "I need time",
        hint: "j'ai besoin de temps",
        expectedAnswer: "j'ai besoin de temps",
        acceptableAnswers: ["j ai besoin de temps"],
        wrongAnswers: [
          "je besoin de temps",
          "j'ai besoin temps",
          "j'ai besoin du temps",
        ],
        explanation: "j'ai besoin de temps (I need time) - common phrase",
      },
      {
        instruction: 'Say "he needs water"',
        prompt: "he needs water",
        hint: "il a besoin d'eau",
        expectedAnswer: "il a besoin d'eau",
        acceptableAnswers: ["il a besoin d'eau", "il a besoin d eau"],
        wrongAnswers: [
          "il besoin d'eau",
          "il a besoin de eau",
          "il a besoin de l'eau",
        ],
        explanation: "il a besoin d'eau (he needs water) - d' before vowel",
      },
      {
        instruction: 'Say "she needs a car"',
        prompt: "she needs a car",
        hint: "elle a besoin d'une voiture",
        expectedAnswer: "elle a besoin d'une voiture",
        acceptableAnswers: [
          "elle a besoin d'une voiture",
          "elle a besoin d une voiture",
        ],
        wrongAnswers: [
          "elle besoin d'une voiture",
          "elle a besoin une voiture",
          "elle a besoin de la voiture",
        ],
        explanation:
          "elle a besoin d'une voiture (she needs a car) - d' before 'une'",
      },
      {
        instruction: 'Say "we need coffee"',
        prompt: "we need coffee",
        hint: "nous avons besoin de café",
        expectedAnswer: "nous avons besoin de café",
        acceptableAnswers: [
          "nous avons besoin de café",
          "nous avons besoin de cafe",
        ],
        wrongAnswers: [
          "nous besoin de café",
          "nous avons besoin café",
          "nous avons besoin du café",
        ],
        explanation: "nous avons besoin de café (we need coffee)",
      },
      {
        instruction: 'Say "you need sleep" (formal)',
        prompt: "you need sleep (formal)",
        hint: "vous avez besoin de sommeil",
        expectedAnswer: "vous avez besoin de sommeil",
        acceptableAnswers: ["vous avez besoin de sommeil"],
        wrongAnswers: [
          "vous besoin de sommeil",
          "vous avez besoin sommeil",
          "vous avez besoin du sommeil",
        ],
        explanation: "vous avez besoin de sommeil (you need sleep)",
      },
      {
        instruction: 'Say "they need space"',
        prompt: "they need space",
        hint: "ils ont besoin d'espace",
        expectedAnswer: "ils ont besoin d'espace",
        acceptableAnswers: [
          "ils ont besoin d'espace",
          "ils ont besoin d espace",
        ],
        wrongAnswers: [
          "ils besoin d'espace",
          "ils ont besoin espace",
          "ils ont besoin de l'espace",
        ],
        explanation:
          "ils ont besoin d'espace (they need space) - d' before vowel",
      },

      // With infinitives (need to do something)
      {
        instruction: 'Say "I need to eat"',
        prompt: "I need to eat",
        hint: "j'ai besoin de manger",
        expectedAnswer: "j'ai besoin de manger",
        acceptableAnswers: ["j ai besoin de manger"],
        wrongAnswers: [
          "je besoin de manger",
          "j'ai besoin manger",
          "je dois manger",
        ],
        explanation: "j'ai besoin de manger (I need to eat) - de + infinitive",
      },
      {
        instruction: 'Say "you need to leave"',
        prompt: "you need to leave",
        hint: "tu as besoin de partir",
        expectedAnswer: "tu as besoin de partir",
        acceptableAnswers: ["tu as besoin de partir"],
        wrongAnswers: [
          "tu besoin de partir",
          "tu as besoin partir",
          "tu dois partir",
        ],
        explanation:
          "tu as besoin de partir (you need to leave) - de + infinitive",
      },
      {
        instruction: 'Say "I need to sleep"',
        prompt: "I need to sleep",
        hint: "j'ai besoin de dormir",
        expectedAnswer: "j'ai besoin de dormir",
        acceptableAnswers: ["j ai besoin de dormir"],
        wrongAnswers: [
          "je besoin de dormir",
          "j'ai besoin dormir",
          "je dois dormir",
        ],
        explanation: "j'ai besoin de dormir (I need to sleep)",
      },
      {
        instruction: 'Say "she needs to work"',
        prompt: "she needs to work",
        hint: "elle a besoin de travailler",
        expectedAnswer: "elle a besoin de travailler",
        acceptableAnswers: ["elle a besoin de travailler"],
        wrongAnswers: [
          "elle besoin de travailler",
          "elle a besoin travailler",
          "elle doit travailler",
        ],
        explanation: "elle a besoin de travailler (she needs to work)",
      },
      {
        instruction: 'Say "we need to talk"',
        prompt: "we need to talk",
        hint: "nous avons besoin de parler",
        expectedAnswer: "nous avons besoin de parler",
        acceptableAnswers: ["nous avons besoin de parler"],
        wrongAnswers: [
          "nous besoin de parler",
          "nous avons besoin parler",
          "nous devons parler",
        ],
        explanation: "nous avons besoin de parler (we need to talk)",
      },
      {
        instruction: 'Say "they need to understand"',
        prompt: "they need to understand",
        hint: "ils ont besoin de comprendre",
        expectedAnswer: "ils ont besoin de comprendre",
        acceptableAnswers: ["ils ont besoin de comprendre"],
        wrongAnswers: [
          "ils besoin de comprendre",
          "ils ont besoin comprendre",
          "ils doivent comprendre",
        ],
        explanation: "ils ont besoin de comprendre (they need to understand)",
      },

      // Questions
      {
        instruction: 'Say "what do you need?"',
        prompt: "what do you need?",
        hint: "de quoi tu as besoin?",
        expectedAnswer: "de quoi tu as besoin?",
        acceptableAnswers: ["de quoi tu as besoin?", "de quoi tu as besoin"],
        wrongAnswers: [
          "quoi tu as besoin?",
          "qu'est-ce que tu as besoin?",
          "de quoi as-tu besoin?",
        ],
        explanation:
          "de quoi (of what) + tu as besoin (you have need) - 'de quoi' stays together",
      },
      {
        instruction: 'Say "do you need help?"',
        prompt: "do you need help?",
        hint: "tu as besoin d'aide?",
        expectedAnswer: "tu as besoin d'aide?",
        acceptableAnswers: [
          "tu as besoin d'aide?",
          "tu as besoin d aide?",
          "tu as besoin d'aide",
          "tu as besoin d aide",
        ],
        wrongAnswers: [
          "as-tu besoin d'aide?",
          "tu besoin d'aide?",
          "est-ce que tu as besoin d'aide?",
        ],
        explanation:
          "Simple question: tu as besoin d'aide? (do you need help?)",
      },
      {
        instruction: 'Say "does he need that?"',
        prompt: "does he need that?",
        hint: "il a besoin de ça?",
        expectedAnswer: "il a besoin de ça?",
        acceptableAnswers: [
          "il a besoin de ça?",
          "il a besoin de ca?",
          "il a besoin de ça",
          "il a besoin de ca",
        ],
        wrongAnswers: [
          "a-t-il besoin de ça?",
          "il besoin de ça?",
          "est-ce qu'il a besoin de ça?",
        ],
        explanation: "il a besoin de ça? (does he need that?)",
      },

      // Negative
      {
        instruction: 'Say "I don\'t need help"',
        prompt: "I don't need help",
        hint: "je n'ai pas besoin d'aide",
        expectedAnswer: "je n'ai pas besoin d'aide",
        acceptableAnswers: [
          "je n ai pas besoin d'aide",
          "je n'ai pas besoin d aide",
        ],
        wrongAnswers: [
          "je n'ai besoin pas d'aide",
          "je ai pas besoin d'aide",
          "je ne besoin pas d'aide",
        ],
        explanation:
          "Negative: je n'ai pas besoin d'aide - ne...pas around avoir",
      },
      {
        instruction: 'Say "you don\'t need that"',
        prompt: "you don't need that",
        hint: "tu n'as pas besoin de ça",
        expectedAnswer: "tu n'as pas besoin de ça",
        acceptableAnswers: [
          "tu n as pas besoin de ça",
          "tu n'as pas besoin de ca",
        ],
        wrongAnswers: [
          "tu n'as besoin pas de ça",
          "tu as pas besoin de ça",
          "tu ne besoin pas de ça",
        ],
        explanation: "tu n'as pas besoin de ça (you don't need that)",
      },
      {
        instruction: 'Say "she doesn\'t need to leave"',
        prompt: "she doesn't need to leave",
        hint: "elle n'a pas besoin de partir",
        expectedAnswer: "elle n'a pas besoin de partir",
        acceptableAnswers: ["elle n a pas besoin de partir"],
        wrongAnswers: [
          "elle n'a besoin pas de partir",
          "elle a pas besoin de partir",
          "elle ne besoin pas de partir",
        ],
        explanation:
          "elle n'a pas besoin de partir (she doesn't need to leave)",
      },
      {
        instruction: 'Say "we don\'t need money"',
        prompt: "we don't need money",
        hint: "nous n'avons pas besoin d'argent",
        expectedAnswer: "nous n'avons pas besoin d'argent",
        acceptableAnswers: [
          "nous n avons pas besoin d'argent",
          "nous n'avons pas besoin d argent",
        ],
        wrongAnswers: [
          "nous n'avons besoin pas d'argent",
          "nous avons pas besoin d'argent",
          "nous ne besoin pas d'argent",
        ],
        explanation: "nous n'avons pas besoin d'argent (we don't need money)",
      },

      // Past tense
      {
        instruction: 'Say "I needed help"',
        prompt: "I needed help",
        hint: "j'avais besoin d'aide",
        expectedAnswer: "j'avais besoin d'aide",
        acceptableAnswers: ["j avais besoin d'aide", "j'avais besoin d aide"],
        wrongAnswers: [
          "j'ai eu besoin d'aide",
          "je besoin d'aide",
          "j'ai besoin d'aide",
        ],
        explanation:
          "Past (imperfect): j'avais besoin d'aide (I needed/was needing help)",
      },
      {
        instruction: 'Say "you needed time"',
        prompt: "you needed time",
        hint: "tu avais besoin de temps",
        expectedAnswer: "tu avais besoin de temps",
        acceptableAnswers: ["tu avais besoin de temps"],
        wrongAnswers: [
          "tu as eu besoin de temps",
          "tu besoin de temps",
          "tu as besoin de temps",
        ],
        explanation: "tu avais besoin de temps (you needed time)",
      },
    ],
  },
};
