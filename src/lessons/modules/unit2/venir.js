/**
 * Module: venir (to come)
 * Essential motion verb
 * Irregular conjugation pattern
 */

import { venirConjugations } from "../../vocabularyData.js";

export const venirModule = {
  moduleKey: "2024-01-26-venir", // Permanent identifier - never changes
  title: "Essential Verb - venir (to come)",
  description:
    "Essential motion verb: je viens (I come), tu viens (you come), il vient (he comes)",

  concepts: [
    {
      term: "venir = to come",
      definition: "Irregular verb for coming or arriving",
      example: "Very common! Used constantly in conversation",
    },
    {
      term: "Conjugation Pattern",
      definition:
        "Stem changes: je/tu viens, il vient, nous venons, ils viennent",
      example: "Notice: je and tu use same form (viens)",
    },
    {
      term: "Using with Previous Vocabulary",
      definition: "Combine with prepositions and nouns you already know",
      example:
        "Common patterns: 'qui vient?' (who's coming?), simple statements",
    },
  ],

  vocabularyReference: [
    { french: "venir", english: "to come", note: "infinitive form" },
    { french: "je viens", english: "I come / I'm coming", note: "venir" },
    { french: "tu viens", english: "you come (informal)", note: "same as je!" },
    { french: "il vient", english: "he comes", note: "different ending" },
    { french: "elle vient", english: "she comes", note: "same as il" },
    { french: "nous venons", english: "we come", note: "regular -ons" },
    { french: "vous venez", english: "you come (formal)", note: "regular -ez" },
    { french: "ils viennent", english: "they come (masc)", note: "double n!" },
    { french: "elles viennent", english: "they come (fem)", note: "double n!" },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "je",
        context: "Say you're coming",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "tu",
        context: "Tell your friend they're coming",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "il",
        context: "Say he's coming",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "elle",
        context: "Say she's coming",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "nous",
        context: "Say we're coming",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "vous",
        context: "Say you're coming (formal)",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "ils",
        context: "Say they're coming (masculine)",
      },
      {
        verb: "venir",
        conjugations: venirConjugations,
        key: "elles",
        context: "Say they're coming (feminine)",
      },
    ],
  },
};
