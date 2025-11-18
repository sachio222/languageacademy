/**
 * Module: Comparisons & Intensity Slang
 * Unit 5 - Real-world informal expressions from France, Quebec, and Africa
 * Learn how people actually talk: c'est ouf! (it's crazy!), c'est malade! (it's sick!)
 */

export const comparisonsSlang = {
  moduleKey: "2024-04-07-comparisons-slang", // Permanent identifier - never changes
  title: "Slang - Comparisons & Intensity",
  description:
    "Real-world slang from France, Quebec, and Africa: c'est ouf (crazy), c'est génial (awesome), c'est nul (it sucks), c'est malade (sick)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Understand real French slang (c'est ouf, c'est génial)",
      "Sound natural with Quebec and African French expressions",
      "Connect with native speakers using authentic language"
    ],
    realWorldUse: "speak like a native with authentic slang",
    nextModuleTeaser: "Add conditional forms for polite requests"
  },

  concepts: [
    {
      term: "French Slang (France)",
      definition:
        "Informal expressions you'll hear on the streets of Paris and throughout France",
      example:
        "c'est ouf (it's crazy - verlan for 'fou'), c'est chelou (it's weird - verlan for 'louche')",
    },
    {
      term: "Quebec French",
      definition:
        "Unique expressions from Quebec - very different from France!",
      example:
        "c'est malade (it's sick/awesome), c'est capot (it's crazy), c'est écœurant (it's disgusting/amazing)",
    },
    {
      term: "African French",
      definition:
        "Expressions from French-speaking Africa (Senegal, Ivory Coast, etc.)",
      example:
        "c'est gnama (it's good - West Africa), c'est grave (it's serious/intense)",
    },
    {
      term: "Verlan - French Slang Technique",
      definition:
        "Reversing syllables - très (very) becomes trop, fou (crazy) becomes ouf",
      example: "c'est ouf = c'est fou (it's crazy), chelou = louche (weird)",
    },
  ],

  vocabularyReference: [
    // FRANCE SLANG
    {
      french: "c'est ouf",
      english: "it's crazy/insane",
      note: "🇫🇷 France - verlan for 'fou' (crazy)",
    },
    {
      french: "c'est chelou",
      english: "it's weird/sketchy",
      note: "🇫🇷 France - verlan for 'louche' (weird)",
    },
    {
      french: "c'est génial",
      english: "it's awesome/great",
      note: "🇫🇷 France - very common!",
    },
    {
      french: "c'est nul",
      english: "it sucks/it's lame",
      note: "🇫🇷 France - negative slang",
    },
    {
      french: "c'est cool",
      english: "it's cool",
      note: "🇫🇷 France - borrowed from English",
    },
    {
      french: "c'est dingue",
      english: "it's crazy/wild",
      note: "🇫🇷 France - informal for crazy",
    },
    {
      french: "c'est grave",
      english: "it's serious/intense",
      note: "🇫🇷 France & Africa - used for emphasis",
    },
    {
      french: "trop",
      english: "too/very (slang usage)",
      note: "🇫🇷 France - c'est trop bien (it's really good)",
    },
    {
      french: "vachement",
      english: "really/very",
      note: "🇫🇷 France - c'est vachement bon (it's really good)",
    },
    {
      french: "hyper",
      english: "super/really",
      note: "🇫🇷 France - c'est hyper bon (it's super good)",
    },

    // QUEBEC SLANG
    {
      french: "c'est malade",
      english: "it's sick/awesome",
      note: "🇨🇦 Quebec - positive meaning!",
    },
    {
      french: "c'est capot",
      english: "it's crazy/nuts",
      note: "🇨🇦 Quebec - very informal",
    },
    {
      french: "c'est écœurant",
      english: "it's disgusting/amazing",
      note: "🇨🇦 Quebec - can be positive OR negative!",
    },
    {
      french: "c'est le fun",
      english: "it's fun",
      note: "🇨🇦 Quebec - borrowed from English",
    },
    {
      french: "c'est poche",
      english: "it sucks/it's bad",
      note: "🇨🇦 Quebec - negative",
    },
    {
      french: "c'est ben correct",
      english: "it's really good/fine",
      note: "🇨🇦 Quebec - 'ben' = 'bien'",
    },

    // AFRICAN FRENCH
    {
      french: "c'est gnama",
      english: "it's good/tasty",
      note: "🌍 West Africa (Senegal, Ivory Coast)",
    },
    {
      french: "c'est fort",
      english: "it's strong/intense",
      note: "🌍 Africa - used for emphasis",
    },
    {
      french: "c'est chaud",
      english: "it's hot/difficult/intense",
      note: "🌍 Africa & France - figurative meaning",
    },

    // UNIVERSAL INFORMAL
    {
      french: "c'est top",
      english: "it's top/the best",
      note: "Universal - borrowed from English",
    },
    {
      french: "c'est mortel",
      english: "it's deadly/awesome",
      note: "France - positive slang",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // FRANCE SLANG
      {
        instruction: 'Say "it\'s crazy" (French slang - verlan)',
        prompt: "it's crazy (slang)",
        hint: "c'est ouf (verlan for 'fou')",
        expectedAnswer: "c'est ouf",
        acceptableAnswers: ["c est ouf", "cest ouf"],
        wrongAnswers: [
          {
            answer: "c'est fou",
            feedback:
              "That's correct but formal - slang is 'ouf' (verlan/reversed)",
          },
        ],
      },
      {
        instruction: 'Say "it\'s weird" (French slang - verlan)',
        prompt: "it's weird (slang)",
        hint: "c'est chelou (verlan for 'louche')",
        expectedAnswer: "c'est chelou",
        acceptableAnswers: ["c est chelou", "cest chelou"],
        wrongAnswers: [
          {
            answer: "c'est bizarre",
            feedback: "That's formal - slang is 'chelou'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s awesome" (French)',
        prompt: "it's awesome",
        hint: "c'est génial",
        expectedAnswer: "c'est génial",
        acceptableAnswers: ["c est génial", "cest génial", "c'est genial"],
        wrongAnswers: [
          {
            answer: "c'est bon",
            feedback: "That means 'it's good' - use 'génial' for awesome",
          },
        ],
      },
      {
        instruction: 'Say "it sucks" (French slang)',
        prompt: "it sucks",
        hint: "c'est nul",
        expectedAnswer: "c'est nul",
        acceptableAnswers: ["c est nul", "cest nul"],
        wrongAnswers: [
          {
            answer: "c'est mauvais",
            feedback: "That's formal - slang is 'nul'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s cool" (used in France)',
        prompt: "it's cool",
        hint: "c'est cool (borrowed from English)",
        expectedAnswer: "c'est cool",
        acceptableAnswers: ["c est cool", "cest cool"],
        wrongAnswers: [
          {
            answer: "c'est froid",
            feedback:
              "That means 'it's cold' - use 'cool' for the slang meaning",
          },
        ],
      },
      {
        instruction: 'Say "it\'s really good" using vachement (France)',
        prompt: "it's really good (vachement)",
        hint: "c'est vachement bon",
        expectedAnswer: "c'est vachement bon",
        acceptableAnswers: ["c est vachement bon", "cest vachement bon"],
        wrongAnswers: [
          {
            answer: "c'est très bon",
            feedback: "That works but 'vachement' is more slangy/informal",
          },
        ],
      },
      {
        instruction: 'Say "it\'s super good" using hyper (France)',
        prompt: "it's super good (hyper)",
        hint: "c'est hyper bon",
        expectedAnswer: "c'est hyper bon",
        acceptableAnswers: ["c est hyper bon", "cest hyper bon"],
        wrongAnswers: [
          {
            answer: "c'est super bon",
            feedback: "Both work! But we're learning 'hyper'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s really good" using trop (France)',
        prompt: "it's really good (trop)",
        hint: "c'est trop bien",
        expectedAnswer: "c'est trop bien",
        acceptableAnswers: ["c est trop bien", "cest trop bien"],
        wrongAnswers: [
          {
            answer: "c'est trop bon",
            feedback: "Both work! But the common phrase is 'trop bien'",
          },
        ],
      },

      // QUEBEC SLANG
      {
        instruction: 'Say "it\'s sick/awesome" (Quebec slang)',
        prompt: "it's sick/awesome (Quebec)",
        hint: "c'est malade (Quebec - positive meaning!)",
        expectedAnswer: "c'est malade",
        acceptableAnswers: ["c est malade", "cest malade"],
        wrongAnswers: [
          {
            answer: "c'est génial",
            feedback: "That's France - Quebec says 'malade'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s crazy" (Quebec slang)',
        prompt: "it's crazy (Quebec)",
        hint: "c'est capot",
        expectedAnswer: "c'est capot",
        acceptableAnswers: ["c est capot", "cest capot"],
        wrongAnswers: [
          {
            answer: "c'est ouf",
            feedback: "That's France slang - Quebec says 'capot'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s fun" (Quebec - from English)',
        prompt: "it's fun (Quebec)",
        hint: "c'est le fun (Quebec borrows from English)",
        expectedAnswer: "c'est le fun",
        acceptableAnswers: ["c est le fun", "cest le fun"],
        wrongAnswers: [
          {
            answer: "c'est amusant",
            feedback: "That's formal French - Quebec says 'c'est le fun'",
          },
        ],
      },
      {
        instruction: 'Say "it sucks" (Quebec slang)',
        prompt: "it sucks (Quebec)",
        hint: "c'est poche",
        expectedAnswer: "c'est poche",
        acceptableAnswers: ["c est poche", "cest poche"],
        wrongAnswers: [
          {
            answer: "c'est nul",
            feedback: "That's France - Quebec says 'poche'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s really good" (Quebec - ben = bien)',
        prompt: "it's really good (Quebec)",
        hint: "c'est ben correct (ben = bien in Quebec)",
        expectedAnswer: "c'est ben correct",
        acceptableAnswers: ["c est ben correct", "cest ben correct"],
        wrongAnswers: [
          {
            answer: "c'est bien correct",
            feedback: "Quebec shortens 'bien' to 'ben'",
          },
        ],
      },

      // AFRICAN FRENCH
      {
        instruction: 'Say "it\'s good/tasty" (West Africa)',
        prompt: "it's good/tasty (Africa)",
        hint: "c'est gnama (West African French)",
        expectedAnswer: "c'est gnama",
        acceptableAnswers: ["c est gnama", "cest gnama"],
        wrongAnswers: [
          {
            answer: "c'est bon",
            feedback: "That's standard - West Africa says 'gnama'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s intense/difficult" (Africa & France)',
        prompt: "it's intense (slang)",
        hint: "c'est chaud (figurative - not temperature!)",
        expectedAnswer: "c'est chaud",
        acceptableAnswers: ["c est chaud", "cest chaud"],
        wrongAnswers: [
          {
            answer: "c'est difficile",
            feedback: "That's formal - slang is 'chaud'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s serious/intense" (Africa & France)',
        prompt: "it's serious/intense",
        hint: "c'est grave",
        expectedAnswer: "c'est grave",
        acceptableAnswers: ["c est grave", "cest grave"],
        wrongAnswers: [
          {
            answer: "c'est sérieux",
            feedback: "That's formal - 'grave' is more slangy/emphatic",
          },
        ],
      },

      // UNIVERSAL
      {
        instruction: 'Say "it\'s the best" (top)',
        prompt: "it's the best (top)",
        hint: "c'est top (from English)",
        expectedAnswer: "c'est top",
        acceptableAnswers: ["c est top", "cest top"],
        wrongAnswers: [
          {
            answer: "c'est le meilleur",
            feedback: "That's formal - slang is just 'c'est top'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s deadly/awesome" (France)',
        prompt: "it's deadly/awesome",
        hint: "c'est mortel (positive slang!)",
        expectedAnswer: "c'est mortel",
        acceptableAnswers: ["c est mortel", "cest mortel"],
        wrongAnswers: [
          {
            answer: "c'est dangereux",
            feedback:
              "That's 'dangerous' literally - 'mortel' is positive slang for awesome",
          },
        ],
      },
      {
        instruction: 'Say "it\'s wild/crazy" (France)',
        prompt: "it's wild/crazy",
        hint: "c'est dingue",
        expectedAnswer: "c'est dingue",
        acceptableAnswers: ["c est dingue", "cest dingue"],
        wrongAnswers: [
          {
            answer: "c'est sauvage",
            feedback: "That's 'wild' literally - 'dingue' is slang for crazy",
          },
        ],
      },
    ],
  },
};
