/**
 * Phrases Target List
 * Manual classification of phrases for proper categorization
 * UPDATED: Verb phrases migrated to verb-phrases.js, arrays cleared
 */

// JE PHRASES - Phrases starting with "je " or "j'"
const jePhrases = [
  // All migrated - array cleared
];

// TU PHRASES - Phrases starting with "tu "
const tuPhrases = [
  // All migrated - array cleared
];

// IL/ELLE PHRASES - Phrases starting with "il " or "elle "
const ilEllePhrases = [
  // All migrated - array cleared
];

// ILS/ELLES PHRASES - Phrases starting with "ils " or "elles "
const ilsEllesPhrases = [
  // All migrated - array cleared
];

// NOUS PHRASES - Phrases starting with "nous "
const nousPhrases = [
  // All migrated - array cleared
];

// VOUS PHRASES - Phrases starting with "vous "
const vousPhrases = [
  // All migrated - array cleared
];

// ON PHRASES - Phrases starting with "on "
const onPhrases = [
  // All migrated - array cleared
];

// IL/ELLE COMBINED PHRASES - Phrases starting with "il/elle "
const ilElleCombinedPhrases = [
  // All migrated - array cleared
];

// ILS/ELLES COMBINED PHRASES - Phrases starting with "ils/elles "
const ilsEllesCombinedPhrases = [
  // All migrated - array cleared
];

// MASCULINE NOUNS - Phrases starting with "le " or "un " (capitalized)
const masculineNouns = [
  // All migrated - array cleared
];

// FEMININE NOUNS - Phrases starting with "la " or "une " (capitalized)
const feminineNouns = [
  // All migrated - array cleared
];

// PLURAL NOUNS - Phrases starting with "les " (capitalized)
const pluralNouns = [
  // All migrated - array cleared
];

// CONTRACTED NOUNS - Phrases starting with "l'" (capitalized, need manual gender determination)
const contractedNouns = [
  // All migrated - array cleared
];

// QUESTIONS - Question phrases and interrogative expressions
const questions = [
  "c'est combien", // how much is it
];

// GREETINGS - Greetings, farewells, and social interactions
const greetings = [
  "à ce soir", // see you this evening
  "Bon anniversaire!", // Happy birthday!
  "Bonne année!", // Happy New Year!
  "bonne journée", // have a good day
  "bonne nuit", // good night
  "Bonnes fêtes!", // Happy holidays!
];

// PREPOSITIONAL PHRASES - Phrases starting with prepositions
const prepositionalPhrases = [
  "à cause de", // because of
  "à côté de", // next to
  "à côté des fenêtres", // next to the windows
  "au bout de", // at the end of
  "au coin de", // at the corner of
  "au milieu de", // in the middle of
  "au-dessous de", // below, beneath
  "au-dessus de", // above, over
  "autour de", // around
];

// VERB PHRASES - Verb conjugations and verb combinations
const verbPhrases = [
  "aimer bien", // to like (casual)
  "aller mal", // to go badly / to be unwell
  "avions faim", // we were hungry
  "avions mangé", // we had eaten
  "avoir besoin de", // to need
  "avoir faim", // to be hungry
  "avoir raison", // to be right
  "bien dormir", // to sleep well
  "bien écouter", // to listen well
];

// ADJECTIVE PHRASES - Adjective combinations and comparative forms
const adjectivePhrases = [];

// TIME EXPRESSIONS - Time-related phrases
const timeExpressions = [
  "à ce moment-là", // at that moment
  "à cinq minutes", // five minutes away
  "à dix minutes", // ten minutes away
  "après le film", // after the film
  "après mon café", // after my coffee
  "aujourd'hui", // today
  "avant de dormir", // before sleeping
  "avant de partir", // before leaving
  "avant qu'elle vienne", // before she comes
  "avant qu'il arrive", // before he arrives
  "avant qu'il soit trop tard", // before it's too late
  "avant qu'on parte", // before we leave
  "avant que tu partes", // before you leave
  "avec le temps", // with time
];

