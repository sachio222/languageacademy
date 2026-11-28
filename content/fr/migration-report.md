# Converting today’s modules to module files

`pnpm content:migrate` wrote 171 module files (124 lessons, 11 practice sets, 11 unit exams, 5 guides, 11 readings and 9 Reference pages) under `content/fr/modules/` from today’s modules in `src/lessons/modules/`, with 2645 items. Guides and readings also read prototype L’s guides and illustrated stories (`content/fr/legacy/l-sources.json`). 530 word ids are first minted in a reading’s vocabulary table, since a reading teaches its own table. The sections below list every guess the conversion made and every place where the written files differ from today’s source.

This file is written again on every run. Fixes go in the module files, never here.

English-to-French prompts by unit: a bare English sentence is a `translate` item, a framed one a `respond` item.

| Unit | Bare `translate` | Framed `respond` |
|---|---|---|
| unit1 Essential Grammar | 35 | 47 |
| unit2 Asking & Describing | 57 | 89 |
| unit3 Movement & Possession | 11 | 84 |
| unit4 Everyday Words | 109 | 85 |
| unit5 Time & Taste | 174 | 112 |
| unit6 Basic Fluency | 249 | 37 |
| unit7 Knowledge & Learning | 72 | 29 |
| unit8 Daily Life & Actions | 51 | 55 |
| unit9 Discourse & Past Tense | 18 | 17 |
| unit10 Mastery & Nuance | 29 | 101 |
| unit11 Daily Essentials | 69 | 70 |
| unit12 Curiosity & Questions | 0 | 60 |

| Section | Lines |
|---|---|
| Guide checks written by hand | 1 |
| Spellings taught more than once | 401 |
| Item types to confirm | 229 |
| Practice blanks that were in the wrong place | 51 |
| Position words | 119 |
| Exercises rewritten as Jake ruled | 2 |
| English prompts written as respond items | 791 |
| Passage words with no pop-up | 5 |
| Estimates to confirm | 1 |
| Hand edits kept | 2768 |
| Live ids with no converted item | 368 (53 real misses) |
| Fields with no place in a module file | 1953 |
| Text written differently | 661 |
| Notes | 3 |
| Outline | 16 |

## Guide checks written by hand

The source guide has no checks, so its three are written by hand in the module file. A rerun keeps them, and hand-fixes.json records them.

**2026-11-24-negation-guide**

- `checks` three checks, written by hand in the module file (kept on rerun)

## Spellings taught more than once

Each line proposes whether a spelling taught again is the same meaning (same word_id) or a new one (a sense suffix). Confirm or change the word_id in the module file; a rerun keeps it.

**2024-01-07-plurals**

- `vocabulary[1]` "les": same meaning as "the (plural)" in 2024-01-05-articles: kept les-fr

**2026-11-24-numbers**

- `vocabulary[1]` "un": new meaning "one": un-fr.one; met before as "a/an (masculine)" (un-fr, 2024-01-05-articles)
- `vocabulary[2]` "une": new meaning "one": une-fr.one; met before as "a/an (feminine)" (une-fr, 2024-01-05-articles)

**2024-01-13-ca-survival**

- `vocabulary[0]` "ça": same meaning as "that/it (informal)" in 2024-01-12-demonstratives: kept ca-fr
- `vocabulary[3]` "ça va?": new meaning "how's it going?": ca-va-fr.question; met before as "it goes/OK" (ca-va-fr, 2024-01-13-ca-survival)

**2024-01-18-questions**

- `vocabulary[2]` "où": ou-fr already names "ou", a different spelling: ou-fr.where
- `vocabulary[11]` "ça va?": new meaning "you good?": ca-va-fr.question-2; met before as "it goes/OK" (ca-va-fr, 2024-01-13-ca-survival); "how's it going?" (ca-va-fr.question, 2024-01-13-ca-survival) (written: ca-va-fr.question) (fixed by hand)

**2024-01-19-stressed-pronouns**

- `vocabulary[3]` "elle": new meaning "her (stressed)": elle-fr.stressed; met before as "she" (elle-fr, 2024-01-01-pronouns)
- `vocabulary[4]` "nous": new meaning "us (stressed)": nous-fr.stressed; met before as "we" (nous-fr, 2024-01-01-pronouns)
- `vocabulary[5]` "vous": new meaning "you (stressed, formal/plural)": vous-fr.stressed; met before as "you (formal/plural)" (vous-fr, 2024-01-01-pronouns)
- `vocabulary[7]` "elles": new meaning "them (stressed, feminine)": elles-fr.stressed; met before as "they (feminine)" (elles-fr, 2024-01-01-pronouns)

**2024-01-25-contractions**

- `vocabulary[3]` "des": new meaning "of/from the (plural)": des-fr.of; met before as "some / plural a" (des-fr, 2024-01-07-plurals)

**2024-01-30-object-pronouns**

- `vocabulary[2]` "le": new meaning "him/it (masculine)": le-fr.object-pronoun; met before as "the (masculine)" (le-fr, 2024-01-05-articles)
- `vocabulary[3]` "la": new meaning "her/it (feminine)": la-fr.object-pronoun; met before as "the (feminine)" (la-fr, 2024-01-05-articles)
- `vocabulary[4]` "nous": new meaning "us": nous-fr.object-pronoun; met before as "we" (nous-fr, 2024-01-01-pronouns); "us (stressed)" (nous-fr.stressed, 2024-01-19-stressed-pronouns)
- `vocabulary[5]` "vous": new meaning "you (formal/plural)": vous-fr.object-pronoun; met before as "you (formal/plural)" (vous-fr, 2024-01-01-pronouns); "you (stressed, formal/plural)" (vous-fr.stressed, 2024-01-19-stressed-pronouns)
- `vocabulary[6]` "les": new meaning "them": les-fr.object-pronoun; met before as "the (plural)" (les-fr, 2024-01-05-articles); "the (plural)" (les-fr, 2024-01-07-plurals)

**2024-03-31-survival-phrases**

- `vocabulary[1]` "s'il vous plaît": same meaning as "please" in 2024-01-01-famous-words: kept s-il-vous-plait-fr
- `vocabulary[2]` "s'il te plaît": same meaning as "please (to a friend)" in 2024-01-15-vouloir: kept s-il-te-plait-fr
- `vocabulary[11]` "pardon": same meaning as "excuse me / sorry" in 2024-01-01-famous-words: kept pardon-fr

**2024-04-01-time-adverbs**

- `vocabulary[12]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr

**2024-03-27-negation-2**

- `vocabulary[3]` "je ne veux pas": same meaning as "I don't want" in 2024-03-28-negation: kept je-ne-veux-pas-fr

**2024-03-26-location-adverbs**

- `vocabulary[0]` "ici": same meaning as "here" in 2024-04-01-time-adverbs: kept ici-fr
- `vocabulary[1]` "là": la-fr already names "la", a different spelling: la-fr.there

**2024-03-24-everyday-nouns**

- `vocabulary[7]` "la ville": same meaning as "the town / the city" in 2024-01-22-reading2: kept la-ville-fr
- `vocabulary[22]` "l'addition": same meaning as "the bill/check" in 2024-03-31-survival-phrases: kept l-addition-fr

**2024-03-30-reading-4**

- `vocabulary[2]` "comment ça va": new meaning "how are you": comment-ca-va-fr.how-are-you; met before as "how's it going?" (comment-ca-va-fr, 2024-01-18-questions)
- `vocabulary[4]` "je ne peux pas": same meaning as "I can't" in 2024-03-27-negation-2: kept je-ne-peux-pas-fr
- `vocabulary[5]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr
- `vocabulary[6]` "je dois": same meaning as "I must" in 2024-03-23-devoir: kept je-dois-fr
- `vocabulary[7]` "le travail": same meaning as "work" in 2024-03-24-everyday-nouns: kept le-travail-fr
- `vocabulary[8]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr
- `vocabulary[9]` "demain": same meaning as "tomorrow" in 2024-04-01-time-adverbs: kept demain-fr
- `vocabulary[10]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr
- `vocabulary[13]` "venir": same meaning as "to come" in 2024-01-26-venir: kept venir-fr
- `vocabulary[17]` "la carte de crédit": same meaning as "credit card" in 2024-03-24-everyday-nouns: kept la-carte-de-credit-fr
- `vocabulary[19]` "là-bas": same meaning as "over there" in 2024-03-26-location-adverbs: kept la-bas-fr
- `vocabulary[22]` "où": same meaning as "where" in 2024-01-18-questions: kept ou-fr.where
- `vocabulary[23]` "la place": same meaning as "square/place" in 2024-03-24-everyday-nouns: kept la-place-fr
- `vocabulary[25]` "c'est ça": same meaning as "that's it/right" in 2024-01-13-ca-survival: kept c-est-ca-fr
- `vocabulary[26]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[27]` "partir": same meaning as "to leave / to depart" in 2024-01-29-partir: kept partir-fr
- `vocabulary[28]` "au revoir": same meaning as "goodbye" in 2024-01-01-famous-words: kept au-revoir-fr
- `vocabulary[34]` "le pain": same meaning as "bread" in 2024-03-24-everyday-nouns: kept le-pain-fr
- `vocabulary[35]` "l'eau": same meaning as "water" in 2024-03-24-everyday-nouns: kept l-eau-fr
- `vocabulary[36]` "s'il vous plaît": same meaning as "please" in 2024-01-01-famous-words: kept s-il-vous-plait-fr
- `vocabulary[37]` "voilà": new meaning "there you go": voila-fr.there-you-go; met before as "there it is / here you go" (voila-fr, 2024-01-01-famous-words)
- `vocabulary[38]` "jamais": same meaning as "never (with ne)" in 2024-04-01-time-adverbs: kept jamais-fr
- `vocabulary[44]` "la ville": same meaning as "the town / the city" in 2024-01-22-reading2: kept la-ville-fr
- `vocabulary[45]` "personne": same meaning as "nobody/no one" in 2024-03-24-everyday-nouns: kept personne-fr
- `vocabulary[48]` "la vie": same meaning as "life" in 2024-03-24-everyday-nouns: kept la-vie-fr

**2024-04-07-comparisons-slang**

- `vocabulary[7]` "trop": same meaning as "too much / too" in 2024-04-08-comparisons: kept trop-fr

**2024-04-16-would-conditionals**

- `vocabulary[0]` "je voudrais": same meaning as "I would like" in 2024-03-31-survival-phrases: kept je-voudrais-fr
- `vocabulary[3]` "nous voudrions": same meaning as "we would like" in 2024-03-30-reading-4: kept nous-voudrions-fr

**2024-04-04-aimer**

- `vocabulary[1]` "j'aime": same meaning as "I love / I like" in 2024-03-30-reading-4: kept j-aime-fr

**2024-04-11-food-nouns**

- `vocabulary[0]` "l'eau": same meaning as "water" in 2024-03-24-everyday-nouns: kept l-eau-fr
- `vocabulary[8]` "le pain": same meaning as "bread" in 2024-03-24-everyday-nouns: kept le-pain-fr

**2024-04-12-manger**

- `vocabulary[0]` "manger": same meaning as "to eat" in 2024-03-30-reading-4: kept manger-fr
- `vocabulary[1]` "je mange": same meaning as "I eat" in 2024-04-01-time-adverbs: kept je-mange-fr

**2024-04-13-reading-5**

- `vocabulary[5]` "café": new meaning "café": cafe-fr.caf; met before as "coffee" (cafe-fr, 2024-01-01-famous-words)
- `vocabulary[9]` "nous avons mangé": same meaning as "we ate" in 2024-04-12-manger: kept nous-avons-mange-fr
- `vocabulary[10]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[11]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr
- `vocabulary[15]` "boire": same meaning as "to drink" in 2024-04-06-boire: kept boire-fr (fixed by hand)
- `vocabulary[16]` "faire": same meaning as "to do / to make" in 2024-03-25-faire: kept faire-fr (fixed by hand)
- `vocabulary[17]` "aimer": same meaning as "to like / to love" in 2024-04-04-aimer: kept aimer-fr (fixed by hand)
- `vocabulary[18]` "vouloir": same meaning as "to want" in 2024-01-15-vouloir: kept vouloir-fr (fixed by hand)
- `vocabulary[19]` "aller": same meaning as "to go" in 2024-01-27-aller: kept aller-fr (fixed by hand)
- `vocabulary[20]` "venir": same meaning as "to come" in 2024-01-26-venir: kept venir-fr (fixed by hand)
- `vocabulary[21]` "partir": same meaning as "to leave / to depart" in 2024-01-29-partir: kept partir-fr (fixed by hand)
- `vocabulary[22]` "voir": same meaning as "to see" in 2024-01-17-voir: kept voir-fr (fixed by hand)
- `vocabulary[23]` "chercher": same meaning as "to search/look for" in 2024-10-22-search-find: kept chercher-fr (fixed by hand)
- `vocabulary[26]` "parler": same meaning as "to speak / to talk" in 2024-03-29-parler: kept parler-fr (fixed by hand)
- `vocabulary[35]` "mon ami": same meaning as "my friend" in 2024-03-30-reading-4: kept mon-ami-fr
- `vocabulary[37]` "excusez-moi": same meaning as "excuse me" in 2024-03-31-survival-phrases: kept excusez-moi-fr (fixed by hand)
- `vocabulary[38]` "encore": new meaning "more / again": encore-fr.more; met before as "still" (encore-fr, 2024-04-01-time-adverbs)

**2024-04-23-progressive-tenses**

- `vocabulary[8]` "je ne peux pas": same meaning as "I can't" in 2024-03-27-negation-2: kept je-ne-peux-pas-fr

**2024-04-18-commander**

- `vocabulary[11]` "vous commandez?": new meaning "are you ready to order?": vous-commandez-fr.question; met before as "you order (formal/plural)" (vous-commandez-fr, 2024-04-18-commander) (written: vous-commandez-fr.are-you-ready) (fixed by hand)

**2024-04-25-top-200-nouns**

- `vocabulary[6]` "la fin": same meaning as "the end" in 2024-03-30-reading-4: kept la-fin-fr
- `vocabulary[21]` "le problème": same meaning as "problem" in 2024-03-30-reading-4: kept le-probleme-fr

**2024-04-24-reading-6**

- `vocabulary[1]` "prendre": same meaning as "to take" in 2024-04-22-prendre: kept prendre-fr
- `vocabulary[5]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr
- `vocabulary[6]` "mettre": same meaning as "to put / to set / to wear" in 2024-04-21-mettre: kept mettre-fr
- `vocabulary[8]` "demander": same meaning as "to ask / to ask for" in 2024-04-19-demander: kept demander-fr
- `vocabulary[9]` "manger": same meaning as "to eat" in 2024-03-30-reading-4: kept manger-fr (fixed by hand)
- `vocabulary[11]` "dire": same meaning as "to say / to tell" in 2024-04-20-dire: kept dire-fr
- `vocabulary[14]` "j'ai besoin de": same meaning as "I need" in 2024-04-17-besoin: kept j-ai-besoin-de-fr
- `vocabulary[15]` "tu as besoin de": same meaning as "you need (informal)" in 2024-04-17-besoin: kept tu-as-besoin-de-fr
- `vocabulary[19]` "la famille": same meaning as "family" in 2024-04-25-top-200-nouns: kept la-famille-fr
- `vocabulary[20]` "le père": same meaning as "father" in 2024-04-25-top-200-nouns: kept le-pere-fr
- `vocabulary[21]` "la mère": same meaning as "mother" in 2024-04-25-top-200-nouns: kept la-mere-fr
- `vocabulary[25]` "le moment": same meaning as "moment" in 2024-04-25-top-200-nouns: kept le-moment-fr
- `vocabulary[28]` "le monde": same meaning as "world" in 2024-03-24-everyday-nouns: kept le-monde-fr
- `vocabulary[29]` "la ville": same meaning as "the town / the city" in 2024-01-22-reading2: kept la-ville-fr (fixed by hand)
- `vocabulary[34]` "dans": same meaning as "in / inside" in 2024-01-20-prepositions: kept dans-fr
- `vocabulary[41]` "oui": same meaning as "yes" in 2024-01-01-famous-words: kept oui-fr
- `vocabulary[45]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[46]` "est-ce que": new meaning "question marker": est-ce-que-fr.question-marker; met before as "question maker" (est-ce-que-fr, 2024-01-18-questions)
- `vocabulary[47]` "quelque chose": same meaning as "something" in 2024-03-24-everyday-nouns: kept quelque-chose-fr
- `vocabulary[51]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr (fixed by hand)
- `vocabulary[52]` "c'est vrai": same meaning as "that's true" in 2024-04-20-dire: kept c-est-vrai-fr
- `vocabulary[53]` "voir": same meaning as "to see" in 2024-01-17-voir: kept voir-fr (fixed by hand)
- `vocabulary[57]` "faire": same meaning as "to do / to make" in 2024-03-25-faire: kept faire-fr (fixed by hand)
- `vocabulary[59]` "beaucoup": same meaning as "a lot / very much" in 2024-03-31-survival-phrases: kept beaucoup-fr
- `vocabulary[64]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr
- `vocabulary[65]` "tu parles": same meaning as "you speak (informal)" in 2024-03-29-parler: kept tu-parles-fr (fixed by hand)
- `vocabulary[67]` "merci": same meaning as "thank you" in 2024-01-01-famous-words: kept merci-fr (fixed by hand)
- `vocabulary[69]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr (fixed by hand)
- `vocabulary[70]` "avoir": same meaning as "to have" in 2024-01-04-avoir: kept avoir-fr (fixed by hand)
- `vocabulary[74]` "pour": same meaning as "for" in 2024-01-20-prepositions: kept pour-fr (fixed by hand)

**2024-05-05-on-and-people**

- `vocabulary[0]` "on": same meaning as "we (informal) / one / people" in 2024-01-01-pronouns: kept on-fr
- `vocabulary[7]` "on dit": same meaning as "people say" in 2024-04-13-reading-5: kept on-dit-fr
- `vocabulary[10]` "les gens": same meaning as "people" in 2024-04-13-reading-5: kept les-gens-fr
- `vocabulary[13]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[17]` "personne": same meaning as "nobody/no one" in 2024-03-24-everyday-nouns: kept personne-fr

**2024-05-04-learning-verbs**

- `vocabulary[0]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr
- `vocabulary[1]` "j'apprends": same meaning as "I learn" in 2024-04-22-prendre: kept j-apprends-fr
- `vocabulary[4]` "nous apprenons": same meaning as "we learn" in 2024-04-22-prendre: kept nous-apprenons-fr
- `vocabulary[14]` "j'apprends le français": same meaning as "I learn French / I'm learning French" in 2024-04-22-prendre: kept j-apprends-le-francais-fr

**2024-04-29-comprendre**

- `vocabulary[0]` "comprendre": same meaning as "to understand" in 2024-04-22-prendre: kept comprendre-fr
- `vocabulary[1]` "je comprends": same meaning as "I understand" in 2024-04-22-prendre: kept je-comprends-fr
- `vocabulary[2]` "tu comprends": new meaning "you understand (informal)": tu-comprends-fr.you-understand; met before as "do you understand?" (tu-comprends-fr, 2024-04-22-prendre) (written: tu-comprends-fr) (fixed by hand)
- `vocabulary[4]` "nous comprenons": same meaning as "we understand" in 2024-04-22-prendre: kept nous-comprenons-fr
- `vocabulary[7]` "Je ne comprends pas": same meaning as "I don't understand" in 2024-04-22-prendre: kept je-ne-comprends-pas-fr
- `vocabulary[8]` "Tu comprends?": same meaning as "do you understand?" in 2024-04-22-prendre: kept tu-comprends-fr (written: tu-comprends-fr.question)

**2024-05-08-savoir**

- `vocabulary[8]` "Tu sais?": new meaning "Do you know? / You know?": tu-sais-fr.question; met before as "you know (informal)" (tu-sais-fr, 2024-05-08-savoir)

**2024-04-30-connaitre**

- `vocabulary[9]` "Tu connais?": new meaning "Do you know (it/him/her)?": tu-connais-fr.question; met before as "you know (informal)" (tu-connais-fr, 2024-04-30-connaitre)

**2024-05-01-croire**

- `vocabulary[9]` "Tu crois?": new meaning "Do you think so? / Do you believe it?": tu-crois-fr.question; met before as "you believe (informal)" (tu-crois-fr, 2024-05-01-croire)

**2024-05-03-knowledge-nouns**

- `vocabulary[10]` "la question": same meaning as "question" in 2024-04-25-top-200-nouns: kept la-question-fr

**2024-05-02-discourse-markers**

- `vocabulary[4]` "bon": new meaning "well / so (discourse use)": bon-fr.discourse; met before as "good" (bon-fr, 2024-01-01-famous-words)
- `vocabulary[5]` "alors": same meaning as "so / then" in 2024-03-30-reading-4: kept alors-fr
- `vocabulary[8]` "peut-être": same meaning as "maybe" in 2024-04-13-reading-5: kept peut-etre-fr
- `vocabulary[13]` "bien sûr": same meaning as "of course" in 2024-04-24-reading-6: kept bien-sur-fr

**2024-04-28-comparison-modifiers**

- `vocabulary[1]` "toute": same meaning as "all/whole" in 2024-04-24-reading-6: kept toute-fr
- `vocabulary[4]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[7]` "même": same meaning as "same / even" in 2024-04-08-comparisons: kept meme-fr
- `vocabulary[10]` "mal": same meaning as "badly / bad" in 2024-04-08-comparisons: kept mal-fr

**2024-05-07-reading-7**

- `vocabulary[0]` "apprendre": same meaning as "to learn" in 2024-04-22-prendre: kept apprendre-fr (fixed by hand)
- `vocabulary[2]` "étudier": same meaning as "to study" in 2024-05-09-studying-verbs: kept etudier-fr (fixed by hand)
- `vocabulary[5]` "comprendre": same meaning as "to understand" in 2024-04-22-prendre: kept comprendre-fr (fixed by hand)
- `vocabulary[6]` "comprends": same meaning as "understand (you/I)" in 2024-04-24-reading-6: kept comprends-fr
- `vocabulary[9]` "savoir": same meaning as "to know (facts/skills)" in 2024-05-08-savoir: kept savoir-fr (fixed by hand)
- `vocabulary[12]` "connaître": same meaning as "to know / to be familiar with" in 2024-04-30-connaitre: kept connaitre-fr (fixed by hand)
- `vocabulary[14]` "penser": same meaning as "to think" in 2024-05-06-penser: kept penser-fr (fixed by hand)
- `vocabulary[18]` "croire": same meaning as "to believe / to think" in 2024-05-01-croire: kept croire-fr (fixed by hand)
- `vocabulary[20]` "réviser": same meaning as "to review / to revise" in 2024-05-09-studying-verbs: kept reviser-fr (fixed by hand)
- `vocabulary[23]` "chercher": same meaning as "to search/look for" in 2024-10-22-search-find: kept chercher-fr (fixed by hand)
- `vocabulary[25]` "trouver": same meaning as "to find" in 2024-10-22-search-find: kept trouver-fr (fixed by hand)
- `vocabulary[37]` "donc": same meaning as "so / therefore" in 2024-05-02-discourse-markers: kept donc-fr
- `vocabulary[38]` "en fait": same meaning as "in fact / actually" in 2024-05-02-discourse-markers: kept en-fait-fr
- `vocabulary[39]` "bon": new meaning "well": bon-fr.well; met before as "good" (bon-fr, 2024-01-01-famous-words); "well / so (discourse use)" (bon-fr.discourse, 2024-05-02-discourse-markers)
- `vocabulary[40]` "alors": same meaning as "so / then" in 2024-03-30-reading-4: kept alors-fr
- `vocabulary[41]` "quoi": same meaning as "like / you know (filler at end)" in 2024-05-02-discourse-markers: kept quoi-fr
- `vocabulary[42]` "tout le monde": same meaning as "everybody/everyone" in 2024-03-24-everyday-nouns: kept tout-le-monde-fr
- `vocabulary[43]` "même": same meaning as "same / even" in 2024-04-08-comparisons: kept meme-fr (fixed by hand)
- `vocabulary[44]` "mal": same meaning as "badly / bad" in 2024-04-08-comparisons: kept mal-fr
- `vocabulary[49]` "comment": same meaning as "how" in 2024-01-18-questions: kept comment-fr
- `vocabulary[55]` "demander": same meaning as "to ask / to ask for" in 2024-04-19-demander: kept demander-fr (fixed by hand)
- `vocabulary[60]` "bons": same meaning as "good (plural)" in 2024-01-09-reading1: kept bons-fr
- `vocabulary[62]` "meilleures": same meaning as "better (plural)" in 2024-04-13-reading-5: kept meilleures-fr
- `vocabulary[64]` "maintenant": same meaning as "now" in 2024-04-01-time-adverbs: kept maintenant-fr
- `vocabulary[65]` "beaucoup": same meaning as "a lot / very much" in 2024-03-31-survival-phrases: kept beaucoup-fr
- `vocabulary[75]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr

**2024-05-23-temporal-words**

- `vocabulary[0]` "pendant": same meaning as "during / for" in 2024-05-07-reading-7: kept pendant-fr
- `vocabulary[2]` "après": same meaning as "after" in 2024-05-07-reading-7: kept apres-fr
- `vocabulary[4]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[5]` "ensuite": same meaning as "next / then" in 2024-05-07-reading-7: kept ensuite-fr
- `vocabulary[7]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr

**2024-05-21-reflexive-pronouns**

- `vocabulary[0]` "me": new meaning "myself": me-fr.reflexive; met before as "me" (me-fr, 2024-01-30-object-pronouns)
- `vocabulary[1]` "te": new meaning "yourself (informal)": te-fr.reflexive; met before as "you (informal)" (te-fr, 2024-01-30-object-pronouns)
- `vocabulary[3]` "nous": new meaning "ourselves": nous-fr.reflexive; met before as "we" (nous-fr, 2024-01-01-pronouns); "us (stressed)" (nous-fr.stressed, 2024-01-19-stressed-pronouns); "us" (nous-fr.object-pronoun, 2024-01-30-object-pronouns)
- `vocabulary[4]` "vous": new meaning "yourselves / yourself (formal)": vous-fr.reflexive; met before as "you (formal/plural)" (vous-fr, 2024-01-01-pronouns); "you (stressed, formal/plural)" (vous-fr.stressed, 2024-01-19-stressed-pronouns); "you (formal/plural)" (vous-fr.object-pronoun, 2024-01-30-object-pronouns)

**2024-05-19-morning-routine**

- `vocabulary[9]` "tu te lèves": same meaning as "you get (yourself) up" in 2024-05-21-reflexive-pronouns: kept tu-te-leves-fr

**2024-05-17-getting-ready**

- `vocabulary[1]` "je me lave": new meaning "I wash myself": je-me-lave-fr.i-wash-myself; met before as "I wash myself" (je-me-lave-fr, 2024-05-21-reflexive-pronouns) (written: je-me-lave-fr) (fixed by hand)

**2024-06-06-reciprocal-reflexives**

- `vocabulary[0]` "nous nous aimons": same meaning as "we love ourselves / we love each other" in 2024-05-21-reflexive-pronouns: kept nous-nous-aimons-fr

**2024-05-13-commands-tu**

- `vocabulary[4]` "Pense!": same meaning as "think(s)" in 2024-05-07-reading-7: kept pense-fr
- `vocabulary[5]` "Viens!": same meaning as "come" in 2024-03-30-reading-4: kept viens-fr

**2024-05-18-irregular-commands**

- `vocabulary[9]` "Allons-y!": same meaning as "Let's go!" in 2024-05-03-knowledge-nouns: kept allons-y-fr
- `vocabulary[10]` "Fais!": same meaning as "do/make (you)" in 2024-04-24-reading-6: kept fais-fr (fixed by hand)
- `vocabulary[11]` "Faites!": same meaning as "do/make" in 2024-05-07-reading-7: kept faites-fr (fixed by hand)

**2024-05-20-reading-8**

- `vocabulary[0]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[1]` "ensuite": same meaning as "next / then" in 2024-05-07-reading-7: kept ensuite-fr
- `vocabulary[2]` "puis": same meaning as "then" in 2024-05-23-temporal-words: kept puis-fr
- `vocabulary[3]` "après": same meaning as "after" in 2024-05-07-reading-7: kept apres-fr
- `vocabulary[4]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr
- `vocabulary[5]` "avant": same meaning as "before" in 2024-05-23-temporal-words: kept avant-fr
- `vocabulary[6]` "pendant": same meaning as "during / for" in 2024-05-07-reading-7: kept pendant-fr
- `vocabulary[7]` "je m'appelle": same meaning as "my name is / I'm called" in 2024-05-22-s-appeler: kept je-m-appelle-fr
- `vocabulary[8]` "je me réveille": same meaning as "I wake up" in 2024-05-19-morning-routine: kept je-me-reveille-fr
- `vocabulary[9]` "je me lève": same meaning as "I get up" in 2024-05-19-morning-routine: kept je-me-leve-fr
- `vocabulary[10]` "je me lave": same meaning as "I wash myself" in 2024-05-17-getting-ready: kept je-me-lave-fr
- `vocabulary[11]` "je m'habille": same meaning as "I get dressed" in 2024-05-17-getting-ready: kept je-m-habille-fr
- `vocabulary[12]` "je me prépare": same meaning as "I get ready" in 2024-05-17-getting-ready: kept je-me-prepare-fr
- `vocabulary[13]` "je me dépêche": new meaning "I hurry": je-me-depeche-fr.i-hurry; met before as "I'm hurrying" (je-me-depeche-fr, 2024-05-16-daily-reflexives)
- `vocabulary[14]` "je me souviens": same meaning as "I remember" in 2024-05-16-daily-reflexives: kept je-me-souviens-fr
- `vocabulary[15]` "on s'amuse": new meaning "we have fun": on-s-amuse-fr.we-have-fun; met before as "we're having fun" (on-s-amuse-fr, 2024-05-16-daily-reflexives)
- `vocabulary[19]` "on se voit": same meaning as "we see each other" in 2024-06-06-reciprocal-reflexives: kept on-se-voit-fr
- `vocabulary[22]` "Pense!": same meaning as "think(s)" in 2024-05-07-reading-7: kept pense-fr
- `vocabulary[23]` "Parle!": same meaning as "Speak!" in 2024-05-13-commands-tu: kept parle-fr
- `vocabulary[28]` "quelques": same meaning as "some/a few" in 2024-04-24-reading-6: kept quelques-fr
- `vocabulary[31]` "café": same meaning as "coffee" in 2024-01-01-famous-words: kept cafe-fr
- `vocabulary[39]` "contente": same meaning as "happy" in 2024-04-24-reading-6: kept contente-fr
- `vocabulary[40]` "encore": same meaning as "more / again" in 2024-04-13-reading-5: kept encore-fr.more
- `vocabulary[42]` "voilà": new meaning "there is / that's": voila-fr.there-is; met before as "there it is / here you go" (voila-fr, 2024-01-01-famous-words); "there you go" (voila-fr.there-you-go, 2024-03-30-reading-4)
- `vocabulary[43]` "votre": same meaning as "your (singular, formal)" in 2024-01-31-possessive-adjectives: kept votre-fr

**2024-05-26-causal-words**

- `vocabulary[0]` "parce que": same meaning as "because" in 2024-05-20-reading-8: kept parce-que-fr
- `vocabulary[6]` "pourquoi": same meaning as "why" in 2024-01-18-questions: kept pourquoi-fr
- `vocabulary[7]` "la raison": same meaning as "reason" in 2024-04-25-top-200-nouns: kept la-raison-fr

**2024-06-08-spatial-prepositions**

- `vocabulary[0]` "devant": same meaning as "in front of / before" in 2024-01-20-prepositions: kept devant-fr
- `vocabulary[1]` "derrière": same meaning as "behind" in 2024-01-20-prepositions: kept derriere-fr
- `vocabulary[2]` "entre": same meaning as "between" in 2024-01-20-prepositions: kept entre-fr
- `vocabulary[6]` "dans": same meaning as "in / inside" in 2024-01-20-prepositions: kept dans-fr
- `vocabulary[7]` "sur": same meaning as "on / on top of" in 2024-01-20-prepositions: kept sur-fr
- `vocabulary[8]` "sous": same meaning as "under / beneath" in 2024-01-20-prepositions: kept sous-fr
- `vocabulary[11]` "la place": same meaning as "square/place" in 2024-03-24-everyday-nouns: kept la-place-fr

**2024-05-28-more-spatial-relations**

- `vocabulary[11]` "ici": same meaning as "here" in 2024-04-01-time-adverbs: kept ici-fr

**2024-05-30-passe-compose-er**

- `vocabulary[1]` "j'ai mangé": same meaning as "I ate / I have eaten" in 2024-04-12-manger: kept j-ai-mange-fr
- `vocabulary[5]` "j'ai trouvé": same meaning as "I found / I have found" in 2024-10-22-search-find: kept j-ai-trouve-fr
- `vocabulary[10]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[11]` "déjà": same meaning as "already" in 2024-04-01-time-adverbs: kept deja-fr

**2024-06-02-passe-compose-irregular-2**

- `vocabulary[4]` "j'ai pris": same meaning as "I took" in 2024-04-22-prendre: kept j-ai-pris-fr
- `vocabulary[5]` "j'ai mis": same meaning as "I put / I put on" in 2024-04-21-mettre: kept j-ai-mis-fr
- `vocabulary[7]` "j'ai appris": same meaning as "I learned" in 2024-04-22-prendre: kept j-ai-appris-fr

**2024-05-27-imparfait-all-verbs**

- `vocabulary[6]` "nous étions": same meaning as "we were" in 2024-04-10-etre-past: kept nous-etions-fr

**2024-06-04-pc-vs-imparfait**

- `vocabulary[0]` "quand": same meaning as "when" in 2024-01-18-questions: kept quand-fr
- `vocabulary[3]` "tous les jours": same meaning as "every day" in 2024-05-27-imparfait-all-verbs: kept tous-les-jours-fr
- `vocabulary[5]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr (fixed by hand)
- `vocabulary[6]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr

**2024-06-03-past-tense-composition**

- `vocabulary[0]` "donc": same meaning as "so / therefore" in 2024-05-02-discourse-markers: kept donc-fr
- `vocabulary[1]` "alors": same meaning as "so / then" in 2024-03-30-reading-4: kept alors-fr
- `vocabulary[2]` "c'était": same meaning as "it was" in 2024-04-13-reading-5: kept c-etait-fr
- `vocabulary[3]` "il y avait": same meaning as "there was / there were" in 2024-05-27-imparfait-all-verbs: kept il-y-avait-fr

**2024-06-05-reading-9**

- `vocabulary[1]` "Jardin du Luxembourg": same meaning as "Luxembourg Garden (famous Paris park)" in 2024-03-30-reading-4: kept jardin-du-luxembourg-fr
- `vocabulary[4]` "la Sorbonne": same meaning as "the Sorbonne" in 2024-05-20-reading-8: kept la-sorbonne-fr
- `vocabulary[9]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[10]` "c'était": same meaning as "it was" in 2024-04-13-reading-5: kept c-etait-fr
- `vocabulary[12]` "il faisait": same meaning as "it was (weather) / he was doing" in 2024-05-27-imparfait-all-verbs: kept il-faisait-fr
- `vocabulary[14]` "parce que": same meaning as "because" in 2024-05-20-reading-8: kept parce-que-fr
- `vocabulary[16]` "le travail": same meaning as "work" in 2024-03-24-everyday-nouns: kept le-travail-fr
- `vocabulary[17]` "d'abord": same meaning as "first" in 2024-05-07-reading-7: kept d-abord-fr
- `vocabulary[18]` "je me suis réveillé": same meaning as "I woke up (masc)" in 2024-06-07-reflexive-past: kept je-me-suis-reveille-fr
- `vocabulary[19]` "d'habitude": same meaning as "usually, normally" in 2024-06-04-pc-vs-imparfait: kept d-habitude-fr
- `vocabulary[21]` "plus tard": same meaning as "later" in 2024-04-13-reading-5: kept plus-tard-fr
- `vocabulary[23]` "j'ai voulu": same meaning as "I wanted" in 2024-06-02-passe-compose-irregular-2: kept j-ai-voulu-fr
- `vocabulary[25]` "le temps": same meaning as "time/weather" in 2024-03-24-everyday-nouns: kept le-temps-fr
- `vocabulary[30]` "près de": same meaning as "near, close to" in 2024-05-28-more-spatial-relations: kept pres-de-fr
- `vocabulary[32]` "il y avait": same meaning as "there was / there were" in 2024-05-27-imparfait-all-verbs: kept il-y-avait-fr
- `vocabulary[37]` "quand": same meaning as "when" in 2024-01-18-questions: kept quand-fr
- `vocabulary[39]` "j'ai vu": same meaning as "I saw" in 2024-06-01-passe-compose-irregular-1: kept j-ai-vu-fr
- `vocabulary[41]` "Pierre": same meaning as "Pierre (friend's name)" in 2024-06-05-reading-9: kept pierre-fr (written: pierre-fr.pierre)
- `vocabulary[50]` "salut": same meaning as "hi / bye" in 2024-01-01-famous-words: kept salut-fr
- `vocabulary[52]` "ici": same meaning as "here" in 2024-04-01-time-adverbs: kept ici-fr
- `vocabulary[53]` "j'ai demandé": same meaning as "I asked" in 2024-05-30-passe-compose-er: kept j-ai-demande-fr
- `vocabulary[68]` "car": same meaning as "for, because" in 2024-05-26-causal-words: kept car-fr
- `vocabulary[69]` "j'ai eu": same meaning as "I had" in 2024-06-01-passe-compose-irregular-1: kept j-ai-eu-fr
- `vocabulary[71]` "le problème": same meaning as "problem" in 2024-03-30-reading-4: kept le-probleme-fr
- `vocabulary[73]` "ensuite": same meaning as "next / then" in 2024-05-07-reading-7: kept ensuite-fr
- `vocabulary[74]` "comme": same meaning as "as, since" in 2024-05-26-causal-words: kept comme-fr
- `vocabulary[80]` "en face de": same meaning as "across from, opposite" in 2024-05-28-more-spatial-relations: kept en-face-de-fr
- `vocabulary[84]` "à côté de": same meaning as "next to, beside" in 2024-05-28-more-spatial-relations: kept a-cote-de-fr
- `vocabulary[87]` "autour de": same meaning as "around" in 2024-05-28-more-spatial-relations: kept autour-de-fr
- `vocabulary[88]` "partout": same meaning as "everywhere" in 2024-03-26-location-adverbs: kept partout-fr
- `vocabulary[91]` "pendant que": same meaning as "while" in 2024-06-04-pc-vs-imparfait: kept pendant-que-fr
- `vocabulary[94]` "Marie": same meaning as "Marie (friend's name)" in 2024-06-05-reading-9: kept marie-fr (written: marie-fr.marie)
- `vocabulary[111]` "grâce à": same meaning as "thanks to" in 2024-05-26-causal-words: kept grace-a-fr
- `vocabulary[117]` "ensemble": same meaning as "together" in 2024-03-29-parler: kept ensemble-fr
- `vocabulary[118]` "nous sommes allés": same meaning as "we went" in 2024-05-29-passe-compose-agreement: kept nous-sommes-alles-fr
- `vocabulary[126]` "la gare": new meaning "the station": la-gare-fr.the-station; met before as "the train station" (la-gare-fr, 2024-05-28-more-spatial-relations) (written: la-gare-fr)
- `vocabulary[137]` "derrière": same meaning as "behind" in 2024-01-20-prepositions: kept derriere-fr
- `vocabulary[138]` "nous avons mangé": same meaning as "we ate" in 2024-04-12-manger: kept nous-avons-mange-fr
- `vocabulary[146]` "la vie": same meaning as "life" in 2024-03-24-everyday-nouns: kept la-vie-fr
- `vocabulary[149]` "à cause de": same meaning as "because of" in 2024-05-26-causal-words: kept a-cause-de-fr
- `vocabulary[160]` "finalement": same meaning as "finally" in 2024-05-07-reading-7: kept finalement-fr
- `vocabulary[162]` "chez moi": same meaning as "to my place / home" in 2024-05-20-reading-8: kept chez-moi-fr
- `vocabulary[167]` "heureux": same meaning as "happy" in 2024-01-02-etre: kept heureux-fr
- `vocabulary[170]` "parfois": same meaning as "sometimes" in 2024-04-01-time-adverbs: kept parfois-fr

**2024-01-25-emotion-phrases**

- `vocabulary[0]` "je suis content que tu sois là": new meaning "I'm happy you're here": je-suis-content-que-tu-sois-la-fr.i-m-happy; met before as "I'm glad you're here" (je-suis-content-que-tu-sois-la-fr, 2024-06-05-reading-9) (written: je-suis-content-que-tu-sois-la-fr) (fixed by hand)

**2024-01-22-common-adverbs**

- `vocabulary[0]` "vraiment": same meaning as "really / truly" in 2024-05-07-reading-7: kept vraiment-fr
- `vocabulary[6]` "probablement": same meaning as "probably" in 2024-05-02-discourse-markers: kept probablement-fr

**2024-02-01-reading-10**

- `vocabulary[0]` "Paris": same meaning as "Paris (capital of France)" in 2024-06-05-reading-9: kept paris-fr
- `vocabulary[7]` "la Tour Eiffel": same meaning as "Eiffel Tower" in 2024-04-24-reading-6: kept la-tour-eiffel-fr
- `vocabulary[16]` "il faut que": same meaning as "it's necessary that / someone needs to" in 2024-01-23-common-special-forms-1: kept il-faut-que-fr
- `vocabulary[23]` "sois": same meaning as "Be! (informal)" in 2024-05-18-irregular-commands: kept sois-fr
- `vocabulary[42]` "depuis": same meaning as "since / for" in 2024-05-23-temporal-words: kept depuis-fr
- `vocabulary[43]` "toujours": same meaning as "always" in 2024-04-01-time-adverbs: kept toujours-fr
- `vocabulary[54]` "en train de": same meaning as "in the process of" in 2024-05-07-reading-7: kept en-train-de-fr
- `vocabulary[56]` "artiste": same meaning as "artist" in 2024-04-13-reading-5: kept artiste-fr
- `vocabulary[61]` "essaies": same meaning as "try (subjunctive, tu)" in 2024-02-01-reading-10: kept essaies-fr (written: essaies-fr.try)
- `vocabulary[63]` "professeur": same meaning as "teacher / professor" in 2024-05-20-reading-8: kept professeur-fr
- `vocabulary[70]` "encore": same meaning as "still" in 2024-04-01-time-adverbs: kept encore-fr
- `vocabulary[76]` "réussisse": same meaning as "succeeds/succeed (subjunctive)" in 2024-02-01-reading-10: kept reussisse-fr (written: reussisse-fr.succeeds)
- `vocabulary[80]` "magnifique": same meaning as "magnificent" in 2024-05-07-reading-7: kept magnifique-fr
- `vocabulary[84]` "toute la nuit": same meaning as "all night" in 2024-04-13-reading-5: kept toute-la-nuit-fr
- `vocabulary[90]` "continuer": same meaning as "to continue" in 2024-04-13-reading-5: kept continuer-fr
- `vocabulary[97]` "demain": same meaning as "tomorrow" in 2024-04-01-time-adverbs: kept demain-fr
- `vocabulary[98]` "appeler": same meaning as "to call" in 2024-04-13-reading-5: kept appeler-fr
- `vocabulary[100]` "demande": same meaning as "ask(s)" in 2024-05-07-reading-7: kept demande-fr
- `vocabulary[105]` "grâce à": same meaning as "thanks to" in 2024-05-26-causal-words: kept grace-a-fr
- `vocabulary[111]` "savoir": same meaning as "to know (facts/skills)" in 2024-05-08-savoir: kept savoir-fr

**2024-02-10-donner**

- `vocabulary[0]` "donner": same meaning as "to give" in 2024-10-22-donner: kept donner-fr
- `vocabulary[1]` "je donne": same meaning as "I give" in 2024-10-22-donner: kept je-donne-fr
- `vocabulary[2]` "tu donnes": same meaning as "you give (informal)" in 2024-10-22-donner: kept tu-donnes-fr
- `vocabulary[5]` "nous donnons": same meaning as "we give" in 2024-10-22-donner: kept nous-donnons-fr
- `vocabulary[6]` "vous donnez": same meaning as "you give (formal/plural)" in 2024-10-22-donner: kept vous-donnez-fr

**2024-05-15-daily-actions-1**

- `vocabulary[0]` "dormir": same meaning as "to sleep" in 2024-06-05-reading-9: kept dormir-fr
- `vocabulary[9]` "travailler": same meaning as "to work" in 2024-03-24-everyday-nouns: kept travailler-fr

**2024-02-13-search-and-find**

- `vocabulary[0]` "chercher": same meaning as "to search/look for" in 2024-10-22-search-find: kept chercher-fr
- `vocabulary[1]` "je cherche": same meaning as "I search/look for" in 2024-10-22-search-find: kept je-cherche-fr
- `vocabulary[2]` "tu cherches": same meaning as "you search/look for" in 2024-10-22-search-find: kept tu-cherches-fr
- `vocabulary[5]` "nous cherchons": same meaning as "we search/look for" in 2024-10-22-search-find: kept nous-cherchons-fr
- `vocabulary[6]` "vous cherchez": same meaning as "you search/look for" in 2024-10-22-search-find: kept vous-cherchez-fr
- `vocabulary[9]` "trouver": same meaning as "to find" in 2024-10-22-search-find: kept trouver-fr
- `vocabulary[10]` "je trouve": same meaning as "I find" in 2024-10-22-search-find: kept je-trouve-fr
- `vocabulary[11]` "tu trouves": same meaning as "you find" in 2024-10-22-search-find: kept tu-trouves-fr
- `vocabulary[14]` "nous trouvons": same meaning as "we find" in 2024-10-22-search-find: kept nous-trouvons-fr
- `vocabulary[15]` "vous trouvez": same meaning as "you find" in 2024-10-22-search-find: kept vous-trouvez-fr
- `vocabulary[21]` "j'ai trouvé!": same meaning as "I found / I have found" in 2024-10-22-search-find: kept j-ai-trouve-fr

**2024-02-11-perception-verbs**

- `vocabulary[12]` "il regarde": new meaning "he watches": il-regarde-fr.he-watches; met before as "he looks / he looks at" (il-regarde-fr, 2024-04-13-reading-5) (written: il-regarde-fr)
- `vocabulary[25]` "je trouve que": same meaning as "I think that / I find that" in 2024-02-13-search-and-find: kept je-trouve-que-fr

**2024-02-09-directions-navigation**

- `vocabulary[11]` "allez": same meaning as "Go! (formal/plural)" in 2024-05-18-irregular-commands: kept allez-fr
- `vocabulary[12]` "va": same meaning as "Go! (informal)" in 2024-05-18-irregular-commands: kept va-fr
- `vocabulary[15]` "près de": same meaning as "near, close to" in 2024-05-28-more-spatial-relations: kept pres-de-fr
- `vocabulary[16]` "loin de": same meaning as "far from" in 2024-05-28-more-spatial-relations: kept loin-de-fr
- `vocabulary[17]` "à côté de": same meaning as "next to, beside" in 2024-05-28-more-spatial-relations: kept a-cote-de-fr
- `vocabulary[18]` "en face de": same meaning as "across from, opposite" in 2024-05-28-more-spatial-relations: kept en-face-de-fr
- `vocabulary[30]` "vous voyez": same meaning as "you see (formal)" in 2024-01-17-voir: kept vous-voyez-fr

**2024-02-12-reading-11**

- `vocabulary[1]` "rapidement": new meaning "rapidly": rapidement-fr.rapidly; met before as "quickly" (rapidement-fr, 2024-01-22-common-adverbs)
- `vocabulary[47]` "facilement": same meaning as "easily" in 2024-01-22-common-adverbs: kept facilement-fr
- `vocabulary[96]` "questions": same meaning as "questions" in 2024-05-07-reading-7: kept questions-fr
- `vocabulary[120]` "Paris": same meaning as "Paris (capital of France)" in 2024-06-05-reading-9: kept paris-fr
- `vocabulary[122]` "Notre-Dame": same meaning as "Notre-Dame Cathedral (iconic medieval cathedral)" in 2024-02-01-reading-10: kept notre-dame-fr
- `vocabulary[127]` "Montmartre": same meaning as "Montmartre (historic artist district in Paris)" in 2024-02-01-reading-10: kept montmartre-fr
- `vocabulary[129]` "Lyon": same meaning as "Lyon (second largest city in France)" in 2024-06-05-reading-9: kept lyon-fr
- `vocabulary[131]` "Bordeaux": same meaning as "Bordeaux (famous wine city in southwest France)" in 2024-02-01-reading-10: kept bordeaux-fr
- `vocabulary[132]` "Nice": same meaning as "Nice (beautiful city on French Riviera)" in 2024-02-01-reading-10: kept nice-fr
- `vocabulary[137]` "Vincent van Gogh": same meaning as "Vincent van Gogh" in 2024-04-13-reading-5: kept vincent-van-gogh-fr

**2024-03-15-nature-animals**

- `vocabulary[8]` "un chat": same meaning as "a cat (male)" in 2024-01-06-basic-nouns: kept un-chat-fr
- `vocabulary[19]` "petit / petite": same meaning as "small" in 2024-01-21-adjectives: kept petit-petite-fr

**2024-03-16-movement-verbs**

- `vocabulary[30]` "marcher": same meaning as "to walk" in 2024-04-24-reading-6: kept marcher-fr

**2024-03-17-natural-phenomena**

- `vocabulary[31]` "je suis tombé(e)": same meaning as "I fell" in 2024-05-31-passe-compose-etre: kept je-suis-tombe-e-fr

**2024-03-15-questce-qui-que**

- `vocabulary[1]` "qu'est-ce que": new meaning "what (object)": qu-est-ce-que-fr.object-pronoun; met before as "what" (qu-est-ce-que-fr, 2024-04-24-reading-6) (written: qu-est-ce-que-fr) (fixed by hand)

**2024-03-22-inversion-questions**

- `vocabulary[6]` "Comment nage une tortue?": same meaning as "How does a turtle swim?" in 2024-03-20-comment-complex: kept comment-nage-une-tortue-fr

**2024-03-23-embedded-questions**

- `vocabulary[1]` "je ne sais pas": same meaning as "I don't know" in 2024-05-08-savoir: kept je-ne-sais-pas-fr

**2024-04-01-alphabet**

- `vocabulary[0]` "a": a-fr already names "à", a different spelling: a-fr.a
- `vocabulary[11]` "l": l-fr already names "l'", a different spelling: l-fr.l

**2024-04-02-numbers**

- `vocabulary[0]` "zéro": same meaning as "zero" in 2026-11-24-numbers: kept zero-fr
- `vocabulary[1]` "un": same meaning as "one" in 2026-11-24-numbers: kept un-fr.one
- `vocabulary[2]` "deux": same meaning as "two" in 2026-11-24-numbers: kept deux-fr
- `vocabulary[3]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[4]` "quatre": same meaning as "four" in 2026-11-24-numbers: kept quatre-fr
- `vocabulary[5]` "cinq": same meaning as "five" in 2026-11-24-numbers: kept cinq-fr
- `vocabulary[6]` "six": same meaning as "six" in 2026-11-24-numbers: kept six-fr
- `vocabulary[7]` "sept": same meaning as "seven" in 2026-11-24-numbers: kept sept-fr
- `vocabulary[8]` "huit": same meaning as "eight" in 2026-11-24-numbers: kept huit-fr
- `vocabulary[9]` "neuf": same meaning as "nine" in 2026-11-24-numbers: kept neuf-fr
- `vocabulary[10]` "dix": same meaning as "ten" in 2026-11-24-numbers: kept dix-fr
- `vocabulary[11]` "vingt": same meaning as "twenty" in 2026-11-24-numbers: kept vingt-fr
- `vocabulary[12]` "vingt-et-un": vingt-et-un-fr already names "vingt et un", a different spelling: vingt-et-un-fr.twenty-one
- `vocabulary[13]` "vingt-deux": same meaning as "twenty-two" in 2026-11-24-numbers: kept vingt-deux-fr
- `vocabulary[14]` "trente": same meaning as "thirty" in 2026-11-24-numbers: kept trente-fr
- `vocabulary[17]` "quarante": same meaning as "forty" in 2026-11-24-numbers: kept quarante-fr
- `vocabulary[19]` "cinquante": same meaning as "fifty" in 2026-11-24-numbers: kept cinquante-fr
- `vocabulary[21]` "soixante": same meaning as "sixty" in 2026-11-24-numbers: kept soixante-fr
- `vocabulary[24]` "soixante-dix": same meaning as "seventy" in 2026-11-24-numbers: kept soixante-dix-fr
- `vocabulary[25]` "soixante-et-onze": soixante-et-onze-fr already names "soixante et onze", a different spelling: soixante-et-onze-fr.seventy-one
- `vocabulary[28]` "quatre-vingts": same meaning as "eighty" in 2026-11-24-numbers: kept quatre-vingts-fr
- `vocabulary[29]` "quatre-vingt-un": same meaning as "eighty-one" in 2026-11-24-numbers: kept quatre-vingt-un-fr
- `vocabulary[30]` "quatre-vingt-dix": same meaning as "ninety" in 2026-11-24-numbers: kept quatre-vingt-dix-fr
- `vocabulary[33]` "cent": same meaning as "one hundred" in 2026-11-24-numbers: kept cent-fr

**2024-04-03-days-months**

- `vocabulary[5]` "samedi": same meaning as "Saturday" in 2024-06-05-reading-9: kept samedi-fr
- `vocabulary[23]` "aujourd'hui": same meaning as "today" in 2024-02-03-reading3: kept aujourd-hui-fr
- `vocabulary[24]` "demain": same meaning as "tomorrow" in 2024-04-01-time-adverbs: kept demain-fr
- `vocabulary[25]` "hier": same meaning as "yesterday" in 2024-04-01-time-adverbs: kept hier-fr
- `vocabulary[27]` "le week-end": same meaning as "the weekend" in 2024-06-05-reading-9: kept le-week-end-fr

**2024-04-05-colors**

- `vocabulary[29]` "un arbre": same meaning as "a tree" in 2024-03-15-nature-animals: kept un-arbre-fr
- `vocabulary[30]` "une fleur": same meaning as "a flower" in 2024-03-15-nature-animals: kept une-fleur-fr

**2024-04-06-french-countries**

- `vocabulary[5]` "parler français": same meaning as "to speak French" in 2024-04-24-reading-6: kept parler-francais-fr

**2024-04-07-language-stats**

- `vocabulary[1]` "une voyelle": same meaning as "a vowel" in 2024-04-01-alphabet: kept une-voyelle-fr
- `vocabulary[2]` "une consonne": same meaning as "a consonant" in 2024-04-01-alphabet: kept une-consonne-fr
- `vocabulary[4]` "un accent": same meaning as "an accent" in 2024-04-01-alphabet: kept un-accent-fr
- `vocabulary[18]` "francophone": same meaning as "French-speaking" in 2024-04-06-french-countries: kept francophone-fr

**2024-12-18-pronunciation-test**

- `vocabulary[0]` "bonjour": same meaning as "hello / good day" in 2024-01-01-famous-words: kept bonjour-fr
- `vocabulary[1]` "merci": same meaning as "thank you" in 2024-01-01-famous-words: kept merci-fr
- `vocabulary[2]` "au revoir": same meaning as "goodbye" in 2024-01-01-famous-words: kept au-revoir-fr
- `vocabulary[3]` "oui": same meaning as "yes" in 2024-01-01-famous-words: kept oui-fr
- `vocabulary[4]` "non": same meaning as "no" in 2024-01-01-famous-words: kept non-fr
- `vocabulary[5]` "s'il vous plaît": same meaning as "please" in 2024-01-01-famous-words: kept s-il-vous-plait-fr
- `vocabulary[6]` "rouge": same meaning as "red" in 2024-04-05-colors: kept rouge-fr
- `vocabulary[7]` "trois": same meaning as "three" in 2026-11-24-numbers: kept trois-fr
- `vocabulary[9]` "bon": same meaning as "good" in 2024-01-01-famous-words: kept bon-fr
- `vocabulary[11]` "un": same meaning as "one" in 2026-11-24-numbers: kept un-fr.one
- `vocabulary[13]` "je suis": same meaning as "I am" in 2024-01-02-etre: kept je-suis-fr
- `vocabulary[14]` "tu es": same meaning as "you are (informal)" in 2024-01-02-etre: kept tu-es-fr
- `vocabulary[15]` "il est": same meaning as "he is" in 2024-01-02-etre: kept il-est-fr
- `vocabulary[16]` "tu": same meaning as "you (informal)" in 2024-01-01-pronouns: kept tu-fr
- `vocabulary[18]` "plus": same meaning as "more" in 2024-04-08-comparisons: kept plus-fr
- `vocabulary[19]` "comment": same meaning as "how" in 2024-01-18-questions: kept comment-fr
- `vocabulary[20]` "très bien": new meaning "very good": tres-bien-fr.very-good; met before as "very well" (tres-bien-fr, 2024-04-24-reading-6)
- `vocabulary[21]` "peut-être": same meaning as "maybe" in 2024-04-13-reading-5: kept peut-etre-fr
- `vocabulary[22]` "beaucoup": same meaning as "a lot / very much" in 2024-03-31-survival-phrases: kept beaucoup-fr
- `vocabulary[24]` "nuit": same meaning as "night" in 2024-02-01-reading-10: kept nuit-fr

## Item types to confirm

The classifier had no clear rule for these items, so the type is its best guess.

**2024-01-12-demonstratives**

- `items[0]` i-ca: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-15-vouloir**

- `items[8]` i-je-veux-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-nous-voulons-ce-livre: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-je-veux-etre-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-je-veux-avoir-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-elle-veut-avoir-une: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-ca-s: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-16-pouvoir**

- `items[0]` i-je-peux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-peux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-peut: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-peut: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-pouvons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-pouvez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-peuvent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-peuvent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-peux-avoir-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-il-peut-avoir-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-nous-pouvons-avoir-une: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-je-peux-etre-un: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-elle-peut-etre-artiste: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-avoir-ca-2: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-18-questions**

- `items[10]` i-est-ce-que-tu: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-01-25-contractions**

- `items[0]` i-du-chat: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[1]` i-de-la-maison: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[2]` i-des-livres: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[3]` i-de-l-ami: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[4]` i-au-cafe: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[5]` i-a-la-maison: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[6]` i-aux-amis: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-01-26-venir**

- `items[0]` i-je-viens: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-viens: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-vient: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-vient: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-venons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-venez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-viennent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-viennent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-viens-avec-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-je-viens-de-chez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-vient-avec-son: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-venons-avec-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-qui-vient: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-d-ou-viens-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-avec-quoi-viens-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-veux-venir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-veux-tu-venir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-je-veux-venir-avec: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-peux-tu-venir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-je-peux-venir-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[20]` i-je-viens-te-voir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[21]` i-pourquoi-viens-tu-me: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-27-aller**

- `items[0]` i-je-vais: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-vas: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-va: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-va: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-allons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-allez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-vont: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-vont: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-vais-avec-eux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-tu-vas-avec-quoi: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-va-avec-moi: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-allons-avec-ma: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-qui-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-aller-avec: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-peux-tu-aller: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-aller-avec: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-vais-etre-bon: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-vais-avoir-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)

**2024-01-31-possessive-adjectives**

- `items[0]` i-mon: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[1]` i-ma: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[2]` i-mes: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[3]` i-ton: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[4]` i-ta: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[5]` i-tes: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[6]` i-son: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[7]` i-sa: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[8]` i-ses: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[9]` i-notre: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[10]` i-nos: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[11]` i-votre: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[12]` i-vos: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[13]` i-leur: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[14]` i-leurs: classifier: other (prompt has a gap); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-02-02-combining**

- `items[1]` i-elle-l-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-ils-les-ont: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-c-est-le-sien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-c-est-le-leur: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-est-ce-le-tien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-est-ce-le-sien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-est-ce-la-sienne: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-je-le-veux: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[10]` i-tu-viens-avec-moi: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[11]` i-il-va-partir: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)

**2024-03-31-survival-phrases**

- `items[2]` i-c-est-combien-le: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-ou-est-le-cafe: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-ou-sont-les-toilettes: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-03-25-faire**

- `items[0]` i-je-fais: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-fais: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-fait: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-fait: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-faisons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-faites: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-font: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-font: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-fais-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-fait-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-faisons-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-que-veux-tu-faire: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-veux-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-peux-tu-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-je-peux-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-vais-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-nous-lui-faisons-voir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-qu-est-ce-que-3: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-03-23-devoir**

- `items[0]` i-je-dois: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-tu-dois: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-il-doit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-doit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-nous-devons: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-vous-devez: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-ils-doivent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-elles-doivent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-dois-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-il-doit-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[11]` i-nous-devons-faire-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-pourquoi-dois-tu-aller: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-nous-devons-aller-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[14]` i-il-doit-partir-maintenant: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-quand-dois-tu-partir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-ils-doivent-l-avoir: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[17]` i-qu-est-ce-que-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-dois-etre-bon: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-qu-est-ce-que-3: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-03-28-negation**

- `items[0]` i-je-ne-suis-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[1]` i-je-n-ai-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[2]` i-tu-n-es-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[3]` i-il-n-a-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[4]` i-je-ne-veux-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[5]` i-tu-ne-vas-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[6]` i-nous-n-avons-pas: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)
- `items[9]` i-je-ne-le-vois: classifier: other (transformation or comprehension); English or mixed prompt, written as respond (instruction as situation, prompt as cue)

**2024-02-07-wish-phrases**

- `items[1]` i-je-veux-qu-il: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-j-aimerais-que-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-veux-qu-elle: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-25-emotion-phrases**

- `items[1]` i-je-suis-triste-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-j-ai-peur-qu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-suis-desole-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-suis-surpris-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-regrette-que-tu: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-29-opinion-phrases**

- `items[0]` i-je-pense-qu-il: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-je-ne-pense-pas: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-je-doute-qu-elle: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-ne-crois-pas: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-ne-pense-pas-2: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-doute-que-ce: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-27-hypothetical-phrases**

- `items[3]` i-si-tu-etais-ici: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-26-had-already-phrases**

- `items[0]` i-j-avais-deja-mange: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-j-etais-deja-parti: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-elle-etait-deja-partie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-j-avais-deja-vu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-il-avait-deja-commence: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-nous-avions-deja-fini: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-01-22-common-adverbs**

- `items[2]` i-parler-lentement: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-comprendre-facilement: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-completement-fini: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-probablement: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-02-02-service-phrases**

- `items[0]` i-je-me-fais-couper: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[1]` i-je-fais-reparer-ma: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-je-me-fais-maquiller: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-fais-nettoyer-la: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-me-fais-examiner: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-fais-construire-une: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-02-08-age-personal-info**

- `items[1]` i-quel-age-as-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-quel-age-avez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-elle-a-dix-huit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-suis-ne-en: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-suis-nee-en: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-je-suis-ne-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-je-m-appelle-sophie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-en-quelle-annee-etes: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-j-ai-trente-ans: classifier: translate (English prompt with a French answer); written as respond (framed)

**2024-02-15-unit-11-exam**

- `items[1]` i-quel-age-avez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[2]` i-quel-age-as-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[3]` i-je-suis-ne-en: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[4]` i-je-suis-nee-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[5]` i-je-m-appelle-sophie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[6]` i-je-donne: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[7]` i-ils-donnent: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[8]` i-je-te-donne-le: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[9]` i-tu-peux-me-donner: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[10]` i-donner-rendez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[12]` i-tu-dors-bien: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[13]` i-je-dors-huit-heures: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[15]` i-ou-travaillez-vous: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[16]` i-je-travaille-dur: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[18]` i-je-vis-a-bordeaux: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[19]` i-vivre-sa-vie: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[20]` i-je-cherche-ma-voiture: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[21]` i-j-ai-trouve: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[22]` i-comment-tu-trouves-ca: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[23]` i-je-trouve-que-c: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[24]` i-j-ecoute-de-la: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[25]` i-nous-regardons-des-films: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[26]` i-qu-est-ce-que: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[27]` i-ecoute-le-professeur: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[28]` i-j-attends-mon-ami: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[29]` i-a-quelle-heure-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[30]` i-le-train-arrive-a: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[31]` i-je-reste-trois-jours: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[32]` i-combien-de-temps-tu: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[33]` i-j-attends-tu-arrives: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[34]` i-tournez-a-gauche: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[35]` i-tournez-a-droite: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[36]` i-allez-tout-droit: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[37]` i-ou-est-le-musee: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[38]` i-c-est-loin: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[39]` i-excusez-moi-ou-est: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[40]` i-c-est-a-cinq: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[41]` i-allez-tout-droit-puis: classifier: translate (English prompt with a French answer); written as respond (framed)
- `items[42]` i-la-france-a-soixante: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[43]` i-les-touristes-cherchent-des: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[44]` i-les-artistes-francais-vivent: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)
- `items[45]` i-la-france-moderne-combine: classifier: translate (English prompt with a French answer); written as respond (framed) (fixed by hand)

## Practice blanks that were in the wrong place

The practice screen shows a blank in place of the character at its position, so these blanks cut a word, dropped a mark or sat after the full stop. Each is placed where the language-graph checker reads it.

**2024-01-10-unit1-practice**

- `items[10]` i-mais-aussi: the blank for "aussi" at position 47 sits on the mark ".", which the app drops; placed as the checker reads it: "Nous sommes des enfants ___ nous avons des chiens ___."

**2024-01-23-unit2-practice**

- `items[6]` i-moi: the blank for "moi" at position 12 sits on the mark ".", which the app drops; placed as the checker reads it: "Il est avec ___."
- `items[11]` i-sous-voiture: the blank for "voiture" at position 18 sits on the mark ".", which the app drops; placed as the checker reads it: "Le chien est ___ la ___."

**2024-04-03-unit-4-practice**

- `items[6]` i-demain: the blank for "demain" at position 8 sits on the mark ".", which the app drops; placed as the checker reads it: "Il part ___."
- `items[7]` i-hier: the blank for "hier" at position 13 sits after the end of the sentence; placed as the checker reads it: "Tu as vu ça ___." (fixed by hand)
- `items[8]` i-ici: the blank for "ici" at position 8 sits on the mark ".", which the app drops; placed as the checker reads it: "Je suis ___."
- `items[9]` i-la: the blank for "là" at position 13 sits on the mark ".", which the app drops; placed as the checker reads it: "Le livre est ___."
- `items[14]` i-parlons-ici: the blank for "ici" at position 22 sits after the end of the sentence; placed as the checker reads it: "Nous ___ français ___."
- `items[18]` i-fais-demain: the blank for "demain" at position 17 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ___ mon travail ___."
- `items[19]` i-n-pas-ici: the blank for "ici" at position 23 sits on the mark ".", which the app drops; placed as the checker reads it: "Nous ___avons ___ l'argent ___."

**2024-04-15-unit-5-practice**

- `items[27]` i-baguette: the blank for "baguette" at position 12 sits on the mark ".", which the app drops; placed as the checker reads it: "Je veux une ___."
- `items[28]` i-express: the blank for "express" at position 15 sits on the mark ",", which the app drops; placed as the checker reads it: "Je voudrais un ___, s'il vous plaît."
- `items[29]` i-genial: the blank for "génial" at position 6 sits on the mark "!", which the app drops; placed as the checker reads it: "C'est ___!"
- `items[30]` i-top: the blank for "top" at position 18 sits on the mark "!", which the app drops; placed as the checker reads it: "Ce restaurant est ___!"
- `items[31]` i-devrions-au: the blank for "au" at position 15 sits inside the word "restaurant"; placed as the checker reads it: "Nous ___ aller ___ restaurant."
- `items[32]` i-avais-manger: the blank for "manger" at position 25 sits inside the word "maintenant"; placed as the checker reads it: "J'___ faim et je veux ___ maintenant."

**2024-04-27-unit-6-practice**

- `items[28]` i-besoin-2: the blank for "besoin" at position 7 sits inside the word "de"; placed as the checker reads it: "Tu as ___ de partir."
- `items[35]` i-question: the blank for "question" at position 9 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai une ___."
- `items[36]` i-fois: the blank for "fois" at position 19 sits after the end of the sentence; placed as the checker reads it: "C'est la première ___."
- `items[38]` i-moment: the blank for "moment" at position 6 sits on the mark ",", which the app drops; placed as the checker reads it: "En ce ___, je suis occupé."
- `items[40]` i-ville: the blank for "ville" at position 20 sits on the mark ".", which the app drops; placed as the checker reads it: "Paris est une belle ___."
- `items[44]` i-prendre: the blank for "prendre" at position 28 sits inside the word "train"; placed as the checker reads it: "Nous sommes en train de ___ le train."

**2024-05-11-unit-7-practice**

- `items[6]` i-comprends-2: the blank for "comprends" at position 3 sits on the mark "?", which the app drops; placed as the checker reads it: "Tu ___?"
- `items[12]` i-penses: the blank for "penses" at position 17 sits on the mark "?", which the app drops; placed as the checker reads it: "Qu'est-ce que tu ___?"
- `items[15]` i-sais-connais: the blank for "connais" at position 29 sits inside the word "pas"; placed as the checker reads it: "Je ___ la réponse mais je ne ___ pas Paris."
- `items[17]` i-en-fait: the blank for "en fait" at position 0 sits on the mark ",", which the app drops; placed as the checker reads it: "___, je ne sais pas."
- `items[18]` i-question: the blank for "question" at position 9 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai une ___."
- `items[19]` i-idee: the blank for "idée" at position 16 sits on the mark ".", which the app drops; placed as the checker reads it: "C'est une bonne ___."
- `items[22]` i-mal: the blank for "mal" at position 14 sits after the end of the sentence; placed as the checker reads it: "Je comprends ___."
- `items[23]` i-on-pense-apprendre: the blank for "apprendre" at position 32 sits after the end of the sentence; placed as the checker reads it: "___ que tout le monde peut ___."

**2024-05-25-unit-8-practice**

- `items[0]` i-d-abord-ensuite: the blank for "d'abord" at position 0 sits on the mark ",", which the app drops; placed as the checker reads it: "___, je mange., ___ je pars." (fixed by hand)
- `items[0]` i-d-abord-ensuite: the blank for "ensuite" at position 14 sits inside the word "je"; placed as the checker reads it: "___, je mange., ___ je pars." (fixed by hand)
- `items[4]` i-t-appelles: the blank for "t'appelles" at position 11 sits on the mark "?", which the app drops; placed as the checker reads it: "Comment tu ___?"
- `items[6]` i-me-leve: the blank for "me lève" at position 13 sits after the end of the sentence; placed as the checker reads it: "Ensuite, je ___."
- `items[7]` i-me-lave: the blank for "me lave" at position 3 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ___."
- `items[17]` i-ecoute: the blank for "écoute" at position 0 sits on the mark "!", which the app drops; placed as the checker reads it: "___!"
- `items[20]` i-apres-m-habille-me: the blank for "m'habille" at position 29 sits after the end of the sentence; placed as the checker reads it: "___ le café, je ___ et ___ je." (fixed by hand)

**2024-06-10-unit-9-practice**

- `items[18]` i-comme-sommes-restes: the blank for "sommes restés" at position 25 sits inside the word "maison"; placed as the checker reads it: "___ il pleuvait, nous ___ à la maison." (fixed by hand)

**2024-02-05-unit-10-practice**

- `items[5]` i-parte: the blank for "parte" at position 16 sits on the mark ".", which the app drops; placed as the checker reads it: "J'ai peur qu'il ___."
- `items[7]` i-voyagerais: the blank for "voyagerais" at position 33 sits inside the word "plus"; placed as the checker reads it: "Si j'avais plus de temps, je ___ plus."
- `items[10]` i-vient: the blank for "vient" at position 15 sits on the mark ".", which the app drops; placed as the checker reads it: "Je pense qu'il ___."
- `items[11]` i-vienne: the blank for "vienne" at position 22 sits on the mark ".", which the app drops; placed as the checker reads it: "Je ne pense pas qu'il ___."
- `items[17]` i-couper: the blank for "couper" at position 12 sits inside the word "les"; placed as the checker reads it: "Je me fais ___ les cheveux demain."

**2024-02-16-unit-11-practice**

- `items[5]` i-travaillez: the blank for "travaillez" at position 3 sits on the mark "-", which the app drops; placed as the checker reads it: "Où ___-vous?"
- `items[8]` i-trouve: the blank for "trouvé" at position 5 sits on the mark "!", which the app drops; placed as the checker reads it: "J'ai ___! Elles étaient dans ma voiture."
- `items[14]` i-a-gauche: the blank for "à gauche" at position 8 sits on the mark ",", which the app drops; placed as the checker reads it: "Tournez ___, puis allez tout droit."
- `items[16]` i-ou-un: the blank for "un" at position 37 sits inside the word "rendez"; placed as the checker reads it: "Excusez-moi, ___ est la gare? J'ai ___ rendez-vous là-bas à trois heures."
- `items[17]` i-attends-arrivent: the blank for "arrivent" at position 40 sits inside the word "vers"; placed as the checker reads it: "Je ___ mes amis au café. Ils ___ généralement vers huit heures."
- `items[18]` i-evolue-vivent: the blank for "vivent" at position 41 sits inside the word "dans"; placed as the checker reads it: "La France ___ rapidement. Ses habitants ___ dans des villes modernes."
- `items[19]` i-j-ai-vis-travaille: the blank for "vis" at position 42 sits inside the word "Lyon"; placed as the checker reads it: "Je m'appelle Marie, ___ trente ans, et je ___ à Lyon où je ___ comme professeur."
- `items[19]` i-j-ai-vis-travaille: the blank for "travaille" at position 57 sits inside the word "comme"; placed as the checker reads it: "Je m'appelle Marie, ___ trente ans, et je ___ à Lyon où je ___ comme professeur."

## Position words

Learner text that names a module, unit or reading by number. The source says it this way; the module file names the subject instead, and each line fixed so says "fixed by hand".

**2024-01-06-basic-nouns**

- `concepts[1].definition` "Combine nouns with verbs you already know from M2-M3" (fixed by hand)
- `items[0].hint` "Combine avoir (M3) + article (M4) + noun - all previous modules!" (fixed by hand)

**2024-01-07-plurals**

- `concepts[2].definition` "Every exercise combines plurals with verbs from M2-M3" (fixed by hand)

**2024-01-10-unit1-practice**

- `title` "Unit 1 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using everything you've learned in Unit 1. Fill in the blanks to create correct French sentences!" (fixed by hand)
- `can_do[2]` "Apply everything from Unit 1 in context" (fixed by hand)

**2024-01-13-ca-survival**

- `items[1].hint` "Combine: it is + that (using être from M3)" (fixed by hand)

**2024-01-22-reading2**

- `title` "Reading Comprehension 2 - Rendez-vous en Normandie" (fixed by hand)
- `description` "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2." (fixed by hand)

**2024-01-23-unit2-practice**

- `title` "Unit 2 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!" (fixed by hand)
- `can_do[2]` "Apply Unit 2 vocabulary in realistic contexts" (fixed by hand)

**2024-01-24-unit2-exam**

- `description` "Test everything from Unit 2! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences." (fixed by hand)

**2024-02-02-combining**

- `items[9].hint` "Combine vouloir from M12 + object pronoun BEFORE verb" (fixed by hand)
- `items[10].hint` "Combine venir (M17) + avec (M14) + moi" (fixed by hand)
- `items[11].hint` "Combine aller (M18) + partir infinitive (M19) - future construction!" (fixed by hand)

**2024-02-03-reading3**

- `title` "Reading Comprehension 3 - La Première Page" (fixed by hand)

**2024-02-04-unit3-practice**

- `title` "Unit 3 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Master contractions, motion verbs, object pronouns, and possessive forms from Unit 3!" (fixed by hand)
- `can_do[2]` "Apply Unit 3 advanced structures in context" (fixed by hand)

**2024-02-05-unit3-exam**

- `description` "Test everything from Unit 3! Motion verbs, object pronouns, possessives, and complex sentence combinations." (fixed by hand)

**2024-03-30-reading-4**

- `title` "Reading Comprehension 4 - La nouvelle époque de Marie" (fixed by hand)
- `description` "Unit 4 mastery! A natural conversation using all your vocabulary." (fixed by hand)

**2024-04-03-unit-4-practice**

- `title` "Unit 4 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Practice survival phrases, negation, time/location adverbs, and essential verbs from Unit 4!" (fixed by hand)

**2024-04-02-unit-4-exam**

- `description` "Test everything from Unit 4! Survival phrases, essential verbs, negation, and expressing time and place." (fixed by hand)

**2024-04-13-reading-5**

- `title` "Reading Comprehension 5 - La fée verte (The Green Fairy)" (fixed by hand)
- `description` "Unit 5 mastery! A story about Vincent van Gogh painting his famous 'Café Terrace at Night' in Arles with Paul Gauguin." (fixed by hand)
- `vocabulary[15].note` "Unit 5 verb" (fixed by hand)
- `vocabulary[16].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[17].note` "Unit 5 verb" (fixed by hand)
- `vocabulary[18].note` "Unit 2 verb" (fixed by hand)
- `vocabulary[19].note` "Unit 3 verb" (fixed by hand)
- `vocabulary[20].note` "Unit 3 verb" (fixed by hand)
- `vocabulary[21].note` "Unit 3 verb" (fixed by hand)
- `vocabulary[22].note` "Unit 2 verb" (fixed by hand)
- `vocabulary[23].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[24].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[25].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[26].note` "Unit 4 verb" (fixed by hand)
- `vocabulary[37].note` "Unit 4 - polite expression" (fixed by hand)

**2024-04-15-unit-5-practice**

- `title` "Unit 5 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from Unit 5!" (fixed by hand)
- `can_do[2]` "Apply Unit 5 sophistication in context" (fixed by hand)

**2024-04-14-unit-5-exam**

- `description` "Test everything from Unit 5! Comparisons, slang, past tense, conditionals, and food vocabulary." (fixed by hand)

**2024-04-24-reading-6**

- `title` "Reading Comprehension 6 - Un Voyage en Famille" (fixed by hand)
- `description` "A family plans a trip to Paris. Uses Unit 6 vocabulary: progressive tenses, dire, prendre, mettre, demander, commander, besoin." (fixed by hand)
- `vocabulary[9].note` "Unit 5 verb" (fixed by hand)
- `vocabulary[29].note` "feminine; from Unit 4 everyday-nouns" (fixed by hand)
- `vocabulary[38].note` "from Unit 6 mettre module" (fixed by hand)
- `vocabulary[39].note` "from Unit 1" (fixed by hand)
- `vocabulary[48].note` "from Unit 5 food-nouns" (fixed by hand)
- `vocabulary[49].note` "from Unit 5 food-nouns" (fixed by hand)
- `vocabulary[51].note` "Unit 4 time-adverbs" (fixed by hand)
- `vocabulary[53].note` "Unit 3 voir module" (fixed by hand)
- `vocabulary[55].note` "from Unit 5 comparisons" (fixed by hand)
- `vocabulary[56].note` "time expression with Unit 6 moment" (fixed by hand)
- `vocabulary[57].note` "Unit 4 faire module" (fixed by hand)
- `vocabulary[58].note` "plural adjective from Unit 2" (fixed by hand)
- `vocabulary[60].note` "from Unit 4 parler" (fixed by hand)
- `vocabulary[65].note` "from Unit 4 parler" (fixed by hand)
- `vocabulary[67].note` "from Unit 1 famous-words" (fixed by hand)
- `vocabulary[68].note` "bon from Unit 2 adjectives" (fixed by hand)
- `vocabulary[69].note` "Unit 4 time-adverbs" (fixed by hand)
- `vocabulary[70].note` "Unit 1 avoir module" (fixed by hand)
- `vocabulary[71].note` "from Unit 2 adjectives (beau)" (fixed by hand)
- `vocabulary[72].note` "superlative from Unit 5" (fixed by hand)
- `vocabulary[74].note` "Unit 2 prepositions" (fixed by hand)

**2024-04-27-unit-6-practice**

- `title` "Unit 6 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using progressive tenses, communication verbs, and essential vocabulary from Unit 6!" (fixed by hand)
- `can_do[2]` "Apply advanced Unit 6 structures in context" (fixed by hand)

**2024-04-26-unit-6-exam**

- `description` "Test everything from Unit 6! Progressive tenses, future forms, communication verbs, and essential vocabulary." (fixed by hand)

**2024-05-07-reading-7**

- `title` "Reading 7 - L'Art d'Apprendre" (fixed by hand)
- `description` "A philosophical article about learning and education. Uses all cognitive verbs from Unit 7!" (fixed by hand)
- `vocabulary[0].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[2].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[5].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[9].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[12].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[14].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[18].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[20].note` "Unit 7 verb" (fixed by hand)
- `vocabulary[23].note` "Unit 6 verb" (fixed by hand)
- `vocabulary[25].note` "Unit 6 verb" (fixed by hand)
- `vocabulary[55].note` "Unit 6 verb" (fixed by hand)

**2024-05-11-unit-7-practice**

- `title` "Unit 7 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from Unit 7!" (fixed by hand)

**2024-05-10-unit-7-exam**

- `description` "Test everything from Unit 7! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers." (fixed by hand)

**2024-05-22-s-appeler**

- `concepts[1].term` "This should've been in Unit 1!" (fixed by hand)

**2024-05-20-reading-8**

- `title` "Reading 8 - Ma Journée" (fixed by hand)
- `description` "A story about a typical day. Uses temporal words, reflexive verbs, and all Unit 8 vocabulary!" (fixed by hand)

**2024-05-25-unit-8-practice**

- `title` "Unit 8 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using temporal words, reflexive verbs, and commands from Unit 8!" (fixed by hand)

**2024-05-24-unit-8-exam**

- `description` "Test everything from Unit 8! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions." (fixed by hand)

**2024-06-05-reading-9**

- `title` "Reading 9 - Une Histoire du Passé" (fixed by hand)
- `description` "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of Unit 9" (fixed by hand)

**2024-06-10-unit-9-practice**

- `title` "Unit 9 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using causal words, spatial prepositions, and past tenses from Unit 9!" (fixed by hand)

**2024-06-09-unit-9-exam**

- `description` "Test everything from Unit 9! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery." (fixed by hand)

**2024-02-01-reading-10**

- `title` "Reading 10 - Mes Rêves et Mes Espoirs" (fixed by hand)
- `description` "A story about dreams and ambitions using Unit 10's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more" (fixed by hand)

**2024-02-05-unit-10-practice**

- `title` "Unit 10 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using Unit 10's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!" (fixed by hand)

**2024-02-04-unit-10-exam**

- `description` "Test everything from Unit 10! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions." (fixed by hand)
- `items[36].hint` "Marc's wisdom from Reading 10: 'If we don't do anything, we'll never _____'"
- `items[37].instruction` "From Reading 10: What did Sophie want about her life?" (fixed by hand)
- `items[38].instruction` "From Reading 10: What had Sophie already done before talking to Marc?" (fixed by hand)

**2024-02-08-age-personal-info**

- `description` "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information. Finally complete what should have been in Unit 1!" (fixed by hand)

**2024-02-12-reading-11**

- `title` "Reading 11 - La France Moderne" (fixed by hand)

**2024-02-16-unit-11-practice**

- `title` "Unit 11 Practice - Fill in the Blanks" (fixed by hand)
- `description` "Complete sentences using Unit 11's essential vocabulary: age expressions, missing top 100 verbs, and directions!" (fixed by hand)

**2024-02-15-unit-11-exam**

- `description` "Final test for Unit 11! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!" (fixed by hand)
- `items[42].situation` "From Reading 11: France's population" (fixed by hand)
- `items[43].situation` "From Reading 11: What tourists look for" (fixed by hand)
- `items[44].situation` "From Reading 11: Where artists live" (fixed by hand)
- `items[45].situation` "From Reading 11: Modern France combines what?" (fixed by hand)

**2024-03-19-pourquoi-complex**

- `concepts[0].definition` "You already know pourquoi - now compose it with EVERYTHING from Units 1-11!" (fixed by hand)

**2024-03-25-multi-clause-questions**

- `concepts[0].term` "Questions + Unit 10 Structures" (fixed by hand)
- `concepts[0].definition` "Combine question words with all the sophisticated structures from Unit 10" (fixed by hand)

## Exercises rewritten as Jake ruled

No conversion of today’s text fits these, so each is written as Jake ruled, in its place.

**2024-05-10-unit-7-exam**

- `items[18]` i-for-facts-and-skills: Jake, 2026-11-25: "When do you use savoir?" as a choice item (its English answers fit no typed item)
- `items[23]` i-for-people-places-and: Jake, 2026-11-25: "When do you use connaître?" as a choice item (its English answers fit no typed item)

## English prompts written as respond items

An English prompt framed by its instruction ("Say 'you would do it' (informal)") or by a context note ("I know Marie (person)") is a respond item, with the whole frame as the situation, since the context does the teaching (Jake, 2026-11-25). A bare English sentence is a translate item; outside Unit 1 each is a checker warning, rewritten over time.

**2024-01-01-famous-words**

- 13 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`

**2024-01-01-pronouns**

- 9 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`

**2024-01-05-articles**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-06-basic-nouns**

- 6 × framed by its instruction: `items[1]`, `items[2]`, `items[4]`, `items[7]`, `items[8]`, `items[10]`
- 2 × framed by a context note: `items[6]`, `items[12]`

**2024-01-07-plurals**

- 3 × framed by a context note: `items[1]`, `items[3]`, `items[6]`

**2024-01-08-connectors**

- 3 × framed by its instruction: `items[4]`, `items[6]`, `items[8]`

**2024-01-11-unit1-exam**

- 5 × framed by a context note: `items[1]`, `items[3]`, `items[6]`, `items[15]`, `items[21]`

**2024-01-12-demonstratives**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`

**2024-01-13-ca-survival**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-14-determiners-nouns**

- 3 × framed by a context note: `items[3]`, `items[4]`, `items[8]`

**2024-01-15-vouloir**

- 6 × framed by its instruction: `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`

**2024-01-16-pouvoir**

- 14 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[15]`

**2024-01-18-questions**

- 18 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`

**2024-01-19-stressed-pronouns**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[9]`, `items[11]`

**2024-01-20-prepositions**

- 8 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[9]`

**2024-01-21-adjectives**

- 3 × framed by a context note: `items[4]`, `items[8]`, `items[15]`

**2024-01-24-unit2-exam**

- 11 × framed by a context note: `items[11]`, `items[12]`, `items[13]`, `items[15]`, `items[18]`, `items[19]`, `items[20]`, `items[22]`, `items[27]`, `items[31]`, `items[32]`

**2024-01-26-venir**

- 22 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`, `items[20]`, `items[21]`

**2024-01-27-aller**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-02-01-possessive-pronouns**

- 12 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`

**2024-02-02-combining**

- 12 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`

**2024-02-05-unit3-exam**

- 18 × framed by a context note: `items[0]`, `items[1]`, `items[2]`, `items[4]`, `items[7]`, `items[8]`, `items[9]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`, `items[23]`, `items[25]`

**2024-03-31-survival-phrases**

- 14 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`

**2024-03-25-faire**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-03-23-devoir**

- 20 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-10-22-search-find**

- 7 × framed by its instruction: `items[0]`, `items[2]`, `items[3]`, `items[6]`, `items[7]`, `items[12]`, `items[13]`

**2024-03-28-negation**

- 3 × framed by its instruction: `items[10]`, `items[11]`, `items[15]`

**2024-04-01-time-adverbs**

- 1 × framed by its instruction: `items[6]`

**2024-03-27-negation-2**

- 8 × framed by its instruction: `items[1]`, `items[2]`, `items[4]`, `items[6]`, `items[9]`, `items[11]`, `items[12]`, `items[15]`

**2024-03-26-location-adverbs**

- 3 × framed by its instruction: `items[2]`, `items[5]`, `items[10]`

**2024-03-24-everyday-nouns**

- 2 × framed by its instruction: `items[5]`, `items[22]`

**2024-04-02-unit-4-exam**

- 1 × framed by its instruction: `items[0]`
- 6 × framed by a context note: `items[1]`, `items[6]`, `items[8]`, `items[10]`, `items[14]`, `items[40]`

**2024-04-08-comparisons**

- 8 × framed by its instruction: `items[0]`, `items[1]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[12]`

**2024-04-07-comparisons-slang**

- 19 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`

**2024-04-09-conditionals**

- 7 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[14]`, `items[15]`, `items[19]`

**2024-04-16-would-conditionals**

- 7 × framed by its instruction: `items[0]`, `items[1]`, `items[4]`, `items[7]`, `items[10]`, `items[13]`, `items[16]`

**2024-04-04-aimer**

- 10 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[13]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-04-10-etre-past**

- 5 × framed by its instruction: `items[2]`, `items[3]`, `items[10]`, `items[11]`, `items[15]`

**2024-04-05-avoir-past**

- 11 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[12]`, `items[13]`, `items[15]`, `items[16]`, `items[17]`, `items[18]`, `items[19]`

**2024-04-11-food-nouns**

- 3 × framed by its instruction: `items[2]`, `items[6]`, `items[23]`

**2024-04-12-manger**

- 12 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[12]`, `items[13]`, `items[14]`, `items[17]`, `items[18]`, `items[20]`, `items[23]`, `items[25]`

**2024-04-06-boire**

- 13 × framed by its instruction: `items[2]`, `items[3]`, `items[8]`, `items[9]`, `items[12]`, `items[13]`, `items[14]`, `items[17]`, `items[18]`, `items[20]`, `items[24]`, `items[26]`, `items[27]`

**2024-04-14-unit-5-exam**

- 12 × framed by a context note: `items[2]`, `items[3]`, `items[12]`, `items[15]`, `items[20]`, `items[23]`, `items[28]`, `items[33]`, `items[37]`, `items[42]`, `items[56]`, `items[69]`
- 5 × framed by its instruction: `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`

**2024-04-20-dire**

- 4 × framed by its instruction: `items[1]`, `items[4]`, `items[13]`, `items[18]`

**2024-04-22-prendre**

- 4 × framed by its instruction: `items[1]`, `items[4]`, `items[24]`, `items[25]`

**2024-10-22-donner**

- 7 × framed by its instruction: `items[1]`, `items[5]`, `items[8]`, `items[10]`, `items[11]`, `items[17]`, `items[18]`

**2024-04-21-mettre**

- 5 × framed by its instruction: `items[1]`, `items[4]`, `items[19]`, `items[20]`, `items[21]`

**2024-04-19-demander**

- 3 × framed by its instruction: `items[1]`, `items[4]`, `items[14]`

**2024-04-18-commander**

- 3 × framed by its instruction: `items[1]`, `items[4]`, `items[13]`

**2024-04-17-besoin**

- 1 × framed by its instruction: `items[6]`

**2024-04-26-unit-6-exam**

- 10 × framed by a context note: `items[4]`, `items[7]`, `items[17]`, `items[19]`, `items[20]`, `items[27]`, `items[31]`, `items[39]`, `items[41]`, `items[48]`

**2024-05-05-on-and-people**

- 3 × framed by its instruction: `items[0]`, `items[4]`, `items[6]`

**2024-05-09-studying-verbs**

- 1 × framed by a context note: `items[2]`

**2024-05-04-learning-verbs**

- 1 × framed by a context note: `items[1]`

**2024-05-02-discourse-markers**

- 5 × framed by its instruction: `items[0]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-05-10-unit-7-exam**

- 17 × framed by a context note: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[7]`, `items[9]`, `items[11]`, `items[13]`, `items[16]`, `items[19]`, `items[20]`, `items[21]`, `items[22]`, `items[26]`, `items[27]`, `items[58]`
- 2 × framed by its instruction: `items[44]`, `items[45]`

**2024-05-23-temporal-words**

- 5 × framed by its instruction: `items[0]`, `items[3]`, `items[4]`, `items[5]`, `items[11]`

**2024-05-22-s-appeler**

- 3 × framed by its instruction: `items[1]`, `items[4]`, `items[5]`

**2024-05-19-morning-routine**

- 1 × framed by its instruction: `items[2]`

**2024-05-17-getting-ready**

- 2 × framed by its instruction: `items[3]`, `items[5]`
- 1 × framed by a context note: `items[4]`

**2024-05-16-daily-reflexives**

- 3 × framed by its instruction: `items[1]`, `items[3]`, `items[5]`

**2024-06-07-reflexive-past**

- 3 × framed by its instruction: `items[0]`, `items[3]`, `items[4]`

**2024-06-06-reciprocal-reflexives**

- 3 × framed by its instruction: `items[1]`, `items[2]`, `items[5]`

**2024-05-13-commands-tu**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-05-14-commands-vous**

- 4 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`

**2024-05-18-irregular-commands**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-05-12-commands-pronouns**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-05-24-unit-8-exam**

- 7 × framed by a context note: `items[14]`, `items[21]`, `items[22]`, `items[24]`, `items[26]`, `items[30]`, `items[32]`
- 6 × framed by its instruction: `items[35]`, `items[36]`, `items[37]`, `items[38]`, `items[39]`, `items[40]`

**2024-06-09-unit-9-exam**

- 17 × framed by a context note: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[15]`, `items[17]`, `items[21]`, `items[25]`, `items[26]`, `items[27]`, `items[28]`, `items[30]`, `items[31]`, `items[33]`, `items[34]`

**2024-01-23-common-special-forms-1**

- 8 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`

**2024-01-24-common-special-forms-2**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`

**2024-01-28-necessity-phrases**

- 7 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`

**2024-02-07-wish-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-25-emotion-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-29-opinion-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-27-hypothetical-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-30-past-regret-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-26-had-already-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-22-common-adverbs**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[4]`, `items[5]`, `items[6]`

**2024-02-06-while-doing-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-02-02-service-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-01-21-before-phrases**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-02-03-so-that-phrases**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-01-20-although-phrases**

- 5 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`

**2024-01-31-possibility-phrases**

- 6 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`

**2024-02-04-unit-10-exam**

- 1 × framed by a context note: `items[11]`

**2024-02-08-age-personal-info**

- 10 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`

**2024-02-10-donner**

- 1 × framed by a context note: `items[1]`
- 1 × framed by its instruction: `items[11]`

**2024-05-15-daily-actions-1**

- 2 × framed by a context note: `items[1]`, `items[5]`
- 1 × framed by its instruction: `items[10]`

**2024-02-13-search-and-find**

- 1 × framed by a context note: `items[1]`
- 3 × framed by its instruction: `items[9]`, `items[10]`, `items[13]`

**2024-02-11-perception-verbs**

- 2 × framed by a context note: `items[1]`, `items[5]`
- 2 × framed by its instruction: `items[12]`, `items[13]`

**2024-02-14-social-situations**

- 2 × framed by a context note: `items[1]`, `items[8]`

**2024-02-09-directions-navigation**

- 1 × framed by a context note: `items[1]`
- 2 × framed by its instruction: `items[10]`, `items[11]`

**2024-02-15-unit-11-exam**

- 42 × framed by its instruction: `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[12]`, `items[13]`, `items[15]`, `items[16]`, `items[18]`, `items[19]`, `items[20]`, `items[21]`, `items[22]`, `items[23]`, `items[24]`, `items[25]`, `items[26]`, `items[27]`, `items[28]`, `items[29]`, `items[30]`, `items[31]`, `items[32]`, `items[33]`, `items[34]`, `items[35]`, `items[36]`, `items[37]`, `items[38]`, `items[39]`, `items[40]`, `items[41]`, `items[42]`, `items[43]`, `items[44]`, `items[45]`

**2024-03-16-movement-verbs**

- 2 × framed by a context note: `items[1]`, `items[8]`
- 1 × framed by its instruction: `items[18]`

**2024-03-17-natural-phenomena**

- 2 × framed by its instruction: `items[5]`, `items[6]`

**2024-03-15-questce-qui-que**

- 16 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`, `items[15]`

**2024-03-19-pourquoi-complex**

- 2 × framed by its instruction: `items[12]`, `items[13]`

**2024-03-20-comment-complex**

- 3 × framed by its instruction: `items[13]`, `items[14]`, `items[15]`

**2024-03-16-quiest-qui-que**

- 15 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`

**2024-03-22-inversion-questions**

- 15 × framed by its instruction: `items[0]`, `items[1]`, `items[2]`, `items[3]`, `items[4]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[10]`, `items[11]`, `items[12]`, `items[13]`, `items[14]`

**2024-03-23-embedded-questions**

- 2 × framed by its instruction: `items[13]`, `items[14]`

**2024-03-24-rhetorical-negative**

- 7 × framed by its instruction: `items[1]`, `items[5]`, `items[6]`, `items[7]`, `items[8]`, `items[9]`, `items[11]`

## Passage words with no pop-up

Each word below appears in the reading’s passage and has no dictionary entry (src/data/dictionary/), no row in the reading’s glossary or vocabulary table, and is not a name in curriculum-graph/languages/fr/names.json. Each needs one of the three, so every word a learner taps opens a pop-up.

**2024-04-13-reading-5**

- 5 words: boisson, favorite, fées, vertes, Terrasse

## Estimates to confirm

The source sets no value, so the conversion wrote an estimate.

**2026-11-24-negation-guide**

- `minutes` 3 minutes for three parts (L sets Cognates 4, Liaison 4, Questions 5, Verb Patterns 6)

## Hand edits kept

The module file differs from a fresh conversion of an unchanged source here. A rerun keeps the file.

**2024-01-01-famous-words**

- `concepts[0].term` "Internationally Recognized Words" → "Words you may already know"
- `concepts[0].definition` "Many words are used across languages and cultures" → "Some French words are already familiar from cafés, films and travel."
- `concepts[0].examples` "(none)" → "["fr":"Voilà !","en":"There you go!","fr":"Café ? Oui, merci.","en":"Coffee? Yes, thank you."]"
- `concepts[0].example` ""Some of these words may be familiar from movies, restaurants, or everyday use"" → "(removed)"
- `concepts[1].term` "Essential Greetings & Politeness" → "Greetings and polite words"
- `concepts[1].definition` "Basic phrases needed for any conversation" → "Say bonjour when you arrive and au revoir when you leave. Add please when you ask for something, and thank you when you get it."
- `concepts[1].examples` "(none)" → "["fr":"Bonjour !","en":"Hello!","fr":"S'il vous plaît.","en":"Please.","fr":"Merci !","en":"Thank you!","fr":"Oui.","en":"Yes.","fr":"Non.","en":"No.","fr":"Au revoir !","en":"Goodbye!"]"
- `concepts[1].example` ""Hello, thank you, yes, no, please, goodbye - universal communication"" → "(removed)"
- `concepts[2].term` "Building Your Foundation" → "Short answers"
- `concepts[2].definition` "Starting with common, useful words builds confidence" → "These words already make whole replies. Each one answers a question on its own."
- `concepts[2].examples` "(none)" → "["fr":"Oui, merci.","en":"Yes, thank you.","fr":"Bien, merci.","en":"Fine, thank you.","fr":"Bon, au revoir !","en":"Right, goodbye!"]"
- `concepts[2].example` ""These common words appear in daily conversation"" → "(removed)"

**2024-01-01-pronouns**

- `concepts[0].term` "Subject Pronouns" → "Subject pronouns"
- `concepts[0].definition` "Words that replace nouns as the subject of a sentence" → "A subject pronoun says who does the action: I, you, he, we or they."
- `concepts[0].layout` "(none)" → ""forms""
- `concepts[0].examples` "(none)" → "["fr":"je","en":"I","fr":"tu","en":"you","fr":"il","en":"he","fr":"nous","en":"we","fr":"vous","en":"you","fr":"ils","en":"they"]"
- `concepts[0].example` ""9 essential words: I, you, he, she, we, you (formal), they (masc), they (fem), on"" → "(removed)"
- `concepts[1].term` "Singular vs Plural" → "One person or more"
- `concepts[1].definition` "4 singular pronouns (one person) and 4 plural pronouns (multiple people)" → "Each pronoun for one person has a partner for more than one. Ils is for men or a mixed group, elles only for women."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"il","en":"he","fr":"elle","en":"she","fr":"ils","en":"they, men or a mixed group","fr":"elles","en":"they, all women"]"
- `concepts[1].example` ""I/you/he/she are singular, we/you all/they are plural"" → "(removed)"
- `concepts[2].term` "Formal vs Informal" → "Two words for you"
- `concepts[2].definition` "French has TWO words for "you" - informal (friends) and formal (strangers/bosses)" → "Say tu to a friend, a child or family. Say vous to someone you do not know, or to more than one person."
- `concepts[2].examples` "(none)" → "["fr":"tu","en":"you","note":"to a friend, a child or family","fr":"vous","en":"you","note":"to someone you do not know, or to a group"]"
- `concepts[2].example` ""Friends vs strangers require different pronouns"" → "(removed)"
- `concepts[3].term` "On - The Special Pronoun" → "On, the everyday we"
- `concepts[3].definition` "The most common way to say 'we' in French - more natural than 'nous'" → "In conversation French speakers say on for we more often than nous. It takes the same verb form as il and elle."
- `concepts[3].examples` "(none)" → "["fr":"on","en":"we, in conversation; also people in general","fr":"nous","en":"we, in writing and careful speech"]"
- `concepts[3].example` ""On va au café (We're going to the café) - uses il/elle verb forms, not nous forms"" → "(removed)"

**2024-01-02-etre**

- `concepts` "["id":"c-etre-to-be","term":"être = to be","definition":"The most important verb. Describes states and identity.","example":"Express: I am, you are, he is, she is, we are, they are","id":"c-conjugation-pattern","term":"Conjugation Pattern","definition":"Each pronoun gets a unique verb form - you must memorize all 8 to communicate who is doing what!","example":"je suis, tu es, il est, elle est, nous sommes, vous êtes, ils sont, elles sont","id":"c-practical-usage","term":"Practical Usage","definition":"Use with adjectives: \"I am happy\" or professions: \"I am a student\", or locations: \"I am in Paris\"","example":"Je suis heureux (I am happy), Je suis étudiant (I am a student), Je suis à Paris (I am in Paris)"]" → "["id":"c-etre-to-be","term":"être = to be","definition":"The verb for who you are and how you are. It is the verb French uses most.","examples":["fr":"Je suis heureux.","en":"I am happy.","fr":"Tu es Paul ?","en":"Are you Paul?","fr":"Nous sommes heureux.","en":"We are happy."],"id":"c-conjugation-pattern","term":"One form for each person","definition":"Each person has its own form of être, so learn the pronoun and the verb together. Elle est and elles sont go like il est and ils sont.","layout":"forms","examples":["fr":"je suis","en":"I am","fr":"tu es","en":"you are","fr":"il est","en":"he is","fr":"nous sommes","en":"we are","fr":"vous êtes","en":"you are","fr":"ils sont","en":"they are"],"id":"c-practical-usage","term":"être with a word or a name","definition":"Use it with a describing word, as in I am happy, or with your name, as in I am Paul.","examples":["fr":"Je suis heureux.","en":"I am happy.","fr":"Il est heureux.","en":"He is happy.","fr":"Je suis Paul.","en":"I am Paul.","fr":"Tu es bon !","en":"You're good!"],"id":"c-at-the-cafe","term":"At the café","definition":"With the words from the first lesson, you can already answer a waiter.","examples":["fr":"Bonjour ! Café ?","en":"Hello! Coffee?","fr":"Oui, merci !","en":"Yes, thanks!"]]"

**2024-01-04-avoir**

- `concepts[0].definition` "Express possession, age, and physical states" → "The verb for what you have. French also uses it to give your age."
- `concepts[0].layout` "(none)" → ""forms""
- `concepts[0].examples` "(none)" → "["fr":"j'ai","en":"I have","fr":"tu as","en":"you have","fr":"il a","en":"he has","fr":"nous avons","en":"we have","fr":"vous avez","en":"you have","fr":"ils ont","en":"they have"]"
- `concepts[0].example` ""Use to say what you have, your age, or physical sensations"" → "(removed)"
- `concepts[1].term` "Elision with First Person" → "je becomes j' before a vowel"
- `concepts[1].definition` "When 'I' meets a verb starting with vowel, letters merge with apostrophe" → "Before a vowel sound, je drops its e and joins the verb with an apostrophe. Before a consonant it stays as it is."
- `concepts[1].examples` "(none)" → "["fr":"j'ai","en":"I have","note":"before a vowel","fr":"je suis","en":"I am","note":"before a consonant"]"
- `concepts[1].example` ""The 'e' disappears and apostrophe appears for smooth pronunciation"" → "(removed)"
- `concepts[2].term` "Common Uses" → "What avoir says"
- `concepts[2].definition` "Possession: "I have a cat", Age: "I have 20 years" (French way to say age!)" → "Use avoir for what someone has. French gives your age with it too: it says I have 20 years for I am 20."
- `concepts[2].layout` "(none)" → ""forms""
- `concepts[2].examples` "(none)" → "["fr":"elle a","en":"she has","fr":"elles ont","en":"they have, all women"]"
- `concepts[2].example` ""Possession and age are the most common uses"" → "(removed)"

**2024-01-05-articles**

- `concepts[0].term` "Why Articles Matter" → "A noun comes with an article"
- `concepts[0].definition` "You can NEVER say a noun alone in French - must use an article!" → "In French a noun almost never stands alone. You say a coffee or the coffee, not just coffee."
- `concepts[0].examples` "(none)" → "["fr":"Le café est bon.","en":"The coffee is good.","fr":"Un café, s'il vous plaît.","en":"A coffee, please."]"
- `concepts[0].example` ""English: 'book', French: MUST say 'a book' or 'the book'"" → "(removed)"
- `concepts[1].term` "Indefinite Articles (a/an)" → "un and une: a or an"
- `concepts[1].definition` "un (masculine), une (feminine) = a/an" → "Use un or une for any one thing, not a particular one. Un goes with a masculine noun and une with a feminine one."
- `concepts[1].examples` "(none)" → "["fr":"Un café ?","en":"A coffee?","fr":"Oui, un café, merci.","en":"Yes, a coffee, thank you."]"
- `concepts[1].example` ""Use when talking about any one thing, not a specific thing"" → "(removed)"
- `concepts[2].term` "Definite Articles (the)" → "Three words for the"
- `concepts[2].definition` "le (masculine), la (feminine), les (plural) = the" → "Use le or la for one particular thing. Les is for more than one, and l' replaces both before a vowel."
- `concepts[2].examples` "(none)" → "["fr":"Voilà le café !","en":"Here's the coffee!","fr":"Le café est bon.","en":"The coffee is good."]"
- `concepts[2].example` ""Use when talking about a specific thing"" → "(removed)"
- `concepts[3].term` "Gender Agreement" → "The article shows the gender"
- `concepts[3].definition` "Article must match the noun's gender - this is critical!" → "Every noun is masculine or feminine, and its article must match. Café is masculine: it takes un and le."
- `concepts[3].examples` "(none)" → "["fr":"un café","en":"a coffee","fr":"le café","en":"the coffee"]"
- `concepts[3].example` ""Masculine nouns use un/le, feminine nouns use une/la"" → "(removed)"

**2024-10-21-cognates-help**

- `parts[4].text[0]` "Every French noun is masculine or feminine, so learn each cognate with its article, un or une. French does not drop the article the way English does in “I want coffee”." → "Every French noun is masculine or feminine, so learn each cognate with its article, un or une. French does not drop the article the way English does in “Coffee is good”."
- `parts[4].blocks[0].lines[0][0]` "Je veux un café." → "J'ai un café."
- `parts[4].blocks[0].lines[0][1]` "I want a coffee." → "I have a coffee."
- `parts[4].blocks[0].lines[1][0]` "Je veux du café." → "Le café est bon."
- `parts[4].blocks[0].lines[1][1]` "I want some coffee." → "Coffee is good."

**2024-01-06-basic-nouns**

- `concepts[0].term` "Noun Gender - Critical Concept!" → "Every noun is masculine or feminine"
- `concepts[0].definition` "Every French noun is either masculine or feminine - you must memorize this!" → "Nothing in most nouns shows their gender, so learn each one with its article."
- `concepts[0].examples` "(none)" → "["fr":"un livre","en":"a book","fr":"une maison","en":"a house","fr":"un chien","en":"a dog","fr":"une voiture","en":"a car"]"
- `concepts[0].example` ""Masculine nouns use 'le/un', feminine use 'la/une'"" → "(removed)"
- `concepts[1].term` "Using With être and avoir" → "Nouns with être and avoir"
- `concepts[1].definition` "Combine nouns with verbs you already know from M2-M3" → "Put a noun after avoir to say what someone has, or after c'est to say what something is."
- `concepts[1].examples` "(none)" → "["fr":"J'ai un livre.","en":"I have a book.","fr":"Il a un chien.","en":"He has a dog.","fr":"C'est une maison.","en":"It's a house."]"
- `concepts[1].example` ""Pattern: pronoun + verb + article + noun"" → "(removed)"
- `concepts[2].term` "Practice Previous Modules!" → "Every sentence uses a verb you know"
- `concepts[2].definition` "Every exercise uses être or avoir - reinforcing what you learned!" → "Each sentence in this lesson puts a new noun with être or avoir."
- `concepts[2].examples` "(none)" → "["fr":"Tu as une voiture.","en":"You have a car.","fr":"Elle a une amie.","en":"She has a friend.","fr":"Nous avons une chienne.","en":"We have a dog."]"
- `concepts[2].example` ""Learn nouns WHILE practicing your verbs"" → "(removed)"
- `concepts[3].term` "Rule: Identifying vs. Profession" → "Saying who someone is"
- `concepts[3].definition` "When you identify someone with a noun (like 'man' or 'friend'), you MUST use an article (un, une). NOTE: A special rule for professions and nationalities will be taught later." → "To say who someone is with a noun, put un or une before the noun. For he is or she is, French usually says c'est."
- `concepts[3].examples` "(none)" → "["fr":"Je suis un homme.","en":"I am a man.","fr":"C'est une amie.","en":"She's a friend.","fr":"C'est un enfant.","en":"It's a child."]"
- `concepts[3].example` ""Correct for now: 'elle est une amie'. Future rule: 'elle est avocate' (she is a lawyer)."" → "(removed)"
- `items[0].hint` "Combine avoir (M3) + article (M4) + noun - all previous modules!" → "Combine avoir + article + noun - all from earlier lessons!"

**2024-01-07-plurals**

- `concepts[0].term` "Basic Plural Rule" → "Add -s for more than one"
- `concepts[0].definition` "Add -s to most nouns (just like English!)" → "Most nouns add -s in the plural, as in English. The s is silent, so you hear the plural in the article."
- `concepts[0].examples` "(none)" → "["fr":"C'est un chat.","en":"It's a cat.","fr":"J'ai des chats.","en":"I have cats.","fr":"Nous avons les livres.","en":"We have the books."]"
- `concepts[0].example` ""chat → chats, livre → livres, ami → amis"" → "(removed)"
- `concepts[1].term` "Plural Articles" → "les and des"
- `concepts[1].definition` "les = the (plural), des = some/plural a" → "Les is the for more than one. Des is the plural of a: English often says nothing there, or some."
- `concepts[1].examples` "(none)" → "["fr":"Ils ont les chats.","en":"They have the cats.","fr":"Tu as des chats.","en":"You have cats.","fr":"Elle a les enfants.","en":"She has the children."]"
- `concepts[1].example` ""Pattern: [pronoun] + [verb] + [des/les] + [plural noun]"" → "(removed)"
- `concepts[2].term` "Practice With être & avoir!" → "Plurals with être and avoir"
- `concepts[2].definition` "Every exercise combines plurals with verbs from M2-M3" → "Every sentence in this lesson puts a plural noun after a verb you know."
- `concepts[2].examples` "(none)" → "["fr":"Nous sommes des amis.","en":"We are friends.","fr":"Vous avez les choses.","en":"You have the things.","fr":"J'ai des enfants.","en":"I have children."]"
- `concepts[2].example` ""Learn plurals WHILE reinforcing your verb conjugations"" → "(removed)"

**2024-01-08-connectors**

- `concepts[0].definition` "Connect two things or ideas together" → "Et joins two words or two ideas."
- `concepts[0].examples` "(none)" → "["fr":"un chat et un chien","en":"a cat and a dog","fr":"J'ai un livre et un chat.","en":"I have a book and a cat."]"
- `concepts[0].example` ""un chat et un chien (a cat and a dog)"" → "(removed)"
- `concepts[1].definition` "Show contrast between two ideas" → "Mais sets one idea against another."
- `concepts[1].examples` "(none)" → "["fr":"J'ai un chat, mais il a un chien.","en":"I have a cat, but he has a dog.","fr":"Je suis un homme, mais tu es une femme.","en":"I am a man, but you are a woman."]"
- `concepts[1].example` ""je suis un homme, mais tu es une femme (I am a man, but you are a woman)"" → "(removed)"
- `concepts[2].definition` "Present a choice between options" → "Ou offers a choice between two things."
- `concepts[2].examples` "(none)" → "["fr":"Un chat ou un chien ?","en":"A cat or a dog?","fr":"C'est un ami ou une amie ?","en":"Is it a male or a female friend?"]"
- `concepts[2].example` ""un chat ou un chien? (a cat or a dog?)"" → "(removed)"
- `concepts[3].term` "aussi = also / too" → "aussi = also, too"
- `concepts[3].definition` "Add something extra to your statement" → "Aussi adds one more thing to what you said. It usually comes at the end."
- `concepts[3].examples` "(none)" → "["fr":"J'ai un chat aussi.","en":"I have a cat too.","fr":"Elle a un livre aussi.","en":"She has a book too."]"
- `concepts[3].example` ""j'ai un chat aussi (I have a cat too / also)"" → "(removed)"
- `concepts[4].definition` "Intensify adjectives - make things stronger!" → "Très makes a describing word stronger. It goes right before it."
- `concepts[4].examples` "(none)" → "["fr":"C'est très bon.","en":"It's very good.","fr":"La maison est très bonne.","en":"The house is very good."]"
- `concepts[4].example` ""très bon (very good)"" → "(removed)"
- `concepts[5].term` "Making Natural Sentences" → "Longer sentences"
- `concepts[5].definition` "Combine with everything you've learned to sound natural!" → "These five words join the nouns and verbs you know into longer sentences."
- `concepts[5].examples` "(none)" → "["fr":"Nous avons une maison et une voiture.","en":"We have a house and a car.","fr":"Le café est très bon, merci.","en":"The coffee is very good, thank you."]"
- `concepts[5].example` ""Use with nouns, verbs, and phrases from previous modules"" → "(removed)"

**2024-01-10-unit1-practice**

- `title` "Unit 1 Practice - Fill in the Blanks" → "Essential Grammar Practice - Fill in the Blanks"
- `description` "Complete sentences using everything you've learned in Unit 1. Fill in the blanks to create correct French sentences!" → "Complete sentences using everything you've learned in this unit. Fill in the blanks to create correct French sentences!"
- `can_do[2]` "Apply everything from Unit 1 in context" → "Apply everything from this unit in context"

**2026-11-24-numbers**

- `concepts[0].definition` "Each number up to 16 has its own word. Learn these by heart." → "Each number up to 16 has its own word, so learn these by heart."
- `concepts[0].examples` "(none)" → "["fr":"Il a trois chats.","en":"He has three cats.","fr":"Nous avons deux enfants.","en":"We have two children.","fr":"Elle a douze livres.","en":"She has twelve books.","fr":"Le chien a seize ans.","en":"The dog is sixteen."]"
- `concepts[0].example` ""zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix, onze, douze, treize, quatorze, quinze, seize"" → "(removed)"
- `concepts[1].examples` "(none)" → "["fr":"dix-sept","en":"17","fr":"dix-huit","en":"18","fr":"dix-neuf","en":"19","fr":"Marie a dix-neuf ans.","en":"Marie is nineteen."]"
- `concepts[1].example` ""dix-sept (17), dix-huit (18), dix-neuf (19)"" → "(removed)"
- `concepts[2].examples` "(none)" → "["fr":"vingt","en":"20","fr":"trente","en":"30","fr":"quarante","en":"40","fr":"cinquante","en":"50","fr":"soixante","en":"60"]"
- `concepts[2].example` ""vingt (20), trente (30), quarante (40), cinquante (50), soixante (60)"" → "(removed)"
- `concepts[3].definition` "Put 'et' between the ten and 'un'. From 2 to 9, join them with a hyphen. Before a feminine noun, 'un' becomes 'une', as in 'une voiture'." → "Put et between the ten and un, and a hyphen between the ten and 2 to 9. Before a feminine noun, un becomes une."
- `concepts[3].examples` "(none)" → "["fr":"vingt et un","en":"21","fr":"vingt-deux","en":"22","fr":"trente et un","en":"31","fr":"quarante-cinq","en":"45","fr":"Elles ont cinquante et une voitures.","en":"They have fifty-one cars."]"
- `concepts[3].example` ""vingt et un (21), vingt-deux (22), trente et un (31), quarante-cinq (45), cinquante et une voitures (51)"" → "(removed)"
- `concepts[4].definition` "French says 70 as sixty-ten, then counts on with 11 to 19: sixty-eleven, sixty-twelve, up to sixty-nineteen. 71 keeps 'et': 'soixante et onze'." → "French says 70 as sixty-ten and counts on with 11 to 19, so 75 is sixty-fifteen. Only 71 keeps et."
- `concepts[4].examples` "(none)" → "["fr":"soixante-dix","en":"70","fr":"soixante et onze","en":"71","fr":"soixante-douze","en":"72","fr":"soixante-quinze","en":"75","fr":"soixante-dix-neuf","en":"79"]"
- `concepts[4].example` ""soixante-dix (70), soixante et onze (71), soixante-douze (72), soixante-quinze (75), soixante-dix-neuf (79)"" → "(removed)"
- `concepts[5].definition` "80 is four twenties, with an s. From 81 on, the s goes and there is no 'et'. 90 to 99 add 10 to 19 to four twenties. 100 is 'cent'." → "80 is four twenties, with an s that goes from 81 on, and there is no et. 90 to 99 add 10 to 19 to four twenties, and 100 is cent."
- `concepts[5].examples` "(none)" → "["fr":"quatre-vingts","en":"80","fr":"quatre-vingt-un","en":"81","fr":"quatre-vingt-dix","en":"90","fr":"quatre-vingt-onze","en":"91","fr":"quatre-vingt-dix-neuf","en":"99","fr":"cent","en":"100"]"
- `concepts[5].example` ""quatre-vingts (80), quatre-vingt-un (81), quatre-vingt-cinq (85), quatre-vingt-dix (90), quatre-vingt-onze (91), quatre-vingt-dix-neuf (99), cent (100)"" → "(removed)"
- `concepts[6].definition` "To give an age, French says you have that many years: 'avoir', the number, then 'ans'." → "To give an age, French says you have that many years: avoir, the number, then ans."
- `concepts[6].examples` "(none)" → "["fr":"J'ai vingt ans.","en":"I am twenty.","fr":"Paul a trente et un ans.","en":"Paul is thirty-one.","fr":"La maison a cent ans.","en":"The house is a hundred years old."]"
- `concepts[6].example` ""J'ai vingt ans. Paul a trente et un ans. La maison a cent ans."" → "(removed)"
- `concepts[7].examples` "(none)" → "["fr":"deux cents","en":"200","fr":"mille","en":"1,000"]"
- `concepts[7].example` ""deux cents (200), mille (1,000)"" → "(removed)"

**2026-11-24-negation-guide**

- `checks` "[]" → "["id":"k1","ask":"Which one means “I don't have a cat”?","options":["text":"Je n'ai pas de chat.","fr":true,"right":true,"text":"Je n'ai pas un chat.","fr":true,"text":"Je ne ai pas de chat.","fr":true],"why":"After pas, un becomes de, and ne becomes n' before a vowel: Je n'ai pas de chat.","id":"k2","ask":"Which one means “You aren't a child”?","options":["text":"Tu ne pas es un enfant.","fr":true,"text":"Tu n'es pas un enfant.","fr":true,"right":true,"text":"Tu n'es pas d'enfant.","fr":true],"why":"ne goes before the verb and pas after it. After être, un stays as it is: Tu n'es pas un enfant.","id":"k3","ask":"Which one means “I don't have a car anymore”?","options":["text":"Je n'ai jamais de voiture.","fr":true,"text":"Je n'ai pas de voiture.","fr":true,"text":"Je n'ai plus de voiture.","fr":true,"right":true],"why":"plus takes the place of pas and means anymore."]"

**2024-01-12-demonstratives**

- `concepts[0].term` "ça - The Most Useful Word!" → "ça, the most useful word"
- `concepts[0].definition` "Informal 'that/it' - you'll use this constantly!" → "Ça means that or it in everyday speech. You hear it in almost every conversation."
- `concepts[0].examples` "(none)" → "["fr":"J'ai ça.","en":"I have that.","fr":"Tu as ça ?","en":"Do you have that?"]"
- `concepts[0].example` ""Used standalone or in phrases constantly in conversation"" → "(removed)"
- `concepts[1].term` "Demonstrative Forms" → "This and that"
- `concepts[1].definition` "Learn the standalone forms: ce, cet, cette, ces" → "These four words mean this or that, and in the plural these or those. Each one goes before a noun."
- `concepts[1].examples` "(none)" → "["fr":"ce livre","en":"this book","fr":"cet homme","en":"this man","fr":"cette maison","en":"this house","fr":"ces chats","en":"these cats"]"
- `concepts[1].example` ""Like variables in programming - you'll compose them with nouns soon!"" → "(removed)"
- `concepts[2].term` "Gender and Sound Agreement" → "Which one to use"
- `concepts[2].definition` "Choose based on: 1) gender of noun, 2) sound it starts with" → "The noun decides: its gender, its number and the sound it starts with."
- `concepts[2].examples` "(none)" → "["fr":"ce chien","en":"this dog","note":"masculine, before a consonant","fr":"cet homme","en":"this man","note":"masculine, before a vowel sound","fr":"cette femme","en":"this woman","note":"feminine","fr":"ces livres","en":"these books","note":"plural"]"
- `concepts[2].example` ""masculine + consonant = ce, masculine + vowel = cet, feminine = cette, plural = ces"" → "(removed)"
- `concepts[3].term` "Next: Functional Composition!" → "With a noun you know"
- `concepts[3].definition` "After practicing ça, you'll compose demonstratives with nouns" → "Put the word before any noun you know to point at it."
- `concepts[3].examples` "(none)" → "["fr":"C'est ce livre.","en":"It's this book.","fr":"J'ai ces livres.","en":"I have these books.","fr":"Tu as ce chat ?","en":"Do you have this cat?"]"
- `concepts[3].example` ""Coming soon: ce(livre) = ce livre, ces(chats) = ces chats"" → "(removed)"

**2024-01-13-ca-survival**

- `concepts[0].term` "ça = that/it" → "ça = that, it"
- `concepts[0].definition` "Informal, versatile, used constantly in conversation" → "Ça points at a thing without naming it. It is how people say that or it in conversation."
- `concepts[0].examples` "(none)" → "["fr":"J'ai ça.","en":"I have that.","fr":"Il a ça.","en":"He has that."]"
- `concepts[0].example` ""You'll use this word in almost every sentence!"" → "(removed)"
- `concepts[1].definition` "That's it / That's right - super common phrase" → "C'est ça says yes, that's right. People use it to agree or to confirm."
- `concepts[1].examples` "(none)" → "["fr":"C'est ça !","en":"That's right!","fr":"Oui, c'est ça.","en":"Yes, that's it."]"
- `concepts[1].example` ""Used to confirm, agree, or point to something"" → "(removed)"
- `concepts[2].term` "ça va?" → "ça va ?"
- `concepts[2].definition` "How's it going? / Are you OK? - most common greeting!" → "Ça va ? asks how someone is, and ça va answers it. It is the usual greeting between people who know each other."
- `concepts[2].examples` "(none)" → "["fr":"Salut ! Ça va ?","en":"Hi! How are you?","fr":"Ça va, merci.","en":"Fine, thanks.","fr":"Ça va bien.","en":"I'm fine."]"
- `concepts[2].example` ""The first thing you say when meeting someone"" → "(removed)"
- `concepts[3].term` "Building Blocks" → "ça with verbs you know"
- `concepts[3].definition` "Combine with être and avoir from previous modules" → "Ça works with être and avoir the way a noun does."
- `concepts[3].examples` "(none)" → "["fr":"Ça, c'est bon !","en":"That's good!","fr":"Tu as ça ?","en":"Do you have that?","fr":"Ça, c'est un livre.","en":"That's a book."]"
- `concepts[3].example` ""c'est + ça, j'ai + ça - real useful phrases!"" → "(removed)"
- `items[1].hint` "Combine: it is + that (using être from M3)" → "Combine: it is + that (using être)"

**2024-01-14-determiners-nouns**

- `concepts[0].term` "Functional Composition" → "The word before the noun"
- `concepts[0].definition` "Determiners are functions that take nouns as arguments" → "A word such as ce or le goes before the noun and matches its gender and number."
- `concepts[0].examples` "(none)" → "["fr":"ce livre","en":"this book","fr":"cette maison","en":"this house","fr":"le chat","en":"the cat","fr":"la maison","en":"the house"]"
- `concepts[0].example` ""ce(livre) → ce livre, cette(maison) → cette maison"" → "(removed)"
- `concepts[1].term` "Full Sentence Practice" → "Whole sentences"
- `concepts[1].definition` "Every exercise uses être, avoir, or vouloir - combining multiple modules!" → "Every sentence in this lesson puts one of these noun groups after être or avoir."
- `concepts[1].examples` "(none)" → "["fr":"J'ai ce livre.","en":"I have this book.","fr":"Elle a cette maison.","en":"She has this house.","fr":"C'est cet homme.","en":"It's this man."]"
- `concepts[1].example` ""Not just 'this book', but 'I have this book' - real usage!"" → "(removed)"
- `concepts[2].term` "Using ALL Previous Verbs" → "The order of the words"
- `concepts[2].definition` "Practice with être and avoir from previous modules" → "The pronoun comes first, then the verb, then the noun with its word before it, as in English."
- `concepts[2].examples` "(none)" → "["fr":"Nous avons ces livres.","en":"We have these books.","fr":"Ils ont les chiens.","en":"They have the dogs.","fr":"J'ai ces enfants.","en":"I have these children."]"
- `concepts[2].example` ""Pattern: [pronoun] + [verb] + [determiner] + [noun]"" → "(removed)"

**2024-01-15-vouloir**

- `vocabulary/je-veux-fr` ""word_id":"je-veux-fr","fr":"je veux","gloss":"I want","note":"irregular form"" → "(removed)"
- `vocabulary/tu-veux-fr` ""word_id":"tu-veux-fr","fr":"tu veux","gloss":"you want (informal)","note":"same as je!"" → "(removed)"
- `vocabulary/il-veut-fr` ""word_id":"il-veut-fr","fr":"il veut","gloss":"he wants","note":"different ending"" → "(removed)"
- `vocabulary/elle-veut-fr` ""word_id":"elle-veut-fr","fr":"elle veut","gloss":"she wants","note":"same as il"" → "(removed)"
- `vocabulary/nous-voulons-fr` ""word_id":"nous-voulons-fr","fr":"nous voulons","gloss":"we want","note":"regular ending"" → "(removed)"
- `vocabulary/vous-voulez-fr` ""word_id":"vous-voulez-fr","fr":"vous voulez","gloss":"you want (formal)","note":"formal/plural"" → "(removed)"
- `vocabulary/ils-veulent-fr` ""word_id":"ils-veulent-fr","fr":"ils veulent","gloss":"they want (masc)","note":"irregular"" → "(removed)"
- `vocabulary/elles-veulent-fr` ""word_id":"elles-veulent-fr","fr":"elles veulent","gloss":"they want (fem)","note":"same as ils"" → "(removed)"
- `concepts[0].definition` "Essential irregular verb for expressing desires and polite requests! One of the most common verbs in French." → "The verb for wanting a thing or wanting to do something. It is also how you ask for things politely."
- `concepts[0].examples` "(none)" → "["fr":"Je veux ça.","en":"I want that.","fr":"Tu veux un chat ?","en":"Do you want a cat?","fr":"Nous voulons avoir une maison.","en":"We want to have a house.","fr":"Ça va ? Tu veux un café ?","en":"How are you? Do you want a coffee?"]"
- `concepts[0].example` ""'I want that' (Je veux ça), 'Do you want a book?' (Veux-tu un livre?), 'We want to have a house' (Nous voulons avoir une maison)"" → "(removed)"
- `concepts[1].term` "Irregular Conjugation Pattern" → "Three stems"
- `concepts[1].definition` "Notice the pattern: je/tu both use 'veux', then il/elle use 'veut', nous uses 'voulons', and ils/elles use 'veulent'!" → "The stem changes three times: once for the singular, once for we and you, and once for they."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je veux","en":"I want","fr":"tu veux","en":"you want","fr":"il veut","en":"he wants","fr":"nous voulons","en":"we want","fr":"vous voulez","en":"you want","fr":"ils veulent","en":"they want"]"
- `concepts[1].example` ""je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent"" → "(removed)"
- `concepts[2].term` "Composition Power" → "Wanting to do something"
- `concepts[2].definition` "Combine vouloir with previous modules for infinite expressions. Use with ça, être, avoir, and nouns you've learned!" → "Put a second verb straight after vouloir to say what you want to do. The second verb does not change."
- `concepts[2].examples` "(none)" → "["fr":"Je veux être heureux.","en":"I want to be happy.","fr":"Je veux avoir un chat.","en":"I want to have a cat.","fr":"Elle veut avoir une maison.","en":"She wants to have a house."]"
- `concepts[2].example` ""je veux + ça, nous voulons + être, ils veulent + avoir + un livre"" → "(removed)"
- `conjugation` "(none)" → ""verb":"vouloir","en":"to want","note":"vouloir has three stems and four spoken forms. veux, veut and veulent change the stem; voulons and voulez keep the stem of vouloir.""

**2024-01-16-pouvoir**

- `concepts[0].term` "pouvoir = can/to be able" → "pouvoir = can, to be able"
- `concepts[0].definition` "Essential irregular verb for expressing ability, possibility, and permission! One of the most useful verbs in French." → "The verb for what someone can do: ability, chance and permission. It is one of the verbs French uses most."
- `concepts[0].examples` "(none)" → "["fr":"Je peux avoir ça, s'il vous plaît ?","en":"Can I have that, please?","fr":"Je peux avoir ça, s'il te plaît ?","en":"Can I have that, please?","note":"to a friend","fr":"Tu peux ?","en":"Can you?"]"
- `concepts[0].example` ""'I can have that' (Je peux avoir ça), 'Can you be a friend?' (Peux-tu être un ami?), 'We can want a house' (Nous pouvons vouloir une maison)"" → "(removed)"
- `concepts[1].term` "Irregular Conjugation Pattern" → "Three stems"
- `concepts[1].definition` "Notice the pattern: je/tu both use 'peux', then il/elle use 'peut', nous uses 'pouvons', and ils/elles use 'peuvent'!" → "The stem changes three times: once for the singular, once for we and you, and once for they."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je peux","en":"I can","fr":"tu peux","en":"you can","fr":"il peut","en":"he can","fr":"nous pouvons","en":"we can","fr":"vous pouvez","en":"you can","fr":"ils peuvent","en":"they can"]"
- `concepts[1].example` ""je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent"" → "(removed)"
- `concepts[2].term` "Composition Power" → "What someone can do"
- `concepts[2].definition` "Combine pouvoir with previous modules for infinite expressions. Use with être, avoir, vouloir, and nouns you've learned!" → "Put a second verb straight after pouvoir to say what someone can do."
- `concepts[2].examples` "(none)" → "["fr":"Je peux être un ami.","en":"I can be a friend.","fr":"Il peut avoir un livre.","en":"He can have a book.","fr":"Nous pouvons avoir une maison.","en":"We can have a house."]"
- `concepts[2].example` ""je peux + avoir + ça, nous pouvons + être, ils peuvent + vouloir + un livre"" → "(removed)"

**2024-01-17-voir**

- `concepts[0].definition` "Irregular verb for seeing and perceiving" → "The verb for seeing. It often comes after vouloir, as in je veux voir, I want to see."
- `concepts[0].examples` "(none)" → "["fr":"Je veux voir.","en":"I want to see.","fr":"Tu vois ?","en":"You see?","fr":"Je vois un chat.","en":"I see a cat."]"
- `concepts[0].example` ""Very common! Essential for object pronouns in next module"" → "(removed)"
- `concepts[1].term` "Irregular Conjugation" → "Its forms"
- `concepts[1].definition` "Stem changes throughout conjugation" → "The stem has a y for we and you, and an i everywhere else."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je vois","en":"I see","fr":"tu vois","en":"you see","fr":"il voit","en":"he sees","fr":"nous voyons","en":"we see","fr":"vous voyez","en":"you see","fr":"ils voient","en":"they see"]"
- `concepts[1].example` ""je/tu vois, il voit, nous voyons, vous voyez, ils voient"" → "(removed)"
- `concepts[2].term` "Building on Previous Vocabulary" → "What you see"
- `concepts[2].definition` "Combine with nouns, adjectives, and phrases you already know" → "Put what you see after the verb, as in English."
- `concepts[2].examples` "(none)" → "["fr":"Nous voyons la maison.","en":"We see the house.","fr":"Tu vois ce livre ?","en":"Do you see this book?","fr":"Ils voient un chien.","en":"They see a dog."]"
- `concepts[2].example` ""Pattern: 'je vois' + articles + nouns + adjectives"" → "(removed)"
- `concepts[3].term` "Prepares for Object Pronouns" → "Seeing people"
- `concepts[3].definition` "Next module teaches 'I see HIM/HER/IT/THEM' - need voir first!" → "Voir works with people too: put a name or a noun after it."
- `concepts[3].examples` "(none)" → "["fr":"Je vois Paul.","en":"I see Paul.","fr":"Tu vois cette femme ?","en":"Do you see that woman?","fr":"Il voit les enfants.","en":"He sees the children."]"
- `concepts[3].example` ""Foundation for: je le vois, je la vois, je les vois"" → "(removed)"

**2024-01-18-questions**

- `vocabulary[11].word_id` "ca-va-fr.question-2" → "ca-va-fr.question"
- `concepts[0].term` "Three Ways to Ask Questions in French" → "Three ways to ask a question"
- `concepts[0].definition` "French has 3 methods for asking questions. Start with the easiest!" → "French can ask the same question three ways. In speech the easiest are est-ce que and a rising voice."
- `concepts[0].examples` "(none)" → "["fr":"Est-ce que tu as un chat ?","en":"Do you have a cat?","note":"with est-ce que","fr":"Tu as un chat ?","en":"Do you have a cat?","note":"with your voice rising","fr":"As-tu un chat ?","en":"Do you have a cat?","note":"with the verb first, more formal"]"
- `concepts[0].example` ""1) Est-ce que (easiest), 2) Intonation (informal), 3) Inversion (formal)"" → "(removed)"
- `concepts[1].term` "Method 1: Est-ce que (Beginner-Friendly!)" → "Est-ce que"
- `concepts[1].definition` "Add 'est-ce que' before ANY statement to make it a question. No word order change needed!" → "Put est-ce que before a statement to make it a question. The other words keep their order."
- `concepts[1].examples` "(none)" → "["fr":"Est-ce que tu veux un café ?","en":"Do you want a coffee?","fr":"Est-ce que vous voyez la maison ?","en":"Do you see the house?"]"
- `concepts[1].example` ""Statement: 'tu as un chat' → Question: 'est-ce que tu as un chat?' (do you have a cat?)"" → "(removed)"
- `concepts[2].term` "With Question Words + Est-ce que" → "A question word and est-ce que"
- `concepts[2].definition` "Put question word first, then 'est-ce que', then statement" → "Put the question word first, then est-ce que, then the statement."
- `concepts[2].examples` "(none)" → "["fr":"Où est-ce que tu es ?","en":"Where are you?","fr":"Pourquoi est-ce que tu veux ça ?","en":"Why do you want that?","fr":"Qu'est-ce que tu veux ?","en":"What do you want?"]"
- `concepts[2].example` ""où est-ce que tu es? (where are you?), quand est-ce que tu as le livre? (when do you have the book?)"" → "(removed)"
- `concepts[3].term` "Method 2: Rising Intonation (Spoken French)" → "A rising voice"
- `concepts[3].definition` "Just say a statement with rising voice at the end - super informal!" → "Say the statement and let your voice rise at the end. It is the most common way to ask in conversation."
- `concepts[3].examples` "(none)" → "["fr":"Tu as un chat ?","en":"You have a cat?","fr":"Tu es où ?","en":"Where are you?","fr":"Ça va ?","en":"Are you OK?"]"
- `concepts[3].example` ""Tu as un chat? ↗ (you have a cat?), Tu es où? ↗ (you are where?)"" → "(removed)"
- `concepts[4].term` "Method 3: Inversion (Formal)" → "The verb first"
- `concepts[4].definition` "Flip verb and subject, add hyphen. Used in formal/written French" → "Put the verb before the pronoun and join them with a hyphen. It sounds formal and is used most in writing."
- `concepts[4].examples` "(none)" → "["fr":"As-tu un chat ?","en":"Do you have a cat?","fr":"Où es-tu ?","en":"Where are you?","fr":"Que veux-tu ?","en":"What do you want?"]"
- `concepts[4].example` ""As-tu un chat? (have you a cat?), Où es-tu? (where are you?)"" → "(removed)"
- `concepts[5].term` "The 7 Essential Question Words" → "Question words"
- `concepts[5].definition` "These words unlock every question you need: what, who, where, when, how, why, how much" → "These words ask who, where, when, how, why, and how much or how many."
- `concepts[5].examples` "(none)" → "["fr":"qui","en":"who","fr":"où","en":"where","fr":"quand","en":"when","fr":"comment","en":"how","fr":"pourquoi","en":"why","fr":"combien","en":"how much, how many"]"
- `concepts[5].example` ""que/quoi (what), qui (who), où (where), quand (when), comment (how), pourquoi (why), combien (how much/many)"" → "(removed)"
- `concepts[6].term` "Que vs Quoi (both mean 'what')" → "que and quoi: what"
- `concepts[6].definition` "'Que' starts questions, 'quoi' ends them or stands alone" → "Que starts a question. Quoi ends one or stands on its own."
- `concepts[6].examples` "(none)" → "["fr":"Que veux-tu ?","en":"What do you want?","fr":"Tu veux quoi ?","en":"You want what?","fr":"Quoi ?","en":"What?"]"
- `concepts[6].example` ""Que fais-tu? (what do you do?) vs Tu fais quoi? (you do what?) vs Quoi? (what?!)"" → "(removed)"
- `concepts[7].term` "Common Question Phrases - Memorize These!" → "Questions to learn whole"
- `concepts[7].definition` "Some questions are used so often they become fixed phrases" → "Some questions are so common that people say them as one block."
- `concepts[7].examples` "(none)" → "["fr":"Qu'est-ce que c'est ?","en":"What is it?","fr":"Comment ça va ?","en":"How are you?","fr":"Qu'est-ce que tu veux ?","en":"What do you want?","fr":"Est-ce que tu peux ?","en":"Can you?"]"
- `concepts[7].example` ""qu'est-ce que c'est? (what is it?), comment ça va? (how's it going?), ça va? (you good?), qu'est-ce que tu veux? (what do you want?), est-ce que tu peux? (can you?)"" → "(removed)"
- `items[13].answer` "est-ce que elle est une femme" → "est-ce qu'elle est une femme"
- `items[13].hint` "est-ce que + elle est une femme" → "Put est-ce qu' before elle est une femme: que drops its e before a vowel."
- `items[13].accept` "["est-ce qu'elle est une femme"]" → "(removed)"

**2024-01-19-questions-help**

- `parts[1].blocks[1].lines` "[["Où est-ce que tu es ?","Where are you?"],["Quand est-ce que tu viens ?","When are you coming?"]]" → "[["Où est-ce que tu es ?","Where are you?"],["Quand est-ce que tu veux un café ?","When do you want a coffee?"],["Qu'est-ce que c'est ?","What is it?"],["Qu'est-ce que tu vois ?","What do you see?"],["Combien de livres est-ce que tu as ?","How many books do you have?"]]"
- `parts[2].blocks[0].rise[0].fr` "Tu viens ce soir." → "Tu veux un café."
- `parts[2].blocks[0].rise[0].en` "You are coming tonight." → "You want a coffee."
- `parts[2].blocks[0].rise[1].fr` "Tu viens ce soir ?" → "Tu veux un café ?"
- `parts[2].blocks[0].rise[1].en` "Are you coming tonight?" → "Do you want a coffee?"
- `parts[3].blocks[0].flip[0].fr` "Tu es prêt." → "Tu es fatigué."
- `parts[3].blocks[0].flip[0].en` "You are ready." → "You are tired."
- `parts[3].blocks[0].flip[0].parts[2][0]` "prêt" → "fatigué"
- `parts[3].blocks[0].flip[1].fr` "Es-tu prêt ?" → "Es-tu fatigué ?"
- `parts[3].blocks[0].flip[1].en` "Are you ready?" → "Are you tired?"
- `parts[3].blocks[0].flip[1].parts[3][0]` "prêt ?" → "fatigué ?"
- `checks[1].say` "Tu viens ce soir ?" → "Tu veux un café ?"
- `checks[1].show` "Tu viens ce soir ?" → "Tu veux un café ?"
- `checks[2].id` "k3" → "k3-fatigue"
- `checks[2].options[0].text` "Tu es prêt ?" → "Tu es fatigué ?"
- `checks[2].options[1].text` "Es-tu prêt ?" → "Es-tu fatigué ?"
- `checks[2].options[2].text` "Est-ce que tu es prêt ?" → "Est-ce que tu es fatigué ?"
- `checks[2].why` "The verb comes first, joined to tu with a hyphen: Es-tu prêt ?" → "The verb comes first, joined to tu with a hyphen: Es-tu fatigué ?"

**2024-01-19-stressed-pronouns**

- `concepts[0].term` "Stressed Pronouns (Pronoms Toniques)" → "Stressed pronouns"
- `concepts[0].definition` "Special pronouns used after prepositions, for emphasis, and alone" → "These pronouns stand on their own, come after a word such as avec, or add weight to who you mean."
- `concepts[0].examples` "(none)" → "["fr":"avec moi","en":"with me","fr":"pour toi","en":"for you","fr":"Moi ?","en":"Me?"]"
- `concepts[0].example` ""Can't use 'je' or 'tu' after 'avec' or 'pour' - need 'moi' and 'toi'!"" → "(removed)"
- `concepts[1].term` "When to Use Stressed Pronouns" → "When to use them"
- `concepts[1].definition` "After prepositions (avec, pour, sans, chez), for emphasis, or alone" → "Use them after a word such as avec, after c'est, and on their own as a one-word answer."
- `concepts[1].examples` "(none)" → "["fr":"Il est avec moi.","en":"He is with me.","fr":"C'est pour toi.","en":"It's for you.","fr":"C'est lui.","en":"It's him.","fr":"Moi ?","en":"Me?"]"
- `concepts[1].example` ""avec moi (with me), pour toi (for you), c'est lui (it's him), Moi? (Me?)"" → "(removed)"
- `concepts[2].term` "Subject vs. Stressed" → "Subject or stressed"
- `concepts[2].definition` "Subject pronouns go before verbs. Stressed pronouns go after prepositions." → "Subject pronouns go before the verb. Stressed pronouns go after a preposition."
- `concepts[2].examples` "(none)" → "["fr":"Je suis avec toi.","en":"I am with you.","fr":"Tu es avec moi.","en":"You are with me."]"
- `concepts[2].example` ""je suis (I am) BUT avec moi (with me) - different pronouns!"" → "(removed)"

**2024-01-20-prepositions**

- `concepts[0].term` "Prepositions Connect Ideas" → "Prepositions"
- `concepts[0].definition` "Small words that show relationships between nouns and pronouns" → "Small words such as with, in or under that link a noun or a pronoun to the rest of the sentence."
- `concepts[0].examples` "(none)" → "["fr":"avec moi","en":"with me","fr":"dans la maison","en":"in the house","fr":"sous la table","en":"under the table"]"
- `concepts[0].example` ""avec moi (with me), dans la maison (in the house), sous la table (under the table)"" → "(removed)"
- `concepts[1].term` "Spatial Prepositions" → "Where something is"
- `concepts[1].definition` "Describe physical location: in, on, under, in front, behind, between" → "These say where something is: on, under, in front of, behind or between."
- `concepts[1].examples` "(none)" → "["fr":"sur la table","en":"on the table","fr":"devant la maison","en":"in front of the house","fr":"Le livre est derrière la porte.","en":"The book is behind the door."]"
- `concepts[1].example` ""sur la table (on the table), sous le livre (under the book), devant la maison (in front of the house)"" → "(removed)"
- `concepts[2].term` "Relational Prepositions" → "With, for, at and from"
- `concepts[2].definition` "Show relationships: with, for, to, at, of, from" → "These link people and places: with, for, at, to and from."
- `concepts[2].examples` "(none)" → "["fr":"avec toi","en":"with you","fr":"pour moi","en":"for me","fr":"à Paris","en":"in Paris, to Paris","fr":"de France","en":"from France","fr":"chez Pierre","en":"at Pierre's place"]"
- `concepts[2].example` ""avec toi (with you), pour moi (for me), à Paris (to/at Paris), de France (from France)"" → "(removed)"
- `concepts[3].term` "Use with Stressed Pronouns!" → "After a preposition"
- `concepts[3].definition` "After prepositions, use moi/toi/lui (NOT je/tu/il)!" → "After a preposition, use a stressed pronoun such as moi, never a subject pronoun such as je."
- `concepts[3].examples` "(none)" → "["fr":"avec moi","en":"with me","fr":"pour toi","en":"for you","fr":"chez lui","en":"at his place","fr":"avec eux","en":"with them"]"
- `concepts[3].example` ""avec moi ✓ (not avec je ✗), pour toi ✓ (not pour tu ✗)"" → "(removed)"
- `concepts[4].term` "Building Real Sentences" → "Prepositions in sentences"
- `concepts[4].definition` "Combine with verbs, nouns, and stressed pronouns" → "Put the preposition and its noun after the verb, as in English."
- `concepts[4].examples` "(none)" → "["fr":"Le chat est sous la table.","en":"The cat is under the table.","fr":"Je suis devant la maison.","en":"I am in front of the house.","fr":"Je veux ça pour toi.","en":"I want this for you."]"
- `concepts[4].example` ""le chat est sous la table (the cat is under the table), je suis devant la maison (I am in front of the house)"" → "(removed)"

**2024-01-21-adjectives**

- `concepts[0].term` "Adjective Gender Agreement - Critical!" → "Adjectives match their noun"
- `concepts[0].definition` "Adjectives must match the gender of the noun they describe!" → "An adjective takes the gender of the noun it describes. Most add an -e for a feminine noun."
- `concepts[0].examples` "(none)" → "["fr":"J'ai un bon livre.","en":"I have a good book.","fr":"Elle a une bonne maison.","en":"She has a good house."]"
- `concepts[0].example` ""bon livre (masc) BUT bonne maison (fem)"" → "(removed)"
- `concepts[1].term` "Regular vs Irregular Forms" → "Regular and irregular forms"
- `concepts[1].definition` "Most adjectives add -e for feminine (petit→petite), but some are irregular (beau→belle)" → "Most adjectives add -e for the feminine, as petit does. A few change more, as nouveau and vieux do."
- `concepts[1].examples` "(none)" → "["fr":"un petit chat","en":"a small cat","fr":"une petite maison","en":"a small house","fr":"un nouveau livre","en":"a new book","fr":"une nouvelle voiture","en":"a new car","fr":"un vieux chat","en":"an old cat","fr":"une vieille maison","en":"an old house"]"
- `concepts[1].example` ""Regular: grand/grande. Irregular: nouveau/nouvelle, vieux/vieille"" → "(removed)"
- `concepts[2].term` "Same Form Both Genders" → "One form for both genders"
- `concepts[2].definition` "A few adjectives like 'jeune' and 'autre' don't change" → "A few adjectives, such as jeune and autre, have one form for both genders."
- `concepts[2].examples` "(none)" → "["fr":"un jeune homme","en":"a young man","fr":"une jeune femme","en":"a young woman","fr":"un autre livre","en":"another book","fr":"une autre voiture","en":"another car"]"
- `concepts[2].example` ""un jeune homme / une jeune femme (both use 'jeune')"" → "(removed)"
- `concepts[3].term` "Adjective Placement" → "Before the noun"
- `concepts[3].definition` "These common adjectives usually go BEFORE the noun (unlike most French adjectives)" → "These common adjectives go before the noun, while most French adjectives go after it."
- `concepts[3].examples` "(none)" → "["fr":"J'ai un petit chat.","en":"I have a small cat.","fr":"C'est un beau livre.","en":"It's a beautiful book.","fr":"Nous avons une belle maison.","en":"We have a beautiful house."]"
- `concepts[3].example` ""un petit chat (a small cat), NOT un chat petit"" → "(removed)"
- `concepts[4].term` "Before a Vowel: bel, nouvel, vieil" → "Before a vowel sound"
- `concepts[4].definition` "Before a masculine singular noun that starts with a vowel sound, 'beau', 'nouveau' and 'vieux' become 'bel', 'nouvel' and 'vieil'. Feminine forms do not change: 'une nouvelle amie'." → "Before a masculine noun that starts with a vowel sound, three of these adjectives change form so the words run together. Feminine forms stay the same."
- `concepts[4].examples` "(none)" → "["fr":"un bel enfant","en":"a beautiful child","fr":"un nouvel ami","en":"a new friend","fr":"un vieil homme","en":"an old man","fr":"une nouvelle amie","en":"a new friend, a woman"]"
- `concepts[4].example` ""un bel enfant, un nouvel ami, un vieil homme"" → "(removed)"

**2024-01-22-reading2**

- `title` "Reading Comprehension 2 - Rendez-vous en Normandie" → "Reading Comprehension - Rendez-vous en Normandie"
- `description` "An exciting trip through beautiful Normandy! Explore famous places using vocabulary from Units 1 & 2." → "An exciting trip through beautiful Normandy! Explore famous places with the words you know so far."
- `passage[6].fr` "Ça ? C'est un livre sur la Normandie. Il y a Mont-Saint-Michel, Rouen... Ces choses sont très belles !" → "Ça ? C'est un livre sur la Normandie. Mont-Saint-Michel, Rouen... Ces choses sont très belles !"
- `passage[6].en` "That? It's a book about Normandy. There's Mont-Saint-Michel, Rouen... These things are very beautiful!" → "That? It's a book about Normandy. Mont-Saint-Michel, Rouen... These things are very beautiful!"

**2024-01-23-unit2-practice**

- `title` "Unit 2 Practice - Fill in the Blanks" → "Asking & Describing Practice - Fill in the Blanks"
- `description` "Complete sentences using demonstratives, questions, prepositions, and adjectives from Unit 2!" → "Complete sentences using demonstratives, questions, prepositions, and adjectives from this unit!"
- `can_do[2]` "Apply Unit 2 vocabulary in realistic contexts" → "Apply this unit's vocabulary in realistic contexts"
- `items[1].text` "J'ai ___ voiture." → "J'ai ___ belle voiture."
- `items[1].gloss` "'I have this car' (feminine)" → "'I have this beautiful car' (feminine)"
- `items[15].text` "Nous ___ le livre." → "Nous ___ le nouveau livre."
- `items[15].gloss` "We want the book" → "We want the new book"
- `items[16].text` "Elle ___ cette maison." → "Elle ___ cette petite maison."
- `items[16].gloss` "She sees this house" → "She sees this little house"

**2024-01-24-unit2-exam**

- `description` "Test everything from Unit 2! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences." → "Test everything from this unit! Demonstratives, essential verbs (vouloir/pouvoir/voir), questions, stressed pronouns, prepositions, and descriptive sentences."
- `items[32].mistakes` "["answer":"elles sont à Ladurée","feedback":"That's acceptable but 'chez' is more natural for shops/businesses - use 'chez Ladurée'"]" → "(removed)"

**2024-01-25-contractions**

- `concepts[0].term` "Contractions with 'de' (of/from)" → "de with le and les"
- `concepts[0].definition` "de + le = du, de + les = des (but de + la stays separate!)" → "De with le becomes du. With les it becomes des, but de la stays as it is."
- `concepts[0].examples` "(none)" → "["fr":"du chat","en":"of the cat","fr":"de la maison","en":"of the house","fr":"des livres","en":"of the books"]"
- `concepts[0].example` ""du chat (of the cat), de la maison (of the house), des livres (of the books)"" → "(removed)"
- `concepts[1].term` "Contractions with 'à' (to/at)" → "à with le and les"
- `concepts[1].definition` "à + le = au, à + les = aux (but à + la stays separate!)" → "À with le becomes au. With les it becomes aux, but à la stays as it is."
- `concepts[1].examples` "(none)" → "["fr":"Je suis au café avec eux.","en":"I'm at the café with them.","fr":"Le chat est à la maison.","en":"The cat is at home.","fr":"aux amis","en":"to the friends"]"
- `concepts[1].example` ""au café (at the café), à la maison (at the house), aux amis (to the friends)"" → "(removed)"
- `concepts[2].term` "Partitive Articles (some/any)" → "Some"
- `concepts[2].definition` "Use du/de la/de l'/des to mean 'some' (unspecified quantity)" → "The same words also mean some, for an amount you do not count. English often leaves the word out."
- `concepts[2].examples` "(none)" → "["fr":"Je veux du café.","en":"I want some coffee.","fr":"de la musique","en":"some music","fr":"J'ai des livres.","en":"I have some books."]"
- `concepts[2].example` ""du pain (some bread), de la viande (some meat), de l'eau (some water)"" → "(removed)"
- `concepts[3].term` "Before Vowels" → "Before a vowel"
- `concepts[3].definition` "de + l' and à + l' before vowel sounds (no contraction needed)" → "Before a vowel sound, de and à take l' for both genders."
- `concepts[3].examples` "(none)" → "["fr":"de l'ami","en":"of the friend","fr":"à l'hôtel","en":"at the hotel"]"
- `concepts[3].example` ""de l'ami (of the friend), à l'école (at the school)"" → "(removed)"

**2024-01-26-venir**

- `concepts[0].definition` "Essential irregular verb for coming or arriving! One of the most common verbs in French. Used constantly in conversation." → "The verb for coming and arriving. You hear it all the time in conversation."
- `concepts[0].examples` "(none)" → "["fr":"Je viens !","en":"I'm coming!","fr":"Qui vient ?","en":"Who is coming?","fr":"Je viens de Paris.","en":"I'm from Paris.","fr":"Je viens avec lui.","en":"I'm coming with him.","fr":"Je viens te voir.","en":"I'm coming to see you."]"
- `concepts[0].example` ""'I am coming' (Je viens), 'Who is coming?' (Qui vient?), 'I come from Paris' (Je viens de Paris)"" → "(removed)"
- `concepts[1].term` "Irregular Conjugation Pattern" → "Three stems"
- `concepts[1].definition` "Notice the pattern: je/tu both use 'viens', then il/elle use 'vient', nous uses 'venons', and ils/elles use 'viennent' with double 'n'!" → "The stem changes three times: once for the singular, once for we and you, and once for they, which doubles the n."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je viens","en":"I come","fr":"tu viens","en":"you come","fr":"il vient","en":"he comes","fr":"nous venons","en":"we come","fr":"vous venez","en":"you come","fr":"ils viennent","en":"they come"]"
- `concepts[1].example` ""je viens, tu viens, il vient, nous venons, vous venez, ils viennent"" → "(removed)"
- `concepts[2].term` "Composition Power" → "venir after another verb"
- `concepts[2].definition` "Combine venir with previous modules for infinite expressions. For example, to say 'I want to come' you can say 'je veux venir'." → "Like other verbs, venir can come straight after vouloir or pouvoir."
- `concepts[2].examples` "(none)" → "["fr":"Je veux venir.","en":"I want to come.","fr":"Tu peux venir ?","en":"Can you come?","fr":"Je peux venir à l'hôtel.","en":"I can come to the hotel."]"
- `concepts[2].example` ""je viens + de ça, nous venons + avec vous, ils viennent + voir"" → "(removed)"
- `concepts[3].term` "The re- Prefix" → "re- in front"
- `concepts[3].definition` "Adding 're-' to a verb means 'again' or 'back'. So 'revenir' means 'to come back' or 'to return'. It follows the same conjugation pattern as 'venir' - just add 're-' before each form!" → "Adding re- to a verb often means again or back, so revenir means to come back. Its forms are the forms of venir with re- in front."
- `concepts[3].examples` "(none)" → "["fr":"Je reviens.","en":"I'm coming back.","fr":"Tu reviens ?","en":"Are you coming back?"]"
- `concepts[3].example` ""venir → revenir (to come → to come back), je viens → je reviens, il vient → il revient"" → "(removed)"

**2024-01-27-aller**

- `concepts[0].definition` "Completely irregular verb - one of the most common in French! Essential for talking about movement and future plans." → "The verb for going somewhere. With a second verb after it, it also says what is going to happen."
- `concepts[0].examples` "(none)" → "["fr":"Je vais au café.","en":"I'm going to the café.","fr":"Je vais voir Paul.","en":"I'm going to see Paul.","fr":"Il va me voir.","en":"He's going to see me."]"
- `concepts[0].example` ""'I am going in the house' (Je vais dans la maison), 'I am going to eat' (Je vais manger)"" → "(removed)"
- `concepts[1].term` "Irregular Conjugation" → "Its forms"
- `concepts[1].definition` "Every form is different - but it shouldn't be too hard to remember!" → "Almost every form is different, so learn each one with its pronoun."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je vais","en":"I go","fr":"tu vas","en":"you go","fr":"il va","en":"he goes","fr":"nous allons","en":"we go","fr":"vous allez","en":"you go","fr":"ils vont","en":"they go"]"
- `concepts[1].example` ""je vais, tu vas, il va, nous allons, vous allez, ils vont"" → "(removed)"
- `concepts[2].term` "Composition Power" → "Going to do something"
- `concepts[2].definition` "Combine aller with previous modules for infinite expressions. For example, to say 'I am going to leave' you can say 'je vais partir'." → "Put a second verb after aller to say what is going to happen, as in English."
- `concepts[2].examples` "(none)" → "["fr":"Je vais venir.","en":"I'm going to come.","fr":"Je vais avoir ça.","en":"I'm going to have that.","fr":"Qu'est-ce que tu vas avoir ?","en":"What are you going to have?"]"
- `concepts[2].example` ""je vais + ça, nous allons + être, ils vont + avoir"" → "(removed)"
- `items[19].accept` "["qu'est-ce que tu as?"]" → "(removed)"

**2024-01-28-verb-pattern-help**

- `parts[3].note` "The -ent is written but never spoken. In writing, it tells you that several people are doing something. It can change how the letters before it sound, so ils veulent sounds a little different from il veut." → "The -ent is written but not spoken. In writing, it tells you that several people are doing something. It can change how the letters before it sound, so ils veulent sounds a little different from il veut."
- `parts[7].blocks[0].list[2]` "Most verbs you meet next follow these patterns, starting with partir in the next lesson." → "Most verbs you meet next follow these patterns, starting with the verb for 'to leave' in the next lesson."
- `checks[1].why` "The -ent is written but never spoken." → "The -ent is written but not spoken."

**2024-01-29-partir**

- `vocabulary/je-pars-fr` ""word_id":"je-pars-fr","fr":"je pars","gloss":"I leave / I'm leaving","note":"partir"" → "(removed)"
- `vocabulary/tu-pars-fr` ""word_id":"tu-pars-fr","fr":"tu pars","gloss":"you leave (informal)","note":"same as je!"" → "(removed)"
- `vocabulary/il-part-fr` ""word_id":"il-part-fr","fr":"il part","gloss":"he leaves","note":"drops -s"" → "(removed)"
- `vocabulary/elle-part-fr` ""word_id":"elle-part-fr","fr":"elle part","gloss":"she leaves","note":"same as il"" → "(removed)"
- `vocabulary/nous-partons-fr` ""word_id":"nous-partons-fr","fr":"nous partons","gloss":"we leave","note":"add -ons to stem"" → "(removed)"
- `vocabulary/vous-partez-fr` ""word_id":"vous-partez-fr","fr":"vous partez","gloss":"you leave (formal)","note":"add -ez"" → "(removed)"
- `vocabulary/ils-partent-fr` ""word_id":"ils-partent-fr","fr":"ils partent","gloss":"they leave (masc)","note":"add -ent"" → "(removed)"
- `vocabulary/elles-partent-fr` ""word_id":"elles-partent-fr","fr":"elles partent","gloss":"they leave (fem)","note":"same as ils"" → "(removed)"
- `concepts[0].term` "partir = to leave / to depart" → "partir = to leave"
- `concepts[0].definition` "Common verb for leaving a place or departing" → "The verb for leaving a place or setting off on a trip."
- `concepts[0].examples` "(none)" → "["fr":"Je pars avec toi.","en":"I'm leaving with you.","fr":"Quand est-ce que tu pars ?","en":"When are you leaving?","fr":"Nous partons en Normandie.","en":"We're leaving for Normandy.","fr":"Elle part avec eux.","en":"She's leaving with them."]"
- `concepts[0].example` ""Essential for talking about travel and movement away from places"" → "(removed)"
- `concepts[1].term` "Regular -ir Conjugation" → "The t you hear only in the plural"
- `concepts[1].definition` "Follows standard -ir pattern (drop singular endings)" → "In the singular forms you hear no t. In the plural forms the t comes back and is heard."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je pars","en":"I leave","fr":"tu pars","en":"you leave","fr":"il part","en":"he leaves","fr":"nous partons","en":"we leave","fr":"vous partez","en":"you leave","fr":"ils partent","en":"they leave"]"
- `concepts[1].example` ""Singular: je/tu pars, il part. Plural: nous partons, vous partez"" → "(removed)"
- `concepts[2].term` "Composition Power" → "partir after another verb"
- `concepts[2].definition` "Combine partir with previous modules for infinite expressions" → "Partir goes straight after the verbs for wanting, being able and going."
- `concepts[2].examples` "(none)" → "["fr":"Je veux partir.","en":"I want to leave.","fr":"Tu peux partir ?","en":"Can you leave?","fr":"On va partir.","en":"We're going to leave."]"
- `concepts[2].example` ""je pars + ça, nous partons + être, ils partent + avoir"" → "(removed)"
- `conjugation` "(none)" → ""verb":"partir","en":"to leave","aspect":"progressive","note":"partir drops its t in je pars, tu pars and il part, where you hear no t. The t comes back, and is heard, in ils partent, vous partez and nous partons.""

**2024-01-30-object-pronouns**

- `concepts[0].term` "Object Pronouns" → "Object pronouns"
- `concepts[0].definition` "Pronouns that receive the action of a verb (me, you, him, her, us, them)" → "An object pronoun stands for the person or thing the action happens to: me, you, him, her, it, us or them."
- `concepts[0].examples` "(none)" → "["fr":"Il me voit.","en":"He sees me.","fr":"Tu nous vois.","en":"You see us.","fr":"Je les ai.","en":"I have them."]"
- `concepts[0].example` ""7 object pronouns to learn - different from subject pronouns!"" → "(removed)"
- `concepts[1].term` "Critical Placement Rule" → "Before the verb"
- `concepts[1].definition` "Object pronouns go BEFORE the verb in French (opposite of English!)" → "French puts the object pronoun before the verb, the other way round from English."
- `concepts[1].examples` "(none)" → "["fr":"Je le vois.","en":"I see him.","fr":"Je la vois.","en":"I see her.","fr":"Elle l'a.","en":"She has it."]"
- `concepts[1].example` ""English: 'I see HIM', French: 'I HIM see' - pronoun comes first"" → "(removed)"
- `concepts[2].term` "Subject vs Object" → "Subject or object"
- `concepts[2].definition` "Subject does action (he/she), object receives action (him/her)" → "The subject does the action and the object receives it. Il is he, and le is him."
- `concepts[2].examples` "(none)" → "["fr":"Il voit Paul.","en":"He sees Paul.","fr":"Paul le voit.","en":"Paul sees him."]"
- `concepts[2].example` ""Don't confuse subject and object pronouns - they're different words!"" → "(removed)"

**2024-01-31-possessive-adjectives**

- `concepts[0].term` "Possessive Adjectives Overview" → "Possessive adjectives"
- `concepts[0].definition` "Words that show ownership and go directly before the noun they modify" → "These words say whose something is. They go right before the noun, where le or un would go."
- `concepts[0].examples` "(none)" → "["fr":"mon livre","en":"my book","fr":"ta maison","en":"your house","fr":"ses enfants","en":"his children, her children","fr":"notre voiture","en":"our car","fr":"Je vais au café avec mon ami.","en":"I'm going to the café with my friend."]"
- `concepts[0].example` ""15 total forms: MY (mon/ma/mes), YOUR informal (ton/ta/tes), HIS/HER (son/sa/ses), OUR (notre/nos), YOUR formal (votre/vos), THEIR (leur/leurs)"" → "(removed)"
- `concepts[1].term` "🔑 CRITICAL RULE: Agreement with the THING owned" → "It matches the thing owned"
- `concepts[1].definition` "The possessive adjective matches the gender/number of the THING being owned, NOT the owner" → "The possessive takes the gender and number of the thing owned, never of the owner."
- `concepts[1].examples` "(none)" → "["fr":"Marie a son livre.","en":"Marie has her book.","note":"son, since livre is masculine","fr":"Paul a sa voiture.","en":"Paul has his car.","note":"sa, since voiture is feminine"]"
- `concepts[1].example` ""Marie's book = SON livre (masculine 'son' because 'livre' is masculine, even though Marie is female). Pierre's house = SA maison (feminine 'sa' because 'maison' is feminine, even though Pierre is male)"" → "(removed)"
- `concepts[2].term` "Formal vs Informal 'Your'" → "Two ways to say your"
- `concepts[2].definition` "French has two ways to say 'your' depending on relationship and respect level" → "Use the tu words for your with a friend, and the vous words with someone you do not know or with a group."
- `concepts[2].examples` "(none)" → "["fr":"ton ami","en":"your friend","note":"to someone you call tu","fr":"ta maison","en":"your house","note":"to someone you call tu","fr":"votre maison","en":"your house","note":"to someone you call vous","fr":"vos amis","en":"your friends","note":"to someone you call vous"]"
- `concepts[2].example` ""INFORMAL with friends/family: ton/ta/tes (ton frère, ta sœur, tes amis). FORMAL with strangers/respect: votre/vos (votre bureau, vos bagages)"" → "(removed)"
- `concepts[3].term` "Gender-Neutral Forms" → "One form for both genders"
- `concepts[3].definition` "Some possessives don't change for masculine/feminine - only for singular/plural" → "Our, your and their have no masculine or feminine forms. They change only for the plural."
- `concepts[3].examples` "(none)" → "["fr":"notre maison","en":"our house","fr":"notre ami","en":"our friend","fr":"nos enfants","en":"our children","fr":"votre livre","en":"your book","fr":"leur chat","en":"their cat","fr":"leurs amis","en":"their friends"]"
- `concepts[3].example` ""NOTRE/NOS (our): notre maison, notre jardin, nos enfants. VOTRE/VOS (your formal): votre livre, votre famille, vos idées. LEUR/LEURS (their): leur chat, leur maison, leurs amis"" → "(removed)"
- `concepts[4].term` "Memory Trick: The 3-2-2 Pattern" → "Three forms or two"
- `concepts[4].definition` "Each owner has a predictable number of forms to memorize" → "My, your and his or her have three forms: masculine, feminine and plural. Our, your and their have two: singular and plural."
- `concepts[4].examples` "(none)" → "["fr":"mon livre","en":"my book","fr":"ma maison","en":"my house","fr":"mes livres","en":"my books","fr":"notre livre","en":"our book","fr":"nos livres","en":"our books"]"
- `concepts[4].example` ""MY, YOUR (informal), HIS/HER = 3 forms each (masc/fem/plural). OUR, YOUR (formal), THEIR = 2 forms each (singular/plural only)"" → "(removed)"

**2024-02-01-possessive-pronouns**

- `concepts[0].term` "Possessive Pronouns" → "Possessive pronouns"
- `concepts[0].definition` "Stand-alone words meaning 'mine', 'yours', 'his', etc." → "These stand on their own and mean mine, yours, his and so on. They take the place of a noun you already named."
- `concepts[0].examples` "(none)" → "["fr":"C'est le mien.","en":"It's mine.","fr":"C'est la sienne.","en":"It's his or hers.","fr":"C'est le leur.","en":"It's theirs."]"
- `concepts[0].example` ""C'est le mien = It's mine, C'est la sienne = It's his/hers"" → "(removed)"
- `concepts[1].term` "With Article" → "With its article"
- `concepts[1].definition` "Always use 'le' or 'la' before the possessive pronoun" → "A possessive pronoun always comes with its article, le or la."
- `concepts[1].examples` "(none)" → "["fr":"le mien","en":"mine","note":"for a masculine thing","fr":"la mienne","en":"mine","note":"for a feminine thing"]"
- `concepts[1].example` ""LE mien (mine-masc), LA mienne (mine-fem)"" → "(removed)"
- `concepts[2].term` "Gender Agreement" → "It matches the thing owned"
- `concepts[2].definition` "Agrees with the THING owned, not the owner" → "Like the possessive adjectives, it agrees with the thing owned, not with the owner."
- `concepts[2].examples` "(none)" → "["fr":"Le livre ? C'est le sien.","en":"The book? It's hers.","fr":"La voiture ? C'est la sienne.","en":"The car? It's his."]"
- `concepts[2].example` ""le sien = his/hers (masculine thing), la sienne = his/hers (feminine thing)"" → "(removed)"

**2024-02-02-combining**

- `concepts[0].term` "Sentence Building" → "Who has what"
- `concepts[0].definition` "Combine subject + verb + object/possessive to make real sentences" → "Put a subject and a verb with an object pronoun or a possessive to say who has what."
- `concepts[0].examples` "(none)" → "["fr":"Il l'a.","en":"He has it.","fr":"Ils les ont.","en":"They have them.","fr":"C'est le mien.","en":"It's mine."]"
- `concepts[0].example` ""Use everything from previous 9 modules together!"" → "(removed)"
- `concepts[1].term` "Object Pronoun Placement" → "The pronoun before the verb"
- `concepts[1].definition` "Object pronouns go BEFORE the verb in French (opposite of English!)" → "The object pronoun comes before the verb, even where English puts it after."
- `concepts[1].examples` "(none)" → "["fr":"Je le veux.","en":"I want it.","fr":"Elle l'a.","en":"She has it."]"
- `concepts[1].example` ""English: 'I see IT', French: 'I IT see' - pronoun comes first"" → "(removed)"
- `concepts[2].term` "Possessive Constructions" → "Two ways to say whose"
- `concepts[2].definition` "Multiple ways to express ownership in French" → "Use a possessive before a noun, as in my book, or a pronoun on its own, as in mine."
- `concepts[2].examples` "(none)" → "["fr":"C'est mon livre.","en":"It's my book.","fr":"C'est le mien.","en":"It's mine.","fr":"Est-ce le tien ?","en":"Is it yours?"]"
- `concepts[2].example` ""Choose between possessive adjectives and possessive pronouns"" → "(removed)"
- `items[9].hint` "Combine vouloir from M12 + object pronoun BEFORE verb" → "Combine vouloir + object pronoun BEFORE verb"
- `items[10].hint` "Combine venir (M17) + avec (M14) + moi" → "Combine venir + avec + moi"
- `items[11].hint` "Combine aller (M18) + partir infinitive (M19) - future construction!" → "Combine aller + partir infinitive - future construction!"

**2024-02-03-reading3**

- `title` "Reading Comprehension 3 - La Première Page" → "Reading Comprehension - La Première Page"

**2024-02-04-unit3-practice**

- `title` "Unit 3 Practice - Fill in the Blanks" → "Movement & Possession Practice - Fill in the Blanks"
- `description` "Master contractions, motion verbs, object pronouns, and possessive forms from Unit 3!" → "Master contractions, motion verbs, object pronouns, and possessive forms from this unit!"
- `can_do[2]` "Apply Unit 3 advanced structures in context" → "Apply this unit's advanced structures in context"
- `items[4].text` "Nous ___ demain." → "Nous ___ avec Paul."
- `items[4].gloss` "We leave tomorrow" → "We leave with Paul"
- `items[14].text` "Elle ___ ___ magasin." → "Elle ___ ___ café."
- `items[14].gloss` "'She comes from the store' (use contraction)" → "'She comes from the café' (use contraction)"

**2024-02-05-unit3-exam**

- `description` "Test everything from Unit 3! Motion verbs, object pronouns, possessives, and complex sentence combinations." → "Test everything from this unit! Motion verbs, object pronouns, possessives, and complex sentence combinations."

**2024-03-31-survival-phrases**

- `concepts[0].term` "Polite Requests" → "Asking politely"
- `concepts[0].definition` "Use 'je voudrais' (I would like) instead of 'je veux' - much more polite!" → "Je voudrais means I would like. It sounds softer than je veux, so use it in shops and cafés."
- `concepts[0].examples` "(none)" → "["fr":"Je voudrais un café, s'il vous plaît.","en":"I would like a coffee, please.","fr":"Je voudrais un croissant, s'il vous plaît.","en":"I would like a croissant, please.","note":"at a bakery","fr":"L'addition, s'il vous plaît.","en":"The bill, please."]"
- `concepts[0].example` ""At a bakery: 'Je voudrais un croissant, s'il vous plaît'"" → "(removed)"
- `concepts[1].term` "Essential Questions" → "Prices and places"
- `concepts[1].definition` "Phrases for prices, locations, and understanding" → "Two questions you ask on any trip: what something costs and where something is."
- `concepts[1].examples` "(none)" → "["fr":"C'est combien ?","en":"How much is it?","fr":"Combien ça coûte ?","en":"How much does it cost?","fr":"Où sont les toilettes ?","en":"Where are the restrooms?"]"
- `concepts[1].example` ""C'est combien? (How much?), Où sont les toilettes? (Where's the bathroom?)"" → "(removed)"
- `concepts[2].term` "Polite Words" → "Polite words"
- `concepts[2].definition` "Please, excuse me, good night - essential politeness" → "Short words that keep a conversation friendly. Say s'il vous plaît to a stranger and s'il te plaît to a friend."
- `concepts[2].examples` "(none)" → "["fr":"Excusez-moi.","en":"Excuse me.","fr":"Pardon !","en":"Sorry!","fr":"Bonne journée !","en":"Have a good day!","fr":"Bonne nuit !","en":"Good night!"]"
- `concepts[2].example` ""S'il vous plaît, excusez-moi, bonne nuit"" → "(removed)"
- `concepts[3].term` "Restrooms Always Plural" → "les toilettes is plural"
- `concepts[3].definition` "When asking for restrooms, always use plural 'les toilettes' and 'où sont'" → "French always says the restrooms in the plural, so the question uses sont, the plural of est."
- `concepts[3].examples` "(none)" → "["fr":"Où sont les toilettes ?","en":"Where are the restrooms?","fr":"Excusez-moi, où sont les toilettes ?","en":"Excuse me, where are the restrooms?"]"
- `concepts[3].example` ""Où + sont + les toilettes? (Never 'où est la toilette')"" → "(removed)"

**2024-03-25-faire**

- `concepts[0].term` "faire = to do/make" → "faire = to do, to make"
- `concepts[0].definition` "Extremely versatile verb - doing actions and making things" → "One verb for doing things and for making things. You use it every day."
- `concepts[0].examples` "(none)" → "["fr":"Je fais ça.","en":"I do that.","fr":"Qu'est-ce que tu fais ?","en":"What are you doing?","fr":"Qu'est-ce que tu vas faire ?","en":"What are you going to do?"]"
- `concepts[0].example` ""Used constantly in daily life - one of the top 15 words!"" → "(removed)"
- `concepts[1].term` "Irregular Pattern" → "The forms of faire"
- `concepts[1].definition` "faire is irregular - but you've seen a pattern like this before!" → "The three singular forms sound the same. vous faites ends like vous êtes, and ils font like ils sont."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je fais","en":"I do","fr":"tu fais","en":"you do","fr":"il fait","en":"he does","fr":"nous faisons","en":"we do","fr":"vous faites","en":"you do","fr":"ils font","en":"they do"]"
- `concepts[1].example` ""je fais, tu fais, il fait, elle fait, are all the same sounding, but different spellings. Nous faisons, vous faites, ils font, elles font are like the other irregular verbs you've learned. Easy!"" → "(removed)"
- `concepts[2].term` "Composition Power" → "faire after another verb"
- `concepts[2].definition` "Combine faire with previous modules for infinite expressions" → "Put faire after another verb to say what you want, can or are going to do. It stays as it is."
- `concepts[2].examples` "(none)" → "["fr":"Je veux faire ça.","en":"I want to do that.","fr":"Je peux faire ça.","en":"I can do that.","fr":"Je vais faire ça.","en":"I'm going to do that."]"
- `concepts[2].example` ""je fais + ça, nous faisons + le travail, ils font + attention"" → "(removed)"

**2024-03-23-devoir**

- `concepts[0].term` "devoir = must / to have to" → "devoir = must, to have to"
- `concepts[0].definition` "Express obligation, necessity, or moral duty" → "The verb for what you must do. The verb after it stays as it is."
- `concepts[0].examples` "(none)" → "["fr":"Je dois faire ça.","en":"I have to do that.","fr":"Il doit partir maintenant.","en":"He has to leave now.","fr":"Nous devons aller à Paris.","en":"We have to go to Paris."]"
- `concepts[0].example` ""Essential for saying 'I must...' or 'I have to...' - very common!"" → "(removed)"
- `concepts[1].term` "Key Forms to Master" → "The forms of devoir"
- `concepts[1].definition` "je/tu dois (same!), il/elle doit, nous devons" → "The three singular forms sound the same. The stem changes for we and you, and again for they."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je dois","en":"I must","fr":"tu dois","en":"you must","fr":"il doit","en":"he must","fr":"nous devons","en":"we must","fr":"vous devez","en":"you must","fr":"ils doivent","en":"they must"]"
- `concepts[1].example` ""Notice: je and tu have the SAME form - both 'dois'"" → "(removed)"
- `concepts[2].term` "Composition Power" → "Asking what someone has to do"
- `concepts[2].definition` "Combine devoir with previous modules for infinite expressions" → "Put devoir in a question to ask what someone has to do, or when."
- `concepts[2].examples` "(none)" → "["fr":"Qu'est-ce que tu dois faire ?","en":"What do you have to do?","fr":"Quand dois-tu partir ?","en":"When do you have to leave?","fr":"Pourquoi dois-tu partir ?","en":"Why do you have to leave?"]"
- `concepts[2].example` ""je dois + ça, nous devons + être, ils doivent + avoir"" → "(removed)"

**2024-03-29-parler**

- `concepts[0].term` "parler = to speak / to talk" → "parler = to speak, to talk"
- `concepts[0].definition` "Talk about languages you speak and conversations you have" → "The verb for speaking a language and for talking with people."
- `concepts[0].examples` "(none)" → "["fr":"Je parle français.","en":"I speak French.","fr":"Nous parlons ensemble.","en":"We're talking together.","fr":"Je parle français maintenant.","en":"I speak French now."]"
- `concepts[0].example` ""je parle français (I speak French), nous parlons ensemble (we talk together)"" → "(removed)"
- `concepts[1].term` "Regular -ER Verb Pattern" → "The -er pattern"
- `concepts[1].definition` "This is THE standard French verb pattern - master it!" → "Most French verbs end in -er and change like parler. Take off the -er and add the ending for each person."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je parle","en":"I speak","fr":"tu parles","en":"you speak","fr":"il parle","en":"he speaks","fr":"nous parlons","en":"we speak","fr":"vous parlez","en":"you speak","fr":"ils parlent","en":"they speak"]"
- `concepts[1].example` ""Remove -er, add: -e, -es, -e, -ons, -ez, -ent (most verbs follow this!)"" → "(removed)"
- `concepts[2].term` "Silent Endings" → "Endings you do not hear"
- `concepts[2].definition` "je/tu/il/elle/ils/elles all SOUND the same! Only nous/vous are different" → "The endings -e, -es and -ent are silent. Only the forms for we and you sound different."
- `concepts[2].examples` "(none)" → "["fr":"Il parle français.","en":"He speaks French.","fr":"Ils parlent français.","en":"They speak French.","note":"sounds just like il parle","fr":"Nous parlons français.","en":"We speak French.","note":"here you hear the ending"]"
- `concepts[2].example` ""je parle, tu parles, il parle, elle parle, ils parlent - all sound like 'parl'"" → "(removed)"
- `concepts[3].term` "With Prepositions" → "Talking to someone"
- `concepts[3].definition` "Use 'à' when talking TO someone: parler à quelqu'un" → "Use à before the person you talk to."
- `concepts[3].examples` "(none)" → "["fr":"Je parle à Marie.","en":"I'm talking to Marie.","fr":"Tu parles à qui ?","en":"Who are you talking to?"]"
- `concepts[3].example` ""je parle à Marie (I speak to Marie)"" → "(removed)"
- `concepts[4].term` "Common Uses" → "Talking with someone, about something"
- `concepts[4].definition` "Describe languages (parler français), conversations (parler avec), topics (parler de)" → "Use avec for the person you talk with, and de for what or who you talk about."
- `concepts[4].examples` "(none)" → "["fr":"Je parle avec Marie.","en":"I'm talking with Marie.","fr":"Nous parlons de toi.","en":"We're talking about you.","fr":"Il parle de la maison.","en":"He's talking about the house."]"
- `concepts[4].example` ""je parle français (I speak French), nous parlons de toi (we talk about you)"" → "(removed)"

**2024-10-22-search-find**

- `concepts[0].term` "chercher - to search/look for" → "chercher = to look for"
- `concepts[0].definition` "Active searching - when you're looking for something but haven't found it yet" → "You are looking for something you have not found yet."
- `concepts[0].examples` "(none)" → "["fr":"Je cherche mon livre.","en":"I'm looking for my book.","fr":"Tu cherches quoi ?","en":"What are you looking for?"]"
- `concepts[0].example` ""je cherche mes clés (I'm looking for my keys), tu cherches quoi? (what are you looking for?)"" → "(removed)"
- `concepts[1].term` "trouver - to find" → "trouver = to find"
- `concepts[1].definition` "Successfully locating something - the result of searching" → "The verb for the moment the search ends and you have the thing."
- `concepts[1].examples` "(none)" → "["fr":"Je trouve le livre.","en":"I find the book.","fr":"Tu trouves ça où ?","en":"Where do you find that?"]"
- `concepts[1].example` ""j'ai trouvé! (I found it!), tu trouves ça où? (where do you find that?)"" → "(removed)"
- `concepts[2].term` "Common Usage Patterns" → "Looking, then finding"
- `concepts[2].definition` "These verbs are used constantly in daily French conversation" → "chercher is the search and trouver is the result."
- `concepts[2].examples` "(none)" → "["fr":"Je cherche mon chat.","en":"I'm looking for my cat.","fr":"Je trouve mon chat.","en":"I find my cat."]"
- `concepts[2].example` ""je cherche + noun (I'm looking for...), je trouve + noun (I find...)"" → "(removed)"
- `concepts[3].term` "With Prepositions" → "No word for "for""
- `concepts[3].definition` "chercher takes direct objects, trouver can use various prepositions" → "chercher already means to look for, so nothing goes between the verb and the thing."
- `concepts[3].examples` "(none)" → "["fr":"Je cherche le livre.","en":"I'm looking for the book.","fr":"Nous cherchons la maison.","en":"We're looking for the house.","fr":"Il cherche la voiture.","en":"He's looking for the car."]"
- `concepts[3].example` ""je cherche le livre (I'm looking for the book), je trouve dans la maison (I find in the house)"" → "(removed)"

**2024-03-28-negation**

- `concepts[0].term` "The Negation Sandwich" → "ne … pas around the verb"
- `concepts[0].definition` "Put 'ne' BEFORE the verb and 'pas' AFTER the verb" → "Put ne before the verb and pas after it."
- `concepts[0].examples` "(none)" → "["fr":"Je suis au café.","en":"I'm at the café.","fr":"Je ne suis pas au café.","en":"I'm not at the café.","fr":"Elle ne veut pas ça.","en":"She doesn't want that."]"
- `concepts[0].example` ""je suis → je ne suis pas (I am → I am not)"" → "(removed)"
- `concepts[1].term` "ne contracts to n'" → "ne becomes n'"
- `concepts[1].definition` "Before vowels or silent h, 'ne' becomes 'n''" → "Before a vowel or a silent h, ne drops its e."
- `concepts[1].examples` "(none)" → "["fr":"Il n'a pas le livre.","en":"He doesn't have the book.","fr":"Elle n'est pas au café.","en":"She isn't at the café."]"
- `concepts[1].example` ""je ai → je n'ai pas (I don't have)"" → "(removed)"
- `concepts[2].term` "Works with ALL Verbs" → "Any verb"
- `concepts[2].definition` "Any verb you've learned can be negated with ne...pas" → "ne … pas works the same way with every verb you know."
- `concepts[2].examples` "(none)" → "["fr":"Je ne veux pas ça.","en":"I don't want that.","fr":"Tu ne vas pas à Paris.","en":"You're not going to Paris.","fr":"Il ne parle pas français.","en":"He doesn't speak French."]"
- `concepts[2].example` ""je veux → je ne veux pas, tu vas → tu ne vas pas"" → "(removed)"
- `concepts[3].term` "With Object Pronouns" → "With an object pronoun"
- `concepts[3].definition` "Object pronouns stay BEFORE the verb, inside the sandwich" → "A pronoun like le stays before the verb, inside ne … pas."
- `concepts[3].examples` "(none)" → "["fr":"Je le vois.","en":"I see it.","fr":"Je ne le vois pas.","en":"I don't see it.","fr":"Il ne la voit pas.","en":"He doesn't see her."]"
- `concepts[3].example` ""je le vois → je ne le vois pas (I don't see it)"" → "(removed)"

**2024-04-01-time-adverbs**

- `concepts[0].term` "Frequency Adverbs" → "How often"
- `concepts[0].definition` "Words that express how often something happens" → "These words say how often something happens."
- `concepts[0].examples` "(none)" → "["fr":"Je vais souvent au café.","en":"I often go to the café.","fr":"Je mange parfois ici.","en":"I sometimes eat here.","fr":"Il parle rarement.","en":"He rarely talks."]"
- `concepts[0].example` ""toujours (always), jamais (never)"" → "(removed)"
- `concepts[1].term` "Time Expressions" → "When"
- `concepts[1].definition` "Words that express when something happens" → "These words say when something happens."
- `concepts[1].examples` "(none)" → "["fr":"Je mange maintenant.","en":"I'm eating now.","fr":"Il va à Paris aujourd'hui.","en":"He's going to Paris today.","fr":"Je veux ça demain.","en":"I want that tomorrow."]"
- `concepts[1].example` ""maintenant (now), aujourd'hui (today), demain (tomorrow), hier (yesterday)"" → "(removed)"
- `concepts[2].term` "Position in Sentence" → "Where these words go"
- `concepts[2].definition` "Usually placed AFTER the verb in French" → "Words for how often come right after the verb. Words for when can go at the end or at the start."
- `concepts[2].examples` "(none)" → "["fr":"Nous sommes toujours ici.","en":"We're always here.","fr":"Je veux juste ça.","en":"I just want that.","fr":"Demain, je vais à Paris.","en":"Tomorrow I'm going to Paris."]"
- `concepts[2].example` ""je vais maintenant (I go now), il a toujours (he always has)"" → "(removed)"

**2024-03-27-negation-2**

- `concepts[0].term` "Negating Modal Verbs" → "I can't, I don't want to"
- `concepts[0].definition` "Apply ne...pas to vouloir, pouvoir, aller, voir" → "Put ne … pas around pouvoir or vouloir. The second verb comes after pas."
- `concepts[0].examples` "(none)" → "["fr":"Je ne peux pas.","en":"I can't.","fr":"Je ne veux pas.","en":"I don't want to.","fr":"Tu ne peux pas avoir ça.","en":"You can't have that."]"
- `concepts[0].example` ""je peux → je ne peux pas (I can't), je veux → je ne veux pas (I won't/don't want)"" → "(removed)"
- `concepts[1].term` "ne...jamais (never)" → "ne … jamais = never"
- `concepts[1].definition` "Replace 'pas' with 'jamais' to mean 'never'" → "Put jamais where pas goes to say never."
- `concepts[1].examples` "(none)" → "["fr":"Je mange toujours ici.","en":"I always eat here.","fr":"Je ne mange jamais ici.","en":"I never eat here.","fr":"Il ne fait jamais ça.","en":"He never does that.","fr":"Nous ne voulons jamais partir.","en":"We never want to leave."]"
- `concepts[1].example` ""je vais → je ne vais jamais (I never go)"" → "(removed)"
- `concepts[2].term` "With Object Pronouns" → "With an object pronoun"
- `concepts[2].definition` "Object pronouns stay inside the negation sandwich" → "The pronoun stays before its verb, inside ne … pas."
- `concepts[2].examples` "(none)" → "["fr":"Je ne le veux pas.","en":"I don't want it.","fr":"Je ne le vois pas.","en":"I don't see it.","fr":"Je ne peux pas le voir.","en":"I can't see it.","note":"with two verbs, the pronoun goes before the second"]"
- `concepts[2].example` ""je le veux → je ne le veux pas (I don't want it)"" → "(removed)"
- `concepts[3].term` "Common Patterns" → "Sentences you will say often"
- `concepts[3].definition` "I can't, I won't, I never go, I don't see it - very useful!" → "These short sentences come up in everyday conversation."
- `concepts[3].examples` "(none)" → "["fr":"Ils ne sont pas ici.","en":"They're not here.","fr":"Nous n'allons pas au café.","en":"We're not going to the café.","fr":"Nous ne faisons pas ça.","en":"We don't do that."]"
- `concepts[3].example` ""Master these patterns for real conversations"" → "(removed)"

**2024-03-26-location-adverbs**

- `concepts[0].term` "Basic Location" → "ici and là"
- `concepts[0].definition` "ici (here) vs là (there) - pointing to places" → "ici is here, where you are. là is there, a place you can point to."
- `concepts[0].examples` "(none)" → "["fr":"Je suis ici.","en":"I'm here.","fr":"Le chat est là.","en":"The cat is there."]"
- `concepts[0].example` ""je suis ici (I am here), le chat est là (the cat is there)"" → "(removed)"
- `concepts[1].term` "Distance with là-bas" → "là-bas = over there"
- `concepts[1].definition` "là-bas means 'over there' (farther away than 'là')" → "là-bas is farther away than là."
- `concepts[1].examples` "(none)" → "["fr":"Le café est là-bas.","en":"The café is over there.","fr":"Je vais là-bas.","en":"I'm going over there."]"
- `concepts[1].example` ""le café est là-bas (the café is over there)"" → "(removed)"
- `concepts[2].term` "Quantity of Places" → "Everywhere, somewhere, nowhere"
- `concepts[2].definition` "partout (everywhere), quelque part (somewhere), nulle part (nowhere)" → "nulle part needs ne before the verb, like jamais."
- `concepts[2].examples` "(none)" → "["fr":"Je vais partout.","en":"I go everywhere.","fr":"Le livre est quelque part.","en":"The book is somewhere.","fr":"Je ne vais jamais nulle part.","en":"I never go anywhere."]"
- `concepts[2].example` ""Express presence or absence across locations"" → "(removed)"
- `concepts[3].term` "Position in Sentence" → "Where these words go"
- `concepts[3].definition` "Usually placed AFTER the verb" → "They usually come after the verb."
- `concepts[3].examples` "(none)" → "["fr":"Il est ici.","en":"He's here.","fr":"Le chat est partout.","en":"The cat is everywhere.","fr":"Demain, il est là-bas.","en":"Tomorrow he's over there."]"
- `concepts[3].example` ""je vais là (I go there), il est ici (he is here)"" → "(removed)"

**2024-03-24-everyday-nouns**

- `concepts` "["id":"c-abstract-vs-concrete-nouns","term":"Abstract vs Concrete Nouns","definition":"Abstract nouns (temps, vie, monde) express ideas. Concrete nouns (pain, eau, table) are physical objects.","example":"la vie (life - abstract), le pain (bread - concrete)","id":"c-using-in-real-conversations","term":"Using in Real Conversations","definition":"These are the nouns you'll use constantly in French - combine with verbs you know!","example":"je veux du pain, j'ai le temps, il parle du monde","id":"c-remember-the-gender","term":"Remember the Gender!","definition":"Always learn the article with the noun - it shows the gender","example":"le temps (masculine), la vie (feminine)"]" → "["id":"c-abstract-vs-concrete-nouns","term":"Ideas and things","definition":"Some nouns name ideas, like life and time. Others name things you can touch, like bread and water.","examples":["fr":"La vie est bonne.","en":"Life is good.","fr":"Le monde est grand.","en":"The world is big.","fr":"Le pain est sur la table.","en":"The bread is on the table."],"id":"c-using-in-real-conversations","term":"Nouns with the verbs you know","definition":"Put these nouns with the verbs you know to say real things.","examples":["fr":"Je veux du pain.","en":"I want some bread.","fr":"J'ai le temps.","en":"I have time.","fr":"Tout le monde est ici.","en":"Everybody is here."],"id":"c-remember-the-gender","term":"Learn the article with the noun","definition":"The article shows whether a noun is masculine or feminine, so learn the two together.","examples":["fr":"le temps","en":"time","note":"masculine","fr":"la vie","en":"life","note":"feminine","fr":"la main","en":"hand","note":"feminine"],"id":"c-pas-de","term":"pas de: no, not any","definition":"In a sentence with ne … pas, a word for a or some becomes de. The words le and la stay as they are.","examples":["fr":"J'ai du pain.","en":"I have some bread.","fr":"Je n'ai pas de pain.","en":"I don't have any bread.","fr":"Il n'a pas d'argent.","en":"He doesn't have any money.","note":"de becomes d' before a vowel","fr":"Je n'ai pas le livre.","en":"I don't have the book.","note":"le stays","fr":"Ce n'est pas un livre.","en":"It isn't a book.","note":"after être, un stays too"]]"

**2024-03-30-reading-4**

- `title` "Reading Comprehension 4 - La nouvelle époque de Marie" → "Reading Comprehension - La nouvelle époque de Marie"
- `description` "Unit 4 mastery! A natural conversation using all your vocabulary." → "A natural conversation using all your vocabulary."
- `passage[31].fr` "Mmmh! J'aime cette ville. Je ne vais jamais partir !" → "C'est beau ! J'aime cette ville. Je ne vais jamais partir !"
- `passage[31].en` "Mmmh! I love this city. I'll never leave!" → "It's beautiful! I love this city. I'll never leave!"
- `items[16]` "(none)" → ""id":"i-travail","type":"comprehension","question":"Why can't Marie go with Paul now?","cue":"Je dois aller au ___","answer":"travail","accept":["au travail","elle doit aller au travail","elle doit travailler"],"hint":"Look at what Marie must do""

**2024-04-03-unit-4-practice**

- `title` "Unit 4 Practice - Fill in the Blanks" → "Everyday Words Practice - Fill in the Blanks"
- `description` "Practice survival phrases, negation, time/location adverbs, and essential verbs from Unit 4!" → "Practice survival phrases, negation, time/location adverbs, and essential verbs from this unit!"
- `items[7].text` "Tu as vu ça ___." → "J'ai trouvé ça ___."
- `items[7].gloss` "You saw that yesterday" → "I found that yesterday"

**2024-04-02-unit-4-exam**

- `description` "Test everything from Unit 4! Survival phrases, essential verbs, negation, and expressing time and place." → "Test everything from this unit! Survival phrases, essential verbs, negation, and expressing time and place."
- `items[35].accept` "["là bas","la-bas","la bas"]" → "["la-bas"]"

**2024-04-08-comparisons**

- `concepts[0].term` "Basic Comparisons - plus/moins" → "More and less: plus and moins"
- `concepts[0].definition` "Use 'plus' (more) and 'moins' (less) with adjectives to compare things" → "Put plus or moins before an adjective to compare two things."
- `concepts[0].examples` "(none)" → "["fr":"Ce livre est plus grand.","en":"This book is bigger.","fr":"Cette maison est moins grande.","en":"This house is smaller.","fr":"C'est moins cher.","en":"It's cheaper."]"
- `concepts[0].example` ""plus grand (bigger), moins cher (less expensive)"" → "(removed)"
- `concepts[1].term` "Better and Worse - meilleur/pire" → "Better and worse: meilleur and pire"
- `concepts[1].definition` "Special forms for 'better' and 'worse' - they agree with gender!" → "French has its own words for better and worse. meilleur agrees with its noun, like any adjective."
- `concepts[1].examples` "(none)" → "["fr":"C'est un meilleur livre.","en":"It's a better book.","fr":"C'est une meilleure maison.","en":"It's a better house.","fr":"C'est pire.","en":"It's worse."]"
- `concepts[1].example` ""un meilleur livre (a better book), une meilleure maison (a better house)"" → "(removed)"
- `concepts[2].term` "Superlatives - the best/the worst" → "The best and the worst"
- `concepts[2].definition` "Add 'le/la/les' before meilleur/pire for 'the best/the worst'" → "Put le or la before meilleur or pire to say the best or the worst."
- `concepts[2].examples` "(none)" → "["fr":"C'est le meilleur livre.","en":"It's the best book.","fr":"C'est la meilleure maison.","en":"It's the best house.","fr":"C'est la pire chose.","en":"It's the worst thing."]"
- `concepts[2].example` ""le meilleur (the best), la pire (the worst)"" → "(removed)"
- `concepts[3].term` "Intensity Modifiers" → "Too much, everything, the same"
- `concepts[3].definition` "Words like 'trop' (too much), 'tout' (all), and 'même' (same/even) add nuance" → "trop means too or too much. tout means all or everything, and même means same."
- `concepts[3].examples` "(none)" → "["fr":"C'est trop cher.","en":"It's too expensive.","fr":"J'ai trop de travail.","en":"I have too much work.","fr":"Je veux tout.","en":"I want everything.","fr":"C'est la même chose.","en":"It's the same thing."]"
- `concepts[3].example` ""c'est trop cher (it's too expensive), tout le monde (everyone)"" → "(removed)"

**2024-04-07-comparisons-slang**

- `concepts[0].term` "French Slang (France)" → "Slang in France"
- `concepts[0].definition` "Informal expressions you'll hear on the streets of Paris and throughout France" → "Informal words you hear from young people in Paris and across France. Use them with friends, not at work."
- `concepts[0].examples` "(none)" → "["fr":"C'est ouf !","en":"It's crazy!","fr":"C'est chelou.","en":"It's weird.","fr":"C'est trop bien !","en":"It's really good!","fr":"C'est nul.","en":"It's rubbish."]"
- `concepts[0].example` ""c'est ouf (it's crazy - verlan for 'fou'), c'est chelou (it's weird - verlan for 'louche')"" → "(removed)"
- `concepts[1].term` "Quebec French" → "Slang in Quebec"
- `concepts[1].definition` "Unique expressions from Quebec - very different from France!" → "Quebec French has its own informal words. Many of them would sound strange in Paris."
- `concepts[1].examples` "(none)" → "["fr":"C'est malade !","en":"It's awesome!","fr":"C'est le fun.","en":"It's fun.","fr":"C'est poche.","en":"It's bad.","fr":"C'est ben correct.","en":"It's fine."]"
- `concepts[1].example` ""c'est malade (it's sick/awesome), c'est capot (it's crazy), c'est écœurant (it's disgusting/amazing)"" → "(removed)"
- `concepts[2].term` "African French" → "Words from French-speaking Africa"
- `concepts[2].definition` "Expressions from French-speaking Africa (Senegal, Ivory Coast, etc.)" → "French is spoken across West and Central Africa, and each country adds its own words."
- `concepts[2].examples` "(none)" → "["fr":"C'est gnama.","en":"It's tasty.","note":"West Africa","fr":"C'est grave.","en":"It's serious."]"
- `concepts[2].example` ""c'est gnama (it's good - West Africa), c'est grave (it's serious/intense)"" → "(removed)"
- `concepts[3].term` "Verlan - French Slang Technique" → "Verlan: words said backwards"
- `concepts[3].definition` "Reversing syllables - très (very) becomes trop, fou (crazy) becomes ouf" → "Verlan swaps the syllables of a word, so fou becomes ouf."
- `concepts[3].examples` "(none)" → "["fr":"C'est ouf.","en":"It's crazy.","note":"verlan for c'est fou","fr":"C'est chelou.","en":"It's weird.","note":"verlan for louche, shady"]"
- `concepts[3].example` ""c'est ouf = c'est fou (it's crazy), chelou = louche (weird)"" → "(removed)"

**2024-04-09-conditionals**

- `concepts[0].term` "Should = devrais (conditional of devoir)" → "Should: je devrais"
- `concepts[0].definition` "Give advice, suggestions, or express obligation softly" → "devoir in this form gives advice. It is softer than must."
- `concepts[0].examples` "(none)" → "["fr":"Tu devrais partir.","en":"You should leave.","fr":"Nous devrions parler.","en":"We should talk.","fr":"Il devrait travailler.","en":"He should work."]"
- `concepts[0].example` ""tu devrais partir (you should leave), nous devrions parler (we should talk)"" → "(removed)"
- `concepts[1].term` "Could = pourrais (conditional of pouvoir)" → "Could: je pourrais"
- `concepts[1].definition` "Express possibility or make polite requests" → "pouvoir in this form says what is possible. It also makes a request polite."
- `concepts[1].examples` "(none)" → "["fr":"Je pourrais venir.","en":"I could come.","fr":"Tu pourrais m'aider ?","en":"Could you help me?","fr":"Elle pourrait le faire.","en":"She could do it."]"
- `concepts[1].example` ""je pourrais venir (I could come), vous pourriez m'aider (you could help me)"" → "(removed)"
- `concepts[2].term` "Pattern: Alternating Should & Could" → "Same endings for both"
- `concepts[2].definition` "Practice both forms together - they work the same way!" → "devoir and pouvoir take the same endings in this form, so if you know one you know the other."
- `concepts[2].layout` "(none)" → ""forms""
- `concepts[2].examples` "(none)" → "["fr":"je devrais","en":"I should","fr":"tu devrais","en":"you should","fr":"il devrait","en":"he should","fr":"nous devrions","en":"we should","fr":"vous devriez","en":"you should","fr":"ils devraient","en":"they should"]"
- `concepts[2].example` ""je devrais / je pourrais, tu devrais / tu pourrais, il devrait / il pourrait"" → "(removed)"
- `concepts[3].term` "Negation" → "Should not, could not"
- `concepts[3].definition` "Use ne...pas around the conditional verb" → "Put ne … pas around the verb, as in the present."
- `concepts[3].examples` "(none)" → "["fr":"Je ne devrais pas partir.","en":"I shouldn't leave.","fr":"Tu ne pourrais pas faire ça.","en":"You couldn't do that.","fr":"Nous ne devrions pas partir.","en":"We shouldn't leave."]"
- `concepts[3].example` ""je ne devrais pas (I should not), tu ne pourrais pas (you could not)"" → "(removed)"

**2024-04-16-would-conditionals**

- `concepts[0].term` "Would like = voudrais (conditional of vouloir)" → "Would like: je voudrais"
- `concepts[0].definition` "Express polite desires - more polite than 'je veux' (I want)" → "vouloir in this form asks for something politely. It sounds softer than je veux."
- `concepts[0].examples` "(none)" → "["fr":"Je voudrais de l'eau.","en":"I would like some water.","fr":"Tu voudrais du café ?","en":"Would you like some coffee?","fr":"Nous voudrions partir.","en":"We would like to leave."]"
- `concepts[0].example` ""je voudrais un café (I would like a coffee), nous voudrions partir (we would like to leave)"" → "(removed)"
- `concepts[1].term` "Would go = irais (conditional of aller)" → "Would go: j'irais"
- `concepts[1].definition` "Express hypothetical movement or future possibility" → "aller in this form says where you would go."
- `concepts[1].examples` "(none)" → "["fr":"J'irais à Paris.","en":"I would go to Paris.","fr":"Ils iraient avec toi.","en":"They would go with you.","fr":"Tu irais là-bas ?","en":"Would you go there?"]"
- `concepts[1].example` ""j'irais à Paris (I would go to Paris), ils iraient avec toi (they would go with you)"" → "(removed)"
- `concepts[2].term` "Would do = ferais (conditional of faire)" → "Would do: je ferais"
- `concepts[2].definition` "Express hypothetical actions" → "faire in this form says what you would do."
- `concepts[2].examples` "(none)" → "["fr":"Je ferais ça.","en":"I would do that.","fr":"Vous feriez quoi ?","en":"What would you do?","fr":"Elle ferait ça.","en":"She would do that."]"
- `concepts[2].example` ""je ferais ça (I would do that), vous feriez quoi? (what would you do?)"" → "(removed)"
- `concepts[3].term` "Negation with Would" → "Would not"
- `concepts[3].definition` "Use ne...pas around the conditional verb" → "Put ne … pas around the verb. Before a vowel, ne becomes n'."
- `concepts[3].examples` "(none)" → "["fr":"Je ne voudrais pas ça.","en":"I wouldn't want that.","fr":"Il n'irait pas.","en":"He wouldn't go.","fr":"Nous ne ferions pas ça.","en":"We wouldn't do that."]"
- `concepts[3].example` ""je ne voudrais pas (I would not like), il n'irait pas (he would not go)"" → "(removed)"

**2024-04-04-aimer**

- `concepts[0].term` "aimer = to like OR to love" → "aimer = to like, to love"
- `concepts[0].definition` "Context determines meaning - can mean both 'like' and 'love'" → "One verb for liking and for loving. The situation tells you which one."
- `concepts[0].examples` "(none)" → "["fr":"J'aime le café.","en":"I like coffee.","fr":"J'aime ma mère.","en":"I love my mother.","fr":"Je t'aime.","en":"I love you."]"
- `concepts[0].example` ""j'aime le café (I like coffee), j'aime ma mère (I love my mother)"" → "(removed)"
- `concepts[1].term` "aimer bien = to like (casual)" → "aimer bien = to like"
- `concepts[1].definition` "Adding 'bien' makes it clearly 'like' not 'love' - less intense" → "Adding bien makes it clearly like, not love."
- `concepts[1].examples` "(none)" → "["fr":"J'aime bien ce livre.","en":"I like this book.","fr":"Je l'aime bien.","en":"I like him.","note":"with a person, bien keeps it to like"]"
- `concepts[1].example` ""j'aime bien ce livre (I like this book)"" → "(removed)"
- `concepts[2].term` "Regular -ER verb pattern" → "The -er pattern again"
- `concepts[2].definition` "Follows same pattern as parler - drop -er, add endings" → "aimer changes like parler. Before a vowel, je becomes j'."
- `concepts[2].layout` "(none)" → ""forms""
- `concepts[2].examples` "(none)" → "["fr":"j'aime","en":"I like","fr":"tu aimes","en":"you like","fr":"il aime","en":"he likes","fr":"nous aimons","en":"we like","fr":"vous aimez","en":"you like","fr":"ils aiment","en":"they like"]"
- `concepts[2].example` ""je parle → j'aime, tu parles → tu aimes, il parle → il aime"" → "(removed)"
- `concepts[3].term` "With people vs things" → "People and things"
- `concepts[3].definition` "With people often means 'love', with things means 'like'" → "With a person, aimer usually means love. With a thing, it means like."
- `concepts[3].examples` "(none)" → "["fr":"J'aime Pierre.","en":"I love Pierre.","fr":"J'aime le pain.","en":"I like bread."]"
- `concepts[3].example` ""j'aime Pierre (I love Pierre), j'aime le pain (I like bread)"" → "(removed)"
- `concepts[4].term` "With infinitives" → "Liking to do something"
- `concepts[4].definition` "Use aimer + infinitive to say you like doing something" → "Put a second verb after aimer to say what you like doing."
- `concepts[4].examples` "(none)" → "["fr":"J'aime parler français.","en":"I like speaking French.","fr":"Nous aimons travailler.","en":"We like working.","fr":"Tu aimes aller à Paris ?","en":"Do you like going to Paris?"]"
- `concepts[4].example` ""j'aime parler français (I like speaking French)"" → "(removed)"

**2024-04-10-etre-past**

- `concepts[0].term` "Past Tense = Imperfect (Imparfait)" → "j'étais = I was"
- `concepts[0].definition` "Describes ongoing states or repeated actions in the past" → "This past tense describes how things were: a state, a place, a feeling."
- `concepts[0].examples` "(none)" → "["fr":"J'étais content.","en":"I was happy.","fr":"Nous étions à Paris.","en":"We were in Paris.","fr":"C'était bon.","en":"It was good."]"
- `concepts[0].example` ""j'étais heureux (I was happy), nous étions à Paris (we were in Paris)"" → "(removed)"
- `concepts[1].term` "était = was (singular)" → "Was: the singular forms"
- `concepts[1].definition` "For je, tu, il/elle - describing past states" → "For one person or thing. The three forms sound the same."
- `concepts[1].examples` "(none)" → "["fr":"J'étais jeune.","en":"I was young.","fr":"Tu étais là.","en":"You were there.","fr":"Il était ici.","en":"He was here."]"
- `concepts[1].example` ""j'étais jeune (I was young), tu étais là (you were there), il était bon (it was good)"" → "(removed)"
- `concepts[2].term` "étions, étiez, étaient = were (plural)" → "Were: the plural forms"
- `concepts[2].definition` "For nous, vous, ils/elles - plural past states" → "For we, you and they."
- `concepts[2].examples` "(none)" → "["fr":"Nous étions contents.","en":"We were happy.","fr":"Vous étiez là.","en":"You were there.","fr":"Ils étaient ici.","en":"They were here."]"
- `concepts[2].example` ""nous étions contents (we were happy), ils étaient ici (they were here)"" → "(removed)"
- `concepts[3].term` "Pattern Recognition" → "The forms of être in the past"
- `concepts[3].definition` "Notice: j'étais, tu étais, il/elle était all sound the same!" → "The stem is ét- for every person. The singular forms and the form for they all sound the same."
- `concepts[3].layout` "(none)" → ""forms""
- `concepts[3].examples` "(none)" → "["fr":"j'étais","en":"I was","fr":"tu étais","en":"you were","fr":"il était","en":"he was","fr":"nous étions","en":"we were","fr":"vous étiez","en":"you were","fr":"ils étaient","en":"they were"]"
- `concepts[3].example` ""All singular forms end in -ais, -ais, -ait (similar sound)"" → "(removed)"
- `concepts[4].term` "With Negation" → "Was not"
- `concepts[4].definition` "Use ne...pas around the past tense verb" → "Put ne … pas around the verb. Before étais, ne becomes n'."
- `concepts[4].examples` "(none)" → "["fr":"Je n'étais pas ici.","en":"I wasn't here.","fr":"Il n'était pas content.","en":"He wasn't happy.","fr":"Nous n'étions pas là.","en":"We weren't there."]"
- `concepts[4].example` ""je n'étais pas (I was not), il n'était pas (he was not)"" → "(removed)"

**2024-04-05-avoir-past**

- `concepts[0].term` "Past Tense = Imperfect (Imparfait)" → "j'avais = I had"
- `concepts[0].definition` "Describes what you possessed or experienced in the past" → "This past tense describes what you had, or how things were."
- `concepts[0].examples` "(none)" → "["fr":"J'avais un chat.","en":"I had a cat.","fr":"Nous avions une maison.","en":"We had a house."]"
- `concepts[0].example` ""j'avais un chat (I had a cat), nous avions une maison (we had a house)"" → "(removed)"
- `concepts[1].term` "avais = had (singular)" → "I had, you had"
- `concepts[1].definition` "For je, tu - describing past possession" → "j'avais and tu avais have the same ending and the same sound."
- `concepts[1].examples` "(none)" → "["fr":"J'avais un livre.","en":"I had a book.","fr":"Tu avais raison.","en":"You were right.","note":"French says you had reason"]"
- `concepts[1].example` ""j'avais un livre (I had a book), tu avais raison (you were right - literally 'had reason')"" → "(removed)"
- `concepts[2].term` "avait = had (third person singular)" → "He had, she had"
- `concepts[2].definition` "For il/elle - describing what he/she/it had" → "il avait ends in -ait, but it sounds just like j'avais."
- `concepts[2].examples` "(none)" → "["fr":"Il avait un chien.","en":"He had a dog.","fr":"Elle avait le temps.","en":"She had time."]"
- `concepts[2].example` ""il avait un chien (he had a dog), elle avait le temps (she had time)"" → "(removed)"
- `concepts[3].term` "avions, aviez, avaient = had (plural)" → "Had: the plural forms"
- `concepts[3].definition` "For nous, vous, ils/elles - plural past possession" → "For we, you and they. ils avaient sounds like il avait."
- `concepts[3].examples` "(none)" → "["fr":"Nous avions une voiture.","en":"We had a car.","fr":"Vous aviez de l'argent.","en":"You had money.","fr":"Ils avaient faim.","en":"They were hungry."]"
- `concepts[3].example` ""nous avions une voiture (we had a car), ils avaient faim (they were hungry)"" → "(removed)"
- `concepts[4].term` "Common expressions with avoir" → "Hungry and right with avoir"
- `concepts[4].definition` "Many French expressions use avoir (not être!): avoir faim (to be hungry), avoir raison (to be right)" → "French uses avoir where English uses to be: you have hunger, you have reason."
- `concepts[4].examples` "(none)" → "["fr":"J'avais faim.","en":"I was hungry.","fr":"Tu avais raison.","en":"You were right.","fr":"Nous avions faim.","en":"We were hungry."]"
- `concepts[4].example` ""j'avais faim (I was hungry), tu avais raison (you were right)"" → "(removed)"

**2024-04-11-food-nouns**

- `concepts[0].term` "Food Genders - Learn the article!" → "Learn the article with each food"
- `concepts[0].definition` "Always learn food nouns with their article - gender matters!" → "The article shows whether a food word is masculine or feminine."
- `concepts[0].examples` "(none)" → "["fr":"le pain","en":"bread","note":"masculine","fr":"la viande","en":"meat","note":"feminine","fr":"l'eau","en":"water","note":"feminine: la becomes l' before a vowel"]"
- `concepts[0].example` ""le pain (masculine), la viande (feminine), l'eau (feminine)"" → "(removed)"
- `concepts[1].term` "Using Partitive Articles" → "Some bread, some meat"
- `concepts[1].definition` "With food, use du/de la/des for 'some' - je veux du pain (I want some bread)" → "For food you do not count, French says some with du or de la. For a plural, it uses des."
- `concepts[1].examples` "(none)" → "["fr":"Je veux du café.","en":"I want some coffee.","fr":"Je veux de la viande.","en":"I want some meat.","fr":"Je veux des fruits.","en":"I want some fruit."]"
- `concepts[1].example` ""je veux du café (some coffee), de la viande (some meat), des légumes (some vegetables)"" → "(removed)"
- `concepts[2].term` "At the Restaurant" → "Ordering food"
- `concepts[2].definition` "These are the foods you'll see and order every day!" → "Use je voudrais and s'il vous plaît to order in a café or a restaurant."
- `concepts[2].examples` "(none)" → "["fr":"Je voudrais du pain, s'il vous plaît.","en":"I would like some bread, please.","fr":"Je voudrais un croissant.","en":"I would like a croissant.","fr":"Je voudrais une salade, s'il vous plaît.","en":"I would like a salad, please."]"
- `concepts[2].example` ""je voudrais du pain, s'il vous plaît (I would like some bread, please)"" → "(removed)"
- `concepts[3].term` "With aimer" → "Food you like"
- `concepts[3].definition` "Use definite article (le/la/les) with aimer - j'aime le pain (I like bread)" → "After aimer, a food takes the word for the, because you like it in general."
- `concepts[3].examples` "(none)" → "["fr":"J'aime le café.","en":"I like coffee.","fr":"J'aime la pizza.","en":"I like pizza.","fr":"J'aime les frites.","en":"I like fries."]"
- `concepts[3].example` ""j'aime le café (I like coffee), j'aime la viande (I like meat)"" → "(removed)"

**2024-04-12-manger**

- `vocabulary[7].note` "passé composé - avoir + mangé" → "passé composé: avoir + mangé"
- `concepts[0].definition` "Essential daily verb - talk about meals and food!" → "The verb for eating and for meals."
- `concepts[0].examples` "(none)" → "["fr":"Je mange du pain.","en":"I'm eating some bread.","fr":"Nous mangeons ensemble.","en":"We eat together.","fr":"Qu'est-ce que tu manges ?","en":"What are you eating?"]"
- `concepts[0].example` ""je mange du pain (I eat bread), nous mangeons ensemble (we eat together)"" → "(removed)"
- `concepts[1].term` "Regular -ER verb" → "The forms of manger"
- `concepts[1].definition` "Follows same pattern as parler and aimer" → "manger changes like parler. With nous, it keeps an e so the g stays soft."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je mange","en":"I eat","fr":"tu manges","en":"you eat","fr":"il mange","en":"he eats","fr":"nous mangeons","en":"we eat","fr":"vous mangez","en":"you eat","fr":"ils mangent","en":"they eat"]"
- `concepts[1].example` ""je mange, tu manges, il mange, nous mangeons, vous mangez, ils mangent"" → "(removed)"
- `concepts[2].term` "Passé Composé (Past Tense)" → "I ate: j'ai mangé"
- `concepts[2].definition` "Use avoir + mangé to say 'ate' or 'have eaten'" → "To say what you ate, put avoir before mangé."
- `concepts[2].examples` "(none)" → "["fr":"J'ai mangé du pain.","en":"I ate some bread.","fr":"Tu as mangé une pizza ?","en":"Did you eat a pizza?","fr":"Nous avons mangé ensemble.","en":"We ate together."]"
- `concepts[2].example` ""j'ai mangé (I ate/have eaten), tu as mangé (you ate), il a mangé (he ate)"" → "(removed)"
- `concepts[3].term` "Past Participle: mangé" → "The -é ending"
- `concepts[3].definition` "For -ER verbs, past participle is -é" → "For a verb in -er, the past form ends in -é. It sounds just like the infinitive."
- `concepts[3].examples` "(none)" → "["fr":"J'ai mangé.","en":"I ate.","fr":"J'ai parlé avec Marie.","en":"I talked with Marie.","fr":"J'ai aimé ce livre.","en":"I liked this book."]"
- `concepts[3].example` ""manger → mangé, parler → parlé, aimer → aimé"" → "(removed)"
- `concepts[4].term` "With food nouns" → "Some, or one"
- `concepts[4].definition` "Use partitive (du/de la/des) for some, or article for specific items" → "Use du or de la for some of a food. Use un or une for one whole thing."
- `concepts[4].examples` "(none)" → "["fr":"Je mange du pain.","en":"I'm eating some bread.","fr":"Je mange une pomme.","en":"I'm eating an apple.","fr":"Je ne mange pas de viande.","en":"I don't eat meat."]"
- `concepts[4].example` ""je mange du pain (I eat some bread), je mange une pomme (I eat an apple)"" → "(removed)"

**2024-04-06-boire**

- `concepts[0].definition` "Essential daily verb - talk about beverages!" → "The verb for drinking."
- `concepts[0].examples` "(none)" → "["fr":"Je bois du café.","en":"I drink coffee.","fr":"Nous buvons de l'eau.","en":"We drink water.","fr":"Qu'est-ce que tu bois ?","en":"What are you drinking?"]"
- `concepts[0].example` ""je bois du café (I drink coffee), nous buvons de l'eau (we drink water)"" → "(removed)"
- `concepts[1].term` "Irregular verb - changes stem!" → "The forms of boire"
- `concepts[1].definition` "Uses 'boi-' for singular, 'buv-' for plural forms" → "The singular forms sound the same. The stem changes to buv- for we and you, and to boiv- for they."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je bois","en":"I drink","fr":"tu bois","en":"you drink","fr":"il boit","en":"he drinks","fr":"nous buvons","en":"we drink","fr":"vous buvez","en":"you drink","fr":"ils boivent","en":"they drink"]"
- `concepts[1].example` ""je bois, tu bois, il boit BUT nous buvons, vous buvez, ils boivent"" → "(removed)"
- `concepts[2].term` "Passé Composé (Past Tense)" → "I drank: j'ai bu"
- `concepts[2].definition` "Use avoir + bu to say 'drank' or 'have drunk'" → "Put avoir before bu to say what you drank."
- `concepts[2].examples` "(none)" → "["fr":"J'ai bu du café.","en":"I drank some coffee.","fr":"Il a bu du vin.","en":"He drank some wine.","fr":"Nous n'avons pas bu de café.","en":"We didn't drink any coffee."]"
- `concepts[2].example` ""j'ai bu (I drank/have drunk), tu as bu (you drank), il a bu (he drank)"" → "(removed)"
- `concepts[3].term` "Past Participle: bu (irregular!)" → "bu, a short past form"
- `concepts[3].definition` "Irregular past participle - NOT 'buvé'!" → "boire does not follow the -er pattern, so its past form is short: bu."
- `concepts[3].examples` "(none)" → "["fr":"J'ai bu.","en":"I drank.","fr":"Tu as bu de l'eau ?","en":"Did you drink some water?"]"
- `concepts[3].example` ""boire → bu (short and irregular)"" → "(removed)"
- `concepts[4].term` "With drink nouns" → "Some coffee, some water"
- `concepts[4].definition` "Use partitive (du/de la/de l') for some, or article for specific items" → "Drinks take the word for some, as food does. Before a vowel, de la becomes de l'."
- `concepts[4].examples` "(none)" → "["fr":"Il boit de la bière.","en":"He drinks beer.","fr":"Je veux boire de l'eau.","en":"I want to drink some water.","fr":"Elle boit du jus.","en":"She drinks juice."]"
- `concepts[4].example` ""je bois du café (I drink some coffee), j'ai bu de l'eau (I drank water)"" → "(removed)"

**2024-04-13-reading-5**

- `title` "Reading Comprehension 5 - La fée verte (The Green Fairy)" → "Reading Comprehension - La fée verte (The Green Fairy)"
- `description` "Unit 5 mastery! A story about Vincent van Gogh painting his famous 'Café Terrace at Night' in Arles with Paul Gauguin." → "A story about Vincent van Gogh painting his famous 'Café Terrace at Night' in Arles with Paul Gauguin."
- `vocabulary[15].note` ""Unit 5 verb"" → "(removed)"
- `vocabulary[16].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[17].note` ""Unit 5 verb"" → "(removed)"
- `vocabulary[18].note` ""Unit 2 verb"" → "(removed)"
- `vocabulary[19].note` ""Unit 3 verb"" → "(removed)"
- `vocabulary[20].note` ""Unit 3 verb"" → "(removed)"
- `vocabulary[21].note` ""Unit 3 verb"" → "(removed)"
- `vocabulary[22].note` ""Unit 2 verb"" → "(removed)"
- `vocabulary[23].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[24].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[25].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[26].note` ""Unit 4 verb"" → "(removed)"
- `vocabulary[37].note` "Unit 4 - polite expression" → "polite expression"

**2024-04-15-unit-5-practice**

- `title` "Unit 5 Practice - Fill in the Blanks" → "Time & Taste Practice - Fill in the Blanks"
- `description` "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from Unit 5!" → "Complete sentences using comparisons, past tense, conditionals, and food vocabulary from this unit!"
- `can_do[2]` "Apply Unit 5 sophistication in context" → "Apply this unit's sophistication in context"

**2024-04-14-unit-5-exam**

- `description` "Test everything from Unit 5! Comparisons, slang, past tense, conditionals, and food vocabulary." → "Test everything from this unit! Comparisons, slang, past tense, conditionals, and food vocabulary."

**2024-04-23-progressive-tenses**

- `concepts[0].term` "être en train de + infinitive" → "être en train de: in the middle of"
- `concepts[0].definition` "Express an action happening RIGHT NOW - like English 'I am doing...'" → "Use it to stress that something is happening right now. French often says the same thing with the plain present."
- `concepts[0].examples` "(none)" → "["fr":"Je suis en train de manger.","en":"I'm eating.","fr":"Elle est en train de parler.","en":"She's talking.","fr":"Nous sommes en train de partir.","en":"We're leaving."]"
- `concepts[0].example` ""je suis en train de manger (I am eating), il est en train de parler (he is talking)"" → "(removed)"
- `concepts[1].term` "aller + infinitive (near future)" → "Going to: aller with a verb"
- `concepts[1].definition` "Express what you're GOING TO DO - aller (to go) + verb infinitive" → "Put a form of aller before a verb to say what you are going to do."
- `concepts[1].examples` "(none)" → "["fr":"Je vais manger.","en":"I'm going to eat.","fr":"Tu vas parler.","en":"You're going to speak.","fr":"Ils vont venir.","en":"They're going to come."]"
- `concepts[1].example` ""je vais manger (I'm going to eat), tu vas parler (you're going to speak)"" → "(removed)"
- `concepts[2].term` "Future tense - je ...-rai" → "Will: the future tense"
- `concepts[2].definition` "Express what you WILL do - add -rai, -ras, -ra, -rons, -rez, -ront to infinitive" → "For most verbs, add the ending to the infinitive: je parlerai means I will speak. Some verbs change, like aller, which becomes j'irai."
- `concepts[2].examples` "(none)" → "["fr":"Je parlerai à Marie.","en":"I'll talk to Marie.","fr":"Il partira demain.","en":"He'll leave tomorrow.","fr":"Nous viendrons.","en":"We'll come.","fr":"J'irai à Paris.","en":"I'll go to Paris."]"
- `concepts[2].example` ""je parlerai (I will speak), tu mangeras (you will eat), il ira (he will go - irregular)"" → "(removed)"
- `concepts[3].term` "Negative modals" → "Can't, won't, shouldn't"
- `concepts[3].definition` "Express can't, won't, shouldn't - je ne peux pas, je ne vais pas, je ne devrais pas" → "Put ne … pas around the first verb. The second verb stays after pas."
- `concepts[3].examples` "(none)" → "["fr":"Je ne peux pas partir.","en":"I can't leave.","fr":"Je ne devrais pas manger ça.","en":"I shouldn't eat that.","fr":"Il ne le fera pas.","en":"He won't do it.","fr":"Nous ne pourrons pas venir.","en":"We won't be able to come."]"
- `concepts[3].example` ""je ne peux pas partir (I can't leave), je ne devrais pas manger ça (I shouldn't eat that)"" → "(removed)"
- `concepts[4].term` "J'étais en train de... (past progressive)" → "j'étais en train de: I was in the middle of"
- `concepts[4].definition` "Say what you WERE doing - use past tense of être + en train de" → "Use the past of être to say what you were doing."
- `concepts[4].examples` "(none)" → "["fr":"J'étais en train de manger.","en":"I was eating.","fr":"Ils étaient en train de parler.","en":"They were talking.","fr":"J'allais partir.","en":"I was going to leave.","note":"the past of je vais partir"]"
- `concepts[4].example` ""j'étais en train de manger (I was eating), ils étaient en train de parler (they were talking)"" → "(removed)"

**2024-04-20-dire**

- `concepts[0].term` "dire = to say OR to tell" → "dire = to say, to tell"
- `concepts[0].definition` "Essential communication verb - irregular conjugation in present tense" → "One verb for saying something and for telling someone."
- `concepts[0].examples` "(none)" → "["fr":"Je dis bonjour.","en":"I say hello.","fr":"Tu dis la vérité.","en":"You're telling the truth.","fr":"Elle dit oui.","en":"She says yes."]"
- `concepts[0].example` ""je dis bonjour (I say hello), tu dis la vérité (you tell the truth)"" → "(removed)"
- `concepts[1].term` "Irregular conjugation" → "The forms of dire"
- `concepts[1].definition` "Present tense: je dis, tu dis, il dit, nous disons, vous dites, ils disent" → "vous dites is one of only three vous forms that end in -tes, with vous êtes and vous faites."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je dis","en":"I say","fr":"tu dis","en":"you say","fr":"il dit","en":"he says","fr":"nous disons","en":"we say","fr":"vous dites","en":"you say","fr":"ils disent","en":"they say"]"
- `concepts[1].example` ""Notice: vous dites (NOT disez!), nous disons (regular), ils disent (regular)"" → "(removed)"
- `concepts[2].term` "dire que... (to say that...)" → "dire que: to say that"
- `concepts[2].definition` "Use 'que' to introduce what someone says" → "Put que after dire to report what someone says. English can leave out that, but French keeps que."
- `concepts[2].examples` "(none)" → "["fr":"Je dis que c'est bon.","en":"I say it's good.","fr":"Il dit qu'il vient.","en":"He says he's coming.","fr":"Ils disent que c'est vrai.","en":"They say it's true."]"
- `concepts[2].example` ""je dis que c'est bon (I say that it's good), il dit qu'il vient (he says he's coming)"" → "(removed)"
- `concepts[3].term` "dire à quelqu'un (to tell someone)" → "Telling someone"
- `concepts[3].definition` "Use 'à' + person to say who you're telling" → "Use à before the person you tell. A pronoun like me goes before the verb instead."
- `concepts[3].examples` "(none)" → "["fr":"Je dis bonjour à Marie.","en":"I say hello to Marie.","fr":"Je te dis la vérité.","en":"I'm telling you the truth.","fr":"Il me dit qu'il vient.","en":"He tells me he's coming."]"
- `concepts[3].example` ""je dis à Marie (I tell Marie), tu me dis (you tell me), il lui dit (he tells him/her)"" → "(removed)"
- `concepts[4].term` "Common expressions" → "Common sayings with dire"
- `concepts[4].definition` "Useful phrases: c'est-à-dire (that is to say), on dit que (they say that), comme on dit (as they say)" → "These short phrases come up in everyday conversation."
- `concepts[4].examples` "(none)" → "["fr":"On dit que c'est bon.","en":"People say it's good.","fr":"Comme on dit, c'est la vie.","en":"As they say, that's life.","fr":"C'est-à-dire ?","en":"Meaning what?"]"
- `concepts[4].example` ""c'est-à-dire que... (that is to say...), on dit que c'est bon (they say it's good)"" → "(removed)"

**2024-04-22-prendre**

- `concepts[0].definition` "Very common verb for taking things, taking transportation, taking time" → "The verb for taking things, a bus or your time."
- `concepts[0].examples` "(none)" → "["fr":"Je prends le bus.","en":"I take the bus.","fr":"Elle prend son temps.","en":"She takes her time.","fr":"Nous prenons la voiture.","en":"We're taking the car."]"
- `concepts[0].example` ""je prends le bus (I take the bus), tu prends ton temps (you take your time)"" → "(removed)"
- `concepts[1].term` "Irregular conjugation" → "The forms of prendre"
- `concepts[1].definition` "Present tense: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent" → "The singular forms sound the same. The plural forms drop the d, and the form for they doubles the n."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je prends","en":"I take","fr":"tu prends","en":"you take","fr":"il prend","en":"he takes","fr":"nous prenons","en":"we take","fr":"vous prenez","en":"you take","fr":"ils prennent","en":"they take"]"
- `concepts[1].example` ""Notice: singular sounds like 'pran', plural 'pren-on', 'pren-ay', 'pren'"" → "(removed)"
- `concepts[2].definition` "Uses same conjugation pattern as prendre - very useful verb!" → "apprendre changes just like prendre."
- `concepts[2].examples` "(none)" → "["fr":"J'apprends le français.","en":"I'm learning French.","fr":"Tu apprends vite.","en":"You learn fast.","fr":"Nous apprenons ensemble.","en":"We learn together."]"
- `concepts[2].example` ""j'apprends le français (I learn French), nous apprenons ensemble (we learn together)"" → "(removed)"
- `concepts[3].definition` "Also follows prendre pattern - essential for communication!" → "comprendre changes like prendre too."
- `concepts[3].examples` "(none)" → "["fr":"Je comprends.","en":"I understand.","fr":"Tu comprends ?","en":"Do you understand?","fr":"Je ne comprends pas.","en":"I don't understand."]"
- `concepts[3].example` ""je comprends (I understand), tu comprends? (do you understand?)"" → "(removed)"
- `concepts[4].term` "Common uses of prendre" → "Having a coffee, taking time"
- `concepts[4].definition` "Transportation (prendre le bus), food/drink (prendre un café), time (ça prend du temps)" → "French uses prendre for food and drink you order, and for how long something takes."
- `concepts[4].examples` "(none)" → "["fr":"Je prends un café.","en":"I'll have a coffee.","fr":"Ça prend deux heures.","en":"It takes two hours.","fr":"Tu prends le train ?","en":"Are you taking the train?"]"
- `concepts[4].example` ""je prends un café (I'm having a coffee), ça prend deux heures (it takes two hours)"" → "(removed)"

**2024-10-22-donner**

- `concepts` "["id":"c-donner-to-give","term":"donner = to give","definition":"Very common verb for giving things, offering help, providing information","example":"je donne le livre (I give the book), tu donnes ton nom (you give your name)","id":"c-regular-er-conjugation","term":"Regular -er conjugation","definition":"Present tense: je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","example":"Regular pattern: donn- + endings (-e, -es, -e, -ons, -ez, -ent)","id":"c-common-uses-of-donner","term":"Common uses of donner","definition":"Giving objects (donner un cadeau), giving information (donner l'adresse), giving help (donner de l'aide)","example":"je donne mon numéro (I give my number), ça donne faim (it makes you hungry)","id":"c-donner-vs-prendre","term":"Donner vs Prendre","definition":"Perfect opposites - donner (to give) and prendre (to take)","example":"je donne le livre à Marie, elle prend le livre (I give the book to Marie, she takes the book)","id":"c-with-prepositions","term":"With prepositions","definition":"Often used with 'à' (to) - donner quelque chose à quelqu'un","example":"je donne le livre à mon ami (I give the book to my friend)"]" → "["id":"c-donner-to-give","term":"donner = to give","definition":"The verb for giving things and information.","examples":["fr":"Tu donnes ton nom.","en":"You give your name.","fr":"Donne-moi ta main.","en":"Give me your hand.","fr":"Qu'est-ce que tu donnes ?","en":"What are you giving?"],"id":"c-regular-er-conjugation","term":"The forms of donner","definition":"donner changes like parler.","layout":"forms","examples":["fr":"je donne","en":"I give","fr":"tu donnes","en":"you give","fr":"il donne","en":"he gives","fr":"nous donnons","en":"we give","fr":"vous donnez","en":"you give","fr":"ils donnent","en":"they give"],"id":"c-common-uses-of-donner","term":"Giving a number, giving you hunger","definition":"You also give information with donner. ça donne faim means it makes you hungry.","examples":["fr":"Je donne mon numéro.","en":"I give my number.","fr":"Ça donne faim.","en":"It makes you hungry."],"id":"c-donner-vs-prendre","term":"Give and take","definition":"donner and prendre are opposites.","examples":["fr":"Je donne le livre à Marie.","en":"I give the book to Marie.","fr":"Elle prend le livre.","en":"She takes the book."],"id":"c-with-prepositions","term":"Giving to someone","definition":"Use à before the person who gets the thing.","examples":["fr":"Je donne le livre à mon ami.","en":"I give the book to my friend.","fr":"Donne-moi ça.","en":"Give me that.","note":"with moi, no à"],"id":"c-ne-rien","term":"ne … rien: nothing","definition":"rien takes the place of pas: ne goes before the verb and rien after it.","examples":["fr":"Il ne donne rien.","en":"He doesn't give anything.","fr":"Je ne vois rien.","en":"I don't see anything.","fr":"Je ne fais rien.","en":"I'm not doing anything."]]"
- `items[12].hint` "il + ne + donne + pas + anything" → "ne + donne + rien"
- `items[12].mistakes` "(none)" → "["answer":"il ne donne pas","feedback":"For nothing, rien takes the place of pas: il ne donne rien."]"
- `items[12].accept` "["il ne donne pas"]" → "(removed)"

**2024-04-21-mettre**

- `concepts[0].term` "mettre = to put / to set / to wear" → "mettre = to put, to put on"
- `concepts[0].definition` "Versatile verb - put things somewhere, set the table, put on clothes" → "The verb for putting things somewhere, and for putting on clothes."
- `concepts[0].examples` "(none)" → "["fr":"Je mets le livre sur la table.","en":"I put the book on the table.","fr":"Tu mets ça ici.","en":"You put that here.","fr":"Je mets un manteau.","en":"I'm putting on a coat."]"
- `concepts[0].example` ""je mets le livre sur la table (I put the book on the table), je mets un pantalon (I put on pants)"" → "(removed)"
- `concepts[1].term` "Irregular conjugation" → "The forms of mettre"
- `concepts[1].definition` "Present tense: je mets, tu mets, il met, nous mettons, vous mettez, ils mettent" → "The singular forms have one t and sound the same. The plural forms have two."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je mets","en":"I put","fr":"tu mets","en":"you put","fr":"il met","en":"he puts","fr":"nous mettons","en":"we put","fr":"vous mettez","en":"you put","fr":"ils mettent","en":"they put"]"
- `concepts[1].example` ""Notice: singular has single 't', plural has double 'tt'"" → "(removed)"
- `concepts[2].term` "mettre la table" → "mettre la table: to set the table"
- `concepts[2].definition` "Common expression meaning 'to set the table'" → "French puts the table, where English sets it."
- `concepts[2].examples` "(none)" → "["fr":"Je mets la table.","en":"I'm setting the table.","fr":"Tu peux mettre la table ?","en":"Can you set the table?"]"
- `concepts[2].example` ""je mets la table (I set the table), tu peux mettre la table? (can you set the table?)"" → "(removed)"
- `concepts[3].term` "mettre + clothing" → "Putting on clothes"
- `concepts[3].definition` "Use mettre to say you're putting on or wearing clothes" → "With clothes, mettre means to put on, and sometimes to wear."
- `concepts[3].examples` "(none)" → "["fr":"Il met une chemise.","en":"He's putting on a shirt.","fr":"Nous mettons nos chaussures.","en":"We're putting on our shoes.","fr":"Qu'est-ce que tu mets ?","en":"What are you wearing?"]"
- `concepts[3].example` ""je mets un manteau (I put on a coat), qu'est-ce que tu mets? (what are you wearing?)"" → "(removed)"
- `concepts[4].term` "Other common uses" → "Taking time"
- `concepts[4].definition` "mettre du temps (to take time), se mettre à (to start doing something)" → "ça met du temps means it takes time, like ça prend du temps."
- `concepts[4].examples` "(none)" → "["fr":"Ça met du temps.","en":"It takes time.","fr":"Ça met deux heures.","en":"It takes two hours.","fr":"Apprendre le français, ça prend du temps.","en":"Learning French takes time."]"
- `concepts[4].example` ""ça met deux heures (it takes two hours), je me mets à travailler (I start working)"" → "(removed)"

**2024-04-19-demander**

- `concepts[0].term` "demander = to ask (for)" → "demander = to ask, to ask for"
- `concepts[0].definition` "Request things, ask questions, ask for help - regular -ER verb" → "One verb for asking a question and for asking for something."
- `concepts[0].examples` "(none)" → "["fr":"Je demande de l'aide.","en":"I'm asking for help.","fr":"Pourquoi tu demandes ?","en":"Why do you ask?"]"
- `concepts[0].example` ""je demande de l'aide (I ask for help), tu demandes pourquoi? (you ask why?)"" → "(removed)"
- `concepts[1].term` "Regular -ER verb pattern" → "The forms of demander"
- `concepts[1].definition` "Follows same pattern as parler - drop -er, add endings: -e, -es, -e, -ons, -ez, -ent" → "demander changes like parler."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je demande","en":"I ask","fr":"tu demandes","en":"you ask","fr":"il demande","en":"he asks","fr":"nous demandons","en":"we ask","fr":"vous demandez","en":"you ask","fr":"ils demandent","en":"they ask"]"
- `concepts[1].example` ""je demande, tu demandes, il demande, nous demandons, vous demandez, ils demandent"" → "(removed)"
- `concepts[2].term` "demander quelque chose (to ask for something)" → "Asking for something"
- `concepts[2].definition` "Ask for objects, favors, information - direct object" → "The thing you ask for comes straight after the verb. English needs for, French does not."
- `concepts[2].examples` "(none)" → "["fr":"Tu demandes un café.","en":"You ask for a coffee.","fr":"Il demande ton nom.","en":"He asks for your name.","fr":"Elle demande l'addition.","en":"She asks for the bill."]"
- `concepts[2].example` ""je demande un café (I ask for a coffee), il demande ton nom (he asks for your name)"" → "(removed)"
- `concepts[3].term` "demander à quelqu'un (to ask someone)" → "Asking someone"
- `concepts[3].definition` "Use 'à' when specifying who you're asking" → "Use à before the person you ask."
- `concepts[3].examples` "(none)" → "["fr":"Je demande à Marie.","en":"I'll ask Marie.","fr":"Tu demandes à ton père.","en":"You ask your father.","fr":"Il demande à sa mère.","en":"He asks his mother."]"
- `concepts[3].example` ""je demande à Marie (I ask Marie), tu demandes à ton père (you ask your father)"" → "(removed)"
- `concepts[4].term` "demander de + infinitive" → "Asking someone to do something"
- `concepts[4].definition` "Ask someone TO DO something - use 'de' before verb" → "Put de before the second verb."
- `concepts[4].examples` "(none)" → "["fr":"Il me demande de venir.","en":"He asks me to come.","fr":"Elle nous demande d'attendre.","en":"She asks us to wait.","fr":"Je demande de partir.","en":"I ask to leave."]"
- `concepts[4].example` ""je demande de partir (I ask to leave), il me demande de venir (he asks me to come)"" → "(removed)"
- `concepts[5].term` "Common uses" → "Saying sorry, asking permission"
- `concepts[5].definition` "demander de l'aide (ask for help), demander pardon (ask forgiveness), demander la permission (ask permission)" → "Two phrases with demander that you hear often."
- `concepts[5].examples` "(none)" → "["fr":"Je demande pardon.","en":"I apologize.","fr":"Nous demandons la permission.","en":"We ask for permission."]"
- `concepts[5].example` ""je demande de l'aide (I ask for help), tu demandes pardon (you ask forgiveness)"" → "(removed)"

**2024-04-18-commander**

- `vocabulary[11].word_id` "vous-commandez-fr.question" → "vous-commandez-fr.are-you-ready"
- `concepts[0].definition` "Order food at restaurants, drinks at cafés, products online - regular -ER verb" → "The verb for ordering in a café or a restaurant, or buying online."
- `concepts[0].examples` "(none)" → "["fr":"Je commande un café.","en":"I order a coffee.","fr":"Nous commandons une pizza.","en":"We order a pizza.","fr":"Je voudrais commander.","en":"I would like to order."]"
- `concepts[0].example` ""je commande un café (I order a coffee), nous commandons une pizza (we order a pizza)"" → "(removed)"
- `concepts[1].term` "Regular -ER verb pattern" → "The forms of commander"
- `concepts[1].definition` "Follows same pattern as parler, demander - drop -er, add endings" → "commander changes like parler."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je commande","en":"I order","fr":"tu commandes","en":"you order","fr":"il commande","en":"he orders","fr":"nous commandons","en":"we order","fr":"vous commandez","en":"you order","fr":"ils commandent","en":"they order"]"
- `concepts[1].example` ""je commande, tu commandes, il commande, nous commandons, vous commandez, ils commandent"" → "(removed)"
- `concepts[2].term` "Restaurant/café context" → "At a restaurant"
- `concepts[2].definition` "Most common use - ordering food and drinks in restaurants" → "You hear commander from the waiter as well as say it."
- `concepts[2].examples` "(none)" → "["fr":"Vous commandez ?","en":"Are you ready to order?","fr":"Qu'est-ce que tu commandes ?","en":"What are you ordering?","fr":"Il commande un steak.","en":"He orders a steak."]"
- `concepts[2].example` ""je commande un steak (I order a steak), vous commandez le menu? (are you ordering the set menu?)"" → "(removed)"
- `concepts[3].term` "Online shopping" → "Ordering online"
- `concepts[3].definition` "Also used for ordering products online or by phone" → "commander also means to order something online or by phone."
- `concepts[3].examples` "(none)" → "["fr":"Je commande en ligne.","en":"I order online.","fr":"Nous commandons par téléphone.","en":"We order by phone."]"
- `concepts[3].example` ""je commande en ligne (I order online), commander sur Amazon (to order on Amazon)"" → "(removed)"
- `concepts[4].term` "Similar to demander" → "commander or demander"
- `concepts[4].definition` "Both mean 'to ask for', but commander specifically means 'to order' (more formal/transactional)" → "demander is to ask for anything. commander is to order, in a shop or a restaurant."
- `concepts[4].examples` "(none)" → "["fr":"Je demande l'addition.","en":"I ask for the bill.","fr":"Je commande un café.","en":"I order a coffee."]"
- `concepts[4].example` ""demander = ask for (general), commander = order (restaurant/shop)"" → "(removed)"

**2024-04-17-besoin**

- `concepts[0].definition` "Literally 'to have need of' - use avoir + besoin + de + noun/verb" → "French says to have need of. Only avoir changes."
- `concepts[0].examples` "(none)" → "["fr":"J'ai besoin de café.","en":"I need coffee.","fr":"Tu as besoin d'aide ?","en":"Do you need help?","fr":"De quoi tu as besoin ?","en":"What do you need?"]"
- `concepts[0].example` ""j'ai besoin de café (I need coffee), tu as besoin d'aide (you need help)"" → "(removed)"
- `concepts[1].term` "Structure: avoir + besoin + de" → "The forms of avoir besoin"
- `concepts[1].definition` "Always use this three-part structure - conjugate avoir, besoin stays the same" → "avoir changes with the person, and besoin de stays the same."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"j'ai besoin","en":"I need","fr":"tu as besoin","en":"you need","fr":"il a besoin","en":"he needs","fr":"nous avons besoin","en":"we need","fr":"vous avez besoin","en":"you need","fr":"ils ont besoin","en":"they need"]"
- `concepts[1].example` ""j'ai besoin, tu as besoin, il a besoin, nous avons besoin, vous avez besoin, ils ont besoin"" → "(removed)"
- `concepts[2].term` "With nouns - de + noun" → "Needing a thing"
- `concepts[2].definition` "After besoin, use 'de' (or d' before vowel) before the noun" → "Put the thing after de, or d' before a vowel."
- `concepts[2].examples` "(none)" → "["fr":"J'ai besoin de temps.","en":"I need time.","fr":"J'ai besoin d'argent.","en":"I need money.","fr":"Elle a besoin d'une voiture.","en":"She needs a car."]"
- `concepts[2].example` ""j'ai besoin de temps (I need time), j'ai besoin d'argent (I need money)"" → "(removed)"
- `concepts[3].term` "With verbs - de + infinitive" → "Needing to do something"
- `concepts[3].definition` "To say you need TO DO something, use de + infinitive verb" → "Put a second verb after de."
- `concepts[3].examples` "(none)" → "["fr":"J'ai besoin de dormir.","en":"I need to sleep.","fr":"Nous avons besoin de parler.","en":"We need to talk.","fr":"Tu as besoin de partir ?","en":"Do you need to leave?"]"
- `concepts[3].example` ""j'ai besoin de manger (I need to eat), tu as besoin de partir (you need to leave)"" → "(removed)"
- `concepts[4].term` "Negative form" → "Not needing"
- `concepts[4].definition` "Put ne...pas around avoir: je n'ai pas besoin de..." → "Put ne … pas around avoir."
- `concepts[4].examples` "(none)" → "["fr":"Je n'ai pas besoin d'aide.","en":"I don't need help.","fr":"Tu n'as pas besoin de ça.","en":"You don't need that.","fr":"Elle n'a pas besoin de partir.","en":"She doesn't need to leave."]"
- `concepts[4].example` ""je n'ai pas besoin d'aide (I don't need help), tu n'as pas besoin de ça (you don't need that)"" → "(removed)"

**2024-04-25-top-200-nouns**

- `concepts[0].term` "Time nouns" → "Words for time"
- `concepts[0].definition` "Express time periods and moments: année, fois, moment, heure, minute" → "These nouns name lengths of time and moments."
- `concepts[0].examples` "(none)" → "["fr":"une année","en":"a year","fr":"une fois","en":"once","fr":"un moment","en":"a moment","fr":"au début","en":"at the beginning","fr":"à la fin","en":"at the end"]"
- `concepts[0].example` ""une année (a year), une fois (once/one time), un moment (a moment)"" → "(removed)"
- `concepts[1].term` "People & relationships" → "Family and people"
- `concepts[1].definition` "Family and general people: famille, père, mère, personne" → "Words for your family and for people in general."
- `concepts[1].examples` "(none)" → "["fr":"Toute ma famille est ici.","en":"My whole family is here.","fr":"C'est mon frère.","en":"This is my brother.","fr":"C'est ma sœur.","en":"This is my sister."]"
- `concepts[1].example` ""ma famille (my family), mon père (my father), une personne (a person)"" → "(removed)"
- `concepts[2].term` "Body parts" → "The face and the body"
- `concepts[2].definition` "Beyond basic body parts: yeux (eyes), visage (face), corps (body), cœur (heart)" → "Words for the face and the body."
- `concepts[2].examples` "(none)" → "["fr":"les yeux","en":"the eyes","fr":"le visage","en":"the face","fr":"le cœur","en":"the heart","fr":"la voix","en":"the voice"]"
- `concepts[2].example` ""les yeux (the eyes), le visage (the face), le cœur (the heart)"" → "(removed)"
- `concepts[3].term` "Abstract concepts" → "Ideas"
- `concepts[3].definition` "Ideas and concepts: histoire, problème, question, raison, fait" → "Nouns for stories, problems, questions and reasons."
- `concepts[3].examples` "(none)" → "["fr":"J'ai un problème.","en":"I have a problem.","fr":"J'ai une question.","en":"I have a question.","fr":"C'est une longue histoire.","en":"It's a long story."]"
- `concepts[3].example` ""une histoire (a story), un problème (a problem), la raison (the reason)"" → "(removed)"
- `concepts[4].term` "Special plurals" → "One eye, two eyes"
- `concepts[4].definition` "Some nouns have irregular plurals: œil → yeux (eye → eyes)" → "un œil becomes les yeux in the plural, a completely different word."
- `concepts[4].examples` "(none)" → "["fr":"un œil","en":"an eye","fr":"les yeux","en":"the eyes"]"
- `concepts[4].example` ""un œil (one eye), les yeux (the eyes - irregular!)"" → "(removed)"

**2024-04-24-reading-6**

- `title` "Reading Comprehension 6 - Un Voyage en Famille" → "Reading Comprehension - Un Voyage en Famille"
- `description` "A family plans a trip to Paris. Uses Unit 6 vocabulary: progressive tenses, dire, prendre, mettre, demander, commander, besoin." → "A family plans a trip to Paris. Uses this unit's vocabulary: progressive tenses, dire, prendre, mettre, demander, commander, besoin."
- `vocabulary[9].note` ""Unit 5 verb"" → "(removed)"
- `vocabulary[29].note` "feminine; from Unit 4 everyday-nouns" → "feminine"
- `vocabulary[38].note` ""from Unit 6 mettre module"" → "(removed)"
- `vocabulary[39].note` ""from Unit 1"" → "(removed)"
- `vocabulary[48].note` ""from Unit 5 food-nouns"" → "(removed)"
- `vocabulary[49].note` ""from Unit 5 food-nouns"" → "(removed)"
- `vocabulary[51].note` ""Unit 4 time-adverbs"" → "(removed)"
- `vocabulary[53].note` ""Unit 3 voir module"" → "(removed)"
- `vocabulary[55].note` ""from Unit 5 comparisons"" → "(removed)"
- `vocabulary[56].note` "time expression with Unit 6 moment" → "time expression"
- `vocabulary[57].note` ""Unit 4 faire module"" → "(removed)"
- `vocabulary[58].note` "plural adjective from Unit 2" → "plural adjective"
- `vocabulary[60].note` ""from Unit 4 parler"" → "(removed)"
- `vocabulary[65].note` ""from Unit 4 parler"" → "(removed)"
- `vocabulary[67].note` ""from Unit 1 famous-words"" → "(removed)"
- `vocabulary[68].note` "bon from Unit 2 adjectives" → "feminine of bon"
- `vocabulary[69].note` ""Unit 4 time-adverbs"" → "(removed)"
- `vocabulary[70].note` ""Unit 1 avoir module"" → "(removed)"
- `vocabulary[71].note` "from Unit 2 adjectives (beau)" → "feminine of beau"
- `vocabulary[72].note` "superlative from Unit 5" → "superlative"
- `vocabulary[74].note` ""Unit 2 prepositions"" → "(removed)"

**2024-04-27-unit-6-practice**

- `title` "Unit 6 Practice - Fill in the Blanks" → "Basic Fluency Practice - Fill in the Blanks"
- `description` "Complete sentences using progressive tenses, communication verbs, and essential vocabulary from Unit 6!" → "Complete sentences using progressive tenses, communication verbs, and essential vocabulary from this unit!"
- `can_do[2]` "Apply advanced Unit 6 structures in context" → "Apply this unit's advanced structures in context"

**2024-04-26-unit-6-exam**

- `description` "Test everything from Unit 6! Progressive tenses, future forms, communication verbs, and essential vocabulary." → "Test everything from this unit! Progressive tenses, future forms, communication verbs, and essential vocabulary."

**2024-05-05-on-and-people**

- `vocabulary[6].note` "On doit étudier" → "On doit travailler"
- `concepts[0].term` "on = we / one / people" → "on = we, one, people"
- `concepts[0].definition` "THE most versatile pronoun! Used MORE than 'nous' in everyday French. Three meanings depending on context." → "In everyday French, on often takes the place of nous. It can also mean people in general."
- `concepts[0].examples` "(none)" → "["fr":"On va au cinéma.","en":"We're going to the movies.","fr":"On va au restaurant en famille.","en":"We're going to a restaurant with the family.","fr":"On peut parler ensemble.","en":"We can talk together."]"
- `concepts[0].example` ""on va au cinéma (we're going to movies), on dit que (people say that), on ne peut pas (one cannot)"" → "(removed)"
- `concepts[1].term` "on conjugates like il/elle (third person singular)" → "on takes the verb of il"
- `concepts[1].definition` "CRITICAL: Even though 'on' means 'we', it uses il/elle verb forms!" → "Even when on means we, its verb has the form for he and she."
- `concepts[1].examples` "(none)" → "["fr":"On est ici.","en":"We're here.","note":"like il est","fr":"On a le temps.","en":"We have time.","note":"like il a","fr":"On fait ça ensemble.","en":"We do that together.","note":"like il fait"]"
- `concepts[1].example` ""on est (we are), on a (we have), on va (we go), on fait (we do) - all use il/elle forms"" → "(removed)"
- `concepts[2].term` "on vs nous" → "on or nous"
- `concepts[2].definition` "on = informal, conversational (90% of speech). nous = formal, written (10%)" → "Friends say on. nous sounds more formal and is more common in writing."
- `concepts[2].examples` "(none)" → "["fr":"On va manger ?","en":"Shall we eat?","note":"with friends","fr":"Nous allons manger.","en":"We are going to eat.","note":"more formal"]"
- `concepts[2].example` ""Friends: 'on va manger?' Formal: 'nous allons manger' (much less common!)"" → "(removed)"
- `concepts[3].term` "les gens = people (general)" → "les gens = people"
- `concepts[3].definition` "Plural noun for referring to people in general - very common!" → "A plural noun for people in general, so its verb is plural."
- `concepts[3].examples` "(none)" → "["fr":"Les gens sont gentils.","en":"People are nice.","fr":"Les gens disent que c'est bon.","en":"People say it's good."]"
- `concepts[3].example` ""les gens disent (people say), les gens pensent (people think), les gens sont gentils (people are nice)"" → "(removed)"
- `concepts[4].definition` "Fixed expression (literally 'all the world') - uses SINGULAR verb!" → "Literally all the world. Its verb is singular, like the verb of il."
- `concepts[4].examples` "(none)" → "["fr":"Tout le monde sait.","en":"Everyone knows.","fr":"Tout le monde est ici.","en":"Everybody is here."]"
- `concepts[4].example` ""tout le monde sait (everyone knows - singular!), tout le monde pense (everyone thinks)"" → "(removed)"
- `concepts[5].term` "Making general statements" → "Saying what is true for anyone"
- `concepts[5].definition` "Use 'on' for universal truths or common wisdom - sounds philosophical!" → "Use on for things that are true for everyone."
- `concepts[5].examples` "(none)" → "["fr":"On apprend tous les jours.","en":"We learn every day.","fr":"On ne peut pas tout savoir.","en":"You can't know everything."]"
- `concepts[5].example` ""On apprend en faisant des erreurs (We/One learns by making mistakes), On ne peut pas tout savoir (One can't know everything)"" → "(removed)"

**2024-05-09-studying-verbs**

- `concepts[0].definition` "Regular -ER verb - easy! Essential for academic contexts" → "A regular -er verb for studying, at school or on your own."
- `concepts[0].examples` "(none)" → "["fr":"J'étudie le français.","en":"I'm studying French.","fr":"Tu étudies à l'université ?","en":"Do you study at university?","fr":"Nous étudions ensemble.","en":"We study together."]"
- `concepts[0].example` ""j'étudie à l'université (I study at university), j'étudie le français (I'm studying French)"" → "(removed)"
- `concepts[1].term` "réviser = to review / to revise" → "réviser = to review"
- `concepts[1].definition` "Regular -ER verb - going over material you've learned" → "A regular -er verb for going over what you studied before."
- `concepts[1].examples` "(none)" → "["fr":"Je révise mes leçons.","en":"I'm reviewing my lessons.","fr":"Elle révise pour l'examen.","en":"She's reviewing for the exam."]"
- `concepts[1].example` ""je révise mes leçons (I'm reviewing my lessons), je révise pour l'examen (I'm reviewing for the exam)"" → "(removed)"
- `concepts[2].term` "Study workflow" → "From studying to knowing"
- `concepts[2].definition` "Natural progression: study → learn → understand → review → know" → "These verbs follow the steps of learning something."
- `concepts[2].examples` "(none)" → "["fr":"J'étudie.","en":"I study.","fr":"J'apprends.","en":"I learn.","fr":"Je comprends.","en":"I understand.","fr":"Je révise.","en":"I review."]"
- `concepts[2].example` ""j'étudie → j'apprends → je comprends → je révise → je sais"" → "(removed)"
- `concepts[3].term` "étudier vs apprendre" → "étudier or apprendre"
- `concepts[3].definition` "étudier = the act of studying (action), apprendre = acquiring knowledge (result)" → "étudier is the work you do. apprendre is what you get from it."
- `concepts[3].examples` "(none)" → "["fr":"J'étudie le soir.","en":"I study in the evening.","fr":"J'apprends beaucoup.","en":"I learn a lot."]"
- `concepts[3].example` ""j'étudie pendant 2 heures (I study for 2 hours - action), j'apprends beaucoup (I learn a lot - result)"" → "(removed)"
- `concepts[4].term` "Complete learning narrative" → "Saying how you learn"
- `concepts[4].definition` "Now you can describe your entire learning journey in French!" → "Put these verbs together to say how you learn French."
- `concepts[4].examples` "(none)" → "["fr":"J'étudie le français et j'apprends beaucoup.","en":"I'm studying French and I'm learning a lot.","fr":"Je révise mes leçons le soir.","en":"I review my lessons in the evening.","fr":"Je pense en français.","en":"I think in French."]"
- `concepts[4].example` ""J'étudie → j'apprends → je comprends → je révise → je sais → je pense → je crois (I study → learn → understand → review → know → think → believe)"" → "(removed)"

**2024-05-04-learning-verbs**

- `concepts[0].definition` "Part of prendre family (you already know this pattern!) - essential for education" → "The verb for learning something. It changes like prendre."
- `concepts[0].examples` "(none)" → "["fr":"J'apprends le français.","en":"I'm learning French.","fr":"J'apprends beaucoup de mots.","en":"I'm learning a lot of words.","fr":"Nous apprenons ensemble.","en":"We're learning together."]"
- `concepts[0].example` ""j'apprends le français (I'm learning French), nous apprenons ensemble (we're learning together)"" → "(removed)"
- `concepts[1].term` "Same pattern as prendre/comprendre" → "Like prendre"
- `concepts[1].definition` "If you know prendre and comprendre, you know apprendre! Add ap- prefix" → "apprendre is prendre with ap- in front, so its forms change the same way."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"j'apprends","en":"I learn","fr":"tu apprends","en":"you learn","fr":"il apprend","en":"he learns","fr":"nous apprenons","en":"we learn","fr":"vous apprenez","en":"you learn","fr":"ils apprennent","en":"they learn"]"
- `concepts[1].example` ""je prends → j'apprends, tu comprends → tu apprends (same pattern!)"" → "(removed)"
- `concepts[2].definition` "Regular -ER verb - easy! Natural pair with apprendre" → "A regular -er verb. One person teaches and another learns."
- `concepts[2].examples` "(none)" → "["fr":"J'enseigne le français.","en":"I teach French.","fr":"Ils enseignent à l'université.","en":"They teach at the university."]"
- `concepts[2].example` ""j'enseigne le français (I teach French), il m'enseigne (he teaches me)"" → "(removed)"
- `concepts[3].term` "Beautiful semantic progression" → "Teaching, learning, understanding"
- `concepts[3].definition` "Teacher teaches → student learns → student understands → student knows" → "One person teaches. The other learns, and then understands."
- `concepts[3].examples` "(none)" → "["fr":"Il m'enseigne le français.","en":"He teaches me French.","fr":"J'apprends le français avec lui.","en":"I'm learning French with him.","fr":"Maintenant, je comprends.","en":"Now I understand."]"
- `concepts[3].example` ""Il m'enseigne → j'apprends → je comprends → je sais (complete learning cycle!)"" → "(removed)"
- `concepts[4].term` "apprendre à + infinitive" → "Learning to do something"
- `concepts[4].definition` "Use 'à' before infinitive to say learning how to do something" → "Put à before the verb to say what you are learning to do."
- `concepts[4].examples` "(none)" → "["fr":"J'apprends à parler français.","en":"I'm learning to speak French.","fr":"J'apprends à faire du café.","en":"I'm learning to make coffee."]"
- `concepts[4].example` ""j'apprends à nager (I'm learning to swim), j'apprends à parler français (I'm learning to speak French)"" → "(removed)"

**2024-04-29-comprendre**

- `vocabulary[2].word_id` "tu-comprends-fr.you-understand" → "tu-comprends-fr"
- `concepts[0].definition` "Essential learning verb - follows same pattern as prendre (which you already know!)" → "The verb for understanding a language, a person or an idea."
- `concepts[0].examples` "(none)" → "["fr":"Je comprends le français.","en":"I understand French.","fr":"Je comprends bien.","en":"I understand well."]"
- `concepts[0].example` ""je comprends le français (I understand French), tu comprends? (do you understand?)"" → "(removed)"
- `concepts[1].term` "Same pattern as prendre" → "Like prendre"
- `concepts[1].definition` "If you know prendre, you know comprendre! Just add com- prefix" → "comprendre is prendre with com- in front, so its forms change the same way."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je comprends","en":"I understand","fr":"tu comprends","en":"you understand","fr":"il comprend","en":"he understands","fr":"nous comprenons","en":"we understand","fr":"vous comprenez","en":"you understand","fr":"ils comprennent","en":"they understand"]"
- `concepts[1].example` ""je prends → je comprends, tu prends → tu comprends, ils prennent → ils comprennent"" → "(removed)"
- `concepts[2].term` "Most common use: 'Je ne comprends pas'" → "Je ne comprends pas"
- `concepts[2].definition` "THE essential phrase for learning - I don't understand" → "The sentence you will need most while you learn."
- `concepts[2].examples` "(none)" → "["fr":"Je ne comprends pas.","en":"I don't understand.","fr":"Pardon, je ne comprends pas.","en":"Sorry, I don't understand.","fr":"Tu comprends ?","en":"Do you understand?"]"
- `concepts[2].example` ""Je ne comprends pas (I don't understand), Tu comprends? (Do you understand?)"" → "(removed)"
- `concepts[3].term` "comprendre + noun" → "Understanding people and things"
- `concepts[3].definition` "You can understand things, people, languages, concepts" → "Put the person or thing straight after the verb."
- `concepts[3].examples` "(none)" → "["fr":"Je comprends Marie.","en":"I understand Marie.","fr":"Je comprends la leçon.","en":"I understand the lesson."]"
- `concepts[3].example` ""je comprends le français (I understand French), je comprends Marie (I understand Marie)"" → "(removed)"
- `concepts[4].term` "Building on prendre knowledge" → "The prendre family"
- `concepts[4].definition` "Three verbs in prendre family: prendre (take), apprendre (learn), comprendre (understand)" → "prendre means to take. With a front added, it gives apprendre, to learn, and comprendre, to understand."
- `concepts[4].examples` "(none)" → "["fr":"Je prends le livre.","en":"I take the book.","fr":"J'apprends le français.","en":"I'm learning French.","fr":"Je comprends la leçon.","en":"I understand the lesson."]"
- `concepts[4].example` ""j'apprends → je comprends (I learn → I understand) - natural progression!"" → "(removed)"
- `glosses` "(none)" → "["fr":"compris","en":"understood","note":"past participle of comprendre, like pris: j'ai compris"]"

**2024-05-08-savoir**

- `concepts[0].term` "savoir = to know (facts or skills)" → "savoir = to know"
- `concepts[0].definition` "CRITICAL distinction: savoir is for facts you learned or skills you have" → "Use savoir for facts you know and for things you know how to do."
- `concepts[0].examples` "(none)" → "["fr":"Je sais la réponse.","en":"I know the answer.","fr":"Je sais que c'est vrai.","en":"I know it's true."]"
- `concepts[0].example` ""je sais la réponse (I know the answer), je sais nager (I know how to swim)"" → "(removed)"
- `concepts[1].term` "Irregular conjugation" → "The forms of savoir"
- `concepts[1].definition` "Must memorize! Present: je sais, tu sais, il sait, nous savons, vous savez, ils savent" → "The three singular forms sound the same. The plural forms change the stem to sav-."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je sais","en":"I know","fr":"tu sais","en":"you know","fr":"il sait","en":"he knows","fr":"nous savons","en":"we know","fr":"vous savez","en":"you know","fr":"ils savent","en":"they know"]"
- `concepts[1].example` ""Notice: je/tu/il all sound the same ('say'), nous/vous different"" → "(removed)"
- `concepts[2].term` "'Je ne sais pas' - THE phrase" → "Je ne sais pas"
- `concepts[2].definition` "Rank 21 = one of most common phrases in ALL of French! You'll use it constantly" → "One of the most common sentences in French."
- `concepts[2].examples` "(none)" → "["fr":"Je ne sais pas.","en":"I don't know.","fr":"Tu sais ?","en":"You know?","fr":"Vous savez ?","en":"Do you know?"]"
- `concepts[2].example` ""Je ne sais pas (I don't know), Tu sais? (You know? / Do you know?)"" → "(removed)"
- `concepts[3].term` "savoir + infinitive = know how to" → "Knowing how to do something"
- `concepts[3].definition` "Use savoir + verb to express skills/abilities" → "Put a verb after savoir to say what you know how to do."
- `concepts[3].examples` "(none)" → "["fr":"Je sais parler français.","en":"I can speak French.","fr":"Je sais faire du café.","en":"I know how to make coffee."]"
- `concepts[3].example` ""je sais parler français (I know how to speak French), je sais nager (I can swim)"" → "(removed)"
- `concepts[4].term` "savoir vs connaître (preview)" → "Knowing a fact"
- `concepts[4].definition` "savoir = facts/skills, connaître = people/places (you'll learn connaître next!)" → "savoir is for facts and skills, never for people or places."
- `concepts[4].examples` "(none)" → "["fr":"Je sais qu'il est là.","en":"I know he's here.","fr":"Nous savons ça.","en":"We know that."]"
- `concepts[4].example` ""je sais la réponse (I know the answer), je connais Marie (I know Marie) ← next module!"" → "(removed)"
- `glosses` "(none)" → "["fr":"savais","en":"knew","note":"imparfait of savoir: je ne savais pas"]"

**2024-04-30-connaitre**

- `concepts[0].term` "connaître = to know (people or places)" → "connaître = to know"
- `concepts[0].definition` "CRITICAL distinction: connaître is for people you know or places you're familiar with" → "Use connaître for people and places you know, and for things you are familiar with."
- `concepts[0].examples` "(none)" → "["fr":"Je connais Marie.","en":"I know Marie.","fr":"Je connais Paris.","en":"I know Paris.","fr":"Je ne sais pas, je ne connais pas Paris.","en":"I don't know, I don't know Paris."]"
- `concepts[0].example` ""je connais Marie (I know Marie), je connais Paris (I know/am familiar with Paris)"" → "(removed)"
- `concepts[1].term` "Irregular conjugation with î" → "The forms of connaître"
- `concepts[1].definition` "Present: je connais, tu connais, il connaît, nous connaissons, vous connaissez, ils connaissent" → "The form for he and she keeps the î. The plural forms add -ss-."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je connais","en":"I know","fr":"tu connais","en":"you know","fr":"il connaît","en":"he knows","fr":"nous connaissons","en":"we know","fr":"vous connaissez","en":"you know","fr":"ils connaissent","en":"they know"]"
- `concepts[1].example` ""Notice: î with circumflex accent in il/elle form, double -ss- in plural"" → "(removed)"
- `concepts[2].term` "THE KEY DISTINCTION: savoir vs connaître" → "savoir or connaître"
- `concepts[2].definition` "savoir = facts/skills (learned), connaître = people/places (familiarity)" → "savoir is for facts and skills. connaître is for people, places and things you know well."
- `concepts[2].examples` "(none)" → "["fr":"Je sais la réponse.","en":"I know the answer.","fr":"Je connais Marie.","en":"I know Marie.","fr":"Je sais son nom, mais je ne le connais pas.","en":"I know his name, but I don't know him."]"
- `concepts[2].example` ""je sais la réponse (I know the answer) BUT je connais Marie (I know Marie)"" → "(removed)"
- `concepts[3].term` "NEVER use connaître + infinitive" → "A skill takes savoir"
- `concepts[3].definition` "You CANNOT say 'je connais parler' - use savoir for skills!" → "Before another verb, always use savoir, never connaître."
- `concepts[3].examples` "(none)" → "["fr":"Je sais parler français.","en":"I can speak French.","fr":"Tu sais faire ça ?","en":"Do you know how to do that?"]"
- `concepts[3].example` ""✓ je sais parler (I know how to speak), ✗ je connais parler (WRONG!)"" → "(removed)"
- `concepts[4].term` "Common uses" → "Knowing places and things"
- `concepts[4].definition` "Know people, know places, be familiar with things (movies, books, brands)" → "Use connaître for a film, a restaurant or a book you know."
- `concepts[4].examples` "(none)" → "["fr":"Je connais ce film.","en":"I know this film.","fr":"Tu connais ce restaurant ?","en":"Do you know this restaurant?"]"
- `concepts[4].example` ""je connais ce film (I know this movie), tu connais ce restaurant? (do you know this restaurant?)"" → "(removed)"

**2024-05-06-penser**

- `concepts[0].definition` "Core cognitive verb for expressing opinions and thoughts" → "The verb for saying what you think."
- `concepts[0].examples` "(none)" → "["fr":"Je pense que c'est bon.","en":"I think it's good.","fr":"Les gens pensent ça.","en":"People think that."]"
- `concepts[0].example` ""je pense que c'est bon (I think it's good), tu penses? (what do you think?)"" → "(removed)"
- `concepts[1].term` "Regular -ER verb" → "A regular -er verb"
- `concepts[1].definition` "Easy conjugation! Like parler, manger, etc. (verbs you already know)" → "penser changes like parler."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je pense","en":"I think","fr":"tu penses","en":"you think","fr":"il pense","en":"he thinks","fr":"nous pensons","en":"we think","fr":"vous pensez","en":"you think","fr":"ils pensent","en":"they think"]"
- `concepts[1].example` ""je pense, tu penses, il pense - add -e, -es, -e endings"" → "(removed)"
- `concepts[2].term` "penser que... (to think that...)" → "penser que = to think that"
- `concepts[2].definition` "Use 'que' to introduce your opinion - VERY common pattern" → "Put que before what you think. Before a vowel it becomes qu'."
- `concepts[2].examples` "(none)" → "["fr":"Je pense que oui.","en":"I think so.","fr":"Je pense que non.","en":"I don't think so.","fr":"Je pense que je connais Marie.","en":"I think I know Marie.","fr":"Je pense qu'il sait parler anglais.","en":"I think he can speak English."]"
- `concepts[2].example` ""je pense que oui (I think so), je pense que non (I don't think so)"" → "(removed)"
- `concepts[3].term` "penser à... (to think about...)" → "penser à = to think about"
- `concepts[3].definition` "Use 'à' + person/thing when thinking about something" → "Put à before the person or thing on your mind."
- `concepts[3].examples` "(none)" → "["fr":"Je pense à toi.","en":"I'm thinking about you.","fr":"Je pense à ça.","en":"I'm thinking about that."]"
- `concepts[3].example` ""je pense à toi (I'm thinking about you), je pense à ça (I'm thinking about that)"" → "(removed)"
- `concepts[4].term` "Asking opinions" → "Asking what someone thinks"
- `concepts[4].definition` "Qu'est-ce que tu penses? = What do you think? (essential!)" → "Add de before the thing you ask about."
- `concepts[4].examples` "(none)" → "["fr":"Qu'est-ce que tu penses ?","en":"What do you think?","fr":"Qu'est-ce que tu penses de ça ?","en":"What do you think of that?"]"
- `concepts[4].example` ""Qu'est-ce que tu penses de ça? (What do you think about that?)"" → "(removed)"

**2024-05-01-croire**

- `concepts[0].term` "croire = to believe / to think" → "croire = to believe, to think"
- `concepts[0].definition` "Express belief or softer opinions - often used like penser but more tentative" → "Like penser, but less sure. It also means to believe someone."
- `concepts[0].examples` "(none)" → "["fr":"Je crois que c'est vrai.","en":"I believe it's true.","fr":"Tu crois ?","en":"Do you think so?","fr":"Je te crois.","en":"I believe you."]"
- `concepts[0].example` ""je crois que c'est vrai (I believe it's true), tu crois? (do you think so?)"" → "(removed)"
- `concepts[1].term` "Irregular conjugation" → "The forms of croire"
- `concepts[1].definition` "Present: je crois, tu crois, il croit, nous croyons, vous croyez, ils croient" → "The three singular forms sound the same. The forms for we and you take a y."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je crois","en":"I believe","fr":"tu crois","en":"you believe","fr":"il croit","en":"he believes","fr":"nous croyons","en":"we believe","fr":"vous croyez","en":"you believe","fr":"ils croient","en":"they believe"]"
- `concepts[1].example` ""Notice: singular all same sound ('kwa'), nous/vous have y, ils have -ient"" → "(removed)"
- `concepts[2].term` "croire que... (to believe that...)" → "croire que = to believe that"
- `concepts[2].definition` "Like penser que, use with 'que' to introduce what you believe" → "Put que before what you believe, as with penser."
- `concepts[2].examples` "(none)" → "["fr":"Je crois que oui.","en":"I think so.","fr":"Je ne crois pas.","en":"I don't think so."]"
- `concepts[2].example` ""je crois que oui (I believe so), je ne crois pas (I don't believe so / I don't think so)"" → "(removed)"
- `concepts[3].term` "croire à / croire en (to believe in)" → "croire en, croire à = to believe in"
- `concepts[3].definition` "Use à or en to express belief in concepts or things" → "Use en for a person you trust, and à for an idea or a thing."
- `concepts[3].examples` "(none)" → "["fr":"Je crois en toi.","en":"I believe in you.","fr":"Je crois à ça.","en":"I believe in that."]"
- `concepts[3].example` ""je crois en toi (I believe in you), je crois à ça (I believe in that)"" → "(removed)"
- `concepts[4].term` "penser vs croire" → "penser or croire"
- `concepts[4].definition` "penser = think (more definite), croire = believe (more tentative/hopeful)" → "je pense sounds more sure. je crois leaves more room for doubt."
- `concepts[4].examples` "(none)" → "["fr":"Je pense qu'il vient.","en":"I think he's coming.","note":"fairly sure","fr":"Je crois qu'il vient.","en":"I believe he's coming.","note":"less sure"]"
- `concepts[4].example` ""je pense qu'il vient (I think he's coming - pretty sure), je crois qu'il vient (I believe he's coming - less certain)"" → "(removed)"
- `glosses` "(none)" → "["fr":"croyais","en":"believed, thought","note":"imparfait of croire: je croyais que…"]"

**2024-05-03-knowledge-nouns**

- `concepts[0].term` "Academic nouns" → "School words"
- `concepts[0].definition` "Essential vocabulary for school, university, and learning contexts" → "Nouns for school, university and class."
- `concepts[0].examples` "(none)" → "["fr":"Je vais à l'université.","en":"I go to university.","fr":"L'école est là-bas.","en":"The school is over there.","fr":"J'apprends mes leçons.","en":"I'm learning my lessons."]"
- `concepts[0].example` ""le cours (class), la leçon (lesson), l'école (school), l'université (university)"" → "(removed)"
- `concepts[1].term` "Knowledge nouns" → "Words for knowledge"
- `concepts[1].definition` "Abstract nouns related to knowing and understanding" → "Nouns for knowing and thinking."
- `concepts[1].examples` "(none)" → "["fr":"la connaissance","en":"knowledge","note":"what a person knows","fr":"le savoir","en":"knowledge","note":"knowledge in general","fr":"la pensée","en":"thought"]"
- `concepts[1].example` ""la connaissance (knowledge - what you know), le savoir (knowledge - abstract), la pensée (thought)"" → "(removed)"
- `concepts[2].term` "Communication nouns" → "Questions and answers"
- `concepts[2].definition` "Question-and-answer vocabulary - essential for learning!" → "Nouns you need in any lesson."
- `concepts[2].examples` "(none)" → "["fr":"J'ai une question.","en":"I have a question.","fr":"Je sais la réponse.","en":"I know the answer.","fr":"C'est une bonne idée.","en":"That's a good idea."]"
- `concepts[2].example` ""la question (question), la réponse (answer), l'idée (idea)"" → "(removed)"
- `concepts[3].term` "Complete sentence composition" → "Sentences about learning"
- `concepts[3].definition` "Now you can build full sentences about learning and knowing" → "Put these nouns with the verbs of this unit."
- `concepts[3].examples` "(none)" → "["fr":"Je comprends la question.","en":"I understand the question.","fr":"Je vais au cours.","en":"I'm going to class.","fr":"Tu as une idée ?","en":"Do you have an idea?"]"
- `concepts[3].example` ""J'ai une question (I have a question), C'est une bonne idée (That's a good idea), Je vais au cours (I'm going to class)"" → "(removed)"
- `glosses` "(none)" → "["fr":"enchantée","en":"pleased to meet you","note":"feminine of enchanté, said or written by a woman"]"

**2024-05-02-discourse-markers**

- `concepts[0].term` "What are discourse markers?" → "Small words that fill speech"
- `concepts[0].definition` "Words that organize speech, show transitions, add emphasis, or fill pauses - natives use them CONSTANTLY!" → "French speakers use short words to link ideas, take a pause and soften what they say. They make you sound natural."
- `concepts[0].examples` "(none)" → "["fr":"Je ne comprends pas.","en":"I don't understand.","fr":"Bon, je ne comprends pas, donc je veux apprendre, quoi.","en":"Well, I don't understand, so I want to learn, you know.","note":"the same idea, the way people say it"]"
- `concepts[0].example` ""Without: 'Je ne comprends pas. Je veux apprendre.' With: 'Bon, je ne comprends pas, donc je veux apprendre, quoi.' ← Native!"" → "(removed)"
- `concepts[1].term` "donc = so / therefore" → "donc = so, therefore"
- `concepts[1].definition` "Shows logical conclusion - very common! Connects cause and effect" → "donc links a cause to its result. At the start of a question it means so."
- `concepts[1].examples` "(none)" → "["fr":"Je pense, donc je suis.","en":"I think, therefore I am.","note":"Descartes","fr":"Donc, tu comprends ?","en":"So, do you understand?"]"
- `concepts[1].example` ""Je pense, donc je suis (I think, therefore I am - Descartes!), Donc, tu comprends? (So, do you understand?)"" → "(removed)"
- `concepts[2].term` "en fait = in fact / actually" → "en fait = actually"
- `concepts[2].definition` "Corrects or clarifies something - super common in conversation" → "Use it to correct or explain what was just said."
- `concepts[2].examples` "(none)" → "["fr":"En fait, je ne sais pas.","en":"Actually, I don't know.","fr":"En fait, c'est comme ça.","en":"In fact, that's how it is."]"
- `concepts[2].example` ""En fait, je ne sais pas (Actually, I don't know), En fait, c'est comme ça (In fact, that's how it is)"" → "(removed)"
- `concepts[3].term` "bah = well..." → "bah = well"
- `concepts[3].definition` "Filler word - shows hesitation or introduces explanation (informal!)" → "An informal sound for a pause before you explain."
- `concepts[3].examples` "(none)" → "["fr":"Bah, c'est comme ça.","en":"Well, that's how it is.","fr":"Bah, je ne sais pas.","en":"Well, I don't know."]"
- `concepts[3].example` ""Bah, c'est comme ça (Well, that's how it is), Bah, je sais pas (Well, I don't know)"" → "(removed)"
- `concepts[4].term` "quoi = like / you know (at end)" → "quoi at the end = you know"
- `concepts[4].definition` "End-of-sentence filler - VERY French! Emphasizes or seeks agreement" → "Put quoi at the end of a sentence to stress it in casual speech."
- `concepts[4].examples` "(none)" → "["fr":"C'est bon, quoi.","en":"It's good, you know.","fr":"C'est comme ça, quoi.","en":"That's how it is, you know."]"
- `concepts[4].example` ""C'est bon, quoi (It's good, you know), Je pense ça, quoi (I think that, like)"" → "(removed)"
- `concepts[5].term` "More discourse markers" → "bon and alors"
- `concepts[5].definition` "bon (well, so), alors (so, then), ainsi (thus - formal)" → "Both often start a sentence. bon means well, and alors means so or then."
- `concepts[5].examples` "(none)" → "["fr":"Bon, on commence ?","en":"Well, shall we start?","fr":"Alors, tu viens ?","en":"So, are you coming?","fr":"Alors, tu vas à l'université ? En fait, je n'ai pas de cours aujourd'hui.","en":"So, are you going to the university? Actually, I don't have class today.","fr":"Bon, voilà la réponse.","en":"Well, there's the answer."]"
- `concepts[5].example` ""Bon, on commence? (Well, shall we start?), Alors, tu viens? (So, are you coming?)"" → "(removed)"

**2024-04-28-comparison-modifiers**

- `concepts[0].term` "tout = all / everything" → "tout = all, everything"
- `concepts[0].definition` "VERY versatile word! Can be pronoun, adjective, or adverb - rank 49" → "On its own, tout means everything. Before a noun it means all or the whole, and it agrees with the noun."
- `concepts[0].examples` "(none)" → "["fr":"Je sais tout.","en":"I know everything.","fr":"Toute la classe est là.","en":"The whole class is here.","fr":"On apprend tous les jours.","en":"We learn every day.","fr":"C'est tout petit.","en":"It's very small.","note":"before an adjective, tout means very"]"
- `concepts[0].example` ""tout (everything), tout le monde (everyone), toute la classe (the whole class), tout petit (very small)"" → "(removed)"
- `concepts[1].definition` "Fixed expression! Literally 'all the world' but means 'everyone'" → "Literally all the world. Its verb is singular."
- `concepts[1].examples` "(none)" → "["fr":"Tout le monde comprend.","en":"Everyone understands.","fr":"Tout le monde est là ?","en":"Is everyone here?"]"
- `concepts[1].example` ""Tout le monde sait (Everyone knows), Tout le monde comprend (Everyone understands)"" → "(removed)"
- `concepts[2].term` "même = same / even" → "même = same, even"
- `concepts[2].definition` "Expresses sameness OR emphasis - rank 85, very common!" → "With an article in front, même means same. Before a word, it means even."
- `concepts[2].examples` "(none)" → "["fr":"C'est la même chose.","en":"It's the same thing.","fr":"Même moi, je sais.","en":"Even I know."]"
- `concepts[2].example` ""C'est la même chose (It's the same thing), Même moi, je sais (Even I know)"" → "(removed)"
- `concepts[3].term` "mal = badly / poorly" → "mal = badly"
- `concepts[3].definition` "Opposite of 'bien' (well) - rank 87, for negative descriptions" → "The opposite of bien."
- `concepts[3].examples` "(none)" → "["fr":"Ça va mal.","en":"Things are going badly.","fr":"Il va mal.","en":"He's not well."]"
- `concepts[3].example` ""Je comprends mal (I understand poorly), Ça va mal (It's going badly)"" → "(removed)"
- `concepts[4].term` "Complete comparison toolkit" → "Saying how well"
- `concepts[4].definition` "Now you have: plus, moins, trop, très, aussi, tout, même, mal - full range!" → "Put these words after the verb to say how well something goes."
- `concepts[4].examples` "(none)" → "["fr":"Je comprends très bien.","en":"I understand very well.","fr":"Je comprends bien.","en":"I understand well.","fr":"Je comprends mal.","en":"I don't understand well."]"
- `concepts[4].example` ""Je comprends très bien (very well), Je comprends mal (poorly), C'est la même chose (same), Tout le monde comprend (everyone)"" → "(removed)"
- `glosses` "(none)" → "["fr":"enchantée","en":"pleased to meet you","note":"feminine of enchanté","fr":"études","en":"studies","note":"plural of étude: tes études, your studies","fr":"compris","en":"understood","note":"past participle of comprendre: Paul a compris"]"

**2024-05-07-reading-7**

- `title` "Reading 7 - L'Art d'Apprendre" → "Reading - L'Art d'Apprendre"
- `description` "A philosophical article about learning and education. Uses all cognitive verbs from Unit 7!" → "A philosophical article about learning and education. Uses all cognitive verbs from this unit!"
- `vocabulary[0].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[2].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[4].fr` "étudiant(s)" → "étudiant"
- `vocabulary[4].gloss` "student(s)" → "student"
- `vocabulary[4].note` "noun" → "noun; plural étudiants"
- `vocabulary[5].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[9].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[12].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[14].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[18].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[20].note` ""Unit 7 verb"" → "(removed)"
- `vocabulary[23].note` ""Unit 6 verb"" → "(removed)"
- `vocabulary[25].note` ""Unit 6 verb"" → "(removed)"
- `vocabulary[43].note` "modifier" → "adverb or adjective"
- `vocabulary[55].note` ""Unit 6 verb"" → "(removed)"
- `glossary` "["fr":"étudiant(s)","en":"student(s)","fr":"poser des questions","en":"to ask questions","fr":"demande du temps","en":"takes time"]" → "["fr":"poser des questions","en":"to ask questions","fr":"demande du temps","en":"takes time"]"
- `glosses` "(none)" → "["fr":"étudiante","en":"student (a woman)","note":"feminine of étudiant","fr":"étudiants","en":"students","note":"plural of étudiant","fr":"pose","en":"asks","note":"present of poser: Socrate pose des questions"]"
- `items[2].answer` "demander des questions" → "poser des questions"

**2024-05-11-unit-7-practice**

- `title` "Unit 7 Practice - Fill in the Blanks" → "Knowledge & Learning Practice - Fill in the Blanks"
- `description` "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from Unit 7!" → "Complete sentences using cognitive verbs, on, discourse markers, and essential vocabulary from this unit!"

**2024-05-10-unit-7-exam**

- `description` "Test everything from Unit 7! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers." → "Test everything from this unit! Cognitive verbs (understand, know, think, believe), on pronoun, discourse markers, and modifiers."

**2024-05-23-temporal-words**

- `concepts` "["id":"c-temporal-prepositions","term":"Temporal Prepositions","definition":"Words that show when or for how long something happens - used with nouns","example":"pendant des heures (for hours), avant le cours (before class), après le dîner (after dinner)","id":"c-sequential-connectors","term":"Sequential Connectors","definition":"Words that show the order of actions - connect sentences smoothly","example":"D'abord, je mange. Ensuite, je pars. Finalement, j'arrive. (First, I eat. Then, I leave. Finally, I arrive.)","id":"c-building-smooth-narratives","term":"Building Smooth Narratives","definition":"Use these words to tell stories and describe routines naturally","example":"Before: 'Je mange. Je pars.' (choppy) After: 'D'abord, je mange. Ensuite, je pars.' (smooth!)","id":"c-position-in-sentence","term":"Position in Sentence","definition":"Sequential connectors usually start sentences. Prepositions go before nouns.","example":"D'abord, je pars (First, I leave). Je pars après le cours (I leave after class)."]" → "["id":"c-temporal-prepositions","term":"Before, after, during","definition":"These words go before a noun to say when something happens or how long it lasts.","examples":["fr":"Après le travail, je bois un café.","en":"After work, I have a coffee.","fr":"Avant le cours, j'étudie.","en":"Before class, I study.","fr":"J'étudie pendant une heure.","en":"I study for an hour."],"id":"c-time-phrases","term":"When and how often","definition":"Short phrases that say when something happens or how often.","examples":["fr":"En ce moment, je suis à Paris.","en":"Right now I'm in Paris.","fr":"Cette année, j'apprends le français.","en":"This year I'm learning French.","fr":"J'ai mangé là-bas une fois.","en":"I ate there once."],"id":"c-sequential-connectors","term":"First, then, finally","definition":"These words put actions in order. They usually start the sentence.","examples":["fr":"D'abord, je mange.","en":"First, I eat.","fr":"Ensuite, je pars.","en":"Then I leave.","fr":"Finalement, j'arrive.","en":"Finally, I arrive."],"id":"c-building-smooth-narratives","term":"Telling things in order","definition":"Without these words, short sentences sound choppy. With them, they sound like a story.","examples":["fr":"Je mange. Je pars.","en":"I eat. I leave.","note":"choppy","fr":"D'abord, je mange. Ensuite, je pars.","en":"First I eat. Then I leave.","note":"smooth"],"id":"c-position-in-sentence","term":"Where these words go","definition":"Words for order usually start the sentence. Words like avant and après go before a noun.","examples":["fr":"D'abord, je pars.","en":"First, I leave.","fr":"Je pars après le cours.","en":"I leave after class.","fr":"Je suis ici depuis ce matin.","en":"I've been here since this morning."]]"

**2024-05-21-reflexive-pronouns**

- `concepts[0].term` "Reflexive Pronouns" → "Reflexive pronouns"
- `concepts[0].definition` "Pronouns that refer back to the subject - 'myself', 'yourself', 'himself', etc." → "A reflexive pronoun points back to the subject, like myself or yourself in English."
- `concepts[0].examples` "(none)" → "["fr":"Je me lave.","en":"I wash myself.","fr":"Tu te lèves ?","en":"Are you getting up?","fr":"Il se prépare.","en":"He's getting ready."]"
- `concepts[0].example` ""je me lave (I wash myself), tu te lèves (you get yourself up), il se prépare (he prepares himself)"" → "(removed)"
- `concepts[1].term` "Parallel to Object Pronouns" → "Like object pronouns"
- `concepts[1].definition` "Same forms as object pronouns, but refer back to the subject" → "The forms are the same as the object pronouns. The difference is who they point to."
- `concepts[1].examples` "(none)" → "["fr":"Il me voit.","en":"He sees me.","note":"an object pronoun","fr":"Je me vois.","en":"I see myself.","note":"a reflexive pronoun"]"
- `concepts[1].example` ""Object: il me voit (he sees me). Reflexive: je me vois (I see myself)"" → "(removed)"
- `concepts[2].term` "Position: Before the Verb" → "Before the verb"
- `concepts[2].definition` "Reflexive pronouns go BEFORE the conjugated verb, just like object pronouns" → "The reflexive pronoun goes right before the verb, like an object pronoun."
- `concepts[2].examples` "(none)" → "["fr":"Tu te lèves.","en":"You get up.","fr":"Elle se lave.","en":"She's washing.","fr":"Je ne me lave pas.","en":"I'm not washing.","note":"with ne … pas, it stays before the verb"]"
- `concepts[2].example` ""je me lave (not je lave me), tu te lèves (not tu lèves te)"" → "(removed)"
- `concepts[3].term` "The Reflexive Pronoun Set" → "One pronoun for each person"
- `concepts[3].definition` "me (myself), te (yourself), se (himself/herself/oneself), nous (ourselves), vous (yourselves), se (themselves)" → "Each subject has its own reflexive pronoun. se works for he, she and they."
- `concepts[3].layout` "(none)" → ""forms""
- `concepts[3].examples` "(none)" → "["fr":"je me lave","en":"I wash","fr":"tu te laves","en":"you wash","fr":"il se lave","en":"he washes","fr":"nous nous lavons","en":"we wash","fr":"vous vous lavez","en":"you wash","fr":"ils se lavent","en":"they wash"]"
- `concepts[3].example` ""Each pronoun matches a subject: je → me, tu → te, il/elle → se, nous → nous, vous → vous, ils/elles → se"" → "(removed)"
- `items[3].instruction` "Which reflexive pronoun goes with 'elle'?" → "Which reflexive pronoun goes with 'elle'? The sentence means "her name is Marie"."
- `items[3].shown` "elle ... habille (she gets dressed)" → "elle ... appelle Marie"
- `items[6].instruction` "Which reflexive pronoun goes with 'ils'?" → "Which reflexive pronoun goes with 'ils'? The sentence means "they meet up"."
- `items[6].shown` "ils ... amusent (they have fun)" → "ils ... retrouvent"

**2024-05-22-s-appeler**

- `concepts[0].term` "s'appeler = to be called / to call oneself" → "s'appeler = to be called"
- `concepts[0].definition` "THE way to say your name in French! Literally 'to call oneself'" → "The verb for saying a name. Literally, it means to call yourself."
- `concepts[0].examples` "(none)" → "["fr":"Je m'appelle Marie.","en":"My name is Marie.","fr":"Comment tu t'appelles ?","en":"What's your name?","fr":"Mon frère s'appelle Paul.","en":"My brother's name is Paul."]"
- `concepts[0].example` ""Je m'appelle Marie (I call myself Marie = My name is Marie), Comment tu t'appelles? (What do you call yourself? = What's your name?)"" → "(removed)"
- `concepts[1].term` "This should've been in Unit 1!" → "Introducing yourself"
- `concepts[1].definition` "You've been waiting to learn this - the most basic introduction!" → "With s'appeler you can say who you are and ask someone's name."
- `concepts[1].examples` "(none)" → "["fr":"Bonjour, je m'appelle Marie.","en":"Hello, my name is Marie.","fr":"Comment vous vous appelez ?","en":"What's your name?","note":"to someone you call vous","fr":"Elle s'appelle Sophie.","en":"Her name is Sophie."]"
- `concepts[1].example` ""Now you can finally properly introduce yourself in French!"" → "(removed)"
- `concepts[2].term` "Reflexive Pattern" → "me becomes m'"
- `concepts[2].definition` "Uses reflexive pronouns: je m'appelle, tu t'appelles, il s'appelle" → "Before a vowel, me and te drop their e."
- `concepts[2].examples` "(none)" → "["fr":"Je m'appelle Paul.","en":"My name is Paul.","fr":"Tu t'appelles Pierre ?","en":"Is your name Pierre?"]"
- `concepts[2].example` ""Notice the elision: je m'appelle (not je me appelle), tu t'appelles (not tu te appelles)"" → "(removed)"
- `concepts[3].term` "Regular -ER verb conjugation" → "The forms of s'appeler"
- `concepts[3].definition` "Once you know the reflexive pronouns, the verb part is easy - regular -ER pattern!" → "The endings are the -er endings. The forms for we and you write one l, the others two."
- `concepts[3].layout` "(none)" → ""forms""
- `concepts[3].examples` "(none)" → "["fr":"je m'appelle","en":"my name is","fr":"tu t'appelles","en":"your name is","fr":"il s'appelle","en":"his name is","fr":"nous nous appelons","en":"our names are","fr":"vous vous appelez","en":"your name is","fr":"ils s'appellent","en":"their names are"]"
- `concepts[3].example` ""appelle, appelles, appelle, appelons, appelez, appellent"" → "(removed)"

**2024-05-19-morning-routine**

- `concepts[0].definition` "First action of the day - reflexive because you wake yourself up" → "A reflexive verb: you wake yourself up."
- `concepts[0].examples` "(none)" → "["fr":"Je me réveille à sept heures.","en":"I wake up at seven.","fr":"Tu te réveilles tôt ?","en":"Do you wake up early?"]"
- `concepts[0].example` ""je me réveille à 7h (I wake up at 7am), tu te réveilles tôt (you wake up early)"" → "(removed)"
- `concepts[1].term` "se lever = to get up / to stand up" → "se lever = to get up"
- `concepts[1].definition` "After waking, you get yourself up - natural sequence!" → "Once you are awake, you get up. The e becomes è in je me lève."
- `concepts[1].examples` "(none)" → "["fr":"Elle se lève à huit heures.","en":"She gets up at eight.","fr":"Tu te lèves tard.","en":"You get up late.","fr":"Nous nous levons tôt.","en":"We get up early."]"
- `concepts[1].example` ""je me lève à 7h30 (I get up at 7:30), tu te lèves tard (you get up late)"" → "(removed)"
- `concepts[2].term` "Telling Your Morning Story" → "Your morning, in order"
- `concepts[2].definition` "Now you can describe your morning routine with temporal words!" → "Put an order word before each verb."
- `concepts[2].examples` "(none)" → "["fr":"D'abord, je me réveille. Ensuite, je me lève.","en":"First, I wake up. Then I get up."]"
- `concepts[2].example` ""D'abord, je me réveille. Ensuite, je me lève. (First, I wake up. Then, I get up.)"" → "(removed)"
- `concepts[3].term` "Asking About Morning Routines" → "Asking about someone's morning"
- `concepts[3].definition` "Common questions about daily schedules" → "Two questions about when someone starts the day."
- `concepts[3].examples` "(none)" → "["fr":"À quelle heure tu te réveilles ?","en":"What time do you wake up?","fr":"Tu te lèves tôt ?","en":"Do you get up early?"]"
- `concepts[3].example` ""À quelle heure tu te réveilles? (What time do you wake up?), Tu te lèves tôt? (Do you get up early?)"" → "(removed)"

**2024-05-17-getting-ready**

- `vocabulary[1].word_id` "je-me-lave-fr.i-wash-myself" → "je-me-lave-fr"
- `concepts[0].term` "se laver = to wash oneself" → "se laver = to wash"
- `concepts[0].definition` "Personal hygiene - wash yourself" → "A reflexive verb: you wash yourself."
- `concepts[0].examples` "(none)" → "["fr":"Je me lave le matin.","en":"I wash in the morning.","fr":"Tu te laves ?","en":"Are you washing?"]"
- `concepts[0].example` ""je me lave (I wash myself), tu te laves (you wash yourself)"" → "(removed)"
- `concepts[1].definition` "Put clothes on yourself - daily essential!" → "A reflexive verb for putting your clothes on."
- `concepts[1].examples` "(none)" → "["fr":"Je m'habille.","en":"I'm getting dressed.","fr":"Elle s'habille bien.","en":"She dresses well."]"
- `concepts[1].example` ""je m'habille (I get dressed), elle s'habille bien (she dresses well)"" → "(removed)"
- `concepts[2].term` "se préparer = to get ready / to prepare oneself" → "se préparer = to get ready"
- `concepts[2].definition` "General preparation - for school, work, going out" → "Getting ready for school, for work or to go out."
- `concepts[2].examples` "(none)" → "["fr":"Je me prépare pour le cours.","en":"I'm getting ready for class.","fr":"Je me prépare tôt le matin.","en":"I get ready early in the morning.","fr":"On se prépare.","en":"We're getting ready."]"
- `concepts[2].example` ""je me prépare pour le cours (I get ready for class), on se prépare (we get ready)"" → "(removed)"
- `concepts[3].term` "Complete Morning Sequence" → "A whole morning"
- `concepts[3].definition` "Now you can tell your entire morning story!" → "Order words and reflexive verbs together tell a whole morning."
- `concepts[3].examples` "(none)" → "["fr":"D'abord, je me réveille.","en":"First, I wake up.","fr":"Ensuite, je me lève.","en":"Then I get up.","fr":"Après, je me lave.","en":"After that, I wash.","fr":"Puis, je m'habille.","en":"Then I get dressed.","fr":"Finalement, je me prépare.","en":"Finally, I get ready."]"
- `concepts[3].example` ""D'abord, je me réveille. Ensuite, je me lève. Après, je me lave. Puis, je m'habille. Finalement, je me prépare."" → "(removed)"

**2024-05-16-daily-reflexives**

- `concepts[0].definition` "Recall memories - important mental action" → "Put de before what you remember."
- `concepts[0].examples` "(none)" → "["fr":"Je me souviens de ça.","en":"I remember that.","fr":"Tu te souviens ?","en":"Do you remember?"]"
- `concepts[0].example` ""je me souviens de ça (I remember that), tu te souviens? (do you remember?)"" → "(removed)"
- `concepts[1].term` "s'amuser = to have fun / to enjoy oneself" → "s'amuser = to have fun"
- `concepts[1].definition` "Enjoying yourself - social/emotional" → "A reflexive verb for enjoying yourself."
- `concepts[1].examples` "(none)" → "["fr":"Je m'amuse.","en":"I'm having fun.","fr":"On s'amuse bien.","en":"We're having a good time."]"
- `concepts[1].example` ""je m'amuse (I'm having fun), on s'amuse bien (we're having a good time)"" → "(removed)"
- `concepts[2].term` "se dépêcher = to hurry / to rush" → "se dépêcher = to hurry"
- `concepts[2].definition` "Moving quickly - time pressure!" → "A reflexive verb for moving fast when time is short."
- `concepts[2].examples` "(none)" → "["fr":"Je me dépêche.","en":"I'm hurrying.","fr":"Je me dépêche, je suis en retard.","en":"I'm hurrying, I'm late.","fr":"Tu te dépêches ?","en":"Are you hurrying?"]"
- `concepts[2].example` ""je me dépêche (I'm hurrying), dépêche-toi! (hurry up!)"" → "(removed)"

**2024-06-07-reflexive-past**

- `concepts[0].term` "Reflexive Verbs ALWAYS use être in Past" → "Reflexive verbs take être"
- `concepts[0].definition` "CRITICAL: ALL reflexive verbs use être (never avoir) in passé composé" → "In the past, every reflexive verb uses être, never avoir."
- `concepts[0].examples` "(none)" → "["fr":"Je me suis lavé.","en":"I washed.","fr":"Elle s'est levée.","en":"She got up.","fr":"On s'est amusé.","en":"We had fun."]"
- `concepts[0].example` ""je me suis lavé (I washed myself - uses être), elle s'est levée (she got up - uses être)"" → "(removed)"
- `concepts[1].term` "Agreement with Subject" → "The ending agrees"
- `concepts[1].definition` "Past participle agrees with the subject (like all être verbs)" → "As with other verbs that take être, the past participle agrees with the subject."
- `concepts[1].examples` "(none)" → "["fr":"Je me suis réveillé.","en":"I woke up.","note":"a man speaking","fr":"Je me suis réveillée.","en":"I woke up.","note":"a woman speaking","fr":"Ils se sont levés.","en":"They got up.","fr":"Elles se sont levées.","en":"They got up.","note":"all women"]"
- `concepts[1].example` ""je me suis réveillé (masc), je me suis réveillée (fem), ils se sont levés (masc pl), elles se sont levées (fem pl)"" → "(removed)"
- `concepts[2].term` "Pronoun Position" → "The pronoun before être"
- `concepts[2].definition` "Reflexive pronoun stays BEFORE the auxiliary être" → "The reflexive pronoun comes before the form of être."
- `concepts[2].examples` "(none)" → "["fr":"Je me suis levé.","en":"I got up.","fr":"Tu t'es lavé ?","en":"Did you wash?","fr":"Ils se sont habillés.","en":"They got dressed."]"
- `concepts[2].example` ""je me suis levé (not je suis me levé), tu t'es lavé (not tu es te lavé)"" → "(removed)"
- `concepts[3].term` "Telling Past Routines" → "What you did this morning"
- `concepts[3].definition` "Now you can describe what you did this morning!" → "The same order words work in the past."
- `concepts[3].examples` "(none)" → "["fr":"Ce matin, je me suis réveillé à sept heures.","en":"This morning I woke up at seven.","fr":"Ensuite, je me suis levé.","en":"Then I got up.","fr":"Après, je me suis lavé.","en":"After that, I washed.","fr":"J'étais en retard, donc je me suis dépêché.","en":"I was late, so I hurried."]"
- `concepts[3].example` ""Ce matin, je me suis réveillé à 7h. Ensuite, je me suis levé. Après, je me suis lavé."" → "(removed)"

**2024-06-06-reciprocal-reflexives**

- `concepts[0].term` "Reciprocal = Each Other" → "Each other"
- `concepts[0].definition` "Plural reflexive pronouns can mean 'each other' - mutual action!" → "With a plural subject, the reflexive pronoun can mean each other."
- `concepts[0].examples` "(none)" → "["fr":"Nous nous aimons.","en":"We love each other.","fr":"Ils se regardent.","en":"They look at each other."]"
- `concepts[0].example` ""nous nous aimons (we love each other), ils se regardent (they look at each other)"" → "(removed)"
- `concepts[1].term` "Only with Plural Subjects" → "Plural subjects only"
- `concepts[1].definition` "You need nous, vous, ils, elles, or on to have 'each other'" → "Each other needs at least two people, so the subject is plural, or on meaning we."
- `concepts[1].examples` "(none)" → "["fr":"Nous nous parlons.","en":"We talk to each other.","fr":"Ils se connaissent.","en":"They know each other.","fr":"Vous vous comprenez.","en":"You understand each other."]"
- `concepts[1].example` ""nous nous parlons (we talk to each other), ils se connaissent (they know each other)"" → "(removed)"
- `concepts[2].term` "Same Form, Different Meaning" → "Ourselves or each other"
- `concepts[2].definition` "The reflexive form is the same - context tells you if it's 'ourselves' or 'each other'" → "The form is the same for both meanings. The situation tells you which one is meant."
- `concepts[2].examples` "(none)" → "["fr":"Nous nous préparons.","en":"We're getting ready.","note":"or: we're getting each other ready","fr":"Ils se voient.","en":"They see each other.","note":"or: they see themselves"]"
- `concepts[2].example` ""nous nous préparons (we prepare ourselves OR we prepare each other - context!)"" → "(removed)"
- `concepts[3].term` "Common Reciprocal Expressions" → "Seeing and talking to each other"
- `concepts[3].definition` "Very common in relationships and social contexts" → "You hear these between friends all the time."
- `concepts[3].examples` "(none)" → "["fr":"On se voit demain.","en":"See you tomorrow.","fr":"Ils se parlent.","en":"They talk to each other."]"
- `concepts[3].example` ""on se voit demain (we'll see each other tomorrow), ils se parlent (they talk to each other)"" → "(removed)"

**2024-05-13-commands-tu**

- `concepts[0].term` "Imperative Mood = Commands" → "Telling someone to do something"
- `concepts[0].definition` "Tell someone to do something - no subject pronoun needed!" → "A command has no subject pronoun. The verb starts the sentence."
- `concepts[0].examples` "(none)" → "["fr":"Mange !","en":"Eat!","fr":"Parle !","en":"Speak!","fr":"Pars tôt !","en":"Leave early!"]"
- `concepts[0].example` ""Mange! (Eat!), Parle! (Speak!), Va! (Go!)"" → "(removed)"
- `concepts[1].term` "tu form: Just Drop the Pronoun!" → "The tu form without tu"
- `concepts[1].definition` "For most verbs, use the tu form without 'tu'" → "For most verbs, a command to a friend is the tu form with no pronoun."
- `concepts[1].examples` "(none)" → "["fr":"Viens !","en":"Come!","note":"from tu viens","fr":"Prends !","en":"Take it!","note":"from tu prends","fr":"Pars !","en":"Leave!","note":"from tu pars"]"
- `concepts[1].example` ""tu manges → Mange! (you eat → Eat!), tu parles → Parle! (you speak → Speak!)"" → "(removed)"
- `concepts[2].term` "-ER verbs: Drop the final -s" → "-er verbs drop the s"
- `concepts[2].definition` "For -ER verbs only, also drop the final -s in tu command form" → "For -er verbs, the command also drops the final s of the tu form."
- `concepts[2].examples` "(none)" → "["fr":"Mange !","en":"Eat!","note":"from tu manges","fr":"Parle !","en":"Speak!","note":"from tu parles","fr":"Pense !","en":"Think!","note":"from tu penses"]"
- `concepts[2].example` ""tu manges → Mange! (not Manges!), tu parles → Parle! (not Parles!)"" → "(removed)"
- `concepts[3].term` "Use with Friends and Family" → "For friends and family"
- `concepts[3].definition` "tu commands are informal - use with people you'd call 'tu'" → "Use these commands with people you call tu."
- `concepts[3].examples` "(none)" → "["fr":"Écoute !","en":"Listen!","fr":"Regarde !","en":"Look!","fr":"Viens, on est en retard !","en":"Come on, we're late!"]"
- `concepts[3].example` ""To a friend: Mange! (Eat!), Écoute! (Listen!), Viens! (Come!)"" → "(removed)"

**2024-05-14-commands-vous**

- `concepts[0].term` "vous Commands = Formal or Groups" → "Commands with vous"
- `concepts[0].definition` "Use vous form for strangers, bosses, or multiple people" → "Use the vous form with a stranger, a boss or a group of people."
- `concepts[0].examples` "(none)" → "["fr":"Écoutez !","en":"Listen!","note":"to a class","fr":"Venez ! On se voit demain !","en":"Come! See you tomorrow!","note":"to a group"]"
- `concepts[0].example` ""To strangers: Mangez! To a group: Venez! (Come!)"" → "(removed)"
- `concepts[1].term` "Easy Formation: Drop the Pronoun!" → "The vous form without vous"
- `concepts[1].definition` "Just use vous form without saying 'vous'" → "Take the vous form and leave out the pronoun."
- `concepts[1].examples` "(none)" → "["fr":"Mangez !","en":"Eat!","note":"from vous mangez","fr":"Parlez !","en":"Speak!","note":"from vous parlez"]"
- `concepts[1].example` ""vous mangez → Mangez!, vous parlez → Parlez!"" → "(removed)"
- `concepts[2].term` "Keep the -ez Ending" → "The -ez stays"
- `concepts[2].definition` "Unlike tu commands, vous commands keep all letters!" → "Unlike the tu command, the vous command keeps its ending."
- `concepts[2].examples` "(none)" → "["fr":"Venez !","en":"Come!","fr":"Prenez !","en":"Take it!","fr":"Regardez !","en":"Look!"]"
- `concepts[2].example` ""Mangez! (not Mange!), Parlez! (not Parle!)"" → "(removed)"

**2024-05-18-irregular-commands**

- `vocabulary[0].note` "⭐ être command - tu form" → "⭐ être command, tu form"
- `vocabulary[1].note` "être command - vous form" → "être command, vous form"
- `vocabulary[3].note` "avoir command - tu form" → "avoir command, tu form"
- `vocabulary[4].note` "avoir command - vous form" → "avoir command, vous form"
- `vocabulary[6].note` "⭐ aller command - tu form" → "⭐ aller command, tu form"
- `vocabulary[7].note` "aller command - vous form" → "aller command, vous form"
- `vocabulary[10].note` "faire command - tu form" → "faire command, tu form"
- `vocabulary[11].note` "faire command - vous form" → "faire command, vous form"
- `concepts` "["id":"c-most-common-verbs-irregular","term":"Most Common Verbs = Irregular Commands","definition":"être, avoir, aller, and faire don't follow normal command patterns","example":"Sois gentil! (Be nice!), Aie courage! (Have courage!), Va là-bas! (Go over there!)","id":"c-must-memorize-these","term":"Must Memorize These","definition":"These irregular forms are used constantly - worth memorizing!","example":"Vas-y! (Go ahead! / Go for it!) - extremely common phrase","id":"c-etre-commands","term":"être Commands","definition":"tu: Sois! vous: Soyez! nous: Soyons!","example":"Sois sage! (Be good!), Soyez gentil! (Be kind!)","id":"c-avoir-commands","term":"avoir Commands","definition":"tu: Aie! vous: Ayez! nous: Ayons!","example":"Aie confiance! (Have confidence!), Ayez patience! (Have patience!)","id":"c-aller-commands","term":"aller Commands","definition":"tu: Va! vous: Allez! nous: Allons! Special: Vas-y!","example":"Va là-bas! (Go over there!), Allons-y! (Let's go!), Vas-y! (Go ahead!)","id":"c-faire-commands","term":"faire Commands","definition":"tu: Fais! vous: Faites! nous: Faisons!","example":"Fais attention! (Pay attention! / Be careful!), Faites ça! (Do that!)"]" → "["id":"c-most-common-verbs-irregular","term":"Irregular commands","definition":"The most common verbs have command forms of their own.","examples":["fr":"Sois gentil !","en":"Be nice!","fr":"Aie courage !","en":"Have courage!","fr":"Va là-bas !","en":"Go over there!","fr":"Fais attention !","en":"Be careful!"],"id":"c-must-memorize-these","term":"Vas-y !","definition":"A very common phrase for go ahead or go for it. The y means there.","examples":["fr":"Vas-y !","en":"Go ahead!","fr":"Allons-y !","en":"Let's go!"],"id":"c-etre-commands","term":"Commands of être","definition":"The command forms of être are irregular.","examples":["fr":"Sois gentil !","en":"Be nice!","note":"to a friend","fr":"Soyez gentil !","en":"Be kind!","note":"to someone you call vous","fr":"Soyons gentils !","en":"Let's be nice!","fr":"Sois là à six heures !","en":"Be there at six!"],"id":"c-avoir-commands","term":"Commands of avoir","definition":"The command forms of avoir are irregular too.","examples":["fr":"Aie confiance !","en":"Have confidence!","note":"to a friend","fr":"N'ayez pas peur !","en":"Don't be afraid!","note":"to someone you call vous","fr":"Ayons confiance !","en":"Let's be confident!"],"id":"c-aller-commands","term":"Commands of aller","definition":"To a friend, the command is va, with no s. Before y, the s comes back: vas-y.","examples":["fr":"Va là-bas !","en":"Go over there!","fr":"Allons-y !","en":"Let's go!","fr":"Vas-y !","en":"Go ahead!"],"id":"c-faire-commands","term":"Commands of faire","definition":"Say fais to a friend and faites to someone you call vous.","examples":["fr":"Fais attention !","en":"Be careful!","fr":"Faites ça !","en":"Do that!"],"id":"c-y-there","term":"y: there","definition":"y stands for a place you already named, like au café. It goes before the verb, but after the verb in a positive command.","examples":["fr":"Tu vas au café ? Oui, j'y vais.","en":"Are you going to the café? Yes, I'm going there.","fr":"Non, je n'y vais pas.","en":"No, I'm not going there.","fr":"Nous y allons.","en":"We're going there."]]"

**2024-05-12-commands-pronouns**

- `can_do` "["Give commands with object pronouns (Give it to me!)","Use pronouns with affirmative and negative commands","Form complex commands like 'Don't do it!' or 'Look at me!'"]" → "["Give commands with object pronouns (Give it to me!)","Use pronouns with affirmative and negative commands","Form complex commands like 'Don't do it!' or 'Look at me!'","Say some or how many with en: j'en veux, j'en ai trois."]"
- `concepts` "["id":"c-affirmative-commands-attach-with","term":"Affirmative Commands: Attach with Hyphens","definition":"In positive commands, pronouns attach to the verb with hyphens","example":"Donne-le! (Give it!), Regarde-moi! (Look at me!), Écoute-le! (Listen to him!)","id":"c-negative-commands-separate-with","term":"Negative Commands: Separate with ne...pas","definition":"In negative commands, pronouns go BEFORE the verb (normal position)","example":"Ne le fais pas! (Don't do it!), Ne me regarde pas! (Don't look at me!)","id":"c-pronoun-order-in-commands","term":"Pronoun Order in Commands","definition":"Object pronouns: le/la/les come first, then moi/toi","example":"Donne-le-moi! (Give it to me! - le before moi), Montre-la-moi! (Show it to me!)"]" → "["id":"c-affirmative-commands-attach-with","term":"Pronouns after the verb","definition":"In a positive command, the pronoun comes after the verb, joined with a hyphen.","examples":["fr":"Donne-le !","en":"Give it!","fr":"Regarde-moi !","en":"Look at me!","fr":"Écoute-le !","en":"Listen to him!","fr":"Amuse-toi bien !","en":"Have fun!","fr":"Dépêche-toi, habille-toi !","en":"Hurry up, get dressed!","fr":"Regarde-moi et fais attention !","en":"Look at me and pay attention!"],"id":"c-negative-commands-separate-with","term":"Pronouns in a negative command","definition":"With ne … pas, the pronoun goes back before the verb.","examples":["fr":"Ne le fais pas !","en":"Don't do it!","fr":"Ne me regarde pas !","en":"Don't look at me!"],"id":"c-pronoun-order-in-commands","term":"Two pronouns","definition":"With two pronouns, the one for the thing comes first, then moi.","examples":["fr":"Donne-le-moi !","en":"Give it to me!","fr":"Montre-la-moi !","en":"Show it to me!"],"id":"c-en-some","term":"en: some, of them","definition":"en stands for some of a thing you already named. It goes before the verb, but after it in a positive command.","examples":["fr":"Tu veux du café ? Oui, j'en veux.","en":"Do you want some coffee? Yes, I'd like some.","fr":"Oui, j'en ai trois.","en":"Yes, I have three of them.","fr":"Prends-en !","en":"Take some!"]]"

**2024-05-20-reading-8**

- `title` "Reading 8 - Ma Journée" → "Reading - Ma Journée"
- `description` "A story about a typical day. Uses temporal words, reflexive verbs, and all Unit 8 vocabulary!" → "A story about a typical day. Uses temporal words, reflexive verbs, and all this unit's vocabulary!"
- `vocabulary[32].note` "profession" → "a job"
- `glossary` "(none)" → "["fr":"comprenais","en":"understood (was understanding)"]"
- `glosses` "(none)" → "["fr":"comprenais","en":"understood","note":"imparfait of comprendre"]"
- `items[9]` "(none)" → ""id":"i-pense-a-demain","type":"comprehension","question":"What pattern shows Marie's daily commitment to learning?","cue":"She goes from morning preparation to...","answer":"elle rentre contente et pense à demain","accept":["je rentre contente et pense à demain","contente et pense à demain","elle pense à demain"],"hint":"What cycle does her day show from morning to evening?""

**2024-05-25-unit-8-practice**

- `title` "Unit 8 Practice - Fill in the Blanks" → "Daily Life & Actions Practice - Fill in the Blanks"
- `description` "Complete sentences using temporal words, reflexive verbs, and commands from Unit 8!" → "Complete sentences using temporal words, reflexive verbs, and commands from this unit!"
- `items[0].text` "___, je mange., ___ je pars." → "___, je mange. ___, je pars."
- `items[20].text` "___ le café, je ___ et ___ je." → "___ le café, je ___ et je ___."
- `items[20].blanks[1].answer` "m'habille" → "me lave"
- `items[20].blanks[2].answer` "me lave" → "m'habille"
- `items[20].hint` "temporal: after / s'habiller for je / se laver for je" → "temporal: after / se laver for je / s'habiller for je"

**2024-05-24-unit-8-exam**

- `description` "Test everything from Unit 8! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions." → "Test everything from this unit! Temporal words, reflexive verbs (introductions, routines), commands, and reciprocal actions."

**2024-05-26-causal-words**

- `concepts[0].term` "parce que - because (most common)" → "parce que = because"
- `concepts[0].definition` "Answers 'pourquoi?' - used in all situations" → "The everyday word for because. It answers a question with pourquoi."
- `concepts[0].examples` "(none)" → "["fr":"Pourquoi tu ne viens pas ? Parce que je suis fatigué.","en":"Why aren't you coming? Because I'm tired.","fr":"Je ne viens pas parce que je suis malade.","en":"I'm not coming because I'm sick.","fr":"Je mange parce que j'ai faim.","en":"I'm eating because I'm hungry."]"
- `concepts[0].example` ""Je mange parce que j'ai faim (I eat because I'm hungry), Je ne viens pas parce que je suis malade (I'm not coming because I'm sick)"" → "(removed)"
- `concepts[1].term` "car - for, because (formal/literary)" → "car = because, in writing"
- `concepts[1].definition` "More formal than 'parce que', CANNOT start a sentence, common in writing" → "car also means because, but it sounds more formal and is common in writing. It never starts a sentence."
- `concepts[1].examples` "(none)" → "["fr":"On étudie le français car c'est beau.","en":"We study French because it's beautiful.","fr":"Je prends un café car je suis fatigué.","en":"I'm having a coffee because I'm tired."]"
- `concepts[1].example` ""On étudie le français car c'est utile (We study French for it's useful), Je reste ici car il pleut (I'm staying here for it's raining)"" → "(removed)"
- `concepts[2].term` "puisque - since, seeing as" → "puisque = since, seeing as"
- `concepts[2].definition` "Indicates logical conclusion or something already known, slightly formal" → "Use puisque when the reason is something you both already know."
- `concepts[2].examples` "(none)" → "["fr":"Puisque tu es là, on commence.","en":"Since you're here, let's start.","fr":"Puisque c'est vrai, je te crois.","en":"Since it's true, I believe you."]"
- `concepts[2].example` ""Puisque tu es là, on commence (Since you're here, we'll start), Puisque c'est vrai, je te crois (Since it's true, I believe you)"" → "(removed)"
- `concepts[3].term` "comme - as, since (at START of sentence)" → "comme = as, since"
- `concepts[3].definition` "Explains reason, MUST come at beginning of sentence" → "comme gives the reason at the start of a sentence."
- `concepts[3].examples` "(none)" → "["fr":"Comme il fait beau, on va au parc.","en":"As it's nice out, we're going to the park.","fr":"Comme je suis fatigué, je vais dormir.","en":"As I'm tired, I'm going to sleep.","fr":"Comme c'est ton anniversaire, on va au restaurant.","en":"As it's your birthday, we're going to a restaurant."]"
- `concepts[3].example` ""Comme il fait beau, on va au parc (As it's nice, we're going to the park), Comme je suis fatigué, je reste à la maison (As I'm tired, I'm staying home)"" → "(removed)"
- `concepts[4].term` "grâce à - thanks to (positive reason + NOUN)" → "grâce à = thanks to"
- `concepts[4].definition` "Positive attribution, followed by a noun or pronoun" → "Use grâce à before a noun or a pronoun, for a reason that helped."
- `concepts[4].examples` "(none)" → "["fr":"Grâce à toi, je comprends mieux.","en":"Thanks to you, I understand better.","fr":"Je comprends grâce au professeur.","en":"I understand thanks to the teacher."]"
- `concepts[4].example` ""Grâce à toi, je comprends mieux (Thanks to you, I understand better), Grâce au professeur, j'ai réussi (Thanks to the teacher, I succeeded)"" → "(removed)"
- `concepts[5].term` "à cause de - because of (negative/neutral + NOUN)" → "à cause de = because of"
- `concepts[5].definition` "Often negative or neutral, followed by a noun (NOT a clause!)" → "Use à cause de before a noun, usually for a reason that caused a problem."
- `concepts[5].examples` "(none)" → "["fr":"À cause de la musique, je ne peux pas travailler.","en":"Because of the music, I can't work.","fr":"Je suis en retard à cause du bus.","en":"I'm late because of the bus.","fr":"Je suis fatigué à cause du travail.","en":"I'm tired because of work."]"
- `concepts[5].example` ""À cause de la pluie, on reste ici (Because of the rain, we're staying here), À cause du traffic, je suis en retard (Because of traffic, I'm late)"" → "(removed)"
- `items[1].text` "On étudie le français ___ c'est utile" → "On étudie le français ___ c'est beau"
- `items[1].gloss` "We study French for it's useful" → "We study French for it's beautiful"
- `items[5].text` "___ la pluie, on reste ici" → "___ la musique, je ne peux pas travailler"
- `items[5].gloss` "Because of the rain, we're staying here" → "Because of the music, I can't work"
- `items[6].text` "Pourquoi tu restes? - ___ je suis fatigué" → "Pourquoi tu ne viens pas ? - ___ je suis fatigué"
- `items[6].gloss` "Why are you staying? - Because I'm tired" → "Why aren't you coming? - Because I'm tired"
- `items[7].text` "Je suis en retard ___ le traffic" → "Je suis en retard ___ bus"
- `items[7].gloss` "I'm late because of traffic" → "I'm late because of the bus"
- `items[7].mistakes[0].feedback` "Parce que needs a CLAUSE: 'parce qu'il y a du traffic'. Use 'à cause de' + noun!" → "Parce que needs a CLAUSE: 'parce que le bus est en retard'. Use 'à cause de' + noun!"
- `items[8].text` "J'ai réussi ___ professeur" → "Je comprends ___ professeur"
- `items[8].gloss` "I succeeded thanks to the teacher" → "I understand thanks to the teacher"
- `items[10].text` "___ du mauvais temps, on annule le match" → "___ du travail, je ne peux pas venir"
- `items[10].gloss` "Because of bad weather, we're canceling the match" → "Because of work, I can't come"
- `items[10].mistakes[0].feedback` "Bad weather isn't positive! Use 'à cause de' for negative reasons." → "Work isn't a positive reason here. Use 'à cause de'."
- `items[10].mistakes[1].feedback` "Parce que needs a CLAUSE: 'parce qu'il fait mauvais'. Use 'à cause de' + noun!" → "Parce que needs a CLAUSE: 'parce que j'ai du travail'. Use 'à cause de' + noun!"
- `items[11].text` "On va partir ___ tu es prêt" → "On va partir ___ tu es là"
- `items[11].gloss` "We'll leave since you're ready" → "We'll leave since you're here"
- `items[16].text` "Je ne dors pas bien ___ bruit" → "Je suis fatigué ___ travail"
- `items[16].gloss` "I don't sleep well because of the noise" → "I'm tired because of work"

**2024-06-08-spatial-prepositions**

- `concepts[0].term` "devant - in front of" → "devant = in front of"
- `concepts[0].definition` "Indicates position in front of something" → "Says what is in front of something or someone."
- `concepts[0].examples` "(none)" → "["fr":"Je suis devant la porte.","en":"I'm in front of the door.","fr":"La voiture est devant la maison.","en":"The car is in front of the house.","fr":"Il y a un arbre devant ma fenêtre.","en":"There's a tree in front of my window."]"
- `concepts[0].example` ""Je suis devant la porte (I'm in front of the door), La voiture est devant la maison (The car is in front of the house)"" → "(removed)"
- `concepts[1].term` "derrière - behind" → "derrière = behind"
- `concepts[1].definition` "Indicates position behind something" → "Says what is behind something or someone."
- `concepts[1].examples` "(none)" → "["fr":"Le chat est derrière le sofa.","en":"The cat is behind the sofa.","fr":"Il y a un jardin derrière la maison.","en":"There's a garden behind the house.","fr":"Il est derrière moi.","en":"He's behind me."]"
- `concepts[1].example` ""Le chat est derrière le sofa (The cat is behind the sofa), Il est derrière moi (He's behind me)"" → "(removed)"
- `concepts[2].term` "entre - between" → "entre = between"
- `concepts[2].definition` "Indicates position between two things" → "Says what is between two things or two people."
- `concepts[2].examples` "(none)" → "["fr":"Le café est entre l'école et le parc.","en":"The café is between the school and the park.","fr":"Entre toi et moi, c'est un secret.","en":"Between you and me, it's a secret."]"
- `concepts[2].example` ""Le café est entre l'école et le parc (The café is between the school and the park), Entre toi et moi (Between you and me)"" → "(removed)"
- `concepts[3].term` "parmi - among" → "parmi = among"
- `concepts[3].definition` "Indicates being among multiple things or people" → "Says that someone or something is one of a group."
- `concepts[3].examples` "(none)" → "["fr":"Ton livre est parmi mes livres.","en":"Your book is among my books.","fr":"Parmi les étudiants, il y a des Français.","en":"Among the students, there are some French people.","fr":"Il est parmi nous.","en":"He's among us."]"
- `concepts[3].example` ""Parmi les étudiants (Among the students), Il est parmi nous (He's among us)"" → "(removed)"
- `concepts[4].term` "au-dessus (de) - above, over" → "au-dessus de = above, over"
- `concepts[4].definition` "Indicates position above something" → "Says what is higher than something. Before le, de becomes du."
- `concepts[4].examples` "(none)" → "["fr":"Le tableau est au-dessus de la table.","en":"The painting is above the table.","fr":"J'habite au-dessus du café.","en":"I live above the café."]"
- `concepts[4].example` ""Le tableau est au-dessus de la table (The painting is above the table), Au-dessus de la ville (Above the city)"" → "(removed)"
- `concepts[5].term` "au-dessous (de) - below, beneath, under" → "au-dessous de = below, under"
- `concepts[5].definition` "Indicates position below something" → "Says what is lower than something. On its own, au-dessous means downstairs."
- `concepts[5].examples` "(none)" → "["fr":"Il habite au-dessous de nous.","en":"He lives below us.","fr":"Le parking est au-dessous.","en":"The parking is downstairs.","fr":"La cuisine est au-dessous.","en":"The kitchen is downstairs."]"
- `concepts[5].example` ""Au-dessous du niveau (Below the level), Le parking est au-dessous (The parking is below)"" → "(removed)"
- `concepts[6].term` "Review: dans, sur, sous" → "In, on and under"
- `concepts[6].definition` "Reinforce: dans (in/inside), sur (on/on top of), sous (under/beneath)" → "Short words you already use to say where a thing is: inside something, on top of it or under it."
- `concepts[6].examples` "(none)" → "["fr":"Le livre est dans le sac.","en":"The book is in the bag.","fr":"Mon téléphone est sur la table.","en":"My phone is on the table.","fr":"Le chien est sous la table.","en":"The dog is under the table."]"
- `concepts[6].example` ""Le livre est dans le sac (in the bag), sur la table (on the table), sous la chaise (under the chair)"" → "(removed)"
- `items[7].text` "Mes clés sont ___ la table" → "Mon téléphone est ___ la table"
- `items[7].gloss` "My keys are on the table" → "My phone is on the table"
- `items[11].text` "La lampe est ___ le lit" → "J'habite ___ café"
- `items[11].gloss` "The lamp is above the bed" → "I live above the café"
- `items[11].mistakes[0].feedback` "Sur means 'on' (touching). Use 'au-dessus de' for 'above' (hanging)!" → "Use 'au-dessus de' for 'above'."
- `items[14].text` "Ma chambre est ___" → "La cuisine est ___"
- `items[14].gloss` "My bedroom is downstairs/below" → "The kitchen is downstairs/below"
- `items[15].text` "Le chat dort ___ mon lit" → "Le chat est ___ la voiture"
- `items[15].gloss` "The cat sleeps under my bed" → "The cat is under the car"

**2024-05-28-more-spatial-relations**

- `concepts[0].term` "près de - near, close to" → "près de = near"
- `concepts[0].definition` "Indicates proximity, nearness" → "Says that something is close. Before a vowel, de becomes d'."
- `concepts[0].examples` "(none)" → "["fr":"Le café est près de l'école.","en":"The café is near the school.","fr":"J'habite près d'ici.","en":"I live near here."]"
- `concepts[0].example` ""Le café est près de l'école (The café is near the school), J'habite près d'ici (I live near here)"" → "(removed)"
- `concepts[1].term` "loin de - far from" → "loin de = far from"
- `concepts[1].definition` "Indicates distance, remoteness" → "Says that something is a long way away."
- `concepts[1].examples` "(none)" → "["fr":"La gare est loin de la maison.","en":"The station is far from the house.","fr":"C'est loin d'ici ?","en":"Is it far from here?","fr":"Le parc est loin de la ville.","en":"The park is far from the city."]"
- `concepts[1].example` ""La gare est loin de la maison (The station is far from the house), C'est loin d'ici? (Is it far from here?)"" → "(removed)"
- `concepts[2].term` "à côté de - next to, beside" → "à côté de = next to"
- `concepts[2].definition` "Indicates immediate proximity, side-by-side position" → "Says that something is right beside something else."
- `concepts[2].examples` "(none)" → "["fr":"Je suis à côté de toi.","en":"I'm next to you.","fr":"Le restaurant est à côté du cinéma.","en":"The restaurant is next to the cinema."]"
- `concepts[2].example` ""Je suis à côté de toi (I'm next to you), Le restaurant est à côté du cinéma (The restaurant is next to the cinema)"" → "(removed)"
- `concepts[3].term` "en face de - across from, opposite" → "en face de = across from"
- `concepts[3].definition` "Indicates facing position, directly opposite" → "Says that something faces something else."
- `concepts[3].examples` "(none)" → "["fr":"Ma maison est en face du parc.","en":"My house is across from the park.","fr":"Il est assis en face de moi.","en":"He's sitting across from me."]"
- `concepts[3].example` ""Ma maison est en face du parc (My house is across from the park), Il est assis en face de moi (He's sitting across from me)"" → "(removed)"
- `concepts[4].term` "autour de - around" → "autour de = around"
- `concepts[4].definition` "Indicates surrounding position" → "Says that something is all around something else."
- `concepts[4].examples` "(none)" → "["fr":"Les gens sont autour de la table.","en":"People are around the table.","fr":"Il y a un jardin autour de la maison.","en":"There's a garden around the house."]"
- `concepts[4].example` ""Les gens sont autour de la table (People are around the table), Autour de la ville (Around the city)"" → "(removed)"
- `concepts[5].term` "le long de - along" → "le long de = along"
- `concepts[5].definition` "Indicates position along a length" → "Says that something follows the length of a street, a road or a river."
- `concepts[5].examples` "(none)" → "["fr":"On marche le long de la rivière.","en":"We walk along the river.","fr":"Il y a des arbres le long de la route.","en":"There are trees along the road."]"
- `concepts[5].example` ""Le long de la rue (Along the street), On marche le long de la rivière (We walk along the river)"" → "(removed)"
- `concepts[6].term` "au milieu de - in the middle of" → "au milieu de = in the middle of"
- `concepts[6].definition` "Indicates center position" → "Says that something is in the center of a place."
- `concepts[6].examples` "(none)" → "["fr":"Il y a une fontaine au milieu de la place.","en":"There's a fountain in the middle of the square.","fr":"La table est au milieu de la cuisine.","en":"The table is in the middle of the kitchen."]"
- `concepts[6].example` ""Au milieu de la pièce (In the middle of the room), Il est au milieu (He's in the middle)"" → "(removed)"
- `concepts[7].term` "au bout de - at the end of" → "au bout de = at the end of"
- `concepts[7].definition` "Indicates end position" → "Says that something is at the far end of a place."
- `concepts[7].examples` "(none)" → "["fr":"Le restaurant est au bout de la rue.","en":"The restaurant is at the end of the street.","fr":"La porte est au bout du jardin.","en":"The door is at the end of the garden."]"
- `concepts[7].example` ""Au bout de la rue (At the end of the street), C'est au bout (It's at the end)"" → "(removed)"
- `items[6].text` "La table est ___ pièce" → "La table est ___ cuisine"
- `items[6].gloss` "The table is in the middle of the room" → "The table is in the middle of the kitchen"
- `items[15].text` "La porte est ___ couloir" → "La porte est ___ jardin"
- `items[15].gloss` "The door is at the end of the hallway" → "The door is at the end of the garden"
- `items[17].text` "Assieds-toi ___ moi" → "Mets-toi ___ moi"
- `items[17].gloss` "Sit next to me/Sit beside me" → "Sit next to me"

**2024-05-30-passe-compose-er**

- `vocabulary[8].example_fr` "J'ai regardé la télé" → "J'ai regardé la ville"
- `concepts[0].term` "Passé Composé = avoir + past participle" → "The passé composé with avoir"
- `concepts[0].definition` "Compound past tense for completed actions: auxiliary verb 'avoir' + past participle" → "The passé composé tells what happened. It is the present of avoir followed by a past participle."
- `concepts[0].examples` "(none)" → "["fr":"J'ai parlé avec Marie.","en":"I spoke with Marie.","fr":"Tu as mangé au restaurant.","en":"You ate at the restaurant.","fr":"Elle a étudié le français.","en":"She studied French."]"
- `concepts[0].example` ""j'ai parlé (I spoke), tu as mangé (you ate), il a étudié (he studied)"" → "(removed)"
- `concepts[1].term` "Regular -ER verbs → -é past participle" → "-er verbs: the participle ends in -é"
- `concepts[1].definition` "Remove -er, add -é: parler → parlé, manger → mangé, étudier → étudié" → "Take off the -er and add -é. It sounds the same as the infinitive."
- `concepts[1].examples` "(none)" → "["fr":"J'ai parlé français.","en":"I spoke French.","note":"from parler","fr":"J'ai mangé au restaurant.","en":"I ate at the restaurant.","note":"from manger","fr":"J'ai cherché mon livre.","en":"I looked for my book.","note":"from chercher"]"
- `concepts[1].example` ""parler → parlé (spoken), manger → mangé (eaten), aimer → aimé (loved)"" → "(removed)"
- `concepts[2].term` "Formation: j'ai + past participle" → "Every person"
- `concepts[2].definition` "Use present tense of avoir + past participle ending in -é" → "Only avoir changes with the person. The participle stays the same."
- `concepts[2].layout` "(none)" → ""forms""
- `concepts[2].examples` "(none)" → "["fr":"j'ai parlé","en":"I spoke","fr":"tu as parlé","en":"you spoke","fr":"il a parlé","en":"he spoke","fr":"nous avons parlé","en":"we spoke","fr":"vous avez parlé","en":"you spoke","fr":"ils ont parlé","en":"they spoke"]"
- `concepts[2].example` ""j'ai parlé, tu as parlé, il/elle a parlé, nous avons parlé, vous avez parlé, ils/elles ont parlé"" → "(removed)"
- `concepts[3].term` "Negation: ne...pas around avoir" → "ne … pas around avoir"
- `concepts[3].definition` "Place ne and pas around the auxiliary verb avoir" → "ne and pas go around the form of avoir, and the participle comes after them."
- `concepts[3].examples` "(none)" → "["fr":"Je n'ai pas aimé le film.","en":"I didn't like the movie.","fr":"Tu n'as pas travaillé hier.","en":"You didn't work yesterday.","fr":"Nous n'avons pas mangé.","en":"We didn't eat."]"
- `concepts[3].example` ""je n'ai pas parlé (I didn't speak), tu n'as pas mangé (you didn't eat)"" → "(removed)"
- `concepts[4].term` "Questions: inversion or Est-ce que" → "Asking about the past"
- `concepts[4].definition` "Invert avoir with subject, or use est-ce que" → "Ask with est-ce que, or put the form of avoir before the subject."
- `concepts[4].examples` "(none)" → "["fr":"Est-ce que tu as mangé ?","en":"Did you eat?","fr":"As-tu trouvé le livre ?","en":"Did you find the book?","fr":"Vous avez cherché mon livre ?","en":"Did you look for my book?","note":"the voice goes up at the end"]"
- `concepts[4].example` ""As-tu parlé? (Did you speak?), Est-ce que tu as mangé? (Did you eat?)"" → "(removed)"
- `concepts[5].term` "When to use Passé Composé" → "When to use it"
- `concepts[5].definition` "For specific completed actions in the past, countable events" → "Use the passé composé for something that happened and is over, often at a time you name."
- `concepts[5].examples` "(none)" → "["fr":"Hier, j'ai parlé français.","en":"Yesterday I spoke French.","fr":"On a regardé un film hier soir.","en":"We watched a film last night.","fr":"J'ai déjà mangé.","en":"I've already eaten."]"
- `concepts[5].example` ""Hier, j'ai parlé avec Marie (Yesterday, I spoke with Marie), J'ai mangé à 8h (I ate at 8)"" → "(removed)"
- `items[4].text` "Vous ___ mes clés?" → "Vous ___ mon livre ?"
- `items[4].gloss` "Did you look for my keys?" → "Did you look for my book?"
- `items[9].text` "On ___ la télé hier soir" → "On ___ un film hier soir"
- `items[9].gloss` "We watched TV last night" → "We watched a film last night"

**2024-06-01-passe-compose-irregular-1**

- `concepts[0].term` "avoir → eu (had)" → "avoir: j'ai eu"
- `concepts[0].definition` "Irregular past participle: j'ai eu, tu as eu, il a eu" → "The participle of avoir is eu, said like the French letter u."
- `concepts[0].examples` "(none)" → "["fr":"Hier, j'ai eu le temps.","en":"Yesterday I had time.","fr":"Nous avons eu de la chance.","en":"We were lucky.","fr":"Ils n'ont pas eu le temps.","en":"They didn't have time."]"
- `concepts[0].example` ""J'ai eu le temps (I had time), J'ai eu de la chance (I had luck/I was lucky)"" → "(removed)"
- `concepts[1].term` "être → été (was/been)" → "être: j'ai été"
- `concepts[1].definition` "Irregular past participle: j'ai été, tu as été, il a été" → "The participle of être is été, and it takes avoir."
- `concepts[1].examples` "(none)" → "["fr":"Tu as été content ?","en":"Were you happy?","fr":"Elle a été très occupée.","en":"She was very busy.","fr":"J'ai été au cinéma hier.","en":"I went to the cinema yesterday.","note":"in everyday speech, j'ai été can mean I went"]"
- `concepts[1].example` ""J'ai été content (I was happy), J'ai été à Paris (I went to Paris - informal)"" → "(removed)"
- `concepts[2].term` "faire → fait (did/made)" → "faire: j'ai fait"
- `concepts[2].definition` "Irregular past participle: j'ai fait, tu as fait, il a fait" → "The participle of faire is fait."
- `concepts[2].examples` "(none)" → "["fr":"Qu'est-ce que tu as fait ?","en":"What did you do?","fr":"Elle a fait ses devoirs.","en":"She did her homework.","fr":"J'ai fait un gâteau.","en":"I made a cake."]"
- `concepts[2].example` ""J'ai fait ça (I did that), J'ai fait mes devoirs (I did my homework), J'ai fait un gâteau (I made a cake)"" → "(removed)"
- `concepts[3].term` "voir → vu (saw)" → "voir: j'ai vu"
- `concepts[3].definition` "Irregular past participle: j'ai vu, tu as vu, il a vu" → "The participle of voir is vu."
- `concepts[3].examples` "(none)" → "["fr":"J'ai vu le film hier.","en":"I saw the movie yesterday.","fr":"Tu as vu Marie ?","en":"Did you see Marie?","fr":"Nous avons vu un bon film.","en":"We saw a good movie.","fr":"J'ai vu Paul, il est assis au café.","en":"I saw Paul, he's sitting at the café."]"
- `concepts[3].example` ""J'ai vu le film (I saw the movie), Tu as vu Marie? (Did you see Marie?)"" → "(removed)"
- `concepts[4].term` "Memory tip" → "Learn these four first"
- `concepts[4].definition` "These 4 verbs are the most common - memorize them!" → "These four participles come up in almost every story about the past."
- `concepts[4].examples` "(none)" → "["fr":"J'ai eu raison.","en":"I was right.","fr":"On a été à Paris.","en":"We went to Paris.","fr":"On a fait attention.","en":"We were careful.","fr":"Est-ce que vous avez vu le problème ?","en":"Did you see the problem?"]"
- `concepts[4].example` ""eu, été, fait, vu - practice these until automatic"" → "(removed)"
- `concepts[5].term` "All use AVOIR as auxiliary" → "All four take avoir"
- `concepts[5].definition` "These 4 verbs all use 'avoir' (not être) in passé composé" → "Like most verbs, these four make their past with avoir."
- `concepts[5].examples` "(none)" → "["fr":"j'ai eu","en":"I had","fr":"j'ai été","en":"I was","fr":"j'ai fait","en":"I did, I made","fr":"j'ai vu","en":"I saw"]"
- `concepts[5].example` ""j'ai eu, j'ai été, j'ai fait, j'ai vu (all with 'avoir')"" → "(removed)"

**2024-06-02-passe-compose-irregular-2**

- `concepts[0].term` "Modal verbs with -u ending" → "Participles in -u"
- `concepts[0].definition` "vouloir → voulu, pouvoir → pu, devoir → dû (all end in -u)" → "vouloir gives voulu and pouvoir gives pu. devoir gives dû, with an accent."
- `concepts[0].examples` "(none)" → "["fr":"J'ai voulu partir, mais je n'ai pas pu.","en":"I wanted to leave, but I couldn't.","fr":"Tu as pu venir ?","en":"Were you able to come?","fr":"Elle a dû travailler hier.","en":"She had to work yesterday."]"
- `concepts[0].example` ""J'ai voulu partir (I wanted to leave), J'ai pu venir (I could come), J'ai dû travailler (I had to work)"" → "(removed)"
- `concepts[1].term` "dire → dit (said)" → "dire: j'ai dit"
- `concepts[1].definition` "Irregular past participle: j'ai dit, tu as dit, il a dit" → "The participle of dire is dit."
- `concepts[1].examples` "(none)" → "["fr":"J'ai dit oui.","en":"I said yes.","fr":"Qu'est-ce que tu as dit ?","en":"What did you say?","fr":"On a dit non.","en":"We said no."]"
- `concepts[1].example` ""J'ai dit oui (I said yes), Tu as dit non (You said no)"" → "(removed)"
- `concepts[2].term` "prendre family → -is ending" → "prendre and its family: -is"
- `concepts[2].definition` "prendre → pris, comprendre → compris, apprendre → appris" → "prendre gives pris, and the verbs built on it end the same way."
- `concepts[2].examples` "(none)" → "["fr":"J'ai pris le bus.","en":"I took the bus.","note":"from prendre","fr":"Vous avez compris ?","en":"Did you understand?","note":"from comprendre","fr":"On a appris le français.","en":"We learned French.","note":"from apprendre"]"
- `concepts[2].example` ""J'ai pris le bus (I took the bus), J'ai compris (I understood), J'ai appris le français (I learned French)"" → "(removed)"
- `concepts[3].term` "mettre → mis (put)" → "mettre: j'ai mis"
- `concepts[3].definition` "Irregular past participle: j'ai mis, tu as mis, il a mis" → "The participle of mettre is mis."
- `concepts[3].examples` "(none)" → "["fr":"J'ai mis mon manteau.","en":"I put on my coat.","fr":"Nous avons mis nos livres sur la table.","en":"We put our books on the table.","fr":"J'ai mis ça là.","en":"I put that there."]"
- `concepts[3].example` ""J'ai mis mon manteau (I put on my coat), J'ai mis ça là (I put that there)"" → "(removed)"
- `concepts[4].term` "Modal verbs + infinitive in past" → "Wanted to, could, had to"
- `concepts[4].definition` "Modal verbs can be followed by infinitives in past tense" → "After these participles, the second verb stays in the infinitive."
- `concepts[4].examples` "(none)" → "["fr":"J'ai voulu aller au cinéma, mais je n'ai pas eu le temps.","en":"I wanted to go to the cinema, but I didn't have time.","fr":"J'ai pu venir.","en":"I was able to come.","fr":"Elle a dû partir tôt.","en":"She had to leave early."]"
- `concepts[4].example` ""J'ai voulu aller (I wanted to go), J'ai pu venir (I was able to come), J'ai dû partir (I had to leave)"" → "(removed)"
- `concepts[5].term` "All use AVOIR as auxiliary" → "All of these take avoir"
- `concepts[5].definition` "All these verbs use 'avoir' (not être) in passé composé" → "Like most verbs, these make their past with avoir."
- `concepts[5].examples` "(none)" → "["fr":"j'ai voulu","en":"I wanted","fr":"j'ai pu","en":"I could","fr":"j'ai dû","en":"I had to","fr":"j'ai dit","en":"I said","fr":"j'ai pris","en":"I took","fr":"j'ai mis","en":"I put"]"
- `concepts[5].example` ""j'ai voulu, j'ai pu, j'ai dû, j'ai dit, j'ai pris, j'ai mis"" → "(removed)"

**2024-05-31-passe-compose-etre**

- `concepts[0].term` "DR & MRS VANDERTRAMP - Mnemonic for être verbs" → "Verbs that take être"
- `concepts[0].definition` "Motion and state-change verbs use ÊTRE (not avoir) in passé composé" → "A small group of verbs makes the passé composé with être, not avoir. Most are about moving somewhere or changing state."
- `concepts[0].examples` "(none)" → "["fr":"Hier, je suis allé au café.","en":"Yesterday I went to the café.","fr":"Je suis tombé.","en":"I fell."]"
- `concepts[0].example` ""je suis allé (I went - with être!), NOT j'ai allé ❌"" → "(removed)"
- `concepts[1].term` "Formation: être + past participle" → "être and a past participle"
- `concepts[1].definition` "Use present tense of être + past participle" → "Use the present of être, then the participle."
- `concepts[1].layout` "(none)" → ""forms""
- `concepts[1].examples` "(none)" → "["fr":"je suis allé","en":"I went","fr":"tu es allé","en":"you went","fr":"il est allé","en":"he went","fr":"nous sommes allés","en":"we went","fr":"vous êtes allés","en":"you went","fr":"ils sont allés","en":"they went"]"
- `concepts[1].example` ""je suis allé, tu es venu, il est parti, elle est arrivée"" → "(removed)"
- `concepts[2].term` "The DR & MRS VANDERTRAMP verbs" → "The verbs that take être"
- `concepts[2].definition` "Descendre, Revenir, Mourir, Retourner, Sortir, Venir, Aller, Naître, Devenir, Entrer, Rentrer, Tomber, Rester, Arriver, Monter, Partir" → "English speakers remember them with the name DR MRS VANDERTRAMP, one letter per verb. Many come in opposite pairs, like going in and going out."
- `concepts[2].examples` "(none)" → "["fr":"Elles sont entrées dans le café.","en":"They went into the café.","fr":"Tu es monté dans le bus.","en":"You got on the bus.","fr":"Elle est descendue du train.","en":"She got off the train.","fr":"Il est devenu professeur.","en":"He became a teacher."]"
- `concepts[2].example` ""All motion/state-change verbs - use ÊTRE!"" → "(removed)"
- `concepts[3].term` "Key motion verbs (most common)" → "The ones you will use most"
- `concepts[3].definition` "aller (went), venir (came), partir (left), arriver (arrived), sortir (went out), entrer (entered), rentrer (returned home)" → "Going, coming, leaving and arriving come up in every story."
- `concepts[3].examples` "(none)" → "["fr":"Tu es venu hier ?","en":"Did you come yesterday?","fr":"Il est parti tôt.","en":"He left early.","fr":"Nous sommes arrivés hier soir.","en":"We arrived last night.","fr":"Je suis resté à la maison.","en":"I stayed at home."]"
- `concepts[3].example` ""Je suis allé au café, Je suis venu hier, Je suis parti tôt"" → "(removed)"
- `concepts[4].term` "Agreement with subject (important!)" → "The participle agrees"
- `concepts[4].definition` "Past participle agrees with subject when using être (add e/s/es)" → "With être, the participle takes -e for a woman and -s for more than one person."
- `concepts[4].examples` "(none)" → "["fr":"Il est allé au café.","en":"He went to the café.","fr":"Elle est allée au café.","en":"She went to the café.","note":"add -e","fr":"Ils sont venus hier.","en":"They came yesterday.","note":"add -s"]"
- `concepts[4].example` ""Il est allé (masculine), Elle est allée (+ e for feminine)"" → "(removed)"
- `concepts[5].term` "Negation: ne...pas around être" → "ne … pas around être"
- `concepts[5].definition` "Place ne and pas around être (like with avoir)" → "The form of être goes between ne and pas. It works the same way with avoir."
- `concepts[5].examples` "(none)" → "["fr":"Elle n'est pas venue.","en":"She didn't come.","fr":"Je ne suis pas allé au café.","en":"I didn't go to the café.","fr":"Il n'est pas parti.","en":"He didn't leave."]"
- `concepts[5].example` ""Je ne suis pas allé (I didn't go), Elle n'est pas venue (She didn't come)"" → "(removed)"
- `items[17].text` "Elle ne ___ pas ___" → "Elle n'___ pas ___"

**2024-05-29-passe-compose-agreement**

- `vocabulary[6].example_fr` "Monsieur, vous êtes allé où?" → "Paul, vous êtes allé où ?"
- `vocabulary[8].example_fr` "Les garçons, vous êtes allés où?" → "Les enfants, vous êtes allés où ?"
- `concepts[0].term` "Agreement Rule with être" → "Agreement with être"
- `concepts[0].definition` "When using ÊTRE in passé composé, past participle MUST agree with subject in gender and number" → "With être, the participle matches the subject: -e for feminine, -s for plural."
- `concepts[0].examples` "(none)" → "["fr":"Il est allé au café.","en":"He went to the café.","fr":"Elle est allée au café.","en":"She went to the café.","note":"add -e","fr":"Ils sont allés au café.","en":"They went to the café.","note":"add -s","fr":"Elles sont allées au café.","en":"They went to the café.","note":"all women: add -es"]"
- `concepts[0].example` ""il est allé (masculine), elle est allée (+e), ils sont allés (+s), elles sont allées (+es)"" → "(removed)"
- `concepts[1].term` "Masculine singular - No change" → "One man: no ending"
- `concepts[1].definition` "Il/On: No change to past participle (base form)" → "For a man, with il, the participle has no ending."
- `concepts[1].examples` "(none)" → "["fr":"Mon frère est allé en France.","en":"My brother went to France.","fr":"Ton ami est venu hier ?","en":"Did your friend come yesterday?","fr":"Il est parti tôt.","en":"He left early."]"
- `concepts[1].example` ""il est allé, il est venu, il est parti, on est resté"" → "(removed)"
- `concepts[2].term` "Feminine singular - Add e" → "One woman: add -e"
- `concepts[2].definition` "Elle: Add -e to past participle" → "For a woman, with elle, add -e. You do not hear it."
- `concepts[2].examples` "(none)" → "["fr":"Marie est venue hier.","en":"Marie came yesterday.","fr":"Ma mère est allée au marché.","en":"My mother went to the market.","fr":"Elle est montée dans le bus.","en":"She got on the bus."]"
- `concepts[2].example` ""elle est allée, elle est venue, elle est partie, elle est restée"" → "(removed)"
- `concepts[3].term` "Masculine plural - Add s" → "More than one: add -s"
- `concepts[3].definition` "Ils/Nous/Vous (masculine): Add -s to past participle" → "For a group, add -s, as with ils or nous. You do not hear it either."
- `concepts[3].examples` "(none)" → "["fr":"Nous sommes partis tôt.","en":"We left early.","fr":"Paul et Marc sont rentrés tard.","en":"Paul and Marc came home late.","fr":"Ils sont venus hier.","en":"They came yesterday."]"
- `concepts[3].example` ""ils sont allés, nous sommes venus, vous êtes partis"" → "(removed)"
- `concepts[4].term` "Feminine plural - Add es" → "Only women: add -es"
- `concepts[4].definition` "Elles/Nous/Vous (feminine): Add -es to past participle" → "For a group of women, add -es."
- `concepts[4].examples` "(none)" → "["fr":"Mes sœurs sont allées à Paris.","en":"My sisters went to Paris.","fr":"Les filles sont arrivées hier soir.","en":"The girls arrived last night.","fr":"Nous sommes restées à la maison.","en":"We stayed at home.","note":"said by women","fr":"Vous êtes allées où, les filles ?","en":"Where did you go, girls?"]"
- `concepts[4].example` ""elles sont allées, nous sommes venues (all feminine), vous êtes parties (all feminine)"" → "(removed)"
- `concepts[5].term` "Mixed group - Use masculine form" → "Men and women together: add -s"
- `concepts[5].definition` "When group has both masculine and feminine, use masculine plural (-s)" → "When a group has men and women, use the masculine -s."
- `concepts[5].examples` "(none)" → "["fr":"Pierre et Marie sont partis ensemble.","en":"Pierre and Marie left together.","fr":"Pierre et Marie sont allés au café.","en":"Pierre and Marie went to the café."]"
- `concepts[5].example` ""Pierre et Marie sont allés (masculine plural wins)"" → "(removed)"
- `concepts[6].term` "Remember: Only with ÊTRE verbs!" → "Only with être"
- `concepts[6].definition` "This rule ONLY applies to être verbs (DR MRS VANDERTRAMP + reflexives)" → "With avoir, the participle does not change for the subject."
- `concepts[6].examples` "(none)" → "["fr":"Elle est allée au café.","en":"She went to the café.","note":"with être: add -e","fr":"Elle a étudié le français.","en":"She studied French.","note":"with avoir: no -e","fr":"Elles ont parlé français.","en":"They spoke French.","note":"with avoir: no -es"]"
- `concepts[6].example` ""j'ai mangé (no change with avoir!), BUT je suis allé/allée (agrees with être)"" → "(removed)"
- `items[10].text` "Les garçons ___ tard" → "Paul et Marc ___ tard"
- `items[10].gloss` "The boys came home late" → "Paul and Marc came home late"
- `items[10].mistakes[0].feedback` "Les garçons is plural! Add -s for masculine plural: sont rentrés." → "Paul et Marc is plural! Add -s for masculine plural: sont rentrés."
- `items[10].mistakes[1].feedback` "Garçons (boys) is masculine! Use -s (not -es): sont rentrés." → "Paul and Marc are men, so use -s (not -es): sont rentrés."

**2024-05-27-imparfait-all-verbs**

- `concepts[0].term` "The Golden Rule: nous stem + -ais endings" → "The imparfait starts from nous"
- `concepts[0].definition` "Take 'nous' form of present tense, remove -ons, add -ais endings to ALL verbs (except être)" → "Take the nous form of the present, drop -ons and add the imparfait endings. Every verb works this way except être."
- `concepts[0].examples` "(none)" → "["fr":"Nous parlons français.","en":"We speak French.","fr":"Je parlais français tous les jours.","en":"I used to speak French every day."]"
- `concepts[0].example` ""parler: nous parlons → parl- → je parlais, tu parlais, il parlait"" → "(removed)"
- `concepts[1].term` "Step 1: Find the nous form" → "Step 1: the nous form"
- `concepts[1].definition` "Take the present tense 'nous' form of the verb" → "Start from the present nous form of the verb."
- `concepts[1].examples` "(none)" → "["fr":"nous parlons","en":"we speak","fr":"nous faisons","en":"we do","fr":"nous prenons","en":"we take"]"
- `concepts[1].example` ""parler → nous parlons, faire → nous faisons, aller → nous allons"" → "(removed)"
- `concepts[2].term` "Step 2: Remove -ons" → "Step 2: drop -ons"
- `concepts[2].definition` "Drop the -ons ending to get the stem" → "Take off the -ons, and what is left is the stem. The stem of nous faisons is fais-."
- `concepts[2].examples` "(none)" → "["fr":"Il faisait beau.","en":"It was nice out.","note":"stem fais-","fr":"Je prenais le bus tous les jours.","en":"I used to take the bus every day.","note":"stem pren-","fr":"On allait au café chaque samedi.","en":"We used to go to the café every Saturday.","note":"stem all-"]"
- `concepts[2].example` ""nous parlons → parl-, nous faisons → fais-, nous allons → all-"" → "(removed)"
- `concepts[3].term` "Step 3: Add imparfait endings" → "Step 3: add the endings"
- `concepts[3].definition` "Add: -ais, -ais, -ait, -ions, -iez, -aient (same for ALL verbs!)" → "The endings are the same for every verb. Four of the six forms sound the same."
- `concepts[3].layout` "(none)" → ""forms""
- `concepts[3].examples` "(none)" → "["fr":"je parlais","en":"I was speaking","fr":"tu parlais","en":"you were speaking","fr":"il parlait","en":"he was speaking","fr":"nous parlions","en":"we were speaking","fr":"vous parliez","en":"you were speaking","fr":"ils parlaient","en":"they were speaking"]"
- `concepts[3].example` ""parl- → je parlais, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient"" → "(removed)"
- `concepts[4].term` "ONE EXCEPTION: être" → "être: the one exception"
- `concepts[4].definition` "être is irregular: ét- stem (not nous sommes) → j'étais, tu étais..." → "être uses the stem ét- instead. The endings are the same."
- `concepts[4].layout` "(none)" → ""forms""
- `concepts[4].examples` "(none)" → "["fr":"j'étais","en":"I was","fr":"tu étais","en":"you were","fr":"il était","en":"he was","fr":"nous étions","en":"we were","fr":"vous étiez","en":"you were","fr":"ils étaient","en":"they were"]"
- `concepts[4].example` ""j'étais, tu étais, il était, nous étions, vous étiez, ils étaient"" → "(removed)"
- `concepts[5].term` "When to use Imparfait" → "When to use the imparfait"
- `concepts[5].definition` "Descriptions, habits/repeated actions, ongoing states in past, background/scene-setting" → "Use it to describe how things were and what you used to do."
- `concepts[5].examples` "(none)" → "["fr":"Quand j'étais jeune, je jouais avec mon chien.","en":"When I was young, I used to play with my dog.","fr":"Il y avait beaucoup de gens.","en":"There were a lot of people.","fr":"Elle travaillait beaucoup.","en":"She used to work a lot."]"
- `concepts[5].example` ""Il faisait beau (it was nice - description), Je parlais français tous les jours (I spoke French every day - habit)"" → "(removed)"
- `items[15].text` "Quand j'___ jeune, je jouais au foot" → "Quand j'___ jeune, je jouais avec mon chien"
- `items[15].gloss` "When I was young, I used to play soccer" → "When I was young, I used to play with my dog"

**2024-06-04-pc-vs-imparfait**

- `vocabulary[5].review` "(none)" → "true"
- `concepts[0].term` "The Golden Rule" → "Two past tenses"
- `concepts[0].definition` "PASSÉ COMPOSÉ = Specific completed action (What happened?). IMPARFAIT = Ongoing state/description/habit (How things were/used to be)" → "The passé composé tells what happened. The imparfait describes how things were or what used to happen."
- `concepts[0].examples` "(none)" → "["fr":"Hier, j'ai mangé au restaurant.","en":"Yesterday I ate at the restaurant.","fr":"D'habitude, je mangeais à la maison.","en":"I usually ate at home."]"
- `concepts[0].example` ""J'ai mangé (I ate - specific event) vs Je mangeais (I was eating/used to eat - ongoing or habit)"" → "(removed)"
- `concepts[1].term` "Passé Composé - Specific Events" → "Passé composé: what happened"
- `concepts[1].definition` "Completed actions, countable events, things that started/stopped, main storyline" → "Use it for an event that started and finished: the main line of the story."
- `concepts[1].examples` "(none)" → "["fr":"Soudain, j'ai vu Marie.","en":"Suddenly I saw Marie.","fr":"Hier matin, j'ai pris le bus.","en":"Yesterday morning I took the bus.","fr":"À ce moment-là, j'ai compris.","en":"At that moment, I understood."]"
- `concepts[1].example` ""J'ai vu Marie (I saw Marie - one time), Je suis allé au café (I went to the café - completed)"" → "(removed)"
- `concepts[2].term` "Imparfait - Background & Habits" → "Imparfait: the scene and the habits"
- `concepts[2].definition` "Descriptions, ongoing states, repeated habits ('used to'), scene-setting, background information" → "Use it for descriptions, for states that went on and for things you used to do."
- `concepts[2].examples` "(none)" → "["fr":"Il faisait beau.","en":"It was nice out.","fr":"Elle était toujours en retard.","en":"She was always late.","fr":"Je prenais le bus tous les matins.","en":"I used to take the bus every morning."]"
- `concepts[2].example` ""Il faisait beau (It was nice - description), Je parlais français tous les jours (I used to speak French every day - habit)"" → "(removed)"
- `concepts[3].term` "Pattern: Background (IMP) + Event (PC)" → "The scene, then the event"
- `concepts[3].definition` "Use imparfait to set the scene, passé composé for what happened" → "Set the scene in the imparfait, then say what happened in the passé composé."
- `concepts[3].examples` "(none)" → "["fr":"Il faisait beau quand je suis arrivé.","en":"It was nice out when I arrived.","fr":"Je prenais un café quand tu es arrivé.","en":"I was having a coffee when you arrived."]"
- `concepts[3].example` ""Il faisait beau (background - IMP) quand je suis arrivé (event - PC) = It was nice when I arrived"" → "(removed)"
- `concepts[4].term` "Time expressions help" → "Words that point to each tense"
- `concepts[4].definition` "PC: hier (yesterday), soudain (suddenly), à 8h (at 8). IMP: tous les jours (every day), toujours (always), d'habitude (usually)" → "hier and soudain usually go with the passé composé. tous les jours and d'habitude go with the imparfait."
- `concepts[4].examples` "(none)" → "["fr":"Hier, je suis allé au café.","en":"Yesterday I went to the café.","fr":"Je parlais français tous les jours.","en":"I spoke French every day.","fr":"D'habitude, on allait au café.","en":"We usually went to the café."]"
- `concepts[4].example` ""Hier, j'ai mangé (PC - specific time) vs Je mangeais tous les jours (IMP - habit)"" → "(removed)"
- `concepts[5].term` "'Was doing' interrupted by event" → "Interrupted in the middle"
- `concepts[5].definition` "Use imparfait for ongoing action, passé composé for interruption" → "The imparfait says what was going on. The passé composé says what cut in."
- `concepts[5].examples` "(none)" → "["fr":"Je parlais avec Marie quand tu as appelé.","en":"I was talking with Marie when you called.","fr":"Pendant que je mangeais, tu as appelé.","en":"While I was eating, you called."]"
- `concepts[5].example` ""Je parlais avec Marie (I was talking - IMP) quand tu as appelé (you called - PC event)"" → "(removed)"
- `concepts[6].term` "Mental vs Physical age" → "Age and feelings"
- `concepts[6].definition` "Physical age/description = IMP. Mental state at moment = can be PC" → "Age and a state that lasted take the imparfait. A feeling at one moment can take the passé composé."
- `concepts[6].examples` "(none)" → "["fr":"J'avais 20 ans.","en":"I was 20.","fr":"J'étais content hier.","en":"I was happy yesterday.","fr":"J'ai eu peur.","en":"I got scared.","note":"at one moment"]"
- `concepts[6].example` ""J'avais 20 ans (I was 20 - IMP description) vs J'ai eu peur (I got scared - PC reaction)"" → "(removed)"
- `items[5].text` "Quand j'étais jeune, je ___ au foot" → "Quand j'étais jeune, je ___ avec mon chien"
- `items[5].gloss` "When I was young, I used to play soccer" → "When I was young, I used to play with my dog"

**2024-06-03-past-tense-composition**

- `concepts` "["id":"c-complete-narrative-structure","term":"Complete Narrative Structure","definition":"Combine: 1) Scene-setting (IMP), 2) Events (PC), 3) Causal reasoning (parce que, car), 4) Spatial context (près de, devant)","example":"Hier, il faisait beau donc je suis allé au parc près de chez moi. J'étais content parce que j'avais du temps libre.","id":"c-layered-storytelling-pattern","term":"Layered Storytelling Pattern","definition":"Background (IMP) → Event (PC) → Reason (parce que) → Next Event (PC)","example":"Il faisait beau (background) quand je suis sorti (event). J'ai décidé d'aller au café (event) parce que j'avais faim (reason).","id":"c-rich-scene-setting","term":"Rich Scene-Setting","definition":"Use spatial prepositions + imparfait to paint the picture","example":"Le café était près de l'école. Il y avait beaucoup de gens. Ils étaient assis autour des tables.","id":"c-causal-flow-in-narratives","term":"Causal Flow in Narratives","definition":"Use donc, parce que, car, comme to connect events logically","example":"Comme il faisait beau, je suis sorti. J'ai vu Marie donc on a parlé. On est allés au café car on avait soif.","id":"c-time-and-space-integration","term":"Time and Space Integration","definition":"Combine temporal words (d'abord, ensuite) with spatial (près de, devant)","example":"D'abord, je suis allé au café près de l'école. Ensuite, j'ai vu Marie devant le cinéma."]" → "["id":"c-complete-narrative-structure","term":"A complete story","definition":"Set the scene, say what happened and give the reason.","examples":["fr":"Hier, il faisait beau, donc je suis allé au parc.","en":"Yesterday it was nice out, so I went to the park.","fr":"J'étais content parce que j'avais du temps.","en":"I was happy because I had time."],"id":"c-layered-storytelling-pattern","term":"Building a story step by step","definition":"Start with the scene, add an event, then give the reason for the next event.","examples":["fr":"Il faisait beau quand je suis sorti.","en":"It was nice out when I went out.","fr":"J'ai décidé d'aller au café parce que j'avais faim.","en":"I decided to go to the café because I was hungry."],"id":"c-rich-scene-setting","term":"Setting the scene","definition":"Use the imparfait with words for places to paint the picture.","examples":["fr":"Le café était près de l'école.","en":"The café was near the school.","fr":"Il y avait beaucoup de gens.","en":"There were a lot of people.","fr":"Ils étaient assis autour des tables.","en":"They were sitting around the tables."],"id":"c-causal-flow-in-narratives","term":"Linking events with reasons","definition":"Words like donc and comme tie one event to the next.","examples":["fr":"Comme il faisait beau, je suis sorti.","en":"As it was nice out, I went out.","fr":"J'ai vu Marie, donc on a parlé.","en":"I saw Marie, so we talked.","fr":"On est allés au café car on avait faim.","en":"We went to the café because we were hungry."],"id":"c-time-and-space-integration","term":"First, then, after that","definition":"Put the events in order with d'abord and ensuite, and say where each one happened.","examples":["fr":"D'abord, je suis allé au café près de l'école.","en":"First I went to the café near the school.","fr":"Ensuite, j'ai vu Marie devant le cinéma.","en":"Then I saw Marie in front of the cinema.","fr":"Après, j'ai joué avec mon chien.","en":"After that I played with my dog."],"id":"c-decider-de-commencer-a","term":"A verb, then de or à, then a second verb","definition":"Some verbs take a second verb after de, like décider de. Others take it after à, like commencer à.","examples":["fr":"J'ai décidé d'aller au café.","en":"I decided to go to the café.","note":"the second verb stays in the infinitive","fr":"Il a commencé à parler.","en":"He started to speak."]]"
- `items[9].gloss` "Thanks to being hungry, I ate" → "Because I was hungry, I ate"
- `items[9].hint` ""WRONG! Fix: ___ j'avais faim, j'ai mangé (Because I was hungry, I ate)"" → "(removed)"
- `items[10].text` "Le livre était ___ la table ___ ma chambre" → "Le livre était ___ la table ___ la cuisine"
- `items[10].gloss` "The book was on the table in my room" → "The book was on the table in the kitchen"
- `items[12].text` "J'___ mes devoirs ___ j'ai regardé la télé" → "J'___ mes devoirs ___ j'ai écouté de la musique"
- `items[12].gloss` "I did my homework then I watched TV" → "I did my homework then I listened to music"
- `items[13].text` "___ toi, j'ai réussi" → "___ toi, j'ai appris le français"
- `items[13].gloss` "Thanks to you, I succeeded" → "Thanks to you, I learned French"
- `items[14].text` "___ la pluie, on est restés à la maison" → "___ la fête, on est rentrés tard"
- `items[14].gloss` "Because of the rain, we stayed home" → "Because of the party, we got home late"
- `items[14].mistakes[0].feedback` "Rain isn't positive! Use 'à cause de' for negative/neutral reasons." → "The party is the cause here, not a thanks. Use 'à cause de'."
- `items[14].mistakes[1].feedback` "Parce que needs a CLAUSE! Use 'à cause de la pluie' (because of THE RAIN - noun)." → "Use 'à cause de la fête' (because of THE PARTY, a noun)."

**2024-06-05-reading-9**

- `title` "Reading 9 - Une Histoire du Passé" → "Reading - Une Histoire du Passé"
- `description` "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of Unit 9" → "A story in the past using passé composé, imparfait, causal words, and spatial prepositions - bringing together all of this unit"
- `passage[6].fr` ""Salut Pierre! Qu'est-ce que tu fais ici?" j'ai demandé." → "J'ai demandé: "Salut Pierre! Qu'est-ce que tu fais ici?""
- `passage[6].en` ""Hi Pierre! What are you doing here?" I asked." → "I asked: "Hi Pierre! What are you doing here?""
- `passage[7].fr` ""Bonjour! Je voulais être dehors parce qu'il faisait si beau. Je suis content que tu sois là!" il a dit." → "Il a dit: "Bonjour! Je voulais être dehors parce qu'il faisait si beau. Je suis content que tu sois là!""
- `passage[7].en` ""Hello! I wanted to be outside because it was so nice. I'm glad you're here!" he said." → "He said: "Hello! I wanted to be outside because it was so nice. I'm glad you're here!""
- `passage[8].fr` "Nous avons parlé pendant une heure. Il m'a dit qu'il voulait un nouveau travail à la Sorbonne parce qu'il n'aimait pas son travail. Je lui ai dit que je comprenais car j'ai eu le même problème l'année dernière." → "Nous avons parlé pendant une heure. Pierre voulait un nouveau travail à la Sorbonne parce qu'il n'aimait pas son travail. Je le comprenais, car j'ai eu le même problème l'année dernière."
- `passage[8].en` "We talked for an hour. He told me he wanted a new job at the Sorbonne because he didn't like his job. I told him that I understood because I had the same problem last year." → "We talked for an hour. Pierre wanted a new job at the Sorbonne because he didn't like his job. I understood him, because I had the same problem last year."
- `passage[12].fr` ""Quelle surprise!" elle a dit. "Je ne savais pas que vous étiez ici!"" → "Elle a dit: "Quelle surprise! Je ne savais pas que vous étiez ici!""
- `passage[12].en` ""What a surprise!" she said. "I didn't know you were here!"" → "She said: "What a surprise! I didn't know you were here!""
- `passage[13].fr` "Marie était notre amie de la Sorbonne. Nous ne l'avons pas vue depuis six mois parce qu'elle est maintenant à Lyon. Grâce à cette rencontre, nous avons pu être ensemble pour l'après-midi." → "Marie était notre amie de la Sorbonne. Nous ne la voyons pas souvent parce qu'elle habite maintenant à Lyon. Grâce à cette rencontre, nous avons pu être ensemble pour l'après-midi."
- `passage[13].en` "Marie was our friend from the Sorbonne. We haven't seen her for six months because she's now in Lyon. Thanks to this meeting, we were able to be together for the afternoon." → "Marie was our friend from the Sorbonne. We don't see her often because she now lives in Lyon. Thanks to this meeting, we were able to be together for the afternoon."
- `passage[21].fr` "Parfois, les meilleures journées sont celles qu'on ne pense pas avoir. Grâce à ma sortie au Jardin du Luxembourg, j'ai eu une très belle journée avec mes amis." → "Parfois, les meilleures journées sont des surprises. Grâce à ma sortie au Jardin du Luxembourg, j'ai eu une très belle journée avec mes amis."
- `passage[21].en` "Sometimes, the best days are the ones we don't think we'll have. Thanks to my outing to Jardin du Luxembourg, I had a very beautiful day with my friends." → "Sometimes the best days are surprises. Thanks to my outing to Jardin du Luxembourg, I had a very beautiful day with my friends."

**2024-06-10-unit-9-practice**

- `title` "Unit 9 Practice - Fill in the Blanks" → "Discourse & Past Tense Practice - Fill in the Blanks"
- `description` "Complete sentences using causal words, spatial prepositions, and past tenses from Unit 9!" → "Complete sentences using causal words, spatial prepositions, and past tenses from this unit!"
- `items[0].text` "Je suis en retard ___ j'ai raté le bus." → "Je suis en retard ___ je suis parti tard."
- `items[0].gloss` "I'm late because I missed the bus" → "I'm late because I left late"
- `items[2].text` "___ à toi, j'ai réussi." → "___ toi, j'ai appris le français."
- `items[2].gloss` "Thanks to you, I succeeded" → "Thanks to you, I learned French"
- `items[4].text` "Le chat est ___ les deux chaises." → "Le chat est ___ la porte et la table."
- `items[4].gloss` "The cat is between the two chairs" → "The cat is between the door and the table"
- `items[18].text` "___ il pleuvait, nous ___ à la maison." → "___ nous étions fatigués, nous ___ à la maison."
- `items[18].gloss` "Since it was raining, we stayed home" → "Since we were tired, we stayed home"

**2024-06-09-unit-9-exam**

- `description` "Test everything from Unit 9! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery." → "Test everything from this unit! Causal words, spatial prepositions, passé composé, imparfait, and the critical PC vs IMP distinction for complete storytelling mastery."

**2024-01-23-common-special-forms-1**

- `concepts[0].term` "Why These Forms Exist" → "A different form after il faut que"
- `concepts[0].definition` "French uses different verb forms after phrases like 'il faut que' (someone needs to), 'je veux que' (I want someone to), 'je suis content que' (I'm happy that someone...). These express wishes, needs, or emotions about OTHER PEOPLE's actions." → "After phrases like il faut que, the verb takes a special form, called the subjunctive. It shows a need, a wish or a feeling about what someone does."
- `concepts[0].examples` "(none)" → "["fr":"Tu es gentil.","en":"You are kind.","fr":"Il faut que tu sois gentil.","en":"You need to be kind.","note":"es becomes sois"]"
- `concepts[0].example` ""Normal statement: Tu es sage (You are good). Wish about you: Il faut que tu sois sage (You need to be good - different form!)"" → "(removed)"
- `concepts[1].term` "Where You CAN Use These Forms" → "Where these forms go"
- `concepts[1].definition` "ONLY after certain phrases: il faut que, je veux que, je suis content que, j'ai peur que, avant que, pour que, bien que, etc." → "They come after a phrase that ends in que and names a need, a wish or a feeling."
- `concepts[1].examples` "(none)" → "["fr":"Il faut que tu fasses ça.","en":"You need to do that.","fr":"Il faut qu'il aille à Paris.","en":"He needs to go to Paris."]"
- `concepts[1].example` ""✓ Il faut que tu sois sage (You need to be good), ✓ Je veux qu'il aille (I want him to go)"" → "(removed)"
- `concepts[2].term` "Where You CANNOT Use These Forms" → "Where they do not go"
- `concepts[2].definition` "DON'T use these for normal statements, questions, or with just il faut/je veux (no 'que')" → "In an ordinary statement or question, use the ordinary form."
- `concepts[2].examples` "(none)" → "["fr":"Tu es content ?","en":"Are you happy?","fr":"Il fait ça.","en":"He does that.","note":"the ordinary form: fait, not fasse"]"
- `concepts[2].example` ""✗ Tu sois content? (Wrong! Say: Tu es content?). ✗ Il faut aller (Correct - no 'que' = normal form)"" → "(removed)"
- `concepts[3].term` "The Trigger: Look for 'que'" → "Look for que and a person"
- `concepts[3].definition` "If you see 'que' + a person after these starter phrases, use these forms!" → "When que and a person follow il faut, the verb after them takes the special form."
- `concepts[3].examples` "(none)" → "["fr":"Il faut que tu sois là.","en":"You need to be there.","fr":"Il faut qu'il ait le livre.","en":"He needs to have the book.","fr":"Il faut que tu ailles au café.","en":"You need to go to the café."]"
- `concepts[3].example` ""il faut QUE tu → use sois/aies/ailles/fasses, je veux QUE tu → use sois/aies/ailles/fasses"" → "(removed)"

**2024-01-24-common-special-forms-2**

- `concepts[0].term` "More Verbs That Change After 'que'" → "More verbs that change after que"
- `concepts[0].definition` "Like the previous special forms module, these verbs change ONLY after phrases with 'que' (il faut que, je veux que, je suis content que, etc.)" → "These verbs change the same way after il faut que and phrases like it."
- `concepts[0].examples` "(none)" → "["fr":"Il faut que tu viennes.","en":"You need to come.","fr":"Il faut qu'il parte.","en":"He needs to leave.","fr":"Il faut que tu saches ça.","en":"You need to know that.","fr":"Il faut qu'il comprenne.","en":"He needs to understand."]"
- `concepts[0].example` ""Normal: tu viens (you come) → After 'je veux que': tu viennes. Normal: tu peux (you can) → After 'il faut que': tu puisses"" → "(removed)"
- `concepts[1].term` "When To Use vs When NOT To Use" → "Special form or ordinary form"
- `concepts[1].definition` "USE: After 'que' in wish/need/emotion phrases. DON'T USE: For normal statements or questions." → "Use the special form after que in a phrase of need, wish or feeling. Everywhere else, use the ordinary form."
- `concepts[1].examples` "(none)" → "["fr":"Je veux que tu viennes.","en":"I want you to come.","fr":"Tu viens ici ?","en":"Are you coming here?","note":"the ordinary form: viens"]"
- `concepts[1].example` ""✓ Je veux que tu viennes (I want you to come). ✗ Tu viennes ici? (Wrong! Say: Tu viens ici?)"" → "(removed)"
- `concepts[2].term` "The Trigger: Look for 'que'" → "No que, no change"
- `concepts[2].definition` "If you see 'il faut/je veux/je suis content + QUE + person', use these forms. No 'que' = normal forms." → "With que and a person after il faut, the verb changes. Without them, it does not."
- `concepts[2].examples` "(none)" → "["fr":"Tu pars maintenant.","en":"You're leaving now.","fr":"Il faut que tu partes maintenant.","en":"You need to leave now."]"
- `concepts[2].example` ""Il faut partir (leave - normal). Il faut QUE tu partes (you leave - changed form!)"" → "(removed)"

**2024-01-28-necessity-phrases**

- `vocabulary[0].review` "(none)" → "true"
- `vocabulary[1].review` "(none)" → "true"
- `vocabulary[2].review` "(none)" → "true"
- `vocabulary[3].review` "(none)" → "true"
- `vocabulary[4].review` "(none)" → "true"
- `vocabulary[5].review` "(none)" → "true"
- `vocabulary[6].review` "(none)" → "true"
- `concepts[0].term` "Il faut que... - Directed Necessity" → "il faut que for one person"
- `concepts[0].definition` "Tell SOMEONE SPECIFIC what needs to happen. More direct than 'il faut + verb'" → "il faut with a verb says what has to be done in general. il faut que with a person says who has to do it."
- `concepts[0].examples` "(none)" → "["fr":"Il faut manger.","en":"You have to eat.","note":"in general","fr":"Il faut que tu manges.","en":"You need to eat.","note":"you in particular","fr":"Il faut qu'on aille au parc.","en":"We need to go to the park."]"
- `concepts[0].example` ""Il faut manger (general: someone should eat) → Il faut que tu manges (YOU specifically need to eat)"" → "(removed)"
- `concepts[1].term` "Parent/Friend Language" → "At home and with friends"
- `concepts[1].definition` "These phrases are used constantly in daily life!" → "Parents and friends say these phrases every day."
- `concepts[1].examples` "(none)" → "["fr":"Il faut que tu sois sage.","en":"You need to be good.","note":"a parent to a child","fr":"Il faut que tu fasses attention.","en":"You need to pay attention.","fr":"Il faut qu'on parte.","en":"We need to leave."]"
- `concepts[1].example` ""Parent to kid: 'Il faut que tu finisses tes devoirs' (You need to finish homework)"" → "(removed)"

**2024-02-07-wish-phrases**

- `concepts[0].term` "Je veux que... - Directing Wishes" → "je veux que for someone else"
- `concepts[0].definition` "Express what you want SOMEONE ELSE to do (not yourself!)" → "je veux with a verb is what you want to do. je veux que with a person is what you want someone else to do."
- `concepts[0].examples` "(none)" → "["fr":"Je veux manger.","en":"I want to eat.","fr":"Je veux que tu manges.","en":"I want you to eat.","fr":"Je veux qu'il parte.","en":"I want him to leave.","fr":"Je ne veux pas que tu tombes !","en":"I don't want you to fall!"]"
- `concepts[0].example` ""Je veux manger (I want to eat - me) → Je veux que tu manges (I want YOU to eat - you)"" → "(removed)"
- `concepts[1].term` "Softer Version: J'aimerais que..." → "Softer: j'aimerais que"
- `concepts[1].definition` "More polite way to express wishes" → "j'aimerais que means I'd like someone to do something. It sounds more polite than je veux que."
- `concepts[1].examples` "(none)" → "["fr":"J'aimerais que tu viennes.","en":"I'd like you to come.","fr":"J'aimerais que tu sois là.","en":"I'd like you to be there."]"
- `concepts[1].example` ""J'aimerais que tu viennes (I'd like you to come)"" → "(removed)"

**2024-01-25-emotion-phrases**

- `vocabulary[0].word_id` "je-suis-content-que-tu-sois-la-fr.i-m-happy" → "je-suis-content-que-tu-sois-la-fr"
- `concepts` "["id":"c-expressing-emotions-about-others","term":"Expressing Emotions About Others","definition":"Your feelings are usually about what OTHER PEOPLE do or say!","example":"Je suis content (I'm happy - about what?) → Je suis content que tu sois là (I'm happy YOU'RE here!)","id":"c-common-emotion-phrases","term":"Common Emotion Phrases","definition":"Happy, sad, afraid, sorry - all followed by 'que + person + action'","example":"Je suis triste que tu partes (I'm sad you're leaving), J'ai peur qu'elle ne comprenne pas (I'm afraid she won't understand)"]" → "["id":"c-expressing-emotions-about-others","term":"Feelings about what others do","definition":"After a feeling and que, the verb takes the special form.","examples":["fr":"Je suis content que tu sois là.","en":"I'm happy you're here.","fr":"Je suis triste que tu partes.","en":"I'm sad you're leaving.","fr":"Je regrette que tu ne puisses pas venir.","en":"I'm sorry you can't come.","fr":"Il faut que tu viennes : je veux que tu sois là !","en":"You have to come: I want you to be there!"],"id":"c-common-emotion-phrases","term":"Common feelings","definition":"Happy, sad, afraid, sorry and surprised all work the same way.","examples":["fr":"J'ai peur qu'il parte.","en":"I'm afraid he'll leave.","fr":"Je suis désolé que tu sois malade.","en":"I'm sorry you're sick.","fr":"Je suis surpris que tu saches ça.","en":"I'm surprised you know that.","fr":"J'ai peur qu'elle ne comprenne pas.","en":"I'm afraid she won't understand."],"id":"c-content-de-infinitive","term":"Same person: de and a verb, not que","definition":"When the feeling and the action belong to the same person, use de and the verb as it is. Use que and the special form for someone else's action.","examples":["fr":"Je suis content de te voir.","en":"I'm happy to see you.","fr":"Je suis content que tu sois là.","en":"I'm happy you're here.","fr":"C'est bon de te voir.","en":"It's good to see you.","note":"de also follows c'est and a describing word"]]"

**2024-01-29-opinion-phrases**

- `concepts[0].term` "Positive Opinion = Belief" → "je pense que: what you believe"
- `concepts[0].definition` "'Je pense que...' expresses what you believe is true" → "je pense que says what you believe is true. The verb after it keeps its ordinary form."
- `concepts[0].examples` "(none)" → "["fr":"Je pense qu'il vient.","en":"I think he's coming.","fr":"Je pense que c'est bon de partir tôt.","en":"I think it's good to leave early."]"
- `concepts[0].example` ""Je pense qu'il vient (I think he's coming - I believe it)"" → "(removed)"
- `concepts[1].term` "Negative Opinion = Doubt" → "je ne pense pas que: doubt"
- `concepts[1].definition` "'Je ne pense pas que...' expresses uncertainty - more diplomatic!" → "When you doubt something, the verb after que takes the special form."
- `concepts[1].examples` "(none)" → "["fr":"Je ne pense pas qu'il vienne.","en":"I don't think he's coming.","fr":"Je doute qu'elle sache.","en":"I doubt she knows.","fr":"Je ne crois pas qu'il ait raison.","en":"I don't think he's right."]"
- `concepts[1].example` ""Je ne pense pas qu'il vienne (I don't think he's coming - diplomatic disagreement)"" → "(removed)"
- `concepts[2].term` "Diplomatic Communication" → "Disagreeing gently"
- `concepts[2].definition` "'Je ne pense pas que...' sounds gentler than saying 'Non!'" → "Je ne pense pas que sounds gentler than a plain no."
- `concepts[2].examples` "(none)" → "["fr":"Je ne pense pas que ce soit vrai.","en":"I don't think that's true.","fr":"Je doute que ce soit possible.","en":"I doubt that's possible."]"
- `concepts[2].example` ""Instead of 'That's wrong!', say 'Je ne pense pas que ce soit vrai' (I don't think that's true)"" → "(removed)"

**2024-01-27-hypothetical-phrases**

- `description` "Talk about fantasies and what-ifs! 'Si j'étais riche, j'achèterais...' (If I were rich, I'd buy...), 'Si j'avais le temps, je voyagerais' (If I had time, I'd travel). Everyone loves daydreaming!" → "Talk about fantasies and what-ifs! 'Si j'étais riche...' (If I were rich...), 'Si j'avais le temps, je voyagerais' (If I had time, I'd travel). Everyone loves daydreaming!"
- `concepts[0].term` "Daydreaming in French" → "Daydreaming with si"
- `concepts[0].definition` "Use 'si + past form' to talk about fantasies and hypotheticals" → "si with a past form, like j'étais, talks about something that is not real."
- `concepts[0].examples` "(none)" → "["fr":"Si j'étais riche…","en":"If I were rich…","fr":"Si tu étais ici…","en":"If you were here…","fr":"Si on avait le temps, on marcherait.","en":"If we had time, we'd walk."]"
- `concepts[0].example` ""Si j'étais riche... (If I were rich...), Si j'avais de l'argent... (If I had money...)"" → "(removed)"
- `concepts[1].term` "Giving Advice: Si j'étais toi" → "Advice: si j'étais toi"
- `concepts[1].definition` "'If I were you...' - super common for giving advice!" → "If I were you: a common way to give advice."
- `concepts[1].examples` "(none)" → "["fr":"Si j'étais toi, je ferais ça.","en":"If I were you, I'd do that."]"
- `concepts[1].example` ""Si j'étais toi, je ferais ça (If I were you, I'd do that)"" → "(removed)"

**2024-01-30-past-regret-phrases**

- `concepts[0].term` "Expressing Regret" → "Regret: si j'avais"
- `concepts[0].definition` "Use 'si j'avais...' to talk about things you wish you'd done differently" → "si j'avais with a past verb talks about something you wish had gone differently."
- `concepts[0].examples` "(none)" → "["fr":"Si j'avais su…","en":"If I'd known…","fr":"Si j'avais étudié…","en":"If I'd studied…","fr":"Si j'avais pu…","en":"If I could have…"]"
- `concepts[0].example` ""Si j'avais su... (If I'd known...), Si j'avais fait ça... (If I'd done that...)"" → "(removed)"
- `concepts[1].term` "Common Regret Phrases" → "What would have happened"
- `concepts[1].definition` "Everyone regrets not knowing, not studying, not coming, etc." → "The second half of the sentence says what would have happened."
- `concepts[1].examples` "(none)" → "["fr":"Si j'avais su, je serais venu.","en":"If I'd known, I would have come.","fr":"Si j'avais étudié, j'aurais réussi.","en":"If I'd studied, I would have succeeded."]"
- `concepts[1].example` ""Si j'avais su, je serais venu (If I'd known, I would have come)"" → "(removed)"

**2024-01-26-had-already-phrases**

- `concepts[0].term` "What Happened FIRST" → "What happened first"
- `concepts[0].definition` "Use 'j'avais déjà...' to show something happened BEFORE another past event" → "j'avais déjà with a past verb shows that one thing happened before another thing in the past."
- `concepts[0].examples` "(none)" → "["fr":"Quand il est arrivé, j'avais déjà mangé.","en":"When he arrived, I had already eaten.","fr":"J'avais déjà vu ce film.","en":"I had already seen this movie."]"
- `concepts[0].example` ""Quand il est arrivé (when he arrived), j'avais déjà mangé (I had already eaten) - I ate FIRST, he arrived SECOND"" → "(removed)"
- `concepts[1].term` "'Déjà' = Already" → "déjà = already"
- `concepts[1].definition` "Often used with these phrases to emphasize 'already done'" → "déjà usually goes between the two parts of the verb."
- `concepts[1].examples` "(none)" → "["fr":"J'avais déjà fini.","en":"I had already finished.","fr":"Il avait déjà commencé.","en":"He had already started.","fr":"Elle était déjà partie.","en":"She had already left."]"
- `concepts[1].example` ""J'avais déjà fini (I had already finished)"" → "(removed)"

**2024-01-22-common-adverbs**

- `vocabulary[3].note` "courir rapidement" → "manger rapidement"
- `concepts[0].term` "Add Nuance to Any Verb" → "How you do something"
- `concepts[0].definition` "Adverbs describe HOW you do something" → "These words say how you do something. Many end in -ment, as many English ones end in -ly."
- `concepts[0].examples` "(none)" → "["fr":"Je parle lentement.","en":"I speak slowly.","fr":"Il mange rapidement.","en":"He eats quickly.","fr":"Tu comprends facilement.","en":"You understand easily."]"
- `concepts[0].example` ""parler (speak) → parler lentement (speak slowly), parler rapidement (speak quickly)"" → "(removed)"
- `concepts[1].term` "Most Common Adverbs" → "Before a describing word"
- `concepts[1].definition` "Learn the top ones - you'll use these constantly!" → "Some of these words go before a describing word to make it stronger."
- `concepts[1].examples` "(none)" → "["fr":"C'est vraiment bon.","en":"It's really good.","fr":"C'est complètement fini.","en":"It's completely finished."]"
- `concepts[1].example` ""vraiment bon (really good), sérieusement fatigué (seriously tired)"" → "(removed)"

**2024-02-06-while-doing-phrases**

- `description` "Describe multitasking! 'En mangeant, je regarde la télé' (While eating, I watch TV), 'On apprend en pratiquant' (We learn by practicing). Natural speech patterns!" → "Describe multitasking! 'En mangeant, je regarde un film' (While eating, I watch a film), 'On apprend en pratiquant' (We learn by practicing). Natural speech patterns!"
- `concepts[0].term` "En + -ant = While Doing" → "en with -ant: while doing"
- `concepts[0].definition` "Describe two actions happening at the same time, or the METHOD you use" → "en with the -ant form of a verb says you do two things at once."
- `concepts[0].examples` "(none)" → "["fr":"Il parle en mangeant.","en":"He talks while eating.","fr":"On parle en marchant.","en":"We talk while walking."]"
- `concepts[0].example` ""En mangeant (while eating), en parlant (while speaking), en travaillant (while working)"" → "(removed)"
- `concepts[1].term` "Common Uses" → "Two things at once, or how"
- `concepts[1].definition` "Multitasking, explaining method, simultaneous actions" → "The -ant form can say what else you are doing, or how you get something done."
- `concepts[1].examples` "(none)" → "["fr":"Je travaille en écoutant de la musique.","en":"I work while listening to music.","fr":"Je mange lentement en regardant un film.","en":"I eat slowly while watching a film.","fr":"J'apprends le français en pratiquant.","en":"I learn French by practicing."]"
- `concepts[1].example` ""Je travaille en écoutant de la musique (I work while listening to music)"" → "(removed)"

**2024-02-02-service-phrases**

- `concepts[0].term` "Je me fais + verb = Getting Something Done TO YOU" → "je me fais with a verb: done to you"
- `concepts[0].definition` "Services for yourself: haircut, makeup, medical exams, etc." → "Use je me fais with a verb for a service someone does to you."
- `concepts[0].examples` "(none)" → "["fr":"Je me fais couper les cheveux.","en":"I'm getting my hair cut.","fr":"Je me fais maquiller.","en":"I'm getting my makeup done.","fr":"Je me fais examiner.","en":"I'm getting examined.","note":"at the doctor's"]"
- `concepts[0].example` ""Je me fais couper les cheveux (I'm getting my hair cut - at salon)"" → "(removed)"
- `concepts[1].term` "Je fais + verb = Having Something Done (Not You)" → "je fais with a verb: done for you"
- `concepts[1].definition` "Having something repaired, built, cleaned by someone else" → "Use je fais with a verb for work someone else does on a thing of yours."
- `concepts[1].examples` "(none)" → "["fr":"Je fais réparer ma voiture.","en":"I'm having my car repaired.","fr":"Je fais nettoyer la maison.","en":"I'm having the house cleaned.","fr":"Je fais construire une maison.","en":"I'm having a house built."]"
- `concepts[1].example` ""Je fais réparer ma voiture (I'm having my car repaired - by mechanic)"" → "(removed)"

**2024-01-21-before-phrases**

- `concepts[0].term` "Avant que... - Before Someone Does Something" → "avant que: before someone does something"
- `concepts[0].definition` "Use to talk about timing relative to someone else's action" → "avant que sets your action before someone else's. The verb after it takes the special form."
- `concepts[0].examples` "(none)" → "["fr":"avant que tu partes","en":"before you leave","fr":"avant qu'il arrive","en":"before he arrives","fr":"avant qu'il soit trop tard","en":"before it's too late"]"
- `concepts[0].example` ""Avant que tu partes (Before you leave), Avant qu'il arrive (Before he arrives)"" → "(removed)"
- `concepts[1].term` "Common in Daily Life" → "Timing in daily life"
- `concepts[1].definition` "Coordinating actions, giving warnings, setting deadlines" → "Use it to say what has to happen first."
- `concepts[1].examples` "(none)" → "["fr":"Finis avant que papa rentre !","en":"Finish before Dad gets home!","fr":"Avant que tu partes, parlons en mangeant.","en":"Before you leave, let's talk while we eat."]"
- `concepts[1].example` ""Finis avant que papa rentre! (Finish before dad gets home!)"" → "(removed)"

**2024-02-03-so-that-phrases**

- `concepts[0].term` "Pour que... - So That Someone Can..." → "pour que = so that"
- `concepts[0].definition` "Express your PURPOSE or GOAL for someone else" → "pour que gives the goal of an action for someone else. The verb after it takes the special form."
- `concepts[0].examples` "(none)" → "["fr":"pour que tu comprennes","en":"so that you understand","fr":"pour qu'elle sache","en":"so that she knows"]"
- `concepts[0].example` ""Pour que tu comprennes (So that you understand), Pour qu'elle sache (So that she knows)"" → "(removed)"
- `concepts[1].term` "Explaining Why You're Doing Something" → "Saying why you do something"
- `concepts[1].definition` "Super useful for explaining your intentions!" → "Put pour que after what you do to say why you do it."
- `concepts[1].examples` "(none)" → "["fr":"Je parle lentement pour que tu comprennes.","en":"I speak slowly so you understand.","fr":"Je fais venir Marie pour que tu sois content.","en":"I'm having Marie come so you're happy."]"
- `concepts[1].example` ""Je parle lentement pour que tu comprennes (I speak slowly so you understand)"" → "(removed)"

**2024-01-20-although-phrases**

- `concepts[0].term` "Bien que... - Although / Even Though" → "bien que = although"
- `concepts[0].definition` "Express doing something DESPITE another condition" → "bien que says you do something despite another fact. The verb after it takes the special form."
- `concepts[0].examples` "(none)" → "["fr":"Bien que je sois fatigué, je travaille.","en":"Although I'm tired, I'm working.","fr":"Bien qu'elle soit malade, elle vient.","en":"Although she's sick, she's coming."]"
- `concepts[0].example` ""Bien que je sois fatigué, je travaille (Although I'm tired, I'm working)"" → "(removed)"
- `concepts[1].term` "Showing Determination" → "Doing it anyway"
- `concepts[1].definition` "Doing something despite obstacles - shows perseverance!" → "The second half of the sentence says what happens anyway."
- `concepts[1].examples` "(none)" → "["fr":"Bien qu'il fasse froid, on va au parc.","en":"Even though it's cold, we're going to the park.","fr":"Bien que je sois fatigué, je t'aide pour que tu partes avant qu'il soit trop tard.","en":"Although I'm tired, I'm helping you so you can leave before it's too late."]"
- `concepts[1].example` ""Bien qu'il fasse froid, on sort (Even though it's cold, we're going out)"" → "(removed)"

**2024-01-31-possibility-phrases**

- `concepts[0].term` "Il est possible que... - It's Possible That..." → "il est possible que: it might happen"
- `concepts[0].definition` "Express something that MIGHT happen (not certain!)" → "It says something might happen. The verb after it takes the special form."
- `concepts[0].examples` "(none)" → "["fr":"Il est possible qu'il vienne.","en":"He might come.","fr":"Il est possible qu'on parte.","en":"We might leave."]"
- `concepts[0].example` ""Il est possible qu'il vienne (It's possible he'll come - not sure!)"" → "(removed)"
- `concepts[1].term` "Peut-être - Maybe" → "peut-être = maybe"
- `concepts[1].definition` "Quick way to express uncertainty" → "A quick way to say you are not sure. With que after it, the verb keeps its ordinary form."
- `concepts[1].examples` "(none)" → "["fr":"Peut-être qu'il viendra.","en":"Maybe he'll come.","fr":"Peut-être demain.","en":"Maybe tomorrow.","fr":"Peut-être pas.","en":"Maybe not."]"
- `concepts[1].example` ""Peut-être qu'il viendra (Maybe he'll come), Peut-être demain (Maybe tomorrow)"" → "(removed)"
- `concepts[2].term` "Planning and Hedging" → "Keeping plans open"
- `concepts[2].definition` "Essential for making flexible plans!" → "These phrases leave room to change a plan."
- `concepts[2].examples` "(none)" → "["fr":"Il est possible qu'on parte demain.","en":"We might leave tomorrow.","fr":"Il se peut qu'il vienne.","en":"He may come."]"
- `concepts[2].example` ""Il est possible qu'on parte demain (We might leave tomorrow)"" → "(removed)"

**2024-02-01-reading-10**

- `title` "Reading 10 - Mes Rêves et Mes Espoirs" → "Reading - Mes Rêves et Mes Espoirs"
- `description` "A story about dreams and ambitions using Unit 10's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more" → "A story about dreams and ambitions using this unit's advanced expressions: wishes (je veux que...), emotions (je suis content que...), hypotheticals (si j'étais...), and more"
- `passage[6].fr` "Mon ami Marc est arrivé au café. Il savait que j'aime ce café parce que c'est près de Notre-Dame. Je suis contente qu'il soit venu! On se parle toujours de nos rêves." → "Mon ami Marc est arrivé au café. Il savait que j'aime ce café parce que c'est près de Notre-Dame. Je suis contente qu'il soit là! On se parle toujours de nos rêves."
- `passage[6].en` "My friend Marc arrived at the café. He knew I like this café because it's near Notre-Dame. I'm glad he came! We always talk to each other about our dreams." → "My friend Marc arrived at the café. He knew I like this café because it's near Notre-Dame. I'm glad he's here! We always talk to each other about our dreams."
- `passage[7].fr` ""Salut Sophie! Je savais que tu serais ici," il a dit." → "Il a dit: "Salut Sophie! Je savais que tu serais ici.""
- `passage[7].en` ""Hi Sophie! I knew you'd be here," he said." → "He said: "Hi Sophie! I knew you'd be here.""
- `passage[8].fr` ""Bonjour Marc! Je suis heureuse que tu sois là. J'étais en train de penser à mes rêves," j'ai dit." → "J'ai dit: "Bonjour Marc! Je suis heureuse que tu sois là. J'étais en train de penser à mes rêves.""
- `passage[8].en` ""Hello Marc! I'm happy you're here. I was thinking about my dreams," I said." → "I said: "Hello Marc! I'm happy you're here. I was thinking about my dreams.""
- `passage[9].fr` ""Ah oui? Moi aussi, j'ai beaucoup de rêves. Je veux que ma vie change," il a dit." → "Il a dit: "Ah oui? Moi aussi, j'ai beaucoup de rêves. Je veux que ma vie change.""
- `passage[9].en` ""Oh yes? Me too, I have many dreams. I want my life to change," he said." → "He said: "Oh yes? Me too, I have many dreams. I want my life to change.""
- `passage[10].fr` "Marc m'a dit qu'il voulait être artiste. Il voulait que les gens voient ses peintures au Louvre un jour. C'est un grand rêve! Le Louvre est le musée le plus célèbre du monde." → "Marc m'a parlé de son rêve: être artiste. Il voulait que les gens voient ses peintures au Louvre un jour. C'est un grand rêve! Le Louvre est le musée le plus célèbre du monde."
- `passage[10].en` "Marc told me he wanted to be an artist. He wanted people to see his paintings at the Louvre one day. It's a big dream! The Louvre is the most famous museum in the world." → "Marc talked to me about his dream: to be an artist. He wanted people to see his paintings at the Louvre one day. It's a big dream! The Louvre is the most famous museum in the world."
- `passage[11].fr` ""Je veux qu'un jour mes peintures soient au Louvre. Mais j'ai peur que ce soit difficile," il a dit." → "Il a dit: "Je veux qu'un jour mes peintures soient au Louvre. Mais j'ai peur que ce soit difficile.""
- `passage[11].en` ""I want my paintings to be at the Louvre one day. But I'm afraid it might be difficult," he said." → "He said: "I want my paintings to be at the Louvre one day. But I'm afraid it might be difficult.""
- `passage[13].fr` ""Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais," j'ai dit." → "J'ai dit: "Je comprends. Mais il faut que tu essaies! Si tu ne fais rien, tu ne sauras jamais.""
- `passage[13].en` ""I understand. But you have to try! If you don't do anything, you'll never know," I said." → "I said: "I understand. But you have to try! If you don't do anything, you'll never know.""
- `passage[14].fr` "Nous avons parlé pendant une heure. Je lui ai dit que je voulais être professeur de français. J'aimerais que mes étudiants adorent la langue française comme moi." → "Nous avons parlé pendant une heure. Je lui ai parlé de mon rêve: être professeur de français. J'aimerais que mes étudiants adorent la langue française comme moi."
- `passage[14].en` "We talked for an hour. I told him I wanted to be a French teacher. I'd like my students to love the French language like me." → "We talked for an hour. I talked to him about my dream: to be a French teacher. I'd like my students to love the French language like me."
- `passage[15].fr` ""Je suis content que tu aies ce rêve. Tu serais une excellente professeur," Marc a dit." → "Marc a dit: "Je suis content que tu aies ce rêve. Tu serais une excellente professeur.""
- `passage[15].en` ""I'm glad you have this dream. You'd be an excellent teacher," Marc said." → "Marc said: "I'm glad you have this dream. You'd be an excellent teacher.""
- `passage[16].fr` ""Merci! Mais j'ai peur que ce soit trop difficile. J'avais déjà essayé l'année dernière mais je n'ai pas réussi," j'ai dit." → "J'ai dit: "Merci! Mais j'ai peur que ce soit trop difficile. J'avais déjà essayé l'année dernière mais je n'ai pas réussi.""
- `passage[16].en` ""Thank you! But I'm afraid it might be too difficult. I had already tried last year but I didn't succeed," I said." → "I said: "Thank you! But I'm afraid it might be too difficult. I had already tried last year but I didn't succeed.""
- `passage[17].fr` ""Il faut que tu essaies encore! Si j'étais toi, je ne renoncerais pas," il a dit." → "Il a dit: "Il faut que tu essaies encore! Si j'étais toi, je ne renoncerais pas.""
- `passage[17].en` ""You have to try again! If I were you, I wouldn't give up," he said." → "He said: "You have to try again! If I were you, I wouldn't give up.""
- `passage[19].fr` "Nous avons décidé d'aider l'un l'autre. Je veux qu'il réussisse avec ses peintures, et il veut que je réussisse comme professeur." → "Nous avons décidé de nous aider l'un l'autre. Je veux qu'il réussisse avec ses peintures, et il veut que je réussisse comme professeur."
- `passage[20].fr` ""Je suis heureux que nous soyons amis. On peut s'aider," Marc a dit." → "Marc a dit: "Je suis heureux que nous soyons amis. On peut s'aider.""
- `passage[20].en` ""I'm happy we're friends. We can help each other," Marc said." → "Marc said: "I'm happy we're friends. We can help each other.""
- `passage[21].fr` ""Moi aussi! J'aimerais que nous réussissions tous les deux," j'ai dit." → "J'ai dit: "Moi aussi! J'aimerais que nous réussissions tous les deux.""
- `passage[21].en` ""Me too! I'd like us both to succeed," I said." → "I said: "Me too! I'd like us both to succeed.""
- `passage[24].fr` ""Si on avait plus de temps, on pourrait marcher toute la nuit," Marc a dit." → "Marc a dit: "Si on avait plus de temps, on pourrait marcher toute la nuit.""
- `passage[24].en` ""If we had more time, we could walk all night," Marc said." → "Marc said: "If we had more time, we could walk all night.""
- `passage[25].fr` ""Oui ! J'adore Paris la nuit. C'est pour ça que je veux rester ici toute ma vie," j'ai dit." → "J'ai dit: "Oui ! J'adore Paris la nuit. C'est pour ça que je veux rester ici toute ma vie.""
- `passage[25].en` ""Yes! I love Paris at night. That's why I want to stay here all my life," I said." → "I said: "Yes! I love Paris at night. That's why I want to stay here all my life.""
- `passage[27].fr` ""Sophie, il faut que tu saches une chose: tes rêves sont importants. Je veux que tu continues à essayer," il a dit." → "Il a dit: "Sophie, il faut que tu saches une chose: tes rêves sont importants. Je veux que tu continues à essayer.""
- `passage[27].en` ""Sophie, you need to know one thing: your dreams are important. I want you to keep trying," he said." → "He said: "Sophie, you need to know one thing: your dreams are important. I want you to keep trying.""
- `passage[28].fr` ""Merci Marc. Je suis reconnaissante que tu m'aies dit ça. Toi aussi, tu dois continuer avec tes peintures," j'ai dit." → "J'ai dit: "Merci Marc. Je suis reconnaissante que tu sois là pour moi. Toi aussi, tu dois continuer avec tes peintures.""
- `passage[28].en` ""Thank you Marc. I'm grateful you told me that. You too, you must continue with your paintings," I said." → "I said: "Thank you Marc. I'm grateful you're here for me. You too, you must continue with your paintings.""
- `passage[29].fr` "En rentrant chez moi, j'ai pensé à notre conversation. Je regrette que j'aie perdu espoir avant. Mais maintenant, je suis contente que Marc soit mon ami." → "En rentrant chez moi, j'ai pensé à notre conversation. Avant, j'avais perdu espoir, et je le regrette. Mais maintenant, je suis contente que Marc soit mon ami."
- `passage[29].en` "Walking home, I thought about our conversation. I regret that I lost hope before. But now, I'm glad Marc is my friend." → "Walking home, I thought about our conversation. Before, I had lost hope, and I regret it. But now, I'm glad Marc is my friend."
- `passage[34].fr` "Comme Marc a dit: il faut essayer! Si on ne fait rien, on ne saura jamais. Et moi, je veux savoir si mes rêves peuvent devenir réalité." → "Comme Marc l'a dit: il faut essayer! Si on ne fait rien, on ne saura jamais. Et moi, je veux savoir si mes rêves peuvent devenir réalité."
- `glossary` "(none)" → "["fr":"assise","en":"sitting (feminine)","fr":"savait","en":"knew","fr":"saura","en":"will know","fr":"achèterait","en":"would buy"]"
- `glosses` "(none)" → "["fr":"assise","en":"sitting","note":"past participle of asseoir","fr":"savait","en":"knew","note":"imparfait of savoir","fr":"saura","en":"will know","note":"future of savoir"]"
- `items[3].question` "Si Sophie était riche, qu'est-ce qu'elle achèterait?" → "Si tu étais Sophie, qu'est-ce que tu achèterais ?"
- `items[3].cue` "If Sophie were rich, what would she buy?" → "If you were Sophie, what would you buy?"
- `items[7].answer` "aider l'un l'autre" → "s'aider"
- `items[7].accept` "["l'un l'autre","s'aider","aider","ils ont décidé de s'aider"]" → "["s'aider l'un l'autre","se aider","l'un l'autre","aider","nous aider","de s'aider","ils ont décidé de s'aider","ils ont décidé de s'aider l'un l'autre"]"
- `items[7].hint` "Aider..." → "Ils ont décidé de s'..."

**2024-02-05-unit-10-practice**

- `title` "Unit 10 Practice - Fill in the Blanks" → "Mastery & Nuance Practice - Fill in the Blanks"
- `description` "Complete sentences using Unit 10's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!" → "Complete sentences using this unit's B2 level phrases: necessity, wishes, emotions, hypotheticals, and more!"

**2024-02-04-unit-10-exam**

- `description` "Test everything from Unit 10! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions." → "Test everything from this unit! Master B2 level phrases: necessity (il faut que), wishes (je veux que), emotions (je suis content que), hypotheticals (si j'étais...), regrets (si j'avais su...), and more advanced expressions."
- `items[37].instruction` "From Reading 10: What did Sophie want about her life?" → "From the reading Mes Rêves et Mes Espoirs: What did Sophie want about her life?"
- `items[38].instruction` "From Reading 10: What had Sophie already done before talking to Marc?" → "From the reading Mes Rêves et Mes Espoirs: What had Sophie already done before talking to Marc?"

**2024-02-08-age-personal-info**

- `description` "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information. Finally complete what should have been in Unit 1!" → "Essential life skills! Learn to say your age (J'ai 25 ans), ask others' ages (Quel âge avez-vous?), and share personal information."

**2024-02-10-donner**

- `concepts` "["id":"c-donner-to-give","term":"donner = to give","definition":"One of the most common verbs - used for gifts, help, information, objects","example":"Je donne un cadeau (I give a gift), Tu me donnes ton numéro? (Do you give me your number?)","id":"c-regular-er-conjugation","term":"Regular -ER Conjugation","definition":"Follows standard -ER pattern like parler, manger","example":"je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","id":"c-direct-and-indirect-objects","term":"Direct and Indirect Objects","definition":"Give WHAT (direct) to WHOM (indirect) - donner quelque chose à quelqu'un","example":"Je donne le livre à Marie (I give the book to Marie) → Je lui donne le livre (I give it to her)","id":"c-common-expressions","term":"Common Expressions","definition":"Many fixed phrases use donner in French","example":"donner l'heure (tell the time), donner raison (agree with someone), donner rendez-vous (make an appointment)"]" → "["id":"c-donner-to-give","term":"donner = to give","definition":"One of the most common verbs - used for gifts, help, information, objects","example":"Je donne un livre (I give a book), Tu me donnes ton numéro? (Do you give me your number?)","id":"c-regular-er-conjugation","term":"Regular -ER Conjugation","definition":"Follows standard -ER pattern like parler, manger","example":"je donne, tu donnes, il donne, nous donnons, vous donnez, ils donnent","id":"c-direct-and-indirect-objects","term":"Direct and Indirect Objects","definition":"Give WHAT (direct) to WHOM (indirect) - donner quelque chose à quelqu'un","example":"Je donne le livre à Marie (I give the book to Marie) → Je lui donne le livre (I give it to her)","id":"c-two-pronouns","term":"Two pronouns: je te le donne","definition":"When the thing you give becomes le, la or les, it goes after me, te, nous or vous, and both stay before the verb","example":"Je te donne le livre (I give you the book) → Je te le donne (I give it to you). Tu me donnes ton numéro ? (Do you give me your number?) → Tu me le donnes ? (Do you give it to me?)","id":"c-common-expressions","term":"Common Expressions","definition":"Many fixed phrases use donner in French","example":"donner l'heure (tell the time), donner raison (agree with someone), donner rendez-vous (make an appointment)"]"

**2024-05-15-daily-actions-1**

- `concepts[3].example` "Je vis à Paris, je travaille au centre-ville, et je dors bien (I live in Paris, work downtown, and sleep well)" → "Je vis à Paris, je travaille près d'ici, et je dors bien (I live in Paris, work near here, and sleep well)"

**2024-02-13-search-and-find**

- `concepts[0].example` "Je cherche mes clés (I'm looking for my keys), Tu cherches quoi? (What are you looking for?)" → "Je cherche mes clés (I'm looking for my keys), Tu cherches quoi? (What are you looking for?), C'est dur de trouver mes clés ! (It's hard to find my keys!)"

**2024-02-14-social-situations**

- `concepts[0].example` "J'attends le bus (I'm waiting for the bus), Tu attends quelqu'un? (Are you waiting for someone?)" → "J'attends le bus (I'm waiting for the bus), Tu attends quelqu'un? (Are you waiting for someone?), J'attends Marie et j'écoute de la musique (I'm waiting for Marie and listening to music)"

**2024-02-09-directions-navigation**

- `vocabulary[9].note` "complete direction instruction" → "a full instruction, ready to say"
- `vocabulary[10].note` "complete direction instruction" → "a full instruction, ready to say"
- `concepts[3].example` "Allez tout droit, puis tournez à gauche (Go straight, then turn left)" → "Allez tout droit jusqu'à la gare, puis tournez à gauche (Go straight as far as the station, then turn left)"

**2024-02-12-reading-11**

- `title` "Reading 11 - La France Moderne" → "Reading - La France Moderne"
- `passage[1].fr` "Paris, sa capitale, compte plus de deux millions de personnes. Cette ville magnifique attire des millions de visiteurs chaque année. Ils viennent admirer ses monuments célèbres comme la Tour Eiffel, Notre-Dame, le Louvre, et l'Arc de Triomphe sur les Champs-Élysées. Beaucoup visitent aussi le château de Versailles. Les touristes cherchent souvent des directions pour trouver ces lieux historiques." → "Paris, sa capitale, a plus de deux millions d'habitants. Cette ville magnifique attire des millions de visiteurs chaque année. Ils viennent admirer ses monuments célèbres comme la Tour Eiffel, Notre-Dame, le Louvre, et l'Arc de Triomphe sur les Champs-Élysées. Beaucoup visitent aussi le château de Versailles. Les touristes cherchent souvent des directions pour trouver ces lieux historiques."
- `passage[1].en` "Paris, its capital, has more than two million people. This magnificent city attracts millions of visitors each year. They come to admire its famous monuments like the Eiffel Tower, Notre-Dame, the Louvre, and the Arc de Triomphe on the Champs-Élysées. Many also visit the Palace of Versailles. Tourists often look for directions to find these historic places." → "Paris, its capital, has more than two million inhabitants. This magnificent city attracts millions of visitors each year. They come to admire its famous monuments like the Eiffel Tower, Notre-Dame, the Louvre, and the Arc de Triomphe on the Champs-Élysées. Many also visit the Palace of Versailles. Tourists often look for directions to find these historic places."
- `passage[9].fr` "Un train rapide traverse la campagne vers le sud." → "Un train rapide part vers le sud."
- `passage[9].en` "A fast train crosses the countryside toward the south." → "A fast train leaves for the south."
- `passage[11].fr` "L'été à Nice, au bord de la Méditerranée." → "L'été à Nice, près de la mer."
- `passage[11].en` "Summer in Nice, on the Mediterranean." → "Summer in Nice, by the sea."
- `passage[14].fr` "À vélo et en tram, la France pense à l'avenir." → "Les jeunes pensent à l'avenir de la France."
- `passage[14].en` "By bike and by tram, France thinks about the future." → "Young people think about the future of France."
- `glossary` "(none)" → "["fr":"attire","en":"attracts","fr":"lieux","en":"places","fr":"étrangères","en":"foreign","fr":"peintres","en":"painters","fr":"mémoire","en":"memory","fr":"également","en":"also, as well","fr":"inoubliables","en":"unforgettable","fr":"plusieurs","en":"several","fr":"françaises","en":"French","fr":"au-delà","en":"beyond"]"
- `glosses` "(none)" → "["fr":"étrangères","en":"foreign","note":"feminine plural of étranger","fr":"françaises","en":"French","note":"feminine plural of français"]"
- `items[4].question` "Dans quels secteurs travaillent les Français?" → "Où travaillent les Français?"
- `items[4].cue` "In which sectors do French people work?" → "Where do French people work?"
- `items[4].accept` "["agriculture","les services","l'industrie"]" → "["agriculture","les services","l'industrie","dans les services","dans l'industrie","dans l'agriculture"]"

**2024-02-16-unit-11-practice**

- `title` "Unit 11 Practice - Fill in the Blanks" → "Daily Essentials Practice - Fill in the Blanks"
- `description` "Complete sentences using Unit 11's essential vocabulary: age expressions, missing top 100 verbs, and directions!" → "Complete sentences using this unit's essential vocabulary: age expressions, missing top 100 verbs, and directions!"

**2024-02-15-unit-11-exam**

- `description` "Final test for Unit 11! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!" → "Final test for this unit! Demonstrate mastery of age expressions, all missing top 100 verbs (give, sleep, work, live, search, find, listen, watch, wait, arrive, stay), directions, and practical communication. Achieve complete French foundation!"
- `items[42].situation` "From Reading 11: France's population" → "From the reading La France Moderne: France's population"
- `items[43].situation` "From Reading 11: What tourists look for" → "From the reading La France Moderne: What tourists look for"
- `items[44].situation` "From Reading 11: Where artists live" → "From the reading La France Moderne: Where artists live"
- `items[45].situation` "From Reading 11: Modern France combines what?" → "From the reading La France Moderne: Modern France combines what?"

**2024-03-15-nature-animals**

- `vocabulary[0].note` "masculine - silent 's' in oiseau" → "masculine: the s sounds like z"
- `vocabulary[14].note` "masculine - for 'souffler' (to blow)" → "masculine: le vent"
- `vocabulary[15].note` "feminine - for 'pleuvoir' (to rain)" → "feminine: la pluie"
- `concepts[0].definition` "These animals are perfect examples for asking 'how does X do Y?' questions" → "The next lessons ask how and why these animals move. Start with what each one is like."
- `concepts[0].example` "Comment est-ce qu'une tortue nage? Comment est-ce qu'un écureuil saute?" → "La tortue est lente. (The turtle is slow.) L'écureuil est rapide. (The squirrel is fast.)"
- `concepts[2].term` "Nature Elements" → "Nature words"
- `concepts[2].example` "le vent (wind), la pluie (rain), une plante (plant), un arbre (tree)" → "le vent (wind), la pluie (rain), une plante (plant), un arbre (tree); Il y a des millions d'oiseaux (There are millions of birds)"
- `concepts[4].definition` "This vocabulary enables curiosity questions in future modules" → "These words come back in the question lessons that follow."
- `concepts[4].example` "After learning this: you can ask 'Pourquoi est-ce que les oiseaux volent?' (Why do birds fly?)" → "Pourquoi est-ce que la tortue est lente ? (Why is the turtle slow?)"
- `items[0].type` "translate" → "gapfill"
- `items[0].text` "(none)" → ""Je vois ___ : il est petit et bleu.""
- `items[0].blanks` "(none)" → "["answer":"un oiseau"]"
- `items[0].gloss` "(none)" → ""I see a bird: it is small and blue.""
- `items[0].mistakes[0].feedback` "Oiseau is masculine. Use 'un oiseau' (the 's' is silent!)" → "Oiseau is masculine: un oiseau."
- `items[0].mistakes[1].feedback` "Careful with spelling: oiseau (the 's' is silent)" → "Check the spelling: oiseau."
- `items[0].prompt` ""a bird"" → "(removed)"
- `items[0].answer` ""un oiseau"" → "(removed)"
- `items[0].hint` ""masculine article + oiseau"" → "(removed)"
- `items[1].type` "translate" → "gapfill"
- `items[1].text` "(none)" → ""C'est ___ : elle est très lente.""
- `items[1].blanks` "(none)" → "["answer":"une tortue"]"
- `items[1].gloss` "(none)" → ""It's a turtle: it is very slow.""
- `items[1].prompt` ""a turtle"" → "(removed)"
- `items[1].answer` ""une tortue"" → "(removed)"
- `items[1].hint` ""feminine article + tortue"" → "(removed)"
- `items[2].type` "translate" → "gapfill"
- `items[2].text` "(none)" → ""Il y a ___ dans l'arbre : il est petit et rapide.""
- `items[2].blanks` "(none)" → "["answer":"un écureuil","accept":["un ecureuil"]]"
- `items[2].gloss` "(none)" → ""There is a squirrel in the tree: it is small and fast.""
- `items[2].prompt` ""a squirrel"" → "(removed)"
- `items[2].answer` ""un écureuil"" → "(removed)"
- `items[2].accept` "["un ecureuil"]" → "(removed)"
- `items[2].hint` ""masculine article + écureuil"" → "(removed)"
- `items[3].type` "translate" → "gapfill"
- `items[3].text` "(none)" → ""Nous avons ___ et un chat à la maison.""
- `items[3].blanks` "(none)" → "["answer":"un lapin"]"
- `items[3].gloss` "(none)" → ""We have a rabbit and a cat at home.""
- `items[3].mistakes` "(none)" → "["answer":"une lapin","feedback":"lapin is masculine: un lapin."]"
- `items[3].prompt` ""a rabbit"" → "(removed)"
- `items[3].answer` ""un lapin"" → "(removed)"
- `items[3].hint` ""masculine article + lapin"" → "(removed)"
- `items[4].type` "translate" → "gapfill"
- `items[4].text` "(none)" → ""Le chat regarde ___.""
- `items[4].blanks` "(none)" → "["answer":"un papillon"]"
- `items[4].gloss` "(none)" → ""The cat is watching a butterfly.""
- `items[4].prompt` ""a butterfly"" → "(removed)"
- `items[4].answer` ""un papillon"" → "(removed)"
- `items[4].hint` ""masculine article + papillon"" → "(removed)"
- `items[5].type` "translate" → "gapfill"
- `items[5].text` "(none)" → ""Il y a ___ dans la fleur.""
- `items[5].blanks` "(none)" → "["answer":"une abeille"]"
- `items[5].gloss` "(none)" → ""There is a bee in the flower.""
- `items[5].mistakes` "(none)" → "["answer":"un abeille","feedback":"abeille is feminine: une abeille."]"
- `items[5].prompt` ""a bee"" → "(removed)"
- `items[5].answer` ""une abeille"" → "(removed)"
- `items[5].hint` ""feminine article + abeille"" → "(removed)"
- `items[6].type` "translate" → "gapfill"
- `items[6].text` "(none)" → ""Je donne ___ à ma mère.""
- `items[6].blanks` "(none)" → "["answer":"une plante"]"
- `items[6].gloss` "(none)" → ""I'm giving my mother a plant.""
- `items[6].prompt` ""a plant"" → "(removed)"
- `items[6].answer` ""une plante"" → "(removed)"
- `items[6].hint` ""feminine article + plante"" → "(removed)"
- `items[7].type` "translate" → "gapfill"
- `items[7].text` "(none)" → ""J'aime le soleil, mais je n'aime pas ___.""
- `items[7].blanks` "(none)" → "["answer":"le vent"]"
- `items[7].gloss` "(none)" → ""I like the sun, but I don't like the wind.""
- `items[7].prompt` ""the wind"" → "(removed)"
- `items[7].answer` ""le vent"" → "(removed)"
- `items[7].hint` ""masculine article + vent"" → "(removed)"
- `items[8].type` "translate" → "gapfill"
- `items[8].text` "(none)" → ""Les plantes aiment ___.""
- `items[8].blanks` "(none)" → "["answer":"la pluie"]"
- `items[8].gloss` "(none)" → ""Plants like the rain.""
- `items[8].prompt` ""the rain"" → "(removed)"
- `items[8].answer` ""la pluie"" → "(removed)"
- `items[8].hint` ""feminine article + pluie"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Say the opposite.""
- `items[9].shown` "(none)" → ""La tortue est rapide.""
- `items[9].prompt` ""The turtle is slow"" → "(removed)"
- `items[9].hint` ""la tortue + est + lente (feminine)"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Say the opposite.""
- `items[10].shown` "(none)" → ""L'écureuil est lent.""
- `items[10].prompt` ""The squirrel is fast"" → "(removed)"
- `items[10].hint` ""l'écureuil + est + rapide"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Say the opposite.""
- `items[11].shown` "(none)" → ""L'abeille est grande.""
- `items[11].mistakes` "(none)" → "["answer":"l'abeille est petit","feedback":"abeille is feminine, so the adjective adds -e: petite."]"
- `items[11].prompt` ""The bee is small"" → "(removed)"
- `items[11].hint` ""l'abeille + est + petite (feminine)"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Put the color in the right place.""
- `items[12].shown` "(none)" → ""un oiseau + bleu""
- `items[12].mistakes` "(none)" → "["answer":"un bleu oiseau","feedback":"Colors come after the noun: un oiseau bleu."]"
- `items[12].prompt` ""a blue bird"" → "(removed)"
- `items[12].hint` ""un oiseau + bleu"" → "(removed)"
- `items[13].type` "translate" → "gapfill"
- `items[13].text` "(none)" → ""Sur la fleur, il y a ___.""
- `items[13].blanks` "(none)" → "["answer":"un papillon jaune"]"
- `items[13].gloss` "(none)" → ""On the flower, there is a yellow butterfly.""
- `items[13].mistakes` "(none)" → "["answer":"un jaune papillon","feedback":"Colors come after the noun: un papillon jaune."]"
- `items[13].prompt` ""a yellow butterfly"" → "(removed)"
- `items[13].answer` ""un papillon jaune"" → "(removed)"
- `items[13].hint` ""un papillon + jaune"" → "(removed)"
- `items[14].type` "translate" → "respond"
- `items[14].situation` "(none)" → ""You are in the garden with a friend. Tell them you see a bird.""
- `items[14].accept` "(none)" → "["regarde, je vois un oiseau"]"
- `items[14].prompt` ""I see a bird"" → "(removed)"
- `items[14].hint` ""je vois + un oiseau"" → "(removed)"

**2024-03-16-movement-verbs**

- `concepts` "["id":"c-six-essential-movement-verbs","term":"Six Essential Movement Verbs","definition":"These verbs describe all basic types of movement in nature and daily life","example":"nager (swim), sauter (jump), voler (fly), courir (run), marcher (walk), grimper (climb)","id":"c-regular-er-verbs-pattern","term":"Regular -ER Verbs Pattern","definition":"Most movement verbs follow the regular -ER pattern you already know","example":"nager: je nage, tu nages, il nage, nous nageons, vous nagez, ils nagent","id":"c-courir-irregular-ir-verb","term":"courir - Irregular -IR Verb","definition":"Courir (to run) is irregular but common - memorize the pattern","example":"je cours, tu cours, il court, nous courons, vous courez, ils courent","id":"c-animals-movement","term":"Animals + Movement","definition":"Combine with animal vocabulary to describe how animals move","example":"La tortue nage (the turtle swims), L'oiseau vole (the bird flies), L'écureuil saute (the squirrel jumps)","id":"c-works-in-all-tenses","term":"Works in All Tenses","definition":"These verbs work in all tenses you've learned - present, past, imparfait","example":"Je nage (I swim), J'ai nagé (I swam), Je nageais (I was swimming)"]" → "["id":"c-six-essential-movement-verbs","term":"Six Essential Movement Verbs","definition":"These verbs describe all basic types of movement in nature and daily life","example":"nager (swim), sauter (jump), voler (fly), courir (run), marcher (walk), grimper (climb)","id":"c-regular-er-verbs-pattern","term":"Regular -ER Verbs Pattern","definition":"Most movement verbs follow the regular -ER pattern you already know","example":"nager: je nage, tu nages, il nage, nous nageons, vous nagez, ils nagent","id":"c-courir-irregular-ir-verb","term":"courir - Irregular -IR Verb","definition":"Courir (to run) is irregular but common - memorize the pattern","example":"je cours, tu cours, il court, nous courons, vous courez, ils courent; Je cours jusqu'à la gare (I run as far as the station)","id":"c-animals-movement","term":"Animals + Movement","definition":"Combine with animal vocabulary to describe how animals move","example":"La tortue nage (the turtle swims), Les oiseaux volent (birds fly), L'écureuil saute (the squirrel jumps)","id":"c-works-in-all-tenses","term":"Works in All Tenses","definition":"These verbs work in every tense you know. The table below shows the present, the passé composé and the imparfait.","example":"Je nage (I swim), J'ai nagé (I swam), Je nageais (I was swimming, I used to swim)","id":"c-savoir-infinitive","term":"savoir + infinitive: know how to","definition":"Use savoir with an infinitive for a skill someone has learned, and pouvoir for whether they are able to at that moment.","example":"Je sais nager. (I can swim, I know how.) Les jeunes oiseaux ne savent pas encore voler. (Baby birds can't fly yet.)"]"
- `tables` "(none)" → "["id":"t-three-tenses","title":"nager and courir in the present and the past","rows":["fr":"je nage","en":"I swim","note":"present","fr":"j'ai nagé","en":"I swam","note":"passé composé, with avoir","fr":"je nageais","en":"I was swimming, I used to swim","note":"imparfait: nage- keeps its e before -ais","fr":"il court","en":"he runs","note":"present","fr":"il a couru","en":"he ran","note":"passé composé, with avoir","fr":"il courait","en":"he was running, he used to run","note":"imparfait"]]"
- `items[0].type` "translate" → "gapfill"
- `items[0].text` "(none)" → ""Le matin, je ___ avec mon frère.""
- `items[0].blanks` "(none)" → "["answer":"nage"]"
- `items[0].gloss` "(none)" → ""In the morning, I swim with my brother.""
- `items[0].mistakes` "(none)" → "["answer":"nages","feedback":"With je, nager ends in -e: je nage."]"
- `items[0].prompt` ""I swim"" → "(removed)"
- `items[0].answer` ""je nage"" → "(removed)"
- `items[0].hint` ""nager for je"" → "(removed)"
- `items[1].type` "respond" → "gapfill"
- `items[1].text` "(none)" → ""Tu ___ très bien !""
- `items[1].blanks` "(none)" → "["answer":"nages"]"
- `items[1].gloss` "(none)" → ""You swim very well!""
- `items[1].situation` ""you swim (informal)"" → "(removed)"
- `items[1].answer` ""tu nages"" → "(removed)"
- `items[1].hint` ""nager for tu"" → "(removed)"
- `items[2].type` "translate" → "gapfill"
- `items[2].text` "(none)" → ""Nous ___ tous les matins.""
- `items[2].blanks` "(none)" → "["answer":"nageons"]"
- `items[2].gloss` "(none)" → ""We swim every morning.""
- `items[2].mistakes` "(none)" → "["answer":"nagons","feedback":"Keep the e before -ons so the g stays soft: nageons."]"
- `items[2].prompt` ""we swim"" → "(removed)"
- `items[2].answer` ""nous nageons"" → "(removed)"
- `items[2].hint` ""nager for nous - careful with spelling!"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Change the subject to je.""
- `items[3].shown` "(none)" → ""L'écureuil saute.""
- `items[3].prompt` ""I jump"" → "(removed)"
- `items[3].hint` ""sauter for je"" → "(removed)"
- `items[4].type` "translate" → "gapfill"
- `items[4].text` "(none)" → ""Les lapins ___ dans le jardin.""
- `items[4].blanks` "(none)" → "["answer":"sautent"]"
- `items[4].gloss` "(none)" → ""The rabbits are jumping in the garden.""
- `items[4].prompt` ""they jump"" → "(removed)"
- `items[4].answer` ""ils sautent"" → "(removed)"
- `items[4].hint` ""sauter for ils"" → "(removed)"
- `items[5].type` "translate" → "gapfill"
- `items[5].text` "(none)" → ""Le papillon ___ de fleur en fleur.""
- `items[5].blanks` "(none)" → "["answer":"vole"]"
- `items[5].gloss` "(none)" → ""The butterfly flies from flower to flower.""
- `items[5].prompt` ""he flies"" → "(removed)"
- `items[5].answer` ""il vole"" → "(removed)"
- `items[5].hint` ""voler for il"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Change the subject to nous.""
- `items[6].shown` "(none)" → ""Les oiseaux volent.""
- `items[6].mistakes` "(none)" → "["answer":"nous volent","feedback":"With nous, the verb usually ends in -ons: nous volons."]"
- `items[6].prompt` ""we fly"" → "(removed)"
- `items[6].hint` ""voler for nous"" → "(removed)"
- `items[7].type` "translate" → "gapfill"
- `items[7].text` "(none)" → ""Je ___ tous les jours dans le parc.""
- `items[7].blanks` "(none)" → "["answer":"cours"]"
- `items[7].gloss` "(none)" → ""I run every day in the park.""
- `items[7].mistakes` "(none)" → "["answer":"court","feedback":"With je, write cours. court goes with il and elle."]"
- `items[7].prompt` ""I run"" → "(removed)"
- `items[7].answer` ""je cours"" → "(removed)"
- `items[7].hint` ""courir for je - irregular!"" → "(removed)"
- `items[8].type` "respond" → "transform"
- `items[8].instruction` "(none)" → ""Change the subject to tu.""
- `items[8].shown` "(none)" → ""Il court.""
- `items[8].mistakes` "(none)" → "["answer":"tu court","feedback":"With tu, write cours, with an s."]"
- `items[8].situation` ""you run (informal)"" → "(removed)"
- `items[8].hint` ""courir for tu - same as je"" → "(removed)"
- `items[9].type` "translate" → "gapfill"
- `items[9].text` "(none)" → ""Il ___ plus vite que moi.""
- `items[9].blanks` "(none)" → "["answer":"court"]"
- `items[9].gloss` "(none)" → ""He runs faster than me.""
- `items[9].mistakes` "(none)" → "["answer":"cours","feedback":"With il, write court, with a t."]"
- `items[9].prompt` ""he runs"" → "(removed)"
- `items[9].answer` ""il court"" → "(removed)"
- `items[9].hint` ""courir for il - drop the -s"" → "(removed)"
- `items[10].type` "translate" → "gapfill"
- `items[10].text` "(none)" → ""La tortue est lente : elle ___ lentement.""
- `items[10].blanks` "(none)" → "["answer":"marche"]"
- `items[10].gloss` "(none)" → ""The turtle is slow: it walks slowly.""
- `items[10].prompt` ""I walk"" → "(removed)"
- `items[10].answer` ""je marche"" → "(removed)"
- `items[10].hint` ""marcher for je"" → "(removed)"
- `items[11].type` "translate" → "gapfill"
- `items[11].text` "(none)" → ""L'écureuil ___ dans l'arbre.""
- `items[11].blanks` "(none)" → "["answer":"grimpe"]"
- `items[11].gloss` "(none)" → ""The squirrel climbs up the tree.""
- `items[11].prompt` ""she climbs"" → "(removed)"
- `items[11].answer` ""elle grimpe"" → "(removed)"
- `items[11].hint` ""grimper for elle"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Make it singular.""
- `items[12].shown` "(none)" → ""Les tortues nagent.""
- `items[12].prompt` ""The turtle swims"" → "(removed)"
- `items[12].hint` ""la tortue + nage"" → "(removed)"
- `items[13].type` "translate" → "transform"
- `items[13].instruction` "(none)" → ""Make it singular.""
- `items[13].shown` "(none)" → ""Les oiseaux volent.""
- `items[13].mistakes` "(none)" → "["answer":"l'oiseau volent","feedback":"With one bird, the verb loses -nt: l'oiseau vole."]"
- `items[13].prompt` ""The bird flies"" → "(removed)"
- `items[13].hint` ""l'oiseau + vole"" → "(removed)"
- `items[14].type` "translate" → "respond"
- `items[14].situation` "(none)" → ""Your friend asks: Qu'est-ce que l'écureuil fait ? Say that the squirrel is jumping.""
- `items[14].accept` "["l'ecureuil saute"]" → "["l'ecureuil saute","il saute","il est en train de sauter","l'écureuil est en train de sauter"]"
- `items[14].prompt` ""The squirrel jumps"" → "(removed)"
- `items[14].hint` ""l'écureuil + saute"" → "(removed)"
- `items[15].type` "translate" → "transform"
- `items[15].instruction` "(none)" → ""Change the subject to le lapin.""
- `items[15].shown` "(none)" → ""Je saute.""
- `items[15].prompt` ""The rabbit jumps"" → "(removed)"
- `items[15].hint` ""le lapin + saute"" → "(removed)"
- `items[16].type` "translate" → "respond"
- `items[16].situation` "(none)" → ""Your friend is running ahead of you in the park. Tell them they run fast.""
- `items[16].accept[0]` "tu cours vite!" → "tu cours vite !"
- `items[16].prompt` ""You run fast!"" → "(removed)"
- `items[16].hint` ""tu cours + vite"" → "(removed)"
- `items[17].type` "translate" → "respond"
- `items[17].situation` "(none)" → ""Your friend asks: Qu'est-ce que tu fais en été ? Say that you swim in the sea.""
- `items[17].accept` "(none)" → "["en été, je nage dans la mer","l'été, je nage dans la mer"]"
- `items[17].prompt` ""I swim in the sea"" → "(removed)"
- `items[17].hint` ""je nage + dans la mer"" → "(removed)"
- `items[18].type` "respond" → "transform"
- `items[18].instruction` "(none)" → ""Put it in the passé composé.""
- `items[18].shown` "(none)" → ""Je nage.""
- `items[18].mistakes` "(none)" → "["answer":"je suis nagé","feedback":"nager takes avoir in the passé composé: j'ai nagé."]"
- `items[18].situation` ""Say 'I swam' (passé composé)"" → "(removed)"
- `items[18].cue` ""I swam"" → "(removed)"
- `items[18].hint` ""j'ai + past participle of nager"" → "(removed)"

**2024-03-17-natural-phenomena**

- `vocabulary[33].note` "⭐⭐⭐ CRITICAL - irregular like prendre - CAUSATIVE!" → "a regular -re verb, like attendre: nous rendons, ils rendent"
- `vocabulary[44].note` "⭐ QUESTION PATTERN with causative!" → "a preview of the next lesson, which teaches this question"
- `concepts` "["id":"c-natural-process-verbs","term":"Natural Process Verbs","definition":"Verbs that describe what happens in nature - shining, growing, raining","example":"Le soleil brille (the sun shines), Les plantes poussent (plants grow), Le vent souffle (the wind blows)","id":"c-pleuvoir-impersonal-verb","term":"pleuvoir - Impersonal Verb","definition":"Pleuvoir (to rain) only uses 'il' form - il pleut (it rains)","example":"il pleut (it rains), il a plu (it rained), il pleuvait (it was raining)","id":"c-rendre-critical-causative-verb","term":"rendre - CRITICAL Causative Verb!","definition":"Rendre means 'to make/render' - conjugates like prendre. Use with adjectives to show cause!","example":"Le soleil rend l'herbe verte (the sun makes grass green), Le froid rend l'eau glacée (cold makes water frozen)","id":"c-causative-pattern-rendre-adjective","term":"Causative Pattern: rendre + adjective","definition":"Pattern: [subject] + rendre + [object] + [adjective] = subject makes object [adjective]","example":"Qu'est-ce qui rend le ciel bleu? (What makes the sky blue?) → La lumière rend le ciel bleu (Light makes the sky blue)","id":"c-setting-up-question-patterns","term":"Setting Up Question Patterns","definition":"These verbs enable sophisticated 'why' and 'what makes' questions","example":"Pourquoi est-ce que le soleil brille? Qu'est-ce qui rend l'herbe verte? Comment est-ce que les plantes poussent?"]" → "["id":"c-natural-process-verbs","term":"Natural Process Verbs","definition":"Verbs that describe what happens in nature - shining, growing, raining","example":"Le soleil brille (the sun shines), Les plantes poussent (plants grow), Le vent souffle (the wind blows)","id":"c-pleuvoir-impersonal-verb","term":"pleuvoir - Impersonal Verb","definition":"Pleuvoir (to rain) only uses 'il' form - il pleut (it rains)","example":"il pleut (it rains), il a plu (it rained), il pleuvait (it was raining)","id":"c-rendre-critical-causative-verb","term":"rendre - CRITICAL Causative Verb!","definition":"rendre with an adjective means to make something that way. It is a regular -re verb, like attendre: nous rendons, ils rendent.","example":"Le soleil rend l'herbe verte (the sun makes grass green), Le froid rend l'eau glacée (cold makes water frozen)","id":"c-causative-pattern-rendre-adjective","term":"Causative Pattern: rendre + adjective","definition":"Pattern: [subject] + rendre + [object] + [adjective] = subject makes object [adjective]","example":"La pluie rend la terre humide (rain makes the earth wet), Le soleil rend l'herbe verte (the sun makes grass green)","id":"c-setting-up-question-patterns","term":"Setting Up Question Patterns","definition":"The next lessons use these verbs to ask why and how.","example":"Pourquoi est-ce que le soleil brille ? Comment est-ce que les plantes poussent ?","id":"c-ne-plus-no-longer","term":"ne … plus: no longer","definition":"Put ne before the verb and plus after it to say that something has stopped. It works like ne … pas.","example":"Il ne pleut plus. (It isn't raining any more.) Le vent ne souffle plus. (The wind isn't blowing any more.)"]"
- `items[0].type` "translate" → "gapfill"
- `items[0].text` "(none)" → ""Il fait beau : le soleil ___.""
- `items[0].blanks` "(none)" → "["answer":"brille"]"
- `items[0].gloss` "(none)" → ""The weather is nice: the sun is shining.""
- `items[0].prompt` ""he shines"" → "(removed)"
- `items[0].answer` ""il brille"" → "(removed)"
- `items[0].hint` ""briller for il"" → "(removed)"
- `items[1].type` "translate" → "respond"
- `items[1].situation` "(none)" → ""Your friend asks: Il fait beau aujourd'hui ? Say yes, the sun is shining.""
- `items[1].accept` "(none)" → "["oui, le soleil brille","oui, il fait beau, le soleil brille"]"
- `items[1].prompt` ""The sun shines"" → "(removed)"
- `items[1].hint` ""le soleil + brille"" → "(removed)"
- `items[2].type` "translate" → "gapfill"
- `items[2].text` "(none)" → ""Au printemps, les fleurs ___.""
- `items[2].blanks` "(none)" → "["answer":"poussent"]"
- `items[2].gloss` "(none)" → ""In spring, flowers grow.""
- `items[2].prompt` ""they grow"" → "(removed)"
- `items[2].answer` ""ils poussent"" → "(removed)"
- `items[2].hint` ""pousser for ils"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Make it plural.""
- `items[3].shown` "(none)" → ""La plante pousse.""
- `items[3].prompt` ""Plants grow"" → "(removed)"
- `items[3].hint` ""les plantes + poussent"" → "(removed)"
- `items[4].type` "translate" → "respond"
- `items[4].situation` "(none)" → ""Your friend asks: Quand est-ce que les plantes poussent ? Answer: in spring.""
- `items[4].accept` "(none)" → "["au printemps","elles poussent au printemps"]"
- `items[4].prompt` ""Plants grow in spring"" → "(removed)"
- `items[4].hint` ""les plantes poussent + au printemps"" → "(removed)"
- `items[5].situation` "Say 'It rains' / 'It's raining'" → "You look out of the window and see rain. Tell your friend it is raining."
- `items[5].cue` ""It rains"" → "(removed)"
- `items[5].hint` ""impersonal verb - only il pleut"" → "(removed)"
- `items[6].type` "respond" → "transform"
- `items[6].instruction` "(none)" → ""Put it in the passé composé.""
- `items[6].shown` "(none)" → ""Il pleut.""
- `items[6].mistakes` "(none)" → "["answer":"il a pleuvu","feedback":"The past participle of pleuvoir is irregular: il a plu."]"
- `items[6].situation` ""Say 'It rained' (passé composé)"" → "(removed)"
- `items[6].cue` ""It rained"" → "(removed)"
- `items[6].hint` ""il + a + plu (irregular past participle!)"" → "(removed)"
- `items[7].type` "translate" → "gapfill"
- `items[7].text` "(none)" → ""Il fait froid et le vent ___.""
- `items[7].blanks` "(none)" → "["answer":"souffle"]"
- `items[7].gloss` "(none)" → ""It is cold and the wind is blowing.""
- `items[7].prompt` ""The wind blows"" → "(removed)"
- `items[7].answer` ""le vent souffle"" → "(removed)"
- `items[7].hint` ""le vent + souffle"" → "(removed)"
- `items[8].type` "translate" → "gapfill"
- `items[8].text` "(none)" → ""Je ___ ma mère heureuse.""
- `items[8].blanks` "(none)" → "["answer":"rends"]"
- `items[8].gloss` "(none)" → ""I make my mother happy.""
- `items[8].mistakes` "(none)" → "["answer":"rend","feedback":"With je, rendre ends in -s: je rends."]"
- `items[8].prompt` ""I make / I render"" → "(removed)"
- `items[8].answer` ""je rends"" → "(removed)"
- `items[8].hint` ""rendre for je - like prendre!"" → "(removed)"
- `items[9].type` "translate" → "gapfill"
- `items[9].text` "(none)" → ""Le soleil me ___ heureux.""
- `items[9].blanks` "(none)" → "["answer":"rend"]"
- `items[9].gloss` "(none)" → ""The sun makes me happy.""
- `items[9].prompt` ""it makes / renders"" → "(removed)"
- `items[9].answer` ""il rend"" → "(removed)"
- `items[9].hint` ""rendre for il"" → "(removed)"
- `items[10].type` "translate" → "gapfill"
- `items[10].text` "(none)" → ""Les vacances me ___ heureux.""
- `items[10].blanks` "(none)" → "["answer":"rendent"]"
- `items[10].gloss` "(none)" → ""Holidays make me happy.""
- `items[10].prompt` ""they make / render"" → "(removed)"
- `items[10].answer` ""ils rendent"" → "(removed)"
- `items[10].hint` ""rendre for ils"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Say it with rendre.""
- `items[11].shown` "(none)" → ""le soleil / l'herbe / verte""
- `items[11].prompt` ""The sun makes grass green"" → "(removed)"
- `items[11].hint` ""le soleil + rend + l'herbe + verte"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Say it with rendre.""
- `items[12].shown` "(none)" → ""Il fait froid, alors l'eau est glacée.""
- `items[12].prompt` ""Cold makes water frozen"" → "(removed)"
- `items[12].hint` ""le froid + rend + l'eau + glacée"" → "(removed)"
- `items[13].type` "translate" → "transform"
- `items[13].instruction` "(none)" → ""Say it with rendre.""
- `items[13].shown` "(none)" → ""Il pleut, alors la terre est humide.""
- `items[13].prompt` ""Rain makes the earth wet"" → "(removed)"
- `items[13].hint` ""la pluie + rend + la terre + humide"" → "(removed)"
- `items[14].type` "translate" → "respond"
- `items[14].situation` "(none)" → ""Your friend asks: Où est-ce que le soleil brille ? Answer: in the sky.""
- `items[14].accept` "(none)" → "["dans le ciel","il brille dans le ciel"]"
- `items[14].prompt` ""The sun shines in the sky"" → "(removed)"
- `items[14].hint` ""le soleil brille + dans le ciel"" → "(removed)"

**2024-03-15-questce-qui-que**

- `vocabulary[1].word_id` "qu-est-ce-que-fr.object-pronoun" → "qu-est-ce-que-fr"
- `concepts[3].definition` "If verb has NO object → use QUI. If verb has an object → use QUE" → "If 'what' is the subject (no other subject follows) → qui. If another subject follows → que."
- `items[0].mistakes[0].feedback` "Use 'qu'est-ce QUI' when asking what DOES something (subject). 'Brille' has no object! The thing itself shines. Use QUI for subjects, QUE for objects." → "Use qu'est-ce qui here: 'what' is the subject, and no other subject follows. Use qu'est-ce que when another subject follows."

**2024-03-19-pourquoi-complex**

- `concepts[0].definition` "You already know pourquoi - now compose it with EVERYTHING from Units 1-11!" → "You already know pourquoi - now compose it with EVERYTHING you've learned so far!"
- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[0].shown` "(none)" → ""Le ciel est bleu.""
- `items[0].answer` "pourquoi est-ce que le ciel est bleu?" → "pourquoi est-ce que le ciel est bleu ?"
- `items[0].mistakes` "(none)" → "["answer":"pourquoi est-ce que est le ciel bleu ?","feedback":"After est-ce que, keep statement order: subject, then verb."]"
- `items[0].prompt` ""Why is the sky blue?"" → "(removed)"
- `items[0].hint` ""pourquoi est-ce que + le ciel est bleu"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[1].shown` "(none)" → ""L'herbe est verte.""
- `items[1].answer` "pourquoi est-ce que l'herbe est verte?" → "pourquoi est-ce que l'herbe est verte ?"
- `items[1].prompt` ""Why is grass green?"" → "(removed)"
- `items[1].hint` ""pourquoi est-ce que + l'herbe est verte"" → "(removed)"
- `items[2].type` "translate" → "transform"
- `items[2].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[2].shown` "(none)" → ""Les nuages sont blancs.""
- `items[2].answer` "pourquoi est-ce que les nuages sont blancs?" → "pourquoi est-ce que les nuages sont blancs ?"
- `items[2].prompt` ""Why are clouds white?"" → "(removed)"
- `items[2].hint` ""pourquoi est-ce que + les nuages sont blancs"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[3].shown` "(none)" → ""C'est comme ça.""
- `items[3].answer` "pourquoi est-ce que c'est comme ça?" → "pourquoi est-ce que c'est comme ça ?"
- `items[3].prompt` ""Why is it like that?"" → "(removed)"
- `items[3].hint` ""pourquoi est-ce que + c'est comme ça"" → "(removed)"
- `items[4].type` "translate" → "respond"
- `items[4].situation` "(none)" → ""Your little brother has your phone. Ask your mother why he has it, with pourquoi est-ce que.""
- `items[4].answer` "pourquoi est-ce qu'il a ça?" → "pourquoi est-ce qu'il a ça ?"
- `items[4].accept` "["pourquoi est-ce qu'il a ça"]" → "["pourquoi est-ce qu'il a ça","pourquoi est-ce qu'il a mon téléphone ?"]"
- `items[4].prompt` ""Why does he have that?"" → "(removed)"
- `items[4].hint` ""pourquoi est-ce que + il a ça"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[5].shown` "(none)" → ""Les oiseaux ont des ailes.""
- `items[5].answer` "pourquoi est-ce que les oiseaux ont des ailes?" → "pourquoi est-ce que les oiseaux ont des ailes ?"
- `items[5].prompt` ""Why do birds have wings?"" → "(removed)"
- `items[5].hint` ""pourquoi est-ce que + les oiseaux ont des ailes"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[6].shown` "(none)" → ""Le soleil brille.""
- `items[6].answer` "pourquoi est-ce que le soleil brille?" → "pourquoi est-ce que le soleil brille ?"
- `items[6].prompt` ""Why does the sun shine?"" → "(removed)"
- `items[6].hint` ""pourquoi est-ce que + le soleil brille"" → "(removed)"
- `items[7].type` "translate" → "transform"
- `items[7].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[7].shown` "(none)" → ""Les oiseaux volent.""
- `items[7].answer` "pourquoi est-ce que les oiseaux volent?" → "pourquoi est-ce que les oiseaux volent ?"
- `items[7].prompt` ""Why do birds fly?"" → "(removed)"
- `items[7].hint` ""pourquoi est-ce que + les oiseaux volent"" → "(removed)"
- `items[8].type` "translate" → "transform"
- `items[8].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[8].shown` "(none)" → ""Les plantes poussent.""
- `items[8].answer` "pourquoi est-ce que les plantes poussent?" → "pourquoi est-ce que les plantes poussent ?"
- `items[8].prompt` ""Why do plants grow?"" → "(removed)"
- `items[8].hint` ""pourquoi est-ce que + les plantes poussent"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[9].shown` "(none)" → ""Il pleut.""
- `items[9].answer` "pourquoi est-ce qu'il pleut?" → "pourquoi est-ce qu'il pleut ?"
- `items[9].mistakes` "(none)" → "["answer":"pourquoi est-ce que il pleut ?","feedback":"que becomes qu' before a vowel: est-ce qu'il."]"
- `items[9].prompt` ""Why does it rain?"" → "(removed)"
- `items[9].hint` ""pourquoi est-ce que + il pleut"" → "(removed)"
- `items[10].type` "translate" → "respond"
- `items[10].situation` "(none)" → ""Your little brother is running in the house. Ask him why he is running, with pourquoi est-ce que.""
- `items[10].answer` "pourquoi est-ce que tu cours?" → "pourquoi est-ce que tu cours ?"
- `items[10].accept` "["pourquoi est-ce que tu cours"]" → "["pourquoi est-ce que tu cours","pourquoi est-ce que tu cours dans la maison ?"]"
- `items[10].prompt` ""Why are you running?"" → "(removed)"
- `items[10].hint` ""pourquoi est-ce que + tu cours"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[11].shown` "(none)" → ""Il fait ça.""
- `items[11].answer` "pourquoi est-ce qu'il fait ça?" → "pourquoi est-ce qu'il fait ça ?"
- `items[11].prompt` ""Why does he do that?"" → "(removed)"
- `items[11].hint` ""pourquoi est-ce que + il fait ça"" → "(removed)"
- `items[14].type` "translate" → "transform"
- `items[14].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[14].shown` "(none)" → ""Je dois faire ça.""
- `items[14].answer` "pourquoi est-ce que je dois faire ça?" → "pourquoi est-ce que je dois faire ça ?"
- `items[14].prompt` ""Why do I have to do that?"" → "(removed)"
- `items[14].hint` ""pourquoi est-ce que + je dois faire ça"" → "(removed)"
- `items[15].type` "translate" → "transform"
- `items[15].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[15].shown` "(none)" → ""On peut voir le soleil.""
- `items[15].answer` "pourquoi est-ce qu'on peut voir le soleil?" → "pourquoi est-ce qu'on peut voir le soleil ?"
- `items[15].prompt` ""Why can we see the sun?"" → "(removed)"
- `items[15].hint` ""pourquoi est-ce que + on peut voir le soleil"" → "(removed)"
- `items[16].type` "translate" → "transform"
- `items[16].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[16].shown` "(none)" → ""Tu te dépêches.""
- `items[16].answer` "pourquoi est-ce que tu te dépêches?" → "pourquoi est-ce que tu te dépêches ?"
- `items[16].prompt` ""Why are you hurrying?"" → "(removed)"
- `items[16].hint` ""pourquoi est-ce que + tu te dépêches"" → "(removed)"
- `items[17].type` "translate" → "transform"
- `items[17].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[17].shown` "(none)" → ""Les plantes ont besoin d'eau.""
- `items[17].answer` "pourquoi est-ce que les plantes ont besoin d'eau?" → "pourquoi est-ce que les plantes ont besoin d'eau ?"
- `items[17].prompt` ""Why do plants need water?"" → "(removed)"
- `items[17].hint` ""pourquoi est-ce que + les plantes ont besoin d'eau"" → "(removed)"

**2024-03-20-comment-complex**

- `vocabulary[1].review` "(none)" → "true"
- `vocabulary[3].review` "(none)" → "true"
- `vocabulary[9].review` "(none)" → "true"
- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[0].shown` "(none)" → ""Une tortue nage.""
- `items[0].answer` "comment est-ce qu'une tortue nage?" → "comment est-ce qu'une tortue nage ?"
- `items[0].mistakes` "(none)" → "["answer":"comment est-ce que une tortue nage ?","feedback":"que becomes qu' before a vowel: est-ce qu'une tortue."]"
- `items[0].prompt` ""How does a turtle swim?"" → "(removed)"
- `items[0].hint` ""comment est-ce que + une tortue nage"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[1].shown` "(none)" → ""Un oiseau vole.""
- `items[1].answer` "comment est-ce qu'un oiseau vole?" → "comment est-ce qu'un oiseau vole ?"
- `items[1].prompt` ""How does a bird fly?"" → "(removed)"
- `items[1].hint` ""comment est-ce que + un oiseau vole"" → "(removed)"
- `items[2].type` "translate" → "transform"
- `items[2].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[2].shown` "(none)" → ""Un écureuil saute.""
- `items[2].answer` "comment est-ce qu'un écureuil saute?" → "comment est-ce qu'un écureuil saute ?"
- `items[2].accept` "["comment est-ce qu'un écureuil saute","comment est-ce qu'un ecureuil saute","comment est-ce qu'un ecureuil saute?"]" → "["comment est-ce qu'un écureuil saute","comment est-ce qu'un ecureuil saute"]"
- `items[2].prompt` ""How does a squirrel jump?"" → "(removed)"
- `items[2].hint` ""comment est-ce que + un écureuil saute"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[3].shown` "(none)" → ""Un lapin saute.""
- `items[3].answer` "comment est-ce qu'un lapin saute?" → "comment est-ce qu'un lapin saute ?"
- `items[3].prompt` ""How does a rabbit jump?"" → "(removed)"
- `items[3].hint` ""comment est-ce que + un lapin saute"" → "(removed)"
- `items[4].type` "translate" → "transform"
- `items[4].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[4].shown` "(none)" → ""Un écureuil grimpe.""
- `items[4].answer` "comment est-ce qu'un écureuil grimpe?" → "comment est-ce qu'un écureuil grimpe ?"
- `items[4].accept` "["comment est-ce qu'un écureuil grimpe","comment est-ce qu'un ecureuil grimpe","comment est-ce qu'un ecureuil grimpe?"]" → "["comment est-ce qu'un écureuil grimpe","comment est-ce qu'un ecureuil grimpe"]"
- `items[4].prompt` ""How does a squirrel climb?"" → "(removed)"
- `items[4].hint` ""comment est-ce que + un écureuil grimpe"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[5].shown` "(none)" → ""Les plantes poussent.""
- `items[5].answer` "comment est-ce que les plantes poussent?" → "comment est-ce que les plantes poussent ?"
- `items[5].prompt` ""How do plants grow?"" → "(removed)"
- `items[5].hint` ""comment est-ce que + les plantes poussent"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[6].shown` "(none)" → ""Le soleil brille.""
- `items[6].answer` "comment est-ce que le soleil brille?" → "comment est-ce que le soleil brille ?"
- `items[6].prompt` ""How does the sun shine?"" → "(removed)"
- `items[6].hint` ""comment est-ce que + le soleil brille"" → "(removed)"
- `items[7].type` "translate" → "transform"
- `items[7].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[7].shown` "(none)" → ""La pluie tombe.""
- `items[7].answer` "comment est-ce que la pluie tombe?" → "comment est-ce que la pluie tombe ?"
- `items[7].prompt` ""How does rain fall?"" → "(removed)"
- `items[7].hint` ""comment est-ce que + la pluie tombe"" → "(removed)"
- `items[8].type` "translate" → "respond"
- `items[8].situation` "(none)" → ""Your friend opens a box that you could not open. Ask how it is done, with comment est-ce que and on.""
- `items[8].cue` "(none)" → ""How do we do that?""
- `items[8].answer` "comment est-ce qu'on fait ça?" → "comment est-ce qu'on fait ça ?"
- `items[8].prompt` ""How do we do that?"" → "(removed)"
- `items[8].hint` ""comment est-ce que + on fait ça"" → "(removed)"
- `items[9].type` "translate" → "respond"
- `items[9].situation` "(none)" → ""Your friend does a card trick. Ask how they do that, with comment est-ce que.""
- `items[9].answer` "comment est-ce que tu fais ça?" → "comment est-ce que tu fais ça ?"
- `items[9].prompt` ""How do you do that?"" → "(removed)"
- `items[9].hint` ""comment est-ce que + tu fais ça"" → "(removed)"
- `items[10].type` "translate" → "respond"
- `items[10].situation` "(none)" → ""Your friend swims very well. Ask how they swim, with comment est-ce que.""
- `items[10].answer` "comment est-ce que tu nages?" → "comment est-ce que tu nages ?"
- `items[10].accept` "["comment est-ce que tu nages"]" → "["comment est-ce que tu nages","comment est-ce que tu nages si bien ?"]"
- `items[10].prompt` ""How do you swim?"" → "(removed)"
- `items[10].hint` ""comment est-ce que + tu nages"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[11].shown` "(none)" → ""Il court si vite.""
- `items[11].answer` "comment est-ce qu'il court si vite?" → "comment est-ce qu'il court si vite ?"
- `items[11].prompt` ""How does he run so fast?"" → "(removed)"
- `items[11].hint` ""comment est-ce que + il court si vite"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[12].shown` "(none)" → ""Ça rend l'herbe verte.""
- `items[12].answer` "comment est-ce que ça rend l'herbe verte?" → "comment est-ce que ça rend l'herbe verte ?"
- `items[12].prompt` ""How does that make grass green?"" → "(removed)"
- `items[12].hint` ""comment est-ce que + ça rend l'herbe verte"" → "(removed)"

**2024-03-16-quiest-qui-que**

- `items[12].type` "respond" → "gapfill"
- `items[12].text` "(none)" → ""___ tu as vu au marché ?""
- `items[12].blanks` "(none)" → "["answer":"qui est-ce que"]"
- `items[12].gloss` "(none)" → ""Who did you see at the market?""
- `items[12].mistakes` "(none)" → "["answer":"qui est-ce qui","feedback":"Another subject, tu, comes next, so the person seen is the object: qui est-ce que."]"
- `items[12].situation` ""Ask 'Who did you meet?' (object, past tense)"" → "(removed)"
- `items[12].cue` ""Who did you meet?"" → "(removed)"
- `items[12].answer` ""qui est-ce que tu as rencontré?"" → "(removed)"
- `items[12].accept` "["qui est-ce que tu as rencontré","qui est-ce que tu as rencontre","qui est-ce que tu as rencontre?"]" → "(removed)"
- `items[12].hint` ""qui est-ce que + tu as rencontré"" → "(removed)"

**2024-03-23-embedded-questions**

- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Start with Je me demande.""
- `items[0].shown` "(none)" → ""Pourquoi est-ce que c'est comme ça ?""
- `items[0].mistakes` "(none)" → "["answer":"je me demande pourquoi est-ce que c'est comme ça","feedback":"After je me demande, drop est-ce que: pourquoi c'est comme ça."]"
- `items[0].prompt` ""I wonder why it's like that"" → "(removed)"
- `items[0].hint` ""je me demande + pourquoi c'est comme ça (no est-ce que!)"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Start with Je me demande.""
- `items[1].shown` "(none)" → ""Comment est-ce que ça marche ?""
- `items[1].prompt` ""I wonder how that works"" → "(removed)"
- `items[1].hint` ""je me demande + comment ça marche"" → "(removed)"
- `items[2].type` "translate" → "respond"
- `items[2].situation` "(none)" → ""You look up at the sky with a friend. Say that you wonder why it is blue, starting with Je me demande.""
- `items[2].cue` "(none)" → ""I wonder why the sky is blue""
- `items[2].accept` "(none)" → "["je me demande pourquoi il est bleu"]"
- `items[2].mistakes` "(none)" → "["answer":"je me demande pourquoi le ciel est-il bleu","feedback":"Inside the sentence, use statement order with no inversion: pourquoi le ciel est bleu."]"
- `items[2].prompt` ""I wonder why the sky is blue"" → "(removed)"
- `items[2].hint` ""je me demande + pourquoi le ciel est bleu"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Start with Je me demande.""
- `items[3].shown` "(none)" → ""Où est-il ?""
- `items[3].mistakes` "(none)" → "["answer":"je me demande où est-il","feedback":"Inside the sentence, put the subject before the verb: où il est."]"
- `items[3].prompt` ""I wonder where he is"" → "(removed)"
- `items[3].hint` ""je me demande + où il est"" → "(removed)"
- `items[4].type` "translate" → "respond"
- `items[4].situation` "(none)" → ""Someone asks you: Comment est-ce qu'on fait ça ? You have no idea. Say you don't know how we do that.""
- `items[4].accept` "(none)" → "["je ne sais pas comment on fait"]"
- `items[4].prompt` ""I don't know how we do that"" → "(removed)"
- `items[4].hint` ""je ne sais pas + comment on fait ça"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Start with Je ne sais pas.""
- `items[5].shown` "(none)" → ""Pourquoi fait-il ça ?""
- `items[5].prompt` ""I don't know why he does that"" → "(removed)"
- `items[5].hint` ""je ne sais pas + pourquoi il fait ça"" → "(removed)"
- `items[6].type` "translate" → "respond"
- `items[6].situation` "(none)" → ""A child asks you: Comment est-ce qu'une tortue nage ? You have no idea. Say so, starting with Je ne sais pas.""
- `items[6].cue` "(none)" → ""I don't know how a turtle swims""
- `items[6].accept` "(none)" → "["je ne sais pas comment nage une tortue","je ne sais pas comment elle nage"]"
- `items[6].mistakes` "(none)" → "["answer":"je ne sais pas comment est-ce qu'une tortue nage","feedback":"After je ne sais pas, drop est-ce que."]"
- `items[6].prompt` ""I don't know how a turtle swims"" → "(removed)"
- `items[6].hint` ""je ne sais pas + comment une tortue nage"" → "(removed)"
- `items[7].type` "translate" → "respond"
- `items[7].situation` "(none)" → ""A tourist asks you: Où est la gare ? You don't know. Tell them.""
- `items[7].accept` "(none)" → "["je ne sais pas où la gare est","désolé, je ne sais pas où est la gare","désolée, je ne sais pas où est la gare"]"
- `items[7].prompt` ""I don't know where the station is"" → "(removed)"
- `items[7].hint` ""je ne sais pas + où est la gare"" → "(removed)"
- `items[8].type` "translate" → "respond"
- `items[8].situation` "(none)" → ""You are lost in town. Ask a friend where the station is, politely, with peux-tu me dire.""
- `items[8].answer` "peux-tu me dire où est la gare?" → "peux-tu me dire où est la gare ?"
- `items[8].accept` "["peux-tu me dire où est la gare"]" → "["peux-tu me dire où est la gare","peux-tu me dire où la gare est ?"]"
- `items[8].prompt` ""Can you tell me where the station is?"" → "(removed)"
- `items[8].hint` ""peux-tu me dire + où est la gare"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Ask politely, with Peux-tu me dire.""
- `items[9].shown` "(none)" → ""Comment ça marche ?""
- `items[9].answer` "peux-tu me dire comment ça marche?" → "peux-tu me dire comment ça marche ?"
- `items[9].prompt` ""Can you tell me how that works?"" → "(removed)"
- `items[9].hint` ""peux-tu me dire + comment ça marche"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Ask politely, with Peux-tu me dire.""
- `items[10].shown` "(none)" → ""Pourquoi est-ce qu'il fait ça ?""
- `items[10].answer` "peux-tu me dire pourquoi il fait ça?" → "peux-tu me dire pourquoi il fait ça ?"
- `items[10].mistakes` "(none)" → "["answer":"peux-tu me dire pourquoi est-ce qu'il fait ça ?","feedback":"After peux-tu me dire, drop est-ce que: pourquoi il fait ça."]"
- `items[10].prompt` ""Can you tell me why he does that?"" → "(removed)"
- `items[10].hint` ""peux-tu me dire + pourquoi il fait ça"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask it with Tu sais.""
- `items[11].shown` "(none)" → ""Pourquoi il fait ça ?""
- `items[11].answer` "tu sais pourquoi il fait ça?" → "tu sais pourquoi il fait ça ?"
- `items[11].prompt` ""Do you know why he does that?"" → "(removed)"
- `items[11].hint` ""tu sais + pourquoi il fait ça"" → "(removed)"
- `items[12].type` "translate" → "transform"
- `items[12].instruction` "(none)" → ""Start with On ne comprend pas.""
- `items[12].shown` "(none)" → ""Pourquoi c'est comme ça ?""
- `items[12].prompt` ""We don't understand why it's like that"" → "(removed)"
- `items[12].hint` ""on ne comprend pas + pourquoi c'est comme ça"" → "(removed)"

**2024-03-24-rhetorical-negative**

- `items[0].type` "translate" → "respond"
- `items[0].situation` "(none)" → ""Your friend doubts that French bread is the best. Ask a negative question to get them to agree.""
- `items[0].answer` "n'est-ce pas vrai?" → "n'est-ce pas vrai ?"
- `items[0].accept` "["n'est-ce pas vrai"]" → "["n'est-ce pas vrai","c'est vrai, n'est-ce pas ?"]"
- `items[0].prompt` ""Isn't that true?"" → "(removed)"
- `items[0].hint` ""n'est-ce pas + vrai"" → "(removed)"
- `items[2].type` "translate" → "transform"
- `items[2].instruction` "(none)" → ""Ask it with inversion.""
- `items[2].shown` "(none)" → ""Tu n'es pas content ?""
- `items[2].answer` "n'es-tu pas content?" → "n'es-tu pas content ?"
- `items[2].accept` "["n'es-tu pas content"]" → "["n'es-tu pas content","n'es-tu pas contente ?","n'es-tu pas contente"]"
- `items[2].mistakes` "(none)" → "["answer":"ne es-tu pas content ?","feedback":"ne becomes n' before a vowel: n'es-tu pas."]"
- `items[2].prompt` ""Aren't you happy?"" → "(removed)"
- `items[2].hint` ""n'es-tu pas + content"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask it with inversion.""
- `items[3].shown` "(none)" → ""Tu n'as pas faim ?""
- `items[3].answer` "n'as-tu pas faim?" → "n'as-tu pas faim ?"
- `items[3].mistakes` "(none)" → "["answer":"n'as pas-tu faim ?","feedback":"pas comes after the inverted pair: n'as-tu pas."]"
- `items[3].prompt` ""Aren't you hungry?"" → "(removed)"
- `items[3].hint` ""n'as-tu pas + faim"" → "(removed)"
- `items[4].type` "translate" → "transform"
- `items[4].instruction` "(none)" → ""Ask it with inversion.""
- `items[4].shown` "(none)" → ""Tu ne veux pas essayer ?""
- `items[4].answer` "ne veux-tu pas essayer?" → "ne veux-tu pas essayer ?"
- `items[4].prompt` ""Don't you want to try?"" → "(removed)"
- `items[4].hint` ""ne veux-tu pas + essayer"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Ask it with inversion.""
- `items[10].shown` "(none)" → ""Ce n'est pas magnifique ?""
- `items[10].answer` "n'est-ce pas magnifique?" → "n'est-ce pas magnifique ?"
- `items[10].prompt` ""Isn't that magnificent?"" → "(removed)"
- `items[10].hint` ""n'est-ce pas + magnifique"" → "(removed)"
- `items[11].accept` "["pourquoi ne pas aller là-bas","pourquoi ne pas aller la-bas","pourquoi ne pas aller la-bas?"]" → "["pourquoi ne pas aller là-bas","pourquoi ne pas aller la-bas","pourquoi ne pas aller la-bas?","pourquoi ne pas y aller ?"]"

**2024-03-25-multi-clause-questions**

- `concepts[0].term` "Questions + Unit 10 Structures" → "Questions + Mastery & Nuance Structures"
- `concepts[0].definition` "Combine question words with all the sophisticated structures from Unit 10" → "Combine question words with all the sophisticated structures from the Mastery & Nuance unit"
- `items[0].type` "translate" → "transform"
- `items[0].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[0].shown` "(none)" → ""Il faut que je fasse ça.""
- `items[0].answer` "pourquoi est-ce qu'il faut que je fasse ça?" → "pourquoi est-ce qu'il faut que je fasse ça ?"
- `items[0].mistakes` "(none)" → "["answer":"pourquoi est-ce qu'il faut que je fais ça ?","feedback":"After il faut que, use the subjunctive: que je fasse."]"
- `items[0].prompt` ""Why do I have to do that?"" → "(removed)"
- `items[0].hint` ""pourquoi est-ce que + il faut que je fasse ça"" → "(removed)"
- `items[1].type` "translate" → "transform"
- `items[1].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[1].shown` "(none)" → ""Il faut que tu partes.""
- `items[1].answer` "pourquoi est-ce qu'il faut que tu partes?" → "pourquoi est-ce qu'il faut que tu partes ?"
- `items[1].prompt` ""Why do you have to leave?"" → "(removed)"
- `items[1].hint` ""pourquoi est-ce que + il faut que tu partes"" → "(removed)"
- `items[2].type` "translate" → "respond"
- `items[2].situation` "(none)" → ""Your friend asks you to clean the kitchen. Ask why they want you to do that, with pourquoi est-ce que.""
- `items[2].answer` "pourquoi est-ce que tu veux que je fasse ça?" → "pourquoi est-ce que tu veux que je fasse ça ?"
- `items[2].prompt` ""Why do you want me to do that?"" → "(removed)"
- `items[2].hint` ""pourquoi est-ce que + tu veux que je fasse ça"" → "(removed)"
- `items[3].type` "translate" → "transform"
- `items[3].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[3].shown` "(none)" → ""Tu veux que je le fasse.""
- `items[3].answer` "comment est-ce que tu veux que je le fasse?" → "comment est-ce que tu veux que je le fasse ?"
- `items[3].prompt` ""How do you want me to do it?"" → "(removed)"
- `items[3].hint` ""comment est-ce que + tu veux que je le fasse"" → "(removed)"
- `items[4].type` "translate" → "transform"
- `items[4].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[4].shown` "(none)" → ""Tu veux qu'il vienne.""
- `items[4].answer` "pourquoi est-ce que tu veux qu'il vienne?" → "pourquoi est-ce que tu veux qu'il vienne ?"
- `items[4].prompt` ""Why do you want him to come?"" → "(removed)"
- `items[4].hint` ""pourquoi est-ce que + tu veux qu'il vienne"" → "(removed)"
- `items[5].type` "translate" → "transform"
- `items[5].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[5].shown` "(none)" → ""Tu penses que c'est comme ça.""
- `items[5].answer` "pourquoi est-ce que tu penses que c'est comme ça?" → "pourquoi est-ce que tu penses que c'est comme ça ?"
- `items[5].prompt` ""Why do you think it's like that?"" → "(removed)"
- `items[5].hint` ""pourquoi est-ce que + tu penses que c'est comme ça"" → "(removed)"
- `items[6].type` "translate" → "transform"
- `items[6].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[6].shown` "(none)" → ""Tu penses qu'on devrait faire ça.""
- `items[6].answer` "comment est-ce que tu penses qu'on devrait faire ça?" → "comment est-ce que tu penses qu'on devrait faire ça ?"
- `items[6].prompt` ""How do you think we should do that?"" → "(removed)"
- `items[6].hint` ""comment est-ce que + tu penses qu'on devrait faire ça"" → "(removed)"
- `items[7].type` "translate" → "transform"
- `items[7].instruction` "(none)" → ""Ask what, with qu'est-ce que.""
- `items[7].shown` "(none)" → ""Tu penses qu'il devrait faire quelque chose.""
- `items[7].answer` "qu'est-ce que tu penses qu'il devrait faire?" → "qu'est-ce que tu penses qu'il devrait faire ?"
- `items[7].prompt` ""What do you think he should do?"" → "(removed)"
- `items[7].hint` ""qu'est-ce que + tu penses qu'il devrait faire"" → "(removed)"
- `items[8].type` "translate" → "transform"
- `items[8].instruction` "(none)" → ""Ask what, with qu'est-ce qui.""
- `items[8].shown` "(none)" → ""Quelque chose rendrait l'herbe plus verte.""
- `items[8].answer` "qu'est-ce qui rendrait l'herbe plus verte?" → "qu'est-ce qui rendrait l'herbe plus verte ?"
- `items[8].mistakes` "(none)" → "["answer":"qu'est-ce que rendrait l'herbe plus verte ?","feedback":"The thing does the making, so it is the subject: qu'est-ce qui."]"
- `items[8].prompt` ""What would make grass greener?"" → "(removed)"
- `items[8].hint` ""qu'est-ce qui + rendrait l'herbe plus verte"" → "(removed)"
- `items[9].type` "translate" → "transform"
- `items[9].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[9].shown` "(none)" → ""Tu ferais ça.""
- `items[9].answer` "pourquoi est-ce que tu ferais ça?" → "pourquoi est-ce que tu ferais ça ?"
- `items[9].prompt` ""Why would you do that?"" → "(removed)"
- `items[9].hint` ""pourquoi est-ce que + tu ferais ça (conditional!)"" → "(removed)"
- `items[10].type` "translate" → "transform"
- `items[10].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[10].shown` "(none)" → ""Ça ne marche pas.""
- `items[10].answer` "pourquoi est-ce que ça ne marche pas?" → "pourquoi est-ce que ça ne marche pas ?"
- `items[10].prompt` ""Why doesn't it work?"" → "(removed)"
- `items[10].hint` ""pourquoi est-ce que + ça ne marche pas"" → "(removed)"
- `items[11].type` "translate" → "transform"
- `items[11].instruction` "(none)" → ""Ask why, with pourquoi est-ce que.""
- `items[11].shown` "(none)" → ""Il ne veut pas venir.""
- `items[11].answer` "pourquoi est-ce qu'il ne veut pas venir?" → "pourquoi est-ce qu'il ne veut pas venir ?"
- `items[11].prompt` ""Why doesn't he want to come?"" → "(removed)"
- `items[11].hint` ""pourquoi est-ce que + il ne veut pas venir"" → "(removed)"
- `items[12].type` "translate" → "respond"
- `items[12].situation` "(none)" → ""Your friend Marc smiles when Paul walks in. Ask Marc why he is happy that Paul is here, with pourquoi est-ce que.""
- `items[12].answer` "pourquoi est-ce que tu es content qu'il soit là?" → "pourquoi est-ce que tu es content qu'il soit là ?"
- `items[12].accept` "["pourquoi est-ce que tu es content qu'il soit là","pourquoi est-ce que tu es content qu'il soit la","pourquoi est-ce que tu es content qu'il soit la?"]" → "["pourquoi est-ce que tu es content qu'il soit là","pourquoi est-ce que tu es content qu'il soit la","pourquoi est-ce que tu es content que Paul soit là ?","pourquoi est-ce que tu es content que Paul soit là"]"
- `items[12].mistakes` "(none)" → "["answer":"pourquoi est-ce que tu es content qu'il est là ?","feedback":"After content que, use the subjunctive: qu'il soit là."]"
- `items[12].prompt` ""Why are you happy that he's here?"" → "(removed)"
- `items[12].hint` ""pourquoi est-ce que + tu es content qu'il soit là"" → "(removed)"
- `items[13].type` "translate" → "transform"
- `items[13].instruction` "(none)" → ""Ask how, with comment est-ce que.""
- `items[13].shown` "(none)" → ""Tu penses qu'on pourrait le faire marcher.""
- `items[13].answer` "comment est-ce que tu penses qu'on pourrait le faire marcher?" → "comment est-ce que tu penses qu'on pourrait le faire marcher ?"
- `items[13].prompt` ""How do you think we could make it work?"" → "(removed)"
- `items[13].hint` ""comment est-ce que + tu penses qu'on pourrait le faire marcher"" → "(removed)"

## Live ids with no converted item

The live app stores answers under these exercise ids and concept indexes, and no converted item, concept or section has the same content, so live-ids.json has no entry for them. Real misses come first: each needs a look. The other two groups are expected, since the new files hold nothing for those ids.

### Real misses

**2024-01-07-plurals**

- `2024-01-07-plurals.6` exercise "they are the friends (masculine)" → "ils sont les amis"

**2024-01-15-vouloir**

- `2024-01-15-vouloir.1` exercise "I want" → "je veux"
- `2024-01-15-vouloir.2` exercise "you want (informal)" → "tu veux"
- `2024-01-15-vouloir.3` exercise "he wants" → "il veut"
- `2024-01-15-vouloir.4` exercise "she wants" → "elle veut"
- `2024-01-15-vouloir.7` exercise "they want (masculine)" → "ils veulent"
- `2024-01-15-vouloir.8` exercise "they want (feminine)" → "elles veulent"

**2024-01-16-pouvoir**

- `2024-01-16-pouvoir.14` exercise "I can want that" → "je peux vouloir ça"
- `2024-01-16-pouvoir.15` exercise "They can want a cat" → "ils peuvent vouloir un chat"

**2024-01-18-questions**

- `2024-01-18-questions.14` exercise "is she a woman?" → "est-ce que elle est une femme"

**2024-01-29-partir**

- `2024-01-29-partir.1` exercise "I leave" → "je pars"
- `2024-01-29-partir.2` exercise "you leave (informal)" → "tu pars"
- `2024-01-29-partir.3` exercise "he leaves" → "il part"
- `2024-01-29-partir.4` exercise "she leaves" → "elle part"
- `2024-01-29-partir.7` exercise "they leave (masculine)" → "ils partent"
- `2024-01-29-partir.8` exercise "they leave (feminine)" → "elles partent"
- `2024-01-29-partir.9` exercise "I leave that" → "je pars de ça"
- `2024-01-29-partir.10` exercise "What do you leave?" → "qu'est-ce que tu pars?"
- `2024-01-29-partir.11` exercise "He leaves that" → "il part de ça"
- `2024-01-29-partir.12` exercise "We leave that" → "nous partons de ça"
- `2024-01-29-partir.13` exercise "What do you want to leave?" → "qu'est-ce que tu veux partir?"
- `2024-01-29-partir.14` exercise "I want to leave that" → "je veux partir de ça"
- `2024-01-29-partir.15` exercise "Can you leave?" → "peux-tu partir?"
- `2024-01-29-partir.16` exercise "I can leave that" → "je peux partir de ça"
- `2024-01-29-partir.17` exercise "I am going to leave that" → "je vais partir de ça"
- `2024-01-29-partir.18` exercise "What are you going to leave?" → "qu'est-ce que tu vas partir?"
- `2024-01-29-partir.19` exercise "I come to leave that" → "je viens partir de ça"
- `2024-01-29-partir.20` exercise "Why do you come to leave?" → "pourquoi viens-tu partir?"

**2024-05-05-on-and-people**

- `2024-05-05-on-and-people.2` exercise "We must study (using on)" → "on doit étudier"
- `2024-05-05-on-and-people.8` exercise "We must believe (using on)" → "on doit croire"

**2024-05-02-discourse-markers**

- `2024-05-02-discourse-markers.14` exercise "I am almost ready" → "je suis presque prêt"

**2024-05-07-reading-7**

- `2024-05-07-reading-7.3` exercise "First, we must..." → "demander des questions"

**2024-05-10-unit-7-exam**

- `2024-05-10-unit-7-exam.62` exercise "I'm reviewing my lessons because I have an exam" → "je révise mes leçons parce que j'ai un examen"

**2024-05-21-reflexive-pronouns**

- `2024-05-21-reflexive-pronouns.4` exercise "elle ... habille (she gets dressed)" → "se"
- `2024-05-21-reflexive-pronouns.7` exercise "ils ... amusent (they have fun)" → "se"

**2024-05-20-reading-8**

- `2024-05-20-reading-8.10` exercise "She goes from morning preparation to..." → "elle rentre contente et pense au lendemain"

**2024-05-26-causal-words**

- `2024-05-26-causal-words.2` exercise "Complete: On étudie le français ___ c'est utile (We study French for it's useful)" → "car"
- `2024-05-26-causal-words.6` exercise "Complete: ___ la pluie, on reste ici (Because of the rain, we're staying here)" → "À cause de"
- `2024-05-26-causal-words.7` exercise "Complete: Pourquoi tu restes? - ___ je suis fatigué (Why are you staying? - Because I'm tired)" → "Parce que"
- `2024-05-26-causal-words.8` exercise "Complete: Je suis en retard ___ le traffic (I'm late because of traffic)" → "à cause du"
- `2024-05-26-causal-words.17` exercise "Complete: Je ne dors pas bien ___ bruit (I don't sleep well because of the noise)" → "à cause du"

**2024-05-28-more-spatial-relations**

- `2024-05-28-more-spatial-relations.7` exercise "Complete: La table est ___ pièce (The table is in the middle of the room)" → "au milieu de la"

**2024-05-31-passe-compose-etre**

- `2024-05-31-passe-compose-etre.5` exercise "Complete: Vous ___ hier? (Did you go out yesterday?) - Use 'sortir' with ÊTRE!" → "êtes sortis"
- `2024-05-31-passe-compose-etre.16` exercise "Complete: ___ vous ___ en vacances? (Did you go on vacation?) - Use 'partir' with ÊTRE!" → "Êtes partis"

**2024-05-27-imparfait-all-verbs**

- `2024-05-27-imparfait-all-verbs.16` exercise "Complete: Quand j'___ jeune, je jouais au foot (When I was young, I used to play soccer) - Use 'être' in imparfait" → "étais"

**2024-06-04-pc-vs-imparfait**

- `2024-06-04-pc-vs-imparfait.18` exercise "Complete: Il ___ du café quand je suis arrivé (He was drinking coffee when I arrived) - Choose correct tense for 'boire'" → "buvait"

**2024-06-09-unit-9-exam**

- `2024-06-09-unit-9-exam.36` exercise "je _____ (lire) quand il a téléphoné" → "lisais"
- `2024-06-09-unit-9-exam.37` exercise "hier j'_____ (acheter) un livre" → "ai acheté"
- `2024-06-09-unit-9-exam.39` exercise "soudain la porte s'_____ (ouvrir)" → "est ouverte"
- `2024-06-09-unit-9-exam.40` exercise "pendant qu'il _____ (pleuvoir), je suis resté dedans" → "pleuvait"

**2024-01-22-common-adverbs**

- `2024-01-22-common-adverbs.4` exercise "run quickly" → "courir rapidement"

**2024-02-01-reading-10**

- `2024-02-01-reading-10.8` exercise "What did they decide to do?" → "aider l'un l'autre"

**2024-02-04-unit-10-exam**

- `2024-02-04-unit-10-exam.37` exercise "Si on ne fait rien, on ne _____ jamais" → "saura"

### Reference word lists

The live app builds an exercise from each word of a Reference page; a Reference page has no items.

- **2024-04-01-alphabet**: 33 exercises
- **2024-04-02-numbers**: 39 exercises
- **2024-04-03-days-months**: 28 exercises
- **2024-04-04-holidays**: 20 exercises
- **2024-04-05-colors**: 36 exercises
- **2024-04-06-french-countries**: 20 exercises
- **2024-04-07-language-stats**: 20 exercises

### Concept cards of modules that hold none

Practice sets, unit exams and readings hold no concept cards, so the live ticks on their cards have no new id.

- **2024-01-09-reading1**: 3 concept cards
- **2024-01-10-unit1-practice**: 3 concept cards
- **2024-01-11-unit1-exam**: 3 concept cards
- **2024-01-22-reading2**: 3 concept cards
- **2024-01-23-unit2-practice**: 3 concept cards
- **2024-01-24-unit2-exam**: 4 concept cards
- **2024-02-03-reading3**: 3 concept cards
- **2024-02-04-unit3-practice**: 3 concept cards
- **2024-02-05-unit3-exam**: 5 concept cards
- **2024-03-30-reading-4**: 3 concept cards
- **2024-04-03-unit-4-practice**: 3 concept cards
- **2024-04-02-unit-4-exam**: 5 concept cards
- **2024-04-13-reading-5**: 3 concept cards
- **2024-04-15-unit-5-practice**: 3 concept cards
- **2024-04-14-unit-5-exam**: 5 concept cards
- **2024-04-24-reading-6**: 3 concept cards
- **2024-04-27-unit-6-practice**: 3 concept cards
- **2024-04-26-unit-6-exam**: 5 concept cards
- **2024-05-07-reading-7**: 3 concept cards
- **2024-05-11-unit-7-practice**: 3 concept cards
- **2024-05-10-unit-7-exam**: 5 concept cards
- **2024-05-20-reading-8**: 3 concept cards
- **2024-05-25-unit-8-practice**: 3 concept cards
- **2024-05-24-unit-8-exam**: 5 concept cards
- **2024-06-05-reading-9**: 3 concept cards
- **2024-06-10-unit-9-practice**: 3 concept cards
- **2024-06-09-unit-9-exam**: 5 concept cards
- **2024-02-01-reading-10**: 3 concept cards
- **2024-02-05-unit-10-practice**: 3 concept cards
- **2024-02-04-unit-10-exam**: 5 concept cards
- **2024-02-12-reading-11**: 3 concept cards
- **2024-02-16-unit-11-practice**: 3 concept cards
- **2024-02-15-unit-11-exam**: 6 concept cards

## Fields with no place in a module file

Today’s objects hold these, and the module schema has no field for them.

**2024-01-01-famous-words**

- `emailMetadata.realWorldUse` "greet people and be polite" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Build your first sentences with pronouns" (no field; the next-module teaser is computed from the outline)

**2024-01-01-pronouns**

- `emailMetadata.realWorldUse` "build every sentence you'll ever speak" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine these with être to make your first real sentences" (no field; the next-module teaser is computed from the outline)

**2024-01-02-etre**

- `emailMetadata.realWorldUse` "introduce yourself and describe people" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "First real sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add avoir (to have) to express possession" (no field; the next-module teaser is computed from the outline)

**2024-01-04-avoir**

- `emailMetadata.realWorldUse` "express what you have and what you need" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine with ça to have real conversations" (no field; the next-module teaser is computed from the outline)

**2024-01-05-articles**

- `emailMetadata.realWorldUse` "prepare to talk about real things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add nouns to talk about real objects" (no field; the next-module teaser is computed from the outline)

**2024-10-21-cognates-help**

- `emailMetadata.capabilities` ["Recognize French words that look like English","Understand why French isn't as hard as you thought","Build confidence with familiar word patterns"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "quickly expand your vocabulary using cognates" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Continue building your noun vocabulary" (no field; the next-module teaser is computed from the outline)

**2024-01-06-basic-nouns**

- `emailMetadata.realWorldUse` "name and talk about concrete objects" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Talk about real things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn plurals to talk about multiple things" (no field; the next-module teaser is computed from the outline)
- 8 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`

**2024-01-07-plurals**

- `emailMetadata.realWorldUse` "talk about multiple objects and groups" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn demonstratives to point to specific things" (no field; the next-module teaser is computed from the outline)
- 7 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`

**2024-10-20-liaison-help**

- `emailMetadata.capabilities` ["Understand how French words flow together","Recognize when sounds connect between words","Sound more natural when speaking French"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "speak with natural French rhythm and flow" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use connectors to link your ideas" (no field; the next-module teaser is computed from the outline)

**2024-01-08-connectors**

- `emailMetadata.realWorldUse` "make your French sound natural and connected" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice everything you've learned with reading comprehension" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[9].instruction`

**2024-01-09-reading1**

- `emailMetadata.realWorldUse` "read simple French texts and understand them" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "First reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice combining everything you've learned" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "First Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Comprehension Achievement": a reading has no concept cards
- `concepts[2]` concept "Functional Literacy": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Les Amis (The Friends)" (the story's title comes from stories/)
- `glossary` 7 story glossary notes (a glossary row holds fr and en)
- `exerciseConfig.items[1].prompt` "Find the answer in the passage above" (says only where the answer is)
- `exerciseConfig.items[3].prompt` "Find the answer in the passage above" (says only where the answer is)
- `exerciseConfig.items[5].prompt` "Find the answer in the passage above" (says only where the answer is)
- `exerciseConfig.items[6].prompt` "Find the answer in the passage above" (says only where the answer is)

**2024-01-10-unit1-practice**

- `emailMetadata.realWorldUse` "form your own original French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 1 exam to prove your mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Foundation Reinforcement": a practice set teaches nothing
- `concepts[1]` concept "Composition Practice": a practice set teaches nothing
- `concepts[2]` concept "Scaffolded Learning": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-01-11-unit1-exam**

- `title` "Unit 1 Final Exam - Foundation": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "communicate basic needs and introductions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Conversational basics achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 2 to ask questions and describe things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Foundation Layer Complete": a unit exam teaches nothing
- `concepts[1]` concept "Functional Composition": a unit exam teaches nothing
- `concepts[2]` concept "Immediate Utility": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 1 (the outline places the exam)
- 24 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`

**2026-11-24-numbers**

- `emailMetadata.realWorldUse` "say ages and count people and things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn to say no: je ne suis pas, je n'ai pas" (no field; the next-module teaser is computed from the outline)

**2026-11-24-negation-guide**

- `emailMetadata.realWorldUse` "say no in French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Point at things with this and that" (no field; the next-module teaser is computed from the outline)

**2024-01-12-demonstratives**

- `emailMetadata.realWorldUse` "point to and identify specific objects" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine demonstratives with nouns to say 'this book', 'that cat'" (no field; the next-module teaser is computed from the outline)

**2024-01-13-ca-survival**

- `emailMetadata.realWorldUse` "greet someone and ask how they're doing" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "First real conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more verbs to express wants and abilities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.utilityScore` 8 (no field; the next-module teaser is computed from the outline)

**2024-01-14-determiners-nouns**

- `emailMetadata.realWorldUse` "specify exactly which object you're talking about" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Functional composition mastered" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add vouloir to express what you want" (no field; the next-module teaser is computed from the outline)
- 11 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`

**2024-01-15-vouloir**

- `emailMetadata.realWorldUse` "express your wants and make polite requests" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Express desires and wants" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add pouvoir to express what you can do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.utilityScore` 9 (no field; the next-module teaser is computed from the outline)

**2024-01-16-pouvoir**

- `emailMetadata.realWorldUse` "express what you can do and ask permission" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add voir to talk about what you see" (no field; the next-module teaser is computed from the outline)

**2024-01-17-voir**

- `emailMetadata.realWorldUse` "describe what you see and perceive" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master question words to ask anything" (no field; the next-module teaser is computed from the outline)

**2024-01-18-questions**

- `emailMetadata.realWorldUse` "ask questions and have real conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Can ask questions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn stressed pronouns for emphasis" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.utilityScore` 10 (no field; the next-module teaser is computed from the outline)

**2024-01-19-questions-help**

- `emailMetadata.capabilities` ["Understand the three ways to ask questions in French","Choose the right question method for each situation","Build confidence in asking questions naturally"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "master French question formation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use stressed pronouns for emphasis" (no field; the next-module teaser is computed from the outline)

**2024-01-19-stressed-pronouns**

- `emailMetadata.realWorldUse` "emphasize and specify people in conversation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add prepositions to describe locations and relationships" (no field; the next-module teaser is computed from the outline)
- 2 × generic instruction dropped (Say '…'): `exerciseConfig.items[8].instruction`, `exerciseConfig.items[10].instruction`

**2024-01-20-prepositions**

- `emailMetadata.realWorldUse` "describe where things are and relationships between people" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add adjectives to describe qualities" (no field; the next-module teaser is computed from the outline)
- `vocabularyReference[7].ttsText` "a" (speech override; no field)
- `exerciseConfig.items[3].ttsText` i-a: "a" (speech override; no field)
- 12 × generic instruction dropped (Say '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`

**2024-01-21-adjectives**

- `emailMetadata.realWorldUse` "describe qualities and characteristics of things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice reading comprehension with everything you've learned" (no field; the next-module teaser is computed from the outline)
- 16 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`

**2024-01-22-reading2**

- `emailMetadata.realWorldUse` "read French stories and understand cultural content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Cultural reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice everything with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Adventure Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Conversational French": a reading has no concept cards
- `concepts[2]` concept "Cultural Context": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Rendez-vous en Normandie (The Normandy Meetup)" (the story's title comes from stories/)
- `glossary` 6 story glossary notes (a glossary row holds fr and en)

**2024-01-23-unit2-practice**

- `emailMetadata.realWorldUse` "form complex original French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 2 exam to prove your compositional skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Composition Practice": a practice set teaches nothing
- `concepts[1]` concept "Essential Verb Mastery": a practice set teaches nothing
- `concepts[2]` concept "Question Building": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-01-24-unit2-exam**

- `title` "Unit 2 Final Exam - Composition": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "have real two-way conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Conversational fluency achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 3 to master movement and possession" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Composition Layer Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Essential Communication Verbs": a unit exam teaches nothing
- `concepts[2]` concept "Question Formation": a unit exam teaches nothing
- `concepts[3]` concept "Descriptive Language": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 2 (the outline places the exam)
- 33 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`

**2024-01-25-contractions**

- `emailMetadata.realWorldUse` "speak French that sounds natural and fluid" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master movement verbs like venir and aller" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`

**2024-01-26-venir**

- `emailMetadata.realWorldUse` "talk about arrival and origin" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add aller to express where you're going" (no field; the next-module teaser is computed from the outline)

**2024-01-27-aller**

- `emailMetadata.realWorldUse` "talk about movement and future plans" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn verb patterns to master conjugation" (no field; the next-module teaser is computed from the outline)

**2024-01-28-verb-pattern-help**

- `emailMetadata.capabilities` ["Recognize patterns across French verb conjugations","Predict how new verbs will conjugate","Understand why verbs change the way they do"] (can_do holds L's "What you can do now" lines)
- `emailMetadata.realWorldUse` "learn new verbs faster using patterns" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Apply patterns to partir (to leave)" (no field; the next-module teaser is computed from the outline)

**2024-01-29-partir**

- `emailMetadata.realWorldUse` "talk about leaving places and travel" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn object pronouns to say 'I see him/her/it'" (no field; the next-module teaser is computed from the outline)

**2024-01-30-object-pronouns**

- `emailMetadata.realWorldUse` "speak more concisely and naturally" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Concise sentence formation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add possessive adjectives to show ownership" (no field; the next-module teaser is computed from the outline)

**2024-01-31-possessive-adjectives**

- `emailMetadata.realWorldUse` "talk about who owns what" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Express ownership and possession" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn possessive pronouns to say 'it's mine'" (no field; the next-module teaser is computed from the outline)

**2024-02-01-possessive-pronouns**

- `emailMetadata.realWorldUse` "claim ownership and clarify who things belong to" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine everything you've learned" (no field; the next-module teaser is computed from the outline)

**2024-02-02-combining**

- `emailMetadata.realWorldUse` "have sophisticated conversations about ownership" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Complex sentence mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test your comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)

**2024-02-03-reading3**

- `emailMetadata.realWorldUse` "read French literature and authentic content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice advanced structures with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Natural French Flow": a reading has no concept cards
- `concepts[2]` concept "Complex Relationships": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "La Première Page (The First Page)" (the story's title comes from stories/)
- `glossary` 11 story glossary notes (a glossary row holds fr and en)

**2024-02-04-unit3-practice**

- `emailMetadata.realWorldUse` "form sophisticated French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 3 exam to prove your mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Movement & Possession Practice": a practice set teaches nothing
- `concepts[1]` concept "Motion Verb Fluency": a practice set teaches nothing
- `concepts[2]` concept "Pronoun Mastery": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-02-05-unit3-exam**

- `title` "Unit 3 Final Exam - Movement & Possession": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "have sophisticated conversations about movement and ownership" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced conversational French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 4 for everyday communication" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Movement & Possession Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Motion and Movement": a unit exam teaches nothing
- `concepts[2]` concept "Object Pronouns": a unit exam teaches nothing
- `concepts[3]` concept "Possession and Ownership": a unit exam teaches nothing
- `concepts[4]` concept "Contractions": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 3 (the outline places the exam)
- 26 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`

**2024-03-31-survival-phrases**

- `emailMetadata.realWorldUse` "survive and thrive in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Real-world travel ready" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master faire (to do/make) for daily activities" (no field; the next-module teaser is computed from the outline)

**2024-03-25-faire**

- `emailMetadata.realWorldUse` "talk about what you do and make" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add devoir to express obligations" (no field; the next-module teaser is computed from the outline)
- `exercises` 5 exercises the builder never shows (it uses exerciseConfig)

**2024-03-23-devoir**

- `emailMetadata.realWorldUse` "express obligations and what you must do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn parler to talk about speaking and communication" (no field; the next-module teaser is computed from the outline)

**2024-03-29-parler**

- `emailMetadata.realWorldUse` "talk about communication and languages" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn chercher and trouver to search and find things" (no field; the next-module teaser is computed from the outline)

**2024-10-22-search-find**

- `emailMetadata.realWorldUse` "search for and find things in daily life" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn negation to say what you don't do" (no field; the next-module teaser is computed from the outline)
- 7 × generic instruction dropped (Say '…'): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`

**2024-03-28-negation**

- `emailMetadata.realWorldUse` "express what you don't do or want" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Negative expressions mastered" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add time words to say when things happen" (no field; the next-module teaser is computed from the outline)
- 5 × generic instruction dropped (Say '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-04-01-time-adverbs**

- `emailMetadata.realWorldUse` "express when and how often things happen" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master more negation with modal verbs" (no field; the next-module teaser is computed from the outline)
- 23 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`

**2024-03-27-negation-2**

- `emailMetadata.realWorldUse` "express refusal and things you never do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add location words to describe where" (no field; the next-module teaser is computed from the outline)
- 10 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-26-location-adverbs**

- `emailMetadata.realWorldUse` "indicate locations and direct people" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add everyday nouns for daily life" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`

**2024-03-24-everyday-nouns**

- `emailMetadata.realWorldUse` "discuss daily life and the world around you" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- 21 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-03-30-reading-4**

- `emailMetadata.realWorldUse` "understand real French conversations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Authentic conversation comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Café Conversation Milestone": a reading has no concept cards
- `concepts[1]` concept "Real-World French": a reading has no concept cards
- `concepts[2]` concept "Cultural Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "La nouvelle époque de Marie (Marie's new life)" (the story's title comes from stories/)
- `glossary` 2 story glossary notes (a glossary row holds fr and en)

**2024-04-03-unit-4-practice**

- `emailMetadata.realWorldUse` "navigate daily French situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 4 exam to prove your practical French" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Survival French Practice": a practice set teaches nothing
- `concepts[1]` concept "Action Verb Mastery": a practice set teaches nothing
- `concepts[2]` concept "Negation and Politeness": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-04-02-unit-4-exam**

- `title` "Unit 4 Final Exam - Expression": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "handle everyday situations in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Practical French mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 5 for past tense and nuance" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Everyday Communication Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Essential Action Verbs": a unit exam teaches nothing
- `concepts[2]` concept "Negation and Politeness": a unit exam teaches nothing
- `concepts[3]` concept "Time and Space Orientation": a unit exam teaches nothing
- `concepts[4]` concept "Daily Life Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 4 (the outline places the exam)
- 40 × generic instruction dropped (Translate to French): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`

**2024-04-08-comparisons**

- `emailMetadata.realWorldUse` "compare and evaluate things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add slang comparisons for natural speech" (no field; the next-module teaser is computed from the outline)
- 10 × generic instruction dropped (Say "…"): `exerciseConfig.items[2].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-04-07-comparisons-slang**

- `emailMetadata.realWorldUse` "speak like a native with authentic slang" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add conditional forms for polite requests" (no field; the next-module teaser is computed from the outline)

**2024-04-09-conditionals**

- `emailMetadata.realWorldUse` "give advice and express possibilities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add 'would' for even more polite requests" (no field; the next-module teaser is computed from the outline)
- 13 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`

**2024-04-16-would-conditionals**

- `emailMetadata.realWorldUse` "make polite requests and express hypotheticals" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all Unit 5 skills with interactive exercises" (no field; the next-module teaser is computed from the outline)
- 14 × generic instruction dropped (Say "…"): `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`

**2024-04-04-aimer**

- `emailMetadata.realWorldUse` "express preferences and affection" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn past tense with être to say 'I was'" (no field; the next-module teaser is computed from the outline)
- 10 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`

**2024-04-10-etre-past**

- `emailMetadata.realWorldUse` "describe past situations and states" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense foundation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add avoir in past tense to say 'I had'" (no field; the next-module teaser is computed from the outline)
- 15 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`

**2024-04-05-avoir-past**

- `emailMetadata.realWorldUse` "talk about past possessions and experiences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add food vocabulary for restaurant conversations" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[14].instruction`

**2024-04-11-food-nouns**

- `emailMetadata.realWorldUse` "order food in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use manger and boire with food vocabulary" (no field; the next-module teaser is computed from the outline)
- 21 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-04-12-manger**

- `emailMetadata.realWorldUse` "talk about food and eating" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add boire to talk about drinks" (no field; the next-module teaser is computed from the outline)
- 14 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[24].instruction`

**2024-04-06-boire**

- `emailMetadata.realWorldUse` "order drinks and discuss beverages" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice reading comprehension with food context" (no field; the next-module teaser is computed from the outline)
- 15 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[25].instruction`

**2024-04-13-reading-5**

- `emailMetadata.realWorldUse` "enjoy French cultural and historical content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Cultural literacy achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all your skills with interactive exercises" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Art and History Milestone": a reading has no concept cards
- `concepts[1]` concept "French Art Culture": a reading has no concept cards
- `concepts[2]` concept "Past Tense Narrative": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "La fée verte (The Green Fairy)" (the story's title comes from stories/)

**2024-04-15-unit-5-practice**

- `emailMetadata.realWorldUse` "form nuanced French sentences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 5 exam to prove your mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Taste and Time Practice": a practice set teaches nothing
- `concepts[1]` concept "Past Tense Mastery": a practice set teaches nothing
- `concepts[2]` concept "Comparative Language": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-04-14-unit-5-exam**

- `title` "Unit 5 Final Exam - Sophistication": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "discuss past experiences and express preferences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense and nuanced expression achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 6 for advanced communication verbs" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Time and Taste Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Past Tense Foundation": a unit exam teaches nothing
- `concepts[2]` concept "Comparisons and Preferences": a unit exam teaches nothing
- `concepts[3]` concept "Conditional Thinking": a unit exam teaches nothing
- `concepts[4]` concept "Food and Time Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 5 (the outline places the exam)
- 65 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[43].instruction`, `exerciseConfig.items[44].instruction`, `exerciseConfig.items[45].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`, `exerciseConfig.items[61].instruction`, `exerciseConfig.items[62].instruction`, `exerciseConfig.items[63].instruction`, `exerciseConfig.items[64].instruction`, `exerciseConfig.items[65].instruction`, `exerciseConfig.items[66].instruction`, `exerciseConfig.items[67].instruction`, `exerciseConfig.items[68].instruction`, `exerciseConfig.items[69].instruction`

**2024-04-23-progressive-tenses**

- `emailMetadata.realWorldUse` "describe what's happening now and what will happen" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master dire to express what you say" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-suis-en-train: "'en train de' + infinitive = ongoing action happening now" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-elle-est-en-train: "Use 'est' (is) + en train de + infinitive" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-nous-sommes-en-train: "nous sommes (we are) + en train de + partir (to leave)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-j-etais-en-train: "Use past tense: j'étais (I was) + en train de + manger" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-ils-etaient-en-train: "ils étaient (they were) + en train de + parler" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-je-vais-manger: "aller + infinitive = near future (going to do)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-tu-vas-parler: "tu vas (you are going) + parler (to speak)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-nous-allons-partir: "nous allons (we are going) + partir (to leave)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-ils-vont-venir: "ils vont (they are going) + venir (to come)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-je-parlerai: "Future tense: infinitive + -rai (je parlerai)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-tu-mangeras: "Future tense: manger + -as (tu mangeras)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-il-partira: "Future tense: partir + -a (il partira)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-nous-viendrons: "Future tense: venir → viendr- + ons (irregular stem)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-j-irai: "Irregular future: aller → ir- + ai (j'irai)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-je-ne-peux-pas: "Negative modal: je ne peux pas + infinitive" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-je-ne-vais-pas: "Negative near future: je ne vais pas + aller" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-je-ne-devrais-pas: "Negative conditional: je ne devrais pas + infinitive" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-tu-ne-peux-pas: "tu ne peux pas (you can't) + faire ça (do that)" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-il-ne-le-fera: "Future negative: il ne le fera pas (he won't do it) - object pronoun 'le' before verb" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-j-allais-partir: "Past tense of aller (j'allais) + infinitive = was going to" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-nous-ne-pourrons-pas: "Future of pouvoir (pourrons) + negative + infinitive" (the item has a hint)
- 21 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`

**2024-04-20-dire**

- `emailMetadata.realWorldUse` "communicate what you and others say" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add prendre for taking things and transportation" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-dis: "Irregular: je dis (sounds like 'dee')" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-dis: "Same as je: tu dis" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-il-dit: "Third person: il dit (same pronunciation)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-disons: "nous disons - add -ons" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-dites: "⚠️ Irregular! vous dites (NOT disez)" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-disent: "ils disent - add -ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-dis-bonjour: "je dis (I say) + bonjour (hello)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-dis-la-verite: "tu dis (you say/tell) + la vérité (the truth)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-elle-dit-oui: "elle dit (she says) + oui (yes)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-nous-disons-une-histoire: "nous disons (we tell) + une histoire (a story)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-je-dis-que-c: "je dis que (I say that) + c'est bon (it's good)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-il-dit-qu-il: "il dit que (he says that) → qu'il (elision before vowel)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-ils-disent-que-c: "ils disent que (they say that) + c'est vrai (it's true)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-je-te-dis: "je te dis - object pronoun 'te' goes before verb" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-tu-me-dis: "tu me dis - object pronoun 'me' before verb" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-il-me-dit: "il me dit - me (to me) goes before the verb" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-elle-nous-dit: "elle nous dit - nous (to us) before verb" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-c-est-a-dire: "Common phrase: c'est-à-dire (that is to say, i.e.)" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-on-dit-que: "on dit que - 'on' = people in general" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-comme-on-dit: "Common expression: comme on dit (as they say)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-j-ai-dit: "Passé composé: j'ai dit (I said/have said)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-tu-m-as-dit: "tu m'as dit - object pronoun before auxiliary verb" (the item has a hint)
- 18 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`

**2024-04-22-prendre**

- `emailMetadata.realWorldUse` "talk about taking things and learning" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add donner to express giving" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-prends: "Irregular: je prends (with 's')" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-prends: "Same as je: tu prends" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-il-prend: "Third person: il prend (no 's'!)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-prenons: "nous prenons - add -ons" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-prenez: "vous prenez - add -ez" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-prennent: "ils prennent - double 'n' + silent -ent" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-prends-le-bus: "je prends (I take) + le bus (the bus) - very common phrase" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-prends-le-train: "tu prends (you take) + le train (the train)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-elle-prend-son-temps: "elle prend (she takes - no 's'!) + son temps (her time)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-je-prends-un-cafe: "In French, use 'prendre' for having food/drink: je prends un café" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-nous-prenons-la-voiture: "nous prenons (we take) + la voiture (the car)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-j-apprends: "j'apprends - double 'p' like prendre" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-j-apprends-le-francais: "j'apprends (I learn) + le français (French)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-tu-apprends-vite: "tu apprends (you learn) + vite (quickly)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-elle-apprend-l-anglais: "elle apprend (no 's'!) + l'anglais (English)" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-nous-apprenons-ensemble: "nous apprenons (we learn) + ensemble (together)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-je-comprends: "je comprends - essential phrase! Rank 61 in top 100 words" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-je-ne-comprends-pas: "Very useful: je ne comprends pas (I don't understand)" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-tu-comprends: "Common question: tu comprends? (do you understand?)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-il-comprend-le-francais: "il comprend (no 's'!) + le français" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-nous-comprenons-la-question: "nous comprenons (we understand) + la question" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-ils-ne-comprennent-pas: "ils ne comprennent pas - double 'n' + negative" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-j-ai-pris-le: "Passé composé: j'ai pris (irregular past participle)" (the item has a hint)
- `exerciseConfig.items[23].explanation` i-j-ai-beaucoup-appris: "j'ai beaucoup appris - adverb 'beaucoup' before past participle" (the item has a hint)
- 22 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`

**2024-10-22-donner**

- `emailMetadata.realWorldUse` "express giving and offering" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add mettre to talk about putting and placing" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`

**2024-04-21-mettre**

- `emailMetadata.realWorldUse` "talk about placing things and getting dressed" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add demander to ask for things" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-mets: "Irregular: je mets (single 't', silent 's')" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-mets: "Same as je: tu mets" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-elle-met: "Third person: elle met (no 's'!)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-mettons: "nous mettons - double 'tt' + ons" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-mettez: "vous mettez - double 'tt' + ez" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-mettent: "ils mettent - double 'tt' + ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-mets-la-table: "Common phrase: je mets la table (I set the table)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-peux-mettre-la: "tu peux (can you) + mettre la table (set the table)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-nous-mettons-la-table: "nous mettons (we put/set) + la table" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-je-mets-le-livre: "je mets (I put) + le livre (the book) + sur la table (on the table)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-tu-mets-ca-ici: "tu mets (you put) + ça (that) + ici (here)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-elle-met-son-sac: "elle met (she puts - no 's'!) + son sac (her bag) + dans la voiture (in the car)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-je-mets-un-manteau: "je mets (I put on) + un manteau (a coat)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-tu-mets-un-pantalon: "tu mets (you put on) + un pantalon (pants)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qu-est-ce-que: "qu'est-ce que (what) + tu mets (you wear/put on)" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-il-met-une-chemise: "il met (he puts on) + une chemise (a shirt)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-nous-mettons-nos-chaussures: "nous mettons (we put on) + nos chaussures (our shoes)" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-ca-met-du-temps: "Idiomatic: ça met du temps (it takes time) - can also say 'ça prend du temps'" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-ca-met-deux-heures: "ça met deux heures (it takes two hours)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-j-ai-mis: "Passé composé: j'ai mis (irregular past participle)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-j-ai-mis-la: "j'ai mis la table (I set the table - past)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-tu-as-mis-un: "tu as mis un manteau (you put on a coat - past)" (the item has a hint)
- 17 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`

**2024-04-19-demander**

- `emailMetadata.realWorldUse` "ask for help and information" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add commander to order food and products" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-demande: "Regular -ER verb: je demande" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-demandes: "Regular -ER: tu demandes (with -es)" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-il-demande: "Third person: il demande" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-demandons: "nous demandons - regular -ons ending" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-demandez: "vous demandez - regular -ez ending" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-demandent: "ils demandent - regular -ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-demande-de-l: "Very common: je demande de l'aide (I ask for help) - rank 63!" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-demandes-un-cafe: "tu demandes (you ask for) + un café (a coffee)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-elle-demande-l-addition: "elle demande l'addition (she asks for the bill) - restaurant phrase" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-nous-demandons-la-permission: "nous demandons la permission (we ask for permission)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-je-demande-pardon: "Polite expression: je demande pardon (I ask forgiveness / I apologize)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-je-demande-a-marie: "Use 'à' when asking someone: je demande à Marie" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-tu-demandes-a-ton: "tu demandes à ton père (you ask your father) - use 'à'" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-il-demande-a-sa: "il demande à sa mère (he asks his mother)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-je-te-demande: "je te demande - object pronoun 'te' before verb" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-tu-me-demandes: "tu me demandes - object pronoun 'me' before verb" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-il-me-demande: "il me demande - 'me' (to me) before verb" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-elle-nous-demande: "elle nous demande - 'nous' (us) before verb" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-je-demande-de-partir: "Use 'de' before infinitive: je demande de partir" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-il-me-demande-de: "il me demande de venir - object pronoun + de + infinitive" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-elle-nous-demande-d: "elle nous demande d'attendre - de → d' before vowel" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-ils-te-demandent-d: "ils te demandent d'aider (they ask you to help)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-pourquoi-tu-demandes: "pourquoi (why) + tu demandes (you ask)" (the item has a hint)
- `exerciseConfig.items[23].explanation` i-j-ai-demande: "Passé composé: j'ai demandé (regular -é past participle)" (the item has a hint)
- `exerciseConfig.items[24].explanation` i-tu-m-as-demande: "tu m'as demandé - object pronoun before auxiliary" (the item has a hint)
- 22 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`

**2024-04-18-commander**

- `emailMetadata.realWorldUse` "order food, drinks, and products" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express needs with avoir besoin de" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-je-commande: "Regular -ER verb: je commande" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-commandes: "Regular -ER: tu commandes (with -es)" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-elle-commande: "Third person: elle commande" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-nous-commandons: "nous commandons - regular -ons ending" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-vous-commandez: "vous commandez - regular -ez ending (also: 'are you ordering?')" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-ils-commandent: "ils commandent - regular -ent (silent)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-je-commande-un-cafe: "Very common: je commande un café (I order a coffee)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-tu-commandes-une-pizza: "tu commandes une pizza (you order a pizza)" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-il-commande-un-steak: "il commande un steak (he orders a steak)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-elle-commande-du-vin: "elle commande du vin (she orders wine) - use 'du' (some)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-nous-commandons-le-menu: "nous commandons le menu (we order the set menu)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-ils-commandent-le-dessert: "ils commandent le dessert (they order dessert)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-je-voudrais-commander: "Polite: je voudrais commander (I would like to order)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-vous-commandez-2: "Simple question waiters ask: vous commandez? (are you ordering?)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qu-est-ce-que: "qu'est-ce que (what) + tu commandes (you order)" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-je-commande-en-ligne: "je commande en ligne (I order online) - modern phrase" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-tu-commandes-sur-amazon: "tu commandes sur Amazon (you order on Amazon) - use 'sur'" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-nous-commandons-par-telephone: "nous commandons par téléphone (we order by phone) - use 'par'" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-je-ne-commande-pas: "je ne commande pas (I'm not ordering)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-tu-ne-commandes-pas: "tu ne commandes pas ça (you don't order that)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-j-ai-commande: "Passé composé: j'ai commandé (regular -é past participle)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-nous-avons-commande-une: "nous avons commandé une pizza (we ordered a pizza)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-ils-ont-commande-le: "ils ont commandé le dessert (they ordered dessert)" (the item has a hint)
- 20 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-04-17-besoin**

- `emailMetadata.realWorldUse` "express needs and necessities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Expand vocabulary with top 200 words" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-j-ai-besoin-d: "j'ai besoin d'aide - de → d' before vowel (aide)" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-tu-as-besoin-d: "tu as besoin d'argent (you need money) - d' before vowel" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-j-ai-besoin-de: "j'ai besoin de temps (I need time) - common phrase" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-il-a-besoin-d: "il a besoin d'eau (he needs water) - d' before vowel" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-elle-a-besoin-d: "elle a besoin d'une voiture (she needs a car) - d' before 'une'" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-nous-avons-besoin-de: "nous avons besoin de café (we need coffee)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-vous-avez-besoin-de: "vous avez besoin de sommeil (you need sleep)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-ils-ont-besoin-d: "ils ont besoin d'espace (they need space) - d' before vowel" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-j-ai-besoin-de-2: "j'ai besoin de manger (I need to eat) - de + infinitive" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-tu-as-besoin-de: "tu as besoin de partir (you need to leave) - de + infinitive" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-j-ai-besoin-de-3: "j'ai besoin de dormir (I need to sleep)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-elle-a-besoin-de: "elle a besoin de travailler (she needs to work)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-nous-avons-besoin-de-2: "nous avons besoin de parler (we need to talk)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-ils-ont-besoin-de: "ils ont besoin de comprendre (they need to understand)" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-de-quoi-tu-as: "de quoi (of what) + tu as besoin (you have need) - 'de quoi' stays together" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-tu-as-besoin-d-2: "Simple question: tu as besoin d'aide? (do you need help?)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-il-a-besoin-de: "il a besoin de ça? (does he need that?)" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-je-n-ai-pas: "Negative: je n'ai pas besoin d'aide - ne...pas around avoir" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-tu-n-as-pas: "tu n'as pas besoin de ça (you don't need that)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-elle-n-a-pas: "elle n'a pas besoin de partir (she doesn't need to leave)" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-nous-n-avons-pas: "nous n'avons pas besoin d'argent (we don't need money)" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-j-avais-besoin-d: "Past (imperfect): j'avais besoin d'aide (I needed/was needing help)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-tu-avais-besoin-de: "tu avais besoin de temps (you needed time)" (the item has a hint)
- 22 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`

**2024-04-25-top-200-nouns**

- `emailMetadata.realWorldUse` "discuss time, people, and abstract ideas" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Expanded vocabulary mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- `exerciseConfig.items[0].explanation` i-une-annee: "feminine: une année (a year) - for duration, use 'un an'" (the item has a hint)
- `exerciseConfig.items[1].explanation` i-une-fois: "une fois (once / one time) - deux fois (twice)" (the item has a hint)
- `exerciseConfig.items[2].explanation` i-un-moment: "masculine: un moment (a moment)" (the item has a hint)
- `exerciseConfig.items[3].explanation` i-une-heure: "feminine: une heure (one hour) - silent 'h'" (the item has a hint)
- `exerciseConfig.items[4].explanation` i-une-minute: "feminine: une minute (one minute)" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-le-debut: "masculine: le début (the beginning) - au début (at the beginning)" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-la-fin: "feminine: la fin (the end) - à la fin (at the end)" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-une-personne: "feminine: une personne (a person) - always feminine!" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-ma-famille: "feminine: ma famille (my family)" (the item has a hint)
- `exerciseConfig.items[9].explanation` i-mon-pere: "masculine: mon père (my father)" (the item has a hint)
- `exerciseConfig.items[10].explanation` i-ma-mere: "feminine: ma mère (my mother)" (the item has a hint)
- `exerciseConfig.items[11].explanation` i-mon-frere: "masculine: mon frère (my brother)" (the item has a hint)
- `exerciseConfig.items[12].explanation` i-ma-soeur: "feminine: ma sœur (my sister)" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-un-fils: "masculine: un fils (a son) - 's' is silent!" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-une-fille: "feminine: une fille (a daughter) - also means 'girl'" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-les-yeux: "masculine plural: les yeux - irregular! (singular: un œil)" (the item has a hint)
- `exerciseConfig.items[16].explanation` i-le-visage: "masculine: le visage (the face)" (the item has a hint)
- `exerciseConfig.items[17].explanation` i-le-corps: "masculine: le corps (the body) - 'p' and 's' are silent!" (the item has a hint)
- `exerciseConfig.items[18].explanation` i-le-coeur: "masculine: le cœur (the heart)" (the item has a hint)
- `exerciseConfig.items[19].explanation` i-la-voix: "feminine: la voix (the voice) - 'x' is silent!" (the item has a hint)
- `exerciseConfig.items[20].explanation` i-une-histoire: "feminine: une histoire (a story) - also means 'history'" (the item has a hint)
- `exerciseConfig.items[21].explanation` i-un-probleme: "masculine: un problème (a problem)" (the item has a hint)
- `exerciseConfig.items[22].explanation` i-une-question: "feminine: une question (a question)" (the item has a hint)
- `exerciseConfig.items[23].explanation` i-la-raison: "feminine: la raison (the reason)" (the item has a hint)
- `exerciseConfig.items[24].explanation` i-un-fait: "masculine: un fait (a fact) - silent 't'" (the item has a hint)
- `exerciseConfig.items[25].explanation` i-une-partie: "feminine: une partie (a part) - also means 'game'" (the item has a hint)
- `exerciseConfig.items[26].explanation` i-le-cote: "masculine: le côté (the side) - à côté de (next to)" (the item has a hint)
- `exerciseConfig.items[27].explanation` i-j-ai-un-probleme: "j'ai un problème (I have a problem) - very common phrase!" (the item has a hint)
- `exerciseConfig.items[28].explanation` i-j-ai-une-question: "j'ai une question (I have a question) - useful phrase!" (the item has a hint)
- `exerciseConfig.items[29].explanation` i-c-est-une-longue: "c'est une longue histoire (it's a long story) - common expression" (the item has a hint)
- `exerciseConfig.items[30].explanation` i-toute-ma-famille: "toute ma famille (my whole family) - 'toute' agrees with feminine 'famille'" (the item has a hint)
- `exerciseConfig.items[31].explanation` i-au-debut: "au début (at the beginning) - à + le = au" (the item has a hint)
- `exerciseConfig.items[32].explanation` i-a-la-fin: "à la fin (at the end) - common time expression" (the item has a hint)
- 33 × generic instruction dropped (Say "…"): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`

**2024-04-24-reading-6**

- `emailMetadata.realWorldUse` "understand French conversations about planning and communication" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced communication comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all Unit 6 skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Communication Milestone": a reading has no concept cards
- `concepts[1]` concept "Real-World Scenarios": a reading has no concept cards
- `concepts[2]` concept "Fluency Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Un Voyage en Famille" (the story's title comes from stories/)
- `exerciseConfig.items[5].prompt` "What will Marie see for the first time?" (repeats the question)

**2024-04-27-unit-6-practice**

- `emailMetadata.realWorldUse` "form sophisticated communication" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 6 exam to prove your fluency" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Fluency Practice": a practice set teaches nothing
- `concepts[1]` concept "Progressive Tense Mastery": a practice set teaches nothing
- `concepts[2]` concept "Communication Verb Fluency": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-04-26-unit-6-exam**

- `title` "Unit 6 Final Exam - Communication": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "communicate with advanced nuance and precision" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced communication fluency" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 7 for cognitive verbs" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Fluency and Mastery Achievement": a unit exam teaches nothing
- `concepts[1]` concept "Progressive Tenses": a unit exam teaches nothing
- `concepts[2]` concept "Essential Communication Verbs": a unit exam teaches nothing
- `concepts[3]` concept "Expressing Needs and Wants": a unit exam teaches nothing
- `concepts[4]` concept "Extensive Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 6 (the outline places the exam)
- 75 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[43].instruction`, `exerciseConfig.items[44].instruction`, `exerciseConfig.items[45].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`, `exerciseConfig.items[61].instruction`, `exerciseConfig.items[62].instruction`, `exerciseConfig.items[63].instruction`, `exerciseConfig.items[64].instruction`, `exerciseConfig.items[65].instruction`, `exerciseConfig.items[66].instruction`, `exerciseConfig.items[67].instruction`, `exerciseConfig.items[68].instruction`, `exerciseConfig.items[69].instruction`, `exerciseConfig.items[70].instruction`, `exerciseConfig.items[71].instruction`, `exerciseConfig.items[72].instruction`, `exerciseConfig.items[73].instruction`, `exerciseConfig.items[74].instruction`, `exerciseConfig.items[75].instruction`
- 1 × generic instruction dropped (What does '…' mean?): `exerciseConfig.items[5].instruction`

**2024-05-05-on-and-people**

- `emailMetadata.realWorldUse` "speak naturally about people in general" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Natural French pronoun usage" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add discourse markers for conversational flow" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[2].instruction`, `exercises[3].instruction`, `exercises[5].instruction`

**2024-05-09-studying-verbs**

- `emailMetadata.realWorldUse` "talk about studying and academic work" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master the most important pronoun: on (we/people)" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-04-learning-verbs**

- `emailMetadata.realWorldUse` "discuss learning and education" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add studying verbs to complete your learning vocabulary" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-04-29-comprendre**

- `emailMetadata.realWorldUse` "communicate understanding and confusion" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add penser to express your thoughts" (no field; the next-module teaser is computed from the outline)

**2024-05-08-savoir**

- `emailMetadata.realWorldUse` "express what you know and don't know" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Knowledge expression mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add connaître to talk about people and places you know" (no field; the next-module teaser is computed from the outline)

**2024-04-30-connaitre**

- `emailMetadata.realWorldUse` "talk about people and places you know" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add learning and studying verbs" (no field; the next-module teaser is computed from the outline)

**2024-05-06-penser**

- `emailMetadata.realWorldUse` "express opinions and thoughts" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add croire to express beliefs" (no field; the next-module teaser is computed from the outline)

**2024-05-01-croire**

- `emailMetadata.realWorldUse` "express beliefs and tentative opinions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add knowledge nouns to discuss learning concepts" (no field; the next-module teaser is computed from the outline)

**2024-05-03-knowledge-nouns**

- `emailMetadata.realWorldUse` "discuss education and ideas" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add discourse markers to sound like a native" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Translate '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-02-discourse-markers**

- `emailMetadata.realWorldUse` "speak with natural French rhythm and flow" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Natural conversational French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Complete modifiers with tout, même, mal" (no field; the next-module teaser is computed from the outline)
- 9 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[6].instruction`, `exercises[7].instruction`, `exercises[8].instruction`, `exercises[9].instruction`, `exercises[10].instruction`, `exercises[11].instruction`, `exercises[12].instruction`, `exercises[14].instruction`

**2024-04-28-comparison-modifiers**

- `emailMetadata.realWorldUse` "add nuance to comparisons and descriptions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- 6 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-07-reading-7**

- `emailMetadata.realWorldUse` "read French intellectual and educational content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Academic comprehension achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice Unit 7 cognitive skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Academic Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Educational Context": a reading has no concept cards
- `concepts[2]` concept "Cognitive Language Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "L'Art d'Apprendre" (the story's title comes from stories/)
- `glossary` 3 story glossary notes (a glossary row holds fr and en)

**2024-05-11-unit-7-practice**

- `emailMetadata.realWorldUse` "communicate intellectual ideas naturally" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 7 exam to prove your cognitive mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Cognitive Practice": a practice set teaches nothing
- `concepts[1]` concept "Knowledge Verb Mastery": a practice set teaches nothing
- `concepts[2]` concept "Learning Context Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-05-10-unit-7-exam**

- `title` "Unit 7 Final Exam - Knowledge & Learning": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "express thoughts, knowledge, and opinions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Cognitive expression mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 8 for daily routines and reflexive verbs" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Knowledge and Learning Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Cognitive Verb Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Learning and Teaching": a unit exam teaches nothing
- `concepts[3]` concept "On vs Nous Usage": a unit exam teaches nothing
- `concepts[4]` concept "Cultural and Academic Vocabulary": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 7 (the outline places the exam)
- 55 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`, `exerciseConfig.items[36].instruction`, `exerciseConfig.items[37].instruction`, `exerciseConfig.items[38].instruction`, `exerciseConfig.items[39].instruction`, `exerciseConfig.items[40].instruction`, `exerciseConfig.items[41].instruction`, `exerciseConfig.items[42].instruction`, `exerciseConfig.items[46].instruction`, `exerciseConfig.items[47].instruction`, `exerciseConfig.items[48].instruction`, `exerciseConfig.items[49].instruction`, `exerciseConfig.items[50].instruction`, `exerciseConfig.items[51].instruction`, `exerciseConfig.items[52].instruction`, `exerciseConfig.items[53].instruction`, `exerciseConfig.items[54].instruction`, `exerciseConfig.items[55].instruction`, `exerciseConfig.items[56].instruction`, `exerciseConfig.items[57].instruction`, `exerciseConfig.items[58].instruction`, `exerciseConfig.items[59].instruction`, `exerciseConfig.items[60].instruction`
- 1 × generic instruction dropped (What does '…' mean?): `exerciseConfig.items[5].instruction`

**2024-05-23-temporal-words**

- `emailMetadata.realWorldUse` "organize and tell stories chronologically" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Temporal sequencing mastered" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with daily life reading" (no field; the next-module teaser is computed from the outline)
- 7 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[2].instruction`, `exercises[6].instruction`, `exercises[7].instruction`, `exercises[8].instruction`, `exercises[9].instruction`, `exercises[10].instruction`

**2024-05-21-reflexive-pronouns**

- `emailMetadata.realWorldUse` "build foundation for daily routine expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn s'appeler to finally introduce yourself properly" (no field; the next-module teaser is computed from the outline)
- 1 × generic instruction dropped (Say '…'): `exercises[7].instruction`

**2024-05-22-s-appeler**

- `emailMetadata.realWorldUse` "introduce yourself and ask people's names" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Proper French introductions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Describe your morning routine" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[2].instruction`, `exercises[3].instruction`

**2024-05-19-morning-routine**

- `emailMetadata.realWorldUse` "talk about morning routines" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more daily reflexive verbs" (no field; the next-module teaser is computed from the outline)
- 5 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[3].instruction`, `exercises[4].instruction`, `exercises[5].instruction`

**2024-05-17-getting-ready**

- `emailMetadata.realWorldUse` "describe your complete morning routine" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn daily actions like sleep, work, and live" (no field; the next-module teaser is computed from the outline)
- 4 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[1].instruction`, `exercises[2].instruction`, `exercises[4].instruction`

**2024-05-16-daily-reflexives**

- `emailMetadata.realWorldUse` "describe daily mental and emotional states" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn getting ready and preparation verbs" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[2].instruction`, `exercises[4].instruction`

**2024-06-07-reflexive-past**

- `emailMetadata.realWorldUse` "describe past daily routines" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express mutual actions with reciprocal reflexives" (no field; the next-module teaser is computed from the outline)
- 2 × generic instruction dropped (Say '…'): `exercises[1].instruction`, `exercises[2].instruction`

**2024-06-06-reciprocal-reflexives**

- `emailMetadata.realWorldUse` "describe mutual relationships and actions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master the passé composé vs imparfait distinction" (no field; the next-module teaser is computed from the outline)
- 3 × generic instruction dropped (Say '…'): `exercises[0].instruction`, `exercises[3].instruction`, `exercises[4].instruction`

**2024-05-13-commands-tu**

- `emailMetadata.realWorldUse` "give instructions to friends" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add formal commands for polite instructions" (no field; the next-module teaser is computed from the outline)

**2024-05-14-commands-vous**

- `emailMetadata.realWorldUse` "give polite instructions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn irregular commands" (no field; the next-module teaser is computed from the outline)

**2024-05-18-irregular-commands**

- `emailMetadata.realWorldUse` "give common everyday instructions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Combine commands with pronouns" (no field; the next-module teaser is computed from the outline)

**2024-05-12-commands-pronouns**

- `emailMetadata.realWorldUse` "give precise instructions with objects" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add temporal words to sequence events" (no field; the next-module teaser is computed from the outline)

**2024-05-20-reading-8**

- `emailMetadata.realWorldUse` "understand French daily life narratives" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Daily routine comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all Unit 8 reflexive skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Daily Life Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Routine and Relationships": a reading has no concept cards
- `concepts[2]` concept "Temporal Narrative Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `readingPassage.title` "Ma Journée" (the story's title comes from stories/)

**2024-05-25-unit-8-practice**

- `emailMetadata.realWorldUse` "describe your daily life in French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 8 exam to prove your daily life mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Daily Life Practice": a practice set teaches nothing
- `concepts[1]` concept "Temporal Fluency": a practice set teaches nothing
- `concepts[2]` concept "Reflexive Mastery": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-05-24-unit-8-exam**

- `title` "Unit 8 Final Exam - Daily Life & Actions": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "talk about daily life and give directions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Daily routine fluency" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 9 for past tense mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Daily Life and Actions Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Temporal Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Reflexive Verbs": a unit exam teaches nothing
- `concepts[3]` concept "Routine and Commands": a unit exam teaches nothing
- `concepts[4]` concept "Reciprocal Actions": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 8 (the outline places the exam)
- 31 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`

**2024-05-26-causal-words**

- `emailMetadata.realWorldUse` "explain reasons and provide justifications" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add spatial prepositions to describe locations" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-08-spatial-prepositions**

- `emailMetadata.realWorldUse` "describe locations and give directions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more spatial relations for complete descriptions" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-28-more-spatial-relations**

- `emailMetadata.realWorldUse` "give precise directions and describe locations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start learning past tense with regular -ER verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-30-passe-compose-er**

- `emailMetadata.realWorldUse` "describe completed past actions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense foundation" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add irregular past participles" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-01-passe-compose-irregular-1**

- `emailMetadata.realWorldUse` "describe common past actions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more irregular past participles" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-02-passe-compose-irregular-2**

- `emailMetadata.realWorldUse` "describe past intentions and obligations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn motion verbs with être" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-31-passe-compose-etre**

- `emailMetadata.realWorldUse` "tell stories about where you went" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Motion verb past tense mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn past participle agreement rules" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-29-passe-compose-agreement**

- `emailMetadata.realWorldUse` "write grammatically correct past tense" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Form imparfait for all verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-05-27-imparfait-all-verbs**

- `emailMetadata.realWorldUse` "describe past habits and ongoing situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Imparfait mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Learn when to use passé composé vs imparfait" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-04-pc-vs-imparfait**

- `emailMetadata.realWorldUse` "tell sophisticated stories about the past" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense storytelling mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice composing complex past narratives" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-03-past-tense-composition**

- `emailMetadata.realWorldUse` "tell complete stories with all past tense elements" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Story composition mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test your storytelling with reading comprehension" (no field; the next-module teaser is computed from the outline)
- `unit` 9 (the outline places the module)
- `fillInBlanksSentences` 10 strings, never shown (the exercises hold the same sentences)

**2024-06-05-reading-9**

- `emailMetadata.realWorldUse` "read French stories and narratives" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense narrative comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all past tense skills" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Narrative Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Past Tense Narrative": a reading has no concept cards
- `concepts[2]` concept "Discourse Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unit` 9 (the outline places the module)
- `readingPassage.title` "Un Samedi à Paris" (the story's title comes from stories/)

**2024-06-10-unit-9-practice**

- `emailMetadata.realWorldUse` "tell complete stories about the past" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 9 exam to prove your storytelling mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Past Tense Practice": a practice set teaches nothing
- `concepts[1]` concept "Imparfait Mastery": a practice set teaches nothing
- `concepts[2]` concept "Discourse Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-06-09-unit-9-exam**

- `title` "Unit 9 Final Exam - Discourse & Past Tense": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "tell stories and describe past experiences" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Past tense storytelling mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 10 for advanced B2 expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Past Tenses and Discourse Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Imparfait Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Past Tense Contrast": a unit exam teaches nothing
- `concepts[3]` concept "Plus-que-parfait": a unit exam teaches nothing
- `concepts[4]` concept "Discourse Markers": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 9 (the outline places the exam)
- 35 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`

**2024-01-23-common-special-forms-1**

- `emailMetadata.realWorldUse` "build foundation for advanced French expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add more special forms" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-24-common-special-forms-2**

- `emailMetadata.realWorldUse` "express complex wishes and necessities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Use these forms in necessity phrases" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-28-necessity-phrases**

- `emailMetadata.realWorldUse` "express what needs to happen" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "B2 necessity expressions" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express wishes with je veux que" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-02-07-wish-phrases**

- `emailMetadata.realWorldUse` "express wishes about what others should do" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express emotions with je suis content que" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-25-emotion-phrases**

- `emailMetadata.realWorldUse` "express emotions about others" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Share opinions with je pense que" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-29-opinion-phrases**

- `emailMetadata.realWorldUse` "share opinions tactfully" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express hypothetical situations" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-27-hypothetical-phrases**

- `emailMetadata.realWorldUse` "express hypotheticals and daydreams" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Hypothetical thinking mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express past regrets with si j'avais su" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-30-past-regret-phrases**

- `emailMetadata.realWorldUse` "express regrets and missed opportunities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express 'had already' with j'avais déjà" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-01-26-had-already-phrases**

- `unit` 10 (the outline places the module)

**2024-01-22-common-adverbs**

- `emailMetadata.realWorldUse` "add nuance and emphasis to everything you say" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Express 'while doing' with en + present participle" (no field; the next-module teaser is computed from the outline)
- `unit` 10 (the outline places the module)

**2024-02-06-while-doing-phrases**

- `unit` 10 (the outline places the module)

**2024-02-02-service-phrases**

- `unit` 10 (the outline places the module)

**2024-01-21-before-phrases**

- `unit` 10 (the outline places the module)

**2024-02-03-so-that-phrases**

- `unit` 10 (the outline places the module)

**2024-01-20-although-phrases**

- `unit` 10 (the outline places the module)

**2024-01-31-possibility-phrases**

- `unit` 10 (the outline places the module)

**2024-02-01-reading-10**

- `emailMetadata.realWorldUse` "read French philosophical and emotional content" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "B2 reading comprehension" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all B2 expressions" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Expertise Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Sophisticated Discourse": a reading has no concept cards
- `concepts[2]` concept "Mastery Integration": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unit` 10 (the outline places the module)
- `readingPassage.title` "Un Rêve à Paris" (the story's title comes from stories/)

**2024-02-05-unit-10-practice**

- `emailMetadata.realWorldUse` "communicate at B2 level" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 10 exam to prove your B2 mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Mastery Practice": a practice set teaches nothing
- `concepts[1]` concept "Relative Pronoun Mastery": a practice set teaches nothing
- `concepts[2]` concept "Subjunctive Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-02-04-unit-10-exam**

- `title` "Unit 10 Final Exam - Mastery & Nuance": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "express complex thoughts and hypothetical situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "B2 level mastery achieved" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 11 for complete top 100 word coverage" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Mastery and Nuance Achievement": a unit exam teaches nothing
- `concepts[1]` concept "Relative Pronouns Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Subjunctive Mood": a unit exam teaches nothing
- `concepts[3]` concept "Indefinite Pronouns": a unit exam teaches nothing
- `concepts[4]` concept "Advanced Hypotheticals": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 10 (the outline places the exam)
- 30 × generic instruction dropped (Translate to French): `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`, `exerciseConfig.items[18].instruction`, `exerciseConfig.items[19].instruction`, `exerciseConfig.items[20].instruction`, `exerciseConfig.items[21].instruction`, `exerciseConfig.items[22].instruction`, `exerciseConfig.items[23].instruction`, `exerciseConfig.items[24].instruction`, `exerciseConfig.items[25].instruction`, `exerciseConfig.items[26].instruction`, `exerciseConfig.items[27].instruction`, `exerciseConfig.items[28].instruction`, `exerciseConfig.items[29].instruction`, `exerciseConfig.items[30].instruction`, `exerciseConfig.items[31].instruction`, `exerciseConfig.items[32].instruction`, `exerciseConfig.items[33].instruction`, `exerciseConfig.items[34].instruction`, `exerciseConfig.items[35].instruction`

**2024-02-08-age-personal-info**

- `emailMetadata.realWorldUse` "share personal information in French" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Personal information mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Complete top 100 words with donner" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)

**2024-02-10-donner**

- `emailMetadata.realWorldUse` "talk about giving and sharing" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Top 100 word completion milestone" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add daily action verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 4 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[8].instruction`
- 1 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[7].instruction`

**2024-05-15-daily-actions-1**

- `emailMetadata.realWorldUse` "describe fundamental daily activities" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master commands to give instructions" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 9 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`
- 1 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[9].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-02-13-search-and-find**

- `emailMetadata.realWorldUse` "search for and find things" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add perception verbs to complete sensory vocabulary" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 6 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[6].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[13].instruction`
- 1 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[7].instruction`

**2024-02-11-perception-verbs**

- `emailMetadata.realWorldUse` "talk about what you listen to and watch" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add social situation verbs" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 6 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`
- 2 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`

**2024-02-14-social-situations**

- `emailMetadata.realWorldUse` "coordinate meetings and social events" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master directions and navigation" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 9 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`
- 3 × generic instruction dropped (Say: '…'): `exerciseConfig.items[9].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[13].instruction`
- 3 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[10].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[14].instruction`

**2024-02-09-directions-navigation**

- `emailMetadata.realWorldUse` "navigate and give directions in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Navigation mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Test comprehension with cultural reading" (no field; the next-module teaser is computed from the outline)
- `unit` 11 (the outline places the module)
- 7 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`
- 4 × generic instruction dropped (Say: '…'): `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`
- 2 × generic instruction dropped (Ask: '…'): `exerciseConfig.items[9].instruction`, `exerciseConfig.items[12].instruction`

**2024-02-12-reading-11**

- `emailMetadata.realWorldUse` "read authentic French publications" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced reading mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Practice all essential vocabulary" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Final Reading Milestone": a reading has no concept cards
- `concepts[1]` concept "Complete French Mastery": a reading has no concept cards
- `concepts[2]` concept "B2+ Level Achievement": a reading has no concept cards
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unit` 11 (the outline places the module)
- `readingPassage.title` "La France d'Aujourd'hui : Un Pays en Mouvement" (the story's title comes from stories/)

**2024-02-16-unit-11-practice**

- `emailMetadata.realWorldUse` "handle all essential daily situations" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Take the Unit 11 exam to achieve complete top 100 mastery" (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Structures Practice": a practice set teaches nothing
- `concepts[1]` concept "Future and Conditional Mastery": a practice set teaches nothing
- `concepts[2]` concept "Passive and Causative Integration": a practice set teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)

**2024-02-15-unit-11-exam**

- `title` "Unit 11 Final Exam - Daily Essentials & Practical Communication": a unit exam's title comes from the outline ("Unit exam · <unit name>")
- `emailMetadata.realWorldUse` "handle any daily situation in France" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Complete top 100 word mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Start Unit 12 for advanced question mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.isUnitCompletion` true (no field; the next-module teaser is computed from the outline)
- `concepts[0]` concept "Advanced Structures Mastery": a unit exam teaches nothing
- `concepts[1]` concept "Future Tense Mastery": a unit exam teaches nothing
- `concepts[2]` concept "Conditional Mood": a unit exam teaches nothing
- `concepts[3]` concept "Passive Voice": a unit exam teaches nothing
- `concepts[4]` concept "Causative Faire": a unit exam teaches nothing
- `concepts[5]` concept "Gerunds and Transitions": a unit exam teaches nothing
- `skipStudyMode` true (Study Mode belongs to lessons only)
- `unitNumber` 11 (the outline places the exam)
- 4 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-15-nature-animals**

- `emailMetadata.realWorldUse` "discuss nature and animals" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Add movement verbs for describing nature" (no field; the next-module teaser is computed from the outline)
- `unit` 12 (the outline places the module)
- `exerciseConfig.items[12].explanation` i-un-oiseau-bleu: "In French, color comes AFTER the noun: un oiseau bleu (a bird blue)" (the item has a hint)
- 15 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-03-16-movement-verbs**

- `unit` 12 (the outline places the module)
- 12 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`
- 6 × generic instruction dropped (Say '…'): `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-17-natural-phenomena**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[11].explanation` i-le-soleil-rend-l: "CAUSATIVE PATTERN: subject + rend + object + adjective. The sun MAKES grass green!" (the item has a hint)
- 5 × generic instruction dropped (Translate to French): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`
- 8 × generic instruction dropped (Say '…'): `exerciseConfig.items[1].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`, `exerciseConfig.items[14].instruction`

**2024-03-15-questce-qui-que**

- `emailMetadata.realWorldUse` "ask any 'what' question correctly" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.milestone` "Advanced question mastery" (no field; the next-module teaser is computed from the outline)
- `emailMetadata.nextModuleTeaser` "Master complex 'why' questions" (no field; the next-module teaser is computed from the outline)
- `unit` 12 (the outline places the module)
- `exerciseConfig.items[2].explanation` i-qu-est-ce-qui-3: "Perfect! 'Qu'est-ce qui fait' = What does (subject). The subject is doing the action of 'making shine'." (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qu-est-ce-qui-9: "Transform any statement into a question by identifying the subject and using qu'est-ce qui!" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-qu-est-ce-que-7: "Transform statements with objects by using qu'est-ce que + subject + verb!" (the item has a hint)

**2024-03-19-pourquoi-complex**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[12].explanation` i-pourquoi-est-ce-qu-4: "Use 'en train de' for ongoing actions - you learned this earlier!" (the item has a hint)
- 16 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[14].instruction`, `exerciseConfig.items[15].instruction`, `exerciseConfig.items[16].instruction`, `exerciseConfig.items[17].instruction`

**2024-03-20-comment-complex**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[13].explanation` i-comment-nage-une-tortue: "In formal French, invert verb and subject: Comment nage une tortue? Same meaning as 'Comment est-ce qu'une tortue nage?'" (the item has a hint)
- `exerciseConfig.items[15].explanation` i-comment-est-ce-qu-8: "Both 'comment est-ce qu'on fait ça?' and 'comment fait-on ça?' are correct!" (the item has a hint)
- 13 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`

**2024-03-16-quiest-qui-que**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[13].explanation` i-qui-est-ce-qui-8: "Both qu'est-ce qui (what) and qui est-ce qui (who) use QUI for subject questions!" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-qui-est-ce-que-7: "Both qu'est-ce que (what) and qui est-ce que (who) use QUE for object questions!" (the item has a hint)

**2024-03-22-inversion-questions**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[5].explanation` i-pourquoi-a-t-il: "Add -t- between vowel-ending verb and il/elle for liaison: a-t-il" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-pourquoi-les-nuages-sont: "With noun subjects, keep noun then add inverted pronoun: les nuages sont-ils" (the item has a hint)
- `exerciseConfig.items[14].explanation` i-comment-fais-tu-ca-2: "Both forms mean the same! Informal: Comment est-ce que tu fais ça? Formal: Comment fais-tu ça?" (the item has a hint)

**2024-03-23-embedded-questions**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[0].explanation` i-je-me-demande-pourquoi: "After 'je me demande', use statement order - no est-ce que needed!" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-je-me-demande-pourquoi-3: "Transform direct questions to embedded by removing est-ce que!" (the item has a hint)
- 9 × generic instruction dropped (Say '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[12].instruction`
- 4 × generic instruction dropped (Ask '…'): `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`

**2024-03-24-rhetorical-negative**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[1].explanation` i-n-est-ce-pas-2: "N'est-ce pas? at the end of a statement = 'right?' or 'isn't it?'" (the item has a hint)
- `exerciseConfig.items[5].explanation` i-comment-ne-pas-aimer: "Rhetorical question - implies everyone DOES love it!" (the item has a hint)
- `exerciseConfig.items[6].explanation` i-qui-ne-voudrait-pas: "Rhetorical question - implies everyone WOULD want it!" (the item has a hint)
- `exerciseConfig.items[7].explanation` i-pourquoi-ne-pas-essayer: "Rhetorical suggestion - means 'you should try!'" (the item has a hint)
- 5 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[10].instruction`

**2024-03-25-multi-clause-questions**

- `unit` 12 (the outline places the module)
- `exerciseConfig.items[0].explanation` i-pourquoi-est-ce-qu: "Combining question with Unit 10 necessity phrase!" (the item has a hint)
- `exerciseConfig.items[8].explanation` i-qu-est-ce-qui: "Conditional causative question - hypothetical 'would make'" (the item has a hint)
- `exerciseConfig.items[13].explanation` i-comment-est-ce-que-3: "Peak complexity! Question + opinion + conditional + causative - you've mastered it all!" (the item has a hint)
- 14 × generic instruction dropped (Ask '…'): `exerciseConfig.items[0].instruction`, `exerciseConfig.items[1].instruction`, `exerciseConfig.items[2].instruction`, `exerciseConfig.items[3].instruction`, `exerciseConfig.items[4].instruction`, `exerciseConfig.items[5].instruction`, `exerciseConfig.items[6].instruction`, `exerciseConfig.items[7].instruction`, `exerciseConfig.items[8].instruction`, `exerciseConfig.items[9].instruction`, `exerciseConfig.items[10].instruction`, `exerciseConfig.items[11].instruction`, `exerciseConfig.items[12].instruction`, `exerciseConfig.items[13].instruction`

**2024-04-01-alphabet**

- `id` "alphabet" (today's page slug; the module_key names the page)

**2024-04-02-numbers**

- `id` "numbers" (today's page slug; the module_key names the page)

**2024-04-03-days-months**

- `id` "days-months" (today's page slug; the module_key names the page)

**2024-04-04-holidays**

- `id` "holidays" (today's page slug; the module_key names the page)

**2024-04-05-colors**

- `id` "colors" (today's page slug; the module_key names the page)

**2024-04-06-french-countries**

- `id` "french-countries" (today's page slug; the module_key names the page)

**2024-04-07-language-stats**

- `id` "language-stats" (today's page slug; the module_key names the page)

**2024-04-08-spelling-patterns**

- `sections` 6 category icons (emoji; no field)

**2024-12-18-pronunciation-test**

- `emailMetadata.realWorldUse` "speak French confidently with clear pronunciation" (no field; a Reference page has no next module)
- `emailMetadata.nextModuleTeaser` "Continue with conversation practice" (no field; a Reference page has no next module)

## Text written differently

The same words, moved into a field of the new shape.

**2024-01-02-etre**

- `items[5].prompt` i-vous-etes: prompt "you are (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-sont: prompt "they are (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-sont: prompt "they are (all feminine)" joined to the instruction (a transform has no cue field)

**2024-01-04-avoir**

- `items[5].prompt` i-vous-avez: prompt "you have (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-ont: prompt "they have (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-ont: prompt "they have (all feminine)" joined to the instruction (a transform has no cue field)

**2024-10-21-cognates-help**

- `title` "Cognates - French and English Share Many Words" is L's title "Cognates"

**2024-10-20-liaison-help**

- `title` "French Flow - Liaison Help" is L's title "French Flow · Liaison"
- `parts` "Silent letters at the end" from LiaisonHelp.jsx (L's copy predates it)
- `parts` "Elision: l'ami, j'ai" from LiaisonHelp.jsx (L's copy predates it)

**2024-01-09-reading1**

- `passage` story text: added: "Paul, un chat et un chien."
- `passage` story text: added: "Marie, la maison et la voiture."
- `passage` story text: added: "Les amis ont des livres et des chats."
- `passage` story text: added: "Les amis, les enfants, les chiens et le chat."
- `passage` story text: added: "Au revoir, Paul et Marie !"

**2024-01-10-unit1-practice**

- `items[4].blanks` i-un-et: 2 blank hints joined into one hint
- `items[6].blanks` i-avez-ou: 2 blank hints joined into one hint
- `items[10].blanks` i-mais-aussi: 2 blank hints joined into one hint
- `items[11].blanks` i-la-ou: 2 blank hints joined into one hint
- 12 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`

**2026-11-24-negation-guide**

- `guide.sections[1].rows` 2 row notes joined into the part's note (L's lines have no note cell)
- `line` the guide row line is the description (the source has no line)

**2024-01-17-voir**

- `items[0].prompt` i-je-vois: prompt "I see / I am seeing" joined to the instruction (a transform has no cue field)
- `items[1].prompt` i-tu-vois: prompt "you see / you are seeing (informal)" joined to the instruction (a transform has no cue field)
- `items[2].prompt` i-il-voit: prompt "he sees / he is seeing" joined to the instruction (a transform has no cue field)
- `items[3].prompt` i-elle-voit: prompt "she sees / she is seeing" joined to the instruction (a transform has no cue field)
- `items[4].prompt` i-nous-voyons: prompt "we see / we are seeing" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-voyez: prompt "you see / you are seeing (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-voient: prompt "they see / they are seeing (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-voient: prompt "they see / they are seeing (all feminine)" joined to the instruction (a transform has no cue field)

**2024-01-22-reading2**

- `passage` story text: added: "Sophie et Thomas à Caen."
- `passage` story text: added: "Marie, la nouvelle voiture et le chien à Honfleur."
- `passage` story text: added: "Les vieilles et belles maisons de Bayeux."
- `passage` story text: added: "La petite maison de Pierre à Rouen."
- `passage` story text: added: "Le Mont-Saint-Michel."
- `passage` story text: added: "Il est très grand !"

**2024-01-23-unit2-practice**

- `items[10].blanks` i-veux-cette: 2 blank hints joined into one hint
- `items[11].blanks` i-sous-voiture: 2 blank hints joined into one hint
- `items[12].blanks` i-que-tu: 2 blank hints joined into one hint
- `items[13].blanks` i-peut-voir: 2 blank hints joined into one hint
- `items[14].blanks` i-ce-ces: 2 blank hints joined into one hint
- `items[18].blanks` i-avoir-ces: 2 blank hints joined into one hint
- `items[19].blanks` i-chez-toi: 2 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-02-03-reading3**

- `passage[2].fr` italic markup removed: *Le Comte de Monte-Cristo*
- `passage[6].fr` italic markup removed: *Vingt mille lieues sous les mers*
- `passage` story text: added: "Sophie et Marc à Paris."
- `passage` story text: added: "Le nouveau livre de Sophie."
- `passage` story text: added: "Paul et son jeune enfant à Montmartre."
- `passage` story text: added: "Un nouveau livre pour Sophie."
- `passage` story text: added: "Un bon café au Café de la Paix."

**2024-02-04-unit3-practice**

- `items[12].blanks` i-vas-au: 2 blank hints joined into one hint
- `items[13].blanks` i-les-vois: 2 blank hints joined into one hint
- `items[14].blanks` i-vient-du: 2 blank hints joined into one hint
- `items[15].blanks` i-ton-ta: 2 blank hints joined into one hint
- `items[16].blanks` i-vont-ses: 2 blank hints joined into one hint
- `items[17].blanks` i-le-au: 2 blank hints joined into one hint
- `items[18].blanks` i-pars-ton-au: 3 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-03-29-parler**

- `items[0].prompt` i-je-parle: prompt "I speak / I talk" joined to the instruction (a transform has no cue field)
- `items[1].prompt` i-tu-parles: prompt "you speak / you talk (informal)" joined to the instruction (a transform has no cue field)
- `items[2].prompt` i-il-parle: prompt "he speaks / he talks" joined to the instruction (a transform has no cue field)
- `items[3].prompt` i-elle-parle: prompt "she speaks / she talks" joined to the instruction (a transform has no cue field)
- `items[4].prompt` i-nous-parlons: prompt "we speak / we talk" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-parlez: prompt "you speak / you talk (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-parlent: prompt "they speak / they talk (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-parlent: prompt "they speak / they talk (all feminine)" joined to the instruction (a transform has no cue field)

**2024-03-30-reading-4**

- `passage[21].speaker` "La femme" names the speaker; the English line said "The woman"
- `passage[23].speaker` "La femme" names the speaker; the English line said "The woman"
- `passage` story text: added: "Marie doit aller au travail."
- `passage` story text: added: "Marie et Paul dans la rue."
- `passage` story text: "Ce soir au café:" → "Ce soir au café"
- `passage` story text: added: "Ce soir, au café Les Éditeurs."
- `passage` story text: added: "Du pain et de l'eau."
- `passage` story text: added: "Marie aime cette ville."

**2024-04-03-unit-4-practice**

- `items[4].blanks` i-ne-pas: 2 blank hints joined into one hint
- `items[12].blanks` i-ne-pas-2: 2 blank hints joined into one hint
- `items[13].blanks` i-dois-maintenant: 2 blank hints joined into one hint
- `items[14].blanks` i-parlons-ici: 2 blank hints joined into one hint
- `items[15].blanks` i-ne-jamais: 2 blank hints joined into one hint
- `items[16].blanks` i-ne-pas-3: 2 blank hints joined into one hint
- `items[18].blanks` i-fais-demain: 2 blank hints joined into one hint
- `items[19].blanks` i-n-pas-ici: 3 blank hints joined into one hint
- 20 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-04-13-reading-5**

- `passage` story text: added: "La ville d'Arles."
- `passage` story text: added: "Vincent van Gogh et Paul Gauguin se retrouvent à leur café préféré pour boire leur boisson favorite, l'absinthe."
- `passage` story text: added: "On dit parfois qu'elle fait voir des fées vertes."
- `passage` story text: added: "Vincent van Gogh et Paul Gauguin parlent dans un café à Arles."
- `passage` story text: added: "Le serveur apporte leurs absinthes."
- `passage` story text: added: "Ils boivent beaucoup."
- `passage` story text: added: "Ils l'aiment."
- `passage` story text: added: "Vincent part pour son hôtel."
- `passage` story text: added: "Il trouve ses peintures."
- `passage` story text: added: "Il revient au café."
- `passage` story text: added: "Ils boivent encore de l'absinthe."
- `passage` story text: added: "Ils sont au café toute la nuit."
- `passage` story text: added: "Vincent fait son tableau."
- `passage` story text: added: "Paul boit son absinthe avec lui."
- `readingPassage.subtitle` the subtitle is a passage block in the story

**2024-04-15-unit-5-practice**

- `items[31].blanks` i-devrions-au: 2 blank hints joined into one hint
- `items[32].blanks` i-avais-manger: 2 blank hints joined into one hint
- `items[33].blanks` i-etait-mange: 2 blank hints joined into one hint
- 37 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`, `items[21].instruction`, `items[22].instruction`, `items[23].instruction`, `items[24].instruction`, `items[25].instruction`, `items[26].instruction`, `items[27].instruction`, `items[28].instruction`, `items[29].instruction`, `items[30].instruction`, `items[31].instruction`, `items[32].instruction`, `items[33].instruction`, `items[34].instruction`, `items[35].instruction`, `items[36].instruction`

**2024-04-24-reading-6**

- `passage[1].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[4].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[6].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[8].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[10].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[13].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[16].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[18].speaker` "Le père" names the speaker; the English line said "Father"
- `passage[20].speaker` "La mère" names the speaker; the English line said "Mother"
- `passage[22].speaker` "Le père" names the speaker; the English line said "Father"
- `passage` story text: added: "Le père, la mère, Marie et son frère à la maison."
- `passage` story text: added: "Marie peut prendre trois livres."
- `passage` story text: added: "Dans le train, la famille mange du pain et du fromage."
- `passage` story text: added: "Marie voit la Tour Eiffel pour la première fois."
- `vocabularyReference[58]` "la ville" ("city") is listed twice; one card, notes joined

**2024-04-27-unit-6-practice**

- 50 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`, `items[21].instruction`, `items[22].instruction`, `items[23].instruction`, `items[24].instruction`, `items[25].instruction`, `items[26].instruction`, `items[27].instruction`, `items[28].instruction`, `items[29].instruction`, `items[30].instruction`, `items[31].instruction`, `items[32].instruction`, `items[33].instruction`, `items[34].instruction`, `items[35].instruction`, `items[36].instruction`, `items[37].instruction`, `items[38].instruction`, `items[39].instruction`, `items[40].instruction`, `items[41].instruction`, `items[42].instruction`, `items[43].instruction`, `items[44].instruction`, `items[45].instruction`, `items[46].instruction`, `items[47].instruction`, `items[48].instruction`, `items[49].instruction`

**2024-04-29-comprendre**

- `items[5].prompt` i-vous-comprenez: prompt "you understand (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-comprennent: prompt "they understand (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-comprennent: prompt "they understand (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-08-savoir**

- `items[5].prompt` i-vous-savez: prompt "you know (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-savent: prompt "they know (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-savent: prompt "they know (all feminine)" joined to the instruction (a transform has no cue field)

**2024-04-30-connaitre**

- `items[0].prompt` i-je-connais: prompt "I know (people/places)" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-connaissez: prompt "you know (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-connaissent: prompt "they know (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-connaissent: prompt "they know (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-06-penser**

- `items[5].prompt` i-vous-pensez: prompt "you think (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-pensent: prompt "they think (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-pensent: prompt "they think (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-01-croire**

- `items[1].prompt` i-tu-crois: prompt "you believe / you think (informal)" joined to the instruction (a transform has no cue field)
- `items[2].prompt` i-il-croit: prompt "he believes / he thinks" joined to the instruction (a transform has no cue field)
- `items[3].prompt` i-elle-croit: prompt "she believes / she thinks" joined to the instruction (a transform has no cue field)
- `items[4].prompt` i-nous-croyons: prompt "we believe / we think" joined to the instruction (a transform has no cue field)
- `items[5].prompt` i-vous-croyez: prompt "you believe / you think (formal or plural)" joined to the instruction (a transform has no cue field)
- `items[6].prompt` i-ils-croient: prompt "they believe / they think (masculine or mixed)" joined to the instruction (a transform has no cue field)
- `items[7].prompt` i-elles-croient: prompt "they believe / they think (all feminine)" joined to the instruction (a transform has no cue field)

**2024-05-07-reading-7**

- `passage` story text: added: "Une étudiante pense à une grande question."
- `passage` story text: "D'abord, on doit demander des questions." → "D'abord, on doit poser des questions."
- `passage` story text: "Si on ne demande pas de questions, on ne pense pas." → "Si on ne pose pas de questions, on ne pense pas."
- `passage` story text: added: "Socrate pose des questions à ses étudiants."
- `passage` story text: added: "Elle révise."
- `passage` story text: added: "Elle voit les choses entre les idées."
- `passage` story text: added: "L'apprentissage est un voyage."

**2024-05-11-unit-7-practice**

- `items[15].blanks` i-sais-connais: 2 blank hints joined into one hint
- `items[23].blanks` i-on-pense-apprendre: 2 blank hints joined into one hint
- 24 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`, `items[21].instruction`, `items[22].instruction`, `items[23].instruction`

**2024-05-10-unit-7-exam**

- `items[43].prompt` i-you-know: prompt "quoi (at end)": the instruction says it, and the French "quoi" is shown

**2024-05-23-temporal-words**

- `vocabularyReference[7]` "après" ("after / afterwards") is listed twice; one card, notes joined

**2024-05-20-reading-8**

- `passage` story text: added: "Sept heures."
- `passage` story text: added: "Marie pense à sa journée."
- `passage` story text: added: "Marie prend son café."
- `passage` story text: added: "À la Sorbonne, les étudiants s'aident."
- `passage` story text: added: "Marie mange avec ses amis."
- `passage` story text: added: "Ils se parlent en français."
- `passage` story text: added: "Le soir, Marie rentre chez elle."

**2024-05-25-unit-8-practice**

- `items[0].blanks` i-d-abord-ensuite: 2 blank hints joined into one hint
- `items[20].blanks` i-apres-m-habille-me: 3 blank hints joined into one hint
- 21 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`, `items[19].instruction`, `items[20].instruction`

**2024-05-26-causal-words**

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-08-spatial-prepositions**

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-28-more-spatial-relations**

- `vocabularyReference[9].example` "C'est proche" is example_fr
- `vocabularyReference[10].usage` "adjective" added to the note
- `vocabularyReference[10].example` "un pays lointain" is example_fr
- `vocabularyReference[11].usage` "adverb" added to the note
- `vocabularyReference[11].example` "près d'ici" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-30-passe-compose-er**

- `vocabularyReference[6].example` "J'ai travaillé hier" is example_fr
- `vocabularyReference[7].usage` "past action" added to the note
- `vocabularyReference[7].example` "J'ai écouté de la musique" is example_fr
- `vocabularyReference[8].usage` "past action" added to the note
- `vocabularyReference[8].example` "J'ai regardé la télé" is example_fr
- `vocabularyReference[9].usage` "past action" added to the note
- `vocabularyReference[9].example` "J'ai demandé une question" is example_fr
- `vocabularyReference[10].usage` "time marker" added to the note
- `vocabularyReference[10].example` "Hier, j'ai mangé" is example_fr
- `vocabularyReference[11].usage` "adverb (between avoir and past participle)" added to the note
- `vocabularyReference[11].example` "J'ai déjà mangé" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-01-passe-compose-irregular-1**

- `vocabularyReference[8].example` "J'ai eu de la chance" is example_fr
- `vocabularyReference[9].usage` "plural noun" added to the note
- `vocabularyReference[9].example` "faire ses devoirs" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-02-passe-compose-irregular-2**

- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-31-passe-compose-etre**

- 16 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-29-passe-compose-agreement**

- `vocabularyReference[4].agreement` "masculine or mixed plural (+s)" added to the note
- `vocabularyReference[4].example` "Pierre et moi, nous sommes allés" is example_fr
- `vocabularyReference[6].agreement` "masculine singular (no change)" added to the note
- `vocabularyReference[6].example` "Monsieur, vous êtes allé où?" is example_fr
- `vocabularyReference[7].agreement` "feminine singular (+e)" added to the note
- `vocabularyReference[7].example` "Madame, vous êtes allée où?" is example_fr
- `vocabularyReference[8].agreement` "masculine plural (+s)" added to the note
- `vocabularyReference[8].example` "Les garçons, vous êtes allés où?" is example_fr
- `vocabularyReference[9].agreement` "feminine plural (+es)" added to the note
- `vocabularyReference[9].example` "Les filles, vous êtes allées où?" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-05-27-imparfait-all-verbs**

- `vocabularyReference[8].example` "chaque jour, chaque samedi" is example_fr
- 18 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`, `items[17].prompt`

**2024-06-04-pc-vs-imparfait**

- 17 × "Complete:" prefix dropped; the sentence is the text: `items[0].prompt`, `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`, `items[15].prompt`, `items[16].prompt`

**2024-06-03-past-tense-composition**

- 1 × "Complete the story:" prefix dropped; the sentence is the text: `items[0].prompt`
- 14 × "Complete:" prefix dropped; the sentence is the text: `items[1].prompt`, `items[2].prompt`, `items[3].prompt`, `items[4].prompt`, `items[5].prompt`, `items[6].prompt`, `items[7].prompt`, `items[8].prompt`, `items[9].prompt`, `items[10].prompt`, `items[11].prompt`, `items[12].prompt`, `items[13].prompt`, `items[14].prompt`

**2024-06-05-reading-9**

- `passage` story text: added: "Un samedi matin au Jardin du Luxembourg."
- `passage` story text: added: "Pierre est assis sur un banc, sous un grand arbre."
- `passage` story text: added: "Au Café de Flore, Marie vient à notre table."
- `passage` story text: added: "Le soir, au Procope, le plus vieux restaurant de Paris."
- `passage` story text: added: "Vers 10h, je rentre chez moi, fatigué mais heureux."
- `passage` story text: added: "Fin"
- `vocabularyReference[177]` "j'ai eu" ("I had") is listed twice; one card, notes joined

**2024-06-10-unit-9-practice**

- `items[18].blanks` i-comme-sommes-restes: 2 blank hints joined into one hint
- `items[19].blanks` i-sur-ai-vu: 2 blank hints joined into one hint
- 16 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[18].instruction`, `items[19].instruction`

**2024-02-01-reading-10**

- `passage` story text: added: "Sophie regarde Notre-Dame et pense à ses rêves."
- `passage` story text: added: "Le rêve de Sophie : une petite maison à Montmartre."
- `passage` story text: added: "Le rêve de Marc : ses peintures au Louvre."
- `passage` story text: added: "Sophie et Marc marchent vers la Seine."
- `passage` story text: added: "Un nouveau jour pour Sophie."
- `passage` story text: added: "Fin"
- `vocabularyReference[77]` "réussissions" ("succeed (subjunctive, nous)") is listed twice; one card, notes joined

**2024-02-05-unit-10-practice**

- 19 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`

**2024-02-12-reading-11**

- `passage` story text: added: "La Tour Eiffel, l'Arc de Triomphe, le Louvre et Notre-Dame."
- `passage` story text: added: "À six ans, les enfants arrivent à l'école primaire."
- `passage` story text: added: "Un train rapide traverse la campagne vers le sud."
- `passage` story text: added: "L'été à Nice, au bord de la Méditerranée."
- `passage` story text: added: "À vélo et en tram, la France pense à l'avenir."
- `passage` story text: added: "Fin"

**2024-02-16-unit-11-practice**

- `items[16].blanks` i-ou-un: 2 blank hints joined into one hint
- `items[17].blanks` i-attends-arrivent: 2 blank hints joined into one hint
- `items[18].blanks` i-evolue-vivent: 2 blank hints joined into one hint
- `items[19].blanks` i-j-ai-vis-travaille: 3 blank hints joined into one hint
- 19 × instruction written as the gloss ("Complete:" and quotes dropped): `items[0].instruction`, `items[1].instruction`, `items[2].instruction`, `items[3].instruction`, `items[4].instruction`, `items[5].instruction`, `items[6].instruction`, `items[7].instruction`, `items[8].instruction`, `items[9].instruction`, `items[10].instruction`, `items[11].instruction`, `items[12].instruction`, `items[13].instruction`, `items[14].instruction`, `items[15].instruction`, `items[16].instruction`, `items[17].instruction`, `items[18].instruction`

**2024-04-08-spelling-patterns**

- `isPhonicsReference` the page's spelling patterns (src/data/frenchPhonics.js, 30 sounds) are written out as its sections

**2024-12-18-pronunciation-test**

- `screen` a word list to say aloud (exerciseConfig type "none"): screen pronunciation-test

## Notes

Things the conversion keeps or drops on a ruling, listed so nothing changes unseen (ledger ruling 2026-11-25 Task 8).

**2024-03-30-reading-4**

- `readingPassage.text` speaker_colour_dropped: "Paul[9]" is the speaker "Paul"; L has no colour mark
- `readingPassage.text` speaker_colour_dropped: "Marie[8]" is the speaker "Marie"; L has no colour mark
- `readingPassage.text` speaker_colour_dropped: "La femme[3]" is the speaker "La femme"; L has no colour mark

## Outline

Changes the outline step made when it wrote course.json from today’s unit configs.

- `course.json` unit1: name "Essential Grammar" from title "Unit 1: Essential Grammar" (position prefix dropped)
- `course.json` unit2: name "Asking & Describing" from title "Unit 2: Asking & Describing" (position prefix dropped)
- `course.json` unit3: name "Movement & Possession" from title "Unit 3: Movement & Possession" (position prefix dropped)
- `course.json` unit4: name "Everyday Words" from title "Unit 4: Everyday Words" (position prefix dropped)
- `course.json` unit5: name "Time & Taste" from title "Unit 5: Time & Taste" (position prefix dropped)
- `course.json` unit6: name "Basic Fluency" from title "Unit 6: Basic Fluency" (position prefix dropped)
- `course.json` unit7: name "Knowledge & Learning" from title "Unit 7: Knowledge & Learning" (position prefix dropped)
- `course.json` unit8: name "Daily Life & Actions" from title "Unit 8: Daily Life & Actions" (position prefix dropped)
- `course.json` unit9: name "Discourse & Past Tense" from title "Unit 9: Discourse & Past Tense" (position prefix dropped)
- `course.json` unit10: name "Mastery & Nuance" from title "Unit 10: Mastery & Nuance" (position prefix dropped)
- `course.json` unit11: name "Daily Essentials" from title "Unit 11: Daily Essentials" (position prefix dropped)
- `course.json` unit12: name "Curiosity & Questions" from title "Unit 12: Curiosity & Questions" (position prefix dropped)
- `course.json` shelf: guide 2024-10-21-cognates-help taken off the shelf list (taught in unit1; guides are linked on the shelf automatically)
- `course.json` shelf: guide 2024-10-20-liaison-help taken off the shelf list (taught in unit1; guides are linked on the shelf automatically)
- `course.json` shelf: guide 2024-01-28-verb-pattern-help taken off the shelf list (taught in unit3; guides are linked on the shelf automatically)
- `course.json` shelf: the Reference unit's title "Reference", description, icon 📚 and color #6366f1 have no place in the outline and were dropped
