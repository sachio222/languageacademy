/**
 * Unit 6 Exam - Comprehensive test for Communication unit
 * Tests progressive tenses, communication verbs, besoin, and top 200 nouns
 */

export const unit6Exam = {
  title: "Unit 6 Final Exam - Communication",
  description:
    "Test everything from Unit 6! Progressive tenses, future forms, communication verbs, and high-frequency nouns.",

  // Special flags
  isUnitExam: true,
  unitNumber: 6,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Progressive Tenses (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I am eating",
        hint: "Progressive present: je suis + en train de + infinitive",
        expectedAnswer: "je suis en train de manger",
      },
      {
        instruction: "Translate to French",
        prompt: "he is speaking",
        hint: "Progressive: il est en train de + parler",
        expectedAnswer: "il est en train de parler",
      },
      {
        instruction: "Translate to French",
        prompt: "we are leaving",
        hint: "Progressive: nous sommes en train de + partir",
        expectedAnswer: "nous sommes en train de partir",
      },
      {
        instruction: "Translate to French",
        prompt: "I was eating",
        hint: "Past progressive: j'étais en train de + infinitive",
        expectedAnswer: "j'étais en train de manger",
        acceptableAnswers: ["j etais en train de manger"],
      },
      {
        instruction: "Translate to French",
        prompt: "you were talking (informal)",
        hint: "tu étais en train de + parler",
        expectedAnswer: "tu étais en train de parler",
        acceptableAnswers: ["tu etais en train de parler"],
      },
      {
        instruction: "What does 'en train de' mean?",
        prompt: "en train de",
        hint: "Progressive construction - literally 'in the process of'",
        expectedAnswer: "in the process of",
        acceptableAnswers: ["in the process of doing", "in the act of"],
      },

      // SECTION 2: Near Future (aller + infinitive) (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I am going to eat",
        hint: "Near future: je vais + infinitive",
        expectedAnswer: "je vais manger",
      },
      {
        instruction: "Translate to French",
        prompt: "you are going to leave (informal)",
        hint: "tu vas + partir",
        expectedAnswer: "tu vas partir",
      },
      {
        instruction: "Translate to French",
        prompt: "we are going to see",
        hint: "nous allons + voir",
        expectedAnswer: "nous allons voir",
      },
      {
        instruction: "Translate to French",
        prompt: "they are going to come",
        hint: "ils vont + venir",
        expectedAnswer: "ils vont venir",
      },
      {
        instruction: "Translate to French",
        prompt: "I'm not going to go",
        hint: "Negative near future: je ne vais pas + aller",
        expectedAnswer: "je ne vais pas aller",
      },

      // SECTION 3: Future Tense (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I will speak",
        hint: "Simple future: parler + ai",
        expectedAnswer: "je parlerai",
      },
      {
        instruction: "Translate to French",
        prompt: "you will eat",
        hint: "Simple future: manger + as",
        expectedAnswer: "tu mangeras",
      },
      {
        instruction: "Translate to French",
        prompt: "he will go",
        hint: "Irregular future of aller: il ira",
        expectedAnswer: "il ira",
      },
      {
        instruction: "Translate to French",
        prompt: "I can't",
        hint: "Negative modal: je ne peux pas",
        expectedAnswer: "je ne peux pas",
      },
      {
        instruction: "Translate to French",
        prompt: "I shouldn't",
        hint: "Negative conditional: je ne devrais pas",
        expectedAnswer: "je ne devrais pas",
      },

      // SECTION 4: dire (to say/tell) (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I say",
        hint: "dire for je",
        expectedAnswer: "je dis",
      },
      {
        instruction: "Translate to French",
        prompt: "you say (informal)",
        hint: "dire for tu - same as je",
        expectedAnswer: "tu dis",
      },
      {
        instruction: "Translate to French",
        prompt: "he says",
        hint: "dire for il",
        expectedAnswer: "il dit",
      },
      {
        instruction: "Translate to French",
        prompt: "you say (formal)",
        hint: "Irregular! vous dites (not disez)",
        expectedAnswer: "vous dites",
      },
      {
        instruction: "Translate to French",
        prompt: "I tell you (informal)",
        hint: "Object pronoun + dire: je te dis",
        expectedAnswer: "je te dis",
      },
      {
        instruction: "Translate to French",
        prompt: "he tells me",
        hint: "il me dit",
        expectedAnswer: "il me dit",
      },

      // SECTION 5: prendre, comprendre, apprendre (8 questions)
      {
        instruction: "Translate to French",
        prompt: "I take",
        hint: "prendre for je",
        expectedAnswer: "je prends",
      },
      {
        instruction: "Translate to French",
        prompt: "he takes",
        hint: "prendre for il - no 's'",
        expectedAnswer: "il prend",
      },
      {
        instruction: "Translate to French",
        prompt: "we take",
        hint: "prendre for nous",
        expectedAnswer: "nous prenons",
      },
      {
        instruction: "Translate to French",
        prompt: "they take",
        hint: "prendre for ils - double 'n'!",
        expectedAnswer: "ils prennent",
      },
      {
        instruction: "Translate to French",
        prompt: "I understand",
        hint: "comprendre for je",
        expectedAnswer: "je comprends",
      },
      {
        instruction: "Translate to French",
        prompt: "do you understand? (informal)",
        hint: "Question with tu comprends",
        expectedAnswer: "tu comprends?",
        acceptableAnswers: [
          "tu comprends",
          "est-ce que tu comprends?",
          "est-ce que tu comprends",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I learn",
        hint: "apprendre for je - j' before vowel",
        expectedAnswer: "j'apprends",
        acceptableAnswers: ["j apprends"],
      },
      {
        instruction: "Translate to French",
        prompt: "I learn French",
        hint: "j'apprends + le français",
        expectedAnswer: "j'apprends le français",
        acceptableAnswers: ["j apprends le français", "j'apprends le francais"],
      },

      // SECTION 6: mettre (to put) (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I put",
        hint: "mettre for je",
        expectedAnswer: "je mets",
      },
      {
        instruction: "Translate to French",
        prompt: "he puts",
        hint: "mettre for il - no 's'",
        expectedAnswer: "il met",
      },
      {
        instruction: "Translate to French",
        prompt: "we put",
        hint: "mettre for nous - double 'tt'!",
        expectedAnswer: "nous mettons",
      },
      {
        instruction: "Translate to French",
        prompt: "to set the table",
        hint: "mettre + la table",
        expectedAnswer: "mettre la table",
      },
      {
        instruction: "Translate to French",
        prompt: "I put on a coat",
        hint: "je mets + un manteau",
        expectedAnswer: "je mets un manteau",
      },

      // SECTION 7: demander (to ask) (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I ask",
        hint: "Regular -ER verb: demander",
        expectedAnswer: "je demande",
      },
      {
        instruction: "Translate to French",
        prompt: "you ask (informal)",
        hint: "demander for tu",
        expectedAnswer: "tu demandes",
      },
      {
        instruction: "Translate to French",
        prompt: "to ask for help",
        hint: "demander + de l'aide",
        expectedAnswer: "demander de l'aide",
        acceptableAnswers: ["demander de l aide"],
      },
      {
        instruction: "Translate to French",
        prompt: "I ask you (informal)",
        hint: "Object pronoun before verb: je te demande",
        expectedAnswer: "je te demande",
      },
      {
        instruction: "Translate to French",
        prompt: "he asks me to come",
        hint: "il me demande de + infinitive",
        expectedAnswer: "il me demande de venir",
      },

      // SECTION 8: commander (to order) (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I order",
        hint: "Regular -ER verb: commander",
        expectedAnswer: "je commande",
      },
      {
        instruction: "Translate to French",
        prompt: "we order",
        hint: "commander for nous",
        expectedAnswer: "nous commandons",
      },
      {
        instruction: "Translate to French",
        prompt: "to order a coffee",
        hint: "commander + un café",
        expectedAnswer: "commander un café",
        acceptableAnswers: ["commander un cafe"],
      },
      {
        instruction: "Translate to French",
        prompt: "I would like to order",
        hint: "je voudrais + commander",
        expectedAnswer: "je voudrais commander",
      },

      // SECTION 9: avoir besoin de (to need) (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I need",
        hint: "avoir besoin de for je",
        expectedAnswer: "j'ai besoin de",
        acceptableAnswers: ["j ai besoin de"],
      },
      {
        instruction: "Translate to French",
        prompt: "you need (informal)",
        hint: "avoir besoin de for tu",
        expectedAnswer: "tu as besoin de",
      },
      {
        instruction: "Translate to French",
        prompt: "I need help",
        hint: "j'ai besoin de + aide (d' before vowel)",
        expectedAnswer: "j'ai besoin d'aide",
        acceptableAnswers: ["j ai besoin d'aide", "j'ai besoin d aide"],
      },
      {
        instruction: "Translate to French",
        prompt: "I need to eat",
        hint: "j'ai besoin de + manger",
        expectedAnswer: "j'ai besoin de manger",
        acceptableAnswers: ["j ai besoin de manger"],
      },
      {
        instruction: "Translate to French",
        prompt: "we need time",
        hint: "nous avons besoin de + temps",
        expectedAnswer: "nous avons besoin de temps",
      },
      {
        instruction: "Translate to French",
        prompt: "I don't need that",
        hint: "Negative: je n'ai pas besoin de + ça",
        expectedAnswer: "je n'ai pas besoin de ça",
        acceptableAnswers: [
          "je n ai pas besoin de ça",
          "je n'ai pas besoin de ca",
        ],
      },

      // SECTION 10: Top 200 Nouns - Family (5 questions)
      {
        instruction: "Translate to French",
        prompt: "family",
        hint: "Feminine noun",
        expectedAnswer: "la famille",
        acceptableAnswers: ["famille"],
      },
      {
        instruction: "Translate to French",
        prompt: "father",
        hint: "Masculine - mon père",
        expectedAnswer: "le père",
        acceptableAnswers: ["père", "pere"],
      },
      {
        instruction: "Translate to French",
        prompt: "mother",
        hint: "Feminine - ma mère",
        expectedAnswer: "la mère",
        acceptableAnswers: ["mère", "mere"],
      },
      {
        instruction: "Translate to French",
        prompt: "brother",
        hint: "Masculine - mon frère",
        expectedAnswer: "le frère",
        acceptableAnswers: ["frère", "frere"],
      },
      {
        instruction: "Translate to French",
        prompt: "my whole family",
        hint: "toute + ma famille",
        expectedAnswer: "toute ma famille",
      },

      // SECTION 11: Top 200 Nouns - Time & Other (8 questions)
      {
        instruction: "Translate to French",
        prompt: "question",
        hint: "Feminine noun",
        expectedAnswer: "la question",
        acceptableAnswers: ["question"],
      },
      {
        instruction: "Translate to French",
        prompt: "time/occasion",
        hint: "Feminine - une fois = once",
        expectedAnswer: "la fois",
        acceptableAnswers: ["fois"],
      },
      {
        instruction: "Translate to French",
        prompt: "year",
        hint: "Feminine - une année",
        expectedAnswer: "l'année",
        acceptableAnswers: ["année", "annee", "l annee"],
      },
      {
        instruction: "Translate to French",
        prompt: "moment",
        hint: "Masculine - en ce moment",
        expectedAnswer: "le moment",
        acceptableAnswers: ["moment"],
      },
      {
        instruction: "Translate to French",
        prompt: "week",
        hint: "Feminine - une semaine",
        expectedAnswer: "la semaine",
        acceptableAnswers: ["semaine"],
      },
      {
        instruction: "Translate to French",
        prompt: "world",
        hint: "Masculine - le monde",
        expectedAnswer: "le monde",
        acceptableAnswers: ["monde"],
      },
      {
        instruction: "Translate to French",
        prompt: "city",
        hint: "Feminine - une ville",
        expectedAnswer: "la ville",
        acceptableAnswers: ["ville"],
      },
      {
        instruction: "Translate to French",
        prompt: "word",
        hint: "Masculine - un mot",
        expectedAnswer: "le mot",
        acceptableAnswers: ["mot"],
      },

      // SECTION 12: Mixed Comprehensive (10 questions)
      {
        instruction: "Translate to French",
        prompt: "I am going to take the train",
        hint: "Near future: je vais + prendre le train",
        expectedAnswer: "je vais prendre le train",
      },
      {
        instruction: "Translate to French",
        prompt: "I need to learn French",
        hint: "j'ai besoin de + apprendre (d' before vowel)",
        expectedAnswer: "j'ai besoin d'apprendre le français",
        acceptableAnswers: [
          "j ai besoin d'apprendre le français",
          "j'ai besoin d apprendre le français",
          "j'ai besoin d'apprendre le francais",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "we are setting the table",
        hint: "Progressive: nous sommes en train de mettre la table",
        expectedAnswer: "nous sommes en train de mettre la table",
        acceptableAnswers: ["nous mettons la table"],
      },
      {
        instruction: "Translate to French",
        prompt: "what are you going to order?",
        hint: "qu'est-ce que + tu vas commander",
        expectedAnswer: "qu'est-ce que tu vas commander?",
        acceptableAnswers: [
          "qu'est-ce que tu vas commander",
          "qu est-ce que tu vas commander?",
          "que vas-tu commander?",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "he doesn't understand the question",
        hint: "Negative: il ne comprend pas + la question",
        expectedAnswer: "il ne comprend pas la question",
      },
      {
        instruction: "Translate to French",
        prompt: "I'm going to ask my father",
        hint: "je vais demander à + mon père",
        expectedAnswer: "je vais demander à mon père",
        acceptableAnswers: [
          "je vais demander à mon pere",
          "je vais demander a mon père",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "you always tell me that",
        hint: "tu me dis toujours + ça",
        expectedAnswer: "tu me dis toujours ça",
        acceptableAnswers: ["tu me dis toujours ca"],
      },
      {
        instruction: "Translate to French",
        prompt: "it takes three hours",
        hint: "Impersonal: ça prend + trois heures",
        expectedAnswer: "ça prend trois heures",
        acceptableAnswers: ["ca prend trois heures"],
      },
      {
        instruction: "Translate to French",
        prompt: "the first time",
        hint: "la première + fois",
        expectedAnswer: "la première fois",
        acceptableAnswers: ["la premiere fois"],
      },
      {
        instruction: "Translate to French",
        prompt: "right now",
        hint: "Time expression: en ce moment",
        expectedAnswer: "en ce moment",
      },
    ],
  },
};
