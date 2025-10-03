/**
 * Module: Basic Connectors
 * Essential connecting words: et (and), mais (but), ou (or)
 * Simple but critical for natural sentences
 */

import { connectors as connectorsVocab } from "../vocabularyData.js";

export const connectors = {
  title: "Basic Connectors - et, mais, ou, aussi, très",
  description:
    "Connect your thoughts and add emphasis! Learn 'et' (and), 'mais' (but), 'ou' (or), 'aussi' (also/too), 'très' (very).",

  concepts: [
    {
      term: "et = and",
      definition: "Connect two things or ideas together",
      example: "un chat et un chien (a cat and a dog)",
    },
    {
      term: "mais = but",
      definition: "Show contrast between two ideas",
      example:
        "je veux un chat, mais j'ai un chien (I want a cat, but I have a dog)",
    },
    {
      term: "ou = or",
      definition: "Present a choice between options",
      example: "un chat ou un chien? (a cat or a dog?)",
    },
    {
      term: "aussi = also / too",
      definition: "Add something extra to your statement",
      example: "j'ai un chat aussi (I have a cat too / also)",
    },
    {
      term: "très = very",
      definition: "Intensify adjectives - make things stronger!",
      example: "très bon (very good)",
    },
    {
      term: "Making Natural Sentences",
      definition: "Combine with everything you've learned to sound natural!",
      example: "Use with nouns, verbs, and phrases from previous modules",
    },
  ],

  vocabularyReference: [
    { french: "et", english: "and", note: "most common connector!" },
    { french: "mais", english: "but", note: "show contrast" },
    { french: "ou", english: "or", note: "present choices" },
    { french: "aussi", english: "also/too", note: "add something extra" },
    { french: "très", english: "very", note: "intensify adjectives" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Connect 'a cat and a dog' using the correct word",
        prompt: "un chat ___ un chien",
        hint: "Which word means 'and'?",
        expectedAnswer: "un chat et un chien",
        wrongAnswers: [
          {
            answer: "un chat mais un chien",
            feedback: "That's 'but', not 'and'",
          },
          { answer: "un chat ou un chien", feedback: "That's 'or', not 'and'" },
        ],
      },
      {
        instruction: "Say 'I have a book and a cat'",
        prompt: "I have a book and a cat",
        hint: "Combine: j'ai + un livre + connector + un chat",
        expectedAnswer: "j'ai un livre et un chat",
        wrongAnswers: [
          {
            answer: "j'ai un livre mais un chat",
            feedback: "Use 'et' (and), not 'mais' (but)",
          },
        ],
      },
      {
        instruction: "Say 'she is a woman and a friend'",
        prompt: "she is a woman and a friend",
        hint: "Combine: elle est + une femme + connector + une amie",
        expectedAnswer: "elle est une femme et une amie",
        wrongAnswers: [
          {
            answer: "elle est une femme ou une amie",
            feedback: "Use 'et' (and), not 'ou' (or)",
          },
        ],
      },
      {
        instruction: "Say 'I want a cat, but I have a dog'",
        prompt: "I want a cat, but I have a dog",
        hint: "Show contrast with 'mais'",
        expectedAnswer: "je veux un chat, mais j'ai un chien",
        wrongAnswers: [
          {
            answer: "je veux un chat et j'ai un chien",
            feedback: "Use 'mais' (but) to show contrast",
          },
        ],
      },
      {
        instruction: "Say 'a cat or a dog?' (asking a question)",
        prompt: "a cat or a dog",
        hint: "Present a choice with 'ou'",
        expectedAnswer: "un chat ou un chien",
        wrongAnswers: [
          {
            answer: "un chat et un chien",
            feedback: "Use 'ou' (or) for choices, not 'et' (and)",
          },
        ],
      },
      {
        instruction: "Say 'we have a house and a car'",
        prompt: "we have a house and a car",
        hint: "Combine: nous avons + une maison + connector + une voiture",
        expectedAnswer: "nous avons une maison et une voiture",
        wrongAnswers: [
          {
            answer: "nous avons une maison mais une voiture",
            feedback: "Use 'et' (and), not 'mais' (but)",
          },
        ],
      },
      {
        instruction: "Say 'I have a cat also' or 'I have a cat too'",
        prompt: "I have a cat also",
        hint: "Add 'aussi' at the end: j'ai un chat ___",
        expectedAnswer: "j'ai un chat aussi",
        wrongAnswers: [
          {
            answer: "j'ai aussi un chat",
            feedback: "Put 'aussi' at the END: j'ai un chat aussi",
          },
        ],
      },
      {
        instruction: "Say 'she has a book too'",
        prompt: "she has a book too",
        hint: "Use 'aussi' at the end",
        expectedAnswer: "elle a un livre aussi",
        wrongAnswers: [
          {
            answer: "elle a aussi un livre",
            feedback: "Put 'aussi' at the END: elle a un livre aussi",
          },
        ],
      },
      {
        instruction: "Say 'very good' (describing something as very good)",
        prompt: "very good",
        hint: "Put 'très' BEFORE the adjective",
        expectedAnswer: "très bon",
        wrongAnswers: [
          {
            answer: "bon très",
            feedback: "Put 'très' BEFORE: très bon",
          },
        ],
      },
      {
        instruction: "Say 'the house is very good'",
        prompt: "the house is very good",
        hint: "Use être + très + adjective",
        expectedAnswer: "la maison est très bonne",
        wrongAnswers: [
          {
            answer: "la maison est bonne très",
            feedback: "Put 'très' BEFORE the adjective: très bonne",
          },
          {
            answer: "la maison est très bon",
            feedback: "Use feminine form 'bonne' with 'maison'",
          },
        ],
      },
    ],
  },
};
