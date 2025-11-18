/**
 * pouvoir (can / to be able) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { pouvoirConjugations } from "../../vocabularyData.js";

export const pouvoirModule = {
  moduleKey: "2024-01-16-pouvoir", // Permanent identifier - never changes
  title: "Essential Verb - pouvoir (can)",
  description:
    "Express what you can do! Master abilities through active recall and composition practice!",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express ability and possibility (I can, you can, they can)",
      "Ask for permission politely in French",
      "Combine with vouloir to say 'I can want' or 'Can you have?'"
    ],
    realWorldUse: "express what you can do and ask permission",
    nextModuleTeaser: "Add voir to talk about what you see"
  },

  concepts: [
    {
      term: "pouvoir = can/to be able",
      definition:
        "Essential irregular verb for expressing ability, possibility, and permission! One of the most useful verbs in French.",
      example:
        "'I can have that' (Je peux avoir ça), 'Can you be a friend?' (Peux-tu être un ami?), 'We can want a house' (Nous pouvons vouloir une maison)",
    },
    {
      term: "Irregular Conjugation Pattern",
      definition:
        "Notice the pattern: je/tu both use 'peux', then il/elle use 'peut', nous uses 'pouvons', and ils/elles use 'peuvent'!",
      example:
        "je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent",
    },
    {
      term: "Composition Power",
      definition:
        "Combine pouvoir with previous modules for infinite expressions. Use with être, avoir, vouloir, and nouns you've learned!",
      example:
        "je peux + avoir + ça, nous pouvons + être, ils peuvent + vouloir + un livre",
    },
  ],

  vocabularyReference: [
    {
      french: "pouvoir",
      english: "to be able to / can",
      note: "infinitive form",
    },
    { french: "je peux", english: "I can", note: "irregular form" },
    {
      french: "tu peux",
      english: "you can (informal)",
      note: "same as je!",
    },
    { french: "il peut", english: "he can", note: "different ending" },
    { french: "elle peut", english: "she can", note: "same as il" },
    { french: "nous pouvons", english: "we can", note: "regular ending" },
    {
      french: "vous pouvez",
      english: "you can (formal)",
      note: "formal/plural",
    },
    { french: "ils peuvent", english: "they can (masc)", note: "irregular" },
    {
      french: "elles peuvent",
      english: "they can (fem)",
      note: "same as ils",
    },
  ],

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      {
        instruction: "Say what you can do",
        prompt: "I can",
        hint: "Conjugate 'pouvoir' in the present for 'je'.",
        expectedAnswer: "je peux",
        wrongAnswers: [
          {
            answer: "je peut",
            feedback: "Je takes 'peux', not 'peut'. Remember: je peux, il peut",
          },
          {
            answer: "tu peux",
            feedback: "That's 'you can', not 'I can'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you can do",
        prompt: "you can (informal)",
        hint: "Conjugate 'pouvoir' in the present for 'tu'.",
        expectedAnswer: "tu peux",
        wrongAnswers: [
          {
            answer: "tu peut",
            feedback: "Tu takes 'peux', not 'peut'. Pattern: je peux, tu peux",
          },
        ],
      },
      {
        instruction: "Say what he can do",
        prompt: "he can",
        hint: "Conjugate 'pouvoir' in the present for 'il'.",
        expectedAnswer: "il peut",
        wrongAnswers: [
          {
            answer: "il peux",
            feedback:
              "Il takes 'peut', not 'peux'. Remember: il peut, elle peut",
          },
        ],
      },
      {
        instruction: "Say what she can do",
        prompt: "she can",
        hint: "Conjugate 'pouvoir' in the present for 'elle'.",
        expectedAnswer: "elle peut",
        wrongAnswers: [
          {
            answer: "elle peux",
            feedback: "Elle takes 'peut', not 'peux'. Same as il peut",
          },
        ],
      },
      {
        instruction: "Say what we can do",
        prompt: "we can",
        hint: "Conjugate 'pouvoir' in the present for 'nous' (regular -ons ending).",
        expectedAnswer: "nous pouvons",
        wrongAnswers: [
          {
            answer: "nous peux",
            feedback: "Nous takes 'pouvons', not 'peux'. Completely different!",
          },
          {
            answer: "nous peut",
            feedback: "Nous takes 'pouvons', not 'peut'. Regular -ons pattern!",
          },
        ],
      },
      {
        instruction: "Say what you can do (formal)",
        prompt: "you can (formal)",
        hint: "Conjugate 'pouvoir' in the present for 'vous' (regular -ez ending).",
        expectedAnswer: "vous pouvez",
        wrongAnswers: [
          {
            answer: "vous peux",
            feedback: "Vous takes 'pouvez', not 'peux'. Regular -ez pattern!",
          },
          {
            answer: "vous peut",
            feedback: "Vous takes 'pouvez', not 'peut'. Remember: vous pouvez",
          },
        ],
      },
      {
        instruction: "Say what they can do (masculine)",
        prompt: "they can (masculine)",
        hint: "Conjugate 'pouvoir' in the present for 'ils'.",
        expectedAnswer: "ils peuvent",
        wrongAnswers: [
          {
            answer: "ils peux",
            feedback: "Ils takes 'peuvent', not 'peux'. Irregular ending!",
          },
          {
            answer: "ils peut",
            feedback: "Ils takes 'peuvent', not 'peut'. Plural form!",
          },
        ],
      },
      {
        instruction: "Say what they can do (feminine)",
        prompt: "they can (feminine)",
        hint: "Conjugate 'pouvoir' in the present for 'elles'.",
        expectedAnswer: "elles peuvent",
        wrongAnswers: [
          {
            answer: "elles peux",
            feedback: "Elles takes 'peuvent', not 'peux'. Same as ils peuvent",
          },
          {
            answer: "elles peut",
            feedback: "Elles takes 'peuvent', not 'peut'. Plural form!",
          },
        ],
      },

      // Phase 2: Simple compositions with avoir (from previous modules)
      {
        instruction: "Say that you can have that",
        prompt: "I can have that",
        hint: "Start with 'I can' in French, then add infinitive 'avoir' + 'that'.",
        expectedAnswer: "je peux avoir ça",
        wrongAnswers: [
          {
            answer: "je peut avoir ça",
            feedback: "Je takes 'peux', not 'peut'. Remember: je peux, il peut",
          },
          {
            answer: "j'ai ça",
            feedback: "This needs pouvoir! Try: je peux avoir ça",
          },
        ],
      },
      {
        instruction: "Say what he can have",
        prompt: "He can have a book",
        hint: "Start with 'he can' in French, then add infinitive 'avoir' + 'a book'.",
        expectedAnswer: "il peut avoir un livre",
        wrongAnswers: [
          {
            answer: "il peux avoir un livre",
            feedback:
              "Il takes 'peut', not 'peux'. Remember: il peut, elle peut",
          },
          {
            answer: "il a un livre",
            feedback: "This needs pouvoir! Try: il peut avoir un livre",
          },
        ],
      },
      {
        instruction: "Say what we can have",
        prompt: "We can have a house",
        hint: "Start with 'we can' in French, then add infinitive 'avoir' + 'a house'.",
        expectedAnswer: "nous pouvons avoir une maison",
        wrongAnswers: [
          {
            answer: "nous peux avoir une maison",
            feedback: "Nous takes 'pouvons', not 'peux'. Completely different!",
          },
          {
            answer: "nous avons une maison",
            feedback: "This needs pouvoir! Try: nous pouvons avoir une maison",
          },
        ],
      },

      // Phase 3: Composition with être (from previous modules)
      {
        instruction: "Say what you can be",
        prompt: "I can be a friend",
        hint: "Use 'pouvoir' in the present for 'je' + infinitive 'être' + 'a friend'.",
        expectedAnswer: "je peux être un ami",
        acceptableAnswers: ["je peux être une amie"],
        wrongAnswers: [
          {
            answer: "je suis un ami",
            feedback: "This needs pouvoir! Try: je peux être un ami",
          },
          {
            answer: "je peux suis un ami",
            feedback:
              "When you use two verbs together, the second one stays in the infinitive. Here: je peux être un ami.",
          },
        ],
      },
      {
        instruction: "Say what she can be",
        prompt: "She can be an artist",
        hint: "Use 'pouvoir' in the present for 'elle' + infinitive 'être' + a profession.",
        expectedAnswer: "elle peut être artiste",
        acceptableAnswers: ["elle peut être une artiste"],
        wrongAnswers: [
          {
            answer: "elle est artiste",
            feedback:
              "The English says 'can be', so you need 'pouvoir' + infinitive: elle peut être artiste.",
          },
          {
            answer: "elle peut être un artiste",
            feedback:
              "In French you usually drop the article with professions, and for 'she' you’d say 'une artiste' if you use an article at all.",
          },
        ],
      },

      // Phase 4: Composition with vouloir (from previous modules)
      {
        instruction: "Say what you can want",
        prompt: "I can want that",
        hint: "Use 'pouvoir' in the present for 'je' + infinitive 'vouloir' + 'that'.",
        expectedAnswer: "je peux vouloir ça",
        wrongAnswers: [
          {
            answer: "je veux ça",
            feedback: "This needs pouvoir! Try: je peux vouloir ça",
          },
          {
            answer: "je peux veux ça",
            feedback:
              "When you chain two verbs, the second verb should be in the infinitive. Here: je peux vouloir ça.",
          },
        ],
      },
      {
        instruction: "Say what they can want",
        prompt: "They can want a cat",
        hint: "Use 'pouvoir' in the present for 'ils' + infinitive 'vouloir' + 'a cat'.",
        expectedAnswer: "ils peuvent vouloir un chat",
        acceptableAnswers: ["elles peuvent vouloir un chat"],
        wrongAnswers: [
          {
            answer: "ils veulent un chat",
            feedback: "This needs pouvoir! Try: ils peuvent vouloir un chat",
          },
          {
            answer: "ils peux vouloir un chat",
            feedback:
              "Ils takes 'peuvent', not 'peux'. Remember: ils peuvent, elles peuvent.",
          },
        ],
      },

      // Phase 5: Polite requests with ça
      {
        instruction: "Make a polite request",
        prompt: "I can have this, please",
        hint: "Use 'pouvoir' for 'I can have this' and add 'please' (s'il vous plaît).",
        expectedAnswer: "je peux avoir ça, s'il vous plaît",
        acceptableAnswers: [
          "je peux avoir ceci, s'il vous plaît",
          "je peux avoir ça s'il te plaît",
          "je peux avoir ceci s'il te plait",
        ],
        wrongAnswers: [
          {
            answer: "je peut avoir ça, s'il vous plaît",
            feedback:
              "Je takes 'peux', not 'peut'. Remember: je peux, il peut.",
          },
          {
            answer: "j'ai ça, s'il vous plaît",
            feedback:
              "This needs pouvoir for politeness! Try: je peux avoir ça, s'il vous plaît",
          },
        ],
      },
    ],
  },
};
