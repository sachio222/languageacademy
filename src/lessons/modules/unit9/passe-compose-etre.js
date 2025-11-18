/**
 * Module: Dynamic ID (auto-assigned)7: Passé Composé with être - DR & MRS VANDERTRAMP
 * Unit 9 - Motion and state-change verbs that use être instead of avoir
 * Essential for describing movement and changes
 */

export const passeComposeEtreModule = {
  moduleKey: "2024-05-31-passe-compose-etre", // Permanent identifier - never changes
  title: "être Verbs - DR & MRS VANDERTRAMP (went, came, left)",
  description:
    "Learn motion verbs that use 'être' in passé composé: je suis allé (I went), je suis venu (I came), je suis parti (I left), je suis arrivé (I arrived)",
  unit: 9,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Describe movement in the past (I went, I came, I left)",
      "Use être instead of avoir for motion verbs",
      "Master DR & MRS VANDERTRAMP verb patterns"
    ],
    realWorldUse: "tell stories about where you went",
    milestone: "Motion verb past tense mastery",
    nextModuleTeaser: "Learn past participle agreement rules"
  },

  concepts: [
    {
      term: "DR & MRS VANDERTRAMP - Mnemonic for être verbs",
      definition:
        "Motion and state-change verbs use ÊTRE (not avoir) in passé composé",
      example: "je suis allé (I went - with être!), NOT j'ai allé ❌",
    },
    {
      term: "Formation: être + past participle",
      definition: "Use present tense of être + past participle",
      example: "je suis allé, tu es venu, il est parti, elle est arrivée",
    },
    {
      term: "The DR & MRS VANDERTRAMP verbs",
      definition:
        "Descendre, Revenir, Mourir, Retourner, Sortir, Venir, Aller, Naître, Devenir, Entrer, Rentrer, Tomber, Rester, Arriver, Monter, Partir",
      example: "All motion/state-change verbs - use ÊTRE!",
    },
    {
      term: "Key motion verbs (most common)",
      definition:
        "aller (went), venir (came), partir (left), arriver (arrived), sortir (went out), entrer (entered), rentrer (returned home)",
      example: "Je suis allé au café, Je suis venu hier, Je suis parti tôt",
    },
    {
      term: "Agreement with subject (important!)",
      definition:
        "Past participle agrees with subject when using être (add e/s/es)",
      example: "Il est allé (masculine), Elle est allée (+ e for feminine)",
    },
    {
      term: "Negation: ne...pas around être",
      definition: "Place ne and pas around être (like with avoir)",
      example:
        "Je ne suis pas allé (I didn't go), Elle n'est pas venue (She didn't come)",
    },
  ],

  vocabularyReference: [
    {
      french: "je suis allé(e)",
      english: "I went",
      note: "⭐ aller → allé (uses être!)",
    },
    {
      french: "je suis venu(e)",
      english: "I came",
      note: "⭐ venir → venu (uses être!)",
    },
    {
      french: "je suis parti(e)",
      english: "I left",
      note: "⭐ partir → parti (uses être!)",
    },
    {
      french: "je suis arrivé(e)",
      english: "I arrived",
      note: "⭐ arriver → arrivé (uses être!)",
    },
    {
      french: "je suis sorti(e)",
      english: "I went out",
      note: "sortir → sorti (uses être!)",
    },
    {
      french: "je suis entré(e)",
      english: "I entered",
      note: "entrer → entré (uses être!)",
    },
    {
      french: "je suis rentré(e)",
      english: "I returned home / I came back",
      note: "rentrer → rentré (uses être!)",
    },
    {
      french: "je suis resté(e)",
      english: "I stayed",
      note: "rester → resté (uses être!)",
    },
    {
      french: "je suis monté(e)",
      english: "I went up / I climbed",
      note: "monter → monté (uses être!)",
    },
    {
      french: "je suis descendu(e)",
      english: "I went down / I got off",
      note: "descendre → descendu (uses être!)",
    },
    {
      french: "je suis tombé(e)",
      english: "I fell",
      note: "tomber → tombé (uses être!)",
    },
    {
      french: "je suis devenu(e)",
      english: "I became",
      note: "devenir → devenu (uses être!)",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Hier, je ___ au café (Yesterday, I went to the café) - Use 'aller' with ÊTRE!",
      answer: "suis allé",
      wrongAnswers: [
        {
          answer: "ai allé",
          feedback:
            "Aller uses ÊTRE, not avoir! Use 'je suis allé' (motion verb).",
        },
        {
          answer: "suis aller",
          feedback:
            "The past participle is 'allé' (with é): je suis allé, not 'aller'.",
        },
        {
          answer: "vais",
          feedback:
            "That's present/future! Use passé composé: je suis allé (I went).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu ___ hier? (Did you come yesterday?) - Use 'venir' with ÊTRE!",
      answer: "es venu",
      wrongAnswers: [
        {
          answer: "as venu",
          feedback:
            "Venir uses ÊTRE, not avoir! Use 'tu es venu' (motion verb).",
        },
        {
          answer: "viens",
          feedback:
            "That's present tense! Use passé composé: tu es venu (you came).",
        },
        {
          answer: "es venir",
          feedback:
            "The past participle is 'venu': tu es venu, not 'es venir'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Il ___ tôt (He left early) - Use 'partir' with ÊTRE!",
      answer: "est parti",
      wrongAnswers: [
        {
          answer: "a parti",
          feedback:
            "Partir uses ÊTRE, not avoir! Use 'il est parti' (motion verb).",
        },
        {
          answer: "part",
          feedback:
            "That's present tense! Use passé composé: il est parti (he left).",
        },
        {
          answer: "est partir",
          feedback:
            "The past participle is 'parti': il est parti, not 'est partir'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ hier soir (We arrived last night) - Use 'arriver' with ÊTRE!",
      answer: "sommes arrivés",
      wrongAnswers: [
        {
          answer: "avons arrivé",
          feedback:
            "Arriver uses ÊTRE, not avoir! Use 'nous sommes arrivés' (motion verb).",
        },
        {
          answer: "arrivons",
          feedback:
            "That's present tense! Use passé composé: nous sommes arrivés.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Vous ___ hier? (Did you go out yesterday?) - Use 'sortir' with ÊTRE!",
      answer: "êtes sortis",
      wrongAnswers: [
        {
          answer: "avez sorti",
          feedback:
            "Sortir uses ÊTRE, not avoir! Use 'vous êtes sortis' (motion verb).",
        },
        {
          answer: "sortez",
          feedback:
            "That's present tense! Use passé composé: vous êtes sortis.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elles ___ dans le café (They entered the café) - Use 'entrer' with ÊTRE!",
      answer: "sont entrées",
      wrongAnswers: [
        {
          answer: "ont entré",
          feedback:
            "Entrer uses ÊTRE, not avoir! Use 'elles sont entrées' (motion verb).",
        },
        {
          answer: "entrent",
          feedback:
            "That's present tense! Use passé composé: elles sont entrées.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ tard (We came home late / We returned late) - Use 'rentrer' with ÊTRE!",
      answer: "est rentré",
      wrongAnswers: [
        {
          answer: "a rentré",
          feedback:
            "Rentrer uses ÊTRE, not avoir! Use 'on est rentré' (motion verb).",
        },
        {
          answer: "rentre",
          feedback:
            "That's present tense! Use passé composé: on est rentré (we came home).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ à la maison (I stayed at home) - Use 'rester' with ÊTRE!",
      answer: "suis resté",
      wrongAnswers: [
        {
          answer: "ai resté",
          feedback:
            "Rester uses ÊTRE, not avoir! Use 'je suis resté' (state verb).",
        },
        {
          answer: "reste",
          feedback:
            "That's present tense! Use passé composé: je suis resté (I stayed).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu ___ dans le bus (You got on the bus / You went up into the bus) - Use 'monter' with ÊTRE!",
      answer: "es monté",
      wrongAnswers: [
        {
          answer: "as monté",
          feedback:
            "Monter uses ÊTRE, not avoir! Use 'tu es monté' (motion verb).",
        },
        {
          answer: "montes",
          feedback:
            "That's present tense! Use passé composé: tu es monté (you got on).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ du train (She got off the train) - Use 'descendre' with ÊTRE!",
      answer: "est descendue",
      wrongAnswers: [
        {
          answer: "a descendu",
          feedback:
            "Descendre uses ÊTRE, not avoir! Use 'elle est descendue' (motion verb).",
        },
        {
          answer: "descend",
          feedback:
            "That's present tense! Use passé composé: elle est descendue.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Je ___ (I fell) - Use 'tomber' with ÊTRE!",
      answer: "suis tombé",
      wrongAnswers: [
        {
          answer: "ai tombé",
          feedback:
            "Tomber uses ÊTRE, not avoir! Use 'je suis tombé' (motion verb).",
        },
        {
          answer: "tombe",
          feedback:
            "That's present tense! Use passé composé: je suis tombé (I fell).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il ___ professeur (He became a teacher) - Use 'devenir' with ÊTRE!",
      answer: "est devenu",
      wrongAnswers: [
        {
          answer: "a devenu",
          feedback:
            "Devenir uses ÊTRE, not avoir! Use 'il est devenu' (state-change verb).",
        },
        {
          answer: "devient",
          feedback:
            "That's present tense! Use passé composé: il est devenu (he became).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ne ___ pas ___ (I didn't go) - Use 'aller' with ÊTRE!",
      answer: "suis pas allé",
      wrongAnswers: [
        {
          answer: "ai pas allé",
          feedback:
            "Aller uses ÊTRE! Use 'je ne suis pas allé', not 'ai pas allé'.",
        },
        {
          answer: "vais pas",
          feedback:
            "That's present tense! Use passé composé: je ne suis pas allé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ en France (We went to France) - Use 'aller' with ÊTRE!",
      answer: "sommes allés",
      wrongAnswers: [
        {
          answer: "avons allé",
          feedback:
            "Aller uses ÊTRE, not avoir! Use 'nous sommes allés' (motion verb).",
        },
        {
          answer: "allons",
          feedback:
            "That's present tense! Use passé composé: nous sommes allés (we went).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ hier (They came yesterday) - Use 'venir' with ÊTRE!",
      answer: "sont venus",
      wrongAnswers: [
        {
          answer: "ont venu",
          feedback:
            "Venir uses ÊTRE, not avoir! Use 'ils sont venus' (motion verb).",
        },
        {
          answer: "viennent",
          feedback:
            "That's present tense! Use passé composé: ils sont venus (they came).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ vous ___ en vacances? (Did you go on vacation?) - Use 'partir' with ÊTRE!",
      answer: "Êtes partis",
      wrongAnswers: [
        {
          answer: "Avez parti",
          feedback:
            "Partir uses ÊTRE, not avoir! Use 'êtes-vous partis?' (motion verb).",
        },
        {
          answer: "Partez",
          feedback:
            "That's present tense! Use passé composé: êtes-vous partis?",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ à 8h (We arrived at 8 o'clock) - Use 'arriver' with ÊTRE!",
      answer: "est arrivé",
      wrongAnswers: [
        {
          answer: "a arrivé",
          feedback:
            "Arriver uses ÊTRE, not avoir! Use 'on est arrivé' (motion verb).",
        },
        {
          answer: "arrive",
          feedback:
            "That's present tense! Use passé composé: on est arrivé (we arrived).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ne ___ pas ___ (She didn't come) - Use 'venir' with ÊTRE!",
      answer: "est pas venue",
      wrongAnswers: [
        {
          answer: "a pas venu",
          feedback:
            "Venir uses ÊTRE! Use 'elle n'est pas venue', not 'a pas venu'.",
        },
        {
          answer: "vient pas",
          feedback:
            "That's present tense! Use passé composé: elle n'est pas venue.",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Je ___ au café (I went to the café)",
    "Tu ___ hier? (Did you come yesterday?)",
    "Il ___ tôt (He left early)",
    "Nous ___ hier soir (We arrived last night)",
    "Vous ___ ? (Did you go out?)",
    "Elles ___ dans le café (They entered the café)",
    "On ___ tard (We came home late)",
    "Je ___ à la maison (I stayed at home)",
    "Elle ___ du train (She got off the train)",
    "Je ne ___ pas ___ (I didn't go)",
  ],
};
