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
    title: "Les Amis au Café (Friends at the Café)",
    text: `**Paul:** Bonjour Marie! Comment ça va?

**Marie:** Ça va bien, merci! Et toi?

**Paul:** Très bien! Tu veux un café avec moi?

**Marie:** Oui, je veux un café. Qu'est-ce que c'est, ça?

**Paul:** Ça? C'est un livre pour mon ami Pierre.

**Marie:** Ce livre est pour lui? C'est un bon livre?

**Paul:** Oui, c'est un très bon livre! Pierre a une grande maison avec beaucoup de livres.

**Marie:** Où est la maison de Pierre?

**Paul:** Elle est dans la ville. C'est une nouvelle maison. Tu peux voir la maison avec moi?

**Marie:** Oui! Je veux voir cette maison. Mais où est Pierre?

**Paul:** Il est avec les enfants. Les enfants sont au Jardin des Tuileries.

**Marie:** Il a combien d'enfants?

**Paul:** Il a deux enfants. Un grand garçon et une petite fille. Ils sont très bon!

**Marie:** Oh! J'ai un chat dans ma voiture. Les enfants peuvent voir le chat?

**Paul:** Oui! Pierre et les enfants veulent voir ton chat. Où est ta voiture?

**Marie:** Elle est là! Voilà ma voiture. Le chat est petit mais très beau.

**Paul:** Il est très beau! Et moi, j'ai un chien aussi.

**Marie:** Tu as un chien? Où est le chien?

**Paul:** Il est avec moi dans cette voiture. C'est un vieux chien, mais il est bon.

**Marie:** Bon! Nous pouvons aller chez Pierre avec les animaux!

**Paul:** Oui! Allons-y! Pierre va être très content!`,
    translation: `**Paul:** Hello Marie! How's it going?

**Marie:** It's going well, thank you! And you?

**Paul:** Very well! Do you want a coffee with me?

**Marie:** Yes, I want a coffee. What is that?

**Paul:** That? It's a book for my friend Pierre.

**Marie:** This book is for him? Is it a good book?

**Paul:** Yes, it's a very good book! Pierre has a big house with many books.

**Marie:** Where is Pierre's house?

**Paul:** It's in the city. It's a new house. Can you see the house with me?

**Marie:** Yes! I want to see this house. But where is Pierre?

**Paul:** He's with the children. The children are at the Tuileries Garden.

**Marie:** How many children does he have?

**Paul:** He has two children. A big boy and a small girl. They are very good!

**Marie:** Oh! I have a cat in my car. Can the children see the cat?

**Paul:** Yes! Pierre and the children want to see your cat. Where is your car?

**Marie:** It's there! There's my car. The cat is small but very beautiful.

**Paul:** It's very beautiful! And me, I have a dog too.

**Marie:** You have a dog? Where is the dog?

**Paul:** He's with me in this car. It's an old dog, but he's good.

**Marie:** Good! We can go to Pierre's with the animals!

**Paul:** Yes! Let's go! Pierre is going to be very happy!`,
  },

  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Complete Paul's invitation:",
        prompt: "Tu veux un café ___ ___?",
        hint: "Look for 'avec ___' - which stressed pronoun for 'me'?",
        expectedAnswer: "avec moi",
        acceptableAnswers: ["avec moi"],
        wrongAnswers: [
          {
            answer: "avec toi",
            feedback:
              "Paul is inviting Marie, so he says 'with me' not 'with you'",
          },
        ],
      },
      {
        instruction: "What is Paul's friend's name?",
        prompt: "The friend is named ___",
        hint: "Look for 'mon ami ___'",
        expectedAnswer: "Pierre",
        wrongAnswers: [
          {
            answer: "Paul",
            feedback: "Paul is talking, the friend is Pierre",
          },
          {
            answer: "Marie",
            feedback: "Marie is listening, the friend is Pierre",
          },
        ],
      },
      {
        instruction: "What does Marie ask about?",
        prompt: "___ ___ ___ c'est?",
        hint: "Look for the question phrase meaning 'what is that'",
        expectedAnswer: "qu'est-ce que",
        acceptableAnswers: ["qu'est-ce que c'est"],
        wrongAnswers: [
          {
            answer: "où est",
            feedback: "That means 'where is', not 'what is'",
          },
        ],
      },
      {
        instruction:
          "What stressed pronoun does Marie use to ask about the book?",
        prompt: "Ce livre est pour ___?",
        hint: "Stressed pronoun meaning 'him'",
        expectedAnswer: "lui",
        wrongAnswers: [
          {
            answer: "il",
            feedback: "Use stressed pronoun 'lui' not subject pronoun 'il'",
          },
          {
            answer: "moi",
            feedback: "The book is for Pierre (lui), not for Marie (moi)",
          },
        ],
      },
      {
        instruction: "Who is the book for?",
        prompt: "Ce livre est pour ___ ___",
        hint: "Look for 'pour ___ ami' - possessive adjective meaning 'my'",
        expectedAnswer: "mon ami",
        acceptableAnswers: ["son ami"],
        wrongAnswers: [
          {
            answer: "toi",
            feedback: "The book is for Paul's friend, not for Marie",
          },
        ],
      },
      {
        instruction: "Where is Pierre's house?",
        prompt: "Elle est ___ ___ ___",
        hint: "Look for 'elle est ___ la ville'",
        expectedAnswer: "dans la ville",
        wrongAnswers: [
          {
            answer: "dans le parc",
            feedback: "The children are in the park, the house is in the city",
          },
        ],
      },
      {
        instruction: "What demonstrative does Marie use for the house?",
        prompt: "Je veux voir ___ maison",
        hint: "Demonstrative for feminine singular noun",
        expectedAnswer: "cette",
        wrongAnswers: [
          {
            answer: "ce",
            feedback: "Use 'cette' for feminine nouns, 'ce' is masculine",
          },
          {
            answer: "ces",
            feedback: "Use 'cette' for singular, 'ces' is plural",
          },
        ],
      },
      {
        instruction: "Where is Pierre?",
        prompt: "Il est ___ ___ ___",
        hint: "Look for 'il est ___ les enfants'",
        expectedAnswer: "avec les enfants",
        wrongAnswers: [
          {
            answer: "dans la voiture",
            feedback: "Pierre is with the children at the garden",
          },
        ],
      },
      {
        instruction: "Where are the children?",
        prompt: "Les enfants sont ___ Jardin des Tuileries",
        hint: "Look for the preposition - contraction of à + le",
        expectedAnswer: "au",
        wrongAnswers: [
          {
            answer: "dans",
            feedback:
              "Use 'au' (à + le) for 'at the' with masculine place names",
          },
        ],
      },
      {
        instruction: "What question does Marie ask about quantity?",
        prompt: "Il a ___ d'enfants?",
        hint: "Question word for 'how many'",
        expectedAnswer: "combien",
        wrongAnswers: [
          {
            answer: "où",
            feedback: "That means 'where', not 'how many'",
          },
        ],
      },
      {
        instruction: "What can the children do?",
        prompt: "Les enfants peuvent ___ le chat",
        hint: "Look for 'peuvent ___ le chat'",
        expectedAnswer: "voir",
        wrongAnswers: [
          {
            answer: "veulent",
            feedback: "That's 'want', not what they CAN do",
          },
        ],
      },
      {
        instruction: "What possessive adjective does Paul ask about?",
        prompt: "Où est ___ voiture?",
        hint: "Possessive adjective meaning 'your' (feminine)",
        expectedAnswer: "ta",
        wrongAnswers: [
          {
            answer: "ton",
            feedback: "'voiture' is feminine, use 'ta' not 'ton'",
          },
          {
            answer: "toi",
            feedback:
              "Use possessive adjective 'ta' not stressed pronoun 'toi'",
          },
        ],
      },
      {
        instruction: "What word does Marie use to show her car?",
        prompt: "___ ma voiture!",
        hint: "Presentation expression meaning 'there is'",
        expectedAnswer: "voilà",
        wrongAnswers: [
          {
            answer: "où",
            feedback: "That's a question word, not a presentation word",
          },
        ],
      },
      {
        instruction: "What animal does Paul have?",
        prompt: "J'ai un ___ aussi",
        hint: "Look for what Paul says he has",
        expectedAnswer: "chien",
        wrongAnswers: [
          {
            answer: "chat",
            feedback: "Marie has the cat, Paul has the dog",
          },
        ],
      },
      {
        instruction: "What demonstrative does Paul use for his car?",
        prompt: "Il est avec moi dans ___ voiture",
        hint: "Demonstrative for feminine singular",
        expectedAnswer: "cette",
        wrongAnswers: [
          {
            answer: "ce",
            feedback: "'voiture' is feminine, use 'cette' not 'ce'",
          },
        ],
      },
      {
        instruction: "Where do they decide to go at the end?",
        prompt: "Nous pouvons ___ chez Pierre",
        hint: "Verb meaning 'to go'",
        expectedAnswer: "aller",
        wrongAnswers: [
          {
            answer: "voir",
            feedback: "They will GO (aller) to Pierre's, not see (voir)",
          },
        ],
      },
    ],
  },
};
