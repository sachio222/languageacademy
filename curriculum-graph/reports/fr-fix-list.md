# French course fix list

2767 errors, 711 warnings, 154 modules with errors.

## How to read this

A checker read every lesson, practice, reading and exam in course order and tested one thing for each French word and grammar pattern: was it taught before the learner meets it? Positions count the modules in course order, from 1 to 160. A code such as fr:lex:livre names the entry in the course word list, and a code starting fr:cx: names a grammar pattern. The Reference unit (alphabet, numbers, days and months, colors and similar pages) has no position, because learners can open it at any time, so it teaches nothing at any point in the course.

Besides the exercises, the checker reads the French a learner sees on concept cards, hints, instructions, vocabulary notes, feedback on a wrong answer, module titles and the four help screens. A line that comes from one of these names it before the quote, for example Hint: or Help screen:, instead of Sentence:.

Section 1 lists words and patterns used before they are taught, module by module. Each line gives the reason (taught in a later module, a form such as bonne of a word taught earlier as bon, or not taught anywhere) and quotes the sentence it came from. The default fix is to teach the word earlier, in the module where it is first used; each line names that module. If the sentence does not need the word, remove it instead.

Section 2 lists exam and practice topics the course has not taught by that point. Section 3 counts, per module, exercises after Unit 1 that show an English prompt and ask for the French; these should become other exercise types. Section 4 lists words and patterns explained in more than one lesson: keep the explanation in the lesson named and turn the others into practice. A word counts as explained where it heads a vocabulary entry, not where it appears inside a longer phrase. Section 5 counts taught words that do not come back soon enough to stick.

Section 6 measures the course against the CEFR levels, the scale of the Common European Framework of Reference that runs from A1 for beginners through A2 and B1 to C2. Each level has a core list: the words and grammar patterns new at that level, so a learner at A2 needs both the A1 and A2 lists. A level counts as reached once the course has taught 90% of its core words and every grammar pattern on its list. The level of each word and pattern is our own grading, informed by public sources: the Eaquals inventory of French grammar and functions by level, word frequencies from Lexique, and FLELex, which grades words by how often French textbooks use them at each level. A module's level is the highest level among the words and patterns it teaches. Section 6 also lists level labels that claim more than the modules teach, and modules that teach a word or pattern two or more levels above the highest level reached before them (counting from A1 until the course reaches a level).

Section 7 lists what a learner can do with French at each level, such as asking the time, and the module where each becomes possible. Section 8 lists modules that store exercises in an older format.

Section 9 lists words missing from the course word list. Most are typos, English words, or accepted answers typed without accents or apostrophes. Section 10 lists everything else, including fill-in-the-blank sentences whose blank sits inside a word, on a punctuation mark that the app then hides, or after the full stop.

This list was checked for English speakers, so a cognate (a French word they read correctly without a lesson, such as restaurant) may appear in French the learner reads or hears from the cognates lesson on, before a lesson teaches it. The cognates come from curriculum-graph/pairs/en-fr/cognates.json, and Section 1 still lists a cognate the learner has to type. That line names the module where the learner first types it: teach the word there, or let the learner read it instead of typing it.

## Lesson text to fix

- 15. ça - Survival Phrases: the vocabulary note "ça + va (être)" names the wrong verb: "va" comes from aller, so the note should read "ça + va (aller)".
- 64. Unit 5 Practice - Fill in the Blanks: the concept cards teach "plus bon que" and "c'est plus bon", which are wrong French; the comparative of bon is "meilleur" ("meilleur que", "c'est meilleur").
- 65. Unit 5 Final Exam - Sophistication: the concept cards teach "plus bon que (better than)" and "c'est plus bon", which are wrong French; the comparative of bon is "meilleur" ("meilleur que", "c'est meilleur").
- 107. Causal & Reason Words - Explaining Why: the gap-fill "Je suis en retard ___ le traffic" with answer "à cause du" reads "à cause du le traffic" once filled; drop "le" from the prompt. "traffic" is the English spelling: French writes "trafic" (also in the à cause de concept card and a feedback line).
- 108. Spatial Prepositions - Position & Location: the gap-fill "La lampe est ___ le lit" with answer "au-dessus du" reads "au-dessus du le lit" once filled; drop "le" from the prompt. "il-y-a" in the parmi exercises is written "il y a", without hyphens.
- 113. être Verbs - DR & MRS VANDERTRAMP (went, came, left): the gap-fill "Elle ne ___ pas ___" with answer "est pas venue" reads "Elle ne est pas venue" once filled; French elides it to "Elle n'est pas venue".
- 115. Imparfait Formation - All Verbs (was doing, used to do): the gap-fill "Je ___ au café quand tu m'as appelé" with answer "allais" reads "Je allais"; French elides it to "J'allais".
- 117. Past Tense Composition - Building Complete Stories: the gap-fill "Pendant que je ___, on a parlé pendant une heure" with answer "étais" reads "je étais"; French elides it to "j'étais" (and "While I was there" needs "là": "Pendant que j'étais là").
- 119. Unit 9 Practice - Fill in the Blanks: the gap-fill "Il est fatigué ___ du travail" with answer "à cause de" reads "à cause de du travail" once filled; French says "à cause du travail": make the answer "à cause du" and drop "du" from the prompt.
- 148. Unit 11 Practice - Fill in the Blanks: the gap-fill "Je ___ mes amis au café" with answer "attends" reads "Je attends"; French elides it to "J'attends".
- 152. Natural Phenomena - How Nature Works: the vocabulary entry and concept card "rendre + adjective" have the English placeholder "adjective" where a French example belongs (for example "rendre heureux").

# 1. Untaught words and patterns

## Unit 1: Essential Grammar

### 1. Famous Words & Greetings

- "voyage" (fr:lex:voyager): taught later, at position 127 (Si j'étais... - Daydreaming & Hypotheticals); teach in this module. Hint: "bon voyage"
- "appétit" (fr:lex:appetit): not taught anywhere in the course; teach in this module. Hint: "bon appétit"
- "très" (fr:lex:tres): taught later, at position 10 (Basic Connectors - et, mais, ou, aussi, très); teach in this module. Hint: "très bien"

### 2. Core Pronouns - The Building Blocks

- "va" (fr:lex:aller): taught later, at position 15 (ça - Survival Phrases); teach in this module. Concept card: "On va au café"
- fr:cx:contraction.a: taught later, at position 28 (Contractions - du, au, de la, à la); teach in this module. Concept card: "On va au café"

### 3. Essential Verb - être (to be)

- "heureux" (fr:lex:heureux): not taught anywhere in the course; teach in this module. Concept card: "Je suis heureux"
- "étudiant" (fr:lex:etudier): taught later, at position 79 (Studying & Reviewing - étudier & réviser); teach in this module. Concept card: "Je suis étudiant"
- "à" (fr:lex:a.preposition): taught later, at position 23 (Prepositions - Spatial & Relational Words); teach in this module. Concept card: "Je suis à Paris"

### 5. Articles - The, A, An

- "an" (fr:lex:an): taught later, at position 140 (Age & Personal Information); teach in this module. Concept card: "an"

### 6. Cognates - French and English Share Many Words

- "veux" (fr:lex:vouloir): taught later, at position 17 (Essential Verb - vouloir (to want)); teach in this module. Help screen: "Je veux un café"
- "du" (fr:lex:du): taught later, at position 28 (Contractions - du, au, de la, à la); teach in this module. Help screen: "Je veux du café."
- fr:cx:article.partitive: taught later, at position 28 (Contractions - du, au, de la, à la); teach in this module. Help screen: "Je veux du café."

### 7. Basic Nouns - People & Things

- "c'" (fr:lex:ce.pronoun): taught later, at position 14 (Demonstratives - It, That, This); teach in this module. Sentence: "c'est une maison"
- fr:cx:cest: taught later, at position 15 (ça - Survival Phrases); teach in this module. Sentence: "c'est une maison"

### 10. Basic Connectors - et, mais, ou, aussi, très

- "bonne" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in this module. Sentence: "la maison est très bonne"

### 11. Reading Comprehension - First Paragraph!

- "bonne" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in Basic Connectors - et, mais, ou, aussi, très (position 10). Sentence: "…et une voiture. La maison est très bonne ! Tu as un ami. Il a des livres. J'ai…"
- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before this module. Sentence: "…et des chiens. Les chiens sont très bons, mais les chats sont bons aussi.…"
- "C'" (fr:lex:ce.pronoun): taught later, at position 14 (Demonstratives - It, That, This); teach in Basic Nouns - People & Things (position 7). Sentence: "Bonjour ! Je suis Paul. Je suis un homme. J'ai un chat et un chien aussi. Tu es…"
- fr:cx:cest: taught later, at position 15 (ça - Survival Phrases); teach in Basic Nouns - People & Things (position 7). Sentence: "Bonjour ! Je suis Paul. Je suis un homme. J'ai un chat et un chien aussi. Tu es…"

### 12. Unit 1 Practice - Fill in the Blanks

- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before Reading Comprehension - First Paragraph! (position 11). Concept card: "…+ un homme, tu as + une maison, nous avons + les livres, ils sont + très bons"

### 13. Unit 1 Final Exam - Foundation

- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before Reading Comprehension - First Paragraph! (position 11). Concept card: "je suis un homme, tu as une maison, nous avons les livres, ils sont très bons"
- "c'" (fr:lex:ce.pronoun): taught later, at position 14 (Demonstratives - It, That, This); teach in Basic Nouns - People & Things (position 7). Concept card: "c'est..."
- fr:cx:cest: taught later, at position 15 (ça - Survival Phrases); teach in Basic Nouns - People & Things (position 7). Concept card: "c'est..."

## Unit 2: Asking & Describing

### 17. Essential Verb - vouloir (to want)

- "te" (fr:lex:te): taught later, at position 33 (Object Pronouns - Him, Her, It, Them); teach in this module. Sentence: "je veux ça s'il te plaît"
- fr:cx:chunk.sil-te-plait: taught later, at position 40 (Survival Phrases - Real-World Essentials); teach in this module. Sentence: "je veux ça s'il te plaît"
- fr:cx:q.inversion: taught later, at position 20 (Question Words - Ask Anything!); teach in this module. Concept card: "Veux-tu un livre?"

### 18. Essential Verb - pouvoir (can)

- "artiste" (fr:lex:artiste): *artiste* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "elle peut être artiste"
- "te" (fr:lex:te): taught later, at position 33 (Object Pronouns - Him, Her, It, Them); teach in Essential Verb - vouloir (to want) (position 17). Sentence: "je peux avoir ça s'il te plaît"
- fr:cx:chunk.sil-te-plait: taught later, at position 40 (Survival Phrases - Real-World Essentials); teach in Essential Verb - vouloir (to want) (position 17). Sentence: "je peux avoir ça s'il te plaît"
- fr:cx:q.inversion: taught later, at position 20 (Question Words - Ask Anything!); teach in Essential Verb - vouloir (to want) (position 17). Concept card: "Peux-tu être un ami?"

### 19. Essential Verb - voir (to see)

- fr:cx:pronoun.direct-object: taught later, at position 33 (Object Pronouns - Him, Her, It, Them); teach in this module. Concept card: "je le vois"

### 20. Question Words - Ask Anything!

- "de" (fr:lex:de): taught later, at position 23 (Prepositions - Spatial & Relational Words); teach in this module. Sentence: "combien est-ce que tu as de livres"
- fr:cx:article.partitive: taught later, at position 28 (Contractions - du, au, de la, à la); teach in Cognates - French and English Share Many Words (position 6). Sentence: "combien est-ce que tu as de livres"
- "fais" (fr:lex:faire): taught later, at position 41 (Essential Verb - faire (to do/make)); teach in this module. Concept card: "Que fais-tu?"

### 21. The Power to Ask Anything

- "viens" (fr:lex:venir): taught later, at position 29 (Essential Verb - venir (to come)); teach in this module. Help screen: "Quand est-ce que tu viens?"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in this module. Help screen: "Tu viens ce soir"
- "prêt" (fr:lex:pret): not taught anywhere in the course; teach in this module. Help screen: "Tu es prêt"

### 22. Stressed Pronouns - moi, toi, lui...

- "avec" (fr:lex:avec): taught later, at position 23 (Prepositions - Spatial & Relational Words); teach in this module. Sentence: "avec moi"
- "pour" (fr:lex:pour): taught later, at position 23 (Prepositions - Spatial & Relational Words); teach in this module. Sentence: "pour toi"

### 23. Prepositions - Spatial & Relational Words

- "table" (fr:lex:table): *table* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 49 (Everyday Nouns - Life & World); teach in this module, or let the learner read it instead of typing it. Sentence: "le chat est sous la table"
- "porte" (fr:lex:porte): taught later, at position 49 (Everyday Nouns - Life & World); teach in this module. Sentence: "le livre est derrière la porte"
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in this module. Vocabulary note: "entre les deux"

### 25. Reading Comprehension 2 - Rendez-vous en Normandie

- "ma" (fr:lex:mon): taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "ma nouvelle voiture"
- fr:cx:possessive.adjective: taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "ma nouvelle voiture"
- "sa" (fr:lex:son): taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before this module. Sentence: "dans sa voiture"
- "belles" (fr:lex:beau): the word beau is taught at position 24, but this form is not; teach in a lesson before this module. Sentence: "ces belles choses"
- "en" (fr:lex:en): taught later, at position 46 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Sentence: "ces belles choses en Normandie"
- "y" (fr:lex:y.pronoun): taught later, at position 78 (Talking About People in General); teach in a lesson before this module. Sentence: "…? C'est un livre sur la Normandie. Il y a Mont-Saint-Michel, Rouen... Ces…"
- "vieilles" (fr:lex:vieux): the word vieux is taught at position 24, but this form is not; teach in a lesson before this module. Sentence: "…très grand. Nous pouvons voir de vieilles et belles choses aussi ! Et Bayeux…"
- "ville" (fr:lex:ville): taught later, at position 49 (Everyday Nouns - Life & World); teach in a lesson before this module. Sentence: "…? Qu'est-ce que c'est à Bayeux ? La ville a de vieilles et belles maisons.…"
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "…en un jour ? Non, mais nous avons deux jours. Un jour pour Mont-Saint-Michel…"
- fr:cx:article.partitive: taught later, at position 28 (Contractions - du, au, de la, à la); teach in Cognates - French and English Share Many Words (position 6). Sentence: "Bonjour Sophie ! Comment ça va ? Ça va bien ! Je suis à Caen avec un ami Thomas.…"
- fr:cx:il-y-a: taught later, at position 115 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before this module. Sentence: "Bonjour Sophie ! Comment ça va ? Ça va bien ! Je suis à Caen avec un ami Thomas.…"
- "Rendez-vous" (fr:lex:rendez-vous): taught later, at position 141 (donner - To Give); teach in a lesson before this module. Module title: "Rendez-vous en Normandie"
- "venir" (fr:lex:venir): taught later, at position 29 (Essential Verb - venir (to come)); teach in The Power to Ask Anything (position 21). Concept card: "venir"
- "partir" (fr:lex:partir): taught later, at position 32 (Essential Verb - partir (to leave)); teach in a lesson before this module. Concept card: "partir"

## Unit 3: Movement & Possession

### 28. Contractions - du, au, de la, à la

- "pain" (fr:lex:pain): taught later, at position 49 (Everyday Nouns - Life & World); teach in this module. Concept card: "du pain"
- "viande" (fr:lex:viande): taught later, at position 60 (Everyday Food Nouns); teach in this module. Concept card: "de la viande"
- "eau" (fr:lex:eau): taught later, at position 49 (Everyday Nouns - Life & World); teach in this module. Concept card: "de l'eau"
- "école" (fr:lex:ecole): taught later, at position 86 (Knowledge & Learning - Essential Nouns); teach in this module. Concept card: "à l'école"

### 29. Essential Verb - venir (to come)

- "ma" (fr:lex:mon): taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "je viens de ma maison"
- fr:cx:possessive.adjective: taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "je viens de ma maison"
- "son" (fr:lex:son): taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "il vient avec son chat"
- fr:cx:q.qui-est-ce-qui: taught later, at position 156 (qui est-ce qui vs qui est-ce que - Master 'Who' Questions); teach in this module. Sentence: "qui est-ce qui vient?"
- "d'" (fr:lex:de): the word de is taught at position 23, but this form is not; teach in this module. Sentence: "d'où viens-tu?"
- "hôtel" (fr:lex:hotel): *hôtel* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "je peux venir à l'hôtel"
- "te" (fr:lex:te): taught later, at position 33 (Object Pronouns - Him, Her, It, Them); teach in Essential Verb - vouloir (to want) (position 17). Sentence: "je viens te voir"
- "me" (fr:lex:me): taught later, at position 33 (Object Pronouns - Him, Her, It, Them); teach in this module. Sentence: "pourquoi viens-tu me voir?"

### 30. Essential Verb - aller (to go)

- "ma" (fr:lex:mon): taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "nous allons avec ma voiture"
- fr:cx:possessive.adjective: taught later, at position 34 (Possessive Adjectives - My, Your, His, Her); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "nous allons avec ma voiture"
- fr:cx:q.qui-est-ce-que: taught later, at position 156 (qui est-ce qui vs qui est-ce que - Master 'Who' Questions); teach in this module. Sentence: "qui est-ce que tu veux aller?"
- "manger" (fr:lex:manger): taught later, at position 61 (manger - To Eat (Present & Past)); teach in this module. Concept card: "Je vais manger"
- "partir" (fr:lex:partir): taught later, at position 32 (Essential Verb - partir (to leave)); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Concept card: "je vais partir"

### 34. Possessive Adjectives - My, Your, His, Her

- "frère" (fr:lex:frere): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in this module. Concept card: "ton frère"
- "sœur" (fr:lex:sœur): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in this module. Concept card: "ta sœur"
- "bureau" (fr:lex:bureau): not taught anywhere in the course; teach in this module. Concept card: "votre bureau"
- "bagages" (fr:lex:bagage): not taught anywhere in the course; teach in this module. Concept card: "vos bagages"
- "jardin" (fr:lex:jardin): not taught anywhere in the course; teach in this module. Concept card: "notre jardin"

### 37. Reading Comprehension 3 - La Première Page

- "Paix" (fr:lex:paix): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Café de la Paix"
- "Comte" (fr:lex:comte): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Le Comte de Monte-Cristo"
- "rouge" (fr:lex:rouge): not taught anywhere in the course; teach in a lesson before this module. Sentence: "le livre rouge et jaune"
- "jaune" (fr:lex:jaune): not taught anywhere in the course; teach in a lesson before this module. Sentence: "le livre rouge et jaune"
- "Oh" (fr:lex:oh): *Oh* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "Oh pour moi merci"
- "Vingt" (fr:lex:vingt): taught later, at position 140 (Age & Personal Information); teach in a lesson before this module. Sentence: "…! J'ai mon livre de Jules Verne, Vingt mille lieues sous les mers. Il est…"
- "mille" (fr:lex:mille): taught later, at position 140 (Age & Personal Information); teach in a lesson before this module. Sentence: "…mon livre de Jules Verne, Vingt mille lieues sous les mers. Il est nouveau.…"
- "lieues" (fr:lex:lieue): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…livre de Jules Verne, Vingt mille lieues sous les mers. Il est nouveau. Tu…"
- "mers" (fr:lex:mer): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in a lesson before this module. Sentence: "…Verne, Vingt mille lieues sous les mers. Il est nouveau. Tu veux le voir ?…"
- "aujourd'hui" (fr:lex:aujourd-hui): taught later, at position 46 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Sentence: "…Il a son jeune enfant aujourd'hui et il le voit à la maison. C'est…"
- fr:cx:chunk.sil-te-plait: taught later, at position 40 (Survival Phrases - Real-World Essentials); teach in Essential Verb - vouloir (to want) (position 17). Sentence: "Paris, {1871}, Belle Époque Bonjour Marc ! Tu viens au Café de la Paix avec moi…"
- "Première" (fr:lex:premier): not taught anywhere in the course; teach in a lesson before this module. Module title: "La Première Page"
- "Page" (fr:lex:page): not taught anywhere in the course; teach in a lesson before this module. Module title: "La Première Page"

### 38. Unit 3 Practice - Fill in the Blanks

- "demain" (fr:lex:demain): taught later, at position 46 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Sentence: "Nous partons demain."
- "magasin" (fr:lex:magasin): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Elle vient du magasin."
- "maintenant" (fr:lex:maintenant): taught later, at position 46 (Time & Frequency - now, always, never, today); teach in a lesson before this module. Concept card: "je viens au café, tu vas à la maison, il part maintenant"

### 39. Unit 3 Final Exam - Movement & Possession

- "prends" (fr:lex:prendre): taught later, at position 68 (prendre - To Take); teach in a lesson before this module. Concept card: "tu la prends"

## Unit 4: Everyday Words

### 41. Essential Verb - faire (to do/make)

- fr:cx:causative.faire: taught later, at position 132 (Je me fais couper... - Service Phrases); teach in this module. Sentence: "nous lui faisons voir notre maison"
- fr:cx:pronoun.indirect-object: taught later, at position 141 (donner - To Give); teach in this module. Sentence: "nous lui faisons voir notre maison"
- "sport" (fr:lex:sport): *sport* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "je fais du sport"
- "gâteau" (fr:lex:gateau): taught later, at position 60 (Everyday Food Nouns); teach in this module. Sentence: "elle fait un gâteau"
- "devoirs" (fr:lex:devoir.noun): taught later, at position 42 (Essential Verb - devoir (must)); teach in this module. Sentence: "nous faisons nos devoirs"
- "froid" (fr:lex:froid): taught later, at position 135 (Bien que... - Although Phrases); teach in this module. Sentence: "il fait froid"
- "travail" (fr:lex:travail): taught later, at position 49 (Everyday Nouns - Life & World); teach in this module. Concept card: "je fais + ça, nous faisons + le travail, ils font + attention"

### 42. Essential Verb - devoir (must)

- "maintenant" (fr:lex:maintenant): taught later, at position 46 (Time & Frequency - now, always, never, today); teach in a lesson before Unit 3 Practice - Fill in the Blanks (position 38). Sentence: "il doit partir maintenant"

### 43. Essential Verb - parler (to speak)

- "français" (fr:lex:francais): taught later, at position 68 (prendre - To Take); teach in this module. Concept card: "je parle français"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in this module. Concept card: "nous parlons ensemble"

### 44. Essential Verbs - chercher & trouver

- "clés" (fr:lex:cle): taught later, at position 143 (Search & Find - chercher, trouver); teach in this module. Concept card: "je cherche mes clés"
- "trouvé" (fr:lex:trouver): the word trouver is taught at position 44, but this form is not; teach in this module. Concept card: "j'ai trouvé!"
- fr:cx:passe-compose.avoir: taught later, at position 61 (manger - To Eat (Present & Past)); teach in this module. Concept card: "j'ai trouvé!"

### 46. Time & Frequency - now, always, never, today

- "ici" (fr:lex:ici): taught later, at position 48 (Location Adverbs - here, there, everywhere); teach in this module. Sentence: "nous sommes toujours ici"
- "mange" (fr:lex:manger): taught later, at position 61 (manger - To Eat (Present & Past)); teach in Essential Verb - aller (to go) (position 30). Sentence: "je mange parfois"

### 47. Negation Part 2 - I can't, I won't, I never

- "ici" (fr:lex:ici): taught later, at position 48 (Location Adverbs - here, there, everywhere); teach in Time & Frequency - now, always, never, today (position 46). Sentence: "ils ne sont pas ici"

### 49. Everyday Nouns - Life & World

- fr:cx:neg.de: not taught anywhere in the course; teach in this module. Sentence: "il n'a pas d'argent"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in this module. Sentence: "je dois travailler"
- "vit" (fr:lex:vivre): taught later, at position 142 (Daily Life Essentials - Sleep, Work, Live); teach in this module. Sentence: "elle vit dans la ville"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in this module. Sentence: "elle habite dans la ville"
- "payer" (fr:lex:payer): *payer* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "je veux payer avec la carte de crédit"

### 50. Reading Comprehension 4 - La nouvelle époque de Marie

- "jardin" (fr:lex:jardin): not taught anywhere in the course; teach in Possessive Adjectives - My, Your, His, Her (position 34). Sentence: "jardin du luxembourg"
- "paie" (fr:lex:payer): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "moi je paie"
- "Éditeurs" (fr:lex:editeur): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Les Éditeurs"
- "carrefour" (fr:lex:carrefour): not taught anywhere in the course; teach in a lesson before this module. Sentence: "carrefour de l'Odéon"
- "aime" (fr:lex:aimer): taught later, at position 57 (aimer - To Like / To Love); teach in a lesson before this module. Sentence: "Marie aime cette ville"
- "saint" (fr:lex:saint): *saint* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "saint germain"
- "matin" (fr:lex:matin): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…! Je vais toujours au travail le matin. Mais ce soir, je ne vais pas au…"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "…au travail le matin. Mais ce soir, je ne vais pas au travail. Ah bon !…"
- "alors" (fr:lex:alors): taught later, at position 87 (Discourse Markers - Sound Like a Native); teach in a lesson before this module. Sentence: "…pas au travail. Ah bon ! Ce soir alors ! Tu veux venir à Saint-Germain ce…"
- "gentil" (fr:lex:gentil): taught later, at position 102 (Irregular Commands - être, avoir, aller, faire); teach in a lesson before this module. Sentence: "…non ! Je ne veux pas ça. Tu es très gentil, mais je vais payer avec ma carte.…"
- "six" (fr:lex:six): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…ma carte. Ça va. Alors, ce soir à six heures ? Oui ! Quel café à…"
- "heures" (fr:lex:heure): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before this module. Sentence: "…carte. Ça va. Alors, ce soir à six heures ? Oui ! Quel café à Saint-Germain ?…"
- "voudrions" (fr:lex:vouloir): the word vouloir is taught at position 17, but this form is not; teach in a lesson before this module. Sentence: "…Qu'est-ce que vous voulez ? Nous voudrions du pain et de l'eau, s'il vous…"
- "Miam" (fr:lex:miam): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…plaît. Du pain et de l'eau. Voilà ! Miam ! Le pain est très bon ici. C'est…"
- "meilleur" (fr:lex:meilleur): taught later, at position 53 (Comparisons & Intensity); teach in a lesson before this module. Sentence: "…aux autres cafés. Ce café est le meilleur ! Tu parles bien français, Paul.…"
- "français" (fr:lex:francais): taught later, at position 68 (prendre - To Take); teach in Essential Verb - parler (to speak) (position 43). Sentence: "…est le meilleur ! Tu parles bien français, Paul. Moi, je ne parle pas…"
- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before Reading Comprehension - First Paragraph! (position 11). Sentence: "…! Oui ! Nous pouvons être de bons amis ! Et tu vas voir, la vie ici est…"
- "Mmmh" (fr:lex:mmmh): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…vas voir, la vie ici est très bonne. Mmmh! J'aime cette ville. Je ne vais…"
- "manger" (fr:lex:manger): taught later, at position 61 (manger - To Eat (Present & Past)); teach in Essential Verb - aller (to go) (position 30). Sentence: "…partir ! Bon ! Maintenant tu dois manger ton pain ! Oui ! Merci Paul. Tu es…"
- "Fin" (fr:lex:fin): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before this module. Sentence: "…tu dois manger ton pain ! Oui ! Merci Paul. Tu es un très bon ami. Fin!"
- fr:cx:comparative.irregular: taught later, at position 53 (Comparisons & Intensity); teach in a lesson before this module. Sentence: "Marie ! Tu veux aller au Jardin du Luxembourg avec moi ? Oui ! Mais je ne peux…"
- fr:cx:conditionnel-present: taught later, at position 55 (Should & Could - Advice and Possibility); teach in a lesson before this module. Sentence: "Marie ! Tu veux aller au Jardin du Luxembourg avec moi ? Oui ! Mais je ne peux…"
- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Marie ! Tu veux aller au Jardin du Luxembourg avec moi ? Oui ! Mais je ne peux…"
- fr:cx:superlative: taught later, at position 53 (Comparisons & Intensity); teach in a lesson before this module. Sentence: "Marie ! Tu veux aller au Jardin du Luxembourg avec moi ? Oui ! Mais je ne peux…"

### 51. Unit 4 Practice - Fill in the Blanks

- "français" (fr:lex:francais): taught later, at position 68 (prendre - To Take); teach in Essential Verb - parler (to speak) (position 43). Sentence: "Nous parlons français."
- "vu" (fr:lex:voir): the word voir is taught at position 19, but this form is not; teach in a lesson before this module. Sentence: "Tu as vu ça hier."
- fr:cx:passe-compose.avoir: taught later, at position 61 (manger - To Eat (Present & Past)); teach in Essential Verbs - chercher & trouver (position 44). Sentence: "Tu as vu ça hier."
- "sais" (fr:lex:savoir.verb): taught later, at position 78 (Talking About People in General); teach in a lesson before this module. Concept card: "je ne sais pas"
- fr:cx:chunk.je-ne-sais-pas: taught later, at position 82 (savoir - To Know (Facts/Skills)); teach in a lesson before this module. Concept card: "je ne sais pas"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before this module. Concept card: "s'il vous plaît, excusez-moi, merci beaucoup"

### 52. Unit 4 Final Exam - Expression

- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "merci beaucoup"
- "français" (fr:lex:francais): taught later, at position 68 (prendre - To Take); teach in Essential Verb - parler (to speak) (position 43). Sentence: "je parle français"
- "mange" (fr:lex:manger): taught later, at position 61 (manger - To Eat (Present & Past)); teach in Essential Verb - aller (to go) (position 30). Sentence: "je ne mange jamais"
- "bas" (fr:lex:bas): not taught anywhere in the course; teach in a lesson before this module. Sentence: "là bas"
- "sais" (fr:lex:savoir.verb): taught later, at position 78 (Talking About People in General); teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Concept card: "…excusez-moi, je fais, tu dois, il parle, je ne sais pas, maintenant, ici, là"
- fr:cx:chunk.je-ne-sais-pas: taught later, at position 82 (savoir - To Know (Facts/Skills)); teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Concept card: "s'il vous plaît, excusez-moi, je fais, tu dois, il parle, je ne sais pas,…"

## Unit 5: Time & Taste

### 53. Comparisons & Intensity

- "cher" (fr:lex:cher): not taught anywhere in the course; teach in this module. Sentence: "c'est trop cher"

### 54. Slang - Comparisons & Intensity

- "fou" (fr:lex:fou): not taught anywhere in the course; teach in this module. Concept card: "fou"

### 55. Should & Could - Advice and Possibility

- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Sentence: "il devrait travailler"
- "m'" (fr:lex:me): the word me is taught at position 33, but this form is not; teach in this module. Sentence: "est-ce que tu pourrais m'aider"
- "aider" (fr:lex:aider): *aider* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "est-ce que tu pourrais m'aider"

### 57. aimer - To Like / To Love

- "français" (fr:lex:francais): taught later, at position 68 (prendre - To Take); teach in Essential Verb - parler (to speak) (position 43). Sentence: "j'aime parler français"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Sentence: "nous aimons travailler"
- "mère" (fr:lex:mere): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in this module. Concept card: "j'aime ma mère"

### 58. être - Past Tense (was / were)

- "content" (fr:lex:content): *content* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "j'étais content"
- "contente" (fr:lex:content): *contente* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "j'étais contente"
- "contents" (fr:lex:content): *contents* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "nous étions contents"
- "contentes" (fr:lex:content): *contentes* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "elles étaient contentes"
- "heureux" (fr:lex:heureux): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Concept card: "j'étais heureux"

### 59. avoir - Past Tense (had)

- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "je n'avais pas de chat"

### 61. manger - To Eat (Present & Past)

- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "nous mangeons ensemble"
- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "je ne mange pas de viande"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in this module. Concept card: "Passé Composé"

### 62. boire - To Drink (Present & Past)

- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "je ne bois pas de café"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 61). Concept card: "Passé Composé"

