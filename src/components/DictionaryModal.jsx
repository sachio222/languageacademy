import React, { useEffect } from 'react';
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
    allWords,
    partOfSpeechOptions,
    cefrLevelOptions,
    difficultyOptions
  } = useDictionary();

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

  // Scroll to selected word in the word list when selection changes from relationship
  useEffect(() => {
    if (selectedWord && scrollToSelected) {
      const wordElement = document.querySelector(`[data-word-id="${selectedWord.id}"]`);
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
        }
      }
      setScrollToSelected(false); // Reset the flag
    }
  }, [selectedWord, scrollToSelected]);

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
              Showing {filteredWords.length} definitions
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
                              (word.redirect_to ? (() => {
                                // For redirects, show "see [base_word]: [translation]"
                                const mainWord = allWords.find(w =>
                                  w.id === word.redirect_to ||
                                  w.word.toLowerCase() === word.base_word.toLowerCase()
                                );
                                const translation = mainWord?.translations?.[0]?.text || '';
                                return `see: ${word.base_word} → ${translation}`;
                              })() : 'No translation')}
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
                          {(() => {
                            // For redirects, show "see [base_word]: [translation]"
                            const mainWord = allWords.find(word =>
                              word.id === selectedWord.redirect_to ||
                              word.word.toLowerCase() === selectedWord.base_word.toLowerCase()
                            );
                            const translation = mainWord?.translations?.[0]?.text || '';
                            return `see ${selectedWord.base_word}: ${translation}`;
                          })()}
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
                      {pos === 'verb' && (selectedWord.tense || selectedWord.mood || selectedWord.person) && (
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

                      {pos === 'verb' && selectedWord.verb_phrases && selectedWord.verb_phrases.length > 0 && (
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

                      {pos === 'noun' && (
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

                      {pos === 'adjective' && (
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

                {/* Redirect Information */}
                {selectedWord.redirect_to && (
                  <div className="dictionary-word-relationships">
                    <h4 className="dictionary-section-title">See</h4>
                    <div className="dictionary-relationships-grid">
                      <div
                        className="dictionary-relationship-item relationship-redirect clickable"
                        onClick={() => {
                          // Find the main word that this redirects to
                          const mainWord = allWords.find(word =>
                            word.id === selectedWord.redirect_to ||
                            word.word.toLowerCase() === selectedWord.base_word.toLowerCase()
                          );

                          if (mainWord) {
                            setSelectedWord(mainWord);
                            setScrollToSelected(true);
                            // Update URL with the main word
                            const newUrl = new URL(window.location);
                            newUrl.searchParams.set('word', mainWord.word);
                            window.history.pushState({}, '', newUrl);
                          } else {
                            console.warn(`Could not find main word: ${selectedWord.base_word} (ID: ${selectedWord.redirect_to})`);
                          }
                        }}
                      >
                        <div className="dictionary-relationship-content">
                          <span className="dictionary-relationship-word">{selectedWord.base_word}</span>
                          <span className="dictionary-relationship-note">
                            {(() => {
                              // Find the main word to get its translation
                              const mainWord = allWords.find(word =>
                                word.id === selectedWord.redirect_to ||
                                word.word.toLowerCase() === selectedWord.base_word.toLowerCase()
                              );
                              return mainWord?.translations?.[0]?.text || '';
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                              console.warn(`Could not find variant word: ${variant.text}`);
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
                  (selectedWord.partOfSpeech === 'adjective' && selectedWord.adjective_forms)) && (
                    <div className="dictionary-word-relationships">
                      <h4 className="dictionary-section-title">Related Words</h4>
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
                                console.warn(`Could not find related word: ${relationship.targetWord} (ID: ${relationship.targetId})`);
                              }
                            }}
                          >
                            <div className="dictionary-relationship-content">
                              <span className="dictionary-relationship-word">{relationship.targetWord}</span>
                              <span className="dictionary-relationship-type">
                                {relationship.type.replace('_', ' ')}
                              </span>
                              {relationship.note && (
                                <span className="dictionary-relationship-note">({relationship.note})</span>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Adjective forms as relationships */}
                        {selectedWord.partOfSpeech === 'adjective' && selectedWord.adjective_forms && (
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
                                    <span className="dictionary-relationship-type">adjective form</span>
                                    <span className="dictionary-relationship-note">(masculine singular)</span>
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
                                    <span className="dictionary-relationship-type">adjective form</span>
                                    <span className="dictionary-relationship-note">(feminine singular)</span>
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
                                    <span className="dictionary-relationship-type">adjective form</span>
                                    <span className="dictionary-relationship-note">(masculine plural)</span>
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
                                    <span className="dictionary-relationship-type">adjective form</span>
                                    <span className="dictionary-relationship-note">(feminine plural)</span>
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
