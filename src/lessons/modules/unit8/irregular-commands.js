/**
 * Module: Irregular Commands - être, avoir, aller, faire
 * Unit 8 - Daily Life & Actions
 * Most common commands are irregular!
 */

export const irregularCommandsModule = {
  moduleKey: "2024-05-18-irregular-commands", // Permanent identifier - never changes
  title: "Irregular Commands - être, avoir, aller, faire",
  description:
    "Essential irregular commands: Sois! (Be!), Aie! (Have!), Va! (Go!), Fais! (Do/Make!)",

  concepts: [
    {
      term: "Most Common Verbs = Irregular Commands",
      definition:
        "être, avoir, aller, and faire don't follow normal command patterns",
      example:
        "Sois gentil! (Be nice!), Aie courage! (Have courage!), Va là-bas! (Go over there!)",
    },
    {
      term: "Must Memorize These",
      definition:
        "These irregular forms are used constantly - worth memorizing!",
      example: "Vas-y! (Go ahead! / Go for it!) - extremely common phrase",
    },
    {
      term: "être Commands",
      definition: "tu: Sois! vous: Soyez! nous: Soyons!",
      example: "Sois sage! (Be good!), Soyez gentil! (Be kind!)",
    },
    {
      term: "avoir Commands",
      definition: "tu: Aie! vous: Ayez! nous: Ayons!",
      example:
        "Aie confiance! (Have confidence!), Ayez patience! (Have patience!)",
    },
    {
      term: "aller Commands",
      definition: "tu: Va! vous: Allez! nous: Allons! Special: Vas-y!",
      example:
        "Va là-bas! (Go over there!), Allons-y! (Let's go!), Vas-y! (Go ahead!)",
    },
    {
      term: "faire Commands",
      definition: "tu: Fais! vous: Faites! nous: Faisons!",
      example:
        "Fais attention! (Pay attention! / Be careful!), Faites ça! (Do that!)",
    },
  ],

  vocabularyReference: [
    {
      french: "Sois!",
      english: "Be! (informal)",
      note: "⭐ être command - tu form",
    },
    {
      french: "Soyez!",
      english: "Be! (formal/plural)",
      note: "être command - vous form",
    },
    {
      french: "Sois gentil!",
      english: "Be nice!",
      note: "common command",
    },
    {
      french: "Aie!",
      english: "Have! (informal)",
      note: "avoir command - tu form",
    },
    {
      french: "Ayez!",
      english: "Have! (formal/plural)",
      note: "avoir command - vous form",
    },
    {
      french: "Aie confiance!",
      english: "Have confidence!",
      note: "encouragement",
    },
    {
      french: "Va!",
      english: "Go! (informal)",
      note: "⭐ aller command - tu form",
    },
    {
      french: "Allez!",
      english: "Go! (formal/plural)",
      note: "aller command - vous form",
    },
    {
      french: "Vas-y!",
      english: "Go ahead! / Go for it!",
      note: "⭐⭐⭐ extremely common phrase!",
    },
    {
      french: "Allons-y!",
      english: "Let's go!",
      note: "⭐ group command",
    },
    {
      french: "Fais!",
      english: "Do! / Make! (informal)",
      note: "faire command - tu form",
    },
    {
      french: "Faites!",
      english: "Do! / Make! (formal/plural)",
      note: "faire command - vous form",
    },
    {
      french: "Fais attention!",
      english: "Pay attention! / Be careful!",
      note: "⭐⭐ safety/warning",
    },
  ],

  exercises: [
    {
      id: "irreg-cmd.1",
      instruction: "Command: 'Be nice!' (informal)",
      prompt: "Be nice! (to a friend)",
      hint: "Sois + gentil!",
      expectedAnswer: "sois gentil",
      wrongAnswers: [
        {
          answer: "es gentil",
          feedback: "Use command form 'Sois', not 'es'",
        },
      ],
    },
    {
      id: "irreg-cmd.2",
      instruction: "Command: 'Have courage!' (informal)",
      prompt: "Have courage!",
      hint: "Aie + courage!",
      expectedAnswer: "aie courage",
      wrongAnswers: [],
    },
    {
      id: "irreg-cmd.3",
      instruction: "Command: 'Go over there!' (informal)",
      prompt: "Go over there!",
      hint: "Va + là-bas!",
      expectedAnswer: "va là-bas",
      acceptableAnswers: ["va la-bas"],
      wrongAnswers: [],
    },
    {
      id: "irreg-cmd.4",
      instruction: "Say the famous phrase 'Go ahead!' or 'Go for it!'",
      prompt: "Go ahead!",
      hint: "Va + -s + -y! (special form)",
      expectedAnswer: "vas-y",
      acceptableAnswers: ["vas y"],
      wrongAnswers: [
        {
          answer: "va-y",
          feedback: "Add -s before -y: Vas-y! (special form)",
        },
      ],
    },
    {
      id: "irreg-cmd.5",
      instruction: "Command: 'Pay attention!' or 'Be careful!' (informal)",
      prompt: "Be careful! / Pay attention!",
      hint: "Fais + attention!",
      expectedAnswer: "fais attention",
      wrongAnswers: [],
    },
    {
      id: "irreg-cmd.6",
      instruction: "Command: 'Let's go!' (nous form)",
      prompt: "Let's go!",
      hint: "Allons + -y!",
      expectedAnswer: "allons-y",
      acceptableAnswers: ["allons y"],
      wrongAnswers: [],
    },
  ],
};
