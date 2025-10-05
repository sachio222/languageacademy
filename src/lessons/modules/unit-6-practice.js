/**
 * Unit 6 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 6 material
 * Covers: progressive tenses, communication verbs (dire, prendre, mettre, demander, commander), besoin, top 200 nouns
 */

export const unit6Practice = {
  title: "Unit 6 Practice - Fill in the Blanks",
  description:
    "Complete sentences using progressive tenses, communication verbs, and high-frequency nouns from Unit 6!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Progressive present - en train de
    {
      text: "Je suis  manger.",
      instruction: "Complete: 'I am eating' (progressive present)",
      blanks: [
        {
          position: 8,
          answer: "en train de",
          hint: "progressive: in the process of",
        },
      ],
    },
    {
      text: "Il est  parler français.",
      instruction: "Complete: 'He is speaking French' (progressive)",
      blanks: [
        {
          position: 7,
          answer: "en train de",
          hint: "progressive: in the process of",
        },
      ],
    },
    {
      text: "Nous sommes  prendre le train.",
      instruction: "Complete: 'We are taking the train' (progressive)",
      blanks: [
        {
          position: 12,
          answer: "en train de",
          hint: "progressive form",
        },
      ],
    },

    // Near future - aller + infinitive
    {
      text: "Je  partir demain.",
      instruction: "Complete: 'I am going to leave tomorrow'",
      blanks: [
        {
          position: 3,
          answer: "vais",
          hint: "aller conjugated for je",
        },
      ],
    },
    {
      text: "Tu  voir le film?",
      instruction: "Complete: 'Are you going to see the movie?'",
      blanks: [
        {
          position: 3,
          answer: "vas",
          hint: "aller for tu",
        },
      ],
    },
    {
      text: "Nous  manger au restaurant.",
      instruction: "Complete: 'We are going to eat at the restaurant'",
      blanks: [
        {
          position: 5,
          answer: "allons",
          hint: "aller for nous",
        },
      ],
    },
    {
      text: "Ils  venir avec nous.",
      instruction: "Complete: 'They are going to come with us'",
      blanks: [
        {
          position: 4,
          answer: "vont",
          hint: "aller for ils",
        },
      ],
    },

    // dire - to say/tell
    {
      text: "Je  bonjour.",
      instruction: "Complete: 'I say hello'",
      blanks: [
        {
          position: 3,
          answer: "dis",
          hint: "dire for je",
        },
      ],
    },
    {
      text: "Tu  la vérité.",
      instruction: "Complete: 'You tell the truth'",
      blanks: [
        {
          position: 3,
          answer: "dis",
          hint: "dire for tu",
        },
      ],
    },
    {
      text: "Il me  que c'est bon.",
      instruction: "Complete: 'He tells me that it's good'",
      blanks: [
        {
          position: 6,
          answer: "dit",
          hint: "dire for il",
        },
      ],
    },
    {
      text: "Vous  toujours ça!",
      instruction: "Complete: 'You always say that!'",
      blanks: [
        {
          position: 5,
          answer: "dites",
          hint: "dire for vous (irregular!)",
        },
      ],
    },

    // prendre, comprendre, apprendre
    {
      text: "Je  le train.",
      instruction: "Complete: 'I take the train'",
      blanks: [
        {
          position: 3,
          answer: "prends",
          hint: "prendre for je",
        },
      ],
    },
    {
      text: "Tu  le bus?",
      instruction: "Complete: 'Are you taking the bus?'",
      blanks: [
        {
          position: 3,
          answer: "prends",
          hint: "prendre for tu",
        },
      ],
    },
    {
      text: "Nous  un café.",
      instruction: "Complete: 'We're having a coffee'",
      blanks: [
        {
          position: 5,
          answer: "prenons",
          hint: "prendre for nous",
        },
      ],
    },
    {
      text: "Je  le français.",
      instruction: "Complete: 'I understand French'",
      blanks: [
        {
          position: 3,
          answer: "comprends",
          hint: "comprendre for je",
        },
      ],
    },
    {
      text: "Tu  la question?",
      instruction: "Complete: 'Do you understand the question?'",
      blanks: [
        {
          position: 3,
          answer: "comprends",
          hint: "comprendre for tu",
        },
      ],
    },
    {
      text: "J' le français.",
      instruction: "Complete: 'I learn French'",
      blanks: [
        {
          position: 2,
          answer: "apprends",
          hint: "apprendre for je (j' before vowel)",
        },
      ],
    },
    {
      text: "Nous  ensemble.",
      instruction: "Complete: 'We learn together'",
      blanks: [
        {
          position: 5,
          answer: "apprenons",
          hint: "apprendre for nous",
        },
      ],
    },

    // mettre - to put/set
    {
      text: "Je  mon manteau.",
      instruction: "Complete: 'I put on my coat'",
      blanks: [
        {
          position: 3,
          answer: "mets",
          hint: "mettre for je",
        },
      ],
    },
    {
      text: "Tu  la table?",
      instruction: "Complete: 'Are you setting the table?'",
      blanks: [
        {
          position: 3,
          answer: "mets",
          hint: "mettre for tu",
        },
      ],
    },
    {
      text: "Nous  nos livres ici.",
      instruction: "Complete: 'We put our books here'",
      blanks: [
        {
          position: 5,
          answer: "mettons",
          hint: "mettre for nous (double tt!)",
        },
      ],
    },

    // demander - to ask
    {
      text: "Je  de l'aide.",
      instruction: "Complete: 'I ask for help'",
      blanks: [
        {
          position: 3,
          answer: "demande",
          hint: "demander for je",
        },
      ],
    },
    {
      text: "Tu  le prix?",
      instruction: "Complete: 'Are you asking the price?'",
      blanks: [
        {
          position: 3,
          answer: "demandes",
          hint: "demander for tu",
        },
      ],
    },
    {
      text: "Il me  de venir.",
      instruction: "Complete: 'He asks me to come'",
      blanks: [
        {
          position: 6,
          answer: "demande",
          hint: "demander for il",
        },
      ],
    },

    // commander - to order
    {
      text: "Je  un café.",
      instruction: "Complete: 'I order a coffee'",
      blanks: [
        {
          position: 3,
          answer: "commande",
          hint: "commander for je",
        },
      ],
    },
    {
      text: "Vous  une pizza?",
      instruction: "Complete: 'Are you ordering a pizza?'",
      blanks: [
        {
          position: 5,
          answer: "commandez",
          hint: "commander for vous",
        },
      ],
    },
    {
      text: "Nous  du pain.",
      instruction: "Complete: 'We order bread'",
      blanks: [
        {
          position: 5,
          answer: "commandons",
          hint: "commander for nous",
        },
      ],
    },

    // avoir besoin de - to need
    {
      text: "J'ai  d'aide.",
      instruction: "Complete: 'I need help'",
      blanks: [
        {
          position: 4,
          answer: "besoin",
          hint: "avoir besoin de = to need",
        },
      ],
    },
    {
      text: "Tu as  de partir.",
      instruction: "Complete: 'You need to leave'",
      blanks: [
        {
          position: 7,
          answer: "besoin",
          hint: "avoir besoin de",
        },
      ],
    },
    {
      text: "Nous avons  de manger.",
      instruction: "Complete: 'We need to eat'",
      blanks: [
        {
          position: 11,
          answer: "besoin",
          hint: "avoir besoin de",
        },
      ],
    },
    {
      text: "J'ai besoin  manger.",
      instruction: "Complete: 'I need to eat' (preposition before verb)",
      blanks: [
        {
          position: 11,
          answer: "de",
          hint: "preposition used with besoin + infinitive",
        },
      ],
    },

    // Top 200 nouns - family
    {
      text: "Ma  est grande.",
      instruction: "Complete: 'My family is big'",
      blanks: [
        {
          position: 3,
          answer: "famille",
          hint: "family (feminine)",
        },
      ],
    },
    {
      text: "Mon  est gentil.",
      instruction: "Complete: 'My father is kind'",
      blanks: [
        {
          position: 4,
          answer: "père",
          hint: "father",
        },
      ],
    },
    {
      text: "Ma  parle français.",
      instruction: "Complete: 'My mother speaks French'",
      blanks: [
        {
          position: 3,
          answer: "mère",
          hint: "mother",
        },
      ],
    },
    {
      text: "Mon  a dix ans.",
      instruction: "Complete: 'My brother is ten years old'",
      blanks: [
        {
          position: 4,
          answer: "frère",
          hint: "brother",
        },
      ],
    },

    // Top 200 nouns - time
    {
      text: "J'ai une .",
      instruction: "Complete: 'I have a question'",
      blanks: [
        {
          position: 9,
          answer: "question",
          hint: "question (feminine)",
        },
      ],
    },
    {
      text: "C'est la première .",
      instruction: "Complete: 'It's the first time'",
      blanks: [
        {
          position: 19,
          answer: "fois",
          hint: "time/occasion (feminine)",
        },
      ],
    },
    {
      text: "Une  a 365 jours.",
      instruction: "Complete: 'A year has 365 days'",
      blanks: [
        {
          position: 4,
          answer: "année",
          hint: "year (feminine)",
        },
      ],
    },
    {
      text: "En ce , je suis occupé.",
      instruction: "Complete: 'Right now, I am busy'",
      blanks: [
        {
          position: 6,
          answer: "moment",
          hint: "moment (masculine)",
        },
      ],
    },
    {
      text: "Une  a sept jours.",
      instruction: "Complete: 'A week has seven days'",
      blanks: [
        {
          position: 4,
          answer: "semaine",
          hint: "week (feminine)",
        },
      ],
    },

    // Top 200 nouns - world/city
    {
      text: "Paris est une belle .",
      instruction: "Complete: 'Paris is a beautiful city'",
      blanks: [
        {
          position: 20,
          answer: "ville",
          hint: "city (feminine)",
        },
      ],
    },
    {
      text: "Le  est grand.",
      instruction: "Complete: 'The world is big'",
      blanks: [
        {
          position: 3,
          answer: "monde",
          hint: "world (masculine)",
        },
      ],
    },

    // Mixed practice - combining structures
    {
      text: "J'ai besoin  le français.",
      instruction: "Complete: 'I need to learn French'",
      blanks: [
        {
          position: 11,
          answer: "d'apprendre",
          hint: "de + apprendre (elision)",
        },
      ],
    },
    {
      text: "Je vais  la question.",
      instruction: "Complete: 'I am going to ask the question'",
      blanks: [
        {
          position: 8,
          answer: "demander",
          hint: "to ask",
        },
      ],
    },
    {
      text: "Nous sommes en train de  le train.",
      instruction: "Complete: 'We are taking the train'",
      blanks: [
        {
          position: 28,
          answer: "prendre",
          hint: "to take",
        },
      ],
    },
    {
      text: "Elle va  son manteau.",
      instruction: "Complete: 'She is going to put on her coat'",
      blanks: [
        {
          position: 8,
          answer: "mettre",
          hint: "to put",
        },
      ],
    },
    {
      text: "Ils vont  une pizza.",
      instruction: "Complete: 'They are going to order a pizza'",
      blanks: [
        {
          position: 9,
          answer: "commander",
          hint: "to order",
        },
      ],
    },
    {
      text: "Tu me  toujours la vérité.",
      instruction: "Complete: 'You always tell me the truth'",
      blanks: [
        {
          position: 6,
          answer: "dis",
          hint: "dire for tu",
        },
      ],
    },
    {
      text: "Je ne  pas la question.",
      instruction: "Complete: 'I don't understand the question'",
      blanks: [
        {
          position: 6,
          answer: "comprends",
          hint: "comprendre for je",
        },
      ],
    },
    {
      text: "Ma famille va  à Paris.",
      instruction: "Complete: 'My family is going to go to Paris'",
      blanks: [
        {
          position: 14,
          answer: "aller",
          hint: "infinitive: to go",
        },
      ],
    },
  ],
};
