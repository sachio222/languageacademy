/**
 * Unit 1 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 1 material
 */

export const unit1Practice = {
  moduleKey: "2024-01-10-unit1-practice", // Permanent identifier - never changes
  title: "Unit 1 Practice - Fill in the Blanks",
  description:
    "Complete sentences using everything you've learned in Unit 1. Fill in the blanks to create correct French sentences!",

  // Special flags
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Compose complete French sentences from scratch",
      "Combine pronouns, verbs, articles, and nouns naturally",
      "Apply everything from Unit 1 in context"
    ],
    realWorldUse: "form your own original French sentences",
    nextModuleTeaser: "Take the Unit 1 exam to prove your mastery"
  },

  concepts: [
    {
      term: "Foundation Reinforcement",
      definition:
        "Interactive practice to solidify the 8 essential building blocks through active recall",
      example:
        "Complete sentences using pronouns + être/avoir + articles + nouns + connectors to build fluency",
    },
    {
      term: "Composition Practice",
      definition:
        "Learn to combine foundational elements into meaningful French sentences",
      example:
        "je suis + un homme, tu as + une maison, nous avons + les livres, ils sont + très bons",
    },
    {
      term: "Scaffolded Learning",
      definition:
        "Practice with hints and reference tables to build confidence before testing",
      example:
        "Fill in blanks with vocabulary reference visible, immediate feedback on errors, progressive difficulty",
    },
  ],
  vocabularyReference: [],

  // Sentences with blanks to fill in
  sentences: [
    {
      text: " suis un homme.",
      instruction: "Complete: 'I am a man'",
      blanks: [
        {
          position: 0,
          answer: "je",
          hint: "pronoun for 'I'",
        },
      ],
    },
    {
      text: "Tu  un chat.",
      instruction: "Complete: 'You have a cat'",
      blanks: [
        {
          position: 3,
          answer: "as",
          hint: "avoir conjugated for tu",
        },
      ],
    },
    {
      text: "Elle  une femme.",
      instruction: "Complete: 'She is a woman'",
      blanks: [
        {
          position: 5,
          answer: "est",
          hint: "être conjugated for elle",
        },
      ],
    },
    {
      text: "Nous  les livres.",
      instruction: "Complete: 'We have the books'",
      blanks: [
        {
          position: 5,
          answer: "avons",
          hint: "avoir conjugated for nous",
        },
      ],
    },
    {
      text: " chat  un chien.",
      instruction: "Complete: 'A cat and a dog'",
      blanks: [
        {
          position: 0,
          answer: "un",
          hint: "article for masculine singular",
        },
        {
          position: 6,
          answer: "et",
          hint: "connector meaning 'and'",
        },
      ],
    },
    {
      text: "J' des chats.",
      instruction: "Complete: 'I have cats' (plural)",
      blanks: [
        {
          position: 2,
          answer: "ai",
          hint: "avoir conjugated for je",
        },
      ],
    },
    {
      text: "Vous  un livre  une voiture.",
      instruction: "Complete: 'You have a book or a car'",
      blanks: [
        {
          position: 5,
          answer: "avez",
          hint: "avoir conjugated for vous",
        },
        {
          position: 15,
          answer: "ou",
          hint: "connector meaning 'or'",
        },
      ],
    },
    {
      text: "Ils  des amis.",
      instruction: "Complete: 'They have friends'",
      blanks: [
        {
          position: 4,
          answer: "ont",
          hint: "avoir conjugated for ils",
        },
      ],
    },
    {
      text: "Je suis  bon.",
      instruction: "Complete: 'I am very good'",
      blanks: [
        {
          position: 8,
          answer: "très",
          hint: "connector meaning 'very'",
        },
      ],
    },
    {
      text: "Il a un livre,  elle a une maison.",
      instruction: "Complete: 'He has a book, but she has a house'",
      blanks: [
        {
          position: 15,
          answer: "mais",
          hint: "connector meaning 'but'",
        },
      ],
    },
    {
      text: "Nous sommes des enfants  nous avons des chiens .",
      instruction: "Complete: 'We are children but we have dogs also'",
      blanks: [
        {
          position: 24,
          answer: "mais",
          hint: "connector meaning 'but'",
        },
        {
          position: 47,
          answer: "aussi",
          hint: "connector meaning 'also/too'",
        },
      ],
    },
    {
      text: "Elle a  maison  les chats.",
      instruction: "Complete: 'She has the house or the cats'",
      blanks: [
        {
          position: 7,
          answer: "la",
          hint: "definite article for feminine singular",
        },
        {
          position: 15,
          answer: "ou",
          hint: "connector meaning 'or'",
        },
      ],
    },
  ],

  // Empty exercises array - not used for fill-in-blank
  exercises: [],
};
