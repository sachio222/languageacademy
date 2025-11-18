/**
 * Module: Dynamic ID (auto-assigned)3: Search & Find - chercher, trouver
 * Unit 11 - Perfect verb pair: look for something, then find it!
 * Ranks 57-58 in top 100
 */

export const searchAndFindModule = {
  moduleKey: "2024-02-13-search-and-find", // Permanent identifier - never changes
  title: "Search & Find - chercher, trouver",
  description:
    "Perfect action pair! chercher (to look for) + trouver (to find). 'Je cherche mes clés' → 'J'ai trouvé!' Extremely practical for daily life.",
  unit: 11,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express searching and finding things (I'm looking for, I found)",
      "Talk about lost items and discoveries",
      "Use the natural search → find sequence"
    ],
    realWorldUse: "search for and find things",
    nextModuleTeaser: "Add perception verbs to complete sensory vocabulary"
  },

  concepts: [
    {
      term: "chercher = to look for / to search (rank 57)",
      definition:
        "Regular -ER verb for searching - used constantly in daily life",
      example:
        "Je cherche mes clés (I'm looking for my keys), Tu cherches quoi? (What are you looking for?)",
    },
    {
      term: "trouver = to find (rank 58)",
      definition:
        "Regular -ER verb for finding - the successful result of chercher!",
      example:
        "J'ai trouvé! (I found it!), Tu trouves ça comment? (What do you think of that?)",
    },
    {
      term: "The Perfect Sequence",
      definition: "These two verbs form a natural action sequence",
      example:
        "Je cherche → Je trouve (I search → I find). The complete search-and-discovery process!",
    },
    {
      term: "Extended Meanings",
      definition: "Both verbs have broader meanings beyond physical searching",
      example:
        "chercher = try to do, trouver = think/consider (Je trouve que... = I think that...)",
    },
  ],

  vocabularyReference: [
    // chercher - to look for
    {
      french: "chercher",
      english: "to look for / to search",
      note: "⭐ Rank 57 - regular -ER verb",
    },
    {
      french: "je cherche",
      english: "I look for / I'm looking for",
      note: "present continuous meaning",
    },
    {
      french: "tu cherches",
      english: "you look for (informal)",
      note: "add -s for tu",
    },
    {
      french: "il cherche",
      english: "he looks for",
      note: "base form",
    },
    {
      french: "elle cherche",
      english: "she looks for",
      note: "same as il",
    },
    {
      french: "nous cherchons",
      english: "we look for",
      note: "add -ons",
    },
    {
      french: "vous cherchez",
      english: "you look for (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils cherchent",
      english: "they look for (masculine)",
      note: "add -ent",
    },
    {
      french: "elles cherchent",
      english: "they look for (feminine)",
      note: "same as ils",
    },

    // trouver - to find
    {
      french: "trouver",
      english: "to find",
      note: "⭐ Rank 58 - regular -ER verb",
    },
    {
      french: "je trouve",
      english: "I find",
      note: "also means 'I think' (opinion)",
    },
    {
      french: "tu trouves",
      english: "you find (informal)",
      note: "add -s for tu",
    },
    {
      french: "il trouve",
      english: "he finds",
      note: "base form",
    },
    {
      french: "elle trouve",
      english: "she finds",
      note: "same as il",
    },
    {
      french: "nous trouvons",
      english: "we find",
      note: "add -ons",
    },
    {
      french: "vous trouvez",
      english: "you find (formal/plural)",
      note: "add -ez",
    },
    {
      french: "ils trouvent",
      english: "they find (masculine)",
      note: "add -ent",
    },
    {
      french: "elles trouvent",
      english: "they find (feminine)",
      note: "same as ils",
    },

    // Common phrases and expressions
    {
      french: "je cherche mes clés",
      english: "I'm looking for my keys",
      note: "⭐ very common daily phrase",
    },
    {
      french: "qu'est-ce que tu cherches?",
      english: "what are you looking for?",
      note: "common question",
    },
    {
      french: "tu cherches quoi?",
      english: "what are you looking for? (casual)",
      note: "informal version",
    },
    {
      french: "j'ai trouvé!",
      english: "I found it!",
      note: "⭐ exclamation when you find something",
    },
    {
      french: "je trouve que",
      english: "I think that / I find that",
      note: "opinion expression - very common",
    },
    {
      french: "tu trouves ça comment?",
      english: "what do you think of that?",
      note: "asking for opinion",
    },
    {
      french: "chercher du travail",
      english: "to look for work",
      note: "job searching",
    },
    {
      french: "trouver du travail",
      english: "to find work",
      note: "successful job search",
    },
    {
      french: "chercher quelqu'un",
      english: "to look for someone",
      note: "searching for a person",
    },
    {
      french: "trouver quelqu'un",
      english: "to find someone",
      note: "locating a person",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // chercher conjugation
      {
        instruction: "Translate to French",
        prompt: "I look for",
        hint: "chercher for je",
        expectedAnswer: "je cherche",
      },
      {
        instruction: "Translate to French",
        prompt: "you look for (informal)",
        hint: "chercher for tu",
        expectedAnswer: "tu cherches",
      },
      {
        instruction: "Translate to French",
        prompt: "we look for",
        hint: "chercher for nous",
        expectedAnswer: "nous cherchons",
      },

      // trouver conjugation
      {
        instruction: "Translate to French",
        prompt: "I find",
        hint: "trouver for je",
        expectedAnswer: "je trouve",
      },
      {
        instruction: "Translate to French",
        prompt: "she finds",
        hint: "trouver for elle",
        expectedAnswer: "elle trouve",
      },
      {
        instruction: "Translate to French",
        prompt: "they find",
        hint: "trouver for ils",
        expectedAnswer: "ils trouvent",
      },

      // Practical usage
      {
        instruction: "Say: 'I'm looking for my keys'",
        prompt: "I'm looking for my keys",
        hint: "je cherche + mes clés",
        expectedAnswer: "je cherche mes clés",
      },
      {
        instruction: "Ask: 'What are you looking for?'",
        prompt: "What are you looking for?",
        hint: "qu'est-ce que + tu cherches",
        expectedAnswer: "qu'est-ce que tu cherches",
        acceptableAnswers: ["tu cherches quoi"],
      },
      {
        instruction: "Exclaim: 'I found it!'",
        prompt: "I found it!",
        hint: "j'ai trouvé (past tense) + exclamation",
        expectedAnswer: "j'ai trouvé!",
        acceptableAnswers: ["je l'ai trouvé!"],
      },
      {
        instruction: "Express opinion: 'I think that's good'",
        prompt: "I think that's good",
        hint: "je trouve que + c'est bon",
        expectedAnswer: "je trouve que c'est bon",
        acceptableAnswers: ["je trouve ça bon"],
      },
      {
        instruction: "Say: 'I'm looking for work'",
        prompt: "I'm looking for work",
        hint: "je cherche + du travail",
        expectedAnswer: "je cherche du travail",
      },
      {
        instruction: "Say: 'Did you find your phone?'",
        prompt: "Did you find your phone?",
        hint: "tu as trouvé + ton téléphone",
        expectedAnswer: "tu as trouvé ton téléphone?",
        acceptableAnswers: ["as-tu trouvé ton téléphone?"],
      },
      {
        instruction: "Ask: 'How do you find this?' (opinion)",
        prompt: "How do you find this? / What do you think of this?",
        hint: "tu trouves + ça comment",
        expectedAnswer: "tu trouves ça comment?",
        acceptableAnswers: ["comment tu trouves ça?"],
      },
      {
        instruction: "Say: 'I can't find it'",
        prompt: "I can't find it",
        hint: "je ne peux pas + le trouver",
        expectedAnswer: "je ne peux pas le trouver",
        acceptableAnswers: ["je ne le trouve pas"],
      },
    ],
  },

  skipStudyMode: false,
};
