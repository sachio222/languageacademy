/**
 * Module 144: Perception Verbs - écouter, regarder
 * Unit 11 - Full conjugations of listen/watch (beyond just commands)
 * Ranks 65-66 in top 100
 */

export const perceptionVerbsModule = {
  title: "Perception Verbs - écouter, regarder",
  description:
    "Beyond commands! Full conjugations of écouter (to listen) and regarder (to watch/look at). 'J'écoute de la musique' (I listen to music), 'Je regarde la télé' (I watch TV).",
  unit: 11,

  concepts: [
    {
      term: "écouter = to listen (rank 65)",
      definition:
        "Regular -ER verb for active listening - music, people, sounds",
      example:
        "J'écoute de la musique (I listen to music), Tu écoutes le professeur (You listen to the teacher)",
    },
    {
      term: "regarder = to watch / to look at (rank 66)",
      definition: "Regular -ER verb for visual attention - TV, people, things",
      example:
        "Je regarde la télé (I watch TV), Il regarde par la fenêtre (He looks out the window)",
    },
    {
      term: "Beyond Commands",
      definition:
        "You know 'Écoute!' and 'Regarde!' - now learn full conjugations",
      example:
        "From commands to conversations: 'Regarde!' → 'Je regarde souvent des films' (I often watch movies)",
    },
    {
      term: "Perception Integration",
      definition:
        "Complete your five senses with voir (see), écouter (hear), sentir (smell/feel)",
      example:
        "Je vois (I see), j'écoute (I listen), je regarde (I look at) - complete visual and auditory perception",
    },
  ],

  vocabularyReference: [
    // écouter - to listen
    {
      french: "écouter",
      english: "to listen",
      note: "⭐ Rank 65 - regular -ER verb",
    },
    {
      french: "j'écoute",
      english: "I listen / I'm listening",
      note: "active listening",
    },
    {
      french: "tu écoutes",
      english: "you listen (informal)",
      note: "add -s for tu",
    },
    {
      french: "il écoute",
      english: "he listens",
      note: "base form",
    },
    {
      french: "elle écoute",
      english: "she listens",
      note: "same as il",
    },
    {
      french: "nous écoutons",
      english: "we listen",
      note: "add -ons",
    },
    {
      french: "vous écoutez",
      english: "you listen (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils écoutent",
      english: "they listen (masculine)",
      note: "add -ent",
    },
    {
      french: "elles écoutent",
      english: "they listen (feminine)",
      note: "same as ils",
    },

    // regarder - to watch/look at
    {
      french: "regarder",
      english: "to watch / to look at",
      note: "⭐ Rank 66 - regular -ER verb",
    },
    {
      french: "je regarde",
      english: "I watch / I look at",
      note: "visual attention",
    },
    {
      french: "tu regardes",
      english: "you watch (informal)",
      note: "add -s for tu",
    },
    {
      french: "il regarde",
      english: "he watches",
      note: "base form",
    },
    {
      french: "elle regarde",
      english: "she watches",
      note: "same as il",
    },
    {
      french: "nous regardons",
      english: "we watch",
      note: "add -ons",
    },
    {
      french: "vous regardez",
      english: "you watch (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils regardent",
      english: "they watch (masculine)",
      note: "add -ent",
    },
    {
      french: "elles regardent",
      english: "they watch (feminine)",
      note: "same as ils",
    },

    // Common phrases
    {
      french: "écouter de la musique",
      english: "to listen to music",
      note: "⭐ very common activity",
    },
    {
      french: "regarder la télé",
      english: "to watch TV",
      note: "⭐ very common activity",
    },
    {
      french: "regarder un film",
      english: "to watch a movie",
      note: "entertainment activity",
    },
    {
      french: "écouter le professeur",
      english: "to listen to the teacher",
      note: "school/learning context",
    },
    {
      french: "regarder par la fenêtre",
      english: "to look out the window",
      note: "common observation action",
    },
    {
      french: "qu'est-ce que tu écoutes?",
      english: "what are you listening to?",
      note: "asking about music/audio",
    },
    {
      french: "qu'est-ce que tu regardes?",
      english: "what are you watching?",
      note: "asking about visual content",
    },
    {
      french: "je trouve que",
      english: "I think that / I find that",
      note: "opinion expression using trouver",
    },
    {
      french: "comment tu trouves ça?",
      english: "what do you think of that?",
      note: "asking for opinion",
    },
    {
      french: "bien écouter",
      english: "to listen well / carefully",
      note: "quality listening",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // écouter conjugation
      {
        instruction: "Translate to French",
        prompt: "I listen",
        hint: "écouter for je",
        expectedAnswer: "j'écoute",
      },
      {
        instruction: "Translate to French",
        prompt: "you listen (informal)",
        hint: "écouter for tu",
        expectedAnswer: "tu écoutes",
      },
      {
        instruction: "Translate to French",
        prompt: "we listen",
        hint: "écouter for nous",
        expectedAnswer: "nous écoutons",
      },

      // regarder conjugation
      {
        instruction: "Translate to French",
        prompt: "I watch",
        hint: "regarder for je",
        expectedAnswer: "je regarde",
      },
      {
        instruction: "Translate to French",
        prompt: "he watches",
        hint: "regarder for il",
        expectedAnswer: "il regarde",
      },
      {
        instruction: "Translate to French",
        prompt: "you watch (formal)",
        hint: "regarder for vous",
        expectedAnswer: "vous regardez",
      },

      // Practical usage
      {
        instruction: "Say: 'I listen to music'",
        prompt: "I listen to music",
        hint: "j'écoute + de la musique",
        expectedAnswer: "j'écoute de la musique",
      },
      {
        instruction: "Say: 'I watch TV'",
        prompt: "I watch TV",
        hint: "je regarde + la télé",
        expectedAnswer: "je regarde la télé",
        acceptableAnswers: ["je regarde la télévision"],
      },
      {
        instruction: "Ask: 'What are you listening to?'",
        prompt: "What are you listening to?",
        hint: "qu'est-ce que + tu écoutes",
        expectedAnswer: "qu'est-ce que tu écoutes?",
        acceptableAnswers: ["tu écoutes quoi?"],
      },
      {
        instruction: "Ask: 'What are you watching?'",
        prompt: "What are you watching?",
        hint: "qu'est-ce que + tu regardes",
        expectedAnswer: "qu'est-ce que tu regardes?",
        acceptableAnswers: ["tu regardes quoi?"],
      },
      {
        instruction: "Say: 'I watch movies'",
        prompt: "I watch movies",
        hint: "je regarde + des films",
        expectedAnswer: "je regarde des films",
      },
      {
        instruction: "Say: 'Listen to the teacher!'",
        prompt: "Listen to the teacher!",
        hint: "Command + le professeur",
        expectedAnswer: "écoute le professeur!",
        acceptableAnswers: ["écoutez le professeur!"],
      },
      {
        instruction: "Express opinion: 'I think that's interesting'",
        prompt: "I think that's interesting",
        hint: "je trouve que + c'est intéressant",
        expectedAnswer: "je trouve que c'est intéressant",
        acceptableAnswers: ["je trouve ça intéressant"],
      },
      {
        instruction: "Ask opinion: 'What do you think of this?'",
        prompt: "What do you think of this?",
        hint: "comment + tu trouves + ça",
        expectedAnswer: "comment tu trouves ça?",
        acceptableAnswers: ["tu trouves ça comment?"],
      },
    ],
  },

  skipStudyMode: false,
};
