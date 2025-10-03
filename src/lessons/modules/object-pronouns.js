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
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "il ___ voit (he sees me)",
        hint: "Object pronouns go BEFORE the verb. Which pronoun means 'me'?",
        expectedAnswer: "il me voit",
        wrongAnswers: [
          { answer: "il te voit", feedback: "That's 'you', not 'me'" },
          { answer: "il le voit", feedback: "That's 'him/it', not 'me'" },
        ],
      },
      {
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "je ___ veux (I want you - informal)",
        hint: "Object pronoun for 'you' (informal) goes before 'veux'",
        expectedAnswer: "je te veux",
        wrongAnswers: [
          { answer: "je me veux", feedback: "That's 'me', not 'you'" },
          {
            answer: "je vous veux",
            feedback: "That's formal 'you', need informal 'te'",
          },
        ],
      },
      {
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "elle ___ a (she has him/it - masculine)",
        hint: "Masculine object pronoun goes before 'a'. Remember: contracts to l'!",
        expectedAnswer: "elle l'a",
        wrongAnswers: [
          {
            answer: "elle la a",
            feedback: "That's feminine. Need masculine 'le' (contracts to l'a)",
          },
          {
            answer: "elle les a",
            feedback: "That's plural 'them', not singular 'him/it'",
          },
        ],
      },
      {
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "nous ___ avons (we have her/it - feminine)",
        hint: "Feminine object pronoun goes before 'avons'. Contracts to l'!",
        expectedAnswer: "nous l'avons",
        wrongAnswers: [
          {
            answer: "nous le avons",
            feedback: "That's masculine. Need feminine 'la' (contracts to l')",
          },
          {
            answer: "nous les avons",
            feedback: "That's plural 'them', not singular 'her/it'",
          },
        ],
      },
      {
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "tu ___ vois (you see us)",
        hint: "Object pronoun for 'us' goes before 'vois'",
        expectedAnswer: "tu nous vois",
        wrongAnswers: [
          { answer: "tu vous vois", feedback: "That's 'you', not 'us'" },
          { answer: "tu les vois", feedback: "That's 'them', not 'us'" },
        ],
      },
      {
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "il ___ veut (he wants you - formal/plural)",
        hint: "Formal/plural object pronoun for 'you' goes before 'veut'",
        expectedAnswer: "il vous veut",
        wrongAnswers: [
          { answer: "il nous veut", feedback: "That's 'us', not 'you'" },
          {
            answer: "il te veut",
            feedback: "That's informal 'you', need formal 'vous'",
          },
        ],
      },
      {
        instruction: "Fill in the blank with the correct object pronoun",
        prompt: "je ___ ai (I have them)",
        hint: "Plural object pronoun 'them' goes before 'ai'",
        expectedAnswer: "je les ai",
        wrongAnswers: [
          {
            answer: "je le ai",
            feedback: "That's singular masculine 'him/it'. Need plural 'les'",
          },
          {
            answer: "je la ai",
            feedback: "That's singular feminine 'her/it'. Need plural 'les'",
          },
        ],
      },
    ],
  },
};
