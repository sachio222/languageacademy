/**
 * Module: savoir (to know facts/how to)
 * Unit 7 - Knowledge & Learning theme
 * Rank 21 in top 100 - EXTREMELY high frequency
 * "Je ne sais pas" = most common phrase in French!
 */

import { savoirConjugations } from "../../vocabularyData.js";

export const savoirModule = {
  moduleKey: "2024-05-08-savoir", // Permanent identifier - never changes
  title: "savoir - To Know (Facts/Skills)",
  description:
    "Express knowledge of facts and skills: je sais (I know), je ne sais pas (I don't know), je sais parler (I know how to speak)",

  concepts: [
    {
      term: "savoir = to know (facts or skills)",
      definition:
        "CRITICAL distinction: savoir is for facts you learned or skills you have",
      example:
        "je sais la réponse (I know the answer), je sais nager (I know how to swim)",
    },
    {
      term: "Irregular conjugation",
      definition:
        "Must memorize! Present: je sais, tu sais, il sait, nous savons, vous savez, ils savent",
      example:
        "Notice: je/tu/il all sound the same ('say'), nous/vous different",
    },
    {
      term: "'Je ne sais pas' - THE phrase",
      definition:
        "Rank 21 = one of most common phrases in ALL of French! You'll use it constantly",
      example:
        "Je ne sais pas (I don't know), Tu sais? (You know? / Do you know?)",
    },
    {
      term: "savoir + infinitive = know how to",
      definition: "Use savoir + verb to express skills/abilities",
      example:
        "je sais parler français (I know how to speak French), je sais nager (I can swim)",
    },
    {
      term: "savoir vs connaître (preview)",
      definition:
        "savoir = facts/skills, connaître = people/places (you'll learn connaître next!)",
      example:
        "je sais la réponse (I know the answer), je connais Marie (I know Marie) ← next module!",
    },
  ],

  vocabularyReference: [
    {
      french: "savoir",
      english: "to know (facts/skills)",
      note: "infinitive - irregular verb",
    },
    {
      french: "je sais",
      english: "I know",
      note: "pronounced 'say'",
    },
    {
      french: "tu sais",
      english: "you know (informal)",
      note: "same sound as je sais",
    },
    {
      french: "il/elle sait",
      english: "he/she knows",
      note: "same sound, different spelling",
    },
    {
      french: "nous savons",
      english: "we know",
      note: "pronounced 'sa-von'",
    },
    {
      french: "vous savez",
      english: "you know (formal/plural)",
      note: "pronounced 'sa-vay'",
    },
    {
      french: "ils/elles savent",
      english: "they know",
      note: "pronounced 'sav' (silent -ent)",
    },
    {
      french: "Je ne sais pas",
      english: "I don't know",
      note: "⭐⭐⭐ MOST IMPORTANT! Rank 21!",
    },
    {
      french: "Tu sais?",
      english: "Do you know? / You know?",
      note: "super common question",
    },
    {
      french: "je sais parler",
      english: "I know how to speak / I can speak",
      note: "savoir + infinitive for skills",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "savoir",
    conjugations: savoirConjugations,
    items: [
      {
        key: "je",
        context: "You don't know the answer",
        customWrongAnswers: [
          {
            answer: "je connais",
            feedback:
              "Use 'je sais' for facts. Connaître is for people/places!",
          },
        ],
      },
      {
        key: "tu",
        context: "Ask if someone knows",
      },
      {
        key: "il",
        context: "He knows how to swim",
      },
      {
        key: "elle",
        context: "She knows the answer",
      },
      {
        key: "nous",
        context: "We know French",
      },
      {
        key: "vous",
        context: "Ask formally if they know",
      },
      {
        key: "ils",
        context: "They know everything",
      },
      {
        key: "elles",
        context: "They (feminine) know how to cook",
      },
    ],
  },
};
