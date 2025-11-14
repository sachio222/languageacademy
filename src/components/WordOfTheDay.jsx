import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import SpeakButton from './SpeakButton';
import '../styles/WordOfTheDay.css';

function WordOfTheDay() {
  const { user, supabaseUser } = useAuth();
  const supabase = useSupabaseClient();
  const [todaysWord, setTodaysWord] = useState(null);
  const [wordDetails, setWordDetails] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Get date from URL or use today - use local timezone
  const urlParams = new URLSearchParams(window.location.search);
  const getTodayLocal = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  const targetDate = urlParams.get('date') || getTodayLocal();
  const source = urlParams.get('utm_source') || 'direct';
  
  useEffect(() => {
    loadTodaysWord();
  }, [targetDate]);
  
  const loadTodaysWord = async () => {
    // TODO: Replace with real Supabase query
    // For now, using mock data
    const mockWord = {
      id: '1',
      date: targetDate,
      word_id: 'aller-fr',
      difficulty_label: 'A2 Level',
      social_hook: 'Can you guess this essential French verb?'
    };
    
    const mockWordDetails = {
      id: 'aller-fr',
      word: 'aller',
      part_of_speech: 'verb',
      phonetic: 'a.le',
      translations: [{ lang: 'en', text: 'to go' }],
      examples: [
        { 
          lang: 'fr', 
          text: 'Je vais au cinéma', 
          trans: 'I go to the cinema' 
        },
        { 
          lang: 'fr', 
          text: 'Nous allons à Paris demain', 
          trans: 'We are going to Paris tomorrow' 
        },
        { 
          lang: 'fr', 
          text: 'Comment allez-vous ?', 
          trans: 'How are you?' 
        }
      ],
      cefr_level: 'A2',
      // Multiple choice options (4 wrong + 1 correct)
      multipleChoiceOptions: [
        'to go',
        'to have',
        'to want',
        'to make',
        'to say'
      ]
    };
    
    setTodaysWord(mockWord);
    setWordDetails(mockWordDetails);
    
    // Check if user already guessed
    if (user) {
      // TODO: Real check
      // const { data: attempt } = await supabase...
      // For now, simulate no previous guess
      setHasGuessed(false);
    }
    
    setLoading(false);
  };
  
  const handleGuess = async (selectedAnswer) => {
    if (!selectedAnswer) return;
    
    setUserGuess(selectedAnswer);
    
    const correct = selectedAnswer === wordDetails.translations[0].text;
    
    if (user) {
      // TODO: Save attempt to Supabase
      // await supabase.from('word_of_the_day_attempts').insert({...});
    }
    
    setHasGuessed(true);
    setIsCorrect(correct);
  };
  
  const handleDontKnow = async () => {
    setUserGuess("I don't know");
    setHasGuessed(true);
    setIsCorrect(false);
    
    if (user) {
      // TODO: Save attempt to Supabase with guess = null
    }
  };
  
  if (loading) {
    return (
      <div className="wotd-loading">
        <div className="loading-spinner">Loading today's word...</div>
      </div>
    );
  }
  
  if (!todaysWord || !wordDetails) {
    return (
      <div className="wotd-error">
        <h2>No word available for this date</h2>
        <p>Check back tomorrow for a new word!</p>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="wotd-page">
      <div className="wotd-container">
        {/* Header */}
        <header className="wotd-header">
          <div className="wotd-label">Word of the Day</div>
          <h1 className="wotd-title">🇫🇷</h1>
          <p className="wotd-date">{formatDate(targetDate)}</p>
        </header>
        
        {/* Main Content */}
        {!hasGuessed && !showAnswer ? (
          <div className="wotd-challenge">
            {/* Word Display */}
            <div className="wotd-word-display">
              <div className="wotd-word-title-group">
                <h2 className="wotd-word-display-title">{wordDetails.word}</h2>
                <SpeakButton
                  text={wordDetails.word}
                  language="fr-FR"
                  size="medium"
                  className="wotd-speak-button"
                />
              </div>
              <div className="wotd-word-phonetic">/{wordDetails.phonetic}/</div>
              <div className="wotd-meta">
                <span className="wotd-pos">{wordDetails.part_of_speech}</span>
                <span className="wotd-difficulty">{todaysWord.difficulty_label}</span>
              </div>
            </div>
            
            {/* Multiple Choice Options */}
            <div className="wotd-question-section">
              <h3 className="wotd-question">What does this mean?</h3>
              
              <div className="wotd-choices">
                {wordDetails.multipleChoiceOptions.map((option, index) => (
                  <button
                    key={index}
                    className="wotd-choice-button"
                    onClick={() => handleGuess(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <button 
                className="wotd-dont-know-button" 
                onClick={handleDontKnow}
              >
                I don't know
              </button>
            </div>
            
            {!user && (
              <div className="wotd-auth-prompt">
                <p className="wotd-auth-message">Sign in to track your streak and progress</p>
              </div>
            )}
          </div>
        ) : (
          <div className="wotd-reveal">
            {hasGuessed && (
              <div className={`wotd-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? (
                  <div className="wotd-result-content">
                    <div className="wotd-result-icon">✓</div>
                    <h3 className="wotd-result-title">Correct!</h3>
                  </div>
                ) : (
                  <div className="wotd-result-content">
                    <div className="wotd-result-icon">×</div>
                    <h3 className="wotd-result-title">{userGuess === "I don't know" ? "The answer is:" : "Not quite"}</h3>
                    {userGuess !== "I don't know" && (
                      <p className="wotd-result-subtitle">You chose: {userGuess}</p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <div className="wotd-word-section">
              <div className="wotd-word-header">
                <div className="wotd-word-title-group">
                  <h2 className="wotd-word-title">{wordDetails.word}</h2>
                  <SpeakButton
                    text={wordDetails.word}
                    language="fr-FR"
                    size="medium"
                    className="wotd-speak-button"
                  />
                </div>
                <div className="wotd-word-phonetic">/{wordDetails.phonetic}/</div>
              </div>
              
              <div className="wotd-translation">
                <span className="wotd-pos">{wordDetails.part_of_speech}</span>
                <span className="wotd-translation-text">{wordDetails.translations[0].text}</span>
              </div>
            </div>
            
            <div className="wotd-examples-section">
              <h3 className="wotd-examples-title">Examples</h3>
              <div className="wotd-examples-list">
                {wordDetails.examples.map((example, index) => (
                  <div key={index} className="wotd-example">
                    <div className="wotd-example-fr">
                      <span className="wotd-example-text">{example.text}</span>
                      <SpeakButton
                        text={example.text}
                        language="fr-FR"
                        size="small"
                        className="wotd-example-speak"
                      />
                    </div>
                    <div className="wotd-example-en">{example.trans}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordOfTheDay;

