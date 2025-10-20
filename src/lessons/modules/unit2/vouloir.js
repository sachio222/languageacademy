/**
 * vouloir (to want)
 * Essential modal verb for expressing desires and requests
 */

import { vouloirConjugations } from "../../vocabularyData.js";

export const vouloirModule = {
  title: "Essential Verb - vouloir (to want)",
  description:
    "Express what you want! Combine with everything you've learned to make real requests.",

  concepts: [
    {
      term: "vouloir = to want",
      definition: "Express desires, wishes, and polite requests",
      example: "Essential for saying what you want in French",
    },
    {
      term: "Key Forms to Master",
      definition: "je/tu veux (same!), il/elle veut, nous voulons",
      example: "Notice: je and tu have the SAME form - both 'veux'",
    },
    {
      term: "Combining Power",
      definition:
        "Use with ça, demonstratives, and nouns: 'je veux ça', 'tu veux ce livre'",
      example:
        "Combine with everything from previous modules for real sentences!",
    },
  ],

  vocabularyReference: [
    { french: "vouloir", english: "to want", note: "infinitive form" },
    { french: "je veux", english: "I want", note: "irregular form" },
    {
      french: "tu veux",
      english: "you want (informal)",
      note: "same as je!",
    },
    { french: "il veut", english: "he wants", note: "different ending" },
    { french: "elle veut", english: "she wants", note: "same as il" },
    { french: "nous voulons", english: "we want", note: "regular ending" },
    {
      french: "vous voulez",
      english: "you want (formal)",
      note: "formal/plural",
    },
    { french: "ils veulent", english: "they want (masc)", note: "irregular" },
    {
      french: "elles veulent",
      english: "they want (fem)",
      note: "same as ils",
    },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "je",
        context: "Express what you want",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "tu",
        context: "Tell your friend what they want",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "il",
        context: "Say what a man wants",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "elle",
        context: "Say what a woman wants",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "nous",
        context: "Express what your group wants",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "vous",
        context: "Ask formally what someone wants",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "ils",
        context: "Say what they want (masculine)",
      },
      {
        verb: "vouloir",
        conjugations: vouloirConjugations,
        key: "elles",
        context: "Say what they want (feminine)",
      },
    ],
  },
};
