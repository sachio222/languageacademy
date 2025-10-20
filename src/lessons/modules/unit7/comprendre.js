/**
 * Module: comprendre (to understand)
 * Unit 7 - Knowledge & Learning theme
 * Rank 61 in top 100 - part of prendre family
 * First module in cognitive verb series
 */

import { comprendreConjugations } from "../../vocabularyData.js";

export const comprendreModule = {
  moduleKey: "2024-04-29-comprendre", // Permanent identifier - never changes
  title: "comprendre - To Understand",
  description:
    "Express understanding: je comprends (I understand), tu comprends? (do you understand?), je ne comprends pas (I don't understand)",

  concepts: [
    {
      term: "comprendre = to understand",
      definition:
        "Essential learning verb - follows same pattern as prendre (which you already know!)",
      example:
        "je comprends le français (I understand French), tu comprends? (do you understand?)",
    },
    {
      term: "Same pattern as prendre",
      definition:
        "If you know prendre, you know comprendre! Just add com- prefix",
      example:
        "je prends → je comprends, tu prends → tu comprends, ils prennent → ils comprennent",
    },
    {
      term: "Most common use: 'Je ne comprends pas'",
      definition: "THE essential phrase for learning - I don't understand",
      example:
        "Je ne comprends pas (I don't understand), Tu comprends? (Do you understand?)",
    },
    {
      term: "comprendre + noun",
      definition: "You can understand things, people, languages, concepts",
      example:
        "je comprends le français (I understand French), je comprends Marie (I understand Marie)",
    },
    {
      term: "Building on prendre knowledge",
      definition:
        "Three verbs in prendre family: prendre (take), apprendre (learn), comprendre (understand)",
      example:
        "j'apprends → je comprends (I learn → I understand) - natural progression!",
    },
  ],

  vocabularyReference: [
    {
      french: "comprendre",
      english: "to understand",
      note: "infinitive - follows prendre pattern",
    },
    {
      french: "je comprends",
      english: "I understand",
      note: "same as je prends pattern",
    },
    {
      french: "tu comprends",
      english: "you understand (informal)",
      note: "most common in questions",
    },
    {
      french: "il/elle comprend",
      english: "he/she understands",
      note: "no final -s or -t",
    },
    {
      french: "nous comprenons",
      english: "we understand",
      note: "pronounced 'kom-pruh-non'",
    },
    {
      french: "vous comprenez",
      english: "you understand (formal/plural)",
      note: "polite form for strangers",
    },
    {
      french: "ils/elles comprennent",
      english: "they understand",
      note: "double n, silent -ent",
    },
    {
      french: "Je ne comprends pas",
      english: "I don't understand",
      note: "⭐ MOST IMPORTANT PHRASE!",
    },
    {
      french: "Tu comprends?",
      english: "Do you understand?",
      note: "essential question for learning",
    },
    {
      french: "je comprends bien",
      english: "I understand well",
      note: "adverb after verb",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "comprendre",
    conjugations: comprendreConjugations,
    items: [
      {
        key: "je",
        context: "You don't understand something",
      },
      {
        key: "tu",
        context: "Ask if someone understands",
      },
      {
        key: "il",
        context: "He understands the lesson",
      },
      {
        key: "elle",
        context: "She understands French",
      },
      {
        key: "nous",
        context: "We understand the concept",
      },
      {
        key: "vous",
        context: "Ask formally if they understand",
      },
      {
        key: "ils",
        context: "They understand the question",
      },
      {
        key: "elles",
        context: "They (feminine) understand everything",
      },
    ],
  },
};
