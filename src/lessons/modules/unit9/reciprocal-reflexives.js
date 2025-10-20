/**
 * Module: Reciprocal Reflexives
 * Unit 8 - Daily Life & Actions
 * Using reflexive pronouns for "each other"
 */

export const reciprocalReflexivesModule = {
  moduleKey: "2024-06-06-reciprocal-reflexives", // Permanent identifier - never changes
  title: "Reciprocal Reflexives - Each Other",
  description:
    "Express mutual actions: nous nous aimons (we love each other), ils se parlent (they talk to each other), on se voit (we see each other)",

  concepts: [
    {
      term: "Reciprocal = Each Other",
      definition:
        "Plural reflexive pronouns can mean 'each other' - mutual action!",
      example:
        "nous nous aimons (we love each other), ils se regardent (they look at each other)",
    },
    {
      term: "Only with Plural Subjects",
      definition: "You need nous, vous, ils, elles, or on to have 'each other'",
      example:
        "nous nous parlons (we talk to each other), ils se connaissent (they know each other)",
    },
    {
      term: "Same Form, Different Meaning",
      definition:
        "The reflexive form is the same - context tells you if it's 'ourselves' or 'each other'",
      example:
        "nous nous préparons (we prepare ourselves OR we prepare each other - context!)",
    },
    {
      term: "Common Reciprocal Expressions",
      definition: "Very common in relationships and social contexts",
      example:
        "on se voit demain (we'll see each other tomorrow), ils se parlent (they talk to each other)",
    },
  ],

  vocabularyReference: [
    {
      french: "nous nous aimons",
      english: "we love each other",
      note: "⭐ reciprocal - mutual love",
    },
    {
      french: "nous nous parlons",
      english: "we talk to each other",
      note: "mutual conversation",
    },
    {
      french: "on se voit",
      english: "we see each other",
      note: "⭐ very common!",
    },
    {
      french: "on se voit demain",
      english: "we'll see each other tomorrow",
      note: "making plans",
    },
    {
      french: "ils se connaissent",
      english: "they know each other",
      note: "acquaintances",
    },
    {
      french: "ils se parlent",
      english: "they talk to each other",
      note: "communication",
    },
    {
      french: "vous vous comprenez",
      english: "you understand each other",
      note: "mutual understanding",
    },
  ],

  exercises: [
    {
      id: "reciprocal.1",
      instruction: "Say 'We love each other'",
      prompt: "We love each other",
      hint: "nous nous + aimer",
      expectedAnswer: "nous nous aimons",
      wrongAnswers: [],
    },
    {
      id: "reciprocal.2",
      instruction: "Say 'We see each other' (using on)",
      prompt: "We see each other",
      hint: "on se + voir",
      expectedAnswer: "on se voit",
      wrongAnswers: [],
    },
    {
      id: "reciprocal.3",
      instruction: "Say 'We'll see each other tomorrow' (using on)",
      prompt: "We'll see each other tomorrow",
      hint: "on se voit + demain",
      expectedAnswer: "on se voit demain",
      wrongAnswers: [],
    },
    {
      id: "reciprocal.4",
      instruction: "Say 'They talk to each other'",
      prompt: "They talk to each other",
      hint: "ils se + parler",
      expectedAnswer: "ils se parlent",
      wrongAnswers: [],
    },
    {
      id: "reciprocal.5",
      instruction: "Say 'They know each other'",
      prompt: "They know each other",
      hint: "ils se + connaître",
      expectedAnswer: "ils se connaissent",
      wrongAnswers: [],
    },
    {
      id: "reciprocal.6",
      instruction: "Say 'You understand each other' (formal/plural)",
      prompt: "You understand each other",
      hint: "vous vous + comprendre",
      expectedAnswer: "vous vous comprenez",
      wrongAnswers: [],
    },
  ],
};
