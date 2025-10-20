/**
 * Module: Imperative - tu form (Informal Commands)
 * Unit 8 - Daily Life & Actions
 * Give commands to friends and family
 */

export const commandsTuModule = {
  moduleKey: "2024-05-13-commands-tu", // Permanent identifier - never changes
  title: "Commands - tu form (Informal)",
  description:
    "Give informal commands: Mange! (Eat!), Parle! (Speak!), Fais attention! (Be careful!)",

  concepts: [
    {
      term: "Imperative Mood = Commands",
      definition: "Tell someone to do something - no subject pronoun needed!",
      example: "Mange! (Eat!), Parle! (Speak!), Va! (Go!)",
    },
    {
      term: "tu form: Just Drop the Pronoun!",
      definition: "For most verbs, use the tu form without 'tu'",
      example:
        "tu manges → Mange! (you eat → Eat!), tu parles → Parle! (you speak → Speak!)",
    },
    {
      term: "-ER verbs: Drop the final -s",
      definition:
        "For -ER verbs only, also drop the final -s in tu command form",
      example:
        "tu manges → Mange! (not Manges!), tu parles → Parle! (not Parles!)",
    },
    {
      term: "Use with Friends and Family",
      definition: "tu commands are informal - use with people you'd call 'tu'",
      example: "To a friend: Mange! (Eat!), Écoute! (Listen!), Viens! (Come!)",
    },
  ],

  vocabularyReference: [
    {
      french: "Mange!",
      english: "Eat!",
      note: "⭐ command from manger",
    },
    {
      french: "Parle!",
      english: "Speak!",
      note: "command from parler",
    },
    {
      french: "Écoute!",
      english: "Listen!",
      note: "command from écouter",
    },
    {
      french: "Regarde!",
      english: "Look! / Watch!",
      note: "command from regarder",
    },
    {
      french: "Pense!",
      english: "Think!",
      note: "command from penser",
    },
    {
      french: "Viens!",
      english: "Come!",
      note: "command from venir",
    },
    {
      french: "Pars!",
      english: "Leave! / Go!",
      note: "command from partir",
    },
    {
      french: "Prends!",
      english: "Take!",
      note: "command from prendre",
    },
  ],

  exercises: [
    {
      id: "commands-tu.1",
      instruction: "Give the command 'Eat!' (to a friend)",
      prompt: "Eat! (informal)",
      hint: "manger → drop tu and final -s",
      expectedAnswer: "mange",
      wrongAnswers: [
        {
          answer: "manges",
          feedback: "Drop the -s for -ER verb commands: Mange! (not Manges!)",
        },
      ],
    },
    {
      id: "commands-tu.2",
      instruction: "Give the command 'Speak!' (to a friend)",
      prompt: "Speak! (informal)",
      hint: "parler → Parle!",
      expectedAnswer: "parle",
      wrongAnswers: [],
    },
    {
      id: "commands-tu.3",
      instruction: "Give the command 'Listen!' (to a friend)",
      prompt: "Listen! (informal)",
      hint: "écouter → Écoute!",
      expectedAnswer: "écoute",
      acceptableAnswers: ["ecoute"],
      wrongAnswers: [],
    },
    {
      id: "commands-tu.4",
      instruction: "Give the command 'Think!' (to a friend)",
      prompt: "Think! (informal)",
      hint: "penser → Pense!",
      expectedAnswer: "pense",
      wrongAnswers: [],
    },
    {
      id: "commands-tu.5",
      instruction: "Give the command 'Come!' (to a friend)",
      prompt: "Come! (informal)",
      hint: "venir → Viens! (keep the -s, not -ER verb)",
      expectedAnswer: "viens",
      wrongAnswers: [],
    },
    {
      id: "commands-tu.6",
      instruction: "Give the command 'Take!' (to a friend)",
      prompt: "Take! (informal)",
      hint: "prendre → Prends!",
      expectedAnswer: "prends",
      wrongAnswers: [],
    },
  ],
};
