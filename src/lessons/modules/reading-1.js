/**
 * Reading Comprehension 1
 * First real French paragraph using ONLY previously learned vocabulary
 * No new vocabulary - pure comprehension test!
 */

export const reading1 = {
  // id and module number are set dynamically
  title: "Reading Comprehension - First Paragraph!",
  description:
    "You can READ FRENCH! This entire paragraph uses only words you've learned. Comprehension test!",

  // No vocabulary reference - this is pure comprehension
  skipStudyMode: true, // Flag to skip study mode and intro
  isReadingComprehension: true, // Flag for special handling

  // No concepts - reading modules don't have concept screens
  concepts: [],

  // The reading passage - uses ONLY vocabulary from modules 1-7
  readingPassage: {
    title: "Les Amis (The Friends)",
    text: `Bonjour! Je suis un homme. J'ai un chat. J'ai un chien. Le chat est bon. Le chien est bon.

Tu es une femme. Tu as une maison. La maison est bon. Tu as une voiture. La voiture est bon.

Il est un ami. Il a des livres. Les livres sont bon. Elle est une amie. Elle a des chiens. Les chiens sont bon.

Nous sommes les amis. Nous avons des chats. Ils sont les chats. Vous avez des enfants. Ils sont les enfants.

Ils ont un jour. Elles ont un jour. C'est un jour. Merci. Au revoir!`,
    translation: `Hello! I am a man. I have a cat. I have a dog. The cat is good. The dog is good.

You are a woman. You have a house. The house is good. You have a car. The car is good.

He is a friend. He has books. The books are good. She is a friend. She has dogs. The dogs are good.

We are the friends. We have cats. They are the cats. You have children. They are the children.

They have a day. They have a day. It's a day. Thank you. Goodbye!`,
  },

  vocabularyReference: [], // No new vocabulary!

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Read the passage. What is the narrator?",
        prompt: "What is 'je' (I)?",
        hint: "First line - 'je suis ___'",
        expectedAnswer: "un homme",
        wrongAnswers: [
          {
            answer: "une femme",
            feedback: "Read carefully - 'je suis un homme'",
          },
        ],
      },
      {
        instruction: "What does the narrator have? (First animal)",
        prompt: "Name one animal 'je' has",
        hint: "Look for 'j'ai' (I have)",
        expectedAnswer: "un chat",
        wrongAnswers: [
          {
            answer: "des livres",
            feedback: "That's what 'il' (he) has, not 'je'",
          },
        ],
      },
      {
        instruction: "What is 'tu' (you)?",
        prompt: "What is 'you'?",
        hint: "Second paragraph - 'tu es ___'",
        expectedAnswer: "une femme",
        wrongAnswers: [
          { answer: "un homme", feedback: "That's 'je', not 'tu'" },
        ],
      },
      {
        instruction: "What does 'tu' (you) have? (First thing mentioned)",
        prompt: "What does 'you' have?",
        hint: "Look for 'tu as ___'",
        expectedAnswer: "une maison",
        wrongAnswers: [
          {
            answer: "une voiture",
            feedback: "That comes second - what's the FIRST thing?",
          },
        ],
      },
      {
        instruction: "What does 'il' (he) have?",
        prompt: "What does he have?",
        hint: "Third paragraph - 'il a ___'",
        expectedAnswer: "des livres",
        wrongAnswers: [{ answer: "un chat", feedback: "That's what 'je' has" }],
      },
      {
        instruction: "What does 'elle' (she) have?",
        prompt: "What does she have?",
        hint: "Look for 'elle a ___'",
        expectedAnswer: "des chiens",
        wrongAnswers: [
          { answer: "une voiture", feedback: "That's what 'tu' has" },
        ],
      },
      {
        instruction: "What are 'nous' (we)?",
        prompt: "What are 'we'?",
        hint: "Fourth paragraph - 'nous sommes ___'",
        expectedAnswer: "les amis",
        wrongAnswers: [
          {
            answer: "les enfants",
            feedback: "Those are what 'vous' has, not what 'nous' is",
          },
        ],
      },
      {
        instruction: "What greeting ends the passage?",
        prompt: "Last word of the passage",
        hint: "Final word - a farewell",
        expectedAnswer: "au revoir",
        wrongAnswers: [
          {
            answer: "merci",
            feedback: "That comes before - what's the LAST word?",
          },
          { answer: "bonjour", feedback: "That's at the beginning, not end" },
        ],
      },
    ],
  },
};
