/**
 * Module 6: Demonstratives - it, that, this, these, those
 * Essential for pointing and basic communication
 */

import { demonstratives } from "../../vocabularyData.js";

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
        instruction: "Point to something nearby in conversation",
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
          "Point to a book on the table. Say 'this book' (le livre - masc)",
        prompt: "this book",
        hint: "Masculine noun starting with consonant: ce + livre",
        expectedAnswer: "ce livre",
        wrongAnswers: [
          {
            answer: "cet livre",
            feedback: "Use ce before consonants (not cet)",
          },
          {
            answer: "cette livre",
            feedback: "That's feminine - livre is masculine",
          },
        ],
      },
      {
        instruction: "Point to a cat nearby. Say 'this cat' (le chat - masc)",
        prompt: "this cat",
        hint: "Masculine noun starting with consonant: ce + chat",
        expectedAnswer: "ce chat",
        wrongAnswers: [
          {
            answer: "cet chat",
            feedback: "Use ce before consonants (not cet)",
          },
          {
            answer: "cette chat",
            feedback: "That's feminine - chat is masculine",
          },
        ],
      },
      {
        instruction:
          "Point to a man across the room. Say 'this man' (l'homme - masc, silent h)",
        prompt: "this man",
        hint: "Masculine noun with silent h (vowel sound): cet + homme",
        expectedAnswer: "cet homme",
        wrongAnswers: [
          {
            answer: "ce homme",
            feedback: "Use cet before vowel sounds/silent h",
          },
          {
            answer: "cette homme",
            feedback: "That's feminine - homme is masculine",
          },
        ],
      },
      {
        instruction:
          "Point to a house on the street. Say 'this house' (la maison - fem)",
        prompt: "this house",
        hint: "Feminine noun: cette + maison",
        expectedAnswer: "cette maison",
        wrongAnswers: [
          {
            answer: "ce maison",
            feedback: "That's masculine - maison is feminine",
          },
          {
            answer: "cet maison",
            feedback: "That's masculine - maison is feminine",
          },
        ],
      },
      {
        instruction:
          "Point to a woman standing there. Say 'this woman' (la femme - fem)",
        prompt: "this woman",
        hint: "Feminine noun: cette + femme",
        expectedAnswer: "cette femme",
        wrongAnswers: [
          {
            answer: "ce femme",
            feedback: "That's masculine - femme is feminine",
          },
          {
            answer: "cet femme",
            feedback: "That's masculine - femme is feminine",
          },
        ],
      },
      {
        instruction:
          "Point to multiple cats. Say 'these cats' (les chats - plural)",
        prompt: "these cats",
        hint: "Plural noun: ces + chats",
        expectedAnswer: "ces chats",
        wrongAnswers: [
          {
            answer: "ce chats",
            feedback: "That's singular - use ces for plural",
          },
          {
            answer: "cette chats",
            feedback: "That's singular - use ces for plural",
          },
        ],
      },
      {
        instruction:
          "Point to several books. Say 'these books' (les livres - plural)",
        prompt: "these books",
        hint: "Plural noun: ces + livres",
        expectedAnswer: "ces livres",
        wrongAnswers: [
          {
            answer: "ce livres",
            feedback: "That's singular - use ces for plural",
          },
          {
            answer: "cet livres",
            feedback: "That's singular - use ces for plural",
          },
        ],
      },
      {
        instruction:
          "Point to multiple houses. Say 'these houses' (les maisons - plural)",
        prompt: "these houses",
        hint: "Plural noun: ces + maisons",
        expectedAnswer: "ces maisons",
        wrongAnswers: [
          {
            answer: "cette maisons",
            feedback: "That's singular - use ces for plural",
          },
          {
            answer: "ce maisons",
            feedback: "That's singular - use ces for plural",
          },
        ],
      },
      {
        instruction: "Point to a dog nearby. Say 'this dog' (le chien - masc)",
        prompt: "this dog",
        hint: "Masculine noun starting with consonant: ce + chien",
        expectedAnswer: "ce chien",
        wrongAnswers: [
          {
            answer: "cet chien",
            feedback: "Use ce before consonants (not cet)",
          },
          {
            answer: "cette chien",
            feedback: "That's feminine - chien is masculine",
          },
        ],
      },
    ],
  },
};
