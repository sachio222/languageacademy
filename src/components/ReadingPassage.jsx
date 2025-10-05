/**
 * Reading Passage Component
 * Displays a reading passage with translation toggle and interactive word tooltips
 */
import { useState } from 'react';
import SpeakButton from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';

// Word-to-English mapping for reading passages - Updated through Unit 4
const wordTranslations = {
  // Module 1 - Famous words
  'bonjour': 'hello',
  'merci': 'thank you',
  'oui': 'yes',
  'non': 'no',
  'pardon': 'excuse me',
  'salut': 'hi/bye',
  'voilà': 'there it is',
  'café': 'coffee',
  'bon': 'good',
  'bien': 'well',

  // Module 2 - Pronouns
  'je': 'I',
  'tu': 'you (informal)',
  'il': 'he',
  'elle': 'she',
  'nous': 'we',
  'vous': 'you (formal)',
  'ils': 'they (masc)',
  'elles': 'they (fem)',

  // Module 15 - Stressed Pronouns
  'moi': 'me',
  'toi': 'you',
  'lui': 'him',
  'eux': 'them (masc)',

  // Module 3 - être
  'être': 'to be',
  'suis': 'am',
  'es': 'are',
  'est': 'is',
  'sommes': 'are',
  'êtes': 'are',
  'sont': 'are',

  // Module 4 - avoir
  'ai': 'have',
  "j'ai": 'I have',
  "n'as": "don't have",
  'as': 'have',
  'a': 'has',
  'avons': 'have',
  'avez': 'have',
  'ont': 'have',

  // Module 5 - Articles
  'un': 'a (masc)',
  'une': 'a (fem)',
  'le': 'the (masc)',
  'la': 'the (fem)',
  'les': 'the (plural)',
  'des': 'some',

  // Module 6 - Nouns
  'livre': 'book',
  'livres': 'books',
  'chat': 'cat',
  'chats': 'cats',
  'chien': 'dog',
  'chiens': 'dogs',
  'maison': 'house',
  'voiture': 'car',
  'ami': 'friend',
  'amis': 'friends',
  'amie': 'friend (fem)',
  'homme': 'man',
  'femme': 'woman',
  'enfant': 'child',
  'enfants': 'children',
  'chose': 'thing',
  'choses': 'things',
  'jour': 'day',

  // Module 8 - Connectors
  'et': 'and',
  'mais': 'but',
  'ou': 'or',
  'aussi': 'also/too',
  'très': 'very',

  // Module 15 - Adjectives (all forms)
  'bonne': 'good (fem)',
  'bonnes': 'good (fem plural)',
  'bons': 'good (masc plural)',
  'grand': 'big/tall (masc)',
  'grande': 'big/tall (fem)',
  'grands': 'big/tall (masc plural)',
  'grandes': 'big/tall (fem plural)',
  'petit': 'small (masc)',
  'petite': 'small (fem)',
  'petits': 'small (masc plural)',
  'petites': 'small (fem plural)',
  'nouveau': 'new (masc)',
  'nouvelle': 'new (fem)',
  'nouveaux': 'new (masc plural)',
  'nouvelles': 'new (fem plural)',
  'vieux': 'old (masc)',
  'vieille': 'old (fem)',
  'vieil': 'old (masc before vowel)',
  'vieilles': 'old (fem plural)',
  'jeune': 'young',
  'jeunes': 'young (plural)',
  'beau': 'beautiful (masc)',
  'belle': 'beautiful (fem)',
  'beaux': 'beautiful (masc plural)',
  'belles': 'beautiful (fem plural)',
  'autre': 'other',
  'autres': 'other (plural)',


  // Module 16 - Questions
  'que': 'what',
  'qui': 'who',
  'où': 'where',
  'quand': 'when',
  'comment': 'how',
  'pourquoi': 'why',
  'combien': 'how much/many',
  'est-ce': 'is it/this',

  // Module 16 - Prepositions
  'avec': 'with',
  'dans': 'in',
  'sur': 'on',
  'à': 'to/at',
  'de': 'of/from',
  'pour': 'for',

  // Module 13 - vouloir/pouvoir
  'veux': 'want',
  'veut': 'wants',
  'voulons': 'want',
  'voulez': 'want',
  'veulent': 'want',
  'voir': 'to see',
  'voit': 'sees',
  'vois': 'see',
  'voyons': 'see',
  'voient': 'see',
  'vu': 'saw/seen',
  'peux': 'can',
  'peut': 'can',
  'pouvons': 'can',
  'pouvez': 'can',
  'peuvent': 'can',

  // Common contractions/phrases
  "c'est": "it's",
  'ça': 'that/it',
  'ce': 'this/that',
  'cette': 'this/that (fem)',
  'ces': 'these/those',

  // Motion verbs
  'venir': 'to come',
  'viens': 'come',
  'vient': 'comes',
  'venons': 'come',
  'venez': 'come',
  'viennent': 'come',
  'aller': 'to go',
  'vais': 'go',
  'vas': 'go',
  'va': 'goes',
  'allons': 'go',
  'allez': 'go',
  'vont': 'go',
  'allons-y': "let's go!",
  'partir': 'to leave',
  'part': 'leaves',
  'pars': 'leave',
  'partons': 'leave',
  'partez': 'leave',
  'partent': 'leave',

  // Possessive adjectives
  'mon': 'my (masc)',
  'ma': 'my (fem)',
  'mes': 'my (plural)',
  'ton': 'your (masc)',
  'ta': 'your (fem)',
  'tes': 'your (plural)',
  'son': 'his/her (masc)',
  'sa': 'his/her (fem)',
  'ses': 'his/her (plural)',

  // Object pronouns
  'le': 'it/him',
  'la': 'it/her',
  'les': 'them',
  "l'": 'it',

  // Contractions
  'du': 'of/from the (masc)',
  'au': 'to/at the (masc)',
  'aux': 'to/at the (plural)',

  // Possessive pronouns
  'mien': 'mine',
  'tien': 'yours',
  'sien': 'his/hers',

  // Unit 4 - Survival phrases
  'voudrais': 'would like',
  'excusez-moi': 'excuse me',
  'excusez': 'excuse',
  'beaucoup': 'very much',
  'combien': 'how much/many',

  // Unit 4 - faire (to do/make)
  'fais': 'do/make',
  'fait': 'does/makes',
  'faisons': 'do/make',
  'faites': 'do/make',
  'font': 'do/make',
  'faire': 'to do/make',

  // Unit 4 - devoir (must)
  'dois': 'must',
  'doit': 'must',
  'devons': 'must',
  'devez': 'must',
  'doivent': 'must',

  // Unit 4 - parler (to speak)
  'parle': 'speak',
  'parles': 'speak',
  'parlons': 'speak',
  'parlez': 'speak',
  'parlent': 'speak',
  'parler': 'to speak',

  // Unit 4 - Time & frequency
  'maintenant': 'now',
  'toujours': 'always',
  'jamais': 'never',
  "aujourd'hui": 'today',
  'aujourd': 'today',
  'hui': 'today',
  'demain': 'tomorrow',
  'hier': 'yesterday',
  'matin': 'morning',
  'soir': 'evening',
  'ce': 'this/that',
  'alors': 'so/then',

  // Unit 4 - Location
  'ici': 'here',
  'là': 'there',
  'là-bas': 'over there',
  'partout': 'everywhere',
  'quelque': 'some',
  'part': 'part/place',
  'nulle': 'no/none',

  // Negation
  'ne': "not (part 1)",
  'pas': "not (part 2)",

  // Unit 4 - Everyday Nouns (Module 41)
  'temps': 'time/weather',
  'vie': 'life',
  'monde': 'world',
  'eau': 'water',
  'pain': 'bread',
  'argent': 'money',
  'travail': 'work',
  'ville': 'city',
  'place': 'square/place',
  'rue': 'street',
  'table': 'table',
  'main': 'hand',
  'tête': 'head',
  'nom': 'name',
  'porte': 'door',
  'personne': 'nobody/no one',
  'carte': 'card',
  'crédit': 'credit',
  'espèces': 'cash',
  'carafe': 'carafe',
  'addition': 'bill/check',

  // Additional verbs for Reading 4
  'manger': 'to eat',
  'mange': 'eat',
  'manges': 'eat',
  'mangeons': 'eat',
  'mangez': 'eat',
  'mangent': 'eat',
  'payer': 'to pay',
  'paie': 'pay/pays',
  'paies': 'pay',
  'payons': 'pay',
  'payez': 'pay',
  'paient': 'pay',
  'aimer': 'to like/love',
  'aime': 'like/love',
  "j'aime": 'I like/love',
  "j'aime": 'I like/love',
  'aimes': 'like/love',
  'aimons': 'like/love',
  'aimez': 'like/love',
  'aiment': 'like/love',
  'coûte': 'costs',
  'coûtent': 'cost',
  'aimer': 'to like/love',
  'aime': 'like',
  'aimes': 'like',
  'aimons': 'like',
  'aimez': 'like',
  'aiment': 'like',

  // Restaurant/common words
  'restaurant': 'restaurant',
  'serveur': 'waiter',
  'problème': 'problem',
  'autres': 'others/other',
  'meilleur': 'best',
  'raison': 'reason',
  'grave': 'serious',
  'gentil': 'kind',
  'gentille': 'kind (fem)',
  'mauvais': 'bad',
  'mauvaise': 'bad (fem)',
  'gratuit': 'free',
  'gratuite': 'free (fem)',
  'rien': 'nothing',
  'alors': 'so/then',
  'parce': 'because',
  'votre': 'your',
  'vos': 'your (plural)',
  'gauche': 'left',
  'droite': 'right',
  'voilà': 'here is/there is',
  'cafés': 'cafés',
  'cafes': 'cafés',
  'plus': 'more',
  'tard': 'late',
  'cet': 'this (masc before vowel)',
  'après': 'after',
  'midi': 'noon',
  'comment': 'how',
  'où': 'where',
  'quoi': 'what',
  'beaucoup': 'a lot/very much',
  'merci': 'thank you',

  // Common words
  'français': 'French',
  'francais': 'French',
  'revoir': 'see again',
  'plaît': 'pleases',
  'plait': 'pleases',
  'tout': 'all/everything',
  'tous': 'all (masc plural)',
  'toute': 'all (fem)',
  'toutes': 'all (fem plural)',
  'd': 'of/from',
  'ah': 'ah',
  'oh': 'oh',
  'madame': 'madam / ma\'am',
  'jour': 'day',
  'heures': 'hours / o\'clock',
  'six': 'six',

  // Compound phrases that need definitions
  "d'argent": 'of money / (any) money',
  'hommes': 'men',
  'femmes': 'women',
  'maisons': 'houses',
  'voitures': 'cars',
  'voudrions': 'would like',
  'ça': 'that/it',
  'ca': 'that/it',
  'bon': 'good',
  'bonne': 'good (fem)',
  'dans': 'in',
  'de': 'of/from',
  'mon': 'my (masc)',
  'ma': 'my (fem)',
  'mes': 'my (plural)',
  'ton': 'your (masc, informal)',
  'ta': 'your (fem, informal)',
  'tes': 'your (plural, informal)',
  'son': 'his/her (masc)',
  'sa': 'his/her (fem)',
  'ses': 'his/her (plural)',
  'avec': 'with',
  'sans': 'without',
  'pour': 'for',
  'sur': 'on',
  'chez': 'at (someone\'s place)',
  'petite': 'small (fem)',
  'nouvelle': 'new (fem)',
  'beau': 'beautiful (masc)',
  'belle': 'beautiful (fem)',
  's': 'if/oneself',
  'si': 'if',
  'te': 'you (object)',
  'fin': 'end',

  // Names
  'marie': 'Marie',
  'paul': 'Paul',
  'sophie': 'Sophie',
  'marc': 'Marc',
  'pierre': 'Pierre',

  // Unit 5 - Past tense être (imperfect)
  'j\'étais': 'I was',
  'étais': 'was',
  'tu étais': 'you were',
  'il était': 'he was',
  'elle était': 'she was',
  'était': 'was',
  'c\'était': 'it was',
  'nous étions': 'we were',
  'étions': 'were',
  'vous étiez': 'you were',
  'étiez': 'were',
  'ils étaient': 'they were',
  'elles étaient': 'they were',
  'étaient': 'were',

  // Unit 5 - Past tense avoir (imperfect)
  'j\'avais': 'I had',
  'avais': 'had',
  'tu avais': 'you had',
  'il avait': 'he had',
  'elle avait': 'she had',
  'avait': 'had',
  'nous avions': 'we had',
  'avions': 'had',
  'vous aviez': 'you had',
  'aviez': 'had',
  'ils avaient': 'they had',
  'elles avaient': 'they had',
  'avaient': 'had',

  // Unit 5 - avoir expressions in past
  'avions faim': 'were hungry',
  'avais faim': 'was hungry',
  'faim': 'hunger',
  'avais raison': 'were right',
  'raison': 'reason/right',

  // Unit 5 - Conditionals (should)
  'je devrais': 'I should',
  'devrais': 'should',
  'tu devrais': 'you should',
  'il devrait': 'he should',
  'elle devrait': 'she should',
  'devrait': 'should',
  'nous devrions': 'we should',
  'devrions': 'should',
  'vous devriez': 'you should',
  'devriez': 'should',
  'ils devraient': 'they should',
  'elles devraient': 'they should',
  'devraient': 'should',

  // Unit 5 - Conditionals (could)
  'je pourrais': 'I could',
  'pourrais': 'could',
  'tu pourrais': 'you could',
  'il pourrait': 'he could',
  'elle pourrait': 'she could',
  'pourrait': 'could',
  'nous pourrions': 'we could',
  'pourrions': 'could',
  'vous pourriez': 'you could',
  'pourriez': 'could',
  'ils pourraient': 'they could',
  'elles pourraient': 'they could',
  'pourraient': 'could',
  'ne pouvions pas': 'could not',
  'pouvions': 'could (imperfect)',

  // Unit 5 - Conditionals (would like)
  'je voudrais': 'I would like',
  'voudrais': 'would like',
  'tu voudrais': 'you would like',
  'il voudrait': 'he would like',
  'elle voudrait': 'she would like',
  'voudrait': 'would like',
  'nous voudrions': 'we would like',
  'voudrions': 'would like',
  'vous voudriez': 'you would like',
  'voudriez': 'would like',
  'ils voudraient': 'they would like',
  'elles voudraient': 'they would like',
  'voudraient': 'would like',

  // Unit 5 - Conditionals (would go)
  'j\'irais': 'I would go',
  'irais': 'would go',
  'tu irais': 'you would go',
  'il irait': 'he would go',
  'elle irait': 'she would go',
  'irait': 'would go',
  'nous irions': 'we would go',
  'irions': 'would go',
  'vous iriez': 'you would go',
  'iriez': 'would go',
  'ils iraient': 'they would go',
  'elles iraient': 'they would go',
  'iraient': 'would go',

  // Unit 5 - Conditionals (would do)
  'je ferais': 'I would do',
  'ferais': 'would do',
  'tu ferais': 'you would do',
  'il ferait': 'he would do',
  'elle ferait': 'she would do',
  'ferait': 'would do',
  'nous ferions': 'we would do',
  'ferions': 'would do',
  'vous feriez': 'you would do',
  'feriez': 'would do',
  'ils feraient': 'they would do',
  'elles feraient': 'they would do',
  'feraient': 'would do',

  // Unit 5 - Comparisons
  'plus': 'more',
  'moins': 'less',
  'meilleur': 'better/best (masc)',
  'meilleure': 'better/best (fem)',
  'le meilleur': 'the best',
  'la meilleure': 'the best',
  'pire': 'worse/worst',
  'le pire': 'the worst',
  'la pire': 'the worst',
  'trop': 'too much/too',
  'tout': 'all/everything',
  'toute': 'all (fem)',
  'tous': 'all (masc plural)',
  'toutes': 'all (fem plural)',
  'tout le monde': 'everybody',
  'même': 'same/even',
  'le même': 'the same',
  'la même': 'the same',
  'mal': 'badly/bad',

  // Unit 5 - Slang
  'ouf': 'crazy (slang)',
  'c\'est ouf': 'it\'s crazy',
  'chelou': 'weird (slang)',
  'c\'est chelou': 'it\'s weird',
  'génial': 'awesome/great',
  'c\'est génial': 'it\'s awesome',
  'nul': 'sucks/lame',
  'c\'est nul': 'it sucks',
  'cool': 'cool',
  'c\'est cool': 'it\'s cool',
  'dingue': 'crazy/wild',
  'c\'est dingue': 'it\'s crazy',
  'vachement': 'really/very (slang)',
  'hyper': 'super/really',
  'mortel': 'deadly/awesome',
  'c\'est mortel': 'it\'s awesome',
  'malade': 'sick/awesome (Quebec)',
  'c\'est malade': 'it\'s sick',
  'capot': 'crazy (Quebec)',
  'c\'est capot': 'it\'s crazy',
  'écœurant': 'disgusting/amazing (Quebec)',
  'c\'est écœurant': 'it\'s disgusting/amazing',
  'le fun': 'fun (Quebec)',
  'c\'est le fun': 'it\'s fun',
  'poche': 'sucks (Quebec)',
  'c\'est poche': 'it sucks',
  'ben': 'well (Quebec)',
  'ben correct': 'really good (Quebec)',
  'c\'est ben correct': 'it\'s really good',
  'gnama': 'good/tasty (Africa)',
  'c\'est gnama': 'it\'s good',
  'grave': 'serious/intense',
  'c\'est grave': 'it\'s serious',
  'chaud': 'hot/difficult',
  'c\'est chaud': 'it\'s hot/difficult',
  'fort': 'strong/intense',
  'c\'est fort': 'it\'s strong',
  'top': 'top/best',
  'c\'est top': 'it\'s the best',

  // Unit 5 - aimer verb
  'aimer': 'to like/love',
  'j\'aime': 'I like/love',
  'aime': 'like/love',
  'tu aimes': 'you like/love',
  'aimes': 'like/love',
  'il aime': 'he likes/loves',
  'elle aime': 'she likes/loves',
  'nous aimons': 'we like/love',
  'aimons': 'like/love',
  'vous aimez': 'you like/love',
  'aimez': 'like/love',
  'ils aiment': 'they like/love',
  'elles aiment': 'they like/love',
  'aiment': 'like/love',
  'j\'aime bien': 'I really like',
  'aime bien': 'really like',
  'je t\'aime': 'I love you',

  // Unit 5 - manger verb
  'manger': 'to eat',
  'je mange': 'I eat',
  'mange': 'eat',
  'tu manges': 'you eat',
  'manges': 'eat',
  'il mange': 'he eats',
  'elle mange': 'she eats',
  'nous mangeons': 'we eat',
  'mangeons': 'eat',
  'vous mangez': 'you eat',
  'mangez': 'eat',
  'ils mangent': 'they eat',
  'elles mangent': 'they eat',
  'mangent': 'eat',
  'j\'ai mangé': 'I ate',
  'ai mangé': 'ate',
  'a mangé': 'ate',
  'as mangé': 'ate',
  'tu as mangé': 'you ate',
  'il a mangé': 'he ate',
  'elle a mangé': 'she ate',
  'nous avons mangé': 'we ate',
  'avons mangé': 'ate',
  'vous avez mangé': 'you ate',
  'avez mangé': 'ate',
  'ils ont mangé': 'they ate',
  'elles ont mangé': 'they ate',
  'ont mangé': 'ate',
  'mangé': 'eaten',
  'avions mangé': 'had eaten',

  // Unit 5 - boire verb
  'boire': 'to drink',
  'je bois': 'I drink',
  'bois': 'drink',
  'tu bois': 'you drink',
  'il boit': 'he drinks',
  'elle boit': 'she drinks',
  'boit': 'drinks',
  'nous buvons': 'we drink',
  'buvons': 'drink',
  'vous buvez': 'you drink',
  'buvez': 'drink',
  'ils boivent': 'they drink',
  'elles boivent': 'they drink',
  'boivent': 'drink',
  'j\'ai bu': 'I drank',
  'ai bu': 'drank',
  'a bu': 'drank',
  'as bu': 'drank',
  'tu as bu': 'you drank',
  'il a bu': 'he drank',
  'elle a bu': 'she drank',
  'nous avons bu': 'we drank',
  'avons bu': 'drank',
  'vous avez bu': 'you drank',
  'avez bu': 'drank',
  'ils ont bu': 'they drank',
  'elles ont bu': 'they drank',
  'ont bu': 'drank',
  'bu': 'drunk',

  // Unit 5 - Food & drink nouns
  'l\'eau': 'water',
  'eau': 'water',
  'le café': 'coffee',
  'un café': 'a coffee',
  'express': 'espresso',
  'un express': 'an espresso',
  'thé': 'tea',
  'le thé': 'tea',
  'lait': 'milk',
  'le lait': 'milk',
  'vin': 'wine',
  'le vin': 'wine',
  'bière': 'beer',
  'la bière': 'beer',
  'une bière': 'a beer',
  'jus': 'juice',
  'le jus': 'juice',
  'pain': 'bread',
  'le pain': 'bread',
  'baguette': 'baguette',
  'une baguette': 'a baguette',
  'croissant': 'croissant',
  'un croissant': 'a croissant',
  'beurre': 'butter',
  'le beurre': 'butter',
  'fromage': 'cheese',
  'le fromage': 'cheese',
  'pizza': 'pizza',
  'la pizza': 'pizza',
  'une pizza': 'a pizza',
  'sel': 'salt',
  'le sel': 'salt',
  'poivre': 'pepper',
  'le poivre': 'pepper',
  'sucre': 'sugar',
  'le sucre': 'sugar',
  'viande': 'meat',
  'la viande': 'meat',
  'poulet': 'chicken',
  'le poulet': 'chicken',
  'poisson': 'fish',
  'le poisson': 'fish',
  'bœuf': 'beef',
  'le bœuf': 'beef',
  'porc': 'pork',
  'le porc': 'pork',
  'œufs': 'eggs',
  'les œufs': 'eggs',
  'légumes': 'vegetables',
  'les légumes': 'vegetables',
  'salade': 'salad',
  'la salade': 'salad',
  'une salade': 'a salad',
  'tomate': 'tomato',
  'la tomate': 'tomato',
  'pomme de terre': 'potato',
  'la pomme de terre': 'potato',
  'frites': 'fries',
  'les frites': 'fries',
  'haricots': 'beans',
  'les haricots': 'beans',
  'fruits': 'fruits',
  'les fruits': 'fruits',
  'pomme': 'apple',
  'la pomme': 'apple',
  'une pomme': 'an apple',
  'banane': 'banana',
  'la banane': 'banana',
  'orange': 'orange',
  'l\'orange': 'orange',
  'riz': 'rice',
  'le riz': 'rice',
  'pâtes': 'pasta',
  'les pâtes': 'pasta',
  'gâteau': 'cake',
  'le gâteau': 'cake',
  'glace': 'ice cream',
  'la glace': 'ice cream',
  'chocolat': 'chocolate',
  'le chocolat': 'chocolate',

  // Unit 5 - Past participles and compound verbs
  'parlé': 'spoken',
  'a parlé': 'spoke',
  'j\'ai parlé': 'I spoke',
  'dit': 'said',
  'a dit': 'said',
  'j\'ai dit': 'I said',
  'dire': 'to say/tell',

  // Other words
  'restaurant': 'restaurant',
  'restaurants': 'restaurants',
  'le restaurant': 'the restaurant',
  'les restaurants': 'the restaurants',
  'au restaurant': 'to the restaurant',
  'aux restaurants': 'to the restaurants',
  'payer': 'to pay',
  'paie': 'pay',
  'je paie': 'I pay',
  'moi aussi': 'me too',
  'contents': 'happy (plural)',
  'que': 'than/that',
  'hommes': 'men',
  'des hommes': 'men',
  'femmes': 'women',
  'des femmes': 'women',

  // ===== READING 6: Un Voyage en Famille =====
  // Unit 6 - Progressive tenses, communication verbs, and top 200 nouns
  'suis en train de': 'am in the process of',
  'en train de': 'in the process of',
  'en train': 'in the process / on the train',
  'train': 'train',
  'en': 'in / by / while',
  'prendre': 'to take',
  'prends': 'take (I/you)',
  'prend': 'takes / take',
  'comprends': 'understand (I/you)',
  'comprend': 'understands',
  'apprendre': 'to learn',
  'apprends': 'learn (I/you)',
  "d'apprendre": 'to learn / of learning',
  'mettre': 'to put',
  'mets': 'put (I/you)',
  'met': 'puts',
  'demander': 'to ask',
  'demande': 'ask (I)',
  'dire': 'to say / to tell',
  'dis': 'say / tell (I/you)',
  'dit': 'says / tells',
  'finir': 'to finish',
  "j'ai besoin de": 'I need',
  'besoin': 'need',
  'ai besoin de': 'need / have need of',
  'as besoin de': 'need (you have need of)',
  'tu as besoin de': 'you need',
  'avoir besoin de': 'to need',
  'allons partir': 'are going to leave',
  'vais prendre': 'am going to take',
  'vas prendre': 'are going to take',
  'va venir': 'is going to come',
  'va faire': 'are going to do',
  'allons manger': 'are going to eat',
  'allons voir': 'are going to see',
  'allons avoir': 'are going to have',
  'vais': 'go / am going',
  'vas': 'go / are going',
  'famille': 'family',
  'père': 'father',
  'mère': 'mother',
  'frère': 'brother',
  'semaine': 'week',
  'question': 'question',
  'moment': 'moment',
  'fois': 'time / occasion',
  'première fois': 'first time',
  'première': 'first (fem)',
  'année': 'year',
  'monde': 'world',
  'ville': 'city',
  'mots': 'words',
  'mot': 'word',
  'papa': 'dad',
  'maman': 'mom',
  'fais': 'do / make (you)',
  "qu'est-ce": 'what is',
  "qu'est": 'what is / that is',
  'le train': 'the train',
  'super': 'great / super',
  'manteau': 'coat',
  'ton manteau': 'your coat',
  'mon livre': 'my book',
  'tes livres': 'your books',
  'ses livres': 'his/her books',
  'trois livres': 'three books',
  'livre de français': 'French book',
  'mon livre de français': 'my French book',
  'bien sûr': 'of course',
  'sûr': 'sure / certain',
  'trois': 'three',
  'trois heures': 'three hours',
  'heure': 'hour',
  "est-ce qu'on": 'are we',
  "qu'on": 'that we',
  'quelque chose': 'something',
  'quelque': 'some',
  'du pain': 'bread / some bread',
  'du fromage': 'cheese / some cheese',
  'fromage': 'cheese',
  'prix': 'price',
  'le prix': 'the price',
  'toujours': 'always',
  'vrai': 'true',
  "c'est vrai": "that's true / it's true",
  'voir': 'to see',
  'venir': 'to come',
  'toute': 'all / whole (fem)',
  'toute la famille': 'the whole family',
  'en ce moment': 'right now / at this moment',
  'ce moment': 'this moment',
  'faire': 'to do / to make',
  'manger': 'to eat',
  'restaurants': 'restaurants',
  'de bons restaurants': 'good restaurants',
  'beaucoup': 'a lot / much',
  'parler': 'to speak',
  'parler français': 'to speak French',
  'en français': 'in French',
  'quelques': 'some / a few',
  'avant': 'before',
  'avant de': 'before (doing)',
  'partir': 'to leave',
  'avant de partir': 'before leaving',
  'déjà': 'already',
  'parles': 'speak (you)',
  'très bien': 'very well',
  'idée': 'idea',
  'bonne idée': 'good idea',
  'maintenant': 'now',
  'avoir': 'to have',
  'belle': 'beautiful (fem)',
  'plus belle': 'most beautiful',
  'la plus belle': 'the most beautiful',
  'paris': 'Paris - Capital of France',
  'Paris': 'Paris - Capital of France',
  'la Tour Eiffel': 'The Eiffel Tower - 324m tall',
  'Tour Eiffel': 'Eiffel Tower - Iconic landmark',
  'Tour': 'Tower',
  'Eiffel': 'Eiffel',
  'pour': 'for',
  'contente': 'happy (fem)',
  'très contente': 'very happy',
  'mon frère': 'my brother',
  'ça prend': 'it takes',
  'tu me dis': 'you tell me',
  'me dis': 'tell me',
  'me': 'me',
};

