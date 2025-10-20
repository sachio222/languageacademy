/**
 * Module: s'appeler (to be called)
 * Unit 8 - Daily Life & Actions
 * FINALLY! Students learn how to properly introduce themselves!
 * Most practical reflexive verb
 */

export const sAppelerModule = {
  moduleKey: "2024-05-22-s-appeler", // Permanent identifier - never changes
  title: "s'appeler - To Be Called (Your Name!)",
  description:
    "Finally learn how to say your name properly! Je m'appelle Marie (My name is Marie), Comment tu t'appelles? (What's your name?)",

  concepts: [
    {
      term: "s'appeler = to be called / to call oneself",
      definition:
        "THE way to say your name in French! Literally 'to call oneself'",
      example:
        "Je m'appelle Marie (I call myself Marie = My name is Marie), Comment tu t'appelles? (What do you call yourself? = What's your name?)",
    },
    {
      term: "This should've been in Unit 1!",
      definition:
        "You've been waiting to learn this - the most basic introduction!",
      example: "Now you can finally properly introduce yourself in French!",
    },
    {
      term: "Reflexive Pattern",
      definition:
        "Uses reflexive pronouns: je m'appelle, tu t'appelles, il s'appelle",
      example:
        "Notice the elision: je m'appelle (not je me appelle), tu t'appelles (not tu te appelles)",
    },
    {
      term: "Regular -ER verb conjugation",
      definition:
        "Once you know the reflexive pronouns, the verb part is easy - regular -ER pattern!",
      example: "appelle, appelles, appelle, appelons, appelez, appellent",
    },
  ],

  vocabularyReference: [
    {
      french: "s'appeler",
      english: "to be called / to call oneself",
      note: "⭐⭐⭐ essential for introductions!",
    },
    {
      french: "je m'appelle",
      english: "my name is / I'm called",
      note: "⭐ elision: m' not me",
    },
    {
      french: "tu t'appelles",
      english: "your name is (informal)",
      note: "elision: t' not te",
    },
    {
      french: "il s'appelle",
      english: "his name is / he's called",
      note: "common form",
    },
    {
      french: "elle s'appelle",
      english: "her name is / she's called",
      note: "feminine form",
    },
    {
      french: "nous nous appelons",
      english: "our names are / we're called",
      note: "nous nous pattern",
    },
    {
      french: "vous vous appelez",
      english: "your name is (formal)",
      note: "vous vous pattern",
    },
    {
      french: "ils s'appellent",
      english: "their names are (masc)",
      note: "plural form",
    },
    {
      french: "elles s'appellent",
      english: "their names are (fem)",
      note: "feminine plural",
    },
    {
      french: "Comment tu t'appelles?",
      english: "What's your name? (informal)",
      note: "⭐⭐⭐ most common question!",
    },
    {
      french: "Comment vous vous appelez?",
      english: "What's your name? (formal)",
      note: "polite form",
    },
  ],

  exercises: [
    {
      id: "s-appeler.1",
      instruction: "Say 'My name is Marie'",
      prompt: "My name is Marie",
      hint: "je m'appelle + name",
      expectedAnswer: "je m'appelle Marie",
      wrongAnswers: [
        {
          answer: "je suis Marie",
          feedback:
            "That means 'I am Marie' - use 'je m'appelle Marie' for 'my name is'",
        },
        {
          answer: "mon nom est Marie",
          feedback: "French uses 'je m'appelle' not 'mon nom est'",
        },
      ],
    },
    {
      id: "s-appeler.2",
      instruction: "Ask 'What's your name?' (informal)",
      prompt: "What's your name? (informal)",
      hint: "Comment + tu t'appelles?",
      expectedAnswer: "comment tu t'appelles",
      wrongAnswers: [],
    },
    {
      id: "s-appeler.3",
      instruction: "Say 'His name is Pierre'",
      prompt: "His name is Pierre",
      hint: "il s'appelle + name",
      expectedAnswer: "il s'appelle Pierre",
      wrongAnswers: [],
    },
    {
      id: "s-appeler.4",
      instruction: "Say 'Her name is Sophie'",
      prompt: "Her name is Sophie",
      hint: "elle s'appelle + name",
      expectedAnswer: "elle s'appelle Sophie",
      wrongAnswers: [],
    },
    {
      id: "s-appeler.5",
      instruction: "Ask 'What's your name?' (formal)",
      prompt: "What's your name? (formal)",
      hint: "Comment + vous vous appelez?",
      expectedAnswer: "comment vous vous appelez",
      wrongAnswers: [],
    },
    {
      id: "s-appeler.6",
      instruction: "Say 'They're called...' (masculine)",
      prompt: "They're called the students",
      hint: "ils s'appellent + les étudiants",
      expectedAnswer: "ils s'appellent les étudiants",
      wrongAnswers: [],
    },
  ],
};
