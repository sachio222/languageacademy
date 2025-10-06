/**
 * Module: Studying Verbs - étudier & réviser
 * Unit 7 - Knowledge & Learning theme
 * Academic context completion
 */

export const studyingVerbsModule = {
  title: "Studying & Reviewing - étudier & réviser",
  description:
    "Express studying: j'étudie le français (I'm studying French), je révise mes leçons (I'm reviewing my lessons)",

  concepts: [
    {
      term: "étudier = to study",
      definition: "Regular -ER verb - easy! Essential for academic contexts",
      example:
        "j'étudie à l'université (I study at university), j'étudie le français (I'm studying French)",
    },
    {
      term: "réviser = to review / to revise",
      definition: "Regular -ER verb - going over material you've learned",
      example:
        "je révise mes leçons (I'm reviewing my lessons), je révise pour l'examen (I'm reviewing for the exam)",
    },
    {
      term: "Study workflow",
      definition:
        "Natural progression: study → learn → understand → review → know",
      example: "j'étudie → j'apprends → je comprends → je révise → je sais",
    },
    {
      term: "étudier vs apprendre",
      definition:
        "étudier = the act of studying (action), apprendre = acquiring knowledge (result)",
      example:
        "j'étudie pendant 2 heures (I study for 2 hours - action), j'apprends beaucoup (I learn a lot - result)",
    },
    {
      term: "Complete learning narrative",
      definition:
        "Now you can describe your entire learning journey in French!",
      example:
        "J'étudie → j'apprends → je comprends → je révise → je sais → je pense → je crois (I study → learn → understand → review → know → think → believe)",
    },
  ],

  vocabularyReference: [
    {
      french: "étudier",
      english: "to study",
      note: "infinitive - regular -ER verb",
    },
    {
      french: "j'étudie",
      english: "I study / I'm studying",
      note: "pronounced 'ay-tu-dee'",
    },
    {
      french: "tu étudies",
      english: "you study (informal)",
      note: "asking about studies",
    },
    {
      french: "il/elle étudie",
      english: "he/she studies",
      note: "third person studying",
    },
    {
      french: "nous étudions",
      english: "we study",
      note: "group studying",
    },
    {
      french: "vous étudiez",
      english: "you study (formal/plural)",
      note: "polite form",
    },
    {
      french: "ils/elles étudient",
      english: "they study",
      note: "silent -ent ending",
    },
    {
      french: "réviser",
      english: "to review / to revise",
      note: "infinitive - regular -ER verb",
    },
    {
      french: "je révise",
      english: "I review / I'm reviewing",
      note: "going over material",
    },
    {
      french: "tu révises",
      english: "you review (informal)",
      note: "asking about review",
    },
    {
      french: "il/elle révise",
      english: "he/she reviews",
      note: "reviewing lessons",
    },
    {
      french: "nous révisons",
      english: "we review",
      note: "studying together",
    },
    {
      french: "vous révisez",
      english: "you review (formal/plural)",
      note: "polite form",
    },
    {
      french: "ils/elles révisent",
      english: "they review",
      note: "silent -ent ending",
    },
    {
      french: "j'étudie le français",
      english: "I'm studying French",
      note: "⭐ your current activity!",
    },
    {
      french: "je révise mes leçons",
      english: "I'm reviewing my lessons",
      note: "⭐ what you do before exams!",
    },
  ],

  exercises: [
    {
      id: "studying-verbs.1",
      instruction: "Say 'I'm studying French'",
      prompt: "I'm studying French",
      hint: "étudier for je + le français",
      expectedAnswer: "j'étudie le français",
      wrongAnswers: [
        {
          answer: "j'apprends le français",
          feedback:
            "That's 'I'm learning French' - use 'j'étudie' for the act of studying!",
        },
      ],
    },
    {
      id: "studying-verbs.2",
      instruction: "Say 'I'm reviewing my lessons'",
      prompt: "I'm reviewing my lessons",
      hint: "réviser for je + mes leçons",
      expectedAnswer: "je révise mes leçons",
      wrongAnswers: [],
    },
    {
      id: "studying-verbs.3",
      instruction: "Say 'You study at university'",
      prompt: "You study at university (informal)",
      hint: "étudier for tu + à l'université",
      expectedAnswer: "tu étudies à l'université",
      wrongAnswers: [],
    },
    {
      id: "studying-verbs.4",
      instruction: "Say 'She reviews for the exam'",
      prompt: "She reviews for the exam",
      hint: "réviser for elle + pour l'examen",
      expectedAnswer: "elle révise pour l'examen",
      wrongAnswers: [],
    },
    {
      id: "studying-verbs.5",
      instruction: "Say 'We study together'",
      prompt: "We study together",
      hint: "étudier for nous + ensemble",
      expectedAnswer: "nous étudions ensemble",
      wrongAnswers: [],
    },
    {
      id: "studying-verbs.6",
      instruction: "Say 'They are reviewing'",
      prompt: "They are reviewing",
      hint: "réviser for ils",
      expectedAnswer: "ils révisent",
      wrongAnswers: [],
    },
  ],
};
