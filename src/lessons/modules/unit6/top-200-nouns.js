/**
 * Module: Top 200 High-Frequency Nouns
 * Unit 6 - Essential nouns from frequency ranks 101-200
 * Time, people, abstract concepts, and body parts
 */

export const top200Nouns = {
  title: "Essential Vocabulary - Time, People & Ideas",
  description:
    "Master essential nouns: l'année (year), la fois (time), la personne (person), la famille (family), le cœur (heart), l'histoire (story)",

  concepts: [
    {
      term: "Time nouns",
      definition:
        "Express time periods and moments: année, fois, moment, heure, minute",
      example:
        "une année (a year), une fois (once/one time), un moment (a moment)",
    },
    {
      term: "People & relationships",
      definition: "Family and general people: famille, père, mère, personne",
      example:
        "ma famille (my family), mon père (my father), une personne (a person)",
    },
    {
      term: "Body parts",
      definition:
        "Beyond basic body parts: yeux (eyes), visage (face), corps (body), cœur (heart)",
      example: "les yeux (the eyes), le visage (the face), le cœur (the heart)",
    },
    {
      term: "Abstract concepts",
      definition:
        "Ideas and concepts: histoire, problème, question, raison, fait",
      example:
        "une histoire (a story), un problème (a problem), la raison (the reason)",
    },
    {
      term: "Special plurals",
      definition: "Some nouns have irregular plurals: œil → yeux (eye → eyes)",
      example: "un œil (one eye), les yeux (the eyes - irregular!)",
    },
  ],

  vocabularyReference: [
    // Time nouns
    {
      french: "l'année",
      english: "year",
      note: "feminine (année) - full calendar year",
    },
    {
      french: "une fois",
      english: "once / one time",
      note: "feminine - une fois (once), deux fois (twice)",
    },
    {
      french: "le moment",
      english: "moment",
      note: "masculine - un moment (a moment)",
    },
    {
      french: "l'heure",
      english: "hour / time (clock)",
      note: "feminine (heure) - quelle heure? (what time?)",
    },
    {
      french: "la minute",
      english: "minute",
      note: "feminine - une minute (one minute)",
    },
    {
      french: "le début",
      english: "beginning / start",
      note: "masculine - au début (at the beginning)",
    },
    {
      french: "la fin",
      english: "end",
      note: "feminine - à la fin (at the end)",
    },

    // People & relationships
    {
      french: "la personne",
      english: "person",
      note: "feminine - always feminine even for males!",
    },
    {
      french: "la famille",
      english: "family",
      note: "feminine - ma famille (my family)",
    },
    {
      french: "le père",
      english: "father",
      note: "masculine - mon père (my father)",
    },
    {
      french: "la mère",
      english: "mother",
      note: "feminine - ma mère (my mother)",
    },
    {
      french: "le fils",
      english: "son",
      note: "masculine - silent 's' at end",
    },
    {
      french: "la fille",
      english: "daughter / girl",
      note: "feminine - can mean daughter OR girl",
    },
    {
      french: "le frère",
      english: "brother",
      note: "masculine - mon frère (my brother)",
    },
    {
      french: "la sœur",
      english: "sister",
      note: "feminine - ma sœur (my sister)",
    },

    // Body parts
    {
      french: "les yeux",
      english: "eyes",
      note: "masculine plural - singular: un œil (irregular!)",
    },
    {
      french: "le visage",
      english: "face",
      note: "masculine - sur le visage (on the face)",
    },
    {
      french: "le corps",
      english: "body",
      note: "masculine - silent 'p' and 's'",
    },
    {
      french: "le cœur",
      english: "heart",
      note: "masculine - mon cœur (my heart)",
    },
    {
      french: "la voix",
      english: "voice",
      note: "feminine - silent 'x'",
    },

    // Abstract concepts
    {
      french: "l'histoire",
      english: "story / history",
      note: "feminine (histoire) - can mean both!",
    },
    {
      french: "le problème",
      english: "problem",
      note: "masculine - un problème (a problem)",
    },
    {
      french: "la question",
      english: "question",
      note: "feminine - une question (a question)",
    },
    {
      french: "la raison",
      english: "reason",
      note: "feminine - la raison (the reason)",
    },
    {
      french: "le fait",
      english: "fact",
      note: "masculine - un fait (a fact)",
    },
    {
      french: "la partie",
      english: "part / game",
      note: "feminine - une partie de (a part of)",
    },
    {
      french: "le côté",
      english: "side",
      note: "masculine - à côté de (next to)",
    },
    {
      french: "la fois",
      english: "time / occasion",
      note: "feminine - la première fois (the first time)",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Time nouns
      {
        instruction: 'Say "a year"',
        prompt: "a year",
        hint: "une...",
        expectedAnswer: "une année",
        acceptableAnswers: ["une année", "une annee"],
        wrongAnswers: [
          {
            answer: "un année",
            feedback: "Use feminine article: une année (not un)",
          },
          {
            answer: "un an",
            feedback:
              "That's 'a year' for age/duration. Use 'une année' for general 'a year'",
          },
          {
            answer: "l'année",
            feedback: "That's 'the year'. Use 'une année' for 'a year'",
          },
          {
            answer: "un ane",
            feedback: "Close! Use feminine 'une' and add accents: une année",
          },
          { answer: "une ane", feedback: "Almost! Add the accents: une année" },
        ],
        explanation: "feminine: une année (a year) - for duration, use 'un an'",
      },
      {
        instruction: 'Say "once"',
        prompt: "once",
        hint: "une...",
        expectedAnswer: "une fois",
        acceptableAnswers: ["une fois"],
        wrongAnswers: ["un fois", "une temps", "un temps"],
        explanation: "une fois (once / one time) - deux fois (twice)",
      },
      {
        instruction: 'Say "a moment"',
        prompt: "a moment",
        hint: "un...",
        expectedAnswer: "un moment",
        acceptableAnswers: ["un moment"],
        wrongAnswers: ["une moment", "le moment", "un minute"],
        explanation: "masculine: un moment (a moment)",
      },
      {
        instruction: 'Say "one hour"',
        prompt: "one hour",
        hint: "une...",
        expectedAnswer: "une heure",
        acceptableAnswers: ["une heure"],
        wrongAnswers: ["un heure", "l'heure", "une houre"],
        explanation: "feminine: une heure (one hour) - silent 'h'",
      },
      {
        instruction: 'Say "one minute"',
        prompt: "one minute",
        hint: "une...",
        expectedAnswer: "une minute",
        acceptableAnswers: ["une minute"],
        wrongAnswers: ["un minute", "la minute", "une minuite"],
        explanation: "feminine: une minute (one minute)",
      },
      {
        instruction: 'Say "the beginning"',
        prompt: "the beginning",
        hint: "le...",
        expectedAnswer: "le début",
        acceptableAnswers: ["le début", "le debut"],
        wrongAnswers: ["la début", "le commencement", "un début"],
        explanation:
          "masculine: le début (the beginning) - au début (at the beginning)",
      },
      {
        instruction: 'Say "the end"',
        prompt: "the end",
        hint: "la...",
        expectedAnswer: "la fin",
        acceptableAnswers: ["la fin"],
        wrongAnswers: ["le fin", "une fin", "le fin"],
        explanation: "feminine: la fin (the end) - à la fin (at the end)",
      },

      // People & relationships
      {
        instruction: 'Say "a person"',
        prompt: "a person",
        hint: "une...",
        expectedAnswer: "une personne",
        acceptableAnswers: ["une personne"],
        wrongAnswers: ["un personne", "la personne", "un person"],
        explanation: "feminine: une personne (a person) - always feminine!",
      },
      {
        instruction: 'Say "my family"',
        prompt: "my family",
        hint: "ma...",
        expectedAnswer: "ma famille",
        acceptableAnswers: ["ma famille"],
        wrongAnswers: ["mon famille", "la famille", "ma famillie"],
        explanation: "feminine: ma famille (my family)",
      },
      {
        instruction: 'Say "my father"',
        prompt: "my father",
        hint: "mon...",
        expectedAnswer: "mon père",
        acceptableAnswers: ["mon père", "mon pere"],
        wrongAnswers: ["ma père", "le père", "mon papa"],
        explanation: "masculine: mon père (my father)",
      },
      {
        instruction: 'Say "my mother"',
        prompt: "my mother",
        hint: "ma...",
        expectedAnswer: "ma mère",
        acceptableAnswers: ["ma mère", "ma mere"],
        wrongAnswers: ["mon mère", "la mère", "ma maman"],
        explanation: "feminine: ma mère (my mother)",
      },
      {
        instruction: 'Say "my brother"',
        prompt: "my brother",
        hint: "mon...",
        expectedAnswer: "mon frère",
        acceptableAnswers: ["mon frère", "mon frere"],
        wrongAnswers: ["ma frère", "le frère", "mon fraire"],
        explanation: "masculine: mon frère (my brother)",
      },
      {
        instruction: 'Say "my sister"',
        prompt: "my sister",
        hint: "ma...",
        expectedAnswer: "ma sœur",
        acceptableAnswers: ["ma sœur", "ma soeur"],
        wrongAnswers: ["mon sœur", "la sœur", "ma seur"],
        explanation: "feminine: ma sœur (my sister)",
      },
      {
        instruction: 'Say "a son"',
        prompt: "a son",
        hint: "un...",
        expectedAnswer: "un fils",
        acceptableAnswers: ["un fils"],
        wrongAnswers: ["une fils", "un fil", "le fils"],
        explanation: "masculine: un fils (a son) - 's' is silent!",
      },
      {
        instruction: 'Say "a daughter"',
        prompt: "a daughter",
        hint: "une...",
        expectedAnswer: "une fille",
        acceptableAnswers: ["une fille"],
        wrongAnswers: ["un fille", "la fille", "une fil"],
        explanation: "feminine: une fille (a daughter) - also means 'girl'",
      },

      // Body parts
      {
        instruction: 'Say "the eyes"',
        prompt: "the eyes",
        hint: "les...",
        expectedAnswer: "les yeux",
        acceptableAnswers: ["les yeux"],
        wrongAnswers: ["les œils", "les oeuils", "les œil"],
        explanation:
          "masculine plural: les yeux - irregular! (singular: un œil)",
      },
      {
        instruction: 'Say "the face"',
        prompt: "the face",
        hint: "le...",
        expectedAnswer: "le visage",
        acceptableAnswers: ["le visage"],
        wrongAnswers: ["la visage", "le face", "la face"],
        explanation: "masculine: le visage (the face)",
      },
      {
        instruction: 'Say "the body"',
        prompt: "the body",
        hint: "le...",
        expectedAnswer: "le corps",
        acceptableAnswers: ["le corps"],
        wrongAnswers: ["la corps", "le corp", "la corp"],
        explanation: "masculine: le corps (the body) - 'p' and 's' are silent!",
      },
      {
        instruction: 'Say "the heart"',
        prompt: "the heart",
        hint: "le...",
        expectedAnswer: "le cœur",
        acceptableAnswers: ["le cœur", "le coeur"],
        wrongAnswers: ["la cœur", "le couer", "la coeur"],
        explanation: "masculine: le cœur (the heart)",
      },
      {
        instruction: 'Say "the voice"',
        prompt: "the voice",
        hint: "la...",
        expectedAnswer: "la voix",
        acceptableAnswers: ["la voix"],
        wrongAnswers: ["le voix", "la voi", "le voi"],
        explanation: "feminine: la voix (the voice) - 'x' is silent!",
      },

      // Abstract concepts
      {
        instruction: 'Say "a story"',
        prompt: "a story",
        hint: "une...",
        expectedAnswer: "une histoire",
        acceptableAnswers: ["une histoire"],
        wrongAnswers: ["un histoire", "l'histoire", "une histoir"],
        explanation: "feminine: une histoire (a story) - also means 'history'",
      },
      {
        instruction: 'Say "a problem"',
        prompt: "a problem",
        hint: "un...",
        expectedAnswer: "un problème",
        acceptableAnswers: ["un problème", "un probleme"],
        wrongAnswers: ["une problème", "le problème", "un problem"],
        explanation: "masculine: un problème (a problem)",
      },
      {
        instruction: 'Say "a question"',
        prompt: "a question",
        hint: "une...",
        expectedAnswer: "une question",
        acceptableAnswers: ["une question"],
        wrongAnswers: ["un question", "la question", "une questione"],
        explanation: "feminine: une question (a question)",
      },
      {
        instruction: 'Say "the reason"',
        prompt: "the reason",
        hint: "la...",
        expectedAnswer: "la raison",
        acceptableAnswers: ["la raison"],
        wrongAnswers: ["le raison", "une raison", "la reason"],
        explanation: "feminine: la raison (the reason)",
      },
      {
        instruction: 'Say "a fact"',
        prompt: "a fact",
        hint: "un...",
        expectedAnswer: "un fait",
        acceptableAnswers: ["un fait"],
        wrongAnswers: ["une fait", "le fait", "un fai"],
        explanation: "masculine: un fait (a fact) - silent 't'",
      },
      {
        instruction: 'Say "a part"',
        prompt: "a part",
        hint: "une...",
        expectedAnswer: "une partie",
        acceptableAnswers: ["une partie"],
        wrongAnswers: ["un partie", "la partie", "une part"],
        explanation: "feminine: une partie (a part) - also means 'game'",
      },
      {
        instruction: 'Say "the side"',
        prompt: "the side",
        hint: "le...",
        expectedAnswer: "le côté",
        acceptableAnswers: ["le côté", "le cote"],
        wrongAnswers: ["la côté", "le coté", "la cote"],
        explanation: "masculine: le côté (the side) - à côté de (next to)",
      },

      // In context
      {
        instruction: 'Say "I have a problem"',
        prompt: "I have a problem",
        hint: "j'ai un problème",
        expectedAnswer: "j'ai un problème",
        acceptableAnswers: ["j ai un problème", "j'ai un probleme"],
        wrongAnswers: [
          "j'ai une problème",
          "j'ai le problème",
          "je ai un problème",
        ],
        explanation:
          "j'ai un problème (I have a problem) - very common phrase!",
      },
      {
        instruction: 'Say "I have a question"',
        prompt: "I have a question",
        hint: "j'ai une question",
        expectedAnswer: "j'ai une question",
        acceptableAnswers: ["j ai une question"],
        wrongAnswers: [
          "j'ai un question",
          "j'ai la question",
          "je ai une question",
        ],
        explanation: "j'ai une question (I have a question) - useful phrase!",
      },
      {
        instruction: 'Say "it\'s a long story"',
        prompt: "it's a long story",
        hint: "c'est une longue histoire",
        expectedAnswer: "c'est une longue histoire",
        acceptableAnswers: [
          "c'est une longue histoire",
          "c est une longue histoire",
        ],
        wrongAnswers: [
          "c'est un longue histoire",
          "c'est une long histoire",
          "c'est une histoire longue",
        ],
        explanation:
          "c'est une longue histoire (it's a long story) - common expression",
      },
      {
        instruction: 'Say "my whole family"',
        prompt: "my whole family",
        hint: "toute ma famille",
        expectedAnswer: "toute ma famille",
        acceptableAnswers: ["toute ma famille"],
        wrongAnswers: [
          "tout ma famille",
          "toute mon famille",
          "ma toute famille",
        ],
        explanation:
          "toute ma famille (my whole family) - 'toute' agrees with feminine 'famille'",
      },
      {
        instruction: 'Say "at the beginning"',
        prompt: "at the beginning",
        hint: "au début",
        expectedAnswer: "au début",
        acceptableAnswers: ["au début", "au debut"],
        wrongAnswers: ["à le début", "à début", "dans le début"],
        explanation: "au début (at the beginning) - à + le = au",
      },
      {
        instruction: 'Say "at the end"',
        prompt: "at the end",
        hint: "à la fin",
        expectedAnswer: "à la fin",
        acceptableAnswers: ["à la fin", "a la fin"],
        wrongAnswers: ["au fin", "à le fin", "dans la fin"],
        explanation: "à la fin (at the end) - common time expression",
      },
    ],
  },
};
