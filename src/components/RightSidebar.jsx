import React, { useState, useEffect } from 'react';
import ConceptPane from './ConceptPane';
import VocabularyReference from './VocabularyReference';
import './RightSidebar.css';

function RightSidebar({ concepts, vocabulary, moduleId }) {
  const [activeTab, setActiveTab] = useState('concepts');
  const [isExpanded, setIsExpanded] = useState(false);

  // Notify parent when collapsed state changes
  useEffect(() => {
    const rightPane = document.querySelector('.right-pane');
    if (rightPane) {
      if (!isExpanded) {
        rightPane.classList.add('sidebar-collapsed');
      } else {
        rightPane.classList.remove('sidebar-collapsed');
      }
    }
  }, [isExpanded]);

  const hasVocabulary = vocabulary && vocabulary.length > 0;
  const hasConcepts = concepts && concepts.length > 0;

  // If no content, don't render
  if (!hasVocabulary && !hasConcepts) {
    return null;
  }

  // Collapsed state - show help button
  if (!isExpanded) {
    return (
      <div className="right-sidebar right-sidebar-collapsed">
        <button
          className="help-toggle-button"
          onClick={() => setIsExpanded(true)}
          aria-label="Show help - Concepts and Vocabulary"
        >
          <span className="help-icon">?</span>
          <span className="help-text">Module Vocab & Review</span>
        </button>
      </div>
    );
  }

  // If only one type of content, show it without tabs
  if (!hasVocabulary && hasConcepts) {
    return (
      <div className="right-sidebar">
        <button
          className="help-close-button"
          onClick={() => setIsExpanded(false)}
          aria-label="Hide help"
        >
          ×
        </button>
        <ConceptPane concepts={concepts} moduleId={moduleId} />
      </div>
    );
  }

  if (hasVocabulary && !hasConcepts) {
    return (
      <div className="right-sidebar">
        <button
          className="help-close-button"
          onClick={() => setIsExpanded(false)}
          aria-label="Hide help"
        >
          ×
        </button>
        <VocabularyReference vocabulary={vocabulary} title="Vocabulary" />
      </div>
    );
  }

  // Both types of content - show tabs
  return (
    <div className="right-sidebar">
      <button
        className="help-close-button"
        onClick={() => setIsExpanded(false)}
        aria-label="Hide help"
      >
        ×
      </button>
      <div className="sidebar-tabs">
        <button
          className={`tab-button ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          Concepts
        </button>
        <button
          className={`tab-button ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocab')}
        >
          Vocab
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'concepts' && (
          <ConceptPane concepts={concepts} moduleId={moduleId} />
        )}
        {activeTab === 'vocab' && (
          <VocabularyReference vocabulary={vocabulary} title="Vocabulary" />
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
