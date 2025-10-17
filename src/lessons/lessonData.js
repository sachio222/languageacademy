/**
 * Lesson Data - Main entry point
 * Import modules and build lessons automatically
 *
 * TO ADD A NEW MODULE:
 * 1. Create a new file in /modules/moduleX-name.js
 * 2. Import it here
 * 3. Add to moduleConfigs array
 * That's it!
 */

import { buildLesson } from "./moduleBuilder.js";

// Import all module configurations
// Filenames are semantic (based on content), not numbered
import { famousWords } from "./modules/famous-words.js";
import { module1 } from "./modules/pronouns.js";
import { module3_etre } from "./modules/etre.js";
import { module4_avoir } from "./modules/avoir.js";
import { articles } from "./modules/articles.js";
import { basicNouns } from "./modules/basic-nouns.js";
import { plurals } from "./modules/plurals.js";
import { connectors } from "./modules/connectors.js";
import { reading1 } from "./modules/reading-1.js";
import { unit1Practice } from "./modules/unit-1-practice.js";
import { unit1Exam } from "./modules/unit-1-exam.js";
import { module2_demonstratives } from "./modules/demonstratives.js";
import { caSurvival } from "./modules/ca-survival.js";
import { determinersWithNouns } from "./modules/determiners-with-nouns.js";
import { vouloirModule } from "./modules/vouloir.js";
import { pouvoirModule } from "./modules/pouvoir.js";
import { module6_questions } from "./modules/questions.js";
import { stressedPronouns } from "./modules/stressed-pronouns.js";
import { prepositions } from "./modules/prepositions.js";
import { adjectives } from "./modules/adjectives.js";
import { venirModule } from "./modules/venir.js";
import { allerModule } from "./modules/aller.js";
import { partirModule } from "./modules/partir.js";
import { voirModule } from "./modules/voir.js";
import { reading2 } from "./modules/reading-2.js";
import { unit2Practice } from "./modules/unit-2-practice.js";
import { unit2Exam } from "./modules/unit-2-exam.js";
import { contractions } from "./modules/contractions.js";
import { module7_object_pronouns } from "./modules/object-pronouns.js";
import { module8_possessive_adjectives } from "./modules/possessive-adjectives.js";
import { module9_possessive_pronouns } from "./modules/possessive-pronouns.js";
import { reading3 } from "./modules/reading-3.js";
import { module10_combining } from "./modules/combining.js";
import { unit3Practice } from "./modules/unit-3-practice.js";
import { unit3Exam } from "./modules/unit-3-exam.js";
import { survivalPhrases } from "./modules/survival-phrases.js";
import { faireModule } from "./modules/faire.js";
import { devoirModule } from "./modules/devoir.js";
import { parlerModule } from "./modules/parler.js";
import { negation } from "./modules/negation.js";
import { timeAdverbs } from "./modules/time-adverbs.js";
import { locationAdverbs } from "./modules/location-adverbs.js";
import { negation2 } from "./modules/negation-2.js";
import { everydayNouns } from "./modules/everyday-nouns.js";
import { reading4 } from "./modules/reading-4.js";
import { unit4Practice } from "./modules/unit-4-practice.js";
import { unit4Exam } from "./modules/unit-4-exam.js";
import { comparisons } from "./modules/comparisons.js";
import { conditionals } from "./modules/conditionals.js";
import { wouldConditionals } from "./modules/would-conditionals.js";
import { aimerModule } from "./modules/aimer.js";
import { etrePast } from "./modules/etre-past.js";
import { avoirPast } from "./modules/avoir-past.js";
import { foodNouns } from "./modules/food-nouns.js";
import { mangerModule } from "./modules/manger.js";
import { boireModule } from "./modules/boire.js";
import { comparisonsSlang } from "./modules/comparisons-slang.js";
import { reading5 } from "./modules/reading-5.js";
import { unit5Practice } from "./modules/unit-5-practice.js";
import { unit5Exam } from "./modules/unit-5-exam.js";
import { progressiveTenses } from "./modules/progressive-tenses.js";
import { direModule } from "./modules/dire.js";
import { prendreModule } from "./modules/prendre.js";
import { mettreModule } from "./modules/mettre.js";
import { demanderModule } from "./modules/demander.js";
import { commanderModule } from "./modules/commander.js";
import { besoinModule } from "./modules/besoin.js";
import { top200Nouns } from "./modules/top-200-nouns.js";
import { reading6 } from "./modules/reading-6.js";
import { unit6Practice } from "./modules/unit-6-practice.js";
import { unit6Exam } from "./modules/unit-6-exam.js";
import { alphabetModule } from "./modules/alphabet.js";
import { numbersModule } from "./modules/numbers.js";
import { daysMonthsModule } from "./modules/days-months.js";
import { holidaysModule } from "./modules/holidays.js";
import { frenchCountriesModule } from "./modules/french-countries.js";
import { languageStatsModule } from "./modules/language-stats.js";
import { colorsModule } from "./modules/colors.js";

