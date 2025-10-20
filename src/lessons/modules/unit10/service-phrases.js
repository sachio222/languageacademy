/**
 * Module 126: Je me fais couper les cheveux - Service Phrases
 * Unit 10 - Getting things done by professionals
 */

export const servicePhrasesModule = {
  moduleKey: "2024-02-02-service-phrases", // Permanent identifier - never changes
  title: "Je me fais couper... - Service Phrases",
  description:
    "Talk about services and appointments! 'Je me fais couper les cheveux' (I'm getting my hair cut), 'Je fais réparer ma voiture' (I'm having my car repaired). Adult life essentials!",
  unit: 10,

  concepts: [
    {
      term: "Je me fais + verb = Getting Something Done TO YOU",
      definition: "Services for yourself: haircut, makeup, medical exams, etc.",
      example:
        "Je me fais couper les cheveux (I'm getting my hair cut - at salon)",
    },
    {
      term: "Je fais + verb = Having Something Done (Not You)",
      definition: "Having something repaired, built, cleaned by someone else",
      example:
        "Je fais réparer ma voiture (I'm having my car repaired - by mechanic)",
    },
  ],

  vocabularyReference: [
    {
      french: "je me fais couper les cheveux",
      english: "I'm getting my hair cut",
      note: "⭐ salon appointment!",
    },
    {
      french: "je fais réparer ma voiture",
      english: "I'm having my car repaired",
      note: "mechanic service",
    },
    {
      french: "je me fais maquiller",
      english: "I'm getting my makeup done",
      note: "makeup artist",
    },
    {
      french: "je fais nettoyer la maison",
      english: "I'm having the house cleaned",
      note: "cleaning service",
    },
    {
      french: "je me fais examiner",
      english: "I'm getting examined",
      note: "doctor appointment",
    },
    {
      french: "je fais construire une maison",
      english: "I'm having a house built",
      note: "construction project",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say you're getting your hair cut (salon appointment!)",
        prompt: "I'm getting my hair cut",
        hint: "je me fais couper les cheveux",
        expectedAnswer: "je me fais couper les cheveux",
        wrongAnswers: [
          {
            answer: "je coupe mes cheveux",
            feedback:
              "That means YOU cut it yourself! At salon, use: je me fais couper les cheveux",
          },
        ],
      },
      {
        instruction: "Say you're having your car repaired (at mechanic)",
        prompt: "I'm having my car repaired",
        hint: "je fais réparer ma voiture",
        expectedAnswer: "je fais réparer ma voiture",
        wrongAnswers: [
          {
            answer: "je répare ma voiture",
            feedback:
              "That means YOU repair it! By mechanic, use: je fais réparer ma voiture",
          },
        ],
      },
      {
        instruction: "Say you're getting your makeup done (makeup artist)",
        prompt: "I'm getting my makeup done",
        hint: "je me fais maquiller",
        expectedAnswer: "je me fais maquiller",
        wrongAnswers: [],
      },
      {
        instruction: "Say you're having the house cleaned (cleaning service)",
        prompt: "I'm having the house cleaned",
        hint: "je fais nettoyer la maison",
        expectedAnswer: "je fais nettoyer la maison",
        wrongAnswers: [],
      },
      {
        instruction: "Say you're getting examined (doctor appointment)",
        prompt: "I'm getting examined",
        hint: "je me fais examiner",
        expectedAnswer: "je me fais examiner",
        wrongAnswers: [],
      },
      {
        instruction: "Say you're having a house built (construction project)",
        prompt: "I'm having a house built",
        hint: "je fais construire une maison",
        expectedAnswer: "je fais construire une maison",
        wrongAnswers: [],
      },
    ],
  },
};
