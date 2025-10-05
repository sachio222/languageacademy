/**
 * Module 2: être (to be)
 * All 8 conjugations of the most important French verb
 */

import { etreConjugations } from "../vocabularyData.js";

export const module3_etre = {
  // id and module number are set dynamically
  title: "Essential Verb - être (to be)",
  description:
    'Build your first real sentences! "I am", "you are", "he is" - the most useful pattern in French.',

  concepts: [
    {
      term: "être = to be",
      definition: "The most important verb. Describes states and identity.",
      example: "Express: I am, you are, he is, she is, we are, they are",
    },
    {
      term: "Conjugation Pattern",
      definition:
        "Each pronoun gets a unique verb form - you must memorize all 8!",
      example: "8 different forms to learn in this module",
    },
    {
      term: "Practical Usage",
      definition:
        'Use with adjectives: "I am happy" or professions: "I am a student"',
      example: "Combine with adjectives to describe yourself and others",
    },
  ],

  vocabularyReference: [
    { french: "être", english: "to be", note: "infinitive form" },
    { french: "je suis", english: "I am", note: "être conjugated" },
    { french: "tu es", english: "you are (informal)", note: "singular" },
    { french: "il est", english: "he is", note: "masculine" },
    { french: "elle est", english: "she is", note: "feminine" },
    { french: "nous sommes", english: "we are", note: "plural" },
    {
      french: "vous êtes",
      english: "you are (formal/plural)",
      note: "formal or groups",
    },
    {
      french: "ils sont",
      english: "they are (masculine)",
      note: "masc or mixed",
    },
    {
      french: "elles sont",
      english: "they are (feminine)",
      note: "all feminine",
    },
  ],

  exerciseConfig: {
    type: "conjugation",
    verb: "être",
    conjugations: etreConjugations,
    items: [
      { key: "je", context: "Introduce yourself" },
      { key: "tu", context: "Tell your friend what they are" },
      { key: "il", context: "Describe a man" },
      { key: "elle", context: "Describe a woman" },
      { key: "nous", context: "Describe your group" },
      { key: "vous", context: "Address someone formally" },
      { key: "ils", context: "Describe a group of men" },
      { key: "elles", context: "Describe a group of women" },
    ],
  },
};
