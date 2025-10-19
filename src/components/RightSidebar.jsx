import React, { useState } from 'react';
import ConceptPane from './ConceptPane';
import VocabularyReference from './VocabularyReference';
import './RightSidebar.css';

function RightSidebar({ concepts, vocabulary, moduleId }) {
  const [activeTab, setActiveTab] = useState('concepts');

  const hasVocabulary = vocabulary && vocabulary.length > 0;
  const hasConcepts = concepts && concepts.length > 0;

  // If no content, don't render
  if (!hasVocabulary && !hasConcepts) {
    return null;
  }

  // If only one type of content, show it without tabs
  if (!hasVocabulary && hasConcepts) {
    return (
      <div className="right-sidebar">
        <ConceptPane concepts={concepts} moduleId={moduleId} />
      </div>
    );
  }

  if (hasVocabulary && !hasConcepts) {
    return (
      <div className="right-sidebar">
        <VocabularyReference vocabulary={vocabulary} title="Vocabulary" />
      </div>
    );
  }

  // Both types of content - show tabs
  return (
    <div className="right-sidebar">
      <div className="sidebar-tabs">
        <button
          className={`tab-button ${activeTab === 'concepts' ? 'active' : ''}`}
          onClick={() => setActiveTab('concepts')}
        >
          Lesson Concepts
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
