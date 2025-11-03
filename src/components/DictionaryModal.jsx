import React, { useEffect } from 'react';

// Constants
const WORD_TYPES = {
  ADJECTIVE: 'adjective',
  VERB: 'verb',
  NOUN: 'noun',
  UNKNOWN: 'unknown'
};

const RELATIONSHIP_TYPES = {
  CONJUGATION_PAIR: 'conjugation_pair',
  ADJECTIVE_FORM: 'adjective_form'
};

const CEFR_LEVELS = {
  UNKNOWN: 'unknown'
};

// Utility function to format parts of speech, filtering out 'unknown'
const formatPartsOfSpeech = (word) => {
  const parts = word.allPartsOfSpeech?.length > 1
    ? word.allPartsOfSpeech
    : [word.partOfSpeech];

  return parts
    .filter(pos => pos && pos !== WORD_TYPES.UNKNOWN)
    .join(', ');
};

// Utility function to find word by ID or text
const findWordByIdOrText = (words, id, text) => {
  return words.find(word =>
    word.id === id || word.word.toLowerCase() === text.toLowerCase()
  );
};

// Utility function to get redirect translation
const getRedirectTranslation = (word, allWords) => {
  const mainWord = findWordByIdOrText(allWords, word.redirect_to, word.base_word);
  return mainWord?.translations?.[0]?.text || '';
};

