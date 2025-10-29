import { useState, useEffect, useCallback, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Home, ZoomIn, ZoomOut, Target, RotateCcw, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseProgress } from '../contexts/SupabaseProgressContext';
import { lessons } from '../lessons/lessonData';
import { extractModuleId } from '../utils/progressSync';
import { DictionaryLookup, LessonCompatibility, VocabularyStats } from '../data/dictionary/index.js';
import { useDictionary } from '../hooks/useDictionary';
import '../styles/VocabularyDashboard.css';

function VocabularyDashboard({ completedExercises }) {
  const { supabaseClient, supabaseUser } = useAuth();
  const { moduleProgress } = useSupabaseProgress();
  const { allWords } = useDictionary();
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

  // Helper function to get completed lesson modules
  const getCompletedLessonModules = () => {
    return lessons.filter(lesson => {
      const total = getExerciseCount(lesson);
      if (total === 0) return false;
      const completed = getCompletedCount(lesson);
      return completed === total;
    }).map(lesson => ({
      moduleKey: lesson.moduleKey,
      title: lesson.title,
      unit: lesson.unitNumber ? `unit${lesson.unitNumber}` : null
    }));
  };

  // Helper function to filter dictionary words by completed lessons
  const getWordsFromCompletedLessons = () => {
    const completedModules = getCompletedLessonModules();
    const completedModuleKeys = new Set(completedModules.map(m => m.moduleKey));
    const completedUnits = new Set(completedModules.map(m => m.unit).filter(Boolean));

    return allWords.filter(word => {
      // Check if word belongs to a completed module
      if (word.module && completedModuleKeys.has(word.module)) {
        return true;
      }
      
      // Check if word belongs to a completed unit
      if (word.unit && completedUnits.has(word.unit)) {
        return true;
      }
      
      return false;
    });
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

        // Get words from dictionary based on completed lessons
        const learnedWords = getWordsFromCompletedLessons();
        console.log(`📚 Found ${learnedWords.length} words from completed lessons`);

        // Process each learned word
        learnedWords.forEach(word => {
          const french = word.word.trim();
          
          if (!uniqueWords.has(french)) {
            uniqueWords.add(french);
            
            // Determine category from part of speech
            let category = 'Other';
            switch (word.partOfSpeech) {
              case 'noun': category = 'Nouns'; break;
              case 'verb': category = 'Verbs'; break;
              case 'adjective': category = 'Adjectives'; break;
              case 'adverb': category = 'Adverbs'; break;
              case 'pronoun': category = 'Pronouns'; break;
              case 'article': category = 'Articles'; break;
              case 'preposition': category = 'Prepositions'; break;
              case 'conjunction': category = 'Conjunctions'; break;
              case 'interjection': category = 'Interjections'; break;
              case 'interrogative': category = 'Interrogatives'; break;
              case 'alphabet': category = 'Alphabet'; break;
              case 'expression': category = 'Expressions'; break;
            }

            // Create node data
            const nodeData = {
              id: french,
              french: french,
              english: word.translations?.[0]?.text || 'No translation',
              note: word.definition || '',
              category: category,
              lessonTitle: `Unit ${word.unit?.replace('unit', '') || 'Unknown'}`,
              color: getCategoryColor(category),
              // Grammatical properties
              gender: word.gender || null,
              person: word.person || null,
              type: word.type || null,
              femForm: word.femForm || null,
              classification: {
                type: word.partOfSpeech,
                gender: word.gender,
                person: word.person
              }
            };

            nodesMap.set(french, nodeData);
          }
        });




        // Create nodes array
        const nodes = Array.from(nodesMap.values());




        console.timeEnd('VocabularyDashboard: Dictionary processing');

        setGraphData({ nodes, links: [] });
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
            backgroundColor="rgba(15, 23, 42, 1)"
            cooldownTicks={300}
            onEngineStop={() => graphRef.current?.zoomToFit(400)}
            enableNodeDrag={true}
            enableZoomInteraction={true}
            enablePanInteraction={true}
            d3VelocityDecay={0.15}
            d3AlphaDecay={0.008}
            d3ReheatSimulation={false}
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
