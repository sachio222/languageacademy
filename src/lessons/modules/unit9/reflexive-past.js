/**
 * Module: Reflexive Verbs in Past Tense
 * Unit 8 - Daily Life & Actions
 * Combines reflexive verbs + être (always!) + past participle agreement
 */

export const reflexivePastModule = {
  moduleKey: "2024-06-07-reflexive-past", // Permanent identifier - never changes
  title: "Reflexive Verbs in Past Tense",
  description:
    "Tell stories about your routine in the past: je me suis réveillé(e) (I woke up), elle s'est levée (she got up)",

  concepts: [
    {
      term: "Reflexive Verbs ALWAYS use être in Past",
      definition:
        "CRITICAL: ALL reflexive verbs use être (never avoir) in passé composé",
      example:
        "je me suis lavé (I washed myself - uses être), elle s'est levée (she got up - uses être)",
    },
    {
      term: "Agreement with Subject",
      definition:
        "Past participle agrees with the subject (like all être verbs)",
      example:
        "je me suis réveillé (masc), je me suis réveillée (fem), ils se sont levés (masc pl), elles se sont levées (fem pl)",
    },
    {
      term: "Pronoun Position",
      definition: "Reflexive pronoun stays BEFORE the auxiliary être",
      example:
        "je me suis levé (not je suis me levé), tu t'es lavé (not tu es te lavé)",
    },
    {
      term: "Telling Past Routines",
      definition: "Now you can describe what you did this morning!",
      example:
        "Ce matin, je me suis réveillé à 7h. Ensuite, je me suis levé. Après, je me suis lavé.",
    },
  ],

  vocabularyReference: [
    {
      french: "je me suis réveillé",
      english: "I woke up (masc)",
      note: "⭐ passé composé with être",
    },
    {
      french: "je me suis réveillée",
      english: "I woke up (fem)",
      note: "add -e for feminine",
    },
    {
      french: "tu t'es levé",
      english: "you got up (masc)",
      note: "informal past",
    },
    {
      french: "il s'est lavé",
      english: "he washed himself",
      note: "third person past",
    },
    {
      french: "elle s'est levée",
      english: "she got up",
      note: "⭐ feminine agreement -ée",
    },
    {
      french: "nous nous sommes préparés",
      english: "we got ready",
      note: "plural agreement",
    },
    {
      french: "ils se sont amusés",
      english: "they had fun (masc)",
      note: "plural masculine -és",
    },
    {
      french: "elles se sont amusées",
      english: "they had fun (fem)",
      note: "feminine plural -ées",
    },
  ],

  exercises: [
    {
      id: "reflex-past.1",
      instruction: "Say 'I woke up' (no gender specified)",
      prompt: "I woke up",
      hint: "je me suis + réveillé",
      expectedAnswer: "je me suis réveillé",
      acceptableAnswers: ["je me suis reveille", "je me suis réveillée"],
      wrongAnswers: [
        {
          answer: "j'ai réveillé",
          feedback: "Reflexive verbs use être, not avoir! je me suis réveillé",
        },
      ],
    },
    {
      id: "reflex-past.2",
      instruction: "Say 'She got up'",
      prompt: "She got up",
      hint: "elle s'est + levée (feminine agreement!)",
      expectedAnswer: "elle s'est levée",
      acceptableAnswers: ["elle s est levee"],
      wrongAnswers: [
        {
          answer: "elle s'est levé",
          feedback: "Add -e for feminine: elle s'est levée",
        },
      ],
    },
    {
      id: "reflex-past.3",
      instruction: "Say 'He washed himself'",
      prompt: "He washed himself",
      hint: "il s'est + lavé",
      expectedAnswer: "il s'est lavé",
      acceptableAnswers: ["il s est lave"],
      wrongAnswers: [],
    },
    {
      id: "reflex-past.4",
      instruction: "Say 'We had fun' (using on)",
      prompt: "We had fun",
      hint: "on s'est + amusé",
      expectedAnswer: "on s'est amusé",
      acceptableAnswers: ["on s est amuse"],
      wrongAnswers: [],
    },
    {
      id: "reflex-past.5",
      instruction: "Say 'They got dressed' (masculine)",
      prompt: "They got dressed (masculine)",
      hint: "ils se sont + habillés (plural agreement!)",
      expectedAnswer: "ils se sont habillés",
      acceptableAnswers: ["ils se sont habilles"],
      wrongAnswers: [],
    },
  ],
};
