/**
 * Unit 11 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 11 material
 * Covers: age expressions, top 100 completion verbs (give, sleep, work, live, search, find,
 * listen, watch, wait, arrive, stay), and directions
 */

export const unit11Practice = {
  moduleKey: "2024-02-16-unit-11-practice", // Permanent identifier - never changes
  title: "Unit 11 Practice - Fill in the Blanks",
  description:
    "Complete sentences using Unit 11's essential vocabulary: age expressions, missing top 100 verbs, and directions!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [
    {
      term: "Advanced Structures Practice",
      definition:
        "Interactive exercises to master the most advanced French structures for sophisticated expression",
      example:
        "Practice je viendrai, tu seras, il aura fait, je viendrais, tu serais, il aurait fait, je suis aimé, il fait construire, en parlant, d'abord, ensuite, puis, enfin",
    },
    {
      term: "Future and Conditional Mastery",
      definition:
        "Build fluency with future and conditional tenses through varied advanced contexts",
      example:
        "Future simple (je viendrai) + Future anterior (il aura fait) + Conditional (je viendrais) + Conditional perfect (il aurait fait)",
    },
    {
      term: "Passive and Causative Integration",
      definition:
        "Learn to use passive voice and causative faire naturally in complex contexts",
      example:
        "Passive voice (je suis aimé) + Causative faire (il fait construire) + Gerunds (en parlant) + Transitions (d'abord, ensuite, puis, enfin)",
    },
  ],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Age expressions
    {
      text: " vingt-cinq ans.",
      instruction: "Complete: 'I am 25 years old'",
      blanks: [
        {
          position: 0,
          answer: "J'ai",
          hint: "French uses 'have' for age",
        },
      ],
    },
    {
      text: " avez-vous?",
      instruction: "Complete: 'How old are you?' (formal)",
      blanks: [
        {
          position: 0,
          answer: "Quel âge",
          hint: "what age (formal question)",
        },
      ],
    },

    // donner - to give (rank 24)
    {
      text: "Je te  le livre.",
      instruction: "Complete: 'I give you the book'",
      blanks: [
        {
          position: 6,
          answer: "donne",
          hint: "to give (je form)",
        },
      ],
    },
    {
      text: "Tu peux me  ton numéro?",
      instruction: "Complete: 'Can you give me your number?'",
      blanks: [
        {
          position: 11,
          answer: "donner",
          hint: "infinitive after 'peux'",
        },
      ],
    },

    // Daily actions: dormir, travailler, vivre
    {
      text: "Je  huit heures par nuit.",
      instruction: "Complete: 'I sleep eight hours per night'",
      blanks: [
        {
          position: 3,
          answer: "dors",
          hint: "to sleep (je form)",
        },
      ],
    },
    {
      text: "Où -vous?",
      instruction: "Complete: 'Where do you work?' (formal)",
      blanks: [
        {
          position: 3,
          answer: "travaillez",
          hint: "to work (vous form)",
        },
      ],
    },
    {
      text: "Elle  à Paris depuis dix ans.",
      instruction: "Complete: 'She has been living in Paris for ten years'",
      blanks: [
        {
          position: 5,
          answer: "vit",
          hint: "to live (elle form - irregular)",
        },
      ],
    },

    // Search and find
    {
      text: "Je  mes clés!",
      instruction: "Complete: 'I'm looking for my keys!'",
      blanks: [
        {
          position: 3,
          answer: "cherche",
          hint: "to look for (je form)",
        },
      ],
    },
    {
      text: "J'ai ! Elles étaient dans ma voiture.",
      instruction: "Complete: 'I found them! They were in my car.'",
      blanks: [
        {
          position: 5,
          answer: "trouvé",
          hint: "found (past participle)",
        },
      ],
    },

    // Perception verbs
    {
      text: "J' de la musique classique.",
      instruction: "Complete: 'I listen to classical music'",
      blanks: [
        {
          position: 2,
          answer: "écoute",
          hint: "to listen (je form)",
        },
      ],
    },
    {
      text: "Nous  un film français.",
      instruction: "Complete: 'We're watching a French film'",
      blanks: [
        {
          position: 5,
          answer: "regardons",
          hint: "to watch (nous form)",
        },
      ],
    },

    // Social situations
    {
      text: "Tu  le bus depuis combien de temps?",
      instruction: "Complete: 'How long have you been waiting for the bus?'",
      blanks: [
        {
          position: 3,
          answer: "attends",
          hint: "to wait (tu form)",
        },
      ],
    },
    {
      text: "À quelle heure tu ?",
      instruction: "Complete: 'What time do you arrive?'",
      blanks: [
        {
          position: 17,
          answer: "arrives",
          hint: "to arrive (tu form)",
        },
      ],
    },
    {
      text: "Je  ici jusqu'à demain.",
      instruction: "Complete: 'I'm staying here until tomorrow'",
      blanks: [
        {
          position: 3,
          answer: "reste",
          hint: "to stay (je form)",
        },
      ],
    },

    // Directions
    {
      text: "Tournez , puis allez tout droit.",
      instruction: "Complete: 'Turn left, then go straight'",
      blanks: [
        {
          position: 8,
          answer: "à gauche",
          hint: "to the left",
        },
      ],
    },
    {
      text: "La banque est au  de la rue.",
      instruction: "Complete: 'The bank is at the corner of the street'",
      blanks: [
        {
          position: 17,
          answer: "coin",
          hint: "corner (street intersection)",
        },
      ],
    },

    // Integration - multiple Unit 11 concepts
    {
      text: "Excusez-moi,  est la gare? J'ai  rendez-vous là-bas à trois heures.",
      instruction:
        "Complete: 'Excuse me, where is the station? I have an appointment there at 3pm.'",
      blanks: [
        {
          position: 13,
          answer: "où",
          hint: "where (question word)",
        },
        {
          position: 37,
          answer: "un",
          hint: "a/an (masculine)",
        },
      ],
    },
    {
      text: "Je  mes amis au café. Ils  généralement vers huit heures.",
      instruction:
        "Complete: 'I wait for my friends at the café. They usually arrive around 8pm.'",
      blanks: [
        {
          position: 3,
          answer: "attends",
          hint: "to wait (je form)",
        },
        {
          position: 40,
          answer: "arrivent",
          hint: "to arrive (ils form)",
        },
      ],
    },

    // Advanced - Reading 11 style
    {
      text: "La France  rapidement. Ses habitants  dans des villes modernes.",
      instruction:
        "Complete: 'France evolves rapidly. Its inhabitants live in modern cities.'",
      blanks: [
        {
          position: 10,
          answer: "évolue",
          hint: "evolves (elle form)",
        },
        {
          position: 41,
          answer: "vivent",
          hint: "live (ils form)",
        },
      ],
    },

    // Personal information integration
    {
      text: "Je m'appelle Marie,  trente ans, et je  à Lyon où je  comme professeur.",
      instruction: "Complete personal introduction with age and work",
      blanks: [
        {
          position: 20,
          answer: "j'ai",
          hint: "I have (for age)",
        },
        {
          position: 42,
          answer: "vis",
          hint: "live (je form)",
        },
        {
          position: 57,
          answer: "travaille",
          hint: "work (je form)",
        },
      ],
    },
  ],
};
