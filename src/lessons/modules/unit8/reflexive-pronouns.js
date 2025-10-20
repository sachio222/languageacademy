/**
 * Module: Reflexive Pronouns
 * Unit 8 - Daily Life & Actions
 * Foundation for all reflexive verbs
 */

export const reflexivePronounsModule = {
  moduleKey: "2024-05-21-reflexive-pronouns", // Permanent identifier - never changes
  title: "Reflexive Pronouns - me, te, se, nous, vous",
  description:
    "Learn reflexive pronouns for daily actions: je me lave (I wash myself), tu te lèves (you get up), il se prépare (he gets ready)",

  concepts: [
    {
      term: "Reflexive Pronouns",
      definition:
        "Pronouns that refer back to the subject - 'myself', 'yourself', 'himself', etc.",
      example:
        "je me lave (I wash myself), tu te lèves (you get yourself up), il se prépare (he prepares himself)",
    },
    {
      term: "Parallel to Object Pronouns",
      definition:
        "Same forms as object pronouns, but refer back to the subject",
      example:
        "Object: il me voit (he sees me). Reflexive: je me vois (I see myself)",
    },
    {
      term: "Position: Before the Verb",
      definition:
        "Reflexive pronouns go BEFORE the conjugated verb, just like object pronouns",
      example: "je me lave (not je lave me), tu te lèves (not tu lèves te)",
    },
    {
      term: "The Reflexive Pronoun Set",
      definition:
        "me (myself), te (yourself), se (himself/herself/oneself), nous (ourselves), vous (yourselves), se (themselves)",
      example:
        "Each pronoun matches a subject: je → me, tu → te, il/elle → se, nous → nous, vous → vous, ils/elles → se",
    },
  ],

  vocabularyReference: [
    {
      french: "me",
      english: "myself",
      note: "je me... (I ...myself)",
    },
    {
      french: "te",
      english: "yourself (informal)",
      note: "tu te... (you ...yourself)",
    },
    {
      french: "se",
      english: "himself / herself / oneself / themselves",
      note: "il/elle/on se... ils/elles se...",
    },
    {
      french: "nous",
      english: "ourselves",
      note: "nous nous... (we ...ourselves)",
    },
    {
      french: "vous",
      english: "yourselves / yourself (formal)",
      note: "vous vous... (you ...yourselves)",
    },
    {
      french: "je me lave",
      english: "I wash myself",
      note: "⭐ example reflexive verb",
    },
    {
      french: "tu te lèves",
      english: "you get (yourself) up",
      note: "example with tu",
    },
    {
      french: "il se prépare",
      english: "he prepares himself / he gets ready",
      note: "example with il",
    },
    {
      french: "nous nous aimons",
      english: "we love ourselves / we love each other",
      note: "reciprocal use",
    },
  ],

  exercises: [
    {
      id: "reflexive-pronouns.1",
      instruction: "Which reflexive pronoun goes with 'je'?",
      prompt: "je ... lave (I wash myself)",
      hint: "Reflexive for first person singular",
      expectedAnswer: "me",
      wrongAnswers: [
        {
          answer: "te",
          feedback: "That's for 'tu' - use 'me' for 'je'",
        },
      ],
    },
    {
      id: "reflexive-pronouns.2",
      instruction: "Which reflexive pronoun goes with 'tu'?",
      prompt: "tu ... lèves (you get up)",
      hint: "Reflexive for second person singular",
      expectedAnswer: "te",
      wrongAnswers: [
        {
          answer: "me",
          feedback: "That's for 'je' - use 'te' for 'tu'",
        },
      ],
    },
    {
      id: "reflexive-pronouns.3",
      instruction: "Which reflexive pronoun goes with 'il'?",
      prompt: "il ... prépare (he prepares himself)",
      hint: "Reflexive for third person - same for il/elle/on",
      expectedAnswer: "se",
      wrongAnswers: [],
    },
    {
      id: "reflexive-pronouns.4",
      instruction: "Which reflexive pronoun goes with 'elle'?",
      prompt: "elle ... habille (she gets dressed)",
      hint: "Same as for 'il' - third person reflexive",
      expectedAnswer: "se",
      wrongAnswers: [],
    },
    {
      id: "reflexive-pronouns.5",
      instruction: "Which reflexive pronoun goes with 'nous'?",
      prompt: "nous ... levons (we get up)",
      hint: "First person plural - same as subject pronoun",
      expectedAnswer: "nous",
      wrongAnswers: [],
    },
    {
      id: "reflexive-pronouns.6",
      instruction: "Which reflexive pronoun goes with 'vous'?",
      prompt: "vous ... préparez (you get ready)",
      hint: "Second person plural - same as subject pronoun",
      expectedAnswer: "vous",
      wrongAnswers: [],
    },
    {
      id: "reflexive-pronouns.7",
      instruction: "Which reflexive pronoun goes with 'ils'?",
      prompt: "ils ... amusent (they have fun)",
      hint: "Third person plural - same as singular 'il'",
      expectedAnswer: "se",
      wrongAnswers: [],
    },
    {
      id: "reflexive-pronouns.8",
      instruction: "Say 'I wash myself'",
      prompt: "I wash myself",
      hint: "je + me + laver conjugated",
      expectedAnswer: "je me lave",
      wrongAnswers: [
        {
          answer: "je lave me",
          feedback: "Reflexive pronoun goes BEFORE the verb: je me lave",
        },
      ],
    },
  ],
};
