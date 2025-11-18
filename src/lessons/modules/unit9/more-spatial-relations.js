/**
 * Module: Dynamic ID (auto-assigned)3: More Spatial Relations - Distance & Proximity
 * Unit 9 - Describe distance and relative positioning
 * Essential for giving directions and nuanced descriptions
 */

export const moreSpatialRelationsModule = {
  moduleKey: "2024-05-28-more-spatial-relations", // Permanent identifier - never changes
  title: "More Spatial Relations - Distance & Proximity",
  description:
    "Learn to describe distance and proximity: près de (near), loin de (far from), à côté de (next to), en face de (across from), autour de (around)",
  unit: 9,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Describe distance and proximity (near, far from, next to)",
      "Give detailed directions with spatial relations",
      "Say 'The café is next to the park' in French"
    ],
    realWorldUse: "give precise directions and describe locations",
    nextModuleTeaser: "Start learning past tense with regular -ER verbs"
  },

  concepts: [
    {
      term: "près de - near, close to",
      definition: "Indicates proximity, nearness",
      example:
        "Le café est près de l'école (The café is near the school), J'habite près d'ici (I live near here)",
    },
    {
      term: "loin de - far from",
      definition: "Indicates distance, remoteness",
      example:
        "La gare est loin de la maison (The station is far from the house), C'est loin d'ici? (Is it far from here?)",
    },
    {
      term: "à côté de - next to, beside",
      definition: "Indicates immediate proximity, side-by-side position",
      example:
        "Je suis à côté de toi (I'm next to you), Le restaurant est à côté du cinéma (The restaurant is next to the cinema)",
    },
    {
      term: "en face de - across from, opposite",
      definition: "Indicates facing position, directly opposite",
      example:
        "Ma maison est en face du parc (My house is across from the park), Il est assis en face de moi (He's sitting across from me)",
    },
    {
      term: "autour de - around",
      definition: "Indicates surrounding position",
      example:
        "Les gens sont autour de la table (People are around the table), Autour de la ville (Around the city)",
    },
    {
      term: "le long de - along",
      definition: "Indicates position along a length",
      example:
        "Le long de la rue (Along the street), On marche le long de la rivière (We walk along the river)",
    },
    {
      term: "au milieu de - in the middle of",
      definition: "Indicates center position",
      example:
        "Au milieu de la pièce (In the middle of the room), Il est au milieu (He's in the middle)",
    },
    {
      term: "au bout de - at the end of",
      definition: "Indicates end position",
      example:
        "Au bout de la rue (At the end of the street), C'est au bout (It's at the end)",
    },
  ],

  vocabularyReference: [
    {
      french: "près de",
      english: "near, close to",
      note: "⭐ very common - proximity",
    },
    {
      french: "loin de",
      english: "far from",
      note: "opposite of près de - distance",
    },
    {
      french: "à côté de",
      english: "next to, beside",
      note: "⭐ very common - right beside",
    },
    {
      french: "en face de",
      english: "across from, opposite",
      note: "facing - directly opposite",
    },
    {
      french: "autour de",
      english: "around",
      note: "surrounding - all around",
    },
    {
      french: "le long de",
      english: "along",
      note: "following a length/path",
    },
    {
      french: "au milieu de",
      english: "in the middle of",
      note: "center position - compound prep",
    },
    {
      french: "au bout de",
      english: "at the end of",
      note: "end position - compound prep",
    },
    {
      french: "la distance",
      english: "the distance",
      note: "feminine noun - how far",
    },
    {
      french: "proche",
      english: "close, near",
      note: "adjective - être proche de",
      example: "C'est proche",
    },
    {
      french: "lointain(e)",
      english: "distant, faraway",
      note: "adjective - opposite of proche",
      usage: "adjective",
      example: "un pays lointain",
    },
    {
      french: "ici",
      note: "⭐ here - this location",
      english: "here",
      usage: "adverb",
      example: "près d'ici",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt: "Complete: Le café est ___ l'école (The café is near the school)",
      answer: "près de",
      wrongAnswers: [
        {
          answer: "loin de",
          feedback:
            "Loin de means 'far from'. Use 'près de' for 'near/close to'!",
        },
        {
          answer: "devant",
          feedback:
            "Devant means 'in front of'. Use 'près de' for 'near/close to'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: La gare est ___ la maison (The station is far from the house)",
      answer: "loin de",
      wrongAnswers: [
        {
          answer: "près de",
          feedback:
            "Près de means 'near/close to'. Use 'loin de' for 'far from'!",
        },
        {
          answer: "à côté de",
          feedback: "À côté de means 'next to'. Use 'loin de' for 'far from'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je suis ___ toi (I'm next to you/I'm sitting beside you)",
      answer: "à côté de",
      wrongAnswers: [
        {
          answer: "près de",
          feedback:
            "Près de means 'near' (general). Use 'à côté de' for 'right next to/beside'!",
        },
        {
          answer: "avec",
          feedback: "Avec means 'with'. Use 'à côté de' for 'next to'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ma maison est ___ parc (My house is across from the park)",
      answer: "en face du",
      wrongAnswers: [
        {
          answer: "à côté du",
          feedback:
            "À côté de means 'next to' (same side). Use 'en face de' for 'across from' (opposite side)!",
        },
        {
          answer: "devant le",
          feedback:
            "Devant means 'in front of' (blocking). Use 'en face de' for 'across from' (facing)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Les gens sont ___ table (People are around the table)",
      answer: "autour de la",
      wrongAnswers: [
        {
          answer: "sur la",
          feedback:
            "Sur means 'on top of'. Use 'autour de' for 'around/surrounding'!",
        },
        {
          answer: "près de la",
          feedback:
            "Près de means 'near' (close). Use 'autour de' for 'around' (surrounding)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: On marche ___ rivière (We walk along the river)",
      answer: "le long de la",
      wrongAnswers: [
        {
          answer: "près de la",
          feedback:
            "Près de means 'near'. Use 'le long de' for 'along' (following the length)!",
        },
        {
          answer: "autour de la",
          feedback:
            "Autour de means 'around' (circling). Use 'le long de' for 'along' (following)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: La table est ___ pièce (The table is in the middle of the room)",
      answer: "au milieu de la",
      wrongAnswers: [
        {
          answer: "dans la",
          feedback:
            "Dans means 'in' (general). Use 'au milieu de' for 'in the middle of'!",
        },
        {
          answer: "sur la",
          feedback:
            "Sur means 'on'. Use 'au milieu de' for 'in the middle of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le restaurant est ___ rue (The restaurant is at the end of the street)",
      answer: "au bout de la",
      wrongAnswers: [
        {
          answer: "dans la",
          feedback:
            "Dans means 'in/on' (general). Use 'au bout de' for 'at the end of'!",
        },
        {
          answer: "près de la",
          feedback:
            "Près de means 'near'. Use 'au bout de' for 'at the end of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: J'habite ___ ici (I live near here/I live close by)",
      answer: "près d'",
      wrongAnswers: [
        {
          answer: "loin d'",
          feedback: "Loin de means 'far from'. Use 'près de' for 'near'!",
        },
        {
          answer: "dans",
          feedback: "Dans means 'in'. Use 'près d'ici' for 'near here'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: C'est ___ ici? (Is it far from here?)",
      answer: "loin d'",
      wrongAnswers: [
        {
          answer: "près d'",
          feedback: "Près de means 'near'. Use 'loin de' for 'far from'!",
        },
        {
          answer: "à côté d'",
          feedback: "À côté de means 'next to'. Use 'loin de' for 'far from'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le cinéma est ___ restaurant (The cinema is next to the restaurant)",
      answer: "à côté du",
      wrongAnswers: [
        {
          answer: "en face du",
          feedback:
            "En face de means 'across from'. Use 'à côté de' for 'next to/beside'!",
        },
        {
          answer: "dans le",
          feedback: "Dans means 'in/inside'. Use 'à côté de' for 'next to'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il est assis ___ moi (He's sitting across from me/facing me)",
      answer: "en face de",
      wrongAnswers: [
        {
          answer: "à côté de",
          feedback:
            "À côté de means 'next to' (same side). Use 'en face de' for 'across from' (opposite)!",
        },
        {
          answer: "devant",
          feedback:
            "Devant works but 'en face de' is more specific for facing position!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y a un jardin ___ maison (There's a garden around the house)",
      answer: "autour de la",
      wrongAnswers: [
        {
          answer: "dans la",
          feedback:
            "Dans means 'in/inside'. Use 'autour de' for 'around/surrounding'!",
        },
        {
          answer: "près de la",
          feedback:
            "Près de means 'near'. Use 'autour de' for 'around' (all sides)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y a des arbres ___ route (There are trees along the road)",
      answer: "le long de la",
      wrongAnswers: [
        {
          answer: "sur la",
          feedback:
            "Sur means 'on'. Use 'le long de' for 'along' (following the length)!",
        },
        {
          answer: "autour de la",
          feedback:
            "Autour de means 'around' (surrounding). Use 'le long de' for 'along'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y a une fontaine ___ place (There's a fountain in the middle of the square)",
      answer: "au milieu de la",
      wrongAnswers: [
        {
          answer: "dans la",
          feedback:
            "Dans means 'in' (general). Use 'au milieu de' for 'in the middle of'!",
        },
        {
          answer: "sur la",
          feedback:
            "Sur means 'on'. Use 'au milieu de' for 'in the middle of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: La porte est ___ couloir (The door is at the end of the hallway)",
      answer: "au bout du",
      wrongAnswers: [
        {
          answer: "dans le",
          feedback:
            "Dans means 'in' (general). Use 'au bout de' for 'at the end of'!",
        },
        {
          answer: "près du",
          feedback:
            "Près de means 'near'. Use 'au bout de' for 'at the end of'!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Le parc est ___ ville (The park is far from the city)",
      answer: "loin de la",
      wrongAnswers: [
        {
          answer: "près de la",
          feedback: "Près de means 'near'. Use 'loin de' for 'far from'!",
        },
        {
          answer: "dans la",
          feedback: "Dans means 'in'. Use 'loin de' for 'far from' (outside)!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt: "Complete: Assieds-toi ___ moi (Sit next to me/Sit beside me)",
      answer: "à côté de",
      wrongAnswers: [
        {
          answer: "avec",
          feedback:
            "Avec means 'with'. Use 'à côté de' for physical position 'next to'!",
        },
        {
          answer: "près de",
          feedback:
            "Près de means 'near' (general). Use 'à côté de' for 'right next to'!",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Le café est ___ l'école (The café is near the school)",
    "La gare est ___ la maison (The station is far from the house)",
    "Je suis ___ toi (I'm next to you)",
    "Ma maison est ___ parc (My house is across from the park)",
    "Les gens sont ___ table (People are around the table)",
    "On marche ___ rivière (We walk along the river)",
    "La table est ___ pièce (The table is in the middle of the room)",
    "Le restaurant est ___ rue (The restaurant is at the end of the street)",
    "J'habite ___ ici (I live near here)",
    "Le cinéma est ___ restaurant (The cinema is next to the restaurant)",
  ],
};
