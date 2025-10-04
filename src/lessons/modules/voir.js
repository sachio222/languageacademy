/**
 * Module: voir (to see)
 * Essential perception verb
 * Irregular conjugation pattern
 */

import { voirConjugations } from "../vocabularyData.js";

export const voirModule = {
  title: "Essential Verb - voir (to see)",
  description:
    "Essential perception verb: je vois (I see), tu vois (you see), il voit (he sees)",

  concepts: [
    {
      term: "voir = to see",
      definition: "Irregular verb for seeing and perceiving",
      example: "Very common! Essential for object pronouns in next module",
    },
    {
      term: "Irregular Conjugation",
      definition: "Stem changes throughout conjugation",
      example: "je/tu vois, il voit, nous voyons, vous voyez, ils voient",
    },
    {
      term: "Building on Previous Vocabulary",
      definition:
        "Combine with nouns, adjectives, and phrases you already know",
      example: "Pattern: 'je vois' + articles + nouns + adjectives",
    },
    {
      term: "Prepares for Object Pronouns",
      definition:
        "Next module teaches 'I see HIM/HER/IT/THEM' - need voir first!",
      example: "Foundation for: je le vois, je la vois, je les vois",
    },
  ],

  vocabularyReference: [
    { french: "je vois", english: "I see", note: "voir - irregular" },
    { french: "tu vois", english: "you see (informal)", note: "same as je!" },
    { french: "il voit", english: "he sees", note: "different ending" },
    { french: "elle voit", english: "she sees", note: "same as il" },
    {
      french: "nous voyons",
      english: "we see",
      note: "stem changes to voy-!",
    },
    { french: "vous voyez", english: "you see (formal)", note: "also voy-" },
    {
      french: "ils voient",
      english: "they see (masc)",
      note: "back to voi- stem",
    },
    {
      french: "elles voient",
      english: "they see (fem)",
      note: "same as ils",
    },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "je",
        context: "Say what you see",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "tu",
        context: "Say what you see (informal)",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "il",
        context: "Say what he sees",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "elle",
        context: "Say what she sees",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "nous",
        context: "Say what we see",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "vous",
        context: "Say what you see (formal)",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "ils",
        context: "Say what they see (masculine)",
      },
      {
        verb: "voir",
        conjugations: voirConjugations,
        key: "elles",
        context: "Say what they see (feminine)",
      },
    ],
  },
};
