/**
 * Module 146: Directions & Navigation
 * Unit 11 - Essential for getting around: directions, compass, navigation
 */

export const directionsNavigationModule = {
  title: "Directions & Navigation",
  description:
    "Essential navigation skills! North/south/east/west, turn left/right, give directions. Perfect for traveling and helping tourists!",
  unit: 11,

  concepts: [
    {
      term: "Cardinal Directions",
      definition: "The four main compass directions in French",
      example: "le nord (north), le sud (south), l'est (east), l'ouest (west)",
    },
    {
      term: "Turn Directions",
      definition: "Essential for giving and following directions",
      example:
        "tournez à gauche (turn left), tournez à droite (turn right), tout droit (straight ahead)",
    },
    {
      term: "Location Descriptions",
      definition: "Describe where things are relative to other things",
      example:
        "à côté de (next to), en face de (across from), près de (near), loin de (far from)",
    },
    {
      term: "Giving Directions",
      definition: "Complete phrases for helping someone navigate",
      example:
        "Allez tout droit, puis tournez à gauche (Go straight, then turn left)",
    },
    {
      term: "Asking for Directions",
      definition: "How to ask for help when lost",
      example:
        "Excusez-moi, où est...? (Excuse me, where is...?), Comment aller à...? (How do you get to...?)",
    },
  ],

  vocabularyReference: [
    // Cardinal directions
    {
      french: "le nord",
      english: "north",
      note: "masculine - vers le nord (towards the north)",
    },
    {
      french: "le sud",
      english: "south",
      note: "masculine - au sud de Paris (south of Paris)",
    },
    {
      french: "l'est",
      english: "east",
      note: "masculine - à l'est (in/to the east)",
    },
    {
      french: "l'ouest",
      english: "west",
      note: "masculine - vers l'ouest (towards the west)",
    },

    // Turn directions
    {
      french: "à gauche",
      english: "to the left / on the left",
      note: "⭐ essential for directions",
    },
    {
      french: "à droite",
      english: "to the right / on the right",
      note: "⭐ essential for directions",
    },
    {
      french: "tout droit",
      english: "straight ahead",
      note: "⭐ keep going forward",
    },
    {
      french: "tournez",
      english: "turn (formal command)",
      note: "from tourner - vous form",
    },
    {
      french: "tourne",
      english: "turn (informal command)",
      note: "from tourner - tu form",
    },
    {
      french: "tournez à gauche",
      english: "turn left",
      note: "complete direction instruction",
    },
    {
      french: "tournez à droite",
      english: "turn right",
      note: "complete direction instruction",
    },

    // Movement verbs for directions
    {
      french: "allez",
      english: "go (formal command)",
      note: "from aller - directions context",
    },
    {
      french: "va",
      english: "go (informal command)",
      note: "from aller - casual directions",
    },
    {
      french: "continuez",
      english: "continue (formal)",
      note: "keep going forward",
    },
    {
      french: "continue",
      english: "continue (informal)",
      note: "keep going forward",
    },

    // Distance and location
    {
      french: "près de",
      english: "near / close to",
      note: "already learned, used in directions",
    },
    {
      french: "loin de",
      english: "far from",
      note: "distance indication",
    },
    {
      french: "à côté de",
      english: "next to / beside",
      note: "already learned, precise location",
    },
    {
      french: "en face de",
      english: "across from / opposite",
      note: "already learned, opposite side",
    },
    {
      french: "au coin de",
      english: "at the corner of",
      note: "street intersection",
    },

    // Distance measurements
    {
      french: "à cinq minutes",
      english: "five minutes away",
      note: "time-based distance",
    },
    {
      french: "à pied",
      english: "on foot / walking",
      note: "mode of transport",
    },
    {
      french: "en voiture",
      english: "by car",
      note: "mode of transport",
    },

    // Asking for directions
    {
      french: "où est...?",
      english: "where is...?",
      note: "⭐ basic location question",
    },
    {
      french: "comment aller à...?",
      english: "how do you get to...?",
      note: "asking for directions",
    },
    {
      french: "excusez-moi, où est...?",
      english: "excuse me, where is...?",
      note: "polite way to ask directions",
    },
    {
      french: "c'est loin?",
      english: "is it far?",
      note: "distance inquiry",
    },
    {
      french: "c'est près?",
      english: "is it close/near?",
      note: "proximity inquiry",
    },

    // Common direction phrases
    {
      french: "c'est par là",
      english: "it's that way",
      note: "pointing in a direction",
    },
    {
      french: "c'est par ici",
      english: "it's this way",
      note: "indicating nearby direction",
    },
    {
      french: "vous voyez",
      english: "you see / do you see",
      note: "in direction-giving context",
    },
  ],

  exerciseConfig: {
    type: "custom",
    items: [
      // Basic conjugations
      {
        instruction: "Translate to French",
        prompt: "I wait",
        hint: "attendre for je",
        expectedAnswer: "j'attends",
      },
      {
        instruction: "Translate to French",
        prompt: "you arrive (informal)",
        hint: "arriver for tu",
        expectedAnswer: "tu arrives",
      },
      {
        instruction: "Translate to French",
        prompt: "we stay",
        hint: "rester for nous",
        expectedAnswer: "nous restons",
      },

      // Cardinal directions
      {
        instruction: "Translate to French",
        prompt: "north",
        hint: "masculine direction",
        expectedAnswer: "le nord",
      },
      {
        instruction: "Translate to French",
        prompt: "south",
        hint: "masculine direction",
        expectedAnswer: "le sud",
      },
      {
        instruction: "Translate to French",
        prompt: "turn left",
        hint: "tournez + à gauche",
        expectedAnswer: "tournez à gauche",
        acceptableAnswers: ["tourne à gauche"],
      },
      {
        instruction: "Translate to French",
        prompt: "turn right",
        hint: "tournez + à droite",
        expectedAnswer: "tournez à droite",
        acceptableAnswers: ["tourne à droite"],
      },

      // Practical situations
      {
        instruction: "Say: 'I'm waiting for the bus'",
        prompt: "I'm waiting for the bus",
        hint: "j'attends + le bus",
        expectedAnswer: "j'attends le bus",
      },
      {
        instruction: "Say: 'The train arrives at 3pm'",
        prompt: "The train arrives at 3pm",
        hint: "le train arrive + à + time",
        expectedAnswer: "le train arrive à trois heures",
        acceptableAnswers: ["le train arrive à 15h"],
      },
      {
        instruction: "Ask: 'Where is the train station?'",
        prompt: "Where is the train station?",
        hint: "où est + la gare",
        expectedAnswer: "où est la gare?",
      },
      {
        instruction: "Give direction: 'Go straight, then turn left'",
        prompt: "Go straight, then turn left",
        hint: "allez tout droit + puis + tournez à gauche",
        expectedAnswer: "allez tout droit, puis tournez à gauche",
        acceptableAnswers: ["va tout droit, puis tourne à gauche"],
      },
      {
        instruction: "Ask politely: 'Excuse me, how do you get to the museum?'",
        prompt: "Excuse me, how do you get to the museum?",
        hint: "excusez-moi + comment aller + au musée",
        expectedAnswer: "excusez-moi, comment aller au musée?",
      },
      {
        instruction: "Ask: 'Is it far?'",
        prompt: "Is it far?",
        hint: "c'est + loin + question",
        expectedAnswer: "c'est loin?",
      },
      {
        instruction: "Say: 'It's five minutes on foot'",
        prompt: "It's five minutes on foot",
        hint: "c'est + à cinq minutes + à pied",
        expectedAnswer: "c'est à cinq minutes à pied",
      },
      {
        instruction: "Say: 'I'm staying in Paris for three days'",
        prompt: "I'm staying in Paris for three days",
        hint: "je reste + à Paris + pendant + duration",
        expectedAnswer: "je reste à Paris pendant trois jours",
      },
    ],
  },

  skipStudyMode: false,
};
