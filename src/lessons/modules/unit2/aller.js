/**
 * aller (to go) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { allerConjugations } from "../../vocabularyData.js";

export const allerModule = {
  moduleKey: "2024-01-27-aller", // Permanent identifier - never changes
  title: "Essential Verb - aller (to go)",
  description:
    "Master movement through active recall and composition practice!",

  concepts: [
    {
      term: "aller = to go",
      definition:
        "Completely irregular verb - one of the most common in French!",
      example:
        "Used constantly! Essential for talking about movement and future plans",
    },
    {
      term: "Irregular Conjugation",
      definition: "Every form is different - must memorize each one!",
      example: "je vais, tu vas, il va, nous allons, vous allez, ils vont",
    },
    {
      term: "Composition Power",
      definition:
        "Combine aller with previous modules for infinite expressions",
      example: "je vais + ça, nous allons + être, ils vont + avoir",
    },
  ],

  vocabularyReference: [
    { french: "aller", english: "to go", note: "infinitive form" },
    {
      french: "je vais",
      english: "I go / I'm going",
      note: "aller - irregular!",
    },
    {
      french: "tu vas",
      english: "you go (informal)",
      note: "different from je",
    },
    { french: "il va", english: "he goes", note: "also in 'ça va'" },
    { french: "elle va", english: "she goes", note: "same as il" },
    {
      french: "nous allons",
      english: "we go",
      note: "completely different stem!",
    },
    {
      french: "vous allez",
      english: "you go (formal)",
      note: "similar to nous",
    },
    {
      french: "ils vont",
      english: "they go (masc)",
      note: "yet another form!",
    },
    { french: "elles vont", english: "they go (fem)", note: "same as ils" },
  ],

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      {
        instruction: "Say what you do",
        prompt: "I go",
        hint: "je vais",
        expectedAnswer: "je vais",
        wrongAnswers: [
          {
            answer: "je va",
            feedback: "Je takes 'vais', not 'va'. Remember: je vais, il va",
          },
          {
            answer: "tu vas",
            feedback: "That's 'you go', not 'I go'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you do",
        prompt: "you go (informal)",
        hint: "tu vas",
        expectedAnswer: "tu vas",
        wrongAnswers: [
          {
            answer: "tu vais",
            feedback: "Tu takes 'vas', not 'vais'. Pattern: je vais, tu vas",
          },
        ],
      },
      {
        instruction: "Say what he does",
        prompt: "he goes",
        hint: "il va",
        expectedAnswer: "il va",
        wrongAnswers: [
          {
            answer: "il vais",
            feedback: "Il takes 'va', not 'vais'. Remember: il va, elle va",
          },
        ],
      },
      {
        instruction: "Say what she does",
        prompt: "she goes",
        hint: "elle va",
        expectedAnswer: "elle va",
        wrongAnswers: [
          {
            answer: "elle vais",
            feedback: "Elle takes 'va', not 'vais'. Same as il va",
          },
        ],
      },
      {
        instruction: "Say what we do",
        prompt: "we go",
        hint: "nous allons",
        expectedAnswer: "nous allons",
        wrongAnswers: [
          {
            answer: "nous vais",
            feedback: "Nous takes 'allons', not 'vais'. Completely different!",
          },
          {
            answer: "nous va",
            feedback: "Nous takes 'allons', not 'va'. Completely different!",
          },
        ],
      },
      {
        instruction: "Say what you do (formal)",
        prompt: "you go (formal)",
        hint: "vous allez",
        expectedAnswer: "vous allez",
        wrongAnswers: [
          {
            answer: "vous vais",
            feedback: "Vous takes 'allez', not 'vais'. Completely different!",
          },
          {
            answer: "vous va",
            feedback: "Vous takes 'allez', not 'va'. Remember: vous allez",
          },
        ],
      },
      {
        instruction: "Say what they do (masculine)",
        prompt: "they go (masculine)",
        hint: "ils vont",
        expectedAnswer: "ils vont",
        wrongAnswers: [
          {
            answer: "ils vais",
            feedback: "Ils takes 'vont', not 'vais'. Completely irregular!",
          },
          {
            answer: "ils va",
            feedback: "Ils takes 'vont', not 'va'. Very irregular!",
          },
        ],
      },
      {
        instruction: "Say what they do (feminine)",
        prompt: "they go (feminine)",
        hint: "elles vont",
        expectedAnswer: "elles vont",
        wrongAnswers: [
          {
            answer: "elles vais",
            feedback: "Elles takes 'vont', not 'vais'. Same as ils vont",
          },
          {
            answer: "elles va",
            feedback: "Elles takes 'vont', not 'va'. Very irregular!",
          },
        ],
      },

      // Phase 2: Simple compositions with ça (from previous modules)
      {
        instruction: "Say what you do with that",
        prompt: "I go with that",
        hint: "je vais + avec ça",
        expectedAnswer: "je vais avec ça",
        wrongAnswers: [
          {
            answer: "je va avec ça",
            feedback: "Je takes 'vais', not 'va'. Remember: je vais, il va",
          },
        ],
      },
      {
        instruction: "Ask what someone does with that",
        prompt: "What do you go with?",
        hint: "qu'est-ce que tu vas avec",
        expectedAnswer: "qu'est-ce que tu vas avec?",
        wrongAnswers: [
          {
            answer: "que vas-tu avec?",
            feedback: "More common: qu'est-ce que tu vas avec?",
          },
        ],
      },
      {
        instruction: "Say what he does with that",
        prompt: "He goes with that",
        hint: "il va + avec ça",
        expectedAnswer: "il va avec ça",
        wrongAnswers: [
          {
            answer: "il vais avec ça",
            feedback: "Il takes 'va', not 'vais'. Remember: il va, elle va",
          },
        ],
      },
      {
        instruction: "Say what we do with that",
        prompt: "We go with that",
        hint: "nous allons + avec ça",
        expectedAnswer: "nous allons avec ça",
        wrongAnswers: [
          {
            answer: "nous vais avec ça",
            feedback: "Nous takes 'allons', not 'vais'. Completely different!",
          },
        ],
      },

      // Phase 3: Composition with vouloir (from previous modules)
      {
        instruction: "Ask what someone wants to go",
        prompt: "What do you want to go?",
        hint: "qu'est-ce que tu veux aller",
        expectedAnswer: "qu'est-ce que tu veux aller?",
        wrongAnswers: [
          {
            answer: "que vas-tu?",
            feedback: "This needs vouloir! Try: qu'est-ce que tu veux aller?",
          },
        ],
      },
      {
        instruction: "Say what you want to go",
        prompt: "I want to go with that",
        hint: "je veux aller + avec ça",
        expectedAnswer: "je veux aller avec ça",
        wrongAnswers: [
          {
            answer: "je vais avec ça",
            feedback: "This needs vouloir! Try: je veux aller avec ça",
          },
        ],
      },

      // Phase 4: Composition with pouvoir (from previous modules)
      {
        instruction: "Ask if someone can go",
        prompt: "Can you go?",
        hint: "peux-tu aller",
        expectedAnswer: "peux-tu aller?",
        wrongAnswers: [
          {
            answer: "vas-tu?",
            feedback: "This needs pouvoir! Try: peux-tu aller?",
          },
        ],
      },
      {
        instruction: "Say what you can go",
        prompt: "I can go with that",
        hint: "je peux aller + avec ça",
        expectedAnswer: "je peux aller avec ça",
        wrongAnswers: [
          {
            answer: "je vais avec ça",
            feedback: "This needs pouvoir! Try: je peux aller avec ça",
          },
        ],
      },

      // Phase 5: Composition with être (from previous modules)
      {
        instruction: "Say what you are going to be",
        prompt: "I am going to be good",
        hint: "je vais être + bon",
        expectedAnswer: "je vais être bon",
        wrongAnswers: [
          {
            answer: "je suis bon",
            feedback: "This needs aller! Try: je vais être bon",
          },
        ],
      },
      {
        instruction: "Ask what someone is going to be",
        prompt: "What are you going to be?",
        hint: "qu'est-ce que tu vas être",
        expectedAnswer: "qu'est-ce que tu vas être?",
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu es?",
            feedback: "This needs aller! Try: qu'est-ce que tu vas être?",
          },
        ],
      },

      // Phase 6: Composition with avoir (from previous modules)
      {
        instruction: "Say what you are going to have",
        prompt: "I am going to have that",
        hint: "je vais avoir + ça",
        expectedAnswer: "je vais avoir ça",
        wrongAnswers: [
          {
            answer: "j'ai ça",
            feedback: "This needs aller! Try: je vais avoir ça",
          },
        ],
      },
      {
        instruction: "Ask what someone is going to have",
        prompt: "What are you going to have?",
        hint: "qu'est-ce que tu vas avoir",
        expectedAnswer: "qu'est-ce que tu vas avoir?",
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu as?",
            feedback: "This needs aller! Try: qu'est-ce que tu vas avoir?",
          },
        ],
      },
    ],
  },
};
