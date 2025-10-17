/**
 * Unit 8 Exam - Comprehensive test for Daily Life & Actions unit
 * Tests: temporal words, reflexive verbs, commands
 */

export const unit8Exam = {
  title: "Unit 8 Final Exam - Daily Life & Actions",
  description:
    "Test everything from Unit 8! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions.",

  // Special flags
  isUnitExam: true,
  unitNumber: 8,
  skipStudyMode: true,

  concepts: [
    {
      term: "Daily Life and Actions Mastery",
      definition:
        "You've mastered the essential structures for expressing daily routines, temporal relationships, and reflexive actions",
      example:
        "avant le travail, après le dîner, pendant la journée, depuis hier, je me lève, tu te couches, nous nous aimons",
    },
    {
      term: "Temporal Mastery",
      definition:
        "Learn essential temporal words for expressing time relationships and sequences",
      example:
        "avant (before), après (after), pendant (during), depuis (since), toujours (always), jamais (never), souvent (often)",
    },
    {
      term: "Reflexive Verbs",
      definition:
        "Master reflexive verbs for expressing daily routines and self-directed actions",
      example:
        "se lever (je me lève, tu te lèves, il se lève), se coucher (je me couche, tu te couches, il se couche), s'habiller (je m'habille, tu t'habilles, il s'habille)",
    },
    {
      term: "Routine and Commands",
      definition:
        "Learn verbs for daily activities and imperative forms for giving commands",
      example:
        "habiter (je habite, tu habites, il habite), travailler (je travaille, tu travailles, il travaille), chercher (je cherche, tu cherches, il cherche)",
    },
    {
      term: "Reciprocal Actions",
      definition:
        "Master expressing mutual actions and relationships between people",
      example:
        "nous nous aimons (we love each other), vous vous connaissez (you know each other), ils se parlent (they talk to each other)",
    },
  ],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Temporal & Sequential Words (8 questions)
      {
        instruction: "Translate to French",
        prompt: "during / for",
        hint: "Temporal preposition - duration",
        expectedAnswer: "pendant",
      },
      {
        instruction: "Translate to French",
        prompt: "before",
        hint: "Temporal preposition - opposite of après",
        expectedAnswer: "avant",
      },
      {
        instruction: "Translate to French",
        prompt: "after",
        hint: "Temporal preposition or connector",
        expectedAnswer: "après",
      },
      {
        instruction: "Translate to French",
        prompt: "first / first of all",
        hint: "Starts a sequence",
        expectedAnswer: "d'abord",
      },
      {
        instruction: "Translate to French",
        prompt: "then / next",
        hint: "Continues a sequence - most common",
        expectedAnswer: "ensuite",
      },
      {
        instruction: "Translate to French",
        prompt: "finally",
        hint: "Ends a sequence",
        expectedAnswer: "finalement",
      },
      {
        instruction: "Translate to French",
        prompt: "First, I eat. Then, I leave.",
        hint: "D'abord + je mange. Ensuite + je pars.",
        expectedAnswer: "d'abord, je mange. ensuite, je pars",
        acceptableAnswers: ["d abord je mange ensuite je pars"],
      },
      {
        instruction: "Translate to French",
        prompt: "Before class, I study",
        hint: "Avant + le cours + je étudie",
        expectedAnswer: "avant le cours, j'étudie",
        acceptableAnswers: ["avant le cours j etudie"],
      },

      // SECTION 2: Reflexive Pronouns (5 questions)
      {
        instruction: "Which reflexive pronoun goes with 'je'?",
        prompt: "je ... lave",
        hint: "First person reflexive",
        expectedAnswer: "me",
      },
      {
        instruction: "Which reflexive pronoun goes with 'tu'?",
        prompt: "tu ... lèves",
        hint: "Second person reflexive",
        expectedAnswer: "te",
      },
      {
        instruction: "Which reflexive pronoun goes with 'il'?",
        prompt: "il ... prépare",
        hint: "Third person reflexive",
        expectedAnswer: "se",
      },
      {
        instruction: "Which reflexive pronoun goes with 'nous'?",
        prompt: "nous ... aimons",
        hint: "First person plural - same as subject",
        expectedAnswer: "nous",
      },
      {
        instruction: "Translate to French",
        prompt: "I wash myself",
        hint: "je me + laver",
        expectedAnswer: "je me lave",
      },

      // SECTION 3: s'appeler (4 questions)
      {
        instruction: "Translate to French",
        prompt: "My name is Marie",
        hint: "je m'appelle + name",
        expectedAnswer: "je m'appelle Marie",
      },
      {
        instruction: "Translate to French",
        prompt: "What's your name? (informal)",
        hint: "Comment tu t'appelles?",
        expectedAnswer: "comment tu t'appelles",
      },
      {
        instruction: "Translate to French",
        prompt: "His name is Pierre",
        hint: "il s'appelle + name",
        expectedAnswer: "il s'appelle Pierre",
      },
      {
        instruction: "Translate to French",
        prompt: "Her name is Sophie",
        hint: "elle s'appelle + name",
        expectedAnswer: "elle s'appelle Sophie",
      },

      // SECTION 4: Morning Routine (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I wake up",
        hint: "je me + réveiller",
        expectedAnswer: "je me réveille",
        acceptableAnswers: ["je me reveille"],
      },
      {
        instruction: "Translate to French",
        prompt: "I get up",
        hint: "je me + lever",
        expectedAnswer: "je me lève",
        acceptableAnswers: ["je me leve"],
      },
      {
        instruction: "Translate to French",
        prompt: "I get dressed",
        hint: "je m' + habiller (elision!)",
        expectedAnswer: "je m'habille",
      },
      {
        instruction: "Translate to French",
        prompt: "I get ready for class",
        hint: "je me prépare + pour le cours",
        expectedAnswer: "je me prépare pour le cours",
        acceptableAnswers: ["je me prepare pour le cours"],
      },
      {
        instruction: "Translate to French",
        prompt: "You wake up at 7am (informal)",
        hint: "tu te réveilles + à + sept heures",
        expectedAnswer: "tu te réveilles à sept heures",
        acceptableAnswers: [
          "tu te reveilles a sept heures",
          "tu te réveilles à 7h",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "We get up early (using on)",
        hint: "on se lève + tôt",
        expectedAnswer: "on se lève tôt",
        acceptableAnswers: ["on se leve tot"],
      },

      // SECTION 5: Daily Reflexive Actions (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I remember",
        hint: "je me + souvenir (like venir)",
        expectedAnswer: "je me souviens",
      },
      {
        instruction: "Translate to French",
        prompt: "We're having fun (using on)",
        hint: "on s' + amuser",
        expectedAnswer: "on s'amuse",
      },
      {
        instruction: "Translate to French",
        prompt: "I'm hurrying",
        hint: "je me + dépêcher",
        expectedAnswer: "je me dépêche",
        acceptableAnswers: ["je me depeche"],
      },
      {
        instruction: "Translate to French",
        prompt: "Do you remember? (informal)",
        hint: "tu te souviens?",
        expectedAnswer: "tu te souviens",
      },

      // SECTION 6: Reflexive Past Tense (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I woke up",
        hint: "Past: je me suis + réveillé",
        expectedAnswer: "je me suis réveillé",
        acceptableAnswers: ["je me suis reveille", "je me suis réveillée"],
      },
      {
        instruction: "Translate to French",
        prompt: "She got up",
        hint: "Past: elle s'est + levée (feminine!)",
        expectedAnswer: "elle s'est levée",
        acceptableAnswers: ["elle s est levee"],
      },
      {
        instruction: "Translate to French",
        prompt: "We had fun",
        hint: "Past: on s'est + amusé",
        expectedAnswer: "on s'est amusé",
        acceptableAnswers: ["on s est amuse"],
      },
      {
        instruction: "Translate to French",
        prompt: "They got dressed (masculine)",
        hint: "Past: ils se sont + habillés (plural!)",
        expectedAnswer: "ils se sont habillés",
        acceptableAnswers: ["ils se sont habilles"],
      },

      // SECTION 7: Reciprocal (4 questions)
      {
        instruction: "Translate to French",
        prompt: "We love each other",
        hint: "nous nous + aimer",
        expectedAnswer: "nous nous aimons",
      },
      {
        instruction: "Translate to French",
        prompt: "We see each other (using on)",
        hint: "on se + voir",
        expectedAnswer: "on se voit",
      },
      {
        instruction: "Translate to French",
        prompt: "They talk to each other",
        hint: "ils se + parler",
        expectedAnswer: "ils se parlent",
      },
      {
        instruction: "Translate to French",
        prompt: "We'll see each other tomorrow",
        hint: "on se voit + demain",
        expectedAnswer: "on se voit demain",
      },

      // SECTION 8: Commands (6 questions)
      {
        instruction: "Give command: 'Eat!' (informal)",
        prompt: "Eat! (to a friend)",
        hint: "manger → drop tu and -s",
        expectedAnswer: "mange",
      },
      {
        instruction: "Give command: 'Listen!' (informal)",
        prompt: "Listen! (to a friend)",
        hint: "écouter → Écoute!",
        expectedAnswer: "écoute",
        acceptableAnswers: ["ecoute"],
      },
      {
        instruction: "Give command: 'Be nice!' (informal)",
        prompt: "Be nice! (to a friend)",
        hint: "Irregular: Sois + gentil!",
        expectedAnswer: "sois gentil",
      },
      {
        instruction: "Give command: 'Go ahead!' or 'Go for it!'",
        prompt: "Go ahead!",
        hint: "Famous phrase: Vas-y!",
        expectedAnswer: "vas-y",
        acceptableAnswers: ["vas y"],
      },
      {
        instruction: "Give command: 'Pay attention!' (informal)",
        prompt: "Pay attention!",
        hint: "Irregular: Fais + attention!",
        expectedAnswer: "fais attention",
      },
      {
        instruction: "Give command: 'Look at me!' (informal)",
        prompt: "Look at me!",
        hint: "Regarde-moi!",
        expectedAnswer: "regarde-moi",
        acceptableAnswers: ["regarde moi"],
      },
    ],
  },
};
