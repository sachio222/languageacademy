/**
 * Module 1: Core Pronouns
 * The 8 essential subject pronouns in French
 */

import { pronouns } from "../../vocabularyData.js";

export const module1 = {
  // id and module number are set dynamically based on array position
  title: "Core Pronouns - The Building Blocks",
  description:
    "Master the 8 most essential words in French. These are your foundation - like variables in programming.",

  concepts: [
    {
      term: "Subject Pronouns",
      definition: "Words that replace nouns as the subject of a sentence",
      example:
        "8 essential words: I, you, he, she, we, you (formal), they (masc), they (fem)",
    },
    {
      term: "Singular vs Plural",
      definition:
        "4 singular pronouns (one person) and 4 plural pronouns (multiple people)",
      example: "I/you/he/she are singular, we/you all/they are plural",
    },
    {
      term: "Formal vs Informal",
      definition:
        'French has TWO words for "you" - informal (friends) and formal (strangers/bosses)',
      example: "Friends vs strangers require different pronouns",
    },
  ],

  vocabularyReference: [
    { french: "je", english: "I", note: "first person singular" },
    {
      french: "tu",
      english: "you (informal)",
      note: "singular, friends/family",
    },
    { french: "il", english: "he", note: "masculine singular" },
    { french: "elle", english: "she", note: "feminine singular" },
    { french: "nous", english: "we", note: "first person plural" },
    {
      french: "vous",
      english: "you (formal/plural)",
      note: "strangers/groups",
    },
    { french: "ils", english: "they (masculine)", note: "masc or mixed group" },
    { french: "elles", english: "they (feminine)", note: "all feminine group" },
  ],

  // Exercise configuration - simpler to maintain
  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "You're talking about yourself. Use this pronoun",
        prompt: "I",
        hint: "First person singular",
        expectedAnswer: "je",
        wrongAnswers: [
          { answer: "tu", feedback: "That's 'you', not 'I'" },
          { answer: "il", feedback: "That's 'he', not 'I'" },
        ],
      },
      {
        instruction: "You're talking to a friend. Use this pronoun",
        prompt: "you (informal - friends/family)",
        hint: "Informal second person - use with friends",
        expectedAnswer: "tu",
        wrongAnswers: [
          { answer: "je", feedback: "That's 'I', not 'you'" },
          {
            answer: "vous",
            feedback: "That's formal 'you' - use tu with friends",
          },
        ],
      },
      {
        instruction: "You're talking about a man. Use this pronoun",
        prompt: "he",
        hint: "Third person masculine",
        expectedAnswer: "il",
        wrongAnswers: [
          { answer: "elle", feedback: "That's 'she', not 'he'" },
          { answer: "ils", feedback: "That's plural 'they', not 'he'" },
        ],
      },
      {
        instruction: "You're talking about a woman. Use this pronoun",
        prompt: "she",
        hint: "Third person feminine",
        expectedAnswer: "elle",
        wrongAnswers: [
          { answer: "il", feedback: "That's 'he', not 'she'" },
          { answer: "elles", feedback: "That's plural 'they', not 'she'" },
        ],
      },
      {
        instruction:
          "You're talking about yourself and others. Use this pronoun",
        prompt: "we",
        hint: "First person plural - includes yourself",
        expectedAnswer: "nous",
        wrongAnswers: [
          { answer: "vous", feedback: "That's 'you', not 'we'" },
          { answer: "ils", feedback: "That's 'they', not 'we'" },
        ],
      },
      {
        instruction:
          "You're talking to a stranger or your boss. Use this pronoun",
        prompt: "you (formal or plural - strangers/groups)",
        hint: "Formal second person - use with strangers or multiple people",
        expectedAnswer: "vous",
        wrongAnswers: [
          {
            answer: "tu",
            feedback: "That's informal - use vous with strangers",
          },
          { answer: "nous", feedback: "That's 'we', not 'you'" },
        ],
      },
      {
        instruction:
          "You're talking about a group of men (or mixed group). Use this pronoun",
        prompt: "they (masculine or mixed group)",
        hint: "Third person plural masculine",
        expectedAnswer: "ils",
        wrongAnswers: [
          {
            answer: "elles",
            feedback: "That's feminine 'they', use ils for masculine/mixed",
          },
          { answer: "nous", feedback: "That's 'we', not 'they'" },
        ],
      },
      {
        instruction: "You're talking about a group of women. Use this pronoun",
        prompt: "they (all feminine group)",
        hint: "Third person plural feminine - only for all-female groups",
        expectedAnswer: "elles",
        wrongAnswers: [
          {
            answer: "ils",
            feedback: "That's masculine 'they', use elles for all-feminine",
          },
          {
            answer: "elle",
            feedback: "That's singular 'she', not plural 'they'",
          },
        ],
      },
    ],
  },
};