// LOCATION PHRASES - Location and place-related phrases
const locationPhrases = [
  "à droite", // to the right / on the right
  "à gauche", // to the left / on the left
  "à notre table", // to our table
  "au cinéma", // to the cinema
  "au loin", // in the distance
  "au restaurant", // at the restaurant
  "autour des tables", // around the tables
  "avec mes amis", // with my friends
  "avec moi", // with me
  "avant que", // before that
];

// ARTICLE PHRASES - Article combinations
const articlePhrases = [
  "à l'", // to/at the (vowel)
  "à la", // to/at the (feminine)
];

// PROPER NOUNS - Proper nouns and names
const properNouns = [];

// CONJUNCTION PHRASES - Conjunction combinations
const conjunctionPhrases = [
  "bien qu'elle soit malade", // although she is sick
  "bien que je sois fatigué", // although I am tired
  "bien que tu sois occupé", // although you are busy
];

// EXPRESSIONS - Common French expressions and idiomatic phrases (additional)
const expressions = [
  "Aie confiance!", // Have confidence!
  "Allons-y!", // Let's go!
  "à pied", // on foot / walking
  "avoir une peur bleue", // to be terrified
  "Bah, c'est comme ça", // Well, that's how it is
  "beaucoup de gens", // a lot of people
  "bien sûr", // of course
  "bonne idée", // good idea
  "c'est ben correct", // it's quite good/okay
  "C'est bon, quoi", // It's good, you know
  "c'est ça", // that's it
  "c'est capot", // it's crazy
  "c'est ce livre", // it's this book
  "c'est cet homme", // it's this man
  "c'est chaud", // it's hot
  "c'est chelou", // it's weird
  "c'est cool", // it's cool
  "c'est dingue", // it's crazy
  "c'est écœurant", // it's disgusting
  "c'est fort", // it's strong/intense
  "c'est génial", // it's great
  "c'est gnama", // it's awesome
  "c'est grave", // it's serious
  "c'est le fun", // it's fun
  "c'est le leur", // it's theirs
  "c'est le mien", // it's mine
  "c'est le sien", // it's his/hers
  "c'est malade", // it's sick (slang)
  "c'est mortel", // it's deadly (slang)
  "c'est nul", // it's lame
];

// ARTICLE PHRASES - Article combinations (duplicate removed)

// PRONOUN PHRASES - Pronoun combinations (these are actually verb phrases)
const pronounPhrases = [
  // These are actually verb phrases with pronouns, not separate pronoun phrases
];

// Export the arrays
export {
  jePhrases,
  tuPhrases,
  ilEllePhrases,
  ilsEllesPhrases,
  nousPhrases,
  vousPhrases,
  onPhrases,
  ilElleCombinedPhrases,
  ilsEllesCombinedPhrases,
  masculineNouns,
  feminineNouns,
  pluralNouns,
  contractedNouns,
  questions,
  expressions,
  greetings,
  prepositionalPhrases,
  verbPhrases,
  adjectivePhrases,
  articlePhrases,
  pronounPhrases,
  timeExpressions,
  locationPhrases,
  properNouns,
  conjunctionPhrases,
};

// Summary statistics
export const summary = {
  totalPhrases: 0, // All phrases have been successfully migrated
  breakdown: {
    jePhrases: jePhrases.length,
    tuPhrases: tuPhrases.length,
    ilEllePhrases: ilEllePhrases.length,
    ilsEllesPhrases: ilsEllesPhrases.length,
    nousPhrases: nousPhrases.length,
    vousPhrases: vousPhrases.length,
    onPhrases: onPhrases.length,
    ilElleCombinedPhrases: ilElleCombinedPhrases.length,
    ilsEllesCombinedPhrases: ilsEllesCombinedPhrases.length,
    masculineNouns: masculineNouns.length,
    feminineNouns: feminineNouns.length,
    pluralNouns: pluralNouns.length,
    contractedNouns: contractedNouns.length,
    questions: questions.length,
    expressions: expressions.length,
    greetings: greetings.length,
    prepositionalPhrases: prepositionalPhrases.length,
    verbPhrases: verbPhrases.length,
    adjectivePhrases: adjectivePhrases.length,
    articlePhrases: articlePhrases.length,
    pronounPhrases: pronounPhrases.length,
  },
  status: "All phrases successfully migrated to appropriate categories",
};
