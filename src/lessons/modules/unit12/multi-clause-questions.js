/**
 * Module: Dynamic ID (auto-assigned)1: Questions with Multiple Clauses - Full Complexity
 * Unit 12 - Combine questions with Unit 10 subjunctive/conditional - native-level complexity
 */

export const multiClauseQuestionsModule = {
  moduleKey: "2024-03-25-multi-clause-questions", // Permanent identifier - never changes
  title: "Multi-Clause Questions - Full Complexity",
  description:
    "Peak composition! Combine questions with subjunctive/conditional: Pourquoi est-ce que tu veux que je fasse ça? Comment est-ce que tu penses qu'on devrait faire ça?",
  unit: 12,

  concepts: [
    {
      term: "Questions + Unit 10 Structures",
      definition:
        "Combine question words with all the sophisticated structures from Unit 10",
      example:
        "Pourquoi est-ce qu'il faut que je fasse ça? (Why do I have to do that? - necessity + question)",
    },
    {
      term: "Questions + Subjunctive Phrases",
      definition:
        "Ask questions about wishes, emotions, necessity using subjunctive",
      example:
        "Comment est-ce que tu veux que je le fasse? (How do you want me to do it?)",
    },
    {
      term: "Questions + Opinion Phrases",
      definition: "Ask about what people think using penser/croire patterns",
      example:
        "Pourquoi est-ce que tu penses que c'est comme ça? (Why do you think it's like that?)",
    },
    {
      term: "Questions + Conditional",
      definition: "Ask hypothetical questions using conditional mood",
      example:
        "Qu'est-ce qui rendrait l'herbe plus verte? (What would make grass greener?)",
    },
    {
      term: "Native-Level Complexity",
      definition:
        "These questions demonstrate complete mastery of French question formation",
      example:
        "Can ask ANY question about ANY thought - you've reached full competency!",
    },
  ],

  vocabularyReference: [
    // Questions + necessity
    {
      french: "Pourquoi est-ce qu'il faut que je fasse ça?",
      english: "Why do I have to do that?",
      note: "question + necessity + subjunctive",
    },
    {
      french: "Pourquoi est-ce qu'il faut que tu partes?",
      english: "Why do you have to leave?",
      note: "question + necessity + subjunctive",
    },

    // Questions + wishes
    {
      french: "Pourquoi est-ce que tu veux que je fasse ça?",
      english: "Why do you want me to do that?",
      note: "question + wish + subjunctive",
    },
    {
      french: "Comment est-ce que tu veux que je le fasse?",
      english: "How do you want me to do it?",
      note: "question + wish + subjunctive",
    },

    // Questions + opinions
    {
      french: "Pourquoi est-ce que tu penses que c'est comme ça?",
      english: "Why do you think it's like that?",
      note: "question + opinion",
    },
    {
      french: "Comment est-ce que tu penses qu'on devrait faire ça?",
      english: "How do you think we should do that?",
      note: "question + opinion + conditional",
    },

    // Questions + conditional (hypothetical)
    {
      french: "Qu'est-ce qui rendrait l'herbe plus verte?",
      english: "What would make grass greener?",
      note: "question + conditional causative",
    },
    {
      french: "Pourquoi est-ce que tu ferais ça?",
      english: "Why would you do that?",
      note: "question + conditional",
    },

    // Questions + negative + process
    {
      french: "Pourquoi est-ce que ça ne marche pas?",
      english: "Why doesn't it work?",
      note: "question + negative + process",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Questions + necessity (il faut que)
      {
        instruction: "Ask 'Why do I have to do that?'",
        prompt: "Why do I have to do that?",
        hint: "pourquoi est-ce que + il faut que je fasse ça",
        expectedAnswer: "pourquoi est-ce qu'il faut que je fasse ça?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il faut que je fasse ça",
          "pourquoi est-ce qu'il faut que je fasse ça?",
        ],
        explanation: "Combining question with Unit 10 necessity phrase!",
      },
      {
        instruction: "Ask 'Why do you have to leave?'",
        prompt: "Why do you have to leave?",
        hint: "pourquoi est-ce que + il faut que tu partes",
        expectedAnswer: "pourquoi est-ce qu'il faut que tu partes?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il faut que tu partes",
          "pourquoi est-ce qu'il faut que tu partes?",
        ],
      },

      // Questions + wishes (je veux que)
      {
        instruction: "Ask 'Why do you want me to do that?'",
        prompt: "Why do you want me to do that?",
        hint: "pourquoi est-ce que + tu veux que je fasse ça",
        expectedAnswer: "pourquoi est-ce que tu veux que je fasse ça?",
        acceptableAnswers: [
          "pourquoi est-ce que tu veux que je fasse ça",
          "pourquoi est-ce que tu veux que je fasse ça?",
        ],
      },
      {
        instruction: "Ask 'How do you want me to do it?'",
        prompt: "How do you want me to do it?",
        hint: "comment est-ce que + tu veux que je le fasse",
        expectedAnswer: "comment est-ce que tu veux que je le fasse?",
        acceptableAnswers: [
          "comment est-ce que tu veux que je le fasse",
          "comment est-ce que tu veux que je le fasse?",
        ],
      },
      {
        instruction: "Ask 'Why do you want him to come?'",
        prompt: "Why do you want him to come?",
        hint: "pourquoi est-ce que + tu veux qu'il vienne",
        expectedAnswer: "pourquoi est-ce que tu veux qu'il vienne?",
        acceptableAnswers: [
          "pourquoi est-ce que tu veux qu'il vienne",
          "pourquoi est-ce que tu veux qu'il vienne?",
        ],
      },

      // Questions + opinions (je pense que)
      {
        instruction: "Ask 'Why do you think it's like that?'",
        prompt: "Why do you think it's like that?",
        hint: "pourquoi est-ce que + tu penses que c'est comme ça",
        expectedAnswer: "pourquoi est-ce que tu penses que c'est comme ça?",
        acceptableAnswers: [
          "pourquoi est-ce que tu penses que c'est comme ça",
          "pourquoi est-ce que tu penses que c'est comme ça?",
        ],
      },
      {
        instruction: "Ask 'How do you think we should do that?'",
        prompt: "How do you think we should do that?",
        hint: "comment est-ce que + tu penses qu'on devrait faire ça",
        expectedAnswer: "comment est-ce que tu penses qu'on devrait faire ça?",
        acceptableAnswers: [
          "comment est-ce que tu penses qu'on devrait faire ça",
          "comment est-ce que tu penses qu'on devrait faire ça?",
        ],
      },
      {
        instruction: "Ask 'What do you think he should do?'",
        prompt: "What do you think he should do?",
        hint: "qu'est-ce que + tu penses qu'il devrait faire",
        expectedAnswer: "qu'est-ce que tu penses qu'il devrait faire?",
        acceptableAnswers: [
          "qu'est-ce que tu penses qu'il devrait faire",
          "qu'est-ce que tu penses qu'il devrait faire?",
        ],
      },

      // Questions + conditional (hypothetical)
      {
        instruction: "Ask 'What would make grass greener?'",
        prompt: "What would make grass greener?",
        hint: "qu'est-ce qui + rendrait l'herbe plus verte",
        expectedAnswer: "qu'est-ce qui rendrait l'herbe plus verte?",
        acceptableAnswers: [
          "qu'est-ce qui rendrait l'herbe plus verte",
          "qu'est-ce qui rendrait l'herbe plus verte?",
        ],
        explanation:
          "Conditional causative question - hypothetical 'would make'",
      },
      {
        instruction: "Ask 'Why would you do that?'",
        prompt: "Why would you do that?",
        hint: "pourquoi est-ce que + tu ferais ça (conditional!)",
        expectedAnswer: "pourquoi est-ce que tu ferais ça?",
        acceptableAnswers: [
          "pourquoi est-ce que tu ferais ça",
          "pourquoi est-ce que tu ferais ça?",
        ],
      },

      // Questions + negative
      {
        instruction: "Ask 'Why doesn't it work?'",
        prompt: "Why doesn't it work?",
        hint: "pourquoi est-ce que + ça ne marche pas",
        expectedAnswer: "pourquoi est-ce que ça ne marche pas?",
        acceptableAnswers: [
          "pourquoi est-ce que ça ne marche pas",
          "pourquoi est-ce que ça ne marche pas?",
        ],
      },
      {
        instruction: "Ask 'Why doesn't he want to come?'",
        prompt: "Why doesn't he want to come?",
        hint: "pourquoi est-ce que + il ne veut pas venir",
        expectedAnswer: "pourquoi est-ce qu'il ne veut pas venir?",
        acceptableAnswers: [
          "pourquoi est-ce qu'il ne veut pas venir",
          "pourquoi est-ce qu'il ne veut pas venir?",
        ],
      },

      // Complex emotions + questions
      {
        instruction: "Ask 'Why are you happy that he's here?'",
        prompt: "Why are you happy that he's here?",
        hint: "pourquoi est-ce que + tu es content qu'il soit là",
        expectedAnswer: "pourquoi est-ce que tu es content qu'il soit là?",
        acceptableAnswers: [
          "pourquoi est-ce que tu es content qu'il soit là",
          "pourquoi est-ce que tu es content qu'il soit là?",
          "pourquoi est-ce que tu es content qu'il soit la",
          "pourquoi est-ce que tu es content qu'il soit la?",
        ],
      },

      // Maximum complexity
      {
        instruction: "Ask 'How do you think we could make it work?'",
        prompt: "How do you think we could make it work?",
        hint: "comment est-ce que + tu penses qu'on pourrait le faire marcher",
        expectedAnswer:
          "comment est-ce que tu penses qu'on pourrait le faire marcher?",
        acceptableAnswers: [
          "comment est-ce que tu penses qu'on pourrait le faire marcher",
          "comment est-ce que tu penses qu'on pourrait le faire marcher?",
        ],
        explanation:
          "Peak complexity! Question + opinion + conditional + causative - you've mastered it all!",
      },
    ],
  },

  skipStudyMode: false,
};
