/**
 * Unit 3 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 3 material
 */

export const unit3Practice = {
  moduleKey: "2024-02-04-unit3-practice", // Permanent identifier - never changes
  title: "Unit 3 Practice - Fill in the Blanks",
  description:
    "Master contractions, motion verbs, object pronouns, and possessive forms from Unit 3!",

  // Special flags
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Compose sentences with motion verbs and object pronouns",
      "Use possessives and contractions naturally",
      "Apply Unit 3 advanced structures in context"
    ],
    realWorldUse: "form sophisticated French sentences",
    nextModuleTeaser: "Take the Unit 3 exam to prove your mastery"
  },

  concepts: [
    {
      term: "Movement & Possession Practice",
      definition:
        "Interactive exercises to master advanced French structures through contextual application",
      example:
        "Practice au café, je viens, tu vas, je le vois, mon livre, c'est le tien in real sentence contexts",
    },
    {
      term: "Motion Verb Fluency",
      definition:
        "Build automaticity with the three essential motion verbs through varied practice",
      example:
        "venir (come) + aller (go) + partir (leave) in different contexts: je viens au café, tu vas à la maison, il part maintenant",
    },
    {
      term: "Pronoun Mastery",
      definition:
        "Learn to use object pronouns and possessives naturally in conversation",
      example:
        "Object pronouns (le, la, les, me, te) + possessive adjectives (mon, ma, mes, ton, ta) + possessive pronouns (le mien, la tienne)",
    },
  ],
  vocabularyReference: [],

  // Sentences with blanks to fill in
  sentences: [
    // Contractions - au (à + le)
    {
      text: "Je vais  café.",
      instruction: "Complete: 'I go to the café' (use contraction)",
      blanks: [
        {
          position: 7,
          answer: "au",
          hint: "à + le = ?",
        },
      ],
    },

    // Contractions - du (de + le)
    {
      text: "Il vient  restaurant.",
      instruction: "Complete: 'He comes from the restaurant' (use contraction)",
      blanks: [
        {
          position: 9,
          answer: "du",
          hint: "de + le = ?",
        },
      ],
    },

    // Aller - tu
    {
      text: "Tu  à Paris.",
      instruction: "Complete: 'You go to Paris'",
      blanks: [
        {
          position: 3,
          answer: "vas",
          hint: "aller conjugated for tu",
        },
      ],
    },

    // Venir - je
    {
      text: "Je  de la maison.",
      instruction: "Complete: 'I come from the house'",
      blanks: [
        {
          position: 3,
          answer: "viens",
          hint: "venir conjugated for je",
        },
      ],
    },

    // Partir - nous
    {
      text: "Nous  demain.",
      instruction: "Complete: 'We leave tomorrow'",
      blanks: [
        {
          position: 5,
          answer: "partons",
          hint: "partir conjugated for nous",
        },
      ],
    },

    // Voir - je
    {
      text: "Je  le chat.",
      instruction: "Complete: 'I see the cat'",
      blanks: [
        {
          position: 3,
          answer: "vois",
          hint: "voir conjugated for je",
        },
      ],
    },

    // Object pronoun - le
    {
      text: "Je  vois.",
      instruction: "Complete: 'I see it/him' (masculine)",
      blanks: [
        {
          position: 3,
          answer: "le",
          hint: "object pronoun for masculine singular",
        },
      ],
    },

    // Object pronoun - la
    {
      text: "Tu  vois.",
      instruction: "Complete: 'You see it/her' (feminine)",
      blanks: [
        {
          position: 3,
          answer: "la",
          hint: "object pronoun for feminine singular",
        },
      ],
    },

    // Possessive adjective - mon
    {
      text: "C'est  livre.",
      instruction: "Complete: 'It's my book' (masculine)",
      blanks: [
        {
          position: 6,
          answer: "mon",
          hint: "possessive adjective for 'my' (masculine)",
        },
      ],
    },

    // Possessive adjective - ton
    {
      text: "J'ai  chat.",
      instruction: "Complete: 'I have your cat' (masculine)",
      blanks: [
        {
          position: 5,
          answer: "ton",
          hint: "possessive adjective for 'your' (masculine)",
        },
      ],
    },

    // Possessive adjective - sa
    {
      text: "Il voit  maison.",
      instruction: "Complete: 'He sees his house' (feminine)",
      blanks: [
        {
          position: 8,
          answer: "sa",
          hint: "possessive adjective for 'his/her' (feminine)",
        },
      ],
    },

    // Possessive pronoun - le mien
    {
      text: "C'est  .",
      instruction: "Complete: 'It's mine' (masculine)",
      blanks: [
        {
          position: 6,
          answer: "le mien",
          hint: "possessive pronoun for 'mine' (masculine)",
        },
      ],
    },

    // Multiple blanks: aller + contraction
    {
      text: "Tu  parc.",
      instruction: "Complete: 'You go to the park' (use contraction)",
      blanks: [
        {
          position: 2,
          answer: "vas",
          hint: "aller conjugated for tu",
        },
        {
          position: 3,
          answer: "au",
          hint: "à + le = ?",
        },
      ],
    },

    // Multiple blanks: voir + object pronoun
    {
      text: "Je    .",
      instruction: "Complete: 'I see them' (plural)",
      blanks: [
        {
          position: 3,
          answer: "les",
          hint: "object pronoun for plural",
        },
        {
          position: 5,
          answer: "vois",
          hint: "voir conjugated for je",
        },
      ],
    },

    // Multiple blanks: venir + contraction
    {
      text: "Elle    magasin.",
      instruction: "Complete: 'She comes from the store' (use contraction)",
      blanks: [
        {
          position: 5,
          answer: "vient",
          hint: "venir conjugated for elle",
        },
        {
          position: 7,
          answer: "du",
          hint: "de + le = ?",
        },
      ],
    },

    // Multiple blanks: possessive adjective + noun
    {
      text: "Nous voulons voir  livre et  maison.",
      instruction: "Complete: 'We want to see your book and your house'",
      blanks: [
        {
          position: 18,
          answer: "ton",
          hint: "possessive for 'your' (masculine)",
        },
        {
          position: 28,
          answer: "ta",
          hint: "possessive for 'your' (feminine)",
        },
      ],
    },

    // Multiple blanks: aller + possessive plural
    {
      text: "Ils  avec    amis.",
      instruction: "Complete: 'They go with their friends'",
      blanks: [
        {
          position: 4,
          answer: "vont",
          hint: "aller conjugated for ils",
        },
        {
          position: 11,
          answer: "ses",
          hint: "possessive for 'his/her/their' (plural)",
        },
      ],
    },

    // Complex: object pronoun + voir + contraction
    {
      text: "Je  vois  café.",
      instruction: "Complete: 'I see it at the café' (use contraction)",
      blanks: [
        {
          position: 3,
          answer: "le",
          hint: "object pronoun for masculine singular",
        },
        {
          position: 9,
          answer: "au",
          hint: "à + le = ?",
        },
      ],
    },

    // Complex: partir + possessive + contraction
    {
      text: "Tu  avec   livre   restaurant.",
      instruction: "Complete: 'You leave with your book to the restaurant'",
      blanks: [
        {
          position: 3,
          answer: "pars",
          hint: "partir conjugated for tu",
        },
        {
          position: 9,
          answer: "ton",
          hint: "possessive for 'your' (masculine)",
        },
        {
          position: 18,
          answer: "au",
          hint: "à + le = ?",
        },
      ],
    },

    // Complex: possessive pronoun question
    {
      text: "Est-ce  ou le tien ?",
      instruction: "Complete: 'Is it mine or yours?' (masculine)",
      blanks: [
        {
          position: 7,
          answer: "le mien",
          hint: "possessive pronoun for 'mine' (masculine)",
        },
      ],
    },
  ],

  // Empty exercises array - not used for fill-in-blank
  exercises: [],
};
