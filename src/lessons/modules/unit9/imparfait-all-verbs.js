/**
 * Module: Dynamic ID (auto-assigned)9: Imparfait Formation - All Verbs (Beyond être/avoir)
 * Unit 9 - Expand imparfait to all verbs using the nous stem rule
 * For descriptions, habits, and ongoing actions in the past
 */

export const imparfaitAllVerbsModule = {
  moduleKey: "2024-05-27-imparfait-all-verbs", // Permanent identifier - never changes
  title: "Imparfait Formation - All Verbs (was doing, used to do)",
  description:
    "Learn to form imparfait for ALL verbs using the 'nous stem' rule: je parlais (I was speaking/used to speak), il faisait beau (it was nice), on allait (we used to go)",
  unit: 9,

  concepts: [
    {
      term: "The Golden Rule: nous stem + -ais endings",
      definition:
        "Take 'nous' form of present tense, remove -ons, add -ais endings to ALL verbs (except être)",
      example:
        "parler: nous parlons → parl- → je parlais, tu parlais, il parlait",
    },
    {
      term: "Step 1: Find the nous form",
      definition: "Take the present tense 'nous' form of the verb",
      example:
        "parler → nous parlons, faire → nous faisons, aller → nous allons",
    },
    {
      term: "Step 2: Remove -ons",
      definition: "Drop the -ons ending to get the stem",
      example: "nous parlons → parl-, nous faisons → fais-, nous allons → all-",
    },
    {
      term: "Step 3: Add imparfait endings",
      definition:
        "Add: -ais, -ais, -ait, -ions, -iez, -aient (same for ALL verbs!)",
      example:
        "parl- → je parlais, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient",
    },
    {
      term: "ONE EXCEPTION: être",
      definition:
        "être is irregular: ét- stem (not nous sommes) → j'étais, tu étais...",
      example:
        "j'étais, tu étais, il était, nous étions, vous étiez, ils étaient",
    },
    {
      term: "When to use Imparfait",
      definition:
        "Descriptions, habits/repeated actions, ongoing states in past, background/scene-setting",
      example:
        "Il faisait beau (it was nice - description), Je parlais français tous les jours (I spoke French every day - habit)",
    },
  ],

  vocabularyReference: [
    {
      french: "je parlais",
      english: "I was speaking / I used to speak",
      note: "⭐ regular -ER verb imparfait",
    },
    {
      french: "il faisait",
      english: "it was (weather) / he was doing",
      note: "⭐ very common - weather + actions",
    },
    {
      french: "on allait",
      english: "we were going / we used to go",
      note: "⭐ common - habitual actions",
    },
    {
      french: "je voulais",
      english: "I wanted / I was wanting",
      note: "vouloir in imparfait",
    },
    {
      french: "il y avait",
      english: "there was / there were",
      note: "⭐ very common - description",
    },
    {
      french: "je prenais",
      english: "I was taking / I used to take",
      note: "prendre in imparfait",
    },
    {
      french: "nous étions",
      english: "we were",
      note: "être in imparfait (irregular stem)",
    },
    {
      french: "tous les jours",
      english: "every day",
      note: "⭐ signals habitual action (imparfait)",
    },
    {
      french: "chaque",
      english: "each, every",
      note: "signals repetition - use with singular",
      example: "chaque jour, chaque samedi",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ français tous les jours (I used to speak French every day) - Use 'parler' in imparfait",
      answer: "parlais",
      wrongAnswers: [
        {
          answer: "ai parlé",
          feedback:
            "That's passé composé! Use imparfait for habits: je parlais (I used to speak).",
        },
        {
          answer: "parle",
          feedback:
            "That's present tense! Use imparfait: je parlais (I was speaking/used to speak).",
        },
        {
          answer: "parlions",
          feedback:
            "That's 'nous' form! Use 'je' form: je parlais (not parlions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il ___ beau (It was nice [weather]) - Use 'faire' in imparfait",
      answer: "faisait",
      wrongAnswers: [
        {
          answer: "a fait",
          feedback:
            "That's passé composé! Use imparfait for description: il faisait beau.",
        },
        {
          answer: "fait",
          feedback: "That's present tense! Use imparfait: il faisait (it was).",
        },
        {
          answer: "faisions",
          feedback:
            "That's 'nous' form! Use 'il' form: il faisait (not faisions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ au café chaque samedi (We used to go to the café every Saturday) - Use 'aller' in imparfait",
      answer: "allait",
      wrongAnswers: [
        {
          answer: "est allé",
          feedback:
            "That's passé composé! Use imparfait for habits: on allait (we used to go).",
        },
        {
          answer: "va",
          feedback:
            "That's present tense! Use imparfait: on allait (we used to go).",
        },
        {
          answer: "allions",
          feedback:
            "On uses il/elle form! Use 'on allait', not 'allions' (which is nous).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ partir (I wanted to leave) - Use 'vouloir' in imparfait",
      answer: "voulais",
      wrongAnswers: [
        {
          answer: "ai voulu",
          feedback:
            "That's passé composé! Use imparfait for ongoing desire: je voulais.",
        },
        {
          answer: "veux",
          feedback:
            "That's present tense! Use imparfait: je voulais (I wanted).",
        },
        {
          answer: "voulions",
          feedback:
            "That's 'nous' form! Use 'je' form: je voulais (not voulions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y ___ beaucoup de gens (There were many people) - Use 'avoir' in imparfait",
      answer: "avait",
      wrongAnswers: [
        {
          answer: "a eu",
          feedback:
            "That's passé composé! Use imparfait for description: il y avait.",
        },
        {
          answer: "a",
          feedback:
            "That's present tense! Use imparfait: il y avait (there were).",
        },
        {
          answer: "avions",
          feedback:
            "'Il y a' uses singular form! Use 'il y avait', not 'avions'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ le bus tous les jours (I used to take the bus every day) - Use 'prendre' in imparfait",
      answer: "prenais",
      wrongAnswers: [
        {
          answer: "ai pris",
          feedback:
            "That's passé composé! Use imparfait for habits: je prenais.",
        },
        {
          answer: "prends",
          feedback:
            "That's present tense! Use imparfait: je prenais (I used to take).",
        },
        {
          answer: "prenions",
          feedback:
            "That's 'nous' form! Use 'je' form: je prenais (not prenions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ contents (We were happy) - Use 'être' in imparfait",
      answer: "étions",
      wrongAnswers: [
        {
          answer: "avons été",
          feedback:
            "That's passé composé! Use imparfait for state: nous étions.",
        },
        {
          answer: "sommes",
          feedback:
            "That's present tense! Use imparfait: nous étions (we were).",
        },
        {
          answer: "étais",
          feedback:
            "That's 'je' form! Use 'nous' form: nous étions (not étais).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu ___ où? (Where were you? / Where did you use to live?) - Use 'être' in imparfait",
      answer: "étais",
      wrongAnswers: [
        {
          answer: "as été",
          feedback:
            "That's passé composé! Use imparfait for state: tu étais où?",
        },
        {
          answer: "es",
          feedback: "That's present tense! Use imparfait: tu étais (you were).",
        },
        {
          answer: "était",
          feedback: "That's il/elle form! Use 'tu' form: tu étais (not était).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ français à l'école (She used to study French at school) - Use 'étudier' in imparfait",
      answer: "étudiait",
      wrongAnswers: [
        {
          answer: "a étudié",
          feedback:
            "That's passé composé! Use imparfait for habits: elle étudiait.",
        },
        {
          answer: "étudie",
          feedback:
            "That's present tense! Use imparfait: elle étudiait (she used to study).",
        },
        {
          answer: "étudiions",
          feedback:
            "That's 'nous' form! Use 'elle' form: elle étudiait (not étudiions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ au parc (They used to go to the park / They were going to the park) - Use 'aller' in imparfait",
      answer: "allaient",
      wrongAnswers: [
        {
          answer: "sont allés",
          feedback:
            "That's passé composé! Use imparfait for habits: ils allaient.",
        },
        {
          answer: "vont",
          feedback:
            "That's present tense! Use imparfait: ils allaient (they used to go).",
        },
        {
          answer: "allions",
          feedback:
            "That's 'nous' form! Use 'ils' form: ils allaient (not allions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Vous ___ du café? (Did you want coffee? / Were you wanting coffee?) - Use 'vouloir' in imparfait",
      answer: "vouliez",
      wrongAnswers: [
        {
          answer: "avez voulu",
          feedback:
            "That's passé composé! Use imparfait for ongoing state: vous vouliez.",
        },
        {
          answer: "voulez",
          feedback:
            "That's present tense! Use imparfait: vous vouliez (you wanted).",
        },
        {
          answer: "voulions",
          feedback:
            "That's 'nous' form! Use 'vous' form: vous vouliez (not voulions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ nos devoirs chaque soir (We used to do our homework each evening) - Use 'faire' in imparfait",
      answer: "faisait",
      wrongAnswers: [
        {
          answer: "a fait",
          feedback:
            "That's passé composé! Use imparfait for habits: on faisait.",
        },
        {
          answer: "fait",
          feedback:
            "That's present tense! Use imparfait: on faisait (we used to do).",
        },
        {
          answer: "faisions",
          feedback: "On uses il/elle form! Use 'on faisait', not 'faisions'.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je ___ au café quand tu m'as appelé (I was going to the café when you called me) - Use 'aller' in imparfait",
      answer: "allais",
      wrongAnswers: [
        {
          answer: "suis allé",
          feedback:
            "That's passé composé! Use imparfait for ongoing action: j'allais.",
        },
        {
          answer: "vais",
          feedback:
            "That's present tense! Use imparfait: j'allais (I was going).",
        },
        {
          answer: "allions",
          feedback:
            "That's 'nous' form! Use 'je' form: j'allais (not allions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Ils ___ dans un grand appartement (They used to live in a big apartment) - Use 'habiter' in imparfait",
      answer: "habitaient",
      wrongAnswers: [
        {
          answer: "ont habité",
          feedback:
            "That's passé composé! Use imparfait for ongoing past state: ils habitaient.",
        },
        {
          answer: "habitent",
          feedback:
            "That's present tense! Use imparfait: ils habitaient (they used to live).",
        },
        {
          answer: "habitions",
          feedback:
            "That's 'nous' form! Use 'ils' form: ils habitaient (not habitions).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Elle ___ beaucoup (She used to work a lot) - Use 'travailler' in imparfait",
      answer: "travaillait",
      wrongAnswers: [
        {
          answer: "a travaillé",
          feedback:
            "That's passé composé! Use imparfait for habits: elle travaillait.",
        },
        {
          answer: "travaille",
          feedback:
            "That's present tense! Use imparfait: elle travaillait (she used to work).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Quand j'___ jeune, je jouais au foot (When I was young, I used to play soccer) - Use 'être' in imparfait",
      answer: "étais",
      wrongAnswers: [
        {
          answer: "ai été",
          feedback:
            "That's passé composé! Use imparfait for description: j'étais jeune.",
        },
        {
          answer: "suis",
          feedback: "That's present tense! Use imparfait: j'étais (I was).",
        },
        {
          answer: "était",
          feedback: "That's il/elle form! Use 'je' form: j'étais (not était).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Nous ___ très fatigués (We were very tired) - Use 'être' in imparfait",
      answer: "étions",
      wrongAnswers: [
        {
          answer: "avons été",
          feedback:
            "That's passé composé! Use imparfait for state: nous étions fatigués.",
        },
        {
          answer: "sommes",
          feedback:
            "That's present tense! Use imparfait: nous étions (we were).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Tu ___ toujours en retard (You were always late) - Use 'être' in imparfait",
      answer: "étais",
      wrongAnswers: [
        {
          answer: "as été",
          feedback:
            "That's passé composé! Use imparfait for habit: tu étais toujours en retard.",
        },
        {
          answer: "es",
          feedback: "That's present tense! Use imparfait: tu étais (you were).",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Je ___ français tous les jours (I used to speak French every day)",
    "Il ___ beau (It was nice)",
    "On ___ au café chaque samedi (We used to go to the café every Saturday)",
    "Je ___ partir (I wanted to leave)",
    "Il y ___ beaucoup de gens (There were many people)",
    "Je ___ le bus tous les jours (I used to take the bus every day)",
    "Nous ___ contents (We were happy)",
    "Tu ___ où? (Where were you?)",
    "Elle ___ français (She used to study French)",
    "Ils ___ au parc (They used to go to the park)",
  ],
};