// Special Wikipedia entries for proper nouns with images
const wikipediaEntries = {
  'paris': {
    name: 'Paris',
    description: 'Capital and largest city of France',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/300px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Paris'
  },
  'Paris': {
    name: 'Paris',
    description: 'Capital and largest city of France',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/300px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Paris'
  },
  'la Tour Eiffel': {
    name: 'La Tour Eiffel',
    description: 'Wrought-iron lattice tower, built 1887-1889, 330m tall',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/240px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
  },
  'Tour Eiffel': {
    name: 'Tour Eiffel',
    description: 'Wrought-iron lattice tower, built 1887-1889, 330m tall',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/240px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
  }
};

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const { speak } = useSpeech();

  if (!passage) return null;

  // Strip markdown formatting for TTS
  const stripMarkdown = (text) => {
    return text.replace(/\*\*/g, '');
  };

  // Make words interactive - use paragraph index for truly unique keys
  const renderInteractiveText = (text, paragraphIndex) => {
    // Check if line has speaker label
    const speakerMatch = text.match(/^\*\*([^:]+):\*\*/);

    if (speakerMatch) {
      const speaker = speakerMatch[1];
      const dialogue = text.replace(/^\*\*[^:]+:\*\*\s*/, '');

      return (
        <>
          <strong className="speaker-label">{speaker}:</strong>{' '}
          {renderWords(dialogue, paragraphIndex)}
        </>
      );
    }

    return renderWords(text, paragraphIndex);
  };

  const renderWords = (text, paragraphIndex) => {
    let remainingText = text;
    const elements = [];
    let charPosition = 0;

    // Multi-word phrases to check FIRST (longest first to avoid conflicts)
    const multiWordPhrases = [
      { phrase: "qu'est-ce que c'est", translation: "what is it?" },
      { phrase: "qu'est-ce que vous voulez", translation: "what do you want" },
      { phrase: "qu'est-ce que", translation: "what" },
      { phrase: "s'il vous plaît", translation: "please (formal)" },
      { phrase: "s'il vous plait", translation: "please (formal)" },
      { phrase: "s'il te plaît", translation: "please (informal)" },
      { phrase: "s'il te plait", translation: "please (informal)" },
      { phrase: "excusez-moi", translation: "excuse me" },
      { phrase: "merci beaucoup", translation: "thank you very much" },
      { phrase: "c'est combien", translation: "how much is it?" },
      { phrase: "combien est-ce", translation: "how much is it?" },
      { phrase: "est-ce que", translation: "question marker" },
      { phrase: "comment ça va", translation: "how's it going?" },
      { phrase: "au revoir", translation: "goodbye" },
      { phrase: "ça va bien", translation: "I'm good / it's going well" },
      { phrase: "ça va", translation: "it's going / OK" },
      { phrase: "ah bon", translation: "oh really / I see" },
      { phrase: "mais non", translation: "but no / not at all" },
      { phrase: "c'est ça", translation: "that's it / that's right" },
      { phrase: "aujourd'hui", translation: "today" },
      { phrase: "ce soir", translation: "this evening / tonight" },
      { phrase: "à ce soir", translation: "see you this evening" },
      { phrase: "le matin", translation: "the morning / in the morning" },
      { phrase: "là-bas", translation: "over there" },
      { phrase: "quelque part", translation: "somewhere" },
      { phrase: "nulle part", translation: "nowhere" },

      // Unit 4 - Everyday nouns phrases
      { phrase: "tout le monde", translation: "everybody/everyone" },
      { phrase: "carte de crédit", translation: "credit card" },
      { phrase: "carte de credit", translation: "credit card" },
      { phrase: "ma carte de crédit", translation: "my credit card" },
      { phrase: "ma carte de credit", translation: "my credit card" },
      { phrase: "en espèces", translation: "in cash" },
      { phrase: "en especes", translation: "in cash" },
      { phrase: "une carafe d'eau", translation: "a carafe of water" },
      { phrase: "carafe d'eau", translation: "carafe of water" },
      { phrase: "l'addition", translation: "the bill" },
      { phrase: "le serveur", translation: "the waiter" },
      { phrase: "ce n'est pas un problème", translation: "that's not a problem" },
      { phrase: "ce n'est pas", translation: "it's not" },
      { phrase: "n'est pas", translation: "is not" },
      { phrase: "n'avais pas", translation: "didn't have" },
      { phrase: "n'ai pas", translation: "don't have" },
      { phrase: "n'a pas", translation: "doesn't have" },
      { phrase: "j'ai de l'argent", translation: "I have money" },
      { phrase: "de l'argent", translation: "money" },
      { phrase: "de l'eau", translation: "water" },
      { phrase: "du pain", translation: "bread" },
      { phrase: "pour la table", translation: "for the table" },
      { phrase: "pour le pain", translation: "for the bread" },
      { phrase: "pour toi", translation: "for you" },
      { phrase: "avec toi", translation: "with you" },
      { phrase: "avec moi", translation: "with me" },
      { phrase: "avec mes amis", translation: "with my friends" },
      { phrase: "avec eux", translation: "with them" },
      { phrase: "avec mon ami", translation: "with my friend" },
      { phrase: "je ne vois personne", translation: "I see nobody" },
      { phrase: "ne vois personne", translation: "see nobody" },
      { phrase: "autre chose", translation: "something else" },
      { phrase: "plus tard", translation: "later" },
      { phrase: "cet après-midi", translation: "this afternoon" },
      { phrase: "après-midi", translation: "afternoon" },
      { phrase: "le monde de la ville", translation: "the world of the city" },
      { phrase: "la grande place", translation: "the big square" },
      { phrase: "cette belle place", translation: "this beautiful square" },
      { phrase: "cette ville", translation: "this city" },
      { phrase: "de mauvais", translation: "bad" },

      // Negation phrases
      { phrase: "je ne peux pas payer", translation: "I can't pay" },
      { phrase: "ne peux pas payer", translation: "can't pay" },
      { phrase: "ne viens jamais", translation: "never comes" },
      { phrase: "ne vient jamais", translation: "never comes" },
      { phrase: "je ne vais jamais partir", translation: "I'll never leave" },
      { phrase: "ne vais jamais partir", translation: "never leave" },
      { phrase: "ne vais jamais", translation: "never go" },
      { phrase: "ne parle pas", translation: "doesn't speak" },
      { phrase: "ne parlons pas", translation: "don't speak" },
      { phrase: "ne peut pas", translation: "can't" },
      { phrase: "ne peux pas", translation: "can't" },
      { phrase: "ne veux pas", translation: "don't want" },
      { phrase: "le pain ne coûte rien", translation: "bread costs nothing" },
      { phrase: "ne coûte rien", translation: "costs nothing" },

      // Common verb phrases from Reading 4
      { phrase: "tu veux manger avec moi", translation: "do you want to eat with me" },
      { phrase: "tu veux manger", translation: "do you want to eat" },
      { phrase: "je veux manger", translation: "I want to eat" },
      { phrase: "qu'est-ce que vous voulez manger", translation: "what do you want to eat" },
      { phrase: "vous voulez manger", translation: "you want to eat" },
      { phrase: "je voudrais du pain et de l'eau", translation: "I would like bread and water" },
      { phrase: "je voudrais du pain", translation: "I would like bread" },
      { phrase: "je veux du pain aussi", translation: "I want bread too" },
      { phrase: "je veux du pain", translation: "I want bread" },
      { phrase: "c'est combien pour le pain", translation: "how much is the bread" },
      { phrase: "c'est combien pour", translation: "how much for" },
      { phrase: "vous devez manger autre chose", translation: "you must eat something else" },
      { phrase: "vous devez manger", translation: "you must eat" },
      { phrase: "je veux aussi voir", translation: "I also want to see" },
      { phrase: "tu vois la grande place", translation: "do you see the big square" },
      { phrase: "tu vois la", translation: "do you see the" },
      { phrase: "j'ai vu cette belle place", translation: "I saw this beautiful square" },
      { phrase: "j'ai vu", translation: "I saw" },
      { phrase: "je ne vais jamais partir de cette ville", translation: "I'll never leave this city" },
      { phrase: "partir de cette ville", translation: "leave this city" },
      { phrase: "tu aimes beaucoup cette ville", translation: "you really like this city" },
      { phrase: "tu aimes beaucoup", translation: "you really like" },
      { phrase: "la vie est très bonne ici", translation: "life is very good here" },
      { phrase: "la vie est", translation: "life is" },
      { phrase: "est très bonne", translation: "is very good" },
      { phrase: "tout le monde est gentil", translation: "everyone is kind" },
      { phrase: "je ne vois personne de mauvais", translation: "I don't see anyone bad" },
      { phrase: "où est la porte", translation: "where is the door" },
      { phrase: "je dois aller", translation: "I must go" },
      { phrase: "nous devons demander l'addition", translation: "we must ask for the bill" },
      { phrase: "demander l'addition", translation: "ask for the bill" },
      { phrase: "je dois faire mon travail", translation: "I must do my work" },
      { phrase: "faire mon travail", translation: "do my work" },
      { phrase: "vous payez comment", translation: "how are you paying" },
      { phrase: "je vais payer avec ma carte de crédit", translation: "I'm going to pay with my credit card" },
      { phrase: "je vais payer avec", translation: "I'm going to pay with" },
      { phrase: "je vais payer pour toi", translation: "I'm going to pay for you" },
      { phrase: "je vais payer", translation: "I'm going to pay" },
      { phrase: "demain je vais payer", translation: "tomorrow I'll pay" },
      { phrase: "tu es une bonne amie", translation: "you're a good friend" },
      { phrase: "je peux payer pour toi", translation: "I can pay for you" },
      { phrase: "je peux payer", translation: "I can pay" },
      { phrase: "payer avec ma carte de crédit", translation: "pay with my credit card" },
      { phrase: "payer avec ma", translation: "pay with my" },
      { phrase: "payer avec", translation: "pay with" },
      { phrase: "payer en espèces", translation: "pay in cash" },
      { phrase: "dans ma main", translation: "in my hand" },
      { phrase: "j'ai le temps", translation: "I have time" },
      { phrase: "le temps aujourd'hui", translation: "time today" },
      { phrase: "où est le restaurant", translation: "where is the restaurant" },
      { phrase: "je vois un bon restaurant", translation: "I see a good restaurant" },
      { phrase: "dans la rue", translation: "on the street" },
      { phrase: "nous devons aller là-bas", translation: "we must go there" },
      { phrase: "aller là-bas", translation: "go there" },
      { phrase: "tout le monde parle de ce restaurant", translation: "everyone talks about this restaurant" },
      { phrase: "parle de ce restaurant", translation: "talks about this restaurant" },
      { phrase: "une carafe d'eau pour la table", translation: "a carafe of water for the table" },
      { phrase: "je la vois", translation: "I see it (fem)" },
      { phrase: "tu aimes", translation: "you like" },
      { phrase: "c'est la vie", translation: "that's life" },
      { phrase: "à demain", translation: "see you tomorrow" },

      // Existing phrases
      { phrase: "nous devons", translation: "we must" },
      { phrase: "je dois", translation: "I must" },
      { phrase: "je voudrais", translation: "I would like" },
      { phrase: "tu veux", translation: "you want" },
      { phrase: "je veux", translation: "I want" },
      { phrase: "je vois", translation: "I see" },
      { phrase: "je le vois", translation: "I see him/it" },
      { phrase: "tu vois", translation: "you see" },
      { phrase: "je parle", translation: "I speak" },
      { phrase: "tu parles", translation: "you speak" },
      { phrase: "nous parlons", translation: "we speak" },
      { phrase: "je fais", translation: "I do/make" },
      { phrase: "tu fais", translation: "you do/make" },
      { phrase: "nous voyons", translation: "we see" },
      { phrase: "nous avons vu", translation: "we saw/have seen" },
      { phrase: "je suis", translation: "I am" },
      { phrase: "il est", translation: "he is" },
      { phrase: "nous allons", translation: "we go/are going" },
      { phrase: "je vais", translation: "I go/am going" },
      { phrase: "tu vas", translation: "you go/are going" },
      { phrase: "j'aime", translation: "I like/love" },
      { phrase: "j'aime", translation: "I like/love" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "tu n'as pas", translation: "you don't have" },
      { phrase: "il a", translation: "he has" },
      { phrase: "il doit", translation: "he must" },
      { phrase: "c'est", translation: "it's" },
    ];

    while (remainingText.length > 0) {
      let matched = false;

      // Check for multi-word phrases
      for (const { phrase, translation } of multiWordPhrases) {
        if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
          const matchedText = remainingText.slice(0, phrase.length);
          const uniqueKey = `p${paragraphIndex}-c${charPosition}`;
          const wikiEntry = wikipediaEntries[matchedText] || wikipediaEntries[matchedText.toLowerCase()];

          elements.push(
            <span
              key={uniqueKey}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => speak(matchedText, 'fr-FR')}
              style={{ cursor: 'pointer' }}
            >
              {matchedText}
              {hoveredWord === uniqueKey && wikiEntry && (
                <span className="word-tooltip wiki-tooltip">
                  <div className="wiki-content">
                    <img src={wikiEntry.image} alt={wikiEntry.name} className="wiki-image" />
                    <div className="wiki-text">
                      <strong>{wikiEntry.name}</strong>
                      <p>{wikiEntry.description}</p>
                      <a href={wikiEntry.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                        📖 Wikipedia
                      </a>
                    </div>
                  </div>
                </span>
              )}
              {hoveredWord === uniqueKey && !wikiEntry && (
                <span className="word-tooltip">{translation}</span>
              )}
            </span>
          );
          remainingText = remainingText.slice(phrase.length);
          charPosition += phrase.length;
          matched = true;
          break;
        }
      }

      if (matched) continue;

      // Check for single words (including accented characters)
      const wordMatch = remainingText.match(/^([a-zàâäæçéèêëïîôùûüœ']+)/i);
      if (wordMatch) {
        const word = wordMatch[1];
        const cleanWord = word.toLowerCase();
        const translation = wordTranslations[cleanWord];
        const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

        if (translation) {
          const wikiEntry = wikipediaEntries[word] || wikipediaEntries[cleanWord];

          elements.push(
            <span
              key={uniqueKey}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => speak(word, 'fr-FR')}
              style={{ cursor: 'pointer' }}
            >
              {word}
              {hoveredWord === uniqueKey && wikiEntry && (
                <span className="word-tooltip wiki-tooltip">
                  <div className="wiki-content">
                    <img src={wikiEntry.image} alt={wikiEntry.name} className="wiki-image" />
                    <div className="wiki-text">
                      <strong>{wikiEntry.name}</strong>
                      <p>{wikiEntry.description}</p>
                      <a href={wikiEntry.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                        📖 Wikipedia
                      </a>
                    </div>
                  </div>
                </span>
              )}
              {hoveredWord === uniqueKey && !wikiEntry && (
                <span className="word-tooltip">{translation}</span>
              )}
            </span>
          );
        } else {
          // Log missing words for debugging
          console.warn(`Missing translation for: "${word}"`);
          elements.push(<span key={uniqueKey} className="missing-translation" title={`Translation missing for: ${word}`}>{word}</span>);
        }

        remainingText = remainingText.slice(word.length);
        charPosition += word.length;
        continue;
      }

      // Match spaces and punctuation
      const otherMatch = remainingText.match(/^(\s+|[.!?,;:])/);
      if (otherMatch) {
        elements.push(<span key={`p${paragraphIndex}-c${charPosition}`}>{otherMatch[1]}</span>);
        remainingText = remainingText.slice(otherMatch[1].length);
        charPosition += otherMatch[1].length;
        continue;
      }

      // Fallback
      const char = remainingText[0];
      elements.push(<span key={`p${paragraphIndex}-c${charPosition}`}>{char}</span>);
      remainingText = remainingText.slice(1);
      charPosition++;
    }

    return elements;
  };

  const frenchParagraphs = passage.text.split('\n\n');
  const englishParagraphs = passage.translation.split('\n\n');

  return (
    <div className="reading-passage">
      <div className="passage-header">
        <div className="passage-meta">Reading Comprehension</div>
        <h1>{passage.title}</h1>
        <div className="passage-controls">
          <button
            className="btn-translation"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide' : 'Show'} English Translation
          </button>
        </div>
      </div>

      <div className="passage-content">
        {/* Read entire passage button - above first paragraph */}
        <div className="passage-audio-header">
          <SpeakButton
            text={stripMarkdown(passage.text)}
            language="fr-FR"
            size="medium"
            ariaLabel="Read entire passage aloud"
          />
          <span className="audio-label">Listen to entire passage</span>
        </div>

        <div className="passage-french">
          {frenchParagraphs.map((paragraph, pIdx) => (
            <div key={pIdx} className="paragraph-block paragraph-with-audio">
              <p className="french-text">
                {renderInteractiveText(paragraph, pIdx)}
              </p>
              {/* Per-paragraph speaker button - appears on hover */}
              <div className="paragraph-audio-btn">
                <SpeakButton
                  text={stripMarkdown(paragraph)}
                  language="fr-FR"
                  size="small"
                  ariaLabel={`Read paragraph ${pIdx + 1}`}
                />
              </div>
              {showTranslation && (
                <p className="english-translation">{englishParagraphs[pIdx]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="passage-instructions">
        <strong>💡 Tip:</strong> Hover over any French word to see its English translation! Click on any word to hear it spoken.
        Hover over paragraphs to read them individually.
      </div>
    </div>
  );
}

export default ReadingPassage;

