/**
 * Unit 7 Exam - Comprehensive test for Knowledge & Learning unit
 * Tests: on, cognitive verbs, discourse markers, modifiers
 */

export const unit7Exam = {
  moduleKey: "2024-05-10-unit-7-exam", // Permanent identifier - never changes
  title: "Unit 7 Final Exam - Knowledge & Learning",
  description:
    "Test everything from Unit 7! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers.",

  // Special flags
  isUnitExam: true,
  unitNumber: 7,
  skipStudyMode: true,

  // Email-specific metadata for reengagement emails
  emailMetadata: {
    capabilities: [
      "Express thinking, knowing, and understanding in French",
      "Use discourse markers for natural speech (donc, en fait, quoi)",
      "Discuss learning, beliefs, and knowledge naturally"
    ],
    realWorldUse: "express thoughts, knowledge, and opinions",
    milestone: "Cognitive expression mastery",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 8 for daily routines and reflexive verbs"
  },

  concepts: [
    {
      term: "Knowledge and Learning Mastery",
      definition:
        "You've mastered the cognitive verbs and structures essential for expressing knowledge, understanding, and learning",
      example:
        "on comprend, je pense, tu sais, il connaît, nous apprenons, vous enseignez, ils étudient",
    },
    {
      term: "Cognitive Verb Mastery",
      definition:
        "Learn the essential verbs for expressing mental processes and knowledge acquisition",
      example:
        "comprendre (je comprends, tu comprends, il comprend), penser (je pense, tu penses, il pense), savoir (je sais, tu sais, il sait), connaître (je connais, tu connais, il connaît)",
    },
    {
      term: "Learning and Teaching",
      definition:
        "Master verbs for expressing learning, teaching, and studying activities",
      example:
        "apprendre (je apprends, tu apprends, il apprend), enseigner (j'enseigne, tu enseignes, il enseigne), étudier (j'étudie, tu étudies, il étudie)",
    },
    {
      term: "On vs Nous Usage",
      definition:
        "Learn the subtle but important distinction between on and nous in French conversation",
      example:
        "on comprend (we understand - informal), nous comprenons (we understand - formal), on apprend (we learn - general), nous apprenons (we learn - specific group)",
    },
    {
      term: "Cultural and Academic Vocabulary",
      definition:
        "Learn essential vocabulary for education, culture, and intellectual discourse",
      example:
        "école, université, professeur, étudiant, culture, langue, français, anglais, mathématiques, histoire, science",
    },
  ],
  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      // SECTION 1: Pronoun "on" (8 questions)
      {
        instruction: "Translate to French",
        prompt: "we go (using on)",
        hint: "on + il/elle form of aller",
        expectedAnswer: "on va",
      },
      {
        instruction: "Translate to French",
        prompt: "we must study (using on)",
        hint: "on doit + étudier",
        expectedAnswer: "on doit étudier",
      },
      {
        instruction: "Translate to French",
        prompt: "Shall we go? (using on)",
        hint: "On y va + ?",
        expectedAnswer: "on y va",
      },
      {
        instruction: "Translate to French",
        prompt: "we can learn (using on)",
        hint: "on + peut + apprendre",
        expectedAnswer: "on peut apprendre",
      },
      {
        instruction: "Translate to French",
        prompt: "people say (using on)",
        hint: "on + dire for il/elle",
        expectedAnswer: "on dit",
      },
      {
        instruction: "What does 'on' mean?",
        prompt: "on",
        hint: "Three meanings: we (informal), one, or people",
        expectedAnswer: "we",
        acceptableAnswers: ["one", "people", "we/one", "we/people"],
      },
      {
        instruction: "Translate to French",
        prompt: "everyone",
        hint: "Fixed expression - literally 'all the world'",
        expectedAnswer: "tout le monde",
      },
      {
        instruction: "Translate to French",
        prompt: "people (general - plural noun)",
        hint: "les + ...",
        expectedAnswer: "les gens",
      },

      // SECTION 2: comprendre (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I understand",
        hint: "comprendre for je",
        expectedAnswer: "je comprends",
      },
      {
        instruction: "Translate to French",
        prompt: "Do you understand? (informal)",
        hint: "tu + comprendre",
        expectedAnswer: "tu comprends",
      },
      {
        instruction: "Translate to French",
        prompt: "I don't understand",
        hint: "Essential learning phrase!",
        expectedAnswer: "je ne comprends pas",
      },
      {
        instruction: "Translate to French",
        prompt: "we understand (using on)",
        hint: "on + comprendre",
        expectedAnswer: "on comprend",
      },
      {
        instruction: "Translate to French",
        prompt: "she understands",
        hint: "comprendre for elle",
        expectedAnswer: "elle comprend",
      },

      // SECTION 3: savoir (6 questions)
      {
        instruction: "Translate to French",
        prompt: "I know (facts)",
        hint: "savoir for je",
        expectedAnswer: "je sais",
      },
      {
        instruction: "Translate to French",
        prompt: "I don't know",
        hint: "Rank 21 - most common phrase!",
        expectedAnswer: "je ne sais pas",
      },
      {
        instruction: "Translate to French",
        prompt: "I know how to speak French",
        hint: "savoir + infinitive for skills",
        expectedAnswer: "je sais parler français",
        acceptableAnswers: ["je sais parler francais"],
      },
      {
        instruction: "Translate to French",
        prompt: "you know (informal)",
        hint: "savoir for tu",
        expectedAnswer: "tu sais",
      },
      {
        instruction: "Translate to French",
        prompt: "everyone knows",
        hint: "tout le monde + singular verb!",
        expectedAnswer: "tout le monde sait",
      },
      {
        instruction: "When do you use 'savoir'?",
        prompt: "savoir is for...",
        hint: "Facts or skills, NOT people/places",
        expectedAnswer: "facts",
        acceptableAnswers: [
          "skills",
          "facts and skills",
          "knowing facts",
          "how to",
        ],
      },

      // SECTION 4: connaître (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I know Marie (person)",
        hint: "connaître for people - NOT savoir!",
        expectedAnswer: "je connais Marie",
      },
      {
        instruction: "Translate to French",
        prompt: "I know Paris (place)",
        hint: "connaître for places",
        expectedAnswer: "je connais Paris",
      },
      {
        instruction: "Translate to French",
        prompt: "Do you know this restaurant? (informal)",
        hint: "tu + connaître + ce restaurant",
        expectedAnswer: "tu connais ce restaurant",
      },
      {
        instruction: "Translate to French",
        prompt: "we know people (using on)",
        hint: "on + connaître + les gens",
        expectedAnswer: "on connaît les gens",
        acceptableAnswers: ["on connait les gens"],
      },
      {
        instruction: "When do you use 'connaître'?",
        prompt: "connaître is for...",
        hint: "People or places, NOT facts",
        expectedAnswer: "people",
        acceptableAnswers: ["places", "people and places", "people/places"],
      },

      // SECTION 5: penser (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I think",
        hint: "penser for je",
        expectedAnswer: "je pense",
      },
      {
        instruction: "Translate to French",
        prompt: "I think so",
        hint: "je pense que + oui",
        expectedAnswer: "je pense que oui",
      },
      {
        instruction: "Translate to French",
        prompt: "What do you think? (informal)",
        hint: "Qu'est-ce que tu + ...?",
        expectedAnswer: "qu'est-ce que tu penses",
      },
      {
        instruction: "Translate to French",
        prompt: "we think (using on)",
        hint: "on + penser",
        expectedAnswer: "on pense",
      },

      // SECTION 6: croire (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I believe",
        hint: "croire for je",
        expectedAnswer: "je crois",
      },
      {
        instruction: "Translate to French",
        prompt: "I believe so",
        hint: "je crois que + oui",
        expectedAnswer: "je crois que oui",
      },
      {
        instruction: "Translate to French",
        prompt: "we must believe in ourselves",
        hint: "on doit + croire en soi",
        expectedAnswer: "on doit croire en soi",
      },
      {
        instruction: "Translate to French",
        prompt: "she believes",
        hint: "croire for elle",
        expectedAnswer: "elle croit",
      },

      // SECTION 7: Learning verbs - apprendre, enseigner, étudier, réviser (4 questions)
      {
        instruction: "Translate to French",
        prompt: "I'm learning French",
        hint: "apprendre for je + le français",
        expectedAnswer: "j'apprends le français",
        acceptableAnswers: ["j apprends le francais", "j'apprends le francais"],
      },
      {
        instruction: "Translate to French",
        prompt: "she teaches French",
        hint: "enseigner for elle",
        expectedAnswer: "elle enseigne le français",
        acceptableAnswers: ["elle enseigne le francais"],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm studying at university",
        hint: "étudier + à l'université",
        expectedAnswer: "j'étudie à l'université",
        acceptableAnswers: [
          "j etudie a l universite",
          "j'étudie à l'universite",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm reviewing my lessons",
        hint: "réviser + mes leçons",
        expectedAnswer: "je révise mes leçons",
        acceptableAnswers: ["je revise mes lecons"],
      },

      // SECTION 8: Knowledge nouns (5 questions)
      {
        instruction: "Translate to French",
        prompt: "I have a question",
        hint: "j'ai + une question (feminine)",
        expectedAnswer: "j'ai une question",
      },
      {
        instruction: "Translate to French",
        prompt: "the answer",
        hint: "feminine noun with la",
        expectedAnswer: "la réponse",
        acceptableAnswers: ["la reponse"],
      },
      {
        instruction: "Translate to French",
        prompt: "a good idea",
        hint: "une bonne + ... (feminine)",
        expectedAnswer: "une bonne idée",
        acceptableAnswers: ["une bonne idee"],
      },
      {
        instruction: "Translate to French",
        prompt: "the lesson",
        hint: "feminine noun with la",
        expectedAnswer: "la leçon",
        acceptableAnswers: ["la lecon"],
      },
      {
        instruction: "Translate to French",
        prompt: "the class / the course",
        hint: "masculine noun",
        expectedAnswer: "le cours",
      },

      // SECTION 9: Discourse markers (5 questions)
      {
        instruction: "Translate to French",
        prompt: "so / therefore",
        hint: "Logical conclusion connector",
        expectedAnswer: "donc",
      },
      {
        instruction: "Translate to French",
        prompt: "actually / in fact",
        hint: "Two words - clarification marker",
        expectedAnswer: "en fait",
      },
      {
        instruction: "What does 'quoi' mean at the end of a sentence?",
        prompt: "quoi (at end)",
        hint: "Filler word for emphasis",
        expectedAnswer: "you know",
        acceptableAnswers: ["like", "you know?"],
      },
      {
        instruction: "Complete: 'So, do you understand?' (Start with donc)",
        prompt: "So, do you understand? (informal)",
        hint: "donc + comma + tu comprends",
        expectedAnswer: "donc, tu comprends",
      },
      {
        instruction: "Complete: 'That's good, you know' (End with quoi)",
        prompt: "That's good, you know",
        hint: "c'est bon + comma + quoi",
        expectedAnswer: "c'est bon, quoi",
      },
      {
        instruction: "Translate to French",
        prompt: "maybe",
        hint: "Perhaps, possibly - with hyphen",
        expectedAnswer: "peut-être",
      },
      {
        instruction: "Translate to French",
        prompt: "definitely",
        hint: "Certainly, for sure",
        expectedAnswer: "certainement",
      },
      {
        instruction: "Translate to French",
        prompt: "of course",
        hint: "Two words - bien + sûr",
        expectedAnswer: "bien sûr",
      },

      // SECTION 10: Modifiers - tout, même, mal (5 questions)
      {
        instruction: "Translate to French",
        prompt: "everyone",
        hint: "Fixed expression - tout le monde",
        expectedAnswer: "tout le monde",
      },
      {
        instruction: "Translate to French",
        prompt: "even me",
        hint: "même + moi",
        expectedAnswer: "même moi",
      },
      {
        instruction: "Translate to French",
        prompt: "the same thing",
        hint: "la même + ...",
        expectedAnswer: "la même chose",
        acceptableAnswers: ["la meme chose"],
      },
      {
        instruction: "Translate to French",
        prompt: "I understand poorly",
        hint: "je comprends + mal (adverb after verb)",
        expectedAnswer: "je comprends mal",
      },
      {
        instruction: "Translate to French",
        prompt: "I know everything",
        hint: "je sais + tout (pronoun)",
        expectedAnswer: "je sais tout",
      },

      // SECTION 11: Integrated sentences (8 questions)
      {
        instruction: "Translate to French",
        prompt: "We study, so we learn",
        hint: "on étudie + donc + on apprend",
        expectedAnswer: "on étudie, donc on apprend",
        acceptableAnswers: [
          "on etudie donc on apprend",
          "on étudie donc on apprend",
        ],
      },
      {
        instruction: "Translate to French",
        prompt: "I think that everyone can learn",
        hint: "je pense que + tout le monde peut apprendre",
        expectedAnswer: "je pense que tout le monde peut apprendre",
      },
      {
        instruction: "Translate to French",
        prompt: "Actually, I don't know the answer",
        hint: "En fait + comma + je ne sais pas la réponse",
        expectedAnswer: "en fait, je ne sais pas la réponse",
        acceptableAnswers: ["en fait je ne sais pas la reponse"],
      },
      {
        instruction: "Translate to French",
        prompt: "I know Marie but I don't know Paris",
        hint: "je connais + Marie + mais + je ne connais pas + Paris",
        expectedAnswer: "je connais Marie mais je ne connais pas Paris",
      },
      {
        instruction: "Translate to French",
        prompt: "Do you understand the question? (informal)",
        hint: "tu comprends + la question?",
        expectedAnswer: "tu comprends la question",
      },
      {
        instruction: "Translate to French",
        prompt: "I believe that we can learn",
        hint: "je crois que + on peut apprendre",
        expectedAnswer: "je crois qu'on peut apprendre",
        acceptableAnswers: ["je crois que on peut apprendre"],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm studying French at university",
        hint: "j'étudie + le français + à l'université",
        expectedAnswer: "j'étudie le français à l'université",
        acceptableAnswers: ["j etudie le francais a l universite"],
      },
      {
        instruction: "Translate to French",
        prompt: "I'm reviewing my lessons because I have an exam",
        hint: "je révise mes leçons + parce que + j'ai un examen",
        expectedAnswer: "je révise mes leçons parce que j'ai un examen",
        acceptableAnswers: ["je revise mes lecons parce que j ai un examen"],
      },
    ],
  },
};
