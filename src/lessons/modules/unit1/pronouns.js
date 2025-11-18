/**
 * Module: Dynamic ID (auto-assigned): Core Pronouns
 * The 9 essential subject pronouns in French
 */

import { pronouns } from "../../vocabularyData.js";

export const module1 = {
  moduleKey: "2024-01-01-pronouns", // Permanent identifier - never changes
  title: "Core Pronouns - The Building Blocks",
  description:
    "Master the 9 most essential words in French. These are your foundation - like variables in programming.",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Use all 9 essential French pronouns (I, you, he, she, we, they)",
      "Distinguish between formal and informal 'you'",
      "Understand the foundation for all French sentences"
    ],
    realWorldUse: "build every sentence you'll ever speak",
    nextModuleTeaser: "Combine these with être to make your first real sentences"
  },

  concepts: [
    {
      term: "Subject Pronouns",
      definition: "Words that replace nouns as the subject of a sentence",
      example:
        "9 essential words: I, you, he, she, we, you (formal), they (masc), they (fem), on",
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
    {
      term: "On - The Special Pronoun",
      definition:
        "The most common way to say 'we' in French - more natural than 'nous'",
      example:
        "On va au café (We're going to the café) - uses il/elle verb forms, not nous forms",
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
    {
      french: "on",
      english: "we (informal) / one / people",
      note: "⭐ Uses il/elle verb forms! More common than 'nous'!",
    },
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
      {
        instruction:
          "You're talking informally about yourself and others. Use this pronoun",
        prompt: "we (informal - most common way)",
        hint: "The most natural way to say 'we' in French - uses il/elle verb forms",
        expectedAnswer: "on",
        wrongAnswers: [
          {
            answer: "nous",
            feedback: "That's formal 'we' - on is more common and natural",
          },
          {
            answer: "ils",
            feedback: "That's 'they', not 'we'",
          },
        ],
      },
    ],
  },
};
