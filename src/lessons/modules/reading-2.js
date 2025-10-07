/**
 * Reading Comprehension 2 - Normandy Adventure
 * Engaging story set in Norman towns using ONLY vocabulary from Units 1-2
 * Includes: demonstratives, questions, vouloir/pouvoir, prepositions, adjectives from Units 1-2
 */

export const reading2 = {
  // id and module number are set dynamically
  title: "Reading Comprehension 2 - Normandy Adventure!",
  description:
    "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2.",

  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [],

  readingPassage: {
    title: "Une Aventure en Normandie (An Adventure in Normandy)",
    text: `**Marie:** Bonjour Sophie! Comment ça va?

**Sophie:** Ça va bien! Je suis à Caen avec un ami Thomas. Et toi, où es-tu?

**Marie:** Je suis à Honfleur! J'ai une nouvelle voiture et je veux voir Bayeux aussi.

**Sophie:** Qu'est-ce que c'est, ça? Cette chose dans la voiture?

**Marie:** Ça? C'est un livre sur la Normandie! Il y a Mont-Saint-Michel, Rouen... Ces choses sont très belles!

**Thomas:** Je veux voir Mont-Saint-Michel! Où est-ce?

**Marie:** C'est ça! Tu peux voir cette vieille et belle chose. Elle est très grande aussi.

**Sophie:** Et Bayeux? Qu'est-ce qu'il y a à Bayeux?

**Marie:** Il y a une grande maison avec de belles choses vieilles! Nous pouvons voir cette maison.

**Thomas:** Oui! Et nous pouvons voir Rouen. Un ami Pierre est à Rouen.

**Sophie:** Pierre? Il a une maison à Rouen?

**Thomas:** Oui! Il a une petite mais très belle maison. Elle est dans Rouen.

**Marie:** Une maison à Rouen? C'est bon ça! J'ai le chien dans la voiture. Il peut voir Rouen aussi?

**Sophie:** Oui! Les chiens peuvent être avec nous! Et le chat est dans la voiture aussi.

**Marie:** Tu as un chat? Je veux voir ce chat! Nous pouvons voir ces choses en un jour?

**Thomas:** Non, c'est très bon! Mais nous avons deux jours. Un jour pour Mont-Saint-Michel et Bayeux, un autre jour pour Rouen et Honfleur.

**Sophie:** Très bien! Voilà! Nous pouvons voir ces belles choses! Au revoir!`,
    translation: `**Marie:** Hello Sophie! How's it going?

**Sophie:** It's going well! I am in Caen with a friend Thomas. And you, where are you?

**Marie:** I am in Honfleur! I have a new car and I want to see Bayeux too.

**Sophie:** What is that? That thing in the car?

**Marie:** That? It's a book about Normandy! There's Mont-Saint-Michel, Rouen... These things are very beautiful!

**Thomas:** I want to see Mont-Saint-Michel! Where is it?

**Marie:** It's that! You can see this old and beautiful thing. It is very big too.

**Sophie:** And Bayeux? What is there in Bayeux?

**Marie:** There is a big house with beautiful old things! We can see this house.

**Thomas:** Yes! And we can see Rouen. A friend Pierre is in Rouen.

**Sophie:** Pierre? Does he have a house in Rouen?

**Thomas:** Yes! He has a small but very beautiful house. It is in Rouen.

**Marie:** A house in Rouen? That's good! I have the dog in the car. Can he see Rouen too?

**Sophie:** Yes! Dogs can be with us! And the cat is in the car too.

**Marie:** You have a cat? I want to see this cat! Can we see these things in one day?

**Thomas:** No, it's very good! But we have two days. One day for Mont-Saint-Michel and Bayeux, another day for Rouen and Honfleur.

**Sophie:** Very good! There! We can see these beautiful things! Goodbye!`,
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
        instruction: "What does Sophie ask about?",
        prompt: "___ ___ ___ c'est, ça?",
        hint: "Look for the question phrase meaning 'what is that'",
        expectedAnswer: "qu'est-ce que",
        wrongAnswers: [
          {
            answer: "où est",
            feedback: "That means 'where is', not 'what is'",
          },
          {
            answer: "qui est",
            feedback: "That means 'who is', not 'what is'",
          },
        ],
      },
      {
        instruction: "What thing does Marie have in her car?",
        prompt: "Marie has a ___ in her car",
        hint: "It's about Normandy - something you can read",
        expectedAnswer: "livre",
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
        instruction: "What does Thomas want to see?",
        prompt: "Thomas wants to see ___",
        hint: "Famous Norman abbey on an island",
        expectedAnswer: "Mont-Saint-Michel",
        wrongAnswers: [
          {
            answer: "Bayeux",
            feedback: "He wants Mont-Saint-Michel, others mention Bayeux",
          },
          {
            answer: "Rouen",
            feedback: "He wants Mont-Saint-Michel, Rouen comes later",
          },
        ],
      },
      {
        instruction: "Who has a friend in Rouen?",
        prompt: "___ has a friend in Rouen",
        hint: "Look for 'mon ami ___ est là'",
        expectedAnswer: "Thomas",
        wrongAnswers: [
          {
            answer: "Sophie",
            feedback: "It's Thomas who has a friend Pierre in Rouen",
          },
          {
            answer: "Marie",
            feedback: "It's Thomas who has a friend Pierre in Rouen",
          },
        ],
      },
      {
        instruction: "What animals do they have?",
        prompt: "Marie has a ___ and Sophie has a ___",
        hint: "Two different pets mentioned in the conversation",
        expectedAnswer: "chien, chat",
        acceptableAnswers: ["chien et chat"],
        wrongAnswers: [
          {
            answer: "chat, chien",
            feedback: "Switch them: Marie has the dog, Sophie has the cat",
          },
        ],
      },
      {
        instruction: "How many days do they have for their trip?",
        prompt: "They have ___ days",
        hint: "Look for the number Thomas mentions",
        expectedAnswer: "deux",
        acceptableAnswers: ["2"],
        wrongAnswers: [
          {
            answer: "un",
            feedback: "They have two days, not one",
          },
          {
            answer: "trois",
            feedback: "They have two days, not three",
          },
        ],
      },
      {
        instruction: "Complete Marie's response about her dog:",
        prompt: "J'ai mon chien ___ ma voiture",
        hint: "Preposition meaning 'in'",
        expectedAnswer: "dans",
        wrongAnswers: [
          {
            answer: "sur",
            feedback: "Use 'dans' (in), not 'sur' (on)",
          },
          {
            answer: "avec",
            feedback: "Use 'dans' (in), not 'avec' (with)",
          },
        ],
      },
      {
        instruction:
          "What demonstrative does Sophie use about things in Normandy?",
        prompt: "Nous pouvons aller à ___ belles choses!",
        hint: "Demonstrative for 'these' with plural noun",
        expectedAnswer: "ces",
        wrongAnswers: [
          {
            answer: "ce",
            feedback: "Use 'ces' for plural, not 'ce' for singular masculine",
          },
          {
            answer: "cette",
            feedback: "Use 'ces' for plural, not 'cette' for singular feminine",
          },
        ],
      },
      {
        instruction: "How does Marie describe her new car?",
        prompt: "J'ai une ___ voiture",
        hint: "Adjective meaning 'new'",
        expectedAnswer: "nouvelle",
        wrongAnswers: [
          {
            answer: "nouveau",
            feedback:
              "Use feminine form 'nouvelle' with feminine noun 'voiture'",
          },
          {
            answer: "vieille",
            feedback: "She says it's new (nouvelle), not old (vieille)",
          },
        ],
      },
      {
        instruction:
          "What question word does Thomas use about Mont-Saint-Michel?",
        prompt: "___ est-ce?",
        hint: "Question word asking about location",
        expectedAnswer: "où",
        wrongAnswers: [
          {
            answer: "que",
            feedback: "He's asking 'where' (où), not 'what' (que)",
          },
          {
            answer: "qui",
            feedback: "He's asking 'where' (où), not 'who' (qui)",
          },
        ],
      },
      {
        instruction: "What preposition shows where Thomas's friend's house is?",
        prompt: "Elle est ___ Rouen",
        hint: "Preposition meaning 'in'",
        expectedAnswer: "dans",
        wrongAnswers: [
          {
            answer: "sur",
            feedback: "Use 'dans' (in), not 'sur' (on) for cities",
          },
        ],
      },
      {
        instruction: "How do they describe Mont-Saint-Michel?",
        prompt: "C'est un très ___ et très beau chose",
        hint: "Adjective meaning 'old'",
        expectedAnswer: "vieux",
        wrongAnswers: [
          {
            answer: "nouveau",
            feedback: "They say it's old (vieux), not new (nouveau)",
          },
          {
            answer: "jeune",
            feedback: "They say it's old (vieux), not young (jeune)",
          },
        ],
      },
      {
        instruction: "What can they do with the animals?",
        prompt: "Les chiens peuvent ___ avec nous!",
        hint: "Verb meaning 'to go'",
        expectedAnswer: "aller",
        wrongAnswers: [
          {
            answer: "voir",
            feedback: "The dogs can GO (aller) with them, not see (voir)",
          },
        ],
      },
    ],
  },
};
