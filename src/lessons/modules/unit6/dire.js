/**
 * Module: dire (to say / to tell)
 * Unit 6 - Essential communication verb, irregular conjugation
 * Rank 64 in top 100 - extremely high frequency
 */

export const direModule = {
  moduleKey: "2024-04-20-dire", // Permanent identifier - never changes
  title: "dire - To Say / To Tell",
  description:
    "Express what you say and tell: je dis (I say), tu dis la vérité (you tell the truth), il me dit (he tells me)",

  concepts: [
    {
      term: "dire = to say OR to tell",
      definition:
        "Essential communication verb - irregular conjugation in present tense",
      example:
        "je dis bonjour (I say hello), tu dis la vérité (you tell the truth)",
    },
    {
      term: "Irregular conjugation",
      definition:
        "Present tense: je dis, tu dis, il dit, nous disons, vous dites, ils disent",
      example:
        "Notice: vous dites (NOT disez!), nous disons (regular), ils disent (regular)",
    },
    {
      term: "dire que... (to say that...)",
      definition: "Use 'que' to introduce what someone says",
      example:
        "je dis que c'est bon (I say that it's good), il dit qu'il vient (he says he's coming)",
    },
    {
      term: "dire à quelqu'un (to tell someone)",
      definition: "Use 'à' + person to say who you're telling",
      example:
        "je dis à Marie (I tell Marie), tu me dis (you tell me), il lui dit (he tells him/her)",
    },
    {
      term: "Common expressions",
      definition:
        "Useful phrases: c'est-à-dire (that is to say), on dit que (they say that), comme on dit (as they say)",
      example:
        "c'est-à-dire que... (that is to say...), on dit que c'est bon (they say it's good)",
    },
  ],

  vocabularyReference: [
    {
      french: "dire",
      english: "to say / to tell",
      note: "infinitive form - irregular verb",
    },
    {
      french: "je dis",
      english: "I say / I tell",
      note: "irregular - sounds like 'dee'",
    },
    {
      french: "tu dis",
      english: "you say / you tell (informal)",
      note: "same form as je dis",
    },
    {
      french: "il/elle dit",
      english: "he/she says / tells",
      note: "same sound as je/tu",
    },
    {
      french: "nous disons",
      english: "we say / we tell",
      note: "add -ons to 'dis'",
    },
    {
      french: "vous dites",
      english: "you say / you tell (formal/plural)",
      note: "⚠️ IRREGULAR! Not 'disez'!",
    },
    {
      french: "ils/elles disent",
      english: "they say / they tell",
      note: "add -ent (silent)",
    },
    {
      french: "dire que",
      english: "to say that",
      note: "introduce what someone says",
    },
    {
      french: "dire à quelqu'un",
      english: "to tell someone",
      note: "use à + person",
    },
    {
      french: "je te dis",
      english: "I tell you",
      note: "te = you (object pronoun)",
    },
    {
      french: "il me dit",
      english: "he tells me",
      note: "me = me (object pronoun)",
    },
    {
      french: "c'est-à-dire",
      english: "that is to say / i.e.",
      note: "useful connector - abbreviated as 'càd'",
    },
    {
      french: "on dit que",
      english: "they say that / people say that",
      note: "on = people in general",
    },
    {
      french: "comme on dit",
      english: "as they say",
      note: "common expression",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic conjugations
      {
        instruction: 'Say "I say"',
        prompt: "I say",
        hint: "je...",
        expectedAnswer: "je dis",
        acceptableAnswers: ["je dis"],
        wrongAnswers: ["je dise", "je dire", "je dit"],
        explanation: "Irregular: je dis (sounds like 'dee')",
      },
      {
        instruction: 'Say "you say" (informal)',
        prompt: "you say (informal)",
        hint: "tu...",
        expectedAnswer: "tu dis",
        acceptableAnswers: ["tu dis"],
        wrongAnswers: ["tu dises", "tu dire", "tu dit"],
        explanation: "Same as je: tu dis",
      },
      {
        instruction: 'Say "he says"',
        prompt: "he says",
        hint: "il...",
        expectedAnswer: "il dit",
        acceptableAnswers: ["il dit"],
        wrongAnswers: ["il dis", "il dire", "il dise"],
        explanation: "Third person: il dit (same pronunciation)",
      },
      {
        instruction: 'Say "we say"',
        prompt: "we say",
        hint: "nous...",
        expectedAnswer: "nous disons",
        acceptableAnswers: ["nous disons"],
        wrongAnswers: ["nous dire", "nous dis", "nous dites"],
        explanation: "nous disons - add -ons",
      },
      {
        instruction: 'Say "you say" (formal)',
        prompt: "you say (formal)",
        hint: "vous... (careful - irregular!)",
        expectedAnswer: "vous dites",
        acceptableAnswers: ["vous dites"],
        wrongAnswers: ["vous disez", "vous dire", "vous dis"],
        explanation: "⚠️ Irregular! vous dites (NOT disez)",
      },
      {
        instruction: 'Say "they say"',
        prompt: "they say",
        hint: "ils...",
        expectedAnswer: "ils disent",
        acceptableAnswers: ["ils disent"],
        wrongAnswers: ["ils dis", "ils dire", "ils dit"],
        explanation: "ils disent - add -ent (silent)",
      },

      // Basic sentences
      {
        instruction: 'Say "I say hello"',
        prompt: "I say hello",
        hint: "je dis...",
        expectedAnswer: "je dis bonjour",
        acceptableAnswers: ["je dis bonjour"],
        wrongAnswers: ["je dit bonjour", "je dise bonjour", "je dire bonjour"],
        explanation: "je dis (I say) + bonjour (hello)",
      },
      {
        instruction: 'Say "you tell the truth"',
        prompt: "you tell the truth",
        hint: "tu dis la vérité",
        expectedAnswer: "tu dis la vérité",
        acceptableAnswers: ["tu dis la vérité", "tu dis la verite"],
        wrongAnswers: [
          "tu dit la vérité",
          "tu dises la vérité",
          "tu dire la vérité",
        ],
        explanation: "tu dis (you say/tell) + la vérité (the truth)",
      },
      {
        instruction: 'Say "she says yes"',
        prompt: "she says yes",
        hint: "elle dit oui",
        expectedAnswer: "elle dit oui",
        acceptableAnswers: ["elle dit oui"],
        wrongAnswers: ["elle dis oui", "elle dire oui", "elle dise oui"],
        explanation: "elle dit (she says) + oui (yes)",
      },
      {
        instruction: 'Say "we tell a story"',
        prompt: "we tell a story",
        hint: "nous disons une histoire",
        expectedAnswer: "nous disons une histoire",
        acceptableAnswers: ["nous disons une histoire"],
        wrongAnswers: [
          "nous dis une histoire",
          "nous dit une histoire",
          "nous dire une histoire",
        ],
        explanation: "nous disons (we tell) + une histoire (a story)",
      },

      // With 'que' (that)
      {
        instruction: 'Say "I say that it\'s good"',
        prompt: "I say that it's good",
        hint: "je dis que c'est bon",
        expectedAnswer: "je dis que c'est bon",
        acceptableAnswers: ["je dis que c'est bon", "je dis que c est bon"],
        wrongAnswers: [
          "je dis c'est bon",
          "je dit que c'est bon",
          "je dise que c'est bon",
        ],
        explanation: "je dis que (I say that) + c'est bon (it's good)",
      },
      {
        instruction: 'Say "he says that he is coming"',
        prompt: "he says that he is coming",
        hint: "il dit qu'il vient",
        expectedAnswer: "il dit qu'il vient",
        acceptableAnswers: ["il dit qu'il vient", "il dit qu il vient"],
        wrongAnswers: [
          "il dis qu'il vient",
          "il dit il vient",
          "il dise qu'il vient",
        ],
        explanation: "il dit que (he says that) → qu'il (elision before vowel)",
      },
      {
        instruction: 'Say "they say that it\'s true"',
        prompt: "they say that it's true",
        hint: "ils disent que c'est vrai",
        expectedAnswer: "ils disent que c'est vrai",
        acceptableAnswers: [
          "ils disent que c'est vrai",
          "ils disent que c est vrai",
        ],
        wrongAnswers: [
          "ils dis que c'est vrai",
          "ils dit que c'est vrai",
          "ils disent c'est vrai",
        ],
        explanation: "ils disent que (they say that) + c'est vrai (it's true)",
      },

      // With object pronouns (to tell someone)
      {
        instruction: 'Say "I tell you" (informal)',
        prompt: "I tell you (informal)",
        hint: "je te dis",
        expectedAnswer: "je te dis",
        acceptableAnswers: ["je te dis"],
        wrongAnswers: ["je dis te", "je te dit", "je dis tu"],
        explanation: "je te dis - object pronoun 'te' goes before verb",
      },
      {
        instruction: 'Say "you tell me"',
        prompt: "you tell me",
        hint: "tu me dis",
        expectedAnswer: "tu me dis",
        acceptableAnswers: ["tu me dis"],
        wrongAnswers: ["tu dis me", "tu me dit", "tu dis je"],
        explanation: "tu me dis - object pronoun 'me' before verb",
      },
      {
        instruction: 'Say "he tells me"',
        prompt: "he tells me",
        hint: "il me dit",
        expectedAnswer: "il me dit",
        acceptableAnswers: ["il me dit"],
        wrongAnswers: ["il dis me", "il dit me", "il me dis"],
        explanation: "il me dit - me (to me) goes before the verb",
      },
      {
        instruction: 'Say "she tells us"',
        prompt: "she tells us",
        hint: "elle nous dit",
        expectedAnswer: "elle nous dit",
        acceptableAnswers: ["elle nous dit"],
        wrongAnswers: ["elle dit nous", "elle nous dis", "elle dis nous"],
        explanation: "elle nous dit - nous (to us) before verb",
      },

      // Common expressions
      {
        instruction: 'Say "that is to say"',
        prompt: "that is to say",
        hint: "c'est-à-dire",
        expectedAnswer: "c'est-à-dire",
        acceptableAnswers: ["c'est-à-dire", "c est a dire", "c'est à dire"],
        wrongAnswers: ["c'est dire", "c'est de dire", "c'est pour dire"],
        explanation: "Common phrase: c'est-à-dire (that is to say, i.e.)",
      },
      {
        instruction: 'Say "they say that" (people say that)',
        prompt: "they say that (people say)",
        hint: "on dit que",
        expectedAnswer: "on dit que",
        acceptableAnswers: ["on dit que"],
        wrongAnswers: ["on dis que", "ils disent que", "on dise que"],
        explanation: "on dit que - 'on' = people in general",
      },
      {
        instruction: 'Say "as they say"',
        prompt: "as they say",
        hint: "comme on dit",
        expectedAnswer: "comme on dit",
        acceptableAnswers: ["comme on dit"],
        wrongAnswers: ["comme on dis", "comme ils disent", "comment on dit"],
        explanation: "Common expression: comme on dit (as they say)",
      },

      // Past tense (passé composé)
      {
        instruction: 'Say "I said"',
        prompt: "I said",
        hint: "j'ai dit",
        expectedAnswer: "j'ai dit",
        acceptableAnswers: ["j ai dit"],
        wrongAnswers: ["je dis", "je disais", "j'ai dis"],
        explanation: "Passé composé: j'ai dit (I said/have said)",
      },
      {
        instruction: 'Say "you told me"',
        prompt: "you told me",
        hint: "tu m'as dit",
        expectedAnswer: "tu m'as dit",
        acceptableAnswers: ["tu m as dit"],
        wrongAnswers: ["tu me dis", "tu as me dit", "tu m'ai dit"],
        explanation: "tu m'as dit - object pronoun before auxiliary verb",
      },
    ],
  },
};
