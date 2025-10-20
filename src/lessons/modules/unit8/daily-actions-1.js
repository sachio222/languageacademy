/**
 * Module: Dynamic ID (auto-assigned)2: Daily Actions Set 1 - dormir, travailler, vivre
 * Unit 11 - Essential daily life verbs from top 100: sleep, work, live
 */

export const dailyActions1Module = {
  moduleKey: "2024-05-15-daily-actions-1", // Permanent identifier - never changes
  title: "Daily Life Essentials - Sleep, Work, Live",
  description:
    "Three essential daily verbs: dormir (to sleep), travailler (to work), vivre (to live). Complete your ability to describe daily life and existence!",
  unit: 11,

  concepts: [
    {
      term: "dormir = to sleep (rank 54)",
      definition:
        "Regular -IR verb for sleeping - essential for daily routines",
      example:
        "je dors (I sleep), je dors huit heures (I sleep 8 hours), tu dors bien? (do you sleep well?)",
    },
    {
      term: "travailler = to work (rank 55)",
      definition: "Regular -ER verb for working - essential for adult life",
      example:
        "je travaille (I work), je travaille à Paris (I work in Paris), où travaillez-vous? (where do you work?)",
    },
    {
      term: "vivre = to live (rank 56)",
      definition:
        "Irregular verb for living/being alive - existential and location",
      example:
        "je vis (I live), je vis à Paris (I live in Paris), vivre sa vie (to live one's life)",
    },
    {
      term: "Daily Life Integration",
      definition:
        "These three verbs complete your ability to describe human existence",
      example:
        "Je vis à Paris, je travaille au centre-ville, et je dors bien (I live in Paris, work downtown, and sleep well)",
    },
  ],

  vocabularyReference: [
    // dormir - to sleep
    {
      french: "dormir",
      english: "to sleep",
      note: "⭐ Rank 54 - regular -IR verb",
    },
    {
      french: "je dors",
      english: "I sleep",
      note: "drop final consonants",
    },
    {
      french: "tu dors",
      english: "you sleep (informal)",
      note: "same as je",
    },
    {
      french: "il dort",
      english: "he sleeps",
      note: "drop -s from tu form",
    },
    {
      french: "elle dort",
      english: "she sleeps",
      note: "same as il",
    },
    {
      french: "nous dormons",
      english: "we sleep",
      note: "add -ons to stem",
    },
    {
      french: "vous dormez",
      english: "you sleep (formal/plural)",
      note: "add -ez to stem",
    },
    {
      french: "ils dorment",
      english: "they sleep (masculine)",
      note: "add -ent, silent",
    },
    {
      french: "elles dorment",
      english: "they sleep (feminine)",
      note: "same as ils",
    },

    // travailler - to work
    {
      french: "travailler",
      english: "to work",
      note: "⭐ Rank 55 - regular -ER verb",
    },
    {
      french: "je travaille",
      english: "I work",
      note: "regular -ER ending",
    },
    {
      french: "tu travailles",
      english: "you work (informal)",
      note: "add -s",
    },
    {
      french: "il travaille",
      english: "he works",
      note: "base form",
    },
    {
      french: "elle travaille",
      english: "she works",
      note: "same as il",
    },
    {
      french: "nous travaillons",
      english: "we work",
      note: "add -ons",
    },
    {
      french: "vous travaillez",
      english: "you work (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils travaillent",
      english: "they work (masculine)",
      note: "add -ent",
    },
    {
      french: "elles travaillent",
      english: "they work (feminine)",
      note: "same as ils",
    },

    // vivre - to live
    {
      french: "vivre",
      english: "to live",
      note: "⭐ Rank 56 - irregular verb",
    },
    {
      french: "je vis",
      english: "I live",
      note: "irregular - sounds like 'vee'",
    },
    {
      french: "tu vis",
      english: "you live (informal)",
      note: "same sound as je",
    },
    {
      french: "il vit",
      english: "he lives",
      note: "drop -s, sounds like 'vee'",
    },
    {
      french: "elle vit",
      english: "she lives",
      note: "same as il",
    },
    {
      french: "nous vivons",
      english: "we live",
      note: "add -ons to viv-",
    },
    {
      french: "vous vivez",
      english: "you live (formal/plural)",
      note: "add -ez to viv-",
    },
    {
      french: "ils vivent",
      english: "they live (masculine)",
      note: "add -ent to viv-",
    },
    {
      french: "elles vivent",
      english: "they live (feminine)",
      note: "same as ils",
    },

    // Common phrases
    {
      french: "bien dormir",
      english: "to sleep well",
      note: "je dors bien",
    },
    {
      french: "travailler dur",
      english: "to work hard",
      note: "je travaille dur",
    },
    {
      french: "vivre sa vie",
      english: "to live one's life",
      note: "philosophical expression",
    },
    {
      french: "où travaillez-vous?",
      english: "where do you work?",
      note: "common social question",
    },
    {
      french: "je travaille à",
      english: "I work at/in",
      note: "location of work",
    },
    {
      french: "je vis à",
      english: "I live in/at",
      note: "location of residence",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // dormir conjugation
      {
        instruction: "Translate to French",
        prompt: "I sleep",
        hint: "dormir for je",
        expectedAnswer: "je dors",
      },
      {
        instruction: "Translate to French",
        prompt: "you sleep (informal)",
        hint: "dormir for tu - same as je",
        expectedAnswer: "tu dors",
      },
      {
        instruction: "Translate to French",
        prompt: "he sleeps",
        hint: "dormir for il - drop the -s",
        expectedAnswer: "il dort",
      },

      // travailler conjugation
      {
        instruction: "Translate to French",
        prompt: "I work",
        hint: "travailler for je",
        expectedAnswer: "je travaille",
      },
      {
        instruction: "Translate to French",
        prompt: "we work",
        hint: "travailler for nous",
        expectedAnswer: "nous travaillons",
      },
      {
        instruction: "Translate to French",
        prompt: "you work (formal)",
        hint: "travailler for vous",
        expectedAnswer: "vous travaillez",
      },

      // vivre conjugation
      {
        instruction: "Translate to French",
        prompt: "I live",
        hint: "vivre for je - irregular",
        expectedAnswer: "je vis",
      },
      {
        instruction: "Translate to French",
        prompt: "she lives",
        hint: "vivre for elle - same as je but no -s",
        expectedAnswer: "elle vit",
      },
      {
        instruction: "Translate to French",
        prompt: "they live",
        hint: "vivre for ils - add -ent to viv-",
        expectedAnswer: "ils vivent",
      },

      // Practical usage
      {
        instruction: "Ask: 'Do you sleep well?'",
        prompt: "Do you sleep well?",
        hint: "tu + dors + bien + question mark",
        expectedAnswer: "tu dors bien?",
        acceptableAnswers: ["est-ce que tu dors bien?"],
      },
      {
        instruction: "Ask: 'Where do you work?' (formal)",
        prompt: "Where do you work? (formal)",
        hint: "où + vous + travaillez",
        expectedAnswer: "où travaillez-vous?",
        acceptableAnswers: ["où est-ce que vous travaillez?"],
      },
      {
        instruction: "Say: 'I live in Paris'",
        prompt: "I live in Paris",
        hint: "je vis + à + city",
        expectedAnswer: "je vis à Paris",
      },
      {
        instruction: "Say: 'I work hard'",
        prompt: "I work hard",
        hint: "je travaille + dur",
        expectedAnswer: "je travaille dur",
      },
      {
        instruction: "Say: 'I sleep 8 hours'",
        prompt: "I sleep 8 hours",
        hint: "je dors + huit heures",
        expectedAnswer: "je dors huit heures",
      },
      {
        instruction: "Say: 'We live our life'",
        prompt: "We live our life",
        hint: "Fixed expression: vivre sa vie",
        expectedAnswer: "nous vivons notre vie",
        acceptableAnswers: ["on vit notre vie"],
      },
    ],
  },

  skipStudyMode: false,
};