// Unit 7: Knowledge & Learning
import { onAndPeopleModule } from "./modules/on-and-people.js";
import { comprendreModule } from "./modules/comprendre.js";
import { penserModule } from "./modules/penser.js";
import { savoirModule } from "./modules/savoir.js";
import { connaitreModule } from "./modules/connaitre.js";
import { croireModule } from "./modules/croire.js";
import { learningVerbsModule } from "./modules/learning-verbs.js";
import { studyingVerbsModule } from "./modules/studying-verbs.js";
import { knowledgeNounsModule } from "./modules/knowledge-nouns.js";
import { discourseMarkersModule } from "./modules/discourse-markers.js";
import { comparisonModifiersModule } from "./modules/comparison-modifiers.js";
import { reading7 } from "./modules/reading-7.js";
import { unit7Practice } from "./modules/unit-7-practice.js";
import { unit7Exam } from "./modules/unit-7-exam.js";

// Unit 8: Daily Life & Actions
import { temporalWordsModule } from "./modules/temporal-words.js";
import { reflexivePronounsModule } from "./modules/reflexive-pronouns.js";
import { sAppelerModule } from "./modules/s-appeler.js";
import { morningRoutineModule } from "./modules/morning-routine.js";
import { gettingReadyModule } from "./modules/getting-ready.js";
import { dailyReflexivesModule } from "./modules/daily-reflexives.js";
import { reflexivePastModule } from "./modules/reflexive-past.js";
import { reciprocalReflexivesModule } from "./modules/reciprocal-reflexives.js";
import { commandsTuModule } from "./modules/commands-tu.js";
import { commandsVousModule } from "./modules/commands-vous.js";
import { irregularCommandsModule } from "./modules/irregular-commands.js";
import { commandsPronounsModule } from "./modules/commands-pronouns.js";
import { reading8 } from "./modules/reading-8.js";
import { unit8Practice } from "./modules/unit-8-practice.js";
import { unit8Exam } from "./modules/unit-8-exam.js";

// Unit 9: Discourse & Past Tense
import { causalWordsModule } from "./modules/causal-words.js";
import { spatialPrepositionsModule } from "./modules/spatial-prepositions.js";
import { moreSpatialRelationsModule } from "./modules/more-spatial-relations.js";
import { passeComposeERModule } from "./modules/passe-compose-er.js";
import { passeComposeIrregular1Module } from "./modules/passe-compose-irregular-1.js";
import { passeComposeIrregular2Module } from "./modules/passe-compose-irregular-2.js";
import { passeComposeEtreModule } from "./modules/passe-compose-etre.js";
import { passeComposeAgreementModule } from "./modules/passe-compose-agreement.js";
import { imparfaitAllVerbsModule } from "./modules/imparfait-all-verbs.js";
import { pcVsImparfaitModule } from "./modules/pc-vs-imparfait.js";
import { pastTenseCompositionModule } from "./modules/past-tense-composition.js";
import { reading9 } from "./modules/reading-9.js";
import { unit9Practice } from "./modules/unit-9-practice.js";
import { unit9Exam } from "./modules/unit-9-exam.js";

// Unit 10: Mastery & Nuance - PRACTICAL PHRASES
import { commonSpecialForms1Module } from "./modules/common-special-forms-1.js";
import { commonSpecialForms2Module } from "./modules/common-special-forms-2.js";
import { necessityPhrasesModule } from "./modules/necessity-phrases.js";
import { wishPhrasesModule } from "./modules/wish-phrases.js";
import { emotionPhrasesModule } from "./modules/emotion-phrases.js";
import { opinionPhrasesModule } from "./modules/opinion-phrases.js";
import { hypotheticalPhrasesModule } from "./modules/hypothetical-phrases.js";
import { pastRegretPhrasesModule } from "./modules/past-regret-phrases.js";
import { hadAlreadyPhrasesModule } from "./modules/had-already-phrases.js";
import { commonAdverbsModule } from "./modules/common-adverbs.js";
import { whileDoingPhrasesModule } from "./modules/while-doing-phrases.js";
import { servicePhrasesModule } from "./modules/service-phrases.js";
import { beforePhrasesModule } from "./modules/before-phrases.js";
import { soThatPhrasesModule } from "./modules/so-that-phrases.js";
import { althoughPhrasesModule } from "./modules/although-phrases.js";
import { possibilityPhrasesModule } from "./modules/possibility-phrases.js";
import { reading10 } from "./modules/reading-10.js";
import { unit10Practice } from "./modules/unit-10-practice.js";
import { unit10Exam } from "./modules/unit-10-exam.js";

// Unit 11: Daily Essentials & Practical Communication
import { agePersonalInfoModule } from "./modules/age-personal-info.js";
import { donnerModule } from "./modules/donner.js";
import { dailyActions1Module } from "./modules/daily-actions-1.js";
import { searchAndFindModule } from "./modules/search-and-find.js";
import { perceptionVerbsModule } from "./modules/perception-verbs.js";
import { socialSituationsModule } from "./modules/social-situations.js";
import { directionsNavigationModule } from "./modules/directions-navigation.js";
import { reading11 } from "./modules/reading-11.js";
import { unit11Practice } from "./modules/unit-11-practice.js";
import { unit11Exam } from "./modules/unit-11-exam.js";

