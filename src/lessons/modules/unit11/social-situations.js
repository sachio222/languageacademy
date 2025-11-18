/**
 * Module: Dynamic ID (auto-assigned)5: Social Situations - attendre, arriver, rester
 * Unit 11 - Essential social interaction verbs from top 100
 * Ranks 67, 69, 70
 */

export const socialSituationsModule = {
  moduleKey: "2024-02-14-social-situations", // Permanent identifier - never changes
  title: "Social Situations - Wait, Arrive, Stay",
  description:
    "Essential social verbs: attendre (to wait), arriver (to arrive), rester (to stay). Perfect for appointments, meetings, and social coordination!",
  unit: 11,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Coordinate social situations (I'm waiting, I arrived, I'll stay)",
      "Talk about meetings and appointments",
      "Use essential social coordination verbs"
    ],
    realWorldUse: "coordinate meetings and social events",
    nextModuleTeaser: "Master directions and navigation"
  },

  concepts: [
    {
      term: "attendre = to wait (rank 67)",
      definition:
        "Regular -RE verb for waiting - essential for appointments and transport",
      example:
        "J'attends le bus (I'm waiting for the bus), Tu attends quelqu'un? (Are you waiting for someone?)",
    },
    {
      term: "arriver = to arrive (rank 69)",
      definition:
        "Regular -ER verb for arriving - completing journeys and meetings",
      example:
        "J'arrive à 8h (I arrive at 8am), Le train arrive (The train is arriving)",
    },
    {
      term: "rester = to stay (rank 70)",
      definition:
        "Regular -ER verb for staying - not leaving, remaining somewhere",
      example:
        "Je reste ici (I'm staying here), Tu restes combien de temps? (How long are you staying?)",
    },
    {
      term: "Social Coordination",
      definition:
        "These three verbs enable complete social planning and coordination",
      example:
        "J'attends Marie, elle arrive à 7h, et nous restons ensemble (I'm waiting for Marie, she arrives at 7, and we stay together)",
    },
  ],

  vocabularyReference: [
    // attendre - to wait
    {
      french: "attendre",
      english: "to wait / to wait for",
      note: "⭐ Rank 67 - regular -RE verb",
    },
    {
      french: "j'attends",
      english: "I wait / I'm waiting",
      note: "drop -re, add -s",
    },
    {
      french: "tu attends",
      english: "you wait (informal)",
      note: "same as je",
    },
    {
      french: "il attend",
      english: "he waits",
      note: "drop -s from tu form",
    },
    {
      french: "elle attend",
      english: "she waits",
      note: "same as il",
    },
    {
      french: "nous attendons",
      english: "we wait",
      note: "add -ons to attend-",
    },
    {
      french: "vous attendez",
      english: "you wait (formal/plural)",
      note: "add -ez to attend-",
    },
    {
      french: "ils attendent",
      english: "they wait (masculine)",
      note: "add -ent",
    },
    {
      french: "elles attendent",
      english: "they wait (feminine)",
      note: "same as ils",
    },

    // arriver - to arrive
    {
      french: "arriver",
      english: "to arrive",
      note: "⭐ Rank 69 - regular -ER verb",
    },
    {
      french: "j'arrive",
      english: "I arrive / I'm arriving",
      note: "motion towards destination",
    },
    {
      french: "tu arrives",
      english: "you arrive (informal)",
      note: "add -s for tu",
    },
    {
      french: "il arrive",
      english: "he arrives",
      note: "base form",
    },
    {
      french: "elle arrive",
      english: "she arrives",
      note: "same as il",
    },
    {
      french: "nous arrivons",
      english: "we arrive",
      note: "add -ons",
    },
    {
      french: "vous arrivez",
      english: "you arrive (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils arrivent",
      english: "they arrive (masculine)",
      note: "add -ent",
    },
    {
      french: "elles arrivent",
      english: "they arrive (feminine)",
      note: "same as ils",
    },

    // rester - to stay
    {
      french: "rester",
      english: "to stay / to remain",
      note: "⭐ Rank 70 - regular -ER verb",
    },
    {
      french: "je reste",
      english: "I stay / I'm staying",
      note: "remaining in place",
    },
    {
      french: "tu restes",
      english: "you stay (informal)",
      note: "add -s for tu",
    },
    {
      french: "il reste",
      english: "he stays",
      note: "base form",
    },
    {
      french: "elle reste",
      english: "she stays",
      note: "same as il",
    },
    {
      french: "nous restons",
      english: "we stay",
      note: "add -ons",
    },
    {
      french: "vous restez",
      english: "you stay (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils restent",
      english: "they stay (masculine)",
      note: "add -ent",
    },
    {
      french: "elles restent",
      english: "they stay (feminine)",
      note: "same as ils",
    },

    // Common expressions and phrases
    {
      french: "j'attends le bus",
      english: "I'm waiting for the bus",
      note: "⭐ common transport situation",
    },
    {
      french: "tu attends quelqu'un?",
      english: "are you waiting for someone?",
      note: "social question",
    },
    {
      french: "j'arrive à",
      english: "I arrive at/in",
      note: "with location + time",
    },
    {
      french: "j'arrive à 8h",
      english: "I arrive at 8am",
      note: "specific time arrival",
    },
    {
      french: "le train arrive",
      english: "the train is arriving",
      note: "transport arrival",
    },
    {
      french: "je reste ici",
      english: "I'm staying here",
      note: "location decision",
    },
    {
      french: "tu restes combien de temps?",
      english: "how long are you staying?",
      note: "duration question",
    },
    {
      french: "on reste ensemble",
      english: "we're staying together",
      note: "social coordination",
    },
    {
      french: "il reste du pain",
      english: "there's bread left",
      note: "quantity remaining",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // attendre conjugation
      {
        instruction: "Translate to French",
        prompt: "I wait",
        hint: "attendre for je",
        expectedAnswer: "j'attends",
      },
      {
        instruction: "Translate to French",
        prompt: "you wait (informal)",
        hint: "attendre for tu - same as je",
        expectedAnswer: "tu attends",
      },
      {
        instruction: "Translate to French",
        prompt: "she waits",
        hint: "attendre for elle - drop -s",
        expectedAnswer: "elle attend",
      },

      // arriver conjugation
      {
        instruction: "Translate to French",
        prompt: "I arrive",
        hint: "arriver for je",
        expectedAnswer: "j'arrive",
      },
      {
        instruction: "Translate to French",
        prompt: "he arrives",
        hint: "arriver for il",
        expectedAnswer: "il arrive",
      },
      {
        instruction: "Translate to French",
        prompt: "they arrive",
        hint: "arriver for ils",
        expectedAnswer: "ils arrivent",
      },

      // rester conjugation
      {
        instruction: "Translate to French",
        prompt: "I stay",
        hint: "rester for je",
        expectedAnswer: "je reste",
      },
      {
        instruction: "Translate to French",
        prompt: "we stay",
        hint: "rester for nous",
        expectedAnswer: "nous restons",
      },
      {
        instruction: "Translate to French",
        prompt: "you stay (formal)",
        hint: "rester for vous",
        expectedAnswer: "vous restez",
      },

      // Practical usage
      {
        instruction: "Say: 'I'm waiting for the bus'",
        prompt: "I'm waiting for the bus",
        hint: "j'attends + le bus",
        expectedAnswer: "j'attends le bus",
      },
      {
        instruction: "Ask: 'Are you waiting for someone?'",
        prompt: "Are you waiting for someone?",
        hint: "tu attends + quelqu'un",
        expectedAnswer: "tu attends quelqu'un?",
        acceptableAnswers: ["est-ce que tu attends quelqu'un?"],
      },
      {
        instruction: "Say: 'I arrive at 9am'",
        prompt: "I arrive at 9am",
        hint: "j'arrive + à + time",
        expectedAnswer: "j'arrive à neuf heures",
        acceptableAnswers: ["j'arrive à 9h"],
      },
      {
        instruction: "Ask: 'When do you arrive?'",
        prompt: "When do you arrive?",
        hint: "quand + tu arrives",
        expectedAnswer: "quand tu arrives?",
        acceptableAnswers: [
          "quand est-ce que tu arrives?",
          "à quelle heure tu arrives?",
        ],
      },
      {
        instruction: "Say: 'I'm staying here'",
        prompt: "I'm staying here",
        hint: "je reste + ici",
        expectedAnswer: "je reste ici",
      },
      {
        instruction: "Ask: 'How long are you staying?'",
        prompt: "How long are you staying?",
        hint: "combien de temps + tu restes",
        expectedAnswer: "combien de temps tu restes?",
        acceptableAnswers: ["tu restes combien de temps?"],
      },
    ],
  },

  skipStudyMode: false,
};
