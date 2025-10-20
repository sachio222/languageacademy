/**
 * Survival Phrases - Essential for real-world France!
 * Practical phrases for shopping, restaurants, hotels, and navigation
 */

export const survivalPhrases = {
  title: "Survival Phrases - Real-World Essentials",
  description:
    "Essential phrases for bakeries, cafés, shops, and getting around! These will save you in France.",

  concepts: [
    {
      term: "Polite Requests",
      definition:
        "Use 'je voudrais' (I would like) instead of 'je veux' - much more polite!",
      example: "At a bakery: 'Je voudrais un croissant, s'il vous plaît'",
    },
    {
      term: "Essential Questions",
      definition: "Phrases for prices, locations, and understanding",
      example:
        "C'est combien? (How much?), Où sont les toilettes? (Where's the bathroom?)",
    },
    {
      term: "Polite Words",
      definition: "Please, excuse me, good night - essential politeness",
      example: "S'il vous plaît, excusez-moi, bonne nuit",
    },
  ],

  vocabularyReference: [
    { french: "je voudrais", english: "I would like", note: "polite form!" },
    { french: "s'il vous plaît", english: "please", note: "formal politeness" },
    { french: "excusez-moi", english: "excuse me", note: "get attention" },
    { french: "bonne nuit", english: "good night", note: "before bed" },
    {
      french: "bonne journée",
      english: "have a good day",
      note: "daytime farewell",
    },
    {
      french: "c'est combien",
      english: "how much is it?",
      note: "asking prices",
    },
    {
      french: "combien ça coûte",
      english: "how much does it cost?",
      note: "formal",
    },
    { french: "où sont", english: "where are", note: "où + être plural" },
    { french: "les toilettes", english: "the restrooms", note: "essential!" },
    { french: "l'addition", english: "the bill/check", note: "at restaurants" },
    { french: "pardon", english: "pardon/sorry", note: "apology" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Politely order a book at a shop",
        prompt: "I would like a book, please",
        hint: "je voudrais + un livre + s'il vous plaît",
        expectedAnswer: "je voudrais un livre, s'il vous plaît",
        acceptableAnswers: ["je voudrais un livre"],
        wrongAnswers: [
          {
            answer: "je veux un livre",
            feedback: "Use 'je voudrais' to be polite, not 'je veux'",
          },
        ],
      },
      {
        instruction: "At a café, politely order a coffee",
        prompt: "I would like a coffee, please",
        hint: "je voudrais + un café + s'il vous plaît",
        expectedAnswer: "je voudrais un café, s'il vous plaît",
        acceptableAnswers: ["je voudrais un café"],
        wrongAnswers: [],
      },
      {
        instruction: "Politely ask for this cat (pointing at something)",
        prompt: "I would like this cat",
        hint: "je voudrais + demonstrative + noun",
        expectedAnswer: "je voudrais ce chat",
        wrongAnswers: [
          {
            answer: "je veux ce chat",
            feedback: "Use 'je voudrais' to be polite",
          },
        ],
      },
      {
        instruction: "Ask how much a book costs",
        prompt: "how much is the book?",
        hint: "c'est combien with definite article + noun",
        expectedAnswer: "c'est combien le livre",
        acceptableAnswers: ["c'est combien"],
        wrongAnswers: [],
      },
      {
        instruction: "Get someone's attention in a shop",
        prompt: "excuse me",
        hint: "Polite way to get attention",
        expectedAnswer: "excusez-moi",
        wrongAnswers: [
          {
            answer: "pardon",
            feedback:
              "Both work, but 'excusez-moi' is more common for getting attention",
          },
        ],
      },
      {
        instruction: "Say 'please' when asking for something",
        prompt: "please (formal)",
        hint: "Literally 'if it pleases you'",
        expectedAnswer: "s'il vous plaît",
        wrongAnswers: [],
      },
      {
        instruction: "Say good night to your host family",
        prompt: "good night",
        hint: "Two words - bonne + nuit",
        expectedAnswer: "bonne nuit",
        wrongAnswers: [
          {
            answer: "bonne journée",
            feedback: "That's 'have a good day' - use 'bonne nuit' for night",
          },
        ],
      },
      {
        instruction: "Say goodbye during the day with a nice wish",
        prompt: "have a good day",
        hint: "bonne + journée (feminine)",
        expectedAnswer: "bonne journée",
        wrongAnswers: [
          {
            answer: "bon journée",
            feedback: "journée is feminine, use 'bonne' not 'bon'",
          },
        ],
      },
      {
        instruction: "Ask where the café is",
        prompt: "where is the café?",
        hint: "où + est + le café",
        expectedAnswer: "où est le café",
        wrongAnswers: [],
      },
      {
        instruction: "Ask where the restrooms are",
        prompt: "where are the restrooms?",
        hint: "où + sont + les toilettes",
        expectedAnswer: "où sont les toilettes",
        wrongAnswers: [
          {
            answer: "où est les toilettes",
            feedback: "toilettes is plural, use 'sont' not 'est'",
          },
        ],
      },
      {
        instruction: "At a restaurant, ask for the check",
        prompt: "the check, please",
        hint: "l'addition + s'il vous plaît",
        expectedAnswer: "l'addition, s'il vous plaît",
        acceptableAnswers: ["l'addition"],
        wrongAnswers: [],
      },
      {
        instruction: "Apologize when you bump into someone",
        prompt: "pardon / sorry",
        hint: "One word - same as English cognate",
        expectedAnswer: "pardon",
        wrongAnswers: [],
      },
    ],
  },
};
