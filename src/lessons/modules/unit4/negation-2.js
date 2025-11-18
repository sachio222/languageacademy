/**
 * Negation Part 2 - Modal Verbs & Advanced Patterns
 * I can't, I don't want to, I never, etc.
 */

export const negation2 = {
  moduleKey: "2024-03-27-negation-2", // Permanent identifier - never changes
  title: "Negation Part 2 - I can't, I won't, I never",
  description:
    "Negate modal verbs and use 'ne...jamais' (never). Express what you can't or won't do!",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Say 'I can't', 'I won't', 'I never do' in French",
      "Negate modal verbs (vouloir, pouvoir, devoir)",
      "Use ne...jamais to express never"
    ],
    realWorldUse: "express refusal and things you never do",
    nextModuleTeaser: "Add location words to describe where"
  },

  concepts: [
    {
      term: "Negating Modal Verbs",
      definition: "Apply ne...pas to vouloir, pouvoir, aller, voir",
      example:
        "je peux → je ne peux pas (I can't), je veux → je ne veux pas (I won't/don't want)",
    },
    {
      term: "ne...jamais (never)",
      definition: "Replace 'pas' with 'jamais' to mean 'never'",
      example: "je vais → je ne vais jamais (I never go)",
    },
    {
      term: "With Object Pronouns",
      definition: "Object pronouns stay inside the negation sandwich",
      example: "je le veux → je ne le veux pas (I don't want it)",
    },
    {
      term: "Common Patterns",
      definition: "I can't, I won't, I never go, I don't see it - very useful!",
      example: "Master these patterns for real conversations",
    },
  ],

  vocabularyReference: [
    { french: "je ne peux pas", english: "I can't", note: "pouvoir negated" },
    { french: "tu ne peux pas", english: "you can't", note: "informal" },
    {
      french: "nous ne pouvons pas",
      english: "we can't",
      note: "plural form",
    },
    {
      french: "je ne veux pas",
      english: "I don't want/won't",
      note: "vouloir negated",
    },
    {
      french: "tu ne veux jamais",
      english: "you never want",
      note: "ne...jamais",
    },
    {
      french: "il ne fait jamais",
      english: "he never does",
      note: "faire + jamais",
    },
    {
      french: "nous ne faisons pas",
      english: "we don't do/make",
      note: "faire negated",
    },
    {
      french: "ils ne sont pas",
      english: "they are not",
      note: "être negated",
    },
    {
      french: "nous n'allons pas",
      english: "we don't go",
      note: "aller negated",
    },
    {
      french: "elle ne voit jamais",
      english: "she never sees",
      note: "voir + jamais",
    },
    {
      french: "je ne le veux pas",
      english: "I don't want it",
      note: "with object pronoun",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'I can't'",
        prompt: "I can't",
        hint: "Negate 'je peux'",
        expectedAnswer: "je ne peux pas",
        wrongAnswers: [
          {
            answer: "je ne peux",
            feedback: "Need 'pas' after the verb",
          },
        ],
      },
      {
        instruction: "Say 'I don't want' or 'I won't'",
        prompt: "I don't want",
        hint: "Negate 'je veux'",
        expectedAnswer: "je ne veux pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'you can't' (informal)",
        prompt: "you can't (informal)",
        hint: "Negate 'tu peux'",
        expectedAnswer: "tu ne peux pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'he doesn't want'",
        prompt: "he doesn't want",
        hint: "Negate 'il veut'",
        expectedAnswer: "il ne veut pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I don't go' or 'I won't go'",
        prompt: "I don't go",
        hint: "Negate 'je vais'",
        expectedAnswer: "je ne vais pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she doesn't see'",
        prompt: "she doesn't see",
        hint: "Negate 'elle voit'",
        expectedAnswer: "elle ne voit pas",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I never go' (using jamais instead of pas)",
        prompt: "I never go",
        hint: "je ne vais + jamais (replace pas with jamais)",
        expectedAnswer: "je ne vais jamais",
        wrongAnswers: [
          {
            answer: "je ne vais pas",
            feedback: "That's 'I don't go' - use 'jamais' for 'never'",
          },
        ],
      },
      {
        instruction: "Say 'he never has'",
        prompt: "he never has",
        hint: "il n'a + jamais",
        expectedAnswer: "il n'a jamais",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we never want'",
        prompt: "we never want",
        hint: "nous ne voulons + jamais",
        expectedAnswer: "nous ne voulons jamais",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I don't want it' (with object pronoun)",
        prompt: "I don't want it",
        hint: "Negate 'je le veux' - object pronoun stays inside",
        expectedAnswer: "je ne le veux pas",
        wrongAnswers: [
          {
            answer: "je le ne veux pas",
            feedback: "ne goes BEFORE object pronoun: je NE le veux pas",
          },
        ],
      },
      {
        instruction: "Say 'I can't see it'",
        prompt: "I can't see it",
        hint: "Negate 'je le vois' with pouvoir negated",
        expectedAnswer: "je ne peux pas le voir",
        acceptableAnswers: ["je ne le vois pas"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'you never want' (informal)",
        prompt: "you never want (informal)",
        hint: "tu ne veux + jamais",
        expectedAnswer: "tu ne veux jamais",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'they are not here' (masculine)",
        prompt: "they are not here (masculine)",
        hint: "Negate 'ils sont ici'",
        expectedAnswer: "ils ne sont pas ici",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we cannot go'",
        prompt: "we cannot go",
        hint: "Negate 'nous pouvons' + aller infinitive... wait, simpler: negate 'nous allons'",
        expectedAnswer: "nous n'allons pas",
        acceptableAnswers: ["nous ne pouvons pas aller"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she never sees'",
        prompt: "she never sees",
        hint: "elle ne voit + jamais",
        expectedAnswer: "elle ne voit jamais",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'you can't have this' (informal)",
        prompt: "you can't have this (informal)",
        hint: "Negate 'tu peux avoir ça'... simpler: negate 'tu as ça' with pouvoir concept",
        expectedAnswer: "tu ne peux pas avoir ça",
        acceptableAnswers: ["tu n'as pas ça"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'he never does that'",
        prompt: "he never does that",
        hint: "il ne fait jamais + ça",
        expectedAnswer: "il ne fait jamais ça",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we don't make this'",
        prompt: "we don't make this",
        hint: "Negate 'nous faisons ça'",
        expectedAnswer: "nous ne faisons pas ça",
        wrongAnswers: [],
      },
    ],
  },
};
