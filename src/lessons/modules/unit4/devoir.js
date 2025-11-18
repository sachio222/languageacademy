/**
 * devoir (must / to have to) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { devoirConjugations } from "../../vocabularyData.js";

export const devoirModule = {
  moduleKey: "2024-03-23-devoir", // Permanent identifier - never changes
  title: "Essential Verb - devoir (must)",
  description:
    "Master expressing obligations through active recall and composition practice!",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express obligation and necessity (I must, you have to)",
      "Talk about responsibilities and duties",
      "Say 'I must go' or 'You have to see this' in French"
    ],
    realWorldUse: "express obligations and what you must do",
    nextModuleTeaser: "Learn parler to talk about speaking and communication"
  },

  concepts: [
    {
      term: "devoir = must / to have to",
      definition: "Express obligation, necessity, or moral duty",
      example:
        "Essential for saying 'I must...' or 'I have to...' - very common!",
    },
    {
      term: "Key Forms to Master",
      definition: "je/tu dois (same!), il/elle doit, nous devons",
      example: "Notice: je and tu have the SAME form - both 'dois'",
    },
    {
      term: "Composition Power",
      definition:
        "Combine devoir with previous modules for infinite expressions",
      example: "je dois + ça, nous devons + être, ils doivent + avoir",
    },
  ],

  vocabularyReference: [
    { french: "devoir", english: "to have to / must", note: "infinitive form" },
    { french: "je dois", english: "I must", note: "irregular form" },
    {
      french: "tu dois",
      english: "you must (informal)",
      note: "same as je!",
    },
    { french: "il doit", english: "he must", note: "different ending" },
    { french: "elle doit", english: "she must", note: "same as il" },
    { french: "nous devons", english: "we must", note: "regular ending" },
    {
      french: "vous devez",
      english: "you must (formal)",
      note: "formal/plural",
    },
    { french: "ils doivent", english: "they must (masc)", note: "irregular" },
    {
      french: "elles doivent",
      english: "they must (fem)",
      note: "same as ils",
    },
  ],

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      {
        instruction: "Say what you must do",
        prompt: "I must",
        hint: "je dois",
        expectedAnswer: "je dois",
        wrongAnswers: [
          {
            answer: "je doit",
            feedback: "Je takes 'dois', not 'doit'. Remember: je dois, il doit",
          },
          {
            answer: "tu dois",
            feedback: "That's 'you must', not 'I must'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you must do",
        prompt: "you must (informal)",
        hint: "tu dois",
        expectedAnswer: "tu dois",
        wrongAnswers: [
          {
            answer: "tu doit",
            feedback: "Tu takes 'dois', not 'doit'. Pattern: je dois, tu dois",
          },
        ],
      },
      {
        instruction: "Say what he must do",
        prompt: "he must",
        hint: "il doit",
        expectedAnswer: "il doit",
        wrongAnswers: [
          {
            answer: "il dois",
            feedback:
              "Il takes 'doit', not 'dois'. Remember: il doit, elle doit",
          },
        ],
      },
      {
        instruction: "Say what she must do",
        prompt: "she must",
        hint: "elle doit",
        expectedAnswer: "elle doit",
        wrongAnswers: [
          {
            answer: "elle dois",
            feedback: "Elle takes 'doit', not 'dois'. Same as il doit",
          },
        ],
      },
      {
        instruction: "Say what we must do",
        prompt: "we must",
        hint: "nous devons",
        expectedAnswer: "nous devons",
        wrongAnswers: [
          {
            answer: "nous dois",
            feedback: "Nous takes 'devons', not 'dois'. Regular ending!",
          },
          {
            answer: "nous doit",
            feedback: "Nous takes 'devons', not 'doit'. Completely different!",
          },
        ],
      },
      {
        instruction: "Say what you must do (formal)",
        prompt: "you must (formal)",
        hint: "vous devez",
        expectedAnswer: "vous devez",
        wrongAnswers: [
          {
            answer: "vous dois",
            feedback: "Vous takes 'devez', not 'dois'. Another unique form!",
          },
          {
            answer: "vous doit",
            feedback: "Vous takes 'devez', not 'doit'. Remember: vous devez",
          },
        ],
      },
      {
        instruction: "Say what they must do (masculine)",
        prompt: "they must (masculine)",
        hint: "ils doivent",
        expectedAnswer: "ils doivent",
        wrongAnswers: [
          {
            answer: "ils dois",
            feedback: "Ils takes 'doivent', not 'dois'. Irregular form!",
          },
          {
            answer: "ils doit",
            feedback: "Ils takes 'doivent', not 'doit'. Very irregular!",
          },
        ],
      },
      {
        instruction: "Say what they must do (feminine)",
        prompt: "they must (feminine)",
        hint: "elles doivent",
        expectedAnswer: "elles doivent",
        wrongAnswers: [
          {
            answer: "elles dois",
            feedback: "Elles takes 'doivent', not 'dois'. Same as ils doivent",
          },
          {
            answer: "elles doit",
            feedback: "Elles takes 'doivent', not 'doit'. Very irregular!",
          },
        ],
      },

      // Phase 2: Simple compositions with ça (from previous modules)
      {
        instruction: "Say what you must do with that",
        prompt: "I must do that",
        hint: "je dois faire + ça",
        expectedAnswer: "je dois faire ça",
        wrongAnswers: [
          {
            answer: "je doit faire ça",
            feedback: "Je takes 'dois', not 'doit'. Remember: je dois, il doit",
          },
        ],
      },
      {
        instruction: "Ask what someone must do with that",
        prompt: "What must you do with that?",
        hint: "qu'est-ce que tu dois faire + avec ça",
        expectedAnswer: "qu'est-ce que tu dois faire avec ça?",
        wrongAnswers: [
          {
            answer: "que dois-tu faire avec ça?",
            feedback: "More common: qu'est-ce que tu dois faire avec ça?",
          },
        ],
      },
      {
        instruction: "Say what he must do with that",
        prompt: "He must do that",
        hint: "il doit faire + ça",
        expectedAnswer: "il doit faire ça",
        wrongAnswers: [
          {
            answer: "il dois faire ça",
            feedback:
              "Il takes 'doit', not 'dois'. Remember: il doit, elle doit",
          },
        ],
      },
      {
        instruction: "Say what we must do with that",
        prompt: "We must do that",
        hint: "nous devons faire + ça",
        expectedAnswer: "nous devons faire ça",
        wrongAnswers: [
          {
            answer: "nous dois faire ça",
            feedback: "Nous takes 'devons', not 'dois'. Regular ending!",
          },
        ],
      },

      // Phase 3: Composition with aller (from previous modules)
      {
        instruction: "Say why you must go",
        prompt: "Why must you go?",
        hint: "pourquoi dois-tu aller",
        expectedAnswer: "pourquoi dois-tu aller?",
        wrongAnswers: [
          {
            answer: "pourquoi vas-tu?",
            feedback: "This needs devoir! Try: pourquoi dois-tu aller?",
          },
        ],
      },
      {
        instruction: "Say where you must go",
        prompt: "We must go to Paris",
        hint: "nous devons aller + à Paris",
        expectedAnswer: "nous devons aller à Paris",
        wrongAnswers: [
          {
            answer: "nous allons à Paris",
            feedback: "This needs devoir! Try: nous devons aller à Paris",
          },
        ],
      },

      // Phase 4: Composition with partir (from previous modules)
      {
        instruction: "Say when someone must leave",
        prompt: "He must leave now",
        hint: "il doit partir + maintenant",
        expectedAnswer: "il doit partir maintenant",
        wrongAnswers: [
          {
            answer: "il part maintenant",
            feedback: "This needs devoir! Try: il doit partir maintenant",
          },
        ],
      },
      {
        instruction: "Ask when someone must leave",
        prompt: "When must you leave?",
        hint: "quand dois-tu partir",
        expectedAnswer: "quand dois-tu partir?",
        wrongAnswers: [
          {
            answer: "quand pars-tu?",
            feedback: "This needs devoir! Try: quand dois-tu partir?",
          },
        ],
      },

      // Phase 5: Composition with avoir (from previous modules)
      {
        instruction: "Say what they must have",
        prompt: "They must have it",
        hint: "ils doivent l'avoir",
        expectedAnswer: "ils doivent l'avoir",
        wrongAnswers: [
          {
            answer: "ils l'ont",
            feedback: "This needs devoir! Try: ils doivent l'avoir",
          },
        ],
      },
      {
        instruction: "Ask what someone must have",
        prompt: "What must you have?",
        hint: "qu'est-ce que tu dois avoir",
        expectedAnswer: "qu'est-ce que tu dois avoir?",
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu as?",
            feedback: "This needs devoir! Try: qu'est-ce que tu dois avoir?",
          },
        ],
      },

      // Phase 6: Composition with être (from previous modules)
      {
        instruction: "Say what you must be",
        prompt: "I must be good",
        hint: "je dois être + bon",
        expectedAnswer: "je dois être bon",
        wrongAnswers: [
          {
            answer: "je suis bon",
            feedback: "This needs devoir! Try: je dois être bon",
          },
        ],
      },
      {
        instruction: "Ask what someone must be",
        prompt: "What must you be?",
        hint: "qu'est-ce que tu dois être",
        expectedAnswer: "qu'est-ce que tu dois être?",
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu es?",
            feedback: "This needs devoir! Try: qu'est-ce que tu dois être?",
          },
        ],
      },
    ],
  },
};
