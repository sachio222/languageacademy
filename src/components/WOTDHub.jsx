import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import SpeakButton from './SpeakButton';
import '../styles/WOTDHub.css';

function WOTDHub() {
  const { user } = useAuth();
  const [view, setView] = useState('single'); // 'single' or 'archive'
  const [currentDate, setCurrentDate] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streakCount, setStreakCount] = useState(0);
  const [viewedWords, setViewedWords] = useState([]);

  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const answerParam = params.get('answer');
    const wordParam = params.get('word');
    
    // Set answer if from email
    if (answerParam) {
      setUserAnswer(answerParam);
    }
    
    // Set date (from URL or today)
    const targetDate = dateParam || new Date().toISOString().split('T')[0];
    setCurrentDate(targetDate);
    
    // Load word data
    loadWordData(targetDate);
    
    // Load streak from localStorage (for non-auth users)
    if (!user) {
      const savedStreak = localStorage.getItem('wotd_streak');
      const savedViewed = localStorage.getItem('wotd_viewed');
      setStreakCount(savedStreak ? parseInt(savedStreak) : 0);
      setViewedWords(savedViewed ? JSON.parse(savedViewed) : []);
    }
  }, [user]);

  const loadWordData = async (date) => {
    setLoading(true);
    
    // TODO: Replace with real Supabase query
    // For now, mock data
    const mockData = {
      id: 'aller-fr',
      date: date,
      word: 'aller',
      phonetic: 'a.le',
      part_of_speech: 'verb',
      difficulty_level: 'A2',
      difficulty_label: 'A2 Level',
      translation: 'to go',
      definition: 'To move from one place to another; to travel',
      correct_answer: 'to go',
      wrong_options: ['to have', 'to want', 'to make'],
      examples: [
        {
          french: 'Je vais au cinéma.',
          english: "I'm going to the cinema.",
          context: 'present tense'
        },
        {
          french: 'Comment allez-vous ?',
          english: 'How are you?',
          context: 'formal greeting'
        },
        {
          french: 'Nous allons partir demain.',
          english: "We're going to leave tomorrow.",
          context: 'near future'
        },
        {
          french: 'Elle va bien.',
          english: "She's doing well.",
          context: 'expression'
        }
      ],
      related_words: [
        { word: 'venir', translation: 'to come' },
        { word: 'partir', translation: 'to leave' },
        { word: 'arriver', translation: 'to arrive' }
      ],
      usage_notes: 'Aller is one of the most common verbs in French and is irregular. It\'s used to form the near future tense (aller + infinitive).'
    };
    
    setWordData(mockData);
    
    // Update viewed words and streak
    updateProgress(date);
    
    setLoading(false);
  };

  const updateProgress = (date) => {
    if (!user) {
      // Update localStorage for non-auth users
      const viewedList = [...viewedWords];
      if (!viewedList.includes(date)) {
        viewedList.push(date);
        setViewedWords(viewedList);
        localStorage.setItem('wotd_viewed', JSON.stringify(viewedList));
        
        // Update streak
        const newStreak = streakCount + 1;
        setStreakCount(newStreak);
        localStorage.setItem('wotd_streak', newStreak.toString());
      }
    }
  };

  const navigateDay = (direction) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + direction);
    const newDate = date.toISOString().split('T')[0];
    setCurrentDate(newDate);
    loadWordData(newDate);
    
    // Update URL
    const params = new URLSearchParams(window.location.search);
    params.set('date', newDate);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleShare = (platform) => {
    const url = `https://languageacademy.app?wotd=true&date=${currentDate}`;
    const text = `I just learned "${wordData.word}" (${wordData.translation}) in French! 🇫🇷`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  const getAnswerFeedback = () => {
    if (!userAnswer) return null;
    
    const isCorrect = userAnswer === 'A'; // Assuming A is always correct in mock
    const isDontKnow = userAnswer === 'X';
    
    return {
      isCorrect,
      isDontKnow,
      message: isDontKnow ? "Here's the answer" : (isCorrect ? "Correct!" : "Not quite"),
      icon: isDontKnow ? "📖" : (isCorrect ? "✓" : "×"),
      className: isDontKnow ? "neutral" : (isCorrect ? "correct" : "incorrect")
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateMockArchive = () => {
    // Generate mock archive data for demonstration
    const mockWords = [
      { word: 'aller', translation: 'to go', type: 'verb', level: 'A2' },
      { word: 'faire', translation: 'to make/do', type: 'verb', level: 'A2' },
      { word: 'être', translation: 'to be', type: 'verb', level: 'A1' },
      { word: 'avoir', translation: 'to have', type: 'verb', level: 'A1' },
      { word: 'bonjour', translation: 'hello', type: 'expression', level: 'A1' },
      { word: 'maison', translation: 'house', type: 'noun', level: 'A1' },
      { word: 'beau', translation: 'beautiful', type: 'adjective', level: 'A2' },
      { word: 'vouloir', translation: 'to want', type: 'verb', level: 'A2' },
    ];

    return Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const word = mockWords[i % mockWords.length];
      
      return {
        date: date.toISOString().split('T')[0],
        monthDay: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        year: date.getFullYear(),
        ...word
      };
    });
  };

  if (loading || !wordData) {
    return (
      <div className="wotd-hub">
        <div className="wotd-loading">Loading...</div>
      </div>
    );
  }

  const feedback = getAnswerFeedback();

  return (
    <div className="wotd-hub">
      {/* Navigation Header */}
      <header className="wotd-nav-header">
        <div className="wotd-nav-container">
          <button 
            className="wotd-nav-link"
            onClick={() => setView(view === 'archive' ? 'single' : 'archive')}
          >
            {view === 'archive' ? '← Back to Word' : 'View Archive'}
          </button>
          <div className="wotd-nav-title">
            <img src="/img/logov2.png" alt="" className="wotd-logo-small" />
            <span>Word of the Day</span>
            <span className="wotd-flag">🇫🇷</span>
          </div>
          {!user && (
            <button className="wotd-signup-btn">Sign Up</button>
          )}
        </div>
      </header>

      {view === 'single' ? (
        <div className="wotd-single-view">
          {/* Date Navigation */}
          <div className="wotd-date-nav">
            <div className="wotd-container">
              <div className="wotd-date-controls">
                <button 
                  className="wotd-day-nav-btn"
                  onClick={() => navigateDay(-1)}
                >
                  ← Previous Day
                </button>
                <div className="wotd-current-date">{formatDate(currentDate)}</div>
                <button 
                  className="wotd-day-nav-btn"
                  onClick={() => navigateDay(1)}
                  disabled={currentDate >= new Date().toISOString().split('T')[0]}
                >
                  Next Day →
                </button>
              </div>
            </div>
          </div>

          {/* Answer Feedback (if from email) */}
          {feedback && (
            <div className={`wotd-feedback wotd-feedback-${feedback.className}`}>
              <div className="wotd-container">
                <div className="wotd-feedback-content">
                  <div className="wotd-feedback-icon">{feedback.icon}</div>
                  <div className="wotd-feedback-message">
                    <h2>{feedback.message}</h2>
                    {!user && streakCount > 0 && feedback.isCorrect && (
                      <p className="wotd-streak">🔥 {streakCount} day streak!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Word Hero Section */}
          <section className="wotd-hero">
            <div className="wotd-container">
              <div className="wotd-word-display">
                <h1 className="wotd-word">{wordData.word}</h1>
                <div className="wotd-pronunciation">
                  <span className="wotd-phonetic">/{wordData.phonetic}/</span>
                  <SpeakButton
                    text={wordData.word}
                    language="fr-FR"
                    size="medium"
                    className="wotd-speak-btn"
                  />
                </div>
                <div className="wotd-meta-badges">
                  <span className="wotd-badge">{wordData.part_of_speech}</span>
                  <span className="wotd-badge">{wordData.difficulty_label}</span>
                  <span className="wotd-badge">Common</span>
                </div>
                <div className="wotd-translation-main">{wordData.translation}</div>
              </div>

              {/* Share Buttons */}
              <div className="wotd-share-section">
                <button 
                  className="wotd-share-btn wotd-share-twitter"
                  onClick={() => handleShare('twitter')}
                  title="Share on Twitter"
                >
                  𝕏
                </button>
                <button 
                  className="wotd-share-btn"
                  onClick={() => handleShare('facebook')}
                  title="Share on Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button 
                  className="wotd-share-btn"
                  onClick={() => handleShare('copy')}
                  title="Copy Link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
              </div>
            </div>
          </section>

          {/* Definition Section */}
          <section className="wotd-section">
            <div className="wotd-container">
              <div className="wotd-definition-card">
                <h3 className="wotd-section-title">Definition</h3>
                <p className="wotd-definition-text">{wordData.definition}</p>
              </div>
            </div>
          </section>

          {/* Examples Section */}
          <section className="wotd-section">
            <div className="wotd-container">
              <h2 className="wotd-section-heading">Examples in Context</h2>
              <div className="wotd-examples-list">
                {wordData.examples.map((example, index) => (
                  <div key={index} className="wotd-example-item">
                    <div className="wotd-example-french">
                      <span className="wotd-example-text">{example.french}</span>
                      <SpeakButton
                        text={example.french}
                        language="fr-FR"
                        size="small"
                        className="wotd-example-speak"
                      />
                    </div>
                    <div className="wotd-example-english">{example.english}</div>
                    <div className="wotd-example-context">{example.context}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Conversion CTA #1 */}
          {!user && (
            <section className="wotd-cta-section">
              <div className="wotd-container">
                <div className="wotd-cta-card">
                  <h3>Want to learn more?</h3>
                  <p>Join 10,000+ learners mastering French with structured lessons</p>
                  <button className="wotd-cta-button">Start Learning Free</button>
                </div>
              </div>
            </section>
          )}

          {/* Usage Notes */}
          {wordData.usage_notes && (
            <section className="wotd-section">
              <div className="wotd-container">
                <div className="wotd-note-card">
                  <h3 className="wotd-section-title">Usage Notes</h3>
                  <p>{wordData.usage_notes}</p>
                </div>
              </div>
            </section>
          )}

          {/* Related Words */}
          {wordData.related_words && wordData.related_words.length > 0 && (
            <section className="wotd-section">
              <div className="wotd-container">
                <h2 className="wotd-section-heading">Related Words</h2>
                <div className="wotd-related-words">
                  {wordData.related_words.map((related, index) => (
                    <div key={index} className="wotd-related-item">
                      <span className="wotd-related-word">{related.word}</span>
                      <span className="wotd-related-translation">{related.translation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Navigation Footer */}
          <section className="wotd-footer-nav">
            <div className="wotd-container">
              <div className="wotd-footer-controls">
                <button 
                  className="wotd-footer-nav-btn"
                  onClick={() => navigateDay(-1)}
                >
                  ← Previous Word
                </button>
                <button 
                  className="wotd-footer-link"
                  onClick={() => setView('archive')}
                >
                  View All Words
                </button>
                <button 
                  className="wotd-footer-nav-btn"
                  onClick={() => navigateDay(1)}
                  disabled={currentDate >= new Date().toISOString().split('T')[0]}
                >
                  Next Word →
                </button>
              </div>
            </div>
          </section>

        </div>
      ) : (
        <div className="wotd-archive-view">
          <div className="wotd-container">
            <h1 className="wotd-archive-title">Word Archive</h1>
            <p className="wotd-archive-subtitle">365 French words to master</p>
            
            {/* Filter Bar */}
            <div className="wotd-archive-filters">
              <select className="wotd-filter-select">
                <option value="all">All Levels</option>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
              </select>
              <select className="wotd-filter-select">
                <option value="all">All Types</option>
                <option value="verb">Verbs</option>
                <option value="noun">Nouns</option>
                <option value="adjective">Adjectives</option>
                <option value="expression">Expressions</option>
              </select>
              <div className="wotd-search-box">
                <input 
                  type="text" 
                  placeholder="Search words..."
                  className="wotd-search-input"
                />
              </div>
            </div>

            {/* Archive List */}
            <div className="wotd-archive-list">
              {/* Mock archive items - will be replaced with real data */}
              {generateMockArchive().map((item, index) => (
                <div 
                  key={index} 
                  className="wotd-archive-item"
                  onClick={() => {
                    setCurrentDate(item.date);
                    setView('single');
                    loadWordData(item.date);
                  }}
                >
                  <div className="wotd-archive-date">
                    <div className="wotd-archive-month">{item.monthDay}</div>
                    <div className="wotd-archive-year">{item.year}</div>
                  </div>
                  <div className="wotd-archive-word-info">
                    <div className="wotd-archive-word">{item.word}</div>
                    <div className="wotd-archive-translation">{item.translation}</div>
                  </div>
                  <div className="wotd-archive-meta">
                    <span className="wotd-archive-badge">{item.type}</span>
                    <span className="wotd-archive-badge">{item.level}</span>
                  </div>
                  <button className="wotd-archive-view-btn">View →</button>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="wotd-archive-load-more">
              <button className="wotd-load-more-btn">Load More Words</button>
            </div>

            {/* CTA for non-auth users */}
            {!user && (
              <div className="wotd-archive-cta">
                <h3>Get daily words in your inbox</h3>
                <p>Never miss a word. Join 10,000+ learners getting daily French lessons.</p>
                <div className="wotd-email-capture">
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="wotd-email-input"
                  />
                  <button className="wotd-email-submit">Subscribe</button>
                </div>
                <p className="wotd-email-disclaimer">No spam. Unsubscribe anytime.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WOTDHub;

