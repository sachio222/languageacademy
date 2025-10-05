/**
 * pouvoir (can / to be able)
 * Essential modal verb for expressing ability and permission
 */

import { pouvoirConjugations } from "../vocabularyData.js";

export const pouvoirModule = {
  title: "Essential Verb - pouvoir (can)",
  description:
    "Express what you can do! Ask for permission and talk about abilities.",

  concepts: [
    {
      term: "pouvoir = can/to be able",
      definition: "Express ability, possibility, or permission",
      example: "Essential for asking 'Can I...?' or saying what you can do",
    },
    {
      term: "Key Forms to Master",
      definition: "je/tu peux (same!), il/elle peut, nous pouvons",
      example: "Notice: je and tu have the SAME form - both 'peux'",
    },
    {
      term: "Polite Requests",
      definition: "Use 'je peux...?' to politely ask if you can do something",
      example: "More polite than just stating what you want!",
    },
  ],

  vocabularyReference: [
    {
      french: "pouvoir",
      english: "to be able to / can",
      note: "infinitive form",
    },
    { french: "je peux", english: "I can", note: "irregular form" },
    {
      french: "tu peux",
      english: "you can (informal)",
      note: "same as je!",
    },
    { french: "il peut", english: "he can", note: "different ending" },
    { french: "elle peut", english: "she can", note: "same as il" },
    { french: "nous pouvons", english: "we can", note: "regular ending" },
    {
      french: "vous pouvez",
      english: "you can (formal)",
      note: "formal/plural",
    },
    { french: "ils peuvent", english: "they can (masc)", note: "irregular" },
    {
      french: "elles peuvent",
      english: "they can (fem)",
      note: "same as ils",
    },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
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
        key: "elle",
        context: "Say what a woman can do",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "nous",
        context: "Say what your group can do",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "vous",
        context: "Ask formally what someone can do",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "ils",
        context: "Say what they can do (masculine)",
      },
      {
        verb: "pouvoir",
        conjugations: pouvoirConjugations,
        key: "elles",
        context: "Say what they can do (feminine)",
      },
    ],
  },
};
