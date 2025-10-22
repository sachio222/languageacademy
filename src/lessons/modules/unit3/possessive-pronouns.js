/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Possessive Pronouns - mine, yours, his, hers, ours, theirs
 * Stand-alone ownership: "It's mine", "That's hers", "Is it yours?"
 */

import { possessivePronouns } from "../../vocabularyData.js";

export const module9_possessive_pronouns = {
  moduleKey: "2024-02-01-possessive-pronouns", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Possessive Pronouns - Mine, Yours, Theirs",
  description:
    "Say 'It's MINE!' or 'That's HERS' - express ownership without repeating the noun.",

  concepts: [
    {
      term: "Possessive Pronouns",
      definition: "Stand-alone words meaning 'mine', 'yours', 'his', etc.",
      example: "C'est le mien = It's mine, C'est la sienne = It's his/hers",
    },
    {
      term: "With Article",
      definition: "Always use 'le' or 'la' before the possessive pronoun",
      example: "LE mien (mine-masc), LA mienne (mine-fem)",
    },
    {
      term: "Gender Agreement",
      definition: "Agrees with the THING owned, not the owner",
      example:
        "le sien = his/hers (masculine thing), la sienne = his/hers (feminine thing)",
    },
  ],

  vocabularyReference: [
    {
      french: "le mien",
      english: "mine (masc thing)",
      note: "le livre est le mien",
    },
    {
      french: "la mienne",
      english: "mine (fem thing)",
      note: "feminine - la voiture est la mienne",
    },
    {
      french: "le tien",
      english: "yours (masc, informal)",
      note: "masculine thing",
    },
    {
      french: "la tienne",
      english: "yours (fem, informal)",
      note: "feminine thing",
    },
    {
      french: "le sien",
      english: "his/hers (masc thing)",
      note: "masculine thing owned",
    },
    {
      french: "la sienne",
      english: "his/hers (fem thing)",
      note: "feminine thing owned",
    },
    {
      french: "le nôtre",
      english: "ours (masc thing)",
      note: "with circumflex",
    },
    {
      french: "la nôtre",
      english: "ours (fem thing)",
      note: "feminine - with circumflex",
    },
    {
      french: "le vôtre",
      english: "yours formal (masc)",
      note: "with circumflex",
    },
    {
      french: "la vôtre",
      english: "yours formal (fem)",
      note: "feminine - with circumflex",
    },
    {
      french: "le leur",
      english: "theirs (masc thing)",
      note: "masculine thing owned",
    },
    {
      french: "la leur",
      english: "theirs (fem thing)",
      note: "feminine thing owned",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "You're pointing to your book. Say 'it's mine' (masculine thing)",
        prompt: "mine (masculine)",
        hint: "Possessive pronoun for 'I', masculine thing",
        expectedAnswer: "le mien",
        wrongAnswers: [
          { answer: "la mienne", feedback: "That's for feminine things" },
          { answer: "le tien", feedback: "That's 'yours', not 'mine'" },
        ],
      },
      {
        instruction:
          "You're pointing to your house. Say 'it's mine' (feminine thing)",
        prompt: "mine (feminine)",
        hint: "Possessive pronoun for 'I', feminine thing",
        expectedAnswer: "la mienne",
        wrongAnswers: [
          { answer: "le mien", feedback: "That's for masculine things" },
          { answer: "la tienne", feedback: "That's 'yours', not 'mine'" },
        ],
      },
      {
        instruction:
          "Pointing to a friend's book. Ask 'is it yours?' (masculine, informal)",
        prompt: "yours (masc, informal)",
        hint: "Possessive pronoun for 'tu', masculine thing",
        expectedAnswer: "le tien",
        wrongAnswers: [
          { answer: "la tienne", feedback: "That's for feminine things" },
          { answer: "le sien", feedback: "That's 'his/hers', not 'yours'" },
        ],
      },
      {
        instruction:
          "Pointing to someone else's house. Say 'it's theirs' (masculine thing)",
        prompt: "theirs (masculine)",
        hint: "Possessive pronoun for 'they', masculine thing",
        expectedAnswer: "le leur",
        wrongAnswers: [
          { answer: "la leur", feedback: "That's for feminine things" },
          {
            answer: "le sien",
            feedback: "That's singular 'his/hers', not plural 'theirs'",
          },
        ],
      },
      {
        instruction:
          "Pointing to a friend's car. Ask 'is it yours?' (feminine, informal)",
        prompt: "yours (fem, informal)",
        hint: "Possessive pronoun for 'tu', feminine thing",
        expectedAnswer: "la tienne",
        wrongAnswers: [
          { answer: "le tien", feedback: "That's for masculine things" },
          { answer: "la sienne", feedback: "That's 'his/hers', not 'yours'" },
        ],
      },
      {
        instruction:
          "Pointing to Pierre's book. Say 'it's his' (masculine thing)",
        prompt: "his (masculine)",
        hint: "Possessive pronoun for 'he', masculine thing",
        expectedAnswer: "le sien",
        wrongAnswers: [
          { answer: "la sienne", feedback: "That's for feminine things" },
          { answer: "le tien", feedback: "That's 'yours', not 'his'" },
        ],
      },
      {
        instruction:
          "Pointing to Marie's house. Say 'it's hers' (feminine thing)",
        prompt: "hers (feminine)",
        hint: "Possessive pronoun for 'she', feminine thing",
        expectedAnswer: "la sienne",
        wrongAnswers: [
          { answer: "le sien", feedback: "That's for masculine things" },
          { answer: "la tienne", feedback: "That's 'yours', not 'hers'" },
        ],
      },
      {
        instruction:
          "Pointing to your group's car. Say 'it's ours' (masculine thing)",
        prompt: "ours (masculine)",
        hint: "Possessive pronoun for 'we', masculine thing",
        expectedAnswer: "le nôtre",
        wrongAnswers: [
          { answer: "la nôtre", feedback: "That's for feminine things" },
          { answer: "le leur", feedback: "That's 'theirs', not 'ours'" },
        ],
      },
      {
        instruction:
          "Pointing to your group's house. Say 'it's ours' (feminine thing)",
        prompt: "ours (feminine)",
        hint: "Possessive pronoun for 'we', feminine thing",
        expectedAnswer: "la nôtre",
        wrongAnswers: [
          { answer: "le nôtre", feedback: "That's for masculine things" },
          { answer: "la leur", feedback: "That's 'theirs', not 'ours'" },
        ],
      },
      {
        instruction:
          "Politely asking about someone's book. Say 'is it yours?' (masculine, formal)",
        prompt: "yours (masc, formal)",
        hint: "Possessive pronoun for 'vous', masculine thing",
        expectedAnswer: "le vôtre",
        wrongAnswers: [
          { answer: "la vôtre", feedback: "That's for feminine things" },
          {
            answer: "le tien",
            feedback: "That's informal 'yours', use formal",
          },
        ],
      },
      {
        instruction:
          "Politely asking about someone's house. Say 'is it yours?' (feminine, formal)",
        prompt: "yours (fem, formal)",
        hint: "Possessive pronoun for 'vous', feminine thing",
        expectedAnswer: "la vôtre",
        wrongAnswers: [
          { answer: "le vôtre", feedback: "That's for masculine things" },
          {
            answer: "la tienne",
            feedback: "That's informal 'yours', use formal",
          },
        ],
      },
      {
        instruction:
          "Pointing to their house. Say 'it's theirs' (feminine thing)",
        prompt: "theirs (feminine)",
        hint: "Possessive pronoun for 'they', feminine thing",
        expectedAnswer: "la leur",
        wrongAnswers: [
          { answer: "le leur", feedback: "That's for masculine things" },
          {
            answer: "la sienne",
            feedback: "That's singular 'hers', not plural 'theirs'",
          },
        ],
      },
    ],
  },
};
