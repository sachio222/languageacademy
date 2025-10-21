/**
 * Reading Comprehension 3
 * Advanced paragraph using Unit 3 vocabulary
 * Includes: motion verbs, object pronouns, possessives, contractions
 */

export const reading3 = {
  moduleKey: "2024-02-03-reading3", // Permanent identifier - never changes
  title: "Reading Comprehension 3 - La Première Page",
  description:
    "See how much you've mastered! Motion, possession, and complex pronouns in action.",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [
    {
      term: "Advanced Reading Milestone",
      definition:
        "You can now read complex French stories that combine all previous units with advanced structures",
      example:
        "Story featuring contractions (au, du), motion verbs (venir, aller, partir), object pronouns (le, la, les, me, te), and possessive forms (mon, ma, mes, ton, ta)",
    },
    {
      term: "Natural French Flow",
      definition:
        "Experience how contractions and pronouns create the natural rhythm of spoken French",
      example:
        "au café, du livre, je viens avec toi, tu le vois, c'est mon ami - authentic French conversation patterns",
    },
    {
      term: "Complex Relationships",
      definition:
        "Learn to express sophisticated relationships between people, places, and objects",
      example:
        "Marc and Sophie's friendship, their shared experiences, possessions, and movements through Paris",
    },
  ],

  readingPassage: {
    title: "La Première Page (The First Page)",
    text: `*Paris, 1871, Belle Époque*

**Sophie:** Bonjour Marc ! Tu viens au Café de la Paix avec moi ?

**Marc:** Oui ! Je vais au café avec toi. Tu as *Le Comte de Monte-Cristo* ? C'est le livre rouge et jaune.

![img/reading3-they-meet-on-the-street.jpg|maxWidth:65%]

**Sophie:** Oui, je l'ai. Il est très vieux ! C'est le tien ?

**Marc:** Oui, c'est le mien. Tu le veux ?

**Sophie:** Non, merci ! J'ai mon livre de Jules Verne, *Vingt mille lieues sous les mers*. Il est nouveau. Tu veux le voir ?

**Marc:** Oui, s'il te plaît, au café.

**Sophie:** Où est ton ami Paul ? Il vient aussi ?

**Marc:** Non, il part à Montmartre. Il a son jeune enfant aujourd'hui et il le voit à la maison.

**Sophie:** C'est bon. Tu as ses livres avec toi aussi ?

**Marc:** Oui, ils sont dans ma voiture. Et j'ai un nouveau bon livre pour toi aussi !

![img/reading3-in-front-of-his-voiture.jpg|maxWidth:65%]

**Sophie:** Oh ! Pour moi ? Merci ! Allons au café !

**Marc:** Je veux un bon café avec toi.

**Sophie:** Oui ! Moi aussi !

![img/reading3-at-the-cafe.jpg|maxWidth:65%]`,
    translation: `*Paris, 1871, Belle Époque*

**Sophie:** Hello Marc! Are you coming to Café de la Paix with me?

**Marc:** Yes! I'm going to the café with you. Do you have the Count of Monte Cristo? It's the red and yellow book.

**Sophie:** Yes, I have it. It's very old! Is it yours?

**Marc:** Yes, it's mine. Do you want it?

**Sophie:** No, thank you! I have my Jules Verne book. Twenty Thousand Leagues Under the Sea. It's new, do you want to see it?

**Marc:** Yes, please, at the café.

**Sophie:** Where is your friend Paul? Is he coming too?

**Marc:** No, he's leaving for Montmartre. He has his young child today and he sees him at home.

**Sophie:** That's good. Do you have his books with you also?

**Marc:** Yes, they're in my car. And I have a new good book for you too!

**Sophie:** Oh! For me? Thank you! Let's go to the café!

**Marc:** I want a good coffee with you.

**Sophie:** Yes! I want a good coffee with you!`,
  },

  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Where does Sophie invite Marc?",
        prompt: "Sophie invites Marc to ___ ___ ___ ___",
        hint: "Look for 'tu viens au ___' - what's the full café name?",
        expectedAnswer: "Café de la Paix",
        acceptableAnswers: ["café", "au café", "au Café de la Paix"],
        wrongAnswers: [
          {
            answer: "à la maison",
            feedback: "She invites him to the café, not the house",
          },
          {
            answer: "Montmartre",
            feedback: "That's where Paul goes, not where Sophie invites Marc",
          },
        ],
      },
      {
        instruction: "What stressed pronoun does Sophie use with 'avec'?",
        prompt: "with ___",
        hint: "Look for 'avec ___' - stressed pronoun for 'me'",
        expectedAnswer: "moi",
        acceptableAnswers: ["avec moi"],
        wrongAnswers: [
          {
            answer: "je",
            feedback: "Use stressed pronoun 'moi' not subject pronoun 'je'",
          },
        ],
      },
      {
        instruction: "What book does Marc ask Sophie about?",
        prompt: "Tu as ___ ___ ___ ___-___?",
        hint: "Look for the book title Marc mentions",
        expectedAnswer: "Le Comte de Monte-Cristo",
        acceptableAnswers: ["Comte de Monte-Cristo", "Monte-Cristo"],
        wrongAnswers: [
          {
            answer: "Jules Verne",
            feedback: "That's Sophie's book, not the one Marc asks about",
          },
          {
            answer: "Vingt mille lieues",
            feedback: "That's Sophie's book, not the one Marc asks about",
          },
        ],
      },
      {
        instruction: "How does Sophie ask if the book belongs to Marc?",
        prompt: "Is it ___? (yours, informal, masculine thing)",
        hint: "c'est + possessive pronoun for 'yours' informal",
        expectedAnswer: "c'est le tien",
        acceptableAnswers: ["le tien", "oui", "c'est le tien?"],
        wrongAnswers: [
          {
            answer: "c'est ton",
            feedback: "Use possessive pronoun 'le tien' not adjective 'ton'",
          },
        ],
      },
      {
        instruction: "How does Marc confirm ownership?",
        prompt: "It's ___ (mine, masculine thing)",
        hint: "c'est + possessive pronoun for 'mine'",
        expectedAnswer: "c'est le mien",
        acceptableAnswers: ["le mien", "oui"],
        wrongAnswers: [
          {
            answer: "c'est mon",
            feedback: "Use possessive pronoun 'le mien' not adjective 'mon'",
          },
        ],
      },
      {
        instruction: "Where does Paul go?",
        prompt: "il part à ___",
        hint: "Look for where Marc says Paul is going",
        expectedAnswer: "Montmartre",
        acceptableAnswers: ["à Montmartre"],
        wrongAnswers: [
          {
            answer: "café",
            feedback: "Paul doesn't come to the café, he goes to Montmartre",
          },
          {
            answer: "maison",
            feedback:
              "He goes to Montmartre first, then sees his child at home",
          },
        ],
      },
      {
        instruction: "Why can't Paul come to the café?",
        prompt: "Il a son ___ ___ aujourd'hui",
        hint: "Look for what Paul has today",
        expectedAnswer: "son jeune enfant",
        acceptableAnswers: ["enfant", "jeune enfant", "son enfant"],
        wrongAnswers: [
          {
            answer: "chat",
            feedback: "Paul has his young child, not a cat",
          },
          {
            answer: "livre",
            feedback: "Paul has his young child, not a book",
          },
        ],
      },
      {
        instruction: "What does Marc ask Sophie about?",
        prompt: "Do you have the ___ book?",
        hint: "Look for the color Marc asks about",
        expectedAnswer: "rouge",
        acceptableAnswers: ["red", "livre rouge", "le livre rouge"],
        wrongAnswers: [
          {
            answer: "vert",
            feedback: "Marc asks about the red (rouge) book, not green",
          },
        ],
      },
      {
        instruction: "How does Sophie describe her book?",
        prompt: "Il est ___",
        hint: "Look for the adjective Sophie uses about her Jules Verne book",
        expectedAnswer: "nouveau",
        acceptableAnswers: ["new", "il est nouveau"],
        wrongAnswers: [
          {
            answer: "vieux",
            feedback:
              "Sophie's book is new (nouveau), Marc's book is old (vieux)",
          },
          {
            answer: "rouge",
            feedback: "Sophie describes her book as new, not a color",
          },
        ],
      },
      {
        instruction: "How does Sophie describe Marc's book?",
        prompt: "It's very ___",
        hint: "Look for the adjective Sophie uses to describe the book",
        expectedAnswer: "vieux",
        acceptableAnswers: ["old", "très vieux", "very old"],
        wrongAnswers: [
          {
            answer: "nouveau",
            feedback: "Sophie says it's very old (vieux), not new",
          },
        ],
      },
      {
        instruction: "Where does Marc say Paul's books are?",
        prompt: "ils sont ___ ___ ___",
        hint: "Look for where Marc keeps the books",
        expectedAnswer: "dans ma voiture",
        acceptableAnswers: ["voiture", "ma voiture", "dans la voiture"],
        wrongAnswers: [
          {
            answer: "maison",
            feedback: "The books are in the car (voiture), not at home",
          },
          {
            answer: "café",
            feedback: "The books are in the car, not at the café",
          },
        ],
      },
      {
        instruction: "What does Sophie say at the end?",
        prompt: "___ ___!",
        hint: "Look for Sophie's final response about coffee",
        expectedAnswer: "Moi aussi",
        acceptableAnswers: ["oui", "moi aussi"],
        wrongAnswers: [
          {
            answer: "merci",
            feedback: "She says 'Moi aussi!' (Me too!), not thank you",
          },
          {
            answer: "au revoir",
            feedback: "She says 'Moi aussi!' (Me too!), not goodbye",
          },
        ],
      },
    ],
  },
};
