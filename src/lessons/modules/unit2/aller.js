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
        "Completely irregular verb - one of the most common in French! Essential for talking about movement and future plans. ",
      example:
        "'I am going in the house' (Je vais dans la maison), 'I am going to eat' (Je vais manger)",
    },
    {
      term: "Irregular Conjugation",
      definition:
        "Every form is different - but it shouldn't be too hard to remember!",
      example: "je vais, tu vas, il va, nous allons, vous allez, ils vont",
    },
    {
      term: "Composition Power",
      definition:
        "Combine aller with previous modules for infinite expressions. For example, to say 'I am going to leave' you can say 'je vais partir'.",
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
        prompt: "I am going with them",
        hint: "je vais + avec eux",
        expectedAnswer: "je vais avec eux",
        acceptableAnswers: ["je vais avec eux?", "je vais avec elles?"],
        wrongAnswers: [
          {
            answer: "je va avec eux",
            feedback:
              "Je takes 'vais', not 'va'. Remember: je vais, elles vont",
          },
        ],
      },
      {
        instruction: "Ask what someone goes with",
        prompt: "What are you going with?",
        hint: "tu vas avec quoi",
        expectedAnswer: "tu vas avec quoi?",
        acceptableAnswers: ["avec quoi tu vas?", "tu vas avec quoi ?"],
        wrongAnswers: [
          {
            answer: "que vas-tu avec?",
            feedback:
              "In French you pull 'avec' up: tu vas avec quoi ? / avec quoi tu vas ?",
          },
        ],
      },
      {
        instruction: "Say that he is going with you",
        prompt: "He is going with me",
        hint: "Use 'il va' plus 'avec moi'.",
        expectedAnswer: "il va avec moi",
        wrongAnswers: [
          {
            answer: "il vais avec moi",
            feedback: "Il takes 'va', not 'vais'. Remember: il va, elle va.",
          },
        ],
      },
      {
        instruction: "Say what we are doing with transport",
        prompt: "We are going with my car",
        hint: "nous allons avec ma voiture",
        expectedAnswer: "nous allons avec ma voiture",
        wrongAnswers: [
          {
            answer: "nous vais avec ma voiture",
            feedback: "Nous takes 'allons', not 'vais'. Completely different!",
          },
        ],
      },

      // Phase 3: Composition with vouloir (from previous modules)
      {
        instruction: "Ask who someone wants to go",
        prompt: "Who do you want to go?",
        hint: "who + question maker + you + want + to go",
        expectedAnswer: "qui est-ce que tu veux aller?",
        acceptableAnswers: [
          "qui est-ce que tu veux aller?",
          "qui veux-tu aller?",
        ],
        wrongAnswers: [
          {
            answer: "que vas-tu?",
            feedback:
              "This needs vouloir and 'who'! Try: qui est-ce que tu veux aller?",
          },
        ],
      },
      {
        instruction: "Say what you want to go",
        prompt: "I want to go with her",
        hint: "je veux aller + avec elle",
        expectedAnswer: "je veux aller avec elle",
        wrongAnswers: [
          {
            answer: "je vais avec elle",
            feedback: "This needs vouloir! Try: je veux aller avec elle",
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
        acceptableAnswers: [
          "qu'est-ce que tu vas avoir?",
          "qu'est-ce que tu as?",
        ],
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