// Utility function to scroll to a word element
const scrollToWordElement = (wordElement) => {
  if (!wordElement) return;

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
};
import { useDictionary } from '../hooks/useDictionary';
import SpeakButton from './SpeakButton';
import { ChevronDown } from 'lucide-react';
import { getModuleId } from '../lessons/moduleIdResolver';
import '../styles/DictionaryModal.css';
import { logger } from "../utils/logger";

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
  const dictionary = useDictionary();
  const {
    searchTerm,
    selectedPartOfSpeech,
    selectedCefrLevel,
    selectedDifficulty,
    sortBy,
    sortOrder,
    selectedWord,
    filteredWords,
    allWords,
    partOfSpeechOptions,
    cefrLevelOptions,
    difficultyOptions,
    isLoading
  } = dictionary;

  const {
    setSearchTerm,
    setSelectedPartOfSpeech,
    setSelectedCefrLevel,
    setSelectedDifficulty,
    setSortBy,
    setSortOrder,
    setSelectedWord
  } = dictionary;

  // Handle querystring parameter for pre-selecting a word
  useEffect(() => {
    if (isOpen && filteredWords.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const wordParam = urlParams.get('word');

      if (wordParam) {
        // Find the word by exact match first, then by partial match
        const exactMatch = filteredWords.find(word =>
          word.word.toLowerCase() === wordParam.toLowerCase()
        );

        const partialMatch = filteredWords.find(word =>
          word.word.toLowerCase().includes(wordParam.toLowerCase())
        );

        const targetWord = exactMatch || partialMatch;

        if (targetWord) {
          setSelectedWord(targetWord);
          setScrollToSelected(true); // Trigger scroll to selected word
          // Clear the word parameter from URL after selection
          const newUrl = new URL(window.location);
          newUrl.searchParams.delete('word');
          window.history.replaceState({}, '', newUrl);
        }
      }
    }
  }, [isOpen, filteredWords, setSelectedWord]);

  // Track if selection came from relationship click
  const [scrollToSelected, setScrollToSelected] = React.useState(false);

  // Swipe gesture tracking for mobile details panel
  const [swipeStart, setSwipeStart] = React.useState(null);
  const [swipeOffset, setSwipeOffset] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const swipeDistanceRef = React.useRef(0);
  const scrollContainerRef = React.useRef(null);
  const touchStartPositionRef = React.useRef({ y: 0, onHeader: false, scrollTop: 0 });


  // Reset swipe state whenever selected word changes
  useEffect(() => {
    // Reset all swipe-related state
    setSwipeStart(null);
    setSwipeOffset(0);
    setIsExpanded(false);
    swipeDistanceRef.current = 0;
    touchStartPositionRef.current = { y: 0, onHeader: false, scrollTop: 0 };
    
    // Reset scroll position when new word is selected
    // Use a small timeout to ensure ref is available after render
    const timeoutId = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [selectedWord]);

  // Scroll to selected word in the word list when selection changes from relationship
  useEffect(() => {
    if (selectedWord && scrollToSelected) {
      const wordElement = document.querySelector(`[data-word-id="${selectedWord.id}"]`);
      scrollToWordElement(wordElement);
      setScrollToSelected(false); // Reset the flag
    }
  }, [selectedWord, scrollToSelected]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="dictionary-modal-backdrop" onClick={onClose}>
        <div className="dictionary-modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="dictionary-modal-header">
            <div className="dictionary-header-top">
              <h1 className="dictionary-modal-title"> French Unit Dictionary</h1>
              <button className="dictionary-modal-close" onClick={onClose}>
                ×
              </button>
            </div>
          </div>
          <div className="dictionary-loading-state">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading dictionary...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dictionary-modal-backdrop" onClick={onClose}>
      <div className="dictionary-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dictionary-modal-header">
          <div className="dictionary-header-top">
            <h1 className="dictionary-modal-title"> French Unit Dictionary</h1>
            <button className="dictionary-modal-close" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="dictionary-header-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search words or translations..."
              className="dictionary-header-search-input"
            />
            {searchTerm && (
              <button
                className="dictionary-search-clear"
                onClick={() => setSearchTerm('')}
                type="button"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="dictionary-modal-filters">
          <div className="dictionary-filters-single-line">
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label" htmlFor="part-of-speech-filter">Part of Speech</label>
              <select
                id="part-of-speech-filter"
                value={selectedPartOfSpeech}
                onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                className="dictionary-filter-select-small"
                aria-label="Filter by part of speech"
              >
                {partOfSpeechOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Parts of Speech' : option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dictionary-sort-section">
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
                {filteredWords.length} definitions
              </div>
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
                    scrollToWordElement(wordElement);
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
                      onClick={() => {
                        setSelectedWord(word);
                        // Update URL with the selected word
                        const newUrl = new URL(window.location);
                        newUrl.searchParams.set('word', word.word);
                        window.history.pushState({}, '', newUrl);
                      }}
                      className={`dictionary-word-item ${selectedWord?.id === word.id ? 'selected' : ''}`}
                    >
                      <div className="dictionary-word-item-header">
                        <div>
                          <h3 className="dictionary-word-french">{word.word}</h3>
                          <p className="dictionary-word-translation">
                            {word.translations?.[0]?.text ||
                              (word.redirect_to ? `see: ${word.base_word} → ${getRedirectTranslation(word, allWords)}` : 'No translation')}
                          </p>
                        </div>
                        <div className="dictionary-word-meta">
                          <div className="dictionary-word-part-of-speech">
                            {formatPartsOfSpeech(word)}
                          </div>
                          <div className="dictionary-word-cefr">
                            {(() => {
                              const cefrLevel = word.cefr_level || word.cefrLevel;
                              return cefrLevel && cefrLevel !== CEFR_LEVELS.UNKNOWN ? cefrLevel : '';
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Word Details */}
          {selectedWord && (
            <>
              <div 
                className="dictionary-details-backdrop" 
                onClick={() => {
                  setSelectedWord(null);
                  setIsExpanded(false);
                }}
              />
              <div 
                key={selectedWord?.id || 'details'}
                className={`dictionary-word-details ${isExpanded ? 'expanded' : ''}`}
                style={swipeOffset !== 0 ? { transform: `translateY(${swipeOffset}px)` } : { transform: 'none' }}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  const target = e.target;
                  const isOnHeader = target.closest('.dictionary-details-header') !== null;
                  const scrollContainer = scrollContainerRef.current;
                  const isAtTop = scrollContainer ? scrollContainer.scrollTop === 0 : true;
                  
                  // Only allow swipe if starting on header OR content is at top
                  if (isOnHeader || isAtTop) {
                    setSwipeStart(touch.clientY);
                    setSwipeOffset(0);
                    swipeDistanceRef.current = 0;
                    touchStartPositionRef.current = {
                      y: touch.clientY,
                      onHeader: isOnHeader,
                      scrollTop: scrollContainer?.scrollTop || 0
                    };
                  } else {
                    setSwipeStart(null);
                  }
                }}
                onTouchMove={(e) => {
                  if (swipeStart === null) return;
                  
                  const touch = e.touches[0];
                  const currentY = touch.clientY;
                  const deltaY = currentY - swipeStart;
                  const scrollContainer = scrollContainerRef.current;
                  const scrollTop = scrollContainer?.scrollTop || 0;
                  const initialScrollTop = touchStartPositionRef.current.scrollTop;
                  
                  const startedOnHeader = touchStartPositionRef.current.onHeader;
                  const wasAtTop = initialScrollTop === 0;
                  const isAtTop = scrollTop === 0;
                  
                  // If content has scrolled, cancel swipe gesture immediately
                  if (scrollTop !== initialScrollTop) {
                    setSwipeStart(null);
                    setSwipeOffset(0);
                    swipeDistanceRef.current = 0;
                    return;
                  }
                  
                  // If user started on header
                  if (startedOnHeader) {
                    e.preventDefault();
                    
                    // Swipe down - close panel
                    if (deltaY > 0) {
                      setSwipeOffset(deltaY);
                      swipeDistanceRef.current = deltaY;
                      return;
                    }
                    
                    // Swipe up - expand panel
                    if (deltaY < 0 && !isExpanded) {
                      const swipeUpDistance = Math.abs(deltaY);
                      // Track swipe up for expansion (negative offset means moving up)
                      swipeDistanceRef.current = deltaY;
                      // Don't update swipeOffset for expansion, use isExpanded state instead
                      return;
                    }
                    
                    // Swipe down when expanded - collapse back
                    if (deltaY > 0 && isExpanded) {
                      setSwipeOffset(deltaY);
                      swipeDistanceRef.current = deltaY;
                      return;
                    }
                  }
                  
                  // If content was at top when started AND still at top, allow swipe-down
                  if (wasAtTop && isAtTop && deltaY > 0 && !startedOnHeader) {
                    e.preventDefault();
                    setSwipeOffset(deltaY);
                    swipeDistanceRef.current = deltaY;
                    return;
                  }
                  
                  // If already swiping down and user moves finger up, allow canceling
                  if (swipeOffset > 0 && deltaY < 0) {
                    e.preventDefault();
                    const newOffset = Math.max(0, swipeOffset + deltaY);
                    setSwipeOffset(newOffset);
                    swipeDistanceRef.current = newOffset;
                    return;
                  }
                  
                  // Otherwise, let normal scrolling happen (don't prevent default)
                }}
                onTouchEnd={() => {
                  const distance = swipeDistanceRef.current;
                  const startedOnHeader = touchStartPositionRef.current.onHeader;
                  
                  if (startedOnHeader) {
                    // Swipe down - close if far enough
                    if (distance > 100) {
                      setSelectedWord(null);
                      setIsExpanded(false);
                    }
                    // Swipe down when expanded - collapse back to 70vh
                    else if (distance > 50 && isExpanded) {
                      setIsExpanded(false);
                      setSwipeOffset(0);
                    }
                    // Swipe up - expand if far enough (negative means up)
                    else if (distance < -100 && !isExpanded) {
                      setIsExpanded(true);
                      setSwipeOffset(0);
                    }
                    // Small swipe up when collapsed - expand
                    else if (distance < -30 && !isExpanded) {
                      setIsExpanded(true);
                      setSwipeOffset(0);
                    }
                    // Reset
                    else {
                      setSwipeOffset(0);
                    }
                  } else {
                    // Not started on header - handle normal swipe down
                    if (distance > 100) {
                      setSelectedWord(null);
                    } else if (swipeOffset > 0) {
                      // Snap back if not swiped far enough
                      setSwipeOffset(0);
                    }
                  }
                  
                  setSwipeStart(null);
                  swipeDistanceRef.current = 0;
                  touchStartPositionRef.current = { y: 0, onHeader: false, scrollTop: 0 };
                }}
              >
                <div className="dictionary-details-header">
                  <div className="dictionary-details-drag-handle" />
                    <button 
                      className="dictionary-details-close"
                      onClick={() => {
                        setSelectedWord(null);
                        setIsExpanded(false);
                      }}
                      aria-label="Close word details"
                    >
                      ×
                    </button>
                </div>
              <div 
                className="dictionary-word-details-content"
                ref={scrollContainerRef}
              >
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
                {selectedWord.allPartsOfSpeech && selectedWord.allPartsOfSpeech.map((pos, index) => {
                  // Only render if there's actual content (translation or examples)
                  const hasTranslation = selectedWord.allTranslations[pos] && selectedWord.allTranslations[pos][0]?.text;
                  const hasExamples = selectedWord.allExamples[pos] && selectedWord.allExamples[pos].length > 0;

                  if (!hasTranslation && !hasExamples) {
                    return null;
                  }

                  return (
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
                      {!selectedWord.allTranslations[pos] && selectedWord.redirect_to && (
                        <div className="dictionary-word-translation-text">
                          {`see ${selectedWord.base_word}: ${getRedirectTranslation(selectedWord, allWords)}`}
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

                      {/* Part-of-Speech Specific Content */}
                      {/* Verb conjugation details */}
                      {pos === WORD_TYPES.VERB && (selectedWord.tense || selectedWord.mood || selectedWord.person) && (
                        <div className="dictionary-word-grammar-info">
                          <h4 className="dictionary-section-title">Grammar Info</h4>
                          <div className="dictionary-grammar-details">
                            {selectedWord.tense && (
                              <div className="dictionary-grammar-item">
                                <span className="dictionary-grammar-label">Tense:</span>
                                <span className="dictionary-grammar-value">{selectedWord.tense}</span>
                              </div>
                            )}
                            {selectedWord.mood && (
                              <div className="dictionary-grammar-item">
                                <span className="dictionary-grammar-label">Mood:</span>
                                <span className="dictionary-grammar-value">{selectedWord.mood}</span>
                              </div>
                            )}
                            {selectedWord.person && (
                              <div className="dictionary-grammar-item">
                                <span className="dictionary-grammar-label">Person:</span>
                                <span className="dictionary-grammar-value">{selectedWord.person}</span>
                              </div>
                            )}
                            {selectedWord.number && (
                              <div className="dictionary-grammar-item">
                                <span className="dictionary-grammar-label">Number:</span>
                                <span className="dictionary-grammar-value">{selectedWord.number}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {pos === WORD_TYPES.VERB && selectedWord.verb_phrases && selectedWord.verb_phrases.length > 0 && (
                        <div className="dictionary-word-verb-phrases">
                          <h4 className="dictionary-section-title">Common Phrases</h4>
                          <div className="dictionary-phrases-grid">
                            {selectedWord.verb_phrases.map((phrase, idx) => (
                              <div key={idx} className={`dictionary-phrase-item phrase-${phrase.type}`}>
                                <div className="dictionary-phrase-header">
                                  <span className="dictionary-phrase-text">{phrase.phrase}</span>
                                  <SpeakButton
                                    text={phrase.phrase}
                                    language="fr-FR"
                                    size="small"
                                    className="dictionary-phrase-speak-button"
                                  />
                                </div>
                                {phrase.context && (
                                  <span className="dictionary-phrase-context">({phrase.context})</span>
                                )}
                                <span className={`dictionary-phrase-type type-${phrase.type}`}>
                                  {phrase.type.replace('_', ' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pos === WORD_TYPES.NOUN && (
                        <>
                          {selectedWord.noun_articles && (
                            <div className="dictionary-word-noun-articles">
                              <h4 className="dictionary-section-title">Articles</h4>
                              <div className="dictionary-articles-grid">
                                {selectedWord.noun_articles.definite && (
                                  <span className="dictionary-article-item">
                                    <strong>Definite:</strong> {selectedWord.noun_articles.definite}
                                  </span>
                                )}
                                {selectedWord.noun_articles.indefinite && (
                                  <span className="dictionary-article-item">
                                    <strong>Indefinite:</strong> {selectedWord.noun_articles.indefinite}
                                  </span>
                                )}
                                {selectedWord.noun_articles.plural && (
                                  <span className="dictionary-article-item">
                                    <strong>Plural:</strong> {selectedWord.noun_articles.plural}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          {selectedWord.plural_form && (
                            <div className="dictionary-word-plural">
                              <h4 className="dictionary-section-title">Plural Form</h4>
                              <span className="dictionary-plural-form">{selectedWord.plural_form}</span>
                            </div>
                          )}
                          {selectedWord.noun_phrases && selectedWord.noun_phrases.length > 0 && (
                            <div className="dictionary-word-noun-phrases">
                              <h4 className="dictionary-section-title">Common Phrases</h4>
                              <div className="dictionary-phrases-grid">
                                {selectedWord.noun_phrases.map((phrase, idx) => (
                                  <div key={idx} className={`dictionary-phrase-item phrase-${phrase.type}`}>
                                    <div className="dictionary-phrase-header">
                                      <span className="dictionary-phrase-text">{phrase.phrase}</span>
                                      <SpeakButton
                                        text={phrase.phrase}
                                        language="fr-FR"
                                        size="small"
                                        className="dictionary-phrase-speak-button"
                                      />
                                    </div>
                                    {phrase.context && (
                                      <span className="dictionary-phrase-context">({phrase.context})</span>
                                    )}
                                    <span className={`dictionary-phrase-type type-${phrase.type}`}>
                                      {phrase.type.replace('_', ' ')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {pos === WORD_TYPES.ADJECTIVE && (
                        <>
                          {selectedWord.adjective_forms && (
                            <div className="dictionary-word-adjective-forms">
                              <h4 className="dictionary-section-title">Forms</h4>
                              <div className="dictionary-forms-grid">
                                {selectedWord.adjective_forms.masculine_singular && (
                                  <span className="dictionary-form-item">
                                    <strong>Masc. Sing.:</strong> {selectedWord.adjective_forms.masculine_singular}
                                  </span>
                                )}
                                {selectedWord.adjective_forms.feminine_singular && (
                                  <span className="dictionary-form-item">
                                    <strong>Fem. Sing.:</strong> {selectedWord.adjective_forms.feminine_singular}
                                  </span>
                                )}
                                {selectedWord.adjective_forms.masculine_plural && (
                                  <span className="dictionary-form-item">
                                    <strong>Masc. Plur.:</strong> {selectedWord.adjective_forms.masculine_plural}
                                  </span>
                                )}
                                {selectedWord.adjective_forms.feminine_plural && (
                                  <span className="dictionary-form-item">
                                    <strong>Fem. Plur.:</strong> {selectedWord.adjective_forms.feminine_plural}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          {selectedWord.adjective_phrases && selectedWord.adjective_phrases.length > 0 && (
                            <div className="dictionary-word-adjective-phrases">
                              <h4 className="dictionary-section-title">Common Phrases</h4>
                              <div className="dictionary-phrases-grid">
                                {selectedWord.adjective_phrases.map((phrase, idx) => (
                                  <div key={idx} className={`dictionary-phrase-item phrase-${phrase.type}`}>
                                    <div className="dictionary-phrase-header">
                                      <span className="dictionary-phrase-text">{phrase.phrase}</span>
                                      <SpeakButton
                                        text={phrase.phrase}
                                        language="fr-FR"
                                        size="small"
                                        className="dictionary-phrase-speak-button"
                                      />
                                    </div>
                                    {phrase.context && (
                                      <span className="dictionary-phrase-context">({phrase.context})</span>
                                    )}
                                    <span className={`dictionary-phrase-type type-${phrase.type}`}>
                                      {phrase.type.replace('_', ' ')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}


                {/* Variants */}
                {selectedWord.variants && selectedWord.variants.length > 0 && (
                  <div className="dictionary-word-variants">
                    <h4 className="dictionary-section-title">Variants</h4>
                    <div className="dictionary-variants-grid">
                      {selectedWord.variants.map((variant, idx) => (
                        <div
                          key={idx}
                          className={`dictionary-variant-item variant-${variant.type} clickable`}
                          onClick={() => {
                            // Find the variant word
                            const variantWord = allWords.find(word =>
                              word.word.toLowerCase() === variant.text.toLowerCase()
                            );

                            if (variantWord) {
                              setSelectedWord(variantWord);
                              setScrollToSelected(true);
                              // Update URL with the variant word
                              const newUrl = new URL(window.location);
                              newUrl.searchParams.set('word', variantWord.word);
                              window.history.pushState({}, '', newUrl);
                            } else {
                              logger.warn(`Could not find variant word: ${variant.text}`);
                            }
                          }}
                        >
                          <div className="dictionary-variant-content">
                            <span className="dictionary-variant-word">{variant.text}</span>
                            <span className="dictionary-variant-type">
                              {variant.type.replace('_', ' ')}
                            </span>
                            {variant.note && (
                              <span className="dictionary-variant-note">({variant.note})</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Relationships */}
                {((selectedWord.relationships && selectedWord.relationships.length > 0) ||
                  (selectedWord.partOfSpeech === WORD_TYPES.ADJECTIVE && selectedWord.adjective_forms)) && (
                    <div className="dictionary-word-relationships">
                      <h4 className="dictionary-section-title">
                        {selectedWord.partOfSpeech === WORD_TYPES.ADJECTIVE ? 'SEE' : 'Related Words'}
                      </h4>
                      <div className="dictionary-relationships-grid">
                        {/* Regular relationships */}
                        {selectedWord.relationships && selectedWord.relationships.map((relationship, idx) => (
                          <div
                            key={idx}
                            className={`dictionary-relationship-item relationship-${relationship.type} clickable`}
                            onClick={() => {
                              // Find the related word - try multiple approaches
                              let relatedWord = filteredWords.find(word =>
                                word.id === relationship.targetId
                              );

                              // If not found by ID, try by word text
                              if (!relatedWord) {
                                relatedWord = filteredWords.find(word =>
                                  word.word.toLowerCase() === relationship.targetWord.toLowerCase()
                                );
                              }

                              // If still not found, try in all words (not just filtered)
                              if (!relatedWord) {
                                relatedWord = allWords.find(word =>
                                  word.id === relationship.targetId ||
                                  word.word.toLowerCase() === relationship.targetWord.toLowerCase()
                                );
                              }

                              if (relatedWord) {
                                setSelectedWord(relatedWord);
                                setScrollToSelected(true); // Trigger scroll to selected word
                                // Update URL with the new word
                                const newUrl = new URL(window.location);
                                newUrl.searchParams.set('word', relatedWord.word);
                                window.history.pushState({}, '', newUrl);
                              } else {
                                logger.warn(`Could not find related word: ${relationship.targetWord} (ID: ${relationship.targetId})`);
                              }
                            }}
                          >
                            <div className="dictionary-relationship-content">
                              <span className="dictionary-relationship-word">{relationship.targetWord}</span>
                              {relationship.type === 'adjective_form' || relationship.type === 'noun_form' ? (
                                <span className="dictionary-relationship-type">{relationship.note}</span>
                              ) : (
                                <>
                                  <span className="dictionary-relationship-type">
                                    {relationship.type.replace('_', ' ')}
                                  </span>
                                  {relationship.note && (
                                    <span className="dictionary-relationship-note">({relationship.note})</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Adjective forms as relationships */}
                        {selectedWord.partOfSpeech === WORD_TYPES.ADJECTIVE && selectedWord.adjective_forms && (
                          <>
                            {selectedWord.adjective_forms.masculine_singular &&
                              selectedWord.adjective_forms.masculine_singular !== selectedWord.word && (
                                <div
                                  className="dictionary-relationship-item relationship-adjective_form clickable"
                                  onClick={() => {
                                    const variantWord = allWords.find(word =>
                                      word.word.toLowerCase() === selectedWord.adjective_forms.masculine_singular.toLowerCase()
                                    );
                                    if (variantWord) {
                                      setSelectedWord(variantWord);
                                      setScrollToSelected(true);
                                      const newUrl = new URL(window.location);
                                      newUrl.searchParams.set('word', variantWord.word);
                                      window.history.pushState({}, '', newUrl);
                                    }
                                  }}
                                >
                                  <div className="dictionary-relationship-content">
                                    <span className="dictionary-relationship-word">{selectedWord.adjective_forms.masculine_singular}</span>
                                    <span className="dictionary-relationship-type">masculine singular</span>
                                  </div>
                                </div>
                              )}
                            {selectedWord.adjective_forms.feminine_singular &&
                              selectedWord.adjective_forms.feminine_singular !== selectedWord.word && (
                                <div
                                  className="dictionary-relationship-item relationship-adjective_form clickable"
                                  onClick={() => {
                                    const variantWord = allWords.find(word =>
                                      word.word.toLowerCase() === selectedWord.adjective_forms.feminine_singular.toLowerCase()
                                    );
                                    if (variantWord) {
                                      setSelectedWord(variantWord);
                                      setScrollToSelected(true);
                                      const newUrl = new URL(window.location);
                                      newUrl.searchParams.set('word', variantWord.word);
                                      window.history.pushState({}, '', newUrl);
                                    }
                                  }}
                                >
                                  <div className="dictionary-relationship-content">
                                    <span className="dictionary-relationship-word">{selectedWord.adjective_forms.feminine_singular}</span>
                                    <span className="dictionary-relationship-type">feminine singular</span>
                                  </div>
                                </div>
                              )}
                            {selectedWord.adjective_forms.masculine_plural &&
                              selectedWord.adjective_forms.masculine_plural !== selectedWord.word && (
                                <div
                                  className="dictionary-relationship-item relationship-adjective_form clickable"
                                  onClick={() => {
                                    const variantWord = allWords.find(word =>
                                      word.word.toLowerCase() === selectedWord.adjective_forms.masculine_plural.toLowerCase()
                                    );
                                    if (variantWord) {
                                      setSelectedWord(variantWord);
                                      setScrollToSelected(true);
                                      const newUrl = new URL(window.location);
                                      newUrl.searchParams.set('word', variantWord.word);
                                      window.history.pushState({}, '', newUrl);
                                    }
                                  }}
                                >
                                  <div className="dictionary-relationship-content">
                                    <span className="dictionary-relationship-word">{selectedWord.adjective_forms.masculine_plural}</span>
                                    <span className="dictionary-relationship-type">masculine plural</span>
                                  </div>
                                </div>
                              )}
                            {selectedWord.adjective_forms.feminine_plural &&
                              selectedWord.adjective_forms.feminine_plural !== selectedWord.word && (
                                <div
                                  className="dictionary-relationship-item relationship-adjective_form clickable"
                                  onClick={() => {
                                    const variantWord = allWords.find(word =>
                                      word.word.toLowerCase() === selectedWord.adjective_forms.feminine_plural.toLowerCase()
                                    );
                                    if (variantWord) {
                                      setSelectedWord(variantWord);
                                      setScrollToSelected(true);
                                      const newUrl = new URL(window.location);
                                      newUrl.searchParams.set('word', variantWord.word);
                                      window.history.pushState({}, '', newUrl);
                                    }
                                  }}
                                >
                                  <div className="dictionary-relationship-content">
                                    <span className="dictionary-relationship-word">{selectedWord.adjective_forms.feminine_plural}</span>
                                    <span className="dictionary-relationship-type">feminine plural</span>
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                {/* Gender and Infinitive Info */}
                <div className="dictionary-word-grammar-info">
                  {selectedWord.gender && (
                    <div className="dictionary-grammar-item">
                      <strong>Gender:</strong> {selectedWord.gender}
                    </div>
                  )}
                  {selectedWord.number && (
                    <div className="dictionary-grammar-item">
                      <strong>Number:</strong> {selectedWord.number}
                    </div>
                  )}
                  {selectedWord.infinitive && (
                    <div className="dictionary-grammar-item">
                      <strong>Infinitive:</strong> {selectedWord.infinitive}
                    </div>
                  )}
                </div>



                {/* Metadata */}
                <div className="dictionary-word-metadata">
                  <div className="dictionary-word-metadata-grid">
                    {selectedWord.cefr_level && (
                      <span>CEFR: {selectedWord.cefr_level}</span>
                    )}
                    {selectedWord.difficulty && (
                      <span>Difficulty: {selectedWord.difficulty}</span>
                    )}
                    {selectedWord.unit && (
                      <span>Unit: {selectedWord.unit.replace('unit', '')}</span>
                    )}
                    {selectedWord.module && (
                      <span>Module: {getModuleId(selectedWord.module)}</span>
                    )}
                    {selectedWord.lesson && (
                      <span>Lesson: {selectedWord.lesson}</span>
                    )}
                    {selectedWord.source && (
                      <span>Source: {selectedWord.source}</span>
                    )}
                  </div>
                </div>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DictionaryModal;
