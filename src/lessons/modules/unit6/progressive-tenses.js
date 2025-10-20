/**
 * Module: Progressive & Future Constructions
 * Unit 6 - Express ongoing actions, future plans, and modal negations
 * Key structures: en train de, aller + infinitive, future tense, negative modals
 */

export const progressiveTenses = {
  moduleKey: "2024-04-23-progressive-tenses", // Permanent identifier - never changes
  title: "Progressive & Future - Expressing Time",
  description:
    "Say what you're doing now, what you're going to do, and what you can't/won't/shouldn't do",

  concepts: [
    {
      term: "être en train de + infinitive",
      definition:
        "Express an action happening RIGHT NOW - like English 'I am doing...'",
      example:
        "je suis en train de manger (I am eating), il est en train de parler (he is talking)",
    },
    {
      term: "aller + infinitive (near future)",
      definition:
        "Express what you're GOING TO DO - aller (to go) + verb infinitive",
      example:
        "je vais manger (I'm going to eat), tu vas parler (you're going to speak)",
    },
    {
      term: "Future tense - je ...-rai",
      definition:
        "Express what you WILL do - add -rai, -ras, -ra, -rons, -rez, -ront to infinitive",
      example:
        "je parlerai (I will speak), tu mangeras (you will eat), il ira (he will go - irregular)",
    },
    {
      term: "Negative modals",
      definition:
        "Express can't, won't, shouldn't - je ne peux pas, je ne vais pas, je ne devrais pas",
      example:
        "je ne peux pas partir (I can't leave), je ne devrais pas manger ça (I shouldn't eat that)",
    },
    {
      term: "J'étais en train de... (past progressive)",
      definition:
        "Say what you WERE doing - use past tense of être + en train de",
      example:
        "j'étais en train de manger (I was eating), ils étaient en train de parler (they were talking)",
    },
  ],

  vocabularyReference: [
    {
      french: "être en train de",
      english: "to be in the process of",
      note: "en train = in the train/process - literally 'in the act of'",
    },
    {
      french: "je suis en train de manger",
      english: "I am eating",
      note: "present progressive - happening now!",
    },
    {
      french: "j'étais en train de parler",
      english: "I was talking",
      note: "past progressive - was happening then",
    },
    {
      french: "je vais partir",
      english: "I am going to leave",
      note: "near future - aller + infinitive",
    },
    {
      french: "je vais manger",
      english: "I am going to eat",
      note: "near future",
    },
    {
      french: "je parlerai",
      english: "I will speak",
      note: "future tense - parler + ai",
    },
    {
      french: "tu mangeras",
      english: "you will eat",
      note: "future tense - manger + as",
    },
    {
      french: "il ira",
      english: "he will go",
      note: "irregular future - from aller",
    },
    {
      french: "je ne peux pas",
      english: "I can't",
      note: "negative modal - pouvoir",
    },
    {
      french: "je ne vais pas",
      english: "I'm not going to",
      note: "negative near future",
    },
    {
      french: "je ne devrais pas",
      english: "I shouldn't",
      note: "negative conditional - devoir",
    },
    {
      french: "je ne ferai pas",
      english: "I won't do",
      note: "negative future tense",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Present progressive
      {
        instruction: 'Say "I am eating"',
        prompt: "I am eating",
        hint: "je suis en train de...",
        expectedAnswer: "je suis en train de manger",
        acceptableAnswers: ["je suis en train de manger"],
        wrongAnswers: [
          "je mange",
          "j'ai mangé",
          "je vais manger",
          "je mangerai",
        ],
        explanation:
          "'en train de' + infinitive = ongoing action happening now",
      },
      {
        instruction: 'Say "she is talking"',
        prompt: "she is talking",
        hint: "elle est en train de...",
        expectedAnswer: "elle est en train de parler",
        acceptableAnswers: ["elle est en train de parler"],
        wrongAnswers: [
          "elle parle",
          "elle parlait",
          "elle va parler",
          "elle parlera",
        ],
        explanation: "Use 'est' (is) + en train de + infinitive",
      },
      {
        instruction: 'Say "we are leaving"',
        prompt: "we are leaving",
        hint: "nous sommes en train de...",
        expectedAnswer: "nous sommes en train de partir",
        acceptableAnswers: ["nous sommes en train de partir"],
        wrongAnswers: [
          "nous partons",
          "nous allons partir",
          "nous partirons",
          "nous partions",
        ],
        explanation: "nous sommes (we are) + en train de + partir (to leave)",
      },

      // Past progressive
      {
        instruction: 'Say "I was eating"',
        prompt: "I was eating",
        hint: "j'étais en train de...",
        expectedAnswer: "j'étais en train de manger",
        acceptableAnswers: ["j étais en train de manger"],
        wrongAnswers: [
          "je mangeais",
          "j'ai mangé",
          "je suis en train de manger",
          "j'avais mangé",
        ],
        explanation: "Use past tense: j'étais (I was) + en train de + manger",
      },
      {
        instruction: 'Say "they were talking"',
        prompt: "they were talking",
        hint: "ils étaient en train de...",
        expectedAnswer: "ils étaient en train de parler",
        acceptableAnswers: ["ils étaient en train de parler"],
        wrongAnswers: [
          "ils parlaient",
          "ils ont parlé",
          "ils sont en train de parler",
          "ils avaient parlé",
        ],
        explanation: "ils étaient (they were) + en train de + parler",
      },

      // Near future (going to)
      {
        instruction: 'Say "I am going to eat"',
        prompt: "I am going to eat",
        hint: "je vais + infinitive",
        expectedAnswer: "je vais manger",
        acceptableAnswers: ["je vais manger"],
        wrongAnswers: [
          "je mange",
          "je mangerai",
          "j'ai mangé",
          "je suis en train de manger",
        ],
        explanation: "aller + infinitive = near future (going to do)",
      },
      {
        instruction: 'Say "you are going to speak"',
        prompt: "you are going to speak",
        hint: "tu vas + infinitive",
        expectedAnswer: "tu vas parler",
        acceptableAnswers: ["tu vas parler"],
        wrongAnswers: [
          "tu parles",
          "tu parleras",
          "tu as parlé",
          "tu es en train de parler",
        ],
        explanation: "tu vas (you are going) + parler (to speak)",
      },
      {
        instruction: 'Say "we are going to leave"',
        prompt: "we are going to leave",
        hint: "nous allons + infinitive",
        expectedAnswer: "nous allons partir",
        acceptableAnswers: ["nous allons partir"],
        wrongAnswers: [
          "nous partons",
          "nous partirons",
          "nous sommes partis",
          "nous sommes en train de partir",
        ],
        explanation: "nous allons (we are going) + partir (to leave)",
      },
      {
        instruction: 'Say "they are going to come"',
        prompt: "they are going to come",
        hint: "ils vont + infinitive",
        expectedAnswer: "ils vont venir",
        acceptableAnswers: ["ils vont venir"],
        wrongAnswers: [
          "ils viennent",
          "ils viendront",
          "ils sont venus",
          "ils sont en train de venir",
        ],
        explanation: "ils vont (they are going) + venir (to come)",
      },

      // Future tense
      {
        instruction: 'Say "I will speak"',
        prompt: "I will speak",
        hint: "parler + ai",
        expectedAnswer: "je parlerai",
        acceptableAnswers: ["je parlerai"],
        wrongAnswers: [
          "je parle",
          "je vais parler",
          "j'ai parlé",
          "je parlais",
        ],
        explanation: "Future tense: infinitive + -rai (je parlerai)",
      },
      {
        instruction: 'Say "you will eat"',
        prompt: "you will eat",
        hint: "manger + as",
        expectedAnswer: "tu mangeras",
        acceptableAnswers: ["tu mangeras"],
        wrongAnswers: [
          "tu manges",
          "tu vas manger",
          "tu as mangé",
          "tu mangeais",
        ],
        explanation: "Future tense: manger + -as (tu mangeras)",
      },
      {
        instruction: 'Say "he will leave"',
        prompt: "he will leave",
        hint: "partir + a",
        expectedAnswer: "il partira",
        acceptableAnswers: ["il partira"],
        wrongAnswers: ["il part", "il va partir", "il est parti", "il partait"],
        explanation: "Future tense: partir + -a (il partira)",
      },
      {
        instruction: 'Say "we will come"',
        prompt: "we will come",
        hint: "venir + ons",
        expectedAnswer: "nous viendrons",
        acceptableAnswers: ["nous viendrons"],
        wrongAnswers: [
          "nous venons",
          "nous allons venir",
          "nous sommes venus",
          "nous venions",
        ],
        explanation: "Future tense: venir → viendr- + ons (irregular stem)",
      },
      {
        instruction: 'Say "I will go"',
        prompt: "I will go",
        hint: "aller is irregular: j'irai",
        expectedAnswer: "j'irai",
        acceptableAnswers: ["j irai"],
        wrongAnswers: ["je vais", "je vais aller", "je suis allé", "j'allais"],
        explanation: "Irregular future: aller → ir- + ai (j'irai)",
      },

      // Negative modals
      {
        instruction: 'Say "I can\'t leave"',
        prompt: "I can't leave",
        hint: "je ne peux pas...",
        expectedAnswer: "je ne peux pas partir",
        acceptableAnswers: ["je ne peux pas partir"],
        wrongAnswers: [
          "je peux partir",
          "je ne pars pas",
          "je ne vais pas partir",
          "je ne suis pas parti",
        ],
        explanation: "Negative modal: je ne peux pas + infinitive",
      },
      {
        instruction: 'Say "I won\'t go"',
        prompt: "I won't go",
        hint: "je ne vais pas...",
        expectedAnswer: "je ne vais pas aller",
        acceptableAnswers: ["je ne vais pas aller"],
        wrongAnswers: [
          "je vais aller",
          "je ne vais pas",
          "je n'irai pas",
          "je ne suis pas allé",
        ],
        explanation: "Negative near future: je ne vais pas + aller",
      },
      {
        instruction: 'Say "I shouldn\'t eat that"',
        prompt: "I shouldn't eat that",
        hint: "je ne devrais pas...",
        expectedAnswer: "je ne devrais pas manger ça",
        acceptableAnswers: [
          "je ne devrais pas manger ça",
          "je ne devrais pas manger ca",
        ],
        wrongAnswers: [
          "je devrais manger ça",
          "je ne mange pas ça",
          "je ne vais pas manger ça",
          "je ne mangerai pas ça",
        ],
        explanation: "Negative conditional: je ne devrais pas + infinitive",
      },
      {
        instruction: 'Say "you can\'t do that"',
        prompt: "you can't do that",
        hint: "tu ne peux pas faire ça",
        expectedAnswer: "tu ne peux pas faire ça",
        acceptableAnswers: [
          "tu ne peux pas faire ça",
          "tu ne peux pas faire ca",
        ],
        wrongAnswers: [
          "tu peux faire ça",
          "tu ne fais pas ça",
          "tu ne vas pas faire ça",
          "tu n'as pas fait ça",
        ],
        explanation: "tu ne peux pas (you can't) + faire ça (do that)",
      },
      {
        instruction: 'Say "he won\'t do it"',
        prompt: "he won't do it",
        hint: "il ne le fera pas",
        expectedAnswer: "il ne le fera pas",
        acceptableAnswers: ["il ne le fera pas"],
        wrongAnswers: [
          "il le fera",
          "il ne le fait pas",
          "il ne va pas le faire",
          "il ne l'a pas fait",
        ],
        explanation:
          "Future negative: il ne le fera pas (he won't do it) - object pronoun 'le' before verb",
      },

      // Mixed practice
      {
        instruction: 'Say "I was going to leave"',
        prompt: "I was going to leave",
        hint: "j'allais + infinitive",
        expectedAnswer: "j'allais partir",
        acceptableAnswers: ["j allais partir"],
        wrongAnswers: [
          "je vais partir",
          "j'étais en train de partir",
          "je partais",
          "je suis parti",
        ],
        explanation:
          "Past tense of aller (j'allais) + infinitive = was going to",
      },
      {
        instruction: 'Say "we will not be able to come"',
        prompt: "we will not be able to come",
        hint: "nous ne pourrons pas...",
        expectedAnswer: "nous ne pourrons pas venir",
        acceptableAnswers: ["nous ne pourrons pas venir"],
        wrongAnswers: [
          "nous pouvons venir",
          "nous ne pouvons pas venir",
          "nous ne viendrons pas",
          "nous ne sommes pas venus",
        ],
        explanation: "Future of pouvoir (pourrons) + negative + infinitive",
      },
    ],
  },
};
