/**
 * Reading Comprehension 3
 * Advanced paragraph using Unit 3 vocabulary
 * Includes: motion verbs, object pronouns, possessives, contractions
 */

export const reading3 = {
  moduleKey: "2024-02-03-reading3", // Permanent identifier - never changes
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
    text: `**Sophie:** Bonjour Marc ! Tu viens au Café de Flore avec moi ?

**Marc:** Oui ! Je vais au café avec toi. Tu as *Le Comte de Monte-Cristo* ? C'est le livre rouge et jaune.

**Sophie:** Oui, je l'ai. Il est très vieux ! C'est le tien ?

**Marc:** Oui, c'est le mien. Tu le veux ?

**Sophie:** Non, merci ! J'ai mon livre de Jules Verne, *Vingt mille lieues sous les mers*. Il est nouveau. Tu veux le voir ?

**Marc:** Oui, s'il te plaît, au café.

**Sophie:** Où est ton ami Paul ? Il vient aussi ?

**Marc:** Non, il part à Montmartre. Il a son jeune enfant aujourd'hui et il le voit à la maison.

**Sophie:** C'est bon. Tu as ses livres avec toi aussi ?

**Marc:** Oui, ils sont dans ma voiture. Et j'ai un nouveau bon livre pour toi aussi !

**Sophie:** Oh ! Pour moi ? Merci ! Allons au café !

**Marc:** Je veux un bon café avec toi.

**Sophie:** Oui ! Moi aussi !`,
    translation: `**Sophie:** Hello Marc! Are you coming to Café de Flore with me?

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
        instruction: "What color is Sophie's book?",
        prompt: "Sophie's book is ___",
        hint: "Look for the color Sophie mentions about her book",
        expectedAnswer: "vert",
        acceptableAnswers: ["green", "livre vert", "le livre vert"],
        wrongAnswers: [
          {
            answer: "rouge",
            feedback: "Sophie's book is green (vert), not red",
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
