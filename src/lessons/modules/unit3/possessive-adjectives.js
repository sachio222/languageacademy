/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Possessive Adjectives - my, your, his, her, our, their
 * Show ownership: "my book", "his cat", "their house"
 */

import { possessiveAdjectives } from "../../vocabularyData.js";

export const module8_possessive_adjectives = {
  moduleKey: "2024-01-31-possessive-adjectives", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Possessive Adjectives - My, Your, His, Her",
  description:
    "Show who owns what: 'my book', 'his cat', 'their house' - essential vocabulary!",

  concepts: [
    {
      term: "Possessive Adjectives",
      definition: "Words that show ownership before a noun",
      example:
        "15 forms to learn - 3 forms (masc/fem/plural) for each of 5 owners",
    },
    {
      term: "Critical Rule: Agreement",
      definition: "Must match the THING owned, not the owner!",
      example:
        "A man's feminine object uses FEMININE possessive (not masculine)",
    },
    {
      term: "Pattern",
      definition: "Each owner (I, you, he/she, we, they) has 3 forms",
      example: "Masculine form, feminine form, and plural form for each owner",
    },
  ],

  vocabularyReference: [
    {
      french: "mon",
      english: "my (masculine)",
      note: "masculine form - mon livre",
    },
    {
      french: "ma",
      english: "my (feminine)",
      note: "feminine form - ma maison",
    },
    { french: "mes", english: "my (plural)", note: "plural form - mes chats" },
    {
      french: "ton",
      english: "your (masc, informal)",
      note: "masculine form - ton chat",
    },
    {
      french: "ta",
      english: "your (fem, informal)",
      note: "feminine form - ta voiture",
    },
    {
      french: "tes",
      english: "your (plural, informal)",
      note: "plural form - tes amis",
    },
    {
      french: "son",
      english: "his/her (masculine)",
      note: "masculine form - son livre",
    },
    {
      french: "sa",
      english: "his/her (feminine)",
      note: "feminine form - sa maison",
    },
    {
      french: "ses",
      english: "his/her (plural)",
      note: "plural form - ses chats",
    },
    {
      french: "notre",
      english: "our (singular)",
      note: "singular form - notre maison",
    },
    { french: "nos", english: "our (plural)", note: "plural form - nos chats" },
    {
      french: "votre",
      english: "your (singular, formal)",
      note: "singular form - votre livre",
    },
    {
      french: "vos",
      english: "your (plural, formal)",
      note: "plural form - vos livres",
    },
    {
      french: "leur",
      english: "their (singular)",
      note: "singular form - leur chat",
    },
    {
      french: "leurs",
      english: "their (plural)",
      note: "plural form - leurs chats",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "You're talking about your book (masculine). Which possessive?",
        prompt: "my (masculine thing)",
        hint: "Your possession, masculine form - check vocab table!",
        expectedAnswer: "mon",
        wrongAnswers: [
          { answer: "ma", feedback: "That's feminine 'my'" },
          { answer: "mes", feedback: "That's plural 'my'" },
        ],
      },
      {
        instruction:
          "You're talking about your house (feminine). Which possessive?",
        prompt: "my (feminine thing)",
        hint: "Your possession, feminine form - check vocab table!",
        expectedAnswer: "ma",
        wrongAnswers: [
          { answer: "mon", feedback: "That's masculine 'my'" },
          { answer: "mes", feedback: "That's plural 'my'" },
        ],
      },
      {
        instruction:
          "You're talking about your cats (multiple). Which possessive?",
        prompt: "my (plural things)",
        hint: "Your possession, plural form - check vocab table!",
        expectedAnswer: "mes",
        wrongAnswers: [
          { answer: "mon", feedback: "That's singular masculine 'my'" },
          { answer: "ma", feedback: "That's singular feminine 'my'" },
        ],
      },
      {
        instruction:
          "Talking to a friend about their cat (masculine). Which possessive?",
        prompt: "your (masculine thing, informal)",
        hint: "Friend's possession, masculine form - informal",
        expectedAnswer: "ton",
        wrongAnswers: [
          { answer: "ta", feedback: "That's feminine 'your'" },
          { answer: "votre", feedback: "That's formal 'your'" },
        ],
      },
      {
        instruction:
          "Talking about someone's book (masculine). Which possessive for 'his/her'?",
        prompt: "his/her (masculine thing)",
        hint: "Third person owner, masculine thing owned",
        expectedAnswer: "son",
        wrongAnswers: [
          { answer: "sa", feedback: "That's feminine 'his/her'" },
          { answer: "ses", feedback: "That's plural 'his/her'" },
        ],
      },
      {
        instruction:
          "Talking about someone's house (feminine). Which possessive for 'his/her'?",
        prompt: "his/her (feminine thing)",
        hint: "Third person owner, feminine thing owned",
        expectedAnswer: "sa",
        wrongAnswers: [
          { answer: "son", feedback: "That's masculine 'his/her'" },
          { answer: "ses", feedback: "That's plural 'his/her'" },
        ],
      },
      {
        instruction:
          "Talking about a house owned by you and your group. Which possessive?",
        prompt: "our (one thing)",
        hint: "Group possession, singular thing owned",
        expectedAnswer: "notre",
        wrongAnswers: [
          { answer: "nos", feedback: "That's plural 'our'" },
          { answer: "votre", feedback: "That's 'your' (formal)" },
        ],
      },
      {
        instruction:
          "Talking about a cat owned by a group. Which possessive for 'their'?",
        prompt: "their (one thing)",
        hint: "They own it, singular thing owned",
        expectedAnswer: "leur",
        wrongAnswers: [
          { answer: "leurs", feedback: "That's plural 'their'" },
          { answer: "notre", feedback: "That's 'our'" },
        ],
      },
    ],
  },
};
