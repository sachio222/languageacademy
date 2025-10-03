/**
 * faire (to do/make)
 * Rank 15 - One of the most essential French verbs
 * Super irregular but extremely useful!
 */

import { faireConjugations } from "../vocabularyData.js";

export const faireModule = {
  title: "Essential Verb - faire (to do/make)",
  description:
    "One of the most useful verbs in French! Express what you do, make, and experience.",

  concepts: [
    {
      term: "faire = to do/make",
      definition: "Extremely versatile verb - doing actions and making things",
      example: "Used constantly in daily life - one of the top 15 words!",
    },
    {
      term: "Irregular Pattern",
      definition: "faire is highly irregular - must memorize each form!",
      example: "je fais, tu fais, il fait, nous faisons, vous faites, ils font",
    },
    {
      term: "Common Uses",
      definition: "Doing activities, making things, weather expressions",
      example: "je fais ça (I do that), il fait beau (it's nice weather)",
    },
  ],

  vocabularyReference: [
    { french: "je fais", english: "I do/make", note: "irregular form" },
    {
      french: "tu fais",
      english: "you do/make (informal)",
      note: "same as je",
    },
    { french: "il fait", english: "he does/makes", note: "different ending" },
    { french: "elle fait", english: "she does/makes", note: "same as il" },
    { french: "nous faisons", english: "we do/make", note: "unique form" },
    {
      french: "vous faites",
      english: "you do/make (formal)",
      note: "unique form",
    },
    { french: "ils font", english: "they do/make (masc)", note: "irregular" },
    {
      french: "elles font",
      english: "they do/make (fem)",
      note: "same as ils",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "faire",
    conjugations: faireConjugations,
    items: [
      { key: "je", context: "Say what you do or make" },
      { key: "tu", context: "Tell your friend what they do" },
      { key: "il", context: "Say what a man does" },
      { key: "elle", context: "Say what a woman does" },
      { key: "nous", context: "Say what your group does" },
      { key: "vous", context: "Ask formally what someone does" },
      { key: "ils", context: "Say what they do (masculine)" },
      { key: "elles", context: "Say what they do (feminine)" },
    ],
  },
};
