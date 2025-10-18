/**
 * Reading Comprehension 3
 * Advanced paragraph using Unit 3 vocabulary
 * Includes: motion verbs, object pronouns, possessives, contractions
 */

export const reading3 = {
  title: "Reading Comprehension 3 - A Day Out!",
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
    title: "Une Journée Spéciale (A Special Day)",
    text: `**Sophie:** Bonjour Marc! Tu viens au café avec moi?

**Marc:** Oui! Je vais au café avec toi. Tu vois mon nouveau livre?

**Sophie:** Oui, je le vois! Il est très beau. C'est le tien?

**Marc:** Oui, c'est le mien. Je veux ce livre. Tu veux ce livre aussi?

**Sophie:** Non, merci! Où est ton ami Paul? Il vient aussi?

**Marc:** Non, il part à la maison. Il a son chat et il le voit à la maison.

**Sophie:** Tu as des livres aussi?

**Marc:** Oui, j'ai mes livres. Ils sont dans ma voiture. Je les ai pour toi!

**Sophie:** Pour moi? Merci! Tu es un bon ami.

**Marc:** Merci! Nous allons au café. Tu veux un café avec moi?

**Sophie:** Oui! Je veux un bon café avec toi!`,
    translation: `**Sophie:** Hello Marc! Are you coming to the café with me?

**Marc:** Yes! I'm going to the café with you. Do you see my new book?

**Sophie:** Yes, I see it! It's very beautiful. Is it yours?

**Marc:** Yes, it's mine. I want this book. Do you want this book too?

**Sophie:** No, thank you! Where is your friend Paul? Is he coming too?

**Marc:** No, he's leaving for home. He has his cat and he sees it at home.

**Sophie:** Do you have books too?

**Marc:** Yes, I have my books. They are in my car. I have them for you!

**Sophie:** For me? Thank you! You are a good friend.

**Marc:** Thank you! We're going to the café. Do you want a coffee with me?

**Sophie:** Yes! I want a good coffee with you!`,
  },

  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Where does Sophie invite Marc?",
        prompt: "Sophie invites Marc ___ ___",
        hint: "Look for 'tu viens ___ ___' - contraction needed!",
        expectedAnswer: "au café",
        acceptableAnswers: ["café"],
        wrongAnswers: [
          {
            answer: "à le café",
            feedback: "à + le must contract to 'au'",
          },
          {
            answer: "à la café",
            feedback: "café is masculine, use 'au' not 'à la'",
          },
          {
            answer: "à la maison",
            feedback: "She invites him to the café, not the house",
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
        instruction: "How does Marc say he sees the book?",
        prompt: "I ___ it",
        hint: "Object pronoun BEFORE voir - 'je ___ vois'",
        expectedAnswer: "je le vois",
        acceptableAnswers: ["il le voit"],
        wrongAnswers: [
          {
            answer: "je vois le",
            feedback: "Object pronoun goes BEFORE the verb",
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
        prompt: "He leaves/goes ___ ___ ___",
        hint: "Look for 'il part ___ la maison' - which preposition + contraction?",
        expectedAnswer: "à la maison",
        acceptableAnswers: ["la maison", "maison"],
        wrongAnswers: [
          {
            answer: "au maison",
            feedback: "maison is feminine, use 'à la' not 'au'",
          },
        ],
      },
      {
        instruction: "How does Marc say Paul sees his cat?",
        prompt: "he ___ it",
        hint: "Object pronoun before voir - 'il ___ voit'",
        expectedAnswer: "il le voit",
        acceptableAnswers: ["le voit"],
        wrongAnswers: [
          {
            answer: "il voit le",
            feedback: "Object pronoun goes BEFORE the verb",
          },
        ],
      },
      {
        instruction: "What possessive adjective does Marc use for his books?",
        prompt: "my books",
        hint: "Possessive adjective for 'my' + plural noun",
        expectedAnswer: "mes livres",
        acceptableAnswers: ["mes"],
        wrongAnswers: [
          {
            answer: "mon livres",
            feedback: "For plural, use 'mes' not 'mon'",
          },
        ],
      },
      {
        instruction: "How does Marc say he has them (the books)?",
        prompt: "I ___ them",
        hint: "Plural object pronoun before avoir - 'je ___ ai'",
        expectedAnswer: "je les ai",
        acceptableAnswers: [],
        wrongAnswers: [
          {
            answer: "je ai les",
            feedback: "Object pronoun goes BEFORE: je LES ai",
          },
        ],
      },
      {
        instruction: "Who are the books for?",
        prompt: "The books are for ___",
        hint: "Look for 'pour ___' - stressed pronoun for 'you'",
        expectedAnswer: "toi",
        acceptableAnswers: [
          "pour toi",
          "Sophie",
          "les livres sont pour toi",
          "les livres sont pour Sophie",
        ],
        wrongAnswers: [
          {
            answer: "tu",
            feedback: "Use stressed pronoun 'toi' not subject pronoun 'tu'",
          },
        ],
      },
      {
        instruction: "What motion verb do they use to say 'we're going'?",
        prompt: "we ___",
        hint: "Look for 'nous ___ au café' - which verb means 'go'?",
        expectedAnswer: "nous allons",
        acceptableAnswers: ["allons", "nous allons au café"],
        wrongAnswers: [
          {
            answer: "venons",
            feedback: "They're GOING (aller), not coming (venir)",
          },
        ],
      },
    ],
  },
};
