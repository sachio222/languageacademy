/**
 * Module: Getting Ready - se laver, s'habiller, se préparer
 * Unit 8 - Daily Life & Actions
 * Continuation of morning routine
 */

export const gettingReadyModule = {
  moduleKey: "2024-05-17-getting-ready", // Permanent identifier - never changes
  title: "Getting Ready - se laver, s'habiller, se préparer",
  description:
    "Complete your morning routine: je me lave (I wash), je m'habille (I get dressed), je me prépare (I get ready)",

  concepts: [
    {
      term: "se laver = to wash oneself",
      definition: "Personal hygiene - wash yourself",
      example: "je me lave (I wash myself), tu te laves (you wash yourself)",
    },
    {
      term: "s'habiller = to get dressed",
      definition: "Put clothes on yourself - daily essential!",
      example:
        "je m'habille (I get dressed), elle s'habille bien (she dresses well)",
    },
    {
      term: "se préparer = to get ready / to prepare oneself",
      definition: "General preparation - for school, work, going out",
      example:
        "je me prépare pour le cours (I get ready for class), on se prépare (we get ready)",
    },
    {
      term: "Complete Morning Sequence",
      definition: "Now you can tell your entire morning story!",
      example:
        "D'abord, je me réveille. Ensuite, je me lève. Après, je me lave. Puis, je m'habille. Finalement, je me prépare.",
    },
  ],

  vocabularyReference: [
    {
      french: "se laver",
      english: "to wash oneself",
      note: "infinitive",
    },
    {
      french: "je me lave",
      english: "I wash myself",
      note: "daily routine",
    },
    {
      french: "tu te laves",
      english: "you wash yourself",
      note: "informal",
    },
    {
      french: "s'habiller",
      english: "to get dressed",
      note: "infinitive - note elision",
    },
    {
      french: "je m'habille",
      english: "I get dressed",
      note: "⭐ elision: m' not me",
    },
    {
      french: "tu t'habilles",
      english: "you get dressed",
      note: "elision: t' not te",
    },
    {
      french: "il s'habille",
      english: "he gets dressed",
      note: "third person",
    },
    {
      french: "se préparer",
      english: "to get ready / to prepare oneself",
      note: "infinitive",
    },
    {
      french: "je me prépare",
      english: "I get ready",
      note: "general preparation",
    },
    {
      french: "tu te prépares",
      english: "you get ready",
      note: "asking about preparation",
    },
    {
      french: "on se prépare",
      english: "we get ready",
      note: "group preparation",
    },
  ],

  exercises: [
    {
      id: "getting-ready.1",
      instruction: "Say 'I wash myself'",
      prompt: "I wash myself",
      hint: "je me + laver",
      expectedAnswer: "je me lave",
      wrongAnswers: [],
    },
    {
      id: "getting-ready.2",
      instruction: "Say 'I get dressed'",
      prompt: "I get dressed",
      hint: "je m' + habiller (elision!)",
      expectedAnswer: "je m'habille",
      wrongAnswers: [],
    },
    {
      id: "getting-ready.3",
      instruction: "Say 'I get ready for class'",
      prompt: "I get ready for class",
      hint: "je me prépare + pour + le cours",
      expectedAnswer: "je me prépare pour le cours",
      wrongAnswers: [],
    },
    {
      id: "getting-ready.4",
      instruction: "Say 'You get dressed well' (informal)",
      prompt: "You get dressed well",
      hint: "tu t'habilles + bien",
      expectedAnswer: "tu t'habilles bien",
      wrongAnswers: [],
    },
    {
      id: "getting-ready.5",
      instruction: "Say 'We get ready'",
      prompt: "We get ready (using on)",
      hint: "on se + préparer",
      expectedAnswer: "on se prépare",
      wrongAnswers: [],
    },
    {
      id: "getting-ready.6",
      instruction:
        "Tell the complete sequence: 'First, I wash myself. Then, I get dressed. Finally, I get ready.'",
      prompt: "First, I wash. Then, I dress. Finally, I get ready.",
      hint: "D'abord + je me lave. Ensuite + je m'habille. Finalement + je me prépare.",
      expectedAnswer:
        "d'abord, je me lave. ensuite, je m'habille. finalement, je me prépare",
      acceptableAnswers: [
        "d abord je me lave ensuite je m habille finalement je me prepare",
      ],
      wrongAnswers: [],
    },
  ],
};
