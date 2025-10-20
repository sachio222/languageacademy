/**
 * Module: prendre (to take)
 * Unit 6 - Essential action verb, irregular conjugation
 * Rank 23 in top 100 - extremely high frequency
 * Also teaches: apprendre (to learn), comprendre (to understand)
 */

export const prendreModule = {
  moduleKey: "2024-04-22-prendre", // Permanent identifier - never changes
  title: "prendre - To Take",
  description:
    "Express taking, learning, and understanding: je prends (I take), j'apprends (I learn), je comprends (I understand)",

  concepts: [
    {
      term: "prendre = to take",
      definition:
        "Very common verb for taking things, taking transportation, taking time",
      example:
        "je prends le bus (I take the bus), tu prends ton temps (you take your time)",
    },
    {
      term: "Irregular conjugation",
      definition:
        "Present tense: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent",
      example:
        "Notice: singular sounds like 'pran', plural 'pren-on', 'pren-ay', 'pren'",
    },
    {
      term: "apprendre = to learn",
      definition:
        "Uses same conjugation pattern as prendre - very useful verb!",
      example:
        "j'apprends le français (I learn French), nous apprenons ensemble (we learn together)",
    },
    {
      term: "comprendre = to understand",
      definition: "Also follows prendre pattern - essential for communication!",
      example:
        "je comprends (I understand), tu comprends? (do you understand?)",
    },
    {
      term: "Common uses of prendre",
      definition:
        "Transportation (prendre le bus), food/drink (prendre un café), time (ça prend du temps)",
      example:
        "je prends un café (I'm having a coffee), ça prend deux heures (it takes two hours)",
    },
  ],

  vocabularyReference: [
    {
      french: "prendre",
      english: "to take",
      note: "infinitive form - irregular verb",
    },
    {
      french: "je prends",
      english: "I take",
      note: "sounds like 'pran'",
    },
    {
      french: "tu prends",
      english: "you take (informal)",
      note: "same sound as je",
    },
    {
      french: "il/elle prend",
      english: "he/she takes",
      note: "no 's' at end - still sounds like 'pran'",
    },
    {
      french: "nous prenons",
      english: "we take",
      note: "pronounced 'pren-on'",
    },
    {
      french: "vous prenez",
      english: "you take (formal/plural)",
      note: "pronounced 'pren-ay'",
    },
    {
      french: "ils/elles prennent",
      english: "they take",
      note: "double 'n' - sounds like 'pren'",
    },
    {
      french: "prendre le bus",
      english: "to take the bus",
      note: "common phrase",
    },
    {
      french: "prendre un café",
      english: "to have a coffee",
      note: "prendre = to have (food/drink)",
    },
    {
      french: "apprendre",
      english: "to learn",
      note: "follows same pattern as prendre",
    },
    {
      french: "j'apprends",
      english: "I learn",
      note: "j' before vowel",
    },
    {
      french: "j'apprends le français",
      english: "I learn French / I'm learning French",
      note: "very common phrase!",
    },
    {
      french: "comprendre",
      english: "to understand",
      note: "rank 61 - essential verb!",
    },
    {
      french: "je comprends",
      english: "I understand",
      note: "essential phrase",
    },
    {
      french: "tu comprends?",
      english: "do you understand?",
      note: "common question",
    },
    {
      french: "je ne comprends pas",
      english: "I don't understand",
      note: "very useful phrase!",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic conjugations - prendre
      {
        instruction: 'Say "I take"',
        prompt: "I take",
        hint: "je...",
        expectedAnswer: "je prends",
        acceptableAnswers: ["je prends"],
        wrongAnswers: ["je prend", "je prendre", "je prene"],
        explanation: "Irregular: je prends (with 's')",
      },
      {
        instruction: 'Say "you take" (informal)',
        prompt: "you take (informal)",
        hint: "tu...",
        expectedAnswer: "tu prends",
        acceptableAnswers: ["tu prends"],
        wrongAnswers: ["tu prend", "tu prendre", "tu prenes"],
        explanation: "Same as je: tu prends",
      },
      {
        instruction: 'Say "he takes"',
        prompt: "he takes",
        hint: "il...",
        expectedAnswer: "il prend",
        acceptableAnswers: ["il prend"],
        wrongAnswers: ["il prends", "il prendre", "il prene"],
        explanation: "Third person: il prend (no 's'!)",
      },
      {
        instruction: 'Say "we take"',
        prompt: "we take",
        hint: "nous...",
        expectedAnswer: "nous prenons",
        acceptableAnswers: ["nous prenons"],
        wrongAnswers: ["nous prends", "nous prendre", "nous prenez"],
        explanation: "nous prenons - add -ons",
      },
      {
        instruction: 'Say "you take" (formal)',
        prompt: "you take (formal)",
        hint: "vous...",
        expectedAnswer: "vous prenez",
        acceptableAnswers: ["vous prenez"],
        wrongAnswers: ["vous prends", "vous prendre", "vous prenons"],
        explanation: "vous prenez - add -ez",
      },
      {
        instruction: 'Say "they take"',
        prompt: "they take",
        hint: "ils... (double n!)",
        expectedAnswer: "ils prennent",
        acceptableAnswers: ["ils prennent"],
        wrongAnswers: ["ils prends", "ils prendre", "ils prenent"],
        explanation: "ils prennent - double 'n' + silent -ent",
      },

      // Practical sentences with prendre
      {
        instruction: 'Say "I take the bus"',
        prompt: "I take the bus",
        hint: "je prends le bus",
        expectedAnswer: "je prends le bus",
        acceptableAnswers: ["je prends le bus"],
        wrongAnswers: [
          "je prend le bus",
          "je prendre le bus",
          "je prens le bus",
        ],
        explanation:
          "je prends (I take) + le bus (the bus) - very common phrase",
      },
      {
        instruction: 'Say "you take the train"',
        prompt: "you take the train",
        hint: "tu prends le train",
        expectedAnswer: "tu prends le train",
        acceptableAnswers: ["tu prends le train"],
        wrongAnswers: [
          "tu prend le train",
          "tu prendre le train",
          "tu prens le train",
        ],
        explanation: "tu prends (you take) + le train (the train)",
      },
      {
        instruction: 'Say "she takes her time"',
        prompt: "she takes her time",
        hint: "elle prend son temps",
        expectedAnswer: "elle prend son temps",
        acceptableAnswers: ["elle prend son temps"],
        wrongAnswers: [
          "elle prends son temps",
          "elle prendre son temps",
          "elle prene son temps",
        ],
        explanation: "elle prend (she takes - no 's'!) + son temps (her time)",
      },
      {
        instruction: 'Say "I\'m having a coffee"',
        prompt: "I'm having a coffee",
        hint: "je prends un café",
        expectedAnswer: "je prends un café",
        acceptableAnswers: ["je prends un café", "je prends un cafe"],
        wrongAnswers: [
          "je prend un café",
          "j'ai un café",
          "je prendre un café",
        ],
        explanation:
          "In French, use 'prendre' for having food/drink: je prends un café",
      },
      {
        instruction: 'Say "we take the car"',
        prompt: "we take the car",
        hint: "nous prenons la voiture",
        expectedAnswer: "nous prenons la voiture",
        acceptableAnswers: ["nous prenons la voiture"],
        wrongAnswers: [
          "nous prends la voiture",
          "nous prenez la voiture",
          "nous prendre la voiture",
        ],
        explanation: "nous prenons (we take) + la voiture (the car)",
      },

      // apprendre (to learn)
      {
        instruction: 'Say "I learn"',
        prompt: "I learn",
        hint: "j'...",
        expectedAnswer: "j'apprends",
        acceptableAnswers: ["j apprends"],
        wrongAnswers: ["j'aprends", "j'apprend", "j'apprendre"],
        explanation: "j'apprends - double 'p' like prendre",
      },
      {
        instruction: 'Say "I learn French"',
        prompt: "I learn French",
        hint: "j'apprends le français",
        expectedAnswer: "j'apprends le français",
        acceptableAnswers: ["j apprends le français", "j'apprends le francais"],
        wrongAnswers: [
          "j'aprends le français",
          "j'apprend le français",
          "je apprends le français",
        ],
        explanation: "j'apprends (I learn) + le français (French)",
      },
      {
        instruction: 'Say "you learn quickly"',
        prompt: "you learn quickly",
        hint: "tu apprends vite",
        expectedAnswer: "tu apprends vite",
        acceptableAnswers: ["tu apprends vite"],
        wrongAnswers: [
          "tu aprends vite",
          "tu apprend vite",
          "tu apprendre vite",
        ],
        explanation: "tu apprends (you learn) + vite (quickly)",
      },
      {
        instruction: 'Say "she learns English"',
        prompt: "she learns English",
        hint: "elle apprend l'anglais",
        expectedAnswer: "elle apprend l'anglais",
        acceptableAnswers: ["elle apprend l'anglais", "elle apprend l anglais"],
        wrongAnswers: [
          "elle apprends l'anglais",
          "elle aprend l'anglais",
          "elle apprendre l'anglais",
        ],
        explanation: "elle apprend (no 's'!) + l'anglais (English)",
      },
      {
        instruction: 'Say "we learn together"',
        prompt: "we learn together",
        hint: "nous apprenons ensemble",
        expectedAnswer: "nous apprenons ensemble",
        acceptableAnswers: ["nous apprenons ensemble"],
        wrongAnswers: [
          "nous apprends ensemble",
          "nous aprenons ensemble",
          "nous apprendre ensemble",
        ],
        explanation: "nous apprenons (we learn) + ensemble (together)",
      },

      // comprendre (to understand)
      {
        instruction: 'Say "I understand"',
        prompt: "I understand",
        hint: "je...",
        expectedAnswer: "je comprends",
        acceptableAnswers: ["je comprends"],
        wrongAnswers: ["je comprend", "je comprendre", "je comprene"],
        explanation:
          "je comprends - essential phrase! Rank 61 in top 100 words",
      },
      {
        instruction: 'Say "I don\'t understand"',
        prompt: "I don't understand",
        hint: "je ne comprends pas",
        expectedAnswer: "je ne comprends pas",
        acceptableAnswers: ["je ne comprends pas"],
        wrongAnswers: [
          "je ne comprend pas",
          "je comprends pas",
          "je ne comprendre pas",
        ],
        explanation: "Very useful: je ne comprends pas (I don't understand)",
      },
      {
        instruction: 'Say "do you understand?"',
        prompt: "do you understand?",
        hint: "tu comprends?",
        expectedAnswer: "tu comprends?",
        acceptableAnswers: ["tu comprends?", "tu comprends"],
        wrongAnswers: ["tu comprend?", "tu comprendre?", "comprends-tu?"],
        explanation: "Common question: tu comprends? (do you understand?)",
      },
      {
        instruction: 'Say "he understands French"',
        prompt: "he understands French",
        hint: "il comprend le français",
        expectedAnswer: "il comprend le français",
        acceptableAnswers: [
          "il comprend le français",
          "il comprend le francais",
        ],
        wrongAnswers: [
          "il comprends le français",
          "il comprendre le français",
          "il comprene le français",
        ],
        explanation: "il comprend (no 's'!) + le français",
      },
      {
        instruction: 'Say "we understand the question"',
        prompt: "we understand the question",
        hint: "nous comprenons la question",
        expectedAnswer: "nous comprenons la question",
        acceptableAnswers: ["nous comprenons la question"],
        wrongAnswers: [
          "nous comprends la question",
          "nous comprenez la question",
          "nous comprendre la question",
        ],
        explanation: "nous comprenons (we understand) + la question",
      },
      {
        instruction: 'Say "they don\'t understand"',
        prompt: "they don't understand",
        hint: "ils ne comprennent pas",
        expectedAnswer: "ils ne comprennent pas",
        acceptableAnswers: ["ils ne comprennent pas"],
        wrongAnswers: [
          "ils ne comprends pas",
          "ils comprennent pas",
          "ils ne comprendent pas",
        ],
        explanation: "ils ne comprennent pas - double 'n' + negative",
      },

      // Past tense
      {
        instruction: 'Say "I took the bus"',
        prompt: "I took the bus",
        hint: "j'ai pris le bus",
        expectedAnswer: "j'ai pris le bus",
        acceptableAnswers: ["j ai pris le bus"],
        wrongAnswers: [
          "j'ai prend le bus",
          "j'ai prit le bus",
          "je prends le bus",
        ],
        explanation: "Passé composé: j'ai pris (irregular past participle)",
      },
      {
        instruction: 'Say "I learned a lot"',
        prompt: "I learned a lot",
        hint: "j'ai beaucoup appris",
        expectedAnswer: "j'ai beaucoup appris",
        acceptableAnswers: ["j ai beaucoup appris"],
        wrongAnswers: [
          "j'ai appris beaucoup",
          "j'ai apprend beaucoup",
          "j'apprends beaucoup",
        ],
        explanation:
          "j'ai beaucoup appris - adverb 'beaucoup' before past participle",
      },
    ],
  },
};
