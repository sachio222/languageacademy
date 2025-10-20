/**
 * qui est-ce qui vs qui est-ce que - Who Questions (Subject vs Object)
 * Unit 12 - Parallel pattern to qu'est-ce qui/que but for PEOPLE
 * Module ID: Dynamic (assigned automatically based on pedagogical position)
 */


export const quiestQuiQueModule = {
  moduleKey: "2024-03-16-quiest-qui-que", // Permanent identifier - never changes
  title: "qui est-ce qui vs qui est-ce que - Master 'Who' Questions",
  description:
    "Same pattern as WHAT questions, but for WHO! qui est-ce qui (who DOES - subject) vs qui est-ce que (who DO you - object). Transfer learning!",
  unit: 12,

  concepts: [
    {
      term: "Same Pattern as qu'est-ce qui/que!",
      definition:
        "You already know this pattern from the qu'est-ce qui module - just change WHAT to WHO!",
      example:
        "qu'est-ce qui → qui est-ce qui (what DOES → who DOES), qu'est-ce que → qui est-ce que (what DO you → who DO you)",
    },
    {
      term: "qui est-ce qui - Subject Questions",
      definition:
        "Use QUI when asking WHO is doing the action. No other subject after qui!",
      example:
        "Qui est-ce qui parle? (Who speaks?), Qui est-ce qui fait ça? (Who does that?), Qui est-ce qui nage? (Who swims?)",
    },
    {
      term: "qui est-ce que - Object Questions",
      definition:
        "Use QUE when asking who someone DOES something to. Subject comes after que!",
      example:
        "Qui est-ce que tu vois? (Who do you see?), Qui est-ce que tu aimes? (Who do you like?), Qui est-ce que je dois appeler? (Who should I call?)",
    },
    {
      term: "Transfer Learning from qu'est-ce qui Module",
      definition:
        "You mastered qu'est-ce qui/que discrimination - same rule applies here!",
      example:
        "Subject (thing doing action) → QUI. Object (thing receiving action) → QUE",
    },
  ],

  vocabularyReference: [
    {
      french: "qui est-ce qui",
      english: "who (subject)",
      note: "⭐ SUBJECT: who DOES something",
    },
    {
      french: "qui est-ce que",
      english: "who (object)",
      note: "⭐ OBJECT: who DO you verb",
    },
    {
      french: "Qui est-ce qui parle?",
      english: "Who speaks?",
      note: "SUBJECT question - person is doing the speaking",
    },
    {
      french: "Qui est-ce qui fait ça?",
      english: "Who does that?",
      note: "SUBJECT question - person is doing that",
    },
    {
      french: "Qui est-ce qui nage?",
      english: "Who swims?",
      note: "SUBJECT question - person is swimming",
    },
    {
      french: "Qui est-ce qui parle français?",
      english: "Who speaks French?",
      note: "SUBJECT question",
    },
    {
      french: "Qui est-ce que tu vois?",
      english: "Who do you see?",
      note: "OBJECT question - you are seeing WHOM",
    },
    {
      french: "Qui est-ce que tu aimes?",
      english: "Who do you like?",
      note: "OBJECT question - you are liking WHOM",
    },
    {
      french: "Qui est-ce que je dois appeler?",
      english: "Who should I call?",
      note: "OBJECT question - I should call WHOM",
    },
    {
      french: "Qui est-ce que tu connais?",
      english: "Who do you know?",
      note: "OBJECT question - you know WHOM",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Subject questions (qui est-ce qui)
      {
        instruction: "Ask 'Who speaks?' (subject question)",
        prompt: "Who speaks?",
        hint: "qui est-ce qui + parle (the person speaks)",
        expectedAnswer: "qui est-ce qui parle?",
        acceptableAnswers: ["qui est-ce qui parle", "qui est-ce qui parle?"],
        wrongAnswers: [
          {
            answer: "qui est-ce que parle?",
            feedback:
              "Use 'qui est-ce QUI' for who DOES something (subject). Same rule as qu'est-ce qui/que!",
          },
          {
            answer: "qui est-ce que parle",
            feedback:
              "Use 'qui est-ce QUI' when the person is doing the action. QUI = subject!",
          },
        ],
      },
      {
        instruction: "Ask 'Who does that?' (subject question)",
        prompt: "Who does that?",
        hint: "qui est-ce qui + fait ça",
        expectedAnswer: "qui est-ce qui fait ça?",
        acceptableAnswers: [
          "qui est-ce qui fait ça",
          "qui est-ce qui fait ça?",
        ],
      },
      {
        instruction: "Ask 'Who swims?' (subject question)",
        prompt: "Who swims?",
        hint: "qui est-ce qui + nage",
        expectedAnswer: "qui est-ce qui nage?",
        acceptableAnswers: ["qui est-ce qui nage", "qui est-ce qui nage?"],
      },
      {
        instruction: "Ask 'Who speaks French?' (subject question)",
        prompt: "Who speaks French?",
        hint: "qui est-ce qui + parle français",
        expectedAnswer: "qui est-ce qui parle français?",
        acceptableAnswers: [
          "qui est-ce qui parle français",
          "qui est-ce qui parle français?",
          "qui est-ce qui parle francais",
          "qui est-ce qui parle francais?",
        ],
      },
      {
        instruction: "Ask 'Who runs fast?' (subject question)",
        prompt: "Who runs fast?",
        hint: "qui est-ce qui + court vite",
        expectedAnswer: "qui est-ce qui court vite?",
        acceptableAnswers: [
          "qui est-ce qui court vite",
          "qui est-ce qui court vite?",
        ],
      },

      // Object questions (qui est-ce que)
      {
        instruction: "Ask 'Who do you see?' (object question)",
        prompt: "Who do you see?",
        hint: "qui est-ce que + tu vois (you see WHOM)",
        expectedAnswer: "qui est-ce que tu vois?",
        acceptableAnswers: [
          "qui est-ce que tu vois",
          "qui est-ce que tu vois?",
        ],
        wrongAnswers: [
          {
            answer: "qui est-ce qui tu vois?",
            feedback:
              "Use 'qui est-ce QUE' for who you DO something to (object). You see WHOM.",
          },
          {
            answer: "qui est-ce qui tu vois",
            feedback:
              "Use 'qui est-ce QUE' for object questions. You are seeing WHOM - that's the object!",
          },
        ],
      },
      {
        instruction: "Ask 'Who do you like?' (object question)",
        prompt: "Who do you like?",
        hint: "qui est-ce que + tu aimes",
        expectedAnswer: "qui est-ce que tu aimes?",
        acceptableAnswers: [
          "qui est-ce que tu aimes",
          "qui est-ce que tu aimes?",
        ],
      },
      {
        instruction: "Ask 'Who should I call?' (object question)",
        prompt: "Who should I call?",
        hint: "qui est-ce que + je dois appeler",
        expectedAnswer: "qui est-ce que je dois appeler?",
        acceptableAnswers: [
          "qui est-ce que je dois appeler",
          "qui est-ce que je dois appeler?",
        ],
      },
      {
        instruction: "Ask 'Who do you know?' (object question)",
        prompt: "Who do you know?",
        hint: "qui est-ce que + tu connais",
        expectedAnswer: "qui est-ce que tu connais?",
        acceptableAnswers: [
          "qui est-ce que tu connais",
          "qui est-ce que tu connais?",
        ],
      },
      {
        instruction: "Ask 'Who are you looking for?' (object question)",
        prompt: "Who are you looking for?",
        hint: "qui est-ce que + tu cherches",
        expectedAnswer: "qui est-ce que tu cherches?",
        acceptableAnswers: [
          "qui est-ce que tu cherches",
          "qui est-ce que tu cherches?",
        ],
      },

      // Mixed discrimination practice
      {
        instruction: "Ask 'Who works here?' (subject)",
        prompt: "Who works here?",
        hint: "qui est-ce qui + travaille ici",
        expectedAnswer: "qui est-ce qui travaille ici?",
        acceptableAnswers: [
          "qui est-ce qui travaille ici",
          "qui est-ce qui travaille ici?",
        ],
      },
      {
        instruction: "Ask 'Who lives in Paris?' (subject)",
        prompt: "Who lives in Paris?",
        hint: "qui est-ce qui + vit à Paris",
        expectedAnswer: "qui est-ce qui vit à Paris?",
        acceptableAnswers: [
          "qui est-ce qui vit à Paris",
          "qui est-ce qui vit à Paris?",
          "qui est-ce qui vit a Paris",
          "qui est-ce qui vit a Paris?",
        ],
      },
      {
        instruction: "Ask 'Who did you meet?' (object, past tense)",
        prompt: "Who did you meet?",
        hint: "qui est-ce que + tu as rencontré",
        expectedAnswer: "qui est-ce que tu as rencontré?",
        acceptableAnswers: [
          "qui est-ce que tu as rencontré",
          "qui est-ce que tu as rencontré?",
          "qui est-ce que tu as rencontre",
          "qui est-ce que tu as rencontre?",
        ],
      },

      // Pattern recognition review
      {
        instruction:
          "Compare: 'What does that?' vs 'Who does that?' - use QUI for both!",
        prompt: "Who does that?",
        hint: "qui est-ce qui...",
        expectedAnswer: "qui est-ce qui fait ça?",
        acceptableAnswers: [
          "qui est-ce qui fait ça",
          "qui est-ce qui fait ça?",
        ],
        explanation:
          "Both qu'est-ce qui (what) and qui est-ce qui (who) use QUI for subject questions!",
      },
      {
        instruction:
          "Compare: 'What do you see?' vs 'Who do you see?' - use QUE for both!",
        prompt: "Who do you see?",
        hint: "qui est-ce que...",
        expectedAnswer: "qui est-ce que tu vois?",
        acceptableAnswers: [
          "qui est-ce que tu vois",
          "qui est-ce que tu vois?",
        ],
        explanation:
          "Both qu'est-ce que (what) and qui est-ce que (who) use QUE for object questions!",
      },
    ],
  },

  skipStudyMode: false,
};
