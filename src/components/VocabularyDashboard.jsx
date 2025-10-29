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

// Graph display constants
const GRAPH_CONSTANTS = {
  // Link properties
  LINK_COLOR: '#f59e0b',
  LINK_WIDTH: 1,
  LINK_DISTANCE: 80,
  
  // Node properties
  NODE_REPULSION: -300,
  NODE_RADIUS: 1.2,
  NODE_FONT_SIZE: 11,
  NODE_STROKE_WIDTH: 0.15,
  NODE_STROKE_OPACITY: 0.4,
  NODE_FILL_OPACITY: 0.9,
  NODE_SHADOW_BLUR: 2,
  NODE_LABEL_OFFSET: 1,
  NODE_ENGLISH_FONT_SCALE: 0.65,
  NODE_ENGLISH_OPACITY: 0.6,
  NODE_ENGLISH_OFFSET: 0.5,
  
  // Force simulation properties
  VELOCITY_DECAY: 0.3,
  ALPHA_DECAY: 0.02,
  CENTER_FORCE_STRENGTH: 0.1,
  
  // Animation properties
  COOLDOWN_TICKS: 300,
  ZOOM_FIT_DURATION: 400,
  ZOOM_IN_FACTOR: 1.2,
  ZOOM_OUT_FACTOR: 0.8,
  CENTER_AT_DURATION: 1000,
  INITIAL_ZOOM: 0.4,
  
  // UI properties
  ICON_SIZE: 14,
  TOOLTIP_BACKGROUND: 'rgba(0,0,0,0.9)',
  TOOLTIP_PADDING: '8px 12px',
  TOOLTIP_BORDER_RADIUS: 6,
  TOOLTIP_FONT_SIZE: 8,
  TOOLTIP_FONT_WEIGHT: 600,
  TOOLTIP_MARGIN_BOTTOM: 4,
  TOOLTIP_OPACITY: 0.8,
  TOOLTIP_FONT_STYLE: 'italic',
  TOOLTIP_MARGIN_TOP: 4,
  TOOLTIP_FONT_SIZE_SMALL: 10,
  TOOLTIP_OPACITY_SMALL: 0.6,
  TOOLTIP_FONT_SIZE_TINY: 9,
  TOOLTIP_OPACITY_TINY: 0.5,
  TOOLTIP_MARGIN_TOP_TINY: 2,
  
  // Background
  BACKGROUND_COLOR: 'rgba(15, 23, 42, 1)',
  
  // Canvas drawing constants
  CANVAS_ARC_START: 0,
  CANVAS_ARC_END: 2 * Math.PI,
  CANVAS_SHADOW_COLOR: 'rgba(0, 0, 0, 0.8)',
  
  // Array access
  FIRST_TRANSLATION_INDEX: 0,
  
  // Center coordinates
  CENTER_X: 0,
  CENTER_Y: 0
};

