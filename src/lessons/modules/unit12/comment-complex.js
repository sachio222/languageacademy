/**
 * Module 156: Complex comment Questions - Asking How Processes Work
 * Unit 12 - Compose comment with complex subjects and actions
 */

export const commentComplexModule = {
  moduleKey: "2024-03-20-comment-complex", // Permanent identifier - never changes
  title: "Complex comment Questions - Ask How Things Work",
  description:
    "Master asking 'how' about processes: Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute? Comment est-ce qu'on fait ça?",
  unit: 12,

  concepts: [
    {
      term: "comment est-ce que + [subject] + [verb]",
      definition:
        "Pattern for asking how something does something - subject does the action",
      example:
        "Comment est-ce qu'une tortue nage? Comment est-ce qu'un oiseau vole?",
    },
    {
      term: "Animals + Movement Questions",
      definition:
        "Perfect for asking how animals perform their characteristic movements",
      example:
        "Comment est-ce qu'un lapin saute? Comment est-ce qu'un poisson nage?",
    },
    {
      term: "Natural Process Questions",
      definition: "Ask how natural phenomena occur",
      example:
        "Comment est-ce que les plantes poussent? Comment est-ce que le soleil brille?",
    },
    {
      term: "People Questions",
      definition: "Ask how people do things - very practical!",
      example:
        "Comment est-ce qu'on fait ça? Comment est-ce que tu fais ça? Comment est-ce qu'il court si vite?",
    },
    {
      term: "Formal Inversion (Introduction)",
      definition:
        "In formal French, you can invert subject-verb: Comment nage une tortue?",
      example:
        "Informal: Comment est-ce qu'une tortue nage? Formal: Comment nage une tortue?",
    },
  ],

  vocabularyReference: [
    {
      french: "comment est-ce que",
      english: "how",
      note: "⭐ already learned - now compose with any subject!",
    },
    {
      french: "Comment est-ce qu'une tortue nage?",
      english: "How does a turtle swim?",
      note: "animal + movement question",
    },
    {
      french: "Comment est-ce qu'un oiseau vole?",
      english: "How does a bird fly?",
      note: "animal + movement question",
    },
    {
      french: "Comment est-ce qu'un écureuil saute?",
      english: "How does a squirrel jump?",
      note: "animal + movement question",
    },
    {
      french: "Comment est-ce qu'un lapin saute?",
      english: "How does a rabbit jump?",
      note: "animal + movement question",
    },
    {
      french: "Comment est-ce que les plantes poussent?",
      english: "How do plants grow?",
      note: "natural process question",
    },
    {
      french: "Comment est-ce qu'on fait ça?",
      english: "How do we do that?",
      note: "practical question - very common!",
    },
    {
      french: "Comment est-ce que tu fais ça?",
      english: "How do you do that?",
      note: "asking for method",
    },
    {
      french: "Comment est-ce qu'il court si vite?",
      english: "How does he run so fast?",
      note: "with adverb 'si vite'",
    },
    {
      french: "Comment nage une tortue?",
      english: "How does a turtle swim?",
      note: "FORMAL inversion - same meaning",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Animals + movement
      {
        instruction: "Ask 'How does a turtle swim?'",
        prompt: "How does a turtle swim?",
        hint: "comment est-ce que + une tortue nage",
        expectedAnswer: "comment est-ce qu'une tortue nage?",
        acceptableAnswers: [
          "comment est-ce qu'une tortue nage",
          "comment est-ce qu'une tortue nage?",
        ],
      },
      {
        instruction: "Ask 'How does a bird fly?'",
        prompt: "How does a bird fly?",
        hint: "comment est-ce que + un oiseau vole",
        expectedAnswer: "comment est-ce qu'un oiseau vole?",
        acceptableAnswers: [
          "comment est-ce qu'un oiseau vole",
          "comment est-ce qu'un oiseau vole?",
        ],
      },
      {
        instruction: "Ask 'How does a squirrel jump?'",
        prompt: "How does a squirrel jump?",
        hint: "comment est-ce que + un écureuil saute",
        expectedAnswer: "comment est-ce qu'un écureuil saute?",
        acceptableAnswers: [
          "comment est-ce qu'un écureuil saute",
          "comment est-ce qu'un écureuil saute?",
          "comment est-ce qu'un ecureuil saute",
          "comment est-ce qu'un ecureuil saute?",
        ],
      },
      {
        instruction: "Ask 'How does a rabbit jump?'",
        prompt: "How does a rabbit jump?",
        hint: "comment est-ce que + un lapin saute",
        expectedAnswer: "comment est-ce qu'un lapin saute?",
        acceptableAnswers: [
          "comment est-ce qu'un lapin saute",
          "comment est-ce qu'un lapin saute?",
        ],
      },
      {
        instruction: "Ask 'How does a squirrel climb?'",
        prompt: "How does a squirrel climb?",
        hint: "comment est-ce que + un écureuil grimpe",
        expectedAnswer: "comment est-ce qu'un écureuil grimpe?",
        acceptableAnswers: [
          "comment est-ce qu'un écureuil grimpe",
          "comment est-ce qu'un écureuil grimpe?",
          "comment est-ce qu'un ecureuil grimpe",
          "comment est-ce qu'un ecureuil grimpe?",
        ],
      },

      // Natural processes
      {
        instruction: "Ask 'How do plants grow?'",
        prompt: "How do plants grow?",
        hint: "comment est-ce que + les plantes poussent",
        expectedAnswer: "comment est-ce que les plantes poussent?",
        acceptableAnswers: [
          "comment est-ce que les plantes poussent",
          "comment est-ce que les plantes poussent?",
        ],
      },
      {
        instruction: "Ask 'How does the sun shine?'",
        prompt: "How does the sun shine?",
        hint: "comment est-ce que + le soleil brille",
        expectedAnswer: "comment est-ce que le soleil brille?",
        acceptableAnswers: [
          "comment est-ce que le soleil brille",
          "comment est-ce que le soleil brille?",
        ],
      },
      {
        instruction: "Ask 'How does rain fall?'",
        prompt: "How does rain fall?",
        hint: "comment est-ce que + la pluie tombe",
        expectedAnswer: "comment est-ce que la pluie tombe?",
        acceptableAnswers: [
          "comment est-ce que la pluie tombe",
          "comment est-ce que la pluie tombe?",
        ],
      },

      // People questions
      {
        instruction: "Ask 'How do we do that?'",
        prompt: "How do we do that?",
        hint: "comment est-ce que + on fait ça",
        expectedAnswer: "comment est-ce qu'on fait ça?",
        acceptableAnswers: [
          "comment est-ce qu'on fait ça",
          "comment est-ce qu'on fait ça?",
        ],
      },
      {
        instruction: "Ask 'How do you do that?'",
        prompt: "How do you do that?",
        hint: "comment est-ce que + tu fais ça",
        expectedAnswer: "comment est-ce que tu fais ça?",
        acceptableAnswers: [
          "comment est-ce que tu fais ça",
          "comment est-ce que tu fais ça?",
        ],
      },
      {
        instruction: "Ask 'How do you swim?'",
        prompt: "How do you swim?",
        hint: "comment est-ce que + tu nages",
        expectedAnswer: "comment est-ce que tu nages?",
        acceptableAnswers: [
          "comment est-ce que tu nages",
          "comment est-ce que tu nages?",
        ],
      },
      {
        instruction: "Ask 'How does he run so fast?'",
        prompt: "How does he run so fast?",
        hint: "comment est-ce que + il court si vite",
        expectedAnswer: "comment est-ce qu'il court si vite?",
        acceptableAnswers: [
          "comment est-ce qu'il court si vite",
          "comment est-ce qu'il court si vite?",
        ],
      },

      // With causative (composition!)
      {
        instruction: "Ask 'How does that make grass green?'",
        prompt: "How does that make grass green?",
        hint: "comment est-ce que + ça rend l'herbe verte",
        expectedAnswer: "comment est-ce que ça rend l'herbe verte?",
        acceptableAnswers: [
          "comment est-ce que ça rend l'herbe verte",
          "comment est-ce que ça rend l'herbe verte?",
        ],
      },

      // Formal inversion (introduction)
      {
        instruction: "Ask 'How does a turtle swim?' (FORMAL inversion)",
        prompt: "How does a turtle swim? (formal)",
        hint: "comment + nage + une tortue (invert verb-subject!)",
        expectedAnswer: "comment nage une tortue?",
        acceptableAnswers: [
          "comment nage une tortue",
          "comment nage une tortue?",
        ],
        explanation:
          "In formal French, invert verb and subject: Comment nage une tortue? Same meaning as 'Comment est-ce qu'une tortue nage?'",
      },
      {
        instruction: "Ask 'How does a bird fly?' (FORMAL inversion)",
        prompt: "How does a bird fly? (formal)",
        hint: "comment + vole + un oiseau",
        expectedAnswer: "comment vole un oiseau?",
        acceptableAnswers: [
          "comment vole un oiseau",
          "comment vole un oiseau?",
        ],
      },

      // Mixed practice
      {
        instruction: "Ask 'How does one do that?' (formal with 'on')",
        prompt: "How does one do that?",
        hint: "comment est-ce que + on fait ça",
        expectedAnswer: "comment est-ce qu'on fait ça?",
        acceptableAnswers: [
          "comment est-ce qu'on fait ça",
          "comment est-ce qu'on fait ça?",
          "comment fait-on ça",
          "comment fait-on ça?",
        ],
        explanation:
          "Both 'comment est-ce qu'on fait ça?' and 'comment fait-on ça?' are correct!",
      },
    ],
  },

  skipStudyMode: false,
};
