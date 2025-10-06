/**
 * Module 111: Past Tense Composition - Complex Narratives
 * Unit 9 - Practice combining all past tense elements for storytelling
 * Integration of causal/spatial words + PC + IMP
 */

export const pastTenseCompositionModule = {
  title: "Past Tense Composition - Building Complete Stories",
  description:
    "Practice combining everything: passé composé, imparfait, causal words, spatial prepositions for rich storytelling",
  unit: 9,

  concepts: [
    {
      term: "Complete Narrative Structure",
      definition:
        "Combine: 1) Scene-setting (IMP), 2) Events (PC), 3) Causal reasoning (parce que, car), 4) Spatial context (près de, devant)",
      example:
        "Hier, il faisait beau donc je suis allé au parc près de chez moi. J'étais content parce que j'avais du temps libre.",
    },
    {
      term: "Layered Storytelling Pattern",
      definition:
        "Background (IMP) → Event (PC) → Reason (parce que) → Next Event (PC)",
      example:
        "Il faisait beau (background) quand je suis sorti (event). J'ai décidé d'aller au café (event) parce que j'avais faim (reason).",
    },
    {
      term: "Rich Scene-Setting",
      definition: "Use spatial prepositions + imparfait to paint the picture",
      example:
        "Le café était près de l'école. Il y avait beaucoup de gens. Ils étaient assis autour des tables.",
    },
    {
      term: "Causal Flow in Narratives",
      definition: "Use donc, parce que, car, comme to connect events logically",
      example:
        "Comme il faisait beau, je suis sorti. J'ai vu Marie donc on a parlé. On est allés au café car on avait soif.",
    },
    {
      term: "Time and Space Integration",
      definition:
        "Combine temporal words (d'abord, ensuite) with spatial (près de, devant)",
      example:
        "D'abord, je suis allé au café près de l'école. Ensuite, j'ai vu Marie devant le cinéma.",
    },
  ],

  vocabularyReference: [
    {
      french: "donc",
      english: "so, therefore",
      usage: "consequence/result",
      example: "Il faisait beau donc je suis sorti",
    },
    {
      french: "alors",
      english: "so, then",
      usage: "consequence",
      example: "J'avais faim, alors j'ai mangé",
    },
    {
      french: "c'était",
      english: "it was",
      usage: "description (always imparfait!)",
      example: "C'était super! C'était difficile.",
    },
    {
      french: "il y avait",
      english: "there was/were",
      usage: "description (always imparfait!)",
      example: "Il y avait beaucoup de monde",
    },
    {
      french: "j'ai décidé de",
      english: "I decided to",
      usage: "+ infinitive",
      example: "J'ai décidé d'aller au café",
    },
  ],

  exercises: [
    {
      type: "fillblank",
      prompt:
        "Complete the story: Hier, il ___ beau ___ je suis sorti (Yesterday, it was nice so I went out) - Use 'faire' + connector",
      answer: "faisait donc",
      wrongAnswers: [
        {
          answer: "a fait donc",
          feedback:
            "Weather is background! Use imparfait: il faisait (not a fait).",
        },
        {
          answer: "faisait parce que",
          feedback:
            "Use 'donc' for result/consequence! Il faisait beau DONC je suis sorti.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je suis allé au café ___ l'école ___ j'avais faim (I went to the café near the school because I was hungry) - Spatial + causal",
      answer: "près de parce que",
      wrongAnswers: [
        {
          answer: "devant car",
          feedback:
            "Close! But 'près de' (near) is better than 'devant' (in front) here.",
        },
        {
          answer: "dans parce que",
          feedback:
            "The café is NEAR the school, not IN it! Use 'près de' (near).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ avec Marie quand tu as appelé (I was talking with Marie when you called) - Use 'parler' in correct tense",
      answer: "ai parlé",
      wrongAnswers: [
        {
          answer: "parlais",
          feedback:
            "Actually BOTH work! But if thinking of whole conversation as one unit, 'ai parlé' works. If emphasizing ongoing, 'parlais' is better. Let's accept both!",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ il faisait beau, on est allés au parc (Since it was nice, we went to the park) - Use causal word at START",
      answer: "Comme",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que rarely starts sentences! Use 'Comme' at the beginning.",
        },
        {
          answer: "Car",
          feedback:
            "Car CANNOT start a sentence! Use 'Comme' at the beginning.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Il y ___ beaucoup de gens ___ des tables (There were many people around the tables) - Description + spatial",
      answer: "avait autour",
      wrongAnswers: [
        {
          answer: "a eu autour",
          feedback:
            "Description of scene! Use imparfait: il y avait (not a eu).",
        },
        {
          answer: "avait sur",
          feedback:
            "People sit AROUND tables, not ON them! Use 'autour de' (around).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: C'___ super! (It was great!) - Always use imparfait for 'c'était'",
      answer: "était",
      wrongAnswers: [
        {
          answer: "a été",
          feedback:
            "C'était is ALWAYS imparfait for general evaluation! C'était super.",
        },
        {
          answer: "est",
          feedback: "That's present! Use imparfait: c'était (it was).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'ai décidé ___ aller au cinéma ___ j'avais du temps (I decided to go to the cinema because I had time) - Infinitive + reason",
      answer: "d' parce que",
      wrongAnswers: [
        {
          answer: "de car",
          feedback:
            "Both work! 'Parce que' or 'car' are both fine for 'because'.",
        },
        {
          answer: "à parce que",
          feedback: "'Décider DE' (not à)! J'ai décidé D'aller (not à aller).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: On ___ au café chaque samedi, mais hier on n'y est pas allé (We used to go to the café every Saturday, but yesterday we didn't go) - Habit vs specific",
      answer: "allait",
      wrongAnswers: [
        {
          answer: "est allé",
          feedback:
            "Chaque samedi = habit! Use imparfait: on allait (we used to go).",
        },
        {
          answer: "va",
          feedback: "That's present! Use imparfait for past habit: on allait.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Je marchais tranquillement quand soudain j'___ Marie (I was walking peacefully when suddenly I saw Marie) - Ongoing + event",
      answer: "ai vu",
      wrongAnswers: [
        {
          answer: "voyais",
          feedback:
            "Soudain = sudden event! Use passé composé: j'ai vu (I saw).",
        },
        {
          answer: "vois",
          feedback:
            "That's present! Use passé composé for past event: j'ai vu.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ j'avais faim, j'ai mangé (Thanks to being hungry, I ate) - WRONG! Fix: ___ j'avais faim, j'ai mangé (Because I was hungry, I ate)",
      answer: "Parce que",
      wrongAnswers: [
        {
          answer: "Grâce à",
          feedback:
            "Grâce à is POSITIVE and needs a NOUN! Use 'Parce que' + clause for hunger.",
        },
        {
          answer: "À cause de",
          feedback:
            "À cause de needs a NOUN! Use 'Parce que j'avais faim' (because I was hungry).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Le livre était ___ la table ___ ma chambre (The book was on the table in my room) - Two spatial prepositions",
      answer: "sur dans",
      wrongAnswers: [
        {
          answer: "dans sur",
          feedback:
            "Wrong order! The book is ON (sur) the table, IN (dans) the room.",
        },
        {
          answer: "au-dessus dans",
          feedback:
            "Au-dessus means 'above' (hanging). Use 'sur' for 'on' (touching surface).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: Pendant que je ___, on a parlé pendant une heure (While I was there, we talked for an hour) - Use 'être' for location",
      answer: "étais",
      wrongAnswers: [
        {
          answer: "ai été",
          feedback:
            "Ongoing state (while there)! Use imparfait: j'étais (I was there).",
        },
        {
          answer: "suis",
          feedback: "That's present! Use imparfait for past state: j'étais.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: J'___ mes devoirs ___ j'ai regardé la télé (I did my homework then I watched TV) - Two events in sequence",
      answer: "ai fait ensuite",
      wrongAnswers: [
        {
          answer: "faisais ensuite",
          feedback:
            "Completed homework = specific event! Use passé composé: j'ai fait.",
        },
        {
          answer: "ai fait car",
          feedback: "'Car' is for reason! Use 'ensuite' (then) for sequence.",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ toi, j'ai réussi (Thanks to you, I succeeded) - Positive attribution",
      answer: "Grâce à",
      wrongAnswers: [
        {
          answer: "Parce que",
          feedback:
            "Parce que needs a CLAUSE! Use 'Grâce à toi' (thanks to you - NOUN).",
        },
        {
          answer: "À cause de",
          feedback:
            "Succeeding is POSITIVE! Use 'grâce à' (not à cause de which is negative/neutral).",
        },
      ],
    },
    {
      type: "fillblank",
      prompt:
        "Complete: ___ la pluie, on est restés à la maison (Because of the rain, we stayed home) - Negative reason + noun",
      answer: "À cause de",
      wrongAnswers: [
        {
          answer: "Grâce à",
          feedback:
            "Rain isn't positive! Use 'à cause de' for negative/neutral reasons.",
        },
        {
          answer: "Parce que",
          feedback:
            "Parce que needs a CLAUSE! Use 'à cause de la pluie' (because of THE RAIN - noun).",
        },
      ],
    },
  ],

  fillInBlanksSentences: [
    "Hier, il ___ beau ___ je suis sorti (Yesterday, it was nice so I went out)",
    "Je suis allé au café ___ l'école (I went to the café near the school)",
    "___ il faisait beau, on est allés au parc (Since it was nice, we went to the park)",
    "Il y ___ beaucoup de gens ___ des tables (There were many people around tables)",
    "C'___ super! (It was great!)",
    "Je marchais quand soudain j'___ Marie (I was walking when suddenly I saw Marie)",
    "___ j'avais faim, j'ai mangé (Because I was hungry, I ate)",
    "Le livre était ___ la table (The book was on the table)",
    "J'___ mes devoirs ___ j'ai regardé la télé (I did homework then watched TV)",
    "___ toi, j'ai réussi (Thanks to you, I succeeded)",
  ],
};
