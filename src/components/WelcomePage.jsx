import SpeakButton from './SpeakButton'
import '../styles/WelcomePage.css'

function WelcomePage({ onContinue }) {
  return (
    <div className="welcome-page">
      {/* Hero */}
      <section className="welcome-hero">
        <div className="welcome-container">
          <h2 className="app-logo" title="Back to landing page">🎓 Language Academy</h2>
          <h1 className="welcome-title">Welcome to French: Part I</h1>
          <p className="welcome-subtitle">
            A 1,000-year journey from Latin to the language of over 300 million speakers worldwide
          </p>
        </div>
      </section>

      {/* Iconic French Art */}
      <section className="welcome-art-section">
        <div className="welcome-container">
          <div className="art-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/La_Libert%C3%A9_guidant_le_peuple_-_Eug%C3%A8ne_Delacroix_-_Mus%C3%A9e_du_Louvre_Peintures_RF_129_-_apr%C3%A8s_restauration_2024.jpg/960px-La_Libert%C3%A9_guidant_le_peuple_-_Eug%C3%A8ne_Delacroix_-_Mus%C3%A9e_du_Louvre_Peintures_RF_129_-_apr%C3%A8s_restauration_2024.jpg"
              alt="Liberty Leading the People by Eugène Delacroix"
              className="art-image"
            />
            <p className="art-caption">
              <a
                href="https://en.wikipedia.org/wiki/Liberty_Leading_the_People"
                target="_blank"
                rel="noopener noreferrer"
                className="art-link"
              >
                <em>La Liberté guidant le peuple</em>
              </a>{' '}
              (Liberty Leading the People) by Eugène Delacroix, 1830 —
              One of France's most celebrated paintings, commemorating the July Revolution.
              Now housed in the Louvre Museum, Paris.
            </p>
          </div>
        </div>
      </section>

      {/* The Language */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2 className="welcome-section-title">The Story of French</h2>

          <div className="welcome-facts">
            <div className="welcome-fact-item with-image">
              <div className="fact-label">Origins</div>
              <div className="fact-content-with-image">
                <div className="fact-text">
                  French has its roots in Vulgar Latin, and evolved around 1100 years ago in what is modern-day France.
                  As a <strong>Romance language</strong>, it shares ancestry with Spanish, Italian,
                  Portuguese, and Romanian—all descendants of the daily Latin spoken across the Roman Empire.
                </div>
                <div className="fact-image">
                  <a
                    href="https://en.wikipedia.org/wiki/History_of_French"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Square_House_Roman_Temple_at_Nimes%2C_France_%287179063926%29.jpg/2560px-Square_House_Roman_Temple_at_Nimes%2C_France_%287179063926%29.jpg"
                      alt="Maison Carrée, Roman Temple at Nîmes, France"
                      className="roman-temple-image"
                    />
                  </a>
                  <p className="image-caption">
                    <a
                      href="https://en.wikipedia.org/wiki/History_of_French"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="image-caption-link"
                    >
                      Roman heritage in France
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="welcome-fact-item with-map">
              <div className="fact-label">Official Status</div>
              <div className="fact-content-with-map">
                <div className="fact-text">
                  French is an official language in <strong>29 countries</strong> across five continents.
                  It's spoken in France, Canada, Belgium, Switzerland, and throughout West and Central Africa,
                  making it one of the world's most geographically widespread languages.
                </div>
                <div className="fact-map">
                  <a
                    href="https://en.wikipedia.org/wiki/French_language"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Map-Francophone_World.svg/580px-Map-Francophone_World.svg.png"
                      alt="Map of French-speaking regions worldwide"
                      className="map-image"
                    />
                  </a>
                  <p className="map-caption">
                    <a
                      href="https://en.wikipedia.org/wiki/French_language"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-caption-link"
                    >
                      French-speaking regions worldwide
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="welcome-fact-item">
              <div className="fact-label">Global Reach</div>
              <div className="fact-content">
                With over <strong>300 million speakers</strong> worldwide and
                growing rapidly in Africa, French is projected to be spoken by
                700 million people by 2050. It's the second most learned language
                globally and an official language of the UN, EU, and Olympics.
              </div>
            </div>

            <div className="welcome-fact-item with-image">
              <div className="fact-label">French has an official authority — L'Académie française</div>
              <div className="fact-content-with-image">
                <div className="fact-image">
                  <a
                    href="https://www.academie-francaise.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-link"
                  >
                    <img
                      src="https://www.academie-francaise.fr/sites/academie-francaise.fr/files/styles/af_slideshow/public/g_blot_rmn_04b_0.jpg?itok=FdYsLF-8"
                      alt="L'Académie française building"
                      className="academie-image"
                    />
                  </a>
                  <p className="image-caption">
                    <a
                      href="https://www.academie-francaise.fr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="image-caption-link"
                    >
                      L'Académie française
                    </a>
                  </p>
                </div>
                <div className="fact-text">
                  Founded in 1635 by Cardinal Richelieu (yes, from{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/The_Three_Musketeers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    <em>The Three Musketeers</em>
                  </a>
                  ), the French Academy is the official authority on the French language. Its 40 members (les immortels)
                  work to preserve the purity of French and publish the official dictionary—
                  a tradition spanning nearly 400 years.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How French Works */}
      <section className="welcome-section bg-subtle">
        <div className="welcome-container">
          <h2 className="welcome-section-title">What You Should Know</h2>

          <div className="welcome-linguistic-features">
            <div className="linguistic-feature">
              <h3>A Syllable-Timed Language</h3>
              <p>
                Unlike English, which is <em>stress-timed</em> (emphasizing certain syllables
                and rushing through others), French is <strong>syllable-timed</strong>.
                Every syllable gets roughly equal time and stress.
              </p>
              <div className="language-comparison">
                <div className="comparison-example">
                  <div className="lang-label">English (stress-timed)</div>
                  <div className="pronunciation">
                    <span className="phrase-with-audio">
                      "I'm GO-ing to the STORE to-DAY"
                      <SpeakButton text="I'm going to the store today" language="en-US" />
                    </span>
                    <br />
                    <span className="subtle">Strong beats on stressed syllables</span>
                  </div>
                </div>
                <div className="comparison-example">
                  <div className="lang-label">French (syllable-timed)</div>
                  <div className="pronunciation">
                    <span className="phrase-with-audio">
                      "je vais au ma-ga-sin au-jour-d'hui"
                      <SpeakButton text="je vais au magasin aujourd'hui" language="fr-FR" />
                    </span>
                    <br />
                    <span className="subtle">Each syllable evenly spaced, like a metronome</span>
                  </div>
                </div>
              </div>
              <p className="feature-note">
                This is why French sounds "musical" and "flowing" to English speakers—
                it has a steady, rhythmic quality rather than the irregular "bounce" of English.
              </p>
            </div>

            <div className="linguistic-feature">
              <h3>Liaison & Enchainement</h3>
              <p className="spacing-below">
                French syllables flow into each other. When a word <strong>ending in a consonant
                  meets a word starting with a vowel</strong>, they connect:{' '}
                <span className="inline-phrase-audio">
                  <em>les amis</em>
                  <SpeakButton text="les amis" language="fr-FR" />
                </span>{' '}
                sounds like "lay-za-mee," not "lay ah-mee." Conversely, the "s" remains silent when the rule is not met, such as in{' '}
                <span className="inline-phrase-audio">
                  <em>Les Misérables</em>
                  <SpeakButton text="Les Misérables" language="fr-FR" />
                </span>{' '}
                ("lay mis-er-ables").
                <br /><br />
                Basic rules like these preserve French's audible rhythm, and help create its characteristic smooth flow.&nbsp;
                <strong>Don't worry, it becomes second nature quite quickly!</strong>
              </p>
              <p className="feature-note">
                French speakers produce 7-8 syllables per second as opposed to English's 5-6 per second.
                This rapid-fire delivery creates a quick, fluid sound, and you should
                mentally prepare yourself to think in a steady, rhythmic pace as you learn to speak and read French.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How You'll Learn */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2 className="welcome-section-title">How This App Works</h2>
          <p className="welcome-intro">
            Language Academy is built on cognitive science research.
            Here's what makes the approach different:
          </p>

          <div className="pedagogy-grid">
            <div className="pedagogy-card">
              <div className="pedagogy-number">1</div>
              <h3>Chunking Through Composition</h3>
              <p>
                You learn discrete building blocks (pronouns, verbs, determiners)
                that fit comfortably in working memory. Then you systematically
                combine them—like functional programming—to create infinite expressions
                from finite pieces.
              </p>
              <div className="pedagogy-example">
                je + suis(être) → je suis → je suis un homme
              </div>
            </div>

            <div className="pedagogy-card">
              <div className="pedagogy-number">2</div>
              <h3>Frequency-First Vocabulary</h3>
              <p>
                The top 100 most common French words account for ~50% of all spoken French.
                As early as Unit 6, you'll know <strong>70% of these words</strong>, giving you
                real comprehension fast. No time wasted on rare vocabulary.
              </p>
            </div>

            <div className="pedagogy-card">
              <div className="pedagogy-number">3</div>
              <h3>Four-Phase Learning Cascade</h3>
              <p>
                Every lesson follows how memory actually works: <strong>Concept Introduction</strong>
                (schema formation) → <strong>Study Mode</strong> (active recall without pressure) →&nbsp;
                <strong>Practice</strong> (with scaffolding) → <strong>Exam</strong> (interleaved
                retrieval for durable memory).
              </p>
            </div>

            <div className="pedagogy-card">
              <div className="pedagogy-number">4</div>
              <h3>Immediate Utility</h3>
              <p>
                Module 4 teaches "ça va?"—you can have a basic conversation after
                30 minutes. Module 10: "je veux ça" (I want that). Every module
                builds toward practical competence, skipping emphasis on abstract grammar rules (you're learning how to speak, not teach it).
              </p>
            </div>

            <div className="pedagogy-card">
              <div className="pedagogy-number">5</div>
              <h3>Interleaved Retrieval</h3>
              <p>
                Exams randomize question types, forcing your brain to discriminate
                between options rather than pattern-match. This creates stronger,
                more durable learning—you remember forever, not just for the test.
              </p>
            </div>

            <div className="pedagogy-card">
              <div className="pedagogy-number">6</div>
              <h3>Cognitive Scaffolding</h3>
              <p>
                During practice, vocabulary references are always visible—you focus
                on <em>using</em> French, not memorizing it. The reference is
                training wheels you naturally stop needing as understanding develops.
              </p>
            </div>
          </div>

          <div className="research-note">
            <p>
              <strong>Grounded in research:</strong> This approach synthesizes findings
              from{' '}
              <a href="https://en.wikipedia.org/wiki/Cognitive_load" target="_blank" rel="noopener noreferrer" className="research-link">
                cognitive load theory
              </a>{' '}
              (Sweller),{' '}
              <a href="https://en.wikipedia.org/wiki/Testing_effect" target="_blank" rel="noopener noreferrer" className="research-link">
                testing effect
              </a>{' '}
              (Roediger),{' '}
              <a href="https://en.wikipedia.org/wiki/Desirable_difficulty" target="_blank" rel="noopener noreferrer" className="research-link">
                desirable difficulties
              </a>{' '}
              (Bjork),{' '}
              <a href="https://en.wikipedia.org/wiki/Interleaved_practice" target="_blank" rel="noopener noreferrer" className="research-link">
                interleaving
              </a>{' '}
              (Rohrer), and{' '}
              <a href="https://en.wikipedia.org/wiki/Chunking_(psychology)" target="_blank" rel="noopener noreferrer" className="research-link">
                chunking theory
              </a>{' '}
              (Miller).
              Over 70 years of learning science, applied.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="welcome-section bg-subtle">
        <div className="welcome-container">
          <h2 className="welcome-section-title">What to Expect from Language Academy</h2>

          <div className="expectations">
            <div className="expectation-item">
              <div className="expectation-icon">📖</div>
              <div className="expectation-content">
                <h3>Comprehension Before Production</h3>
                <p>
                  Unlike certain language learning apps, you'll understand far more than you can speak at first—this is natural
                  and intentional. Reading and listening comprehension develop first,
                  giving you a foundation for eventual speaking and writing.
                </p>
              </div>
            </div>

            <div className="expectation-item">
              <div className="expectation-icon">🧱</div>
              <div className="expectation-content">
                <h3>Structure Over Phrases</h3>
                <p>
                  Rather than memorizing "Where is the bathroom?", you'll learn
                  "où" (where), "est" (is), and how they compose. This gives you generative power—infinite expressions
                  instead of fixed phrases, and nouns you will learn to use in context.
                </p>
              </div>
            </div>

            <div className="expectation-item">
              <div className="expectation-icon">⚡</div>
              <div className="expectation-content">
                <h3>Fast Progress to Real Content</h3>
                <p>
                  By Unit 8, you'll be reading 400+ word passages simulating excerpts from French
                  literature and news articles. This isn't "practice French"—it's
                  real French that native speakers might read.
                </p>
              </div>
            </div>

            <div className="expectation-item">
              <div className="expectation-icon">🎯</div>
              <div className="expectation-content">
                <h3>Analytical, Not Casual</h3>
                <p>
                  There are no points, games, or cartoon characters. This is designed
                  for serious learners who want to understand French, not just play around. If you're analytical and systematic,
                  you'll love this approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="welcome-cta-section">
        <div className="welcome-container">
          <h3 className="app-logo" title="Back to landing page">🎓 Language Academy</h3>
          <br />
          <h2 className="welcome-cta-title">Ready to Begin?</h2>
          <p className="welcome-cta-subtitle">
            Start with Module 1 and experience the compositional approach to French.
          </p>
          <button className="welcome-cta-button" onClick={onContinue}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  )
}

export default WelcomePage

