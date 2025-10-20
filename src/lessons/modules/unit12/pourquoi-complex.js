/**
 * Module: Dynamic ID (auto-assigned)5: Complex pourquoi Questions - Asking Why About Processes
 * Unit 12 - Compose pourquoi with ALL structures from Units 1-11
 */

export const pourquoiComplexModule = {
  moduleKey: "2024-03-19-pourquoi-complex", // Permanent identifier - never changes
  title: "Complex pourquoi Questions - Ask Why About Anything",
  description:
    "Master asking 'why' about ANY process: Pourquoi est-ce que le ciel est bleu? Pourquoi est-ce que les oiseaux volent? Combine pourquoi with all tenses and structures!",
  unit: 12,

  concepts: [
    {
      term: "pourquoi + ANY Structure",
      definition:
        "You already know pourquoi - now compose it with EVERYTHING from Units 1-11!",
      example:
        "Pourquoi + être, avoir, action verbs, progressive, past tense, reflexive, modal verbs = infinite questions",
    },
    {
      term: "Basic Pattern: pourquoi est-ce que + statement",
      definition: "Take any statement and add pourquoi est-ce que before it",
      example:
        "Statement: Le ciel est bleu → Question: Pourquoi est-ce que le ciel est bleu?",
    },
    {
      term: "Nature Curiosity Questions",
      definition:
        "Ask why about natural phenomena using vocabulary from previous modules",
      example:
        "Pourquoi est-ce que le soleil brille? Pourquoi est-ce que l'herbe est verte? Pourquoi est-ce que les nuages sont blancs?",
    },
    {
      term: "With All Tenses",
      definition:
        "Pourquoi works with present, past, imparfait, and all verb forms",
      example:
        "Present: Pourquoi tu fais ça? Past: Pourquoi as-tu fait ça? Progressive: Pourquoi es-tu en train de faire ça?",
    },
    {
      term: "Infinite Composition Power",
      definition:
        "Once you master pourquoi, you can ask 'why' about literally anything you can say in French!",
      example:
        "Any vocabulary × pourquoi × any tense = unlimited curiosity questions",
    },
  ],

  vocabularyReference: [
    {
      french: "pourquoi est-ce que",
      english: "why",
      note: "⭐ already learned - now compose with everything!",
    },
    {
      french: "Pourquoi est-ce que le ciel est bleu?",
      english: "Why is the sky blue?",
      note: "nature curiosity question",
    },
    {
      french: "Pourquoi est-ce que l'herbe est verte?",
      english: "Why is grass green?",
      note: "nature curiosity question",
    },
    {
      french: "Pourquoi est-ce que les nuages sont blancs?",
      english: "Why are clouds white?",
      note: "nature curiosity question",
    },
    {
      french: "Pourquoi est-ce que le soleil brille?",
      english: "Why does the sun shine?",
      note: "natural phenomenon question",
    },
    {
      french: "Pourquoi est-ce que les oiseaux volent?",
      english: "Why do birds fly?",
      note: "animal behavior question",
    },
    {
      french: "Pourquoi est-ce que les plantes poussent?",
      english: "Why do plants grow?",
      note: "natural process question",
    },
    {
      french: "Pourquoi est-ce qu'il pleut?",
      english: "Why does it rain?",
      note: "weather question",
    },
    {
      french: "Pourquoi est-ce qu'il fait ça?",
      english: "Why does he do that?",
      note: "action question",
    },
    {
      french: "Pourquoi est-ce que tu cours?",
      english: "Why are you running?",
      note: "movement question",
    },
    {
      french: "Pourquoi est-ce que c'est comme ça?",
      english: "Why is it like that?",
      note: "general question",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Simple être questions
      {
        instruction: "Ask 'Why is the sky blue?'",
        prompt: "Why is the sky blue?",
        hint: "pourquoi est-ce que + le ciel est bleu",
        expectedAnswer: "pourquoi est-ce que le ciel est bleu?",
        acceptableAnswers: [
          "pourquoi est-ce que le ciel est bleu",
          "pourquoi est-ce que le ciel est bleu?",
        ],
      },
      {
        instruction: "Ask 'Why is grass green?'",
        prompt: "Why is grass green?",
        hint: "pourquoi est-ce que + l'herbe est verte",
        expectedAnswer: "pourquoi est-ce que l'herbe est verte?",
        acceptableAnswers: [
          "pourquoi est-ce que l'herbe est verte",
          "pourquoi est-ce que l'herbe est verte?",
        ],
      },
      {
        instruction: "Ask 'Why are clouds white?'",
        prompt: "Why are clouds white?",
        hint: "pourquoi est-ce que + les nuages sont blancs",
        expectedAnswer: "pourquoi est-ce que les nuages sont blancs?",
        acceptableAnswers: [
          "pourquoi est-ce que les nuages sont blancs",
          "pourquoi est-ce que les nuages sont blancs?",
        ],
      },
      {
        instruction: "Ask 'Why is it like that?'",
        prompt: "Why is it like that?",
        hint: "pourquoi est-ce que + c'est comme ça",
        expectedAnswer: "pourquoi est-ce que c'est comme ça?",
        acceptableAnswers: [
          "pourquoi est-ce que c'est comme ça",
          "pourquoi est-ce que c'est comme ça?",
        ],
      },

      // With avoir
      {
        instruction: "Ask 'Why does he have that?'",
        prompt: "Why does he have that?",
        hint: "pourquoi est-ce que + il a ça",
        expectedAnswer: "pourquoi est-ce qu'il a ça?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il a ça",
          "pourquoi est-ce qu'il a ça?",
        ],
      },
      {
        instruction: "Ask 'Why do birds have wings?'",
        prompt: "Why do birds have wings?",
        hint: "pourquoi est-ce que + les oiseaux ont des ailes",
        expectedAnswer: "pourquoi est-ce que les oiseaux ont des ailes?",
        acceptableAnswers: [
          "pourquoi est-ce que les oiseaux ont des ailes",
          "pourquoi est-ce que les oiseaux ont des ailes?",
        ],
      },

      // With action verbs (nature)
      {
        instruction: "Ask 'Why does the sun shine?'",
        prompt: "Why does the sun shine?",
        hint: "pourquoi est-ce que + le soleil brille",
        expectedAnswer: "pourquoi est-ce que le soleil brille?",
        acceptableAnswers: [
          "pourquoi est-ce que le soleil brille",
          "pourquoi est-ce que le soleil brille?",
        ],
      },
      {
        instruction: "Ask 'Why do birds fly?'",
        prompt: "Why do birds fly?",
        hint: "pourquoi est-ce que + les oiseaux volent",
        expectedAnswer: "pourquoi est-ce que les oiseaux volent?",
        acceptableAnswers: [
          "pourquoi est-ce que les oiseaux volent",
          "pourquoi est-ce que les oiseaux volent?",
        ],
      },
      {
        instruction: "Ask 'Why do plants grow?'",
        prompt: "Why do plants grow?",
        hint: "pourquoi est-ce que + les plantes poussent",
        expectedAnswer: "pourquoi est-ce que les plantes poussent?",
        acceptableAnswers: [
          "pourquoi est-ce que les plantes poussent",
          "pourquoi est-ce que les plantes poussent?",
        ],
      },
      {
        instruction: "Ask 'Why does it rain?'",
        prompt: "Why does it rain?",
        hint: "pourquoi est-ce que + il pleut",
        expectedAnswer: "pourquoi est-ce qu'il pleut?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il pleut",
          "pourquoi est-ce qu'il pleut?",
        ],
      },

      // With movement verbs
      {
        instruction: "Ask 'Why are you running?'",
        prompt: "Why are you running?",
        hint: "pourquoi est-ce que + tu cours",
        expectedAnswer: "pourquoi est-ce que tu cours?",
        acceptableAnswers: [
          "pourquoi est-ce que tu cours",
          "pourquoi est-ce que tu cours?",
        ],
      },
      {
        instruction: "Ask 'Why does he do that?'",
        prompt: "Why does he do that?",
        hint: "pourquoi est-ce que + il fait ça",
        expectedAnswer: "pourquoi est-ce qu'il fait ça?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il fait ça",
          "pourquoi est-ce qu'il fait ça?",
        ],
      },

      // With progressive (en train de)
      {
        instruction: "Ask 'Why is he doing that?' (progressive)",
        prompt: "Why is he doing that?",
        hint: "pourquoi est-ce que + il est en train de faire ça",
        expectedAnswer: "pourquoi est-ce qu'il est en train de faire ça?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il est en train de faire ça",
          "pourquoi est-ce qu'il est en train de faire ça?",
        ],
        explanation:
          "Use 'en train de' for ongoing actions - you learned this earlier!",
      },

      // With past tense
      {
        instruction: "Ask 'Why did you do that?' (passé composé)",
        prompt: "Why did you do that?",
        hint: "pourquoi est-ce que + tu as fait ça",
        expectedAnswer: "pourquoi est-ce que tu as fait ça?",
        acceptableAnswers: [
          "pourquoi est-ce que tu as fait ça",
          "pourquoi est-ce que tu as fait ça?",
        ],
      },

      // With modal verbs
      {
        instruction: "Ask 'Why do I have to do that?'",
        prompt: "Why do I have to do that?",
        hint: "pourquoi est-ce que + je dois faire ça",
        expectedAnswer: "pourquoi est-ce que je dois faire ça?",
        acceptableAnswers: [
          "pourquoi est-ce que je dois faire ça",
          "pourquoi est-ce que je dois faire ça?",
        ],
      },
      {
        instruction: "Ask 'Why can we see the sun?'",
        prompt: "Why can we see the sun?",
        hint: "pourquoi est-ce que + on peut voir le soleil",
        expectedAnswer: "pourquoi est-ce qu'on peut voir le soleil?",
        acceptableAnswers: [
          "pourquoi est-ce qu'on peut voir le soleil",
          "pourquoi est-ce qu'on peut voir le soleil?",
        ],
      },

      // With reflexive verbs
      {
        instruction: "Ask 'Why are you hurrying?'",
        prompt: "Why are you hurrying?",
        hint: "pourquoi est-ce que + tu te dépêches",
        expectedAnswer: "pourquoi est-ce que tu te dépêches?",
        acceptableAnswers: [
          "pourquoi est-ce que tu te dépêches",
          "pourquoi est-ce que tu te dépêches?",
          "pourquoi est-ce que tu te depeches?",
        ],
      },

      // Natural processes with need
      {
        instruction: "Ask 'Why do plants need water?'",
        prompt: "Why do plants need water?",
        hint: "pourquoi est-ce que + les plantes ont besoin d'eau",
        expectedAnswer: "pourquoi est-ce que les plantes ont besoin d'eau?",
        acceptableAnswers: [
          "pourquoi est-ce que les plantes ont besoin d'eau",
          "pourquoi est-ce que les plantes ont besoin d'eau?",
        ],
      },
    ],
  },

  skipStudyMode: false,
};
