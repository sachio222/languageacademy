/**
 * Unit 8 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 8 material
 * Covers: temporal words, reflexive verbs, commands
 */

export const unit8Practice = {
  moduleKey: "2024-05-25-unit-8-practice", // Permanent identifier - never changes
  title: "Unit 8 Practice - Fill in the Blanks",
  description:
    "Complete sentences using temporal words, reflexive verbs, and commands from Unit 8!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [
    {
      term: "Daily Life Practice",
      definition:
        "Interactive exercises to master temporal expressions, reflexive verbs, and daily routines",
      example:
        "Practice avant le travail, après le dîner, je me lève, tu te couches, nous nous aimons, vous vous connaissez",
    },
    {
      term: "Temporal Fluency",
      definition:
        "Build automaticity with temporal words through varied daily contexts",
      example:
        "avant (before) + après (after) + pendant (during) + depuis (since) in real-life situations",
    },
    {
      term: "Reflexive Mastery",
      definition:
        "Learn to use reflexive verbs naturally in daily routines and self-directed actions",
      example:
        "se lever (get up) + se coucher (go to bed) + s'habiller (get dressed) + se laver (wash up)",
    },
  ],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Temporal words
    {
      text: ", je mange. , je pars.",
      instruction: "Complete: 'First, I eat. Then, I leave.'",
      blanks: [
        {
          position: 0,
          answer: "d'abord",
          hint: "first / first of all",
        },
        {
          position: 14,
          answer: "ensuite",
          hint: "then / next",
        },
      ],
    },
    {
      text: " le cours, j'étudie.",
      instruction: "Complete: 'Before class, I study'",
      blanks: [
        {
          position: 0,
          answer: "avant",
          hint: "before",
        },
      ],
    },
    {
      text: " le cours, je révise.",
      instruction: "Complete: 'After class, I review'",
      blanks: [
        {
          position: 0,
          answer: "après",
          hint: "after",
        },
      ],
    },

    // s'appeler
    {
      text: "Je  Marie.",
      instruction: "Complete: 'My name is Marie'",
      blanks: [
        {
          position: 3,
          answer: "m'appelle",
          hint: "s'appeler for je",
        },
      ],
    },
    {
      text: "Comment tu ?",
      instruction: "Complete: 'What's your name?'",
      blanks: [
        {
          position: 11,
          answer: "t'appelles",
          hint: "s'appeler for tu",
        },
      ],
    },

    // Morning routine
    {
      text: "Je  à sept heures.",
      instruction: "Complete: 'I wake up at 7am'",
      blanks: [
        {
          position: 3,
          answer: "me réveille",
          hint: "se réveiller for je",
        },
      ],
    },
    {
      text: "Ensuite, je .",
      instruction: "Complete: 'Then, I get up'",
      blanks: [
        {
          position: 13,
          answer: "me lève",
          hint: "se lever for je",
        },
      ],
    },

    // Getting ready
    {
      text: "Je .",
      instruction: "Complete: 'I wash myself'",
      blanks: [
        {
          position: 3,
          answer: "me lave",
          hint: "se laver for je",
        },
      ],
    },
    {
      text: "Je  bien.",
      instruction: "Complete: 'I get dressed well'",
      blanks: [
        {
          position: 3,
          answer: "m'habille",
          hint: "s'habiller for je",
        },
      ],
    },
    {
      text: "On  pour le cours.",
      instruction: "Complete: 'We get ready for class'",
      blanks: [
        {
          position: 3,
          answer: "se prépare",
          hint: "se préparer with on",
        },
      ],
    },

    // Daily actions
    {
      text: "Je  de ça.",
      instruction: "Complete: 'I remember that'",
      blanks: [
        {
          position: 3,
          answer: "me souviens",
          hint: "se souvenir for je",
        },
      ],
    },
    {
      text: "On  bien.",
      instruction: "Complete: 'We're having fun'",
      blanks: [
        {
          position: 3,
          answer: "s'amuse",
          hint: "s'amuser with on",
        },
      ],
    },
    {
      text: "Je  parce que je suis en retard.",
      instruction: "Complete: 'I'm hurrying because I'm late'",
      blanks: [
        {
          position: 3,
          answer: "me dépêche",
          hint: "se dépêcher for je",
        },
      ],
    },

    // Past tense reflexive
    {
      text: "Je  à sept heures ce matin.",
      instruction: "Complete: 'I woke up at 7am this morning' (past tense)",
      blanks: [
        {
          position: 3,
          answer: "me suis réveillé",
          hint: "reflexive past: me suis + past participle",
        },
      ],
    },
    {
      text: "Elle  tard.",
      instruction: "Complete: 'She got up late' (past tense)",
      blanks: [
        {
          position: 5,
          answer: "s'est levée",
          hint: "reflexive past with feminine agreement",
        },
      ],
    },

    // Reciprocal
    {
      text: "On  demain.",
      instruction: "Complete: 'We'll see each other tomorrow'",
      blanks: [
        {
          position: 3,
          answer: "se voit",
          hint: "reciprocal: on se voir",
        },
      ],
    },
    {
      text: "Nous  bien.",
      instruction: "Complete: 'We understand each other well'",
      blanks: [
        {
          position: 5,
          answer: "nous comprenons",
          hint: "reciprocal: nous nous comprendre",
        },
      ],
    },

    // Commands
    {
      text: "!",
      instruction: "Complete: 'Listen!' (informal command)",
      blanks: [
        {
          position: 0,
          answer: "écoute",
          hint: "command from écouter",
        },
      ],
    },
    {
      text: " en français!",
      instruction: "Complete: 'Speak in French!' (informal command)",
      blanks: [
        {
          position: 0,
          answer: "parle",
          hint: "command from parler",
        },
      ],
    },
    {
      text: " attention!",
      instruction: "Complete: 'Pay attention!' (informal command)",
      blanks: [
        {
          position: 0,
          answer: "fais",
          hint: "irregular command from faire",
        },
      ],
    },

    // Complex with temporal + reflexive
    {
      text: " le café, je  et je .",
      instruction: "Complete: 'After coffee, I wash and I get dressed'",
      blanks: [
        {
          position: 0,
          answer: "après",
          hint: "temporal: after",
        },
        {
          position: 16,
          answer: "me lave",
          hint: "se laver for je",
        },
        {
          position: 29,
          answer: "m'habille",
          hint: "s'habiller for je",
        },
      ],
    },
  ],
};
