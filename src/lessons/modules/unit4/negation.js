/**
 * Negation - ne...pas (not)
 * Essential for saying what you DON'T do/have/want
 * CRITICAL negation structure!
 */

export const negation = {
  moduleKey: "2024-03-28-negation", // Permanent identifier - never changes
  title: "Negation - ne...pas (not)",
  description:
    "Say what you DON'T want, DON'T have, or DON'T do! Simple pattern: wrap your verb with ne...pas.",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Say what you don't do, don't have, or don't want",
      "Negate any French sentence with ne...pas",
      "Express disagreement and refusal politely"
    ],
    realWorldUse: "express what you don't do or want",
    milestone: "Negative expressions mastered",
    nextModuleTeaser: "Add time words to say when things happen"
  },

  concepts: [
    {
      term: "The Negation Sandwich",
      definition: "Put 'ne' BEFORE the verb and 'pas' AFTER the verb",
      example: "je suis → je ne suis pas (I am → I am not)",
    },
    {
      term: "ne contracts to n'",
      definition: "Before vowels or silent h, 'ne' becomes 'n''",
      example: "je ai → je n'ai pas (I don't have)",
    },
    {
      term: "Works with ALL Verbs",
      definition: "Any verb you've learned can be negated with ne...pas",
      example: "je veux → je ne veux pas, tu vas → tu ne vas pas",
    },
    {
      term: "With Object Pronouns",
      definition: "Object pronouns stay BEFORE the verb, inside the sandwich",
      example: "je le vois → je ne le vois pas (I don't see it)",
    },
  ],

  vocabularyReference: [
    { french: "ne...pas", english: "not", note: "wraps around verb" },
    { french: "je ne suis pas", english: "I am not", note: "être negated" },
    { french: "je n'ai pas", english: "I don't have", note: "avoir negated" },
    {
      french: "je ne veux pas",
      english: "I don't want",
      note: "vouloir negated",
    },
    {
      french: "je ne fais pas",
      english: "I don't do/make",
      note: "faire negated",
    },
    {
      french: "tu ne vas pas",
      english: "you don't go",
      note: "aller negated",
    },
    {
      french: "il ne voit pas",
      english: "he doesn't see",
      note: "voir negated",
    },
    {
      french: "je ne le vois pas",
      english: "I don't see it",
      note: "with object pronoun",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Negate this sentence: 'je suis'",
        prompt: "I am not",
        hint: "Add ne before suis and pas after",
        expectedAnswer: "je ne suis pas",
        wrongAnswers: [
          {
            answer: "je ne suis",
            feedback: "Need 'pas' after the verb too",
          },
          {
            answer: "je suis pas",
            feedback: "Need 'ne' before the verb too",
          },
        ],
      },
      {
        instruction: "Negate this sentence: 'j'ai'",
        prompt: "I don't have",
        hint: "ne becomes n' before vowel: je n'ai pas",
        expectedAnswer: "je n'ai pas",
        wrongAnswers: [
          {
            answer: "je ne ai pas",
            feedback: "Use n' before vowels, not 'ne'",
          },
        ],
      },
      {
        instruction: "Negate this sentence: 'tu es'",
        prompt: "you are not (informal)",
        hint: "ne...pas around 'es'",
        expectedAnswer: "tu n'es pas",
        wrongAnswers: [
          {
            answer: "tu ne es pas",
            feedback: "Use n' before vowels",
          },
        ],
      },
      {
        instruction: "Negate this sentence: 'il a'",
        prompt: "he doesn't have",
        hint: "ne...pas around 'a'",
        expectedAnswer: "il n'a pas",
        wrongAnswers: [],
      },
      {
        instruction: "Negate this sentence: 'je veux'",
        prompt: "I don't want",
        hint: "ne...pas around 'veux'",
        expectedAnswer: "je ne veux pas",
        wrongAnswers: [
          {
            answer: "je n'veux pas",
            feedback: "veux starts with consonant, use 'ne' not 'n''",
          },
        ],
      },
      {
        instruction: "Negate this sentence: 'tu vas'",
        prompt: "you don't go (informal)",
        hint: "ne...pas around 'vas'",
        expectedAnswer: "tu ne vas pas",
        wrongAnswers: [],
      },
      {
        instruction: "Negate this sentence: 'nous avons'",
        prompt: "we don't have",
        hint: "ne...pas around 'avons'",
        expectedAnswer: "nous n'avons pas",
        wrongAnswers: [
          {
            answer: "nous ne avons pas",
            feedback: "Use n' before vowels",
          },
        ],
      },
      {
        instruction: "Say 'I don't have a cat'",
        prompt: "I don't have a cat",
        hint: "Negate 'j'ai un chat'",
        expectedAnswer: "je n'ai pas un chat",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she is not a woman'",
        prompt: "she is not a woman",
        hint: "Negate 'elle est une femme'",
        expectedAnswer: "elle n'est pas une femme",
        wrongAnswers: [],
      },
      {
        instruction: "Negate 'je le vois' (with object pronoun)",
        prompt: "I don't see it",
        hint: "Object pronoun stays inside: je ne LE vois pas",
        expectedAnswer: "je ne le vois pas",
        wrongAnswers: [
          {
            answer: "je le ne vois pas",
            feedback: "ne goes BEFORE object pronoun: je NE le vois pas",
          },
        ],
      },
      {
        instruction: "Say 'you are not' (informal)",
        prompt: "you are not (informal)",
        hint: "Negate 'tu es'",
        expectedAnswer: "tu n'es pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'they don't have' (masculine)",
        prompt: "they don't have (masculine)",
        hint: "Negate 'ils ont'",
        expectedAnswer: "ils n'ont pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we are not at the café'",
        prompt: "we are not at the café",
        hint: "Negate 'nous sommes au café'",
        expectedAnswer: "nous ne sommes pas au café",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she doesn't want this'",
        prompt: "she doesn't want this",
        hint: "Negate 'elle veut ça'",
        expectedAnswer: "elle ne veut pas ça",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I don't do that'",
        prompt: "I don't do that",
        hint: "Negate 'je fais ça'",
        expectedAnswer: "je ne fais pas ça",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'you don't make this' (informal)",
        prompt: "you don't make this (informal)",
        hint: "Negate 'tu fais ça'",
        expectedAnswer: "tu ne fais pas ça",
        wrongAnswers: [],
      },
    ],
  },
};
