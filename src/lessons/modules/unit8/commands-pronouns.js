/**
 * Module: Commands with Pronouns
 * Unit 8 - Daily Life & Actions
 * Complex but extremely useful - Donne-le-moi!
 */

export const commandsPronounsModule = {
  moduleKey: "2024-05-12-commands-pronouns", // Permanent identifier - never changes
  title: "Commands with Pronouns",
  description:
    "Give commands with objects: Donne-le-moi! (Give it to me!), Regarde-moi! (Look at me!), Ne le fais pas! (Don't do it!)",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Give commands with object pronouns (Give it to me!)",
      "Use pronouns with affirmative and negative commands",
      "Form complex commands like 'Don't do it!' or 'Look at me!'"
    ],
    realWorldUse: "give precise instructions with objects",
    nextModuleTeaser: "Add temporal words to sequence events"
  },

  concepts: [
    {
      term: "Affirmative Commands: Attach with Hyphens",
      definition:
        "In positive commands, pronouns attach to the verb with hyphens",
      example:
        "Donne-le! (Give it!), Regarde-moi! (Look at me!), Écoute-le! (Listen to him!)",
    },
    {
      term: "Negative Commands: Separate with ne...pas",
      definition:
        "In negative commands, pronouns go BEFORE the verb (normal position)",
      example:
        "Ne le fais pas! (Don't do it!), Ne me regarde pas! (Don't look at me!)",
    },
    {
      term: "Pronoun Order in Commands",
      definition: "Object pronouns: le/la/les come first, then moi/toi",
      example:
        "Donne-le-moi! (Give it to me! - le before moi), Montre-la-moi! (Show it to me!)",
    },
  ],

  vocabularyReference: [
    {
      french: "Donne-le-moi!",
      english: "Give it to me!",
      note: "⭐ command + object + indirect",
    },
    {
      french: "Regarde-moi!",
      english: "Look at me!",
      note: "command + moi",
    },
    {
      french: "Écoute-le!",
      english: "Listen to him!",
      note: "command + object",
    },
    {
      french: "Ne le fais pas!",
      english: "Don't do it!",
      note: "⭐ negative command",
    },
    {
      french: "Ne me regarde pas!",
      english: "Don't look at me!",
      note: "negative with me",
    },
  ],

  exercises: [
    {
      id: "cmd-pron.1",
      instruction: "Command: 'Give it!' (informal - it = masculine)",
      prompt: "Give it! (le)",
      hint: "Donne + le with hyphen",
      expectedAnswer: "donne-le",
      acceptableAnswers: ["donne le"],
      wrongAnswers: [],
    },
    {
      id: "cmd-pron.2",
      instruction: "Command: 'Look at me!' (informal)",
      prompt: "Look at me!",
      hint: "Regarde + moi with hyphen",
      expectedAnswer: "regarde-moi",
      acceptableAnswers: ["regarde moi"],
      wrongAnswers: [],
    },
    {
      id: "cmd-pron.3",
      instruction: "Command: 'Listen to him!' (informal)",
      prompt: "Listen to him!",
      hint: "Écoute + le with hyphen",
      expectedAnswer: "écoute-le",
      acceptableAnswers: ["ecoute-le", "ecoute le"],
      wrongAnswers: [],
    },
    {
      id: "cmd-pron.4",
      instruction: "Negative command: 'Don't do it!' (informal)",
      prompt: "Don't do it!",
      hint: "Ne + le + fais + pas (pronoun BEFORE verb in negative)",
      expectedAnswer: "ne le fais pas",
      wrongAnswers: [
        {
          answer: "ne fais pas le",
          feedback:
            "In negative commands, pronoun goes BEFORE: Ne le fais pas!",
        },
      ],
    },
    {
      id: "cmd-pron.5",
      instruction: "Command: 'Give it to me!' (informal, it = le)",
      prompt: "Give it to me!",
      hint: "Donne-le-moi! (verb-object-recipient)",
      expectedAnswer: "donne-le-moi",
      acceptableAnswers: ["donne le moi"],
      wrongAnswers: [],
    },
  ],
};
