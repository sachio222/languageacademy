/**
 * Reading Passage Component
 * Displays a reading passage with translation toggle and interactive word tooltips
 */
import { useState } from 'react';
import SpeakButton from './SpeakButton';

// Word-to-English mapping for reading passages - Updated for modules through Unit 2
const wordTranslations = {
  // Module 1 - Famous words
  'bonjour': 'hello',
  'merci': 'thank you',
  'oui': 'yes',
  'non': 'no',
  'pardon': 'excuse me',
  'salut': 'hi/bye',
  'voilà': 'there it is',
  'café': 'coffee',
  'bon': 'good',
  'bien': 'well',

  // Module 2 - Pronouns
  'je': 'I',
  'tu': 'you (informal)',
  'il': 'he',
  'elle': 'she',
  'nous': 'we',
  'vous': 'you (formal)',
  'ils': 'they (masc)',
  'elles': 'they (fem)',

  // Module 15 - Stressed Pronouns
  'moi': 'me',
  'toi': 'you',
  'lui': 'him',
  'eux': 'them (masc)',

  // Module 3 - être
  'suis': 'am',
  'es': 'are',
  'est': 'is',
  'sommes': 'are',
  'êtes': 'are',
  'sont': 'are',

  // Module 4 - avoir
  'ai': 'have',
  "j'ai": 'I have',
  'as': 'have',
  'a': 'has',
  'avons': 'have',
  'avez': 'have',
  'ont': 'have',

  // Module 5 - Articles
  'un': 'a (masc)',
  'une': 'a (fem)',
  'le': 'the (masc)',
  'la': 'the (fem)',
  'les': 'the (plural)',
  'des': 'some',

  // Module 6 - Nouns
  'livre': 'book',
  'livres': 'books',
  'chat': 'cat',
  'chats': 'cats',
  'chien': 'dog',
  'chiens': 'dogs',
  'maison': 'house',
  'voiture': 'car',
  'ami': 'friend',
  'amis': 'friends',
  'amie': 'friend (fem)',
  'homme': 'man',
  'femme': 'woman',
  'enfant': 'child',
  'enfants': 'children',
  'chose': 'thing',
  'jour': 'day',

  // Module 8 - Connectors
  'et': 'and',
  'mais': 'but',
  'ou': 'or',
  'aussi': 'also/too',
  'très': 'very',

  // Module 15 - Adjectives (all forms)
  'bonne': 'good (fem)',
  'bonnes': 'good (fem plural)',
  'bons': 'good (masc plural)',
  'grand': 'big/tall (masc)',
  'grande': 'big/tall (fem)',
  'grands': 'big/tall (masc plural)',
  'grandes': 'big/tall (fem plural)',
  'petit': 'small (masc)',
  'petite': 'small (fem)',
  'petits': 'small (masc plural)',
  'petites': 'small (fem plural)',
  'nouveau': 'new (masc)',
  'nouvelle': 'new (fem)',
  'nouveaux': 'new (masc plural)',
  'nouvelles': 'new (fem plural)',
  'vieux': 'old (masc)',
  'vieille': 'old (fem)',
  'vieil': 'old (masc before vowel)',
  'vieilles': 'old (fem plural)',
  'jeune': 'young',
  'jeunes': 'young (plural)',
  'beau': 'beautiful (masc)',
  'belle': 'beautiful (fem)',
  'beaux': 'beautiful (masc plural)',
  'belles': 'beautiful (fem plural)',
  'autre': 'other',
  'autres': 'other (plural)',


  // Module 13 - Questions
  'que': 'what',
  'qui': 'who',
  'où': 'where',
  'quand': 'when',
  'comment': 'how',
  'pourquoi': 'why',

  // Module 16 - Prepositions
  'avec': 'with',
  'dans': 'in',
  'sur': 'on',
  'à': 'to/at',
  'de': 'of/from',
  'pour': 'for',

  // Module 13 - vouloir/pouvoir
  'veux': 'want',
  'veut': 'wants',
  'voulons': 'want',
  'voir': 'to see',
  'voit': 'sees',
  'vois': 'see',
  'peux': 'can',
  'peut': 'can',
  'pouvons': 'can',

  // Common contractions/phrases
  "c'est": "it's",
  'ça': 'that/it',
  'ce': 'this/that',
  'cette': 'this/that (fem)',
  'ces': 'these/those',

  // Motion verbs
  'viens': 'come',
  'vient': 'comes',
  'venons': 'come',
  'vais': 'go',
  'va': 'goes',
  'allons': 'go',
  'allons-y': "let's go!",
  'part': 'leaves',
  'pars': 'leave',

  // Possessive adjectives
  'mon': 'my (masc)',
  'ma': 'my (fem)',
  'mes': 'my (plural)',
  'ton': 'your (masc)',
  'ta': 'your (fem)',
  'tes': 'your (plural)',
  'son': 'his/her (masc)',
  'sa': 'his/her (fem)',
  'ses': 'his/her (plural)',

  // Object pronouns
  'le': 'it/him',
  'la': 'it/her',
  'les': 'them',
  "l'": 'it',

  // Contractions
  'du': 'of/from the (masc)',
  'au': 'to/at the (masc)',
  'aux': 'to/at the (plural)',

  // Possessive pronouns
  'mien': 'mine',
  'tien': 'yours',
  'sien': 'his/hers',


  // Names
  'marie': 'Marie',
  'paul': 'Paul',
  'sophie': 'Sophie',
  'marc': 'Marc',
};

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);

  if (!passage) return null;

  // Strip markdown formatting for TTS
  const stripMarkdown = (text) => {
    return text.replace(/\*\*/g, '');
  };

  // Make words interactive - use paragraph index for truly unique keys
  const renderInteractiveText = (text, paragraphIndex) => {
    // Check if line has speaker label
    const speakerMatch = text.match(/^\*\*([^:]+):\*\*/);

    if (speakerMatch) {
      const speaker = speakerMatch[1];
      const dialogue = text.replace(/^\*\*[^:]+:\*\*\s*/, '');

      return (
        <>
          <strong className="speaker-label">{speaker}:</strong>{' '}
          {renderWords(dialogue, paragraphIndex)}
        </>
      );
    }

    return renderWords(text, paragraphIndex);
  };

  const renderWords = (text, paragraphIndex) => {
    let remainingText = text;
    const elements = [];
    let charPosition = 0;

    // Multi-word phrases to check FIRST (longest first to avoid conflicts)
    const multiWordPhrases = [
      { phrase: "qu'est-ce que c'est", translation: "what is it?" },
      { phrase: "s'il vous plaît", translation: "please" },
      { phrase: "comment ça va", translation: "how's it going?" },
      { phrase: "au revoir", translation: "goodbye" },
      { phrase: "ça va", translation: "it's going / OK" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "c'est", translation: "it's" },
    ];

    while (remainingText.length > 0) {
      let matched = false;

      // Check for multi-word phrases
      for (const { phrase, translation } of multiWordPhrases) {
        if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
          const matchedText = remainingText.slice(0, phrase.length);
          const uniqueKey = `p${paragraphIndex}-c${charPosition}`;
          elements.push(
            <span
              key={uniqueKey}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              {matchedText}
              {hoveredWord === uniqueKey && (
                <span className="word-tooltip">{translation}</span>
              )}
            </span>
          );
          remainingText = remainingText.slice(phrase.length);
          charPosition += phrase.length;
          matched = true;
          break;
        }
      }

      if (matched) continue;

      // Check for single words (including accented characters)
      const wordMatch = remainingText.match(/^([a-zàâäæçéèêëïîôùûüœ']+)/i);
      if (wordMatch) {
        const word = wordMatch[1];
        const cleanWord = word.toLowerCase();
        const translation = wordTranslations[cleanWord];
        const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

        if (translation) {
          elements.push(
            <span
              key={uniqueKey}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              {word}
              {hoveredWord === uniqueKey && (
                <span className="word-tooltip">{translation}</span>
              )}
            </span>
          );
        } else {
          // Log missing words for debugging
          console.warn(`Missing translation for: "${word}"`);
          elements.push(<span key={uniqueKey} className="missing-translation" title={`Translation missing for: ${word}`}>{word}</span>);
        }

        remainingText = remainingText.slice(word.length);
        charPosition += word.length;
        continue;
      }

      // Match spaces and punctuation
      const otherMatch = remainingText.match(/^(\s+|[.!?,;:])/);
      if (otherMatch) {
        elements.push(<span key={`p${paragraphIndex}-c${charPosition}`}>{otherMatch[1]}</span>);
        remainingText = remainingText.slice(otherMatch[1].length);
        charPosition += otherMatch[1].length;
        continue;
      }

      // Fallback
      const char = remainingText[0];
      elements.push(<span key={`p${paragraphIndex}-c${charPosition}`}>{char}</span>);
      remainingText = remainingText.slice(1);
      charPosition++;
    }

    return elements;
  };

  const frenchParagraphs = passage.text.split('\n\n');
  const englishParagraphs = passage.translation.split('\n\n');

  return (
    <div className="reading-passage">
      <div className="passage-header">
        <div className="passage-meta">Reading Comprehension</div>
        <h1>{passage.title}</h1>
        <div className="passage-controls">
          <button
            className="btn-translation"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide' : 'Show'} English Translation
          </button>
        </div>
      </div>

      <div className="passage-content">
        {/* Read entire passage button - above first paragraph */}
        <div className="passage-audio-header">
          <SpeakButton
            text={stripMarkdown(passage.text)}
            language="fr-FR"
            size="medium"
            ariaLabel="Read entire passage aloud"
          />
          <span className="audio-label">Listen to entire passage</span>
        </div>

        <div className="passage-french">
          {frenchParagraphs.map((paragraph, pIdx) => (
            <div key={pIdx} className="paragraph-block paragraph-with-audio">
              <p className="french-text">
                {renderInteractiveText(paragraph, pIdx)}
              </p>
              {/* Per-paragraph speaker button - appears on hover */}
              <div className="paragraph-audio-btn">
                <SpeakButton
                  text={stripMarkdown(paragraph)}
                  language="fr-FR"
                  size="small"
                  ariaLabel={`Read paragraph ${pIdx + 1}`}
                />
              </div>
              {showTranslation && (
                <p className="english-translation">{englishParagraphs[pIdx]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="passage-instructions">
        <strong>💡 Tip:</strong> Hover over any French word to see its English translation!
        Hover over paragraphs to read them individually.
      </div>
    </div>
  );
}

export default ReadingPassage;

