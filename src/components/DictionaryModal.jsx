import React, { useState, useEffect, useMemo } from 'react';
import { adjectives } from '../data/dictionary/words/adjectives';
import { adverbs } from '../data/dictionary/words/adverbs';
import { alphabet } from '../data/dictionary/words/alphabet';
import { articles } from '../data/dictionary/words/articles';
import { conjunctions } from '../data/dictionary/words/conjunctions';
import { expressions } from '../data/dictionary/words/expressions';
import { interjections } from '../data/dictionary/words/interjections';
import { interrogatives } from '../data/dictionary/words/interrogatives';
import { nouns } from '../data/dictionary/words/nouns';
import { prepositions } from '../data/dictionary/words/prepositions';
import { pronouns } from '../data/dictionary/words/pronouns';
import { properNouns } from '../data/dictionary/words/proper-nouns';
import { verbs } from '../data/dictionary/words/verbs';
import '../styles/DictionaryModal.css';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('all');
  const [selectedCefrLevel, setSelectedCefrLevel] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('word');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedWord, setSelectedWord] = useState(null);

  // Combine all dictionaries into a single array
  const allWords = useMemo(() => {
    const dictionaries = [
      { name: 'adjectives', data: adjectives },
      { name: 'adverbs', data: adverbs },
      { name: 'alphabet', data: alphabet },
      { name: 'articles', data: articles },
      { name: 'conjunctions', data: conjunctions },
      { name: 'expressions', data: expressions },
      { name: 'interjections', data: interjections },
      { name: 'interrogatives', data: interrogatives },
      { name: 'nouns', data: nouns },
      { name: 'prepositions', data: prepositions },
      { name: 'pronouns', data: pronouns },
      { name: 'proper-nouns', data: properNouns },
      { name: 'verbs', data: verbs }
    ];

    const words = [];
    dictionaries.forEach(({ name, data }) => {
      // Handle Map objects properly
      if (data instanceof Map) {
        data.forEach((entry, id) => {
          words.push({
            id,
            ...entry,
            source: name
          });
        });
      } else if (Array.isArray(data)) {
        // Handle array format if needed
        data.forEach(([id, entry]) => {
          words.push({
            id,
            ...entry,
            source: name
          });
        });
      }
    });

    return words;
  }, []);

  // Get unique values for filters
  const partOfSpeechOptions = useMemo(() => {
    const unique = [...new Set(allWords.map(word => word.partOfSpeech))].filter(Boolean);
    return ['all', ...unique.sort()];
  }, [allWords]);

  const cefrLevelOptions = useMemo(() => {
    const unique = [...new Set(allWords.map(word => word.cefr_level))].filter(Boolean);
    return ['all', ...unique.sort()];
  }, [allWords]);

  const difficultyOptions = useMemo(() => {
    const unique = [...new Set(allWords.map(word => word.difficulty))].filter(Boolean);
    return ['all', ...unique.sort()];
  }, [allWords]);

  // Filter and sort words
  const filteredWords = useMemo(() => {
    let filtered = allWords.filter(word => {
      // Search term filter
      const matchesSearch = !searchTerm ||
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translations?.[0]?.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translations?.[0]?.definition?.toLowerCase().includes(searchTerm.toLowerCase());

      // Part of speech filter
      const matchesPartOfSpeech = selectedPartOfSpeech === 'all' || word.partOfSpeech === selectedPartOfSpeech;

      // CEFR level filter
      const matchesCefrLevel = selectedCefrLevel === 'all' || word.cefr_level === selectedCefrLevel;

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || word.difficulty === selectedDifficulty;

      return matchesSearch && matchesPartOfSpeech && matchesCefrLevel && matchesDifficulty;
    });

    // Sort words
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'word':
          aValue = a.word.toLowerCase();
          bValue = b.word.toLowerCase();
          break;
        case 'translation':
          aValue = a.translations?.[0]?.text?.toLowerCase() || '';
          bValue = b.translations?.[0]?.text?.toLowerCase() || '';
          break;
        case 'partOfSpeech':
          aValue = a.partOfSpeech || '';
          bValue = b.partOfSpeech || '';
          break;
        case 'cefr_level':
          aValue = a.cefr_level || '';
          bValue = b.cefr_level || '';
          break;
        case 'difficulty':
          aValue = a.difficulty || 0;
          bValue = b.difficulty || 0;
          break;
        default:
          aValue = a.word.toLowerCase();
          bValue = b.word.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [allWords, searchTerm, selectedPartOfSpeech, selectedCefrLevel, selectedDifficulty, sortBy, sortOrder]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dictionary-modal-backdrop">
      <div className="dictionary-modal-container">
        {/* Header */}
        <div className="dictionary-modal-header">
          <h2 className="dictionary-modal-title">French Dictionary</h2>
          <button
            onClick={onClose}
            className="dictionary-modal-close"
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div className="dictionary-modal-filters">
          <div className="dictionary-filters-grid">
            {/* Search */}
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search words, translations, definitions..."
                className="dictionary-filter-input"
              />
            </div>

            {/* Part of Speech */}
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">
                Part of Speech
              </label>
              <select
                value={selectedPartOfSpeech}
                onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                className="dictionary-filter-select"
              >
                {partOfSpeechOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
            </div>

            {/* CEFR Level */}
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">
                CEFR Level
              </label>
              <select
                value={selectedCefrLevel}
                onChange={(e) => setSelectedCefrLevel(e.target.value)}
                className="dictionary-filter-select"
              >
                {cefrLevelOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="dictionary-filter-group">
              <label className="dictionary-filter-label">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="dictionary-filter-select"
              >
                {difficultyOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="dictionary-sort-controls">
            <div className="dictionary-sort-group">
              <label className="dictionary-sort-label">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="dictionary-sort-select"
              >
                <option value="word">Word</option>
                <option value="translation">Translation</option>
                <option value="partOfSpeech">Part of Speech</option>
                <option value="cefr_level">CEFR Level</option>
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

        {/* Content */}
        <div className="dictionary-modal-content">
          {/* Word List */}
          <div className="dictionary-word-list">
            <div className="dictionary-word-list-content">
              {filteredWords.map((word) => (
                <div
                  key={word.id}
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
                      <div className="dictionary-word-part-of-speech">{word.partOfSpeech}</div>
                      <div className="dictionary-word-cefr">{word.cefr_level}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Word Details */}
          <div className="dictionary-word-details">
            {selectedWord ? (
              <div className="dictionary-word-details-content">
                <div className="dictionary-word-details-header">
                  <h2 className="dictionary-word-details-title">
                    {selectedWord.word}
                  </h2>
                  <div className="dictionary-word-badges">
                    <span className="dictionary-badge dictionary-badge-part-of-speech">
                      {selectedWord.partOfSpeech}
                    </span>
                    <span className="dictionary-badge dictionary-badge-cefr">
                      {selectedWord.cefr_level}
                    </span>
                    <span className="dictionary-badge dictionary-badge-difficulty">
                      Difficulty: {selectedWord.difficulty}
                    </span>
                    <span className="dictionary-badge dictionary-badge-source">
                      {selectedWord.source}
                    </span>
                  </div>
                </div>

                {/* Translation */}
                {selectedWord.translations?.[0] && (
                  <div className="dictionary-section">
                    <h3 className="dictionary-section-title">
                      Translation
                    </h3>
                    <p className="dictionary-section-content large">
                      {selectedWord.translations[0].text}
                    </p>
                  </div>
                )}

                {/* Definition */}
                {selectedWord.translations?.[0]?.definition && (
                  <div className="dictionary-section">
                    <h3 className="dictionary-section-title">
                      Definition
                    </h3>
                    <p className="dictionary-section-content">
                      {selectedWord.translations[0].definition}
                    </p>
                  </div>
                )}

                {/* Gender */}
                {selectedWord.gender && selectedWord.gender !== 'none' && (
                  <div className="dictionary-section">
                    <h3 className="dictionary-section-title">
                      Gender
                    </h3>
                    <p className="dictionary-section-content capitalize">
                      {selectedWord.gender}
                    </p>
                  </div>
                )}

                {/* Examples */}
                {selectedWord.examples && selectedWord.examples.length > 0 && (
                  <div className="dictionary-section">
                    <h3 className="dictionary-section-title">
                      Examples
                    </h3>
                    <ul className="dictionary-examples">
                      {selectedWord.examples.map((example, index) => (
                        <li key={index}>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {selectedWord.tags && selectedWord.tags.length > 0 && (
                  <div className="dictionary-section">
                    <h3 className="dictionary-section-title">
                      Tags
                    </h3>
                    <div className="dictionary-tags">
                      {selectedWord.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="dictionary-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="dictionary-metadata">
                  <h3 className="dictionary-section-title">
                    Metadata
                  </h3>
                  <div className="dictionary-metadata-grid">
                    <div className="dictionary-metadata-item">
                      <span className="dictionary-metadata-label">ID:</span>
                      <span className="dictionary-metadata-value">{selectedWord.id}</span>
                    </div>
                    <div className="dictionary-metadata-item">
                      <span className="dictionary-metadata-label">Source:</span>
                      <span className="dictionary-metadata-value">{selectedWord.source}</span>
                    </div>
                    <div className="dictionary-metadata-item">
                      <span className="dictionary-metadata-label">Language:</span>
                      <span className="dictionary-metadata-value">{selectedWord.language}</span>
                    </div>
                    <div className="dictionary-metadata-item">
                      <span className="dictionary-metadata-label">Verified:</span>
                      <span className="dictionary-metadata-value">
                        {selectedWord.verified ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dictionary-empty-state">
                <p>Select a word to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DictionaryModal;
