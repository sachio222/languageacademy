/**
 * Module 6: Demonstratives - it, that, this, these, those
 * Essential for pointing and basic communication
 */

import { demonstratives } from "../vocabularyData.js";

export const module2_demonstratives = {
  // id and module number are set dynamically
  title: "Demonstratives - It, That, This",
  description:
    "Point to things and say 'this' or 'that' - essential for everyday communication!",

  concepts: [
    {
      term: "ça - The Most Useful Word!",
      definition: "Informal 'that/it' - you'll use this constantly!",
      example: "Used standalone or in phrases constantly in conversation",
    },
    {
      term: "Demonstrative Forms",
      definition: "Learn the standalone forms: ce, cet, cette, ces",
      example:
        "Like variables in programming - you'll compose them with nouns soon!",
    },
    {
      term: "Gender and Sound Agreement",
      definition: "Choose based on: 1) gender of noun, 2) sound it starts with",
      example:
        "masculine + consonant = ce, masculine + vowel = cet, feminine = cette, plural = ces",
    },
    {
      term: "Next: Functional Composition!",
      definition:
        "After practicing ça, you'll compose demonstratives with nouns",
      example: "Coming soon: ce(livre) = ce livre, ces(chats) = ces chats",
    },
  ],

  vocabularyReference: [
    {
      french: "ça",
      english: "that/it (informal)",
      note: "most common! use this 90% of the time",
    },
    {
      french: "ce",
      english: "this/that (masc + consonant)",
      note: "before b, c, d, f, g, k, l, m, n, p, r, s, t, v, w, z",
    },
    {
      french: "cet",
      english: "this/that (masc + vowel)",
      note: "before a, e, i, o, u, silent h",
    },
    {
      french: "cette",
      english: "this/that (feminine)",
      note: "any feminine noun",
    },
    { french: "ces", english: "these/those (plural)", note: "any plural" },
    { french: "ceci", english: "this (formal)", note: "formal, rare" },
    {
      french: "cela",
      english: "that (formal)",
      note: "formal, use ça instead",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "Point to something nearby. Use the most common word for 'that/it'",
        prompt: "that/it (informal - most common!)",
        hint: "Informal, versatile - 2 letters",
        expectedAnswer: "ça",
        wrongAnswers: [
          { answer: "ceci", feedback: "That's formal 'this' - use ça" },
          { answer: "cela", feedback: "That's formal 'that' - use ça" },
        ],
      },
      {
        instruction:
          "You want to say 'this book'. Which word before a masculine noun starting with a consonant?",
        prompt: "this/that (masc + consonant)",
        hint: "Masculine demonstrative before consonant sounds",
        expectedAnswer: "ce",
        wrongAnswers: [
          { answer: "cet", feedback: "Use cet only before vowel sounds" },
          { answer: "cette", feedback: "That's feminine, not masculine" },
        ],
      },
      {
        instruction:
          "You want to say 'this man'. Which word before a masculine noun starting with silent h?",
        prompt: "this/that (masc + vowel)",
        hint: "Masculine demonstrative before vowel sounds or silent h",
        expectedAnswer: "cet",
        wrongAnswers: [
          { answer: "ce", feedback: "Use cet before vowel sounds/silent h" },
          { answer: "cette", feedback: "That's feminine, not masculine" },
        ],
      },
      {
        instruction:
          "You want to say 'this house'. Which word before a feminine noun?",
        prompt: "this/that (feminine)",
        hint: "Feminine demonstrative",
        expectedAnswer: "cette",
        wrongAnswers: [
          { answer: "ce", feedback: "That's masculine, not feminine" },
          {
            answer: "cet",
            feedback: "That's masculine before vowels, not feminine",
          },
        ],
      },
      {
        instruction:
          "You want to say 'these cats'. Which word before plural nouns?",
        prompt: "these/those (plural)",
        hint: "Plural demonstrative - works for any gender",
        expectedAnswer: "ces",
        wrongAnswers: [
          { answer: "ce", feedback: "That's singular masculine, not plural" },
          { answer: "cette", feedback: "That's singular feminine, not plural" },
        ],
      },
      {
        instruction: "In formal writing, refer to 'this' (formal/rare)",
        prompt: "this (formal)",
        hint: "Formal demonstrative for 'this'",
        expectedAnswer: "ceci",
        wrongAnswers: [
          { answer: "cela", feedback: "That's formal 'that', not 'this'" },
          { answer: "ca", feedback: "That's informal - this is formal" },
        ],
      },
      {
        instruction: "In formal writing, refer to 'that' (formal/rare)",
        prompt: "that (formal)",
        hint: "Formal demonstrative for 'that'",
        expectedAnswer: "cela",
        wrongAnswers: [
          { answer: "ceci", feedback: "That's formal 'this', not 'that'" },
          { answer: "ca", feedback: "That's informal - this is formal" },
        ],
      },
    ],
  },
};
