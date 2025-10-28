/**
 * faire (to do/make) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { faireConjugations } from "../../vocabularyData.js";

export const faireModule = {
  moduleKey: "2024-03-25-faire", // Permanent identifier - never changes
  title: "Essential Verb - faire (to do/make)",
  description:
    "Master the most versatile French verb through active recall and composition practice!",

  concepts: [
    {
      term: "faire = to do/make",
      definition: "Extremely versatile verb - doing actions and making things",
      example: "Used constantly in daily life - one of the top 15 words!",
    },
    {
      term: "Irregular Pattern",
      definition:
        "faire is irregular - but you've seen a pattern like this before!",
      example:
        "je fais, tu fais, il fait, elle fait, are all the same sounding, but different spellings. Nous faisons, vous faites, ils font, elles font are like the other irregular verbs you've learned. Easy!",
    },
    {
      term: "Composition Power",
      definition:
        "Combine faire with previous modules for infinite expressions",
      example: "je fais + ça, nous faisons + le travail, ils font + attention",
    },
  ],

  vocabularyReference: [
    { french: "faire", english: "to do / to make", note: "infinitive form" },
    { french: "je fais", english: "I do/make", note: "irregular form" },
    {
      french: "tu fais",
      english: "you do/make (informal)",
      note: "same as je",
    },
    { french: "il fait", english: "he does/makes", note: "different ending" },
    { french: "elle fait", english: "she does/makes", note: "same as il" },
    { french: "nous faisons", english: "we do/make", note: "unique form" },
    {
      french: "vous faites",
      english: "you do/make (formal)",
      note: "unique form",
    },
    { french: "ils font", english: "they do/make (masc)", note: "irregular" },
    {
      french: "elles font",
      english: "they do/make (fem)",
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
        prompt: "I do",
        hint: "je fais",
        expectedAnswer: "je fais",
        wrongAnswers: [
          {
            answer: "je fait",
            feedback: "Je takes 'fais', not 'fait'. Remember: je fais, il fait",
          },
          {
            answer: "tu fais",
            feedback: "That's 'you do', not 'I do'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you do",
        prompt: "you do (informal)",
        hint: "tu fais",
        expectedAnswer: "tu fais",
        wrongAnswers: [
          {
            answer: "tu fait",
            feedback: "Tu takes 'fais', not 'fait'. Pattern: je fais, tu fais",
          },
        ],
      },
      {
        instruction: "Say what he does",
        prompt: "he does",
        hint: "il fait",
        expectedAnswer: "il fait",
        wrongAnswers: [
          {
            answer: "il fais",
            feedback:
              "Il takes 'fait', not 'fais'. Remember: il fait, elle fait",
          },
        ],
      },
      {
        instruction: "Say what she does",
        prompt: "she does",
        hint: "elle fait",
        expectedAnswer: "elle fait",
        wrongAnswers: [
          {
            answer: "elle fais",
            feedback: "Elle takes 'fait', not 'fais'. Same as il fait",
          },
        ],
      },
      {
        instruction: "Say what we do",
        prompt: "we do",
        hint: "nous faisons",
        expectedAnswer: "nous faisons",
        wrongAnswers: [
          {
            answer: "nous fais",
            feedback: "Nous takes 'faisons', not 'fais'. Unique form!",
          },
          {
            answer: "nous fait",
            feedback: "Nous takes 'faisons', not 'fait'. Completely different!",
          },
        ],
      },
      {
        instruction: "Say what you do (formal)",
        prompt: "you do (formal)",
        hint: "vous faites",
        expectedAnswer: "vous faites",
        wrongAnswers: [
          {
            answer: "vous fais",
            feedback: "Vous takes 'faites', not 'fais'. Another unique form!",
          },
          {
            answer: "vous fait",
            feedback: "Vous takes 'faites', not 'fait'. Remember: vous faites",
          },
        ],
      },
      {
        instruction: "Say what they do (masculine)",
        prompt: "they do (masculine)",
        hint: "ils font",
        expectedAnswer: "ils font",
        wrongAnswers: [
          {
            answer: "ils fais",
            feedback: "Ils takes 'font', not 'fais'. Completely irregular!",
          },
          {
            answer: "ils fait",
            feedback: "Ils takes 'font', not 'fait'. Very irregular form!",
          },
        ],
      },
      {
        instruction: "Say what they do (feminine)",
        prompt: "they do (feminine)",
        hint: "elles font",
        expectedAnswer: "elles font",
        wrongAnswers: [
          {
            answer: "elles fais",
            feedback: "Elles takes 'font', not 'fais'. Same as ils font",
          },
          {
            answer: "elles fait",
            feedback: "Elles takes 'font', not 'fait'. Very irregular!",
          },
        ],
      },

      // Phase 2: Simple compositions with ça (from previous modules)
      {
        instruction: "Say what you do with that",
        prompt: "I do that",
        hint: "je fais + ça",
        expectedAnswer: "je fais ça",
        wrongAnswers: [
          {
            answer: "je fait ça",
            feedback: "Je takes 'fais', not 'fait'. Remember: je fais, il fait",
          },
        ],
      },
      {
        instruction: "Ask what someone does with that",
        prompt: "What do you do with that?",
        hint: "qu'est-ce que tu fais + avec ça",
        expectedAnswer: "qu'est-ce que tu fais avec ça?",
        wrongAnswers: [
          {
            answer: "que fais-tu avec ça?",
            feedback: "More common: qu'est-ce que tu fais avec ça?",
          },
        ],
      },
      {
        instruction: "Say what he does with that",
        prompt: "He does that",
        hint: "il fait + ça",
        expectedAnswer: "il fait ça",
        wrongAnswers: [
          {
            answer: "il fais ça",
            feedback:
              "Il takes 'fait', not 'fais'. Remember: il fait, elle fait",
          },
        ],
      },
      {
        instruction: "Say what we do with that",
        prompt: "We do that",
        hint: "nous faisons + ça",
        expectedAnswer: "nous faisons ça",
        wrongAnswers: [
          {
            answer: "nous fais ça",
            feedback: "Nous takes 'faisons', not 'fais'. Unique form!",
          },
        ],
      },

      // Phase 3: Composition with vouloir (from previous modules)
      {
        instruction: "Ask what someone wants to do",
        prompt: "What do you want to do?",
        hint: "que veux-tu faire",
        expectedAnswer: "que veux-tu faire?",
        wrongAnswers: [
          {
            answer: "que fais-tu?",
            feedback: "This needs vouloir! Try: que veux-tu faire?",
          },
        ],
      },
      {
        instruction: "Say what you want to do",
        prompt: "I want to do that",
        hint: "je veux faire + ça",
        expectedAnswer: "je veux faire ça",
        wrongAnswers: [
          {
            answer: "je fais ça",
            feedback: "This needs vouloir! Try: je veux faire ça",
          },
        ],
      },

      // Phase 4: Composition with pouvoir (from previous modules)
      {
        instruction: "Ask if someone can do something",
        prompt: "Can you do that?",
        hint: "peux-tu faire + ça",
        expectedAnswer: "peux-tu faire ça?",
        wrongAnswers: [
          {
            answer: "fais-tu ça?",
            feedback: "This needs pouvoir! Try: peux-tu faire ça?",
          },
        ],
      },
      {
        instruction: "Say what you can do",
        prompt: "I can do that",
        hint: "je peux faire + ça",
        expectedAnswer: "je peux faire ça",
        wrongAnswers: [
          {
            answer: "je fais ça",
            feedback: "This needs pouvoir! Try: je peux faire ça",
          },
        ],
      },

      // Phase 5: Composition with aller (from previous modules)
      {
        instruction: "Say what you are going to do",
        prompt: "I am going to do that",
        hint: "je vais faire + ça",
        expectedAnswer: "je vais faire ça",
        wrongAnswers: [
          {
            answer: "je fais ça",
            feedback: "This needs aller! Try: je vais faire ça",
          },
        ],
      },
      {
        instruction: "Ask what someone is going to do",
        prompt: "What are you going to do?",
        hint: "qu'est-ce que tu vas faire",
        expectedAnswer: "qu'est-ce que tu vas faire?",
        wrongAnswers: [
          {
            answer: "que fais-tu?",
            feedback: "This needs aller! Try: qu'est-ce que tu vas faire?",
          },
        ],
      },

      // Phase 6: Composition with voir (from previous modules)
      {
        instruction: "Say what you make someone see",
        prompt: "We make him see our house",
        hint: "nous lui faisons voir + notre maison",
        expectedAnswer: "nous lui faisons voir notre maison",
        wrongAnswers: [
          {
            answer: "nous lui voyons notre maison",
            feedback:
              "This needs faire! Try: nous lui faisons voir notre maison",
          },
        ],
      },
      {
        instruction: "Ask what someone makes you see",
        prompt: "What do you make me see?",
        hint: "qu'est-ce que tu me fais voir",
        expectedAnswer: "qu'est-ce que tu me fais voir?",
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu me vois?",
            feedback: "This needs faire! Try: qu'est-ce que tu me fais voir?",
          },
        ],
      },
    ],
  },
};
