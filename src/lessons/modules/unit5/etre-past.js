/**
 * Module: être - Past Tense (Imperfect)
 * Unit 5 - Talk about the past: was, were
 * Imparfait tense: j'étais, tu étais, il était, etc.
 */

export const etrePast = {
  title: "être - Past Tense (was / were)",
  description:
    "Talk about how things were in the past: j'étais (I was), tu étais (you were), il était (he was)",

  concepts: [
    {
      term: "Past Tense = Imperfect (Imparfait)",
      definition: "Describes ongoing states or repeated actions in the past",
      example:
        "j'étais heureux (I was happy), nous étions à Paris (we were in Paris)",
    },
    {
      term: "était = was (singular)",
      definition: "For je, tu, il/elle - describing past states",
      example:
        "j'étais jeune (I was young), tu étais là (you were there), il était bon (it was good)",
    },
    {
      term: "étions, étiez, étaient = were (plural)",
      definition: "For nous, vous, ils/elles - plural past states",
      example:
        "nous étions contents (we were happy), ils étaient ici (they were here)",
    },
    {
      term: "Pattern Recognition",
      definition:
        "Notice: j'étais, tu étais, il/elle était all sound the same!",
      example: "All singular forms end in -ais, -ais, -ait (similar sound)",
    },
    {
      term: "With Negation",
      definition: "Use ne...pas around the past tense verb",
      example: "je n'étais pas (I was not), il n'était pas (he was not)",
    },
  ],

  vocabularyReference: [
    {
      french: "j'étais",
      english: "I was",
      note: "imperfect tense",
    },
    {
      french: "tu étais",
      english: "you were (informal)",
      note: "sounds same as j'étais",
    },
    {
      french: "il/elle était",
      english: "he/she was",
      note: "sounds similar to j'étais/tu étais",
    },
    {
      french: "nous étions",
      english: "we were",
      note: "imperfect tense",
    },
    {
      french: "vous étiez",
      english: "you were (formal/plural)",
      note: "imperfect tense",
    },
    {
      french: "ils/elles étaient",
      english: "they were",
      note: "sounds like 'étè'",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I was here"',
        prompt: "I was here",
        hint: "j'étais + ici",
        expectedAnswer: "j'étais ici",
        acceptableAnswers: ["j étais ici"],
        wrongAnswers: [
          {
            answer: "je suis ici",
            feedback:
              "That's present tense 'I am' - use 'j'étais' for past 'I was'",
          },
        ],
      },
      {
        instruction: 'Say "I was happy"',
        prompt: "I was happy",
        hint: "j'étais + content/contente",
        expectedAnswer: "j'étais content",
        acceptableAnswers: ["j étais content", "j'étais contente"],
        wrongAnswers: [
          {
            answer: "je suis content",
            feedback: "That's 'I am' - use 'j'étais' for 'I was'",
          },
        ],
      },
      {
        instruction: 'Say "you were there" (informal)',
        prompt: "you were there",
        hint: "tu étais + là",
        expectedAnswer: "tu étais là",
        wrongAnswers: [
          {
            answer: "tu es là",
            feedback: "That's 'you are' - use 'tu étais' for 'you were'",
          },
        ],
      },
      {
        instruction: 'Say "you were young" (informal)',
        prompt: "you were young",
        hint: "tu étais + jeune",
        expectedAnswer: "tu étais jeune",
        wrongAnswers: [
          {
            answer: "tu es jeune",
            feedback: "That's 'you are' - use 'tu étais' for 'you were'",
          },
        ],
      },
      {
        instruction: 'Say "he was here"',
        prompt: "he was here",
        hint: "il était + ici",
        expectedAnswer: "il était ici",
        wrongAnswers: [
          {
            answer: "il est ici",
            feedback: "That's 'he is' - use 'il était' for 'he was'",
          },
          {
            answer: "il étais ici",
            feedback: "Use 'était' (with -t) for il/elle, not 'étais'",
          },
        ],
      },
      {
        instruction: 'Say "she was happy"',
        prompt: "she was happy",
        hint: "elle était + contente (feminine form)",
        expectedAnswer: "elle était contente",
        wrongAnswers: [
          {
            answer: "elle est contente",
            feedback: "That's 'she is' - use 'elle était' for 'she was'",
          },
          {
            answer: "elle était content",
            feedback: "Use feminine 'contente' with elle",
          },
        ],
      },
      {
        instruction: 'Say "it was good"',
        prompt: "it was good",
        hint: "c'était + bon (use c'était for 'it was')",
        expectedAnswer: "c'était bon",
        acceptableAnswers: ["c était bon"],
        wrongAnswers: [
          {
            answer: "c'est bon",
            feedback: "That's 'it is' - use 'c'était' for 'it was'",
          },
        ],
      },
      {
        instruction: 'Say "it was there"',
        prompt: "it was there",
        hint: "c'était + là",
        expectedAnswer: "c'était là",
        acceptableAnswers: ["c était là"],
        wrongAnswers: [
          {
            answer: "il était là",
            feedback: "Both work! But 'c'était' is more common for 'it was'",
          },
        ],
      },
      {
        instruction: 'Say "we were here"',
        prompt: "we were here",
        hint: "nous étions + ici",
        expectedAnswer: "nous étions ici",
        wrongAnswers: [
          {
            answer: "nous sommes ici",
            feedback: "That's 'we are' - use 'nous étions' for 'we were'",
          },
          {
            answer: "nous était ici",
            feedback: "Use 'étions' for nous, not 'était'",
          },
        ],
      },
      {
        instruction: 'Say "we were happy"',
        prompt: "we were happy",
        hint: "nous étions + contents",
        expectedAnswer: "nous étions contents",
        wrongAnswers: [
          {
            answer: "nous sommes contents",
            feedback: "That's 'we are' - use 'nous étions' for 'we were'",
          },
        ],
      },
      {
        instruction: 'Say "you were there" (formal or plural)',
        prompt: "you were there (formal)",
        hint: "vous étiez + là",
        expectedAnswer: "vous étiez là",
        wrongAnswers: [
          {
            answer: "vous êtes là",
            feedback: "That's 'you are' - use 'vous étiez' for 'you were'",
          },
          {
            answer: "vous étions là",
            feedback: "Use 'étiez' for vous, not 'étions'",
          },
        ],
      },
      {
        instruction: 'Say "you were young" (formal)',
        prompt: "you were young (formal)",
        hint: "vous étiez + jeune",
        expectedAnswer: "vous étiez jeune",
        wrongAnswers: [
          {
            answer: "vous êtes jeune",
            feedback: "That's 'you are' - use 'vous étiez' for 'you were'",
          },
        ],
      },
      {
        instruction: 'Say "they were here"',
        prompt: "they were here",
        hint: "ils/elles étaient + ici",
        expectedAnswer: "ils étaient ici",
        acceptableAnswers: ["elles étaient ici"],
        wrongAnswers: [
          {
            answer: "ils sont ici",
            feedback: "That's 'they are' - use 'ils étaient' for 'they were'",
          },
          {
            answer: "ils était ici",
            feedback: "Use 'étaient' for ils/elles, not 'était'",
          },
        ],
      },
      {
        instruction: 'Say "they were happy"',
        prompt: "they were happy",
        hint: "ils/elles étaient + contents",
        expectedAnswer: "ils étaient contents",
        acceptableAnswers: ["elles étaient contentes"],
        wrongAnswers: [
          {
            answer: "ils sont contents",
            feedback: "That's 'they are' - use 'ils étaient' for 'they were'",
          },
        ],
      },
      {
        instruction: 'Say "I was not here"',
        prompt: "I was not here",
        hint: "je n'étais pas + ici",
        expectedAnswer: "je n'étais pas ici",
        acceptableAnswers: ["je n étais pas ici"],
        wrongAnswers: [
          {
            answer: "je ne suis pas ici",
            feedback: "Use past tense 'n'étais pas' for 'was not'",
          },
          {
            answer: "j'étais ne pas ici",
            feedback: "Put 'ne' before verb: je n'étais pas",
          },
        ],
      },
      {
        instruction: 'Say "you were not there" (informal)',
        prompt: "you were not there",
        hint: "tu n'étais pas + là",
        expectedAnswer: "tu n'étais pas là",
        acceptableAnswers: ["tu n étais pas là"],
        wrongAnswers: [
          {
            answer: "tu n'es pas là",
            feedback: "Use past tense 'n'étais pas' for 'were not'",
          },
        ],
      },
      {
        instruction: 'Say "he was not happy"',
        prompt: "he was not happy",
        hint: "il n'était pas + content",
        expectedAnswer: "il n'était pas content",
        acceptableAnswers: ["il n était pas content"],
        wrongAnswers: [
          {
            answer: "il n'est pas content",
            feedback: "Use past tense 'n'était pas' for 'was not'",
          },
        ],
      },
      {
        instruction: 'Say "we were not there"',
        prompt: "we were not there",
        hint: "nous n'étions pas + là",
        expectedAnswer: "nous n'étions pas là",
        acceptableAnswers: ["nous n étions pas là"],
        wrongAnswers: [
          {
            answer: "nous ne sommes pas là",
            feedback: "Use past tense 'n'étions pas' for 'were not'",
          },
        ],
      },
      {
        instruction: 'Say "they were not here"',
        prompt: "they were not here",
        hint: "ils n'étaient pas + ici",
        expectedAnswer: "ils n'étaient pas ici",
        acceptableAnswers: ["elles n'étaient pas ici", "ils n étaient pas ici"],
        wrongAnswers: [
          {
            answer: "ils ne sont pas ici",
            feedback: "Use past tense 'n'étaient pas' for 'were not'",
          },
        ],
      },
      {
        instruction: 'Say "I was in Paris"',
        prompt: "I was in Paris",
        hint: "j'étais + à Paris",
        expectedAnswer: "j'étais à Paris",
        acceptableAnswers: ["j étais à Paris"],
        wrongAnswers: [
          {
            answer: "je suis à Paris",
            feedback: "That's 'I am in Paris' - use 'j'étais' for 'I was'",
          },
        ],
      },
    ],
  },
};
