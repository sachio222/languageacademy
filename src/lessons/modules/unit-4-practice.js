/**
 * Unit 4 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 4 material
 */

export const unit4Practice = {
  title: "Unit 4 Practice - Fill in the Blanks",
  description:
    "Practice survival phrases, negation, time/location adverbs, and essential verbs from Unit 4!",

  // Special flags
  isFillInTheBlank: true,
  skipStudyMode: true,

  concepts: [],
  vocabularyReference: [],

  // Sentences with blanks to fill in
  sentences: [
    // Survival phrase - je voudrais
    {
      text: "  un café, s'il vous plaît.",
      instruction: "Complete: 'I would like a coffee, please'",
      blanks: [
        {
          position: 0,
          answer: "je voudrais",
          hint: "polite phrase for 'I would like'",
        },
      ],
    },

    // Faire - je
    {
      text: "Je  le travail.",
      instruction: "Complete: 'I do the work'",
      blanks: [
        {
          position: 3,
          answer: "fais",
          hint: "faire conjugated for je",
        },
      ],
    },

    // Devoir - tu
    {
      text: "Tu  partir.",
      instruction: "Complete: 'You must leave'",
      blanks: [
        {
          position: 3,
          answer: "dois",
          hint: "devoir conjugated for tu",
        },
      ],
    },

    // Parler - nous
    {
      text: "Nous  français.",
      instruction: "Complete: 'We speak French'",
      blanks: [
        {
          position: 5,
          answer: "parlons",
          hint: "parler conjugated for nous",
        },
      ],
    },

    // Negation - ne...pas
    {
      text: "Je  veux  ça.",
      instruction: "Complete: 'I don't want that'",
      blanks: [
        {
          position: 3,
          answer: "ne",
          hint: "first part of negation",
        },
        {
          position: 9,
          answer: "pas",
          hint: "second part of negation",
        },
      ],
    },

    // Time adverb - maintenant
    {
      text: "Je vais  .",
      instruction: "Complete: 'I'm going now'",
      blanks: [
        {
          position: 8,
          answer: "maintenant",
          hint: "time adverb meaning 'now'",
        },
      ],
    },

    // Time adverb - demain
    {
      text: "Il part .",
      instruction: "Complete: 'He leaves tomorrow'",
      blanks: [
        {
          position: 8,
          answer: "demain",
          hint: "time adverb meaning 'tomorrow'",
        },
      ],
    },

    // Time adverb - hier
    {
      text: "Tu as vu ça .",
      instruction: "Complete: 'You saw that yesterday'",
      blanks: [
        {
          position: 13,
          answer: "hier",
          hint: "time adverb meaning 'yesterday'",
        },
      ],
    },

    // Location adverb - ici
    {
      text: "Je suis .",
      instruction: "Complete: 'I am here'",
      blanks: [
        {
          position: 8,
          answer: "ici",
          hint: "location adverb meaning 'here'",
        },
      ],
    },

    // Location adverb - là
    {
      text: "Le livre est .",
      instruction: "Complete: 'The book is there'",
      blanks: [
        {
          position: 13,
          answer: "là",
          hint: "location adverb meaning 'there'",
        },
      ],
    },

    // Everyday noun - le temps
    {
      text: "Je n'ai pas  .",
      instruction: "Complete: 'I don't have time'",
      blanks: [
        {
          position: 12,
          answer: "le temps",
          hint: "everyday noun meaning 'time'",
        },
      ],
    },

    // Everyday noun - l'argent
    {
      text: "Il a  .",
      instruction: "Complete: 'He has money'",
      blanks: [
        {
          position: 5,
          answer: "l'argent",
          hint: "everyday noun meaning 'money'",
        },
      ],
    },

    // Multiple blanks: faire + negation
    {
      text: "Tu   fais  ça.",
      instruction: "Complete: 'You don't do that'",
      blanks: [
        {
          position: 3,
          answer: "ne",
          hint: "first part of negation",
        },
        {
          position: 10,
          answer: "pas",
          hint: "second part of negation",
        },
      ],
    },

    // Multiple blanks: devoir + time adverb
    {
      text: "Je  partir  .",
      instruction: "Complete: 'I must leave now'",
      blanks: [
        {
          position: 3,
          answer: "dois",
          hint: "devoir conjugated for je",
        },
        {
          position: 11,
          answer: "maintenant",
          hint: "time adverb meaning 'now'",
        },
      ],
    },

    // Multiple blanks: parler + location adverb
    {
      text: "Nous  français  .",
      instruction: "Complete: 'We speak French here'",
      blanks: [
        {
          position: 5,
          answer: "parlons",
          hint: "parler conjugated for nous",
        },
        {
          position: 22,
          answer: "ici",
          hint: "location adverb meaning 'here'",
        },
      ],
    },

    // Multiple blanks: negation with jamais
    {
      text: "Il  va  à Paris.",
      instruction: "Complete: 'He never goes to Paris'",
      blanks: [
        {
          position: 3,
          answer: "ne",
          hint: "first part of negation",
        },
        {
          position: 7,
          answer: "jamais",
          hint: "time adverb meaning 'never' (replaces pas)",
        },
      ],
    },

    // Multiple blanks: pouvoir + negation
    {
      text: "Je  peux  voir ça.",
      instruction: "Complete: 'I can't see that'",
      blanks: [
        {
          position: 3,
          answer: "ne",
          hint: "first part of negation",
        },
        {
          position: 9,
          answer: "pas",
          hint: "second part of negation",
        },
      ],
    },

    // Complex: survival phrase + noun
    {
      text: " , s'il vous plaît ?",
      instruction: "Complete: 'How much is it, please?'",
      blanks: [
        {
          position: 0,
          answer: "c'est combien",
          hint: "survival phrase for 'how much is it'",
        },
      ],
    },

    // Complex: faire + everyday noun + time
    {
      text: "Je  mon travail  .",
      instruction: "Complete: 'I do my work tomorrow'",
      blanks: [
        {
          position: 3,
          answer: "fais",
          hint: "faire conjugated for je",
        },
        {
          position: 17,
          answer: "demain",
          hint: "time adverb meaning 'tomorrow'",
        },
      ],
    },

    // Complex: negation + everyday noun + location
    {
      text: "Nous  avons  l'argent  .",
      instruction: "Complete: 'We don't have the money here'",
      blanks: [
        {
          position: 5,
          answer: "n'",
          hint: "ne with apostrophe before vowel",
        },
        {
          position: 12,
          answer: "pas",
          hint: "second part of negation",
        },
        {
          position: 23,
          answer: "ici",
          hint: "location adverb meaning 'here'",
        },
      ],
    },
  ],

  // Empty exercises array - not used for fill-in-blank
  exercises: [],
};
