import { useState, useEffect } from 'react'
import Reading11Preview from './Reading11Preview'
import ExercisePreview from './ExercisePreview'
// import Testimonials from './Testimonials'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'
import DataDeletionPage from './DataDeletionPage'
import TrophyIllustration from './absurd-illustrations/TrophyIllustration'
import BookTowerIllustration from './absurd-illustrations/BookTowerIllustration'
import NeuralNetworkIllustration from './absurd-illustrations/NeuralNetworkIllustration'
import CompoundGrowthIllustration from './absurd-illustrations/CompoundGrowthIllustration'
import PuzzleSolveIllustration from './absurd-illustrations/PuzzleSolveIllustration'
import '../styles/Landing.css'

function LandingPage({ onGetStarted, isAuthenticated, onBackToApp, onLogin }) {
  const [email, setEmail] = useState('')
  const [showPrivacy, setShowPrivacy] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('privacy') !== null;
  })
  const [showTerms, setShowTerms] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('terms') !== null;
  })
  const [showDataDeletion, setShowDataDeletion] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('data-deletion') !== null;
  })

  // Handle URL changes for privacy/terms/data-deletion modals
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      setShowPrivacy(urlParams.get('privacy') !== null);
      setShowTerms(urlParams.get('terms') !== null);
      setShowDataDeletion(urlParams.get('data-deletion') !== null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync modal state with URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('privacy') !== null && !showPrivacy) {
      setShowPrivacy(true);
    }
    if (urlParams.get('terms') !== null && !showTerms) {
      setShowTerms(true);
    }
    if (urlParams.get('data-deletion') !== null && !showDataDeletion) {
      setShowDataDeletion(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    onGetStarted()
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-background"></div>
        <div className="landing-container">
          <img src="/img/logov2.png" alt="Language Academy" className="landing-logo" />
          <div className="hero-badge">For serious learners</div>
          <h1 className="hero-title">
            Learn French through
            <br />
            functional composition
          </h1>
          <p className="hero-subtitle">
            No childish games. Not tourism focused. A cognitive science approach
            that teaches <strong>core competence</strong> for advanced comprehension—fast.
          </p>
          {isAuthenticated ? (
            <>
              <button className="cta-primary" onClick={onBackToApp}>
                Continue Learning
              </button>
              <p className="hero-caption">
                Welcome back! Ready to continue your French journey?
              </p>
            </>
          ) : (
            <>
              <div className="hero-cta-group">
                <button className="cta-secondary" onClick={onLogin}>
                  Sign In
                </button>
                <button className="cta-primary" onClick={onGetStarted}>
                  Start Free Trial
                </button>
              </div>
              <p className="hero-caption">
                Early access • No credit card required
              </p>
            </>
          )}
        </div>
      </section>

      {/* Testimonials and Ratings */}
      {/* <Testimonials /> */}

      {/* Your Goal - Reading 11 Preview (Show outcome first!) */}
      <section className="landing-section">
        <div className="landing-container">
          <Reading11Preview />
        </div>
      </section>

      {/* The Problem */}
      <section className="landing-section">
        <div className="landing-container">
          {/* Absurd illustration - Trophy */}
          <div className="section-illustration">
            <TrophyIllustration />
          </div>

          <h2 className="section-title">Language learning isn't a game</h2>
          <p className="section-intro">
            Many apps teach you to chase points and streaks. You memorize cheeky phrases
            without understanding structure. After months, you still can't hold a conversation.
          </p>

          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="comparison-label bad">Gamified Apps</div>
              <ul className="comparison-list">
                <li>Test before exposure (anxiety-inducing)</li>
                <li>Random vocabulary order</li>
                <li>Phrase memorization without structure</li>
                <li>Dopamine from points, not competence</li>
                <li>Forget everything the next day</li>
              </ul>
            </div>

            <div className="comparison-card">
              <div className="comparison-label good">Language Academy</div>
              <ul className="comparison-list">
                <li>Schema formation before testing</li>
                <li>Frequency-first (top 100 words priority)</li>
                <li>Systematic composition of building blocks</li>
                <li>Understanding through structure</li>
                <li>Durable, interleaved retention</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Preview - Show composition in action */}
      <section className="landing-section">
        <div className="landing-container">
          <ExercisePreview />
        </div>
      </section>

      {/* The Method */}
      <section className="landing-section bg-subtle">
        <div className="landing-container">
          {/* Absurd illustration - Book Tower */}
          <div className="section-illustration">
            <BookTowerIllustration />
          </div>

          <h2 className="section-title">Build understanding through composition</h2>
          <p className="section-intro">
            Start with simple building blocks. Combine them systematically.
            Create infinite expressions from finite pieces.
          </p>

          <div className="method-visual">
            <div className="method-step">
              <div className="method-number method-number-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08" />
                  <text x="160" y="50" fontSize="32" fontWeight="700" fill="#1a1a1a" opacity="0.6">1</text>
                  <rect x="60" y="70" width="25" height="35" rx="4" fill="#3b82f6" opacity="0.3" />
                  <rect x="90" y="75" width="25" height="30" rx="4" fill="#3b82f6" opacity="0.4" />
                  <rect x="120" y="80" width="25" height="25" rx="4" fill="#3b82f6" opacity="0.5" />
                  <circle cx="72" cy="60" r="3" fill="#3b82f6" opacity="0.5" />
                  <circle cx="102" cy="65" r="3" fill="#3b82f6" opacity="0.6" />
                  <circle cx="132" cy="70" r="3" fill="#3b82f6" opacity="0.7" />
                  <path d="M50 115 Q75 105 100 115 Q125 125 150 115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                  <rect x="65" y="125" width="70" height="3" rx="1.5" fill="#3b82f6" opacity="0.2" />
                </svg>
              </div>
              <div className="method-content">
                <h3>Learn discrete chunks</h3>
                <div className="method-example">
                  pronouns → je, tu, il, elle...
                </div>
              </div>
            </div>

            <div className="method-arrow">→</div>

            <div className="method-step">
              <div className="method-number method-number-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08" />
                  <text x="160" y="50" fontSize="32" fontWeight="700" fill="#1a1a1a" opacity="0.6">2</text>
                  <circle cx="100" cy="100" r="45" stroke="#3b82f6" strokeWidth="2.5" opacity="0.3" />
                  <circle cx="100" cy="100" r="30" fill="#3b82f6" opacity="0.15" />
                  <path d="M85 95 Q92 85 100 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M115 95 Q108 85 100 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <circle cx="100" cy="100" r="12" fill="#3b82f6" />
                  <path d="M94 98 L97 102 L106 90" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="70" cy="70" r="4" fill="#3b82f6" opacity="0.4" />
                  <circle cx="130" cy="130" r="4" fill="#3b82f6" opacity="0.4" />
                  <path d="M90 130 Q100 135 110 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                </svg>
              </div>
              <div className="method-content">
                <h3>Learn operations</h3>
                <div className="method-example">
                  être (to be) → suis, es, est...
                </div>
              </div>
            </div>

            <div className="method-arrow">→</div>

            <div className="method-step">
              <div className="method-number method-number-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08" />
                  <text x="160" y="50" fontSize="32" fontWeight="700" fill="#1a1a1a" opacity="0.6">3</text>
                  <rect x="50" y="80" width="35" height="40" rx="6" fill="#3b82f6" opacity="0.2" transform="rotate(-8 67.5 100)" />
                  <rect x="115" y="80" width="35" height="40" rx="6" fill="#3b82f6" opacity="0.2" transform="rotate(8 132.5 100)" />
                  <path d="M87 100 L113 100" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="8" fill="#3b82f6" />
                  <circle cx="100" cy="100" r="3" fill="#fff" />
                  <path d="M67 75 Q75 65 83 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
                  <path d="M117 75 Q125 65 133 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
                  <circle cx="100" cy="140" r="5" fill="#3b82f6" opacity="0.3" />
                  <path d="M75 130 Q100 125 125 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.25" />
                  <rect x="85" y="145" width="30" height="3" rx="1.5" fill="#3b82f6" opacity="0.2" />
                </svg>
              </div>
              <div className="method-content">
                <h3>Compose them</h3>
                <div className="method-example">
                  je + suis → "je suis" (I am)
                </div>
              </div>
            </div>
          </div>

          <p className="method-caption">
            Each module is self-contained. Master one, combine it with others,
            build infinite combinations from finite pieces.
          </p>
        </div>
      </section>

      {/* 4-Phase Learning */}
      <section className="landing-section">
        <div className="landing-container">
          {/* Absurd illustration - Neural Network */}
          <div className="section-illustration">
            <NeuralNetworkIllustration />
          </div>

          <h2 className="section-title">Designed around how memory works</h2>
          <p className="section-intro">
            70+ years of cognitive science research, applied. Every lesson follows
            a 4-phase cascade optimized for long-term retention.
          </p>

          <div className="phases-list">
            <div className="phase-item">
              <div className="phase-icon phase-icon-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" fill="#3b82f6" opacity="0.1" />
                  <circle cx="100" cy="100" r="45" fill="#3b82f6" opacity="0.15" />
                  <path d="M100 45 L100 85" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="15" fill="#3b82f6" />
                  <circle cx="100" cy="100" r="8" fill="#fff" />
                  <path d="M60 75 Q80 65 100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M140 75 Q120 65 100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <ellipse cx="80" cy="90" rx="5" ry="8" fill="#3b82f6" opacity="0.3" />
                  <ellipse cx="120" cy="90" rx="5" ry="8" fill="#3b82f6" opacity="0.3" />
                </svg>
              </div>
              <div className="phase-content">
                <h3>Concept Introduction</h3>
                <p>
                  See the full pattern first. Schema formation before testing reduces
                  anxiety and enables encoding.
                </p>
              </div>
            </div>

            <div className="phase-item">
              <div className="phase-icon phase-icon-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <rect x="45" y="40" width="110" height="130" rx="8" fill="#3b82f6" opacity="0.1" />
                  <rect x="55" y="50" width="90" height="110" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="70" y1="75" x2="130" y2="75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  <line x1="70" y1="95" x2="125" y2="95" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  <line x1="70" y1="115" x2="120" y2="115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  <circle cx="75" cy="135" r="3" fill="#3b82f6" />
                  <circle cx="90" cy="135" r="3" fill="#3b82f6" />
                  <circle cx="105" cy="135" r="3" fill="#3b82f6" />
                  <path d="M55 60 Q100 45 145 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                  <rect x="50" y="155" width="100" height="8" rx="2" fill="#3b82f6" opacity="0.2" />
                </svg>
              </div>
              <div className="phase-content">
                <h3>Study Mode</h3>
                <p>
                  Active recall without pressure. Self-paced flashcards build confidence
                  and test the retrieval pathway.
                </p>
              </div>
            </div>

            <div className="phase-item">
              <div className="phase-icon phase-icon-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <rect x="40" y="130" width="120" height="50" rx="6" fill="#3b82f6" opacity="0.1" />
                  <path d="M60 140 L80 120 L140 60" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="140" cy="60" r="8" fill="#3b82f6" />
                  <circle cx="140" cy="60" r="3" fill="#fff" />
                  <path d="M50 150 L70 130 L130 70" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
                  <rect x="50" y="140" width="90" height="30" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                  <line x1="65" y1="155" x2="110" y2="155" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  <circle cx="120" cy="155" r="4" fill="#3b82f6" opacity="0.5" />
                  <path d="M145 75 Q155 65 165 75 Q155 85 145 75" fill="#3b82f6" opacity="0.15" />
                </svg>
              </div>
              <div className="phase-content">
                <h3>Practice</h3>
                <p>
                  Apply with scaffolding. Reference table available so you focus on
                  composition, not lookup. Training wheels you naturally stop using.
                </p>
              </div>
            </div>

            <div className="phase-item">
              <div className="phase-icon phase-icon-absurd">
                <svg viewBox="0 0 200 200" fill="none">
                  <path d="M100 30 L115 70 L160 70 L120 100 L135 145 L100 120 L65 145 L80 100 L40 70 L85 70 Z" fill="#3b82f6" opacity="0.15" />
                  <circle cx="100" cy="100" r="35" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                  <path d="M100 55 L100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M100 125 L100 145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M145 100 L125 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M75 100 L55 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="12" fill="#3b82f6" />
                  <path d="M95 98 L98 102 L106 92" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="100" cy="45" r="4" fill="#3b82f6" opacity="0.4" />
                  <circle cx="100" cy="155" r="4" fill="#3b82f6" opacity="0.4" />
                  <circle cx="155" cy="100" r="4" fill="#3b82f6" opacity="0.4" />
                  <circle cx="45" cy="100" r="4" fill="#3b82f6" opacity="0.4" />
                </svg>
              </div>
              <div className="phase-content">
                <h3>Exam</h3>
                <p>
                  Interleaved, randomized retrieval. Forces discrimination, builds
                  durable memory. 80% to pass ensures competence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results / Stats */}
      <section className="landing-section bg-subtle-alt">
        <div className="landing-container">
          {/* Absurd illustration - Compound Growth */}
          <div className="section-illustration">
            <CompoundGrowthIllustration />
          </div>

          <h2 className="section-title">Fast path to comprehension</h2>
          <p className="section-intro">
            Frequency-first approach means you learn the words that matter most,
            in the order that maximizes real-world utility.
          </p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">72%</div>
              <div className="stat-label">of top 100 French words</div>
              <div className="stat-caption">by Unit 6</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">~50%</div>
              <div className="stat-label">real conversation comprehension</div>
              <div className="stat-caption">after 71 modules</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">400+</div>
              <div className="stat-label">word passages</div>
              <div className="stat-caption">like Reading 11 below</div>
            </div>
          </div>

          <div className="utility-examples">
            <h3>Immediate utility that compounds</h3>
            <div className="utility-grid">
              <div className="utility-card">
                <div className="utility-module">Basic</div>
                <div className="utility-phrase">"Ça va?"</div>
                <div className="utility-desc">How's it going?</div>
              </div>
              <div className="utility-card">
                <div className="utility-module">Advanced</div>
                <div className="utility-phrase">"Je veux ça"</div>
                <div className="utility-desc">I want that</div>
              </div>
              <div className="utility-card">
                <div className="utility-module">Advanced</div>
                <div className="utility-phrase">"C'est pour ça que..."</div>
                <div className="utility-desc">That's why... (causal reasoning)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="landing-section bg-subtle">
        <div className="landing-container">
          {/* Absurd illustration - Puzzle Solve */}
          <div className="section-illustration">
            <PuzzleSolveIllustration />
          </div>

          <h2 className="section-title">Built for analytical learners</h2>

          <div className="audience-layout">
            <div className="audience-image-container">
              <img
                src="https://images.unsplash.com/photo-1714974528757-f63c72154a1b?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Focused learner studying"
                className="audience-image"
              />
            </div>

            <div className="audience-content">
              <div className="audience-col">
                <h3>You'll love this if you:</h3>
                <ul className="audience-list">
                  <li>Want to understand structure, not just memorize</li>
                  <li>Prefer comprehension before production</li>
                  <li>Learn best through patterns and building blocks</li>
                  <li>Think systematically (technical minds love this)</li>
                  <li>Are serious about functional fluency</li>
                </ul>
              </div>

              <div className="audience-col">
                <h3>This isn't for you if you:</h3>
                <ul className="audience-list muted">
                  <li>Want a casual, game-like experience</li>
                  <li>Prefer random discovery over structured learning</li>
                  <li>Need constant external motivation (streaks, points)</li>
                  <li>Want to "just memorize phrases"</li>
                  <li>Expect instant fluency without understanding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-cta-section">
        <div className="landing-container">
          <img src="/img/logov2.png" alt="Language Academy" className="cta-logo" />
          <h2 className="cta-title">Start learning structurally</h2>
          <p className="cta-subtitle">
            Get early access to experience the full method.
            See if the cognitive science approach works for you.
          </p>
          {isAuthenticated ? (
            <>
              <button className="cta-primary large" onClick={onBackToApp}>
                Back to Learning
              </button>
              <p className="cta-note">
                Continue where you left off
              </p>
            </>
          ) : (
            <>
              <div className="hero-cta-group">
                <button className="cta-secondary" onClick={onLogin}>
                  Sign In
                </button>
                <button className="cta-primary large" onClick={onGetStarted}>
                  Start Free Trial
                </button>
              </div>
              <p className="cta-note">
                No credit card required • Early access available
              </p>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          {/* Social Links */}
          <div className="footer-social">
            <a
              href="https://www.instagram.com/languageacademyio/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Follow us on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link-hidden"
              title="Follow us on X (Twitter)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.pinterest.com/languageacademyio/french-word-of-the-day/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Follow our French Word of the Day on Pinterest"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link-hidden"
              title="Follow us on TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link-hidden"
              title="Subscribe to our YouTube channel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link-hidden"
              title="Join us on Reddit"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
            </a>
          </div>

          <p>
            Built with love • Inspired by cognitive science research
          </p>
          <div className="footer-links">
            <a
              href="?privacy"
              onClick={(e) => {
                e.preventDefault();
                setShowPrivacy(true);
                const url = new URL(window.location);
                url.searchParams.set('privacy', '');
                window.history.pushState({}, '', url);
              }}
              className="footer-link"
            >
              Privacy
            </a>
            <span className="footer-separator">•</span>
            <a
              href="?terms"
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
                const url = new URL(window.location);
                url.searchParams.set('terms', '');
                window.history.pushState({}, '', url);
              }}
              className="footer-link"
            >
              Terms
            </a>
            <span className="footer-separator">•</span>
            <a href="mailto:support@languageacademy.io?subject=Contact%20from%20Language%20Academy" className="footer-link">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {showPrivacy && (
        <PrivacyPolicy
          onClose={() => {
            setShowPrivacy(false);
            // Remove privacy query parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('privacy');
            const newUrl = new URL(window.location);
            newUrl.search = urlParams.toString();
            window.history.replaceState({}, '', newUrl);
          }}
        />
      )}
      {showTerms && (
        <TermsOfService
          onClose={() => {
            setShowTerms(false);
            // Remove terms query parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('terms');
            const newUrl = new URL(window.location);
            newUrl.search = urlParams.toString();
            window.history.replaceState({}, '', newUrl);
          }}
        />
      )}
      {showDataDeletion && (
        <DataDeletionPage
          onClose={() => {
            setShowDataDeletion(false);
            // Remove data-deletion query parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('data-deletion');
            const newUrl = new URL(window.location);
            newUrl.search = urlParams.toString();
            window.history.replaceState({}, '', newUrl);
          }}
        />
      )}
    </div>
  )
}

export default LandingPage

