/**
 * Essential Verbs - chercher (to search) & trouver (to find)
 * Unit 4 - Everyday Words
 * High-frequency verbs for daily activities
 */

export const searchFindModule = {
  moduleKey: "2024-10-22-search-find", // Permanent identifier - never changes
  title: "Essential Verbs - chercher & trouver",
  description:
    "Learn to search and find! chercher (to search/look for) and trouver (to find) - essential for daily life.",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express searching and finding (I'm looking for, I found)",
      "Talk about looking for lost items or locations",
      "Say 'I'm looking for my keys' or 'I found it!' in French"
    ],
    realWorldUse: "search for and find things in daily life",
    nextModuleTeaser: "Learn negation to say what you don't do"
  },

  concepts: [
    {
      term: "chercher - to search/look for",
      definition:
        "Active searching - when you're looking for something but haven't found it yet",
      example:
        "je cherche mes clés (I'm looking for my keys), tu cherches quoi? (what are you looking for?)",
    },
    {
      term: "trouver - to find",
      definition: "Successfully locating something - the result of searching",
      example:
        "j'ai trouvé! (I found it!), tu trouves ça où? (where do you find that?)",
    },
    {
      term: "Common Usage Patterns",
      definition:
        "These verbs are used constantly in daily French conversation",
      example:
        "je cherche + noun (I'm looking for...), je trouve + noun (I find...)",
    },
    {
      term: "With Prepositions",
      definition:
        "chercher takes direct objects, trouver can use various prepositions",
      example:
        "je cherche le livre (I'm looking for the book), je trouve dans la maison (I find in the house)",
    },
  ],

  vocabularyReference: [
    {
      french: "chercher",
      english: "to search/look for",
      note: "regular -er verb",
    },
    {
      french: "je cherche",
      english: "I search/look for",
      note: "present tense",
    },
    {
      french: "tu cherches",
      english: "you search/look for",
      note: "present tense",
    },
    {
      french: "il/elle cherche",
      english: "he/she searches/looks for",
      note: "present tense",
    },
    {
      french: "nous cherchons",
      english: "we search/look for",
      note: "present tense",
    },
    {
      french: "vous cherchez",
      english: "you search/look for",
      note: "present tense",
    },
    {
      french: "ils/elles cherchent",
      english: "they search/look for",
      note: "present tense",
    },

    { french: "trouver", english: "to find", note: "regular -er verb" },
    { french: "je trouve", english: "I find", note: "present tense" },
    { french: "tu trouves", english: "you find", note: "present tense" },
    {
      french: "il/elle trouve",
      english: "he/she finds",
      note: "present tense",
    },
    { french: "nous trouvons", english: "we find", note: "present tense" },
    { french: "vous trouvez", english: "you find", note: "present tense" },
    {
      french: "ils/elles trouvent",
      english: "they find",
      note: "present tense",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'I search' or 'I look for'",
        prompt: "I search/look for",
        hint: "chercher for je",
        expectedAnswer: "je cherche",
        wrongAnswers: [
          {
            answer: "je trouve",
            feedback: "That means 'I find' - use 'je cherche' for searching",
          },
        ],
      },
      {
        instruction: "Say 'I find'",
        prompt: "I find",
        hint: "trouver for je",
        expectedAnswer: "je trouve",
        wrongAnswers: [
          {
            answer: "je cherche",
            feedback: "That means 'I search' - use 'je trouve' for finding",
          },
        ],
      },
      {
        instruction: "Say 'you search' (informal)",
        prompt: "you search",
        hint: "chercher for tu",
        expectedAnswer: "tu cherches",
        wrongAnswers: [
          {
            answer: "tu cherche",
            feedback: "Add -s for tu: tu cherches",
          },
        ],
      },
      {
        instruction: "Say 'you find' (informal)",
        prompt: "you find",
        hint: "trouver for tu",
        expectedAnswer: "tu trouves",
        wrongAnswers: [
          {
            answer: "tu trouve",
            feedback: "Add -s for tu: tu trouves",
          },
        ],
      },
      {
        instruction: "Say 'he searches'",
        prompt: "he searches",
        hint: "chercher for il",
        expectedAnswer: "il cherche",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she finds'",
        prompt: "she finds",
        hint: "trouver for elle",
        expectedAnswer: "elle trouve",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we search' (formal)",
        prompt: "we search",
        hint: "chercher for nous",
        expectedAnswer: "nous cherchons",
        wrongAnswers: [
          {
            answer: "nous cherchez",
            feedback: "Use -ons for nous: nous cherchons",
          },
        ],
      },
      {
        instruction: "Say 'you find' (formal/plural)",
        prompt: "you find (formal)",
        hint: "trouver for vous",
        expectedAnswer: "vous trouvez",
        wrongAnswers: [
          {
            answer: "vous trouvons",
            feedback: "Use -ez for vous: vous trouvez",
          },
        ],
      },
      {
        instruction: "Say 'they search'",
        prompt: "they search",
        hint: "chercher for ils/elles",
        expectedAnswer: "ils cherchent",
        acceptableAnswers: ["elles cherchent"],
        wrongAnswers: [
          {
            answer: "ils cherchez",
            feedback: "Use -ent for ils/elles: ils cherchent",
          },
        ],
      },
      {
        instruction: "Say 'I'm looking for the book'",
        prompt: "I'm looking for the book",
        hint: "je cherche + le livre",
        expectedAnswer: "je cherche le livre",
        wrongAnswers: [
          {
            answer: "je trouve le livre",
            feedback:
              "That means 'I find the book' - use 'cherche' for looking",
          },
        ],
      },
      {
        instruction: "Say 'I find the cat'",
        prompt: "I find the cat",
        hint: "je trouve + le chat",
        expectedAnswer: "je trouve le chat",
        wrongAnswers: [
          {
            answer: "je cherche le chat",
            feedback:
              "That means 'I'm looking for the cat' - use 'trouve' for finding",
          },
        ],
      },
      {
        instruction: "Say 'we're looking for the house'",
        prompt: "we're looking for the house",
        hint: "nous cherchons + la maison",
        expectedAnswer: "nous cherchons la maison",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'you find the car' (informal)",
        prompt: "you find the car",
        hint: "tu trouves + la voiture",
        expectedAnswer: "tu trouves la voiture",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'what are you looking for?' (informal)",
        prompt: "what are you looking for?",
        hint: "qu'est-ce que + tu cherches",
        expectedAnswer: "qu'est-ce que tu cherches",
        acceptableAnswers: ["que cherches-tu", "tu cherches quoi"],
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu trouves",
            feedback:
              "That asks 'what do you find' - use 'cherches' for looking",
          },
        ],
      },
    ],
  },
};
