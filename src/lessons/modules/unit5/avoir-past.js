/**
 * Module: avoir - Past Tense (Imperfect)
 * Unit 5 - Talk about the past: had
 * Imparfait tense: j'avais, tu avais, il avait, etc.
 */

export const avoirPast = {
  moduleKey: "2024-04-05-avoir-past", // Permanent identifier - never changes
  title: "avoir - Past Tense (had)",
  description:
    "Talk about what you had in the past: j'avais (I had), tu avais (you had), il avait (he had)",

  concepts: [
    {
      term: "Past Tense = Imperfect (Imparfait)",
      definition: "Describes what you possessed or experienced in the past",
      example:
        "j'avais un chat (I had a cat), nous avions une maison (we had a house)",
    },
    {
      term: "avais = had (singular)",
      definition: "For je, tu - describing past possession",
      example:
        "j'avais un livre (I had a book), tu avais raison (you were right - literally 'had reason')",
    },
    {
      term: "avait = had (third person singular)",
      definition: "For il/elle - describing what he/she/it had",
      example:
        "il avait un chien (he had a dog), elle avait le temps (she had time)",
    },
    {
      term: "avions, aviez, avaient = had (plural)",
      definition: "For nous, vous, ils/elles - plural past possession",
      example:
        "nous avions une voiture (we had a car), ils avaient faim (they were hungry)",
    },
    {
      term: "Common expressions with avoir",
      definition:
        "Many French expressions use avoir (not être!): avoir faim (to be hungry), avoir raison (to be right)",
      example: "j'avais faim (I was hungry), tu avais raison (you were right)",
    },
  ],

  vocabularyReference: [
    {
      french: "j'avais",
      english: "I had",
      note: "imperfect tense",
    },
    {
      french: "tu avais",
      english: "you had (informal)",
      note: "sounds same as j'avais",
    },
    {
      french: "il/elle avait",
      english: "he/she had",
      note: "slightly different pronunciation",
    },
    {
      french: "nous avions",
      english: "we had",
      note: "imperfect tense",
    },
    {
      french: "vous aviez",
      english: "you had (formal/plural)",
      note: "imperfect tense",
    },
    {
      french: "ils/elles avaient",
      english: "they had",
      note: "sounds like 'avè'",
    },
    {
      french: "avoir faim",
      english: "to be hungry",
      note: "literally 'to have hunger'",
    },
    {
      french: "avoir raison",
      english: "to be right",
      note: "literally 'to have reason'",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I had a cat"',
        prompt: "I had a cat",
        hint: "j'avais + un chat",
        expectedAnswer: "j'avais un chat",
        acceptableAnswers: ["j avais un chat"],
        wrongAnswers: [
          {
            answer: "j'ai un chat",
            feedback:
              "That's present 'I have' - use 'j'avais' for past 'I had'",
          },
        ],
      },
      {
        instruction: 'Say "I had a book"',
        prompt: "I had a book",
        hint: "j'avais + un livre",
        expectedAnswer: "j'avais un livre",
        acceptableAnswers: ["j avais un livre"],
        wrongAnswers: [
          {
            answer: "j'ai un livre",
            feedback: "That's 'I have' - use 'j'avais' for 'I had'",
          },
        ],
      },
      {
        instruction: 'Say "you had a dog" (informal)',
        prompt: "you had a dog",
        hint: "tu avais + un chien",
        expectedAnswer: "tu avais un chien",
        wrongAnswers: [
          {
            answer: "tu as un chien",
            feedback: "That's 'you have' - use 'tu avais' for 'you had'",
          },
        ],
      },
      {
        instruction: 'Say "you had time" (informal)',
        prompt: "you had time",
        hint: "tu avais + le temps",
        expectedAnswer: "tu avais le temps",
        wrongAnswers: [
          {
            answer: "tu as le temps",
            feedback: "That's 'you have' - use 'tu avais' for 'you had'",
          },
        ],
      },
      {
        instruction: 'Say "he had a car"',
        prompt: "he had a car",
        hint: "il avait + une voiture",
        expectedAnswer: "il avait une voiture",
        wrongAnswers: [
          {
            answer: "il a une voiture",
            feedback: "That's 'he has' - use 'il avait' for 'he had'",
          },
          {
            answer: "il avais une voiture",
            feedback: "Use 'avait' (with -t) for il/elle, not 'avais'",
          },
        ],
      },
      {
        instruction: 'Say "she had a house"',
        prompt: "she had a house",
        hint: "elle avait + une maison",
        expectedAnswer: "elle avait une maison",
        wrongAnswers: [
          {
            answer: "elle a une maison",
            feedback: "That's 'she has' - use 'elle avait' for 'she had'",
          },
          {
            answer: "elle avais une maison",
            feedback: "Use 'avait' for elle, not 'avais'",
          },
        ],
      },
      {
        instruction: 'Say "we had a cat"',
        prompt: "we had a cat",
        hint: "nous avions + un chat",
        expectedAnswer: "nous avions un chat",
        wrongAnswers: [
          {
            answer: "nous avons un chat",
            feedback: "That's 'we have' - use 'nous avions' for 'we had'",
          },
          {
            answer: "nous avait un chat",
            feedback: "Use 'avions' for nous, not 'avait'",
          },
        ],
      },
      {
        instruction: 'Say "we had time"',
        prompt: "we had time",
        hint: "nous avions + le temps",
        expectedAnswer: "nous avions le temps",
        wrongAnswers: [
          {
            answer: "nous avons le temps",
            feedback: "That's 'we have' - use 'nous avions' for 'we had'",
          },
        ],
      },
      {
        instruction: 'Say "you had a book" (formal or plural)',
        prompt: "you had a book (formal)",
        hint: "vous aviez + un livre",
        expectedAnswer: "vous aviez un livre",
        wrongAnswers: [
          {
            answer: "vous avez un livre",
            feedback: "That's 'you have' - use 'vous aviez' for 'you had'",
          },
          {
            answer: "vous avions un livre",
            feedback: "Use 'aviez' for vous, not 'avions'",
          },
        ],
      },
      {
        instruction: 'Say "you had money" (formal)',
        prompt: "you had money (formal)",
        hint: "vous aviez + de l'argent",
        expectedAnswer: "vous aviez de l'argent",
        acceptableAnswers: ["vous aviez de l argent", "vous aviez l'argent"],
        wrongAnswers: [
          {
            answer: "vous avez de l'argent",
            feedback: "That's 'you have' - use 'vous aviez' for 'you had'",
          },
        ],
      },
      {
        instruction: 'Say "they had a house"',
        prompt: "they had a house",
        hint: "ils/elles avaient + une maison",
        expectedAnswer: "ils avaient une maison",
        acceptableAnswers: ["elles avaient une maison"],
        wrongAnswers: [
          {
            answer: "ils ont une maison",
            feedback: "That's 'they have' - use 'ils avaient' for 'they had'",
          },
          {
            answer: "ils avait une maison",
            feedback: "Use 'avaient' for ils/elles, not 'avait'",
          },
        ],
      },
      {
        instruction: 'Say "they had children"',
        prompt: "they had children",
        hint: "ils/elles avaient + des enfants",
        expectedAnswer: "ils avaient des enfants",
        acceptableAnswers: ["elles avaient des enfants"],
        wrongAnswers: [
          {
            answer: "ils ont des enfants",
            feedback: "That's 'they have' - use 'ils avaient' for 'they had'",
          },
        ],
      },
      {
        instruction: 'Say "I was hungry" (literally: I had hunger)',
        prompt: "I was hungry",
        hint: "j'avais + faim (avoir faim = to be hungry)",
        expectedAnswer: "j'avais faim",
        acceptableAnswers: ["j avais faim"],
        wrongAnswers: [
          {
            answer: "j'ai faim",
            feedback:
              "That's 'I am hungry' - use 'j'avais faim' for 'I was hungry'",
          },
          {
            answer: "j'étais faim",
            feedback:
              "Use 'avais' not 'étais' - it's avoir faim, not être faim",
          },
        ],
      },
      {
        instruction: 'Say "you were hungry" (informal)',
        prompt: "you were hungry",
        hint: "tu avais + faim",
        expectedAnswer: "tu avais faim",
        wrongAnswers: [
          {
            answer: "tu as faim",
            feedback:
              "That's 'you are hungry' - use 'tu avais faim' for 'you were hungry'",
          },
        ],
      },
      {
        instruction: 'Say "we were hungry"',
        prompt: "we were hungry",
        hint: "nous avions + faim",
        expectedAnswer: "nous avions faim",
        wrongAnswers: [
          {
            answer: "nous avons faim",
            feedback:
              "That's 'we are hungry' - use 'nous avions faim' for 'we were hungry'",
          },
        ],
      },
      {
        instruction:
          'Say "you were right" (informal - literally: you had reason)',
        prompt: "you were right",
        hint: "tu avais + raison (avoir raison = to be right)",
        expectedAnswer: "tu avais raison",
        wrongAnswers: [
          {
            answer: "tu as raison",
            feedback:
              "That's 'you are right' - use 'tu avais raison' for 'you were right'",
          },
          {
            answer: "tu étais raison",
            feedback:
              "Use 'avais' not 'étais' - it's avoir raison, not être raison",
          },
        ],
      },
      {
        instruction: 'Say "I did not have a cat"',
        prompt: "I didn't have a cat",
        hint: "je n'avais pas + de chat (use 'de' after negation!)",
        expectedAnswer: "je n'avais pas de chat",
        acceptableAnswers: ["je n avais pas de chat"],
        wrongAnswers: [
          {
            answer: "je n'ai pas de chat",
            feedback: "Use past tense 'n'avais pas' for 'didn't have'",
          },
          {
            answer: "je n'avais pas un chat",
            feedback: "Use 'de' after negation, not 'un': pas de chat",
          },
        ],
      },
      {
        instruction: 'Say "you did not have time" (informal)',
        prompt: "you didn't have time",
        hint: "tu n'avais pas + le temps",
        expectedAnswer: "tu n'avais pas le temps",
        acceptableAnswers: ["tu n avais pas le temps"],
        wrongAnswers: [
          {
            answer: "tu n'as pas le temps",
            feedback: "Use past tense 'n'avais pas' for 'didn't have'",
          },
        ],
      },
      {
        instruction: 'Say "he did not have a car"',
        prompt: "he didn't have a car",
        hint: "il n'avait pas + de voiture",
        expectedAnswer: "il n'avait pas de voiture",
        acceptableAnswers: ["il n avait pas de voiture"],
        wrongAnswers: [
          {
            answer: "il n'a pas de voiture",
            feedback: "Use past tense 'n'avait pas' for 'didn't have'",
          },
        ],
      },
      {
        instruction: 'Say "we did not have money"',
        prompt: "we didn't have money",
        hint: "nous n'avions pas + d'argent",
        expectedAnswer: "nous n'avions pas d'argent",
        acceptableAnswers: [
          "nous n avions pas d'argent",
          "nous n'avions pas d argent",
        ],
        wrongAnswers: [
          {
            answer: "nous n'avons pas d'argent",
            feedback: "Use past tense 'n'avions pas' for 'didn't have'",
          },
        ],
      },
    ],
  },
};
