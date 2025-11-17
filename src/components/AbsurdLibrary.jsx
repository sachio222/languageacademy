import '../styles/AbsurdLibrary.css';

function AbsurdLibrary() {
  return (
    <div className="absurd-library">
      {/* Header */}
      <header className="absurd-header">
        <div className="absurd-container">
          <button 
            className="absurd-back-btn"
            onClick={() => window.location.href = '/'}
          >
            ← Back to App
          </button>
          <h1 className="absurd-title">Absurd Illustration Library</h1>
          <p className="absurd-subtitle">
            Custom Absurd Design-inspired illustrations for Language Academy
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="absurd-main">
        <div className="absurd-container">
          
          {/* Section: Fast Path to Comprehension */}
          <section className="absurd-section">
            <h2 className="absurd-section-title">Fast Path to Comprehension</h2>
            <p className="absurd-section-intro">Illustrations representing speed, progress, and rapid learning</p>
            
            <div className="absurd-grid">
              
              {/* Book Tower */}
              <div className="absurd-card">
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
                    
                    {/* Stack of tilted books */}
                    <rect x="70" y="140" width="60" height="12" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(-3 100 146)"/>
                    <rect x="65" y="120" width="70" height="14" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(2 100 127)"/>
                    <rect x="60" y="95" width="80" height="16" rx="2" fill="#3b82f6" opacity="0.35" transform="rotate(-4 100 103)"/>
                    <rect x="70" y="65" width="60" height="18" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(3 100 74)"/>
                    
                    {/* Top book glowing */}
                    <rect x="75" y="40" width="50" height="15" rx="2" fill="#3b82f6" transform="rotate(-2 100 47.5)"/>
                    <circle cx="100" cy="47" r="30" fill="#3b82f6" opacity="0.12"/>
                    <circle cx="100" cy="47" r="20" fill="#3b82f6" opacity="0.15"/>
                    
                    {/* Floating bookmark */}
                    <rect x="95" y="20" width="3" height="25" rx="1" fill="#3b82f6" opacity="0.4"/>
                    <path d="M96.5 45 L94 50 L96.5 48 L99 50 Z" fill="#3b82f6" opacity="0.4"/>
                    
                    {/* Stars around tower */}
                    <path d="M140 50 L142 55 L147 57 L142 59 L140 64 L138 59 L133 57 L138 55 Z" fill="#3b82f6" opacity="0.2"/>
                    <path d="M55 75 L56 78 L59 79 L56 80 L55 83 L54 80 L51 79 L54 78 Z" fill="#3b82f6" opacity="0.15"/>
                    <path d="M150 95 L151 98 L154 99 L151 100 L150 103 L149 100 L146 99 L149 98 Z" fill="#3b82f6" opacity="0.12"/>
                    
                    {/* Page edges */}
                    <line x1="80" y1="48" x2="115" y2="46" stroke="#fff" strokeWidth="1.5" opacity="0.3"/>
                    
                    {/* Platform squiggle */}
                    <path d="M50 160 Q75 155 100 160 Q125 165 150 160" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Book Tower</h3>
                  <p className="absurd-card-desc">Progressive knowledge stacking</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Learning</span>
                    <span className="absurd-tag">Accumulation</span>
                  </div>
                </div>
              </div>

              {/* Brain Zap */}
              <div className="absurd-card">
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
                    <circle cx="100" cy="90" r="50" fill="#3b82f6" opacity="0.1"/>
                    
                    {/* Brain blob shape */}
                    <path d="M70 90 Q65 70 80 60 Q95 55 100 58 Q105 55 120 60 Q135 70 130 90 Q125 100 120 110 Q110 120 100 118 Q90 120 80 110 Q75 100 70 90" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5"/>
                    
                    {/* Brain squiggles/folds */}
                    <path d="M80 75 Q85 70 90 75 Q95 80 100 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35"/>
                    <path d="M100 80 Q105 75 110 80 Q115 85 120 80" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35"/>
                    <path d="M85 95 Q90 90 95 95" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3"/>
                    <path d="M105 95 Q110 90 115 95" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3"/>
                    
                    {/* Giant lightning bolt */}
                    <path d="M110 40 L90 90 L105 90 L80 140" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M110 40 L90 90 L105 90 L80 140" fill="#3b82f6" opacity="0.15"/>
                    
                    {/* Electric sparks at ends */}
                    <circle cx="110" cy="37" r="6" fill="#3b82f6" opacity="0.3"/>
                    <circle cx="80" cy="143" r="6" fill="#3b82f6" opacity="0.3"/>
                    <circle cx="110" cy="37" r="10" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15"/>
                    
                    {/* Energy radiating */}
                    <path d="M65 85 L48 78" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/>
                    <path d="M135 85 L152 78" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/>
                    <path d="M70 65 L58 52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2"/>
                    <path d="M130 65 L142 52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2"/>
                    
                    {/* Zap particles */}
                    <circle cx="45" cy="76" r="3" fill="#3b82f6" opacity="0.2"/>
                    <circle cx="155" cy="76" r="3" fill="#3b82f6" opacity="0.2"/>
                    
                    {/* Stars */}
                    <path d="M115 32 L117 37 L122 39 L117 41 L115 46 L113 41 L108 39 L113 37 Z" fill="#3b82f6" opacity="0.25"/>
                    <path d="M75 145 L77 150 L82 152 L77 154 L75 159 L73 154 L68 152 L73 150 Z" fill="#3b82f6" opacity="0.2"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Brain Zap</h3>
                  <p className="absurd-card-desc">Lightning-fast comprehension</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Speed</span>
                    <span className="absurd-tag">Insight</span>
                  </div>
                </div>
              </div>

              {/* Plant Growth */}
              <div className="absurd-card">
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
                    
                    {/* Ground/soil wavy */}
                    <ellipse cx="100" cy="160" rx="65" ry="18" fill="#3b82f6" opacity="0.15"/>
                    <path d="M35 160 Q67 155 100 160 Q133 165 165 160" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2"/>
                    
                    {/* Main stem - organic curve */}
                    <path d="M100 160 Q105 140 100 120 Q95 100 100 80 Q105 60 100 35" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none"/>
                    
                    {/* Leaves sprouting out */}
                    <ellipse cx="82" cy="135" rx="14" ry="20" fill="#3b82f6" opacity="0.3" transform="rotate(-40 82 135)"/>
                    <ellipse cx="118" cy="115" rx="16" ry="22" fill="#3b82f6" opacity="0.35" transform="rotate(35 118 115)"/>
                    <ellipse cx="78" cy="90" rx="18" ry="24" fill="#3b82f6" opacity="0.4" transform="rotate(-45 78 90)"/>
                    <ellipse cx="122" cy="70" rx="17" ry="23" fill="#3b82f6" opacity="0.4" transform="rotate(40 122 70)"/>
                    
                    {/* Flower bloom at top */}
                    <circle cx="100" cy="30" r="14" fill="#3b82f6" opacity="0.2"/>
                    <circle cx="88" cy="27" r="9" fill="#3b82f6" opacity="0.3"/>
                    <circle cx="112" cy="27" r="9" fill="#3b82f6" opacity="0.3"/>
                    <circle cx="93" cy="38" r="8" fill="#3b82f6" opacity="0.25"/>
                    <circle cx="107" cy="38" r="8" fill="#3b82f6" opacity="0.25"/>
                    <circle cx="100" cy="30" r="6" fill="#3b82f6"/>
                    <circle cx="100" cy="30" r="3" fill="#fff" opacity="0.5"/>
                    
                    {/* Leaf veins */}
                    <path d="M82 135 L76 128" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25"/>
                    <path d="M118 115 L122 108" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25"/>
                    
                    {/* Floating seeds */}
                    <circle cx="55" cy="55" r="2.5" fill="#3b82f6" opacity="0.2"/>
                    <circle cx="145" cy="90" r="2.5" fill="#3b82f6" opacity="0.15"/>
                    <circle cx="155" cy="50" r="2" fill="#3b82f6" opacity="0.18"/>
                    <path d="M58 52 Q61 49 64 52" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15"/>
                    
                    {/* Stars blooming */}
                    <path d="M80 18 L82 23 L87 25 L82 27 L80 32 L78 27 L73 25 L78 23 Z" fill="#3b82f6" opacity="0.22"/>
                    <path d="M120 18 L122 23 L127 25 L122 27 L120 32 L118 27 L113 25 L118 23 Z" fill="#3b82f6" opacity="0.22"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Plant Growth</h3>
                  <p className="absurd-card-desc">Organic development over time</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Natural</span>
                    <span className="absurd-tag">Progress</span>
                  </div>
                </div>
              </div>

              {/* Balancing Act */}
              <div className="absurd-card">
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
                    
                    {/* See-saw platform */}
                    <ellipse cx="100" cy="125" rx="80" ry="8" fill="#3b82f6" opacity="0.15" transform="rotate(8 100 125)"/>
                    <rect x="30" y="120" width="140" height="6" rx="3" fill="#3b82f6" opacity="0.3" transform="rotate(8 100 123)"/>
                    
                    {/* Central pivot */}
                    <path d="M95 125 L100 140 L105 125 Z" fill="#3b82f6"/>
                    <circle cx="100" cy="130" r="8" fill="#3b82f6" opacity="0.2"/>
                    
                    {/* Stacked blocks on left (low) */}
                    <rect x="40" y="95" width="18" height="18" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(-8 49 104)"/>
                    <rect x="42" y="75" width="15" height="15" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(-8 49.5 82.5)"/>
                    
                    {/* Massive stack on right (high) */}
                    <rect x="138" y="105" width="20" height="14" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(8 148 112)"/>
                    <rect x="140" y="88" width="18" height="13" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(8 149 94.5)"/>
                    <rect x="142" y="72" width="16" height="12" rx="2" fill="#3b82f6" opacity="0.35" transform="rotate(8 150 78)"/>
                    <rect x="143" y="57" width="14" height="11" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(8 150 62.5)"/>
                    <rect x="144" y="43" width="12" height="10" rx="2" fill="#3b82f6" transform="rotate(8 150 48)"/>
                    
                    {/* Glow around tall stack */}
                    <circle cx="150" cy="70" r="45" fill="#3b82f6" opacity="0.08"/>
                    
                    {/* Balance arrows */}
                    <path d="M55 75 L55 55" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/>
                    <path d="M50 60 L55 55 L60 60" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.25"/>
                    
                    <path d="M150 30 L150 10" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
                    <path d="M145 15 L150 10 L155 15" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3"/>
                    
                    {/* Stars at peak */}
                    <path d="M145 8 L147 13 L152 15 L147 17 L145 22 L143 17 L138 15 L143 13 Z" fill="#3b82f6" opacity="0.25"/>
                    <path d="M165 25 L166 28 L169 29 L166 30 L165 33 L164 30 L161 29 L164 28 Z" fill="#3b82f6" opacity="0.2"/>
                    
                    {/* Wobble lines */}
                    <path d="M85 140 Q95 135 105 140" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15"/>
                    
                    {/* Floating confetti */}
                    <circle cx="30" cy="55" r="2.5" fill="#3b82f6" opacity="0.15"/>
                    <circle cx="170" cy="90" r="2" fill="#3b82f6" opacity="0.12"/>
                    <rect x="25" y="90" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.12" transform="rotate(20 27.5 92.5)"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Balancing Act</h3>
                  <p className="absurd-card-desc">Efficiency through optimization</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Balance</span>
                    <span className="absurd-tag">Smart</span>
                  </div>
                </div>
              </div>

              {/* Workshop */}
              <div className="absurd-card">
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
                    
                    {/* Toolbox base */}
                    <rect x="60" y="110" width="80" height="50" rx="4" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5"/>
                    <rect x="60" y="110" width="80" height="15" rx="4" fill="#3b82f6" opacity="0.2"/>
                    
                    {/* Tools sticking out */}
                    {/* Wrench */}
                    <rect x="70" y="70" width="6" height="35" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(-15 73 87.5)"/>
                    <circle cx="70" cy="68" r="6" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.4"/>
                    <circle cx="70" cy="68" r="3" fill="#3b82f6" opacity="0.4"/>
                    
                    {/* Hammer */}
                    <rect x="95" y="65" width="5" height="40" rx="2" fill="#3b82f6" opacity="0.45" transform="rotate(5 97.5 85)"/>
                    <rect x="85" y="60" width="20" height="10" rx="2" fill="#3b82f6" opacity="0.45" transform="rotate(5 95 65)"/>
                    
                    {/* Screwdriver */}
                    <rect x="118" y="70" width="4" height="35" rx="2" fill="#3b82f6" opacity="0.5" transform="rotate(12 120 87.5)"/>
                    <path d="M116 67 L122 67 L120 62 Z" fill="#3b82f6" opacity="0.5"/>
                    
                    {/* Ruler sticking up */}
                    <rect x="128" y="55" width="8" height="45" rx="1.5" fill="#3b82f6" opacity="0.4" transform="rotate(-8 132 77.5)"/>
                    <line x1="130" y1="65" x2="135" y2="64" stroke="#fff" strokeWidth="1" opacity="0.3"/>
                    <line x1="130" y1="75" x2="135" y2="74" stroke="#fff" strokeWidth="1" opacity="0.3"/>
                    <line x1="130" y1="85" x2="135" y2="84" stroke="#fff" strokeWidth="1" opacity="0.3"/>
                    
                    {/* Floating screws/nails */}
                    <rect x="50" y="80" width="3" height="12" rx="1" fill="#3b82f6" opacity="0.3" transform="rotate(25 51.5 86)"/>
                    <rect x="145" y="85" width="3" height="10" rx="1" fill="#3b82f6" opacity="0.3" transform="rotate(-20 146.5 90)"/>
                    <circle cx="52" cy="76" r="3" fill="#3b82f6" opacity="0.25"/>
                    <circle cx="147" cy="82" r="3" fill="#3b82f6" opacity="0.25"/>
                    
                    {/* Floating nuts/bolts */}
                    <circle cx="40" cy="95" r="4" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2"/>
                    <circle cx="160" cy="100" r="4" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2"/>
                    
                    {/* Workshop sawdust/debris */}
                    <circle cx="75" cy="155" r="2" fill="#3b82f6" opacity="0.15"/>
                    <circle cx="90" cy="158" r="2.5" fill="#3b82f6" opacity="0.12"/>
                    <circle cx="110" cy="157" r="2" fill="#3b82f6" opacity="0.15"/>
                    <circle cx="125" cy="159" r="2.5" fill="#3b82f6" opacity="0.12"/>
                    
                    {/* Stars of creation */}
                    <path d="M100 40 L102 45 L107 47 L102 49 L100 54 L98 49 L93 47 L98 45 Z" fill="#3b82f6" opacity="0.25"/>
                    <path d="M45 60 L46 63 L49 64 L46 65 L45 68 L44 65 L41 64 L44 63 Z" fill="#3b82f6" opacity="0.15"/>
                    <path d="M155 65 L156 68 L159 69 L156 70 L155 73 L154 70 L151 69 L154 68 Z" fill="#3b82f6" opacity="0.15"/>
                    
                    {/* Wood shavings squiggles */}
                    <path d="M25 140 Q30 135 35 140" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.1"/>
                    <path d="M165 145 Q170 140 175 145" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.1"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Workshop Tools</h3>
                  <p className="absurd-card-desc">Building mastery through practice</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Craft</span>
                    <span className="absurd-tag">Hands-on</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section: 4-Phase Learning */}
          <section className="absurd-section">
            <h2 className="absurd-section-title">4-Phase Learning Cascade</h2>
            <p className="absurd-section-intro">Icons for the cognitive science-backed learning phases</p>
            
            <div className="absurd-grid">
              
              {/* Concept Introduction - Eye */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="90" fill="#3b82f6" opacity="0.1"/>
                    <circle cx="100" cy="100" r="45" fill="#3b82f6" opacity="0.15"/>
                    <path d="M100 45 L100 85" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="100" cy="100" r="15" fill="#3b82f6"/>
                    <circle cx="100" cy="100" r="8" fill="#fff"/>
                    <path d="M60 75 Q80 65 100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M140 75 Q120 65 100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <ellipse cx="80" cy="90" rx="5" ry="8" fill="#3b82f6" opacity="0.3"/>
                    <ellipse cx="120" cy="90" rx="5" ry="8" fill="#3b82f6" opacity="0.3"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Concept Introduction</h3>
                  <p className="absurd-card-desc">Abstract eye - seeing patterns</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Phase 1</span>
                  </div>
                </div>
              </div>

              {/* Study Mode - Book */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <rect x="45" y="40" width="110" height="130" rx="8" fill="#3b82f6" opacity="0.1"/>
                    <rect x="55" y="50" width="90" height="110" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2.5"/>
                    <line x1="70" y1="75" x2="130" y2="75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                    <line x1="70" y1="95" x2="125" y2="95" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                    <line x1="70" y1="115" x2="120" y2="115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                    <circle cx="75" cy="135" r="3" fill="#3b82f6"/>
                    <circle cx="90" cy="135" r="3" fill="#3b82f6"/>
                    <circle cx="105" cy="135" r="3" fill="#3b82f6"/>
                    <path d="M55 60 Q100 45 145 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
                    <rect x="50" y="155" width="100" height="8" rx="2" fill="#3b82f6" opacity="0.2"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Study Mode</h3>
                  <p className="absurd-card-desc">Floating book with wavy pages</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Phase 2</span>
                  </div>
                </div>
              </div>

              {/* Practice - Checkmark Path */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <rect x="40" y="130" width="120" height="50" rx="6" fill="#3b82f6" opacity="0.1"/>
                    <path d="M60 140 L80 120 L140 60" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="140" cy="60" r="8" fill="#3b82f6"/>
                    <circle cx="140" cy="60" r="3" fill="#fff"/>
                    <path d="M50 150 L70 130 L130 70" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
                    <rect x="50" y="140" width="90" height="30" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                    <line x1="65" y1="155" x2="110" y2="155" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
                    <circle cx="120" cy="155" r="4" fill="#3b82f6" opacity="0.5"/>
                    <path d="M145 75 Q155 65 165 75 Q155 85 145 75" fill="#3b82f6" opacity="0.15"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Practice</h3>
                  <p className="absurd-card-desc">Pencil drawing completion path</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Phase 3</span>
                  </div>
                </div>
              </div>

              {/* Exam - Badge */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <path d="M100 30 L115 70 L160 70 L120 100 L135 145 L100 120 L65 145 L80 100 L40 70 L85 70 Z" fill="#3b82f6" opacity="0.15"/>
                    <circle cx="100" cy="100" r="35" fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
                    <circle cx="100" cy="100" r="50" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3"/>
                    <path d="M100 55 L100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M100 125 L100 145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M145 100 L125 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M75 100 L55 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="100" cy="100" r="12" fill="#3b82f6"/>
                    <path d="M95 98 L98 102 L106 92" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="100" cy="45" r="4" fill="#3b82f6" opacity="0.4"/>
                    <circle cx="100" cy="155" r="4" fill="#3b82f6" opacity="0.4"/>
                    <circle cx="155" cy="100" r="4" fill="#3b82f6" opacity="0.4"/>
                    <circle cx="45" cy="100" r="4" fill="#3b82f6" opacity="0.4"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Exam</h3>
                  <p className="absurd-card-desc">Achievement badge with checkmark</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Phase 4</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section: Composition Method */}
          <section className="absurd-section">
            <h2 className="absurd-section-title">Functional Composition Method</h2>
            <p className="absurd-section-intro">Visual metaphors for the 3-step composition process</p>
            
            <div className="absurd-grid">
              
              {/* Learn Discrete Chunks */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-method-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08"/>
                    <text x="160" y="50" fontSize="32" fontWeight="700" fill="#1a1a1a" opacity="0.6">1</text>
                    <rect x="60" y="70" width="25" height="35" rx="4" fill="#3b82f6" opacity="0.3"/>
                    <rect x="90" y="75" width="25" height="30" rx="4" fill="#3b82f6" opacity="0.4"/>
                    <rect x="120" y="80" width="25" height="25" rx="4" fill="#3b82f6" opacity="0.5"/>
                    <circle cx="72" cy="60" r="3" fill="#3b82f6" opacity="0.5"/>
                    <circle cx="102" cy="65" r="3" fill="#3b82f6" opacity="0.6"/>
                    <circle cx="132" cy="70" r="3" fill="#3b82f6" opacity="0.7"/>
                    <path d="M50 115 Q75 105 100 115 Q125 125 150 115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
                    <rect x="65" y="125" width="70" height="3" rx="1.5" fill="#3b82f6" opacity="0.2"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Discrete Chunks</h3>
                  <p className="absurd-card-desc">Building blocks ascending</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Step 1</span>
                  </div>
                </div>
              </div>

              {/* Learn Operations */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-method-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08"/>
                    <text x="160" y="50" fontSize="32" fontWeight="700" fill="#1a1a1a" opacity="0.6">2</text>
                    <circle cx="100" cy="100" r="45" stroke="#3b82f6" strokeWidth="2.5" opacity="0.3"/>
                    <circle cx="100" cy="100" r="30" fill="#3b82f6" opacity="0.15"/>
                    <path d="M85 95 Q92 85 100 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M115 95 Q108 85 100 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <circle cx="100" cy="100" r="12" fill="#3b82f6"/>
                    <path d="M94 98 L97 102 L106 90" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="70" cy="70" r="4" fill="#3b82f6" opacity="0.4"/>
                    <circle cx="130" cy="130" r="4" fill="#3b82f6" opacity="0.4"/>
                    <path d="M90 130 Q100 135 110 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Operations</h3>
                  <p className="absurd-card-desc">Gear with checkmark processing</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Step 2</span>
                  </div>
                </div>
              </div>

              {/* Compose Them */}
              <div className="absurd-card">
                <div className="absurd-illustration-container absurd-method-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08"/>
                    <text x="160" y="50" fontSize="32" fontWeight="700" fill="#1a1a1a" opacity="0.6">3</text>
                    <rect x="50" y="80" width="35" height="40" rx="6" fill="#3b82f6" opacity="0.2" transform="rotate(-8 67.5 100)"/>
                    <rect x="115" y="80" width="35" height="40" rx="6" fill="#3b82f6" opacity="0.2" transform="rotate(8 132.5 100)"/>
                    <path d="M87 100 L113 100" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="100" cy="100" r="8" fill="#3b82f6"/>
                    <circle cx="100" cy="100" r="3" fill="#fff"/>
                    <path d="M67 75 Q75 65 83 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                    <path d="M117 75 Q125 65 133 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
                    <circle cx="100" cy="140" r="5" fill="#3b82f6" opacity="0.3"/>
                    <path d="M75 130 Q100 125 125 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.25"/>
                    <rect x="85" y="145" width="30" height="3" rx="1.5" fill="#3b82f6" opacity="0.2"/>
                  </svg>
                </div>
                <div className="absurd-card-info">
                  <h3 className="absurd-card-title">Composition</h3>
                  <p className="absurd-card-desc">Two pieces connecting</p>
                  <div className="absurd-card-meta">
                    <span className="absurd-tag">Step 3</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Usage Instructions */}
          <section className="absurd-section">
            <div className="absurd-usage-card">
              <h3>How to Use These Illustrations</h3>
              <div className="absurd-usage-content">
                <div className="absurd-usage-item">
                  <div className="absurd-usage-number">1</div>
                  <div>
                    <h4>Copy the SVG</h4>
                    <p>Right-click on any illustration and inspect to copy the SVG code</p>
                  </div>
                </div>
                <div className="absurd-usage-item">
                  <div className="absurd-usage-number">2</div>
                  <div>
                    <h4>Paste into Component</h4>
                    <p>Add to your React component wrapped in a container div</p>
                  </div>
                </div>
                <div className="absurd-usage-item">
                  <div className="absurd-usage-number">3</div>
                  <div>
                    <h4>Style the Container</h4>
                    <p>Use <code>width: 64px</code>, <code>border-radius: 12px</code>, subtle background</p>
                  </div>
                </div>
              </div>
              <div className="absurd-usage-note">
                <strong>Design Principles:</strong> All illustrations follow the Absurd Design philosophy - 
                layered opacity, organic curves, decorative elements, and brand blue (#3b82f6) only.
                See <code>DESIGN_ICONOGRAPHY_AND_GRAPHICS.md</code> for the complete guide.
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="absurd-footer">
        <div className="absurd-container">
          <p>Created with care for Language Academy • Inspired by <a href="https://absurd.design" target="_blank" rel="noopener noreferrer">Absurd Design</a></p>
        </div>
      </footer>

    </div>
  );
}

export default AbsurdLibrary;

