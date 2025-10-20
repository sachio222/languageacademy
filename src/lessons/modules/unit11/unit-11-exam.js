/**
 * Unit 11 Exam - Comprehensive test for Daily Essentials unit
 * Tests: age expressions, top 100 completion verbs, directions, practical communication
 * Achievement: 100% top 100 French word coverage + essential life skills
 */

export const unit11Exam = {
  moduleKey: "2024-02-15-unit-11-exam", // Permanent identifier - never changes
  title: "Unit 11 Final Exam - Daily Essentials & Practical Communication",
  description:
    "Final test for Unit 11! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!",

  // Special flags
  isUnitExam: true,
  unitNumber: 11,
  skipStudyMode: true,

  concepts: [
    {
      term: "Advanced Structures Mastery",
      definition:
        "You've mastered the most advanced French structures for expressing future, hypothetical, and complex relationships",
      example:
        "je viendrai, tu seras, il aura fait, je viendrais, tu serais, il aurait fait, je suis aimé, il fait construire, en parlant, d'abord, ensuite, puis, enfin",
    },
    {
      term: "Future Tense Mastery",
      definition:
        "Learn the future simple and future anterior for expressing future actions and completed future actions",
      example:
        "je viendrai (I will come), tu seras (you will be), il aura fait (he will have done), nous aurons parlé (we will have spoken)",
    },
    {
      term: "Conditional Mood",
      definition:
        "Master the conditional mood for expressing hypothetical situations and polite requests",
      example:
        "je viendrais (I would come), tu serais (you would be), il aurait fait (he would have done), nous aurions parlé (we would have spoken)",
    },
    {
      term: "Passive Voice",
      definition:
        "Learn to express passive actions and relationships using être + past participle",
      example:
        "je suis aimé (I am loved), tu es respecté (you are respected), il est compris (he is understood), nous sommes aidés (we are helped)",
    },
    {
      term: "Causative Faire",
      definition:
        "Master the causative faire structure for expressing actions done by others",
      example:
        "je fais construire (I have built), tu fais réparer (you have repaired), il fait nettoyer (he has cleaned), nous faisons préparer (we have prepared)",
    },
    {
      term: "Gerunds and Transitions",
      definition:
        "Learn to use gerunds and sequence transitions for sophisticated French expression",
      example:
        "en parlant (while speaking), en travaillant (while working), d'abord (first), ensuite (then), puis (then), enfin (finally)",
    },
  ],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Age & Personal Information (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I am 22 years old",
        hint: "French uses avoir for age",
        expectedAnswer: "j'ai vingt-deux ans",
        acceptableAnswers: ["j'ai 22 ans"],
      },
      {
        instruction: "Ask someone's age politely",
        prompt: "How old are you? (formal)",
        hint: "quel âge + vous + avoir",
        expectedAnswer: "quel âge avez-vous?",
      },
      {
        instruction: "Ask someone's age casually",
        prompt: "How old are you? (informal)",
        hint: "quel âge + tu + avoir",
        expectedAnswer: "quel âge as-tu?",
        acceptableAnswers: ["tu as quel âge?"],
      },
      {
        instruction: "Say you were born in a year (male)",
        prompt: "I was born in 1995",
        hint: "je suis né + en + year",
        expectedAnswer: "je suis né en mille neuf cent quatre-vingt-quinze",
        acceptableAnswers: ["je suis né en 1995"],
      },
      {
        instruction: "Say you were born in a place (female)",
        prompt: "I was born in Nice (female)",
        hint: "je suis née + à + city",
        expectedAnswer: "je suis née à Nice",
      },
      {
        instruction: "Complete introduction",
        prompt: "My name is Sophie, I'm 28, I was born in Paris",
        hint: "je m'appelle + name + j'ai + age + je suis née + à + city",
        expectedAnswer:
          "je m'appelle Sophie, j'ai vingt-huit ans, je suis née à Paris",
        acceptableAnswers: [
          "je m'appelle Sophie, j'ai 28 ans, je suis née à Paris",
        ],
      },

      // SECTION 2: donner - Rank 24 Critical (5 questions)
      {
        instruction: "Conjugate donner",
        prompt: "I give",
        hint: "donner for je",
        expectedAnswer: "je donne",
      },
      {
        instruction: "Conjugate donner",
        prompt: "they give",
        hint: "donner for ils",
        expectedAnswer: "ils donnent",
      },
      {
        instruction: "Practical usage",
        prompt: "I give you the book",
        hint: "je + te + donne + object",
        expectedAnswer: "je te donne le livre",
      },
      {
        instruction: "Practical usage",
        prompt: "Can you give me your address?",
        hint: "tu peux + me donner + ton adresse",
        expectedAnswer: "tu peux me donner ton adresse?",
        acceptableAnswers: ["vous pouvez me donner votre adresse?"],
      },
      {
        instruction: "Fixed expression",
        prompt: "to make an appointment",
        hint: "fixed phrase with donner",
        expectedAnswer: "donner rendez-vous",
      },

      // SECTION 3: Daily Life Verbs (9 questions)

      // dormir (rank 54)
      {
        instruction: "Translate to French",
        prompt: "I sleep",
        hint: "dormir for je",
        expectedAnswer: "je dors",
      },
      {
        instruction: "Ask about sleep quality",
        prompt: "Do you sleep well?",
        hint: "tu + dors + bien + question",
        expectedAnswer: "tu dors bien?",
      },
      {
        instruction: "Say duration",
        prompt: "I sleep 8 hours",
        hint: "je dors + huit heures",
        expectedAnswer: "je dors huit heures",
      },

      // travailler (rank 55)
      {
        instruction: "Translate to French",
        prompt: "I work",
        hint: "travailler for je",
        expectedAnswer: "je travaille",
      },
      {
        instruction: "Ask about work location",
        prompt: "Where do you work? (formal)",
        hint: "où + vous + travaillez",
        expectedAnswer: "où travaillez-vous?",
      },
      {
        instruction: "Say work intensity",
        prompt: "I work hard",
        hint: "je travaille + dur",
        expectedAnswer: "je travaille dur",
      },

      // vivre (rank 56)
      {
        instruction: "Translate to French",
        prompt: "I live",
        hint: "vivre for je - irregular",
        expectedAnswer: "je vis",
      },
      {
        instruction: "Say residence location",
        prompt: "I live in Bordeaux",
        hint: "je vis + à + city",
        expectedAnswer: "je vis à Bordeaux",
      },
      {
        instruction: "Philosophical expression",
        prompt: "to live one's life",
        hint: "fixed expression with vivre",
        expectedAnswer: "vivre sa vie",
      },

      // SECTION 4: Search & Find (4 questions)
      {
        instruction: "Say: I'm looking for my car",
        prompt: "I'm looking for my car",
        hint: "je cherche + ma voiture",
        expectedAnswer: "je cherche ma voiture",
      },
      {
        instruction: "Express success",
        prompt: "I found it!",
        hint: "exclamation with past tense",
        expectedAnswer: "j'ai trouvé!",
      },
      {
        instruction: "Ask for opinion using trouver",
        prompt: "What do you think of this?",
        hint: "comment + tu trouves + ça",
        expectedAnswer: "comment tu trouves ça?",
        acceptableAnswers: ["tu trouves ça comment?"],
      },
      {
        instruction: "Express opinion",
        prompt: "I think that's good",
        hint: "je trouve que + c'est bon",
        expectedAnswer: "je trouve que c'est bon",
      },

      // SECTION 5: Perception Verbs (4 questions)
      {
        instruction: "Say activity",
        prompt: "I listen to French music",
        hint: "j'écoute + de la musique française",
        expectedAnswer: "j'écoute de la musique française",
      },
      {
        instruction: "Say activity",
        prompt: "We watch French movies",
        hint: "nous regardons + des films français",
        expectedAnswer: "nous regardons des films français",
      },
      {
        instruction: "Ask about entertainment",
        prompt: "What are you watching?",
        hint: "qu'est-ce que + tu regardes",
        expectedAnswer: "qu'est-ce que tu regardes?",
      },
      {
        instruction: "Give advice using command",
        prompt: "Listen to the teacher!",
        hint: "écoute + le professeur",
        expectedAnswer: "écoute le professeur!",
        acceptableAnswers: ["écoutez le professeur!"],
      },

      // SECTION 6: Social Situations (6 questions)
      {
        instruction: "Describe waiting",
        prompt: "I'm waiting for my friend",
        hint: "j'attends + mon ami",
        expectedAnswer: "j'attends mon ami",
      },
      {
        instruction: "Ask about arrival time",
        prompt: "What time do you arrive?",
        hint: "à quelle heure + tu arrives",
        expectedAnswer: "à quelle heure tu arrives?",
        acceptableAnswers: ["quand tu arrives?"],
      },
      {
        instruction: "State arrival time",
        prompt: "The train arrives at 6pm",
        hint: "le train arrive + à + time",
        expectedAnswer: "le train arrive à dix-huit heures",
        acceptableAnswers: [
          "le train arrive à 18h",
          "le train arrive à six heures",
        ],
      },
      {
        instruction: "Express duration of stay",
        prompt: "I'm staying three days",
        hint: "je reste + trois jours",
        expectedAnswer: "je reste trois jours",
      },
      {
        instruction: "Ask about stay duration",
        prompt: "How long are you staying?",
        hint: "combien de temps + tu restes",
        expectedAnswer: "combien de temps tu restes?",
      },
      {
        instruction: "Plan coordination",
        prompt: "I wait, you arrive, we stay together",
        hint: "j'attends + tu arrives + on reste ensemble",
        expectedAnswer: "j'attends, tu arrives, on reste ensemble",
      },

      // SECTION 7: Directions & Navigation (8 questions)
      {
        instruction: "Give direction",
        prompt: "Turn left",
        hint: "tournez + à gauche",
        expectedAnswer: "tournez à gauche",
        acceptableAnswers: ["tourne à gauche"],
      },
      {
        instruction: "Give direction",
        prompt: "Turn right",
        hint: "tournez + à droite",
        expectedAnswer: "tournez à droite",
        acceptableAnswers: ["tourne à droite"],
      },
      {
        instruction: "Give direction",
        prompt: "Go straight",
        hint: "allez + tout droit",
        expectedAnswer: "allez tout droit",
        acceptableAnswers: ["va tout droit"],
      },
      {
        instruction: "Ask for location",
        prompt: "Where is the museum?",
        hint: "où est + le musée",
        expectedAnswer: "où est le musée?",
      },
      {
        instruction: "Ask about distance",
        prompt: "Is it far?",
        hint: "c'est + loin + question",
        expectedAnswer: "c'est loin?",
      },
      {
        instruction: "Ask for help politely",
        prompt: "Excuse me, where is the train station?",
        hint: "excusez-moi + où est + la gare",
        expectedAnswer: "excusez-moi, où est la gare?",
      },
      {
        instruction: "Give distance information",
        prompt: "It's five minutes on foot",
        hint: "c'est + à cinq minutes + à pied",
        expectedAnswer: "c'est à cinq minutes à pied",
      },
      {
        instruction: "Complex directions",
        prompt: "Go straight, then turn left at the corner",
        hint: "allez tout droit + puis + tournez à gauche + au coin",
        expectedAnswer: "allez tout droit, puis tournez à gauche au coin",
        acceptableAnswers: ["va tout droit, puis tourne à gauche au coin"],
      },

      // SECTION 8: Reading 11 Integration (4 questions)
      {
        instruction: "From Reading 11: France's population",
        prompt: "France has 68 million inhabitants",
        hint: "la France + a + number + millions + habitants",
        expectedAnswer: "la France a soixante-huit millions d'habitants",
        acceptableAnswers: ["la France a 68 millions d'habitants"],
      },
      {
        instruction: "From Reading 11: What tourists look for",
        prompt: "Tourists look for directions to find monuments",
        hint: "les touristes + cherchent + directions + pour trouver + monuments",
        expectedAnswer:
          "les touristes cherchent des directions pour trouver les monuments",
      },
      {
        instruction: "From Reading 11: Where artists live",
        prompt: "French artists often live in neighborhoods like Montmartre",
        hint: "les artistes français + vivent + souvent + dans + quartiers + comme + Montmartre",
        expectedAnswer:
          "les artistes français vivent souvent dans des quartiers comme Montmartre",
      },
      {
        instruction: "From Reading 11: Modern France combines what?",
        prompt: "Modern France combines tradition and innovation",
        hint: "la France moderne + combine + tradition + et + innovation",
        expectedAnswer: "la France moderne combine tradition et innovation",
      },
    ],
  },
};
