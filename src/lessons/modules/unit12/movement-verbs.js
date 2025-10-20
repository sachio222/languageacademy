/**
 * Module 152: Movement Verbs - Actions in Nature
 * Unit 12 - Essential movement verbs for describing how animals and people move
 */

export const movementVerbsModule = {
  title: "Movement Verbs - Actions in Nature",
  description:
    "Learn how things move: nager (to swim), sauter (to jump), voler (to fly), courir (to run), marcher (to walk), grimper (to climb)",
  unit: 12,

  concepts: [
    {
      term: "Six Essential Movement Verbs",
      definition:
        "These verbs describe all basic types of movement in nature and daily life",
      example:
        "nager (swim), sauter (jump), voler (fly), courir (run), marcher (walk), grimper (climb)",
    },
    {
      term: "Regular -ER Verbs Pattern",
      definition:
        "Most movement verbs follow the regular -ER pattern you already know",
      example:
        "nager: je nage, tu nages, il nage, nous nageons, vous nagez, ils nagent",
    },
    {
      term: "courir - Irregular -IR Verb",
      definition:
        "Courir (to run) is irregular but common - memorize the pattern",
      example:
        "je cours, tu cours, il court, nous courons, vous courez, ils courent",
    },
    {
      term: "Animals + Movement",
      definition: "Combine with animal vocabulary to describe how animals move",
      example:
        "La tortue nage (the turtle swims), L'oiseau vole (the bird flies), L'écureuil saute (the squirrel jumps)",
    },
    {
      term: "Works in All Tenses",
      definition:
        "These verbs work in all tenses you've learned - present, past, imparfait",
      example:
        "Je nage (I swim), J'ai nagé (I swam), Je nageais (I was swimming)",
    },
  ],

  vocabularyReference: [
    // nager - to swim
    {
      french: "nager",
      english: "to swim",
      note: "regular -ER verb - aquatic movement",
    },
    { french: "je nage", english: "I swim", note: "regular -ER ending" },
    { french: "tu nages", english: "you swim", note: "add -s" },
    { french: "il nage", english: "he swims", note: "base form" },
    { french: "elle nage", english: "she swims", note: "same as il" },
    { french: "nous nageons", english: "we swim", note: "add -ons" },
    {
      french: "vous nagez",
      english: "you swim (formal/plural)",
      note: "add -ez",
    },
    { french: "ils nagent", english: "they swim", note: "add -ent" },
    { french: "elles nagent", english: "they swim (f)", note: "same as ils" },

    // sauter - to jump
    {
      french: "sauter",
      english: "to jump",
      note: "regular -ER verb - vertical movement",
    },
    { french: "je saute", english: "I jump", note: "regular -ER ending" },
    { french: "tu sautes", english: "you jump", note: "add -s" },
    { french: "il saute", english: "he jumps", note: "base form" },
    { french: "nous sautons", english: "we jump", note: "add -ons" },
    {
      french: "vous sautez",
      english: "you jump (formal/plural)",
      note: "add -ez",
    },
    { french: "ils sautent", english: "they jump", note: "add -ent" },

    // voler - to fly
    {
      french: "voler",
      english: "to fly",
      note: "regular -ER verb - aerial movement",
    },
    { french: "je vole", english: "I fly", note: "regular -ER ending" },
    { french: "tu voles", english: "you fly", note: "add -s" },
    { french: "il vole", english: "he flies", note: "base form" },
    { french: "nous volons", english: "we fly", note: "add -ons" },
    {
      french: "vous volez",
      english: "you fly (formal/plural)",
      note: "add -ez",
    },
    { french: "ils volent", english: "they fly", note: "add -ent" },

    // courir - to run (irregular!)
    {
      french: "courir",
      english: "to run",
      note: "⭐ irregular -IR verb - fast ground movement",
    },
    {
      french: "je cours",
      english: "I run",
      note: "irregular - sounds like 'coor'",
    },
    {
      french: "tu cours",
      english: "you run",
      note: "same as je - sounds like 'coor'",
    },
    {
      french: "il court",
      english: "he runs",
      note: "drop -s, sounds like 'coor'",
    },
    { french: "nous courons", english: "we run", note: "add -ons to cour-" },
    {
      french: "vous courez",
      english: "you run (formal/plural)",
      note: "add -ez to cour-",
    },
    {
      french: "ils courent",
      english: "they run",
      note: "add -ent to cour-",
    },

    // marcher - to walk
    {
      french: "marcher",
      english: "to walk",
      note: "regular -ER verb - slow ground movement",
    },
    { french: "je marche", english: "I walk", note: "regular -ER ending" },
    { french: "tu marches", english: "you walk", note: "add -s" },
    { french: "il marche", english: "he walks", note: "base form" },
    { french: "nous marchons", english: "we walk", note: "add -ons" },
    {
      french: "vous marchez",
      english: "you walk (formal/plural)",
      note: "add -ez",
    },
    { french: "ils marchent", english: "they walk", note: "add -ent" },

    // grimper - to climb
    {
      french: "grimper",
      english: "to climb",
      note: "regular -ER verb - upward movement",
    },
    { french: "je grimpe", english: "I climb", note: "regular -ER ending" },
    { french: "tu grimpes", english: "you climb", note: "add -s" },
    { french: "il grimpe", english: "he climbs", note: "base form" },
    { french: "nous grimpons", english: "we climb", note: "add -ons" },
    {
      french: "vous grimpez",
      english: "you climb (formal/plural)",
      note: "add -ez",
    },
    { french: "ils grimpent", english: "they climb", note: "add -ent" },

    // Common phrases
    {
      french: "nager dans la mer",
      english: "to swim in the sea",
      note: "je nage dans la mer",
    },
    {
      french: "courir vite",
      english: "to run fast",
      note: "tu cours vite!",
    },
    {
      french: "marcher lentement",
      english: "to walk slowly",
      note: "il marche lentement",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // nager conjugation
      {
        instruction: "Translate to French",
        prompt: "I swim",
        hint: "nager for je",
        expectedAnswer: "je nage",
        acceptableAnswers: ["je nage"],
      },
      {
        instruction: "Translate to French",
        prompt: "you swim (informal)",
        hint: "nager for tu",
        expectedAnswer: "tu nages",
        acceptableAnswers: ["tu nages"],
      },
      {
        instruction: "Translate to French",
        prompt: "we swim",
        hint: "nager for nous - careful with spelling!",
        expectedAnswer: "nous nageons",
        acceptableAnswers: ["nous nageons"],
      },

      // sauter conjugation
      {
        instruction: "Translate to French",
        prompt: "I jump",
        hint: "sauter for je",
        expectedAnswer: "je saute",
        acceptableAnswers: ["je saute"],
      },
      {
        instruction: "Translate to French",
        prompt: "they jump",
        hint: "sauter for ils",
        expectedAnswer: "ils sautent",
        acceptableAnswers: ["ils sautent"],
      },

      // voler conjugation
      {
        instruction: "Translate to French",
        prompt: "he flies",
        hint: "voler for il",
        expectedAnswer: "il vole",
        acceptableAnswers: ["il vole"],
      },
      {
        instruction: "Translate to French",
        prompt: "we fly",
        hint: "voler for nous",
        expectedAnswer: "nous volons",
        acceptableAnswers: ["nous volons"],
      },

      // courir conjugation (irregular!)
      {
        instruction: "Translate to French",
        prompt: "I run",
        hint: "courir for je - irregular!",
        expectedAnswer: "je cours",
        acceptableAnswers: ["je cours"],
      },
      {
        instruction: "Translate to French",
        prompt: "you run (informal)",
        hint: "courir for tu - same as je",
        expectedAnswer: "tu cours",
        acceptableAnswers: ["tu cours"],
      },
      {
        instruction: "Translate to French",
        prompt: "he runs",
        hint: "courir for il - drop the -s",
        expectedAnswer: "il court",
        acceptableAnswers: ["il court"],
      },

      // marcher conjugation
      {
        instruction: "Translate to French",
        prompt: "I walk",
        hint: "marcher for je",
        expectedAnswer: "je marche",
        acceptableAnswers: ["je marche"],
      },

      // grimper conjugation
      {
        instruction: "Translate to French",
        prompt: "she climbs",
        hint: "grimper for elle",
        expectedAnswer: "elle grimpe",
        acceptableAnswers: ["elle grimpe"],
      },

      // Animals + movement (composition!)
      {
        instruction: "Say 'The turtle swims'",
        prompt: "The turtle swims",
        hint: "la tortue + nage",
        expectedAnswer: "la tortue nage",
        acceptableAnswers: ["la tortue nage"],
      },
      {
        instruction: "Say 'The bird flies'",
        prompt: "The bird flies",
        hint: "l'oiseau + vole",
        expectedAnswer: "l'oiseau vole",
        acceptableAnswers: ["l'oiseau vole"],
      },
      {
        instruction: "Say 'The squirrel jumps'",
        prompt: "The squirrel jumps",
        hint: "l'écureuil + saute",
        expectedAnswer: "l'écureuil saute",
        acceptableAnswers: ["l'écureuil saute", "l'ecureuil saute"],
      },
      {
        instruction: "Say 'The rabbit jumps'",
        prompt: "The rabbit jumps",
        hint: "le lapin + saute",
        expectedAnswer: "le lapin saute",
        acceptableAnswers: ["le lapin saute"],
      },

      // Personal usage with adverbs
      {
        instruction: "Say 'You run fast!'",
        prompt: "You run fast!",
        hint: "tu cours + vite",
        expectedAnswer: "tu cours vite",
        acceptableAnswers: ["tu cours vite!"],
      },
      {
        instruction: "Say 'I swim in the sea'",
        prompt: "I swim in the sea",
        hint: "je nage + dans la mer",
        expectedAnswer: "je nage dans la mer",
        acceptableAnswers: ["je nage dans la mer"],
      },

      // Past tense (composition with previous knowledge!)
      {
        instruction: "Say 'I swam' (passé composé)",
        prompt: "I swam",
        hint: "j'ai + past participle of nager",
        expectedAnswer: "j'ai nagé",
        acceptableAnswers: ["j'ai nagé", "j'ai nage"],
      },
    ],
  },

  skipStudyMode: false,
};
