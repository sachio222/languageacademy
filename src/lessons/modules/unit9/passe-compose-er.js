/**
 * Module 104: Passé Composé Foundation - Regular -ER Verbs
 * Unit 9 - Talk about completed actions in the past
 * Foundation for all past tense storytelling
 */

export const passeComposeERModule = {
  moduleKey: "2024-05-30-passe-compose-er", // Permanent identifier - never changes
  title: "Passé Composé - Regular -ER Verbs (I spoke, I ate)",
  description:
    "Learn to talk about completed past actions with regular -ER verbs: j'ai parlé (I spoke), j'ai mangé (I ate), j'ai étudié (I studied)",
  unit: 9,

  concepts: [
    {
      term: "Passé Composé = avoir + past participle",
      definition:
        "Compound past tense for completed actions: auxiliary verb 'avoir' + past participle",
      example:
        "j'ai parlé (I spoke), tu as mangé (you ate), il a étudié (he studied)",
    },
    {
      term: "Regular -ER verbs → -é past participle",
      definition:
        "Remove -er, add -é: parler → parlé, manger → mangé, étudier → étudié",
      example:
        "parler → parlé (spoken), manger → mangé (eaten), aimer → aimé (loved)",
    },
    {
      term: "Formation: j'ai + past participle",
      definition: "Use present tense of avoir + past participle ending in -é",
      example:
        "j'ai parlé, tu as parlé, il/elle a parlé, nous avons parlé, vous avez parlé, ils/elles ont parlé",
    },
    {
      term: "Negation: ne...pas around avoir",
      definition: "Place ne and pas around the auxiliary verb avoir",
      example:
        "je n'ai pas parlé (I didn't speak), tu n'as pas mangé (you didn't eat)",
    },
    {
      term: "Questions: inversion or Est-ce que",
      definition: "Invert avoir with subject, or use est-ce que",
      example:
        "As-tu parlé? (Did you speak?), Est-ce que tu as mangé? (Did you eat?)",
    },
    {
      term: "When to use Passé Composé",
      definition:
        "For specific completed actions in the past, countable events",
      example:
        "Hier, j'ai parlé avec Marie (Yesterday, I spoke with Marie), J'ai mangé à 8h (I ate at 8)",
    },
  ],

  vocabularyReference: [
    {
      french: "j'ai parlé",
      english: "I spoke / I have spoken",
      note: "⭐ regular -ER verb pattern",
    },
    {
      french: "j'ai mangé",
      english: "I ate / I have eaten",
      note: "⭐ very common - manger → mangé",
    },
    {
      french: "j'ai étudié",
      english: "I studied / I have studied",
      note: "étudier → étudié",
    },
    {
      french: "j'ai aimé",
      english: "I loved / I liked",
      note: "⭐ aimer → aimé",
    },
    {
      french: "j'ai cherché",
      english: "I looked for / I searched",
      note: "chercher → cherché",
    },
    {
      french: "j'ai trouvé",
      english: "I found",
      note: "⭐ trouver → trouvé",
    },
    {
      french: "j'ai travaillé",
      english: "I worked",
      note: "⭐ travailler → travaillé",
      example: "J'ai travaillé hier",
    },
    {
      french: "j'ai écouté",
      english: "I listened",
      note: "écouter → écouté",
      usage: "past action",
      example: "J'ai écouté de la musique",
    },
    {
      french: "j'ai regardé",
      english: "I watched / I looked at",
      usage: "past action",
      example: "J'ai regardé la télé",
    },
    {
      french: "j'ai demandé",
      english: "I asked",
      usage: "past action",
      example: "J'ai demandé une question",
    },
    {
      french: "hier",
      english: "yesterday",
      usage: "time marker",
      example: "Hier, j'ai mangé",
    },
    {
      french: "déjà",
      english: "already",
      usage: "adverb (between avoir and past participle)",
      example: "J'ai déjà mangé",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Hier, j'___ français (Yesterday, I spoke French) - Use 'parler'",
      answer: "ai parlé",
      wrongAnswers: [
        {
          answer: "ai parler",
          feedback:
            "Remove -er and add -é! The past participle is 'parlé', not 'parler'.",
        },
        {
          answer: "parle",
          feedback:
            "That's present tense! Use passé composé: j'ai parlé (I spoke).",
        },
        {
          answer: "parlais",
          feedback:
            "That's imparfait! Use passé composé for specific past action: j'ai parlé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu ___ au restaurant (You ate at the restaurant) - Use 'manger'",
      answer: "as mangé",
      wrongAnswers: [
        {
          answer: "manges",
          feedback:
            "That's present tense! Use passé composé: tu as mangé (you ate).",
        },
        {
          answer: "as manger",
          feedback:
            "Change -er to -é! The past participle is 'mangé', not 'manger'.",
        },
        {
          answer: "a mangé",
          feedback:
            "'A' is for il/elle! Use 'as' for 'tu': tu as mangé (you ate).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ le français (She studied French) - Use 'étudier'",
      answer: "a étudié",
      wrongAnswers: [
        {
          answer: "étudie",
          feedback:
            "That's present tense! Use passé composé: elle a étudié (she studied).",
        },
        {
          answer: "as étudié",
          feedback:
            "'As' is for 'tu'! Use 'a' for il/elle: elle a étudié (she studied).",
        },
        {
          answer: "a étudier",
          feedback:
            "Change -er to -é! The past participle is 'étudié', not 'étudier'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ à Paris (We traveled to Paris) - Use 'voyager'",
      answer: "avons voyagé",
      wrongAnswers: [
        {
          answer: "voyageons",
          feedback:
            "That's present tense! Use passé composé: nous avons voyagé (we traveled).",
        },
        {
          answer: "avons voyager",
          feedback:
            "Change -er to -é! The past participle is 'voyagé', not 'voyager'.",
        },
        {
          answer: "avez voyagé",
          feedback:
            "'Avez' is for 'vous'! Use 'avons' for nous: nous avons voyagé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Vous ___ mes clés? (Did you look for my keys?) - Use 'chercher'",
      answer: "avez cherché",
      wrongAnswers: [
        {
          answer: "cherchez",
          feedback:
            "That's present tense! Use passé composé: vous avez cherché (you looked for).",
        },
        {
          answer: "avez chercher",
          feedback:
            "Change -er to -é! The past participle is 'cherché', not 'chercher'.",
        },
        {
          answer: "avons cherché",
          feedback:
            "'Avons' is for 'nous'! Use 'avez' for vous: vous avez cherché.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ la réponse (They found the answer) - Use 'trouver'",
      answer: "ont trouvé",
      wrongAnswers: [
        {
          answer: "trouvent",
          feedback:
            "That's present tense! Use passé composé: ils ont trouvé (they found).",
        },
        {
          answer: "ont trouver",
          feedback:
            "Change -er to -é! The past participle is 'trouvé', not 'trouver'.",
        },
        {
          answer: "avez trouvé",
          feedback:
            "'Avez' is for 'vous'! Use 'ont' for ils/elles: ils ont trouvé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je n'___ pas ___ le film (I didn't like the movie) - Use 'aimer'",
      answer: "ai pas aimé",
      wrongAnswers: [
        {
          answer: "ai pas aimer",
          feedback:
            "Change -er to -é! The past participle is 'aimé', not 'aimer'.",
        },
        {
          answer: "aime pas",
          feedback:
            "That's present tense! Use passé composé: je n'ai pas aimé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu n'___ pas ___ hier (You didn't work yesterday) - Use 'travailler'",
      answer: "as pas travaillé",
      wrongAnswers: [
        {
          answer: "as pas travailler",
          feedback:
            "Change -er to -é! The past participle is 'travaillé', not 'travailler'.",
        },
        {
          answer: "travailles pas",
          feedback:
            "That's present tense! Use passé composé: tu n'as pas travaillé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Est-ce que vous ___ de la musique? (Did you listen to music?) - Use 'écouter'",
      answer: "avez écouté",
      wrongAnswers: [
        {
          answer: "écoutez",
          feedback:
            "That's present tense! Use passé composé: vous avez écouté.",
        },
        {
          answer: "avez écouter",
          feedback:
            "Change -er to -é! The past participle is 'écouté', not 'écouter'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ la télé hier soir (We watched TV last night) - Use 'regarder'",
      answer: "a regardé",
      wrongAnswers: [
        {
          answer: "regarde",
          feedback:
            "That's present tense! Use passé composé: on a regardé (we watched).",
        },
        {
          answer: "a regarder",
          feedback:
            "Change -er to -é! The past participle is 'regardé', not 'regarder'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ une question (I asked a question) - Use 'demander'",
      answer: "ai demandé",
      wrongAnswers: [
        {
          answer: "ai demander",
          feedback:
            "Change -er to -é! The past participle is 'demandé', not 'demander'.",
        },
        {
          answer: "demande",
          feedback:
            "That's present tense! Use passé composé: j'ai demandé (I asked).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il ___ à l'université (He studied at the university) - Use 'étudier'",
      answer: "a étudié",
      wrongAnswers: [
        {
          answer: "étudie",
          feedback:
            "That's present tense! Use passé composé: il a étudié (he studied).",
        },
        {
          answer: "a étudier",
          feedback:
            "Change -er to -é! The past participle is 'étudié', not 'étudier'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Nous n'___ pas ___ (We didn't eat) - Use 'manger'",
      answer: "avons pas mangé",
      wrongAnswers: [
        {
          answer: "avons pas manger",
          feedback:
            "Change -er to -é! The past participle is 'mangé', not 'manger'.",
        },
        {
          answer: "mangeons pas",
          feedback:
            "That's present tense! Use passé composé: nous n'avons pas mangé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Elles ___ français (They spoke French) - Use 'parler'",
      answer: "ont parlé",
      wrongAnswers: [
        {
          answer: "parlent",
          feedback:
            "That's present tense! Use passé composé: elles ont parlé (they spoke).",
        },
        {
          answer: "ont parler",
          feedback:
            "Change -er to -é! The past participle is 'parlé', not 'parler'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ tu ___ le livre? (Did you find the book?) - Use 'trouver'",
      answer: "As trouvé",
      wrongAnswers: [
        {
          answer: "Trouves",
          feedback:
            "That's present tense! Use passé composé: As-tu trouvé? (Did you find?)",
        },
        {
          answer: "As trouver",
          feedback:
            "Change -er to -é! The past participle is 'trouvé', not 'trouver'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: J'___ déjà ___ (I already ate) - Use 'manger'",
      answer: "ai déjà mangé",
      wrongAnswers: [
        {
          answer: "ai mangé déjà",
          feedback:
            "Déjà goes BETWEEN avoir and the past participle: j'ai déjà mangé.",
        },
        {
          answer: "ai déjà manger",
          feedback:
            "Change -er to -é! The past participle is 'mangé', not 'manger'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ tard hier (We worked late yesterday) - Use 'travailler'",
      answer: "a travaillé",
      wrongAnswers: [
        {
          answer: "travaille",
          feedback:
            "That's present tense! Use passé composé: on a travaillé (we worked).",
        },
        {
          answer: "a travailler",
          feedback:
            "Change -er to -é! The past participle is 'travaillé', not 'travailler'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Vous ___ bien? (Did you travel well?) - Use 'voyager'",
      answer: "avez voyagé",
      wrongAnswers: [
        {
          answer: "voyagez",
          feedback:
            "That's present tense! Use passé composé: vous avez voyagé (you traveled).",
        },
        {
          answer: "avez voyager",
          feedback:
            "Change -er to -é! The past participle is 'voyagé', not 'voyager'.",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Hier, j'___ français (Yesterday, I spoke French)",
    "Tu ___ au restaurant (You ate at the restaurant)",
    "Elle ___ le français (She studied French)",
    "Nous ___ à Paris (We traveled to Paris)",
    "Vous ___ mes clés? (Did you look for my keys?)",
    "Ils ___ la réponse (They found the answer)",
    "Je n'___ pas ___ le film (I didn't like the movie)",
    "On ___ la télé (We watched TV)",
    "J'___ une question (I asked a question)",
    "Elles ___ bien (They traveled well)",
  ],
};
