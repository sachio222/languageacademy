import { useState, useEffect, useCallback, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Home, ZoomIn, ZoomOut, Target, RotateCcw, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { lessons } from '../lessons/lessonData';
import { extractModuleId } from '../utils/progressSync';
import { DictionaryLookup, LessonCompatibility, VocabularyStats } from '../data/dictionary/index.js';
import '../styles/VocabularyDashboard.css';

function VocabularyDashboard({ completedExercises }) {
  const { supabaseClient, supabaseUser } = useAuth();
  const { moduleProgress } = useSupabaseProgress();
  const graphRef = useRef();

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [totalWords, setTotalWords] = useState(0);

  // Helper to get completed exercise count - EXACT SAME LOGIC AS DashboardHeader
  const getCompletedCount = (lesson) => {
    if (lesson.isFillInTheBlank || lesson.isUnitExam || lesson.isHelpModule) {
      const modId = extractModuleId(lesson);
      const modProgress = moduleProgress?.[modId];
      return modProgress?.completed_at ? getExerciseCount(lesson) : 0;
    }
    return lesson.exercises?.filter(ex => completedExercises?.has(ex.id)).length || 0;
  };

  const getExerciseCount = (lesson) => {
    if (lesson.isFillInTheBlank && lesson.sentences) {
      return lesson.sentences.length;
    }
    if (lesson.isUnitExam && lesson.exerciseConfig?.items) {
      return lesson.exerciseConfig.items.length;
    }
    if (lesson.isHelpModule) {
      return 1;
    }
    return lesson.exercises?.length || 0;
  };

  // High-performance word categorization using dictionary lookup
  const categorizeWord = (vocab) => {
    const french = vocab.french?.toLowerCase().trim();
    if (!french) return 'Unknown';

    // Try dictionary lookup first (O(1) performance)
    const wordId = `${french}-fr`;
    const category = LessonCompatibility.getWordCategory(wordId);

    if (category !== 'Unknown') {
      return category;
    }

    // Fallback to legacy categorization for words not in dictionary
    const note = vocab.note?.toLowerCase() || '';

    // Check note field first
    if (note.includes('verb') || note.includes('conjugat')) return 'Verbs';
    if (note.includes('adjective')) return 'Adjectives';
    if (note.includes('adverb')) return 'Adverbs';
    if (note.includes('preposition')) return 'Prepositions';
    if (note.includes('pronoun')) return 'Pronouns';
    if (note.includes('article')) return 'Articles';
    if (note.includes('number')) return 'Numbers';
    if (note.includes('conjunction')) return 'Conjunctions';

    // Common expressions
    const commonExpressions = ['ça va', 'ça va?', "qu'est-ce que", "qu'est-ce que c'est", 'il y a',
      'merci beaucoup', 'de rien', 's\'il vous plaît', 's\'il te plaît', 'excusez-moi', 'pardon',
      'bonne nuit', 'bonne journée', 'à bientôt', 'au revoir', 'salut', 'bonjour', 'bonsoir'];
    if (commonExpressions.includes(french)) return 'Expressions';

    // Articles
    const articles = ['un', 'une', 'le', 'la', 'les', "l'", 'du', 'de la', 'des', 'au', 'aux'];
    if (articles.includes(french)) return 'Articles';

    // Demonstratives
    const demonstratives = ['ce', 'cet', 'cette', 'ces', 'ça', 'ceci', 'cela'];
    if (demonstratives.includes(french)) return 'Demonstratives';

    // Pronouns - check this first to avoid conflicts
    const pronouns = ['on', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'me', 'te', 'se', 'lui', 'leur', 'y', 'en'];
    if (pronouns.includes(french)) {
      if (french === 'on') {
        console.log('"on" found in pronouns list - returning Pronouns');
      }
      return 'Pronouns';
    }

    // Possessives
    const possessives = ['mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs'];
    if (possessives.includes(french)) return 'Possessives';

    // Question words
    const questionWords = ['que', 'qui', 'où', 'quand', 'comment', 'pourquoi', 'combien', 'quel', 'quelle', 'quels', 'quelles'];
    if (questionWords.includes(french)) return 'Question Words';

    // Prepositions
    const prepositions = ['à', 'de', 'dans', 'sur', 'sous', 'avec', 'sans', 'pour', 'par',
      'devant', 'derrière', 'entre', 'chez', 'vers', 'depuis', 'pendant', 'avant', 'après'];
    if (prepositions.includes(french)) return 'Prepositions';

    // Conjunctions
    const conjunctions = ['et', 'ou', 'mais', 'donc', 'car', 'ni', 'or', 'parce que', 'puisque', 'quand', 'si', 'comme'];
    if (conjunctions.includes(french)) return 'Conjunctions';

    // Numbers
    const numbers = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
      'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'cent', 'mille'];
    if (numbers.includes(french)) return 'Numbers';

    // Adverbs
    const adverbs = ['bien', 'mal', 'très', 'assez', 'beaucoup', 'peu', 'trop', 'plus', 'moins', 'aussi',
      'encore', 'déjà', 'jamais', 'toujours', 'souvent', 'parfois', 'maintenant', 'hier', 'demain'];
    if (adverbs.includes(french) || french.endsWith('ment')) return 'Adverbs';

    // Adjectives
    const adjectives = ['bon', 'bonne', 'mauvais', 'mauvaise', 'grand', 'grande', 'petit', 'petite',
      'beau', 'belle', 'nouveau', 'nouvelle', 'vieux', 'vieille', 'jeune', 'blanc', 'blanche', 'noir', 'noire',
      'rouge', 'bleu', 'bleue', 'vert', 'verte', 'content', 'contente', 'heureux', 'heureuse'];
    if (adjectives.includes(french)) return 'Adjectives';

    // Verbs - comprehensive list including all conjugated forms
    const verbs = [
      // Infinitives
      'être', 'avoir', 'faire', 'aller', 'venir', 'voir', 'savoir', 'pouvoir', 'vouloir', 'devoir', 'dire', 'prendre', 'mettre', 'partir', 'sortir', 'dormir', 'servir', 'ouvrir', 'couvrir', 'offrir', 'suffire',
      // être conjugations
      'suis', 'es', 'est', 'sommes', 'êtes', 'sont',
      // avoir conjugations
      'ai', 'as', 'a', 'avons', 'avez', 'ont',
      // faire conjugations
      'fais', 'fais', 'fait', 'faisons', 'faites', 'font',
      // aller conjugations
      'vais', 'vas', 'va', 'allons', 'allez', 'vont',
      // venir conjugations
      'viens', 'viens', 'vient', 'venons', 'venez', 'viennent',
      // voir conjugations
      'vois', 'vois', 'voit', 'voyons', 'voyez', 'voient',
      // savoir conjugations
      'sais', 'sais', 'sait', 'savons', 'savez', 'savent',
      // pouvoir conjugations
      'peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent',
      // vouloir conjugations
      'veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent',
      // dire conjugations
      'dis', 'dis', 'dit', 'disons', 'dites', 'disent',
      // prendre conjugations
      'prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent',
      // mettre conjugations
      'mets', 'mets', 'met', 'mettons', 'mettez', 'mettent',
      // partir conjugations
      'pars', 'pars', 'part', 'partons', 'partez', 'partent',
      // sortir conjugations
      'sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent',
      // dormir conjugations
      'dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment',
      // servir conjugations
      'sers', 'sers', 'sert', 'servons', 'servez', 'servent',
      // ouvrir conjugations
      'ouvre', 'ouvres', 'ouvre', 'ouvrons', 'ouvrez', 'ouvrent',
      // couvrir conjugations
      'couvre', 'couvres', 'couvre', 'couvrons', 'couvrez', 'couvrent',
      // offrir conjugations
      'offre', 'offres', 'offre', 'offrons', 'offrez', 'offrent',
      // suffire conjugations
      'suffis', 'suffis', 'suffit', 'suffisons', 'suffisez', 'suffisent'
    ];
    if (verbs.includes(french) || french.endsWith('er') || french.endsWith('ir') || french.endsWith('re')) return 'Verbs';

    if (french.includes(' ')) return 'Phrases';
    return 'Nouns';
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Articles': '#10b981',
      'Pronouns': '#3b82f6',
      'Verbs': '#f59e0b',
      'Nouns': '#8b5cf6',
      'Adjectives': '#ef4444',
      'Adverbs': '#f97316',
      'Prepositions': '#06b6d4',
      'Demonstratives': '#84cc16',
      'Question Words': '#ec4899',
      'Numbers': '#6366f1',
      'Conjunctions': '#14b8a6',
      'Expressions': '#f43f5e',
      'Possessives': '#a855f7',
      'Compound Nouns': '#7c3aed',
      'Phrases': '#db2777'
    };
    return colors[category] || '#6b7280';
  };

  useEffect(() => {
    const loadVocabulary = async () => {
      if (!supabaseUser || !supabaseClient) {
        setLoading(false);
        return;
      }

      try {
        // Get completed lessons
        const completedLessons = lessons.filter(lesson => {
          const total = getExerciseCount(lesson);
          if (total === 0) return false;
          const completed = getCompletedCount(lesson);
          return completed === total;
        });

        // Extract and categorize vocabulary using high-performance dictionary
        console.time('VocabularyDashboard: Dictionary processing');

        const nodesMap = new Map();
        const uniqueWords = new Set();

        // Get dictionary statistics for performance monitoring
        const dictStats = VocabularyStats.getWordCountByPartOfSpeech();
        console.log('📚 Dictionary loaded:', dictStats);

        completedLessons.forEach(lesson => {
          if (lesson.vocabularyReference && lesson.vocabularyReference.length > 0) {
            lesson.vocabularyReference.forEach(vocab => {
              const french = vocab.french.trim();

              // Check if this is a multi-word phrase that should be split
              const words = french.split(/[\s\-']+/).filter(word => word.length > 0);
              const shouldSplit = shouldSplitPhrase(french, words);

              if (shouldSplit) {
                // Split and process individual words
                words.forEach((word, index) => {
                  // Skip words containing '/' or starting with 'c', 's', or 'l'
                  if (word.includes('/') ||
                    word.toLowerCase().startsWith('c') ||
                    word.toLowerCase().startsWith('s') ||
                    word.toLowerCase().startsWith('l')) {
                    return; // Skip this word
                  }

                  if (!uniqueWords.has(word)) {
                    uniqueWords.add(word);

                    // Determine if this is an article + noun combination
                    const isArticle = ['le', 'la', 'les', 'un', 'une', 'du', 'de', 'des'].includes(word.toLowerCase());
                    const nextWord = words[index + 1];
                    const isArticleWithNoun = isArticle && nextWord && !['le', 'la', 'les', 'un', 'une', 'du', 'de', 'des'].includes(nextWord.toLowerCase());

                    // Create category for the word
                    let category;
                    if (isArticle) {
                      category = 'Articles';
                    } else if (isArticleWithNoun) {
                      // Keep article with noun as a phrase
                      const phrase = `${word} ${nextWord}`;
                      if (!uniqueWords.has(phrase)) {
                        uniqueWords.add(phrase);
                        category = categorizeWord({ french: phrase, english: vocab.english, note: vocab.note });
                        processWord(phrase, vocab, lesson, category, nodesMap);
                      }
                      return; // Skip processing the article alone
                    } else {
                      // For individual words, create a new vocab object with just the word
                      const wordVocab = { french: word, english: vocab.english, note: vocab.note };
                      category = categorizeWord(wordVocab);
                    }

                    processWord(word, vocab, lesson, category, nodesMap);
                  }
                });
              } else {
                // Process as a single phrase/word
                if (!uniqueWords.has(french)) {
                  uniqueWords.add(french);
                  const category = categorizeWord(vocab);
                  processWord(french, vocab, lesson, category, nodesMap);
                }
              }
            });
          }
        });

        // Helper function to determine if a phrase should be split
        function shouldSplitPhrase(french, words) {
          // Don't split single words
          if (words.length <= 1) return false;

          // Split adjective pairs (e.g., "bon / bonne")
          if (french.includes(' / ')) return true;

          // Split article + noun combinations
          const articles = ['le', 'la', 'les', 'un', 'une', 'du', 'de', 'des'];
          if (words.length === 2 && articles.includes(words[0].toLowerCase())) {
            return true;
          }

          // Split pronoun + verb combinations (but only for specific pronouns)
          const pronouns = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on'];
          if (words.length === 2 && pronouns.includes(words[0].toLowerCase())) {
            return true;
          }

          // Don't split other multi-word phrases like "au revoir", "bonjour", etc.
          return false;
        }

        // Helper function to process individual words
        function processWord(word, originalVocab, lesson, category, nodesMap) {
          // Extract grammatical information from original vocabulary
          const gender = originalVocab.gender || inferGender(word, originalVocab);
          const person = originalVocab.person || null;
          const type = originalVocab.type || null;
          const femForm = originalVocab.femForm || null;
          const classification = classifyWord(word, originalVocab);

          nodesMap.set(word, {
            id: word,
            french: word,
            english: originalVocab.english,
            note: originalVocab.note,
            category,
            lessonTitle: lesson.title,
            color: getCategoryColor(category),
            // Grammatical properties
            gender,
            person,
            type,
            femForm,
            classification
          });
        }

        // Dynamic word classification system
        function classifyWord(word, vocab) {
          // 1. Check explicit grammar info from vocabulary data
          if (vocab.gender) return { type: 'noun', gender: vocab.gender };
          if (vocab.person) return { type: 'pronoun', person: vocab.person };
          if (vocab.femForm) return { type: 'adjective', forms: [word, vocab.femForm] };

          // Special case for "on" - it's a pronoun, not a verb
          if (word.toLowerCase() === 'on') return { type: 'pronoun', person: 'third' };

          // 2. Pattern-based classification for verbs
          if (word.endsWith('er') || word.endsWith('ir') || word.endsWith('re')) {
            return { type: 'verb', infinitive: word };
          }

          // 3. Ending-based gender inference for nouns
          const feminineEndings = ['tion', 'sion', 'ette', 'ance', 'ence', 'ure', 'té'];
          const masculineEndings = ['ment', 'age', 'eau', 'isme'];

          if (feminineEndings.some(ending => word.endsWith(ending))) {
            return { type: 'noun', gender: 'feminine' };
          }
          if (masculineEndings.some(ending => word.endsWith(ending))) {
            return { type: 'noun', gender: 'masculine' };
          }

          // 4. Semantic field detection
          const semanticField = detectSemanticField(word, vocab.english);
          return { type: 'unknown', semanticField };
        }

        function detectSemanticField(french, english) {
          const fields = {
            family: ['mother', 'father', 'son', 'daughter', 'brother', 'sister', 'family', 'parent', 'mère', 'père', 'fils', 'fille', 'frère', 'sœur'],
            animals: ['cat', 'dog', 'bird', 'fish', 'animal', 'pet', 'chat', 'chien', 'oiseau', 'poisson'],
            food: ['bread', 'cheese', 'meat', 'vegetable', 'fruit', 'food', 'eat', 'drink', 'pain', 'fromage', 'viande'],
            colors: ['red', 'blue', 'green', 'yellow', 'white', 'black', 'color', 'rouge', 'bleu', 'vert', 'jaune', 'blanc', 'noir'],
            body: ['head', 'hand', 'foot', 'eye', 'mouth', 'nose', 'body', 'tête', 'main', 'pied', 'œil', 'bouche', 'nez'],
            greetings: ['hello', 'goodbye', 'hi', 'bye', 'good morning', 'good evening', 'bonjour', 'au revoir', 'salut'],
            emotions: ['happy', 'sad', 'angry', 'love', 'hate', 'like', 'feel', 'heureux', 'triste', 'aimer'],
            time: ['day', 'night', 'morning', 'evening', 'today', 'yesterday', 'tomorrow', 'jour', 'nuit', 'matin', 'soir'],
            places: ['house', 'school', 'city', 'country', 'place', 'location', 'maison', 'école', 'ville', 'pays']
          };

          const searchText = `${french} ${english}`.toLowerCase();

          for (const [field, keywords] of Object.entries(fields)) {
            if (keywords.some(keyword => searchText.includes(keyword.toLowerCase()))) {
              return field;
            }
          }

          return null;
        }

        function inferGender(word, vocab) {
          // Try to infer gender from various sources
          if (vocab.article) {
            if (vocab.article.includes('un ') || vocab.article.includes('le ')) return 'masculine';
            if (vocab.article.includes('une ') || vocab.article.includes('la ')) return 'feminine';
          }

          // Pattern-based inference
          const feminineEndings = ['tion', 'sion', 'ette', 'ance', 'ence', 'ure', 'té', 'ie'];
          const masculineEndings = ['ment', 'age', 'eau', 'isme', 'oir'];

          if (feminineEndings.some(ending => word.endsWith(ending))) return 'feminine';
          if (masculineEndings.some(ending => word.endsWith(ending))) return 'masculine';

          return null;
        }

        // Create nodes and connections between infinitives and conjugations
        const links = [];
        const nodes = Array.from(nodesMap.values());

        // Create connections between infinitives and their conjugations
        createInfinitiveConnections(nodes, links);

        // Create connections between subject pronouns and their conjugated verbs
        createPronounVerbConnections(nodes, links);

        // Position subject pronouns at the center
        positionPronounsAtCenter(nodes);

        // Create connections between articles and their gendered nouns
        createArticleConnections(nodes, links);

        // Create connections between adjectives and nouns by gender/number
        createAdjectiveNounConnections(nodes, links);

        // Create connections between masculine and feminine adjective forms
        createAdjectiveGenderConnections(nodes, links);

        // Debug: Force connection between petite and maison
        const petiteNode = nodes.find(n => n.french === 'petite');
        const maisonNode = nodes.find(n => n.french === 'maison');
        if (petiteNode && maisonNode) {
          links.push({
            source: petiteNode.id,
            target: maisonNode.id,
            strength: 'medium',
            type: 'adjective-noun'
          });
        }

        // Helper function to create connections between infinitives and conjugations
        function createInfinitiveConnections(nodes, links) {
          // Define verb families with their conjugations
          const verbFamilies = {
            'être': ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
            'avoir': ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
            'aller': ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
            'faire': ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
            'vouloir': ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
            'pouvoir': ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
            'venir': ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
            'voir': ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'],
            'savoir': ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'],
            'dire': ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
            'prendre': ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
            'mettre': ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'],
            'partir': ['pars', 'pars', 'part', 'partons', 'partez', 'partent'],
            'sortir': ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'],
            'dormir': ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'],
            'servir': ['sers', 'sers', 'sert', 'servons', 'servez', 'servent'],
            'ouvrir': ['ouvre', 'ouvres', 'ouvre', 'ouvrons', 'ouvrez', 'ouvrent'],
            'couvrir': ['couvre', 'couvres', 'couvre', 'couvrons', 'couvrez', 'couvrent'],
            'offrir': ['offre', 'offres', 'offre', 'offrons', 'offrez', 'offrent'],
            'suffire': ['suffis', 'suffis', 'suffit', 'suffisons', 'suffisez', 'suffisent']
          };

          // Create connections for each verb family
          Object.entries(verbFamilies).forEach(([infinitive, conjugations]) => {
            const infinitiveNode = nodes.find(n => n.french.toLowerCase() === infinitive);

            if (infinitiveNode) {
              conjugations.forEach(conjugation => {
                const conjugationNode = nodes.find(n => n.french.toLowerCase() === conjugation);

                if (conjugationNode) {
                  // Check if connection already exists
                  const existingConnection = links.find(link =>
                    (link.source === infinitiveNode.id && link.target === conjugationNode.id) ||
                    (link.source === conjugationNode.id && link.target === infinitiveNode.id)
                  );

                  if (!existingConnection) {
                    links.push({
                      source: infinitiveNode.id,
                      target: conjugationNode.id,
                      strength: 'very-strong',
                      type: 'infinitive-conjugation'
                    });
                  }
                }
              });
            }
          });
        }

        // Helper function to create connections between subject pronouns and their conjugated verbs
        function createPronounVerbConnections(nodes, links) {
          // Define pronoun-verb relationships
          const pronounVerbPairs = [
            // je + first person singular verbs
            { pronoun: 'je', verbs: ['suis', 'ai', 'vais', 'fais', 'veux', 'peux', 'viens', 'vois', 'sais', 'dis', 'prends', 'mets', 'pars', 'sors', 'dors', 'sers', 'ouvre', 'couvre', 'offre', 'suffis'] },
            // tu + second person singular verbs  
            { pronoun: 'tu', verbs: ['es', 'as', 'vas', 'fais', 'veux', 'peux', 'viens', 'vois', 'sais', 'dis', 'prends', 'mets', 'pars', 'sors', 'dors', 'sers', 'ouvres', 'couvres', 'offres', 'suffis'] },
            // il/elle + third person singular verbs
            { pronoun: 'il', verbs: ['est', 'a', 'va', 'fait', 'veut', 'peut', 'vient', 'voit', 'sait', 'dit', 'prend', 'met', 'part', 'sort', 'dort', 'sert', 'ouvre', 'couvre', 'offre', 'suffit'] },
            { pronoun: 'elle', verbs: ['est', 'a', 'va', 'fait', 'veut', 'peut', 'vient', 'voit', 'sait', 'dit', 'prend', 'met', 'part', 'sort', 'dort', 'sert', 'ouvre', 'couvre', 'offre', 'suffit'] },
            // nous + first person plural verbs
            { pronoun: 'nous', verbs: ['sommes', 'avons', 'allons', 'faisons', 'voulons', 'pouvons', 'venons', 'voyons', 'savons', 'disons', 'prenons', 'mettons', 'partons', 'sortons', 'dormons', 'servons', 'ouvrons', 'couvrons', 'offrons', 'suffisons'] },
            // vous + second person plural verbs
            { pronoun: 'vous', verbs: ['êtes', 'avez', 'allez', 'faites', 'voulez', 'pouvez', 'venez', 'voyez', 'savez', 'dites', 'prenez', 'mettez', 'partez', 'sortez', 'dormez', 'servez', 'ouvrez', 'couvrez', 'offrez', 'suffisez'] },
            // ils/elles + third person plural verbs
            { pronoun: 'ils', verbs: ['sont', 'ont', 'vont', 'font', 'veulent', 'peuvent', 'viennent', 'voient', 'savent', 'disent', 'prennent', 'mettent', 'partent', 'sortent', 'dorment', 'servent', 'ouvrent', 'couvrent', 'offrent', 'suffisent'] },
            { pronoun: 'elles', verbs: ['sont', 'ont', 'vont', 'font', 'veulent', 'peuvent', 'viennent', 'voient', 'savent', 'disent', 'prennent', 'mettent', 'partent', 'sortent', 'dorment', 'servent', 'ouvrent', 'couvrent', 'offrent', 'suffisent'] },
            // on + third person singular verbs (like il/elle)
            { pronoun: 'on', verbs: ['est', 'a', 'va', 'fait', 'veut', 'peut', 'vient', 'voit', 'sait', 'dit', 'prend', 'met', 'part', 'sort', 'dort', 'sert', 'ouvre', 'couvre', 'offre', 'suffit'] }
          ];

          // Create connections for each pronoun-verb pair
          pronounVerbPairs.forEach(({ pronoun, verbs }) => {
            const pronounNode = nodes.find(n => n.french.toLowerCase() === pronoun);

            if (pronounNode) {
              verbs.forEach(verb => {
                const verbNode = nodes.find(n => n.french.toLowerCase() === verb);

                if (verbNode) {
                  // Check if connection already exists
                  const existingConnection = links.find(link =>
                    (link.source === pronounNode.id && link.target === verbNode.id) ||
                    (link.source === verbNode.id && link.target === pronounNode.id)
                  );

                  if (!existingConnection) {
                    links.push({
                      source: pronounNode.id,
                      target: verbNode.id,
                      strength: 'medium',
                      type: 'pronoun-verb'
                    });
                  }
                }
              });
            }
          });
        }

        // Helper function to position subject pronouns at the center
        function positionPronounsAtCenter(nodes) {
          // Define center positions with je at the very center, pronouns clustered tightly
          const centerPositions = [
            { pronoun: 'je', fx: 0, fy: 0 },        // Center
            { pronoun: 'tu', fx: 25, fy: -15 },     // Top right
            { pronoun: 'il', fx: 30, fy: 0 },       // Right center
            { pronoun: 'elle', fx: 25, fy: 15 },    // Bottom right
            { pronoun: 'nous', fx: 0, fy: 25 },     // Bottom center
            { pronoun: 'vous', fx: -25, fy: 15 },    // Bottom left
            { pronoun: 'ils', fx: -30, fy: 0 },      // Left center
            { pronoun: 'elles', fx: -25, fy: -15 },  // Top left
            { pronoun: 'on', fx: 0, fy: -35 }        // Above center
          ];

          centerPositions.forEach(({ pronoun, fx, fy }) => {
            const pronounNode = nodes.find(n => n.french.toLowerCase() === pronoun);
            if (pronounNode) {
              pronounNode.fx = fx;
              pronounNode.fy = fy;
            }
          });
        }

        // Helper function to create connections between articles and their gendered nouns
        function createArticleConnections(nodes, links) {
          // Define article-noun relationships based on gender
          const articleNounPairs = [
            // Masculine articles with masculine nouns
            { article: 'le', nouns: ['homme', 'livre', 'chat', 'chien', 'ami', 'café', 'jour', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { article: 'un', nouns: ['homme', 'livre', 'chat', 'ami', 'café', 'jour', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { article: 'du', nouns: ['café', 'pain', 'fromage', 'vin', 'lait'] },

            // Feminine articles with feminine nouns
            { article: 'la', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { article: 'une', nouns: ['femme', 'maison', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { article: 'de', nouns: ['maison', 'école', 'ville', 'pays', 'famille'] },

            // Plural articles with plural nouns
            { article: 'les', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { article: 'des', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] }
          ];

          // Create connections for each article-noun pair
          articleNounPairs.forEach(({ article, nouns }) => {
            const articleNode = nodes.find(n => n.french.toLowerCase() === article);

            if (articleNode) {
              nouns.forEach(noun => {
                const nounNode = nodes.find(n => n.french.toLowerCase() === noun);

                if (nounNode) {
                  // Check if connection already exists
                  const existingConnection = links.find(link =>
                    (link.source === articleNode.id && link.target === nounNode.id) ||
                    (link.source === nounNode.id && link.target === articleNode.id)
                  );

                  if (!existingConnection) {
                    links.push({
                      source: articleNode.id,
                      target: nounNode.id,
                      strength: 'medium',
                      type: 'article-noun'
                    });
                  }
                }
              });
            }
          });

          // Create connections between related articles
          const articleGroups = [
            // Masculine articles
            { articles: ['le', 'un', 'du'] },
            // Feminine articles  
            { articles: ['la', 'une', 'de'] },
            // Plural articles
            { articles: ['les', 'des'] }
          ];

          articleGroups.forEach(({ articles }) => {
            for (let i = 0; i < articles.length; i++) {
              for (let j = i + 1; j < articles.length; j++) {
                const article1Node = nodes.find(n => n.french.toLowerCase() === articles[i]);
                const article2Node = nodes.find(n => n.french.toLowerCase() === articles[j]);

                if (article1Node && article2Node) {
                  // Check if connection already exists
                  const existingConnection = links.find(link =>
                    (link.source === article1Node.id && link.target === article2Node.id) ||
                    (link.source === article2Node.id && link.target === article1Node.id)
                  );

                  if (!existingConnection) {
                    links.push({
                      source: article1Node.id,
                      target: article2Node.id,
                      strength: 'weak',
                      type: 'article-article'
                    });
                  }
                }
              }
            }
          });
        }

        // Helper function to create connections between adjectives and nouns by gender/number
        function createAdjectiveNounConnections(nodes, links) {
          // Get all adjectives and nouns
          const adjectives = nodes.filter(n => n.category === 'Adjectives');
          const nouns = nodes.filter(n => n.category === 'Nouns');

          // Define adjective-noun pairs based on gender and number agreement
          const adjectiveNounPairs = [
            // Masculine singular
            { adjective: 'bon', nouns: ['homme', 'livre', 'chat', 'chien', 'ami', 'café', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'grand', nouns: ['homme', 'livre', 'chat', 'chien', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'petit', nouns: ['chat', 'enfant', 'livre', 'pied', 'œil', 'nez', 'main'] },
            { adjective: 'beau', nouns: ['homme', 'livre', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'nouveau', nouns: ['livre', 'chat', 'chien', 'ami', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'vieux', nouns: ['homme', 'livre', 'chat', 'chien', 'ami', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'jeune', nouns: ['homme', 'enfant', 'chat', 'chien', 'ami', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'blanc', nouns: ['chat', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'noir', nouns: ['chat', 'chien', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'rouge', nouns: ['chat', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'bleu', nouns: ['chat', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'vert', nouns: ['chat', 'livre', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'content', nouns: ['homme', 'enfant', 'chat', 'chien', 'ami', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },
            { adjective: 'heureux', nouns: ['homme', 'enfant', 'chat', 'chien', 'ami', 'jour', 'pied', 'œil', 'nez', 'corps', 'tête', 'main'] },

            // Feminine singular
            { adjective: 'bonne', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'grande', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'petite', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'belle', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'nouvelle', nouns: ['maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'vieille', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'jeune', nouns: ['femme', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'blanche', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'noire', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'rouge', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'bleue', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'verte', nouns: ['femme', 'maison', 'voiture', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'contente', nouns: ['femme', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },
            { adjective: 'heureuse', nouns: ['femme', 'amie', 'nuit', 'bouche', 'main', 'tête', 'famille', 'école', 'ville', 'pays'] },

            // Plural (both masculine and feminine)
            { adjective: 'bons', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'bonnes', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'grands', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'grandes', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'petits', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'petites', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'beaux', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'belles', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'nouveaux', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'nouvelles', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'vieux', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'vieux', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'jeunes', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'blancs', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'blanches', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'noirs', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'noires', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'rouges', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'bleus', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'bleues', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'verts', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'vertes', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'contents', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'contentes', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'heureux', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] },
            { adjective: 'heureuses', nouns: ['enfants', 'amis', 'chats', 'chiens', 'maisons', 'voitures', 'livres', 'mains', 'têtes', 'yeux', 'pieds'] }
          ];

          // Create connections for each adjective-noun pair
          adjectiveNounPairs.forEach(({ adjective, nouns }) => {
            const adjectiveNode = nodes.find(n => n.french.toLowerCase() === adjective);

            if (adjectiveNode) {
              nouns.forEach(noun => {
                const nounNode = nodes.find(n => n.french.toLowerCase() === noun);

                if (nounNode) {
                  // Check if connection already exists
                  const existingConnection = links.find(link =>
                    (link.source === adjectiveNode.id && link.target === nounNode.id) ||
                    (link.source === nounNode.id && link.target === adjectiveNode.id)
                  );

                  if (!existingConnection) {
                    links.push({
                      source: adjectiveNode.id,
                      target: nounNode.id,
                      strength: 'medium',
                      type: 'adjective-noun'
                    });
                  }
                }
              });
            }
          });
        }

        // Helper function to create connections between masculine and feminine adjective forms
        function createAdjectiveGenderConnections(nodes, links) {
          // Define adjective pairs (masculine -> feminine)
          const adjectivePairs = {
            'bon': 'bonne',
            'grand': 'grande',
            'petit': 'petite',
            'nouveau': 'nouvelle',
            'vieux': 'vieille',
            'beau': 'belle',
            'blanc': 'blanche',
            'noir': 'noire',
            'rouge': 'rouge', // same form
            'bleu': 'bleue',
            'vert': 'verte',
            'content': 'contente',
            'heureux': 'heureuse'
          };

          // Create connections between masculine and feminine forms
          Object.entries(adjectivePairs).forEach(([masc, fem]) => {
            const mascNode = nodes.find(n => n.french === masc && n.category === 'Adjectives');
            const femNode = nodes.find(n => n.french === fem && n.category === 'Adjectives');

            if (mascNode && femNode) {
              // Check if connection already exists
              const existingConnection = links.find(link =>
                (link.source === mascNode.id && link.target === femNode.id) ||
                (link.source === femNode.id && link.target === mascNode.id)
              );

              if (!existingConnection) {
                links.push({
                  source: mascNode.id,
                  target: femNode.id,
                  strength: 'strong',
                  type: 'adjective-gender'
                });
              }
            }
          });
        }

        console.timeEnd('VocabularyDashboard: Dictionary processing');

        setGraphData({ nodes, links });
        setTotalWords(uniqueWords.size);

        console.log(`📊 Processed ${uniqueWords.size} vocabulary items in dashboard`);
      } catch (error) {
        console.error('Error loading vocabulary:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVocabulary();
  }, [supabaseUser, supabaseClient, moduleProgress, completedExercises]);

  // Custom node canvas object
  const drawNode = useCallback((node, ctx, globalScale) => {
    const label = node.french;
    const fontSize = 11 / globalScale;
    const nodeRadius = 1.2;

    ctx.font = `${fontSize}px Sans-Serif`;

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();

    // Draw stroke
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.15;
    ctx.stroke();

    // Draw label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 2;
    ctx.fillText(label, node.x, node.y + nodeRadius + 1);
    ctx.shadowBlur = 0;

    // Draw English translation
    ctx.font = `${fontSize * 0.65}px Sans-Serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(node.english, node.x, node.y + nodeRadius + 1 + fontSize + 0.5);
  }, []);

  if (loading) {
    return (
      <div className="vocabulary-dashboard">
        <div className="loading">Loading vocabulary tree...</div>
      </div>
    );
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      window.history.back();
    }
  };

  return (
    <div className="vocabulary-modal-backdrop" onClick={handleBackdropClick}>
      <div className="vocabulary-dashboard">
        <div className="vocabulary-header">
          <h1>Language Mastery Tree</h1>
          <div className="header-controls">
            <div className="vocabulary-stats">
              <span className="stat-text">{totalWords} Words & Phrases</span>
            </div>
            <button
              className="close-button"
              onClick={() => window.history.back()}
              title="Close vocabulary tree"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="canvas-controls">
          <button
            onClick={() => graphRef.current?.zoomToFit(400)}
            title="Fit to view"
          >
            <Home size={14} />
          </button>
          <button
            onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * 1.2)}
            title="Zoom in"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * 0.8)}
            title="Zoom out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => graphRef.current?.centerAt(0, 0, 1000)}
            title="Center view"
          >
            <Target size={14} />
          </button>
          <button
            onClick={() => {
              // Restart the simulation to reorganize nodes
              graphRef.current?.d3ReheatSimulation();
            }}
            title="Reorganize layout"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="graph-container">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeId="id"
            nodeLabel={node => `
            <div style="background: rgba(0,0,0,0.9); padding: 8px 12px; border-radius: 6px; font-size: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${node.french} - ${node.english}</div>
              ${node.note ? `<div style="opacity: 0.8; font-style: italic; margin-bottom: 4px;">${node.note}</div>` : ''}
              <div style="font-size: 10px; opacity: 0.6; margin-top: 4px;">${node.lessonTitle}</div>
              <div style="font-size: 9px; opacity: 0.5; margin-top: 2px;">
                ${node.category}
              </div>
            </div>
          `}
            nodeCanvasObject={drawNode}
            nodeCanvasObjectMode={() => 'replace'}
            linkColor={link => {
              if (link.type === 'infinitive-conjugation') return 'rgba(255, 215, 0, 0.6)'; // Gold for infinitive-conjugation
              if (link.type === 'pronoun-verb') return 'rgba(0, 255, 255, 0.6)'; // Cyan for pronoun-verb
              if (link.type === 'article-noun') return 'rgba(255, 165, 0, 0.6)'; // Orange for article-noun
              if (link.type === 'article-article') return 'rgba(255, 192, 203, 0.6)'; // Pink for article-article
              if (link.type === 'adjective-noun') return 'rgba(255, 0, 255, 0.6)'; // Magenta for adjective-noun
              if (link.type === 'adjective-gender') return 'rgba(255, 100, 100, 0.8)'; // Red for adjective-gender
              return 'rgba(255, 255, 255, 0.15)'; // White for other connections
            }}
            linkWidth={link => {
              if (link.type === 'infinitive-conjugation') return 1.0;
              if (link.type === 'pronoun-verb') return 0.8;
              if (link.type === 'article-noun') return 0.6;
              if (link.type === 'article-article') return 0.4;
              if (link.type === 'adjective-noun') return 0.5;
              if (link.type === 'adjective-gender') return 0.7;
              return 0.4;
            }}
            linkDirectionalParticles={0}
            backgroundColor="rgba(15, 23, 42, 1)"
            cooldownTicks={300}
            onEngineStop={() => graphRef.current?.zoomToFit(400)}
            enableNodeDrag={true}
            enableZoomInteraction={true}
            enablePanInteraction={true}
            d3VelocityDecay={0.15}
            d3AlphaDecay={0.008}
            d3ReheatSimulation={false}
            linkDistance={link => {
              if (link.strength === 'very-strong') return 40; // Infinitive-conjugation connections
              if (link.strength === 'strong') return 60; // Strong connections
              if (link.strength === 'medium') return 80; // Pronoun-verb and article-noun connections
              if (link.strength === 'weak') return 90; // Article-article connections
              return 100; // Other connections
            }}
            nodeRepulsion={-300}
            d3Force="center"
            d3ForceStrength={0.1}
            onNodeDragEnd={node => {
              // Release fixed position after drag
              node.fx = node.fy = undefined;
            }}
          />
        </div>

        {graphData.nodes.length === 0 && (
          <div className="no-vocabulary">
            <p>No vocabulary found. Complete some lessons to see your learned words here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VocabularyDashboard;
