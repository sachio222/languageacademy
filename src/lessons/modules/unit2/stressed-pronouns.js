/**
 * Stressed/Tonic Pronouns - moi, toi, lui, elle, nous, vous, eux, elles
 * Used after prepositions, for emphasis, and in short answers
 */

export const stressedPronouns = {
  moduleKey: "2024-01-19-stressed-pronouns", // Permanent identifier - never changes
  title: "Stressed Pronouns - moi, toi, lui...",
  description:
    "Learn the special pronouns used after words like 'with', 'for', 'without' - different from subject pronouns!",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Use special pronouns after 'with', 'for', 'without' (avec moi, pour toi)",
      "Emphasize who you're talking about (c'est moi - it's me)",
      "Give short emphatic answers (Moi? - Me?)"
    ],
    realWorldUse: "emphasize and specify people in conversation",
    nextModuleTeaser: "Add prepositions to describe locations and relationships"
  },

  concepts: [
    {
      term: "Stressed Pronouns (Pronoms Toniques)",
      definition:
        "Special pronouns used after prepositions, for emphasis, and alone",
      example:
        "Can't use 'je' or 'tu' after 'avec' or 'pour' - need 'moi' and 'toi'!",
    },
    {
      term: "When to Use Stressed Pronouns",
      definition:
        "After prepositions (avec, pour, sans, chez), for emphasis, or alone",
      example:
        "avec moi (with me), pour toi (for you), c'est lui (it's him), Moi? (Me?)",
    },
    {
      term: "Subject vs. Stressed",
      definition:
        "Subject pronouns go before verbs. Stressed pronouns go after prepositions.",
      example: "je suis (I am) BUT avec moi (with me) - different pronouns!",
    },
  ],

  vocabularyReference: [
    { french: "moi", english: "me (stressed)", note: "after prepositions" },
    {
      french: "toi",
      english: "you (stressed, informal)",
      note: "pour toi = for you",
    },
    {
      french: "lui",
      english: "him (stressed)",
      note: "avec lui = with him",
    },
    {
      french: "elle",
      english: "her (stressed)",
      note: "same as subject pronoun",
    },
    {
      french: "nous",
      english: "us (stressed)",
      note: "same as subject pronoun",
    },
    {
      french: "vous",
      english: "you (stressed, formal/plural)",
      note: "same as subject pronoun",
    },
    {
      french: "eux",
      english: "them (stressed, masculine)",
      note: "avec eux = with them",
    },
    {
      french: "elles",
      english: "them (stressed, feminine)",
      note: "same as subject pronoun",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "What is the stressed pronoun for 'I/me'?",
        prompt: "me (stressed - after prepositions)",
        hint: "Different from 'je' - three letters",
        expectedAnswer: "moi",
        wrongAnswers: [
          {
            answer: "je",
            feedback: "That's subject pronoun. Use stressed form 'moi'",
          },
          {
            answer: "me",
            feedback: "That's object pronoun. Use stressed form 'moi'",
          },
        ],
      },
      {
        instruction:
          "What is the stressed pronoun for 'you' (informal, after prepositions)?",
        prompt: "you (stressed, informal)",
        hint: "Different from 'tu' - three letters",
        expectedAnswer: "toi",
        wrongAnswers: [
          {
            answer: "tu",
            feedback: "That's subject pronoun. Use stressed form 'toi'",
          },
          {
            answer: "te",
            feedback: "That's object pronoun. Use stressed form 'toi'",
          },
        ],
      },
      {
        instruction:
          "What is the stressed pronoun for 'him' (after prepositions)?",
        prompt: "him (stressed)",
        hint: "Different from 'il' - three letters",
        expectedAnswer: "lui",
        wrongAnswers: [
          {
            answer: "il",
            feedback: "That's subject pronoun. Use stressed form 'lui'",
          },
          {
            answer: "le",
            feedback: "That's object pronoun. Use stressed form 'lui'",
          },
        ],
      },
      {
        instruction: "What is the stressed pronoun for 'her'?",
        prompt: "her (stressed)",
        hint: "Same as subject pronoun - four letters",
        expectedAnswer: "elle",
        wrongAnswers: [
          {
            answer: "la",
            feedback: "That's object pronoun. Use stressed form 'elle'",
          },
        ],
      },
      {
        instruction: "What is the stressed pronoun for 'us'?",
        prompt: "us (stressed)",
        hint: "Same as subject pronoun",
        expectedAnswer: "nous",
        wrongAnswers: [],
      },
      {
        instruction: "What is the stressed pronoun for 'you' (formal/plural)?",
        prompt: "you (stressed, formal/plural)",
        hint: "Same as subject pronoun",
        expectedAnswer: "vous",
        wrongAnswers: [],
      },
      {
        instruction: "What is the stressed pronoun for 'them' (masculine)?",
        prompt: "them (stressed, masculine)",
        hint: "Different from 'ils' - three letters",
        expectedAnswer: "eux",
        wrongAnswers: [
          {
            answer: "ils",
            feedback: "That's subject pronoun. Use stressed form 'eux'",
          },
          {
            answer: "les",
            feedback: "That's object pronoun. Use stressed form 'eux'",
          },
        ],
      },
      {
        instruction: "What is the stressed pronoun for 'them' (feminine)?",
        prompt: "them (stressed, feminine)",
        hint: "Same as subject pronoun",
        expectedAnswer: "elles",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'with me'",
        prompt: "with me",
        hint: "avec + stressed pronoun for 'me'",
        expectedAnswer: "avec moi",
        wrongAnswers: [
          {
            answer: "avec je",
            feedback: "Can't use subject pronoun after 'avec'. Use 'moi'",
          },
        ],
      },
      {
        instruction: "Say 'for you' (informal)",
        prompt: "for you (informal)",
        hint: "pour + stressed pronoun for 'you' informal",
        expectedAnswer: "pour toi",
        wrongAnswers: [
          {
            answer: "pour tu",
            feedback: "Can't use subject pronoun after 'pour'. Use 'toi'",
          },
        ],
      },
      {
        instruction: "Say 'with him'",
        prompt: "with him",
        hint: "avec + stressed pronoun for 'him'",
        expectedAnswer: "avec lui",
        wrongAnswers: [
          {
            answer: "avec il",
            feedback: "Can't use subject pronoun after 'avec'. Use 'lui'",
          },
        ],
      },
      {
        instruction: "Say 'for them' (masculine)",
        prompt: "for them (masculine)",
        hint: "pour + stressed pronoun for 'them' masculine",
        expectedAnswer: "pour eux",
        wrongAnswers: [
          {
            answer: "pour ils",
            feedback: "Can't use subject pronoun after 'pour'. Use 'eux'",
          },
        ],
      },
    ],
  },
};
