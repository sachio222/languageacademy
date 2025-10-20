/**
 * Module 160: Rhetorical & Negative Questions - Advanced Style
 * Unit 12 - Add native sophistication with rhetorical and negative questions
 */

export const rhetoricalNegativeModule = {
  title: "Rhetorical & Negative Questions - Advanced Style",
  description:
    "Add native sophistication: N'est-ce pas vrai? (Isn't that true?), Comment ne pas aimer ça? (How can you not love that?), Qui ne voudrait pas ça? (Who wouldn't want that?)",
  unit: 12,

  concepts: [
    {
      term: "Negative Questions for Agreement",
      definition: "Ask negative questions to seek agreement or confirmation",
      example:
        "N'est-ce pas vrai? (Isn't that true?), N'as-tu pas faim? (Aren't you hungry?)",
    },
    {
      term: "Rhetorical Questions for Opinion",
      definition:
        "Ask questions that express opinion rather than seeking actual answers",
      example:
        "Comment ne pas aimer ça? (How can you not love that? = Of course you love it!), Qui ne voudrait pas ça? (Who wouldn't want that? = Everyone wants it!)",
    },
    {
      term: "Ne...pas Pattern in Questions",
      definition:
        "In negative questions, ne comes before verb, pas after (or before infinitive)",
      example:
        "N'es-tu pas content? Ne veux-tu pas essayer? Comment ne pas aimer?",
    },
    {
      term: "Persuasion and Emphasis",
      definition:
        "These questions are tools for persuasive speech and emphasizing points",
      example: "Pourquoi ne pas essayer? (Why not try? = You should try!)",
    },
    {
      term: "Native-Level Sophistication",
      definition:
        "Using these questions makes your French sound more sophisticated and natural",
      example:
        "From basic: Tu aimes ça? To sophisticated: Comment ne pas aimer ça?",
    },
  ],

  vocabularyReference: [
    {
      french: "N'est-ce pas vrai?",
      english: "Isn't that true?",
      note: "seeking agreement",
    },
    {
      french: "N'est-ce pas?",
      english: "Isn't it? / Right?",
      note: "tag question for confirmation",
    },
    {
      french: "N'es-tu pas content?",
      english: "Aren't you happy?",
      note: "negative question with tu",
    },
    {
      french: "N'as-tu pas faim?",
      english: "Aren't you hungry?",
      note: "negative question with avoir",
    },
    {
      french: "Ne veux-tu pas essayer?",
      english: "Don't you want to try?",
      note: "negative question with vouloir",
    },
    {
      french: "Comment ne pas aimer ça?",
      english: "How can you not love that?",
      note: "⭐ rhetorical - implies everyone loves it",
    },
    {
      french: "Qui ne voudrait pas ça?",
      english: "Who wouldn't want that?",
      note: "⭐ rhetorical - implies everyone wants it",
    },
    {
      french: "Pourquoi ne pas essayer?",
      english: "Why not try?",
      note: "⭐ rhetorical suggestion",
    },
    {
      french: "Comment ne pas aimer le soleil?",
      english: "How can one not love the sun?",
      note: "rhetorical about nature",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Negative questions for agreement
      {
        instruction: "Ask 'Isn't that true?'",
        prompt: "Isn't that true?",
        hint: "n'est-ce pas + vrai",
        expectedAnswer: "n'est-ce pas vrai?",
        acceptableAnswers: ["n'est-ce pas vrai", "n'est-ce pas vrai?"],
      },
      {
        instruction: "Use tag question: 'Isn't it?' / 'Right?'",
        prompt: "Isn't it? / Right?",
        hint: "n'est-ce pas",
        expectedAnswer: "n'est-ce pas?",
        acceptableAnswers: ["n'est-ce pas", "n'est-ce pas?"],
        explanation:
          "N'est-ce pas? at the end of a statement = 'right?' or 'isn't it?'",
      },
      {
        instruction: "Ask 'Aren't you happy?'",
        prompt: "Aren't you happy?",
        hint: "n'es-tu pas + content",
        expectedAnswer: "n'es-tu pas content?",
        acceptableAnswers: ["n'es-tu pas content", "n'es-tu pas content?"],
      },
      {
        instruction: "Ask 'Aren't you hungry?'",
        prompt: "Aren't you hungry?",
        hint: "n'as-tu pas + faim",
        expectedAnswer: "n'as-tu pas faim?",
        acceptableAnswers: ["n'as-tu pas faim", "n'as-tu pas faim?"],
      },
      {
        instruction: "Ask 'Don't you want to try?'",
        prompt: "Don't you want to try?",
        hint: "ne veux-tu pas + essayer",
        expectedAnswer: "ne veux-tu pas essayer?",
        acceptableAnswers: [
          "ne veux-tu pas essayer",
          "ne veux-tu pas essayer?",
        ],
      },

      // Rhetorical questions
      {
        instruction: "Ask 'How can you not love that?' (rhetorical)",
        prompt: "How can you not love that?",
        hint: "comment ne pas aimer + ça",
        expectedAnswer: "comment ne pas aimer ça?",
        acceptableAnswers: [
          "comment ne pas aimer ça",
          "comment ne pas aimer ça?",
        ],
        explanation: "Rhetorical question - implies everyone DOES love it!",
      },
      {
        instruction: "Ask 'Who wouldn't want that?' (rhetorical)",
        prompt: "Who wouldn't want that?",
        hint: "qui ne voudrait pas + ça (conditionnel!)",
        expectedAnswer: "qui ne voudrait pas ça?",
        acceptableAnswers: [
          "qui ne voudrait pas ça",
          "qui ne voudrait pas ça?",
        ],
        explanation: "Rhetorical question - implies everyone WOULD want it!",
      },
      {
        instruction: "Ask 'Why not try?' (rhetorical suggestion)",
        prompt: "Why not try?",
        hint: "pourquoi ne pas + essayer",
        expectedAnswer: "pourquoi ne pas essayer?",
        acceptableAnswers: [
          "pourquoi ne pas essayer",
          "pourquoi ne pas essayer?",
        ],
        explanation: "Rhetorical suggestion - means 'you should try!'",
      },

      // Nature-themed rhetorical questions
      {
        instruction: "Ask 'How can one not love the sun?' (rhetorical)",
        prompt: "How can one not love the sun?",
        hint: "comment ne pas aimer + le soleil",
        expectedAnswer: "comment ne pas aimer le soleil?",
        acceptableAnswers: [
          "comment ne pas aimer le soleil",
          "comment ne pas aimer le soleil?",
        ],
      },
      {
        instruction: "Ask 'Who wouldn't want to learn French?' (rhetorical)",
        prompt: "Who wouldn't want to learn French?",
        hint: "qui ne voudrait pas + apprendre le français",
        expectedAnswer: "qui ne voudrait pas apprendre le français?",
        acceptableAnswers: [
          "qui ne voudrait pas apprendre le français",
          "qui ne voudrait pas apprendre le français?",
          "qui ne voudrait pas apprendre le francais",
          "qui ne voudrait pas apprendre le francais?",
        ],
      },

      // Mixed practice
      {
        instruction: "Ask 'Isn't that magnificent?'",
        prompt: "Isn't that magnificent?",
        hint: "n'est-ce pas + magnifique",
        expectedAnswer: "n'est-ce pas magnifique?",
        acceptableAnswers: [
          "n'est-ce pas magnifique",
          "n'est-ce pas magnifique?",
        ],
      },
      {
        instruction: "Ask 'Why not go there?' (suggestion)",
        prompt: "Why not go there?",
        hint: "pourquoi ne pas + aller là-bas",
        expectedAnswer: "pourquoi ne pas aller là-bas?",
        acceptableAnswers: [
          "pourquoi ne pas aller là-bas",
          "pourquoi ne pas aller là-bas?",
          "pourquoi ne pas aller la-bas",
          "pourquoi ne pas aller la-bas?",
        ],
      },
    ],
  },

  skipStudyMode: false,
};
