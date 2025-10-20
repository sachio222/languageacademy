/**
 * Reading 8: Ma Journée (My Day)
 * Unit 8 - Daily Life & Actions
 * Uses: temporal words, reflexive verbs, commands
 * Theme: A typical day with morning routine, using all Unit 8 vocabulary
 */

export const reading8 = {
  moduleKey: "2024-05-20-reading-8", // Permanent identifier - never changes
  title: "Reading 8 - Ma Journée",
  description:
    "A story about a typical day. Uses temporal words, reflexive verbs, and all Unit 8 vocabulary!",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [
    {
      term: "Daily Life Reading Milestone",
      definition:
        "You can now read complex French texts about daily routines, temporal relationships, and social interactions",
      example:
        "Story featuring temporal words (avant, après, pendant, depuis), reflexive verbs (se lever, se coucher), routine verbs (habiter, travailler, chercher), and reciprocal actions",
    },
    {
      term: "Routine and Relationships",
      definition:
        "Experience how French people discuss daily life, family relationships, and social interactions",
      example:
        "Family routines, work schedules, social relationships, and the rhythm of daily French life",
    },
    {
      term: "Temporal Narrative Integration",
      definition:
        "See how temporal expressions combine with reflexive verbs to create natural French narratives",
      example:
        "Complex sentences combining time markers, reflexive actions, and daily activities in authentic contexts",
    },
  ],

  readingPassage: {
    title: "Ma Journée",
    text: `Je m'appelle Marie. Voici ma journée typique.

D'abord, je me réveille à sept heures. Je ne me lève pas tout de suite. Je pense à ma journée pendant quelques minutes.

Ensuite, je me lève. Je vais dans la cuisine. Je prends mon café. Avant le café, je ne peux pas penser bien!

Après le café, je me lave et je m'habille. Je me prépare pour la Sorbonne. Je dois me dépêcher parce que mon cours est à neuf heures.

À la Sorbonne, j'étudie le français. J'aime mes cours. Je comprends bien maintenant. Avant, je ne comprenais pas tout, mais maintenant, je sais beaucoup de choses. Mon professeur me dit: "Écoute bien! Pense en français! Parle avec tes amis!"

Pendant le cours, on apprend des mots nouveaux. On se pose des questions. On s'amuse aussi. Les étudiants s'aident. Nous nous comprenons bien.

Après les cours, je révise mes leçons. Je me souviens de tout ce qu'on apprend. Puis, je vais manger avec mes amis. On se voit souvent. On se parle en français. C'est magnifique, quoi!

Finalement, je rentre chez moi. Je suis contente. Je pense: "Aujourd'hui, j'ai bien appris. Demain, je vais apprendre encore plus."

Voilà ma journée. Et vous, comment est votre journée?`,

    translation: `My name is Marie. Here is my typical day.

First, I wake up at seven o'clock. I don't get up right away. I think about my day for a few minutes.

Then, I get up. I go to the kitchen. I have my coffee. Before coffee, I can't think well!

After coffee, I wash and get dressed. I get ready for the Sorbonne. I must hurry because my class is at nine o'clock.

At the Sorbonne, I study French. I like my classes. I understand well now. Before, I didn't understand everything, but now, I know many things. My teacher tells me: "Listen well! Think in French! Speak with your friends!"

During class, we learn new words. We ask ourselves questions. We have fun too. The students help each other. We understand each other well.

After classes, I review my lessons. I remember everything that we learn. Then, I go eat with my friends. We see each other often. We speak to each other in French. It's magnificent, you know!

Finally, I return home. I'm happy. I think: "Today, I learned well. Tomorrow, I'm going to learn even more."

That's my day. And you, how is your day?`,
  },

  vocabularyReference: [
    // Unit 8 - Temporal words
    { french: "d'abord", english: "first", note: "sequence starter" },
    { french: "ensuite", english: "then / next", note: "sequence" },
    { french: "puis", english: "then", note: "sequence" },
    { french: "après", english: "after", note: "sequence/preposition" },
    { french: "finalement", english: "finally", note: "sequence ender" },
    { french: "avant", english: "before", note: "preposition" },
    { french: "pendant", english: "during / for", note: "duration" },

    // Unit 8 - Reflexive verbs
    { french: "je m'appelle", english: "my name is", note: "s'appeler" },
    { french: "je me réveille", english: "I wake up", note: "se réveiller" },
    { french: "je me lève", english: "I get up", note: "se lever" },
    { french: "je me lave", english: "I wash", note: "se laver" },
    { french: "je m'habille", english: "I get dressed", note: "s'habiller" },
    { french: "je me prépare", english: "I get ready", note: "se préparer" },
    { french: "je me dépêche", english: "I hurry", note: "se dépêcher" },
    { french: "je me souviens", english: "I remember", note: "se souvenir" },
    { french: "on s'amuse", english: "we have fun", note: "s'amuser" },
    {
      french: "on se pose des questions",
      english: "we ask ourselves questions",
      note: "reciprocal",
    },
    {
      french: "s'aident",
      english: "help each other",
      note: "reciprocal s'aider",
    },
    {
      french: "nous nous comprenons",
      english: "we understand each other",
      note: "reciprocal",
    },
    { french: "on se voit", english: "we see each other", note: "reciprocal" },
    {
      french: "on se parle",
      english: "we speak to each other",
      note: "reciprocal",
    },

    // Commands
    { french: "Écoute bien!", english: "Listen well!", note: "command" },
    { french: "Pense!", english: "Think!", note: "command" },
    { french: "Parle!", english: "Speak!", note: "command" },

    // Proper nouns
    {
      french: "la Sorbonne",
      english: "the Sorbonne",
      note: "⭐ historic Paris university, founded 1257",
    },

    // Other vocabulary
    { french: "journée", english: "day", note: "feminine" },
    { french: "typique", english: "typical", note: "adjective" },
    { french: "tout de suite", english: "right away", note: "expression" },
    { french: "quelques", english: "a few / some", note: "plural" },
    { french: "minutes", english: "minutes", note: "time" },
    { french: "cuisine", english: "kitchen", note: "room" },
    { french: "café", english: "coffee", note: "drink" },
    {
      french: "professeur",
      english: "teacher / professor",
      note: "profession",
    },
    { french: "nouveaux", english: "new (plural)", note: "adjective" },
    { french: "tes amis", english: "your friends", note: "possessive" },
    { french: "les étudiants", english: "the students", note: "plural" },
    { french: "mes leçons", english: "my lessons", note: "possessive" },
    { french: "chez moi", english: "to my place / home", note: "expression" },
    { french: "rentre", english: "return / go back", note: "verb rentrer" },
    { french: "contente", english: "happy (fem)", note: "adjective" },
    { french: "encore", english: "again / more", note: "adverb" },
    { french: "encore plus", english: "even more", note: "expression" },
    { french: "voilà", english: "there is / that's", note: "demonstrative" },
    { french: "votre", english: "your (formal)", note: "possessive" },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        id: "reading-8.1",
        instruction: "Why doesn't Marie get up immediately after waking?",
        prompt: "She doesn't get up because...",
        hint: "What does she do for a few minutes?",
        expectedAnswer: "elle pense à sa journée",
        acceptableAnswers: [
          "elle pense à sa journée",
          "je pense à ma journée",
          "Je pense à ma journée pendant quelques minutes",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.2",
        instruction: "What sequence happens in Marie's morning routine?",
        prompt: "First coffee, then...",
        hint: "What happens after coffee?",
        expectedAnswer: "elle se lave et s'habille",
        acceptableAnswers: [
          "elle se lave et s'habille",
          "je me lave et m'habille",
          "je me lave et je m'habille",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.3",
        instruction: "How has Marie's French comprehension changed over time?",
        prompt: "Before she didn't understand, but now...",
        hint: "Look for 'Avant, je ne comprenais pas... mais maintenant'",
        expectedAnswer: "maintenant elle sait beaucoup de choses",
        acceptableAnswers: [
          "maintenant elle sait beaucoup de choses",
          "je sais beaucoup de choses",
          "maintenant, je sais beaucoup de choses",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.4",
        instruction:
          "What kind of learning environment exists in Marie's class?",
        prompt: "The students help each other and...",
        hint: "How do the students interact? Look for reciprocal verbs",
        expectedAnswer: "ils se comprennent bien",
        acceptableAnswers: [
          "ils se comprennent bien",
          "nous nous comprenons bien",
          "les étudiants s'aident",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.5",
        instruction:
          "What does Marie's professor emphasize for language learning?",
        prompt: "The three key actions are...",
        hint: "Three imperatives the professor gives",
        expectedAnswer: "écoute pense parle",
        acceptableAnswers: [
          "écoute bien pense en français parle avec tes amis",
          "Écoute bien! Pense en français! Parle avec tes amis!",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.6",
        instruction: "How do Marie and her friends practice French together?",
        prompt: "When they meet, they...",
        hint: "What language do they use together?",
        expectedAnswer: "on se parle en français",
        acceptableAnswers: [
          "on se parle en français",
          "ils se parlent en français",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.7",
        instruction: "What does Marie do to retain what she learns?",
        prompt: "After class, she reviews because...",
        hint: "Why does she review? What does she remember?",
        expectedAnswer: "elle se souvient de tout",
        acceptableAnswers: [
          "elle se souvient de tout",
          "je me souviens de tout",
          "Je me souviens de tout ce qu'on apprend",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.8",
        instruction: "What shows Marie's positive attitude about learning?",
        prompt: "At the end, she thinks tomorrow...",
        hint: "What does she plan for tomorrow?",
        expectedAnswer: "je vais apprendre encore plus",
        acceptableAnswers: [
          "je vais apprendre encore plus",
          "elle va apprendre encore plus",
          "Demain, je vais apprendre encore plus",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.9",
        instruction: "Why does Marie call her French experience 'magnifique'?",
        prompt: "It's magnificent because...",
        hint: "What makes speaking French with friends special?",
        expectedAnswer: "on se parle en français",
        acceptableAnswers: [
          "on se parle en français",
          "ils se parlent en français",
          "C'est magnifique, quoi!",
        ],
        wrongAnswers: [],
      },
      {
        id: "reading-8.10",
        instruction: "What pattern shows Marie's daily commitment to learning?",
        prompt: "She goes from morning preparation to...",
        hint: "What cycle does her day show from morning to evening?",
        expectedAnswer: "elle rentre contente et pense au lendemain",
        acceptableAnswers: [
          "elle rentre contente et pense au lendemain",
          "je rentre contente et pense au lendemain",
          "contente et pense au lendemain",
        ],
        wrongAnswers: [],
      },
    ],
  },
};
