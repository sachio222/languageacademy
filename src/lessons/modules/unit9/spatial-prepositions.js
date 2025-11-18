/**
 * Module: Dynamic ID (auto-assigned)2: Spatial Prepositions - Position & Location
 * Unit 9 - Describe WHERE things are in physical space
 * Essential for scene-setting and physical descriptions
 */

export const spatialPrepositionsModule = {
  moduleKey: "2024-06-08-spatial-prepositions", // Permanent identifier - never changes
  title: "Spatial Prepositions - Position & Location",
  description:
    "Learn to describe where things are: devant (in front of), derrière (behind), entre (between), au-dessus (above), au-dessous (below)",
  unit: 9,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Describe precise locations (in front of, behind, between)",
      "Give directions and explain positions",
      "Say 'The café is in front of the park' in French"
    ],
    realWorldUse: "describe locations and give directions",
    nextModuleTeaser: "Add more spatial relations for complete descriptions"
  },

  concepts: [
    {
      term: "devant - in front of",
      definition: "Indicates position in front of something",
      example:
        "Je suis devant la porte (I'm in front of the door), La voiture est devant la maison (The car is in front of the house)",
    },
    {
      term: "derrière - behind",
      definition: "Indicates position behind something",
      example:
        "Le chat est derrière le sofa (The cat is behind the sofa), Il est derrière moi (He's behind me)",
    },
    {
      term: "entre - between",
      definition: "Indicates position between two things",
      example:
        "Le café est entre l'école et le parc (The café is between the school and the park), Entre toi et moi (Between you and me)",
    },
    {
      term: "parmi - among",
      definition: "Indicates being among multiple things or people",
      example:
        "Parmi les étudiants (Among the students), Il est parmi nous (He's among us)",
    },
    {
      term: "au-dessus (de) - above, over",
      definition: "Indicates position above something",
      example:
        "Le tableau est au-dessus de la table (The painting is above the table), Au-dessus de la ville (Above the city)",
    },
    {
      term: "au-dessous (de) - below, beneath, under",
      definition: "Indicates position below something",
      example:
        "Au-dessous du niveau (Below the level), Le parking est au-dessous (The parking is below)",
    },
    {
      term: "Review: dans, sur, sous",
      definition:
        "Reinforce: dans (in/inside), sur (on/on top of), sous (under/beneath)",
      example:
        "Le livre est dans le sac (in the bag), sur la table (on the table), sous la chaise (under the chair)",
    },
  ],

  vocabularyReference: [
    {
      french: "devant",
      english: "in front of",
      note: "opposite of derrière",
    },
    {
      french: "derrière",
      english: "behind",
      note: "opposite of devant",
    },
    {
      french: "entre",
      english: "between",
      note: "use 'et' to connect: entre A et B",
    },
    {
      french: "parmi",
      english: "among",
      note: "among multiple things/people",
    },
    {
      french: "au-dessus de",
      english: "above, over",
      note: "compound preposition - higher than",
    },
    {
      french: "au-dessous de",
      english: "below, beneath",
      note: "compound preposition - lower than",
    },
    {
      french: "dans",
      english: "in, inside",
      note: "⭐ very common - inside something",
    },
    {
      french: "sur",
      english: "on, on top of",
      note: "⭐ very common - on surface",
    },
    {
      french: "sous",
      english: "under, beneath",
      note: "⭐ very common - underneath",
    },
    {
      french: "la position",
      english: "the position",
      note: "feminine noun - where something is",
    },
    {
      french: "l'endroit (m)",
      english: "the place, spot",
      note: "masculine noun - specific location",
    },
    {
      french: "la place",
      english: "the place, space, seat",
      note: "feminine noun - room/space/seat",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt: "Complete: Je suis ___ la porte (I'm in front of the door)",
      answer: "devant",
      wrongAnswers: [
        {
          answer: "derrière",
          feedback: "Derrière means 'behind'. Use 'devant' for 'in front of'!",
        },
        {
          answer: "dans",
          feedback: "Dans means 'in/inside'. Use 'devant' for 'in front of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Le chat est ___ le sofa (The cat is behind the sofa)",
      answer: "derrière",
      wrongAnswers: [
        {
          answer: "devant",
          feedback: "Devant means 'in front of'. Use 'derrière' for 'behind'!",
        },
        {
          answer: "sous",
          feedback:
            "Sous means 'under'. Use 'derrière' for 'behind' (back side)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le café est ___ l'école et le parc (The café is between the school and the park)",
      answer: "entre",
      wrongAnswers: [
        {
          answer: "parmi",
          feedback:
            "Parmi means 'among' (many things). Use 'entre' for 'between' two things!",
        },
        {
          answer: "dans",
          feedback:
            "Dans means 'in/inside'. Use 'entre' for 'between' two places!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le tableau est ___ la table (The painting is above the table)",
      answer: "au-dessus de",
      wrongAnswers: [
        {
          answer: "au-dessous de",
          feedback: "Au-dessous means 'below'. Use 'au-dessus de' for 'above'!",
        },
        {
          answer: "sur",
          feedback:
            "Sur means 'on' (touching). Use 'au-dessus de' for 'above' (not touching)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ les étudiants, il-y-a des français (Among the students, there are French people)",
      answer: "Parmi",
      wrongAnswers: [
        {
          answer: "Entre",
          feedback:
            "Entre is for TWO things. Use 'parmi' for 'among' many things!",
        },
        {
          answer: "Dans",
          feedback: "Dans means 'in/inside'. Use 'parmi' for 'among' a group!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Le parking est ___ (The parking is below/downstairs)",
      answer: "au-dessous",
      wrongAnswers: [
        {
          answer: "au-dessus",
          feedback: "Au-dessus means 'above'. Use 'au-dessous' for 'below'!",
        },
        {
          answer: "sous",
          feedback:
            "Sous needs a noun after it: 'sous la maison'. Use 'au-dessous' alone!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le livre est ___ le sac (The book is in the bag/inside the bag)",
      answer: "dans",
      wrongAnswers: [
        {
          answer: "sur",
          feedback:
            "Sur means 'on top of'. Use 'dans' for 'in/inside' something!",
        },
        {
          answer: "devant",
          feedback: "Devant means 'in front of'. Use 'dans' for 'in/inside'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Mes clés sont ___ la table (My keys are on the table)",
      answer: "sur",
      wrongAnswers: [
        {
          answer: "dans",
          feedback:
            "Dans means 'in/inside'. Use 'sur' for 'on top of' a surface!",
        },
        {
          answer: "au-dessus de",
          feedback:
            "Au-dessus means 'above' (not touching). Use 'sur' for 'on' (touching)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le chien est ___ la table (The dog is under the table)",
      answer: "sous",
      wrongAnswers: [
        {
          answer: "sur",
          feedback: "Sur means 'on top of'. Use 'sous' for 'under/beneath'!",
        },
        {
          answer: "au-dessous de",
          feedback:
            "Au-dessous is for 'below' in levels. Use 'sous' for 'under' physically!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ toi et moi, c'est un secret (Between you and me, it's a secret)",
      answer: "Entre",
      wrongAnswers: [
        {
          answer: "Parmi",
          feedback:
            "Parmi is for many things. Use 'entre' for 'between' two people!",
        },
        {
          answer: "Avec",
          feedback: "Avec means 'with'. Use 'entre' for 'between'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y a un jardin ___ la maison (There's a garden behind the house)",
      answer: "derrière",
      wrongAnswers: [
        {
          answer: "devant",
          feedback:
            "Devant means 'in front of'. Use 'derrière' for 'behind/in back'!",
        },
        {
          answer: "dans",
          feedback:
            "Dans means 'in/inside'. Use 'derrière' for 'behind/in back'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: La lampe est ___ le lit (The lamp is above the bed)",
      answer: "au-dessus du",
      wrongAnswers: [
        {
          answer: "sur",
          feedback:
            "Sur means 'on' (touching). Use 'au-dessus de' for 'above' (hanging)!",
        },
        {
          answer: "devant",
          feedback:
            "Devant means 'in front of'. Use 'au-dessus de' for 'above'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il est assis ___ moi (He's sitting in front of me/facing me)",
      answer: "devant",
      wrongAnswers: [
        {
          answer: "derrière",
          feedback:
            "Derrière means 'behind'. Use 'devant' for 'in front of/facing'!",
        },
        {
          answer: "avec",
          feedback: "Avec means 'with'. Use 'devant' for 'in front of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ nous, il-y-a un bon professeur (Among us, there's a good teacher)",
      answer: "Parmi",
      wrongAnswers: [
        {
          answer: "Entre",
          feedback:
            "Entre is for between TWO. Use 'parmi' for 'among' a group!",
        },
        {
          answer: "Avec",
          feedback: "Avec means 'with'. Use 'parmi' for 'among'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Ma chambre est ___ (My bedroom is downstairs/below)",
      answer: "au-dessous",
      wrongAnswers: [
        {
          answer: "au-dessus",
          feedback:
            "Au-dessus means 'above/upstairs'. Use 'au-dessous' for 'below/downstairs'!",
        },
        {
          answer: "en bas",
          feedback: "En bas works too! But we're learning 'au-dessous' here.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le chat dort ___ mon lit (The cat sleeps under my bed)",
      answer: "sous",
      wrongAnswers: [
        {
          answer: "sur",
          feedback: "Sur means 'on top of'. Use 'sous' for 'under/beneath'!",
        },
        {
          answer: "dans",
          feedback: "Dans means 'in/inside'. Use 'sous' for 'under/beneath'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y a un arbre ___ ma fenêtre (There's a tree in front of my window)",
      answer: "devant",
      wrongAnswers: [
        {
          answer: "derrière",
          feedback: "Derrière means 'behind'. Use 'devant' for 'in front of'!",
        },
        {
          answer: "entre",
          feedback:
            "Entre is for 'between' two things. Use 'devant' for 'in front of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ton livre est ___ mes livres (Your book is among my books)",
      answer: "parmi",
      wrongAnswers: [
        {
          answer: "entre",
          feedback:
            "Entre is for between TWO specific things. Use 'parmi' for among many!",
        },
        {
          answer: "dans",
          feedback: "Dans means 'in/inside'. Use 'parmi' for 'among' a group!",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Je suis ___ la porte (I'm in front of the door)",
    "Le chat est ___ le sofa (The cat is behind the sofa)",
    "Le café est ___ l'école et le parc (The café is between the school and park)",
    "Le tableau est ___ la table (The painting is above the table)",
    "___ les étudiants, il-y-a Marie (Among the students, there's Marie)",
    "Le livre est ___ le sac (The book is in the bag)",
    "Mes clés sont ___ la table (My keys are on the table)",
    "Le chien est ___ la table (The dog is under the table)",
    "Il-y-a un jardin ___ la maison (There's a garden behind the house)",
    "La lampe est ___ le lit (The lamp is above the bed)",
  ],
};
