/**
 * Module 7: Object Pronouns - him, her, it, them
 * Use as objects of verbs: "I see him", "She likes it"
 */

import { objectPronouns } from "../vocabularyData.js";

export const module7_object_pronouns = {
  // id and module number are set dynamically
  title: "Object Pronouns - Him, Her, It, Them",
  description:
    "Express 'I see HIM', 'She likes IT' - pronouns as objects of verbs.",

  concepts: [
    {
      term: "Object Pronouns",
      definition:
        "Pronouns that receive the action of a verb (me, you, him, her, us, them)",
      example: "7 object pronouns to learn - different from subject pronouns!",
    },
    {
      term: "Critical Placement Rule",
      definition:
        "Object pronouns go BEFORE the verb in French (opposite of English!)",
      example:
        "English: 'I see HIM', French: 'I HIM see' - pronoun comes first",
    },
    {
      term: "Subject vs Object",
      definition:
        "Subject does action (he/she), object receives action (him/her)",
      example:
        "Don't confuse subject and object pronouns - they're different words!",
    },
  ],

  vocabularyReference: [
    { french: "me", english: "me", note: "object pronoun" },
    { french: "te", english: "you (informal)", note: "object, singular" },
    { french: "le", english: "him/it (masculine)", note: "masculine object" },
    { french: "la", english: "her/it (feminine)", note: "feminine object" },
    { french: "nous", english: "us", note: "object pronoun" },
    {
      french: "vous",
      english: "you (formal/plural)",
      note: "object, formal or groups",
    },
    { french: "les", english: "them", note: "plural object (all genders)" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "Someone wants to see you. Which object pronoun means 'me'?",
        prompt: "me",
        hint: "First person object pronoun",
        expectedAnswer: "me",
        wrongAnswers: [
          { answer: "te", feedback: "That's 'you', not 'me'" },
          { answer: "le", feedback: "That's 'him/it', not 'me'" },
        ],
      },
      {
        instruction:
          "You want to see your friend (informal). Which object pronoun for 'you'?",
        prompt: "you (informal)",
        hint: "Informal second person object",
        expectedAnswer: "te",
        wrongAnswers: [
          { answer: "me", feedback: "That's 'me', not 'you'" },
          { answer: "le", feedback: "That's 'him/it', not 'you'" },
        ],
      },
      {
        instruction:
          "You see a man or masculine object. Which object pronoun for 'him/it'?",
        prompt: "him/it (masculine)",
        hint: "Masculine third person object",
        expectedAnswer: "le",
        wrongAnswers: [
          { answer: "la", feedback: "That's feminine 'her/it'" },
          { answer: "les", feedback: "That's plural 'them'" },
        ],
      },
      {
        instruction:
          "You see a woman or feminine object. Which object pronoun for 'her/it'?",
        prompt: "her/it (feminine)",
        hint: "Feminine third person object",
        expectedAnswer: "la",
        wrongAnswers: [
          { answer: "le", feedback: "That's masculine 'him/it'" },
          { answer: "les", feedback: "That's plural 'them'" },
        ],
      },
      {
        instruction:
          "Someone wants to see you and your group. Which object pronoun for 'us'?",
        prompt: "us",
        hint: "First person plural object",
        expectedAnswer: "nous",
        wrongAnswers: [
          { answer: "vous", feedback: "That's 'you', not 'us'" },
          { answer: "les", feedback: "That's 'them', not 'us'" },
        ],
      },
      {
        instruction:
          "You want to see a group (formal). Which object pronoun for 'you'?",
        prompt: "you (formal or plural)",
        hint: "Formal/plural second person object",
        expectedAnswer: "vous",
        wrongAnswers: [
          { answer: "nous", feedback: "That's 'us', not 'you'" },
          { answer: "les", feedback: "That's 'them', not 'you'" },
        ],
      },
      {
        instruction:
          "You see multiple people or objects. Which object pronoun for 'them'?",
        prompt: "them",
        hint: "Third person plural object - any gender",
        expectedAnswer: "les",
        wrongAnswers: [
          { answer: "le", feedback: "That's singular 'him/it'" },
          { answer: "la", feedback: "That's singular 'her/it'" },
        ],
      },
    ],
  },
};
