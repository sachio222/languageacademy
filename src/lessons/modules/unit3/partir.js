/**
 * Module: partir (to leave)
 * Essential motion verb for departures
 * Regular -ir verb pattern
 */

import { partirConjugations } from "../../vocabularyData.js";

export const partirModule = {
  moduleKey: "2024-01-29-partir", // Permanent identifier - never changes
  title: "Essential Verb - partir (to leave)",
  description:
    "Express departures: je pars (I leave), tu pars (you leave), il part (he leaves)",

  concepts: [
    {
      term: "partir = to leave / to depart",
      definition: "Common verb for leaving a place or departing",
      example:
        "Essential for talking about travel and movement away from places",
    },
    {
      term: "Regular -ir Conjugation",
      definition: "Follows standard -ir pattern (drop singular endings)",
      example:
        "Singular: je/tu pars, il part. Plural: nous partons, vous partez",
    },
    {
      term: "Contrasts with venir and aller",
      definition: "Now you can express coming, going, AND leaving!",
      example: "je viens (I come), je vais (I go), je pars (I leave)",
    },
    {
      term: "Builds on All Previous Vocabulary",
      definition:
        "Use with prepositions, nouns, adjectives from earlier modules",
      example: "Combine with prepositions: partir à, partir dans, etc.",
    },
  ],

  vocabularyReference: [
    {
      french: "partir",
      english: "to leave / to depart",
      note: "infinitive form",
    },
    { french: "je pars", english: "I leave / I'm leaving", note: "partir" },
    { french: "tu pars", english: "you leave (informal)", note: "same as je!" },
    { french: "il part", english: "he leaves", note: "drops -s" },
    { french: "elle part", english: "she leaves", note: "same as il" },
    { french: "nous partons", english: "we leave", note: "add -ons to stem" },
    { french: "vous partez", english: "you leave (formal)", note: "add -ez" },
    { french: "ils partent", english: "they leave (masc)", note: "add -ent" },
    {
      french: "elles partent",
      english: "they leave (fem)",
      note: "same as ils",
    },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "je",
        context: "Say you're leaving",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "tu",
        context: "Tell your friend they're leaving",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "il",
        context: "Say he's leaving",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "elle",
        context: "Say she's leaving",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "nous",
        context: "Say we're leaving",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "vous",
        context: "Say you're leaving (formal)",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "ils",
        context: "Say they're leaving (masculine)",
      },
      {
        verb: "partir",
        conjugations: partirConjugations,
        key: "elles",
        context: "Say they're leaving (feminine)",
      },
    ],
  },
};
