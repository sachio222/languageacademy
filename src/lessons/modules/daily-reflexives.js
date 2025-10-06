/**
 * Module: Daily Reflexive Actions - se souvenir, s'amuser, se dépêcher
 * Unit 8 - Daily Life & Actions
 * Essential daily reflexive verbs
 */

export const dailyReflexivesModule = {
  title: "Daily Actions - se souvenir, s'amuser, se dépêcher",
  description:
    "Essential reflexive verbs: je me souviens (I remember), je m'amuse (I'm having fun), je me dépêche (I'm hurrying)",

  concepts: [
    {
      term: "se souvenir = to remember",
      definition: "Recall memories - important mental action",
      example:
        "je me souviens de ça (I remember that), tu te souviens? (do you remember?)",
    },
    {
      term: "s'amuser = to have fun / to enjoy oneself",
      definition: "Enjoying yourself - social/emotional",
      example:
        "je m'amuse (I'm having fun), on s'amuse bien (we're having a good time)",
    },
    {
      term: "se dépêcher = to hurry / to rush",
      definition: "Moving quickly - time pressure!",
      example: "je me dépêche (I'm hurrying), dépêche-toi! (hurry up!)",
    },
  ],

  vocabularyReference: [
    {
      french: "se souvenir",
      english: "to remember",
      note: "infinitive - reflexive",
    },
    {
      french: "je me souviens",
      english: "I remember",
      note: "⭐ irregular - like venir",
    },
    {
      french: "tu te souviens",
      english: "you remember",
      note: "common in questions",
    },
    {
      french: "il se souvient",
      english: "he remembers",
      note: "third person",
    },
    {
      french: "s'amuser",
      english: "to have fun / to enjoy oneself",
      note: "infinitive",
    },
    {
      french: "je m'amuse",
      english: "I'm having fun",
      note: "⭐ elision",
    },
    {
      french: "tu t'amuses",
      english: "you're having fun",
      note: "elision",
    },
    {
      french: "on s'amuse",
      english: "we're having fun",
      note: "group activity",
    },
    {
      french: "se dépêcher",
      english: "to hurry / to rush",
      note: "infinitive",
    },
    {
      french: "je me dépêche",
      english: "I'm hurrying",
      note: "⭐ time pressure!",
    },
    {
      french: "tu te dépêches",
      english: "you're hurrying",
      note: "informal",
    },
    {
      french: "Dépêche-toi!",
      english: "Hurry up!",
      note: "command form (preview!)",
    },
  ],

  exercises: [
    {
      id: "daily-reflex.1",
      instruction: "Say 'I remember'",
      prompt: "I remember",
      hint: "je me + souvenir (like venir)",
      expectedAnswer: "je me souviens",
      wrongAnswers: [],
    },
    {
      id: "daily-reflex.2",
      instruction: "Ask 'Do you remember?' (informal)",
      prompt: "Do you remember?",
      hint: "tu te souviens?",
      expectedAnswer: "tu te souviens",
      wrongAnswers: [],
    },
    {
      id: "daily-reflex.3",
      instruction: "Say 'I'm having fun'",
      prompt: "I'm having fun",
      hint: "je m' + amuser (elision!)",
      expectedAnswer: "je m'amuse",
      wrongAnswers: [],
    },
    {
      id: "daily-reflex.4",
      instruction: "Say 'We're having fun' (using on)",
      prompt: "We're having fun",
      hint: "on s' + amuser",
      expectedAnswer: "on s'amuse",
      wrongAnswers: [],
    },
    {
      id: "daily-reflex.5",
      instruction: "Say 'I'm hurrying'",
      prompt: "I'm hurrying",
      hint: "je me + dépêcher",
      expectedAnswer: "je me dépêche",
      acceptableAnswers: ["je me depeche"],
      wrongAnswers: [],
    },
    {
      id: "daily-reflex.6",
      instruction: "Say 'You're hurrying' (informal)",
      prompt: "You're hurrying",
      hint: "tu te + dépêcher",
      expectedAnswer: "tu te dépêches",
      acceptableAnswers: ["tu te depeches"],
      wrongAnswers: [],
    },
  ],
};
