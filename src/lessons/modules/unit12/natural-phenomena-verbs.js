/**
 * Module: Dynamic ID (auto-assigned)3: Natural Phenomena Verbs - How Nature Works
 * Unit 12 - Verbs for natural processes + CRITICAL causative verb "rendre"
 */

export const naturalPhenomenaModule = {
  moduleKey: "2024-03-17-natural-phenomena", // Permanent identifier - never changes
  title: "Natural Phenomena - How Nature Works",
  description:
    "Learn how nature works: le soleil brille (the sun shines), les plantes poussent (plants grow), il pleut (it rains) + CAUSATIVE: rendre (to make/render)",
  unit: 12,

  concepts: [
    {
      term: "Natural Process Verbs",
      definition:
        "Verbs that describe what happens in nature - shining, growing, raining",
      example:
        "Le soleil brille (the sun shines), Les plantes poussent (plants grow), Le vent souffle (the wind blows)",
    },
    {
      term: "pleuvoir - Impersonal Verb",
      definition:
        "Pleuvoir (to rain) only uses 'il' form - il pleut (it rains)",
      example:
        "il pleut (it rains), il a plu (it rained), il pleuvait (it was raining)",
    },
    {
      term: "rendre - CRITICAL Causative Verb!",
      definition:
        "Rendre means 'to make/render' - conjugates like prendre. Use with adjectives to show cause!",
      example:
        "Le soleil rend l'herbe verte (the sun makes grass green), Le froid rend l'eau glacée (cold makes water frozen)",
    },
    {
      term: "Causative Pattern: rendre + adjective",
      definition:
        "Pattern: [subject] + rendre + [object] + [adjective] = subject makes object [adjective]",
      example:
        "Qu'est-ce qui rend le ciel bleu? (What makes the sky blue?) → La lumière rend le ciel bleu (Light makes the sky blue)",
    },
    {
      term: "Setting Up Question Patterns",
      definition:
        "These verbs enable sophisticated 'why' and 'what makes' questions",
      example:
        "Pourquoi est-ce que le soleil brille? Qu'est-ce qui rend l'herbe verte? Comment est-ce que les plantes poussent?",
    },
  ],

  vocabularyReference: [
    // briller - to shine
    {
      french: "briller",
      english: "to shine",
      note: "regular -ER verb - light emission",
    },
    {
      french: "je brille",
      english: "I shine",
      note: "regular -ER ending",
    },
    { french: "tu brilles", english: "you shine", note: "add -s" },
    { french: "il brille", english: "he/it shines", note: "base form" },
    { french: "nous brillons", english: "we shine", note: "add -ons" },
    { french: "vous brillez", english: "you shine (formal)", note: "add -ez" },
    { french: "ils brillent", english: "they shine", note: "add -ent" },
    {
      french: "le soleil brille",
      english: "the sun shines",
      note: "common phrase",
    },

    // pousser - to grow/push
    {
      french: "pousser",
      english: "to grow / to push",
      note: "regular -ER verb - plant growth or pushing",
    },
    {
      french: "je pousse",
      english: "I grow / I push",
      note: "regular -ER ending",
    },
    { french: "tu pousses", english: "you grow / push", note: "add -s" },
    { french: "il pousse", english: "he/it grows / pushes", note: "base form" },
    { french: "nous poussons", english: "we grow / push", note: "add -ons" },
    {
      french: "vous poussez",
      english: "you grow / push (formal)",
      note: "add -ez",
    },
    { french: "ils poussent", english: "they grow / push", note: "add -ent" },
    {
      french: "les plantes poussent",
      english: "plants grow",
      note: "common phrase",
    },

    // pleuvoir - to rain (impersonal!)
    {
      french: "pleuvoir",
      english: "to rain",
      note: "⭐ irregular - ONLY uses 'il' form!",
    },
    {
      french: "il pleut",
      english: "it rains / it's raining",
      note: "impersonal - only this form exists in present",
    },
    {
      french: "il a plu",
      english: "it rained",
      note: "passé composé - irregular past participle",
    },
    {
      french: "il pleuvait",
      english: "it was raining",
      note: "imparfait - regular formation",
    },

    // souffler - to blow
    {
      french: "souffler",
      english: "to blow",
      note: "regular -ER verb - wind action or blowing",
    },
    {
      french: "je souffle",
      english: "I blow",
      note: "regular -ER ending",
    },
    { french: "tu souffles", english: "you blow", note: "add -s" },
    { french: "il souffle", english: "he/it blows", note: "base form" },
    { french: "nous soufflons", english: "we blow", note: "add -ons" },
    {
      french: "vous soufflez",
      english: "you blow (formal)",
      note: "add -ez",
    },
    { french: "ils soufflent", english: "they blow", note: "add -ent" },
    {
      french: "le vent souffle",
      english: "the wind blows",
      note: "common phrase",
    },

    // tomber - to fall (review - être verb!)
    {
      french: "tomber",
      english: "to fall",
      note: "regular -ER verb - uses être in passé composé!",
    },
    { french: "je tombe", english: "I fall", note: "regular -ER ending" },
    { french: "il tombe", english: "he/it falls", note: "base form" },
    {
      french: "je suis tombé(e)",
      english: "I fell",
      note: "uses être in past!",
    },
    {
      french: "la pluie tombe",
      english: "rain falls / it's raining",
      note: "common expression",
    },

    // rendre - CAUSATIVE VERB (like prendre!)
    {
      french: "rendre",
      english: "to make / to render",
      note: "⭐⭐⭐ CRITICAL - irregular like prendre - CAUSATIVE!",
    },
    {
      french: "je rends",
      english: "I make / render",
      note: "drop -re, add -s",
    },
    {
      french: "tu rends",
      english: "you make / render",
      note: "same as je",
    },
    {
      french: "il rend",
      english: "he/it makes / renders",
      note: "drop -s from tu form",
    },
    {
      french: "nous rendons",
      english: "we make / render",
      note: "add -ons to rend-",
    },
    {
      french: "vous rendez",
      english: "you make / render (formal)",
      note: "add -ez to rend-",
    },
    {
      french: "ils rendent",
      english: "they make / render",
      note: "add -ent to rend-",
    },

    // CAUSATIVE PATTERN EXAMPLES - CRITICAL!
    {
      french: "rendre + adjective",
      english: "to make [something] [adjective]",
      note: "⭐ CAUSATIVE PATTERN: le soleil rend l'herbe verte",
    },
    {
      french: "le soleil rend l'herbe verte",
      english: "the sun makes grass green",
      note: "CAUSATIVE: sun + rend + grass + green",
    },
    {
      french: "le froid rend l'eau glacée",
      english: "cold makes water frozen",
      note: "CAUSATIVE: cold + rend + water + frozen",
    },
    {
      french: "la pluie rend la terre humide",
      english: "rain makes the earth wet",
      note: "CAUSATIVE: rain + rend + earth + wet",
    },
    {
      french: "qu'est-ce qui rend...?",
      english: "what makes...?",
      note: "⭐ QUESTION PATTERN with causative!",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // briller conjugation
      {
        instruction: "Translate to French",
        prompt: "he shines",
        hint: "briller for il",
        expectedAnswer: "il brille",
        acceptableAnswers: ["il brille"],
      },
      {
        instruction: "Say 'The sun shines'",
        prompt: "The sun shines",
        hint: "le soleil + brille",
        expectedAnswer: "le soleil brille",
        acceptableAnswers: ["le soleil brille"],
      },

      // pousser conjugation
      {
        instruction: "Translate to French",
        prompt: "they grow",
        hint: "pousser for ils",
        expectedAnswer: "ils poussent",
        acceptableAnswers: ["ils poussent"],
      },
      {
        instruction: "Say 'Plants grow'",
        prompt: "Plants grow",
        hint: "les plantes + poussent",
        expectedAnswer: "les plantes poussent",
        acceptableAnswers: ["les plantes poussent"],
      },
      {
        instruction: "Say 'Plants grow in spring'",
        prompt: "Plants grow in spring",
        hint: "les plantes poussent + au printemps",
        expectedAnswer: "les plantes poussent au printemps",
        acceptableAnswers: ["les plantes poussent au printemps"],
      },

      // pleuvoir - impersonal!
      {
        instruction: "Say 'It rains' / 'It's raining'",
        prompt: "It rains",
        hint: "impersonal verb - only il pleut",
        expectedAnswer: "il pleut",
        acceptableAnswers: ["il pleut"],
      },
      {
        instruction: "Say 'It rained' (passé composé)",
        prompt: "It rained",
        hint: "il + a + plu (irregular past participle!)",
        expectedAnswer: "il a plu",
        acceptableAnswers: ["il a plu"],
      },

      // souffler
      {
        instruction: "Say 'The wind blows'",
        prompt: "The wind blows",
        hint: "le vent + souffle",
        expectedAnswer: "le vent souffle",
        acceptableAnswers: ["le vent souffle"],
      },

      // rendre conjugation
      {
        instruction: "Translate to French",
        prompt: "I make / I render",
        hint: "rendre for je - like prendre!",
        expectedAnswer: "je rends",
        acceptableAnswers: ["je rends"],
      },
      {
        instruction: "Translate to French",
        prompt: "it makes / renders",
        hint: "rendre for il",
        expectedAnswer: "il rend",
        acceptableAnswers: ["il rend"],
      },
      {
        instruction: "Translate to French",
        prompt: "they make / render",
        hint: "rendre for ils",
        expectedAnswer: "ils rendent",
        acceptableAnswers: ["ils rendent"],
      },

      // CAUSATIVE PATTERN - CRITICAL!
      {
        instruction: "Say 'The sun makes grass green'",
        prompt: "The sun makes grass green",
        hint: "le soleil + rend + l'herbe + verte",
        expectedAnswer: "le soleil rend l'herbe verte",
        acceptableAnswers: ["le soleil rend l'herbe verte"],
        explanation:
          "CAUSATIVE PATTERN: subject + rend + object + adjective. The sun MAKES grass green!",
      },
      {
        instruction: "Say 'Cold makes water frozen'",
        prompt: "Cold makes water frozen",
        hint: "le froid + rend + l'eau + glacée",
        expectedAnswer: "le froid rend l'eau glacée",
        acceptableAnswers: [
          "le froid rend l'eau glacée",
          "le froid rend l'eau glacee",
        ],
      },
      {
        instruction: "Say 'Rain makes the earth wet'",
        prompt: "Rain makes the earth wet",
        hint: "la pluie + rend + la terre + humide",
        expectedAnswer: "la pluie rend la terre humide",
        acceptableAnswers: ["la pluie rend la terre humide"],
      },

      // Nature in context
      {
        instruction: "Say 'The sun shines in the sky'",
        prompt: "The sun shines in the sky",
        hint: "le soleil brille + dans le ciel",
        expectedAnswer: "le soleil brille dans le ciel",
        acceptableAnswers: ["le soleil brille dans le ciel"],
      },
    ],
  },

  skipStudyMode: false,
};
