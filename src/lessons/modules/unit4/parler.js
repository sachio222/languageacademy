/**
 * parler (to speak / to talk)
 * Regular -ER verb - great pattern to master!
 * Essential for communication
 */

import { parlerConjugations } from "../../vocabularyData.js";

export const parlerModule = {
  title: "Essential Verb - parler (to speak)",
  description:
    "Express communication! Say what languages you speak and who you talk to. Perfect example of regular -ER verbs!",

  concepts: [
    {
      term: "parler = to speak / to talk",
      definition: "Talk about languages you speak and conversations you have",
      example:
        "je parle français (I speak French), nous parlons ensemble (we talk together)",
    },
    {
      term: "Regular -ER Verb Pattern",
      definition: "This is THE standard French verb pattern - master it!",
      example:
        "Remove -er, add: -e, -es, -e, -ons, -ez, -ent (most verbs follow this!)",
    },
    {
      term: "Silent Endings",
      definition:
        "je/tu/il/elle/ils/elles all SOUND the same! Only nous/vous are different",
      example:
        "je parle, tu parles, il parle, elle parle, ils parlent - all sound like 'parl'",
    },
    {
      term: "With Prepositions",
      definition: "Use 'à' when talking TO someone: parler à quelqu'un",
      example: "je parle à Marie (I speak to Marie)",
    },
    {
      term: "Common Uses",
      definition:
        "Describe languages (parler français), conversations (parler avec), topics (parler de)",
      example:
        "je parle français (I speak French), nous parlons de toi (we talk about you)",
    },
  ],

  vocabularyReference: [
    {
      french: "parler",
      english: "to speak / to talk",
      note: "infinitive form - regular -ER verb",
    },
    {
      french: "je parle",
      english: "I speak",
      note: "drop -er, add -e (silent)",
    },
    {
      french: "tu parles",
      english: "you speak (informal)",
      note: "add -es (silent)",
    },
    {
      french: "il parle",
      english: "he speaks",
      note: "add -e (sounds same as je)",
    },
    {
      french: "elle parle",
      english: "she speaks",
      note: "add -e (sounds same)",
    },
    {
      french: "nous parlons",
      english: "we speak",
      note: "add -ons (pronounced!)",
    },
    {
      french: "vous parlez",
      english: "you speak (formal)",
      note: "add -ez (pronounced!)",
    },
    {
      french: "ils parlent",
      english: "they speak (masc)",
      note: "add -ent (silent!)",
    },
    {
      french: "elles parlent",
      english: "they speak (fem)",
      note: "sounds same as il",
    },
  ],

  exerciseConfig: {
    type: "mixed",
    items: [
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "je",
        context: "Say what language you speak",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "tu",
        context: "Tell your friend what they speak",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "il",
        context: "Say what a man speaks",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "elle",
        context: "Say what a woman speaks",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "nous",
        context: "Say what your group speaks",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "vous",
        context: "Ask formally what someone speaks",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "ils",
        context: "Say what they speak (masculine)",
      },
      {
        verb: "parler",
        conjugations: parlerConjugations,
        key: "elles",
        context: "Say what they speak (feminine)",
      },
    ],
  },
};
