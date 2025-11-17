function PuzzleSolveIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="85" fill="#3b82f6" opacity="0.06" />

      {/* Center puzzle piece - organic shape */}
      <path d="M90 85 Q85 85 85 90 L85 105 Q85 110 90 110 L95 110 Q95 115 100 115 Q105 115 105 110 L110 110 Q115 110 115 105 L115 90 Q115 85 110 85 L105 85 Q105 80 100 80 Q95 80 95 85 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" />
      <path d="M90 90 L110 90 L110 105 L90 105 Z" fill="#3b82f6" opacity="0.15" />
      
      {/* Connecting piece from top - floating in */}
      <path d="M90 45 Q85 45 85 50 L85 60 Q85 65 90 65 L95 65 Q95 70 100 70 Q105 70 105 65 L110 65 Q115 65 115 60 L115 50 Q115 45 110 45 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(-8 100 55)" />
      <path d="M90 50 L110 50 L110 60 L90 60 Z" fill="#3b82f6" opacity="0.12" transform="rotate(-8 100 55)" />
      
      {/* Curved arrow showing movement */}
      <path d="M100 68 Q105 75 100 78" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" strokeDasharray="3 3" />
      
      {/* Side piece - tilted */}
      <path d="M140 90 Q135 90 135 95 L135 110 Q135 115 140 115 L150 115 Q155 115 155 110 L155 95 Q155 90 150 90 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(15 145 102)" />
      <path d="M140 95 L150 95 L150 110 L140 110 Z" fill="#3b82f6" opacity="0.18" transform="rotate(15 145 102)" />
      
      {/* Another piece from left */}
      <path d="M40 90 L60 90 Q65 90 65 95 L65 110 Q65 115 60 115 L40 115 Q35 115 35 110 L35 95 Q35 90 40 90 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(-12 50 102)" />
      <path d="M40 95 L60 95 L60 110 L40 110 Z" fill="#3b82f6" opacity="0.14" transform="rotate(-12 50 102)" />
      
      {/* Bottom piece - wavy connection */}
      <path d="M85 140 Q80 140 80 145 L80 155 Q80 160 85 160 L115 160 Q120 160 120 155 L120 145 Q120 140 115 140 L110 140 Q110 135 105 135 L95 135 Q90 135 90 140 Z" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" transform="rotate(5 100 147)" />
      <path d="M85 145 L115 145 L115 155 L85 155 Z" fill="#3b82f6" opacity="0.16" transform="rotate(5 100 150)" />
      
      {/* Floating connecting indicator */}
      <circle cx="100" cy="100" r="35" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.15" strokeDasharray="5 5" />
      
      {/* Organic blobs around */}
      <ellipse cx="165" cy="65" rx="8" ry="12" fill="#3b82f6" opacity="0.12" transform="rotate(35 165 65)" />
      <circle cx="30" cy="130" r="6" fill="#3b82f6" opacity="0.1" />
      <path d="M160 140 Q165 135 170 140 Q165 145 160 140" fill="#3b82f6" opacity="0.14" />
      
      {/* Aha sparkles */}
      <path d="M100 120 L102 125 L107 127 L102 129 L100 134 L98 129 L93 127 L98 125 Z" fill="#3b82f6" opacity="0.25" />
      <path d="M125 70 L126 73 L129 74 L126 75 L125 78 L124 75 L121 74 L124 73 Z" fill="#3b82f6" opacity="0.2" />
      <path d="M70 65 L71 68 L74 69 L71 70 L70 73 L69 70 L66 69 L69 68 Z" fill="#3b82f6" opacity="0.18" />
    </svg>
  );
}

export default PuzzleSolveIllustration;

