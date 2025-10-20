/**
 * devoir (must / to have to)
 * Essential modal verb for expressing obligation and necessity
 */

import { devoirConjugations } from "../../vocabularyData.js";

export const devoirModule = {
  moduleKey: "2024-03-23-devoir", // Permanent identifier - never changes
  title: "Essential Verb - devoir (must)",
  description:
    "Express what you must do! Talk about obligations, duties, and what you have to do.",

  concepts: [
    {
      term: "devoir = must / to have to",
      definition: "Express obligation, necessity, or moral duty",
      example:
        "Essential for saying 'I must...' or 'I have to...' - very common!",
    },
    {
      term: "Key Forms to Master",
      definition: "je/tu dois (same!), il/elle doit, nous devons",
      example: "Notice: je and tu have the SAME form - both 'dois'",
    },
    {
      term: "Multiple Meanings",
      definition:
        "Can mean 'must', 'have to', 'should', or even 'owe' depending on context",
      example: "je dois partir (I must leave), je dois 5 euros (I owe 5 euros)",
    },
    {
      term: "With Negation",
      definition: "je ne dois pas = I must not / I don't have to",
      example: "Pairs perfectly with negation you already learned!",
    },
  ],

  vocabularyReference: [
    { french: "devoir", english: "to have to / must", note: "infinitive form" },
    { french: "je dois", english: "I must", note: "irregular form" },
    {
      french: "tu dois",
      english: "you must (informal)",
      note: "same as je!",
    },
    { french: "il doit", english: "he must", note: "different ending" },
    { french: "elle doit", english: "she must", note: "same as il" },
    { french: "nous devons", english: "we must", note: "regular ending" },
    {
      french: "vous devez",
      english: "you must (formal)",
      note: "formal/plural",
    },
    { french: "ils doivent", english: "they must (masc)", note: "irregular" },
    {
      french: "elles doivent",
      english: "they must (fem)",
      note: "same as ils",
    },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "je",
        context: "Express an obligation you have",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "tu",
        context: "Tell your friend what they must do",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "il",
        context: "Say what a man must do",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "elle",
        context: "Say what a woman must do",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "nous",
        context: "Say what your group must do",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "vous",
        context: "Tell someone formally what they must do",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "ils",
        context: "Say what they must do (masculine)",
      },
      {
        verb: "devoir",
        conjugations: devoirConjugations,
        key: "elles",
        context: "Say what they must do (feminine)",
      },
    ],
  },
};
