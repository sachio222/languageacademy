/**
 * Reading Passage Component
 * Displays a reading passage with translation toggle and interactive word tooltips
 */
import { useState, useRef, useEffect } from 'react';
import SpeakButton from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';
import { readingVocabulary as wordTranslations } from './readingVocabulary';
import { getTTSText } from '../utils/ttsUtils';
import { wikipediaEntries } from '../data/wikipediaEntries';
import { convertYearToFrench } from '../utils/readings/numberTTSUtilsFr';
import { isImageMarker, extractImageInfo } from '../utils/readings/imgUtils';

import { stripMarkdown } from '../utils/markdownUtils';
import { calculateTooltipPosition } from '../utils/readings/toottipUtils';

// Word translations now imported from readingVocabulary.js (deduplicated, 1752 unique entries)


// Wikipedia entries now imported from separate data file

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ shift: 0, arrowShift: 0, isVisible: false });
  const wordRefs = useRef({});
  const { speak } = useSpeech();

  useEffect(() => {
    calculateTooltipPosition(hoveredWord, wordRefs, setTooltipPosition);
  }, [hoveredWord]);

  if (!passage) return null;

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
      { phrase: "qu'est-ce que vous voulez", translation: "what do you want" },
      { phrase: "Qu'est-ce qu'il y a", translation: "What is there" },
      { phrase: "il y a", translation: "there is / there are" },
      { phrase: "l'ai", translation: "I have it" },
      { phrase: "Comte de Monte-Cristo", translation: "Count of Monte Cristo" },
      { phrase: "Jules Verne", translation: "Jules Verne" },
      { phrase: "Vingt mille lieues sous les mers", translation: "Twenty Thousand Leagues Under the Sea" },
      { phrase: "Belle Époque", translation: "Belle Époque (Beautiful Era)" },
      { phrase: "Café de la Paix", translation: "Café de la Paix" },
      { phrase: "Saint-Germain", translation: "Saint-Germain-des-Prés (trendy Paris neighborhood)" },
      { phrase: "qu'est-ce que", translation: "what" },
      { phrase: "s'il vous plaît", translation: "please (formal)" },
      { phrase: "s'il vous plait", translation: "please (formal)" },
      { phrase: "s'il te plaît", translation: "please (informal)" },
      { phrase: "s'il te plait", translation: "please (informal)" },
      { phrase: "excusez-moi", translation: "excuse me" },
      { phrase: "merci beaucoup", translation: "thank you very much" },
      { phrase: "merci à toi", translation: "thank you (to you)" },
      { phrase: "c'est combien", translation: "how much is it?" },
      { phrase: "combien est-ce", translation: "how much is it?" },
      { phrase: "est-ce que", translation: "question marker" },
      { phrase: "comment ça va", translation: "how's it going?" },
      { phrase: "au revoir", translation: "goodbye" },
      { phrase: "ça va bien", translation: "I'm good / it's going well" },
      { phrase: "ça va", translation: "it's going / OK" },
      { phrase: "ah bon", translation: "oh really / I see" },
      { phrase: "mais non", translation: "but no / not at all" },
      { phrase: "c'est ça", translation: "that's it / that's right" },
      { phrase: "aujourd'hui", translation: "today" },
      { phrase: "ce soir", translation: "this evening / tonight" },
      { phrase: "à ce soir", translation: "see you this evening" },
      { phrase: "le matin", translation: "the morning / in the morning" },
      { phrase: "là-bas", translation: "over there" },
      { phrase: "quelque part", translation: "somewhere" },
      { phrase: "nulle part", translation: "nowhere" },
      { phrase: "Grâce à", translation: "Thanks to" },
      { phrase: "grâce à", translation: "thanks to" },
      { phrase: "à cause de", translation: "because of" },
      { phrase: "parce que", translation: "because" },
      { phrase: "au-delà", translation: "beyond" },

      // Subjunctive forms that get tokenized incorrectly
      { phrase: "j'aie", translation: "I have (subjunctive)" },
      { phrase: "que j'aie", translation: "that I have (subjunctive)" },
      { phrase: "que j'aie perdu", translation: "that I lost/have lost" },

      // Proper nouns - multi-word
      { phrase: "Jardin des Tuileries", translation: "Tuileries Garden" },
      { phrase: "le Jardin des Tuileries", translation: "the Tuileries Garden" },
      { phrase: "au Jardin des Tuileries", translation: "at the Tuileries Garden" },
      { phrase: "Jardin du Luxembourg", translation: "Luxembourg Garden (famous Paris park)" },
      { phrase: "le Jardin du Luxembourg", translation: "the Luxembourg Garden" },
      { phrase: "au Jardin du Luxembourg", translation: "at/to Luxembourg Garden" },
      { phrase: "du Jardin du Luxembourg", translation: "from Luxembourg Garden" },
      { phrase: "Café de Flore", translation: "Café de Flore (famous Parisian café)" },
      { phrase: "Restaurant Le Procope", translation: "Restaurant Le Procope (oldest in Paris)" },
      { phrase: '"Amélie"', translation: '"Amélie" (famous French film)' },
      { phrase: "au Restaurant Le Procope", translation: "at Restaurant Le Procope" },
      { phrase: "Le Procope", translation: "Le Procope" },
      { phrase: "la Tour Eiffel", translation: "the Eiffel Tower" },
      { phrase: "Tour Eiffel", translation: "Eiffel Tower" },
      { phrase: "la Sorbonne", translation: "the Sorbonne" },
      { phrase: "La Sorbonne", translation: "the Sorbonne" },
      { phrase: "à la Sorbonne", translation: "at the Sorbonne" },
      { phrase: "Notre-Dame", translation: "Notre-Dame Cathedral" },
      { phrase: "Mont-Saint-Michel", translation: "Mont-Saint-Michel Abbey" },
      { phrase: "le Louvre", translation: "the Louvre Museum" },
      { phrase: "au Louvre", translation: "at the Louvre" },
      { phrase: "la Seine", translation: "the Seine River" },
      { phrase: "vers la Seine", translation: "towards the Seine" },
      { phrase: "Claude Monet", translation: "Claude Monet (Impressionist painter)" },
      { phrase: "Auguste Renoir", translation: "Auguste Renoir (Impressionist painter)" },
      { phrase: "Vincent van Gogh", translation: "Vincent van Gogh (Post-Impressionist painter)" },
      { phrase: "Moulin Rouge", translation: "Moulin Rouge (famous cabaret)" },
      { phrase: "Arc de Triomphe", translation: "Arc de Triomphe (triumphal arch)" },
      { phrase: "l'Arc de Triomphe", translation: "the Arc de Triomphe" },
      { phrase: "Champs-Élysées", translation: "Champs-Élysées (famous avenue)" },
      { phrase: "château de Versailles", translation: "Palace of Versailles" },
      { phrase: "mer Méditerranée", translation: "Mediterranean Sea" },
      { phrase: "coq au vin", translation: "Coq au Vin (classic French dish)" },
      { phrase: "bouillabaisse", translation: "bouillabaisse (Marseille fish stew)" },
      { phrase: "bouillabaisse de Marseille", translation: "bouillabaisse from Marseille" },
      { phrase: "soixante-huit millions", translation: "sixty-eight million" },
      { phrase: "Quelle surprise!", translation: "What a surprise!" },
      { phrase: "\"Quelle surprise!\"", translation: "\"What a surprise!\"" },

      // Unit 4 - Everyday nouns phrases
      { phrase: "tout le monde", translation: "everybody/everyone" },
      { phrase: "carte de crédit", translation: "credit card" },
      { phrase: "carte de credit", translation: "credit card" },
      { phrase: "ma carte de crédit", translation: "my credit card" },
      { phrase: "ma carte de credit", translation: "my credit card" },
      { phrase: "en espèces", translation: "in cash" },
      { phrase: "en especes", translation: "in cash" },
      { phrase: "une carafe d'eau", translation: "a carafe of water" },
      { phrase: "carafe d'eau", translation: "carafe of water" },
      { phrase: "l'addition", translation: "the bill" },
      { phrase: "le serveur", translation: "the waiter" },
      { phrase: "ce n'est pas un problème", translation: "that's not a problem" },
      { phrase: "ce n'est pas", translation: "it's not" },
      { phrase: "n'est pas", translation: "is not" },
      { phrase: "n'avais pas", translation: "didn't have" },
      { phrase: "n'ai pas", translation: "don't have" },
      { phrase: "n'a pas", translation: "doesn't have" },
      { phrase: "j'ai de l'argent", translation: "I have money" },
      { phrase: "de l'argent", translation: "money" },
      { phrase: "de l'eau", translation: "water" },
      { phrase: "du pain", translation: "bread" },
      { phrase: "pour la table", translation: "for the table" },
      { phrase: "pour le pain", translation: "for the bread" },
      { phrase: "pour toi", translation: "for you" },
      { phrase: "avec toi", translation: "with you" },
      { phrase: "avec moi", translation: "with me" },
      { phrase: "avec mes amis", translation: "with my friends" },
      { phrase: "avec eux", translation: "with them" },
      { phrase: "avec mon ami", translation: "with my friend" },
      { phrase: "je ne vois personne", translation: "I see nobody" },
      { phrase: "ne vois personne", translation: "see nobody" },
      { phrase: "autre chose", translation: "something else" },
      { phrase: "plus tard", translation: "later" },
      { phrase: "cet après-midi", translation: "this afternoon" },
      { phrase: "après-midi", translation: "afternoon" },
      { phrase: "le monde de la ville", translation: "the world of the city" },
      { phrase: "la grande place", translation: "the big square" },
      { phrase: "cette belle place", translation: "this beautiful square" },
      { phrase: "cette ville", translation: "this city" },
      { phrase: "de mauvais", translation: "bad" },

      // Negation phrases
      { phrase: "je ne peux pas payer", translation: "I can't pay" },
      { phrase: "ne peux pas payer", translation: "can't pay" },
      { phrase: "ne viens jamais", translation: "never comes" },
      { phrase: "ne vient jamais", translation: "never comes" },
      { phrase: "je ne vais jamais partir", translation: "I'll never leave" },
      { phrase: "ne vais jamais partir", translation: "never leave" },
      { phrase: "ne vais jamais", translation: "never go" },
      { phrase: "ne parle pas", translation: "doesn't speak" },
      { phrase: "ne parlons pas", translation: "don't speak" },
      { phrase: "ne peut pas", translation: "can't" },
      { phrase: "ne peux pas", translation: "can't" },
      { phrase: "ne veux pas", translation: "don't want" },
      { phrase: "le pain ne coûte rien", translation: "bread costs nothing" },
      { phrase: "ne coûte rien", translation: "costs nothing" },

      // Common verb phrases from Reading 4
      { phrase: "tu veux manger avec moi", translation: "do you want to eat with me" },
      { phrase: "tu veux manger", translation: "do you want to eat" },
      { phrase: "je veux manger", translation: "I want to eat" },
      { phrase: "qu'est-ce que vous voulez manger", translation: "what do you want to eat" },
      { phrase: "vous voulez manger", translation: "you want to eat" },
      { phrase: "je voudrais du pain et de l'eau", translation: "I would like bread and water" },
      { phrase: "je voudrais du pain", translation: "I would like bread" },
      { phrase: "je veux du pain aussi", translation: "I want bread too" },
      { phrase: "je veux du pain", translation: "I want bread" },
      { phrase: "c'est combien pour le pain", translation: "how much is the bread" },
      { phrase: "c'est combien pour", translation: "how much for" },
      { phrase: "vous devez manger autre chose", translation: "you must eat something else" },
      { phrase: "vous devez manger", translation: "you must eat" },
      { phrase: "je veux aussi voir", translation: "I also want to see" },
      { phrase: "tu vois la grande place", translation: "do you see the big square" },
      { phrase: "tu vois la", translation: "do you see the" },
      { phrase: "j'ai vu cette belle place", translation: "I saw this beautiful square" },
      { phrase: "j'ai vu", translation: "I saw" },
      { phrase: "je ne vais jamais partir de cette ville", translation: "I'll never leave this city" },
      { phrase: "partir de cette ville", translation: "leave this city" },
      { phrase: "tu aimes beaucoup cette ville", translation: "you really like this city" },
      { phrase: "tu aimes beaucoup", translation: "you really like" },
      { phrase: "la vie est très bonne ici", translation: "life is very good here" },
      { phrase: "la vie est", translation: "life is" },
      { phrase: "est très bonne", translation: "is very good" },
      { phrase: "tout le monde est gentil", translation: "everyone is kind" },
      { phrase: "je ne vois personne de mauvais", translation: "I don't see anyone bad" },
      { phrase: "où est la porte", translation: "where is the door" },
      { phrase: "je dois aller", translation: "I must go" },
      { phrase: "nous devons demander l'addition", translation: "we must ask for the bill" },
      { phrase: "demander l'addition", translation: "ask for the bill" },
      { phrase: "je dois faire mon travail", translation: "I must do my work" },
      { phrase: "faire mon travail", translation: "do my work" },
      { phrase: "vous payez comment", translation: "how are you paying" },
      { phrase: "je vais payer avec ma carte de crédit", translation: "I'm going to pay with my credit card" },
      { phrase: "je vais payer avec", translation: "I'm going to pay with" },
      { phrase: "je vais payer pour toi", translation: "I'm going to pay for you" },
      { phrase: "je vais payer", translation: "I'm going to pay" },
      { phrase: "demain je vais payer", translation: "tomorrow I'll pay" },
      { phrase: "tu es une bonne amie", translation: "you're a good friend" },
      { phrase: "je peux payer pour toi", translation: "I can pay for you" },
      { phrase: "je peux payer", translation: "I can pay" },
      { phrase: "payer avec ma carte de crédit", translation: "pay with my credit card" },
      { phrase: "payer avec ma", translation: "pay with my" },
      { phrase: "payer avec", translation: "pay with" },
      { phrase: "payer en espèces", translation: "pay in cash" },
      { phrase: "dans ma main", translation: "in my hand" },
      { phrase: "j'ai le temps", translation: "I have time" },
      { phrase: "le temps aujourd'hui", translation: "time today" },
      { phrase: "où est le restaurant", translation: "where is the restaurant" },
      { phrase: "je vois un bon restaurant", translation: "I see a good restaurant" },
      { phrase: "dans la rue", translation: "on the street" },
      { phrase: "nous devons aller là-bas", translation: "we must go there" },
      { phrase: "aller là-bas", translation: "go there" },
      { phrase: "tout le monde parle de ce restaurant", translation: "everyone talks about this restaurant" },
      { phrase: "parle de ce restaurant", translation: "talks about this restaurant" },
      { phrase: "une carafe d'eau pour la table", translation: "a carafe of water for the table" },
      { phrase: "je la vois", translation: "I see it (fem)" },
      { phrase: "tu aimes", translation: "you like" },
      { phrase: "c'est la vie", translation: "that's life" },
      { phrase: "à demain", translation: "see you tomorrow" },

      // Existing phrases
      { phrase: "nous devons", translation: "we must" },
      { phrase: "je dois", translation: "I must" },
      { phrase: "je voudrais", translation: "I would like" },
      { phrase: "tu veux", translation: "you want" },
      { phrase: "je veux", translation: "I want" },
      { phrase: "je vois", translation: "I see" },
      { phrase: "je le vois", translation: "I see him/it" },
      { phrase: "tu vois", translation: "you see" },
      { phrase: "je parle", translation: "I speak" },
      { phrase: "tu parles", translation: "you speak" },
      { phrase: "nous parlons", translation: "we speak" },
      { phrase: "je fais", translation: "I do/make" },
      { phrase: "tu fais", translation: "you do/make" },
      { phrase: "nous voyons", translation: "we see" },
      { phrase: "nous avons vu", translation: "we saw/have seen" },
      { phrase: "je suis", translation: "I am" },
      { phrase: "il est", translation: "he is" },
      { phrase: "nous allons", translation: "we go/are going" },
      { phrase: "je vais", translation: "I go/am going" },
      { phrase: "tu vas", translation: "you go/are going" },
      { phrase: "j'aime", translation: "I like/love" },
      { phrase: "j'aime", translation: "I like/love" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "tu n'as pas", translation: "you don't have" },
      { phrase: "il a", translation: "he has" },
      { phrase: "il doit", translation: "he must" },
      { phrase: "c'est", translation: "it's" },
    ];

    while (remainingText.length > 0) {
      let matched = false;

      // Check for italic formatting first
      const italicMatch = remainingText.match(/^\*([^*]+)\*/);
      if (italicMatch) {
        const italicText = italicMatch[1];
        const uniqueKey = `p${paragraphIndex}-c${charPosition}-italic`;

        // Render the italic text as interactive words
        elements.push(
          <em key={uniqueKey}>
            {renderWords(italicText, paragraphIndex)}
          </em>
        );

        remainingText = remainingText.slice(italicMatch[0].length);
        charPosition += italicMatch[0].length;
        continue;
      }

      // Check for multi-word phrases
      for (const { phrase, translation } of multiWordPhrases) {
        if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
          const matchedText = remainingText.slice(0, phrase.length);
          const uniqueKey = `p${paragraphIndex}-c${charPosition}`;
          const wikiEntry = wikipediaEntries[matchedText] || wikipediaEntries[matchedText.toLowerCase()];

          elements.push(
            <span
              key={uniqueKey}
              ref={el => { if (el) wordRefs.current[uniqueKey] = el; }}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => speak(getTTSText(matchedText), 'fr-FR')}
              style={{ cursor: 'pointer' }}
            >
              {matchedText}
              {hoveredWord === uniqueKey && wikiEntry && (
                <span
                  className="word-tooltip wiki-tooltip"
                  style={{
                    '--tooltip-shift': `${tooltipPosition.shift}px`,
                    '--arrow-shift': `${tooltipPosition.arrowShift}px`,
                    visibility: tooltipPosition.isVisible ? 'visible' : 'hidden'
                  }}
                >
                  <div className="wiki-content">
                    <img src={wikiEntry.image} alt={wikiEntry.name} className="wiki-image" />
                    <div className="wiki-text">
                      <strong>{wikiEntry.name}</strong>
                      <p>{wikiEntry.description}</p>
                      <a href={wikiEntry.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                        📖 Wikipedia
                      </a>
                    </div>
                  </div>
                </span>
              )}
              {hoveredWord === uniqueKey && !wikiEntry && (
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

      // Check for years (4-digit numbers) - make them clickable for French pronunciation
      const yearMatch = remainingText.match(/^(18\d{2}|19\d{2}|20\d{2})/);
      if (yearMatch) {
        const year = yearMatch[1];
        const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

        // Convert year to French words for TTS
        const yearInFrench = convertYearToFrench(year);

        elements.push(
          <span
            key={uniqueKey}
            ref={el => { if (el) wordRefs.current[uniqueKey] = el; }}
            className="interactive-word"
            onMouseEnter={() => setHoveredWord(uniqueKey)}
            onMouseLeave={() => setHoveredWord(null)}
            onClick={() => speak(yearInFrench, 'fr-FR')}
            style={{ cursor: 'pointer' }}
          >
            {year}
            {hoveredWord === uniqueKey && (
              <span
                className="word-tooltip"
                style={{
                  '--tooltip-shift': `${tooltipPosition.shift}px`,
                  '--arrow-shift': `${tooltipPosition.arrowShift}px`,
                  visibility: tooltipPosition.isVisible ? 'visible' : 'hidden'
                }}
              >
                {yearInFrench}
              </span>
            )}
          </span>
        );

        remainingText = remainingText.slice(year.length);
        charPosition += year.length;
        continue;
      }

      // Check for single words (including accented characters)
      const wordMatch = remainingText.match(/^([a-zàâäæçéèêëïîôùûüœ']+)/i);
      if (wordMatch) {
        const word = wordMatch[1];
        const cleanWord = word.toLowerCase();
        const translation = wordTranslations[word] || wordTranslations[cleanWord];
        const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

        if (translation) {
          const wikiEntry = wikipediaEntries[word] || wikipediaEntries[cleanWord];

          elements.push(
            <span
              key={uniqueKey}
              ref={el => { if (el) wordRefs.current[uniqueKey] = el; }}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => speak(getTTSText(word), 'fr-FR')}
              style={{ cursor: 'pointer' }}
            >
              {word}
              {hoveredWord === uniqueKey && wikiEntry && (
                <span
                  className="word-tooltip wiki-tooltip"
                  style={{
                    '--tooltip-shift': `${tooltipPosition.shift}px`,
                    '--arrow-shift': `${tooltipPosition.arrowShift}px`,
                    visibility: tooltipPosition.isVisible ? 'visible' : 'hidden'
                  }}
                >
                  <div className="wiki-content">
                    <img src={wikiEntry.image} alt={wikiEntry.name} className="wiki-image" />
                    <div className="wiki-text">
                      <strong>{wikiEntry.name}</strong>
                      <p>{wikiEntry.description}</p>
                      <a href={wikiEntry.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                        📖 Wikipedia
                      </a>
                    </div>
                  </div>
                </span>
              )}
              {hoveredWord === uniqueKey && !wikiEntry && (
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
          {frenchParagraphs.map((paragraph, pIdx) => {
            // Check if this paragraph is an image marker
            if (isImageMarker(paragraph)) {
              const imageInfo = extractImageInfo(paragraph);
              if (!imageInfo) return null;

              return (
                <div key={pIdx} className="paragraph-block paragraph-image">
                  <img
                    src={`/${imageInfo.path}`}
                    alt={`Reading illustration ${pIdx + 1}`}
                    className="reading-image"
                    style={imageInfo.style}
                  />
                </div>
              );
            }

            // Regular paragraph
            return (
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
                  <p className="english-translation">{stripMarkdown(englishParagraphs[pIdx])}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="passage-instructions">
        <strong>💡 Tip:</strong> Hover over any French word to see its English translation! Click on any word to hear it spoken.
        Hover over paragraphs to read them individually.
      </div>
    </div>
  );
}

export default ReadingPassage;

