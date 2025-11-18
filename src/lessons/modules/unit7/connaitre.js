/**
 * Module: connaître (to know people/places)
 * Unit 7 - Knowledge & Learning theme
 * Rank 62 in top 100 - completes savoir/connaître distinction
 */

import { connaitreConjugations } from "../../vocabularyData.js";

export const connaitreModule = {
  moduleKey: "2024-04-30-connaitre", // Permanent identifier - never changes
  title: "connaître - To Know (People/Places)",
  description:
    "Express knowledge of people and places: je connais Marie (I know Marie), tu connais Paris? (do you know Paris?)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Talk about people you know (I know Marie)",
      "Discuss places you're familiar with (Do you know Paris?)",
      "Distinguish between savoir (facts) and connaître (people/places)"
    ],
    realWorldUse: "talk about people and places you know",
    nextModuleTeaser: "Add learning and studying verbs"
  },

  concepts: [
    {
      term: "connaître = to know (people or places)",
      definition:
        "CRITICAL distinction: connaître is for people you know or places you're familiar with",
      example:
        "je connais Marie (I know Marie), je connais Paris (I know/am familiar with Paris)",
    },
    {
      term: "Irregular conjugation with î",
      definition:
        "Present: je connais, tu connais, il connaît, nous connaissons, vous connaissez, ils connaissent",
      example:
        "Notice: î with circumflex accent in il/elle form, double -ss- in plural",
    },
    {
      term: "THE KEY DISTINCTION: savoir vs connaître",
      definition:
        "savoir = facts/skills (learned), connaître = people/places (familiarity)",
      example:
        "je sais la réponse (I know the answer) BUT je connais Marie (I know Marie)",
    },
    {
      term: "NEVER use connaître + infinitive",
      definition: "You CANNOT say 'je connais parler' - use savoir for skills!",
      example:
        "✓ je sais parler (I know how to speak), ✗ je connais parler (WRONG!)",
    },
    {
      term: "Common uses",
      definition:
        "Know people, know places, be familiar with things (movies, books, brands)",
      example:
        "je connais ce film (I know this movie), tu connais ce restaurant? (do you know this restaurant?)",
    },
  ],

  vocabularyReference: [
    {
      french: "connaître",
      english: "to know / to be familiar with",
      note: "infinitive - irregular verb",
    },
    {
      french: "je connais",
      english: "I know",
      note: "for people/places only",
    },
    {
      french: "tu connais",
      english: "you know (informal)",
      note: "Tu connais Marie?",
    },
    {
      french: "il/elle connaît",
      english: "he/she knows",
      note: "⚠️ circumflex accent î",
    },
    {
      french: "nous connaissons",
      english: "we know",
      note: "double -ss-",
    },
    {
      french: "vous connaissez",
      english: "you know (formal/plural)",
      note: "double -ss-",
    },
    {
      french: "ils/elles connaissent",
      english: "they know",
      note: "double -ss-, silent -ent",
    },
    {
      french: "je connais Marie",
      english: "I know Marie",
      note: "⭐ people - use connaître",
    },
    {
      french: "je connais Paris",
      english: "I know Paris / I'm familiar with Paris",
      note: "⭐ places - use connaître",
    },
    {
      french: "Tu connais?",
      english: "Do you know (it/him/her)?",
      note: "asking if familiar",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "connaître",
    conjugations: connaitreConjugations,
    items: [
      {
        key: "je",
        context: "You know a person",
        customWrongAnswers: [
          {
            answer: "je sais",
            feedback:
              "Use 'je connais' for people. Savoir is for facts/skills!",
          },
        ],
      },
      {
        key: "tu",
        context: "Ask if someone knows a place",
      },
      {
        key: "il",
        context: "He knows Paris",
      },
      {
        key: "elle",
        context: "She knows my friend",
      },
      {
        key: "nous",
        context: "We know this restaurant",
      },
      {
        key: "vous",
        context: "Ask formally if they know someone",
      },
      {
        key: "ils",
        context: "They know the city",
      },
      {
        key: "elles",
        context: "They (feminine) know Marie",
      },
    ],
  },
};