// Unit 12: Curiosity & Complex Questions
import { natureAnimalsModule } from "./modules/nature-animals.js";
import { movementVerbsModule } from "./modules/movement-verbs.js";
import { naturalPhenomenaModule } from "./modules/natural-phenomena-verbs.js";
import { questceQuiQueModule } from "./modules/questce-qui-que.js";
import { pourquoiComplexModule } from "./modules/pourquoi-complex.js";
import { commentComplexModule } from "./modules/comment-complex.js";
import { quiestQuiQueModule } from "./modules/quiest-qui-que.js";
import { inversionQuestionsModule } from "./modules/inversion-questions.js";
import { embeddedQuestionsModule } from "./modules/embedded-questions.js";
import { rhetoricalNegativeModule } from "./modules/rhetorical-negative-questions.js";
import { multiClauseQuestionsModule } from "./modules/multi-clause-questions.js";

// Module configurations in PEDAGOGICAL order
// Order matters! Each module builds on previous ones
const moduleConfigs = [
  // === CONFIDENCE BUILDER - Familiar words first! ===
  famousWords, // 1. Greetings & famous words - bonjour, merci, café (may recognize some!)

  // === FOUNDATION LAYER - Core building blocks ===
  module1, // 2. Pronouns - je, tu, il, elle
  module3_etre, // 3. être - COMBO: "je suis", "tu es", "il est"
  module4_avoir, // 4. avoir - COMBO: "j'ai", "tu as", "il a"

  // === NOUN LAYER - Vocabulary building ===
  articles, // 5. Articles - un/une, le/la/les, des
  basicNouns, // 6. Nouns - COMBO: "j'ai un chat", "il est un homme"
  plurals, // 7. Plurals - COMBO: "j'ai des chats", "nous avons les livres"

  // === CONNECTORS - Link your ideas and add emphasis! ===
  connectors, // 8. et, mais, ou, aussi, très - "un chat et un chien", "j'ai un chat aussi", "très bon"

  // === FIRST MILESTONE - You can READ French! ===
  reading1, // 9. READING TEST - Full paragraph! (uses M1-8 including 'et'!)
  unit1Practice, // 10. PRACTICE - Fill in the blanks with Unit 1 vocabulary!
  unit1Exam, // 11. UNIT 1 FINAL EXAM - Test everything from Unit 1!

  // === COMPOSITION LAYER - Functional programming! ===
  module2_demonstratives, // 12. ça, ce, cette, ces - learn ALL demonstratives
  caSurvival, // 13. ça practice - COMBO: "c'est ça", "ça va?", "j'ai ça"
  determinersWithNouns, // 14. COMPOSITION: "j'ai ce livre", "elle a cette maison"

  // === ACTION LAYER - More essential verbs ===
  vouloirModule, // 15. vouloir (to want) - "je veux ça", "tu veux le livre"
  pouvoirModule, // 16. pouvoir (can) - "je peux", "tu peux ça"
  voirModule, // 17. voir (to see) - "je vois Mont-Saint-Michel", "tu vois cette maison"

  // === COMMUNICATION LAYER - Questions ===
  module6_questions, // 18. Questions (26-32) - COMBO: "où est le chat?", "qu'est-ce que c'est?"

  // === EXPANSION LAYER - Pronouns, Prepositions & Descriptors ===
  stressedPronouns, // 19. moi, toi, lui, elle, nous, vous, eux, elles - for use with prepositions!
  prepositions, // 20. avec, dans, sur, à, de - "avec moi", "dans la maison", "pour toi"
  adjectives, // 21. bon, grand, petit, nouveau, vieux, etc. - "un bon livre", "une belle maison"

  // === SECOND MILESTONE - See your progress! ===
  reading2, // 22. READING TEST 2 - Normandy Adventure! Uses questions, ça, vouloir/pouvoir/voir, prepositions, adjectives, stressed pronouns!
  unit2Practice, // 23. PRACTICE - Fill in the blanks with Unit 2 vocabulary!
  unit2Exam, // 24. UNIT 2 FINAL EXAM - Test everything from Unit 2!

  // ============================================
  // UNIT 3: EXPANSION - Complex Structures
  // ============================================

  // === CONTRACTIONS - Easy transition into Unit 3! ===
  contractions, // 25. du, au, de la, à la - combining prepositions with articles!

  // === MOTION LAYER - Essential movement verbs ===
  venirModule, // 26. venir - "je viens", "tu viens", "il vient"
  allerModule, // 27. aller - "je vais", "tu vas", "il va" - MOST COMMON!
  partirModule, // 28. partir - "je pars", "tu pars", "il part"

  // === ADVANCED LAYER - Complex pronouns ===
  module7_object_pronouns, // 29. le, la, les - COMBO: "je le vois", "il l'a" (builds on voir, vouloir, avoir)
  module8_possessive_adjectives, // 30. mon, ton, son - COMBO: "mon chat", "sa maison"
  module9_possessive_pronouns, // 31. le mien, le tien - COMBO: "c'est le mien"

  // === MASTERY LAYER - Practice writing complex sentences ===
  module10_combining, // 32. FULL SENTENCES: "il a mon livre", "est-ce le sien?"

  // === THIRD MILESTONE - Test your reading comprehension! ===
  reading3, // 33. READING TEST 3 - Conversation! Uses everything from Unit 3!
  unit3Practice, // 34. PRACTICE - Fill in the blanks with Unit 3 vocabulary!
  unit3Exam, // 35. UNIT 3 FINAL EXAM - Test everything from Unit 3!

  // ============================================
  // UNIT 4: EXPRESSION - Real-World Communication
  // ============================================

  // === SURVIVAL PHRASES - Function in France! ===
  survivalPhrases, // 36. je voudrais, s'il vous plaît, c'est combien?, excusez-moi - practical phrases!

  // === ESSENTIAL VERBS - More modal verbs and communication! ===
  faireModule, // 37. faire (to do/make) - je fais, tu fais, il fait
  devoirModule, // 38. devoir (must/have to) - je dois, tu dois, il doit
  parlerModule, // 39. parler (to speak) - je parle, tu parles, il parle - first regular -ER verb!

  // === NEGATION - Say what you DON'T do! ===
  negation, // 40. ne...pas - "je ne veux pas", "tu n'as pas"

  // === TIME & FREQUENCY - When and how often! ===
  timeAdverbs, // 41. maintenant, toujours, jamais, aujourd'hui, demain, hier - essential time words!

  // === NEGATION PART 2 - Modal verbs & never ===
  negation2, // 42. je ne peux pas (I can't), je ne vais jamais (I never go), il ne fait jamais - expand negation!

  // === LOCATION - Where things are! ===
  locationAdverbs, // 43. ici, là, là-bas, partout, quelque part, nulle part - express location!

  // === EVERYDAY NOUNS - Essential vocabulary for real conversations! ===
  everydayNouns, // 44. High-frequency nouns: le temps, la vie, le monde, l'eau, le pain, l'argent - practical vocabulary!

  // === FOURTH MILESTONE - Real-world French! ===
  reading4, // 45. READING TEST 4 - Conversation! Uses all Unit 4 vocabulary!
  unit4Practice, // 46. PRACTICE - Fill in the blanks with Unit 4 vocabulary!
  unit4Exam, // 47. UNIT 4 FINAL EXAM - Test everything from Unit 4!

  // ============================================
  // UNIT 5: SOPHISTICATION - Past Tense & Nuance
  // ============================================

  // === COMPARISON & INTENSITY - Express nuance! ===
  comparisons, // 37. Comparisons - plus, moins, meilleur, pire, trop, tout, même - express comparisons and intensity!
  comparisonsSlang, // 38. Slang - c'est ouf! 🇫🇷 c'est malade! 🇨🇦 c'est gnama! 🌍 Real street French from France, Quebec & Africa!

  // === CONDITIONAL MOOD - Should & Could ===
  conditionals, // 39. Should & Could - je devrais (I should), je pourrais (I could) - in couplets!

  // === CONDITIONAL MOOD - Would Forms ===
  wouldConditionals, // 40. Would Forms - je voudrais (I would like), j'irais (I would go), je ferais (I would do)

  // === ESSENTIAL VERBS - High-frequency emotion verb ===
  aimerModule, // 41. aimer - to like/love - j'aime le café, je t'aime!

  // === PAST TENSE - Talk about the past! ===
  etrePast, // 42. être past tense - j'étais (I was), tu étais (you were), il était (he was)
  avoirPast, // 43. avoir past tense - j'avais (I had), tu avais (you had), il avait (he had)

  // === EVERYDAY VOCABULARY - Essential nouns ===
  foodNouns, // 44. Food nouns - le pain, l'eau, le café, la viande, les légumes - everyday essentials!

  // === ESSENTIAL DAILY VERBS - Eating and drinking ===
  mangerModule, // 45. manger - to eat - je mange du pain, j'ai mangé (I ate) - with passé composé!
  boireModule, // 46. boire - to drink - je bois du café, j'ai bu (I drank - irregular!) - with passé composé!

  // === FIFTH MILESTONE - Restaurant story with past tense! ===
  reading5, // 47. READING TEST 5 - Restaurant article! Uses comparisons, slang, conditionals, past tense, food vocab!
  unit5Practice, // 48. PRACTICE - Fill in the blanks with Unit 5 vocabulary!
  unit5Exam, // 49. UNIT 5 FINAL EXAM - Test everything from Unit 5!

  // ============================================
  // UNIT 6: COMMUNICATION - Advanced Expression & High-Frequency Words
  // ============================================

  // === PROGRESSIVE & FUTURE - Express time and intention ===
  progressiveTenses, // 61. Progressive & Future - en train de, aller + inf, future tense, negative modals

  // === ESSENTIAL COMMUNICATION VERBS - Top 100 words! ===
  direModule, // 62. dire (to say/tell) - rank 64 - je dis, tu dis, il dit (irregular!)
  prendreModule, // 63. prendre (to take) - rank 23 - also teaches comprendre (rank 61!) & apprendre
  mettreModule, // 64. mettre (to put/set) - mettre la table, mettre un pantalon
  demanderModule, // 65. demander (to ask) - rank 63 - demander de l'aide
  commanderModule, // 66. commander (to order) - restaurants & shopping

  // === EXPRESSING NEEDS ===
  besoinModule, // 67. avoir besoin de (to need) - j'ai besoin d'aide, j'ai besoin de manger

  // === HIGH-FREQUENCY NOUNS - Complete top 200! ===
  top200Nouns, // 68. Top 200 nouns - année, fois, personne, famille, cœur, histoire, problème, question

  // === SIXTH MILESTONE - Family trip to Paris! ===
  reading6, // 69. READING TEST 6 - Un Voyage en Famille - Uses progressive, communication verbs, and top 200 nouns!
  unit6Practice, // 70. PRACTICE - Fill in the blanks with Unit 6 vocabulary!
  unit6Exam, // 71. UNIT 6 FINAL EXAM - Test everything from Unit 6!

  // ============================================
  // UNIT 7: KNOWLEDGE & LEARNING - Following Natural Cognitive Flow
  // ============================================
  // Flow: on (people) → Study → Learn → Understand → Know → Recognize → Think → Believe

  // === FOUNDATION: TALKING ABOUT PEOPLE IN GENERAL ===
  onAndPeopleModule, // 72. on (we/one/people) + les gens, tout le monde - CRITICAL for general statements!

  // === STEP 1: STUDYING - The action you take ===
  studyingVerbsModule, // 73. étudier (study) & réviser (review) - where learning begins!

  // === STEP 2: LEARNING - What results from studying ===
  learningVerbsModule, // 74. apprendre (learn) & enseigner (teach) - acquiring knowledge

  // === STEP 3: UNDERSTANDING - Deeper comprehension ===
  comprendreModule, // 75. comprendre (to understand) - rank 61, follows prendre pattern

  // === STEP 4: KNOWING FACTS - What you've acquired ===
  savoirModule, // 76. savoir (to know facts/skills) - rank 21 ⭐ "je ne sais pas"!

  // === STEP 5: RECOGNIZING - Familiarity with people/places ===
  connaitreModule, // 77. connaître (to know people/places) - rank 62, completes savoir distinction

  // === STEP 6: THINKING - Forming opinions ===
  penserModule, // 78. penser (to think) - rank 59, express opinions based on knowledge

  // === STEP 7: BELIEVING - Softer convictions ===
  croireModule, // 79. croire (to believe) - rank 60, tentative opinions

  // === KNOWLEDGE VOCABULARY - Nouns for learning ===
  knowledgeNounsModule, // 80. Essential learning nouns - question, réponse, idée, cours, école

  // === DISCOURSE MARKERS - Sound like a native! ===
  discourseMarkersModule, // 81. donc, en fait, bah, quoi - natural speech flow

  // === COMPARISON COMPLETION - Modifiers ===
  comparisonModifiersModule, // 82. tout, même, mal - completes comparison words

  // === SEVENTH MILESTONE - Philosophical reading about learning! ===
  reading7, // 83. READING TEST 7 - L'Art d'Apprendre - Meta! Reading about learning while learning!
  unit7Practice, // 84. PRACTICE - Fill in the blanks with Unit 7 vocabulary!
  unit7Exam, // 85. UNIT 7 FINAL EXAM - Test everything from Unit 7!

  // ============================================
  // UNIT 8: DAILY LIFE & ACTIONS - Temporal Words + Reflexive Verbs + Commands
  // ============================================

  // === TEMPORAL FOUNDATION - Sequence actions in time! ===
  temporalWordsModule, // 86. pendant, avant, après, d'abord, ensuite, finalement - FINALLY formally taught!

  // === REFLEXIVE VERBS - Describe daily routines! ===
  reflexivePronounsModule, // 87. me, te, se, nous, vous - foundation for reflexive verbs
  sAppelerModule, // 88. s'appeler (to be called) - FINALLY! "Je m'appelle..."
  morningRoutineModule, // 89. se réveiller (wake up), se lever (get up) - morning sequence
  gettingReadyModule, // 90. se laver (wash), s'habiller (dress), se préparer (get ready) - complete morning!
  dailyReflexivesModule, // 91. se souvenir (remember), s'amuser (have fun), se dépêcher (hurry) - daily actions
  reflexivePastModule, // 92. Reflexive verbs in past tense - je me suis réveillé(e), elle s'est levée
  reciprocalReflexivesModule, // 93. Reciprocal reflexives - nous nous aimons, on se voit, ils se parlent

  // === IMPERATIVE MOOD - Give commands! ===
  commandsTuModule, // 94. Commands tu form - Mange! Parle! Écoute!
  commandsVousModule, // 95. Commands vous form - Mangez! Parlez! Écoutez!
  irregularCommandsModule, // 96. Irregular commands - Sois! Aie! Va! Fais! + Vas-y!
  commandsPronounsModule, // 97. Commands with pronouns - Donne-le-moi! Regarde-moi! Ne le fais pas!

  // === EIGHTH MILESTONE - Daily routine story! ===
  reading8, // 98. READING TEST 8 - Ma Journée - A typical day with routines, commands, temporal words!
  unit8Practice, // 99. PRACTICE - Fill in the blanks with Unit 8 vocabulary!
  unit8Exam, // 100. UNIT 8 FINAL EXAM - Test everything from Unit 8!

  // ============================================
  // UNIT 9: DISCOURSE & PAST TENSE - Complete Storytelling Enabled!
  // ============================================

  // === PHASE 1: DISCOURSE FOUNDATION - Explain WHY and WHERE! ===
  causalWordsModule, // 101. Causal & Reason Words - parce que, car, puisque, comme, grâce à, à cause de
  spatialPrepositionsModule, // 102. Spatial Prepositions - devant, derrière, entre, au-dessus, au-dessous, parmi
  moreSpatialRelationsModule, // 103. More Spatial Relations - près de, loin de, à côté de, en face de, autour de

  // === PHASE 2: PASSÉ COMPOSÉ SYSTEM - Talk about completed actions! ===
  passeComposeERModule, // 104. Passé Composé Foundation - Regular -ER verbs (j'ai parlé, j'ai mangé)
  passeComposeIrregular1Module, // 105. Irregular Past Participles Set 1 - avoir→eu, être→été, faire→fait, voir→vu
  passeComposeIrregular2Module, // 106. Irregular Past Participles Set 2 - vouloir→voulu, pouvoir→pu, devoir→dû, dire→dit, prendre→pris
  passeComposeEtreModule, // 107. être verbs - DR & MRS VANDERTRAMP (je suis allé, je suis venu, je suis parti)
  passeComposeAgreementModule, // 108. Past Participle Agreement - elle est allée, ils sont allés, elles sont allées

  // === PHASE 3: IMPARFAIT & THE KEY DISTINCTION - Complete past tense mastery! ===
  imparfaitAllVerbsModule, // 109. Imparfait Formation - All Verbs (je parlais, il faisait, on allait)
  pcVsImparfaitModule, // 110. Passé Composé vs Imparfait ⭐⭐⭐ THE GOLDEN RULE - Event vs Description
  pastTenseCompositionModule, // 111. Past Tense Composition - Complex Narratives with all elements

  // === NINTH MILESTONE - Complete past tense story! ===
  reading9, // 112. READING TEST 9 - Une Histoire du Passé - A memorable day with PC, IMP, causal, spatial!
  unit9Practice, // 113. PRACTICE - Fill in the blanks with Unit 9 vocabulary!
  unit9Exam, // 114. UNIT 9 FINAL EXAM - Test everything from Unit 9!

  // ============================================
  // UNIT 10: MASTERY & NUANCE - Practical Phrases for B2!
  // ============================================

  // === FOUNDATION: SPECIAL FORMS - Learn these first! ===
  commonSpecialForms1Module, // 115. Common Special Forms Part 1 - sois, ait, aille, fasse
  commonSpecialForms2Module, // 116. Common Special Forms Part 2 - vienne, parte, puisse, sache, comprenne

  // === TOP PRACTICAL PHRASES - Real-world expressions! ===
  necessityPhrasesModule, // 117. Il faut que... - Necessity Phrases
  wishPhrasesModule, // 118. Je veux que... - Wish Phrases
  emotionPhrasesModule, // 119. Je suis content que... - Emotion Phrases
  opinionPhrasesModule, // 120. Je pense que... - Opinion Phrases
  hypotheticalPhrasesModule, // 121. Si j'étais... - Hypothetical Phrases (Daydreams)
  pastRegretPhrasesModule, // 122. Si j'avais su... - Past Regret Phrases
  hadAlreadyPhrasesModule, // 123. J'avais déjà... - Had Already Phrases
  commonAdverbsModule, // 124. vraiment, sérieusement... - Common Adverbs
  whileDoingPhrasesModule, // 125. En mangeant... - While Doing Phrases
  servicePhrasesModule, // 126. Je me fais couper... - Service Phrases
  beforePhrasesModule, // 127. Avant que... - Before Phrases
  soThatPhrasesModule, // 128. Pour que... - So That Phrases
  althoughPhrasesModule, // 129. Bien que... - Although Phrases
  possibilityPhrasesModule, // 130. Il est possible que... - Possibility Phrases

  // === TENTH MILESTONE - Dreams and ambitions! ===
  reading10, // 131. READING TEST 10 - Mes Rêves et Mes Espoirs - Dreams using wishes, emotions, hypotheticals!
  unit10Practice, // 132. PRACTICE - Fill in the blanks with Unit 10 vocabulary!
  unit10Exam, // 133. UNIT 10 FINAL EXAM - Test everything from Unit 10!

  // ============================================
  // UNIT 11: DAILY ESSENTIALS & PRACTICAL COMMUNICATION - Complete Top 100!
  // ============================================

  // === ESSENTIAL LIFE SKILLS - Finally complete what should have been in Unit 1! ===
  agePersonalInfoModule, // 134. Age & Personal Information - J'ai 25 ans, Quel âge?

  // === TOP 100 COMPLETION - Missing high-frequency verbs ===
  donnerModule, // 135. donner (to give) - Rank 24, CRITICAL frequency
  dailyActions1Module, // 136. Daily Actions - dormir, travailler, vivre (ranks 54-56)
  searchAndFindModule, // 137. Search & Find - chercher, trouver (ranks 57-58)
  perceptionVerbsModule, // 138. Perception - écouter, regarder full conjugations (ranks 65-66)
  socialSituationsModule, // 139. Social Situations - attendre, arriver, rester (ranks 67,69,70)

  // === PRACTICAL SKILLS - Navigation and directions ===
  directionsNavigationModule, // 140. Directions & Navigation - Essential travel skills

  // === ELEVENTH MILESTONE - Real-world French mastery! ===
  reading11, // 141. READING TEST 11 - La France Moderne - Official exposition demonstrating B2+ reading ability!
  unit11Practice, // 142. PRACTICE - Fill in the blanks with Unit 11 vocabulary!
  unit11Exam, // 143. UNIT 11 FINAL EXAM - Test everything from Unit 11!

  // ============================================
  // UNIT 12: CURIOSITY & COMPLEX QUESTIONS - Ask Anything!
  // ============================================

  // === VOCABULARY FOUNDATION - Animals, nature, movement ===
  natureAnimalsModule, // 151. Nature & Animals - Curiosity vocabulary
  movementVerbsModule, // 152. Movement Verbs - nager, sauter, voler, courir
  naturalPhenomenaModule, // 153. Natural Phenomena - briller, pousser, rendre (causative!)

  // === CORE QUESTION STRUCTURES - Master discrimination ===
  questceQuiQueModule, // 154. qu'est-ce qui vs que - CRITICAL subject/object distinction
  pourquoiComplexModule, // 155. Complex pourquoi - Ask why about any process
  commentComplexModule, // 156. Complex comment - Ask how things work
  quiestQuiQueModule, // 157. qui est-ce qui vs que - Who questions (subject/object)

  // === ADVANCED REFINEMENT - Native sophistication ===
  inversionQuestionsModule, // 158. Inversion Questions - Formal register
  embeddedQuestionsModule, // 159. Embedded Questions - Polite indirect questions
  rhetoricalNegativeModule, // 160. Rhetorical & Negative - Advanced style
  multiClauseQuestionsModule, // 161. Multi-Clause Questions - Full complexity

  // ============================================
  // REFERENCE UNIT - Essential Reference Materials
  // ============================================

  // === REFERENCE MATERIALS - Always available for quick lookup! ===
  alphabetModule, // 155. L'Alphabet - French alphabet with pronunciation
  numbersModule, // 156. Les Nombres - Numbers from 0 to infinity
  daysMonthsModule, // 157. Jours et Mois - Days of the week and months
  holidaysModule, // 158. Les Fêtes - French holidays and celebrations
  colorsModule, // 159. Les Couleurs - Colors with agreement rules and nature vocabulary
  frenchCountriesModule, // 160. La Francophonie - French-speaking countries worldwide
  languageStatsModule, // 161. Le Français en Chiffres - Fascinating language statistics
];

