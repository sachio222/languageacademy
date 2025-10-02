/**
 * Module 3: avoir (to have)
 * All 8 conjugations including the tricky j'ai
 */

import { avoirConjugations } from "../vocabularyData.js";

export const module4_avoir = {
  // id and module number are set dynamically
  title: "Essential Verb - avoir (to have)",
  description:
    'Learn "I have", "you have" - express possession and needs. Super practical!',

  concepts: [
    {
      term: "avoir = to have",
      definition: "Express possession, age, and physical states",
      example: "Use to say what you have, your age, or physical sensations",
    },
    {
      term: "Elision with First Person",
      definition:
        "When 'I' meets a verb starting with vowel, letters merge with apostrophe",
      example:
        "The 'e' disappears and apostrophe appears for smooth pronunciation",
    },
    {
      term: "Common Uses",
      definition:
        'Possession: "I have a cat", Age: "I have 20 years" (French way to say age!)',
      example: "Possession and age are the most common uses",
    },
  ],

  vocabularyReference: [
    { french: "j'ai", english: "I have", note: "use apostrophe!" },
    { french: "tu as", english: "you have (informal)", note: "singular" },
    { french: "il a", english: "he has", note: "masculine" },
    { french: "elle a", english: "she has", note: "feminine" },
    { french: "nous avons", english: "we have", note: "plural" },
    {
      french: "vous avez",
      english: "you have (formal/plural)",
      note: "formal or groups",
    },
    {
      french: "ils ont",
      english: "they have (masculine)",
      note: "masc or mixed",
    },
    {
      french: "elles ont",
      english: "they have (feminine)",
      note: "all feminine",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "avoir",
    conjugations: avoirConjugations,
    items: [
      {
        key: "je",
        context: "Talk about something you possess",
        customWrongAnswers: [
          {
            answer: "je ai",
            feedback: "Use j'ai with an apostrophe, not 'je ai'",
          },
          { answer: "tu as", feedback: "That's 'you have', not 'I have'" },
        ],
      },
      { key: "tu", context: "Tell your friend what they have" },
      { key: "il", context: "Say what a man has" },
      { key: "elle", context: "Say what a woman has" },
      { key: "nous", context: "Talk about what your group has" },
      { key: "vous", context: "Tell someone formally what they have" },
      { key: "ils", context: "Say what a group of men has" },
      { key: "elles", context: "Say what a group of women has" },
    ],
  },
};
