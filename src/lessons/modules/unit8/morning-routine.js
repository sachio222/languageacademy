/**
 * Module: Morning Routine - se réveiller, se lever
 * Unit 8 - Daily Life & Actions
 * Natural sequence: wake up → get up
 */

export const morningRoutineModule = {
  moduleKey: "2024-05-19-morning-routine", // Permanent identifier - never changes
  title: "Morning Routine - se réveiller, se lever",
  description:
    "Describe your morning: je me réveille (I wake up), je me lève (I get up), tu te réveilles à quelle heure? (what time do you wake up?)",

  concepts: [
    {
      term: "se réveiller = to wake up",
      definition:
        "First action of the day - reflexive because you wake yourself up",
      example:
        "je me réveille à 7h (I wake up at 7am), tu te réveilles tôt (you wake up early)",
    },
    {
      term: "se lever = to get up / to stand up",
      definition: "After waking, you get yourself up - natural sequence!",
      example:
        "je me lève à 7h30 (I get up at 7:30), tu te lèves tard (you get up late)",
    },
    {
      term: "Telling Your Morning Story",
      definition:
        "Now you can describe your morning routine with temporal words!",
      example:
        "D'abord, je me réveille. Ensuite, je me lève. (First, I wake up. Then, I get up.)",
    },
    {
      term: "Asking About Morning Routines",
      definition: "Common questions about daily schedules",
      example:
        "À quelle heure tu te réveilles? (What time do you wake up?), Tu te lèves tôt? (Do you get up early?)",
    },
  ],

  vocabularyReference: [
    {
      french: "se réveiller",
      english: "to wake up",
      note: "infinitive - reflexive verb",
    },
    {
      french: "je me réveille",
      english: "I wake up",
      note: "⭐ first action of day!",
    },
    {
      french: "tu te réveilles",
      english: "you wake up (informal)",
      note: "asking about routines",
    },
    {
      french: "il se réveille",
      english: "he wakes up",
      note: "third person",
    },
    {
      french: "elle se réveille",
      english: "she wakes up",
      note: "feminine form",
    },
    {
      french: "nous nous réveillons",
      english: "we wake up",
      note: "nous nous pattern",
    },
    {
      french: "vous vous réveillez",
      english: "you wake up (formal/plural)",
      note: "polite form",
    },
    {
      french: "se lever",
      english: "to get up / to stand up",
      note: "infinitive - reflexive verb",
    },
    {
      french: "je me lève",
      english: "I get up",
      note: "⭐ second morning action",
    },
    {
      french: "tu te lèves",
      english: "you get up (informal)",
      note: "common in questions",
    },
    {
      french: "il se lève",
      english: "he gets up",
      note: "third person",
    },
    {
      french: "elle se lève",
      english: "she gets up",
      note: "feminine form",
    },
    {
      french: "nous nous levons",
      english: "we get up",
      note: "nous nous pattern",
    },
    {
      french: "vous vous levez",
      english: "you get up (formal/plural)",
      note: "polite form",
    },
  ],

  exercises: [
    {
      id: "morning.1",
      instruction: "Say 'I wake up'",
      prompt: "I wake up",
      hint: "je me + réveiller conjugated",
      expectedAnswer: "je me réveille",
      wrongAnswers: [],
    },
    {
      id: "morning.2",
      instruction: "Say 'I wake up at 7am'",
      prompt: "I wake up at 7am",
      hint: "je me réveille + à + sept heures",
      expectedAnswer: "je me réveille à sept heures",
      acceptableAnswers: [
        "je me reveille a sept heures",
        "je me réveille à 7h",
      ],
      wrongAnswers: [],
    },
    {
      id: "morning.3",
      instruction: "Ask 'Do you wake up early?' (informal)",
      prompt: "Do you wake up early? (informal)",
      hint: "tu te réveilles + tôt?",
      expectedAnswer: "tu te réveilles tôt",
      acceptableAnswers: ["tu te reveilles tot"],
      wrongAnswers: [],
    },
    {
      id: "morning.4",
      instruction: "Say 'I get up'",
      prompt: "I get up",
      hint: "je me + lever conjugated",
      expectedAnswer: "je me lève",
      acceptableAnswers: ["je me leve"],
      wrongAnswers: [],
    },
    {
      id: "morning.5",
      instruction: "Say 'She gets up at 8am'",
      prompt: "She gets up at 8am",
      hint: "elle se lève + à + huit heures",
      expectedAnswer: "elle se lève à huit heures",
      acceptableAnswers: ["elle se leve a huit heures", "elle se lève à 8h"],
      wrongAnswers: [],
    },
    {
      id: "morning.6",
      instruction: "Say 'First, I wake up. Then, I get up.'",
      prompt: "First, I wake up. Then, I get up.",
      hint: "D'abord + je me réveille. Ensuite + je me lève.",
      expectedAnswer: "d'abord, je me réveille. ensuite, je me lève",
      acceptableAnswers: ["d abord je me reveille ensuite je me leve"],
      wrongAnswers: [],
    },
  ],
};
