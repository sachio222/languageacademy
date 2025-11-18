/**
 * Module: mettre (to put / to set)
 * Unit 6 - Essential action verb, irregular conjugation
 * Common in everyday French - putting on clothes, setting table, etc.
 */

export const mettreModule = {
  moduleKey: "2024-04-21-mettre", // Permanent identifier - never changes
  title: "mettre - To Put / To Set",
  description:
    "Express putting and setting: je mets (I put), mettre la table (to set the table), mettre un pantalon (to put on pants)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express putting and placing things (I put, you set)",
      "Talk about setting the table and putting on clothes",
      "Use mettre in common daily expressions"
    ],
    realWorldUse: "talk about placing things and getting dressed",
    nextModuleTeaser: "Add demander to ask for things"
  },

  concepts: [
    {
      term: "mettre = to put / to set / to wear",
      definition:
        "Versatile verb - put things somewhere, set the table, put on clothes",
      example:
        "je mets le livre sur la table (I put the book on the table), je mets un pantalon (I put on pants)",
    },
    {
      term: "Irregular conjugation",
      definition:
        "Present tense: je mets, tu mets, il met, nous mettons, vous mettez, ils mettent",
      example: "Notice: singular has single 't', plural has double 'tt'",
    },
    {
      term: "mettre la table",
      definition: "Common expression meaning 'to set the table'",
      example:
        "je mets la table (I set the table), tu peux mettre la table? (can you set the table?)",
    },
    {
      term: "mettre + clothing",
      definition: "Use mettre to say you're putting on or wearing clothes",
      example:
        "je mets un manteau (I put on a coat), qu'est-ce que tu mets? (what are you wearing?)",
    },
    {
      term: "Other common uses",
      definition:
        "mettre du temps (to take time), se mettre à (to start doing something)",
      example:
        "ça met deux heures (it takes two hours), je me mets à travailler (I start working)",
    },
  ],

  vocabularyReference: [
    {
      french: "mettre",
      english: "to put / to set / to wear",
      note: "infinitive form - irregular verb",
    },
    {
      french: "je mets",
      english: "I put / I set / I wear",
      note: "single 't' - silent 's'",
    },
    {
      french: "tu mets",
      english: "you put / you set / you wear (informal)",
      note: "same as je mets",
    },
    {
      french: "il/elle met",
      english: "he/she puts / sets / wears",
      note: "no 's' - single 't'",
    },
    {
      french: "nous mettons",
      english: "we put / we set / we wear",
      note: "double 'tt' + ons",
    },
    {
      french: "vous mettez",
      english: "you put / you set / you wear (formal/plural)",
      note: "double 'tt' + ez",
    },
    {
      french: "ils/elles mettent",
      english: "they put / they set / they wear",
      note: "double 'tt' + ent (silent)",
    },
    {
      french: "mettre la table",
      english: "to set the table",
      note: "very common expression",
    },
    {
      french: "mettre un pantalon",
      english: "to put on pants",
      note: "mettre + clothing",
    },
    {
      french: "mettre un manteau",
      english: "to put on a coat",
      note: "mettre + clothing",
    },
    {
      french: "mettre du temps",
      english: "to take time",
      note: "ça met du temps (it takes time)",
    },
    {
      french: "qu'est-ce que tu mets?",
      english: "what are you wearing?",
      note: "asking about clothes",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic conjugations
      {
        instruction: 'Say "I put"',
        prompt: "I put",
        hint: "je...",
        expectedAnswer: "je mets",
        acceptableAnswers: ["je mets"],
        wrongAnswers: ["je met", "je mettre", "je mette"],
        explanation: "Irregular: je mets (single 't', silent 's')",
      },
      {
        instruction: 'Say "you put" (informal)',
        prompt: "you put (informal)",
        hint: "tu...",
        expectedAnswer: "tu mets",
        acceptableAnswers: ["tu mets"],
        wrongAnswers: ["tu met", "tu mettre", "tu mettes"],
        explanation: "Same as je: tu mets",
      },
      {
        instruction: 'Say "she puts"',
        prompt: "she puts",
        hint: "elle...",
        expectedAnswer: "elle met",
        acceptableAnswers: ["elle met"],
        wrongAnswers: ["elle mets", "elle mettre", "elle mette"],
        explanation: "Third person: elle met (no 's'!)",
      },
      {
        instruction: 'Say "we put"',
        prompt: "we put",
        hint: "nous... (double t!)",
        expectedAnswer: "nous mettons",
        acceptableAnswers: ["nous mettons"],
        wrongAnswers: ["nous mets", "nous mettre", "nous metez"],
        explanation: "nous mettons - double 'tt' + ons",
      },
      {
        instruction: 'Say "you put" (formal)',
        prompt: "you put (formal)",
        hint: "vous... (double t!)",
        expectedAnswer: "vous mettez",
        acceptableAnswers: ["vous mettez"],
        wrongAnswers: ["vous mets", "vous mettre", "vous metons"],
        explanation: "vous mettez - double 'tt' + ez",
      },
      {
        instruction: 'Say "they put"',
        prompt: "they put",
        hint: "ils... (double t!)",
        expectedAnswer: "ils mettent",
        acceptableAnswers: ["ils mettent"],
        wrongAnswers: ["ils mets", "ils mettre", "ils metent"],
        explanation: "ils mettent - double 'tt' + ent (silent)",
      },

      // Setting the table
      {
        instruction: 'Say "I set the table"',
        prompt: "I set the table",
        hint: "je mets la table",
        expectedAnswer: "je mets la table",
        acceptableAnswers: ["je mets la table"],
        wrongAnswers: [
          "je met la table",
          "je mettre la table",
          "je pose la table",
        ],
        explanation: "Common phrase: je mets la table (I set the table)",
      },
      {
        instruction: 'Say "can you set the table?"',
        prompt: "can you set the table?",
        hint: "tu peux mettre la table?",
        expectedAnswer: "tu peux mettre la table?",
        acceptableAnswers: [
          "tu peux mettre la table?",
          "tu peux mettre la table",
        ],
        wrongAnswers: [
          "tu mets la table?",
          "peux-tu mettre la table?",
          "tu peut mettre la table?",
        ],
        explanation: "tu peux (can you) + mettre la table (set the table)",
      },
      {
        instruction: 'Say "we are setting the table"',
        prompt: "we are setting the table",
        hint: "nous mettons la table",
        expectedAnswer: "nous mettons la table",
        acceptableAnswers: ["nous mettons la table"],
        wrongAnswers: [
          "nous mets la table",
          "nous mettons le table",
          "nous mettre la table",
        ],
        explanation: "nous mettons (we put/set) + la table",
      },

      // Putting things places
      {
        instruction: 'Say "I put the book on the table"',
        prompt: "I put the book on the table",
        hint: "je mets le livre sur la table",
        expectedAnswer: "je mets le livre sur la table",
        acceptableAnswers: ["je mets le livre sur la table"],
        wrongAnswers: [
          "je met le livre sur la table",
          "je pose le livre sur la table",
          "je mettre le livre sur la table",
        ],
        explanation:
          "je mets (I put) + le livre (the book) + sur la table (on the table)",
      },
      {
        instruction: 'Say "you put that here"',
        prompt: "you put that here",
        hint: "tu mets ça ici",
        expectedAnswer: "tu mets ça ici",
        acceptableAnswers: ["tu mets ça ici", "tu mets ca ici"],
        wrongAnswers: ["tu met ça ici", "tu mettre ça ici", "tu poses ça ici"],
        explanation: "tu mets (you put) + ça (that) + ici (here)",
      },
      {
        instruction: 'Say "she puts her bag in the car"',
        prompt: "she puts her bag in the car",
        hint: "elle met son sac dans la voiture",
        expectedAnswer: "elle met son sac dans la voiture",
        acceptableAnswers: ["elle met son sac dans la voiture"],
        wrongAnswers: [
          "elle mets son sac dans la voiture",
          "elle mettre son sac dans la voiture",
          "elle met sa sac dans la voiture",
        ],
        explanation:
          "elle met (she puts - no 's'!) + son sac (her bag) + dans la voiture (in the car)",
      },

      // Clothing
      {
        instruction: 'Say "I put on a coat"',
        prompt: "I put on a coat",
        hint: "je mets un manteau",
        expectedAnswer: "je mets un manteau",
        acceptableAnswers: ["je mets un manteau"],
        wrongAnswers: [
          "je met un manteau",
          "je porte un manteau",
          "je mettre un manteau",
        ],
        explanation: "je mets (I put on) + un manteau (a coat)",
      },
      {
        instruction: 'Say "you put on pants"',
        prompt: "you put on pants",
        hint: "tu mets un pantalon",
        expectedAnswer: "tu mets un pantalon",
        acceptableAnswers: ["tu mets un pantalon"],
        wrongAnswers: [
          "tu met un pantalon",
          "tu portes un pantalon",
          "tu mettre un pantalon",
        ],
        explanation: "tu mets (you put on) + un pantalon (pants)",
      },
      {
        instruction: 'Say "what are you wearing?"',
        prompt: "what are you wearing?",
        hint: "qu'est-ce que tu mets?",
        expectedAnswer: "qu'est-ce que tu mets?",
        acceptableAnswers: [
          "qu'est-ce que tu mets?",
          "qu'est-ce que tu mets",
          "qu est-ce que tu mets?",
        ],
        wrongAnswers: [
          "qu'est-ce que tu portes?",
          "qu'est-ce que tu met?",
          "que tu mets?",
        ],
        explanation: "qu'est-ce que (what) + tu mets (you wear/put on)",
      },
      {
        instruction: 'Say "he is putting on a shirt"',
        prompt: "he is putting on a shirt",
        hint: "il met une chemise",
        expectedAnswer: "il met une chemise",
        acceptableAnswers: ["il met une chemise"],
        wrongAnswers: [
          "il mets une chemise",
          "il porte une chemise",
          "il mettre une chemise",
        ],
        explanation: "il met (he puts on) + une chemise (a shirt)",
      },
      {
        instruction: 'Say "we put on our shoes"',
        prompt: "we put on our shoes",
        hint: "nous mettons nos chaussures",
        expectedAnswer: "nous mettons nos chaussures",
        acceptableAnswers: ["nous mettons nos chaussures"],
        wrongAnswers: [
          "nous mets nos chaussures",
          "nous portons nos chaussures",
          "nous mettre nos chaussures",
        ],
        explanation: "nous mettons (we put on) + nos chaussures (our shoes)",
      },

      // Time expressions
      {
        instruction: 'Say "it takes time"',
        prompt: "it takes time",
        hint: "ça met du temps",
        expectedAnswer: "ça met du temps",
        acceptableAnswers: ["ça met du temps", "ca met du temps"],
        wrongAnswers: [
          "ça prend du temps",
          "ça mets du temps",
          "ça mettre du temps",
        ],
        explanation:
          "Idiomatic: ça met du temps (it takes time) - can also say 'ça prend du temps'",
      },
      {
        instruction: 'Say "it takes two hours"',
        prompt: "it takes two hours",
        hint: "ça met deux heures",
        expectedAnswer: "ça met deux heures",
        acceptableAnswers: ["ça met deux heures", "ca met deux heures"],
        wrongAnswers: [
          "ça mets deux heures",
          "ça mettre deux heures",
          "il met deux heures",
        ],
        explanation: "ça met deux heures (it takes two hours)",
      },

      // Past tense
      {
        instruction: 'Say "I put" (past)',
        prompt: "I put (past)",
        hint: "j'ai mis",
        expectedAnswer: "j'ai mis",
        acceptableAnswers: ["j ai mis"],
        wrongAnswers: ["j'ai met", "j'ai mets", "je mets"],
        explanation: "Passé composé: j'ai mis (irregular past participle)",
      },
      {
        instruction: 'Say "I set the table" (past)',
        prompt: "I set the table (past)",
        hint: "j'ai mis la table",
        expectedAnswer: "j'ai mis la table",
        acceptableAnswers: ["j ai mis la table"],
        wrongAnswers: [
          "j'ai met la table",
          "j'ai mets la table",
          "je mets la table",
        ],
        explanation: "j'ai mis la table (I set the table - past)",
      },
      {
        instruction: 'Say "you put on a coat" (past)',
        prompt: "you put on a coat (past)",
        hint: "tu as mis un manteau",
        expectedAnswer: "tu as mis un manteau",
        acceptableAnswers: ["tu as mis un manteau"],
        wrongAnswers: [
          "tu as met un manteau",
          "tu as mets un manteau",
          "tu mets un manteau",
        ],
        explanation: "tu as mis un manteau (you put on a coat - past)",
      },
    ],
  },
};
