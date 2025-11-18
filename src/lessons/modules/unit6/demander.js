/**
 * Module: demander (to ask)
 * Unit 6 - Essential communication verb, regular -ER conjugation
 * Rank 63 in top 100 - very high frequency
 */

export const demanderModule = {
  moduleKey: "2024-04-19-demander", // Permanent identifier - never changes
  title: "demander - To Ask",
  description:
    "Ask for things and information: je demande (I ask), demander de l'aide (to ask for help), demander à quelqu'un (to ask someone)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Ask for things and help (I ask, you ask, they ask)",
      "Request information and assistance",
      "Use demander with à and de correctly"
    ],
    realWorldUse: "ask for help and information",
    nextModuleTeaser: "Add commander to order food and products"
  },

  concepts: [
    {
      term: "demander = to ask (for)",
      definition:
        "Request things, ask questions, ask for help - regular -ER verb",
      example:
        "je demande de l'aide (I ask for help), tu demandes pourquoi? (you ask why?)",
    },
    {
      term: "Regular -ER verb pattern",
      definition:
        "Follows same pattern as parler - drop -er, add endings: -e, -es, -e, -ons, -ez, -ent",
      example:
        "je demande, tu demandes, il demande, nous demandons, vous demandez, ils demandent",
    },
    {
      term: "demander quelque chose (to ask for something)",
      definition: "Ask for objects, favors, information - direct object",
      example:
        "je demande un café (I ask for a coffee), il demande ton nom (he asks for your name)",
    },
    {
      term: "demander à quelqu'un (to ask someone)",
      definition: "Use 'à' when specifying who you're asking",
      example:
        "je demande à Marie (I ask Marie), tu demandes à ton père (you ask your father)",
    },
    {
      term: "demander de + infinitive",
      definition: "Ask someone TO DO something - use 'de' before verb",
      example:
        "je demande de partir (I ask to leave), il me demande de venir (he asks me to come)",
    },
    {
      term: "Common uses",
      definition:
        "demander de l'aide (ask for help), demander pardon (ask forgiveness), demander la permission (ask permission)",
      example:
        "je demande de l'aide (I ask for help), tu demandes pardon (you ask forgiveness)",
    },
  ],

  vocabularyReference: [
    {
      french: "demander",
      english: "to ask / to ask for",
      note: "infinitive form - regular -ER verb",
    },
    {
      french: "je demande",
      english: "I ask / I ask for",
      note: "regular -ER ending: -e",
    },
    {
      french: "tu demandes",
      english: "you ask / you ask for (informal)",
      note: "regular -ER ending: -es",
    },
    {
      french: "il/elle demande",
      english: "he/she asks / asks for",
      note: "regular -ER ending: -e",
    },
    {
      french: "nous demandons",
      english: "we ask / we ask for",
      note: "regular -ER ending: -ons",
    },
    {
      french: "vous demandez",
      english: "you ask / you ask for (formal/plural)",
      note: "regular -ER ending: -ez",
    },
    {
      french: "ils/elles demandent",
      english: "they ask / they ask for",
      note: "regular -ER ending: -ent (silent)",
    },
    {
      french: "demander de l'aide",
      english: "to ask for help",
      note: "very common phrase - rank 63!",
    },
    {
      french: "demander pardon",
      english: "to ask forgiveness / to apologize",
      note: "polite expression",
    },
    {
      french: "demander la permission",
      english: "to ask permission",
      note: "formal phrase",
    },
    {
      french: "demander à quelqu'un",
      english: "to ask someone",
      note: "use 'à' + person",
    },
    {
      french: "je te demande",
      english: "I ask you",
      note: "with object pronoun",
    },
    {
      french: "il me demande",
      english: "he asks me",
      note: "object pronoun before verb",
    },
    {
      french: "demander de faire",
      english: "to ask to do",
      note: "de + infinitive",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic conjugations
      {
        instruction: 'Say "I ask"',
        prompt: "I ask",
        hint: "je...",
        expectedAnswer: "je demande",
        acceptableAnswers: ["je demande"],
        wrongAnswers: ["je demandes", "je demander", "je demand"],
        explanation: "Regular -ER verb: je demande",
      },
      {
        instruction: 'Say "you ask" (informal)',
        prompt: "you ask (informal)",
        hint: "tu...",
        expectedAnswer: "tu demandes",
        acceptableAnswers: ["tu demandes"],
        wrongAnswers: ["tu demande", "tu demander", "tu demands"],
        explanation: "Regular -ER: tu demandes (with -es)",
      },
      {
        instruction: 'Say "he asks"',
        prompt: "he asks",
        hint: "il...",
        expectedAnswer: "il demande",
        acceptableAnswers: ["il demande"],
        wrongAnswers: ["il demandes", "il demander", "il demands"],
        explanation: "Third person: il demande",
      },
      {
        instruction: 'Say "we ask"',
        prompt: "we ask",
        hint: "nous...",
        expectedAnswer: "nous demandons",
        acceptableAnswers: ["nous demandons"],
        wrongAnswers: ["nous demande", "nous demander", "nous demandez"],
        explanation: "nous demandons - regular -ons ending",
      },
      {
        instruction: 'Say "you ask" (formal)',
        prompt: "you ask (formal)",
        hint: "vous...",
        expectedAnswer: "vous demandez",
        acceptableAnswers: ["vous demandez"],
        wrongAnswers: ["vous demande", "vous demander", "vous demandons"],
        explanation: "vous demandez - regular -ez ending",
      },
      {
        instruction: 'Say "they ask"',
        prompt: "they ask",
        hint: "ils...",
        expectedAnswer: "ils demandent",
        acceptableAnswers: ["ils demandent"],
        wrongAnswers: ["ils demande", "ils demander", "ils demandes"],
        explanation: "ils demandent - regular -ent (silent)",
      },

      // Asking for things
      {
        instruction: 'Say "I ask for help"',
        prompt: "I ask for help",
        hint: "je demande de l'aide",
        expectedAnswer: "je demande de l'aide",
        acceptableAnswers: ["je demande de l'aide", "je demande de l aide"],
        wrongAnswers: [
          "je demandes de l'aide",
          "je demander de l'aide",
          "je demande l'aide",
        ],
        explanation:
          "Very common: je demande de l'aide (I ask for help) - rank 63!",
      },
      {
        instruction: 'Say "you ask for a coffee"',
        prompt: "you ask for a coffee",
        hint: "tu demandes un café",
        expectedAnswer: "tu demandes un café",
        acceptableAnswers: ["tu demandes un café", "tu demandes un cafe"],
        wrongAnswers: [
          "tu demande un café",
          "tu demander un café",
          "tu demandes pour un café",
        ],
        explanation: "tu demandes (you ask for) + un café (a coffee)",
      },
      {
        instruction: 'Say "she asks for the bill"',
        prompt: "she asks for the bill",
        hint: "elle demande l'addition",
        expectedAnswer: "elle demande l'addition",
        acceptableAnswers: [
          "elle demande l'addition",
          "elle demande l addition",
        ],
        wrongAnswers: [
          "elle demandes l'addition",
          "elle demander l'addition",
          "elle demande la facture",
        ],
        explanation:
          "elle demande l'addition (she asks for the bill) - restaurant phrase",
      },
      {
        instruction: 'Say "we ask for permission"',
        prompt: "we ask for permission",
        hint: "nous demandons la permission",
        expectedAnswer: "nous demandons la permission",
        acceptableAnswers: ["nous demandons la permission"],
        wrongAnswers: [
          "nous demande la permission",
          "nous demandon la permission",
          "nous demandons le permission",
        ],
        explanation: "nous demandons la permission (we ask for permission)",
      },
      {
        instruction: 'Say "I ask forgiveness"',
        prompt: "I ask forgiveness",
        hint: "je demande pardon",
        expectedAnswer: "je demande pardon",
        acceptableAnswers: ["je demande pardon"],
        wrongAnswers: [
          "je demandes pardon",
          "je demander pardon",
          "je demande le pardon",
        ],
        explanation:
          "Polite expression: je demande pardon (I ask forgiveness / I apologize)",
      },

      // Asking someone
      {
        instruction: 'Say "I ask Marie"',
        prompt: "I ask Marie",
        hint: "je demande à Marie",
        expectedAnswer: "je demande à Marie",
        acceptableAnswers: ["je demande à Marie", "je demande a Marie"],
        wrongAnswers: [
          "je demande Marie",
          "je demandes à Marie",
          "je demander à Marie",
        ],
        explanation: "Use 'à' when asking someone: je demande à Marie",
      },
      {
        instruction: 'Say "you ask your father"',
        prompt: "you ask your father",
        hint: "tu demandes à ton père",
        expectedAnswer: "tu demandes à ton père",
        acceptableAnswers: ["tu demandes à ton père", "tu demandes a ton pere"],
        wrongAnswers: [
          "tu demandes ton père",
          "tu demande à ton père",
          "tu demander à ton père",
        ],
        explanation: "tu demandes à ton père (you ask your father) - use 'à'",
      },
      {
        instruction: 'Say "he asks his mother"',
        prompt: "he asks his mother",
        hint: "il demande à sa mère",
        expectedAnswer: "il demande à sa mère",
        acceptableAnswers: ["il demande à sa mère", "il demande a sa mere"],
        wrongAnswers: [
          "il demande sa mère",
          "il demandes à sa mère",
          "il demander à sa mère",
        ],
        explanation: "il demande à sa mère (he asks his mother)",
      },

      // With object pronouns
      {
        instruction: 'Say "I ask you" (informal)',
        prompt: "I ask you (informal)",
        hint: "je te demande",
        expectedAnswer: "je te demande",
        acceptableAnswers: ["je te demande"],
        wrongAnswers: ["je demande te", "je te demandes", "je demande tu"],
        explanation: "je te demande - object pronoun 'te' before verb",
      },
      {
        instruction: 'Say "you ask me"',
        prompt: "you ask me",
        hint: "tu me demandes",
        expectedAnswer: "tu me demandes",
        acceptableAnswers: ["tu me demandes"],
        wrongAnswers: ["tu demandes me", "tu me demande", "tu demande me"],
        explanation: "tu me demandes - object pronoun 'me' before verb",
      },
      {
        instruction: 'Say "he asks me"',
        prompt: "he asks me",
        hint: "il me demande",
        expectedAnswer: "il me demande",
        acceptableAnswers: ["il me demande"],
        wrongAnswers: ["il demande me", "il me demandes", "il demandes me"],
        explanation: "il me demande - 'me' (to me) before verb",
      },
      {
        instruction: 'Say "she asks us"',
        prompt: "she asks us",
        hint: "elle nous demande",
        expectedAnswer: "elle nous demande",
        acceptableAnswers: ["elle nous demande"],
        wrongAnswers: [
          "elle demande nous",
          "elle nous demandes",
          "elle demandes nous",
        ],
        explanation: "elle nous demande - 'nous' (us) before verb",
      },

      // With infinitive (asking to do something)
      {
        instruction: 'Say "I ask to leave"',
        prompt: "I ask to leave",
        hint: "je demande de partir",
        expectedAnswer: "je demande de partir",
        acceptableAnswers: ["je demande de partir"],
        wrongAnswers: [
          "je demande partir",
          "je demandes de partir",
          "je demande à partir",
        ],
        explanation: "Use 'de' before infinitive: je demande de partir",
      },
      {
        instruction: 'Say "he asks me to come"',
        prompt: "he asks me to come",
        hint: "il me demande de venir",
        expectedAnswer: "il me demande de venir",
        acceptableAnswers: ["il me demande de venir"],
        wrongAnswers: [
          "il me demande venir",
          "il demande me de venir",
          "il me demande à venir",
        ],
        explanation:
          "il me demande de venir - object pronoun + de + infinitive",
      },
      {
        instruction: 'Say "she asks us to wait"',
        prompt: "she asks us to wait",
        hint: "elle nous demande d'attendre",
        expectedAnswer: "elle nous demande d'attendre",
        acceptableAnswers: [
          "elle nous demande d'attendre",
          "elle nous demande d attendre",
        ],
        wrongAnswers: [
          "elle nous demande attendre",
          "elle demande nous d'attendre",
          "elle nous demande à attendre",
        ],
        explanation: "elle nous demande d'attendre - de → d' before vowel",
      },
      {
        instruction: 'Say "they ask you to help"',
        prompt: "they ask you to help",
        hint: "ils te demandent d'aider",
        expectedAnswer: "ils te demandent d'aider",
        acceptableAnswers: [
          "ils te demandent d'aider",
          "ils te demandent d aider",
        ],
        wrongAnswers: [
          "ils te demandent aider",
          "ils demandent te d'aider",
          "ils te demande d'aider",
        ],
        explanation: "ils te demandent d'aider (they ask you to help)",
      },

      // Questions
      {
        instruction: 'Say "why do you ask?"',
        prompt: "why do you ask?",
        hint: "pourquoi tu demandes?",
        expectedAnswer: "pourquoi tu demandes?",
        acceptableAnswers: ["pourquoi tu demandes?", "pourquoi tu demandes"],
        wrongAnswers: [
          "pourquoi demandes-tu?",
          "pourquoi tu demande?",
          "pourquoi demander?",
        ],
        explanation: "pourquoi (why) + tu demandes (you ask)",
      },

      // Past tense
      {
        instruction: 'Say "I asked"',
        prompt: "I asked",
        hint: "j'ai demandé",
        expectedAnswer: "j'ai demandé",
        acceptableAnswers: ["j ai demandé", "j'ai demande"],
        wrongAnswers: ["je demande", "j'ai demander", "j'ai demandai"],
        explanation: "Passé composé: j'ai demandé (regular -é past participle)",
      },
      {
        instruction: 'Say "you asked me"',
        prompt: "you asked me",
        hint: "tu m'as demandé",
        expectedAnswer: "tu m'as demandé",
        acceptableAnswers: ["tu m as demandé", "tu m'as demande"],
        wrongAnswers: ["tu me demandes", "tu as me demandé", "tu m'ai demandé"],
        explanation: "tu m'as demandé - object pronoun before auxiliary",
      },
    ],
  },
};
