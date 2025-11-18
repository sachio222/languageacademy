/**
 * Module: Common Adjectives
 * Essential descriptive words from top 100 - good, big, small, new, old, etc.
 * Covers gender agreement and placement
 */

import { commonAdjectives } from "../../vocabularyData.js";

export const adjectives = {
  moduleKey: "2024-01-21-adjectives", // Permanent identifier - never changes
  title: "Common Adjectives - Describing Things",
  description:
    "Learn essential adjectives WITH gender agreement: un bon livre (a good book), une grande maison (a big house)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Describe things as big, small, good, bad, new, old",
      "Use adjectives with correct gender agreement",
      "Say 'a good book' or 'a big house' in French"
    ],
    realWorldUse: "describe qualities and characteristics of things",
    nextModuleTeaser: "Practice reading comprehension with everything you've learned"
  },

  concepts: [
    {
      term: "Adjective Gender Agreement - Critical!",
      definition: "Adjectives must match the gender of the noun they describe!",
      example: "bon livre (masc) BUT bonne maison (fem)",
    },
    {
      term: "Regular vs Irregular Forms",
      definition:
        "Most adjectives add -e for feminine (petit→petite), but some are irregular (beau→belle)",
      example:
        "Regular: grand/grande. Irregular: nouveau/nouvelle, vieux/vieille",
    },
    {
      term: "Same Form Both Genders",
      definition: "A few adjectives like 'jeune' and 'autre' don't change",
      example: "un jeune homme / une jeune femme (both use 'jeune')",
    },
    {
      term: "Adjective Placement",
      definition:
        "These common adjectives usually go BEFORE the noun (unlike most French adjectives)",
      example: "un petit chat (a small cat), NOT un chat petit",
    },
  ],

  vocabularyReference: [
    {
      french: "bon / bonne",
      english: "good",
      note: "un bon livre / une bonne maison",
    },
    {
      french: "grand / grande",
      english: "big, tall",
      note: "un grand homme / une grande femme",
    },
    {
      french: "petit / petite",
      english: "small",
      note: "un petit chat / une petite maison",
    },
    {
      french: "nouveau / nouvelle",
      english: "new",
      note: "un nouveau livre / une nouvelle voiture",
    },
    {
      french: "vieux / vieille",
      english: "old",
      note: "un vieux chat / une vieille maison",
    },
    {
      french: "jeune / jeune",
      english: "young",
      note: "un jeune homme / une jeune femme (same both)",
    },
    {
      french: "beau / belle",
      english: "beautiful",
      note: "un beau livre / une belle maison",
    },
    {
      french: "autre / autre",
      english: "other",
      note: "un autre livre / une autre maison (same both)",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: 'Say "I have a good book"',
        prompt: "I have a good book",
        hint: "Combine: j'ai + article + bon (masculine form) + livre",
        expectedAnswer: "j'ai un bon livre",
        wrongAnswers: [
          {
            answer: "j'ai une bonne livre",
            feedback: "livre is masculine, use 'un bon'",
          },
          {
            answer: "j'ai un livre bon",
            feedback: "bon goes BEFORE the noun: un bon livre",
          },
        ],
      },
      {
        instruction: 'Say "she has a good house"',
        prompt: "she has a good house",
        hint: "maison is feminine - use feminine form of 'good'",
        expectedAnswer: "elle a une bonne maison",
        wrongAnswers: [
          {
            answer: "elle a un bon maison",
            feedback: "maison is feminine, use 'une bonne'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s a big man"',
        prompt: "it's a big man",
        hint: "homme is masculine - use masculine form",
        expectedAnswer: "c'est un grand homme",
        wrongAnswers: [
          {
            answer: "c'est une grande homme",
            feedback: "homme is masculine, use 'un grand'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s a big woman"',
        prompt: "it's a big woman",
        hint: "femme is feminine - use feminine form",
        expectedAnswer: "c'est une grande femme",
        wrongAnswers: [
          {
            answer: "c'est un grand femme",
            feedback: "femme is feminine, use 'une grande'",
          },
        ],
      },
      {
        instruction: 'Say "I have a small cat"',
        prompt: "I have a small cat (male)",
        hint: "chat is masculine - use masculine form",
        expectedAnswer: "j'ai un petit chat",
        wrongAnswers: [
          {
            answer: "j'ai une petite chatte",
            feedback: "That's correct for a female cat, but we want male",
          },
        ],
      },
      {
        instruction: 'Say "she has a small house"',
        prompt: "she has a small house",
        hint: "maison is feminine - use feminine form",
        expectedAnswer: "elle a une petite maison",
        wrongAnswers: [
          {
            answer: "elle a un petit maison",
            feedback: "maison is feminine, use 'une petite'",
          },
        ],
      },
      {
        instruction: 'Say "we have a new car"',
        prompt: "we have a new car",
        hint: "voiture is feminine - nouveau becomes nouvelle",
        expectedAnswer: "nous avons une nouvelle voiture",
        wrongAnswers: [
          {
            answer: "nous avons un nouveau voiture",
            feedback: "voiture is feminine, use 'une nouvelle'",
          },
        ],
      },
      {
        instruction: 'Say "he has a new book"',
        prompt: "he has a new book",
        hint: "livre is masculine - use nouveau",
        expectedAnswer: "il a un nouveau livre",
        wrongAnswers: [
          {
            answer: "il a une nouvelle livre",
            feedback: "livre is masculine, use 'un nouveau'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s an old cat"',
        prompt: "it's an old cat (male)",
        hint: "chat is masculine - vieux",
        expectedAnswer: "c'est un vieux chat",
        wrongAnswers: [
          {
            answer: "c'est une vieille chatte",
            feedback: "That's for a female cat, we want male",
          },
        ],
      },
      {
        instruction: 'Say "I have an old house"',
        prompt: "I have an old house",
        hint: "maison is feminine - vieux becomes vieille",
        expectedAnswer: "j'ai une vieille maison",
        wrongAnswers: [
          {
            answer: "j'ai un vieux maison",
            feedback: "maison is feminine, use 'une vieille'",
          },
        ],
      },
      {
        instruction: 'Say "he is a young man"',
        prompt: "he is a young man",
        hint: "jeune is the same for both genders",
        expectedAnswer: "il est un jeune homme",
        wrongAnswers: [
          {
            answer: "c'est un jeune homme",
            feedback:
              "Both work! But the expected answer uses 'il est' for occupation/identity",
          },
        ],
      },
      {
        instruction: 'Say "she is a young woman"',
        prompt: "she is a young woman",
        hint: "jeune is the same for both genders",
        expectedAnswer: "elle est une jeune femme",
        wrongAnswers: [
          {
            answer: "c'est une jeune femme",
            feedback: "Both work! But the expected answer uses 'elle est'",
          },
        ],
      },
      {
        instruction: 'Say "it\'s a beautiful book"',
        prompt: "it's a beautiful book",
        hint: "livre is masculine - use beau",
        expectedAnswer: "c'est un beau livre",
        wrongAnswers: [
          {
            answer: "c'est une belle livre",
            feedback: "livre is masculine, use 'un beau'",
          },
        ],
      },
      {
        instruction: 'Say "we have a beautiful house"',
        prompt: "we have a beautiful house",
        hint: "maison is feminine - beau becomes belle",
        expectedAnswer: "nous avons une belle maison",
        wrongAnswers: [
          {
            answer: "nous avons un beau maison",
            feedback: "maison is feminine, use 'une belle'",
          },
        ],
      },
      {
        instruction: 'Say "I have another book"',
        prompt: "I have another book",
        hint: "autre is the same for both genders",
        expectedAnswer: "j'ai un autre livre",
        wrongAnswers: [
          {
            answer: "j'ai une autre livre",
            feedback: "livre is masculine, use 'un autre'",
          },
        ],
      },
      {
        instruction: 'Say "you have another car"',
        prompt: "you have another car (informal)",
        hint: "voiture is feminine, autre stays the same",
        expectedAnswer: "tu as une autre voiture",
        wrongAnswers: [
          {
            answer: "tu as un autre voiture",
            feedback: "voiture is feminine, use 'une autre'",
          },
        ],
      },
    ],
  },
};
