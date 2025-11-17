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
                <h3 className="absurd-card-title">Book Tower</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Stack of tilted books */}
                    <rect x="70" y="140" width="60" height="12" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(-3 100 146)" />
                    <rect x="65" y="120" width="70" height="14" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(2 100 127)" />
                    <rect x="60" y="95" width="80" height="16" rx="2" fill="#3b82f6" opacity="0.35" transform="rotate(-4 100 103)" />
                    <rect x="70" y="65" width="60" height="18" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(3 100 74)" />

                    {/* Top book glowing */}
                    <rect x="75" y="40" width="50" height="15" rx="2" fill="#3b82f6" transform="rotate(-2 100 47.5)" />
                    <circle cx="100" cy="47" r="30" fill="#3b82f6" opacity="0.12" />
                    <circle cx="100" cy="47" r="20" fill="#3b82f6" opacity="0.15" />

                    {/* Floating bookmark */}
                    <rect x="95" y="20" width="3" height="25" rx="1" fill="#3b82f6" opacity="0.4" />
                    <path d="M96.5 45 L94 50 L96.5 48 L99 50 Z" fill="#3b82f6" opacity="0.4" />

                    {/* Stars around tower */}
                    <path d="M140 50 L142 55 L147 57 L142 59 L140 64 L138 59 L133 57 L138 55 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M55 75 L56 78 L59 79 L56 80 L55 83 L54 80 L51 79 L54 78 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M150 95 L151 98 L154 99 L151 100 L150 103 L149 100 L146 99 L149 98 Z" fill="#3b82f6" opacity="0.12" />

                    {/* Page edges */}
                    <line x1="80" y1="48" x2="115" y2="46" stroke="#fff" strokeWidth="1.5" opacity="0.3" />

                    {/* Platform squiggle */}
                    <path d="M50 160 Q75 155 100 160 Q125 165 150 160" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Brain Zap */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Brain Zap</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <circle cx="100" cy="90" r="50" fill="#3b82f6" opacity="0.1" />

                    {/* Brain blob shape */}
                    <path d="M70 90 Q65 70 80 60 Q95 55 100 58 Q105 55 120 60 Q135 70 130 90 Q125 100 120 110 Q110 120 100 118 Q90 120 80 110 Q75 100 70 90" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Brain squiggles/folds */}
                    <path d="M80 75 Q85 70 90 75 Q95 80 100 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" />
                    <path d="M100 80 Q105 75 110 80 Q115 85 120 80" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" />
                    <path d="M85 95 Q90 90 95 95" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3" />
                    <path d="M105 95 Q110 90 115 95" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3" />

                    {/* Giant lightning bolt */}
                    <path d="M110 40 L90 90 L105 90 L80 140" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M110 40 L90 90 L105 90 L80 140" fill="#3b82f6" opacity="0.15" />

                    {/* Electric sparks at ends */}
                    <circle cx="110" cy="37" r="6" fill="#3b82f6" opacity="0.3" />
                    <circle cx="80" cy="143" r="6" fill="#3b82f6" opacity="0.3" />
                    <circle cx="110" cy="37" r="10" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />

                    {/* Energy radiating */}
                    <path d="M65 85 L48 78" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <path d="M135 85 L152 78" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <path d="M70 65 L58 52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                    <path d="M130 65 L142 52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />

                    {/* Zap particles */}
                    <circle cx="45" cy="76" r="3" fill="#3b82f6" opacity="0.2" />
                    <circle cx="155" cy="76" r="3" fill="#3b82f6" opacity="0.2" />

                    {/* Stars */}
                    <path d="M115 32 L117 37 L122 39 L117 41 L115 46 L113 41 L108 39 L113 37 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M75 145 L77 150 L82 152 L77 154 L75 159 L73 154 L68 152 L73 150 Z" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Plant Growth */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Plant Growth</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Ground/soil wavy */}
                    <ellipse cx="100" cy="160" rx="65" ry="18" fill="#3b82f6" opacity="0.15" />
                    <path d="M35 160 Q67 155 100 160 Q133 165 165 160" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2" />

                    {/* Main stem - organic curve */}
                    <path d="M100 160 Q105 140 100 120 Q95 100 100 80 Q105 60 100 35" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none" />

                    {/* Leaves sprouting out */}
                    <ellipse cx="82" cy="135" rx="14" ry="20" fill="#3b82f6" opacity="0.3" transform="rotate(-40 82 135)" />
                    <ellipse cx="118" cy="115" rx="16" ry="22" fill="#3b82f6" opacity="0.35" transform="rotate(35 118 115)" />
                    <ellipse cx="78" cy="90" rx="18" ry="24" fill="#3b82f6" opacity="0.4" transform="rotate(-45 78 90)" />
                    <ellipse cx="122" cy="70" rx="17" ry="23" fill="#3b82f6" opacity="0.4" transform="rotate(40 122 70)" />

                    {/* Flower bloom at top */}
                    <circle cx="100" cy="30" r="14" fill="#3b82f6" opacity="0.2" />
                    <circle cx="88" cy="27" r="9" fill="#3b82f6" opacity="0.3" />
                    <circle cx="112" cy="27" r="9" fill="#3b82f6" opacity="0.3" />
                    <circle cx="93" cy="38" r="8" fill="#3b82f6" opacity="0.25" />
                    <circle cx="107" cy="38" r="8" fill="#3b82f6" opacity="0.25" />
                    <circle cx="100" cy="30" r="6" fill="#3b82f6" />
                    <circle cx="100" cy="30" r="3" fill="#fff" opacity="0.5" />

                    {/* Leaf veins */}
                    <path d="M82 135 L76 128" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25" />
                    <path d="M118 115 L122 108" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25" />

                    {/* Floating seeds */}
                    <circle cx="55" cy="55" r="2.5" fill="#3b82f6" opacity="0.2" />
                    <circle cx="145" cy="90" r="2.5" fill="#3b82f6" opacity="0.15" />
                    <circle cx="155" cy="50" r="2" fill="#3b82f6" opacity="0.18" />
                    <path d="M58 52 Q61 49 64 52" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Stars blooming */}
                    <path d="M80 18 L82 23 L87 25 L82 27 L80 32 L78 27 L73 25 L78 23 Z" fill="#3b82f6" opacity="0.22" />
                    <path d="M120 18 L122 23 L127 25 L122 27 L120 32 L118 27 L113 25 L118 23 Z" fill="#3b82f6" opacity="0.22" />
                  </svg>
                </div>
              </div>

              {/* Balancing Act */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Balancing Act</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* See-saw platform */}
                    <ellipse cx="100" cy="125" rx="80" ry="8" fill="#3b82f6" opacity="0.15" transform="rotate(8 100 125)" />
                    <rect x="30" y="120" width="140" height="6" rx="3" fill="#3b82f6" opacity="0.3" transform="rotate(8 100 123)" />

                    {/* Central pivot */}
                    <path d="M95 125 L100 140 L105 125 Z" fill="#3b82f6" />
                    <circle cx="100" cy="130" r="8" fill="#3b82f6" opacity="0.2" />

                    {/* Stacked blocks on left (low) */}
                    <rect x="40" y="95" width="18" height="18" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(-8 49 104)" />
                    <rect x="42" y="75" width="15" height="15" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(-8 49.5 82.5)" />

                    {/* Massive stack on right (high) */}
                    <rect x="138" y="105" width="20" height="14" rx="2" fill="#3b82f6" opacity="0.25" transform="rotate(8 148 112)" />
                    <rect x="140" y="88" width="18" height="13" rx="2" fill="#3b82f6" opacity="0.3" transform="rotate(8 149 94.5)" />
                    <rect x="142" y="72" width="16" height="12" rx="2" fill="#3b82f6" opacity="0.35" transform="rotate(8 150 78)" />
                    <rect x="143" y="57" width="14" height="11" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(8 150 62.5)" />
                    <rect x="144" y="43" width="12" height="10" rx="2" fill="#3b82f6" transform="rotate(8 150 48)" />

                    {/* Glow around tall stack */}
                    <circle cx="150" cy="70" r="45" fill="#3b82f6" opacity="0.08" />

                    {/* Balance arrows */}
                    <path d="M55 75 L55 55" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <path d="M50 60 L55 55 L60 60" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.25" />

                    <path d="M150 30 L150 10" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                    <path d="M145 15 L150 10 L155 15" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3" />

                    {/* Stars at peak */}
                    <path d="M145 8 L147 13 L152 15 L147 17 L145 22 L143 17 L138 15 L143 13 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M165 25 L166 28 L169 29 L166 30 L165 33 L164 30 L161 29 L164 28 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Wobble lines */}
                    <path d="M85 140 Q95 135 105 140" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Floating confetti */}
                    <circle cx="30" cy="55" r="2.5" fill="#3b82f6" opacity="0.15" />
                    <circle cx="170" cy="90" r="2" fill="#3b82f6" opacity="0.12" />
                    <rect x="25" y="90" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.12" transform="rotate(20 27.5 92.5)" />
                  </svg>
                </div>
              </div>

              {/* Workshop */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Workshop Tools</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Toolbox base */}
                    <rect x="60" y="110" width="80" height="50" rx="4" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5" />
                    <rect x="60" y="110" width="80" height="15" rx="4" fill="#3b82f6" opacity="0.2" />

                    {/* Tools sticking out */}
                    {/* Wrench */}
                    <rect x="70" y="70" width="6" height="35" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(-15 73 87.5)" />
                    <circle cx="70" cy="68" r="6" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.4" />
                    <circle cx="70" cy="68" r="3" fill="#3b82f6" opacity="0.4" />

                    {/* Hammer */}
                    <rect x="95" y="65" width="5" height="40" rx="2" fill="#3b82f6" opacity="0.45" transform="rotate(5 97.5 85)" />
                    <rect x="85" y="60" width="20" height="10" rx="2" fill="#3b82f6" opacity="0.45" transform="rotate(5 95 65)" />

                    {/* Screwdriver */}
                    <rect x="118" y="70" width="4" height="35" rx="2" fill="#3b82f6" opacity="0.5" transform="rotate(12 120 87.5)" />
                    <path d="M116 67 L122 67 L120 62 Z" fill="#3b82f6" opacity="0.5" />

                    {/* Ruler sticking up */}
                    <rect x="128" y="55" width="8" height="45" rx="1.5" fill="#3b82f6" opacity="0.4" transform="rotate(-8 132 77.5)" />
                    <line x1="130" y1="65" x2="135" y2="64" stroke="#fff" strokeWidth="1" opacity="0.3" />
                    <line x1="130" y1="75" x2="135" y2="74" stroke="#fff" strokeWidth="1" opacity="0.3" />
                    <line x1="130" y1="85" x2="135" y2="84" stroke="#fff" strokeWidth="1" opacity="0.3" />

                    {/* Floating screws/nails */}
                    <rect x="50" y="80" width="3" height="12" rx="1" fill="#3b82f6" opacity="0.3" transform="rotate(25 51.5 86)" />
                    <rect x="145" y="85" width="3" height="10" rx="1" fill="#3b82f6" opacity="0.3" transform="rotate(-20 146.5 90)" />
                    <circle cx="52" cy="76" r="3" fill="#3b82f6" opacity="0.25" />
                    <circle cx="147" cy="82" r="3" fill="#3b82f6" opacity="0.25" />

                    {/* Floating nuts/bolts */}
                    <circle cx="40" cy="95" r="4" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                    <circle cx="160" cy="100" r="4" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />

                    {/* Workshop sawdust/debris */}
                    <circle cx="75" cy="155" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="90" cy="158" r="2.5" fill="#3b82f6" opacity="0.12" />
                    <circle cx="110" cy="157" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="125" cy="159" r="2.5" fill="#3b82f6" opacity="0.12" />

                    {/* Stars of creation */}
                    <path d="M100 40 L102 45 L107 47 L102 49 L100 54 L98 49 L93 47 L98 45 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M45 60 L46 63 L49 64 L46 65 L45 68 L44 65 L41 64 L44 63 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M155 65 L156 68 L159 69 L156 70 L155 73 L154 70 L151 69 L154 68 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Wood shavings squiggles */}
                    <path d="M25 140 Q30 135 35 140" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.1" />
                    <path d="M165 145 Q170 140 175 145" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.1" />
                  </svg>
                </div>
              </div>

              {/* Lightbulb Moment */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Lightbulb Moment</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Lightbulb */}
                    <circle cx="100" cy="80" r="25" fill="#3b82f6" opacity="0.15" />
                    <circle cx="100" cy="80" r="20" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Filament zigzag inside */}
                    <path d="M100 65 L105 72 L95 78 L105 84 L100 90" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* Bulb base */}
                    <rect x="92" y="103" width="16" height="8" rx="2" fill="#3b82f6" opacity="0.3" />
                    <rect x="95" y="111" width="10" height="5" rx="1" fill="#3b82f6" opacity="0.25" />

                    {/* Light rays bursting out */}
                    <path d="M100 50 L100 35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                    <path d="M125 60 L140 50" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                    <path d="M135 85 L150 90" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
                    <path d="M75 60 L60 50" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                    <path d="M65 85 L50 90" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.25" />

                    {/* Glow circles */}
                    <circle cx="100" cy="80" r="35" stroke="#3b82f6" strokeWidth="1.5" opacity="0.1" />
                    <circle cx="100" cy="80" r="45" stroke="#3b82f6" strokeWidth="1" opacity="0.06" />

                    {/* Stars from idea */}
                    <path d="M100 25 L102 30 L107 32 L102 34 L100 39 L98 34 L93 32 L98 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M145 45 L146 48 L149 49 L146 50 L145 53 L144 50 L141 49 L144 48 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M55 45 L56 48 L59 49 L56 50 L55 53 L54 50 L51 49 L54 48 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Brain waves */}
                    <path d="M75 130 Q85 125 95 130 Q105 135 115 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M70 145 Q85 140 100 145 Q115 150 130 145" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />

                    {/* Dots */}
                    <circle cx="160" cy="100" r="3" fill="#3b82f6" opacity="0.15" />
                    <circle cx="40" cy="100" r="3" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Stairway Up */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Stairway</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <circle cx="140" cy="70" r="40" fill="#3b82f6" opacity="0.1" />

                    {/* Stair steps */}
                    <rect x="30" y="140" width="25" height="20" rx="3" fill="#3b82f6" opacity="0.2" />
                    <rect x="60" y="120" width="25" height="20" rx="3" fill="#3b82f6" opacity="0.25" />
                    <rect x="90" y="100" width="25" height="20" rx="3" fill="#3b82f6" opacity="0.3" />
                    <rect x="120" y="80" width="25" height="20" rx="3" fill="#3b82f6" opacity="0.35" />

                    {/* Dancing figure */}
                    <circle cx="133" cy="73" r="6" fill="#3b82f6" />
                    <rect x="130" y="80" width="6" height="10" rx="2" fill="#3b82f6" />
                    <path d="M127 85 L123 92" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M136 85 L140 92" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M128 82 L122 80" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M135 82 L141 80" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

                    {/* Confetti */}
                    <rect x="155" y="50" width="4" height="8" rx="1" fill="#3b82f6" opacity="0.25" transform="rotate(25 157 54)" />
                    <rect x="165" y="60" width="3" height="6" rx="1" fill="#3b82f6" opacity="0.2" transform="rotate(-30 166.5 63)" />
                    <circle cx="160" cy="70" r="2" fill="#3b82f6" opacity="0.2" />

                    {/* Stars */}
                    <path d="M150 40 L152 45 L157 47 L152 49 L150 54 L148 49 L143 47 L148 45 Z" fill="#3b82f6" opacity="0.22" />
                    <path d="M175 80 L176 83 L179 84 L176 85 L175 88 L174 85 L171 84 L174 83 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Waves */}
                    <path d="M25 155 Q35 150 45 155 Q55 160 65 155" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />

                    {/* Step dots */}
                    <circle cx="42" cy="135" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="72" cy="115" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="102" cy="95" r="3" fill="#fff" opacity="0.6" />
                  </svg>
                </div>
              </div>

              {/* Telescope Stars */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Telescope</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Telescope tube */}
                    <rect x="50" y="95" width="80" height="18" rx="9" fill="#3b82f6" opacity="0.2" transform="rotate(-20 90 104)" />
                    <rect x="52" y="97" width="76" height="14" rx="7" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(-20 90 104)" />

                    {/* Lens front */}
                    <ellipse cx="42" cy="88" rx="10" ry="8" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2" transform="rotate(-20 42 88)" />
                    <circle cx="42" cy="88" r="5" fill="#3b82f6" opacity="0.2" />

                    {/* Eyepiece */}
                    <circle cx="132" cy="118" r="8" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />

                    {/* Tripod stand */}
                    <path d="M95 115 L85 145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M95 115 L105 145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="95" cy="115" r="5" fill="#3b82f6" opacity="0.3" />

                    {/* Stars being viewed */}
                    <path d="M25 70 L27 76 L33 78 L27 80 L25 86 L23 80 L17 78 L23 76 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M35 50 L37 55 L42 57 L37 59 L35 64 L33 59 L28 57 L33 55 Z" fill="#3b82f6" opacity="0.3" />
                    <path d="M20 90 L21 93 L24 94 L21 95 L20 98 L19 95 L16 94 L19 93 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M30 40 L31 43 L34 44 L31 45 L30 48 L29 45 L26 44 L29 43 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M15 55 L16 58 L19 59 L16 60 L15 63 L14 60 L11 59 L14 58 Z" fill="#3b82f6" opacity="0.15" />

                    {/* View lines */}
                    <path d="M38 85 L25 78" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" strokeDasharray="2 2" />
                    <path d="M40 82 L30 68" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" strokeDasharray="2 2" />

                    {/* Sparkles */}
                    <circle cx="25" cy="105" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="40" cy="65" r="2" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Mountain Peak */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Mountain Peak</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Mountain range */}
                    <path d="M20 150 L60 90 L80 110 L100 60 L120 95 L140 70 L180 150 Z" fill="#3b82f6" opacity="0.12" />
                    <path d="M20 150 L60 90 L80 110 L100 60 L120 95 L140 70 L180 150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                    {/* Main peak highlight */}
                    <path d="M80 110 L100 60 L120 95 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Flag at peak */}
                    <path d="M100 60 L100 35" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M100 40 Q110 35 120 40 L120 50 Q110 55 100 50 Z" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="1.5" />

                    {/* Flag waving */}
                    <path d="M102 42 Q110 38 118 42" stroke="#3b82f6" strokeWidth="1" opacity="0.3" fill="none" />

                    {/* Sun/glow behind peak */}
                    <circle cx="100" cy="50" r="30" fill="#3b82f6" opacity="0.08" />
                    <circle cx="100" cy="50" r="20" fill="#3b82f6" opacity="0.1" />

                    {/* Stars at summit */}
                    <path d="M95 25 L97 30 L102 32 L97 34 L95 39 L93 34 L88 32 L93 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M120 30 L121 33 L124 34 L121 35 L120 38 L119 35 L116 34 L119 33 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M110 20 L111 23 L114 24 L111 25 L110 28 L109 25 L106 24 L109 23 Z" fill="#3b82f6" opacity="0.22" />

                    {/* Clouds below */}
                    <ellipse cx="50" cy="130" rx="15" ry="8" fill="#3b82f6" opacity="0.08" />
                    <ellipse cx="150" cy="120" rx="18" ry="9" fill="#3b82f6" opacity="0.08" />

                    {/* Ground squiggle */}
                    <path d="M20 155 Q60 150 100 155 Q140 160 180 155" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Magnet Attraction */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Magnet Pull</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Horseshoe magnet */}
                    <path d="M60 120 L60 80 Q60 50 100 50 Q140 50 140 80 L140 120" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M60 120 L60 80 Q60 50 100 50 Q140 50 140 80 L140 120" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />

                    {/* Magnet ends */}
                    <rect x="52" y="115" width="16" height="15" rx="3" fill="#3b82f6" opacity="0.3" />
                    <rect x="132" y="115" width="16" height="15" rx="3" fill="#3b82f6" opacity="0.3" />
                    <rect x="54" y="117" width="12" height="11" rx="2" fill="#3b82f6" />
                    <rect x="134" y="117" width="12" height="11" rx="2" fill="#3b82f6" />

                    {/* Magnetic field lines */}
                    <path d="M50 100 Q30 100 30 80 Q30 60 50 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M150 100 Q170 100 170 80 Q170 60 150 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M55 110 Q25 110 25 85" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.12" />
                    <path d="M145 110 Q175 110 175 85" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.12" />

                    {/* Attracted particles */}
                    <circle cx="100" cy="135" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="90" cy="140" r="3" fill="#3b82f6" opacity="0.35" />
                    <circle cx="110" cy="140" r="3" fill="#3b82f6" opacity="0.35" />
                    <circle cx="95" cy="145" r="2.5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="105" cy="145" r="2.5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="100" cy="150" r="2" fill="#3b82f6" opacity="0.25" />

                    {/* Motion lines toward magnet */}
                    <path d="M85 145 L90 142" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                    <path d="M115 145 L110 142" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />

                    {/* Energy stars */}
                    <path d="M100 40 L102 45 L107 47 L102 49 L100 54 L98 49 L93 47 L98 45 Z" fill="#3b82f6" opacity="0.2" />
                    <circle cx="60" cy="75" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="140" cy="75" r="2" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Spiral Vortex */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Spiral Vortex</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Spiral going inward */}
                    <path d="M100 30 Q140 40 150 80 Q155 120 130 145 Q100 160 70 145 Q45 120 50 85 Q55 60 80 50 Q100 45 115 60 Q125 75 120 95 Q113 110 100 110 Q90 110 85 100 Q82 92 88 85"
                      stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* Center point glowing */}
                    <circle cx="100" cy="95" r="15" fill="#3b82f6" opacity="0.2" />
                    <circle cx="100" cy="95" r="10" fill="#3b82f6" opacity="0.3" />
                    <circle cx="100" cy="95" r="6" fill="#3b82f6" />
                    <circle cx="100" cy="95" r="3" fill="#fff" opacity="0.6" />

                    {/* Particles spiraling */}
                    <circle cx="120" cy="50" r="3" fill="#3b82f6" opacity="0.3" />
                    <circle cx="145" cy="90" r="3" fill="#3b82f6" opacity="0.35" />
                    <circle cx="120" cy="135" r="2.5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="65" cy="135" r="2.5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="55" cy="95" r="3" fill="#3b82f6" opacity="0.35" />

                    {/* Secondary spiral (lighter) */}
                    <path d="M100 35 Q135 45 145 75 Q150 110 125 135"
                      stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Stars at entry points */}
                    <path d="M100 20 L102 25 L107 27 L102 29 L100 34 L98 29 L93 27 L98 25 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M150 80 L151 83 L154 84 L151 85 L150 88 L149 85 L146 84 L149 83 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Gravity waves */}
                    <circle cx="100" cy="95" r="25" stroke="#3b82f6" strokeWidth="1" opacity="0.08" />
                    <circle cx="100" cy="95" r="35" stroke="#3b82f6" strokeWidth="1" opacity="0.05" />
                  </svg>
                </div>
              </div>

              {/* Compass Navigation */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Compass</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Compass housing */}
                    <circle cx="100" cy="100" r="50" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
                    <circle cx="100" cy="100" r="45" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />

                    {/* Cardinal marks */}
                    <path d="M100 45 L100 55" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M100 145 L100 155" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M45 100 L55 100" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M145 100 L155 100" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                    {/* Intercardinal marks (smaller) */}
                    <path d="M70 70 L75 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M130 70 L125 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M70 130 L75 125" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M130 130 L125 125" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

                    {/* Needle pointing direction */}
                    <path d="M100 100 L115 70" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="8" fill="#3b82f6" />
                    <circle cx="100" cy="100" r="4" fill="#fff" opacity="0.5" />

                    {/* Direction arrow */}
                    <path d="M110 75 L115 70 L120 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                    {/* Outer glow */}
                    <circle cx="100" cy="100" r="60" stroke="#3b82f6" strokeWidth="1.5" opacity="0.08" />
                    <circle cx="100" cy="100" r="70" stroke="#3b82f6" strokeWidth="1" opacity="0.05" />

                    {/* Stars at cardinal points */}
                    <path d="M100 35 L102 40 L107 42 L102 44 L100 49 L98 44 L93 42 L98 40 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M160 100 L161 103 L164 104 L161 105 L160 108 L159 105 L156 104 L159 103 Z" fill="#3b82f6" opacity="0.18" />

                    {/* Decorative degrees */}
                    <circle cx="115" cy="70" r="3" fill="#3b82f6" opacity="0.3" />
                  </svg>
                </div>
              </div>

              {/* Trophy Champion */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Trophy</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <circle cx="100" cy="80" r="50" fill="#3b82f6" opacity="0.1" />

                    {/* Trophy cup */}
                    <path d="M70 70 L70 90 Q70 110 100 115 Q130 110 130 90 L130 70 Z" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2.5" />
                    <ellipse cx="100" cy="70" rx="30" ry="8" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" />

                    {/* Handles */}
                    <path d="M68 75 Q50 75 50 90 Q50 95 58 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M132 75 Q150 75 150 90 Q150 95 142 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* Base/pedestal */}
                    <rect x="90" y="115" width="20" height="15" rx="2" fill="#3b82f6" opacity="0.25" />
                    <rect x="80" y="130" width="40" height="12" rx="3" fill="#3b82f6" opacity="0.3" />
                    <rect x="70" y="142" width="60" height="8" rx="2" fill="#3b82f6" opacity="0.2" />

                    {/* Winner star in cup */}
                    <path d="M100 85 L103 92 L110 94 L103 96 L100 103 L97 96 L90 94 L97 92 Z" fill="#3b82f6" opacity="0.4" />
                    <circle cx="100" cy="94" r="5" fill="#3b82f6" opacity="0.2" />

                    {/* Sparkles around trophy */}
                    <path d="M60 55 L62 60 L67 62 L62 64 L60 69 L58 64 L53 62 L58 60 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M140 55 L142 60 L147 62 L142 64 L140 69 L138 64 L133 62 L138 60 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M85 50 L86 53 L89 54 L86 55 L85 58 L84 55 L81 54 L84 53 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M115 50 L116 53 L119 54 L116 55 L115 58 L114 55 L111 54 L114 53 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Podium platform */}
                    <ellipse cx="100" cy="155" rx="40" ry="10" fill="#3b82f6" opacity="0.12" />

                    {/* Celebration confetti */}
                    <circle cx="50" cy="65" r="2" fill="#3b82f6" opacity="0.2" />
                    <circle cx="150" cy="65" r="2" fill="#3b82f6" opacity="0.2" />
                    <rect x="45" y="75" width="3" height="5" rx="1" fill="#3b82f6" opacity="0.18" transform="rotate(20 46.5 77.5)" />
                    <rect x="152" y="75" width="3" height="5" rx="1" fill="#3b82f6" opacity="0.18" transform="rotate(-20 153.5 77.5)" />
                  </svg>
                </div>
              </div>

              {/* Checkered Flag Victory */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Checkered Flag</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.05" />
                    <ellipse cx="120" cy="90" rx="60" ry="70" fill="#3b82f6" opacity="0.08" />

                    {/* Flag pole - curved */}
                    <path d="M42 160 Q45 110 48 65" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <circle cx="43" cy="158" r="10" fill="#3b82f6" opacity="0.2" />

                    {/* Wavy checkered flag */}
                    <path d="M50 65 Q75 52 100 62 Q125 72 150 60 Q170 55 185 65 L185 110 Q170 100 150 105 Q125 112 100 102 Q75 92 50 105 Z"
                      fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />

                    {/* Checkered pattern - tilted squares */}
                    <rect x="58" y="68" width="18" height="14" fill="#3b82f6" opacity="0.35" transform="rotate(-2 67 75)" />
                    <rect x="92" y="64" width="16" height="15" fill="#3b82f6" opacity="0.35" transform="rotate(3 100 71.5)" />
                    <rect x="125" y="68" width="17" height="14" fill="#3b82f6" opacity="0.35" transform="rotate(-1 133.5 75)" />
                    <rect x="158" y="62" width="15" height="13" fill="#3b82f6" opacity="0.35" transform="rotate(4 165.5 68.5)" />

                    <rect x="76" y="82" width="16" height="13" fill="#3b82f6" opacity="0.3" transform="rotate(2 84 88.5)" />
                    <rect x="108" y="79" width="17" height="14" fill="#3b82f6" opacity="0.3" transform="rotate(-3 116.5 86)" />
                    <rect x="142" y="80" width="16" height="13" fill="#3b82f6" opacity="0.3" transform="rotate(1 150 86.5)" />

                    <rect x="60" y="96" width="16" height="12" fill="#3b82f6" opacity="0.25" transform="rotate(-1 68 102)" />
                    <rect x="92" y="94" width="16" height="13" fill="#3b82f6" opacity="0.25" transform="rotate(2 100 100.5)" />

                    {/* Wind swooshes */}
                    <path d="M20 65 Q28 58 36 65 Q44 72 52 65" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.18" />
                    <path d="M15 80 Q25 73 35 80 Q45 87 55 80" stroke="#3b82f6" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.2" />
                    <path d="M18 95 Q28 88 38 95 Q48 102 58 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Victory confetti */}
                    <rect x="175" y="45" width="5" height="10" rx="1.5" fill="#3b82f6" opacity="0.25" transform="rotate(35 177.5 50)" />
                    <rect x="185" y="52" width="4" height="8" rx="1" fill="#3b82f6" opacity="0.22" transform="rotate(-25 187 56)" />
                    <circle cx="180" cy="48" r="2.5" fill="#3b82f6" opacity="0.2" />

                    {/* Stars */}
                    <path d="M165 32 L167 38 L173 40 L167 42 L165 48 L163 42 L157 40 L163 38 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M185 70 L187 75 L192 77 L187 79 L185 84 L183 79 L178 77 L183 75 Z" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Melting Clock */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Melting Time</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Clock face melting/drooping */}
                    <ellipse cx="100" cy="90" rx="40" ry="45" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
                    <ellipse cx="100" cy="88" rx="35" ry="40" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />

                    {/* Dripping bottom */}
                    <path d="M80 120 Q85 135 88 145 L90 145 Q92 135 95 125" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M105 125 Q108 135 110 145 L112 145 Q115 135 120 120" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Drip drops falling */}
                    <ellipse cx="87" cy="150" rx="3" ry="5" fill="#3b82f6" opacity="0.3" />
                    <ellipse cx="111" cy="152" rx="3" ry="5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="87" cy="160" r="2" fill="#3b82f6" opacity="0.2" />
                    <circle cx="111" cy="162" r="2" fill="#3b82f6" opacity="0.2" />

                    {/* Clock hands - bent/warped */}
                    <path d="M100 90 Q105 75 110 65" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M100 90 Q115 88 125 85" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="100" cy="90" r="5" fill="#3b82f6" />

                    {/* Hour marks - some sliding down */}
                    <circle cx="100" cy="60" r="3" fill="#3b82f6" opacity="0.4" />
                    <circle cx="125" cy="70" r="3" fill="#3b82f6" opacity="0.35" transform="translate(2 3)" />
                    <circle cx="135" cy="90" r="3" fill="#3b82f6" opacity="0.35" transform="translate(3 5)" />
                    <circle cx="75" cy="70" r="3" fill="#3b82f6" opacity="0.35" transform="translate(-2 3)" />

                    {/* Stars around */}
                    <path d="M130 50 L132 55 L137 57 L132 59 L130 64 L128 59 L123 57 L128 55 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M65 55 L66 58 L69 59 L66 60 L65 63 L64 60 L61 59 L64 58 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Puddle forming */}
                    <ellipse cx="100" cy="165" rx="30" ry="6" fill="#3b82f6" opacity="0.12" />
                  </svg>
                </div>
              </div>

              {/* Balloon Cluster Rising */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Rising Balloons</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Balloons at different heights */}
                    <ellipse cx="85" cy="50" rx="18" ry="22" fill="#3b82f6" opacity="0.3" />
                    <ellipse cx="85" cy="48" rx="15" ry="19" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M85 70 Q83 75 85 78 Q87 75 85 70" fill="#3b82f6" opacity="0.2" />
                    <path d="M85 78 L85 95" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />

                    <ellipse cx="110" cy="35" rx="20" ry="24" fill="#3b82f6" opacity="0.35" />
                    <ellipse cx="110" cy="33" rx="17" ry="21" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M110 57 Q108 62 110 65 Q112 62 110 57" fill="#3b82f6" opacity="0.25" />
                    <path d="M110 65 L110 95" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />

                    <ellipse cx="130" cy="60" rx="16" ry="20" fill="#3b82f6" opacity="0.28" />
                    <ellipse cx="130" cy="58" rx="13" ry="17" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M130 78 Q128 83 130 86 Q132 83 130 78" fill="#3b82f6" opacity="0.18" />
                    <path d="M130 86 L130 95" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Strings converging to hand */}
                    <circle cx="100" cy="100" r="5" fill="#3b82f6" />
                    <path d="M100 100 L100 115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

                    {/* Hand holding (simple) */}
                    <ellipse cx="100" cy="120" rx="8" ry="6" fill="#3b82f6" opacity="0.3" />

                    {/* Sky elements */}
                    <path d="M60 70 L62 75 L67 77 L62 79 L60 84 L58 79 L53 77 L58 75 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M150 45 L151 48 L154 49 L151 50 L150 53 L149 50 L146 49 L149 48 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M70 25 L71 28 L74 29 L71 30 L70 33 L69 30 L66 29 L69 28 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Clouds */}
                    <ellipse cx="50" cy="90" rx="12" ry="6" fill="#3b82f6" opacity="0.08" />
                    <ellipse cx="155" cy="75" rx="15" ry="7" fill="#3b82f6" opacity="0.08" />

                    {/* Wind squiggles */}
                    <path d="M30 110 Q40 105 50 110" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.12" />
                  </svg>
                </div>
              </div>

              {/* Hourglass Sideways */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Tilted Hourglass</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <ellipse cx="115" cy="100" rx="65" ry="75" fill="#3b82f6" opacity="0.09" transform="rotate(15 115 100)" />

                    {/* Hourglass tilted */}
                    <path d="M70 50 L130 50 Q125 75 100 95 Q75 75 70 50 Z"
                      fill="#3b82f6" opacity="0.08" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(15 100 72.5)" />
                    <path d="M70 140 L130 140 Q125 115 100 95 Q75 115 70 140 Z"
                      fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(15 100 117.5)" />

                    {/* Top rim */}
                    <ellipse cx="100" cy="48" rx="32" ry="8" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2" transform="rotate(15 100 48)" />
                    {/* Bottom rim */}
                    <ellipse cx="100" cy="142" rx="32" ry="8" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" transform="rotate(15 100 142)" />

                    {/* Sand flowing through */}
                    <circle cx="95" cy="70" r="3" fill="#3b82f6" opacity="0.4" />
                    <circle cx="88" cy="80" r="2.5" fill="#3b82f6" opacity="0.35" />
                    <circle cx="82" cy="90" r="2" fill="#3b82f6" opacity="0.3" />
                    <circle cx="105" cy="75" r="2.5" fill="#3b82f6" opacity="0.38" />
                    <circle cx="98" cy="85" r="2" fill="#3b82f6" opacity="0.32" />

                    {/* Sand pile */}
                    <ellipse cx="102" cy="130" rx="22" ry="12" fill="#3b82f6" opacity="0.25" transform="rotate(15 102 130)" />

                    {/* Sand spilling out */}
                    <circle cx="118" cy="145" r="2.5" fill="#3b82f6" opacity="0.25" />
                    <circle cx="125" cy="150" r="2" fill="#3b82f6" opacity="0.2" />
                    <circle cx="112" cy="150" r="2" fill="#3b82f6" opacity="0.22" />

                    {/* Stars */}
                    <path d="M145 55 L147 61 L153 63 L147 65 L145 71 L143 65 L137 63 L143 61 Z" fill="#3b82f6" opacity="0.22" />
                    <path d="M160 85 L161 89 L165 90 L161 91 L160 95 L159 91 L155 90 L159 89 Z" fill="#3b82f6" opacity="0.18" />
                  </svg>
                </div>
              </div>

              {/* Key Unlocking */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Magic Key</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <ellipse cx="130" cy="90" rx="50" ry="60" fill="#3b82f6" opacity="0.1" />

                    {/* Key head - ornate */}
                    <circle cx="60" cy="100" r="20" fill="none" stroke="#3b82f6" strokeWidth="3" />
                    <circle cx="60" cy="100" r="12" fill="#3b82f6" opacity="0.15" />
                    <path d="M50 100 L70 100" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <path d="M60 90 L60 110" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />

                    {/* Key shaft */}
                    <rect x="75" y="96" width="55" height="8" rx="4" fill="#3b82f6" />

                    {/* Key teeth - wavy */}
                    <rect x="120" y="100" width="4" height="10" rx="1" fill="#3b82f6" />
                    <rect x="128" y="100" width="3" height="7" rx="1" fill="#3b82f6" />
                    <rect x="134" y="100" width="4" height="12" rx="1" fill="#3b82f6" />

                    {/* Lock/keyhole glowing */}
                    <circle cx="155" cy="90" r="15" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M155 85 L155 95 Q155 98 158 98 L152 98 Q155 98 155 95 Z" fill="#3b82f6" opacity="0.4" />

                    {/* Unlocking burst */}
                    <circle cx="155" cy="90" r="20" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <circle cx="155" cy="90" r="27" stroke="#3b82f6" strokeWidth="1" opacity="0.1" />

                    {/* Sparkle rays */}
                    <path d="M155 65 L155 55" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <path d="M175 80 L185 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <path d="M175 100 L185 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />

                    {/* Magic stars */}
                    <path d="M150 50 L152 55 L157 57 L152 59 L150 64 L148 59 L143 57 L148 55 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M180 70 L181 73 L184 74 L181 75 L180 78 L179 75 L176 74 L179 73 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M170 105 L171 108 L174 109 L171 110 L170 113 L169 110 L166 109 L169 108 Z" fill="#3b82f6" opacity="0.18" />

                    {/* Decorative swirls */}
                    <path d="M45 85 Q40 80 35 85" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M48 115 Q43 120 38 115" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Exploding Gift Box */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Gift Explosion</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <circle cx="100" cy="100" r="50" fill="#3b82f6" opacity="0.1" />

                    {/* Gift box base */}
                    <rect x="75" y="100" width="50" height="40" rx="3" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Ribbon vertical */}
                    <rect x="97" y="100" width="6" height="40" fill="#3b82f6" opacity="0.3" />
                    {/* Ribbon horizontal */}
                    <rect x="75" y="117" width="50" height="6" fill="#3b82f6" opacity="0.3" />

                    {/* Lid flying off */}
                    <rect x="65" y="65" width="70" height="12" rx="3" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" transform="rotate(-15 100 71)" />
                    <rect x="90" y="63" width="20" height="8" fill="#3b82f6" opacity="0.35" transform="rotate(-15 100 67)" />

                    {/* Contents bursting out */}
                    <path d="M100 95 L95 70" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M100 95 L115 65" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M100 95 L105 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="95" cy="70" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="115" cy="65" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="105" cy="75" r="3" fill="#3b82f6" opacity="0.35" />

                    {/* Confetti explosion */}
                    <rect x="85" y="55" width="4" height="8" rx="1" fill="#3b82f6" opacity="0.3" transform="rotate(25 87 59)" />
                    <rect x="120" y="48" width="5" height="10" rx="1" fill="#3b82f6" opacity="0.35" transform="rotate(-30 122.5 53)" />
                    <rect x="110" y="55" width="3" height="7" rx="1" fill="#3b82f6" opacity="0.28" transform="rotate(15 111.5 58.5)" />
                    <circle cx="90" cy="50" r="2.5" fill="#3b82f6" opacity="0.25" />
                    <circle cx="125" cy="55" r="2" fill="#3b82f6" opacity="0.22" />

                    {/* Stars everywhere */}
                    <path d="M80 40 L82 45 L87 47 L82 49 L80 54 L78 49 L73 47 L78 45 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M130 35 L132 40 L137 42 L132 44 L130 49 L128 44 L123 42 L128 40 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M100 30 L101 33 L104 34 L101 35 L100 38 L99 35 L96 34 L99 33 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Sparkles */}
                    <circle cx="70" cy="75" r="2" fill="#3b82f6" opacity="0.18" />
                    <circle cx="135" cy="70" r="2" fill="#3b82f6" opacity="0.18" />

                    {/* Bow detail */}
                    <path d="M88 117 Q80 112 75 117" fill="#3b82f6" opacity="0.25" />
                    <path d="M112 117 Q120 112 125 117" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Floating Islands */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Sky Islands</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Bottom island */}
                    <ellipse cx="100" cy="145" rx="40" ry="15" fill="#3b82f6" opacity="0.2" />
                    <ellipse cx="100" cy="140" rx="38" ry="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="105" cy="138" r="2" fill="#3b82f6" opacity="0.3" />
                    <circle cx="92" cy="139" r="2" fill="#3b82f6" opacity="0.3" />

                    {/* Middle island */}
                    <ellipse cx="85" cy="105" rx="35" ry="12" fill="#3b82f6" opacity="0.25" />
                    <ellipse cx="85" cy="100" rx="33" ry="7" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="88" cy="98" r="2" fill="#3b82f6" opacity="0.35" />

                    {/* Top island with tree */}
                    <ellipse cx="120" cy="65" rx="30" ry="10" fill="#3b82f6" opacity="0.3" />
                    <ellipse cx="120" cy="60" rx="28" ry="6" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2" />

                    {/* Tiny tree */}
                    <path d="M120 60 L120 45" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="120" cy="42" r="8" fill="#3b82f6" opacity="0.3" />
                    <circle cx="120" cy="42" r="5" fill="#3b82f6" />

                    {/* Connecting bridges/ladders */}
                    <path d="M100 138 L85 103" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" opacity="0.25" />
                    <path d="M88 98 L118 63" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" opacity="0.25" />

                    {/* Clouds around */}
                    <ellipse cx="50" cy="90" rx="15" ry="8" fill="#3b82f6" opacity="0.08" />
                    <ellipse cx="155" cy="110" rx="18" ry="9" fill="#3b82f6" opacity="0.08" />
                    <ellipse cx="65" cy="60" rx="12" ry="6" fill="#3b82f6" opacity="0.08" />

                    {/* Stars in sky */}
                    <path d="M120 25 L122 30 L127 32 L122 34 L120 39 L118 34 L113 32 L118 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M150 50 L151 53 L154 54 L151 55 L150 58 L149 55 L146 54 L149 53 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M40 75 L41 78 L44 79 L41 80 L40 83 L39 80 L36 79 L39 78 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Birds flying */}
                    <path d="M160 70 Q165 67 170 70" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" />
                    <path d="M170 70 Q175 67 180 70" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Puzzle Pieces Connecting */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Puzzle Click</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <circle cx="100" cy="100" r="50" fill="#3b82f6" opacity="0.1" />

                    {/* Left puzzle piece */}
                    <rect x="40" y="80" width="50" height="40" rx="4" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="90" cy="100" r="8" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="90" cy="100" r="4" fill="#3b82f6" opacity="0.15" />

                    {/* Right puzzle piece - slightly offset */}
                    <rect x="110" y="78" width="50" height="40" rx="4" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(-3 135 98)" />
                    <circle cx="110" cy="98" r="8" fill="none" stroke="#3b82f6" strokeWidth="2" transform="rotate(-3 110 98)" />

                    {/* Connection spark */}
                    <circle cx="100" cy="100" r="12" fill="#3b82f6" opacity="0.2" />
                    <circle cx="100" cy="100" r="8" fill="#3b82f6" opacity="0.3" />
                    <circle cx="100" cy="100" r="4" fill="#3b82f6" />

                    {/* Motion arrows showing connection */}
                    <path d="M85 100 L95 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                    <path d="M80 100 L85 100" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                    <path d="M115 98 L105 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" transform="rotate(-3 110 99)" />

                    {/* "Click" burst */}
                    <circle cx="100" cy="100" r="20" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <circle cx="100" cy="100" r="28" stroke="#3b82f6" strokeWidth="1" opacity="0.08" />

                    {/* Stars of completion */}
                    <path d="M100 70 L102 75 L107 77 L102 79 L100 84 L98 79 L93 77 L98 75 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M100 128 L102 133 L107 135 L102 137 L100 142 L98 137 L93 135 L98 133 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M70 100 L71 103 L74 104 L71 105 L70 108 L69 105 L66 104 L69 103 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M130 100 L131 103 L134 104 L131 105 L130 108 L129 105 L126 104 L129 103 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Decorative corner shapes */}
                    <rect x="45" y="75" width="6" height="6" rx="1" fill="#3b82f6" opacity="0.12" transform="rotate(15 48 78)" />
                    <rect x="150" y="115" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.12" transform="rotate(-20 152.5 117.5)" />
                  </svg>
                </div>
              </div>

              {/* Atom Nucleus */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Atom Spin</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Nucleus - layered */}
                    <circle cx="100" cy="100" r="15" fill="#3b82f6" opacity="0.2" />
                    <circle cx="100" cy="100" r="10" fill="#3b82f6" />
                    <circle cx="100" cy="100" r="5" fill="#fff" opacity="0.5" />

                    {/* Electron orbits - 3 different angles */}
                    <ellipse cx="100" cy="100" rx="50" ry="25" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.25" />
                    <ellipse cx="100" cy="100" rx="50" ry="25" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" transform="rotate(60 100 100)" />
                    <ellipse cx="100" cy="100" rx="50" ry="25" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.35" transform="rotate(120 100 100)" />

                    {/* Electrons on orbits */}
                    <circle cx="150" cy="100" r="5" fill="#3b82f6" />
                    <circle cx="150" cy="100" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />

                    <circle cx="75" cy="122" r="5" fill="#3b82f6" transform="rotate(60 100 100)" />
                    <circle cx="75" cy="122" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.2" transform="rotate(60 100 100)" />

                    <circle cx="125" cy="78" r="5" fill="#3b82f6" transform="rotate(120 100 100)" />
                    <circle cx="125" cy="78" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.2" transform="rotate(120 100 100)" />

                    {/* Motion blur trails */}
                    <path d="M145 100 Q148 100 150 100" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.15" />

                    {/* Energy field */}
                    <circle cx="100" cy="100" r="65" stroke="#3b82f6" strokeWidth="1" opacity="0.08" />
                    <circle cx="100" cy="100" r="75" stroke="#3b82f6" strokeWidth="0.5" opacity="0.05" />

                    {/* Stars at orbit peaks */}
                    <path d="M155 100 L157 105 L162 107 L157 109 L155 114 L153 109 L148 107 L153 105 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M45 100 L46 103 L49 104 L46 105 L45 108 L44 105 L41 104 L44 103 Z" fill="#3b82f6" opacity="0.15" />

                    {/* Particles */}
                    <circle cx="100" cy="50" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="100" cy="150" r="2" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Paper Airplane Swoosh */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Paper Airplane</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Paper airplane */}
                    <path d="M160 50 L80 95 L95 100 L90 115 L105 105 L170 60 Z" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M160 50 L95 100 L105 105 Z" fill="#3b82f6" opacity="0.35" />
                    <line x1="160" y1="50" x2="90" y2="115" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />

                    {/* Airplane nose detail */}
                    <circle cx="165" cy="55" r="8" fill="#3b82f6" opacity="0.25" />
                    <circle cx="165" cy="55" r="4" fill="#3b82f6" />

                    {/* Flight trail/vapor */}
                    <circle cx="145" cy="65" r="4" fill="#3b82f6" opacity="0.15" />
                    <circle cx="130" cy="75" r="3.5" fill="#3b82f6" opacity="0.12" />
                    <circle cx="115" cy="85" r="3" fill="#3b82f6" opacity="0.1" />
                    <circle cx="100" cy="95" r="2.5" fill="#3b82f6" opacity="0.08" />

                    {/* Whoosh speed lines */}
                    <path d="M50 75 Q60 70 70 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2" />
                    <path d="M45 90 Q55 85 65 90" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.18" />
                    <path d="M40 105 Q50 100 60 105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M55 120 Q65 115 75 120" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />

                    {/* Stars in sky */}
                    <path d="M175 40 L177 45 L182 47 L177 49 L175 54 L173 49 L168 47 L173 45 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M150 30 L151 33 L154 34 L151 35 L150 38 L149 35 L146 34 L149 33 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M30 55 L31 58 L34 59 L31 60 L30 63 L29 60 L26 59 L29 58 Z" fill="#3b82f6" opacity="0.12" />

                    {/* Destination dot */}
                    <circle cx="170" cy="60" r="5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="170" cy="60" r="8" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Spring Coil Bouncing */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Spring Bounce</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <ellipse cx="100" cy="110" rx="40" ry="60" fill="#3b82f6" opacity="0.08" />

                    {/* Coil spring - compressed then extended */}
                    <path d="M90 155 Q85 145 90 135 Q95 125 90 115 Q85 105 90 95 Q95 85 90 75 Q85 65 90 55 Q95 45 100 45"
                      stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M110 155 Q115 145 110 135 Q105 125 110 115 Q115 105 110 95 Q105 85 110 75 Q115 65 110 55 Q105 45 100 45"
                      stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                    {/* Top ball bouncing off */}
                    <circle cx="100" cy="30" r="12" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="30" r="8" fill="#3b82f6" />

                    {/* Motion blur above ball */}
                    <circle cx="100" cy="22" r="8" fill="#3b82f6" opacity="0.1" />
                    <circle cx="100" cy="15" r="6" fill="#3b82f6" opacity="0.06" />

                    {/* Base platform */}
                    <rect x="70" y="155" width="60" height="8" rx="3" fill="#3b82f6" opacity="0.25" />
                    <ellipse cx="100" cy="165" rx="35" ry="8" fill="#3b82f6" opacity="0.15" />

                    {/* Stars from bounce impact */}
                    <path d="M95 10 L97 15 L102 17 L97 19 L95 24 L93 19 L88 17 L93 15 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M110 12 L111 15 L114 16 L111 17 L110 20 L109 17 L106 16 L109 15 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Speed lines */}
                    <path d="M85 30 L75 30" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
                    <path d="M115 30 L125 30" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.15" />

                    {/* Decorative springs */}
                    <path d="M65 110 Q60 100 65 90" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />
                    <path d="M135 110 Q140 100 135 90" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />
                  </svg>
                </div>
              </div>

              {/* Gears Interlocking */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Meshing Gears</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Large gear left */}
                    <circle cx="75" cy="100" r="35" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="75" cy="100" r="20" fill="#fff" opacity="0.5" />
                    <circle cx="75" cy="100" r="10" fill="#3b82f6" opacity="0.2" />

                    {/* Gear teeth */}
                    <rect x="73" y="60" width="4" height="8" rx="1" fill="#3b82f6" />
                    <rect x="108" y="98" width="8" height="4" rx="1" fill="#3b82f6" />
                    <rect x="73" y="132" width="4" height="8" rx="1" fill="#3b82f6" />
                    <rect x="38" y="98" width="8" height="4" rx="1" fill="#3b82f6" />

                    {/* Medium gear right */}
                    <circle cx="130" cy="80" r="28" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="130" cy="80" r="16" fill="#fff" opacity="0.5" />
                    <circle cx="130" cy="80" r="8" fill="#3b82f6" opacity="0.25" />

                    {/* Gear teeth */}
                    <rect x="128" y="48" width="4" height="7" rx="1" fill="#3b82f6" />
                    <rect x="156" y="78" width="7" height="4" rx="1" fill="#3b82f6" />
                    <rect x="128" y="105" width="4" height="7" rx="1" fill="#3b82f6" />
                    <rect x="100" y="78" width="7" height="4" rx="1" fill="#3b82f6" />

                    {/* Small gear bottom right */}
                    <circle cx="145" cy="125" r="20" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="145" cy="125" r="12" fill="#fff" opacity="0.4" />
                    <circle cx="145" cy="125" r="6" fill="#3b82f6" opacity="0.3" />

                    {/* Gear teeth small */}
                    <rect x="143" y="102" width="4" height="6" rx="1" fill="#3b82f6" />
                    <rect x="162" y="123" width="6" height="4" rx="1" fill="#3b82f6" />

                    {/* Motion blur arcs */}
                    <path d="M40 100 A 35 35 0 0 1 73 63" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.12" fill="none" />
                    <path d="M103 80 A 28 28 0 0 1 128 52" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" fill="none" />

                    {/* Stars of efficiency */}
                    <path d="M50 70 L52 75 L57 77 L52 79 L50 84 L48 79 L43 77 L48 75 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M160 60 L161 63 L164 64 L161 65 L160 68 L159 65 L156 64 L159 63 Z" fill="#3b82f6" opacity="0.18" />
                  </svg>
                </div>
              </div>

              {/* Speedometer Redline */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Speedometer</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <ellipse cx="100" cy="115" rx="70" ry="55" fill="#3b82f6" opacity="0.1" />

                    {/* Gauge housing */}
                    <path d="M35 130 A 65 65 0 0 1 165 130 Q168 145 165 155 L35 155 Q32 145 35 130 Z"
                      fill="#3b82f6" opacity="0.08" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Speed arc */}
                    <path d="M40 130 A 60 60 0 0 1 160 130" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" opacity="0.12" />
                    <path d="M42 130 A 58 58 0 0 1 158 130" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />

                    {/* Tick marks */}
                    <line x1="45" y1="125" x2="50" y2="118" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
                    <line x1="60" y1="88" x2="66" y2="83" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
                    <line x1="95" y1="68" x2="99" y2="61" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
                    <line x1="135" y1="88" x2="139" y2="83" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
                    <line x1="150" y1="120" x2="155" y2="127" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

                    {/* Needle pointing max */}
                    <path d="M100 130 Q120 95 145 70" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="100" cy="130" r="10" fill="#3b82f6" />
                    <circle cx="100" cy="130" r="6" fill="#fff" opacity="0.5" />
                    <circle cx="100" cy="130" r="3" fill="#3b82f6" />

                    {/* Speed burst at needle tip */}
                    <circle cx="145" cy="70" r="12" fill="#3b82f6" opacity="0.2" />
                    <circle cx="145" cy="70" r="18" fill="#3b82f6" opacity="0.12" />

                    {/* Motion whoosh arcs */}
                    <path d="M125 85 Q135 75 145 80" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.22" />
                    <path d="M130 92 Q140 82 150 87" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.18" />

                    {/* Stars flying */}
                    <path d="M160 58 L162 64 L168 66 L162 68 L160 74 L158 68 L152 66 L158 64 Z" fill="#3b82f6" opacity="0.28" />
                    <path d="M175 72 L176 76 L180 77 L176 78 L175 82 L174 78 L170 77 L174 76 Z" fill="#3b82f6" opacity="0.22" />
                  </svg>
                </div>
              </div>

              {/* Catapult Launch */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Catapult</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Base platform */}
                    <rect x="50" y="135" width="80" height="15" rx="3" fill="#3b82f6" opacity="0.2" />
                    <rect x="45" y="150" width="90" height="8" rx="2" fill="#3b82f6" opacity="0.15" />

                    {/* Catapult arm - bent back */}
                    <path d="M85 135 Q75 110 70 85 Q68 70 75 60" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
                    <path d="M85 135 Q75 110 70 85 Q68 70 75 60" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

                    {/* Spoon/basket at end */}
                    <ellipse cx="75" cy="55" rx="12" ry="10" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />

                    {/* Projectile being launched */}
                    <circle cx="75" cy="50" r="6" fill="#3b82f6" />
                    <circle cx="75" cy="50" r="3" fill="#fff" opacity="0.5" />

                    {/* Launch trajectory arc */}
                    <path d="M75 50 Q100 30 130 40 Q150 50 165 70" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" opacity="0.2" />

                    {/* Projectile at peak */}
                    <circle cx="130" cy="35" r="5" fill="#3b82f6" opacity="0.3" />
                    <circle cx="130" cy="35" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />

                    {/* Impact star at destination */}
                    <circle cx="165" cy="70" r="10" fill="#3b82f6" opacity="0.2" />
                    <path d="M165 70 L167 75 L172 77 L167 79 L165 84 L163 79 L158 77 L163 75 Z" fill="#3b82f6" opacity="0.3" />

                    {/* Tension springs */}
                    <path d="M80 140 Q75 135 70 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                    <path d="M90 140 Q85 135 80 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" />

                    {/* Stars around */}
                    <path d="M130 25 L132 30 L137 32 L132 34 L130 39 L128 34 L123 32 L128 30 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M175 65 L176 68 L179 69 L176 70 L175 73 L174 70 L171 69 L174 68 Z" fill="#3b82f6" opacity="0.18" />

                    {/* Ground squiggle */}
                    <path d="M40 162 Q70 158 100 162 Q130 166 160 162" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />
                  </svg>
                </div>
              </div>

              {/* Domino Chain */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Domino Effect</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Dominoes in sequence - falling progression */}
                    <rect x="30" y="110" width="12" height="40" rx="2" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="36" cy="125" r="2.5" fill="#fff" opacity="0.6" />
                    <circle cx="36" cy="140" r="2.5" fill="#fff" opacity="0.6" />

                    <rect x="50" y="115" width="12" height="40" rx="2" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2" transform="rotate(-8 56 135)" />
                    <circle cx="56" cy="130" r="2.5" fill="#fff" opacity="0.6" />
                    <circle cx="56" cy="145" r="2.5" fill="#fff" opacity="0.6" />

                    <rect x="70" y="120" width="12" height="40" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" transform="rotate(-18 76 140)" />
                    <circle cx="76" cy="135" r="2.5" fill="#fff" opacity="0.6" />

                    <rect x="90" y="125" width="12" height="40" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" transform="rotate(-30 96 145)" />
                    <circle cx="96" cy="140" r="2.5" fill="#fff" opacity="0.5" />

                    <rect x="110" y="130" width="12" height="40" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" transform="rotate(-45 116 150)" />

                    {/* Last domino mid-fall */}
                    <rect x="130" y="125" width="12" height="40" rx="2" fill="#3b82f6" opacity="0.18" stroke="#3b82f6" strokeWidth="2" transform="rotate(-60 136 145)" />

                    {/* Impact waves */}
                    <circle cx="120" cy="155" r="15" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <circle cx="120" cy="155" r="22" stroke="#3b82f6" strokeWidth="1" opacity="0.1" />

                    {/* Stars of chain reaction */}
                    <path d="M35 95 L37 100 L42 102 L37 104 L35 109 L33 104 L28 102 L33 100 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M155 115 L157 120 L162 122 L157 124 L155 129 L153 124 L148 122 L153 120 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Motion lines */}
                    <path d="M25 125 L20 125" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
                    <path d="M25 135 L18 135" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.12" />

                    {/* Decorative squiggle */}
                    <path d="M150 145 Q160 140 170 145" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.12" />
                  </svg>
                </div>
              </div>

              {/* Prism Rainbow */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Prism Split</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Prism triangle */}
                    <path d="M95 60 L120 100 L95 140 Z" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M98 70 L115 100 L98 130 Z" fill="#fff" opacity="0.4" />

                    {/* Light beam entering from left */}
                    <rect x="30" y="96" width="65" height="8" fill="#3b82f6" opacity="0.15" />
                    <path d="M30 100 L95 100" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                    {/* Light source */}
                    <circle cx="25" cy="100" r="8" fill="#3b82f6" opacity="0.2" />
                    <circle cx="25" cy="100" r="5" fill="#3b82f6" />
                    <circle cx="25" cy="100" r="12" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />

                    {/* Spectrum rays exiting - multiple beams */}
                    <path d="M120 100 L165 85" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
                    <path d="M120 100 L170 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                    <path d="M120 100 L175 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <path d="M120 100 L170 105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                    <path d="M120 100 L165 115" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

                    {/* Ray spread glow */}
                    <circle cx="150" cy="100" r="35" fill="#3b82f6" opacity="0.08" />

                    {/* Stars at ray ends */}
                    <path d="M165 80 L167 85 L172 87 L167 89 L165 94 L163 89 L158 87 L163 85 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M175 100 L177 105 L182 107 L177 109 L175 114 L173 109 L168 107 L173 105 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M165 120 L166 123 L169 124 L166 125 L165 128 L164 125 L161 124 L164 123 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Decorative rays */}
                    <circle cx="175" cy="92" r="2" fill="#3b82f6" opacity="0.2" />
                    <circle cx="180" cy="100" r="2.5" fill="#3b82f6" opacity="0.18" />
                    <circle cx="175" cy="108" r="2" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Hot Air Balloon Rising */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Hot Air Balloon</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Balloon envelope - striped */}
                    <ellipse cx="100" cy="70" rx="35" ry="42" fill="#3b82f6" opacity="0.1" stroke="#3b82f6" strokeWidth="2.5" />
                    <ellipse cx="100" cy="68" rx="30" ry="37" fill="#fff" opacity="0.5" />

                    {/* Vertical stripes */}
                    <path d="M100 28 Q105 55 100 110" stroke="#3b82f6" strokeWidth="2" opacity="0.25" />
                    <path d="M85 35 Q88 55 90 105" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                    <path d="M115 35 Q112 55 110 105" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />

                    {/* Basket */}
                    <rect x="88" y="110" width="24" height="18" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="92" y1="115" x2="92" y2="125" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
                    <line x1="100" y1="115" x2="100" y2="125" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
                    <line x1="108" y1="115" x2="108" y2="125" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />

                    {/* Ropes connecting */}
                    <path d="M90 110 L72 110" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    <path d="M110 110 L128 110" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

                    {/* Burner flame */}
                    <path d="M96 108 L98 102 L100 108 L102 102 L104 108" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
                    <ellipse cx="100" cy="104" rx="5" ry="7" fill="#3b82f6" opacity="0.2" />

                    {/* Clouds below */}
                    <ellipse cx="60" cy="145" rx="20" ry="10" fill="#3b82f6" opacity="0.08" />
                    <ellipse cx="140" cy="150" rx="25" ry="12" fill="#3b82f6" opacity="0.08" />
                    <ellipse cx="100" cy="160" rx="18" ry="9" fill="#3b82f6" opacity="0.08" />

                    {/* Stars above */}
                    <path d="M100 18 L102 23 L107 25 L102 27 L100 32 L98 27 L93 25 L98 23 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M75 35 L76 38 L79 39 L76 40 L75 43 L74 40 L71 39 L74 38 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M125 35 L126 38 L129 39 L126 40 L125 43 L124 40 L121 39 L124 38 Z" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* DNA Helix */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">DNA Helix</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Double helix strands */}
                    <path d="M75 30 Q65 50 75 70 Q85 90 75 110 Q65 130 75 150 Q85 170 75 190"
                      stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M125 30 Q135 50 125 70 Q115 90 125 110 Q135 130 125 150 Q115 170 125 190"
                      stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />

                    {/* Connecting base pairs */}
                    <line x1="75" y1="40" x2="125" y2="40" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <line x1="75" y1="60" x2="125" y2="60" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <line x1="75" y1="80" x2="125" y2="80" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <line x1="75" y1="100" x2="125" y2="100" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <line x1="75" y1="120" x2="125" y2="120" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <line x1="75" y1="140" x2="125" y2="140" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <line x1="75" y1="160" x2="125" y2="160" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />

                    {/* Nodes at strand intersections */}
                    <circle cx="75" cy="40" r="4" fill="#3b82f6" />
                    <circle cx="125" cy="40" r="4" fill="#3b82f6" />
                    <circle cx="75" cy="80" r="4" fill="#3b82f6" />
                    <circle cx="125" cy="80" r="4" fill="#3b82f6" />
                    <circle cx="75" cy="120" r="4" fill="#3b82f6" />
                    <circle cx="125" cy="120" r="4" fill="#3b82f6" />
                    <circle cx="75" cy="160" r="4" fill="#3b82f6" />
                    <circle cx="125" cy="160" r="4" fill="#3b82f6" />

                    {/* Glow around helix */}
                    <ellipse cx="100" cy="100" rx="45" ry="80" fill="#3b82f6" opacity="0.05" />

                    {/* Stars */}
                    <path d="M50 100 L52 105 L57 107 L52 109 L50 114 L48 109 L43 107 L48 105 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M150 100 L152 105 L157 107 L152 109 L150 114 L148 109 L143 107 L148 105 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Sparkles */}
                    <circle cx="60" cy="60" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="140" cy="140" r="2" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Fishing Hook Catch */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Hook & Catch</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Fishing line from top */}
                    <path d="M100 20 L100 110" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
                    <path d="M100 20 L102 110" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />

                    {/* Fishing hook */}
                    <path d="M100 110 Q100 125 110 130 Q115 132 115 125 Q115 120 110 120"
                      stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <circle cx="110" cy="123" r="3" fill="#3b82f6" />

                    {/* Fish caught on hook */}
                    <ellipse cx="120" cy="125" rx="18" ry="12" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="132" cy="123" r="3" fill="#3b82f6" opacity="0.4" />
                    <circle cx="132" cy="123" r="1.5" fill="#fff" opacity="0.6" />
                    <path d="M138 125 L148 120 L145 125 L148 130 Z" fill="#3b82f6" opacity="0.3" />

                    {/* Bubbles rising */}
                    <circle cx="135" cy="145" r="4" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <circle cx="145" cy="155" r="3.5" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.12" />
                    <circle cx="125" cy="155" r="3" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.12" />
                    <circle cx="140" cy="165" r="2.5" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.1" />

                    {/* Water waves */}
                    <path d="M30 160 Q55 155 80 160 Q105 165 130 160 Q155 155 180 160" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.2" />
                    <path d="M35 170 Q60 165 85 170 Q110 175 135 170 Q160 165 185 170" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Reel at top */}
                    <circle cx="100" cy="20" r="8" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="20" r="4" fill="#3b82f6" />

                    {/* Stars of success */}
                    <path d="M75 100 L77 105 L82 107 L77 109 L75 114 L73 109 L68 107 L73 105 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M155 105 L156 108 L159 109 L156 110 L155 113 L154 110 L151 109 L154 108 Z" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Firework Burst */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Firework</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Central burst point */}
                    <circle cx="100" cy="80" r="12" fill="#3b82f6" />
                    <circle cx="100" cy="80" r="8" fill="#fff" opacity="0.5" />
                    <circle cx="100" cy="80" r="20" fill="#3b82f6" opacity="0.2" />
                    <circle cx="100" cy="80" r="28" fill="#3b82f6" opacity="0.12" />

                    {/* Radiating bursts - 8 directions */}
                    <path d="M100 80 L100 40" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="100" cy="40" r="4" fill="#3b82f6" opacity="0.4" />

                    <path d="M100 80 L130 50" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="130" cy="50" r="4" fill="#3b82f6" opacity="0.4" />

                    <path d="M100 80 L140 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="140" cy="75" r="3.5" fill="#3b82f6" opacity="0.35" />

                    <path d="M100 80 L135 105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="135" cy="105" r="3.5" fill="#3b82f6" opacity="0.35" />

                    <path d="M100 80 L70 50" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="70" cy="50" r="4" fill="#3b82f6" opacity="0.4" />

                    <path d="M100 80 L60 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="60" cy="75" r="3.5" fill="#3b82f6" opacity="0.35" />

                    <path d="M100 80 L65 105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="65" cy="105" r="3.5" fill="#3b82f6" opacity="0.35" />

                    <path d="M100 80 L100 115" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="100" cy="115" r="3" fill="#3b82f6" opacity="0.3" />

                    {/* Trailing sparks on each burst */}
                    <circle cx="100" cy="35" r="2.5" fill="#3b82f6" opacity="0.25" />
                    <circle cx="135" cy="45" r="2.5" fill="#3b82f6" opacity="0.25" />
                    <circle cx="145" cy="75" r="2" fill="#3b82f6" opacity="0.2" />
                    <circle cx="65" cy="45" r="2.5" fill="#3b82f6" opacity="0.25" />
                    <circle cx="55" cy="75" r="2" fill="#3b82f6" opacity="0.2" />

                    {/* Stars everywhere */}
                    <path d="M95 30 L97 35 L102 37 L97 39 L95 44 L93 39 L88 37 L93 35 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M140 60 L141 63 L144 64 L141 65 L140 68 L139 65 L136 64 L139 63 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M60 60 L61 63 L64 64 L61 65 L60 68 L59 65 L56 64 L59 63 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Launch trail from bottom */}
                    <path d="M100 140 L100 160" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.2" strokeDasharray="3 2" />
                  </svg>
                </div>
              </div>

              {/* Skateboard Kickflip */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Kickflip</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Skateboard deck - mid rotation */}
                    <ellipse cx="100" cy="90" rx="40" ry="12" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(-25 100 90)" />
                    <ellipse cx="100" cy="90" rx="35" ry="8" fill="#fff" opacity="0.5" transform="rotate(-25 100 90)" />

                    {/* Deck detail lines */}
                    <line x1="75" y1="85" x2="80" y2="78" stroke="#3b82f6" strokeWidth="1" opacity="0.3" transform="rotate(-25 77.5 81.5)" />
                    <line x1="95" y1="90" x2="105" y2="90" stroke="#3b82f6" strokeWidth="1" opacity="0.3" transform="rotate(-25 100 90)" />

                    {/* Wheels spinning */}
                    <circle cx="75" cy="95" r="6" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" transform="rotate(-25 100 90)" />
                    <circle cx="125" cy="85" r="6" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" transform="rotate(-25 100 90)" />

                    {/* Motion blur circles */}
                    <ellipse cx="100" cy="90" rx="40" ry="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" transform="rotate(-35 100 90)" />
                    <ellipse cx="100" cy="90" rx="40" ry="12" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.1" transform="rotate(-15 100 90)" />

                    {/* Stick figure in mid-air */}
                    <circle cx="105" cy="60" r="6" fill="#3b82f6" />
                    <path d="M105 66 L105 80" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M100 72 L85 68" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M110 72 L125 68" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M105 80 L95 92" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M105 80 L115 92" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Ground/ramp */}
                    <path d="M30 140 L80 135 L180 150" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="105" cy="147" rx="80" ry="8" fill="#3b82f6" opacity="0.12" />

                    {/* Stars of style */}
                    <path d="M130 50 L132 55 L137 57 L132 59 L130 64 L128 59 L123 57 L128 55 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M75 55 L76 58 L79 59 L76 60 L75 63 L74 60 L71 59 L74 58 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Speed swooshes */}
                    <path d="M55 85 Q60 80 65 85" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M50 95 Q55 90 60 95" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Volcano Erupting */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Volcano</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />
                    <circle cx="100" cy="70" r="50" fill="#3b82f6" opacity="0.1" />

                    {/* Mountain/volcano base */}
                    <path d="M30 150 L70 100 L80 110 L100 80 L120 110 L130 100 L170 150 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M30 150 L70 100 L80 110 L100 80 L120 110 L130 100 L170 150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                    {/* Crater at top */}
                    <ellipse cx="100" cy="80" rx="20" ry="8" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" />

                    {/* Lava/knowledge erupting */}
                    <path d="M100 80 Q95 55 90 35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="90" cy="35" r="5" fill="#3b82f6" opacity="0.4" />

                    <path d="M100 80 Q100 60 100 30" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="100" cy="30" r="6" fill="#3b82f6" opacity="0.45" />

                    <path d="M100 80 Q105 55 110 35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="110" cy="35" r="5" fill="#3b82f6" opacity="0.4" />

                    {/* Smaller eruption bits */}
                    <path d="M95 78 Q92 65 88 55" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="88" cy="55" r="3" fill="#3b82f6" opacity="0.3" />

                    <path d="M105 78 Q108 65 112 55" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="112" cy="55" r="3" fill="#3b82f6" opacity="0.3" />

                    {/* Smoke puffs */}
                    <ellipse cx="85" cy="45" rx="8" ry="10" fill="#3b82f6" opacity="0.12" />
                    <ellipse cx="100" cy="40" rx="10" ry="12" fill="#3b82f6" opacity="0.15" />
                    <ellipse cx="115" cy="45" rx="8" ry="10" fill="#3b82f6" opacity="0.12" />

                    {/* Stars exploding */}
                    <path d="M85 25 L87 30 L92 32 L87 34 L85 39 L83 34 L78 32 L83 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M115 25 L117 30 L122 32 L117 34 L115 39 L113 34 L108 32 L113 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M100 18 L102 23 L107 25 L102 27 L100 32 L98 27 L93 25 L98 23 Z" fill="#3b82f6" opacity="0.28" />

                    {/* Ground squiggle */}
                    <path d="M25 155 Q62 150 100 155 Q138 160 175 155" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Slingshot Pull */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Slingshot</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Y-shaped frame */}
                    <path d="M50 140 L65 100 L70 70" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
                    <path d="M50 140 L65 100 L70 70" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <circle cx="70" cy="70" r="6" fill="#3b82f6" opacity="0.3" />

                    <path d="M150 140 L135 100 L130 70" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
                    <path d="M150 140 L135 100 L130 70" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <circle cx="130" cy="70" r="6" fill="#3b82f6" opacity="0.3" />

                    {/* Elastic band stretched */}
                    <path d="M70 70 Q90 95 100 110 Q110 95 130 70" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M70 70 Q90 95 100 110 Q110 95 130 70" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

                    {/* Projectile ready to launch */}
                    <circle cx="100" cy="110" r="8" fill="#3b82f6" />
                    <circle cx="100" cy="110" r="5" fill="#fff" opacity="0.5" />
                    <circle cx="100" cy="110" r="12" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2" />

                    {/* Trajectory prediction */}
                    <path d="M100 110 Q105 70 115 30" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" opacity="0.2" />

                    {/* Target at destination */}
                    <circle cx="115" cy="30" r="8" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.25" />
                    <circle cx="115" cy="30" r="4" fill="#3b82f6" opacity="0.3" />

                    {/* Tension stars */}
                    <path d="M85 85 L87 90 L92 92 L87 94 L85 99 L83 94 L78 92 L83 90 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M115 85 L117 90 L122 92 L117 94 L115 99 L113 94 L108 92 L113 90 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Base platforms */}
                    <ellipse cx="50" cy="145" rx="15" ry="8" fill="#3b82f6" opacity="0.15" />
                    <ellipse cx="150" cy="145" rx="15" ry="8" fill="#3b82f6" opacity="0.15" />

                    {/* Destination star */}
                    <path d="M115 20 L117 25 L122 27 L117 29 L115 34 L113 29 L108 27 L113 25 Z" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Code Function Blocks */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Code Functions</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Code window/editor */}
                    <rect x="50" y="55" width="100" height="90" rx="6" fill="#3b82f6" opacity="0.08" stroke="#3b82f6" strokeWidth="2.5" />
                    <rect x="50" y="55" width="100" height="20" rx="6" fill="#3b82f6" opacity="0.15" />

                    {/* Window dots */}
                    <circle cx="60" cy="65" r="3" fill="#3b82f6" opacity="0.3" />
                    <circle cx="70" cy="65" r="3" fill="#3b82f6" opacity="0.3" />
                    <circle cx="80" cy="65" r="3" fill="#3b82f6" opacity="0.3" />

                    {/* Code brackets - functional composition */}
                    <path d="M70 85 L65 90 L65 100 L70 105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M130 85 L135 90 L135 100 L130 105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                    {/* Function name */}
                    <rect x="75" y="88" width="50" height="6" rx="2" fill="#3b82f6" opacity="0.35" />

                    {/* Nested functions - composition */}
                    <path d="M80 100 L75 105 L75 115 L80 120" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
                    <path d="M120 100 L125 105 L125 115 L120 120" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
                    <rect x="85" y="108" width="30" height="4" rx="1" fill="#3b82f6" opacity="0.4" />

                    {/* Arrow showing transformation */}
                    <path d="M155 100 L175 100" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M170 95 L175 100 L170 105" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                    {/* Output/result */}
                    <circle cx="185" cy="100" r="12" fill="#3b82f6" opacity="0.2" />
                    <circle cx="185" cy="100" r="8" fill="#3b82f6" />
                    <path d="M182 98 L184 101 L189 96" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Stars of clarity */}
                    <path d="M100 40 L102 45 L107 47 L102 49 L100 54 L98 49 L93 47 L98 45 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M180 85 L181 88 L184 89 L181 90 L180 93 L179 90 L176 89 L179 88 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Decorative lines */}
                    <line x1="60" y1="130" x2="85" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2" />
                    <circle cx="68" cy="130" r="2" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Building Blocks Stacking */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">LEGO Blocks</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Base blocks foundation */}
                    <rect x="60" y="130" width="30" height="25" rx="3" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="70" cy="138" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="80" cy="138" r="3" fill="#fff" opacity="0.6" />

                    <rect x="95" y="130" width="30" height="25" rx="3" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="105" cy="138" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="115" cy="138" r="3" fill="#fff" opacity="0.6" />

                    <rect x="130" y="130" width="30" height="25" rx="3" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="140" cy="138" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="150" cy="138" r="3" fill="#fff" opacity="0.6" />

                    {/* Second layer */}
                    <rect x="75" y="100" width="35" height="25" rx="3" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="85" cy="108" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="100" cy="108" r="3" fill="#fff" opacity="0.6" />

                    <rect x="115" y="100" width="35" height="25" rx="3" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="125" cy="108" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="140" cy="108" r="3" fill="#fff" opacity="0.6" />

                    {/* Third layer */}
                    <rect x="95" y="70" width="40" height="25" rx="3" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="107" cy="78" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="123" cy="78" r="3" fill="#fff" opacity="0.6" />

                    {/* Top piece glowing */}
                    <rect x="105" y="45" width="28" height="20" rx="3" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="114" cy="53" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="124" cy="53" r="3" fill="#fff" opacity="0.6" />
                    <circle cx="119" cy="55" r="15" fill="#3b82f6" opacity="0.15" />

                    {/* Connection indicators */}
                    <circle cx="92" cy="95" r="2.5" fill="#3b82f6" opacity="0.4" />
                    <circle cx="132" cy="95" r="2.5" fill="#3b82f6" opacity="0.4" />
                    <circle cx="110" cy="65" r="2.5" fill="#3b82f6" opacity="0.4" />

                    {/* Stars of construction */}
                    <path d="M119 30 L121 35 L126 37 L121 39 L119 44 L117 39 L112 37 L117 35 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M50 110 L51 113 L54 114 L51 115 L50 118 L49 115 L46 114 L49 113 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M170 110 L171 113 L174 114 L171 115 L170 118 L169 115 L166 114 L169 113 Z" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Neural Network Nodes */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Neural Network</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Input layer - 3 nodes */}
                    <circle cx="40" cy="70" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="40" cy="70" r="4" fill="#3b82f6" />

                    <circle cx="40" cy="100" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="40" cy="100" r="4" fill="#3b82f6" />

                    <circle cx="40" cy="130" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="40" cy="130" r="4" fill="#3b82f6" />

                    {/* Hidden layer - 4 nodes */}
                    <circle cx="100" cy="60" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="60" r="5" fill="#3b82f6" />

                    <circle cx="100" cy="90" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="90" r="5" fill="#3b82f6" />

                    <circle cx="100" cy="110" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="110" r="5" fill="#3b82f6" />

                    <circle cx="100" cy="140" r="10" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="140" r="5" fill="#3b82f6" />

                    {/* Output layer - 2 nodes */}
                    <circle cx="160" cy="85" r="12" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="160" cy="85" r="6" fill="#3b82f6" />
                    <circle cx="160" cy="85" r="3" fill="#fff" opacity="0.5" />

                    <circle cx="160" cy="115" r="12" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="160" cy="115" r="6" fill="#3b82f6" />
                    <circle cx="160" cy="115" r="3" fill="#fff" opacity="0.5" />

                    {/* Connections - selective to avoid clutter */}
                    <line x1="48" y1="70" x2="92" y2="60" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <line x1="48" y1="100" x2="92" y2="90" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <line x1="48" y1="100" x2="92" y2="110" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />
                    <line x1="48" y1="130" x2="92" y2="140" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" />

                    <line x1="108" y1="60" x2="152" y2="85" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                    <line x1="108" y1="90" x2="152" y2="85" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                    <line x1="108" y1="110" x2="152" y2="115" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                    <line x1="108" y1="140" x2="152" y2="115" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />

                    {/* Stars */}
                    <path d="M100 30 L102 35 L107 37 L102 39 L100 44 L98 39 L93 37 L98 35 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M175 100 L176 103 L179 104 L176 105 L175 108 L174 105 L171 104 L174 103 Z" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Memory Consolidation */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Memory Waves</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Brain silhouette simple */}
                    <ellipse cx="100" cy="90" rx="45" ry="50" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Memory wave patterns - EEG style */}
                    <path d="M70 75 Q75 70 80 75 Q85 80 90 75 Q95 70 100 75 Q105 80 110 75 Q115 70 120 75 Q125 80 130 75"
                      stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    <path d="M70 90 Q75 85 80 90 Q85 95 90 90 Q95 85 100 90 Q105 95 110 90 Q115 85 120 90 Q125 95 130 90"
                      stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

                    <path d="M70 105 Q75 100 80 105 Q85 110 90 105 Q95 100 100 105 Q105 110 110 105 Q115 100 120 105 Q125 110 130 105"
                      stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

                    {/* Synaptic connections - dots */}
                    <circle cx="85" cy="75" r="3" fill="#3b82f6" opacity="0.4" />
                    <circle cx="100" cy="75" r="3" fill="#3b82f6" opacity="0.4" />
                    <circle cx="115" cy="75" r="3" fill="#3b82f6" opacity="0.4" />

                    {/* Energy bursts */}
                    <circle cx="85" cy="75" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />
                    <circle cx="100" cy="75" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />
                    <circle cx="115" cy="75" r="8" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />

                    {/* Stars of consolidation */}
                    <path d="M100 50 L102 55 L107 57 L102 59 L100 64 L98 59 L93 57 L98 55 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M65 85 L66 88 L69 89 L66 90 L65 93 L64 90 L61 89 L64 88 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M135 85 L136 88 L139 89 L136 90 L135 93 L134 90 L131 89 L134 88 Z" fill="#3b82f6" opacity="0.18" />

                    {/* Base squiggle */}
                    <path d="M60 145 Q80 140 100 145 Q120 150 140 145" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Frequency Bars Chart */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Frequency Bars</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Base line */}
                    <line x1="35" y1="150" x2="165" y2="150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Frequency bars - decreasing heights (Zipf's law) */}
                    <rect x="40" y="50" width="14" height="100" rx="3" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="47" cy="60" r="2.5" fill="#fff" opacity="0.6" />

                    <rect x="60" y="70" width="14" height="80" rx="3" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="67" cy="80" r="2.5" fill="#fff" opacity="0.6" />

                    <rect x="80" y="85" width="14" height="65" rx="3" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="87" cy="95" r="2.5" fill="#fff" opacity="0.5" />

                    <rect x="100" y="100" width="14" height="50" rx="3" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="107" cy="110" r="2.5" fill="#fff" opacity="0.5" />

                    <rect x="120" y="110" width="14" height="40" rx="3" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />

                    <rect x="140" y="120" width="14" height="30" rx="3" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" />

                    {/* Highlight first 3 (top frequency) */}
                    <rect x="38" y="45" width="18" height="8" rx="2" fill="#3b82f6" opacity="0.2" />
                    <rect x="58" y="65" width="18" height="8" rx="2" fill="#3b82f6" opacity="0.18" />
                    <rect x="78" y="80" width="18" height="8" rx="2" fill="#3b82f6" opacity="0.15" />

                    {/* Stars above top bars */}
                    <path d="M47 35 L49 40 L54 42 L49 44 L47 49 L45 44 L40 42 L45 40 Z" fill="#3b82f6" opacity="0.28" />
                    <path d="M67 55 L69 60 L74 62 L69 64 L67 69 L65 64 L60 62 L65 60 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M87 70 L88 73 L91 74 L88 75 L87 78 L86 75 L83 74 L86 73 Z" fill="#3b82f6" opacity="0.22" />

                    {/* Decorative axis labels */}
                    <circle cx="30" cy="150" r="3" fill="#3b82f6" opacity="0.25" />
                    <circle cx="170" cy="150" r="3" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Schema Blueprint */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Schema Blueprint</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Blueprint grid background */}
                    <line x1="50" y1="50" x2="150" y2="50" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="50" y1="70" x2="150" y2="70" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="50" y1="90" x2="150" y2="90" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="50" y1="110" x2="150" y2="110" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="50" y1="130" x2="150" y2="130" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />

                    <line x1="60" y1="40" x2="60" y2="140" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="80" y1="40" x2="80" y2="140" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="100" y1="40" x2="100" y2="140" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="120" y1="40" x2="120" y2="140" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
                    <line x1="140" y1="40" x2="140" y2="140" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />

                    {/* Main structure/schema */}
                    <rect x="70" y="60" width="60" height="70" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Internal divisions - schema components */}
                    <line x1="70" y1="85" x2="130" y2="85" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
                    <line x1="70" y1="105" x2="130" y2="105" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
                    <line x1="100" y1="60" x2="100" y2="130" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />

                    {/* Component labels (abstract) */}
                    <rect x="75" y="65" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.35" />
                    <rect x="105" y="65" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.35" />
                    <rect x="75" y="90" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.3" />
                    <rect x="105" y="90" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.3" />
                    <rect x="75" y="110" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.3" />
                    <rect x="105" y="110" width="20" height="4" rx="1" fill="#3b82f6" opacity="0.3" />

                    {/* Corner measurement marks */}
                    <path d="M65 55 L70 55 L70 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                    <path d="M135 55 L130 55 L130 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />

                    {/* Compass/drafting tool */}
                    <circle cx="145" cy="115" r="8" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.25" />
                    <path d="M145 107 L145 95" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.25" />

                    {/* Stars */}
                    <path d="M100 35 L102 40 L107 42 L102 44 L100 49 L98 44 L93 42 L98 40 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M155 145 L156 148 L159 149 L156 150 L155 153 L154 150 L151 149 L154 148 Z" fill="#3b82f6" opacity="0.18" />
                  </svg>
                </div>
              </div>

              {/* Interleaved Cards */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Interleaved Deck</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Stack of cards - fanned out */}
                    <rect x="70" y="90" width="50" height="70" rx="4" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2" transform="rotate(-12 95 125)" />

                    <rect x="75" y="88" width="50" height="70" rx="4" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" transform="rotate(-6 100 123)" />

                    <rect x="80" y="86" width="50" height="70" rx="4" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" transform="rotate(0 105 121)" />
                    <line x1="85" y1="95" x2="120" y2="95" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
                    <line x1="85" y1="105" x2="115" y2="105" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
                    <line x1="85" y1="115" x2="110" y2="115" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />

                    <rect x="85" y="84" width="50" height="70" rx="4" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" transform="rotate(6 110 119)" />

                    <rect x="90" y="82" width="50" height="70" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(12 115 117)" />
                    <line x1="98" y1="95" x2="128" y2="100" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" transform="rotate(12 113 97.5)" />
                    <line x1="98" y1="105" x2="123" y2="109" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" transform="rotate(12 110.5 107)" />

                    {/* Shuffle motion arcs */}
                    <path d="M60 100 Q65 90 70 100" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />
                    <path d="M140 110 Q145 100 150 110" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Stars of randomization */}
                    <path d="M115 65 L117 70 L122 72 L117 74 L115 79 L113 74 L108 72 L113 70 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M55 95 L56 98 L59 99 L56 100 L55 103 L54 100 L51 99 L54 98 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M145 115 L146 118 L149 119 L146 120 L145 123 L144 120 L141 119 L144 118 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Decorative corner */}
                    <circle cx="100" cy="160" r="3" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Shield Protection (No Anxiety) */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Shield Guard</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Shield shape */}
                    <path d="M100 40 L140 60 L145 100 Q145 130 100 155 Q55 130 55 100 L60 60 Z"
                      fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M100 45 L135 63 L140 100 Q140 125 100 148 Q60 125 60 100 L65 63 Z"
                      fill="#fff" opacity="0.5" />

                    {/* Checkmark in center - protected/safe */}
                    <path d="M85 95 L95 105 L120 75" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="100" cy="95" r="25" fill="#3b82f6" opacity="0.08" />

                    {/* Shield segments/panels */}
                    <line x1="100" y1="45" x2="100" y2="148" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2" />
                    <path d="M68 75 Q100 65 132 75" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2" fill="none" />
                    <path d="M62 105 Q100 95 138 105" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2" fill="none" />

                    {/* Deflecting threats - bouncing off */}
                    <path d="M40 85 L52 88" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <circle cx="38" cy="85" r="4" fill="#3b82f6" opacity="0.25" />

                    <path d="M160 90 L148 93" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
                    <circle cx="162" cy="90" r="4" fill="#3b82f6" opacity="0.25" />

                    {/* Stars of protection */}
                    <path d="M100 25 L102 30 L107 32 L102 34 L100 39 L98 34 L93 32 L98 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M50 100 L51 103 L54 104 L51 105 L50 108 L49 105 L46 104 L49 103 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M150 100 L151 103 L154 104 L151 105 L150 108 L149 105 L146 104 L149 103 Z" fill="#3b82f6" opacity="0.18" />
                  </svg>
                </div>
              </div>

              {/* Compounding Interest Graph */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Compound Growth</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Axes */}
                    <line x1="30" y1="150" x2="170" y2="150" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="30" y1="150" x2="30" y2="50" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Exponential curve */}
                    <path d="M35 145 Q50 140 65 130 Q80 115 95 90 Q110 60 130 40 Q145 25 165 20"
                      stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                    {/* Fill under curve */}
                    <path d="M35 145 Q50 140 65 130 Q80 115 95 90 Q110 60 130 40 Q145 25 165 20 L165 150 L35 150 Z"
                      fill="#3b82f6" opacity="0.08" />

                    {/* Milestone dots on curve */}
                    <circle cx="50" cy="138" r="4" fill="#3b82f6" opacity="0.35" />
                    <circle cx="75" cy="120" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="100" cy="85" r="5" fill="#3b82f6" opacity="0.45" />
                    <circle cx="130" cy="40" r="6" fill="#3b82f6" />
                    <circle cx="130" cy="40" r="3" fill="#fff" opacity="0.5" />

                    {/* Growth rings around endpoint */}
                    <circle cx="165" cy="20" r="12" fill="#3b82f6" opacity="0.2" />
                    <circle cx="165" cy="20" r="18" fill="#3b82f6" opacity="0.12" />
                    <circle cx="165" cy="20" r="8" fill="#3b82f6" />

                    {/* Stars of compounding */}
                    <path d="M165 10 L167 15 L172 17 L167 19 L165 24 L163 19 L158 17 L163 15 Z" fill="#3b82f6" opacity="0.28" />
                    <path d="M145 35 L146 38 L149 39 L146 40 L145 43 L144 40 L141 39 L144 38 Z" fill="#3b82f6" opacity="0.22" />
                    <path d="M110 65 L111 68 L114 69 L111 70 L110 73 L109 70 L106 69 L109 68 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Axis labels (abstract) */}
                    <circle cx="25" cy="150" r="3" fill="#3b82f6" opacity="0.25" />
                    <circle cx="170" cy="155" r="3" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Reading Book Open */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Reading Passage</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Open book - two pages */}
                    <path d="M100 70 Q95 110 90 145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M100 70 Q105 110 110 145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* Left page */}
                    <path d="M50 75 Q70 68 90 75 L90 145 Q70 138 50 145 Z" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2" />

                    {/* Right page */}
                    <path d="M110 75 Q130 68 150 75 L150 145 Q130 138 110 145 Z" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2" />

                    {/* Text lines - left page */}
                    <line x1="58" y1="85" x2="82" y2="85" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
                    <line x1="58" y1="95" x2="80" y2="95" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
                    <line x1="58" y1="105" x2="78" y2="105" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
                    <line x1="58" y1="115" x2="82" y2="115" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
                    <line x1="58" y1="125" x2="75" y2="125" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />

                    {/* Text lines - right page */}
                    <line x1="118" y1="85" x2="142" y2="85" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" />
                    <line x1="118" y1="95" x2="140" y2="95" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" />
                    <line x1="118" y1="105" x2="138" y2="105" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" />
                    <line x1="118" y1="115" x2="142" y2="115" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" />
                    <line x1="118" y1="125" x2="135" y2="125" stroke="#3b82f6" strokeWidth="1.5" opacity="0.35" />

                    {/* Page curl/shadow */}
                    <path d="M150 145 Q155 143 160 148" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.15" />

                    {/* Stars of comprehension */}
                    <path d="M100 55 L102 60 L107 62 L102 64 L100 69 L98 64 L93 62 L98 60 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M70 95 L71 98 L74 99 L71 100 L70 103 L69 100 L66 99 L69 98 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M130 95 L131 98 L134 99 L131 100 L130 103 L129 100 L126 99 L129 98 Z" fill="#3b82f6" opacity="0.2" />
                  </svg>
                </div>
              </div>

              {/* Ladder Progression */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Ladder Climb</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Ladder rails */}
                    <path d="M75 155 L75 40" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                    <path d="M125 155 L125 40" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />

                    {/* Ladder rungs - evenly spaced */}
                    <line x1="75" y1="145" x2="125" y2="145" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="75" y1="125" x2="125" y2="125" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="75" y1="105" x2="125" y2="105" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="75" y1="85" x2="125" y2="85" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="75" y1="65" x2="125" y2="65" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="75" y1="45" x2="125" y2="45" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                    {/* Climber figure on ladder */}
                    <circle cx="100" cy="75" r="7" fill="#3b82f6" />
                    <circle cx="100" cy="75" r="4" fill="#fff" opacity="0.4" />
                    <path d="M100 82 L100 95" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M95 87 L82 85" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="82" cy="85" r="4" fill="#3b82f6" opacity="0.4" />
                    <path d="M105 87 L118 85" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="118" cy="85" r="4" fill="#3b82f6" opacity="0.4" />
                    <path d="M100 95 L82 105" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="82" cy="105" r="5" fill="#3b82f6" opacity="0.4" />
                    <path d="M100 95 L118 125" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="118" cy="125" r="5" fill="#3b82f6" opacity="0.4" />

                    {/* Cloud at bottom (above it now) */}
                    <ellipse cx="100" cy="165" rx="35" ry="12" fill="#3b82f6" opacity="0.1" />

                    {/* Stars at top */}
                    <path d="M100 25 L102 30 L107 32 L102 34 L100 39 L98 34 L93 32 L98 30 Z" fill="#3b82f6" opacity="0.28" />
                    <path d="M80 35 L81 38 L84 39 L81 40 L80 43 L79 40 L76 39 L79 38 Z" fill="#3b82f6" opacity="0.22" />
                    <path d="M120 35 L121 38 L124 39 L121 40 L120 43 L119 40 L116 39 L119 38 Z" fill="#3b82f6" opacity="0.22" />

                    {/* Progress markers */}
                    <circle cx="140" cy="125" r="3" fill="#3b82f6" opacity="0.3" />
                    <circle cx="140" cy="105" r="3" fill="#3b82f6" opacity="0.35" />
                    <circle cx="140" cy="85" r="3" fill="#3b82f6" opacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* Tree Roots Foundation */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Deep Roots</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Ground line */}
                    <line x1="30" y1="105" x2="170" y2="105" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="30" y="105" width="140" height="10" fill="#3b82f6" opacity="0.1" />

                    {/* Tree trunk above */}
                    <rect x="90" y="55" width="20" height="50" rx="3" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />

                    {/* Leaves/crown */}
                    <circle cx="100" cy="45" r="25" fill="#3b82f6" opacity="0.2" />
                    <circle cx="100" cy="45" r="18" fill="#3b82f6" opacity="0.25" />
                    <circle cx="100" cy="45" r="12" fill="#3b82f6" />
                    <circle cx="100" cy="45" r="6" fill="#fff" opacity="0.4" />

                    {/* Deep root system below - branching */}
                    <path d="M100 115 L100 140" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M100 125 Q85 135 70 145" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M100 125 Q115 135 130 145" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M85 135 Q75 140 65 148" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M115 135 Q125 140 135 148" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M70 145 Q60 150 50 158" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M130 145 Q140 150 150 158" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

                    {/* Root tips */}
                    <circle cx="100" cy="140" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="70" cy="145" r="3.5" fill="#3b82f6" opacity="0.35" />
                    <circle cx="130" cy="145" r="3.5" fill="#3b82f6" opacity="0.35" />
                    <circle cx="65" cy="148" r="3" fill="#3b82f6" opacity="0.3" />
                    <circle cx="135" cy="148" r="3" fill="#3b82f6" opacity="0.3" />
                    <circle cx="50" cy="158" r="2.5" fill="#3b82f6" opacity="0.25" />
                    <circle cx="150" cy="158" r="2.5" fill="#3b82f6" opacity="0.25" />

                    {/* Stars above tree */}
                    <path d="M100 25 L102 30 L107 32 L102 34 L100 39 L98 34 L93 32 L98 30 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M75 40 L76 43 L79 44 L76 45 L75 48 L74 45 L71 44 L74 43 Z" fill="#3b82f6" opacity="0.2" />
                    <path d="M125 40 L126 43 L129 44 L126 45 L125 48 L124 45 L121 44 L124 43 Z" fill="#3b82f6" opacity="0.2" />

                    {/* Soil particles */}
                    <circle cx="85" cy="115" r="2" fill="#3b82f6" opacity="0.15" />
                    <circle cx="115" cy="115" r="2" fill="#3b82f6" opacity="0.15" />
                  </svg>
                </div>
              </div>

              {/* Binary Decision Tree */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Decision Tree</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Root node */}
                    <circle cx="100" cy="40" r="12" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="100" cy="40" r="8" fill="#3b82f6" />
                    <circle cx="100" cy="40" r="4" fill="#fff" opacity="0.5" />

                    {/* First split */}
                    <path d="M95 50 L70 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M105 50 L130 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Second level nodes */}
                    <circle cx="70" cy="75" r="10" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="70" cy="75" r="6" fill="#3b82f6" />

                    <circle cx="130" cy="75" r="10" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="130" cy="75" r="6" fill="#3b82f6" />

                    {/* Second split */}
                    <path d="M65 83 L50 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M75 83 L90 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M125 83 L110 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M135 83 L150 105" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

                    {/* Third level nodes */}
                    <circle cx="50" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="50" cy="105" r="5" fill="#3b82f6" />

                    <circle cx="90" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="90" cy="105" r="5" fill="#3b82f6" />

                    <circle cx="110" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="110" cy="105" r="5" fill="#3b82f6" />

                    <circle cx="150" cy="105" r="8" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="150" cy="105" r="5" fill="#3b82f6" />

                    {/* Final level - leaf nodes with checkmarks */}
                    <path d="M47 112 L40 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="40" cy="130" r="6" fill="#3b82f6" opacity="0.35" />
                    <path d="M37 128 L39 131 L44 125" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    <path d="M93 112 L100 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="100" cy="130" r="6" fill="#3b82f6" opacity="0.35" />
                    <path d="M97 128 L99 131 L104 125" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    <path d="M153 112 L160 130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="160" cy="130" r="6" fill="#3b82f6" opacity="0.35" />
                    <path d="M157 128 L159 131 L164 125" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Stars of logic */}
                    <path d="M100 22 L102 27 L107 29 L102 31 L100 36 L98 31 L93 29 L98 27 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M60 80 L61 83 L64 84 L61 85 L60 88 L59 85 L56 84 L59 83 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M140 80 L141 83 L144 84 L141 85 L140 88 L139 85 L136 84 L139 83 Z" fill="#3b82f6" opacity="0.18" />
                  </svg>
                </div>
              </div>

              {/* Mosaic Tiles Pattern */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Mosaic Pattern</h3>
                <div className="absurd-illustration-container">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

                    {/* Grid of tiles - building pattern */}
                    <rect x="55" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="80" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="105" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="130" y="70" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />

                    <rect x="55" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="80" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="105" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.35" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="130" y="95" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />

                    <rect x="55" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.22" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="80" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.28" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="105" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                    <rect x="130" y="120" width="20" height="20" rx="2" fill="#3b82f6" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />

                    {/* Center piece glowing - the pattern emerges */}
                    <rect x="92" y="102" width="16" height="16" rx="2" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="110" r="20" fill="#3b82f6" opacity="0.12" />

                    {/* Small dots in some tiles */}
                    <circle cx="65" cy="80" r="2" fill="#fff" opacity="0.5" />
                    <circle cx="90" cy="80" r="2" fill="#fff" opacity="0.5" />
                    <circle cx="140" cy="105" r="2" fill="#fff" opacity="0.5" />

                    {/* Stars of pattern recognition */}
                    <path d="M100 50 L102 55 L107 57 L102 59 L100 64 L98 59 L93 57 L98 55 Z" fill="#3b82f6" opacity="0.25" />
                    <path d="M45 105 L46 108 L49 109 L46 110 L45 113 L44 110 L41 109 L44 108 Z" fill="#3b82f6" opacity="0.18" />
                    <path d="M155 105 L156 108 L159 109 L156 110 L155 113 L154 110 L151 109 L154 108 Z" fill="#3b82f6" opacity="0.18" />
                  </svg>
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
                <h3 className="absurd-card-title">Concept Introduction</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
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
              </div>

              {/* Study Mode - Book */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Study Mode</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
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
              </div>

              {/* Practice - Checkmark Path */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Practice</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
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
              </div>

              {/* Exam - Badge */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Exam</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
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
              </div>

              {/* Review - Clock */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Review</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="90" fill="#3b82f6" opacity="0.08" />
                    <circle cx="100" cy="100" r="55" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="100" cy="100" r="42" fill="#fff" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
                    <path d="M100 60 L100 100 L130 115" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="100" cy="60" r="4" fill="#3b82f6" />
                    <circle cx="100" cy="140" r="4" fill="#3b82f6" />
                    <circle cx="140" cy="100" r="4" fill="#3b82f6" />
                    <circle cx="60" cy="100" r="4" fill="#3b82f6" />
                    <path d="M85 40 Q100 35 115 40" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                    <circle cx="100" cy="100" r="6" fill="#3b82f6" />
                    <path d="M145 85 Q155 75 165 85" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Mastery - Trophy */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Mastery</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <ellipse cx="100" cy="145" rx="45" ry="8" fill="#3b82f6" opacity="0.12" />
                    <rect x="85" y="135" width="30" height="25" rx="3" fill="#3b82f6" opacity="0.15" />
                    <path d="M75 135 Q75 125 85 125 L115 125 Q125 125 125 135" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <ellipse cx="100" cy="85" rx="35" ry="40" fill="#3b82f6" opacity="0.1" />
                    <path d="M70 85 Q70 55 100 45 Q130 55 130 85 Q130 105 100 115 Q70 105 70 85" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M50 75 Q45 85 50 95 L65 90 Q60 82 65 75 Z" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M150 75 Q155 85 150 95 L135 90 Q140 82 135 75 Z" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M90 75 L95 85 L100 75 L105 85 L110 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="100" cy="95" r="4" fill="#3b82f6" />
                  </svg>
                </div>
              </div>

              {/* Progress - Chart */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Progress</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <rect x="40" y="40" width="120" height="120" rx="6" fill="#3b82f6" opacity="0.08" />
                    <line x1="60" y1="145" x2="140" y2="145" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="60" y1="145" x2="60" y2="65" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="70" y="120" width="15" height="25" rx="3" fill="#3b82f6" opacity="0.3" />
                    <rect x="95" y="105" width="15" height="40" rx="3" fill="#3b82f6" opacity="0.45" />
                    <rect x="120" y="80" width="15" height="65" rx="3" fill="#3b82f6" opacity="0.6" />
                    <path d="M77 112 L102 95 L127 72" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="77" cy="112" r="4" fill="#3b82f6" />
                    <circle cx="102" cy="95" r="4" fill="#3b82f6" />
                    <circle cx="127" cy="72" r="4" fill="#3b82f6" />
                    <path d="M130 55 L140 60 L135 70" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* Speed - Lightning */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Speed</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08" />
                    <path d="M115 45 L75 95 L95 95 L85 155 L125 105 L105 105 Z" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M120 55 L85 100 L100 100 L90 145 L120 110 L110 110 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
                    <circle cx="115" cy="55" r="5" fill="#3b82f6" opacity="0.4" />
                    <path d="M140 75 Q145 70 150 75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                    <path d="M50 125 Q45 120 50 115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                    <circle cx="135" cy="140" r="3" fill="#3b82f6" opacity="0.25" />
                    <circle cx="65" cy="60" r="3" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Understanding - Lightbulb */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Understanding</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <ellipse cx="100" cy="160" rx="25" ry="6" fill="#3b82f6" opacity="0.12" />
                    <circle cx="100" cy="85" r="70" fill="#3b82f6" opacity="0.08" />
                    <circle cx="100" cy="85" r="35" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="100" cy="85" r="42" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                    <path d="M85 115 Q85 120 90 125 L110 125 Q115 120 115 115" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <rect x="88" y="125" width="24" height="8" rx="2" fill="#3b82f6" opacity="0.2" />
                    <rect x="92" y="133" width="16" height="12" rx="3" fill="#3b82f6" opacity="0.15" />
                    <path d="M100 60 L100 75" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M85 90 L95 85" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <path d="M115 90 L105 85" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <circle cx="100" cy="80" r="3" fill="#3b82f6" opacity="0.5" />
                  </svg>
                </div>
              </div>

              {/* Achievement - Star */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Achievement</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.08" />
                    <path d="M100 40 L110 75 L147 75 L117 97 L127 132 L100 110 L73 132 L83 97 L53 75 L90 75 Z" fill="#3b82f6" opacity="0.15" />
                    <path d="M100 50 L107 78 L137 78 L113 95 L120 123 L100 106 L80 123 L87 95 L63 78 L93 78 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" />
                    <circle cx="100" cy="90" r="8" fill="#3b82f6" opacity="0.3" />
                    <circle cx="100" cy="90" r="4" fill="#3b82f6" />
                    <path d="M145 50 Q150 45 155 50" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                    <path d="M45 130 Q40 125 45 120" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                    <circle cx="150" cy="140" r="3" fill="#3b82f6" opacity="0.25" />
                    <circle cx="50" cy="60" r="3" fill="#3b82f6" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Focus - Target */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Focus</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="75" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.15" />
                    <circle cx="100" cy="100" r="55" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.25" />
                    <circle cx="100" cy="100" r="35" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.4" />
                    <circle cx="100" cy="100" r="18" fill="#3b82f6" opacity="0.15" />
                    <circle cx="100" cy="100" r="10" fill="#3b82f6" />
                    <circle cx="100" cy="100" r="4" fill="#fff" />
                    <path d="M100 20 L100 45" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                    <path d="M100 155 L100 180" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                    <path d="M20 100 L45 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                    <path d="M155 100 L180 100" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </div>
              </div>

              {/* Memory - Brain */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Memory</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <ellipse cx="100" cy="150" rx="55" ry="10" fill="#3b82f6" opacity="0.1" />
                    <path d="M75 70 Q60 75 60 90 Q60 110 75 120 L80 125 Q85 130 90 125 Q95 120 90 115 L85 110 Q75 105 75 95 Q75 85 82 82" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                    <path d="M125 70 Q140 75 140 90 Q140 110 125 120 L120 125 Q115 130 110 125 Q105 120 110 115 L115 110 Q125 105 125 95 Q125 85 118 82" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                    <ellipse cx="100" cy="80" rx="45" ry="35" fill="#3b82f6" opacity="0.1" />
                    <path d="M70 80 Q70 50 100 45 Q130 50 130 80 Q130 95 120 105 Q110 115 100 115 Q90 115 80 105 Q70 95 70 80" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="88" cy="75" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="112" cy="75" r="4" fill="#3b82f6" opacity="0.4" />
                    <circle cx="100" cy="90" r="5" fill="#3b82f6" opacity="0.5" />
                    <path d="M85 95 Q100 100 115 95" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                  </svg>
                </div>
              </div>

              {/* Streak - Fire */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Streak</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <ellipse cx="100" cy="155" rx="40" ry="8" fill="#3b82f6" opacity="0.12" />
                    <path d="M100 45 Q90 65 95 85 Q80 80 75 95 Q70 110 85 125 Q90 145 100 150 Q110 145 115 125 Q130 110 125 95 Q120 80 105 85 Q110 65 100 45" fill="#3b82f6" opacity="0.15" />
                    <path d="M100 55 Q93 70 97 85 Q87 82 84 92 Q80 103 90 115 Q94 130 100 133 Q106 130 110 115 Q120 103 116 92 Q113 82 103 85 Q107 70 100 55" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <path d="M100 70 Q97 78 99 88 Q93 86 91 92 Q88 98 95 105 Q97 113 100 115 Q103 113 105 105 Q112 98 109 92 Q107 86 101 88 Q103 78 100 70" fill="#3b82f6" opacity="0.3" />
                    <circle cx="100" cy="95" r="3" fill="#3b82f6" />
                    <path d="M115 60 Q120 55 125 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.25" />
                    <path d="M85 60 Q80 55 75 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Notes - Pencil */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Notes</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <rect x="55" y="55" width="90" height="110" rx="6" fill="#3b82f6" opacity="0.08" />
                    <rect x="65" y="65" width="70" height="90" rx="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="80" y1="85" x2="120" y2="85" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <line x1="80" y1="100" x2="115" y2="100" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <line x1="80" y1="115" x2="110" y2="115" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <line x1="80" y1="130" x2="105" y2="130" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <path d="M135 120 L145 110 L150 115 L140 125 Z" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <rect x="147" y="105" width="8" height="12" rx="2" fill="#3b82f6" opacity="0.4" transform="rotate(45 151 111)" />
                    <circle cx="148" cy="108" r="3" fill="#3b82f6" />
                    <path d="M125 135 Q130 140 135 135" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" />
                  </svg>
                </div>
              </div>

              {/* Habits - Calendar */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Habits</h3>
                <div className="absurd-illustration-container absurd-phase-icon">
                  <svg viewBox="0 0 200 200" fill="none">
                    <rect x="45" y="50" width="110" height="110" rx="8" fill="#3b82f6" opacity="0.1" />
                    <rect x="50" y="60" width="100" height="90" rx="6" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
                    <rect x="50" y="60" width="100" height="20" rx="6" fill="#3b82f6" opacity="0.15" />
                    <line x1="65" y1="50" x2="65" y2="65" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="100" y1="50" x2="100" y2="65" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="135" y1="50" x2="135" y2="65" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="70" cy="100" r="4" fill="#3b82f6" opacity="0.3" />
                    <circle cx="90" cy="100" r="4" fill="#3b82f6" opacity="0.5" />
                    <circle cx="110" cy="100" r="4" fill="#3b82f6" />
                    <circle cx="130" cy="100" r="4" fill="#3b82f6" />
                    <circle cx="70" cy="120" r="4" fill="#3b82f6" />
                    <circle cx="90" cy="120" r="4" fill="#3b82f6" />
                    <path d="M108 118 L111 122 L118 113" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
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
                <h3 className="absurd-card-title">Discrete Chunks</h3>
                <div className="absurd-illustration-container absurd-method-icon">
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
              </div>

              {/* Learn Operations */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Operations</h3>
                <div className="absurd-illustration-container absurd-method-icon">
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
              </div>

              {/* Compose Them */}
              <div className="absurd-card">
                <h3 className="absurd-card-title">Composition</h3>
                <div className="absurd-illustration-container absurd-method-icon">
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

