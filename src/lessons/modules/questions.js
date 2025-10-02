/**
 * Module 5: Question Words & Common Phrases
 * Essential question words and useful everyday phrases
 */

export const module6_questions = {
  // id and module number are set dynamically
  title: "Question Words - Ask Anything!",
  description:
    "The power to ask questions! How, what, where, when, who, why - unlock conversations.",

  concepts: [
    {
      term: "Question Words",
      definition:
        "Essential words that begin questions: what, who, where, when, how, why",
      example: "6 basic question words you'll use constantly",
    },
    {
      term: "Basic Question Pattern",
      definition:
        "[Question word] + verb + subject OR [Question word] + subject + verb",
      example: "Two ways to form questions in French",
    },
    {
      term: "est-ce que",
      definition:
        "Easy way to form questions: put this phrase before any statement",
      example: "Turns statements into questions - beginner-friendly method",
    },
  ],

  vocabularyReference: [
    { french: "que / quoi", english: "what", note: "most common question" },
    { french: "qui", english: "who", note: "" },
    { french: "où", english: "where", note: "with accent!" },
    { french: "quand", english: "when", note: "" },
    { french: "comment", english: "how", note: "" },
    { french: "pourquoi", english: "why", note: "" },
    {
      french: "qu'est-ce que c'est",
      english: "what is it?",
      note: "common phrase",
    },
    { french: "comment ça va", english: "how's it going?", note: "informal" },
    { french: "où est-ce", english: "where is it?", note: "" },
  ],

  // Custom exercises for question words
  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction:
          "You see an object and don't know what it is. Ask this question word",
        prompt: "what",
        hint: "Most common question word - que or quoi",
        expectedAnswer: "que",
        wrongAnswers: [
          { answer: "qui", feedback: "That means 'who', not 'what'" },
          { answer: "où", feedback: "That means 'where', not 'what'" },
        ],
      },
      {
        instruction: "Someone's at the door. Ask which person it is",
        prompt: "who",
        hint: "Used to ask about people",
        expectedAnswer: "qui",
        wrongAnswers: [
          { answer: "que", feedback: "That means 'what', not 'who'" },
          { answer: "quoi", feedback: "That means 'what', not 'who'" },
        ],
      },
      {
        instruction: "You can't find your cat. Ask about location",
        prompt: "where",
        hint: "Remember the accent: où",
        expectedAnswer: "où",
        wrongAnswers: [
          {
            answer: "ou",
            feedback: "Need accent: où, not 'ou' (which means 'or')",
          },
        ],
      },
      {
        instruction: "You want to know the time. Ask about timing",
        prompt: "when",
        hint: "Sounds like 'con' in English",
        expectedAnswer: "quand",
        wrongAnswers: [
          { answer: "comment", feedback: "That means 'how', not 'when'" },
        ],
      },
      {
        instruction: "You don't understand a process. Ask about the method",
        prompt: "how",
        hint: "Longer word, sounds like English 'comment'",
        expectedAnswer: "comment",
        wrongAnswers: [
          { answer: "quand", feedback: "That means 'when', not 'how'" },
        ],
      },
      {
        instruction: "You want to know the reason. Ask this question",
        prompt: "why",
        hint: "Compound word literally meaning 'for what'",
        expectedAnswer: "pourquoi",
        wrongAnswers: [
          { answer: "comment", feedback: "That means 'how', not 'why'" },
        ],
      },
      {
        instruction:
          "Someone shows you an object you don't recognize. Ask what it is",
        prompt: "What is it?",
        hint: "Very common phrase - check vocab table for full expression!",
        expectedAnswer: "qu'est-ce que c'est",
        wrongAnswers: [],
      },
      {
        instruction: "Greet a friend and ask how they're doing (informal)",
        prompt: "How are you?",
        hint: "Very common greeting combining 'how' + 'that/it' + 'goes'",
        expectedAnswer: "comment ça va",
        wrongAnswers: [],
      },
      {
        instruction: "You're looking for something. Ask about its location",
        prompt: "Where is it?",
        hint: "Combine 'where' + est-ce - remember the accent!",
        expectedAnswer: "où est-ce",
        wrongAnswers: [
          { answer: "ou est-ce", feedback: "Use où with an accent, not 'ou'" },
        ],
      },
    ],
  },
};
