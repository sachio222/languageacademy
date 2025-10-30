import { useState, useEffect, useCallback, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Home, ZoomIn, ZoomOut, Target, RotateCcw, X } from 'lucide-react';
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
  TOOLTIP_MARGIN_TOP: 4,
  TOOLTIP_FONT_SIZE_SMALL: 10,
  TOOLTIP_OPACITY_SMALL: 0.6,
  
  // Background
  BACKGROUND_COLOR: 'rgba(15, 23, 42, 1)',
  
  // Canvas drawing constants
  CANVAS_ARC_START: 0,
  CANVAS_ARC_END: 2 * Math.PI,
  CANVAS_SHADOW_COLOR: 'rgba(0, 0, 0, 0.8)',
  
  // Zoom delay
  ZOOM_DELAY: 100,
  
  // Other constants
  MIN_FONT_SIZE: 8,
  SMALL_GRAPH_THRESHOLD: 10,
  
  // Colors
  PRONOUN_COLOR: '#3b82f6',
  VERB_COLOR: '#f59e0b',
  PRONOUN_LINK_COLOR: '#6b7280'
};

function VocabularyDashboard() {
  const graphRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    // Simple mock data for now
    const mockNodes = [
      { id: 'je', french: 'je', english: 'I', category: 'Pronouns', color: GRAPH_CONSTANTS.PRONOUN_COLOR, x: 0, y: 0, fx: 0, fy: 0 },
      { id: 'tu', french: 'tu', english: 'you', category: 'Pronouns', color: GRAPH_CONSTANTS.PRONOUN_COLOR },
      { id: 'vous', french: 'vous', english: 'you', category: 'Pronouns', color: GRAPH_CONSTANTS.PRONOUN_COLOR },
      { id: 'suis', french: 'suis', english: 'am', category: 'Verbs', color: GRAPH_CONSTANTS.VERB_COLOR },
      { id: 'es', french: 'es', english: 'are', category: 'Verbs', color: GRAPH_CONSTANTS.VERB_COLOR },
      { id: 'êtes', french: 'êtes', english: 'are', category: 'Verbs', color: GRAPH_CONSTANTS.VERB_COLOR }
    ];

    const mockLinks = [
      { source: 'je', target: 'tu', type: 'pronoun_connection', strokeDasharray: '5,5' },
      { source: 'je', target: 'vous', type: 'pronoun_connection', strokeDasharray: '5,5' },
      { source: 'je', target: 'suis', type: 'je_conjugation' },
      { source: 'tu', target: 'es', type: 'tu_conjugation' },
      { source: 'vous', target: 'êtes', type: 'vous_conjugation' }
    ];

    setGraphData({ nodes: mockNodes, links: mockLinks });
    setTotalWords(mockNodes.length);
    setLoading(false);
  }, []);

  // Set initial zoom when graph data loads
  useEffect(() => {
    if (graphData.nodes.length > 0 && graphRef.current) {
      const timer = setTimeout(() => {
        if (graphRef.current) {
          graphRef.current.zoom(GRAPH_CONSTANTS.INITIAL_ZOOM, 0);
        }
      }, GRAPH_CONSTANTS.ZOOM_DELAY);
      return () => clearTimeout(timer);
    }
  }, [graphData.nodes.length]);

  // Custom node canvas object
  const drawNode = useCallback((node, ctx, globalScale) => {
    const label = node.french;
    const fontSize = Math.max(GRAPH_CONSTANTS.NODE_FONT_SIZE / globalScale, GRAPH_CONSTANTS.MIN_FONT_SIZE);
    const nodeRadius = GRAPH_CONSTANTS.NODE_RADIUS;

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

  const handleClose = () => {
    window.history.back();
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
              onClick={handleClose}
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
            onClick={() => graphRef.current?.centerAt(0, 0, GRAPH_CONSTANTS.CENTER_AT_DURATION)}
            title="Center view"
          >
            <Target size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
          <button
            onClick={() => graphRef.current?.d3ReheatSimulation()}
            title="Reorganize layout"
          >
            <RotateCcw size={GRAPH_CONSTANTS.ICON_SIZE} />
          </button>
        </div>

        <div className="graph-container">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeId="id"
            nodeLabel={node => `
            <div style="background: ${GRAPH_CONSTANTS.TOOLTIP_BACKGROUND}; padding: ${GRAPH_CONSTANTS.TOOLTIP_PADDING}; border-radius: ${GRAPH_CONSTANTS.TOOLTIP_BORDER_RADIUS}px; font-size: ${GRAPH_CONSTANTS.TOOLTIP_FONT_SIZE}px;">
              <div style="font-weight: ${GRAPH_CONSTANTS.TOOLTIP_FONT_WEIGHT}; margin-bottom: ${GRAPH_CONSTANTS.TOOLTIP_MARGIN_BOTTOM}px;">${node.french} - ${node.english}</div>
              <div style="font-size: ${GRAPH_CONSTANTS.TOOLTIP_FONT_SIZE_SMALL}px; opacity: ${GRAPH_CONSTANTS.TOOLTIP_OPACITY_SMALL}; margin-top: ${GRAPH_CONSTANTS.TOOLTIP_MARGIN_TOP}px;">
                ${node.category}
              </div>
            </div>
          `}
            nodeCanvasObject={drawNode}
            nodeCanvasObjectMode={() => 'replace'}
            linkColor={link => 
              link.type === 'pronoun_connection' ? GRAPH_CONSTANTS.PRONOUN_LINK_COLOR : GRAPH_CONSTANTS.LINK_COLOR
            }
            linkWidth={link => 
              link.type === 'pronoun_connection' ? 2 : GRAPH_CONSTANTS.LINK_WIDTH
            }
            linkDashArray={link => 
              link.type === 'pronoun_connection' ? '5,5' : null
            }
            linkDistance={GRAPH_CONSTANTS.LINK_DISTANCE}
            backgroundColor={GRAPH_CONSTANTS.BACKGROUND_COLOR}
            cooldownTicks={GRAPH_CONSTANTS.COOLDOWN_TICKS}
            onEngineStop={() => {
              if (graphRef.current) {
                graphRef.current.zoom(GRAPH_CONSTANTS.INITIAL_ZOOM, 0);
                if (graphData.nodes.length <= GRAPH_CONSTANTS.SMALL_GRAPH_THRESHOLD) {
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
              node.fx = node.fy = undefined;
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default VocabularyDashboard;
