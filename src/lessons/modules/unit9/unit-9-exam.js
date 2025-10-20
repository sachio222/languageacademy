/**
 * Unit 9 Exam - Comprehensive test for Discourse & Past Tense unit
 * Tests: causal words, spatial prepositions, passé composé, imparfait, PC vs IMP distinction
 */

export const unit9Exam = {
  moduleKey: "2024-06-09-unit-9-exam", // Permanent identifier - never changes
  title: "Unit 9 Final Exam - Discourse & Past Tense",
  description:
    "Test everything from Unit 9! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery.",

  // Special flags
  isUnitExam: true,
  unitNumber: 9,
  skipStudyMode: true,

  concepts: [
    {
      term: "Past Tenses and Discourse Mastery",
      definition:
        "You've mastered the complex past tense system and discourse markers essential for sophisticated French communication",
      example:
        "j'étais, tu étais, il était, j'avais, nous avions, alors, donc, en fait, d'ailleurs, je crois, il semble",
    },
    {
      term: "Imparfait Mastery",
      definition:
        "Learn the imperfect tense for expressing ongoing past actions, descriptions, and habitual actions",
      example:
        "j'étais (I was), tu étais (you were), il était (he was), j'avais (I had), nous avions (we had), ils faisaient (they were doing)",
    },
    {
      term: "Past Tense Contrast",
      definition:
        "Master the distinction between passé composé and imparfait for precise past tense expression",
      example:
        "passé composé (j'ai mangé - I ate) vs imparfait (je mangeais - I was eating), j'ai fait (I did) vs je faisais (I was doing)",
    },
    {
      term: "Plus-que-parfait",
      definition:
        "Learn the pluperfect tense for expressing actions that occurred before other past actions",
      example:
        "j'avais mangé (I had eaten), tu étais venu (you had come), il avait fait (he had done), nous avions parlé (we had spoken)",
    },
    {
      term: "Discourse Markers",
      definition:
        "Master essential discourse markers for connecting ideas and expressing opinions",
      example:
        "alors (so/then), donc (therefore), en fait (actually), d'ailleurs (besides), je crois (I believe), il semble (it seems)",
    },
  ],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Causal & Reason Words (6 questions)
      {
        instruction: "Translate to French",
        prompt: "because (most common)",
        hint: "Used to explain reasons - que follows",
        expectedAnswer: "parce que",
      },
      {
        instruction: "Translate to French",
        prompt: "because of (negative reason)",
        hint: "Used with nouns - negative connotation",
        expectedAnswer: "à cause de",
      },
      {
        instruction: "Translate to French",
        prompt: "thanks to (positive reason)",
        hint: "Used with nouns - positive connotation",
        expectedAnswer: "grâce à",
      },
      {
        instruction: "Translate to French",
        prompt: "since / as (formal reason)",
        hint: "More formal than parce que",
        expectedAnswer: "comme",
      },
      {
        instruction: "Translate to French",
        prompt: "for / because (literary)",
        hint: "Literary/formal style - sounds like English 'car'",
        expectedAnswer: "car",
      },
      {
        instruction: "Translate to French",
        prompt: "since (established fact)",
        hint: "Since something is already established",
        expectedAnswer: "puisque",
      },

      // SECTION 2: Spatial Prepositions (8 questions)
      {
        instruction: "Translate to French",
        prompt: "in front of",
        hint: "Opposite of derrière",
        expectedAnswer: "devant",
      },
      {
        instruction: "Translate to French",
        prompt: "behind",
        hint: "Opposite of devant",
        expectedAnswer: "derrière",
      },
      {
        instruction: "Translate to French",
        prompt: "between",
        hint: "Among two things",
        expectedAnswer: "entre",
      },
      {
        instruction: "Translate to French",
        prompt: "above / over",
        hint: "Compound preposition with dessus",
        expectedAnswer: "au-dessus de",
      },
      {
        instruction: "Translate to French",
        prompt: "below / under",
        hint: "Compound preposition with dessous",
        expectedAnswer: "au-dessous de",
      },
      {
        instruction: "Translate to French",
        prompt: "near / close to",
        hint: "Proximity - compound with de",
        expectedAnswer: "près de",
      },
      {
        instruction: "Translate to French",
        prompt: "far from",
        hint: "Distance - opposite of près de",
        expectedAnswer: "loin de",
      },
      {
        instruction: "Translate to French",
        prompt: "next to / beside",
        hint: "Right next to - compound with côté",
        expectedAnswer: "à côté de",
      },

      // SECTION 3: Passé Composé - Regular -ER verbs (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I spoke",
        hint: "passé composé of parler",
        expectedAnswer: "j'ai parlé",
      },
      {
        instruction: "Translate to French",
        prompt: "you ate (informal)",
        hint: "passé composé of manger",
        expectedAnswer: "tu as mangé",
      },
      {
        instruction: "Translate to French",
        prompt: "we listened",
        hint: "passé composé of écouter",
        expectedAnswer: "nous avons écouté",
      },
      {
        instruction: "Translate to French",
        prompt: "they worked (masculine)",
        hint: "passé composé of travailler",
        expectedAnswer: "ils ont travaillé",
      },

      // SECTION 4: Passé Composé - Irregular Past Participles (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I had",
        hint: "passé composé of avoir - irregular participle",
        expectedAnswer: "j'ai eu",
      },
      {
        instruction: "Translate to French",
        prompt: "she was",
        hint: "passé composé of être - irregular participle",
        expectedAnswer: "elle a été",
      },
      {
        instruction: "Translate to French",
        prompt: "we did/made",
        hint: "passé composé of faire - irregular participle",
        expectedAnswer: "nous avons fait",
      },
      {
        instruction: "Translate to French",
        prompt: "you saw (formal)",
        hint: "passé composé of voir - irregular participle",
        expectedAnswer: "vous avez vu",
      },
      {
        instruction: "Translate to French",
        prompt: "he said",
        hint: "passé composé of dire - irregular participle",
        expectedAnswer: "il a dit",
      },
      {
        instruction: "Translate to French",
        prompt: "I took",
        hint: "passé composé of prendre - irregular participle",
        expectedAnswer: "j'ai pris",
      },

      // SECTION 5: Passé Composé with être (5 questions)
      {
        instruction: "Translate to French",
        prompt: "she went",
        hint: "passé composé of aller - feminine agreement",
        expectedAnswer: "elle est allée",
      },
      {
        instruction: "Translate to French",
        prompt: "they came (masculine)",
        hint: "passé composé of venir - masculine plural",
        expectedAnswer: "ils sont venus",
      },
      {
        instruction: "Translate to French",
        prompt: "I left (masculine speaker)",
        hint: "passé composé of partir",
        expectedAnswer: "je suis parti",
      },
      {
        instruction: "Translate to French",
        prompt: "we arrived (mixed group)",
        hint: "passé composé of arriver - mixed group = masculine",
        expectedAnswer: "nous sommes arrivés",
      },
      {
        instruction: "Translate to French",
        prompt: "you stayed (feminine, informal)",
        hint: "passé composé of rester - feminine agreement",
        expectedAnswer: "tu es restée",
      },

      // SECTION 6: Imparfait Formation (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I was speaking",
        hint: "imparfait of parler",
        expectedAnswer: "je parlais",
      },
      {
        instruction: "Translate to French",
        prompt: "you were (informal)",
        hint: "imparfait of être",
        expectedAnswer: "tu étais",
      },
      {
        instruction: "Translate to French",
        prompt: "it was (weather)",
        hint: "imparfait of faire - weather expression",
        expectedAnswer: "il faisait",
      },
      {
        instruction: "Translate to French",
        prompt: "we used to go",
        hint: "imparfait of aller - habitual action",
        expectedAnswer: "nous allions",
      },
      {
        instruction: "Translate to French",
        prompt: "they had (feminine)",
        hint: "imparfait of avoir",
        expectedAnswer: "elles avaient",
      },
      {
        instruction: "Translate to French",
        prompt: "you were finishing (formal)",
        hint: "imparfait of finir",
        expectedAnswer: "vous finissiez",
      },

      // SECTION 7: PC vs Imparfait - The Golden Rule (5 questions)
      {
        instruction:
          "Choose the correct tense for: 'I was reading when he called'",
        prompt: "je _____ (lire) quand il a téléphoné",
        hint: "Ongoing background action - use imparfait",
        expectedAnswer: "lisais",
      },
      {
        instruction:
          "Choose the correct tense for: 'Yesterday I bought a book'",
        prompt: "hier j'_____ (acheter) un livre",
        hint: "Completed action at specific time - use passé composé",
        expectedAnswer: "ai acheté",
      },
      {
        instruction:
          "Choose the correct tense for: 'Every day he walked to school'",
        prompt: "chaque jour il _____ (marcher) à l'école",
        hint: "Repeated habitual action - use imparfait",
        expectedAnswer: "marchait",
      },
      {
        instruction: "Choose the correct tense for: 'Suddenly the door opened'",
        prompt: "soudain la porte s'_____ (ouvrir)",
        hint: "Sudden completed event - use passé composé",
        expectedAnswer: "est ouverte",
      },
      {
        instruction:
          "Choose the correct tense for: 'While it was raining, I stayed inside'",
        prompt: "pendant qu'il _____ (pleuvoir), je suis resté dedans",
        hint: "Background condition/description - use imparfait",
        expectedAnswer: "pleuvait",
      },
    ],
  },
};
