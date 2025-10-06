/**
 * Module 1: Famous Words & Greetings
 * Start with internationally recognized words and essential phrases
 * Cognates and common expressions - you might recognize some!
 */

export const famousWords = {
  // id and module number are set dynamically
  title: "Famous Words & Greetings",
  description:
    "Start here! Learn greetings and internationally known words. You might already know some of these!",

  concepts: [
    {
      term: "Internationally Recognized Words",
      definition: "Many words are used across languages and cultures",
      example:
        "Some of these words may be familiar from movies, restaurants, or everyday use",
    },
    {
      term: "Essential Greetings & Politeness",
      definition: "Basic phrases needed for any conversation",
      example:
        "Hello, thank you, yes, no, please, goodbye - universal communication",
    },
    {
      term: "Building Your Foundation",
      definition: "Starting with common, useful words builds confidence",
      example: "These common words appear in daily conversation",
    },
  ],

  vocabularyReference: [
    {
      french: "bonjour",
      english: "hello / good day",
      note: "greeting (literally: good day)",
    },
    { french: "merci", english: "thank you", note: "gratitude" },
    { french: "oui", english: "yes", note: "affirmative" },
    { french: "non", english: "no", note: "negative" },
    { french: "s'il vous plaît", english: "please", note: "formal politeness" },
    { french: "pardon", english: "excuse me / sorry", note: "apology" },
    {
      french: "au revoir",
      english: "goodbye",
      note: "farewell (literally: until seeing again)",
    },
    {
      french: "voilà",
      english: "there it is / here you go",
      note: "very common!",
    },
    {
      french: "café",
      english: "coffee",
      note: "cognate - same in many languages",
    },
    { french: "bon", english: "good", note: "used in many phrases" },
    { french: "bien", english: "well", note: "adverb" },
    { french: "salut", english: "hi / bye", note: "informal greeting" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "You're entering a shop. Greet the shopkeeper",
        prompt: "hello / good day",
        hint: "Famous greeting - literally 'good day'",
        expectedAnswer: "bonjour",
        wrongAnswers: [
          {
            answer: "bon",
            feedback: "That's just 'good' - need the full greeting",
          },
          {
            answer: "salut",
            feedback: "That's informal 'hi' - use bonjour for hello",
          },
        ],
      },
      {
        instruction: "Someone hands you something. How do you thank them?",
        prompt: "thank you",
        hint: "Expression of gratitude - used worldwide!",
        expectedAnswer: "merci",
        wrongAnswers: [],
      },
      {
        instruction: "Someone offers you coffee. Accept the offer",
        prompt: "yes",
        hint: "Simple affirmative - 3 letters",
        expectedAnswer: "oui",
        wrongAnswers: [
          { answer: "non", feedback: "That means 'no', not 'yes'" },
        ],
      },
      {
        instruction: "Someone offers you something. Decline politely",
        prompt: "no",
        hint: "Simple negative - 3 letters",
        expectedAnswer: "non",
        wrongAnswers: [
          { answer: "oui", feedback: "That means 'yes', not 'no'" },
        ],
      },
      {
        instruction: "You're making a request. Add this word to be polite",
        prompt: "please",
        hint: "Literally 'if it pleases you' - makes any request polite",
        expectedAnswer: "s'il vous plaît",
        wrongAnswers: [],
      },
      {
        instruction: "You accidentally bump into someone. Apologize",
        prompt: "excuse me / sorry",
        hint: "Same word in English! Universal apology",
        expectedAnswer: "pardon",
        wrongAnswers: [],
      },
      {
        instruction: "You're leaving a place or conversation. Say farewell",
        prompt: "goodbye",
        hint: "Literally 'until seeing again' - formal farewell",
        expectedAnswer: "au revoir",
        wrongAnswers: [
          {
            answer: "salut",
            feedback: "That's informal - use au revoir for goodbye",
          },
        ],
      },
      {
        instruction: "A waiter brings your order. What do they often say?",
        prompt: "there it is / here you go",
        hint: "Very French expression - presenting with flair!",
        expectedAnswer: "voilà",
        wrongAnswers: [],
      },
      {
        instruction: "You're at a café. Order this popular drink",
        prompt: "coffee",
        hint: "Cognate - spelled almost the same, just add accent!",
        expectedAnswer: "café",
        wrongAnswers: [],
      },
      {
        instruction: "Wish someone well on their trip. Use this adjective",
        prompt: "good",
        hint: "Used in 'bon voyage', 'bon appétit'",
        expectedAnswer: "bon",
        wrongAnswers: [
          {
            answer: "bien",
            feedback: "That means 'well' (adverb), not 'good' (adjective)",
          },
        ],
      },
      {
        instruction: "Someone asks how you are. Respond positively",
        prompt: "well",
        hint: "Adverb - 'très bien' = very well",
        expectedAnswer: "bien",
        wrongAnswers: [
          {
            answer: "bon",
            feedback: "That means 'good' (adjective), not 'well' (adverb)",
          },
        ],
      },
      {
        instruction: "You see a friend on the street. Greet them casually",
        prompt: "hi / bye (informal)",
        hint: "Casual greeting - use with friends only!",
        expectedAnswer: "salut",
        wrongAnswers: [
          {
            answer: "bonjour",
            feedback: "That's more formal - salut is casual",
          },
        ],
      },
    ],
  },
};
