/**
 * Module: Imperative - vous form (Formal/Plural Commands)
 * Unit 8 - Daily Life & Actions
 * Give formal commands or commands to groups
 */

export const commandsVousModule = {
  title: "Commands - vous form (Formal/Plural)",
  description:
    "Give formal or plural commands: Mangez! (Eat!), Parlez! (Speak!), Écoutez! (Listen!)",

  concepts: [
    {
      term: "vous Commands = Formal or Groups",
      definition: "Use vous form for strangers, bosses, or multiple people",
      example: "To strangers: Mangez! To a group: Venez! (Come!)",
    },
    {
      term: "Easy Formation: Drop the Pronoun!",
      definition: "Just use vous form without saying 'vous'",
      example: "vous mangez → Mangez!, vous parlez → Parlez!",
    },
    {
      term: "Keep the -ez Ending",
      definition: "Unlike tu commands, vous commands keep all letters!",
      example: "Mangez! (not Mange!), Parlez! (not Parle!)",
    },
  ],

  vocabularyReference: [
    {
      french: "Mangez!",
      english: "Eat! (formal/plural)",
      note: "command from manger",
    },
    {
      french: "Parlez!",
      english: "Speak! (formal/plural)",
      note: "command from parler",
    },
    {
      french: "Écoutez!",
      english: "Listen! (formal/plural)",
      note: "⭐ very common!",
    },
    {
      french: "Regardez!",
      english: "Look! (formal/plural)",
      note: "command from regarder",
    },
    {
      french: "Venez!",
      english: "Come! (formal/plural)",
      note: "command from venir",
    },
    {
      french: "Prenez!",
      english: "Take! (formal/plural)",
      note: "command from prendre",
    },
  ],

  exercises: [
    {
      id: "commands-vous.1",
      instruction: "Give the command 'Eat!' (formal)",
      prompt: "Eat! (formal)",
      hint: "vous mangez → Mangez!",
      expectedAnswer: "mangez",
      wrongAnswers: [],
    },
    {
      id: "commands-vous.2",
      instruction: "Give the command 'Speak!' (formal)",
      prompt: "Speak! (formal)",
      hint: "vous parlez → Parlez!",
      expectedAnswer: "parlez",
      wrongAnswers: [],
    },
    {
      id: "commands-vous.3",
      instruction: "Give the command 'Listen!' (formal)",
      prompt: "Listen! (formal)",
      hint: "vous écoutez → Écoutez!",
      expectedAnswer: "écoutez",
      acceptableAnswers: ["ecoutez"],
      wrongAnswers: [],
    },
    {
      id: "commands-vous.4",
      instruction: "Give the command 'Come!' (formal)",
      prompt: "Come! (formal)",
      hint: "vous venez → Venez!",
      expectedAnswer: "venez",
      wrongAnswers: [],
    },
  ],
};
