import React, { useState } from 'react';
import { useWordDataApi, useWordSearch } from '../hooks/useWordDataApi';
import { logger } from "../utils/logger";

/**
 * Example component demonstrating the Word Data API
 */
export const WordDataApiExample = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [relatedWords, setRelatedWords] = useState([]);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [availableModules, setAvailableModules] = useState([]);
  
  const { 
    getWordById, 
    getWordByText, 
    getRelatedWords, 
    getFilterOptions,
    getWordsByUnit,
    getWordsByModule,
    getAvailableUnits,
    getAvailableModules,
    loading, 
    error 
  } = useWordDataApi();

  const {
    searchTerm,
    results,
    updateSearchTerm,
    updateOptions,
    loading: searchLoading
  } = useWordSearch('', { limit: 10 });

  const handleWordClick = async (word) => {
    try {
      setSelectedWord(word);
      const related = await getRelatedWords(word.id);
      setRelatedWords(related);
    } catch (err) {
      logger.error('Failed to load word details:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchTerm(e.target.search.value);
  };

  const handleUnitFilter = async (unit) => {
    try {
      const unitResults = await getWordsByUnit(unit, { limit: 20 });
      logger.log(`Words in ${unit}:`, unitResults);
    } catch (err) {
      logger.error('Failed to load unit words:', err);
    }
  };

  const handleModuleFilter = async (module) => {
    try {
      const moduleResults = await getWordsByModule(module, { limit: 20 });
      logger.log(`Words in ${module}:`, moduleResults);
    } catch (err) {
      logger.error('Failed to load module words:', err);
    }
  };

  // Load available units and modules on mount
  React.useEffect(() => {
    const loadCurriculumData = async () => {
      try {
        const [units, modules] = await Promise.all([
          getAvailableUnits(),
          getAvailableModules()
        ]);
        setAvailableUnits(units);
        setAvailableModules(modules);
      } catch (err) {
        logger.error('Failed to load curriculum data:', err);
      }
    };
    loadCurriculumData();
  }, [getAvailableUnits, getAvailableModules]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Word Data API Example</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="search"
          placeholder="Search French words..."
          defaultValue={searchTerm}
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button type="submit" disabled={searchLoading}>
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Filter Options */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        <label>
          Part of Speech:
          <select 
            onChange={(e) => updateOptions({ partOfSpeech: e.target.value })}
            style={{ marginLeft: '10px', padding: '4px' }}
          >
            <option value="all">All</option>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="adjective">Adjective</option>
            <option value="adverb">Adverb</option>
          </select>
        </label>

        <label>
          Unit:
          <select 
            onChange={(e) => updateOptions({ unit: e.target.value })}
            style={{ marginLeft: '10px', padding: '4px' }}
          >
            <option value="all">All Units</option>
            {availableUnits.map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label} ({unit.count} words)
              </option>
            ))}
          </select>
        </label>

        <label>
          Module:
          <select 
            onChange={(e) => updateOptions({ module: e.target.value })}
            style={{ marginLeft: '10px', padding: '4px', minWidth: '200px' }}
          >
            <option value="all">All Modules</option>
            {availableModules.slice(0, 10).map(module => (
              <option key={module.value} value={module.value}>
                {module.label} ({module.count})
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Quick Unit/Module Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Quick Filters:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {availableUnits.slice(0, 5).map(unit => (
            <button
              key={unit.value}
              onClick={() => handleUnitFilter(unit.value)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#e3f2fd', 
                border: '1px solid #2196f3',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {unit.label} ({unit.count})
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {results && (
        <div style={{ marginBottom: '30px' }}>
          <h3>Search Results ({results.total} found)</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {results.words.map(word => (
              <div
                key={word.id}
                onClick={() => handleWordClick(word)}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  backgroundColor: selectedWord?.id === word.id ? '#f0f8ff' : 'transparent'
                }}
              >
                <strong>{word.word}</strong> - {word.translations?.[0]?.text || 'No translation'}
                <br />
                <small style={{ color: '#666' }}>
                  {word.partOfSpeech} • {word.cefr_level || 'N/A'} • {word.difficulty || 'N/A'}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Word Details */}
      {selectedWord && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
          <h3>Word Details: {selectedWord.word}</h3>
          <p><strong>Translation:</strong> {selectedWord.translations?.[0]?.text || 'No translation'}</p>
          <p><strong>Part of Speech:</strong> {selectedWord.partOfSpeech}</p>
          <p><strong>CEFR Level:</strong> {selectedWord.cefr_level || 'N/A'}</p>
          <p><strong>Difficulty:</strong> {selectedWord.difficulty || 'N/A'}</p>
          
          {selectedWord.relationships && selectedWord.relationships.length > 0 && (
            <div>
              <strong>Relationships:</strong>
              <ul>
                {selectedWord.relationships.map((rel, index) => (
                  <li key={index}>
                    {rel.type}: {rel.targetWord} ({rel.note})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Related Words */}
      {relatedWords.length > 0 && (
        <div>
          <h3>Related Words</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {relatedWords.map(word => (
              <div
                key={word.id}
                onClick={() => handleWordClick(word)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {word.word} ({word.relationshipType})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};
