/**
 * Module 2: Articles - un/une, le/la/les
 * Essential for using any noun in French
 */

export const articles = {
  moduleKey: "2024-01-05-articles", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Articles - The, A, An",
  description:
    "Learn 'the' and 'a/an' in French - essential before learning any nouns!",

  concepts: [
    {
      term: "Why Articles Matter",
      definition:
        "You can NEVER say a noun alone in French - must use an article!",
      example: "English: 'book', French: MUST say 'a book' or 'the book'",
    },
    {
      term: "Indefinite Articles (a/an)",
      definition: "un (masculine), une (feminine) = a/an",
      example: "Use when talking about any one thing, not a specific thing",
    },
    {
      term: "Definite Articles (the)",
      definition: "le (masculine), la (feminine), les (plural) = the",
      example: "Use when talking about a specific thing",
    },
    {
      term: "Gender Agreement",
      definition: "Article must match the noun's gender - this is critical!",
      example: "Masculine nouns use un/le, feminine nouns use une/la",
    },
  ],

  vocabularyReference: [
    {
      french: "un",
      english: "a/an (masculine)",
      note: "indefinite, masculine",
    },
    { french: "une", english: "a/an (feminine)", note: "indefinite, feminine" },
    { french: "le", english: "the (masculine)", note: "definite, masculine" },
    { french: "la", english: "the (feminine)", note: "definite, feminine" },
    {
      french: "les",
      english: "the (plural)",
      note: "definite, plural both genders",
    },
    {
      french: "l'",
      english: "the (before vowel)",
      note: "le/la → l' before vowel/silent h",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "You want to say 'a book' (masculine noun). Which article?",
        prompt: "a/an (masculine thing)",
        hint: "Indefinite article for masculine nouns",
        expectedAnswer: "un",
        wrongAnswers: [
          { answer: "une", feedback: "That's feminine 'a/an'" },
          { answer: "le", feedback: "That's 'the', not 'a/an'" },
        ],
      },
      {
        instruction:
          "You want to say 'a house' (feminine noun). Which article?",
        prompt: "a/an (feminine thing)",
        hint: "Indefinite article for feminine nouns",
        expectedAnswer: "une",
        wrongAnswers: [
          { answer: "un", feedback: "That's masculine 'a/an'" },
          { answer: "la", feedback: "That's 'the', not 'a/an'" },
        ],
      },
      {
        instruction:
          "You're referring to a specific book (masculine). Which article?",
        prompt: "the (masculine thing)",
        hint: "Definite article for masculine singular nouns",
        expectedAnswer: "le",
        wrongAnswers: [
          { answer: "la", feedback: "That's feminine 'the'" },
          { answer: "les", feedback: "That's plural 'the'" },
        ],
      },
      {
        instruction:
          "You're referring to a specific house (feminine). Which article?",
        prompt: "the (feminine thing)",
        hint: "Definite article for feminine singular nouns",
        expectedAnswer: "la",
        wrongAnswers: [
          { answer: "le", feedback: "That's masculine 'the'" },
          { answer: "les", feedback: "That's plural 'the'" },
        ],
      },
      {
        instruction:
          "You're talking about multiple specific things. Which article?",
        prompt: "the (plural things)",
        hint: "Definite article for plural nouns (any gender)",
        expectedAnswer: "les",
        wrongAnswers: [
          { answer: "le", feedback: "That's singular masculine 'the'" },
          { answer: "la", feedback: "That's singular feminine 'the'" },
        ],
      },
      {
        instruction:
          "The noun starts with a vowel sound. How does 'the' change?",
        prompt: "the (before vowel sound)",
        hint: "Le/la become this before vowels - with apostrophe",
        expectedAnswer: "l'",
        wrongAnswers: [
          { answer: "le", feedback: "Use l' before vowels" },
          { answer: "la", feedback: "Use l' before vowels" },
        ],
      },
    ],
  },
};
