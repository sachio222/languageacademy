/**
 * Reading Comprehension 1
 * First real French paragraph using ONLY previously learned vocabulary
 * Uses vocabulary from modules 1-8 (including connectors!)
 */

export const reading1 = {
  moduleKey: "2024-01-09-reading1", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Reading Comprehension - First Paragraph!",
  description:
    "You can READ FRENCH! This entire paragraph uses only words you've learned. Comprehension test!",

  // No vocabulary reference - this is pure comprehension
  skipStudyMode: true, // Flag to skip study mode and intro
  isReadingComprehension: true, // Flag for special handling

  concepts: [
    {
      term: "First Reading Milestone",
      definition:
        "You can now read complete French paragraphs using only foundational vocabulary",
      example:
        "Story featuring pronouns (je, tu, il, elle), être/avoir conjugations, articles (un, une, le, la, les), basic nouns (chat, chien, livre, maison), and connectors (et, mais, aussi, très)",
    },
    {
      term: "Comprehension Achievement",
      definition:
        "Demonstrates that foundational building blocks enable real French comprehension",
      example:
        "Read about friends (Paul, Marie) describing themselves, their possessions, and daily life using only Unit 1 vocabulary",
    },
    {
      term: "Functional Literacy",
      definition:
        "You've achieved basic French literacy - the foundation for all future learning",
      example:
        "Can understand simple French text, recognize sentence patterns, and follow basic conversations",
    },
  ],

  // The reading passage - uses ONLY vocabulary from modules 1-8
  readingPassage: {
    title: "Les Amis (The Friends)",
    text: `Bonjour ! Je suis Paul. Je suis un homme. J'ai un chat et un chien aussi.

Tu es Marie. Tu es une femme. Tu as une maison et une voiture. La maison est très bonne !

![img/reading1a.png]

Tu as un ami. Il a des livres. J'ai une amie aussi. Elle a des chats et des livres aussi.

Nous sommes les amis. Nous avons des enfants et des chiens. Les chiens sont très bons, mais les chats sont bons aussi.



C'est un très bon jour ! Nous sommes très bons.



Merci et au revoir !

![img/reading1d.png]`,
    translation: `Hello! I am Paul. I am a man. I have a cat and a dog too.

You are Marie. You are a woman. You have a house and a car. The house is very good!



You have a friend. He has books. I have a friend too. She has cats and books too.

We are the friends. We have children and dogs. The dogs are very good, but the cats are good too.



It's a very good day! We are very good.



Thank you and goodbye!`,
  },

  vocabularyReference: [], // No new vocabulary!

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "What is the narrator's name?",
        prompt: "Who is 'je'?",
        hint: "Second sentence - 'je suis ___'",
        expectedAnswer: "Paul",
        wrongAnswers: [
          {
            answer: "Marie",
            feedback: "That's 'tu', not 'je'",
          },
        ],
      },
      {
        instruction: "What animals does Paul have?",
        prompt: "Find the answer in the passage above",
        hint: "Look for 'j'ai un chat et...'",
        expectedAnswer: "un chat et un chien",
        acceptableAnswers: [
          "un chien et un chat",
          "chat et chien",
          "chien et chat",
          "il a un chat et un chien",
          "il a un chien et un chat",
        ],
        wrongAnswers: [
          {
            answer: "des livres",
            feedback: "That's what 'il' (he) has, not Paul",
          },
          {
            answer: "un chat",
            feedback: "Paul has more than just a cat - read further!",
          },
          {
            answer: "un chien",
            feedback: "Paul has more than just a dog - he also has a cat!",
          },
        ],
      },
      {
        instruction: "Who is 'tu' (you)?",
        prompt: "What is 'tu' called?",
        hint: "Second paragraph - 'tu es ___' (a name!)",
        expectedAnswer: "Marie",
        wrongAnswers: [{ answer: "Paul", feedback: "That's 'je', not 'tu'" }],
      },
      {
        instruction: "What does Marie have?",
        prompt: "Find the answer in the passage above",
        hint: "Look for 'tu as ___' - she has two things",
        expectedAnswer: "une maison et une voiture",
        acceptableAnswers: [
          "une maison",
          "une voiture",
          "une maison et une voiture",
          "une voiture et une maison",
          "maison et voiture",
          "voiture et maison",
          "elle a une maison et une voiture",
          "elle a une voiture et une maison",
        ],
        wrongAnswers: [],
      },
      {
        instruction: "What does Paul's male friend have?",
        prompt: "The male friend has...",
        hint: "Third paragraph - 'il a ___'",
        expectedAnswer: "des livres",
        wrongAnswers: [{ answer: "un chat", feedback: "That's what Paul has" }],
      },
      {
        instruction: "What does Paul's female friend have?",
        prompt: "Find the answer in the passage above",
        hint: "Look for 'elle a ___' - she has two things connected by 'et'",
        expectedAnswer: "des chats et des livres",
        acceptableAnswers: [
          "des chats",
          "des livres",
          "des livres et des chats",
          "chats et livres",
        ],
        wrongAnswers: [
          { answer: "une voiture", feedback: "That's what Marie has" },
        ],
      },
      {
        instruction: "What do 'nous' (we) have?",
        prompt: "Find the answer in the passage above",
        hint: "Fourth paragraph - 'nous avons ___' - we have two things",
        expectedAnswer: "des enfants et des chiens",
        acceptableAnswers: [
          "des enfants",
          "des chiens",
          "des chiens et des enfants",
          "des enfants et des chiens",
          "enfants et chiens",
          "ils ont des enfants et des chiens",
          "ils ont des chiens et des enfants",
        ],
        wrongAnswers: [
          {
            answer: "des livres",
            feedback: "That's what 'il' has",
          },
        ],
      },
      {
        instruction: "What word intensifies 'bon' in the phrase about the day?",
        prompt: "It's a ___ good day",
        hint: "Look for 'c'est un ___ bon jour'",
        expectedAnswer: "très",
        wrongAnswers: [
          {
            answer: "bon",
            feedback: "That's the adjective. What word comes BEFORE 'bon'?",
          },
        ],
      },
      {
        instruction: "Which connector word is used to contrast dogs and cats?",
        prompt: "The dogs are good, ___ the cats are good too",
        hint: "Look for the word showing contrast: 'très bon, ___ les chats'",
        expectedAnswer: "mais",
        wrongAnswers: [
          {
            answer: "et",
            feedback: "That means 'and'. Look for the word meaning 'but'",
          },
          {
            answer: "aussi",
            feedback:
              "That means 'also/too', not the connector showing contrast",
          },
        ],
      },
    ],
  },
};
