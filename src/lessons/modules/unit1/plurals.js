/**
 * Module 5: Plurals - Making Things Plural
 * Learn plural forms and "des" (some/plural a)
 */

export const plurals = {
  moduleKey: "2024-01-07-plurals", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Plurals - More Than One",
  description:
    "Learn to make nouns plural: chat → chats, livre → livres. Essential for 'these' and 'those'!",

  concepts: [
    {
      term: "Basic Plural Rule",
      definition: "Add -s to most nouns (just like English!)",
      example: "chat → chats, livre → livres, ami → amis",
    },
    {
      term: "Plural Articles",
      definition: "les = the (plural), des = some/plural a",
      example: "Pattern: [pronoun] + [verb] + [des/les] + [plural noun]",
    },
    {
      term: "Practice With être & avoir!",
      definition: "Every exercise combines plurals with verbs from M2-M3",
      example: "Learn plurals WHILE reinforcing your verb conjugations",
    },
  ],

  vocabularyReference: [
    { french: "des", english: "some / plural a", note: "indefinite plural" },
    { french: "les", english: "the (plural)", note: "definite plural" },
    { french: "chats", english: "cats", note: "plural of chat" },
    { french: "chiens", english: "dogs", note: "plural of chien" },
    { french: "livres", english: "books", note: "plural of livre" },
    { french: "amis", english: "friends", note: "plural of ami" },
    { french: "choses", english: "things", note: "plural of chose" },
    { french: "enfants", english: "children", note: "plural of enfant" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I have some cats"',
        prompt: "I have some cats",
        hint: "Combine: I have + plural article + plural noun",
        expectedAnswer: "j'ai des chats",
        wrongAnswers: [
          {
            answer: "j'ai les chats",
            feedback: "Use 'des' (some), not 'les' (the)",
          },
          { answer: "j'ai un chat", feedback: "That's singular - use plural!" },
        ],
      },
      {
        instruction: 'Say "you have some cats"',
        prompt: "you have some cats (informal)",
        hint: "Combine: you have + des + cats",
        expectedAnswer: "tu as des chats",
        wrongAnswers: [
          {
            answer: "tu as un chat",
            feedback: "That's singular - need plural",
          },
        ],
      },
      {
        instruction: 'Say "we have the books"',
        prompt: "we have the books",
        hint: "Combine: we have + the + books (plural)",
        expectedAnswer: "nous avons les livres",
        wrongAnswers: [
          {
            answer: "nous avons des livres",
            feedback: "Use 'les' (the), not 'des' (some)",
          },
          {
            answer: "nous avons le livre",
            feedback: "That's singular - use plural!",
          },
        ],
      },
      {
        instruction: 'Say "they have the cats"',
        prompt: "they have the cats (masculine)",
        hint: "Combine: they have + the + cats",
        expectedAnswer: "ils ont les chats",
        wrongAnswers: [
          {
            answer: "ils ont des chats",
            feedback: "Use 'les' (the), not 'des' (some)",
          },
        ],
      },
      {
        instruction: 'Say "I have some dogs"',
        prompt: "I have some dogs",
        hint: "Combine: I have + some + dogs",
        expectedAnswer: "j'ai des chiens",
        wrongAnswers: [
          {
            answer: "j'ai les chiens",
            feedback: "Use 'des' (some), not 'les' (the)",
          },
        ],
      },
      {
        instruction: 'Say "they are the friends"',
        prompt: "they are the friends (masculine)",
        hint: "Combine: they are + the + friends (plural)",
        expectedAnswer: "ils sont les amis",
        wrongAnswers: [
          {
            answer: "ils sont des amis",
            feedback: "Use 'les' (the), not 'des' (some)",
          },
        ],
      },
      {
        instruction: 'Say "you have the things"',
        prompt: "you have the things (formal)",
        hint: "Combine: you have + the + things (plural)",
        expectedAnswer: "vous avez les choses",
        wrongAnswers: [
          {
            answer: "vous avez des choses",
            feedback: "Use 'les' (the), not 'des' (some)",
          },
        ],
      },
      {
        instruction: 'Say "she has the children"',
        prompt: "she has the children",
        hint: "Combine: she has + the + children (plural)",
        expectedAnswer: "elle a les enfants",
        wrongAnswers: [
          {
            answer: "elle a des enfants",
            feedback: "Use 'les' (the), not 'des' (some)",
          },
        ],
      },
    ],
  },
};
