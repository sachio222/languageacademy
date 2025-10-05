/**
 * Module: commander (to order)
 * Unit 6 - Practical restaurant/shopping verb, regular -ER conjugation
 * Essential for travel and daily life in France
 */

export const commanderModule = {
  title: "commander - To Order",
  description:
    "Order food, drinks, and products: je commande (I order), commander un café (to order a coffee), commander en ligne (to order online)",

  concepts: [
    {
      term: "commander = to order",
      definition:
        "Order food at restaurants, drinks at cafés, products online - regular -ER verb",
      example:
        "je commande un café (I order a coffee), nous commandons une pizza (we order a pizza)",
    },
    {
      term: "Regular -ER verb pattern",
      definition:
        "Follows same pattern as parler, demander - drop -er, add endings",
      example:
        "je commande, tu commandes, il commande, nous commandons, vous commandez, ils commandent",
    },
    {
      term: "Restaurant/café context",
      definition: "Most common use - ordering food and drinks in restaurants",
      example:
        "je commande un steak (I order a steak), vous commandez le menu? (are you ordering the set menu?)",
    },
    {
      term: "Online shopping",
      definition: "Also used for ordering products online or by phone",
      example:
        "je commande en ligne (I order online), commander sur Amazon (to order on Amazon)",
    },
    {
      term: "Similar to demander",
      definition:
        "Both mean 'to ask for', but commander specifically means 'to order' (more formal/transactional)",
      example:
        "demander = ask for (general), commander = order (restaurant/shop)",
    },
  ],

  vocabularyReference: [
    {
      french: "commander",
      english: "to order",
      note: "infinitive form - regular -ER verb",
    },
    {
      french: "je commande",
      english: "I order",
      note: "regular -ER ending: -e",
    },
    {
      french: "tu commandes",
      english: "you order (informal)",
      note: "regular -ER ending: -es",
    },
    {
      french: "il/elle commande",
      english: "he/she orders",
      note: "regular -ER ending: -e",
    },
    {
      french: "nous commandons",
      english: "we order",
      note: "regular -ER ending: -ons",
    },
    {
      french: "vous commandez",
      english: "you order (formal/plural)",
      note: "regular -ER ending: -ez",
    },
    {
      french: "ils/elles commandent",
      english: "they order",
      note: "regular -ER ending: -ent (silent)",
    },
    {
      french: "commander un café",
      english: "to order a coffee",
      note: "very common at cafés",
    },
    {
      french: "commander une pizza",
      english: "to order a pizza",
      note: "common phrase",
    },
    {
      french: "commander en ligne",
      english: "to order online",
      note: "modern shopping phrase",
    },
    {
      french: "je voudrais commander",
      english: "I would like to order",
      note: "polite restaurant phrase",
    },
    {
      french: "vous commandez?",
      english: "are you ready to order?",
      note: "waiter's question",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic conjugations
      {
        instruction: 'Say "I order"',
        prompt: "I order",
        hint: "je...",
        expectedAnswer: "je commande",
        acceptableAnswers: ["je commande"],
        wrongAnswers: ["je commandes", "je commander", "je command"],
        explanation: "Regular -ER verb: je commande",
      },
      {
        instruction: 'Say "you order" (informal)',
        prompt: "you order (informal)",
        hint: "tu...",
        expectedAnswer: "tu commandes",
        acceptableAnswers: ["tu commandes"],
        wrongAnswers: ["tu commande", "tu commander", "tu commands"],
        explanation: "Regular -ER: tu commandes (with -es)",
      },
      {
        instruction: 'Say "she orders"',
        prompt: "she orders",
        hint: "elle...",
        expectedAnswer: "elle commande",
        acceptableAnswers: ["elle commande"],
        wrongAnswers: ["elle commandes", "elle commander", "elle commands"],
        explanation: "Third person: elle commande",
      },
      {
        instruction: 'Say "we order"',
        prompt: "we order",
        hint: "nous...",
        expectedAnswer: "nous commandons",
        acceptableAnswers: ["nous commandons"],
        wrongAnswers: ["nous commande", "nous commander", "nous commandez"],
        explanation: "nous commandons - regular -ons ending",
      },
      {
        instruction: 'Say "you order" (formal)',
        prompt: "you order (formal)",
        hint: "vous...",
        expectedAnswer: "vous commandez",
        acceptableAnswers: ["vous commandez"],
        wrongAnswers: ["vous commande", "vous commander", "vous commandons"],
        explanation:
          "vous commandez - regular -ez ending (also: 'are you ordering?')",
      },
      {
        instruction: 'Say "they order"',
        prompt: "they order",
        hint: "ils...",
        expectedAnswer: "ils commandent",
        acceptableAnswers: ["ils commandent"],
        wrongAnswers: ["ils commande", "ils commander", "ils commandes"],
        explanation: "ils commandent - regular -ent (silent)",
      },

      // Restaurant context
      {
        instruction: 'Say "I order a coffee"',
        prompt: "I order a coffee",
        hint: "je commande un café",
        expectedAnswer: "je commande un café",
        acceptableAnswers: ["je commande un café", "je commande un cafe"],
        wrongAnswers: [
          "je commandes un café",
          "je commander un café",
          "je demande un café",
        ],
        explanation: "Very common: je commande un café (I order a coffee)",
      },
      {
        instruction: 'Say "you order a pizza"',
        prompt: "you order a pizza",
        hint: "tu commandes une pizza",
        expectedAnswer: "tu commandes une pizza",
        acceptableAnswers: ["tu commandes une pizza"],
        wrongAnswers: [
          "tu commande une pizza",
          "tu commander une pizza",
          "tu demandes une pizza",
        ],
        explanation: "tu commandes une pizza (you order a pizza)",
      },
      {
        instruction: 'Say "he orders a steak"',
        prompt: "he orders a steak",
        hint: "il commande un steak",
        expectedAnswer: "il commande un steak",
        acceptableAnswers: ["il commande un steak"],
        wrongAnswers: [
          "il commandes un steak",
          "il commander un steak",
          "il demande un steak",
        ],
        explanation: "il commande un steak (he orders a steak)",
      },
      {
        instruction: 'Say "she orders wine"',
        prompt: "she orders wine",
        hint: "elle commande du vin",
        expectedAnswer: "elle commande du vin",
        acceptableAnswers: ["elle commande du vin"],
        wrongAnswers: [
          "elle commandes du vin",
          "elle commander du vin",
          "elle commande le vin",
        ],
        explanation: "elle commande du vin (she orders wine) - use 'du' (some)",
      },
      {
        instruction: 'Say "we order the menu"',
        prompt: "we order the menu",
        hint: "nous commandons le menu",
        expectedAnswer: "nous commandons le menu",
        acceptableAnswers: ["nous commandons le menu"],
        wrongAnswers: [
          "nous commande le menu",
          "nous commandon le menu",
          "nous demandons le menu",
        ],
        explanation: "nous commandons le menu (we order the set menu)",
      },
      {
        instruction: 'Say "they order dessert"',
        prompt: "they order dessert",
        hint: "ils commandent le dessert",
        expectedAnswer: "ils commandent le dessert",
        acceptableAnswers: ["ils commandent le dessert"],
        wrongAnswers: [
          "ils commande le dessert",
          "ils commandons le dessert",
          "ils demandent le dessert",
        ],
        explanation: "ils commandent le dessert (they order dessert)",
      },

      // Polite/restaurant phrases
      {
        instruction: 'Say "I would like to order"',
        prompt: "I would like to order",
        hint: "je voudrais commander",
        expectedAnswer: "je voudrais commander",
        acceptableAnswers: ["je voudrais commander"],
        wrongAnswers: [
          "je veux commander",
          "je voudrais commande",
          "je voudrais demander",
        ],
        explanation: "Polite: je voudrais commander (I would like to order)",
      },
      {
        instruction: 'Say "are you ready to order?" (formal)',
        prompt: "are you ready to order? (formal)",
        hint: "vous commandez?",
        expectedAnswer: "vous commandez?",
        acceptableAnswers: ["vous commandez?", "vous commandez"],
        wrongAnswers: [
          "commandez-vous?",
          "vous commander?",
          "êtes-vous prêt à commander?",
        ],
        explanation:
          "Simple question waiters ask: vous commandez? (are you ordering?)",
      },
      {
        instruction: 'Say "what are you ordering?"',
        prompt: "what are you ordering?",
        hint: "qu'est-ce que tu commandes?",
        expectedAnswer: "qu'est-ce que tu commandes?",
        acceptableAnswers: [
          "qu'est-ce que tu commandes?",
          "qu'est-ce que tu commandes",
          "qu est-ce que tu commandes?",
        ],
        wrongAnswers: [
          "que tu commandes?",
          "qu'est-ce que tu commande?",
          "quoi tu commandes?",
        ],
        explanation: "qu'est-ce que (what) + tu commandes (you order)",
      },

      // Online shopping context
      {
        instruction: 'Say "I order online"',
        prompt: "I order online",
        hint: "je commande en ligne",
        expectedAnswer: "je commande en ligne",
        acceptableAnswers: ["je commande en ligne"],
        wrongAnswers: [
          "je commandes en ligne",
          "je commander en ligne",
          "je commande online",
        ],
        explanation: "je commande en ligne (I order online) - modern phrase",
      },
      {
        instruction: 'Say "you order on Amazon"',
        prompt: "you order on Amazon",
        hint: "tu commandes sur Amazon",
        expectedAnswer: "tu commandes sur Amazon",
        acceptableAnswers: ["tu commandes sur Amazon"],
        wrongAnswers: [
          "tu commande sur Amazon",
          "tu commander sur Amazon",
          "tu commandes à Amazon",
        ],
        explanation:
          "tu commandes sur Amazon (you order on Amazon) - use 'sur'",
      },
      {
        instruction: 'Say "we order by phone"',
        prompt: "we order by phone",
        hint: "nous commandons par téléphone",
        expectedAnswer: "nous commandons par téléphone",
        acceptableAnswers: [
          "nous commandons par téléphone",
          "nous commandons par telephone",
        ],
        wrongAnswers: [
          "nous commande par téléphone",
          "nous commandons en téléphone",
          "nous commandons avec téléphone",
        ],
        explanation:
          "nous commandons par téléphone (we order by phone) - use 'par'",
      },

      // Negative
      {
        instruction: 'Say "I\'m not ordering"',
        prompt: "I'm not ordering",
        hint: "je ne commande pas",
        expectedAnswer: "je ne commande pas",
        acceptableAnswers: ["je ne commande pas"],
        wrongAnswers: [
          "je ne commandes pas",
          "je commande pas",
          "je ne commander pas",
        ],
        explanation: "je ne commande pas (I'm not ordering)",
      },
      {
        instruction: 'Say "you don\'t order that"',
        prompt: "you don't order that",
        hint: "tu ne commandes pas ça",
        expectedAnswer: "tu ne commandes pas ça",
        acceptableAnswers: ["tu ne commandes pas ça", "tu ne commandes pas ca"],
        wrongAnswers: [
          "tu ne commande pas ça",
          "tu commandes pas ça",
          "tu ne commander pas ça",
        ],
        explanation: "tu ne commandes pas ça (you don't order that)",
      },

      // Past tense
      {
        instruction: 'Say "I ordered"',
        prompt: "I ordered",
        hint: "j'ai commandé",
        expectedAnswer: "j'ai commandé",
        acceptableAnswers: ["j ai commandé", "j'ai commande"],
        wrongAnswers: ["je commande", "j'ai commander", "j'ai commandai"],
        explanation:
          "Passé composé: j'ai commandé (regular -é past participle)",
      },
      {
        instruction: 'Say "we ordered a pizza"',
        prompt: "we ordered a pizza",
        hint: "nous avons commandé une pizza",
        expectedAnswer: "nous avons commandé une pizza",
        acceptableAnswers: [
          "nous avons commandé une pizza",
          "nous avons commande une pizza",
        ],
        wrongAnswers: [
          "nous commandons une pizza",
          "nous avons commander une pizza",
          "nous avons commandes une pizza",
        ],
        explanation: "nous avons commandé une pizza (we ordered a pizza)",
      },
      {
        instruction: 'Say "they ordered dessert"',
        prompt: "they ordered dessert",
        hint: "ils ont commandé le dessert",
        expectedAnswer: "ils ont commandé le dessert",
        acceptableAnswers: [
          "ils ont commandé le dessert",
          "ils ont commande le dessert",
        ],
        wrongAnswers: [
          "ils commandent le dessert",
          "ils ont commander le dessert",
          "ils ont commandes le dessert",
        ],
        explanation: "ils ont commandé le dessert (they ordered dessert)",
      },
    ],
  },
};
