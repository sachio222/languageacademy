/**
 * Unit 9 Practice - Fill in the blank exercise
 * Typeform-style interactive sentence completion covering Unit 9 material
 * Covers: causal words, spatial prepositions, passé composé, imparfait, PC vs IMP
 */

export const unit9Practice = {
  moduleKey: "2024-06-10-unit-9-practice", // Permanent identifier - never changes
  title: "Unit 9 Practice - Fill in the Blanks",
  description:
    "Complete sentences using causal words, spatial prepositions, and past tenses from Unit 9!",

  // Special flags - REQUIRED for fill-in-blank modules
  isFillInTheBlank: true,
  skipStudyMode: true,

  // Leave empty - not used for fill-in-blank
  concepts: [
    {
      term: "Past Tense Practice",
      definition:
        "Interactive exercises to master the complex French past tense system and discourse markers",
      example:
        "Practice j'étais, tu étais, il était, j'avais, nous avions, alors, donc, en fait, d'ailleurs, je crois, il semble",
    },
    {
      term: "Imparfait Mastery",
      definition:
        "Build fluency with the imperfect tense through varied past contexts",
      example:
        "j'étais (I was) + tu étais (you were) + il était (he was) + j'avais (I had) + nous avions (we had) in narrative contexts",
    },
    {
      term: "Discourse Integration",
      definition:
        "Learn to use discourse markers naturally in past tense narratives and opinions",
      example:
        "alors (so) + donc (therefore) + en fait (actually) + d'ailleurs (besides) + je crois (I believe) + il semble (it seems)",
    },
  ],
  vocabularyReference: [],
  exercises: [],

  sentences: [
    // Causal words
    {
      text: "Je suis en retard  j'ai raté le bus.",
      instruction: "Complete: 'I'm late because I missed the bus'",
      blanks: [
        {
          position: 18,
          answer: "parce que",
          hint: "because (most common)",
        },
      ],
    },
    {
      text: "Il est fatigué  du travail.",
      instruction: "Complete: 'He's tired because of work'",
      blanks: [
        {
          position: 15,
          answer: "à cause de",
          hint: "because of (negative reason)",
        },
      ],
    },
    {
      text: " à toi, j'ai réussi.",
      instruction: "Complete: 'Thanks to you, I succeeded'",
      blanks: [
        {
          position: 0,
          answer: "grâce à",
          hint: "thanks to (positive reason)",
        },
      ],
    },

    // Spatial prepositions
    {
      text: "La banque est  de l'école.",
      instruction: "Complete: 'The bank is in front of the school'",
      blanks: [
        {
          position: 14,
          answer: "devant",
          hint: "in front of",
        },
      ],
    },
    {
      text: "Le chat est  les deux chaises.",
      instruction: "Complete: 'The cat is between the two chairs'",
      blanks: [
        {
          position: 12,
          answer: "entre",
          hint: "between",
        },
      ],
    },
    {
      text: "Elle habite  du parc.",
      instruction: "Complete: 'She lives near the park'",
      blanks: [
        {
          position: 12,
          answer: "près",
          hint: "near / close to",
        },
      ],
    },

    // Passé composé - avoir verbs
    {
      text: "Hier, j'  un livre.",
      instruction: "Complete: 'Yesterday, I read a book'",
      blanks: [
        {
          position: 8,
          answer: "ai lu",
          hint: "passé composé of lire (to read)",
        },
      ],
    },
    {
      text: "Tu  ton travail?",
      instruction: "Complete: 'Did you finish your work?'",
      blanks: [
        {
          position: 3,
          answer: "as fini",
          hint: "passé composé of finir (to finish)",
        },
      ],
    },
    {
      text: "Nous  au restaurant.",
      instruction: "Complete: 'We ate at the restaurant'",
      blanks: [
        {
          position: 5,
          answer: "avons mangé",
          hint: "passé composé of manger (to eat)",
        },
      ],
    },

    // Passé composé - être verbs
    {
      text: "Elle  à Paris.",
      instruction: "Complete: 'She went to Paris'",
      blanks: [
        {
          position: 5,
          answer: "est allée",
          hint: "passé composé of aller - feminine agreement",
        },
      ],
    },
    {
      text: "Ils  de France.",
      instruction: "Complete: 'They came from France'",
      blanks: [
        {
          position: 4,
          answer: "sont venus",
          hint: "passé composé of venir - masculine plural",
        },
      ],
    },
    {
      text: "Je  à 8 heures.",
      instruction: "Complete: 'I left at 8 o'clock'",
      blanks: [
        {
          position: 3,
          answer: "suis parti",
          hint: "passé composé of partir",
        },
      ],
    },

    // Imparfait
    {
      text: "Quand j'étais petit, je  beaucoup.",
      instruction: "Complete: 'When I was little, I used to play a lot'",
      blanks: [
        {
          position: 23,
          answer: "jouais",
          hint: "imparfait of jouer (to play)",
        },
      ],
    },
    {
      text: "Il  beau hier.",
      instruction: "Complete: 'The weather was nice yesterday'",
      blanks: [
        {
          position: 3,
          answer: "faisait",
          hint: "imparfait of faire - weather expression",
        },
      ],
    },
    {
      text: "Nous  en France chaque été.",
      instruction: "Complete: 'We used to go to France every summer'",
      blanks: [
        {
          position: 5,
          answer: "allions",
          hint: "imparfait of aller (repeated action)",
        },
      ],
    },

    // PC vs Imparfait - The key distinction
    {
      text: "Je  quand tu .",
      instruction: "Complete: 'I was reading when you arrived'",
      blanks: [
        {
          position: 3,
          answer: "lisais",
          hint: "imparfait - ongoing action",
        },
        {
          position: 17,
          answer: "es arrivé",
          hint: "passé composé - completed action",
        },
      ],
    },
    {
      text: "Il  tous les jours, mais hier il .",
      instruction:
        "Complete: 'He used to run every day, but yesterday he walked'",
      blanks: [
        {
          position: 3,
          answer: "courait",
          hint: "imparfait - habitual action",
        },
        {
          position: 35,
          answer: "a marché",
          hint: "passé composé - specific completed action",
        },
      ],
    },

    // Complex narrative
    {
      text: "Pendant que je , j'  un bruit.",
      instruction: "Complete: 'While I was cooking, I heard a noise'",
      blanks: [
        {
          position: 15,
          answer: "cuisinais",
          hint: "imparfait - ongoing background action",
        },
        {
          position: 27,
          answer: "ai entendu",
          hint: "passé composé - sudden event",
        },
      ],
    },
    {
      text: " il pleuvait, nous  à la maison.",
      instruction: "Complete: 'Since it was raining, we stayed home'",
      blanks: [
        {
          position: 0,
          answer: "comme",
          hint: "since/as (causal connector)",
        },
        {
          position: 25,
          answer: "sommes restés",
          hint: "passé composé of rester (être verb)",
        },
      ],
    },

    // Advanced spatial + past tense
    {
      text: "Le livre était  la table quand je l' .",
      instruction: "Complete: 'The book was on the table when I saw it'",
      blanks: [
        {
          position: 15,
          answer: "sur",
          hint: "on (spatial preposition)",
        },
        {
          position: 36,
          answer: "ai vu",
          hint: "passé composé of voir",
        },
      ],
    },
    {
      text: "Elle  derrière l'arbre  personne ne la voie.",
      instruction:
        "Complete: 'She hid behind the tree so that nobody would see her'",
      blanks: [
        {
          position: 5,
          answer: "s'est cachée",
          hint: "passé composé of se cacher (reflexive)",
        },
        {
          position: 33,
          answer: "pour que",
          hint: "so that (purpose)",
        },
      ],
    },
  ],
};
