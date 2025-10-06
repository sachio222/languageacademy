/**
 * Module 110: Passé Composé vs Imparfait - The Key Distinction
 * Unit 9 - Most important past tense concept for storytelling
 * Event vs Description, Action vs Background
 */

export const pcVsImparfaitModule = {
  title: "Passé Composé vs Imparfait - The Golden Rule",
  description:
    "Learn when to use each past tense: Passé composé for specific events (J'ai mangé - I ate), Imparfait for descriptions/habits (Il faisait beau - It was nice, Je mangeais tous les jours - I used to eat every day)",
  unit: 9,

  concepts: [
    {
      term: "The Golden Rule",
      definition:
        "PASSÉ COMPOSÉ = Specific completed action (What happened?). IMPARFAIT = Ongoing state/description/habit (How things were/used to be)",
      example:
        "J'ai mangé (I ate - specific event) vs Je mangeais (I was eating/used to eat - ongoing or habit)",
    },
    {
      term: "Passé Composé - Specific Events",
      definition:
        "Completed actions, countable events, things that started/stopped, main storyline",
      example:
        "J'ai vu Marie (I saw Marie - one time), Je suis allé au café (I went to the café - completed)",
    },
    {
      term: "Imparfait - Background & Habits",
      definition:
        "Descriptions, ongoing states, repeated habits ('used to'), scene-setting, background information",
      example:
        "Il faisait beau (It was nice - description), Je parlais français tous les jours (I used to speak French every day - habit)",
    },
    {
      term: "Pattern: Background (IMP) + Event (PC)",
      definition:
        "Use imparfait to set the scene, passé composé for what happened",
      example:
        "Il faisait beau (background - IMP) quand je suis arrivé (event - PC) = It was nice when I arrived",
    },
    {
      term: "Time expressions help",
      definition:
        "PC: hier (yesterday), soudain (suddenly), à 8h (at 8). IMP: tous les jours (every day), toujours (always), d'habitude (usually)",
      example:
        "Hier, j'ai mangé (PC - specific time) vs Je mangeais tous les jours (IMP - habit)",
    },
    {
      term: "'Was doing' interrupted by event",
      definition:
        "Use imparfait for ongoing action, passé composé for interruption",
      example:
        "Je parlais avec Marie (I was talking - IMP) quand tu as appelé (you called - PC event)",
    },
    {
      term: "Mental vs Physical age",
      definition:
        "Physical age/description = IMP. Mental state at moment = can be PC",
      example:
        "J'avais 20 ans (I was 20 - IMP description) vs J'ai eu peur (I got scared - PC reaction)",
    },
  ],

  vocabularyReference: [
    {
      french: "quand",
      english: "when",
      usage: "connects two clauses (often PC + IMP)",
      example: "Quand je suis arrivé, il faisait beau",
    },
    {
      french: "pendant que",
      english: "while",
      usage: "during ongoing action (usually IMP + PC)",
      example: "Pendant que je mangeais, tu as appelé",
    },
    {
      french: "soudain / tout à coup",
      english: "suddenly",
      usage: "signals PC event",
      example: "Soudain, j'ai vu Marie",
    },
    {
      french: "tous les jours",
      english: "every day",
      usage: "signals IMP habit",
      example: "Je parlais français tous les jours",
    },
    {
      french: "d'habitude",
      english: "usually, normally",
      usage: "signals IMP habit",
      example: "D'habitude, j'allais au café",
    },
    {
      french: "toujours",
      english: "always",
      usage: "signals IMP habit (when past)",
      example: "J'étais toujours content",
    },
    {
      french: "hier",
      english: "yesterday",
      usage: "signals PC specific time",
      example: "Hier, j'ai mangé au restaurant",
    },
    {
      french: "à ce moment-là",
      english: "at that moment",
      usage: "signals PC specific event",
      example: "À ce moment-là, j'ai compris",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Il ___ beau quand je suis arrivé (It was nice when I arrived) - Choose correct tense for 'faire'",
      answer: "faisait",
      wrongAnswers: [
        {
          answer: "a fait",
          feedback:
            "Weather description is background! Use imparfait: il faisait beau.",
        },
        {
          answer: "fait",
          feedback:
            "That's present! Use imparfait for description: il faisait.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Hier, j'___ au café (Yesterday, I went to the café) - Choose correct tense for 'aller'",
      answer: "suis allé",
      wrongAnswers: [
        {
          answer: "allais",
          feedback:
            "Hier = specific time! Use passé composé: je suis allé (I went).",
        },
        {
          answer: "vais",
          feedback:
            "That's present! Use passé composé for yesterday: je suis allé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ français tous les jours (I used to speak French every day) - Choose correct tense for 'parler'",
      answer: "parlais",
      wrongAnswers: [
        {
          answer: "ai parlé",
          feedback:
            "Tous les jours = habit! Use imparfait: je parlais (I used to speak).",
        },
        {
          answer: "parle",
          feedback: "That's present! Use imparfait for past habit: je parlais.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ avec Marie quand tu as appelé (I was talking with Marie when you called) - Choose correct tense for 'parler'",
      answer: "parlais",
      wrongAnswers: [
        {
          answer: "ai parlé",
          feedback:
            "Ongoing action interrupted! Use imparfait: je parlais (I was talking).",
        },
        {
          answer: "parle",
          feedback:
            "That's present! Use imparfait for ongoing past: je parlais.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Soudain, j'___ Marie (Suddenly, I saw Marie) - Choose correct tense for 'voir'",
      answer: "ai vu",
      wrongAnswers: [
        {
          answer: "voyais",
          feedback:
            "Soudain = sudden event! Use passé composé: j'ai vu (I saw).",
        },
        {
          answer: "vois",
          feedback:
            "That's present! Use passé composé for past event: j'ai vu.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Quand j'étais jeune, je ___ au foot (When I was young, I used to play soccer) - Choose correct tense for 'jouer'",
      answer: "jouais",
      wrongAnswers: [
        {
          answer: "ai joué",
          feedback:
            "Repeated past action (habit)! Use imparfait: je jouais (I used to play).",
        },
        {
          answer: "joue",
          feedback: "That's present! Use imparfait for past habit: je jouais.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ content hier (I was happy yesterday) - Choose correct tense for 'être'",
      answer: "étais",
      wrongAnswers: [
        {
          answer: "ai été",
          feedback:
            "Both work! But 'étais' is more natural for ongoing state that day.",
        },
        {
          answer: "suis",
          feedback:
            "That's present! Use imparfait: j'étais content (I was happy).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y ___ beaucoup de gens (There were many people) - Choose correct tense for 'avoir'",
      answer: "avait",
      wrongAnswers: [
        {
          answer: "a eu",
          feedback:
            "Description of scene! Use imparfait: il y avait (there were).",
        },
        {
          answer: "a",
          feedback:
            "That's present! Use imparfait for description: il y avait.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: À 8h, j'___ (At 8 o'clock, I ate) - Choose correct tense for 'manger'",
      answer: "ai mangé",
      wrongAnswers: [
        {
          answer: "mangeais",
          feedback:
            "Specific time (at 8h) = specific event! Use passé composé: j'ai mangé.",
        },
        {
          answer: "mange",
          feedback:
            "That's present! Use passé composé for past event: j'ai mangé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Pendant que je ___, tu as appelé (While I was eating, you called) - Choose correct tense for 'manger'",
      answer: "mangeais",
      wrongAnswers: [
        {
          answer: "ai mangé",
          feedback:
            "Ongoing action (while)! Use imparfait: je mangeais (I was eating).",
        },
        {
          answer: "mange",
          feedback:
            "That's present! Use imparfait for ongoing past: je mangeais.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: D'habitude, on ___ au café (Usually, we used to go to the café) - Choose correct tense for 'aller'",
      answer: "allait",
      wrongAnswers: [
        {
          answer: "est allé",
          feedback:
            "D'habitude = habit! Use imparfait: on allait (we used to go).",
        },
        {
          answer: "va",
          feedback: "That's present! Use imparfait for past habit: on allait.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ce jour-là, j'___ malade (That day, I got sick) - Choose correct tense for 'tomber' (tomber malade = get sick)",
      answer: "suis tombé",
      wrongAnswers: [
        {
          answer: "tombais",
          feedback:
            "Getting sick is an event! Use passé composé: je suis tombé malade.",
        },
        {
          answer: "tombe",
          feedback:
            "That's present! Use passé composé for past event: je suis tombé.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ dans un grand appartement (They used to live in a big apartment) - Choose correct tense for 'habiter'",
      answer: "habitaient",
      wrongAnswers: [
        {
          answer: "ont habité",
          feedback:
            "Ongoing past state! Use imparfait: ils habitaient (they used to live).",
        },
        {
          answer: "habitent",
          feedback:
            "That's present! Use imparfait for past state: ils habitaient.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ le bus tous les matins (I used to take the bus every morning) - Choose correct tense for 'prendre'",
      answer: "prenais",
      wrongAnswers: [
        {
          answer: "ai pris",
          feedback:
            "Tous les matins = habit! Use imparfait: je prenais (I used to take).",
        },
        {
          answer: "prends",
          feedback: "That's present! Use imparfait for past habit: je prenais.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Hier matin, j'___ le bus (Yesterday morning, I took the bus) - Choose correct tense for 'prendre'",
      answer: "ai pris",
      wrongAnswers: [
        {
          answer: "prenais",
          feedback:
            "Hier matin = specific time! Use passé composé: j'ai pris (I took).",
        },
        {
          answer: "prends",
          feedback:
            "That's present! Use passé composé for yesterday: j'ai pris.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ toujours en retard (She was always late) - Choose correct tense for 'être'",
      answer: "était",
      wrongAnswers: [
        {
          answer: "a été",
          feedback:
            "Toujours = repeated state! Use imparfait: elle était toujours en retard.",
        },
        {
          answer: "est",
          feedback: "That's present! Use imparfait for past habit: elle était.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: À ce moment-là, j'___ (At that moment, I understood) - Choose correct tense for 'comprendre'",
      answer: "ai compris",
      wrongAnswers: [
        {
          answer: "comprenais",
          feedback:
            "À ce moment-là = specific moment! Use passé composé: j'ai compris.",
        },
        {
          answer: "comprends",
          feedback:
            "That's present! Use passé composé for past event: j'ai compris.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il ___ du café quand je suis arrivé (He was drinking coffee when I arrived) - Choose correct tense for 'boire'",
      answer: "buvait",
      wrongAnswers: [
        {
          answer: "a bu",
          feedback: "Ongoing action (was drinking)! Use imparfait: il buvait.",
        },
        {
          answer: "boit",
          feedback:
            "That's present! Use imparfait for ongoing past: il buvait.",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Il ___ beau quand je suis arrivé (It was nice when I arrived)",
    "Hier, j'___ au café (Yesterday, I went to the café)",
    "Je ___ français tous les jours (I used to speak French every day)",
    "Je ___ avec Marie quand tu as appelé (I was talking when you called)",
    "Soudain, j'___ Marie (Suddenly, I saw Marie)",
    "Quand j'étais jeune, je ___ au foot (When I was young, I played soccer)",
    "Il y ___ beaucoup de gens (There were many people)",
    "À 8h, j'___ (At 8, I ate)",
    "Pendant que je ___, tu as appelé (While I was eating, you called)",
    "D'habitude, on ___ au café (Usually, we went to the café)",
  ],
};
