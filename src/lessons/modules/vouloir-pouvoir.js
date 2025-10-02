/**
 * Module 4: vouloir (to want) & pouvoir (can)
 * Two essential modal verbs for expressing desires and abilities
 */

import { vouloirConjugations, pouvoirConjugations } from "../vocabularyData.js";

export const module5_vouloir_pouvoir = {
  // id and module number are set dynamically
  title: "Useful Phrases - want, can",
  description:
    "Now the fun begins! Combine what you know to express real needs and desires.",

  concepts: [
    {
      term: "vouloir = to want",
      definition: "Express desires and requests",
      example: "Essential for saying what you want in French",
    },
    {
      term: "pouvoir = can/to be able",
      definition: "Express ability or permission",
      example: "Essential for asking if you can do something",
    },
    {
      term: "Combining with Everything Learned",
      definition:
        "Use these verbs with ça, nouns, and noun phrases from previous modules",
      example:
        "Combine: I want + that, I want + the book, You can + that, etc.",
    },
  ],

  vocabularyReference: [
    { french: "je veux", english: "I want", note: "vouloir" },
    {
      french: "tu veux",
      english: "you want (informal)",
      note: "same form as je!",
    },
    { french: "il veut", english: "he wants", note: "different ending" },
    { french: "nous voulons", english: "we want", note: "" },
    { french: "je peux", english: "I can", note: "pouvoir" },
    {
      french: "tu peux",
      english: "you can (informal)",
      note: "same form as je!",
    },
    { french: "il peut", english: "he can", note: "different ending" },
    { french: "nous pouvons", english: "we can", note: "" },
  ],

  // Two verbs in one module
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
        key: "nous",
        context: "Express what your group wants",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "je",
        context: "Express what you're able to do",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "tu",
        context: "Tell your friend what they can do",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "il",
        context: "Say what a man can do",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "nous",
        context: "Say what your group can do",
      },
    ],
  },
};
