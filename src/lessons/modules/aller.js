/**
 * Module: aller (to go)
 * THE most essential motion verb - rank 16 in top 100
 * Completely irregular conjugation - must memorize!
 */

import { allerConjugations } from "../vocabularyData.js";

export const allerModule = {
  title: "Essential Verb - aller (to go)",
  description:
    "THE most important motion verb: je vais (I go), tu vas (you go), il va (he goes)",

  concepts: [
    {
      term: "aller = to go",
      definition:
        "Completely irregular verb - one of the most common in French!",
      example:
        "Used constantly! Essential for talking about movement and future plans",
    },
    {
      term: "Irregular Conjugation",
      definition: "Every form is different - must memorize each one!",
      example: "je vais, tu vas, il va, nous allons, vous allez, ils vont",
    },
    {
      term: "Building on Previous Modules",
      definition:
        "Combine with prepositions from M14 to say where you're going",
      example: "Pattern: 'je vais' + à/dans/avec from prepositions module",
    },
    {
      term: "Common Phrases",
      definition: "aller forms the basis of many everyday expressions",
      example: "'comment ça va?' (how's it going?) uses 'va' from aller!",
    },
  ],

  vocabularyReference: [
    {
      french: "je vais",
      english: "I go / I'm going",
      note: "aller - irregular!",
    },
    {
      french: "tu vas",
      english: "you go (informal)",
      note: "different from je",
    },
    { french: "il va", english: "he goes", note: "also in 'ça va'" },
    { french: "elle va", english: "she goes", note: "same as il" },
    {
      french: "nous allons",
      english: "we go",
      note: "completely different stem!",
    },
    {
      french: "vous allez",
      english: "you go (formal)",
      note: "similar to nous",
    },
    {
      french: "ils vont",
      english: "they go (masc)",
      note: "yet another form!",
    },
    { french: "elles vont", english: "they go (fem)", note: "same as ils" },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "je",
        context: "Say where you're going",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "tu",
        context: "Tell your friend where they're going",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "il",
        context: "Say where he's going",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "elle",
        context: "Say where she's going",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "nous",
        context: "Say where we're going",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "vous",
        context: "Say where you're going (formal)",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "ils",
        context: "Say where they're going (masculine)",
      },
      {
        verb: "aller",
        conjugations: allerConjugations,
        key: "elles",
        context: "Say where they're going (feminine)",
      },
    ],
  },
};
