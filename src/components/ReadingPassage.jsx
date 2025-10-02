/**
 * Reading Passage Component
 * Displays a reading passage with translation toggle and interactive word tooltips
 */
import { useState } from 'react';

// Simple word-to-English mapping (from modules 1-7)
const wordTranslations = {
  'bonjour': 'hello',
  'je': 'I',
  'suis': 'am',
  'un': 'a/an (masc)',
  'une': 'a/an (fem)',
  'homme': 'man',
  'ai': 'have',
  "j'ai": 'I have',
  'chat': 'cat',
  'chien': 'dog',
  'le': 'the (masc)',
  'la': 'the (fem)',
  'les': 'the (plural)',
  'est': 'is',
  'bon': 'good',
  'tu': 'you',
  'es': 'are',
  'femme': 'woman',
  'as': 'have',
  'maison': 'house',
  'voiture': 'car',
  'il': 'he',
  'ami': 'friend',
  'a': 'has',
  'des': 'some',
  'livres': 'books',
  'sont': 'are',
  'elle': 'she',
  'amie': 'friend (fem)',
  'chiens': 'dogs',
  'nous': 'we',
  'sommes': 'are',
  'amis': 'friends',
  'avons': 'have',
  'chats': 'cats',
  'ils': 'they (masc)',
  'vous': 'you (formal)',
  'avez': 'have',
  'enfants': 'children',
  'elles': 'they (fem)',
  'ont': 'have',
  'jour': 'day',
  "c'est": "it's",
  'merci': 'thank you',
  'au revoir': 'goodbye',
};

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);

  if (!passage) return null;

  // Make words interactive
  const renderInteractiveText = (text) => {
    const words = text.split(/(\s+|[.!?,])/);
    return words.map((word, idx) => {
      const cleanWord = word.toLowerCase().trim();
      const translation = wordTranslations[cleanWord];

      if (translation && word.trim()) {
        return (
          <span
            key={idx}
            className="interactive-word"
            onMouseEnter={() => setHoveredWord(`${idx}-${cleanWord}`)}
            onMouseLeave={() => setHoveredWord(null)}
          >
            {word}
            {hoveredWord === `${idx}-${cleanWord}` && (
              <span className="word-tooltip">{translation}</span>
            )}
          </span>
        );
      }
      return <span key={idx}>{word}</span>;
    });
  };

  const frenchParagraphs = passage.text.split('\n\n');
  const englishParagraphs = passage.translation.split('\n\n');

  return (
    <div className="reading-passage">
      <div className="passage-header">
        <div className="passage-meta">Reading Comprehension</div>
        <h1>{passage.title}</h1>
        <button
          className="btn-translation"
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? 'Hide' : 'Show'} English Translation
        </button>
      </div>

      <div className="passage-content">
        <div className="passage-french">
          {frenchParagraphs.map((paragraph, pIdx) => (
            <div key={pIdx} className="paragraph-block">
              <p className="french-text">{renderInteractiveText(paragraph)}</p>
              {showTranslation && (
                <p className="english-translation">{englishParagraphs[pIdx]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="passage-instructions">
        <strong>💡 Tip:</strong> Hover over any French word to see its English translation!
        Read the passage, then answer the questions below.
      </div>
    </div>
  );
}

export default ReadingPassage;

