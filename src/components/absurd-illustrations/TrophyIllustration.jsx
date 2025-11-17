function TrophyIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06"/>
      <circle cx="100" cy="80" r="50" fill="#3b82f6" opacity="0.1"/>
      
      {/* Trophy cup */}
      <path d="M70 70 L70 90 Q70 110 100 115 Q130 110 130 90 L130 70 Z" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="2.5"/>
      <ellipse cx="100" cy="70" rx="30" ry="8" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="2"/>
      
      {/* Handles */}
      <path d="M68 75 Q50 75 50 90 Q50 95 58 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M132 75 Q150 75 150 90 Q150 95 142 95" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      
      {/* Base/pedestal */}
      <rect x="90" y="115" width="20" height="15" rx="2" fill="#3b82f6" opacity="0.25"/>
      <rect x="80" y="130" width="40" height="12" rx="3" fill="#3b82f6" opacity="0.3"/>
      <rect x="70" y="142" width="60" height="8" rx="2" fill="#3b82f6" opacity="0.2"/>
      
      {/* Winner star in cup */}
      <path d="M100 85 L103 92 L110 94 L103 96 L100 103 L97 96 L90 94 L97 92 Z" fill="#3b82f6" opacity="0.4"/>
      <circle cx="100" cy="94" r="5" fill="#3b82f6" opacity="0.2"/>
      
      {/* Sparkles around trophy */}
      <path d="M60 55 L62 60 L67 62 L62 64 L60 69 L58 64 L53 62 L58 60 Z" fill="#3b82f6" opacity="0.25"/>
      <path d="M140 55 L142 60 L147 62 L142 64 L140 69 L138 64 L133 62 L138 60 Z" fill="#3b82f6" opacity="0.25"/>
      <path d="M85 50 L86 53 L89 54 L86 55 L85 58 L84 55 L81 54 L84 53 Z" fill="#3b82f6" opacity="0.2"/>
      <path d="M115 50 L116 53 L119 54 L116 55 L115 58 L114 55 L111 54 L114 53 Z" fill="#3b82f6" opacity="0.2"/>
      
      {/* Podium platform */}
      <ellipse cx="100" cy="155" rx="40" ry="10" fill="#3b82f6" opacity="0.12"/>
      
      {/* Celebration confetti */}
      <circle cx="50" cy="65" r="2" fill="#3b82f6" opacity="0.2"/>
      <circle cx="150" cy="65" r="2" fill="#3b82f6" opacity="0.2"/>
      <rect x="45" y="75" width="3" height="5" rx="1" fill="#3b82f6" opacity="0.18" transform="rotate(20 46.5 77.5)"/>
      <rect x="152" y="75" width="3" height="5" rx="1" fill="#3b82f6" opacity="0.18" transform="rotate(-20 153.5 77.5)"/>
    </svg>
  );
}

export default TrophyIllustration;

