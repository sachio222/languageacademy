/**
 * Module: croire (to believe)
 * Unit 7 - Knowledge & Learning theme
 * Rank 60 in top 100 - completes cognitive verb trio
 */

import { croireConjugations } from "../vocabularyData.js";

export const croireModule = {
  title: "croire - To Believe",
  description:
    "Express belief and softer opinions: je crois que oui (I believe so), tu crois? (do you believe it?)",

  concepts: [
    {
      term: "croire = to believe / to think",
      definition:
        "Express belief or softer opinions - often used like penser but more tentative",
      example:
        "je crois que c'est vrai (I believe it's true), tu crois? (do you think so?)",
    },
    {
      term: "Irregular conjugation",
      definition:
        "Present: je crois, tu crois, il croit, nous croyons, vous croyez, ils croient",
      example:
        "Notice: singular all same sound ('kwa'), nous/vous have y, ils have -ient",
    },
    {
      term: "croire que... (to believe that...)",
      definition:
        "Like penser que, use with 'que' to introduce what you believe",
      example:
        "je crois que oui (I believe so), je ne crois pas (I don't believe so / I don't think so)",
    },
    {
      term: "croire à / croire en (to believe in)",
      definition: "Use à or en to express belief in concepts or things",
      example:
        "je crois en toi (I believe in you), je crois à ça (I believe in that)",
    },
    {
      term: "penser vs croire",
      definition:
        "penser = think (more definite), croire = believe (more tentative/hopeful)",
      example:
        "je pense qu'il vient (I think he's coming - pretty sure), je crois qu'il vient (I believe he's coming - less certain)",
    },
  ],

  vocabularyReference: [
    {
      french: "croire",
      english: "to believe / to think",
      note: "infinitive - irregular verb",
    },
    {
      french: "je crois",
      english: "I believe / I think",
      note: "pronounced 'krwa'",
    },
    {
      french: "tu crois",
      english: "you believe (informal)",
      note: "same sound as je crois",
    },
    {
      french: "il/elle croit",
      english: "he/she believes",
      note: "same sound, different spelling",
    },
    {
      french: "nous croyons",
      english: "we believe",
      note: "pronounced 'krwa-yon' with y sound",
    },
    {
      french: "vous croyez",
      english: "you believe (formal/plural)",
      note: "pronounced 'krwa-yay' with y sound",
    },
    {
      french: "ils/elles croient",
      english: "they believe",
      note: "pronounced 'krwa' (silent -ent)",
    },
    {
      french: "je crois que oui",
      english: "I believe so / I think so",
      note: "⭐ softer than 'je pense que oui'",
    },
    {
      french: "je ne crois pas",
      english: "I don't believe so / I don't think so",
      note: "common negative response",
    },
    {
      french: "Tu crois?",
      english: "Do you think so? / Do you believe it?",
      note: "asking for opinion/belief",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "croire",
    conjugations: croireConjugations,
    items: [
      {
        key: "je",
        context: "Express that you believe something",
      },
      {
        key: "tu",
        context: "Ask if someone believes it",
      },
      {
        key: "il",
        context: "He believes that's true",
      },
      {
        key: "elle",
        context: "She believes in you",
      },
      {
        key: "nous",
        context: "We believe it's possible",
      },
      {
        key: "vous",
        context: "Ask formally if they believe",
      },
      {
        key: "ils",
        context: "They believe the story",
      },
      {
        key: "elles",
        context: "They (feminine) believe so",
      },
    ],
  },
};
