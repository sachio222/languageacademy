/**
 * Dynamic Module (ID assigned automatically based on pedagogical position): Question Words & Common Phrases
 * Essential question words and useful everyday phrases
 */

export const module6_questions = {
  moduleKey: "2024-01-18-questions", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Question Words - Ask Anything!",
  description:
    "The power to ask questions! How, what, where, when, who, why - unlock conversations.",

  concepts: [
    {
      term: "Three Ways to Ask Questions in French",
      definition:
        "French has 3 methods for asking questions. Start with the easiest!",
      example:
        "1) Est-ce que (easiest), 2) Intonation (informal), 3) Inversion (formal)",
    },
    {
      term: "Method 1: Est-ce que (Beginner-Friendly!)",
      definition:
        "Add 'est-ce que' before ANY statement to make it a question. No word order change needed!",
      example:
        "Statement: 'tu as un chat' → Question: 'est-ce que tu as un chat?' (do you have a cat?)",
    },
    {
      term: "With Question Words + Est-ce que",
      definition: "Put question word first, then 'est-ce que', then statement",
      example:
        "où est-ce que tu es? (where are you?), quand est-ce que tu as le livre? (when do you have the book?)",
    },
    {
      term: "Method 2: Rising Intonation (Spoken French)",
      definition:
        "Just say a statement with rising voice at the end - super informal!",
      example:
        "Tu as un chat? ↗ (you have a cat?), Tu es où? ↗ (you are where?)",
    },
    {
      term: "Method 3: Inversion (Formal)",
      definition:
        "Flip verb and subject, add hyphen. Used in formal/written French",
      example: "As-tu un chat? (have you a cat?), Où es-tu? (where are you?)",
    },
    {
      term: "The 7 Essential Question Words",
      definition:
        "These words unlock every question you need: what, who, where, when, how, why, how much",
      example:
        "que/quoi (what), qui (who), où (where), quand (when), comment (how), pourquoi (why), combien (how much/many)",
    },
    {
      term: "Que vs Quoi (both mean 'what')",
      definition: "'Que' starts questions, 'quoi' ends them or stands alone",
      example:
        "Que fais-tu? (what do you do?) vs Tu fais quoi? (you do what?) vs Quoi? (what?!)",
    },
    {
      term: "Common Question Phrases - Memorize These!",
      definition: "Some questions are used so often they become fixed phrases",
      example:
        "qu'est-ce que c'est? (what is it?), comment ça va? (how's it going?), ça va? (you good?), qu'est-ce que tu veux? (what do you want?), est-ce que tu peux? (can you?)",
    },
  ],

  vocabularyReference: [
    { french: "que / quoi", english: "what", note: "most common question" },
    { french: "qui", english: "who", note: "ask about people" },
    { french: "où", english: "where", note: "with accent!" },
    { french: "quand", english: "when", note: "ask about time" },
    { french: "comment", english: "how", note: "ask about method" },
    { french: "pourquoi", english: "why", note: "ask for reasons" },
    {
      french: "combien",
      english: "how much/many",
      note: "ask about quantity/price",
    },
    {
      french: "est-ce que",
      english: "question maker",
      note: "put before statement to make question",
    },
    {
      french: "qu'est-ce que c'est",
      english: "what is it?",
      note: "fixed phrase - memorize!",
    },
    {
      french: "comment ça va",
      english: "how's it going?",
      note: "informal greeting",
    },
    { french: "ça va?", english: "you good?", note: "super informal" },
    {
      french: "qu'est-ce que tu veux",
      english: "what do you want?",
      note: "essential question",
    },
    {
      french: "est-ce que tu peux",
      english: "can you?",
      note: "asking for ability/permission",
    },
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
          "You want to know the quantity or price. Ask 'how much' or 'how many'",
        prompt: "how much/many",
        hint: "Essential for shopping and counting",
        expectedAnswer: "combien",
        wrongAnswers: [
          { answer: "comment", feedback: "That means 'how', not 'how much'" },
          {
            answer: "quand",
            feedback: "That means 'when', not 'how much'",
          },
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
      {
        instruction:
          'Turn this statement into a question using est-ce que: "tu as un chat"',
        prompt: "do you have a cat?",
        hint: "Add est-ce que before the statement: est-ce que + tu as un chat",
        expectedAnswer: "est-ce que tu as un chat",
        wrongAnswers: [
          {
            answer: "tu as un chat",
            feedback: "Need to add 'est-ce que' at the beginning!",
          },
        ],
      },
      {
        instruction: 'Ask "where are you?" using où + est-ce que method',
        prompt: "where are you?",
        hint: "où + est-ce que + tu es",
        expectedAnswer: "où est-ce que tu es",
        wrongAnswers: [
          {
            answer: "où tu es",
            feedback: "Add 'est-ce que' between où and tu es",
          },
          {
            answer: "ou est-ce que tu es",
            feedback: "Use où (with accent), not 'ou' (which means 'or')",
          },
        ],
      },
      {
        instruction:
          'Ask "when do you have the book?" using quand + est-ce que',
        prompt: "when do you have the book?",
        hint: "quand + est-ce que + tu as le livre",
        expectedAnswer: "quand est-ce que tu as le livre",
        wrongAnswers: [
          {
            answer: "quand tu as le livre",
            feedback: "Add 'est-ce que' between quand and tu as",
          },
        ],
      },
      {
        instruction: 'Ask "is she a woman?" using est-ce que method',
        prompt: "is she a woman?",
        hint: "est-ce que + elle est une femme",
        expectedAnswer: "est-ce que elle est une femme",
        acceptableAnswers: ["est-ce qu'elle est une femme"],
        wrongAnswers: [
          {
            answer: "elle est une femme",
            feedback:
              "Add 'est-ce que' at the beginning to make it a question!",
          },
        ],
      },
      {
        instruction:
          'You\'re shopping and want to know the price. Ask "how much is it?" using combien',
        prompt: "how much is it?",
        hint: "combien + est-ce - a very useful shopping phrase!",
        expectedAnswer: "combien est-ce",
        acceptableAnswers: ["c'est combien"],
        wrongAnswers: [
          {
            answer: "comment est-ce",
            feedback: "Use 'combien' for quantity/price, not 'comment'",
          },
        ],
      },
      {
        instruction:
          'Ask "how many books do you have?" using combien + est-ce que',
        prompt: "how many books do you have?",
        hint: "combien + est-ce que + tu as de livres (de = of)",
        expectedAnswer: "combien est-ce que tu as de livres",
        acceptableAnswers: ["combien de livres est-ce que tu as"],
        wrongAnswers: [
          {
            answer: "comment est-ce que tu as de livres",
            feedback: "Use 'combien' for counting, not 'comment'",
          },
        ],
      },
    ],
  },
};
