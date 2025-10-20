/**
 * Module 158: Inversion Questions - Formal Register
 * Unit 12 - Master formal question structure with verb-subject inversion
 */

export const inversionQuestionsModule = {
  title: "Inversion Questions - Formal Register",
  description:
    "Master formal French questions with inversion: Pourquoi les nuages sont-ils blancs? Comment fait-on ça? Où vas-tu? Add stylistic range!",
  unit: 12,

  concepts: [
    {
      term: "Verb-Subject Inversion",
      definition: "In formal French, flip the verb and subject with a hyphen",
      example:
        "Informal: Comment est-ce que tu fais ça? Formal: Comment fais-tu ça?",
    },
    {
      term: "When to Use Inversion",
      definition:
        "More common in: formal writing, literature, professional settings, with question words",
      example:
        "Où vas-tu? (Where are you going?), Quand arrives-tu? (When do you arrive?)",
    },
    {
      term: "The -t- Liaison Trick",
      definition:
        "Add -t- between vowel-ending verbs and il/elle/on for pronunciation",
      example:
        "a + il → a-t-il (Pourquoi a-t-il ça?), va + elle → va-t-elle (Où va-t-elle?)",
    },
    {
      term: "With Complex Subjects",
      definition:
        "When subject is a noun phrase, keep noun then add inverted pronoun",
      example:
        "Les nuages sont-ils blancs? (noun 'les nuages' + inverted 'sont-ils')",
    },
    {
      term: "Both Forms Are Correct!",
      definition:
        "Students can choose based on formality level - both are valid French",
      example:
        "Casual: Comment est-ce que tu fais ça? Formal: Comment fais-tu ça? (same meaning)",
    },
  ],

  vocabularyReference: [
    {
      french: "Comment fais-tu ça?",
      english: "How do you do that?",
      note: "inversion: verb-subject with hyphen",
    },
    {
      french: "Où vas-tu?",
      english: "Where are you going?",
      note: "inversion with aller",
    },
    {
      french: "Pourquoi court-il?",
      english: "Why does he run?",
      note: "inversion with courir",
    },
    {
      french: "Pourquoi a-t-il ça?",
      english: "Why does he have that?",
      note: "⭐ -t- liaison: vowel verb + il",
    },
    {
      french: "Où va-t-elle?",
      english: "Where is she going?",
      note: "⭐ -t- liaison: va + elle",
    },
    {
      french: "Pourquoi les nuages sont-ils blancs?",
      english: "Why are clouds white?",
      note: "complex subject: noun + inverted pronoun",
    },
    {
      french: "Comment nage une tortue?",
      english: "How does a turtle swim?",
      note: "simple inversion with noun",
    },
    {
      french: "Où vont les oiseaux en hiver?",
      english: "Where do birds go in winter?",
      note: "inversion with plural noun",
    },
    {
      french: "Quand fleurissent les plantes?",
      english: "When do plants bloom?",
      note: "formal inversion with plants",
    },
    {
      french: "Comment fait-on ça?",
      english: "How does one do that?",
      note: "inversion with 'on'",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic inversion with tu
      {
        instruction: "Ask 'How do you do that?' (FORMAL inversion)",
        prompt: "How do you do that? (formal)",
        hint: "comment + fais-tu + ça",
        expectedAnswer: "comment fais-tu ça?",
        acceptableAnswers: ["comment fais-tu ça", "comment fais-tu ça?"],
      },
      {
        instruction: "Ask 'Where are you going?' (FORMAL inversion)",
        prompt: "Where are you going? (formal)",
        hint: "où + vas-tu",
        expectedAnswer: "où vas-tu?",
        acceptableAnswers: ["où vas-tu", "où vas-tu?"],
      },
      {
        instruction: "Ask 'When do you arrive?' (FORMAL inversion)",
        prompt: "When do you arrive? (formal)",
        hint: "quand + arrives-tu",
        expectedAnswer: "quand arrives-tu?",
        acceptableAnswers: ["quand arrives-tu", "quand arrives-tu?"],
      },

      // Inversion with il/elle
      {
        instruction: "Ask 'Why does he run?' (FORMAL inversion)",
        prompt: "Why does he run? (formal)",
        hint: "pourquoi + court-il",
        expectedAnswer: "pourquoi court-il?",
        acceptableAnswers: ["pourquoi court-il", "pourquoi court-il?"],
      },
      {
        instruction: "Ask 'Where does she live?' (FORMAL inversion)",
        prompt: "Where does she live? (formal)",
        hint: "où + vit-elle",
        expectedAnswer: "où vit-elle?",
        acceptableAnswers: ["où vit-elle", "où vit-elle?"],
      },

      // -t- liaison trick!
      {
        instruction: "Ask 'Why does he have that?' (FORMAL with -t-)",
        prompt: "Why does he have that? (formal)",
        hint: "pourquoi + a-t-il + ça (need -t- between 'a' and 'il'!)",
        expectedAnswer: "pourquoi a-t-il ça?",
        acceptableAnswers: ["pourquoi a-t-il ça", "pourquoi a-t-il ça?"],
        explanation:
          "Add -t- between vowel-ending verb and il/elle for liaison: a-t-il",
      },
      {
        instruction: "Ask 'Where is she going?' (FORMAL with -t-)",
        prompt: "Where is she going? (formal)",
        hint: "où + va-t-elle (need -t- between 'va' and 'elle'!)",
        expectedAnswer: "où va-t-elle?",
        acceptableAnswers: ["où va-t-elle", "où va-t-elle?"],
      },
      {
        instruction: "Ask 'When does he arrive?' (FORMAL with -t-)",
        prompt: "When does he arrive? (formal)",
        hint: "quand + arrive-t-il",
        expectedAnswer: "quand arrive-t-il?",
        acceptableAnswers: ["quand arrive-t-il", "quand arrive-t-il?"],
      },

      // Complex subjects with nouns
      {
        instruction: "Ask 'Why are clouds white?' (FORMAL with noun)",
        prompt: "Why are clouds white? (formal)",
        hint: "pourquoi + les nuages sont-ils blancs",
        expectedAnswer: "pourquoi les nuages sont-ils blancs?",
        acceptableAnswers: [
          "pourquoi les nuages sont-ils blancs",
          "pourquoi les nuages sont-ils blancs?",
        ],
        explanation:
          "With noun subjects, keep noun then add inverted pronoun: les nuages sont-ils",
      },
      {
        instruction: "Ask 'How does a turtle swim?' (FORMAL)",
        prompt: "How does a turtle swim? (formal)",
        hint: "comment + nage une tortue",
        expectedAnswer: "comment nage une tortue?",
        acceptableAnswers: [
          "comment nage une tortue",
          "comment nage une tortue?",
        ],
      },
      {
        instruction: "Ask 'Where do birds go in winter?' (FORMAL)",
        prompt: "Where do birds go in winter? (formal)",
        hint: "où + vont les oiseaux en hiver",
        expectedAnswer: "où vont les oiseaux en hiver?",
        acceptableAnswers: [
          "où vont les oiseaux en hiver",
          "où vont les oiseaux en hiver?",
        ],
      },

      // With 'on'
      {
        instruction: "Ask 'How does one do that?' (FORMAL with 'on')",
        prompt: "How does one do that? (formal)",
        hint: "comment + fait-on + ça",
        expectedAnswer: "comment fait-on ça?",
        acceptableAnswers: ["comment fait-on ça", "comment fait-on ça?"],
      },

      // Nature questions
      {
        instruction: "Ask 'When do plants bloom?' (FORMAL)",
        prompt: "When do plants bloom? (formal)",
        hint: "quand + fleurissent les plantes",
        expectedAnswer: "quand fleurissent les plantes?",
        acceptableAnswers: [
          "quand fleurissent les plantes",
          "quand fleurissent les plantes?",
        ],
      },
      {
        instruction: "Ask 'How does a bird fly?' (FORMAL)",
        prompt: "How does a bird fly? (formal)",
        hint: "comment + vole un oiseau",
        expectedAnswer: "comment vole un oiseau?",
        acceptableAnswers: [
          "comment vole un oiseau",
          "comment vole un oiseau?",
        ],
      },

      // Comparison with est-ce que
      {
        instruction:
          "Transform: 'Comment est-ce que tu fais ça?' → formal inversion",
        prompt: "How do you do that? (formal)",
        hint: "Remove est-ce que, invert: comment fais-tu ça",
        expectedAnswer: "comment fais-tu ça?",
        acceptableAnswers: ["comment fais-tu ça", "comment fais-tu ça?"],
        explanation:
          "Both forms mean the same! Informal: Comment est-ce que tu fais ça? Formal: Comment fais-tu ça?",
      },
    ],
  },

  skipStudyMode: false,
};
