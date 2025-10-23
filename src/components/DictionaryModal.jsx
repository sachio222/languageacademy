import React from 'react';
import { useDictionary } from '../hooks/useDictionary';
import SpeakButton from './SpeakButton';
import '../styles/DictionaryModal.css';

// Helper function to normalize accented characters to base letters for header grouping
const getBaseLetterForHeader = (word) => {
  const firstChar = word.charAt(0).toLowerCase();
  // Map accented characters to their base letters
  const accentMap = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c', 'ñ': 'n', 'ÿ': 'y'
  };
  return (accentMap[firstChar] || firstChar).toUpperCase();
};


/**
 * Dictionary Modal Component
 * 
 * A comprehensive dictionary browser with filtering, search, and detailed word information.
 * Supports filtering by part of speech, CEFR level, difficulty, and more.
 * 
 * @component
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @returns {JSX.Element} The dictionary modal component
 */
function DictionaryModal({ isOpen, onClose }) {
  const {
    searchTerm,
    selectedPartOfSpeech,
    selectedCefrLevel,
    selectedDifficulty,
    sortBy,
    sortOrder,
    selectedWord,
    setSearchTerm,
    setSelectedPartOfSpeech,
    setSelectedCefrLevel,
    setSelectedDifficulty,
    setSortBy,
    setSortOrder,
    setSelectedWord,
    filteredWords,
    partOfSpeechOptions,
    cefrLevelOptions,
    difficultyOptions
  } = useDictionary();

  if (!isOpen) return null;

  return (
    <div className="dictionary-modal-backdrop" onClick={onClose}>
      <div className="dictionary-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dictionary-modal-header">
          <h1 className="dictionary-modal-title">French Dictionary</h1>
          <button className="dictionary-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Filters */}
        <div className="dictionary-modal-filters">
          <div className="dictionary-filters-grid">
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search words or translations..."
                className="dictionary-filter-input"
              />
            </div>
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">Part of Speech</label>
              <select
                value={selectedPartOfSpeech}
                onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                className="dictionary-filter-select"
              >
                {partOfSpeechOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Parts of Speech' : option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">CEFR Level</label>
              <select
                value={selectedCefrLevel}
                onChange={(e) => setSelectedCefrLevel(e.target.value)}
                className="dictionary-filter-select"
              >
                {cefrLevelOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Levels' : option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="dictionary-filter-select"
              >
                {difficultyOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Difficulties' : option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="dictionary-sort-controls">
            <div className="dictionary-sort-group">
              <label className="dictionary-sort-label">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="dictionary-sort-select"
              >
                <option value="word">Word</option>
                <option value="partOfSpeech">Part of Speech</option>
                <option value="cefrLevel">CEFR Level</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
            <div className="dictionary-sort-group">
              <label className="dictionary-sort-label">Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="dictionary-sort-select"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="dictionary-results-count">
              {filteredWords.length} words found
            </div>
          </div>
        </div>

        {/* Alphabet Bar */}
        <div className="dictionary-alphabet-bar">
          {Array.from({ length: 26 }, (_, i) => {
            const letter = String.fromCharCode(65 + i); // A-Z
            const hasWords = filteredWords.some(word =>
              getBaseLetterForHeader(word.word) === letter
            );
            return (
              <button
                key={letter}
                className={`dictionary-alphabet-link ${hasWords ? 'has-words' : 'no-words'}`}
                onClick={() => {
                  const firstWordWithLetter = filteredWords.find(word =>
                    getBaseLetterForHeader(word.word) === letter
                  );
                  if (firstWordWithLetter) {
                    const wordElement = document.querySelector(`[data-word-id="${firstWordWithLetter.id}"]`);
                    if (wordElement) {
                      // Get the scrollable container
                      const scrollContainer = document.querySelector('.dictionary-word-list');
                      if (scrollContainer) {
                        // Calculate the target position relative to the scroll container
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const elementRect = wordElement.getBoundingClientRect();
                        const targetScrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top);

                        // Account for sticky header height to prevent overlap
                        const stickyHeader = document.querySelector('.dictionary-letter-header');
                        const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
                        const adjustedScrollTop = Math.max(0, targetScrollTop - headerHeight - 8); // 8px extra padding

                        // Scroll to the target position with smooth behavior
                        scrollContainer.scrollTo({
                          top: adjustedScrollTop,
                          behavior: 'smooth'
                        });
                      } else {
                        // Fallback to the original method if container not found
                        wordElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }
                }}
                disabled={!hasWords}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="dictionary-modal-content">
          {/* Word List */}
          <div className="dictionary-word-list">
            <div className="dictionary-word-list-content">
              {filteredWords.map((word, index) => {
                const firstLetter = getBaseLetterForHeader(word.word);
                const prevWord = index > 0 ? filteredWords[index - 1] : null;
                const prevFirstLetter = prevWord ? getBaseLetterForHeader(prevWord.word) : null;

                // Check if we need a new header
                const needsHeader = index === 0 || firstLetter !== prevFirstLetter;

                return (
                  <React.Fragment key={word.id}>
                    {needsHeader && (
                      <div className="dictionary-letter-header">
                        {firstLetter}
                      </div>
                    )}
                    <div
                      data-word-id={word.id}
                      onClick={() => setSelectedWord(word)}
                      className={`dictionary-word-item ${selectedWord?.id === word.id ? 'selected' : ''}`}
                    >
                      <div className="dictionary-word-item-header">
                        <div>
                          <h3 className="dictionary-word-french">{word.word}</h3>
                          <p className="dictionary-word-translation">
                            {word.translations?.[0]?.text || 'No translation'}
                          </p>
                        </div>
                        <div className="dictionary-word-meta">
                          <div className="dictionary-word-part-of-speech">
                            {word.allPartsOfSpeech && word.allPartsOfSpeech.length > 1
                              ? word.allPartsOfSpeech.join(', ')
                              : word.partOfSpeech
                            }
                          </div>
                          <div className="dictionary-word-cefr">{word.cefr_level || word.cefrLevel}</div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Word Details */}
          <div className="dictionary-word-details">
            {selectedWord ? (
              <div className="dictionary-word-details-content">
                <div className="dictionary-word-header">
                  <div className="dictionary-word-title-container">
                    <h2 className="dictionary-word-title">
                      {selectedWord.word}
                    </h2>
                    <SpeakButton
                      text={selectedWord.word}
                      language="fr-FR"
                      size="medium"
                      className="dictionary-speak-button"
                    />
                  </div>
                  <div className="dictionary-word-phonetic">
                    {selectedWord.phonetic && `/${selectedWord.phonetic}/`}
                  </div>
                </div>

                {/* Stacked Definitions by Part of Speech */}
                {selectedWord.allPartsOfSpeech && selectedWord.allPartsOfSpeech.map((pos, index) => (
                  <div key={pos} className="dictionary-word-entry">
                    <div className="dictionary-word-part-of-speech-label">
                      {pos}
                    </div>

                    {/* Translation */}
                    {selectedWord.allTranslations[pos] && (
                      <div className="dictionary-word-translation-text">
                        {selectedWord.allTranslations[pos][0]?.text}
                      </div>
                    )}

                    {/* Examples */}
                    {selectedWord.allExamples[pos] && selectedWord.allExamples[pos].length > 0 && (
                      <div className="dictionary-word-examples">
                        {selectedWord.allExamples[pos].map((example, idx) => (
                          <div key={idx} className="dictionary-word-example-item">
                            <span className="dictionary-word-example-bullet">•</span>
                            <div>
                              <span className="dictionary-word-example-text">{example.text}</span>
                              {example.trans && (
                                <span className="dictionary-word-example-translation">
                                  {example.trans}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Metadata */}
                <div className="dictionary-word-metadata">
                  <div className="dictionary-word-metadata-grid">
                    {selectedWord.cefr_level && (
                      <span>CEFR: {selectedWord.cefr_level}</span>
                    )}
                    {selectedWord.difficulty && (
                      <span>Difficulty: {selectedWord.difficulty}</span>
                    )}
                    {selectedWord.source && (
                      <span>Source: {selectedWord.source}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="dictionary-empty-state">
                <p>Select a word to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DictionaryModal;
