/**
 * Module: penser (to think)
 * Unit 7 - Knowledge & Learning theme
 * Rank 59 in top 100 - opinion expression
 */

import { penserConjugations } from "../../vocabularyData.js";

export const penserModule = {
  moduleKey: "2024-05-06-penser", // Permanent identifier - never changes
  title: "penser - To Think",
  description:
    "Express thoughts and opinions: je pense que oui (I think so), qu'est-ce que tu penses? (what do you think?)",

  concepts: [
    {
      term: "penser = to think",
      definition: "Core cognitive verb for expressing opinions and thoughts",
      example:
        "je pense que c'est bon (I think it's good), tu penses? (what do you think?)",
    },
    {
      term: "Regular -ER verb",
      definition:
        "Easy conjugation! Like parler, manger, etc. (verbs you already know)",
      example: "je pense, tu penses, il pense - add -e, -es, -e endings",
    },
    {
      term: "penser que... (to think that...)",
      definition: "Use 'que' to introduce your opinion - VERY common pattern",
      example:
        "je pense que oui (I think so), je pense que non (I don't think so)",
    },
    {
      term: "penser à... (to think about...)",
      definition: "Use 'à' + person/thing when thinking about something",
      example:
        "je pense à toi (I'm thinking about you), je pense à ça (I'm thinking about that)",
    },
    {
      term: "Asking opinions",
      definition: "Qu'est-ce que tu penses? = What do you think? (essential!)",
      example: "Qu'est-ce que tu penses de ça? (What do you think about that?)",
    },
  ],

  vocabularyReference: [
    {
      french: "penser",
      english: "to think",
      note: "infinitive - regular -ER verb",
    },
    {
      french: "je pense",
      english: "I think",
      note: "first person - most common",
    },
    {
      french: "tu penses",
      english: "you think (informal)",
      note: "for asking opinions",
    },
    {
      french: "il/elle pense",
      english: "he/she thinks",
      note: "third person opinion",
    },
    {
      french: "nous pensons",
      english: "we think",
      note: "group opinion",
    },
    {
      french: "vous pensez",
      english: "you think (formal/plural)",
      note: "polite form",
    },
    {
      french: "ils/elles pensent",
      english: "they think",
      note: "silent -ent ending",
    },
    {
      french: "je pense que oui",
      english: "I think so",
      note: "⭐ super common response",
    },
    {
      french: "je pense que non",
      english: "I don't think so",
      note: "negative response",
    },
    {
      french: "Qu'est-ce que tu penses?",
      english: "What do you think?",
      note: "asking for opinion",
    },
    {
      french: "je pense à toi",
      english: "I'm thinking about you",
      note: "use à for 'about'",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "penser",
    conjugations: penserConjugations,
    items: [
      {
        key: "je",
        context: "Express your opinion",
      },
      {
        key: "tu",
        context: "Ask what someone thinks",
      },
      {
        key: "il",
        context: "He thinks it's good",
      },
      {
        key: "elle",
        context: "She thinks about the question",
      },
      {
        key: "nous",
        context: "We think that's true",
      },
      {
        key: "vous",
        context: "Ask formally for an opinion",
      },
      {
        key: "ils",
        context: "They think it's important",
      },
      {
        key: "elles",
        context: "They (feminine) are thinking",
      },
    ],
  },
};
