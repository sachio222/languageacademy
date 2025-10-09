import { useState } from 'react'
import Reading11Preview from './Reading11Preview'
import ExercisePreview from './ExercisePreview'
import '../styles/Landing.css'

function LandingPage({ onGetStarted }) {
  const [email, setEmail] = useState('')

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
          <button className="cta-primary" onClick={onGetStarted}>
            Start Free Trial
          </button>
          <p className="hero-caption">
            Limited free access • No credit card required
          </p>
        </div>
      </section>

      {/* Your Goal - Reading 11 Preview (Show outcome first!) */}
      <section className="landing-section">
        <div className="landing-container">
          <Reading11Preview />
        </div>
      </section>

      {/* The Problem */}
      <section className="landing-section">
        <div className="landing-container">
          <h2 className="section-title">Language learning isn't a game</h2>
          <p className="section-intro">
            Most apps teach you to chase points and streaks. You memorize phrases
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
          <h2 className="section-title">Build understanding through composition</h2>
          <p className="section-intro">
            Start with simple building blocks. Combine them systematically.
            Create infinite expressions from finite pieces.
          </p>

          <div className="method-visual">
            <div className="method-step">
              <div className="method-number">1</div>
              <div className="method-content">
                <h3>Learn discrete chunks</h3>
                <div className="method-example">
                  Module 1: pronouns → je, tu, il, elle...
                </div>
              </div>
            </div>

            <div className="method-arrow">→</div>

            <div className="method-step">
              <div className="method-number">2</div>
              <div className="method-content">
                <h3>Learn operations</h3>
                <div className="method-example">
                  Module 2: être (to be) → suis, es, est...
                </div>
              </div>
            </div>

            <div className="method-arrow">→</div>

            <div className="method-step">
              <div className="method-number">3</div>
              <div className="method-content">
                <h3>Compose them</h3>
                <div className="method-example">
                  Module 3: je + suis → "je suis" (I am)
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
          <h2 className="section-title">Designed around how memory works</h2>
          <p className="section-intro">
            70+ years of cognitive science research, applied. Every lesson follows
            a 4-phase cascade optimized for long-term retention.
          </p>

          <div className="phases-list">
            <div className="phase-item">
              <div className="phase-icon">👁️</div>
              <div className="phase-content">
                <h3>Concept Introduction</h3>
                <p>
                  See the full pattern first. Schema formation before testing reduces
                  anxiety and enables encoding.
                </p>
              </div>
            </div>

            <div className="phase-item">
              <div className="phase-icon">📚</div>
              <div className="phase-content">
                <h3>Study Mode</h3>
                <p>
                  Active recall without pressure. Self-paced flashcards build confidence
                  and test the retrieval pathway.
                </p>
              </div>
            </div>

            <div className="phase-item">
              <div className="phase-icon">✍️</div>
              <div className="phase-content">
                <h3>Practice</h3>
                <p>
                  Apply with scaffolding. Reference table available so you focus on
                  composition, not lookup. Training wheels you naturally stop using.
                </p>
              </div>
            </div>

            <div className="phase-item">
              <div className="phase-icon">🎯</div>
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
      <section className="landing-section bg-subtle">
        <div className="landing-container">
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
                <div className="utility-module">Module 4</div>
                <div className="utility-phrase">"Ça va?"</div>
                <div className="utility-desc">How's it going?</div>
              </div>
              <div className="utility-card">
                <div className="utility-module">Module 10</div>
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
                  <li>Value cognitive science over gamification</li>
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
          <h2 className="cta-title">Start learning structurally</h2>
          <p className="cta-subtitle">
            Limited free access to experience the full method.
            See if the cognitive science approach works for you.
          </p>
          <button className="cta-primary large" onClick={onGetStarted}>
            Get Started Free
          </button>
          <p className="cta-note">
            No credit card required • Access first unit free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <p>Built with love • Inspired by cognitive science research</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

