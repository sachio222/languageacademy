/**
 * Reading Comprehension 2 - Normandy Adventure
 * Engaging story set in Norman towns using ONLY vocabulary from Units 1-2
 * Includes: demonstratives, questions, vouloir/pouvoir/voir, prepositions, adjectives from Units 1-2
 */

export const reading2 = {
  moduleKey: "2024-01-22-reading2", // Permanent identifier - never changes
  // id and module number are set dynamically
  title: "Reading Comprehension 2 - Rendez-vous en Normandie",
  description:
    "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2.",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [
    {
      term: "Adventure Reading Milestone",
      definition:
        "You can now read engaging stories that combine Unit 1 foundations with Unit 2 composition skills",
      example:
        "Normandy adventure story featuring demonstratives (ça, ce, cette), questions (comment, où, qu'est-ce que), motion verbs (venir, aller, partir), and descriptive language",
    },
    {
      term: "Conversational French",
      definition:
        "Experience natural French dialogue patterns and conversational flow",
      example:
        "Marie and Sophie discussing their Normandy trip, asking questions, describing places, and expressing preferences",
    },
    {
      term: "Cultural Context",
      definition:
        "Learn French through cultural content - famous places, travel, and real-world scenarios",
      example:
        "Mont-Saint-Michel, Normandy, French geography, travel vocabulary, and cultural references",
    },
  ],

  readingPassage: {
    title: "Rendez-vous en Normandie (The Normandy Meetup)",
    text: `**Marie:** Salut Sophie ! Comment ça va ?

**Sophie:** Ça va bien ! Je suis à Caen avec un ami Thomas. Et toi, où es-tu ?

![img/reading2-sophiethomas.jpg|maxWidth:65%]

**Marie:** Je suis à Honfleur ! J'ai une nouvelle voiture et je veux voir Bayeux aussi.

**Sophie:** Qu'est-ce que c'est, ça ? Cette chose dans la voiture ?

**Marie:** Ça ? C'est un livre sur la Normandie. Il y a Mont-Saint-Michel, Rouen... Ces choses sont très belles !

**Thomas:** Je veux voir Mont-Saint-Michel !

**Marie:** Moi aussi. Il est très grand. Nous pouvons voir de vieilles et belles choses aussi !

**Sophie:** Et Bayeux ? Qu'est-ce que c'est à Bayeux ?

**Marie:** La ville a de vieilles et belles maisons. Est-ce que tu veux voir ces maisons ?

![img/reading2-les-maisons-dans-rouen.jpg|maxWidth:65%]

**Thomas:** Oui, et j'ai un ami Pierre à Rouen.

**Sophie:** Pierre ? Il a une maison à Rouen ?

**Thomas:** Oui ! Il a une petite mais très belle maison. Elle est à Rouen.

**Marie:** Une maison à Rouen ? C'est bon ça! J'ai le chien dans la voiture. Il peut voir Rouen aussi ?

**Sophie:** Oui ! Les chiens peuvent être avec nous ! Et le chat est dans la voiture aussi.

**Marie:** Tu as un chat ? Je veux voir ce chat! Nous pouvons voir ces choses en un jour ?

**Thomas:** Non, mais nous avons deux jours. Un jour pour Mont-Saint-Michel et Bayeux, un autre jour pour Rouen et Honfleur.

**Sophie:** Très bien ! Voilà ! Nous pouvons voir ces belles choses ! Salut !

![img/reading2-mont-saint-michele.jpg|maxWidth:65%]`,
    translation: `**Marie:** Hi Sophie! How's it going?

**Sophie:** It's going well! I am in Caen with a friend Thomas. And you, where are you?



**Marie:** I am in Honfleur! I have a new car and I want to see Bayeux too.

**Sophie:** What is that? That thing in the car?

**Marie:** That? It's a book about Normandy. There's Mont-Saint-Michel, Rouen... These things are very beautiful!

**Thomas:** I want to see Mont-Saint-Michel!

**Marie:** Me too. It is very big. We can see old and beautiful things too!

**Sophie:** And Bayeux? What is there in Bayeux?

**Marie:** The town has old and beautiful houses. Do you want to see these houses?



**Thomas:** Yes, and I have a friend Pierre in Rouen.

**Sophie:** Pierre? Does he have a house in Rouen?

**Thomas:** Yes! He has a small but very beautiful house. It is in Rouen.

**Marie:** A house in Rouen? That's good! I have the dog in the car. Can he see Rouen too?

**Sophie:** Yes! Dogs can be with us! And the cat is in the car too.

**Marie:** You have a cat? I want to see this cat! Can we see these things in one day?

**Thomas:** No, but we have two days. One day for Mont-Saint-Michel and Bayeux, another day for Rouen and Honfleur.

**Sophie:** Very good! There! We can see these beautiful things! Bye!`,
  },

  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "Where is Sophie in the story?",
        prompt: "Sophie is in ___",
        hint: "Look for the Norman city where Sophie is located",
        expectedAnswer: "Caen",
        acceptableAnswers: [
          "à Caen",
          "Sophie est à Caen",
          "Elle est à Caen",
          "à Caen avec un ami Thomas",
        ],
        wrongAnswers: [
          {
            answer: "Honfleur",
            feedback: "That's where Marie is, Sophie is in Caen",
          },
          {
            answer: "Rouen",
            feedback: "That's where Pierre is, Sophie is in Caen",
          },
        ],
      },
      {
        instruction: "Who is with Sophie?",
        prompt: "Sophie is with her friend ___",
        hint: "Look for 'un ami ___'",
        expectedAnswer: "Thomas",
        wrongAnswers: [
          {
            answer: "Pierre",
            feedback: "Pierre is in Rouen, Thomas is with Sophie",
          },
          {
            answer: "Marie",
            feedback: "Marie is talking to them, Thomas is with Sophie",
          },
        ],
      },
      {
        instruction: "What does Marie have in her car?",
        prompt: "Marie has a ___ in her car",
        hint: "It's about Normandy - something you can read",
        expectedAnswer: "un livre",
        acceptableAnswers: [
          "livre",
          "un livre sur la Normandie",
          "livre sur la Normandie",
          "le livre",
          "c'est un livre",
          "elle a un livre",
        ],
        wrongAnswers: [
          {
            answer: "chien",
            feedback: "The dog is mentioned later, the book is in the car",
          },
          {
            answer: "chat",
            feedback: "The cat is Sophie's, Marie has a book",
          },
        ],
      },
      {
        instruction: "How does Marie describe her car?",
        prompt: "J'ai une ___ voiture",
        hint: "Adjective meaning 'new'",
        expectedAnswer: "nouvelle",
        acceptableAnswers: [
          "une nouvelle voiture",
          "nouvelle voiture",
          "j'ai une nouvelle voiture",
          "ma nouvelle voiture",
        ],
        wrongAnswers: [
          {
            answer: "vieille",
            feedback: "She says it's new (nouvelle), not old (vieille)",
          },
          {
            answer: "grande",
            feedback: "She describes it as new (nouvelle), not big (grande)",
          },
        ],
      },
      {
        instruction: "How do they describe Mont-Saint-Michel?",
        prompt: "C'est une chose ___ et ___",
        hint: "Two adjectives Marie uses to describe it",
        expectedAnswer: "vieille et belle",
        acceptableAnswers: [
          "cette vieille et belle chose",
          "vieille et belle chose",
          "très grande",
          "grande",
          "belle",
          "vieille",
          "c'est vieille et belle",
          "elle est très grande",
          "très grande aussi",
        ],
        wrongAnswers: [
          {
            answer: "nouvelle et belle",
            feedback: "They say it's old (vieille), not new (nouvelle)",
          },
          {
            answer: "petite et belle",
            feedback: "They say it's big (grande), not small (petite)",
          },
        ],
      },
      {
        instruction: "What does Thomas want to do with Mont-Saint-Michel?",
        prompt: "Complete: Je ___ voir Mont-Saint-Michel",
        hint: "Verb meaning 'to want'",
        expectedAnswer: "veux",
        acceptableAnswers: [
          "voir Mont-Saint-Michel",
          "je veux voir",
          "il veut voir",
          "voir",
          "veux voir",
          "veut voir Mont-Saint-Michel",
          "je veux voir Mont-Saint-Michel",
        ],
        wrongAnswers: [
          {
            answer: "peux",
            feedback: "He wants (veux) to see it, not can (peux)",
          },
          {
            answer: "suis",
            feedback: "He wants (veux) to see it, not is (suis)",
          },
        ],
      },
      {
        instruction: "Where is Pierre's house?",
        prompt: "Complete: Elle est ___ Rouen",
        hint: "Preposition used with cities",
        expectedAnswer: "à",
        acceptableAnswers: [
          "à Rouen",
          "Rouen",
          "elle est à Rouen",
          "il a une maison à Rouen",
          "une maison à Rouen",
          "à",
          "Pierre est à Rouen",
        ],
        wrongAnswers: [
          {
            answer: "dans",
            feedback: "Use 'à' with cities, not 'dans'",
          },
          {
            answer: "sur",
            feedback: "The house is in (à) Rouen, not on (sur) Rouen",
          },
          {
            answer: "avec",
            feedback: "The house is in (à) Rouen, not with (avec) Rouen",
          },
        ],
      },
      {
        instruction: "Where does Marie say she is?",
        prompt: "Complete: Je suis à ___",
        hint: "Look for the Norman town where Marie is located",
        expectedAnswer: "Honfleur",
        acceptableAnswers: [
          "à Honfleur",
          "Honfleur",
          "je suis à Honfleur",
          "elle est à Honfleur",
          "Marie est à Honfleur",
        ],
        wrongAnswers: [
          {
            answer: "Caen",
            feedback: "That's where Sophie is, Marie is in Honfleur",
          },
          {
            answer: "Rouen",
            feedback: "That's where Pierre is, Marie is in Honfleur",
          },
        ],
      },
      {
        instruction: "Where is Marie's dog?",
        prompt: "J'ai mon chien ___ ma voiture",
        hint: "Preposition meaning 'in'",
        expectedAnswer: "dans sa voiture",
        acceptableAnswers: [
          "dans ma voiture",
          "dans",
          "dans la voiture",
          "voiture",
          "la voiture",
        ],
        wrongAnswers: [],
      },
      {
        instruction: "What does Sophie say they can see in Normandy?",
        prompt: "Nous pouvons aller à ___ belles choses!",
        hint: "Demonstrative for 'these' with plural noun",
        expectedAnswer: "ces belles choses",
        acceptableAnswers: [
          "belles choses",
          "ces belles choses",
          "ces belles choses en Normandie",
          "nous pouvons voir ces belles choses",
        ],
        wrongAnswers: [],
      },
      {
        instruction: "What preposition shows where Thomas's friend's house is?",
        prompt: "Elle est ___ Rouen",
        hint: "Preposition used with cities",
        expectedAnswer: "à",
        acceptableAnswers: ["à Rouen", "à"],
        wrongAnswers: [
          {
            answer: "dans",
            feedback: "Use 'à' with cities, not 'dans'",
          },
        ],
      },
      {
        instruction: "Can the dogs come with them on the trip?",
        prompt: "Les chiens peuvent ___ avec nous!",
        hint: "Verb meaning 'to go'",
        expectedAnswer: "oui",
        acceptableAnswers: [
          "les chiens peuvent être avec nous",
          "ils peuvent être avec nous",
          "être avec nous",
        ],
        wrongAnswers: [],
      },
    ],
  },
};
