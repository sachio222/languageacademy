/**
 * Module 151: Nature & Animals - Curiosity Vocabulary
 * Unit 12 - Animals and nature elements for asking questions about the world
 */

export const natureAnimalsModule = {
  title: "Nature & Animals - Curiosity Vocabulary",
  description:
    "Learn animals and nature vocabulary to ask curious questions about the world: un oiseau (bird), une tortue (turtle), un écureuil (squirrel), le vent (wind), la pluie (rain)",
  unit: 12,

  concepts: [
    {
      term: "Animals for Question-Asking",
      definition:
        "These animals are perfect examples for asking 'how does X do Y?' questions",
      example:
        "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?",
    },
    {
      term: "Learning Animal Genders",
      definition:
        "Always learn the article with the animal - gender matters for questions!",
      example:
        "un oiseau (masculine), une tortue (feminine), un écureuil (masculine)",
    },
    {
      term: "Nature Elements",
      definition:
        "Essential nature vocabulary for asking questions about natural phenomena",
      example:
        "le vent (wind), la pluie (rain), une plante (plant), un arbre (tree)",
    },
    {
      term: "Combining with Colors",
      definition:
        "Use color vocabulary from Reference module to describe animals",
      example:
        "un oiseau bleu (a blue bird), un papillon jaune (a yellow butterfly)",
    },
    {
      term: "Setting Up for Questions",
      definition:
        "This vocabulary enables curiosity questions in future modules",
      example:
        "After learning this: you can ask 'Pourquoi est-ce que les oiseaux volent?' (Why do birds fly?)",
    },
  ],

  vocabularyReference: [
    // Animals
    {
      french: "un oiseau",
      english: "a bird",
      note: "masculine - silent 's' in oiseau",
    },
    {
      french: "les oiseaux",
      english: "birds",
      note: "plural - silent 'x'",
    },
    {
      french: "une tortue",
      english: "a turtle",
      note: "feminine - slow movement example",
    },
    {
      french: "un écureuil",
      english: "a squirrel",
      note: "masculine - fast movement example",
    },
    {
      french: "un lapin",
      english: "a rabbit",
      note: "masculine - hopping example",
    },
    {
      french: "un papillon",
      english: "a butterfly",
      note: "masculine - flying insect",
    },
    {
      french: "une abeille",
      english: "a bee",
      note: "feminine - buzzing insect",
    },
    {
      french: "un poisson",
      english: "a fish",
      note: "masculine - review from food module",
    },
    {
      french: "un chat",
      english: "a cat",
      note: "masculine - review from basic nouns",
    },

    // Nature elements
    {
      french: "un arbre",
      english: "a tree",
      note: "masculine - review from colors module",
    },
    {
      french: "les arbres",
      english: "trees",
      note: "plural",
    },
    {
      french: "une plante",
      english: "a plant",
      note: "feminine - living vegetation",
    },
    {
      french: "les plantes",
      english: "plants",
      note: "plural",
    },
    {
      french: "une fleur",
      english: "a flower",
      note: "feminine - review from colors module",
    },
    {
      french: "le vent",
      english: "the wind",
      note: "masculine - for 'souffler' (to blow)",
    },
    {
      french: "la pluie",
      english: "the rain",
      note: "feminine - for 'pleuvoir' (to rain)",
    },
    {
      french: "la nature",
      english: "nature",
      note: "feminine - abstract concept",
    },

    // Useful descriptors
    {
      french: "lent / lente",
      english: "slow",
      note: "la tortue est lente (the turtle is slow)",
    },
    {
      french: "rapide",
      english: "fast",
      note: "l'écureuil est rapide (the squirrel is fast)",
    },
    {
      french: "petit / petite",
      english: "small",
      note: "review - une abeille est petite",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Article agreement
      {
        instruction: "Say 'a bird'",
        prompt: "a bird",
        hint: "masculine article + oiseau",
        expectedAnswer: "un oiseau",
        acceptableAnswers: ["un oiseau"],
        wrongAnswers: [
          {
            answer: "une oiseau",
            feedback:
              "Oiseau is masculine. Use 'un oiseau' (the 's' is silent!)",
          },
          {
            answer: "un oisau",
            feedback: "Careful with spelling: oiseau (the 's' is silent)",
          },
        ],
      },
      {
        instruction: "Say 'a turtle'",
        prompt: "a turtle",
        hint: "feminine article + tortue",
        expectedAnswer: "une tortue",
        acceptableAnswers: ["une tortue"],
        wrongAnswers: [
          {
            answer: "un tortue",
            feedback: "Tortue is feminine. Use 'une tortue'",
          },
        ],
      },
      {
        instruction: "Say 'a squirrel'",
        prompt: "a squirrel",
        hint: "masculine article + écureuil",
        expectedAnswer: "un écureuil",
        acceptableAnswers: ["un écureuil", "un ecureuil"],
        wrongAnswers: [
          {
            answer: "une écureuil",
            feedback: "Écureuil is masculine. Use 'un écureuil'",
          },
        ],
      },
      {
        instruction: "Say 'a rabbit'",
        prompt: "a rabbit",
        hint: "masculine article + lapin",
        expectedAnswer: "un lapin",
        acceptableAnswers: ["un lapin"],
      },
      {
        instruction: "Say 'a butterfly'",
        prompt: "a butterfly",
        hint: "masculine article + papillon",
        expectedAnswer: "un papillon",
        acceptableAnswers: ["un papillon"],
      },
      {
        instruction: "Say 'a bee'",
        prompt: "a bee",
        hint: "feminine article + abeille",
        expectedAnswer: "une abeille",
        acceptableAnswers: ["une abeille"],
      },

      // Nature elements
      {
        instruction: "Say 'a plant'",
        prompt: "a plant",
        hint: "feminine article + plante",
        expectedAnswer: "une plante",
        acceptableAnswers: ["une plante"],
      },
      {
        instruction: "Say 'the wind'",
        prompt: "the wind",
        hint: "masculine article + vent",
        expectedAnswer: "le vent",
        acceptableAnswers: ["le vent"],
      },
      {
        instruction: "Say 'the rain'",
        prompt: "the rain",
        hint: "feminine article + pluie",
        expectedAnswer: "la pluie",
        acceptableAnswers: ["la pluie"],
      },

      // Simple statements with être
      {
        instruction: "Say 'The turtle is slow'",
        prompt: "The turtle is slow",
        hint: "la tortue + est + lente (feminine)",
        expectedAnswer: "la tortue est lente",
        acceptableAnswers: ["la tortue est lente"],
        wrongAnswers: [
          {
            answer: "la tortue est lent",
            feedback:
              "Lente must agree with feminine 'tortue'. Use 'lente' with 'e'",
          },
        ],
      },
      {
        instruction: "Say 'The squirrel is fast'",
        prompt: "The squirrel is fast",
        hint: "l'écureuil + est + rapide",
        expectedAnswer: "l'écureuil est rapide",
        acceptableAnswers: ["l'écureuil est rapide", "l'ecureuil est rapide"],
      },
      {
        instruction: "Say 'The bee is small'",
        prompt: "The bee is small",
        hint: "l'abeille + est + petite (feminine)",
        expectedAnswer: "l'abeille est petite",
        acceptableAnswers: ["l'abeille est petite"],
      },

      // Colors + animals (composition!)
      {
        instruction: "Say 'a blue bird'",
        prompt: "a blue bird",
        hint: "un oiseau + bleu",
        expectedAnswer: "un oiseau bleu",
        acceptableAnswers: ["un oiseau bleu"],
        explanation:
          "In French, color comes AFTER the noun: un oiseau bleu (a bird blue)",
      },
      {
        instruction: "Say 'a yellow butterfly'",
        prompt: "a yellow butterfly",
        hint: "un papillon + jaune",
        expectedAnswer: "un papillon jaune",
        acceptableAnswers: ["un papillon jaune"],
      },

      // I see... statements (setting up for questions later)
      {
        instruction: "Say 'I see a bird'",
        prompt: "I see a bird",
        hint: "je vois + un oiseau",
        expectedAnswer: "je vois un oiseau",
        acceptableAnswers: ["je vois un oiseau"],
      },
    ],
  },

  skipStudyMode: false,
};
