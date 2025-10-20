/**
 * Unit 4 Exam - Comprehensive test for Expression unit
 * Tests survival phrases, faire/devoir/parler, negation, time/location adverbs
 */

export const unit4Exam = {
  moduleKey: "2024-04-02-unit-4-exam", // Permanent identifier - never changes
  title: "Unit 4 Final Exam - Expression",
  description:
    "Test everything from Unit 4! Survival phrases, essential verbs, negation, and expressing time and place.",

  // Special flags
  isUnitExam: true,
  unitNumber: 4,
  skipStudyMode: true,

  concepts: [
    {
      term: "Everyday Communication Mastery",
      definition:
        "You've learned essential survival French for daily interactions and practical situations",
      example:
        "s'il vous plaît, excusez-moi, je fais, tu dois, il parle, je ne sais pas, maintenant, ici, là",
    },
    {
      term: "Essential Action Verbs",
      definition:
        "Master the three most important action verbs for expressing doing, obligation, and speaking",
      example:
        "faire (je fais, tu fais, il fait), devoir (je dois, tu dois, il doit), parler (je parle, tu parles, il parle)",
    },
    {
      term: "Negation and Politeness",
      definition:
        "Learn to express negation and use polite phrases essential for French social interaction",
      example:
        "ne...pas (je ne sais pas), ne...jamais (je ne viens jamais), s'il vous plaît, excusez-moi, merci",
    },
    {
      term: "Time and Space Orientation",
      definition:
        "Master temporal and spatial adverbs to express when and where things happen",
      example:
        "maintenant (now), aujourd'hui (today), ici (here), là (there), toujours (always), jamais (never)",
    },
    {
      term: "Daily Life Vocabulary",
      definition:
        "Learn essential nouns and phrases for everyday situations and survival French",
      example:
        "café, restaurant, travail, maison, voiture, argent, temps, problème, solution",
    },
  ],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // Section 1: Survival Phrases (5 questions)
      {
        instruction: "Translate to French (polite)",
        prompt: "I would like",
        hint: "Polite way to say 'I want' - conditional form",
        expectedAnswer: "je voudrais",
      },
      {
        instruction: "Translate to French",
        prompt: "please (formal)",
        hint: "Essential politeness phrase",
        expectedAnswer: "s'il vous plaît",
        acceptableAnswers: ["s'il vous plait"],
      },
      {
        instruction: "Translate to French",
        prompt: "excuse me / sorry",
        hint: "To get someone's attention politely",
        expectedAnswer: "excusez-moi",
        acceptableAnswers: ["excusez moi"],
      },
      {
        instruction: "Translate to French",
        prompt: "how much is it?",
        hint: "Shopping phrase with c'est",
        expectedAnswer: "c'est combien",
        acceptableAnswers: ["combien est-ce"],
      },
      {
        instruction: "Translate to French",
        prompt: "thank you very much",
        hint: "merci + intensity adverb",
        expectedAnswer: "merci beaucoup",
      },

      // Section 2: Essential Verbs - faire (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I do / I make",
        hint: "Verb faire conjugated for je",
        expectedAnswer: "je fais",
      },
      {
        instruction: "Translate to French",
        prompt: "you do (informal)",
        hint: "Verb faire conjugated for tu",
        expectedAnswer: "tu fais",
      },
      {
        instruction: "Translate to French",
        prompt: "we do / we make",
        hint: "Verb faire conjugated for nous",
        expectedAnswer: "nous faisons",
      },
      {
        instruction: "Translate to French",
        prompt: "what do you do? (informal)",
        hint: "Question: qu'est-ce que + tu + faire",
        expectedAnswer: "qu'est-ce que tu fais",
        acceptableAnswers: ["que fais-tu"],
      },

      // Section 3: Essential Verbs - devoir (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I must / I have to",
        hint: "Verb devoir conjugated for je",
        expectedAnswer: "je dois",
      },
      {
        instruction: "Translate to French",
        prompt: "you must (informal)",
        hint: "Verb devoir conjugated for tu",
        expectedAnswer: "tu dois",
      },
      {
        instruction: "Translate to French",
        prompt: "we must",
        hint: "Verb devoir conjugated for nous",
        expectedAnswer: "nous devons",
      },
      {
        instruction: "Translate to French",
        prompt: "I must leave",
        hint: "je dois + infinitive 'partir'",
        expectedAnswer: "je dois partir",
      },

      // Section 4: Essential Verbs - parler (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I speak",
        hint: "Regular -er verb parler for je",
        expectedAnswer: "je parle",
      },
      {
        instruction: "Translate to French",
        prompt: "you speak (informal)",
        hint: "Regular -er verb parler for tu",
        expectedAnswer: "tu parles",
      },
      {
        instruction: "Translate to French",
        prompt: "we speak",
        hint: "Regular -er verb parler for nous",
        expectedAnswer: "nous parlons",
      },
      {
        instruction: "Translate to French",
        prompt: "I speak French",
        hint: "je parle + language",
        expectedAnswer: "je parle français",
        acceptableAnswers: ["je parle francais"],
      },

      // Section 5: Negation (5 questions)
      {
        instruction: "Translate to French",
        prompt: "not",
        hint: "Negation structure: ne...___",
        expectedAnswer: "ne pas",
        acceptableAnswers: ["ne...pas", "pas"],
      },
      {
        instruction: "Translate to French",
        prompt: "I don't want",
        hint: "Negation: je ne veux pas",
        expectedAnswer: "je ne veux pas",
      },
      {
        instruction: "Translate to French",
        prompt: "he doesn't speak",
        hint: "Negation: il ne parle pas",
        expectedAnswer: "il ne parle pas",
      },
      {
        instruction: "Translate to French",
        prompt: "we can't",
        hint: "Negation: nous ne pouvons pas",
        expectedAnswer: "nous ne pouvons pas",
      },
      {
        instruction: "Translate to French",
        prompt: "I never eat",
        hint: "Negation with jamais: je ne mange jamais",
        expectedAnswer: "je ne mange jamais",
      },

      // Section 6: Time & Frequency (5 questions)
      {
        instruction: "Translate to French",
        prompt: "now",
        hint: "Time adverb for present moment",
        expectedAnswer: "maintenant",
      },
      {
        instruction: "Translate to French",
        prompt: "always",
        hint: "Frequency adverb - 100% of the time",
        expectedAnswer: "toujours",
      },
      {
        instruction: "Translate to French",
        prompt: "never",
        hint: "Frequency adverb - 0% of the time",
        expectedAnswer: "jamais",
      },
      {
        instruction: "Translate to French",
        prompt: "today",
        hint: "Time expression with apostrophe",
        expectedAnswer: "aujourd'hui",
        acceptableAnswers: ["aujourd hui"],
      },
      {
        instruction: "Translate to French",
        prompt: "tomorrow",
        hint: "Future time expression",
        expectedAnswer: "demain",
      },

      // Section 7: Location (3 questions)
      {
        instruction: "Translate to French",
        prompt: "here",
        hint: "Location adverb - this place",
        expectedAnswer: "ici",
      },
      {
        instruction: "Translate to French",
        prompt: "there",
        hint: "Location adverb - that place",
        expectedAnswer: "là",
        acceptableAnswers: ["la"],
      },
      {
        instruction: "Translate to French",
        prompt: "over there",
        hint: "Location adverb - distant place",
        expectedAnswer: "là-bas",
        acceptableAnswers: ["là bas", "la-bas", "la bas"],
      },

      // Section 8: Complex Sentences (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I must speak French here",
        hint: "je dois + parler + français + ici",
        expectedAnswer: "je dois parler français ici",
        acceptableAnswers: ["je dois parler francais ici"],
      },
      {
        instruction: "Translate to French",
        prompt: "we always do things here",
        hint: "nous + frequency adverb + faire + des choses + ici",
        expectedAnswer: "nous faisons toujours des choses ici",
        acceptableAnswers: ["nous faisons des choses ici toujours"],
      },
      {
        instruction: "Translate to French",
        prompt: "she doesn't speak now",
        hint: "elle + negation + parler + maintenant",
        expectedAnswer: "elle ne parle pas maintenant",
      },
      {
        instruction: "Translate to French",
        prompt: "I would like a coffee, please",
        hint: "Combine survival phrases",
        expectedAnswer: "je voudrais un café s'il vous plaît",
        acceptableAnswers: [
          "je voudrais un café, s'il vous plaît",
          "je voudrais un cafe s'il vous plait",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "you must never leave (informal)",
        hint: "tu + devoir + jamais + partir - careful with negation!",
        expectedAnswer: "tu ne dois jamais partir",
      },
    ],
  },
};