function VocabularyDashboard({ completedExercises }) {
  const { supabaseClient, supabaseUser } = useAuth();
  const { moduleProgress } = useSupabaseProgress();
  const { allWords } = useDictionary();
  const graphRef = useRef();

  // Debug: Log constants on component mount
  console.log('🔧 GRAPH_CONSTANTS loaded:', GRAPH_CONSTANTS);

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

  // Simple word categorization using dictionary data only
  const categorizeWord = (word) => {
    // Use the part of speech from the dictionary entry
    switch (word.partOfSpeech) {
      case 'noun': return 'Nouns';
      case 'verb': return 'Verbs';
      case 'adjective': return 'Adjectives';
      case 'adverb': return 'Adverbs';
      case 'pronoun': return 'Pronouns';
      case 'article': return 'Articles';
      case 'preposition': return 'Prepositions';
      case 'conjunction': return 'Conjunctions';
      case 'interjection': return 'Interjections';
      case 'interrogative': return 'Question Words';
      case 'alphabet': return 'Alphabet';
      case 'expression': return 'Expressions';
      default: return 'Other';
    }
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
      // Only show words that have BOTH unit AND module fields
      if (!word.unit || !word.module || word.module === 'undefined') {
        return false;
      }
      
      // Check if word belongs to a completed module (using dictionary module field)
      if (completedModuleKeys.has(word.module)) {
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
        
        // Debug: Check if pronouns exist in the entire dictionary
        const allPronouns = allWords.filter(word => word.partOfSpeech === 'pronoun');
        console.log(`🔍 Total pronouns in dictionary: ${allPronouns.length}`, allPronouns.slice(0, 10).map(p => p.word));

        // Get words from dictionary based on completed lessons
        const learnedWords = getWordsFromCompletedLessons();
        console.log(`📚 Found ${learnedWords.length} words from completed lessons`);
        
        // Debug: Check for pronouns specifically
        const pronouns = learnedWords.filter(word => word.partOfSpeech === 'pronoun');
        console.log(`🔍 Pronouns found: ${pronouns.length}`, pronouns.map(p => p.word));
        
        // Debug: Check all part of speech types
        const posCounts = {};
        learnedWords.forEach(word => {
          posCounts[word.partOfSpeech] = (posCounts[word.partOfSpeech] || 0) + 1;
        });
        console.log('📊 Part of speech counts:', posCounts);

        // Process each learned word
        learnedWords.forEach(word => {
          const french = word.word.trim();
          
                if (!uniqueWords.has(french)) {
                  uniqueWords.add(french);
            
            // Determine category from part of speech
            const category = categorizeWord(word);

            // Create node data
            const nodeData = {
              id: french,
              french: french,
              english: word.translations?.[GRAPH_CONSTANTS.FIRST_TRANSLATION_INDEX]?.text || 'No translation',
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
        
        // Position "je" at the center of the canvas (0,0)
        const jeNode = nodes.find(node => node.french === 'je');
        if (jeNode) {
          jeNode.x = 0;
          jeNode.y = 0;
          jeNode.fx = 0; // Fix the position so it stays in center
          jeNode.fy = 0;
          console.log('🎯 Positioned "je" at center:', jeNode);
        }

        // Create verb connections using relationships
        const links = [];
        const verbNodes = nodes.filter(node => node.category === 'Verbs');
        
        verbNodes.forEach(node => {
          const wordEntry = learnedWords.find(w => w.word === node.french);
          if (wordEntry && wordEntry.relationships) {
            wordEntry.relationships.forEach(relationship => {
              if (relationship.type === 'conjugation_pair') {
                const targetWord = relationship.targetWord;
                const targetNode = nodes.find(n => n.french === targetWord);
                
                if (targetNode) {
          links.push({
                    source: node.french,
                    target: targetWord,
                    type: 'conjugation',
                    note: relationship.note || 'conjugation'
                    });
                  }
                }
              });
            }
          });

        // Create connections from "je" to its present tense forms
        const jeNode = nodes.find(node => node.french === 'je');
        if (jeNode) {
          // Find all present tense forms of "je" that have been learned
          const jePresentForms = learnedWords.filter(word => {
            // Look for words that are conjugations of verbs with "je" as the subject
            return word.person === '1st' && word.type === 'present' && word.word !== 'je';
          });
          
          jePresentForms.forEach(form => {
            const formNode = nodes.find(n => n.french === form.word);
            if (formNode) {
              links.push({
                source: 'je',
                target: form.word,
                type: 'je_conjugation',
                note: 'je present form'
              });
            }
          });
          
          console.log(`🔗 Connected "je" to ${jePresentForms.length} present forms:`, jePresentForms.map(f => f.word));
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
  }, [supabaseUser, supabaseClient, moduleProgress, completedExercises, allWords]);

  // Set initial zoom when graph data loads
  useEffect(() => {
    if (graphData.nodes.length > 0 && graphRef.current) {
      // Small delay to ensure graph is fully rendered
      const timer = setTimeout(() => {
        if (graphRef.current) {
          console.log('🔍 Setting initial zoom to:', GRAPH_CONSTANTS.INITIAL_ZOOM);
          graphRef.current.zoom(GRAPH_CONSTANTS.INITIAL_ZOOM, 0);
          console.log('🔍 Current zoom after setting:', graphRef.current.zoom());
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [graphData.nodes.length]);

  // Custom node canvas object
  const drawNode = useCallback((node, ctx, globalScale) => {
    const label = node.french;
    // Apply minimum font size to ensure constants have visible effect
    const fontSize = Math.max(GRAPH_CONSTANTS.NODE_FONT_SIZE / globalScale, 8);
    const nodeRadius = GRAPH_CONSTANTS.NODE_RADIUS;
    
    // Debug: Log constants being used (only for first node to avoid spam)
    if (node.id === graphData.nodes[0]?.id) {
      console.log('🎨 Drawing constants:', {
        NODE_FONT_SIZE: GRAPH_CONSTANTS.NODE_FONT_SIZE,
        NODE_RADIUS: GRAPH_CONSTANTS.NODE_RADIUS,
        NODE_STROKE_WIDTH: GRAPH_CONSTANTS.NODE_STROKE_WIDTH,
        NODE_STROKE_OPACITY: GRAPH_CONSTANTS.NODE_STROKE_OPACITY,
        NODE_FILL_OPACITY: GRAPH_CONSTANTS.NODE_FILL_OPACITY,
        NODE_SHADOW_BLUR: GRAPH_CONSTANTS.NODE_SHADOW_BLUR,
        NODE_LABEL_OFFSET: GRAPH_CONSTANTS.NODE_LABEL_OFFSET,
        NODE_ENGLISH_FONT_SCALE: GRAPH_CONSTANTS.NODE_ENGLISH_FONT_SCALE,
        NODE_ENGLISH_OPACITY: GRAPH_CONSTANTS.NODE_ENGLISH_OPACITY,
        NODE_ENGLISH_OFFSET: GRAPH_CONSTANTS.NODE_ENGLISH_OFFSET,
        globalScale,
        actualFontSize: fontSize
      });
    }

    ctx.font = `${fontSize}px Sans-Serif`;

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, GRAPH_CONSTANTS.CANVAS_ARC_START, GRAPH_CONSTANTS.CANVAS_ARC_END, false);
    ctx.fillStyle = node.color;
    ctx.fill();

    // Draw stroke
    ctx.strokeStyle = `rgba(255, 255, 255, ${GRAPH_CONSTANTS.NODE_STROKE_OPACITY})`;
    ctx.lineWidth = GRAPH_CONSTANTS.NODE_STROKE_WIDTH;
    ctx.stroke();

    // Draw label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = `rgba(255, 255, 255, ${GRAPH_CONSTANTS.NODE_FILL_OPACITY})`;
    ctx.shadowColor = GRAPH_CONSTANTS.CANVAS_SHADOW_COLOR;
    ctx.shadowBlur = GRAPH_CONSTANTS.NODE_SHADOW_BLUR;
    ctx.fillText(label, node.x, node.y + nodeRadius + GRAPH_CONSTANTS.NODE_LABEL_OFFSET);
    ctx.shadowBlur = 0;

    // Draw English translation
    ctx.font = `${fontSize * GRAPH_CONSTANTS.NODE_ENGLISH_FONT_SCALE}px Sans-Serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${GRAPH_CONSTANTS.NODE_ENGLISH_OPACITY})`;
    ctx.fillText(node.english, node.x, node.y + nodeRadius + GRAPH_CONSTANTS.NODE_LABEL_OFFSET + fontSize + GRAPH_CONSTANTS.NODE_ENGLISH_OFFSET);
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
              <X size={GRAPH_CONSTANTS.ICON_SIZE} />
            </button>
          </div>
        </div>

        <div className="canvas-controls">
          <button
            onClick={() => graphRef.current?.zoomToFit(GRAPH_CONSTANTS.ZOOM_FIT_DURATION)}
            title="Fit to view"
          >
            <Home size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
          <button
            onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * GRAPH_CONSTANTS.ZOOM_IN_FACTOR)}
            title="Zoom in"
          >
            <ZoomIn size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
          <button
            onClick={() => graphRef.current?.zoom(graphRef.current.zoom() * GRAPH_CONSTANTS.ZOOM_OUT_FACTOR)}
            title="Zoom out"
          >
            <ZoomOut size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
          <button
            onClick={() => graphRef.current?.centerAt(GRAPH_CONSTANTS.CENTER_X, GRAPH_CONSTANTS.CENTER_Y, GRAPH_CONSTANTS.CENTER_AT_DURATION)}
            title="Center view"
          >
            <Target size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
          <button
            onClick={() => {
              // Restart the simulation to reorganize nodes
              graphRef.current?.d3ReheatSimulation();
            }}
            title="Reorganize layout"
          >
            <RotateCcw size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
        </div>

        <div className="graph-container">
          <ForceGraph2D
            key={`graph-${GRAPH_CONSTANTS.NODE_REPULSION}-${GRAPH_CONSTANTS.LINK_DISTANCE}-${GRAPH_CONSTANTS.CENTER_FORCE_STRENGTH}-${GRAPH_CONSTANTS.NODE_RADIUS}-${GRAPH_CONSTANTS.NODE_FONT_SIZE}-${GRAPH_CONSTANTS.LINK_WIDTH}-${GRAPH_CONSTANTS.VELOCITY_DECAY}-${GRAPH_CONSTANTS.ALPHA_DECAY}-${GRAPH_CONSTANTS.BACKGROUND_COLOR}`}
            ref={graphRef}
            graphData={graphData}
            nodeId="id"
            nodeLabel={node => `
            <div style="background: ${GRAPH_CONSTANTS.TOOLTIP_BACKGROUND}; padding: ${GRAPH_CONSTANTS.TOOLTIP_PADDING}; border-radius: ${GRAPH_CONSTANTS.TOOLTIP_BORDER_RADIUS}px; font-size: ${GRAPH_CONSTANTS.TOOLTIP_FONT_SIZE}px;">
              <div style="font-weight: ${GRAPH_CONSTANTS.TOOLTIP_FONT_WEIGHT}; margin-bottom: ${GRAPH_CONSTANTS.TOOLTIP_MARGIN_BOTTOM}px;">${node.french} - ${node.english}</div>
              ${node.note ? `<div style="opacity: ${GRAPH_CONSTANTS.TOOLTIP_OPACITY}; font-style: ${GRAPH_CONSTANTS.TOOLTIP_FONT_STYLE}; margin-bottom: ${GRAPH_CONSTANTS.TOOLTIP_MARGIN_BOTTOM}px;">${node.note}</div>` : ''}
              <div style="font-size: ${GRAPH_CONSTANTS.TOOLTIP_FONT_SIZE_SMALL}px; opacity: ${GRAPH_CONSTANTS.TOOLTIP_OPACITY_SMALL}; margin-top: ${GRAPH_CONSTANTS.TOOLTIP_MARGIN_TOP}px;">${node.lessonTitle}</div>
              <div style="font-size: ${GRAPH_CONSTANTS.TOOLTIP_FONT_SIZE_TINY}px; opacity: ${GRAPH_CONSTANTS.TOOLTIP_OPACITY_TINY}; margin-top: ${GRAPH_CONSTANTS.TOOLTIP_MARGIN_TOP_TINY}px;">
                ${node.category}
              </div>
            </div>
          `}
            nodeCanvasObject={drawNode}
            nodeCanvasObjectMode={() => 'replace'}
            linkColor={() => GRAPH_CONSTANTS.LINK_COLOR}
            linkWidth={GRAPH_CONSTANTS.LINK_WIDTH}
            linkDistance={GRAPH_CONSTANTS.LINK_DISTANCE}
            backgroundColor={GRAPH_CONSTANTS.BACKGROUND_COLOR}
            cooldownTicks={GRAPH_CONSTANTS.COOLDOWN_TICKS}
            onEngineStop={() => {
              // Set initial zoom level after simulation settles
              if (graphRef.current) {
                graphRef.current.zoom(GRAPH_CONSTANTS.INITIAL_ZOOM, 0);
                // Only zoom to fit if there are very few nodes, otherwise let it settle naturally
                if (graphData.nodes.length <= 10) {
                  graphRef.current?.zoomToFit(GRAPH_CONSTANTS.ZOOM_FIT_DURATION);
                }
              }
            }}
            enableNodeDrag={true}
            enableZoomInteraction={true}
            enablePanInteraction={true}
            d3VelocityDecay={GRAPH_CONSTANTS.VELOCITY_DECAY}
            d3AlphaDecay={GRAPH_CONSTANTS.ALPHA_DECAY}
            d3ReheatSimulation={false}
            nodeRepulsion={GRAPH_CONSTANTS.NODE_REPULSION}
            d3Force="center"
            d3ForceStrength={GRAPH_CONSTANTS.CENTER_FORCE_STRENGTH}
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
