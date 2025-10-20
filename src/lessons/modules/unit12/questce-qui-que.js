/**
 * Module 154: qu'est-ce qui vs qu'est-ce que - Subject vs Object Questions
 * Unit 12 - THE CRITICAL DISCRIMINATION: What DOES something vs What DO you verb
 */

export const questceQuiQueModule = {
  title: "qu'est-ce qui vs qu'est-ce que - Master 'What' Questions",
  description:
    "THE BIGGEST distinction in French questions: qu'est-ce qui (what DOES - subject) vs qu'est-ce que (what DO you - object). Master this, ask anything!",
  unit: 12,

  concepts: [
    {
      term: "THE Critical Distinction",
      definition:
        "qu'est-ce qui = what DOES something (subject). qu'est-ce que = what DO you verb (object)",
      example:
        "Qu'est-ce qui brille? (What shines? - subject) vs Qu'est-ce que tu vois? (What do you see? - object)",
    },
    {
      term: "qu'est-ce qui - Subject Questions",
      definition:
        "Use QUI when asking WHAT is doing the action. No other subject after qui!",
      example:
        "Qu'est-ce qui brille? (What shines?), Qu'est-ce qui fait du bruit? (What makes noise?), Qu'est-ce qui rend l'herbe verte? (What makes grass green?)",
    },
    {
      term: "qu'est-ce que - Object Questions",
      definition:
        "Use QUE when asking what someone/something DOES TO something. Subject comes after que!",
      example:
        "Qu'est-ce que tu vois? (What do you see?), Qu'est-ce que tu manges? (What are you eating?), Qu'est-ce que le soleil fait? (What does the sun do?)",
    },
    {
      term: "Visual Pattern Recognition",
      definition:
        "If verb has NO object → use QUI. If verb has an object → use QUE",
      example:
        "Pattern: [qu'est-ce qui] + [VERB] OR [qu'est-ce que] + [SUBJECT] + [VERB]",
    },
    {
      term: "Transform ANY Statement into a Question",
      definition:
        "You can now ask 'what' questions about anything you've learned!",
      example:
        "Le soleil brille → Qu'est-ce qui brille? (What shines?), Je vois un oiseau → Qu'est-ce que tu vois? (What do you see?)",
    },
  ],

  vocabularyReference: [
    {
      french: "qu'est-ce qui",
      english: "what (subject)",
      note: "⭐⭐⭐ SUBJECT: what DOES something",
    },
    {
      french: "qu'est-ce que",
      english: "what (object)",
      note: "⭐⭐⭐ OBJECT: what DO you verb",
    },
    {
      french: "Qu'est-ce qui brille?",
      english: "What shines?",
      note: "SUBJECT question - thing is doing the shining",
    },
    {
      french: "Qu'est-ce qui tombe?",
      english: "What falls?",
      note: "SUBJECT question - thing is doing the falling",
    },
    {
      french: "Qu'est-ce qui fait du bruit?",
      english: "What makes noise?",
      note: "SUBJECT question - thing is making noise",
    },
    {
      french: "Qu'est-ce qui rend l'herbe verte?",
      english: "What makes grass green?",
      note: "SUBJECT question - thing is making grass green",
    },
    {
      french: "Qu'est-ce que tu vois?",
      english: "What do you see?",
      note: "OBJECT question - you are seeing WHAT",
    },
    {
      french: "Qu'est-ce que tu manges?",
      english: "What are you eating?",
      note: "OBJECT question - you are eating WHAT",
    },
    {
      french: "Qu'est-ce que les oiseaux mangent?",
      english: "What do birds eat?",
      note: "OBJECT question - birds are eating WHAT",
    },
    {
      french: "Qu'est-ce que le soleil fait?",
      english: "What does the sun do?",
      note: "OBJECT question - sun does WHAT",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Subject questions (qu'est-ce qui)
      {
        instruction: "Ask 'What shines?' (subject question)",
        prompt: "What shines?",
        hint: "qu'est-ce qui + brille (the thing shines)",
        expectedAnswer: "qu'est-ce qui brille?",
        acceptableAnswers: ["qu'est-ce qui brille", "qu'est-ce qui brille?"],
        wrongAnswers: [
          {
            answer: "qu'est-ce que brille?",
            feedback:
              "Use 'qu'est-ce QUI' when asking what DOES something (subject). 'Brille' has no object! The thing itself shines. Use QUI for subjects, QUE for objects.",
          },
          {
            answer: "qu'est-ce que brille",
            feedback:
              "Use 'qu'est-ce QUI' when asking what DOES something (subject). The thing itself is doing the shining - that's the subject!",
          },
        ],
      },
      {
        instruction: "Ask 'What falls?' (subject question)",
        prompt: "What falls?",
        hint: "qu'est-ce qui + tombe (the thing falls)",
        expectedAnswer: "qu'est-ce qui tombe?",
        acceptableAnswers: ["qu'est-ce qui tombe", "qu'est-ce qui tombe?"],
        wrongAnswers: [
          {
            answer: "qu'est-ce que tombe?",
            feedback:
              "Use 'qu'est-ce QUI' for subject questions. The thing itself is falling - it's the subject, not an object!",
          },
        ],
      },
      {
        instruction: "Ask 'What makes grass green?' (causative subject)",
        prompt: "What makes grass green?",
        hint: "qu'est-ce qui + rend l'herbe verte",
        expectedAnswer: "qu'est-ce qui rend l'herbe verte?",
        acceptableAnswers: [
          "qu'est-ce qui rend l'herbe verte",
          "qu'est-ce qui rend l'herbe verte?",
        ],
        wrongAnswers: [
          {
            answer: "qu'est-ce que rend l'herbe verte?",
            feedback:
              "Perfect causative question! But use 'qu'est-ce QUI' because the subject (what) is DOING the action of making grass green.",
          },
        ],
        explanation:
          "Perfect! 'Qu'est-ce qui fait' = What does (subject). The subject is doing the action of 'making shine'.",
      },
      {
        instruction: "Ask 'What makes noise?' (subject question)",
        prompt: "What makes noise?",
        hint: "qu'est-ce qui + fait du bruit",
        expectedAnswer: "qu'est-ce qui fait du bruit?",
        acceptableAnswers: [
          "qu'est-ce qui fait du bruit",
          "qu'est-ce qui fait du bruit?",
        ],
      },
      {
        instruction: "Ask 'What grows in spring?' (subject question)",
        prompt: "What grows in spring?",
        hint: "qu'est-ce qui + pousse au printemps",
        expectedAnswer: "qu'est-ce qui pousse au printemps?",
        acceptableAnswers: [
          "qu'est-ce qui pousse au printemps",
          "qu'est-ce qui pousse au printemps?",
        ],
      },

      // Object questions (qu'est-ce que)
      {
        instruction: "Ask 'What do you see?' (object question)",
        prompt: "What do you see?",
        hint: "qu'est-ce que + tu vois (you see WHAT)",
        expectedAnswer: "qu'est-ce que tu vois?",
        acceptableAnswers: ["qu'est-ce que tu vois", "qu'est-ce que tu vois?"],
        wrongAnswers: [
          {
            answer: "qu'est-ce qui tu vois?",
            feedback:
              "Use 'qu'est-ce QUE' when asking what you DO to something (object). You see SOMETHING. That something is the object. QUI = subject, QUE = object.",
          },
          {
            answer: "qu'est-ce qui tu vois",
            feedback:
              "Use 'qu'est-ce QUE' for object questions. You are seeing WHAT - that's the object of your seeing!",
          },
        ],
      },
      {
        instruction: "Ask 'What are you eating?' (object question)",
        prompt: "What are you eating?",
        hint: "qu'est-ce que + tu manges",
        expectedAnswer: "qu'est-ce que tu manges?",
        acceptableAnswers: [
          "qu'est-ce que tu manges",
          "qu'est-ce que tu manges?",
        ],
        wrongAnswers: [
          {
            answer: "qu'est-ce qui tu manges?",
            feedback:
              "Use 'qu'est-ce QUE' for object questions. You are eating WHAT - the food is the object!",
          },
        ],
      },
      {
        instruction: "Ask 'What do birds eat?' (object question)",
        prompt: "What do birds eat?",
        hint: "qu'est-ce que + les oiseaux mangent",
        expectedAnswer: "qu'est-ce que les oiseaux mangent?",
        acceptableAnswers: [
          "qu'est-ce que les oiseaux mangent",
          "qu'est-ce que les oiseaux mangent?",
        ],
      },
      {
        instruction: "Ask 'What does the sun do?' (object question)",
        prompt: "What does the sun do?",
        hint: "qu'est-ce que + le soleil fait",
        expectedAnswer: "qu'est-ce que le soleil fait?",
        acceptableAnswers: [
          "qu'est-ce que le soleil fait",
          "qu'est-ce que le soleil fait?",
        ],
      },
      {
        instruction: "Ask 'What do you want?' (object question)",
        prompt: "What do you want?",
        hint: "qu'est-ce que + tu veux",
        expectedAnswer: "qu'est-ce que tu veux?",
        acceptableAnswers: ["qu'est-ce que tu veux", "qu'est-ce que tu veux?"],
      },

      // Nature-specific questions
      {
        instruction: "Ask 'What shines in the sky?' (subject)",
        prompt: "What shines in the sky?",
        hint: "qu'est-ce qui + brille dans le ciel",
        expectedAnswer: "qu'est-ce qui brille dans le ciel?",
        acceptableAnswers: [
          "qu'est-ce qui brille dans le ciel",
          "qu'est-ce qui brille dans le ciel?",
        ],
      },
      {
        instruction: "Ask 'What do you see in the sky?' (object)",
        prompt: "What do you see in the sky?",
        hint: "qu'est-ce que + tu vois dans le ciel",
        expectedAnswer: "qu'est-ce que tu vois dans le ciel?",
        acceptableAnswers: [
          "qu'est-ce que tu vois dans le ciel",
          "qu'est-ce que tu vois dans le ciel?",
        ],
      },

      // Mixed discrimination practice
      {
        instruction: "Ask 'What makes the sun shine?' (subject + causative)",
        prompt: "What makes the sun shine?",
        hint: "qu'est-ce qui + fait briller le soleil",
        expectedAnswer: "qu'est-ce qui fait briller le soleil?",
        acceptableAnswers: [
          "qu'est-ce qui fait briller le soleil",
          "qu'est-ce qui fait briller le soleil?",
        ],
      },
      {
        instruction: "Ask 'What makes clouds white?' (subject + causative)",
        prompt: "What makes clouds white?",
        hint: "qu'est-ce qui + rend les nuages blancs",
        expectedAnswer: "qu'est-ce qui rend les nuages blancs?",
        acceptableAnswers: [
          "qu'est-ce qui rend les nuages blancs",
          "qu'est-ce qui rend les nuages blancs?",
        ],
      },

      // Statement → question transformations
      {
        instruction: "Transform: 'Le soleil brille' → Ask 'What shines?'",
        prompt: "What shines?",
        hint: "Statement to question: qu'est-ce qui...",
        expectedAnswer: "qu'est-ce qui brille?",
        acceptableAnswers: ["qu'est-ce qui brille", "qu'est-ce qui brille?"],
        explanation:
          "Transform any statement into a question by identifying the subject and using qu'est-ce qui!",
      },
      {
        instruction: "Transform: 'Je vois un oiseau' → Ask 'What do you see?'",
        prompt: "What do you see?",
        hint: "Statement to question: qu'est-ce que + subject + verb",
        expectedAnswer: "qu'est-ce que tu vois?",
        acceptableAnswers: ["qu'est-ce que tu vois", "qu'est-ce que tu vois?"],
        explanation:
          "Transform statements with objects by using qu'est-ce que + subject + verb!",
      },
    ],
  },

  skipStudyMode: false,
};
