/**
 * Module: Learning Verbs - apprendre & enseigner
 * Unit 7 - Knowledge & Learning theme
 * Natural pair: learn ↔ teach
 */

export const learningVerbsModule = {
  title: "Learning & Teaching - apprendre & enseigner",
  description:
    "Express learning and teaching: j'apprends le français (I'm learning French), tu m'enseignes? (are you teaching me?)",

  concepts: [
    {
      term: "apprendre = to learn",
      definition:
        "Part of prendre family (you already know this pattern!) - essential for education",
      example:
        "j'apprends le français (I'm learning French), nous apprenons ensemble (we're learning together)",
    },
    {
      term: "Same pattern as prendre/comprendre",
      definition:
        "If you know prendre and comprendre, you know apprendre! Add ap- prefix",
      example:
        "je prends → j'apprends, tu comprends → tu apprends (same pattern!)",
    },
    {
      term: "enseigner = to teach",
      definition: "Regular -ER verb - easy! Natural pair with apprendre",
      example:
        "j'enseigne le français (I teach French), il m'enseigne (he teaches me)",
    },
    {
      term: "Beautiful semantic progression",
      definition:
        "Teacher teaches → student learns → student understands → student knows",
      example:
        "Il m'enseigne → j'apprends → je comprends → je sais (complete learning cycle!)",
    },
    {
      term: "apprendre à + infinitive",
      definition:
        "Use 'à' before infinitive to say learning how to do something",
      example:
        "j'apprends à nager (I'm learning to swim), j'apprends à parler français (I'm learning to speak French)",
    },
  ],

  vocabularyReference: [
    {
      french: "apprendre",
      english: "to learn",
      note: "infinitive - follows prendre pattern",
    },
    {
      french: "j'apprends",
      english: "I learn / I'm learning",
      note: "same pattern as je prends",
    },
    {
      french: "tu apprends",
      english: "you learn (informal)",
      note: "asking what someone is learning",
    },
    {
      french: "il/elle apprend",
      english: "he/she learns",
      note: "no final consonant sound",
    },
    {
      french: "nous apprenons",
      english: "we learn",
      note: "learning together",
    },
    {
      french: "vous apprenez",
      english: "you learn (formal/plural)",
      note: "polite form",
    },
    {
      french: "ils/elles apprennent",
      english: "they learn",
      note: "double n, silent -ent",
    },
    {
      french: "enseigner",
      english: "to teach",
      note: "infinitive - regular -ER verb",
    },
    {
      french: "j'enseigne",
      english: "I teach",
      note: "regular conjugation",
    },
    {
      french: "tu enseignes",
      english: "you teach (informal)",
      note: "regular -es ending",
    },
    {
      french: "il/elle enseigne",
      english: "he/she teaches",
      note: "teacher profession",
    },
    {
      french: "nous enseignons",
      english: "we teach",
      note: "team teaching",
    },
    {
      french: "vous enseignez",
      english: "you teach (formal/plural)",
      note: "polite form",
    },
    {
      french: "ils/elles enseignent",
      english: "they teach",
      note: "silent -ent ending",
    },
    {
      french: "j'apprends le français",
      english: "I'm learning French",
      note: "⭐ what you're doing right now!",
    },
  ],

  exercises: [
    {
      id: "learning-verbs.1",
      instruction: "Say 'I'm learning French'",
      prompt: "I'm learning French",
      hint: "apprendre conjugated for je + le français",
      expectedAnswer: "j'apprends le français",
      wrongAnswers: [
        {
          answer: "je prends le français",
          feedback: "Use 'apprendre' (to learn), not 'prendre' (to take)!",
        },
        {
          answer: "j'enseigne le français",
          feedback:
            "That means 'I teach French' - use 'j'apprends' for learning!",
        },
      ],
    },
    {
      id: "learning-verbs.2",
      instruction: "Say 'You teach me'",
      prompt: "You teach me (informal)",
      hint: "enseigner for tu + me (object pronoun)",
      expectedAnswer: "tu m'enseignes",
      wrongAnswers: [
        {
          answer: "tu m'apprends",
          feedback:
            "That means 'you learn me' (incorrect) - use 'enseigner' for teaching!",
        },
      ],
    },
    {
      id: "learning-verbs.3",
      instruction: "Say 'He learns English'",
      prompt: "He learns English",
      hint: "apprendre for il + l'anglais",
      expectedAnswer: "il apprend l'anglais",
      wrongAnswers: [],
    },
    {
      id: "learning-verbs.4",
      instruction: "Say 'She teaches French'",
      prompt: "She teaches French",
      hint: "enseigner for elle + le français",
      expectedAnswer: "elle enseigne le français",
      wrongAnswers: [],
    },
    {
      id: "learning-verbs.5",
      instruction: "Say 'We're learning together'",
      prompt: "We're learning together",
      hint: "apprendre for nous + ensemble",
      expectedAnswer: "nous apprenons ensemble",
      wrongAnswers: [],
    },
    {
      id: "learning-verbs.6",
      instruction: "Say 'They teach at university'",
      prompt: "They teach at university",
      hint: "enseigner for ils + à l'université",
      expectedAnswer: "ils enseignent à l'université",
      wrongAnswers: [],
    },
  ],
};