### 63. Reading Comprehension 5 - La fée verte (The Green Fairy)

- "absinthe" (fr:lex:absinthe): *absinthe* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "absinthe"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "le soir"
- "couleurs" (fr:lex:couleur): *couleurs* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "couleurs"
- "hôtel" (fr:lex:hotel): *hôtel* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Essential Verb - venir (to come) (position 29), or let the learner read it instead of typing it. Sentence: "hôtel"
- "étoiles" (fr:lex:etoile): not taught anywhere in the course; teach in a lesson before this module. Sentence: "étoiles"
- "gens" (fr:lex:gens): taught later, at position 78 (Talking About People in General); teach in a lesson before this module. Sentence: "les gens"
- "artiste" (fr:lex:artiste): *artiste* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Essential Verb - pouvoir (can) (position 18), or let the learner read it instead of typing it. Sentence: "Tu es un grand artiste"
- "dit" (fr:lex:dire): taught later, at position 67 (dire - To Say / To Tell); teach in a lesson before this module. Sentence: "« Salut Vincent ! » dit Paul. « Salut Paul, mon ami ! » dit Vincent. « Comment…"
- "demande" (fr:lex:demande): taught later, at position 71 (demander - To Ask); teach in a lesson before this module. Sentence: "…» dit Vincent. « Comment ça va ? » demande Paul. « Bien, et toi ? » « Très…"
- "regarde" (fr:lex:regarder): taught later, at position 100 (Commands - tu form (Informal)); teach in a lesson before this module. Sentence: "…l'absinthe, » dit Paul. Vincent regarde autour du café. « Ce café est très…"
- "autour" (fr:lex:autour): taught later, at position 109 (More Spatial Relations - Distance & Proximity); teach in a lesson before this module. Sentence: "…» dit Paul. Vincent regarde autour du café. « Ce café est très beau, »…"
- "belles" (fr:lex:beau): the word beau is taught at position 24, but this form is not; teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "…le soir. Et les étoiles sont belles. » « Excusez-moi, » dit Vincent. «…"
- "peintures" (fr:lex:peinture): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…à mon hôtel. Je vais chercher mes peintures. » « Maintenant ? » demande Paul. «…"
- "Deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "…Ah, j'adore ça ! » dit Paul. --- ## Deux heures plus tard Vincent fait son…"
- "heures" (fr:lex:heure): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "…ça ! » dit Paul. --- ## Deux heures plus tard Vincent fait son tableau.…"
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before this module. Sentence: "…» dit Paul. --- ## Deux heures plus tard Vincent fait son tableau. Paul boit…"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "…mon café préféré. » Ils boivent beaucoup de leurs absinthes. Vincent…"
- "sourit" (fr:lex:sourire): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…que tes autres tableaux. » Vincent sourit. « Peut-être. Nous allons voir. »…"
- "Peut-être" (fr:lex:peut-etre): taught later, at position 87 (Discourse Markers - Sound Like a Native); teach in a lesson before this module. Sentence: "…tableaux. » Vincent sourit. « Peut-être. Nous allons voir. » C'est une…"
- "appelle" (fr:lex:appeler): taught later, at position 94 (s'appeler - To Be Called (Your Name!)); teach in a lesson before this module. Sentence: "…une bonne nuit à Arles. « Je l'appelle : Terrasse du café le soir, » dit…"
- "Fin" (fr:lex:fin): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "…nuit à Arles. « Je l'appelle : Terrasse du café le soir, » dit Vincent. Fin."
- fr:cx:chunk.nest-ce-pas: taught later, at position 159 (Rhetorical & Negative Questions - Advanced Style); teach in a lesson before this module. Sentence: "« Salut Vincent ! » dit Paul. « Salut Paul, mon ami ! » dit Vincent. « Comment…"
- "verte" (fr:lex:vert): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in a lesson before this module. Module title: "La fée verte"
- "passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 61). Vocabulary note: "passé composé"
- "retrouvent" (fr:lex:retrouver): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…van Gogh et Paul Gauguin se retrouvent à leur café préféré pour boire…"
- "vertes" (fr:lex:vert): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in a lesson before this module. Sentence: "…boisson favorite, l'absinthe. On dit parfois qu'elle fait voir des fées vertes."
- fr:cx:causative.faire: taught later, at position 132 (Je me fais couper... - Service Phrases); teach in Essential Verb - faire (to do/make) (position 41). Sentence: "La ville d'Arles. Vincent van Gogh et Paul Gauguin se retrouvent à leur café…"
- fr:cx:pronoun.reflexive: taught later, at position 93 (Reflexive Pronouns - me, te, se, nous, vous); teach in a lesson before this module. Sentence: "La ville d'Arles. Vincent van Gogh et Paul Gauguin se retrouvent à leur café…"

### 64. Unit 5 Practice - Fill in the Blanks

- "cher" (fr:lex:cher): not taught anywhere in the course; teach in Comparisons & Intensity (position 53). Sentence: "C'est trop cher!"
- fr:cx:relative.ou: not taught anywhere in the course; teach in a lesson before this module. Sentence: "C'est le même restaurant où nous avons mangé."
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "Nous mangeons ensemble."
- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Je ne mange pas de viande."
- "venu" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in a lesson before this module. Concept card: "je suis venu"
- fr:cx:passe-compose.etre: taught later, at position 113 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in a lesson before this module. Concept card: "je suis venu"
- "préfère" (fr:lex:preferer): not taught anywhere in the course; teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Concept card: "je préfère"

### 65. Unit 5 Final Exam - Sophistication

- "cher" (fr:lex:cher): not taught anywhere in the course; teach in Comparisons & Intensity (position 53). Sentence: "trop cher"
- "contents" (fr:lex:content): *contents* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in être - Past Tense (was / were) (position 58), or let the learner read it instead of typing it. Sentence: "ils étaient contents"
- "restaurant" (fr:lex:restaurant): *restaurant* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "nous avons bu du vin au restaurant"
- "content" (fr:lex:content): *content* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in être - Past Tense (was / were) (position 58), or let the learner read it instead of typing it. Sentence: "j'étais très content hier"
- "contente" (fr:lex:content): *contente* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in être - Past Tense (was / were) (position 58), or let the learner read it instead of typing it. Sentence: "j'étais très contente hier"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "nous mangeons ensemble"
- fr:cx:si.present: not taught anywhere in the course; teach in a lesson before this module. Concept card: "j'aime le pain, c'est plus bon, si tu veux, j'ai mangé, nous avons bu, hier,…"
- "venu" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in a lesson before Unit 5 Practice - Fill in the Blanks (position 64). Concept card: "il est venu"
- fr:cx:passe-compose.etre: taught later, at position 113 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in a lesson before Unit 5 Practice - Fill in the Blanks (position 64). Concept card: "il est venu"
- "matin" (fr:lex:matin): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Concept card: "matin"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Concept card: "soir"
- "fou" (fr:lex:fou): not taught anywhere in the course; teach in Slang - Comparisons & Intensity (position 54). Hint: "fou"

## Unit 6: Basic Fluency

### 66. Progressive & Future - Expressing Time

- "viendrons" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in this module. Sentence: "nous viendrons"
- "irai" (fr:lex:aller): the word aller is taught at position 15, but this form is not; teach in this module. Sentence: "j'irai"
- "fera" (fr:lex:faire): the word faire is taught at position 41, but this form is not; teach in this module. Sentence: "il ne le fera pas"
- "allais" (fr:lex:aller): the word aller is taught at position 15, but this form is not; teach in this module. Sentence: "j'allais partir"
- "pourrons" (fr:lex:pouvoir): the word pouvoir is taught at position 18, but this form is not; teach in this module. Sentence: "nous ne pourrons pas venir"

### 67. dire - To Say / To Tell

- "vérité" (fr:lex:verite): not taught anywhere in the course; teach in this module. Sentence: "tu dis la vérité"
- "histoire" (fr:lex:histoire): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in this module. Sentence: "nous disons une histoire"
- "vrai" (fr:lex:vrai): taught later, at position 126 (Je pense que... - Opinion Phrases); teach in this module. Sentence: "ils disent que c'est vrai"
- "m'" (fr:lex:me): the word me is taught at position 33, but this form is not; teach in Should & Could - Advice and Possibility (position 55). Sentence: "tu m'as dit"
- fr:cx:pronoun.indirect-object: taught later, at position 141 (donner - To Give); teach in Essential Verb - faire (to do/make) (position 41). Concept card: "il lui dit"

### 68. prendre - To Take

- "vite" (fr:lex:vite): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in this module. Sentence: "tu apprends vite"
- "apprend" (fr:lex:apprendre): the word apprendre is taught at position 68, but this form is not; teach in this module. Sentence: "elle apprend l'anglais"
- "anglais" (fr:lex:anglais): not taught anywhere in the course; teach in this module. Sentence: "elle apprend l'anglais"
- "apprenons" (fr:lex:apprendre): the word apprendre is taught at position 68, but this form is not; teach in this module. Sentence: "nous apprenons ensemble"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "nous apprenons ensemble"
- "comprend" (fr:lex:comprendre): the word comprendre is taught at position 68, but this form is not; teach in this module. Sentence: "il comprend le français"
- "comprenons" (fr:lex:comprendre): the word comprendre is taught at position 68, but this form is not; teach in this module. Sentence: "nous comprenons la question"
- "question" (fr:lex:question): *question* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in this module, or let the learner read it instead of typing it. Sentence: "nous comprenons la question"
- "comprennent" (fr:lex:comprendre): the word comprendre is taught at position 68, but this form is not; teach in this module. Sentence: "ils ne comprennent pas"
- "pris" (fr:lex:prendre): the word prendre is taught at position 68, but this form is not; teach in this module. Sentence: "j'ai pris le bus"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "j'ai beaucoup appris"
- "appris" (fr:lex:apprendre): the word apprendre is taught at position 68, but this form is not; teach in this module. Sentence: "j'ai beaucoup appris"
- fr:cx:imperative.pronouns: taught later, at position 103 (Commands with Pronouns); teach in this module. Sentence: "prends-le"
- fr:cx:imperative.tu: taught later, at position 100 (Commands - tu form (Informal)); teach in this module. Sentence: "prends-le"
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Concept card: "ça prend deux heures"
- "heures" (fr:lex:heure): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Concept card: "ça prend deux heures"

### 69. donner - To Give

- "rien" (fr:lex:rien): not taught anywhere in the course; teach in this module. Sentence: "il ne donne rien"
- fr:cx:neg.ne-rien: not taught anywhere in the course; teach in this module. Sentence: "il ne donne rien"
- fr:cx:imperative.pronouns: taught later, at position 103 (Commands with Pronouns); teach in prendre - To Take (position 68). Sentence: "donne-moi"
- fr:cx:imperative.tu: taught later, at position 100 (Commands - tu form (Informal)); teach in prendre - To Take (position 68). Sentence: "donne-moi"

### 70. mettre - To Put / To Set

- "sac" (fr:lex:sac): *sac* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "elle met son sac dans la voiture"
- "chemise" (fr:lex:chemise): not taught anywhere in the course; teach in this module. Sentence: "il met une chemise"
- "chaussures" (fr:lex:chaussure): not taught anywhere in the course; teach in this module. Sentence: "nous mettons nos chaussures"
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "ça met deux heures"
- "heures" (fr:lex:heure): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "ça met deux heures"
- "mis" (fr:lex:mettre): the word mettre is taught at position 70, but this form is not; teach in this module. Sentence: "j'ai mis"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "je me mets à travailler"
- fr:cx:pronoun.reflexive: taught later, at position 93 (Reflexive Pronouns - me, te, se, nous, vous); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Concept card: "je me mets à travailler"

### 71. demander - To Ask

- "père" (fr:lex:pere): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in this module. Sentence: "tu demandes à ton père"
- "mère" (fr:lex:mere): taught later, at position 74 (Essential Vocabulary - Time, People & Ideas); teach in aimer - To Like / To Love (position 57). Sentence: "il demande à sa mère"
- "attendre" (fr:lex:attendre): taught later, at position 145 (Social Situations - Wait, Arrive, Stay); teach in this module. Sentence: "elle nous demande d'attendre"
- "aider" (fr:lex:aider): *aider* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Should & Could - Advice and Possibility (position 55), or let the learner read it instead of typing it. Sentence: "ils te demandent d'aider"
- "m'" (fr:lex:me): the word me is taught at position 33, but this form is not; teach in Should & Could - Advice and Possibility (position 55). Sentence: "tu m'as demandé"
- fr:cx:q.embedded: taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in this module. Concept card: "tu demandes pourquoi?"

### 72. commander - To Order

- "steak" (fr:lex:steak): *steak* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "il commande un steak"
- "menu" (fr:lex:menu): *menu* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "nous commandons le menu"
- "dessert" (fr:lex:dessert): *dessert* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "ils commandent le dessert"
- "par" (fr:lex:par): taught later, at position 144 (Perception Verbs - écouter, regarder); teach in this module. Sentence: "nous commandons par téléphone"
- "téléphone" (fr:lex:telephone): *téléphone* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "nous commandons par téléphone"

### 73. avoir besoin de - To Need

- "sommeil" (fr:lex:sommeil): not taught anywhere in the course; teach in this module. Sentence: "vous avez besoin de sommeil"
- "espace" (fr:lex:espace): not taught anywhere in the course; teach in this module. Sentence: "ils ont besoin d'espace"
- "dormir" (fr:lex:dormir): taught later, at position 142 (Daily Life Essentials - Sleep, Work, Live); teach in this module. Sentence: "j'ai besoin de dormir"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Sentence: "elle a besoin de travailler"

### 74. Essential Vocabulary - Time, People & Ideas

- "longue" (fr:lex:long): taught later, at position 109 (More Spatial Relations - Distance & Proximity); teach in this module. Sentence: "c'est une longue histoire"

### 75. Reading Comprehension 6 - Un Voyage en Famille

- "trois" (fr:lex:trois): not taught anywhere in the course; teach in a lesson before this module. Sentence: "trois heures"
- "Tour" (fr:lex:tour): not taught anywhere in the course; teach in a lesson before this module. Sentence: "la Tour Eiffel"
- "mots" (fr:lex:mot): not taught anywhere in the course; teach in a lesson before this module. Sentence: "apprendre quelques mots en français"
- "semaine" (fr:lex:semaine): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Paris. Nous allons partir dans une semaine! Super! Qu'est-ce que je vais…"
- "prix" (fr:lex:prix): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…fromage. J'ai besoin de demander le prix. Papa, qu'est-ce que tu me dis…"
- "vrai" (fr:lex:vrai): taught later, at position 126 (Je pense que... - Opinion Phrases); teach in dire - To Say / To Tell (position 67). Sentence: "…la plus belle ville du monde!" C'est vrai! Tu vas voir la Tour Eiffel pour la…"
- "première" (fr:lex:premier): not taught anywhere in the course; teach in a lesson before Reading Comprehension 3 - La Première Page (position 37). Sentence: "…Tu vas voir la Tour Eiffel pour la première fois! Je suis très contente! Mon…"
- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before Reading Comprehension - First Paragraph! (position 11). Sentence: "…allons voir la ville, manger dans de bons restaurants, et parler français…"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "…restaurants, et parler français beaucoup. J'ai besoin d'apprendre quelques…"
- fr:cx:chunk.bien-sur: taught later, at position 87 (Discourse Markers - Sound Like a Native); teach in a lesson before this module. Sentence: "Papa, qu'est-ce que tu fais? Je suis en train de prendre le train pour Paris.…"

### 76. Unit 6 Practice - Fill in the Blanks

- "vérité" (fr:lex:verite): not taught anywhere in the course; teach in dire - To Say / To Tell (position 67). Sentence: "Tu dis la vérité."
- "apprenons" (fr:lex:apprendre): the word apprendre is taught at position 68, but this form is not; teach in prendre - To Take (position 68). Sentence: "Nous apprenons ensemble."
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "Nous apprenons ensemble."
- "prix" (fr:lex:prix): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "Tu demandes le prix?"
- "gentil" (fr:lex:gentil): taught later, at position 102 (Irregular Commands - être, avoir, aller, faire); teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "Mon père est gentil."
- "dix" (fr:lex:dix): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Mon frère a dix ans."
- "ans" (fr:lex:an): taught later, at position 140 (Age & Personal Information); teach in Articles - The, A, An (position 5). Sentence: "Mon frère a dix ans."
- "première" (fr:lex:premier): not taught anywhere in the course; teach in a lesson before Reading Comprehension 3 - La Première Page (position 37). Sentence: "C'est la première fois."
- "semaine" (fr:lex:semaine): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "Une semaine a sept jours."
- "sept" (fr:lex:sept): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Une semaine a sept jours."
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "…en train de manger, tu es en train de parler, il est en train de travailler"

### 77. Unit 6 Final Exam - Communication

- fr:cx:imperative.pronouns: taught later, at position 103 (Commands with Pronouns); teach in prendre - To Take (position 68). Sentence: "donne-moi ta main, s'il te plaît"
- fr:cx:imperative.tu: taught later, at position 100 (Commands - tu form (Informal)); teach in prendre - To Take (position 68). Sentence: "donne-moi ta main, s'il te plaît"
- "semaine" (fr:lex:semaine): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "la semaine"
- "mot" (fr:lex:mot): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "le mot"
- "comprend" (fr:lex:comprendre): the word comprendre is taught at position 68, but this form is not; teach in prendre - To Take (position 68). Sentence: "il ne comprend pas la question"
- "trois" (fr:lex:trois): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "ça prend trois heures"
- "première" (fr:lex:premier): not taught anywhere in the course; teach in a lesson before Reading Comprehension 3 - La Première Page (position 37). Sentence: "la première fois"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "il est en train de travailler"

## Unit 7: Knowledge & Learning

### 78. Talking About People in General

- "étudier" (fr:lex:etudier): taught later, at position 79 (Studying & Reviewing - étudier & réviser); teach in Essential Verb - être (to be) (position 3). Sentence: "on doit étudier"
- "apprend" (fr:lex:apprendre): the word apprendre is taught at position 68, but this form is not; teach in prendre - To Take (position 68). Sentence: "on apprend en pratiquant"
- "pratiquant" (fr:lex:pratiquer): *pratiquant* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 131 (En mangeant... - While Doing Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "on apprend en pratiquant"
- fr:cx:gerondif: taught later, at position 131 (En mangeant... - While Doing Phrases); teach in this module. Sentence: "on apprend en pratiquant"
- "croire" (fr:lex:croire): taught later, at position 85 (croire - To Believe); teach in this module. Sentence: "on doit croire"
- "gentils" (fr:lex:gentil): taught later, at position 102 (Irregular Commands - être, avoir, aller, faire); teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Concept card: "les gens sont gentils"
- "faisant" (fr:lex:faire): the word faire is taught at position 41, but this form is not; teach in this module. Concept card: "On apprend en faisant des erreurs"
- "erreurs" (fr:lex:erreur): not taught anywhere in the course; teach in this module. Concept card: "On apprend en faisant des erreurs"

### 79. Studying & Reviewing - étudier & réviser

- "université" (fr:lex:universite): *université* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 86 (Knowledge & Learning - Essential Nouns); teach in this module, or let the learner read it instead of typing it. Sentence: "tu étudies à l'université"
- "examen" (fr:lex:examen): *examen* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "elle révise pour l'examen"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "nous étudions ensemble"
- "sais" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Concept card: "je sais"
- "pendant" (fr:lex:pendant): taught later, at position 92 (Temporal & Sequential Words - Time & Order); teach in this module. Concept card: "j'étudie pendant 2 heures"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Concept card: "j'apprends beaucoup"
- "crois" (fr:lex:croire): taught later, at position 85 (croire - To Believe); teach in Talking About People in General (position 78). Concept card: "je crois"

### 80. Learning & Teaching - apprendre & enseigner

- "m'" (fr:lex:me): the word me is taught at position 33, but this form is not; teach in Should & Could - Advice and Possibility (position 55). Sentence: "tu m'enseignes"
- "anglais" (fr:lex:anglais): not taught anywhere in the course; teach in prendre - To Take (position 68). Sentence: "il apprend l'anglais"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "nous apprenons ensemble"
- "université" (fr:lex:universite): *université* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 86 (Knowledge & Learning - Essential Nouns); teach in Studying & Reviewing - étudier & réviser (position 79), or let the learner read it instead of typing it. Sentence: "ils enseignent à l'université"
- "sais" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Concept card: "je sais"
- "nager" (fr:lex:nager): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in this module. Concept card: "j'apprends à nager"

### 82. savoir - To Know (Facts/Skills)

- "nager" (fr:lex:nager): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in Learning & Teaching - apprendre & enseigner (position 80). Concept card: "je sais nager"
- "connais" (fr:lex:connaitre): taught later, at position 83 (connaître - To Know (People/Places)); teach in this module. Concept card: "je connais Marie"

### 85. croire - To Believe

- "vrai" (fr:lex:vrai): taught later, at position 126 (Je pense que... - Opinion Phrases); teach in dire - To Say / To Tell (position 67). Concept card: "je crois que c'est vrai"

### 87. Discourse Markers - Sound Like a Native

- "commence" (fr:lex:commencer): *commence* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 129 (J'avais déjà... - Had Already Done Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "bon, on commence"
- "prêt" (fr:lex:pret): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "je suis presque prêt"

### 89. Reading 7 - L'Art d'Apprendre

- "poser" (fr:lex:poser): not taught anywhere in the course; teach in a lesson before this module. Sentence: "poser des questions"
- "mieux" (fr:lex:mieux): not taught anywhere in the course; teach in a lesson before this module. Sentence: "on comprend mieux"
- "soi" (fr:lex:soi): not taught anywhere in the course; teach in a lesson before this module. Sentence: "soi"
- "méthode" (fr:lex:methode): *méthode* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "c'est une question de méthode"
- "voyage" (fr:lex:voyager): *voyage* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 127 (Si j'étais... - Daydreaming & Hypotheticals); teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "un voyage"
- fr:cx:imperative.vous: taught later, at position 101 (Commands - vous form (Formal/Plural)); teach in a lesson before this module. Sentence: "comprenez mes idées"
- "bonnes" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before this module. Sentence: "…Donc, les questions sont très bonnes pour apprendre. Mais étudier, ce…"
- "pendant" (fr:lex:pendant): taught later, at position 92 (Temporal & Sequential Words - Time & Order); teach in Studying & Reviewing - étudier & réviser (position 79). Sentence: "…qu'apprendre. Je peux étudier pendant des heures, mais si je ne comprends…"
- "vraiment" (fr:lex:vraiment): taught later, at position 130 (vraiment, sérieusement... - Common Adverbs); teach in a lesson before this module. Sentence: "…comprends pas, je n'apprends pas vraiment. L'apprentissage, c'est quand je…"
- "Voici" (fr:lex:voici): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…comment est-ce qu'on apprend bien? Voici mes pensées: D'abord, on doit…"
- "abord" (fr:lex:abord): taught later, at position 92 (Temporal & Sequential Words - Time & Order); teach in a lesson before this module. Sentence: "…apprend bien? Voici mes pensées: D'abord, on doit demander des questions.…"
- "Ensuite" (fr:lex:ensuite): taught later, at position 92 (Temporal & Sequential Words - Time & Order); teach in a lesson before this module. Sentence: "…ne pense pas, on ne comprend pas. Ensuite, on doit étudier bien. On ne peut…"
- "Après" (fr:lex:apres): taught later, at position 92 (Temporal & Sequential Words - Time & Order); teach in a lesson before this module. Sentence: "…mal. L'étude demande du temps. Après, on doit réviser. La révision est…"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "…on ne va pas apprendre. Je connais beaucoup d'étudiants. Certains pensent…"
- "étudiants" (fr:lex:etudiant): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "…apprendre. Je connais beaucoup d'étudiants. Certains pensent qu'ils ne sont…"
- "Certains" (fr:lex:certain): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Je connais beaucoup d'étudiants. Certains pensent qu'ils ne sont pas bons en…"
- "bons" (fr:lex:bon): the word bon is taught at position 1, but this form is not; teach in a lesson before Reading Comprehension - First Paragraph! (position 11). Sentence: "…Certains pensent qu'ils ne sont pas bons en apprentissage. Mais en fait, tout…"
- "peu" (fr:lex:peu): taught later, at position 135 (Bien que... - Although Phrases); teach in a lesson before this module. Sentence: "…beaucoup. Je sais parler un peu. Je connais des mots, des phrases, des…"
- "mots" (fr:lex:mot): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "…sais parler un peu. Je connais des mots, des phrases, des idées. Donc,…"
- "phrases" (fr:lex:phrase): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…un peu. Je connais des mots, des phrases, des idées. Donc, l'apprentissage…"
- "preuve" (fr:lex:preuve): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Vous comprenez mes idées. C'est la preuve que vous pouvez apprendre. Vous le…"
- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Qu'est-ce que l'apprentissage? En fait, c'est une grande question. Tout le monde…"
- fr:cx:si.present: not taught anywhere in the course; teach in a lesson before Unit 5 Final Exam - Sophistication (position 65). Sentence: "Qu'est-ce que l'apprentissage? En fait, c'est une grande question. Tout le monde…"
- fr:cx:subj.ne-pas-penser-que: taught later, at position 126 (Je pense que... - Opinion Phrases); teach in a lesson before this module. Sentence: "Qu'est-ce que l'apprentissage? En fait, c'est une grande question. Tout le monde…"

### 90. Unit 7 Practice - Fill in the Blanks

- "soi" (fr:lex:soi): not taught anywhere in the course; teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "On doit croire en soi."

### 91. Unit 7 Final Exam - Knowledge & Learning

- "restaurant" (fr:lex:restaurant): *restaurant* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Unit 5 Final Exam - Sophistication (position 65), or let the learner read it instead of typing it. Sentence: "tu connais ce restaurant"
- "soi" (fr:lex:soi): not taught anywhere in the course; teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "on doit croire en soi"
- "parce" (fr:lex:parce): taught later, at position 107 (Causal & Reason Words - Explaining Why); teach in a lesson before this module. Sentence: "je révise mes leçons parce que j'ai un examen"
- "examen" (fr:lex:examen): *examen* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Studying & Reviewing - étudier & réviser (position 79), or let the learner read it instead of typing it. Sentence: "je révise mes leçons parce que j'ai un examen"
- fr:cx:chunk.parce-que: taught later, at position 107 (Causal & Reason Words - Explaining Why); teach in a lesson before this module. Sentence: "je révise mes leçons parce que j'ai un examen"
- "étudiant" (fr:lex:etudier): the word étudier is taught at position 79, but this form is not; teach in Essential Verb - être (to be) (position 3). Concept card: "étudiant"
- "langue" (fr:lex:langue): not taught anywhere in the course; teach in a lesson before this module. Concept card: "langue"
- "anglais" (fr:lex:anglais): not taught anywhere in the course; teach in prendre - To Take (position 68). Concept card: "anglais"
- "mathématiques" (fr:lex:mathematiques): not taught anywhere in the course; teach in a lesson before this module. Concept card: "mathématiques"

## Unit 8: Daily Life & Actions

### 92. Temporal & Sequential Words - Time & Order

- "dîner" (fr:lex:diner): not taught anywhere in the course; teach in this module. Concept card: "après le dîner"

### 94. s'appeler - To Be Called (Your Name!)

- "étudiants" (fr:lex:etudiant): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "ils s'appellent les étudiants"

### 95. Morning Routine - se réveiller, se lever

- "sept" (fr:lex:sept): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "je me réveille à sept heures"
- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in this module. Sentence: "tu te réveilles tôt"
- "huit" (fr:lex:huit): not taught anywhere in the course; teach in this module. Sentence: "elle se lève à huit heures"
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Concept card: "tu te lèves tard"

### 97. Daily Actions - se souvenir, s'amuser, se dépêcher

- fr:cx:imperative.pronouns: taught later, at position 103 (Commands with Pronouns); teach in prendre - To Take (position 68). Concept card: "dépêche-toi!"
- fr:cx:imperative.tu: taught later, at position 100 (Commands - tu form (Informal)); teach in prendre - To Take (position 68). Concept card: "dépêche-toi!"

### 98. Reflexive Verbs in Past Tense

- "matin" (fr:lex:matin): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Concept card: "Ce matin, je me suis réveillé à 7h. Ensuite, je me suis levé. Après, je me suis…"

### 99. Reciprocal Reflexives - Each Other

- "regardent" (fr:lex:regarder): taught later, at position 100 (Commands - tu form (Informal)); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Concept card: "ils se regardent"

### 102. Irregular Commands - être, avoir, aller, faire

- "courage" (fr:lex:courage): *courage* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "aie courage"
- fr:cx:imperative.pronouns: taught later, at position 103 (Commands with Pronouns); teach in prendre - To Take (position 68). Sentence: "vas-y"
- "Soyons" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in this module. Concept card: "tu: Sois! vous: Soyez! nous: Soyons!"
- "sage" (fr:lex:sage): taught later, at position 123 (Il faut que... - Saying What's Necessary); teach in this module. Concept card: "Sois sage!"
- "Ayons" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in this module. Concept card: "tu: Aie! vous: Ayez! nous: Ayons!"
- "patience" (fr:lex:patience): not taught anywhere in the course; teach in this module. Concept card: "Ayez patience!"

### 103. Commands with Pronouns

- "Montre" (fr:lex:montre): not taught anywhere in the course; teach in this module. Concept card: "Montre-la-moi!"

### 104. Reading 8 - Ma Journée

- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "maintenant elle sait beaucoup de choses"
- "étudiants" (fr:lex:etudiant): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "les étudiants s'aident"
- "aident" (fr:lex:aider): *aident* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Should & Could - Advice and Possibility (position 55), or let the learner read it instead of typing it. Sentence: "les étudiants s'aident"
- fr:cx:relative.ce-que: not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je me souviens de tout ce qu'on apprend"
- "magnifique" (fr:lex:magnifique): *magnifique* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "C'est magnifique, quoi!"
- "rentre" (fr:lex:rentrer): taught later, at position 113 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in a lesson before this module. Sentence: "elle rentre contente et pense au lendemain"
- "contente" (fr:lex:content): *contente* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in être - Past Tense (was / were) (position 58), or let the learner read it instead of typing it. Sentence: "elle rentre contente et pense au lendemain"
- "lendemain" (fr:lex:lendemain): not taught anywhere in the course; teach in a lesson before this module. Sentence: "elle rentre contente et pense au lendemain"
- "Voici" (fr:lex:voici): not taught anywhere in the course; teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "Je m'appelle Marie. Voici ma journée typique. D'abord, je me réveille à sept…"
- "sept" (fr:lex:sept): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "…typique. D'abord, je me réveille à sept heures. Je ne me lève pas tout de…"
- "suite" (fr:lex:suite): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…heures. Je ne me lève pas tout de suite. Je pense à ma journée pendant…"
- "cuisine" (fr:lex:cuisine): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…je me lève. Je vais dans la cuisine. Je prends mon café. Avant le café,…"
- "parce" (fr:lex:parce): taught later, at position 107 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit 7 Final Exam - Knowledge & Learning (position 91). Sentence: "…la Sorbonne. Je dois me dépêcher parce que mon cours est à neuf heures. À la…"
- "neuf" (fr:lex:neuf): taught later, at position 140 (Age & Personal Information); teach in a lesson before this module. Sentence: "…dépêcher parce que mon cours est à neuf heures. À la Sorbonne, j'étudie le…"
- "comprenais" (fr:lex:comprendre): the word comprendre is taught at position 68, but this form is not; teach in a lesson before this module. Sentence: "…bien maintenant. Avant, je ne comprenais pas tout, mais maintenant, je sais…"
- "mots" (fr:lex:mot): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "…Pendant le cours, on apprend des mots nouveaux. On se pose des questions.…"
- "nouveaux" (fr:lex:nouveau): the word nouveau is taught at position 24, but this form is not; teach in a lesson before this module. Sentence: "…le cours, on apprend des mots nouveaux. On se pose des questions. On…"
- "pose" (fr:lex:poser): not taught anywhere in the course; teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "…on apprend des mots nouveaux. On se pose des questions. On s'amuse aussi. Les…"
- "appris" (fr:lex:apprendre): the word apprendre is taught at position 68, but this form is not; teach in prendre - To Take (position 68). Sentence: "…Je pense: "Aujourd'hui, j'ai bien appris. Demain, je vais apprendre encore…"
- fr:cx:chunk.parce-que: taught later, at position 107 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit 7 Final Exam - Knowledge & Learning (position 91). Sentence: "Je m'appelle Marie. Voici ma journée typique. D'abord, je me réveille à sept…"
- "coucher" (fr:lex:coucher): not taught anywhere in the course; teach in a lesson before this module. Concept card: "se coucher"
- "habiter" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Concept card: "habiter"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "travailler"

### 105. Unit 8 Practice - Fill in the Blanks

- "sept" (fr:lex:sept): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "Je me réveille à sept heures."
- "parce" (fr:lex:parce): taught later, at position 107 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit 7 Final Exam - Knowledge & Learning (position 91). Sentence: "Je me dépêche parce que je suis en retard."
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je me dépêche parce que je suis en retard."
- fr:cx:chunk.parce-que: taught later, at position 107 (Causal & Reason Words - Explaining Why); teach in a lesson before Unit 7 Final Exam - Knowledge & Learning (position 91). Sentence: "Je me dépêche parce que je suis en retard."
- "matin" (fr:lex:matin): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "Je me suis réveillé à sept heures ce matin."
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "Elle s'est levée tard."
- "coucher" (fr:lex:coucher): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Concept card: "+ se coucher"

### 106. Unit 8 Final Exam - Daily Life & Actions

- "sept" (fr:lex:sept): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "tu te réveilles à sept heures"
- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "on se lève tôt"
- "dîner" (fr:lex:diner): not taught anywhere in the course; teach in Temporal & Sequential Words - Time & Order (position 92). Concept card: "après le dîner"
- "couches" (fr:lex:coucher): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Concept card: "tu te couches"
- "coucher" (fr:lex:coucher): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Concept card: "se coucher"
- "couche" (fr:lex:coucher): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Concept card: "je me couche"
- "habiter" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Concept card: "habiter"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Concept card: "je habite"
- "habites" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Concept card: "tu habites"
- "travailler" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "travailler"
- "travaille" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "je travaille"
- "travailles" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Concept card: "tu travailles"

## Unit 9: Discourse & Past Tense

### 107. Causal & Reason Words - Explaining Why

- "utile" (fr:lex:utile): not taught anywhere in the course; teach in this module. Sentence: "On étudie le français car c'est utile"
- "mieux" (fr:lex:mieux): not taught anywhere in the course; teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "Grâce à toi, je comprends mieux"
- "pluie" (fr:lex:pluie): taught later, at position 150 (Nature & Animals - Curiosity Vocabulary); teach in this module. Sentence: "À cause de la pluie, on reste ici"
- "reste" (fr:lex:rester): taught later, at position 113 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in this module. Sentence: "À cause de la pluie, on reste ici"
- "restes" (fr:lex:rester): taught later, at position 113 (être Verbs - DR & MRS VANDERTRAMP (went, came, left)); teach in this module. Sentence: "Pourquoi tu restes? - Parce que je suis fatigué"
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Unit 8 Practice - Fill in the Blanks (position 105). Sentence: "Je suis en retard à cause du le traffic"
- "réussi" (fr:lex:reussir): taught later, at position 128 (Si j'avais su... - Past Regret Phrases); teach in this module. Sentence: "J'ai réussi grâce au professeur"
- "travaille" (fr:lex:travailler): taught later, at position 110 (Passé Composé - Regular -ER Verbs (I spoke, I ate)); teach in Everyday Nouns - Life & World (position 49). Sentence: "Il ne travaille pas car il est riche"
- "mauvais" (fr:lex:mauvais): not taught anywhere in the course; teach in this module. Sentence: "À cause du mauvais temps, on annule le match"
- "annule" (fr:lex:annuler): not taught anywhere in the course; teach in this module. Sentence: "À cause du mauvais temps, on annule le match"
- "prêt" (fr:lex:pret): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "On va partir puisque tu es prêt"
- "anniversaire" (fr:lex:anniversaire): not taught anywhere in the course; teach in this module. Sentence: "Comme c'est ton anniversaire, on va au restaurant"
- "dors" (fr:lex:dormir): taught later, at position 142 (Daily Life Essentials - Sleep, Work, Live); teach in avoir besoin de - To Need (position 73). Sentence: "Je ne dors pas bien à cause du bruit"
- "bruit" (fr:lex:bruit): taught later, at position 153 (qu'est-ce qui vs qu'est-ce que - Master 'What' Questions); teach in this module. Sentence: "Je ne dors pas bien à cause du bruit"
- "pleut" (fr:lex:pleuvoir): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in this module. Sentence: "On reste ici il pleut"
- "dehors" (fr:lex:dehors): not taught anywhere in the course; teach in this module. Sentence: "il fait beau, on va dehors"
- "gagné" (fr:lex:gagner): not taught anywhere in the course; teach in this module. Sentence: "Il est content il a gagné"
- "vrai" (fr:lex:vrai): taught later, at position 126 (Je pense que... - Opinion Phrases); teach in dire - To Say / To Tell (position 67). Sentence: "c'est vrai, je te crois"
- "maladie" (fr:lex:maladie): not taught anywhere in the course; teach in this module. Feedback: "à cause de la maladie"
- fr:cx:il-y-a: taught later, at position 115 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Feedback: "parce qu'il y a du traffic"

### 108. Spatial Prepositions - Position & Location

- "étudiants" (fr:lex:etudiant): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "Parmi les étudiants, il-y-a des français"
- fr:cx:il-y-a: taught later, at position 115 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "Parmi les étudiants, il-y-a des français"
- "clés" (fr:lex:cle): taught later, at position 143 (Search & Find - chercher, trouver); teach in Essential Verbs - chercher & trouver (position 44). Sentence: "Mes clés sont sur la table"
- "jardin" (fr:lex:jardin): not taught anywhere in the course; teach in Possessive Adjectives - My, Your, His, Her (position 34). Sentence: "Il y a un jardin derrière la maison"
- "lit" (fr:lex:lire): not taught anywhere in the course; teach in this module. Sentence: "La lampe est au-dessus du le lit"
- "assis" (fr:lex:asseoir): not taught anywhere in the course; teach in this module. Sentence: "Il est assis devant moi"
- "chambre" (fr:lex:chambre): not taught anywhere in the course; teach in this module. Sentence: "Ma chambre est au-dessous"
- "dort" (fr:lex:dormir): taught later, at position 142 (Daily Life Essentials - Sleep, Work, Live); teach in avoir besoin de - To Need (position 73). Sentence: "Le chat dort sous mon lit"
- "arbre" (fr:lex:arbre): taught later, at position 150 (Nature & Animals - Curiosity Vocabulary); teach in this module. Sentence: "Il y a un arbre devant ma fenêtre"
- "fenêtre" (fr:lex:fenetre): taught later, at position 144 (Perception Verbs - écouter, regarder); teach in this module. Sentence: "Il y a un arbre devant ma fenêtre"
- "niveau" (fr:lex:niveau): not taught anywhere in the course; teach in this module. Concept card: "Au-dessous du niveau"
- "chaise" (fr:lex:chaise): not taught anywhere in the course; teach in this module. Concept card: "sous la chaise"

### 109. More Spatial Relations - Distance & Proximity

- "gare" (fr:lex:gare): taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in this module. Sentence: "La gare est loin de la maison"
- "marche" (fr:lex:marcher): taught later, at position 131 (En mangeant... - While Doing Phrases); teach in this module. Sentence: "On marche le long de la rivière"
- "pièce" (fr:lex:piece): not taught anywhere in the course; teach in this module. Sentence: "La table est au milieu de la pièce"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "J'habite près d' ici"
- "assis" (fr:lex:asseoir): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Il est assis en face de moi"
- "jardin" (fr:lex:jardin): not taught anywhere in the course; teach in Possessive Adjectives - My, Your, His, Her (position 34). Sentence: "Il y a un jardin autour de la maison"
- fr:cx:il-y-a: taught later, at position 115 (Imparfait Formation - All Verbs (was doing, used to do)); teach in a lesson before Reading Comprehension 2 - Rendez-vous en Normandie (position 25). Sentence: "Il y a un jardin autour de la maison"
- "arbres" (fr:lex:arbre): taught later, at position 150 (Nature & Animals - Curiosity Vocabulary); teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Il y a des arbres le long de la route"
- "couloir" (fr:lex:couloir): not taught anywhere in the course; teach in this module. Sentence: "La porte est au bout du couloir"
- "Assieds" (fr:lex:asseoir): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Assieds-toi à côté de moi"

### 110. Passé Composé - Regular -ER Verbs (I spoke, I ate)

- "voyagé" (fr:lex:voyager): *voyagé* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 127 (Si j'étais... - Daydreaming & Hypotheticals); teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89), or let the learner read it instead of typing it. Sentence: "Nous avons voyagé à Paris"
- "clés" (fr:lex:cle): taught later, at position 143 (Search & Find - chercher, trouver); teach in Essential Verbs - chercher & trouver (position 44). Sentence: "Vous avez cherché mes clés?"
- "télé" (fr:lex:tele): taught later, at position 144 (Perception Verbs - écouter, regarder); teach in this module. Sentence: "On a regardé la télé hier soir"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "On a regardé la télé hier soir"
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "On a travaillé tard hier"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 61). Module title: "Passé Composé"

### 112. Irregular Past Participles - Set 2 (wanted, could, had to, said)

- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "Elle a dû partir tôt"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "Ils ont appris beaucoup"

### 113. être Verbs - DR & MRS VANDERTRAMP (went, came, left)

- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "Il est parti tôt"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "Nous sommes arrivés hier soir"
- "sortis" (fr:lex:sortir): the word sortir is taught at position 113, but this form is not; teach in this module. Sentence: "Vous êtes sortis hier?"
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "On est rentré tard"
- "descendue" (fr:lex:descendre): *descendue* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; the word descendre is taught at position 113, but this form is not; teach in this module, or let the learner read it instead of typing it. Sentence: "Elle est descendue du train"
- "venus" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in this module. Sentence: "Ils sont venus hier"
- "partis" (fr:lex:partir): the word partir is taught at position 32, but this form is not; teach in this module. Sentence: "Êtes vous partis en vacances?"
- "vacances" (fr:lex:vacances): not taught anywhere in the course; teach in this module. Sentence: "Êtes vous partis en vacances?"
- "venue" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in this module. Sentence: "Elle ne est pas venue"
- "Mourir" (fr:lex:mourir): not taught anywhere in the course; teach in this module. Concept card: "Descendre, Revenir, Mourir, Retourner, Sortir, Venir, Aller, Naître, Devenir,…"
- "Retourner" (fr:lex:retourner): not taught anywhere in the course; teach in this module. Concept card: "Descendre, Revenir, Mourir, Retourner, Sortir, Venir, Aller, Naître, Devenir,…"
- "Naître" (fr:lex:naitre): taught later, at position 140 (Age & Personal Information); teach in Negation Part 2 - I can't, I won't, I never (position 47). Concept card: "…Retourner, Sortir, Venir, Aller, Naître, Devenir, Entrer, Rentrer, Tomber,…"

### 114. Past Participle Agreement with être

- "venue" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "Marie est venue hier"
- "partis" (fr:lex:partir): the word partir is taught at position 32, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "Nous sommes partis tôt"
- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "Nous sommes partis tôt"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "Les filles sont arrivées hier soir"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "Pierre et Marie sont partis ensemble"
- "marché" (fr:lex:marcher): taught later, at position 131 (En mangeant... - While Doing Phrases); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "Ma mère est allée au marché"
- "garçons" (fr:lex:garçon): not taught anywhere in the course; teach in this module. Sentence: "Les garçons sont rentrés tard"
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "Les garçons sont rentrés tard"
- "venus" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Concept card: "nous sommes venus"
- "venues" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in this module. Concept card: "nous sommes venues"

### 115. Imparfait Formation - All Verbs (was doing, used to do)

- "samedi" (fr:lex:samedi): not taught anywhere in the course; teach in this module. Sentence: "On allait au café chaque samedi"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "Il y avait beaucoup de gens"
- "vouliez" (fr:lex:vouloir): the word vouloir is taught at position 17, but this form is not; teach in this module. Sentence: "Vous vouliez du café?"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "On faisait nos devoirs chaque soir"
- "habitaient" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Ils habitaient dans un grand appartement"
- "jouais" (fr:lex:jouer): not taught anywhere in the course; teach in this module. Sentence: "Quand j'étais jeune, je jouais au foot"
- "foot" (fr:lex:foot): not taught anywhere in the course; teach in this module. Sentence: "Quand j'étais jeune, je jouais au foot"
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Unit 8 Practice - Fill in the Blanks (position 105). Sentence: "Tu étais toujours en retard"
- "habiter" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Instruction: "habiter"

### 116. Passé Composé vs Imparfait - The Golden Rule

- "jouais" (fr:lex:jouer): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "Quand j'étais jeune, je jouais au foot"
- "foot" (fr:lex:foot): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "Quand j'étais jeune, je jouais au foot"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "Il y avait beaucoup de gens"
- "mangeais" (fr:lex:manger): the word manger is taught at position 61, but this form is not; teach in this module. Sentence: "Pendant que je mangeais, tu as appelé"
- "habitaient" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Ils habitaient dans un grand appartement"
- "matins" (fr:lex:matin): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "Je prenais le bus tous les matins"
- "matin" (fr:lex:matin): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "Hier matin, j'ai pris le bus"
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Unit 8 Practice - Fill in the Blanks (position 105). Sentence: "Elle était toujours en retard"
- "buvait" (fr:lex:boire): the word boire is taught at position 62, but this form is not; teach in this module. Sentence: "Il buvait du café quand je suis arrivé"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 61). Concept card: "Passé Composé"
- "ans" (fr:lex:an): taught later, at position 140 (Age & Personal Information); teach in Articles - The, A, An (position 5). Concept card: "J'avais 20 ans"
- "jouer" (fr:lex:jouer): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Instruction: "jouer"
- "habiter" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Instruction: "habiter"

### 117. Past Tense Composition - Building Complete Stories

- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "Il y avait beaucoup de gens autour des tables"
- "samedi" (fr:lex:samedi): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "On allait au café chaque samedi, mais hier on n'y est pas allé"
- fr:cx:pronoun.y: not taught anywhere in the course; teach in this module. Sentence: "On allait au café chaque samedi, mais hier on n'y est pas allé"
- "marchais" (fr:lex:marcher): taught later, at position 131 (En mangeant... - While Doing Phrases); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "Je marchais tranquillement quand soudain j'ai vu Marie"
- "chambre" (fr:lex:chambre): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Le livre était sur la table dans ma chambre"
- "télé" (fr:lex:tele): taught later, at position 144 (Perception Verbs - écouter, regarder); teach in Passé Composé - Regular -ER Verbs (I spoke, I ate) (position 110). Sentence: "J'ai fait mes devoirs ensuite j'ai regardé la télé"
- "réussi" (fr:lex:reussir): taught later, at position 128 (Si j'avais su... - Past Regret Phrases); teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "Grâce à toi, j'ai réussi"
- "pluie" (fr:lex:pluie): taught later, at position 150 (Nature & Animals - Curiosity Vocabulary); teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "À cause de la pluie, on est restés à la maison"
- "libre" (fr:lex:libre): not taught anywhere in the course; teach in this module. Concept card: "…au parc près de chez moi. J'étais content parce que j'avais du temps libre."
- "assis" (fr:lex:asseoir): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Concept card: "…de l'école. Il y avait beaucoup de gens. Ils étaient assis autour des tables."
- "soif" (fr:lex:soif): not taught anywhere in the course; teach in this module. Concept card: "…sorti. J'ai vu Marie donc on a parlé. On est allés au café car on avait soif."

### 118. Reading 9 - Une Histoire du Passé

- "week-end" (fr:lex:week-end): *week-end* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "le week-end"
- "parc" (fr:lex:parc): *parc* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "au parc"
- "Jardin" (fr:lex:jardin): not taught anywhere in the course; teach in Possessive Adjectives - My, Your, His, Her (position 34). Sentence: "au Jardin du Luxembourg"
- "banc" (fr:lex:banc): not taught anywhere in the course; teach in a lesson before this module. Sentence: "sur un banc"
- "cinéma" (fr:lex:cinema): *cinéma* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "au cinéma"
- "dix" (fr:lex:dix): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "dix heures"
- "vers" (fr:lex:vers): not taught anywhere in the course; teach in a lesson before this module. Sentence: "vers 10h"
- "samedi" (fr:lex:samedi): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- "tard" (fr:lex:tard): taught later, at position 133 (Avant que... - Before Phrases); teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "…à 8h. D'habitude, je me levais plus tard le samedi, mais ce jour-là, j'ai…"
- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "…mais ce jour-là, j'ai voulu sortir tôt parce que le temps était si beau.…"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "…près de ma maison. J'aime beaucoup ce parc! Il y avait beaucoup de…"
- "lac" (fr:lex:lac): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…belle journée. Je suis allé près du lac quand soudain j'ai vu mon ami Pierre.…"
- "assis" (fr:lex:asseoir): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "…j'ai vu mon ami Pierre. Il était assis sur un banc sous un grand arbre. Je…"
- "arbre" (fr:lex:arbre): taught later, at position 150 (Nature & Animals - Curiosity Vocabulary); teach in Spatial Prepositions - Position & Location (position 108). Sentence: "…assis sur un banc sous un grand arbre. Je suis allé vers lui et on a…"
- "dehors" (fr:lex:dehors): not taught anywhere in the course; teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "…demandé. "Bonjour! Je voulais être dehors parce qu'il faisait si beau. Je suis…"
- "voulait" (fr:lex:vouloir): the word vouloir is taught at position 17, but this form is not; teach in a lesson before this module. Sentence: "…une heure. Il m'a dit qu'il voulait un nouveau travail à la Sorbonne…"
- "comprenais" (fr:lex:comprendre): the word comprendre is taught at position 68, but this form is not; teach in a lesson before Reading 8 - Ma Journée (position 104). Sentence: "…son travail. Je lui ai dit que je comprenais car j'ai eu le même problème…"
- "dernière" (fr:lex:dernier): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…j'ai eu le même problème l'année dernière. Ensuite, comme nous avions faim,…"
- "célèbre" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Café de Flore est très bon et très célèbre à Paris! Il y avait beaucoup de gens…"
- "fenêtres" (fr:lex:fenetre): taught later, at position 144 (Perception Verbs - écouter, regarder); teach in Spatial Prepositions - Position & Location (position 108). Sentence: "…beaucoup de gens - à côté des fenêtres, autour des tables, partout! Nous…"
- "vus" (fr:lex:voir): the word voir is taught at position 19, but this form is not; teach in a lesson before this module. Sentence: "…est entrée dans le café. Elle nous a vus et elle est venue à notre table.…"
- "venue" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "…café. Elle nous a vus et elle est venue à notre table. "Quelle surprise!"…"
- "savais" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before this module. Sentence: "…surprise!" elle a dit. "Je ne savais pas que vous étiez ici!" Marie était…"
- "vue" (fr:lex:voir): the word voir is taught at position 19, but this form is not; teach in a lesson before this module. Sentence: "…de la Sorbonne. Nous ne l'avons pas vue depuis six mois parce qu'elle est…"
- "six" (fr:lex:six): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "…Nous ne l'avons pas vue depuis six mois parce qu'elle est maintenant à…"
- "mois" (fr:lex:mois): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Nous ne l'avons pas vue depuis six mois parce qu'elle est maintenant à Lyon.…"
- "rencontre" (fr:lex:rencontre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…maintenant à Lyon. Grâce à cette rencontre, nous avons pu être ensemble pour…"
- "ensemble" (fr:lex:ensemble): taught later, at position 124 (Je veux que... - Expressing Wishes); teach in Essential Verb - parler (to speak) (position 43). Sentence: "…rencontre, nous avons pu être ensemble pour l'après-midi. L'après-midi,…"
- "après-midi" (fr:lex:apres-midi): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…avons pu être ensemble pour l'après-midi. L'après-midi, nous sommes allés…"
- "gare" (fr:lex:gare): taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "…sommes allés au cinéma près de la gare. Il y avait le film "Amélie" - un…"
- "cuisine" (fr:lex:cuisine): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Sentence: "…nous avons mangé de la bonne cuisine française. C'était délicieux! Nous…"
- "française" (fr:lex:francais): the word français is taught at position 68, but this form is not; teach in a lesson before this module. Sentence: "…avons mangé de la bonne cuisine française. C'était délicieux! Nous avons…"
- "peu" (fr:lex:peu): taught later, at position 135 (Bien que... - Although Phrases); teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "…Lyon. Pierre et moi sommes restés un peu plus. Nous avons pris un dernier café…"
- "dernier" (fr:lex:dernier): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…un peu plus. Nous avons pris un dernier café ensemble. Finalement, je suis…"
- "heureux" (fr:lex:heureux): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "…10h. J'étais fatigué mais très heureux. C'était une journée parfaite à…"
- "celles" (fr:lex:celui): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…les meilleures journées sont celles qu'on ne pense pas avoir. Grâce à ma…"
- "sortie" (fr:lex:sortir): the word sortir is taught at position 113, but this form is not; teach in a lesson before this module. Sentence: "…ne pense pas avoir. Grâce à ma sortie au Jardin du Luxembourg, j'ai eu une…"
- "dormir" (fr:lex:dormir): taught later, at position 142 (Daily Life Essentials - Sleep, Work, Live); teach in avoir besoin de - To Need (position 73). Sentence: "…journée avec mes amis. Avant de dormir, j'ai pensé: "C'est pour ça que…"
- "samedis" (fr:lex:samedi): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "…Avant de dormir, j'ai pensé: "C'est pour ça que j'aime les samedis à Paris!""
- fr:cx:neg.de: not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- fr:cx:pronoun.indirect-object: taught later, at position 141 (donner - To Give); teach in Essential Verb - faire (to do/make) (position 41). Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- fr:cx:relative.ce-que: not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- fr:cx:relative.que: not taught anywhere in the course; teach in a lesson before this module. Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- fr:cx:relative.qui: not taught anywhere in the course; teach in a lesson before this module. Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- fr:cx:subj.emotion-que: taught later, at position 125 (Je suis content que... - Emotion Phrases); teach in a lesson before this module. Sentence: "Hier, c'était samedi et il faisait très beau à Paris. J'étais content parce que…"
- "Passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 61). Module title: "Une Histoire du Passé"

### 119. Unit 9 Practice - Fill in the Blanks

- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Unit 8 Practice - Fill in the Blanks (position 105). Sentence: "Je suis en retard parce que j'ai raté le bus."
- "raté" (fr:lex:rater): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je suis en retard parce que j'ai raté le bus."
- "réussi" (fr:lex:reussir): taught later, at position 128 (Si j'avais su... - Past Regret Phrases); teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "grâce à à toi, j'ai réussi."
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "Le chat est entre les deux chaises."
- "chaises" (fr:lex:chaise): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Le chat est entre les deux chaises."
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Elle habite près du parc."
- "lu" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Hier, j'ai lu un livre."
- "fini" (fr:lex:finir): *fini* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 129 (J'avais déjà... - Had Already Done Phrases); teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "Tu as fini ton travail?"
- "venus" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "Ils sont venus de France."
- "jouais" (fr:lex:jouer): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "Quand j'étais petit, je jouais beaucoup."
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "Quand j'étais petit, je jouais beaucoup."
- "lisais" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Je lisais quand tu es arrivé."
- "courait" (fr:lex:courir): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in Knowledge & Learning - Essential Nouns (position 86). Sentence: "Il courait tous les jours, mais hier il a marché."
- "marché" (fr:lex:marcher): taught later, at position 131 (En mangeant... - While Doing Phrases); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "Il courait tous les jours, mais hier il a marché."
- "cuisinais" (fr:lex:cuisiner): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Sentence: "Pendant que je cuisinais, j'ai entendu un bruit."
- "entendu" (fr:lex:entendre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Pendant que je cuisinais, j'ai entendu un bruit."
- "bruit" (fr:lex:bruit): taught later, at position 153 (qu'est-ce qui vs qu'est-ce que - Master 'What' Questions); teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "Pendant que je cuisinais, j'ai entendu un bruit."
- "pleuvait" (fr:lex:pleuvoir): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "comme il pleuvait, nous sommes restés à la maison."
- "cachée" (fr:lex:cacher): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."
- "arbre" (fr:lex:arbre): taught later, at position 150 (Nature & Animals - Curiosity Vocabulary); teach in Spatial Prepositions - Position & Location (position 108). Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."
- "voie" (fr:lex:voir): the word voir is taught at position 19, but this form is not; teach in a lesson before this module. Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."
- fr:cx:subj.pour-que: taught later, at position 134 (Pour que... - So That Phrases); teach in a lesson before this module. Sentence: "Elle s'est cachée derrière l'arbre pour que personne ne la voie."
- "ailleurs" (fr:lex:ailleurs): not taught anywhere in the course; teach in a lesson before this module. Concept card: "d'ailleurs"
- "semble" (fr:lex:sembler): not taught anywhere in the course; teach in a lesson before this module. Concept card: "il semble"

### 120. Unit 9 Final Exam - Discourse & Past Tense

- "venus" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "ils sont venus"
- "finissiez" (fr:lex:finir): *finissiez* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 129 (J'avais déjà... - Had Already Done Phrases); teach in a lesson before Unit 9 Practice - Fill in the Blanks (position 119), or let the learner read it instead of typing it. Sentence: "vous finissiez"
- "lisais" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "lisais"
- "acheté" (fr:lex:acheter): not taught anywhere in the course; teach in a lesson before this module. Sentence: "ai acheté"
- "marchait" (fr:lex:marcher): taught later, at position 131 (En mangeant... - While Doing Phrases); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "marchait"
- "ouverte" (fr:lex:ouvrir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "est ouverte"
- "pleuvait" (fr:lex:pleuvoir): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 107). Sentence: "pleuvait"
- "ailleurs" (fr:lex:ailleurs): not taught anywhere in the course; teach in a lesson before Unit 9 Practice - Fill in the Blanks (position 119). Concept card: "d'ailleurs"
- "semble" (fr:lex:sembler): not taught anywhere in the course; teach in a lesson before Unit 9 Practice - Fill in the Blanks (position 119). Concept card: "il semble"
- "faisaient" (fr:lex:faire): the word faire is taught at position 41, but this form is not; teach in a lesson before this module. Concept card: "ils faisaient"
- "passé" (fr:lex:passe): not taught anywhere in the course; teach in manger - To Eat (Present & Past) (position 61). Concept card: "passé composé"
- "mangeais" (fr:lex:manger): the word manger is taught at position 61, but this form is not; teach in Passé Composé vs Imparfait - The Golden Rule (position 116). Concept card: "je mangeais"
- fr:cx:plus-que-parfait.avoir: taught later, at position 129 (J'avais déjà... - Had Already Done Phrases); teach in a lesson before this module. Concept card: "j'avais mangé"
- fr:cx:plus-que-parfait.etre: not taught anywhere in the course; teach in a lesson before this module. Concept card: "tu étais venu"

## Unit 10: Mastery & Nuance

### 121. Forms Used After 'il faut que' and 'je veux que'

- "faut" (fr:lex:falloir): taught later, at position 123 (Il faut que... - Saying What's Necessary); teach in this module. Module title: "il faut que"
- "sage" (fr:lex:sage): taught later, at position 123 (Il faut que... - Saying What's Necessary); teach in Irregular Commands - être, avoir, aller, faire (position 102). Concept card: "Tu es sage"
- fr:cx:frame.il-faut-infinitive: taught later, at position 123 (Il faut que... - Saying What's Necessary); teach in this module. Concept card: "✗ Il faut aller"

### 122. More Forms for 'il faut que' and 'je veux que' Phrases

- "faut" (fr:lex:falloir): taught later, at position 123 (Il faut que... - Saying What's Necessary); teach in Forms Used After 'il faut que' and 'je veux que' (position 121). Module title: "il faut que"
- fr:cx:frame.il-faut-infinitive: taught later, at position 123 (Il faut que... - Saying What's Necessary); teach in Forms Used After 'il faut que' and 'je veux que' (position 121). Concept card: "Il faut partir"

### 127. Si j'étais... - Daydreaming & Hypotheticals

- "achèterais" (fr:lex:acheter): not taught anywhere in the course; teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Module description: "Si j'étais riche, j'achèterais..."

### 128. Si j'avais su... - Past Regret Phrases

- fr:cx:plus-que-parfait.avoir: taught later, at position 129 (J'avais déjà... - Had Already Done Phrases); teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Sentence: "si j'avais su"
- fr:cx:conditionnel-passe.etre: not taught anywhere in the course; teach in this module. Sentence: "je serais venu"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in this module. Sentence: "j'aurais réussi"

### 129. J'avais déjà... - Had Already Done Phrases

- fr:cx:plus-que-parfait.etre: not taught anywhere in the course; teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Sentence: "j'étais déjà parti"

### 130. vraiment, sérieusement... - Common Adverbs

- "fatigué" (fr:lex:fatigue): *fatigué* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 135 (Bien que... - Although Phrases); teach in this module, or let the learner read it instead of typing it. Sentence: "sérieusement fatigué"
- "courir" (fr:lex:courir): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in Knowledge & Learning - Essential Nouns (position 86). Sentence: "courir rapidement"
- "court" (fr:lex:courir): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in Knowledge & Learning - Essential Nouns (position 86). Sentence: "court rapidement"

### 131. En mangeant... - While Doing Phrases

- "télé" (fr:lex:tele): taught later, at position 144 (Perception Verbs - écouter, regarder); teach in Passé Composé - Regular -ER Verbs (I spoke, I ate) (position 110). Module description: "En mangeant, je regarde la télé"

### 135. Bien que... - Although Phrases

- "sort" (fr:lex:sortir): the word sortir is taught at position 113, but this form is not; teach in this module. Concept card: "Bien qu'il fasse froid, on sort"

### 137. Reading 10 - Mes Rêves et Mes Espoirs

- "dame" (fr:lex:dame): not taught anywhere in the course; teach in a lesson before this module. Sentence: "notre dame"
- "différente" (fr:lex:different): *différente* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "que sa vie soit différente"
- "artiste" (fr:lex:artiste): *artiste* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Essential Verb - pouvoir (can) (position 18), or let the learner read it instead of typing it. Sentence: "être artiste"
- "professeur" (fr:lex:professeur): *professeur* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 144 (Perception Verbs - écouter, regarder); teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "professeur de français"
- "essayé" (fr:lex:essayer): taught later, at position 159 (Rhetorical & Negative Questions - Advanced Style); teach in a lesson before this module. Sentence: "elle avait essayé"
- "aider" (fr:lex:aider): *aider* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Should & Could - Advice and Possibility (position 55), or let the learner read it instead of typing it. Sentence: "aider l'un l'autre"
- "vers" (fr:lex:vers): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "vers la Seine"
- "habite" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- "cinq" (fr:lex:cinq): taught later, at position 146 (Directions & Navigation); teach in a lesson before this module. Sentence: "…Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville! Mais j'ai…"
- "ans" (fr:lex:an): taught later, at position 140 (Age & Personal Information); teach in Articles - The, A, An (position 5). Sentence: "…et j'habite à Paris depuis cinq ans. J'adore cette ville! Mais j'ai…"
- "rêve" (fr:lex:reve): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…ville! Mais j'ai toujours un grand rêve: je veux que ma vie soit différente.…"
- "soir" (fr:lex:soir): not taught anywhere in the course; teach in The Power to Ask Anything (position 21). Sentence: "…que ma vie soit différente. Hier soir, j'étais assise dans un petit café…"
- "assise" (fr:lex:asseoir): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Sentence: "…soit différente. Hier soir, j'étais assise dans un petit café près de…"
- "rêves" (fr:lex:reve): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…cathédrale et je pensais à mes rêves. Il faisait froid mais j'étais…"
- "beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "…la journée. J'avais déjà pensé à beaucoup de choses. Maintenant, je voulais…"
- "rêver" (fr:lex:rever): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Maintenant, je voulais simplement rêver un peu. Si j'étais riche,…"
- "achèterais" (fr:lex:acheter): not taught anywhere in the course; teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Sentence: "…rêver un peu. Si j'étais riche, j'achèterais une petite maison à Montmartre.…"
- "habiter" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Sentence: "…maison à Montmartre. J'aimerais habiter dans ce quartier célèbre où les…"
- "quartier" (fr:lex:quartier): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…J'aimerais habiter dans ce quartier célèbre où les artistes ont vécu.…"
- "célèbre" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…habiter dans ce quartier célèbre où les artistes ont vécu. Si j'avais…"
- "vécu" (fr:lex:vivre): taught later, at position 142 (Daily Life Essentials - Sleep, Work, Live); teach in Everyday Nouns - Life & World (position 49). Sentence: "…quartier célèbre où les artistes ont vécu. Si j'avais plus d'argent, je…"
- "savait" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before this module. Sentence: "…Mon ami Marc est arrivé au café. Il savait que j'aime ce café parce que c'est…"
- "savais" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…de nos rêves. "Salut Sophie! Je savais que tu serais ici," il a dit.…"
- "heureuse" (fr:lex:heureux): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "…il a dit. "Bonjour Marc! Je suis heureuse que tu sois là. J'étais en train de…"
- "voulait" (fr:lex:vouloir): the word vouloir is taught at position 17, but this form is not; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…il a dit. Marc m'a dit qu'il voulait être artiste. Il voulait que les…"
- "peintures" (fr:lex:peinture): not taught anywhere in the course; teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "…voulait que les gens voient ses peintures au Louvre un jour. C'est un grand…"
- "soient" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in a lesson before this module. Sentence: "…"Je veux qu'un jour mes peintures soient au Louvre. Mais j'ai peur que ce…"
- "essaies" (fr:lex:essayer): taught later, at position 159 (Rhetorical & Negative Questions - Advanced Style); teach in a lesson before this module. Sentence: "…"Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras…"
- "rien" (fr:lex:rien): not taught anywhere in the course; teach in donner - To Give (position 69). Sentence: "…faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais," j'ai dit. Nous…"
- "sauras" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before this module. Sentence: "…essaies! Si tu ne fais rien, tu ne sauras jamais," j'ai dit. Nous avons parlé…"
- "étudiants" (fr:lex:etudiant): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "…de français. J'aimerais que mes étudiants adorent la langue française comme…"
- "langue" (fr:lex:langue): not taught anywhere in the course; teach in a lesson before Unit 7 Final Exam - Knowledge & Learning (position 91). Sentence: "…que mes étudiants adorent la langue française comme moi. "Je suis…"
- "française" (fr:lex:francais): the word français is taught at position 68, but this form is not; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…mes étudiants adorent la langue française comme moi. "Je suis content que tu…"
- "dernière" (fr:lex:dernier): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…J'avais déjà essayé l'année dernière mais je n'ai pas réussi," j'ai dit.…"
- "perdu" (fr:lex:perdre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…que nous parlions, j'avais déjà perdu espoir. Mais maintenant, je me sens…"
- "espoir" (fr:lex:espoir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…nous parlions, j'avais déjà perdu espoir. Mais maintenant, je me sens mieux.…"
- "sens" (fr:lex:sens): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…perdu espoir. Mais maintenant, je me sens mieux. Nous avons décidé d'aider l'un…"
- "mieux" (fr:lex:mieux): not taught anywhere in the course; teach in a lesson before Reading 7 - L'Art d'Apprendre (position 89). Sentence: "…espoir. Mais maintenant, je me sens mieux. Nous avons décidé d'aider l'un…"
- "réussisse" (fr:lex:reussir): the word réussir is taught at position 128, but this form is not; teach in a lesson before this module. Sentence: "…l'un l'autre. Je veux qu'il réussisse avec ses peintures, et il veut que…"
- "heureux" (fr:lex:heureux): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "…comme professeur. "Je suis heureux que nous soyons amis. On peut…"
- "soyons" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in Irregular Commands - être, avoir, aller, faire (position 102). Sentence: "…"Je suis heureux que nous soyons amis. On peut s'aider," Marc a dit.…"
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "…que nous réussissions tous les deux," j'ai dit. Après notre café, nous…"
- "lumières" (fr:lex:lumiere): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…et Paris était magnifique. Les lumières de la Tour Eiffel brillaient au…"
- "Tour" (fr:lex:tour): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "…était magnifique. Les lumières de la Tour Eiffel brillaient au loin. "Si on…"
- "brillaient" (fr:lex:briller): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in a lesson before this module. Sentence: "…Les lumières de la Tour Eiffel brillaient au loin. "Si on avait plus de…"
- "pont" (fr:lex:pont): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…nous sommes dit au revoir près du pont. Avant de partir, Marc m'a dit…"
- "essayer" (fr:lex:essayer): taught later, at position 159 (Rhetorical & Negative Questions - Advanced Style); teach in a lesson before this module. Sentence: "…Je veux que tu continues à essayer," il a dit. "Merci Marc. Je suis…"
- "reconnaissante" (fr:lex:reconnaissant): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…il a dit. "Merci Marc. Je suis reconnaissante que tu m'aies dit ça. Toi aussi,…"
- "tôt" (fr:lex:tot): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "…soit mon ami. Si j'avais su plus tôt que l'espoir était si important,…"
- "deviennent" (fr:lex:devenir): the word devenir is taught at position 113, but this form is not; teach in a lesson before this module. Sentence: "…professeur. Je veux que mes rêves deviennent réalité. Grâce à mon ami et à…"
- "soirée" (fr:lex:soiree): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Grâce à mon ami et à cette belle soirée à Paris, j'ai retrouvé mon courage.…"
- "retrouvé" (fr:lex:retrouver): not taught anywhere in the course; teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "…à cette belle soirée à Paris, j'ai retrouvé mon courage. Je suis heureuse que…"
- "soutiennent" (fr:lex:soutenir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…je suis contente que mes amis me soutiennent. Comme Marc a dit: il faut…"
- "saura" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before this module. Sentence: "…essayer! Si on ne fait rien, on ne saura jamais. Et moi, je veux savoir si mes…"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 128). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- fr:cx:neg.ne-rien: not taught anywhere in the course; teach in donner - To Give (position 69). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- fr:cx:pronoun.indirect-object: taught later, at position 141 (donner - To Give); teach in Essential Verb - faire (to do/make) (position 41). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- fr:cx:q.embedded: taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in demander - To Ask (position 71). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- fr:cx:relative.ou: not taught anywhere in the course; teach in a lesson before Unit 5 Practice - Fill in the Blanks (position 64). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- fr:cx:si.present: not taught anywhere in the course; teach in a lesson before Unit 5 Final Exam - Sophistication (position 65). Sentence: "Je m'appelle Sophie et j'habite à Paris depuis cinq ans. J'adore cette ville!…"
- "Espoirs" (fr:lex:espoir): not taught anywhere in the course; teach in a lesson before this module. Module title: "Mes Rêves et Mes Espoirs"
- "dont" (fr:lex:dont): not taught anywhere in the course; teach in a lesson before this module. Concept card: "dont"
- fr:cx:relative.dont: not taught anywhere in the course; teach in a lesson before this module. Concept card: "dont"
- "habitait" (fr:lex:habiter): not taught anywhere in the course; teach in Everyday Nouns - Life & World (position 49). Hint: "Elle habitait à..."
- "achèterait" (fr:lex:acheter): not taught anywhere in the course; teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Instruction: "Si Sophie était riche, qu'est-ce qu'elle achèterait?"

### 138. Unit 10 Practice - Fill in the Blanks

- "achèterais" (fr:lex:acheter): not taught anywhere in the course; teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Sentence: "Si j'étais riche, j'achèterais une maison."
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 128). Sentence: "Si j'avais su, j'aurais continué mes études."
- "retard" (fr:lex:retard): not taught anywhere in the course; teach in a lesson before Unit 8 Practice - Fill in the Blanks (position 105). Sentence: "Il est possible qu'il soit en retard."
- "suives" (fr:lex:suivre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Si j'étais toi, je voudrais que tu suives tes rêves."
- "rêves" (fr:lex:reve): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "Si j'étais toi, je voudrais que tu suives tes rêves."
- "dont" (fr:lex:dont): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Concept card: "+ dont"
- fr:cx:relative.dont: not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Concept card: "+ dont"
- fr:cx:relative.ce-que: not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Concept card: "+ ce que"

### 139. Unit 10 Final Exam - Mastery & Nuance

- "réussisse" (fr:lex:reussir): the word réussir is taught at position 128, but this form is not; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "je veux qu'on réussisse"
- "heureux" (fr:lex:heureux): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "je suis heureux que tu sois là"
- "heureuse" (fr:lex:heureux): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "je suis heureuse que tu sois là"
- "surprise" (fr:lex:surpris): *surprise* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; the word surpris is taught at position 125, but this form is not; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "je suis surprise que tu saches ça"
- "marcherait" (fr:lex:marcher): the word marcher is taught at position 131, but this form is not; teach in a lesson before this module. Sentence: "si on avait le temps, on marcherait"
- "marcherions" (fr:lex:marcher): the word marcher is taught at position 131, but this form is not; teach in a lesson before this module. Sentence: "si nous avions le temps, nous marcherions"
- fr:cx:conditionnel-passe.etre: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 128). Sentence: "si j'avais su, je serais venu"
- "venue" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "si j'avais su, je serais venue"
- "aidé" (fr:lex:aider): *aidé* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Should & Could - Advice and Possibility (position 55), or let the learner read it instead of typing it. Sentence: "si j'avais eu le temps, j'aurais aidé"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 128). Sentence: "si j'avais eu le temps, j'aurais aidé"
- fr:cx:plus-que-parfait.etre: not taught anywhere in the course; teach in a lesson before Unit 9 Final Exam - Discourse & Past Tense (position 120). Sentence: "elle était déjà partie"
- "explique" (fr:lex:expliquer): *explique* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "j'explique pour que tu comprennes"
- "difficile" (fr:lex:difficile): *difficile* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "bien que ce soit difficile, je continue"
- "continue" (fr:lex:continuer): *continue* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; taught later, at position 146 (Directions & Navigation); teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "bien que ce soit difficile, je continue"
- "soyons" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in Irregular Commands - être, avoir, aller, faire (position 102). Sentence: "je suis vraiment content que nous soyons amis"
- "saura" (fr:lex:savoir.verb): the word savoir is taught at position 78, but this form is not; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "saura"
- "différente" (fr:lex:different): *différente* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137), or let the learner read it instead of typing it. Sentence: "soit différente"
- "perdu" (fr:lex:perdre): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "perdu espoir"
- "espoir" (fr:lex:espoir): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "perdu espoir"
- "essayé" (fr:lex:essayer): taught later, at position 159 (Rhetorical & Negative Questions - Advanced Style); teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "essayé"
- "lis" (fr:lex:lire): not taught anywhere in the course; teach in Spatial Prepositions - Position & Location (position 108). Concept card: "le livre que je lis, la personne qui parle, l'endroit où je vais, la chose dont…"
- "dont" (fr:lex:dont): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Concept card: "…l'endroit où je vais, la chose dont je parle, il faut que je vienne,…"
- "rien" (fr:lex:rien): not taught anywhere in the course; teach in donner - To Give (position 69). Concept card: "…vais, la chose dont je parle, il faut que je vienne, quelqu'un, personne, rien"
- fr:cx:relative.dont: not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Concept card: "le livre que je lis, la personne qui parle, l'endroit où je vais, la chose dont…"
- fr:cx:relative.ou: not taught anywhere in the course; teach in a lesson before Unit 5 Practice - Fill in the Blanks (position 64). Concept card: "le livre que je lis, la personne qui parle, l'endroit où je vais, la chose dont…"
- fr:cx:relative.que: not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Concept card: "le livre que je lis, la personne qui parle, l'endroit où je vais, la chose dont…"
- fr:cx:relative.qui: not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Concept card: "le livre que je lis, la personne qui parle, l'endroit où je vais, la chose dont…"
- fr:cx:relative.ce-que: not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Concept card: "ce que"
- "faudrait" (fr:lex:falloir): the word falloir is taught at position 123, but this form is not; teach in a lesson before this module. Concept card: "il faudrait que"
- "serait" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in a lesson before this module. Concept card: "il serait possible que"

## Unit 11: Daily Essentials

### 140. Age & Personal Information

- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "j'ai vingt-deux ans"
- "dix" (fr:lex:dix): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "elle a dix-huit ans"
- "huit" (fr:lex:huit): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "elle a dix-huit ans"
- "cinq" (fr:lex:cinq): taught later, at position 146 (Directions & Navigation); teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Concept card: "J'ai vingt-cinq ans"

### 141. donner - To Give

- "numéro" (fr:lex:numero): *numéro* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "tu peux me donner ton numéro"
- "cadeau" (fr:lex:cadeau): not taught anywhere in the course; teach in this module. Concept card: "Je donne un cadeau"

### 142. Daily Life Essentials - Sleep, Work, Live

- "huit" (fr:lex:huit): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "je dors huit heures"
- "centre" (fr:lex:centre): not taught anywhere in the course; teach in this module. Concept card: "Je vis à Paris, je travaille au centre-ville, et je dors bien"

### 143. Search & Find - chercher, trouver

- "téléphone" (fr:lex:telephone): *téléphone* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in commander - To Order (position 72), or let the learner read it instead of typing it. Sentence: "tu as trouvé ton téléphone?"

### 144. Perception Verbs - écouter, regarder

- "télévision" (fr:lex:television): *télévision* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "je regarde la télévision"
- "intéressant" (fr:lex:interessant): *intéressant* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "je trouve que c'est intéressant"

### 146. Directions & Navigation

- "trois" (fr:lex:trois): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "le train arrive à trois heures"
- "gare" (fr:lex:gare): taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "où est la gare?"
- "musée" (fr:lex:musee): *musée* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in this module, or let the learner read it instead of typing it. Sentence: "excusez-moi, comment aller au musée?"

### 147. Reading 11 - La France Moderne

- "soixante" (fr:lex:soixante): not taught anywhere in the course; teach in a lesson before this module. Sentence: "soixante-huit millions"
- "huit" (fr:lex:huit): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "soixante-huit millions"
- "millions" (fr:lex:million): *millions* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "soixante-huit millions"
- "habitants" (fr:lex:habitant): not taught anywhere in the course; teach in a lesson before this module. Sentence: "soixante-huit millions d'habitants"
- "directions" (fr:lex:direction): *directions* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "directions"
- "six" (fr:lex:six): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "six ans"
- "agriculture" (fr:lex:agriculture): *agriculture* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "l'agriculture"
- "services" (fr:lex:service): *services* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "les services"
- "industrie" (fr:lex:industrie): *industrie* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "l'industrie"
- "vers" (fr:lex:vers): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "vers le sud"
- "téléphones" (fr:lex:telephone): *téléphones* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in commander - To Order (position 72), or let the learner read it instead of typing it. Sentence: "téléphones"
- "téléphone" (fr:lex:telephone): *téléphone* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in commander - To Order (position 72), or let the learner read it instead of typing it. Sentence: "téléphone"
- "via" (fr:lex:via): *via* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "via leurs téléphones"
- "protéger" (fr:lex:proteger): *protéger* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "protéger"
- "environnement" (fr:lex:environnement): *environnement* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "protéger l'environnement"
- "homologues" (fr:lex:homologue): not taught anywhere in the course; teach in a lesson before this module. Sentence: "homologues"
- "étrangers" (fr:lex:etranger): not taught anywhere in the course; teach in a lesson before this module. Sentence: "homologues étrangers"
- "innovation" (fr:lex:innovation): *innovation* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "innovation"
- "tradition" (fr:lex:tradition): *tradition* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "tradition et innovation"
- "pays" (fr:lex:pays): not taught anywhere in the course; teach in a lesson before this module. Sentence: "La France d'aujourd'hui est un pays qui continue à évoluer rapidement. Avec ses…"
- "compte" (fr:lex:compte): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…dans le monde. Paris, sa capitale, compte plus de deux millions de personnes.…"
- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "…Paris, sa capitale, compte plus de deux millions de personnes. Cette ville…"
- "attire" (fr:lex:attirer): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…personnes. Cette ville magnifique attire des millions de visiteurs chaque…"
- "célèbres" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…Ils viennent admirer ses monuments célèbres comme la Tour Eiffel, Notre-Dame,…"
- "Tour" (fr:lex:tour): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "…ses monuments célèbres comme la Tour Eiffel, Notre-Dame, le Louvre, et…"
- "Arc" (fr:lex:arc): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Eiffel, Notre-Dame, le Louvre, et l'Arc de Triomphe sur les Champs-Élysées.…"
- "Beaucoup" (fr:lex:beaucoup): not taught anywhere in the course; teach in a lesson before Unit 4 Practice - Fill in the Blanks (position 51). Sentence: "…Triomphe sur les Champs-Élysées. Beaucoup visitent aussi le château de…"
- "lieux" (fr:lex:lieu): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…des directions pour trouver ces lieux historiques. Le système éducatif…"
- "reconnu" (fr:lex:reconnu): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Le système éducatif français est reconnu internationalement. Les étudiants…"
- "étudiants" (fr:lex:etudiant): not taught anywhere in the course; teach in Essential Verb - être (to be) (position 3). Sentence: "…reconnu internationalement. Les étudiants français travaillent dur dans leurs…"
- "matières" (fr:lex:matiere): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Ils étudient beaucoup de matières différentes : les sciences,…"
- "langues" (fr:lex:langue): not taught anywhere in the course; teach in a lesson before Unit 7 Final Exam - Knowledge & Learning (position 91). Sentence: "…: les sciences, l'histoire, les langues étrangères, et la littérature.…"
- "étrangères" (fr:lex:etranger): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…sciences, l'histoire, les langues étrangères, et la littérature.…"
- "française" (fr:lex:francais): the word français is taught at position 68, but this form is not; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…à l'école primaire. La culture française influence le monde entier. Les…"
- "entier" (fr:lex:entier): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…française influence le monde entier. Les artistes français comme Claude…"
- "œuvres" (fr:lex:œuvre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…et Vincent van Gogh ont créé des œuvres magnifiques. Ces peintres…"
- "peintres" (fr:lex:peintre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…créé des œuvres magnifiques. Ces peintres impressionnistes vivent encore dans…"
- "mémoire" (fr:lex:memoire): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…vivent encore dans la mémoire collective. Aujourd'hui, les…"
- "nouveaux" (fr:lex:nouveau): the word nouveau is taught at position 24, but this form is not; teach in a lesson before Reading 8 - Ma Journée (position 104). Sentence: "…collective. Aujourd'hui, les nouveaux artistes vivent souvent dans des…"
- "quartiers" (fr:lex:quartier): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "…artistes vivent souvent dans des quartiers comme Montmartre, près du célèbre…"
- "célèbre" (fr:lex:celebre): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…comme Montmartre, près du célèbre Moulin Rouge. La cuisine française…"
- "Moulin" (fr:lex:moulin): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…comme Montmartre, près du célèbre Moulin Rouge. La cuisine française reste…"
- "Rouge" (fr:lex:rouge): not taught anywhere in the course; teach in a lesson before Reading Comprehension 3 - La Première Page (position 37). Sentence: "…Montmartre, près du célèbre Moulin Rouge. La cuisine française reste également…"
- "cuisine" (fr:lex:cuisine): not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104). Sentence: "…près du célèbre Moulin Rouge. La cuisine française reste également très…"
- "également" (fr:lex:egalement): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Rouge. La cuisine française reste également très populaire dans le monde. Les…"
- "plats" (fr:lex:plat): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…très populaire dans le monde. Les plats traditionnels comme le coq au vin, la…"
- "coq" (fr:lex:coq): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Les plats traditionnels comme le coq au vin, la ratatouille, et la…"
- "bouillabaisse" (fr:lex:bouillabaisse): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…au vin, la ratatouille, et la bouillabaisse de Marseille donnent du plaisir à…"
- "inoubliables" (fr:lex:inoubliable): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…des expériences culinaires inoubliables. L'économie française dépend de…"
- "plusieurs" (fr:lex:plusieurs): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…L'économie française dépend de plusieurs secteurs importants. Beaucoup de…"
- "françaises" (fr:lex:francais): the word français is taught at position 68, but this form is not; teach in a lesson before this module. Sentence: "…ou l'agriculture. Les entreprises françaises exportent leurs produits vers…"
- "delà" (fr:lex:dela): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…le sud - dans toute l'Europe et au-delà. Le transport public fonctionne très…"
- "permet" (fr:lex:permettre): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…destination. Dans Paris, le métro permet aux habitants de se déplacer…"
- "déplacer" (fr:lex:deplacer): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…métro permet aux habitants de se déplacer facilement. Ils attendent quelques…"
- "vacances" (fr:lex:vacances): not taught anywhere in the course; teach in être Verbs - DR & MRS VANDERTRAMP (went, came, left) (position 113). Sentence: "…trains. Les Français adorent leurs vacances. En été, ils voyagent souvent vers…"
- "profiter" (fr:lex:profiter): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…voyagent souvent vers le sud pour profiter du soleil et de la mer…"
- "soleil" (fr:lex:soleil): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in a lesson before this module. Sentence: "…vers le sud pour profiter du soleil et de la mer Méditerranée. Nice et…"
- "mer" (fr:lex:mer): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in a lesson before Reading Comprehension 3 - La Première Page (position 37). Sentence: "…sud pour profiter du soleil et de la mer Méditerranée. Nice et Cannes sont des…"
- "préfèrent" (fr:lex:preferer): not taught anywhere in the course; teach in a lesson before Reading Comprehension 5 - La fée verte (The Green Fairy) (position 63). Sentence: "…très populaires. D'autres préfèrent rester dans leur région et…"
- "découvrir" (fr:lex:decouvrir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…rester dans leur région et découvrir la beauté de la campagne française.…"
- "campagne" (fr:lex:campagne): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…et découvrir la beauté de la campagne française. La technologie change…"
- "quotidienne" (fr:lex:quotidien): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…technologie change aussi la vie quotidienne en France. Les jeunes Français…"
- "garde" (fr:lex:garde): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…de leurs parents, mais elle garde les valeurs françaises importantes.…"
- "valeurs" (fr:lex:valeur): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…leurs parents, mais elle garde les valeurs françaises importantes. Aujourd'hui,…"
- "citoyens" (fr:lex:citoyen): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…Le gouvernement encourage les citoyens à utiliser les transports publics,…"
- "déchets" (fr:lex:dechet): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…publics, à recycler leurs déchets, et à économiser l'énergie. Ces…"
- "montrent" (fr:lex:montrer): not taught anywhere in the course; teach in Commands with Pronouns (position 103). Sentence: "…économiser l'énergie. Ces efforts montrent que la France pense à l'avenir de…"
- "avenir" (fr:lex:avenir): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…montrent que la France pense à l'avenir de la planète. Les relations…"
- "mondiales" (fr:lex:mondial): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…aux organisations européennes et mondiales. Les diplomates français voyagent…"
- "rencontrer" (fr:lex:rencontrer): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "…voyagent régulièrement pour rencontrer leurs homologues étrangers. Ils…"
- "patrimoine" (fr:lex:patrimoine): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…et innovation. Elle préserve son patrimoine historique tout en embrassant les…"
- "embrassant" (fr:lex:embrasser): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…son patrimoine historique tout en embrassant les changements du vingt et unième…"
- "unième" (fr:lex:unieme): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…les changements du vingt et unième siècle. Cette nation continue à…"
- "siècle" (fr:lex:siecle): not taught anywhere in the course; teach in a lesson before this module. Sentence: "…les changements du vingt et unième siècle. Cette nation continue à jouer un…"
- "jouer" (fr:lex:jouer): not taught anywhere in the course; teach in Imparfait Formation - All Verbs (was doing, used to do) (position 115). Sentence: "…siècle. Cette nation continue à jouer un rôle significatif sur la scène…"
- fr:cx:relative.qui: not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "La France d'aujourd'hui est un pays qui continue à évoluer rapidement. Avec ses…"
- "quels" (fr:lex:quel): the word quel is taught at position 20, but this form is not; teach in a lesson before this module. Instruction: "Dans quels secteurs travaillent les Français?"
- "rencontrent" (fr:lex:rencontrer): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Instruction: "Avec qui les diplomates français rencontrent-ils?"
- "Mouvement" (fr:lex:mouvement): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Un Pays en Mouvement"

### 148. Unit 11 Practice - Fill in the Blanks

- "huit" (fr:lex:huit): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "Je dors huit heures par nuit."
- "dix" (fr:lex:dix): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "Elle vit à Paris depuis dix ans."
- "jusqu'" (fr:lex:jusque): not taught anywhere in the course; teach in a lesson before this module. Sentence: "Je reste ici jusqu'à demain."
- "gare" (fr:lex:gare): taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "Excusez-moi, où est la gare? J'ai un rendez-vous là-bas à trois heures."
- "trois" (fr:lex:trois): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "Excusez-moi, où est la gare? J'ai un rendez-vous là-bas à trois heures."
- "vers" (fr:lex:vers): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "Je attends mes amis au café. Ils arrivent généralement vers huit heures."
- "évolue" (fr:lex:evoluer): *évolue* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "La France évolue rapidement. Ses habitants vivent dans des villes modernes."
- "habitants" (fr:lex:habitant): not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147). Sentence: "La France évolue rapidement. Ses habitants vivent dans des villes modernes."
- "seras" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in a lesson before this module. Concept card: "tu seras"
- "aura" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in a lesson before this module. Concept card: "il aura fait"
- fr:cx:futur-anterieur: not taught anywhere in the course; teach in a lesson before this module. Concept card: "il aura fait"
- "viendrais" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in a lesson before this module. Concept card: "je viendrais"
- "aurait" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in a lesson before this module. Concept card: "il aurait fait"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 128). Concept card: "il aurait fait"
- fr:cx:passive: not taught anywhere in the course; teach in a lesson before this module. Concept card: "je suis aimé"
- "viendrai" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in a lesson before this module. Concept card: "je viendrai"

### 149. Unit 11 Final Exam - Daily Essentials & Practical Communication

- "deux" (fr:lex:deux): not taught anywhere in the course; teach in Prepositions - Spatial & Relational Words (position 23). Sentence: "j'ai vingt-deux ans"
- "huit" (fr:lex:huit): not taught anywhere in the course; teach in Morning Routine - se réveiller, se lever (position 95). Sentence: "je m'appelle Sophie, j'ai vingt-huit ans, je suis née à Paris"
- "française" (fr:lex:francais): the word français is taught at position 68, but this form is not; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "j'écoute de la musique française"
- "dix" (fr:lex:dix): not taught anywhere in the course; teach in a lesson before Unit 6 Practice - Fill in the Blanks (position 76). Sentence: "le train arrive à dix-huit heures"
- "six" (fr:lex:six): not taught anywhere in the course; teach in a lesson before Reading Comprehension 4 - La nouvelle époque de Marie (position 50). Sentence: "le train arrive à six heures"
- "trois" (fr:lex:trois): not taught anywhere in the course; teach in a lesson before Reading Comprehension 6 - Un Voyage en Famille (position 75). Sentence: "je reste trois jours"
- "musée" (fr:lex:musee): *musée* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Directions & Navigation (position 146), or let the learner read it instead of typing it. Sentence: "où est le musée?"
- "gare" (fr:lex:gare): taught later, at position 158 (Embedded Questions - Polite Indirect Questions); teach in More Spatial Relations - Distance & Proximity (position 109). Sentence: "excusez-moi, où est la gare?"
- "soixante" (fr:lex:soixante): not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147). Sentence: "la France a soixante-huit millions d'habitants"
- "millions" (fr:lex:million): *millions* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147), or let the learner read it instead of typing it. Sentence: "la France a soixante-huit millions d'habitants"
- "habitants" (fr:lex:habitant): not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147). Sentence: "la France a soixante-huit millions d'habitants"
- "touristes" (fr:lex:touriste): *touristes* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "les touristes cherchent des directions pour trouver les monuments"
- "directions" (fr:lex:direction): *directions* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147), or let the learner read it instead of typing it. Sentence: "les touristes cherchent des directions pour trouver les monuments"
- "monuments" (fr:lex:monument): *monuments* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "les touristes cherchent des directions pour trouver les monuments"
- "artistes" (fr:lex:artiste): *artistes* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in Essential Verb - pouvoir (can) (position 18), or let the learner read it instead of typing it. Sentence: "les artistes français vivent souvent dans des quartiers comme Montmartre"
- "quartiers" (fr:lex:quartier): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Sentence: "les artistes français vivent souvent dans des quartiers comme Montmartre"
- "moderne" (fr:lex:moderne): *moderne* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "la France moderne combine tradition et innovation"
- "combine" (fr:lex:combiner): *combine* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before this module, or let the learner read it instead of typing it. Sentence: "la France moderne combine tradition et innovation"
- "tradition" (fr:lex:tradition): *tradition* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147), or let the learner read it instead of typing it. Sentence: "la France moderne combine tradition et innovation"
- "innovation" (fr:lex:innovation): *innovation* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Reading 11 - La France Moderne (position 147), or let the learner read it instead of typing it. Sentence: "la France moderne combine tradition et innovation"
- "viendrai" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "je viendrai"
- "seras" (fr:lex:etre): the word être is taught at position 3, but this form is not; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "tu seras"
- "aura" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "il aura fait"
- fr:cx:futur-anterieur: not taught anywhere in the course; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "il aura fait"
- "viendrais" (fr:lex:venir): the word venir is taught at position 29, but this form is not; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "je viendrais"
- "aurait" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "il aurait fait"
- fr:cx:conditionnel-passe.avoir: not taught anywhere in the course; teach in Si j'avais su... - Past Regret Phrases (position 128). Concept card: "il aurait fait"
- fr:cx:passive: not taught anywhere in the course; teach in a lesson before Unit 11 Practice - Fill in the Blanks (position 148). Concept card: "je suis aimé"
- "aurons" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in a lesson before this module. Concept card: "nous aurons parlé"
- "aurions" (fr:lex:avoir): the word avoir is taught at position 4, but this form is not; teach in a lesson before this module. Concept card: "nous aurions parlé"
- "respecté" (fr:lex:respecter): not taught anywhere in the course; teach in a lesson before this module. Concept card: "tu es respecté"

## Unit 12: Curiosity & Questions

### 150. Nature & Animals - Curiosity Vocabulary

- "bleu" (fr:lex:bleu): taught later, at position 154 (Complex pourquoi Questions - Ask Why About Anything); teach in this module. Sentence: "un oiseau bleu"
- "jaune" (fr:lex:jaune): not taught anywhere in the course; teach in a lesson before Reading Comprehension 3 - La Première Page (position 37). Sentence: "un papillon jaune"
- "nage" (fr:lex:nager): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in Learning & Teaching - apprendre & enseigner (position 80). Concept card: "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?"
- "saute" (fr:lex:sauter): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in this module. Concept card: "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?"
- "volent" (fr:lex:voler): taught later, at position 151 (Movement Verbs - Actions in Nature); teach in this module. Concept card: "Pourquoi est-ce que les oiseaux volent?"
- "souffler" (fr:lex:souffler): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in this module. Vocabulary note: "souffler"
- "pleuvoir" (fr:lex:pleuvoir): taught later, at position 152 (Natural Phenomena - How Nature Works); teach in Causal & Reason Words - Explaining Why (position 107). Vocabulary note: "pleuvoir"

### 151. Movement Verbs - Actions in Nature

- "nageais" (fr:lex:nager): the word nager is taught at position 151, but this form is not; teach in this module. Concept card: "Je nageais"

### 152. Natural Phenomena - How Nature Works

- "printemps" (fr:lex:printemps): not taught anywhere in the course; teach in this module. Sentence: "les plantes poussent au printemps"
- "ciel" (fr:lex:ciel): taught later, at position 154 (Complex pourquoi Questions - Ask Why About Anything); teach in this module. Sentence: "le soleil brille dans le ciel"
- "bleu" (fr:lex:bleu): taught later, at position 154 (Complex pourquoi Questions - Ask Why About Anything); teach in Nature & Animals - Curiosity Vocabulary (position 150). Concept card: "Qu'est-ce qui rend le ciel bleu?"
- fr:cx:q.quest-ce-qui: taught later, at position 153 (qu'est-ce qui vs qu'est-ce que - Master 'What' Questions); teach in this module. Concept card: "Qu'est-ce qui rend le ciel bleu?"
- "lumière" (fr:lex:lumiere): not taught anywhere in the course; teach in a lesson before Reading 10 - Mes Rêves et Mes Espoirs (position 137). Concept card: "La lumière rend le ciel bleu"

### 153. qu'est-ce qui vs qu'est-ce que - Master 'What' Questions

- "printemps" (fr:lex:printemps): not taught anywhere in the course; teach in Natural Phenomena - How Nature Works (position 152). Sentence: "qu'est-ce qui pousse au printemps?"
- "ciel" (fr:lex:ciel): taught later, at position 154 (Complex pourquoi Questions - Ask Why About Anything); teach in Natural Phenomena - How Nature Works (position 152). Sentence: "qu'est-ce qui brille dans le ciel?"
- "nuages" (fr:lex:nuage): taught later, at position 154 (Complex pourquoi Questions - Ask Why About Anything); teach in this module. Sentence: "qu'est-ce qui rend les nuages blancs?"
- "blancs" (fr:lex:blanc): taught later, at position 154 (Complex pourquoi Questions - Ask Why About Anything); teach in this module. Sentence: "qu'est-ce qui rend les nuages blancs?"

### 154. Complex pourquoi Questions - Ask Why About Anything

- "ailes" (fr:lex:aile): not taught anywhere in the course; teach in this module. Sentence: "pourquoi est-ce que les oiseaux ont des ailes?"

### 156. qui est-ce qui vs qui est-ce que - Master 'Who' Questions

- "rencontré" (fr:lex:rencontrer): not taught anywhere in the course; teach in a lesson before Reading 9 - Une Histoire du Passé (position 118). Sentence: "qui est-ce que tu as rencontré?"

### 159. Rhetorical & Negative Questions - Advanced Style

- "magnifique" (fr:lex:magnifique): *magnifique* is a cognate, so English speakers may read it before it is taught, but they should not have to type it; not taught anywhere in the course; teach in a lesson before Reading 8 - Ma Journée (position 104), or let the learner read it instead of typing it. Sentence: "n'est-ce pas magnifique?"

# 2. Exam topics not taught

## Unit 1: Essential Grammar

### 13. Unit 1 Final Exam - Foundation

- exam 2024-01-11-unit1-exam (position 13) tests fr:cx:cest, which is not taught by then

## Unit 4: Everyday Words

### 51. Unit 4 Practice - Fill in the Blanks

- practice 2024-04-03-unit-4-practice (position 51) tests fr:cx:chunk.je-ne-sais-pas, which is not taught by then

### 52. Unit 4 Final Exam - Expression

- exam 2024-04-02-unit-4-exam (position 52) tests fr:cx:chunk.je-ne-sais-pas, which is not taught by then

## Unit 5: Time & Taste

### 64. Unit 5 Practice - Fill in the Blanks

- practice 2024-04-15-unit-5-practice (position 64) tests fr:cx:passe-compose.etre, which is not taught by then
- practice 2024-04-15-unit-5-practice (position 64) tests fr:cx:si.present, which is not taught by then

### 65. Unit 5 Final Exam - Sophistication

- exam 2024-04-14-unit-5-exam (position 65) tests fr:cx:passe-compose.etre, which is not taught by then
- exam 2024-04-14-unit-5-exam (position 65) tests fr:cx:si.present, which is not taught by then

## Unit 9: Discourse & Past Tense

### 120. Unit 9 Final Exam - Discourse & Past Tense

- exam 2024-06-09-unit-9-exam (position 120) tests fr:cx:plus-que-parfait.avoir, which is not taught by then
- exam 2024-06-09-unit-9-exam (position 120) tests fr:cx:plus-que-parfait.etre, which is not taught by then

## Unit 10: Mastery & Nuance

### 138. Unit 10 Practice - Fill in the Blanks

- practice 2024-02-05-unit-10-practice (position 138) tests fr:cx:relative.qui, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 138) tests fr:cx:relative.que, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 138) tests fr:cx:relative.ou, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 138) tests fr:cx:relative.dont, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 138) tests fr:cx:relative.ce-que, which is not taught by then
- practice 2024-02-05-unit-10-practice (position 138) tests fr:cx:neg.ne-rien, which is not taught by then

### 139. Unit 10 Final Exam - Mastery & Nuance

- exam 2024-02-04-unit-10-exam (position 139) tests fr:cx:relative.qui, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 139) tests fr:cx:relative.que, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 139) tests fr:cx:relative.ou, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 139) tests fr:cx:relative.dont, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 139) tests fr:cx:relative.ce-que, which is not taught by then
- exam 2024-02-04-unit-10-exam (position 139) tests fr:cx:neg.ne-rien, which is not taught by then

## Unit 11: Daily Essentials

### 148. Unit 11 Practice - Fill in the Blanks

- practice 2024-02-16-unit-11-practice (position 148) tests fr:cx:futur-anterieur, which is not taught by then
- practice 2024-02-16-unit-11-practice (position 148) tests fr:cx:conditionnel-passe.avoir, which is not taught by then
- practice 2024-02-16-unit-11-practice (position 148) tests fr:cx:passive, which is not taught by then

### 149. Unit 11 Final Exam - Daily Essentials & Practical Communication

- exam 2024-02-15-unit-11-exam (position 149) tests fr:cx:futur-anterieur, which is not taught by then
- exam 2024-02-15-unit-11-exam (position 149) tests fr:cx:conditionnel-passe.avoir, which is not taught by then
- exam 2024-02-15-unit-11-exam (position 149) tests fr:cx:passive, which is not taught by then

# 3. Translation prompts to convert

- 14. Demonstratives - It, That, This: 10 prompts
- 15. ça - Survival Phrases: 4 prompts
- 16. Determiners + Nouns - Building Phrases: 11 prompts
- 17. Essential Verb - vouloir (to want): 14 prompts
- 18. Essential Verb - pouvoir (can): 16 prompts
- 19. Essential Verb - voir (to see): 8 prompts
- 20. Question Words - Ask Anything!: 15 prompts
- 22. Stressed Pronouns - moi, toi, lui...: 12 prompts
- 23. Prepositions - Spatial & Relational Words: 20 prompts
- 24. Common Adjectives - Describing Things: 16 prompts
- 27. Unit 2 Final Exam - Composition: 33 prompts
- 28. Contractions - du, au, de la, à la: 3 prompts
- 29. Essential Verb - venir (to come): 22 prompts
- 30. Essential Verb - aller (to go): 20 prompts
- 32. Essential Verb - partir (to leave): 20 prompts
- 35. Possessive Pronouns - Mine, Yours, Theirs: 12 prompts
- 36. Putting It Together - Who Has What?: 10 prompts
- 39. Unit 3 Final Exam - Movement & Possession: 26 prompts
- 40. Survival Phrases - Real-World Essentials: 5 prompts
- 41. Essential Verb - faire (to do/make): 25 prompts
- 42. Essential Verb - devoir (must): 20 prompts
- 43. Essential Verb - parler (to speak): 8 prompts
- 44. Essential Verbs - chercher & trouver: 14 prompts
- 45. Negation - ne...pas (not): 8 prompts
- 46. Time & Frequency - now, always, never, today: 24 prompts
- 47. Negation Part 2 - I can't, I won't, I never: 18 prompts
- 48. Location Adverbs - here, there, everywhere: 12 prompts
- 49. Everyday Nouns - Life & World: 23 prompts
- 52. Unit 4 Final Exam - Expression: 41 prompts
- 53. Comparisons & Intensity: 18 prompts
- 54. Slang - Comparisons & Intensity: 19 prompts
- 55. Should & Could - Advice and Possibility: 20 prompts
- 56. Would Forms - Hypotheticals and Desires: 21 prompts
- 57. aimer - To Like / To Love: 20 prompts
- 58. être - Past Tense (was / were): 20 prompts
- 59. avoir - Past Tense (had): 20 prompts
- 60. Everyday Food Nouns: 24 prompts
- 61. manger - To Eat (Present & Past): 26 prompts
- 62. boire - To Drink (Present & Past): 28 prompts
- 65. Unit 5 Final Exam - Sophistication: 70 prompts
- 66. Progressive & Future - Expressing Time: 21 prompts
- 67. dire - To Say / To Tell: 22 prompts
- 68. prendre - To Take: 26 prompts
- 69. donner - To Give: 16 prompts
- 70. mettre - To Put / To Set: 22 prompts
- 71. demander - To Ask: 25 prompts
- 72. commander - To Order: 23 prompts
- 73. avoir besoin de - To Need: 23 prompts
- 74. Essential Vocabulary - Time, People & Ideas: 33 prompts
- 77. Unit 6 Final Exam - Communication: 75 prompts
- 78. Talking About People in General: 8 prompts
- 79. Studying & Reviewing - étudier & réviser: 6 prompts
- 80. Learning & Teaching - apprendre & enseigner: 6 prompts
- 81. comprendre - To Understand: 8 prompts
- 82. savoir - To Know (Facts/Skills): 8 prompts
- 83. connaître - To Know (People/Places): 8 prompts
- 84. penser - To Think: 8 prompts
- 85. croire - To Believe: 8 prompts
- 86. Knowledge & Learning - Essential Nouns: 6 prompts
- 87. Discourse Markers - Sound Like a Native: 15 prompts
- 88. Modifiers - tout, même, mal: 6 prompts
- 91. Unit 7 Final Exam - Knowledge & Learning: 58 prompts
- 92. Temporal & Sequential Words - Time & Order: 12 prompts
- 93. Reflexive Pronouns - me, te, se, nous, vous: 1 prompt
- 94. s'appeler - To Be Called (Your Name!): 6 prompts
- 95. Morning Routine - se réveiller, se lever: 6 prompts
- 96. Getting Ready - se laver, s'habiller, se préparer: 6 prompts
- 97. Daily Actions - se souvenir, s'amuser, se dépêcher: 6 prompts
- 98. Reflexive Verbs in Past Tense: 5 prompts
- 99. Reciprocal Reflexives - Each Other: 6 prompts
- 100. Commands - tu form (Informal): 6 prompts
- 101. Commands - vous form (Formal/Plural): 4 prompts
- 102. Irregular Commands - être, avoir, aller, faire: 6 prompts
- 103. Commands with Pronouns: 5 prompts
- 106. Unit 8 Final Exam - Daily Life & Actions: 37 prompts
- 120. Unit 9 Final Exam - Discourse & Past Tense: 35 prompts
- 121. Forms Used After 'il faut que' and 'je veux que': 8 prompts
- 122. More Forms for 'il faut que' and 'je veux que' Phrases: 10 prompts
- 123. Il faut que... - Saying What's Necessary: 3 prompts
- 124. Je veux que... - Expressing Wishes: 3 prompts
- 125. Je suis content que... - Emotion Phrases: 6 prompts
- 126. Je pense que... - Opinion Phrases: 6 prompts
- 127. Si j'étais... - Daydreaming & Hypotheticals: 6 prompts
- 128. Si j'avais su... - Past Regret Phrases: 6 prompts
- 129. J'avais déjà... - Had Already Done Phrases: 6 prompts
- 130. vraiment, sérieusement... - Common Adverbs: 7 prompts
- 131. En mangeant... - While Doing Phrases: 6 prompts
- 132. Je me fais couper... - Service Phrases: 6 prompts
- 133. Avant que... - Before Phrases: 5 prompts
- 134. Pour que... - So That Phrases: 5 prompts
- 135. Bien que... - Although Phrases: 5 prompts
- 136. Il est possible que... - Possibility Phrases: 6 prompts
- 139. Unit 10 Final Exam - Mastery & Nuance: 30 prompts
- 140. Age & Personal Information: 10 prompts
- 141. donner - To Give: 10 prompts
- 142. Daily Life Essentials - Sleep, Work, Live: 15 prompts
- 143. Search & Find - chercher, trouver: 14 prompts
- 144. Perception Verbs - écouter, regarder: 14 prompts
- 145. Social Situations - Wait, Arrive, Stay: 15 prompts
- 146. Directions & Navigation: 15 prompts
- 149. Unit 11 Final Exam - Daily Essentials & Practical Communication: 46 prompts
- 150. Nature & Animals - Curiosity Vocabulary: 15 prompts
- 151. Movement Verbs - Actions in Nature: 19 prompts
- 152. Natural Phenomena - How Nature Works: 15 prompts
- 153. qu'est-ce qui vs qu'est-ce que - Master 'What' Questions: 16 prompts
- 154. Complex pourquoi Questions - Ask Why About Anything: 18 prompts
- 155. Complex comment Questions - Ask How Things Work: 16 prompts
- 156. qui est-ce qui vs qui est-ce que - Master 'Who' Questions: 15 prompts
- 157. Inversion Questions - Formal Register: 15 prompts
- 158. Embedded Questions - Polite Indirect Questions: 15 prompts
- 159. Rhetorical & Negative Questions - Advanced Style: 12 prompts
- 160. Multi-Clause Questions - Full Complexity: 14 prompts

# 4. Taught twice

- fr:cx:noun.gender is taught at positions 5, 7; merge into Articles - The, A, An
- fr:lex:le is taught at positions 5, 8, 33, 35; merge into Articles - The, A, An
- fr:cx:article.indefinite is taught at positions 5, 8; merge into Articles - The, A, An
- fr:cx:article.definite is taught at positions 5, 8; merge into Articles - The, A, An
- fr:lex:livre is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:chat is taught at positions 7, 8, 150; merge into Basic Nouns - People & Things
- fr:lex:chien is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:ami is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:enfant is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:chose is taught at positions 7, 8; merge into Basic Nouns - People & Things
- fr:lex:etre is taught at positions 3, 15, 16, 20, 36, 40, 54, 58, 66, 67, 70, 78, 84, 87, 98, 102, 113, 114, 115, 117, 121, 125, 127, 128, 129, 133, 134, 136, 140, 143, 144, 146, 152, 153, 156, 159, 160; merge into Essential Verb - être (to be)
- fr:lex:avoir is taught at positions 4, 15, 16, 36, 45, 59, 61, 62, 73, 78, 102, 110, 111, 112, 117, 121, 125, 127, 128, 129, 140, 143, 152, 159; merge into Essential Verb - avoir (to have)
- fr:lex:ca is taught at positions 14, 15; merge into Demonstratives - It, That, This
- fr:cx:demonstrative.adjective is taught at positions 14, 16; merge into Demonstratives - It, That, This
- fr:cx:frame.modal-infinitive is taught at positions 17, 18, 29, 42, 112; merge into Essential Verb - vouloir (to want)
- fr:lex:aller is taught at positions 15, 20, 30, 36, 47, 56, 66, 78, 86, 88, 102, 115, 121, 146; merge into ça - Survival Phrases
- fr:cx:chunk.ca-va is taught at positions 15, 20; merge into ça - Survival Phrases
- fr:lex:elle is taught at positions 2, 22; fr:lex:elle.pronoun at positions 2, 22; merge into Core Pronouns - The Building Blocks
- fr:lex:nous is taught at positions 2, 22, 33, 93; fr:lex:nous.pronoun at positions 2, 22, 33, 93; merge into Core Pronouns - The Building Blocks
- fr:lex:vous is taught at positions 2, 22, 33, 93; fr:lex:vous.pronoun at positions 2, 22, 33, 93; merge into Core Pronouns - The Building Blocks
- fr:lex:elles is taught at positions 2, 22; merge into Core Pronouns - The Building Blocks
- fr:lex:bon is taught at positions 1, 24, 40, 87; merge into Famous Words & Greetings
- fr:cx:elision is taught at positions 4, 28, 45, 94; merge into Essential Verb - avoir (to have)
- fr:lex:des is taught at positions 8, 28; merge into Plurals - More Than One
- fr:lex:a.preposition is taught at positions 23, 28; merge into Prepositions - Spatial & Relational Words
- fr:lex:de is taught at positions 23, 28; merge into Prepositions - Spatial & Relational Words
- fr:lex:vouloir is taught at positions 17, 36, 40, 56, 72, 115, 124; merge into Essential Verb - vouloir (to want)
- fr:lex:venir is taught at positions 29, 36, 100, 101, 122, 133, 134; merge into Essential Verb - venir (to come)
- fr:cx:pronoun.direct-object is taught at positions 33, 36; merge into Object Pronouns - Him, Her, It, Them
- fr:lex:plaire is taught at positions 1, 40; merge into Famous Words & Greetings
- fr:lex:pardon is taught at positions 1, 40; merge into Famous Words & Greetings
- fr:cx:chunk.sil-vous-plait is taught at positions 1, 40; merge into Famous Words & Greetings
- fr:lex:ou.adverb is taught at positions 20, 40, 142, 146, 157; merge into Question Words - Ask Anything!
- fr:lex:combien is taught at positions 20, 40; merge into Question Words - Ask Anything!
- fr:lex:tres is taught at positions 10, 46; merge into Basic Connectors - et, mais, ou, aussi, très
- fr:lex:ne is taught at positions 45, 47, 66, 68, 81, 82, 85, 103, 126, 158, 159; merge into Negation - ne...pas (not)
- fr:cx:adverb.placement is taught at positions 46, 48; merge into Time & Frequency - now, always, never, today
- fr:lex:addition is taught at positions 40, 49; merge into Survival Phrases - Real-World Essentials
- fr:lex:temps is taught at positions 46, 49; merge into Time & Frequency - now, always, never, today
- fr:lex:quelque is taught at positions 48, 49; merge into Location Adverbs - here, there, everywhere
- fr:lex:tout is taught at positions 49, 53, 78, 88, 115, 116, 146; merge into Everyday Nouns - Life & World
- fr:cx:chunk.tout-le-monde is taught at positions 49, 53, 78, 88; merge into Everyday Nouns - Life & World
- fr:lex:trop is taught at positions 53, 54; merge into Comparisons & Intensity
- fr:lex:pouvoir is taught at positions 18, 55, 78, 122, 134, 136, 158; merge into Essential Verb - pouvoir (can)
- fr:lex:devoir is taught at positions 42, 55, 78; merge into Essential Verb - devoir (must)
- fr:lex:faire is taught at positions 41, 56, 78, 102, 115, 121, 132; merge into Essential Verb - faire (to do/make)
- fr:cx:conditionnel-present is taught at positions 55, 56; merge into Should & Could - Advice and Possibility
- fr:cx:imparfait is taught at positions 58, 59, 115; merge into être - Past Tense (was / were)
- fr:lex:cafe is taught at positions 1, 60; merge into Famous Words & Greetings
- fr:cx:article.partitive is taught at positions 28, 60; merge into Contractions - du, au, de la, à la
- fr:lex:eau is taught at positions 49, 60; merge into Everyday Nouns - Life & World
- fr:lex:pain is taught at positions 49, 60; merge into Everyday Nouns - Life & World
- fr:cx:passe-compose.avoir is taught at positions 61, 62, 110, 111, 112; merge into manger - To Eat (Present & Past)
- fr:cx:frame.aller-infinitive is taught at positions 30, 66; merge into Essential Verb - aller (to go)
- fr:lex:parler is taught at positions 43, 66, 99, 100, 101, 115, 131; merge into Essential Verb - parler (to speak)
- fr:lex:manger is taught at positions 61, 66, 100, 101, 131; merge into manger - To Eat (Present & Past)
- fr:cx:verb.er.present is taught at positions 43, 69; merge into Essential Verb - parler (to speak)
- fr:lex:aide is taught at positions 71, 73, 141; merge into demander - To Ask
- fr:lex:personne is taught at positions 49, 74, 78; merge into Everyday Nouns - Life & World
- fr:lex:on is taught at positions 2, 78; merge into Core Pronouns - The Building Blocks
- fr:cx:pronoun.on is taught at positions 2, 78; merge into Core Pronouns - The Building Blocks
- fr:lex:voir is taught at positions 19, 78, 99, 146; merge into Essential Verb - voir (to see)
- fr:lex:dire is taught at positions 67, 78; merge into dire - To Say / To Tell
- fr:lex:apprendre is taught at positions 68, 80; merge into prendre - To Take
- fr:lex:comprendre is taught at positions 68, 81, 87, 88, 99, 122, 134; merge into prendre - To Take
- fr:cx:frame.verb-que-clause is taught at positions 67, 84, 85, 126, 143; merge into dire - To Say / To Tell
- fr:lex:question is taught at positions 74, 86; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:savoir is taught at positions 82, 86; merge into savoir - To Know (Facts/Skills)
- fr:lex:savoir.verb is taught at positions 82, 86, 122, 134, 158; merge into savoir - To Know (Facts/Skills)
- fr:lex:bien is taught at positions 1, 87, 135, 142, 144; merge into Famous Words & Greetings
- fr:lex:fait is taught at positions 74, 87; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:penser is taught at positions 84, 87, 100, 126; merge into penser - To Think
- fr:lex:meme is taught at positions 53, 88; merge into Comparisons & Intensity
- fr:lex:mal is taught at positions 53, 88; merge into Comparisons & Intensity
- fr:lex:me is taught at positions 33, 93; merge into Object Pronouns - Him, Her, It, Them
- fr:lex:te is taught at positions 33, 93; merge into Object Pronouns - Him, Her, It, Them
- fr:lex:aimer is taught at positions 57, 93, 99, 124; merge into aimer - To Like / To Love
- fr:lex:comment is taught at positions 20, 94, 144, 146, 155, 157, 159, 160; merge into Question Words - Ask Anything!
- fr:lex:lever is taught at positions 93, 95; merge into Reflexive Pronouns - me, te, se, nous, vous
- fr:lex:laver is taught at positions 93, 96; merge into Reflexive Pronouns - me, te, se, nous, vous
- fr:lex:preparer is taught at positions 93, 96; merge into Reflexive Pronouns - me, te, se, nous, vous
- fr:lex:connaitre is taught at positions 83, 99; merge into connaître - To Know (People/Places)
- fr:lex:partir is taught at positions 32, 100, 122, 133; merge into Essential Verb - partir (to leave)
- fr:lex:prendre is taught at positions 68, 100, 101, 115; merge into prendre - To Take
- fr:lex:ecouter is taught at positions 100, 101, 103, 131, 144; merge into Commands - tu form (Informal)
- fr:lex:regarder is taught at positions 100, 101, 103, 144; merge into Commands - tu form (Informal)
- fr:lex:donner is taught at positions 69, 103, 141; merge into donner - To Give
- fr:lex:pourquoi is taught at positions 20, 107, 154, 157, 159, 160; merge into Question Words - Ask Anything!
- fr:lex:raison is taught at positions 74, 107; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:dans is taught at positions 23, 108; merge into Prepositions - Spatial & Relational Words
- fr:lex:sur.preposition is taught at positions 23, 108; merge into Prepositions - Spatial & Relational Words
- fr:lex:sous is taught at positions 23, 108; merge into Prepositions - Spatial & Relational Words
- fr:lex:derriere is taught at positions 23, 108; merge into Prepositions - Spatial & Relational Words
- fr:lex:devant is taught at positions 23, 108; merge into Prepositions - Spatial & Relational Words
- fr:lex:entre is taught at positions 23, 108; merge into Prepositions - Spatial & Relational Words
- fr:lex:place is taught at positions 49, 108; merge into Everyday Nouns - Life & World
- fr:lex:ici is taught at positions 48, 109; merge into Location Adverbs - here, there, everywhere
- fr:lex:cote is taught at positions 74, 109, 146; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:deja is taught at positions 46, 110; merge into Time & Frequency - now, always, never, today
- fr:lex:hier is taught at positions 46, 110, 116; merge into Time & Frequency - now, always, never, today
- fr:cx:ptcp.er is taught at positions 61, 110; merge into manger - To Eat (Present & Past)
- fr:lex:devoir.noun is taught at positions 42, 111; merge into Essential Verb - devoir (must)
- fr:cx:ptcp.agreement is taught at positions 98, 113, 114; merge into Reflexive Verbs in Past Tense
- fr:lex:y is taught at positions 78, 115, 117; merge into Talking About People in General
- fr:lex:y.pronoun is taught at positions 78, 115, 117; merge into Talking About People in General
- fr:lex:quand is taught at positions 20, 116, 157; merge into Question Words - Ask Anything!
- fr:lex:toujours is taught at positions 46, 116; merge into Time & Frequency - now, always, never, today
- fr:lex:moment is taught at positions 74, 116; merge into Essential Vocabulary - Time, People & Ideas
- fr:lex:pendant is taught at positions 92, 116; merge into Temporal & Sequential Words - Time & Order
- fr:lex:donc is taught at positions 87, 117; merge into Discourse Markers - Sound Like a Native
- fr:lex:alors is taught at positions 87, 117; merge into Discourse Markers - Sound Like a Native
- fr:cx:il-y-a is taught at positions 115, 117; merge into Imparfait Formation - All Verbs (was doing, used to do)
- fr:cx:subj.il-faut-que is taught at positions 121, 122, 123; merge into Forms Used After 'il faut que' and 'je veux que'
- fr:cx:subj.vouloir-que is taught at positions 121, 122, 124; merge into Forms Used After 'il faut que' and 'je veux que'
- fr:lex:probablement is taught at positions 87, 130; merge into Discourse Markers - Sound Like a Native
- fr:lex:peut-etre is taught at positions 87, 136; merge into Discourse Markers - Sound Like a Native
- fr:cx:age.avoir-ans is taught at positions 4, 140; merge into Essential Verb - avoir (to have)
- fr:lex:quel is taught at positions 20, 140; merge into Question Words - Ask Anything!
- fr:lex:travailler is taught at positions 131, 142; merge into En mangeant... - While Doing Phrases
- fr:lex:chercher is taught at positions 44, 143; merge into Essential Verbs - chercher & trouver
- fr:lex:trouver is taught at positions 44, 143, 144; merge into Essential Verbs - chercher & trouver
- fr:lex:bus is taught at positions 68, 145; merge into prendre - To Take
- fr:lex:arriver is taught at positions 133, 145; merge into Avant que... - Before Phrases
- fr:lex:voiture is taught at positions 7, 146; merge into Basic Nouns - People & Things
- fr:lex:excuser is taught at positions 40, 146; merge into Survival Phrases - Real-World Essentials
- fr:lex:pres is taught at positions 109, 146; merge into More Spatial Relations - Distance & Proximity
- fr:lex:loin is taught at positions 109, 146; merge into More Spatial Relations - Distance & Proximity
- fr:lex:face is taught at positions 109, 146; merge into More Spatial Relations - Distance & Proximity
- fr:lex:petit is taught at positions 24, 150; merge into Common Adjectives - Describing Things
- fr:lex:poisson is taught at positions 60, 150; merge into Everyday Food Nouns
- fr:lex:marcher is taught at positions 131, 151; merge into En mangeant... - While Doing Phrases
- fr:lex:plante is taught at positions 150, 152; merge into Nature & Animals - Curiosity Vocabulary
- fr:lex:vent is taught at positions 150, 152; merge into Nature & Animals - Curiosity Vocabulary
- fr:lex:pluie is taught at positions 150, 152; merge into Nature & Animals - Curiosity Vocabulary
- fr:cx:q.quest-ce-que is taught at positions 20, 153; merge into Question Words - Ask Anything!
- fr:cx:q.est-ce-que is taught at positions 20, 154, 155; merge into Question Words - Ask Anything!
- fr:cx:q.inversion is taught at positions 20, 155, 157; merge into Question Words - Ask Anything!
- fr:lex:demander is taught at positions 71, 158; merge into demander - To Ask

# 5. Not reused

- Unit 1: Essential Grammar: 34
- Unit 2: Asking & Describing: 38
- Unit 3: Movement & Possession: 18
- Unit 4: Everyday Words: 61
- Unit 5: Time & Taste: 68
- Unit 6: Basic Fluency: 48
- Unit 7: Knowledge & Learning: 39
- Unit 8: Daily Life & Actions: 28
- Unit 9: Discourse & Past Tense: 43
- Unit 10: Mastery & Nuance: 54
- Unit 11: Daily Essentials: 29
- Unit 12: Curiosity & Questions: 32

First 20:

- fr:lex:bonjour (taught at position 1) expected by position 3; last use at position 137
- fr:lex:bonsoir (taught at position 1) expected by position 3; last use at position 50
- fr:lex:merci (taught at position 1) expected by position 3; last use at position 137
- fr:lex:oui (taught at position 1) expected by position 3; last use at position 137
- fr:lex:non (taught at position 1) expected by position 3; last use at position 126
- fr:lex:se (taught at position 1) expected by position 3; last use at position 147
- fr:lex:si (taught at position 1) expected by position 3; last use at position 155
- fr:lex:plaire (taught at position 1) expected by position 3; last use at position 152
- fr:lex:pardon (taught at position 1) expected by position 3; last use at position 71
- fr:lex:au (taught at position 1) expected by position 7; last use at position 153
- fr:lex:revoir (taught at position 1) expected by position 3; last use at position 137
- fr:lex:voila (taught at position 1) expected by position 3; last use at position 104
- fr:lex:cafe (taught at position 1) expected by position 18; last use at position 148
- fr:lex:bon (taught at position 1) expected by position 3; last use at position 149
- fr:lex:bien (taught at position 1) expected by position 3; last use at position 149
- fr:lex:salut (taught at position 1) expected by position 3; last use at position 137
- fr:cx:chunk.au-revoir (taught at position 1) expected by position 3; last use at position 137
- fr:cx:chunk.sil-vous-plait (taught at position 1) expected by position 3; last use at position 65
- fr:lex:on (taught at position 2) expected by position 4; last use at position 160
- fr:cx:pronoun.tu-vous (taught at position 2) expected by position 4; never used again

# 6. Levels

Each core list holds only the words and grammar patterns new at its level, so the A2 figures count A2 words alone. A learner at A2 also needs the A1 list, so the second table counts each level together with the levels below it. All percentages are rounded to the nearest whole number, and 100% means the whole list is taught.

Core words of each level alone taught by the end of the course: A1 50%, A2 13%, B1 3%.

Counting each level together with the levels below it: through A1 50%, through A2 32%, through B1 21%.

Each level on its own list:

| Level | Core words taught | Core constructions taught | Reached at |
|---|---|---|---|
| A1 | 50% (369 of 733) | 37 of 40 | Not reached |
| A2 | 13% (86 of 681) | 15 of 23 | Not reached |
| B1 | 3% (22 of 841) | 13 of 17 | Not reached |

Each level together with the levels below it:

| Levels | Core words taught | Core constructions taught | Reached at |
|---|---|---|---|
| Through A1 | 50% (369 of 733) | 37 of 40 | Not reached |
| Through A2 | 32% (455 of 1414) | 52 of 63 | Not reached |
| Through B1 | 21% (477 of 2255) | 65 of 80 | Not reached |

## Core grammar patterns not taught

- A1: de (d') instead of un, une, des or du after a negation (je n'ai pas de chat) (fr:cx:neg.de); Present tense of regular -ir verbs like finir (je finis, nous finissons) (fr:cx:verb.ir.present); Present tense of regular -re verbs like attendre (j'attends, il attend) (fr:cx:verb.re.present)
- A2: Negation ne … plus (no longer, no more) (fr:cx:neg.ne-plus); Negation ne … rien (nothing), also rien ne … at the start of a sentence (fr:cx:neg.ne-rien); The pronoun en (some, of it) before the verb or an infinitive, or attached to an imperative (j'en ai, il y en a, je vais en acheter, prends-en) (fr:cx:pronoun.en); The pronoun y (there, about it) before the verb or attached to an imperative (j'y vais, on y va, vas-y) (fr:cx:pronoun.y); Relative pronoun où after a noun of place or time (fr:cx:relative.ou); Relative pronoun que (qu') as the object of a relative clause after a noun, celui / celle / ceux / celles or a stressed pronoun (le livre que je cherche, le grand livre rouge que je cherche, celles qu'on aime, c'est toi que je vois) (fr:cx:relative.que); Relative pronoun qui as the subject of a relative clause after a noun, a pronoun or a name (la personne qui parle, le livre rouge qui est ici, c'est toi qui pars, le Café de Flore qui est en face) (fr:cx:relative.qui); Real condition si + present tense (si tu veux, si j'ai le temps, je viens si tu veux) (fr:cx:si.present)
- B1: Passive voice: être + past participle of a verb that is not an être verb (je suis aimé, la maison est construite, il a été compris) (fr:cx:passive); Plus-que-parfait with être for the être verbs (j'étais déjà parti, elle était venue) (fr:cx:plus-que-parfait.etre); Headless relatives ce que (what, as object) and ce qui (what, as subject): je fais ce que je veux, ce qui est important (fr:cx:relative.ce-que); Relative pronoun dont (of which, whose, about which: la chose dont je parle) (fr:cx:relative.dont)

## Core words not taught

- A1, 361 words (plus 3 listed under Verbs the checker cannot read yet): accepter, accident, accord, acheter, adorer, aéroport, Ah, aider, allemand, allô, alphabet, américain, anglais, animal, anniversaire, annuler, août, appartement, appétit, après-midi, asseoir, assiette, automne, avion, avril, banque, bateau, beaucoup, bébé, belge, bibliothèque, bientôt, billet, blond, bouche, boulangerie, bouteille, bras, bravo, bureau, cacher, cadeau, cahier, campagne, canadien, canapé, carotte, centre, chaise, chambre, changer, chanter, chapeau, chaussette, chaussure, chemise, cher, chinois, choisir, cinéma, cinquante, citron, clair, client, confirmer, confiture, contre, conversation, copain, coucher, couleur, course, court, cousin, couteau, crayon, cuillère, cuisine, dame, danser, décembre, découvrir, déjeuner, délicieux, demi, demi-heure, dent, dernier, désirer, dessert, dessin, dessiner, détester, deux, deuxième, différent, difficile, dimanche, dîner, direction, discuter, dix, docteur, doigt, dos, douche, doucher, douze, écharpe, écrire, effort, église, élève, embrasser, enchanté, entendre, entrée, envoyer, épeler, espagnol, étage, été, étudiant, euro, exemple, exercice, exister, expliquer, facile, félicitations, féliciter, fermer, fête, février, foot, fourchette, fraise, gagner, garçon, gomme, grand-mère, grand-père, gris, gros, habiter, haut, heureux, hôpital, hôtel, huit, important, information, intelligent, intéressant, internet, inviter, italien, jambe, jambon, janvier, japonais, jardin, jaune, jeudi, joli, jouer, journal, juillet, juin, jupe, kilo, kilomètre, lampe, langue, lettre, libre, lire, lit, litre, longtemps, lumière, lundi, lunettes, lycée, machine, madame, mademoiselle, magasin, mai, maman, marché, mardi, mari, marron, mars, match, matin, mauvais, médecin, menu, mercredi, météo, métier, mètre, métro, midi, minuit, mois, monsieur, montagne, montre, montrer, mot, moto, musée, neige, nez, Noël, noir, novembre, numéro, octobre, offrir, oh, oignon, oncle, onze, ordinateur, oreille, oublier, ouvrir, papa, parc, parent, passer, payer, pays, perdre, permettre, petit-déjeuner, pharmacie, photo, phrase, pièce, piscine, plage, plaisir, plat, poire, pomme de terre, poser, poste, préféré, préférer, premier, prénom, présenter, prêt, printemps, prix, prochain, profiter, pull, quarante, quart, quartier, quatorze, quatrième, radio, raisin, refuser, remercier, rencontrer, repas, répéter, répondre, réserver, restaurant, retard, retrouver, rêve, rêver, rien, robe, rose, rouge, route, russe, sac, saison, salle, salon, samedi, sandwich, sans, secret, seize, semaine, sens, sept, septembre, serveur, service, seul, simple, six, soif, soir, soirée, soixante, sommeil, souhaiter, soupe, sourire, sport, station, steak, stylo, suisse, suivre, sujet, super, supermarché, surprise, sympa, tante, tasse, taxi, téléphone, télévision, tennis, théâtre, ticket, tôt, tour, touriste, transport, traverser, treize, trois, troisième, utiliser, vacances, valise, vélo, vendeur, vendredi, ventre, verre, veste, vêtement, village, violet, visiter, voici, volontiers, voyage, vue, week-end, yaourt, zéro
- A2, 585 words (plus 10 listed under Verbs the checker cannot read yet): absent, absolument, accent, accompagner, acteur, activité, actrice, admirer, adolescent, adulte, affaire, âgé, agréable, aile, aimable, air, ajouter, alcool, allumer, ambulance, amener, amitié, amour, amoureux, amusant, ancien, appareil, appel, apporter, apprécier, arabe, armoire, arrêt, arrêter, arrivée, artiste, ascenseur, assez, assister, attacher, attirer, attraper, avance, avancer, avenir, aventure, avenue, avertir, avis, avocat, bagage, bague, baigner, bain, balcon, balle, ballon, banc, bar, barbe, bas, bâtiment, bavarder, beauté, beige, bête, bijou, bizarre, blague, blesser, bois, boîte, bol, bonbon, bonheur, bord, botte, boucherie, bouger, bougie, boulanger, boule, bouquet, boutique, bouton, britannique, brouillard, brun, caisse, calme, camarade, camion, canard, capitale, caractère, carnet, carrefour, casque, casquette, casser, cathédrale, cave, ceinture, célèbre, celui, centime, certain, chacun, chaîne, chaleur, champ, champagne, champion, changement, chanson, chanteur, charmant, château, chauffeur, chef, chemin, chèque, cheval, chiffre, choix, chou, cigarette, cirque, classique, club, cochon, coiffer, coiffeur, collègue, collier, comédie, comparer, complet, compliqué, compte, concert, conduire, congé, conseil, conseiller, contact, contacter, contraire, costume, cou, couloir, couple, cour, courage, courageux, courriel, courrier, couverture, cravate, créer, crème, crier, cuir, cuire, cuisiner, cuisinier, culture, curieux, danger, dangereux, danse, danseur, debout, décrire, décrocher, dedans, degré, dehors, déménager, départ, dépendre, dépenser, déplacer, déposer, déranger, destination, deviner, différence, directement, directeur, disputer, disque, dizaine, document, dommage, doucement, douleur, doux, drap, drapeau, drôle, échanger, écran, écriture, écrivain, émission, emmener, emploi, endormir, énergie, enfance, enlever, ennuyer, énorme, entier, entraîner, entreprise, épaule, épicerie, époque, équipe, erreur, escalier, espace, espérer, espoir, éteindre, étoile, étranger, européen, évidemment, exact, exactement, examen, excellent, excuse, expérience, explication, extraordinaire, fâcher, façon, facteur, fantastique, faute, fauteuil, faux, ferme, feu, feuille, fier, fièvre, fleuve, foncé, fonctionner, fond, forêt, forme, formidable, fou, frapper, fumer, gant, garage, garde, géant, général, généralement, genou, géographie, gorge, goût, goûter, gramme, grandir, grec, grippe, groupe, guerre, guide, guitare, habitant, heureusement, horrible, huile, identité, idiot, île, image, imaginer, immédiatement, immeuble, impossible, incroyable, indien, indiquer, infirmier, informatique, ingénieur, inquiet, inquiéter, inscrire, installer, instrument, interdire, international, inutile, inventer, invité, jeter, jeu, joie, joue, jouet, joueur, jour férié, journaliste, joyeux, jumeau, jusque, justement, là-haut, lac, laid, laisser, large, lecture, léger, librairie, lieu, lion, liste, louer, lourd, lune, magazine, magnifique, maîtresse, maladie, malheureusement, malheureux, manquer, marchand, mariage, marque, mathématiques, matière, matinée, méchant, médicament, mémoire, ménage, mentir, merveilleux, message, meuble, mieux, mignon, million, mince, miroir, moderne, moitié, monnaie, monument, morceau, mouchoir, mourir, moustache, mouton, mur, musicien, nécessaire, neveu, nièce, niveau, nombre, nombreux, nourriture, objet, océan, orage, oreiller, organiser, original, os, ouvert, ouvrier, page, paire, pâle, panier, panneau, papier, Pâques, paquet, parfait, parfaitement, parfum, parking, partager, participer, passager, passé, passeport, patron, pause, pauvre, paysage, peau, pêche, peindre, peinture, permis, piano, pilote, placard, plaisanter, plan, planète, plein, pleurer, plusieurs, plutôt, poids, police, policier, polonais, pont, port, portable, portefeuille, portugais, poubelle, poule, poupée, pratique, présent, preuve, prier, produit, professionnel, programme, projet, promenade, promener, promettre, prononcer, propos, proposer, propre, protéger, quai, qualité, quelquefois, queue, quitter, raccrocher, raconter, ramasser, randonnée, ranger, rappeler, rater, réalité, recevoir, recommander, recommencer, reconnaître, refaire, réfléchir, réfrigérateur, région, règle, reine, rejoindre, relation, remplacer, remplir, rencontre, renoncer, renseignement, renseigner, repartir, repos, reposer, reprendre, respirer, responsable, résultat, retour, retourner, réunion, réveil, rhume, rideau, rire, rivière, rock, roi, rôle, roman, rond, rouler, roux, sable, saint, salaire, sale, santé, scène, science, sec, seconde, secours, secrétaire, séjour, sembler, sensible, sentir, série, sérieux, serpent, serviette, servir, siècle, signer, signifier, silence, simplement, situation, ski, sofa, sonner, sortie, souris, soutenir, spécial, spectacle, stade, studio, stupide, suite, superbe, surprendre, surtout, système, taille, taper, tapis, tellement, température, tenir, tente, terminer, terrasse, terrible, test, texte, timide, tiroir, toit, tort, toucher, tradition, traduire, tranche, tranquille, tromper, trottoir, unique, usine, utile, vache, valeur, vendre, vérifier, vérité, vers, vide, vidéo, vider, visite, vitesse, voisin, vol
- B1, 816 words (plus 3 listed under Verbs the checker cannot read yet): abandonner, abri, absence, accès, accorder, accrocher, accueillir, accuser, achever, acte, activement, actuellement, adieu, admettre, administration, adopter, affirmer, affreux, agence, agent, agir, ailleurs, aîné, allonger, ambition, amer, ange, angle, angoisse, animer, annonce, annoncer, apercevoir, apparaître, apparemment, apparence, appartenir, appliquer, approcher, appuyer, argenté, arme, armée, arranger, arrière, aspect, assistant, assurance, assurer, atelier, atmosphère, attaque, attaquer, atteindre, attente, attentif, aucun, augmenter, auprès, aussitôt, autant, auteur, autoriser, autorité, autrefois, autrement, avaler, avantage, aveugle, avouer, baisser, ballet, bande, base, bataille, bâtir, battre, bêtise, blessure, bloquer, boue, branche, bref, brillant, briser, brûler, brusquement, buffet, cabine, cadre, calmer, caméra, capable, carré, carrière, carton, cas, catastrophe, cauchemar, céder, centaine, central, cependant, cercle, cérémonie, certes, certitude, cerveau, cesser, chagrin, chapitre, charger, charme, chasse, chasser, chauffer, cheminée, chic, choc, chute, cimetière, circonstance, circuler, citer, citoyen, code, colère, collection, coller, colline, commerce, commun, communiquer, compagnie, compagnon, comptoir, concentrer, conclure, conclusion, concours, condition, conférence, confier, confondre, connecter, conscience, conséquence, conserver, considérer, consister, constater, consulter, contenir, contrat, contrôle, contrôler, convaincre, convenir, conviction, copie, corde, correspondre, coude, couler, coupable, courant, couvrir, craindre, crainte, creuser, cri, crime, crise, critique, croiser, croix, cruel, cueillir, cuisse, culturel, curiosité, davantage, débarrasser, débrouiller, décevoir, déchet, déchirer, décision, déclarer, décoller, décor, découverte, défaut, défendre, défense, définitif, délicat, démarrer, dépasser, dérouler, dès, désert, désir, désordre, désormais, destin, détail, détendre, détruire, dette, développer, différemment, difficulté, diriger, discours, discret, disparaître, distinguer, distribuer, divers, domaine, dont, doré, dossier, douceur, drame, drogue, durant, échange, échapper, échec, échouer, éclairer, éclater, économie, économique, économiser, écraser, éditeur, éducation, effacer, effet, égal, également, électrique, élégant, élément, élever, éliminer, éloigner, émotion, empêcher, employer, emporter, emprunter, enceinte, encourager, énerver, enfermer, enfuir, engager, ennemi, ennui, enquête, enregistrer, entièrement, entourer, entretien, envers, environ, environnement, envisager, épais, épouser, époux, épreuve, équilibre, esprit, essence, essentiel, essuyer, estimer, estomac, établir, étape, état, étendre, étonnant, étonner, étrange, étroit, événement, évidence, évident, éviter, évoluer, évoquer, exagérer, exception, exiger, existence, expert, exploser, explosion, exprimer, fabriquer, faible, fameux, familial, fantôme, faveur, fer, fiancé, fidèle, figure, fil, filmer, final, fixer, flamme, folie, fonction, fondre, fontaine, force, forcément, forcer, former, fortune, foule, fournir, fragile, franchement, franchir, francophone, fréquenter, front, frontière, fuir, fuite, fumée, furieux, gardien, gaz, geler, gendarme, gêner, génération, généreux, génie, genre, geste, glisser, goutte, gouvernement, gras, grève, guérir, habituel, habituer, haine, haïr, hasard, hauteur, héros, hésiter, historique, honnête, honte, horizon, horreur, hors, hôte, humain, humeur, hurler, idéal, identifier, ignorer, illusion, imagination, imiter, immense, immobile, importance, imposer, impression, impressionner, incapable, incendie, incident, inconnu, individu, influence, informer, innocent, inoubliable, inquiétude, insister, inspirer, instinct, instruction, intelligence, intention, intérêt, intérieur, interroger, interrompre, intervenir, jaloux, jeunesse, joindre, juge, jugement, juger, jurer, justice, justifier, lâcher, laine, lancer, langage, larme, légende, légèrement, lendemain, lequel, lèvre, libérer, liberté, lien, limite, linge, littérature, local, loger, logique, loi, lors, lorsque, loup, lumineux, lutter, luxe, maire, maître, malgré, malheur, malin, manche, manière, manifester, manque, marin, marquer, masque, matériel, maximum, médical, méfier, membre, menace, menacer, mener, mensonge, menteur, menton, mériter, merveille, mesure, mesurer, métal, méthode, meurtre, militaire, millier, ministre, minuscule, miracle, misère, mission, modèle, modeste, mondial, monstre, mont, moquer, moral, mordre, mort, moteur, mouche, mouvement, moyen, multicolore, murmurer, muscle, mystère, mystérieux, nation, national, naturel, naturellement, nécessité, nerf, nerveux, ni, nommer, nourrir, obéir, objectif, obliger, observer, obtenir, occasion, odeur, officiel, offre, ombre, ongle, opéra, opération, ordinaire, ordre, organisation, origine, oser, outil, ouverture, paix, palais, paradis, paraître, parcourir, pardonner, parier, parole, partenaire, parti, particulier, particulièrement, passage, passion, patience, patient, patrimoine, patte, paysan, peine, peintre, pénible, période, personnage, personnel, perte, photographie, physique, piège, pile, piquer, piste, pitié, plafond, plaindre, plastique, plateau, plier, plonger, poésie, poète, poignet, point, poitrine, politique, populaire, portrait, posséder, pot, pouce, poursuivre, pourtant, poussière, précaution, précédent, précieux, précis, préciser, présence, président, presse, presser, pression, prétendre, prétexte, prêtre, prévenir, prévoir, primaire, principal, principe, prison, prisonnier, privé, produire, progrès, prolonger, promesse, proposition, protection, protester, prouver, provoquer, prudent, public, publier, puissance, puissant, punir, pur, quotidien, raisonnable, ralentir, ramener, rang, rapport, rapporter, rare, raser, rassurer, rattraper, rayon, réaction, réagir, réaliser, réchauffer, recherche, rechercher, récit, réclamer, reconnaissant, reculer, récupérer, recycler, réduire, réel, réellement, réflexion, regard, régime, règlement, régler, régulier, régulièrement, rejeter, religieux, religion, remarquer, remettre, renverser, renvoyer, représenter, reprocher, réputation, résistance, résister, résoudre, respecter, responsabilité, ressentir, retenir, retirer, retraite, réunir, révéler, révision, révolution, revue, ridicule, risque, risquer, rocher, rompre, roue, ruine, rythme, sacré, sain, sang, satisfaction, sauf, sauvage, sauver, scientifique, séance, secouer, secteur, sécurité, selon, sentiment, séparer, serrer, sévère, siège, signaler, signe, silencieux, sincère, singe, sinon, situer, société, soi, soigner, soin, sol, soldat, solide, solitude, sombre, somme, sommet, songer, sort, sorte, souci, souffrance, souffrir, soulever, source, sourcil, sourd, statue, style, subir, succès, suffire, suffisamment, suggérer, supérieur, supporter, supposer, surface, surveiller, survivre, tabac, taire, talent, talon, tandis que, tant, technique, technologie, tel, témoin, tendresse, tenter, tenue, terme, terrain, théorie, tirer, tissu, titre, toile, total, totalement, toutefois, trace, traditionnel, trahir, trait, traitement, traiter, tranquillement, transformer, transmettre, transporter, travers, trembler, trésor, tristesse, trou, tuer, type, typique, uniforme, uniquement, univers, urgence, urgent, vallée, valoir, vaste, véhicule, veille, vente, venue, véritable, verser, victime, victoire, vieillir, vif, violence, violent, visiteur, vitre, vitrine, vivant, vœu, voie, voleur, volonté, voyageur, zone, œuvre

## Verbs the checker cannot read yet

The checker cannot yet tell these verbs from a noun or adjective with the same spelling: it reads il porte as the noun porte, not as the verb porter. They count in the core lists above, and when untaught they are listed here instead of with the core words not taught.

- adresser (B1): not taught
- causer (B1): not taught
- compter (A1): not taught
- durer (A2): not taught
- fêter (A2): not taught
- garder (A2): not taught
- garer (A2): not taught
- intéresser (A2): not taught
- marier (A2): not taught
- neiger (A1): not taught
- occuper (A2): not taught
- placer (B1): not taught
- planter (A2): not taught
- porter (A2): not taught
- prêter (A2): not taught
- téléphoner (A1): not taught

## Units

| Unit | Positions | Level label | Highest level taught |
|---|---|---|---|
| Unit 1: Essential Grammar | 1 to 13 | None | A2 |
| Unit 2: Asking & Describing | 14 to 27 | None | A2 |
| Unit 3: Movement & Possession | 28 to 39 | None | A2 |
| Unit 4: Everyday Words | 40 to 52 | None | B2 |
| Unit 5: Time & Taste | 53 to 65 | None | C1 |
| Unit 6: Basic Fluency | 66 to 77 | None | B1 |
| Unit 7: Knowledge & Learning | 78 to 91 | None | B2 |
| Unit 8: Daily Life & Actions | 92 to 106 | None | A2 |
| Unit 9: Discourse & Past Tense | 107 to 120 | None | B1 |
| Unit 10: Mastery & Nuance | 121 to 139 | B2 | B2 |
| Unit 11: Daily Essentials | 140 to 149 | None | A2 |
| Unit 12: Curiosity & Questions | 150 to 160 | None | B1 |

## Level labels

- 147. Reading 11 - La France Moderne is labelled B2+ but teaches nothing, and by this position the course has reached no level yet

## Modules that teach above the level reached

The course reaches no level, so each module below teaches words or grammar patterns two or more levels above A1 (B1 or higher).

- 48. Location Adverbs - here, there, everywhere: fr:cx:chunk.nulle-part (B2)
- 54. Slang - Comparisons & Intensity: fr:lex:capot (C1), fr:lex:gnama (C1), fr:lex:chelou (B2), fr:lex:ben (B1), fr:lex:dingue (B1), fr:lex:ecœurant (B1), fr:lex:fun (B1), fr:lex:hyper (B1), fr:lex:mortel (B1), fr:lex:top (B1), fr:lex:vachement (B1)
- 67. dire - To Say / To Tell: fr:cx:chunk.cest-a-dire (B1)
- 71. demander - To Ask: fr:lex:permission (B1)
- 78. Talking About People in General: fr:lex:peuple (B1), fr:lex:population (B1)
- 79. Studying & Reviewing - étudier & réviser: fr:lex:reviser (B1)
- 82. savoir - To Know (Facts/Skills): fr:lex:savoir (B1)
- 86. Knowledge & Learning - Essential Nouns: fr:lex:apprentissage (B2), fr:lex:savoir (B1)
- 87. Discourse Markers - Sound Like a Native: fr:lex:ainsi (B1), fr:lex:presque (B1)
- 107. Causal & Reason Words - Explaining Why: fr:cx:chunk.grace-a (B1), fr:lex:car (B1), fr:lex:grace (B1), fr:lex:motif (B1), fr:lex:puisque (B1)
- 108. Spatial Prepositions - Position & Location: fr:lex:parmi (B1)
- 121. Forms Used After 'il faut que' and 'je veux que': fr:cx:subj.vouloir-que (B1)
- 122. More Forms for 'il faut que' and 'je veux que' Phrases: fr:cx:subj.vouloir-que (B1)
- 124. Je veux que... - Expressing Wishes: fr:cx:subj.vouloir-que (B1)
- 125. Je suis content que... - Emotion Phrases: fr:cx:subj.emotion-que (B1)
- 126. Je pense que... - Opinion Phrases: fr:cx:subj.douter-que (B1), fr:cx:subj.ne-pas-penser-que (B1), fr:lex:douter (B1)
- 127. Si j'étais... - Daydreaming & Hypotheticals: fr:cx:si.imparfait-conditionnel (B1)
- 128. Si j'avais su... - Past Regret Phrases: fr:cx:si.plus-que-parfait-conditionnel-passe (B2)
- 129. J'avais déjà... - Had Already Done Phrases: fr:cx:plus-que-parfait.avoir (B1)
- 130. vraiment, sérieusement... - Common Adverbs: fr:lex:serieusement (B1)
- 131. En mangeant... - While Doing Phrases: fr:cx:gerondif (B1), fr:cx:prsptcp.er (B1)
- 132. Je me fais couper... - Service Phrases: fr:cx:causative.faire (B1)
- 133. Avant que... - Before Phrases: fr:cx:subj.avant-que (B1)
- 134. Pour que... - So That Phrases: fr:cx:subj.pour-que (B1)
- 135. Bien que... - Although Phrases: fr:cx:subj.bien-que (B1)
- 136. Il est possible que... - Possibility Phrases: fr:cx:subj.possible-que (B1)
- 150. Nature & Animals - Curiosity Vocabulary: fr:lex:abeille (B1), fr:lex:ecureuil (B1), fr:lex:papillon (B1), fr:lex:tortue (B1)
- 152. Natural Phenomena - How Nature Works: fr:cx:rendre-adjective (B1), fr:lex:glace.adjective (B1)
- 155. Complex comment Questions - Ask How Things Work: fr:lex:ecureuil (B1), fr:lex:tortue (B1)
- 157. Inversion Questions - Formal Register: fr:lex:fleurir (B1), fr:lex:tortue (B1)
- 158. Embedded Questions - Polite Indirect Questions: fr:cx:q.embedded (B1)
- 159. Rhetorical & Negative Questions - Advanced Style: fr:cx:neg.ne-pas-infinitive (B1), fr:cx:q.negative-inversion (B1)

# 7. What a learner can do

A function is something a learner does with French, such as greeting someone or asking the time. It becomes possible at the first module by which the course has taught every word and grammar pattern of one French way to do it. Functions possible by the end of the course: A1 36 of 42, A2 22 of 23, B1 19 of 19.

Some functions need words that no lesson teaches and only the Reference unit lists (deux, huit, lundi, mai, trois). That unit has no position in the course, so it teaches nothing, and those functions never become possible. Their words are marked "taught by no lesson, listed only in the Reference unit" below.

## A1

Possible, with the module where each becomes possible:

- 1. Famous Words & Greetings: Say sorry
- 1. Famous Words & Greetings: Greet people and say goodbye
- 1. Famous Words & Greetings: Say thank you
- 3. Essential Verb - être (to be): Introduce yourself
- 10. Basic Connectors - et, mais, ou, aussi, très: Join simple ideas
- 15. ça - Survival Phrases: Ask how someone is
- 17. Essential Verb - vouloir (to want): Invite someone or offer something
- 17. Essential Verb - vouloir (to want): Say what you want
- 18. Essential Verb - pouvoir (can): Say what you can and cannot do
- 20. Question Words - Ask Anything!: Ask permission
- 20. Question Words - Ask Anything!: Ask who someone is or what something is
- 24. Common Adjectives - Describing Things: Give good wishes and compliments
- 24. Common Adjectives - Describing Things: Ask about and describe people
- 24. Common Adjectives - Describing Things: Ask about and describe things
- 34. Possessive Adjectives - My, Your, His, Her: Introduce someone
- 40. Survival Phrases - Real-World Essentials: Ask for information
- 40. Survival Phrases - Real-World Essentials: Approach someone and ask for something
- 40. Survival Phrases - Real-World Essentials: Buy things and ask the price
- 40. Survival Phrases - Real-World Essentials: Order in a café or restaurant
- 45. Negation - ne...pas (not): Accept or turn down an invitation
- 46. Time & Frequency - now, always, never, today: Talk about plans
- 46. Time & Frequency - now, always, never, today: Talk about the weather
- 49. Everyday Nouns - Life & World: Ask the way or give directions
- 49. Everyday Nouns - Life & World: Ask about and describe places
- 57. aimer - To Like / To Love: Say what you like and dislike
- 61. manger - To Eat (Present & Past): Talk about your day and your timetable
- 66. Progressive & Future - Expressing Time: Talk about and use transport
- 67. dire - To Say / To Tell: Ask what a word or a remark means
- 68. prendre - To Take: Ask how to say something in French
- 68. prendre - To Take: Say you did not understand
- 68. prendre - To Take: Ask for and give personal details
- 74. Essential Vocabulary - Time, People & Ideas: Talk about your family
- 82. savoir - To Know (Facts/Skills): Say you do not know
- 99. Reciprocal Reflexives - Each Other: Make, move or cancel an appointment
- 100. Commands - tu form (Informal): Give and follow simple instructions
- 115. Imparfait Formation - All Verbs (was doing, used to do): Say how much or how many

Never possible in the course:

- Count and use numbers: still needs fr:lex:deux (taught by no lesson, listed only in the Reference unit), fr:lex:trois (taught by no lesson, listed only in the Reference unit)
- Say the day and the date: still needs fr:lex:lundi (taught by no lesson, listed only in the Reference unit), fr:lex:trois (taught by no lesson, listed only in the Reference unit), fr:lex:mai (taught by no lesson, listed only in the Reference unit)
- Ask and tell the time: still needs fr:lex:huit (taught by no lesson, listed only in the Reference unit)
- Say what you prefer: still needs fr:lex:mieux
- Book a table or a room: still needs fr:lex:deux (taught by no lesson, listed only in the Reference unit), fr:lex:huit (taught by no lesson, listed only in the Reference unit)
- Ask how a word is spelled: no French way to do it is listed yet

## A2

Possible, with the module where each becomes possible:

- 42. Essential Verb - devoir (must): Say what someone has to do
- 42. Essential Verb - devoir (must): Start and end a conversation
- 43. Essential Verb - parler (to speak): Make a simple phone call
- 53. Comparisons & Intensity: Compare people and things
- 53. Comparisons & Intensity: Say how you feel physically
- 54. Slang - Comparisons & Intensity: Give an opinion
- 55. Should & Could - Advice and Possibility: Ask for and give advice
- 58. être - Past Tense (was / were): Describe how things used to be
- 59. avoir - Past Tense (had): Agree or disagree
- 61. manger - To Eat (Present & Past): Tell what happened
- 68. prendre - To Take: Check that you are understood
- 73. avoir besoin de - To Need: Ask for help or offer it
- 78. Talking About People in General: Suggest something to do
- 85. croire - To Believe: Express doubt or objection
- 92. Temporal & Sequential Words - Time & Order: Put events in order
- 102. Irregular Commands - être, avoir, aller, faire: Present a town or a country
- 102. Irregular Commands - être, avoir, aller, faire: Warn someone
- 107. Causal & Reason Words - Explaining Why: Give a reason
- 123. Il faut que... - Saying What's Necessary: Plan something together
- 129. J'avais déjà... - Had Already Done Phrases: Say what you enjoyed or did not enjoy
- 140. Age & Personal Information: Tell the story of someone's life
- 144. Perception Verbs - écouter, regarder: Talk about your work

Never possible in the course:

- Show interest or indifference: still needs fr:lex:interessant

## B1

Possible, with the module where each becomes possible:

- 57. aimer - To Like / To Love: Talk about hopes and wishes
- 61. manger - To Eat (Present & Past): Tell a memory or a story
- 67. dire - To Say / To Tell: Refer back to something already said
- 67. dire - To Say / To Tell: Repeat what someone said to check it
- 67. dire - To Say / To Tell: Say something again in other words
- 67. dire - To Say / To Tell: Report what someone said
- 67. dire - To Say / To Tell: Join a discussion and change the subject
- 87. Discourse Markers - Sound Like a Native: Make a guess about what is true
- 92. Temporal & Sequential Words - Time & Order: Wrap up what you are saying
- 92. Temporal & Sequential Words - Time & Order: Give a short talk on a topic
- 92. Temporal & Sequential Words - Time & Order: Sum up a story and comment on it
- 107. Causal & Reason Words - Explaining Why: Explain cause and effect
- 107. Causal & Reason Words - Explaining Why: Take part in an interview
- 125. Je suis content que... - Emotion Phrases: Talk about feelings
- 126. Je pense que... - Opinion Phrases: Give and support an opinion
- 127. Si j'étais... - Daydreaming & Hypotheticals: Talk about an imagined situation
- 129. J'avais déjà... - Had Already Done Phrases: Give your view of a film or book
- 135. Bien que... - Although Phrases: Make a complaint
- 159. Rhetorical & Negative Questions - Advanced Style: Raise a problem and suggest a solution

Never possible in the course:

None.

# 8. Exercises in a nonstandard format

- 2024-01-10-unit1-practice uses nonstandard exercise shapes: sentences
- 2024-01-23-unit2-practice uses nonstandard exercise shapes: sentences
- 2024-02-04-unit3-practice uses nonstandard exercise shapes: sentences
- 2024-03-25-faire uses nonstandard exercise shapes: exercises
- 2024-04-03-unit-4-practice uses nonstandard exercise shapes: sentences
- 2024-04-15-unit-5-practice uses nonstandard exercise shapes: sentences
- 2024-04-27-unit-6-practice uses nonstandard exercise shapes: sentences
- 2024-05-05-on-and-people uses nonstandard exercise shapes: exercises
- 2024-05-09-studying-verbs uses nonstandard exercise shapes: exercises
- 2024-05-04-learning-verbs uses nonstandard exercise shapes: exercises
- 2024-05-03-knowledge-nouns uses nonstandard exercise shapes: exercises
- 2024-05-02-discourse-markers uses nonstandard exercise shapes: exercises
- 2024-04-28-comparison-modifiers uses nonstandard exercise shapes: exercises
- 2024-05-11-unit-7-practice uses nonstandard exercise shapes: sentences
- 2024-05-23-temporal-words uses nonstandard exercise shapes: exercises
- 2024-05-21-reflexive-pronouns uses nonstandard exercise shapes: exercises
- 2024-05-22-s-appeler uses nonstandard exercise shapes: exercises
- 2024-05-19-morning-routine uses nonstandard exercise shapes: exercises
- 2024-05-17-getting-ready uses nonstandard exercise shapes: exercises
- 2024-05-16-daily-reflexives uses nonstandard exercise shapes: exercises
- 2024-06-07-reflexive-past uses nonstandard exercise shapes: exercises
- 2024-06-06-reciprocal-reflexives uses nonstandard exercise shapes: exercises
- 2024-05-13-commands-tu uses nonstandard exercise shapes: exercises
- 2024-05-14-commands-vous uses nonstandard exercise shapes: exercises
- 2024-05-18-irregular-commands uses nonstandard exercise shapes: exercises
- 2024-05-12-commands-pronouns uses nonstandard exercise shapes: exercises
- 2024-05-25-unit-8-practice uses nonstandard exercise shapes: sentences
- 2024-05-26-causal-words uses nonstandard exercise shapes: exercises, fib
- 2024-06-08-spatial-prepositions uses nonstandard exercise shapes: exercises, fib
- 2024-05-28-more-spatial-relations uses nonstandard exercise shapes: exercises, fib
- 2024-05-30-passe-compose-er uses nonstandard exercise shapes: exercises, fib
- 2024-06-01-passe-compose-irregular-1 uses nonstandard exercise shapes: exercises, fib
- 2024-06-02-passe-compose-irregular-2 uses nonstandard exercise shapes: exercises, fib
- 2024-05-31-passe-compose-etre uses nonstandard exercise shapes: exercises, fib
- 2024-05-29-passe-compose-agreement uses nonstandard exercise shapes: exercises, fib
- 2024-05-27-imparfait-all-verbs uses nonstandard exercise shapes: exercises, fib
- 2024-06-04-pc-vs-imparfait uses nonstandard exercise shapes: exercises, fib
- 2024-06-03-past-tense-composition uses nonstandard exercise shapes: exercises, fib
- 2024-06-10-unit-9-practice uses nonstandard exercise shapes: sentences
- 2024-02-05-unit-10-practice uses nonstandard exercise shapes: sentences
- 2024-02-16-unit-11-practice uses nonstandard exercise shapes: sentences

# 9. Unknown words

- 7. Basic Nouns - People & Things: avocate
- 50. Reading Comprehension 4 - La nouvelle époque de Marie: jamias
- 52. Unit 4 Final Exam - Expression: aujourd, hui, solution
- 54. Slang - Comparisons & Intensity: cest, louche
- 61. manger - To Eat (Present & Past): quest, Composé
- 62. boire - To Drink (Present & Past): quest, Composé
- 63. Reading Comprehension 5 - La fée verte (The Green Fairy): fée, composé, boisson, favorite, fées
- 67. dire - To Say / To Tell: càd
- 77. Unit 6 Final Exam - Communication: solution
- 87. Discourse Markers - Sound Like a Native: clarification
- 89. Reading 7 - L'Art d'Apprendre: comprendez, usage
- 107. Causal & Reason Words - Explaining Why: traffic
- 110. Passé Composé - Regular -ER Verbs (I spoke, I ate): Composé
- 115. Imparfait Formation - All Verbs (was doing, used to do): parl
- 116. Passé Composé vs Imparfait - The Golden Rule: Composé, PC, reaction
- 118. Reading 9 - Une Histoire du Passé: weekend, composé, contrast
- 120. Unit 9 Final Exam - Discourse & Past Tense: composé
- 122. More Forms for 'il faut que' and 'je veux que' Phrases: Normal
- 150. Nature & Animals - Curiosity Vocabulary: Elements
- 159. Rhetorical & Negative Questions - Advanced Style: conditionnel

# 10. Other problems

- blank-misplaced (error) [12. Unit 1 Practice - Fill in the Blanks]: 2024-01-10-unit1-practice#sentences[10]: the blank for "aussi" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [26. Unit 2 Practice - Fill in the Blanks]: 2024-01-23-unit2-practice#sentences[6]: the blank for "moi" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [26. Unit 2 Practice - Fill in the Blanks]: 2024-01-23-unit2-practice#sentences[11]: the blank for "voiture" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[6]: the blank for "demain" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[7]: the blank for "hier" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[8]: the blank for "ici" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[9]: the blank for "là" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[14]: the blank for "ici" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[18]: the blank for "demain" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [51. Unit 4 Practice - Fill in the Blanks]: 2024-04-03-unit-4-practice#sentences[19]: the blank for "ici" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [64. Unit 5 Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#sentences[27]: the blank for "baguette" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [64. Unit 5 Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#sentences[28]: the blank for "express" sits on the mark ",", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [64. Unit 5 Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#sentences[29]: the blank for "génial" sits on the mark "!", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [64. Unit 5 Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#sentences[30]: the blank for "top" sits on the mark "!", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [64. Unit 5 Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#sentences[31]: the blank for "au" sits inside the word "restaurant", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [64. Unit 5 Practice - Fill in the Blanks]: 2024-04-15-unit-5-practice#sentences[32]: the blank for "manger" sits inside the word "maintenant", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [76. Unit 6 Practice - Fill in the Blanks]: 2024-04-27-unit-6-practice#sentences[28]: the blank for "besoin" sits inside the word "de", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [76. Unit 6 Practice - Fill in the Blanks]: 2024-04-27-unit-6-practice#sentences[35]: the blank for "question" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [76. Unit 6 Practice - Fill in the Blanks]: 2024-04-27-unit-6-practice#sentences[36]: the blank for "fois" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [76. Unit 6 Practice - Fill in the Blanks]: 2024-04-27-unit-6-practice#sentences[38]: the blank for "moment" sits on the mark ",", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [76. Unit 6 Practice - Fill in the Blanks]: 2024-04-27-unit-6-practice#sentences[40]: the blank for "ville" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [76. Unit 6 Practice - Fill in the Blanks]: 2024-04-27-unit-6-practice#sentences[44]: the blank for "prendre" sits inside the word "train", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[6]: the blank for "comprends" sits on the mark "?", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[12]: the blank for "penses" sits on the mark "?", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[15]: the blank for "connais" sits inside the word "pas", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[17]: the blank for "en fait" sits on the mark ",", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[18]: the blank for "question" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[19]: the blank for "idée" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[22]: the blank for "mal" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [90. Unit 7 Practice - Fill in the Blanks]: 2024-05-11-unit-7-practice#sentences[23]: the blank for "apprendre" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[0]: the blank for "d'abord" sits on the mark ",", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[0]: the blank for "ensuite" sits inside the word "je", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[4]: the blank for "t'appelles" sits on the mark "?", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[6]: the blank for "me lève" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[7]: the blank for "me lave" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[17]: the blank for "écoute" sits on the mark "!", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [105. Unit 8 Practice - Fill in the Blanks]: 2024-05-25-unit-8-practice#sentences[20]: the blank for "m'habille" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [119. Unit 9 Practice - Fill in the Blanks]: 2024-06-10-unit-9-practice#sentences[15]: the blank for "es arrivé" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [119. Unit 9 Practice - Fill in the Blanks]: 2024-06-10-unit-9-practice#sentences[16]: the blank for "a marché" sits after the end of the sentence, so learners see it after the full stop; move it to where the answer belongs
- blank-misplaced (error) [119. Unit 9 Practice - Fill in the Blanks]: 2024-06-10-unit-9-practice#sentences[17]: the blank for "cuisinais" sits on the mark ",", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [119. Unit 9 Practice - Fill in the Blanks]: 2024-06-10-unit-9-practice#sentences[17]: the blank for "ai entendu" sits inside the word "bruit", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [119. Unit 9 Practice - Fill in the Blanks]: 2024-06-10-unit-9-practice#sentences[18]: the blank for "sommes restés" sits inside the word "maison", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [119. Unit 9 Practice - Fill in the Blanks]: 2024-06-10-unit-9-practice#sentences[20]: the blank for "pour que" sits inside the word "ne", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[5]: the blank for "parte" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[7]: the blank for "voyagerais" sits inside the word "plus", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[10]: the blank for "vient" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[11]: the blank for "vienne" sits on the mark ".", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[17]: the blank for "couper" sits inside the word "les", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[19]: the blank for "voudrais" sits inside the word "je", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [138. Unit 10 Practice - Fill in the Blanks]: 2024-02-05-unit-10-practice#sentences[19]: the blank for "suives" sits inside the word "rêves", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[5]: the blank for "travaillez" sits on the mark "-", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[8]: the blank for "trouvé" sits on the mark "!", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[14]: the blank for "à gauche" sits on the mark ",", so the app drops it; put the blank on a space and keep the mark
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[16]: the blank for "un" sits inside the word "rendez", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[17]: the blank for "arrivent" sits inside the word "vers", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[18]: the blank for "vivent" sits inside the word "dans", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[19]: the blank for "vis" sits inside the word "Lyon", so learners see the word cut in two; move it to where the answer belongs
- blank-misplaced (error) [148. Unit 11 Practice - Fill in the Blanks]: 2024-02-16-unit-11-practice#sentences[19]: the blank for "travaille" sits inside the word "comme", so learners see the word cut in two; move it to where the answer belongs