// Build all lessons from configs
// IDs and module numbers are assigned dynamically based on array position (1-indexed)
const allLessons = moduleConfigs.map((config, index) => {
  const moduleId = index + 1;
  const lesson = buildLesson(config, moduleId); // Pass module number

  // Add "Module ##:" prefix for regular modules (1-154)
  // Override titles for reference modules (155-161) to use Roman numerals
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
  let finalTitle = lesson.title;

  if (moduleId >= 155 && moduleId <= 161) {
    // Reference modules use Roman numerals
    const romanIndex = moduleId - 155;
    finalTitle = `Reference ${romanNumerals[romanIndex]}: ${config.title}`;
  } else {
    // Regular modules get "Module ##:" prefix
    finalTitle = `Module ${moduleId}: ${lesson.title}`;
  }

  // Set dynamic ID and update exercise IDs to match
  return {
    ...lesson,
    id: moduleId,
    title: finalTitle,
    exercises: lesson.exercises.map((ex, exIdx) => ({
      ...ex,
      id: `${moduleId}.${exIdx + 1}`,
    })),
  };
});

// Pedagogical unit structure - aligned with cognitive science
// Each unit ends with a comprehensive exam
export const unitStructure = [
  {
    id: 1,
    title: "Unit 1: Essential Grammar",
    description:
      "Master pronouns (I, you, he), être (to be), avoir (to have), articles, basic nouns, and connectors",
    lessonRange: [1, 11], // Lessons 1-9 + Practice + Unit 1 Exam
    icon: "🏗️",
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Unit 2: Asking & Describing",
    description:
      "Ask questions, use demonstratives (this/that), essential verbs (want/can/see), add descriptions with adjectives and prepositions",
    lessonRange: [12, 24], // Lessons 12-22 + Practice + Unit 2 Exam (ID 24)
    icon: "🧩",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Unit 3: Movement & Possession",
    description:
      "Master motion verbs (go, come, leave), object pronouns (it/them), and possessives (mine, yours)",
    lessonRange: [25, 35], // Lessons 25-32 + Reading3 (33) + Practice (34) + Unit 3 Exam (35)
    icon: "🎯",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Unit 4: Everyday Communication",
    description:
      "Survival phrases, negation (I don't), time & location words, and essential daily verbs",
    lessonRange: [36, 47], // Lessons 36-45 + Unit 4 Practice (46) + Unit 4 Exam (47)
    icon: "💬",
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Unit 5: Time & Taste",
    description:
      "Talk about the past (I was, I had), express preferences and opinions, order food, and add nuance with conditionals",
    lessonRange: [48, 60], // Lessons 48-58 + Reading 5 (58) + Practice (59) + Unit 5 Exam (60)
    icon: "⏳",
    color: "#ec4899",
  },
  {
    id: 6,
    title: "Unit 6: Fluency & Mastery",
    description:
      "Advanced communication verbs (say, take, put, ask), progressive tenses, expressing needs, and comprehensive vocabulary",
    lessonRange: [61, 71], // Lessons 61-68 + Reading 6 (69) + Practice (70) + Unit 6 Exam (71)
    icon: "💬",
    color: "#10b981",
  },
  {
    id: 7,
    title: "Unit 7: Knowledge & Learning",
    description:
      "Express understanding, thinking, and learning: comprendre (understand), savoir (know), penser (think), plus discourse markers for natural speech",
    lessonRange: [72, 85], // Lessons 72-82 + Reading 7 (83) + Practice (84) + Unit 7 Exam (85)
    icon: "🧠",
    color: "#f97316",
  },
  {
    id: 8,
    title: "Unit 8: Daily Life & Actions",
    description:
      "Sequence actions in time, describe routines, introduce yourself properly: temporal words, reflexive verbs (s'appeler, se lever, se laver), and commands",
    lessonRange: [86, 100], // Lessons 86-97 + Reading 8 (98) + Practice (99) + Unit 8 Exam (100)
    icon: "🌅",
    color: "#8b5cf6",
  },
  {
    id: 9,
    title: "Unit 9: Discourse & Past Tense",
    description:
      "Complete storytelling mastery: causal/spatial words (parce que, près de), passé composé (j'ai mangé, je suis allé), imparfait (j'étais, il faisait), and the critical PC vs IMP distinction",
    lessonRange: [101, 114], // Modules 101-111 + Reading 9 (112) + Practice (113) + Unit 9 Exam (114)
    icon: "📖",
    color: "#ef4444",
  },
  {
    id: 10,
    title: "Unit 10: Mastery & Nuance",
    description:
      "B2 Level Phrases! Learn special verb forms, then use them in top practical expressions: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su), services (je me fais couper), and more!",
    lessonRange: [115, 133], // Modules 115-130 (phrase modules) + Reading 10 (131) + Practice (132) + Unit 10 Exam (133)
    icon: "🎓",
    color: "#8b5cf6",
  },
  {
    id: 11,
    title: "Unit 11: Daily Essentials",
    description:
      "Complete the top 100! Essential life skills: age expressions, high-frequency verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), and directions. Perfect 100% top 100 coverage!",
    lessonRange: [134, 143], // Modules 134-140 (core) + Reading 11 (141) + Practice (142) + Unit 11 Exam (143)
    icon: "🌟",
    color: "#f59e0b",
  },
  {
    id: 12,
    title: "Unit 12: Curiosity & Questions",
    description:
      "Ask ANY question in French! Learn nature vocabulary, then master all question structures: qu'est-ce qui/que distinction, complex pourquoi/comment, formal inversion, embedded questions, and native-level complexity.",
    lessonRange: [144, 154], // Modules 144-154 (11 modules, stopping before reading)
    icon: "❓",
    color: "#06b6d4",
  },
  {
    id: 13,
    title: "Reference",
    description:
      "Essential reference materials - alphabet, numbers, dates, holidays, French-speaking countries, language facts, and colors",
    lessonRange: [155, 161], // Reference modules 155-161
    icon: "📚",
    color: "#6366f1",
    isReference: true, // Flag to indicate this is not a numbered unit
  },
];

// Export flat list of lessons for backward compatibility
export const lessons = allLessons;

// Helper functions
export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getExerciseById(lessonId, exerciseId) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return null;
  return lesson.exercises.find((ex) => ex.id === exerciseId);
}
