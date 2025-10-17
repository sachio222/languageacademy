/**
 * Module 159: Embedded Questions - Indirect Questions
 * Unit 12 - Questions inside statements for politeness and natural flow
 */

export const embeddedQuestionsModule = {
  title: "Embedded Questions - Polite Indirect Questions",
  description:
    "Soften questions by embedding them: Je me demande pourquoi c'est comme ça. Je ne sais pas comment on fait ça. Natural conversation flow!",
  unit: 12,

  concepts: [
    {
      term: "Questions Inside Statements",
      definition:
        "Embed a question inside a statement to make it softer and more polite",
      example:
        "Direct: Pourquoi est-ce que c'est comme ça? Embedded: Je me demande pourquoi c'est comme ça.",
    },
    {
      term: "Three Common Starters",
      definition:
        "'Je me demande' (I wonder), 'Je ne sais pas' (I don't know), 'Peux-tu me dire' (Can you tell me)",
      example:
        "Je me demande comment..., Je ne sais pas pourquoi..., Peux-tu me dire où...?",
    },
    {
      term: "NO est-ce que After These Phrases!",
      definition:
        "After embedding starters, use statement word order - no est-ce que needed",
      example:
        "Je me demande pourquoi le ciel est bleu (NOT: Je me demande pourquoi est-ce que le ciel est bleu)",
    },
    {
      term: "Makes Questions More Polite",
      definition:
        "Embedded questions sound less direct and more conversational",
      example:
        "Direct: Où est la gare? Polite: Peux-tu me dire où est la gare?",
    },
    {
      term: "Natural Conversation Flow",
      definition:
        "Native speakers use embedded questions constantly in casual speech",
      example:
        "Tu sais pourquoi il fait ça? On ne comprend pas comment ça marche.",
    },
  ],

  vocabularyReference: [
    {
      french: "je me demande",
      english: "I wonder",
      note: "⭐ followed by question word + statement order",
    },
    {
      french: "je ne sais pas",
      english: "I don't know",
      note: "⭐ followed by question word + statement order",
    },
    {
      french: "peux-tu me dire",
      english: "can you tell me",
      note: "⭐ polite way to ask - followed by question",
    },
    {
      french: "Je me demande pourquoi c'est comme ça",
      english: "I wonder why it's like that",
      note: "embedded question - no est-ce que!",
    },
    {
      french: "Je ne sais pas comment on fait ça",
      english: "I don't know how we do that",
      note: "embedded question - statement order",
    },
    {
      french: "Peux-tu me dire où est la gare?",
      english: "Can you tell me where the station is?",
      note: "polite question",
    },
    {
      french: "Tu sais pourquoi il fait ça?",
      english: "Do you know why he does that?",
      note: "natural conversation",
    },
    {
      french: "On ne comprend pas comment ça marche",
      english: "We don't understand how that works",
      note: "embedded understanding question",
    },
    {
      french: "Je me demande comment ça marche",
      english: "I wonder how that works",
      note: "curiosity expression",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Je me demande + question
      {
        instruction: "Say 'I wonder why it's like that'",
        prompt: "I wonder why it's like that",
        hint: "je me demande + pourquoi c'est comme ça (no est-ce que!)",
        expectedAnswer: "je me demande pourquoi c'est comme ça",
        acceptableAnswers: ["je me demande pourquoi c'est comme ça"],
        explanation:
          "After 'je me demande', use statement order - no est-ce que needed!",
      },
      {
        instruction: "Say 'I wonder how that works'",
        prompt: "I wonder how that works",
        hint: "je me demande + comment ça marche",
        expectedAnswer: "je me demande comment ça marche",
        acceptableAnswers: ["je me demande comment ça marche"],
      },
      {
        instruction: "Say 'I wonder why the sky is blue'",
        prompt: "I wonder why the sky is blue",
        hint: "je me demande + pourquoi le ciel est bleu",
        expectedAnswer: "je me demande pourquoi le ciel est bleu",
        acceptableAnswers: ["je me demande pourquoi le ciel est bleu"],
      },
      {
        instruction: "Say 'I wonder where he is'",
        prompt: "I wonder where he is",
        hint: "je me demande + où il est",
        expectedAnswer: "je me demande où il est",
        acceptableAnswers: ["je me demande où il est"],
      },

      // Je ne sais pas + question
      {
        instruction: "Say 'I don't know how we do that'",
        prompt: "I don't know how we do that",
        hint: "je ne sais pas + comment on fait ça",
        expectedAnswer: "je ne sais pas comment on fait ça",
        acceptableAnswers: ["je ne sais pas comment on fait ça"],
      },
      {
        instruction: "Say 'I don't know why he does that'",
        prompt: "I don't know why he does that",
        hint: "je ne sais pas + pourquoi il fait ça",
        expectedAnswer: "je ne sais pas pourquoi il fait ça",
        acceptableAnswers: ["je ne sais pas pourquoi il fait ça"],
      },
      {
        instruction: "Say 'I don't know how a turtle swims'",
        prompt: "I don't know how a turtle swims",
        hint: "je ne sais pas + comment une tortue nage",
        expectedAnswer: "je ne sais pas comment une tortue nage",
        acceptableAnswers: ["je ne sais pas comment une tortue nage"],
      },
      {
        instruction: "Say 'I don't know where the station is'",
        prompt: "I don't know where the station is",
        hint: "je ne sais pas + où est la gare",
        expectedAnswer: "je ne sais pas où est la gare",
        acceptableAnswers: ["je ne sais pas où est la gare"],
      },

      // Peux-tu me dire + question
      {
        instruction: "Ask 'Can you tell me where the station is?'",
        prompt: "Can you tell me where the station is?",
        hint: "peux-tu me dire + où est la gare",
        expectedAnswer: "peux-tu me dire où est la gare?",
        acceptableAnswers: [
          "peux-tu me dire où est la gare",
          "peux-tu me dire où est la gare?",
        ],
      },
      {
        instruction: "Ask 'Can you tell me how that works?'",
        prompt: "Can you tell me how that works?",
        hint: "peux-tu me dire + comment ça marche",
        expectedAnswer: "peux-tu me dire comment ça marche?",
        acceptableAnswers: [
          "peux-tu me dire comment ça marche",
          "peux-tu me dire comment ça marche?",
        ],
      },
      {
        instruction: "Ask 'Can you tell me why he does that?'",
        prompt: "Can you tell me why he does that?",
        hint: "peux-tu me dire + pourquoi il fait ça",
        expectedAnswer: "peux-tu me dire pourquoi il fait ça?",
        acceptableAnswers: [
          "peux-tu me dire pourquoi il fait ça",
          "peux-tu me dire pourquoi il fait ça?",
        ],
      },

      // Tu sais + question (natural)
      {
        instruction: "Ask 'Do you know why he does that?'",
        prompt: "Do you know why he does that?",
        hint: "tu sais + pourquoi il fait ça",
        expectedAnswer: "tu sais pourquoi il fait ça?",
        acceptableAnswers: [
          "tu sais pourquoi il fait ça",
          "tu sais pourquoi il fait ça?",
        ],
      },

      // On ne comprend pas + question
      {
        instruction: "Say 'We don't understand why it's like that'",
        prompt: "We don't understand why it's like that",
        hint: "on ne comprend pas + pourquoi c'est comme ça",
        expectedAnswer: "on ne comprend pas pourquoi c'est comme ça",
        acceptableAnswers: ["on ne comprend pas pourquoi c'est comme ça"],
      },

      // Direct → embedded transformations
      {
        instruction:
          "Transform: 'Pourquoi est-ce que le ciel est bleu?' → 'I wonder why...'",
        prompt: "I wonder why the sky is blue",
        hint: "je me demande + drop est-ce que",
        expectedAnswer: "je me demande pourquoi le ciel est bleu",
        acceptableAnswers: ["je me demande pourquoi le ciel est bleu"],
        explanation:
          "Transform direct questions to embedded by removing est-ce que!",
      },
      {
        instruction:
          "Transform: 'Comment est-ce qu'une tortue nage?' → 'I don't know how...'",
        prompt: "I don't know how a turtle swims",
        hint: "je ne sais pas + drop est-ce que",
        expectedAnswer: "je ne sais pas comment une tortue nage",
        acceptableAnswers: ["je ne sais pas comment une tortue nage"],
      },
    ],
  },

  skipStudyMode: false,
};
