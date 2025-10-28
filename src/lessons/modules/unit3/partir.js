/**
 * partir (to leave) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { partirConjugations } from "../../vocabularyData.js";

export const partirModule = {
  moduleKey: "2024-01-29-partir", // Permanent identifier - never changes
  title: "Essential Verb - partir (to leave)",
  description:
    "Master departures through active recall and composition practice!",

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
      term: "Composition Power",
      definition:
        "Combine partir with previous modules for infinite expressions",
      example: "je pars + ça, nous partons + être, ils partent + avoir",
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

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      {
        instruction: "Say what you do",
        prompt: "I leave",
        hint: "je pars",
        expectedAnswer: "je pars",
        wrongAnswers: [
          {
            answer: "je part",
            feedback: "Je takes 'pars', not 'part'. Remember: je pars, il part",
          },
          {
            answer: "tu pars",
            feedback:
              "That's 'you leave', not 'I leave'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you do",
        prompt: "you leave (informal)",
        hint: "tu pars",
        expectedAnswer: "tu pars",
        wrongAnswers: [
          {
            answer: "tu part",
            feedback: "Tu takes 'pars', not 'part'. Pattern: je pars, tu pars",
          },
        ],
      },
      {
        instruction: "Say what he does",
        prompt: "he leaves",
        hint: "il part",
        expectedAnswer: "il part",
        wrongAnswers: [
          {
            answer: "il pars",
            feedback:
              "Il takes 'part', not 'pars'. Remember: il part, elle part",
          },
        ],
      },
      {
        instruction: "Say what she does",
        prompt: "she leaves",
        hint: "elle part",
        expectedAnswer: "elle part",
        wrongAnswers: [
          {
            answer: "elle pars",
            feedback: "Elle takes 'part', not 'pars'. Same as il part",
          },
        ],
      },
      {
        instruction: "Say what we do",
        prompt: "we leave",
        hint: "nous partons",
        expectedAnswer: "nous partons",
        wrongAnswers: [
          {
            answer: "nous pars",
            feedback: "Nous takes 'partons', not 'pars'. Regular ending!",
          },
          {
            answer: "nous part",
            feedback: "Nous takes 'partons', not 'part'. Completely different!",
          },
        ],
      },
      {
        instruction: "Say what you do (formal)",
        prompt: "you leave (formal)",
        hint: "vous partez",
        expectedAnswer: "vous partez",
        wrongAnswers: [
          {
            answer: "vous pars",
            feedback: "Vous takes 'partez', not 'pars'. Regular ending!",
          },
          {
            answer: "vous part",
            feedback: "Vous takes 'partez', not 'part'. Remember: vous partez",
          },
        ],
      },
      {
        instruction: "Say what they do (masculine)",
        prompt: "they leave (masculine)",
        hint: "ils partent",
        expectedAnswer: "ils partent",
        wrongAnswers: [
          {
            answer: "ils pars",
            feedback: "Ils takes 'partent', not 'pars'. Regular ending!",
          },
          {
            answer: "ils part",
            feedback: "Ils takes 'partent', not 'part'. Regular ending!",
          },
        ],
      },
      {
        instruction: "Say what they do (feminine)",
        prompt: "they leave (feminine)",
        hint: "elles partent",
        expectedAnswer: "elles partent",
        wrongAnswers: [
          {
            answer: "elles pars",
            feedback: "Elles takes 'partent', not 'pars'. Same as ils partent",
          },
          {
            answer: "elles part",
            feedback: "Elles takes 'partent', not 'part'. Regular ending!",
          },
        ],
      },

      // Phase 2: Simple compositions with ça (from previous modules)
      {
        instruction: "Say what you do with that",
        prompt: "I leave that",
        hint: "je pars + de ça",
        expectedAnswer: "je pars de ça",
        wrongAnswers: [
          {
            answer: "je part de ça",
            feedback: "Je takes 'pars', not 'part'. Remember: je pars, il part",
          },
        ],
      },
      {
        instruction: "Ask what someone does with that",
        prompt: "What do you leave?",
        hint: "qu'est-ce que tu pars",
        expectedAnswer: "qu'est-ce que tu pars?",
        wrongAnswers: [
          {
            answer: "que pars-tu?",
            feedback: "More common: qu'est-ce que tu pars?",
          },
        ],
      },
      {
        instruction: "Say what he does with that",
        prompt: "He leaves that",
        hint: "il part + de ça",
        expectedAnswer: "il part de ça",
        wrongAnswers: [
          {
            answer: "il pars de ça",
            feedback:
              "Il takes 'part', not 'pars'. Remember: il part, elle part",
          },
        ],
      },
      {
        instruction: "Say what we do with that",
        prompt: "We leave that",
        hint: "nous partons + de ça",
        expectedAnswer: "nous partons de ça",
        wrongAnswers: [
          {
            answer: "nous pars de ça",
            feedback: "Nous takes 'partons', not 'pars'. Regular ending!",
          },
        ],
      },

      // Phase 3: Composition with vouloir (from previous modules)
      {
        instruction: "Ask what someone wants to leave",
        prompt: "What do you want to leave?",
        hint: "qu'est-ce que tu veux partir",
        expectedAnswer: "qu'est-ce que tu veux partir?",
        wrongAnswers: [
          {
            answer: "que veux-tu partir?",
            feedback: "More common: qu'est-ce que tu veux partir?",
          },
        ],
      },
      {
        instruction: "Say what you want to leave",
        prompt: "I want to leave that",
        hint: "je veux partir + de ça",
        expectedAnswer: "je veux partir de ça",
        wrongAnswers: [
          {
            answer: "je pars de ça",
            feedback: "This needs vouloir! Try: je veux partir de ça",
          },
        ],
      },

      // Phase 4: Composition with pouvoir (from previous modules)
      {
        instruction: "Ask if someone can leave",
        prompt: "Can you leave?",
        hint: "peux-tu partir",
        expectedAnswer: "peux-tu partir?",
        wrongAnswers: [
          {
            answer: "pars-tu?",
            feedback: "This needs pouvoir! Try: peux-tu partir?",
          },
        ],
      },
      {
        instruction: "Say what you can leave",
        prompt: "I can leave that",
        hint: "je peux partir + de ça",
        expectedAnswer: "je peux partir de ça",
        wrongAnswers: [
          {
            answer: "je pars de ça",
            feedback: "This needs pouvoir! Try: je peux partir de ça",
          },
        ],
      },

      // Phase 5: Composition with aller (from previous modules)
      {
        instruction: "Say what you are going to leave",
        prompt: "I am going to leave that",
        hint: "je vais partir + de ça",
        expectedAnswer: "je vais partir de ça",
        wrongAnswers: [
          {
            answer: "je pars de ça",
            feedback: "This needs aller! Try: je vais partir de ça",
          },
        ],
      },
      {
        instruction: "Ask what someone is going to leave",
        prompt: "What are you going to leave?",
        hint: "qu'est-ce que tu vas partir",
        expectedAnswer: "qu'est-ce que tu vas partir?",
        wrongAnswers: [
          {
            answer: "que pars-tu?",
            feedback: "This needs aller! Try: qu'est-ce que tu vas partir?",
          },
        ],
      },

      // Phase 6: Composition with venir (from previous modules)
      {
        instruction: "Say what you come to leave",
        prompt: "I come to leave that",
        hint: "je viens partir + de ça",
        expectedAnswer: "je viens partir de ça",
        wrongAnswers: [
          {
            answer: "je pars de ça",
            feedback: "This needs venir! Try: je viens partir de ça",
          },
        ],
      },
      {
        instruction: "Ask why someone comes to leave",
        prompt: "Why do you come to leave?",
        hint: "pourquoi viens-tu partir",
        expectedAnswer: "pourquoi viens-tu partir?",
        wrongAnswers: [
          {
            answer: "pourquoi pars-tu?",
            feedback: "This needs venir! Try: pourquoi viens-tu partir?",
          },
        ],
      },
    ],
  },
};
