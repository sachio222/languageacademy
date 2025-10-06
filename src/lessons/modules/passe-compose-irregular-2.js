/**
 * Module 106: Passé Composé - Irregular Past Participles (Set 2)
 * Unit 9 - Modal verbs and common -RE verbs in past tense
 * vouloir, pouvoir, devoir, dire, prendre, mettre, comprendre, apprendre
 */

export const passeComposeIrregular2Module = {
  title: "Irregular Past Participles - Set 2 (wanted, could, had to, said)",
  description:
    "Learn modal verbs and -RE verbs in past tense: vouloir → voulu (wanted), pouvoir → pu (could), devoir → dû (had to), dire → dit (said), prendre → pris (took)",
  unit: 9,

  concepts: [
    {
      term: "Modal verbs with -u ending",
      definition: "vouloir → voulu, pouvoir → pu, devoir → dû (all end in -u)",
      example:
        "J'ai voulu partir (I wanted to leave), J'ai pu venir (I could come), J'ai dû travailler (I had to work)",
    },
    {
      term: "dire → dit (said)",
      definition: "Irregular past participle: j'ai dit, tu as dit, il a dit",
      example: "J'ai dit oui (I said yes), Tu as dit non (You said no)",
    },
    {
      term: "prendre family → -is ending",
      definition: "prendre → pris, comprendre → compris, apprendre → appris",
      example:
        "J'ai pris le bus (I took the bus), J'ai compris (I understood), J'ai appris le français (I learned French)",
    },
    {
      term: "mettre → mis (put)",
      definition: "Irregular past participle: j'ai mis, tu as mis, il a mis",
      example:
        "J'ai mis mon manteau (I put on my coat), J'ai mis ça là (I put that there)",
    },
    {
      term: "Modal verbs + infinitive in past",
      definition: "Modal verbs can be followed by infinitives in past tense",
      example:
        "J'ai voulu aller (I wanted to go), J'ai pu venir (I was able to come), J'ai dû partir (I had to leave)",
    },
    {
      term: "All use AVOIR as auxiliary",
      definition: "All these verbs use 'avoir' (not être) in passé composé",
      example: "j'ai voulu, j'ai pu, j'ai dû, j'ai dit, j'ai pris, j'ai mis",
    },
  ],

  vocabularyReference: [
    {
      french: "j'ai voulu",
      english: "I wanted",
      verb: "vouloir → voulu",
      example: "J'ai voulu partir",
    },
    {
      french: "j'ai pu",
      english: "I could / I was able to",
      verb: "pouvoir → pu",
      example: "J'ai pu venir",
    },
    {
      french: "j'ai dû",
      english: "I had to / I must have",
      verb: "devoir → dû",
      example: "J'ai dû travailler",
    },
    {
      french: "j'ai dit",
      english: "I said",
      verb: "dire → dit",
      example: "J'ai dit oui",
    },
    {
      french: "j'ai pris",
      english: "I took",
      verb: "prendre → pris",
      example: "J'ai pris le bus",
    },
    {
      french: "j'ai mis",
      english: "I put",
      verb: "mettre → mis",
      example: "J'ai mis mon manteau",
    },
    {
      french: "j'ai compris",
      english: "I understood",
      verb: "comprendre → compris",
      example: "J'ai compris la leçon",
    },
    {
      french: "j'ai appris",
      english: "I learned",
      verb: "apprendre → appris",
      example: "J'ai appris le français",
    },
    {
      french: "le manteau",
      english: "the coat",
      usage: "noun",
      example: "mettre son manteau",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ partir mais je n'ai pas pu (I wanted to leave but I couldn't) - Use 'vouloir'",
      answer: "ai voulu",
      wrongAnswers: [
        {
          answer: "ai vouloir",
          feedback: "The past participle of vouloir is 'voulu': j'ai voulu.",
        },
        {
          answer: "voulais",
          feedback:
            "That's imparfait! Use passé composé: j'ai voulu (I wanted).",
        },
        {
          answer: "ai pu",
          feedback:
            "'Pu' is for pouvoir (could)! Use 'voulu' for vouloir (wanted).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu ___ venir? (Could you come? / Were you able to come?) - Use 'pouvoir'",
      answer: "as pu",
      wrongAnswers: [
        {
          answer: "as pouvoir",
          feedback: "The past participle of pouvoir is 'pu': tu as pu.",
        },
        {
          answer: "peux",
          feedback:
            "That's present tense! Use passé composé: tu as pu (you could).",
        },
        {
          answer: "pouvais",
          feedback:
            "That's imparfait! Use passé composé: tu as pu (you were able to).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ travailler hier (She had to work yesterday) - Use 'devoir'",
      answer: "a dû",
      wrongAnswers: [
        {
          answer: "a devoir",
          feedback: "The past participle of devoir is 'dû': elle a dû.",
        },
        {
          answer: "doit",
          feedback:
            "That's present tense! Use passé composé: elle a dû (she had to).",
        },
        {
          answer: "devait",
          feedback:
            "That's imparfait! Use passé composé: elle a dû (she had to).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: J'___ oui (I said yes) - Use 'dire'",
      answer: "ai dit",
      wrongAnswers: [
        {
          answer: "ai dire",
          feedback: "The past participle of dire is 'dit': j'ai dit.",
        },
        {
          answer: "dis",
          feedback:
            "That's present tense! Use passé composé: j'ai dit (I said).",
        },
        {
          answer: "disais",
          feedback:
            "That's imparfait! Use passé composé: j'ai dit (I said yes).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Nous ___ le bus (We took the bus) - Use 'prendre'",
      answer: "avons pris",
      wrongAnswers: [
        {
          answer: "avons prendre",
          feedback:
            "The past participle of prendre is 'pris': nous avons pris.",
        },
        {
          answer: "prenons",
          feedback:
            "That's present tense! Use passé composé: nous avons pris (we took).",
        },
        {
          answer: "prenions",
          feedback:
            "That's imparfait! Use passé composé: nous avons pris (we took).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Vous ___ mon manteau? (Did you put my coat somewhere?) - Use 'mettre'",
      answer: "avez mis",
      wrongAnswers: [
        {
          answer: "avez mettre",
          feedback: "The past participle of mettre is 'mis': vous avez mis.",
        },
        {
          answer: "mettez",
          feedback:
            "That's present tense! Use passé composé: vous avez mis (you put).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ la leçon (They understood the lesson) - Use 'comprendre'",
      answer: "ont compris",
      wrongAnswers: [
        {
          answer: "ont comprendre",
          feedback:
            "The past participle of comprendre is 'compris': ils ont compris.",
        },
        {
          answer: "comprennent",
          feedback:
            "That's present tense! Use passé composé: ils ont compris (they understood).",
        },
        {
          answer: "ont pris",
          feedback:
            "'Pris' is for prendre (took)! Use 'compris' for comprendre (understood).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ le français (We learned French) - Use 'apprendre'",
      answer: "a appris",
      wrongAnswers: [
        {
          answer: "a apprendre",
          feedback:
            "The past participle of apprendre is 'appris': on a appris.",
        },
        {
          answer: "apprend",
          feedback:
            "That's present tense! Use passé composé: on a appris (we learned).",
        },
        {
          answer: "a pris",
          feedback:
            "'Pris' is for prendre (took)! Use 'appris' for apprendre (learned).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je n'___ pas ___ aller (I couldn't go / I wasn't able to go) - Use 'pouvoir'",
      answer: "ai pas pu",
      wrongAnswers: [
        {
          answer: "ai pas pouvoir",
          feedback: "The past participle of pouvoir is 'pu': je n'ai pas pu.",
        },
        {
          answer: "peux pas",
          feedback:
            "That's present tense! Use passé composé: je n'ai pas pu aller.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu n'___ pas ___ venir? (Didn't you want to come?) - Use 'vouloir'",
      answer: "as pas voulu",
      wrongAnswers: [
        {
          answer: "as pas vouloir",
          feedback:
            "The past participle of vouloir is 'voulu': tu n'as pas voulu.",
        },
        {
          answer: "veux pas",
          feedback:
            "That's present tense! Use passé composé: tu n'as pas voulu venir?",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ partir tôt (She had to leave early) - Use 'devoir'",
      answer: "a dû",
      wrongAnswers: [
        {
          answer: "a devoir",
          feedback: "The past participle of devoir is 'dû': elle a dû.",
        },
        {
          answer: "doit",
          feedback:
            "That's present tense! Use passé composé: elle a dû partir.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Qu'est-ce que tu ___ ? (What did you say?) - Use 'dire'",
      answer: "as dit",
      wrongAnswers: [
        {
          answer: "as dire",
          feedback: "The past participle of dire is 'dit': tu as dit.",
        },
        {
          answer: "dis",
          feedback:
            "That's present tense! Use passé composé: tu as dit (you said).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ un café (I had a coffee / I took a coffee) - Use 'prendre'",
      answer: "ai pris",
      wrongAnswers: [
        {
          answer: "ai prendre",
          feedback: "The past participle of prendre is 'pris': j'ai pris.",
        },
        {
          answer: "prends",
          feedback:
            "That's present tense! Use passé composé: j'ai pris (I had/took).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ nos livres sur la table (We put our books on the table) - Use 'mettre'",
      answer: "avons mis",
      wrongAnswers: [
        {
          answer: "avons mettre",
          feedback: "The past participle of mettre is 'mis': nous avons mis.",
        },
        {
          answer: "mettons",
          feedback:
            "That's present tense! Use passé composé: nous avons mis (we put).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Vous ___ ? (Did you understand?) - Use 'comprendre'",
      answer: "avez compris",
      wrongAnswers: [
        {
          answer: "avez comprendre",
          feedback:
            "The past participle of comprendre is 'compris': vous avez compris.",
        },
        {
          answer: "comprenez",
          feedback:
            "That's present tense! Use passé composé: vous avez compris (you understood).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ beaucoup (They learned a lot) - Use 'apprendre'",
      answer: "ont appris",
      wrongAnswers: [
        {
          answer: "ont apprendre",
          feedback:
            "The past participle of apprendre is 'appris': ils ont appris.",
        },
        {
          answer: "apprennent",
          feedback:
            "That's present tense! Use passé composé: ils ont appris (they learned).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: On ___ non (We said no / One said no) - Use 'dire'",
      answer: "a dit",
      wrongAnswers: [
        {
          answer: "a dire",
          feedback: "The past participle of dire is 'dit': on a dit.",
        },
        {
          answer: "dit",
          feedback:
            "You need the auxiliary 'a'! It's 'on a dit non', not just 'dit non'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ aller au cinéma mais je n'ai pas eu le temps (I wanted to go to the cinema but I didn't have time) - Use 'vouloir'",
      answer: "ai voulu",
      wrongAnswers: [
        {
          answer: "ai vouloir",
          feedback:
            "The past participle of vouloir is 'voulu': j'ai voulu aller.",
        },
        {
          answer: "voulais",
          feedback:
            "That's imparfait! Use passé composé: j'ai voulu (I wanted).",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "J'___ partir (I wanted to leave)",
    "Tu ___ venir? (Could you come?)",
    "Elle ___ travailler (She had to work)",
    "J'___ oui (I said yes)",
    "Nous ___ le bus (We took the bus)",
    "Vous ___ mon manteau? (Did you put my coat?)",
    "Ils ___ la leçon (They understood the lesson)",
    "On ___ le français (We learned French)",
    "Je n'___ pas ___ (I couldn't)",
    "Qu'est-ce que tu ___ ? (What did you say?)",
  ],
};
