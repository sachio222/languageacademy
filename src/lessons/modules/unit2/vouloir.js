/**
 * vouloir (to want) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { vouloirConjugations } from "../../vocabularyData.js";

export const vouloirModule = {
  moduleKey: "2024-01-15-vouloir", // Permanent identifier - never changes
  title: "Essential Verb - vouloir (to want)",
  description:
    "Express what you want! Master desires through active recall and composition practice!",

  concepts: [
    {
      term: "vouloir = to want",
      definition:
        "Essential irregular verb for expressing desires and polite requests! One of the most common verbs in French.",
      example:
        "'I want that' (Je veux ça), 'Do you want a book?' (Veux-tu un livre?), 'We want to have a house' (Nous voulons avoir une maison)",
    },
    {
      term: "Irregular Conjugation Pattern",
      definition:
        "Notice the pattern: je/tu both use 'veux', then il/elle use 'veut', nous uses 'voulons', and ils/elles use 'veulent'!",
      example:
        "je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent",
    },
    {
      term: "Composition Power",
      definition:
        "Combine vouloir with previous modules for infinite expressions. Use with ça, être, avoir, and nouns you've learned!",
      example:
        "je veux + ça, nous voulons + être, ils veulent + avoir + un livre",
    },
  ],

  vocabularyReference: [
    { french: "vouloir", english: "to want", note: "infinitive form" },
    { french: "je veux", english: "I want", note: "irregular form" },
    {
      french: "tu veux",
      english: "you want (informal)",
      note: "same as je!",
    },
    { french: "il veut", english: "he wants", note: "different ending" },
    { french: "elle veut", english: "she wants", note: "same as il" },
    { french: "nous voulons", english: "we want", note: "regular ending" },
    {
      french: "vous voulez",
      english: "you want (formal)",
      note: "formal/plural",
    },
    { french: "ils veulent", english: "they want (masc)", note: "irregular" },
    {
      french: "elles veulent",
      english: "they want (fem)",
      note: "same as ils",
    },
  ],

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      {
        instruction: "Say what you want",
        prompt: "I want",
        hint: "Conjugate 'vouloir' in the present for 'je'.",
        expectedAnswer: "je veux",
        wrongAnswers: [
          {
            answer: "je veut",
            feedback: "Je takes 'veux', not 'veut'. Remember: je veux, il veut",
          },
          {
            answer: "tu veux",
            feedback: "That's 'you want', not 'I want'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you want",
        prompt: "you want (informal)",
        hint: "Conjugate 'vouloir' in the present for 'tu'.",
        expectedAnswer: "tu veux",
        wrongAnswers: [
          {
            answer: "tu veut",
            feedback: "Tu takes 'veux', not 'veut'. Pattern: je veux, tu veux",
          },
        ],
      },
      {
        instruction: "Say what he wants",
        prompt: "he wants",
        hint: "Conjugate 'vouloir' in the present for 'il'.",
        expectedAnswer: "il veut",
        wrongAnswers: [
          {
            answer: "il veux",
            feedback:
              "Il takes 'veut', not 'veux'. Remember: il veut, elle veut",
          },
        ],
      },
      {
        instruction: "Say what she wants",
        prompt: "she wants",
        hint: "Conjugate 'vouloir' in the present for 'elle'.",
        expectedAnswer: "elle veut",
        wrongAnswers: [
          {
            answer: "elle veux",
            feedback: "Elle takes 'veut', not 'veux'. Same as il veut",
          },
        ],
      },
      {
        instruction: "Say what we want",
        prompt: "we want",
        hint: "Conjugate 'vouloir' in the present for 'nous' (regular -ons ending).",
        expectedAnswer: "nous voulons",
        wrongAnswers: [
          {
            answer: "nous veux",
            feedback: "Nous takes 'voulons', not 'veux'. Completely different!",
          },
          {
            answer: "nous veut",
            feedback: "Nous takes 'voulons', not 'veut'. Regular -ons pattern!",
          },
        ],
      },
      {
        instruction: "Say what you want (formal)",
        prompt: "you want (formal)",
        hint: "Conjugate 'vouloir' in the present for 'vous' (regular -ez ending).",
        expectedAnswer: "vous voulez",
        wrongAnswers: [
          {
            answer: "vous veux",
            feedback: "Vous takes 'voulez', not 'veux'. Regular -ez pattern!",
          },
          {
            answer: "vous veut",
            feedback: "Vous takes 'voulez', not 'veut'. Remember: vous voulez",
          },
        ],
      },
      {
        instruction: "Say what they want (masculine)",
        prompt: "they want (masculine)",
        hint: "Conjugate 'vouloir' in the present for 'ils'.",
        expectedAnswer: "ils veulent",
        wrongAnswers: [
          {
            answer: "ils veux",
            feedback: "Ils takes 'veulent', not 'veux'. Irregular ending!",
          },
          {
            answer: "ils veut",
            feedback: "Ils takes 'veulent', not 'veut'. Plural form!",
          },
        ],
      },
      {
        instruction: "Say what they want (feminine)",
        prompt: "they want (feminine)",
        hint: "Conjugate 'vouloir' in the present for 'elles'.",
        expectedAnswer: "elles veulent",
        wrongAnswers: [
          {
            answer: "elles veux",
            feedback: "Elles takes 'veulent', not 'veux'. Same as ils veulent",
          },
          {
            answer: "elles veut",
            feedback: "Elles takes 'veulent', not 'veut'. Plural form!",
          },
        ],
      },

      // Phase 2: Simple compositions with ça (from previous modules)
      {
        instruction: "Say that you want that",
        prompt: "I want that",
        hint: "Start with 'I want' in French, then add 'that'.",
        expectedAnswer: "je veux ça",
        wrongAnswers: [
          {
            answer: "je veut ça",
            feedback: "Je takes 'veux', not 'veut'. Remember: je veux, il veut",
          },
        ],
      },
      {
        instruction: "Say what we want",
        prompt: "We want this book",
        hint: "Start with 'we want' in French, then add 'this book'.",
        expectedAnswer: "nous voulons ce livre",
        wrongAnswers: [
          {
            answer: "nous veux ce livre",
            feedback: "Nous takes 'voulons', not 'veux'. Completely different!",
          },
        ],
      },

      // Phase 3: Composition with être (from previous modules)
      {
        instruction: "Say what you want to be",
        prompt: "I want to be a friend",
        hint: "Use 'vouloir' in the present for 'je' + infinitive 'être' + 'a friend'.",
        expectedAnswer: "je veux être un ami",
        acceptableAnswers: ["je veux être une amie"],
        wrongAnswers: [
          {
            answer: "je suis un ami",
            feedback: "This needs vouloir! Try: je veux être un ami",
          },
          {
            answer: "je veux suis un ami",
            feedback:
              "When you use two verbs together, the second one stays in the infinitive. Here: je veux être un ami.",
          },
        ],
      },

      // Phase 4: Composition with avoir (from previous modules)
      {
        instruction: "Say what you want to have",
        prompt: "I want to have a cat",
        hint: "Use 'vouloir' in the present for 'je' + infinitive 'avoir' + 'a cat'.",
        expectedAnswer: "je veux avoir un chat",
        wrongAnswers: [
          {
            answer: "j'ai un chat",
            feedback: "This needs vouloir! Try: je veux avoir un chat",
          },
          {
            answer: "je veux ai un chat",
            feedback:
              "When you chain two verbs, the second verb should be in the infinitive. Here: je veux avoir un chat.",
          },
        ],
      },
      {
        instruction: "Say what she wants to have",
        prompt: "She wants to have a house",
        hint: "Use 'vouloir' in the present for 'elle' + infinitive 'avoir' + 'a house'.",
        expectedAnswer: "elle veut avoir une maison",
        wrongAnswers: [
          {
            answer: "elle a une maison",
            feedback: "This needs vouloir! Try: elle veut avoir une maison",
          },
          {
            answer: "elle veux avoir une maison",
            feedback:
              "Elle takes 'veut', not 'veux'. Remember: elle veut, il veut.",
          },
        ],
      },

      // Phase 5: Polite requests and questions
      {
        instruction: "Make a polite request",
        prompt: "I want this, please",
        hint: "Use 'vouloir' for 'I want this' and add 'please' (s'il vous plaît).",
        expectedAnswer: "je veux ça, s'il vous plaît",
        acceptableAnswers: [
          "je veux ceci, s'il vous plaît",
          "je veux ça s'il te plaît",
          "je veux ceci s'il te plait",
        ],
        wrongAnswers: [
          {
            answer: "je veut ça, s'il vous plaît",
            feedback:
              "Je takes 'veux', not 'veut'. Remember: je veux, il veut.",
          },
        ],
      },
    ],
  },
};
