/**
 * Reading Comprehension 2
 * More complex paragraph using vocabulary from modules 1-15
 * Includes: questions, ça, demonstratives, vouloir/pouvoir, prepositions, adjectives
 */

export const reading2 = {
  // id and module number are set dynamically
  title: "Reading Comprehension 2 - Conversation!",
  description:
    "A conversation between friends! See how much you've progressed since Reading 1.",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [],

  readingPassage: {
    title: "Au Café (At the Café)",
    text: `**Marie:** Bonjour! Comment ça va?

**Paul:** Ça va très bien, merci. Tu veux un bon café avec moi?

**Marie:** Oui! C'est combien pour le café?

**Paul:** Un café. Je veux un petit café avec toi. Tu es avec un ami aussi?

**Marie:** Non, mais combien de chats as-tu?

**Paul:** Moi? Je suis avec lui. Il a des vieux livres dans la grande maison. Il a des chats aussi!

**Marie:** Qu'est-ce que c'est? Ce livre est pour moi?

**Paul:** Non, ce vieux livre est pour lui. Mais tu veux ce livre aussi?

**Marie:** Non merci. Mais je veux ce petit chat! Où est le chat?

**Paul:** Le petit chat est sur la nouvelle voiture. Il est très beau. Voilà! Il est pour toi!

**Marie:** Pour moi? Combien est-ce?

**Paul:** C'est pour toi! Le chat est bon!

**Marie:** Merci! J'ai le beau chat. Au revoir!

**Paul:** Au revoir! Salut!`,
    translation: `**Marie:** Hello! How's it going?

**Paul:** It's going very well, thank you. Do you want a good coffee with me?

**Marie:** Yes! How much is it for the coffee?

**Paul:** One coffee. I want a small coffee with you. Are you with a friend too?

**Marie:** No, but how many cats do you have?

**Paul:** Me? I am with him. He has old books in the big house. He has cats too!

**Marie:** What is that? Is this book for me?

**Paul:** No, this old book is for him. But do you want this book too?

**Marie:** No thank you. But I want this small cat! Where is the cat?

**Paul:** The small cat is on the new car. It's very beautiful. There it is! It's for you!

**Marie:** For me? How much is it?

**Paul:** It's for you! The cat is good!

**Marie:** Thank you! I have the beautiful cat. Goodbye!

**Paul:** Goodbye! Bye!`,
  },

  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "What does Marie want instead of the book?",
        prompt: "Marie wants...",
        hint: "Look for 'je veux ce ___'",
        expectedAnswer: "ce petit chat",
        acceptableAnswers: ["ce chat", "le chat"],
        wrongAnswers: [
          {
            answer: "un livre",
            feedback: "She wants the cat, not the book",
          },
        ],
      },
      {
        instruction: "Where is the cat?",
        prompt: "The cat is...",
        hint: "Look for 'le petit chat est ___ la voiture'",
        expectedAnswer: "sur la nouvelle voiture",
        acceptableAnswers: ["sur la voiture"],
        wrongAnswers: [
          {
            answer: "dans la grande maison",
            feedback: "That's where the books are, not the cat",
          },
        ],
      },
      {
        instruction: "What phrase does Paul use to invite Marie for coffee?",
        prompt: "Do you want coffee ___ ___?",
        hint: "Look for 'avec ___' - which stressed pronoun?",
        expectedAnswer: "avec moi",
        wrongAnswers: [
          {
            answer: "avec toi",
            feedback:
              "Paul is inviting Marie, so he says 'with me' not 'with you'",
          },
        ],
      },
      {
        instruction: "How does Marie respond about having coffee together?",
        prompt: "Marie says she wants coffee ___ ___",
        hint: "Look for 'avec ___' in Marie's response - stressed pronoun for 'you'",
        expectedAnswer: "avec toi",
        wrongAnswers: [
          {
            answer: "avec moi",
            feedback: "Marie says 'with you' not 'with me'",
          },
          {
            answer: "avec tu",
            feedback: "Use stressed pronoun 'toi' not subject pronoun 'tu'",
          },
        ],
      },
      {
        instruction: "Who is Paul with?",
        prompt: "Paul says 'je suis avec ___'",
        hint: "Look for stressed pronoun after 'avec' - meaning 'him'",
        expectedAnswer: "lui",
        wrongAnswers: [
          {
            answer: "il",
            feedback: "Use stressed pronoun 'lui' not subject pronoun 'il'",
          },
          {
            answer: "un ami",
            feedback: "True, but what PRONOUN does he use? Look for 'avec ___'",
          },
        ],
      },
      {
        instruction: "Who is the old book for?",
        prompt: "The book is for ___",
        hint: "Look for 'pour ___' - stressed pronoun for 'him'",
        expectedAnswer: "lui",
        wrongAnswers: [
          {
            answer: "moi",
            feedback: "Marie asks if it's for her, but Paul says it's for HIM",
          },
          {
            answer: "pour moi",
            feedback: "Just the pronoun! It's for 'lui' (him)",
          },
        ],
      },
      {
        instruction: "Who does Paul say the cat is for at the end?",
        prompt: "The cat is for ___",
        hint: "Look for 'il est pour ___!' - stressed pronoun for 'you'",
        expectedAnswer: "toi",
        wrongAnswers: [
          {
            answer: "moi",
            feedback: "Paul is giving it TO Marie, so 'for you' (toi)",
          },
          {
            answer: "tu",
            feedback: "Use stressed pronoun 'toi' not subject pronoun 'tu'",
          },
        ],
      },
      {
        instruction: "What word is used when presenting the cat?",
        prompt: "Word meaning 'there it is'",
        hint: "Famous French expression of presentation",
        expectedAnswer: "voilà",
        wrongAnswers: [
          {
            answer: "ici",
            feedback: "That means location 'here', not presentation",
          },
        ],
      },
      {
        instruction:
          "What question does Marie ask about the price of the coffee?",
        prompt: "How much is it for ___?",
        hint: "Look for 'c'est combien pour ___'",
        expectedAnswer: "le café",
        acceptableAnswers: ["le café"],
        wrongAnswers: [
          {
            answer: "le chat",
            feedback: "She asks about the coffee first, not the cat",
          },
        ],
      },
      {
        instruction: "What question does Marie ask Paul about quantity?",
        prompt: "How many ___ do you have?",
        hint: "Look for 'combien de ___ as-tu?'",
        expectedAnswer: "chats",
        wrongAnswers: [
          {
            answer: "livres",
            feedback: "Paul's friend has books, Marie asks about cats",
          },
        ],
      },
      {
        instruction: "What is the final farewell used?",
        prompt: "Last word of the conversation",
        hint: "Informal goodbye",
        expectedAnswer: "salut",
        wrongAnswers: [
          {
            answer: "au revoir",
            feedback: "That comes before - what's the LAST word?",
          },
          { answer: "merci", feedback: "That's earlier in the conversation" },
        ],
      },
    ],
  },
};
