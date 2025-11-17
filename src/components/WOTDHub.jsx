import { useState, useEffect } from 'react';
import { useClerk, UserButton } from '@clerk/clerk-react';
import { Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSupabaseClient } from '../hooks/useSupabaseClient';
import SpeakButton from './SpeakButton';
import NotificationSettings from './NotificationSettings';
import '../styles/WOTDHub.css';

function WOTDHub() {
  const { user } = useAuth();
  const { openSignIn, openSignUp } = useClerk();
  const supabase = useSupabaseClient();
  
  // WOTD feature launch date - don't allow navigation before this
  const WOTD_START_DATE = '2025-11-10';
  
  // Helper function to get today's date in local timezone as YYYY-MM-DD
  const getTodayLocal = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  
  const [view, setView] = useState('single'); // 'single' or 'archive'
  const [currentDate, setCurrentDate] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streakCount, setStreakCount] = useState(0);
  const [viewedWords, setViewedWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(true);
  const [archiveWords, setArchiveWords] = useState([]);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreWords, setHasMoreWords] = useState(true);
  const [archiveOffset, setArchiveOffset] = useState(0);
  const [hasNextDay, setHasNextDay] = useState(true); // Track if next day has a word
  const [showNotificationSettings, setShowNotificationSettings] = useState(() => {
    // Check if settings param is in URL
    const params = new URLSearchParams(window.location.search)
    return params.has('settings')
  });

  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const answerParam = params.get('answer');
    const wordParam = params.get('word');
    const correctKeyParam = params.get('correct'); // Which letter is correct

    // If word param is provided without date, look up the word to find its date
    if (wordParam && !dateParam) {
      loadWordByWordId(wordParam);
      return;
    }

    // Set date first - use local timezone
    const targetDate = dateParam || getTodayLocal();
    setCurrentDate(targetDate);

    // Set answer if from email
    if (answerParam) {
      console.log('User answered:', answerParam);
      setUserAnswer(answerParam);
    }

    // Store correct key for validation
    if (correctKeyParam) {
      console.log('Correct answer is:', correctKeyParam);
      sessionStorage.setItem(`wotd_correct_${targetDate}`, correctKeyParam);
    }

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

  // Load archive data when switching to archive view
  useEffect(() => {
    if (view === 'archive' && archiveWords.length === 0) {
      loadArchiveData();
    }
  }, [view]);

  // Function to reset and reload archive
  const resetArchive = () => {
    setArchiveWords([]);
    setArchiveOffset(0);
    setHasMoreWords(true);
    loadArchiveData();
  };

  const loadWordByWordId = async (wordId) => {
    setLoading(true);

    try {
      // Fetch from Supabase by word_id
      const { data: wordData, error } = await supabase
        .from('word_of_the_day')
        .select('*')
        .eq('word_id', wordId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading WOTD by word_id:', error);
        setLoading(false);
        return;
      }

      // If word found, navigate to its date
      if (wordData && wordData.date) {
        const targetDate = wordData.date;
        setCurrentDate(targetDate);
        setWordData(wordData);
        updateProgress(targetDate);
        
        // Check if next day has a word
        checkNextDayExists(targetDate);
        
        // Update URL to include the date
        const params = new URLSearchParams(window.location.search);
        params.set('date', targetDate);
        params.set('word', wordId); // Keep word param for reference
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        
        setLoading(false);
        return;
      }

      // If no word found, fall back to today
      console.log('No word found for word_id', wordId, '- using today');
      const today = getTodayLocal();
      setCurrentDate(today);
      loadWordData(today);

    } catch (err) {
      console.error('Unexpected error loading WOTD by word_id:', err);
      const today = getTodayLocal();
      setCurrentDate(today);
      loadWordData(today);
    }
  };

  const loadWordData = async (date) => {
    setLoading(true);

    try {
      // Fetch from Supabase
      const { data: wordData, error } = await supabase
        .from('word_of_the_day')
        .select('*')
        .eq('date', date)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading WOTD:', error);
        setLoading(false);
        return;
      }

      // If no word found for this date, use mock data as fallback
      if (!wordData) {
        console.log('No word found for', date, '- using mock data');
        loadMockData(date);
        // Check if next day has a word
        checkNextDayExists(date);
        return;
      }

      setWordData(wordData);
      updateProgress(date);
      
      // Check if next day has a word
      checkNextDayExists(date);
      
      setLoading(false);

    } catch (err) {
      console.error('Unexpected error loading WOTD:', err);
      loadMockData(date);
      checkNextDayExists(date);
    }
  };

  const checkNextDayExists = async (date) => {
    try {
      // Calculate next day
      const [year, month, day] = date.split('-').map(Number);
      const nextDate = new Date(year, month - 1, day);
      nextDate.setDate(nextDate.getDate() + 1);
      const nextDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;

      // Check if word exists for next day
      const { data, error } = await supabase
        .from('word_of_the_day')
        .select('id')
        .eq('date', nextDateStr)
        .maybeSingle();

      // Set hasNextDay based on whether a word exists (ignore errors, assume no word exists)
      setHasNextDay(!error && !!data);
    } catch (err) {
      // If check fails, assume no next day exists
      setHasNextDay(false);
    }
  };

  const loadMockData = (date) => {
    // Fallback mock data
    const mockData = {
      id: 'aller-fr',
      date: date,
      word: 'aller',
      phonetic: 'a.le',
      part_of_speech: 'verb',
      difficulty_level: 'A1',
      difficulty_label: 'A1-C2 · Essential',
      translation: 'to go',
      frequency_rank: '#8',
      frequency_note: '8th most common word in French',
      definition: 'To move from one place to another; to proceed in a particular direction',
      definitions: [
        { sense: '1', text: 'To move or travel to a place', register: 'universal', example: 'Je vais à Paris' },
        { sense: '2', text: 'To express state of health or well-being', register: 'common', example: 'Comment allez-vous ?' },
        { sense: '3', text: 'To form the immediate future (auxiliary)', register: 'grammatical', example: 'Je vais partir' }
      ],
      etymology: {
        origin: 'Latin ambulāre',
        period: '9th century',
        evolution: 'From Latin "ambulāre" (to walk) → Vulgar Latin "*alāre" → Old French "aler" → Modern French "aller"',
        note: 'Highly irregular due to multiple Latin roots preserved in conjugation'
      },
      grammar: [
        'Irregular verb · Three stems: all-, v-, ir-',
        'Auxiliary: être (in compound tenses)',
        'Forms futur proche: aller + infinitive'
      ],
      collocations: [
        'aller à pied (walk)',
        'aller en voiture (drive)',
        'aller voir (go see)',
        'aller chercher (fetch)',
        'aller de soi (go without saying)'
      ],
      correct_answer: 'to go',
      wrong_options: ['to have', 'to want', 'to make'],
      examples: [
        {
          french: 'Je vais au cinéma ce soir.',
          english: "I'm going to the cinema tonight.",
          context: 'Movement · A1',
          note: 'Basic directional usage'
        },
        {
          french: 'Comment allez-vous ?',
          english: 'How are you?',
          context: 'Well-being · A1',
          note: 'Formal register'
        },
        {
          french: 'Nous allons partir demain.',
          english: "We're going to leave tomorrow.",
          context: 'Near future · A2',
          note: 'Futur proche construction'
        },
        {
          french: 'Ça va bien, merci.',
          english: "It's going well, thanks.",
          context: 'Expression · A1',
          note: 'Most common greeting response'
        },
        {
          french: 'Cette robe vous va parfaitement.',
          english: 'This dress suits you perfectly.',
          context: 'Fit/suitability · B1',
          note: 'Extended meaning'
        }
      ],
      idioms: [
        {
          expression: 'Allez-y !',
          meaning: 'Go ahead! Help yourself!',
          level: 'A2'
        },
        {
          expression: 'Allons-y !',
          meaning: 'Let\'s go! Come on!',
          level: 'A2'
        },
        {
          expression: 'Aller droit au but',
          meaning: 'Get straight to the point',
          level: 'B1'
        },
        {
          expression: 'Ça va de soi',
          meaning: 'That goes without saying',
          level: 'B2'
        }
      ],
      related_words: [
        { word: 'venir', translation: 'to come', relationship: 'antonym' },
        { word: 'partir', translation: 'to leave', relationship: 'motion' },
        { word: 'arriver', translation: 'to arrive', relationship: 'motion' }
      ],
      usage_notes: 'Essential high-frequency verb ranked 8th in all French text. Appears in the top 100 most common words across spoken and written French. Critical for expressing movement, well-being, and future actions. Highly irregular conjugation requires dedicated study at all proficiency levels.'
    };

    setWordData(mockData);
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
    // Parse date parts to avoid timezone issues
    const [year, month, day] = currentDate.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    date.setDate(date.getDate() + direction);
    
    // Format as YYYY-MM-DD using local timezone
    const newDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // Don't allow navigation before start date
    if (newDate < WOTD_START_DATE) {
      return;
    }
    
    // Block forward navigation only if next day doesn't have a word
    if (direction > 0 && !hasNextDay) {
      return;
    }
    
    setCurrentDate(newDate);
    setUserAnswer(null); // Clear answer when navigating to different day
    setShowFeedback(true); // Reset feedback visibility
    loadWordData(newDate);

    // Update URL - clear answer-related params when navigating to different day
    const params = new URLSearchParams(window.location.search);
    params.set('date', newDate);
    params.delete('answer');
    params.delete('correct');
    params.delete('word');
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleShare = (platform) => {
    const url = `https://languageacademy.io?wotd=true&date=${currentDate}`;
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
    if (!userAnswer || !wordData) return null;

    const isDontKnow = userAnswer === 'X';

    // Get the correct answer key from sessionStorage
    const correctKey = sessionStorage.getItem(`wotd_correct_${currentDate}`);
    console.log('Validating - User answer:', userAnswer, 'Correct key:', correctKey);

    const isCorrect = correctKey ? (userAnswer === correctKey) : false;

    console.log('Is correct?', isCorrect);

    return {
      isCorrect,
      isDontKnow,
      message: isDontKnow ? "Here's the answer" : (isCorrect ? "Excellent!" : "You're learning!"),
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

  const loadArchiveData = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setArchiveLoading(true);
      setArchiveOffset(0);
      setHasMoreWords(true);
    }
    
    const WORDS_PER_PAGE = 20;
    const offset = isLoadMore ? archiveOffset : 0;
    
    try {
      // Fetch WOTD entries with pagination
      const today = getTodayLocal();
      const { data: words, error } = await supabase
        .from('word_of_the_day')
        .select('date, word, translation, part_of_speech, difficulty_level')
        .gte('date', WOTD_START_DATE)
        .lte('date', today)
        .order('date', { ascending: false })
        .range(offset, offset + WORDS_PER_PAGE - 1);

      if (error) {
        console.error('Error loading archive:', error);
        if (isLoadMore) {
          setLoadingMore(false);
        } else {
          setArchiveLoading(false);
        }
        return;
      }

      // Format the data for the archive view
      const formattedWords = words.map(word => {
        const date = new Date(word.date);
        return {
          date: word.date,
          monthDay: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          year: date.getFullYear(),
          word: word.word,
          translation: word.translation,
          type: word.part_of_speech,
          level: word.difficulty_level
        };
      });

      // Check if there are more words to load
      const hasMore = words.length === WORDS_PER_PAGE;
      setHasMoreWords(hasMore);

      if (isLoadMore) {
        // Append to existing words
        setArchiveWords(prev => [...prev, ...formattedWords]);
        setArchiveOffset(offset + WORDS_PER_PAGE);
        setLoadingMore(false);
      } else {
        // Replace words (initial load)
        setArchiveWords(formattedWords);
        setArchiveOffset(WORDS_PER_PAGE);
        setArchiveLoading(false);
      }
    } catch (err) {
      console.error('Unexpected error loading archive:', err);
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setArchiveLoading(false);
      }
    }
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
      {/* Navigation Header - World-class */}
      <header className="wotd-nav-header">
        <div className="wotd-nav-container">
          <div className="wotd-nav-left">
            <button
              className="wotd-nav-link"
              onClick={() => setView(view === 'archive' ? 'single' : 'archive')}
            >
              {view === 'archive' ? (
                <><span className="wotd-nav-arrow">←</span> Today's Word</>
              ) : (
                'Archive'
              )}
            </button>
          </div>
          <div className="wotd-nav-center">
            <button 
              className="wotd-logo-btn"
              onClick={() => window.location.href = '/'}
              title="Go to Language Academy home"
            >
              <img src="/img/logov2.png" alt="Language Academy" className="wotd-logo-small" />
              <div className="wotd-nav-title-group">
                <span className="wotd-nav-title">Language Academy</span>
                <span className="wotd-nav-subtitle">Word of the Day</span>
              </div>
            </button>
          </div>
          <div className="wotd-nav-right">
            {user ? (
              <>
                <button
                  className="wotd-modules-btn"
                  onClick={() => window.location.href = '/'}
                >
                  Modules
                </button>
                <div className="wotd-user-avatar">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                    showName={false}
                    fallbackRedirectUrl="/"
                  >
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="Email Preferences"
                        labelIcon={<Mail size={16} />}
                        onClick={() => setShowNotificationSettings(true)}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </>
            ) : (
              <>
                <button className="wotd-signin-btn" onClick={() => openSignIn()}>
                  Sign In
                </button>
                <button className="wotd-signup-btn" onClick={() => openSignUp()}>
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {view === 'single' ? (
        <div className="wotd-single-view">
          {/* Date Navigation */}
          <div className="wotd-date-nav">
            <div className="wotd-container">
              <div className="wotd-date-controls">
                <button
                  className="wotd-day-nav-btn wotd-day-prev"
                  onClick={() => navigateDay(-1)}
                  disabled={currentDate <= WOTD_START_DATE}
                  aria-label="Previous day"
                >
                  <svg className="wotd-nav-arrow-mobile" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span className="wotd-nav-text">← Previous Day</span>
                </button>
                <div className="wotd-current-date">{formatDate(currentDate)}</div>
                <button
                  className="wotd-day-nav-btn wotd-day-next"
                  onClick={() => navigateDay(1)}
                  disabled={!hasNextDay}
                  aria-label="Next day"
                >
                  <span className="wotd-nav-text">Next Day →</span>
                  <svg className="wotd-nav-arrow-mobile" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Answer Feedback - Celebration/Encouragement */}
          {feedback && showFeedback && (
            <div className={`wotd-feedback wotd-feedback-${feedback.className}`}>
              <div className="wotd-container">
                <button
                  className="wotd-feedback-dismiss"
                  onClick={() => {
                    setShowFeedback(false);
                    // Clean URL params
                    const params = new URLSearchParams(window.location.search);
                    params.delete('answer');
                    params.delete('correct');
                    const newUrl = params.toString() ?
                      `${window.location.pathname}?${params.toString()}` :
                      window.location.pathname;
                    window.history.replaceState({}, '', newUrl);
                  }}
                  aria-label="Dismiss feedback"
                >
                  ×
                </button>
                <div className="wotd-feedback-content">
                  <div className="wotd-feedback-visual">
                    <div className={`wotd-feedback-icon-large wotd-icon-${feedback.className}`}>
                      {feedback.isCorrect ? (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : feedback.isDontKnow ? (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      ) : (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="wotd-feedback-text">
                    <h2 className="wotd-feedback-title">
                      {feedback.isCorrect ? 'Excellent!' : feedback.isDontKnow ? 'No worries!' : 'You\'re learning!'}
                    </h2>
                    <p className="wotd-feedback-subtitle">
                      {feedback.isCorrect ? (
                        <>You got it right. Keep building that vocabulary!</>
                      ) : feedback.isDontKnow ? (
                        <>Learning happens one word at a time. Here's the answer:</>
                      ) : (
                        <>Every mistake is progress. Now you'll remember this word even better.</>
                      )}
                    </p>
                    {!user && streakCount > 0 && feedback.isCorrect && (
                      <div className="wotd-streak-badge">
                        <div className="wotd-streak-checks">
                          {Array.from({ length: streakCount }).map((_, i) => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ))}
                        </div>
                        <span className="wotd-streak-text">{streakCount} {streakCount === 1 ? 'day' : 'days'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Word Hero Section - Grouped with definition */}
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
                <div className="wotd-translation-main">{wordData.translation}</div>
                <div className="wotd-pos-badge">
                  <span className="wotd-badge-minimal">{wordData.part_of_speech}</span>
                </div>
              </div>

              {/* TIER 1: Detailed Definitions */}
              <div className="wotd-definition-card">
                {wordData.definitions && wordData.definitions.length > 0 ? (
                  <div className="wotd-definitions-list">
                    {wordData.definitions.map((def, idx) => (
                      <div key={idx} className="wotd-definition-item">
                        <span className="wotd-def-sense">{def.sense}.</span>
                        <span className="wotd-def-text">{def.text}</span>
                        <span className="wotd-def-example">"{def.example}"</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="wotd-definition-text">{wordData.definition}</p>
                )}
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
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

          {/* TIER 2: Examples - How to use it */}
          <section className="wotd-section">
            <div className="wotd-container">
              <h2 className="wotd-section-heading">Usage Examples</h2>
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

              {/* TIER 3: Deep Usage - Grammar, Collocations, Idioms */}
              {/* Grammar Notes */}
              {wordData.grammar && wordData.grammar.length > 0 && (
                <div className="wotd-grammar-card">
                  <h3 className="wotd-subsection-title">Grammar</h3>
                  <ul className="wotd-grammar-list">
                    {wordData.grammar.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Collocations */}
              {wordData.collocations && wordData.collocations.length > 0 && (
                <div className="wotd-collocations-section">
                  <h3 className="wotd-subsection-title">Common Combinations</h3>
                  <div className="wotd-collocations-list">
                    {wordData.collocations.map((collocation, idx) => (
                      <span key={idx} className="wotd-collocation-item">{collocation}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Idioms & Expressions */}
              {wordData.idioms && wordData.idioms.length > 0 && (
                <div className="wotd-idioms-section">
                  <h3 className="wotd-subsection-title">Idioms & Expressions</h3>
                  <div className="wotd-idioms-list">
                    {wordData.idioms.map((idiom, idx) => (
                      <div key={idx} className="wotd-idiom-item">
                        <div className="wotd-idiom-expression-row">
                          <span className="wotd-idiom-expression">{idiom.expression}</span>
                          <SpeakButton
                            text={idiom.expression}
                            language="fr-FR"
                            size="small"
                            className="wotd-idiom-speak"
                          />
                        </div>
                        <div className="wotd-idiom-meaning">→ {idiom.meaning}</div>
                        <span className="wotd-idiom-level">{idiom.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TIER 4: Reference Information - Metadata */}
              {/* Frequency & Level Info */}
              {(wordData.frequency_rank || wordData.difficulty_label) && (
                <div className="wotd-metadata-card">
                  <h3 className="wotd-subsection-title">Reference Information</h3>
                  <div className="wotd-metadata-list">
                    {wordData.difficulty_label && (
                      <div className="wotd-metadata-item">
                        <span className="wotd-metadata-label">CEFR Level:</span>
                        <span className="wotd-metadata-value">{wordData.difficulty_label}</span>
                      </div>
                    )}
                    {wordData.frequency_rank && (
                      <div className="wotd-metadata-item">
                        <span className="wotd-metadata-label">Frequency:</span>
                        <span className="wotd-metadata-value">
                          <span className="wotd-freq-badge">{wordData.frequency_rank}</span>
                          {wordData.frequency_note}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Etymology */}
              {wordData.etymology && (
                <div className="wotd-etymology-card">
                  <h3 className="wotd-subsection-title">Etymology</h3>
                  <p className="wotd-etymology-text">
                    <strong>{wordData.etymology.origin}</strong> ({wordData.etymology.period})
                  </p>
                  <p className="wotd-etymology-evolution">{wordData.etymology.evolution}</p>
                  {wordData.etymology.note && (
                    <p className="wotd-etymology-note">{wordData.etymology.note}</p>
                  )}
                </div>
              )}

              {/* Usage Notes */}
              {wordData.usage_notes && (
                <div className="wotd-note-card">
                  <p>{wordData.usage_notes}</p>
                </div>
              )}

              {/* Related Words */}
              {wordData.related_words && wordData.related_words.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 className="wotd-subsection-title">Related Words</h3>
                  <div className="wotd-related-words">
                    {wordData.related_words.map((related, index) => (
                      <div key={index} className="wotd-related-item">
                        <span className="wotd-related-word">{related.word}</span>
                        <span className="wotd-related-translation">{related.translation}</span>
                        {related.relationship && (
                          <span className="wotd-related-type">({related.relationship})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Conversion CTA - After all content */}
          {!user && (
            <section className="wotd-cta-section">
              <div className="wotd-container">
                <div className="wotd-cta-card">
                  <h3>Want to learn more?</h3>
                  <p>Join 10,000+ learners mastering French with structured lessons</p>
                  <div className="wotd-cta-buttons">
                    <button className="wotd-cta-secondary" onClick={() => openSignIn()}>
                      Sign In
                    </button>
                    <button className="wotd-cta-primary" onClick={() => openSignUp()}>
                      Start Learning Free
                    </button>
                  </div>
                  <p className="wotd-cta-caption">Early access • No credit card required</p>
                </div>
              </div>
            </section>
          )}

          {/* Navigation Footer */}
          <section className="wotd-footer-nav">
            <div className="wotd-container">
              <div className="wotd-footer-controls">
                <button
                  className="wotd-footer-nav-btn wotd-footer-prev"
                  onClick={() => navigateDay(-1)}
                  disabled={currentDate <= WOTD_START_DATE}
                  aria-label="Previous word"
                >
                  <svg className="wotd-nav-arrow-mobile" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span className="wotd-nav-text">← Previous Word</span>
                </button>
                <button
                  className="wotd-footer-link"
                  onClick={() => setView('archive')}
                >
                  View All Words
                </button>
                <button
                  className="wotd-footer-nav-btn wotd-footer-next"
                  onClick={() => navigateDay(1)}
                  disabled={!hasNextDay}
                  aria-label="Next word"
                >
                  <span className="wotd-nav-text">Next Word →</span>
                  <svg className="wotd-nav-arrow-mobile" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </section>

        </div>
      ) : (
        <div className="wotd-archive-view">
          <div className="wotd-container">
            <h1 className="wotd-archive-title">Word Archive</h1>
            <p className="wotd-archive-subtitle">
              {archiveWords.length > 0 
                ? `${archiveWords.length} French ${archiveWords.length === 1 ? 'word' : 'words'} to master`
                : 'Building your French vocabulary'}
            </p>

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
              {archiveLoading ? (
                <div className="wotd-loading">Loading archive...</div>
              ) : archiveWords.length === 0 ? (
                <div className="wotd-archive-empty">
                  <p>No words available yet. Check back soon!</p>
                </div>
              ) : (
                archiveWords.map((item, index) => (
                <div
                  key={index}
                  className="wotd-archive-item"
                  onClick={() => {
                    setCurrentDate(item.date);
                    setUserAnswer(null); // Clear answer when navigating from archive
                    setShowFeedback(true); // Reset feedback visibility
                    setView('single');
                    loadWordData(item.date);
                    // Clear answer-related params when navigating from archive
                    const params = new URLSearchParams(window.location.search);
                    params.set('date', item.date);
                    params.delete('answer');
                    params.delete('correct');
                    params.delete('word');
                    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
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
                ))
              )}
            </div>

            {/* Load More */}
            {hasMoreWords && (
              <div className="wotd-archive-load-more">
                <button 
                  className="wotd-load-more-btn"
                  onClick={() => loadArchiveData(true)}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More Words'}
                </button>
              </div>
            )}

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
                  <button className="wotd-email-submit" onClick={() => openSignUp()}>
                    Subscribe
                  </button>
                </div>
                <p className="wotd-email-disclaimer">No spam. Unsubscribe anytime.</p>
              </div>
            )}
          </div>
        </div>
      )}
      <NotificationSettings 
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
    </div>
  );
}

export default WOTDHub;

