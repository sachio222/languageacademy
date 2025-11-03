/**
 * venir (to come) - COGNITIVE SCIENCE UPGRADE
 * Implements active recall, composition, and interleaved practice
 * Based on pedagogical analysis principles
 */

import { venirConjugations } from "../../vocabularyData.js";

export const venirModule = {
  moduleKey: "2024-01-26-venir", // Permanent identifier - never changes
  title: "Essential Verb - venir (to come)",
  description: "Master arrival through active recall and composition practice!",

  concepts: [
    {
      term: "venir = to come",
      definition:
        "Essential irregular verb for coming or arriving! One of the most common verbs in French. Used constantly in conversation.",
      example:
        "'I am coming' (Je viens), 'Who is coming?' (Qui vient?), 'I come from Paris' (Je viens de Paris)",
    },
    {
      term: "Irregular Conjugation Pattern",
      definition:
        "Notice the pattern: je/tu both use 'viens', then il/elle use 'vient', nous uses 'venons', and ils/elles use 'viennent' with double 'n'!",
      example:
        "je viens, tu viens, il vient, nous venons, vous venez, ils viennent",
    },
    {
      term: "Composition Power",
      definition:
        "Combine venir with previous modules for infinite expressions. For example, to say 'I want to come' you can say 'je veux venir'.",
      example: "je viens + de ça, nous venons + avec vous, ils viennent + voir",
    },
  ],

  vocabularyReference: [
    { french: "venir", english: "to come", note: "infinitive form" },
    {
      french: "je viens",
      english: "I come / I'm coming",
      note: "venir - irregular!",
    },
    {
      french: "tu viens",
      english: "you come (informal)",
      note: "same as je!",
    },
    { french: "il vient", english: "he comes", note: "different ending" },
    { french: "elle vient", english: "she comes", note: "same as il" },
    {
      french: "nous venons",
      english: "we come",
      note: "regular -ons pattern",
    },
    {
      french: "vous venez",
      english: "you come (formal)",
      note: "regular -ez pattern",
    },
    {
      french: "ils viennent",
      english: "they come (masc)",
      note: "double n!",
    },
    { french: "elles viennent", english: "they come (fem)", note: "double n!" },
  ],

  // UPGRADED: Custom exercises for sophisticated learning
  exerciseConfig: {
    type: "custom",
    items: [
      // Phase 1: Simple conjugations with known vocabulary
      {
        instruction: "Say what you do",
        prompt: "I come",
        hint: "Conjugate 'venir' in the present for 'je'.",
        expectedAnswer: "je viens",
        wrongAnswers: [
          {
            answer: "je vient",
            feedback:
              "Je takes 'viens', not 'vient'. Remember: je viens, il vient",
          },
          {
            answer: "tu viens",
            feedback: "That's 'you come', not 'I come'. Focus on the pronoun!",
          },
        ],
      },
      {
        instruction: "Say what you do",
        prompt: "you come (informal)",
        hint: "Conjugate 'venir' in the present for 'tu'.",
        expectedAnswer: "tu viens",
        wrongAnswers: [
          {
            answer: "tu vient",
            feedback:
              "Tu takes 'viens', not 'vient'. Pattern: je viens, tu viens",
          },
        ],
      },
      {
        instruction: "Say what he does",
        prompt: "he comes",
        hint: "Conjugate 'venir' in the present for 'il'.",
        expectedAnswer: "il vient",
        wrongAnswers: [
          {
            answer: "il viens",
            feedback:
              "Il takes 'vient', not 'viens'. Remember: il vient, elle vient",
          },
        ],
      },
      {
        instruction: "Say what she does",
        prompt: "she comes",
        hint: "Conjugate 'venir' in the present for 'elle'.",
        expectedAnswer: "elle vient",
        wrongAnswers: [
          {
            answer: "elle viens",
            feedback: "Elle takes 'vient', not 'viens'. Same as il vient",
          },
        ],
      },
      {
        instruction: "Say what we do",
        prompt: "we come",
        hint: "Conjugate 'venir' in the present for 'nous' (regular -ons ending).",
        expectedAnswer: "nous venons",
        wrongAnswers: [
          {
            answer: "nous viens",
            feedback: "Nous takes 'venons', not 'viens'. Completely different!",
          },
          {
            answer: "nous vient",
            feedback: "Nous takes 'venons', not 'vient'. Regular -ons pattern!",
          },
        ],
      },
      {
        instruction: "Say what you do (formal)",
        prompt: "you come (formal)",
        hint: "Conjugate 'venir' in the present for 'vous' (regular -ez ending).",
        expectedAnswer: "vous venez",
        wrongAnswers: [
          {
            answer: "vous viens",
            feedback: "Vous takes 'venez', not 'viens'. Regular -ez pattern!",
          },
          {
            answer: "vous vient",
            feedback: "Vous takes 'venez', not 'vient'. Remember: vous venez",
          },
        ],
      },
      {
        instruction: "Say what they do (masculine)",
        prompt: "they come (masculine)",
        hint: "Conjugate 'venir' in the present for 'ils' with double 'n'.",
        expectedAnswer: "ils viennent",
        wrongAnswers: [
          {
            answer: "ils viens",
            feedback: "Ils takes 'viennent', not 'viens'. Double 'n'!",
          },
          {
            answer: "ils vient",
            feedback: "Ils takes 'viennent', not 'vient'. Double 'n'!",
          },
        ],
      },
      {
        instruction: "Say what they do (feminine)",
        prompt: "they come (feminine)",
        hint: "Conjugate 'venir' in the present for 'elles' with double 'n'.",
        expectedAnswer: "elles viennent",
        wrongAnswers: [
          {
            answer: "elles viens",
            feedback: "Elles takes 'viennent', not 'viens'. Double 'n'!",
          },
          {
            answer: "elles vient",
            feedback: "Elles takes 'viennent', not 'vient'. Double 'n'!",
          },
        ],
      },

      // Phase 2: Simple compositions with ça and prepositions (from previous modules)
      {
        instruction: "Say that you are coming with that",
        prompt: "I am coming with it",
        hint: "Start with 'I come' in French, then add 'with that'.",
        expectedAnswer: "je viens avec ça",
        wrongAnswers: [
          {
            answer: "je vient avec ça",
            feedback:
              "Je takes 'viens', not 'vient'. Remember: je viens, il vient",
          },
        ],
      },
      {
        instruction: "Say where you are coming from",
        prompt: "I am coming from my house",
        hint: "Start with 'I come from' in French, then add 'my house'.",
        expectedAnswer: "je viens de chez moi",
        acceptableAnswers: ["je viens de ma maison"],
        wrongAnswers: [
          {
            answer: "je vient de chez moi",
            feedback:
              "Je takes 'viens', not 'vient'. Remember: je viens, il vient.",
          },
        ],
      },
      {
        instruction: "Say what he does with her cat",
        prompt: "He is coming with her cat",
        hint: "Start with 'he comes' in French, then add 'with her cat'.",
        expectedAnswer: "il vient avec son chat",
        wrongAnswers: [
          {
            answer: "il viens avec son chat",
            feedback:
              "Il takes 'vient', not 'viens'. Remember: il vient, elle vient",
          },
        ],
      },
      {
        instruction: "Say what we are doing",
        prompt: "We are coming with you",
        hint: "Start with 'we come' in French, then add 'with you'.",
        expectedAnswer: "nous venons avec vous",
        wrongAnswers: [
          {
            answer: "nous viens avec vous",
            feedback: "Nous takes 'venons', not 'viens'. Completely different!",
          },
        ],
      },

      // Phase 3: Composition with questions (from previous modules)
      {
        instruction: "Ask who is coming",
        prompt: "Who is coming?",
        hint: "Use 'qui' as the subject and conjugate 'venir' like 'il/elle'.",
        expectedAnswer: "qui vient?",
        acceptableAnswers: ["qui est-ce qui vient?"],
        wrongAnswers: [
          {
            answer: "quoi vient?",
            feedback: "Use 'qui' for 'who', not 'quoi'. Try: qui vient?",
          },
        ],
      },
      {
        instruction: "Ask where someone is coming from",
        prompt: "Where do you come from?",
        hint: "Use 'd'où' (from where) and conjugate 'venir' for 'tu'.",
        expectedAnswer: "d'où viens-tu?",
        acceptableAnswers: ["d'où est-ce que tu viens?"],
        wrongAnswers: [
          {
            answer: "où viens-tu?",
            feedback: "Need 'de' with 'où'! Try: d'où viens-tu?",
          },
          {
            answer: "d'où viens tu?",
            feedback:
              "In questions with inversion, you must use a hyphen: d'où viens-tu?",
          },
        ],
      },
      {
        instruction: "Ask what someone comes with",
        prompt: "What do you come with?",
        hint: "Use 'avec quoi' (with what) and conjugate 'venir' for 'tu'.",
        expectedAnswer: "avec quoi viens-tu?",
        acceptableAnswers: [
          "avec quoi est-ce que tu viens?",
          "tu viens avec quoi?",
        ],
        wrongAnswers: [
          {
            answer: "quoi viens-tu?",
            feedback: "Need 'avec'! Try: avec quoi viens-tu?",
          },
          {
            answer: "avec quoi viens tu?",
            feedback:
              "In questions with inversion, you must use a hyphen: avec quoi viens-tu?",
          },
        ],
      },

      // Phase 4: Composition with vouloir (from previous modules)
      {
        instruction: "Say what you want to come",
        prompt: "I want to come",
        hint: "Use 'vouloir' in the present for 'je' + infinitive 'venir'.",
        expectedAnswer: "je veux venir",
        wrongAnswers: [
          {
            answer: "je viens",
            feedback: "This needs vouloir! Try: je veux venir",
          },
          {
            answer: "je veux viens",
            feedback:
              "When you use two verbs together in French, the second one usually stays in the infinitive. Here: je veux venir.",
          },
        ],
      },
      {
        instruction: "Ask if someone wants to come",
        prompt: "Do you want to come?",
        hint: "Turn 'you want to come' into a yes/no question with 'tu' and 'venir'.",
        expectedAnswer: "veux-tu venir?",
        acceptableAnswers: ["est-ce que tu veux venir?"],
        wrongAnswers: [
          {
            answer: "viens-tu?",
            feedback: "This needs vouloir! Try: veux-tu venir?",
          },
          {
            answer: "veux tu venir?",
            feedback:
              "In questions with inversion, you must use a hyphen: veux-tu venir?",
          },
          {
            answer: "veux-tu viens?",
            feedback:
              "When two verbs go together, the second one stays in the infinitive. Here: veux-tu venir?",
          },
        ],
      },
      {
        instruction: "Say what you want to come with",
        prompt: "I want to come with that",
        hint: "Use 'vouloir' in the present for 'je' + infinitive 'venir' + 'with that'.",
        expectedAnswer: "je veux venir avec ça",
        wrongAnswers: [
          {
            answer: "je viens avec ça",
            feedback: "This needs vouloir! Try: je veux venir avec ça",
          },
          {
            answer: "je veux viens avec ça",
            feedback:
              "When you chain two verbs, the second verb should be in the infinitive. Here: je veux venir avec ça.",
          },
        ],
      },

      // Phase 5: Composition with pouvoir (from previous modules)
      {
        instruction: "Ask if someone can come",
        prompt: "Can you come?",
        hint: "Use 'pouvoir' in the present for 'tu' + infinitive 'venir' and make it a question.",
        expectedAnswer: "peux-tu venir?",
        acceptableAnswers: ["est-ce que tu peux venir?"],
        wrongAnswers: [
          {
            answer: "viens-tu?",
            feedback: "This needs pouvoir! Try: peux-tu venir?",
          },
          {
            answer: "peux tu venir?",
            feedback:
              "In questions with inversion, you must use a hyphen: peux-tu venir?",
          },
          {
            answer: "peux-tu viens?",
            feedback:
              "In verb + verb combinations, the second verb stays in the infinitive. Here: peux-tu venir?",
          },
        ],
      },
      {
        instruction: "Say what you can do",
        prompt: "I can come to the hotel",
        hint: "Use 'pouvoir' in the present for 'je' + infinitive 'venir' + 'to the hotel'.",
        expectedAnswer: "je peux venir à l'hôtel",
        wrongAnswers: [
          {
            answer: "je viens à l'hôtel",
            feedback: "This needs pouvoir! Try: je peux venir à l'hôtel",
          },
          {
            answer: "je peux viens à l'hôtel",
            feedback:
              "With two verbs together, keep the second one in the infinitive. Here: je peux venir à l'hôtel.",
          },
        ],
      },

      // Phase 6: Composition with voir (from previous modules)
      {
        instruction: "Say what you come to see",
        prompt: "I am coming to see you",
        hint: "Use 'venir' in the present for 'je' + infinitive 'voir' + 'you'.",
        expectedAnswer: "je viens te voir",
        acceptableAnswers: ["je viens vous voir"],
        wrongAnswers: [
          {
            answer: "je viens voir toi",
            feedback: "Use the pronoun before the verb: je viens te voir.",
          },
          {
            answer: "je viens te vois",
            feedback:
              "In verb + verb structures, the second verb is infinitive. Here: je viens te voir.",
          },
        ],
      },
      {
        instruction: "Ask why someone is coming to see you",
        prompt: "Why are you coming to see me?",
        hint: "Use 'pourquoi' to ask 'why' and 'venir' in the present for 'tu' plus 'to see me' (me voir).",
        expectedAnswer: "pourquoi viens-tu me voir?",
        wrongAnswers: [
          {
            answer: "pourquoi es-tu venu me voir?",
            feedback:
              "Use the present for 'are coming': pourquoi viens-tu me voir?",
          },
          {
            answer: "pourquoi viens tu me voir?",
            feedback:
              "In questions with inversion, you must use a hyphen: pourquoi viens-tu me voir?",
          },
        ],
      },
    ],
  },
};
