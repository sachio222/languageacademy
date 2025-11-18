/**
 * Module: donner (to give)
 * Unit 6 - Essential action verb, regular conjugation
 * High frequency verb for giving, offering, and providing
 * Complements prendre (to take) - natural pairing
 */

export const donnerModule = {
  moduleKey: "2024-10-22-donner", // Permanent identifier - never changes
  title: "donner - To Give",
  description:
    "Express giving and offering: je donne (I give), tu donnes (you give), il donne (he gives) - essential for daily interactions",

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express giving and offering (I give, you give, they give)",
      "Talk about providing information and help",
      "Use donner with object pronouns (I give it to him)"
    ],
    realWorldUse: "express giving and offering",
    nextModuleTeaser: "Add mettre to talk about putting and placing"
  },

  concepts: [
    {
      term: "donner = to give",
      definition:
        "Very common verb for giving things, offering help, providing information",
      example:
        "je donne le livre (I give the book), tu donnes ton nom (you give your name)",
    },
    {
      term: "Regular -er conjugation",
      definition:
        "Present tense: je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent",
      example:
        "Regular pattern: donn- + endings (-e, -es, -e, -ons, -ez, -ent)",
    },
    {
      term: "Common uses of donner",
      definition:
        "Giving objects (donner un cadeau), giving information (donner l'adresse), giving help (donner de l'aide)",
      example:
        "je donne mon numéro (I give my number), ça donne faim (it makes you hungry)",
    },
    {
      term: "Donner vs Prendre",
      definition: "Perfect opposites - donner (to give) and prendre (to take)",
      example:
        "je donne le livre à Marie, elle prend le livre (I give the book to Marie, she takes the book)",
    },
    {
      term: "With prepositions",
      definition: "Often used with 'à' (to) - donner quelque chose à quelqu'un",
      example: "je donne le livre à mon ami (I give the book to my friend)",
    },
  ],

  vocabularyReference: [
    {
      french: "donner",
      english: "to give",
      note: "regular -er verb - very common",
    },
    {
      french: "je donne",
      english: "I give",
      note: "present tense",
    },
    {
      french: "tu donnes",
      english: "you give (informal)",
      note: "add -s for tu",
    },
    {
      french: "il/elle donne",
      english: "he/she gives",
      note: "same as je form",
    },
    {
      french: "nous donnons",
      english: "we give",
      note: "add -ons for nous",
    },
    {
      french: "vous donnez",
      english: "you give (formal/plural)",
      note: "add -ez for vous",
    },
    {
      french: "ils/elles donnent",
      english: "they give",
      note: "add -ent for ils/elles",
    },
    {
      french: "donner le livre",
      english: "to give the book",
      note: "common phrase",
    },
    {
      french: "donner l'adresse",
      english: "to give the address",
      note: "giving information",
    },
    {
      french: "donner à",
      english: "to give to",
      note: "donner + à + person",
    },
    {
      french: "donne-moi",
      english: "give me",
      note: "imperative + object pronoun",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Say 'I give'",
        prompt: "I give",
        hint: "donner for je",
        expectedAnswer: "je donne",
        wrongAnswers: [
          {
            answer: "je prends",
            feedback: "That means 'I take' - use 'je donne' for giving",
          },
        ],
      },
      {
        instruction: "Say 'you give' (informal)",
        prompt: "you give",
        hint: "donner for tu",
        expectedAnswer: "tu donnes",
        wrongAnswers: [
          {
            answer: "tu donne",
            feedback: "Add -s for tu: tu donnes",
          },
        ],
      },
      {
        instruction: "Say 'he gives'",
        prompt: "he gives",
        hint: "donner for il",
        expectedAnswer: "il donne",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'she gives'",
        prompt: "she gives",
        hint: "donner for elle",
        expectedAnswer: "elle donne",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we give'",
        prompt: "we give",
        hint: "donner for nous",
        expectedAnswer: "nous donnons",
        wrongAnswers: [
          {
            answer: "nous donnez",
            feedback: "Use -ons for nous: nous donnons",
          },
        ],
      },
      {
        instruction: "Say 'you give' (formal/plural)",
        prompt: "you give (formal)",
        hint: "donner for vous",
        expectedAnswer: "vous donnez",
        wrongAnswers: [
          {
            answer: "vous donnons",
            feedback: "Use -ez for vous: vous donnez",
          },
        ],
      },
      {
        instruction: "Say 'they give'",
        prompt: "they give",
        hint: "donner for ils/elles",
        expectedAnswer: "ils donnent",
        acceptableAnswers: ["elles donnent"],
        wrongAnswers: [
          {
            answer: "ils donnez",
            feedback: "Use -ent for ils/elles: ils donnent",
          },
        ],
      },
      {
        instruction: "Say 'I give the book'",
        prompt: "I give the book",
        hint: "je donne + le livre",
        expectedAnswer: "je donne le livre",
        wrongAnswers: [
          {
            answer: "je prends le livre",
            feedback: "That means 'I take the book' - use 'donne' for giving",
          },
        ],
      },
      {
        instruction: "Say 'you give the cat' (informal)",
        prompt: "you give the cat",
        hint: "tu donnes + le chat",
        expectedAnswer: "tu donnes le chat",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we give the house'",
        prompt: "we give the house",
        hint: "nous donnons + la maison",
        expectedAnswer: "nous donnons la maison",
        wrongAnswers: [],
      },
      {
        instruction: "Say 'I give the car to you' (informal)",
        prompt: "I give the car to you",
        hint: "je donne + la voiture + à + toi",
        expectedAnswer: "je donne la voiture à toi",
        acceptableAnswers: ["je te donne la voiture"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'what do you give?' (informal)",
        prompt: "what do you give?",
        hint: "qu'est-ce que + tu donnes",
        expectedAnswer: "qu'est-ce que tu donnes",
        acceptableAnswers: ["que donnes-tu", "tu donnes quoi"],
        wrongAnswers: [
          {
            answer: "qu'est-ce que tu prends",
            feedback: "That asks 'what do you take' - use 'donnes' for giving",
          },
        ],
      },
      {
        instruction: "Say 'he doesn't give anything'",
        prompt: "he doesn't give anything",
        hint: "il + ne + donne + pas + anything",
        expectedAnswer: "il ne donne rien",
        acceptableAnswers: ["il ne donne pas"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'we always give'",
        prompt: "we always give",
        hint: "nous donnons + toujours",
        expectedAnswer: "nous donnons toujours",
        acceptableAnswers: ["nous donnons toujours quelque chose"],
        wrongAnswers: [],
      },
      {
        instruction: "Say 'give me' (command form)",
        prompt: "give me",
        hint: "Imperative form + object pronoun",
        expectedAnswer: "donne-moi",
        wrongAnswers: [
          {
            answer: "je donne",
            feedback:
              "That's 'I give' - use imperative 'donne-moi' for 'give me'",
          },
          {
            answer: "tu donnes",
            feedback:
              "That's 'you give' - use imperative 'donne-moi' for 'give me'",
          },
        ],
      },
      {
        instruction: "Say 'give me your hand' (informal)",
        prompt: "give me your hand",
        hint: "donne-moi + ta main",
        expectedAnswer: "donne-moi ta main",
        wrongAnswers: [],
      },
    ],
  },
};
